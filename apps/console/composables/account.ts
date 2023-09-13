import { createAccountClient } from "@coverbase/client";
import { CreateAccountRequest, UpdateAccountRequest } from "@coverbase/schema";

export const useAccountLoading = () => useState<boolean>("Account-Loading", () => false);

export function useAccountClient() {
    const accessToken = useAccessToken();
    const config = useRuntimeConfig();

    return createAccountClient({
        baseUrl: config.public.apiUrl,
        accessToken: accessToken.value,
    });
}

export async function createAccount(form: CreateAccountRequest) {
    const accountLoading = useAccountLoading();
    const client = useAccountClient();

    accountLoading.value = true;
    try {
        const response = await client.create(form);

        await createSession({
            emailAddress: form.emailAddress,
        });

        await refreshNuxtData("Accounts");

        return response;
    } finally {
        accountLoading.value = false;
    }
}

export async function updateAccount(form: UpdateAccountRequest) {
    const accountLoading = useAccountLoading();
    const client = useAccountClient();

    accountLoading.value = true;
    try {
        const response = await client.update(form);

        await refreshNuxtData("Accounts");

        return response;
    } finally {
        accountLoading.value = false;
    }
}

export async function deleteAccount() {
    const accountLoading = useAccountLoading();
    const client = useAccountClient();

    accountLoading.value = true;
    try {
        const response = await client.delete();

        await refreshNuxtData("Accounts");

        return response;
    } finally {
        accountLoading.value = false;
    }
}

export function getAccount() {
    const client = useAccountClient();

    return useAsyncData("Accounts", () => client.get());
}
