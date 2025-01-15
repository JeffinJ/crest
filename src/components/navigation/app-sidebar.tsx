"use client"

import * as React from "react"
import {
    Bot,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import Image from "next/image";
import crest from "../../../public/assets/gem.png";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Links",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: "Analytics",
            url: "#",
            icon: Bot,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className="flex flex-row space-x-2 items-center py-2">
                    <div>
                        <Image
                            src={crest}
                            alt="Crest"
                            width={40}
                            height={40} />
                    </div>
                    <div className="text-lg font-bold font-RubikVinyl">
                        CREST
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
