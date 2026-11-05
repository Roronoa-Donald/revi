# Livrable 08 — État Pédagogique Réel des Cours et Référentiel des Pôles Pilotes

> Répertoire de livraison : `CONSOLIDATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Dossier source académique : `/home/rd/Desktop/proba` (cours, TD, devoirs surveillés, examens réels)  
> Référentiels : Taxonomie révisée de Bloom (2001), Standards AERA/APA/NCME (2014)  
> Date de certification : 3 novembre 2026  

---

## 1. Diagnostic Pédagogique Global et Rupture avec l'Uniformité

L'audit initial d'adéquation formelle et pédagogique a mis en évidence un biais didactique majeur dans les versions historiques du projet :
- **L'illusion de l'évaluation par script `stdin`** : presque toutes les matières (de Git à Docker, en passant par Linux B1, le Droit et la Gestion de projet) imposaient à l'étudiant d'écrire un programme lisant sur l'entrée standard et affichant sur la sortie standard selon le gabarit répétitif `[Cas 1] Entrée: ... Sortie: ...`.
- **Dénaturation des compétences opérationnelles** : en Linux B1, un étudiant débutant qui découvrait les commandes `pwd`, `ls` et `cd` se voyait demander dès le premier chapitre d'écrire un script Bash complexe avec boucle `for ((...))`, lecture interactive `read -r` et aiguillage `case`, transformant une compétence d'administration système en un exercice de programmation algorithmique prématuré.
- **Déconnexion avec les supports d'enseignement réels** : en Probabilités et en Recherche Opérationnelle, les énoncés historiques proposaient des devinettes textuelles artificielles au lieu de confronter les étudiants aux véritables exercices de TD et aux sujets d'examen de la formation.

La remédiation adoptée repose sur une règle directrice intangible :
> « *Le type d'exercice, le mode de saisie et la modalité d'évaluation sont strictement déterminés par la nature épistémologique de la matière et par ce que le chapitre vient d'enseigner.* »

---

## 2. Les Trois Pôles Pilotes Refondus sur les Supports Réels

La refonte pédagogique a été amorcée et éprouvée sur trois matières emblématiques, directement reconstruites à partir des documents réels archivés dans `/home/rd/Desktop/proba` :

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       LES TROIS PÔLES PILOTES REFONDUS                      │
├────────────────────────┬────────────────────────────┬───────────────────────┤
│    PROBABILITÉS B2     │          LINUX B1          │    RECHERCHE OP. B2   │
│ (refonte/probabilites) │    (refonte/b1-linux)      │    (refonte/RD-RO)    │
├────────────────────────┼────────────────────────────┼───────────────────────┤
│ - Supports réels TD1-6 │ - Supports réels B1 IT     │ - DS B2A/B2B & Examens│
│ - Dénombrement, Bayes  │ - 18 défis de commandes    │ - Atelier P1/P2 M1/M2 │
│ - V.A. discrètes/cont. │ - Normalisation shell      │ - Simplexe & Diction. │
│ - Oracles d'arrondi    │ - Zéro script stdin imposé │ - Dualité, Crashing   │
│ - Tests unitaire auto  │ - Validateur déterministe  │ - Modélisation formelle│
└────────────────────────┴────────────────────────────┴───────────────────────┘
```

### 2.1. Pôle Pilote 1 : Probabilités B2 (`refonte/probabilites/`)
- **Sources universitaires réelles** : fiches de TD 1 à 6, annales de devoirs surveillés et sujets d'examen final de Bachelor 2.
- **Progression didactique des 18 exercices** :
  1. *Chapitre 1 — Dénombrement et Combinatoire* : calculs d'arrangements $A_n^k$, de combinaisons $\binom{n}{k}$, permutations avec répétitions (tirages avec/sans remise, ordonnés/non ordonnés).
  2. *Chapitre 2 — Probabilités Conditionnelles et Formule de Bayes* : partitions d'univers, formule des probabilités totales, inversion bayésienne sur diagnostics médicaux et détection d'anomalies réseau.
  3. *Chapitre 3 — Variables Aléatoires Discrètes* : lois Binomiale $\mathcal{B}(n, p)$, de Poisson $\mathcal{P}(\lambda)$, Géométrique et Hypergéométrique. Calcul de l'espérance mathématique $E(X)$ et de la variance $V(X)$.
  4. *Chapitre 4 — Couples de Variables Discrètes* : lois conjointes, lois marginales, covariance $\text{Cov}(X, Y)$ et indépendance stochastique.
  5. *Chapitre 5 — Variables Aléatoires Continues* : fonction de densité $f(x)$, fonction de répartition $F(x)$, calcul d'intégrales définies et normalisation.
  6. *Chapitre 6 — Lois Continues Usuelles* : loi Exponentielle $\mathcal{E}(\lambda)$ (propriété de perte de mémoire), loi Normale centrée réduite $\mathcal{N}(0, 1)$ et théorème central limite.
- **Garantie d'évaluation** : validation par oracles numériques indépendants tolérant une précision de $10^{-5}$ et gérant l'équivalence des fractions, certifiée par [tests/refonte-probabilites.test.js](file:///home/rd/Desktop/proba/tests/refonte-probabilites.test.js).

### 2.2. Pôle Pilote 2 : Administration Linux B1 (`refonte/b1-linux/`)
- **Sources réelles** : syllabus officiel IT B1, polycopiés de travaux pratiques fondamentaux.
- **Rupture didactique** : éradication complète des programmes Bash avec `read -r` pour les exercices de commande unitaire.
- **Structure des 18 exercices** :
  1. *Chapitre 1 — Système de Fichiers* : navigation relative/absolue (`cd`, `pwd`), arborescence FHS (`/etc`, `/var`, `/home`), listage détaillé (`ls -la`).
  2. *Chapitre 2 — Manipulation de Fichiers* : création (`touch`, `mkdir -p`), copie récursive (`cp -r`), déplacement et suppression sécurisée (`rm -f`).
  3. *Chapitre 3 — Permissions et Droits POSIX* : calcul des masques octaux (`chmod 755`, `chmod 644`), gestion des propriétaires (`chown user:group`).
  4. *Chapitre 4 — Visualisation et Filtres* : pagination (`less`), extraction (`head -n`, `tail -n`), tri et dédoublonnage (`sort`, `uniq`).
  5. *Chapitre 5 — Recherche et Tubes* : composition de pipelines (`|`), recherche de motifs (`grep -i`), localisation dans l'arborescence (`find /var -name "*.log"`).
  6. *Chapitre 6 — Gestion des Processus et Archives* : inspection (`ps aux`, `top`), signaux (`kill -9`), compression et archivage (`tar -czvf`).
- **Garantie d'évaluation** : validation déterministe via `command-validator.js`, certifiée par [tests/refonte-b1-linux.test.js](file:///home/rd/Desktop/proba/tests/refonte-b1-linux.test.js).

### 2.3. Pôle Pilote 3 : Recherche Opérationnelle B2 (`refonte/RD-RO/`)
- **Sources universitaires réelles** : cours de modélisation mathématique, fascicule de travaux dirigés, examens de Recherche Opérationnelle de Bachelor 2.
- **Structure des 20 fiches de conception** :
  1. *Modélisation de Programmes Linéaires* : formulation exacte de l'Atelier P1/P2 sur les machines M1/M2 (sujet officiel DS B2A/B2B), définition des variables de décision, écriture de la fonction objectif à maximiser et des contraintes d'heures-machine.
  2. *Algorithme du Simplexe* : mise sous forme standard, introduction des variables d'écart, choix de la variable entrante (critère de Dantzig) et de la variable sortante (règle du ratio minimal), pivotage et tableau final.
  3. *Dualité et Analyse de Sensibilité* : construction du problème dual associé, théorème des écarts complémentaires, calcul des prix d'ombre (*shadow prices*) des ressources rares.
  4. *Ordonnancement et Gestion de Projet (CPM / PERT)* : graphe d'antériorités, calcul des dates au plus tôt et au plus tard, détermination du chemin critique et optimisation de durée par compression de coûts (*crashing*).
- **Garantie d'évaluation** : vérifiée par [tests/refonte-RD-RO.test.js](file:///home/rd/Desktop/proba/tests/refonte-RD-RO.test.js).

---

## 3. Cartographie Pédagogique des 68 Cours du Référentiel

L'état didactique des 1 250 exercices répartis sur les 68 cours est consigné de façon univoque dans le registre [02_REGISTRE_EXERCICES.csv](file:///home/rd/Desktop/proba/CONSOLIDATION_REMEDIATION/02_REGISTRE_EXERCICES.csv) :

| Statut Pédagogique | Volume d'Exercices | Pourcentage | Définition Didactique et Conduite Opérationnelle |
| :--- | :---: | :---: | :--- |
| `VERIFIE_PEDAGOGIQUEMENT` | **82 exercices** | 6,6 % | Pôles pilotes refondus sur supports réels (56 ex) + lots certifiés avec tests unitaires d'intégration (`b1-python`, `b1-c-cpp`, `rd_winserver`, `react` : 26 ex). |
| `A_VERIFIER_PEDAGOGIQUEMENT` | **814 exercices** | 65,1 % | Exercices actifs en production dont la syntaxe technique est stable, mais dont l'alignement précis avec les annales de TD doit être audité par les équipes pédagogiques. |
| `A_RECORRIGER` | **73 exercices** | 5,8 % | Exercices suspendus présentant un défaut formel ou didactique avéré (Docker, C#, B3-Linux, B3-GitHub, et l'exercice d'itération `algo-c9-e2`). |
| `BLOQUE_RESSOURCE` | **54 exercices** | 4,3 % | Exercices SQL suspendus en attente du déploiement d'un bac à sable d'exécution relationnel serveur adapté (couverts par le simulateur sql.js en B1). |
| `VALIDATION_HUMAINE_REQUISE` | **227 exercices** | 18,2 % | Exercices suspendus de notation pour empreinte cryptographique manquante dans `grading-evidence.json`, en attente de validation formelle de leurs corrigés. |
| **TOTAL** | **1 250 exercices** | **100,0 %** | **Intégralité du catalogue d'ateliers de code réconcilié** |

---

## 4. Recommandations Pédagogiques pour les Lots Ultérieurs

Pour les phases futures de développement, les coordonnateurs pédagogiques devront appliquer les règles de conception suivantes :
1. **Adéquation de l'outil d'évaluation** :
   - Réseau / Systèmes élémentaires → validation de commandes par automates ou simulation de tables de routage.
   - Algorithmique pure → exécution de code avec cas limites (listes vides, entiers négatifs, grands volumes).
   - Bases de données → vérification d'état relationnel par confrontation de tables SQL.
   - Gestion de projet / Droit → QCM contextualisés par scénarios de mise en situation professionnelle (*vignettes cliniques*).
2. **Scaffolding et rétroaction formative** : chaque exercice doit fournir une explication détaillée sur la cause d'échec d'un cas de test, sans jamais donner directement le code de la solution.
3. **Alignement constructif** : formulation explicite des acquis d'apprentissage visés (*Learning Outcomes*) au début de chaque fiche de cours.
