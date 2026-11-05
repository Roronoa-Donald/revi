# Chapitre 5 — Agrégation : compter, regrouper, filtrer les groupes

> Fiche extraite du fichier `b1-sql/chapitres/chapitre5.html` (595 lignes, 42.0 Ko, sha256 `b0f80a7aa3ac`).
> Famille : **cours-b1-sql** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-sql/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Agrégation : compter, regrouper, filtrer les groupes \| SQL B1 |
| Description meta | Chapitre 5 du cours de bases de données et SQL B1 : COUNT, MIN, MAX, SUM, AVG, GROUP BY, HAVING, ordre complet d’une requête. Théorie, requêtes commentées, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Agrégation : compter, regrouper, filtrer les groupes |
| 3 | h2 | — | 1. Les cinq fonctions d’agrégation |
| 4 | h2 | — | 2. GROUP BY : calculer par groupe |
| 5 | h2 | — | 3. HAVING : filtrer les groupes |
| 6 | h2 | — | 4. L’ordre complet, une dernière fois |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 6 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Agrégation : compter, regrouper, filtrer les groupes
  - **H2** — 1. Les cinq fonctions d’agrégation
  - **H2** — 2. GROUP BY : calculer par groupe
  - **H2** — 3. HAVING : filtrer les groupes
  - **H2** — 4. L’ordre complet, une dernière fois
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Compter et sommer par pays avec GROUP BY
    - **H3** — Exercice 2 — Filtrer les groupes après agrégation avec HAVING
    - **H3** — Exercice 3 — Statistiques par marque (MIN, MAX, COUNT)
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
| Chapitre 6 — Modifier les données et gérer les droits | `chapitre6.html` | `b1-sql/chapitres/chapitre6.html` | interne |
| documentation officielle SQLite | `https://sqlite.org/docs.html` | `https://sqlite.org/docs.html` | externe |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Une colonne |  | — | `opt` | — | actif | — |
| Une seule valeur (ou une par groupe) |  | — | `opt` | — | actif | data-correct=1 |
| Une table |  | — | `opt` | — | actif | — |
| 34 |  | — | `opt` | — | actif | — |
| 25 |  | — | `opt` | — | actif | data-correct=1 |
| 9 |  | — | `opt` | — | actif | — |
| Toutes les lignes |  | — | `opt` | — | actif | — |
| Les marques distinctes |  | — | `opt` | — | actif | data-correct=1 |
| Les marques NULL |  | — | `opt` | — | actif | — |
| SQLite le refuse toujours |  | — | `opt` | — | actif | — |
| SQLite accepte et choisit une immatriculation du groupe sans garantir laquelle |  | — | `opt` | — | actif | data-correct=1 |
| SQLite choisit toujours la première immatriculation |  | — | `opt` | — | actif | — |
| les lignes avant regroupement |  | — | `opt` | — | actif | — |
| les groupes après regroupement |  | — | `opt` | — | actif | data-correct=1 |
| les colonnes |  | — | `opt` | — | actif | — |
| Dans WHERE |  | — | `opt` | — | actif | — |
| Dans HAVING |  | — | `opt` | — | actif | data-correct=1 |
| Dans LIMIT |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sq-c5-e1` | sql | 300 | suspendue | `PRAGMA foreign_keys = ON; CREATE TABLE Marque (   codemarque TEXT NOT NULL PRIMARY KEY,   nommarque TEXT NOT NULL UNIQUE,   paysmarque TEXT NOT NULL,   UNIQUE (codemarque, nommarque) ); CREATE TABLE Voiture (   immat TEXT NOT NULL PRIMARY KEY,   marque TEXT NOT NULL,   codemarque TEXT NOT NULL,   moteur TEXT NOT NULL,   datecirc TEXT,   km INTEGER NOT NULL,   pxachat INTEGER NOT NULL,   nbreplace INTEGER NOT NULL,   FOREIGN KEY (codemarque, marque) REFERENCES Marque (codemarque, nommarque) ); CREATE TABLE Equipement (   codeequipement TEXT NOT NULL PRIMARY KEY,   nomequipement TEXT NOT NULL UNIQUE,   prix INTEGER DEFAULT 0 ); CREATE TABLE VoitureEquipement (   immat TEXT NOT NULL,   codeequipement TEXT NOT NULL,   PRIMARY KEY (immat, codeequipement),   FOREIGN KEY (immat) REFERENCES Voiture (immat) ON DELETE CASCADE,   FOREIGN KEY (codeequipement) REFERENCES Equipement (codeequipement) ON DELETE CASCADE ); INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES   ('TOY', 'TOYOTA', 'JAPON'), ('MIT', 'MITSUBISHI', 'JAPON'),   ('MAZ', 'MAZDA', 'JAPON'), ('BNZ', 'MERCEDES BENZ', 'ALLEMAGNE'),   ('BMW', 'BMW', 'ALLEMAGNE'), ('HYU', 'HYUNDAI', 'COREE DU SUD'); INSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES   ('TG-7854-Z', 'MERCEDES BENZ', 'BNZ', 'DIESEL', '2000-01-21', 500, 6000000, 5),   ('TG-3733-AC', 'TOYOTA', 'TOY', 'HYBRIDE', '2010-01-21', 0, 20000000, 7),   ('TG-9420-AF', 'TOYOTA', 'TOY', 'ESSENCE', '2013-09-21', 0, 50000000, 7),   ('TG-0020-AV', 'MITSUBISHI', 'MIT', 'ESSENCE', '2018-10-21', 30, 50000000, 7),   ('TG-0480-AV', 'BMW', 'BMW', 'ELECTRIQUE', '2015-12-21', 0, 50000000, 5),   ('TG-4444-AL', 'HYUNDAI', 'HYU', 'ESSENCE', '2015-09-21', 5, 10000000, 5); INSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES   ('AIR', 'Climatisation', 0), ('GPS', 'Navigation GPS', 450000),   ('CAM', 'Camera de recul', 200000), ('RAD', 'Autoradio', NULL); INSERT INTO VoitureEquipement (immat, codeequipement) VALUES   ('TG-7854-Z', 'AIR'), ('TG-3733-AC', 'AIR'), ('TG-3733-AC', 'GPS'),   ('TG-9420-AF', 'GPS'), ('TG-0020-AV', 'CAM'), ('TG-0480-AV', 'RAD');` | Exercice 1 — Compter et sommer par pays avec GROUP BY |
| `sq-c5-e2` | sql | 300 | suspendue | `PRAGMA foreign_keys = ON; CREATE TABLE Marque (   codemarque TEXT NOT NULL PRIMARY KEY,   nommarque TEXT NOT NULL UNIQUE,   paysmarque TEXT NOT NULL,   UNIQUE (codemarque, nommarque) ); CREATE TABLE Voiture (   immat TEXT NOT NULL PRIMARY KEY,   marque TEXT NOT NULL,   codemarque TEXT NOT NULL,   moteur TEXT NOT NULL,   datecirc TEXT,   km INTEGER NOT NULL,   pxachat INTEGER NOT NULL,   nbreplace INTEGER NOT NULL,   FOREIGN KEY (codemarque, marque) REFERENCES Marque (codemarque, nommarque) ); CREATE TABLE Equipement (   codeequipement TEXT NOT NULL PRIMARY KEY,   nomequipement TEXT NOT NULL UNIQUE,   prix INTEGER DEFAULT 0 ); CREATE TABLE VoitureEquipement (   immat TEXT NOT NULL,   codeequipement TEXT NOT NULL,   PRIMARY KEY (immat, codeequipement),   FOREIGN KEY (immat) REFERENCES Voiture (immat) ON DELETE CASCADE,   FOREIGN KEY (codeequipement) REFERENCES Equipement (codeequipement) ON DELETE CASCADE ); INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES   ('TOY', 'TOYOTA', 'JAPON'), ('MIT', 'MITSUBISHI', 'JAPON'),   ('MAZ', 'MAZDA', 'JAPON'), ('BNZ', 'MERCEDES BENZ', 'ALLEMAGNE'),   ('BMW', 'BMW', 'ALLEMAGNE'), ('HYU', 'HYUNDAI', 'COREE DU SUD'); INSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES   ('TG-7854-Z', 'MERCEDES BENZ', 'BNZ', 'DIESEL', '2000-01-21', 500, 6000000, 5),   ('TG-3733-AC', 'TOYOTA', 'TOY', 'HYBRIDE', '2010-01-21', 0, 20000000, 7),   ('TG-9420-AF', 'TOYOTA', 'TOY', 'ESSENCE', '2013-09-21', 0, 50000000, 7),   ('TG-0020-AV', 'MITSUBISHI', 'MIT', 'ESSENCE', '2018-10-21', 30, 50000000, 7),   ('TG-0480-AV', 'BMW', 'BMW', 'ELECTRIQUE', '2015-12-21', 0, 50000000, 5),   ('TG-4444-AL', 'HYUNDAI', 'HYU', 'ESSENCE', '2015-09-21', 5, 10000000, 5); INSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES   ('AIR', 'Climatisation', 0), ('GPS', 'Navigation GPS', 450000),   ('CAM', 'Camera de recul', 200000), ('RAD', 'Autoradio', NULL); INSERT INTO VoitureEquipement (immat, codeequipement) VALUES   ('TG-7854-Z', 'AIR'), ('TG-3733-AC', 'AIR'), ('TG-3733-AC', 'GPS'),   ('TG-9420-AF', 'GPS'), ('TG-0020-AV', 'CAM'), ('TG-0480-AV', 'RAD');` | Exercice 2 — Filtrer les groupes après agrégation avec HAVING |
| `sq-c5-e3` | sql | 300 | suspendue | `PRAGMA foreign_keys = ON; CREATE TABLE Marque (   codemarque TEXT NOT NULL PRIMARY KEY,   nommarque TEXT NOT NULL UNIQUE,   paysmarque TEXT NOT NULL,   UNIQUE (codemarque, nommarque) ); CREATE TABLE Voiture (   immat TEXT NOT NULL PRIMARY KEY,   marque TEXT NOT NULL,   codemarque TEXT NOT NULL,   moteur TEXT NOT NULL,   datecirc TEXT,   km INTEGER NOT NULL,   pxachat INTEGER NOT NULL,   nbreplace INTEGER NOT NULL,   FOREIGN KEY (codemarque, marque) REFERENCES Marque (codemarque, nommarque) ); CREATE TABLE Equipement (   codeequipement TEXT NOT NULL PRIMARY KEY,   nomequipement TEXT NOT NULL UNIQUE,   prix INTEGER DEFAULT 0 ); CREATE TABLE VoitureEquipement (   immat TEXT NOT NULL,   codeequipement TEXT NOT NULL,   PRIMARY KEY (immat, codeequipement),   FOREIGN KEY (immat) REFERENCES Voiture (immat) ON DELETE CASCADE,   FOREIGN KEY (codeequipement) REFERENCES Equipement (codeequipement) ON DELETE CASCADE ); INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES   ('TOY', 'TOYOTA', 'JAPON'), ('MIT', 'MITSUBISHI', 'JAPON'),   ('MAZ', 'MAZDA', 'JAPON'), ('BNZ', 'MERCEDES BENZ', 'ALLEMAGNE'),   ('BMW', 'BMW', 'ALLEMAGNE'), ('HYU', 'HYUNDAI', 'COREE DU SUD'); INSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES   ('TG-7854-Z', 'MERCEDES BENZ', 'BNZ', 'DIESEL', '2000-01-21', 500, 6000000, 5),   ('TG-3733-AC', 'TOYOTA', 'TOY', 'HYBRIDE', '2010-01-21', 0, 20000000, 7),   ('TG-9420-AF', 'TOYOTA', 'TOY', 'ESSENCE', '2013-09-21', 0, 50000000, 7),   ('TG-0020-AV', 'MITSUBISHI', 'MIT', 'ESSENCE', '2018-10-21', 30, 50000000, 7),   ('TG-0480-AV', 'BMW', 'BMW', 'ELECTRIQUE', '2015-12-21', 0, 50000000, 5),   ('TG-4444-AL', 'HYUNDAI', 'HYU', 'ESSENCE', '2015-09-21', 5, 10000000, 5); INSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES   ('AIR', 'Climatisation', 0), ('GPS', 'Navigation GPS', 450000),   ('CAM', 'Camera de recul', 200000), ('RAD', 'Autoradio', NULL); INSERT INTO VoitureEquipement (immat, codeequipement) VALUES   ('TG-7854-Z', 'AIR'), ('TG-3733-AC', 'AIR'), ('TG-3733-AC', 'GPS'),   ('TG-9420-AF', 'GPS'), ('TG-0020-AV', 'CAM'), ('TG-0480-AV', 'RAD');` | Exercice 3 — Statistiques par marque (MIN, MAX, COUNT) |

- QCM : 1 bloc(s), **6 question(s)**.
- Encadres pedagogiques : 11 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 12 · elements `code` : 38
- SVG inline : 25 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-database`, `#i-play`, `#i-target`, `#i-warning`, `#i-terminal`, `#i-pin`, `#i-compass`, `#i-lightbulb`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3138 mots · 436 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 65. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 23 |
| `opt` | 18 |
| `box` | 11 |
| `box__title` | 11 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `q` | 6 |
| `q__stem` | 6 |
| `opts` | 6 |
| `q__exp` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `box--tech` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |

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
