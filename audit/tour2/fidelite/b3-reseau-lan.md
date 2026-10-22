# Fidélité aux Sources (Mission A) — `b3-reseau-lan` (Réseau LAN Avancé · B3)

- **Cours** : `b3-reseau-lan` (Réseau LAN Avancé) — Niveau **B3** (6 chapitres)
- **Documents sources rattachés (2 fichiers, 59 pages)** :
- `textes/B3/Semestre II/Telephonie_voix_IP/Reseaux Locaux.txt` (44 pages, statut `ocr`)
- `textes/B3/Semestre II/Telephonie_voix_IP/Topologie réseaux.txt` (15 pages, statut `ocr`)
- **Niveau de confiance** : **Faible** (Les 2 PDF OCR de `Telephonie_voix_IP` traitent des bases LAN Ethernet/topologies, sans couvrir STP/LACP/VRRP/OSPF/802.1X)

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B3/Semestre II/Telephonie_voix_IP/Reseaux Locaux.txt#PAGE 1` : *À | _. à*
- `textes/B3/Semestre II/Telephonie_voix_IP/Reseaux Locaux.txt#PAGE 8` : *MAN (Metropolitain Area Network) ce type de réseau*
- `textes/B3/Semestre II/Telephonie_voix_IP/Reseaux Locaux.txt#PAGE 15` : *3. Le serveur d'impression : permet de partager une*
- `textes/B3/Semestre II/Telephonie_voix_IP/Reseaux Locaux.txt#PAGE 22` : *7 —*
- `textes/B3/Semestre II/Telephonie_voix_IP/Reseaux Locaux.txt#PAGE 29` : *C'est un câble utilisé également en téléphonie et en*
- `textes/B3/Semestre II/Telephonie_voix_IP/Reseaux Locaux.txt#PAGE 36` : *Connecteur RJ45*
- `textes/B3/Semestre II/Telephonie_voix_IP/Topologie réseaux.txt#PAGE 1` : *EF Techno Pédagogue, acteur du changement*
- `textes/B3/Semestre II/Telephonie_voix_IP/Topologie réseaux.txt#PAGE 3` : *TYPOLOGIE DES RESEAUX INFORMATIQUES p.*
- **Progression des chapitres sur le site** :
- `b3-reseau-lan/chapitres/chapitre1.html` : **Chapitre 1 — Spanning Tree Protocol Avancé (STP / RSTP / MSTP) & Mécanismes de Protection** — 1. Topologies Maillées & Vulnérabilités de Niveau 2 (La Nécessité du STP) (`L82`), 2. Élection du Root Bridge & Détermination des Rôles de Ports (`L100`), 3. Mécanismes de Sécurisation & Durcissement STP de Niveau 2 (`L128`), 4. Études de cas & applications pratiques (`L147`)
- `b3-reseau-lan/chapitres/chapitre2.html` : **Chapitre 2 — Agrégation de Liaisons EtherChannel (LACP & PAgP) & Répartition de Charge** — 1. Fondements de l’Agrégation de Liaisons & Rôle du Port-Channel (`L82`), 2. Protocoles de Négociation Dynamique : LACP vs PAgP & Modes (`L100`), 3. Cohérence Strict des Membres & Algorithmes de Hachage de Flux (`L128`), 4. Études de cas & applications pratiques (`L152`)
- `b3-reseau-lan/chapitres/chapitre3.html` : **Chapitre 3 — Protocoles de Redondance de Passerelle FHRP (HSRP, VRRP & GLBP)** — 1. Problématique du Single Point of Failure (SPOF) & Modèle du Routeur Virtuel (`L82`), 2. Comparatif Rigoureux : HSRP (Cisco) vs VRRP (RFC 5798) (`L102`), 3. Object Tracking & Équilibrage Actif-Actif GLBP (`L123`), 4. Études de cas & applications pratiques (`L148`)
- `b3-reseau-lan/chapitres/chapitre4.html` : **Chapitre 4 — Routage Intra-Domaine OSPFv2 Avancé, Aires Spéciales & Analyse des LSAs** — 1. Principes du Routage à État de Liens & Algorithme SPF de Dijkstra (`L82`), 2. Adjacences OSPF, Élection DR/BDR & Typologie des LSAs (`L102`), 3. Aires Hiérarchiques & Aires Spéciales (Stub, Totally Stubby, NSSA) (`L127`), 4. Études de cas & applications pratiques (`L146`)
- `b3-reseau-lan/chapitres/chapitre5.html` : **Chapitre 5 — Sécurité de la Couche d’Accès (Port Security, DHCP Snooping & DAI)** — 1. Attaques Fondamentales de Niveau 2 : Saturation CAM & Serveurs DHCP Pirates (`L82`), 2. Port Security : Contrôle d’Accès Matériel & Modes de Violation (`L106`), 3. DHCP Snooping & Dynamic ARP Inspection (DAI) (`L135`), 4. Études de cas & applications pratiques (`L159`)
- `b3-reseau-lan/chapitres/chapitre6.html` : **Chapitre 6 — Qualité de Service LAN (QoS 802.1p / DSCP) & Protocoles de Découverte (LLDP/CDP)** — 1. Métriques de Qualité de Service & Modèles d’Architecture (`L82`), 2. Marquage de Couche 2 (802.1p CoS) & Couche 3 (DiffServ DSCP) (`L105`), 3. Ordonnancement de Files & Protocoles de Découverte (LLDP / CDP) (`L135`), 4. Études de cas & applications pratiques (`L158`)

## 2. Couverture (Lacunes & Ajouts)
- Les deux diaporamas scannés (`Reseaux Locaux.pdf` 44 p. et `Topologie réseaux.pdf` 15 p., ouverts dans `scans_originaux/`) ne couvrent que les bases Ethernet/CSMA-CD/commutation de niveau B1/B2 ; les sujets avancés des Ch. 1 à 6 de `b3-reseau-lan` (RSTP/MSTP, LACP, VRRP/HSRP, OSPF multi-area, 802.1X/DAI/DHCP Snooping, QoS DSCP) n'ont pas de PDF dédié dans l'archive.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Broadcast Storm (Tempête de Diffusion)
- **Source PDF** : `textes/B3/Semestre II/Telephonie_voix_IP/Reseaux Locaux.txt#PAGE 3` : « des adresses MAC, diffusion, Broadcast. e Différents équipements actifs (répéteur, concentrateur, pont, commutateur, routeur, ..) e configuration d'un réseau segmenté en VLAN (lien Multivl »
- **Site web** : `b3-reseau-lan/chapitres/chapitre1.html:L89` : « **Broadcast Storm (Tempête de Diffusion)** : Multiplication exponentielle des trames broadcast (ex: requêtes ARP), saturant 100 % de la bande passante des liaisons physiques en quelques secondes. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Adresse MAC (48 bits)
- **Source PDF** : `textes/B3/Semestre II/Telephonie_voix_IP/Reseaux Locaux.txt#PAGE 3` : « Ethernet : apprentissage des adresses MAC, diffusion, Broadcast. e Différents équipements actifs (répéteur, concentrateur, pont, commutateur, routeur, ..) e configuration d'un réseau seg »
- **Site web** : `b3-reseau-lan/chapitres/chapitre1.html:L110` : « **Adresse MAC (48 bits)** : Plus petite adresse physique utilisée comme critère ultime de départage. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Port ID (PID)
- **Source PDF** : `textes/B3/Semestre II/Telephonie_voix_IP/Reseaux Locaux.txt#PAGE 15` : « destiné à des entreprises comportant dizaines à plusieurs centaines d'ordinateur »
- **Site web** : `b3-reseau-lan/chapitres/chapitre1.html:L119` : « **Port ID (PID)** : du voisin le plus bas (priorité de port + numéro de port). »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
