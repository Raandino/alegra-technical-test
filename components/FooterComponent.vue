<template>
    <footer
        v-if="!hasTwentyPoints"
        class="absolute bottom-0 flex justify-around w-full items-center px-5 md:px-8 py-5"
    >
        <div
            v-for="(seller, index) in allSellers"
            :key="index"
            class="w-[90px] truncate"
        >
            <span class="text-xs">{{ seller.name }}</span>
            <div class="flex bg-primary-500 shadow-lg rounded-lg p-2 items-center gap-1 justify-center">
                <Icon
                    name="material-symbols:account-circle"
                    class="text-black md:text-2xl shadow-2xl"
                />
                <p>{{ seller.points || 0 }} / {{ pointsToWin }}</p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useSellersStore } from '~/store/sellers'
import { storeToRefs } from 'pinia'

const sellersStore = useSellersStore()

const { allSellers } = storeToRefs(sellersStore)

const pointsToWin = parseInt(useRuntimeConfig().public.pointsToWin as string)

const hasTwentyPoints = computed(() => {
    return allSellers.value.some((seller) => (seller.points ?? 0) >= 20)
})
</script>

<style scoped></style>
