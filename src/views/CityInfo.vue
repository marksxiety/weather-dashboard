<template>
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-4">City Info: {{ cityInfo?.cityname || 'Not Found' }}</h1>
      <div v-if="cityInfo" class="grid grid-cols-1 gap-4">
        <div class="flex flex-col">
          <p><strong>Temperature:</strong> {{ cityInfo.temperature }}°C</p>
          <p><strong>Description:</strong> {{ cityInfo.description }}</p>
          <p><strong>Humidity:</strong> {{ cityInfo.humidity }}%</p>
          <p><strong>Feels Like:</strong> {{ cityInfo.feel }}°C</p>
          <p><strong>Wind Speed:</strong> {{ cityInfo.windspeed }} km/h</p>
          <p><strong>Pressure:</strong> {{ cityInfo.pressure }}</p>
        </div>
      </div>
      <div v-else>
        <p>City data not found.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { useWeatherStore } from '@/stores/weatherStore';
  
  const route = useRoute();
  const weatherStore = useWeatherStore();
  
  // Access the `city` parameter from the route
  const city = route.params.city;
  
  // Find the matching city data in the Pinia store
  const cityInfo = weatherStore.data.find((item) => item.cityparameter === city);
  </script>
  