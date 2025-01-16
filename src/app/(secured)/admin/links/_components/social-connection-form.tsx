import { ButtonWithGradient } from "@/components/ui/button-with-gradient";
import { Input } from "@/components/ui/input";
import {
    IconType,
    SiFacebook,
    SiFacebookHex,
    SiGithub,
    SiInstagram,
    SiInstagramHex,
    SiTiktok,
    SiWhatsapp,
    SiWhatsappHex,
    SiX,
    SiYoutube,
    SiYoutubeHex
} from "@icons-pack/react-simple-icons";
import { Icon, IconBrandLinkedin, IconProps } from "@tabler/icons-react";
import { Link } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

type SocialConnection = {
    id: string;
    name: string;
    icon: IconType | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    color?: string;
};

const SupportedSocialConnections: SocialConnection[] = [
    {
        id: 'x',
        name: "X",
        icon: SiX,
    },
    {
        id: 'instagram',
        name: "Instagram",
        icon: SiInstagram,
        color: SiInstagramHex,
    },
    {
        id: 'youtube',
        name: "YouTube",
        icon: SiYoutube,
        color: SiYoutubeHex,
    },
    {
        id: 'tiktok',
        name: "TikTok",
        icon: SiTiktok,
    },
    {
        id: 'linkedin',
        name: "LinkedIn",
        icon: IconBrandLinkedin,
    },
    {
        id: 'github',
        name: "GitHub",
        icon: SiGithub,
    },
    {
        id: 'facebook',
        name: "Facebook",
        icon: SiFacebook,
        color: SiFacebookHex,
    },
    {
        id: 'whatsapp',
        name: "WhatsApp",
        icon: SiWhatsapp,
        color: SiWhatsappHex,
    },
];

export default function SocialConnectionForm() {

    const [selectedPlatform, setSelectedPlatform] = useState<SocialConnection | null>(null);

    return (
        <div className="ring-1 p-5 rounded-md ring-gray-200 dark:ring-gray-800 flex flex-col space-y-3">
            {selectedPlatform ?
                (
                    <div className="flex flex-col space-y-3">
                        <div className="flex flex-row space-x-3 items-center justify-start">
                            <selectedPlatform.icon className="w-8 h-8" color={selectedPlatform.color} />
                            <div>{selectedPlatform.name}</div>
                        </div>
                        <div className="flex flex-row space-x-2 items-center justify-start">
                            <Input
                                placeholder="Profile URL"
                                className="placeholder-gray-400 dark:placeholder-gray-500" />
                        </div>
                        <div>
                            <ButtonWithGradient
                                type="button"
                                className=""
                                gradientColors={{
                                    via1: "emerald-500",
                                    via2: "emerald-400"
                                }}>
                                <Link className="w-3 h-3" />
                                <div>Connect</div>
                            </ButtonWithGradient>
                        </div>
                    </div>
                )
                :
                (
                    <div className="flex flex-col space-y-3">
                        <div>Add a social connection</div>
                        <div className="flex flex-wrap items-center justify-center gap-5">
                            {SupportedSocialConnections.map((connection) => {
                                const Icon = connection.icon;
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