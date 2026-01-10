# Muenchen.rewind

Eine Zeitreise aus der Vogelperspektive – Vergleiche historische Luftbilder von München aus verschiedenen Jahren.

## Features

- **Vergleichsmodus**: Zwei Luftbilder nebeneinander mit verschiebbarem Slider
- **Einzelansicht**: Durchblättern aller verfügbaren Jahre
- **Adresssuche**: Finde Orte in München per Nominatim-Suche
- **Verfügbare Jahre**: 2024, 2022, 2021, 2020, 2018, 2015, 2012, 2009, 2006, 2003

## Datenquellen

### GeodatenService München
- **Jahr**: 2021
- **Quelle**: [OpenData Portal München](https://opendata.muenchen.de/)
- **Dienst**: WMS Aktuelle Luftbilder
- **Auflösung**: 20cm
- **Lizenz**: [dl-de-by-2.0](https://www.govdata.de/dl-de/by-2-0)
- **Hinweis**: Nur Stadtgebiet München

Der GeodatenService München bietet leider keine historischen Luftbilder an. Daher werden für die Zeitreise die Daten der Bayerischen Vermessungsverwaltung genutzt.

### Bayerische Vermessungsverwaltung
- **Jahre**: 2024, 2022, 2020, 2018, 2015, 2012, 2009, 2006, 2003
- **Quelle**: [GeodatenOnline Portal](https://geodatenonline.bayern.de/)
- **Dienst**: WMS Historische Digitale Orthophotos
- **Auflösung**: 20cm (ab 2006), 40cm (2003-2005)
- **Lizenz**: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## Entwicklung

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run serve

# Produktions-Build erstellen
npm run build
```

## Inspiration

Eine inspirierte Nachnutzung von [luftbilder.berlin.codefor.de](https://luftbilder.berlin.codefor.de/) des [OK Lab Berlin](https://codefor.de/berlin). <img src="public/favicon.png" width="20" height="20" alt="">

## Technologie

- Vue 3
- Leaflet
- WMS/WMTS Geodienste
