import { FetchContext } from "ofetch";

export async function requestInterceptorJson({ options }: FetchContext) {
    const token = useAccessToken();
    const config = useRuntimeConfig();

    options.baseURL = config.public.apiUrl;

    options.headers = {
        "Content-Type": "application/json",
    };

    if (token.value) {
        options.headers["Authorization"] = `Bearer ${token.value}`;
    }
}

export async function requestInterceptorText({ options }: FetchContext) {
    const token = useAccessToken();
    const config = useRuntimeConfig();

    options.baseURL = config.public.apiUrl;

    options.headers = {
        "Content-Type": "text/plain",
    };

    if (token.value) {
        options.headers["Authorization"] = `Bearer ${token.value}`;
    }
}

export async function requestInterceptorForm({ options }: FetchContext) {
    const token = useAccessToken();
    const config = useRuntimeConfig();

    options.baseURL = config.public.apiUrl;

    if (token.value) {
        options.headers = {
            "Authorization": `Bearer ${token.value}`,
        };
    }
}
