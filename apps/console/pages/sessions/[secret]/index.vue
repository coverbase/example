<template></template>

<script setup lang="ts">
definePageMeta({
    layout: "auth",
});

const accessToken = useAccessToken();
const route = useRoute();

const secret = route.params.secret as string;

if (secret) {
    accessToken.value = secret;

    navigateTo("/");
}

useSeoMeta({
    title: "Session - Coverbase",
});
</script>
