<template>
    <div class="overflow-y-scroll">
        <Center>
            <Heading> Services </Heading>

            <div class="grid sm:grid-cols-2 gap-4">
                <Button variant="outline" class="p-4" to="/identity/accounts" :as="NuxtLink">
                    <div class="flex gap-4 items-center w-full">
                        <div class="bg-slate-100 rounded p-4">
                            <IconUsers />
                        </div>

                        <div class="flex flex-col font-normal whitespace-normal">
                            <Strong> Identity </Strong>

                            <p class="text-slate-400">
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                            </p>
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
