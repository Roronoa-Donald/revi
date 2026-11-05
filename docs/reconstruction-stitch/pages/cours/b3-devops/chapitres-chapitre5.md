# Chapitre 5 — Métriques DORA, Fiabilité Opérationnelle & Gestion des Incidents

> Fiche extraite du fichier `b3-devops/chapitres/chapitre5.html` (530 lignes, 37.7 Ko, sha256 `5b6c4028a000`).
> Famille : **cours-b3-devops** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-devops/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Métriques DORA, Fiabilité Opérationnelle &amp; Gestion des Incidents \| DevOps B3 |
| Description meta | Chapitre 5 du cours DevOps B3 : Les cinq métriques DORA actuelles, analyse MTBF/MTTF/MTTR, rayon d’impact et post-mortem sans blâme. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Métriques DORA, Fiabilité Opérationnelle & Gestion des Incidents |
| 3 | h2 | — | 1. Le Programme DORA & La Démonstration Scientifique d’Accelerate |
| 4 | h2 | — | 2. Les cinq métriques de performance DORA |
| 5 | h2 | — | 3. Modélisation Mathématique de la Fiabilité : MTBF, MTTF & MTTR |
| 6 | h2 | — | 4. Rayon d’Impact (Blast Radius) & Post-Mortem Sans Blâme |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Métriques DORA, Fiabilité Opérationnelle & Gestion des Incidents
  - **H2** — 1. Le Programme DORA & La Démonstration Scientifique d’Accelerate
  - **H2** — 2. Les cinq métriques de performance DORA
  - **H2** — 3. Modélisation Mathématique de la Fiabilité : MTBF, MTTF & MTTR
      - **H4** — MTTF (Mean Time To Failure)
      - **H4** — MTTR (Mean Time To Repair)
      - **H4** — MTBF (Mean Time Between Failures)
      - **H4** — Calcul de la Disponibilité Opérationnelle ($A$)
  - **H2** — 4. Rayon d’Impact (Blast Radius) & Post-Mortem Sans Blâme
      - **H4** — Le Post-Mortem Sans Blâme (Blameless Post-Mortem)
      - **H4** — Ce qu’un Post-Mortem N’EST PAS
      - **H4** — Ce qu’un Post-Mortem DOIT PRODUIRE
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Classificateur de paradigmes d’Infrastructure as Code (Déclaratif vs Impératif)
    - **H3** — Exercice 2 — Détecteur de dérive d’infrastructure Terraform (Drift Detection)
    - **H3** — Exercice 3 — Planificateur d’exécution Terraform et graphe de dépendances (DAG)
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
| Chapitre 6 — SRE (Site Reliability Engineering), SLI/SLO, Error Budgets & Observabilité | `chapitre6.html` | `b3-devops/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Pour éviter les pannes, il est scientifiquement prouvé qu’il faut réduire les déploiements |  | — | `opt` | — | actif | — |
| Rapidité de livraison et stabilité peuvent coexister, sans garantie automatique pour chaqu |  | — | `opt` | — | actif | data-correct=1 |
| L’automatisation des tests augmente les coûts de développement sans aucun gain mesurable |  | — | `opt` | — | actif | — |
| Le langage de programmation est le seul facteur expliquant la réussite d’un projet |  | — | `opt` | — | actif | — |
| Nombre de lignes de code, Nombre de bugs, Heures supplémentaires, Coût des serveurs |  | — | `opt` | — | actif | — |
| Deployment Frequency, Change Lead Time, Failed Deployment Recovery Time, Change Fail Rate |  | — | `opt` | — | actif | data-correct=1 |
| Vitesse CPU, Bande passante réseau, Taux de mémoire vive, Taille du disque dur |  | — | `opt` | — | actif | — |
| Nombre de réunions, Points de vélocité Scrum, Nombre de commits, Salaire moyen |  | — | `opt` | — | actif | — |
| 20% |  | — | `opt` | — | actif | — |
| 10% |  | — | `opt` | — | actif | — |
| 5% |  | — | `opt` | — | actif | data-correct=1 |
| 2% |  | — | `opt` | — | actif | — |
| MTBF = MTTF - MTTR |  | — | `opt` | — | actif | — |
| MTBF = MTTF + MTTR |  | — | `opt` | — | actif | data-correct=1 |
| MTBF = MTTF * MTTR |  | — | `opt` | — | actif | — |
| MTBF = MTTR / MTTF |  | — | `opt` | — | actif | — |
| 90% |  | — | `opt` | — | actif | — |
| 95% |  | — | `opt` | — | actif | — |
| 99% |  | — | `opt` | — | actif | data-correct=1 |
| 99.9% |  | — | `opt` | — | actif | — |
| La distance physique en mètres entre les serveurs dans la salle informatique |  | — | `opt` | — | actif | — |
| L’étendue maximale des dommages et des services affectés par la panne d’un composant donné |  | — | `opt` | — | actif | data-correct=1 |
| La vitesse de propagation des ondes radio du Wi-Fi |  | — | `opt` | — | actif | — |
| La consommation électrique lors d’un pic de calcul |  | — | `opt` | — | actif | — |
| Cacher la panne à la direction générale |  | — | `opt` | — | actif | — |
| Considérer que les ingénieurs agissent de bonne foi et auditer les défaillances systémique |  | — | `opt` | — | actif | data-correct=1 |
| Payer une prime financière à la personne qui a provoqué la panne |  | — | `opt` | — | actif | — |
| Remplacer systématiquement tous les membres de l’équipe de développement |  | — | `opt` | — | actif | — |
| Car réparer un incident est toujours gratuit |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `do3-c5-e1` | analyse | 300 | active | `OUTIL nom=terraform PARADIGME=DECLARATIF GESTION_ETAT=OUI IDEMPOTENT=OUI OUTIL nom=ansible PARADIGME=DECLARATIF GESTION_ETAT=NON IDEMPOTENT=OUI OUTIL nom=bash_script PARADIGME=IMPERATIF GESTION_ETAT=NON IDEMPOTENT=NON` | Exercice 1 — Classificateur de paradigmes d’Infrastructure as Code (Déclaratif vs Impératif) |
| `do3-c5-e2` | analyse | 300 | active | `RESOURCE id=vm_instance code_val=t3.medium state_val=t3.medium real_val=t3.medium RESOURCE id=db_cluster code_val=db.r5.xlarge state_val=db.r5.large real_val=db.r5.large RESOURCE id=security_group code_val=port_443 state_val=port_443 real_val=port_22_ouvert` | Exercice 2 — Détecteur de dérive d’infrastructure Terraform (Drift Detection) |
| `do3-c5-e3` | analyse | 300 | active | `RESOURCE id=vpc depends_on=NONE RESOURCE id=subnet_pub depends_on=vpc RESOURCE id=subnet_priv depends_on=vpc RESOURCE id=vm_web depends_on=subnet_pub RESOURCE id=db_sql depends_on=subnet_priv` | Exercice 3 — Planificateur d’exécution Terraform et graphe de dépendances (DAG) |

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

- Tableaux : 0
- Blocs `pre` : 3 · elements `code` : 32
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-layers`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3162 mots · 458 noeuds HTML

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
| `card` | 5 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |
| `badge` | 3 |
| `lab__body` | 3 |

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
