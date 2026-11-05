# Chapitre 1 — Modélisation Relationnelle, DDL & Contraintes d’Intégrité

> Fiche extraite du fichier `sql/chapitres/chapitre1.html` (448 lignes, 30.8 Ko, sha256 `b8f672ed5d0b`).
> Famille : **cours-sql** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/sql/chapitres/chapitre1.html` |
| Titre du document | Chapitre 1 — Modélisation Relationnelle, DDL &amp; Contraintes d’Intégrité \| SQL B2 |
| Description meta | Chapitre 1 du cours SQL B2 : Schéma relationnel formel, typage strict des données, syntaxe DDL (CREATE, ALTER, DROP, TRUNCATE), clés primaires composites et politiques d’intégrité référentielle (CASCADE, RESTRICT, SET NULL). Notions fondamentales, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Modélisation Relationnelle, DDL & Contraintes d’Intégrité |
| 3 | h2 | — | 1. Le Modèle Relationnel & Typage Strict des Données SQL |
| 4 | h2 | — | 2. Langage de Définition de Données (DDL) : CREATE, ALTER & DROP |
| 5 | h2 | — | 3. Clés Primaires Composites & Intégrité Référentielle |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 5 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Modélisation Relationnelle, DDL & Contraintes d’Intégrité
  - **H2** — 1. Le Modèle Relationnel & Typage Strict des Données SQL
      - **H4** — Types numériques & Monétaires
      - **H4** — Types textuels & Temporels
  - **H2** — 2. Langage de Définition de Données (DDL) : CREATE, ALTER & DROP
  - **H2** — 3. Clés Primaires Composites & Intégrité Référentielle
      - **H4** — 1. Intégrité d’Entité (PRIMARY KEY)
      - **H4** — 2. Intégrité Référentielle (FOREIGN KEY)
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Création de table avec contraintes PRIMARY KEY, UNIQUE et CHECK
    - **H3** — Exercice 2 — Clé étrangère et intégrité référentielle (FOREIGN KEY)
    - **H3** — Exercice 3 — Clé primaire composite sur une table associative
  - **H2** — 5. QCM — niveau examen
  - **H2** — 6. Erreurs classiques — récapitulatif
  - **H2** — 7. Méthodologie de résolution
  - **H2** — 8. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 9 notions à connaître absolument
  - **H2** — 9. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `sqlnav` | Portail → `/`<br>SQL B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| SQL B2 | `../index.html` | `sql/index.html` | interne |
| Sommaire | `../sommaire.html` | `sql/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `sql/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `sql/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `sql/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `sql/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `sql/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `sql/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `sql/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `sql/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `sql/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `sql/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `sql/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `sql/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `sql/chapitres/formules.html` | interne |
| Chapitre 2 — Manipulation des Données (DML), Filtrage & Fonctions Scalaires | `chapitre2.html` | `sql/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| DECIMAL(p, s) ou NUMERIC(p, s) |  | — | `opt` | — | actif | data-correct=1 |
| FLOAT |  | — | `opt` | — | actif | — |
| DOUBLE PRECISION |  | — | `opt` | — | actif | — |
| REAL |  | — | `opt` | — | actif | — |
| Toutes les lignes de la table enfant associées à ce parent sont automatiquement supprimées |  | — | `opt` | — | actif | data-correct=1 |
| La suppression de la ligne parente est immédiatement bloquée avec une erreur |  | — | `opt` | — | actif | — |
| La clé étrangère des lignes enfants est remplacée par la valeur 0 |  | — | `opt` | — | actif | — |
| Les lignes enfants sont transférées dans une table d’archive dédiée |  | — | `opt` | — | actif | — |
| TRUNCATE est une commande DDL rapide qui désalloue directement les blocs de stockage sans |  | — | `opt` | — | actif | data-correct=1 |
| TRUNCATE supprime la table elle-même du schéma, contrairement à DELETE |  | — | `opt` | — | actif | — |
| DELETE réinitialise automatiquement les compteurs auto-incrémentés, contrairement à TRUNCA |  | — | `opt` | — | actif | — |
| TRUNCATE nécessite obligatoirement d’indiquer une condition WHERE |  | — | `opt` | — | actif | — |
| En définissant une clé primaire composite : PRIMARY KEY (id_commande, id_produit) |  | — | `opt` | — | actif | data-correct=1 |
| En ajoutant un index non unique sur id_commande |  | — | `opt` | — | actif | — |
| En utilisant une clé étrangère simple sur id_produit |  | — | `opt` | — | actif | — |
| En écrivant un commentaire dans le code applicatif |  | — | `opt` | — | actif | — |
| colonne NUMERIC NOT NULL CHECK (colonne > 0 AND colonne < 'Infinity'::numeric) |  | — | `opt` | — | actif | data-correct=1 |
| colonne NUMERIC CHECK (colonne > 0) |  | — | `opt` | — | actif | — |
| colonne NUMERIC NOT NULL CHECK (colonne > 0) |  | — | `opt` | — | actif | — |
| colonne NUMERIC UNIQUE |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sql2-c1-e1` | sql | 300 | suspendue | `-- VERIFY: SELECT name, type, "notnull", dflt_value, pk FROM pragma_table_info('collaborateurs') ORDER BY cid; -- exemple` | Exercice 1 — Création de table avec contraintes PRIMARY KEY, UNIQUE et CHECK |
| `sql2-c1-e2` | sql | 300 | suspendue | `CREATE TABLE services (id INT PRIMARY KEY, libelle TEXT); -- VERIFY: SELECT name, type, "notnull", dflt_value, pk FROM pragma_table_info('projets') ORDER BY cid; -- exemple` | Exercice 2 — Clé étrangère et intégrité référentielle (FOREIGN KEY) |
| `sql2-c1-e3` | sql | 300 | suspendue | `-- VERIFY: SELECT name, type, "notnull", dflt_value, pk FROM pragma_table_info('affectations') ORDER BY cid; -- exemple` | Exercice 3 — Clé primaire composite sur une table associative |

- QCM : 1 bloc(s), **5 question(s)**.
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
- Blocs `pre` : 6 · elements `code` : 11
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-database`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2464 mots · 366 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 75. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 20 |
| `ic` | 19 |
| `box` | 7 |
| `box__title` | 7 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `q` | 5 |
| `q__stem` | 5 |
| `opts` | 5 |
| `q__exp` | 5 |
| `card` | 4 |
| `card-title` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |

Attributs `data-*` : `data-correct` (5), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
