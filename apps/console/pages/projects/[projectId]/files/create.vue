<template>
    <Breadcrumb
        :routes="[
            {
                name: 'Files',
                to: `/projects/${$route.params.projectId}/files`,
            },
            {
                name: 'Create',
                to: `/projects/${$route.params.projectId}/files/create`,
            },
        ]"
    />

    <Card as="form" @submit.prevent="handleCreate">
        <Subheading> New File </Subheading>

        <FormFile v-model="form" />

        <Button type="submit" class="sm:self-start" :loading="fileLoading">
            <span class="px-2"> Create File </span>
        </Button>
    </Card>
</template>

<script setup lang="ts">
import { CreateFileRequest } from "@coverbase/schema";

definePageMeta({
    layout: "project",
    middleware: ["auth"],
});

const route = useRoute();
const fileLoading = useFileLoading();
const form = ref<CreateFileRequest>({
    name: "",
    blob: new Blob(),
});

async function handleCreate() {
    await createFile(form.value);

    navigateTo(`/projects/${route.params.projectId}/files`);
}
</script>
