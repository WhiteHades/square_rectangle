<script setup>
import { ref, computed } from 'vue'
import { useMotion } from '@vueuse/motion'
import BannerComponent from '../components/BannerComponent.vue'

const viewportMode = ref('desktop')
const canvasRef = ref(null)

const isDesktop = computed(() => {
  const result = viewportMode.value === 'desktop'
  console.log('💻 isDesktop computed:', result, 'viewportMode:', viewportMode.value)
  return result
})
const isMobile = computed(() => {
  const result = viewportMode.value === 'mobile'
  console.log('📱 isMobile computed:', result, 'viewportMode:', viewportMode.value)
  return result
})

const canvasStyles = computed(() => {
  const styles = {
    width: isDesktop.value ? '900px' : '430px',
    height: isDesktop.value ? '600px' : '932px',
    transform: isDesktop.value ? 'scale(1)' : 'scale(0.8)',
  }
  console.log('🎨 canvasStyles computed:', styles)
  return styles
})

const switchViewport = (mode) => {
  console.log('🔄 Switching viewport to:', mode)
  console.log('📊 Current state before switch:', {
    currentMode: viewportMode.value,
    isDesktop: isDesktop.value,
    isMobile: isMobile.value
  })
  
  viewportMode.value = mode
  
  console.log('📊 State after switch:', {
    newMode: viewportMode.value,
    isDesktop: isDesktop.value,
    isMobile: isMobile.value,
    canvasStyles: canvasStyles.value
  })
  
  // Trigger canvas animation
  if (canvasRef.value) {
    console.log('🎬 Triggering canvas animation')
    console.log('🎯 Canvas element classes:', canvasRef.value.className)
    console.log('🎯 Canvas element computed style:', {
      width: window.getComputedStyle(canvasRef.value).width,
      height: window.getComputedStyle(canvasRef.value).height,
      transform: window.getComputedStyle(canvasRef.value).transform
    })
    useMotion(canvasRef.value, {
      initial: { 
        opacity: 0.8, 
        scale: 0.98,
        y: 10
      },
      enter: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: { 
          type: 'spring', 
          stiffness: 300, 
          damping: 20,
          duration: 600
        }
      },
    })
  } else {
    console.log('❌ Canvas ref not found')
  }
}

const squareItems1 = [
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
    link: 'https://example.com/link1',
  },
  {
    type: 'cta',
    title: 'Start Your Journey',
    button: "Let's Go",
    link: 'https://example.com/link2',
  },
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
    link: 'https://example.com/link3',
  },
]

const squareItemsCarousel = [
  {
    type: 'cta',
    title: 'CTA Title',
    button: 'CTA Button',
    link: 'https://example.com/link1',
  },
  ...['004', '007', '149', '133', '143'].map((id) => ({
    type: 'image',
    aspectRatio: 'square',
    src: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`,
    link: 'https://example.com/link2',
  })),
]

const rectangleItems = [
  {
    type: 'image',
    aspectRatio: 'rectangle',
    src: 'https://picsum.photos/1200/400',
    link: 'https://example.com/link1',
  },
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png',
    link: 'https://example.com/link1',
  },
  {
    type: 'cta',
    title: 'Face the Legend',
    button: 'Learn More',
    link: 'https://example.com/link1',
  },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 p-4" style="background: linear-gradient(135deg, #374151 0%, #4b5563 50%, #374151 100%) !important;">
     <div class="mx-auto max-w-6xl min-h-screen flex flex-col justify-center py-8">
      <div class="mb-8 flex justify-center">
        <div style="display: flex; align-items: center; gap: 80px;">
          <button
            @click="switchViewport('desktop')"
            :class="[
              'viewport-button rounded-xl px-8 py-4 text-sm font-semibold transition-all duration-300',
              isDesktop ? 'active' : ''
            ]"
            style="width: 120px; margin: 0;"
          >
            <span>Desktop</span>
          </button>
          
          <button
            @click="switchViewport('mobile')"
            :class="[
              'viewport-button rounded-xl px-8 py-4 text-sm font-semibold transition-all duration-300',
              isMobile ? 'active' : ''
            ]"
            style="width: 120px; margin: 0;"
          >
            <span>Mobile</span>
          </button>
        </div>
      </div>

      <div class="flex justify-center">
        <div
          ref="canvasRef"
          :class="[
            'canvas-container bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm shadow-2xl border border-white/30 transition-all duration-700 ease-out overflow-hidden',
            isDesktop ? 'desktop-viewport' : 'mobile-viewport'
          ]"
        >
          <div class="content-area h-full overflow-y-auto p-4 custom-scrollbar">
            <div class="space-y-8">
              <BannerComponent mode="square" :items="squareItems1" :force-mobile="isMobile" />
              <BannerComponent mode="square" :carousel-on-mobile="true" :items="squareItemsCarousel" :force-mobile="isMobile" />
              <BannerComponent mode="rectangle" :items="rectangleItems" :force-mobile="isMobile" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(body) {
  background: linear-gradient(135deg, #374151 0%, #4b5563 50%, #374151 100%) !important;
}

.canvas-container {
  border-radius: 12px;
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.content-area {
  border-radius: 12px;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
}

@media (prefers-color-scheme: dark) {
  .content-area {
    background: linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%);
  }
}

.desktop-viewport {
  width: 900px !important;
  height: 600px !important;
  transform: scale(1) !important;
  margin-top: 32px !important;
}

.mobile-viewport {
  width: 420px !important;
  height: 780px !important;
  transform: scale(0.85) !important;
  border-radius: 20px;
  box-shadow: 
    0 30px 60px -12px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  margin-top: 32px !important;
}

.mobile-viewport .content-area {
  border-radius: 20px;
}

.viewport-button {
  background: linear-gradient(135deg, #b4befe 0%, #89b4fa 100%) !important;
  color: #1e1e2e !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  font-family: 'Inter', 'Segoe UI', 'Roboto', system-ui, sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 4px 12px rgba(180, 190, 254, 0.3) !important;
  opacity: 0.7;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
}

.viewport-button:hover {
  background: linear-gradient(135deg, #cba6f7 0%, #b4befe 100%) !important;
  color: #1e1e2e !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(203, 166, 247, 0.4) !important;
  opacity: 0.9;
}

.viewport-button.active {
  opacity: 1 !important;
  transform: scale(1.05) !important;
  box-shadow: 0 8px 20px rgba(180, 190, 254, 0.5) !important;
}

.viewport-button:active {
  transform: translateY(0) !important;
  box-shadow: 0 2px 6px rgba(180, 190, 254, 0.3) !important;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 2px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #b4befe 0%, #89b4fa 100%);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #cba6f7 0%, #b4befe 100%);
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #b4befe rgba(255, 255, 255, 0.1);
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #f5c2e7 !important;
  width: 40px !important;
  height: 40px !important;
  margin-top: -20px !important;
  z-index: 10 !important;
  background: rgba(30, 30, 46, 0.8) !important;
  border-radius: 50% !important;
  cursor: pointer !important;
  pointer-events: auto !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s ease !important;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 18px !important;
  font-weight: 600 !important;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(30, 30, 46, 0.9) !important;
  transform: scale(1.1) !important;
}

:deep(.swiper-button-disabled) {
  opacity: 0.3 !important;
  cursor: not-allowed !important;
}

:deep(.swiper-slide) {
  height: auto !important;
}

:deep(.swiper-slide a) {
  display: block;
  width: 100%;
  height: 100%;
}

:deep(.swiper-slide-thumb-active) {
  opacity: 1 !important;
  border: 2px solid #f5c2e7 !important;
  border-radius: 0.5rem !important;
}

:deep(.thumbnails-swiper .swiper-slide) {
  height: 60px !important;
  width: 60px !important;
}

:deep(.thumbnails-swiper .swiper-wrapper) {
  justify-content: center !important;
  margin: 0 auto !important;
}

:deep(.swiper-wrapper) {
  height: auto !important;
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

:deep(a), :deep(button) {
  text-decoration: none !important;
}

:deep(a:hover), :deep(button:hover) {
  text-decoration: none !important;
}
</style>

