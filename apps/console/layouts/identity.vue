<template>
    <NuxtLayout name="default" title="Identity">
        <div class="grid grid-layout-aside overflow-hidden">
            <Aside>
                <ButtonLink to="/identity/accounts" :icon="IconUsers"> Accounts </ButtonLink>
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
import { IconUsers } from "@tabler/icons-vue";
</script>
