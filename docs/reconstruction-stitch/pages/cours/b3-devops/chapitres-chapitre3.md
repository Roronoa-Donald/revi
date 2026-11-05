# Chapitre 3 — Conteneurisation Docker, Multi-Stage Builds & Infrastructure as Code (IaC)

> Fiche extraite du fichier `b3-devops/chapitres/chapitre3.html` (559 lignes, 39.3 Ko, sha256 `db117278267a`).
> Famille : **cours-b3-devops** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-devops/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Conteneurisation Docker, Multi-Stage Builds &amp; Infrastructure as Code (IaC) \| DevOps B3 |
| Description meta | Chapitre 3 du cours DevOps B3 : Mécanismes d’isolation Linux du noyau (namespaces, cgroups), ordonnancement de couches Dockerfile, Multi-Stage Builds, sécurité non-root et idempotence IaC. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Conteneurisation Docker, Multi-Stage Builds & Infrastructure as Code (IaC) |
| 3 | h2 | — | 1. Conteneurisation vs Virtualisation Lourde : Les Primitives du Noyau Linux |
| 4 | h2 | — | 2. Le Système de Fichiers en Couches (OverlayFS) & Optimisation du Cache |
| 5 | h2 | — | 3. Multi-Stage Builds & Durcissement de Sécurité |
| 6 | h2 | — | 4. Infrastructure as Code (IaC) & Le Principe d’Idempotence |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Conteneurisation Docker, Multi-Stage Builds & Infrastructure as Code (IaC)
  - **H2** — 1. Conteneurisation vs Virtualisation Lourde : Les Primitives du Noyau Linux
      - **H4** — Namespaces (Isolation)
      - **H4** — Control Groups - cgroups (Plafonds)
      - **H4** — Chroot & Pivot_root (Système de fichiers)
  - **H2** — 2. Le Système de Fichiers en Couches (OverlayFS) & Optimisation du Cache
  - **H2** — 3. Multi-Stage Builds & Durcissement de Sécurité
      - **H4** — Étape 1 : Builder (Compilation)
      - **H4** — Étape 2 : Runtime (Production Épurée)
  - **H2** — 4. Infrastructure as Code (IaC) & Le Principe d’Idempotence
      - **H4** — Approche Impérative (Scripts Bash, CLI)
      - **H4** — Approche Déclarative (Terraform, CloudFormation)
      - **H4** — Idempotence & Détection de Dérive (Configuration Drift)
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Auditeur d’optimisation de Dockerfile (Layer Caching & Multi-Stage)
    - **H3** — Exercice 2 — Calculateur d’empreinte disque des couches d’images partagées
    - **H3** — Exercice 3 — Résolveur d’ordre de démarrage de services Docker Compose (depends_on)
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
| nav | `b3-devopsnav` | Portail → `/`<br>DevOps B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| DevOps B3 | `../index.html` | `b3-devops/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-devops/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-devops/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-devops/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-devops/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-devops/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-devops/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-devops/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-devops/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-devops/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-devops/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-devops/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-devops/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-devops/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-devops/chapitres/formules.html` | interne |
| Chapitre 4 — Déploiement Continu (CD), Stratégies de Release & Feature Flags | `chapitre4.html` | `b3-devops/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| L’hyperviseur KVM |  | — | `opt` | — | actif | — |
| Les Namespaces Linux (pid, net) |  | — | `opt` | — | actif | data-correct=1 |
| Le protocole DNS |  | — | `opt` | — | actif | — |
| Le BIOS physique du serveur |  | — | `opt` | — | actif | — |
| Les cgroups (Control Groups) |  | — | `opt` | — | actif | data-correct=1 |
| Les tables IPTables |  | — | `opt` | — | actif | — |
| Le système de fichiers Ext4 |  | — | `opt` | — | actif | — |
| Le serveur SSH |  | — | `opt` | — | actif | — |
| Car Docker refuse de compiler si les fichiers JavaScript sont copiés en premier |  | — | `opt` | — | actif | — |
| Pour éviter d’invalider le cache de l’installation des dépendances à chaque modification d |  | — | `opt` | — | actif | data-correct=1 |
| Pour chiffrer les dépendances de production |  | — | `opt` | — | actif | — |
| Pour réduire automatiquement la taille de la RAM hôte |  | — | `opt` | — | actif | — |
| Il permet d’exécuter plusieurs systèmes d’exploitation différents dans le même conteneur |  | — | `opt` | — | actif | — |
| Il sépare l’étape de compilation de l’étape de runtime pour produire une image de producti |  | — | `opt` | — | actif | data-correct=1 |
| Il double automatiquement la mémoire allouée au conteneur |  | — | `opt` | — | actif | — |
| Il empêche l’utilisation de Git |  | — | `opt` | — | actif | — |
| Car root consomme trop de bande passante réseau |  | — | `opt` | — | actif | — |
| Car une faille de fuite de conteneur (container breakout) donnerait immédiatement à l’atta |  | — | `opt` | — | actif | data-correct=1 |
| Car Docker interdit le déploiement en production des images root |  | — | `opt` | — | actif | — |
| Car les logs ne peuvent pas être enregistrés sous root |  | — | `opt` | — | actif | — |
| Le script doit s’exécuter obligatoirement en moins d’une seconde |  | — | `opt` | — | actif | — |
| L’application répétée d’une configuration produit le même état final sans créer de duplica |  | — | `opt` | — | actif | data-correct=1 |
| L’infrastructure doit être réinitialisée et détruite chaque matin |  | — | `opt` | — | actif | — |
| Les serveurs doivent tous être localisés dans la même zone géographique |  | — | `opt` | — | actif | — |
| La dérive de configuration (Configuration Drift) |  | — | `opt` | — | actif | data-correct=1 |
| La compilation sémantique |  | — | `opt` | — | actif | — |
| Le multi-threading |  | — | `opt` | — | actif | — |
| L’équilibrage de charge dynamique |  | — | `opt` | — | actif | — |
| Ubuntu Desktop 22.04 LTS complète |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `do3-c3-e1` | analyse | 300 | active | `FROM python:3.11-slim WORKDIR /app COPY requirements.txt . RUN pip install -r requirements.txt COPY . . USER appuser CMD ["python", "main.py"]` | Exercice 1 — Auditeur d’optimisation de Dockerfile (Layer Caching & Multi-Stage) |
| `do3-c3-e2` | analyse | 300 | active | `IMAGE nom=api_auth LAYERS=L_node:150,L_express:30,L_auth:10 IMAGE nom=api_users LAYERS=L_node:150,L_express:30,L_users:15 IMAGE nom=worker LAYERS=L_node:150,L_queues:40` | Exercice 2 — Calculateur d’empreinte disque des couches d’images partagées |
| `do3-c3-e3` | analyse | 300 | active | `SERVICE nom=web depends_on=api SERVICE nom=api depends_on=database,redis SERVICE nom=database depends_on=NONE SERVICE nom=redis depends_on=NONE` | Exercice 3 — Résolveur d’ordre de démarrage de services Docker Compose (depends_on) |

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

- Tableaux : 0
- Blocs `pre` : 6 · elements `code` : 53
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-layers`, `#i-play`, `#i-target`, `#i-warning`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3463 mots · 477 noeuds HTML

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
| `card` | 7 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |
| `badge` | 3 |

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
