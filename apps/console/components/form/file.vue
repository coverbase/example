<template>
    <Label text="Name">
        <Input placeholder="Name..." required v-model="modelValue.name" />
    </Label>

    <Label text="File">
        <FileInput placeholder="Select File..." required v-model="modelValue.blob" />
    </Label>
</template>

<script setup lang="ts">
import { CreateFileRequest, UpdateFileRequest } from "@coverbase/schema";

const modelValue = defineModel<CreateFileRequest | UpdateFileRequest>({
    required: true,
});
</script>
