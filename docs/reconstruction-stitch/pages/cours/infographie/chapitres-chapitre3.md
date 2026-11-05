# Chapitre 3 — Texturing, Espace UV & Cartographie de Relief (Normal Mapping)

> Fiche extraite du fichier `infographie/chapitres/chapitre3.html` (517 lignes, 34.2 Ko, sha256 `2a77b8058fe1`).
> Famille : **cours-infographie** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/infographie/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Texturing, Espace UV &amp; Cartographie de Relief (Normal Mapping) \| Infographie B2 |
| Description meta | Chapitre 3 du cours Infographie B2 : Dépliage UV et coordonnées normalisées [0, 1], contraintes GPU des textures Power of Two (POT), atlas de textures (Texture Atlasing), filtrage bilinéaire et trilinéaire, cartographie de normales en espace tangent (Tangent Space Normal Maps) et encodage RVB. Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Texturing, Espace UV & Cartographie de Relief (Normal Mapping) |
| 3 | h2 | — | 1. Espace UV & Contraintes Matérielles GPU (Power of Two) |
| 4 | h2 | — | 2. Atlas de Textures & Découpage de Sprites |
| 5 | h2 | — | 3. Cartographie de Relief : Normal Mapping en Espace Tangent |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |
| 14 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Texturing, Espace UV & Cartographie de Relief (Normal Mapping)
  - **H2** — 1. Espace UV & Contraintes Matérielles GPU (Power of Two)
      - **H4** — Repère Normalisé UV
      - **H4** — Textures Power of Two (POT)
  - **H2** — 2. Atlas de Textures & Découpage de Sprites
  - **H2** — 3. Cartographie de Relief : Normal Mapping en Espace Tangent
      - **H4** — Principe de Fonctionnement
      - **H4** — Décodage Shader de l’Espace Tangent
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Validateur de texture Puissance de Deux (Power of Two - POT)
    - **H3** — Exercice 2 — Calculateur de coordonnées d’atlas de sprites (Sprite Sheet UV Map)
    - **H3** — Exercice 3 — Décodeur de Normal Map (Espace tangent RVB vers vecteur normal)
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
| Chapitre 4 — Modélisation 3D, Maillages Polygonaux & Transformations TRS | `chapitre4.html` | `infographie/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| De -1.0 à +1.0 |  | — | `opt` | — | actif | — |
| De 0.0 à 1.0 |  | — | `opt` | — | actif | data-correct=1 |
| De 0 à 255 |  | — | `opt` | — | actif | — |
| De 0 à 1024 |  | — | `opt` | — | actif | — |
| Parce que le GPU calcule les adresses mémoire par de simples décalages de bits binaires et |  | — | `opt` | — | actif | data-correct=1 |
| Parce que les câbles HDMI ne supportent que les puissances de deux |  | — | `opt` | — | actif | — |
| Pour réduire le prix de vente de la carte graphique |  | — | `opt` | — | actif | — |
| Pour empêcher la copie illégale des textures |  | — | `opt` | — | actif | — |
| Augmenter le nombre de polygones du modèle 3D |  | — | `opt` | — | actif | — |
| Réduire le nombre de changements de matériaux et de Draw Calls envoyés par le CPU au proce |  | — | `opt` | — | actif | data-correct=1 |
| Désactiver la carte son de la machine |  | — | `opt` | — | actif | — |
| Accélérer la connexion Wi-Fi |  | — | `opt` | — | actif | — |
| Nearest Neighbor |  | — | `opt` | — | actif | — |
| Filtrage bilinéaire |  | — | `opt` | — | actif | — |
| Filtrage trilinéaire |  | — | `opt` | — | actif | data-correct=1 |
| Filtrage par seuillage |  | — | `opt` | — | actif | — |
| Rouge pur (255, 0, 0) |  | — | `opt` | — | actif | — |
| Vert pur (0, 255, 0) |  | — | `opt` | — | actif | — |
| Bleu ciel neutre (128, 128, 255) |  | — | `opt` | — | actif | data-correct=1 |
| Noir pur (0, 0, 0) |  | — | `opt` | — | actif | — |
| Nx = R / 255.0 |  | — | `opt` | — | actif | — |
| Nx = (R / 255.0) * 2.0 - 1.0 |  | — | `opt` | — | actif | data-correct=1 |
| Nx = R - 128.0 |  | — | `opt` | — | actif | — |
| Nx = 1.0 - (R / 128.0) |  | — | `opt` | — | actif | — |
| Le repère TBN ne peut pas être construit et les perturbations de la normale ne peuvent pas |  | — | `opt` | — | actif | data-correct=1 |
| Le processeur refuse de démarrer |  | — | `opt` | — | actif | — |
| L’écran passe automatiquement en noir et blanc |  | — | `opt` | — | actif | — |
| La texture devient invisible |  | — | `opt` | — | actif | — |
| Il augmente la vitesse du ventilateur du GPU |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `ig2-c3-e1` | analyse | 300 | active | `1024 1024 500 300 2048 512` | Exercice 1 — Validateur de texture Puissance de Deux (Power of Two - POT) |
| `ig2-c3-e2` | analyse | 300 | active | `ATLAS=1024x1024 CELL=256x256 COL=0 ROW=0 ATLAS=1024x1024 CELL=256x256 COL=1 ROW=0 ATLAS=1024x1024 CELL=256x256 COL=3 ROW=3` | Exercice 2 — Calculateur de coordonnées d’atlas de sprites (Sprite Sheet UV Map) |
| `ig2-c3-e3` | analyse | 300 | active | `128 128 255 255 128 128 128 255 128` | Exercice 3 — Décodeur de Normal Map (Espace tangent RVB vers vecteur normal) |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 8 (`.box`, variantes `box--*`).
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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 5 · elements `code` : 30
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-image`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3165 mots · 452 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 20 |
| `box` | 8 |
| `box__title` | 8 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `card` | 4 |
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
