# Chapitre 5 — Transactions ACID, Concurrence & Niveaux d’Isolation

> Fiche extraite du fichier `sql/chapitres/chapitre5.html` (446 lignes, 32.3 Ko, sha256 `3b6834e67283`).
> Famille : **cours-sql** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/sql/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Transactions ACID, Concurrence &amp; Niveaux d’Isolation \| SQL B2 |
| Description meta | Chapitre 5 du cours SQL B2 : Propriétés ACID, commandes de contrôle transactionnel (BEGIN, COMMIT, ROLLBACK, SAVEPOINT), anomalies de concurrence (lectures sales, non répétables, fantômes), 4 niveaux d’isolation ANSI/ISO et gestion des verrous et interblocages (Deadlocks). Notions fondamentales, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Transactions ACID, Concurrence & Niveaux d’Isolation |
| 3 | h2 | — | 1. Le Modèle ACID & Contrôle Transactionnel (TCL) |
| 4 | h2 | — | 2. Anomalies de Concurrence & Les 4 Niveaux d’Isolation ANSI |
| 5 | h2 | — | 3. Verrouillage Concurrente & Interblocages (Deadlocks) |
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

- **H1** — Chapitre 5 — Transactions ACID, Concurrence & Niveaux d’Isolation
  - **H2** — 1. Le Modèle ACID & Contrôle Transactionnel (TCL)
      - **H4** — Les 4 Piliers ACID
      - **H4** — Commandes de Contrôle (TCL)
  - **H2** — 2. Anomalies de Concurrence & Les 4 Niveaux d’Isolation ANSI
  - **H2** — 3. Verrouillage Concurrente & Interblocages (Deadlocks)
      - **H4** — Types de verrous
      - **H4** — L’Interblocage (Deadlock)
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Virement bancaire atomique entre deux comptes
    - **H3** — Exercice 2 — Validation atomique d’une commande et décrémentation de stock
    - **H3** — Exercice 3 — Audit de cohérence comptable (Écriture débit / crédit équilibrée)
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
| Chapitre 6 — Vues, Procédures Stockées, Déclencheurs (Triggers) & Optimisation | `chapitre6.html` | `sql/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Toutes les opérations de la transaction sont entièrement appliquées ou aucune ne l’est (pr |  | — | `opt` | — | actif | data-correct=1 |
| Les requêtes sont traitées à la vitesse d’un atome |  | — | `opt` | — | actif | — |
| Chaque table ne peut contenir qu’une seule colonne clé primaire |  | — | `opt` | — | actif | — |
| Les données sont sauvegardées sur une clé USB |  | — | `opt` | — | actif | — |
| Lecture sale (Dirty Read) |  | — | `opt` | — | actif | data-correct=1 |
| Lecture fantôme (Phantom Read) |  | — | `opt` | — | actif | — |
| Lecture non répétable (Non-Repeatable Read) |  | — | `opt` | — | actif | — |
| Mise à jour perdue (Lost Update) |  | — | `opt` | — | actif | — |
| Read Committed |  | — | `opt` | — | actif | data-correct=1 |
| Read Uncommitted |  | — | `opt` | — | actif | — |
| Repeatable Read |  | — | `opt` | — | actif | — |
| Serializable |  | — | `opt` | — | actif | — |
| À marquer un point de reprise intermédiaire permettant un ROLLBACK partiel sans annuler to |  | — | `opt` | — | actif | data-correct=1 |
| À enregistrer définitivement la transaction sur le disque |  | — | `opt` | — | actif | — |
| À verrouiller l’intégralité de la base de données en lecture seule |  | — | `opt` | — | actif | — |
| À créer une copie de sauvegarde physique de la table |  | — | `opt` | — | actif | — |
| Il détecte le cycle dans son graphe d’attente, choisit une transaction comme victime et fo |  | — | `opt` | — | actif | data-correct=1 |
| Il attend indéfiniment que l’administrateur redémarre le serveur |  | — | `opt` | — | actif | — |
| Il exécute les deux transactions en parallèle en fusionnant leurs modifications au hasard |  | — | `opt` | — | actif | — |
| Il supprime les deux tables concernées |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sql2-c5-e1` | sql | 300 | suspendue | `CREATE TABLE comptes (id INT PRIMARY KEY, titulaire TEXT, solde INT); INSERT INTO comptes VALUES (1, 'Amina', 50000), (2, 'Koffi', 20000); -- VERIFY: SELECT id, titulaire, solde FROM comptes ORDER BY id; -- exemple` | Exercice 1 — Virement bancaire atomique entre deux comptes |
| `sql2-c5-e2` | sql | 300 | suspendue | `CREATE TABLE articles (id INT, stock INT); CREATE TABLE commandes (id INT, statut TEXT); INSERT INTO articles VALUES (1, 10); INSERT INTO commandes VALUES (10, 'EN_ATTENTE'); -- VERIFY: SELECT c.id, c.statut, a.stock FROM commandes c CROSS JOIN articles a WHERE c.id = 10 AND a.id = 1; -- exemple` | Exercice 2 — Validation atomique d’une commande et décrémentation de stock |
| `sql2-c5-e3` | sql | 300 | suspendue | `CREATE TABLE ecritures (tx_id INT, sens TEXT, montant INT); INSERT INTO ecritures VALUES (1, 'DEBIT', 10000), (1, 'CREDIT', 10000), (2, 'DEBIT', 5000), (2, 'CREDIT', 3000); -- exemple` | Exercice 3 — Audit de cohérence comptable (Écriture débit / crédit équilibrée) |

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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 6 · elements `code` : 28
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-database`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2664 mots · 417 noeuds HTML

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
