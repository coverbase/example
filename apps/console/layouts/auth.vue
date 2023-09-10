<template>
    <main class="grid grid-layout-header h-screen overflow-hidden">
        <UiHeader>
            <div class="flex gap-2">
                <Button variant="text" to="/sign-in" :as="NuxtLink">
                    <span class="px-2"> Sign In </span>
                </Button>

                <Divider variant="vertical" />

                <Button variant="text" to="/sign-up" :as="NuxtLink">
                    <span class="px-2"> Sign Up </span>
                </Button>
            </div>
        </UiHeader>

        <div class="p-4 overflow-y-scroll">
            <slot />
        </div>
    </main>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { Button, Divider } from "@coverbase/ui";
</script>
