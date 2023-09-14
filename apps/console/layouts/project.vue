<template>
    <NuxtLayout name="default" title="Project">
        <div class="grid grid-layout-aside overflow-hidden">
            <Aside>
                <ButtonLink :to="`/projects/${route.params.projectId}/overview`" :icon="IconHome">
                    Overview
                </ButtonLink>

                <ButtonLink :to="`/projects/${route.params.projectId}/files`" :icon="IconFile">
                    Files
                </ButtonLink>

                <ButtonLink :to="`/projects/${route.params.projectId}/members`" :icon="IconUsers">
                    Members
                </ButtonLink>

                <ButtonLink
                    :to="`/projects/${route.params.projectId}/settings`"
                    :icon="IconSettings"
                >
                    Settings
                </ButtonLink>
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
import { IconFile, IconHome, IconSettings, IconUsers } from "@tabler/icons-vue";

const route = useRoute();
</script>
