import { ButtonWithGradient } from "@/components/ui/button-with-gradient";
import { SUPPORTED_SOCIAL_PLATFORMS } from "@/config/app-config";
import { SocialConnection } from "@/types/connection.types";
import { useState } from "react";
import { SiX } from "@icons-pack/react-simple-icons";
import { useQueryClient } from "@tanstack/react-query";
import CreateSocialConnection from "./forms/social/create-social-connection";
import { cn } from "@/lib/utils";

export default function SocialConnectionSelector() {
    const [selectedPlatform, setSelectedPlatform] = useState<SocialConnection | null>(null);
    const queryClinet = useQueryClient();
    const refreshConnections = () => {
        queryClinet.invalidateQueries({
            queryKey: ["links"]
        })
    }
    return (
        <div className="ring-1 p-5 rounded-md ring-gray-200 dark:ring-gray-800 flex flex-col space-y-3">
            <div className="flex flex-col space-y-3">
                <div>Add a social connection</div>
                <div className="flex flex-wrap items-center justify-center gap-5">
                    {SUPPORTED_SOCIAL_PLATFORMS.map((connection) => {
                        const Icon = connection.icon || SiX;
                        return (
                            <ButtonWithGradient
                                key={connection.id}
                                type="button"
                                onClick={() => { setSelectedPlatform(connection) }}
                                className={cn(
                                    "flex flex-col items-center justify-center py-7 w-20 h-20",
                                    selectedPlatform?.id === connection.id ? "bg-gray-200 dark:bg-gray-900 ring-1 ring-emerald-500/30" : "",
                                    "transition-all duration-500"
                                )}
                                gradientColors={{
                                    via1: 'emerald-500',
                                    via2: 'indigo-600'
                                }}>
                                <Icon className="w-10 h-10 " color={connection.color} />
                                <div className="text-xs">{connection.name}</div>
                            </ButtonWithGradient>
                        )
                    })}
                </div>
            </div>
            {selectedPlatform &&
                (
                    <CreateSocialConnection
                        platform={selectedPlatform}
                        onSave={refreshConnections}
                        onCanceled={() => {
                            setSelectedPlatform(null)
                        }} />
                )
            }
        </div>
    )
}