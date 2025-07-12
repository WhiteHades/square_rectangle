<script setup>
import { ref, computed, onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useMotion } from '@vueuse/motion'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const rectImg = computed(() =>
  props.items.find((i) => i.type === 'image' && i.aspectRatio === 'rectangle')
)
const squareImg = computed(() =>
  props.items.find((i) => i.type === 'image' && i.aspectRatio === 'square')
)
const cta = computed(() => props.items.find((i) => i.type === 'cta'))

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640)

const hero = ref(null)

onMounted(() => {
  if (hero.value) {
    useMotion(hero.value, {
      initial: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0, transition: { type: 'spring', delay: 100 } },
    })
  }
})
</script>

<template>
  <!-- Outer div -->
  <div v-if="cta && rectImg && squareImg" ref="container">
    <div class="relative w-full overflow-hidden rounded-gl shadow-lg">
      <a
        :href="rectImg.link"
        class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-blue rounded-lg"
      >
        <img
          v-if="!isMobile"
          :src="rectImg.src"
          alt="Wide-screen hero image"
          class="h-auto w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <img
          v-else
          :src="squareImg.src"
          alt="Square hero image for mobile"
          class="h-auto w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </a>

      <!-- Desktop CTA -->
      <a
        :href="cta.link"
        class="group absolute right-6 top-1/2 w-80 -translate-y-1/2 flex-col items-start gap-4 rounded-lg bg-white/85 p-6 backdrop-blur-md transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-blue sm:flex hidden"
      >
        <h3 class="text-2xl font-semibold tracking-tight text-slate-800">
          {{ cta.title }}
        </h3>
        <button
          class="rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white transition-all group-hover:scale-105 group-hover:bg-red-500"
        >
          {{ cta.button }}
        </button>
      </a>
    </div>

    <!-- Mobile CTA -->
    <a
      :href="cta.link"
      class="mt-4 flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pastel-blue sm:hidden"
    >
      <span class="font-medium text-slate-800">{{ cta.title }}</span>
      <button
        class="rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white transition active:bg-red-500"
      >
        {{ cta.button }}
      </button>
    </a>
  </div>
</template>
