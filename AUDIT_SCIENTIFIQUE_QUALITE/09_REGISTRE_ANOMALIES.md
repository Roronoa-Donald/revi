# Livrable 09 — Registre Détaillé des Anomalies et Preuves Reproductibles

> Répertoire d'audit : `AUDIT_SCIENTIFIQUE_QUALITE/`  
> Projet audité : `revi-cours-html`  
> Cadre d'évaluation : AERA/APA/NCME (2014), Biggs (1996), Webb (1997), Mislevy et al. (2003), NBME (2024), Hattie & Timperley (2007), CAST UDL (2024).

---

## 1. Répertoire Systématique des Anomalies Majeures

---

### ANOMALIE ANO-SEC-01 : Fuite de la Clé de Correction des QCM dans le DOM Client
- **Statut documentaire :** **Non-conformité démontrée**
- **Référentiel violé :** AERA/APA/NCME (2014) — Standard 4.0 & 6.0 (*Test Security and Integrity*).
- **Périmètre affecté :** **3 089 items QCM (100 % du corpus QCM)**, toutes pages générées sous `server/content/`.
- **Composant source :** [`scripts/course-kit.js`](file:///home/rd/Desktop/proba/scripts/course-kit.js#L377).
- **Description :** L'attribut `data-correct="1"` est injecté directement dans le code HTML statique du bouton représentant la bonne réponse.
- **Preuve reproductible :**
  ```bash
  # Commande de vérification de présence dans les pages HTML générées :
  grep -rn 'data-correct="1"' dist/ | head -n 5
  ```
  Un script d'une seule ligne exécuté dans la console DevTools du navigateur (`document.querySelectorAll('button[data-correct="1"]').forEach(b => b.click())`) valide l'intégralité du QCM avec 100 % de réussite sans lire la moindre question.
- **Conséquence :** Nullité métrologique absolue de l'auto-évaluation QCM en tant que preuve de maîtrise.

---

### ANOMALIE ANO-VAL-01 : Faux Positifs par Expansion Indiscriminée des Multiplications (`expandMul`)
- **Statut documentaire :** **Non-conformité démontrée**
- **Référentiel violé :** AERA/APA/NCME (2014) — Standard 6.1 (*Validity of Automated Scoring Algorithms*), Mislevy et al. (2003 — *Evidence Model Failure*).
- **Périmètre affecté :** **830 exercices** utilisant le mode `language: "analyse"`.
- **Composant source :** [`server/exercises/runner.js`](file:///home/rd/Desktop/proba/server/exercises/runner.js#L191).
- **Description :** La règle `s.replace(/(\d)([a-z])/g, '$1*$2')` insère aveuglément un opérateur de multiplication entre tout chiffre et toute lettre minuscule.
- **Comportement attendu :** Ne s'appliquer qu'aux variables algébriques déclarées dans un modèle d'optimisation (ex: `4x1`).
- **Comportement observé :** La chaîne `"4g"` (unité physique ou technologie réseau) est transformée en `"4*g"`. Une réponse erronée est ainsi validée comme un produit mathématique exact.
- **Preuve reproductible :**
  ```bash
  node -e '
  const { runTests } = require("./server/exercises/runner.js");
  const ex = { id: "test", language: "analyse", tests: [{ stdin: "cas:1", expected: "4*g" }] };
  runTests(ex, "", { execute: async () => ({ ok: true, status: "success", stdout: "4g", exitCode: 0 }) })
    .then(r => console.log("Faux positif reproduit :", r.results[0].ok));
  '
  # Sortie : Faux positif reproduit : true
  ```

---

### ANOMALIE ANO-VAL-02 : Faux Négatifs par Pollution des Sorties Standard (Prompt Pollution)
- **Statut documentaire :** **Non-conformité démontrée**
- **Référentiel violé :** AERA/APA/NCME (2014) — Standard 3.1 & 6.8 (*Construct-Irrelevant Variance*).
- **Périmètre affecté :** **201 exercices** de programmation avec saisie sur l'entrée standard (`b1-python`, `b1-algo`, `b1-c-cpp`, `b1-php`).
- **Composant source :** [`server/exercises/runner.js`](file:///home/rd/Desktop/proba/server/exercises/runner.js#L203) (`matchOutputs`).
- **Description :** Lorsqu'un étudiant débutant utilise `input("Message : ")` en Python, la chaîne `"Message : "` est écrite sur `sys.stdout`. Le comparateur de sortie compare l'ensemble avec la valeur attendue brute et rejette la soumission pour cause de `wrong_output`.
- **Preuve reproductible :**
  ```bash
  node -e '
  const { runTests } = require("./server/exercises/runner.js");
  const ex = { id: "test", language: "python", tests: [{ stdin: "10", expected: "20\n" }] };
  const mock = async () => ({ ok: true, status: "success", stdout: "Entrez x : 20\n", exitCode: 0 });
  runTests(ex, "", { execute: mock }).then(r => console.log("Faux négatif reproduit :", !r.results[0].ok, "motif :", r.stop.reason));
  '
  # Sortie : Faux négatif reproduit : true motif : wrong_output
  ```
- **Conséquence :** Pénalisation injuste d'étudiants ayant produit un algorithme exact, générant frustration et incompréhension.

---

### ANOMALIE ANO-CONT-01 : Inadéquation Formelle Majeure des Cours d'Outils et Systèmes (Syndrome Stdin)
- **Statut documentaire :** **Non-conformité démontrée**
- **Référentiel violé :** Biggs (1996 — *Constructive Alignment*), Webb (1997 — *Categorical Concurrence*).
- **Périmètre affecté :** **54 exercices** répartis sur [`b1-git`](file:///home/rd/Desktop/proba/server/exercises/b1-git.js), [`b3-github`](file:///home/rd/Desktop/proba/server/exercises/b3-github.js), [`docker`](file:///home/rd/Desktop/proba/server/exercises/docker.js).
- **Description :**
  - Dans **Git B1** et **GitHub B3**, l'étudiant doit écrire un script Bash qui parse des lignes de journal sur stdin au lieu d'apprendre et exécuter les commandes `git init`, `git add`, `git commit`, `git checkout`, `git rebase`.
  - Dans **Docker B2**, l'étudiant écrit un script Bash de diagnostic de `/sys/fs/cgroup` au lieu d'écrire un `Dockerfile` ou des commandes `docker run`.
- **Preuve documentaire :** Extrait du brief de `gh3-c1-e1` : *« Dans cet exercice, le script Bash lit un objet Git sur l'entrée standard et calcule son hash SHA-1... »*. L'étudiant réimplémente le moteur de stockage de Git au lieu d'utiliser Git en tant que professionnel.
- **Conséquence :** Rupture complète entre la compétence professionnelle annoncée et la tâche d'évaluation exécutée.

---

### ANOMALIE ANO-ALIGN-01 : Dévoyance Formelle des Cours Réseaux et Systèmes dans le Mode `analyse`
- **Statut documentaire :** **Non-conformité démontrée**
- **Référentiel violé :** Biggs (1996), Mislevy et al. (2003 — *Task Model Misalignment*).
- **Périmètre affecté :** **180 exercices** ([`b1-reseaux`](file:///home/rd/Desktop/proba/server/exercises/b1-reseaux.js), [`b1-ccna1`](file:///home/rd/Desktop/proba/server/exercises/b1-ccna1.js), [`b1-admin-windows`](file:///home/rd/Desktop/proba/server/exercises/b1-admin-windows.js), [`ccna`](file:///home/rd/Desktop/proba/server/exercises/ccna.js), [`b3-firewall`](file:///home/rd/Desktop/proba/server/exercises/b3-firewall.js), [`b3-pfsense`](file:///home/rd/Desktop/proba/server/exercises/b3-pfsense.js), [`b3-reseau-lan`](file:///home/rd/Desktop/proba/server/exercises/b3-reseau-lan.js), [`b3-windows-server`](file:///home/rd/Desktop/proba/server/exercises/b3-windows-server.js), [`b3-supervision`](file:///home/rd/Desktop/proba/server/exercises/b3-supervision.js), [`b3-voip`](file:///home/rd/Desktop/proba/server/exercises/b3-voip.js)).
- **Description :** Des cours d'administration réseau et système sont bridés dans un formulaire textuel statique `[Cas 1] A_COMPLETER`.
- **Preuve :** Dans CCNA1 et Réseau LAN, aucune syntaxe Cisco IOS (`enable`, `conf t`, `interface`, `ip address`) n'est évaluable ni vérifiable. Dans Windows Server, aucune cmdlet PowerShell réelle (`New-ADUser`, `Get-Service`) n'est manipulée.

---

### ANOMALIE ANO-ALIGN-02 : Réduction des Disciplines Méthodologiques et Juridiques à des Mots Isolés
- **Statut documentaire :** **Non-conformité démontrée**
- **Référentiel violé :** Biggs (1996), Webb (1997 — *Depth-of-Knowledge Consistency*).
- **Périmètre affecté :** **126 exercices** ([`b1-droit`](file:///home/rd/Desktop/proba/server/exercises/b1-droit.js), [`droit`](file:///home/rd/Desktop/proba/server/exercises/droit.js), [`b1-fr-pro`](file:///home/rd/Desktop/proba/server/exercises/b1-fr-pro.js), [`b1-anglais`](file:///home/rd/Desktop/proba/server/exercises/b1-anglais.js), [`b3-anglais`](file:///home/rd/Desktop/proba/server/exercises/b3-anglais.js), [`b1-bureautique`](file:///home/rd/Desktop/proba/server/exercises/b1-bureautique.js), [`b3-agile`](file:///home/rd/Desktop/proba/server/exercises/b3-agile.js)).
- **Description :**
  - En Droit, l'évaluation demande d'écrire le mot `responsabilite` ou `penale` au lieu de dérouler le syllogisme juridique (faits, qualification, règle, conclusion).
  - En Bureautique (Excel), l'évaluation demande de taper des nombres au lieu d'écrire de véritables formules dynamiques (`=RECHERCHEV`, `=SI`).
  - En Agile, l'évaluation demande de calculer des dérives de triangles de fer au lieu de rédiger des User Stories au format INVEST.

---

### ANOMALIE ANO-NBME-01 : Biais Systématique de Longueur de l'Option Correcte dans les QCM
- **Statut documentaire :** **Non-conformité démontrée**
- **Référentiel violé :** NBME Item-Writing Guide (6e éd., 2024, Section II, Règle 4).
- **Périmètre affecté :** **1 193 questions QCM (38,6 % du corpus analysé)**.
- **Description :** La bonne réponse est substantiellement plus longue, plus explicative et plus nuancée que les distracteurs télégraphiques.
- **Preuve :** L'analyse automatisée de `analyze_qcm.py` a isolé 1 193 items où la bonne réponse dépasse de plus de 40 % la longueur moyenne des distracteurs.

---

### ANOMALIE ANO-FEED-01 : Absence Totale de Diagnostic d'Erreur Dynamique (Feed Forward Carence)
- **Statut documentaire :** **Non-conformité démontrée**
- **Référentiel violé :** Hattie & Timperley (2007 — *The Power of Feedback*).
- **Périmètre affecté :** **1 245 exercices sur 1 250 (99,6 % de la banque)**.
- **Description :** Le moteur de notation renvoie systématiquement une chaîne vide `userMessage = ""` lors de l'échec à un test masqué, privant l'étudiant de toute indication diagnostique pour progresser.
