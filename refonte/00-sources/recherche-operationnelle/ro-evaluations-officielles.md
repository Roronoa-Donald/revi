# Fiche Source : Recherche Opérationnelle — Devoirs Surveillés et Examens Finaux

- **Fichiers sources** :
  - `RD-RO/ref/DS-B2A-IT.pdf` (1 page)
  - `RD-RO/ref/DS-B2B-IT.pdf` (1 page)
  - `RD-RO/ref/Examen Final RO.pdf` (2 pages, Session 2024-2025, 3h)
  - `RD-RO/ref/EXamen B2-IT.pdf` (2 pages, 1h30)
  - `RD-RO/ref/exam-RO-DA-SRI.pdf` (2 pages)
  - `RD-RO/RO-10-Exercices-Modelisation.pdf` (16 pages)
  - `RD-RO/ref/Algo simplexe.pdf` (14 pages)
- **Enseignant** : Équipe pédagogique Mathématiques & Recherche Opérationnelle CdP
- **Niveau / Classe** : Bachelor 2 (B2 IT A & B, DA, SRI)
- **Année Académique** : 2023-2024 & 2024-2025
- **Chapitres couverts** : Modélisation, Forme standard, Simplexe, Dualité, Ordonnancement

## Liste des Exercices et Notions Testées

### Devoir Surveillé B2A & B2B (`DS-B2A-IT.pdf:1` & `DS-B2B-IT.pdf:1`)
- **Partie A — Questions de cours (6 pts)** :
  1. Définition de la programmation linéaire (modèle d'optimisation d'un objectif linéaire sous contraintes linéaires).
  2. Objectif de la programmation linéaire (meilleur arbitrage sous ressources rares).
  3. 4 domaines d'application (production, transport, découpe, gestion financière).
- **Partie B — Problème d'atelier de fabrication (14 pts)** :
  - Deux pièces $P_1$ et $P_2$, deux machines $M_1$ et $M_2$.
  - Temps de fabrication : $M_1$ requiert 3h pour $P_1$ et 4h pour $P_2$ ; $M_2$ requiert 2h pour $P_1$ et 1h pour $P_2$.
  - Capacités hebdomadaires des machines et marges unitaires.
  - Identification des variables $x_1, x_2$, fonction $\max Z = c_1 x_1 + c_2 x_2$, contraintes $3x_1 + 4x_2 \le H_1$, $2x_1 + x_2 \le H_2$ et non-négativité $x_1, x_2 \ge 0$.
- **Niveau** : N1/N2.
- **Type de réponse attendue** : Modèle mathématique formel.

### Examen Final RO 2024-2025 (3 Heures) (`Examen Final RO.pdf:1-2`)
- **Partie A — Questions de cours et QCM technique** :
  - Définitions : programmation linéaire, solution admissible, variable hors la base.
  - QCM 3 (p.1) : Pour un modèle à $n$ activités et $m$ contraintes, une solution de base admet au moins $n$ variables hors base et au plus $m$ variables dans la base.
  - QCM 4 (p.1) : Solution optimale = n-uplets réalisant le meilleur programme d'activités.
  - QCM 5 (p.1) : Variable d'écart associée à une contrainte $\ge$ est soustraite (surplus).
  - QCM 6 (p.1-2) : Test d'optimalité du Simplexe = vérification du critère des coûts réduits.
- **Partie B — Algorithme du Simplexe et Pivotage** :
  - Mise sous forme standard avec variables d'écart.
  - Choix de la variable entrante (coût réduit le plus favorable) et variable sortante (règle du ratio minimum positif $b_i / a_{ik}$).
  - Opérations élémentaires de pivot de Gauss pour recalculer la matrice et mise à jour de la valeur de la fonction objectif.
- **Partie C — Dualité** :
  - Construction du problème dual : correspondance primal/dual (minimisation $\leftrightarrow$ maximisation, contraintes $\leftrightarrow$ variables duales $y_i$).
- **Niveau** : N2/N3.
- **Type de réponse attendue** : Tableaux du simplexe successifs, modèle dual.

### Examen Final Ordonnancement Informatique (`EXamen B2-IT.pdf:1-2`)
- **Problème de planification et crashing (9 tâches)** :
  - Tâches interdépendantes $A$ à $I$ avec durées nominales et durées minimales accélérées.
  - Surcoût par jour de réduction.
  - Questions : durée minimale, faisabilité en moins de 8 jours, coût minimal pour 10 jours max, durée minimale avec surcoût $\le 15$.
- **Notions testées** : Modélisation linéaire de chemin critique et compromis durée-coût.
- **Niveau** : N3.
- **Type de réponse attendue** : Modèle mathématique d'ordonnancement.
