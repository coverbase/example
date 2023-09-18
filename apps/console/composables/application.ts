import { createApplicationClient } from "@coverbase/client";
import { CreateApplicationRequest, UpdateApplicationRequest } from "@coverbase/schema";

export const useApplicationLoading = () => useState("Application-Loading", () => false);

export function useApplicationClient() {
    const accessToken = useAccessToken();
    const config = useRuntimeConfig();

    return createApplicationClient({
        baseUrl: config.public.apiUrl,
        accessToken: accessToken.value,
    });
}

export async function createApplication(form: CreateApplicationRequest) {
    const applicationLoading = useApplicationLoading();
    const client = useApplicationClient();

    applicationLoading.value = true;
    try {
        const response = await client.create(form);

        await refreshNuxtData("Applications");

        return response;
    } finally {
        applicationLoading.value = false;
    }
}

export async function updateApplication(form: UpdateApplicationRequest) {
    const applicationLoading = useApplicationLoading();
    const route = useRoute();
    const client = useApplicationClient();

    applicationLoading.value = true;
    try {
        const response = await client.update(route.params.applicationId as string, form);

        await refreshNuxtData(`Applications-${route.params.applicationId}`);

        return response;
    } finally {
        applicationLoading.value = false;
    }
}

export async function deleteApplication() {
    const applicationLoading = useApplicationLoading();
    const route = useRoute();
    const client = useApplicationClient();

    applicationLoading.value = true;
    try {
        const response = await client.delete(route.params.applicationId as string);

        clearNuxtData(`Applications-${route.params.applicationId}`);

        return response;
    } finally {
        applicationLoading.value = false;
    }
}

export function getApplication() {
    const route = useRoute();
    const client = useApplicationClient();

    return useAsyncData(`Applications-${route.params.applicationId}`, () =>
        client.get(route.params.applicationId as string)
    );
}

export function listApplications() {
    const client = useApplicationClient();

    return useAsyncData("Applications", () => client.list());
}
