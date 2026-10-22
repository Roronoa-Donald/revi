# Fidélité aux Sources (Mission A) — `b3-firewall` (Firewall · B3)

- **Cours** : `b3-firewall` (Firewall) — Niveau **B3** (6 chapitres)
- **Documents sources rattachés (2 fichiers, 17 pages)** :
- `textes/B3/SEMESTRE I/firwall/Support de cours Module 1 .txt` (9 pages, statut `ok`)
- `textes/B3/SEMESTRE I/firwall/Support de cours Module 3 .txt` (8 pages, statut `ok`)
- **Niveau de confiance** : **Moyen** (Modules 1 [9 p.] et 3 [8 p.] lisibles, mais `Support de cours Module 2 .pdf` est corrompu / rempli de zéros)

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B3/SEMESTRE I/firwall/Support de cours Module 1 .txt#PAGE 1` : *Support de cours*
- `textes/B3/SEMESTRE I/firwall/Support de cours Module 1 .txt#PAGE 2` : *Support de cours : Firewall*
- `textes/B3/SEMESTRE I/firwall/Support de cours Module 1 .txt#PAGE 3` : *Support de cours : Firewall*
- `textes/B3/SEMESTRE I/firwall/Support de cours Module 1 .txt#PAGE 4` : *Support de cours : Firewall*
- `textes/B3/SEMESTRE I/firwall/Support de cours Module 1 .txt#PAGE 5` : *Support de cours : Firewall*
- `textes/B3/SEMESTRE I/firwall/Support de cours Module 1 .txt#PAGE 6` : *Support de cours : Firewall*
- `textes/B3/SEMESTRE I/firwall/Support de cours Module 3 .txt#PAGE 1` : *Support de cours*
- `textes/B3/SEMESTRE I/firwall/Support de cours Module 3 .txt#PAGE 2` : *Support de cours : Firewall*
- **Progression des chapitres sur le site** :
- `b3-firewall/chapitres/chapitre1.html` : **Chapitre 1 — Fondements, Évolution des Pare-feux & Filtrage Sans État (Stateless)** — 1. Périmètre de Sécurité & Cartographie des Zones de Confiance (`L82`), 2. Les Quatre Générations Technologiques de Pare-feux (`L103`), 3. Mécanique du Filtrage de Paquets Stateless & Anatomie des En-têtes (`L125`), 4. Études de cas & applications pratiques (`L151`)
- `b3-firewall/chapitres/chapitre2.html` : **Chapitre 2 — Filtrage Dynamique avec Suivi d’État (Stateful Inspection) & Table Conntrack** — 1. La Révolution du Stateful Inspection & la Machine à États TCP (`L82`), 2. Architecture & États Logiques de la Table Netfilter Conntrack (`L101`), 3. Gestion de la RAM, Timeouts & Détection de Scans Furtifs (`L116`), 4. Études de cas & applications pratiques (`L140`)
- `b3-firewall/chapitres/chapitre3.html` : **Chapitre 3 — Politiques de Sécurité, Listes de Contrôle d’Accès (ACL) & NAT** — 1. Le Moteur d’Évaluation des ACLs : Principe First-Match-Wins (`L82`), 2. Anomalies de Configuration d’ACLs : Rule Shadowing & Redondance (`L102`), 3. Translation d’Adresses Réseau : SNAT Masquerade & DNAT Port Forwarding (`L120`), 4. Études de cas & applications pratiques (`L137`)
- `b3-firewall/chapitres/chapitre4.html` : **Chapitre 4 — Architectures Réseau Sécurisées, Zone Démilitarisée (DMZ) & Bastions** — 1. Le Concept de Zone Démilitarisée (DMZ) & la Règle Cardinal de Sécurité (`L82`), 2. Topologies Pare-feux : Dual-Homed, Triple-Homed & Back-to-Back (`L97`), 3. Passerelles d’Administration Sécurisées : Bastions SSH & Jump Hosts (`L119`), 4. Études de cas & applications pratiques (`L141`)
- `b3-firewall/chapitres/chapitre5.html` : **Chapitre 5 — Filtrage Applicatif L7, UTM & Pare-feux Nouvelle Génération (NGFW)** — 1. L’Obsolescence du Filtrage de Port L4 & l’Approche App-ID / NGFW (`L82`), 2. Inspection SNI (Server Name Indication) & Filtrage Web Catégoriel (`L104`), 3. Deep Packet Inspection (DPI) & Protection Anti-DoS par Rate Limiting (`L125`), 4. Études de cas & applications pratiques (`L144`)
- `b3-firewall/chapitres/chapitre6.html` : **Chapitre 6 — Déploiement Linux Netfilter (iptables / nftables), Logs & Intégration SIEM** — 1. L’Architecture Netfilter du Noyau Linux : Tables, Chaînes & Hooks (`L82`), 2. Comparaison Pratique : iptables (Hérité) vs nftables (Moderne) (`L107`), 3. Analyse des Journaux (Syslog) & Réponse Active SIEM / Fail2ban (`L123`), 4. Études de cas & applications pratiques (`L140`)

## 2. Couverture (Lacunes & Ajouts)
- Le Module 1 (`Support de cours Module 1 .txt#PAGE 1-9`) couvre les Ch. 1–2 (Architecture et filtrage stateless/stateful) et le Module 3 (`Support de cours Module 3 .txt#PAGE 1-8`) couvre les Ch. 5–6 (VPN, IDS/IPS, gouvernance), tandis que les **Ch. 3 et 4 du site (NAT/PAT et DPI/WAF)** correspondent au **Module 2 corrompu** et ne peuvent donc pas être vérifiés contre la source.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Liste de Contrôle d’Accès (ACL)
- **Source PDF** : `textes/B3/SEMESTRE I/firwall/Support de cours Module 3 .txt#PAGE 4` : « pare-feu. Nous aborderons les listes de contrôle d’accès (ACLs), le filtrage par adresse IP et ports, le filtrage applicatif (couche 7), l’inspection approfondie des paquets (DPI) et la »
- **Site web** : `b3-firewall/chapitres/chapitre3.html:L84` : « **Liste de Contrôle d’Accès (ACL)** : est une suite ordonnée de critères de filtrage évaluant chaque flux entrant ou sortant : »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — spécifique
- **Source PDF** : `textes/B3/SEMESTRE I/firwall/Support de cours Module 3 .txt#PAGE 5` : « er ou bloquer des adresses IP spécifiques. Exemple sous iptables : Bloque tout le trafic venant de 192.168.1.100. Filtrage par Port Les firewalls filtrent le trafic selon les ports TCP/U »
- **Site web** : `b3-firewall/chapitres/chapitre3.html:L117` : « **spécifique** : (hôte unique, port précis) vers la plus »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — première règle qui correspond
- **Source PDF** : `textes/B3/SEMESTRE I/firwall/Support de cours Module 1 .txt#PAGE 7` : « ion  Un firewall est la première ligne de défense contre les cybermenaces.  Il est souvent combiné avec un IDS/IPS pour détecter et bloquer les attaques avancées.  Un pro »
- **Site web** : `b3-firewall/chapitres/chapitre3.html:L177` : « **première règle qui correspond** : au paquet détermine son sort ( »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
