<template>
  <div class="flex flex-col h-full w-full rounded-lg border-2 p-4" :class="[`border-${props.bordercolor}`, `bg-${props.bgcolor}`]">
    <slot></slot>
  </div>
</template>

<script setup>
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
</script>