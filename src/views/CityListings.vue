<template>
  <Navbar @search-city="handleSearchCity" @refresh-cities="handleRefreshCities" />
  <div v-if="isCitiesLoaded">
    <div
      class="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 min-h-screen transition-all duration-300">
      <Card v-for="city in filteredCities" :key="city.info.name ?? ''"
        class="rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200 bg-white/95 backdrop-blur-md transition-all duration-300 hover:scale-[1.025] cursor-pointer">
        <router-link :to="{ path: `/city/${city.info.sys.country}/${city.info.name.toLowerCase() ?? ''}` }"
          class="block p-4">
          <CardHeader class="flex flex-row items-center gap-3 mb-2">
            <img :src="WeatherImageIdentifier('location') ?? ''" alt="location"
              class="w-8 h-8 rounded-full bg-blue-100 shadow" />
            <span class="text-xl font-bold text-gray-900 tracking-wide hover:underline">
              {{ city.info.name ?? '' }}
            </span>
            <span class="ml-auto px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-700 font-semibold">
              {{ city.info.sys.country }}
            </span>
          </CardHeader>

          <CardContent class="grid grid-cols-3 items-center gap-4 py-4">
            <!-- Weather Icon -->
            <section class="flex flex-col items-center">
              <img :src="WeatherImageIdentifier(city.info.weather[0]?.main ?? '') ?? ''" alt="Weather"
                class="w-16 h-16 drop-shadow-lg" />
            </section>
            <!-- Divider -->
            <div class="flex justify-center items-center">
              <span class="w-0.5 h-16 bg-gradient-to-b from-indigo-200 to-indigo-400 rounded"></span>
            </div>
            <!-- City temperature and weather description -->
            <section class="flex flex-col items-center">
              <p class="text-4xl font-extrabold text-indigo-800 mb-1 drop-shadow-sm">
                {{ city.info.main.temp ?? '' }}°C
              </p>
              <p class="text-base text-gray-700 italic capitalize">
                {{ city.info.weather[0]?.description ?? '' }}
              </p>
            </section>
          </CardContent>

          <CardFooter class="grid grid-cols-2 gap-6 pt-2">
            <div class="flex flex-col gap-2">
              <WeatherMetrics label="Humidity" :value="(city.info.main.humidity ?? '') + '%'"
                :logo="WeatherImageIdentifier('humidity')" height="h-6" width="w-8" justifyContent="justify-end"
                :imgFirst="false" />
              <WeatherMetrics label="Wind" :value="(city.info.wind.speed ?? '') + ' km/h'"
                :logo="WeatherImageIdentifier('windy')" height="h-6" width="w-8" justifyContent="justify-end"
                :imgFirst="false" />
            </div>
            <div class="flex flex-col gap-2">
              <WeatherMetrics label="Feels Like" :value="(city.info.main.feels_like ?? '') + '°C'"
                :logo="WeatherImageIdentifier('temperature')" height="h-6" width="w-8" justifyContent="justify-start" />
              <WeatherMetrics label="Pressure" :value="city.info.main.pressure ?? ''"
                :logo="WeatherImageIdentifier('pressure')" height="h-6" width="w-8" justifyContent="justify-start" />
            </div>
          </CardFooter>
        </router-link>
      </Card>
    </div>
  </div>

  <div v-else>
    <div
      class="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <Card v-for="city in filteredCities" :key="city.city ?? ''"
        class="animate-pulse rounded-3xl shadow-lg border border-gray-200 bg-white/60">
        <CardHeader class="flex flex-row gap-4 items-center p-4">
          <div class="rounded-full bg-slate-200 h-8 w-8"></div>
          <div class="flex-1 h-4 bg-slate-200 rounded"></div>
        </CardHeader>
        <CardContent class="grid grid-cols-3 items-center gap-4 py-4">
          <section class="flex items-center justify-center">
            <div class="h-16 w-16 bg-slate-200 rounded-full"></div>
          </section>
          <div class="flex justify-center items-center">
            <span class="w-0.5 h-16 bg-slate-200 rounded"></span>
          </div>
          <section class="flex flex-col items-center gap-2">
            <div class="h-6 w-20 bg-slate-200 rounded"></div>
            <div class="h-4 w-24 bg-slate-200 rounded"></div>
          </section>
        </CardContent>
        <CardFooter class="grid grid-cols-2 gap-6 pt-2">
          <div class="flex flex-col gap-2">
            <div class="h-6 w-24 bg-slate-200 rounded"></div>
            <div class="h-6 w-24 bg-slate-200 rounded"></div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="h-6 w-24 bg-slate-200 rounded"></div>
            <div class="h-6 w-24 bg-slate-200 rounded"></div>
          </div>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script setup>
// imported functions
import { ref, computed, reactive, onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import { WeatherImageIdentifier } from '@/utils/weatherImage'
import { useRoute } from 'vue-router'

// imported components
import Navbar from '@/components/Navbar/Navbar.vue'
import Card from '@/components/Card/Card.vue'
import CardHeader from '@/components/Card/CardHeader.vue'
import CardContent from '@/components/Card/CardContent.vue'
import CardFooter from '@/components/Card/CardFooter.vue'
import WeatherMetrics from '@/components/Section/WeatherMetrics.vue'

const isCitiesLoaded = ref(false)
const weatherStore = useWeatherStore()
const route = useRoute()

// API Key
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

// Reactive state of cities 

const cities = reactive([
  { country: 'PH', city: 'Manila' },
  { country: 'PH', city: 'Batangas' },
  { country: 'PH', city: 'Bohol' },
  { country: 'PH', city: 'Rizal' },
  { country: 'PH', city: 'Cebu' },
  { country: 'PH', city: 'Quezon' },
  { country: 'PH', city: 'San Jose' },
  { country: 'PH', city: 'Calamba' },
])

// Search input state
const searchValue = ref('')

// Computed property for filtered cities
const filteredCities = computed(() => {
  if (!searchValue.value.trim()) return cities // Show all cities if no search input
  return cities.filter((city) =>
    city.city.toLowerCase().includes(searchValue.value.toLowerCase())
  )
})

// Update search value when user types
const handleSearchCity = (value) => {
  searchValue.value = value
}

const fetchCityWeather = async (country, city, apiKey) => {
  try {
    const response = await weatherStore.loadCityWeather(country, city, apiKey)
    return response
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error)
    return null
  }
}

// Fetch weather for all cities
const fetchOverallCityWeather = async () => {
  let fetchedCities = true

  for (let index = 0; index < cities.length; index++) {
    const city = cities[index]
    const weatherInfo = await fetchCityWeather(city.country, city.city, apiKey)
    if (weatherInfo) {
      city.info = weatherInfo
    } else {
      cities.splice(index)
      fetchedCities = false
    }
  }
  return fetchedCities
}

const handleRefreshCities = async () => {

  let currentPath = route.fullPath
  if (currentPath == '/') {
    isCitiesLoaded.value = false
    let processedCities = await fetchOverallCityWeather()
    if (processedCities) {
      isCitiesLoaded.value = true
      weatherStore.setLoadedCities(cities)
    }
  }

}

// Fetch weather info on mount
onMounted(async () => {
  // Check if there are loaded cities in the store
  // getLoadedCities function returns array of object when mounted (if there's loaded cities)
  if (weatherStore.getLoadedCities().length > 0) {
    // Use the loaded cities from the store
    cities.splice(0, cities.length, ...weatherStore.getLoadedCities())
    isCitiesLoaded.value = true
  } else {
    //fetch the cities and store them
    let processedCities = await fetchOverallCityWeather()
    if (processedCities) {
      isCitiesLoaded.value = true
      weatherStore.setLoadedCities(cities) // store the fetched cities in set function that will accessed first when the page in mounted
    }
  }
})
</script>