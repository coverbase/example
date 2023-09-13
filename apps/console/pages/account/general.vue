<template>
    <Card as="form" @submit.prevent="handleUpdate">
        <Subheading> Account Settings </Subheading>

        <FormUpdateAccount v-model="form" />

        <Button type="submit" class="self-start" :loading="accountLoading">
            <span class="px-2"> Save Changes </span>
        </Button>
    </Card>

    <Card>
        <div class="flex items-center justify-between">
            <Subheading> Danger Zone </Subheading>

            <Button
                class="self-start"
                variant="danger"
                :loading="accountLoading"
                @click="dialog?.open(account?.emailAddress)"
            >
                <span class="px-2"> Delete Account </span>
            </Button>
        </div>
    </Card>

    <DialogDelete ref="dialog" @submit="handleDelete" />
</template>

<script setup lang="ts">
import { DialogDelete } from "#components";
import { UpdateAccountRequest } from "@coverbase/schema";

definePageMeta({
    layout: "account",
    middleware: ["auth"],
});

const dialog = ref<InstanceType<typeof DialogDelete>>();
const accountLoading = useAccountLoading();
const { data: account } = getAccount();

const form = ref<UpdateAccountRequest>({
    firstName: "",
    lastName: "",
    emailAddress: "",
});

async function handleUpdate() {
    await updateAccount(form.value);
}

async function handleDelete() {
    await deleteAccount();
}

watch(account, (value) => {
    if (value) {
        form.value = {
            ...account.value,
        };
    }
});

useSeoMeta({
    title: "General - Account - Coverbase",
});
</script>
