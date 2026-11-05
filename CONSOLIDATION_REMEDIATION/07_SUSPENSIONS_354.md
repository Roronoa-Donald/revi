# Livrable 07 — Réconciliation Exhaustive et Plan de Levée des 354 Suspensions

> Répertoire de livraison : `CONSOLIDATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Référentiel technique : `server/exercises/grading-policy.js`, `server/exercises/grading-evidence.json`  
> Registre d'inventaire : `02_REGISTRE_EXERCICES.csv`  
> Date de certification : 3 novembre 2026  

---

## 1. Justification Métrologique et Politique de Suspension

La suspension de notation automatique n'est pas un dysfonctionnement de la plateforme, mais un **principe de précaution déontologique et métrologique**.

Dans un système d'évaluation universitaire crédible :
> « *Mieux vaut suspendre temporairement la notation automatisée d'un exercice et le maintenir en entraînement libre que de délivrer à l'étudiant une note arbitraire, un faux succès par devinette ou un faux échec dû à un oracle déficient.* »

Les audits 1 et 2 ont révélé que de nombreux exercices historiques utilisaient des gabarits inadaptés (`read -r` en Bash imposé aux débutants, scripts lisant `stdin` pour tester des concepts d'administration réseau ou de bases de données, absence de vérification de l'algorithme demandé). En réponse, la politique `server/exercises/grading-policy.js` a verrouillé la notation de **354 exercices (28,3 % du catalogue)**.

---

## 2. Décomposition Mathématique et Typologie des 354 Suspensions

```
                  CATALOGUE GLOBAL (1 250 Exercices)
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
EXERCICES ACTIFS NOTÉS (896)                EXERCICES SUSPENDUS (354)
- Oracles validés                           - Entraînement libre accessible
- Tests certifiés                           - Verrouillage notation sommative
- Conformité didactique                     - Notification claire dans l'interface
                                                        │
        ┌───────────────────────────────────────────────┼───────────────────────────────┐
        ▼                                               ▼                               ▼
SUSPENSIONS GLOBALES PAR COURS               SUSPENSION DE MÉTHODE            PREUVES MANQUANTES
- 7 cours x 18 exercices                    - 1 exercice ciblé                - Fiches sans SHA-256 certifié
- Total = 126 exercices                      - `algo-c9-e2` (b1-algo)          - Total = 227 exercices
```

### 2.1. Groupe 1 : Suspensions Globales par Cours (126 Exercices)
Sept cours entiers font l'objet d'une suspension globale en attente de la refonte complète de leur banque d'exercices :

| Cours | Niveau | Nb Ex. | Raison Didactique et Technique de Suspension | Statut Pédagogique | Statut Technique |
| :--- | :---: | :---: | :--- | :--- | :--- |
| `csharp` | B2 | 18 | Exercices d'algorithmique générique non représentatifs de l'écosystème .NET / C# moderne (POO avancée, LINQ). | `A_RECORRIGER` | `VALIDATEUR_GENERIQUE` |
| `docker` | B2 | 18 | Utilisation de scripts bash lisant `stdin` pour tester la conteneurisation au lieu d'analyser la syntaxe Dockerfile/Compose. | `A_RECORRIGER` | `VALIDATEUR_GENERIQUE` |
| `b3-linux` | B3 | 18 | Incohérence des oracles avec les compétences d'ingénierie Linux avancée (systemd, cgroups, kernel tuning). | `A_RECORRIGER` | `VALIDATEUR_GENERIQUE` |
| `b3-github` | B3 | 18 | Tentative d'évaluer le travail collaboratif Git via des scripts en texte brut sans dépôt réel. | `A_RECORRIGER` | `VALIDATEUR_GENERIQUE` |
| `b1-sql` | B1 | 18 | Absence de moteur SQL serveur avec flux `stdin` ; cours basculé sur le simulateur client `sql.js` (WebAssembly). | `BLOQUE_RESSOURCE` | `SANS_VALIDATEUR` |
| `sql` | B2 | 18 | Absence d'infrastructure d'exécution SQL interactive côté serveur pour requêtes complexes DDL/DML. | `BLOQUE_RESSOURCE` | `SANS_VALIDATEUR` |
| `b3-sql` | B3 | 18 | Absence de moteur SQL serveur avec flux `stdin` pour les procédures stockées et l'optimisation d'index. | `BLOQUE_RESSOURCE` | `SANS_VALIDATEUR` |
| **Sous-total Groupe 1** | — | **126** | **7 cours × 18 exercices = 126 exercices suspendus** | — | — |

### 2.2. Groupe 2 : Suspension Spécifique de Méthode (1 Exercice)
- **Identifiant** : `algo-c9-e2` (Cours : `b1-algo`, Chapitre 9, Exercice 2).
- **Intitulé** : Algorithmique itérative et récursive.
- **Motif d'interception** : le test de validation automatisé accepte une résolution analytique directe ou une boucle triviale alors que le sujet impose expressément l'implémentation de la variante récursive terminale.
- **Statut dans le registre** : `Qualite_Pedagogique: A_RECORRIGER`, `Eligibilite_Notation: NOTATION_SUSPENDUE`.

### 2.3. Groupe 3 : Suspensions de Fiabilité pour Preuves Manquantes (227 Exercices)
- **Volume** : 227 exercices.
- **Motif technique** : dans le moteur `grading-policy.js`, un exercice n'est éligible à la notation sommative que si son empreinte cryptographique SHA-256 (`exerciseFingerprint(exercise)`) correspond rigoureusement à l'empreinte consignée dans `server/exercises/grading-evidence.json`.
- **Rôle du mécanisme** : empêcher qu'une modification sauvage d'un cas de test, de l'énoncé ou du code starter ne réactive silencieusement la notation sans repasser par le banc de certification formel.
- **Statut dans le registre** : `Qualite_Pedagogique: VALIDATION_HUMAINE_REQUISE`, `Eligibilite_Notation: NOTATION_SUSPENDUE`.

---

## 3. Synthèse Arithmétique

$$\text{Total Exercices Suspendus} = 126 \text{ (Cours)} + 1 \text{ (Algo)} + 227 \text{ (Preuves)} = 354 \text{ exercices}$$
$$\text{Total Exercices Actifs} = 1250 - 354 = 896 \text{ exercices (71,7 \%)}$$
$$\text{Total Catalogue} = 896 + 354 = 1250 \text{ exercices (100 \%)}$$

---

## 4. Feuille de Route et Critères de Levée de Suspension

La réactivation de la notation sur ces exercices est conditionnée aux étapes suivantes :

### 4.1. Pour les 54 Exercices SQL (`b1-sql`, `sql`, `b3-sql`)
1. **Périmètre B1 (`b1-sql`)** : les exercices sont d'ores et déjà couverts par le simulateur client interactif basé sur `sql.js` (WebAssembly vendé dans `b1-sql/assets/vendor/sqljs/`).
2. **Périmètres B2 et B3** : déploiement d'un conteneur d'exécution éphémère PostgreSQL/SQLite dédié recevant les scripts SQL des étudiants et validant les tables résultantes par comparaison d'état relationnel (`diff` sur jeu de données).

### 4.2. Pour les 72 Exercices Systèmes & DevOps (`docker`, `b3-linux`, `b3-github`, `csharp`)
1. **Docker et Git** : extension de `command-validator.js` pour analyser les fichiers Dockerfile (directives `FROM`, `RUN`, `COPY`, `CMD`) et les commandes de plomberie Git sans conteneurisation lourde.
2. **C#** : intégration d'un banc Piston avec compilateur `dotnet` officiel et cas de test orientés tests unitaires `xUnit/NUnit`.

### 4.3. Pour les 227 Exercices en Attente de Preuves
1. **Campagne de rejeu automatisée** : exécution du script de certification `corrections/outils/certifier-fiches.js`.
2. **Calcul des empreintes SHA-256** : mise à jour contrôlée de `grading-evidence.json` après validation unitaire des corrigés de référence.
3. **Audit de non-régression** : passage réussi de `tests/runner-remediation.test.js` garantissant qu'aucune note n'est réactivée sans preuve formelle.
