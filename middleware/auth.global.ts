import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    const token = useCookie('token')

    if (token.value) {
        authStore.setAuthenticated(true)
    }

    if (token.value && to?.name === 'login') {
        return navigateTo('/')
    }

    if (!token.value && to?.name !== 'login') {
        abortNavigation()

        return navigateTo('/login')
    }
})
