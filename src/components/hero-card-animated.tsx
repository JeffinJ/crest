"use client";
import React from "react";
import { SupportedPlatformsPin } from "./supported-accounts";
import Image from "next/image";
import emerald from "../../public/assets/gem.png";

export function AnimatedHeroCard() {
    return (
        <div className="h-[30rem] w-full flex items-center justify-center ">
            <SupportedPlatformsPin>
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                    <div className="font-semibold text-4xl text-emerald-500 font-RubikVinyl text-center">
                        CREST
                    </div>
                    <div className="text-center text-sm py-1">
                        Your global profile
                    </div>
                    <div className="text-base !m-0 !p-0 font-normal flex items-center justify-center">
                        <Image
                            src={emerald}
                            alt="emerald"
                            width={250}
                            height={250}
                            priority
                            className=""
                        />
                    </div>
                    <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                </div>
            </SupportedPlatformsPin>
        </div>
    );
}
