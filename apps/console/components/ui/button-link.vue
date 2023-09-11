<template>
    <Button
        class="!justify-start"
        :as="NuxtLink"
        :variant="$route.path.startsWith(to) && active ? 'secondary' : 'text'"
        :to="to"
    >
        <slot />
    </Button>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";

withDefaults(
    defineProps<{
        to: string;
        active?: boolean;
    }>(),
    {
        active: true,
    }
);
</script>
