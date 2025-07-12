<script setup>
import Banner from '../components/Banner.vue';

const squareItems1 = [
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?1',
    link: 'https://example.com/link1'
  },
  {
    type: 'cta',
    title: 'CTA Title',
    button: 'CTA Button',
    link: 'https://example.com/link2'
  },
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?2',
    link: 'https://example.com/link3'
  }
]

const squareItemsCarousel = [
  {
    type: 'cta',
    title: 'CTA Title',
    button: 'CTA Button',
    link: 'https://example.com/link1'
  },
  ...Array.from({ length: 5 }).map((_, i) => ({
    type: 'image',
    aspectRatio: 'square',
    src: `https://picsum.photos/400?c${i}`,
    link: 'https://example.com/link2'
  }))
];

const rectangleItems = [
  {
    type: 'image',
    aspectRatio: 'rectangle',
    src: 'https://picsum.photos/1200/400',
    link: 'https://example.com/link1'
  },
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?r',
    link: 'https://example.com/link1'
  },
  {
    type: 'cta',
    title: 'CTA Title',
    button: 'CTA Button',
    link: 'https://example.com/link1'
  }
];

</script>


<template>
  <main class="mx-auto max-w-6xl space-y-16 p-6">
    <Banner mode="square" :items="squareItems1" />

    <Banner mode="square" :carousel-on-mobile="true" :items="squareItemsCarousel" />

    <Banner mode="rectangle" :items="rectangleItems" />
  </main>
</template>
