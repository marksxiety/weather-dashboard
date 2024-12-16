<template>
  <div class="flex flex-col h-full w-full rounded-lg border-2 p-4"
       :class="computedClasses">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  bordercolor: {
    type: String,
    default: 'primary',
  },
  bgcolor: {
    type: String,
    default: 'background',
  },
})

// Computed class
const computedClasses = computed(() => [
  `border-${props.bordercolor}`,
  `bg-${props.bgcolor}`,
])
</script>