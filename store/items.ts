import { defineStore } from 'pinia'
import type { Item, Invoice } from '~/types/alegra'
import { useAuthStore } from '~/store/auth'
import { useSellersStore } from '~/store/sellers'
import { useInvoiceStore } from '~/store/invoice'

export const useItemsStore = defineStore('items', () => {
    const items = ref<Item[]>([])
    const isLoading = ref(false)
    const pointsIncrements = parseInt(useRuntimeConfig().public.incrementPerPoints as string)

    const { encodeCredentials } = useAuthStore()
    const { setInvoice } = useInvoiceStore()
    const access = encodeCredentials()

    const getItems = async () => {
        try {
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
                seller.points += pointsIncrements
            }

            items.value.push({ ...data, sellerId })
            isLoading.value = false
        } catch (error) {
            console.error('Error creating item:', error)
        }
    }

    const createInvoice = async (clientId: number, sellerId: number, items: Item[], dueDate: string, date: string) => {
        isLoading.value = true
        try {
            const access = encodeCredentials()

            const invoiceItems = items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price![0].price,
                quantity: 1,
                description: item.description,
            }))

            const invoiceData = {
                client: {
                    id: clientId,
                },
                status: 'open',
                items: invoiceItems,
                dueDate: dueDate,
                date: date,
                seller: sellerId,
            }

            const data = await $fetch('api/invoices', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization: `Basic ${access}`,
                },
                body: JSON.stringify(invoiceData),
            })

            console.log('Invoice created:', data)
            isLoading.value = false
            setInvoice(data as Invoice)
        } catch (error) {
            console.error('Error creating invoice:', error)
            isLoading.value = false
            throw error
        }
    }

    return {
        items,
        getItems,
        createItem,
        isLoading,
        createInvoice,
    }
})
