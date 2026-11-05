# Chapitre 6 — Protocoles Cryptographiques Sécurisés (TLS, SSH, IPsec) & Post-Quantique

> Fiche extraite du fichier `b3-cryptographie/chapitres/chapitre6.html` (541 lignes, 44.0 Ko, sha256 `480c4401219b`).
> Famille : **cours-b3-cryptographie** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cryptographie/chapitres/chapitre6.html` |
| Titre du document | Module 6 — Protocoles Cryptographiques Sécurisés (TLS, SSH, IPsec) & Post-Quantique \| Cryptographie & PKI B3 |
| Description meta | Module 6 du cours Cryptographie & PKI B3 : Protocole TLS 1.3 (RFC 9846 ; RFC 8446 historique) et refonte architecturale par rapport à TLS 1.2, handshake 1-RTT et données 0-RTT, confidentialité persistante (PFS) selon la phase et le mode négocié, anatomie des suites cryptographiques, protocoles SSHv2 et IPsec (AH/ESP, IKEv2, modes Transport et Tunnel), et standards post-quantiques du NIST. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Protocoles Cryptographiques Sécurisés (TLS, SSH, IPsec) & Post-Quantique |
| 3 | h2 | — | 1. Protocole TLS 1.3 (RFC 9846) & Confidentialité Persistante (PFS) |
| 4 | h2 | — | 2. Analyse et Durcissement des Suites Cryptographiques (Cipher Suites) |
| 5 | h2 | — | 3. Protocoles d'Infrastructure Sécurisés : SSHv2 & IPsec |
| 6 | h2 | — | 4. La Menace Quantique & la Cryptographie Post-Quantique (NIST PQC) |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 5 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Protocoles Cryptographiques Sécurisés (TLS, SSH, IPsec) & Post-Quantique
  - **H2** — 1. Protocole TLS 1.3 (RFC 9846) & Confidentialité Persistante (PFS)
      - **H4** — Ruptures Fondamentales de TLS 1.3
      - **H4** — Optimisation de la Poignée de Mains (Handshake)
  - **H2** — 2. Analyse et Durcissement des Suites Cryptographiques (Cipher Suites)
      - **H4** — Syntaxe TLS 1.2 (Complexe)
      - **H4** — Syntaxe TLS 1.3 (Compacte & Sécurisée)
  - **H2** — 3. Protocoles d'Infrastructure Sécurisés : SSHv2 & IPsec
      - **H4** — SSHv2 (Secure Shell v2 - RFC 4253)
      - **H4** — IPsec (Internet Protocol Security - RFC 4301)
  - **H2** — 4. La Menace Quantique & la Cryptographie Post-Quantique (NIST PQC)
      - **H4** — Les Deux Grands Algorithmes Quantiques
      - **H4** — Standards Post-Quantiques du NIST (Août 2024)
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Analyseur de Suite Cryptographique TLS (Cipher Suite Parser)
    - **H3** — Exercice 2 — Analyse illustrative des phases TLS 1.3 et de la confidentialité persistante (PFS)
    - **H3** — Exercice 3 — Auditeur de Conformité Cryptographique et Transition Post-Quantique (NIST PQC)
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
| Atelier de code | `../atelier.html` | `b3-cryptographie/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce que RSA ne fonctionne pas avec le protocole TCP |  | — | `opt` | — | actif | — |
| Parce que RSA statique ne fournit pas la confidentialité persistante (PFS) |  | — | `opt` | — | actif | data-correct=1 |
| Parce que RSA consomme trop d'électricité |  | — | `opt` | — | actif | — |
| Parce que RSA a été racheté par une entreprise privée |  | — | `opt` | — | actif | — |
| 0-RTT |  | — | `opt` | — | actif | — |
| 1-RTT |  | — | `opt` | — | actif | data-correct=1 |
| 2-RTT |  | — | `opt` | — | actif | — |
| 3-RTT |  | — | `opt` | — | actif | — |
| Mode Transport avec AH |  | — | `opt` | — | actif | — |
| Mode Tunnel avec ESP |  | — | `opt` | — | actif | data-correct=1 |
| Mode Loopback avec ICMP |  | — | `opt` | — | actif | — |
| Mode Broadcast avec ARP |  | — | `opt` | — | actif | — |
| L'algorithme de Grover |  | — | `opt` | — | actif | — |
| L'algorithme de Shor |  | — | `opt` | — | actif | data-correct=1 |
| L'algorithme de Dijkstra |  | — | `opt` | — | actif | — |
| L'algorithme A* |  | — | `opt` | — | actif | — |
| FIPS 140-3 |  | — | `opt` | — | actif | — |
| FIPS 197 |  | — | `opt` | — | actif | — |
| FIPS 203 (ML-KEM / Kyber) |  | — | `opt` | — | actif | data-correct=1 |
| RFC 2104 |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `cr3-c6-e1` | analyse | 300 | active | `PARSE_SUITE suite=TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256` | Exercice 1 — Analyseur de Suite Cryptographique TLS (Cipher Suite Parser) |
| `cr3-c6-e2` | analyse | 300 | active | `TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 mode=dhe phase=1-rtt` | Exercice 2 — Analyse illustrative des phases TLS 1.3 et de la confidentialité persistante (PFS) |
| `cr3-c6-e3` | analyse | 300 | active | `AUDIT_ALGO name=RSA key_size=2048 type=ASYMMETRIC` | Exercice 3 — Auditeur de Conformité Cryptographique et Transition Post-Quantique (NIST PQC) |

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

- Tableaux : 0
- Blocs `pre` : 5 · elements `code` : 73
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-lock`, `#i-play`, `#i-target`, `#i-warning`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~4051 mots · 509 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 20 |
| `opt` | 20 |
| `box` | 8 |
| `box__title` | 8 |
| `card` | 8 |
| `q` | 5 |
| `q__stem` | 5 |
| `opts` | 5 |
| `q__exp` | 5 |
| `grid` | 4 |
| `grid-2` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
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
