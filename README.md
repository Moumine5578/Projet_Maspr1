Etape a suivre pour le bon deroulement du front


Installation du projet
    -- git clone  https://github.com/Moumine5578/Projet_Maspr1.git
    -- cd mspr_1


Installés toutes les dépendances nécessaires 
    -- npm install


Dépendances utilisées
# Core Angular packages sont dans package.json

# Librairie de graphiques
npm install chart.js
npm install ng2-charts --legacy-peer-deps

# Librairie de cartes interactives
npm install leaflet @types/leaflet --legacy-peer-deps

# Bootstrap pour le design 
npm install bootstrap

Configuration manuelle
    -- Ajouté les styles dans angular.json
     --"styles": [
        "src/styles.css",
        "node_modules/leaflet/dist/leaflet.css",
        "node_modules/bootstrap/dist/css/bootstrap.min.css"
    ]

Corrigés les icônes de Leaflet dans le fichier tableau-de-bord.component.ts

    import * as L from 'leaflet';
    import 'leaflet/dist/images/marker-icon.png';
    import 'leaflet/dist/images/marker-shadow.png';

    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
    });

Démarrés l'application du mspr :
    -- ng serve

Tester un composant (ex. : tableau de bord)
    -- ng test

important les gars :
    -- Si des conflits apparaissent lors de npm install, ajouter -> --legacy-peer-deps
    -- Pour voir la carte, assure-toi d'être connecté à Internet (Leaflet utilise des tuiles externes)