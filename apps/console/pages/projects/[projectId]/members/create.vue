<template>
    <Breadcrumb
        :routes="[
            {
                name: 'Members',
                to: `/projects/${$route.params.projectId}/members`,
            },
            {
                name: 'Create',
                to: `/projects/${$route.params.projectId}/members/create`,
            },
        ]"
    />

    <Card as="form" @submit.prevent="handleCreate">
        <Subheading> New Member </Subheading>

        <FormCreateMember v-model="form" />

        <Button type="submit" class="sm:self-start" :loading="memberLoading">
            <span class="px-2"> Create Member </span>
        </Button>
    </Card>
</template>

<script setup lang="ts">
import { CreateMemberRequest } from "@coverbase/schema";

definePageMeta({
    layout: "project",
    middleware: ["auth"],
});

const route = useRoute();
const memberLoading = useMemberLoading();
const form = ref<CreateMemberRequest>({
    emailAddress: "moritz.mueller@coverbase.co",
    roleId: "",
});

async function handleCreate() {
    await createMember(form.value);

    navigateTo(`/projects/${route.params.projectId}/members`);
}

useSeoMeta({
    title: "Members - Project - Coverbase",
});
</script>
