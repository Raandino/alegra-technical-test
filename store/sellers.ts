import { defineStore } from 'pinia'
import type { Seller } from '~/types/sellers'
import base64 from 'base-64'
import { useAuthStore } from '~/store/auth'

export const useSellersStore = defineStore('sellers', () => {
    const sellers = ref<Seller[]>([])
    const token = useCookie('token')

    const getSellers = async () => {
        const { userEmail } = useAuthStore()
        const access = base64.encode(`${userEmail}:${token.value}`)
        const { data, pending, error }: any = await useFetch(`api/sellers`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Basic ${access}`,
                mode: 'no-cors',
            },
        })
        if (data.value) {
            sellers.value = data.value
            console.log(sellers.value)
        }
        if (error.value) {
            console.error('Error fetching sellers:', error.value)
        }
    }

    return {
        sellers,
        getSellers,
    }
})
