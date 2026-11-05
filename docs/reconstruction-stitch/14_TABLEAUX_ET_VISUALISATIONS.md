# 14 — Tableaux, cartes et visualisations

> Il n'existe **aucun graphique charté** (pas de Chart.js, pas de SVG de données, pas de camembert, pas de courbe) dans le produit. Les visualisations sont des **cartes, des barres de progression, des bandes de score et une timeline**.

## 1. Tableaux

| Total | 748 tableaux dans les pages |
|---|---|
| Usage | comparatifs pédagogiques (pseudo-code vs Python), récapitulatifs, tables de référence |
| Style | `border-collapse: collapse`, en-tête fond crème, bordures 1 px, cellules 8–10 px |
| Responsive | `display: block; overflow-x: auto` — le tableau défile horizontalement, jamais de colonnes empilées |
| Accessibilité | `<th scope="col">` rarement présent ; pas de `<caption>` — à améliorer |

Tableaux d'interface (hors cours) :

| Page | Tableau | Colonnes |
|---|---|---|
| Admin — comptes | liste des utilisateurs | ID, Email, Abonnement, Expire, Sessions, Inscrit, Actions |
| Admin — sessions | sessions | (6–7 colonnes, dont appareil et dernière activité) |
| Admin — paiements | paiements | Date, Utilisateur, Montant, Statut, Référence |
| Admin — clés IA | pool | Fournisseur, Libellé, Clé, Statut, Requêtes, Erreurs, Dernière utilisation, Actions |

Aucun tri par clic, aucune pagination côté client (le journal pagine côté serveur), aucun filtre de colonne, aucune sélection multiple.

## 2. Cartes

| Carte | Contexte | Contenu | Interaction |
|---|---|---|---|
| Carte de cours | portail | icône SVG 48 px teintée, badge niveau, titre, « Ch. 1 gratuit », nombre de chapitres | clic → sommaire |
| Carte « Reprendre » | portail | icône, label, titre du cours, CTA | clic |
| Carte de statistique | admin | label 0,72rem uppercase, valeur 1,5rem colorée | aucune |
| Carte de projet | Preparation | numéro, titre, état, XP | clic (si déverrouillé) |
| Carte de niveau | inscription | badge, titre, nombre de cours | sélection |
| Flashcard | cartes/mémo | face avant terme, verso définition | retournement |
| `feedback-card` | Preparation | titre, liste de critères | aucune |

## 3. Barres et jauges

| Composant | Page | Détail visuel |
|---|---|---|
| Barre de score QCM (cours) | chapitres | `.qcm__score` sticky, texte + remplissage proportionnel |
| Barre de score par matière | annales | `.score-bar` + `.score-val` (« 0 / 3 ») |
| Barre de progression du rail | Preparation | `.progress-track` + `.progress-fill`, largeur en % |
| Pill de progression | Preparation | `0/12`, `aria-haspopup="dialog"` |
| Barre XP / rang | Preparation | `rank-line` texte + pourcentage |
| Barre d'abonnement admin | admin | compteur « Expirent (7j) » sans jauge |
| Chronomètre d'examen | simulateur | texte `mm:ss` |

Aucune jauge circulaire, aucun anneau de progression.

## 4. Bandes de maîtrise

Quatre lignes colorées, empilées, avec intitulé et seuil :

| Bande | Seuil | Couleur |
|---|---|---|
| Fragile | < 50 % | rouge |
| En construction | 50–69 % | ambre |
| Solide | 70–94 % | vert clair |
| Maîtrisé | ≥ 95 % | vert |

Utilisées dans les chapitres (test de maîtrise) et les annales (note).

## 5. Notes et badges

| Composant | Forme | Usage |
|---|---|---|
| `grade-pill` | pill colorée | note d'une matière (annales) |
| `grade-na` | pill grise | matière sans note |
| `badge-num` | carré arrondi | numéro de matière |
| `.badge` admin | pill | statut (actif, expiré, désactivé) |
| `.badge-level` | pill | B1/B2/B3 sur les cartes |
| `.badge-free` | pill verte | « Ch. 1 gratuit » |
| `.locknote` | texte + cadenas | chapitre verrouillé |
| `.lab__training` | texte | « entraînement », « formatif » |
| `.lab__formative` | texte | mention formative |
| `bandrow--*` | ligne | maîtrise |

## 6. Timeline

Une seule : la modale « Progression » de Preparation Web (`#progressTimeline`). Verticale, une entrée par projet avec état (validé / en cours / verrouillé), générée en JS.

## 7. Visualisations de données absentes

- Pas de graphique d'évolution, de répartition, de comparaison.
- Pas de heatmap de progression.
- Pas de calendrier.
- Pas de diagramme UML/SVG interactif (le cours UML contient des blocs de texte, pas de rendu de diagramme).
- Pas de carte géographique.

**Conséquence pour Stitch** : ne pas ajouter de dashboard analytique. L'écran le plus « data » est la console admin, et il est fait de compteurs et de tableaux.

## 8. Densité et hiérarchie

- Portail : 70 cartes, grille 4 colonnes à 1 280 px, 2 colonnes vers 560 px, 1 colonne en dessous.
- Chapitre : une colonne, beaucoup de texte, encadrés tous les 2–4 paragraphes.
- Admin : dense, 6 compteurs + 4 onglets + tableaux, pensé pour 1 200 px.
- Annales : très dense, 6 376 mots sur une page, onglets pour réduire la charge.

## 9. États des tableaux et cartes

| État | Rendu |
|---|---|
| Chargement | ligne unique `.empty-state` « Chargement... » avec icône horloge |
| Vide | `.empty-state` centré, icône, message muted |
| Erreur | toast rouge, données précédentes conservées |
| Survol de ligne | fond très clair (admin) |
| Carte verrouillée | opacité 0,4, cadenas, `pointer-events:none` |
| Carte sélectionnée | bordure accent + fond teinté (niveau d'inscription) |
