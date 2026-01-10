<script setup>
import { computed } from 'vue'

const props = defineProps({
  year: {
    type: Number,
    required: true
  }
})

// Gradient basierend auf Jahr (simuliert Farbunterschiede der Luftbilder)
const gradientClass = computed(() => {
  if (props.year < 1960) return 'from-gray-500 to-gray-400' // Schwarz-Weiß
  if (props.year < 2000) return 'from-emerald-800 to-emerald-600' // Ältere Farbbilder
  return 'from-emerald-600 to-emerald-400' // Moderne Bilder
})
</script>

<template>
  <div 
    :class="[
      'relative w-full h-96 rounded-lg overflow-hidden bg-gradient-to-br transition-all duration-300',
      gradientClass
    ]"
  >
    <!-- Platzhalter für echte Karte (Siegessäule-Symbol) -->
    <div class="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 100 100" class="w-32 h-32 opacity-40">
        <!-- Siegessäule stilisiert -->
        <circle cx="50" cy="50" r="15" fill="currentColor" class="text-yellow-400" />
        <path 
          d="M50 35 L50 15 M50 65 L50 85 M35 50 L15 50 M65 50 L85 50 M35 35 L20 20 M65 35 L80 20 M35 65 L20 80 M65 65 L80 80" 
          stroke="currentColor" 
          stroke-width="3" 
          class="text-gray-600" 
        />
      </svg>
    </div>
    
    <!-- Jahr-Badge -->
    <div class="absolute bottom-4 left-4 bg-white/90 text-gray-900 px-3 py-1 text-sm font-mono rounded">
      {{ year }}
    </div>
    
    <!-- Ortsanzeige -->
    <div class="absolute top-4 left-4 text-white/60 text-sm">
      Tiergarten, Berlin
    </div>

    <!-- Hinweis für Entwicklung -->
    <div class="absolute top-4 right-4 bg-black/50 text-white/80 px-2 py-1 text-xs rounded">
      Platzhalter – hier kommt Leaflet
    </div>
  </div>
</template>
