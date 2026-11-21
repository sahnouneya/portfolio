# Portfolio — Eya Sahnoun

Portfolio en **Angular 21**, prérendu en pages statiques (SSG) et déployé sur Render.

## Développement

```bash
npm install
npm start          # http://localhost:4200
```

## Modifier le contenu

Tout le contenu (profil, projets, expérience, compétences, formation) est dans
[`src/app/data/profile.ts`](src/app/data/profile.ts). Les images sont dans `public/images/`.

## Ajouter des captures d'écran (page Galerie)

Chaque projet a son dossier : `public/images/projets/<id-du-projet>/`

| Projet | Dossier |
| --- | --- |
| Sahtek | `sahtek/` |
| ERP Copilot | `erp-copilot/` |
| Chaîne CI/CD | `cicd-sahtek/` |
| Entrepôt de données | `entrepot/` |
| Classification d'ECG | `ecg/` |
| Plateforme automobile | `voitures/` |

Il suffit d'y déposer les images (`.png`, `.jpg`, `.webp`…), sans toucher au code :

- l'ordre d'affichage suit le nom des fichiers : `01.png`, `02.png`… ;
- un fichier nommé `cover.png` (ou `.jpg`…) sert d'image de couverture ;
- la liste est régénérée automatiquement par `npm start` et `npm run build`
  (script `scripts/gallery-manifest.mjs`, résultat dans `src/app/data/gallery.generated.ts`).

Un projet sans image s'affiche avec la mention « Captures à venir ».

## Déploiement

```bash
npm run build      # génère le site dans main/Pages_html/
```

Le fichier [`render.yaml`](render.yaml) décrit le site pour Render : à chaque push sur `main`, Render
lance `npm ci && npm run build` et publie `main/Pages_html/`. Le dossier compilé reste aussi committé,
pour qu'un service Render configuré sans commande de build continue de fonctionner. Les anciennes adresses (`acceuil.html`, `stages.html`…) redirigent vers
les nouvelles pages.
