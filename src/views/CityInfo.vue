<template>
  <Navbar />
  <div v-if="cityWeather && isLoaded" class="p-4">
    <div class="grid grid-cols-3 gap-4">
      <div class="flex flex-col col-span-2 min-h-screen gap-4">
        <Card class="h-full">
          test
        </Card>
        <Card class="h-full">
          test
        </Card>
      </div>
      <Card class="col-span-1 h-full min-h-screen">
        test
      </Card>
    </div>
  </div>
  <div v-else class="grid items-center text-center min-h-screen">
    <p>Loading data. Please wait...</p>
  </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/weatherStore'
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar/Navbar.vue'
import Card from '@/components/Card/Card.vue'

const weatherStore = useWeatherStore()
const route = useRoute()
const isLoaded = ref(false)

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
    isLoaded.value = true
  } catch (error) {
    // throw an error in case the fethcing is not successful
    console.error('error fetching city weather', cityWeather)
  }
})
</script>