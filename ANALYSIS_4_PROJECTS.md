# Deep Analysis of 4 Course Website Projects
## For Prompt Engineering — Replicating the Architecture for New Subjects

---

## TABLE OF CONTENTS
1. [Project 1: Probabilités](#project-1-probabilités)
2. [Project 2: SQL Server](#project-2-sql-server)
3. [Project 3: RD-RO (Recherche Opérationnelle)](#project-3-rd-ro)
4. [Project 4: PHP POO](#project-4-php-poo)
5. [Cross-Project Patterns Summary](#cross-project-patterns)
6. [Definitive Prompt Blueprint](#definitive-prompt-blueprint)

---

# PROJECT 1: PROBABILITÉS

## 1.1 File Structure
```
probabilites/
├── index.html                    (899 lines — Landing page)
├── 404.html                      (Custom error page)
├── robots.txt                    (SEO)
├── sitemap.xml                   (SEO)
├── update_chapters.py            (Utility script)
├── assets/
│   ├── css/
│   │   └── style.css             (2684 lines — Full design system)
│   ├── img/
│   │   └── favicon.svg
│   └── js/
│       ├── main.js               (377 lines — Core: Theme, Nav, TOC, Animations)
│       ├── gamification.js       (209 lines — XP, Levels, Confetti, Avatar "Aléas")
│       ├── simulators.js         (167 lines — Urn simulator with ball drawing)
│       ├── exercises-hints.js    (136 lines — Progressive hint system)
│       ├── quiz-chapitre1.js     (83 lines — Quiz engine per chapter)
│       ├── quiz-chapitre2.js     (83 lines)
│       ├── quiz-chapitre3.js     (83 lines)
│       └── quiz-chapitre4.js     (83 lines)
├── chapitres/
│   ├── chapitre1.html            (1637 lines — Probabilités fondamentales)
│   ├── chapitre2.html            (Dénombrement)
│   ├── chapitre3.html            (VA Discrètes)
│   ├── chapitre4.html            (VA Continues)
│   ├── cartes.html               (Flashcards / Jeux de cartes)
│   ├── formules.html             (Formula cheat sheet)
│   ├── rappels-integration.html  (Integration refresher)
│   └── simulateur-examen.html    (Exam simulator)
├── cours/                        (Empty/reserved)
├── exercices/
│   └── exercices.html            (Exercise hub)
└── exos/                         (Empty/reserved)
```

## 1.2 Tech Stack
| Technology | Details |
|---|---|
| **CSS Framework** | Custom CSS only (2684 lines), CSS Variables for theming |
| **Fonts** | Google Fonts: Inter (300-900), JetBrains Mono (400-600) |
| **Icons** | Font Awesome 6.5.1 (CDN) |
| **Math Rendering** | MathJax 3 (CDN, tex-mml-chtml) |
| **JS Architecture** | ES6 Classes (ThemeManager, HeaderManager, MobileNav, SolutionManager, TOCManager, ScrollAnimations) |
| **Build Tools** | None — purely static HTML/CSS/JS |

## 1.3 Color Scheme & Theme
- **Theme approach:** `data-theme="light"` attribute on `<html>`, CSS variables toggle
- **Light mode (default):**
  - Background: `#f8fafc` / `#ffffff` / `#f1f5f9`
  - Text: `#1e293b` / `#475569` / `#94a3b8`
  - Accent gradient: `linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)` (Indigo → Purple)
- **Dark mode:**
  - Background: `#0f172a` / `#1e293b`
  - Text: `#f1f5f9` / `#cbd5e1`
- **Accent colors:** Indigo/Purple primary, with success (#10b981), warning (#f59e0b), error (#ef4444), info (#3b82f6)
- **Background effect:** Body `::before` with radial gradients for subtle color blobs

## 1.4 Navigation Pattern
- **Fixed header** with glass morphism (`backdrop-filter: blur(20px)`)
- **Horizontal nav links** (Accueil, each chapter by name, Cartes, Exercices, Formules, Intégrales, Examen)
- **Hamburger toggle** for mobile (3-span animated bars)
- **Theme toggle** button with rotating sun/moon icons
- **Logo:** Emoji 🎲 + gradient text "Probas RD"
- **Scrolled state:** Adds `.scrolled` class (reduces padding, adds shadow)

## 1.5 Chapter Structure
- **4 chapters**, named by content: Probabilités, Dénombrement, VA Discrètes, VA Continues
- **Chapter page layout:** 2-column with sidebar TOC + main content
- **Each chapter contains:**
  - Chapter header badge + title + progress bar
  - Numbered sections (I, II, III...) with subsections (I.1, I.2...)
  - Math definitions (`.math-definition`), properties (`.math-property`), examples (`.math-example`)
  - MathJax inline `$...$` and display `$$...$$` formulas
  - Solution toggles with eye/eye-slash icons
  - Hint buttons with lightbulb icons
  - Quiz section at bottom with input-based questions
- **Special pages:** cartes.html (flashcards), formules.html, rappels-integration.html, simulateur-examen.html

## 1.6 Exercise Types
1. **Input-based quiz** (per chapter): Type answer, check against correct answer + alternatives, normalize comparison
2. **Progressive hint exercises**: Multiple hints revealed sequentially via `<details>`, tracked by counter
3. **Solution toggles**: Click to reveal/hide step-by-step correction
4. **Difficulty rating**: ★ / ★★ / ★★★ star system on exercise hub

## 1.7 Gamification Features
- **XP system**: Points earned from quiz completion and simulator usage
- **Level calculation**: `Math.floor(xp / 100) + 1`
- **Confetti effect**: Canvas-based particle animation on level up (150 particles, HSL random colors, gravity simulation)
- **Floating avatar "Aléas"**: Dice D20 icon, positioned fixed bottom-right, click for random tips
- **Speech bubble**: Shows contextual tips ("Une probabilité est toujours entre 0 et 1!")
- **Notifications**: Animated toast messages for XP gains and level-ups
- **Progress tracking**: Per-chapter progress stored in localStorage (`proba_rd_progress`)

## 1.8 Interactive Elements
- **Urn Simulator** (`simulators.js`): Configure red/green balls with sliders, draw 1/10/100 balls, see frequency statistics converging to theoretical probability (Law of Large Numbers)
- **Visual urn**: DOM-based ball rendering in a container
- **Exam simulator**: Timed exam with question pool

## 1.9 Accessibility
- No skip link on this project
- Theme toggle with `aria-label`
- Menu toggle with `aria-label`
- Smooth scroll behavior
- No explicit `prefers-reduced-motion` handling in CSS

## 1.10 Unique Features
- **MathJax** deeply integrated — heavy LaTeX usage throughout
- **"Probas RD" branding** with 🎲 emoji logo
- **Floating math symbols** (∑, ∫, P) as decorative elements in hero
- **Integration refresher page** (rappels-integration.html) as supplementary material
- **Card game page** (cartes.html) for flashcard-style learning
- **Per-chapter quiz files** rather than centralized quiz engine
- **Light theme default** (only project starting in light mode)

---

# PROJECT 2: SQL SERVER (RD-SQL)

## 2.1 File Structure
```
sql/
├── index.html                        (475 lines — Landing page)
├── simulateur-examen.html            (Exam simulator)
├── assets/
│   ├── css/
│   │   └── style.css                 (904 lines — Design system v2.0)
│   ├── img/
│   │   └── favicon.svg
│   └── js/
│       ├── main.js                   (297 lines — Theme, Nav, TOC, Animations, GamificationBridge)
│       ├── gamification.js           (285 lines — DataBot: XP, Badges, Streaks, Companion)
│       ├── sql-engine.js             (500 lines — Mock SQL engine with JOIN, GROUP BY)
│       ├── drag-drop.js              (159 lines — Drag & Drop exercise engine)
│       ├── download.js               (186 lines — Export HTML/Text/Notes)
│       └── transaction-visualizer.js (151 lines — ACID transaction simulator)
├── exercices/
│   └── exercices.html
└── modules/
    ├── mod01-ddl.html                (595 lines)
    ├── mod02-constraints.html
    ├── mod03-dml.html
    ├── mod04-select.html
    ├── mod05-calculations.html
    ├── mod06-strings.html
    ├── mod07-dates-nulls.html
    ├── mod08-logic.html
    ├── mod09-loops.html
    ├── mod10-transactions.html
    ├── mod11-procedures.html
    ├── mod12-triggers.html
    ├── cartes.html                   (Flashcards)
    ├── formules.html                 (Cheat sheet)
    └── rappels.html                  (Prerequisites)
```

## 2.2 Tech Stack
| Technology | Details |
|---|---|
| **CSS Framework** | **Tailwind CSS (CDN)** + custom style.css (904 lines) |
| **Fonts** | Inter (300-800), JetBrains Mono (400-700) — via @import in CSS |
| **Icons** | Font Awesome 6.4.0 (CDN) |
| **Math Rendering** | None (not needed for SQL) |
| **JS Architecture** | ES6 Classes in main.js + separate feature modules |
| **Build Tools** | None — Tailwind via CDN script tag |

## 2.3 Color Scheme & Theme
- **Theme approach:** `data-theme` attribute, **dark by default**, Tailwind body classes swapped
- **Dark mode (default):**
  - Background: `#0f172a` (slate-900)
  - Cards: `rgba(30, 41, 59, 0.7)` with `backdrop-filter: blur(12px)`
  - Text: `#f8fafc` / `#94a3b8` / `#64748b`
- **Light mode:**
  - Background: `#f8fafc` / `#f1f5f9`
  - Cards: `rgba(255, 255, 255, 0.85)`
- **Primary accent:** Blue `#2563eb` → `#60a5fa`
- **Secondary accents:** Purple, Emerald, Amber, Red (used for module difficulty tiers in badge colors)
- **Glow text effect:** `text-shadow` with blue glow for hero title

## 2.4 Navigation Pattern
- **Sticky top navbar** with glass blur (bg-slate-900/80 backdrop-blur-md)
- **Desktop links:** Modules, Formules, Exercices, Flashcards, Examen
- **XP/Level display** in navbar (progress bar + level text)
- **Hamburger button** → slide-in panel from right (+ overlay)
- **Theme toggle** (sun/moon icon swap)
- **Logo:** Database icon + gradient text "RD-SQL"
- **On module pages:** Back-to-dashboard link + module title + XP display

## 2.5 Module Structure
- **12 modules**, named `mod01-ddl.html` through `mod12-triggers.html`
- **Naming convention:** `modXX-keyword.html`
- **Color-coded by tier:** Modules 1-4 Blue, 5-7 Purple, 8-9 Amber, 10 Red, 11-12 Green
- **Module card content:** Badge (MODULE XX), title, description, topic tags, quiz count, CTA
- **Special highlights:** Modules 10 (SIMULATEUR badge), 6-7 have special ring styling
- **Module page layout:**
  - Narrative intro with storytelling hook
  - Visual concept cards (grid of 3 analogy cards)
  - Code syntax breakdown with interactive tooltips
  - Info/warning/tip boxes (colored left border)
  - In-page SQL editor with syntax highlighting
  - Quiz section
  - Drag & drop exercises
  - DataBot companion
  - Prev/Next chapter navigation

## 2.6 Exercise Types
1. **MCQ Quiz**: Click options, instant feedback (correct/incorrect classes), DataBot XP reward
2. **Drag & Drop**: Draggable SQL keyword items → drop zones, with validation and visual feedback (green/red)
3. **SQL Code Editor**: Inline code blocks with syntax highlighting (keywords blue, strings pink, functions yellow, comments gray, numbers green, operators purple)
4. **Fill-in-the-blank**: Within quiz context
5. **Transaction Visualizer**: Interactive 2-user concurrent transaction simulation

## 2.7 Gamification Features (DataBot System)
- **DataBot companion**: Fixed bottom-right floating robot with:
  - Animated glow pulse circle
  - Speech bubble for tips/feedback
  - Emotion system (neutral/happy/sad/excited — changes face icon)
  - Click to "poke" for random SQL tips (+1 XP)
- **XP/Level system**: Level curve = `level * 100` XP needed
- **17 badges** defined by category:
  - XP milestones (10, 50, 100... up to 900 XP)
  - Total XP milestones (500, 1000)
  - Quiz performance (50 correct answers)
  - Drag & Drop wins (10 challenges)
  - Streak rewards (3 days, 7 days)
- **Streak tracking**: Daily visit tracking, consecutive day counter
- **Module visit tracking**: Records which modules have been visited
- **Toast notifications**: Animated slide-up for XP gains, slide-in for badge unlocks
- **Confetti**: Particle animation on level up and badge unlock
- **GamificationBridge** (in main.js): Syncs DataBot state to index page UI (level text, progress bar, completed count)
- **State persistence**: `localStorage` key `rd_sql_progress`

## 2.8 Interactive Elements
- **Mock SQL Engine** (`sql-engine.js`): Full regex-based SQL simulator supporting:
  - SELECT (with WHERE, ORDER BY, TOP, aggregate functions)
  - INSERT, UPDATE, DELETE
  - CREATE TABLE
  - JOIN (INNER, LEFT)
  - GROUP BY with HAVING
  - Pre-loaded tables: users, products, departments, orders
- **Transaction Visualizer** (`transaction-visualizer.js`):
  - 2-user concurrent simulation
  - Lock manager (Shared/Exclusive locks)
  - Read Committed / Read Uncommitted isolation levels
  - Visual lock icons and log console
- **Drag & Drop Engine** (`drag-drop.js`): Reusable component with source items + drop zones + validation

## 2.9 Download/Export Features (`download.js`)
- **In-module export button** in navbar
- **3 export formats:**
  - HTML (full styled document with inline CSS)
  - Text (plain text extraction)
  - Notes (condensed revision notes with key points and code snippets)
- **Client-side only** — Blob + URL.createObjectURL → download link
- **Toast notification** on successful export

## 2.10 Accessibility
- **Skip link**: `<a href="#main-content" class="skip-link">Aller au contenu principal</a>`
- **ARIA labels**: Theme toggle, hamburger, progress bar (`role="progressbar"`)
- **Focus-visible**: `3px solid var(--accent)` outline
- **prefers-reduced-motion**: Disables all animations (duration 0.01ms)
- **prefers-contrast: high**: Increases border widths and visibility
- **sr-only class**: Screen reader utility class
- **Print CSS**: Comprehensive print stylesheet hiding interactive elements, showing solutions
- **Custom scrollbar**: Styled for both themes

## 2.11 Unique Features
- **Tailwind + Custom CSS hybrid** — only project using Tailwind
- **SQL Engine** — browser-based SQL execution simulator
- **Transaction Visualizer** — unique interactive tool for understanding ACID
- **DataBot personality** — rich companion AI with emotions, badges, streaks
- **SQL keyword floating** in hero (SELECT, JOIN, WHERE, INSERT, COMMIT)
- **Module color tiers** — progressive difficulty indicated by badge colors
- **Inline syntax highlighting** — custom CSS classes for SQL tokens

---

# PROJECT 3: RD-RO (RECHERCHE OPÉRATIONNELLE)

## 3.1 File Structure
```
RD-RO/
├── index.html                              (236 lines — Compact landing)
├── RO-Cours-Complet-Bases-Detaillees.txt   (Downloadable course text)
├── RO-10-Exercices-Modelisation.txt        (Downloadable exercises)
├── RO-QCM-100-questions.txt                (Downloadable QCM)
├── assets/
│   ├── css/
│   │   └── style.css                       (474 lines — Minimal design system)
│   ├── img/
│   │   └── favicon.svg
│   └── js/
│       ├── main.js                         (108 lines — Theme, mobile nav, progress bar, scroll reveal)
│       ├── gamification.js                 (132 lines — "Optimus": XP, Levels, Robot, Confetti)
│       ├── exercises.js                    (848 lines — Full exercise data + engine)
│       ├── simulators.js                   (636 lines — Graphical Solver + Simplex Solver)
│       └── download.js                     (330 lines — PDF/DOCX/TXT download modal)
├── chapitres/
│   ├── chapitre1.html                      (251 lines)
│   ├── chapitre2.html
│   ├── chapitre3.html
│   ├── chapitre4.html
│   ├── chapitre5.html
│   ├── chapitre6.html                      (Graphical solver simulator)
│   ├── chapitre7.html                      (Simplex calculator)
│   ├── chapitre8.html
│   ├── formules.html
│   └── simulateur-examen.html
├── exercices/
│   └── exercices.html
└── cours/                                  (Empty/reserved)
```

## 3.2 Tech Stack
| Technology | Details |
|---|---|
| **CSS Framework** | **Tailwind CSS (CDN)** + custom style.css (474 lines) |
| **Fonts** | Google Fonts: Inter (300-800) |
| **Icons** | Font Awesome 6.5.1 (CDN) |
| **Math Rendering** | MathJax 3 (CDN) — for linear programming formulas |
| **JS Architecture** | Functional (main.js) + Object literal (GameEngineRO, SimulatorManager) + ES6 Classes (GraphicalSolver, SimplexSolver) |
| **Tailwind Config** | Custom colors (emerald, slate-850), dark mode via class strategy |

## 3.3 Color Scheme & Theme
- **Theme approach:** `class="dark"` on `<html>`, `data-theme` attribute for custom CSS
- **Dark mode (default):**
  - Background: `#0f172a`
  - Cards: `rgba(30, 41, 59, 0.7)` with backdrop-filter
  - Text: `#e2e8f0` / `#94a3b8`
- **Primary accent:** **Emerald green** `#10b981` / `#34d399` / `#059669`
- **Secondary:** Cyan `#06b6d4`
- **Gradient:** `from-emerald-400 to-teal-300` for headings
- **Glow:** `rgba(16, 185, 129, 0.25)` for radial hero glow

## 3.4 Navigation Pattern
- **Sticky glass nav** (blur-12px, border-bottom)
- **Desktop nav**: Formules, Exercices, Examen (button style)
- **Mobile nav**: Slide-in panel from right with chapter links
- **Theme toggle** + **Hamburger** buttons  
- **Logo:** Gradient icon box "RO" + "OPTIMIZATION MASTER" text
- **On chapter pages:** Back to home + current module indicator + next link
- **XP display** in navbar: Level badge + XP text

## 3.5 Chapter Structure
- **8 chapters**, named `chapitre1.html` through `chapitre8.html`
- **Module labels:** MODULE 01 through MODULE 08
- **Chapters 6 & 7 have SIMULATEUR badge** (special highlighted cards)
- **Chapter page layout:**
  - Hero section with blurred gradient glow
  - Module badge + gradient title
  - Glass cards for content sections
  - Collapsible `<details>` for historical context
  - Blockquote-style key questions
  - Info/Warning/Danger boxes (left-border colored)
  - Exercise containers at bottom
  - Chapter prev/next navigation
- **Storytelling approach:** "André le Menuisier" recurring character throughout

## 3.6 Exercise Types (Comprehensive System in `exercises.js`)
Per chapter, exactly:
1. **5 Guided Questions**: Question + 3 progressive hints + correction reveal
2. **10 Quiz Questions**: Mix of MCQ (click options) and QA (type answer, validated against array)
3. **3 Drag & Drop Exercises**: Items dragged to matching zones (timeline ordering, categorization, vocabulary matching)

Data is structured as:
```javascript
exerciseData["chapitre1.html"] = {
    guided: [{question, hints[], correction}],
    quiz: [{type: "mcq"|"qa", q, options?, correct?, valid?}],
    dragdrop: [{title, items[{id, text, match}], zones[{id, label}]}]
}
```

## 3.7 Gamification Features (Optimus)
- **"Optimus" Robot companion**: Fixed bottom-right, emerald/cyan gradient circle
- **Click for random tips**: Array of contextual advice (simplified vs DataBot)
- **Speech bubble**: 5-second auto-hide
- **XP system**: `level = Math.floor(xp / 100) + 1`
- **Level-up notification**: Green banner, centered fixed, 3.5s display
- **Confetti**: CSS-animated falling particles (40 particles, emerald/cyan colors)
- **No badges** (simpler than SQL project)
- **No streak tracking** (simpler than SQL project)
- **Floating animation** on robot: `botFloat` keyframe (6px up-down)
- **State persistence**: `localStorage` key `ro_progress`

## 3.8 Interactive Elements
- **Graphical Solver** (Canvas-based):
  - Input objective function coefficients (a, b)
  - Select Max/Min optimization type
  - Configure constraints (ax + by ≤ c)
  - Canvas draws: grid, axes, constraint lines, feasible region polygon, optimal point
  - Computes all intersection vertices, filters feasible, finds optimal Z value
- **Simplex Solver**: Algorithmic step-through (in `simulators.js`)
- **SimulatorManager class**: Dropdown to switch between Graph and Simplex modes
- **Exam Simulator**: Timed assessment

## 3.9 Download/Export Features (`download.js`)
- **Modal-based download UI**: Beautiful radio buttons with icons
- **3 format options**: PDF (print dialog), DOCX (client-side generation), TXT (direct file download)
- **3 content scopes**: Cours Complet, Exercices, QCM 100
- **.txt files stored on disk**: Pre-written course content files for direct download
- **PDF generation**: Via `window.print()` with print stylesheet
- **DOCX generation**: Client-side HTML-to-DOCX conversion
- **Download button dynamically injected** into nav bar

## 3.10 Accessibility
- **Skip link**: `<a href="#curr" class="skip-link">Aller au contenu principal</a>`
- **ARIA labels**: Theme toggle, hamburger (`aria-expanded`), reading progress (`aria-hidden`)
- **Focus-visible**: `3px solid var(--accent)`
- **prefers-reduced-motion**: Full animation disable
- **prefers-contrast: high**: Increased border visibility
- **sr-only class**
- **Print CSS**: Comprehensive (hides nav, buttons, robot, download modal; shows content cleanly)
- **Custom scrollbar**: Not styled (uses default)

## 3.11 Unique Features
- **Canvas-based graphical optimizer** — unique to this project
- **Simplex algorithm simulator** — step-by-step calculation
- **Pre-written downloadable .txt files** for offline study
- **Recurring storytelling character** (André le Menuisier)
- **Smallest CSS** (474 lines) — most minimal design system
- **Most compact index** (236 lines)
- **Exercise data as structured JS objects** — all data in code, not HTML

---

# PROJECT 4: PHP POO

## 4.1 File Structure
```
php/
├── index.html                    (439 lines — Landing page)
├── chapitre1.html                (1764 lines — Introduction to OOP)
├── chapitre2.html
├── chapitre3.html
├── chapitre4.html
├── chapitre5.html
├── chapitre6.html
├── chapitre7.html
├── chapitre8.html
├── prompt_creation_cours_interactif.md
├── assets/
│   ├── css/
│   │   ├── style.css             (2050 lines — Full design system)
│   │   └── features.css          (474 lines — Badges, Sandbox, Flashcards)
│   └── js/
│       ├── main.js               (1139 lines — All-in-one: progress, notes, bookmarks, tabs, TOC, copy, code runner, badges, sandbox, flashcards, quiz, theme)
│       ├── quiz-chapitre1.js     (449 lines — Large quiz with PHP simulation)
│       ├── quiz-chapitre2.js     (74 lines)
│       ├── quiz-chapitre3.js     (73 lines)
│       ├── quiz-chapitre4.js     (73 lines)
│       ├── quiz-chapitre5.js     (71 lines)
│       ├── quiz-chapitre6.js     (71 lines)
│       ├── quiz-chapitre7.js     (67 lines)
│       └── quiz-chapitre8.js     (67 lines)
```

## 4.2 Tech Stack
| Technology | Details |
|---|---|
| **CSS Framework** | Custom CSS only (2050 + 474 lines), CSS Variables |
| **Fonts** | System font stack (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto...) |
| **Icons** | Font Awesome 6.5.1 (CDN) |
| **Math Rendering** | None |
| **JS Architecture** | **Functional** — single monolithic main.js with `initApp()` calling all init functions |
| **Code Font** | Consolas, Monaco, Courier New |

## 4.3 Color Scheme & Theme
- **Theme approach:** `body.dark-mode` class toggle (not data-attribute)
- **Light mode (default):**
  - Background: `#ffffff` / `#f8fafc` / `#f1f5f9`
  - Text: `#1e293b` / `#64748b`
  - Primary: **Blue** `#2563eb` / `#1e40af` / `#60a5fa`
- **Dark mode:**
  - Background: `#1e293b` / `#0f172a`
  - Text: `#f1f5f9` / `#94a3b8`
  - Primary lighter: `rgba(37, 99, 235, 0.2)`
- **Secondary:** Success green `#10b981`, Warning amber `#f59e0b`, Danger red `#ef4444`
- **Hero gradient:** `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` (Indigo → Purple)
- **No glassmorphism** — solid backgrounds, traditional shadows

## 4.4 Navigation Pattern
- **Sticky header** with solid background (no blur/glass)
- **Horizontal nav links:** Accueil, Chapitres, À propos
- **"Mes Notes" button** in nav (primary blue button)
- **Theme toggle button** (circular, moon/sun icon)
- **No hamburger menu** (nav may wrap on mobile instead)
- **Logo:** Code icon + "PHP POO" text
- **Chapter pages:** Top bar with Prev/Home/Next navigation
- **"Continuer là où j'étais" button** on home page

## 4.5 Chapter Structure
- **8 chapters**, flat in root: `chapitre1.html` through `chapitre8.html`
- **Duration + difficulty labels** on chapter cards (e.g., "45 min", "Débutant")
- **Progress tracking per chapter**: Scroll-based progress saved to localStorage
- **Chapter page layout:**
  - Progress bar at top (scroll-based)
  - Chapter nav bar (Prev ← Chapter N/8 → Next)
  - **Sidebar**: Sticky table of contents with numbered links + exercise/quiz links
  - Content sections with numbered headers
  - Info boxes with icons
  - Timeline components (CSS-based vertical timeline)
  - Code blocks with "Copy" and "Run" buttons
  - Tabbed interfaces for content organization
  - Bookmark buttons per section
  - Exercise section
  - Quiz section

## 4.6 Exercise Types
1. **MCQ Quiz** (per chapter): Options with instant feedback
2. **Code examples**: Syntax-highlighted PHP blocks with copy + run buttons
3. **PHP Code Simulator** (`simulatePHPExecution` function): Pattern-matching against known code snippets → pre-computed output
4. **Code sandbox "Tester le code" buttons**: Run PHP examples (simulated)
5. **Guided exercises**: Step-by-step with hints

## 4.7 Gamification Features
- **Trophy/Badge system** (`.trophy-section`):
  - Grid of trophy cards (locked/unlocked state)
  - Unlock condition: Complete chapter to 100%
  - Grayscale filter on locked trophies
  - Trophy names: "Débutant Curieux" etc.
- **Flashcard revision system**:
  - Pack cards (one per chapter) — locked until chapter 100% complete
  - Modal with 3D flip animation (perspective: 1000px, rotateY 180deg)
  - Front/Back card with prev/next navigation, card counter
  - Lock overlay: "🔒 Terminer le chapitre"
- **Progress tracking**:
  - Per-chapter scroll progress saved to localStorage
  - Global progress bar on index (based on chapters completed ≥90%)
  - Visual progress bars on chapter cards
- **"Continue where I left off"** button

## 4.8 Interactive Elements
- **PHP Code Runner** (simulated): Regex-based pattern matching against known code examples → displays pre-computed output with loading animation
- **Copy to clipboard**: For code blocks
- **Tabbed content**: Tab buttons switching panes
- **Note-taking system**:
  - Add notes with prompt()
  - View/Delete in modal
  - Stored in localStorage (`phpCourseNotes`)
  - Notes associated with sections (sectionId, chapter, date, URL)
- **Bookmark system**: Toggle bookmarks per section, visual star indicator
- **Timeline component**: Vertical CSS timeline for historical events

## 4.9 Unique Features
- **Monolithic JS** (1139 lines in single main.js) — everything in one file
- **Note-taking system** — only project with persistent user notes
- **Bookmark system** — only project with section bookmarking
- **Simulated PHP execution** — largest code simulation with dozens of pattern-matched outputs
- **"Continue where I left off"** — saves last visited URL in localStorage
- **Chapter duration labels** (45 min, 50 min, etc.)
- **Difficulty level labels** (Débutant, Intermédiaire, Avancé, Expert, Pratique)
- **2 CSS files split**: General (style.css) + Features (features.css)
- **No Tailwind, no glass morphism** — most traditional CSS approach
- **System fonts** — no Google Fonts loaded
- **Chapitres in root directory** (not in subfolder)
- **Flashcard 3D flip** with CSS perspective and backface-visibility

---

# CROSS-PROJECT PATTERNS

## Architecture Patterns (Common to ALL)

### Landing Page Structure
Every project follows this exact pattern:
1. **Progress bar** (fixed top, 3-4px, gradient fill)
2. **Sticky navbar** (logo left, nav center/left, theme toggle + hamburger right)
3. **Hero section** (badge, large title with gradient text, description, CTA buttons, stats grid)
4. **Features section** (4-column grid of feature cards with icons)
5. **Chapters/Modules grid** (cards with number, icon, title, description, topics, CTA)
6. **CTA section** (gradient background, call to action)
7. **Footer** (3-column: About, Navigation, Resources)

### Theme System
- ALL projects support dark/light mode
- ALL use CSS custom properties (variables)
- ALL persist preference in localStorage
- 3/4 projects default to dark mode (Probas is the exception)
- Theme toggling via either: `data-theme` attribute (3 projects) or `body.dark-mode` class (PHP)

### Mobile Navigation
- ALL use hamburger icon → slide-in panel from right
- ALL have overlay backdrop
- ALL close on ESC key press
- ALL disable body scroll when open

### Gamification System (3/4 projects — not PHP traditional approach)
| Feature | Probabilités | SQL | RD-RO |
|---------|-------------|-----|-------|
| **Mascot name** | Aléas (Dice D20) | DataBot (Database) | Optimus (Robot) |
| **XP system** | ✅ | ✅ | ✅ |
| **Level curve** | xp/100 | level*100 | xp/100 |
| **Badges** | ❌ | ✅ (17 badges) | ❌ |
| **Streaks** | ❌ | ✅ (daily) | ❌ |
| **Confetti** | ✅ (Canvas) | ✅ (CSS particles) | ✅ (CSS particles) |
| **Notifications** | ✅ | ✅ (toast) | ✅ (centered banner) |
| **Speech bubble** | ✅ | ✅ (with emotions) | ✅ |
| **localStorage key** | proba_rd_progress | rd_sql_progress | ro_progress |

### CSS Design System
All projects share:
- **Radius tokens**: sm (6-8px), md (10-12px), lg (16px), xl (24px), full (9999px)
- **Shadow tokens**: sm, md, lg, xl, glow
- **Transition tokens**: fast (0.15s), base (0.3s), slow (0.5s)
- **Color tokens**: success (emerald), warning (amber), error (red), info (blue)
- **Content boxes**: Definition/info (blue left border), Warning (amber), Danger/Error (red), Success (green), Tip (purple)
- **Cards**: Hover transform translateY(-5px), border-color change, shadow enhancement
- **Buttons**: Primary (gradient), Secondary (outline/ghost), with hover translateY(-2px)

### Content Boxes (Used in ALL chapter pages)
```
.definition-box / .info-box     → Blue left border + blue tinted background
.warning-box                    → Amber left border + amber tinted background
.danger-box                     → Red left border + red tinted background
.success-box                    → Green left border + green tinted background
.tip-box                        → Purple left border + purple tinted background
```

### Footer Pattern
All projects use 3-column footer:
- Column 1: Brand name + description
- Column 2: Navigation links with icons
- Column 3: Resources/extra links
- Bottom bar: Copyright + "Créé par RD"

### Common JS Utilities
All main.js files include:
- `ThemeManager` (class or function)
- `MobileNav` handling
- `HeaderManager` (scroll effect)
- `ScrollAnimations` (IntersectionObserver)
- `SolutionManager` (toggle show/hide)
- `ReadingProgress` (scroll-based progress bar)
- `Utils` object (debounce, smoothScrollTo, copyToClipboard)

### Exercise Common Patterns
- **Solution toggles**: Click button → show/hide solution content
- **Quiz feedback**: Correct (green border/bg) / Incorrect (red border/bg) classes
- **Interactive validation**: Normalize user input (lowercase, trim whitespace)
- **Gamification integration**: XP awarded on exercise completion

## Differences Summary

| Aspect | Probabilités | SQL | RD-RO | PHP POO |
|--------|-------------|-----|-------|---------|
| **CSS approach** | Custom only (2684L) | Tailwind + Custom (904L) | Tailwind + Custom (474L) | Custom only (2050+474L) |
| **JS approach** | ES6 Classes | ES6 Classes | Mixed | Functional |
| **Chapters** | 4 | 12 | 8 | 8 |
| **Chapter folder** | chapitres/ | modules/ | chapitres/ | root/ |
| **Naming** | chapitre1.html | mod01-ddl.html | chapitre1.html | chapitre1.html |
| **Default theme** | Light | Dark | Dark | Light |
| **Math support** | MathJax ✅ | ❌ | MathJax ✅ | ❌ |
| **Code execution** | ❌ | SQL Engine ✅ | ❌ | PHP Simulator ✅ |
| **Download/Export** | ❌ | ✅ (3 formats) | ✅ (3 formats + pre-written files) | ❌ |
| **Flashcards** | cartes.html | cartes.html | ❌ | In-page modal |
| **Sidebar TOC** | ✅ (chapters) | ✅ (chapters, sticky) | ❌ | ✅ (chapters) |
| **Notes system** | ❌ | ❌ | ❌ | ✅ |
| **Bookmark system** | ❌ | ❌ | ❌ | ✅ |
| **Drag & Drop** | ❌ | ✅ | ✅ | ❌ |
| **Canvas graphics** | ❌ | ❌ | ✅ (LP solver) | ❌ |
| **Special simulator** | Urn (probability) | Transaction (ACID) | LP Graphical + Simplex | PHP execution |
| **Accent color** | Indigo/Purple | Blue | Emerald/Teal | Blue |

---

# DEFINITIVE PROMPT BLUEPRINT

Based on this analysis, any prompt for creating a new course site should specify:

## Required Structure
```
{subject}/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── img/favicon.svg
│   └── js/
│       ├── main.js          (Theme, Nav, TOC, Animations, Progress)
│       ├── gamification.js   (XP, Mascot, Confetti, Notifications)
│       └── [subject-specific].js
├── chapitres/ (or modules/)
│   ├── chapitre1.html ... chapitreN.html
│   ├── formules.html
│   ├── cartes.html (flashcards)
│   └── simulateur-examen.html
└── exercices/
    └── exercices.html
```

## Required CDNs
1. **Font Awesome 6.5.1** — icons
2. **Google Fonts: Inter** (300-800) — body text
3. **Tailwind CSS CDN** OR custom CSS design system
4. **MathJax 3** — IF subject has math formulas
5. **JetBrains Mono** — IF subject has code

## Required CSS Variables
All projects use variables for: backgrounds, text colors, accent colors, borders, shadows, radii, transitions, font families.

## Required UI Components
1. Fixed reading progress bar (top)
2. Sticky glass navbar with theme toggle
3. Mobile hamburger → slide-in panel
4. Hero with gradient text + floating decorative elements
5. Feature cards (4 grid)
6. Chapter/Module cards with progress indicators
7. Content boxes (info, warning, danger, success, tip)
8. Solution toggles
9. Quiz with instant feedback
10. Chapter prev/next navigation
11. 3-column footer
12. Gamification mascot (bottom-right)

## Required JS Features
1. Dark/Light theme persistence
2. Mobile nav with overlay
3. Scroll animations (IntersectionObserver)
4. Reading progress bar
5. Solution toggle system
6. TOC active section tracking
7. Quiz validation engine
8. XP/Level gamification
9. Confetti effects
10. LocalStorage state management

## Required Accessibility
1. Skip link
2. ARIA labels on interactive elements
3. focus-visible outlines
4. prefers-reduced-motion support
5. Print stylesheet
6. sr-only utility class
