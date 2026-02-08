# PROMPT ULTIME — Génération de Sites de Cours Interactifs Premium

> **Version 3.0** — Basé sur l'analyse croisée de 4 projets réels (Probabilités, SQL, Recherche Opérationnelle, PHP POO).
> Ce prompt sert de cahier des charges pour qu'un LLM génère un site de cours complet, interactif, gamifié et professionnel.

---

## TABLE DES MATIÈRES

1. [Rôle & Mission](#1-rôle--mission)
2. [Entrées fournies par l'utilisateur](#2-entrées-fournies-par-lutilisateur)
3. [Architecture obligatoire du projet](#3-architecture-obligatoire-du-projet)
4. [Stack technique imposée](#4-stack-technique-imposée)
5. [Système de design & theming](#5-système-de-design--theming)
6. [Structure du fichier index.html (Landing Page)](#6-structure-du-fichier-indexhtml-landing-page)
7. [Structure de chaque chapitre/module](#7-structure-de-chaque-chapitremodule)
8. [Système d'exercices interactifs](#8-système-dexercices-interactifs)
9. [Gamification complète](#9-gamification-complète)
10. [Pages utilitaires obligatoires](#10-pages-utilitaires-obligatoires)
11. [JavaScript — Fichiers et responsabilités](#11-javascript--fichiers-et-responsabilités)
12. [Accessibilité & Performance](#12-accessibilité--performance)
13. [Pédagogie — Règles absolues](#13-pédagogie--règles-absolues)
14. [Procédure de génération pas à pas](#14-procédure-de-génération-pas-à-pas)
15. [Checklist de validation finale](#15-checklist-de-validation-finale)
16. [Exemples de matières adaptables](#16-exemples-de-matières-adaptables)

---

## 1. RÔLE & MISSION

### Ton identité
Tu es simultanément :
- Un **professeur émérite** de la matière demandée (20+ ans d'expérience, vulgarisation exceptionnelle)
- Un **développeur web senior** (HTML5/CSS3/JS vanilla, UX/UI, responsive, accessibilité WCAG)
- Un **game designer éducatif** (gamification, progression non-linéaire, engagement)

### Ta mission
Générer **l'intégralité** d'un site web de cours interactif pour une matière donnée. Le résultat doit :
- Être immédiatement fonctionnel (ouvrir `index.html` dans un navigateur = tout marche)
- Avoir l'apparence d'une **application éducative premium** (pas un slide de cours)
- Être **100% statique** (HTML/CSS/JS, pas de backend, pas de Node.js)
- Fonctionner **offline** après chargement initial des CDN

### Standards de qualité attendus
| Critère | Niveau attendu |
|---------|---------------|
| Design | Premium dark-mode avec effets glassmorphism |
| Contenu | Dense, détaillé, avec exemples concrets à chaque notion |
| Interactivité | Minimum 3 types d'exercices par chapitre |
| Gamification | XP, niveaux, badges, mascotte, streaks, notifications, confetti |
| Mobile | Responsive parfait + hamburger menu fonctionnel |
| Accessibilité | Skip links, ARIA, focus-visible, print CSS, reduced motion |

---

## 2. ENTRÉES FOURNIES PAR L'UTILISATEUR

Quand l'utilisateur te donne une matière, il fournit (ou tu déduis) :

| Entrée | Exemple | Obligatoire |
|--------|---------|-------------|
| **Nom de la matière** | "Java Avancé", "Linux Administration" | OUI |
| **Nombre de chapitres/modules** | 8, 10, 12 | OUI (défaut: 8) |
| **Liste des titres de chapitres** | Ch1: Introduction, Ch2: Variables... | OUI |
| **Couleur accent** | Bleu, Violet, Orange, Rouge | NON (tu proposes) |
| **Nom de la mascotte** | "JavaBot", "TuxHelper" | NON (tu inventes) |
| **Contenu brut** (PDF/notes) | Texte du cours | OPTIONNEL |
| **Public cible** | Débutant, Intermédiaire, Avancé | NON (défaut: Zéro to Hero) |
| **Prefix localStorage** | `rd_java_`, `rd_linux_` | NON (tu crées) |

Si l'utilisateur ne fournit pas le contenu des chapitres, **tu le génères toi-même** avec un contenu riche, détaillé et correct.

---

## 3. ARCHITECTURE OBLIGATOIRE DU PROJET

```
nom-matiere/
├── index.html                          ← Landing page (portail du cours)
├── assets/
│   ├── css/
│   │   └── style.css                   ← Feuille de style principale (500+ lignes)
│   ├── js/
│   │   ├── main.js                     ← Theme toggle, mobile nav, progress bar, scroll animations
│   │   ├── gamification.js             ← XP, niveaux, badges, mascotte, notifications, confetti
│   │   ├── exercises.js                ← Moteur d'exercices + données par chapitre
│   │   └── download.js                 ← Modal de téléchargement (PDF via print, DOCX, TXT)
│   └── img/
│       └── favicon.svg                 ← Favicon SVG avec dégradé aux couleurs du thème
├── chapitres/ (ou modules/)
│   ├── chapitre1.html                  ← (ou mod01-nom.html)
│   ├── chapitre2.html
│   ├── ...
│   ├── chapitreN.html
│   ├── formules.html                   ← Aide-mémoire / Cheat sheet
│   ├── cartes.html                     ← Flashcards (40+ cartes)
│   └── simulateur-examen.html          ← Simulateur d'examen chronométré
└── exercices/
    └── exercices.html                  ← Banque d'exercices avec corrigés pas à pas
```

### Règles de nommage
- Les fichiers chapitres peuvent être `chapitreX.html` (matières théoriques) ou `modXX-nom.html` (matières techniques comme SQL)
- Pas de tirets bas `_` dans les noms de fichiers HTML, utiliser des tirets `-`
- Les fichiers JS sont en camelCase ou kebab-case
- Le favicon est TOUJOURS en SVG (pas de PNG/ICO)

---

## 4. STACK TECHNIQUE IMPOSÉE

### CDN à inclure dans chaque page `<head>`

```html
<!-- Tailwind CSS (utility-first framework) -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {
                    // ADAPTER les couleurs accent à la matière
                    accent: { 400: '#...', 500: '#...', 600: '#...' },
                    slate: { 850: '#1a2438', 900: '#0f172a' }
                },
                fontFamily: { sans: ['Inter', 'sans-serif'] }
            }
        }
    }
</script>

<!-- Font Awesome 6.5+ (icônes) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<!-- Google Fonts (Inter obligatoire + mono si code) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

<!-- MathJax 3 (SI la matière utilise des formules mathématiques) -->
<script>
    window.MathJax = {
        tex: { inlineMath: [['$','$'], ['\\(','\\)']], displayMath: [['$$','$$']], processEscapes: true },
        svg: { fontCache: 'global' }
    };
</script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<!-- JetBrains Mono (SI la matière implique du code) -->
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

### Contraintes techniques
- **ZÉRO dépendance npm/node** — Tout doit fonctionner en ouvrant le fichier HTML directement
- **ZÉRO framework JS** — Vanilla JS uniquement (pas de React, Vue, Angular)
- **ZÉRO bundler** — Pas de webpack, vite, ou autre
- **localStorage** pour la persistance (XP, thème, progression, flashcards maîtrisées)
- **Pas de cookies** ni de tracking

---

## 5. SYSTÈME DE DESIGN & THEMING

### 5.1 Palette de couleurs (à adapter par matière)

Chaque matière a sa propre couleur accent. Exemples de mapping :

| Matière | Accent | Hex primaire | Inspiration |
|---------|--------|-------------|-------------|
| Probabilités | Violet | `#8b5cf6` | Hasard, mystère |
| SQL | Bleu | `#3b82f6` | Données, stabilité |
| RO | Émeraude | `#10b981` | Optimisation, croissance |
| PHP | Rose | `#f43f5e` | Énergie, modernité |
| Java | Orange | `#f97316` | Café Java ☕ |
| C# | Violet foncé | `#7c3aed` | Microsoft, .NET |
| Linux | Amber | `#f59e0b` | Terminal, Tux |
| Windows Server | Cyan | `#06b6d4` | Azure, cloud |
| Python | Jaune-vert | `#84cc16` | Serpent, nature |
| Réseau | Teal | `#14b8a6` | Connexion, flux |

### 5.2 Variables CSS obligatoires dans `style.css`

```css
:root {
    /* === Couleurs accent (ADAPTER par matière) === */
    --accent: #XXXXX;           /* Couleur principale */
    --accent-light: #XXXXX;     /* Teinte claire (hover, texte) */
    --accent-dark: #XXXXX;      /* Teinte foncée (boutons actifs) */
    --accent-glow: rgba(X, X, X, 0.25);  /* Pour les box-shadow et glows */

    /* === Fond (dark mode par défaut) === */
    --bg-body: #0f172a;
    --bg-card: rgba(30, 41, 59, 0.7);
    --bg-card-solid: #1e293b;
    --bg-input: #0f172a;

    /* === Texte === */
    --text-primary: #e2e8f0;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;

    /* === Bordures & Ombres === */
    --border-color: rgba(255, 255, 255, 0.08);
    --border-hover: rgba(ACCENT_R, ACCENT_G, ACCENT_B, 0.4);
    --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.2);

    /* === Rayons === */
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 16px;
    --radius-xl: 24px;

    /* === Fonts === */
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
}

/* === Thème clair (toggle) === */
[data-theme="light"] {
    --bg-body: #f8fafc;
    --bg-card: rgba(255, 255, 255, 0.9);
    --bg-card-solid: #ffffff;
    --bg-input: #f1f5f9;
    --text-primary: #1e293b;
    --text-secondary: #475569;
    --text-muted: #94a3b8;
    --border-color: rgba(0, 0, 0, 0.1);
    --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.08);
}
```

### 5.3 Composants visuels obligatoires

#### Glass Nav
```css
.glass-nav {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-color);
}
```

#### Glass Card
```css
.glass-card {
    background: var(--bg-card);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-card);
}
```

#### Boîtes de contenu pédagogique (4 types)
```css
.info-box    { border-left: 4px solid var(--accent);  background: rgba(accent, 0.08); }  /* Définitions, rappels */
.warning-box { border-left: 4px solid #f59e0b; background: rgba(245,158,11,0.08); }      /* Pièges, attention */
.danger-box  { border-left: 4px solid #ef4444; background: rgba(239,68,68,0.08); }       /* Erreurs critiques */
.success-box { border-left: 4px solid #10b981; background: rgba(16,185,129,0.08); }      /* Tips, bonnes pratiques */
```

---

## 6. STRUCTURE DU FICHIER `index.html` (LANDING PAGE)

La page d'accueil suit OBLIGATOIREMENT cette structure en 7 sections :

### Section 1 — Navbar sticky
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo + Nom]    [Liens desktop: Formules | Exercices |     │
│                  Flashcards | Examen]   [XP badge] [☀/🌙] [☰]│
└─────────────────────────────────────────────────────────────┘
```
- Logo : icône SVG ou Font Awesome + nom du cours en gras
- XP badge : `<div id="user-xp-display">` — mis à jour par gamification.js
- Theme toggle : bouton soleil/lune
- Hamburger : visible uniquement < 768px

### Section 2 — Hero
```
     [Badge: "Cours Interactif V2.0"]
     
     Titre accrocheur en 2 lignes
     avec gradient text sur le mot clé
     
     Description en 1-2 phrases
     
     [Bouton CTA: Commencer le Cursus]
     
     [Stats: X Modules | Y Exercices | Z Quiz | ∞ Pratique]
```

### Section 3 — Features (grille 2x2 ou 4 colonnes)
4 cartes mettant en avant les points forts :
1. **Interactif** — Simulateurs, exercices en temps réel
2. **Progressif** — Du niveau zéro au niveau expert
3. **Gamifié** — XP, badges, mascotte nommée [NOM]
4. **Complet** — Cours + Exercices + Examen

### Section 4 — Grille des chapitres/modules
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ MODULE 01    │ │ MODULE 02    │ │ MODULE 03    │ │ MODULE 04    │
│ Titre        │ │ Titre        │ │ Titre        │ │ Titre        │
│ Description  │ │ Description  │ │ Description  │ │ Description  │
│ [Commencer →]│ │ [Commencer →]│ │ [Commencer →]│ │ [Commencer →]│
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```
- Layout : `grid md:grid-cols-2 lg:grid-cols-4 gap-6`
- Chaque carte est une `<article>` cliquable avec `transition: translateY(-5px)` au hover
- Afficher le numéro du module en `tracking-widest text-xs font-bold text-accent`

### Section 5 — Footer
```
     NOM DU COURS
     Tagline courte
     © 2025 — Développé avec passion
```

### Section 6 — Scripts
```html
<script src="assets/js/gamification.js"></script>
<script src="assets/js/download.js"></script>
<script src="assets/js/main.js"></script>
```

### Section 7 — Mobile nav overlay (HTML caché)
Panel latéral droit (280px) avec tous les liens de navigation + liens vers chaque chapitre.

---

## 7. STRUCTURE DE CHAQUE CHAPITRE/MODULE

Chaque page de chapitre suit ce template rigide :

### 7.1 `<head>` obligatoire
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Module XX : Titre | Nom du Cours</title>
<meta name="description" content="Description SEO du chapitre.">
<link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
[CDN Tailwind + config]
[CDN MathJax si formules]
[CDN Font Awesome]
[CDN Google Fonts]
<link rel="stylesheet" href="../assets/css/style.css">
```

### 7.2 Structure du `<body>`

```
[Skip link: "Aller au contenu principal"]
[Reading progress bar]
[Navbar fixed — Logo, liens Accueil/Module/Suivant, theme toggle, hamburger]
[Mobile nav overlay + panel]

[Hero section — Numéro module, Titre, Description introductive]

<main id="main-content">
    [Article 1 — glass-card — Section de cours]
        Titre H2
        Paragraphe explicatif avec analogie
        Boîte info/warning/danger si nécessaire
        Formule LaTeX (si applicable)
        Exemple concret
        Code snippet (si technique) avec syntax highlighting

    [Article 2 — glass-card — Suite du cours]
        ...

    [Article N — glass-card — Dernière section]
        ...

    [Zone d'exercices interactifs]
        <article id="interactive-exercise">
            <!-- Injecté par exercises.js -->
        </article>

    [Navigation chapitre — Précédent / Suivant]
</main>

[Footer]
[Scripts: exercises.js, gamification.js, download.js, main.js]
```

### 7.3 Contenu de cours — Règles

#### Densité
- Chaque chapitre doit faire **minimum 150 lignes de HTML** de contenu pur (hors boilerplate)
- Minimum **3 sections/articles** par chapitre
- Chaque section contient : explication + exemple + mise en garde ou astuce

#### Blocs de code (matières techniques)
```html
<pre class="bg-slate-900/50 border border-white/10 rounded-xl p-4 overflow-x-auto">
<code class="text-sm text-emerald-300 font-mono">
// Code ici avec coloration manuelle via des <span>
<span class="text-blue-400">public</span> <span class="text-yellow-300">class</span> MaClasse {
    ...
}
</code>
</pre>
```

#### Formules mathématiques (matières scientifiques)
- Inline : `$ E(X) = \sum x_i p_i $`
- Bloc centré : `$$ \int_{a}^{b} f(x)\,dx = F(b) - F(a) $$`
- Toujours dans une boîte `.glass-card` avec titre du théorème/formule

#### Boîtes pédagogiques obligatoires par chapitre
| Type | Quand | Minimum par chapitre |
|------|-------|---------------------|
| `info-box` | Définition, rappel, concept clé | 2 |
| `warning-box` | Piège classique, erreur fréquente | 1 |
| `danger-box` | Ne JAMAIS faire ceci | Optionnel |
| `success-box` | Astuce pro, bonne pratique | 1 |

---

## 8. SYSTÈME D'EXERCICES INTERACTIFS

### 8.1 Le fichier `exercises.js`

Ce fichier contient **à la fois les données ET le moteur de rendu**. Structure :

```javascript
const exerciseData = {
    "chapitre1.html": {    // Clé = nom du fichier HTML
        guided: [          // 5 questions guidées avec indices
            {
                question: "Question ouverte ?",
                hints: [
                    "Indice 1 (facile)",
                    "Indice 2 (plus précis)",
                    "Indice 3 (quasi la réponse)"
                ],
                correction: "Réponse complète et détaillée."
            },
            // ... 4 autres
        ],
        quiz: [            // 10 questions quiz (MCQ + QA)
            {
                type: "mcq",
                q: "Question à choix multiples ?",
                options: ["Réponse A", "Réponse B", "Réponse C"],
                correct: 1  // Index de la bonne réponse (0-based)
            },
            {
                type: "qa",
                q: "Question ouverte courte ?",
                valid: ["réponse1", "reponse1", "Réponse1"]  // Réponses acceptées
            },
            // ... 8 autres
        ],
        dragdrop: [        // 3 exercices drag & drop
            {
                title: "Titre de l'exercice",
                items: [
                    { id: "d1", text: "Élément à glisser", match: "z1" },
                    { id: "d2", text: "Autre élément", match: "z2" }
                ],
                zones: [
                    { id: "z1", label: "Zone cible 1" },
                    { id: "z2", label: "Zone cible 2" }
                ]
            },
            // ... 2 autres
        ]
    },
    "chapitre2.html": { ... },
    // etc.
};
```

### 8.2 Volume d'exercices par chapitre

| Type | Nombre | XP par bonne réponse |
|------|--------|---------------------|
| Questions guidées (hints progressifs) | **5** | 15 XP |
| Quiz MCQ/QA | **10** | 10 XP (MCQ) / 15 XP (QA) |
| Drag & Drop | **3** | 20 XP |
| **Total par chapitre** | **18** | **~200 XP potentiels** |

### 8.3 Moteur de rendu

Le moteur `initExercises()` :
1. Détecte la page courante via `window.location.pathname`
2. Charge les données correspondantes depuis `exerciseData`
3. Génère 3 sections dans `#interactive-exercise` :
   - **I. Questions de Réflexion** — Boutons "Indice 1/2/3" + "Voir la correction"
   - **II. Quiz Rapide** — Options cliquables avec feedback visuel (vert/rouge)
   - **III. Drag & Drop** — Éléments à glisser dans les zones correctes

### 8.4 Intégration XP

**CRITIQUE** — À chaque bonne réponse, le moteur appelle :
```javascript
if (typeof GameEngine !== 'undefined') GameEngine.addXP(amount, 'raison');
```
Utilise `typeof` pour éviter les crashs si gamification.js n'est pas chargé.

---

## 9. GAMIFICATION COMPLÈTE

### 9.1 Le fichier `gamification.js`

Contient un objet global `GameEngine` (ou `GameEngineXXX` — nom adapté à la matière) :

```javascript
const GameEngine = {
    state: {
        xp: 0,
        level: 1,
        badges: [],
        completed: [],
        totalXPEarned: 0,
        quizCorrect: 0,
        dragDropWins: 0,
        streak: 0,
        lastVisit: null
    },

    init()          // Charge depuis localStorage, rend la mascotte, met à jour l'UI
    load()          // localStorage.getItem('PREFIX_progress')
    save()          // localStorage.setItem(...)
    addXP(n, msg)   // Ajoute n XP, vérifie level-up, notifie
    renderMascot()  // Injecte le DOM de la mascotte (position fixed bottom-right)
    notify(msg, type) // Notification toast animée (slideUp)
    updateUI()      // Met à jour #user-xp-display
    checkBadges()   // Vérifie les conditions de badges après chaque action
    confetti()      // Animation confetti pour level-up
};
```

### 9.2 Mascotte

Chaque matière a une mascotte unique avec sa personnalité :

| Matière | Mascotte | Icône | Personnalité |
|---------|----------|-------|-------------|
| SQL | DataBot | `fa-database` | Rigoureux, blagues SQL |
| RO | Optimus | `fa-robot` | Optimiste, conseils stratégiques |
| Java | JavaBot | `fa-coffee` | Énergique, métaphores café |
| C# | SharpBot | `fa-code` | Méthodique, élégant |
| Linux | TuxHelper | `fa-terminal` | Hacker friendly, commandes |
| Windows Server | AzureBot | `fa-server` | Professionnel, entreprise |

**Comportement de la mascotte :**
- Rond flottant (56px) en bas à droite, animation `float` (3s ease-in-out infinite)
- Au clic : bulle avec tip aléatoire parmi 5+ phrases contextuelles
- La bulle disparaît après 5 secondes

### 9.3 Système de badges (minimum 15)

Catégories de badges obligatoires :
1. **Progression XP** : 5 paliers (100, 300, 500, 800, 1000+ XP)
2. **Exercices** : Quiz ace (50 correct), Drag champion (10 wins)
3. **Comportement** : Streak x3, Streak x7 (jours consécutifs)
4. **Thématiques** : 5+ badges liés au contenu de la matière (ex: "Maître des Jointures" en SQL)

Chaque badge = `{ id, icon, title, description, condition }`.

### 9.4 Notifications

```javascript
notify(msg, type) {
    // type = 'xp' | 'levelup' | 'badge'
    // Crée un <div> fixed bottom center
    // Animation: slideUp 0.5s (défini dans style.css)
    // Disparaît après 3.5s
    // levelup = fond accent, texte blanc + emoji 🏆
    // xp = fond card, texte accent + emoji ⚡
    // badge = fond card + emoji 🎖
}
```

### 9.5 Confetti (level-up)

40 particules de couleurs accent, animation `confettiFall` (CSS keyframes), durée 1.5-3.5s, supprimées après.

### 9.6 Niveaux

```
Formule : XP nécessaire pour level N = N × 100
Level 1 → 2 : 100 XP
Level 2 → 3 : 200 XP
Level 3 → 4 : 300 XP
...
```

Titres de niveau (adapter à la matière) :
`['Novice', 'Apprenti', 'Développeur', 'Architecte', 'Expert', 'Maître', 'Légende']`

---

## 10. PAGES UTILITAIRES OBLIGATOIRES

### 10.1 `formules.html` — Aide-mémoire / Cheat Sheet

- Grille de cartes `.glass-card` organisée par thème
- Chaque carte : titre + formule/syntaxe + exemple rapide
- Catégories filtrables si possible
- Pour les matières techniques : syntaxe, commandes, raccourcis
- Pour les matières scientifiques : formules avec MathJax

### 10.2 `cartes.html` — Flashcards

- **Minimum 40 cartes** de révision
- Interface : carte flip (front = question, back = réponse)
- `backface-visibility: hidden` + `transform: rotateY(180deg)`
- Bouton "Maîtrisée" pour marquer une carte (persisté en localStorage)
- Filtre par catégorie/chapitre
- Compteur : "X/40 maîtrisées"

### 10.3 `simulateur-examen.html` — Simulateur d'examen

- **Écran de configuration** : nombre de questions (10/20/30), difficulté, chronomètre (15/30/60 min)
- **Écran d'examen** : une question à la fois, navigation numérotée, timer visible
- **Écran de résultats** : score en %, temps, correction détaillée de chaque question
- Questions piochées aléatoirement depuis une banque de **50+ questions** intégrée au fichier
- Feedback adaptatif : "Excellent !" (>80%), "Bien, mais..." (50-80%), "Courage..." (<50%)

### 10.4 `exercices/exercices.html` — Banque d'exercices

- **10+ exercices** corrigés pas à pas
- Format accordéon (cliquer pour déplier la correction)
- Tags de difficulté (Facile/Moyen/Difficile) avec étoiles ★★★
- Tags thématiques (chapitre/concept)
- MathJax ou blocs de code dans les corrections

---

## 11. JAVASCRIPT — FICHIERS ET RESPONSABILITÉS

### 11.1 `main.js` (~100 lignes)

```
DOMContentLoaded →
├── ThemeManager     : dark/light toggle, localStorage(PREFIX-theme), prefers-color-scheme
├── MobileNav        : hamburger open/close, overlay, ESC key, body scroll lock
├── ReadingProgress  : scroll → .reading-progress width%
├── ScrollReveal     : IntersectionObserver sur .reveal-on-scroll → .revealed
├── ActiveNavLink    : highlight du lien correspondant à la page courante
└── SmoothScroll     : scroll doux pour les ancres #
```

### 11.2 `gamification.js` (~120 lignes)

Voir section 9. Clé localStorage : `PREFIX_progress`.

### 11.3 `exercises.js` (~700+ lignes)

- **Lignes 1-600** : Objet `exerciseData` avec toutes les données (5 guided + 10 quiz + 3 dragdrop par chapitre)
- **Lignes 600+** : Moteur de rendu `initExercises()`, `checkMCQ()`, `checkQA()`, `initDragAndDrop()`
- **CRITIQUE** : Chaque chapitre DOIT avoir sa clé dans `exerciseData`. Pas de chapitre sans exercices.

### 11.4 `download.js` (~300 lignes)

- Classe `CourseDownloader`
- Injecte un bouton "Télécharger" dans la navbar
- Modal avec choix format (PDF/DOCX/TXT) et scope (Cours/Exercices/QCM)
- PDF → `window.print()` avec CSS print
- DOCX → HTML wrappé dans un Blob `application/msword`
- TXT → `innerText` dans un Blob `text/plain`

### 11.5 `simulators.js` (OPTIONNEL, ~400+ lignes)

Pour les matières avec des simulateurs interactifs :
- SQL : moteur d'exécution SQL in-browser
- RO : résolution graphique canvas + Simplexe pas-à-pas
- Linux : terminal simulé
- Java : pseudo-compilateur avec sortie console

---

## 12. ACCESSIBILITÉ & PERFORMANCE

### 12.1 Accessibilité obligatoire

```html
<!-- Skip link (première chose dans <body>) -->
<a href="#main-content" class="skip-link">Aller au contenu principal</a>
```

```css
/* Focus visible */
*:focus-visible {
    outline: 3px solid var(--accent);
    outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}

/* High contrast */
@media (prefers-contrast: high) {
    :root { --border-color: #fff; }
    .glass-card { border-width: 2px; }
}

/* Screen reader only */
.sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0;
}
```

- ARIA labels sur tous les boutons interactifs (`aria-label`, `aria-expanded`)
- `role="navigation"`, `role="main"` sur les landmarks
- `lang="fr"` sur `<html>`
- Tout texte a un ratio de contraste ≥ 4.5:1

### 12.2 Print CSS obligatoire

```css
@media print {
    body { background: white !important; color: black !important; }
    nav, .glass-nav, .theme-toggle, .hamburger-btn, .mobile-nav-overlay,
    .reading-progress, footer, #optimus-container, button { display: none !important; }
    .glass-card { background: white !important; border: 1px solid #ddd !important;
                  box-shadow: none !important; break-inside: avoid; }
    a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 0.8em; }
    h1, h2, h3 { break-after: avoid; }
    @page { margin: 2cm; }
}
```

### 12.3 Performance

- Images en SVG quand possible (favicon = SVG obligatoire)
- Lazy-loading pour les images lourdes : `loading="lazy"`
- `<script>` en fin de `<body>` (pas dans `<head>`, sauf CDN avec `async`)
- Pas de polyfills inutiles (ES6+ est supporté par tous les navigateurs modernes)

---

## 13. PÉDAGOGIE — RÈGLES ABSOLUES

### 13.1 Principe "Zero to Hero"

Chaque chapitre suit cette progression stricte :

1. **🎯 Intuition** (2-3 paragraphes) — Analogie de la vie réelle, pas de jargon
2. **📐 Formalisation** — Introduction du vocabulaire technique et de la syntaxe/formule
3. **💡 Exemple concret** — Un cas pas-à-pas avec explication de chaque étape
4. **⚠️ Pièges classiques** — Les erreurs que font 80% des débutants
5. **🚀 Cas avancé** — Application complexe combinant plusieurs notions
6. **🏋️ Exercices** — Zone interactive (injectée par exercises.js)

### 13.2 Ton & style

- **Tutoiement** — "Tu vas voir que...", "Imagine que tu..."
- **Storytelling** — Créer un personnage récurrent (ex: "André le Menuisier" en RO, "Alice la DBA" en SQL)
- **Humour dosé** — Des options de quiz volontairement absurdes (ex: "Seulement le mardi")
- **Phrases courtes** — Max 2 lignes par phrase
- **Pas de copier-coller Wikipédia** — Tout doit être réécrit de manière vivante

### 13.3 Prérequis contextuels

- Si un chapitre utilise un concept d'un chapitre précédent → ajouter un encart "Rappel Flash"
- Ne JAMAIS supposer qu'un concept est acquis sans le rappeler brièvement
- Pour les matières techniques : toujours montrer la syntaxe complète (pas de `...`)

### 13.4 Exemples

- Chaque concept abstrait doit être illustré par **au moins un exemple numérique/concret**
- Les exemples doivent être **réalistes** (pas de x, y, z abstraits si on peut utiliser "prix", "quantité", "nom_client")
- Pour le code : l'exemple doit être **exécutable tel quel** (pas de pseudo-code sauf si c'est le sujet)

---

## 14. PROCÉDURE DE GÉNÉRATION PAS À PAS

Quand l'utilisateur te demande de créer un site pour une matière :

### Phase 1 — Planification (AVANT de coder)
1. **Confirmer** le nombre de chapitres et leurs titres
2. **Proposer** une couleur accent et un nom de mascotte
3. **Définir** le prefix localStorage (ex: `rd_java_`)
4. **Lister** les pages à créer

### Phase 2 — Fondation (fichiers de base)
1. Créer `favicon.svg` (dégradé aux couleurs accent, 2 lettres du cours)
2. Créer `style.css` complet (variables, composants, print, accessibilité)
3. Créer `main.js` (theme toggle, mobile nav, progress bar)
4. Créer `gamification.js` (mascotte, XP, badges, notifications)
5. Créer `download.js` (modal téléchargement)

### Phase 3 — Landing page
1. Créer `index.html` avec les 7 sections (navbar, hero, features, grille modules, footer, scripts, mobile nav)

### Phase 4 — Chapitres (un par un)
Pour chaque chapitre :
1. Créer le fichier HTML avec tout le contenu de cours
2. Ajouter les données d'exercices dans `exercises.js` (guided + quiz + dragdrop)
3. Vérifier les liens Précédent/Suivant

### Phase 5 — Pages utilitaires
1. Créer `formules.html` (cheat sheet)
2. Créer `cartes.html` (40+ flashcards)
3. Créer `simulateur-examen.html` (50+ questions, timer, correction)
4. Créer `exercices/exercices.html` (10+ exercices corrigés)

### Phase 6 — Validation
1. Vérifier que TOUS les chapitres ont des exercices dans `exercises.js`
2. Vérifier les liens de navigation (pas de lien cassé)
3. Vérifier que gamification.js est chargé partout
4. Vérifier le responsive (< 768px)
5. Vérifier la cohérence du footer (année, texte)

---

## 15. CHECKLIST DE VALIDATION FINALE

Avant de considérer le projet terminé, TOUT doit être coché :

### Structure
- [ ] Tous les fichiers du squelette sont créés
- [ ] Chaque HTML a : favicon, meta description, style.css, main.js, gamification.js, download.js
- [ ] Chaque chapitre a des exercices dans exercises.js (guided + quiz + dragdrop)
- [ ] Navigation Précédent/Suivant correcte dans chaque chapitre
- [ ] Liens mobile nav fonctionnels

### Design
- [ ] Dark mode par défaut, light mode via toggle
- [ ] Glass nav + glass cards cohérents
- [ ] Couleur accent cohérente partout
- [ ] Responsive < 768px testé (hamburger visible, grilles en colonnes)
- [ ] Print CSS : nav/footer cachés, fond blanc

### Contenu
- [ ] Chaque chapitre a minimum 3 sections de contenu substantiel
- [ ] Au moins 2 info-box et 1 warning-box par chapitre
- [ ] Exemples concrets dans chaque section
- [ ] Formules LaTeX correctes (si applicable)
- [ ] Blocs de code avec coloration (si applicable)

### Interactivité
- [ ] 5 guided + 10 quiz + 3 dragdrop par chapitre
- [ ] XP attribué à chaque bonne réponse
- [ ] Flashcards : 40+ cartes, flip fonctionnel, marquage "maîtrisée"
- [ ] Simulateur examen : 50+ questions, timer, correction
- [ ] Banque d'exercices : 10+, corrigés détaillés

### Gamification
- [ ] Mascotte affichée, cliquable, bulle de tips
- [ ] 15+ badges définis avec conditions variées
- [ ] Notifications toast sur XP/level-up/badge
- [ ] Confetti sur level-up
- [ ] XP display dans la navbar
- [ ] Données persistées en localStorage

### Accessibilité
- [ ] Skip link fonctionnel
- [ ] Focus-visible sur tous les éléments interactifs
- [ ] ARIA labels sur les boutons
- [ ] prefers-reduced-motion respecté
- [ ] Contraste texte ≥ 4.5:1

---

## 16. EXEMPLES DE MATIÈRES ADAPTABLES

Ce prompt fonctionne pour n'importe quelle matière. Voici des configurations pré-définies :

### C# / .NET
- **Accent** : `#7c3aed` (violet)
- **Mascotte** : SharpBot (`fa-code`)
- **Chapitres** (10) : Intro & Setup → Types & Variables → Conditions & Boucles → POO Basics → Héritage & Polymorphisme → Interfaces & Abstract → Collections (List, Dictionary) → LINQ → Async/Await → Design Patterns
- **Simulateur** : Console output simulée
- **Prefix** : `rd_csharp_`

### Java
- **Accent** : `#f97316` (orange)
- **Mascotte** : JavaBot (`fa-coffee`)
- **Chapitres** (10) : JDK & Hello World → Types primitifs & Reference → Structures de contrôle → Classes & Objets → Héritage → Interfaces & Abstract → Collections Framework → Exceptions → I/O & Fichiers → Threads & Concurrency
- **Simulateur** : Console Java simulée
- **Prefix** : `rd_java_`

### Linux Administration
- **Accent** : `#f59e0b` (amber)
- **Mascotte** : TuxHelper (`fa-terminal`)
- **Chapitres** (8) : Intro & Distributions → Système de fichiers & Navigation → Gestion utilisateurs & Permissions → Processus & Services → Shell scripting (Bash) → Réseau (IP, DNS, Firewall) → Stockage (LVM, RAID) → Sécurité (SSH, SELinux, Logs)
- **Simulateur** : Terminal bash simulé
- **Prefix** : `rd_linux_`

### Windows Server
- **Accent** : `#06b6d4` (cyan)
- **Mascotte** : AzureBot (`fa-server`)
- **Chapitres** (8) : Installation & Rôles → Active Directory (AD DS) → DNS & DHCP → GPO (Stratégies de groupe) → Hyper-V & Virtualisation → Stockage & DFS → IIS & Web Hosting → Backup & Disaster Recovery
- **Simulateur** : Console PowerShell simulée
- **Prefix** : `rd_winserver_`

### Python
- **Accent** : `#84cc16` (lime)
- **Mascotte** : PyBot (`fa-snake` ou `fa-code`)
- **Chapitres** (10) : Setup & Premiers pas → Variables & Types → Structures de contrôle → Fonctions → Listes, Tuples, Dicts → POO → Modules & Packages → Fichiers & Exceptions → Decorators & Generators → Intro Data Science (NumPy, Pandas)
- **Prefix** : `rd_python_`

### Réseau / CCNA
- **Accent** : `#14b8a6` (teal)
- **Mascotte** : NetBot (`fa-network-wired`)
- **Chapitres** (8) : Modèle OSI & TCP/IP → Adressage IP & Subnetting → Switching (VLAN, STP) → Routage (Statique, OSPF) → ACL & Sécurité → NAT & PAT → Services (DNS, DHCP, FTP) → Troubleshooting
- **Simulateur** : Packet tracer simplifié (visuel)
- **Prefix** : `rd_reseau_`

---

## 🔑 MOT FINAL

Ce prompt est ton **cahier des charges exhaustif**. Si tu crées un site qui respecte 100% de ce document, le résultat sera un cours interactif de qualité professionnelle, gamifié, accessible, responsive et visuellement magnifique.

**Commence par demander :**
1. La matière
2. Le nombre de chapitres et leurs titres
3. Le contenu brut (ou "génère-le toi-même")

Puis suis la procédure de la section 14 rigoureusement.
