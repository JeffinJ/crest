
"use client"
import Image from "next/image";
import crest from "../../../public/assets/gem.png";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth.context";
import { cn } from "@/lib/utils";
import ButtonWithGradient from "../ui/button-with-gradient";
import { ProfileMenu } from "../profile-menu";
import { Button } from "../ui/button";

export default function TopBar() {
    const router = useRouter();
    const pathName = usePathname();
    const isAdminRoute = pathName.includes("/admin");

    const handleSignIn = () => {
        router.push(`${process.env.NEXT_PUBLIC_CREST_AUTH_CENTER_URL}/auth/google/signin`);
    };
    const { user } = useAuth();

    return (
        <div className="sticky top-0 z-50 w-full h-[80px] bg-secondary-50">
            <div className={cn("flex justify-between items-center py-5 ", isAdminRoute ? "justify-end" : "justify-between")}>
                {!isAdminRoute && (
                    <div className="flex flex-row space-x-2 items-center ">
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
                )}

                <div className="flex flex-row space-x-2 items-center ">
                    {user ?
                        (
                            <>
                                {!isAdminRoute && (
                                    <ButtonWithGradient
                                        onClick={() => router.push('/admin')}>
                                        <div>
                                            Manage
                                        </div>
                                    </ButtonWithGradient>
                                )}
                                <ProfileMenu user={user} />
                            </>) :
                        (<Button
                            variant={'ghost'}
                            onClick={handleSignIn}
                            className="">Sign In</Button>)}

                </div>
            </div>
        </div>
    )
}