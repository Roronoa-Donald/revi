# Matrice d'Alignement Didactique : Sources Académiques vs Chapitres de la Plateforme

Cette matrice croise rigoureusement les exercices et devoirs réels issus des archives d'examen (`/home/rd/Desktop/proba`) avec le découpage en 6 chapitres de chaque cours de la plateforme.

---

## 1. Cours Pilotes Prioritaires

### A. Linux B1 (`b1-linux`) — Supports : Dr Abasse KPEGOUNI
| Chapitre du Site | Intitulé du Chapitre | Exercices / Documents Sources Correspondants | Notions Réelles Enseignées | Statut d'Alignement |
| :--- | :--- | :--- | :--- | :--- |
| **Chapitre 1** | L'arborescence et le shell | `Chap.1_Systeme_Linux.pdf:1-21`, `Chap.4_Commandes_de_Base_Unix.pdf:3-5` | Hiérarchie FHS (`/`, `/bin`, `/etc`, `/home`), commandes `pwd`, `ls` simple, `cd` racine/home. | **Couvert** (abandon du Bash au profit de la commande). |
| **Chapitre 2** | Navigation et chemins | `Chap.2_Systeme_Fichier.pdf:1-16`, `Chap.4...:5` | Chemins absolus vs relatifs, `cd ..`, `cd ~`, `cd -`, listage détaillé `ls -l`, `ls -a`. | **Couvert**. |
| **Chapitre 3** | Manipulation de fichiers et dossiers | `Chap.4_Commandes_de_Base_Unix.pdf:6-7` | `mkdir`, `mkdir -p`, `rmdir`, `touch`, `cp`, `cp -r`, `mv`, `rm`, `rm -rf`. | **Couvert**. |
| **Chapitre 4** | Visualisation et recherche | `Chap.4_Commandes_de_Base_Unix.pdf:7-14` | `cat`, `head -n`, `tail -n`, `tail -f`, `grep`, `find -name`, redirection `>` et tube `\|`. | **Couvert**. |
| **Chapitre 5** | Utilisateurs et groupes | `Chap.5_Gestion_des_Utilisateurs_et_Groupe.pdf:1-8` | Fichier `/etc/passwd` (7 champs), `useradd`, `passwd`, `usermod -aG`, `userdel`, `groupadd`. | **Couvert**. |
| **Chapitre 6** | Droits d'accès et propriété | `TP2_Droit_Acces_Fichier_Unix.pdf:1` | `chmod` octal (`755`, `644`, `770`), `chmod` symbolique (`ug=rwx`, `o-r`), `chown`, `chgrp`, `-R`. | **Couvert**. |

---

### B. Probabilités B2 (`probabilites`) — Supports : Dr AGBOKOU & Examen 2024-2025
| Chapitre du Site | Intitulé du Chapitre | Exercices / Documents Sources Correspondants | Notions Réelles Enseignées | Statut d'Alignement |
| :--- | :--- | :--- | :--- | :--- |
| **Chapitre 1** | Dénombrement et combinaisons | `TD_1.pdf:1`, `TD_1-1.pdf:1` (Exercices 1 à 6) | Principe additif/multiplicatif, arrangements $A_n^p$, combinaisons $\binom{n}{p}$, multinomiaux, mains de cartes. | **Couvert** (exercices réels intégrés). |
| **Chapitre 2** | Espaces probabilisés et crible | `TD_1-2.pdf:1` (Exercices 7 à 9) | Événements, crible de Poincaré $P(A \cup B)$, permutations de blocs de livres, complémentaire. | **Couvert**. |
| **Chapitre 3** | Conditionnement et Bayes | `TD_1-2.pdf:1`, `TD_1-3.pdf:1` (Ex 10-14), `Recueil_Epreuves.pdf:1-3` (Ex 1-8) | Probabilités totales, théorème de Bayes (faux positifs, alcooltest, dépistage), indépendance stochastique. | **Couvert**. |
| **Chapitre 4** | Variables aléatoires discrètes | `TD_1-4.pdf:1`, `TD_1-5.pdf:1` (Exercices 15 à 23) | Lois discrètes, espérance, variance (Koenig), loi binomiale $\mathcal{B}(n, p)$, loi de Poisson $\mathcal{P}(\lambda)$. | **Couvert**. |
| **Chapitre 5** | Variables aléatoires continues | `TD_1-6.pdf:1` (Exercices 24 et 25), `Prépa_Cours_VAContinues.pdf` | Densité $f(x)$, constante de normalisation, fonction de répartition $F(x)$, loi normale $\mathcal{N}(\mu, \sigma^2)$. | **Couvert**. |
| **Chapitre 6** | Couples et lois conjointes | `TD_1-4.pdf:1` (Ex 18), `TD_1-5.pdf:1` (Ex 20-21) | Tableaux de lois conjointes $(X, Y)$, lois marginales, covariance, indépendance de couples. | **Couvert**. |

---

### C. Recherche Opérationnelle B2 (`RD-RO`) — Supports : DS B2A/B2B & Examen Final
| Chapitre du Site | Intitulé du Chapitre | Exercices / Documents Sources Correspondants | Notions Réelles Enseignées | Statut d'Alignement |
| :--- | :--- | :--- | :--- | :--- |
| **Chapitre 1** | Fondements et modélisation | `DS-B2A-IT.pdf:1`, `DS-B2B-IT.pdf:1`, `RO-10-Exercices.pdf:1-5` | Variables de décision, fonction objectif, contraintes d'atelier (pièces $P_1, P_2$ sur machines $M_1, M_2$). | **Couvert**. |
| **Chapitre 2** | Forme canonique et résolution graphique | `RO-Cours-Complet.pdf:7-12`, `RO-10-Exercices.pdf` | Droites de contraintes, région réalisable (polyèdre convexe), recherche du sommet optimal 2D. | **Couvert**. |
| **Chapitre 3** | Algorithme du Simplexe | `Algo simplexe.pdf:1-14`, `Examen Final RO.pdf:1-2` | Forme standard, variables d'écart, pivot de Gauss, critère d'entrée de Dantzig, ratio minimum de sortie. | **Couvert**. |
| **Chapitre 4** | Dualité et interprétation | `Examen Final RO.pdf:2`, `RO-Cours-Complet.pdf:15-18` | Passage au problème dual, variables duales (prix fictifs/ombres), théorèmes de dualité forte et écarts complémentaires. | **Couvert**. |
| **Chapitre 5** | Modèles avancés et transport | `RO-10-Exercices.pdf:6-14` | Problème de transport usines-entrepôts, modèles en variables entières/binaires (sac à dos 0-1). | **Couvert**. |
| **Chapitre 6** | Ordonnancement et crashing | `EXamen B2-IT.pdf:1-2` | Modélisation linéaire de chemin critique (9 tâches), réduction de durées (crashing) sous budget. | **Couvert**. |

---

## 2. Autres Matières Analysées pour les Vagues Suivantes

| Matière | Documents Sources Disponibles | Statut Global | Observation Didactique |
| :--- | :--- | :--- | :--- |
| **Assembleur B2** | `CC_2024_2025_CdP_B2A_.pdf`, `CC_B2B`, `EF 2024-2025`, `main.pdf` | **100% Couvert** | NASM x86_64 complet avec barèmes et corrigés officiels. |
| **Python B1** | `DST_2024_2025_CdP_B1A_.pdf`, `EF B1A_B`, `EF Rattrapage`, Quiz | **100% Couvert** | Syntaxe, structures de données, exceptions et débogage. |
| **Circuits & Archi B1** | `TD_1 Circuit log archi ordi 2025_AYIVI-T.pdf`, Fiche révision | **100% Couvert** | Von Neumann, conversions puissances de 2, portes logiques. |
| **Statistique Descr. B1** | `SERIES D'EXERCICES COLLEGE DE PARIS.pdf` (BOUWE Abalo) | **100% Couvert** | Tableaux, diagrammes, paramètres moyenne/médiane/variance. |
| **Français Pro B1** | `CC_B1_ IT (C).pdf`, Corrigé-type, Épreuve Rattrapage | **100% Couvert** | Style administratif, paronymes, registres de langue. |
| **Droit Informatique** | `QUESTIONS_DROIT INFORMATIQUE.pdf`, Textes de loi | **100% Couvert** | Données personnelles, RGPD, Loi togolaise 2019-014, contrats. |
| **Cybersécurité B2** | `Compréhension.pdf`, `TP_Snort.pdf`, `LAB firewall.pdf`, `WannaCry.pdf` | **90% Couvert** | Snort, pfSense, Nmap. (Note: 1 fichier sujet vide 0 octet). |
| **Java POO B2** | `Recueil_Epreuves_2024_2025.pdf:17-20` | **100% Couvert** | Projet bancaire complet (Client, Compte, Courant, Epargne). |
| **C# B2** | `Recueil_Epreuves_2024_2025.pdf:12-13` | **100% Couvert** | Parc informatique POO (Appareil, Ordinateur, Imprimante). |
| **PHP POO B2** | `Recueil_Epreuves_2024_2025.pdf:14-15`, `TP3.pdf` | **100% Couvert** | Bibliothèque POO (Livre, LivreElectronique, exceptions). |
| **VMware / Virtualisation**| `Recueil_Epreuves_2024_2025.pdf:9-11` | **100% Couvert** | Étude de cas Max (ESXi, vCenter, vMotion, Veeam, HA). |
| **UML B2** | `Recueil_Epreuves_2024_2025.pdf:16` | **100% Couvert** | Diagramme de classes académie, cas d'utilisation chevaux. |
