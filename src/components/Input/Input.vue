<template>
    <div
        class="flex items-center rounded-2xl pl-3 w-1/4 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-primary">
        <div class="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
            <Icon icon="lucide:search" />
        </div>
        <input type="text" name="search" id="search"
            class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
            placeholder="Search cities..." v-model="searchValue" @input="handleSearch" />
    </div>
</template>

<script setup>

const emit = defineEmits(['search'])

const handleSearch = () => {
    emit('search')
}

</script>