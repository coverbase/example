<template>
    <Card as="form" @submit.prevent="handleUpdate">
        <Subheading> Project Settings </Subheading>

        <FormProject v-model="form" />

        <Button type="submit" class="sm:self-start" :loading="projectLoading">
            <span class="px-2"> Save Changes </span>
        </Button>
    </Card>

    <Card>
        <div class="flex items-center justify-between">
            <Subheading> Danger Zone </Subheading>

            <Button variant="danger" :loading="projectLoading" @click="dialog?.open(project?.name)">
                <span class="px-2"> Delete Project </span>
            </Button>
        </div>
    </Card>

    <DialogDelete ref="dialog" @submit="handleDelete" />
</template>

<script setup lang="ts">
import { DialogDelete } from "#components";
import { CreateProjectRequest } from "@coverbase/schema";

definePageMeta({
    layout: "project",
    middleware: ["auth"],
});

const { data: project } = getProject();

const dialog = ref<InstanceType<typeof DialogDelete>>();
const projectLoading = useProjectLoading();
const form = ref<CreateProjectRequest>({
    name: "",
});

async function handleUpdate() {
    await updateProject(form.value);
}

async function handleDelete() {
    await deleteProject();

    navigateTo("/");
}

watch(project, (value) => {
    if (value) {
        form.value = {
            ...value,
        };
    }
});

useSeoMeta({
    title: "Settings - Project - Coverbase",
});
</script>
