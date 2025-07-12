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
})
</script>

<template>
  <component
    :is="thumbnail ? 'div' : 'a'"
    :href="!thumbnail ? item.link : null"
    class="group block rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-blue"
  >
    <div
      :class="
        cn(
          'relative aspect-square w-full overflow-hidden transition-all duration-300',
          thumbnail
            ? 'rounded-lg'
            : 'rounded-xl shadow-lg group-hover:shadow-xl',
          !thumbnail &&
            'ring-1 ring-inset ring-slate-200/50 group-hover:ring-4 group-hover:ring-yellow-400'
        )
      "
    >
      <div class="absolute inset-0 bg-slate-100"></div>
      <img
        :src="item.src"
        alt="Image of a Pokemon"
        class="absolute inset-0 h-full w-full object-contain p-4 transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
        loading="lazy"
        decoding="async"
      />
    </div>
  </component>
</template>
