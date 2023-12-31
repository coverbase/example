import { FileEntity } from "@coverbase/schema";
import { Context } from "hono";

type Bindings = {
    STORAGE: R2Bucket;
};

export function useStorage(context: Context<{ Bindings: Bindings }>) {
    return {
        async createOrUpdateFile(file: FileEntity, blob: Blob) {
            await context.env.STORAGE.put(file.id, blob.stream(), {
                httpMetadata: {
                    contentType: file.type,
                },
            });
        },
        async deleteFile(file: FileEntity) {
            await context.env.STORAGE.delete(file.id);
        },
    };
}
