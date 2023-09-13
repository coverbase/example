import { createMemberClient } from "@coverbase/client";
import { CreateMemberRequest, UpdateMemberRequest } from "@coverbase/schema";

export const useMemberLoading = () => useState("Member-Loading", () => false);

export function useMemberClient() {
    const accessToken = useAccessToken();
    const config = useRuntimeConfig();

    return createMemberClient({
        baseUrl: config.public.apiUrl,
        accessToken: accessToken.value,
    });
}

export async function createMember(form: CreateMemberRequest) {
    const route = useRoute();
    const memberLoading = useMemberLoading();
    const client = useMemberClient();

    memberLoading.value = true;
    try {
        const response = await client.create(route.params.projectId as string, form);

        await refreshNuxtData("Members");

        return response;
    } finally {
        memberLoading.value = false;
    }
}

export async function updateMember(form: UpdateMemberRequest) {
    const memberLoading = useMemberLoading();
    const route = useRoute();
    const client = useMemberClient();

    memberLoading.value = true;
    try {
        const response = await client.update(route.params.memberId as string, form);

        await refreshNuxtData(`Members-${route.params.memberId}`);

        return response;
    } finally {
        memberLoading.value = false;
    }
}

export async function deleteMember() {
    const memberLoading = useMemberLoading();
    const route = useRoute();
    const client = useMemberClient();

    memberLoading.value = true;
    try {
        const response = await client.delete(route.params.memberId as string);

        clearNuxtData(`Members-${route.params.memberId}`);

        return response;
    } finally {
        memberLoading.value = false;
    }
}

export function getMember() {
    const route = useRoute();
    const client = useMemberClient();

    return useAsyncData(`Members-${route.params.memberId}`, () =>
        client.get(route.params.memberId as string)
    );
}

export function listMembers() {
    const route = useRoute();
    const client = useMemberClient();

    return useAsyncData("Members", () => client.list(route.params.projectId as string));
}
