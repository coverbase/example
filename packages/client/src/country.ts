import { CountryEntity } from "@coverbase/schema";
import { ofetch } from "ofetch";
import { ClientOptions, jsonInterceptor } from "./http";

export function createCountryClient(options: ClientOptions) {
    return {
        list() {
            return ofetch<Array<CountryEntity>>("/countries", {
                method: "GET",
                onRequest: jsonInterceptor(options),
            });
        },
    };
}
