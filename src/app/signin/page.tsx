import emerald from "../../../public/assets/gem.png"
import Image from "next/image";
import { SignInCard } from "@/components/signin-card";
import Link from "next/link";

export default function SignInPage() {
    return (
        <div className="grid grid-cols-2 h-full">
            <div className="flex w-full items-center justify-end">
                <Link href={'/'} className="h-full w-fit flex flex-col justify-center items-center">
                    <Image
                        src={emerald}
                        alt="emerald"
                        width={250}
                        height={250}
                        priority
                        className=""
                    />
                    <div className="font-semibold text-4xl text-emerald-500 font-RubikVinyl">
                        CREST
                    </div>
                </Link>
            </div>
            <div className="h-full flex flex-col gap-y-5 items-start justify-center">
                <div className="flex flex-col gap-y-2">
                    <SignInCard />
                </div>
            </div>
        </div>
    )
}