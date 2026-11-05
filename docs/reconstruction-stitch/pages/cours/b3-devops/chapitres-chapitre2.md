# Chapitre 2 — Intégration Continue (CI), Stratégies de Branchement & Automatisation des Tests

> Fiche extraite du fichier `b3-devops/chapitres/chapitre2.html` (555 lignes, 37.9 Ko, sha256 `795888ce8b22`).
> Famille : **cours-b3-devops** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-devops/chapitres/chapitre2.html` |
| Titre du document | Chapitre 2 — Intégration Continue (CI), Stratégies de Branchement &amp; Automatisation des Tests \| DevOps B3 |
| Description meta | Chapitre 2 du cours DevOps B3 : Fondements de l’Intégration Continue, Trunk-Based Development vs GitFlow, conformité SemVer 2.0.0, pyramide des tests et détection des Flaky Tests. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Intégration Continue (CI), Stratégies de Branchement & Automatisation des Tests |
| 3 | h2 | — | 1. L’Intégration Continue (CI) : Philosophie & Règles d’Or |
| 4 | h2 | — | 2. Stratégies de Branchement Git : Trunk-Based vs GitFlow |
| 5 | h2 | — | 3. Semantic Versioning (SemVer 2.0.0) : La Rigueur Contractuelle |
| 6 | h2 | — | 4. La Pyramide des Tests & La Chasse aux Tests Instables (Flaky Tests) |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 2 — Intégration Continue (CI), Stratégies de Branchement & Automatisation des Tests
  - **H2** — 1. L’Intégration Continue (CI) : Philosophie & Règles d’Or
      - **H4** — 1. Commit Fréquent sur le Tronc
      - **H4** — 2. Feedback en Moins de 10 Minutes
      - **H4** — 3. Règle du Tronc Vert (Stop the Line)
  - **H2** — 2. Stratégies de Branchement Git : Trunk-Based vs GitFlow
  - **H2** — 3. Semantic Versioning (SemVer 2.0.0) : La Rigueur Contractuelle
      - **H4** — MAJOR (X.0.0)
      - **H4** — MINOR (X.Y.0)
      - **H4** — PATCH (X.Y.Z)
  - **H2** — 4. La Pyramide des Tests & La Chasse aux Tests Instables (Flaky Tests)
      - **H4** — Tests Unitaires (70% du volume)
      - **H4** — Tests d’Intégration (20% du volume)
      - **H4** — Tests End-to-End E2E (10% du volume)
      - **H4** — Le Fléau des Tests Instables (Flaky Tests)
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Incrémenteur de versioning sémantique SemVer 2.0.0 selon Conventional Commits
    - **H3** — Exercice 2 — Auditeur de seuil de qualité de build CI (Quality Gate SonarQube)
    - **H3** — Exercice 3 — Moteur d’optimisation temporelle de pipeline CI/CD (Parallélisme & Chemin critique)
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
| Chapitre 3 — Conteneurisation Docker, Multi-Stage Builds & Infrastructure as Code (IaC) | `chapitre3.html` | `b3-devops/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Une fois par mois à la fin du sprint |  | — | `opt` | — | actif | — |
| Au minimum une fois par jour (idéalement plusieurs fois par jour) |  | — | `opt` | — | actif | data-correct=1 |
| Uniquement lorsque la fonctionnalité complète est recettée par le client |  | — | `opt` | — | actif | — |
| À chaque fin de trimestre |  | — | `opt` | — | actif | — |
| L’absence totale de système de contrôle de version |  | — | `opt` | — | actif | — |
| L’utilisation d’une branche principale unique avec des branches de travail très courtes (m |  | — | `opt` | — | actif | data-correct=1 |
| L’interdiction formelle d’exécuter des tests automatisés |  | — | `opt` | — | actif | — |
| La conservation de branches de fonctionnalités pendant au moins six mois |  | — | `opt` | — | actif | — |
| PATCH |  | — | `opt` | — | actif | — |
| MINOR |  | — | `opt` | — | actif | — |
| MAJOR |  | — | `opt` | — | actif | data-correct=1 |
| BUILD |  | — | `opt` | — | actif | — |
| 70% E2E, 20% Intégration, 10% Unitaires |  | — | `opt` | — | actif | — |
| 70% Unitaires, 20% Intégration, 10% E2E / UI |  | — | `opt` | — | actif | data-correct=1 |
| 33% de chaque type à parts strictement égales |  | — | `opt` | — | actif | — |
| 90% manuels, 10% automatisés |  | — | `opt` | — | actif | — |
| Un test écrit en langage Perl déprécié |  | — | `opt` | — | actif | — |
| Un test qui réussit ou échoue de manière intermittente sur un même code source sans modifi |  | — | `opt` | — | actif | data-correct=1 |
| Un test qui prend systématiquement plus d’une heure à s’exécuter |  | — | `opt` | — | actif | — |
| Un test unitaire qui ne teste aucune assertion |  | — | `opt` | — | actif | — |
| Relancer en boucle le pipeline jusqu’à ce qu’il devienne vert par hasard |  | — | `opt` | — | actif | — |
| Mettre immédiatement le test en quarantaine hors du build bloquant et planifier sa correct |  | — | `opt` | — | actif | data-correct=1 |
| Supprimer la suite de tests complète du projet |  | — | `opt` | — | actif | — |
| Désactiver la vérification des tests sur la branche de production |  | — | `opt` | — | actif | — |
| Une refonte totale avec rupture de contrat |  | — | `opt` | — | actif | — |
| L’ajout d’une nouvelle fonctionnalité rétrocompatible sans breaking change |  | — | `opt` | — | actif | data-correct=1 |
| Uniquement la correction d’un bogue de sécurité critique |  | — | `opt` | — | actif | — |
| Une version de pré-développement instable |  | — | `opt` | — | actif | — |
| Moins de 10 minutes |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `do3-c2-e1` | analyse | 300 | active | `RELEASE version=1.4.2 type=FIX RELEASE version=1.4.2 type=FEAT RELEASE version=1.4.2 type=BREAKING` | Exercice 1 — Incrémenteur de versioning sémantique SemVer 2.0.0 selon Conventional Commits |
| `do3-c2-e2` | analyse | 300 | active | `GATE app=auth_service coverage=85.5 vuln=0 bugs=0 duplicated=1.8 GATE app=payment_api coverage=72.0 vuln=2 bugs=1 duplicated=4.5` | Exercice 2 — Auditeur de seuil de qualité de build CI (Quality Gate SonarQube) |
| `do3-c2-e3` | analyse | 300 | active | `STAGE nom=build groupe=NONE duree=45 STAGE nom=unit_tests groupe=test_matrix duree=60 STAGE nom=integration_tests groupe=test_matrix duree=120 STAGE nom=linting groupe=test_matrix duree=30 STAGE nom=package groupe=NONE duree=25` | Exercice 3 — Moteur d’optimisation temporelle de pipeline CI/CD (Parallélisme & Chemin critique) |

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
- Blocs `pre` : 3 · elements `code` : 35
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-layers`, `#i-play`, `#i-target`, `#i-info`, `#i-warning`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3191 mots · 484 noeuds HTML

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
| `card` | 9 |
| `box` | 8 |
| `box__title` | 8 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
| `grid-3` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |

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
