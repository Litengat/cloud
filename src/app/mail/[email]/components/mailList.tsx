"use client";
import {formatDistanceToNow} from "date-fns/formatDistanceToNow";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCallback } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams,usePathname } from 'next/navigation'
import Link from "next/link";
import {mail} from "../Mail"


export function MailBoxTitle(){
  const searchParams = useSearchParams()
  const mailbox:string = searchParams.get('mailbox')
  return (<h1 className="text-xl font-bold">{mailbox}</h1>)
}




export function MailList({ emails }:{
    emails: mail[]
}) {
    const searchParams = useSearchParams()
    const selectedID:Number =  parseInt(searchParams.get('emailId')|| "0")
    const pathname = usePathname()
    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
      
          return params.toString()
        },
        [searchParams]
      )
  
    return (
      <ScrollArea className="h-full ">
        <div className="flex flex-col gap-2 p-4 pt-0">
          {emails.toReversed().map((mail,index) => (
            <Link
              key={mail.emailid}
              href={pathname + "?" + createQueryString("emailid",index.toString())}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                selectedID === mail.emailid && "bg-muted",
              )}
              
              
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{mail.from}</div>
                    {!mail.readed && (
                      <span className="flex rounded-full bg-blue-600" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      selectedID === mail.emailid
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {formatDistanceToNow(new Date(mail.date), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div className="text-xs font-medium">{mail.subject}</div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {mail.text.substring(0, 300)}
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    );
}


