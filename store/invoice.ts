import { defineStore } from 'pinia'
import type { Invoice } from '~/types/alegra'
import { useAuthStore } from '~/store/auth'

export const useInvoiceStore = defineStore('invoice', () => {
    const invoice = ref<Invoice | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const { encodeCredentials } = useAuthStore()
    const access = encodeCredentials()

    const setInvoice = (data: Invoice) => {
        invoice.value = data
    }

    const clearInvoice = () => {
        invoice.value = null
    }

    const fetchInvoice = async (id: string) => {
        isLoading.value = true
        try {
            const data = await $fetch(`/api/invoices/${id}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Basic ${access}`,
                },
            })

            invoice.value = data as Invoice
        } catch (err) {
            console.error('Error fetching invoice:', err)
            error.value = 'Failed to fetch invoice'
        } finally {
            isLoading.value = false
        }
    }

    const invoiceTotal = computed(() => {
        return invoice.value?.total || 0
    })

    return {
        invoice,
        isLoading,
        error,
        setInvoice,
        clearInvoice,
        fetchInvoice,
        invoiceTotal,
    }
})
