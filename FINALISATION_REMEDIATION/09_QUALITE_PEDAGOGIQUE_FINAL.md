# Livrable 09 — Qualité Pédagogique Réelle des Cours et Référentiel des Pôles Pilotes

> Répertoire de livraison : `FINALISATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Dossier de référence universitaire : `/home/rd/Desktop/proba` (cours, TD, annales et examens officiels)  
> Date de certification : 3 novembre 2026  

---

## 1. Diagnostic de Fond et Fin de l'Uniformité Artificielle

L'audit didactique initial a établi qu'un grand nombre d'exercices historiques appliquait un gabarit uniforme inapproprié : l'évaluation par scripts lisant l'entrée standard (`stdin`) et produisant une sortie texte (`stdout`), indépendamment de la nature de la matière.

Cette approche introduisait de profondes dénaturations des compétences :
- En administration système (Linux B1), un débutant devait écrire des scripts avec boucles et aiguillages au lieu de maîtriser les commandes interactives de base.
- En modélisation mathématique (Probabilités, Recherche Opérationnelle), les exercices se réduisaient à des calculs isolés sans validation de la méthode de résolution ni respect des formats d'arrondi réels.
- En gestion de projet, réseaux et conteneurisation, les compétences opérationnelles étaient dégradées en devinettes de chaînes de caractères.

La refonte pédagogique impose une règle directrice intangible :
> « *L'exercice est dicté par la compétence métier visée et par ce que le cours vient d'enseigner ; jamais par la commodité d'un gabarit de test générique.* »

---

## 2. Les Trois Pôles Pilotes Reconstruits sur les Supports Réels

La refonte a été menée et certifiée sur trois pôles pilotes représentatifs des trois cycles, à partir des documents réels archivés dans `/home/rd/Desktop/proba` :

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       LES TROIS PÔLES PILOTES REFONDUS                      │
├────────────────────────┬────────────────────────────┬───────────────────────┤
│    PROBABILITÉS B2     │          LINUX B1          │    RECHERCHE OP. B2   │
│ (refonte/probabilites) │    (refonte/b1-linux)      │    (refonte/RD-RO)    │
├────────────────────────┼────────────────────────────┼───────────────────────┤
│ - Supports réels TD1-6 │ - Supports réels B1 IT     │ - DS B2A/B2B & Examens│
│ - Combinatoire, Bayes  │ - 18 défis de commandes    │ - Atelier P1/P2 M1/M2 │
│ - V.A. discrètes/cont. │ - Normalisation shell      │ - Simplexe & Diction. │
│ - Oracles d'arrondi    │ - Zéro script stdin imposé │ - Dualité, Crashing   │
│ - 100 % tests unitaires│ - Validateur déterministe  │ - Modélisation formelle│
└────────────────────────┴────────────────────────────┴───────────────────────┘
```

### 2.1. Pôle Pilote 1 : Administration Système Linux B1 (`refonte/b1-linux/`)
- **Supports d'enseignement réels** : syllabus officiel B1 IT, polycopiés de travaux pratiques sur les fondamentaux POSIX.
- **Rupture opérée** : abandon total des scripts Bash avec `read -r` pour les exercices de commande unitaire.
- **Progression didactique des 18 fiches** :
  1. *FHS et Arborescence* : `cd /var/log`, `pwd`, chemins relatifs/absolus, distinction `/etc` vs `/var`.
  2. *Manipulation de Fichiers* : `mkdir -p projet/{src,bin}`, `touch index.js`, `cp -r`, `rm -rf`.
  3. *Permissions POSIX* : calcul des masques octaux `chmod 755`, `chmod 644`, changement de propriétaire `chown user:group`.
  4. *Visualisation et Filtres* : pagination `less`, aperçu `head -n 10`, `tail -n 20`, tri et dédoublonnage `sort | uniq`.
  5. *Recherche et Pipelines* : filtrage de motifs `grep -i "error" /var/log/syslog`, composition de tubes `|`, localisation `find / -name "*.conf"`.
  6. *Processus et Archives* : inspection `ps aux`, signaux de terminaison `kill -15` / `kill -9`, création d'archive compressée `tar -czvf archive.tar.gz dossier/`.
- **Validation** : certifiée par [tests/refonte-b1-linux.test.js](file:///home/rd/Desktop/proba/tests/refonte-b1-linux.test.js) via `command-validator.js`.

### 2.2. Pôle Pilote 2 : Probabilités et Statistiques B2 (`refonte/probabilites/`)
- **Supports réels d'enseignement** : fiches de travaux dirigés 1 à 6, sujets d'examens partiels et finaux de Bachelor 2.
- **Progression didactique des 18 fiches** :
  1. *Dénombrement* : permutations avec répétitions, arrangements $A_n^k$, combinaisons $\binom{n}{k}$, tirages avec/sans remise.
  2. *Probabilités Conditionnelles et Bayes* : partitions d'univers, formule des probabilités totales, inversion bayésienne sur des tests de détection d'intrusions réseau.
  3. *Variables Aléatoires Discrètes* : lois Binomiale $\mathcal{B}(n, p)$, de Poisson $\mathcal{P}(\lambda)$, Géométrique, calcul de l'espérance $E(X)$ et de la variance $V(X)$.
  4. *Couples Aléatoires* : lois conjointes, lois marginales, indépendance stochastique, covariance et corrélation linéaire.
  5. *Variables Aléatoires Continues* : fonction de densité $f(x)$, fonction de répartition $F(x)$, intégrales définies et normalisation unitaire.
  6. *Lois Continues Usuelles* : loi Exponentielle $\mathcal{E}(\lambda)$ (propriété sans mémoire), loi Normale centrée réduite $\mathcal{N}(0, 1)$ et théorème central limite.
- **Validation** : certifiée par [tests/refonte-probabilites.test.js](file:///home/rd/Desktop/proba/tests/refonte-probabilites.test.js) avec des oracles numériques indépendants tolérant une marge de $10^{-5}$ et gérant l'équivalence des fractions irréductibles.

### 2.3. Pôle Pilote 3 : Recherche Opérationnelle B2 (`refonte/RD-RO/`)
- **Supports réels d'enseignement** : cours magistral de modélisation linéaire, fascicule de TD, annales du Devoir Surveillé officiel B2A/B2B et examens finaux.
- **Progression didactique des 20 fiches de conception** :
  1. *Modélisation de Programmes Linéaires* : formulation exacte du problème de l'Atelier P1/P2 sur les machines M1/M2 (contraintes d'heures-machine, fonction économique de marge brute).
  2. *Algorithme du Simplexe* : forme standard avec variables d'écart, choix de la variable entrante (critère de Dantzig), variable sortante (règle du ratio minimal), tableau de dictionnaires et pivotage.
  3. *Dualité et Prix d'Ombre* : construction du problème dual symétrique, théorème des écarts complémentaires, interprétation économique de la valeur marginale des ressources rares.
  4. *Ordonnancement et Gestion de Projet (CPM / PERT)* : graphe de précédence, calcul des dates au plus tôt et au plus tard, marges libres et totales, identification du chemin critique et crashing optimal.
- **Validation** : certifiée par [tests/refonte-RD-RO.test.js](file:///home/rd/Desktop/proba/tests/refonte-RD-RO.test.js).

---

## 3. Cartographie Didactique des 68 Cours du Référentiel

L'état réel des 1 250 exercices est répertorié dans [FINALISATION_REMEDIATION/02_REGISTRE_EXERCICES_FINAL.csv](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/02_REGISTRE_EXERCICES_FINAL.csv) :

| Catégorie de Statut Pédagogique | Volume | Pourcentage | Situation Réelle et Conduite Opérationnelle |
| :--- | :---: | :---: | :--- |
| `VERIFIE_PEDAGOGIQUEMENT` | **82 exercices** | 6,6 % | 56 fiches des 3 pôles pilotes refondus sur supports réels + 26 fiches de lots certifiés par tests unitaires (`b1-python`, `b1-c-cpp`, `rd_winserver`, `react`). |
| `A_VERIFIER_PEDAGOGIQUEMENT` | **814 exercices** | 65,1 % | Fiches actives en production dont les tests s'exécutent de façon stable, mais dont l'alignement précis avec les dernières annales doit être audité au fil de l'eau. |
| `A_RECORRIGER` | **73 exercices** | 5,8 % | Fiches suspendues présentant un défaut formel ou didactique avéré (Docker, C#, B3-Linux, B3-GitHub, et l'exercice de récursion `algo-c9-e2`). |
| `BLOQUE_RESSOURCE` | **54 exercices** | 4,3 % | Exercices SQL suspendus de notation dans l'attente d'un bac à sable d'évaluation SGBD interactif serveur (compensé par le simulateur `sql.js` en B1). |
| `VALIDATION_HUMAINE_REQUISE` | **227 exercices** | 18,2 % | Exercices suspendus de notation pour empreinte cryptographique manquante dans `grading-evidence.json`, en attente de certification formelle. |
| **TOTAL CATALOGUE** | **1 250 exercices** | **100,0 %** | **Intégralité des ateliers de code réconciliée** |

Aucun cours n'est déclaré artificiellement conforme : les limites réelles sont explicitement consignées et gérées sans ambiguïté.
