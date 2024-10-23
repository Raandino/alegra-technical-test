// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/icon'],
    devtools: { enabled: true },
    css: ['~/assets/css/fonts.css'],
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            title: '▷ Superpoderes para tu negocio | Alegra.com',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        'Alegra es la plataforma en la nube con soluciones para ☝ administrar tu negocio, facturar electrónicamente y vender en línea. ✓ Empieza GRATIS',
                },
            ],
        },
    },
    runtimeConfig: {
        apiUrl: process.env.API_URL,
        public: {
            pointsToWin: process.env.POINTS_TO_WIN,
            incrementPerPoints: process.env.INCREMENTS_PER_POINT,
            apiUrl: process.env.API_URL,
            pexelsApi: process.env.PEXELS_API_URL,
        },
    },
})
