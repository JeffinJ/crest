"use server";
import { getServerSession } from "@/lib/auth/session";
import { actionClient } from "@/lib/safe-action";
import { createUserConnectionSchema, CreateUserConnectionSchemaType, EditUserConnectionSchema, EditUserConnectionSchemaType } from "@zod-schemas/user-connections";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

export const createUserConnectionAction = actionClient
    .metadata({ action: 'createUserConnection' })
    .schema(createUserConnectionSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({ parsedInput: newUserConnection }: { parsedInput: CreateUserConnectionSchemaType }) => {
        const authData = await getServerSession();
        if (!authData) return redirect('/signin');

        const JWT = authData.value;
        const responseData = await fetch(process.env.NEXT_PUBLIC_CREST_AUTH_CENTER_URL + '/auth/connection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JWT}`,
            },
            body: JSON.stringify(newUserConnection),
        });

        return { success: 'Connection created', data: await responseData.json() };

    })

export const editUserConnectionAction = actionClient
    .metadata({ action: 'editUserConnection' })
    .schema(EditUserConnectionSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({ parsedInput: editUserConnection }: { parsedInput: EditUserConnectionSchemaType }) => {
        const authData = await getServerSession();
        if (!authData) return redirect('/signin');

        const JWT = authData.value;
        const responseData = await fetch(process.env.NEXT_PUBLIC_CREST_AUTH_CENTER_URL + '/auth/connection/' + editUserConnection.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JWT}`,
            },
            body: JSON.stringify(editUserConnection),
        });

        return { success: 'Connection updated', data: await responseData.json() };
    })