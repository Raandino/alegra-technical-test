<template>
    <header class="w-full h-14 absolute top-0 bg-white z-40 px-4 py-2 flex justify-between">
        <NuxtLink to="/">
            <picture>
                <source
                    media="(min-width: 768px)"
                    :srcset="logo"
                />
                <img
                    :src="logoSmall"
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
import logoSmall from '~/assets/images/alegra_logo_small.svg'
</script>
