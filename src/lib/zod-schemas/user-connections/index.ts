import { z } from "zod";

export const createUserConnectionSchema = z.object({
    userId: z.string(),
    connectionName: z.string(),
    url: z.string(),
});

export type CreateUserConnectionSchemaType = z.infer<typeof createUserConnectionSchema>;