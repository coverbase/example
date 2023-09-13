import { createTokenClient } from "@coverbase/client";
import { CreateTokenRequest, UpdateTokenRequest } from "@coverbase/schema";

export const useTokenLoading = () => useState("Token-Loading", () => false);

export function useTokenClient() {
    const accessToken = useAccessToken();
    const config = useRuntimeConfig();

    return createTokenClient({
        baseUrl: config.public.apiUrl,
        accessToken: accessToken.value,
    });
}

export async function createToken(form: CreateTokenRequest) {
    const tokenLoading = useTokenLoading();
    const client = useTokenClient();

    tokenLoading.value = true;
    try {
        const response = await client.create(form);

        await refreshNuxtData("Tokens");

        return response;
    } finally {
        tokenLoading.value = false;
    }
}

export async function updateToken(form: UpdateTokenRequest) {
    const tokenLoading = useTokenLoading();
    const route = useRoute();
    const client = useTokenClient();

    tokenLoading.value = true;
    try {
        const response = await client.update(route.params.tokenId as string, form);

        await refreshNuxtData(`Tokens-${route.params.tokenId}`);

        return response;
    } finally {
        tokenLoading.value = false;
    }
}

export async function deleteToken() {
    const tokenLoading = useTokenLoading();
    const route = useRoute();
    const client = useTokenClient();

    tokenLoading.value = true;
    try {
        const response = await client.delete(route.params.tokenId as string);

        clearNuxtData(`Tokens-${route.params.tokenId}`);

        return response;
    } finally {
        tokenLoading.value = false;
    }
}

export function getToken() {
    const route = useRoute();
    const client = useTokenClient();

    return useAsyncData(`Tokens-${route.params.tokenId}`, () =>
        client.get(route.params.tokenId as string)
    );
}

export function listTokens() {
    const client = useTokenClient();

    return useAsyncData("Tokens", () => client.list());
}
