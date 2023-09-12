import { Output, email, object, string } from "valibot";

export const createSessionSchema = object({
    emailAddress: string([email()]),
});

export type CreateSessionRequest = Output<typeof createSessionSchema>;
