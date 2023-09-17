<template>
    <main class="grid grid-layout-header h-screen overflow-hidden">
        <UiHeader :title="title">
            <div class="flex gap-2">
                <Button variant="text" to="/account/general" :as="NuxtLink">
                    <span class="px-2"> {{ data?.firstName }} {{ data?.lastName }} </span>
                </Button>

                <Divider variant="vertical" />

                <Button variant="text" :loading="sessionLoading" @click="handleLogout">
                    <IconLogout width="20" height="20" />
                </Button>
            </div>
        </UiHeader>

        <slot />
    </main>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { IconLogout } from "@tabler/icons-vue";

defineProps<{
    title?: string;
}>();

const sessionLoading = useSessionLoading();
const { data } = getAccount();

function handleLogout() {
    const accessToken = useAccessToken();

    accessToken.value = "";

    navigateTo("/sign-in");
}
</script>
