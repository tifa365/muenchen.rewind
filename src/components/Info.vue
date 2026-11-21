<template>
  <div class="modal">
    <a href="" class="close" @click.prevent="handleClose">&times;</a>
    <p>
      <strong>Muenchen.rewind</strong> – Eine Zeitreise aus der Vogelperspektive.
    </p>
    <p>
      Vergleiche historische Luftbilder von München aus verschiedenen Jahren. Ziehe den Slider nach links oder rechts, um Veränderungen zwischen den Jahren zu entdecken.
    </p>
    <p>
      <strong>Datenquellen:</strong>
    </p>
    <ul>
      <li>Die Luftbilder 1960, 1965, 1970, 1976, 1984, 1993, 1999, 2008, 2013, 2017, 2019, 2021 und 2023 stammen vom <a href="https://geoportal.muenchen.de/portal/luftbilder/">GeodatenService München</a> (<a href="https://www.govdata.de/dl-de/by-2-0">dl-de-by-2.0</a>). Sie zeigen nur das Stadtgebiet; außerhalb bleibt die Karte leer.</li>
      <li>Die Luftbilder 2003, 2006, 2009, 2012, 2015, 2018, 2020, 2022 und 2024 stammen aus dem <a href="https://geodatenonline.bayern.de/">GeodatenOnline Portal</a> der <a href="https://www.ldbv.bayern.de/">Bayerischen Vermessungsverwaltung</a> (CC BY 4.0).</li>
    </ul>
    <p>
      Eine inspirierte Nachnutzung von <a href="https://luftbilder.berlin.codefor.de">luftbilder.berlin.codefor.de</a> des <a href="https://codefor.de/berlin">OK Lab Berlin</a>.
    </p>
    <p>
      <a href="https://github.com/tifa365/muenchen.rewind" class="github-link">
        <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        GitHub
      </a>
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
    top: calc(50% + 30px);
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

    .github-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #212529;
      &:hover {
        opacity: 0.7;
      }
    }

    :last-child {
      margin-bottom: 0;
    }
  }
</style>
