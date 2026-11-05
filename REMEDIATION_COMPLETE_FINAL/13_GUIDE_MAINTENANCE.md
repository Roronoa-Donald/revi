# Livrable 13 — Guide de Maintenance et d'Exploitation pour les Développeurs

> Répertoire de livraison : `REMEDIATION_COMPLETE_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Date de certification : 3 novembre 2026

---

## 1. Principes d'Architecture et Conventions du Référentiel

Le projet `revi-cours-html` est une plateforme modulaire articulée autour d'une source unique de vérité :
- **Répertoire canonique des cours** : `server/courses.js` répertorie l'intégralité des 71 cours avec leur niveau (`b1`, `b2`, `b3`), icône et thème.
- **Ateliers de code** : configurés dans `server/exercises/course-config.js` et implémentés dans `server/exercises/<cours>.js`.
- **Pages générées** : ne jamais éditer directement les fichiers HTML des cours générés. Les contenus résident dans `server/content/<cours>/` et sont compilés via `scripts/course-kit.js`.
- **Politique de notation** : régie par `server/exercises/grading-policy.js`.
- **Sécurité QCM** : assurée par `server/routes/qcm.js` et Fastify.

---

## 2. Procédure d'Ajout d'un Nouvel Exercice

Pour introduire un nouvel exercice dans le catalogue sans introduire de régression :

### 2.1. Déclaration dans le Catalogue
Ouvrir `server/exercises/<cours>.js` et ajouter la fiche avec la structure obligatoire suivante :

```javascript
{
  id: 'py-c7-e1',
  chapter: 7,
  level: 'n1',
  language: 'python',
  title: 'Calcul de la moyenne pondérée',
  goal: 'Appliquer des coefficients de pondération sur une liste de valeurs.',
  brief: '<p>Calculez la moyenne pondérée à partir de deux listes de notes et de coefficients.</p>',
  starter: '# Votre code ici\n',
  hints: [
    'Comment calculer la somme totale des produits note * coefficient ?',
    'N’oubliez pas de diviser par la somme des coefficients.'
  ],
  examples: [
    { stdin: '10 20\n1 3', expected: '17.5', note: '(10*1 + 20*3) / 4 = 17.5' }
  ],
  tests: [
    { label: 'Cas nominal', stdin: '12 14\n2 2', expected: '13.0' },
    { label: 'Coefficients unitaires', stdin: '10 15 20\n1 1 1', expected: '15.0' },
    { label: 'Cas limite zéro', stdin: '0 20\n5 5', expected: '10.0' }
  ],
  solution: '...'
}
```

### 2.2. Régénération des Pages et Contrôle
Après avoir sauvegardé la fiche :
```bash
# 1. Régénérer les ateliers de code
node scripts/generate-code-labs.js

# 2. Vérifier la conformité de synchronisation
npm run labs:check
```

### 2.3. Certification de l'Empreinte (Sortie de Suspension)
Pour que l'exercice soit noté en production :
1. Calculer l'empreinte SHA-256 :
   ```bash
   node -e "const { exerciseFingerprint } = require('./server/exercises/grading-policy'); console.log(exerciseFingerprint(require('./server/exercises/index').getExercise('py-c7-e1')))"
   ```
2. Ajouter la clé `"py-c7-e1": "<hash>"` dans `server/exercises/grading-evidence.json`.
3. Valider avec `node --test tests/grading-suspension.test.js`.

---

## 3. Guide de Rédaction des Questions QCM (Standards NBME 2024)

Tout nouvel item QCM inséré dans `server/content/<cours>/` doit satisfaire aux règles suivantes :
1. **Amorce interrogative directe** : poser une question claire se terminant par un point d'interrogation, de sorte que l'étudiant comprenne le problème avant de lire les options.
2. **Éviter impérativement les formulations négatives** : proscrire *"Lequel N'EST PAS..."* ou *"Toutes les affirmations suivantes sont vraies sauf..."*.
3. **Péréquation de la longueur** : veiller à ce que la bonne réponse ne soit pas visiblement plus longue ou plus détaillée que les distracteurs.
4. **Proscrire les options génériques** : interdire formellement *"Toutes les réponses ci-dessus"* et *"Aucune des réponses ci-dessus"*.
5. **Plausibilité des distracteurs** : chaque fausse option doit correspondre à une confusion conceptuelle fréquente ou une erreur méthodologique typique.

---

## 4. Maintenance du Moteur de Correction et Hachages Runtime

Le fichier `server/exercises/grading-runtime-evidence.json` surveille l'intégrité des composants d'évaluation clés :
- `server/exercises/runner.js`
- `server/services/execution/index.js`
- `server/routes/exercises.js`
- `corrections/outils/method-check.js`
- `corrections/outils/method-probe.py`

**Règle d'or** : Si l'un de ces fichiers est légitimement modifié pour des besoins d'évolution :
1. Calculer le nouveau SHA-256 : `sha256sum <fichier>`.
2. Mettre à jour `grading-runtime-evidence.json`.
3. Exécuter l'ensemble de la batterie de tests `node --test tests/*.test.js` pour s'assurer qu'aucune dépendance historique n'a été rompue.

---

## 5. Commandes de Diagnostic Rapide

```bash
# Vérifier l'état git sans altération
git status -s

# Vérifier la compilation des 832 pages
npm run courses:check

# Lancer la batterie de tests complète
npm test

# Mettre à jour les registres et manifestes de certification
node scripts/generate_remediation_manifests.js
```
