# Livrable 07 — Alignement Pédagogique et Couverture Curriculaire (Biggs & Webb)

> Répertoire d'audit : `AUDIT_SCIENTIFIQUE_QUALITE/`  
> Projet audité : `revi-cours-html`  
> Cadre d'évaluation : **John Biggs (Constructive Alignment, 1996)**, **Norman L. Webb (Depth of Knowledge & Alignment Dimensions, 1997)**.

---

## 1. Cadre d'Analyse Théorique

L'évaluation de la qualité pédagogique d'un curriculum repose sur deux théories complémentaires :
1. **L'alignement constructif de Biggs (1996) :** L'évaluation doit mesurer exactement la performance annoncée par l'objectif d'apprentissage visé (*Intended Learning Outcome - ILO*). Une correspondance lexicale (mentionner le mot « VLAN ») ne constitue pas un alignement si l'étudiant récite une définition au lieu de configurer un commutateur.
2. **Les quatre dimensions d'alignement de Webb (1997) :**
   - *Categorical Concurrence* (Concordance des catégories de compétences).
   - *Depth-of-Knowledge Consistency* (Cohérence de la profondeur cognitive mobilisée).
   - *Range-of-Knowledge Correspondence* (Étendue de la couverture des standards).
   - *Balance of Representation* (Équilibre de la pondération des savoirs).

---

## 2. Matrice d'Alignement par Famille Disciplinaire

```
[Objectif d'Apprentissage (ILO)] ──► [Compétence Visée] ──► [Tâche Demandée] ──► [Preuve Observable] ──► [Règle de Notation]
```

### A. Famille 1 : Systèmes, Réseaux, Cloud & Infrastructure (25 cours, 450 exercices)

| Cours Exemple | Objectif d'Apprentissage Annoncé (ILO) | Compétence Prévue au Programme Réel | Tâche Réellement Demandée à l'Étudiant | Diagnostic d'Alignement (Biggs & Webb) | Statut Documentaire |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Git B1** (`b1-git`) | Maîtriser le contrôle de version distribué (commits, branches, fusions). | Taper les commandes Git fondamentales (`git init`, `add`, `commit`, `branch`). | Écrire un script Bash lisant l'entrée standard pour parser un fichier de log simulé. | **Rupture d'alignement totale.** La tâche mesure la manipulation de chaînes en Bash au lieu de la compétence Git. DOK dévoyé. | **Non-conformité démontrée** |
| **CCNA1 B1** (`b1-ccna1`) | Configurer les paramètres initiaux d'un commutateur Cisco. | Syntaxe Cisco IOS (`enable`, `conf t`, `hostname`, `interface vlan 1`, `ip address`). | Remplir un bloc texte `[Cas 1]` avec des calculs d'octets. | **Sous-représentation critique.** L'environnement et la syntaxe professionnelle Cisco sont totalement absents. DOK 1 au lieu de DOK 2. | **Non-conformité démontrée** |
| **Docker B2** (`docker`) | Conteneuriser une application et gérer le cycle de vie Docker. | Rédiger un `Dockerfile` et exécuter des commandes `docker run`, `docker-compose`. | Écrire un script Bash analysant les cgroups du noyau Linux sur stdin. | **Rupture d'alignement.** L'étudiant résout un problème d'administration système bas niveau au lieu d'utiliser les outils Docker. | **Non-conformité démontrée** |
| **Supervision B3** (`b3-supervision`) | Déployer et configurer des sondes de supervision Nagios. | Rédiger des fichiers de configuration Nagios (`commands.cfg`, `hosts.cfg`, `services.cfg`). | Calculer des ratios théoriques MTBF/MTTR dans un formulaire texte. | **Décalage catégoriel.** Compétence d'intégration système remplacée par une formule arithmétique statique. | **Non-conformité démontrée** |

---

### B. Famille 2 : Programmation & Développement Web (11 cours, 222 exercices)

| Cours Exemple | Objectif d'Apprentissage Annoncé (ILO) | Compétence Prévue au Programme Réel | Tâche Réellement Demandée à l'Étudiant | Diagnostic d'Alignement (Biggs & Webb) | Statut Documentaire |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Python B1** (`b1-python`) | Manipuler les structures de contrôle et fonctions en Python. | Écrire un algorithme modulaire avec contrat de fonction propre (`def f(...)`). | Écrire un script lisant `sys.stdin.read().split()` et affichant sur `stdout`. | **Alignement partiel pollué.** L'évaluation est parasitée par la complexité accidentelle du parsing stdin (variance non liée au construit). | **Menace sur la validité** |
| **Flask B2** (`api-rest-flask`) | Développer une API RESTful avec le framework Flask. | Déclarer des routes `@app.route()`, gérer les verbes GET/POST et renvoyer du JSON via `jsonify()`. | Parser manuellement une chaîne brute `GET /api/v1 HTTP/1.1` sur stdin sans importer Flask. | **Rupture d'alignement majeure.** L'exercice prétend évaluer Flask sans jamais instancier l'objet applicatif Flask. | **Non-conformité démontrée** |
| **React B2** (`react`) | Créer des composants d'interface interactifs avec hooks React. | Écrire des composants JSX avec `useState`, `useEffect` et props. | Simuler l'objet interne renvoyé par un `createElement` rudimentaire. | **Décalage de profondeur.** L'évaluation porte sur l'implémentation interne du moteur virtuel plutôt que sur le développement applicatif React. | **Menace sur la validité** |

---

### C. Famille 3 : Bases de Données & Modélisation (4 cours, 72 exercices)

| Cours Exemple | Objectif d'Apprentissage Annoncé (ILO) | Compétence Prévue au Programme Réel | Tâche Réellement Demandée à l'Étudiant | Diagnostic d'Alignement (Biggs & Webb) | Statut Documentaire |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Merise B1** (`b1-merise`) | Concevoir le Modèle Conceptuel de Données (MCD) d'un système d'information. | Identifier entités, attributs, associations et cardinalités ($0,n$, $1,1$) selon les règles de gestion. | Compléter des phrases à trous dans un bloc-notes statique `[Cas 1]`. | **Rupture d'alignement.** La modélisation graphique ou relationnelle formelle est réduite à un quiz textuel passif. DOK 1 au lieu de DOK 3. | **Non-conformité démontrée** |
| **SQL B1/B2/B3** (`sql`, `b3-sql`) | Interroger et manipuler une base relationnelle conforme aux contraintes ACID. | Écrire des requêtes `SELECT`, `JOIN`, `GROUP BY`, sous-requêtes et transactions. | Soumission textuelle sans base SQLite/PostgreSQL active côté serveur pour valider le dataset. | **Alignement de surface.** Les requêtes ne sont pas exécutées contre des jeux d'essais discriminants (valeurs NULL, doublons, jointures creuses). | **Menace sur la validité** |

---

### D. Famille 4 : Mathématiques, Statistiques & Sécurité (10 cours, 182 exercices)

| Cours Exemple | Objectif d'Apprentissage Annoncé (ILO) | Compétence Prévue au Programme Réel | Tâche Réellement Demandée à l'Étudiant | Diagnostic d'Alignement (Biggs & Webb) | Statut Documentaire |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Probabilités B2** (`probabilites`) | Résoudre des problèmes de dénombrement, probabilités conditionnelles et lois continues. | Appliquer les formules (Bayes, Binomiale, Poisson, Espérance) avec calcul exact (TD Dr AGBOKOU). | Calculs arithmétiques avec fractions exactes irréductibles (Phase Pilote). | **Aligné sur la phase pilote.** L'oracle de fraction irréductible et les champs d'étapes garantissent un alignement DOK 2/3 rigoureux. | **Conforme au contrôle effectué (Pilote)** |
| **Algèbre B1** (`b1-algebre`) | Résoudre des systèmes linéaires et manipuler des espaces vectoriels. | Pivot de Gauss, bases, matrices, déterminants (6 PDFs de cours). | Saisir une suite de chiffres sur une seule ligne simulant la somme de deux listes. | **Sous-représentation sévère.** Le calcul matriciel et la structure d'espace vectoriel sont réduits à une addition terme-à-terme de tableaux. | **Non-conformité démontrée** |
| **Crypto B3** (`b3-cryptographie`) | Maîtriser les principes du chiffrement asymétrique et de l'arithmétique modulaire. | Algorithme d'Euclide étendu, théorème de Fermat, génération de clés RSA ($e, d, n$). | Calcul de décalages de César et Vigenère enfantins dans du texte. | **Déficit de profondeur cognitive.** Niveau DOK 1 au lieu du niveau universitaire DOK 3 requis pour un niveau Bac+3 en cryptographie. | **Non-conformité démontrée** |

---

### E. Famille 5 : Méthodologie, Droit & Communication (17 cours, 306 exercices)

| Cours Exemple | Objectif d'Apprentissage Annoncé (ILO) | Compétence Prévue au Programme Réel | Tâche Réellement Demandée à l'Étudiant | Diagnostic d'Alignement (Biggs & Webb) | Statut Documentaire |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Droit B1/B2** (`b1-droit`, `droit`) | Analyser une situation litigieuse et qualifier juridiquement les infractions numériques. | Application de la méthode du syllogisme juridique et des textes légaux togolais (loi 2019-014). | Saisir des mots-clés dans des sections de texte. | **Rupture d'alignement totale.** La compétence juridique ne réside pas dans la mémoire lexicale, mais dans la qualification des faits et l'application de la règle. | **Non-conformité démontrée** |
| **Bureautique B1** (`b1-bureautique`) | Concevoir des classeurs automatisés et exploiter les fonctions de calcul d'Excel. | Écrire des formules de recherche et de logique (`=RECHERCHEV`, `=INDEX/EQUIV`, `=SI`). | Écrire des valeurs numériques statiques dans un formulaire texte. | **Rupture d'alignement.** L'évaluation ne vérifie jamais la syntaxe de la formule Excel ni sa dynamicité face à un changement de données. | **Non-conformité démontrée** |
| **Agile B3** (`b3-agile`) | Rédiger des exigences agiles et piloter un sprint Scrum. | Rédiger des User Stories selon le formalisme INVEST et critères d'acceptation Gherkin. | Calculer des dérives de triangles de fer dans du texte. | **Décalage catégoriel.** Compétence méthodologique agile remplacée par un calcul mathématique artificiel. | **Non-conformité démontrée** |

---

## 3. Synthèse de l'Équilibre et de la Profondeur Cognitive (Webb DOK)

L'évaluation globale de la banque de 1 250 exercices selon les critères de Webb établit :
1. **Déficit d'équilibre de représentation (*Balance of Representation*) :**
   - 66,4 % des exercices sont cantonnés au format statique `analyse`, créant une uniformité apparente qui masque l'absence des compétences techniques réelles.
2. **Affaissement de la profondeur cognitive (*Depth of Knowledge*) :**
   - **Niveau 1 (Rappel, restitution de syntaxe ou définition) : 71 % des exercices.**
   - **Niveau 2 (Application directe de formule ou routine) : 23 % des exercices.**
   - **Niveau 3 (Raisonnement stratégique, diagnostic, conception, preuve) : 6 % des exercices** (concentrés dans le pilote Probabilités/RO et quelques cours d'algo).
   - **Niveau 4 (Synthèse étendue, investigation multi-systèmes) : 0 % des exercices.**

Le curriculum actuel sur-évalue massivement la mémorisation de premier niveau (DOK 1) au détriment de l'ingénierie et de la pensée critique (DOK 3 et 4).
