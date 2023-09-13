<template>
    <Label text="Name">
        <Input placeholder="Name..." required v-model="modelValue.name" />
    </Label>
</template>

<script setup lang="ts">
import { CreateProjectRequest } from "@coverbase/schema";

const modelValue = defineModel<CreateProjectRequest>({
    required: true,
});
</script>
