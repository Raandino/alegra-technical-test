<template>
    <main class="w-[364px] flex flex-col items-center">
        <img
            :src="logo"
            alt="Alegra Logo"
        />
        <p class="font-inter text-xl text-neutral-50 font-semibold mt-2">Ingresa a tu cuenta</p>
        <p class="font-inter text-sm text-neutral-50 font-normal">Sigue ganando tiempo y tranquilidad</p>

        <form
            class="flex flex-col gap-6 z-10 mt-5 w-full"
            @submit.prevent="logIn(formData)"
        >
            <div class="flex flex-col gap-2">
                <label
                    class="text-neutral-40 font-inter text-sm"
                    for="email"
                >
                    Correo electrónico
                </label>
                <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    required
                    :class="inputClasses"
                    placeholder="Indica tu correo electrónico"
                />
            </div>
            <div class="flex flex-col gap-2">
                <label
                    class="text-neutral-40 font-inter text-sm"
                    for="email"
                >
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    v-model="formData.password"
                    required
                    :class="inputClasses"
                    placeholder="Escribe tu contraseña"
                />
            </div>

            <ButtonComponent
                text="Ingresar"
                :is-loading="loading"
            />
        </form>
    </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
const { loading } = storeToRefs(useAuthStore())

import logo from '~/assets/images/alegra_logo.svg'
const props = defineProps<{
    logIn: (user: { email: string; password: string }) => void
}>()

const formData = ref({
    email: 'rodolfo@raandino.dev',
    password: 'AlegraDemo2024!',
})

const inputClasses =
    'border-[1px] bg-white hover:bg-white active:bg-white outline-primary-600 text-base md:text-base ring-0 active:outline-primary-600 px-3 py-2 rounded-xl'
</script>

<style scoped></style>
