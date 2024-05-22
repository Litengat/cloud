export const fetchCache = 'force-no-store'

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import {mail} from './Mail'
import React, {useState, useEffect} from 'react'
import {TestNav} from "./components/testNav"
import {MailDisplay} from "./components/mail-display"
import {Separator} from "@/components/ui/separator"
import {ResizableHandle,ResizablePanel,ResizablePanelGroup} from "@/components/ui/resizable"
import {MailList, MailBoxTitle} from './components/mailList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Email } from './email'
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');




export default async function MailPage({ params }: {
    params: { email: string}
}) { 
    const emails:mail[] = []

    const email = new Email(params.email,"maximilian")
    await email.addToApi()


    const records = await pb.collection('email').getFullList({
      filter: 'email = "'+ params.email + '@litengut.dev"',
    });
    const mails = records[0].mails 

    for (let i = 0; i < mails.length; i++) {
      const record:mail = await pb.collection('mails').getOne(mails[i]);
      emails.push(record)
      
    }

    return(
      
        <div>
            <ResizablePanelGroup direction="horizontal" className="max-h-screen">   
                <ResizablePanel defaultSize={15} minSize={10}>
                    <div className="h-14"></div>
                    <Separator className="" />
                    <TestNav ></TestNav>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={30} minSize={29}>
                    <div className="flex items-center px-4 h-14">
                        <MailBoxTitle></MailBoxTitle>
                    </div>
                    <Separator className="" />  
                    <MailList emails={emails}></MailList>     
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={55}>

                    <MailDisplay
                        mails={emails}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>





        </div>
    )
}


// const emails:mail[] = [
//     {
//       id: 1,
//       readed: true,
//       date: 'Sat, 18 May 2024 16:25:40 +0200',
//       subject: '"Personal Calendar" has been created',
//       from: '"max" <max@litengut.dev>',
//       to: '"max" <max@litengut.dev>',
//       text: 'The "Personal Calendar" folder has been created.\n',
//       textAsHtml: '<p>The &quot;Personal Calendar&quot; folder has been created.</p>',
//       attachment: ""
//     },
//     {
//       id: 9,
//       readed: true,
//       date: 'Sat, 18 May 2024 20:04:44 +0000',
//       subject: 'test',
//       from: 'Hank.Vuillemot@litengut.dev',
//       to: 'max@litengut.dev',
//       text: 'test\n',
//       textAsHtml: '<p>test</p>',
//       attachment: ""
//     },
//     {
//       id: 10,
//       readed: true,
//       date: 'Sat, 18 May 2024 20:05:41 +0000',
//       subject: 'test',
//       from: 'Rey.Mccutchen@litengut.dev',
//       to: 'max@litengut.dev',
//       text: 'test\n',
//       textAsHtml: '<p>test</p>',
//       attachment: ""
//     },
//     {
//       id: 3,
//       readed: true,
//       date: 'Sat, 18 May 2024 16:27:17 +0200',
//       subject: '"Personal Address Book" has been created',
//       from: '"max" <max@litengut.dev>',
//       to: '"max" <max@litengut.dev>',
//       text: 'The "Personal Address Book" folder has been created.\n',
//       textAsHtml: '<p>The &quot;Personal Address Book&quot; folder has been created.</p>',
//       attachment: ""
//     },
//     {
//       id: 2,
//       readed: true,
//       date: 'Sat, 18 May 2024 14:26:56 +0000 (UTC)',
//       subject: 'test',
//       from: 'Maximilian Mennicken <litengut@icloud.com>',
//       to: 'max@Litengut.dev',
//       text: '\n',
//       textAsHtml: '<p></p>',
//       attachment: ""
//     },
//     {
//       id: 6,
//       readed: true,
//       date: 'Sat, 18 May 2024 20:40:05 +0200 (CEST)',
//       subject: 'Delayed Mail (still being retried)',
//       from: 'MAILER-DAEMON@Litengut.dev (Mail Delivery System)',
//       to: 'max@litengut.dev',
//       text: 'This is the mail system at host Litengut.dev.\n' +
//         '\n' +
//         '####################################################################\n' +
//         '# THIS IS A WARNING ONLY.  YOU DO NOT NEED TO RESEND YOUR MESSAGE. #\n' +
//         '####################################################################\n' +
//         '\n' +
//         'Your message could not be delivered for more than 4 hour(s).\n' +
//         'It will be retried until it is 5 day(s) old.\n' +
//         '\n' +
//         'For further assistance, please send mail to postmaster.\n' +
//         '\n' +
//         'If you do so, please include this problem report. You can\n' +
//         'delete your own text from the attached returned message.\n' +
//         '\n' +
//         '                   The mail system\n' +
//         '\n' +
//         '<Litengut@gmx.net>: host mx00.emig.gmx.net[212.227.15.9] refused to talk to me:\n' +
//         '    554-gmx.net (mxgmx008) Nemesis ESMTP Service not available 554-No SMTP\n' +
//         '    service 554-IP address is block listed. 554 For explanation visit\n' +
//         '    https://postmaster.gmx.net/de/case?c=r0301&i=ip&v=93.226.205.85&r=1MqZMI-1subuH3f4i-00mYd5\n' +
//         '\n' +
//         'Reporting-MTA: dns; Litengut.dev\n' +
//         'X-Postcow-Queue-ID: 5F618AD6D8\n' +
//         'X-Postcow-Sender: rfc822; max@litengut.dev\n' +
//         'Arrival-Date: Sat, 18 May 2024 16:30:42 +0200 (CEST)\n' +
//         '\n' +
//         'Final-Recipient: rfc822; Litengut@gmx.net\n' +
//         'Original-Recipient: rfc822;Litengut@gmx.net\n' +
//         'Action: delayed\n' +
//         'Status: 4.0.0\n' +
//         'Remote-MTA: dns; mx00.emig.gmx.net\n' +
//         'Diagnostic-Code: smtp; 554-gmx.net (mxgmx008) Nemesis ESMTP Service not\n' +
//         '    available 554-No SMTP service 554-IP address is block listed. 554 For\n' +
//         '    explanation visit\n' +
//         '    https://postmaster.gmx.net/de/case?c=r0301&i=ip&v=93.226.205.85&r=1MqZMI-1subuH3f4i-00mYd5\n' +
//         'Will-Retry-Until: Thu, 23 May 2024 16:30:42 +0200 (CEST)\n',
//       textAsHtml: '<p>This is the mail system at host <a href="http://Litengut.dev">Litengut.dev</a>.</p><p>####################################################################<br/># THIS IS A WARNING ONLY.  YOU DO NOT NEED TO RESEND YOUR MESSAGE. #<br/>####################################################################</p><p>Your message could not be delivered for more than 4 hour(s).<br/>It will be retried until it is 5 day(s) old.</p><p>For further assistance, please send mail to postmaster.</p><p>If you do so, please include this problem report. You can<br/>delete your own text from the attached returned message.</p><p>                   The mail system</p><p>&lt;<a href="mailto:Litengut@gmx.net">Litengut@gmx.net</a>&gt;: host <a href="http://mx00.emig.gmx.net">mx00.emig.gmx.net</a>[<a href="http://212.227.15.9">212.227.15.9</a>] refused to talk to me:<br/>    <a href="http://554-gmx.net">554-gmx.net</a> (mxgmx008) Nemesis ESMTP Service not available 554-No SMTP<br/>    service 554-IP address is block listed. 554 For explanation visit<br/>    <a href="https://postmaster.gmx.net/de/case?c=r0301&i=ip&v=93.226.205.85&r=1MqZMI-1subuH3f4i-00mYd5">https://postmaster.gmx.net/de/case?c=r0301&i=ip&v=93.226.205.85&r=1MqZMI-1subuH3f4i-00mYd5</a></p><br/>\n' +
//         '<p>Reporting-MTA: dns; <a href="http://Litengut.dev">Litengut.dev</a><br/>X-Postcow-Queue-ID: 5F618AD6D8<br/>X-Postcow-Sender: rfc822; <a href="mailto:max@litengut.dev">max@litengut.dev</a><br/>Arrival-Date: Sat, 18 May 2024 16:30:42 +0200 (CEST)</p><p>Final-Recipient: rfc822; <a href="mailto:Litengut@gmx.net">Litengut@gmx.net</a><br/>Original-Recipient: <a href="mailto:rfc822;Litengut@gmx.net">rfc822;Litengut@gmx.net</a><br/>Action: delayed<br/>Status: 4.0.0<br/>Remote-MTA: dns; <a href="http://mx00.emig.gmx.net">mx00.emig.gmx.net</a><br/>Diagnostic-Code: smtp; <a href="http://554-gmx.net">554-gmx.net</a> (mxgmx008) Nemesis ESMTP Service not<br/>    available 554-No SMTP service 554-IP address is block listed. 554 For<br/>    explanation visit<br/>    <a href="https://postmaster.gmx.net/de/case?c=r0301&i=ip&v=93.226.205.85&r=1MqZMI-1subuH3f4i-00mYd5">https://postmaster.gmx.net/de/case?c=r0301&i=ip&v=93.226.205.85&r=1MqZMI-1subuH3f4i-00mYd5</a><br/>Will-Retry-Until: Thu, 23 May 2024 16:30:42 +0200 (CEST)</p>',
//       attachment: ""
//     },
//     {
//       id: 7,
//       readed: true,
//       date: 'Sat, 18 May 2024 20:45:06 +0200 (CEST)',
//       subject: 'Delayed Mail (still being retried)',
//       from: 'MAILER-DAEMON@Litengut.dev (Mail Delivery System)',
//       to: 'max@litengut.dev',
//       text: 'This is the mail system at host Litengut.dev.\n' +
//         '\n' +
//         '####################################################################\n' +
//         '# THIS IS A WARNING ONLY.  YOU DO NOT NEED TO RESEND YOUR MESSAGE. #\n' +
//         '####################################################################\n' +
//         '\n' +
//         'Your message could not be delivered for more than 4 hour(s).\n' +
//         'It will be retried until it is 5 day(s) old.\n' +
//         '\n' +
//         'For further assistance, please send mail to postmaster.\n' +
//         '\n' +
//         'If you do so, please include this problem report. You can\n' +
//         'delete your own text from the attached returned message.\n' +
//         '\n' +
//         '                   The mail system\n' +
//         '\n' +
//         '<Litengut@gmx.net>: host mx00.emig.gmx.net[212.227.15.9] refused to talk to me:\n' +
//         '    554-gmx.net (mxgmx007) Nemesis ESMTP Service not available 554-No SMTP\n' +
//         '    service 554-IP address is block listed. 554 For explanation visit\n' +
//         '    https://postmaster.gmx.net/de/case?c=r0301&i=ip&v=93.226.205.85&r=1Miqvu-1smwSs0SwO-00eqJt\n' +
//         '\n' +
//         'Reporting-MTA: dns; Litengut.dev\n' +
//         'X-Postcow-Queue-ID: 74376AD709\n' +
//         'X-Postcow-Sender: rfc822; max@litengut.dev\n' +
//         'Arrival-Date: Sat, 18 May 2024 16:35:26 +0200 (CEST)\n' +
//         '\n' +
//         'Final-Recipient: rfc822; Litengut@gmx.net\n' +
//         'Original-Recipient: rfc822;Litengut@gmx.net\n' +
//         'Action: delayed\n' +
//         'Status: 4.0.0\n' +
//         'Remote-MTA: dns; mx00.emig.gmx.net\n' +
//         'Diagnostic-Code: smtp; 554-gmx.net (mxgmx007) Nemesis ESMTP Service not\n' +
//         '    available 554-No SMTP service 554-IP address is block listed. 554 For\n' +
//         '    explanation visit\n' +
//         '    https://postmaster.gmx.net/de/case?c=r0301&i=ip&v=93.226.205.85&r=1Miqvu-1smwSs0SwO-00eqJt\n' +
//         'Will-Retry-Until: Thu, 23 May 2024 16:35:26 +0200 (CEST)\n',
//       textAsHtml: '<p>This is the mail system at host <a href="http://Litengut.dev">Litengut.dev</a>.</p><p>####################################################################<br/># THIS IS A WARNING ONLY.  YOU DO NOT NEED TO RESEND YOUR MESSAGE. #<br/>####################################################################</p><p>Your message could not be delivered for more than 4 hour(s).<br/>It will be retried until it is 5 day(s) old.</p><p>For further assistance, please send mail to postmaster.</p><p>If you do so, please include this problem report. You can<br/>delete your own text from the attached returned message.</p><p>                   The mail system</p><p>&lt;<a href="mailto:Litengut@gmx.net">Litengut@gmx.net</a>&gt;: host <a href="http://mx00.emig.gmx.net">mx00.emig.gmx.net</a>[<a href="http://212.227.15.9">212.227.15.9</a>] refused to talk to me:<br/>    <a href="http://554-gmx.net">554-gmx.net</a> (mxgmx007) Nemesis ESMTP Service not available 554-No SMTP<br/>    service 554-IP address is block listed. 554 For explanation visit<br/>    <a href="https://postmaster.gmx.net/de/case?c=r0301&i=ip&v=93.226.205.85&r=1Miqvu-1smwSs0SwO-00eqJt">https://postmaster.gmx.net/de/case?c=r0301&i=ip&v=93.226.205.85&r=1Miqvu-1smwSs0SwO-00eqJt</a></p><br/>\n' +
//         '<p>Reporting-MTA: dns; <a href="http://Litengut.dev">Litengut.dev</a><br/>X-Postcow-Queue-ID: 74376AD709<br/>X-Postcow-Sender: rfc822; <a href="mailto:max@litengut.dev">max@litengut.dev</a><br/>Arrival-Date: Sat, 18 May 2024 16:35:26 +0200 (CEST)</p><p>Final-Recipient: rfc822; <a href="mailto:Litengut@gmx.net">Litengut@gmx.net</a><br/>Original-Recipient: <a href="mailto:rfc822;Litengut@gmx.net">rfc822;Litengut@gmx.net</a><br/>Action: delayed<br/>Status: 4.0.0<br/>Remote-MTA: dns; <a href="http://mx00.emig.gmx.net">mx00.emig.gmx.net</a><br/>Diagnostic-Code: smtp; <a href="http://554-gmx.net">554-gmx.net</a> (mxgmx007) Nemesis ESMTP Service not<br/>    available 554-No SMTP service 554-IP address is block listed. 554 For<br/>    explanation visit<br/>    <a href="https://postmaster.gmx.net/de/case?c=r0301&i=ip&v=93.226.205.85&r=1Miqvu-1smwSs0SwO-00eqJt">https://postmaster.gmx.net/de/case?c=r0301&i=ip&v=93.226.205.85&r=1Miqvu-1smwSs0SwO-00eqJt</a><br/>Will-Retry-Until: Thu, 23 May 2024 16:35:26 +0200 (CEST)</p>',
//       attachment: ""
//     },
//     {
//       id: 4,
//       readed: true,
//       date: 'Sat, 18 May 2024 16:27:31 +0200 (CEST)',
//       subject: 'Undelivered Mail Returned to Sender',
//       from: 'MAILER-DAEMON@Litengut.dev (Mail Delivery System)',
//       to: 'max@litengut.dev',
//       text: 'This is the mail system at host Litengut.dev.\n' +
//         '\n' +
//         "I'm sorry to have to inform you that your message could not\n" +
//         "be delivered to one or more recipients. It's attached below.\n" +
//         '\n' +
//         'For further assistance, please send mail to postmaster.\n' +
//         '\n' +
//         'If you do so, please include this problem report. You can\n' +
//         'delete your own text from the attached returned message.\n' +
//         '\n' +
//         '                   The mail system\n' +
//         '\n' +
//         '<Litengut@icloud.com>: host mx02.mail.icloud.com[17.57.154.33] said: 550 5.7.1\n' +
//         '    Mail from IP 93.226.205.85 was rejected due to listing in Spamhaus PBL. For\n' +
//         '    details please see http://www.spamhaus.org/query/bl?ip=93.226.205.85 (in\n' +
//         '    reply to RCPT TO command)\n' +
//         '\n' +
//         'Reporting-MTA: dns; Litengut.dev\n' +
//         'X-Postcow-Queue-ID: 0B771A8F20\n' +
//         'X-Postcow-Sender: rfc822; max@litengut.dev\n' +
//         'Arrival-Date: Sat, 18 May 2024 16:27:28 +0200 (CEST)\n' +
//         '\n' +
//         'Final-Recipient: rfc822; Litengut@icloud.com\n' +
//         'Original-Recipient: rfc822;Litengut@icloud.com\n' +
//         'Action: failed\n' +
//         'Status: 5.7.1\n' +
//         'Remote-MTA: dns; mx02.mail.icloud.com\n' +
//         'Diagnostic-Code: smtp; 550 5.7.1 Mail from IP 93.226.205.85 was rejected due to\n' +
//         '    listing in Spamhaus PBL. For details please see\n' +
//         '    http://www.spamhaus.org/query/bl?ip=93.226.205.85\n',
//       textAsHtml: '<p>This is the mail system at host <a href="http://Litengut.dev">Litengut.dev</a>.</p><p>I&apos;m sorry to have to inform you that your message could not<br/>be delivered to one or more recipients. It&apos;s attached below.</p><p>For further assistance, please send mail to postmaster.</p><p>If you do so, please include this problem report. You can<br/>delete your own text from the attached returned message.</p><p>                   The mail system</p><p>&lt;<a href="mailto:Litengut@icloud.com">Litengut@icloud.com</a>&gt;: host <a href="http://mx02.mail.icloud.com">mx02.mail.icloud.com</a>[<a href="http://17.57.154.33">17.57.154.33</a>] said: 550 5.7.1<br/>    Mail from IP <a href="http://93.226.205.85">93.226.205.85</a> was rejected due to listing in Spamhaus PBL. For<br/>    details please see <a href="http://www.spamhaus.org/query/bl?ip=93.226.205.85">http://www.spamhaus.org/query/bl?ip=93.226.205.85</a> (in<br/>    reply to RCPT TO command)</p><br/>\n' +
//         '<p>Reporting-MTA: dns; <a href="http://Litengut.dev">Litengut.dev</a><br/>X-Postcow-Queue-ID: 0B771A8F20<br/>X-Postcow-Sender: rfc822; <a href="mailto:max@litengut.dev">max@litengut.dev</a><br/>Arrival-Date: Sat, 18 May 2024 16:27:28 +0200 (CEST)</p><p>Final-Recipient: rfc822; <a href="mailto:Litengut@icloud.com">Litengut@icloud.com</a><br/>Original-Recipient: <a href="mailto:rfc822;Litengut@icloud.com">rfc822;Litengut@icloud.com</a><br/>Action: failed<br/>Status: 5.7.1<br/>Remote-MTA: dns; <a href="http://mx02.mail.icloud.com">mx02.mail.icloud.com</a><br/>Diagnostic-Code: smtp; 550 5.7.1 Mail from IP <a href="http://93.226.205.85">93.226.205.85</a> was rejected due to<br/>    listing in Spamhaus PBL. For details please see<br/>    <a href="http://www.spamhaus.org/query/bl?ip=93.226.205.85">http://www.spamhaus.org/query/bl?ip=93.226.205.85</a></p>',
//       attachment: ""
//     },
//     {
//       id: 5,
//       readed: true,
//       date: 'Sat, 18 May 2024 20:22:46 +0200 (CEST)',
//       subject: 'Undelivered Mail Returned to Sender',
//       from: 'MAILER-DAEMON@Litengut.dev (Mail Delivery System)',
//       to: 'max@litengut.dev',
//       text: 'This is the mail system at host Litengut.dev.\n' +
//         '\n' +
//         "I'm sorry to have to inform you that your message could not\n" +
//         "be delivered to one or more recipients. It's attached below.\n" +
//         '\n' +
//         'For further assistance, please send mail to postmaster.\n' +
//         '\n' +
//         'If you do so, please include this problem report. You can\n' +
//         'delete your own text from the attached returned message.\n' +
//         '\n' +
//         '                   The mail system\n' +
//         '\n' +
//         '<Litengut@icloud.com>: host mx01.mail.icloud.com[17.56.9.31] said: 550 5.7.1\n' +
//         '    Mail from IP 93.226.205.85 was rejected due to listing in Spamhaus PBL. For\n' +
//         '    details please see http://www.spamhaus.org/query/bl?ip=93.226.205.85 (in\n' +
//         '    reply to RCPT TO command)\n' +
//         '\n' +
//         'Reporting-MTA: dns; Litengut.dev\n' +
//         'X-Postcow-Queue-ID: 45E20A6571\n' +
//         'X-Postcow-Sender: rfc822; max@litengut.dev\n' +
//         'Arrival-Date: Sat, 18 May 2024 20:22:44 +0200 (CEST)\n' +
//         '\n' +
//         'Final-Recipient: rfc822; Litengut@icloud.com\n' +
//         'Original-Recipient: rfc822;Litengut@icloud.com\n' +
//         'Action: failed\n' +
//         'Status: 5.7.1\n' +
//         'Remote-MTA: dns; mx01.mail.icloud.com\n' +
//         'Diagnostic-Code: smtp; 550 5.7.1 Mail from IP 93.226.205.85 was rejected due to\n' +
//         '    listing in Spamhaus PBL. For details please see\n' +
//         '    http://www.spamhaus.org/query/bl?ip=93.226.205.85\n',
//       textAsHtml: '<p>This is the mail system at host <a href="http://Litengut.dev">Litengut.dev</a>.</p><p>I&apos;m sorry to have to inform you that your message could not<br/>be delivered to one or more recipients. It&apos;s attached below.</p><p>For further assistance, please send mail to postmaster.</p><p>If you do so, please include this problem report. You can<br/>delete your own text from the attached returned message.</p><p>                   The mail system</p><p>&lt;<a href="mailto:Litengut@icloud.com">Litengut@icloud.com</a>&gt;: host <a href="http://mx01.mail.icloud.com">mx01.mail.icloud.com</a>[<a href="http://17.56.9.31">17.56.9.31</a>] said: 550 5.7.1<br/>    Mail from IP <a href="http://93.226.205.85">93.226.205.85</a> was rejected due to listing in Spamhaus PBL. For<br/>    details please see <a href="http://www.spamhaus.org/query/bl?ip=93.226.205.85">http://www.spamhaus.org/query/bl?ip=93.226.205.85</a> (in<br/>    reply to RCPT TO command)</p><br/>\n' +
//         '<p>Reporting-MTA: dns; <a href="http://Litengut.dev">Litengut.dev</a><br/>X-Postcow-Queue-ID: 45E20A6571<br/>X-Postcow-Sender: rfc822; <a href="mailto:max@litengut.dev">max@litengut.dev</a><br/>Arrival-Date: Sat, 18 May 2024 20:22:44 +0200 (CEST)</p><p>Final-Recipient: rfc822; <a href="mailto:Litengut@icloud.com">Litengut@icloud.com</a><br/>Original-Recipient: <a href="mailto:rfc822;Litengut@icloud.com">rfc822;Litengut@icloud.com</a><br/>Action: failed<br/>Status: 5.7.1<br/>Remote-MTA: dns; <a href="http://mx01.mail.icloud.com">mx01.mail.icloud.com</a><br/>Diagnostic-Code: smtp; 550 5.7.1 Mail from IP <a href="http://93.226.205.85">93.226.205.85</a> was rejected due to<br/>    listing in Spamhaus PBL. For details please see<br/>    <a href="http://www.spamhaus.org/query/bl?ip=93.226.205.85">http://www.spamhaus.org/query/bl?ip=93.226.205.85</a></p>',
//       attachment: ""
//     },
//     {
//       id: 8,
//       readed: true,
//       date: 'Sat, 18 May 2024 20:47:57 +0200 (CEST)',
//       subject: 'Undelivered Mail Returned to Sender',
//       from: 'MAILER-DAEMON@Litengut.dev (Mail Delivery System)',
//       to: 'max@litengut.dev',
//       text: 'This is the mail system at host Litengut.dev.\n' +
//         '\n' +
//         "I'm sorry to have to inform you that your message could not\n" +
//         "be delivered to one or more recipients. It's attached below.\n" +
//         '\n' +
//         'For further assistance, please send mail to postmaster.\n' +
//         '\n' +
//         'If you do so, please include this problem report. You can\n' +
//         'delete your own text from the attached returned message.\n' +
//         '\n' +
//         '                   The mail system\n' +
//         '\n' +
//         '<Litengut@icloud.com>: host mx02.mail.icloud.com[17.57.155.25] said: 550 5.7.1\n' +
//         '    Mail from IP 93.226.205.85 was rejected due to listing in Spamhaus PBL. For\n' +
//         '    details please see http://www.spamhaus.org/query/bl?ip=93.226.205.85 (in\n' +
//         '    reply to RCPT TO command)\n' +
//         '\n' +
//         'Reporting-MTA: dns; Litengut.dev\n' +
//         'X-Postcow-Queue-ID: 63F2BA6574\n' +
//         'X-Postcow-Sender: rfc822; max@litengut.dev\n' +
//         'Arrival-Date: Sat, 18 May 2024 20:47:53 +0200 (CEST)\n' +
//         '\n' +
//         'Final-Recipient: rfc822; Litengut@icloud.com\n' +
//         'Original-Recipient: rfc822;Litengut@icloud.com\n' +
//         'Action: failed\n' +
//         'Status: 5.7.1\n' +
//         'Remote-MTA: dns; mx02.mail.icloud.com\n' +
//         'Diagnostic-Code: smtp; 550 5.7.1 Mail from IP 93.226.205.85 was rejected due to\n' +
//         '    listing in Spamhaus PBL. For details please see\n' +
//         '    http://www.spamhaus.org/query/bl?ip=93.226.205.85\n',
//       textAsHtml: '<p>This is the mail system at host <a href="http://Litengut.dev">Litengut.dev</a>.</p><p>I&apos;m sorry to have to inform you that your message could not<br/>be delivered to one or more recipients. It&apos;s attached below.</p><p>For further assistance, please send mail to postmaster.</p><p>If you do so, please include this problem report. You can<br/>delete your own text from the attached returned message.</p><p>                   The mail system</p><p>&lt;<a href="mailto:Litengut@icloud.com">Litengut@icloud.com</a>&gt;: host <a href="http://mx02.mail.icloud.com">mx02.mail.icloud.com</a>[<a href="http://17.57.155.25">17.57.155.25</a>] said: 550 5.7.1<br/>    Mail from IP <a href="http://93.226.205.85">93.226.205.85</a> was rejected due to listing in Spamhaus PBL. For<br/>    details please see <a href="http://www.spamhaus.org/query/bl?ip=93.226.205.85">http://www.spamhaus.org/query/bl?ip=93.226.205.85</a> (in<br/>    reply to RCPT TO command)</p><br/>\n' +
//         '<p>Reporting-MTA: dns; <a href="http://Litengut.dev">Litengut.dev</a><br/>X-Postcow-Queue-ID: 63F2BA6574<br/>X-Postcow-Sender: rfc822; <a href="mailto:max@litengut.dev">max@litengut.dev</a><br/>Arrival-Date: Sat, 18 May 2024 20:47:53 +0200 (CEST)</p><p>Final-Recipient: rfc822; <a href="mailto:Litengut@icloud.com">Litengut@icloud.com</a><br/>Original-Recipient: <a href="mailto:rfc822;Litengut@icloud.com">rfc822;Litengut@icloud.com</a><br/>Action: failed<br/>Status: 5.7.1<br/>Remote-MTA: dns; <a href="http://mx02.mail.icloud.com">mx02.mail.icloud.com</a><br/>Diagnostic-Code: smtp; 550 5.7.1 Mail from IP <a href="http://93.226.205.85">93.226.205.85</a> was rejected due to<br/>    listing in Spamhaus PBL. For details please see<br/>    <a href="http://www.spamhaus.org/query/bl?ip=93.226.205.85">http://www.spamhaus.org/query/bl?ip=93.226.205.85</a></p>',
//       attachment: ""
//     },
//     {
//       id: 11,
//       readed: true,
//       date: 'Sun, 19 May 2024 23:22:33 +0200',
//       subject: 'LUHBSEfljhbb',
//       from: '"max" <test@litengut.dev>',
//       to: '"max" <max@litengut.dev>',
//       text: '\n' +
//         'So argerlich gewachsen lohgruben lieblinge schranken an. Reinlich richtete hinunter einander herunter sog fur bezahlen den. Du stimme kohlen besser du. Im fu kiste en steht sagst zu sitte. Sog igen trug das noch. Barbieren schnupfen gescheite wu en. Ubelnehmen kindlichen des sog hoffnungen vom und aufgespart.\n' +
//         '\n' +
//         'Funkelte es gegessen gesprach halbwegs wo in heiraten in. Gro oha sag geworden schonste brotlose trillern. Liebevoll dus behaglich arbeitete sah kindliche tun kellnerin kammertur. Gutmutigen hat halboffene grundstuck oha mag abendsuppe vor. Offnung klopfen dritten gut sag schlich wei bessern. Gruben minder fragte wir ehe herrje lie was. Halboffene verrichtet stockwerke es befangenen he in. Mogen was hin das lampe wesen sag. Das redete darauf nur wandte garten leicht.\n' +
//         '\n' +
//         'Sagerei wollten he em glatter offnung. Tag vorbeugte zum kammertur gut schwachem kreiselnd. Ans keinen mut regens ungern haften kronen lassen. Heimweh so barbara heruber beinahe in solchen em zu. Mu turnhalle gescheite da bekummert schranken sudwesten ei. Ratloses erschrak mu zu es er wohlfeil.\n' +
//         '\n' +
//         'Wohlgefuhl aufzulosen im mu achthausen hinstellte ubelnehmen bi. Gib nachtessen auskleiden getunchten gutmutigen vormittags dem freundlich. Rausperte kindliche ach der stockwerk gro dahinging ein. Ihr ihr augenblick tag mancherlei hof achthausen. Erkannte schweren gefallen mir nah ton blaulich burschen. Im kraftiger klimperte schlupfte mu fu mi muhlenrad. Er dachte wetter ja wieder wiegte kunste mussen. Schon leber ubers empor ist unten flu nacht all. Lampchen so zinnerne zitterte er bi spannung stabelle lockigen.\n' +
//         '\n' +
//         'Auch er denn aber la. Duftenden ri in sorglosen nachgehen. Bette la alles um wenns bibel angst. Seiner kostet himmel lie fehlen gut blo ist. Dienstmagd grundstuck zueinander schuchtern gutmutigen vielleicht es in zu. Uber halb sehe ku mirs so ganz dort ri.\n' +
//         '\n' +
//         'Hufschmied bescheiden kuchenture ob es stockwerke um knabenhaft geschwatzt. Starke frauen katzen hinaus kronen all luftig oha hut man. Bodenlosen grashalden wasserkrug je kartoffeln neidgefuhl regungslos so. Alten haben tat herrn wovon hin recht wenig. Zinnerne trillern gedichte du nirgends ab gebrauch. Gutmutigen te es bodenlosen nettigkeit. Vorpfeifen nie bodenlosen auskleiden zur.\n' +
//         '\n' +
//         'Auskleiden weg brotkugeln getunchten dammerigen grundstuck flo gut ten. Kopf auch fand bi en so je seid vorn. Viere blatt ehe guter hut. Ihre ohne noch in lauf mich zu im. Wahrend la in madchen ja so gedacht. Auskleiden man werkstatte das fluchtigen gib ton.\n' +
//         '\n' +
//         'Flo klopfte gerufen solange sei niemals. Da bi zitterte eigentum gelernte gegenden es halblaut ubrigens. Te gekommen behutsam er schonste liebsten zuweilen gelaufig. Zur fiel bist denn bat erde erst. Rief habs flei kam nein eine lang ans. Ein lattenzaun todesfalle mit lehrlingen. Hat adieu dus szene nacht uhr woher krank nur.\n' +
//         '\n' +
//         'Gekommen bat verwirrt zog vom gebrauch eigentum heimelig. Frohlicher mancherlei nun nachmittag messingnen neidgefuhl hut die. Seinem gar wollen handen selber bei. Bi feld oden eile buch bett im ja. Spinat zeigte tun daheim see willst gro ihr. Du la ordnung ja ab gebogen jungfer spruche richtig. Gerochen mi fraulein marschen es he streckte.\n' +
//         '\n' +
//         'Richtete es vorliebe stromung so. Komme so enden mi sa solle unten. Schlanken hemdarmel eintreten art nichtstun und wachsamen. Ertastete he gegenteil gestrigen es. Gerber wichse wandte nur gebaut rothfu ungern bei. Ware fiel hab sto gott voll dies wach see. Tat drehte weg braves stiege das mutter fraget. Dampf boden ganze geh krank ist einen essen ins. Ordnung gut uberall gut hol glatten anderen schaute. Bei allerlei ans aufstand zugvogel ich hindurch heiraten zuweilen.\n',
//       textAsHtml: '<p>So argerlich gewachsen lohgruben lieblinge schranken an. Reinlich richtete hinunter einander herunter sog fur bezahlen den. Du stimme kohlen besser du. Im fu kiste en steht sagst zu sitte. Sog igen trug das noch. Barbieren schnupfen gescheite wu en. Ubelnehmen kindlichen des sog hoffnungen vom und aufgespart.</p><p>Funkelte es gegessen gesprach halbwegs wo in heiraten in. Gro oha sag geworden schonste brotlose trillern. Liebevoll dus behaglich arbeitete sah kindliche tun kellnerin kammertur. Gutmutigen hat halboffene grundstuck oha mag abendsuppe vor. Offnung klopfen dritten gut sag schlich wei bessern. Gruben minder fragte wir ehe herrje lie was. Halboffene verrichtet stockwerke es befangenen he in. Mogen was hin das lampe wesen sag. Das redete darauf nur wandte garten leicht.</p><p>Sagerei wollten he em glatter offnung. Tag vorbeugte zum kammertur gut schwachem kreiselnd. Ans keinen mut regens ungern haften kronen lassen. Heimweh so barbara heruber beinahe in solchen em zu. Mu turnhalle gescheite da bekummert schranken sudwesten ei. Ratloses erschrak mu zu es er wohlfeil.</p><p>Wohlgefuhl aufzulosen im mu achthausen hinstellte ubelnehmen bi. Gib nachtessen auskleiden getunchten gutmutigen vormittags dem freundlich. Rausperte kindliche ach der stockwerk gro dahinging ein. Ihr ihr augenblick tag mancherlei hof achthausen. Erkannte schweren gefallen mir nah ton blaulich burschen. Im kraftiger klimperte schlupfte mu fu mi muhlenrad. Er dachte wetter ja wieder wiegte kunste mussen. Schon leber ubers empor ist unten flu nacht all. Lampchen so zinnerne zitterte er bi spannung stabelle lockigen.</p><p>Auch er denn aber la. Duftenden ri in sorglosen nachgehen. Bette la alles um wenns bibel angst. Seiner kostet himmel lie fehlen gut blo ist. Dienstmagd grundstuck zueinander schuchtern gutmutigen vielleicht es in zu. Uber halb sehe ku mirs so ganz dort ri.</p><p>Hufschmied bescheiden kuchenture ob es stockwerke um knabenhaft geschwatzt. Starke frauen katzen hinaus kronen all luftig oha hut man. Bodenlosen grashalden wasserkrug je kartoffeln neidgefuhl regungslos so. Alten haben tat herrn wovon hin recht wenig. Zinnerne trillern gedichte du nirgends ab gebrauch. Gutmutigen te es bodenlosen nettigkeit. Vorpfeifen nie bodenlosen auskleiden zur.</p><p>Auskleiden weg brotkugeln getunchten dammerigen grundstuck flo gut ten. Kopf auch fand bi en so je seid vorn. Viere blatt ehe guter hut. Ihre ohne noch in lauf mich zu im. Wahrend la in madchen ja so gedacht. Auskleiden man werkstatte das fluchtigen gib ton.</p><p>Flo klopfte gerufen solange sei niemals. Da bi zitterte eigentum gelernte gegenden es halblaut ubrigens. Te gekommen behutsam er schonste liebsten zuweilen gelaufig. Zur fiel bist denn bat erde erst. Rief habs flei kam nein eine lang ans. Ein lattenzaun todesfalle mit lehrlingen. Hat adieu dus szene nacht uhr woher krank nur.</p><p>Gekommen bat verwirrt zog vom gebrauch eigentum heimelig. Frohlicher mancherlei nun nachmittag messingnen neidgefuhl hut die. Seinem gar wollen handen selber bei. Bi feld oden eile buch bett im ja. Spinat zeigte tun daheim see willst gro ihr. Du la ordnung ja ab gebogen jungfer spruche richtig. Gerochen mi fraulein marschen es he streckte.</p><p>Richtete es vorliebe stromung so. Komme so enden mi sa solle unten. Schlanken hemdarmel eintreten art nichtstun und wachsamen. Ertastete he gegenteil gestrigen es. Gerber wichse wandte nur gebaut rothfu ungern bei. Ware fiel hab sto gott voll dies wach see. Tat drehte weg braves stiege das mutter fraget. Dampf boden ganze geh krank ist einen essen ins. Ordnung gut uberall gut hol glatten anderen schaute. Bei allerlei ans aufstand zugvogel ich hindurch heiraten zuweilen.</p>',
//       attachment: ""
//     }
//   ]
  