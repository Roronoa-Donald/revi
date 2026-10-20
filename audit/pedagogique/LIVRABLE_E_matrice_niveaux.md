# LIVRABLE E — MATRICE DES TROIS NIVEAUX & PROGRESSION DU CURRICULUM

## 1. Vue d'ensemble de la progression verticale (B1 → B2 → B3)

La plateforme est articulée autour de 3 cycles universitaires :
1. **Licence 1 (B1)** : Acquisition des fondamentaux informatiques (systèmes d'exploitation, architecture matérielle, algorithmique, programmation impérative C/Python/PHP, réseaux locaux de base, modélisation relationnelle Merise/SQL, mathématiques appliquées).
2. **Licence 2 (B2)** : Approfondissement orienté objet, génie logiciel et administration avancée (Java, C#, React, POO PHP, administration Linux et Windows Server, virtualisation, cybersécurité opérationnelle, probabilités et recherche opérationnelle).
3. **Licence 3 (B3)** : Spécialisation Réseaux, Systèmes et Cloud (architectures distribuées AWS/Azure/GCP, supervision Nagios, routage pfSense, pare-feu d'entreprise, téléphonie VoIP, cryptographie PKI, DevOps et méthodes agiles).

## 2. Analyse des continuités par filière

| Filière | Licence 1 (B1) | Licence 2 (B2) | Licence 3 (B3) | Évaluation de la progression |
|---|---|---|---|---|
| **Systèmes Linux** | `b1-linux` (Bases, commandes shell, fichiers, Debian) | `linux` (Administration système, utilisateurs, processus, systemd) | `b3-linux` (Noyau, compilation, automatisation, durcissement) | **Excellente** : continuité sans rupture, approfondissement réel. |
| **Systèmes Windows** | `b1-admin-windows` (Serveur 2012 R2, AD DS de base) | `rd_winserver` (Maintenance, sauvegarde, clustering HA) | `b3-windows-server` (Services avancés, PowerShell, sécurité) | **Bonne progression conceptuelle**, mais **obsolescence critique** de la version 2012 R2 en B1. |
| **Réseaux** | `b1-reseaux` + `b1-ccna1` (Modèle OSI, IPv4/IPv6, CIDR) | `ccna` (Routage dynamique, OSPF, VLANs, switching) | `b3-reseau-lan` + `b3-pfsense` + `b3-voip` (Interconnexion WAN, ToIP, filtrage) | **Très solide théoriquement** ; manque d'un émulateur dynamique (Packet Tracer/GNS3). |
| **Bases de données** | `b1-merise` + `b1-sql` (MCD, normalisation, SELECT/INSERT) | `sql` (Jointures complexes, sous-requêtes, intégrité) | `b3-sql` (Optimisation, indexation, procédures stockées, triggers) | **Cohérente** mais absence d'ateliers avec transactions réelles multi-utilisateurs. |
| **Développement** | `b1-algo` + `b1-python` + `b1-c-cpp` | `rd_java` + `csharp` + `react` + `php` | `b3-algo` (Graphes, complexité) + `b3-github` | **Rupture en B2 sur C#** (exercices écrits en Python !). |
| **Cybersécurité** | `b1-cyber` (Fondamentaux, hygiène cyber, menaces) | `Cyber securite B2` (Attaques réseau, Nmap, Snort, droit) | `b3-firewall` + `b3-cryptographie` + `b3-hacking` | **Excellente densité**, mais déficit d'ateliers offensifs conteneurisés en bac à sable. |

## 3. Redondances et ruptures identifiées

- **Redondance algorithmique** : `b1-algo` traite les structures séquentielles et tableaux ; `b3-algo` reprend de nombreuses définitions de base avant d'aborder la complexité asymptotique.
- **Rupture pratique sur C# (B2)** : Les compétences C# annoncées ne sont pas validées par du code C# mais par des scripts Python de manipulation textuelle.
- **Trou dans la raquette Bureautique/VBA** : Le cours `b1-vb-excel` est vide, laissant un vide pour l'automatisation bureautique des étudiants de B1.
