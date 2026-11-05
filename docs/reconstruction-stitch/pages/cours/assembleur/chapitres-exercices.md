# Catalogue des 18 ateliers de code interactifs

> Fiche extraite du fichier `assembleur/chapitres/exercices.html` (249 lignes, 14.6 Ko, sha256 `c9a95e469361`).
> Famille : **cours-assembleur** · sous-type : `autre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/assembleur/chapitres/exercices.html` |
| Titre du document | Catalogue des ateliers — Assembleur B2 |
| Description meta | Catalogue des 18 exercices pratiques de code d’Assembleur B2 : registres, drapeaux, ALIGN, LEA et pile. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Catalogue des 18 ateliers de code interactifs |
| 3 | h2 | — | Module 1 — Numération, Représentation des Données & Logique Binaire |
| 4 | h2 | — | Module 2 — Architecture du Processeur, Registres & Drapeaux d’État |
| 5 | h2 | — | Module 3 — Mémoires, Bus & Architectures (Von Neumann vs Harvard, AVR / x86) |
| 6 | h2 | — | Module 4 — Chaîne de Production Logicielle (Assembleur, ELF, Linker & Débogueur) |
| 7 | h2 | — | Module 5 — Jeu d’Instructions x86/AVR, Transferts & Modes d’Adressage |
| 8 | h2 | — | Module 6 — Branchements, Pile d’Exécution, Fonctions & Appels Système |

## 3. Hierarchie des titres

- **H1** — Catalogue des 18 ateliers de code interactifs
  - **H2** — Module 1 — Numération, Représentation des Données & Logique Binaire
    - **H3** — Masquage binaire & opérations logiques (AND, OR, XOR)
    - **H3** — Décodage du Complément à 2 (8 bits & 16 bits)
    - **H3** — Décalages logiques & arithmétiques (SHL, SHR, SAR)
  - **H2** — Module 2 — Architecture du Processeur, Registres & Drapeaux d’État
    - **H3** — Décomposition des sous-registres x86_64 (RAX, EAX, AX, AH, AL)
    - **H3** — Simulateur d’ALU 8 bits & Drapeaux d’état (ZF, CF, SF)
    - **H3** — Détection du débordement signé (Overflow Flag OF)
  - **H2** — Module 3 — Mémoires, Bus & Architectures (Von Neumann vs Harvard, AVR / x86)
    - **H3** — Configuration des broches GPIO AVR (DDRB & PORTB)
    - **H3** — Gestion de l’Endianness (Little-Endian vs Big-Endian)
    - **H3** — Calcul d’adresse physique en mode réel x86 (Segment:Offset)
  - **H2** — Module 4 — Chaîne de Production Logicielle (Assembleur, ELF, Linker & Débogueur)
    - **H3** — Décodeur de directives de données NASM (db, dw, dd, dq)
    - **H3** — Résolution d’adresses virtuelles de sections ELF
    - **H3** — Alignement mémoire & calcul de Padding (Directive ALIGN)
  - **H2** — Module 5 — Jeu d’Instructions x86/AVR, Transferts & Modes d’Adressage
    - **H3** — Simulateur d’instructions MOV entre registres
    - **H3** — Calcul d’adresse effective LEA (Base + Index * Scale + Disp)
    - **H3** — Exécuteur d’opérations arithmétiques x86 (ADD, SUB, INC, DEC, NEG, XOR)
  - **H2** — Module 6 — Branchements, Pile d’Exécution, Fonctions & Appels Système
    - **H3** — Simulateur de pile x86 (PUSH & POP avec pointeur ESP)
    - **H3** — Évaluateur de sauts conditionnels x86 (CMP & Jcc)
    - **H3** — Modélisateur de cadre de pile (Stack Frame cdecl)

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `assembleurnav` | Portail → `/`<br>Assembleur B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **37** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Assembleur B2 | `../index.html` | `assembleur/index.html` | interne |
| Sommaire | `../sommaire.html` | `assembleur/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `assembleur/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `assembleur/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `assembleur/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `assembleur/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `assembleur/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `assembleur/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `assembleur/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `assembleur/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `assembleur/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `assembleur/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `assembleur/chapitres/examens.html` | interne |
| Ouvrir | `chapitre1.html` | `assembleur/chapitres/chapitre1.html` | interne |
| Ouvrir | `chapitre2.html` | `assembleur/chapitres/chapitre2.html` | interne |
| Ouvrir | `chapitre3.html` | `assembleur/chapitres/chapitre3.html` | interne |
| Ouvrir | `chapitre4.html` | `assembleur/chapitres/chapitre4.html` | interne |
| Ouvrir | `chapitre5.html` | `assembleur/chapitres/chapitre5.html` | interne |
| Ouvrir | `chapitre6.html` | `assembleur/chapitres/chapitre6.html` | interne |
| Simulateur d’examen | `examens.html` | `assembleur/chapitres/examens.html` | interne |
| Bac à sable Assembleur | `../atelier.html` | `assembleur/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- Page secondaire du cours ; etats derives du composant principal present.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 0
- SVG inline : 24 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cpu`, `#i-arrow-right`, `#i-arrow-left`
- Volume de texte : ~622 mots · 227 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 24. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 22 |
| `btn` | 20 |
| `summary-item` | 18 |
| `summary-item__num` | 18 |
| `summary-item__body` | 18 |
| `summary-list` | 6 |
| `skip-nav` | 1 |
| `skip-link` | 1 |
| `assembleurnav` | 1 |
| `assembleurnav__in` | 1 |
| `assembleurnav__home` | 1 |
| `assembleurnav__sep` | 1 |
| `assembleurnav__brand` | 1 |
| `assembleurnav__links` | 1 |
| `is-active` | 1 |
| `assembleurnav__actions` | 1 |
| `theme-toggle` | 1 |
| `theme-toggle__sun` | 1 |
| `theme-toggle__moon` | 1 |
| `assembleurwrap` | 1 |

Aucun attribut `data-*`.

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
