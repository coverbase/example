<template>
    <Breadcrumb
        :routes="[
            {
                name: 'Tokens',
                to: '/settings/tokens',
            },
            {
                name: token?.name ?? '',
                to: `/settings/tokens/${token?.id}`,
            },
        ]"
    />

    <Card as="form" @submit.prevent="handleUpdate">
        <Subheading> Token Settings </Subheading>

        <FormUpdateToken v-model="form" />

        <Button type="submit" class="sm:self-start" :loading="tokenLoading">
            <span class="px-2"> Save Changes </span>
        </Button>
    </Card>

    <Card>
        <div class="flex items-center justify-between">
            <Subheading> Danger Zone </Subheading>

            <Button variant="danger" :loading="tokenLoading" @click="dialog?.open(token?.name)">
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
    layout: "settings",
    middleware: ["auth"],
});

const { data: token } = getToken();

const dialog = ref<InstanceType<typeof DialogDelete>>();
const tokenLoading = useTokenLoading();
const form = ref<UpdateTokenRequest>({
    name: "",
});

async function handleUpdate() {
    await updateToken(form.value);
}

async function handleDelete() {
    await deleteToken();

    navigateTo("/settings/tokens");
}

watch(token, (value) => {
    if (value) {
        form.value = {
            ...value,
        };
    }
});

useSeoMeta({
    title: "Tokens - Settings - Coverbase",
});
</script>
