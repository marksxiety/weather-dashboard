<template>
    <div class="flex flex-row gap-x-4 w-full">
      <Icon :icon="logo" :class="[height, width, logocolor]" />
      <div class="flex flex-col">
        <p :class="valueClass">{{ value }}</p>
        <p :class="labelClass">{{ label }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Icon } from '@iconify/vue'
  const props = defineProps({
    logo: {
      default: 'weui:error-outlined',
      type: String
    },
    label: {
      default: 'N/A',
      type: String
    },
    value: {
      default: '-',
      type: String
    },
    logocolor: {
      default: 'text-black-400',
      type: String
    },
    height: {
      default: 'h-8',
      type: String
    },
    width: {
      default: 'w-8',
      type: String
    },
    labelClass: {
      default: 'text-xs text-black-400',
      type: String
    },
    valueClass: {
      default: 'text-sm font-semibold',
      type: String
    }
  })
  </script>  