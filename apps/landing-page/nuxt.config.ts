export default defineNuxtConfig({
    modules: ["@coverbase/ui"],

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
