import { defineStore } from 'pinia'
import type { Seller } from '~/types/alegra'
import { useAuthStore } from '~/store/auth'

export const useSellersStore = defineStore('sellers', () => {
    const sellers = ref<Seller[]>([])
    const { encodeCredentials } = useAuthStore()

    const fetchSellers = async () => {
        try {
            const access = encodeCredentials()
            const data = await $fetch<Seller[]>('api/sellers', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Basic ${access}`,
                },
            })

            const activeSellers = data.filter((seller) => {
                return seller.status == 'active'
            })
            sellers.value = activeSellers
            console.log(sellers.value)
        } catch (error) {
            console.error('Error fetching sellers:', error)
        }
    }
    const allSellers = computed(() => sellers.value)

    return {
        sellers,
        fetchSellers,
        allSellers,
    }
})
