# Chapitre 2 — Cryptographie Appliquée, Hachage & Signatures Numériques

> Fiche extraite du fichier `Cyber securite B2/chapitres/chapitre2.html` (480 lignes, 35.7 Ko, sha256 `0851b21a62ae`).
> Famille : **cours-Cyber securite B2** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/Cyber securite B2/chapitres/chapitre2.html` |
| Titre du document | Chapitre 2 — Cryptographie Appliquée, Hachage &amp; Signatures Numériques \| Cybersécurité B2 |
| Description meta | Chapitre 2 du cours Cybersécurité B2 : Chiffrement symétrique (AES, CBC/GCM, masque jetable Vernam), chiffrement asymétrique (RSA, Diffie-Hellman), hachage cryptographique (SHA-256, HMAC), signatures numériques et certificats X.509. Notions fondamentales, ateliers Python interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Cryptographie Appliquée, Hachage & Signatures Numériques |
| 3 | h2 | — | 1. Chiffrement symétrique : Masque jetable de Vernam & Standard AES |
| 4 | h2 | — | 2. Chiffrement asymétrique : Paires de clés RSA & Diffie-Hellman |
| 5 | h2 | — | 3. Hachage cryptographique & Code d’authentification HMAC |
| 6 | h2 | — | 4. Signature numérique & Infrastructure à clés publiques (PKI) |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 5 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 2 — Cryptographie Appliquée, Hachage & Signatures Numériques
  - **H2** — 1. Chiffrement symétrique : Masque jetable de Vernam & Standard AES
  - **H2** — 2. Chiffrement asymétrique : Paires de clés RSA & Diffie-Hellman
      - **H4** — Algorithme RSA (Rivest, Shamir, Adleman)
      - **H4** — Échange de clés Diffie-Hellman (DH)
  - **H2** — 3. Hachage cryptographique & Code d’authentification HMAC
  - **H2** — 4. Signature numérique & Infrastructure à clés publiques (PKI)
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Chiffrement symétrique par masque jetable XOR (Vernam)
    - **H3** — Exercice 2 — Comparaison SHA-256 et fiabilité de la référence
    - **H3** — Exercice 3 — Vérification de signature numérique asymétrique RSA
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
| nav | `Cyber securite B2nav` | Portail → `/`<br>Cybersécurité B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **25** (externes : 4).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Cybersécurité B2 | `../index.html` | `Cyber securite B2/index.html` | interne |
| Sommaire | `../sommaire.html` | `Cyber securite B2/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `Cyber securite B2/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `Cyber securite B2/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `Cyber securite B2/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `Cyber securite B2/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `Cyber securite B2/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `Cyber securite B2/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `Cyber securite B2/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `Cyber securite B2/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `Cyber securite B2/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `Cyber securite B2/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `Cyber securite B2/chapitres/examens.html` | interne |
| NIST FIPS 180-4 : hachage | `https://csrc.nist.gov/pubs/fips/180-4/upd1/final` | `https://csrc.nist.gov/pubs/fips/180-4/upd1/final` | externe |
| NIST FIPS 198-1 : HMAC | `https://csrc.nist.gov/pubs/fips/198-1/final` | `https://csrc.nist.gov/pubs/fips/198-1/final` | externe |
| NIST SP 800-224 | `https://csrc.nist.gov/pubs/sp/800/224/ipd` | `https://csrc.nist.gov/pubs/sp/800/224/ipd` | externe |
| NIST FIPS 186-5 : signature numérique | `https://csrc.nist.gov/pubs/fips/186-5/final` | `https://csrc.nist.gov/pubs/fips/186-5/final` | externe |
| Réviser avec les flashcards | `cartes.html` | `Cyber securite B2/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `Cyber securite B2/chapitres/formules.html` | interne |
| Chapitre 3 — Sécurité des Réseaux, Filtrage & Architecture Périmétrique | `chapitre3.html` | `Cyber securite B2/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce que deux blocs de texte en clair identiques produisent toujours le même bloc chiffré |  | — | `opt` | — | actif | data-correct=1 |
| Parce qu’il ne supporte que des clés de 64 bits maximum |  | — | `opt` | — | actif | — |
| Parce qu’il consomme dix fois plus de bande passante que le mode CBC |  | — | `opt` | — | actif | — |
| Parce qu’il nécessite obligatoirement une connexion Internet active pour fonctionner |  | — | `opt` | — | actif | — |
| Avec sa propre clé privée |  | — | `opt` | — | actif | data-correct=1 |
| Avec la clé publique du récepteur |  | — | `opt` | — | actif | — |
| Avec sa propre clé publique |  | — | `opt` | — | actif | — |
| Avec une clé symétrique temporaire négociée par Diffie-Hellman |  | — | `opt` | — | actif | — |
| La résistance aux collisions |  | — | `opt` | — | actif | data-correct=1 |
| La résistance à la première préimage |  | — | `opt` | — | actif | — |
| L’effet miroir |  | — | `opt` | — | actif | — |
| La réversibilité polynomiale |  | — | `opt` | — | actif | — |
| Vérifier un HMAC avec la clé secrète partagée ou une signature avec une clé publique authe |  | — | `opt` | — | actif | data-correct=1 |
| Recalculer le hachage du fichier et le comparer à l’empreinte fournie par le même attaquan |  | — | `opt` | — | actif | — |
| Vérifier uniquement que l’empreinte contient 64 caractères hexadécimaux |  | — | `opt` | — | actif | — |
| Compresser le fichier avant de calculer son hachage |  | — | `opt` | — | actif | — |
| Une valeur identique partagée g^(ab) mod p qui servira de clé symétrique de session |  | — | `opt` | — | actif | data-correct=1 |
| La clé privée de l’autorité de certification X.509 |  | — | `opt` | — | actif | — |
| Le certificat SSL du serveur web |  | — | `opt` | — | actif | — |
| Le mot de passe administrateur en clair |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `cs2-c2-e1` | analyse | 300 | active | `48656c6c6f;KEY` | Exercice 1 — Chiffrement symétrique par masque jetable XOR (Vernam) |
| `cs2-c2-e2` | analyse | 300 | active | `fiable;Transfert de 500 EUR;6b120e5d190c04b00f51804bdd3daa3cfe22d81210f31321f69794f879c513bf` | Exercice 2 — Comparaison SHA-256 et fiabilité de la référence |
| `cs2-c2-e3` | analyse | 300 | active | `42;168;7;187` | Exercice 3 — Vérification de signature numérique asymétrique RSA |

- QCM : 1 bloc(s), **5 question(s)**.
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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 5 · elements `code` : 27
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-warning`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3234 mots · 437 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 72. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 20 |
| `opt` | 20 |
| `Cyber` | 8 |
| `securite` | 8 |
| `box` | 8 |
| `box__title` | 8 |
| `q` | 5 |
| `q__stem` | 5 |
| `opts` | 5 |
| `q__exp` | 5 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |
| `badge` | 3 |

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
