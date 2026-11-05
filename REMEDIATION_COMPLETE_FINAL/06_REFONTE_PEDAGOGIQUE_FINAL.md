# Livrable 06 — Refonte Pédagogique et Alignement Curriculaire

> Répertoire de livraison : `REMEDIATION_COMPLETE_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre théorique : Alignement constructif (Biggs, 1996), Taxonomie révisée de Bloom (Anderson & Krathwohl, 2001), Évaluation basée sur des preuves (ECD, Mislevy et al., 2003).  
> Date de certification : 3 novembre 2026

---

## 1. Diagnostic Pédagogique Initial et Objectifs de la Refonte

L'audit pédagogique indépendant a démontré que de nombreux exercices historiques du projet souffraient d'un défaut fondamental d'**alignement constructif** :
- **Décalage d'activité cognitive** : alors que le cours enseignait des concepts de gouvernance, d'architecture système ou d'analyse mathématique, les exercices imposaient quasi-exclusivement d'écrire des scripts lisant des lignes sur `stdin` et affichant des chaînes au millimètre près.
- **Exemple paradigmatique (Linux B1)** : au chapitre 1, un étudiant débutant qui découvrait à peine l'arborescence de fichiers et la commande `ls` se voyait demander un script Bash complet avec boucle `for ((i=0; i<n; i++))`, tableau associatif et structure `case...esac`.
- **Exemple paradigmatique (Recherche Opérationnelle B2)** : au lieu de formuler des programmes linéaires ou d'exécuter des pivots de simplexe, l'étudiant devait reproduire des affichages textuels arbitraires issus d'un gabarit générique `[Cas 1]`.

La refonte pédagogique a pour objectif de restaurer l'authenticité des compétences professionnelles et académiques en s'appuyant directement sur les **supports réels de cours, de travaux dirigés et d'examens** présents dans le référentiel d'origine.

---

## 2. Pôle Pilote 1 — Administration Système Linux B1

### 2.1. Supports de Cours Réels Utilisés
- Cours de base Linux B1 : commandes fondamentales, arborescence FHS, gestion des droits POSIX, manipulation de flux et redirections.
- Travaux pratiques réels : navigation, recherche de fichiers, création d'utilisateurs, gestion de processus et archivage.

### 2.2. Transformation Didactique Appliquée
Les 18 exercices ont été intégralement convertis du format script algorithmique vers le format **Défi de Commande Shell Déterministe (`command_challenge`)** :

```
AVANT (Script artificiel)                       APRÈS (Défi de commande réaliste)
─────────────────────────────────────────────   ─────────────────────────────────────────────
"Écrivez un script Bash qui lit N chemins       "Donnez la commande exacte permettant
sur stdin et affiche le nombre de fichiers      d'afficher tous les fichiers du dossier
se terminant par .log"                          courant, y compris cachés, avec détails"
  -> read -r chemin                               -> ls -la (ou ls -al, ls -l -a)
  -> if [[ "$chemin" =~ \.log$ ]]                 -> Validé par normalisation déterministe
  -> syntaxe lourde inadaptée en Semaine 1        -> Compétence opérationnelle immédiate
```

### 2.3. Répertoire des 18 Fiches de Conception Linux B1 (`refonte/b1-linux/`)
- Chapitre 1 : Navigation et exploration (`pwd`, `ls -la`, `cd`).
- Chapitre 2 : Manipulation de fichiers et dossiers (`mkdir -p`, `cp -r`, `rm`).
- Chapitre 3 : Visualisation et concaténation (`cat`, `less`, `head -n`, `tail -f`).
- Chapitre 4 : Gestion des permissions et droits (`chmod 755`, `chown`).
- Chapitre 5 : Redirections et tubes (`|`, `>`, `>>`, `grep`).
- Chapitre 6 : Archivage et compression (`tar -czvf`, `tar -xzvf`).

---

## 3. Pôle Pilote 2 — Probabilités & Statistique B2

### 3.1. Supports d'Origine Réels Utilisés
- Dossiers de Travaux Dirigés (TD 1 à TD 6).
- Annales d'examens et devoirs surveillés réels (Session 2024).

### 3.2. Répartition Disciplinaire et Progression Cognitive
La banque d'exercices de Probabilités B2 a été restructurée en 18 fiches fidèles aux séries d'exercices universitaires :

1. **Dénombrement et Combinatoire (TD 1)** :
   - Calcul de permutations $n!$, arrangements $A_n^k = \frac{n!}{(n-k)!}$ et combinaisons $\binom{n}{k} = \frac{n!}{k!(n-k)!}$.
   - Tirages avec ou sans remise, mains de poker, urnes de Polya.
2. **Probabilités Conditionnelles et Formule de Bayes (TD 2)** :
   - Formule des probabilités totales : $P(A) = \sum P(A | B_i) P(B_i)$.
   - Théorème de Bayes appliqué aux tests de diagnostic et faux positifs.
3. **Variables Aléatoires Discrètes (TD 3 & TD 4)** :
   - Loi binomiale $\mathcal{B}(n, p)$, loi de Poisson $\mathcal{P}(\lambda)$, loi géométrique.
   - Espérance mathématique $E(X)$, variance $V(X)$ et écart-type $\sigma(X)$.
4. **Variables Aléatoires Continues (TD 5 & TD 6)** :
   - Densité de probabilité $f(x)$, fonction de répartition $F(x) = \int_{-\infty}^x f(t)dt$.
   - Loi exponentielle (temps de survie, durée sans mémoire) et loi normale $\mathcal{N}(\mu, \sigma^2)$.

### 3.3. Tolérances et Oracles Numériques
- Acceptation des fractions irréductibles (`1/4`, `3/8`) et des valeurs décimales (`0.25`, `0.375`).
- Tolérance numérique calibrée à $10^{-4}$ pour absorber les arrondis intermédiaires sur les lois normales et exponentielles.

---

## 4. Pôle Pilote 3 — Recherche Opérationnelle B2

### 4.1. Supports d'Origine Réels Utilisés
- Devoir Surveillé B2A/B2B : Problème canonique de fabrication d'atelier (Produits P1/P2 sur Machines M1/M2).
- Polycopié de cours : `Algo simplexe.pdf`.
- Examen Final : `EXamen B2-IT.pdf` (Dualité, prix d'ombre, ordonnancement et crashing).

### 4.2. Les 4 Piliers Fondamentaux de la Modélisation RO

#### 4.2.1. Modélisation de Programmes Linéaires (Atelier P1/P2)
- Définition explicite des variables de décision ($x_1$ : nombre de produits P1, $x_2$ : nombre de produits P2).
- Fonction objectif de maximisation du bénéfice : $\max Z = c_1 x_1 + c_2 x_2$.
- Contraintes de capacités machines :
  $$\begin{cases} a_{11} x_1 + a_{12} x_2 \le H_1 \\ a_{21} x_1 + a_{22} x_2 \le H_2 \\ x_1, x_2 \ge 0 \end{cases}$$

#### 4.2.2. Algorithme du Simplexe et Tableaux de Dictionnaires
- Introduction des variables d'écart $e_1, e_2 \ge 0$.
- Choix de la variable entrante (plus grand coefficient positif dans $Z$).
- Règle du ratio minimum pour la variable sortante.
- Calcul précis de la solution optimale au sommet du polyèdre.

#### 4.2.3. Théorie de la Dualité et Prix d'Ombre
- Écriture du problème dual associé :
  $$\min W = H_1 y_1 + H_2 y_2 \quad \text{s.c.} \quad A^T y \ge c, \quad y \ge 0$$
- Théorème de la dualité forte : $Z^* = W^*$.
- Interprétation économique des prix d'ombre ($y_i^*$) : valeur marginale d'une heure machine supplémentaire.

#### 4.2.4. Ordonnancement de Projet et Crashing (CPM / PERT)
- Identification du graphe de dépendances et calcul des dates au plus tôt ($ES$) et au plus tard ($LF$).
- Détermination du chemin critique et des marges libres et totales.
- Compression de planning (*crashing*) : réduction de la durée du projet au moindre coût marginal unitaire par jour accéléré.

---

## 5. Synthèse des Bénéfices pour l'Étudiant

| Dimension | Ancien Modèle | Nouveau Modèle Remédié |
| :--- | :--- | :--- |
| **Pertinence Métier** | Remplissage de templates artificiels | Manipulation d'outils réels et modélisation formelle |
| **Frustration Technique** | Échecs dus à un espace ou une invite oubliée | Validation tolérante aux variantes syntaxiques acceptables |
| **Progression Bloom** | Restitution superficielle (Niveau 1) | Application, analyse et résolution de problèmes complexes (Niveaux 3 & 4) |
| **Cohérence avec les Examens** | Rupture totale entre plateforme et devoirs sur table | Continuité parfaite avec les annales et TD surveillés réels |
