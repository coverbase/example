<template>
    <NuxtLayout name="default">
        <div class="grid grid-layout-aside overflow-hidden">
            <Aside>
                <UiButtonLink to="/account">
                    <IconHome width="20" height="20" />

                    General
                </UiButtonLink>
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
import { IconHome } from "@tabler/icons-vue";
</script>
