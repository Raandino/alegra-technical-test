import { useSellersStore } from '~/store/sellers'

export default defineNuxtRouteMiddleware((to, from) => {
    const { allSellers } = useSellersStore()

    const hasTwentyPoints = allSellers.some((seller) => (seller.points ?? 0) >= 20)

    if (!hasTwentyPoints) {
        abortNavigation()
        return navigateTo('/')
    }
})
