# 03 — Inventaire exhaustif des pages

> Genere le 2026-11-05 par `tools/extract.mjs`. Source : parcours recursif du depot, exclusion des dossiers de build/dependances/archives.
> Donnees completes : [`evidence/pages.csv`](evidence/pages.csv) · fiches : `pages/`.

## 1. Chiffres cles

| Indicateur | Valeur |
|---|---|
| Pages HTML decouvertes | **1067** |
| Fiches individuelles generees | **1067** |
| Pages sans fiche | **0** |
| Blocs code lab | 1326 |
| Questions QCM (HTML rendu) | 3443 |
| Formulaires | 20 |
| Tableaux | 748 |
| Boutons | 13811 |
| Pages contenant de l'emoji | 110 |

## 2. Repartition par famille

| Famille | Pages |
|---|---|
| `hors-produit` | 119 |
| `cours-sql` | 32 |
| `cours-droit` | 18 |
| `cours-b1-algo` | 17 |
| `cours-RD-RO` | 15 |
| `cours-b1-c-cpp` | 15 |
| `cours-b1-php` | 15 |
| `cours-Cyber securite B2` | 14 |
| `cours-admin-vm` | 14 |
| `cours-api-rest-flask` | 14 |
| `cours-assembleur` | 14 |
| `cours-erp-si` | 14 |
| `cours-ingenierie-besoin` | 14 |
| `cours-masterclass-apprendre` | 14 |
| `cours-probabilites` | 14 |
| `cours-rd_winserver` | 14 |
| `cours-react` | 14 |
| `cours-b1-admin-windows` | 13 |
| `cours-b1-algebre` | 13 |
| `cours-b1-anglais` | 13 |
| `cours-b1-architecture` | 13 |
| `cours-b1-bureautique` | 13 |
| `cours-b1-ccna1` | 13 |
| `cours-b1-cyber` | 13 |
| `cours-b1-droit` | 13 |
| `cours-b1-fr-pro` | 13 |
| `cours-b1-git` | 13 |
| `cours-b1-linux` | 13 |
| `cours-b1-merise` | 13 |
| `cours-b1-prog-web` | 13 |
| `cours-b1-projet` | 13 |
| `cours-b1-python` | 13 |
| `cours-b1-reseaux` | 13 |
| `cours-b1-robotique` | 13 |
| `cours-b1-sql` | 13 |
| `cours-b1-stats` | 13 |
| `cours-b1-virtualisation` | 13 |
| `cours-b3-agile` | 13 |
| `cours-b3-algo` | 13 |
| `cours-b3-anglais` | 13 |
| `cours-b3-cloud-aws` | 13 |
| `cours-b3-cloud-azure` | 13 |
| `cours-b3-cloud-computing` | 13 |
| `cours-b3-cryptographie` | 13 |
| `cours-b3-devops` | 13 |
| `cours-b3-document-technique` | 13 |
| `cours-b3-etude-quantitative` | 13 |
| `cours-b3-firewall` | 13 |
| `cours-b3-github` | 13 |
| `cours-b3-google-cloud` | 13 |
| `cours-b3-hacking` | 13 |
| `cours-b3-linux` | 13 |
| `cours-b3-pfsense` | 13 |
| `cours-b3-reseau-lan` | 13 |
| `cours-b3-sql` | 13 |
| `cours-b3-supervision` | 13 |
| `cours-b3-veille` | 13 |
| `cours-b3-virtualisation` | 13 |
| `cours-b3-voip` | 13 |
| `cours-b3-windows-server` | 13 |
| `cours-ccna` | 13 |
| `cours-csharp` | 13 |
| `cours-docker` | 13 |
| `cours-infographie` | 13 |
| `cours-linux` | 13 |
| `cours-php` | 13 |
| `cours-rd_java` | 13 |
| `cours-uiux` | 13 |
| `cours-uml` | 13 |
| `app-shell` | 9 |
| `auth` | 4 |
| `sources-auth` | 4 |
| `cours-b1-vb-excel` | 1 |
| `cours-epreuves` | 1 |
| `cours-preparation-web` | 1 |

## 3. Repartition par statut de service

| Statut | Pages |
|---|---|
| `servi-canonique` | 931 |
| `bloque-serveur` | 111 |
| `servi-local-render-seulement` | 8 |
| `servi-racine` | 5 |
| `miroir-racine-auth` | 4 |
| `racine-non-servie` | 4 |
| `source-publique-auth` | 4 |

Les statuts signifient :

- `servi-canonique` : page d'un cours du registre `server/courses.js`, servie en production.
- `servi-racine` : fichier racine present dans l'allowlist de `server.js`.
- `source-publique-auth` : fichier de `public/`, servi sous `/_auth/...`.
- `miroir-racine-auth` : copie `_auth/` a la racine ; **non servie** par `server.js` (le prefixe `/_auth/` lit `public/`).
- `racine-non-servie` : fichier HTML racine absent de l'allowlist (inaccessible en production).
- `servi-local-render-seulement` : dossier hors registre, accessible uniquement en mode local/Render et absent du build `dist/`.
- `bloque-serveur` : prefixe explicitement bloque par `server.js` (403).

## 4. Registre complet

Le registre exhaustif, page par page, se trouve dans [`evidence/pages.csv`](evidence/pages.csv) et la correspondance page → fiche dans [`evidence/matrice.csv`](evidence/matrice.csv).
Chaque chemin ci-dessous possede une fiche individuelle ; la matrice [23_MATRICE_COUVERTURE.md](23_MATRICE_COUVERTURE.md) en apporte la preuve comptable.
