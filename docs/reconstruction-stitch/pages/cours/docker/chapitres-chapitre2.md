# Chapitre 2 — Images, Layers & Registres Docker

> Fiche extraite du fichier `docker/chapitres/chapitre2.html` (538 lignes, 38.7 Ko, sha256 `0952607e4865`).
> Famille : **cours-docker** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/docker/chapitres/chapitre2.html` |
| Titre du document | Chapitre 2 — Images, Layers &amp; Registres Docker \| Docker B2 |
| Description meta | Chapitre 2 du cours Docker B2 : Anatomie d’une image Docker, empilement de couches en lecture seule (Layers), pilote de stockage Overlay2 (lowerdir, upperdir, merged), mécanisme de Copy-On-Write (CoW), registres d’images (Docker Hub, Harbor, GHCR) et digests immuables SHA256. Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Images, Layers & Registres Docker |
| 3 | h2 | — | 1. Anatomie d’une Image et Empilement de Couches (Layers) |
| 4 | h2 | — | 2. Le Pilote de Stockage Overlay2 et la Mécanique Copy-On-Write (CoW) |
| 5 | h2 | — | 3. Registres d’Images, Tags Flottants vs Digests SHA256 |
| 6 | h2 | — | 4. Commandes de Gestion et Distribution d’Images |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 2 — Images, Layers & Registres Docker
  - **H2** — 1. Anatomie d’une Image et Empilement de Couches (Layers)
      - **H4** — Couches d’Image (Image Layers — Read-Only)
      - **H4** — Couche Conteneur (Container Layer — Read-Write)
  - **H2** — 2. Le Pilote de Stockage Overlay2 et la Mécanique Copy-On-Write (CoW)
  - **H2** — 3. Registres d’Images, Tags Flottants vs Digests SHA256
  - **H2** — 4. Commandes de Gestion et Distribution d’Images
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Calculateur de taille d’image et déduplication des Layers (OverlayFS)
    - **H3** — Exercice 2 — Parseur canonique de références d’images et de tags
    - **H3** — Exercice 3 — Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `dockernav` | Portail → `/`<br>Docker B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Docker B2 | `../index.html` | `docker/index.html` | interne |
| Sommaire | `../sommaire.html` | `docker/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `docker/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `docker/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `docker/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `docker/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `docker/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `docker/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `docker/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `docker/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `docker/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `docker/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `docker/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `docker/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `docker/chapitres/formules.html` | interne |
| Chapitre 3 — Dockerfile, Directives & Optimisation Multi-Stage | `chapitre3.html` | `docker/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Le serveur hôte télécharge et stocke deux fois les 7 Mo sur le disque |  | — | `opt` | — | actif | — |
| La couche commune de 7 Mo n’est stockée qu’une seule fois sur l’hôte grâce au partage de c |  | — | `opt` | — | actif | data-correct=1 |
| Le démon Docker refuse de télécharger la seconde image |  | — | `opt` | — | actif | — |
| Les deux conteneurs s’exécutent obligatoirement dans la même mémoire vive |  | — | `opt` | — | actif | — |
| Au noyau Linux de la machine hôte |  | — | `opt` | — | actif | — |
| À la couche en lecture-écriture propre au conteneur (Container Writable Layer) |  | — | `opt` | — | actif | data-correct=1 |
| À l’espace de swap du processeur |  | — | `opt` | — | actif | — |
| Au cache DNS du réseau bridge |  | — | `opt` | — | actif | — |
| Il efface physiquement le fichier sur le disque dur de l’hôte |  | — | `opt` | — | actif | — |
| Il crée un fichier spécial « whiteout » dans l’upperdir pour masquer le fichier lors de la |  | — | `opt` | — | actif | data-correct=1 |
| Le conteneur plante instantanément avec une erreur Kernel Panic |  | — | `opt` | — | actif | — |
| Le fichier est déplacé dans la corbeille de Windows |  | — | `opt` | — | actif | — |
| Parce que le tag latest est payant sur Docker Hub |  | — | `opt` | — | actif | — |
| Parce que c’est un tag flottant qui peut changer à tout moment sans préavis, brisant la re |  | — | `opt` | — | actif | data-correct=1 |
| Parce que le moteur Docker refuse d’exécuter les images taguées latest en arrière-plan |  | — | `opt` | — | actif | — |
| Parce que ce tag désactive automatiquement la connexion réseau |  | — | `opt` | — | actif | — |
| Par son nom simple sans tag (ex: nginx) |  | — | `opt` | — | actif | — |
| Par son digest cryptographique SHA256 (ex: nginx@sha256:7f9a12...) |  | — | `opt` | — | actif | data-correct=1 |
| Par le numéro de port TCP exposé |  | — | `opt` | — | actif | — |
| Par la date de création de l’image |  | — | `opt` | — | actif | — |
| La taille de l’image finale est réduite de 500 Mo |  | — | `opt` | — | actif | — |
| Le fichier de 500 Mo reste stocké dans la première couche de l’image et continue d’alourdi |  | — | `opt` | — | actif | data-correct=1 |
| Le Dockerfile est considéré comme invalide par le démon |  | — | `opt` | — | actif | — |
| La mémoire RAM de la machine hôte est vidée |  | — | `opt` | — | actif | — |
| docker inspect-layers |  | — | `opt` | — | actif | — |
| docker history |  | — | `opt` | — | actif | data-correct=1 |
| docker trace |  | — | `opt` | — | actif | — |
| docker audit |  | — | `opt` | — | actif | — |
| Sur gitlab.com |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `dk2-c2-e1` | shell | 300 | suspendue | `NodeApp : base_os:100 , node_runtime:80 , app_code:20 PythonApp : base_os:100 , python_runtime:70 , app_code_py:15` | Exercice 1 — Calculateur de taille d’image et déduplication des Layers (OverlayFS) |
| `dk2-c2-e2` | shell | 300 | suspendue | `nginx ubuntu:22.04 myorg/backend:v1.0 ghcr.io/dev/api:latest@sha256:abcd1234ef` | Exercice 2 — Parseur canonique de références d’images et de tags |
| `dk2-c2-e3` | shell | 300 | suspendue | `/etc/app.conf, /usr/bin/python, /var/log/old.log READ /etc/app.conf WRITE /etc/app.conf READ /etc/app.conf DELETE /var/log/old.log READ /var/log/old.log` | Exercice 3 — Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur |

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
- Blocs `pre` : 7 · elements `code` : 51
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-blocks`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3397 mots · 498 noeuds HTML

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
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |
| `badge` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
