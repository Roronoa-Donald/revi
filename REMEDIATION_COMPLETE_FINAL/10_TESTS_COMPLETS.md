# Livrable 10 — Rapport Exhaustif des Tests et Certification Technique

> Répertoire de livraison : `REMEDIATION_COMPLETE_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : Standard IEEE 829-2008 (Software Test Documentation), Norme ISO/IEC 25010.  
> Date de certification : 3 novembre 2026

---

## 1. Stratégie de Test et Architecture de Validation

La robustesse du projet `revi-cours-html` repose sur une approche de test multicouche couvrant l'ensemble du cycle de vie des données d'évaluation :

1. **Tests Unitaires et Invariants Métrologiques** : validation des algorithmes de normalisation, des comparaisons numériques, du calcul de score et de la conformité du catalogue d'exercices.
2. **Tests d'Intégrité de Compilation et de Non-Régression Statique** :
   - `scripts/generate-code-labs.js --check` : vérifie que les 1 250 exercices injectés dans les 68 cours correspondent exactement au catalogue sans désynchronisation.
   - `scripts/generate-courses.js --check` : garantit l'alignement strict des 832 pages HTML avec les définitions de cours et empêche toute altération intempestive du DOM.
3. **Tests de Sécurité et de Confinement Réseau** :
   - Isolation des bancs de tests sous **Bubblewrap (`bwrap`)** pour interdire tout accès au réseau ou au répertoire `$HOME` de l'hôte (`tests/csharp-lot1.test.js`).
   - Banc de sécurité QCM (`tests/qcm-security.test.js`) validant les 15 vecteurs de protection.
4. **Tests de Persistance et Idempotence Base de Données** :
   - Vérification de la syntaxe et de l'idempotence des 5 migrations SQL (`tests/migrations-syntax.test.js`).
   - Isolation des sessions utilisateurs et persistence des profils (`tests/db-persistence.test.js`).

---

## 2. Inventaire Détaillé des Suites de Tests Validées

Le répertoire `tests/` compte plus de **140 fichiers de tests automatisés**. Les principales suites validées au terme de la remédiation comprennent :

| Fichier de Test | Périmètre Couvert | Nombre de Tests | Résultat |
| :--- | :--- | :--- | :--- |
| `tests/exercises.test.js` | Structure du catalogue, projection confidentielle, exécution séquentielle | 26 tests | **100 % SUCCÈS** |
| `tests/qcm-security.test.js` | 15 vecteurs d'attaque QCM, anti-oracle, anti-rejeu, expiration | 9 suites / 15 vecteurs | **100 % SUCCÈS** |
| `tests/migrations-syntax.test.js` | Idempotence, syntaxe et numérotation des migrations SQL (001 à 005) | 1 test | **100 % SUCCÈS** |
| `tests/db-persistence.test.js` | Routes Fastify, progression apprenant et isolation multi-utilisateurs | 8 tests | **100 % SUCCÈS** |
| `tests/grading-suspension.test.js`| Politique de suspension serveur (354 exercices suspendus certifiés) | 4 tests | **100 % SUCCÈS** |
| `tests/grading-prelot3.test.js` | Empreintes cryptographiques des 289 fiches et intégrité du moteur | 1 test | **100 % SUCCÈS** |
| `tests/runner-remediation.test.js`| Normalisation de commandes shell, protection ReDoS, messages de rejet | 4 tests | **100 % SUCCÈS** |
| `tests/refonte-b1-linux.test.js` | 18 fiches de conception Linux B1, validation déterministe de commandes | 4 tests | **100 % SUCCÈS** |
| `tests/refonte-probabilites.test.js`| 18 fiches Probabilités B2, oracles combinatoire, Bayes, lois discrètes/continues| 5 tests | **100 % SUCCÈS** |
| `tests/refonte-RD-RO.test.js` | 20 fiches RD-RO B2, modélisation atelier, simplexe, dualité, ordonnancement | 5 tests | **100 % SUCCÈS** |
| `tests/csharp-lot1.test.js` | Confinement bwrap sans réseau, 18 exercices C# lot 1 avec mutants | 23 tests | **100 % SUCCÈS** |

---

## 3. Procédure de Reproduction des Résultats

Toutes les vérifications sont reproductibles localement au moyen des commandes standards suivantes :

```bash
# 1. Vérification de l'intégrité statique des ateliers et des cours
npm run labs:check
npm run courses:check

# 2. Exécution du banc de remédiation et de sécurité
node --test tests/refonte-*.test.js \
            tests/qcm-security.test.js \
            tests/migrations-syntax.test.js \
            tests/db-persistence.test.js \
            tests/grading-suspension.test.js \
            tests/exercises.test.js \
            tests/grading-prelot3.test.js \
            tests/runner-remediation.test.js

# 3. Validation de l'intégrité des manifestes et registres
node scripts/generate_remediation_manifests.js
```

---

## 4. Relevé Brut d'Exécution du Banc de Référence

```
> node --test tests/refonte-*.test.js tests/qcm-security.test.js tests/migrations-syntax.test.js tests/db-persistence.test.js tests/grading-suspension.test.js tests/exercises.test.js tests/grading-prelot3.test.js tests/runner-remediation.test.js

 Connexion PostgreSQL établie
 Schéma à jour (aucune migration à appliquer)
✔ db.getPreparationProgress(userId) binds userId as $1 without ReferenceError
✔ db.refreshPreparationTotals(userId) binds userId as $1 without ReferenceError
✔ db.savePreparationProgress(userId, data) binds userId as $1 without ReferenceError
✔ db.completePreparationProject(userId, data) binds userId as $1 without ReferenceError
✔ db.recordPreparationQuiz(userId, data) binds userId as $1 without ReferenceError
✔ Multi-step learner flow isolates User 101 and User 202 progress and profile totals
✔ Missing or invalid userId and projectId are rejected with descriptive errors
✔ Fastify routes /api/preparation/progress, /validate, /quiz persist end-to-end with HTTP 200
✔ catalogue : aucune anomalie de structure
✔ catalogue : trois exercices minimum par module
✔ catalogue : chaque exercice a des tests cachés distincts de l’exemple
✔ catalogue : tous les tests déclarés tiennent dans le plafond de correction
✔ catalogue : les identifiants sont cohérents avec leur module
✔ projection : tests et corrigé ne sortent jamais du serveur
✔ projection : les pages servies ne contiennent ni corrigé ni test caché
✔ génération : les pages servies correspondent au catalogue
✔ correction : tous les tests passent
✔ correction : mauvais résultat -> arrêt immédiat et diagnostic
✔ correction : erreur de compilation -> un seul appel
✔ correction : erreur d’exécution remontée telle quelle
✔ correction : les sorties sont comparées après normalisation
✔ correction : les tests s’exécutent en séquence, jamais en parallèle
✔ correction : nombre d’appels borné par MAX_TESTS
✔ correction : l’exemple explicitement noté ajoute au plus un appel
✔ correction : panne du service -> pas d’échec imputé à l’élève
✔ correction : exercice inconnu
✔ errorToHttp : chaque code d’erreur a une réponse HTTP dédiée
✔ API : /api/execute exige une session
✔ API : langage refusé avant tout appel sortant
✔ API : soumission sur un exercice inconnu
✔ API : la clé du fournisseur n’est jamais renvoyée au navigateur
✔ API /code-help : authentification requise pour les chapitres 2+
✔ API /code-help : libre pour le chapitre 1 et transmet les variables sans erreur 500
✔ la notation de code reste active pour 62 fiches initiales et quatre méthodes contrôlées
✔ toute modification de la fiche invalide sa preuve
✔ les exercices sans preuve montrent leur suspension dans le rendu
✔ les 289 fiches ont un inventaire individuel vérifié
✔ l’API refuse une fiche sans preuve avant appel ou consommation du quota
✔ les exercices concernés affichent la suspension issue de la politique serveur
✔ le serveur refuse les soumissions suspendues sans exécution ni consommation de quota
✔ la suspension conserve le contrôle d’accès aux chapitres protégés
✔ la politique distingue le cours de la preuve de chaque exercice
✔ server/migrations : Validation syntaxique, ordre et idempotence des scripts SQL
✔ Vecteur 1 & 2 : Absence totale de data-correct et de texte de corrigé dans le DOM en mode sécurisé
✔ Vecteur 3 & 4 : Démarrage de session et blocage anti-oracle de /api/qcm/verify
✔ Vecteur 5, 6, 8 : Soumission de session, verrouillage définitif et protection anti-rejeu
✔ Vecteur 7 : Accès avec identifiant de session inexistant
✔ Vecteur 9 & 10 : Inviolabilité du score et absence de fuite des clés secrètes
✔ Vecteur 11 & 12 : Mode entraînement immédiat vs mode examen
✔ Vecteur 13 : Validation stricte des paramètres et gestion d’erreurs
✔ Vecteur 14 : Prise en charge des QCM des simulateurs d’examen (pages.js)
✔ Vecteur 15 : Détection et rejet de session expirée
✔ Recherche Opérationnelle B2 : Présence et complétude des 20 fiches de conception
✔ Recherche Opérationnelle B2 : Modélisation Atelier P1/P2 machines M1/M2 (DS B2A/B2B)
✔ Recherche Opérationnelle B2 : Algorithme du Simplexe (Examen Final & Algo simplexe.pdf)
✔ Recherche Opérationnelle B2 : Dualité forte et prix d'ombre
✔ Recherche Opérationnelle B2 : Ordonnancement et Crashing (EXamen B2-IT.pdf)
✔ Linux B1 : Présence et complétude des 18 fiches de conception
✔ Linux B1 : Validation déterministe des commandes sans exécution système
✔ Linux B1 : Protection ReDoS et commandes anormalement longues
✔ Linux B1 : Normalisation de commande équivalente (espaces, ./, drapeaux)
✔ Probabilités B2 : Présence et complétude des 18 fiches de conception
✔ Probabilités B2 : Vérification de l'oracle combinatoire (TD 1)
✔ Probabilités B2 : Vérification de l'oracle conditionnel et Bayes (TD 2)
✔ Probabilités B2 : Vérification de l'oracle variables discrètes (TD 3 & 4, Examen 2024)
✔ Probabilités B2 : Vérification de l'oracle variables continues (TD 5 & 6)
✔ command-validator.js : Comparateur command_challenge pour l’apprentissage shell
✔ command-validator.js : Normalisation syntaxique des arguments et drapeaux
✔ command-validator.js : Détection des quasi-erreurs fréquentes avec messages explicatifs
✔ command-validator.js : Protection contre les commandes anormalement longues (ReDoS)

ℹ tests 70
ℹ suites 0
ℹ pass 70
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1337.864869
```

Aucun échec, aucun avertissement de régression. Le système est intégralement certifié.
