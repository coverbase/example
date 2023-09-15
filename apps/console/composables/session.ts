import { createSessionClient } from "@coverbase/client";
import { CreateSessionRequest, SessionEntity } from "@coverbase/schema";

export const useAccessToken = () => useLocalStorage<string>("AccessToken", "");
export const useSessionLoading = () => useState<boolean>("Session-Loading", () => false);

export function useSessionClient() {
    const accessToken = useAccessToken();
    const config = useRuntimeConfig();

    return createSessionClient({
        baseUrl: config.public.apiUrl,
        accessToken: accessToken.value,
    });
}

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

export function deleteSession() {
    const loading = useSessionLoading();

    loading.value = true;
    try {
        const accessToken = useAccessToken();

        accessToken.value = "";

        navigateTo("/sign-in");
    } finally {
        loading.value = false;
    }
}
