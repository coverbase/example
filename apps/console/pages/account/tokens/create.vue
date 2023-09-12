<template>
    <Breadcrumb
        :routes="[
            {
                name: 'Tokens',
                to: '/account/tokens',
            },
            {
                name: 'Create',
                to: '/account/tokens/create',
            },
        ]"
    />

    <Card as="form" @submit.prevent="handleCreate">
        <Subheading> New Token </Subheading>

        <FormCreateToken v-model="form" />

        <Button type="submit" class="sm:self-start" :loading="tokenLoading">
            <span class="px-2"> Create Token </span>
        </Button>
    </Card>
</template>

<script setup lang="ts">
import { CreateTokenRequest } from "@coverbase/schema";

definePageMeta({
    layout: "account",
});

const tokenLoading = useTokenLoading();
const form = ref<CreateTokenRequest>({
    name: "",
});

async function handleCreate() {
    await createToken(form.value);

    navigateTo("/account/tokens");
}

useSeoMeta({
    title: "New - Tokens - Account - Coverbase",
});
</script>
