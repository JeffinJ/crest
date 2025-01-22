"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { UserRoundPen } from "lucide-react";

const UserBioFormSchema = z.object({
    bio: z.string().max(200),
})

type UserBioFormSchemaType = z.infer<typeof UserBioFormSchema>

interface UserBioFormProps {
    initialData?: UserBioFormSchemaType;
}

export default function UserBioForm({ initialData }: UserBioFormProps) {

    const bioForm = useForm<UserBioFormSchemaType>({
        resolver: zodResolver(UserBioFormSchema),
        defaultValues: {
            bio: initialData?.bio || "",
        }
    })

    const onFormSubmit = (formValues: UserBioFormSchemaType) => {
        bioForm.reset(initialData);
        console.log(formValues);
    }

    return (
        <div>
            <Form {...bioForm}>
                <form onSubmit={bioForm.handleSubmit(onFormSubmit)}>
                    <FormField
                        control={bioForm.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex flex-row items-center space-x-2">
                                        <Input
                                            placeholder=""
                                            className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring p-0 text-gray-400 m-0 h-fit w-fit"
                                            {...field} />
                                            <UserRoundPen size={15} className="text-emerald-200" />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
}
