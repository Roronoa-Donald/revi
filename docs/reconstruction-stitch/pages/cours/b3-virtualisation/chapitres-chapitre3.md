# Chapitre 3 — Stockage Virtuel Datastores, VMFS-6 & Architectures Hyperconvergées vSAN

> Fiche extraite du fichier `b3-virtualisation/chapitres/chapitre3.html` (540 lignes, 40.6 Ko, sha256 `5a13b3bfe8e6`).
> Famille : **cours-b3-virtualisation** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-virtualisation/chapitres/chapitre3.html` |
| Titre du document | Module 3 — Stockage Virtuel Datastores, VMFS-6 & Architectures Hyperconvergées vSAN \| Virtualisation Avancée B3 |
| Description meta | Module 3 du cours Virtualisation Avancée B3 : Protocoles de stockage de Datacenter (iSCSI, Fibre Channel, NFS v4.1), système de fichiers clustered VMFS-6 et primitives VAAI (ATS, UNMAP), architectures hyperconvergées VMware vSAN (Disk Groups, cache NVMe), politiques SPBM (FTT, RAID-1, RAID-5/6, Slack Space 20%) et multipathing NMP. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Stockage Virtuel Datastores, VMFS-6 & Architectures Hyperconvergées vSAN |
| 3 | h2 | — | 1. Protocoles de Stockage Datacenter : SAN Bloc (FC, iSCSI) vs NAS Fichier (NFS) |
| 4 | h2 | — | 2. Système de Fichiers Clustered VMFS-6 & Primitives d'Accélération VAAI |
| 5 | h2 | — | 3. Multipathing NMP & Politiques de Sélection de Chemin (PSP) |
| 6 | h2 | — | 4. Architectures Hyperconvergées vSAN & Politiques SPBM (FTT, RAID-1, RAID-5/6) |
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

- **H1** — Chapitre 3 — Stockage Virtuel Datastores, VMFS-6 & Architectures Hyperconvergées vSAN
  - **H2** — 1. Protocoles de Stockage Datacenter : SAN Bloc (FC, iSCSI) vs NAS Fichier (NFS)
      - **H4** — Stockage Bloc : SAN Fibre Channel & iSCSI
      - **H4** — Stockage Fichier : NAS NFS (v3 & v4.1)
  - **H2** — 2. Système de Fichiers Clustered VMFS-6 & Primitives d'Accélération VAAI
      - **H4** — Mécanismes Clés de VMFS-6
      - **H4** — Primitives Matérielles VAAI (vStorage APIs for Array Integration)
  - **H2** — 3. Multipathing NMP & Politiques de Sélection de Chemin (PSP)
  - **H2** — 4. Architectures Hyperconvergées vSAN & Politiques SPBM (FTT, RAID-1, RAID-5/6)
      - **H4** — Structure des Disk Groups vSAN
      - **H4** — Politiques SPBM & Slack Space
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Dimensionneur de Datastores VMFS & Provisionnement de Disques (Thin vs Thick)
    - **H3** — Exercice 2 — Calculateur de Capacité Utile vSAN & Politiques SPBM (FTT / RAID-1 / RAID-5)
    - **H3** — Exercice 3 — Moteur d'Arbitrage Multipathing MPIO (Round Robin & Fixed)
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
| Module 4 — Réseau Virtuel, Commutation Standard & Distribuée (vSwitch & VDS) | `chapitre4.html` | `b3-virtualisation/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Fibre Channel (FC). |  | — | `opt` | — | actif | data-correct=1 |
| NFS v3 sur réseau Ethernet partagé. |  | — | `opt` | — | actif | — |
| iSCSI logiciel avec adresses IP publiques. |  | — | `opt` | — | actif | — |
| SMB 3.0 sur port 445. |  | — | `opt` | — | actif | — |
| ATS (Atomic Test and Set). |  | — | `opt` | — | actif | data-correct=1 |
| XCOPY (Extended Copy). |  | — | `opt` | — | actif | — |
| UNMAP (Block Space Reclamation). |  | — | `opt` | — | actif | — |
| Write Same (Zeroing Offload). |  | — | `opt` | — | actif | — |
| Pour réduire le nombre de paquets par seconde, diminuant la charge CPU et augmentant le dé |  | — | `opt` | — | actif | data-correct=1 |
| Pour crypter automatiquement les échanges de trames avec l'algorithme AES-256. |  | — | `opt` | — | actif | — |
| Pour empêcher les attaques par déni de service SYN flood sur le port 3260. |  | — | `opt` | — | actif | — |
| Pour permettre le routage des paquets sur Internet sans passerelle par défaut. |  | — | `opt` | — | actif | — |
| 4 hôtes minimum. |  | — | `opt` | — | actif | data-correct=1 |
| 2 hôtes avec un disque témoin externe. |  | — | `opt` | — | actif | — |
| 3 hôtes physiques. |  | — | `opt` | — | actif | — |
| 6 hôtes minimum. |  | — | `opt` | — | actif | — |
| 2.00x (soit 20 To bruts consommés). |  | — | `opt` | — | actif | data-correct=1 |
| 1.33x (soit 13.3 To bruts consommés). |  | — | `opt` | — | actif | — |
| 1.00x (aucun surcoût d'espace). |  | — | `opt` | — | actif | — |
| 3.00x (soit 30 To bruts consommés). |  | — | `opt` | — | actif | — |
| Pour permettre la reconstruction automatique des données en cas de défaillance d'un hôte o |  | — | `opt` | — | actif | data-correct=1 |
| Pour héberger les fichiers ISO d'installation des systèmes d'exploitation invités. |  | — | `opt` | — | actif | — |
| Pour stocker les logs d'audit de vCenter Server en cas de perte de connectivité. |  | — | `opt` | — | actif | — |
| Pour allouer la mémoire swap de l'hyperviseur sur les disques mécaniques. |  | — | `opt` | — | actif | — |
| Round Robin (VMW_PSP_RR). |  | — | `opt` | — | actif | data-correct=1 |
| Fixed (VMW_PSP_FIXED). |  | — | `opt` | — | actif | — |
| Most Recently Used (VMW_PSP_MRU). |  | — | `opt` | — | actif | — |
| Single Path Direct. |  | — | `opt` | — | actif | — |
| À absorber 100% du tampon d'écriture (Write Buffer) avant déchargement sur les disques de |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vrt3-c3-e1` | analyse | 300 | active | `DATASTORE=ds-san-01 DS_SIZE_GB=1000 DISKS=vm1:200:THICK_EAGER,vm2:300:THIN:30,vm3:400:THIN:20 DATASTORE=ds-nfs-02 DS_SIZE_GB=500 DISKS=vm4:400:THICK_LAZY,vm5:200:THIN:50` | Exercice 1 — Dimensionneur de Datastores VMFS & Provisionnement de Disques (Thin vs Thick) |
| `vrt3-c3-e2` | analyse | 300 | active | `HOSTS=4 RAW_CAPACITY_TB=50.0 POLICY=FTT=1_RAID5 VM_DATA_TB=15.0 HOSTS=3 RAW_CAPACITY_TB=60.0 POLICY=FTT=1_RAID1 VM_DATA_TB=20.0 HOSTS=3 RAW_CAPACITY_TB=40.0 POLICY=FTT=1_RAID5 VM_DATA_TB=10.0` | Exercice 2 — Calculateur de Capacité Utile vSAN & Politiques SPBM (FTT / RAID-1 / RAID-5) |
| `vrt3-c3-e3` | analyse | 300 | active | `POLICY=RR PATHS=vmhba1:C0:T0:L0,vmhba2:C0:T0:L0 THRESHOLD=1000 IO=1000 IO=1000 IO=500` | Exercice 3 — Moteur d'Arbitrage Multipathing MPIO (Round Robin & Fixed) |

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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 3 · elements `code` : 51
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-vm`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3612 mots · 545 noeuds HTML

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
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 6 |
| `box__title` | 6 |
| `card` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
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
