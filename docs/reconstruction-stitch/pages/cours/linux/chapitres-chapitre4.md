# Chapitre 4 — Réseau statique et SSH

> Fiche extraite du fichier `linux/chapitres/chapitre4.html` (438 lignes, 23.9 Ko, sha256 `96d24471ebe6`).
> Famille : **cours-linux** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/linux/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Réseau statique et SSH \| Administration Linux B2 |
| Description meta | Chapitre 4 du cours d’administration Linux B2 : Configuration IP d’un serveur, adresses privées et publiques, connexion distante SSH. Théorie, exemples détaillés, exercices Bash exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Réseau statique et SSH |
| 3 | h2 | — | 1. Adresser un serveur |
| 4 | h2 | — | 2. Privée ou publique |
| 5 | h2 | — | 3. Se connecter en SSH |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Réseau statique et SSH
  - **H2** — 1. Adresser un serveur
  - **H2** — 2. Privée ou publique
  - **H2** — 3. Se connecter en SSH
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Valider une adresse IPv4
    - **H3** — Exercice 2 — Classer une adresse privée ou publique
    - **H3** — Exercice 3 — Décoder une cible SSH
  - **H2** — 5. QCM — niveau examen
  - **H2** — 6. Erreurs classiques — récapitulatif
  - **H2** — 7. Méthodologie de résolution
  - **H2** — 8. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 10 notions à connaître absolument
  - **H2** — 9. Test de maîtrise

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
| Chapitre 5 — Scripts Bash : lire, décider, rapporter | `chapitre5.html` | `linux/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 2 |  | — | `opt` | — | actif | — |
| 4 |  | — | `opt` | — | actif | data-correct=1 |
| 6 |  | — | `opt` | — | actif | — |
| 192.168.10.20 |  | — | `opt` | — | actif | data-correct=1 |
| 203.0.113.7 |  | — | `opt` | — | actif | — |
| 8.8.8.8 |  | — | `opt` | — | actif | — |
| oui |  | — | `opt` | — | actif | — |
| non |  | — | `opt` | — | actif | data-correct=1 |
| seulement en IPv6 |  | — | `opt` | — | actif | — |
| à traduire les noms |  | — | `opt` | — | actif | — |
| à sortir du réseau local |  | — | `opt` | — | actif | data-correct=1 |
| à chiffrer |  | — | `opt` | — | actif | — |
| 21 |  | — | `opt` | — | actif | — |
| 22 |  | — | `opt` | — | actif | data-correct=1 |
| 443 |  | — | `opt` | — | actif | — |
| ssh -p 2222 sam@serveur |  | — | `opt` | — | actif | data-correct=1 |
| ssh sam@serveur:2222 |  | — | `opt` | — | actif | — |
| ssh -p sam 2222@serveur |  | — | `opt` | — | actif | — |
| copie un fichier |  | — | `opt` | — | actif | — |
| installe la clé publique sur le serveur |  | — | `opt` | — | actif | data-correct=1 |
| génère une clé |  | — | `opt` | — | actif | — |
| pour économiser |  | — | `opt` | — | actif | — |
| pour rester joignable à la même adresse |  | — | `opt` | — | actif | data-correct=1 |
| c’est obligatoire |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lx2-c4-e1` | shell | 300 | suspendue | `3 192.168.1.1 10.0.0 256.1.1.1` | Exercice 1 — Valider une adresse IPv4 |
| `lx2-c4-e2` | shell | 300 | suspendue | `3 10.0.0.5 8.8.8.8 192.168.1.1` | Exercice 2 — Classer une adresse privée ou publique |
| `lx2-c4-e3` | shell | 300 | suspendue | `2 rd@10.0.0.5:22 admin@192.168.1.1:2222` | Exercice 3 — Décoder une cible SSH |

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

- Tableaux : 0
- Blocs `pre` : 9 · elements `code` : 25
- SVG inline : 23 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-terminal`, `#i-play`, `#i-target`, `#i-compass`, `#i-pin`, `#i-lightbulb`, `#i-warning`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~1625 mots · 387 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 64. Les plus frequentes :

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
