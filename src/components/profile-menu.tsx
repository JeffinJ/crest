import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { User } from "@/types/auth.tyes"
import { HelpCircle, LucideLogOut, Settings2Icon } from "lucide-react"
import { useAuth } from "@/providers/auth.context"

type ProfileMenuProps = {
    user: User
}

export function ProfileMenu({ user }: ProfileMenuProps) {
    const { userName, profilePictureUrl } = user
    const imageURL = profilePictureUrl || "https://github.com/shadcn.png";
    const { signOut } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <Avatar className="">
                    <AvatarImage src={imageURL} alt={userName} />
                    <AvatarFallback>{userName}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit mt-2  bg-slate-900  text-white  border-slate-700">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-row gap-x-2 cursor-pointer">
                        <Settings2Icon size={16} />
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem className="flex flex-row gap-x-2 cursor-pointer">
                    <HelpCircle size={16} />
                    Support
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-row gap-x-2 cursor-pointer"
                    onClick={signOut}>
                    <LucideLogOut size={16} />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
