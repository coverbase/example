<template>
    <Breadcrumb
        :routes="[
            {
                name: 'Members',
                to: `/projects/${$route.params.projectId}/members`,
            },
            {
                name: member?.accountId,
                to: `/projects/${$route.params.projectId}/members/${member?.id}`,
            },
        ]"
    />

    <Card as="form" @submit.prevent="handleUpdate">
        <Subheading> Member Settings </Subheading>

        <FormUpdateMember v-model="form" />

        <Button type="submit" class="sm:self-start" :loading="memberLoading">
            <span class="px-2"> Save Changes </span>
        </Button>
    </Card>

    <Card>
        <div class="flex items-center justify-between">
            <Subheading> Danger Zone </Subheading>

            <Button
                variant="danger"
                :loading="memberLoading"
                @click="dialog?.open(member?.accountId)"
            >
                <span class="px-2"> Delete Member </span>
            </Button>
        </div>
    </Card>

    <DialogDelete ref="dialog" @submit="handleDelete" />
</template>

<script setup lang="ts">
import { DialogDelete } from "#components";
import { UpdateMemberRequest } from "@coverbase/schema";

definePageMeta({
    layout: "project",
    middleware: ["auth"],
});

const { data: member } = getMember();

const route = useRoute();
const dialog = ref<InstanceType<typeof DialogDelete>>();
const memberLoading = useMemberLoading();
const form = ref<UpdateMemberRequest>({});

async function handleUpdate() {
    await updateMember(form.value);
}

async function handleDelete() {
    await deleteMember();

    navigateTo(`/projects/${route.params.projectId}/members`);
}

watch(member, (value) => {
    if (value) {
        form.value = {
            ...value,
        };
    }
});
</script>
