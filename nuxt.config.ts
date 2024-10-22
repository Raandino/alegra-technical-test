// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/icon'],
    devtools: { enabled: true },
    css: ['~/assets/css/fonts.css'],
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
    },
    runtimeConfig: {
        apiUrl: process.env.API_URL,
        public: {
            apiUrl: process.env.API_URL,
            pexelsApi: process.env.PEXELS_API_URL,
        },
    },
})
