<template></template>

<script setup lang="ts">
definePageMeta({
    layout: "auth",
});

const accessToken = useAccessToken();

const data = await getSession();

if (data) {
    accessToken.value = data;

    navigateTo("/");
}
</script>
