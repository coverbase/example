export default defineNuxtRouteMiddleware(async (to) => {
    if (process.client) {
        const accessToken = useAccessToken();

        if (accessToken.value === "" && to.name !== "sign-in") {
            return navigateTo("/sign-in");
        }
    }
});
