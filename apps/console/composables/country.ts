import { createCountryClient } from "@coverbase/client";

export function useCountryClient() {
    const accessToken = useAccessToken();
    const config = useRuntimeConfig();

    return createCountryClient({
        baseUrl: config.public.apiUrl,
        accessToken: accessToken.value,
    });
}

export function listCountries() {
    const client = useCountryClient();

    return useAsyncData("Countries", () => client.list());
}
