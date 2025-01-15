"use client";
import { useAuth } from "@/providers/auth.context";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function ProfileCard() {
    const { user } = useAuth();
    if (!user) return <div>User data not found</div>

    const userNameFirstLetters = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();

    return (
        <div className="flex flex-row gap-x-3 w-full rounded-md items-center justify-start p-2 ring-1 ring-emerald-500/30 bg-emerald-500/10">
            {/* AVATAR */}
            <div className="h-full">
                <Avatar className="">
                    <AvatarImage src={user.profilePictureUrl} alt={user.userName} />
                    <AvatarFallback className="text-emerald-500">{userNameFirstLetters}</AvatarFallback>
                </Avatar>
            </div>
            <div className="h-full">
                <div className="">
                    {user.firstName} {user.lastName}
                </div>
                <div className="text-xs text-gray-500">
                    No bio data
                </div>
            </div>
        </div>
    )
}