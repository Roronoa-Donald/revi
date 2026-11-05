# Chapitre 2 — Déploiement vCenter, Cycle de Vie des VM & Gestion des Ressources

> Fiche extraite du fichier `b3-virtualisation/chapitres/chapitre2.html` (539 lignes, 40.1 Ko, sha256 `2148ede78e14`).
> Famille : **cours-b3-virtualisation** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-virtualisation/chapitres/chapitre2.html` |
| Titre du document | Module 2 — Déploiement vCenter, Cycle de Vie des VM & Gestion des Ressources \| Virtualisation Avancée B3 |
| Description meta | Module 2 du cours Virtualisation Avancée B3 : Architecture VMware vCenter Server (VCSA, inventaire, PSC), anatomie complète des fichiers d'une VM (.vmx, .vmdk, .nvram, .vswp), arborescence de disques deltas de snapshots et consolidation, ordonnancement fin par Resource Pools (Shares, Reservations, Limits). Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Déploiement vCenter, Cycle de Vie des VM & Gestion des Ressources |
| 3 | h2 | — | 1. Architecture VMware vCenter Server : Appliance VCSA & Inventaire Datacenter |
| 4 | h2 | — | 2. Anatomie des Fichiers d'une Machine Virtuelle sur le Datastore |
| 5 | h2 | — | 3. Disques Deltas, Snapshots & Alerte de Consolidation Disque |
| 6 | h2 | — | 4. Gestion des Ressources : Resource Pools, Shares, Reservations & Limits |
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

- **H1** — Chapitre 2 — Déploiement vCenter, Cycle de Vie des VM & Gestion des Ressources
  - **H2** — 1. Architecture VMware vCenter Server : Appliance VCSA & Inventaire Datacenter
      - **H4** — Architecture VCSA (vCenter Server Appliance)
      - **H4** — Hiérarchie de l'Inventaire vSphere
  - **H2** — 2. Anatomie des Fichiers d'une Machine Virtuelle sur le Datastore
  - **H2** — 3. Disques Deltas, Snapshots & Alerte de Consolidation Disque
      - **H4** — Mécanisme des Disques Différentiels (Deltas)
      - **H4** — Risques & Nécessité de la Consolidation
  - **H2** — 4. Gestion des Ressources : Resource Pools, Shares, Reservations & Limits
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Parseur de Fichier de Configuration VM .vmx & Validateur d'Options Matérielles
    - **H3** — Exercice 2 — Calculateur d'Espace Disque & Arborescence de Snapshots VM (Delta VMDKs)
    - **H3** — Exercice 3 — Ordonnanceur de Pools de Ressources vCenter (Shares, Reservations, Limits CPU)
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
| Module 3 — Stockage Virtuel Datastores, VMFS-6 & Architectures Hyperconvergées vSAN | `chapitre3.html` | `b3-virtualisation/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| VMware Photon OS (distribution Linux durcie optimisée). |  | — | `opt` | — | actif | data-correct=1 |
| Microsoft Windows Server 2022 Datacenter Edition. |  | — | `opt` | — | actif | — |
| Red Hat Enterprise Linux 9 avec interface graphique GNOME. |  | — | `opt` | — | actif | — |
| FreeBSD 13 avec noyau personnalisé pour vSphere. |  | — | `opt` | — | actif | — |
| Le fichier avec l'extension .vmx. |  | — | `opt` | — | actif | data-correct=1 |
| Le fichier avec l'extension -flat.vmdk. |  | — | `opt` | — | actif | — |
| Le fichier avec l'extension .nvram. |  | — | `opt` | — | actif | — |
| Le fichier avec l'extension .vmsd. |  | — | `opt` | — | actif | — |
| Au moment de la mise sous tension (Power On) de la machine virtuelle. |  | — | `opt` | — | actif | data-correct=1 |
| Dès la création de la VM dans l'assistant de vCenter. |  | — | `opt` | — | actif | — |
| Uniquement lorsque la mémoire physique de l'hôte atteint 100% d'utilisation. |  | — | `opt` | — | actif | — |
| Lors de la création du premier snapshot différentiel. |  | — | `opt` | — | actif | — |
| Il est verrouillé en lecture seule et un nouveau disque différentiel (-delta.vmdk) interce |  | — | `opt` | — | actif | data-correct=1 |
| Il est immédiatement compressé et déplacé dans la corbeille de vCenter. |  | — | `opt` | — | actif | — |
| Il est cloné intégralement vers le second hôte ESXi du cluster. |  | — | `opt` | — | actif | — |
| Il est converti à chaud au format Thick Eager Zeroed. |  | — | `opt` | — | actif | — |
| Uniquement en situation de contention (saturation des ressources physiques de l'hôte). |  | — | `opt` | — | actif | data-correct=1 |
| En permanence, même si le serveur physique n'est utilisé qu'à 10%. |  | — | `opt` | — | actif | — |
| Uniquement lors des sauvegardes nocturnes déclenchées par l'API VADP. |  | — | `opt` | — | actif | — |
| Seulement lorsque la machine virtuelle subit un crash système. |  | — | `opt` | — | actif | — |
| 0 Go (aucun fichier d'échange requis car la mémoire est garantie à 100%). |  | — | `opt` | — | actif | data-correct=1 |
| 32 Go (la taille de la RAM allouée). |  | — | `opt` | — | actif | — |
| 64 Go (le double de la RAM par mesure de sécurité). |  | — | `opt` | — | actif | — |
| 16 Go (la moitié de la RAM allouée). |  | — | `opt` | — | actif | — |
| Les lectures nécessitent de parcourir successivement l'ensemble des fichiers deltas de la |  | — | `opt` | — | actif | data-correct=1 |
| La carte réseau virtuelle passe automatiquement du mode 10G au mode 100M. |  | — | `opt` | — | actif | — |
| Le contrôleur SCSI virtuel bascule en émulation IDE lente. |  | — | `opt` | — | actif | — |
| L'hyperviseur désactive l'Hyper-Threading sur tous les cœurs du socket. |  | — | `opt` | — | actif | — |
| L'allocation est strictement bridée à 4000 MHz, créant un goulot d'étranglement artificiel |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vrt3-c2-e1` | analyse | 300 | active | `displayName = "SRV-PROD-WEB01" guestOS = "rhel9-64" numvcpus = "4" memsize = "8192" firmware = "efi" uefi.secureBoot.enabled = "TRUE" tools.syncTime = "TRUE" ethernet0.virtualDev = "vmxnet3"` | Exercice 1 — Parseur de Fichier de Configuration VM .vmx & Validateur d'Options Matérielles |
| `vrt3-c2-e2` | analyse | 300 | active | `VM=vm-compta BASE_GB=100 DAILY_GB=2.0 SNAPS=2,5 VM=vm-dev BASE_GB=50 DAILY_GB=5.0 SNAPS=3,8,12,20 VM=vm-backup BASE_GB=200 DAILY_GB=1.0 SNAPS=NONE` | Exercice 2 — Calculateur d'Espace Disque & Arborescence de Snapshots VM (Delta VMDKs) |
| `vrt3-c2-e3` | analyse | 300 | active | `CLUSTER_CAPACITY_MHZ=20000 POOL=Production RESERVED_MHZ=8000 LIMIT_MHZ=-1 SHARES=HIGH POOL=Test-Dev RESERVED_MHZ=2000 LIMIT_MHZ=6000 SHARES=NORMAL POOL=Staging RESERVED_MHZ=2000 LIMIT_MHZ=-1 SHARES=LOW` | Exercice 3 — Ordonnanceur de Pools de Ressources vCenter (Shares, Reservations, Limits CPU) |

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
- Blocs `pre` : 4 · elements `code` : 70
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-vm`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3514 mots · 562 noeuds HTML

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
