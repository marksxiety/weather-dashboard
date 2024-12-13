<template>
  <Navbar/>
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-4">City Info: {{ city || 'Not Found' }}</h1>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import Navbar from '@/components/Navbar/Navbar.vue';
  
  const route = useRoute();
  
  // Access the `city` parameter from the route
  const city = route.params.city;
  </script>
  