# Chapitre 5 — Orchestration avec Docker Compose

> Fiche extraite du fichier `docker/chapitres/chapitre5.html` (533 lignes, 37.3 Ko, sha256 `c36db140eff2`).
> Famille : **cours-docker** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/docker/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Orchestration avec Docker Compose \| Docker B2 |
| Description meta | Chapitre 5 du cours Docker B2 : Infrastructure as Code pour conteneurs, structure du fichier docker-compose.yml (services, networks, volumes), gestion des dépendances depends_on, healthchecks applicatifs et conditions de santé, interpolation de variables d’environnement (.env) et pilotage multi-conteneurs. Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Orchestration avec Docker Compose |
| 3 | h2 | — | 1. Du Script Impératif à la Déclaration d’Infrastructure as Code |
| 4 | h2 | — | 2. Structure Complète du Fichier docker-compose.yml |
| 5 | h2 | — | 3. Dépendances depends_on vs Sondes de Santé (Healthchecks) |
| 6 | h2 | — | 4. Gestion des Variables d’Environnement et Fichiers .env |
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

- **H1** — Chapitre 5 — Orchestration avec Docker Compose
  - **H2** — 1. Du Script Impératif à la Déclaration d’Infrastructure as Code
      - **H4** — Approche Impérative (Scripts Shell)
      - **H4** — Approche Déclarative (Docker Compose)
  - **H2** — 2. Structure Complète du Fichier docker-compose.yml
  - **H2** — 3. Dépendances depends_on vs Sondes de Santé (Healthchecks)
      - **H4** — Le Piège de depends_on Classique
      - **H4** — La Solution Professionnelle : Healthcheck
  - **H2** — 4. Gestion des Variables d’Environnement et Fichiers .env
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Parseur et validateur de services Docker Compose
    - **H3** — Exercice 2 — Résolveur d’ordre de démarrage par graphe de dépendances (depends_on)
    - **H3** — Exercice 3 — Interprète de variables d’environnement et fichiers .env dans Compose
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
| Chapitre 6 — Sécurité, Production & Optimisation | `chapitre6.html` | `docker/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Il permet d’exécuter du code Java sans machine virtuelle |  | — | `opt` | — | actif | — |
| Il adopte une approche déclarative (Infrastructure as Code) permettant de décrire l’ensemb |  | — | `opt` | — | actif | data-correct=1 |
| Il supprime le besoin de disposer d’un système d’exploitation |  | — | `opt` | — | actif | — |
| Il rend les conteneurs compatibles avec les smartphones des années 1990 |  | — | `opt` | — | actif | — |
| Parce que Compose ne lit pas cette directive |  | — | `opt` | — | actif | — |
| Parce que depends_on attend uniquement que le conteneur database soit démarré au sens syst |  | — | `opt` | — | actif | data-correct=1 |
| Parce que le port de la base de données est toujours fermé par défaut |  | — | `opt` | — | actif | — |
| Parce que les conteneurs refusent de communiquer entre eux sans clé SSH |  | — | `opt` | — | actif | — |
| sleep 30 dans le script shell |  | — | `opt` | — | actif | — |
| Une directive healthcheck sur la base de données combinée à « depends_on: db: { condition: |  | — | `opt` | — | actif | data-correct=1 |
| En redémarrant le serveur physique |  | — | `opt` | — | actif | — |
| En désactivant le pare-feu |  | — | `opt` | — | actif | — |
| Il désactive toute connectivité réseau pour tous les services |  | — | `opt` | — | actif | — |
| Il crée automatiquement un réseau bridge dédié portant le nom du projet et y connecte tous |  | — | `opt` | — | actif | data-correct=1 |
| Il connecte tous les services au Wi-Fi public le plus proche |  | — | `opt` | — | actif | — |
| Il oblige l’utilisateur à saisir manuellement une adresse IPv6 |  | — | `opt` | — | actif | — |
| Le fichier plante avec une erreur de syntaxe YAML |  | — | `opt` | — | actif | — |
| La valeur par défaut « 5432 » est utilisée |  | — | `opt` | — | actif | data-correct=1 |
| La valeur est remplacée par le mot « NULL » |  | — | `opt` | — | actif | — |
| Le port 80 est attribué automatiquement |  | — | `opt` | — | actif | — |
| Pour éviter que Git ne ralentisse la compilation |  | — | `opt` | — | actif | — |
| Pour empêcher la fuite de secrets de production (mots de passe, clés d’API, jetons de chif |  | — | `opt` | — | actif | data-correct=1 |
| Parce que Git ne supporte pas les fichiers commençant par un point |  | — | `opt` | — | actif | — |
| C’est une obligation légale de la CNIL sous peine d’amende |  | — | `opt` | — | actif | — |
| docker compose stop |  | — | `opt` | — | actif | — |
| docker compose down -v |  | — | `opt` | — | actif | data-correct=1 |
| docker compose delete --all |  | — | `opt` | — | actif | — |
| docker compose rm --clean |  | — | `opt` | — | actif | — |
| restart: no |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `dk2-c5-e1` | shell | 300 | suspendue | `service: frontend \| image: nginx:alpine \| ports: 80:80 \| restart: always service: cache \| image: redis:7 \| restart: unless-stopped service: orphelin \| restart: always` | Exercice 1 — Parseur et validateur de services Docker Compose |
| `dk2-c5-e2` | shell | 300 | suspendue | `web -> api api -> db, redis db -> NONE redis -> NONE` | Exercice 2 — Résolveur d’ordre de démarrage par graphe de dépendances (depends_on) |
| `dk2-c5-e3` | shell | 300 | suspendue | `PORT=8080 DB_USER=admin --- image: nginx:${TAG:-latest} ports: ${PORT}:80 user: ${DB_USER} db_pass: ${DB_PASS:-secret123}` | Exercice 3 — Interprète de variables d’environnement et fichiers .env dans Compose |

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
- Blocs `pre` : 9 · elements `code` : 66
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-blocks`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3205 mots · 485 noeuds HTML

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
| `card` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |

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
