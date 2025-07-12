<script setup>
import { useMotion } from '@vueuse/motion';
import { onMounted, ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const box = ref(null);

onMounted(() => {
  if (box.value) {
    useMotion(box, {
      initial: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    });
  }
});
</script>

<template>
  <a :href="props.item.link" class="group block">
    <div ref="box"
      class="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-xl lg:aspect-square lg:p-10">
      <h3 class="mb-4 text-xl font-semibold tracking-tight md:text-2xl">
        {{ props.item.title }}
      </h3>
      <button
        class="rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition-colors duration-300 group-hover:bg-gray-800">
        {{ props.item.button }}
      </button>
    </div>
  </a>
</template>
