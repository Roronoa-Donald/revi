# Chapitre 1 — Architecture Globale, Hiérarchie des Ressources & CLI gcloud

> Fiche extraite du fichier `b3-google-cloud/chapitres/chapitre1.html` (554 lignes, 40.4 Ko, sha256 `4253f37af041`).
> Famille : **cours-b3-google-cloud** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-google-cloud/chapitres/chapitre1.html` |
| Titre du document | Module 1 — Architecture Globale, Hiérarchie des Ressources & CLI gcloud \| Google Cloud Platform B3 |
| Description meta | Module 1 du cours Google Cloud Platform B3 : Structure mondiale des datacenters Google (Régions, Zones de disponibilité, PoP Edge Network), hiérarchie organisationnelle des ressources (Organisation, Dossiers, Projets, Ressources), règles de nommage et identifiants de projets (RFC 1035), gestion des quotas et facturation, et maîtrise des outils d'administration (Google Cloud Console, Cloud Shell et SDK gcloud CLI). Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Architecture Globale, Hiérarchie des Ressources & CLI gcloud |
| 3 | h2 | — | 1. Infrastructure Mondiale de Google Cloud : Régions, Zones & Réseau Edge |
| 4 | h2 | — | 2. Hiérarchie Organisationnelle des Ressources Google Cloud |
| 5 | h2 | — | 3. Gestion des Quotas, Facturation & Comptes de Facturation |
| 6 | h2 | — | 4. Administration avec le SDK gcloud CLI & Cloud Shell |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 5 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Architecture Globale, Hiérarchie des Ressources & CLI gcloud
  - **H2** — 1. Infrastructure Mondiale de Google Cloud : Régions, Zones & Réseau Edge
      - **H4** — Régions Géographiques
      - **H4** — Zones de Disponibilité (AZ)
      - **H4** — Réseau Mondial Privé (Edge)
  - **H2** — 2. Hiérarchie Organisationnelle des Ressources Google Cloud
      - **H4** — Les 4 Niveaux de la Hiérarchie
      - **H4** — Les 3 Identifiants d'un Projet GCP
  - **H2** — 3. Gestion des Quotas, Facturation & Comptes de Facturation
      - **H4** — Comptes de Facturation (Cloud Billing Accounts)
      - **H4** — Quotas de Ressources & Limites de Débit
  - **H2** — 4. Administration avec le SDK gcloud CLI & Cloud Shell
      - **H4** — Cloud Shell
      - **H4** — Le SDK gcloud CLI
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Validateur de Hiérarchie des Ressources et Nommage GCP
    - **H3** — Exercice 2 — Sélecteur de Région et Répartition Multi-Zones GCP
    - **H3** — Exercice 3 — Parser et Simulateur de Contexte CLI gcloud
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

Liens sortants : **24** (externes : 3).

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
| carte Google Cloud | `https://cloud.google.com/about/locations` | `https://cloud.google.com/about/locations` | externe |
| politiques IAM deny | `https://docs.cloud.google.com/iam/docs/deny-overview` | `https://docs.cloud.google.com/iam/docs/deny-overview` | externe |
| principes de conception pour la disponibilité | `https://docs.cloud.google.com/architecture/framework/reliability` | `https://docs.cloud.google.com/architecture/framework/reliability` | externe |
| Réviser avec les flashcards | `cartes.html` | `b3-google-cloud/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-google-cloud/chapitres/formules.html` | interne |
| Module 2 — Sécurité des Identités IAM, Comptes de Service & Stratégies d'Accès | `chapitre2.html` | `b3-google-cloud/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Projet > Dossier > Organisation > Ressource |  | — | `opt` | — | actif | — |
| Organisation > Dossiers > Projets > Ressources |  | — | `opt` | — | actif | data-correct=1 |
| Dossier > Organisation > Projet > Ressource |  | — | `opt` | — | actif | — |
| Ressource > Projet > Dossier > Organisation |  | — | `opt` | — | actif | — |
| mon-projet-cloud-2026 |  | — | `opt` | — | actif | data-correct=1 |
| PROJET_PROD_1 |  | — | `opt` | — | actif | — |
| 123-mon-projet |  | — | `opt` | — | actif | — |
| projet-super-cloud-de-test-pour-la-production-mondiale-2026 |  | — | `opt` | — | actif | — |
| 1 zone |  | — | `opt` | — | actif | — |
| 2 zones |  | — | `opt` | — | actif | — |
| 3 zones |  | — | `opt` | — | actif | data-correct=1 |
| 5 zones |  | — | `opt` | — | actif | — |
| gcloud projects select [ID] |  | — | `opt` | — | actif | — |
| gcloud config set project [ID] |  | — | `opt` | — | actif | data-correct=1 |
| gcloud switch project [ID] |  | — | `opt` | — | actif | — |
| gcloud use [ID] |  | — | `opt` | — | actif | — |
| L'utilisateur doit demander une validation pour chaque projet |  | — | `opt` | — | actif | — |
| Le rôle allow est hérité, mais un deny applicable peut refuser certaines permissions |  | — | `opt` | — | actif | data-correct=1 |
| L'utilisateur ne peut lire que le premier projet créé |  | — | `opt` | — | actif | — |
| Le rôle est bloqué car il doit être attribué à l'organisation |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `gcp3-c1-e1` | analyse | 300 | active | `VALIDATE_PROJECT_ID id=tp-cloud-b3-prod HIERARCHY_LEVEL type=PROJECT` | Exercice 1 — Validateur de Hiérarchie des Ressources et Nommage GCP |
| `gcp3-c1-e2` | analyse | 300 | active | `REGION_INFO region=europe-west9 MULTI_ZONE_DEPLOY region=europe-west9 instance_count=5` | Exercice 2 — Sélecteur de Région et Répartition Multi-Zones GCP |
| `gcp3-c1-e3` | analyse | 300 | active | `gcloud config set project tp-module1-prod gcloud config set compute/region europe-west9 gcloud config get project gcloud config list` | Exercice 3 — Parser et Simulateur de Contexte CLI gcloud |

- QCM : 1 bloc(s), **5 question(s)**.
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

- Tableaux : 0
- Blocs `pre` : 4 · elements `code` : 61
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-info`, `#i-warning`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3616 mots · 506 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 20 |
| `opt` | 20 |
| `card` | 9 |
| `box` | 8 |
| `box__title` | 8 |
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
