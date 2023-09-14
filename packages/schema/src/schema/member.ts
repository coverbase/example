import { Output, email, object, optional, string } from "valibot";

export const createMemberSchema = object({
    emailAddress: string([email()]),
    roleId: string(),
});

export const updateMemberSchema = object({
    roleId: optional(string()),
});

export type CreateMemberRequest = Output<typeof createMemberSchema>;
export type UpdateMemberRequest = Output<typeof updateMemberSchema>;
