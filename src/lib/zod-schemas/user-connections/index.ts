import { z } from "zod";

export const createUserConnectionSchema = z.object({
    userId: z.string(),
    connectionName: z.string(),
    url: z.string(),
});

export const EditUserConnectionSchema = z.object({
    id: z.number(),
    userId: z.string(),
    connectionName: z.string(),
    url: z.string(),
});

export const UserConnectionFormSchema = z.object({
    name: z.string(),
    url: z.string(),
});

export type CreateUserConnectionSchemaType = z.infer<typeof createUserConnectionSchema>;
export type EditUserConnectionSchemaType = z.infer<typeof EditUserConnectionSchema>;