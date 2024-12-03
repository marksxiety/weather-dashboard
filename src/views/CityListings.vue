<template>
  <Navbar @search-city="handleSearchCity" />
  <div class="p-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 place-items-center gap-4">
    <Card v-for="city in filteredCities" :key="city.info.cityname">
      <CardHeader class="pr-2 pl-2 flex flex-row gap-1">
        <Icon icon="mdi:location" width="28" height="full" class="text-red-600"/>
        <p class="text-lg font-semibold">{{ city.info.cityname }}</p>
        <!-- <hr class="bg-primary h-0.5"> -->
      </CardHeader>

      <CardContent class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 items-center gap-2">
        <!-- Weather Icon -->
        <section class="flex flex-col gap-4 items-center">
          <Icon :icon="mainLogoIdentifier(city.info.weather)" class="min-h-32 h-32 w-full" />
        </section>

        <!-- Span to have a separation for icon and description -->
        <div class="flex justify-center w-full h-full">
          <span class="w-full md:w-0.5 lg:w-0.5 h-full bg-separator hidden sm:block"></span>
        </div>
        <!-- City temperature and weather description -->
        <section class="flex flex-row md:flex-col gap-4 justify-center text-center">
          <p class="text-2xl mt-1 text-wrap font-semibold antialiased">{{ city.info.temperature }}°C</p>
          <p class="text-sm antialiased italic">{{ city.info.description }}</p>
        </section>
      </CardContent>

      <CardFooter class="grid grid-cols-2 gap-4">
        <!-- Weather Metrics -->
        <div class="flex flex-col gap-4">
          <WeatherMetrics logo="carbon:humidity-alt" label="Humidity" :value="city.info.humidity + '%'"
            logocolor="text-blue-400" height="h-full" width="max-w-8 w-full" />
          <WeatherMetrics logo="meteor-icons:wind" label="Wind Speed" :value="city.info.windspeed + ' km/h'"
            logocolor="text-gray-500" height="h-full" width="max-w-8 w-full" />
        </div>
        <div class="flex flex-col gap-4">
          <WeatherMetrics logo="fluent:temperature-16-regular" label="Feels Like" :value="city.info.temperature + '°C'"
            logocolor="text-orange-400" height="h-full" width="max-w-8 w-full" />
          <WeatherMetrics logo="mingcute:high-temperature-line" label="High / Low"
            :value="city.info.hightemp + '°C / ' + city.info.lowtemp + '°C'" logocolor="text-red-400" height="h-full"
            width="max-w-8 w-full" />
        </div>
      </CardFooter>
    </Card>
  </div>
</template>


<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import Navbar from '@/components/navbar/Navbar.vue'
import Card from '@/components/Card/Card.vue'
import CardHeader from '@/components/Card/CardHeader.vue'
import CardContent from '@/components/Card/CardContent.vue'
import CardFooter from '@/components/Card/CardFooter.vue'
import WeatherMetrics from '@/components/Section/WeatherMetrics.vue'
import { Icon } from '@iconify/vue'
import axiosConfig from '@/plugins'
import { RouterLink } from 'vue-router'

// API Key
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

// Reactive state
const cities = reactive([
  { country: 'PH', city: 'Manila', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } },
  { country: 'PH', city: 'Batangas', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } },
  { country: 'PH', city: 'Bohol', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } },
  { country: 'PH', city: 'Rizal', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } },
  { country: 'PH', city: 'Cebu', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } },
  { country: 'PH', city: 'Quezon', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } },
  { country: 'PH', city: 'San Jose', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } },
  { country: 'PH', city: 'Calamba', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } }
])

// Search input state
const searchValue = ref('')

// Computed property for filtered cities
const filteredCities = computed(() => {
  if (!searchValue.value.trim()) return cities // Show all cities if no search input
  return cities.filter((city) =>
    city.info.cityname.toLowerCase().includes(searchValue.value.toLowerCase())
  )
})

// Update search value when user types
const handleSearchCity = (value) => {
  searchValue.value = value
}

// Fetch weather for a single city
const fetchCityWeather = async (country, city, apiKey) => {
  try {
    const response = await axiosConfig.get(`/weather?q=${city},${country}&appid=${apiKey}&units=metric`)
    return response.data
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error)
    return null
  }
}

// Fetch weather for all cities
const fetchOverallCityWeather = async () => {
  for (const city of cities) {
    const weatherInfo = await fetchCityWeather(city.country, city.city, apiKey)
    if (weatherInfo) {
      city.info = {
        cityname: weatherInfo.name,
        description: weatherInfo.weather[0].description,
        temperature: weatherInfo.main.feels_like,
        humidity: weatherInfo.main.humidity,
        windspeed: weatherInfo.wind.speed,
        hightemp: weatherInfo.main.temp_max,
        lowtemp: weatherInfo.main.temp_min,
        weather: weatherInfo.weather[0].main,
        cityparameter: city.city,
        countryparamter: city.country
      }
    }
  }
}

// Identify main weather icon
const mainLogoIdentifier = (weather = '') => {
  const weatherConditions = [
    { main: 'thunderstorm', icon: 'ion:thunderstorm-outline' },
    { main: 'drizzle', icon: 'carbon:rain-drizzle' },
    { main: 'rain', icon: 'bi:cloud-rain' },
    { main: 'snow', icon: 'hugeicons:snow' },
    { main: 'clear', icon: 'fluent:weather-sunny-low-48-regular' },
    { main: 'clouds', icon: 'bi:clouds' },
    { main: 'mist', icon: 'tabler:mist' },
    { main: 'fog', icon: 'carbon:fog' },
    { main: 'tornado', icon: 'tabler:tornado' },
  ]
  const condition = weatherConditions.find((c) => c.main === weather.trim().toLowerCase())
  return condition ? condition.icon : 'hugeicons:file-not-found'
}

// Fetch weather data on mount
onMounted(async () => {
  await fetchOverallCityWeather()
})
</script>