import { useSellersStore } from '~/store/sellers'

export default defineNuxtRouteMiddleware((to, from) => {
    const { allSellers } = useSellersStore()

    const pointsToWin = parseInt(useRuntimeConfig().public.pointsToWin as string)

    const hasTwentyPoints = allSellers.some((seller) => (seller.points ?? 0) >= pointsToWin)

    if (!hasTwentyPoints) {
        abortNavigation()
        return navigateTo('/')
    }

    console.log('Create Invoice now!')
})
