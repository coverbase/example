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
    };
}
