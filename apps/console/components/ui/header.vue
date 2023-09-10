<template>
    <header class="border-b border-slate-200 bg-white p-2 flex items-center justify-between">
        <Button variant="text" to="/" class="uppercase tracking-wider font-mono" :as="NuxtLink">
            <img src="/favicon-32x32.png" alt="Logo" width="20" height="20" class="rounded" />

            Coverbase
        </Button>

        <slot />
    </header>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
</script>
