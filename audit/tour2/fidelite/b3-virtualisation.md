# Fidélité aux Sources (Mission A) — `b3-virtualisation` (Virtualisation Avancée · B3)

- **Cours** : `b3-virtualisation` (Virtualisation Avancée) — Niveau **B3** (6 chapitres)
- **Documents sources rattachés (4 fichiers, 41 pages)** :
- `textes/B3/Semestre II/virtulisation/Support de cours Module 1 .txt` (10 pages, statut `ok`)
- `textes/B3/Semestre II/virtulisation/Support de cours Module 2 .txt` (9 pages, statut `ok`)
- `textes/B3/Semestre II/virtulisation/Support de cours Module 3 .doc.txt` (8 pages, statut `ok`)
- `textes/B3/Semestre II/virtulisation/Support de cours Module 4.txt` (14 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B3/Semestre II/virtulisation/Support de cours Module 1 .txt#PAGE 1` : *Support de cours*
- `textes/B3/Semestre II/virtulisation/Support de cours Module 1 .txt#PAGE 2` : *Support de cours : Virtualisation (VMWare, Citrix et vSphere)*
- `textes/B3/Semestre II/virtulisation/Support de cours Module 1 .txt#PAGE 3` : *Support de cours : Virtualisation (VMWare, Citrix et vSphere)*
- `textes/B3/Semestre II/virtulisation/Support de cours Module 1 .txt#PAGE 4` : *Support de cours : Virtualisation (VMWare, Citrix et vSphere)*
- `textes/B3/Semestre II/virtulisation/Support de cours Module 1 .txt#PAGE 5` : *Support de cours : Virtualisation (VMWare, Citrix et vSphere)*
- `textes/B3/Semestre II/virtulisation/Support de cours Module 1 .txt#PAGE 6` : *Support de cours : Virtualisation (VMWare, Citrix et vSphere)*
- `textes/B3/Semestre II/virtulisation/Support de cours Module 2 .txt#PAGE 1` : *Support de cours*
- `textes/B3/Semestre II/virtulisation/Support de cours Module 2 .txt#PAGE 2` : *Support de cours : Virtualisation (VMWare, Citrix et vSphere)*
- **Progression des chapitres sur le site** :
- `b3-virtualisation/chapitres/chapitre1.html` : **Chapitre 1 — Architectures d'Hyperviseurs Avancées & Dimensionnement Serveurs** — 1. Architectures d'Hyperviseurs : Type-1 (Bare-Metal) vs Type-2 & Extensions Processeur (`L80`), 2. Dimensionnement Serveur : Ratios de Surallocation vCPU:pCPU & RAM Overcommit (`L110`), 3. Topologies NUMA & vNUMA : Élimination des Latences Inter-Sockets (`L137`), 4. Formats de Disques Virtuels VMDK : Thin vs Thick Provisioning (`L149`)
- `b3-virtualisation/chapitres/chapitre2.html` : **Chapitre 2 — Déploiement vCenter, Cycle de Vie des VM & Gestion des Ressources** — 1. Architecture VMware vCenter Server : Appliance VCSA & Inventaire Datacenter (`L80`), 2. Anatomie des Fichiers d'une Machine Virtuelle sur le Datastore (`L104`), 3. Disques Deltas, Snapshots & Alerte de Consolidation Disque (`L120`), 4. Gestion des Ressources : Resource Pools, Shares, Reservations & Limits (`L142`)
- `b3-virtualisation/chapitres/chapitre3.html` : **Chapitre 3 — Stockage Virtuel Datastores, VMFS-6 & Architectures Hyperconvergées vSAN** — 1. Protocoles de Stockage Datacenter : SAN Bloc (FC, iSCSI) vs NAS Fichier (NFS) (`L80`), 2. Système de Fichiers Clustered VMFS-6 & Primitives d'Accélération VAAI (`L103`), 3. Multipathing NMP & Politiques de Sélection de Chemin (PSP) (`L125`), 4. Architectures Hyperconvergées vSAN & Politiques SPBM (FTT, RAID-1, RAID-5/6) (`L137`)
- `b3-virtualisation/chapitres/chapitre4.html` : **Chapitre 4 — Réseau Virtuel, Commutation Standard & Distribuée (vSwitch & VDS)** — 1. Commutateurs Virtuels : vSwitch Standard (VSS) vs Distributed Switch (VDS) (`L80`), 2. Typologie des Interfaces VMkernel & Port Groups de Machines Virtuelles (`L104`), 3. Tagging & Isolation VLAN 802.1Q : VST, EST & VGT (`L118`), 4. Sécurité des Port Groups & Régulation de Trafic (Traffic Shaping) (`L151`)
- `b3-virtualisation/chapitres/chapitre5.html` : **Chapitre 5 — Haute Disponibilité, Clustering & Mobilité (HA, DRS & vMotion)** — 1. Haute Disponibilité vSphere HA : Agents FDM, Élection & Double Heartbeat (`L80`), 2. Contrôle d'Admission HA & Politiques de Basculement (Failover Capacity) (`L102`), 3. Équilibrage Dynamique vSphere DRS & Règles d'Affinité / Anti-Affinité (`L114`), 4. Mobilité à Chaud vMotion : Algorithme de Pré-Copie & Convergence (`L137`)
- `b3-virtualisation/chapitres/chapitre6.html` : **Chapitre 6 — Sauvegarde Avancée (CBT), Sécurité & Virtualisation du Poste de Travail (VDI)** — 1. Sauvegarde d'Infrastructure Moderne : Changed Block Tracking (CBT) & APIs VADP (`L80`), 2. Sécurité & Durcissement des Hyperviseurs : Lockdown Mode, TPM 2.0 & VM Encryption (`L101`), 3. Virtualisation du Poste de Travail (VDI) : Architectures & Protocoles d'Affichage (`L115`), 4. Dimensionnement du Stockage VDI & Absorption du Boot Storm (`L136`)

## 2. Couverture (Lacunes & Ajouts)
- Les 6 chapitres du site couvrent les notions des 4 document(s) source(s) (41 pages).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — hyperviseur
- **Source PDF** : `textes/B3/Semestre II/virtulisation/Support de cours Module 1 .txt#PAGE 5` : « ents :  Dépendance à un hyperviseur.  Performances moindres par rapport au natif.  Nécessité d'un matériel puissant.  Complexité de gestion et administration avancée. »
- **Site web** : `b3-virtualisation/chapitres/chapitre1.html:L82` : « **hyperviseur** : (ou Virtual Machine Monitor - VMM). En environnement d'entreprise et de Datacenter, une distinction stricte sépare les hyperviseurs de Type-1 des hyperviseurs d »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Performance &amp; Sécurité
- **Source PDF** : `textes/B3/Semestre II/virtulisation/Support de cours Module 1 .txt#PAGE 2` : « Optimiser la sécurité et la performance des environnements virtualisés. AGOUTOCO Caleb -2- »
- **Site web** : `b3-virtualisation/chapitres/chapitre1.html:L89` : « **Performance &amp; Sécurité** : Latence minimale (< 2%), empreinte disque et mémoire minuscule (< 150 Mo pour ESXi), surface d'attaque réduite. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Exemples Datacenter
- **Source PDF** : `textes/B3/Semestre II/virtulisation/Support de cours Module 1 .txt#PAGE 7` : « sé en entreprise.  Exemples : VMware ESXi, Microsoft Hyper-V, Citrix Hypervisor, KVM.  Hyperviseur Type 2 (hébergé) :  Fonctionne au-dessus d’un OS hôte. »
- **Site web** : `b3-virtualisation/chapitres/chapitre1.html:L90` : « **Exemples Datacenter** : VMware ESXi, Citrix Hypervisor (XenServer), Proxmox VE / KVM, Microsoft Hyper-V. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
