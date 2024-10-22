import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    const { authenticated } = storeToRefs(authStore)

    const token = useCookie('token')

    if (token.value) {
        authenticated.value = true
    }

    if (token.value && to?.name === 'login') {
        return navigateTo('/index')
    }

    if (!token.value && to?.name !== 'login') {
        abortNavigation()

        return navigateTo('/login')
    }
})
