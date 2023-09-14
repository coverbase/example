import { Output, blob, object, optional, string } from "valibot";

export const createFileSchema = object({
    name: string(),
    blob: blob(),
});

export const updateFileSchema = object({
    name: optional(string()),
    blob: optional(blob()),
});

export type CreateFileRequest = Output<typeof createFileSchema>;
export type UpdateFileRequest = Output<typeof updateFileSchema>;
