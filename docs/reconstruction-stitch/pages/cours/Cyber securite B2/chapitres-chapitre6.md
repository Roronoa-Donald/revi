# Chapitre 6 — Détection d’Intrusions (NIDS/SIEM), Analyse de Traces & Réponse aux Incidents

> Fiche extraite du fichier `Cyber securite B2/chapitres/chapitre6.html` (515 lignes, 39.3 Ko, sha256 `5a3f0f43750d`).
> Famille : **cours-Cyber securite B2** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/Cyber securite B2/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Détection d’Intrusions (NIDS/SIEM), Analyse de Traces &amp; Réponse aux Incidents \| Cybersécurité B2 |
| Description meta | Chapitre 6 du cours Cybersécurité B2 : Systèmes de détection d’intrusions NIDS/HIDS (moteur de signatures Snort/Suricata), centralisation et corrélation de journaux SIEM, typologie des dénis de service (SYN Flood, amplification UDP), ransomwares et méthodologie de réponse à incident NIST SP 800-61. Notions fondamentales, ateliers Python interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Détection d’Intrusions (NIDS/SIEM), Analyse de Traces & Réponse aux Incidents |
| 3 | h2 | — | 1. Systèmes de détection d’intrusions (IDS) & Moteur de règles Snort |
| 4 | h2 | — | 2. Centralisation des journaux, SIEM & Détection d’attaques DDoS |
| 5 | h2 | — | 3. Ransomwares, Chaîne d’Infection & Gestion des Incidents (NIST SP 800-61) |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 5 question(s) |
| 14 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Détection d’Intrusions (NIDS/SIEM), Analyse de Traces & Réponse aux Incidents
  - **H2** — 1. Systèmes de détection d’intrusions (IDS) & Moteur de règles Snort
      - **H4** — NIDS vs HIDS
      - **H4** — Approches de détection
      - **H4** — Syntaxe d’une règle Snort
  - **H2** — 2. Centralisation des journaux, SIEM & Détection d’attaques DDoS
      - **H4** — Architecture d’un SIEM (Security Information and Event Management)
      - **H4** — Attaques par déni de service distribué (DDoS)
  - **H2** — 3. Ransomwares, Chaîne d’Infection & Gestion des Incidents (NIST SP 800-61)
      - **H4** — Réponse à incident : NIST SP 800-61 révision 3 (2025)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Moteur de détection de signature NIDS (Format Snort simplifié)
    - **H3** — Exercice 2 — Détection d’attaque par force brute dans les journaux d’événements
    - **H3** — Exercice 3 — Analyseur de compromission et corrélation d’IoC (Hashes malveillants)
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
| nav | `Cyber securite B2nav` | Portail → `/`<br>Cybersécurité B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

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
| Réviser avec les flashcards | `cartes.html` | `Cyber securite B2/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `Cyber securite B2/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `Cyber securite B2/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| sid (Snort ID) |  | — | `opt` | — | actif | data-correct=1 |
| rev (Revision ID) |  | — | `opt` | — | actif | — |
| gid (Generator ID) |  | — | `opt` | — | actif | — |
| classtype |  | — | `opt` | — | actif | — |
| Le NIDS analyse les flux en copie sans bloquer le trafic, alors que le NIPS est placé en c |  | — | `opt` | — | actif | data-correct=1 |
| Le NIDS déchiffre automatiquement le trafic HTTPS, contrairement au NIPS |  | — | `opt` | — | actif | — |
| Le NIDS ne fonctionne que sur le réseau local, alors que le NIPS ne protège que le cloud |  | — | `opt` | — | actif | — |
| Le NIDS remplace un pare-feu matériel, alors que le NIPS ne surveille que les emails |  | — | `opt` | — | actif | — |
| En encodant les informations de connexion dans le numéro de séquence initial TCP (ISN) san |  | — | `opt` | — | actif | data-correct=1 |
| En bloquant automatiquement toutes les adresses IP d’origine asiatique ou américaine |  | — | `opt` | — | actif | — |
| En forçant le client à utiliser un cookie HTTP avant d’autoriser la négociation TCP |  | — | `opt` | — | actif | — |
| En augmentant la taille de la mémoire vive allouée au pare-feu d’entreprise |  | — | `opt` | — | actif | — |
| Limiter la propagation de l’attaque à d’autres machines du système d’information sans alté |  | — | `opt` | — | actif | data-correct=1 |
| Réinstaller immédiatement le système d’exploitation de la machine infectée à neuf |  | — | `opt` | — | actif | — |
| Rédiger le rapport de leçons apprises pour la direction générale |  | — | `opt` | — | actif | — |
| Contacter les attaquants pour négocier le montant de la rançon |  | — | `opt` | — | actif | — |
| L’attaquant usurpe l’adresse IP de la victime dans des requêtes UDP vers des serveurs récu |  | — | `opt` | — | actif | data-correct=1 |
| L’attaquant prend le contrôle physique du routeur frontière de la victime |  | — | `opt` | — | actif | — |
| Le trafic est entièrement encapsulé dans un tunnel SSH sécurisé |  | — | `opt` | — | actif | — |
| L’attaque s’arrête automatiquement dès que la victime redémarre son serveur DNS |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `cs2-c6-e1` | analyse | 300 | active | `alert tcp any any -> 192.168.1.10 80 (msg:"Tentative acces admin"; content:"/admin.php"; sid:10001;) tcp 10.0.0.5 45892 192.168.1.10 80 GET /admin.php HTTP/1.1` | Exercice 1 — Moteur de détection de signature NIDS (Format Snort simplifié) |
| `cs2-c6-e2` | analyse | 300 | active | `100 192.168.1.50 FAIL\|110 192.168.1.50 FAIL\|120 192.168.1.50 FAIL\|130 192.168.1.50 FAIL\|140 192.168.1.50 FAIL` | Exercice 2 — Détection d’attaque par force brute dans les journaux d’événements |
| `cs2-c6-e3` | analyse | 300 | active | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855:Trojan.Downloader,ed01ebfbc9eb5bbea545af4d01bf5f1071661840480439c6e5babe8e080e41aa:Ransomware.WannaCry /usr/bin/bash:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855,/tmp/updater.exe:ed01ebfbc9eb5bbea545af4d01bf5f1071661840480439c6e5babe8e080e41aa` | Exercice 3 — Analyseur de compromission et corrélation d’IoC (Hashes malveillants) |

- QCM : 1 bloc(s), **5 question(s)**.
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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 3 · elements `code` : 31
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3515 mots · 439 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 76. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 20 |
| `ic` | 19 |
| `Cyber` | 8 |
| `securite` | 8 |
| `box` | 7 |
| `box__title` | 7 |
| `card` | 5 |
| `card-title` | 5 |
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
