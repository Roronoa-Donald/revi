# Fidélité aux Sources (Mission A) — `b1-reseaux` (Architecture des réseaux · B1)

- **Cours** : `b1-reseaux` (Architecture des réseaux) — Niveau **B1** (6 chapitres)
- **Documents sources rattachés (3 fichiers, 200 pages)** :
- `textes/B1/Architecture réseau/ARCHITECTURE DES RESEAUX - COLLEGE DE PARIS -1.txt` (92 pages, statut `ok`)
- `textes/B1/Architecture réseau/ARCHITECTURE DES RESEAUX - COLLEGE DE PARIS -2.txt` (53 pages, statut `ok`)
- `textes/B1/Architecture réseau/ARCHITECTURE DES RESEAUX - COLLEGE DE PARIS -3.txt` (55 pages, statut `ok`)
- **Niveau de confiance** : **Élevé (3 diaporamas de M. Alex Nadjak Kan'Sam : 92 p., 53 p. et 55 p., statut ok)**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Verdict sur l'ordre** : **Restructuration logique sur le site par rapport à des diaporamas sources très décousus, mais parachutages persistants au Ch. 1**
- **État des sources (`textes/B1/Architecture réseau/ARCHITECTURE DES RESEAUX - COLLEGE DE PARIS -1..3.txt`)** : Les 3 PDF sources de M. Kan'Sam sont des diaporamas hybrides qui commencent par 3 diapositives hors-sujet sur l'Intelligence Artificielle (`-1.txt#PAGE 6-8`), puis enchaînent besoins/topologies (`#PAGE 9-25`), commutation/équipements (`#PAGE 26-48`), modèle OSI et TCP/IP (`-2.txt#PAGE 10-53`), et adressage IPv4 / sous-réseaux (`-3.txt#PAGE 10-55`).
- **Ordre sur le site (`b1-reseaux/chapitres/chapitre1..6.html`)** : Le site organise proprement la matière en 6 chapitres (Ch. 1 Fondamentaux/P2P/Client-Serveur/PAN-WAN → Ch. 2 Topologies/supports → Ch. 3 OSI → Ch. 4 TCP/IP → Ch. 5 Adressage MAC/IP/ARP → Ch. 6 Sous-réseautage VLSM/CIDR). Toutefois, dès le Ch. 1 (`chapitre1.html:L74-L115`), le site cite `Active Directory`, `LDAP`, `iSCSI`, `Fibre Channel` et `pare-feu` avant que l'élève ait vu ce qu'est une adresse IP ou un protocole.

## 2. Couverture (Lacunes & Ajouts)
- **Lacunes / Ajouts** : Le site écarte à juste titre les diapositives hors-sujet sur l'IA (`-1.txt#PAGE 6-8`), et ajoute au Ch. 6 (`chapitre6.html:L85-L120`) une méthode structurée de découpage VLSM plus détaillée que les slides de `-3.txt`.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Réseau informatique
- **Source PDF** : `textes/B1/Architecture réseau/ARCHITECTURE DES RESEAUX - COLLEGE DE PARIS -1.txt#PAGE 10` : « Ensemble d'équipements interconnectés qui échangent des informations et partagent des ressources matérielles ou logicielles selon des règles communes (protocoles). »
- **Site web** : `b1-reseaux/chapitres/chapitre1.html:L60` : « Un réseau informatique est un ensemble d'équipements reliés entre eux pour échanger des données et partager des ressources selon des protocoles communs. »
- **Diagnostic** : **Fidèle**.

### Définition 2 — Modèle OSI
- **Source PDF** : `textes/B1/Architecture réseau/ARCHITECTURE DES RESEAUX - COLLEGE DE PARIS -2.txt#PAGE 14` : « Modèle de référence de l'ISO en 7 couches indépendantes allant de la couche Physique (1) à la couche Application (7). »
- **Site web** : `b1-reseaux/chapitres/chapitre3.html:L60` : « Le modèle OSI (Open Systems Interconnection) découpe la communication réseau en 7 couches normalisées de Physique (1) à Application (7). »
- **Diagnostic** : **Fidèle**.

### Définition 3 — Masque de sous-réseau
- **Source PDF** : `textes/B1/Architecture réseau/ARCHITECTURE DES RESEAUX - COLLEGE DE PARIS -3.txt#PAGE 22` : « Suite de 32 bits dont les bits à 1 identifient la partie réseau (NetID) et les bits à 0 la partie hôte (HostID) d'une adresse IPv4. »
- **Site web** : `b1-reseaux/chapitres/chapitre5.html:L85` : « Le masque de sous-réseau sur 32 bits sépare l'adresse IPv4 en identifiant réseau (bits du masque à 1) et identifiant machine (bits à 0). »
- **Diagnostic** : **Exactement alignée**.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Les exercices ont été convertis en grilles `analyse` (`data-language='analyse'`) qui divulguent les 3 cas de test dans l'éditeur.
