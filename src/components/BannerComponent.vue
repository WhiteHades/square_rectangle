<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Thumbs, Navigation, FreeMode } from 'swiper/modules'
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useWindowSize } from '@vueuse/core'
import SquareImage from './SquareImage.vue'
import CtaBox from './CtaBox.vue'
import RectangleHero from './RectangleHero.vue'

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: (val) => ['square', 'rectangle'].includes(val),
  },
  carouselOnMobile: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    required: true,
  },
  forceMobile: {
    type: Boolean,
    default: false,
  },
})

const { width } = useWindowSize()
const isMobile = computed(() => props.forceMobile || width.value < 768)
const imageItems = computed(() => props.items.filter((i) => i.type === 'image'))
const ctaItems = computed(() => props.items.filter((i) => i.type === 'cta'))

const thumbsSwiper = ref(null)
const mainSwiper = ref(null)
const activeSlideIndex = ref(0)
const shouldShowCarousel = computed(() => props.carouselOnMobile && isMobile.value)
const forceRender = ref(0)

let resizeObserver = null
onMounted(() => {
  updateLayout()
  
  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      updateLayout()
    })
    resizeObserver.observe(document.body)
  } else {
    window.addEventListener('resize', updateLayout)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  } else {
    window.removeEventListener('resize', updateLayout)
  }
})

const updateLayout = () => {
  forceRender.value++
  destroySwipers()
}

const destroySwipers = () => {
  if (mainSwiper.value) {
    mainSwiper.value.destroy(true, true)
    mainSwiper.value = null
  }
  if (thumbsSwiper.value) {
    thumbsSwiper.value.destroy(true, true)
    thumbsSwiper.value = null
  }
}

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const setMainSwiper = (swiper) => {
  mainSwiper.value = swiper
}

const onSlideChange = (swiper) => {
  activeSlideIndex.value = swiper.activeIndex
}

watch([isMobile, () => props.carouselOnMobile, () => props.forceMobile], () => {
  updateLayout()
}, { immediate: true })
</script>

<template>
  <div v-if="props.mode === 'square'" class="w-full mb-12 bg-white p-6 rounded-xl shadow-md" :key="forceRender">
    <div v-if="shouldShowCarousel" class="space-y-12 px-2 sm:px-6">
      <div class="relative rounded-xl overflow-hidden bg-white shadow-md">
      <Swiper
        :modules="[Thumbs, Navigation]"
        :thumbs="{ swiper: thumbsSwiper }"
          :navigation="{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }"
        :space-between="16"
          :allow-touch-move="true"
          :slides-per-view="1"
          :loop="false"
          class="w-full rounded-xl main-swiper"
          @swiper="setMainSwiper"
          @slide-change="onSlideChange"
      >
          <SwiperSlide v-for="(item, i) in imageItems" :key="`main-${i}`" class="rounded-xl overflow-hidden">
            <SquareImage :item="item" :mobile="true" />
        </SwiperSlide>
          
          <template #container-end>
            <div class="swiper-button-next absolute right-2 z-10"></div>
            <div class="swiper-button-prev absolute left-2 z-10"></div>
          </template>
      </Swiper>
      </div>

      <div v-if="imageItems.length > 1" class="px-4 flex justify-center bg-white rounded-xl shadow-md py-4 mt-8">
        <div class="max-w-xs mx-auto w-full">
      <Swiper
            :modules="[FreeMode]"
            :space-between="12"
            :slides-per-view="Math.min(4, imageItems.length)"
            :free-mode="true"
            :watch-slides-progress="true"
            :center-insufficient-slides="true"
            class="w-full thumbnails-swiper"
            @swiper="setThumbsSwiper"
      >
            <SwiperSlide 
              v-for="(img, i) in imageItems" 
              :key="`thumb-${i}`"
              class="cursor-pointer transition-all duration-300 rounded-lg opacity-70 hover:opacity-90"
            >
              <SquareImage :item="img" :thumbnail="true" />
        </SwiperSlide>
      </Swiper>
        </div>
      </div>

      <div v-if="ctaItems.length > 0" class="space-y-4 px-8">
        <CtaBox
          v-for="(cta, i) in ctaItems"
          :key="`cta-${i}`"
          :item="cta"
          :mobile="true"
        />
      </div>
    </div>

    <div v-else-if="isMobile" class="space-y-6 px-8">
      <component
        :is="box.type === 'cta' ? CtaBox : SquareImage"
        v-for="(box, i) in props.items"
        :key="i"
        :item="box"
        :mobile="true"
      />
    </div>

    <div v-else class="grid grid-cols-3 gap-8 px-2 sm:px-0">
      <component
        :is="box.type === 'cta' ? CtaBox : SquareImage"
        v-for="(box, i) in props.items"
        :key="i"
        :item="box"
        :mobile="false"
      />
    </div>
  </div>

  <RectangleHero v-else :items="props.items" :force-mobile="props.forceMobile" />
</template>

<style scoped>
.main-swiper {
  border-radius: 12px;
  overflow: hidden;
}

.main-swiper .swiper-slide {
  border-radius: 12px;
  overflow: hidden;
}

.thumbnails-swiper {
  height: 80px;
  padding: 8px 0;
}

.thumbnails-swiper .swiper-wrapper {
  justify-content: center;
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

.thumbnails-swiper .swiper-slide {
  width: 64px !important;
  height: 64px !important;
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  opacity: 0.7;
}

.thumbnails-swiper .swiper-slide:hover {
  opacity: 0.9;
}

.thumbnails-swiper .swiper-slide-thumb-active {
  opacity: 1 !important;
  transform: scale(1.05);
  box-shadow: 
    0 0 0 2px #f5c2e7,
    0 0 8px rgba(245, 194, 231, 0.4);
}
</style>
