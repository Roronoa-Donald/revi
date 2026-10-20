# RAPPORT D'ALIGNEMENT PÉDAGOGIQUE, DIDACTIQUE ET ÉVALUATION
## Plateforme REVI-MU — Interactive Computing Education Engine
**Classification :** Rapport de Remédiation Pédagogique Approfondi  
**Défauts traités :** `PED-001`, `PED-002`, `TYPO-001`  
**Statut Global Didactique :** **ALIGNÉ, AUTHENTIQUE & DIDACTIQUEMENT CONFORME (RELEASE CANDIDATE)**

---

## 1. `PED-001` — ÉLIMINATION DU SCRIPTING FORCÉ DANS LES 14 COURS NON INFORMATIQUES

### 1.1. Cause Racine et Incohérence Pédagogique Initiale
Lors de la création de la banque d'exercices, une contrainte rigide du banc d'essai (`tests/exercises.test.js` exigeant au moins 3 exercices de code exécutable par chapitre pour l'ensemble des cours du catalogue) a provoqué une anomalie pédagogique majeure :
Dans 14 matières fondamentales non liées à la programmation (Droit, Français professionnel, Anglais, Bureautique, UI/UX Design, Ingénierie des exigences, ERP/SI, Gestion de projet Agile, Documentation technique, Études quantitatives, Veille technologique, et Masterclass Apprendre à apprendre), les étudiants étaient obligés d'écrire des scripts Bash (`read -r`, boucles `for ((i=0; ...))`, `case "$var" in`) ou des scripts Python (`import sys; sys.stdin.read()`) pour valider des notions de droit du travail, de grammaire ou de gestion d'équipe.

Un étudiant en droit ou en communication qui maîtrisait parfaitement la matière échouait à cause d'une erreur de syntaxe Bash, en violation directe du principe d'alignement constructif de Biggs.

### 1.2. Solution Didactique : Le Mode Étude de Cas (`language: 'analyse'`)
Plutôt que de supprimer purement et simplement les exercices interactifs, un véritable mode d'évaluation conceptuelle a été conçu et intégré au moteur de la plateforme :
1. **Introduction du type `analyse` :**
   Enregistré dans `server/services/execution/languages.js` avec le libellé « Étude de cas » et le mode Monaco `plaintext`.
2. **Grilles d'analyse structurées :**
   Les 252 exercices des 14 cours ont été réécrits pour fournir à l'étudiant une grille méthodologique guidée :
   ```text
   # Grille d'analyse (<id>) — <titre>
   # Complétez la réponse attendue sous chaque cas ci-dessous :

   [Cas 1 — <intitulé du cas>]
   # Données : <faits ou énoncé de la situation>
   A_COMPLETER

   [Cas 2 — <intitulé du cas>]
   # Données : ...
   A_COMPLETER

   [Cas 3 — <intitulé du cas>]
   # Données : ...
   A_COMPLETER
   ```
3. **Moteur d'évaluation sémantique par section :**
   La fonction `localRunner.runAnalyse(code, stdin)` extrait la section ciblée (`[Cas 1]`, `[Cas 2]`, `[Cas 3]`) et évalue la réponse fournie par l'étudiant sans invoquer le moindre interpréteur de programmation.
4. **Interface utilisateur adaptée :**
   Dans l'interface web (`scripts/generate-code-labs.js` et `assets/js/code-lab.js`) :
   - Les libellés « Entrée du programme » et « Sortie attendue » sont remplacés par « Cas d'exemple » et « Résolution attendue ».
   - L'icône de terminal d'invite de commande est remplacée par une icône de manuel d'étude de cas (`icon('book')`).
   - Le titre du laboratoire devient « 0. Études de cas & applications pratiques ».

### 1.3. Répartition des 14 Cours et 252 Exercices Remédiés

| Cours Remédié | Niveau | Exercices | Nature des Études de Cas Remplaçant le Bash/Python |
| :--- | :---: | :---: | :--- |
| `b1-droit` | B1 | 18 | Qualification de contrats, droits d'auteur, responsabilités civiles et pénales |
| `b1-anglais` | B1 | 18 | Termes techniques anglophones, correspondances formelles, résumés de spécifications |
| `b1-fr-pro` | B1 | 18 | Canaux de communication (Mehrabian), reformulation active, structure d'e-mails professionnels |
| `b1-bureautique` | B1 | 18 | Formules de tableur, typologies de publipostage, structuration de diapositives de synthèse |
| `droit` | B2 | 18 | Conformité RGPD, licences logicielles (GPL, MIT, Propriétaire), droit des données |
| `masterclass-apprendre` | B2 | 18 | Métacognition, répétition espacée, cartographie conceptuelle, gestion de la charge cognitive |
| `uiux` | B2 | 18 | Heuristiques de Nielsen, hiérarchie visuelle, lois de Fitts et Hick, accessibilité WCAG |
| `ingenierie-besoin` | B2 | 18 | Spécifications FURPS+, critères INVEST pour user stories, matrice de traçabilité |
| `erp-si` | B2 | 18 | Intégration comptable/stocks, workflows ERP, gouvernance et urbanisation des SI |
| `b3-anglais` | B3 | 18 | Synthèses de réunions en anglais, négociation technique, revues d'incidents (post-mortem) |
| `b3-agile` | B3 | 18 | Cérémonies Scrum, gestion de vélocité, gestion des blocages, principes Kanban |
| `b3-document-technique` | B3 | 18 | Rédaction d'architectures techniques, guides d'exploitation, documentation d'API |
| `b3-etude-quantitative` | B3 | 18 | Échantillonnage statistique, intervalles de confiance, interprétation de métriques système |
| `b3-veille` | B3 | 18 | Cartographie des sources technologiques, qualification des signaux faibles, fiches d'alerte |

---

## 2. `PED-002` — ANCRAGE DIDACTIQUE AUSUBÉLIEN & DÉCOMPRESSION DU JARGON

### 2.1. L'effet « Workgroup » et l'Analyse Pédagogique
L'audit initial a mis en évidence le phénomène dit « de parachutage de jargon » : dans le premier chapitre du cours de réseaux (`b1-reseaux`), le terme *Workgroup* (groupe de travail Windows) était utilisé comme point de départ explicatif pour des étudiants n'ayant jamais configuré de réseau local. De même, les acronymes PAN, LAN, MAN, WAN, SAN étaient introduits sans décompression préalable ni modèle mental concret.

### 2.2. Remédiation par Modélisation Cognitive (Ausubel)
Les chapitres introductifs des modules réseau et infrastructure ont été enrichis de structures d'ancrage pré-cognitives (*advance organizers*) :
1. **Modèle mental physique et analogique :**
   - Distinction claire entre les modèles d'architecture : **Poste-à-poste (P2P / pair-à-pair)** où chaque équipement est autonome, et **Client-Serveur** où les services et l'annuaire sont centralisés.
   - Présentation historique et contextuelle du Workgroup : expliqué comme une solution rudimentaire pour petits parcs bureautiques (sans autorité centrale, chaque poste gérant ses propres utilisateurs locaux), opposé à Active Directory.
2. **Décompression systématique de tous les acronymes :**
   - PAN (*Personal Area Network*) : Bluetooth, portée personnelle.
   - LAN (*Local Area Network*) : réseau local d'entreprise ou domestique.
   - WLAN (*Wireless Local Area Network*) : Wi-Fi.
   - MAN (*Metropolitan Area Network*) : réseau métropolitain inter-sites.
   - WAN (*Wide Area Network*) : réseau étendu (Internet).
   - SAN (*Storage Area Network*) : réseau de stockage dédié.
3. **Boîtes pédagogiques structurantes (*UI/UX Pro Max*) :**
   - `.box--situation` : mise en situation concrète et problème du monde réel.
   - `.box--mnemo` : astuce mnémotechnique de mémorisation.
   - `.box--pitfall` : mise en garde contre les confusions fréquentes lors des examens.

---

## 3. `TYPO-001` — NETTOYAGE DES ÉCHAPPEMENTS ET INTÉGRITÉ DES QCM

### 3.1. Éradication des Sauts de Lignes `\n` Littéraux
L'inspection systématique du code généré a éliminé les séquences `\n` mal échappées qui apparaissaient sous forme de texte brut dans les paragraphes de cours HTML (`\n<p>`, `</li>\n`, etc.).
Les blocs de code multilignes complexes (notamment les configurations Docker multi-stage dans `docker/chapitres/chapitre3.html`) ont été normalisés avec de véritables retours à la ligne respectant la coloration syntaxique.

### 3.2. Éradication des Questions QCM `undefined`
Le helper `qcm()` dans `scripts/course-kit.js` a été rendu universellement tolérant aux différentes structures de données de questions rencontrées dans l'historique du projet :
- Schéma 1 : `{ stem, opts, correct, exp }`
- Schéma 2 : `{ q, choices, answer, explanation }`
- Schéma 3 : `{ q, options, correct, exp }`

Le banc de test `tests/audit-verification.test.js` valide désormais l'analyse de plus de 500 pages HTML servies et confirme **zéro occurrence résiduelle** de `<p class="q__stem">undefined</p>`.
