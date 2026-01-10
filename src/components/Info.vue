<template>
  <div class="modal">
    <a href="" class="close" @click.prevent="handleClose">&times;</a>
    <p>
      <strong>Muenchen.rewind</strong> – Eine Zeitreise von oben.
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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2000;

    background-color: #f2f2f2;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.3);
    border-radius: 8px;

    padding: 20px 30px 30px 30px;
    max-width: 500px;
    width: 90%;

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
