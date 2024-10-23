<template>
    <div class="bg-white rounded-lg mt-4 max-h-[300px] overflow-y-scroll">
        <div>
            <table class="w-full">
                <thead class="hidden md:table-header-group">
                    <tr>
                        <th
                            v-for="header in headers"
                            :key="header"
                            class="px-2 py-3 text-left text-xs lg:text-sm font-medium text-neutral-40 uppercase tracking-wider bg-primary-500"
                        >
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in items"
                        :key="index"
                        class="md:table-row flex flex-col mb-4 md:mb-0 border-b md:border-b-0"
                    >
                        <td class="px-0 md:px-2 py-2 md:py-4 text-start flex justify-between md:table-cell">
                            <span class="md:hidden text-xs font-medium mr-2">Producto:</span>
                            <a
                                :href="`https://app.alegra.com/item/view/id/${item.id}`"
                                class="text-primary-600 underline text-xs lg:text-sm"
                                >{{ item.name }}</a
                            >
                        </td>
                        <td class="px-0 md:px-2 py-2 md:py-4 text-start flex justify-between md:table-cell">
                            <span class="md:hidden text-xs font-medium mr-2">Precio:</span>
                            <span class="text-xs lg:text-sm text-gray-900 font-mono">
                                {{ formatCurrency(item.price) }}
                            </span>
                        </td>
                        <td class="px-0 md:px-2 py-2 md:py-4 text-start flex justify-between md:table-cell">
                            <span class="md:hidden text-xs font-medium mr-2">Descripción:</span>
                            <span class="text-xs lg:text-sm text-gray-500">{{ item.description }}</span>
                        </td>
                        <td class="px-0 md:px-2 py-2 md:py-4 text-start flex justify-between md:table-cell">
                            <span class="md:hidden text-xs font-medium mr-2">Cantidad:</span>
                            <span class="text-xs lg:text-sm text-gray-900 font-mono">1</span>
                        </td>
                        <td class="px-0 md:px-2 py-2 md:py-4 text-start md:text-end flex justify-between md:table-cell">
                            <span class="md:hidden text-xs font-medium mr-2">Total:</span>
                            <span class="text-xs lg:text-sm text-gray-900 font-mono">
                                {{ formatCurrency(item.price) }}
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tfoot class="bg-gray-50">
                    <tr class="flex flex-col md:table-row">
                        <td
                            colspan="4"
                            class="px-0 md:px-2 py-3 text-start md:text-end text-sm font-medium text-gray-500"
                        >
                            Total:
                        </td>
                        <td
                            class="px-0 md:px-2 py-3 whitespace-nowrap text-start md:text-end text-sm text-gray-900 font-mono font-bold"
                        >
                            {{ formatCurrency(invoice?.subtotal ?? 0) }}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <div class="bg-gray-50 px-0 md:px-2 py-4">
        <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
                <p class="text-gray-600">Subtotal:</p>
                <p class="text-gray-600">Descuento:</p>
                <p class="text-gray-600">Subtotal con descuento:</p>
                <p class="font-medium text-gray-800 mt-2">Total:</p>
            </div>
            <div class="text-right font-mono">
                <p class="text-gray-800">{{ formatCurrency(invoice?.subtotal ?? 0) }}</p>
                <p class="text-gray-800">{{ formatCurrency(invoice?.discount ?? 0) }}</p>
                <p class="text-gray-800">{{ formatCurrency(invoice?.total ?? 0) }}</p>
                <hr class="my-2 border-gray-300" />
                <p class="font-medium text-gray-800">{{ formatCurrency(invoice?.balance ?? 0) }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Invoice, ItemFromInvoice } from '~/types/alegra'

const props = defineProps({
    items: Array<ItemFromInvoice>,
    invoice: Object as () => Invoice,
})

const headers = ['Producto', 'Precio', 'Descripción', 'Cantidad', 'Total']

const formatCurrency = (value: number | undefined) => {
    if (value) {
        return new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(value)
    }
    return '0.00'
}
</script>
