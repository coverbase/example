<template>
    <component
        class="flex w-full flex-col gap-4 rounded border border-slate-200 bg-white p-4 sm:p-6"
        :is="as"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
import type { Component } from "vue";

withDefaults(
    defineProps<{
        as?: string | Component;
    }>(),
    {
        as: "div",
    }
);
</script>
