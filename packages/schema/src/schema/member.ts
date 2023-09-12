import { Output, email, object, string } from "valibot";

export const createMemberSchema = object({
    emailAddress: string([email()]),
});

export const updateMemberSchema = object({
    emailAddress: string([email()]),
});

export type CreateMemberRequest = Output<typeof createMemberSchema>;
export type UpdateMemberRequest = Output<typeof updateMemberSchema>;
