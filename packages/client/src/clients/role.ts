import { RoleEntity } from "@coverbase/schema";
import { ofetch } from "ofetch";
import { ClientOptions, jsonInterceptor } from "../utils";

export function createRoleClient(options: ClientOptions) {
    return {
        list(projectId: string) {
            return ofetch<Array<RoleEntity>>(`/projects/${projectId}/roles`, {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
    };
}
