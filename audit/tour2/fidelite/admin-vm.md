# Fidélité aux Sources (Mission A) — `admin-vm` (Administration des Machines Virtuelles · B2)

- **Cours** : `admin-vm` (Administration des Machines Virtuelles) — Niveau **B2** (6 chapitres)
- **Documents sources rattachés (8 fichiers, 144 pages)** :
- `textes/B2/administration machine virtuel/Syllabus_B2_IT_Administration-des-Machines-Virtuelles.txt` (18 pages, statut `ok`)
- `textes/B2/administration machine virtuel/Introduction-a-la-Virtualisation_Détaillé.txt` (6 pages, statut `ok`)
- `textes/B2/administration machine virtuel/Module2_Installation-et-Configuration-des-Hyperviseurs_Détaille.txt` (19 pages, statut `ok`)
- `textes/B2/administration machine virtuel/Module-3-Creation-et-Gestion-des-Machines-Virtuelles_Cours_Détaillé_V2FFF.txt` (20 pages, statut `ok`)
- `textes/B2/administration machine virtuel/Module4_Stockage-et-Gestion-des-Volumes_Détaillé.txt` (18 pages, statut `ok`)
- `textes/B2/administration machine virtuel/Module5_Détaillé.txt` (13 pages, statut `ok`)
- `textes/B2/administration machine virtuel/Module-6_Administration-des-Machines-Virtuelles_Détaillé.txt` (24 pages, statut `ok`)
- `textes/B2/administration machine virtuel/TP_PBS_ENRICHI_COMPLET_FINAL.txt` (26 pages, statut `ok`)
- **Niveau de confiance** : **Moyen** (Supports théoriques Modules 1 à 6 complets, mais `TP_Module6.pdf` corrompu)

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Ordre des 6 modules du syllabus respecté, mais omission critique de `vMotion` et `thin provisioning` évalués à l'examen officiel B2**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B2/administration machine virtuel/Syllabus_B2_IT_Administration-des-Machines-Virtuelles.txt#PAGE 1` : *Administration des Machines*
- `textes/B2/administration machine virtuel/Syllabus_B2_IT_Administration-des-Machines-Virtuelles.txt#PAGE 4` : *Adaptations au Contexte Togolais*
- `textes/B2/administration machine virtuel/Syllabus_B2_IT_Administration-des-Machines-Virtuelles.txt#PAGE 7` : *Module 3 4 Création et Gestion des VMs (5h)*
- `textes/B2/administration machine virtuel/Syllabus_B2_IT_Administration-des-Machines-Virtuelles.txt#PAGE 10` : *Module 7 4 Automatisation et CLI (2h)*
- `textes/B2/administration machine virtuel/Syllabus_B2_IT_Administration-des-Machines-Virtuelles.txt#PAGE 13` : *Outils et Ressources Pédagogiques*
- `textes/B2/administration machine virtuel/Syllabus_B2_IT_Administration-des-Machines-Virtuelles.txt#PAGE 16` : *Références Bibliographiques*
- `textes/B2/administration machine virtuel/Introduction-a-la-Virtualisation_Détaillé.txt#PAGE 1` : *COLLÈGE DE PARIS SUPÉRIEUR - TOGO*
- `textes/B2/administration machine virtuel/Introduction-a-la-Virtualisation_Détaillé.txt#PAGE 2` : *PARTIE 1 : CONCEPTS FONDAMENTAUX (45 min)*
- **Progression des chapitres sur le site** :
- `admin-vm/chapitres/chapitre1.html` : **Chapitre 1 — Introduction à la virtualisation** — 1. Qu’est-ce que la virtualisation (`L80`), 2. Pourquoi virtualiser (`L89`), 3. Les grands types de virtualisation (`L104`), 4. Hyperviseurs : type 1 et type 2 (`L114`)
- `admin-vm/chapitres/chapitre2.html` : **Chapitre 2 — Prérequis et architecture des hyperviseurs** — 1. Prérequis matériels (`L80`), 2. Virtualisation imbriquée et conflits de couches (`L95`), 3. La pile KVM (`L105`), 4. Architecture d’un hyperviseur (`L115`)
- `admin-vm/chapitres/chapitre3.html` : **Chapitre 3 — Cycle de vie et ressources des VM** — 1. Concepts essentiels (`L80`), 2. Les quatre phases du cycle de vie (`L90`), 3. Allocation de ressources (`L104`), 4. Réseau, snapshots et clones (`L117`)
- `admin-vm/chapitres/chapitre4.html` : **Chapitre 4 — Stockage et gestion des volumes** — 1. Pourquoi le stockage est critique (`L80`), 2. LVM en trois notions (`L93`), 3. Types de stockage et protocoles (`L103`), 4. Snapshots, sauvegardes et GFS (`L117`)
- `admin-vm/chapitres/chapitre5.html` : **Chapitre 5 — Réseau virtualisé et segmentation** — 1. Les briques réseau (`L80`), 2. VLAN et segmentation (`L94`), 3. DMZ et pare-feu (`L104`), 4. Diagnostiquer et scénario type (`L118`)
- `admin-vm/chapitres/chapitre6.html` : **Chapitre 6 — Administration avancée** — 1. Gestion avancée des ressources (`L80`), 2. Cluster, quorum, fencing et failover (`L93`), 3. Migration (`L103`), 4. Sauvegarde avancée, monitoring et sécurité (`L113`)

## 2. Couverture (Lacunes & Ajouts)
- **Lacune critique vis-à-vis de l'examen officiel B2 (`D9`, S0)** : L'épreuve officielle `textes/Examens_et_Annales/Recueil_Epreuves_2024_2025.txt#PAGE 10-12` (et `scans_originaux/Examens_et_Annales__Epreuves_Groupées.pdf` p. 7, 9, 10) évalue `vMotion` et `thin provisioning`, qui sont absents des 6 chapitres de `admin-vm` (et reportés en B3 dans `b3-virtualisation`). De plus, `TP_Module6.pdf` est corrompu.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — machines virtuelles
- **Source PDF** : `textes/B2/administration machine virtuel/Syllabus_B2_IT_Administration-des-Machines-Virtuelles.txt#PAGE 1` : « Administration des Machines Virtuelles Collège de Paris Supérieur 4 Togo · Bachelor 2 (B2) IT · Semestre 2 CODE B2COM0208 24 HEURES · 2 CRÉDITS ENSEIGNANT : ELOM MENSAH »
- **Site web** : `admin-vm/chapitres/chapitre1.html:L82` : « **machines virtuelles** : (VM) sur un seul serveur physique. Chaque VM fonctionne comme un ordinateur complet : son propre système, ses logiciels, ses ressources (CPU, RAM, disque). »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — 100 % théorique
- **Source PDF** : `textes/B2/administration machine virtuel/Introduction-a-la-Virtualisation_Détaillé.txt#PAGE 4` : « ncipale Pourquoi Proxmox VE ? 100% open source et gratuit, basé sur KVM et LXC. Interface web moderne sans coût de licence, idéal pour PME africaines. Points forts  Gratuit et open »
- **Site web** : `admin-vm/chapitres/chapitre1.html:L86` : « **100 % théorique** : : on attend des définitions claires, des comparaisons justes et la capacité à relier les notions — pas de manipulation d’outil. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Consolidation
- **Source PDF** : `textes/B2/administration machine virtuel/Syllabus_B2_IT_Administration-des-Machines-Virtuelles.txt#PAGE 6` : « dule 2 · Installation (5h) Consolidation, isolation, flexibilité, Vérification matérielle : VT- économies d'énergie x/AMD-V, RAM g 4GB Hyperviseurs Type 1 (bar »
- **Site web** : `admin-vm/chapitres/chapitre1.html:L93` : « **Consolidation** : : un serveur physique héberge 5 à 20 VM selon la charge. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `powershell`.
