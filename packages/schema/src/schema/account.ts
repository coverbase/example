import { Output, email, objectAsync, optional, string } from "valibot";

export const createAccountSchema = objectAsync({
    firstName: string(),
    lastName: string(),
    emailAddress: string([email()]),
});

export const updateAccountSchema = objectAsync({
    firstName: optional(string()),
    lastName: optional(string()),
    emailAddress: optional(string([email()])),
});

export type CreateAccountRequest = Output<typeof createAccountSchema>;
export type UpdateAccountRequest = Output<typeof updateAccountSchema>;
