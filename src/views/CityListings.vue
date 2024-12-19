<template>
  <Navbar @search-city="handleSearchCity" />
  <div v-if="isCitiesLoaded">
    <div
      class="p-8 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 md:grid-cols-2 place-items-center gap-4">
      <Card v-for="city in filteredCities" :key="city.info.name ?? ''"
        class="hover:cursor-pointer shadow-lg hover:shadow-none" bordercolor='primary'>
        <router-link :to="{ path: `/city/${city.info.sys.country}/${city.info.name.toLowerCase() ?? ''}` }">
          <CardHeader class="pr-2 pl-2 flex flex-row gap-1">
            <img :src="WeatherImageIdentifier('location') ?? ''" alt="location" class="max-w-8 w-full h-full">
            <p class="text-lg font-semibold">{{ city.info.name ?? '' }}</p>
            <!-- <hr class="bg-primary h-0.5"> -->
          </CardHeader>

          <CardContent class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 items-center gap-2">
            <!-- Weather Icon -->
            <section class="flex flex-col gap-4 items-center">
              <img :src="WeatherImageIdentifier(city.info.weather[0]?.main ?? '') ?? ''" alt="Weather Image">
            </section>

            <!-- Span to have a separation for icon and description -->
            <div class="flex justify-center items-center w-full h-full">
              <span class="w-full md:w-0.5 lg:w-0.5 h-[60%] bg-separator hidden sm:block"></span>
            </div>
            <!-- City temperature and weather description -->
            <section class="flex flex-row md:flex-col gap-4 justify-center text-center">
              <p class="text-3xl 2xl:text-xl xl:text-lg mt-1 text-wrap font-semibold antialiased">{{ city.info.main.temp
                ?? '' }}°C</p>
              <p class="text-sm antialiased italic">{{ city.info.weather[0]?.description ?? '' }}</p>
            </section>
          </CardContent>

          <CardFooter class="grid grid-cols-2 gap-12">
            <!-- Weather Metrics -->
            <div class="flex flex-col gap-4">
              <WeatherMetrics label="Humidity" :value="(city.info.main.humidity ?? '') + '%'"
                :logo="WeatherImageIdentifier('humidity')" height="h-full" width="max-w-8 w-full"
                justifyContent="justify-end" :imgFirst="false" />
              <WeatherMetrics label="Wind Speed" :value="(city.info.wind.speed ?? '') + ' km/h'"
                :logo="WeatherImageIdentifier('windy')" height="h-full" width="max-w-8 w-full"
                justifyContent="justify-end" :imgFirst="false" />
            </div>
            <div class="flex flex-col gap-4">
              <WeatherMetrics label="Feels Like" :value="(city.info.main.feels_like ?? '') + '°C'"
                :logo="WeatherImageIdentifier('temperature')" height="h-full" width="max-w-8 w-full"
                justifyContent="justify-start" />
              <WeatherMetrics label="Pressure" :value="city.info.main.pressure ?? ''"
                :logo="WeatherImageIdentifier('pressure')" height="h-full" width="max-w-8 w-full"
                justifyContent="justify-start" />
            </div>
          </CardFooter>
        </router-link>
      </Card>
    </div>
  </div>

  <div v-else>
    <div
      class="p-8 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 md:grid-cols-2 place-items-center gap-4">
      <Card v-for="city in filteredCities" :key="city.city ?? ''" class="animate-pulse shadow-lg cursor-progress"
        bordercolor='slate-400'>
        <CardHeader class="pr-2 pl-2 flex flex-row gap-4">
          <div class="rounded-lg bg-slate-400 h-6 w-6"></div>
          <div class="flex items-center w-full">
            <div class="h-3 w-[50%] bg-slate-400 rounded"></div>
          </div>
        </CardHeader>

        <CardContent class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 items-center gap-2 mt-4">
          <!-- Weather Icon -->
          <section class="flex items-center w-full h-12">
            <div class="h-full w-full bg-slate-400 rounded"></div>
          </section>

          <!-- Span to have a separation for icon and description -->
          <div class="flex justify-center items-center w-full h-full">
            <span class="w-full md:w-0.5 lg:w-0.5 h-[60%] bg-separator hidden sm:block"></span>
          </div>
          <!-- City temperature and weather description -->
          <section class="flex flex-row md:flex-col gap-4 justify-center text-center h-12">
            <div class="h-full w-full bg-slate-400 rounded"></div>
            <div class="h-full w-full bg-slate-400 rounded"></div>
          </section>
        </CardContent>

        <CardFooter class="grid grid-cols-2 gap-12 mt-4">
          <!-- Weather Metrics -->
          <div class="flex flex-col gap-4">
            <section class="grid grid-cols-3 items-center w-full h-6 gap-4">
              <div class="h-[50%] w-full bg-slate-400 rounded col-span-2"></div>
              <div class="h-full w-full bg-slate-400 rounded"></div>
            </section>
            <section class="grid grid-cols-3 items-center w-full h-6 gap-4">
              <div class="h-[50%] w-full bg-slate-400 rounded col-span-2"></div>
              <div class="h-full w-full bg-slate-400 rounded"></div>
            </section>
          </div>
          <div class="flex flex-col gap-4">
            <section class="grid grid-cols-3 items-center w-full h-6 gap-4">
              <div class="h-full w-full bg-slate-400 rounded"></div>
              <div class="h-[50%] w-full bg-slate-400 rounded col-span-2"></div>
            </section>
            <section class="grid grid-cols-3 items-center w-full h-6 gap-4">
              <div class="h-full w-full bg-slate-400 rounded"></div>
              <div class="h-[50%] w-full bg-slate-400 rounded col-span-2"></div>
            </section>
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

// imported components
import Navbar from '@/components/Navbar/Navbar.vue'
import Card from '@/components/Card/Card.vue'
import CardHeader from '@/components/Card/CardHeader.vue'
import CardContent from '@/components/Card/CardContent.vue'
import CardFooter from '@/components/Card/CardFooter.vue'
import WeatherMetrics from '@/components/Section/WeatherMetrics.vue'

const isCitiesLoaded = ref(false)
const weatherStore = useWeatherStore()

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