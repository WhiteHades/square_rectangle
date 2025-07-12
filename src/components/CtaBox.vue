<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// Animation
const motion = {
  initial: { opacity: 0, y: 40 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 25,
      mass: 0.5,
    },
  },
}
</script>

<template>
  <a
    v-motion="motion"
    :href="item.link"
    class="group block h-full rounded-gl focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-blue"
  >
    <div
      class="flex h-full w-full flex-col items-center justify-center rounded-gl bg-white p-6 text-center shadow-lg ring-1 ring-inset ring-slate-200/50 transition-shadow duration-300 hover:shadow-xl lg:aspect-square lg:p-10"
    >
      <h3
        class="mb-4 text-xl font-semibold tracking-tight text-slate-800 md:text-2xl"
      >
        {{ item.title }}
      </h3>
      <button
        class="rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-red-500 group-hover:text-white"
      >
        {{ item.button }}
      </button>
    </div>
  </a>
</template>
