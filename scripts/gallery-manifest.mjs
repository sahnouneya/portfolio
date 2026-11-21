// Génère src/app/data/gallery.generated.ts à partir des dossiers public/images/projets/<id-du-projet>/.
// Lancé automatiquement avant `npm start` et `npm run build` : il suffit de déposer des images dans le dossier
// d'un projet. Ordre d'affichage : alphabétique naturel (01.png, 02.png… 10.png) ; un fichier nommé
// « cover.* » passe en premier et sert d'image de couverture.
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = 'public/images/projets';
const out = 'src/app/data/gallery.generated.ts';
const exts = /\.(png|jpe?g|webp|gif|avif|svg)$/i;
const collator = new Intl.Collator('fr', { numeric: true, sensitivity: 'base' });

const shots = {};
for (const dir of readdirSync(root).sort(collator.compare)) {
  const path = join(root, dir);
  if (!statSync(path).isDirectory()) continue;
  const files = readdirSync(path)
    .filter((f) => exts.test(f))
    .sort((a, b) => {
      const ca = /^cover\./i.test(a);
      const cb = /^cover\./i.test(b);
      return ca === cb ? collator.compare(a, b) : ca ? -1 : 1;
    });
  if (files.length) shots[dir] = files.map((f) => `images/projets/${dir}/${encodeURIComponent(f)}`);
}

const body =
  '// Fichier généré par scripts/gallery-manifest.mjs : ne pas modifier à la main.\n' +
  '// Pour ajouter des captures, déposer les images dans public/images/projets/<id-du-projet>/.\n\n' +
  `export const galleryShots: Record<string, string[]> = ${JSON.stringify(shots, null, 2)};\n`;

writeFileSync(out, body);
const total = Object.values(shots).reduce((n, s) => n + s.length, 0);
console.log(`Galerie : ${total} capture(s) dans ${Object.keys(shots).length} projet(s).`);
