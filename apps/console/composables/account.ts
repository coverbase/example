import { AccountEntity, CreateAccountRequest, UpdateAccountRequest } from "@coverbase/schema";

export const useAccountLoading = () => useState<boolean>("Account-Loading", () => false);

export async function createAccount(form: CreateAccountRequest) {
    const accountLoading = useAccountLoading();

    accountLoading.value = true;
    try {
        const response = await $fetch<AccountEntity>("/accounts", {
            method: "POST",
            onRequest: requestInterceptorJson,
            body: JSON.stringify(form),
        });

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

    accountLoading.value = true;
    try {
        const response = await $fetch<AccountEntity>("/accounts", {
            method: "PUT",
            body: JSON.stringify(form),
            onRequest: requestInterceptorJson,
        });

        await refreshNuxtData("Accounts");

        return response;
    } finally {
        accountLoading.value = false;
    }
}

export async function deleteAccount() {
    const accountLoading = useAccountLoading();

    accountLoading.value = true;
    try {
        const response = await $fetch<AccountEntity>("/accounts", {
            method: "DELETE",
            onRequest: requestInterceptorJson,
        });

        await refreshNuxtData("Accounts");

        return response;
    } finally {
        accountLoading.value = false;
    }
}

export function getAccount() {
    return useFetch<AccountEntity>("/accounts", {
        key: `Accounts`,
        method: "GET",
        onRequest: requestInterceptorJson,
    });
}
