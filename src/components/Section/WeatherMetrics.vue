<template>
  <div class="grid place-content-center">
    <div class="flex gap-x-4 w-full" :class="['flex-row', justifyContent]">
      <template v-if="imgFirst">
        <img :src="logo" alt="Weather Information" :class="[height, width]" />
        <div class="flex flex-col">
          <p :class="valueClass">{{ value }}</p>
          <p :class="labelClass">{{ label }}</p>
        </div>
      </template>
      <template v-else>
        <div class="flex flex-col">
          <p :class="valueClass">{{ value }}</p>
          <p :class="labelClass">{{ label }}</p>
        </div>
        <img :src="logo" alt="Weather Information" :class="[height, width]" />
      </template>
    </div>
  </div>
</template>

<script setup>
import not_found from '@/assets/weather_logo/not_found.png';

const props = defineProps({
  logo: {
    default: not_found,
    type: String,
  },
  label: {
    default: 'N/A',
    type: String,
  },
  value: {
    default: '-',
    type: [String, Number],
  },
  imgFirst: {
    default: true, // Determines the order of img and div
    type: Boolean,
  },
  justifyContent: {
    default: 'justify-start',
    type: String,
  },
  height: {
    default: 'h-8',
    type: String,
  },
  width: {
    default: 'w-8',
    type: String,
  },
  labelClass: {
    default: 'text-xs text-black-400',
    type: String,
  },
  valueClass: {
    default: 'text-sm font-semibold md:text-md lg:text-lg',
    type: String,
  },
});

</script>