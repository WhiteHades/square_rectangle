<script setup>
import { cn } from '../lib/utils/utils.js';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  thumbnail: {
    type: Boolean,
    default: false,
  },
});

</script>

<template>
  <a :href="props.item.link" class="group block">
    <div :class="cn(
      props.thumbnail ? 'aspect-square w-full rounded-md overflow-hidden' : 'aspect-square w-full rounded-2xl overflow-hidden shadow-lg',
      'relative'
    )">
      <img :src="props.item.src"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy" decoding="async" alt="" />
    </div>
  </a>
</template>
