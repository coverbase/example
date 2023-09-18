<template>
    <NuxtLayout name="default" title="Settings">
        <div class="grid grid-layout-aside overflow-hidden">
            <Aside>
                <ButtonLink to="/settings" exact :icon="IconHome"> General </ButtonLink>

                <ButtonLink to="/settings/apps" :icon="IconApps"> Apps </ButtonLink>

                <ButtonLink to="/settings/tokens" :icon="IconKey"> Tokens </ButtonLink>

                <ButtonLink to="/settings/sessions" :icon="IconFingerprint"> Sessions </ButtonLink>
            </Aside>

            <main class="overflow-y-scroll">
                <Center>
                    <slot />
                </Center>
            </main>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { IconApps, IconFingerprint, IconHome, IconKey } from "@tabler/icons-vue";
</script>
