# Chapitre 1 — Le système GNU/Linux : histoire, licence, architecture

> Fiche extraite du fichier `b1-linux/chapitres/chapitre1.html` (491 lignes, 34.6 Ko, sha256 `93e8ca6ef189`).
> Famille : **cours-b1-linux** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-linux/chapitres/chapitre1.html` |
| Titre du document | Chapitre 1 — Le système GNU/Linux : histoire, licence, architecture \| Linux B1 |
| Description meta | Chapitre 1 du cours de Linux B1 : D’UNIX à Linux, les quatre libertés du logiciel libre, distributions, architecture en couches. Théorie, exemples détaillés, exercices Bash exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Le système GNU/Linux : histoire, licence, architecture |
| 3 | h2 | — | 1. Un système d’exploitation, à quoi ça sert |
| 4 | h2 | — | 2. D’UNIX à Linux : les dates à connaître |
| 5 | h2 | — | 3. Le logiciel libre et la licence GPL |
| 6 | h2 | — | 4. Distributions et architecture logique |
| 7 | h2 | — | 5. Se repérer dans l’arborescence : chemins et répertoires standard |
| 8 | h2 | — | 6. Convention simplifiée de la première activité |
| 9 | h2 | — | 7. Avant les ateliers : la structure minimale d’un script Bash |
| 10 | h2 | — | 8. Exercices de code |
| 11 | h2 | — | 9. QCM — niveau examen |
| 12 | h2 | — | 10. Erreurs classiques — récapitulatif |
| 13 | h2 | — | 11. Méthodologie de résolution |
| 14 | h2 | — | 12. Révision active |
| 15 | .lab | code lab | 3 bloc(s) |
| 16 | .qcm | QCM | 8 question(s) |
| 17 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Le système GNU/Linux : histoire, licence, architecture
  - **H2** — 1. Un système d’exploitation, à quoi ça sert
  - **H2** — 2. D’UNIX à Linux : les dates à connaître
  - **H2** — 3. Le logiciel libre et la licence GPL
  - **H2** — 4. Distributions et architecture logique
  - **H2** — 5. Se repérer dans l’arborescence : chemins et répertoires standard
  - **H2** — 6. Convention simplifiée de la première activité
  - **H2** — 7. Avant les ateliers : la structure minimale d’un script Bash
  - **H2** — 8. Exercices de code
    - **H3** — Exercice 1 — Chemins absolus ou relatifs
    - **H3** — Exercice 2 — Fonctions d'une arborescence
    - **H3** — Exercice 3 — Arborescence artificielle
  - **H2** — 9. QCM — niveau examen
  - **H2** — 10. Erreurs classiques — récapitulatif
  - **H2** — 11. Méthodologie de résolution
  - **H2** — 12. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 9 notions à connaître absolument
  - **H2** — 13. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `lxnav` | Portail → `/`<br>Linux B1 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **24** (externes : 3).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Linux B1 | `../index.html` | `b1-linux/index.html` | interne |
| Sommaire | `../sommaire.html` | `b1-linux/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b1-linux/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b1-linux/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b1-linux/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b1-linux/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b1-linux/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b1-linux/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b1-linux/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b1-linux/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `b1-linux/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `b1-linux/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `b1-linux/chapitres/simulateur-examen.html` | interne |
| histoire de la FSF et de Linux | `https://www.fsf.org/bulletin/2024/fall/tracing-the-fsfs-footsteps` | `https://www.fsf.org/bulletin/2024/fall/tracing-the-fsfs-footsteps` | externe |
| texte de la GPL version 1 | `https://www.gnu.org/licenses/old-licenses/gpl-1.0.html` | `https://www.gnu.org/licenses/old-licenses/gpl-1.0.html` | externe |
| manuel AT&T de janvier 1983 | `https://bitsavers.computerhistory.org/pdf/att/unix/System_V_Release_1/301-905_UNIX_System_V_Release_1_Users_Manual_Jan83.pdf` | `https://bitsavers.computerhistory.org/pdf/att/unix/System_V_Release_1/301-905_UNIX_System_V_Release_1_Users_Manual_Jan83.pdf` | externe |
| Réviser avec les flashcards | `cartes.html` | `b1-linux/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b1-linux/chapitres/formules.html` | interne |
| Chapitre 2 — Arborescence et système de fichiers | `chapitre2.html` | `b1-linux/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Ken Thompson, 1969 |  | — | `opt` | — | actif | — |
| Richard Stallman, 1984 |  | — | `opt` | — | actif | — |
| Linus Torvalds, 1991 |  | — | `opt` | — | actif | data-correct=1 |
| En assembleur |  | — | `opt` | — | actif | — |
| En langage C |  | — | `opt` | — | actif | data-correct=1 |
| En Pascal |  | — | `opt` | — | actif | — |
| Gnu is not Unix |  | — | `opt` | — | actif | data-correct=1 |
| General New Unix |  | — | `opt` | — | actif | — |
| GNU Network Utility |  | — | `opt` | — | actif | — |
| Trois, numérotées 1 à 3 |  | — | `opt` | — | actif | — |
| Quatre, numérotées 0 à 3 |  | — | `opt` | — | actif | data-correct=1 |
| Cinq, numérotées 0 à 4 |  | — | `opt` | — | actif | — |
| La GPL est payante |  | — | `opt` | — | actif | — |
| La GPL interdit les versions propriétaires (copyleft), la BSD l’autorise |  | — | `opt` | — | actif | data-correct=1 |
| Aucune, ce sont les mêmes |  | — | `opt` | — | actif | — |
| Il gère la mémoire |  | — | `opt` | — | actif | — |
| Il interprète les commandes de l’utilisateur |  | — | `opt` | — | actif | data-correct=1 |
| Il remplace le noyau |  | — | `opt` | — | actif | — |
| Une version payante de Linux |  | — | `opt` | — | actif | — |
| Un assemblage complet : noyau, utilitaires, commandes, applications |  | — | `opt` | — | actif | data-correct=1 |
| Un gestionnaire de téléchargement |  | — | `opt` | — | actif | — |
| csh |  | — | `opt` | — | actif | — |
| bash |  | — | `opt` | — | actif | data-correct=1 |
| ksh |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lx-c1-e1` | shell | 300 | suspendue | `/home/user/docs 3 /etc/passwd cours/linux ./notes.txt` | Exercice 1 — Chemins absolus ou relatifs |
| `lx-c1-e2` | shell | 300 | active | `/tmp /home /donnees` | Exercice 2 — Fonctions d'une arborescence |
| `lx-c1-e3` | shell | 300 | active | `6 mkdir /home/user touch /etc/passwd ls mkdir /var/log touch /var/log/syslog ls` | Exercice 3 — Arborescence artificielle |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 11 (`.box`, variantes `box--*`).
- Blocs replies : 4 (`<details>`).

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

- Tableaux : 2 (0 lignes / 2 en-tetes ; 0 lignes / 2 en-tetes)
- Blocs `pre` : 9 · elements `code` : 90
- SVG inline : 23 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-terminal`, `#i-play`, `#i-target`, `#i-pin`, `#i-warning`, `#i-lightbulb`, `#i-compass`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3004 mots · 554 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 63. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 24 |
| `ic` | 21 |
| `box` | 11 |
| `box__title` | 11 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `lab__sample-part` | 6 |
| `box--tech` | 4 |
| `lab__note` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `badge` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-grading-suspended` (1), `data-mark-done` (1)

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
