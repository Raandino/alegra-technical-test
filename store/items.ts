import { defineStore } from 'pinia'
import type { Item } from '~/types/alegra'
import { useAuthStore } from '~/store/auth'
import { useSellersStore } from '~/store/sellers'

export const useItemsStore = defineStore('items', () => {
    const items = ref<Item[]>([])
    const isLoading = ref(false)

    const { encodeCredentials } = useAuthStore()

    const getItems = async () => {
        try {
            const access = encodeCredentials()
            const data = await $fetch('api/items', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Basic ${access}`,
                },
            })
            items.value = data as Item[]
            console.log(items.value)
        } catch (error) {
            console.error('Error fetching items:', error)
        }
    }

    const createItem = async ({ name, description, price, sellerId }: Item) => {
        isLoading.value = true
        try {
            const access = encodeCredentials()
            const item: Item = {
                name,
                description,
                price,
                sellerId,
            }

            const data = await $fetch<Item>('api/items', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization: `Basic ${access}`,
                },
                body: JSON.stringify(item),
            })

            const sellerStore = useSellersStore()

            const seller = sellerStore.sellers.find((s) => s.id === sellerId)
            if (seller) {
                seller.points = seller.points || 0
                seller.points += 5
            }

            items.value.push({ ...data, sellerId })
            isLoading.value = false
        } catch (error) {
            console.error('Error creating item:', error)
        }
    }

    const generateInvoice = (sellerId: number) => {
        debugger
        items.value.forEach((item) => {
            console.log(item)
        })
        const sellerItems = items.value.filter((item) => item.sellerId === sellerId)
        console.table(sellerItems)
    }

    return {
        items,
        getItems,
        createItem,
        isLoading,
        generateInvoice,
    }
})
