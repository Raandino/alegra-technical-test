// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/icon'],
    devtools: { enabled: true },
    css: ['~/assets/css/fonts.css'],
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
    },
})
