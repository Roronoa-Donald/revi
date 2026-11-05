# Livrable 01 — Réconciliation Mathématique et Exhaustive des Périmètres

> Répertoire de livraison : `CONSOLIDATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Date de certification : 3 novembre 2026  
> Statut : Document métrologique officiel  

---

## 1. Arithmétique Globale et Réconciliation Biunivoque

Le tableau suivant établit la concordance absolue entre les structures de données du code source, les fichiers de configuration, les générateurs statiques et les registres de consolidation :

| Entité Métrologique | Volume Certifié | Décomposition Précise | Source de Données Principale | Outil de Contrôle |
| :--- | :--- | :--- | :--- | :--- |
| **Cours administrés** | **71 cours** | 68 avec ateliers de code + 3 sections spéciales | [courses.js](file:///home/rd/Desktop/proba/server/courses.js) | `Object.keys(COURSES).length` |
| **Ateliers de code** | **68 cours** | 24 B1 + 22 B2 + 22 B3 (hors sections sans labo) | [course-config.js](file:///home/rd/Desktop/proba/server/exercises/course-config.js) | `npm run labs:check` |
| **Cours compilés** | **64 cours** | 68 cours avec ateliers moins 4 cours manuscrits | [generate-courses.js](file:///home/rd/Desktop/proba/scripts/generate-courses.js) | `npm run courses:check` |
| **Cours manuscrits** | **4 cours** | `b1-python`, `b1-c-cpp`, `b1-algo`, `b1-php` | Répertoires racines dédiés | Inspection d'arborescence |
| **Pages HTML générées** | **832 pages** | 64 cours compilés x 13 pages par cours | Répertoire racine des cours | `npm run courses:check` |
| **Exercices au catalogue** | **1 250 exercices** | 896 actifs (71,7 %) + 354 suspendus (28,3 %) | [server/exercises/index.js](file:///home/rd/Desktop/proba/server/exercises/index.js) | `02_REGISTRE_EXERCICES.csv` |
| **Banque totale de QCM** | **3 089 items** | 2 829 chapitres + 260 examens sommatifs | [server/content/](file:///home/rd/Desktop/proba/server/content/) | `03_REGISTRE_QCM_COMPLET.json` |
| **QCM pour revue humaine** | **184 items** | 78 négatifs + 46 toutes/aucune + 32 faibles + 28 asymétries | [03_REGISTRE_QCM_COMPLET.json](file:///home/rd/Desktop/proba/CONSOLIDATION_REMEDIATION/03_REGISTRE_QCM_COMPLET.json) | [04_RECONCILIATION_184_QCM.md](file:///home/rd/Desktop/proba/CONSOLIDATION_REMEDIATION/04_RECONCILIATION_184_QCM.md) |

---

## 2. Décomposition Détaillée du Périmètre des Cours (71 Cours)

La plateforme gère 71 unités d'enseignement répertoriées dans le registre central `server/courses.js`. Ces unités se divisent en deux groupes fonctionnels :

### 2.1. Les 68 Cours avec Ateliers de Code et Laboratoires
Chaque cours dispose d'une configuration d'ateliers dans `server/exercises/course-config.js`, associant un identifiant de préfixe (`idPrefix`), un nombre de chapitres (généralement 6) et un catalogue d'exercices :
- **Cycle Bachelor 1 (24 cours)** : `b1-admin-windows`, `b1-algebre`, `b1-algo` *(manuscrit)*, `b1-anglais`, `b1-architecture`, `b1-bureautique`, `b1-c-cpp` *(manuscrit)*, `b1-ccna1`, `b1-cyber`, `b1-droit`, `b1-fr-pro`, `b1-git`, `b1-linux`, `b1-merise`, `b1-php` *(manuscrit)*, `b1-prog-web`, `b1-projet`, `b1-python` *(manuscrit)*, `b1-reseaux`, `b1-robotique`, `b1-sql`, `b1-stats`, `b1-virtualisation`, `assembleur` (rattaché B1/B2 selon maquette).
- **Cycle Bachelor 2 (22 cours standards)** : `admin-vm`, `api-rest-flask`, `ccna`, `csharp`, `Cyber securite B2`, `docker`, `droit`, `erp-si`, `infographie`, `ingenierie-besoin`, `linux`, `masterclass-apprendre`, `php`, `probabilites`, `rd_java`, `rd_winserver`, `RD-RO`, `react`, `sql`, `uiux`, `uml`.
- **Cycle Bachelor 3 (22 cours standards)** : `b3-agile`, `b3-algo`, `b3-anglais`, `b3-cloud-aws`, `b3-cloud-azure`, `b3-cloud-computing`, `b3-cryptographie`, `b3-devops`, `b3-document-technique`, `b3-etude-quantitative`, `b3-firewall`, `b3-github`, `b3-google-cloud`, `b3-hacking`, `b3-linux`, `b3-pfsense`, `b3-reseau-lan`, `b3-sql`, `b3-supervision`, `b3-veille`, `b3-virtualisation`, `b3-windows-server`, `b3-voip`.

### 2.2. Les 3 Sections Spéciales sans Ateliers de Code
1. `preparation-web` : module réservé B2 avec clé et mot de passe, dédié aux fondamentaux web (HTML/CSS/JS/API), servi via `server/routes/preparation.js`.
2. `epreuves` : banque d'épreuves et d'annales PDF d'examens surveillés, protégée par le middleware d'accès.
3. `b1-vb-excel` : support bureautique avancé orienté macros VBA sans moteur d'exécution serveur.

Formule de fermeture : `68 cours à ateliers + 3 sections spéciales = 71 cours gérés`.

---

## 3. Décomposition des Pages Compilées (832 Pages)

Le script de compilation de gabarit `scripts/generate-courses.js` opère sur 64 cours standardisés. Chaque cours compilé génère rigoureusement 13 pages web :
- 1 page d'accueil / sommaire (`index.html`)
- 6 pages de cours magistral et synthèse (`cours1.html` à `cours6.html`)
- 6 pages d'ateliers pratiques et de révision (`lab1.html` à `lab6.html`)
- *Calcul* : `64 cours × 13 pages = 832 pages HTML`.
- Les 4 cours manuscrits (`b1-python`, `b1-c-cpp`, `b1-algo`, `b1-php`) maintiennent leur propre structure statique et ne font pas l'objet d'une génération automatique.

Le contrôle d'intégrité exécuté par `npm run courses:check` valide que les 832 fichiers générés sur disque sont strictement conformes aux modules de contenu `server/content/`.

---

## 4. Décomposition du Volume d'Exercices (1 250 Exercices)

Le catalogue `server/exercises/index.js` charge 1 250 fiches d'exercices uniques. La politique de suspension de notation `server/exercises/grading-policy.js` segmente le volume en deux régimes d'évaluation :

### 4.1. Exercices Actifs en Notation Sommative : 896 Exercices (71,7 %)
Ces exercices disposent d'un validateur fonctionnel et de tests certifiés. L'évaluation est prise en compte dans le carnet de notes de l'étudiant.

### 4.2. Exercices Suspendus de Notation : 354 Exercices (28,3 %)
La suspension est une mesure conservatoire de protection métrologique. Les énoncés restent consultables en mode entraînement libre, mais la notation officielle est verrouillée. Ces 354 fiches se répartissent en 3 motifs distincts et vérifiables :
1. **Suspension globale par cours (126 exercices)** : 7 cours suspendus dans leur intégralité (7 x 18 = 126 exercices) :
   - `csharp` (18 ex) : refonte des oracles mono/multi-fichiers.
   - `docker` (18 ex) : inadaptation des tests basés sur `stdin` pour la syntaxe Dockerfile/Compose.
   - `b3-linux` (18 ex) : harmonisation avec le modèle de validation déterministe.
   - `b3-github` (18 ex) : suppression des scripts simulant l'API Git en texte brut.
   - `b1-sql` (18 ex) : absence de moteur interactif serveur avec STDIN ; migration vers le simulateur client sql.js.
   - `sql` (18 ex) : absence de moteur interactif serveur avec STDIN.
   - `b3-sql` (18 ex) : absence de moteur interactif serveur avec STDIN.
2. **Suspension spécifique de méthode (1 exercice)** :
   - `algo-c9-e2` (`b1-algo`) : le test unitaire automatisé n'impose pas la démarche algorithmique itérative formulée dans l'énoncé.
3. **Suspension de fiabilité pour preuves manquantes (227 exercices)** :
   - Exercices actifs au catalogue dont l'empreinte cryptographique SHA-256 n'est pas encore consignée dans `grading-evidence.json`.
- *Somme exacte* : `126 + 1 + 227 = 354 exercices suspendus`.
- *Total catalogue* : `896 actifs + 354 suspendus = 1 250 exercices`.

---

## 5. Décomposition de la Banque QCM (3 089 Items)

La banque de questions à choix multiples totalise 3 089 items répartis entre l'évaluation formative continue et l'évaluation sommative certificative :

```
                  BANQUE QCM GLOBALE (3 089 Items)
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
QCM DE CHAPITRES (2 829 Items)              QCM D'EXAMENS (260 Items)
- 64 cours compilés                         - 26 cours avec simulateurs
- Chapitres 1 à 6                           - 10 items sommatifs par cours
- Évaluation formative continue             - Absence de corrigé dans DOM
- /api/qcm/verify                           - /api/qcm/session/start
```

### 5.1. QCM de Chapitres : 2 829 Items
Extraits des fichiers `server/content/*/chapitres-1-3.js` et `chapitres-4-6.js`. Ils accompagnent les leçons sous forme de quiz interactifs d'auto-évaluation.

### 5.2. QCM de Simulateurs d'Examens : 260 Items
Présents dans les modules `pages.js` ou `pages/examens-exercices.js` de 26 cours clés (7 cours B2 + 19 cours B1). Chaque examen comprend exactement 10 questions sommatives (26 x 10 = 260 items).

### 5.3. Items Signalés pour Revue Humaine : 184 Items (6,0 %)
Identifiés par application des directives internationales NBME 2024 / Haladyna. Ces 184 questions font l'objet d'une traçabilité individuelle dans `03_REGISTRE_QCM_COMPLET.json` et d'une analyse comparative détaillée dans `04_RECONCILIATION_184_QCM.md`.
