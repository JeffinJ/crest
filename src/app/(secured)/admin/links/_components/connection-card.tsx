import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Connection } from "@/types/connection.types";
import {
    SiWhatsappHex
} from "@icons-pack/react-simple-icons";
import { Link as LinkIcon, Radar, Trash2 } from "lucide-react";
import { useState } from "react";
import { ButtonWithGradient } from "@/components/ui/button-with-gradient";
import { SUPPORTED_SOCIAL_PLATFORMS } from "@/config/app-config";
import { useQueryClient } from "@tanstack/react-query";
import EditSocialConnection from "./forms/social/edit-social-connection";
import Link from 'next/link'
import { ConfirmAction } from "@/components/confirm-action-dialog";

type ConnectionCardProps = {
    isLoading: boolean,
    connection: Connection,
    onDelete: (id: number) => void,
}

export default function ConnectionCard({
    connection,
    isLoading,
    onDelete }: ConnectionCardProps) {
    const [mode, setMode] = useState<'view' | 'edit'>('view');
    const queryClinet = useQueryClient();

    let SocialPlatform = SUPPORTED_SOCIAL_PLATFORMS.find((socialConnection) => socialConnection.id === connection.connectionName);
    if (!SocialPlatform) SocialPlatform = {
        id: 'custom',
        name: 'Custom',
        icon: Radar,
        color: SiWhatsappHex,
    }

    const refreshConnections = async () => {
        await queryClinet.invalidateQueries({
            queryKey: ["links"]
        })
    }

    const onEditComplete = async () => {
        await refreshConnections();
        setMode('view');
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center space-x-2">
                        {SocialPlatform && <SocialPlatform.icon size={20} color={SocialPlatform.color} />}
                        <CardTitle>{connection.connectionName}</CardTitle>
                    </div>
                    <div className="flex flex-row items-center space-x-1 justify-center">
                        <ButtonWithGradient
                            type="button"
                            variant={'ghost'}
                            disabled={isLoading}
                            onClick={() => setMode('edit')}
                            className="w-fit">
                            Edit
                        </ButtonWithGradient>
                        <ConfirmAction
                            trigger={<Button variant="ghost"><Trash2 size={20} /></Button>}
                            title="Delete Connection"
                            description="Are you sure you want to delete this connection?"
                            confirmText="Delete"
                            variant="destructive"
                            onConfirm={() => { onDelete(connection.id) }}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {mode === 'view' ? (
                    <div className="flex flex-row space-x-2 items-center justify-start">
                        <LinkIcon className="w-3 h-3 text-blue-500" />
                        <div className="">
                            <Link
                                href={connection.url}
                                target="_blank"
                                aria-disabled={isLoading}
                                className="text-blue-500 hover:underline"
                            >
                                {connection.url}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <EditSocialConnection
                            initilaData={{
                                id: connection.id,
                                connectionName: connection.connectionName,
                                url: connection.url,
                                connectionType: connection.connectionType,
                                userId: connection.userId,
                            }}
                            onSave={onEditComplete}
                            onCanceled={() => {
                                setMode('view')
                            }}
                            platform={SocialPlatform}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
};