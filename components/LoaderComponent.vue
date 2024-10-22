<template>
    <div
        v-if="isLoading"
        class="absolute top-0 w-full h-full bg-black/20 z-50 grid place-content-center text-neutral-50 font-bold font-inter"
    >
        <div class="bg-white px-10 py-5 gap-2 rounded-lg flex justify-center items-center flex-col">
            <p>Agregando Items</p>
            <Icon
                name="svg-spinners:90-ring-with-bg"
                class="text-primary-600 text-3xl"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useItemsStore } from '~/store/items'
import { storeToRefs } from 'pinia'

const itemsStore = useItemsStore()

const { isLoading } = storeToRefs(itemsStore)
</script>
