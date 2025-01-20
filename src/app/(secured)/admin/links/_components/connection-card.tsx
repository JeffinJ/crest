import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Connection, SocialConnection } from "@/types/connection.types";
import {
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
import { IconBrandLinkedin } from "@tabler/icons-react";
import { Link, Radar } from "lucide-react";
import { useState } from "react";
import CustomConnectionForm from "./custom-connection-form";

type ConnectionCardProps = {
    connection: Connection
}

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

export default function ConnectionCard({ connection }: ConnectionCardProps) {
    const [mode, setMode] = useState<'view' | 'edit'>('view');

    let Icon = SupportedSocialConnections.find((socialConnection) => socialConnection.id === connection.connectionName);
    if (!Icon) Icon = {
        id: 'custom',
        name: 'Custom',
        icon: Radar,
        color: SiWhatsappHex,
    }
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center space-x-2">
                        {Icon && <Icon.icon size={20} color={Icon.color} />}
                        <CardTitle>{connection.connectionName}</CardTitle>
                    </div>
                    <Button
                        type="button"
                        variant={'ghost'}
                        onClick={() => setMode('edit')}
                        className="w-fit">
                        Edit
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {mode === 'view' ? (
                    <div className="flex flex-row space-x-2 items-center justify-start">
                        <div>
                            <Link className="w-3 h-3 text-blue-500" />
                        </div>
                        <div>
                            {connection.url}
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <CustomConnectionForm
                            initialData={{
                                name: connection.connectionName,
                                url: connection.url,
                            }}
                            onSave={() => { }}
                            onCanceled={() => {
                                setMode('view')
                            }} />
                    </div>
                )}
            </CardContent>
        </Card>
    )
};