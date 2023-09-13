<template>
    <Breadcrumb
        :routes="[
            {
                name: 'Projects',
                to: '/',
            },
            {
                name: 'Create',
                to: '/projects/create',
            },
        ]"
    />

    <Card as="form" @submit.prevent="handleCreate">
        <Subheading> New Project </Subheading>

        <FormProject v-model="form" />

        <Button type="submit" class="sm:self-start" :loading="projectLoading">
            <span class="px-2"> Create Project </span>
        </Button>
    </Card>
</template>

<script setup lang="ts">
import { CreateProjectRequest } from "@coverbase/schema";

definePageMeta({
    layout: "center",
    middleware: ["auth"],
});

const projectLoading = useProjectLoading();
const form = ref<CreateProjectRequest>({
    name: "",
});

async function handleCreate() {
    await createProject(form.value);

    navigateTo("/");
}
</script>
