import { ButtonWithGradient } from "@/components/ui/button-with-gradient";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";
import { UserConnectionFormSchema } from "@/lib/zod-schemas/user-connections";
import { ConnectionType, UserConnectionFormSchemaType } from "@/types/connection.types";

type CustomConnectionFormProps = {
    initialData?: z.infer<typeof UserConnectionFormSchema>;
    connectionType: ConnectionType
    isLoading: boolean;
    onSave: (connectionData: UserConnectionFormSchemaType) => void;
    onCanceled: () => void;
};

export default function CustomConnectionForm({
    initialData,
    isLoading,
    onSave,
    onCanceled }: CustomConnectionFormProps) {

    const customConnectionForm = useForm<z.infer<typeof UserConnectionFormSchema>>({
        resolver: zodResolver(UserConnectionFormSchema),
        mode: 'onSubmit',
        defaultValues: {
            name: initialData?.name || "",
            url: initialData?.url || "",
        }
    });

    const onFormSubmit = (formValues: z.infer<typeof UserConnectionFormSchema>) => {
        customConnectionForm.reset(initialData);
        onSave(formValues);
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
                                            disabled={isLoading}
                                            className="placeholder-gray-400 dark:placeholder-gray-500"
                                            placeholder="Connection name" />
                                    </FormControl>
                                    <FormMessage className="text-red-400 font-normal" />
                                </FormItem>
                            )} />

                        <FormField
                            control={customConnectionForm.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field}
                                            disabled={isLoading}
                                            className="placeholder-gray-400 dark:placeholder-gray-500"
                                            placeholder="URL" />
                                    </FormControl>
                                    <FormMessage className="text-red-400 font-normal" />
                                </FormItem>
                            )} />

                        <div className="flex flex-row space-x-5 w-full items-center justify-end">
                            <ButtonWithGradient
                                type="submit"
                                variant={'ghost'}
                                disabled={isLoading}
                                className="text-emerald-400 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-500"
                                gradientColors={{
                                    via1: "emerald-500",
                                    via2: "cyan-500"
                                }}>
                                {isLoading ?
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