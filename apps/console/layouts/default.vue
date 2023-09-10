<template>
    <main class="grid grid-layout-header">
        <header class="border-b border-slate-200 bg-white p-2 flex items-center justify-between">
            <Button variant="text" to="/" class="uppercase tracking-wider font-mono" :as="NuxtLink">
                <img src="/favicon-32x32.png" alt="Logo" width="20" height="20" class="rounded" />

                Coverbase
            </Button>

            <div class="flex gap-2">
                <Button variant="text" to="/sign-in" :as="NuxtLink">
                    <span class="px-2"> Sign In </span>
                </Button>

                <Button variant="outline" to="/sign-up" :as="NuxtLink">
                    <span class="px-2"> Sign Up </span>
                </Button>
            </div>
        </header>

        <div class="p-4">
            <slot />
        </div>
    </main>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { Button } from "@coverbase/ui";
</script>
