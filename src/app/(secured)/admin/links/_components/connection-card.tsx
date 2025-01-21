import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Connection } from "@/types/connection.types";
import {
    SiWhatsappHex
} from "@icons-pack/react-simple-icons";
import { Link, Radar, Trash2 } from "lucide-react";
import { useState } from "react";
import { ButtonWithGradient } from "@/components/ui/button-with-gradient";
import { SUPPORTED_SOCIAL_PLATFORMS } from "@/config/app-config";
import EditCustomConnection from "./edit-customer-connection";

type ConnectionCardProps = {
    connection: Connection,
    onDelete: (connection: Connection) => void,
}

export default function ConnectionCard({ connection }: ConnectionCardProps) {
    const [mode, setMode] = useState<'view' | 'edit'>('view');

    let Icon = SUPPORTED_SOCIAL_PLATFORMS.find((socialConnection) => socialConnection.id === connection.connectionName);
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
                    <div className="flex flex-row items-center space-x-1 justify-center">
                        <ButtonWithGradient
                            type="button"
                            variant={'ghost'}
                            onClick={() => setMode('edit')}
                            className="w-fit">
                            Edit
                        </ButtonWithGradient>
                        <Button
                            type="button"
                            variant={'ghost'}
                            onClick={() => setMode('edit')}
                            className="w-fit text-red-400 hover:text-red-500">
                            <Trash2 size={20} />
                        </Button>
                    </div>
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
                        <EditCustomConnection
                            initialData={{
                                id: connection.id,
                                userId: connection.userId,
                                connectionName: connection.connectionName,
                                url: connection.url,
                            }}
                            onSaved={()=>{}}
                            onCanceled={() => {
                                setMode('view')
                            }} />
                    </div>
                )}
            </CardContent>
        </Card>
    )
};