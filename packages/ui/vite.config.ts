import vue from "@vitejs/plugin-vue";
import unocss from "unocss/vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        vue({
            script: {
                defineModel: true,
            },
        }),
        unocss(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            name: "ui",
            entry: "./src/index.ts",
        },
        rollupOptions: {
            external: ["vue", "@vueuse/core", "@tabler/icons-vue"],
            output: {
                globals: {
                    "vue": "Vue",
                    "@vueuse/core": "VueUseCore",
                    "@tabler/icons-vue": "TablerIconsVue",
                },
            },
        },
    },
});
