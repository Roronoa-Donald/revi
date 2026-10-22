# 05 — Note de Décision Préalable : Les 52 Cours en Mode `data-language="analyse"` (`05-decision-analyse.md`)

> **Statut** : Document d'aide à la décision chiffré. **Aucune modification n'est exécutée** tant que vous n'avez pas choisi entre les **Options A, B ou C** (avant le lancement du Lot 3).

## 1. État des Lieux Exact et Vérifié (Mission B6)

Sur les **68 cours actifs** de la plateforme (`1 250` exercices répartis dans `416` chapitres) :
- **16 cours (312 exercices)** exécutent réellement du code :
  - Python 3 (`b1-algo`, `b1-python`, `api-rest-flask`, `b3-algo`) ;
  - C / C++ (`b1-c-cpp`) ;
  - PHP (`b1-php`, `php`) ;
  - JavaScript (`b1-prog-web`, `react`) ;
  - Java (`rd_java`) ;
  - Bash / Shell (`b1-linux`, `b1-git`, `b1-admin-windows`, `linux`) ;
  - PowerShell (`rd_winserver`, `admin-vm`).
- **52 cours (938 exercices)** sont aujourd'hui en mode statique `data-language="analyse"` (évalués par `runAnalyse()` dans `server/services/execution/local-runner.js:L208-L297`). Ces 52 cours présentent **trois pathologies techniques et pédagogiques simultanées** :
  1. **Divulgation de 100 % des tests cachés (`938 / 938` exercices)** : Les entrées des 3 tests de validation (`[Cas 1]`, `[Cas 2]`, `[Cas 3]`) sont pré-remplies en clair dans `data-lab-starter`.
  2. **Bouton « Exécuter » cassé (`938 / 938` exercices)** : `data-lab-starter` ne contient aucun bloc `[Exemple]` (`0 / 938`), de sorte qu'un clic sur « Exécuter » (qui compare la sortie au seul cas d'exemple visible) échoue systématiquement même lorsque l'étudiant a rempli les 3 cas avec les réponses exactes du corrigé.
  3. **484 lignes contradictoires (`281` dans les chapitres + `203` dans `exercices.html`/`atelier.html`)** : Les objectifs (ex. *« développer en Python 3… »* dans 22 cours B3), les énoncés (`Entrée STDIN`, `module ipaddress`, `usable_hosts`) et les indices (`split(";")`, `ipaddress.ip_network`) ordonnent encore d'écrire du code Python ou Bash alors que l'éditeur attend une grille de texte statique.

Or ces **52 cours** regroupent en réalité **trois familles pédagogiquement très différentes** :
- **Groupe 1 — Cours de programmation et de langage de requête (5 cours, 90 exercices)** :
  - `csharp` (B2, 18 ex.) — alors que l'examen officiel B2 (`Recueil_Epreuves_2024_2025.pdf` p. 13–14) est une épreuve écrite de **3h de code C# POO** ;
  - `b1-sql` (B1, 18 ex.), `sql` (B2, 18 ex.), `b3-sql` (B3, 18 ex.) — alors que la plateforme embarque déjà un moteur SQLite WebAssembly (`/assets/js/engines/sql-wasm-engine.js`) ;
  - `assembleur` (B2, 18 ex.).
- **Groupe 2 — Cours d'ingénierie système, réseau, conteneurs, cybersécurité et calcul scientifique (24 cours, 434 exercices)** :
  - Systèmes / Conteneurs / DevOps (5 cours) : `docker` (B2), `b3-linux`, `b3-devops`, `b3-github`, `b3-windows-server` ;
  - Réseaux & Sécurité (9 cours) : `b1-reseaux`, `b1-ccna1`, `ccna`, `b3-reseau-lan`, `b3-firewall`, `b3-pfsense`, `b3-voip`, `b1-cyber`, `Cyber securite B2`, `b3-cryptographie`, `b3-hacking` ;
  - Cloud, Virtualisation, Hardware & Supervision (6 cours) : `b1-architecture`, `b1-robotique`, `b1-virtualisation`, `b3-virtualisation`, `b3-cloud-computing`, `b3-cloud-aws`, `b3-cloud-azure`, `b3-google-cloud`, `b3-supervision` ;
  - Mathématiques & Recherche opérationnelle (4 cours) : `b1-algebre`, `b1-stats`, `probabilites`, `RD-RO`.
- **Groupe 3 — Cours de modélisation, gestion, droit, langues et méthodologie (20 cours, 360 exercices)** :
  - `b1-merise`, `uml`, `b1-droit`, `droit`, `b1-anglais`, `b3-anglais`, `b1-fr-pro`, `b1-bureautique`, `b1-projet`, `erp-si`, `ingenierie-besoin`, `masterclass-apprendre`, `uiux`, `infographie`, `b3-agile`, `b3-document-technique`, `b3-etude-quantitative`, `b3-veille`.

---

## 2. Comparaison Chiffrée des Trois Options (A, B, C)

| Critère de décision | Option A — Tout restaurer en code exécutable (Python, Bash, SQL, C#) | Option B — Tout assumer en grilles d'analyse (`analyse`) | Option C — Hybride par nature disciplinaire *(Recommandée)* |
| :--- | :--- | :--- | :--- |
| **Principe directeur** | Revenir à des scripts exécutables (`python`, `shell`, `sql`, `csharp`) sur les 52 cours (ou sur les 32 cours techniques/maths) en restaurant des tests `stdin/stdout` cachés. | Conserver `data-language="analyse"` sur les 52 cours, mais réparer le moteur `runAnalyse()` (bloc `[Exemple]` + vrais cas cachés) et purger les **484 lignes** de résidus Python/Bash. | **1.** Exécution réelle pour les cours de code/requêtes/CLI (`csharp`, `b1-sql`, `sql`, `b3-sql`, `b3-linux`, `b3-github`, `docker`, et optionnellement scripts Python d'automatisation B3 avec starter pré-rempli).<br>**2.** Grilles d'analyse réparées et purgées de tout résidu Python/Bash pour les cours de droit, langues, gestion, modélisation et architecture conceptuelle. |
| **Fichiers à toucher** | - `server/exercises/` : **52 catalogues** (938 exercices à réécrire avec `starter` de code, `tests[].stdin` réels et `solution` exécutable)<br>- `server/services/execution/` : ajout du runner C# (`dotnet`/Mono ou Piston) et SQL (`sql-wasm-engine.js` / `sqlite3`)<br>- Régénération des **416 chapitres**. | - `server/services/execution/local-runner.js` (`runAnalyse`, `L208-L297`) : gérer `[Exemple]` séparément de `[Cas 1..3]`<br>- `server/content/` & `server/exercises/` : purger les **281 lignes** en chapitres + **203 lignes** dans `exercices.html`/`atelier.html`<br>- Régénération des **52 cours** (312 chapitres + 52 pages `exercices.html`). | - **Volet Code/SQL (7 à 12 cours, 126 à 216 ex.)** : `server/exercises/{csharp,b1-sql,sql,b3-sql,b3-linux,b3-github,docker}.js` + connexion SQLite/C#<br>- **Volet Études de cas (40 à 45 cours, 722 à 812 ex.)** : correction de `local-runner.js` + purge des 484 lignes contradictoires dans `server/content/` et `server/exercises/`. |
| **Outils d'exécution nécessaires** | Interpréteurs `python3`, `bash`, `sqlite3` (ou WASM client), et compilateur C# (`mcs` / `dotnet` ou API Piston) sur le serveur d'exécution. | Aucun nouvel exécutable serveur (validation textuelle et numérique par `local-runner.js`). | `sqlite3` / `sql-wasm-engine.js` (déjà présent dans `/assets/js/engines/`), `bash` (déjà présent), `python3` (déjà présent), et runner C# pour `csharp`. |
| **Effet pédagogique sur l'étudiant** | - **Positif** sur C#, SQL et Linux.<br>- **Très négatif (« Usurpation Bash/Python »)** sur le Droit, l'Anglais, le Français pro, l'Agile, MERISE, UML ou le réseau B1 : un étudiant de Droit ou de CCNA1 échoue à nouveau à cause d'une erreur de `split(";")` ou de boucle `for` en Bash au lieu d'être évalué sur le droit ou le réseau ! | - **Positif** sur le Droit, l'Anglais, la Gestion, MERISE/UML et les calculs guidés.<br>- **Inacceptable (S0)** sur **`csharp` (B2)** (l'étudiant va à un examen écrit de 3h de code C# sans avoir jamais écrit une classe C#) et sur **`b1-sql` / `sql` / `b3-sql`** (3 ans de cours SQL sans écrire une seule requête `SELECT` ou `JOIN`). | **Optimal sur chaque discipline** : l'étudiant écrit de vraies requêtes SQL en cours de SQL, du vrai code C# en cours de C#, de vraies commandes/scripts en Linux Avancé, et résout de vraies études de cas métier (sans parasite Python/Bash) en Droit, Anglais, Management, Architecture et Réseaux. |
| **Risques techniques & sécurité** | **Élevé** : exécution de processus supplémentaires côté serveur (timeout, mémoire, sandboxing C#/SQL) et risque de recréer le défaut « Format over Understanding » sur les matières non-code. | **Faible** sur le plan serveur, mais **risque académique élevé** d'échec des étudiants B2 aux épreuves officielles de programmation C# et de bases de données SQL. | **Maîtrisé** : réutilise les moteurs déjà présents et testés dans le dépôt (`sql-wasm-engine.js`, `bash`, `python3`) et limite les nouveaux runners au seul cours `csharp`. |
| **Effort estimé** | **XL** (938 exercices à re-scripter et tester) | **M** (1 runner + 484 lignes à purger dans 52 cours) | **L** (126 exercices restaurés en SQL/C#/Shell + 1 runner `runAnalyse` réparé + 484 lignes purgées) |

---

## 3. Recommandation Argumentée de l'Auditeur

Je vous recommande l'**Option C (Hybride par nature disciplinaire)**, structurée en deux règles simples et lisibles pour l'étudiant :

1. **Restaurer de vrais exercices de code / requêtes sur les cours dont le langage EST l'objet même du cours** :
   - **`b1-sql`, `sql` (B2), `b3-sql` (B3)** : faire écrire et exécuter de vraies requêtes SQL (`SELECT`, `JOIN`, `GROUP BY`, `CREATE TABLE`, `OVER (PARTITION BY ...)`) via le moteur SQLite déjà intégré ;
   - **`csharp` (B2)** : restaurer 18 exercices de code C# (classes, propriétés, héritage, polymorphisme, `List<T>`, exceptions) directement alignés sur l'épreuve officielle de 3h (`Recueil_Epreuves_2024_2025.pdf` p. 13–14) ;
   - **`b3-linux`, `b3-github`, `docker`** : restaurer des exercices de commandes/scripts Shell ou d'écriture de `Dockerfile` / workflows YAML évalués sur leur syntaxe réelle ;
   - *(Et en sens inverse sur `b1-admin-windows` : retirer le Bash Linux `#!/bin/bash` qui n'a rien à faire dans un cours Windows B1 pour le passer en étude de cas Windows ou PowerShell).*
2. **Assumer pleinement et réparer les grilles d'études de cas (`analyse`) sur les matières conceptuelles, juridiques, linguistiques, mathématiques et d'architecture réseau/cloud** :
   - Corriger `runAnalyse()` et `generate-code-labs.js` pour que **l'éditeur affiche le `[Exemple]`** (rendant le bouton **« Exécuter »** immédiatement fonctionnel) et un formulaire de cas propre sans divulguer les solutions ni les pièges cachés ;
   - Purger intégralement les **484 lignes** qui parlent encore de `Python 3`, `module ipaddress`, `split(";")`, `STDIN` ou `Langage : Python` dans ces cours.

**La décision vous appartient** : indiquez-moi `OPTION A`, `OPTION B` ou `OPTION C` (avec d'éventuels ajustements sur la liste des cours du volet code) lorsque vous souhaiterez lancer les corrections correspondantes.
