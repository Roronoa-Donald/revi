# Chapitre 3 — Technologies de Virtualisation, Hyperviseurs & Dimensionnement

> Fiche extraite du fichier `b3-cloud-computing/chapitres/chapitre3.html` (502 lignes, 36.2 Ko, sha256 `e4d25f5af36c`).
> Famille : **cours-b3-cloud-computing** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cloud-computing/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Technologies de Virtualisation, Hyperviseurs &amp; Dimensionnement \| Cloud Computing B3 |
| Description meta | Chapitre 3 du cours Cloud Computing B3 : Hyperviseurs Type 1 Bare-Metal vs Type 2 Hosted, virtualisation matérielle HVM vs paravirtualisation, ratios de sur-allocation (vCPU/RAM), dimensionnement d’instances face aux charges crêtes. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Technologies de Virtualisation, Hyperviseurs & Dimensionnement |
| 3 | h2 | — | 1. Taxonomie des Hyperviseurs : Type 1 Bare-Metal vs Type 2 Hosted |
| 4 | h2 | — | 2. Modes d’Émulation : HVM, Paravirtualisation (PV) et Conteneurs |
| 5 | h2 | — | 3. Consolidation, Sur-Allocation (Overcommitment) & Dimensionnement |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Technologies de Virtualisation, Hyperviseurs & Dimensionnement
  - **H2** — 1. Taxonomie des Hyperviseurs : Type 1 Bare-Metal vs Type 2 Hosted
      - **H4** — Hyperviseur de Type 1 (Bare-Metal / Natif)
      - **H4** — Hyperviseur de Type 2 (Hosted / Hébergé)
  - **H2** — 2. Modes d’Émulation : HVM, Paravirtualisation (PV) et Conteneurs
  - **H2** — 3. Consolidation, Sur-Allocation (Overcommitment) & Dimensionnement
      - **H4** — Sur-Allocation CPU (vCPU to pCPU Ratio)
      - **H4** — Sur-Allocation Mémoire (RAM Overcommitment)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Classificateur d’hyperviseurs (Bare-Metal vs Hosted, HVM vs PV)
    - **H3** — Exercice 2 — Calculateur de consolidation et sur-allocation (Overcommitment)
    - **H3** — Exercice 3 — Dimensionnement illustratif : moyenne et pointe
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
| nav | `b3-cloud-computingnav` | Portail → `/`<br>Cloud Computing B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Cloud Computing B3 | `../index.html` | `b3-cloud-computing/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-cloud-computing/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-cloud-computing/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-cloud-computing/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-cloud-computing/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-cloud-computing/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-cloud-computing/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-cloud-computing/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-cloud-computing/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-cloud-computing/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-cloud-computing/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-cloud-computing/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-cloud-computing/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-cloud-computing/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-cloud-computing/chapitres/formules.html` | interne |
| Chapitre 4 — Green IT, Efficacité Énergétique & Métriques Environnementales | `chapitre4.html` | `b3-cloud-computing/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Hyperviseur de Type 2 (Hosted) |  | — | `opt` | — | actif | — |
| Hyperviseur de Type 1 (Bare-Metal) |  | — | `opt` | — | actif | data-correct=1 |
| Moteur de conteneurs Docker |  | — | `opt` | — | actif | — |
| Émulateur d’architecture QEMU en mode utilisateur |  | — | `opt` | — | actif | — |
| L’hyper-threading uniquement |  | — | `opt` | — | actif | — |
| Les extensions Intel VT-x et AMD-V |  | — | `opt` | — | actif | data-correct=1 |
| Le bus PCI Express 5.0 |  | — | `opt` | — | actif | — |
| Le protocole d’adressage IPv6 |  | — | `opt` | — | actif | — |
| 1.50:1 |  | — | `opt` | — | actif | — |
| 3.00:1 |  | — | `opt` | — | actif | data-correct=1 |
| 0.33:1 |  | — | `opt` | — | actif | — |
| 4.00:1 |  | — | `opt` | — | actif | — |
| Le Swapping disque brut |  | — | `opt` | — | actif | — |
| Le Memory Ballooning |  | — | `opt` | — | actif | data-correct=1 |
| L’Overclocking dynamique |  | — | `opt` | — | actif | — |
| La pagination synchrone |  | — | `opt` | — | actif | — |
| CPU Utilization |  | — | `opt` | — | actif | — |
| CPU Ready Time (%RDY) |  | — | `opt` | — | actif | data-correct=1 |
| Memory Footprint |  | — | `opt` | — | actif | — |
| Disk IOPS |  | — | `opt` | — | actif | — |
| 2 instances |  | — | `opt` | — | actif | — |
| 5 instances |  | — | `opt` | — | actif | — |
| 8 instances |  | — | `opt` | — | actif | data-correct=1 |
| 15 instances |  | — | `opt` | — | actif | — |
| Le problème du « Silent Partner » |  | — | `opt` | — | actif | — |
| Le phénomène du « Noisy Neighbor » (voisin bruyant) |  | — | `opt` | — | actif | data-correct=1 |
| L’attaque par rejeu temporel |  | — | `opt` | — | actif | — |
| La rupture de quorum |  | — | `opt` | — | actif | — |
| Le conteneur possède son propre hyperviseur Type 1 dédié |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `cc3-c3-e1` | analyse | 300 | active | `HYPERVISEUR nom=kvm_prod COUCHE=BARE_METAL ACCEL=OUI OVERHEAD=1.8 HYPERVISEUR nom=virtualbox_dev COUCHE=HOSTED ACCEL=OUI OVERHEAD=9.2 HYPERVISEUR nom=xen_legacy COUCHE=BARE_METAL ACCEL=NON OVERHEAD=4.5` | Exercice 1 — Classificateur d’hyperviseurs (Bare-Metal vs Hosted, HVM vs PV) |
| `cc3-c3-e2` | analyse | 300 | active | `HOTE pcpu=16 ram_gb=64 max_vcpu_ratio=3.00 max_ram_ratio=1.20 VM id=web1 vcpu=8 ram_gb=16 VM id=web2 vcpu=8 ram_gb=16 VM id=app1 vcpu=16 ram_gb=32` | Exercice 2 — Calculateur de consolidation et sur-allocation (Overcommitment) |
| `cc3-c3-e3` | analyse | 300 | active | `CHARGE tps_moy=500 tps_pic=600 duree_ms=200 pic_concurrent=160 cpu_ms=4 ram_mb=64 iops_tx=3 SPEC_NOEUD cpu_max_ms=4000 ram_max_gb=16 base_mb=1024 iops_max=3000 cible_pct=80` | Exercice 3 — Dimensionnement illustratif : moyenne et pointe |

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
- Blocs `pre` : 3 · elements `code` : 32
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3074 mots · 433 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 66. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 18 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 6 |
| `box__title` | 6 |
| `card` | 4 |
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
