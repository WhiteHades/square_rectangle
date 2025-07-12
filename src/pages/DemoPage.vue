<script setup>
import BannerComponent from '../components/BannerComponent.vue'

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
  <main class="mx-auto max-w-6xl space-y-16 p-6">
    <BannerComponent mode="square" :items="squareItems1" />

    <BannerComponent
      mode="square"
      :carousel-on-mobile="true"
      :items="squareItemsCarousel"
    />

    <BannerComponent mode="rectangle" :items="rectangleItems" />
  </main>
</template>
