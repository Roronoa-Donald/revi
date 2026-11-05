# Livrable 07 — Réconciliation Réelle et Traçabilité des 354 Suspensions

> Répertoire de livraison : `FINALISATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Référentiels : `server/exercises/grading-policy.js`, `server/exercises/grading-evidence.json`  
> Registre source : `FINALISATION_REMEDIATION/02_REGISTRE_EXERCICES_FINAL.csv`  
> Date de certification : 3 novembre 2026  

---

## 1. Principe Déontologique de la Suspension Conservatoire

La suspension de notation ne constitue pas un aveu d'échec logiciel, mais un **mécanisme conservatoire de protection métrologique**. 

Dans un cadre académique crédible, lorsqu'un exercice présente un doute sérieux sur la validité de son contrat d'évaluation (inadéquation de la saisie stdin, défaut de vérification d'une contrainte d'algorithme, ou absence d'empreinte d'intégrité certifiée), le système doit refuser d'attribuer une note sommative arbitraire. L'exercice demeure pleinement accessible aux étudiants pour l'apprentissage et l'entraînement libre (`statut_operationnel: ENTRAINEMENT_NON_NOTE`), mais la notation officielle est verrouillée.

---

## 2. Décomposition Réconciliée des 354 Suspensions

L'inspection de [server/exercises/grading-policy.js](file:///home/rd/Desktop/proba/server/exercises/grading-policy.js) et du catalogue d'exercices confirme la ventilation exacte suivante :

$$\text{Suspensions Totales} = 126 \text{ (Cours)} + 1 \text{ (Spécifique)} + 227 \text{ (Preuves)} = 354 \text{ exercices}$$

```
                           CATALOGUE (1 250 Exercices)
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
       ACTIFS NOTÉS (896)                            SUSPENDUS (354)
       - 82 vérifiés pédagogiquement                 - 28,32 % du volume global
       - 814 à vérifier au fil de l'eau              - Entraînement libre maintenu
                                                              │
        ┌─────────────────────────────────────────────────────┼───────────────────────────────┐
        ▼                                                     ▼                               ▼
7 COURS SUSPENDUS (126)                               MÉTHODE UNIQUE (1)              PREUVES MANQUANTES (227)
- 7 cours x 18 fiches                                 - `algo-c9-e2` (b1-algo)        - Fiches sans SHA-256
- Docker, C#, B3-Linux, B3-GitHub,                     - Algorithme itératif           - Empreinte absente de
  B1-SQL, SQL B2, B3-SQL                                non imposé dans le test         grading-evidence.json
```

### 2.1. Groupe 1 : Les 126 Exercices Suspendus par Cours (7 Cours)
La constante `suspendedCourses` de `grading-policy.js` isole sept matières dont la banque d'exercices nécessite une refonte structurelle :
1. `csharp` (18 ex., B2) : exercices d'algorithmique ne reflétant pas les idiomes C# modernes (classes, génériques, LINQ).
2. `docker` (18 ex., B2) : recours inadapté à des scripts bash lisant `stdin` pour évaluer la conteneurisation au lieu d'analyser la syntaxe Dockerfile/Compose.
3. `b3-linux` (18 ex., B3) : oracles non alignés sur les compétences d'ingénierie Linux avancée (systemd, cgroups, virtualisation).
4. `b3-github` (18 ex., B3) : simulation artificielle de commandes Git par texte brut sans dépôt réel.
5. `b1-sql` (18 ex., B1) : absence de moteur interactif SQL serveur avec flux stdin (compensé côté apprentissage par le simulateur client `sql.js`).
6. `sql` (18 ex., B2) : absence d'infrastructure SGBD interactive serveur avec stdin.
7. `b3-sql` (18 ex., B3) : absence d'infrastructure SGBD interactive serveur avec stdin.

*Sous-total* : `7 cours × 18 exercices = 126 exercices`.

### 2.2. Groupe 2 : La Suspension Spécifique de Méthode (1 Exercice)
- **Identifiant** : `algo-c9-e2` (Cours `b1-algo`, Chapitre 9, Exercice 2).
- **Intitulé** : Implémentation d'algorithme itératif vs récursif.
- **Défaut confirmé** : le cas de test se contente de vérifier la valeur de retour finale sans inspecter l'arbre d'appels. Un étudiant soumettant une boucle `for` triviale valide l'épreuve alors que le sujet impose expressément une fonction récursive terminale.
- **Décision** : maintien de la suspension spécifique dans `suspendedExercises['algo-c9-e2'] = 'b1-algo'`.

### 2.3. Groupe 3 : Les 227 Suspensions pour Preuves Manquantes
- **Mécanisme technique** : dans `grading-policy.js`, chaque exercice fait l'objet d'un calcul d'empreinte cryptographique :
  ```javascript
  function exerciseFingerprint(exercise) {
    return createHash('sha256').update(JSON.stringify(exercise)).digest('hex');
  }
  ```
- **Rôle du contrôle** : si le hachage SHA-256 de la fiche ne figure pas dans le dictionnaire de référence [server/exercises/grading-evidence.json](file:///home/rd/Desktop/proba/server/exercises/grading-evidence.json), la notation est automatiquement bloquée avec le message didactique :
  > *« La correction automatique de cet exercice est temporairement suspendue : les preuves de fiabilité des tests sont incomplètes ou périmées. »*
- **Portée épistémologique** : une empreinte SHA-256 garantit l'intégrité et la non-altération d'un fichier par rapport à une version de référence certifiée. Elle empêche qu'une modification sauvage d'un cas de test ne réactive silencieusement la notation sans repasser par le banc de validation formel.

---

## 3. Matrice de Réconciliation Arithmétique

Le tableau suivant récapitule la traçabilité des volumes d'exercices :

| Catégorie d'Exercices | Volume Réel | Pourcentage | Statut Notation | Statut Opérationnel |
| :--- | :---: | :---: | :--- | :--- |
| **Exercices actifs (Pilotes refondus sur supports réels)** | 56 | 4,5 % | `NOTATION_AUTORISEE` | `PUBLIE` |
| **Exercices actifs (Lots certifiés avec tests unitaires)** | 26 | 2,1 % | `NOTATION_AUTORISEE` | `PUBLIE` |
| **Exercices actifs (À vérifier didactiquement au fil de l'eau)** | 814 | 65,1 % | `NOTATION_AUTORISEE` | `PUBLIE` |
| **Sous-total Actifs** | **896** | **71,7 %** | — | — |
| **Exercices suspendus (Cours globaux : Docker, C#, B3, SQL)** | 126 | 10,1 % | `NOTATION_SUSPENDUE` | `ENTRAINEMENT_NON_NOTE` |
| **Exercices suspendus (Méthode spécifique : algo-c9-e2)** | 1 | 0,1 % | `NOTATION_SUSPENDUE` | `ENTRAINEMENT_NON_NOTE` |
| **Exercices suspendus (Preuves SHA-256 manquantes)** | 227 | 18,2 % | `NOTATION_SUSPENDUE` | `ENTRAINEMENT_NON_NOTE` |
| **Sous-total Suspendus** | **354** | **28,3 %** | — | — |
| **TOTAL GENERAL DU CATALOGUE** | **1 250** | **100,0 %** | — | — |

---

## 4. Conditions et Procédure de Réactivation Future

La réactivation de la notation sur les 354 exercices suspendus est soumise aux conditions strictes suivantes :
1. **Pour les exercices SQL (54 fiches)** : déploiement d'un bac à sable d'évaluation PostgreSQL/SQLite éphémère capable de valider les schémas et tables résultantes.
2. **Pour les exercices de commandes et systèmes (72 fiches)** : conversion des énoncés en défis de syntaxe opérationnelle validés par le moteur `command-validator.js`.
3. **Pour `algo-c9-e2`** : intégration d'une analyse statique de code (AST Acorn) vérifiant la présence effective d'un appel récursif.
4. **Pour les 227 fiches en attente d'empreinte** : exécution du banc de rejeu certifié et ajout de l'empreinte SHA-256 correspondante dans `grading-evidence.json`.
