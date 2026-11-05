# Simulateur d'examen

> Fiche extraite du fichier `b1-git/chapitres/simulateur-examen.html` (264 lignes, 16.8 Ko, sha256 `fd01b295f56d`).
> Famille : **cours-b1-git** · sous-type : `simulateur-examen` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-git/chapitres/simulateur-examen.html` |
| Titre du document | Examens blancs — Git B1 |
| Description meta | Examens blancs du cours de Git B1 : sujets chronométrés sur le dépôt, l'index, l'historique, les branches et la collaboration, avec corrigés détaillés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Simulateur d'examen |
| 3 | h2 | — | Examen blanc n°1 |
| 4 | h2 | — | Examen blanc n°2 — variante |
| 5 | h2 | — | QCM final — toutes notions |
| 6 | .qcm | QCM | 10 question(s) |

## 3. Hierarchie des titres

- **H1** — Simulateur d'examen
  - **H2** — Examen blanc n°1
  - **H2** — Examen blanc n°2 — variante
  - **H2** — QCM final — toutes notions

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `gtnav` | Portail → `/`<br>Git B1 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **19** (externes : 0).

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
| Exercices & projet | `../exercices/exercices.html` | `b1-git/exercices/exercices.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Démarrer le chrono |  | — | `btn btn--primary` | — | actif | data-start= |
| un dépôt distant |  | — | `opt` | — | actif | — |
| le sous-dossier .git |  | — | `opt` | — | actif | data-correct=1 |
| un README |  | — | `opt` | — | actif | — |
| les nouveaux fichiers |  | — | `opt` | — | actif | — |
| les modifiés/détruits des suivis |  | — | `opt` | — | actif | data-correct=1 |
| tout le dossier |  | — | `opt` | — | actif | — |
| sort du suivi |  | — | `opt` | — | actif | — |
| reste suivi |  | — | `opt` | — | actif | data-correct=1 |
| est supprimé |  | — | `opt` | — | actif | — |
| La garde |  | — | `opt` | — | actif | — |
| L'efface jusqu'au commit cible |  | — | `opt` | — | actif | data-correct=1 |
| La remise |  | — | `opt` | — | actif | — |
| reset --hard |  | — | `opt` | — | actif | — |
| revert |  | — | `opt` | — | actif | data-correct=1 |
| rm --cached |  | — | `opt` | — | actif | — |
| reste visible |  | — | `opt` | — | actif | — |
| n'a plus de trace |  | — | `opt` | — | actif | data-correct=1 |
| devient une étiquette |  | — | `opt` | — | actif | — |
| réseau coupé |  | — | `opt` | — | actif | — |
| le distant a des commits inconnus du local |  | — | `opt` | — | actif | data-correct=1 |
| message trop long |  | — | `opt` | — | actif | — |
| fusionne le distant |  | — | `opt` | — | actif | — |
| actualise les références sans fusionner |  | — | `opt` | — | actif | data-correct=1 |
| pousse |  | — | `opt` | — | actif | — |
| perd tout |  | — | `opt` | — | actif | — |
| retrouve ses modifications |  | — | `opt` | — | actif | data-correct=1 |
| devient commitée |  | — | `opt` | — | actif | — |
| le README |  | — | `opt` | — | actif | — |
| … | | | | | | 2 de plus |

## 7. Composants pedagogiques et etats observes

- QCM : 1 bloc(s), **10 question(s)**.
- Encadres pedagogiques : 2 (`.box`, variantes `box--*`).
- Blocs replies : 8 (`<details>`).

Etats et interactions a reconstruire :

- Chronometre `[data-timer][data-minutes]` : bouton Demarrer, affichage mm:ss, etat « Temps ecoule ».
- QCM d'examen : correction revelee apres reponse (selon le mode de la page).
- Etat session serveur (API QCM) : non expose dans le HTML statique.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 14
- SVG inline : 9 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-clock`, `#i-play`, `#i-compass`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~1161 mots · 263 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 41. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 30 |
| `q` | 10 |
| `q__stem` | 10 |
| `opts` | 10 |
| `q__exp` | 10 |
| `item` | 8 |
| `item__head` | 8 |
| `item__num` | 8 |
| `badge` | 8 |
| `sol` | 8 |
| `ic` | 7 |
| `bandrow` | 4 |
| `lead` | 3 |
| `btn` | 3 |
| `box` | 2 |
| `box--method` | 2 |
| `box__title` | 2 |
| `btn--primary` | 2 |
| `skip-nav` | 1 |
| `skip-link` | 1 |

Attributs `data-*` : `data-correct` (10), `data-timer` (1), `data-minutes` (1), `data-start` (1), `data-clock` (1), `data-mastery` (1)

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
