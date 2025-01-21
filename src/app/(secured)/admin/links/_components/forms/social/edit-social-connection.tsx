import { useAuth } from "@/providers/auth.context";
import { Connection, SocialConnection } from "@/types/connection.types";
import { useAction } from "next-safe-action/hooks";
import { editUserConnectionAction } from "@/server/actions/connections/connection.action";
import { useToast } from "@/hooks/use-toast";
import SocialConnectionForm from "./social-connection-form";
import { EditUserConnectionSchemaType, SocialConnectionFormSchema } from "@/lib/zod-schemas/user-connections";
import { z } from "zod";

type EditSocialConnectionProps = {
    platform: SocialConnection;
    initilaData: EditUserConnectionSchemaType;
    onSave: (connectionData: Connection) => void;
    onCanceled: () => void;
};

export default function EditSocialConnection({
    platform,
    initilaData,
    onSave,
    onCanceled }: EditSocialConnectionProps) {
    const { user } = useAuth();
    const { toast } = useToast();

    const {
        execute: executeEditUserConnectionAction,
        result: editUserConnectionResult,
        isExecuting: isEditingUserConnection,
        reset: resetEditUserConnectionAction
    } = useAction(editUserConnectionAction, {
        onSuccess: ({ data }) => {
            console.log(data);
            toast({
                variant: "default",
                title: "Connection created",
                description: "Connection created successfully",
                duration: 5000,
            });
            onSave(editUserConnectionResult as Connection);
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
        console.log(formValues);
        if (!user) throw new Error("User not found");

        const connectionData: EditUserConnectionSchemaType = {
            id: initilaData.id,
            userId: user.userId,
            connectionType: 'SOCIAL',
            connectionName: platform.id,
            url: formValues.url,
        }

        executeEditUserConnectionAction(connectionData);
    };

    const cancelCreateUserConnection = () => {
        resetEditUserConnectionAction();
        onCanceled();
    };

    return (
        <div>
            <SocialConnectionForm
                initialData={initilaData}
                isLoading={isEditingUserConnection}
                onSave={onFormSubmit}
                onCanceled={cancelCreateUserConnection} />
        </div>
    );
};