export default defineNuxtConfig({
    modules: ["@unocss/nuxt"],

    css: ["@unocss/reset/tailwind.css", "@coverbase/ui/style"],

    unocss: {
        rules: [
            ["grid-layout-header", { "grid-template-rows": "auto 1fr" }],
            ["grid-layout-aside", { "grid-template-columns": "auto 1fr" }],
        ],
        safelist: [
            "overflow-y-scroll",
            "overflow-x-hidden",
            "bg-slate-50",
            "font-sans",
            "text-slate-900",
            "text-base",
        ],
    },

    app: {
        head: {
            title: "Coverbase",
            bodyAttrs: {
                class: "overflow-hidden bg-slate-50 font-sans text-slate-900 text-base",
            },
        },
    },

    $production: {
        nitro: {
            preset: "cloudflare-pages",
        },

        runtimeConfig: {
            public: {
                apiUrl: "https://identity.coverbase.co/",
            },
        },
    },

    $development: {
        runtimeConfig: {
            public: {
                apiUrl: "http://localhost:5000/",
            },
        },
    },
});
