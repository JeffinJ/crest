import { ButtonWithGradient } from "@/components/ui/button-with-gradient";
import { SUPPORTED_SOCIAL_PLATFORMS } from "@/config/app-config";
import { SocialConnection } from "@/types/connection.types";
import { useState } from "react";
import SocialConnectionForm from "./social-connection-form";
import { SiX } from "@icons-pack/react-simple-icons";

export default function SocialConnectionSelector() {
    const [selectedPlatform, setSelectedPlatform] = useState<SocialConnection | null>(null);

    return (
        <div className="ring-1 p-5 rounded-md ring-gray-200 dark:ring-gray-800 flex flex-col space-y-3">
            {selectedPlatform ?
                (
                    <SocialConnectionForm
                        platform={selectedPlatform}
                        initialData={{ url: "" }}
                        onSave={() => { }}
                        onCanceled={() => { }} />
                )
                :
                (
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
                                        className="flex flex-col items-center justify-center py-7 w-20 h-20">
                                        <Icon className="w-10 h-10" color={connection.color} />
                                        <div className="text-xs">{connection.name}</div>
                                    </ButtonWithGradient>
                                )
                            })}
                        </div>
                    </div>
                )}
        </div>
    )
}