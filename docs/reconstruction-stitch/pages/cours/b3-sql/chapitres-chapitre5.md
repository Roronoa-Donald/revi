# Chapitre 5 — Procédures Stockées PL/pgSQL, Déclencheurs (Triggers) & Row-Level Security (RLS)

> Fiche extraite du fichier `b3-sql/chapitres/chapitre5.html` (541 lignes, 37.9 Ko, sha256 `adc00ced009f`).
> Famille : **cours-b3-sql** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-sql/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Procédures Stockées PL/pgSQL, Déclencheurs (Triggers) &amp; Row-Level Security (RLS) \| SQL Avancé B3 |
| Description meta | Chapitre 5 du cours SQL Avancé B3 : Langage procédural PL/pgSQL, blocs d’exécution et gestion des exceptions, déclencheurs (Triggers) BEFORE / AFTER sur INSERT, UPDATE, DELETE, pseudo-enregistrements NEW et OLD, journalisation d’audit, sécurité au niveau de la ligne (Row-Level Security - RLS) avec politiques CREATE POLICY, et prévention des injections SQL (SQLi). Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Procédures Stockées PL/pgSQL, Déclencheurs (Triggers) & Row-Level Security (RLS) |
| 3 | h2 | — | 1. Le Langage Procédural PL/pgSQL & Les Fonctions Déclencheurs |
| 4 | h2 | — | 2. Pseudo-Enregistrements NEW / OLD & Journalisation d’Audit |
| 5 | h2 | — | 3. Sécurité au Niveau de la Ligne (Row-Level Security - RLS) & Prévention SQLi |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |
| 14 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Procédures Stockées PL/pgSQL, Déclencheurs (Triggers) & Row-Level Security (RLS)
  - **H2** — 1. Le Langage Procédural PL/pgSQL & Les Fonctions Déclencheurs
      - **H4** — Structure d’une Fonction PL/pgSQL
      - **H4** — Cycle de Vie et Types de Triggers
  - **H2** — 2. Pseudo-Enregistrements NEW / OLD & Journalisation d’Audit
      - **H4** — Les Variables Spéciales de Trigger
      - **H4** — Patron de Conception : Journal d’Audit
  - **H2** — 3. Sécurité au Niveau de la Ligne (Row-Level Security - RLS) & Prévention SQLi
      - **H4** — Configuration RLS dans PostgreSQL
      - **H4** — Défense en Profondeur contre l’Injection SQL (SQLi)
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Alerte sur solde négatif (AFTER UPDATE + WHEN)
    - **H3** — Exercice 2 — Isolation multi-locataires (Row-Level Security / Politique RLS)
    - **H3** — Exercice 3 — Maintien automatique d’une table de matérialisation par Trigger
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
| nav | `b3-sqlnav` | Portail → `/`<br>SQL Avancé B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| SQL Avancé B3 | `../index.html` | `b3-sql/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-sql/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-sql/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-sql/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-sql/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-sql/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-sql/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-sql/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-sql/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-sql/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-sql/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-sql/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-sql/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-sql/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-sql/chapitres/formules.html` | interne |
| Chapitre 6 — Partitionnement Déclaratif, Réplication WAL & Haute Disponibilité (HA) | `chapitre6.html` | `b3-sql/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| La valeur par défaut de la colonne |  | — | `opt` | — | actif | — |
| Une chaîne vide |  | — | `opt` | — | actif | — |
| NULL |  | — | `opt` | — | actif | data-correct=1 |
| Une copie de NEW |  | — | `opt` | — | actif | — |
| BEFORE INSERT OR UPDATE FOR EACH ROW |  | — | `opt` | — | actif | data-correct=1 |
| AFTER INSERT FOR EACH STATEMENT |  | — | `opt` | — | actif | — |
| INSTEAD OF TABLE |  | — | `opt` | — | actif | — |
| DEFERRED TRANSACTION TRIGGER |  | — | `opt` | — | actif | — |
| La ligne est insérée avec des valeurs nulles |  | — | `opt` | — | actif | — |
| L’opération d’insertion pour cette ligne est silencieusement annulée |  | — | `opt` | — | actif | data-correct=1 |
| Une erreur fatale est levée et le serveur plante |  | — | `opt` | — | actif | — |
| La ligne est insérée dans la table de log |  | — | `opt` | — | actif | — |
| Vérifier que la table possède un index primaire |  | — | `opt` | — | actif | — |
| Valider que les nouvelles lignes insérées ou mises à jour respectent la condition de sécur |  | — | `opt` | — | actif | data-correct=1 |
| Filtrer les lignes retournées par un SELECT |  | — | `opt` | — | actif | — |
| Chiffrer le mot de passe de l’utilisateur |  | — | `opt` | — | actif | — |
| Parce qu’il a un mot de passe trop long |  | — | `opt` | — | actif | — |
| Parce que les superusers ont le droit de bypasser RLS afin de pouvoir administrer et sauve |  | — | `opt` | — | actif | data-correct=1 |
| Parce que RLS est désactivé sur le port 5432 |  | — | `opt` | — | actif | — |
| C’est un bogue connu corrigé en version 17 |  | — | `opt` | — | actif | — |
| EXECUTE 'SELECT * FROM t WHERE id = ' \|\| user_input; |  | — | `opt` | — | actif | — |
| EXECUTE 'SELECT * FROM t WHERE id = $1' USING user_input; |  | — | `opt` | — | actif | data-correct=1 |
| RUN QUERY WITH user_input; |  | — | `opt` | — | actif | — |
| CALL SQL(user_input); |  | — | `opt` | — | actif | — |
| Le temps d’exécution de la requête |  | — | `opt` | — | actif | — |
| Une chaîne de caractères indiquant l’opération déclencheuse ('INSERT', 'UPDATE', 'DELETE') |  | — | `opt` | — | actif | data-correct=1 |
| L’identifiant du processus PostgreSQL |  | — | `opt` | — | actif | — |
| Le nom de l’index utilisé |  | — | `opt` | — | actif | — |
| BEFORE ... FOR EACH STATEMENT |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sql3-c5-e1` | sql | 300 | suspendue | `CREATE TABLE comptes (id INT, solde INT); CREATE TABLE alertes_fraude (compte_id INT, montant_tente INT); INSERT INTO comptes VALUES (1, 5000), (2, 10000); -- VERIFY: UPDATE comptes SET solde = -2000 WHERE id = 1; UPDATE comptes SET solde = 4000 WHERE id = 2; SELECT compte_id, montant_tente FROM alertes_fraude ORDER BY compte_id; -- exemple` | Exercice 1 — Alerte sur solde négatif (AFTER UPDATE + WHEN) |
| `sql3-c5-e2` | sql | 300 | suspendue | `CREATE TABLE contexte_session (tenant_actif TEXT, role_actif TEXT); CREATE TABLE dossiers_patients (id INT, tenant_id TEXT, patient TEXT); INSERT INTO contexte_session VALUES ('clinique_a', 'MEDECIN'); INSERT INTO dossiers_patients VALUES (1, 'clinique_a', 'Koffi'), (2, 'clinique_b', 'Amina'); -- VERIFY: SELECT id, tenant_id, patient FROM v_dossiers_rls ORDER BY id; -- exemple` | Exercice 2 — Isolation multi-locataires (Row-Level Security / Politique RLS) |
| `sql3-c5-e3` | sql | 300 | suspendue | `CREATE TABLE commandes (id INT, client_id INT, montant INT); CREATE TABLE stats_clients (client_id INT PRIMARY KEY, nb_cmd INT, cumul_montant INT); INSERT INTO stats_clients VALUES (1, 0, 0), (2, 1, 10000); -- VERIFY: INSERT INTO commandes VALUES (100, 1, 25000), (101, 2, 15000); SELECT client_id, nb_cmd, cumul_montant FROM stats_clients ORDER BY client_id; -- exemple` | Exercice 3 — Maintien automatique d’une table de matérialisation par Trigger |

- QCM : 1 bloc(s), **8 question(s)**.
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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 10 · elements `code` : 55
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-database`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3056 mots · 465 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 20 |
| `box` | 8 |
| `box__title` | 8 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `card` | 6 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
| `grid-2` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
