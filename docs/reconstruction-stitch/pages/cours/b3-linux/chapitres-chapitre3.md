# Chapitre 3 — Gestion Avancée du Stockage : LVM, RAID Logiciel & Inodes

> Fiche extraite du fichier `b3-linux/chapitres/chapitre3.html` (520 lignes, 36.3 Ko, sha256 `fb136708d4c2`).
> Famille : **cours-b3-linux** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-linux/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Gestion Avancée du Stockage : LVM, RAID Logiciel &amp; Inodes \| Linux Avancé B3 |
| Description meta | Chapitre 3 du cours Linux Avancé B3 : Architecture LVM (Physical Extents, VG, LV, snapshots COW), tolérance aux pannes RAID mdadm (RAID 1, 5, 6), table d’inodes et diagnostic de saturation sous ext4/XFS. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Gestion Avancée du Stockage : LVM, RAID Logiciel & Inodes |
| 3 | h2 | — | 1. Architecture LVM : Des Disques Physiques aux Physical Extents |
| 4 | h2 | — | 2. Snapshots LVM Copy-on-Write (COW) & Sauvegardes à Chaud |
| 5 | h2 | — | 3. RAID Logiciel sous Linux avec mdadm : Niveaux 1, 5, 6 & Résilience |
| 6 | h2 | — | 4. Systèmes de Fichiers : Tables d’Inodes & Diagnostic de Saturation |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Gestion Avancée du Stockage : LVM, RAID Logiciel & Inodes
  - **H2** — 1. Architecture LVM : Des Disques Physiques aux Physical Extents
      - **H4** — Les Trois Piliers de LVM
      - **H4** — La Mécanique des Physical Extents (PE)
  - **H2** — 2. Snapshots LVM Copy-on-Write (COW) & Sauvegardes à Chaud
  - **H2** — 3. RAID Logiciel sous Linux avec mdadm : Niveaux 1, 5, 6 & Résilience
  - **H2** — 4. Systèmes de Fichiers : Tables d’Inodes & Diagnostic de Saturation
      - **H4** — Structure d’un Inode (Index Node)
      - **H4** — Le Piège Classique de la Saturation d’Inodes
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Calculateur d’allocation LVM Physical Extents (PE) et dimensionnement VG
    - **H3** — Exercice 2 — Simulateur d’état et de résilience de grappe RAID mdadm
    - **H3** — Exercice 3 — Analyseur de table d’inodes et détection de saturation de système de fichiers
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
| nav | `b3-linuxnav` | Portail → `/`<br>Linux Avancé B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Linux Avancé B3 | `../index.html` | `b3-linux/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-linux/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-linux/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-linux/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-linux/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-linux/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-linux/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-linux/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-linux/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-linux/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-linux/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-linux/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-linux/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-linux/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-linux/chapitres/formules.html` | interne |
| Chapitre 4 — Isolation & Conteneurisation Noyau : Namespaces & Cgroups v2 | `chapitre4.html` | `b3-linux/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Un câble SATA reliant le disque à la carte mère |  | — | `opt` | — | actif | — |
| Le bloc élémentaire de taille fixe (généralement 4 Mo) qui compose la granularité d’alloca |  | — | `opt` | — | actif | data-correct=1 |
| Une partition de boot réservée à GRUB2 |  | — | `opt` | — | actif | — |
| Un protocole réseau pour monter des disques iSCSI |  | — | `opt` | — | actif | — |
| Il duplique l’intégralité du disque à chaque écriture |  | — | `opt` | — | actif | — |
| Il copie l’ancien bloc intact dans l’espace réservé du snapshot avant d’autoriser l’écritu |  | — | `opt` | — | actif | data-correct=1 |
| Il compresse le disque avec l’algorithme gzip |  | — | `opt` | — | actif | — |
| Il bloque toutes les écritures sur le serveur jusqu’à la fin de la sauvegarde |  | — | `opt` | — | actif | — |
| 1 panne |  | — | `opt` | — | actif | — |
| 2 pannes |  | — | `opt` | — | actif | data-correct=1 |
| 3 pannes |  | — | `opt` | — | actif | — |
| 5 pannes |  | — | `opt` | — | actif | — |
| Dans son inode directement |  | — | `opt` | — | actif | — |
| Dans le bloc de données de son répertoire parent, associé à son numéro d’inode |  | — | `opt` | — | actif | data-correct=1 |
| Dans le secteur d’amorçage MBR |  | — | `opt` | — | actif | — |
| Dans le fichier /etc/fstab |  | — | `opt` | — | actif | — |
| Le processeur est en surchauffe |  | — | `opt` | — | actif | — |
| La table d’inodes du système de fichiers est saturée à 100% (constatable avec df -i) |  | — | `opt` | — | actif | data-correct=1 |
| Le câble réseau est débranché |  | — | `opt` | — | actif | — |
| La mémoire swap est désactivée |  | — | `opt` | — | actif | — |
| xfs_growfs |  | — | `opt` | — | actif | — |
| resize2fs |  | — | `opt` | — | actif | data-correct=1 |
| fdisk -l |  | — | `opt` | — | actif | — |
| mkfs.ext4 |  | — | `opt` | — | actif | — |
| Le système passe en mode lecture seule sans aucune perte |  | — | `opt` | — | actif | — |
| La grappe RAID bascule en échec complet (FAILED) et l’intégralité des données est définiti |  | — | `opt` | — | actif | data-correct=1 |
| Le noyau reconstruit les données à partir de la mémoire vive |  | — | `opt` | — | actif | — |
| Le système de fichiers ignore l’erreur automatiquement |  | — | `opt` | — | actif | — |
| pvcreate |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lx3-c3-e1` | shell | 300 | suspendue | `LVM_REQ vg=vg_data pe_size_mb=4 total_pv_gb=100 lv_target_gb=20` | Exercice 1 — Calculateur d’allocation LVM Physical Extents (PE) et dimensionnement VG |
| `lx3-c3-e2` | shell | 300 | suspendue | `RAID_CONF device=md0 level=RAID5 total=4 active=3 failed=1 spares=1` | Exercice 2 — Simulateur d’état et de résilience de grappe RAID mdadm |
| `lx3-c3-e3` | shell | 300 | suspendue | `FS_METRICS mount=/var/spool blocks_total=10000 blocks_used=2000 inodes_total=50000 inodes_used=48000` | Exercice 3 — Analyseur de table d’inodes et détection de saturation de système de fichiers |

- QCM : 1 bloc(s), **8 question(s)**.
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

- Tableaux : 1 (0 lignes / 5 en-tetes)
- Blocs `pre` : 6 · elements `code` : 57
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-terminal`, `#i-play`, `#i-target`, `#i-info`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3170 mots · 524 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 19 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 7 |
| `box__title` | 7 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `card` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
