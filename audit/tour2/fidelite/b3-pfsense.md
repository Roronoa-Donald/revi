# Fidélité aux Sources (Mission A) — `b3-pfsense` (pfSense & Routage · B3)

- **Cours** : `b3-pfsense` (pfSense & Routage) — Niveau **B3** (6 chapitres)
- **Statut des sources PDF** : **Aucun PDF source dans `corpus-cours-revi.zip`**
- **Niveau de confiance (Mission A)** : **Nul (Aucun PDF source dans corpus-cours-revi.zip — Mission A impossible)**

## 1. Mission A — Fidélité aux sources
Conformément à la section 2 du prompt, ce cours ne disposant d'aucun support PDF dans l'archive `corpus-cours-revi.zip`, **la comparaison aux sources (Mission A) est impossible**. Seule la cohérence interne des 6 chapitres du site est vérifiée ci-dessous.

## 2. Vérification de la cohérence interne sur le site
- **Progression des 6 chapitres** :
  - `chapitres/chapitre1.html` : **Chapitre 1 — Architecture pfSense, Moteur BSD Packet Filter & Déploiement Réseau** (1. Architecture Système : Du Noyau FreeBSD au Moteur Packet Filter (pf), 2. Assignation des Interfaces Réseau & Modèle de Routage, 3. Services d’Infrastructure Indispensables : DHCP & DNS Resolver Unbound, 4. Études de cas & applications pratiques)
  - `chapitres/chapitre2.html` : **Chapitre 2 — Règles de Pare-Feu, Aliases, États de Connexion (Stateful) & Limiteurs** (1. Cinématique d’Évaluation des Règles : De la Théorie pf au « First-Match Wins », 2. Gestion Modulaire des Aliases & Tables Radix pf, 3. Inspection Stateful & Façonnement du Trafic (Limiters Dummynet), 4. Études de cas & applications pratiques)
  - `chapitres/chapitre3.html` : **Chapitre 3 — Translation d’Adresses (NAT), Redirections & Routage Multi-WAN** (1. Translation d’Adresses Entrante : Port Forwarding (DNAT) & NAT 1:1, 2. NAT Sortant (Outbound NAT) : Modes Automatique, Hybride & IP Virtuelles, 3. Architecture Multi-WAN : Groupes de Passerelles, Tiers & PBR, 4. Études de cas & applications pratiques)
  - `chapitres/chapitre4.html` : **Chapitre 4 — Segmentation Réseau : VLANs 802.1Q & DMZ Sécurisée** (1. Standard IEEE 802.1Q & Sous-Interfaces Logiques FreeBSD, 2. Matrice de Flux Inter-VLANs & Architecture de DMZ Publique, 3. Vulnérabilités de Couche 2 : Attaques VLAN Hopping & Double Tagging, 4. Études de cas & applications pratiques)
  - `chapitres/chapitre5.html` : **Chapitre 5 — Tunnels VPN Sécurisés : OpenVPN (SSL/TLS) & IPsec Site-à-Site** (1. Infrastructure à Clés Publiques (PKI X.509) Interne sous pfSense, 2. Passerelle OpenVPN Nomade : SSL/TLS, Client Export & Routage, 3. Tunnels IPsec IKEv2 Site-à-Site & Durcissement Cryptographique, 4. Études de cas & applications pratiques)
  - `chapitres/chapitre6.html` : **Chapitre 6 — Haute Disponibilité (CARP/pfsync) & Détection d’Intrusion (Snort/Suricata)** (1. Architecture de Clustering Actif/Passif : Protocole CARP & Élection du Maître, 2. Continuité de Service Sans Coupure : pfsync & Réplication XMLRPC, 3. Détection & Prévention d’Intrusion Réseau : Snort, Suricata & Table snort2c, 4. Études de cas & applications pratiques)
- **Principaux constats de cohérence interne** :
  - Langage des ateliers : `analyse`
  - En-tête de prérequis explicites : absent (`C3`).
  - Cohérence Objectifs / Exercices / QCM : voir `audit/tour2/02-verification-rapport.md` (points B1 à B10) et le plan de corrections par lots `audit/tour2/04-plan-corrections.md`.
