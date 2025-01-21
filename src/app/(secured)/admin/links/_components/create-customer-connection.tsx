import { useAuth } from "@/providers/auth.context";
import { Connection, CreateConnectionData, UserConnectionFormSchemaType } from "@/types/connection.types";
import { useAction } from "next-safe-action/hooks";
import { createUserConnectionAction } from "@/server/actions/connections/connection.action";
import { useToast } from "@/hooks/use-toast";
import CustomConnectionForm from "./custom-connection-form";

type CustomConnectionFormProps = {
    onSave: (connectionData: Connection) => void;
    onCanceled: () => void;
};

export default function CreateCustomConnection({ onSave, onCanceled }: CustomConnectionFormProps) {
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
            console.log(createUserConnectionResult);
            onSave(createUserConnectionResult as Connection);

            toast({
                variant: "default",
                title: "Connection created",
                description: "Connection created successfully",
                duration: 5000,
            });
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

    const createUserConnection = (formValues: UserConnectionFormSchemaType) => {
        console.log(formValues);
        if (!user) throw new Error("User not found");
        const connectionData: CreateConnectionData = {
            userId: user.userId,
            connectionName: formValues.name,
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
            <CustomConnectionForm
                isLoading={isCreatingUserConnection}
                onSave={createUserConnection}
                onCanceled={cancelCreateUserConnection} />
        </div>
    );
};