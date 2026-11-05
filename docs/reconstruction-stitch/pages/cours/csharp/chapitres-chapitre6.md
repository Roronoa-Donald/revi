# Chapitre 6 — Programmation Asynchrone (TAP) & Gestion des Ressources

> Fiche extraite du fichier `csharp/chapitres/chapitre6.html` (477 lignes, 33.7 Ko, sha256 `352711210d02`).
> Famille : **cours-csharp** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/csharp/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Programmation Asynchrone (TAP) &amp; Gestion des Ressources \| C# B2 |
| Description meta | Chapitre 6 du cours C# B2 : Modèle asynchrone basé sur les tâches (TAP), mots-clés async et await, décomposition en machine à états par Roslyn, Task.WhenAll et AggregateException, patron IDisposable, blocs using déterministes et libération mémoire. Notions fondamentales, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Programmation Asynchrone (TAP) & Gestion des Ressources |
| 3 | h2 | — | 1. Le Modèle Asynchrone TAP & La Machine à États Roslyn |
| 4 | h2 | — | 2. Concurrence avec Task.WhenAll & Gestion des AggregateException |
| 5 | h2 | — | 3. Libération Déterministe des Ressources : IDisposable & using |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 4 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Programmation Asynchrone (TAP) & Gestion des Ressources
  - **H2** — 1. Le Modèle Asynchrone TAP & La Machine à États Roslyn
      - **H4** — En coulisses : la Machine à États Roslyn
      - **H4** — Règle fondamentale : "Async all the way"
  - **H2** — 2. Concurrence avec Task.WhenAll & Gestion des AggregateException
  - **H2** — 3. Libération Déterministe des Ressources : IDisposable & using
      - **H4** — Syntaxe de déclaration using moderne (C# 8+)
      - **H4** — Code équivalent généré par le compilateur
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Simulateur de Machine à États Async/Await (TAP Pattern)
    - **H3** — Exercice 2 — Orchestrateur concurrent avec Task.WhenAll et AggregateException
    - **H3** — Exercice 3 — Gestion déterministe des ressources non managées (IDisposable et using)
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
| Atelier de code | `../atelier.html` | `csharp/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Le thread est bloqué en sommeil actif jusqu’à ce que l’E/S soit achevée. |  | — | `opt` | — | actif | — |
| Le thread est immédiatement libéré et renvoyé à la ThreadPool pour traiter d’autres requêt |  | — | `opt` | — | actif | data-correct=1 |
| Le thread est détruit définitivement par le Garbage Collector. |  | — | `opt` | — | actif | — |
| Le thread bascule en mode d’exécution synchrone prioritaire. |  | — | `opt` | — | actif | — |
| Parce que le compilateur refuse catégoriquement d’exécuter le code. |  | — | `opt` | — | actif | — |
| Parce que l’appelant ne peut pas attendre (await) la fin de la méthode et que toute except |  | — | `opt` | — | actif | data-correct=1 |
| Parce qu’elle alloue trop de mémoire sur la pile d’exécution. |  | — | `opt` | — | actif | — |
| Parce qu’elle empêche l’utilisation de variables locales. |  | — | `opt` | — | actif | — |
| Dans le fichier de logs du système d’exploitation. |  | — | `opt` | — | actif | — |
| Dans l’instance de AggregateException associée à la tâche globale renvoyée par WhenAll (pr |  | — | `opt` | — | actif | data-correct=1 |
| La deuxième exception est définitivement supprimée par le compilateur. |  | — | `opt` | — | actif | — |
| Dans la pile d’appels de la méthode Main. |  | — | `opt` | — | actif | — |
| Une boucle while avec appel du Garbage Collector à chaque tour. |  | — | `opt` | — | actif | — |
| Un bloc try / finally garantissant l’appel inconditionnel de res.Dispose() dans la section |  | — | `opt` | — | actif | data-correct=1 |
| Une allocation de mémoire non managée protégée par un mutex global. |  | — | `opt` | — | actif | — |
| Une sérialisation binaire de l’objet vers le disque. |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `csb2-c6-e1` | csharp | 300 | suspendue | `TASK TelechargerFichier Duree=30ms TASK TraiterDonnees Duree=20ms TASK SauvegarderBD Duree=15ms` | Exercice 1 — Simulateur de Machine à États Async/Await (TAP Pattern) |
| `csb2-c6-e2` | csharp | 300 | suspendue | `TASK T1 Status=OK TASK T2 Status=FAIL Error="SocketException: Connexion refusee" TASK T3 Status=OK TASK T4 Status=FAIL Error="SqlException: Timeout expire"` | Exercice 2 — Orchestrateur concurrent avec Task.WhenAll et AggregateException |
| `csb2-c6-e3` | csharp | 300 | suspendue | `RESOURCE FichierLogs ALLOCATE=Handle0x10A OP EcritureLigne "Demarrage" THROW DiskFullException` | Exercice 3 — Gestion déterministe des ressources non managées (IDisposable et using) |

- QCM : 1 bloc(s), **4 question(s)**.
- Encadres pedagogiques : 8 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 11 · elements `code` : 53
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-warning`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2684 mots · 417 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 70. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 20 |
| `opt` | 16 |
| `box` | 8 |
| `box__title` | 8 |
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
