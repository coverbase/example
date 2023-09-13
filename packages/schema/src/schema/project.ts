import { Output, object, optional, string } from "valibot";

export const createProjectSchema = object({
    name: string(),
});

export const updateProjectSchema = object({
    name: optional(string()),
});

export type CreateProjectRequest = Output<typeof createProjectSchema>;
export type UpdateProjectRequest = Output<typeof updateProjectSchema>;
