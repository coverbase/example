import { FetchContext } from "ofetch";

export async function requestInterceptorJson({ options }: FetchContext) {
    const accessToken = useAccessToken();
    const config = useRuntimeConfig();

    options.baseURL = config.public.apiUrl;

    options.headers = {
        "Content-Type": "application/json",
    };

    if (accessToken.value) {
        options.headers["Authorization"] = `Bearer ${accessToken.value}`;
    }
}

export async function requestInterceptorText({ options }: FetchContext) {
    const accessToken = useAccessToken();
    const config = useRuntimeConfig();

    options.baseURL = config.public.apiUrl;

    options.headers = {
        "Content-Type": "text/plain",
    };

    if (accessToken.value) {
        options.headers["Authorization"] = `Bearer ${accessToken.value}`;
    }
}

export async function requestInterceptorForm({ options }: FetchContext) {
    const accessToken = useAccessToken();
    const config = useRuntimeConfig();

    options.baseURL = config.public.apiUrl;

    if (accessToken.value) {
        options.headers = {
            "Authorization": `Bearer ${accessToken.value}`,
        };
    }
}
