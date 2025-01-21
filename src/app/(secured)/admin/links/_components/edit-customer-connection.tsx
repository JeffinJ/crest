import { useAuth } from "@/providers/auth.context";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { editUserConnectionAction } from "@/server/actions/connections/connection.action";
import { useToast } from "@/hooks/use-toast";
import { EditUserConnectionSchema, EditUserConnectionSchemaType } from "@/lib/zod-schemas/user-connections";
import CustomConnectionForm from "./custom-connection-form";
import { Connection, UserConnectionFormSchemaType } from "@/types/connection.types";


type CustomConnectionFormProps = {
    initialData: z.infer<typeof EditUserConnectionSchema>;
    onSaved: (connectionData: Connection) => void;
    onCanceled: () => void;
};

export default function EditCustomConnection({ initialData, onSaved, onCanceled }: CustomConnectionFormProps) {
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
            console.log(editUserConnectionResult);
            toast({
                variant: "default",
                title: "Connection created",
                description: "Connection created successfully",
                duration: 5000,
            });
            onSaved(editUserConnectionResult as Connection);
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

    const editUserConnection = (formValues: UserConnectionFormSchemaType) => {
        console.log(formValues);
        if (!user) throw new Error("User not found");

        const connectionData: EditUserConnectionSchemaType = {
            id: initialData.id,
            userId: initialData.userId,
            connectionName: formValues.name,
            url: formValues.url,
        }

        executeEditUserConnectionAction(connectionData);
    };

    const onCanceleEdit = () => {
        resetEditUserConnectionAction();
        onCanceled();
    };

    return (
        <div>
            <CustomConnectionForm
                isLoading={isEditingUserConnection}
                initialData={{
                    name: initialData.connectionName,
                    url: initialData.url
                }}
                onSave={editUserConnection}
                onCanceled={onCanceleEdit} />
        </div>
    );
};