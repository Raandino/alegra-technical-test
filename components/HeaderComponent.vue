<template>
    <header class="w-full h-14 absolute top-0 bg-white z-40 px-4 py-2 flex justify-between">
        <NuxtLink to="/">
            <picture>
                <img
                    :src="logo"
                    alt="Alegra Logo"
                    class="min-w-[40px] lg:min-w-[150px] h-[40px]"
                />
            </picture>
        </NuxtLink>
        <div class="flex gap-2">
            <ShoppingCartComponent />
            <UserBadge />
        </div>
    </header>
</template>

<script setup lang="ts">
import logo from '~/assets/images/alegra_logo.svg'
</script>
