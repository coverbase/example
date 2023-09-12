import { CreateTokenRequest, TokenEntity, UpdateTokenRequest } from "@coverbase/schema";

export const useTokenLoading = () => useState("Token-Loading", () => false);

export async function createToken(form: CreateTokenRequest) {
    const tokenLoading = useTokenLoading();

    tokenLoading.value = true;
    try {
        const response = await $fetch<TokenEntity>("/tokens", {
            method: "POST",
            onRequest: requestInterceptorJson,
            body: JSON.stringify(form),
        });

        await refreshNuxtData("Tokens");

        return response;
    } finally {
        tokenLoading.value = false;
    }
}

export async function updateToken(form: UpdateTokenRequest) {
    const tokenLoading = useTokenLoading();
    const route = useRoute();

    tokenLoading.value = true;
    try {
        const response = await $fetch<TokenEntity>(`/tokens/${route.params.tokenId}`, {
            method: "PUT",
            onRequest: requestInterceptorJson,
            body: JSON.stringify(form),
        });

        await refreshNuxtData(`Tokens-${route.params.tokenId}`);

        return response;
    } finally {
        tokenLoading.value = false;
    }
}

export async function deleteToken() {
    const tokenLoading = useTokenLoading();
    const route = useRoute();

    tokenLoading.value = true;
    try {
        const response = await $fetch<TokenEntity>(`/tokens/${route.params.tokenId}`, {
            method: "DELETE",
            onRequest: requestInterceptorJson,
        });

        clearNuxtData(`Tokens-${route.params.tokenId}`);

        return response;
    } finally {
        tokenLoading.value = false;
    }
}

export function getToken() {
    const route = useRoute();

    return useFetch<TokenEntity>(`/tokens/${route.params.tokenId}`, {
        key: `Tokens-${route.params.tokenId}`,
        method: "GET",
        onRequest: requestInterceptorJson,
    });
}

export function listTokens() {
    return useFetch<Array<TokenEntity>>("/tokens", {
        key: "Tokens",
        method: "GET",
        onRequest: requestInterceptorJson,
    });
}
