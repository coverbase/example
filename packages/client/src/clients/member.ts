import { CreateMemberRequest, MemberEntity, UpdateMemberRequest } from "@coverbase/schema";
import { ofetch } from "ofetch";
import { ClientOptions, jsonInterceptor } from "../utils";

export function createMemberClient(options: ClientOptions) {
    return {
        create(projectId: string, request: CreateMemberRequest) {
            return ofetch<MemberEntity>(`/projects/${projectId}/members`, {
                method: "POST",
                onRequest: jsonInterceptor(options),
                body: request,
            });
        },
        update(memberId: string, request: UpdateMemberRequest) {
            return ofetch<MemberEntity>(`/members/${memberId}`, {
                method: "PUT",
                onRequest: jsonInterceptor(options),
                body: request,
            });
        },
        delete(memberId: string) {
            return ofetch<MemberEntity>(`/members/${memberId}`, {
                method: "DELETE",
                onRequest: jsonInterceptor(options),
            });
        },
        get(memberId: string) {
            return ofetch<MemberEntity>(`/members/${memberId}`, {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
        list(projectId: string) {
            return ofetch<Array<MemberEntity>>(`/projects/${projectId}/members`, {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
    };
}
