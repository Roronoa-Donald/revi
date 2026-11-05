# Chapitre 4 — Programmation du Plan d'Appel (Dialplan & SVI/IVR)

> Fiche extraite du fichier `b3-voip/chapitres/chapitre4.html` (522 lignes, 39.7 Ko, sha256 `e59389fc06c2`).
> Famille : **cours-b3-voip** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-voip/chapitres/chapitre4.html` |
| Titre du document | Module 4 — Programmation du Plan d'Appel (Dialplan & SVI/IVR) \| Téléphonie VoIP B3 |
| Description meta | Module 4 du cours Téléphonie VoIP B3 : Syntaxe et structure d'extensions.conf, contextes, extensions et priorités, applications natives Asterisk (Answer, Playback, Dial, VoiceMail, Hangup), masques de numérotation par expressions régulières (_X, _Z, _N, _7XXXXXXXX), variables de canaux, conception d'arborescences SVI (menus vocaux DTMF) et routage conditionnel. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Programmation du Plan d'Appel (Dialplan & SVI/IVR) |
| 3 | h2 | — | 1. Syntaxe & Structure du Dialplan Asterisk (extensions.conf) |
| 4 | h2 | — | 2. Masques de Numérotation (Pattern Matching) & Variables de Canaux |
| 5 | h2 | — | 3. Conception de Serveurs Vocaux Interactifs (SVI / IVR) & Messagerie |
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

- **H1** — Chapitre 4 — Programmation du Plan d'Appel (Dialplan & SVI/IVR)
  - **H2** — 1. Syntaxe & Structure du Dialplan Asterisk (extensions.conf)
      - **H4** — Syntaxe Fondamentale d'une Instruction de Dialplan
      - **H4** — Catalogue des Applications Clés du Dialplan
  - **H2** — 2. Masques de Numérotation (Pattern Matching) & Variables de Canaux
      - **H4** — Symboles de Correspondance de Motifs Asterisk
      - **H4** — Exemple Concret : Le Dialplan du Support de Cours
  - **H2** — 3. Conception de Serveurs Vocaux Interactifs (SVI / IVR) & Messagerie
      - **H4** — Architecture Type d'un SVI d'Entreprise
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Parseur & Routeur de Dialplan Asterisk (extensions.conf)
    - **H3** — Exercice 2 — Matcher de Masques de Numérotation Asterisk (Pattern Matching)
    - **H3** — Exercice 3 — Simulateur de Serveur Vocal Interactif SVI / IVR
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
| Module 5 — Qualité de Service (QoS), Dimensionnement & Réseau | `chapitre5.html` | `b3-voip/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Playback() |  | — | `opt` | — | actif | — |
| Background() |  | — | `opt` | — | actif | data-correct=1 |
| Echo() |  | — | `opt` | — | actif | — |
| Record() |  | — | `opt` | — | actif | — |
| N'importe quel chiffre de 0 à 9 |  | — | `opt` | — | actif | — |
| N'importe quel chiffre de 1 à 9 |  | — | `opt` | — | actif | — |
| N'importe quel chiffre de 2 à 9 |  | — | `opt` | — | actif | data-correct=1 |
| N'importe quelle lettre de l'alphabet |  | — | `opt` | — | actif | — |
| ${CALLERID(num)} |  | — | `opt` | — | actif | — |
| ${EXTEN} |  | — | `opt` | — | actif | data-correct=1 |
| ${CHANNEL} |  | — | `opt` | — | actif | — |
| ${DIALSTATUS} |  | — | `opt` | — | actif | — |
| Extension s |  | — | `opt` | — | actif | — |
| Extension t |  | — | `opt` | — | actif | data-correct=1 |
| Extension i |  | — | `opt` | — | actif | — |
| Extension h |  | — | `opt` | — | actif | — |
| exten => 101,1,Call(101,15) |  | — | `opt` | — | actif | — |
| exten => 101,1,Dial(SIP/101,15) |  | — | `opt` | — | actif | data-correct=1 |
| exten => 101,1,Ring(SIP/101,15) |  | — | `opt` | — | actif | — |
| exten => 101,1,Connect(SIP/101) |  | — | `opt` | — | actif | — |
| Asterisk génère une erreur de syntaxe fatale |  | — | `opt` | — | actif | — |
| Asterisk considère le motif comme une extension littérale exacte "7XXXXXXXX" et non comme |  | — | `opt` | — | actif | data-correct=1 |
| Asterisk ajoute automatiquement le souligné |  | — | `opt` | — | actif | — |
| L'appel est redirigé vers la messagerie vocale |  | — | `opt` | — | actif | — |
| Extension h |  | — | `opt` | — | actif | data-correct=1 |
| Extension e |  | — | `opt` | — | actif | — |
| Extension b |  | — | `opt` | — | actif | — |
| Extension q |  | — | `opt` | — | actif | — |
| import => interne |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vo3-c4-e1` | analyse | 300 | active | `exten => 600,1,Answer() exten => 600,2,Playback(vm-intro) exten => 600,3,VoiceMailMain(${CALLERID(num)}@work) exten => 600,4,Hangup()` | Exercice 1 — Parseur & Routeur de Dialplan Asterisk (extensions.conf) |
| `vo3-c4-e2` | analyse | 300 | active | `PATTERN=_7XXXXXXXX NUM=706438029 PATTERN=_7XXXXXXXX NUM=806438029 PATTERN=_0[1-5]XXXXXXXX NUM=0140203040 PATTERN=600 NUM=600` | Exercice 2 — Matcher de Masques de Numérotation Asterisk (Pattern Matching) |
| `vo3-c4-e3` | analyse | 300 | active | `SESSION=S001 DTMF_INPUT=1 ATTEMPTS=0 SESSION=S002 DTMF_INPUT=2 ATTEMPTS=0 SESSION=S003 DTMF_INPUT=TIMEOUT ATTEMPTS=1 SESSION=S004 DTMF_INPUT=TIMEOUT ATTEMPTS=2 SESSION=S005 DTMF_INPUT=7 ATTEMPTS=0` | Exercice 3 — Simulateur de Serveur Vocal Interactif SVI / IVR |

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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 6 · elements `code` : 99
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-phone`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3342 mots · 583 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 65. Les plus frequentes :

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
