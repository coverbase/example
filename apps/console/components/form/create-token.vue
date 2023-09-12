<template>
    <Label text="Name">
        <Input placeholder="Name..." required v-model="modelValue.name" />
    </Label>
</template>

<script setup lang="ts">
import { CreateTokenRequest } from "@coverbase/schema";

const modelValue = defineModel<CreateTokenRequest>({
    required: true,
});
</script>
