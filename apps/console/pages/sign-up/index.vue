<template>
    <div class="max-w-lg mx-auto flex flex-col gap-4">
        <Heading class="my-8 text-center"> Sign up to Coverbase </Heading>

        <Card>
            <div class="flex flex-col gap-2">
                <Button variant="secondary">
                    <IconBrandGoogle width="20" height="20" />

                    Google
                </Button>

                <Button variant="secondary">
                    <IconBrandGithub width="20" height="20" />

                    GitHub
                </Button>
            </div>

            <Divider />

            <Button variant="secondary" to="/sign-up/email" :as="NuxtLink">
                <IconMail width="20" height="20" />

                Continue with Email
            </Button>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { IconBrandGithub, IconBrandGoogle, IconMail } from "@tabler/icons-vue";

definePageMeta({
    layout: "auth",
});
</script>
