<template>
    <Card as="form" @submit.prevent="handleSubmit">
        <Subheading> Account Settings </Subheading>

        <FormUpdateAccount v-model="form" />

        <Button type="submit" class="self-start" :loading="accountLoading">
            <span class="px-2"> Save Changes </span>
        </Button>
    </Card>
</template>

<script setup lang="ts">
import { UpdateAccountRequest } from "@coverbase/schema";

definePageMeta({
    layout: "account",
});

const accountLoading = useAccountLoading();
const { data: account } = getAccount();

const form = ref<UpdateAccountRequest>({
    firstName: "",
    lastName: "",
});

async function handleSubmit() {
    await updateAccount(form.value);
}

watch(account, (value) => {
    if (value) {
        form.value = {
            firstName: account.value?.firstName,
            lastName: account.value?.lastName,
            emailAddress: account.value?.emailAddress,
            phoneNumber: account.value?.phoneNumber ?? undefined,
        };
    }
});

useSeoMeta({
    title: "Account - Coverbase",
});
</script>
