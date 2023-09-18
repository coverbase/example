<template>
    <Label text="Name">
        <Input placeholder="Name..." required v-model="modelValue.name" />
    </Label>
</template>

<script setup lang="ts">
import { CreateApplicationRequest } from "@coverbase/schema";

const modelValue = defineModel<CreateApplicationRequest>({
    required: true,
});
</script>
