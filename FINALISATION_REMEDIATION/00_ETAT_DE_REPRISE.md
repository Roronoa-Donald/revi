# Livrable 00 — État de Reprise, Traçabilité Historique et Méthodologie

> Répertoire de livraison : `FINALISATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite` (commit de référence `20dc28e`)  
> Date de référence : 3 novembre 2026  
> Statut : Document contractuel de point zéro et d'engagement méthodologique  

---

## 1. Contexte et Chaîne de Traçabilité des Interventions

Le projet `revi-cours-html` a fait l'objet d'un cycle continu de contrôle qualité, de fiabilisation et d'audits scientifiques indépendants. La présente mission constitue l'étape ultime de finalisation et de certification technique.

Pour garantir une traçabilité totale et vérifiable, l'ensemble des dossiers des itérations antérieures est rigoureusement conservé sur le disque :
- `AUDIT_SCIENTIFIQUE_QUALITE/` : rapport initial des disparités didactiques et psychométriques.
- `REMEDIATION_COMPLETE/` : première vague de remédiation technique et sécurisation d'urgence.
- `REMEDIATION_COMPLETE_FINAL/` : seconde passe d'enrichissement et de correction de régression.
- `CONSOLIDATION_REMEDIATION/` : consolidation arithmétique et étanchéité de l'API de notation.
- `FINALISATION_REMEDIATION/` : présent dossier de certification finale, étayé par des preuves reproductibles.

---

## 2. État Réel du Dépôt et Inventaire Technique

L'inspection systématique du dépôt local `/home/rd/Desktop/proba` confirme les éléments d'environnement suivants :
- **Branche Git active** : `remediation-pedagogique-qualite`.
- **Commit parent vérifié** : `20dc28e` (`version finale des cours`).
- **Propreté syntaxique** : `git diff --check` retourne le code de sortie 0 (aucune tabulation erronée ni espace de fin de ligne orphelin).
- **Modifications suivies sous contrôle** :
  * `scripts/course-kit.js` : suppression conditionnelle de `data-correct` et du conteneur `.q__exp` en mode sécurisé.
  * `server/app.js` : enregistrement de la route `/api/qcm` et activation du plugin de capture de session.
  * `tests/db-persistence.test.js` : intégration de la migration 005 et fiabilisation de l'isolation multi-utilisateurs.
- **Nouveaux composants techniques conservés et qualifiés** :
  * `server/routes/qcm.js` : moteur d'évaluation serveur, sessions d'examen sommatives, barrières anti-oracle.
  * `server/exercises/command-validator.js` : validateur déterministe hors-processus pour les commandes shell Linux B1.
  * `tests/qcm-security.test.js` : banc d'épreuve couvrant les 17 vecteurs d'attaque HTTP.
  * `tests/refonte-*.test.js` : bancs de tests des 3 pôles pilotes (Probabilités B2, Linux B1, Recherche Opérationnelle B2).

---

## 3. Directive Absolue : Vérification Avant Toute Correction

La règle directrice impérative de cette mission stipule qu'aucun fichier ne doit être modifié sur la simple foi d'une affirmation d'un rapport antérieur sans démonstration factuelle sur le code en cours d'exécution.

Chaque anomalie potentielle fait l'objet de la séquence d'investigation en 8 étapes :
1. **LOCALISER** : identifier le fichier, la fonction, le composant et ses dépendances.
2. **INSPECTER** : lire le code réellement exécuté et ses conditions d'exécution.
3. **REPRODUIRE** : construire un scénario de test concret (unitaire, HTTP, simulation) et conserver la preuve.
4. **ÉTABLIR LA CAUSE** : distinguer symptôme, cause racine, risque théorique et défaut démontré.
5. **PRENDRE UNE DÉCISION** : classifier formellement l'anomalie parmi :
   - `DEFAUT_CONFIRME` : reproduction réussie et cause racine isolée.
   - `RISQUE_CONFIRME` : faiblesse démontrée sans exploitation triviale.
   - `DEFAUT_NON_REPRODUIT` : problème annoncé mais absent du code actuel.
   - `FAUX_POSITIF_AUDIT` : anomalie identifiée à tort par un filtre simpliste.
   - `AMELIORATION_OPTIONNELLE` : optimisation possible sans défaut actif.
   - `BLOQUE_PREUVE` : absence de données ou de dépendance extérieure.
   - `CORRIGE_DEPUIS` : défaut déjà résolu lors d'une passe antérieure avec test de non-régression.
6. **CORRIGER** : traiter la cause racine sans introduire de régression sur les fonctionnalités correctes.
7. **TESTER APRÈS CORRECTION** : vérifier la disparition du défaut et la conformité des cas limites.
8. **DOCUMENTER** : consigner la chaîne complète de preuves dans [01_REGISTRE_ANOMALIES_VERIFIEES.csv](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/01_REGISTRE_ANOMALIES_VERIFIEES.csv).
