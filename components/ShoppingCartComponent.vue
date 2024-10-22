<template>
    <div class="bg-white rounded-lg flex justify-center items-center flex-col relative">
        <Icon
            name="mdi:shopping-outline"
            class="text-[#4b5563] text-[30px]"
        />
        <span
            :class="`size-4 text-xs grid place-content-center bg-red-600 rounded-full absolute bottom-0.5 right-0 text-white  duration-300 ${
                items.length > 0 ? 'opacity-100' : 'opacity-0'
            }`"
        >
            {{ items.length }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { useItemsStore } from '~/store/items'
import { storeToRefs } from 'pinia'

const itemsStore = useItemsStore()

const { items } = storeToRefs(itemsStore)
</script>
