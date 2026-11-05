# Chapitre 1 — API Web & le protocole HTTP

> Fiche extraite du fichier `api-rest-flask/chapitres/chapitre1.html` (464 lignes, 28.5 Ko, sha256 `c08f6d8f99b4`).
> Famille : **cours-api-rest-flask** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/api-rest-flask/chapitres/chapitre1.html` |
| Titre du document | Chapitre 1 — API Web & le protocole HTTP \| API REST avec Flask B2 |
| Description meta | Chapitre 1 du cours API REST avec Flask B2 : Architecture client-serveur, cycle requête/réponse HTTP, en-têtes Content-Type et Accept, structure JSON et encodage. Théorie, exemples détaillés, exercices Python exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — API Web & le protocole HTTP |
| 3 | h2 | — | 1. L’architecture client-serveur et les API Web |
| 4 | h2 | — | 2. Anatomie d’une requête et d’une réponse HTTP |
| 5 | h2 | — | 3. En-têtes HTTP et négociation de contenu |
| 6 | h2 | — | 4. Le format JSON (JavaScript Object Notation) |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — API Web & le protocole HTTP
  - **H2** — 1. L’architecture client-serveur et les API Web
  - **H2** — 2. Anatomie d’une requête et d’une réponse HTTP
  - **H2** — 3. En-têtes HTTP et négociation de contenu
  - **H2** — 4. Le format JSON (JavaScript Object Notation)
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Ligne de requête HTTP
    - **H3** — Exercice 2 — Extraction de la Query String
    - **H3** — Exercice 3 — Validation des en-têtes HTTP JSON
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
| Chapitre 2 — Architecture REST & modélisation des ressources | `chapitre2.html` | `api-rest-flask/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| HTTP / HTTPS |  | — | `opt` | — | actif | data-correct=1 |
| FTP |  | — | `opt` | — | actif | — |
| SMTP |  | — | `opt` | — | actif | — |
| Le corps (Body) |  | — | `opt` | — | actif | data-correct=1 |
| La chaîne de requête (Query string) |  | — | `opt` | — | actif | — |
| La ligne de statut |  | — | `opt` | — | actif | — |
| Content-Type: application/json |  | — | `opt` | — | actif | data-correct=1 |
| Accept: text/html |  | — | `opt` | — | actif | — |
| Host: api.local |  | — | `opt` | — | actif | — |
| Entourées de guillemets doubles "" |  | — | `opt` | — | actif | data-correct=1 |
| Entourées de guillemets simples '' |  | — | `opt` | — | actif | — |
| Écrites sans aucun guillemet |  | — | `opt` | — | actif | — |
| Accept |  | — | `opt` | — | actif | data-correct=1 |
| Content-Type |  | — | `opt` | — | actif | — |
| User-Agent |  | — | `opt` | — | actif | — |
| La méthode, le chemin cible et la version du protocole |  | — | `opt` | — | actif | data-correct=1 |
| Le code d’état et le message de statut |  | — | `opt` | — | actif | — |
| Le token d’authentification Bearer |  | — | `opt` | — | actif | — |
| Une fonction JavaScript |  | — | `opt` | — | actif | data-correct=1 |
| Un tableau de nombres |  | — | `opt` | — | actif | — |
| Une valeur booléenne false |  | — | `opt` | — | actif | — |
| Après le point d’interrogation ? |  | — | `opt` | — | actif | data-correct=1 |
| Avant le nom de domaine |  | — | `opt` | — | actif | — |
| Dans les en-têtes HTTP |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `fl2-c1-e1` | python | 300 | suspendue | `GET /api/v1/users HTTP/1.1` | Exercice 1 — Ligne de requête HTTP |
| `fl2-c1-e2` | python | 300 | suspendue | `https://api.site.fr/v1/articles?limit=10&page=2&sort=desc` | Exercice 2 — Extraction de la Query String |
| `fl2-c1-e3` | python | 300 | suspendue | `Host: api.exemple.com Content-Type: application/json User-Agent: curl/8.4.0` | Exercice 3 — Validation des en-têtes HTTP JSON |

- QCM : 1 bloc(s), **8 question(s)**.
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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 8 · elements `code` : 46
- SVG inline : 23 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-lightbulb`, `#i-shield`, `#i-terminal`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2042 mots · 470 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 66. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 24 |
| `ic` | 21 |
| `box` | 9 |
| `box__title` | 9 |
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
