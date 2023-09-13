import { CreateTokenRequest, TokenEntity, UpdateTokenRequest } from "@coverbase/schema";
import { ofetch } from "ofetch";
import { ClientOptions, jsonInterceptor } from "../utils";

export function createTokenClient(options: ClientOptions) {
    return {
        create(request: CreateTokenRequest) {
            return ofetch<TokenEntity>("/tokens", {
                method: "POST",
                onRequest: jsonInterceptor(options),
                body: request,
            });
        },
        update(tokenId: string, request: UpdateTokenRequest) {
            return ofetch<TokenEntity>(`/tokens/${tokenId}`, {
                method: "PUT",
                onRequest: jsonInterceptor(options),
                body: request,
            });
        },
        delete(tokenId: string) {
            return ofetch<TokenEntity>(`/tokens/${tokenId}`, {
                method: "DELETE",
                onRequest: jsonInterceptor(options),
            });
        },
        get(tokenId: string) {
            return ofetch<TokenEntity>(`/tokens/${tokenId}`, {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
        list() {
            return ofetch<Array<TokenEntity>>("/tokens", {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
    };
}
