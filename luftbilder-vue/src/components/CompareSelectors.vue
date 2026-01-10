<script setup>
const props = defineProps({
  years: {
    type: Array,
    required: true
  },
  leftYear: {
    type: Number,
    required: true
  },
  rightYear: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:leftYear', 'update:rightYear'])
</script>

<template>
  <div class="flex items-center justify-center gap-6 py-3">
    <!-- Linkes Jahr -->
    <div class="flex flex-col items-center gap-1">
      <label class="text-xs text-gray-500 uppercase tracking-wide">Links</label>
      <select 
        :value="leftYear"
        @change="emit('update:leftYear', Number($event.target.value))"
        class="px-4 py-2 border-b-2 border-gray-900 bg-transparent font-mono text-lg focus:outline-none cursor-pointer"
      >
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>
    
    <!-- VS Trenner -->
    <span class="text-gray-400 text-sm tracking-widest pt-5">— VS —</span>
    
    <!-- Rechtes Jahr -->
    <div class="flex flex-col items-center gap-1">
      <label class="text-xs text-gray-500 uppercase tracking-wide">Rechts</label>
      <select 
        :value="rightYear"
        @change="emit('update:rightYear', Number($event.target.value))"
        class="px-4 py-2 border-b-2 border-gray-900 bg-transparent font-mono text-lg focus:outline-none cursor-pointer"
      >
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>
  </div>
</template>
