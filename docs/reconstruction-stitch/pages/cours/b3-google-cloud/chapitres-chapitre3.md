# Chapitre 3 — Calcul & Virtualisation (Compute Engine, GKE, Cloud Run & App Engine)

> Fiche extraite du fichier `b3-google-cloud/chapitres/chapitre3.html` (528 lignes, 37.8 Ko, sha256 `a0f8a65b57f4`).
> Famille : **cours-b3-google-cloud** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-google-cloud/chapitres/chapitre3.html` |
| Titre du document | Module 3 — Calcul & Virtualisation (Compute Engine, GKE, Cloud Run & App Engine) \| Google Cloud Platform B3 |
| Description meta | Module 3 du cours Google Cloud Platform B3 : Machines virtuelles Google Compute Engine (séries E2, N2, C2, M2, instances Spot préemptibles, disques persistants et calcul de SLA), groupes d'instances gérés (MIG avec auto-scaling et auto-healing), conteneurs managés avec Google Kubernetes Engine (GKE Standard vs Autopilot), architectures Serverless modernes avec Cloud Run (concurrence, scale-to-zero, révisions et traffic splitting) et comparaison avec Cloud Functions et App Engine. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Calcul & Virtualisation (Compute Engine, GKE, Cloud Run & App Engine) |
| 3 | h2 | — | 1. Google Compute Engine (GCE) : Familles de Machines & SLA |
| 4 | h2 | — | 2. Groupes d'Instances Gérés (MIG) : Auto-scaling & Auto-healing |
| 5 | h2 | — | 3. Google Kubernetes Engine (GKE) : Standard vs Autopilot |
| 6 | h2 | — | 4. Serverless Moderne : Cloud Run vs Cloud Functions & App Engine |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 5 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Calcul & Virtualisation (Compute Engine, GKE, Cloud Run & App Engine)
  - **H2** — 1. Google Compute Engine (GCE) : Familles de Machines & SLA
      - **H4** — Familles de Machines Virtuelles
      - **H4** — Engagements de Service (SLA) & Disques Persistants
  - **H2** — 2. Groupes d'Instances Gérés (MIG) : Auto-scaling & Auto-healing
      - **H4** — Instance Template & Déploiement
      - **H4** — Auto-scaling & Auto-healing
  - **H2** — 3. Google Kubernetes Engine (GKE) : Standard vs Autopilot
      - **H4** — GKE Mode Standard
      - **H4** — GKE Mode Autopilot (Recommandé)
  - **H2** — 4. Serverless Moderne : Cloud Run vs Cloud Functions & App Engine
      - **H4** — Cloud Run (PaaS Conteneurisé)
      - **H4** — Cloud Functions v2 (FaaS Événementiel)
      - **H4** — App Engine (Historique)
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Dimensionneur d'Instances Compute Engine et Calcul de SLA Composite
    - **H3** — Exercice 2 — Moteur d'Auto-scaling pour Groupes d'Instances Gérés (MIG)
    - **H3** — Exercice 3 — Déployeur Serverless Cloud Run et Répartition de Trafic Multi-Révisions
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
| nav | `b3-google-cloudnav` | Portail → `/`<br>Google Cloud Platform B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Google Cloud Platform B3 | `../index.html` | `b3-google-cloud/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-google-cloud/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-google-cloud/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-google-cloud/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-google-cloud/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-google-cloud/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-google-cloud/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-google-cloud/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-google-cloud/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-google-cloud/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-google-cloud/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-google-cloud/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-google-cloud/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-google-cloud/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-google-cloud/chapitres/formules.html` | interne |
| Module 4 — Réseau Virtuel VPC, Routage, Sécurité & Répartiteurs de Charge | `chapitre4.html` | `b3-google-cloud/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 99.0% |  | — | `opt` | — | actif | — |
| 99.5% |  | — | `opt` | — | actif | — |
| 99.99% |  | — | `opt` | — | actif | data-correct=1 |
| 99.999% |  | — | `opt` | — | actif | — |
| L'Auto-scaling |  | — | `opt` | — | actif | — |
| L'Auto-healing (Auto-guérison) |  | — | `opt` | — | actif | data-correct=1 |
| Le Rolling Update |  | — | `opt` | — | actif | — |
| Le Load Balancing |  | — | `opt` | — | actif | — |
| GKE Autopilot facture au nombre de requêtes HTTP |  | — | `opt` | — | actif | — |
| GKE Autopilot facture uniquement les ressources de vCPU/RAM allouées aux Pods et non les V |  | — | `opt` | — | actif | data-correct=1 |
| GKE Standard est gratuit |  | — | `opt` | — | actif | — |
| GKE Autopilot ne supporte pas Linux |  | — | `opt` | — | actif | — |
| Google Compute Engine |  | — | `opt` | — | actif | — |
| Cloud Run |  | — | `opt` | — | actif | data-correct=1 |
| Cloud SQL |  | — | `opt` | — | actif | — |
| Cloud Storage |  | — | `opt` | — | actif | — |
| 10% |  | — | `opt` | — | actif | — |
| 30% |  | — | `opt` | — | actif | — |
| jusqu'à 60% à 91% |  | — | `opt` | — | actif | data-correct=1 |
| 5% |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `gcp3-c3-e1` | analyse | 300 | active | `GCE_SIZE machine_type=e2-standard-4 GCE_SLA multi_zone=true` | Exercice 1 — Dimensionneur d'Instances Compute Engine et Calcul de SLA Composite |
| `gcp3-c3-e2` | analyse | 300 | active | `MIG_AUTOSCALE min=2 max=10 target_cpu=0.60 current_instances=3 current_cpu=0.85` | Exercice 2 — Moteur d'Auto-scaling pour Groupes d'Instances Gérés (MIG) |
| `gcp3-c3-e3` | analyse | 300 | active | `VALIDATE_SPLIT revs=v1:80,v2:20 ROUTE_REQUEST req_id=REQ-1001 revs=v1:80,v2:20` | Exercice 3 — Déployeur Serverless Cloud Run et Répartition de Trafic Multi-Révisions |

- QCM : 1 bloc(s), **5 question(s)**.
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
- Blocs `pre` : 3 · elements `code` : 38
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3198 mots · 491 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 20 |
| `ic` | 19 |
| `card` | 9 |
| `box` | 7 |
| `box__title` | 7 |
| `q` | 5 |
| `q__stem` | 5 |
| `opts` | 5 |
| `q__exp` | 5 |
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

Attributs `data-*` : `data-correct` (5), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
