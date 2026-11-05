# Chapitre 1 — Architectures d'Hyperviseurs Avancées & Dimensionnement Serveurs

> Fiche extraite du fichier `b3-virtualisation/chapitres/chapitre1.html` (551 lignes, 43.2 Ko, sha256 `0d8e3aea72e8`).
> Famille : **cours-b3-virtualisation** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-virtualisation/chapitres/chapitre1.html` |
| Titre du document | Module 1 — Architectures d'Hyperviseurs Avancées & Dimensionnement Serveurs \| Virtualisation Avancée B3 |
| Description meta | Module 1 du cours Virtualisation Avancée B3 : Hyperviseurs Type-1 bare-metal (ESXi VMkernel, Xen Dom0/DomU, KVM), virtualisation assistée par le matériel (Intel VT-x/EPT, AMD-V/RVI), calculs stricts de ratios de surallocation vCPU:pCPU et RAM overcommit, optimisation topologique NUMA/vNUMA et formats de disques VMDK (Thin, Lazy, Eager Zeroed). Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Architectures d'Hyperviseurs Avancées & Dimensionnement Serveurs |
| 3 | h2 | — | 1. Architectures d'Hyperviseurs : Type-1 (Bare-Metal) vs Type-2 & Extensions Processeur |
| 4 | h2 | — | 2. Dimensionnement Serveur : Ratios de Surallocation vCPU:pCPU & RAM Overcommit |
| 5 | h2 | — | 3. Topologies NUMA & vNUMA : Élimination des Latences Inter-Sockets |
| 6 | h2 | — | 4. Formats de Disques Virtuels VMDK : Thin vs Thick Provisioning |
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

- **H1** — Chapitre 1 — Architectures d'Hyperviseurs Avancées & Dimensionnement Serveurs
  - **H2** — 1. Architectures d'Hyperviseurs : Type-1 (Bare-Metal) vs Type-2 & Extensions Processeur
      - **H4** — Hyperviseur Type-1 (Bare-Metal)
      - **H4** — Hyperviseur Type-2 (Hébergé)
  - **H2** — 2. Dimensionnement Serveur : Ratios de Surallocation vCPU:pCPU & RAM Overcommit
      - **H4** — Surallocation Processeur (vCPU:pCPU Ratio)
      - **H4** — Surallocation Mémoire (RAM Overcommit)
  - **H2** — 3. Topologies NUMA & vNUMA : Élimination des Latences Inter-Sockets
  - **H2** — 4. Formats de Disques Virtuels VMDK : Thin vs Thick Provisioning
      - **H4** — Thin Provisioning (Dynamique)
      - **H4** — Thick Lazy Zeroed
      - **H4** — Thick Eager Zeroed
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur de Ratio de Surallocation CPU (vCPU-to-pCPU Overcommitment)
    - **H3** — Exercice 2 — Estimateur de Mémoire Vive & Gestion des Mécanismes de Récupération (Ballooning, TPS, Swap)
    - **H3** — Exercice 3 — Comparateur de Performance I/O & Latence Hyperviseur (Type 1 vs Type 2 vs Conteneur)
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
| nav | `b3-virtualisationnav` | Portail → `/`<br>Virtualisation Avancée B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examen-blanc.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Virtualisation Avancée B3 | `../index.html` | `b3-virtualisation/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-virtualisation/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-virtualisation/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-virtualisation/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-virtualisation/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-virtualisation/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-virtualisation/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-virtualisation/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-virtualisation/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-virtualisation/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-virtualisation/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-virtualisation/atelier.html` | interne |
| Examen | `../chapitres/examen-blanc.html` | `b3-virtualisation/chapitres/examen-blanc.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-virtualisation/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-virtualisation/chapitres/formules.html` | interne |
| Module 2 — Déploiement vCenter, Cycle de Vie des VM & Gestion des Ressources | `chapitre2.html` | `b3-virtualisation/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Il s'exécute directement sur le matériel physique sans OS hôte sous-jacent. |  | — | `opt` | — | actif | data-correct=1 |
| Il nécessite obligatoirement Windows Server pour gérer ses pilotes d'E/S. |  | — | `opt` | — | actif | — |
| Il ne permet de virtualiser que des conteneurs légers de type Docker. |  | — | `opt` | — | actif | — |
| Il utilise exclusivement une émulation logicielle complète de processeur. |  | — | `opt` | — | actif | — |
| À chiffrer les disques durs virtuels à la volée sur le contrôleur SAS. |  | — | `opt` | — | actif | — |
| À assurer la traduction matérielle d'adresses mémoire de l'OS invité vers l'hôte (SLAT). |  | — | `opt` | — | actif | data-correct=1 |
| À émuler une carte graphique 3D dédiée pour chaque machine virtuelle. |  | — | `opt` | — | actif | — |
| À fusionner les cartes réseaux physiques en un agrégat de liens 802.3ad. |  | — | `opt` | — | actif | — |
| 1.25 : 1 |  | — | `opt` | — | actif | — |
| 2.50 : 1 |  | — | `opt` | — | actif | data-correct=1 |
| 0.40 : 1 |  | — | `opt` | — | actif | — |
| 4.00 : 1 |  | — | `opt` | — | actif | — |
| Le temps d'attente CPU Ready Time (%RDY) supérieur à 5%. |  | — | `opt` | — | actif | data-correct=1 |
| Le temps de cache L3 supérieur à 10 microsecondes. |  | — | `opt` | — | actif | — |
| Le taux de trames jumbo frames réseau supérieur à 9000 octets. |  | — | `opt` | — | actif | — |
| Le nombre de paquets ICMP émis par la passerelle de management. |  | — | `opt` | — | actif | — |
| L'hyperviseur plante immédiatement avec un écran violet PSOD. |  | — | `opt` | — | actif | — |
| Les accès mémoire distants traversent le bus inter-socket avec une latence accrue de 30% à |  | — | `opt` | — | actif | data-correct=1 |
| Le disque dur virtuel est automatiquement converti en format Thin. |  | — | `opt` | — | actif | — |
| L'OS invité refuse de démarrer tant que le BIOS n'est pas mis à jour. |  | — | `opt` | — | actif | — |
| Le gonflage du pilote de Ballooning (vmmemctl) dans le système d'exploitation invité. |  | — | `opt` | — | actif | data-correct=1 |
| La suppression automatique des fichiers de snapshots différentiels. |  | — | `opt` | — | actif | — |
| L'arrêt forcé sans préavis des machines virtuelles les moins prioritaires. |  | — | `opt` | — | actif | — |
| La réinitialisation des cartes réseaux virtuelles VMXNET3. |  | — | `opt` | — | actif | — |
| Thin Provisioning dynamique. |  | — | `opt` | — | actif | — |
| Thick Provisioning Lazy Zeroed. |  | — | `opt` | — | actif | — |
| Thick Provisioning Eager Zeroed. |  | — | `opt` | — | actif | data-correct=1 |
| Raw Device Mapping (RDM) en mode virtuel. |  | — | `opt` | — | actif | — |
| L'ordonnanceur du VMkernel doit co-ordonnancer les vCPUs, ce qui augmente le CPU Ready Tim |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vrt3-c1-e1` | analyse | 300 | active | `HOST=esxi-node01 SOCKETS=2 CORES=16 HT=1 VCPUS=64 HOST=esxi-node02 SOCKETS=2 CORES=8 HT=0 VCPUS=72` | Exercice 1 — Calculateur de Ratio de Surallocation CPU (vCPU-to-pCPU Overcommitment) |
| `vrt3-c1-e2` | analyse | 300 | active | `HOST=srv-virt-01 RAM_GB=128 VMS_GB=160 TPS_PCT=10.0 BALLOON_GB=20 HOST=srv-virt-02 RAM_GB=64 VMS_GB=100 TPS_PCT=5.0 BALLOON_GB=15` | Exercice 2 — Estimateur de Mémoire Vive & Gestion des Mécanismes de Récupération (Ballooning, TPS, Swap) |
| `vrt3-c1-e3` | analyse | 300 | active | `WORKLOAD=db-oltp BASE_IOPS=100000 ARCH=TYPE_1 VIRT_IOPS=96000 BASE_LAT_US=200 VIRT_LAT_US=208 WORKLOAD=web-nginx BASE_IOPS=50000 ARCH=CONTAINER VIRT_IOPS=49500 BASE_LAT_US=150 VIRT_LAT_US=153 WORKLOAD=dev-lab BASE_IOPS=80000 ARCH=TYPE_2 VIRT_IOPS=62000 BASE_LAT_US=250 VIRT_LAT_US=350` | Exercice 3 — Comparateur de Performance I/O & Latence Hyperviseur (Type 1 vs Type 2 vs Conteneur) |

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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 4 · elements `code` : 45
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-vm`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3837 mots · 573 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 18 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `card` | 7 |
| `box` | 6 |
| `box__title` | 6 |
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
