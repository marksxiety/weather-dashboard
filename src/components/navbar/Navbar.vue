<template>
    <div class="min-h-14 border-b-2 shadow-sm flex justify-between gap-2 ml-4 mr-4 p-2">
       <div class="grid place-content-center font-semibold">
        <h2>CloudSnap</h2>
       </div>
        <div>
            <div class="mt-2">
                <div
                    class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div class="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"><Icon icon="lucide:search" /></div>
                    <input type="text" name="price" id="price"
                        class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        placeholder="cities here..." />
                </div>
            </div>
        </div>
        <div class="flex justify-between gap-2 items-center">
            <NavbarCard><Icon icon="solar:settings-outline" class="w-8 h-6"/></NavbarCard>
            <NavbarCard><Icon icon="icon-park-outline:add" class="w-8 h-6"/></NavbarCard>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import NavbarCard from './NavbarCard.vue'
</script>