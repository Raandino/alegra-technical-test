import { defineStore } from 'pinia'
import base64 from 'base-64'
import type { AuthResponse } from '~/types/alegra'

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
        try {
            loading.value = true

            const data: AuthResponse = await $fetch('api/login?fields=user,company,company_dictionary,origin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    email,
                    password,
                },
            })

            if (data) {
                userEmail.value = data?.user?.email
                token.value = data?.token
                authenticated.value = true
                company.value = data?.company?.name
            }
        } catch (error) {
            console.error('Error authenticating user:', error)
        } finally {
            loading.value = false
        }
    }
    const setAuthenticated = (newState: boolean) => {
        authenticated.value = newState
    }

    const encodeCredentials = () => {
        const { userEmail, token } = useAuthStore()
        return base64.encode(`${userEmail}:${token}`)
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
        token,
        encodeCredentials,
        setAuthenticated,
    }
})
