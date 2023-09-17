import { CreateSessionRequest, SessionEntity } from "@coverbase/schema";
import { ofetch } from "ofetch";
import { ClientOptions, jsonInterceptor } from "./http";

export function createSessionClient(options: ClientOptions) {
    return {
        create(request: CreateSessionRequest) {
            return ofetch<SessionEntity>("/sessions", {
                method: "POST",
                onRequest: jsonInterceptor(options),
                body: request,
            });
        },
        delete(sessionId: string) {
            return ofetch<SessionEntity>(`/sessions/${sessionId}`, {
                method: "DELETE",
                onRequest: jsonInterceptor(options),
            });
        },
        list() {
            return ofetch<Array<SessionEntity>>("/sessions", {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
    };
}
