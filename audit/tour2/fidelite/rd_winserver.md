# Fidélité aux Sources (Mission A) — `rd_winserver` (Windows Server · B2)

- **Cours** : `rd_winserver` (Windows Server) — Niveau **B2** (6 chapitres)
- **Documents sources rattachés (2 fichiers, 6 pages)** :
- `textes/B2/rd_winserver/Histoire HAUTE DISPONIBILITE.txt` (3 pages, statut `ok`)
- `textes/B2/rd_winserver/EVALUATION DE CONNAISSANCE.txt` (3 pages, statut `ok`)
- **Niveau de confiance** : **Faible** (Seulement 2 courts documents de 3 pages dans le corpus : `Histoire HAUTE DISPONIBILITE.txt` et `EVALUATION DE CONNAISSANCE.txt`)

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B2/rd_winserver/Histoire HAUTE DISPONIBILITE.txt#PAGE 1` : *Le jour où le serveur tomba*
- `textes/B2/rd_winserver/Histoire HAUTE DISPONIBILITE.txt#PAGE 2` : *L’équipe IT suit le plan de reprise d’activité (PRA) :*
- `textes/B2/rd_winserver/Histoire HAUTE DISPONIBILITE.txt#PAGE 3` : *14. Comment tester régulièrement l’efficacité d’un plan de reprise d’activité ?*
- `textes/B2/rd_winserver/EVALUATION DE CONNAISSANCE.txt#PAGE 1` : *EVALUATION DE CONNAISSANCE*
- `textes/B2/rd_winserver/EVALUATION DE CONNAISSANCE.txt#PAGE 2` : *d) Pour changer l’interface graphique*
- `textes/B2/rd_winserver/EVALUATION DE CONNAISSANCE.txt#PAGE 3` : *❖ De déterminer si un PRA doit être activé*
- **Progression des chapitres sur le site** :
- `rd_winserver/chapitres/chapitre1.html` : **Chapitre 1 — Sauvegarde des données** — 1. À quoi sert une sauvegarde (`L80`), 2. Les trois types de sauvegarde (`L89`), 3. Comparer les trois types (`L102`), 4. Stratégie 3-2-1, PCA et PRA (`L113`)
- `rd_winserver/chapitres/chapitre2.html` : **Chapitre 2 — Haute disponibilité** — 1. Définition et objectif (`L80`), 2. Les trois piliers (`L89`), 3. Les niveaux de disponibilité (SLA) (`L103`), 4. La HA virtualisée (`L114`)
- `rd_winserver/chapitres/chapitre3.html` : **Chapitre 3 — Clustering** — 1. Qu’est-ce qu’un cluster (`L80`), 2. Active-passive et active-active (`L94`), 3. Load balancing et failover (`L103`), 4. Grid cluster et tableau récapitulatif (`L112`)
- `rd_winserver/chapitres/chapitre4.html` : **Chapitre 4 — Maintenance de Windows Server** — 1. Maintenance préventive (`L80`), 2. Surveiller le système (`L89`), 3. Matériel et fréquences (`L100`), 4. Maintenance corrective et évolutive (`L115`)
- `rd_winserver/chapitres/chapitre5.html` : **Chapitre 5 — Virtualisation & VMware** — 1. Hyperviseur de type 1 et de type 2 (`L80`), 2. Les réseaux virtuels (`L93`), 3. Images disque (`L107`), 4. vCPU, CPU Ready Time et surallocation (`L120`)
- `rd_winserver/chapitres/chapitre6.html` : **Chapitre 6 — Snapshots, clones & templates** — 1. Le snapshot (`L80`), 2. Clones complet et lié (`L94`), 3. Templates et vMotion (`L107`), 4. Cluster HA et sauvegarde Veeam (`L116`)

## 2. Couverture (Lacunes & Ajouts)
- Les 2 PDF du dossier (6 pages au total) ne couvrent qu'une introduction historique à la Haute Disponibilité et un questionnaire ; les 6 chapitres du site (AD, Hyper-V, Failover Clustering, VMware ESXi, Veeam) dépassent largement ces 6 pages, et imposent 18 exercices en **PowerShell** sans enseigner la syntaxe PowerShell au préalable (`D6`).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Complète
- **Source PDF** : `textes/B2/rd_winserver/Histoire HAUTE DISPONIBILITE.txt#PAGE 2` : « el événement a causé la perte complète du datacenter principal ? 5. Où se trouvaient les copies de secours des machines virtuelles ? 6. En combien de temps les VM critiques ont-elles »
- **Site web** : `rd_winserver/chapitres/chapitre1.html:L93` : « **Complète** : : on copie l’ensemble des données (fichiers, dossiers, images système). Une seule sauvegarde suffit pour tout restaurer. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Incrémentielle
- **Source PDF** : `textes/B2/rd_winserver/EVALUATION DE CONNAISSANCE.txt#PAGE 1` : « es AD DS 4. Une sauvegarde incrémentielle : a) Sauvegarde toutes les données à chaque opération b) Ne sauvegarde que les modifications depuis la dernière sauvegarde quelconque »
- **Site web** : `rd_winserver/chapitres/chapitre1.html:L94` : « **Incrémentielle** : : après une complète, on ne copie que les modifications depuis la »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Différentielle
- **Source PDF** : `textes/B2/rd_winserver/EVALUATION DE CONNAISSANCE.txt#PAGE 2` : « s complète, incrémentielle et différentielle. 4. Expliquer le fonctionnement d’un cluster Active-Active et un cas d’usage concret. 5. Quels sont les éléments critiques à vérifier lors d’ »
- **Site web** : `rd_winserver/chapitres/chapitre1.html:L95` : « **Différentielle** : : après une complète, on copie toutes les modifications depuis la »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `powershell`.
