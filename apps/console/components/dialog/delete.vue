<template>
    <Dialog ref="dialog">
        <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
            <div class="flex items-center justify-between">
                <Subheading> Confirm Deletion </Subheading>

                <Button variant="text" @click="handleClose">
                    <IconX width="20" height="20" />
                </Button>
            </div>

            <p class="text-slate-400">
                To confirm deletion, type "{{ prompt }}" in the text input field.
            </p>

            <Input required :placeholder="prompt" v-model="input" />

            <div class="grid grid-cols-2 gap-2">
                <Button type="submit" variant="danger" :disabled="prompt !== input">
                    <span class="px-2"> Delete Account </span>
                </Button>

                <Button variant="secondary" @click="handleClose">
                    <span class="px-2"> Cancel </span>
                </Button>
            </div>
        </form>
    </Dialog>
</template>

<script setup lang="ts">
import { Dialog } from "#components";
import { IconX } from "@tabler/icons-vue";

const input = ref("");
const prompt = ref("");
const dialog = ref<InstanceType<typeof Dialog>>();

const emit = defineEmits<{
    "submit": [];
}>();

function handleSubmit() {
    handleClose();
    emit("submit");
}

function handleOpen(value?: string) {
    prompt.value = value ?? "Delete";

    dialog.value?.open();
}

function handleClose() {
    dialog.value?.close();
}

defineExpose({
    open: handleOpen,
    close: handleClose,
});
</script>
