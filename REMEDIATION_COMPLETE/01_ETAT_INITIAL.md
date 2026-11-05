# Document 01 — État Initial du Dépôt et Réconciliation Documentaire

> **Dossier de remédiation :** `REMEDIATION_COMPLETE/`  
> **Projet :** `revi-cours-html`  
> **Date de démarrage de la remédiation :** 3 novembre 2026  
> **Branche Git dédiée :** `remediation-pedagogique-qualite`  
> **Commit de départ :** `20dc28e (version finale des cours)`

---

## 1. Contexte et Cartographie du Dépôt

Le projet `revi-cours-html` est une plateforme pédagogique universitaire et professionnelle couvrant trois années de formation en informatique (Bachelor 1, Bachelor 2, Bachelor 3).

### 1.1. État Git Initial
- **Branche d'origine :** `main`
- **Branche de remédiation isolée :** `remediation-pedagogique-qualite`
- **Derniers commits suivis :**
  - `20dc28e` : version finale des cours
  - `6052685` : feat(pedagogie): intégration de la version améliorée revi-cours-html et certification globale
  - `6370609` : feat(ui): design system latte, polices locales offline, transitions douces et audit
- **Statut de l'arbre de travail :** Arbre de travail propre avant intervention ; préservation intégrale des fichiers de travail existants et archives d'audit (`AUDIT_SCIENTIFIQUE_QUALITE/`, `refonte/`).

---

## 2. Réconciliation Exhaustive des Inventaires

L'audit préliminaire et l'audit scientifique présentaient des discordances d'inventaire qui sont désormais formellement élucidées et réconciliées :

### 2.1. Inventaire des Cours
- **Dans [`server/courses.js`](file:///home/rd/Desktop/proba/server/courses.js) (Registre canonique du serveur) :** **71 cours** déclarés.
- **Dans [`server/exercises/course-config.js`](file:///home/rd/Desktop/proba/server/exercises/course-config.js) (Cours dotés d'ateliers de code) :** **68 cours** configurés.
- **Écart réconcilié (3 cours sans ateliers de code) :**
  1. `preparation-web` : Section spéciale protégée par mot de passe (sans atelier de code).
  2. `epreuves` : Section d'annales d'examens et sujets PDF (sans atelier de code).
  3. `b1-vb-excel` : Dossier historique remplacé pédagogiquement par `b1-bureautique`.

### 2.2. Répartition Curriculaire des 68 Cours Configurés
- **Bachelor 1 (B1) : 23 cours**
  - Programmation & Algo : `b1-python`, `b1-c-cpp`, `b1-algo`, `b1-php`, `b1-prog-web`.
  - Mathématiques & Stats : `b1-algebre`, `b1-stats`.
  - Systèmes & Réseaux : `b1-linux`, `b1-git`, `b1-reseaux`, `b1-ccna1`, `b1-admin-windows`, `b1-virtualisation`, `b1-architecture`.
  - Données & Ingénierie : `b1-sql`, `b1-merise`, `b1-cyber`, `b1-robotique`, `b1-projet`.
  - Communication & Droit : `b1-droit`, `b1-anglais`, `b1-fr-pro`, `b1-bureautique`.
- **Bachelor 2 (B2) : 22 cours**
  - Programmation & Frameworks : `php`, `rd_java`, `react`, `api-rest-flask`, `csharp`, `assembleur`.
  - Systèmes, Réseaux & Infra : `linux`, `rd_winserver`, `admin-vm`, `ccna`, `docker`.
  - Mathématiques & Optimisation : `probabilites`, `RD-RO`.
  - Sécurité, Données & Modélisation : `Cyber securite B2`, `sql`, `uml`.
  - Management & Design : `droit`, `erp-si`, `ingenierie-besoin`, `masterclass-apprendre`, `uiux`, `infographie`.
- **Bachelor 3 (B3) : 23 cours**
  - Cloud, Systèmes & Infra : `b3-cloud-computing`, `b3-devops`, `b3-firewall`, `b3-github`, `b3-linux`, `b3-pfsense`, `b3-reseau-lan`, `b3-windows-server`, `b3-cloud-azure`, `b3-google-cloud`, `b3-cloud-aws`, `b3-supervision`, `b3-voip`, `b3-virtualisation`.
  - Algorithmique & Données : `b3-algo`, `b3-sql`.
  - Sécurité & Méthodes : `b3-cryptographie`, `b3-hacking`, `b3-agile`, `b3-etude-quantitative`.
  - Communication & Synthèse : `b3-document-technique`, `b3-veille`, `b3-anglais`.

### 2.3. Décompte Exact des 1 250 Exercices d'Atelier
Tous les cours comportent 18 exercices (6 chapitres $\times$ 3 exercices), à l'exception de 4 cours spécifiques :
- `b1-c-cpp` : 8 chapitres $\times$ 3 = 24 exercices.
- `b1-php` : 8 chapitres $\times$ 3 = 24 exercices.
- `b1-algo` : 10 chapitres $\times$ 3 = 30 exercices.
- `RD-RO` : 6 chapitres, avec 4 exercices aux chapitres 5 et 6 (Ordonnancement et Crashing) = 20 exercices.
- **Total B1 :** $19 \times 18 + 24 + 24 + 30 = 420 + 18 = 438$ exercices.
- **Total B2 :** $21 \times 18 + 20 = 378 + 20 = 398$ exercices.
- **Total B3 :** $23 \times 18 = 414$ exercices.
- **Total Général :** $438 + 398 + 414 = \mathbf{1\,250}$ exercices.

### 2.4. Inventaire des Items QCM
- **Total :** **3 089 items QCM structurés** identifiés dans `server/content/`.
- **Anomalie critique initiale :** 100 % des boutons d'options comportent la présence de `data-correct="1"` directement dans le DOM HTML généré.

---

## 3. Architecture Technique Initiale et Verrous d'Intégrité

1. **Moteur de notation (`server/exercises/runner.js`) :**
   - Centralise l'exécution séquentielle des tests, la normalisation des sorties et l'attribution des scores.
   - Présente des défaillances reproductibles :
     * Faux négatif sur invite `input()` en programmation.
     * Faux positif via `expandMul` (transformant `4g` en `4*g`).
     * Rejet des flottants IEEE-754 sans champ `tolerance`.
     * Absence systématique de message d'explication sur échec (`userMessage = ""`).
2. **Filet de sécurité d'intégrité (`server/exercises/grading-runtime-evidence.json`) :**
   - Bloque la notation automatique en mode suspendu si l'empreinte SHA-256 de `runner.js`, `services/execution/index.js`, `routes/exercises.js`, `method-check.js` ou `method-probe.py` ne correspond pas exactement aux condensats pré-calculés.
   - Toute modification de ces fichiers centraux impose impérativement le recalcul et la mise à jour synchronisée de ce registre d'intégrité.
