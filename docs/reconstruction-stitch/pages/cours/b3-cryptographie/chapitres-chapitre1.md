# Chapitre 1 — Fondements, Principes de Sécurité et Chiffrements Historiques

> Fiche extraite du fichier `b3-cryptographie/chapitres/chapitre1.html` (504 lignes, 37.7 Ko, sha256 `0dc636c10128`).
> Famille : **cours-b3-cryptographie** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cryptographie/chapitres/chapitre1.html` |
| Titre du document | Module 1 — Fondements, Principes de Sécurité et Chiffrements Historiques \| Cryptographie & PKI B3 |
| Description meta | Module 1 du cours Cryptographie & PKI B3 : Objectifs fondamentaux de la sécurité de l'information (confidentialité, intégrité, authenticité, non-répudiation), principe de Kerckhoffs, modèle de menace et cryptanalyse, chiffrements historiques par substitution monoalphabétique (César, chiffrement affine), chiffre polyalphabétique de Vigenère, masque jetable de Vernam (One-Time Pad et confidentialité parfaite de Shannon), analyse fréquentielle et indice de coïncidence de Friedman. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Fondements, Principes de Sécurité et Chiffrements Historiques |
| 3 | h2 | — | 1. Objectifs de la Sécurité, Règle de Kerckhoffs & Types d'Attaques |
| 4 | h2 | — | 2. Chiffrements Historiques : Substitution Monoalphabétique (César & Affine) |
| 5 | h2 | — | 3. Vigenère, Masque Jetable (OTP) & Analyse Fréquentielle (Friedman) |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 6 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Fondements, Principes de Sécurité et Chiffrements Historiques
  - **H2** — 1. Objectifs de la Sécurité, Règle de Kerckhoffs & Types d'Attaques
      - **H4** — Les Piliers de la Sécurité Informatique
      - **H4** — Le Principe de Kerckhoffs (1883)
  - **H2** — 2. Chiffrements Historiques : Substitution Monoalphabétique (César & Affine)
      - **H4** — Chiffre de César (Décalage Circulaire)
      - **H4** — Chiffrement par Substitution Affine
  - **H2** — 3. Vigenère, Masque Jetable (OTP) & Analyse Fréquentielle (Friedman)
      - **H4** — Chiffre de Vigenère & Masque Jetable (OTP)
      - **H4** — Indice de Coïncidence de Friedman (IC)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Chiffrement et Déchiffrement de César et Substitution Affine
    - **H3** — Exercice 2 — Chiffre Polyalphabétique de Vigenère et Masque Jetable (OTP)
    - **H3** — Exercice 3 — Analyse Fréquentielle et Indice de Coïncidence (IC) pour Cryptanalyse
  - **H2** — 5. QCM — niveau examen
  - **H2** — 6. Erreurs classiques — récapitulatif
  - **H2** — 7. Méthodologie de résolution
  - **H2** — 8. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 9. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-cryptographienav` | Portail → `/`<br>Cryptographie & PKI B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Cryptographie & PKI B3 | `../index.html` | `b3-cryptographie/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-cryptographie/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-cryptographie/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-cryptographie/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-cryptographie/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-cryptographie/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-cryptographie/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-cryptographie/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-cryptographie/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-cryptographie/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-cryptographie/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-cryptographie/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-cryptographie/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-cryptographie/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-cryptographie/chapitres/formules.html` | interne |
| Module 2 — Cryptographie Symétrique Moderne (Chiffrement par Bloc et par Flux) | `chapitre2.html` | `b3-cryptographie/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Le principe de Kerckhoffs |  | — | `opt` | — | actif | data-correct=1 |
| Le rasoir d'Ockham |  | — | `opt` | — | actif | — |
| Le théorème de Shannon |  | — | `opt` | — | actif | — |
| La loi de Moore |  | — | `opt` | — | actif | — |
| 26 |  | — | `opt` | — | actif | — |
| 13 |  | — | `opt` | — | actif | — |
| 12 |  | — | `opt` | — | actif | data-correct=1 |
| 25 |  | — | `opt` | — | actif | — |
| La clé est secrète, uniformément aléatoire et indépendante du message |  | — | `opt` | — | actif | data-correct=1 |
| Le chiffré est toujours plus long que le clair |  | — | `opt` | — | actif | — |
| La clé est forcément stockée sur une carte à puce |  | — | `opt` | — | actif | — |
| La même clé est réutilisée pour chaque message |  | — | `opt` | — | actif | — |
| 0.0385 |  | — | `opt` | — | actif | — |
| 0.0500 |  | — | `opt` | — | actif | — |
| 0.0778 |  | — | `opt` | — | actif | data-correct=1 |
| 0.1250 |  | — | `opt` | — | actif | — |
| Known-Plaintext Attack (KPA) |  | — | `opt` | — | actif | — |
| Ciphertext-Only Attack (COA) |  | — | `opt` | — | actif | data-correct=1 |
| Chosen-Plaintext Attack (CPA) |  | — | `opt` | — | actif | — |
| Man-in-the-Middle (MITM) |  | — | `opt` | — | actif | — |
| L'attaquant ne peut rien déduire car le masque est aléatoire |  | — | `opt` | — | actif | — |
| L'opération C1 ^ C2 annule le masque et révèle P1 ^ P2 |  | — | `opt` | — | actif | data-correct=1 |
| La clé K est automatiquement détruite |  | — | `opt` | — | actif | — |
| Les textes clairs sont effacés du réseau |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `cr3-c1-e1` | analyse | 300 | active | `CAESAR ENC k=3 text=BONJOUR` | Exercice 1 — Chiffrement et Déchiffrement de César et Substitution Affine |
| `cr3-c1-e2` | analyse | 300 | active | `VIGENERE ENC key=LUNE text=BONJOUR` | Exercice 2 — Chiffre Polyalphabétique de Vigenère et Masque Jetable (OTP) |
| `cr3-c1-e3` | analyse | 300 | active | `ANALYZE text=LE PETIT CHAPERON ROUGE SE PROMENAIT DANS LA FORET TOUT SEUL ET RENCONTRA LE LOUP` | Exercice 3 — Analyse Fréquentielle et Indice de Coïncidence (IC) pour Cryptanalyse |

- QCM : 1 bloc(s), **6 question(s)**.
- Encadres pedagogiques : 7 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 6 · elements `code` : 54
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-lock`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3466 mots · 470 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 24 |
| `ic` | 19 |
| `box` | 7 |
| `box__title` | 7 |
| `card` | 6 |
| `q` | 6 |
| `q__stem` | 6 |
| `opts` | 6 |
| `q__exp` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
| `grid-2` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |

Attributs `data-*` : `data-correct` (6), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
