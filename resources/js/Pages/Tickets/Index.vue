<script setup>
import {computed, ref, watch} from "vue";
import { Link } from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { useDate } from '@/composable/dates.js';
import { router } from "@inertiajs/vue3";
import Breadcrum from "@/Components/Breadcrum.vue";

const props = defineProps({
    tickets: Object,
})

const breadcrum = [
    {
        'text' : 'home',
        'to' : 'dashboard',
        'disabled' : false
    },
    {
        'text' : 'tickets',
        'to' : 'tickets.index',
        'disabled' : true
    }
];

const search = ref('')
const min_date = ref('')
const max_date = ref('')

watch(search, (value) => {
    router.get("/tickets", { search: value }, { preserveState: true });
});
watch(min_date, (value) => {
    router.get("/tickets", { min_date: value }, { preserveState: true });
});
watch(max_date, (value) => {
    router.get("/tickets", { max_date: value }, { preserveState: true });
});
</script>

<template>
    <AuthenticatedLayout>
        <Breadcrum :items="breadcrum"></Breadcrum>
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="flex items-center justify-between py-6">
                <h1 class="text-2xl font-semibold text-gray-100">Tickets</h1>
                <a href="/tickets/create"
                   class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create Ticket
                </a>
            </div>
            <div class="mb-5 ml-5">
                <input type="text" v-model="search" />
                <input type="date" v-model="min_date" />
                <input type="date" v-model="max_date" />
            </div>
            <div class="overflow-x-auto shadow sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-700">
                    <thead class="">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                            Submitted
                        </th>
                        <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                            Title
                        </th>
                        <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                            User
                        </th>
                        <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                            Priority
                        </th>
                        <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                            &nbsp;
                        </th>

                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-700">
                    <tr v-for="ticket in tickets.data" :key="ticket.id">
                        <td class="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">{{ ticket.id }}</td>
                        <td class="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">{{ useDate(ticket.created_at) }}</td>
                        <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{{ ticket.title }}</td>
                        <td class="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">{{ ticket.user.name }}</td>
                        <td class="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">{{ ticket.priority }}</td>
                        <td class="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">{{ ticket.status }}</td>
                        <td class="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
                            <Link :href="route('tickets.show', [ticket.id])">
                                View
                            </Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="px-1 pt-10">
                    <Link
                        v-for=" (link, index) in tickets.links"
                        :key="index"
                        :href="link.url"
                        class="px-4 py-2 leading-tight text-gray-400 bg-gray-800 border border-gray-600 hover:bg-gray-700 hover:text-white"
                        :class="{ 'bg-blue-600 text-white': link.active }"
                        v-html="link.label"
                    />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>

</template>

