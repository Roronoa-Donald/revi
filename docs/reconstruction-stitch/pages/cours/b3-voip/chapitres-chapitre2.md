# Chapitre 2 — Protocoles de Signalisation & Médias (SIP, SDP, RTP)

> Fiche extraite du fichier `b3-voip/chapitres/chapitre2.html` (544 lignes, 40.7 Ko, sha256 `7efcd3169e0d`).
> Famille : **cours-b3-voip** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-voip/chapitres/chapitre2.html` |
| Titre du document | Module 2 — Protocoles de Signalisation & Médias (SIP, SDP, RTP) \| Téléphonie VoIP B3 |
| Description meta | Module 2 du cours Téléphonie VoIP B3 : Architecture et messages du protocole SIP (RFC 3261), entités UAC/UAS, serveurs proxy et registrar, négociation multimédia avec SDP (RFC 4566), transport temps réel avec RTP et RTCP (RFC 3550), horodatage et calcul mathématique de la gigue inter-paquets. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Protocoles de Signalisation & Médias (SIP, SDP, RTP) |
| 3 | h2 | — | 1. Le Protocole SIP (Session Initiation Protocol, RFC 3261) |
| 4 | h2 | — | 2. Négociation de Session avec SDP (Session Description Protocol, RFC 4566) |
| 5 | h2 | — | 3. Transport Temps Réel avec RTP & RTCP (RFC 3550) |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 2 — Protocoles de Signalisation & Médias (SIP, SDP, RTP)
  - **H2** — 1. Le Protocole SIP (Session Initiation Protocol, RFC 3261)
      - **H4** — Les Entités Fondamentales du Réseau SIP
      - **H4** — Les Méthodes (Verbes) SIP Fondamentales
      - **H4** — Familles de Codes de Réponse SIP
  - **H2** — 2. Négociation de Session avec SDP (Session Description Protocol, RFC 4566)
      - **H4** — Structure d'un Message SDP Standard
  - **H2** — 3. Transport Temps Réel avec RTP & RTCP (RFC 3550)
      - **H4** — Structure de l'En-tête RTP (12 octets fixes)
      - **H4** — Le Protocole de Supervision RTCP & Calcul de la Gigue (Jitter)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Parseur d'En-têtes de Messages SIP RFC 3261
    - **H3** — Exercice 2 — Analyseur de Négociation de Session SDP RFC 4566
    - **H3** — Exercice 3 — Décodeur d'En-tête RTP & Calculateur de Gigue (RFC 3550)
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
| nav | `b3-voipnav` | Portail → `/`<br>Téléphonie VoIP B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Téléphonie VoIP B3 | `../index.html` | `b3-voip/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-voip/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-voip/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-voip/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-voip/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-voip/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-voip/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-voip/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-voip/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-voip/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-voip/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-voip/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-voip/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-voip/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-voip/chapitres/formules.html` | interne |
| Module 3 — Architecture & Déploiement d'un IPBX Asterisk | `chapitre3.html` | `b3-voip/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| RTP |  | — | `opt` | — | actif | — |
| RTCP |  | — | `opt` | — | actif | — |
| SDP |  | — | `opt` | — | actif | data-correct=1 |
| DNS |  | — | `opt` | — | actif | — |
| INVITE |  | — | `opt` | — | actif | — |
| REGISTER |  | — | `opt` | — | actif | data-correct=1 |
| SUBSCRIBE |  | — | `opt` | — | actif | — |
| NOTIFY |  | — | `opt` | — | actif | — |
| Réponse définitive de succès |  | — | `opt` | — | actif | — |
| Réponse provisoire |  | — | `opt` | — | actif | data-correct=1 |
| Erreur client |  | — | `opt` | — | actif | — |
| Redirection |  | — | `opt` | — | actif | — |
| Le champ Version |  | — | `opt` | — | actif | — |
| Le champ Payload Type |  | — | `opt` | — | actif | — |
| Le champ Sequence Number |  | — | `opt` | — | actif | data-correct=1 |
| Le champ SSRC |  | — | `opt` | — | actif | — |
| Port 5060 |  | — | `opt` | — | actif | — |
| Port 10000 |  | — | `opt` | — | actif | — |
| Port 10001 |  | — | `opt` | — | actif | data-correct=1 |
| Port 20000 |  | — | `opt` | — | actif | — |
| L'audio est diffusé en multicast |  | — | `opt` | — | actif | — |
| Le terminal recevra le flux voix sur le port 16384/UDP avec le codec PCMA (G.711 A-law) |  | — | `opt` | — | actif | data-correct=1 |
| L'audio est chiffré avec une clé RSA 16384 bits |  | — | `opt` | — | actif | — |
| Le fichier audio pèse 16 384 octets |  | — | `opt` | — | actif | — |
| BYE |  | — | `opt` | — | actif | — |
| CANCEL |  | — | `opt` | — | actif | data-correct=1 |
| HANGUP |  | — | `opt` | — | actif | — |
| DISCONNECT |  | — | `opt` | — | actif | — |
| Ji = \|Di\| |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vo3-c2-e1` | analyse | 300 | active | `INVITE sip:bob@biloxi.com SIP/2.0 Via: SIP/2.0/UDP pc33.atlanta.com;branch=z9hG4bK776asdhds Max-Forwards: 70 To: Bob <sip:bob@biloxi.com> From: Alice <sip:alice@atlanta.com>;tag=1928301774 Call-ID: a84b4c76e66710@pc33.atlanta.com CSeq: 314159 INVITE Contact: <sip:alice@pc33.atlanta.com> Content-Type: application/sdp` | Exercice 1 — Parseur d'En-têtes de Messages SIP RFC 3261 |
| `vo3-c2-e2` | analyse | 300 | active | `v=0 o=Alice 2890844526 2890844526 IN IP4 192.168.1.50 s=- c=IN IP4 192.168.1.50 t=0 0 m=audio 16384 RTP/AVP 0 8 101 a=rtpmap:0 PCMU/8000 a=rtpmap:8 PCMA/8000 a=rtpmap:101 telephone-event/8000 a=sendrecv` | Exercice 2 — Analyseur de Négociation de Session SDP RFC 4566 |
| `vo3-c2-e3` | analyse | 300 | active | `CLOCK_RATE=8000 SEQ=100 SEND_TS=10000 RECV_TS=10200 SEQ=101 SEND_TS=10160 RECV_TS=10370 SEQ=102 SEND_TS=10320 RECV_TS=10510` | Exercice 3 — Décodeur d'En-tête RTP & Calculateur de Gigue (RFC 3550) |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 6 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 5 · elements `code` : 69
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-phone`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3791 mots · 527 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 66. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 18 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 6 |
| `box__title` | 6 |
| `card` | 6 |
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
| `lab__body` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
