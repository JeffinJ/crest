import { ButtonWithGradient } from "@/components/ui/button-with-gradient";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/auth.context";
import { createUserConnectionAction } from "@/server/actions/connections/create-connection.action";
import { CreateConnectionData, SocialConnection } from "@/types/connection.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SocialConnectionFormSchema = z.object({
    url: z.string(),
});

type SocialConnectionFormProps = {
    platform: SocialConnection;
    initialData?: z.infer<typeof SocialConnectionFormSchema>;
    onSave: (connectionData: unknown) => void;
    onCanceled: () => void;
};

export default function SocialConnectionForm({
    platform,
    initialData,
    onSave,
    onCanceled
}: SocialConnectionFormProps) {
    const { toast } = useToast();
    const { user } = useAuth();

    const socialConnectionForm = useForm<z.infer<typeof SocialConnectionFormSchema>>({
        resolver: zodResolver(SocialConnectionFormSchema),
        defaultValues: {
            url: initialData?.url || "",
        }
    });

    const {
        execute: executeCreateUserConnectionAction,
        result: createUserConnectionResult,
        isExecuting: isCreatingUserConnection,
        reset: resetCreateUserConnectionAction
    } = useAction(createUserConnectionAction, {
        onSuccess: ({ data }) => {
            console.log(data);
            socialConnectionForm.reset(initialData);
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

    const onFormSubmit = (formValues: z.infer<typeof SocialConnectionFormSchema>) => {
        console.log(formValues);
        if (!user) throw new Error("User not found");

        const connectionData: CreateConnectionData = {
            userId: user.userId,
            connectionName: platform.id,
            url: formValues.url,
        }

        console.log(connectionData);


        executeCreateUserConnectionAction(connectionData);
    };

    return (
        <Form {...socialConnectionForm}>
            <form onSubmit={socialConnectionForm.handleSubmit(onFormSubmit)}>
                <div className="flex flex-col space-y-3">
                    <div className="flex flex-row space-x-3 items-center justify-start">
                        <platform.icon className="w-8 h-8" color={platform.color} />
                        <div>{platform.name}</div>
                    </div>
                    <div className="flex flex-row space-x-2 items-center justify-start">
                        <FormField
                            control={socialConnectionForm.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Profile URL"
                                            className="placeholder-gray-400 dark:placeholder-gray-500" />
                                    </FormControl>
                                </FormItem>
                            )} />
                    </div>

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
                                socialConnectionForm.reset(initialData);
                                resetCreateUserConnectionAction();
                                onCanceled();
                            }}>
                            Cancel
                        </ButtonWithGradient>
                    </div>
                    {/* <div>
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
                    </div> */}
                </div>
            </form>
        </Form>
    )
}