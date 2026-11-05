# Chapitre 1 — Fondamentaux C# et Écosystème .NET

> Fiche extraite du fichier `csharp/chapitres/chapitre1.html` (495 lignes, 35.9 Ko, sha256 `156486f604bd`).
> Famille : **cours-csharp** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/csharp/chapitres/chapitre1.html` |
| Titre du document | Chapitre 1 — Fondamentaux C# et Écosystème .NET \| C# B2 |
| Description meta | Chapitre 1 du cours C# B2 : Architecture du Common Language Runtime (CLR), compilation JIT, typage fort, types valeur vs types référence, boxing/unboxing, passage par valeur/ref/out et pattern matching moderne. Notions fondamentales, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Fondamentaux C# et Écosystème .NET |
| 3 | h2 | — | 1. L’Écosystème .NET & Le Common Language Runtime (CLR) |
| 4 | h2 | — | 2. Système de Types : Pile (Stack) vs Tas (Heap) |
| 5 | h2 | — | 3. Passage d’Arguments de Méthode : val, ref, out & in |
| 6 | h2 | — | 4. Pattern Matching & Switch Expressions Modernes |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 4 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Fondamentaux C# et Écosystème .NET
  - **H2** — 1. L’Écosystème .NET & Le Common Language Runtime (CLR)
      - **H4** — Responsabilités de la CLR
      - **H4** — Avantages du modèle managé
  - **H2** — 2. Système de Types : Pile (Stack) vs Tas (Heap)
  - **H2** — 3. Passage d’Arguments de Méthode : val, ref, out & in
      - **H4** — Le mot-clé ref
      - **H4** — Le mot-clé out
      - **H4** — Le mot-clé in
  - **H2** — 4. Pattern Matching & Switch Expressions Modernes
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Détecteur de Boxing/Unboxing et allocation Stack vs Heap
    - **H3** — Exercice 2 — Passage d'arguments par valeur, référence (ref) et sortie (out)
    - **H3** — Exercice 3 — Moteur de Pattern Matching et Switch Expressions C#
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `csharpnav` | Portail → `/`<br>C# B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| C# B2 | `../index.html` | `csharp/index.html` | interne |
| Sommaire | `../sommaire.html` | `csharp/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `csharp/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `csharp/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `csharp/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `csharp/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `csharp/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `csharp/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `csharp/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `csharp/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `csharp/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `csharp/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `csharp/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `csharp/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `csharp/chapitres/formules.html` | interne |
| Chapitre 2 — Encapsulation & Programmation Orientée Objet Moderne en C# | `chapitre2.html` | `csharp/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Sur le tas managé (Heap), gérée par le Garbage Collector. |  | — | `opt` | — | actif | — |
| Sur la pile d’exécution (Stack), détruite automatiquement au retour de la méthode. |  | — | `opt` | — | actif | data-correct=1 |
| Dans les métadonnées globales de l’assemblage CIL. |  | — | `opt` | — | actif | — |
| Dans le cache registre L1 du compilateur Roslyn. |  | — | `opt` | — | actif | — |
| int a = 10; int b = a; |  | — | `opt` | — | actif | — |
| string s = "test"; object o = s; |  | — | `opt` | — | actif | — |
| int n = 5; object obj = n; |  | — | `opt` | — | actif | data-correct=1 |
| double d = 3.14; float f = (float)d; |  | — | `opt` | — | actif | — |
| La variable doit être initialisée par l’appelant avant le passage de l’argument. |  | — | `opt` | — | actif | — |
| La méthode appelée doit obligatoirement assigner une valeur au paramètre avant tout retour |  | — | `opt` | — | actif | data-correct=1 |
| Le paramètre ne peut pas être modifié au sein de la méthode appelée. |  | — | `opt` | — | actif | — |
| Le paramètre doit impérativement être un type référence alloué sur le tas. |  | — | `opt` | — | actif | — |
| Une référence vers l’objet parent en cours d’évaluation. |  | — | `opt` | — | actif | — |
| Le motif par défaut (discard) capturant toutes les valeurs non appariées par les branches |  | — | `opt` | — | actif | data-correct=1 |
| Une directive ordonnant au compilateur de lever une NotImplementedException. |  | — | `opt` | — | actif | — |
| Un alias pour la valeur null. |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `csb2-c1-e1` | csharp | 300 | suspendue | `int a = 42; object o = a; int b = (int)o; string s = "test";` | Exercice 1 — Détecteur de Boxing/Unboxing et allocation Stack vs Heap |
| `csb2-c1-e2` | csharp | 300 | suspendue | `INIT a=10, b=20, c=0 METHOD Modifier(val x, ref y, out z) BODY x=x*2; y=y+50; z=x+y CALL Modifier(a, ref b, out c)` | Exercice 2 — Passage d'arguments par valeur, référence (ref) et sortie (out) |
| `csb2-c1-e3` | csharp | 300 | suspendue | `Circle Radius=12 Circle Radius=4 Rectangle Width=5 Height=5 Rectangle Width=8 Height=3 Triangle Base=4 Height=6` | Exercice 3 — Moteur de Pattern Matching et Switch Expressions C# |

- QCM : 1 bloc(s), **4 question(s)**.
- Encadres pedagogiques : 9 (`.box`, variantes `box--*`).
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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 10 · elements `code` : 80
- SVG inline : 23 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-info`, `#i-warning`, `#i-terminal`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3132 mots · 527 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 71. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 21 |
| `opt` | 16 |
| `box` | 9 |
| `box__title` | 9 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `card` | 5 |
| `card-title` | 5 |
| `language-csharp` | 4 |
| `q` | 4 |
| `q__stem` | 4 |
| `opts` | 4 |
| `q__exp` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |

Attributs `data-*` : `data-correct` (4), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
