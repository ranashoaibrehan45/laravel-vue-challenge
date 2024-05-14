<script setup>
import { useForm } from "@inertiajs/vue3";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Breadcrum from "@/Components/Breadcrum.vue";

const breadcrum = [
    {
        'text' : 'Home',
        'to' : 'dashboard',
        'disabled' : false
    },
    {
        'text' : 'Create Ticket',
        'to' : ' tickets.create',
        'disabled' : true
    }
];

const priorities = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
};

const statuses = {
    open: 'Open',
    in_progress: 'In Progress',
    closed: 'Closed',
};

const form = useForm({
    title: '',
    description: '',
    priority: 'low',
    status: 'open',
});

function submit() {
    form.post('/tickets', {
        onSuccess: () => form.reset('title', 'description', 'priority', 'status')
    });
}
</script>

<template>
    <AuthenticatedLayout>
        <Breadcrum :items="breadcrum"></Breadcrum>
        <div class="py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="mt-5 md:mt-0 md:col-span-2">
                <form @submit.prevent="submit">
                    <div class="p-6 overflow-hidden bg-gray-800 shadow sm:rounded-md">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6">
                                <label for="title" class="block text-sm font-medium text-gray-300">Title</label>
                                <input type="text" name="title" id="title" v-model="form.title"
                                       class="block w-full mt-1 text-white bg-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <p v-if="form.errors.title" class="text-xs italic text-red-500">{{ form.errors.title }}</p>
                            </div>

                            <div class="col-span-6">
                                <label for="description" class="block text-sm font-medium text-gray-300">Description</label>
                                <textarea id="description" name="description" v-model="form.description"
                                          rows="3"
                                          class="block w-full mt-1 text-white bg-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                                <p v-if="form.errors.description" class="text-xs italic text-red-500">{{ form.errors.description }}</p>
                            </div>

                            <div class="col-span-6">
                                <label for="priority" class="block text-sm font-medium text-gray-300">Priority</label>
                                <select id="priority" name="priority" v-model="form.priority"
                                        class="block w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option v-for="(label, priority) in priorities" :value="priority">{{ label }}</option>
                                </select>
                                <p v-if="form.errors.priority" class="text-xs italic text-red-500">{{ form.errors.priority }}</p>
                            </div>

                            <div class="col-span-6">
                                <label for="status" class="block text-sm font-medium text-gray-300">Status</label>
                                <select id="status" name="status" v-model="form.status"
                                        class="block w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option v-for="(label, status) in statuses" :value="status">{{ label }}</option>
                                </select>
                                <p v-if="form.errors.status" class="text-xs italic text-red-500">{{ form.errors.status }}</p>
                            </div>
                        </div>

                        <div class="py-6 text-right">
                            <button type="submit"
                                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Create Ticket
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
