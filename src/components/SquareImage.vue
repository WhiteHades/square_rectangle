<script setup>
import { cn } from '../lib/utils/utils.js'

defineProps({
  item: {
    type: Object,
    required: true,
  },
  thumbnail: {
    type: Boolean,
    default: false,
  },
  mobile: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <component
    :is="thumbnail ? 'div' : 'a'"
    :href="!thumbnail ? item.link : null"
    :class="[
      'group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-mocha-pink',
      thumbnail ? 'cursor-default' : 'cursor-pointer transition-all duration-300',
      thumbnail ? 'bg-white p-1 shadow-md' : 'bg-white p-2 shadow-md hover-glow',
      thumbnail ? 'w-[98%] h-[98%] mx-auto' : 'w-[98%] h-[98%] mx-auto',
      'overflow-hidden'
    ]"
    :style="{ borderRadius: thumbnail ? '0.5rem' : '0.75rem' }"
  >
    <div
      :class="[
        'relative aspect-square w-full overflow-hidden bg-gradient-to-br from-mocha-surface to-mocha-base flex items-center justify-center transition-all duration-300',
        thumbnail ? 'rounded-lg' : 'rounded-xl',
        !thumbnail && 'hover:shadow-xl hover:shadow-mocha-pink/20'
      ]"
      :style="{ borderRadius: thumbnail ? '0.5rem' : '0.75rem' }"
    >
      <div
        :class="[
          'absolute inset-0 transition-all duration-300 group-hover:opacity-10 overflow-hidden',
          'bg-gradient-to-br from-mocha-yellow/30 to-mocha-peach/30',
          thumbnail ? 'rounded-lg' : 'rounded-xl'
        ]"
        :style="{ borderRadius: thumbnail ? '0.5rem' : '0.75rem' }"
      ></div>
      <img
        :src="item.src"
        alt="Image of a Pokemon"
        :class="[
          'object-contain transition-all duration-300 z-10',
          thumbnail 
            ? 'w-4/5 h-4/5 rounded-lg' 
            : 'w-[96%] h-[96%] group-hover:scale-105 group-hover:brightness-110 group-hover:drop-shadow rounded-xl'
        ]"
        :style="{ borderRadius: thumbnail ? '0.5rem' : '0.75rem' }"
        loading="lazy"
        decoding="async"
      />
    </div>
  </component>
</template>

<style scoped>
.hover-glow {
  transition: all 0.3s ease;
}

.hover-glow:hover {
  box-shadow: 
    0 0 20px rgba(245, 194, 231, 0.4),
    0 0 40px rgba(245, 194, 231, 0.2),
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 0 0 2px rgba(245, 194, 231, 0.6);
}

.group * {
  border-radius: inherit !important;
}

img {
  border-radius: inherit !important;
  clip-path: inherit !important;
}
</style>
