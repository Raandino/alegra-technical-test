<template>
    <section class="bg-white px-4 md:px-10 py-10 flex flex-col items-center m-5 rounded-lg shadow-lg">
        <header class="font-inter text-xl text-neutral-40 flex justify-between w-full">
            <p>{{ company }}</p>
            <p class="text-base">No. {{ invoice?.id }}</p>
        </header>
        <main class="mt-3 md:mt-10 w-full">
            <div class="flex justify-between w-full mt-2 md:mt-0">
                <p class="text-neutral-30 text-xs md:text-sm font-roboto">
                    Cliente:
                    <a
                        class="font-bold text-primary-600 underline"
                        :href="`https://app.alegra.com/client/view/id/${invoice?.client.identification}`"
                        >{{ invoice?.client.name }}</a
                    >
                </p>
                <p class="text-neutral-30 text-xs md:text-sm font-roboto mt-2 hidden md:flex">
                    Creación: {{ invoice?.date }}
                </p>
            </div>
            <div class="flex justify-between w-full mt-2 md:mt-0">
                <p class="text-neutral-30 text-xs md:text-sm font-roboto">RFC: {{ invoice?.client.identification }}</p>
                <p class="text-neutral-30 text-xs md:text-sm font-roboto mt-2 hidden md:flex">
                    Vencimiento: {{ invoice?.dueDate }}
                </p>
            </div>

            <p class="text-neutral-30 text-xs md:text-sm font-roboto mt-2 md:mt-0">
                Vendedor: <strong>{{ invoice?.seller.name }}</strong>
            </p>
            <p class="text-neutral-30 text-xs md:text-sm font-roboto mt-2 flex md:hidden">
                Creación: {{ invoice?.date }}
            </p>
            <p class="text-neutral-30 text-xs md:text-sm font-roboto mt-2 flex md:hidden">
                Vencimiento: {{ invoice?.dueDate }}
            </p>
            <DataTableComponent
                :items="invoice?.items"
                :invoice="invoice!"
            ></DataTableComponent>
        </main>
    </section>
</template>

<script setup lang="ts">
import { useInvoiceStore } from '~/store/invoice'
import { useAuthStore } from '~/store/auth'
import { storeToRefs } from 'pinia'
definePageMeta({
    middleware: 'check-seller-points',
})
const invoiceStore = useInvoiceStore()
const authStore = useAuthStore()
const { invoice } = storeToRefs(invoiceStore)
const { company } = storeToRefs(authStore)
</script>
