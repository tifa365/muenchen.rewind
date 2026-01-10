<script setup>
import { ref, computed } from 'vue'
import { useSliderDrag } from '../composables/useSliderDrag'

const props = defineProps({
  leftYear: {
    type: Number,
    required: true
  },
  rightYear: {
    type: Number,
    required: true
  }
})

// Container-Referenz für Drag-Berechnung
const containerRef = ref(null)

// Drag-Logik aus Composable
const { sliderPos, startDrag } = useSliderDrag(containerRef)

// Gradient basierend auf Jahr
const getGradient = (year) => {
  if (year < 1960) return 'from-gray-500 to-gray-400' // Schwarz-Weiß
  if (year < 2000) return 'from-emerald-800 to-emerald-600' // Ältere Farbbilder
  return 'from-emerald-600 to-emerald-400' // Moderne Bilder
}

const leftGradient = computed(() => getGradient(props.leftYear))
const rightGradient = computed(() => getGradient(props.rightYear))

// Clip-Path für linke Seite (schneidet von rechts ab)
const leftClipPath = computed(() => `inset(0 ${100 - sliderPos.value}% 0 0)`)

// Slider-Position als CSS
const sliderStyle = computed(() => ({
  left: `${sliderPos.value}%`,
  transform: 'translateX(-50%)'
}))
</script>

<template>
  <div 
    ref="containerRef"
    class="relative w-full h-96 rounded-lg overflow-hidden cursor-ew-resize select-none"
    @mousedown="startDrag"
    @touchstart.passive="startDrag"
  >
    <!-- ==================== -->
    <!-- RECHTE EBENE (unten) -->
    <!-- ==================== -->
    <div 
      :class="[
        'absolute inset-0 bg-gradient-to-br transition-colors duration-300',
        rightGradient
      ]"
    >
      <!-- Platzhalter-Icon -->
      <div class="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" class="w-32 h-32 opacity-40">
          <circle cx="50" cy="50" r="15" fill="currentColor" class="text-yellow-400" />
          <path 
            d="M50 35 L50 15 M50 65 L50 85 M35 50 L15 50 M65 50 L85 50" 
            stroke="currentColor" 
            stroke-width="3" 
            class="text-gray-600" 
          />
        </svg>
      </div>
      
      <!-- Jahr-Badge (rechts unten) -->
      <div class="absolute bottom-4 right-4 bg-white/90 text-gray-900 px-3 py-1 text-sm font-mono rounded">
        {{ rightYear }}
      </div>
    </div>

    <!-- ==================== -->
    <!-- LINKE EBENE (oben, geclippt) -->
    <!-- ==================== -->
    <div 
      :class="[
        'absolute inset-0 bg-gradient-to-br transition-colors duration-300',
        leftGradient
      ]"
      :style="{ clipPath: leftClipPath }"
    >
      <!-- Platzhalter-Icon -->
      <div class="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" class="w-32 h-32 opacity-40">
          <circle cx="50" cy="50" r="15" fill="currentColor" class="text-yellow-400" />
          <path 
            d="M50 35 L50 15 M50 65 L50 85 M35 50 L15 50 M65 50 L85 50" 
            stroke="currentColor" 
            stroke-width="3" 
            class="text-gray-600" 
          />
        </svg>
      </div>
      
      <!-- Jahr-Badge (links unten) -->
      <div class="absolute bottom-4 left-4 bg-white/90 text-gray-900 px-3 py-1 text-sm font-mono rounded">
        {{ leftYear }}
      </div>
    </div>

    <!-- ==================== -->
    <!-- SLIDER-LINIE & GRIFF -->
    <!-- ==================== -->
    <div 
      class="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none shadow-lg"
      :style="sliderStyle"
    >
      <!-- Minimaler runder Griff -->
      <div 
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200"
      >
        <!-- Horizontale Linie im Griff -->
        <div class="w-4 h-0.5 bg-gray-400 rounded-full"></div>
      </div>
    </div>

    <!-- Anleitung (verschwindet nach erstem Drag) -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white/90 px-3 py-1.5 text-xs rounded-full pointer-events-none">
      ← Ziehen zum Vergleichen →
    </div>
  </div>
</template>

<style scoped>
/* Cursor während dem Ziehen */
.cursor-ew-resize {
  cursor: ew-resize;
}
</style>
