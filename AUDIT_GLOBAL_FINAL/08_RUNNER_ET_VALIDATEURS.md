# Livrable 08 — Analyse Forensique du Runner et des Validateurs

> Répertoire d'audit : `AUDIT_GLOBAL_FINAL/`  
> Fichiers audités : [server/exercises/runner.js](file:///home/rd/Desktop/proba/server/exercises/runner.js) et [server/exercises/command-validator.js](file:///home/rd/Desktop/proba/server/exercises/command-validator.js)  
> Date de référence : 3 novembre 2026  
> Auteur : Audit Indépendant et Forensique  

---

## 1. Architecture et Cycle de Vie du Runner

Le composant [server/exercises/runner.js](file:///home/rd/Desktop/proba/server/exercises/runner.js) orchestre l'évaluation séquentielle des soumissions d'étudiants.

### 1.1 Principes Fondamentaux de Conception

1. **Rétention Stricte des Tests Côté Serveur** : Les spécifications d'évaluation (entrées `stdin`, sorties `expected`, expressions régulières et critères de rejet) ne sont jamais transmises au client. Le client reçoit uniquement un compte-rendu agrégé (`passed`, `total`, `ok`) et un message didactique en cas d'échec.
2. **Exécution Séquentielle avec Court-Circuit (Short-Circuit)** :
   - Afin d'éviter l'épuisement du quota de l'API d'exécution distante (limitée à 2 requêtes/seconde sur le forfait de base), les tests sont joués l'un après l'autre.
   - Dès qu'un test échoue, l'évaluation s'interrompt immédiatement (`stop: { index, reason, details }`). Les tests suivants ne sont pas lancés, économisant ainsi le temps de traitement et les jetons de calcul.
3. **Plafond de Tests (`MAX_TESTS = 7`)** : Un exercice ne peut exécuter plus de 7 tests cachés par soumission, garantissant un temps de réponse borné (< 5 secondes).
4. **Vérification de l'Exemple Visible (`verifyFirstExample: true`)** : Pour les exercices de code compilé/interprété, le premier exemple présenté dans la consigne est automatiquement ajouté à la suite de tests pour empêcher le contournement par code factice.

---

## 2. Algorithmes de Correspondance et de Tolérance dans `runner.js`

La fonction centrale `matchOutputs(actualRaw, expectedRaw, test, exercise)` implémente une hiérarchie de comparateurs spécialisés.

### 2.1 Mode Exact et Fractions Réduites

- **Mode Exact (`opts.mode === 'exact'`)** : Comparaison binaire stricte sans altération d'espaces ni de casse (`actual === expected`).
- **Comparateur de Fraction Réduite (`opts.comparator === 'fraction_reduite'`)** :
  - Fonction [parseReducedFraction](file:///home/rd/Desktop/proba/server/exercises/runner.js#L29-L45) utilisant l'algorithme d'Euclide sur `BigInt` pour calculer le PGCD.
  - Vérifie que le numérateur et le dénominateur sont strictement premiers entre eux ($PGCD(a, b) = 1$). Si l'étudiant soumet `2/4` au lieu de `1/2`, le comparateur rejette la réponse comme non réduite.

### 2.2 Comparateur JSON Structuré avec Nombres Exacts

Pour les réponses sérialisées en JSON, [matchesStructuredJson](file:///home/rd/Desktop/proba/server/exercises/runner.js#L97-L116) :
- Analyse l'objet sans perte de précision flottante via [canonicalJsonNumber](file:///home/rd/Desktop/proba/server/exercises/runner.js#L47-L57).
- Utilise `node:util.isDeepStrictEqual` sur une représentation intermédiaire canonisée avec marqueur éphémère anti-collision.
- Permet d'accepter deux structures JSON dont les clés sont ordonnées différemment ou dont les nombres sont écrits sous formes exponentielles équivalentes (ex: `1.5e2` vs `150`).

### 2.3 Tolérances Didactiques Spécifiques au Mode `analyse`

Pour les 830 exercices de type `analyse`, `matchOutputs` déploie une chaîne de normalisation en 6 étapes :

1. **Insensibilité à la Casse** : `trimA.toLowerCase() === trimE.toLowerCase()`.
2. **Tolérance Virgule Décimale Francophone** : Conversion automatique des virgules en points (`0,25` $\to$ `0.25`).
3. **Équivalence Fraction / Décimal** :
   - Si l'un des termes est une fraction (`^-?\d+\s*/\s*\d+$`), calcul de la valeur flottante et comparaison à $10^{-6}$ près :
   $$\left| \text{val}_A - \text{val}_E \right| < 10^{-6}$$
   - Permet à un étudiant de saisir indifféremment `1/4`, `0.25` ou `0,25`.
4. **Suppression des Diacritiques (Accents)** :
   - Normalisation Unicode NFD suivie de l'élimination des marques de combinaison (`normalize('NFD').replace(/[\u0300-\u036f]/g, '')`).
5. **Nettoyage Typographique et Opérateurs Mathématiques** :
   - Remplacement du point médian `·` par `*`.
   - Normalisation des opérateurs relationnels : espaces supprimés autour de `=`, `:`, `<`, `>`, `;`.
   - Suppression des zéros décimaux superflus (`2.000` $\to$ `2`).
6. **Multiplication Implicite (`expandMul`)** :
   - Regex : `s.replace(/(\d)([a-z])/g, '$1*$2')`.
   - Transforme `4x1` ou `2y` en `4*x1` ou `2*y`, neutralisant les divergences d'écriture algébrique entre étudiants.

---

## 3. Moteur Déterministe : `command-validator.js`

Le module [server/exercises/command-validator.js](file:///home/rd/Desktop/proba/server/exercises/command-validator.js) a été introduit pour évaluer les commandes système (Linux Bash, PowerShell, Cisco IOS) sans recourir à un conteneur système lourd ni à un script de lecture `stdin`.

### 3.1 Normalisation Syntaxique des Commandes Shell

La fonction `normalizeCommand(cmd)` résout les équivalences d'écriture :

- **Fusion et Tri des Options Courtes** :
  - Pour la commande `ls`, les drapeaux individuels ou combinés sont collectés dans un ensemble ordonné :
    - `ls -l -a` $\to$ `ls -al`
    - `ls -la` $\to$ `ls -al`
    - `ls -a -l` $\to$ `ls -al`
- **Résolution des Chemins Relatifs** :
  - Élimination des préfixes superflus `./` (`./script.sh` $\to$ `script.sh`).
  - Suppression des barres obliques de fin (`dossier/` $\to$ `dossier`).
- **Gestion Sémantique des Guillemets (Quotes)** :
  - Les guillemets simples (`'...'`) et doubles (`"..."`) sont préservés dès lors qu'ils protègent des variables d'environnement (`$VAR`) ou des métacaractères d'expansion shell.
  - S'ils n'entourent qu'un mot simple sans espace, ils sont normalisés pour comparaison équivalente.

### 3.2 Détection des Quasi-Erreurs Fréquentes (Rejected Patterns)

Pour guider l'apprentissage sans sanctionner aveuglément, le validateur inspecte d'abord le tableau `rejected` du test :

```javascript
// Exemple de configuration dans un exercice Linux B1
rejected: [
  { cmd: 'ls -R', message: 'L option -R liste recursivement, ce qui surcharge l affichage. Utilisez plutot -a pour voir les fichiers caches.' },
  { pattern: /rm\s+-rf\s+\//, message: 'Commande dangereuse detectee. Specifiez un dossier cible relatif ou un chemin securise.' }
]
```

Si la commande de l'étudiant correspond à un motif de quasi-erreur, le test échoue immédiatement avec le message explicatif dédié, transformant l'erreur en moment pédagogique.

### 3.3 Sécurité et Protection Anti-ReDoS

Pour parer aux attaques par déni de service par expressions régulières (ReDoS) :
- La commande brute saisie est strictement limitée à `MAX_COMMAND_LENGTH = 512` caractères.
- Toute saisie excédant cette longueur est rejetée avant toute évaluation par regex.

---

## 4. Synthèse d'Évaluation Métrologique

| Fonctionnalité | Implémentation | Robustesse | Limite Identifiée |
| :--- | :--- | :--- | :--- |
| **Court-circuit** | `results.every` / stop | Excellente | Ne fournit pas le nombre total d'erreurs potentielles |
| **Tolérance mathématique** | $10^{-6}$, fractions, `expandMul` | Élevée | Ne gère pas les expressions parenthésées complexes type `(2+x)/3` |
| **Normalisation Shell** | Tokens, drapeaux triés, quotes | Bonne | Limitée aux commandes simples ; les pipelines multi-tubes (`\|`) reposent sur regex |
| **Sécurité d'exécution** | Local en mémoire pour `analyse` | Hermétique | Aucun risque de fork bomb ou d'évasion locale |

Le runner et le validateur de commandes constituent des composants techniquement très aboutis. Leur principale vulnérabilité ne réside pas dans leur logique d'évaluation, mais dans la clause d'échappement de [grading-policy.js](file:///home/rd/Desktop/proba/server/exercises/grading-policy.js#L39) qui désactive le contrôle d'intégrité SHA-256 pour les exercices qui en dépendent.
