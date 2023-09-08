import { Output, email, objectAsync, string } from "valibot";

export const createSessionSchema = objectAsync({
    emailAddress: string([email()]),
});

export type CreateSessionRequest = Output<typeof createSessionSchema>;
