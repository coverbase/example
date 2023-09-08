export default defineNuxtRouteMiddleware(() => {
    const menu = useMenuState();

    menu.value = false;
});
