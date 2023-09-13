<template>
    <div class="flex items-center justify-between">
        <Heading> Projects </Heading>

        <Button to="/projects/create" :as="NuxtLink">
            <span class="px-2"> New Project </span>
        </Button>
    </div>

    <List empty="No projects found." :items="projects" v-slot="{ item }">
        <div class="p-4 flex items-center justify-between">
            <div class="flex flex-col gap-1 px-2">
                <TextLink
                    class="font-semibold text-base"
                    variant="secondary"
                    :to="`/projects/${item.id}/overview`"
                    :as="NuxtLink"
                >
                    {{ item.name }}
                </TextLink>

                <div class="flex">
                    <p class="text-slate-400">
                        {{ formatDate(item.created) }}
                    </p>
                </div>
            </div>

            <Button variant="outline" :to="`/projects/${item.id}/settings`" :as="NuxtLink">
                <IconSettings width="20" height="20" />
            </Button>
        </div>
    </List>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { IconSettings } from "@tabler/icons-vue";
import { listProjects } from "~/composables/project";

definePageMeta({
    layout: "center",
    middleware: ["auth"],
});

const { data: projects } = listProjects();

useSeoMeta({
    title: "Index - Coverbase",
});
</script>
