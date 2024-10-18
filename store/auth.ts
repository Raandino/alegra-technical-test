import { defineStore } from 'pinia'
import { navigateTo } from 'nuxt/app'

interface UserPayloadInterface {
    email: string
    password: string
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
        company: '',
    }),
    actions: {
        async authenticateUser({ email, password }: UserPayloadInterface) {
            this.loading = true
            // useFetch from nuxt 3
            const { data, pending }: any = await useFetch(
                'https://api.alegra.com/api/v1/login?fields=user,company,company_dictionary,origin',
                {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: {
                        email,
                        password,
                    },
                }
            )
            this.loading = pending

            if (data.value) {
                const token = useCookie('token')
                token.value = data?.value?.token
                this.authenticated = true
                this.company = data?.value?.company?.name
            }
        },
        logUserOut() {
            const token = useCookie('token')

            // Clear authentication and token
            this.authenticated = false
            token.value = null

            navigateTo('/login')
        },
    },
})
