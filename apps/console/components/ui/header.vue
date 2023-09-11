<template>
    <header class="border-b border-slate-200 bg-white p-2 flex items-center justify-between">
        <div class="flex gap-2 items-center">
            <Button variant="text" to="/" class="uppercase tracking-wider font-mono" :as="NuxtLink">
                <img src="/favicon-32x32.png" alt="Logo" width="20" height="20" class="rounded" />
            </Button>

            <template v-if="title">
                <Divider variant="vertical" />

                <span class="px-2 font-semibold">
                    {{ title }}
                </span>
            </template>
        </div>

        <slot />
    </header>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";

defineProps<{
    title?: string;
}>();
</script>
