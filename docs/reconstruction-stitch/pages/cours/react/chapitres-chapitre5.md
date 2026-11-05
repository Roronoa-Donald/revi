# Chapitre 5 — Effets de bord (useEffect) & requêtes asynchrones

> Fiche extraite du fichier `react/chapitres/chapitre5.html` (469 lignes, 27.0 Ko, sha256 `6ff292575057`).
> Famille : **cours-react** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/react/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Effets de bord (useEffect) & requêtes asynchrones \| React B2 |
| Description meta | Chapitre 5 du cours React B2 : Hook useEffect, cycle de vie, tableau de dépendances, cleanup function, requêtes HTTP et gestion d’états asynchrones. Théorie, exemples détaillés, exercices JavaScript exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Effets de bord (useEffect) & requêtes asynchrones |
| 3 | h2 | — | 1. Qu’est-ce qu’un effet de bord en React ? |
| 4 | h2 | — | 2. Le Hook useEffect et son tableau de dépendances |
| 5 | h2 | — | 3. La fonction de nettoyage (Cleanup function) |
| 6 | h2 | — | 4. Appels API et gestion des états asynchrones |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Effets de bord (useEffect) & requêtes asynchrones
  - **H2** — 1. Qu’est-ce qu’un effet de bord en React ?
  - **H2** — 2. Le Hook useEffect et son tableau de dépendances
  - **H2** — 3. La fonction de nettoyage (Cleanup function)
  - **H2** — 4. Appels API et gestion des états asynchrones
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Détection de changement de dépendances (useEffect)
    - **H3** — Exercice 2 — Machine d'états d'une requête API
    - **H3** — Exercice 3 — Nettoyage d'effet (Cleanup function)
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
| nav | `reactnav` | Portail → `/`<br>React B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

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
| Réviser avec les flashcards | `cartes.html` | `react/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `react/chapitres/formules.html` | interne |
| Chapitre 6 — Navigation avec React Router & architecture globale | `chapitre6.html` | `react/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Après que le navigateur a peint le rendu dans le DOM |  | — | `opt` | — | actif | data-correct=1 |
| Avant l’initialisation de la fonction |  | — | `opt` | — | actif | — |
| Pendant la compilation du fichier |  | — | `opt` | — | actif | — |
| Après chaque rendu du composant |  | — | `opt` | — | actif | data-correct=1 |
| Une seule fois au montage |  | — | `opt` | — | actif | — |
| Jamais |  | — | `opt` | — | actif | — |
| Une seule fois au montage initial |  | — | `opt` | — | actif | data-correct=1 |
| En boucle continue |  | — | `opt` | — | actif | — |
| Uniquement au démontage |  | — | `opt` | — | actif | — |
| Nettoyer les abonnements, timers ou écouteurs d’événements |  | — | `opt` | — | actif | data-correct=1 |
| Sauvegarder l’état dans un fichier |  | — | `opt` | — | actif | — |
| Forcer le rafraîchissement |  | — | `opt` | — | actif | — |
| Car une fonction async retourne une Promise au lieu d’une cleanup function synchrone |  | — | `opt` | — | actif | data-correct=1 |
| Car async est réservé au backend Node |  | — | `opt` | — | actif | — |
| Car cela désactive le Virtual DOM |  | — | `opt` | — | actif | — |
| Avec un booléen actif ou un AbortController dans le nettoyage |  | — | `opt` | — | actif | data-correct=1 |
| En augmentant le débit réseau |  | — | `opt` | — | actif | — |
| En désactivant le cache |  | — | `opt` | — | actif | — |
| Chargement (loading), Données (data) et Erreur (error) |  | — | `opt` | — | actif | data-correct=1 |
| Création, Compilation, Débogage |  | — | `opt` | — | actif | — |
| Pause, Reprise, Arrêt |  | — | `opt` | — | actif | — |
| Quand userId change de valeur (comparaison Object.is) |  | — | `opt` | — | actif | data-correct=1 |
| À chaque frappe de clavier |  | — | `opt` | — | actif | — |
| Toutes les dix secondes |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `rx2-c5-e1` | javascript | 300 | active | `10 Paris 10 Lyon` | Exercice 1 — Détection de changement de dépendances (useEffect) |
| `rx2-c5-e2` | javascript | 300 | active | `SUCCESS 42_utilisateurs` | Exercice 2 — Machine d'états d'une requête API |
| `rx2-c5-e3` | javascript | 300 | active | `MOUNT,TICK,UNMOUNT` | Exercice 3 — Nettoyage d'effet (Cleanup function) |

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
- Blocs `pre` : 9 · elements `code` : 36
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-lightbulb`, `#i-terminal`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~1995 mots · 404 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 62. Les plus frequentes :

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
