<template>
  <Navbar @search-city="handleSearchCity" />
  <div v-if="isCitiesLoaded">
    <div
      class="p-8 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 md:grid-cols-2 place-items-center gap-4">
      <Card v-for="city in filteredCities" :key="city.info.name ?? ''"
        class="hover:cursor-grab shadow-lg hover:shadow-none">
        <router-link :to="`/city/${city.info.name ?? ''}`">
          <CardHeader class="pr-2 pl-2 flex flex-row gap-1">
            <img :src="location ?? ''" alt="location" class="max-w-8 w-full h-full">
            <p class="text-lg font-semibold">{{ city.info.name ?? '' }}</p>
            <!-- <hr class="bg-primary h-0.5"> -->
          </CardHeader>

          <CardContent class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 items-center gap-2">
            <!-- Weather Icon -->
            <section class="flex flex-col gap-4 items-center">
              <img :src="currentWeatherImageIdentifier('') ?? ''" alt="Weather Image">
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
              <WeatherMetrics label="Humidity" :value="(city.info.main.humidity ?? '') + '%'" :logo="humidity"
                height="h-full" width="max-w-8 w-full" justifyContent="justify-end" :imgFirst="false" />
              <WeatherMetrics label="Wind Speed" :value="(city.info.wind.speed ?? '') + ' km/h'" :logo="windy"
                height="h-full" width="max-w-8 w-full" justifyContent="justify-end" :imgFirst="false" />
            </div>
            <div class="flex flex-col gap-4">
              <WeatherMetrics label="Feels Like" :value="(city.info.main.feels_like ?? '') + '°C'" :logo="temperature"
                height="h-full" width="max-w-8 w-full" justifyContent="justify-start" />
              <WeatherMetrics label="Pressure" :value="city.info.main.pressure ?? ''" :logo="pressure" height="h-full"
                width="max-w-8 w-full" justifyContent="justify-start" />
            </div>
          </CardFooter>
        </router-link>
      </Card>
    </div>
  </div>

  <div v-else>
    <div
      class="p-8 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 md:grid-cols-2 place-items-center gap-4">
      <Card v-for="city in filteredCities" :key="city.city ?? ''" class="hover:cursor-grab shadow-lg hover:shadow-none">
        <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-700 h-10 w-10"></div>
            <div class="flex-1 space-y-6 py-1">
              <div class="h-2 bg-slate-700 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>

</template>


<script setup>
// imported functions
import { ref, computed, reactive, onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'

// imported components
import Navbar from '@/components/Navbar/Navbar.vue'
import Card from '@/components/Card/Card.vue'
import CardHeader from '@/components/Card/CardHeader.vue'
import CardContent from '@/components/Card/CardContent.vue'
import CardFooter from '@/components/Card/CardFooter.vue'
import WeatherMetrics from '@/components/Section/WeatherMetrics.vue'

// imported images for each weather scenarios
import cloudy from '@/assets/weather_logo/cloudy.png'
import not_found from '@/assets/weather_logo/not_found.png'
import drizzle from '@/assets/weather_logo/drizzle.png'
import foggy from '@/assets/weather_logo/foggy.png'
import rain from '@/assets/weather_logo/rain.png'
import snow from '@/assets/weather_logo/snow.png'
import sunny from '@/assets/weather_logo/sunny.png'
import thunderstorm from '@/assets/weather_logo/thunderstorm.png'
import tornado from '@/assets/weather_logo/tornado.png'
import windy from '@/assets/weather_logo/windy.png'
import humidity from '@/assets/weather_logo/humidity.png'
import temperature from '@/assets/weather_logo/temperature.png'
import pressure from '@/assets/weather_logo/pressure.png'
import location from '@/assets/weather_logo/location.png'

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
]);


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
    return null;
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


// Identify main weather icon
const currentWeatherImageIdentifier = (weather = '') => {
  const weatherConditions = [
    { main: 'thunderstorm', image: thunderstorm },
    { main: 'drizzle', image: drizzle },
    { main: 'rain', image: rain },
    { main: 'snow', image: snow },
    { main: 'clear', image: sunny },
    { main: 'clouds', image: cloudy },
    { main: 'mist', image: foggy },
    { main: 'fog', image: foggy },
    { main: 'tornado', image: tornado },
  ]
  const condition = weatherConditions.find((c) => c.main === weather.trim().toLowerCase())
  return condition ? condition.image : not_found
}

// Fetch weather info on mount
onMounted(async () => {
  // let processedCities = await fetchOverallCityWeather()
  // if (processedCities) {
  //   isCitiesLoaded.value = true
  // }
})
</script>