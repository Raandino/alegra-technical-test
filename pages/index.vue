<template>
    <div class="h-full p-4 flex flex-col items-center">
        <div
            :class="`flex flex-col gap-4 md:gap-6 w-full max-w-md transition-all duration-500 ease-in-out ${
                hasSearched ? 'md:mt-8' : ' mt-[20dvh] md:mt-[40vh]'
            }`"
        >
            <h1
                class="text-lg md:text-4xl text-center font-bold text-neutral-50 font-inter transition-opacity duration-500"
            >
                <span v-if="!hasSearched">
                    Vendedores <br class="hidden md:block" />
                    ¡a correr!</span
                >
                <span v-else>
                    Busca tu imagen <br class="hidden md:block" />
                    favorita!
                </span>
            </h1>
            <SearchBarComponent
                :query="query"
                :has-searched="hasSearched"
                :loading="loading"
                @update:query="query = $event"
            />
        </div>
        <div
            v-if="hasSearched"
            class="w-full max-w-6xl mt-5 md:mt-12 grid grid-cols-2 md:grid-cols-3 gap-4"
        >
            <div
                v-if="loading"
                v-for="(seller, index) in allSellers"
                :key="index"
                class="w-full h-[132px] md:h-[300px] bg-gray-300 rounded-lg animate-pulse"
            />

            <CardComponent
                :is-loading="loading"
                :images="images"
                :all-sellers="allSellers"
                :handle-click="handleClick"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSellersStore } from '~/store/sellers'
import { useItemsStore } from '~/store/items'
import _ from 'lodash'
import type { Photo, FetchImagesResponse } from '~/types/pexels'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const sellersStore = useSellersStore()

const { allSellers } = storeToRefs(sellersStore)

const { createItem } = useItemsStore()

const query = ref('')
const images = ref<Photo[]>([])
const loading = ref(false)
const hasSearched = computed(() => query.value.length > 0)

const handleClick = async (name: string, price: number, description: string, sellerId: number) => {
    const itemToCreate = {
        name,
        price: [{ price }],
        description,
        sellerId,
    }
    try {
        await createItem(itemToCreate)
        console.log('Item created successfully')
        query.value = ''
    } catch (error) {
        console.error(error)
    }
}

const fetchImages = async (searchQuery: string, numImages: number) => {
    try {
        loading.value = true

        const { data } = await useFetch<FetchImagesResponse>('https://api.pexels.com/v1/search', {
            params: {
                query: searchQuery,
                per_page: numImages,
                page: 1,
                locale: 'es-ES',
                orientation: 'landscape',
            },
            headers: {
                Authorization: `${useRuntimeConfig().public.pexelsApi}`,
            },
        })
        if (data.value && data.value.photos) {
            images.value = data.value.photos.map((photo) => ({
                id: photo.id,
                url: photo.src?.medium,
                alt: photo.alt,
                photographer: photo.photographer,
            }))
        }
    } catch (error) {
        console.error('Error fetching images:', error)
    } finally {
        loading.value = false
    }
}

const debouncedFetchImages = _.debounce((newQuery, numImages) => {
    if (newQuery) {
        fetchImages(newQuery, numImages)
    } else {
        images.value = []
    }
}, 1000)

onMounted(async () => {
    await sellersStore.fetchSellers()
    watch(query, () => {
        loading.value = true
        debouncedFetchImages(query.value, allSellers.value.length)
    })

    watch(
        allSellers,
        (newSellers) => {
            newSellers.forEach((seller) => {
                if (seller.points && seller.points >= 20) {
                    router.push('/checkout')
                }
            })
        },
        { deep: true }
    )
})
</script>

<style scoped>
.image-list-enter-active,
.image-list-leave-active {
    transition: all 0.5s ease;
}
.image-list-enter-from,
.image-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.image-list-move {
    transition: transform 0.5s ease;
}
.image-list-leave-active {
    transition-delay: 0.5s;
}
</style>
