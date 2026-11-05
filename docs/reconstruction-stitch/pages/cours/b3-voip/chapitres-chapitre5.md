# Chapitre 5 — Qualité de Service (QoS), Dimensionnement & Réseau

> Fiche extraite du fichier `b3-voip/chapitres/chapitre5.html` (476 lignes, 38.7 Ko, sha256 `417b2b030c9e`).
> Famille : **cours-b3-voip** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-voip/chapitres/chapitre5.html` |
| Titre du document | Module 5 — Qualité de Service (QoS), Dimensionnement & Réseau \| Téléphonie VoIP B3 |
| Description meta | Module 5 du cours Téléphonie VoIP B3 : Théorie du trafic téléphonique et formule récursive d'Erlang B (Grade of Service GoS), dimensionnement des liaisons trunks SIP, mécanismes de QoS réseau (marquage DSCP EF 46 / CoS 5, Voice VLAN 802.1Q, files d'attente LLQ) et résolution de la traversée de pare-feu et NAT (STUN, TURN, ICE et désactivation de SIP ALG). Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Qualité de Service (QoS), Dimensionnement & Réseau |
| 3 | h2 | — | 1. Dimensionnement des Trunks Téléphoniques & Loi d'Erlang B |
| 4 | h2 | — | 2. Mécanismes de Qualité de Service (QoS) & Ségrégation Réseau |
| 5 | h2 | — | 3. Problématique du NAT & Mécanismes de Traversée (STUN, TURN, ICE) |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Qualité de Service (QoS), Dimensionnement & Réseau
  - **H2** — 1. Dimensionnement des Trunks Téléphoniques & Loi d'Erlang B
      - **H4** — La Formule Récursive d'Erlang B (ITU-T E.500)
  - **H2** — 2. Mécanismes de Qualité de Service (QoS) & Ségrégation Réseau
      - **H4** — Qualité de Service Couche 2 (Réseau Local)
      - **H4** — Qualité de Service Couche 3 (Routage IP)
  - **H2** — 3. Problématique du NAT & Mécanismes de Traversée (STUN, TURN, ICE)
      - **H4** — Pourquoi le NAT perturbe-t-il la ToIP ?
      - **H4** — Technologies de Traversée de NAT (STUN, TURN, ICE)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur d'Erlang B & Dimensionnement de Trunks Téléphoniques
    - **H3** — Exercice 2 — Validateur de Marquage QoS & Mappage DSCP / CoS 802.1p
    - **H3** — Exercice 3 — Observer les mappages STUN avant les vérifications ICE
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
| Module 6 — Fonctions Avancées, Trunks Inter-Sites & Sécurité ToIP | `chapitre6.html` | `b3-voip/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 3.00 Erlangs |  | — | `opt` | — | actif | — |
| 6.00 Erlangs |  | — | `opt` | — | actif | data-correct=1 |
| 10.00 Erlangs |  | — | `opt` | — | actif | — |
| 21.60 Erlangs |  | — | `opt` | — | actif | — |
| 0 (CS0) |  | — | `opt` | — | actif | — |
| 24 (CS3) |  | — | `opt` | — | actif | — |
| 34 (AF41) |  | — | `opt` | — | actif | — |
| 46 (EF) |  | — | `opt` | — | actif | data-correct=1 |
| CoS 0 |  | — | `opt` | — | actif | — |
| CoS 3 |  | — | `opt` | — | actif | — |
| CoS 5 |  | — | `opt` | — | actif | data-correct=1 |
| CoS 7 |  | — | `opt` | — | actif | — |
| 50 ms |  | — | `opt` | — | actif | — |
| 150 ms |  | — | `opt` | — | actif | data-correct=1 |
| 300 ms |  | — | `opt` | — | actif | — |
| 500 ms |  | — | `opt` | — | actif | — |
| Le téléphone refuse de sonner |  | — | `opt` | — | actif | — |
| L'appel est redirigé vers la police |  | — | `opt` | — | actif | — |
| Le phénomène de One-Way Audio (audio unidirectionnel) |  | — | `opt` | — | actif | data-correct=1 |
| Le combiné redémarre en boucle |  | — | `opt` | — | actif | — |
| Le pair est nécessairement joignable directement |  | — | `opt` | — | actif | — |
| Les mappages observés sont identiques, mais la connectivité doit être vérifiée |  | — | `opt` | — | actif | data-correct=1 |
| Aucun pare-feu ne filtre le trafic |  | — | `opt` | — | actif | — |
| Le client ne traverse aucun NAT |  | — | `opt` | — | actif | — |
| Activer le proxy transparent |  | — | `opt` | — | actif | — |
| Désactiver le module SIP ALG (Application Layer Gateway) |  | — | `opt` | — | actif | data-correct=1 |
| Bloquer les paquets UDP |  | — | `opt` | — | actif | — |
| Réduire la MTU à 500 octets |  | — | `opt` | — | actif | — |
| SNMP |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vo3-c5-e1` | analyse | 300 | active | `CALLS_PER_HOUR=120 DURATION_SEC=180 CHANNELS=10 TARGET_GOS_PCT=1.0 CALLS_PER_HOUR=200 DURATION_SEC=120 CHANNELS=8 TARGET_GOS_PCT=2.0` | Exercice 1 — Calculateur d'Erlang B & Dimensionnement de Trunks Téléphoniques |
| `vo3-c5-e2` | analyse | 300 | active | `FLUX=RTP_VOICE DSCP_DEC=46 COS_OBSERVED=5 FLUX=RTP_VOICE DSCP_DEC=0 COS_OBSERVED=0 FLUX=SIP_SIGNALING DSCP_DEC=26 COS_OBSERVED=3 FLUX=SIP_SIGNALING DSCP_DEC=24 COS_OBSERVED=5` | Exercice 2 — Validateur de Marquage QoS & Mappage DSCP / CoS 802.1p |
| `vo3-c5-e3` | analyse | 300 | active | `CLIENT_LOCAL=192.168.1.15:5060 STUN1_MAPPED=198.51.100.42:10500 STUN2_MAPPED=198.51.100.42:10500 CLIENT_LOCAL=192.168.1.15:5060 STUN1_MAPPED=198.51.100.42:10500 STUN2_MAPPED=198.51.100.42:10501 CLIENT_LOCAL=203.0.113.10:5060 STUN1_MAPPED=203.0.113.10:5060 STUN2_MAPPED=203.0.113.10:5060` | Exercice 3 — Observer les mappages STUN avant les vérifications ICE |

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
- Blocs `pre` : 5 · elements `code` : 41
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-phone`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3616 mots · 468 noeuds HTML

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
| `card` | 5 |
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
