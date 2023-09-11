<template>
    <div class="overflow-y-scroll">
        <Center>
            <div class="grid grid-cols-2 gap-4">
                <Button variant="outline" class="p-4" to="/" :as="NuxtLink">
                    <div class="flex gap-4 w-full">
                        <div class="bg-slate-100 rounded p-4">
                            <IconUsers />
                        </div>

                        <div class="flex flex-col font-normal">
                            <Strong> Identity </Strong>
                        </div>
                    </div>
                </Button>
            </div>
        </Center>
    </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { IconUsers } from "@tabler/icons-vue";

definePageMeta({
    middleware: ["auth"],
});

useSeoMeta({
    title: "Index - Coverbase",
});
</script>
