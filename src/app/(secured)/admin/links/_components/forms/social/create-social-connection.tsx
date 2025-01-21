import { useAuth } from "@/providers/auth.context";
import { Connection, CreateConnectionData, SocialConnection } from "@/types/connection.types";
import { useAction } from "next-safe-action/hooks";
import { createUserConnectionAction } from "@/server/actions/connections/connection.action";
import { useToast } from "@/hooks/use-toast";
import SocialConnectionForm from "./social-connection-form";
import { SocialConnectionFormSchema } from "@/lib/zod-schemas/user-connections";
import { z } from "zod";

type CustomConnectionFormProps = {
    platform: SocialConnection;
    onSave: (connectionData: Connection) => void;
    onCanceled: () => void;
};

export default function CreateSocialConnection({
    platform,
    onSave,
    onCanceled }: CustomConnectionFormProps) {
    const { user } = useAuth();
    const { toast } = useToast();

    const {
        execute: executeCreateUserConnectionAction,
        result: createUserConnectionResult,
        isExecuting: isCreatingUserConnection,
        reset: resetCreateUserConnectionAction
    } = useAction(createUserConnectionAction, {
        onSuccess: ({ data }) => {
            console.log(data);
            toast({
                variant: "default",
                title: "Connection created",
                description: "Connection created successfully",
                duration: 5000,
            });
            onSave(createUserConnectionResult as Connection);
        },
        onError: (error) => {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "An error occurred while creating connection",
                duration: 5000,
            });
        }
    });

    const onFormSubmit = (formValues: z.infer<typeof SocialConnectionFormSchema>) => {
        if (!user) throw new Error("User not found");
        const connectionData: CreateConnectionData = {
            userId: user.userId,
            connectionType: 'SOCIAL',
            connectionName: platform.id,
            url: formValues.url,
        }
        executeCreateUserConnectionAction(connectionData);
    };

    const cancelCreateUserConnection = () => {
        resetCreateUserConnectionAction();
        onCanceled();
    };

    return (
        <div>
            <SocialConnectionForm
                isLoading={isCreatingUserConnection}
                onSave={onFormSubmit}
                onCanceled={cancelCreateUserConnection} />
        </div>
    );
};