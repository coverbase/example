export default defineNuxtConfig({
    modules: ["@unocss/nuxt", "@vueuse/nuxt"],

    css: ["@unocss/reset/tailwind.css", "@coverbase/ui/style"],

    unocss: {
        rules: [["grid-layout-header", { "grid-template-rows": "auto 1fr auto" }]],
        safelist: [
            "overflow-y-scroll",
            "overflow-x-hidden",
            "bg-slate-50",
            "font-sans",
            "text-slate-900",
            "text-base",
        ],
    },

    build: {
        transpile: ["@coverbase/ui"],
    },

    vite: {
        vue: {
            script: {
                defineModel: true,
            },
        },
    },

    app: {
        head: {
            title: "Coverbase",
            bodyAttrs: {
                class: "overflow-y-scroll overflow-x-hidden bg-slate-50 font-sans text-slate-900 text-base",
            },
        },
    },

    $production: {
        nitro: {
            preset: "cloudflare-pages",
        },
    },
});
