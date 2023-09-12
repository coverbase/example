import { Output, object, optional, string } from "valibot";

export const createTokenSchema = object({
    name: string(),
});

export const updateTokenSchema = object({
    name: optional(string()),
});

export type CreateTokenRequest = Output<typeof createTokenSchema>;
export type UpdateTokenRequest = Output<typeof updateTokenSchema>;
