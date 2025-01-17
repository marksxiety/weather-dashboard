<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <!-- Modal Header -->
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold">{{ title }}</h3>
                <button class="text-gray-500 hover:text-gray-700 p-2 text-2xl font-bold" @click="closeModal">×</button>
            </div>

            <!-- Modal Body -->
            <slot></slot>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        default: 'Title',
    },
})

const emit = defineEmits(['close'])

const closeModal = () => {
    emit('close')
}
</script>