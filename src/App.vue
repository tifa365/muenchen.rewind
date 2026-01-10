<template>
  <Nav
    :brand="brand"
    :maps="maps"
    :map="map"
    :compareMode="compareMode"
    @changeMap="changeMap"
    @changeCenter="changeCenter"
    @update:compareMode="compareMode = $event"
    @changeCompare="changeCompare"
  />
  <Map v-if="!compareMode" :map="map" :center="center" :zoom="zoom" />
  <ComparisonMap
    v-else
    :leftMap="leftMap"
    :rightMap="rightMap"
    :center="center"
    :zoom="zoom"
  />
</template>

<script>
  import Map from './components/Map.vue'
  import ComparisonMap from './components/ComparisonMap.vue'
  import Nav from './components/Nav.vue'

  export default {
    name: 'App',
    data() {
      return {
        brand: this.$config.brand,
        maps: this.$config.maps,
        map: this.$config.maps[0],
        center: this.$config.view.center,
        zoom: this.$config.view.zoom,
        compareMode: true,
        leftMap: this.$config.maps[0],  // 2024
        rightMap: this.$config.maps[this.$config.maps.length - 1]  // 2003
      }
    },
    components: {
      Map,
      ComparisonMap,
      Nav
    },
    methods: {
      changeMap(index) {
        this.map = this.maps[index]
      },
      changeCenter(center) {
        this.center = center
      },
      changeCompare({ left, right }) {
        this.leftMap = left
        this.rightMap = right
      }
    }
  }
</script>

<style lang="scss">
  @font-face {
      font-family: 'apercu-regular-pro';
      src: url('./fonts/apercu-regular-pro.eot');
      src: url('./fonts/apercu-regular-pro.eot?#iefix') format('embedded-opentype'),
           url('./fonts/apercu-regular-pro.woff2') format('woff2'),
           url('./fonts/apercu-regular-pro.woff') format('woff'),
           url('./fonts/apercu-regular-pro.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: apercu-regular-pro, sans-serif;
    color: #212529;
  }
  .app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  a, a.focus, a.hover, a.visited {
    color: #212529;
    text-decoration: underline;
  }
</style>
