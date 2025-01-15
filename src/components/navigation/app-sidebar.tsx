"use client"

import * as React from "react"
import {
    Bot,
    LayoutDashboardIcon,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import Image from "next/image";
import crest from "../../../public/assets/gem.png";
import { useAuth } from "@/providers/auth.context"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutDashboardIcon,
            isActive: false,
        },
        {
            title: "Links",
            url: "/admin/links",
            icon: SquareTerminal,
            isActive: false,
        },
        {
            title: "Analytics",
            url: "/admin/analytics",
            icon: Bot,
            isActive: false,
        },
        {
            title: "Settings",
            url: "/admin/settings",
            icon: Settings2,
            isActive: false,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useAuth();
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className="flex flex-row space-x-2 items-center justify-between py-2">
                    <div className="flex flex-row space-x-2 items-center">
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
                    <SidebarTrigger disabled />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                {user && (
                    <NavUser user={user} />
                )}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
