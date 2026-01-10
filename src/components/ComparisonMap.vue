<template>
  <div class="comparison-container" ref="container">
    <!-- Right map (bottom layer) -->
    <div class="map-layer right-map" id="rightMap"></div>

    <!-- Left map (top layer, clipped) -->
    <div
      class="map-layer left-map"
      id="leftMap"
      :style="{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }"
    ></div>

    <!-- Slider line and handle -->
    <div
      class="slider-line"
      :style="{ left: `${sliderPos}%` }"
      @mousedown="startDrag"
      @touchstart.passive="startDrag"
    >
      <div class="slider-handle">
        <span class="handle-icon">⟷</span>
      </div>
    </div>

    <!-- Year labels -->
    <div class="year-label left" :style="{ right: `${100 - sliderPos + 2}%` }">
      {{ getYear(leftMap) }}
    </div>
    <div class="year-label right" :style="{ left: `${sliderPos + 2}%` }">
      {{ getYear(rightMap) }}
    </div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

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
      leftLeaflet: null,
      rightLeaflet: null,
      leftLayer: null,
      rightLayer: null,
      sliderPos: 50,
      isDragging: false,
      isSyncing: false
    }
  },
  methods: {
    setupMaps() {
      // Create right map (base layer)
      this.rightLeaflet = L.map('rightMap', {
        zoomControl: false
      }).setView(this.center, this.zoom)

      // Create left map (clipped layer)
      this.leftLeaflet = L.map('leftMap', {
        zoomControl: false
      }).setView(this.center, this.zoom)

      // Add zoom control only to right map
      L.control.zoom({ position: 'bottomright' }).addTo(this.rightLeaflet)

      // Sync maps
      this.rightLeaflet.on('move', this.syncLeftToRight)
      this.leftLeaflet.on('move', this.syncRightToLeft)

      this.updateLayers()
    },
    syncLeftToRight() {
      if (this.isSyncing) return
      this.isSyncing = true
      this.leftLeaflet.setView(this.rightLeaflet.getCenter(), this.rightLeaflet.getZoom(), { animate: false })
      this.isSyncing = false
    },
    syncRightToLeft() {
      if (this.isSyncing) return
      this.isSyncing = true
      this.rightLeaflet.setView(this.leftLeaflet.getCenter(), this.leftLeaflet.getZoom(), { animate: false })
      this.isSyncing = false
    },
    updateLayers() {
      // Remove old layers
      if (this.leftLayer) this.leftLeaflet.removeLayer(this.leftLayer)
      if (this.rightLayer) this.rightLeaflet.removeLayer(this.rightLayer)

      // Add new layers
      this.leftLayer = this.createLayer(this.leftMap).addTo(this.leftLeaflet)
      this.rightLayer = this.createLayer(this.rightMap).addTo(this.rightLeaflet)
    },
    createLayer(map) {
      if (map.type === 'wms') {
        return L.tileLayer.wms(map.url, map.options)
      }
      return L.tileLayer(map.url, map.options)
    },
    getYear(map) {
      return map?.name?.split(' ')[1] || ''
    },
    startDrag() {
      this.isDragging = true
      document.addEventListener('mousemove', this.onDrag)
      document.addEventListener('mouseup', this.stopDrag)
      document.addEventListener('touchmove', this.onDrag)
      document.addEventListener('touchend', this.stopDrag)
    },
    onDrag(e) {
      if (!this.isDragging) return
      const container = this.$refs.container
      const rect = container.getBoundingClientRect()
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const x = clientX - rect.left
      this.sliderPos = Math.max(0, Math.min(100, (x / rect.width) * 100))
    },
    stopDrag() {
      this.isDragging = false
      document.removeEventListener('mousemove', this.onDrag)
      document.removeEventListener('mouseup', this.stopDrag)
      document.removeEventListener('touchmove', this.onDrag)
      document.removeEventListener('touchend', this.stopDrag)
    }
  },
  watch: {
    leftMap() {
      this.updateLayers()
    },
    rightMap() {
      this.updateLayers()
    },
    center(newCenter) {
      this.rightLeaflet?.setView(newCenter, this.zoom)
    }
  },
  mounted() {
    this.setupMaps()
  },
  beforeUnmount() {
    if (this.leftLeaflet) this.leftLeaflet.remove()
    if (this.rightLeaflet) this.rightLeaflet.remove()
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

.left-map {
  z-index: 2;
  pointer-events: none;
}

.right-map {
  z-index: 1;
}

.slider-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: white;
  transform: translateX(-50%);
  z-index: 10;
  cursor: ew-resize;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.slider-handle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  cursor: ew-resize;
}

.handle-icon {
  font-size: 18px;
  color: #333;
  user-select: none;
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
  z-index: 5;
  text-shadow: 1px 1px 0 #000;
}

.year-label.left {
  /* positioned dynamically */
}

.year-label.right {
  /* positioned dynamically */
}
</style>
