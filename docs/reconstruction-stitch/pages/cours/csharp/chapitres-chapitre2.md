# Chapitre 2 — Encapsulation & Programmation Orientée Objet Moderne en C#

> Fiche extraite du fichier `csharp/chapitres/chapitre2.html` (479 lignes, 32.6 Ko, sha256 `7cd256e3cb5f`).
> Famille : **cours-csharp** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/csharp/chapitres/chapitre2.html` |
| Titre du document | Chapitre 2 — Encapsulation &amp; Programmation Orientée Objet Moderne en C# \| C# B2 |
| Description meta | Chapitre 2 du cours C# B2 : Encapsulation stricte, propriétés auto-implémentées avec validation get/set, accesseurs init-only, constructeurs surchargés et chaînage : this(), constructeurs primaires, records immuables et expression with. Notions fondamentales, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Encapsulation & Programmation Orientée Objet Moderne en C# |
| 3 | h2 | — | 1. Encapsulation & Propriétés C# Auto-implémentées |
| 4 | h2 | — | 2. Constructeurs, Chaînage : this() & Constructeurs Primaires |
| 5 | h2 | — | 3. Records C# & Mutabilité Non Destructive (with) |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 4 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 2 — Encapsulation & Programmation Orientée Objet Moderne en C#
  - **H2** — 1. Encapsulation & Propriétés C# Auto-implémentées
      - **H4** — Propriété classique avec champ de soutien (Backing Field)
      - **H4** — Propriété auto-implémentée moderne
  - **H2** — 2. Constructeurs, Chaînage : this() & Constructeurs Primaires
  - **H2** — 3. Records C# & Mutabilité Non Destructive (with)
      - **H4** — 1. Égalité structurelle par valeur
      - **H4** — 2. Clonage non destructif avec with
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Propriétés auto-implémentées et validation get / set
    - **H3** — Exercice 2 — Chaînage de constructeurs C# avec constructeur primaire et : this()
    - **H3** — Exercice 3 — Records C# 9+ et mutabilité non destructive (with)
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
| Chapitre 3 — Héritage, Polymorphisme & Interfaces | `chapitre3.html` | `csharp/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| La propriété ne peut être modifiée qu’au sein d’une méthode asynchrone. |  | — | `opt` | — | actif | — |
| La propriété ne peut être assignée que lors de la construction ou dans un initialiseur d’o |  | — | `opt` | — | actif | data-correct=1 |
| La propriété est réinitialisée automatiquement à sa valeur par défaut à chaque accès. |  | — | `opt` | — | actif | — |
| La propriété ne peut être lue que par les classes dérivées. |  | — | `opt` | — | actif | — |
| En utilisant super(...) au début du constructeur. |  | — | `opt` | — | actif | — |
| En utilisant : this(...) immédiatement après la signature du constructeur. |  | — | `opt` | — | actif | data-correct=1 |
| En appelant explicitement this.Constructeur(...) dans le corps de la méthode. |  | — | `opt` | — | actif | — |
| En utilisant le mot-clé base(...) avec le préfixe self. |  | — | `opt` | — | actif | — |
| Les classes ne supportent pas le Garbage Collector. |  | — | `opt` | — | actif | — |
| Les instances de record sont égales via == (égalité structurelle par valeur), tandis que l |  | — | `opt` | — | actif | data-correct=1 |
| Les records sont stockés exclusivement sur la pile d’exécution. |  | — | `opt` | — | actif | — |
| Les classes ne peuvent pas contenir de méthodes d’instance. |  | — | `opt` | — | actif | — |
| À détruire le record pour libérer sa mémoire immédiatement. |  | — | `opt` | — | actif | — |
| À créer une nouvelle copie du record en modifiant uniquement les propriétés spécifiées (mu |  | — | `opt` | — | actif | data-correct=1 |
| À convertir le record en un dictionnaire JSON dynamique. |  | — | `opt` | — | actif | — |
| À vérifier la présence d’une clé dans le record. |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `csb2-c2-e1` | csharp | 300 | suspendue | `INIT Titulaire="Alice" Solde=100.0 DEPOT 50.0 RETRAIT 30.0 RETRAIT 200.0` | Exercice 1 — Propriétés auto-implémentées et validation get / set |
| `csb2-c2-e2` | csharp | 300 | suspendue | `NEW Article("REF01") NEW Article("REF02", "Souris") NEW Article("REF03", "Clavier", 49.99)` | Exercice 2 — Chaînage de constructeurs C# avec constructeur primaire et : this() |
| `csb2-c2-e3` | csharp | 300 | suspendue | `RECORD u1 Id=U101 Email=alice@corp.com Role=Lecteur WITH u2 FROM u1 Role=Admin RECORD u3 Id=U101 Email=alice@corp.com Role=Lecteur COMPARE u1 u2 COMPARE u1 u3` | Exercice 3 — Records C# 9+ et mutabilité non destructive (with) |

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

- Tableaux : 0
- Blocs `pre` : 11 · elements `code` : 38
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2637 mots · 397 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 19 |
| `opt` | 16 |
| `box` | 7 |
| `box__title` | 7 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `language-csharp` | 5 |
| `card` | 4 |
| `card-title` | 4 |
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
