<template>
    <div class="max-w-lg mx-auto flex flex-col gap-4">
        <Heading class="my-8 text-center"> Sign in to Coverbase </Heading>

        <Card as="form" @submit.prevent="handleSubmit">
            <Label text="Email">
                <EmailInput required v-model="form.emailAddress" />
            </Label>

            <Button type="submit" :loading="sessionLoading">
                <span class="px-2"> Continue </span>
            </Button>
        </Card>

        <TextLink class="justify-center" to="/sign-in" :as="NuxtLink">
            ← Other Sign in Options
        </TextLink>
    </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { CreateSessionRequest } from "@coverbase/schema";

definePageMeta({
    layout: "auth",
});

const sessionLoading = useSessionLoading();
const form = ref<CreateSessionRequest>({
    emailAddress: "moritz.mueller@coverbase.co",
});

async function handleSubmit() {
    await createSession(form.value);
}
</script>
