<template>
    <div class="flex justify-between items-center gap-2">
        <Heading> Tokens </Heading>

        <Button to="/settings/tokens/create" :as="NuxtLink">
            <span class="px-2"> New Token </span>
        </Button>
    </div>

    <List empty="No tokens found." :items="tokens" v-slot="{ item }">
        <div class="p-4 flex items-center justify-between">
            <div class="flex flex-col px-2">
                <TextLink
                    class="font-semibold text-base"
                    variant="secondary"
                    :to="`/settings/tokens/${item.id}`"
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

            <Button variant="outline" :to="`/settings/tokens/${item.id}`" :as="NuxtLink">
                <IconSettings width="20" height="20" />
            </Button>
        </div>
    </List>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { IconSettings } from "@tabler/icons-vue";

definePageMeta({
    layout: "settings",
    middleware: ["auth"],
});

const { data: tokens } = listTokens();

useSeoMeta({
    title: "Tokens - Settings - Coverbase",
});
</script>
