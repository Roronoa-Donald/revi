# Fidélité aux Sources (Mission A) — `b1-robotique` (Club de robotique · B1)

- **Cours** : `b1-robotique` (Club de robotique) — Niveau **B1** (6 chapitres)
- **Documents sources rattachés (3 fichiers, 36 pages)** :
- `textes/B1/CLUB DE ROBOTIQUE/logique.txt` (9 pages, statut `ok`)
- `textes/B1/CLUB DE ROBOTIQUE/seance_tp_club_robotique_v2.txt` (7 pages, statut `ok`)
- `textes/B1/CLUB DE ROBOTIQUE/ARDUINO_Exercices d'Applications.txt` (20 pages, statut `ocr`)
- **Niveau de confiance** : **Moyen** (1 PDF scanné OCR de 20 p. ouvert dans `scans_originaux/` + 2 PDF propres de 9 p. et 7 p.)

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Décalage de langage entre les sources (C/C++ Arduino) et les exercices du site (Python puis grilles `analyse`)**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B1/CLUB DE ROBOTIQUE/logique.txt#PAGE 1` : *Informatique (presque) débranchée                                               *
- `textes/B1/CLUB DE ROBOTIQUE/logique.txt#PAGE 2` : *Algèbre booléenne et circuits logiques*
- `textes/B1/CLUB DE ROBOTIQUE/logique.txt#PAGE 3` : *Informatique (presque) débranchée                                               *
- `textes/B1/CLUB DE ROBOTIQUE/logique.txt#PAGE 4` : *Algèbre booléenne et circuits logiques*
- `textes/B1/CLUB DE ROBOTIQUE/logique.txt#PAGE 5` : *Informatique (presque) débranchée                                               *
- `textes/B1/CLUB DE ROBOTIQUE/logique.txt#PAGE 6` : *Algèbre booléenne et circuits logiques*
- `textes/B1/CLUB DE ROBOTIQUE/seance_tp_club_robotique_v2.txt#PAGE 1` : *■ CLUB ROBOTIQUE & ÉLECTRONIQUE*
- `textes/B1/CLUB DE ROBOTIQUE/seance_tp_club_robotique_v2.txt#PAGE 2` : *Club Robotique & Electronique — TP à distance                                   *
- **Progression des chapitres sur le site** :
- `b1-robotique/chapitres/chapitre1.html` : **Chapitre 1 — Premier contact : un programme, une carte** — 1. La boucle qui anime tout robot (`L80`), 2. La structure d’un programme (`L92`), 3. Calculs de bord (`L108`), 4. Mettre en forme un rapport (`L131`)
- `b1-robotique/chapitres/chapitre2.html` : **Chapitre 2 — Boucles et temporisations** — 1. Répéter exactement k fois (`L80`), 2. Réagir à une série et compter (`L93`), 3. Cadencer une séquence (`L110`), 4. Accorder le pluriel du bilan (`L124`)
- `b1-robotique/chapitres/chapitre3.html` : **Chapitre 3 — Conditions et fonctions** — 1. Une fonction qui répond vrai ou faux (`L80`), 2. Compter les deux branches (`L95`), 3. Tester la primalité (`L110`), 4. Classer des relevés par seuil (`L124`)
- `b1-robotique/chapitres/chapitre4.html` : **Chapitre 4 — Tableaux et algorithmes** — 1. Le tri à bulles, pas à pas (`L80`), 2. Compter les comparaisons (`L93`), 3. Structurer avec des dictionnaires (`L111`), 4. Chercher par dichotomie (`L126`)
- `b1-robotique/chapitres/chapitre5.html` : **Chapitre 5 — Portes logiques et chiffrement** — 1. Les cinq portes en Python (`L80`), 2. L’additionneur complet (`L96`), 3. Le chiffre de César (`L111`), 4. Études de cas & applications pratiques (`L133`)
- `b1-robotique/chapitres/chapitre6.html` : **Chapitre 6 — Capteurs, seuils et régulation** — 1. L’afficheur 7 segments comme table (`L80`), 2. Trois états, deux seuils (`L97`), 3. Afficher sans zéros inutiles (`L109`), 4. Le bilan : minimum et moyenne entière (`L117`)

## 2. Couverture (Lacunes & Ajouts)
- Les sources (`seance_tp_club_robotique_v2.txt#PAGE 1-7` et `scans_originaux/B1__CLUB DE ROBOTIQUE__ARDUINO_Exercices d'Applications.pdf` p. 1-20) enseignent le câblage Arduino et le langage **C/C++ Arduino (`setup()`, `loop()`, `pinMode()`, `digitalWrite()`)**, tandis que `b1-robotique/chapitres/chapitre1.html:L124` introduit des expressions génératrices Python (`(int(x) for x in donnees_capteur.split())`) absentes des sources.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — quelle sortie
- **Source PDF** : `textes/B1/CLUB DE ROBOTIQUE/logique.txt#PAGE 4` : « spond à la valeur de S pour laquelle A=1, B=0, C=0 et D=1. 5.3.2. Méthode de recherche de l'équation de la table de vérité • »
- **Site web** : `b1-robotique/chapitres/chapitre1.html:L89` : « **quelle sortie** : produis-je. Un programme qui affiche avant de lire ne peut pas marcher, quel que soit le reste du code. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — ligne par ligne, de haut en bas
- **Source PDF** : `textes/B1/CLUB DE ROBOTIQUE/logique.txt#PAGE 4` : « 1 binaire du numéro de la ligne. 8 1 0 0 0 1 S'il y a n entrées, il 9 »
- **Site web** : `b1-robotique/chapitres/chapitre1.html:L94` : « **ligne par ligne, de haut en bas** : . Chaque ligne est une instruction achevée : une lecture, un calcul, un affichage. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — dans l’ordre écrit
- **Source PDF** : `textes/B1/CLUB DE ROBOTIQUE/logique.txt#PAGE 1` : « informatique et dans la conception des circuits électroniques. On appelle B l'ensemble constitué de deux éléments appelés valeurs de vérité {FAUX, »
- **Site web** : `b1-robotique/chapitres/chapitre1.html:L105` : « **dans l’ordre écrit** : . Si l’énoncé attend « nom puis âge », lire l’âge d’abord produit un programme faux, même si chaque ligne est juste. Relire l’ordre des entrées avant d’écrire l »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
