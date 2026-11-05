# Chapitre 4 — Collections Génériques & Gestion Avancée des Exceptions

> Fiche extraite du fichier `csharp/chapitres/chapitre4.html` (455 lignes, 32.7 Ko, sha256 `a1969ef45b2d`).
> Famille : **cours-csharp** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/csharp/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Collections Génériques &amp; Gestion Avancée des Exceptions \| C# B2 |
| Description meta | Chapitre 4 du cours C# B2 : System.Collections.Generic, List&lt;T&gt;, Dictionary&lt;TKey, TValue&gt;, HashSet&lt;T&gt;, recherche TryGetValue, gestion robuste des erreurs, filtres catch when et contraintes de généricité where T. Notions fondamentales, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Collections Génériques & Gestion Avancée des Exceptions |
| 3 | h2 | — | 1. Collections Génériques : List<T>, Dictionary<TKey, TValue> & HashSet<T> |
| 4 | h2 | — | 2. Gestion Robuste des Exceptions & Filtres catch ... when |
| 5 | h2 | — | 3. Contraintes de Généricité : La Clause where T |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 4 question(s) |
| 14 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Collections Génériques & Gestion Avancée des Exceptions
  - **H2** — 1. Collections Génériques : List<T>, Dictionary<TKey, TValue> & HashSet<T>
  - **H2** — 2. Gestion Robuste des Exceptions & Filtres catch ... when
  - **H2** — 3. Contraintes de Généricité : La Clause where T
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Collections génériques C# et recherche sécurisée TryGetValue
    - **H3** — Exercice 2 — Gestion des exceptions avec filtres catch ... when
    - **H3** — Exercice 3 — Validateur de contraintes génériques (where T : ...)
  - **H2** — 5. QCM — niveau examen
  - **H2** — 6. Erreurs classiques — récapitulatif
  - **H2** — 7. Méthodologie de résolution
  - **H2** — 8. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 9. Test de maîtrise

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
| Chapitre 5 — LINQ, Délégués & Système Événementiel | `chapitre5.html` | `csharp/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce qu’elle alloue moins de mémoire sur la pile d’exécution. |  | — | `opt` | — | actif | — |
| Parce qu’elle évite de lever une KeyNotFoundException si la clé est absente et n’effectue |  | — | `opt` | — | actif | data-correct=1 |
| Parce qu’elle trie automatiquement le dictionnaire par ordre croissant. |  | — | `opt` | — | actif | — |
| Parce qu’elle crypte la clé lors de la recherche. |  | — | `opt` | — | actif | — |
| Elle filtre la capture selon une expression booléenne sans dépiler la pile d’appels si la |  | — | `opt` | — | actif | data-correct=1 |
| Elle accélère l’exécution du ramasse-miettes pendant l’interception. |  | — | `opt` | — | actif | — |
| Elle remplace obligatoirement le bloc finally. |  | — | `opt` | — | actif | — |
| Elle force l’exécution asynchrone du bloc catch. |  | — | `opt` | — | actif | — |
| Que T est obligatoirement un type référence immuable. |  | — | `opt` | — | actif | — |
| Que T possède un constructeur public sans paramètre, autorisant l’instruction "new T()". |  | — | `opt` | — | actif | data-correct=1 |
| Que T ne peut être instancié qu’une seule fois (Singleton). |  | — | `opt` | — | actif | — |
| Que T implémente l’interface IDisposable. |  | — | `opt` | — | actif | — |
| Uniquement si aucune exception n’a été levée. |  | — | `opt` | — | actif | — |
| Uniquement si une exception a été interceptée par un bloc catch. |  | — | `opt` | — | actif | — |
| Dans tous les cas, que le bloc try se termine avec succès ou qu’une exception soit survenu |  | — | `opt` | — | actif | data-correct=1 |
| Seulement si le mot-clé return n’est pas rencontré dans le bloc try. |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `csb2-c4-e1` | csharp | 300 | suspendue | `ADD ServeurWeb 80 ADD ServeurSSH 22 GET ServeurWeb TRYGET ServeurBD GET ServeurBD` | Exercice 1 — Collections génériques C# et recherche sécurisée TryGetValue |
| `csb2-c4-e2` | csharp | 300 | suspendue | `THROW HttpException StatusCode=404 THROW HttpException StatusCode=503 THROW TimeoutException StatusCode=408 THROW HttpException StatusCode=401` | Exercice 2 — Gestion des exceptions avec filtres catch ... when |
| `csb2-c4-e3` | csharp | 300 | suspendue | `CONSTRAINT where T : class, IComparable, new() Candidate Nom=Client IsClass=True HasDefaultCtor=True ImplementsComparable=True Candidate Nom=Int32 IsClass=False HasDefaultCtor=True ImplementsComparable=True Candidate Nom=Singleton IsClass=True HasDefaultCtor=False ImplementsComparable=True` | Exercice 3 — Validateur de contraintes génériques (where T : ...) |

- QCM : 1 bloc(s), **4 question(s)**.
- Encadres pedagogiques : 7 (`.box`, variantes `box--*`).
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

- Tableaux : 2 (0 lignes / 4 en-tetes ; 0 lignes / 3 en-tetes)
- Blocs `pre` : 8 · elements `code` : 64
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2552 mots · 456 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 66. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 19 |
| `opt` | 16 |
| `box` | 7 |
| `box__title` | 7 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
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
| `lab__lang` | 3 |
| `lab__training` | 3 |
| `badge` | 3 |

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
