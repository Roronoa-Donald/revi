# Chapitre 5 — Utilisateurs, groupes et fichiers de comptes

> Fiche extraite du fichier `b1-linux/chapitres/chapitre5.html` (488 lignes, 31.0 Ko, sha256 `a6aa266f6bf6`).
> Famille : **cours-b1-linux** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-linux/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Utilisateurs, groupes et fichiers de comptes \| Linux B1 |
| Description meta | Chapitre 5 du cours de Linux B1 : Le format /etc/passwd, /etc/shadow et /etc/group, créer et modifier des comptes, groupes et appartenances. Théorie, exemples détaillés, exercices Bash exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Utilisateurs, groupes et fichiers de comptes |
| 3 | h2 | — | 1. Le fichier /etc/passwd |
| 4 | h2 | — | 2. /etc/shadow et /etc/group |
| 5 | h2 | — | 3. Créer, modifier, supprimer des comptes |
| 6 | h2 | — | 4. Créer et gérer des groupes |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 10 question(s) |
| 15 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Utilisateurs, groupes et fichiers de comptes
  - **H2** — 1. Le fichier /etc/passwd
  - **H2** — 2. /etc/shadow et /etc/group
  - **H2** — 3. Créer, modifier, supprimer des comptes
  - **H2** — 4. Créer et gérer des groupes
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — useradd et /etc/passwd simulés
    - **H3** — Exercice 2 — groupadd et appartenance
    - **H3** — Exercice 3 — Audit des comptes
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
| nav | `lxnav` | Portail → `/`<br>Linux B1 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

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
| Réviser avec les flashcards | `cartes.html` | `b1-linux/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b1-linux/chapitres/formules.html` | interne |
| Chapitre 6 — Droits d’accès et scripts shell (TP) | `chapitre6.html` | `b1-linux/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 5 |  | — | `opt` | — | actif | — |
| 7 |  | — | `opt` | — | actif | data-correct=1 |
| 9 |  | — | `opt` | — | actif | — |
| Compte désactivé |  | — | `opt` | — | actif | — |
| Le vérificateur de mot de passe se trouve dans /etc/shadow |  | — | `opt` | — | actif | data-correct=1 |
| Pas de mot de passe |  | — | `opt` | — | actif | — |
| 1 |  | — | `opt` | — | actif | — |
| 0 |  | — | `opt` | — | actif | data-correct=1 |
| 1000 |  | — | `opt` | — | actif | — |
| /etc/passwd |  | — | `opt` | — | actif | — |
| /etc/shadow |  | — | `opt` | — | actif | data-correct=1 |
| /etc/group |  | — | `opt` | — | actif | — |
| Renomme tutu en toto |  | — | `opt` | — | actif | — |
| Change la maison de tutu en /home/toto en recopiant le contenu |  | — | `opt` | — | actif | data-correct=1 |
| Supprime tutu |  | — | `opt` | — | actif | — |
| Tout est supprimé |  | — | `opt` | — | actif | — |
| Le compte est supprimé ; ajouter -r pour retirer aussi le répertoire |  | — | `opt` | — | actif | data-correct=1 |
| Rien, il faut usermod |  | — | `opt` | — | actif | — |
| groupadd |  | — | `opt` | — | actif | data-correct=1 |
| usermod |  | — | `opt` | — | actif | — |
| passwd |  | — | `opt` | — | actif | — |
| Si le groupe contient des fichiers |  | — | `opt` | — | actif | — |
| Si le groupe est le groupe principal d’un utilisateur |  | — | `opt` | — | actif | data-correct=1 |
| Jamais |  | — | `opt` | — | actif | — |
| whoami |  | — | `opt` | — | actif | data-correct=1 |
| w |  | — | `opt` | — | actif | — |
| users |  | — | `opt` | — | actif | — |
| groupe:*:GID:utilisateurs |  | — | `opt` | — | actif | data-correct=1 |
| groupe:GID:utilisateurs:* |  | — | `opt` | — | actif | — |
| … | | | | | | 1 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lx-c5-e1` | shell | 300 | active | `6 useradd alice useradd bob ls userdel alice ls useradd carol` | Exercice 1 — useradd et /etc/passwd simulés |
| `lx-c5-e2` | shell | 300 | active | `6 groupadd etudiants groupadd profs usermod etudiants alice usermod profs alice groups alice groups bob` | Exercice 2 — groupadd et appartenance |
| `lx-c5-e3` | shell | 300 | active | `4 root:$6$sel$hash sys:* ancien:!! vide:` | Exercice 3 — Audit des comptes |

- QCM : 1 bloc(s), **10 question(s)**.
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

- Tableaux : 2 (0 lignes / 2 en-tetes ; 0 lignes / 3 en-tetes)
- Blocs `pre` : 8 · elements `code` : 66
- SVG inline : 23 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-terminal`, `#i-play`, `#i-target`, `#i-warning`, `#i-pin`, `#i-lightbulb`, `#i-compass`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2496 mots · 488 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 63. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 30 |
| `ic` | 21 |
| `q` | 10 |
| `q__stem` | 10 |
| `opts` | 10 |
| `q__exp` | 10 |
| `box` | 9 |
| `box__title` | 9 |
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

Attributs `data-*` : `data-correct` (10), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
