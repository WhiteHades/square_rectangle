<script setup>
import { ref, computed, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { useMotion } from '@vueuse/motion';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const rectImg = props.items.find(
  (i) => i.type === 'image' && i.aspectRatio === 'rectangle'
);
const squareImg = props.items.find(
  (i) => i.type === 'image' && i.aspectRatio === 'square'
);
const cta = props.items.find((i) => i.type === 'cta');

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 640);

const hero = ref(null);

onMounted(() => {
  if (hero.value) {
    useMotion(hero.value, {
      initial: { opacity: 0 },
      enter: { opacity: 1, transition: { duration: 0.5 } },
    });
  }
});
</script>

<template>
  <div ref="hero" class="relative w-full overflow-hidden rounded-2xl shadow-lg">
    <!-- Background image -->
    <a :href="rectImg.link" class="block">
      <img v-if="!isMobile" :src="rectImg.src" class="h-auto w-full object-cover" loading="lazy" decoding="async"
        alt="" />
      <img v-else :src="squareImg.src" class="h-auto w-full object-cover" loading="lazy" decoding="async" alt="" />
    </a>

    <!-- CTA overlay (desktop) -->
    <a v-if="!isMobile" :href="cta.link"
      class="absolute right-6 top-1/2 flex w-80 -translate-y-1/2 flex-col items-start gap-4 rounded-xl bg-white/80 p-6 backdrop-blur-md transition hover:bg-white">
      <h3 class="text-2xl font-semibold tracking-tight">
        {{ cta.title }}
      </h3>
      <button class="rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
        {{ cta.button }}
      </button>
    </a>
  </div>

  <!-- CTA bar (mobile) -->
  <a v-if="isMobile" :href="cta.link"
    class="mt-4 flex w-full items-center justify-between rounded-xl bg-white p-4 shadow-md">
    <span class="font-medium">{{ cta.title }}</span>
    <button class="rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
      {{ cta.button }}
    </button>
  </a>
</template>
