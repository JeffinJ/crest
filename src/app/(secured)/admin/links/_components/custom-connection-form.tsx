import { ButtonWithGradient } from "@/components/ui/button-with-gradient";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CustomConnectionFormSchema = z.object({
    name: z.string(),
    url: z.string(),
});

type CustomConnectionFormProps = {
    initialData?: z.infer<typeof CustomConnectionFormSchema>;
    onSaved: () => void;
    onCanceled: () => void;
};

export default function CustomConnectionForm({ initialData, onSaved, onCanceled }: CustomConnectionFormProps) {

    const customConnectionForm = useForm<z.infer<typeof CustomConnectionFormSchema>>({
        resolver: zodResolver(CustomConnectionFormSchema),
        defaultValues: {
            name: initialData?.name || "",
            url: initialData?.url || "",
        }
    });

    const onFormSubmit = (formValues: z.infer<typeof CustomConnectionFormSchema>) => {
        console.log(formValues);
        onSaved();
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
                                            className="placeholder-gray-400 dark:placeholder-gray-500"
                                            placeholder="URL" />
                                    </FormControl>
                                </FormItem>
                            )} />

                        <div className="flex flex-row space-x-5 w-full items-center justify-end">
                            <ButtonWithGradient
                                type="submit"
                                variant={'ghost'}
                                className="text-emerald-400 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-500"
                                gradientColors={{
                                    via1: "emerald-500",
                                    via2: "cyan-500"
                                }}>
                                Save
                            </ButtonWithGradient>

                            <ButtonWithGradient
                                type="button"
                                className="text-red-400 dark:text-red-400 hover:text-red-500 dark:hover:text-red-500"
                                gradientColors={{
                                    via1: "red-500",
                                    via2: "pink-500"
                                }}
                                onClick={onCanceled}>
                                Cancel
                            </ButtonWithGradient>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};