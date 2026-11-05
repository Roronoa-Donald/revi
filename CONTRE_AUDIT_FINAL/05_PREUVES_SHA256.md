# Livrable 05 — Analyse Critique des 227 Suspensions par Empreinte SHA-256

> Répertoire de livraison : `CONTRE_AUDIT_FINAL/`  
> Projet : `revi-cours-html`  
> Fichiers sources audités : [server/exercises/grading-policy.js](file:///home/rd/Desktop/proba/server/exercises/grading-policy.js), [server/exercises/grading-evidence.json](file:///home/rd/Desktop/proba/server/exercises/grading-evidence.json), [server/exercises/grading-runtime-evidence.json](file:///home/rd/Desktop/proba/server/exercises/grading-runtime-evidence.json)  
> Date d'audit : 3 novembre 2026  

---

## 1. Contexte et Définition de la Problématique

Dans le moteur d'évaluation de la plateforme, 227 exercices de programmation réelle (Python, C, PHP, JavaScript, Java, PowerShell, Bash) sont frappés par une mesure de suspension conservatoire de la notation sommative (`NOTATION_SUSPENDUE`).

Le message d'erreur officiel renvoyé par l'API est :
> *« La correction automatique de cet exercice est temporairement suspendue : les preuves de fiabilité des tests sont incomplètes ou périmées. »*

La directive du contre-audit ordonne :
> *« Inspecte chaque identifiant suspendu pour ce motif. Identifie exactement l'artefact censé être protégé par l'empreinte. Distingue : intégrité de la source, intégrité du corrigé, intégrité du validateur, preuve de test, validité pédagogique. Ne prétends pas qu'une empreinte SHA-256 démontre une correction pédagogique. Ne réactive aucun exercice avant une vérification adaptée. »*

---

## 2. Décomposition Disciplinaire des 227 Exercices Suspendus

L'inspection exhaustive du catalogue ([server/exercises/index.js](file:///home/rd/Desktop/proba/server/exercises/index.js)) révèle la ventilation exacte des 227 fiches suspendues :

### Répartition par Cours :
- `b1-algo` : 25 exercices (exercices algorithmiques B1)
- `b1-c-cpp` : 24 exercices (programmation système C/C++)
- `b1-php` : 24 exercices (développement web PHP B1)
- `b1-python` : 18 exercices (algorithmique Python B1)
- `b1-prog-web` : 18 exercices (JavaScript / DOM B1)
- `linux` : 18 exercices (administration Linux B2)
- `php` : 18 exercices (POO PHP B2)
- `rd_java` : 18 exercices (Java B2)
- `admin-vm` : 18 exercices (PowerShell / virtualisation B2)
- `api-rest-flask` : 18 exercices (API REST Python/Flask B2)
- `b3-algo` : 18 exercices (algorithmique avancée B3)
- `react` : 6 exercices (composants React avancés)
- `rd_winserver` : 3 exercices (scripts PowerShell d'administration)
- `b1-linux` : 1 exercice (script spécifique)
- **Total : 227 exercices**.

### Répartition par Langage de Programmation :
- **Python** : 79 exercices (34,8 %)
- **PHP** : 42 exercices (18,5 %)
- **JavaScript** : 24 exercices (10,6 %)
- **C** : 21 exercices (9,3 %)
- **PowerShell** : 21 exercices (9,3 %)
- **Bash / Shell** : 19 exercices (8,4 %)
- **Java** : 18 exercices (7,9 %)
- **C++** : 3 exercices (1,3 %)

### Cause Technique Confirmée :
Les 227 fiches sont **totalement absentes** du dictionnaire [grading-evidence.json](file:///home/rd/Desktop/proba/server/exercises/grading-evidence.json) (`Object.hasOwn(verifiedExercises, exerciseId) === false`).

---

## 3. Analyse Épistémologique et Métrologique : Ce que Protège l'Empreinte SHA-256

Dans [server/exercises/grading-policy.js](file:///home/rd/Desktop/proba/server/exercises/grading-policy.js) (lignes 18-20), la fonction de calcul de l'empreinte est définie ainsi :

```javascript
function exerciseFingerprint(exercise) {
  return createHash('sha256').update(JSON.stringify(exercise)).digest('hex');
}
```

L'objet sérialisé comprend les clés suivantes :
`{ id, chapter, level, language, title, goal, brief, starter, hints, examples, tests, solution, course }`.

Le contre-audit établit formellement la distinction entre les cinq dimensions métrologiques :

### 1. Intégrité de la source (Texte de l'énoncé)
- **Rôle du SHA-256** : Total. L'empreinte garantit qu'aucun mot de l'énoncé (`goal`, `brief`), aucun code d'amorce (`starter`) et aucun exemple n'a été altéré sur le disque depuis la signature.
- **Portée** : Détection de corruption physique de fichier ou de modification non tracée.

### 2. Intégrité du corrigé (Solution de référence)
- **Rôle du SHA-256** : Total. La solution fournie par l'auteur est incluse dans la chaîne JSON. Toute modification de la solution change le hachage.
- **Portée** : Empêche qu'une solution falsifiée ou contournée ne soit substituée silencieusement.

### 3. Intégrité du validateur (Moteur d'exécution)
- **Rôle du SHA-256** : Nul au niveau de la fiche. L'empreinte de la fiche ne protège pas [runner.js](file:///home/rd/Desktop/proba/server/exercises/runner.js) ni l'adaptateur [piston.js](file:///home/rd/Desktop/proba/server/services/execution/piston.js).
- **Correctif existant** : C'est le rôle distinct de [grading-runtime-evidence.json](file:///home/rd/Desktop/proba/server/exercises/grading-runtime-evidence.json), qui calcule le hachage du fichier [runner.js](file:///home/rd/Desktop/proba/server/exercises/runner.js) lui-même.

### 4. Preuve de test (Exécution dynamique effective)
- **Rôle du SHA-256** : Nul. Une fonction mathématique de hachage calcule une signature sur des octets au repos. Elle n'exécute aucun compilateur, ne lance aucun conteneur, ne vérifie aucune mémoire et ne détecte aucune boucle infinie.
- **Portée** : Le fait qu'un exercice possède une empreinte SHA-256 ne prouve en aucun cas que ses tests réussissent ou résistent aux soumissions erronées des étudiants.

### 5. Validité pédagogique (Qualité didactique de l'évaluation)
- **Rôle du SHA-256** : Strictement nul. Un exercice didactiquement inadapté (par exemple exigeant un script shell complexe pour un cours d'initiation bureautique) peut posséder une empreinte SHA-256 mathématiquement parfaite.
- **Portée** : La validité pédagogique relève exclusivement de l'expertise humaine disciplinaire et de l'alignement avec les référentiels de compétences.

---

## 4. Statut des 792 Exercices `analyse` au Regard de la Politique

Une découverte majeure du contre-audit réside dans la ligne 39 de [server/exercises/grading-policy.js](file:///home/rd/Desktop/proba/server/exercises/grading-policy.js) :

```javascript
if (exercise.language === 'analyse') return false;
```

Cette clause d'échappement a pour effet direct de **désactiver le contrôle d'empreinte SHA-256 pour les 792 exercices de type `analyse`** (qui constituent 97,3 % des 814 exercices actifs).

Ces 792 exercices ne sont pas dans [grading-evidence.json](file:///home/rd/Desktop/proba/server/exercises/grading-evidence.json), mais ne sont pas suspendus parce que le code court-circuite la vérification.  
À l'inverse, les 227 exercices de code réel (qui nécessitent un véritable environnement de compilation distant) subissent la vérification stricte et se trouvent ainsi suspendus.

---

## 5. Décision et Conclusion du Contre-Audit

L'affirmation relative à la légitimité du maintien des 227 suspensions est :
**CONFIRMEE**.

1. **Aucune réactivation prématurée** : Les 227 exercices doivent impérativement demeurer sous le statut `NOTATION_SUSPENDUE` / `ENTRAINEMENT_NON_NOTE`.
2. **Protocole de réactivation requis** : La réactivation de chacun de ces 227 exercices exigera :
   - Un banc d'exécution unitaire distant prouvant que la solution de référence passe 100 % des tests.
   - L'ajout de cas limites et de cas négatifs.
   - L'enregistrement de l'empreinte vérifiée dans [grading-evidence.json](file:///home/rd/Desktop/proba/server/exercises/grading-evidence.json).
   - La validation par un enseignant titulaire de la discipline.
