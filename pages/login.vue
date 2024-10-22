<template>
    <main class="grid place-content-center h-full">
        <LoginForm :log-in="login" />
    </main>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'
const { authenticateUser } = useAuthStore()

const { authenticated } = storeToRefs(useAuthStore())

const router = useRouter()

const login = async (user: { email: string; password: string }) => {
    await authenticateUser(user)
    if (authenticated) {
        router.push('/')
    }
}
</script>
