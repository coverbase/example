<template>
    <Button
        class="!justify-start"
        :variant="$route.path.startsWith(to) ? 'secondary' : 'text'"
        :to="to"
        :as="RouterLink"
    >
        <component width="20" height="20" :is="icon" />

        <span class="hidden sm:inline-block">
            <slot />
        </span>
    </Button>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { RouterLink } from "vue-router";
import Button from "./button.vue";

defineProps<{
    to: string;
    icon?: Component;
}>();
</script>
