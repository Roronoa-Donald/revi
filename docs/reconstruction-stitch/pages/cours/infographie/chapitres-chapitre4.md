# Chapitre 4 — Modélisation 3D, Maillages Polygonaux & Transformations TRS

> Fiche extraite du fichier `infographie/chapitres/chapitre4.html` (516 lignes, 34.7 Ko, sha256 `937f8c426df5`).
> Famille : **cours-infographie** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/infographie/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Modélisation 3D, Maillages Polygonaux &amp; Transformations TRS \| Infographie B2 |
| Description meta | Chapitre 4 du cours Infographie B2 : Structure des maillages (Sommets, Arêtes, Faces triangulaires), sens de parcours (Winding Order) et Back-Face Culling, calcul de normale unitaire par produit vectoriel, matrices de transformations affines 4x4 (Translation, Rotation, Scale TRS) et Niveaux de Détail (LOD). Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Modélisation 3D, Maillages Polygonaux & Transformations TRS |
| 3 | h2 | — | 1. Maillages Polygonaux, Triangulation & Back-Face Culling |
| 4 | h2 | — | 2. Transformations Affines 3D & Ordre Matriciel TRS |
| 5 | h2 | — | 3. Niveaux de Détail (LOD - Level of Detail) |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |
| 14 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Modélisation 3D, Maillages Polygonaux & Transformations TRS
  - **H2** — 1. Maillages Polygonaux, Triangulation & Back-Face Culling
      - **H4** — Pourquoi utiliser des triangles pour les surfaces ?
      - **H4** — Sens de Parcours (Winding Order) & Culling
  - **H2** — 2. Transformations Affines 3D & Ordre Matriciel TRS
      - **H4** — 1. Scale (Mise à l’échelle)
      - **H4** — 2. Rotation (Orientation)
      - **H4** — 3. Translation (Position)
  - **H2** — 3. Niveaux de Détail (LOD - Level of Detail)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur de normale d’un triangle 3D (Produit vectoriel)
    - **H3** — Exercice 2 — Applicateur de transformations affines 3D (Scale puis Translation)
    - **H3** — Exercice 3 — Audit de niveau de détail géométrique (LOD) selon la distance
  - **H2** — 5. QCM — niveau examen
  - **H2** — 6. Erreurs classiques — récapitulatif
  - **H2** — 7. Méthodologie de résolution
  - **H2** — 8. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 9. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `infographienav` | Portail → `/`<br>Infographie B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Infographie B2 | `../index.html` | `infographie/index.html` | interne |
| Sommaire | `../sommaire.html` | `infographie/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `infographie/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `infographie/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `infographie/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `infographie/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `infographie/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `infographie/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `infographie/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `infographie/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `infographie/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `infographie/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `infographie/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `infographie/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `infographie/chapitres/formules.html` | interne |
| Chapitre 5 — Éclairage, Shaders Programmables & Rendu PBR | `chapitre5.html` | `infographie/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce que les triangles consomment moins d’électricité que les carrés |  | — | `opt` | — | actif | — |
| Parce que trois sommets non alignés définissent un plan unique et une face sans torsion |  | — | `opt` | — | actif | data-correct=1 |
| Parce que les cartes mères ne savent compter que jusqu’à 3 |  | — | `opt` | — | actif | — |
| Pour des raisons purement esthétiques |  | — | `opt` | — | actif | — |
| Changer la couleur du fond d’écran |  | — | `opt` | — | actif | — |
| Rejeter avant le calcul d’ombrage tous les triangles dont la normale pointe à l’opposé de |  | — | `opt` | — | actif | data-correct=1 |
| Augmenter le volume sonore des dialogues |  | — | `opt` | — | actif | — |
| Sauvegarder la partie sur disque dur |  | — | `opt` | — | actif | — |
| Le produit scalaire (Dot Product) |  | — | `opt` | — | actif | — |
| Le produit vectoriel (Cross Product) |  | — | `opt` | — | actif | data-correct=1 |
| L’addition vectorielle |  | — | `opt` | — | actif | — |
| La division composante par composante |  | — | `opt` | — | actif | — |
| P' = Scale · Translation · Rotation · P |  | — | `opt` | — | actif | — |
| P' = Translation · Rotation · Scale · P |  | — | `opt` | — | actif | data-correct=1 |
| P' = Rotation · Scale · Translation · P |  | — | `opt` | — | actif | — |
| L’ordre n’a aucune importance car la multiplication matricielle est commutative |  | — | `opt` | — | actif | — |
| Le programme plante immédiatement |  | — | `opt` | — | actif | — |
| L’objet pivote autour de l’origine du monde (révolution orbitale) au lieu de pivoter sur s |  | — | `opt` | — | actif | data-correct=1 |
| L’objet devient invisible |  | — | `opt` | — | actif | — |
| La résolution de l’écran diminue |  | — | `opt` | — | actif | — |
| Pour pouvoir représenter les translations et les projections perspectives sous forme de si |  | — | `opt` | — | actif | data-correct=1 |
| Parce que le chiffre 4 porte chance |  | — | `opt` | — | actif | — |
| Pour doubler la mémoire vive consommée |  | — | `opt` | — | actif | — |
| Pour empêcher les attaques par injection SQL |  | — | `opt` | — | actif | — |
| Changer la musique selon la zone |  | — | `opt` | — | actif | — |
| Substituer un maillage allégé comptant moins de polygones lorsque l’objet s’éloigne de la |  | — | `opt` | — | actif | data-correct=1 |
| Empêcher le joueur de tricher |  | — | `opt` | — | actif | — |
| Ajouter des armes supplémentaires |  | — | `opt` | — | actif | — |
| norme = nx + ny + nz |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `ig2-c4-e1` | analyse | 300 | active | `A=(0,0,0) B=(1,0,0) C=(0,1,0) A=(0,0,0) B=(0,0,1) C=(0,1,0)` | Exercice 1 — Calculateur de normale d’un triangle 3D (Produit vectoriel) |
| `ig2-c4-e2` | analyse | 300 | active | `P=(1,2,3) S=(2,2,2) T=(10,0,-5) P=(0,0,0) S=(1,1,1) T=(5,5,5) P=(4,-2,8) S=(0.5,3,-1) T=(0,10,2)` | Exercice 2 — Applicateur de transformations affines 3D (Scale puis Translation) |
| `ig2-c4-e3` | analyse | 300 | active | `OBJET=Personnage POLYGONES=35000 DISTANCE=3.2 OBJET=ArbreLointain POLYGONES=8000 DISTANCE=25.0 OBJET=MaisonArrierePlan POLYGONES=400 DISTANCE=60.0` | Exercice 3 — Audit de niveau de détail géométrique (LOD) selon la distance |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 7 (`.box`, variantes `box--*`).
- Blocs replies : 3 (`<details>`).

Etats et interactions a reconstruire :

- En-tete compact : fil d'Ariane, titre, meta (module, duree, statut gratuit).
- Encadres pedagogiques : mise en situation, objectifs, intuition, piege, methode, technique, revision.
- Tableaux de donnees et blocs pseudo-code defilables horizontalement.
- Exercices de code (`div.lab[data-lab]`) : editeur, entree standard, console a 3 onglets, tuteur IA.
- Correction suspendue si `data-grading-suspended="1"` : bouton « Validation suspendue » desactive et avis visible.
- QCM : options desactivees apres reponse, bonne reponse `is-correct`, mauvaise `is-wrong`, explication `is-shown`.
- Score QCM : `Score : n/N (p %)` + palier de maitrise (4 bandes).
- Checklist de maitrise : case `data-mark-done`, etat persiste en localStorage par chapitre.
- Navigation de bas de page : chapitre precedent / suivant.

## 8. Tableaux, code et medias

- Tableaux : 2 (0 lignes / 3 en-tetes ; 0 lignes / 4 en-tetes)
- Blocs `pre` : 4 · elements `code` : 41
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-image`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3057 mots · 471 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 19 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 7 |
| `box__title` | 7 |
| `card` | 5 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |
| `badge` | 3 |
| `lab__body` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

## 11. Controle qualite automatique

- Titres `h1` : 1
- Boutons sans texte ni aria-label : 0
- Champs identifies sans label associe : 0
- Images sans attribut alt : 0
- Liens sans texte ni aria-label : 0
- Emoji detectes : 0 (la charte du produit les proscrit)

## 12. Renvois

- Layouts et gabarits : [04_LAYOUTS_ET_STRUCTURES.md](../../../04_LAYOUTS_ET_STRUCTURES.md)
- Composants et etats : [05_COMPOSANTS_REUTILISABLES.md](../../../05_COMPOSANTS_REUTILISABLES.md) · [10_ETATS_INTERFACE.md](../../../10_ETATS_INTERFACE.md)
- Regles d'acces : [11_ETATS_CONDITIONNELS.md](../../../11_ETATS_CONDITIONNELS.md) · [17_REGLES_METIER.md](../../../17_REGLES_METIER.md)
- Captures a produire : [22_REGISTRE_CAPTURES.md](../../../22_REGISTRE_CAPTURES.md)

*Fiche generee le 2026-11-05 par `tools/extract.mjs` ; donnees brutes dans `evidence/pages.json`.
