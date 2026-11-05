# Chapitre 5 — Stockage & Données — Amazon S3, EFS, RDS & NoSQL DynamoDB

> Fiche extraite du fichier `b3-cloud-aws/chapitres/chapitre5.html` (558 lignes, 39.5 Ko, sha256 `24f8d2a984f6`).
> Famille : **cours-b3-cloud-aws** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cloud-aws/chapitres/chapitre5.html` |
| Titre du document | Module 5 — Stockage & Données — Amazon S3, EFS, RDS & NoSQL DynamoDB \| Services Cloud AWS B3 |
| Description meta | Module 5 du cours Services Cloud AWS B3 : Stockage objet S3, cycle de vie, S3 Block Public Access, EFS multi-AZ, bases relationnelles RDS & Aurora, et NoSQL DynamoDB (RCU/WCU). Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Stockage & Données — Amazon S3, EFS, RDS & NoSQL DynamoDB |
| 3 | h2 | — | 1. Amazon S3 : Stockage Objet & Classes de Stockage |
| 4 | h2 | — | 2. Sécurité S3 : Block Public Access, Versioning & Chiffrement KMS |
| 5 | h2 | — | 3. Système de Fichiers Partagé Amazon EFS (Elastic File System) |
| 6 | h2 | — | 4. Bases Relationnelles Amazon RDS & Amazon Aurora |
| 7 | h2 | — | 5. Bases NoSQL Managées : Amazon DynamoDB & Capacité RCU/WCU |
| 8 | h2 | — | 6. Études de cas & applications pratiques |
| 9 | h2 | — | 7. QCM — niveau examen |
| 10 | h2 | — | 8. Erreurs classiques — récapitulatif |
| 11 | h2 | — | 9. Méthodologie de résolution |
| 12 | h2 | — | 10. Révision active |
| 13 | h2 | — | 11. Test de maîtrise |
| 14 | .lab | code lab | 3 bloc(s) |
| 15 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Stockage & Données — Amazon S3, EFS, RDS & NoSQL DynamoDB
  - **H2** — 1. Amazon S3 : Stockage Objet & Classes de Stockage
      - **H4** — Concepts Fondamentaux d'Amazon S3
      - **H4** — La Hiérarchie des Classes de Stockage
  - **H2** — 2. Sécurité S3 : Block Public Access, Versioning & Chiffrement KMS
      - **H4** — S3 Block Public Access
      - **H4** — Versioning & MFA Delete
      - **H4** — Chiffrement au Repos (SSE)
  - **H2** — 3. Système de Fichiers Partagé Amazon EFS (Elastic File System)
  - **H2** — 4. Bases Relationnelles Amazon RDS & Amazon Aurora
      - **H4** — Déploiement Multi-AZ (Haute Disponibilité)
      - **H4** — Read Replicas (Montée en Charge Lecture)
  - **H2** — 5. Bases NoSQL Managées : Amazon DynamoDB & Capacité RCU/WCU
      - **H4** — Structure de Données & Clés
      - **H4** — Dimensionnement RCU & WCU
  - **H2** — 6. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur de Coûts & Cycle de Vie Amazon S3 (Standard vs Glacier)
    - **H3** — Exercice 2 — Validateur de Nom de Bucket S3 & Détecteur de Risques Publics
    - **H3** — Exercice 3 — Calculateur de Capacité Provisionnée Amazon DynamoDB (RCU & WCU)
  - **H2** — 7. QCM — niveau examen
  - **H2** — 8. Erreurs classiques — récapitulatif
  - **H2** — 9. Méthodologie de résolution
  - **H2** — 10. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 11. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-cloud-awsnav` | Portail → `/`<br>Services Cloud AWS B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Services Cloud AWS B3 | `../index.html` | `b3-cloud-aws/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-cloud-aws/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-cloud-aws/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-cloud-aws/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-cloud-aws/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-cloud-aws/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-cloud-aws/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-cloud-aws/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-cloud-aws/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-cloud-aws/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-cloud-aws/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-cloud-aws/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-cloud-aws/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-cloud-aws/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-cloud-aws/chapitres/formules.html` | interne |
| Module 6 — Serverless, Observabilité, Supervision & Automatisation (Lambda, CloudWatch, SQS, SNS) | `chapitre6.html` | `b3-cloud-aws/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 99.9% |  | — | `opt` | — | actif | — |
| 99.99% |  | — | `opt` | — | actif | — |
| 99.999999999% (11 neuf) |  | — | `opt` | — | actif | data-correct=1 |
| 100% sans exception |  | — | `opt` | — | actif | — |
| S3 Standard |  | — | `opt` | — | actif | — |
| S3 Standard-IA |  | — | `opt` | — | actif | — |
| S3 Glacier Flexible Retrieval |  | — | `opt` | — | actif | — |
| S3 Glacier Deep Archive |  | — | `opt` | — | actif | data-correct=1 |
| Amazon EBS gp3 |  | — | `opt` | — | actif | — |
| Amazon EFS (Elastic File System) |  | — | `opt` | — | actif | data-correct=1 |
| Instance Store local |  | — | `opt` | — | actif | — |
| Amazon S3 Glacier |  | — | `opt` | — | actif | — |
| Doubler la vitesse d'exécution des requêtes de lecture |  | — | `opt` | — | actif | — |
| Assurer la haute disponibilité et la reprise automatique après sinistre via une réplique s |  | — | `opt` | — | actif | data-correct=1 |
| Fournir un accès gratuit pour les développeurs |  | — | `opt` | — | actif | — |
| Compresser les tables volumineuses |  | — | `opt` | — | actif | — |
| 25 RCU |  | — | `opt` | — | actif | — |
| 50 RCU |  | — | `opt` | — | actif | — |
| 100 RCU |  | — | `opt` | — | actif | data-correct=1 |
| 200 RCU |  | — | `opt` | — | actif | — |
| AWS Shield |  | — | `opt` | — | actif | — |
| S3 Block Public Access |  | — | `opt` | — | actif | data-correct=1 |
| Amazon Inspector |  | — | `opt` | — | actif | — |
| AWS WAF |  | — | `opt` | — | actif | — |
| Aurora stocke les données sur des disques magnétiques lents |  | — | `opt` | — | actif | — |
| Aurora réplique automatiquement 6 copies des données sur 3 Availability Zones et offre jus |  | — | `opt` | — | actif | data-correct=1 |
| Aurora ne supporte pas le langage SQL |  | — | `opt` | — | actif | — |
| Aurora n'est disponible que dans une seule région |  | — | `opt` | — | actif | — |
| S3 Transfer Acceleration |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `aws3-c5-e1` | analyse | 300 | active | `S3_COST SIZE_GIB=1000 CLASS=STANDARD RETRIEVE_GIB=500` | Exercice 1 — Calculateur de Coûts & Cycle de Vie Amazon S3 (Standard vs Glacier) |
| `aws3-c5-e2` | analyse | 300 | active | `S3_AUDIT BUCKET=mon-bucket-prod-2026 BPA=true,true,true,true` | Exercice 2 — Validateur de Nom de Bucket S3 & Détecteur de Risques Publics |
| `aws3-c5-e3` | analyse | 300 | active | `DYNAMO_CAP SIZE_KB=3.5 READS_SEC=100 WRITES_SEC=50 READ_MODE=EVENTUAL WRITE_MODE=STANDARD` | Exercice 3 — Calculateur de Capacité Provisionnée Amazon DynamoDB (RCU & WCU) |

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
- Blocs `pre` : 3 · elements `code` : 39
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3579 mots · 517 noeuds HTML

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
