# Fidélité aux Sources (Mission A) — `ccna` (CCNA Réseau · B2)

- **Cours** : `ccna` (CCNA Réseau) — Niveau **B2** (6 chapitres)
- **Statut des sources PDF** : **Aucun PDF source dans `corpus-cours-revi.zip`**
- **Niveau de confiance (Mission A)** : **Nul (Aucun PDF source dans corpus-cours-revi.zip — Mission A impossible)**
- **Note importante (Épreuve officielle B2 dans `epreuves`)** : L'épreuve officielle de Réseau B2 (`textes/Examens_et_Annales/Recueil_Epreuves_2024_2025.txt#PAGE 7-9`) évalue le routage statique/dynamique, les VLAN, le DHCP et le découpage de sous-réseaux.

## 1. Mission A — Fidélité aux sources
Conformément à la section 2 du prompt, ce cours ne disposant d'aucun support PDF dans l'archive `corpus-cours-revi.zip`, **la comparaison aux sources (Mission A) est impossible**. Seule la cohérence interne des 6 chapitres du site est vérifiée ci-dessous.

## 2. Vérification de la cohérence interne sur le site
- **Progression des 6 chapitres** :
  - `chapitres/chapitre1.html` : **Chapitre 1 — Modèles OSI et TCP/IP, Encapsulation & En-têtes Réseau** (1. Modèle OSI (7 couches) vs Modèle TCP/IP (4 couches), 2. Unités de Données de Protocole (PDU) & Processus d’Encapsulation, 3. Anatomie de la Trame Ethernet II & Adressage MAC, 4. Résolution d’Adresses avec le Protocole ARP)
  - `chapitres/chapitre2.html` : **Chapitre 2 — Adressage IPv4, Masquage, CIDR & Découpage VLSM** (1. Structure d’une Adresse IPv4 & Classes d’Adresses, 2. Masques de Sous-Réseau, Notation CIDR & Masques Génériques (Wildcards), 3. Calcul Pratique d’un Sous-Réseau : Réseau, Broadcast & Plage, 4. Méthodologie du Découpage Hiérarchique VLSM)
  - `chapitres/chapitre3.html` : **Chapitre 3 — Commutation Ethernet L2, Tables CAM & Spanning Tree (STP)** (1. Fonctionnement d’un Switch L2 & Table CAM, 2. Domaines de Collision vs Domaines de Diffusion, 3. Le Péril des Boucles de Niveau 2 & Tempêtes de Diffusion, 4. Le Protocole Spanning Tree (STP 802.1D & 802.1w RSTP))
  - `chapitres/chapitre4.html` : **Chapitre 4 — Configuration des Équipements sous Cisco IOS & Sécurisation** (1. Hiérarchie des Modes d’Exécution Cisco IOS, 2. Gestion des Fichiers de Configuration : RAM vs NVRAM, 3. Les 5 Règles d’Or du Durcissement de Sécurité Cisco IOS, 4. Diagnostic d’État des Interfaces (show ip interface brief))
  - `chapitres/chapitre5.html` : **Chapitre 5 — Routage IPv4, Tables de Routage & Routes Statiques** (1. Principes du Routage L3 & Lecture de « show ip route », 2. L’Algorithme Décisionnel : Longest Prefix Match (LPM), 3. Configuration des Routes Statiques & Route par Défaut, 4. Routes Statiques Flottantes & Supernetting)
  - `chapitres/chapitre6.html` : **Chapitre 6 — VLANs, Trunking 802.1Q & Routage Inter-VLAN (ROAS)** (1. Segmentation Logique par VLANs (Virtual LANs), 2. Ports Access vs Liens Trunk & Balise IEEE 802.1Q, 3. Configuration d’un Trunk 802.1Q sous Cisco IOS, 4. Routage Inter-VLAN : La Méthode Router-on-a-Stick (ROAS))
- **Principaux constats de cohérence interne** :
  - Langage des ateliers : `analyse`
  - En-tête de prérequis explicites : absent (`C3`).
  - Cohérence Objectifs / Exercices / QCM : voir `audit/tour2/02-verification-rapport.md` (points B1 à B10) et le plan de corrections par lots `audit/tour2/04-plan-corrections.md`.
