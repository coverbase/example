<template>
    <NuxtLayout name="default" title="Account">
        <div class="grid grid-layout-aside overflow-hidden">
            <Aside>
                <ButtonLink to="/account/general" :icon="IconHome"> General </ButtonLink>

                <ButtonLink to="/account/tokens" :icon="IconKey"> Tokens </ButtonLink>
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
import { IconHome, IconKey } from "@tabler/icons-vue";
</script>
