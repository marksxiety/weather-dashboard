<template>
  <Navbar @refresh-cities="handleRefreshCities"/>
  <div v-if="cityWeather && isLoaded" class="p-4">
    <div class="grid grid-cols-3 gap-4">
      <div class="grid grid-rows-3 col-span-2 min-h-screen gap-4">
        <Card class="h-full row-span-2 flex flex-col">
          <Card class="h-full row-span-2 flex flex-col">
            <!-- City name -->
            <p><strong>City:</strong> {{ cityWeather.name }}</p>

            <!-- Coordinates -->
            <p><strong>Latitude:</strong> {{ cityWeather.coord.lat }}</p>
            <p><strong>Longitude:</strong> {{ cityWeather.coord.lon }}</p>

            <!-- Main temperatures -->
            <p><strong>Feels Like:</strong> {{ cityWeather.main.feels_like }} °C</p>
            <p><strong>Ground Level Pressure:</strong> {{ cityWeather.main.grnd_level }} hPa</p>
            <p><strong>Humidity:</strong> {{ cityWeather.main.humidity }} %</p>
            <p><strong>Pressure:</strong> {{ cityWeather.main.pressure }} hPa</p>
            <p><strong>Sea Level Pressure:</strong> {{ cityWeather.main.sea_level }} hPa</p>
            <p><strong>Temperature:</strong> {{ cityWeather.main.temp }} °C</p>
            <p><strong>Max Temperature:</strong> {{ cityWeather.main.temp_max }} °C</p>
            <p><strong>Min Temperature:</strong> {{ cityWeather.main.temp_min }} °C</p>

            <!-- Sun information -->
            <p><strong>Sunrise:</strong> {{ new Date(cityWeather.sys.sunrise * 1000).toLocaleTimeString() }}</p>
            <p><strong>Sunset:</strong> {{ new Date(cityWeather.sys.sunset * 1000).toLocaleTimeString() }}</p>

            <!-- Country information -->
            <p><strong>Country:</strong> {{ cityWeather.sys.country }}</p>

            <!-- Timezone information -->
            <p><strong>Timezone Offset:</strong> {{ cityWeather.timezone / 3600 }} hours</p>

            <!-- Wind information -->
            <p><strong>Wind Direction:</strong> {{ cityWeather.wind.deg }}°</p>
            <p><strong>Wind Gust:</strong> {{ cityWeather.wind.gust }} m/s</p>
            <p><strong>Wind Speed:</strong> {{ cityWeather.wind.speed }} m/s</p>
          </Card>


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
          <div class="row-span-1 grid place-content-center gap-4">
            <img :src="WeatherImageIdentifier(cityWeather.weather[0].main)" alt="weather icon" class="max-w-full max-h-48" />
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
import { WeatherImageIdentifier } from '@/utils/weatherImage'

const weatherStore = useWeatherStore()
const route = useRoute()
const isLoaded = ref(false)

// fetch the route parameter of city and country /:country/:city
const cityName = route.params.city
const countryCode = route.params.country
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY // fetch the api key since the process here is to reload the specific city weather

const cityWeather = computed(() => weatherStore.selectedCityWeather)

const loadCurrentCity = async (countryCode, cityName, apiKey) => {
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
}

const handleRefreshCities = async () => {
  if (cityName && countryCode) {
    await loadCurrentCity(countryCode, cityName, apiKey)
  }
}

// Fetch the weather data for the city when the component is mounted
onMounted(async () => {
  await loadCurrentCity(countryCode, cityName, apiKey)
})
</script>