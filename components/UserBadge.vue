<template>
    <section
        ref="dropdownContainer"
        class="relative"
    >
        <div
            class="flex gap-2 h-full border-[1px] p-2 rounded-md cursor-pointer active:scale-105 duration-300"
            @click="toggleDropdown"
        >
            <p class="font-roboto text-base text-gray-500">Rodolfo S.A</p>
            <span class="size-6 bg-indigo-200 grid place-content-center rounded-full font-inter text-xs">R</span>
        </div>

        <div
            v-if="isDropdownOpen"
            class="absolute mt-2 right-0 bg-white border rounded-2xl shadow-lg flex flex-col w-72"
        >
            <p class="text-xs px-4 font-inter py-4 text-neutral-500 border-b border-gray-300">rodolfo@raandino.dev</p>

            <nav class="flex flex-col">
                <a
                    href="https://mi.alegra.com/consumption"
                    class="flex justify-between items-center hover:bg-[#f5f5f5] px-4 py-2 duration-300"
                    target="_blank"
                >
                    <div class="flex gap-2 items-center h-full">
                        <Icon
                            name="mdi:chart-bar"
                            class="text-[#6b7280]"
                        />
                        <p class="text-sm font-roboto font-light text-neutral-40">Consumo del plan</p>
                    </div>
                    <Icon
                        name="material-symbols-light:arrow-insert-rounded"
                        class="text-[#6b7280] rotate-90"
                    />
                </a>
                <a
                    href="https://mi.alegra.com/profile"
                    target="_blank"
                    class="flex justify-between items-center hover:bg-[#f5f5f5] px-4 py-2 duration-300"
                >
                    <div class="flex gap-2 items-center h-full">
                        <Icon
                            name="mdi:account"
                            class="text-[#6b7280]"
                        />
                        <p class="text-sm font-roboto font-light text-neutral-40">Mi Perfil</p>
                    </div>
                    <Icon
                        name="material-symbols-light:arrow-insert-rounded"
                        class="text-[#6b7280] rotate-90"
                    />
                </a>
                <a
                    href="https://mi.alegra.com/security"
                    target="_blank"
                    class="flex justify-between items-center hover:bg-[#f5f5f5] px-4 py-2 duration-300"
                >
                    <div class="flex gap-2 items-center h-full">
                        <Icon
                            name="mdi:lock"
                            class="text-[#6b7280]"
                        />
                        <p class="text-sm font-roboto font-light text-neutral-40">Seguridad</p>
                    </div>
                    <Icon
                        name="material-symbols-light:arrow-insert-rounded"
                        class="text-[#6b7280] rotate-90"
                    />
                </a>
            </nav>

            <button
                @click="logUserOut"
                class="flex gap-2 px-4 items-center border-t border-gray-300 hover:bg-gray-100 duration-300"
            >
                <Icon
                    name="mdi:login"
                    class="text-gray-500"
                />
                <p class="text-sm font-roboto font-light py-3 text-neutral-40">Cerrar Sesión</p>
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '~/store/auth'

const { logUserOut } = useAuthStore()

const isDropdownOpen = ref(false)
const dropdownContainer = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
}
const handleClickOutside = (event: MouseEvent) => {
    if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
        isDropdownOpen.value = false
    }
}
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.text-neutral-500 {
    color: #6b7280;
}
.text-neutral-40 {
    color: #4b5563;
}
.hover-bg-gray-100:hover {
    background-color: #f5f5f5;
}
</style>
