# Fidélité aux Sources (Mission A) — `b3-windows-server` (Windows Server · B3)

- **Cours** : `b3-windows-server` (Windows Server) — Niveau **B3** (6 chapitres)
- **Documents sources rattachés (3 fichiers, 51 pages)** :
- `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 1 .txt` (16 pages, statut `ok`)
- `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 2.txt` (20 pages, statut `ok`)
- `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 3.txt` (15 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 1 .txt#PAGE 1` : *Support de cours*
- `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 1 .txt#PAGE 3` : *Support de cours : Administration Windows et Windows Server 2*
- `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 1 .txt#PAGE 5` : *Support de cours : Administration Windows et Windows Server 2*
- `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 1 .txt#PAGE 7` : *Support de cours : Administration Windows et Windows Server 2*
- `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 1 .txt#PAGE 9` : *Support de cours : Administration Windows et Windows Server 2*
- `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 1 .txt#PAGE 11` : *Support de cours : Administration Windows et Windows Server 2*
- `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 2.txt#PAGE 1` : *Support de cours*
- `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 2.txt#PAGE 4` : *Support de cours : Administration Windows et Windows Server 2*
- **Progression des chapitres sur le site** :
- `b3-windows-server/chapitres/chapitre1.html` : **Chapitre 1 — Architecture Système, Services d’Infrastructure Réseau & Modèle de Licence par Cœur** — 1. Architecture Interne du Système d’Exploitation Windows Server (`L82`), 2. Services Réseau Fondamentaux : DHCP & Résolution DNS d’Infrastructure (`L108`), 3. Modèle Officiel Microsoft de Licences par Cœur Physique (`L133`), 4. Études de cas & applications pratiques (`L156`)
- `b3-windows-server/chapitres/chapitre2.html` : **Chapitre 2 — Annuaire d’Entreprise Active Directory (AD DS), Gouvernance AGDLP & Rôles FSMO** — 1. Architecture Hiérarchique d’Active Directory Domain Services (AD DS) (`L82`), 2. Les 5 Rôles FSMO (Flexible Single Master Operations) (`L108`), 3. Gouvernance des Identités : Méthodologie Standard AGDLP / AGUDLP (`L133`), 4. Études de cas & applications pratiques (`L155`)
- `b3-windows-server/chapitres/chapitre3.html` : **Chapitre 3 — Stratégies de Groupe (GPO), Modèle LSDOU & Gouvernance de Parc** — 1. Architecture Interne et Composants d’une GPO (GPC vs GPT) (`L82`), 2. Cycle d’Évaluation et Ordre de Précédence LSDOU (`L104`), 3. Arbitrage Avancé : Enforced, Block Inheritance & Filtres WMI (`L129`), 4. Études de cas & applications pratiques (`L150`)
- `b3-windows-server/chapitres/chapitre4.html` : **Chapitre 4 — Services de Fichiers, Permissions NTFS vs Partage SMB & Espaces de Stockage** — 1. Systèmes de Fichiers d’Entreprise : NTFS vs ReFS (`L82`), 2. Sécurité d’Accès Réseau : Règle du Plus Restrictif & Hiérarchie DACL (`L104`), 3. Stockage Moderne d’Entreprise : Espaces de Stockage (Storage Spaces) (`L134`), 4. Études de cas & applications pratiques (`L159`)
- `b3-windows-server/chapitres/chapitre5.html` : **Chapitre 5 — Virtualisation d’Entreprise Hyper-V, Commutateurs Virtuels & Haute Disponibilité** — 1. Architecture Interne de l’Hyperviseur Microsoft Hyper-V (`L82`), 2. Commutateurs Réseau Virtuels (Virtual Switches) (`L109`), 3. Mémoire Dynamique, Disques VHDX & Points de Contrôle (`L131`), 4. Études de cas & applications pratiques (`L157`)
- `b3-windows-server/chapitres/chapitre6.html` : **Chapitre 6 — Administration Avancée PowerShell, Sauvegardes VSS & Tolérance aux Pannes** — 1. Automatisation Système et Administration à Distance (WinRM) (`L82`), 2. Sauvegardes d’Entreprise et Architecture VSS (Volume Shadow Copy) (`L109`), 3. Clustering de Basculement (WSFC) & Formules de Quorum (`L132`), 4. Études de cas & applications pratiques (`L159`)

## 2. Couverture (Lacunes & Ajouts)
- Les 6 chapitres du site couvrent les notions des 3 document(s) source(s) (51 pages).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Mode Noyau (Ring 0 / Kernel Mode)
- **Source PDF** : `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 1 .txt#PAGE 10` : « te réseau Gbit 7.2. Choix du mode d’installation Windows Server propose deux modes : Mode Description Desktop Experience Avec interface graphique »
- **Site web** : `b3-windows-server/chapitres/chapitre1.html:L89` : « **Mode Noyau (Ring 0 / Kernel Mode)** : accès direct au processeur et aux ressources physiques. Comprend la couche d’abstraction matérielle (HAL - Hardware Abstraction Layer), le micro-noyau NT (Execu »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Mode Utilisateur (Ring 3 / User Mode)
- **Source PDF** : `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 1 .txt#PAGE 10` : « te réseau Gbit 7.2. Choix du mode d’installation Windows Server propose deux modes : Mode Description Desktop Experience Avec interface graphique »
- **Site web** : `b3-windows-server/chapitres/chapitre1.html:L90` : « **Mode Utilisateur (Ring 3 / User Mode)** : espace mémoire isolé et protégé. Héberge les sous-systèmes d’environnement (Win32 / Windows Subsystem), les applications d’entreprise et les processus système c »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — DHCP Failover
- **Source PDF** : `textes/B3/SEMESTRE I/Windows_server/Support de cours Module 1 .txt#PAGE 3` : « Gestion des rôles (ADDS, DNS, DHCP, Web Server…). 1.2. Gestion des utilisateurs et des accès  Création et gestion de comptes utilisateurs.  Attribution de droits et permi »
- **Site web** : `b3-windows-server/chapitres/chapitre1.html:L119` : « **DHCP Failover** : haute disponibilité entre deux serveurs DHCP en mode Load Balancing (50/50 ou 80/20) ou Hot Standby. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
