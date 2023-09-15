import { FetchContext } from "ofetch";

export type ClientOptions = {
    baseUrl: string;
    accessToken?: string;
};

export function jsonInterceptor(options: ClientOptions) {
    return (context: FetchContext) => {
        context.options.baseURL = options.baseUrl;

        context.options.headers = {
            "Content-Type": "application/json",
        };

        if (options.accessToken) {
            context.options.headers["Authorization"] = `Bearer ${options.accessToken}`;
        }
    };
}

export function textInterceptor(options: ClientOptions) {
    return (context: FetchContext) => {
        context.options.baseURL = options.baseUrl;

        context.options.headers = {
            "Content-Type": "text/plain",
        };

        if (options.accessToken) {
            context.options.headers["Authorization"] = `Bearer ${options.accessToken}`;
        }
    };
}

export function formInterceptor(options: ClientOptions) {
    return (context: FetchContext) => {
        context.options.baseURL = options.baseUrl;

        context.options.headers = {};

        if (options.accessToken) {
            context.options.headers["Authorization"] = `Bearer ${options.accessToken}`;
        }
    };
}
