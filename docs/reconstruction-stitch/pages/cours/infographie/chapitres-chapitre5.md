# Chapitre 5 — Éclairage, Shaders Programmables & Rendu PBR

> Fiche extraite du fichier `infographie/chapitres/chapitre5.html` (496 lignes, 34.0 Ko, sha256 `40e559352cc5`).
> Famille : **cours-infographie** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/infographie/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Éclairage, Shaders Programmables &amp; Rendu PBR \| Infographie B2 |
| Description meta | Chapitre 5 du cours Infographie B2 : Pipeline graphique programmable (Vertex &amp; Fragment Shaders), modèles d’illumination empiriques (Lambert, Phong, Blinn-Phong), principes du rendu basé sur la physique (PBR), théorie des micro-facettes (Cook-Torrance), approximation de Fresnel (Schlick) et conservation de l’énergie. Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Éclairage, Shaders Programmables & Rendu PBR |
| 3 | h2 | — | 1. Pipeline Graphique Programmable : Vertex vs Fragment Shader |
| 4 | h2 | — | 2. Modèles d’Illumination Empiriques : Lambert & Phong |
| 5 | h2 | — | 3. Physically Based Rendering (PBR) & Conservation de l’Énergie |
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

- **H1** — Chapitre 5 — Éclairage, Shaders Programmables & Rendu PBR
  - **H2** — 1. Pipeline Graphique Programmable : Vertex vs Fragment Shader
      - **H4** — Vertex Shader (Shader de Sommets)
      - **H4** — Fragment / Pixel Shader (Shader de Pixels)
  - **H2** — 2. Modèles d’Illumination Empiriques : Lambert & Phong
  - **H2** — 3. Physically Based Rendering (PBR) & Conservation de l’Énergie
      - **H4** — 1. Conservation de l’Énergie
      - **H4** — 2. Effet Fresnel (Formule de Schlick)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur d’illumination diffuse de Lambert
    - **H3** — Exercice 2 — Calculateur de reflet spéculaire de Phong
    - **H3** — Exercice 3 — Vérificateur de conservation d’énergie PBR (Roughness & Metallic)
  - **H2** — 5. QCM — niveau examen
  - **H2** — 6. Erreurs classiques — récapitulatif
  - **H2** — 7. Méthodologie de résolution
  - **H2** — 8. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 9 notions à connaître absolument
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
| Chapitre 6 — Optimisation Graphique, Compression GPU & Pipeline Temps Réel | `chapitre6.html` | `infographie/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Le Vertex Shader |  | — | `opt` | — | actif | — |
| Le Fragment / Pixel Shader |  | — | `opt` | — | actif | data-correct=1 |
| Le BIOS de la carte mère |  | — | `opt` | — | actif | — |
| Le compilateur GCC |  | — | `opt` | — | actif | — |
| Id = N × L |  | — | `opt` | — | actif | — |
| Id = max(0.0, N · L) |  | — | `opt` | — | actif | data-correct=1 |
| Id = N + L |  | — | `opt` | — | actif | — |
| Id = \|\|N\|\| / \|\|L\|\| |  | — | `opt` | — | actif | — |
| 1.0 |  | — | `opt` | — | actif | — |
| 0.5 |  | — | `opt` | — | actif | — |
| 0.0 |  | — | `opt` | — | actif | data-correct=1 |
| -1.0 |  | — | `opt` | — | actif | — |
| Il supprime le besoin de Fragment Shader |  | — | `opt` | — | actif | — |
| Il utilise le vecteur mi-chemin H = normalize(L + V), éliminant le calcul coûteux du rayon |  | — | `opt` | — | actif | data-correct=1 |
| Il double la résolution de la texture |  | — | `opt` | — | actif | — |
| Il désactive les ombres portées |  | — | `opt` | — | actif | — |
| La facture d’électricité du serveur ne doit pas dépasser 100 euros |  | — | `opt` | — | actif | — |
| La quantité totale de lumière réfléchie (diffuse + spéculaire) par une surface ne peut en |  | — | `opt` | — | actif | data-correct=1 |
| Les objets en métal doivent toujours être froids au toucher |  | — | `opt` | — | actif | — |
| La lumière doit toujours voyager à la même vitesse dans tous les shaders |  | — | `opt` | — | actif | — |
| Parce que les métaux sont transparents |  | — | `opt` | — | actif | — |
| Parce que les métaux conduisent l’électricité et absorbent immédiatement par leurs électro |  | — | `opt` | — | actif | data-correct=1 |
| Parce que le GPU refuse de peindre le métal en diffus |  | — | `opt` | — | actif | — |
| Parce que les métaux ne supportent pas la loi de Lambert |  | — | `opt` | — | actif | — |
| La décoloration des pigments sous le soleil |  | — | `opt` | — | actif | — |
| L’augmentation spectaculaire de la réflectivité spéculaire d’une surface lorsque le regard |  | — | `opt` | — | actif | data-correct=1 |
| La vitesse du son dans l’air |  | — | `opt` | — | actif | — |
| Le clignotement des diodes LED |  | — | `opt` | — | actif | — |
| La distance focale de la caméra |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `ig2-c5-e1` | analyse | 300 | active | `N=(0,1,0) L=(0,1,0) N=(0,1,0) L=(0,-1,0) N=(0,1,0) L=(0.707,0.707,0)` | Exercice 1 — Calculateur d’illumination diffuse de Lambert |
| `ig2-c5-e2` | analyse | 300 | active | `R=(0,0,1) V=(0,0,1) ALPHA=32 R=(0,0,1) V=(0,0,-1) ALPHA=32 R=(0.707,0,0.707) V=(0,0,1) ALPHA=16` | Exercice 2 — Calculateur de reflet spéculaire de Phong |
| `ig2-c5-e3` | analyse | 300 | active | `MATERIEL=PlastiqueBleu METALLIC=0 DIFFUSE=0.600 SPECULAIRE=0.300 MATERIEL=ChromePur METALLIC=1 DIFFUSE=0.000 SPECULAIRE=0.950 MATERIEL=MateriauMagique METALLIC=0 DIFFUSE=0.800 SPECULAIRE=0.400 MATERIEL=FauxMetal METALLIC=1 DIFFUSE=0.200 SPECULAIRE=0.800` | Exercice 3 — Vérificateur de conservation d’énergie PBR (Roughness & Metallic) |

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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 5 · elements `code` : 34
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-image`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2904 mots · 447 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

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
