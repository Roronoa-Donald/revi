# Phase 6 — Gabarit Pédagogique Cible & Checklist Anti-Régression (`04-gabarit-pedagogique.md`)

Ce document définit le **gabarit minimal obligatoire** pour tous les chapitres de la plateforme « Cours Interactifs » (`revi-mu.vercel.app`), conçu pour garantir qu'un étudiant lisant la page de haut en bas pour la première fois comprenne chaque phrase, chaque exemple, chaque exercice et chaque QCM sans jamais avoir à deviner ni à chercher ailleurs (`P1` à `P8`).

## 1. Architecture Séquentielle Obligatoire d'un Chapitre (10 Blocs dans l'Ordre Strict)

### Bloc 0 — En-tête, Fil d'Ariane & Encadré « Prérequis du Chapitre » (`P7`, `C3`)
- **Rôle** : Situer l'étudiant dans le graphe de compétences avant la première ligne de cours.
- **Contenu obligatoire** :
  - Niveau (`B1` / `B2` / `B3`), numéro de module, temps de travail réaliste (ex. `≈ 1 h 30` à `2 h`), statut d'accès.
  - **Encadré `.box--prereq` (« Avant de commencer ce chapitre »)** :
    - Pour le Chapitre 1 d'un cours fondamental B1 : *« Aucun prérequis informatique : ce chapitre part de zéro. »*
    - Pour tout autre chapitre : liste de 2 à 4 acquis indispensables avec **liens cliquables directs** vers le cours ou le chapitre où ils ont été enseignés (ex. *« Avoir étudié [Chapitre 2 — Variables et types](chapitre2.html) et [CCNA 1 Ch. 3 — Adressage IPv4 et CIDR](/b1-ccna1/chapitres/chapitre3.html) »*).

### Bloc 1 — Mise en Situation Concrète (`P3`, `P4`, `C1`)
- **Longueur** : **40 à 75 mots maximum** (2 à 3 phrases courtes).
- **Règles strictes** :
  - Partir d'un **problème concret du quotidien ou de l'entreprise** que l'étudiant peut visualiser immédiatement (zéro jargon technique non défini dans la mise en situation !).
  - Cohérence interne de l'analogie du début à la fin (ne jamais commencer par « faire du thé » et finir par « préparer un plat »).
  - Interdiction absolue du vocabulaire d'emphase creux (*« cinématique », « fondations inébranlables », « vélocité », « quintessence »*).

### Bloc 2 — Objectifs Pédagogiques Mesurables (`P6`, `C2`)
- **Format** : 3 à 5 objectifs introduits par un verbe d'action mesurable de la taxonomie de Bloom révisée (*Définir, Identifier, Calculer, Tracer, Modifier, Écrire, Diagnostiquer*).
- **Règle d'alignement constructif (`P6`)** :
  - Chaque objectif annoncé **doit** avoir : (a) une section théorique dédiée, (b) un exemple résolu, (c) au moins une question de QCM ou un exercice qui l'évalue, et (d) son item symétrique dans la *Checklist de maîtrise*.
  - Ne jamais mentionner dans les objectifs un terme ou un acronyme sans l'expliquer entre parenthèses s'il est nouveau, ni annoncer un langage (`Python 3`, `IPv6`, `Pascal`) qui n'est pas réellement enseigné et pratiqué dans le chapitre.

### Bloc 3 — Glossaire de Pré-Entraînement du Chapitre (`P3`, `P4`, `C4`, `C5`)
- **Principe de Mayer (`P4` Pre-training)** : Avant d'expliquer un mécanisme complexe, présenter dans un tableau court (3 à 6 termes maximum) le nom et le rôle en mots simples des briques nouvelles du chapitre.

### Bloc 4 — Sections Théoriques en Trois Temps : « Idée → Terme → Syntaxe » (`P1`, `P2`, `P3`, `P4`, `C4`–`C7`)
Chaque section (`<h2>1. ...</h2>`) respecte invariablement la progression en **3 temps** :
1. **Temps 1 — L'Idée en mots simples (`.box--intuition` : « Niveau 1 — Intuition »)** :
   - Expliquer le *pourquoi* et le *comment* avec le vocabulaire courant et une analogie filée cohérente, sans acronyme ni syntaxe.
2. **Temps 2 — Le Terme technique et sa Définition formelle** :
   - Définir chaque terme technique, acronyme ou notation **au plus tard à sa première occurrence**.
   - **Zéro référence en avant (`D2`)** et **zéro définition circulaire (`D3`)** : une définition ne peut utiliser que des mots du français courant ou des termes déjà définis plus haut.
   - **Dosage cognitif (`P1`)** : jamais plus de **2 à 3 concepts nouveaux interdépendants** sans pause, schéma explicatif collé au texte ou mini-exemple.
3. **Temps 3 — La Syntaxe et l'Exemple Résolu Analogique (`.box--tech` : « Niveau 2 — Technique » + Exemple résolu `P2`)** :
   - Montrer la syntaxe dans le langage exact qui sera utilisé dans les exercices du chapitre (si un langage de référence d'examen comme le pseudo-code ou le Pascal cohabite avec Python, présenter un tableau de correspondance explicite ligne à ligne).
   - **Exemple résolu obligatoire (`P2` Worked Example)** : avant de passer à la section des exercices, résoudre intégralement un problème analogue à celui des exercices, avec une **table de trace** ou le détail étape par étape du calcul.

### Bloc 5 — Trois Exercices Gradués selon PRIMM (`P2`, `P5`, `C6`, `C9`)
- **Alignement du moteur d'exécution** :
  - Le langage de l'éditeur (`data-language`) doit être **identique** au langage enseigné et illustré dans le chapitre.
  - Les cours de code et de requêtes (`Algorithmique`, `Python`, `C/C++`, `PHP`, `Java`, `C#`, `JavaScript/React`, `SQL`, `Bash/Linux`, `PowerShell`) doivent utiliser un **moteur d'exécution réelle** avec de vrais tests cachés côté serveur.
  - Les cours conceptuels ou tertiaires (`Droit`, `Anglais`, `Français pro`, `Management`, `Ingénierie du besoin`, `UI/UX`) utilisant une grille d'analyse (`data-language="analyse"`) ne doivent contenir **aucune mention de Python/Bash**, doivent fournir un bloc `[Exemple]` fonctionnel pour le bouton « Exécuter », et conserver des cas de validation distincts côté serveur.
- **Progression PRIMM (`P5` Predict → Run → Investigate → Modify → Make)** :
  - **Exercice 1 (Niveau 1 — Acquisition : *Lire / Prédire / Compléter une ligne*)** : Code ou configuration à 80 % fourni et commenté ; l'étudiant complète 1 ou 2 instructions directement calquées sur l'exemple résolu du chapitre.
  - **Exercice 2 (Niveau 2 — Application : *Modifier / Adapter*)** : L'étudiant adapte une structure connue à un nouveau cas dont le format d'entrée et de sortie est illustré par un exemple concret expliqué.
  - **Exercice 3 (Niveau 3 — Raisonnement : *Créer / Combiner*)** : Résolution complète combinant les notions du chapitre (et uniquement des chapitres précédents).
- **Indices (`<details class="lab__hints">`)** :
  - Le titre du `<summary>` indique le nombre exact d'indices (`2 indices, rédigés en mots`).
  - L'indice 1 rappelle le concept ou la formule mathématique/logique ; l'indice 2 guide la structuration sans jamais donner le code de la réponse.

### Bloc 6 — QCM « Niveau Examen » avec Feedback Explicatif Complet (`P6`, `P8`, `C10`)
- **6 à 8 questions** couvrant tous les objectifs du chapitre, au niveau cognitif entraîné (compréhension/application/analyse, pas de simple par cœur d'un chemin obscur).
- **Distracteurs** : fondés sur de vraies erreurs de débutant, mais **n'employant jamais d'acronyme inconnu** non vu dans le chapitre.
- **Explication (`.q__exp`)** : explique **pourquoi la bonne réponse est vraie ET pourquoi les principaux distracteurs sont faux**.

### Bloc 7 — Erreurs Classiques à Reconnaître en Examen (`.box--pitfall`)
- 4 à 5 erreurs fréquentes, formulées sous la forme : **Symptôme / Piège → Pourquoi c'est faux → Comment l'éviter**.

### Bloc 8 — Méthodologie de Résolution Pas à Pas (`.box--method`)
- Procédure opérationnelle numérotée en 4 à 6 étapes que l'étudiant peut appliquer mécaniquement le jour de l'examen.

### Bloc 9 — Révision Active : Résumé, Checklist (= Objectifs) & 8 Notions (= 8 Flashcards) (`P6`, `P8`, `C8`, `C13`)
- **Résumé essentiel** : 4 à 6 puces synthétiques.
- **Checklist de maîtrise** : correspondance **1 pour 1** avec les Objectifs pédagogiques du Bloc 2.
- **Les 8 notions à connaître absolument** : liste numérotée contenant **exactement 8 notions** toutes définies dans le chapitre, et **toutes présentes à l'identique dans `chapitres/cartes.html`** (8 flashcards par chapitre).

### Bloc 10 — Test de Maîtrise & Navigation Continue (`C11`, `C14`)
- **Bandeau `.bands` à 5 paliers continus (zéro trou entre 0 % et 100 %)** :
  - `< 50 %` — Notions insuffisamment maîtrisées : reprends les sections 1 et 2 avec les exemples résolus.
  - `50–69 %` — Compréhension partielle : refais les exercices des niveaux 1 et 2.
  - `70–89 %` — Bonne base : retravaille l'exercice 3 et les erreurs classiques.
  - `90–94 %` — Très bonne maîtrise : vérifie la question manquée avant d'avancer.
  - `≥ 95 %` — Maîtrise : tu peux passer au chapitre suivant.

## 2. Squelette HTML de Référence (Template Standardisé)

```html
<main id="content" class="coursewrap">
  <p class="crumb"><a href="../index.html">Nom du Cours</a> › <a href="../sommaire.html">Sommaire</a> › Chapitre N</p>
  <h1>Chapitre N — Titre Clair et Explicite</h1>
  <div class="chapmeta">
    <span class="tag">Module N</span>
    <span class="tag tag--time">≈ 2 h de travail</span>
    <span class="tag tag--time">Accès libre</span>
  </div>

  <!-- BLOC 0 : PRÉREQUIS EXPLICITES -->
  <div class="box box--prereq">
    <div class="box__title">Prérequis pour suivre ce chapitre</div>
    <ul>
      <li>Maîtriser la notion X (<a href="chapitre1.html">Chapitre 1</a>) ;</li>
      <li>Connaître la base Y (<a href="/b1-algo/chapitres/chapitre2.html">Algorithmique B1 — Ch. 2</a>).</li>
    </ul>
  </div>

  <!-- BLOC 1 : MISE EN SITUATION CONCRÈTE (40-75 MOTS, ZÉRO JARGON) -->
  <div class="box box--situation">
    <div class="box__title">Mise en situation</div>
    <p>Scénario concret de 40 à 75 mots posant un problème réel sans jargon non défini.</p>
  </div>

  <!-- BLOC 2 : OBJECTIFS MESURABLES (ALIGNÉS 1:1 AVEC LA CHECKLIST) -->
  <div class="box box--objectifs">
    <div class="box__title">Objectifs pédagogiques</div>
    <p>À la fin de ce chapitre, tu seras capable de :</p>
    <ol>
      <li>Définir … ;</li>
      <li>Calculer / Tracer … ;</li>
      <li>Écrire / Configurer … .</li>
    </ol>
  </div>

  <!-- BLOC 4 : SECTION THÉORIQUE EN 3 TEMPS (IDÉE -> TERME -> SYNTAXE + EXEMPLE RÉSOLU) -->
  <h2>1. Titre de la première notion</h2>
  <div class="box box--intuition">
    <div class="box__title">Niveau 1 — Intuition</div>
    <p>Explication en mots simples avec analogie cohérente.</p>
  </div>
  <p><strong>Définition.</strong> Définition formelle précise n'utilisant que des termes connus, suivie d'un exemple.</p>
  <div class="box box--tech">
    <div class="box__title">Niveau 2 — Technique &amp; Exemple résolu</div>
    <p>Syntaxe commentée ligne par ligne et résolution pas à pas d'un cas analogue à l'exercice 1.</p>
  </div>
</main>
```

## 3. Checklist de Relecture Obligatoire Avant Publication (15 Points Anti-Régression)

Tout nouveau chapitre ou toute modification (Phase 7) doit valider **100 % des 15 contrôles suivants** avant merge :

- [ ] **1. Prérequis (`C3`)** : Le bloc « Prérequis » est présent en haut de page et chaque prérequis cité pointe vers un chapitre antérieur réellement existant.
- [ ] **2. Mise en situation (`C1`, `D8`, `D10`)** : Elle compte entre 40 et 75 mots, pose une situation concrète, garde la même analogie du début à la fin et ne contient aucun acronyme non expliqué.
- [ ] **3. Zéro référence en avant ni boucle (`C4`, `D1`, `D2`, `D3`, `D4`)** : Le script `audit/outils/extract_concepts_and_cycles.py` exécuté sur le chapitre retourne **0 terme `jamais_défini`**, **0 terme `défini_après`** et **0 cycle DFS**.
- [ ] **4. Séquence Idée → Terme → Syntaxe (`C5`, `C7`, `P3`)** : Chaque section comporte un encadré `.box--intuition` (en mots simples) avant le formalisme technique `.box--tech`.
- [ ] **5. Exemple résolu préalable (`C6`, `P2`)** : Chaque type d'exercice (calcul, trace, syntaxe de configuration, fonction) est précédé d'au moins un exemple résolu complet analogue dans le cours.
- [ ] **6. Alignement de langage Cours ↔ Exercices (`C9`, `D6`, `D8`)** : Le langage de l'éditeur (`data-language`) est strictement enseigné dans le chapitre ; le mode d'entrée/sortie (`input()`, arguments, format de chaîne) est expliqué ou pré-rempli dans le code de départ (`data-lab-starter`).
- [ ] **7. Progression PRIMM (`C9`, `P5`)** : L'exercice 1 fait lire/compléter un code guidé, l'exercice 2 fait modifier/adapter, l'exercice 3 fait rédiger.
- [ ] **8. Intégrité des tests cachés (`C9`, `D8`)** : Les entrées des tests cachés (`server/exercises/`) ne sont jamais copiées en clair dans `data-lab-starter`, et le bouton « Exécuter » fonctionne sur le cas d'exemple affiché.
- [ ] **9. Cohérence des indices (`C8`, `D8`, `D14`)** : Le nombre de `<li>` dans `.lab__hints` correspond au titre du `<summary>`, et les indices guident en français sans donner le code ni contredire le mode de l'exercice.
- [ ] **10. Qualité des QCM (`C10`, `D7`, `D9`, `P8`)** : Chaque énoncé et option de QCM n'admet qu'une seule interprétation raisonnable, aucun distracteur n'utilise un acronyme inconnu, et `.q__exp` justifie pourquoi la bonne réponse est vraie et pourquoi les distracteurs sont faux.
- [ ] **11. Alignement Objectifs = Contenu = Exercices = QCM = Checklist (`C2`, `C11`, `D8`, `D9`, `P6`)** : Chaque objectif du Bloc 2 est effectivement enseigné dans le cours, entraîné en exercice/QCM et repris dans la Checklist de maîtrise.
- [ ] **12. Cohérence des 8 notions et des Flashcards (`C8`, `C13`)** : La liste « Les 8 notions à connaître absolument » compte exactement 8 items et ces 8 items figurent dans `chapitres/cartes.html`.
- [ ] **13. Seuils du test de maîtrise complets (`C11`, `D8`, `D15`)** : Le bloc `.bands` affiche explicitement les 5 plages couvrant 0 à 100 % sans trou (`< 50 %`, `50–69 %`, `70–89 %`, `90–94 %`, `≥ 95 %`).
- [ ] **14. Homogénéité du ton et du pronom (`C8`, `D13`)** : Aucun mélange `tu` / `vous` dans la page (tutoiement pédagogique uniforme ou vouvoiement uniforme du titre jusqu'aux exercices).
- [ ] **15. Propreté technique et liens (`C12`, `C14`, `D12`, `D15`)** : 0 virgule parasite (`,<ul>,`), 0 séquence littérale `\n`, 0 double échappement `&amp;amp;`, 0 lien 404 dans la navigation ou le catalogue d'exercices, et formules techniques vérifiées sur les RFC/documentations officielles.
