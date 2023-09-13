<template></template>

<script setup lang="ts">
import { UpdateMemberRequest } from "@coverbase/schema";

const modelValue = defineModel<UpdateMemberRequest>({
    required: true,
});
</script>
