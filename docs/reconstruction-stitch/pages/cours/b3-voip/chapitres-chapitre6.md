# Chapitre 6 — Fonctions Avancées, Trunks Inter-Sites & Sécurité ToIP

> Fiche extraite du fichier `b3-voip/chapitres/chapitre6.html` (520 lignes, 40.9 Ko, sha256 `a4073e5f7d4b`).
> Famille : **cours-b3-voip** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-voip/chapitres/chapitre6.html` |
| Titre du document | Module 6 — Fonctions Avancées, Trunks Inter-Sites & Sécurité ToIP \| Téléphonie VoIP B3 |
| Description meta | Module 6 du cours Téléphonie VoIP B3 : Gestion des files d'attente ACD (queues.conf, stratégies ringall, leastrecent, roundrobin), interconnexion d'IPBX par trunks SIP et IAX2, routage au moindre coût LCR (Least Cost Routing), chiffrement de la signalisation (SIP TLS) et des flux voix (SRTP), détection des attaques brute-force SIP et bannissement dynamique avec Fail2ban. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Fonctions Avancées, Trunks Inter-Sites & Sécurité ToIP |
| 3 | h2 | — | 1. Centres de Contacts & Files d'Attente ACD (queues.conf) |
| 4 | h2 | — | 2. Interconnexion Multi-Sites : Trunks SIP & IAX2 et Routage LCR |
| 5 | h2 | — | 3. Sécurité & Durcissement ToIP : TLS, SRTP & Défense Active Fail2ban |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Fonctions Avancées, Trunks Inter-Sites & Sécurité ToIP
  - **H2** — 1. Centres de Contacts & Files d'Attente ACD (queues.conf)
      - **H4** — Configuration d'une File d'Attente dans /etc/asterisk/queues.conf
  - **H2** — 2. Interconnexion Multi-Sites : Trunks SIP & IAX2 et Routage LCR
      - **H4** — Trunks SIP Inter-Sites
      - **H4** — Trunks IAX2 (Inter-Asterisk eXchange)
      - **H4** — Routage au Moindre Coût (Least Cost Routing - LCR)
  - **H2** — 3. Sécurité & Durcissement ToIP : TLS, SRTP & Défense Active Fail2ban
      - **H4** — Chiffrement de Bout en Bout : SIP TLS & SRTP
      - **H4** — Défense Active contre les Attaques Brute-Force avec Fail2ban
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Simulateur de File d'Attente ACD Asterisk (Queue Strategies)
    - **H3** — Exercice 2 — Moteur de Routage LCR (Least Cost Routing) Multi-Trunks
    - **H3** — Exercice 3 — Détecteur d'Attaques Brute-Force SIP & Générateur Fail2ban
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
| Atelier de code | `../atelier.html` | `b3-voip/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| ringall |  | — | `opt` | — | actif | — |
| leastrecent |  | — | `opt` | — | actif | data-correct=1 |
| roundrobin |  | — | `opt` | — | actif | — |
| fewestcalls |  | — | `opt` | — | actif | — |
| IAX2 ne supporte que la vidéo |  | — | `opt` | — | actif | — |
| IAX2 transporte à la fois la signalisation et tous les flux voix sur un port UDP unique (4 |  | — | `opt` | — | actif | data-correct=1 |
| IAX2 nécessite une adresse IP publique statique par téléphone |  | — | `opt` | — | actif | — |
| IAX2 est un protocole standard de l'ITU-T |  | — | `opt` | — | actif | — |
| HTTPS |  | — | `opt` | — | actif | — |
| SRTP (Secure RTP) |  | — | `opt` | — | actif | data-correct=1 |
| SSH |  | — | `opt` | — | actif | — |
| IPsec AH |  | — | `opt` | — | actif | — |
| Port 5060/TCP |  | — | `opt` | — | actif | — |
| Port 5061/TCP |  | — | `opt` | — | actif | data-correct=1 |
| Port 443/TCP |  | — | `opt` | — | actif | — |
| Port 8443/TCP |  | — | `opt` | — | actif | — |
| ACD (Automatic Call Distribution) |  | — | `opt` | — | actif | — |
| LCR (Least Cost Routing) |  | — | `opt` | — | actif | data-correct=1 |
| STUN (Session Traversal) |  | — | `opt` | — | actif | — |
| CTI (Computer Telephony Integration) |  | — | `opt` | — | actif | — |
| 100 Trying |  | — | `opt` | — | actif | — |
| 180 Ringing |  | — | `opt` | — | actif | — |
| 200 OK |  | — | `opt` | — | actif | — |
| 401 Unauthorized (ou 403 Forbidden) |  | — | `opt` | — | actif | data-correct=1 |
| À limiter la durée maximale de l'appel à 15 minutes |  | — | `opt` | — | actif | — |
| À accorder un temps de repos de 15 secondes à l'agent après la fin d'un appel avant de lui |  | — | `opt` | — | actif | data-correct=1 |
| À faire sonner le poste pendant 15 secondes |  | — | `opt` | — | actif | — |
| À bloquer la file si plus de 15 personnes attendent |  | — | `opt` | — | actif | — |
| Car les téléphones plantent immédiatement |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vo3-c6-e1` | analyse | 300 | active | `STRATEGY=leastrecent AGENT=101 STATUS=AVAILABLE LAST_CALL_TS=1600000500 AGENT=102 STATUS=IN_CALL LAST_CALL_TS=1600000100 AGENT=103 STATUS=AVAILABLE LAST_CALL_TS=1600000200 AGENT=104 STATUS=PAUSED LAST_CALL_TS=1600000050` | Exercice 1 — Simulateur de File d'Attente ACD Asterisk (Queue Strategies) |
| `vo3-c6-e2` | analyse | 300 | active | `TRUNK=TrunkA PREFIX=0033 RATE_MIN=2.0 CONN_FEE=0.0 TRUNK=TrunkB PREFIX=0033 RATE_MIN=1.2 CONN_FEE=5.0 TRUNK=TrunkC PREFIX=00221 RATE_MIN=18.0 CONN_FEE=0.0 TRUNK=TrunkD PREFIX=00221 RATE_MIN=15.0 CONN_FEE=10.0 --- CALL_ID=C1 DEST=0033140203040 DURATION_SEC=120 CALL_ID=C2 DEST=0033140203040 DURATION_SEC=30 CALL_ID=C3 DEST=00221706438029 DURATION_SEC=180` | Exercice 2 — Moteur de Routage LCR (Least Cost Routing) Multi-Trunks |
| `vo3-c6-e3` | analyse | 300 | active | `MAX_FAILURES=3 TIMESTAMP=100 IP=198.51.100.22 EXTENSION=100 STATUS_CODE=401 TIMESTAMP=102 IP=198.51.100.22 EXTENSION=101 STATUS_CODE=401 TIMESTAMP=103 IP=192.168.1.50 EXTENSION=200 STATUS_CODE=200 TIMESTAMP=104 IP=198.51.100.22 EXTENSION=102 STATUS_CODE=403 TIMESTAMP=105 IP=198.51.100.22 EXTENSION=103 STATUS_CODE=401` | Exercice 3 — Détecteur d'Attaques Brute-Force SIP & Générateur Fail2ban |

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
- Blocs `pre` : 5 · elements `code` : 48
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-phone`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3623 mots · 489 noeuds HTML

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
