<template>
    <Label text="Email">
        <EmailInput required v-model="modelValue.emailAddress" />
    </Label>
</template>

<script setup lang="ts">
import { CreateSessionRequest } from "@coverbase/schema";

const modelValue = defineModel<CreateSessionRequest>({
    required: true,
});
</script>
