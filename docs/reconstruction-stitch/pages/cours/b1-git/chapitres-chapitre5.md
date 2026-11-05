# Chapitre 5 — Dépôt distant : clone, push, pull, fetch

> Fiche extraite du fichier `b1-git/chapitres/chapitre5.html` (459 lignes, 27.2 Ko, sha256 `20d850b77d54`).
> Famille : **cours-b1-git** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-git/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Dépôt distant : clone, push, pull, fetch \| Git B1 |
| Description meta | Chapitre 5 du cours de Git B1 : origin et les liens distants, pousser ses commits, récupérer avec pull (fetch + merge), gérer un rejet. Théorie, exemples détaillés, exercices Bash exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Dépôt distant : clone, push, pull, fetch |
| 3 | h2 | — | 1. origin : le lien vers le distant |
| 4 | h2 | — | 2. push : envoyer, et se faire refuser |
| 5 | h2 | — | 3. fetch et pull : deux façons de ramener |
| 6 | h2 | — | 4. Le scénario complet du TP2 |
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

- **H1** — Chapitre 5 — Dépôt distant : clone, push, pull, fetch
  - **H2** — 1. origin : le lien vers le distant
  - **H2** — 2. push : envoyer, et se faire refuser
  - **H2** — 3. fetch et pull : deux façons de ramener
  - **H2** — 4. Le scénario complet du TP2
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — push refusé : repartir du pull
    - **H3** — Exercice 2 — clone et origin
    - **H3** — Exercice 3 — fetch puis merge : le vrai pull
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
| nav | `gtnav` | Portail → `/`<br>Git B1 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Git B1 | `../index.html` | `b1-git/index.html` | interne |
| Sommaire | `../sommaire.html` | `b1-git/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b1-git/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b1-git/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b1-git/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b1-git/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b1-git/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b1-git/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b1-git/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b1-git/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `b1-git/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `b1-git/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `b1-git/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b1-git/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b1-git/chapitres/formules.html` | interne |
| Chapitre 6 — Stash, gitignore et publication | `chapitre6.html` | `b1-git/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| le dépôt local |  | — | `opt` | — | actif | — |
| le lien conventionnel vers le dépôt distant |  | — | `opt` | — | actif | data-correct=1 |
| la branche principale |  | — | `opt` | — | actif | — |
| git remote -v |  | — | `opt` | — | actif | data-correct=1 |
| git branch -r |  | — | `opt` | — | actif | — |
| git log origin |  | — | `opt` | — | actif | — |
| le dépôt distant est plein |  | — | `opt` | — | actif | — |
| le distant contient des commits que le local n'a pas |  | — | `opt` | — | actif | data-correct=1 |
| le message est trop long |  | — | `opt` | — | actif | — |
| Il fusionne le distant dans le local |  | — | `opt` | — | actif | — |
| Il actualise les références distantes sans fusionner |  | — | `opt` | — | actif | data-correct=1 |
| Il pousse les commits |  | — | `opt` | — | actif | — |
| fetch puis merge |  | — | `opt` | — | actif | data-correct=1 |
| push puis fetch |  | — | `opt` | — | actif | — |
| clone puis merge |  | — | `opt` | — | actif | — |
| mise à jour |  | — | `opt` | — | actif | — |
| inchangée |  | — | `opt` | — | actif | data-correct=1 |
| supprimée |  | — | `opt` | — | actif | — |
| Renomme main |  | — | `opt` | — | actif | — |
| Pousse main et la lie à sa jumelle distante |  | — | `opt` | — | actif | data-correct=1 |
| Crée origin |  | — | `opt` | — | actif | — |
| les deux ont modifié le même fichier |  | — | `opt` | — | actif | data-correct=1 |
| le dépôt est public |  | — | `opt` | — | actif | — |
| B a cloné |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `gt-c5-e1` | shell | 300 | active | `4 commit commit push distant` | Exercice 1 — push refusé : repartir du pull |
| `gt-c5-e2` | shell | 300 | active | `3 commit 5 clone etat` | Exercice 2 — clone et origin |
| `gt-c5-e3` | shell | 300 | active | `5 commit tierce main fetch etat commit` | Exercice 3 — fetch puis merge : le vrai pull |

- QCM : 1 bloc(s), **8 question(s)**.
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

- Tableaux : 1 (0 lignes / 2 en-tetes)
- Blocs `pre` : 10 · elements `code` : 34
- SVG inline : 24 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-pin`, `#i-warning`, `#i-terminal`, `#i-lightbulb`, `#i-compass`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2337 mots · 414 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 62. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 24 |
| `ic` | 22 |
| `box` | 10 |
| `box__title` | 10 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `lab__sample-part` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `badge` | 3 |
| `lab__body` | 3 |
| `lab__goal` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
