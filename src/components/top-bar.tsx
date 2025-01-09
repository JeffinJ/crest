
"use client"
import Image from "next/image";
import crest from "../../public/assets/gem.png";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth.context";
import { User } from "lucide-react";
import { ProfileMenu } from "./profile-menu";

export default function TopBar() {
    const router = useRouter();
    const handleSignIn = () => {
        router.push(`${process.env.NEXT_PUBLIC_CREST_AUTH_CENTER_URL}/auth/google/signin`);
    };

    const { user } = useAuth();
    console.log(user);


    return (
        <div className="sticky top-0 z-50 w-full h-[80px] bg-secondary-50">
            <div className="flex justify-between items-center p-5">
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
                <div>
                    {user ?
                        (<>
                            <div className="flex flex-row space-x-2 items-center">
                                <div>
                                    <User />
                                </div>
                                <ProfileMenu />
                                <div>
                                    {user.firstName}
                                </div>
                            </div>
                        </>) :
                        (<>
                            <Button
                                variant={'ghost'}
                                onClick={handleSignIn}
                                className="">Sign In</Button></>
                        )}
                </div>
            </div>
        </div>
    )
}