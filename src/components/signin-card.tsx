"use client";
import React from "react";
import {
    IconBrandApple,
    IconBrandGoogle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth.context";
import { StepForward } from "lucide-react";
import { ButtonWithGradient } from "./ui/button-with-gradient";

export function SignInCard() {
    const router = useRouter();
    const { user, jwt } = useAuth();
    const handleSignIn = () => {
        router.push(`${process.env.NEXT_PUBLIC_CREST_AUTH_CENTER_URL}/auth/google/signin`);
    };

    const continueAsLoggedInUser = () => {
        router.push("/admin");
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h1 className="font-semibold text-2xl text-emerald-500">
                Welcome back!
            </h1>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-400">
                Your one global profile for all your social media accounts. No more link trees. Create and manage your circle of friends.
            </p>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            <div className="flex flex-col space-y-4">
                {jwt && user && (
                    <ButtonWithGradient
                        className=" relative group/btn flex items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="button"
                        onClick={continueAsLoggedInUser}
                        gradientColors={{
                            via1: "yellow-500",
                            via2: "emerald-400"
                        }}
                    >
                        <StepForward className="h-5 w-5 text-neutral-800 dark:text-yellow-300" />
                        <span className="text-neutral-700 dark:text-yellow-300 text-sm">
                            Continue as {user.firstName}
                        </span>
                        <BottomGradient />
                    </ButtonWithGradient>
                )}
                <button
                    className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="button"
                    onClick={handleSignIn}
                >
                    <IconBrandGoogle className="h-5 w-5 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Sign in with  Google
                    </span>
                    <BottomGradient />
                </button>
                <button
                    className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] 
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                    disabled
                    onClick={handleSignIn}
                >
                    <IconBrandApple className="h-5 w-5 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Sign in with  Apple
                    </span>
                </button>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

