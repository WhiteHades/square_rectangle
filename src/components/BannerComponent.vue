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
        class="w-full rounded-lg shadow-lg"
      >
        <SwiperSlide v-for="(item, i) in props.items" :key="i">
          <component
            :is="item.type === 'cta' ? CtaBox : SquareImage"
            :item="item"
          />
        </SwiperSlide>
      </Swiper>

      <!-- Thumbnails strip -->
      <Swiper
        v-if="imageItems.length > 1"
        :space-between="8"
        :slides-per-view="Math.min(5, imageItems.length)"
        watch-slides-progress
        class="w-full"
        @swiper="(swiper) => (thumbsSwiper = swiper)"
      >
        <SwiperSlide v-for="(img, i) in imageItems" :key="`thumb-${i}`">
          <SquareImage :item="img" thumbnail />
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- »» Desktop 3‑column grid »» -->
    <div v-else class="grid grid-cols-3 gap-4">
      <component
        :is="box.type === 'cta' ? CtaBox : SquareImage"
        v-for="(box, i) in props.items"
        :key="i"
        :item="box"
      />
    </div>
  </div>

  <!-- RECTANGLE MODE -->
  <RectangleHero v-else :items="props.items" />
</template>
