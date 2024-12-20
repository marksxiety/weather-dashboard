<template>
    <div class="min-h-14 border-b-2 shadow-sm flex justify-between gap-4 pb-4 pt-4 pl-6 pr-6">
        <div class="grid place-content-center font-semibold">
            <h2>CloudSnap</h2>
        </div>
        <div
            class="flex items-center rounded-2xl pl-3 w-1/4 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-primary">
            <div class="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                <Icon icon="lucide:search" />
            </div>
            <input type="text" name="search" id="search"
                class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                placeholder="Search cities..." v-model="searchValue" @input="handleSearch" />
        </div>
        <div class="flex justify-between gap-4 items-center">
            <NavbarCard>
                <p class="mr-2 ml-2 hover:underline cursor-pointer">Settings</p>
            </NavbarCard>
            <NavbarCard>
                <p class="mr-2 ml-2 hover:underline cursor-pointer">Favourites</p>
            </NavbarCard>
            <NavbarCard>
                <Icon icon="material-symbols:refresh-rounded" class="w-8 h-9"/>
            </NavbarCard>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import NavbarCard from '@/components/Navbar/NavbarCard.vue'
const searchValue = ref('')

const emit = defineEmits(['search-city'])
const handleSearch = () => {
    emit('search-city', searchValue.value)
}
</script>
