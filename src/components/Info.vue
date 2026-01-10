<template>
  <div class="modal">
    <a href="" class="close" @click.prevent="handleClose">&times;</a>
    <p>
      <strong>Muenchen.rewind</strong> – Eine Zeitreise von oben.
    </p>
    <p>
      Die aktuelle Karte zeigt <span v-html="map.options.attribution"></span>.
    </p>
    <p>
      Die Luftbilder stammen aus dem <a href="https://geodatenonline.bayern.de/">GeodatenOnline Portal</a> der <a href="https://www.ldbv.bayern.de/">Bayerischen Vermessungsverwaltung</a> und stehen als Open Data zur Verfügung.
    </p>
    <p>
      Inspiriert von <a href="https://luftbilder.berlin.codefor.de">luftbilder.berlin.codefor.de</a> des <a href="https://codefor.de/berlin">OK Lab Berlin</a>.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'Info',
    props: {
      map: Object,
      onClose: Function
    },
    methods: {
      handleClose: function() {
        this.$emit('onClose')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    position: absolute;
    top: 20%;
    right: 20%;
    left: 20%;
    z-index: 2000;

    background-color: #f2f2f2;
    box-shadow: 0px 0px 10px silver;

    padding: 10px 20px 20px 20px;

    pre {
      background-color: #333;
      color: white;

      white-space: pre-wrap;
      word-wrap: break-word;

      margin: 0;
      padding: 10px;
      border-radius: 4px;
    }

    .close {
      float: right;
      text-decoration: none;
    }

    :last-child {
      margin-bottom: 0;
    }
  }
</style>
