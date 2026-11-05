# Chapitre 2 — Types de données et création de tables

> Fiche extraite du fichier `b1-sql/chapitres/chapitre2.html` (541 lignes, 35.3 Ko, sha256 `cb1b3a02ba69`).
> Famille : **cours-b1-sql** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-sql/chapitres/chapitre2.html` |
| Titre du document | Chapitre 2 — Types de données et création de tables \| SQL B1 |
| Description meta | Chapitre 2 du cours de bases de données et SQL B1 : Types numériques, chaînes CHAR et VARCHAR, types temporels, CREATE TABLE, INSERT, clés. Théorie, requêtes commentées, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Types de données et création de tables |
| 3 | h2 | — | 1. Les types numériques |
| 4 | h2 | — | 2. CHAR et VARCHAR |
| 5 | h2 | — | 3. Les types temporels |
| 6 | h2 | — | 4. CREATE TABLE et INSERT |
| 7 | h2 | — | 5. Ajouter une colonne avant de s’exercer |
| 8 | h2 | — | 6. Exercices de code |
| 9 | h2 | — | 7. QCM — niveau examen |
| 10 | h2 | — | 8. Erreurs classiques — récapitulatif |
| 11 | h2 | — | 9. Méthodologie de résolution |
| 12 | h2 | — | 10. Révision active |
| 13 | h2 | — | 11. Test de maîtrise |
| 14 | .lab | code lab | 3 bloc(s) |
| 15 | .qcm | QCM | 6 question(s) |
| 16 | table | — | 3 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 2 — Types de données et création de tables
  - **H2** — 1. Les types numériques
  - **H2** — 2. CHAR et VARCHAR
  - **H2** — 3. Les types temporels
  - **H2** — 4. CREATE TABLE et INSERT
  - **H2** — 5. Ajouter une colonne avant de s’exercer
  - **H2** — 6. Exercices de code
    - **H3** — Exercice 1 — Créer et initialiser la table Marque
    - **H3** — Exercice 2 — Valeur par défaut (DEFAULT) et contrainte NOT NULL
    - **H3** — Exercice 3 — Ajouter une colonne avec ALTER TABLE
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
| nav | `sqlnav` | Portail → `/`<br>SQL B1 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **23** (externes : 1).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| SQL B1 | `../index.html` | `b1-sql/index.html` | interne |
| Sommaire | `../sommaire.html` | `b1-sql/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b1-sql/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b1-sql/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b1-sql/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b1-sql/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b1-sql/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b1-sql/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b1-sql/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b1-sql/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `b1-sql/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `b1-sql/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `b1-sql/chapitres/simulateur-examen.html` | interne |
| atelier — simulateur SQL | `../atelier.html` | `b1-sql/atelier.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b1-sql/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b1-sql/chapitres/formules.html` | interne |
| Chapitre 3 — Interroger : SELECT, WHERE, tri et restrictions | `chapitre3.html` | `b1-sql/chapitres/chapitre3.html` | interne |
| documentation officielle SQLite | `https://sqlite.org/docs.html` | `https://sqlite.org/docs.html` | externe |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| FLOAT |  | — | `opt` | — | actif | — |
| DECIMAL |  | — | `opt` | — | actif | data-correct=1 |
| VARCHAR |  | — | `opt` | — | actif | — |
| Oui |  | — | `opt` | — | actif | — |
| Non, il ne limite pas la plage à deux chiffres |  | — | `opt` | — | actif | data-correct=1 |
| Oui, si la valeur est négative |  | — | `opt` | — | actif | — |
| VARCHAR(3) |  | — | `opt` | — | actif | — |
| CHAR(3) |  | — | `opt` | — | actif | data-correct=1 |
| TEXT |  | — | `opt` | — | actif | — |
| '21/11/2014' |  | — | `opt` | — | actif | — |
| '2014-11-21' |  | — | `opt` | — | actif | data-correct=1 |
| '11-21-2014' |  | — | `opt` | — | actif | — |
| Toujours zéro |  | — | `opt` | — | actif | — |
| Son DEFAULT ou NULL, sous réserve des contraintes |  | — | `opt` | — | actif | data-correct=1 |
| Toujours une erreur |  | — | `opt` | — | actif | — |
| Vide la table si elle existe |  | — | `opt` | — | actif | — |
| Évite une erreur si la table existe déjà |  | — | `opt` | — | actif | data-correct=1 |
| Crée la table en mémoire |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sq-c2-e1` | sql | 300 | suspendue | `PRAGMA foreign_keys = ON; -- VERIFY: SELECT name, type, "notnull", dflt_value, pk FROM pragma_table_info('Marque') ORDER BY cid; SELECT codemarque, nommarque, paysmarque FROM Marque;` | Exercice 1 — Créer et initialiser la table Marque |
| `sq-c2-e2` | sql | 300 | suspendue | `PRAGMA foreign_keys = ON; -- VERIFY: SELECT name, type, "notnull", dflt_value, pk FROM pragma_table_info('Equipement') ORDER BY cid; SELECT codeequipement, nomequipement, prix FROM Equipement;` | Exercice 2 — Valeur par défaut (DEFAULT) et contrainte NOT NULL |
| `sq-c2-e3` | sql | 300 | suspendue | `PRAGMA foreign_keys = ON; CREATE TABLE Marque (   codemarque TEXT NOT NULL PRIMARY KEY,   nommarque TEXT NOT NULL UNIQUE,   paysmarque TEXT NOT NULL,   UNIQUE (codemarque, nommarque) ); CREATE TABLE Voiture (   immat TEXT NOT NULL PRIMARY KEY,   marque TEXT NOT NULL,   codemarque TEXT NOT NULL,   moteur TEXT NOT NULL,   datecirc TEXT,   km INTEGER NOT NULL,   pxachat INTEGER NOT NULL,   nbreplace INTEGER NOT NULL,   FOREIGN KEY (codemarque, marque) REFERENCES Marque (codemarque, nommarque) ); CREATE TABLE Equipement (   codeequipement TEXT NOT NULL PRIMARY KEY,   nomequipement TEXT NOT NULL UNIQUE ); CREATE TABLE VoitureEquipement (   immat TEXT NOT NULL,   codeequipement TEXT NOT NULL,   PRIMARY KEY (immat, codeequipement),   FOREIGN KEY (immat) REFERENCES Voiture (immat) ON DELETE CASCADE,   FOREIGN KEY (codeequipement) REFERENCES Equipement (codeequipement) ON DELETE CASCADE ); -- VERIFY: SELECT name, type, "notnull", dflt_value, pk FROM pragma_table_info('Equipement') ORDER BY cid;` | Exercice 3 — Ajouter une colonne avec ALTER TABLE |

- QCM : 1 bloc(s), **6 question(s)**.
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

- Tableaux : 3 (0 lignes / 3 en-tetes ; 0 lignes / 3 en-tetes ; 0 lignes / 3 en-tetes)
- Blocs `pre` : 9 · elements `code` : 59
- SVG inline : 23 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-database`, `#i-play`, `#i-target`, `#i-warning`, `#i-pin`, `#i-terminal`, `#i-lightbulb`, `#i-compass`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3010 mots · 490 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 64. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 21 |
| `opt` | 18 |
| `box` | 9 |
| `box__title` | 9 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `q` | 6 |
| `q__stem` | 6 |
| `opts` | 6 |
| `q__exp` | 6 |
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

Attributs `data-*` : `data-correct` (6), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
