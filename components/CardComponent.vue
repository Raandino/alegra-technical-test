<template>
    <article
        v-if="!isLoading && findResults"
        v-for="(image, index) in images"
        :key="`loaded-${index}`"
        class="relative flex flex-col justify-end overflow-hidden rounded-2xl px-5 pb-5 pt-28 w-full mx-auto duration-300 hover:scale-105 active:scale-110 h-[180px] sm:h-[200] md:h-[300px] shadow-md cursor-pointer"
        @click="
            handleClick(
                `Fotografia por ${image.photographer}`,
                generateRandomPrice(),
                image.alt || 'Imagen de Pexels',
                allSellers[index].id
            )
        "
    >
        <img
            class="absolute inset-0 h-full w-full object-cover"
            :src="image.url"
            :alt="image.alt || 'Texto Alternativo Imagen'"
        />
    
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60"></div>

        <h3 class="z-10 mt-3 text-base md:text-xl font-roboto font-semibold text-white leading-5">
            {{ allSellers[index].name }}
        </h3>
        <footer class="flex gap-1 left-0  bottom-2 z-10 w-full items-center mt-1">
            <Icon
                name="material-symbols:account-circle"
                class="text-white md:text-2xl shadow-2xl"
            />

            <div class="w-full bg-white rounded-full h-2">
            <div class="bg-primary-500 h-2 rounded-full w-0" :style="`width: ${progressBar(allSellers[index].points!)}%`"></div>
            </div>

            <Icon
                name="material-symbols:flag"
                class="text-white md:text-2xl "
            />
        </footer>
        <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300 hidden md:block">
            {{ allSellers[index].observations || 'No description available' }}
        </div>
    </article>
    <h3 class="text-center col-span-3" v-if="!findResults && !isLoading ">No hay suficientes resultado, intenta otra busqueda &#128577</h3>
</template>

<script setup lang="ts">
import type { Photo } from '~/types/pexels'
import type { Seller } from '~/types/alegra'

const props = defineProps<{
    images: Photo[]
    allSellers: Seller[]
    isLoading: boolean
    handleClick: (name: string, price: number, description: string, sellerId: number) => void
}>()

const findResults = computed(() => {
    return props.images.length >= 3
})

const progressBar = (points: number) => {
    if (points == 0){ return '0'}
    const percentage = Math.round((points / 20) * 100);
    return `${percentage}`;
}

onMounted(()=>{

})

const generateRandomPrice = () => {
    return Math.floor(Math.random() * (200 - 100 + 1)) + 100
}
</script>

<style scoped></style>
