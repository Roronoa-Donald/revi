# 00 — Lisez-moi : méthode, périmètre et légende

> **Objet** : documentation de rétro-ingénierie visuelle, fonctionnelle et structurelle d'un produit web, destinée à une reconstruction dans Google Stitch sans accès au code.
> **Date d'extraction** : 5 novembre 2026. **Mode** : lecture seule, aucune modification du produit.
> **Corpus** : 1 067 fichiers HTML découverts, 1 067 fiches générées, 0 page oubliée (preuve : [23_MATRICE_COUVERTURE.md](23_MATRICE_COUVERTURE.md)).

---

## 1. Ce que contient ce dossier

| Dossier / fichier | Contenu |
|---|---|
| `01_DECOUVERTE_ET_ARCHITECTURE.md` | Identité du produit, stack, modes de service, modèle d'accès, pipeline de contenu |
| `02_INVENTAIRE_ROUTES.md` | Toutes les routes HTTP (pages, redirections, API), avec authentification et effet UI |
| `03_INVENTAIRE_PAGES.md` | Chiffres de l'inventaire, répartition par famille et par statut |
| `04_LAYOUTS_ET_STRUCTURES.md` | Les 10 familles de mise en page, mesures et wireframes |
| `05_COMPOSANTS_REUTILISABLES.md` | Catalogue de composants avec classes, variantes, états |
| `06_NAVIGATION_ET_MENUS.md` | Cartographie des navigations, menus, onglets, fils d'Ariane |
| `07_FORMULAIRES.md` | Les 20 formulaires, champs, validation, messages |
| `08_MODALES_ET_PANNEAUX.md` | Modales, panneaux, disclosures, widgets flottants |
| `09_BOUTONS_ET_INTERACTIONS.md` | Inventaire des actions et de leurs effets |
| `10_ETATS_INTERFACE.md` | États normaux, vides, chargement, erreur, succès, désactivé, confirmation |
| `11_ETATS_CONDITIONNELS.md` | Matrice rôles / permissions / données |
| `12_PARCOURS_UTILISATEURS.md` | Parcours complets, pas à pas |
| `13_RESPONSIVE.md` | Comportements mobile, tablette, desktop |
| `14_TABLEAUX_ET_VISUALISATIONS.md` | Tableaux, cartes, barres, badges, timeline |
| `15_CONTENUS_ET_DONNEES.md` | Contenus affichés, formats, ton rédactionnel |
| `16_RESSOURCES_VISUELLES.md` | Polices, icônes, palette, ombres, bibliothèques vendored |
| `17_REGLES_METIER.md` | Règles métier qui changent l'interface |
| `18_ETATS_EXCEPTIONNELS_ET_ERREURS.md` | Erreurs, indisponibilités, reprises |
| `19_FONCTIONNALITES_INCOMPLETES.md` | Ce qui est esquissé, suspendu, incohérent ou mort |
| `20_DEPENDANCES_ENTRE_PAGES.md` | Graphe page → API → page |
| `21_COMPORTEMENTS_VISUELS.md` | Animations, défilement, rétroactions, thème, focus |
| `22_REGISTRE_CAPTURES.md` | Captures à produire, état par état |
| `23_MATRICE_COUVERTURE.md` | Matrice page → fiche → statut → accès (1 067 lignes) |
| `pages/**/*.md` | Une fiche par page HTML, générée depuis le fichier réel |
| `evidence/` | Données brutes : `pages.json`, `pages.csv`, `matrice.csv`, `summary.json`, `icons.json`, `css-vars.json` |
| `tools/extract.mjs` | Outil reproductible d'extraction et de génération |

---

## 2. Méthode

1. **Parcours exhaustif du dépôt** : tous les fichiers `.html`, hors `node_modules`, `dist`, `.git`, `docs`, archives ZIP et dossiers d'outillage. Aucun filtre sur les dossiers métier.
2. **Extraction statique** avec `parse5` : titre, metas, langue, thème, titres H1–H4, navigations, liens résolus, formulaires et champs, boutons, tableaux, modales, blocs `data-lab`, QCM, flashcards, classes CSS, attributs `data-*`, feuilles de style, scripts, icônes utilisées, volumes de texte.
3. **Classement** selon le registre canonique `server/courses.js`, l'allowlist de `server.js`, les préfixes bloqués et le build statique. Chaque page reçoit un statut de service et une règle d'accès.
4. **Lecture du code d'interaction** : `assets/js/code-lab.js`, `assets/js/execution-router.js`, `scripts/templates/cours.js`, `rd-ai-chat.js`, `preparation-web/assets/js/app.js`, `_auth/*`, `server/routes/*`.
5. **Rédaction thématique** à partir de ces deux sources, avec renvoi systématique au fichier et à la fiche de page.

### Légende de confiance

| Marqueur | Signification |
|---|---|
| **Observé** | Présent dans le HTML/CSS livré (extraction directe) |
| **Confirmé par le code** | Comportement établi par lecture du JavaScript ou des routes serveur |
| **Déduit** | Conséquence logique d'une règle observée, non exécutée ici |
| **Non vérifié** | Nécessite un runtime, une base PostgreSQL, des clés externes ou un compte réel |

Chaque affirmation des documents thématiques est, sauf mention contraire, **observée** ou **confirmée par le code**. Les états purement temporels (chargement, transition) sont marqués **déduits** quand ils n'ont pas pu être vus à l'écran.

---

## 3. Limites assumées

- **Aucun runtime n'a été lancé** : pas de base PostgreSQL, pas de clés FedaPay/OpenRouter/Piston, pas de captures. Les états visuels sont reconstitués depuis le DOM, le CSS et le JS, pas photographiés.
- **Les captures restent à produire** : le registre [22_REGISTRE_CAPTURES.md](22_REGISTRE_CAPTURES.md) liste les vues et états nécessaires, avec l'URL exacte.
- **Les contenus de chapitre** proviennent de modules de contenu et de pages générées ; leur exactitude pédagogique n'est pas réévaluée ici, seule leur mise en forme l'est.
- **Les rôles réels** dépendent de la base : un compte `b1` gratuit, un compte `b2` abonné, un compte `b3`, un administrateur et un apprenant Preparation Web sont les cinq personas nécessaires pour rejouer la matrice conditionnelle.
- **Le miroir `_auth/`** à la racine diverge du dossier réellement servi `public/` (voir [19](19_FONCTIONNALITES_INCOMPLETES.md)). La version de référence est `public/`, servie sous `/_auth/`.
- **Les contrôles d'accessibilité** sont des heuristiques automatiques (nombre de `h1`, boutons sans nom, champs sans label). Ils signalent des points à vérifier, pas des non-conformités WCAG prouvées.

---

## 4. Chiffres du corpus

| Indicateur | Valeur |
|---|---|
| Pages HTML découvertes | **1 067** |
| Fiches individuelles écrites | **1 067** (= 100 %) |
| Pages servies en production (cours canoniques) | 931 |
| Pages racine servies | 5 |
| Sources `public/` servies sous `/_auth/` | 4 |
| Miroirs `_auth/` non servis | 4 |
| Fichiers racine non servis (allowlist) | 4 |
| Dossiers hors produit / archives | 119 |
| Blocs code lab dans le HTML | 1 326 |
| Exercices à correction suspendue | 354 (21 cours) |
| Questions QCM rendues côté client | 3 443 |
| Formulaires | 20 |
| Tableaux | 748 |
| Boutons | 13 811 |
| Pages servies contenant de l'emoji | 3 (sql/simulateur-examen, uml/cartes, uml/chapitre3) |
| Icônes du sprite | 85 |

---

## 5. Comment lire une fiche de page

Chaque fiche `pages/...md` suit le même plan : identité et accès, structure observée, hiérarchie des titres, navigation et liens, formulaires, boutons, composants pédagogiques et états, tableaux/code/médias, ressources, classes et `data-*`, contrôle qualité, renvois.

Exemple : `pages/cours/b1-algo/chapitres-chapitre1.md`.

---

## 6. Régénérer

```bash
node docs/reconstruction-stitch/tools/extract.mjs
```

L'outil réécrit `evidence/`, `pages/`, `03_INVENTAIRE_PAGES.md` et `23_MATRICE_COUVERTURE.md`. Il ne modifie aucun fichier du produit. Toute divergence entre une fiche et le code signale une page modifiée depuis l'extraction : relancer l'outil.

---

## 7. Règle d'or pour la reconstruction

Ne pas inventer de page, d'onglet, de bouton ou d'état absent de ce dossier. Les seules créations autorisées sont les états explicitement décrits comme **à reconstruire** dans les fiches et les documents 10, 12 et 22. Tout ce qui n'est pas prouvé est signalé comme tel.
