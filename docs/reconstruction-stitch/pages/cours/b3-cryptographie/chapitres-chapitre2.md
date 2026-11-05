# Chapitre 2 — Cryptographie Symétrique Moderne (Chiffrement par Bloc et par Flux)

> Fiche extraite du fichier `b3-cryptographie/chapitres/chapitre2.html` (489 lignes, 35.0 Ko, sha256 `178b55bacd82`).
> Famille : **cours-b3-cryptographie** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cryptographie/chapitres/chapitre2.html` |
| Titre du document | Module 2 — Cryptographie Symétrique Moderne (Chiffrement par Bloc et par Flux) \| Cryptographie & PKI B3 |
| Description meta | Module 2 du cours Cryptographie & PKI B3 : Chiffrements par flux (Stream Ciphers), registres à décalage à rétroaction linéaire (LFSR), chiffrement par bloc (Block Ciphers), réseaux de Feistel (DES, 3DES) et architecture SPN d'AES (SubBytes, ShiftRows, MixColumns, AddRoundKey), modes opératoires (ECB, CBC, CFB, OFB, CTR, GCM), gestion du bourrage PKCS#7 et attaques par oracle de padding. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Cryptographie Symétrique Moderne (Chiffrement par Bloc et par Flux) |
| 3 | h2 | — | 1. Chiffrement par Flux (Stream Ciphers) & Registres à Décalage LFSR |
| 4 | h2 | — | 2. Chiffrement par Bloc : Feistel (DES) vs Architecture SPN (AES Rijndael) |
| 5 | h2 | — | 3. Modes Opératoires, Bourrage PKCS#7 & Oracle de Padding |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 6 question(s) |
| 14 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 2 — Cryptographie Symétrique Moderne (Chiffrement par Bloc et par Flux)
  - **H2** — 1. Chiffrement par Flux (Stream Ciphers) & Registres à Décalage LFSR
      - **H4** — Principe du Chiffrement par Flux
      - **H4** — Registres à Décalage LFSR (Linear Feedback Shift Register)
  - **H2** — 2. Chiffrement par Bloc : Feistel (DES) vs Architecture SPN (AES Rijndael)
      - **H4** — Réseaux de Feistel (DES / 3DES)
      - **H4** — Architecture SPN d'AES (FIPS 197)
  - **H2** — 3. Modes Opératoires, Bourrage PKCS#7 & Oracle de Padding
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Générateur Pseudo-Aléatoire LFSR et Chiffrement de Flux (Stream Cipher)
    - **H3** — Exercice 2 — Validateur et Applicateur de Bourrage PKCS#7 (Padding & Unpadding)
    - **H3** — Exercice 3 — Simulateur de Mode Opératoire CBC (Cipher Block Chaining)
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
| Module 3 — Fonctions de Hachage, Intégrité et Authentification de Message (MAC) | `chapitre3.html` | `b3-cryptographie/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Il nécessite une puissance de calcul trop élevée |  | — | `opt` | — | actif | — |
| Deux blocs clairs identiques produisent exactement le même bloc chiffré |  | — | `opt` | — | actif | data-correct=1 |
| Il ne fonctionne qu'avec des clés de 56 bits |  | — | `opt` | — | actif | — |
| Il exige un vecteur d'initialisation IV de 64 octets |  | — | `opt` | — | actif | — |
| 0 octet |  | — | `opt` | — | actif | — |
| 1 octet |  | — | `opt` | — | actif | — |
| 8 octets |  | — | `opt` | — | actif | — |
| 16 octets (un bloc complet de valeur 0x10) |  | — | `opt` | — | actif | data-correct=1 |
| ShiftRows |  | — | `opt` | — | actif | — |
| SubBytes (via la S-Box) |  | — | `opt` | — | actif | data-correct=1 |
| MixColumns |  | — | `opt` | — | actif | — |
| AddRoundKey |  | — | `opt` | — | actif | — |
| ECB |  | — | `opt` | — | actif | — |
| CBC |  | — | `opt` | — | actif | — |
| GCM (Galois/Counter Mode) |  | — | `opt` | — | actif | data-correct=1 |
| CFB |  | — | `opt` | — | actif | — |
| 64 bits |  | — | `opt` | — | actif | — |
| 128 bits |  | — | `opt` | — | actif | data-correct=1 |
| 256 bits |  | — | `opt` | — | actif | — |
| 512 bits |  | — | `opt` | — | actif | — |
| En factorisant le modulus n |  | — | `opt` | — | actif | — |
| En observant les messages d'erreur de padding renvoyés par le serveur lors de la manipulat |  | — | `opt` | — | actif | data-correct=1 |
| En surchargeant le processeur par déni de service |  | — | `opt` | — | actif | — |
| En forçant le générateur de nombres aléatoires à zéro |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `cr3-c2-e1` | analyse | 300 | active | `LFSR ENC seed=1011 taps=0,3 text=CRYPTO` | Exercice 1 — Générateur Pseudo-Aléatoire LFSR et Chiffrement de Flux (Stream Cipher) |
| `cr3-c2-e2` | analyse | 300 | active | `PAD block_size=16 text=CONFIDENTIAL` | Exercice 2 — Validateur et Applicateur de Bourrage PKCS#7 (Padding & Unpadding) |
| `cr3-c2-e3` | analyse | 300 | active | `CBC ENC key=A1B2C3D4 iv=10203040 text=CRYPTO_OK` | Exercice 3 — Simulateur de Mode Opératoire CBC (Cipher Block Chaining) |

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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 4 · elements `code` : 36
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-lock`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3147 mots · 459 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 70. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 24 |
| `ic` | 19 |
| `box` | 7 |
| `box__title` | 7 |
| `q` | 6 |
| `q__stem` | 6 |
| `opts` | 6 |
| `q__exp` | 6 |
| `badge` | 5 |
| `card` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |
| `lab__body` | 3 |

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
