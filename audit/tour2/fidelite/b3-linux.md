# Fidélité aux Sources (Mission A) — `b3-linux` (Linux Avancé · B3)

- **Cours** : `b3-linux` (Linux Avancé) — Niveau **B3** (6 chapitres)
- **Statut des sources PDF** : **Aucun PDF source dans `corpus-cours-revi.zip`**
- **Niveau de confiance (Mission A)** : **Nul (Aucun PDF source dans corpus-cours-revi.zip — Mission A impossible)**

## 1. Mission A — Fidélité aux sources
Conformément à la section 2 du prompt, ce cours ne disposant d'aucun support PDF dans l'archive `corpus-cours-revi.zip`, **la comparaison aux sources (Mission A) est impossible**. Seule la cohérence interne des 6 chapitres du site est vérifiée ci-dessous.

## 2. Vérification de la cohérence interne sur le site
- **Progression des 6 chapitres** :
  - `chapitres/chapitre1.html` : **Chapitre 1 — Noyau Linux, Pseudo-FS (/proc, /sys) & Appels Système** (1. Architecture du Noyau Linux, Anneaux de Privilèges & VFS, 2. Le Pseudo-Système de Fichiers /proc : Fenêtre sur la task_struct, 3. Espace d’Adressage Virtuel, Segments Mémoire & Protection W^X, 4. Interception et Profilage des Appels Système avec strace)
  - `chapitres/chapitre2.html` : **Chapitre 2 — Initialisation & Gestionnaire de Services Systemd Avancé** (1. La Séquence d’Initialisation Linux : De l’UEFI à Systemd (PID 1), 2. Architecture des Unités Systemd : Types d’Unités & Directives, 3. Ordonnancement, Graphes de Dépendances & Socket Activation, 4. Journalisation Centralisée avec systemd-journald & journalctl)
  - `chapitres/chapitre3.html` : **Chapitre 3 — Gestion Avancée du Stockage : LVM, RAID Logiciel & Inodes** (1. Architecture LVM : Des Disques Physiques aux Physical Extents, 2. Snapshots LVM Copy-on-Write (COW) & Sauvegardes à Chaud, 3. RAID Logiciel sous Linux avec mdadm : Niveaux 1, 5, 6 & Résilience, 4. Systèmes de Fichiers : Tables d’Inodes & Diagnostic de Saturation)
  - `chapitres/chapitre4.html` : **Chapitre 4 — Isolation & Conteneurisation Noyau : Namespaces & Cgroups v2** (1. Les Fondations des Conteneurs : Les Huit Namespaces du Noyau Linux, 2. Manipulation Bas Niveau : unshare, nsenter & clone, 3. Hiérarchie Unifiée Cgroups v2 : Quotas CPU & Mémoire, 4. L’OOM Killer & la Pondération /proc/[pid]/oom_score_adj)
  - `chapitres/chapitre5.html` : **Chapitre 5 — Réseau Avancé Linux : Namespaces, Bridges & Policy Routing** (1. Interfaces Virtuelles & Interconnexion de Namespaces (veth & bridge), 2. La Suite iproute2 : L’Outillage Moderne du Réseau Linux, 3. Routage par Politiques (PBR) & Tables de Routage Multiples, 4. Architecture de Résolution de Noms : NSSwitch (/etc/nsswitch.conf))
  - `chapitres/chapitre6.html` : **Chapitre 6 — Sécurité Avancée, Durcissement du Noyau, PAM & Auditing (auditd)** (1. Durcissement du Noyau Linux : Paramètres sysctl & Protections Mémoire, 2. Architecture PAM (Pluggable Authentication Modules) : Mécanique et Drapeaux, 3. Le Sous-Système d’Audit du Noyau : auditd, aureport & Traçabilité des Privilèges, 4. Bonnes Pratiques de Durcissement en Production & Standards CIS / ANSSI)
- **Principaux constats de cohérence interne** :
  - Langage des ateliers : `analyse`
  - En-tête de prérequis explicites : absent (`C3`).
  - Cohérence Objectifs / Exercices / QCM : voir `audit/tour2/02-verification-rapport.md` (points B1 à B10) et le plan de corrections par lots `audit/tour2/04-plan-corrections.md`.
