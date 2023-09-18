<template>
    <Breadcrumb
        :routes="[
            {
                name: 'Apps',
                to: '/settings/apps',
            },
            {
                name: 'Create',
                to: '/settings/apps/create',
            },
        ]"
    />

    <Card as="form" @submit.prevent="handleCreate">
        <Subheading> New App </Subheading>

        <FormApplication v-model="form" />

        <Button type="submit" class="sm:self-start" :loading="applicationLoading">
            <span class="px-2"> Create App </span>
        </Button>
    </Card>
</template>

<script setup lang="ts">
import { CreateApplicationRequest } from "@coverbase/schema";

definePageMeta({
    layout: "settings",
    middleware: ["auth"],
});

const applicationLoading = useApplicationLoading();
const form = ref<CreateApplicationRequest>({
    name: "",
});

async function handleCreate() {
    await createApplication(form.value);

    navigateTo("/settings/apps");
}

useSeoMeta({
    title: "Apps - Settings - Coverbase",
});
</script>
