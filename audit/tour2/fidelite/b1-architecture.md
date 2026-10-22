# Fidélité aux Sources (Mission A) — `b1-architecture` (Circuit logique & architecture des ordinateurs · B1)

- **Cours** : `b1-architecture` (Circuit logique & architecture des ordinateurs) — Niveau **B1** (6 chapitres)
- **Documents sources rattachés (5 fichiers, 146 pages)** :
- `textes/B1/Circuit logique et architecture des ordinateurs/Support cours_Circuit log Archi_B1_Ayivi Togbassa_CPS_24.txt` (110 pages, statut `ok`)
- `textes/B1/Circuit logique et architecture des ordinateurs/Fiche revision Architecture.txt` (6 pages, statut `ok`)
- `textes/B1/Circuit logique et architecture des ordinateurs/TD_1 Circuit log archi ordi 2025_AYIVI-T.txt` (3 pages, statut `ok`)
- `textes/B1/Circuit logique et architecture des ordinateurs/TP  ATO-Démontage UC.txt` (3 pages, statut `ok`)
- `textes/B1/Circuit logique et architecture des ordinateurs/RAPPORT DE TP-CIRCUIT LOGIQUE ET ARCHITECTURE DES ORDINATEURS.txt` (24 pages, statut `ok`)
- **Niveau de confiance** : **Élevé (Support cours_Circuit log Archi_B1_Ayivi Togbassa_CPS_24.txt [110 p.] + TD_1 [3 p.] + TP Démontage UC [3 p.] + Fiche révision [6 p.], statut ok)**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Verdict sur l'ordre** : **Inversion majeure entre les deux parties du cours source (Architecture matérielle placée au Ch. 6 sur le site au lieu des Ch. 1-2 dans la source)**
- **Ordre dans la source (`Support cours_Circuit log Archi_B1_Ayivi Togbassa_CPS_24.txt#PAGE 3-110`)** : Le support de G. Ayivi-Togbassa traite d'abord **toute l'architecture matérielle de l'ordinateur** : Généralités & histoire (`#PAGE 3-15`), Architecture de Von Neumann, CPU (UAL, Unité de commande, registres), mémoires (RAM, ROM, Cache), bus, carte mère, chipset, BIOS/UEFI et périphériques (`#PAGE 16-58`), PUIS dans sa seconde moitié les **systèmes de numération (binaire, octal, hexadécimal, complément à 2)** (`#PAGE 59-78`) et enfin l'**algèbre de Boole, les portes logiques, Karnaugh et les circuits séquentiels (bascules RS, D, JK, compteurs)** (`#PAGE 79-110`).
- **Ordre sur le site (`b1-architecture/chapitres/chapitre1..6.html`)** : Le site commence par les Généralités (Ch. 1), bascule immédiatement sur la numération (Ch. 2), les nombres signés (Ch. 3), les circuits combinatoires (Ch. 4) et séquentiels (Ch. 5), et **rejette l'architecture de Von Neumann, le CPU, la RAM et les périphériques au tout dernier chapitre (Ch. 6, `chapitre6.html:L56-L130`)** ! Conséquence (`D2`) : le Ch. 1 (`chapitre1.html:L88-L115`) parle de CPU, RAM, SSD et bus alors que leur fonctionnement architectural (Von Neumann) n'est expliqué qu'au Ch. 6.

## 2. Couverture (Lacunes & Ajouts)
- **Couverture** : Très complète sur les 110 pages du support source et la fiche `TD_1 Circuit log archi ordi 2025_AYIVI-T.txt#PAGE 1-3` (calcul de débit, temps de transfert, capacité mémoire).
- **Anomalie d'atelier (`D6 / D8`)** : `b1-architecture/atelier.html:L94` mentionne encore `la notation 2#du-bash` héritée de l'ancien script Bash alors que les exercices du cours ont été convertis en grilles `analyse`.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Ordinateur
- **Source PDF** : `textes/B1/Circuit logique et architecture des ordinateurs/Support cours_Circuit log Archi_B1_Ayivi Togbassa_CPS_24.txt#PAGE 3` : « Un ordinateur est une machine électronique capable de traiter des informations et d'exécuter des instructions programmées pour accomplir une variété de tâches. »
- **Site web** : `b1-architecture/chapitres/chapitre1.html:L62` : « Un ordinateur est une machine électronique programmable capable de recevoir, stocker, traiter et restituer des informations selon une suite d'instructions. »
- **Diagnostic** : **Fidèle et complète**.

### Définition 2 — Complément à 2
- **Source PDF** : `Support cours_Circuit log Archi_B1_Ayivi Togbassa_CPS_24.txt#PAGE 71` : « Le complément à 2 d'un nombre binaire s'obtient en inversant tous ses bits (complément à 1) puis en ajoutant 1 au bit de poids faible. »
- **Site web** : `b1-architecture/chapitres/chapitre3.html:L78` : « Pour obtenir le complément à 2 sur n bits : inverser chaque bit (0↔1) pour former le complément à 1, puis ajouter 1. »
- **Diagnostic** : **Exactement alignée**.

### Définition 3 — Bascule (Flip-Flop)
- **Source PDF** : `Support cours_Circuit log Archi_B1_Ayivi Togbassa_CPS_24.txt#PAGE 98` : « Contrairement aux circuits combinatoires, une bascule est un circuit séquentiel doté d'une mémoire élémentaire capable de conserver un bit d'état (0 ou 1). »
- **Site web** : `b1-architecture/chapitres/chapitre5.html:L60` : « Une bascule est la brique élémentaire de mémoire séquentielle : elle mémorise 1 bit d'état entre deux fronts d'horloge. »
- **Diagnostic** : **Fidèle et précise**.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Les études de cas du Ch. 1 (`chapitre1.html:L150-L280`) reprennent directement les calculs d'unités et de temps de téléchargement de `TD_1 Circuit log archi ordi 2025_AYIVI-T.txt#PAGE 1-2`, mais sous forme de grilles `analyse` divulguant les 3 cas de test dans l'éditeur.
