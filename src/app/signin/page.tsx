import emerald from "../../../public/assets/gem.png"
import Image from "next/image";
import { SignInCard } from "@/components/signin-card";

export default function SignInPage() {
    return (
        <div className="flex flex-row h-full">
            <div className="h-full w-1/3 flex flex-col justify-center items-center">
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
            </div>
            <div className="w-1/2 h-full flex flex-col gap-y-5 items-start justify-center">
                <div className="flex flex-col gap-y-2">
                    <SignInCard />
                </div>
            </div>
        </div>
    )
}