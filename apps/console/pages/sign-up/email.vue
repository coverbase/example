<template>
    <div class="max-w-lg mx-auto flex flex-col gap-4">
        <Heading class="my-8 text-center"> Sign up to Coverbase </Heading>

        <Card as="form" @submit.prevent="handleSubmit">
            <FormCreateAccount v-model="form" />

            <Button type="submit" :loading="accountLoading">
                <span class="px-2"> Continue </span>
            </Button>
        </Card>

        <TextLink class="justify-center" to="/sign-up" :as="NuxtLink">
            ← Other Sign up Options
        </TextLink>
    </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { CreateAccountRequest } from "@coverbase/schema";

definePageMeta({
    layout: "auth",
});

const accountLoading = useAccountLoading();
const form = ref<CreateAccountRequest>({
    firstName: "Moritz",
    lastName: "Müller",
    emailAddress: "moritz.mueller@coverbase.co",
});

async function handleSubmit() {
    await createAccount(form.value);
}

useSeoMeta({
    title: "Email - Sign Up - Coverbase",
});
</script>
