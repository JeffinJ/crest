"use client"

import { useAuth } from "@/providers/auth.context"

export default function WelcomeCard() {
    const { user } = useAuth();
    return (
        <div>
            <div className="text-4xl">Hi {user?.firstName},</div>
            <div className="textt-sm text-gray-400">Welcome back, how is it going?</div>
        </div>
    )
};