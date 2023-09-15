import { LanguageEntity } from "@coverbase/schema";
import { ofetch } from "ofetch";
import { ClientOptions, jsonInterceptor } from "./http";

export function createLanguageClient(options: ClientOptions) {
    return {
        list() {
            return ofetch<Array<LanguageEntity>>("/languages", {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
    };
}
