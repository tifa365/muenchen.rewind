<script setup>
import { ref } from 'vue'
import YearThumbnails from './YearThumbnails.vue'
import CompareSelectors from './CompareSelectors.vue'
import MapView from './MapView.vue'
import ComparisonSlider from './ComparisonSlider.vue'

// Verfügbare Jahre
const years = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016,
  2015, 2014, 2013, 2011, 2010, 2009, 2007, 2006, 2004, 2002,
  1953, 1928
]

// State
const compareMode = ref(false)
const selectedYear = ref(2025)
const leftYear = ref(2025)
const rightYear = ref(1953)
const searchQuery = ref('')

// Methods
const setCompareMode = (mode) => {
  compareMode.value = mode
}

const setSelectedYear = (year) => {
  selectedYear.value = year
}

const setLeftYear = (year) => {
  leftYear.value = year
}

const setRightYear = (year) => {
  rightYear.value = year
}
</script>

<template>
  <div class="min-h-screen bg-slate-800">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 px-4 py-3">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <h1 class="text-lg font-light text-gray-700 tracking-wide">
          luftbilder.berlin.codefor.de
        </h1>
        
        <div class="flex items-center gap-4">
          <!-- Toggle Switch -->
          <div class="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              @click="setCompareMode(false)"
              :class="[
                'px-4 py-2 text-sm transition-all',
                !compareMode 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              ]"
            >
              Einzelansicht
            </button>
            <button
              @click="setCompareMode(true)"
              :class="[
                'px-4 py-2 text-sm transition-all',
                compareMode 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              ]"
            >
              Vergleichen
            </button>
          </div>
          
          <!-- Suchfeld -->
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Adresse suchen..." 
            class="px-4 py-2 border-b border-gray-300 bg-transparent w-48 text-sm focus:outline-none focus:border-gray-900"
          />
        </div>
      </div>
    </header>

    <!-- Jahresauswahl -->
    <div class="bg-white border-b border-gray-200 px-4 py-3">
      <div class="max-w-6xl mx-auto">
        <!-- Einzelansicht: Thumbnails -->
        <YearThumbnails
          v-if="!compareMode"
          :years="years"
          :selected-year="selectedYear"
          @select="setSelectedYear"
        />
        
        <!-- Vergleichsmodus: Dropdowns -->
        <CompareSelectors
          v-else
          :years="years"
          :left-year="leftYear"
          :right-year="rightYear"
          @update:left-year="setLeftYear"
          @update:right-year="setRightYear"
        />
      </div>
    </div>

    <!-- Kartenbereich -->
    <main class="relative max-w-6xl mx-auto p-4">
      <!-- Zoom Controls -->
      <div class="absolute left-6 top-6 z-10 flex flex-col gap-1">
        <button class="w-8 h-8 bg-white border border-gray-300 rounded shadow text-lg font-bold text-gray-600 hover:bg-gray-50">
          +
        </button>
        <button class="w-8 h-8 bg-white border border-gray-300 rounded shadow text-lg font-bold text-gray-600 hover:bg-gray-50">
          −
        </button>
      </div>

      <!-- Einzelansicht -->
      <MapView
        v-if="!compareMode"
        :year="selectedYear"
      />
      
      <!-- Vergleichsansicht -->
      <ComparisonSlider
        v-else
        :left-year="leftYear"
        :right-year="rightYear"
      />
    </main>

    <!-- Attribution -->
    <footer class="text-center text-xs text-gray-400 py-4">
      Leaflet | Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin / Digitale farbige Orthophotos (DOP20RGB)
    </footer>
  </div>
</template>
