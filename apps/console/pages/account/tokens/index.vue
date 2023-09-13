<template>
    <div class="flex justify-between items-center gap-2">
        <Heading> Tokens </Heading>

        <Button to="/account/tokens/create" :as="NuxtLink">
            <span class="px-2"> New Token </span>
        </Button>
    </div>

    <List empty="No tokens found." :items="tokens" v-slot="{ item }">
        <div class="p-4 flex items-center justify-between">
            <Strong class="px-2">
                {{ item.name }}
            </Strong>

            <Button variant="outline" :to="`/account/tokens/${item.id}`" :as="NuxtLink">
                <IconSettings width="20" height="20" />
            </Button>
        </div>
    </List>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { IconSettings } from "@tabler/icons-vue";

definePageMeta({
    layout: "account",
});

const { data: tokens } = listTokens();

useSeoMeta({
    title: "Tokens - Account - Coverbase",
});
</script>
