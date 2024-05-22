import random_name from 'node-random-name';
import generator  from 'generate-password-ts';
import mailer from 'nodemailer'
import Imap from 'node-imap'
import {simpleParser} from 'mailparser'
import { useState } from 'react'; 
import { mail } from './Mail';
import PocketBase from 'pocketbase';
import { create } from 'domain';


const pb = new PocketBase('http://127.0.0.1:8090');

const pbURL = "http://127.0.0.1:8090"

const requestHeaders = {
    "accept" : "*/*",
    'content-type' : 'application/json',
    'X-API-KEY': 'BD71C1-FD5A6E-63DC7A-8D0FA0-B50D47'
} 

const URL = "http://Litengut.dev/"
const domain = "litengut.dev"

export class Email {

    public email:string
    public name:string
    public pass: string
    public smtp:mailer.Transporter<mailer.SentMessageInfo>
    public imap:Imap
    public email_array:string[] = []
    public EmailIDsINDB: Number[] = []
    public apiId: string;

    constructor(name:string,pass:string){
      this.name = name
      this.pass = pass
      this.email = this.name + "@" + domain;
      this.getDataMails()
      this.addMailbox()
      //this.addToApi()
      this.createPasswd()
      this.createSMTP()
      this.createIMAP()
    }

    static generateEmail(){
      var name = random_name({first: true})+"."+random_name({last: true})
      var pass = generator.generate({
          length: 10,
          numbers: true
      });
      return new Email(name,pass)
    }



    async addToApi(){

      const records = await pb.collection('email').getFullList({
        filter: 'email = "' + this.email + '"',
      });
      if(records.length == 0){
          const data = {
          "email": this.email,
          "pass": this.pass,
          "mails": []
        };
        const record = await pb.collection('email').create(data);
        this.apiId = record.id;
       } else {
         this.apiId = records[0].id
         this.email_array += records[0].mails
       }  
    }


    addMailbox(){
        fetch(URL + "api/v1/add/mailbox",{
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify({
              "local_part": this.name,
              "domain": domain,
              "name": this.name + " " + this.pass,
              "quota": "0",
              "password": this.pass,
              "password2": this.pass,
              "active": "1",
              "force_pw_update": "1",
              "tls_enforce_in": "1",
              "tls_enforce_out": "1"
           })
        })
    }

    createPasswd() {
        fetch(URL +"api/v1/add/app-passwd",{
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify({
              "active": "1",
              "username": this.email,
              "app_name": "App",
              "app_passwd": this.pass,
              "app_passwd2": this.pass,
              "protocols": [
                "imap_access",
                "dav_access",
                "smtp_access",
                "eas_access",
                "pop3_access",
                "sieve_access"
              ]
            })
          })
    }


    createSMTP() {
        this.smtp = mailer.createTransport({
            host: domain,
            port: 465,
            secure: true, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: this.email,
              pass: this.pass,
            },
          } as mailer.SendMailOptions);
    }
    createIMAP() {
       this.imap = new Imap({
        user: this.email,
        password: this.pass,
        host: domain,
        port: 993,
        tls: true
      });

      this.imap.once('ready',() => {
        this.fetchEmails('INBOX',['FLAGGED']);
      })
      this.imap.connect()
    }






    async getDataMails(){
      const resultList = await pb.collection('mails').getFullList({
        filter: 'email = "' + this.email + '"',
      });
      this.EmailIDsINDB = resultList.map((x) => parseInt(x.emailid))
    }



    fetchEmails(Mailbox: string,search:any){
    this.imap.openBox(Mailbox, false, () =>{

    
    this.imap.search(search, (err, results) => {
      if(!results || !results.length){
        console.log("The server didn't find any emails matching the specified criteria")
        this.imap.end();return;   
      }    
    
      var f = this.imap.fetch(results,{ //you can set amount range like '1:2' or 'results' for all results
        bodies: '',
        struct: true
      })
      f.on('message', (msg:any, seqno:any) => {

        if(!this.EmailIDsINDB.includes(seqno)) {
          msg.on('body', (stream, info) =>  {
            this.getBody(stream,info,seqno);
        });
        }


      });

      f.once('error', function(err) {
        console.log('Fetch error: ' + err);
      });
    })
  });
  }

  getBody(stream, info,seqno) {
    
      //Retrieve the 'from' header and buffer the entire body of the newest message:
      if (info.which === 'TEXT')
      var buffer = '', count = 0;

      stream.on('data', async (chunk) => {
        count += chunk.length;
        buffer += chunk.toString('utf8');
      });
      
      stream.once('end', async () => {
        let attach = null
        //console.log((await simpleParser(buffer))) // -> to see entire data of email

        if(((await simpleParser(buffer)).attachments).length != 0) {
          attach = (await simpleParser(buffer)).attachments[0].content //to get attachments
        }

        if (info.which !== 'TEXT'){
          var dataheader = Imap.parseHeader(buffer)
          //start -> set data, that you want to save on your DB
          
          const emails_data = {
            "emailid": seqno,
            "email":this.email,
            "readed": true,
            "date": dataheader.date[0],
            "subject": dataheader.subject[0],
            "from": dataheader.from[0],
            "to": dataheader.to[0],
            "text": (await simpleParser(buffer)).text, 
            "textAsHtml": (await simpleParser(buffer)).textAsHtml,
          }
          const record = await pb.collection('mails').create(emails_data); 

          const updaterecord = await pb.collection('email').update(this.apiId, {
            'mails+': record.id,
          });
        }
      });   
  }

  markemail(uid,flag){
    this.imap.addFlags(uid, flag,()=>{});
  }
}