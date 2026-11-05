# Livrable 06 — Spécifications Techniques du Runner et des Validateurs

> Répertoire de livraison : `CONSOLIDATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Fichiers source : `server/exercises/runner.js`, `server/exercises/command-validator.js`, `server/exercises/grading-policy.js`  
> Bancs de test associés : `tests/runner-remediation.test.js`, `tests/grading-prelot3.test.js`  
> Date de certification : 3 novembre 2026  

---

## 1. Architecture et Rôle du Moteur d'Évaluation (`runner.js`)

Le module [server/exercises/runner.js](file:///home/rd/Desktop/proba/server/exercises/runner.js) constitue le cœur d'exécution et de notation de la plateforme pour les exercices d'ateliers de code.

### 1.1. Contrat d'Exécution et Séquence de Notation
Lorsqu'un apprenant soumet un fragment de code ou une commande shell via l'interface Code Lab :
1. **Contrôle d'éligibilité métrologique** : le runner interroge `grading-policy.js`. Si l'exercice est suspendu de notation (`isGradingSuspended`), la soumission est bloquée avant toute consommation de quota et avant tout appel au conteneur d'exécution distant (Piston / Oanor). Un message didactique explicatif est immédiatement retourné.
2. **Dispatching du type d'exercice** :
   - Si `exercise.type === 'command_challenge'` : routage direct vers le validateur déterministe en mémoire [command-validator.js](file:///home/rd/Desktop/proba/server/exercises/command-validator.js). Zéro processus système n'est créé.
   - Si `exercise.type === 'code'` : routage vers le bac à sable d'exécution sécurisé.
3. **Exécution séquentielle avec court-circuit** : les cas de test associés à l'exercice sont exécutés les uns après les autres. Dès qu'un cas échoue, l'évaluation s'interrompt pour éviter le gaspillage de ressources et fournir à l'étudiant un retour focalisé sur son premier point de blocage.
4. **Comparaison de sortie** : la sortie produite par le code de l'étudiant est confrontée à l'attendu configuré (`test.expected`).

### 1.2. Sémantique Rigoureuse des Comparateurs Numériques et Flottants
Une vigilance critique a été portée sur la comparaison des sorties numériques :
- **Principe de fidélité textuelle** : les sorties textuelles ordinaires exigent une conformité stricte après normalisation des fins de ligne (`\r\n` convertis en `\n`) et suppression des espaces de début/fin superflus.
- **Préservation des formats stricts** : un comparateur flottant permissif global appliqué sans précaution confondait des chaînes telles que `' 10.00'` et `'10.00'`. Le runner préserve l'exigence formelle lorsque le sujet impose une mise en forme explicite (ex: espaces de justification ou zéros non significatifs imposés par un formatteur).
- **Tolérance numérique ciblée** : pour les exercices mathématiques (Probabilités B2, Recherche Opérationnelle B2), un oracle numérique dédié autorise une marge d'arrondi de `10^-5` ou la reconnaissance de fractions irréductibles (`1/3` reconnu équivalent à `0.333333`).

---

## 2. Validateur Déterministe de Commandes Shell (`command-validator.js`)

Pour la formation Linux B1 et les ateliers d'administration système élémentaire, l'exécution de conteneurs Linux complets pour valider une simple commande telle que `ls -la` ou `mkdir dossier` introduisait une latence excessive (1 à 3 secondes) et une fragilité d'infrastructure inutile.

Le module [server/exercises/command-validator.js](file:///home/rd/Desktop/proba/server/exercises/command-validator.js) implémente un analyseur syntaxique déterministe hors-processus répondant aux exigences suivantes :

### 2.1. Normalisation Syntaxique Robuste
L'analyseur décompose la commande saisie en lexèmes (*tokens*) et neutralise les variations syntaxiques légitimes :
- **Permutation des drapeaux courts** : `ls -l -a`, `ls -la`, `ls -al`, `ls -a -l` sont analysés comme strictement équivalents par tri canonique des options groupées.
- **Normalisation des chemins relatifs** : les préfixes redondants de répertoire courant (ex: `./script.sh` vs `script.sh`) sont éliminés lorsque le contexte de l'exercice l'autorise.
- **Espaces multiples et tabulations** : compression systématique des séparateurs d'arguments sans altérer le contenu des chaînes entre guillemets.
- **Respect strict des guillemets Shell** : distinction stricte entre les guillemets simples (`'...'`, littéraux sans expansion) et les guillemets doubles (`"..."`, sujets à l'expansion de variables comme `"$HOME"`).

### 2.2. Protection ReDoS (Regular Expression Denial of Service)
Les regex d'évaluation pédagogique peuvent devenir vulnérables au retour arrière catastrophique (*catastrophic backtracking*) sur des entrées anormalement répétitives.
Deux garde-fous stricts sont mis en œuvre :
1. **Plafonnement de longueur** : toute entrée soumise au `command-validator` est tronquée ou rejetée si elle excède **512 caractères**.
2. **Expressions régulières bornées** : interdiction des structures imbriquées `(a+)+` et emploi exclusif de groupes atomiques ou d'automates d'états linéaires en temps d'exécution `O(N)`.

### 2.3. Détection des Quasi-Erreurs Fréquentes
Le validateur intègre une table d'aide diagnostique détectant les confusions classiques des débutants en B1 :
- Oubli du drapeau de récursivité (`rm dossier` au lieu de `rm -r dossier`).
- Inversion d'arguments (`tar cf archive dossier` vs `tar dossier archive`).
- Majuscules involontaires (`LS`, `Cd`).
Un message didactique ciblé guide l'apprenant sans divulguer directement la solution.

---

## 3. Matrice de Certification et Résultats des Tests

Le bon fonctionnement du moteur et des validateurs est garanti par une suite de tests automatisés :

| Suite de Test | Fichier Source | Nombre de Tests | Résultat | Temps d'Exécution |
| :--- | :--- | :---: | :---: | :---: |
| **Sécurité QCM & API** | [tests/qcm-security.test.js](file:///home/rd/Desktop/proba/tests/qcm-security.test.js) | 17 | 100 % Passant | 621 ms |
| **Runner & Suspension** | [tests/runner-remediation.test.js](file:///home/rd/Desktop/proba/tests/runner-remediation.test.js) | 5 | 100 % Passant | 260 ms |
| **Validation Déterministe** | [tests/refonte-b1-linux.test.js](file:///home/rd/Desktop/proba/tests/refonte-b1-linux.test.js) | 5 | 100 % Passant | 10 ms |
| **Oracles Probabilités** | [tests/refonte-probabilites.test.js](file:///home/rd/Desktop/proba/tests/refonte-probabilites.test.js) | 5 | 100 % Passant | 5 ms |
| **Modélisation RO B2** | [tests/refonte-RD-RO.test.js](file:///home/rd/Desktop/proba/tests/refonte-RD-RO.test.js) | 5 | 100 % Passant | 5 ms |
| **Banc Pré-Lot 3** | [tests/grading-prelot3.test.js](file:///home/rd/Desktop/proba/tests/grading-prelot3.test.js) | 4 | 100 % Passant | 30 ms |

Extrait certifié du journal [test_runner_remediation.log](file:///home/rd/Desktop/proba/CONSOLIDATION_REMEDIATION/PREUVES/test_runner_remediation.log) :
```text
[OK] la notation de code reste active pour 62 fiches initiales et quatre méthodes contrôlées (16.85ms)
[OK] toute modification de la fiche invalide sa preuve (0.43ms)
[OK] les exercices sans preuve montrent leur suspension dans le rendu (6.37ms)
[OK] les 289 fiches ont un inventaire individuel vérifié (133.92ms)
[OK] l'API refuse une fiche sans preuve avant appel ou consommation du quota (101.81ms)
[OK] command-validator.js : Comparateur command_challenge pour l'apprentissage shell (1.54ms)
[OK] command-validator.js : Normalisation syntaxique des arguments et drapeaux (0.32ms)
[OK] command-validator.js : Détection des quasi-erreurs fréquentes avec messages explicatifs (0.29ms)
[OK] command-validator.js : Protection contre les commandes anormalement longues (ReDoS) (0.10ms)
```
