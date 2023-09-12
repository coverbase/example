<template>
    <Card as="form" @submit.prevent="handleUpdate">
        <Subheading> Token "{{ token?.name }}" </Subheading>

        <FormUpdateToken v-model="form" />

        <Button type="submit" class="sm:self-start" :loading="tokenLoading">
            <span class="px-2"> Save Changes </span>
        </Button>
    </Card>

    <Card>
        <div class="flex items-center justify-between">
            <Subheading> Danger Zone </Subheading>

            <Button variant="danger" @click="dialog?.open(token?.name)">
                <span class="px-2"> Delete Token </span>
            </Button>
        </div>
    </Card>

    <DialogDelete ref="dialog" @submit="handleDelete" />
</template>

<script setup lang="ts">
import { DialogDelete } from "#components";
import { UpdateTokenRequest } from "@coverbase/schema";

definePageMeta({
    layout: "account",
});

const { data: token } = getToken();

const dialog = ref<InstanceType<typeof DialogDelete>>();
const tokenLoading = useTokenLoading();
const form = ref<UpdateTokenRequest>({
    name: "",
});

async function handleUpdate() {
    await updateToken(form.value);

    navigateTo("/account/tokens");
}

async function handleDelete() {
    await deleteToken();

    navigateTo("/account/tokens");
}

watch(token, (value) => {
    if (value) {
        form.value = {
            ...value,
        };
    }
});

useSeoMeta({
    title: "Tokens - Account - Coverbase",
});
</script>
