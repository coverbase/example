<template>
    <div
        class="bg-white border border-slate-200 divide-y divide-slate-200 rounded"
        v-if="items && items.length > 0"
    >
        <slot :item="item" v-for="item in items">
            {{ item }}
        </slot>
    </div>
    <Empty v-else>
        {{ empty }}
    </Empty>
</template>

<script setup generic="T" lang="ts">
import Empty from "./empty.vue";

defineProps<{
    items?: Array<T> | null;
    empty?: string;
}>();
</script>
