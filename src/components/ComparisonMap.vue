<template>
  <div class="comparison-container" ref="container">
    <div class="map-layer" id="comparisonMap"></div>

    <!-- Year labels (only show after loading) -->
    <template v-if="!isLoading">
      <div class="year-label left" :style="{ right: `${100 - sliderPos + 2}%` }">
        {{ getYear(leftMap) }}
      </div>
      <div class="year-label right" :style="{ left: `${sliderPos + 2}%` }">
        {{ getYear(rightMap) }}
      </div>
    </template>

    <!-- Loading overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <span>Lade Luftbilder...</span>
    </div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-side-by-side'

export default {
  name: 'ComparisonMap',
  props: {
    leftMap: Object,
    rightMap: Object,
    center: Array,
    zoom: Number
  },
  data() {
    return {
      leafletMap: null,
      leftLayer: null,
      rightLayer: null,
      sideBySide: null,
      sliderPos: 50,
      leftLoaded: false,
      rightLoaded: false
    }
  },
  computed: {
    isLoading() {
      return !this.leftLoaded || !this.rightLoaded
    }
  },
  methods: {
    setupMap() {
      this.leafletMap = L.map('comparisonMap', {
        zoomSnap: 0.5,
        zoomAnimation: true,
        zoomControl: false,
        minZoom: 8
      }).setView(this.center, this.zoom)

      L.control.zoom({ position: 'bottomright' }).addTo(this.leafletMap)

      this.updateLayers()

      // Track slider position for year labels
      this.leafletMap.on('move', this.updateSliderPos)
    },
    updateSliderPos() {
      const slider = this.$refs.container?.querySelector('.leaflet-sbs-divider')
      if (slider) {
        const container = this.$refs.container
        const rect = container.getBoundingClientRect()
        const sliderRect = slider.getBoundingClientRect()
        this.sliderPos = ((sliderRect.left - rect.left + sliderRect.width / 2) / rect.width) * 100
      }
    },
    updateLayers() {
      // Reset loading state
      this.leftLoaded = false
      this.rightLoaded = false

      // Remove old side-by-side control and layers
      if (this.sideBySide) {
        this.sideBySide.remove()
        this.sideBySide = null
      }
      if (this.leftLayer) {
        this.leafletMap.removeLayer(this.leftLayer)
      }
      if (this.rightLayer) {
        this.leafletMap.removeLayer(this.rightLayer)
      }

      // Create new layers
      this.leftLayer = this.createLayer(this.leftMap)
      this.rightLayer = this.createLayer(this.rightMap)

      // Track loading
      this.leftLayer.on('load', () => { this.leftLoaded = true })
      this.rightLayer.on('load', () => { this.rightLoaded = true })

      // Add layers to map
      this.leftLayer.addTo(this.leafletMap)
      this.rightLayer.addTo(this.leafletMap)
    },
    addSideBySideControl() {
      if (this.sideBySide) return

      // Create side-by-side control
      this.sideBySide = L.control.sideBySide(this.leftLayer, this.rightLayer).addTo(this.leafletMap)

      // Update slider position after control is added
      this.$nextTick(() => {
        this.updateSliderPos()
        // Listen for slider drag
        const slider = this.$refs.container?.querySelector('.leaflet-sbs-divider')
        if (slider) {
          const observer = new MutationObserver(() => this.updateSliderPos())
          observer.observe(slider, { attributes: true, attributeFilter: ['style'] })
        }
      })
    },
    createLayer(map) {
      if (map.type === 'wms') {
        return L.tileLayer.wms(map.url, map.options)
      }
      return L.tileLayer(map.url, map.options)
    },
    getYear(map) {
      return map?.name?.split(' ')[1] || ''
    }
  },
  watch: {
    isLoading(loading) {
      if (!loading) {
        this.addSideBySideControl()
      }
    },
    leftMap() {
      if (this.leafletMap) this.updateLayers()
    },
    rightMap() {
      if (this.leafletMap) this.updateLayers()
    },
    center(newCenter) {
      this.leafletMap?.setView(newCenter, this.zoom)
    }
  },
  mounted() {
    this.setupMap()
  },
  beforeUnmount() {
    if (this.leafletMap) this.leafletMap.remove()
  }
}
</script>

<style scoped>
.comparison-container {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.map-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.year-label {
  position: absolute;
  bottom: 20px;
  background: rgba(0,0,0,0.7);
  color: #ffcc00;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 18px;
  z-index: 1000;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
  pointer-events: none;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  color: white;
  font-size: 16px;
  gap: 15px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FF645F;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

<style>
/* Override leaflet-side-by-side slider styles */
.leaflet-sbs-divider {
  width: 4px !important;
  background: white !important;
  box-shadow: 0 0 10px rgba(0,0,0,0.5) !important;
}

.leaflet-sbs-range {
  cursor: ew-resize;
}
</style>
