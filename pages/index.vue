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
            <div class="flex relative">
                <input
                    v-model="query"
                    type="text"
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

            <article
                v-else
                v-for="(image, index) in images"
                :key="`loaded-${index}`"
                class="relative flex flex-col justify-end overflow-hidden rounded-2xl px-5 pb-5 pt-28 w-full mx-auto duration-300 hover:scale-105 active:scale-110 h-24 md:h-[300px] shadow-md cursor-pointer"
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

                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 class="z-10 mt-3 text-base md:text-xl font-roboto font-semibold text-white leading-5">
                    {{ allSellers[index].name }}
                </h3>
                <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    {{ allSellers[index].observations || 'No description available' }}
                </div>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSellersStore } from '~/store/sellers'
import { useItemsStore } from '~/store/items'
import { debounce } from 'lodash'
import { createClient } from 'pexels'
import type { Photo } from '~/types/pexels'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const pexelsApi = useRuntimeConfig().public.pexelsApi as string
const client = createClient(pexelsApi)

const sellersStore = useSellersStore()

const { allSellers } = storeToRefs(sellersStore)

const { createItem } = useItemsStore()

const query = ref('')
const images = ref<Photo[]>([])
const loading = ref(false)
const hasSearched = computed(() => query.value.length > 0)

const generateRandomPrice = () => {
    return Math.floor(Math.random() * (200 - 100 + 1)) + 100
}
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

//TODO: Add empty state when there are no images
const fetchImages = async (searchQuery: string, numImages: number) => {
    loading.value = true
    try {
        const response = await client.photos.search({
            query: searchQuery,
            per_page: numImages,
            page: 1,
            locale: 'es-ES',
            orientation: 'landscape',
        })

        if ('photos' in response) {
            images.value = response.photos.map((photo) => ({
                id: photo.id,
                url: photo.src.medium,
                alt: photo.alt,
                photographer: photo.photographer,
            }))
        } else {
            console.error('Error response from Pexels:', response)
            images.value = []
        }
    } catch (error) {
        console.error('Error fetching images:', error)
        images.value = []
    } finally {
        loading.value = false
    }
}

const debouncedFetchImages = debounce((newQuery, numImages) => {
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
