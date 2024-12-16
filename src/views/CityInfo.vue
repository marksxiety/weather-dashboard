<template>
  <Navbar />
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">City Info: {{ data?.name || 'Not Found' }}</h1>
    <pre>{{ data }}</pre> 
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Navbar from '@/components/Navbar/Navbar.vue'

const props = defineProps({
  city: String,
  data: Object
})

console.log(props)
</script>