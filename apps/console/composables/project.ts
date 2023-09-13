import { createProjectClient } from "@coverbase/client";
import { CreateProjectRequest, UpdateProjectRequest } from "@coverbase/schema";

export const useProjectLoading = () => useState("Project-Loading", () => false);

export function useProjectClient() {
    const accessToken = useAccessToken();
    const config = useRuntimeConfig();

    return createProjectClient({
        baseUrl: config.public.apiUrl,
        accessToken: accessToken.value,
    });
}

export async function createProject(form: CreateProjectRequest) {
    const projectLoading = useProjectLoading();
    const client = useProjectClient();

    projectLoading.value = true;
    try {
        const response = await client.create(form);

        await refreshNuxtData("Projects");

        return response;
    } finally {
        projectLoading.value = false;
    }
}

export async function updateProject(form: UpdateProjectRequest) {
    const projectLoading = useProjectLoading();
    const route = useRoute();
    const client = useProjectClient();

    projectLoading.value = true;
    try {
        const response = await client.update(route.params.projectId as string, form);

        await refreshNuxtData(`Projects-${route.params.projectId}`);

        return response;
    } finally {
        projectLoading.value = false;
    }
}

export async function deleteProject() {
    const projectLoading = useProjectLoading();
    const route = useRoute();
    const client = useProjectClient();

    projectLoading.value = true;
    try {
        const response = await client.delete(route.params.projectId as string);

        clearNuxtData(`Projects-${route.params.projectId}`);

        return response;
    } finally {
        projectLoading.value = false;
    }
}

export function getProject() {
    const route = useRoute();
    const client = useProjectClient();

    return useAsyncData(`Projects-${route.params.projectId}`, () =>
        client.get(route.params.projectId as string)
    );
}

export function listProjects() {
    const client = useProjectClient();

    return useAsyncData("Projects", () => client.list());
}
