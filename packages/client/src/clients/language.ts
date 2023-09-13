import { LanguageEntity } from "@coverbase/schema";
import { ofetch } from "ofetch";
import { ClientOptions, jsonInterceptor } from "../utils";

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
