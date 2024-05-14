<script setup>
import { computed, defineEmits } from 'vue';

const props = defineProps({
    totalItems: Number,
    currentPage: Number,
    perPage: Number
});

const emits = defineEmits(['update:currentPage']);

const totalPages = computed(() => {
    return Math.ceil(props.totalItems / props.perPage);
});

function goToPage(page) {
    emits('update:currentPage', page);
}
</script>
<template>
    <div class="flex items-center justify-between mt-4">
        <button
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
            class="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
        >
            Previous
        </button>
        <ul class="flex space-x-1">
            <li
                v-for="page in totalPages"
                :key="page"
                class="px-4 py-2 leading-tight text-gray-400 bg-gray-800 border border-gray-600 hover:bg-gray-700 hover:text-white"
                :class="{ 'bg-blue-600 text-white': page === currentPage }"
            >
                <a @click="goToPage(page)" class="cursor-pointer">{{ page }}</a>
            </li>
        </ul>
        <button
            disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
            class="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
        >
            Next
        </button>
    </div>
</template>
