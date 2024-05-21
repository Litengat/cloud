"use client";

import {Nav} from './nav'
import {Separator} from '@/components/ui/separator'
import { strict } from 'assert';
import {
    AlertCircle,
    Archive,
    ArchiveX,
    File,
    Inbox,
    MessagesSquare,
    PenBox,
    Search,
    Send,
    ShoppingCart,
    Trash2,
    Users2,
  } from "lucide-react";

  
export function TestNav(){
    return (
        <div>
            <Nav
                isCollapsed={true}
                links={[
                    {
                      title: "Inbox",
                      label: "128",
                      icon: Inbox,
                      variant: "default",
                    },
                    {
                      title: "Drafts",
                      label: "9",
                      icon: File,
                      variant: "default",
                    },
                    {
                      title: "Sent",
                      label: "",
                      icon: Send,
                      variant: "ghost",
                    },
                    {
                      title: "Junk",
                      label: "23",
                      icon: ArchiveX,
                      variant: "ghost",
                    },
                    {
                      title: "Trash",
                      label: "",
                      icon: Trash2,
                      variant: "ghost",
                    },
                    {
                      title: "Archive",
                      label: "",
                      icon: Archive,
                      variant: "ghost",
                    },
                  ]}
            />
            <Separator/>
          <Nav
            isCollapsed={true}
            links={[
              {
                title: "Social",
                label: "972",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Updates",
                label: "342",
                icon: AlertCircle,
                variant: "ghost",
              },
              {
                title: "Forums",
                label: "128",
                icon: MessagesSquare,
                variant: "ghost",
              },
              {
                title: "Shopping",
                label: "8",
                icon: ShoppingCart,
                variant: "ghost",
              },
              {
                title: "Promotions",
                label: "21",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
        </div>
    )
}