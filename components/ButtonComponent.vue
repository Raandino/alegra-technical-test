<template>
    <button
        :class="`bg-primary-600 active:scale-105 duration-300 rounded-xl hover:bg-primary-900 flex gap-2 items-center justify-center p-3 outline-primary-200 ${
            isLoading ? '!bg-primary-300' : ''
        }`"
    >
        <Icon
            v-if="leftIcon"
            :name="`uil:${leftIcon}`"
            class="text-white"
        />

        <p
            v-if="!isLoading"
            class="text-white font-inter text-base"
        >
            {{ text }}
        </p>
        <Icon
            v-if="isLoading"
            :name="`uil:circle`"
            class="text-white animate-ping h-6"
        />
        <Icon
            v-if="rightIcon"
            :name="`uil:${rightIcon}`"
            class="text-white"
        />
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    text: string
    leftIcon?: string
    rightIcon?: string
    isLoading?: boolean
}>()
</script>

<style scoped></style>
