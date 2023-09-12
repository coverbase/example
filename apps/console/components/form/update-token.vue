<template>
    <Label text="Name">
        <Input placeholder="Name..." required v-model="modelValue.name" />
    </Label>
</template>

<script setup lang="ts">
import { UpdateTokenRequest } from "@coverbase/schema";

const modelValue = defineModel<UpdateTokenRequest>({
    required: true,
});
</script>
