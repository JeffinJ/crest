import { z } from "zod";

const ConnectionType = z.enum(['CUSTOM', 'SOCIAL']);

export const createUserConnectionSchema = z.object({
    userId: z.string(),
    connectionType: ConnectionType,
    connectionName: z.string(),
    url: z.string(),
});

export const EditUserConnectionSchema = z.object({
    id: z.number(),
    userId: z.string(),
    connectionType: ConnectionType,
    connectionName: z.string(),
    url: z.string(),
});

export const UserConnectionFormSchema = z.object({
    name: z.string(),
    url: z.string(),
});

export const SocialConnectionFormSchema = z.object({
    url: z.string(),
});

export type CreateUserConnectionSchemaType = z.infer<typeof createUserConnectionSchema>;
export type EditUserConnectionSchemaType = z.infer<typeof EditUserConnectionSchema>;
export type SocialConnectionFormSchemaType = z.infer<typeof SocialConnectionFormSchema>;