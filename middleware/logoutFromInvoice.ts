export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to?.name == 'login' && from?.name == 'checkout') {
        reloadNuxtApp()
    }
})
