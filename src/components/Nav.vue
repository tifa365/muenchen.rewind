<template>
  <nav>
    <div class="nav-top">
      <div class="nav-left">
        <h1>
          <a v-bind:href="brand.href">{{ brand.text }}</a>
        </h1>

        <div class="info">
          <a href="" @click.prevent="toggleInfo">
            <img :src="iconInfo" alt="Information" />
          </a>
        </div>
      </div>

      <div class="nav-right">
        <div class="mode-toggle">
          <button
            :class="{ active: !compareMode }"
            @click="setCompareMode(false)"
          >Einzelansicht</button>
          <button
            :class="{ active: compareMode }"
            @click="setCompareMode(true)"
          >Vergleichen</button>
        </div>

        <form @submit.prevent="searchLocation()">
          <input class="search-input" type="search" placeholder="Adresse suchen" v-model="searchString" />
        </form>

        <select class="map-select" v-model="currentMapIndex" @update="changeMap(index)">
          <option v-for="(map, index) in maps" :key="index" :value="index">
            {{ map.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="nav-bottom" v-if="!compareMode">
      <a class="map-thumbnail" v-for="(map, index) in maps" :key="index"
           v-bind:style="{ backgroundImage: `url(${getBackgroundImage(map)})` }"
           v-bind:class="{ 'active': index == currentMapIndex }"
           @click.prevent="changeMap(index)">
        <p class="map-year">{{ getYear(map) }}</p>
      </a>
    </div>

    <div class="nav-bottom compare-selectors" v-if="compareMode">
      <div class="compare-select-group">
        <label>Links:</label>
        <select v-model="leftMapIndex" @change="updateCompare">
          <option v-for="(map, index) in maps" :key="index" :value="index">
            {{ map.name }}
          </option>
        </select>
      </div>
      <div class="compare-select-group">
        <label>Rechts:</label>
        <select v-model="rightMapIndex" @change="updateCompare">
          <option v-for="(map, index) in maps" :key="index" :value="index">
            {{ map.name }}
          </option>
        </select>
      </div>
    </div>

    <Info v-if="info" :map="map" @onClose="toggleInfo" />
  </nav>
</template>

<script>
  import Info from './Info'
  import iconInfo from "@/assets/icon-info.svg"

  export default {
    name: 'Nav',
    props: {
      brand: Object,
      maps: Array,
      map: Object,
      compareMode: Boolean,
    },
    components: {
      Info
    },
    setup() {
      return {
        iconInfo
      }
    },
    data() {
      return {
        currentMapIndex: this.maps.indexOf(this.map),
        leftMapIndex: 0,  // 2024
        rightMapIndex: this.maps.length > 1 ? this.maps.length - 1 : 0,  // 2003
        searchString: '',
        info: false
      }
    },
    watch: {
      map: function(map) {
        this.currentMapIndex = this.maps.indexOf(map)
      },
      currentMapIndex: function(index) {
        this.$emit('changeMap', index)
      }
    },
    methods: {
      setCompareMode: function(mode) {
        this.$emit('update:compareMode', mode)
        if (mode) {
          this.updateCompare()
        }
      },
      updateCompare: function() {
        this.$emit('changeCompare', {
          left: this.maps[this.leftMapIndex],
          right: this.maps[this.rightMapIndex]
        })
      },
      searchLocation: function() {
        if (this.searchString) {
          const url = 'https://nominatim.openstreetmap.org/search?format=json&q=Bayern ' + encodeURIComponent(this.searchString)
          fetch(url)
            .then(response => response.json())
            .then(json => {
              if (json.length > 0) {
                this.$emit('changeCenter', [json[0].lat, json[0].lon])
              }
            })
        }
      },
      toggleInfo: function() {
        this.info = !this.info
      },
      changeMap: function(index) {
        this.$emit('changeMap', index)
      },
      getBackgroundImage: function(map) {
        // Use WMS for all thumbnails (2024 layer for 2025/current)
        const bbox = '11.58,48.136,11.61,48.140'
        const layer = map.type === 'wms' ? map.options.layers : 'by_dop_2024_h'
        return `https://geoservices.bayern.de/od/wms/histdop/v1/histdop?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=${layer}&STYLES=&FORMAT=image/jpeg&SRS=EPSG:4326&BBOX=${bbox}&WIDTH=600&HEIGHT=160`
      },
      getYear: function(map) {
        return map.name.split(' ')[1]
      }
    }
  }
</script>

<style lang="scss" scoped>
  $break-point: 576px;

  nav {
    background-color: #f2f2f2;
    padding: 10px;

    .nav-top {
      @media (min-width: $break-point) {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .nav-bottom {
      display: none;
      margin-top: 10px;
      @media (min-width: $break-point) {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: space-between;
      }
    }

    .nav-left,
    .nav-right {
      @media (min-width: $break-point) {
        display: flex;
        align-items: center;
      }
    }

    h1 {
      margin: 0;
      font-weight: normal;

      a {
        text-decoration: none;
      }
    }

    .info {
      display: inline;
      padding-top: 4px;
      margin-left: 10px;

      img {
        height: 26px;
      }
    }

    h1,
    .info {
      @media (max-width: $break-point) {
        display: inline-block;
        margin-bottom: 10px;
      }
    }

    .search-input {
      @media (max-width: $break-point) {
        margin-bottom: 10px;
      }
    }

    .map-select {
      @media (min-width: $break-point) {
        display: none;
      }
    }

    .search-input,
    .map-select {
      padding: 6px;
      border: none;
      border: 1px solid silver;

      width: 100%;
      border-radius: 4px;

      &:focus {
        outline: none;
      }

      @media (min-width: $break-point) {
        width: 400px;
      }
    }

    .map-thumbnail {
      position: relative;
      cursor: pointer;

      border: 2px solid transparent;
      border-radius: 4px;

      background-color: white;
      background-size: cover;
      background-position: center;

      width: 300px;
      height: 80px;

      &:hover {
        opacity: 0.5;
      }

      &.active {
        border-color: #ff645f;
      }
    }

    .map-year {
      color: #ffcc00;
      font-weight: bold;
      text-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
      position: absolute;
      bottom: 2px;
      right: 5px;
      margin: 0;
    }

    .mode-toggle {
      display: flex;
      margin-right: 15px;
      border: 1px solid #ccc;
      border-radius: 4px;
      overflow: hidden;

      button {
        padding: 6px 12px;
        border: none;
        background: white;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;

        &:hover {
          background: #f0f0f0;
        }

        &.active {
          background: #212529;
          color: white;
        }
      }
    }

    .compare-selectors {
      display: flex !important;
      gap: 20px;
      justify-content: center !important;
    }

    .compare-select-group {
      display: flex;
      align-items: center;
      gap: 8px;

      label {
        font-weight: bold;
      }

      select {
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        min-width: 150px;
      }
    }
  }
</style>
