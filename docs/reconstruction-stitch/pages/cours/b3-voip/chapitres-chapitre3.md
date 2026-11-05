# Chapitre 3 — Architecture & Déploiement d'un IPBX Asterisk

> Fiche extraite du fichier `b3-voip/chapitres/chapitre3.html` (509 lignes, 40.6 Ko, sha256 `fa21d84b0564`).
> Famille : **cours-b3-voip** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-voip/chapitres/chapitre3.html` |
| Titre du document | Module 3 — Architecture & Déploiement d'un IPBX Asterisk \| Téléphonie VoIP B3 |
| Description meta | Module 3 du cours Téléphonie VoIP B3 : Histoire et architecture d'Asterisk (PABX/IPBX open source), modules de canaux chan_sip et chan_pjsip, installation et structure de /etc/asterisk, déclaration des comptes utilisateurs dans sip.conf et users.conf, gestion des boîtes vocales dans voicemail.conf, installation des packs sonores français et paramétrage des softphones clients. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Architecture & Déploiement d'un IPBX Asterisk |
| 3 | h2 | — | 1. Architecture Interne & Installation du Serveur Asterisk |
| 4 | h2 | — | 2. Configuration des Postes & Comptes SIP (sip.conf & users.conf) |
| 5 | h2 | — | 3. Messagerie Vocale (voicemail.conf) & Configuration des Softphones Clients |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Architecture & Déploiement d'un IPBX Asterisk
  - **H2** — 1. Architecture Interne & Installation du Serveur Asterisk
      - **H4** — Modules de Canaux (Channel Drivers)
      - **H4** — Noyau & Sous-Systèmes Clés
      - **H4** — Installation & Structure des Fichiers de Configuration
  - **H2** — 2. Configuration des Postes & Comptes SIP (sip.conf & users.conf)
      - **H4** — Exemple de Déclaration d'un Compte Utilisateur SIP Standard
  - **H2** — 3. Messagerie Vocale (voicemail.conf) & Configuration des Softphones Clients
      - **H4** — Déclaration des Boîtes Vocales dans voicemail.conf
      - **H4** — Fichiers Sonores & Paramétrage des Softphones Clients (3CXPhone, Linphone, Zoiper)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Validateur & Générateur de Profils SIP Asterisk
    - **H3** — Exercice 2 — Gestionnaire de Boîtes Vocales Asterisk (voicemail.conf)
    - **H3** — Exercice 3 — Analyseur de Télémétrie SIP Registrar & Expiration de Baux
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
| Module 4 — Programmation du Plan d'Appel (Dialplan & SVI/IVR) | `chapitre4.html` | `b3-voip/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| type=peer |  | — | `opt` | — | actif | — |
| type=user |  | — | `opt` | — | actif | — |
| type=friend |  | — | `opt` | — | actif | data-correct=1 |
| type=trunk |  | — | `opt` | — | actif | — |
| asterisk -start |  | — | `opt` | — | actif | — |
| asterisk -rvvv |  | — | `opt` | — | actif | data-correct=1 |
| service asterisk debug |  | — | `opt` | — | actif | — |
| asterisk --console-only |  | — | `opt` | — | actif | — |
| L'adresse IP du poste change toutes les minutes |  | — | `opt` | — | actif | — |
| Le poste utilise DHCP sur le LAN |  | — | `opt` | — | actif | — |
| L'adresse IP du poste n'est pas pré-configurée : Asterisk enregistre l'adresse IP transmis |  | — | `opt` | — | actif | data-correct=1 |
| Le poste est connecté en fibre optique |  | — | `opt` | — | actif | — |
| /var/lib/asterisk/ |  | — | `opt` | — | actif | — |
| /etc/asterisk/ |  | — | `opt` | — | actif | data-correct=1 |
| /usr/share/asterisk/ |  | — | `opt` | — | actif | — |
| /etc/telephony/ |  | — | `opt` | — | actif | — |
| Pour chiffrer les communications en AES-256 |  | — | `opt` | — | actif | — |
| Pour transmettre les touches DTMF dans des trames RTP distinctes afin qu'elles ne soient p |  | — | `opt` | — | actif | data-correct=1 |
| Pour interdire les appels vers les numéros surtaxés |  | — | `opt` | — | actif | — |
| Pour activer la vidéo HD |  | — | `opt` | — | actif | — |
| L'adresse email |  | — | `opt` | — | actif | — |
| Le code PIN secret d'accès |  | — | `opt` | — | actif | data-correct=1 |
| Le numéro de fax |  | — | `opt` | — | actif | — |
| Le type de combiné |  | — | `opt` | — | actif | — |
| sip show peers |  | — | `opt` | — | actif | data-correct=1 |
| sip show users |  | — | `opt` | — | actif | — |
| asterisk list all |  | — | `opt` | — | actif | — |
| show channels |  | — | `opt` | — | actif | — |
| chan_h323 |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vo3-c3-e1` | analyse | 300 | active | `NUM=706438029 TYPE=friend HOST=dynamic SECRET=PassSecret8190 CONTEXT=work CODECS=ulaw,alaw NUM=10 TYPE=friend HOST=dynamic SECRET=secret CONTEXT=work CODECS=alaw NUM=785446979 TYPE=friend HOST=dynamic SECRET=123 CONTEXT=work CODECS=ulaw` | Exercice 1 — Validateur & Générateur de Profils SIP Asterisk |
| `vo3-c3-e2` | analyse | 300 | active | `BOX=706438029 PIN=8190 NAME=Pape Moussa SONKO EMAIL=assoum1024@gmail.com MSG_COUNT=12 BOX=101 PIN=12 EMAIL=test@corp.fr NAME=Alice MSG_COUNT=5 BOX=2001 PIN=4321 NAME=Bob Smith EMAIL=bob.smith MSG_COUNT=45` | Exercice 2 — Gestionnaire de Boîtes Vocales Asterisk (voicemail.conf) |
| `vo3-c3-e3` | analyse | 300 | active | `EXTENSION=701 IP_CONTACT=192.168.1.50:5060 LAST_SEEN_SEC=120 EXPIRES=3600 RTT_MS=15 EXTENSION=702 IP_CONTACT=192.168.1.51:5060 LAST_SEEN_SEC=3700 EXPIRES=3600 RTT_MS=20 EXTENSION=703 IP_CONTACT=192.168.1.52:5060 LAST_SEEN_SEC=200 EXPIRES=1800 RTT_MS=195` | Exercice 3 — Analyseur de Télémétrie SIP Registrar & Expiration de Baux |

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
- Blocs `pre` : 5 · elements `code` : 74
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-phone`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3391 mots · 526 noeuds HTML

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
