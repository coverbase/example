import { Output, email, object, optional, string } from "valibot";

export const createAccountSchema = object({
    firstName: string(),
    lastName: string(),
    emailAddress: string([email()]),
});

export const updateAccountSchema = object({
    firstName: optional(string()),
    lastName: optional(string()),
    emailAddress: optional(string([email()])),
});

export type CreateAccountRequest = Output<typeof createAccountSchema>;
export type UpdateAccountRequest = Output<typeof updateAccountSchema>;
