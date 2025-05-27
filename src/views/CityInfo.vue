<template>
  <Navbar @refresh-cities="handleRefreshCities" />
  <div v-if="cityWeather && isLoaded" class="p-6">
    <div class="grid grid-cols-3 gap-6">
      <!-- Main Info & Weekly Forecast -->
      <div class="grid grid-rows-3 col-span-2 min-h-screen gap-6">
        <!-- Main City Info Card -->
        <Card class="h-full row-span-2 flex flex-col bg-white/90 backdrop-blur-md shadow-xl rounded-3xl p-8"
          pointerhover="">
          <div class="flex flex-col gap-2">
            <nav class="mb-6 text-sm text-gray-500 flex items-center gap-2">
              <router-link to="/" class="hover:underline text-indigo-700 font-semibold">Dashboard</router-link>
              <span>/</span>
              <span class="text-gray-700 font-semibold">{{ cityWeather.name }}</span>
            </nav>
            <h2 class="text-3xl font-bold text-indigo-700 mb-2">{{ cityWeather.name }}, {{ cityWeather.sys.country }}
            </h2>
            <div class="flex flex-wrap gap-4 text-gray-700 text-lg">
              <div>
                <span class="font-semibold">Lat:</span> {{ cityWeather.coord.lat }}
              </div>
              <div>
                <span class="font-semibold">Lon:</span> {{ cityWeather.coord.lon }}
              </div>
              <div>
                <span class="font-semibold">Timezone:</span> UTC{{ cityWeather.timezone / 3600 >= 0 ? '+' : '' }}{{
                  cityWeather.timezone / 3600 }}
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p class="text-gray-900 text-xl font-semibold">🌡️ {{ cityWeather.main.temp }} °C</p>
                <p class="text-gray-500 capitalize">{{ cityWeather.weather[0].description }}</p>
                <p class="text-gray-700 mt-2">Feels Like: <span class="font-semibold">{{ cityWeather.main.feels_like }}
                    °C</span></p>
                <p class="text-gray-700">Humidity: <span class="font-semibold">{{ cityWeather.main.humidity }}%</span>
                </p>
                <p class="text-gray-700">Pressure: <span class="font-semibold">{{ cityWeather.main.pressure }}
                    hPa</span></p>
                <p class="text-gray-700">Sea Level: <span class="font-semibold">{{ cityWeather.main.sea_level }}
                    hPa</span></p>
                <p class="text-gray-700">Ground Level: <span class="font-semibold">{{ cityWeather.main.grnd_level }}
                    hPa</span></p>
              </div>
              <div>
                <p class="text-gray-700">Max Temp: <span class="font-semibold">{{ cityWeather.main.temp_max }} °C</span>
                </p>
                <p class="text-gray-700">Min Temp: <span class="font-semibold">{{ cityWeather.main.temp_min }} °C</span>
                </p>
                <p class="text-gray-700">Wind: <span class="font-semibold">{{ cityWeather.wind.speed }} m/s</span> ({{
                  cityWeather.wind.deg }}°)</p>
                <p class="text-gray-700">Gust: <span class="font-semibold">{{ cityWeather.wind.gust }} m/s</span></p>
                <p class="text-gray-700">Sunrise: <span class="font-semibold">{{ new Date(cityWeather.sys.sunrise *
                  1000).toLocaleTimeString() }}</span></p>
                <p class="text-gray-700">Sunset: <span class="font-semibold">{{ new Date(cityWeather.sys.sunset *
                  1000).toLocaleTimeString() }}</span></p>
              </div>
            </div>
          </div>
        </Card>
        <!-- Weekly Forecast Cards -->
        <div class="flex flex-row h-full gap-4 row-span-1">
          <Card v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="day"
            class="h-full w-full flex items-center justify-center bg-white/80 rounded-2xl shadow hover:shadow-lg transition cursor-pointer font-semibold text-indigo-700 text-lg">
            {{ day }}
          </Card>
        </div>
      </div>
      <!-- Right Side: Weather Icon & Description -->
      <Card
        class="col-span-1 h-full min-h-screen bg-white/90 backdrop-blur-md shadow-xl rounded-3xl flex flex-col justify-center items-center p-8">
        <div class="flex flex-col items-center gap-4">
          <img :src="WeatherImageIdentifier(cityWeather.weather[0].main)" alt="weather icon"
            class="max-w-full max-h-48 drop-shadow" />
          <p class="text-5xl font-extrabold text-indigo-700">{{ cityWeather.main.temp }} °C</p>
          <p class="text-xl text-gray-500 capitalize">{{ cityWeather.weather[0].description }}</p>
        </div>
        <div class="mt-8 row-span-3 w-full">
          <!-- list of hourly data (future: add a modern horizontal scroll or chart here) -->
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