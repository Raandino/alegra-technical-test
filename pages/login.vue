<template>
    <main class="grid place-content-center h-full">
        <LoginForm :log-in="login" />
    </main>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth' // import the auth store we just created

const { authenticateUser } = useAuthStore() // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()) // make authenticated state reactive with storeToRefs

const router = useRouter()

const login = async (user: { email: string; password: string }) => {
    await authenticateUser(user) // call authenticateUser and pass the user object
    // redirect to homepage if user is authenticated
    if (authenticated) {
        router.push('/')
    }
}
</script>
