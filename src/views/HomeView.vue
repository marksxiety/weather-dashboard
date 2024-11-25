<template>
  <div class="p-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 place-items-center gap-4">
    <Card>
      <CardContent class="flex flex-col items-center">
        <!-- Weather Icon -->
        <Icon icon="fluent:weather-partly-cloudy-day-16-regular" class="min-h-24 h-24 w-full" />

        <!-- City and Weather Info -->
        <p class="text-lg font-semibold mt-2">Manila</p>
        <p class="text-sm text-gray-500">Partly Cloudy</p>
        <p class="text-md mt-1 font-medium">26°C</p>

        <!-- Date and Time -->
        <p class="text-xs text-gray-400 mt-1">Monday, 10:30 AM</p>

        <!-- Additional Weather Metrics -->
        <section class="grid grid-cols-2 w-full mt-4 gap-4">
          <!-- Humidity -->
          <div class="flex items-center space-x-2">
            <Icon icon="carbon:humidity-alt" class="h-8 w-8 text-blue-400" />
            <div class="flex flex-col">
              <p class="text-sm font-semibold">30%</p>
              <p class="text-xs text-gray-500">Humidity</p>
            </div>
          </div>

          <!-- Wind Speed -->
          <div class="flex items-center space-x-2">
            <Icon icon="meteor-icons:wind" class="h-8 w-8 text-gray-500" />
            <div class="flex flex-col">
              <p class="text-sm font-semibold">5.66 km/h</p>
              <p class="text-xs text-gray-500">Wind Speed</p>
            </div>
          </div>

          <!-- Feels Like -->
          <div class="flex items-center space-x-2">
            <Icon icon="fluent:temperature-16-regular" class="h-8 w-8 text-orange-400" />
            <div class="flex flex-col">
              <p class="text-sm font-semibold">28°C</p>
              <p class="text-xs text-gray-500">Feels Like</p>
            </div>
          </div>

          <!-- High/Low Temps -->
          <div class="flex items-center space-x-2">
            <Icon icon="fluent:temperature-high-16-regular" class="h-8 w-8 text-red-400" />
            <div class="flex flex-col">
              <p class="text-sm font-semibold">29°C / 22°C</p>
              <p class="text-xs text-gray-500">High / Low</p>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import Card from '@/components/Card/Card.vue';
import CardContent from '@/components/Card/CardContent.vue';
import { Icon } from '@iconify/vue';
</script>