<template>
    <Label text="Email">
        <EmailInput placeholder="member@example.com" required v-model="modelValue.emailAddress" />
    </Label>
</template>

<script setup lang="ts">
import { CreateMemberRequest } from "@coverbase/schema";

const modelValue = defineModel<CreateMemberRequest>({
    required: true,
});
</script>
