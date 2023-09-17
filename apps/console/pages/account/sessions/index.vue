<template>
    <Heading> Sessions </Heading>

    <List empty="No sessions found." :items="sessions" v-slot="{ item }">
        <div class="p-4 flex items-center justify-between">
            <div class="flex flex-col px-2">
                <Strong>
                    {{ item.id }}
                </Strong>

                <div class="flex">
                    <p class="text-slate-400">
                        {{ formatDate(item.created) }}
                    </p>
                </div>
            </div>

            <Button variant="outline" :loading="sessionLoading" @click="handleDelete(item)">
                <IconTrash width="20" height="20" />
            </Button>
        </div>
    </List>
</template>

<script setup lang="ts">
import { SessionEntity } from "@coverbase/schema";
import { IconTrash } from "@tabler/icons-vue";

definePageMeta({
    layout: "account",
    middleware: ["auth"],
});

const sessionLoading = useSessionLoading();
const { data: sessions } = listSessions();

async function handleDelete(session: SessionEntity) {
    await deleteSession(session.id);
}

useSeoMeta({
    title: "Sessions - Account - Coverbase",
});
</script>
