<template>
    <header
        class="p-4 sticky top-0 z-50 bg-white bg-opacity-80 flex justify-between items-center border-slate-200 border-b"
    >
        <Button variant="text" to="/" class="uppercase tracking-wider font-mono" :as="RouterLink">
            <img src="/favicon-32x32.png" alt="Logo" width="20" height="20" class="rounded" />

            Coverbase
        </Button>

        <nav class="sm:flex gap-4 hidden">
            <TextLink :to="navigation.route" :as="RouterLink" v-for="navigation in navigations">
                {{ navigation.name }}
            </TextLink>
        </nav>

        <Button to="/contact" class="sm:flex hidden" :as="RouterLink">
            <span class="px-2"> Contact us </span>
        </Button>

        <Button variant="secondary" class="sm:hidden" @click="menu = !menu">
            <IconMenu2 width="20" height="20" />
        </Button>
    </header>

    <main class="p-4 flex flex-col">
        <Card v-if="menu">
            <Button to="/contact" :as="RouterLink" @click="menu = false">
                <span class="px-2"> Contact us </span>
            </Button>

            <Button
                variant="text"
                class="justify-between"
                :to="navigation.route"
                :as="RouterLink"
                v-for="navigation in navigations"
                @click="menu = false"
            >
                <span class="px-2">
                    {{ navigation.name }}
                </span>
            </Button>
        </Card>
        <slot v-else />
    </main>

    <footer class="p-4 bg-white flex items-center justify-between border-slate-200 border-t">
        <span class="flex gap-2 items-center">
            <Button
                as="a"
                target="_blank"
                rel="noreferrer nofollow"
                variant="text"
                href="https://github.com/coverbase"
            >
                <IconBrandGithub width="20" height="20" />
            </Button>

            <Divider variant="vertical" />

            <Button
                as="a"
                target="_blank"
                rel="noreferrer nofollow"
                variant="text"
                href="https://twitter.com/coverbasehq"
            >
                <IconBrandTwitter width="20" height="20" />
            </Button>
        </span>

        <span class="px-2"> Copyright © {{ new Date().getFullYear() }} Coverbase </span>
    </footer>
</template>

<script setup lang="ts">
import { RouterLink } from "#vue-router";
import { IconBrandGithub, IconBrandTwitter, IconMenu2 } from "@tabler/icons-vue";
import { useMediaQuery } from "@vueuse/core";

const menu = useMenuState();
const isSmall = useMediaQuery("(min-width: 640px)");

const navigations = [
    {
        route: "/docs",
        name: "Docs",
    },
    {
        route: "/products",
        name: "Products",
    },
    {
        route: "/blog",
        name: "Blog",
    },
];

watch(isSmall, (value) => {
    if (value) {
        menu.value = false;
    }
});
</script>
