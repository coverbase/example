<template>
    <div class="flex items-center justify-between">
        <Heading> Members </Heading>

        <Button :to="`/projects/${$route.params.projectId}/members/create`" :as="NuxtLink">
            <span class="px-2"> New Member </span>
        </Button>
    </div>

    <List empty="No members found." :items="members" v-slot="{ item }">
        <div class="flex items-center justify-between p-4">
            <div class="flex flex-col px-2">
                <TextLink
                    class="font-semibold text-base"
                    variant="secondary"
                    :to="`/projects/${$route.params.projectId}/members/${item.id}`"
                    :as="NuxtLink"
                >
                    {{ item.account?.firstName }} {{ item.account?.lastName }}
                </TextLink>

                <div class="flex gap-2 text-slate-400">
                    <p>
                        {{ item.role?.name }}
                    </p>

                    <p>•</p>

                    <p>
                        {{ formatDate(item.created) }}
                    </p>
                </div>
            </div>

            <Button
                variant="outline"
                :to="`/projects/${$route.params.projectId}/members/${item.id}`"
                :as="NuxtLink"
            >
                <IconSettings width="20" height="20" />
            </Button>
        </div>
    </List>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { IconSettings } from "@tabler/icons-vue";

definePageMeta({
    layout: "project",
    middleware: ["auth"],
});

const { data: members } = listMembers();
</script>
