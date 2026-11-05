# Chapitre 5 — LINQ, Délégués & Système Événementiel

> Fiche extraite du fichier `csharp/chapitres/chapitre5.html` (477 lignes, 31.4 Ko, sha256 `d3af2d463868`).
> Famille : **cours-csharp** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/csharp/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — LINQ, Délégués &amp; Système Événementiel \| C# B2 |
| Description meta | Chapitre 5 du cours C# B2 : Délégués Func, Action et Predicate, expressions lambdas, Fluent API LINQ (Where, Select, OrderBy, GroupBy), exécution différée vs immédiate, et modèle observateur événementiel avec events multicast (+= et -=). Notions fondamentales, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — LINQ, Délégués & Système Événementiel |
| 3 | h2 | — | 1. Délégués Prédéfinis & Expressions Lambdas |
| 4 | h2 | — | 2. LINQ Fluent API & Le Principe d’Exécution Différée |
| 5 | h2 | — | 3. Système Événementiel C# : Le Mot-clé event & Délégués Multicast |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 4 question(s) |
| 14 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — LINQ, Délégués & Système Événementiel
  - **H2** — 1. Délégués Prédéfinis & Expressions Lambdas
  - **H2** — 2. LINQ Fluent API & Le Principe d’Exécution Différée
      - **H4** — Opérateurs d’évaluation différée (Lazy)
      - **H4** — Opérateurs terminaux (Immédiats)
  - **H2** — 3. Système Événementiel C# : Le Mot-clé event & Délégués Multicast
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Moteur LINQ de base : Where, Select, OrderBy et exécution différée
    - **H3** — Exercice 2 — Pipeline LINQ de regroupement GroupBy et agrégations
    - **H3** — Exercice 3 — Système Événementiel C# (event Action<string>, +=, -= multicast)
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
| Chapitre 6 — Programmation Asynchrone (TAP) & Gestion des Ressources | `chapitre6.html` | `csharp/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Une méthode prenant un booléen et renvoyant une chaîne et un entier. |  | — | `opt` | — | actif | — |
| Une méthode prenant une string et un int en arguments et renvoyant un booléen. |  | — | `opt` | — | actif | data-correct=1 |
| Une méthode ne renvoyant rien (void) et prenant trois arguments. |  | — | `opt` | — | actif | — |
| Une expression de requête SQL différée. |  | — | `opt` | — | actif | — |
| La requête est exécutée en arrière-plan sur un thread séparé. |  | — | `opt` | — | actif | — |
| Les éléments ne sont pas filtrés ni calculés lors de la définition de la requête, mais uni |  | — | `opt` | — | actif | data-correct=1 |
| La requête est mise en pause pendant un délai de temps configurable. |  | — | `opt` | — | actif | — |
| Le compilateur convertit immédiatement la requête en code assembleur. |  | — | `opt` | — | actif | — |
| .Where() |  | — | `opt` | — | actif | — |
| .Select() |  | — | `opt` | — | actif | — |
| .OrderBy() |  | — | `opt` | — | actif | — |
| .ToList() |  | — | `opt` | — | actif | data-correct=1 |
| Parce qu’il empêche le Garbage Collector de supprimer les objets abonnés. |  | — | `opt` | — | actif | — |
| Parce qu’il interdit aux tiers d’écraser la liste des abonnés avec un simple = ou de décle |  | — | `opt` | — | actif | data-correct=1 |
| Parce qu’il force l’exécution séquentielle sur un thread dédié. |  | — | `opt` | — | actif | — |
| Parce qu’il autorise uniquement un seul abonné à la fois. |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `csb2-c5-e1` | csharp | 300 | suspendue | `FILTER Prix >= 20.0 Article Nom=Clavier Prix=45.0 Article Nom=Souris Prix=15.0 Article Nom=Ecran Prix=180.0 Article Nom=Tapis Prix=10.0` | Exercice 1 — Moteur LINQ de base : Where, Select, OrderBy et exécution différée |
| `csb2-c5-e2` | csharp | 300 | suspendue | `Alice Informatique 120.0 Bob Mobilier 300.0 Alice Informatique 80.0 Charlie Informatique 50.0 Bob Mobilier 150.0` | Exercice 2 — Pipeline LINQ de regroupement GroupBy et agrégations |
| `csb2-c5-e3` | csharp | 300 | suspendue | `SUBSCRIBE Logger SUBSCRIBE EmailService EMIT "Incident Detecte" UNSUBSCRIBE EmailService SUBSCRIBE SmsAlerte EMIT "Serveur Redemarre"` | Exercice 3 — Système Événementiel C# (event Action<string>, +=, -= multicast) |

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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 8 · elements `code` : 50
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-warning`, `#i-terminal`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2422 mots · 429 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 70. Les plus frequentes :

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
