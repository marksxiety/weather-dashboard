<template>
    <Modal :isOpen="isModalOpen" title="Register City" @close="closeModal">
        <form @submit.prevent="handleFormSubmit">
            <div class="flex flex-col gap-4">
                <div
                    class="flex items-center rounded-2xl pl-3 w-full bg-white/95 outline outline-1 -outline-offset-1 outline-gray-200 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-400 shadow-sm">
                    <input type="text" name="countryInput" id="countryInput"
                        class="block min-w-0 grow py-2 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none"
                        placeholder="Enter country..." v-model="formInput.country" />
                </div>
                <div
                    class="flex items-center rounded-2xl pl-3 w-full bg-white/95 outline outline-1 -outline-offset-1 outline-gray-200 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-400 shadow-sm">
                    <input type="text" name="cityInputs" id="cityInputs"
                        class="block min-w-0 grow py-2 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none"
                        placeholder="Enter city..." v-model="formInput.city" />
                </div>
            </div>
            <div class="flex justify-end gap-4 mt-6">
                <button type="button"
                    class="bg-gray-100 text-gray-700 text-md rounded-md px-4 py-2 hover:bg-gray-200 transition"
                    @click="closeModal">Cancel</button>
                <button type="submit"
                    class="bg-indigo-600 text-md rounded-md px-4 py-2 text-white hover:bg-indigo-700 transition">Submit</button>
            </div>
        </form>
    </Modal>

    <div
        class="min-h-16 border-b-2 shadow-md flex justify-between gap-4 pb-4 pt-4 pl-6 pr-6 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div class="grid place-content-center font-bold text-2xl text-indigo-700 tracking-wide">
            <h2>CloudSnap</h2>
        </div>
        <div
            class="flex items-center rounded-2xl pl-3 w-1/4 bg-white/95 outline outline-1 -outline-offset-1 outline-gray-200 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-400 shadow-sm">
            <div class="shrink-0 select-none text-base text-gray-500">
                <Icon icon="lucide:search" />
            </div>
            <input type="text" name="search" id="search"
                class="block min-w-0 grow py-2 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none"
                placeholder="Search cities..." v-model="searchValue" @input="handleSearch" />
        </div>
        <div class="flex justify-between gap-4 items-center">
            <NavbarCard @click="openModal">
                <p class="mr-2 ml-2 flex flex-row gap-2 hover:underline cursor-pointer text-indigo-700 font-semibold">
                    <Icon icon="basil:add-outline" width="24" height="24" />Register
                </p>
            </NavbarCard>
            <NavbarCard title="Refresh" @click="handleRefresh">
                <Icon icon="material-symbols:refresh-rounded"
                    class="w-8 h-9 text-indigo-600 hover:text-indigo-800 transition" />
            </NavbarCard>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import NavbarCard from '@/components/Navbar/NavbarCard.vue'
import Modal from '../Modal/Modal.vue'
const searchValue = ref('')

const emit = defineEmits(['search-city', 'refresh-cities', 'search'])
const handleSearch = () => {
    emit('search-city', searchValue.value)
}

const handleRefresh = () => {
    emit('refresh-cities')
}

const isModalOpen = ref(false);
const formInput = ref({
    country: '',
    city: ''
});

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const handleFormSubmit = () => {
    console.log('Form Data:', formInput.value)
    closeModal()
}

</script>
