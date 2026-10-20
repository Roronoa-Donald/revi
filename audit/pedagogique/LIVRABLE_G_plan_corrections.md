# LIVRABLE G — PLAN DE CORRECTION PRIORISÉ (P0, P1, P2, P3)

Les anomalies détectées lors de l'audit sont hiérarchisées selon leur criticité sur l'apprentissage réel des étudiants.

## P0 — Anomalies Critiques (Blocage d'apprentissage ou invalidité majeure)

1. **Bug critique d'affichage QCM `undefined` (13 cours affectés / 624 questions)** :
   - *Cours impactés* : `RD-RO`, `b1-admin-windows`, `b1-anglais`, `b1-architecture`, `b1-bureautique`, `b1-ccna1`, `b1-droit`, `b1-fr-pro`, `b1-merise`, `b1-projet`, `b1-reseaux`, `b1-virtualisation`, `b3-virtualisation`.
   - *Cause* : `scripts/course-kit.js:L195` lit `q.stem` alors que les modules de contenu utilisent la clé `q`.
   - *Impact* : Les énoncés de questions de QCM s'affichent littéralement `undefined`.
   - *Correctif* : Remplacer par `(q.stem || q.q)` et exécuter `npm run courses`.

2. **Défournement des exercices C# en Python (`csharp` B2)** :
   - *Cause* : `server/exercises/csharp.js` configure `language: 'python'`.
   - *Impact* : Les étudiants en programmation C# n'écrivent aucune ligne de C# exécutable.
   - *Correctif* : Intégrer un compilateur C# / runner Mono/.NET dans le service d'exécution ou compiler via WebAssembly.

3. **Cours `b1-vb-excel` inexistant (ébauche de 102 mots)** :
   - *Cause* : Chapitres non rédigés dans la refonte.
   - *Impact* : Absence de formation pratique sur Excel VBA en B1.
   - *Correctif* : Rédiger les 6 chapitres interactifs à partir de `cours B1 IT/VB Excel/support1.pdf`.

4. **Obsolescence non signalée de Windows Server 2012 R2 (`b1-admin-windows`)** :
   - *Cause* : Système arrivé en fin de support en octobre 2023.
   - *Impact* : Enseignement de versions périmées sans avertissement.
   - *Correctif* : Insérer un encadré d'avertissement EOL et moderniser les commandes pour Windows Server 2022/2025.

## P1 — Anomalies Majeures (Décalage entre objectifs annoncés et pratique)

1. **Métacode simulé en Bash/Python pour les cours non-développement** :
   - *Cours impactés* : `b1-anglais`, `b1-fr-pro`, `b1-droit`, `droit`, `b1-bureautique`, `b1-admin-windows`, `docker`, `b3-firewall`, `b3-pfsense`, etc.
   - *Impact* : Biais métacognitif où l'apprenant passe son temps à manipuler des chaînes de caractères sur l'entrée standard plutôt qu'à manipuler les véritables outils du métier.
   - *Correctif* : Introduire des simulateurs spécialisés ou des labs basés sur des environnements virtuels adaptés.

2. **Absence de persistance et de requêtes interactives réelles en SQL B2** :
   - *Cours impacté* : `sql` (B2).
   - *Impact* : Exercices en Python simulant le SQL au lieu d'interroger un véritable serveur SGBD (PostgreSQL / MariaDB).
   - *Correctif* : Déployer un bac à sable PostgreSQL ou intégrer sql.js comme sur `b1-sql`.

3. **Refonte didactique des introductions débutants et éradication de l'Effet Workgroup** :
   - *Cours prioritaires* : `b1-reseaux` (ch. 1), `b1-admin-windows` (ch. 1), `b1-architecture` (ch. 1-2), `b1-virtualisation` (ch. 1), `b1-merise` (ch. 1), `b1-sql` (ch. 1), `b3-firewall` (ch. 1).
   - *Impact* : Décrochage cognitif des étudiants novices confrontés à des analogies obsolètes (Workgroup Windows 1993), des définitions circulaires ou des prérequis système non enseignés.
   - *Correctif* : Réécrire les sections d'introduction selon le modèle d'ancrage familier (Ausubel), substituer les termes obsolètes par des concepts universels (poste-à-poste / client-serveur) ancrés sur l'expérience du quotidien (voir guide de réécriture dans `AUDIT_PREREQUIS_ET_JARGON_PARACHUTE.md`).

## P2 — Améliorations Importantes (Qualité didactique et ergonomie)

1. **Correction automatisée des 1 163 fuites typographiques `\n` et recompilation** :
   - *Périmètre impacté* : 38 fichiers sources dans `server/content/` (dont `b1-reseaux`, `b1-sql`, `b1-cyber`, `b1-robotique`, `docker`) et 92 pages HTML générées.
   - *Impact* : Affichage intempestif de séquences littérales `\n` dans le texte des cours et écrasement de snippets de code multilignes (`Dockerfile`, `Bash`) sur une seule ligne continue.
   - *Correctif* : Remplacer systématiquement `.join('\\n')` par `.join('\n')` et corriger les chaînes `<pre><code>` mal échappées dans les 38 fichiers `server/content/`, puis relancer `node scripts/generate-courses.js` (voir inventaire complet dans `AUDIT_ANOMALIES_TYPOGRAPHIQUES_ET_SLASH_N.md`).

2. **Mise en place d'un planificateur de répétition espacée** :
   - Les flashcards existent mais reposent sur la mémoire de l'élève.
   - *Correctif* : Implémenter un algorithme Leitner / SM-2 automatisé dans `assets/js/cours.js`.

3. **Rendu typographique des mathématiques** :
   - *Cours impactés* : `probabilites`, `b1-stats`, `b1-algebre`, `RD-RO`.
   - *Correctif* : Intégrer KaTeX pour le rendu des équations, matrices et intégrales au lieu de texte brut.

## P3 — Améliorations Mineures (Éditorial et finition)

1. Dé-standardiser les textes passe-partout répétés sur plus de 40 cours.
2. Homogénéiser les icônes de boîtes dans les chapitres générés.

