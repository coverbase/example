import { CreateSessionRequest, SessionEntity } from "@coverbase/schema";
import { ofetch } from "ofetch";
import { ClientOptions, jsonInterceptor, textInterceptor } from "../utils";

export function createSessionClient(options: ClientOptions) {
    return {
        create(request: CreateSessionRequest) {
            return ofetch<SessionEntity>("/sessions", {
                method: "POST",
                onRequest: jsonInterceptor(options),
                body: request,
            });
        },
        get(sessionId: string) {
            return ofetch<string>(`/sessions/${sessionId}`, {
                method: "GET",
                onRequest: textInterceptor(options),
            });
        },
    };
}
