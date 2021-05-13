# maiia-checker

Un script _quick and dirty_ pour automatiquement vérifier si un créneau de
vaccination est disponible aujourd'hui ou demain sur des centres de vaccination
gérés par [Maiia](https://www.maiia.com).

## Installation

```
git clone https://github.com/dpobel/maiia-checker
npm i
```

## Utilisation

Il suffit de lancer `npm start` suivi d'autant d'URLs de centre de vaccination
que voulu, par exemple

```
npm start https://www.maiia.com/centre-de-vaccination/01500-amberieu-en-bugey/centre-de-vaccination-de-la-plaine-de-l-ain?centerid=6005bad42475225a68a3f19f https://www.maiia.com/centre-de-vaccination/01000-bourg-en-bresse/centre-de-vaccination---gymnase-saint-roch--bourg-en-bresse?centerId=602ff4cc423df27f1cb576f0 https://www.maiia.com/centre-de-vaccination/01330-villars-les-dombes/centre-de-vaccination-de-dombes?centerid=605a0b7ed254f158baffc4d7
```

Si un créneau se libère dans la journée ou le lendemain, le script émet un bip
et ouvre automatiquement l'URL du centre en question.

## Licence

MIT
