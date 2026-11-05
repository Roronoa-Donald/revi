# Livrable 05 — Spécifications du Runner, Contrats de Réponse et Comparateurs

> Répertoire de livraison : `FINALISATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Composants sources : `server/exercises/runner.js`, `server/exercises/command-validator.js`  
> Date de certification : 3 novembre 2026  

---

## 1. Audit Préalable Systématique des Comparateurs

Conformément à la directive absolue de vérification préalable, chaque point soulevé lors des contre-audits a fait l'objet d'une inspection textuelle, d'une tentative de reproduction et d'une qualification formelle :

### 1.1. Tolérance Flottante Universelle (`1e-5`)
- **Affirmation de l'ancien audit** : une tolérance numérique globale aurait été appliquée sans précaution à toutes les sorties textuelles, provoquant des faux positifs sur des chaînes formates (ex: `' 10.00'` vs `'10.00'`).
- **Inspection du code réel (`server/exercises/runner.js`)** :
  * Lignes 145-193 : les mécanismes de tolérance fractionnaire (`parseReducedFraction`), décimale et de normalisation sémantique sont **exclusivement encapsulés dans le bloc conditionnel `if (isAnalyse) { ... }`**, où `isAnalyse = exercise.language === 'analyse'`.
  * Lignes 195-201 : la tolérance flottante n'est déclenchée que si le cas de test spécifie explicitement `typeof opts.tolerance === 'number'`.
  * Ligne 203 : pour tout exercice standard de programmation (Python, C, JavaScript, Bash), le repli par défaut est strictement :
    ```javascript
    return normalizeOutput(actual) === normalizeOutput(expected);
    ```
    où `normalizeOutput` n'altère que les fins de ligne (`\r\n` vers `\n`) et les espaces de fin de ligne.
- **Décision d'audit** : `CORRIGE_DEPUIS`. Aucun comparateur flottant universel n'affecte les sorties textuelles ordinaires.

### 1.2. Filtrage des Invites Textuelles (`stripPromptPollution`)
- **Affirmation de l'ancien audit** : un nettoyage aveugle des préfixes `Entrez`, `Donnez`, `Saisissez` supprimerait des chaînes légitimes dans les exercices où ces termes font partie de l'énoncé.
- **Inspection du code réel** :
  * Recherche exhaustive (`grep -rn "stripPrompt" server/`) : **0 résultat**.
  * La fonction `stripPromptPollution` a été évoquée dans des documents conceptuels antérieurs mais n'a **jamais été injectée dans `runner.js`**, précisément pour éviter de dénaturer les sorties textuelles prescrites.
- **Décision d'audit** : `FAUX_POSITIF_AUDIT` (défaut non présent dans le code source exécuté).

### 1.3. Multiplication Implicite (`expandMul`)
- **Affirmation de l'ancien audit** : la conversion de `4g` en `4*g` ou `10h` en `10*h` risquerait de corrompre des variables ou des unités de mesure dans les exercices de programmation.
- **Inspection du code réel (`server/exercises/runner.js`, ligne 190-193)** :
  * La fonction `expandMul` est définie localement **à l'intérieur du bloc `if (isAnalyse)`**.
  * Elle ne s'exécute que pour les exercices d'algèbre et de recherche opérationnelle modélisés sous `language: 'analyse'`. Pour Python, C, Bash ou SQL, `isAnalyse` vaut `false` et ce code n'est jamais atteint.
- **Décision d'audit** : `CORRIGE_DEPUIS` (périmètre rigoureusement isolé).

---

## 2. Validation Déterministe Shell (`command-validator.js`)

Pour les exercices de commandes élémentaires (Linux B1), l'évaluation s'effectue sans instanciation de processus système lourd via [server/exercises/command-validator.js](file:///home/rd/Desktop/proba/server/exercises/command-validator.js) :

### 2.1. Respect Strict de la Sémantique des Guillemets Shell
L'analyseur distingue rigoureusement la neutralisation des métacaractères par les guillemets simples POSIX :
- Dans `echo '$HOME'`, le symbole `$` est conservé entre guillemets simples : `normalizeCommand("echo '$HOME'")` retourne `'echo \'$HOME\''`.
- Dans `echo "$HOME"`, la chaîne fait l'objet d'une préservation explicite des guillemets doubles si elle contient un dollar : `c1 === c2` est **strictement faux**.
- Test unitaire reproductible :
  ```javascript
  assert.notEqual(normalizeCommand("echo '$HOME'"), normalizeCommand('echo "$HOME"'));
  ```

### 2.2. Distinction des Chemins Relatifs d'Exécution
- La suppression des préfixes `./` n'est appliquée qu'aux **arguments de fichiers** (ex: `cat ./fichier` normalisé en `cat fichier`).
- Le binaire exécutable lui-même (`prog`, premier jeton) conserve son préfixe : `normalizeCommand("./script.sh")` retourne `./script.sh` et n'est pas confondu avec `script.sh`.

### 2.3. Permutations d'Options Bornées à la Commande `ls`
Le tri canonique des drapeaux courts combinés (`-la` == `-al` == `-l -a` == `-a -l`) est **strictement circonscrit à la commande `ls`** (lignes 32-46). Aucune permutation automatique d'arguments n'est appliquée aveuglément aux autres commandes (ex: `tar -czvf` n'est pas permuté sans contrôle de position).

### 2.4. Protection ReDoS
Toute entrée transmise à `validateShellCommand` est bornée par :
```javascript
const MAX_COMMAND_LENGTH = 512;
```
Toute commande excédant 512 caractères est immédiatement rejetée avec le message : `La commande saisie dépasse la longueur maximale autorisée (512 caractères)`. Les motifs regex internes n'utilisent aucun groupe imbriqué non borné, garantissant un temps de calcul strictement linéaire en $O(N)$.

---

## 3. Typologie des Contrats de Réponse Pris en Charge

| Type de Contrat | Mode d'Évaluation | Tolérance et Normalisation | Composant Responsable |
| :--- | :--- | :--- | :--- |
| **Texte exact (`mode: 'exact'`)** | Égalité stricte caractère par caractère | Aucune tolérance, respect des espaces et casses | `runner.js` (ligne 127) |
| **Texte normalisé (par défaut)** | Égalité textuelle après nettoyage standard | Fins de ligne `\r\n` → `\n`, espaces de fin de ligne | `runner.js` (ligne 203) |
| **Fraction réduite (`fraction_reduite`)** | Comparaison numérateur / dénominateur | Reconnaissance des fractions irréductibles | `runner.js` (lignes 131-137) |
| **Tolérance numérique (`opts.tolerance`)** | $\|a - b\| \le \text{tolerance}$ | Tolérance absolue paramétrée sur le test | `runner.js` (lignes 195-201) |
| **Analyse mathématique (`language: 'analyse'`)** | Simplification sémantique + JSON structuré | Fractions, zéros non significatifs, casse | `runner.js` (lignes 145-193) |
| **Commande Shell (`command_challenge`)** | Décomposition par tokens et automates | Permutations `ls`, chemins d'arguments `./` | `command-validator.js` |
