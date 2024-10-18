<template>
    <main :class="`overflow-hidden relative w-full h-dvh md:h-screen  ${authenticated ? 'bg-neutral-10' : 'bg-white'}`">
        <HeaderComponent v-if="authenticated" />

        <div class="pt-[96px] md:pt-[104px] lg:pt-[110px]">
            <slot />
        </div>
    </main>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useAuthStore } from '~/store/auth'

const { authenticated } = storeToRefs(useAuthStore())
</script>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
