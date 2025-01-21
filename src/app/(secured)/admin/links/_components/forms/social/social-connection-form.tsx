import { ButtonWithGradient } from "@/components/ui/button-with-gradient";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SocialConnectionFormSchema, SocialConnectionFormSchemaType } from "@/lib/zod-schemas/user-connections";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";


type SocialConnectionFormProps = {
    isLoading: boolean;
    initialData?: SocialConnectionFormSchemaType;
    onSave: (connectionData: SocialConnectionFormSchemaType) => void;
    onCanceled: () => void;
};

export default function SocialConnectionForm({
    isLoading,
    initialData,
    onSave,
    onCanceled
}: SocialConnectionFormProps) {

    const socialConnectionForm = useForm<SocialConnectionFormSchemaType>({
        resolver: zodResolver(SocialConnectionFormSchema),
        defaultValues: {
            url: initialData?.url || "",
        }
    });

    const onFormSubmit = (formValues: SocialConnectionFormSchemaType) => {
        socialConnectionForm.reset(initialData);
        onSave(formValues);
    };

    return (
        <Form {...socialConnectionForm}>
            <form onSubmit={socialConnectionForm.handleSubmit(onFormSubmit)}>
                <div className="flex flex-col space-y-3">
                    <div className="flex flex-row space-x-2 items-center justify-start w-full">
                        <FormField
                            control={socialConnectionForm.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem className="w-full flex flex-row items-center space-x-2">
                                    <Link className="w-3 h-3 text-blue-500" />
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Profile URL"
                                            className="placeholder-gray-400 dark:placeholder-gray-500 w-full" />
                                    </FormControl>
                                </FormItem>
                            )} />
                    </div>

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
                                socialConnectionForm.reset(initialData);
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