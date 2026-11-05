# Chapitre 6 — Vues, Procédures Stockées, Déclencheurs (Triggers) & Optimisation

> Fiche extraite du fichier `sql/chapitres/chapitre6.html` (456 lignes, 32.6 Ko, sha256 `37058ea62593`).
> Famille : **cours-sql** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/sql/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Vues, Procédures Stockées, Déclencheurs (Triggers) &amp; Optimisation \| SQL B2 |
| Description meta | Chapitre 6 du cours SQL B2 : Vues simples et matérialisées, programmabilité côté serveur (fonctions et procédures stockées), déclencheurs événementiels (BEFORE/AFTER, NEW/OLD), et optimisation physique par index B-Tree et analyse de plans d’exécution EXPLAIN. Notions fondamentales, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Vues, Procédures Stockées, Déclencheurs (Triggers) & Optimisation |
| 3 | h2 | — | 1. Vues Relationnelles & Vues Matérialisées |
| 4 | h2 | — | 2. Déclencheurs (Triggers) : Automatisation & Tables d’Audit |
| 5 | h2 | — | 3. Optimisation Physique, Index B-Tree & Plans d’Exécution EXPLAIN |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 5 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Vues, Procédures Stockées, Déclencheurs (Triggers) & Optimisation
  - **H2** — 1. Vues Relationnelles & Vues Matérialisées
      - **H4** — 1. Vues Standard (Sécurité & Abstraction)
      - **H4** — 2. Vues Matérialisées (Performance Analytique)
  - **H2** — 2. Déclencheurs (Triggers) : Automatisation & Tables d’Audit
      - **H4** — BEFORE vs AFTER
      - **H4** — Les variables NEW et OLD
  - **H2** — 3. Optimisation Physique, Index B-Tree & Plans d’Exécution EXPLAIN
      - **H4** — L’Index B-Tree (Arbre Équilibré)
      - **H4** — L’Analyse avec EXPLAIN
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Créer une vue relationnelle (CREATE VIEW)
    - **H3** — Exercice 2 — Déclencheur d’audit automatique (CREATE TRIGGER AFTER UPDATE)
    - **H3** — Exercice 3 — Créer un index composite pour accélérer les recherches (CREATE INDEX)
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
| Atelier de code | `../atelier.html` | `sql/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| La vue standard réexécute sa requête à chaque appel sans stocker de données, alors que la |  | — | `opt` | — | actif | data-correct=1 |
| La vue standard ne peut interroger qu’une seule table |  | — | `opt` | — | actif | — |
| La vue matérialisée ne peut être consultée que par les administrateurs |  | — | `opt` | — | actif | — |
| La vue standard ne supporte pas la clause WHERE |  | — | `opt` | — | actif | — |
| Le nouvel enregistrement en cours d’insertion dont les valeurs peuvent être lues et modifi |  | — | `opt` | — | actif | data-correct=1 |
| L’état précédent de la ligne qui va être écrasée |  | — | `opt` | — | actif | — |
| Le nom de l’utilisateur ayant initié la connexion |  | — | `opt` | — | actif | — |
| L’identifiant de la transaction courante |  | — | `opt` | — | actif | — |
| Parce que l’application d’une fonction scalaire sur la colonne empêche le planificateur d’ |  | — | `opt` | — | actif | data-correct=1 |
| Parce que l’année 2026 est dans le futur |  | — | `opt` | — | actif | — |
| Parce que les dates ne peuvent pas être indexées |  | — | `opt` | — | actif | — |
| Parce que la fonction YEAR() verrouille la table |  | — | `opt` | — | actif | — |
| Arbre B-Tree (B+Tree) |  | — | `opt` | — | actif | data-correct=1 |
| Table de hachage (Hash index) |  | — | `opt` | — | actif | — |
| Index Bitmap |  | — | `opt` | — | actif | — |
| Index Full-Text |  | — | `opt` | — | actif | — |
| La requête est réellement exécutée et le rapport affiche le temps réel (en millisecondes) |  | — | `opt` | — | actif | data-correct=1 |
| Le mot de passe de l’administrateur de la base |  | — | `opt` | — | actif | — |
| La liste des erreurs de syntaxe du code |  | — | `opt` | — | actif | — |
| La version du système d’exploitation |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sql2-c6-e1` | sql | 300 | suspendue | `CREATE TABLE employes (id INT, nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES (1, 'Amina', 'IT', 350000), (2, 'Koffi', 'Support', 200000), (3, 'Yao', 'Securite', 420000); -- VERIFY: SELECT id, nom, departement FROM vue_cadres ORDER BY id; -- exemple` | Exercice 1 — Créer une vue relationnelle (CREATE VIEW) |
| `sql2-c6-e2` | sql | 300 | suspendue | `CREATE TABLE comptes (id INT, solde INT); CREATE TABLE journal_audit (compte_id INT, ancien_solde INT, nouveau_solde INT); INSERT INTO comptes VALUES (1, 10000), (2, 50000); -- VERIFY: UPDATE comptes SET solde = 15000 WHERE id = 1; SELECT compte_id, ancien_solde, nouveau_solde FROM journal_audit ORDER BY compte_id; -- exemple` | Exercice 2 — Déclencheur d’audit automatique (CREATE TRIGGER AFTER UPDATE) |
| `sql2-c6-e3` | sql | 300 | suspendue | `CREATE TABLE journaux (id INT, service TEXT, niveau TEXT, message TEXT); INSERT INTO journaux VALUES (1, 'auth', 'ERROR', 'Echec MFA'), (2, 'auth', 'INFO', 'Login OK'), (3, 'db', 'ERROR', 'Timeout'); -- exemple` | Exercice 3 — Créer un index composite pour accélérer les recherches (CREATE INDEX) |

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
- Blocs `pre` : 6 · elements `code` : 33
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-database`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2615 mots · 395 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 77. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 20 |
| `ic` | 19 |
| `box` | 7 |
| `box__title` | 7 |
| `card` | 6 |
| `card-title` | 6 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `code-block` | 5 |
| `q` | 5 |
| `q__stem` | 5 |
| `opts` | 5 |
| `q__exp` | 5 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
| `grid-2` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |

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
