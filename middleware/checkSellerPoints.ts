import { useSellersStore } from '~/store/sellers'
import { useItemsStore } from '~/store/items'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const sellersStore = useSellersStore()
    const itemsStore = useItemsStore()

    sellersStore.allSellers
    itemsStore.items

    const pointsToWin = parseInt(useRuntimeConfig().public.pointsToWin as string)

    const seller = sellersStore.sellers.find((seller) => (seller.points ?? 0) >= pointsToWin)

    if (!seller) {
        abortNavigation()
        return navigateTo('/')
    }

    const clientId = 1
    const sellerId = seller.id
    const items = itemsStore.items
    const dueDate = new Date().toISOString().split('T')[0]
    const date = new Date().toISOString().split('T')[0]

    try {
        await itemsStore.createInvoice(clientId, sellerId, items, dueDate, date)
    } catch (error) {
        console.error('Error creating invoice:', error)
        abortNavigation()
        return navigateTo('/error')
    }
})
