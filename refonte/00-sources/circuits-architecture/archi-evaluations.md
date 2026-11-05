# Fiche Source : Circuits Logiques et Architecture des Ordinateurs B1

- **Fichiers sources** :
  - `cours B1 IT/Circuit logique et architecture des ordinateurs/EXO CIRCUIT LOGIQUE/TD Circuit logique/TD_1 Circuit log archi ordi 2025_AYIVI-T.pdf` (3 pages)
  - `cours B1 IT/Circuit logique et architecture des ordinateurs/Fiche revision Architecture.pdf` (6 pages)
  - `cours B1 IT/Circuit logique et architecture des ordinateurs/TP  ATO-Démontage UC.pdf` (3 pages)
- **Enseignant** : AYIVI-TOGBASSA Georges
- **Niveau / Classe** : Bachelor 1 (B1 IT A & B)
- **Année Académique** : 2024-2025
- **Chapitres couverts** : Histoire et pionniers, Modèle de Von Neumann, Conversions d'unités de stockage, Composants d'un PC, Portes logiques et bases numériques

## Liste des Exercices et Notions Testées avec Pages

### Travaux Dirigés N°1 (`TD_1 Circuit log archi ordi 2025_AYIVI-T.pdf`)
- **Partie A — Questions fondamentales (p.1)** :
  1. Deux pionniers de l'informatique : Charles Babbage, Ada Lovelace, Alan Turing, John Von Neumann.
  2. Nature du premier programme : cartes perforées / câblage physique (ENIAC).
  3. Architecture de John Von Neumann : structure quadripartite (ALU, Unité de contrôle, Mémoire centrale partagée instructions/données, Entrées/Sorties reliées par des bus).
  4. Différence fondamentale entre Windows et Linux (noyau propriétaire vs noyau libre monolithique modulaire, gestion des droits multi-utilisateurs native).
  5. Différence entre SE mono-tâche et multi-tâche (partage de temps CPU).
  6. Définition du quantum de temps processeur (tranche temporelle allouée par l'ordonnateur).
- **Partie B — Conversions des unités de stockage (p.1)** :
  - $1 \text{ Mo} = 1024 \text{ Ko}$ (en puissances de 2) ou $1000 \text{ Ko}$ (en décimal).
  - $5 \text{ Go} = 5 \times 1024 \text{ Mo} = 5120 \text{ Mo}$.
  - $10 \text{ To} = 10 \times 1024 \text{ Go} = 10240 \text{ Go}$.
- **Partie E — Dimensionnement et Optimisation de stockage (p.2-3)** :
  - Base de données générant 5 Go/jour : estimation sur 1 mois ($5 \times 30 = 150 \text{ Go}$) et sur 1 an ($5 \times 365 = 1825 \text{ Go} \approx 1.8 \text{ To}$).

### Fiche de Révision Architecture & Portes Logiques (`Fiche revision Architecture.pdf`)
- **Partie Composants matériels (p.1-2)** :
  - Définition et rôles de 20 composants : CPU (calculs et exécution), Carte mère (interconnexion), RAM (mémoire vive volatile), Disque dur / SSD (stockage permanent non volatile), Carte graphique GPU, Bloc d'alimentation, Ventilateurs / Ventirad, BIOS/UEFI, Chipset.
  - Hiérarchie des mémoires selon le temps d'accès : Registres CPU < Cache L1/L2/L3 < RAM < Disques SSD NVMe < HDD (p.5).
- **Partie Logique binaire et Portes (p.3)** :
  - Portes logiques fondamentales : ET (AND), OU (OR), NON (NOT), NON-ET (NAND), NON-OU (NOR), OU-Exclusif (XOR).
  - Équation booléenne de la porte XOR : $S = A \oplus B = \bar{A}B + A\bar{B}$.
- **Partie Numération et Changement de base (p.6)** :
  - Conversion binaire vers hexadécimal : groupement par 4 bits depuis la droite.
  - Conversion hexadécimal vers octal : passage par le binaire intermédiaire.
