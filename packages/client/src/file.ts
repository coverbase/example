import { CreateFileRequest, FileEntity, UpdateFileRequest } from "@coverbase/schema";
import { ofetch } from "ofetch";
import { ClientOptions, formInterceptor, jsonInterceptor } from "./http";

export function createFileClient(options: ClientOptions) {
    return {
        create(projectId: string, request: CreateFileRequest) {
            const formData = new FormData();
            formData.append("name", request.name);
            formData.append("blob", request.blob);

            return ofetch<FileEntity>(`/projects/${projectId}/files`, {
                method: "POST",
                onRequest: formInterceptor(options),
                body: formData,
            });
        },
        update(fileId: string, request: UpdateFileRequest) {
            const formData = new FormData();

            if (request.name) {
                formData.append("name", request.name);
            }

            if (request.blob) {
                formData.append("blob", request.blob);
            }

            return ofetch<FileEntity>(`/files/${fileId}`, {
                method: "PUT",
                onRequest: formInterceptor(options),
                body: formData,
            });
        },
        delete(fileId: string) {
            return ofetch<FileEntity>(`/files/${fileId}`, {
                method: "DELETE",
                onRequest: jsonInterceptor(options),
            });
        },
        get(fileId: string) {
            return ofetch<FileEntity>(`/files/${fileId}`, {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
        list(projectId: string) {
            return ofetch<Array<FileEntity>>(`/projects/${projectId}/files`, {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
    };
}
