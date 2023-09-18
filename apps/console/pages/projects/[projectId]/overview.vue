<template>
    <Heading> Hello, {{ account?.firstName }}! </Heading>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "project",
    middleware: ["auth"],
});

const { data: account } = getAccount();

useSeoMeta({
    title: "Overview - Project - Coverbase",
});
</script>
