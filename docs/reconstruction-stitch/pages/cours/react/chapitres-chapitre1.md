# Chapitre 1 — Penser en composants & l’écosystème JSX / Vite

> Fiche extraite du fichier `react/chapitres/chapitre1.html` (479 lignes, 31.8 Ko, sha256 `56f21162f6fe`).
> Famille : **cours-react** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/react/chapitres/chapitre1.html` |
| Titre du document | Chapitre 1 — Penser en composants & l’écosystème JSX / Vite \| React B2 |
| Description meta | Chapitre 1 du cours React B2 : Paradigme déclaratif, modèle mental de React, outillage Vite, syntaxe JSX, Fragments et montage via createRoot. Théorie, exemples détaillés, exercices JavaScript exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Penser en composants & l’écosystème JSX / Vite |
| 3 | h2 | — | 1. Le paradigme déclaratif et le modèle mental de React |
| 4 | h2 | — | 2. L’outillage moderne avec Vite |
| 5 | h2 | — | 3. La syntaxe JSX (JavaScript XML) |
| 6 | h2 | — | 4. Montage dans le DOM : createRoot |
| 7 | h2 | — | 5. Pour aller plus loin : Rappels JavaScript ES6+ indispensables pour React |
| 8 | h2 | — | 6. Exercices de code |
| 9 | h2 | — | 7. QCM — niveau examen |
| 10 | h2 | — | 8. Erreurs classiques — récapitulatif |
| 11 | h2 | — | 9. Méthodologie de résolution |
| 12 | h2 | — | 10. Révision active |
| 13 | h2 | — | 11. Test de maîtrise |
| 14 | .lab | code lab | 3 bloc(s) |
| 15 | .qcm | QCM | 9 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Penser en composants & l’écosystème JSX / Vite
  - **H2** — 1. Le paradigme déclaratif et le modèle mental de React
  - **H2** — 2. L’outillage moderne avec Vite
  - **H2** — 3. La syntaxe JSX (JavaScript XML)
  - **H2** — 4. Montage dans le DOM : createRoot
  - **H2** — 5. Pour aller plus loin : Rappels JavaScript ES6+ indispensables pour React
  - **H2** — 6. Exercices de code
    - **H3** — Exercice 1 — Créer un React Element (createElement)
    - **H3** — Exercice 2 — Rendu conditionnel JSX
    - **H3** — Exercice 3 — Décomposition en arbre de composants
  - **H2** — 7. QCM — niveau examen
  - **H2** — 8. Erreurs classiques — récapitulatif
  - **H2** — 9. Méthodologie de résolution
  - **H2** — 10. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 10 notions à connaître absolument
  - **H2** — 11. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `reactnav` | Portail → `/`<br>React B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **25** (externes : 4).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| React B2 | `../index.html` | `react/index.html` | interne |
| Sommaire | `../sommaire.html` | `react/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `react/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `react/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `react/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `react/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `react/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `react/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `react/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `react/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `react/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `react/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `react/chapitres/simulateur-examen.html` | interne |
| annonce officielle de Vite 8 | `https://vite.dev/blog/announcing-vite8` | `https://vite.dev/blog/announcing-vite8` | externe |
| guide de démarrage Vite | `https://vite.dev/guide/` | `https://vite.dev/guide/` | externe |
| présentation officielle des transformations JSX | `https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html` | `https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html` | externe |
| guide de migration React 19 | `https://react.dev/blog/2024/04/25/react-19-upgrade-guide` | `https://react.dev/blog/2024/04/25/react-19-upgrade-guide` | externe |
| Réviser avec les flashcards | `cartes.html` | `react/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `react/chapitres/formules.html` | interne |
| Chapitre 2 — Composants fonctionnels & transmission de props | `chapitre2.html` | `react/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Une bibliothèque JavaScript pour construire des interfaces utilisateur |  | — | `opt` | — | actif | data-correct=1 |
| Un framework CSS concurrent de Tailwind |  | — | `opt` | — | actif | — |
| Un serveur de base de données relationnelles |  | — | `opt` | — | actif | — |
| Décrire le résultat visuel attendu pour un état donné |  | — | `opt` | — | actif | data-correct=1 |
| Manipuler directement le DOM avec getElementById |  | — | `opt` | — | actif | — |
| Écrire des requêtes SQL dans le HTML |  | — | `opt` | — | actif | — |
| Appels à React.createElement (classique) ou au runtime react/jsx-runtime (automatique) |  | — | `opt` | — | actif | data-correct=1 |
| Chaînes de texte injectées avec innerHTML |  | — | `opt` | — | actif | — |
| Code binaire machine assembleur |  | — | `opt` | — | actif | — |
| className |  | — | `opt` | — | actif | data-correct=1 |
| class |  | — | `opt` | — | actif | — |
| classList |  | — | `opt` | — | actif | — |
| Vite |  | — | `opt` | — | actif | data-correct=1 |
| Create React App |  | — | `opt` | — | actif | — |
| Gulp |  | — | `opt` | — | actif | — |
| Un Fragment React (<>...</>) |  | — | `opt` | — | actif | data-correct=1 |
| Une balise <iframe> |  | — | `opt` | — | actif | — |
| Un tableau JSON brut |  | — | `opt` | — | actif | — |
| createRoot() de react-dom/client |  | — | `opt` | — | actif | data-correct=1 |
| document.write() |  | — | `opt` | — | actif | — |
| window.navigate() |  | — | `opt` | — | actif | — |
| /> |  | — | `opt` | — | actif | data-correct=1 |
| > |  | — | `opt` | — | actif | — |
| ]]> |  | — | `opt` | — | actif | — |
| Rolldown et Oxc |  | — | `opt` | — | actif | data-correct=1 |
| Uniquement Rollup et esbuild |  | — | `opt` | — | actif | — |
| React Router et Redux |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `rx2-c1-e1` | javascript | 300 | suspendue | `button Valider` | Exercice 1 — Créer un React Element (createElement) |
| `rx2-c1-e2` | javascript | 300 | suspendue | `1 Alice` | Exercice 2 — Rendu conditionnel JSX |
| `rx2-c1-e3` | javascript | 300 | suspendue | `Accueil Bienvenue en B2 Equipe Peda` | Exercice 3 — Décomposition en arbre de composants |

- QCM : 1 bloc(s), **9 question(s)**.
- Encadres pedagogiques : 10 (`.box`, variantes `box--*`).
- Blocs replies : 3 (`<details>`).

Etats et interactions a reconstruire :

- En-tete compact : fil d'Ariane, titre, meta (module, duree, statut gratuit).
- Encadres pedagogiques : mise en situation, objectifs, intuition, piege, methode, technique, revision.
- Tableaux de donnees et blocs pseudo-code defilables horizontalement.
- Exercices de code (`div.lab[data-lab]`) : editeur, entree standard, console a 3 onglets, tuteur IA.
- Correction suspendue si `data-grading-suspended="1"` : bouton « Validation suspendue » desactive et avis visible.
- QCM : options desactivees apres reponse, bonne reponse `is-correct`, mauvaise `is-wrong`, explication `is-shown`.
- Score QCM : `Score : n/N (p %)` + palier de maitrise (4 bandes).
- Checklist de maitrise : case `data-mark-done`, etat persiste en localStorage par chapitre.
- Navigation de bas de page : chapitre precedent / suivant.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 11 · elements `code` : 67
- SVG inline : 23 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-lightbulb`, `#i-shield`, `#i-terminal`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2341 mots · 489 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 64. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 27 |
| `ic` | 21 |
| `box` | 10 |
| `box__title` | 10 |
| `q` | 9 |
| `q__stem` | 9 |
| `opts` | 9 |
| `q__exp` | 9 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |
| `badge` | 3 |

Attributs `data-*` : `data-correct` (9), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

## 11. Controle qualite automatique

- Titres `h1` : 1
- Boutons sans texte ni aria-label : 0
- Champs identifies sans label associe : 0
- Images sans attribut alt : 0
- Liens sans texte ni aria-label : 0
- Emoji detectes : 0 (la charte du produit les proscrit)

## 12. Renvois

- Layouts et gabarits : [04_LAYOUTS_ET_STRUCTURES.md](../../../04_LAYOUTS_ET_STRUCTURES.md)
- Composants et etats : [05_COMPOSANTS_REUTILISABLES.md](../../../05_COMPOSANTS_REUTILISABLES.md) · [10_ETATS_INTERFACE.md](../../../10_ETATS_INTERFACE.md)
- Regles d'acces : [11_ETATS_CONDITIONNELS.md](../../../11_ETATS_CONDITIONNELS.md) · [17_REGLES_METIER.md](../../../17_REGLES_METIER.md)
- Captures a produire : [22_REGISTRE_CAPTURES.md](../../../22_REGISTRE_CAPTURES.md)

*Fiche generee le 2026-11-05 par `tools/extract.mjs` ; donnees brutes dans `evidence/pages.json`.
