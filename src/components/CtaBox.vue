<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
  mobile: {
    type: Boolean,
    default: false,
    },
})
</script>

<template>
  <div class="w-[98%] mx-auto bg-white p-2 rounded-xl shadow-md">
  <a
    :href="item.link"
      class="group block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha-pink transition-all duration-300"
  >
    <div
        :class="[
          'flex w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-mocha-base to-mocha-surface shadow-md transition-all duration-300 hover:shadow-lg',
          mobile 
            ? 'h-28 flex-row justify-between text-left px-12 py-6 my-6' 
            : 'h-full aspect-square p-12 text-center'
        ]"
    >
        <div :class="mobile ? 'flex-1 mr-8' : 'w-full mb-8'">
          <h3
            :class="[
              'font-black tracking-tight leading-tight',
              mobile ? 'text-xl' : 'text-2xl lg:text-3xl',
              'drop-shadow-sm',
              'text-mocha-mauve'
            ]"
            style="font-family: 'Inter', 'Segoe UI', 'Roboto', system-ui, sans-serif; color: #cba6f7;"
      >
        {{ item.title }}
      </h3>
        </div>
      <button
          :class="[
            'cta-button flex-shrink-0 rounded-full px-8 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95',
            mobile ? '' : 'group-hover:scale-110'
          ]"
      >
        {{ item.button }}
      </button>
    </div>
  </a>
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

a, button {
  text-decoration: none !important;
}

a:hover, button:hover {
  text-decoration: none !important;
}
</style>
