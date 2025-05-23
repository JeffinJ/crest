import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SUPPORTED_SOCIAL_PLATFORMS } from "@/config/app-config";
import { Connection } from "@/types/connection.types";
import { UserPublicProfileType } from "@/types/user.types";
import { SiWhatsappHex } from "@icons-pack/react-simple-icons";
import { LinkIcon, Radar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import gem from '../../../../public/assets/gem.png';

type UserPublicProfileProps = {
    user: UserPublicProfileType;
};

export const ConnectionView = ({ connection }: { connection: Connection }) => {
    let SocialPlatform = SUPPORTED_SOCIAL_PLATFORMS.find((socialConnection) => socialConnection.id === connection.connectionName);
    if (!SocialPlatform) SocialPlatform = {
        id: 'custom',
        name: 'Custom',
        icon: Radar,
        color: SiWhatsappHex,
    }

    return (
        <Card key={connection.id} className="w-full">
            <CardHeader>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center space-x-2">
                        {SocialPlatform && <SocialPlatform.icon size={20} color={SocialPlatform.color} />}
                        <CardTitle>{connection.connectionName}</CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row space-x-2 items-center justify-start w-full">
                    <LinkIcon className="w-3 h-3 text-blue-500" />
                    <div className="">
                        <Link
                            href={connection.url}
                            target="_blank"
                            className="text-white hover:underline w-full">
                            {connection.url}
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
};

export default function UserPublicProfile({ user }: UserPublicProfileProps) {
    return (
        <div className="flex flex-col items-center h-screen p-5">
            <Card className="flex flex-col w-[600px] flex-1">
                <CardHeader>
                    <div className="flex flex-col justify-between items-center space-y-1">
                        <div className="text-3xl w-full font-bold text-emerald-500">
                            {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm w-full text-emerald-200">
                            @ {user.userName}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col overflow-y-auto">
                    <div className="flex flex-col gap-y-3">
                        {user.connections.map((connection) => (
                            <ConnectionView
                                key={connection.id}
                                connection={connection} />
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <Link
                        href='/'
                        className="flex flex-row items-center justify-center space-x-2">
                        <Image
                            alt="logo"
                            src={gem}
                            width={100}
                            height={100}
                            className="w-16 h-16"
                        />
                        <div className="font-RubikVinyl">
                            CREST
                        </div>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}