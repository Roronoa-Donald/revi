# Livrable 00 — État Initial de Reprise et Cadrage Méthodologique

> Répertoire de livraison : `CONSOLIDATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite` (commit de référence `20dc28e`)  
> Date de référence : 3 novembre 2026  
> Statut : Document contractuel de point zéro  

---

## 1. Contexte et Mandat d'Intervention

Le présent document consigne l'état précis du dépôt `revi-cours-html` à l'ouverture de la mission de consolidation finale. Il fait suite à deux audits indépendants majeurs (Audit d'adéquation formelle et pédagogique, Audit scientifique de la qualité intrinsèque des évaluations) et à deux itérations successives de remédiation technique (`REMEDIATION_COMPLETE` et `REMEDIATION_COMPLETE_FINAL`).

Une contre-expertise approfondie des livraisons antérieures a révélé que, si des avancées structurelles déterminantes ont été accomplies (sécurisation API de base, validateurs shell, persistance PostgreSQL), plusieurs défauts formels, lacunes d'inventaire et ambiguïtés métrologiques subsistaient :
1. **Omission des propositions dans le registre QCM** : le fichier `qcm_manifest.json` ne conservait que le décompte d'options (`nb_options: 3 ou 4`), privant les équipes pédagogiques de l'énoncé textuel des choix et interdisant tout contrôle direct de la plausibilité des distracteurs.
2. **Confusion des dimensions dans le registre des exercices** : une colonne unique `Statut` agrégeait arbitrairement la qualité didactique, la fiabilité technique de l'oracle, l'éligibilité à la notation sommative et la disponibilité opérationnelle.
3. **Divergence taxonomique sur les 184 QCM signalés** : écart apparent entre la typologie de l'Audit 2 (78 négatifs, 46 toutes/aucune, 32 distracteurs faibles, 28 asymétries) et le regroupement générique du premier script CSV (166 asymétries/reformulations, 15 toutes/aucune, 2 négatifs, 1 distracteur).
4. **Vulnérabilité résiduelle d'examen** : possibilité théorique d'interroger unitairement `/api/qcm/verify` sur une question d'examen en omettant délibérément l'argument `sessionId`.
5. **Absence de banc d'épreuve automatisé global** : absence d'un script de validation unifiée vérifiant l'ensemble des métriques d'intégrité avant archivage.

Le mandat de la consolidation finale consiste à corriger ces anomalies sans défaire l'existant, à réconcilier rigoureusement les données, à étanchéifier le moteur de sécurité HTTP et à livrer un dossier de consolidation exhaustif, étayé par des preuves d'exécution reproductibles.

---

## 2. Inventaire Initial des Fichiers et de la Branche

### 2.1. État Git et Arborescence
- **Branche de travail** : `remediation-pedagogique-qualite`
- **Commit parent** : `20dc28e` (`test: enrichir runner-remediation avec e2e de soumission`)
- **Vérification de propreté syntaxique** : `git diff --check` retourne le code de sortie 0 (aucune tabulation corrompue, aucun espace de fin de ligne).
- **Politique de préservation** : interdiction absolue de toute commande destructive (`git reset --hard`, suppression de dossiers tiers). Les livraisons historiques `REMEDIATION_COMPLETE/` et `REMEDIATION_COMPLETE_FINAL/` demeurent intactes à titre de traçabilité historique.

### 2.2. Composants Modifiés Antérieurement et Conservés
| Fichier Source | Nature de la Modification | Statut de Reprise |
| :--- | :--- | :--- |
| `scripts/course-kit.js` | Élimination de `data-correct` et suppression du bloc `<div class="q__exp">` en mode examen | Actif, validé par tests unitaires |
| `server/app.js` | Enregistrement de la route `/api/qcm` et activation du plugin de sessions | Actif, intégré au serveur Fastify |
| `server/routes/qcm.js` | Moteur de sécurisation QCM, gestion des sessions d'examen, recalcul serveur | Renforcé (vecteurs 1 à 17 couverts) |
| `server/exercises/command-validator.js` | Moteur de validation déterministe pour Linux B1 (ReDoS guard, normalisation d'arguments) | Actif, 100 % de couverture de tests |
| `tests/db-persistence.test.js` | Validation des migrations 001_ à 005_ et étanchéité multi-utilisateurs | Actif, persistance PostgreSQL certifiée |
| `tests/qcm-security.test.js` | Banc d'épreuve de sécurité HTTP couvrant les 17 vecteurs d'attaque | Actif, 17/17 tests réussis |
| `tests/runner-remediation.test.js` | Vérification de la politique de suspension et de non-régression du runner | Actif, 100 % passant |
| `tests/refonte-*.test.js` | Tests de non-régression des 3 pôles pilotes (Probabilités, Linux B1, RO B2) | Actif, 100 % passant |

---

## 3. Diagnostics Préalables et Confirmation de Non-Régression

Avant d'engager la consolidation documentaire et le recalcul des registres, une campagne de diagnostic technique a été exécutée :
1. `npm run labs:check` : confirme la synchronisation exacte de 1 250 exercices répartis sur 68 ateliers de code.
2. `npm run courses:check` : confirme la génération stricte de 832 pages HTML pour les 64 cours compilés.
3. `node --test tests/qcm-security.test.js` : confirme l'étanchéité absolue de l'API face aux 17 vecteurs d'attaque HTTP (aucun data-correct divulgué, 403 sur toute tentative d'oracle, idempotence stricte, recalcul serveur inviolable).
4. `node --test tests/runner-remediation.test.js tests/grading-prelot3.test.js tests/migrations-syntax.test.js tests/db-persistence.test.js tests/refonte-*.test.js` : confirme l'exécution sans erreur de 32 tests critiques en 375 ms.

---

## 4. Règles d'Engagement et Spécifications de Livraison

L'intervention est conduite sous les contraintes méthodologiques suivantes :
1. **Règle absolue Zéro Émoji** : aucun caractère pictographique ou émoji n'est toléré dans le code source, les fichiers de configuration, les scripts, les registres CSV/JSON, les journaux d'exécution et les livrables textuels. Les symboles mathématiques (`∈`, `∑`, `≤`) et les flèches d'orientation (`→`, `←`) sont seuls admis au titre de notation formelle.
2. **Découplage des dimensions de notation** : chaque exercice du catalogue est catégorisé selon 4 axes indépendants (qualité didactique, fiabilité technique, éligibilité à la notation sommative, disponibilité opérationnelle).
3. **Exhaustivité du registre QCM** : inclusion systématique des 4 options textuelles complètes, de la clé de correction, de l'explication didactique et du fichier source pour les 3 089 questions de la banque.
4. **Réconciliation métrologique documentée** : explication mathématique et pédagogique de la concordance entre les 78 négatifs, 46 toutes/aucune, 32 distracteurs faibles et 28 asymétries de l'Audit 2 et les 184 fiches du registre.
5. **Vérification scriptée autonome** : fourniture d'un banc de test `scripts/verifier_consolidation.js` autonome validant 14 critères d'intégrité et retournant impérativement le code de sortie 0.
