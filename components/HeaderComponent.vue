<template>
    <header class="w-full h-14 absolute top-0 bg-white z-50 px-4 py-2 flex justify-between">
        <picture>
            <source
                media="(min-width: 1024px)"
                :srcset="logo"
            />
            <img
                :src="logoSmall"
                alt="Alegra Logo"
                class="min-w-[40px] lg:min-w-[150px] h-[40px]"
            />
        </picture>
        <UserBadge />
    </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import logo from '~/assets/images/alegra_logo.svg'
import logoSmall from '~/assets/images/alegra_logo_small.svg'

const { logUserOut } = useAuthStore()
</script>

<style></style>
