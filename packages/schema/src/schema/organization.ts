import { Output, object, optional, string } from "valibot";

export const createOrganizationSchema = object({
    name: string(),
});

export const updateOrganizationSchema = object({
    name: optional(string()),
});

export type CreateOrganizationRequest = Output<typeof createOrganizationSchema>;
export type UpdateOrganizationRequest = Output<typeof updateOrganizationSchema>;
