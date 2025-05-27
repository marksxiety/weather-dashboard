<template>
  <div :class="['flex flex-col h-full w-full rounded-lg p-4 bg-white/5 shadow-lg backdrop-blur-sm hover:shadow-none', 'hover:cursor-' + pointerhover]">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  pointerhover: {
    type: String,
    default: 'pointer'
  }
})
</script>