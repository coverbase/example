import { CreateProjectRequest, ProjectEntity, UpdateProjectRequest } from "@coverbase/schema";
import { ofetch } from "ofetch";
import { ClientOptions, jsonInterceptor } from "../utils";

export function createProjectClient(options: ClientOptions) {
    return {
        create(request: CreateProjectRequest) {
            return ofetch<ProjectEntity>("/projects", {
                method: "POST",
                onRequest: jsonInterceptor(options),
                body: request,
            });
        },
        update(projectId: string, request: UpdateProjectRequest) {
            return ofetch<ProjectEntity>(`/projects/${projectId}`, {
                method: "PUT",
                onRequest: jsonInterceptor(options),
                body: request,
            });
        },
        delete(projectId: string) {
            return ofetch<ProjectEntity>(`/projects/${projectId}`, {
                method: "DELETE",
                onRequest: jsonInterceptor(options),
            });
        },
        get(projectId: string) {
            return ofetch<ProjectEntity>(`/projects/${projectId}`, {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
        list() {
            return ofetch<Array<ProjectEntity>>("/projects", {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
    };
}
