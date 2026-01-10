<script setup>
const props = defineProps({
  years: {
    type: Array,
    required: true
  },
  selectedYear: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['select'])

// Farbe basierend auf Jahr (für Thumbnail-Hintergrund)
const getYearColor = (year) => {
  if (year < 1960) return 'bg-gray-400'
  if (year < 2000) return 'bg-emerald-700'
  return 'bg-emerald-500'
}
</script>

<template>
  <div class="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
    <button
      v-for="year in years"
      :key="year"
      @click="emit('select', year)"
      :class="[
        'flex-shrink-0 px-3 py-2 text-sm rounded transition-all',
        year === selectedYear
          ? 'bg-gray-900 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      ]"
    >
      {{ year }}
    </button>
  </div>
</template>

<style scoped>
/* Optional: Verstecke Scrollbar aber erhalte Scroll-Funktion */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}
</style>
