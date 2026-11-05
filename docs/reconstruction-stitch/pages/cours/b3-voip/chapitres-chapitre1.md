# Chapitre 1 — Fondamentaux de la ToIP & Numérisation Vocale

> Fiche extraite du fichier `b3-voip/chapitres/chapitre1.html` (492 lignes, 41.0 Ko, sha256 `2a09b48a49ea`).
> Famille : **cours-b3-voip** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-voip/chapitres/chapitre1.html` |
| Titre du document | Module 1 — Fondamentaux de la ToIP & Numérisation Vocale \| Téléphonie VoIP B3 |
| Description meta | Module 1 du cours Téléphonie VoIP B3 : Histoire et principes de la convergence voix-données, théorème d'échantillonnage de Nyquist-Shannon (8 kHz), quantification logarithmique A-law et µ-law (G.711), codecs audio standards (G.729, G.722, Opus), calcul rigoureux de bande passante avec en-têtes IP/UDP/RTP et modèle E (score R & MOS). Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Fondamentaux de la ToIP & Numérisation Vocale |
| 3 | h2 | — | 1. De la Téléphonie Traditionnelle (RTC/RNIS) à la Téléphonie sur IP (ToIP) |
| 4 | h2 | — | 2. Numérisation Vocale : Échantillonnage de Nyquist & Quantification G.711 |
| 5 | h2 | — | 3. Codecs Vocaux, Calcul de Bande Passante Réseau & Modèle E (Score R & MOS) |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |
| 14 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Fondamentaux de la ToIP & Numérisation Vocale
  - **H2** — 1. De la Téléphonie Traditionnelle (RTC/RNIS) à la Téléphonie sur IP (ToIP)
      - **H4** — Réseau Téléphonique Commuté (RTC / RNIS)
      - **H4** — Téléphonie sur IP (ToIP / VoIP)
  - **H2** — 2. Numérisation Vocale : Échantillonnage de Nyquist & Quantification G.711
      - **H4** — Lois de Quantification Logarithmique ITU-T G.711 (A-law & µ-law)
  - **H2** — 3. Codecs Vocaux, Calcul de Bande Passante Réseau & Modèle E (Score R & MOS)
      - **H4** — Calcul Rigoureux de la Bande Passante Réseau (Overhead En-Têtes)
      - **H4** — Évaluation de la Qualité Vocale : Modèle E & Score MOS (ITU-T G.107)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur de Débit Voix & Bande Passante Réseau
    - **H3** — Exercice 2 — Estimateur de Qualité Vocale & Modèle E (Score R & MOS)
    - **H3** — Exercice 3 — Convertisseur & Échantillonneur PCM / A-law & µ-law
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
| Module 2 — Protocoles de Signalisation & Médias (SIP, SDP, RTP) | `chapitre2.html` | `b3-voip/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 3 400 Hz |  | — | `opt` | — | actif | — |
| 6 800 Hz |  | — | `opt` | — | actif | data-correct=1 |
| 8 000 Hz |  | — | `opt` | — | actif | — |
| 16 000 Hz |  | — | `opt` | — | actif | — |
| 8 kbps |  | — | `opt` | — | actif | — |
| 16 kbps |  | — | `opt` | — | actif | — |
| 64 kbps |  | — | `opt` | — | actif | data-correct=1 |
| 128 kbps |  | — | `opt` | — | actif | — |
| 14 octets |  | — | `opt` | — | actif | — |
| 28 octets |  | — | `opt` | — | actif | — |
| 40 octets |  | — | `opt` | — | actif | data-correct=1 |
| 64 octets |  | — | `opt` | — | actif | — |
| 64.0 kbps |  | — | `opt` | — | actif | — |
| 74.7 kbps |  | — | `opt` | — | actif | — |
| 80.0 kbps |  | — | `opt` | — | actif | data-correct=1 |
| 96.0 kbps |  | — | `opt` | — | actif | — |
| G.711 |  | — | `opt` | — | actif | — |
| G.722 |  | — | `opt` | — | actif | — |
| G.729 |  | — | `opt` | — | actif | data-correct=1 |
| Opus |  | — | `opt` | — | actif | — |
| États-Unis et Canada |  | — | `opt` | — | actif | — |
| Europe et Afrique |  | — | `opt` | — | actif | data-correct=1 |
| Japon uniquement |  | — | `opt` | — | actif | — |
| Australie uniquement |  | — | `opt` | — | actif | — |
| MOS >= 3.10 |  | — | `opt` | — | actif | — |
| MOS >= 3.60 |  | — | `opt` | — | actif | — |
| MOS >= 4.03 |  | — | `opt` | — | actif | data-correct=1 |
| MOS = 5.00 |  | — | `opt` | — | actif | — |
| Car TCP ne supporte pas les adresses IP |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vo3-c1-e1` | analyse | 300 | active | `CODEC=G.711 BITRATE_KBPS=64 PTIME_MS=20 CALLS=10 CODEC=G.729 BITRATE_KBPS=8 PTIME_MS=20 CALLS=25` | Exercice 1 — Calculateur de Débit Voix & Bande Passante Réseau |
| `vo3-c1-e2` | analyse | 300 | active | `CODEC=G.711 DELAY_MS=50 LOSS_PCT=0.0 CODEC=G.711 DELAY_MS=150 LOSS_PCT=2.0 CODEC=G.729 DELAY_MS=220 LOSS_PCT=5.0` | Exercice 2 — Estimateur de Qualité Vocale & Modèle E (Score R & MOS) |
| `vo3-c1-e3` | analyse | 300 | active | `SAMPLE=150 REGION=EUROPE SAMPLE=-1500 REGION=AMERIQUE SAMPLE=25 REGION=EUROPE` | Exercice 3 — Convertisseur & Échantillonneur PCM / A-law & µ-law |

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

- Tableaux : 1 (0 lignes / 6 en-tetes)
- Blocs `pre` : 6 · elements `code` : 61
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-phone`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~4124 mots · 544 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

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
