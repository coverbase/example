<template>
    <div class="max-w-lg mx-auto flex flex-col gap-4">
        <Heading class="my-8 text-center"> Sign up to Coverbase </Heading>

        <Card>
            <Button variant="secondary" to="/sign-up/email" :as="NuxtLink">
                <IconMail width="20" height="20" />

                Continue with Email
            </Button>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { IconMail } from "@tabler/icons-vue";

definePageMeta({
    layout: "auth",
});

useSeoMeta({
    title: "Sign Up - Coverbase",
});
</script>
