# Chapitre 3 — Droits, permissions, utilisateurs et groupes

> Fiche extraite du fichier `linux/chapitres/chapitre3.html` (441 lignes, 25.7 Ko, sha256 `75a33703c733`).
> Famille : **cours-linux** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/linux/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Droits, permissions, utilisateurs et groupes \| Administration Linux B2 |
| Description meta | Chapitre 3 du cours d’administration Linux B2 : Lire les permissions, chmod symbolique et octal, chown/chgrp, /etc/passwd, users et groupes. Théorie, exemples détaillés, exercices Bash exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Droits, permissions, utilisateurs et groupes |
| 3 | h2 | — | 1. Lire les permissions |
| 4 | h2 | — | 2. chmod : modifier les droits |
| 5 | h2 | — | 3. chown et chgrp |
| 6 | h2 | — | 4. Comptes et groupes |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Droits, permissions, utilisateurs et groupes
  - **H2** — 1. Lire les permissions
  - **H2** — 2. chmod : modifier les droits
  - **H2** — 3. chown et chgrp
  - **H2** — 4. Comptes et groupes
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Décoder une permission
    - **H3** — Exercice 2 — Interroger une permission
    - **H3** — Exercice 3 — Vérifier une appartenance
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 12 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `linuxnav` | Portail → `/`<br>Administration Linux B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Administration Linux B2 | `../index.html` | `linux/index.html` | interne |
| Sommaire | `../sommaire.html` | `linux/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `linux/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `linux/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `linux/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `linux/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `linux/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `linux/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `linux/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `linux/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `linux/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `linux/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `linux/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `linux/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `linux/chapitres/formules.html` | interne |
| Chapitre 4 — Réseau statique et SSH | `chapitre4.html` | `linux/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 754 |  | — | `opt` | — | actif | — |
| 750 |  | — | `opt` | — | actif | data-correct=1 |
| 705 |  | — | `opt` | — | actif | — |
| retire la lecture aux autres |  | — | `opt` | — | actif | data-correct=1 |
| retire la lecture au propriétaire |  | — | `opt` | — | actif | — |
| ajoute la lecture |  | — | `opt` | — | actif | — |
| ajoute rwx |  | — | `opt` | — | actif | — |
| fixe u et g exactement à rwx, o inchangé |  | — | `opt` | — | actif | data-correct=1 |
| supprime o |  | — | `opt` | — | actif | — |
| /etc/passwd |  | — | `opt` | — | actif | — |
| /etc/shadow |  | — | `opt` | — | actif | data-correct=1 |
| /etc/group |  | — | `opt` | — | actif | — |
| Tous les UID ≥ 1000 sont humains |  | — | `opt` | — | actif | — |
| La plage par défaut des nouveaux comptes ordinaires commence à 1000 |  | — | `opt` | — | actif | data-correct=1 |
| root a l’UID 1000 |  | — | `opt` | — | actif | — |
| supprime le compte seul |  | — | `opt` | — | actif | — |
| supprime le compte et sa maison |  | — | `opt` | — | actif | data-correct=1 |
| désactive le compte |  | — | `opt` | — | actif | — |
| le propriétaire |  | — | `opt` | — | actif | — |
| le groupe |  | — | `opt` | — | actif | data-correct=1 |
| les droits |  | — | `opt` | — | actif | — |
| est vide |  | — | `opt` | — | actif | — |
| sert de groupe principal à un utilisateur |  | — | `opt` | — | actif | data-correct=1 |
| a des fichiers |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lx2-c3-e1` | shell | 300 | suspendue | `1 rwxr-xr-x` | Exercice 1 — Décoder une permission |
| `lx2-c3-e2` | shell | 300 | suspendue | `2 rw-r--r-- lire rw-r--r-- executer` | Exercice 2 — Interroger une permission |
| `lx2-c3-e3` | shell | 300 | suspendue | `2 rd it sam admin` | Exercice 3 — Vérifier une appartenance |

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

- Tableaux : 0
- Blocs `pre` : 10 · elements `code` : 74
- SVG inline : 24 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-terminal`, `#i-play`, `#i-target`, `#i-pin`, `#i-warning`, `#i-wrench`, `#i-lightbulb`, `#i-compass`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~1840 mots · 446 noeuds HTML

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
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |
| `badge` | 3 |
| `lab__body` | 3 |

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
