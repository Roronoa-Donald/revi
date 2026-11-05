# Chapitre 6 — Navigation avec React Router & architecture globale

> Fiche extraite du fichier `react/chapitres/chapitre6.html` (491 lignes, 29.8 Ko, sha256 `cfb450c0ba42`).
> Famille : **cours-react** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/react/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Navigation avec React Router & architecture globale \| React B2 |
| Description meta | Chapitre 6 du cours React B2 : Single Page Application, BrowserRouter, Routes, Link, useParams, Outlet, useReducer et structuration d’un projet complet. Théorie, exemples détaillés, exercices JavaScript exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Navigation avec React Router & architecture globale |
| 3 | h2 | — | 1. Le concept de Single Page Application (SPA) |
| 4 | h2 | — | 2. Configuration de React Router v6 |
| 5 | h2 | — | 3. Paramètres dynamiques et useParams |
| 6 | h2 | — | 4. Routes privées : garde d’interface et autorisation serveur |
| 7 | h2 | — | 5. Architecture professionnelle et gestion d’état par Reducer |
| 8 | h2 | — | 6. Exercices de code |
| 9 | h2 | — | 7. QCM — niveau examen |
| 10 | h2 | — | 8. Erreurs classiques — récapitulatif |
| 11 | h2 | — | 9. Méthodologie de résolution |
| 12 | h2 | — | 10. Révision active |
| 13 | h2 | — | 11. Test de maîtrise |
| 14 | .lab | code lab | 3 bloc(s) |
| 15 | .qcm | QCM | 9 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Navigation avec React Router & architecture globale
  - **H2** — 1. Le concept de Single Page Application (SPA)
  - **H2** — 2. Configuration de React Router v6
  - **H2** — 3. Paramètres dynamiques et useParams
  - **H2** — 4. Routes privées : garde d’interface et autorisation serveur
  - **H2** — 5. Architecture professionnelle et gestion d’état par Reducer
  - **H2** — 6. Exercices de code
    - **H3** — Exercice 1 — Paramètres de route dynamiques (useParams)
    - **H3** — Exercice 2 — Garde de navigation côté client et composant Navigate
    - **H3** — Exercice 3 — Architecture d'état par Reducer (useReducer)
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
| nav | `reactnav` | Portail → `/`<br>React B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **22** (externes : 1).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| React B2 | `../index.html` | `react/index.html` | interne |
| Sommaire | `../sommaire.html` | `react/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `react/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `react/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `react/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `react/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `react/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `react/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `react/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `react/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `react/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `react/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `react/chapitres/simulateur-examen.html` | interne |
| recommandations OWASP sur l’autorisation | `https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html` | `https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html` | externe |
| Réviser avec les flashcards | `cartes.html` | `react/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `react/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `react/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Le composant <Link to="..."> |  | — | `opt` | — | actif | data-correct=1 |
| La balise HTML standard <a href="..."> |  | — | `opt` | — | actif | — |
| La méthode window.reload() |  | — | `opt` | — | actif | — |
| useParams() |  | — | `opt` | — | actif | data-correct=1 |
| useRouteQuery() |  | — | `opt` | — | actif | — |
| useURL() |  | — | `opt` | — | actif | — |
| <Outlet /> |  | — | `opt` | — | actif | data-correct=1 |
| <Placeholder /> |  | — | `opt` | — | actif | — |
| <RouteSlot /> |  | — | `opt` | — | actif | — |
| L’état est complexe et implique de multiples sous-valeurs interdépendantes |  | — | `opt` | — | actif | data-correct=1 |
| L’application ne comporte aucun composant |  | — | `opt` | — | actif | — |
| On veut bloquer le rendu du DOM |  | — | `opt` | — | actif | — |
| path="*" |  | — | `opt` | — | actif | data-correct=1 |
| path="404" |  | — | `opt` | — | actif | — |
| path="none" |  | — | `opt` | — | actif | — |
| <Navigate to="/login" replace /> |  | — | `opt` | — | actif | data-correct=1 |
| <RedirectPermanent /> |  | — | `opt` | — | actif | — |
| <window.forward /> |  | — | `opt` | — | actif | — |
| const navigate = useNavigate() |  | — | `opt` | — | actif | data-correct=1 |
| history.jump() |  | — | `opt` | — | actif | — |
| router.forward() |  | — | `opt` | — | actif | — |
| src/services/ |  | — | `opt` | — | actif | data-correct=1 |
| src/styles/ |  | — | `opt` | — | actif | — |
| public/assets/ |  | — | `opt` | — | actif | — |
| Le serveur vérifie l’identité et les droits sur la ressource à chaque requête |  | — | `opt` | — | actif | data-correct=1 |
| PrivateRoute dans le navigateur suffit |  | — | `opt` | — | actif | — |
| Masquer le lien dans le menu suffit |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `rx2-c6-e1` | javascript | 300 | suspendue | `/users/:id/profile /users/42/profile` | Exercice 1 — Paramètres de route dynamiques (useParams) |
| `rx2-c6-e2` | javascript | 300 | suspendue | `1 Dashboard` | Exercice 2 — Garde de navigation côté client et composant Navigate |
| `rx2-c6-e3` | javascript | 300 | suspendue | `50 AJOUT:20 REMISE:10` | Exercice 3 — Architecture d'état par Reducer (useReducer) |

- QCM : 1 bloc(s), **9 question(s)**.
- Encadres pedagogiques : 10 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 9 · elements `code` : 37
- SVG inline : 24 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-lightbulb`, `#i-shield`, `#i-terminal`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2141 mots · 424 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 64. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 27 |
| `ic` | 22 |
| `box` | 10 |
| `box__title` | 10 |
| `q` | 9 |
| `q__stem` | 9 |
| `opts` | 9 |
| `q__exp` | 9 |
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

Attributs `data-*` : `data-correct` (9), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
