<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Thumbs, Navigation } from 'swiper/modules'
import { ref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import SquareImage from './SquareImage.vue'
import CtaBox from './CtaBox.vue'
import RectangleHero from './RectangleHero.vue'

// ------------- Props --------------------------------------
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
})

// ------------- State --------------------------------------
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640)
const imageItems = computed(() => props.items.filter((i) => i.type === 'image'))

// Swiper thumbs instance (used only when carouselOnMobile)
const thumbsSwiper = ref(null)
</script>

<template>
  <!-- SQUARE MODE -->
  <div v-if="props.mode === 'square'" class="w-full">
    <!-- »» Mobile carousel with thumbs »» -->
    <div v-if="props.carouselOnMobile && isMobile" class="space-y-4">
      <Swiper
        :modules="[Thumbs, Navigation]"
        :thumbs="{ swiper: thumbsSwiper }"
        :navigation="true"
        :space-between="16"
        class="w-full rounded-2xl shadow-lg"
      >
        <SwiperSlide v-for="(img, i) in imageItems" :key="i">
          <SquareImage :item="img" />
        </SwiperSlide>
      </Swiper>

      <!-- Thumbnails strip -->
      <Swiper
        v-if="imageItems.length > 1"
        @swiper="(swiper) => (thumbsSwiper = swiper)"
        :space-between="8"
        :slides-per-view="Math.min(5, imageItems.length)"
        watch-slides-progress
        class="w-full"
      >
        <SwiperSlide v-for="(img, i) in imageItems" :key="`thumb-${i}`">
          <SquareImage :item="img" thumbnail />
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- »» Desktop 3‑column grid »» -->
    <div v-else class="grid grid-cols-3 gap-4">
      <component
        v-for="(box, i) in props.items"
        :key="i"
        :is="box.type === 'cta' ? CtaBox : SquareImage"
        :item="box"
      />
    </div>
  </div>

  <!-- RECTANGLE MODE -->
  <RectangleHero v-else :items="props.items" />
</template>
