# Chapitre 3 — Jointures Multi-tables, Sous-requêtes & Expressions Conditionnelles

> Fiche extraite du fichier `sql/chapitres/chapitre3.html` (436 lignes, 30.2 Ko, sha256 `4647f82b6fc3`).
> Famille : **cours-sql** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/sql/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Jointures Multi-tables, Sous-requêtes &amp; Expressions Conditionnelles \| SQL B2 |
| Description meta | Chapitre 3 du cours SQL B2 : Algèbre relationnelle des jointures (INNER, LEFT, RIGHT, FULL, CROSS, SELF JOIN), sous-requêtes scalaires et corrélées (EXISTS, NOT EXISTS, IN), et logique conditionnelle avancée avec l’expression CASE WHEN. Notions fondamentales, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Jointures Multi-tables, Sous-requêtes & Expressions Conditionnelles |
| 3 | h2 | — | 1. Algèbre des Jointures : Du Produit Cartésien aux Jointures Externes |
| 4 | h2 | — | 2. Sous-requêtes Corrélées & Le Prédicat EXISTS vs NOT IN |
| 5 | h2 | — | 3. Expressions Conditionnelles : L’Instruction CASE WHEN |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 5 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Jointures Multi-tables, Sous-requêtes & Expressions Conditionnelles
  - **H2** — 1. Algèbre des Jointures : Du Produit Cartésien aux Jointures Externes
      - **H4** — 1. INNER JOIN (Intersection A ∩ B)
      - **H4** — 2. LEFT OUTER JOIN (Conservation gauche)
      - **H4** — L’Auto-Jointure (SELF JOIN)
  - **H2** — 2. Sous-requêtes Corrélées & Le Prédicat EXISTS vs NOT IN
      - **H4** — Prédicat EXISTS (Test d’existence)
      - **H4** — Le danger mortel de NOT IN avec NULL
  - **H2** — 3. Expressions Conditionnelles : L’Instruction CASE WHEN
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Classification conditionnelle avec CASE WHEN ... THEN ... ELSE ... END
    - **H3** — Exercice 2 — Sous-requête scalaire : filtrer au-dessus de la moyenne globale
    - **H3** — Exercice 3 — Détecter l’absence de correspondance avec NOT EXISTS
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
| Chapitre 4 — Agrégation Avancée, GROUP BY, HAVING & Fonctions de Fenêtrage | `chapitre4.html` | `sql/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| En ajoutant la clause WHERE cmd.id IS NULL |  | — | `opt` | — | actif | data-correct=1 |
| En utilisant un INNER JOIN avec WHERE cmd.id = 0 |  | — | `opt` | — | actif | — |
| En écrivant WHERE c.id = NULL |  | — | `opt` | — | actif | — |
| En remplaçant le LEFT JOIN par un CROSS JOIN |  | — | `opt` | — | actif | — |
| Si la sous-requête renvoie ne serait-ce qu’une seule valeur NULL, l’expression NOT IN renv |  | — | `opt` | — | actif | data-correct=1 |
| NOT IN n’est pas supporté par le standard SQL ANSI |  | — | `opt` | — | actif | — |
| NOT IN modifie automatiquement les données de la table |  | — | `opt` | — | actif | — |
| NOT IN empêche l’utilisation de clés primaires |  | — | `opt` | — | actif | — |
| CROSS JOIN (Produit cartésien) |  | — | `opt` | — | actif | data-correct=1 |
| INNER JOIN |  | — | `opt` | — | actif | — |
| NATURAL JOIN |  | — | `opt` | — | actif | — |
| SELF JOIN |  | — | `opt` | — | actif | — |
| Elle joint une table avec elle-même en utilisant deux alias différents pour distinguer les |  | — | `opt` | — | actif | data-correct=1 |
| Elle s’exécute sans passer par le moteur de base de données |  | — | `opt` | — | actif | — |
| Elle ne fonctionne qu’avec des tables temporaires en mémoire |  | — | `opt` | — | actif | — |
| Elle interdit l’usage de la clause WHERE |  | — | `opt` | — | actif | — |
| L’expression renvoie NULL |  | — | `opt` | — | actif | data-correct=1 |
| La requête s’interrompt avec une erreur d’exécution |  | — | `opt` | — | actif | — |
| L’expression renvoie 0 |  | — | `opt` | — | actif | — |
| L’expression renvoie une chaîne vide '' |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sql2-c3-e1` | sql | 300 | suspendue | `CREATE TABLE serveurs (nom TEXT, cpu_pct INT); INSERT INTO serveurs VALUES ('srv-db', 92), ('srv-web', 65), ('srv-dns', 20); -- exemple` | Exercice 1 — Classification conditionnelle avec CASE WHEN ... THEN ... ELSE ... END |
| `sql2-c3-e2` | sql | 300 | suspendue | `CREATE TABLE employes (nom TEXT, salaire INT); INSERT INTO employes VALUES ('Amina', 400000), ('Koffi', 200000), ('Yao', 250000), ('Sena', 350000); -- exemple` | Exercice 2 — Sous-requête scalaire : filtrer au-dessus de la moyenne globale |
| `sql2-c3-e3` | sql | 300 | suspendue | `CREATE TABLE clients (id INT, nom TEXT); CREATE TABLE commandes (id INT, client_id INT); INSERT INTO clients VALUES (1, 'Amina'), (2, 'Koffi'), (3, 'Yao'); INSERT INTO commandes VALUES (10, 1); -- exemple` | Exercice 3 — Détecter l’absence de correspondance avec NOT EXISTS |

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
- Blocs `pre` : 6 · elements `code` : 32
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-database`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2468 mots · 384 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 80. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 20 |
| `ic` | 19 |
| `box` | 7 |
| `box__title` | 7 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `code-block` | 5 |
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
