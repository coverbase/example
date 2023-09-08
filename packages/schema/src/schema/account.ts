import { Output, email, objectAsync, optional, string } from "valibot";

export const createAccountSchema = objectAsync({
    firstName: optional(string()),
    lastName: optional(string()),
    phoneNumber: optional(string()),
    emailAddress: string([email()]),
});

export const updateAccountSchema = objectAsync({
    firstName: optional(string()),
    lastName: optional(string()),
    phoneNumber: optional(string()),
    emailAddress: optional(string([email()])),
});

export type CreateAccountRequest = Output<typeof createAccountSchema>;
export type UpdateAccountRequest = Output<typeof updateAccountSchema>;
