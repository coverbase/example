import { CreateSessionRequest, SessionEntity } from "@coverbase/schema";
import { useLocalStorage } from "@vueuse/core";

export const useAccessToken = () => useLocalStorage<string>("Token", () => "");
export const useSessionLoading = () => useState<boolean>("Session-Loading", () => false);

export async function createSession(form: CreateSessionRequest) {
    const loading = useSessionLoading();

    loading.value = true;
    try {
        const response = await $fetch<SessionEntity>("/sessions", {
            method: "POST",
            onRequest: requestInterceptorJson,
            body: JSON.stringify(form),
        });

        return response;
    } finally {
        loading.value = false;
    }
}

export function isAuthenticated() {
    const token = useAccessToken();

    return token.value !== "";
}

export function deleteSession() {
    const token = useAccessToken();

    token.value = "";

    navigateTo("/auth/sign-in");
}

export async function getSession(email: string, value: string) {
    const token = useAccessToken();

    const { data } = await useFetch<string>("/sessions", {
        method: "GET",
        query: {
            email: email,
            token: value,
        },
        onRequest: requestInterceptorText,
    });

    if (data.value) {
        token.value = data.value;
    }

    navigateTo("/");
}
