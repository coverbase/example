<template>
    <div class="grid grid-cols-2 gap-2">
        <Label text="First name">
            <Input placeholder="John" required v-model="modelValue.firstName" />
        </Label>

        <Label text="Last name">
            <Input placeholder="Doe" required v-model="modelValue.lastName" />
        </Label>
    </div>

    <Label text="Email">
        <EmailInput required v-model="modelValue.emailAddress" />
    </Label>
</template>

<script setup lang="ts">
import { CreateAccountRequest } from "@coverbase/schema";

const modelValue = defineModel<CreateAccountRequest>({
    required: true,
});
</script>
