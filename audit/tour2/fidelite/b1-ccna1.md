# Fidélité aux Sources (Mission A) — `b1-ccna1` (CCNA 1 · B1)

- **Cours** : `b1-ccna1` (CCNA 1) — Niveau **B1** (6 chapitres)
- **Documents sources rattachés (1 fichiers, 143 pages)** :
- `textes/B1/CCNA1/COURS CCNA1_CDP_PROF AHOULOUMI.txt` (143 pages, statut `ok`)
- **Niveau de confiance** : **Élevé (COURS CCNA1_CDP_PROF AHOULOUMI.txt, 143 pages structurées en 6 chapitres, statut ok)**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Verdict sur l'ordre** : **Alignement 1 pour 1 exemplaire entre les 6 chapitres du PDF source et les 6 chapitres du site**
- **Ordre dans la source (`textes/B1/CCNA1/COURS CCNA1_CDP_PROF AHOULOUMI.txt#PAGE 3-5`)** : Chapitre I : Généralités et composantes des réseaux, paires torsadées UTP/STP, fibre optique (`#PAGE 7-35`) → Chapitre II : Modèles TCP/IP (4 puis 5 couches) et OSI (7 couches), encapsulation (`#PAGE 36-52`) → Chapitre III : Réseaux locaux Ethernet, SOHO, trame 802.3, CSMA/CD et full-duplex (`#PAGE 53-77`) → Chapitre IV : Fondamentaux des WAN (lignes louées, HDLC, Ethernet WAN) et du routage IP (`#PAGE 78-99`) → Chapitre V : Utilisation de l'interface en ligne de commande Cisco IOS (modes User/Enable/Config, RAM/NVRAM/Flash/ROM) (`#PAGE 100-121`) → Chapitre VI : Configuration de base d'un commutateur Cisco (hostname, mots de passe, SVI `interface vlan 1`, `banner motd`) (`#PAGE 122-143`).
- **Comparaison avec le site (`b1-ccna1/chapitres/chapitre1..6.html`)** : Les 6 chapitres du site suivent **exactement dans le même ordre** les Chapitres I à VI du polycopié du Prof. Ahouloumi.

## 2. Couverture (Lacunes & Ajouts)
- **Couverture** : Fidélité remarquable au polycopié de 143 pages (y compris la transition du modèle TCP/IP de 4 à 5 couches de la documentation Cisco officielle traitée à `#PAGE 38-42` et dans `b1-ccna1/chapitres/chapitre2.html:L60`).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Encapsulation
- **Source PDF** : `textes/B1/CCNA1/COURS CCNA1_CDP_PROF AHOULOUMI.txt#PAGE 49` : « Processus par lequel chaque couche descendante ajoute son propre en-tête (et éventuellement une queue à la couche 2) aux données reçues de la couche supérieure : Données → Segment → Paquet → Trame → Bits. »
- **Site web** : `b1-ccna1/chapitres/chapitre2.html:L88` : « L'encapsulation ajoute à chaque couche descendante un en-tête protocolaire : Données, Segment (L4), Paquet (L3), Trame (L2, avec en-tête et FCS), Bits (L1). »
- **Diagnostic** : **Parfaitement fidèle**.

### Définition 2 — Trame Ethernet IEEE 802.3
- **Source PDF** : `COURS CCNA1_CDP_PROF AHOULOUMI.txt#PAGE 66` : « Une trame Ethernet comporte : Préambule (7 octets) + SFD (1 octet), MAC Destination (6 octets), MAC Source (6 octets), Type/Longueur (2 octets), Données (46 à 1500 octets) et FCS CRC (4 octets). »
- **Site web** : `b1-ccna1/chapitres/chapitre3.html:L84` : « La trame 802.3 encadre les données (46–1500 octets) par Préambule+SFD (8 o), MAC Dest (6 o), MAC Source (6 o), Type (2 o) et FCS (4 o), soit 64 à 1518 octets hors préambule. »
- **Diagnostic** : **Rigoureuse et identique**.

### Définition 3 — Mémoires d'un équipement Cisco IOS
- **Source PDF** : `COURS CCNA1_CDP_PROF AHOULOUMI.txt#PAGE 112` : « RAM : contient `running-config` (volatile) ; NVRAM : contient `startup-config` (non volatile) ; Flash : contient l'image du système IOS ; ROM : contient le programme d'amorçage Bootstrap/POST. »
- **Site web** : `b1-ccna1/chapitres/chapitre5.html:L90` : « RAM (`running-config`, volatile), NVRAM (`startup-config`, conservée à l'extinction), Flash (image binaire IOS), ROM (Bootstrap et POST). »
- **Diagnostic** : **Identique mot pour mot sur le fond**.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Le polycopié source contient des ateliers de configuration Cisco IOS (`enable`, `configure terminal`, `enable secret`, `line console 0`, `copy running-config startup-config` à `#PAGE 118-142`), mais sur le site les 18 exercices sont des grilles statiques `data-language='analyse'` qui divulguent les 3 cas de test.
