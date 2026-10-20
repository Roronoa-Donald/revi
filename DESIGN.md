# REVI-MU — Système de Design & Charte Frontend (DESIGN.md)

Ce document formalise les principes, tokens sémantiques, composants d’interface, règles d’accessibilité et directives ergonomiques appliqués sur l'ensemble de la plateforme d'apprentissage **REVI-MU**.

---

## 1. Principes Fondamentaux & Signature Visuelle

1. **Atmosphère Éditoriale « Papier Chaud » (Thème *Latte*)** :
   - Fond d'écran clair par défaut inspiré des cahiers d'ingénieur et du papier vélin chaud (`--color-bg: #faf7f2`), évitant l'éblouissement des fonds `#ffffff` stérile et la froideur des gris bleutés.
   - Surfaces de cartes surélevées en blanc pur (`--color-bg-elevated: #ffffff`) pour créer une hiérarchie de plans sans recourir à des bordures criardes.
   - Thème sombre sobre (`[data-theme="dark"]`, `--color-bg: #0c0a09`, `--color-bg-elevated: #1c1917`).

2. **Typographie d’Ingénierie & Monospace Distinctif** :
   - Police unique d'identité : **JetBrains Mono** pour l'intégralité de la plateforme (titres, prose, métadonnées, formules, code).
   - **Hébergement local autonome (100% hors-ligne)** : Fichiers WOFF2 variables hébergés dans [assets/fonts/](file:///home/rd/Desktop/proba/assets/fonts/) (plage 300 à 800, roman et italic), garantissant un affichage instantané sans latence réseau et une totale indépendance vis-à-vis des CDNs externes en examen.
   - Les hauteurs de ligne (`--leading-normal: 1.6`, `--leading-relaxed: 1.7`) et la largeur de prose (`--container-prose: 720px`) garantissent une lecture reposante lors de sessions d'étude intensives.
   - Proscription des textes en capitales intégrales (*all-caps*) pour les blocs de lecture.

3. **Dualité Didactique : Pratique Informatique & Études de Cas** :
   - **Matières de programmation** (Python, C/C++, Java, PHP, Web, SQL) : environnement Monaco Editor avec exécution cloisonnée, console d'entrée standard, diagnostics d'erreurs et suivi de tests.
   - **Matières d'analyse et théoriques** (Recherche Opérationnelle, Réseaux, Droit, Économie, Cybersécurité conceptuelle, etc.) : formulaire interactif d'étude de cas (`language: 'analyse'`) avec grilles de cas structurées (`[Cas 1]`, `[Cas 2]`, `[Cas 3]`), validation instantanée critère par critère, sans surcoût technique ni lourdeur inutile.

4. **Accessibilité Sans Concession (WCAG 2.2 AA)** :
   - Ratio de contraste minimum de **4.5:1** pour tout texte et tout élément interactif sur fond blanc ou latte.
   - Navigation clavier intégrale avec anneau de focus uniforme et visible (`--color-ring: #3556d9`, `outline: 2px solid`, `outline-offset: 2px`).
   - Aucune information véhiculée exclusivement par la couleur.
   - Respect strict de `prefers-reduced-motion`.

---

## 2. Système de Tokens Sémantiques

Les tokens sont déclarés dans [assets/css/tokens.css](file:///home/rd/Desktop/proba/assets/css/tokens.css).

### A. Palette de Couleurs Sémantiques

| Rôle Sémantique | Token CSS | Valeur Light | Valeur Dark | Contraste / Règle |
| :--- | :--- | :--- | :--- | :--- |
| **Fond page** | `--color-bg` | `#faf7f2` (*Latte*) | `#0c0a09` | Fond principal apaisant |
| **Surfaces élevées** | `--color-bg-elevated` | `#ffffff` | `#1c1917` | Cartes, modales, ateliers |
| **Surfaces subtiles** | `--color-bg-subtle` | `#f3eee5` | `#141210` | En-têtes, tags, inputs secondaires |
| **Texte principal** | `--color-text` | `#141414` | `#fafaf9` | Encre profonde (≥ 12:1) |
| **Texte secondaire** | `--color-text-muted` | `#57534e` | `#d6d3d1` | Lisibilité haute (≥ 7:1) |
| **Texte tertiaire** | `--color-text-subtle`| `#78716c` | `#a8a29e` | Métadonnées (≥ 4.5:1) |
| **Bordure standard** | `--color-border` | `#e7e1d7` | `#292524` | Tracé fin 1px |
| **Bordure forte** | `--color-border-strong`| `#d6cfc2` | `#44403c` | Séparations nettes |
| **Interactif (Liens/Focus)** | `--color-interactive`| `#3556d9` | `#7491ff` | Bleu periwinkle soutenu (≥ 5.6:1) |
| **Anneau de focus (A11y)** | `--color-ring` | `#3556d9` | `#7491ff` | Focus-visible bien visible |
| **Succès / Validation** | `--color-success` | `#047857` | `#34d399` | Vert validé (≥ 5.0:1) |
| **Erreur / Échec** | `--color-error` | `#b91c1c` | `#f87171` | Rouge diagnostic (≥ 6.4:1) |
| **Avertissement** | `--color-warning` | `#8a5306` | `#fbbf24` | Ambre technique (≥ 4.5:1) |

### B. Échelle Typographique (JetBrains Mono)

| Rôle | Token CSS | Taille | Usage |
| :--- | :--- | :--- | :--- |
| **Display Hero** | `--text-6xl` | `3.75rem` (60px) | Titres majeurs de portail |
| **Titre Page H1** | `--text-4xl` | `2.25rem` (36px) | Titres de chapitres et cours |
| **Sous-titre H2** | `--text-2xl` | `1.375rem` (22px) | Sections et jalons majeurs |
| **Intertitre H3** | `--text-xl` | `1.125rem` (18px) | Sous-sections, cartes de cas |
| **Corps standard** | `--text-base`| `0.875rem` (14px) | Prose pédagogique, consignes |
| **Texte dense** | `--text-sm` | `0.8125rem` (13px) | Indices, code console, tableaux |
| **Micro-étiquette**| `--text-xs` | `0.75rem` (12px) | Badges, tags de temps, compteurs |

### C. Espacements, Rayons & Élévation

- **Échelle d'espacement (base 4pt)** : `--space-1` (4px), `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-5` (20px), `--space-6` (24px), `--space-8` (32px), `--space-12` (48px).
- **Rayons de courbure** : `--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (16px), `--radius-full` (9999px pour pills & badges).
- **Ombres discrètes** : `--shadow-xs` (`0 1px 3px rgba(0,0,0,0.04)`), `--shadow-md` (`0 4px 7px rgba(0,0,0,0.05)`), `--shadow-glow-accent` (`0 0 0 4px rgba(53, 86, 217, 0.16)`).

---

## 3. Composants Communs & Règles d’Interface

### A. Navigation & En-tête de Cours
- **Sticky Topbar** : Hauteur fixe 56px, floutage d'arrière-plan (`backdrop-filter: blur(8px)`).
- **Bouton Portail** : Lien discret vers l'accueil (`.nav__home`) avec icône maison et label explicite.
- **Titre du cours** : Doit être contraint en largeur sur mobile (`max-width: calc(100vw - 160px)`) avec ellipse pour éviter tout débordement horizontal.
- **Thème Toggle** : Bouton 40×40px avec icônes soleil/lune conformes aux exigences de contraste.

### B. Sommaire du Cours (`sommaire.html`)
- **Hiérarchie de titres sans saut** : `<h1>` (Titre du sommaire) $\rightarrow$ `<h2>Programme des chapitres</h2>` $\rightarrow$ `<h3>` (Titres individuels de chaque chapitre).
- **Cartes de chapitres (`.summary-list` / `.summary-item`)** :
  - Liste ordonnée stylisée, sans puces brutes du navigateur (`list-style: none; padding-left: 0;`).
  - Bloc numéro stylisé (`.summary-item__num`) dans la couleur d'accent du cours.
  - Métadonnées lisibles (Badge d'accès libre ou réservé, durée estimée de travail avec icône horloge).
  - Transition de survol avec légère élévation (`transform: translateY(-2px)`).

### C. Leçon & Contenu Didactique (`chapitres/chapitreN.html`)
- **Formules mathématiques KaTeX** :
  - Toutes les équations hors-ligne (`.katex-display`) bénéficient de `overflow-x: auto; max-width: 100%;` pour permettre le défilement horizontal sans forcer le document à déborder.
- **Encadrés pédagogiques (`.box--situation`, `.box--objective`, `.box--alert`)** :
  - Tracé fin avec fond teinté doux (`--RD-RO-soft`, etc.).
  - Les étiquettes de formules (`.formula-label`) conservent une casse naturelle et proscrivent le `text-transform: uppercase` pour préserver le rythme de lecture.
- **Tableaux de données** : `display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; max-width: 100%;`.

### D. Atelier & Études de Cas Interactives (`.lab`)
- **En-tête de l'atelier** : Titre de l'exercice, badge de modalité (« Étude de cas » ou langage de code), objectif pédagogique en gras.
- **Cas d'exemple & indices** :
  - Échantillon visible avec entrées et sorties attendues.
  - Balise `<details class="lab__hints">` fermée par défaut : pousse l'étudiant à raisonner avant de consulter l'aide.
- **Grille de cas (`.lab__analyse-grid`)** :
  - Chaque cas (`[Cas 1]`, `[Cas 2]`, `[Cas 3]`) dispose de son propre champ de saisie avec placeholder contextualisé et libellé accessible (`.sr-only`).
  - Validation réactive : coloration vert doux (`.lab__case--ok`) ou rouge doux (`.lab__case--ko`) sans bruit agressif.
  - Touche `Entrée` configure la soumission immédiate sur champ textuel simple.
- **Boutons d'action (`.lab__btn`)** :
  - Bouton principal (« Exécuter » ou « Valider mes réponses ») à fort contraste.
  - États `:disabled`, `:active` et `:focus-visible` clairement marqués.
  - Indicateur de chargement (`.lab__spinner`) fluide et prédictible.

---

## 4. Règles Responsives & Breakpoints

| Breakpoint | Largeur | Comportement Clé |
| :--- | :--- | :--- |
| **Desktop XL** | $\ge 1280\text{px}$ | Grille portail 4 colonnes, conteneur 1280px centré. |
| **Desktop / Laptop** | $1024\text{px} - 1279\text{px}$ | Grille portail 3 colonnes, navigation complète déployée. |
| **Tablette** | $768\text{px} - 1023\text{px}$ | Grille portail 2 colonnes, liens de chapitres défilables horizontalement. |
| **Mobile Standard** | $390\text{px} - 767\text{px}$ | Grille 1-2 colonnes, paddings ajustés (14px), chips compacts, zéro débordement. |
| **Mobile Étroit** | $\le 360\text{px}$ | 1 colonne complète, titre tronqué avec ellipse, boutons à largeur pleine si nécessaire. |

### Règle d'Or Responsive
Aucun élément ne doit provoquer de débordement horizontal involontaire sur le document. La règle globale `overflow-x: hidden` sur `html, body` et le confinement des éléments larges (`table`, `pre`, `.katex-display`) garantissent une expérience fluide et sans saut sur écran tactile.

---

## 5. Normes de Mouvement & Transitions

- **Durées courtes** : 150ms pour les boutons et contrôles, 200ms pour les cartes, 300ms pour les panneaux accordéons.
- **Bascule de thème fluide (`.theme-transitioning`)** : L'alternance clair/sombre déclenche une transition douce de 150ms (`background-color`, `color`, `border-color`, `box-shadow`) activée uniquement lors du clic utilisateur et automatiquement désactivée après 220ms. Cette approche protège le premier chargement de la page contre tout flash de couleur ou saccade.
- **Propriétés privilégiées** : `transform` et `opacity` exclusivement ; pas d'animation sur `height`, `width`, ou `padding`.
- **Préférence mouvement réduit** :
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after, html.theme-transitioning * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 6. Critères d'Acceptation & Définition du Prêt (DoD)

1. **Visuel** : Identité « Latte » cohérente, typographie JetBrains Mono harmonieuse, aucune puce brute orpheline, aucun texte tronqué inélégamment.
2. **Accessibilité** : Contraste de tout texte supérieur ou égal à 4.5:1, navigation clavier complète avec anneau de focus net, hiérarchie de titres sans saut.
3. **Responsivité** : Aucun défilement horizontal parasite sur les 4 viewports de référence (`1440x900`, `768x1024`, `390x844`, `360x800`).
4. **Intégrité** : 100% de réussite sur les tests automatisés du catalogue (`npm test`), aucune régression de code ou de données.
