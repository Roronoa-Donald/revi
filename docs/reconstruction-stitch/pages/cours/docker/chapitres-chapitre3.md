# Chapitre 3 — Dockerfile, Directives & Optimisation Multi-Stage

> Fiche extraite du fichier `docker/chapitres/chapitre3.html` (576 lignes, 38.4 Ko, sha256 `86bdb518567e`).
> Famille : **cours-docker** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/docker/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Dockerfile, Directives &amp; Optimisation Multi-Stage \| Docker B2 |
| Description meta | Chapitre 3 du cours Docker B2 : Syntaxe et directives fondamentales du Dockerfile, gestion fine du cache de construction (Build Cache), fichier .dockerignore, comparaison formelle CMD vs ENTRYPOINT (exec form vs shell form), et réduction drastique de surface d’attaque par les builds multi-étapes (Multi-Stage Builds). Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Dockerfile, Directives & Optimisation Multi-Stage |
| 3 | h2 | — | 1. Directives Clés du Dockerfile et Bonnes Pratiques |
| 4 | h2 | — | 2. Optimisation du Build Cache et Fichier .dockerignore |
| 5 | h2 | — | 3. CMD vs ENTRYPOINT : Forme Exec (JSON) vs Forme Shell |
| 6 | h2 | — | 4. Le Pattern Révolutionnaire du Multi-Stage Build |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Dockerfile, Directives & Optimisation Multi-Stage
  - **H2** — 1. Directives Clés du Dockerfile et Bonnes Pratiques
  - **H2** — 2. Optimisation du Build Cache et Fichier .dockerignore
      - **H4** — Anti-pattern : Invalidation Permanente du Cache
      - **H4** — Pattern Optimal : Isolation des Dépendances
  - **H2** — 3. CMD vs ENTRYPOINT : Forme Exec (JSON) vs Forme Shell
  - **H2** — 4. Le Pattern Révolutionnaire du Multi-Stage Build
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Validateur et linter de bonnes pratiques Dockerfile
    - **H3** — Exercice 2 — Distributeur de commandes CMD vs ENTRYPOINT
    - **H3** — Exercice 3 — Optimiseur de cache et build Multi-Stage
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
| Chapitre 4 — Cycle de Vie des Conteneurs, Réseau & Stockage | `chapitre4.html` | `docker/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce que le langage JavaScript l’exige obligatoirement |  | — | `opt` | — | actif | — |
| Pour bénéficier du cache de build Docker : les dépendances ne seront pas réinstallées tant |  | — | `opt` | — | actif | data-correct=1 |
| Pour empêcher les autres développeurs de lire le code |  | — | `opt` | — | actif | — |
| Parce que npm refuse de fonctionner dans un répertoire contenant du code |  | — | `opt` | — | actif | — |
| Le serveur démarre deux fois plus vite |  | — | `opt` | — | actif | — |
| Le processus est encapsulé dans /bin/sh -c et ne reçoit pas le signal d’arrêt SIGTERM lors |  | — | `opt` | — | actif | data-correct=1 |
| La mémoire vive est automatiquement doublée |  | — | `opt` | — | actif | — |
| La directive est ignorée par le démon Docker |  | — | `opt` | — | actif | — |
| À compiler du code sur plusieurs serveurs physiques en réseau |  | — | `opt` | — | actif | — |
| À utiliser une première étape lourde pour compiler les sources, puis à copier uniquement l |  | — | `opt` | — | actif | data-correct=1 |
| À faire tourner plusieurs systèmes d’exploitation simultanément dans un même conteneur |  | — | `opt` | — | actif | — |
| À crypter le Dockerfile pour le rendre illisible |  | — | `opt` | — | actif | — |
| ADD |  | — | `opt` | — | actif | — |
| COPY |  | — | `opt` | — | actif | data-correct=1 |
| IMPORT |  | — | `opt` | — | actif | — |
| FETCH |  | — | `opt` | — | actif | — |
| AUTH |  | — | `opt` | — | actif | — |
| USER |  | — | `opt` | — | actif | data-correct=1 |
| GROUP |  | — | `opt` | — | actif | — |
| ACCOUNT |  | — | `opt` | — | actif | — |
| ARG n’est disponible que lors de la phase de construction (docker build), alors que ENV pe |  | — | `opt` | — | actif | data-correct=1 |
| ARG est réservé aux chiffres et ENV aux chaînes de caractères |  | — | `opt` | — | actif | — |
| ENV ne fonctionne que sous Windows |  | — | `opt` | — | actif | — |
| Il n’y a aucune différence technique |  | — | `opt` | — | actif | — |
| .gitignore |  | — | `opt` | — | actif | — |
| .dockerignore |  | — | `opt` | — | actif | data-correct=1 |
| docker.config |  | — | `opt` | — | actif | — |
| .env.hide |  | — | `opt` | — | actif | — |
| Le conteneur exécute la commande « nginx -v » car l’argument CLI « -v » a écrasé l’instruc |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `dk2-c3-e1` | shell | 300 | suspendue | `# Mon Dockerfile de production FROM node:18-alpine ADD package.json . RUN npm install COPY . . CMD ["node", "server.js"]` | Exercice 1 — Validateur et linter de bonnes pratiques Dockerfile |
| `dk2-c3-e2` | shell | 300 | suspendue | `ENTRYPOINT: python, app.py CMD: --port, 8080 CLI_ARGS: NONE` | Exercice 2 — Distributeur de commandes CMD vs ENTRYPOINT |
| `dk2-c3-e3` | shell | 300 | suspendue | `MONOLITHIC: golang:1.21 800 + 150 + 10 + 20 STAGE_BUILD: golang:1.21 980 -> EXPORT: 20 STAGE_FINAL: alpine:3.18 7 + IMPORT: 20` | Exercice 3 — Optimiseur de cache et build Multi-Stage |

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

- Tableaux : 2 (0 lignes / 3 en-tetes ; 0 lignes / 4 en-tetes)
- Blocs `pre` : 10 · elements `code` : 72
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-blocks`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3314 mots · 537 noeuds HTML

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
