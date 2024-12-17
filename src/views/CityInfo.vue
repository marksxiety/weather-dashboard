<template>
  <Navbar />
  <div v-if="cityWeather && isLoaded" class="p-4">
    <div class="grid grid-cols-3 gap-4">
      <div class="grid grid-rows-3 col-span-2 min-h-screen gap-4">
        <Card class="h-full row-span-2 flex flex-col">
          <p>{{ cityWeather.name }}</p>
          <!-- coordinates -->
          <p>{{ cityWeather.coord.lat }}</p>
          <p>{{ cityWeather.coord.lon }}</p>

          <!-- main temperatures -->
          <p>{{ cityWeather.main.feels_like }}</p>
          <p>{{ cityWeather.main.grnd_level }}</p>
          <p>{{ cityWeather.main.humidity }}</p>
          <p>{{ cityWeather.main.pressure }}</p>
          <p>{{ cityWeather.main.sea_level }}</p>
          <p>{{ cityWeather.main.temp }}</p>
          <p>{{ cityWeather.main.temp_max }}</p>
          <p>{{ cityWeather.main.temp_min }}</p>

          <!-- sun information -->
          <p>{{ cityWeather.sys.sunrise }}</p>
          <p>{{ cityWeather.sys.sunset }}</p>

          <!-- country information -->
          <p>{{ cityWeather.sys.country }}</p>

          <!-- timezone information -->
          <p>{{ cityWeather.timezone }}</p>

          <!-- wind information -->
          <p>{{ cityWeather.wind.deg }}</p>
          <p>{{ cityWeather.wind.gust }}</p>
          <p>{{ cityWeather.wind.speed }}</p>
          
        </Card>
        <div class="flex flex-row h-full gap-2 row-span-1">
          <Card class="h-full w-full">
            Monday
          </Card>
          <Card class="h-full w-full">
            Tuesday
          </Card>
          <Card class="h-full w-full">
            Wednesday
          </Card>
          <Card class="h-full w-full">
            Thursday
          </Card>
          <Card class="h-full w-full">
            Friday
          </Card>
          <Card class="h-full w-full">
            Saturday
          </Card>
          <Card class="h-full w-full">
            Friday
          </Card>
        </div>
      </div>
      <Card class="col-span-1 h-full min-h-screen">
        <div class="grid grid-rows-4 h-full">
          <div class="row-span-1 grid place-content-center">
            <p class="text-center">{{ cityWeather.main.temp }} °C</p>
            <p class="text-center">{{ cityWeather.weather[0].description }}</p>
          </div>
          <div class="row-span-3">
            <!-- list of hourly data -->
          </div>
        </div>
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
  // fetch the route parameter of city and country /:country/:city
  const cityName = route.params.city
  const countryCode = route.params.country 
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY // fetch the api key since the process here is to reload the specific city weather

  try {
    // fetch the city information
    const weatherData = await weatherStore.loadCityWeather(countryCode, cityName, apiKey)
    // Store the fetched data in the store
    weatherStore.setSelectedCityWeather(weatherData)
    isLoaded.value = true
    console.log(cityWeather.value)
  } catch (error) {
    // throw an error in case the fethcing is not successful
    console.error('error fetching city weather', cityWeather)
  }
})
</script>