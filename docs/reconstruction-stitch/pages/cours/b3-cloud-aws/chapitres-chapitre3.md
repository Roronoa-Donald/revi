# Chapitre 3 — Calcul & Conteneurs — EC2, EBS, ELB, Auto Scaling & Fargate

> Fiche extraite du fichier `b3-cloud-aws/chapitres/chapitre3.html` (563 lignes, 39.2 Ko, sha256 `eb008faf1a3d`).
> Famille : **cours-b3-cloud-aws** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cloud-aws/chapitres/chapitre3.html` |
| Titre du document | Module 3 — Calcul & Conteneurs — EC2, EBS, ELB, Auto Scaling & Fargate \| Services Cloud AWS B3 |
| Description meta | Module 3 du cours Services Cloud AWS B3 : Instances EC2, familles de calcul, modèles d'achat (Spot/Reserved), stockage EBS, Elastic Load Balancing, Auto Scaling et Fargate. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Calcul & Conteneurs — EC2, EBS, ELB, Auto Scaling & Fargate |
| 3 | h2 | — | 1. Amazon EC2 : Familles de Calcul & Modèles d'Achat |
| 4 | h2 | — | 2. Stockage Bloc Amazon EBS (Elastic Block Store) & Snapshots |
| 5 | h2 | — | 3. Elastic Load Balancing (ELB) : ALB, NLB & Health Checks |
| 6 | h2 | — | 4. Auto Scaling Groups (ASG) & Équilibre Multi-AZ |
| 7 | h2 | — | 5. Conteneurs Managés : Amazon ECS, EKS & AWS Fargate |
| 8 | h2 | — | 6. Études de cas & applications pratiques |
| 9 | h2 | — | 7. QCM — niveau examen |
| 10 | h2 | — | 8. Erreurs classiques — récapitulatif |
| 11 | h2 | — | 9. Méthodologie de résolution |
| 12 | h2 | — | 10. Révision active |
| 13 | h2 | — | 11. Test de maîtrise |
| 14 | .lab | code lab | 3 bloc(s) |
| 15 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Calcul & Conteneurs — EC2, EBS, ELB, Auto Scaling & Fargate
  - **H2** — 1. Amazon EC2 : Familles de Calcul & Modèles d'Achat
      - **H4** — Les Familles d'Instances EC2
      - **H4** — Les 4 Modèles d'Achat d'Instances
  - **H2** — 2. Stockage Bloc Amazon EBS (Elastic Block Store) & Snapshots
      - **H4** — Types de Volumes SSD & Métriques Clés
      - **H4** — Snapshots Incrémentaux & Chiffrement KMS
  - **H2** — 3. Elastic Load Balancing (ELB) : ALB, NLB & Health Checks
      - **H4** — Application Load Balancer (ALB)
      - **H4** — Network Load Balancer (NLB)
      - **H4** — Target Groups & Health Checks
  - **H2** — 4. Auto Scaling Groups (ASG) & Équilibre Multi-AZ
      - **H4** — Paramètres de Capacité & Launch Templates
      - **H4** — Politiques d'Échelle & Répartition Multi-AZ
  - **H2** — 5. Conteneurs Managés : Amazon ECS, EKS & AWS Fargate
      - **H4** — Amazon ECS
      - **H4** — Amazon EKS
      - **H4** — AWS Fargate (Serverless)
  - **H2** — 6. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Optimiseur de Coûts & Stratégie d'Achat EC2 (On-Demand, Reserved, Spot)
    - **H3** — Exercice 2 — Dimensionneur de Volumes de Stockage EBS (gp3 vs io2 Block Express)
    - **H3** — Exercice 3 — Simulateur d'Auto Scaling Group & Répartition Équilibrée Multi-AZ
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
| Module 4 — Réseau Avancé — Amazon VPC, Sous-réseaux, Routage & Pare-feux (SG / NACL) | `chapitre4.html` | `b3-cloud-aws/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Instances Réservées (Reserved Instances) |  | — | `opt` | — | actif | — |
| Savings Plans |  | — | `opt` | — | actif | — |
| Instances Spot |  | — | `opt` | — | actif | data-correct=1 |
| Hôtes Dédiés (Dedicated Hosts) |  | — | `opt` | — | actif | — |
| Les volumes gp3 ne peuvent pas être chiffrés |  | — | `opt` | — | actif | — |
| Les volumes gp3 permettent d'augmenter les IOPS et le débit MB/s indépendamment de la tail |  | — | `opt` | — | actif | data-correct=1 |
| Les volumes gp3 sont accessibles simultanément par 100 instances |  | — | `opt` | — | actif | — |
| Les volumes gp3 sont stockés sur bande magnétique |  | — | `opt` | — | actif | — |
| Couche 2 (Liaison de données) |  | — | `opt` | — | actif | — |
| Couche 3 (Réseau) |  | — | `opt` | — | actif | — |
| Couche 4 (Transport) |  | — | `opt` | — | actif | — |
| Couche 7 (Application) |  | — | `opt` | — | actif | data-correct=1 |
| Il lance toutes les instances dans la première zone alphabétique |  | — | `opt` | — | actif | — |
| Il lance l'instance dans l'Availability Zone qui compte actuellement le moins d'instances |  | — | `opt` | — | actif | data-correct=1 |
| Il supprime aléatoirement une instance dans une autre zone |  | — | `opt` | — | actif | — |
| Il attend que toutes les zones soient pleines |  | — | `opt` | — | actif | — |
| Amazon EC2 Dedicated Hosts |  | — | `opt` | — | actif | — |
| AWS Fargate |  | — | `opt` | — | actif | data-correct=1 |
| Amazon EBS multi-attach |  | — | `opt` | — | actif | — |
| AWS Storage Gateway |  | — | `opt` | — | actif | — |
| 1 000 IOPS et 50 MB/s |  | — | `opt` | — | actif | — |
| 3 000 IOPS et 125 MB/s |  | — | `opt` | — | actif | data-correct=1 |
| 10 000 IOPS et 500 MB/s |  | — | `opt` | — | actif | — |
| 50 000 IOPS et 1 000 MB/s |  | — | `opt` | — | actif | — |
| L'ASG ignore l'échec |  | — | `opt` | — | actif | — |
| L'ASG termine automatiquement l'instance défaillante et lance une nouvelle instance saine |  | — | `opt` | — | actif | data-correct=1 |
| L'ASG arrête toutes les autres instances de la région |  | — | `opt` | — | actif | — |
| L'ASG passe en mode dégradé manuel |  | — | `opt` | — | actif | — |
| Car chaque snapshot copie l'intégralité du disque à chaque fois |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `aws3-c3-e1` | analyse | 300 | active | `EC2_COST BASELINE=4 SPIKE=6 HOURS=720 RATE=0.10 SPOT_DISC=70 RES_DISC=40` | Exercice 1 — Optimiseur de Coûts & Stratégie d'Achat EC2 (On-Demand, Reserved, Spot) |
| `aws3-c3-e2` | analyse | 300 | active | `EBS_CHECK TYPE=gp3 SIZE_GIB=100 IOPS=3000 MBPS=125` | Exercice 2 — Dimensionneur de Volumes de Stockage EBS (gp3 vs io2 Block Express) |
| `aws3-c3-e3` | analyse | 300 | active | `ASG_DISTRIB ZONES=eu-west-3a:1,eu-west-3b:1,eu-west-3c:1 TARGET=6 MIN=2 MAX=10` | Exercice 3 — Simulateur d'Auto Scaling Group & Répartition Équilibrée Multi-AZ |

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
- Blocs `pre` : 3 · elements `code` : 14
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3569 mots · 496 noeuds HTML

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
| `card` | 12 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 6 |
| `box__title` | 6 |
| `grid` | 5 |
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
