import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookie } from 'nuxt/app'

interface UserPayloadInterface {
    email: string
    password: string
}

export const useAuthStore = defineStore('auth', () => {
    const loading = ref(false)
    const token = useCookie('token')
    const authenticated = useCookie('authenticated', { default: () => false })
    const company = useCookie('company', { default: () => '' })
    const userEmail = useCookie('userEmail', { default: () => '' })

    const authenticateUser = async ({ email, password }: UserPayloadInterface) => {
        loading.value = true

        const { data, pending }: any = await useFetch(`api/login?fields=user,company,company_dictionary,origin`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: {
                email,
                password,
            },
        })
        loading.value = false

        if (data.value) {
            userEmail.value = data?.value?.user?.email
            token.value = data?.value?.token
            authenticated.value = true
            company.value = data?.value?.company?.name
        }
    }

    const logUserOut = () => {
        token.value = null
        authenticated.value = false
        loading.value = false
        company.value = ''
        userEmail.value = ''

        navigateTo('/login')
    }

    return {
        authenticated,
        loading,
        company,
        authenticateUser,
        logUserOut,
        userEmail,
    }
})
