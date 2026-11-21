# Muenchen.rewind

Eine Zeitreise aus der Vogelperspektive – Vergleiche historische Luftbilder von München aus verschiedenen Jahren.

## Features

- **Vergleichsmodus**: Zwei Luftbilder nebeneinander mit verschiebbarem Slider
- **Einzelansicht**: Durchblättern aller verfügbaren Jahre
- **Adresssuche**: Finde Orte in München per Nominatim-Suche
- **Verfügbare Jahre**: 1960, 1965, 1970, 1976, 1984, 1993, 1999, 2003, 2006, 2008, 2009, 2012, 2013, 2015, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024

## Datenquellen

### GeodatenService München
- **Jahre**: 1960, 1965, 1970, 1976, 1984, 1993, 1999, 2008, 2013, 2017, 2019, 2021, 2023
- **Quelle**: [Geoportal München](https://geoportal.muenchen.de/portal/luftbilder/) / [OpenData Portal München](https://opendata.muenchen.de/)
- **Dienst**: WMS `https://geoportal.muenchen.de/geoserver/gsm/wms` (Layer `gsm:luftbild_<Jahr>`, 2017/2019 `gsm:<Jahr>_RGB_20cm_bmpyramid`, 2023 `gsm:luftbild_2023_20cm`); 2021 über den WMS Aktuelle Luftbilder (`gsm/luftbild/ows`)
- **Auflösung**: 20cm (2017, 2019, 2021, 2023)
- **Lizenz**: [dl-de-by-2.0](https://www.govdata.de/dl-de/by-2-0)
- **Hinweis**: Nur Stadtgebiet München – außerhalb der Stadtgrenze bleiben diese Jahre leer. Die Bilder von 1960 bis 1993 sind schwarz-weiß.

Die Stadt liefert historische Luftbilder von 1960 bis 2023. Die übrigen Jahre (und das Umland) kommen von der Bayerischen Vermessungsverwaltung.

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

Eine inspirierte Nachnutzung von [luftbilder.berlin.codefor.de](https://luftbilder.berlin.codefor.de/) des [OK Lab Berlin](https://codefor.de/berlin).

## Technologie

- Vue 3
- Leaflet
- WMS/WMTS Geodienste
