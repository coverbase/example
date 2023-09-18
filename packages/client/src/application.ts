import {
    ApplicationEntity,
    CreateApplicationRequest,
    UpdateApplicationRequest,
} from "@coverbase/schema";
import { ofetch } from "ofetch";
import { ClientOptions, jsonInterceptor } from "./http";

export function createApplicationClient(options: ClientOptions) {
    return {
        create(request: CreateApplicationRequest) {
            return ofetch<ApplicationEntity>("/applications", {
                method: "POST",
                onRequest: jsonInterceptor(options),
                body: request,
            });
        },
        update(applicationId: string, request: UpdateApplicationRequest) {
            return ofetch<ApplicationEntity>(`/applications/${applicationId}`, {
                method: "PUT",
                onRequest: jsonInterceptor(options),
                body: request,
            });
        },
        delete(applicationId: string) {
            return ofetch<ApplicationEntity>(`/applications/${applicationId}`, {
                method: "DELETE",
                onRequest: jsonInterceptor(options),
            });
        },
        get(applicationId: string) {
            return ofetch<ApplicationEntity>(`/applications/${applicationId}`, {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
        list() {
            return ofetch<Array<ApplicationEntity>>("/applications", {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
    };
}
