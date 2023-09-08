<template>
    <div class="rounded flex flex-col items-center gap-8 text-center bg-slate-900 p-8 text-white">
        <h1 class="font-bold text-5xl">Landing Page</h1>

        <p class="text-slate-400 max-w-xl text-lg">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut
        </p>

        <Button variant="text" class="bg-white text-lg" to="/contact" :as="RouterLink">
            <span class="px-2"> Contact us </span>
        </Button>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from "#vue-router";
import { Button } from "@coverbase/ui";

useSeoMeta({
    title: "Home - Coverbase",
});
</script>
