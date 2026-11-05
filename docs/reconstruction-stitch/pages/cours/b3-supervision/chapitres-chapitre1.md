# Chapitre 1 — Fondements de la Supervision, Périmètres & Indicateurs de Fiabilité (SLA, MTBF, MTTR)

> Fiche extraite du fichier `b3-supervision/chapitres/chapitre1.html` (515 lignes, 37.8 Ko, sha256 `d6a069bcfffd`).
> Famille : **cours-b3-supervision** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-supervision/chapitres/chapitre1.html` |
| Titre du document | Module 1 — Fondements de la Supervision, Périmètres & Indicateurs de Fiabilité (SLA, MTBF, MTTR) \| Supervision &amp; Observabilité B3 |
| Description meta | Module 1 du cours Supervision & Observabilité B3 : Distinctions supervision, monitoring, métrologie et audit, périmètres d'infrastructure, calculs MTBF/MTTR, engagements SLA et Error Budget SRE. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Fondements de la Supervision, Périmètres & Indicateurs de Fiabilité (SLA, MTBF, MTTR) |
| 3 | h2 | — | 1. Définitions & Distinctions : Supervision, Monitoring, Métrologie & Audit |
| 4 | h2 | — | 2. Périmètre Global de la Supervision en Entreprise |
| 5 | h2 | — | 3. Indicateurs de Fiabilité Opérationnelle : SLA, MTBF, MTTR & Error Budget |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Fondements de la Supervision, Périmètres & Indicateurs de Fiabilité (SLA, MTBF, MTTR)
  - **H2** — 1. Définitions & Distinctions : Supervision, Monitoring, Métrologie & Audit
      - **H4** — Supervision vs Monitoring
      - **H4** — Métrologie vs Audit
  - **H2** — 2. Périmètre Global de la Supervision en Entreprise
      - **H4** — 1. Supervision des Serveurs & Matériels
      - **H4** — 2. Supervision Réseau & Périphériques
      - **H4** — 3. Supervision des Services Protocolaires
      - **H4** — 4. Supervision Applicative & Métier
  - **H2** — 3. Indicateurs de Fiabilité Opérationnelle : SLA, MTBF, MTTR & Error Budget
      - **H4** — MTTR (Maintenabilité)
      - **H4** — MTBF (Fiabilité)
      - **H4** — Disponibilité Globale
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur de Disponibilité SLA, MTBF et MTTR
    - **H3** — Exercice 2 — Matrice de Criticité & Priorisation d’Incidents de Supervision
    - **H3** — Exercice 3 — Auditeur de Respect SLO et Budget d’Erreur (Error Budget)
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
| nav | `b3-supervisionnav` | Portail → `/`<br>Supervision &amp; Observabilité B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **23** (externes : 2).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Supervision &amp; Observabilité B3 | `../index.html` | `b3-supervision/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-supervision/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-supervision/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-supervision/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-supervision/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-supervision/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-supervision/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-supervision/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-supervision/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-supervision/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-supervision/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-supervision/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-supervision/chapitres/examens.html` | interne |
| Supervision & Observabilité B3 | `../index.html` | `b3-supervision/index.html` | interne |
| NIST, estimation et cas sans défaillance | `https://www.itl.nist.gov/div898/handbook/apr/section4/apr451.htm` | `https://www.itl.nist.gov/div898/handbook/apr/section4/apr451.htm` | externe |
| Google SRE | `https://sre.google/sre-book/service-level-objectives/` | `https://sre.google/sre-book/service-level-objectives/` | externe |
| Réviser avec les flashcards | `cartes.html` | `b3-supervision/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-supervision/chapitres/formules.html` | interne |
| Module 2 — Architecture des Systèmes de Supervision & Protocoles de Collecte (SNMP & Syslog) | `chapitre2.html` | `b3-supervision/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| L'audit de conformité |  | — | `opt` | — | actif | — |
| La métrologie |  | — | `opt` | — | actif | data-correct=1 |
| La supervision réactive |  | — | `opt` | — | actif | — |
| Le pentest offensif |  | — | `opt` | — | actif | — |
| 1.0 heure |  | — | `opt` | — | actif | — |
| 0.5 heure |  | — | `opt` | — | actif | data-correct=1 |
| 359.5 heures |  | — | `opt` | — | actif | — |
| 719.0 heures |  | — | `opt` | — | actif | — |
| 0.5 heure |  | — | `opt` | — | actif | — |
| 359.5 heures |  | — | `opt` | — | actif | data-correct=1 |
| 719.0 heures |  | — | `opt` | — | actif | — |
| 720.0 heures |  | — | `opt` | — | actif | — |
| 4.32 minutes |  | — | `opt` | — | actif | — |
| 43.2 minutes |  | — | `opt` | — | actif | data-correct=1 |
| 432 minutes |  | — | `opt` | — | actif | — |
| 14.4 minutes |  | — | `opt` | — | actif | — |
| Taux d'inodes occupés sur /var |  | — | `opt` | — | actif | — |
| Erreurs de trames CRC et ifOperStatus sur un commutateur |  | — | `opt` | — | actif | data-correct=1 |
| Latence de requête SQL sur MySQL |  | — | `opt` | — | actif | — |
| Nombre de baux DHCP expirés |  | — | `opt` | — | actif | — |
| Augmenter immédiatement le prix du contrat client |  | — | `opt` | — | actif | — |
| Geler temporairement les déploiements de nouvelles fonctionnalités au profit de la fiabili |  | — | `opt` | — | actif | data-correct=1 |
| Arrêter définitivement le serveur de production |  | — | `opt` | — | actif | — |
| Supprimer les sondes de supervision pour masquer les pannes |  | — | `opt` | — | actif | — |
| Les requêtes HTTP entrantes |  | — | `opt` | — | actif | — |
| L'état matériel hors-bande (température, alimentations, ventilateurs, disques) |  | — | `opt` | — | actif | data-correct=1 |
| Le temps de parsing des requêtes DNS |  | — | `opt` | — | actif | — |
| Le nombre de lignes de logs générées par minute |  | — | `opt` | — | actif | — |
| L'audit est permanent alors que la supervision est annuelle |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sup3-c1-e1` | analyse | 300 | active | `SLA_CALC TOTAL_HOURS=720 OUTAGES=45,15` | Exercice 1 — Calculateur de Disponibilité SLA, MTBF et MTTR |
| `sup3-c1-e2` | analyse | 300 | active | `INCIDENT SERVICE=Switch-Core-01 LAYER=network USERS=250 REDUNDANT=NO` | Exercice 2 — Matrice de Criticité & Priorisation d’Incidents de Supervision |
| `sup3-c1-e3` | analyse | 300 | active | `ERROR_BUDGET SLO=99.9 PERIOD_DAYS=30 OUTAGES=12,18,5` | Exercice 3 — Auditeur de Respect SLO et Budget d’Erreur (Error Budget) |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 6 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 3 · elements `code` : 28
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-chart`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3262 mots · 461 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 18 |
| `card` | 9 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 6 |
| `box__title` | 6 |
| `grid` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid-2` | 3 |
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
