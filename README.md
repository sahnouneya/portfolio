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

Pour ajouter des captures d'écran à un projet : déposer les fichiers dans
`public/images/projets/<id>/` et lister leurs chemins dans le champ `shots` du projet.

## Déploiement

```bash
npm run build      # génère le site dans main/Pages_html/
```

Render sert le dossier `main/Pages_html/` tel quel : il faut lancer `npm run build` puis committer
ce dossier avant de pousser. Les anciennes adresses (`acceuil.html`, `stages.html`…) redirigent vers
les nouvelles pages.
