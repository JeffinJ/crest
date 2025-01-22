import { z } from "zod";

const ConnectionType = z.enum(['CUSTOM', 'SOCIAL']);

export const CreateUserConnectionSchema = z.object({
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
    name: z.string().nonempty({
        message: 'Connection name is required'
    }),
    url: z.string().nonempty({
        message: 'URL is required'
    }),
});

export const SocialConnectionFormSchema = z.object({
    url: z.string(),
});

export const DeleteUserConnectionSchema = z.number();

export type CreateUserConnectionSchemaType = z.infer<typeof CreateUserConnectionSchema>;
export type EditUserConnectionSchemaType = z.infer<typeof EditUserConnectionSchema>;
export type SocialConnectionFormSchemaType = z.infer<typeof SocialConnectionFormSchema>;