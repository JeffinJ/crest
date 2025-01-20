import { ButtonWithGradient } from "@/components/ui/button-with-gradient";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/auth.context";
import { CreateConnectionData } from "@/types/connection.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { createUserConnectionAction } from "@/server/actions/connections/create-connection.action";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";

const CustomConnectionFormSchema = z.object({
    name: z.string(),
    url: z.string(),
});

type CustomConnectionFormProps = {
    initialData?: z.infer<typeof CustomConnectionFormSchema>;
    onSave: (connectionData: unknown) => void;
    onCanceled: () => void;
};

export default function CustomConnectionForm({ initialData, onSave, onCanceled }: CustomConnectionFormProps) {
    const { user } = useAuth();

    const customConnectionForm = useForm<z.infer<typeof CustomConnectionFormSchema>>({
        resolver: zodResolver(CustomConnectionFormSchema),
        defaultValues: {
            name: initialData?.name || "",
            url: initialData?.url || "",
        }
    });

    const { toast } = useToast();

    const {
        execute: executeCreateUserConnectionAction,
        result: createUserConnectionResult,
        isExecuting: isCreatingUserConnection,
        reset: resetCreateUserConnectionAction
    } = useAction(createUserConnectionAction, {
        onSuccess: ({ data }) => {
            console.log(data);
            customConnectionForm.reset(initialData);
            toast({
                variant: "default",
                title: "Connection created",
                description: "Connection created successfully",
                duration: 5000,
            });
            onSave(createUserConnectionResult.data);
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

    const onFormSubmit = (formValues: z.infer<typeof CustomConnectionFormSchema>) => {
        console.log(formValues);
        if (!user) throw new Error("User not found");

        const connectionData: CreateConnectionData = {
            userId: user.userId,
            connectionName: formValues.name,
            url: formValues.url,
        }

        executeCreateUserConnectionAction(connectionData);
    };

    return (
        <div>
            <Form {...customConnectionForm}>
                <form onSubmit={customConnectionForm.handleSubmit(onFormSubmit)}>
                    <div className="flex flex-col space-y-3">
                        <FormField
                            control={customConnectionForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field}
                                            disabled={isCreatingUserConnection}
                                            className="placeholder-gray-400 dark:placeholder-gray-500"
                                            placeholder="Connection name" />
                                    </FormControl>
                                </FormItem>
                            )} />

                        <FormField
                            control={customConnectionForm.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field}
                                            disabled={isCreatingUserConnection}
                                            className="placeholder-gray-400 dark:placeholder-gray-500"
                                            placeholder="URL" />
                                    </FormControl>
                                </FormItem>
                            )} />

                        <div className="flex flex-row space-x-5 w-full items-center justify-end">
                            <ButtonWithGradient
                                type="submit"
                                variant={'ghost'}
                                disabled={isCreatingUserConnection}
                                className="text-emerald-400 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-500"
                                gradientColors={{
                                    via1: "emerald-500",
                                    via2: "cyan-500"
                                }}>
                                {isCreatingUserConnection ?
                                    <>
                                        <LoaderCircle className="w-5 h-5 animate-spin" />
                                        <span className="ml-2">Saving...</span>
                                    </> :
                                    "Save"
                                }
                            </ButtonWithGradient>

                            <ButtonWithGradient
                                type="button"
                                className="text-red-400 dark:text-red-400 hover:text-red-500 dark:hover:text-red-500"
                                gradientColors={{
                                    via1: "red-500",
                                    via2: "pink-500"
                                }}
                                onClick={() => {
                                    customConnectionForm.reset(initialData);
                                    resetCreateUserConnectionAction();
                                    onCanceled();
                                }}>
                                Cancel
                            </ButtonWithGradient>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};