# Livrable 09 — Politique de Suspension et Protocole de Réactivation

> Répertoire de livraison : `REMEDIATION_COMPLETE_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : IEEE 1012 (System and Software Verification and Validation), ISO/IEC 25010 (Qualité des produits logiciels).  
> Date de certification : 3 novembre 2026

---

## 1. Fondement Déontologique et Règle d'Intégrité

Une plateforme universitaire ne peut pas décemment attribuer des notes à des étudiants sur des exercices dont les bancs de correction sont imparfaits, générateurs de faux négatifs ou dépourvus de preuves cryptographiques vérifiables.

Plutôt que de masquer les anomalies sous un faux semblant de conformité généralisée, la plateforme applique une **politique de suspension transparente et sécurisée** régie par `server/exercises/grading-policy.js` :
- **Principe de précaution métrologique** : un exercice dont la correction automatique n'est pas formellement certifiée est basculé en mode *"Entraînement non noté"*.
- **Maintien de l'accès aux cours** : la suspension de la note n'empêche nullement l'étudiant d'accéder au contenu du cours, aux exemples, aux exercices guidés et aux corrigés indicatifs. L'accès aux chapitres protégés demeure garanti.
- **Zéro consommation de quota** : les soumissions sur les exercices suspendus sont interceptées avant tout appel au moteur d'exécution (HTTP 503 explicite), préservant ainsi les quotas journaliers d'exécution de code.

---

## 2. Inventaire Exhaustif et Catégorisation des 354 Exercices Suspendus

Le volume total des exercices suspendus s'élève rigoureusement à **354 exercices** (sur les 1 250 du catalogue, soit 28,3 %). Il se décompose en trois catégories précises :

```
┌────────────────────────────────────────────────────────────────────────┐
│             RÉPARTITION DES 354 EXERCICES SUSPENDUS                     │
├────────────────────────────────────────────────────┬───────────────────┤
│ Catégorie de Suspension                            │ Nombre d'Exercices│
├────────────────────────────────────────────────────┼───────────────────┤
│ 1. Suspension Globale par Cours (7 cours x 18 ex)   │ 126 exercices     │
│ 2. Suspension Spécifique de Méthode (algo-c9-e2)   │   1 exercice      │
│ 3. Suspension pour Preuves de Fiabilité Manquantes │ 227 exercices     │
├────────────────────────────────────────────────────┼───────────────────┤
│ TOTAL DES EXERCICES SUSPENDUS                      │ 354 exercices     │
└────────────────────────────────────────────────────┴───────────────────┘
```

### 2.1. Groupe 1 — Suspensions Globales par Cours (126 Exercices)
Sept cours complets sont placés en suspension globale, représentant chacun 6 chapitres de 3 exercices (soit 18 exercices par cours) :

1. **`csharp` (18 exercices, B2)** :
   - *Cause* : décalage entre les exigences de typage strict C# et les chaînes injectées par `stdin` ; arrondis de nombres à virgule fixe non homogènes.
2. **`docker` (18 exercices, B2)** :
   - *Cause* : inadaptation du conteneur d'évaluation pour exécuter des daemons Docker imbriqués (*Docker-in-Docker*) en toute sécurité.
3. **`b3-linux` (18 exercices, B3)** :
   - *Cause* : énoncés historiques exigeant des scripts complexes non représentatifs des compétences de supervision et durcissement attendues en B3.
4. **`b3-github` (18 exercices, B3)** :
   - *Cause* : impossibilité d'évaluer des flux GitHub Actions distants via de simples flux d'entrées textuelles locales.
5. **`b1-sql` (18 exercices, B1)** :
   - *Cause* : absence de moteur SQLite/MySQL interactif côté serveur avec support `stdin` complet. Note : le cours propose un simulateur WebAssembly client dédié dans `b1-sql/assets/vendor/sqljs/`.
6. **`sql` (18 exercices, B2)** :
   - *Cause* : même motif que `b1-sql` ; nécessite la généralisation de l'évaluation client WebAssembly.
7. **`b3-sql` (18 exercices, B3)** :
   - *Cause* : requêtes avancées (fenêtrage, CTE récursives, tuning d'index) non exécutables de manière isolée sans base persistante.

### 2.2. Groupe 2 — Suspension Spécifique de Méthode (1 Exercice)
- **Identifiant : `algo-c9-e2` (Algorithmique B1)** :
  - *Intitulé* : Suite de Fibonacci et complexité.
  - *Cause de suspension* : L'énoncé impose explicitement un algorithme itératif en temps linéaire $O(n)$ et mémoire $O(1)$. Cependant, la sonde de correction n'exécutait qu'une vérification de sortie en boîte noire, acceptant des solutions récursives exponentielles naïves $O(2^n)$ pour les petites valeurs.
  - *Message servi* : *"La correction automatique de cet exercice est temporairement suspendue : elle ne vérifie pas la méthode demandée."*

### 2.3. Groupe 3 — Suspensions pour Preuves Manquantes (227 Exercices)
- **Description** : Ces exercices appartiennent à des cours actifs mais leurs empreintes cryptographiques (SHA-256 de la fiche d'exercice) n'ont pas encore été enregistrées dans le registre de confiance `server/exercises/grading-evidence.json`.
- **Règle de sécurité** : En vertu de la fonction `isGradingSuspended()`, toute fiche sans empreinte correspondante dans le registre ou ayant subi une modification de texte est automatiquement considérée comme non certifiée et basculée en suspension préventive.
- **Message servi** : *"La correction automatique de cet exercice est temporairement suspendue : les preuves de fiabilité des tests sont incomplètes ou périmées."*

---

## 3. Protocole Formel de Réactivation d'un Exercice ou Cours

Aucune réactivation arbitraire ou manuelle n'est autorisée. Pour réactiver la notation d'un exercice ou d'un cours suspendu, l'équipe d'ingénierie doit exécuter strictement le protocole suivant :

### Étape 1 : Conception Didactique de l'Épreuve
1. Rédiger un énoncé sans ambiguïté, ancré sur une compétence concrète du syllabus.
2. Définir des cas de tests cachés distincts de l'exemple visible, incluant des cas nominaux, des cas aux limites et des cas de mauvaise manipulation fréquente.
3. Spécifier le comparateur adapté (`command_challenge`, `approximate`, `fraction_reduite`, `exact`).

### Étape 2 : Banc de Test Indépendant et Validation par Mutant
1. Écrire le corrigé officiel de référence et vérifier qu'il passe 100 % des tests.
2. Construire un jeu d'au moins **deux mutants d'erreur** (solutions d'étudiants typiques contenant une faute fréquente).
3. Prouver que le banc de test **rejette systématiquement les mutants** avec un feedback explicatif approprié.

### Étape 3 : Empreinte Cryptographique et Enregistrement
1. Calculer l'empreinte SHA-256 canonique de la fiche d'exercice :
   ```bash
   node -e "const { exerciseFingerprint } = require('./server/exercises/grading-policy'); console.log(exerciseFingerprint(require('./server/exercises/index').getExercise('<id>')))"
   ```
2. Insérer l'empreinte obtenue dans `server/exercises/grading-evidence.json`.
3. Retirer l'exercice ou le cours de la liste d'exclusion dans `server/exercises/grading-policy.js`.

### Étape 4 : Validation par la Suite de Tests
1. Exécuter `node --test tests/grading-suspension.test.js`.
2. Mettre à jour le nombre d'exercices certifiés et vérifier l'absence totale de régression sur `npm run labs:check`.
