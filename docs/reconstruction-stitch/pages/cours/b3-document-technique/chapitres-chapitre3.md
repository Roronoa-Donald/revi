# Chapitre 3 — Architecture & Documentation Système (DAT & DEX)

> Fiche extraite du fichier `b3-document-technique/chapitres/chapitre3.html` (502 lignes, 35.9 Ko, sha256 `9201a698dc7f`).
> Famille : **cours-b3-document-technique** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-document-technique/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Architecture &amp; Documentation Système (DAT &amp; DEX) \| Document Technique B3 |
| Description meta | Chapitre 3 du cours Document Technique B3 : Dossier d’Architecture Technique (DAT), Dossier d’Exploitation (DEX / Runbook), ordonnancement de services, métriques de résilience RTO/RPO et procédures PRA. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Architecture & Documentation Système (DAT & DEX) |
| 3 | h2 | — | 1. Le Dossier d’Architecture Technique (DAT) : La Cartographie Globale |
| 4 | h2 | — | 2. Le Dossier d’Exploitation (DEX / Runbook) : Le Guide Opérationnel |
| 5 | h2 | — | 3. Plans de Continuité et de Reprise : La Métrologie RTO & RPO |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Architecture & Documentation Système (DAT & DEX)
  - **H2** — 1. Le Dossier d’Architecture Technique (DAT) : La Cartographie Globale
      - **H4** — 1. Topologie d’Infrastructure
      - **H4** — 2. Plan d’Adressage & Flux
      - **H4** — 3. Dimensionnement & Redondance
  - **H2** — 2. Le Dossier d’Exploitation (DEX / Runbook) : Le Guide Opérationnel
      - **H4** — Contenu Obligatoire d’un DEX
      - **H4** — L’Ordonnancement des Services
  - **H2** — 3. Plans de Continuité et de Reprise : La Métrologie RTO & RPO
      - **H4** — RTO (Recovery Time Objective)
      - **H4** — RPO (Recovery Point Objective)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Analyseur d’objectifs de reprise d’activité (RTO & RPO) dans un DEX
    - **H3** — Exercice 2 — Ordonnanceur de procédure d’arrêt et de démarrage d’infrastructure (Runbook DEX)
    - **H3** — Exercice 3 — Analyseur de procédure de bascule de secours PRA (Failover Downtime)
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
| nav | `b3-document-techniquenav` | Portail → `/`<br>Document Technique B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Document Technique B3 | `../index.html` | `b3-document-technique/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-document-technique/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-document-technique/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-document-technique/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-document-technique/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-document-technique/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-document-technique/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-document-technique/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-document-technique/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-document-technique/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-document-technique/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-document-technique/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-document-technique/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-document-technique/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-document-technique/chapitres/formules.html` | interne |
| Chapitre 4 — Documentation d’API & Référence Technique (OpenAPI / Swagger) | `chapitre4.html` | `b3-document-technique/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Le RPO (Recovery Point Objective) |  | — | `opt` | — | actif | — |
| Le RTO (Recovery Time Objective) |  | — | `opt` | — | actif | data-correct=1 |
| Le CPU Throttle |  | — | `opt` | — | actif | — |
| Le taux de clics (CTR) |  | — | `opt` | — | actif | — |
| 0 minute |  | — | `opt` | — | actif | — |
| 15 heures de transactions perdues |  | — | `opt` | — | actif | data-correct=1 |
| 24 heures |  | — | `opt` | — | actif | — |
| 45 minutes |  | — | `opt` | — | actif | — |
| Base de données -> API applicative -> Passerelle Web |  | — | `opt` | — | actif | — |
| Passerelle Web -> API applicative -> Base de données |  | — | `opt` | — | actif | data-correct=1 |
| API applicative -> Passerelle Web -> Base de données |  | — | `opt` | — | actif | — |
| Les trois composants doivent être éteints de manière simultanée |  | — | `opt` | — | actif | — |
| Le DEX est imprimé en couleur tandis que le DAT est en noir et blanc |  | — | `opt` | — | actif | — |
| Le DEX contient les consignes opérationnelles d’action (Runbooks, redémarrages, sauvegarde |  | — | `opt` | — | actif | data-correct=1 |
| Le DEX est réservé aux commerciaux de l’entreprise |  | — | `opt` | — | actif | — |
| Le DAT ne contient aucune information sur les serveurs |  | — | `opt` | — | actif | — |
| Pause déjeuner, réunion commerciale, audit fiscal, départ en vacances |  | — | `opt` | — | actif | — |
| Détection de panne, décision/arbitrage, bascule réseau IP/DNS, vérification d’intégrité |  | — | `opt` | — | actif | data-correct=1 |
| Compilation du code, réécriture des tests, formation des stagiaires, livraison client |  | — | `opt` | — | actif | — |
| Achat du matériel, transport routier, déballage, installation physique |  | — | `opt` | — | actif | — |
| Pour occuper les ingénieurs pendant la nuit |  | — | `opt` | — | actif | — |
| Car une sauvegarde peut réussir sur le plan logiciel tout en produisant une archive corrom |  | — | `opt` | — | actif | data-correct=1 |
| Pour effacer les données des clients et faire de la place sur le disque |  | — | `opt` | — | actif | — |
| Pour payer moins d’impôts |  | — | `opt` | — | actif | — |
| Une zone où aucun serveur n’est installé |  | — | `opt` | — | actif | — |
| Un sous-réseau isolé intermédiaire séparant le réseau public non fiable (Internet) du rése |  | — | `opt` | — | actif | data-correct=1 |
| Le bureau du directeur de la sécurité informatique |  | — | `opt` | — | actif | — |
| La salle de repos des développeurs |  | — | `opt` | — | actif | — |
| Aucune conséquence, une sauvegarde quotidienne suffit |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `dt3-c3-e1` | analyse | 300 | active | `RTO_RPO_AUDIT service=Paiement rto_estime_min=15 rto_max_min=30 rpo_estime_min=5 rpo_max_min=10` | Exercice 1 — Analyseur d’objectifs de reprise d’activité (RTO & RPO) dans un DEX |
| `dt3-c3-e2` | analyse | 300 | active | `RUNBOOK action=DEMARRAGE couches=BDD,API,WEB` | Exercice 2 — Ordonnanceur de procédure d’arrêt et de démarrage d’infrastructure (Runbook DEX) |
| `dt3-c3-e3` | analyse | 300 | active | `PRA_FAILOVER nom=DC_Secours t_detect_s=30 t_decision_s=60 t_bascule_s=120 t_verif_s=30 sla_max_s=300` | Exercice 3 — Analyseur de procédure de bascule de secours PRA (Failover Downtime) |

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
- Blocs `pre` : 3 · elements `code` : 16
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-file`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2966 mots · 424 noeuds HTML

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
