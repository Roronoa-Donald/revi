# Livrable 05 — Analyse Scientifique et Métrologique des Calculateurs et Validateurs

> Répertoire d'audit : `AUDIT_SCIENTIFIQUE_QUALITE/`  
> Projet audité : `revi-cours-html`  
> Composants audités : `server/exercises/runner.js`, `server/services/execution/local-runner.js`, `server/services/execution/index.js`, `server/exercises/command-validator.js`.  
> Cadre d'évaluation : AERA/APA/NCME (2014, Chapitre 6 — *Automated Scoring*), Mislevy et al. (2003 — *Evidence-Centered Design*).

---

## 1. Cartographie de l'Architecture de Correction Automatisée

Le système d'évaluation automatique repose sur un pipeline séquentiel centralisé dans [`server/exercises/runner.js`](file:///home/rd/Desktop/proba/server/exercises/runner.js) :

```
Soumission Étudiant (Code / Texte)
              │
              ▼
   [Vérification intégrité] ──► isGradingSuspended() (SHA-256 evidence guard)
              │
              ▼
   [Aiguillage par Langage]
     ├── language === 'analyse' ──────────► localRunner.runAnalyse() + matchOutputs()
     ├── type === 'command_challenge' ────► command-validator.js (validateShellCommand)
     └── Autres (python, c, php, etc.) ───► Provider (Piston / Oanor / Local) + matchOutputs()
```

Trois familles de règles de décision coexistent :
1. **L'exécuteur dynamique à distance (Piston/Oanor)** : soumet le code complet sur un bac à sable externe, injecte `test.stdin`, capture `stdout`/`stderr` et compare via `normalizeOutput()`.
2. **L'interpréteur de sections statiques (`localRunner.runAnalyse`)** : découpe le texte soumis en sections délimitées par `[Cas N ...]` et extrait les lignes sous chaque cas pour les comparer aux réponses attendues.
3. **Le validateur de commandes déterministe (`command-validator.js`)** : valide syntaxiquement une commande Unix sans exécution système, avec normalisation d'arguments et regex ReDoS-protégées.

---

## 2. Démonstrations Reproductibles des Défaillances de Mesure

### A. Faux Négatif Démontré : Pollution de la sortie standard par les invites de saisie (Prompt Pollution)

- **Statut documentaire :** *Non-conformité démontrée* (Violation AERA Standard 3.1 & 6.8 — variance non liée au construit introduisant une erreur de mesure systématique).
- **Mécanisme :** Dans les cours de programmation débutant ([`b1-python`](file:///home/rd/Desktop/proba/server/exercises/b1-python.js), [`b1-algo`](file:///home/rd/Desktop/proba/server/exercises/b1-algo.js)), la consigne demande de lire une variable sur l'entrée standard. Un étudiant apprenant écrit naturellement :
  ```python
  x = int(input("Entrez un nombre : "))
  print(x * 2)
  ```
  Sous Python, la chaîne d'invite `"Entrez un nombre : "` est écrite sur `sys.stdout`. Le correcteur récupère :
  `actual = "Entrez un nombre : 10\n"` alors que `expected = "10\n"`.
- **Preuve reproductible :**
  ```bash
  node -e '
  const { runTests } = require("./server/exercises/runner.js");
  const ex = { id: "test-stdin", language: "python", tests: [{ stdin: "5", expected: "10" }] };
  const mockExec = async () => ({ ok: true, status: "success", stdout: "Entrez un nombre : 10\n", stderr: "", exitCode: 0 });
  runTests(ex, "", { execute: mockExec }).then(r => console.log("Rejeté à tort :", r.stop.reason, "actual:", r.stop.actual));
  '
  # Sortie observée : Rejeté à tort : wrong_output actual: Entrez un nombre : 10
  ```
- **Conséquence psychométrique :** L'étudiant qui a parfaitement compris l'opération arithmétique et la syntaxe de base est sanctionné d'un score de 0. La tâche mesure l'absence fortuite d'invite textuelle dans `input()` plutôt que la compétence de programmation.

---

### B. Faux Positif Démontré : Expansion arbitraire des multiplications dans le mode `analyse` (`expandMul`)

- **Statut documentaire :** *Non-conformité démontrée* (Violation AERA Standard 6.1 — invalidité de la règle d'inférence algorithmique).
- **Mécanisme :** Dans [`server/exercises/runner.js`](file:///home/rd/Desktop/proba/server/exercises/runner.js#L191), le correcteur applique la règle :
  ```javascript
  const expandMul = (s) => s.replace(/(\d)([a-z])/g, '$1*$2');
  if (expandMul(cleanA) === expandMul(cleanE)) return true;
  ```
  Cette règle a été introduite pour autoriser `4x1` au lieu de `4*x1`. Cependant, elle s'applique indistinctement à l'ensemble des 830 exercices du mode `analyse`.
  Par conséquent :
  - La chaîne `"4g"` (4 grammes ou réseau 4G) devient strictement équivalente à `"4*g"`.
  - La chaîne `"10h"` (durée de 10 heures) devient `"10*h"`.
  - Une réponse incorrecte contenant une unité collée est artificiellement validée comme un produit mathématique.
- **Preuve reproductible :**
  ```bash
  node -e '
  const { runTests } = require("./server/exercises/runner.js");
  const ex = { id: "test-ana", language: "analyse", tests: [{ stdin: "cas:1", expected: "4*g" }] };
  const mockExec = async () => ({ ok: true, status: "success", stdout: "4g", stderr: "", exitCode: 0 });
  runTests(ex, "", { execute: mockExec }).then(r => console.log("Validation illégitime :", r.results[0].ok));
  '
  # Sortie observée : Validation illégitime : true
  ```
- **Conséquence psychométrique :** Taux de faux positifs élevé dès lors qu'une grandeur physique, une unité de temps ou une désignation technique comporte un chiffre suivi d'une lettre.

---

### C. Faux Positif Démontré : Suppression aveugle des accents dans les matières littéraires et juridiques

- **Statut documentaire :** *Menace sur la validité ou la fiabilité* (Biais de mesure sémantique).
- **Mécanisme :** [`server/exercises/runner.js`](file:///home/rd/Desktop/proba/server/exercises/runner.js#L174) applique :
  ```javascript
  const stripAccents = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  ```
  Dans un cours de droit ou de communication professionnelle ([`b1-droit`](file:///home/rd/Desktop/proba/server/exercises/b1-droit.js), [`droit`](file:///home/rd/Desktop/proba/server/exercises/droit.js), [`b1-fr-pro`](file:///home/rd/Desktop/proba/server/exercises/b1-fr-pro.js)), la forme verbale « a » et la préposition « à », ou le terme « décharge » et « decharge », ou « côté » et « cote » sont rendus indifférenciables.
- **Preuve reproductible :** La chaîne `"à"` est acceptée pour une réponse attendue `"a"`, masquant des confusions grammaticales ou juridiques fondamentales.

---

### D. Faux Négatif Démontré : Échec sur précision flottante IEEE-754 sans déclaration de tolérance

- **Statut documentaire :** *Non-conformité démontrée* (Violation AERA Standard 6.8).
- **Mécanisme :** Dans `matchOutputs()`, la comparaison avec tolérance (`opts.tolerance`) n'est déclenchée que si la propriété est explicitement renseignée sur l'objet test. Or, sur les 84 exercices Python et 42 exercices PHP, moins de 5 % des tests sur les flottants déclarent un champ `tolerance`.
- **Preuve reproductible :**
  Si le calcul d'un étudiant génère `0.1 + 0.2` (qui produit `0.30000000000000004` en arithmétique flottante binaire standard) et que la valeur attendue est `"0.3"`, le test échoue avec `wrong_output` sans tolérance, rejetant un calcul algorithmiquement parfait.

---

## 3. Absence de Feedback Diagnostique sur Échec de Test

- **Statut documentaire :** *Non-conformité démontrée* (Violation directe du modèle Hattie & Timperley 2007).
- **Observation dans le code :**
  Dans [`server/exercises/runner.js`](file:///home/rd/Desktop/proba/server/exercises/runner.js#L312) :
  ```javascript
  userMessage: test.hint || test.explanation || ''
  ```
  L'audit des 1 250 exercices montre que **1 245 exercices (99,6 %)** ne définissent aucun champ `hint` ou `explanation` au niveau de l'objet `test` individuel.
- **Impact utilisateur :**
  Lorsqu'un test masqué échoue, l'API renvoie :
  `{ ok: false, reason: "wrong_output", userMessage: "" }`.
  L'étudiant reçoit un verdict purement binaire, sans *Feed Up* (critère manqué), sans *Feedback* (écart diagnostiqué) et sans *Feed Forward* (piste de remédiation).

---

## 4. Analyse de Sécurité et Robustesse Algorithmique (ReDoS & Buffer Limits)

1. **Expressions régulières et ReDoS :**
   - Dans `runner.js`, `parseDecimal` et `parseReducedFraction` opèrent sur des longueurs bornées (`text.length > 256`), neutralisant les attaques par déni de service par regex sur ces fonctions.
   - Dans `local-runner.js`, la regex `headerRe = /^\[(?:cas\s*(\d+)|exemple)\b.*\]$/i;` utilise un quantificateur glouton `.*` pouvant induire un léger backtracking si un étudiant soumet des lignes de 50 000 caractères malformées.
2. **Taille maximale des sorties :**
   - `local-runner.js` plafonne la sortie à 64 Ko (`MAX_OUTPUT_BYTES = 65536`), ce qui préserve la mémoire du processus Node.js contre les boucles d'affichage infinies.
