import { createRoleClient } from "@coverbase/client";

export function useRoleClient() {
    const accessToken = useAccessToken();
    const config = useRuntimeConfig();

    return createRoleClient({
        baseUrl: config.public.apiUrl,
        accessToken: accessToken.value,
    });
}

export function listRoles() {
    const route = useRoute();
    const client = useRoleClient();

    return useAsyncData("Roles", () => client.list(route.params.projectId as string));
}
