export default defineNuxtRouteMiddleware(async (to) => {
    const accessToken = useAccessToken();

    if (accessToken.value === "" && to.name !== "sign-in") {
        return navigateTo("/sign-in");
    }
});
