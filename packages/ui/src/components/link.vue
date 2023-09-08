<template>
    <component
        class="inline-flex items-center gap-2 cursor-pointer text-slate-500 hover:text-slate-900 decoration-none"
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
        as: "a",
    }
);
</script>
