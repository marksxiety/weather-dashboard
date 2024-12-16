<template>
  <Navbar />
  <div v-if="cityWeather">
    <pre>{{ cityWeather }}</pre>
  </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/weatherStore'
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar/Navbar.vue'

const weatherStore = useWeatherStore()
const route = useRoute()

const cityWeather = computed(() => weatherStore.selectedCityWeather)

// Fetch the weather data for the city when the component is mounted
onMounted(async () => {
  const cityName = route.params.city   // fetch the city in the url (this is the :city in path)
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY // fetch the api key since the process here is to reload the specific city weather
  const country = 'PH' // hardcoded for a now since the default registered cities are in PH (philippines)

  try {
    // fetch the city information
    const weatherData = await weatherStore.loadCityWeather(country, cityName, apiKey)
    // Store the fetched data in the store
    weatherStore.setSelectedCityWeather(weatherData) 
  } catch (error) {
    // throw an error in case the fethcing is not successful
    console.error('error fetching city weather', cityWeather)
  }
})
</script>