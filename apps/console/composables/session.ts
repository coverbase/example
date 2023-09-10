import { CreateSessionRequest, SessionEntity } from "@coverbase/schema";

export const useAccessToken = () => useLocalStorage<string>("AccessToken", "");
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

export function getSession() {
    const route = useRoute();

    return $fetch<string>(`/sessions/${route.params.sessionId}`, {
        method: "GET",
        onRequest: requestInterceptorText,
    });
}
