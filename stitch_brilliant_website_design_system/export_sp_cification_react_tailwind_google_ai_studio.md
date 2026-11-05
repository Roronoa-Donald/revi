# EXPORT DESIGN SYSTEM & SPÉCIFICATION REACT / TAILWIND
**Projet : cours.interactifs (Style Active STEM Discovery / Brilliant.org)**  
*Document d'ingénierie et prompt prêt à coller dans Google AI Studio pour génération des composants React + Tailwind CSS.*

---

## 1. PROMPT SYSTÈME DIRECT POUR GOOGLE AI STUDIO

Copiez-collez l'encadré ci-dessous directement dans la fenêtre système ou prompt principal de **Google AI Studio** (avec Gemini 1.5 Pro ou 2.0 Flash) :

```markdown
Tu es un ingénieur Frontend Senior et UI/UX designer expert en React 19, TypeScript, Tailwind CSS v3/v4 et Lucide React.
Ta mission est de convertir les spécifications d'interface et le Design System de la plateforme "cours.interactifs" (style Active STEM Discovery inspiré de Brilliant.org) en composants React réutilisables, modulaires, typés et fidèles au pixel près.

### 1. Stack & Conventions techniques :
- React avec hooks (useState, useEffect, useMemo) et TypeScript strict.
- Tailwind CSS avec les classes exactes configurées dans le thème ci-après.
- Lucide React pour les icônes (ex: BookOpen, Flame, CheckCircle, Terminal, RefreshCw, ChevronRight, Lock, User, Sparkles).
- Typographie : `font-['Space_Grotesk']` pour les titres, badges, métriques et `font-sans` ou `font-['Hanken_Grotesk']` pour les textes courants.
- Style tactile "Brilliant" : boutons et cartes avec bordure fine sombre/subtile, effet d'ombre dure 3D au bas (`shadow-[0_4px_0_#169c4b]`), micro-interactions au clic (`active:translate-y-[2px] active:shadow-none`).
```

---

## 2. CONFIGURATION TAILWIND CSS (`tailwind.config.js`)

Pour que tous les composants React générés aient exactement les mêmes couleurs et styles, intégrez ce fichier de configuration :

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#21c35e', // Émeraude Brilliant
          dark: '#169c4b',    // Ombre 3D du bouton
          light: '#e8fbf0',   // Fond subtil d'accentuation
          container: '#d1fae5',
          'on-primary': '#ffffff',
          'on-primary-container': '#065f46',
        },
        surface: {
          DEFAULT: '#fbf8fc',
          dim: '#dcd9dd',
          bright: '#ffffff',
          container: '#f6f2f7',
          'container-low': '#f3eff4',
          'container-high': '#ece8ee',
        },
        inverse: {
          surface: '#18191c',
          'on-surface': '#f3f4f6',
          primary: '#4ade80',
        },
        outline: {
          DEFAULT: '#e2e0e5',
          subtle: '#ebe8ee',
          variant: '#9ca3af',
        },
        accent: {
          amber: '#f59e0b',
          'amber-light': '#fef3c7',
          blue: '#3b82f6',
          'blue-light': '#eff6ff',
          red: '#ef4444',
          'red-light': '#fee2e2',
        }
      },
      fontFamily: {
        headline: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        code: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'button-primary': '0 4px 0 #169c4b',
        'button-secondary': '0 3px 0 #d1d5db',
        'card-interactive': '0 4px 12px rgba(0,0,0,0.03)',
      },
      borderRadius: {
        'stem': '16px',
        'stem-lg': '20px',
        'stem-pill': '9999px',
      }
    },
  },
  plugins: [],
}
```

---

## 3. COMPOSANTS REACT PRIORITAIRES À GÉNÉRER DANS GOOGLE AI STUDIO

Demandez à Google AI Studio de générer les composants suivants selon les spécifications précises :

### 1. `ButtonStem.tsx` (Bouton d'action tactile 3D)
- **Props** : `variant` ('primary' | 'secondary' | 'outline' | 'danger' | 'ghost'), `size` ('sm' | 'md' | 'lg'), `icon` (ReactNode), `children`, `disabled`, `onClick`.
- **Style** : 
  - `primary` : `bg-[#21c35e] hover:bg-[#1eb356] text-white font-bold rounded-xl shadow-[0_4px_0_#169c4b] active:translate-y-[2px] active:shadow-[0_2px_0_#169c4b] transition-all`
  - `secondary` : `bg-white border-2 border-outline text-gray-800 rounded-xl shadow-[0_3px_0_#e2e0e5] active:translate-y-[2px] active:shadow-none transition-all`

### 2. `TopNavBar.tsx` (Barre de navigation supérieure responsive)
- Affichage logo `cours.interactifs` avec icône géométrique verte.
- Navigation desktop : *Portail*, *Épreuves*, *Atelier*, *Mon compte*.
- Variante mobile : Condensée avec compteur de streak/flamme (*Jour 12 / 3 j*), badge de cours et avatar/statut.
- Bascule claire / sombre (`themeToggle`).

### 3. `BottomNavBar.tsx` (Barre de navigation mobile fixe)
- Ancrée en bas (`fixed bottom-0 w-full z-50 bg-white/95 backdrop-blur border-t border-outline flex justify-around py-2`).
- 4 onglets : *Today* (calendar), *Courses* (school - actif avec fond émeraude léger), *Practice* (psychology), *Profile* (person).

### 4. `CourseCard.tsx` (Carte de cours pour la grille du portail)
- **Props** : `level` ('B1' | 'B2' | 'B3'), `title`, `description`, `chaptersCount`, `isFreeFirstChapter`, `icon`, `onClick`.
- **Style** : Carte blanche aux coins arrondis `rounded-2xl border border-outline hover:border-primary hover:shadow-lg transition-all p-5 flex flex-col justify-between`.
- Badges : `badge-level` (pillule colorée selon niveau), `badge-free` (*Ch. 1 gratuit*).

### 5. `CodeLab.tsx` (Atelier & simulateur de code / SQLite)
- Zone d'en-tête avec onglet de fichier (`bac_a_sable.sql`), statut WASM et sélecteur de schéma.
- Éditeur de code (hauteur desktop ~360px, mobile 240px) avec coloration syntaxique.
- Bouton pleine largeur : `⚡ Exécuter la requête (Ctrl+Entrée)` avec feedback d'exécution.
- Console d'onglets : *Résultats (tableau relationnel défilable)*, *Schéma*, *Erreurs / Tuteur IA*.

### 6. `FlashcardReview.tsx` (Carte de révision interactive 3D)
- Face avant (Recto) : Question ciblée, extrait de code SQL.
- Face arrière (Verso) : Réponse détaillée + encadré avertissement piège d'examen.
- Barre d'auto-évaluation Leitner :
  - 🔴 *À revoir (1 j)*
  - 🟡 *Moyen (3 j)*
  - 🟢 *Maîtrisé (7 j)*

### 7. `PedagogicalBox.tsx` (Encadrés didactiques)
- Variantes : 
  - `situation` : fond `#fff4ee`, accent orange
  - `objectifs` : fond `#f0fbf5`, accent vert émeraude
  - `pitfall` : fond `#fffbeb`, accent ambre avec icône warning
  - `tech` : fond `#f1f5ff`, accent bleu
