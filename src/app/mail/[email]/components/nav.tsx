"use client";

import { useSearchParams,usePathname } from 'next/navigation'
import { useCallback } from 'react';
import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants,Button } from "@/components/ui/button";
interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const searchParams = useSearchParams()
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
  
      return params.toString()
    },
    [searchParams]
  )
  const mailboxParam = searchParams.get('mailbox')
  const pathname = usePathname()

  return (
    <div
      data-collapsed={isCollapsed}
      className="group  gap-4 py-2"
    >
      <nav className="grid gap-1 px-2 ">
        {links.map((link, index) =>
                
                <Link
                href={pathname + "?" + createQueryString("mailbox",link.title)}
                key={index}
                className={cn(
                  buttonVariants({ variant: link.title === mailboxParam ? ("default") :("ghost"), size: "sm" }),
                  link.title === mailboxParam &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start",
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}

                <span className = "ml-auto" >
                    {link.label}
                </span>
              </Link>
            )
        }
        
      </nav>

    </div>
  );
}   
