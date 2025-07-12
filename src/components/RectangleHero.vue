<script setup>
import { ref, computed, onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useMotion } from '@vueuse/motion'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  forceMobile: {
    type: Boolean,
    default: false,
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
const isMobile = computed(() => props.forceMobile || width.value < 768)

const hero = ref(null)

onMounted(() => {
  if (hero.value) {
    useMotion(hero.value, {
      initial: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0, transition: { type: 'spring', delay: 100 } },
    })
  }
  
  console.log('Mobile detection:', isMobile.value, 'Width:', width.value, 'Force Mobile:', props.forceMobile)
  console.log('Items:', props.items)
  console.log('CTA:', cta.value)
  console.log('RectImg:', rectImg.value)
  console.log('SquareImg:', squareImg.value)
  console.log('Should render desktop:', !isMobile.value && cta.value && rectImg.value && squareImg.value)
})
</script>

<template>
  <div ref="hero" class="w-full mb-12">
    <div v-if="!isMobile" class="p-8">
      <div class="relative w-full rounded-xl shadow-md">
        <!-- Background Image -->
        <a
          :href="rectImg?.link || '#'"
          class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha-pink rounded-xl transition-all duration-300 hover-glow-rect overflow-hidden"
        >
          <img
            :src="rectImg?.src || 'https://picsum.photos/1200/400'"
            alt="Wide-screen hero image"
            class="w-full h-auto object-cover rounded-xl"
            loading="lazy"
            decoding="async"
          />
        </a>
        
        <!-- Dark Overlay -->
        <div class="absolute inset-0 bg-black/30 rounded-xl pointer-events-none"></div>

        <!-- CTA Overlay -->
        <div 
          class="absolute top-1/2 transform -translate-y-1/2 w-72 p-8"
          style="z-index: 9999 !important; left: 120px;"
        >
          <h3 class="mb-8 text-2xl font-black tracking-tight leading-tight drop-shadow-sm inline-block px-4 py-2 rounded-xl" style="font-family: 'Inter', 'Segoe UI', 'Roboto', system-ui, sans-serif; color: #cba6f7; background: #1e1e2e;">
            {{ cta?.title || 'Face the Legend' }}
          </h3>
          <div>
            <a
              :href="cta?.link || '#'"
              class="cta-button w-full rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 inline-block text-center"
            >
              {{ cta?.button || 'Learn More' }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="space-y-8 px-16 my-8 pb-12" data-mobile-layout="true">
      <a
        :href="squareImg.link"
        class="relative block w-full overflow-hidden rounded-xl shadow-md bg-gradient-to-br from-mocha-surface to-mocha-base transition-all duration-300 hover-glow-mobile focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha-pink"
      >
        <img
          :src="squareImg.src"
          alt="Square hero image for mobile"
          class="h-auto w-full object-contain aspect-square rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110"
          loading="lazy"
          decoding="async"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-mocha-base/70 to-mocha-surface/70 opacity-20 rounded-xl pointer-events-none"></div>
      </a>

      <a
        :href="cta.link"
        class="flex w-full items-center justify-between rounded-xl bg-gradient-to-br from-mocha-base to-mocha-surface p-16 shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha-pink"
      >
        <span class="font-black text-2xl drop-shadow-sm" style="font-family: 'Inter', 'Segoe UI', 'Roboto', system-ui, sans-serif; color: #cba6f7;">{{ cta.title }}</span>
        <button
          class="cta-button ml-12 flex-shrink-0 rounded-full px-10 py-4 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95"
        >
          {{ cta.button }}
        </button>
      </a>
    </div>
  </div>
</template>

<style scoped>
.cta-button {
  background: linear-gradient(135deg, #b4befe 0%, #89b4fa 100%) !important;
  color: #1e1e2e !important;
  border: 3px solid rgba(255, 255, 255, 0.4) !important;
  font-family: 'Inter', 'Segoe UI', 'Roboto', system-ui, sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  font-size: 0.875rem !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 4px 12px rgba(180, 190, 254, 0.3) !important;
}

.cta-button:hover {
  background: linear-gradient(135deg, #cba6f7 0%, #b4befe 100%) !important;
  color: #1e1e2e !important;
  border-color: rgba(255, 255, 255, 0.6) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(203, 166, 247, 0.4) !important;
}

.cta-button:active {
  transform: translateY(0) !important;
  box-shadow: 0 2px 8px rgba(180, 190, 254, 0.3) !important;
}

.hover-glow-rect:hover {
  box-shadow: 
    0 0 25px rgba(245, 194, 231, 0.4),
    0 0 50px rgba(245, 194, 231, 0.2),
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 0 0 2px rgba(245, 194, 231, 0.6);
  border-radius: 0.75rem !important;
}

.hover-glow-mobile:hover {
  box-shadow: 
    0 0 20px rgba(245, 194, 231, 0.4),
    0 0 40px rgba(245, 194, 231, 0.2),
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 0 0 3px rgba(245, 194, 231, 0.6);
  border-radius: 0.75rem !important;
}

:deep(img) {
  border-radius: inherit !important;
  clip-path: inherit !important;
}

:deep(.rounded-xl img),
:deep(.rounded-lg img),
:deep([class*="rounded"] img) {
  border-radius: inherit !important;
}

:deep(div[class*="rounded"] > img),
:deep(a[class*="rounded"] > img) {
  border-radius: inherit !important;
}

a, button {
  text-decoration: none !important;
}

a:hover, button:hover {
  text-decoration: none !important;
}
</style>
