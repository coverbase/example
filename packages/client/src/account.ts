import { AccountEntity, CreateAccountRequest, UpdateAccountRequest } from "@coverbase/schema";
import { ofetch } from "ofetch";
import { ClientOptions, jsonInterceptor } from "./http";

export function createAccountClient(options: ClientOptions) {
    return {
        create(request: CreateAccountRequest) {
            return ofetch<AccountEntity>("/accounts", {
                method: "POST",
                onRequest: jsonInterceptor(options),
                body: request,
            });
        },
        update(request: UpdateAccountRequest) {
            return ofetch<AccountEntity>("/accounts", {
                method: "PUT",
                onRequest: jsonInterceptor(options),
                body: request,
            });
        },
        delete() {
            return ofetch<AccountEntity>("/accounts", {
                method: "DELETE",
                onRequest: jsonInterceptor(options),
            });
        },
        get() {
            return ofetch<AccountEntity>("/accounts", {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
    };
}
