# Registre des Lacunes de Cours et Écarts Didactiques

Ce document consigne les notions formellement testées dans les devoirs, examens et travaux pratiques de l'établissement, mais qui présentaient une couverture insuffisante ou absente dans les chapitres initiaux de la plateforme.

---

## 1. Droit de l'Informatique : Cadre Juridique Togolais Spécifique
- **Notion testée dans les sources** : Questions d'examen n°3 et n°7 dans `droitb2/droitb2/QUESTIONS_DROIT INFORMATIQUE.pdf`.
- **Écart constaté** :
  - Le support d'examen mentionne de manière erronée « *Le RGPD au Togo est entrée en vigueur en octobre 2018* ».
  - En réalité, le Togo a adopté sa propre législation nationale souveraine : la **Loi n° 2019-014 du 29 octobre 2019 relative à la protection des données à caractère personnel**, créant l'Instance de Protection des Données à Caractère Personnel (IPDCP). Le RGPD est un règlement communautaire européen (UE 2016/679 entré en application le 25 mai 2018), inapplicable directement sur le territoire togolais sauf pour les entreprises togolaises traitant des données de résidents européens (extraterritorialité de l'article 3).
- **Action de mise à niveau du cours** :
  - Ajouter dans le chapitre 2 du cours de Droit une section dédiée distinguant le RGPD européen (25 mai 2018) et la Loi togolaise n° 2019-014 (29 octobre 2019), en détaillant les compétences de l'IPDCP et les sanctions locales.

---

## 2. Cybersécurité : Détection d'Intrusions par Règles Snort
- **Notion testée dans les sources** : Travaux pratiques complets dans `Cyber securite B2/TP_Snort.pdf` (pages 1 à 4).
- **Écart constaté** :
  - Le cours initial de cybersécurité traitait des NIDS de façon conceptuelle, sans expliciter la syntaxe obligatoire de rédaction d'une règle Snort (`action protocole src_ip src_port -> dst_ip dst_port (options)`).
- **Action de mise à niveau du cours** :
  - Enrichir le chapitre 4 de Cybersécurité avec la décomposition d'une signature Snort, la signification des directives d'options (`msg`, `content`, `nocase`, `sid`, `rev`) et la commande de lancement console (`snort -u snort -c ... -A console`).

---

## 3. Assembleur : Convention d'Appel System V AMD64 ABI
- **Notion testée dans les sources** : Examen Final 2024-2025, Exercice 4 de pratique (`EF_Architecture_Programmation_Assembleur_2024_2025_CdP_B2A_B_ (1).pdf:6`).
- **Écart constaté** :
  - L'examen exige de passer des arguments à une sous-routine via les registres standard sous Linux 64 bits (`RDI`, `RSI`, `RDX`, `RCX`, `R8`, `R9`) et de renvoyer le résultat dans `RAX`. Le cours se concentrait sur les sauts locaux sans formaliser la convention ABI standard.
- **Action de mise à niveau du cours** :
  - Formaliser dans le chapitre 4 d'Assembleur le tableau des registres dédiés aux arguments de fonctions selon la convention System V ABI.

---

## 4. Système Linux : Découpage Réel et Commandes d'Administration
- **Notion testée dans les sources** : Supports du Dr KPEGOUNI (`Chap.4_Commandes_de_Base_Unix.pdf` et `TP2_Droit_Acces_Fichier_Unix.pdf`).
- **Écart constaté** :
  - Les exercices initiaux de la plateforme imposaient la programmation d'algorithmes en Bash (boucles `for`, lectures `read -r`) dès le chapitre 1, alors que le professeur enseigne la manipulation directe des utilitaires Unix (`pwd`, `ls -la`, `mkdir -p`, `chmod`, `chown`).
- **Action de mise à niveau du cours** :
  - Suppression de tout scripting algorithmique prématuré en chapitres 1 à 5. Alignement direct des exercices sur la saisie de commandes système réelles validées par expressions régulières sans exécution de code.

---

## 5. Recherche Opérationnelle : Ordonnancement sous Contrainte de Crashing
- **Notion testée dans les sources** : Examen Final B2-IT (`EXamen B2-IT.pdf:1-2`).
- **Écart constaté** :
  - La modélisation de la réduction des durées de tâches (crashing) avec surcoûts journaliers par programmation linéaire n'était pas abordée dans les exemples du chapitre 6 (qui se limitaient au PERT classique).
- **Action de mise à niveau du cours** :
  - Introduire dans le chapitre 6 de RO la formulation linéaire du compromis durée-coût : variables de réduction $y_i \le \text{MaxReduction}_i$ et contraintes de liaison temporelle $t_j - t_i \ge d_i - y_i$.
