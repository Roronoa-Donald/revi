# Chapitre 6 — Mini API complète & persistance

> Fiche extraite du fichier `api-rest-flask/chapitres/chapitre6.html` (505 lignes, 30.0 Ko, sha256 `48401d677c8d`).
> Famille : **cours-api-rest-flask** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/api-rest-flask/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Mini API complète & persistance \| API REST avec Flask B2 |
| Description meta | Chapitre 6 du cours API REST avec Flask B2 : CRUD complet en mémoire, modularité avec les Blueprints, persistance SQLAlchemy, documentation OpenAPI et déploiement. Théorie, exemples détaillés, exercices Python exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Mini API complète & persistance |
| 3 | h2 | — | 1. Synthèse d’un CRUD RESTful complet |
| 4 | h2 | — | 2. Modulariser avec les Blueprints Flask |
| 5 | h2 | — | 3. Persistance avec SQLAlchemy |
| 6 | h2 | — | 4. Documentation OpenAPI et Déploiement en production |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Mini API complète & persistance
  - **H2** — 1. Synthèse d’un CRUD RESTful complet
  - **H2** — 2. Modulariser avec les Blueprints Flask
  - **H2** — 3. Persistance avec SQLAlchemy
  - **H2** — 4. Documentation OpenAPI et Déploiement en production
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Filtrage de collection en mémoire
    - **H3** — Exercice 2 — Création avec ID auto-incrémenté
    - **H3** — Exercice 3 — Gestion des mutations (UPDATE & DELETE)
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 10 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `api-rest-flasknav` | Portail → `/`<br>API REST avec Flask B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| API REST avec Flask B2 | `../index.html` | `api-rest-flask/index.html` | interne |
| Sommaire | `../sommaire.html` | `api-rest-flask/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `api-rest-flask/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `api-rest-flask/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `api-rest-flask/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `api-rest-flask/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `api-rest-flask/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `api-rest-flask/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `api-rest-flask/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `api-rest-flask/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `api-rest-flask/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `api-rest-flask/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `api-rest-flask/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `api-rest-flask/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `api-rest-flask/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `api-rest-flask/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| À organiser l’application en modules de routes réutilisables et découplés |  | — | `opt` | — | actif | data-correct=1 |
| À créer automatiquement les tables de la base de données |  | — | `opt` | — | actif | — |
| À compiler le code Python en binaire machine |  | — | `opt` | — | actif | — |
| url_prefix |  | — | `opt` | — | actif | data-correct=1 |
| base_path |  | — | `opt` | — | actif | — |
| root_uri |  | — | `opt` | — | actif | — |
| DELETE |  | — | `opt` | — | actif | data-correct=1 |
| POST |  | — | `opt` | — | actif | — |
| GET |  | — | `opt` | — | actif | — |
| 204 No Content |  | — | `opt` | — | actif | data-correct=1 |
| 200 OK |  | — | `opt` | — | actif | — |
| 201 Created |  | — | `opt` | — | actif | — |
| Le débogueur interactif permet d’exécuter du code à distance sur le serveur |  | — | `opt` | — | actif | data-correct=1 |
| Flask consomme trop de batterie |  | — | `opt` | — | actif | — |
| Les requêtes GET deviennent payantes |  | — | `opt` | — | actif | — |
| Gunicorn |  | — | `opt` | — | actif | data-correct=1 |
| Webpack |  | — | `opt` | — | actif | — |
| Node.js |  | — | `opt` | — | actif | — |
| OpenAPI / Swagger |  | — | `opt` | — | actif | data-correct=1 |
| HTML5 |  | — | `opt` | — | actif | — |
| RSS |  | — | `opt` | — | actif | — |
| app.register_blueprint(users_bp) |  | — | `opt` | — | actif | data-correct=1 |
| app.use(users_bp) |  | — | `opt` | — | actif | — |
| app.add_module(users_bp) |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `fl2-c6-e1` | python | 300 | suspendue | `[{"id": 1, "nom": "Alice", "role": "admin"}, {"id": 2, "nom": "Bob", "role": "user"}] role=admin` | Exercice 1 — Filtrage de collection en mémoire |
| `fl2-c6-e2` | python | 300 | suspendue | `[{"id": 10, "nom": "Alice"}] {"nom": "Bob"}` | Exercice 2 — Création avec ID auto-incrémenté |
| `fl2-c6-e3` | python | 300 | suspendue | `[{"id": 42, "nom": "Alice", "score": 10}] DELETE 42` | Exercice 3 — Gestion des mutations (UPDATE & DELETE) |

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

- Tableaux : 0
- Blocs `pre` : 10 · elements `code` : 38
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-shield`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2187 mots · 421 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 64. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 24 |
| `ic` | 20 |
| `box` | 8 |
| `box__title` | 8 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
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
