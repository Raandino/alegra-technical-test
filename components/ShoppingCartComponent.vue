<template>
    <div class="bg-white rounded-lg flex justify-center items-center flex-col">
        <Icon
            name="mdi:shopping-outline"
            class="text-[#4b5563] text-2xl"
        />
    </div>
</template>

<script setup lang="ts">
import { useItemsStore } from '~/store/items'
import { storeToRefs } from 'pinia'

const itemsStore = useItemsStore()

const { isLoading } = storeToRefs(itemsStore)
</script>
