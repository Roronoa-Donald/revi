# Livrable 04 — Architecture des Validateurs et Spécification des Comparateurs

> Répertoire : `REMEDIATION_COMPLETE/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : Standards AERA/APA/NCME (2014) Chapitre 4, ISO/IEC 25010 (Qualité des logiciels).

---

## 1. Principes Fondamentaux de Validation

La justesse d'une plateforme d'évaluation repose sur sa capacité à distinguer une réponse conceptuellement valide d'une erreur, sans pénaliser les variations syntaxiques inhérentes au raisonnement de l'apprenant, tout en refusant catégoriquement les réponses fausses ou floues.

Chaque validateur du projet respecte les principes suivants :
1. **Équivalence sémantique :** Deux représentations formellement différentes mais mathématiquement ou logiquement identiques doivent être acceptées.
2. **Rejet des faux positifs :** Une heuristique souple ne doit jamais valider une réponse fausse sous prétexte de flexibilité.
3. **Protection contre le déni de service (ReDoS / Timeout) :** Toutes les expressions rationnelles et algorithmes d'analyse lexicale doivent s'exécuter en temps linéaire borné ($O(n)$) sur des chaînes de taille plafonnée.
4. **Zéro exécution système pour les commandes simples :** Aucune commande d'apprenant débutant ne doit exécuter de sous-processus shell non contraint.

---

## 2. Spécification Détaillée des Comparateurs par Discipline

### 2.1. Validateur de Commandes Shell (`server/exercises/command-validator.js`)
*Disciplines cibles : Linux B1 (`b1-linux`), Git B1 (`b1-git`), Administration Système B2.*

#### Architecture :
- **Entrée bornée :** Longueur maximale fixée à 512 caractères (`MAX_COMMAND_LENGTH`), neutralisant toute attaque par amplification ou ReDoS.
- **Normalisation déterministe (`normalizeCommand`) :**
  - Compression des espaces multiples : `ls    -l` $\rightarrow$ `ls -l`.
  - Normalisation des drapeaux courts combinés : `-la` $\equiv$ `-al` $\equiv$ `-l -a` $\equiv$ `-a -l`. Les options sont triées alphabétiquement après regroupement.
  - Nettoyage des préfixes relatifs redondants : `./script.sh` $\rightarrow$ `script.sh`, `dossier/` $\rightarrow$ `dossier`.
  - Unification des guillemets : `'mon fichier'` et `"mon fichier"` normalisés.
- **Détection des quasi-erreurs fréquentes :**
  - Omission de drapeau critique (ex: `ls -l` sans `-a` quand les fichiers cachés sont demandés).
  - Mauvaise commande de base (ex: `dir` au lieu de `ls`).
  - Argument manquant (ex: cible manquante pour `mkdir` ou `cd`).
  - Émission d'un message explicatif constructif orientant l'apprenant sans lui donner la réponse complète.

#### Équivalences Admises vs Refusées :
- *Admis :* `ls -la /var/log/` $\equiv$ `ls -al /var/log` $\equiv$ `ls -a -l /var/log` $\equiv$ `ls -l -a /var/log`.
- *Refusé :* `ls -l` (omission des fichiers cachés) $\rightarrow$ rejet avec message : *« L’option -a est requise pour afficher les fichiers cachés. »*
- *Refusé :* `ls -la /var/log/*` (inutilement verbeux ou altérant la sémantique de listage du répertoire).

---

### 2.2. Validateur Mathématique et Probabiliste (`server/exercises/runner.js`)
*Disciplines cibles : Probabilités B2 (`probabilites`), Algèbre B1 (`b1-algebre`), Statistiques B1 (`b1-stats`).*

#### Comparateur de Fractions Réduites (`comparator: "fraction_reduite"`) :
- **Algorithme d'Euclide (PGCD) :** Analyse les entrées sous la forme $a/b$. Calcule le PGCD via divisions euclidiennes entières pour vérifier que $\text{PGCD}(|a|, |b|) = 1$.
- **Équivalences admises :** `3/8`, `+3/+8`.
- **Refusées :** `6/16` (fraction non irréductible) $\rightarrow$ rejet automatique pour sanctionner le manque de simplification canonique exigé aux devoirs surveillés.
- **Refusées :** `0.375` (décimal non admis lorsque la consigne exige la forme fractionnaire exacte).

#### Comparateur Numérique à Tolérance Flottante :
- **Mode explicite (`opts.tolerance`) :** $|V_{\text{apprenant}} - V_{\text{attendu}}| \le \epsilon$.
- **Mode automatique par défaut :** Pour les comparaisons de réels en programmation, application d'une tolérance de sécurité $\epsilon = 10^{-5}$ pour absorber les arrondis IEEE 754 (ex: `0.3333333333` vs `0.333333`).
- **Équivalence séparateur décimal :** Virgule `,` et point `.` considérés équivalents (`0,25` $\equiv$ `0.25`).

---

### 2.3. Validateur d'Optimisation et Recherche Opérationnelle (`server/exercises/runner.js`)
*Disciplines cibles : Recherche Opérationnelle B2 (`RD-RO`).*

#### Algorithme `expandMul` Cadré :
- **Anomalie historique corrigée :** Auparavant, `expandMul` convertissait aveuglément `(\d)([a-z])` en `$1*$2` sur l'ensemble des 830 exercices textuels, créant des faux positifs sur des unités physiques ou informatiques (`4g` $\rightarrow$ `4*g`).
- **Comportement corrigé :**
  - En contexte mathématique formel (`exercise.course === 'RD-RO'` ou `opts.mathModel === true`), conversion de `4x1` en `4*x1`.
  - En dehors de ce contexte, `expandMul` est strictement restreint aux variables canoniques indicées (`x1`, `x2`, `y1`, `y2`, `z`), préservant intactes les mentions techniques de taille ou mémoire (`4g`, `16gb`, `10h`).

#### Équivalences Formelles Admises :
- Formulations de contraintes linéaires :
  - `4*x1 + 3*x2 <= 24` $\equiv$ `4x1 + 3x2 <= 24` $\equiv$ `4·x1 + 3·x2 ≤ 24`.
  - Tolérance aux espaces autour des opérateurs de relation : `<=`, `\le`, `≤`.
- Formulations de dictionnaires de Simplexe :
  - Unification de casse et d'accents sur les états (`valide`, `réalisable`, `optimal`).

---

### 2.4. Validateur de Programmation et Exécution de Code (`server/services/execution/`)
*Disciplines cibles : Python B1, C/C++ B1, Algorithmique B1/B3, PHP B1/B2, Java B2, React B2, C# B2.*

#### Filtrage de la Pollution d'Invites Interactives (`stripPromptPollution`) :
- **Anomalie historique corrigée :** Les apprenants débutants écrivant `n = int(input("Entrez n: "))` voyaient leur programme rejeté avec le verdict `wrong_output` car le texte de l'invite était capturé dans `stdout`.
- **Mécanisme de remédiation :**
  - Fonction `stripPromptPollution(stdout)` qui supprime en début de ligne les motifs courants d'invites interactives :
    ```regex
    /^(?:entrez|donnez|saisissez|veuillez saisir|choisissez)[^:\n?]*[:?]\s*/i
    ```
  - La sortie filtrée est comparée à l'attendu. Si elle correspond, le test est validé.
  - La valeur produite par l'élève reste strictement contrôlée : un résultat numérique erroné demeure rejeté.

#### Comparateur JSON Structuré (`matchesStructuredJson`) :
- Désérialisation et comparaison canonique des arbres d'objets (clés ordonnées, égalité sémantique des nombres indépendante de la notation exponentielle ou décimale).

---

### 2.5. Validateur SQL (Moteur Client sql.js / WebAssembly)
*Disciplines cibles : SQL B1 (`b1-sql`), SQL B2 (`sql`), SQL B3 (`b3-sql`).*

- **Exécution isolée en WebAssembly :** Aucune exécution SQL sur la base de production PostgreSQL du serveur.
- **Comparaison des ensembles de résultats :**
  - Comparaison des lignes et colonnes retournées par `SELECT`.
  - Tolérance à l'ordre des colonnes lorsque la requête ne spécifie pas d'ordre strict, sauf clause `ORDER BY` explicite où l'ordre des tuples est vérifié au rang près.
  - Neutralisation des variations de casse dans les mots-clés (`select`, `SELECT`) et les identifiants non délimités.

---

### 2.6. Validateur Réseau et Équipements Cisco IOS (Recommandation Vague 2)
*Disciplines cibles : Réseaux B1 (`b1-reseaux`), CCNA1 B1 (`b1-ccna1`), CCNA B2 (`ccna`), LAN B3 (`b3-reseau-lan`).*

- **Validation par automate d'états finis :**
  - Contrôle du passage par les modes hiérarchiques Cisco :
    1. Mode Utilisateur : `Router>`
    2. Mode Privilégié : `Router#` (`enable`)
    3. Mode Configuration Globale : `Router(config)#` (`configure terminal`)
    4. Mode Interface : `Router(config-if)#` (`interface g0/0`)
  - Validation des masques réseau : acceptation conjointe de la notation décimale (`255.255.255.0`) et du préfixe CIDR (`/24`) lorsque la consigne le permet.

---

## 3. Matrice Récapitulative des Équivalences

| Comparateur | Entrée Apprenant | Entrée de Référence | Verdict | Règle Métrologique Appliquée |
| :--- | :--- | :--- | :--- | :--- |
| `command_challenge` | `ls  -la   /etc` | `ls -al /etc` | **ACQUIS** | Normalisation des espaces et drapeaux combinés. |
| `command_challenge` | `ls -l /etc` | `ls -la /etc` | **REJET** | Drapeau `-a` obligatoire pour les fichiers masqués. |
| `fraction_reduite` | `3/8` | `3/8` | **ACQUIS** | Fraction irréductible exacte. |
| `fraction_reduite` | `6/16` | `3/8` | **REJET** | Fraction non irréductible (non conforme aux exigences formelles). |
| `expandMul` (Math) | `4x1 + 3x2` | `4*x1 + 3*x2` | **ACQUIS** | Multiplication implicite en programmation linéaire. |
| `expandMul` (Système) | `4*g` | `4g` | **REJET** | Préservation des unités de mémoire (rejet du faux positif). |
| `stripPromptPollution` | `Entrez n: 42` | `42` | **ACQUIS** | Élimination de la variance non liée au construit sur `input()`. |
| `float_tolerance` | `0.3333333` | `0.333333` | **ACQUIS** | Tolérance par défaut $10^{-5}$ sur les flottants. |
| `float_tolerance` | `0.34` | `0.333333` | **REJET** | Écart supérieur à la tolérance (erreur de calcul). |
