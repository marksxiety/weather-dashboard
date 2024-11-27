<template>
  <div class="p-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 place-items-center gap-4">
    <Card v-for="city in cities" :key="city">
      <CardContent class="flex flex-col items-center">
        <!-- Weather Icon -->
        <Icon icon="fluent:weather-partly-cloudy-day-16-regular" class="min-h-24 h-24 w-full" />

        <!-- City and Weather Info -->
        <p class="text-lg font-semibold mt-2">{{ city.info.cityname }}</p>
        <p class="text-sm text-gray-500"> {{ city.info.description }}</p>
        <p class="text-md mt-1 font-medium">26°C</p>

        <!-- Additional Weather Metrics -->
        <section class="grid grid-cols-2 w-full mt-4 gap-4">
          <!-- Humidity -->
          <div class="flex items-center space-x-2">
            <Icon icon="carbon:humidity-alt" class="h-8 w-8 text-blue-400" />
            <div class="flex flex-col">
              <p class="text-sm font-semibold">{{ city.info.humidity }}%</p>
              <p class="text-xs text-gray-500">Humidity</p>
            </div>
          </div>

          <!-- Wind Speed -->
          <div class="flex items-center space-x-2">
            <Icon icon="meteor-icons:wind" class="h-8 w-8 text-gray-500" />
            <div class="flex flex-col">
              <p class="text-sm font-semibold">{{ city.info.windspeed }} km/h</p>
              <p class="text-xs text-gray-500">Wind Speed</p>
            </div>
          </div>

          <!-- Feels Like -->
          <div class="flex items-center space-x-2">
            <Icon icon="fluent:temperature-16-regular" class="h-8 w-8 text-orange-400" />
            <div class="flex flex-col">
              <p class="text-sm font-semibold">{{ city.info.temperature }}°C</p>
              <p class="text-xs text-gray-500">Feels Like</p>
            </div>
          </div>

          <!-- High/Low Temps -->
          <div class="flex items-center space-x-2">
            <Icon icon="mingcute:high-temperature-line" class="h-8 w-8 text-red-400" />
            <div class="flex flex-col">
              <p class="text-sm font-semibold">{{ city.info.hightemp }}°C / {{ city.info.lowtemp }}°C</p>
              <p class="text-xs text-gray-500">High / Low</p>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  </div>
</template>
<script setup>
import Card from '@/components/Card/Card.vue'
import CardContent from '@/components/Card/CardContent.vue'
import { Icon } from '@iconify/vue'
import axiosConfig from '@/plugins'
import { reactive, onMounted, ref } from 'vue'

// API key for accessing the weather data (stored in the .env file for security)
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
// A flag to track whether the weather data has been successfully loaded
const isLoaded = ref(false)

// Reactive array of cities to fetch weather for, each city object includes its country, city name, and weather info
const cities = reactive([
  { country: 'PH', city: 'Manila', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } },
  { country: 'PH', city: 'Batangas', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } },
  { country: 'PH', city: 'Bohol', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } },
  { country: 'PH', city: 'Rizal', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } },
  { country: 'PH', city: 'Cebu', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } },
  { country: 'PH', city: 'Quezon', info: { cityname: 'Loading...', description: 'Loading...', temperature: 'N/A', humidity: 'N/A', windspeed: 'N/A', hightemp: 'N/A', lowtemp: 'N/A' } }
])

// Function to fetch weather data for a specific city using the OpenWeather API
// Parameters: 
// - country: country code (e.g., 'PH' for the Philippines)
// - city: name of the city (e.g., 'Manila')
// - apiKey: your API key from OpenWeather
const fetchCityWeather = async (country, city, apiKey) => {
  try {
    // Sending the GET request to the OpenWeather API
    const response = await axiosConfig.get(`/weather?q=${city},${country}&appid=${apiKey}`);
    return response.data; // Return the response data containing weather information
  } catch (error) {
    // Log any errors that occur while fetching the weather data
    console.error(`Error fetching weather for ${city}:`, error);
    return null; // Return null in case of an error
  }
}

const mainLogoIdentifier = (weather) => {

  const weatherConditions = [
    { main: "thunderstorm", icon: 'ion:thunderstorm-outline' },
    { main: "drizzle", icon: 'carbon:rain-drizzle' },
    { main: "rain", icon: 'bi:cloud-rain' },
    { main: "snow", icon: 'hugeicons:snow' },
    { main: "clear", icon: 'fluent:weather-sunny-low-48-regular' },
    { main: "clouds", icon: 'bi:clouds' },
    { main: "mist", icon: 'tabler:mist' },
    { main: "smoke", icon: 'mdi:smoke' },
    { main: "haze", icon: 'lucide:haze' },
    { main: "dust", icon: 'wi:dust' },
    { main: "fog", icon: 'carbon:fog' },
    { main: "sand", icon: 'lsicon:sand-outline' },
    { main: "ash", icon: 'streamline:volcano' },
    { main: "squall", icon: 'fluent:weather-squalls-20-regular' },
    { main: "tornado", icon: 'tabler:tornado' }
  ]

}


// Function to fetch weather information for all cities in the cities array
// It updates each city's weather info object with the necessary data
const fetchOverallCityWeather = async () => {
  // Loop through each city in the cities array
  for (let city of cities) {
    // Fetch the weather data for the current city
    let weatherInfo = await fetchCityWeather(city.country, city.city, apiKey);
    if (weatherInfo) {
      // Update the city's 'info' object with specific weather details
      // Only the necessary data for display is populated to optimize performance
      city.info = {
        id: weatherInfo.id,               // City ID
        cityname: weatherInfo.name,       // City Name
        weather: weatherInfo.weather[0].main, // Main weather condition (e.g., Clear, Rainy)
        description: weatherInfo.weather[0].description, // Description of weather (e.g., Clear sky)
        humidity: weatherInfo.main.humidity, // Humidity percentage
        windspeed: weatherInfo.wind.speed,  // Wind speed in km/h
        temperature: weatherInfo.main.feels_like, // Temperature feels like
        hightemp: weatherInfo.main.temp_max, // High/Low temperature
        lowtemp: weatherInfo.main.temp_min// High/Low temperature
      }
    }
  }
}

// This will run when the component is mounted
onMounted(async () => {
  // Fetch weather data for all cities
  let loadcities = await fetchOverallCityWeather();

  if (loadcities) {
    // If the data is successfully fetched, mark the loading as complete
    isLoaded.value = true;
  }

  // Log the updated cities array with their weather info
  console.log(cities);
});
</script>