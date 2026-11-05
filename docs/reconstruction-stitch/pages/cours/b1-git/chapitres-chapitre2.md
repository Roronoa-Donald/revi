# Chapitre 2 — Index et commits : add, reset, commit

> Fiche extraite du fichier `b1-git/chapitres/chapitre2.html` (454 lignes, 26.7 Ko, sha256 `4c1b7957ea61`).
> Famille : **cours-b1-git** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-git/chapitres/chapitre2.html` |
| Titre du document | Chapitre 2 — Index et commits : add, reset, commit \| Git B1 |
| Description meta | Chapitre 2 du cours de Git B1 : git add et ses options, exclure avec .gitignore, retirer de l'index, écrire des messages de commit. Théorie, exemples détaillés, exercices Bash exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Index et commits : add, reset, commit |
| 3 | h2 | — | 1. git add : sélectionner |
| 4 | h2 | — | 2. Exclure : .gitignore et sa limite |
| 5 | h2 | — | 3. Retirer de l'index : reset HEAD |
| 6 | h2 | — | 4. Committer et renommer l'archive |
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

- **H1** — Chapitre 2 — Index et commits : add, reset, commit
  - **H2** — 1. git add : sélectionner
  - **H2** — 2. Exclure : .gitignore et sa limite
  - **H2** — 3. Retirer de l'index : reset HEAD
  - **H2** — 4. Committer et renommer l'archive
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Cycle add / commit
    - **H3** — Exercice 2 — reset HEAD sélectif
    - **H3** — Exercice 3 — Messages de commit disciplinés
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 11 notions à connaître absolument
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
| Chapitre 3 — Historique et annulations : log, reset, revert | `chapitre3.html` | `b1-git/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| ignorer les fichiers détruits |  | — | `opt` | — | actif | — |
| prendre nouveaux, modifiés et détruits |  | — | `opt` | — | actif | data-correct=1 |
| ne prendre que les modifiés |  | — | `opt` | — | actif | — |
| Indexe les nouveaux fichiers |  | — | `opt` | — | actif | — |
| Indexe modifications et destructions des fichiers suivis |  | — | `opt` | — | actif | data-correct=1 |
| Met à jour le dépôt distant |  | — | `opt` | — | actif | — |
| Il sort du suivi |  | — | `opt` | — | actif | — |
| Il reste suivi — il faut git rm --cached |  | — | `opt` | — | actif | data-correct=1 |
| Il est supprimé |  | — | `opt` | — | actif | — |
| Supprime le fichier du disque |  | — | `opt` | — | actif | — |
| Retire l'index et le suivi, le fichier reste sur disque |  | — | `opt` | — | actif | data-correct=1 |
| Ne fait rien |  | — | `opt` | — | actif | — |
| Efface le fichier |  | — | `opt` | — | actif | — |
| Retire ses modifications de l'index, qui repartent dans la copie |  | — | `opt` | — | actif | data-correct=1 |
| Crée un commit |  | — | `opt` | — | actif | — |
| La copie de travail entière |  | — | `opt` | — | actif | — |
| L'état de l'index, décrit par le message, identifié par un SHA-1 |  | — | `opt` | — | actif | data-correct=1 |
| Les fichiers du dépôt distant |  | — | `opt` | — | actif | — |
| Toujours |  | — | `opt` | — | actif | — |
| Si le commit n'a pas encore été poussé |  | — | `opt` | — | actif | data-correct=1 |
| Après un push |  | — | `opt` | — | actif | — |
| plein |  | — | `opt` | — | actif | — |
| vide |  | — | `opt` | — | actif | data-correct=1 |
| inversé |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `gt-c2-e1` | shell | 300 | active | `6 add a add b commit add c compte commit` | Exercice 1 — Cycle add / commit |
| `gt-c2-e2` | shell | 300 | active | `6 add a add b reset a index add c index` | Exercice 2 — reset HEAD sélectif |
| `gt-c2-e3` | shell | 300 | active | `3 Initialisation du projet ajout du point d entrée Ajout du point d entrée.` | Exercice 3 — Messages de commit disciplinés |

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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 10 · elements `code` : 35
- SVG inline : 24 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-pin`, `#i-warning`, `#i-terminal`, `#i-lightbulb`, `#i-compass`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2159 mots · 433 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 63. Les plus frequentes :

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
| `box--pitfall` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `badge` | 3 |
| `lab__body` | 3 |

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
