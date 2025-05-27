<template>
  <div class="grid text-black">
    <div
      class="flex gap-x-4 w-full items-center px-3 py-2 rounded-xl bg-white/80 shadow-sm"
      :class="['flex-row', justifyContent]"
    >
      <template v-if="imgFirst">
        <img :src="logo" alt="Weather Information" :class="[height, width, 'drop-shadow']" />
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
        <img :src="logo" alt="Weather Information" :class="[height, width, 'drop-shadow']" />
      </template>
    </div>
  </div>
</template>

<script setup>
import not_found from '@/assets/images/not_found.png'

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
    default: 'text-sm font-semibold 2xl:text-lg xl:text-md',
    type: String,
  },
})

</script>