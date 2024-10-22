<template>
    <div class="flex relative">
        <input
            type="text"
            :value="query"
            @input="updateQuery"
            placeholder="Busca Imagenes..."
            :class="`w-full p-3 md:p-4 rounded-full shadow-lg text-base md:text-lg duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 font-roboto text-neutral-40 ${
                hasSearched && query != '' ? 'ring-primary-500 ring-2 ' : ''
            }`"
        />

        <div
            class="bg-primary-500 size-7 md:size-10 absolute right-3 top-1/2 -translate-y-1/2 rounded-full grid place-content-center"
        >
            <Icon
                v-if="loading && hasSearched"
                name="svg-spinners:90-ring-with-bg"
                class="text-white md:text-2xl"
            />
            <Icon
                v-else
                name="mdi:magnify"
                class="bg-white text-xl md:text-2xl"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    query: String,
    hasSearched: Boolean,
    loading: Boolean,
})

const emit = defineEmits(['update:query'])

const updateQuery = (event: Event) => {
    const newQuery = (event.target as HTMLInputElement).value
    emit('update:query', newQuery)
}
</script>

<style scoped></style>
