# Chapitre 5 — Stockage Distribué, Bases de Données & Pipeline Big Data

> Fiche extraite du fichier `b3-google-cloud/chapitres/chapitre5.html` (552 lignes, 45.7 Ko, sha256 `ac899574317b`).
> Famille : **cours-b3-google-cloud** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-google-cloud/chapitres/chapitre5.html` |
| Titre du document | Module 5 — Stockage Distribué, Bases de Données & Pipeline Big Data \| Google Cloud Platform B3 |
| Description meta | Module 5 du cours Google Cloud Platform B3 : Google Cloud Storage (classes Standard, Rapid, Nearline, Coldline et Archive et règles de cycle de vie), bases relationnelles managées (Cloud SQL HA et Cloud Spanner, SLA selon la configuration), bases NoSQL managées et ingestion de flux asynchrone avec Cloud Pub/Sub. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Stockage Distribué, Bases de Données & Pipeline Big Data |
| 3 | h2 | — | 1. Google Cloud Storage (GCS) : Classes d'Objets & Cycle de Vie |
| 4 | h2 | — | 2. Bases Relationnelles : Cloud SQL vs Cloud Spanner |
| 5 | h2 | — | 3. Bases NoSQL : Firestore vs Cloud Bigtable |
| 6 | h2 | — | 4. Ingestion de Données Asynchrone : Cloud Pub/Sub & Écosystème Big Data |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 5 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Stockage Distribué, Bases de Données & Pipeline Big Data
  - **H2** — 1. Google Cloud Storage (GCS) : Classes d'Objets & Cycle de Vie
      - **H4** — Les 5 classes principales au 30 octobre 2026
      - **H4** — Gestion Automatisée du Cycle de Vie (Lifecycle Rules)
  - **H2** — 2. Bases Relationnelles : Cloud SQL vs Cloud Spanner
      - **H4** — Cloud SQL (Régional Managé)
      - **H4** — Cloud Spanner (NewSQL Mondial Distribué)
  - **H2** — 3. Bases NoSQL : Firestore vs Cloud Bigtable
      - **H4** — Firestore (NoSQL Document Temps Réel)
      - **H4** — Cloud Bigtable (NoSQL Large-Colonne Analytique)
  - **H2** — 4. Ingestion de Données Asynchrone : Cloud Pub/Sub & Écosystème Big Data
      - **H4** — Fonctionnement de Cloud Pub/Sub
      - **H4** — La Suite Analytique Google Cloud
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Analyse du cycle de vie et des classes Cloud Storage
    - **H3** — Exercice 2 — Sélecteur de données GCP et objectifs de disponibilité
    - **H3** — Exercice 3 — Analyse de messages et de relivraison Pub/Sub
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

Liens sortants : **35** (externes : 14).

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
| classes de stockage | `https://docs.cloud.google.com/storage/docs/storage-classes` | `https://docs.cloud.google.com/storage/docs/storage-classes` | externe |
| Rapid Bucket | `https://docs.cloud.google.com/storage/docs/rapid/rapid-bucket` | `https://docs.cloud.google.com/storage/docs/rapid/rapid-bucket` | externe |
| zones disponibles | `https://docs.cloud.google.com/storage/docs/locations#location-z` | `https://docs.cloud.google.com/storage/docs/locations#location-z` | externe |
| quotas Cloud Storage | `https://docs.cloud.google.com/storage/quotas` | `https://docs.cloud.google.com/storage/quotas` | externe |
| SLA Cloud SQL | `https://cloud.google.com/sql/sla` | `https://cloud.google.com/sql/sla` | externe |
| SLA Spanner | `https://cloud.google.com/spanner/sla` | `https://cloud.google.com/spanner/sla` | externe |
| retry | `https://docs.cloud.google.com/pubsub/docs/subscription-retry-policy` | `https://docs.cloud.google.com/pubsub/docs/subscription-retry-policy` | externe |
| prolongation du délai | `https://docs.cloud.google.com/pubsub/docs/lease-management` | `https://docs.cloud.google.com/pubsub/docs/lease-management` | externe |
| abonnements | `https://docs.cloud.google.com/pubsub/docs/subscription-overview` | `https://docs.cloud.google.com/pubsub/docs/subscription-overview` | externe |
| … | | | 4 lien(s) supplementaire(s) |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 0 jour |  | — | `opt` | — | actif | — |
| 30 jours |  | — | `opt` | — | actif | data-correct=1 |
| 90 jours |  | — | `opt` | — | actif | — |
| 365 jours |  | — | `opt` | — | actif | — |
| Le protocole Raft |  | — | `opt` | — | actif | — |
| Google TrueTime (horloges atomiques et récepteurs GPS) |  | — | `opt` | — | actif | data-correct=1 |
| La technologie Quantum Sync |  | — | `opt` | — | actif | — |
| Les disques NVMe |  | — | `opt` | — | actif | — |
| Firestore |  | — | `opt` | — | actif | — |
| Cloud Bigtable |  | — | `opt` | — | actif | data-correct=1 |
| Cloud SQL |  | — | `opt` | — | actif | — |
| Firebase Realtime Database |  | — | `opt` | — | actif | — |
| Le message est détruit immédiatement |  | — | `opt` | — | actif | — |
| Pub/Sub peut tenter de le relivrer au même client ou à un autre |  | — | `opt` | — | actif | data-correct=1 |
| Pub/Sub prouve que le consommateur est en panne |  | — | `opt` | — | actif | — |
| Le message est forcément livré immédiatement à un autre client |  | — | `opt` | — | actif | — |
| Les autorisations IAM au niveau du projet |  | — | `opt` | — | actif | — |
| Les règles de pare-feu VPC |  | — | `opt` | — | actif | — |
| Les URL signées (Signed URLs) |  | — | `opt` | — | actif | data-correct=1 |
| Le partage de clés de compte de service |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `gcp3-c5-e1` | analyse | 300 | active | `LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=STANDARD age_days=35 target_class=NEARLINE min_age=30` | Exercice 1 — Analyse du cycle de vie et des classes Cloud Storage |
| `gcp3-c5-e2` | analyse | 300 | active | `SELECT_DB model=RELATIONAL scale=GLOBAL choice=SPANNER config=MULTI_REGION eligible=YES` | Exercice 2 — Sélecteur de données GCP et objectifs de disponibilité |
| `gcp3-c5-e3` | analyse | 300 | active | `CREATE_SUB sub=order-processor ack_deadline=10 DELIVER_MSG sub=order-processor msg_id=ORD-999 elapsed_time=6 effective_deadline=10 ack=YES DELIVER_MSG sub=order-processor msg_id=ORD-1000 elapsed_time=14 effective_deadline=10 ack=NO` | Exercice 3 — Analyse de messages et de relivraison Pub/Sub |

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
- Blocs `pre` : 4 · elements `code` : 44
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~4203 mots · 489 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 20 |
| `ic` | 19 |
| `card` | 8 |
| `box` | 7 |
| `box__title` | 7 |
| `q` | 5 |
| `q__stem` | 5 |
| `opts` | 5 |
| `q__exp` | 5 |
| `grid` | 4 |
| `grid-2` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
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
