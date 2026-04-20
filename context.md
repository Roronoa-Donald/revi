# Context for proba workspace
# Date: 2026-04-19
# Status: context snapshot after exhaustive reads of UML + UI/UX + SQL assets + droit QCM autonome
# Note: ASCII only (no accents) to keep output portable
# Path convention: workspace relative paths

## 0) How to use this context
- This file is a deep index and behavior summary of the workspace.
- Use it for fast onboarding and for planning edits without re-reading the code.
- READ means the file was opened and verified.
- PARTIAL means the directory was listed but files were not fully read.
- NOT_READ means not yet inspected in the current pass.
- When a section says "not verified", re-open the file before changing logic.

## 1) Global architecture and patterns (cross-cutting)
- The workspace is a multi-course content hub with many standalone HTML courses.
- Most courses are static sites: HTML + CSS + JS, often with interactive quizzes.
- Multiple courses reuse a "glass UI" aesthetic with hero sections and cards.
- Many pages use Font Awesome for icons and Google Fonts for typography.
- Tailwind CDN is used in some courses (UML, SQL).
- Theme toggles are handled via localStorage and a class on <html>.
- Progress, unlocks, and scoring are tracked in localStorage in multiple courses.
- Exam simulators use timers, shuffle question pools, and show corrections.
- Interactive tasks use common patterns: quiz options, drag and drop, guided inputs.
- Several courses include "download" helpers to export text or PDF.
- Many pages have "reading progress" bars and scroll reveal animations.

## 1.1) Course authoring rules (must follow)
- Courses must be long-form and fully explanatory, not just short notions.
- Explain every key concept step by step, with the why and how, not only the what.
- Add many memo techniques: short recall boxes, checklists, mnemonics, and quick rules.
- Include comprehension aids: common mistakes, traps, and how to avoid them.
- Provide worked examples with full reasoning, not only final answers.
- Keep recap/cheatsheet sections per chapter for fast revision.

## 2) Top-level inventory (from workspace listing)
- ANALYSIS_4_PROJECTS.md - NOT_READ
- B1_PROJECT_PLAN.md - NOT_READ
- build_output.txt - NOT_READ
- clarisse.html - NOT_READ
- errors.md - NOT_READ
- extract_uml.py - NOT_READ
- f.py - NOT_READ
- generate_exam_pdf.py - NOT_READ
- generate_pdf.py - NOT_READ
- index.html - NOT_READ
- middleware.js - NOT_READ
- package.json - NOT_READ
- prompt_creation_cours_interactif.md - NOT_READ
- rd-ai-chat.js - NOT_READ
- render.yaml - NOT_READ
- server.js - NOT_READ
- uml_content.txt - NOT_READ
- vercel.json - NOT_READ

- admin-vm/ - PARTIAL (listed)
- admin-vm/index.html - NOT_READ
- admin-vm/qcm-100.html - NOT_READ
- admin-vm/assets/ - NOT_READ
- admin-vm/chapitres/ - NOT_READ

- administration machine virtuel/ - PARTIAL (listed)
- administration machine virtuel/administration machine virtuel/ - NOT_READ

- api/ - PARTIAL (listed)
- api/index.js - NOT_READ

- assembleur/ - NOT_READ (directory exists)

- b1/ - PARTIAL (listed)
- b1/404.html - NOT_READ
- b1/dashboard.html - NOT_READ
- b1/index.html - NOT_READ
- b1/middleware.js - NOT_READ
- b1/package.json - NOT_READ
- b1/rapport.md - NOT_READ
- b1/rd-ai-chat.js - NOT_READ
- b1/robots.txt - NOT_READ
- b1/sitemap.xml - NOT_READ
- b1/vercel.json - NOT_READ
- b1/algebre/ - NOT_READ
- b1/algo/ - NOT_READ
- b1/api/ - NOT_READ
- b1/assets/ - NOT_READ
- b1/ato/ - NOT_READ
- b1/c_cpp/ - NOT_READ
- b1/fbd/ - NOT_READ
- b1/merise/ - NOT_READ
- b1/public/ - NOT_READ
- b1/python/ - NOT_READ
- b1/reseaux/ - NOT_READ
- b1/scripts/ - NOT_READ
- b1/server/ - NOT_READ
- b1/stats/ - NOT_READ

- ccna/ - PARTIAL (listed)
- ccna/index.html - NOT_READ
- ccna/assets/ - NOT_READ
- ccna/chapitres/ - NOT_READ
- ccna/exercices/ - NOT_READ

- cours windows/ - PARTIAL (listed)
- cours windows/2.la-Sauvegarde-des-donnees.txt - NOT_READ
- cours windows/3.Haute-disponibilite-et-reprise-apres-sinistre-en-environnement.txt - NOT_READ
- cours windows/MAINTENANCE-DE-WINDOWS-SERVER.txt - NOT_READ

- csharp/ - PARTIAL (listed)
- csharp/guide-csharp-complet.html - NOT_READ
- csharp/index.html - NOT_READ
- csharp/POO-Csharp-Final.html - NOT_READ
- csharp/assets/ - NOT_READ
- csharp/chapitres/ - NOT_READ
- csharp/exercices/ - NOT_READ

- Cyber securite B2/ - PARTIAL (listed)
- Cyber securite B2/checksum.txt - NOT_READ

- droit/ - PARTIAL (listed)
- droit/index.html - NOT_READ
- droit/qcm-100.html - NOT_READ
- droit/qcm-autonome.html - READ (see Section 3)
- droit/tp-exposes.html - NOT_READ
- droit/annexes/ - NOT_READ
- droit/assets/ - NOT_READ
- droit/chapitres/ - NOT_READ

- droitb2/ - PARTIAL (listed)
- droitb2/droitb2/ - NOT_READ

- epreuves/ - PARTIAL (listed)
- epreuves/index.html - NOT_READ

- linux/ - PARTIAL (listed)
- linux/index.html - NOT_READ
- linux/assets/ - NOT_READ
- linux/chapitres/ - NOT_READ
- linux/exercices/ - NOT_READ

- old_exam/ - PARTIAL (listed)
- old_exam/deepseek_json_20260221_7a0a51.json - NOT_READ
- old_exam/exam_content.json - NOT_READ

- php/ - PARTIAL (listed)
- php/cartes.html - NOT_READ
- php/chapitre1.html - NOT_READ
- php/chapitre2.html - NOT_READ
- php/chapitre3.html - NOT_READ
- php/chapitre4.html - NOT_READ
- php/chapitre5.html - NOT_READ
- php/chapitre6.html - NOT_READ
- php/chapitre7.html - NOT_READ
- php/chapitre8.html - NOT_READ
- php/formules.html - NOT_READ
- php/index.html - NOT_READ
- php/prompt_creation_cours_interactif.md - NOT_READ
- php/simulateur-examen.html - NOT_READ
- php/tp1-procedural.html - NOT_READ
- php/tp2-poo-bases.html - NOT_READ
- php/tp3-encapsulation.html - NOT_READ
- php/tp4-heritage.html - NOT_READ
- php/tp5-exceptions.html - NOT_READ
- php/tp6-synthese.html - NOT_READ
- php/assets/ - NOT_READ
- php/chapitres/ - NOT_READ
- php/exercices/ - NOT_READ

- probabilites/ - PARTIAL (listed)
- probabilites/404.html - NOT_READ
- probabilites/index.html - NOT_READ
- probabilites/robots.txt - NOT_READ
- probabilites/sitemap.xml - NOT_READ
- probabilites/update_chapters.py - NOT_READ
- probabilites/assets/ - NOT_READ
- probabilites/chapitres/ - NOT_READ
- probabilites/cours/ - NOT_READ
- probabilites/exercices/ - NOT_READ
- probabilites/exos/ - NOT_READ

- public/ - PARTIAL (listed)
- public/activate.html - NOT_READ
- public/admin/ - NOT_READ
- public/css/ - NOT_READ
- public/js/ - NOT_READ

- rd_java/ - PARTIAL (listed)
- rd_java/index.html - NOT_READ
- rd_java/assets/ - NOT_READ
- rd_java/chapitres/ - NOT_READ
- rd_java/exercices/ - NOT_READ

- rd_winserver/ - PARTIAL (listed)
- rd_winserver/extract_pptx.py - NOT_READ
- rd_winserver/index.html - NOT_READ
- rd_winserver/... - NOT_READ

- RD-RO/ - NOT_READ (directory exists)
- roadmap/ - NOT_READ (directory exists)
- scripts/ - NOT_READ (directory exists)
- server/ - NOT_READ (directory exists)

- sql/ - READ (modules and assets read earlier in session; see Section 7)
- uiux/ - READ (see Section 5)
- uml/ - READ (see Section 4)

## 3) Droit Informatique - QCM autonome (droit/qcm-autonome.html) READ
### 3.1 Layout and UI
- Single standalone HTML page with embedded CSS and JS.
- Dark navy theme using CSS variables: bg, card, text, accent, good, bad.
- Radial gradient background, glassy cards, rounded corners.
- Top header with title and subtitle, then stats pill and reset control.
- Questions are rendered dynamically into #qcmArea.
- Includes a "Reponses courtes" section with two open questions.
- "Afficher une reponse type" buttons toggle example answers.

### 3.2 Behavior and logic
- QUESTIONS array contains 18 QCM items.
- Each item has: id, text, options[], correct[] array, explanation.
- renderQuestions() builds cards, options, and validate buttons.
- validateQuestion(qId) checks selected vs correct.
- Multi-correct: uses checkbox; single-correct: radio.
- Correct options are marked .correct; wrong picks are .incorrect.
- Input is disabled after validation to prevent changes.
- Score increments only on correct validation.
- Score pill updates as "Score : x / 18".
- resetQuiz() clears validated set, score, and re-renders questions.
- Open answers (Q19, Q20) use reveal buttons and show/hide text.

### 3.3 QCM list (18 items)
- Q1: definition of droit informatique; correct index: [3].
- Q2: droits informatiques et droits en ligne; correct index: [1,2,3].
- Q3: RGPD facts; correct index: [0].
- Q4: donnees sensibles; correct index: [0].
- Q5: rules compiled in one code; correct index: [3] (none).
- Q6: entreprise RGPD; correct index: [0].
- Q7: RGPD obligations; correct index: [0,1].
- Q8: Cambridge Analytica; correct index: [0,1,3].
- Q9: cybersecurite in droit; correct index: [0,1,3].
- Q10: scope of droit informatique; correct index: [0,1,2].
- Q11: droit a l oubli numerique; correct index: [0,2].
- Q12: securisation only antivirus; correct index: [1] (Faux).
- Q13: droit d acces to information included; correct index: [0] (Vrai).
- Q14: defi juridique du numerique not considerable; correct index: [1] (Faux).
- Q15: same statement as Q14; correct index: [1] (Faux).
- Q16: loi sur liberte de la presse not about numerique; correct index: [1] (Faux).
- Q17: nomophobie/selfitisme/desinformation are addictions; correct index: [1] (Faux).
- Q18: identification of user has no legal problems; correct index: [1] (Faux).

### 3.4 Open answer section
- Q19: when a company processes personal data; example answer describes collect/store/use/transfer/delete.
- Q20: RGPD meaning, benefits, and sanctions; includes 20M EUR or 4% global turnover.

## 4) UML course (uml/) READ
### 4.1 File map (UML)
- uml/index.html - READ earlier in session.
- uml/chapitres/chapitre1.html - READ earlier (intro).
- uml/chapitres/chapitre2.html - READ earlier (classes).
- uml/chapitres/chapitre3.html - READ earlier (use cases).
- uml/chapitres/chapitre4.html - READ earlier (activities).
- uml/chapitres/chapitre5.html - READ earlier (sequence).
- uml/chapitres/formules.html - READ (cheat sheet).
- uml/chapitres/cartes.html - READ (flashcards).
- uml/chapitres/simulateur-examen.html - READ (exam).
- uml/exercices/exercices.html - READ (25 exercises).
- uml/assets/css/style.css - READ (design system).
- uml/assets/js/main.js - READ.
- uml/assets/js/gamification.js - READ.
- uml/assets/js/download.js - READ.
- uml/assets/js/exercises.js - READ.
- uml/assets/js/exercise-solutions-svg.js - READ.
- uml/assets/img/favicon.svg - READ.

### 4.2 Course theme and structure
- Visual theme: magenta/fuchsia accent (#E91E8C) with glass UI.
- Tailwind CDN enabled in UML pages; custom CSS handles most layout.
- Main nav with modules, cheat sheet, flashcards, exercises, exam.
- Mobile nav overlay and panel for small screens.
- Reading progress bar at top of page.
- Scroll reveal animations on cards.
- Chapter completion triggers localStorage unlocks.

### 4.3 Cheat sheet (uml/chapitres/formules.html)
- Organized by module 1..5.
- Contains code-like blocks with colored syntax spans.
- Module 1: UML definition, authors (Booch, Rumbaugh, Jacobson), UML 2.0 date, 13 diagram types.
- Structure diagrams list and behavior diagrams list.
- Module 2: class notation, visibility symbols, multiplicities, relation symbols.
- Includes SVG diagrams for class structure and relations.
- Notes: underline = static, italic = abstract.
- Module 3: use case elements, actor, ellipse, system boundary.
- include vs extend semantics and arrow directions.
- Use case textual description with 8 fields.
- Module 4: activity diagram symbols (initial node, action, decision, fork/join, end nodes).
- Decision rules: mutually exclusive, include an else.
- Swimlanes explain who does what.
- Module 5: sequence diagram elements (lifelines, activation, messages).
- Message types: synchronous, asynchronous, return, creation.
- Combined fragments: alt, opt, loop, par, ref.
- Rule: message must be method on receiver class; time flows top to bottom.
- Download buttons for PDF and TXT.

### 4.4 Flashcards (uml/chapitres/cartes.html)
- 30 cards, locked by module completion.
- Filter tabs: all, ch1..ch5.
- Uses localStorage key rd_uml_completed to unlock.
- Flashcard flip on click or Enter/Space.
- Cards list (ASCII, condensed):
- F01 ch1: UML meaning -> Unified Modeling Language (OMG standard).
- F02 ch1: 3 creators -> Booch, Rumbaugh, Jacobson.
- F03 ch1: UML 2.0 diagrams -> 13 total, 7 structure, 6 behavior.
- F04 ch1: UML programming language? -> No, modeling language.
- F05 ch1: structure vs behavior -> static vs dynamic aspects.
- F06 ch1: UML 2.0 year -> 2004 (UML 1.0 = 1997).
- F07 ch2: visibility symbols -> +, -, #, ~.
- F08 ch2: composition vs aggregation -> life tied vs independent.
- F09 ch2: inheritance -> triangle to parent.
- F10 ch2: multiplicity 0..* -> zero or many.
- F11 ch2: association class -> association with attributes.
- F12 ch2: static attribute -> underline.
- F13 ch3: actor -> external role.
- F14 ch3: include vs extend -> mandatory vs optional.
- F15 ch3: include arrow -> base to included.
- F16 ch3: extend arrow -> extension to base.
- F17 ch3: nominal scenario -> normal flow.
- F18 ch3: textual CU fields -> 8 fields.
- F19 ch4: start/end symbols -> filled dot, final node.
- F20 ch4: fork -> split into parallel flows.
- F21 ch4: join -> wait all flows.
- F22 ch4: decision notation -> diamond with [guard].
- F23 ch4: swimlane -> who does what.
- F24 ch4: transitions automatic -> yes.
- F25 ch5: time flow -> top to bottom.
- F26 ch5: sync vs async -> waits vs no wait.
- F27 ch5: activation box -> active execution.
- F28 ch5: alt fragment -> if/else.
- F29 ch5: seq vs class link -> method in receiver + association.
- F30 ch5: destruction -> cross at end of lifeline.

### 4.5 Exam simulator (uml/chapitres/simulateur-examen.html)
- 50 questions, 30 min timer, pass >= 70% (35/50).
- Random shuffle of examDB.
- Single-choice QCM with score and corrections.
- Result screen shows pass/fail and correction list.
- If passed, adds XP and badge (certified).
- Exam question list with correct index (0-based):
- E01: UML signifie -> a0.
- E02: UML est -> a2.
- E03: nb diagrammes UML 2.0 -> a2.
- E04: OMT creator -> a1.
- E05: use cases inventor -> a2.
- E06: OMG standard year -> a2.
- E07: diagramme de classes = structure -> a1.
- E08: diagramme de sequence = comportement -> a1.
- E09: OMG meaning -> a1.
- E10: not UML diagram -> a2.
- E11: symbol + -> a2.
- E12: symbol - -> a0.
- E13: symbol # -> a1.
- E14: multiplicite 1..* -> a2.
- E15: black diamond -> a1.
- E16: white diamond -> a0.
- E17: composition destruction -> a1.
- E18: inheritance symbol -> a2.
- E19: underlined attribute -> a1.
- E20: abstract class italic -> a1.
- E21: actor -> a1.
- E22: include -> a1.
- E23: extend -> a1.
- E24: include arrow direction -> a1.
- E25: extend arrow direction -> a1.
- E26: nominal scenario -> a1.
- E27: actor can be -> a2.
- E28: actor generalization -> a0.
- E29: use case naming -> a1.
- E30: system boundary -> a1.
- E31: initial node -> a1.
- E32: decision symbol -> a1.
- E33: conditions in -> a1.
- E34: fork has -> a0.
- E35: join waits -> a1.
- E36: swimlanes show -> a1.
- E37: transitions -> a1.
- E38: final node ends -> a1.
- E39: flow end node -> a1.
- E40: action symbol -> a2.
- E41: time flows -> a2.
- E42: synchronous message -> a1.
- E43: asynchronous message -> a1.
- E44: activation rectangle -> a1.
- E45: fragment alt -> a0.
- E46: fragment opt -> a1.
- E47: fragment loop -> a2.
- E48: message target class -> a1.
- E49: destruction symbol -> a2.
- E50: synchronous arrow type -> a1.

### 4.6 Exercises (uml/exercices/exercices.html)
- 25 exercises with categories: intro, classes, use cases, activities, sequence.
- Difficulty levels: 1 (easy), 2 (medium), 3 (hard).
- Search + filters by category and difficulty.
- Progress stored in localStorage key rd_uml_ex_done.
- Solutions shown on demand, with diagrams when available.
- Mermaid used for activity and sequence diagrams.
- SVG diagrams embedded for classes and use cases.
- Exercise list (id, category, difficulty, title):
- X01 intro d1: classer diagrammes UML (structure vs comportement).
- X02 intro d1: frise chronologique UML (Booch, OMT, OOSE, UML 1.0, OMG, UML 2.0).
- X03 intro d1: QCM fundamentals (UML programming? code gen? language specific?).
- X04 intro d2: choisir diagramme selon situation.
- X05 intro d2: associer auteur et contribution.
- X06 classes d1: identifier visibilite et types.
- X07 classes d2: modeliser bibliotheque (Livre, Membre, Emprunt).
- X08 classes d2: composition vs agregation (4 cases).
- X09 classes d3: pizzeria complete model.
- X10 classes d3: heritage + interface (Forme, Cercle, Rectangle, Triangle).
- X11 usecase d1: acteurs et CU for reservation billets.
- X12 usecase d2: include vs extend for banque en ligne.
- X13 usecase d2: description textuelle complete CU DAB.
- X14 usecase d3: e-commerce CU complet.
- X15 usecase d3: reservation de salles.
- X16 activites d1: commande en ligne simple.
- X17 activites d2: decision auth + 3 essais.
- X18 activites d2: fork/join traitement commande.
- X19 activites d3: swimlanes embauche.
- X20 activites d3: fiche de reparation.
- X21 sequence d1: retrait DAB.
- X22 sequence d2: fragment alt connexion.
- X23 sequence d2: fragment loop panier.
- X24 sequence d3: robot et bras articule.
- X25 sequence d3: sequence achat en ligne avec fragments.

### 4.7 Exercise diagram assets (uml/assets/js/exercise-solutions-svg.js)
- Defines ExerciseDiagrams map with svg/mermaid per exercise.
- Shared SVG defs (gradients, drop shadow).
- classBox helper for UML class blocks.
- multLabel helper for multiplicities with colored badges.
- SVG diagrams for exercises 7, 8, 9, 10, 11, 12, 14, 15.
- Mermaid diagrams for exercises 16-25 (activities and sequences).
- Renders mermaid diagrams at runtime and injects SVG into solutions.

### 4.8 Interactive exercises engine (uml/assets/js/exercises.js)
- DB with 5 chapters, each with 18 exercises:
- 5 guided, 10 quiz, 3 drag-drop per chapter.
- getChapterFromPath() uses /chapitreN in URL.
- renderGuided creates text inputs with hints and check.
- renderQuiz renders options and marks correct/wrong.
- renderDrag sets up drag items and drop zones.
- Normalizes answers for guided responses.
- Uses GameEngine.exerciseCompleted(isCorrect) for XP/badges.

### 4.9 Gamification engine (uml/assets/js/gamification.js)
- storageKey: rd_uml_progress.
- Data: xp, badges[], exercisesCompleted, quizCorrect, perfectStreak, streak, lastVisit, chaptersCompleted.
- Levels: Debutant, Apprenti, Modelisateur Jr, Modelisateur, Architecte UML, Expert UML, Legende UML.
- Badges include: first_step, explorer, modeling_init, class_master, usecase_pro, activity_hero, sequence_ace, quiz_king, streak_3, streak_7, perfectionist, half_way, certified, legend.
- Adds XP on badge unlock and on chapter completion.
- Tip bubble with UML hints.
- Toast messages and confetti effect.

### 4.10 Main JS (uml/assets/js/main.js)
- ThemeManager toggles localStorage key rd_uml_theme.
- Mobile nav toggles panel + overlay.
- Reading progress bar updates on scroll.
- ScrollReveal uses IntersectionObserver.
- ActiveNavLink sets .active on current page.
- ChapterTracker: marks chapter complete at 85% scroll in localStorage key rd_uml_completed.

### 4.11 Downloader (uml/assets/js/download.js)
- Binds buttons with data-download.
- Exports main content as TXT or PDF.
- PDF export uses window.open + print.
- Removes scripts/styles from extraction.

### 4.12 UML design system (uml/assets/css/style.css)
- CSS variables for accent fuchsia and dark theme.
- Glass nav, hero, cards, module grid, feature cards.
- Code blocks with custom syntax colors.
- Quiz/drag styles and feedback states.
- Flashcard flip and locked state.
- Cheatsheet locked overlay.
- Exam simulator styles.
- XP bar and mascot bubble.
- Accessibility: skip link, focus-visible, reduced-motion.

## 5) UI/UX course (uiux/) READ
### 5.1 File map (UIUX)
- uiux/index.html - READ (landing).
- uiux/chapitres/cours-complet.html - READ.
- uiux/chapitres/simulateur-examen.html - READ.
- uiux/assets/css/style.css - READ.
- uiux/assets/js/main.js - READ.
- uiux/assets/img/ - empty.
- uiux/exercices/ - empty.
- uiux/1 (1).jpeg through 1 (24).jpeg - READ as images (handwritten notes).

### 5.2 Landing page (uiux/index.html)
- Hero with floating keywords (responsive, UX design, WCAG, etc).
- Features grid: 10 modules, 100 QCM, Responsive, Accessibilite.
- Module grid linking to course sections m1..m10.
- CTA to exam simulator.
- Theme toggle and mobile nav.

### 5.3 Cours complet (uiux/chapitres/cours-complet.html)
- 10 modules with deep content, each in a glass card.
- Module 1: UI vs UX definitions and differences.
- Module 2: CCU (user centered design) 4 steps and actors.
- Module 3: UX research methods, motifs/besoins, persona example.
- Module 4: wireframes and prototyping levels; design system; tools.
- Module 5: responsive design, mobile-first vs desktop-first, breakpoints, media queries.
- Module 6: organization and auto layout in Figma (direction, gap, padding, align).
- Module 7: responsive reorganization logic and examples (nav, grid, sidebar).
- Module 8: ergonomics laws (Fitts, Hick, Jakob) with examples.
- Module 9: WCAG principles (POCR) and ARIA basics; testing tools.
- Module 10: typography and spacing (margin/padding/gap, line length).
- Contains tables, code examples, and UI demo boxes.
- CTA to exam and chapter nav at bottom.

### 5.4 UIUX exam simulator (uiux/chapitres/simulateur-examen.html)
- Two modes: exam (45 min) and practice (no timer, immediate correction).
- Category filters for definitions, responsive, autolayout, reorganisation, ergonomie, accessibilite, ccu, uxresearch, wireframe, typo.
- 100 questions sampled from a 110 item bank.
- Progress dots for quick navigation.
- Score summary with category breakdown.
- Correction view with filters (all, wrong only, correct only).

### 5.5 UIUX exam bank (110 items)
- Note: startExam uses shuffle(pool).slice(0, 100).
- Each line: QNN category short topic -> correct index.

- Q001 definitions: UX meaning -> a0.
- Q002 definitions: UI meaning -> a1.
- Q003 definitions: UX concerns -> a1.
- Q004 definitions: UI concerns -> a2.
- Q005 definitions: responsive definition -> a1.
- Q006 definitions: need UI+UX -> a2.
- Q007 definitions: UI/UX analogy -> a0.
- Q008 definitions: UI element -> a2.
- Q009 definitions: UX element -> a1.
- Q010 definitions: responsive is modern philosophy -> a2.

- Q011 ccu: CCU meaning -> a1.
- Q012 ccu: number of steps -> a2.
- Q013 ccu: step 1 -> a3.
- Q014 ccu: step 2 -> a1.
- Q015 ccu: step 3 -> a2.
- Q016 ccu: step 4 -> a1.
- Q017 ccu: key principle -> a1.
- Q018 ccu: time without prototype -> a2.
- Q019 ccu: time with prototype -> a1.
- Q020 ccu: CCU actors -> a1.

- Q021 uxresearch: persona definition -> a1.
- Q022 uxresearch: not part of persona -> a1.
- Q023 uxresearch: step 1 -> a2.
- Q024 uxresearch: not a method -> a1.
- Q025 uxresearch: recommendations step -> a3.
- Q026 uxresearch: motif meaning -> a1.
- Q027 uxresearch: besoin meaning -> a0.
- Q028 uxresearch: echelle de valeur -> a1.
- Q029 uxresearch: social media purpose -> a1.
- Q030 uxresearch: typical frustration -> a2.

- Q031 wireframe: definition -> a1.
- Q032 wireframe: low-fi -> a1.
- Q033 wireframe: high-fi -> a1.
- Q034 wireframe: main tool -> a1.
- Q035 wireframe: design system -> a1.
- Q036 wireframe: correct order -> a1.
- Q037 wireframe: Zeplin -> a1.
- Q038 wireframe: tool not UI prototyping -> a2.
- Q039 wireframe: prototype purpose -> a1.
- Q040 wireframe: design system contents -> a1.

- Q041 responsive: mobile-first meaning -> a1.
- Q042 responsive: desktop-first meaning -> a1.
- Q043 responsive: recommended approach -> a1.
- Q044 responsive: mobile breakpoint -> a1.
- Q045 responsive: tablet breakpoint -> a1.
- Q046 responsive: desktop breakpoint -> a2.
- Q047 responsive: large breakpoint -> a3.
- Q048 responsive: min-width 576 -> a1.
- Q049 responsive: max-width 576 -> a1.
- Q050 responsive: mobile-first uses -> a1.
- Q051 responsive: desktop-first uses -> a1.
- Q052 responsive: media query definition -> a1.
- Q053 responsive: not standard breakpoint -> a2.
- Q054 responsive: why mobile-first -> a1.
- Q055 responsive: min vs max width -> a2.

- Q056 autolayout: definition -> a1.
- Q057 autolayout: equivalent to flexbox -> a1.
- Q058 autolayout: directions -> a1.
- Q059 autolayout: hug contents -> a1.
- Q060 autolayout: fill container -> a2.
- Q061 autolayout: fixed -> a1.
- Q062 autolayout: fill container CSS -> a1.
- Q063 autolayout: hug CSS -> a2.
- Q064 autolayout: gap meaning -> a2.
- Q065 autolayout: padding meaning -> a1.
- Q066 autolayout: space between -> a1.
- Q067 autolayout: packed -> a1.
- Q068 autolayout: wrap -> a1.
- Q069 autolayout: left and right constraint -> a1.
- Q070 autolayout: scale constraint -> a1.

- Q071 reorganisation: horizontal to vertical -> a1.
- Q072 reorganisation: 3 columns to 1 -> a1.
- Q073 reorganisation: nav to hamburger -> a1.
- Q074 reorganisation: sidebar on mobile -> a1.
- Q075 reorganisation: flex-direction column -> a1.
- Q076 reorganisation: flex-direction row -> a1.
- Q077 reorganisation: image width mobile -> a2.
- Q078 reorganisation: step 1 identify blocks -> a1.
- Q079 reorganisation: step 2 define priority -> a1.
- Q080 reorganisation: footer to 1 column -> a1.
- Q081 reorganisation: hide element -> a0.
- Q082 reorganisation: highest priority -> a2.

- Q083 ergonomie: Fitts law -> a1.
- Q084 ergonomie: Hick law -> a1.
- Q085 ergonomie: Jakob law -> a2.
- Q086 ergonomie: Fitts button -> a1.
- Q087 ergonomie: Hick menu -> a1.
- Q088 ergonomie: Jakob cart position -> a2.
- Q089 ergonomie: goal of ergonomie -> a0.
- Q090 ergonomie: hamburger law -> a2.

- Q091 accessibilite: WCAG meaning -> a1.
- Q092 accessibilite: number of principles -> a2.
- Q093 accessibilite: Perceptible -> a0.
- Q094 accessibilite: Operable -> a1.
- Q095 accessibilite: Comprensible -> a1.
- Q096 accessibilite: Robuste -> a1.
- Q097 accessibilite: ARIA meaning -> a0.
- Q098 accessibilite: WAVE tool -> a1.
- Q099 accessibilite: not a screen reader -> a3.
- Q100 accessibilite: linked to performance/SEO -> a0.

- Q101 typo: margin meaning -> a1.
- Q102 typo: padding meaning -> a1.
- Q103 typo: gap usage -> a0.
- Q104 typo: visual hierarchy order -> a1.
- Q105 typo: min font size -> a2.
- Q106 typo: WCAG contrast ratio -> a2.
- Q107 typo: recommended line-height -> a2.
- Q108 typo: optimal chars per line -> a1.
- Q109 typo: spacing multiples -> a1.
- Q110 typo: SEO meaning -> a0.

### 5.6 UIUX design system (uiux/assets/css/style.css)
- Teal accent (#0891B2) and dark theme variants.
- Glass nav, hero, cards, module grid, feature grid.
- Definition/info/warning/danger/success/analogy boxes.
- Code blocks with inline syntax coloring.
- Responsive layout demos and persona card styles.
- Exam styles: quiz options, progress dots, score display.
- WCAG grid cards, law cards, breakpoint bar.
- Mobile nav, reveal animations, focus-visible.

### 5.7 UIUX main JS (uiux/assets/js/main.js)
- ThemeManager uses localStorage key rd_uiux_theme.
- Mobile nav open/close with overlay.
- Reading progress bar on scroll.
- ScrollReveal for elements.
- Active nav link for current page.

### 5.8 UIUX handwritten notes images
- Files: uiux/1 (1).jpeg to uiux/1 (24).jpeg.
- Appear to be photographed handwritten notes for UI/UX.
- Not OCRed; content likely mirrors course modules (responsive, CCU, etc).

## 6) SQL course (sql/) READ earlier (session pre-compaction)
### 6.1 Known files and assets
- sql modules include mod01..mod12 and mod07a-joins.
- sql/modules/formules.html is a cheat sheet.
- sql/assets/css/style.css is the SQL design system.
- sql/assets/js files include:
- download.js (export current lesson to PDF/TXT).
- drag-drop.js (drag drop engine for exercises).
- gamification.js (XP, streaks, badges, localStorage).
- main.js (theme, nav, scroll, completion tracking).
- sql-engine.js (mock SQL engine: SELECT/INSERT/UPDATE/DELETE, join, group by).
- transaction-visualizer.js (simulate locks and isolation levels).

### 6.2 SQL module topics (from earlier reads)
- mod06 strings and text functions.
- mod07 dates and null handling.
- mod07a joins tutorial (inner/left/right/full, join syntax).
- mod08 boolean logic and predicates.
- mod09 loops / iterative logic (SQL control flow patterns).
- mod10 transactions and ACID concepts.
- mod11 procedures and stored routines.
- mod12 triggers (before/after, usage cases).
- Earlier modules (mod01-05) include basics and core DDL/DML topics (not reverified here).

### 6.3 SQL interaction patterns (from earlier reads)
- Embedded quizzes and drag-drop exercises per lesson.
- Mock SQL editor tasks using regex parsing and result simulation.
- Gamification: XP, badges, completion gating for content sections.
- Download/export tools per page.

## 7) Other known components (from earlier read pass, details not reloaded)
- Backend/server and public auth pages were inspected earlier in session.
- Admin dashboard and admin-vm course were inspected earlier in session.
- If new edits are planned there, re-open those files for accuracy.

## 8) Pending verification list
- Many top-level files remain NOT_READ in this pass.
- If tasks require edits there, read them before changes.
- Top priority if "read everything" is still required:
- Top-level markdown files (ANALYSIS_4_PROJECTS.md, B1_PROJECT_PLAN.md, errors.md).
- Top-level JS (server.js, middleware.js, rd-ai-chat.js).
- Each course directory not yet read (ccna, php, linux, csharp, probabilites, etc).

## 9) Summary of key behavior flows
- QCM flows share pattern: render from array, validate, show feedback, update score.
- Exams: shuffle question pool, limit to N, track time, show corrections.
- Unlock systems: localStorage arrays of completed chapters or exercises.
- Theme toggles: localStorage theme key and html class.
- Mobile nav: overlay + panel toggled by button.

## 10) Quick index of key JS entry points
- uml/assets/js/main.js: theme + nav + progress + reveal + chapter unlock.
- uml/assets/js/gamification.js: XP/badges/streak.
- uml/assets/js/exercises.js: guided/quiz/drag engine.
- uml/assets/js/exercise-solutions-svg.js: diagram renderers.
- uml/assets/js/download.js: export.
- uiux/assets/js/main.js: theme + nav + progress + reveal.
- droit/qcm-autonome.html: inline JS for QCM render/validation.
- sql/assets/js/*: SQL course core interactivity (see Section 6).

## 11) Notes for future implementation (assembleur, cybersecurity)
- assembleur/ directory exists but not yet inspected.
- Cyber securite B2/ exists with checksum.txt; content not read.
- Implementation should follow existing course patterns: hero, modules, QCM, exam.
- Prefer reusing interactive engines (quiz, drag, exam) for consistency.

## 12) Open questions for future work
- Identify if a global index or portal coordinates all courses.
- Check if server.js or api/index.js provides dynamic endpoints.
- Verify if any build scripts or PDF generators should be integrated.
- Confirm if existing course templates are preferred for new content.

## 13) Appendix: low-level UIUX module notes (ASCII)
- Module 1: UX is user experience (feeling), UI is user interface (visual).
- Module 1: Responsive design adapts to screen size.
- Module 2: CCU 4 steps: understand, design, prototype, test.
- Module 2: Pre-conception phases: data, cultural design, user journey.
- Module 3: Data collection methods include survey, interviews, observation.
- Module 3: Persona example includes behaviors, frustrations, persuasion, social.
- Module 4: Low-fi vs high-fi wireframes.
- Module 4: Design system contains reusable components and rules.
- Module 5: Mobile-first uses min-width; desktop-first uses max-width.
- Module 5: Breakpoints: 576, 768, 992, 1200.
- Module 6: Auto layout direction, gap, padding, align.
- Module 6: Hug = wrap to content, Fill = stretch to parent, Fixed = px.
- Module 7: Reorganization: desktop row to mobile column, priority to main content.
- Module 8: Ergonomie laws: Fitts, Hick, Jakob.
- Module 9: WCAG POCR; ARIA roles and labels.
- Module 10: Typography size, contrast, line length, spacing scale.

## 14) Appendix: UML module notes (ASCII)
- Module 1: UML definition and 13 diagrams (7 structure, 6 behavior).
- Module 2: Class diagram: visibility +/ -/ #/ ~, multiplicities, relations.
- Module 2: composition = black diamond, aggregation = white diamond.
- Module 2: inheritance = triangle to parent; realization = dashed.
- Module 3: Use case diagram elements: actor, ellipse, system boundary.
- Module 3: include = mandatory, extend = optional.
- Module 4: Activity symbols: initial, action, decision, fork/join, end.
- Module 4: Swimlanes show responsibilities.
- Module 5: Sequence diagrams show time flow top to bottom.
- Module 5: Messages: sync, async, return, create.
- Module 5: Fragments: alt, opt, loop, par, ref.

## 15) Data storage keys (localStorage)
- UML theme: rd_uml_theme
- UML chapter completion: rd_uml_completed
- UML exercise completion: rd_uml_ex_done
- UML gamification: rd_uml_progress
- UIUX theme: rd_uiux_theme

## 16) Content completeness checklist (this pass)
- UML: complete for chapters 1-5, cheat sheet, flashcards, exam, exercises, assets.
- UIUX: complete for landing, full course, exam, assets, images.
- SQL: modules and assets read earlier; details summarized.
- Droit: qcm-autonome read; other droit pages not read.
- Many other courses not read yet.

## 17) Suggested next steps (if needed)
- If strict "read everything" is still required, continue by reading remaining courses.
- If implementation begins, pick assembleur/ and Cyber securite B2/.
- If QCM content needs changes, use existing JS patterns to avoid regressions.

## 18) Droit QCM option details (ASCII)
- Q01 option A: Le droit informatique est un droit fondamental.
- Q01 option B: Le droit informatique concerne seulement les internautes.
- Q01 option C: Les droits informatiques sont differents des droits de l'homme en ligne.
- Q01 option D: Le droit informatique est souvent aborde via le droit de l'internet ou des donnees personnelles.
- Q01 correct: D.
- Q02 option A: Les droits informatiques ne comportent pas le droit d'acces a l'information.
- Q02 option B: Les droits sont les memes pour l'homme hors ligne et en ligne.
- Q02 option C: La liberte d'expression peut etre limitee par la loi en ligne.
- Q02 option D: Le droit a la vie privee est inclus dans le droit du numerique.
- Q02 correct: B, C, D.
- Q03 option A: Le RGPD oblige a proteger les donnees par des mesures adequates.
- Q03 option B: Le RGPD au Togo est entre en vigueur en octobre 2018.
- Q03 option C: RGPD signifie Regime General de Protection des Donnees.
- Q03 option D: Le RGPD en Europe est entre en vigueur en mai 2019.
- Q03 correct: A.
- Q04 option A: Les donnees sensibles sont des donnees a caractere personnel.
- Q04 option B: L'orientation sexuelle n'est pas une donnee sensible.
- Q04 option C: Les donnees sensibles sont d'origine raciale, politique ou mediatique.
- Q04 option D: Une sanction administrative est une donnee sensible.
- Q04 correct: A.
- Q05 option A: Code de commerce.
- Q05 option B: Code des communications electroniques et des postes.
- Q05 option C: Code du numerique.
- Q05 option D: Aucune bonne reponse.
- Q05 correct: D.
- Q06 option A: Accroit la confiance de ses partenaires.
- Q06 option B: Est protegee pour toujours des cyberattaques.
- Q06 option C: Recoit des gratifications speciales des autorites.
- Q06 option D: Evite toute responsabilisation.
- Q06 correct: A.
- Q07 option A: Notifier les violations de donnees a l'autorite competente.
- Q07 option B: Garantir le droit a l'oubli dans les cas prevus.
- Q07 option C: Conserver les donnees indefiniment.
- Q07 option D: Recueillir un consentement explicite pour tout traitement.
- Q07 correct: A, B.
- Q08 option A: Utilisation non autorisee des donnees des utilisateurs Facebook.
- Q08 option B: Manipulation electorale par profilage psychologique.
- Q08 option C: Violation des droits d'auteur sur les contenus partages.
- Q08 option D: Manque de transparence et de consentement.
- Q08 correct: A, B, D.
- Q09 option A: Des regles nationales de protection des SI.
- Q09 option B: La responsabilite des entreprises en cas de faille.
- Q09 option C: L'obligation d'Internet gratuit pour tous.
- Q09 option D: Des politiques internes de prevention et gestion des risques.
- Q09 correct: A, B, D.
- Q10 option A: Les contrats de logiciels et licences.
- Q10 option B: La responsabilite des hebergeurs et FAI.
- Q10 option C: La regulation des contenus numeriques.
- Q10 option D: L'obligation d'utiliser son vrai nom.
- Q10 correct: A, B, C.
- Q11 option A: Pouvoir demander la suppression de donnees personnelles.
- Q11 option B: Effacement automatique apres 5 ans.
- Q11 option C: Suppression de certains resultats de recherche sous conditions.
- Q11 option D: Interdiction totale de conserver des donnees.
- Q11 correct: A, C.
- Q12 option A: Vrai.
- Q12 option B: Faux.
- Q12 correct: B.
- Q13 option A: Vrai.
- Q13 option B: Faux.
- Q13 correct: A.
- Q14 option A: Vrai.
- Q14 option B: Faux.
- Q14 correct: B.
- Q15 option A: Vrai.
- Q15 option B: Faux.
- Q15 correct: B.
- Q16 option A: Vrai.
- Q16 option B: Faux.
- Q16 correct: B.
- Q17 option A: Vrai.
- Q17 option B: Faux.
- Q17 correct: B.
- Q18 option A: Vrai.
- Q18 option B: Faux.
- Q18 correct: B.
- Q19 open: entreprise traite donnees personnelles des la collecte/enregistrement/consultation/modification/transmission/suppression.
- Q20 open: RGPD = Reglement General sur la Protection des Donnees; sanctions jusqu'a 20M EUR ou 4% CA annuel.

## 19) UML exam detail by correct letter (ASCII)
- UML E01: UML signifie -> A.
- UML E02: UML est un langage de modelisation -> C.
- UML E03: 13 diagrammes -> C.
- UML E04: OMT -> B.
- UML E05: use cases -> C.
- UML E06: OMG standard 1997 -> C.
- UML E07: classes = structure -> B.
- UML E08: sequence = comportement -> B.
- UML E09: OMG meaning -> B.
- UML E10: non UML diagram -> C.
- UML E11: symbol + -> C.
- UML E12: symbol - -> A.
- UML E13: symbol # -> B.
- UML E14: multiplicite 1..* -> C.
- UML E15: losange noir -> B.
- UML E16: losange blanc -> A.
- UML E17: composition destruction -> B.
- UML E18: heritage -> C.
- UML E19: underline = statique -> B.
- UML E20: abstract italic -> B.
- UML E21: acteur -> B.
- UML E22: include obligatoire -> B.
- UML E23: extend optionnel -> B.
- UML E24: include arrow base->inclu -> B.
- UML E25: extend arrow extension->base -> B.
- UML E26: scenario nominal -> B.
- UML E27: acteur peut etre humain/systeme/timer -> C.
- UML E28: generalisation acteurs -> A.
- UML E29: CU nomme par verbe infinitif -> B.
- UML E30: cadre systeme -> B.
- UML E31: noeud initial -> B.
- UML E32: decision -> B.
- UML E33: conditions entre crochets -> B.
- UML E34: fork = 1 entree N sorties -> A.
- UML E35: join attend toutes activites -> B.
- UML E36: swimlanes -> B.
- UML E37: transitions automatiques -> B.
- UML E38: noeud final termine tous flux -> B.
- UML E39: fin de flux termine un seul -> B.
- UML E40: action = rectangle arrondi -> C.
- UML E41: temps haut->bas -> C.
- UML E42: sync = attend reponse -> B.
- UML E43: async = continue -> B.
- UML E44: activation -> B.
- UML E45: fragment alt -> A.
- UML E46: fragment opt -> B.
- UML E47: fragment loop -> C.
- UML E48: message method in class B -> B.
- UML E49: destruction -> C.
- UML E50: message synchrone arrow pleine -> B.

## 20) UIUX module micro-bullets (ASCII)
- M1: UX = ressenti; UI = visuel; responsive = adaptation ecran.
- M1: UX vs UI comparison table; analogy restaurant.
- M1: key idea: good UI without UX fails, and vice versa.
- M2: CCU phases (comprendre, concevoir, prototyper, tester).
- M2: pre-conception: data, cultural design, user journey.
- M2: roles: designers, devs, ergonomes; prototype saves time.
- M3: data collection: survey, observation, interviews, competitor analysis.
- M3: motifs vs besoins; define persona; UX recommendations.
- M3: persona fields: behaviors, frustrations, persuasion, social media.
- M4: wireframe types: low-fi sketch vs high-fi detailed.
- M4: design system components and standards.
- M4: tools: Figma, Adobe XD, Sketch, Zeplin.
- M5: desktop-first vs mobile-first; breakpoints and media queries.
- M5: min-width for mobile-first; max-width for desktop-first.
- M6: auto layout = Figma flexbox; direction/gap/padding/align.
- M6: Hug vs Fill vs Fixed with CSS equivalents.
- M6: constraints: left/right/top/bottom, center, scale.
- M7: responsive reorg: row->column, priority to main content.
- M7: nav -> hamburger; sidebar moves below or hides.
- M7: images full width on mobile; spacing reduced.
- M8: Fitts: target size+distance; Hick: options slow; Jakob: familiar patterns.
- M8: examples: large CTA buttons, fewer menu items, standard cart position.
- M9: WCAG POCR; ARIA labels and roles.
- M9: tools: WAVE, NVDA, VoiceOver, JAWS, Lighthouse.
- M10: typography hierarchy; 16px base; 60-80 chars per line.
- M10: spacing with 4/8px scale; margin/padding/gap distinctions.

## 21) UML exercises extra details (ASCII)
- X01 focus: classify UML diagrams; structure vs behavior; identify interaction diagrams.
- X01 hint: 7 structure and 6 behavior; interaction is subset of behavior.
- X01 solution type: text list.
- X02 focus: UML timeline and major milestones.
- X02 hint: methods before unification; OMG in 1997.
- X02 solution type: text list.
- X03 focus: fundamentals QCM (UML is modeling, code gen, language independent).
- X03 hint: UML is not a programming language.
- X03 solution type: text list.
- X04 focus: pick correct diagram per scenario.
- X04 hint: structure vs behavior; use cases = features.
- X04 solution type: text list.
- X05 focus: map authors to methods and contributions.
- X05 hint: Booch=notation, Rumbaugh=OMT, Jacobson=use cases.
- X05 solution type: text list.
- X06 focus: decode visibility symbols and types.
- X06 hint: + public, - private, # protected, ~ package.
- X06 solution type: text list.
- X07 focus: library classes and association class (Emprunt).
- X07 hint: Emprunt is association class between Membre and Livre.
- X07 solution type: SVG diagram + text.
- X08 focus: decide composition vs aggregation (4 cases).
- X08 hint: composition = life tied; aggregation = independent.
- X08 solution type: SVG diagram + text.
- X09 focus: pizzeria class model with multiplicities.
- X09 hint: ingredient can serve multiple pizzas; command contains pizzas.
- X09 solution type: SVG diagram + text.
- X10 focus: inheritance + interface for geometrical shapes.
- X10 hint: Forme is abstract; Dessinable is interface; realization is dashed.
- X10 solution type: SVG diagram + text.
- X11 focus: train reservation use cases and actors.
- X11 hint: actors: voyageur, guichetier, paiement, admin.
- X11 solution type: SVG diagram + text.
- X12 focus: include vs extend in online banking.
- X12 hint: include = mandatory; extend = optional; arrow directions differ.
- X12 solution type: SVG diagram + text.
- X13 focus: full use case textual description for ATM withdrawal.
- X13 hint: 8 fields; include nominal, alternate, error, postconditions.
- X13 solution type: text list.
- X14 focus: complete e-commerce use case diagram with generalization.
- X14 hint: visitor generalizes to client; include pay; extend promo code.
- X14 solution type: SVG diagram + text.
- X15 focus: room reservation use case with include/extend and admin.
- X15 hint: verify availability is include; notification is extend.
- X15 solution type: SVG diagram + text.
- X16 focus: simple activity flow for online order.
- X16 hint: include initial and final nodes; actions are rounded rectangles.
- X16 solution type: mermaid flowchart.
- X17 focus: authentication with decision and retry loop.
- X17 hint: use decision with [OK] and [KO]; loop until 3 tries.
- X17 solution type: mermaid flowchart.
- X18 focus: fork/join parallel tasks after order validation.
- X18 hint: fork splits into 3, join waits all.
- X18 solution type: mermaid flowchart.
- X19 focus: swimlanes for hiring process.
- X19 hint: 3 lanes: candidate, HR, manager; decisions for acceptance.
- X19 solution type: mermaid flowchart.
- X20 focus: repair sheet process with decisions and merges.
- X20 hint: decisions for car exists and insurance; merges before dates.
- X20 solution type: mermaid flowchart.
- X21 focus: sequence for ATM withdrawal.
- X21 hint: lifelines: client, DAB, bank; sync messages and returns.
- X21 solution type: mermaid sequence.
- X22 focus: sequence with alt fragment for login.
- X22 hint: alt branches for valid vs invalid credentials.
- X22 solution type: mermaid sequence.
- X23 focus: sequence with loop fragment for cart.
- X23 hint: loop only for add item; then checkout.
- X23 solution type: mermaid sequence.
- X24 focus: robot and articulated arm sequence.
- X24 hint: robot sends synchronous orders, arm returns status.
- X24 solution type: mermaid sequence.
- X25 focus: complete purchase sequence with loop, alt, opt.
- X25 hint: loop for items, alt for stock, opt for promo.
- X25 solution type: mermaid sequence.
