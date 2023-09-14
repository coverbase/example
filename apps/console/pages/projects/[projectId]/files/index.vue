<template>
    <div class="flex items-center justify-between">
        <Heading> Files </Heading>

        <Button :to="`/projects/${$route.params.projectId}/files/create`" :as="NuxtLink">
            <span class="px-2"> New File </span>
        </Button>
    </div>

    <List empty="No files found." :items="files" v-slot="{ item }">
        <div class="flex items-center justify-between p-4">
            <div class="flex flex-col px-2">
                <TextLink
                    class="font-semibold text-base"
                    variant="secondary"
                    target="_blank"
                    :to="`${config.public.storageUrl}/${item.id}`"
                    :as="NuxtLink"
                >
                    {{ item.name }}
                </TextLink>

                <div class="flex gap-2 text-slate-400">
                    <p>
                        {{ item.type }}
                    </p>

                    <p>•</p>

                    <p>
                        {{ formatDate(item.created) }}
                    </p>
                </div>
            </div>

            <Button variant="outline" :loading="fileLoading" @click="handleDelete(item)">
                <IconTrash width="20" height="20" />
            </Button>
        </div>
    </List>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { FileEntity } from "@coverbase/schema";
import { IconTrash } from "@tabler/icons-vue";

definePageMeta({
    layout: "project",
    middleware: ["auth"],
});

const config = useRuntimeConfig();
const fileLoading = useFileLoading();
const { data: files } = listFiles();

async function handleDelete(file: FileEntity) {
    await deleteFile(file.id);
}
</script>
