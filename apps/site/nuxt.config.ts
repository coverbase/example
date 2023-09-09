export default defineNuxtConfig({
    app: {
        head: {
            title: "Coverbase",
        },
    },

    $production: {
        nitro: {
            preset: "cloudflare-pages",
        },
    },
});
