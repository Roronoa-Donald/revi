# Chapitre 6 — Optimisation Graphique, Compression GPU & Pipeline Temps Réel

> Fiche extraite du fichier `infographie/chapitres/chapitre6.html` (522 lignes, 35.8 Ko, sha256 `9e8f4de77c33`).
> Famille : **cours-infographie** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/infographie/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Optimisation Graphique, Compression GPU &amp; Pipeline Temps Réel \| Infographie B2 |
| Description meta | Chapitre 6 du cours Infographie B2 : Goulots d’étranglement de rendu (CPU-bound vs GPU-bound), compression matérielle de textures (BC/DXT, ASTC, ETC2), réduction des Draw Calls par Static Batching et GPU Instancing, efficacité de la chaîne de Mipmaps et gestion de la mémoire VRAM. Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Optimisation Graphique, Compression GPU & Pipeline Temps Réel |
| 3 | h2 | — | 1. Diagnostic de Performance : CPU-Bound vs GPU-Bound |
| 4 | h2 | — | 2. Compression Matérielle de Textures GPU : BC, ASTC & ETC2 |
| 5 | h2 | — | 3. Batching & Analyse Mathématique de la Chaîne de Mipmaps |
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

- **H1** — Chapitre 6 — Optimisation Graphique, Compression GPU & Pipeline Temps Réel
  - **H2** — 1. Diagnostic de Performance : CPU-Bound vs GPU-Bound
      - **H4** — Scénario CPU-Bound (Goulot Processeur)
      - **H4** — Scénario GPU-Bound (Goulot Carte Graphique)
  - **H2** — 2. Compression Matérielle de Textures GPU : BC, ASTC & ETC2
  - **H2** — 3. Batching & Analyse Mathématique de la Chaîne de Mipmaps
      - **H4** — Static Batching & Instancing
      - **H4** — Série Géométrique des Mipmaps
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur de compression de textures GPU et bande passante
    - **H3** — Exercice 2 — Optimiseur de Draw Calls et Static Batching
    - **H3** — Exercice 3 — Audit de chaîne de Mipmaps et surcoût VRAM
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
| Atelier de code | `../atelier.html` | `infographie/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 100 millisecondes |  | — | `opt` | — | actif | — |
| 33.3 millisecondes |  | — | `opt` | — | actif | — |
| 16.6 millisecondes |  | — | `opt` | — | actif | data-correct=1 |
| 1.0 milliseconde |  | — | `opt` | — | actif | — |
| Un écran trop lumineux |  | — | `opt` | — | actif | — |
| Un nombre excessif de Draw Calls provoqué par une multitude de petits objets utilisant cha |  | — | `opt` | — | actif | data-correct=1 |
| Une batterie trop froide |  | — | `opt` | — | actif | — |
| Un disque dur trop plein |  | — | `opt` | — | actif | — |
| Parce que le GPU exige un accès aléatoire instantané par bloc (O(1)) à n’importe quel texe |  | — | `opt` | — | actif | data-correct=1 |
| Parce que PNG et JPEG sont trop récents pour les cartes graphiques |  | — | `opt` | — | actif | — |
| Parce que les câbles DisplayPort refusent les fichiers compressés |  | — | `opt` | — | actif | — |
| Parce que PNG utilise trop de voyelles |  | — | `opt` | — | actif | — |
| 16 Mo |  | — | `opt` | — | actif | — |
| 8 Mo |  | — | `opt` | — | actif | — |
| 4 Mo |  | — | `opt` | — | actif | — |
| 2 Mo |  | — | `opt` | — | actif | data-correct=1 |
| 2.0x |  | — | `opt` | — | actif | — |
| 4.0x |  | — | `opt` | — | actif | — |
| 8.0x |  | — | `opt` | — | actif | — |
| 16.0x |  | — | `opt` | — | actif | data-correct=1 |
| En supprimant les arbres de la scène |  | — | `opt` | — | actif | — |
| En fusionnant la géométrie de tous les maillages partageant le même matériau dans un seul |  | — | `opt` | — | actif | data-correct=1 |
| En baissant le volume sonore de l’application |  | — | `opt` | — | actif | — |
| En augmentant la vitesse du processeur |  | — | `opt` | — | actif | — |
| +100 % (mémoire doublée) |  | — | `opt` | — | actif | — |
| +50 % |  | — | `opt` | — | actif | — |
| +33.33 % (exactement un tiers) |  | — | `opt` | — | actif | data-correct=1 |
| +5 % |  | — | `opt` | — | actif | — |
| Elles réduisent la température de la pièce |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `ig2-c6-e1` | analyse | 300 | active | `TEXTURE nom=diffuse_sol L=2048 H=2048 FORMAT=BC1 TEXTURE nom=normal_mur L=2048 H=2048 FORMAT=BC7 TEXTURE nom=ui_hud L=1024 H=1024 FORMAT=RGBA8` | Exercice 1 — Calculateur de compression de textures GPU et bande passante |
| `ig2-c6-e2` | analyse | 300 | active | `OBJET id=arbre_01 MAT=vegetation SOMMETS=1200 OBJET id=arbre_02 MAT=vegetation SOMMETS=1200 OBJET id=buisson MAT=vegetation SOMMETS=600 OBJET id=rocher MAT=roche SOMMETS=3000 OBJET id=route MAT=asphalte SOMMETS=450` | Exercice 2 — Optimiseur de Draw Calls et Static Batching |
| `ig2-c6-e3` | analyse | 300 | active | `MIPMAP nom=brique L=512 H=512 OCTETS_PX=4 MIPMAP nom=ruban L=1024 H=64 OCTETS_PX=4` | Exercice 3 — Audit de chaîne de Mipmaps et surcoût VRAM |

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
- Blocs `pre` : 4 · elements `code` : 40
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-image`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3318 mots · 476 noeuds HTML

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
