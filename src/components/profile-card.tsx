"use client";
import { useAuth } from "@/providers/auth.context";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";

export default function ProfileCard() {
    const { user } = useAuth();
    if (!user) return <div>User data not found</div>

    const userNameFirstLetters = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();

    return (
        <div className="flex flex-row gap-x-3 w-full rounded-md items-center justify-between p-2 ring-1 ring-emerald-500/30 bg-emerald-500/10">
            {/* AVATAR */}
            <div className="flex flex-row gap-x-3 items-center justify-start ">
                <div className="h-full">
                    <Avatar className="">
                        <AvatarImage src={user.profilePictureUrl} alt={user.userName} />
                        <AvatarFallback className="text-emerald-500">{userNameFirstLetters}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="h-full flex flex-col">
                    <div className="">
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="px-3">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href={`/${user.userName}`}
                                target="_blank"
                                className="text-emerald-500 rounded-full hover:bg-emerald-500/10 hover:drop-shadow-lg hover:shadow-black">
                                <div>
                                    <Eye size={18} />
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-900 text-white">
                            <p>View public profile</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}