<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { FetchError } from "ofetch";

onErrorCaptured((error) => {
    if (isFetchError(error)) {
        console.log("Fetch Error");
    }
});

function isFetchError(value: object): value is FetchError {
    return "data" in value;
}
</script>
