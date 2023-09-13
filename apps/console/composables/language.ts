import { createLanguageClient } from "@coverbase/client";

export function useLanguageClient() {
    const accessToken = useAccessToken();
    const config = useRuntimeConfig();

    return createLanguageClient({
        baseUrl: config.public.apiUrl,
        accessToken: accessToken.value,
    });
}

export function listLanguages() {
    const client = useLanguageClient();

    return useAsyncData("Languages", () => client.list());
}
