<template>
    <div class="overflow-y-scroll">
        <Center>
            <Heading> Services </Heading>

            <div class="grid sm:grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    class="p-4"
                    :to="service.route"
                    :as="NuxtLink"
                    v-for="service in services"
                >
                    <div class="flex gap-4 w-full">
                        <div class="bg-slate-100 rounded my-auto p-4">
                            <component :is="service.icon" />
                        </div>

                        <div class="flex flex-col font-normal whitespace-normal">
                            <Strong>
                                {{ service.name }}
                            </Strong>

                            <p class="text-slate-400">
                                {{ service.description }}
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
import { IconEye, IconWorld } from "@tabler/icons-vue";

definePageMeta({
    middleware: ["auth"],
});

const services = [
    {
        icon: IconWorld,
        route: "/identity/accounts",
        name: "Browser",
        description: "Fast, scalable, and reliable Api to control a headless browser.",
    },
    {
        icon: IconEye,
        route: "/identity/accounts",
        name: "Vision",
        description: "OCR receipt scanning and data extraction.",
    },
];

useSeoMeta({
    title: "Index - Coverbase",
});
</script>
