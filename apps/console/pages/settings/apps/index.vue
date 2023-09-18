<template>
    <div class="flex items-center justify-between">
        <Heading> Apps </Heading>

        <Button to="/settings/apps/create" :as="NuxtLink">
            <span class="px-2"> New App </span>
        </Button>
    </div>

    <List empty="No apps found." :items="applications" v-slot="{ item }" />
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { listApplications } from "~/composables/application";

definePageMeta({
    layout: "settings",
    middleware: ["auth"],
});

const { data: applications } = listApplications();

useSeoMeta({
    title: "Apps - Settings - Coverbase",
});
</script>
