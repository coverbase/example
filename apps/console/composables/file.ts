import { createFileClient } from "@coverbase/client";
import { CreateFileRequest, UpdateFileRequest } from "@coverbase/schema";

export const useFileLoading = () => useState("File-Loading", () => false);

export function useFileClient() {
    const accessToken = useAccessToken();
    const config = useRuntimeConfig();

    return createFileClient({
        baseUrl: config.public.apiUrl,
        accessToken: accessToken.value,
    });
}

export async function createFile(form: CreateFileRequest) {
    const route = useRoute();
    const fileLoading = useFileLoading();
    const client = useFileClient();

    fileLoading.value = true;
    try {
        const response = await client.create(route.params.projectId as string, form);

        await refreshNuxtData("Files");

        return response;
    } finally {
        fileLoading.value = false;
    }
}

export async function updateFile(form: UpdateFileRequest) {
    const fileLoading = useFileLoading();
    const route = useRoute();
    const client = useFileClient();

    fileLoading.value = true;
    try {
        const response = await client.update(route.params.fileId as string, form);

        await refreshNuxtData("Files");

        return response;
    } finally {
        fileLoading.value = false;
    }
}

export async function deleteFile(fileId: string) {
    const fileLoading = useFileLoading();
    const client = useFileClient();

    fileLoading.value = true;
    try {
        const response = await client.delete(fileId);

        await refreshNuxtData("Files");

        return response;
    } finally {
        fileLoading.value = false;
    }
}

export function getFile() {
    const route = useRoute();
    const client = useFileClient();

    return useAsyncData(`Files-${route.params.fileId}`, () =>
        client.get(route.params.fileId as string)
    );
}

export function listFiles() {
    const route = useRoute();
    const client = useFileClient();

    return useAsyncData("Files", () => client.list(route.params.projectId as string));
}
