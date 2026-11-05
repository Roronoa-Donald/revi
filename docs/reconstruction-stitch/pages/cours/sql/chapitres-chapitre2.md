# Chapitre 2 — Manipulation des Données (DML), Filtrage & Fonctions Scalaires

> Fiche extraite du fichier `sql/chapitres/chapitre2.html` (434 lignes, 28.9 Ko, sha256 `87dc0570b64f`).
> Famille : **cours-sql** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/sql/chapitres/chapitre2.html` |
| Titre du document | Chapitre 2 — Manipulation des Données (DML), Filtrage &amp; Fonctions Scalaires \| SQL B2 |
| Description meta | Chapitre 2 du cours SQL B2 : Instructions DML (INSERT multiple, UPDATE calculé, DELETE), logique tri-valuée de SQL et pièges de NULL (COALESCE), prédicats de filtrage WHERE (BETWEEN, IN, LIKE) et fonctions scalaires de manipulation de chaînes. Notions fondamentales, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Manipulation des Données (DML), Filtrage & Fonctions Scalaires |
| 3 | h2 | — | 1. Instructions DML : INSERT Multiple, UPDATE & DELETE |
| 4 | h2 | — | 2. La Logique Tri-Valuée de SQL & Le Piège de la Valeur NULL |
| 5 | h2 | — | 3. Prédicats de Filtrage & Fonctions Scalaires de Chaînes |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 5 question(s) |
| 14 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 2 — Manipulation des Données (DML), Filtrage & Fonctions Scalaires
  - **H2** — 1. Instructions DML : INSERT Multiple, UPDATE & DELETE
      - **H4** — 1. INSERT Multiple (Bulk Insert)
      - **H4** — 2. UPDATE avec calculs relatifs
  - **H2** — 2. La Logique Tri-Valuée de SQL & Le Piège de la Valeur NULL
  - **H2** — 3. Prédicats de Filtrage & Fonctions Scalaires de Chaînes
      - **H4** — Prédicats BETWEEN, IN & LIKE
      - **H4** — Fonctions scalaires courantes
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Normalisation de texte avec UPPER et LENGTH
    - **H3** — Exercice 2 — Gestion des valeurs nulles avec COALESCE
    - **H3** — Exercice 3 — Calcul financier arrondi avec ROUND
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
| Chapitre 3 — Jointures Multi-tables, Sous-requêtes & Expressions Conditionnelles | `chapitre3.html` | `sql/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| UNKNOWN |  | — | `opt` | — | actif | data-correct=1 |
| TRUE |  | — | `opt` | — | actif | — |
| FALSE |  | — | `opt` | — | actif | — |
| NULL_POINTER_EXCEPTION |  | — | `opt` | — | actif | — |
| La ligne est exclue du résultat final (car seule une évaluation à TRUE permet la sélection |  | — | `opt` | — | actif | data-correct=1 |
| La ligne est incluse par précaution |  | — | `opt` | — | actif | — |
| La requête s’interrompt avec une erreur d’exécution |  | — | `opt` | — | actif | — |
| La valeur de la colonne est automatiquement remplacée par zéro |  | — | `opt` | — | actif | — |
| 'contact@domain.com' |  | — | `opt` | — | actif | data-correct=1 |
| NULL |  | — | `opt` | — | actif | — |
| 'aucun' |  | — | `opt` | — | actif | — |
| Une liste contenant les 4 éléments |  | — | `opt` | — | actif | — |
| 'C_R' |  | — | `opt` | — | actif | data-correct=1 |
| 'C%R' |  | — | `opt` | — | actif | — |
| 'C__R' |  | — | `opt` | — | actif | — |
| 'C?R' |  | — | `opt` | — | actif | — |
| INSERT INTO table (cols) VALUES (ligne1), (ligne2), (ligne3); |  | — | `opt` | — | actif | data-correct=1 |
| INSERT MULTIPLE INTO table VALUES (ligne1), (ligne2); |  | — | `opt` | — | actif | — |
| UPDATE table SET (cols) = (ligne1), (ligne2); |  | — | `opt` | — | actif | — |
| CREATE ROWS (ligne1), (ligne2) IN table; |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sql2-c2-e1` | sql | 300 | suspendue | `CREATE TABLE clients (id INT, nom TEXT, ville TEXT); INSERT INTO clients VALUES (1, 'Amina', 'Lome'), (2, 'Koffi', 'Kara'); -- exemple` | Exercice 1 — Normalisation de texte avec UPPER et LENGTH |
| `sql2-c2-e2` | sql | 300 | suspendue | `CREATE TABLE factures (id INT, montant_ht INT, remise INT); INSERT INTO factures VALUES (1, 50000, 5000), (2, 30000, NULL); -- exemple` | Exercice 2 — Gestion des valeurs nulles avec COALESCE |
| `sql2-c2-e3` | sql | 300 | suspendue | `CREATE TABLE articles (id INT, libelle TEXT, prix_ht REAL); INSERT INTO articles VALUES (1, 'Clavier', 10000), (2, 'Adaptateur', 3333.33); -- exemple` | Exercice 3 — Calcul financier arrondi avec ROUND |

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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 6 · elements `code` : 30
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-database`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2219 mots · 411 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 73. Les plus frequentes :

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
| `code-block` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |

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
