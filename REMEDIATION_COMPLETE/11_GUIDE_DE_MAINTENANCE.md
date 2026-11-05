# Livrable 11 — Guide de Maintenance et Manuel du Développeur Pédagogique

> Répertoire : `REMEDIATION_COMPLETE/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : IEEE Standard for Software Maintenance (IEEE 1219 / ISO/IEC 14764).

---

## 1. Vue d'Ensemble de l'Architecture Technique

Le projet repose sur une architecture claire et modulaire :
- **Serveur d'API & Sécurité :** Fastify dans `server/app.js`, points d'entrée `server.js` (local / Render) et `api/index.js` (Vercel).
- **Contenus Pédagogiques Canoniques :** Modules JavaScript dans `server/content/<cours>.js` et leurs dossiers associés.
- **Catalogue et Moteur de Correction :** `server/exercises/` (catalogue, oracles, `runner.js`, `command-validator.js`).
- **Générateurs Statiques et Vérificateurs :** `scripts/generate-courses.js`, `scripts/course-kit.js`, `scripts/generate-code-labs.js`.
- **Banque de Tests Automatisée :** Répertoire `tests/` exécuté par le coureur natif `node --test`.

---

## 2. Procédures Opérationnelles Pas-à-Pas

### 2.1. Comment Ajouter ou Modifier un Exercice de Code
1. **Localiser le fichier du catalogue :** Ouvrir `server/exercises/<cours>.js` (ex: `server/exercises/b1-python.js`).
2. **Définir la fiche d'exercice :**
   ```javascript
   {
     id: 'py-c2-e1',
     title: 'Calcul de moyenne pondérée',
     chapter: 2,
     course: 'b1-python',
     language: 'python',
     starter: 'def moyenne_ponderee(notes, coefficients):\n    # Votre code ici\n    pass\n',
     statement: '<p>Écrivez la fonction <code>moyenne_ponderee</code>...</p>',
     visibleExample: {
       input: 'notes = [12, 15], coeff = [2, 3]',
       output: '13.8'
     },
     tests: [
       {
         label: 'Test 1 : Deux notes simples',
         stdin: '12 15\n2 3\n',
         expected: '13.8',
         tolerance: 1e-4,
         hint: 'Vérifiez la division par la somme des coefficients.'
       }
     ],
     solution: 'def moyenne_ponderee(notes, coeffs):\n    return sum(n * c for n, c in zip(notes, coeffs)) / sum(coeffs)\n'
   }
   ```
3. **Synchroniser les pages de cours :**
   Exécuter :
   ```bash
   npm run courses
   ```
   Cette commande régénère les pages HTML du cours dans `<cours>/chapitres/` en y intégrant les composants d'exercice interactifs (`<div class="lab" data-lab>`).
4. **Vérifier l'absence de dérive :**
   ```bash
   npm run labs:check && npm run courses:check
   ```

---

### 2.2. Comment Ajouter ou Mettre à Jour une Question de QCM
1. **Ouvrir le fichier de chapitre source :**  
   Naviguer dans `server/content/<cours>/chapitre<N>.js` (ou `chapitres-1-3.js`).
2. **Écrire l'item selon les standards NBME 2024 :**
   - Amorce claire sous forme de question directe (pas de formulation négative).
   - 4 options de longueur homogène et techniquement plausibles.
   - Indice de la bonne réponse (`correct: 0` à `3`).
   - Explication didactique structurée (`exp`).
   ```javascript
   {
     stem: 'Quel protocole de niveau transport garantit la remise ordonnée et sans perte des paquets ?',
     opts: [
       'TCP (Transmission Control Protocol), via accusés de réception et fenêtrage',
       'UDP (User Datagram Protocol), orienté datagramme sans connexion préalable',
       'IP (Internet Protocol), responsable de l’adressage logique des paquets',
       'ICMP (Internet Control Message Protocol), dédié aux messages de contrôle'
     ],
     correct: 0,
     exp: 'TCP est un protocole connecté de couche 4 offrant le contrôle de flux et la fiabilité. UDP ne garantit pas la livraison, IP opère en couche 3 et ICMP gère les diagnostics réseau.'
   }
   ```
3. **Régénérer et vérifier les pages statiques :**
   ```bash
   npm run courses
   npm run courses:check
   ```

---

### 2.3. Comment Définir ou Étendre un Validateur (`server/exercises/`)
1. **Si l'exercice est une commande shell :**
   Utiliser `command-validator.js`. Déclarer le test avec `comparator: "command_challenge"` et préciser les expressions rationnelles acceptées (`patterns`) et la commande canonique (`expected`).
2. **Si l'exercice est un calcul mathématique exact :**
   Déclarer le test avec `comparator: "fraction_reduite"`. L'apprenant devra soumettre une fraction simplifiée au maximum (ex: `3/8`).
3. **Si vous devez modifier `runner.js` :**
   - Implémenter la logique dans `server/exercises/runner.js`.
   - **CRITIQUE :** Recalculer immédiatement l'empreinte SHA-256 :
     ```bash
     sha256sum server/exercises/runner.js
     ```
   - Reporter le nouveau hash dans `server/exercises/grading-runtime-evidence.json` sous la clé `common["runner.js"]`.
   - Exécuter le test de suspension cryptographique :
     ```bash
     node --test tests/grading-suspension.test.js
     ```

---

### 2.4. Comment Ajouter un Nouveau Test Automatisé
1. Créer un fichier dans le dossier `tests/` préfixé par son domaine (ex: `tests/mon-nouveau-test.test.js`).
2. Utiliser le module natif Node.js `node:test` et `node:assert/strict` :
   ```javascript
   'use strict';
   const test = require('node:test');
   const assert = require('node:assert/strict');

   test('Description claire du comportement testé', async () => {
     // Préparation et exécution
     const resultat = true;
     // Assertion stricte
     assert.equal(resultat, true);
   });
   ```
3. Exécuter unitairement le test :
   ```bash
   node --test tests/mon-nouveau-test.test.js
   ```

---

### 2.5. Règles de Sécurité Impératives à Toujours Respecter
- **Zéro fuite de corrigé côté client :** Ne jamais injecter d'attribut `data-correct` ou d'explication de corrigé dans les pages sommatives ou les contextes d'examen (`opts.secure = true`).
- **Secret des clés :** Ne jamais commiter de fichier `.env`. Les clés sensibles (`DATABASE_URL`, `JWT_SECRET`, `FEDAPAY_SECRET_KEY`, `OPENROUTER_API_KEY`) doivent rester exclusivement côté serveur.
- **Règle Zéro Emoji :** Ne jamais introduire d'émojis dans les textes de cours, les messages d'erreur ou les logs. Utiliser uniquement le système d'icônes SVG `/assets/img/ui-icons.svg`.
- **Validation continue obligatoire avant tout commit :**
  ```bash
  npm test && npm run labs:check && npm run courses:check
  ```
