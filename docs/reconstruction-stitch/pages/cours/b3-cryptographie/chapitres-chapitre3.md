# Chapitre 3 — Fonctions de Hachage, Intégrité et Authentification de Message (MAC)

> Fiche extraite du fichier `b3-cryptographie/chapitres/chapitre3.html` (513 lignes, 39.2 Ko, sha256 `3b0374bea858`).
> Famille : **cours-b3-cryptographie** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cryptographie/chapitres/chapitre3.html` |
| Titre du document | Module 3 — Fonctions de Hachage, Intégrité et Authentification de Message (MAC) \| Cryptographie & PKI B3 |
| Description meta | Module 3 du cours Cryptographie & PKI B3 : Fonctions de hachage à sens unique (One-Way Hash Functions), construction itérative de Merkle-Damgård, propriétés de sécurité (résistance à la préimage, seconde préimage, résistance aux collisions), effet d'avalanche, analyse comparative de MD5, SHA-1, SHA-2 (SHA-256, SHA-512) et SHA-3 (Keccak / construction éponge), codes d'authentification de message HMAC (RFC 2104), attaques par extension de longueur, et modélisation probabiliste du paradoxe des anniversaires. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Fonctions de Hachage, Intégrité et Authentification de Message (MAC) |
| 3 | h2 | — | 1. Propriétés Fondamentales des Fonctions de Hachage Cryptographiques |
| 4 | h2 | — | 2. Architectures de Hachage : Merkle-Damgård vs Construction Éponge (SHA-3) |
| 5 | h2 | — | 3. Codes d'Authentification de Message HMAC (RFC 2104) |
| 6 | h2 | — | 4. Paradoxe des Anniversaires & Dimensionnement des Condensés |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 5 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Fonctions de Hachage, Intégrité et Authentification de Message (MAC)
  - **H2** — 1. Propriétés Fondamentales des Fonctions de Hachage Cryptographiques
      - **H4** — 1. Résistance à la Préimage
      - **H4** — 2. Seconde Préimage
      - **H4** — 3. Résistance aux Collisions
  - **H2** — 2. Architectures de Hachage : Merkle-Damgård vs Construction Éponge (SHA-3)
      - **H4** — Construction de Merkle-Damgård (MD5, SHA-1, SHA-2)
      - **H4** — Construction Éponge (SHA-3 / Keccak)
  - **H2** — 3. Codes d'Authentification de Message HMAC (RFC 2104)
      - **H4** — Pourquoi pas simplement H(K \|\| M) ?
      - **H4** — Mécanisme HMAC (RFC 2104)
  - **H2** — 4. Paradoxe des Anniversaires & Dimensionnement des Condensés
      - **H4** — Formulation Mathématique
      - **H4** — Impact Pratique sur le Dimensionnement
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Vérificateur d'Intégrité et Comparateur d'Empreintes (MD5, SHA-1, SHA-256)
    - **H3** — Exercice 2 — Implémentation du Mécanisme HMAC (RFC 2104) et Intégrité Authentifiée
    - **H3** — Exercice 3 — Simulateur d'Attaque des Anniversaires et Détection de Collision
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

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
| Module 4 — Cryptographie Asymétrique & Arithmétique Modulaire | `chapitre4.html` | `b3-cryptographie/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 2^n opérations |  | — | `opt` | — | actif | — |
| 2^(n/2) opérations |  | — | `opt` | — | actif | data-correct=1 |
| n^2 opérations |  | — | `opt` | — | actif | — |
| 2^(2n) opérations |  | — | `opt` | — | actif | — |
| Elle permet de retrouver la clé K par simple division modulaire |  | — | `opt` | — | actif | — |
| La structure de Merkle-Damgård permet d'ajouter des données sans connaître K (Length Exten |  | — | `opt` | — | actif | data-correct=1 |
| Le hachage produit toujours une chaîne vide |  | — | `opt` | — | actif | — |
| Elle déclenche une boucle infinie dans l'interpréteur |  | — | `opt` | — | actif | — |
| Bloc 32 octets, ipad=0x00, opad=0xFF |  | — | `opt` | — | actif | — |
| Bloc 64 octets, ipad=0x36, opad=0x5c |  | — | `opt` | — | actif | data-correct=1 |
| Bloc 128 octets, ipad=0xAA, opad=0x55 |  | — | `opt` | — | actif | — |
| Bloc 16 octets, ipad=0x12, opad=0x34 |  | — | `opt` | — | actif | — |
| L'attaque Heartbleed |  | — | `opt` | — | actif | — |
| L'attaque POODLE |  | — | `opt` | — | actif | — |
| L'attaque SHAttered |  | — | `opt` | — | actif | data-correct=1 |
| L'attaque WannaCry |  | — | `opt` | — | actif | — |
| SHA-3 utilise un chiffrement par bloc DES interne |  | — | `opt` | — | actif | — |
| SHA-3 repose sur une construction éponge (Sponge Construction) et non sur Merkle-Damgård |  | — | `opt` | — | actif | data-correct=1 |
| SHA-3 nécessite obligatoirement une carte graphique GPU |  | — | `opt` | — | actif | — |
| SHA-3 est limité à des sorties de 64 bits |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `cr3-c3-e1` | analyse | 300 | active | `HASH algo=sha256 text=SECURITE_INFORMATIQUE` | Exercice 1 — Vérificateur d'Intégrité et Comparateur d'Empreintes (MD5, SHA-1, SHA-256) |
| `cr3-c3-e2` | analyse | 300 | active | `HMAC CALC key=SECRET_SHARED_KEY text=TRANSACTION amount=5000 from=alice to=bob` | Exercice 2 — Implémentation du Mécanisme HMAC (RFC 2104) et Intégrité Authentifiée |
| `cr3-c3-e3` | analyse | 300 | active | `COLLISION PROB bits=16 attempts=300` | Exercice 3 — Simulateur d'Attaque des Anniversaires et Détection de Collision |

- QCM : 1 bloc(s), **5 question(s)**.
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
- Blocs `pre` : 7 · elements `code` : 35
- SVG inline : 23 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-lock`, `#i-play`, `#i-target`, `#i-info`, `#i-warning`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3438 mots · 478 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 70. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 21 |
| `opt` | 20 |
| `box` | 9 |
| `box__title` | 9 |
| `card` | 9 |
| `q` | 5 |
| `q__stem` | 5 |
| `opts` | 5 |
| `q__exp` | 5 |
| `grid` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid-2` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |

Attributs `data-*` : `data-correct` (5), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
