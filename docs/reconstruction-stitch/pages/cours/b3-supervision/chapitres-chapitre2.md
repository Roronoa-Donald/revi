# Chapitre 2 — Architecture des Systèmes de Supervision & Protocoles de Collecte (SNMP & Syslog)

> Fiche extraite du fichier `b3-supervision/chapitres/chapitre2.html` (534 lignes, 38.4 Ko, sha256 `0a52e33fdde8`).
> Famille : **cours-b3-supervision** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-supervision/chapitres/chapitre2.html` |
| Titre du document | Module 2 — Architecture des Systèmes de Supervision & Protocoles de Collecte (SNMP & Syslog) \| Supervision &amp; Observabilité B3 |
| Description meta | Module 2 du cours Supervision & Observabilité B3 : Modèles centralisés et distribués (proxies), protocoles SNMP v1/v2c/v3 (USM, MIB, OID, Traps/Informs) et normalisation des journaux Syslog RFC 5424. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Architecture des Systèmes de Supervision & Protocoles de Collecte (SNMP & Syslog) |
| 3 | h2 | — | 1. Composants & Topologies d'Architecture de Supervision |
| 4 | h2 | — | 2. Le Protocole SNMP : Arborescence MIB, OIDs & Évolution Sécuritaire (v1, v2c, v3) |
| 5 | h2 | — | 3. Normalisation de la Journalisation : Syslog RFC 5424 |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 9 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 2 — Architecture des Systèmes de Supervision & Protocoles de Collecte (SNMP & Syslog)
  - **H2** — 1. Composants & Topologies d'Architecture de Supervision
      - **H4** — 1. Moteur & Collecteurs
      - **H4** — 2. Sondes & Agents
      - **H4** — 3. Stockage, IHM & Alerte
      - **H4** — Modèles de Déploiement : Centralisé vs Distribué
  - **H2** — 2. Le Protocole SNMP : Arborescence MIB, OIDs & Évolution Sécuritaire (v1, v2c, v3)
      - **H4** — Arborescence MIB-2 & Identifiants OID
      - **H4** — Évolution Sécuritaire : De SNMPv2c à SNMPv3 USM
  - **H2** — 3. Normalisation de la Journalisation : Syslog RFC 5424
      - **H4** — Décodage de la Priorité PRI
      - **H4** — Transport & Sécurisation Syslog
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Décodeur d’OID SNMP et Résolution Symbolique MIB-2
    - **H3** — Exercice 2 — Parseur de Trames Syslog RFC 5424 et Décodeur PRI
    - **H3** — Exercice 3 — Validateur de Sécurité SNMPv3 USM
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
| nav | `b3-supervisionnav` | Portail → `/`<br>Supervision &amp; Observabilité B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **25** (externes : 4).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Supervision &amp; Observabilité B3 | `../index.html` | `b3-supervision/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-supervision/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-supervision/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-supervision/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-supervision/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-supervision/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-supervision/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-supervision/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-supervision/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-supervision/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-supervision/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-supervision/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-supervision/chapitres/examens.html` | interne |
| Supervision & Observabilité B3 | `../index.html` | `b3-supervision/index.html` | interne |
| RFC 3418 | `https://www.rfc-editor.org/rfc/rfc3418` | `https://www.rfc-editor.org/rfc/rfc3418` | externe |
| RFC 2578 | `https://www.rfc-editor.org/rfc/rfc2578` | `https://www.rfc-editor.org/rfc/rfc2578` | externe |
| RFC 5425 | `https://www.rfc-editor.org/rfc/rfc5425` | `https://www.rfc-editor.org/rfc/rfc5425` | externe |
| RFC 9662 | `https://www.rfc-editor.org/rfc/rfc9662` | `https://www.rfc-editor.org/rfc/rfc9662` | externe |
| Réviser avec les flashcards | `cartes.html` | `b3-supervision/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-supervision/chapitres/formules.html` | interne |
| Module 3 — Supervision des Systèmes & Réseaux avec Zabbix & Nagios Core | `chapitre3.html` | `b3-supervision/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Port 161 en UDP |  | — | `opt` | — | actif | data-correct=1 |
| Port 162 en TCP |  | — | `opt` | — | actif | — |
| Port 514 en UDP |  | — | `opt` | — | actif | — |
| Port 10050 en TCP |  | — | `opt` | — | actif | — |
| noAuthNoPriv |  | — | `opt` | — | actif | — |
| authNoPriv |  | — | `opt` | — | actif | — |
| authPriv |  | — | `opt` | — | actif | data-correct=1 |
| CommunityStringV2 |  | — | `opt` | — | actif | — |
| Au nom de machine sysName |  | — | `opt` | — | actif | — |
| À la description matérielle sysDescr |  | — | `opt` | — | actif | — |
| Au temps de fonctionnement sysUpTime |  | — | `opt` | — | actif | data-correct=1 |
| À l'adresse IP de la passerelle |  | — | `opt` | — | actif | — |
| Facility 3 (daemon), Severity 6 (Informational) |  | — | `opt` | — | actif | data-correct=1 |
| Facility 3 (daemon), Severity 0 (Emergency) |  | — | `opt` | — | actif | — |
| Facility 4 (auth), Severity 2 (Critical) |  | — | `opt` | — | actif | — |
| Facility 30 (local), Severity 0 (Emergency) |  | — | `opt` | — | actif | — |
| Pour remplacer définitivement le serveur de supervision central |  | — | `opt` | — | actif | — |
| Pour exécuter les scrutations locales sans saturer le lien WAN et tamponner les données en |  | — | `opt` | — | actif | data-correct=1 |
| Pour supprimer l'obligation d'utiliser des adresses IP |  | — | `opt` | — | actif | — |
| Pour bloquer les alertes par email |  | — | `opt` | — | actif | — |
| Le Trap utilise TCP alors que l'Inform utilise ICMP |  | — | `opt` | — | actif | — |
| L'Inform exige un accusé de réception applicatif de la part du serveur, contrairement au T |  | — | `opt` | — | actif | data-correct=1 |
| Le Trap chiffre les données alors que l'Inform est en clair |  | — | `opt` | — | actif | — |
| L'Inform ne fonctionne que sous Linux |  | — | `opt` | — | actif | — |
| Emergency (système inutilisable) |  | — | `opt` | — | actif | data-correct=1 |
| Debug (débogage détaillé) |  | — | `opt` | — | actif | — |
| Warning (avertissement) |  | — | `opt` | — | actif | — |
| Informational (information courante) |  | — | `opt` | — | actif | — |
| TLS correctement configuré protège la confidentialité en transit ; TCP seul ne chiffre pas |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 7 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sup3-c2-e1` | analyse | 300 | active | `SNMP_DECODE OID=1.3.6.1.2.1.2.2.1.10.2 VALUE=45892100` | Exercice 1 — Décodeur d’OID SNMP et Résolution Symbolique MIB-2 |
| `sup3-c2-e2` | analyse | 300 | active | `SYSLOG_PARSE <134>1 2026-10-11T02:00:00Z srv-web01 nginx 1234 ID47 - Service restarted successfully` | Exercice 2 — Parseur de Trames Syslog RFC 5424 et Décodeur PRI |
| `sup3-c2-e3` | analyse | 300 | active | `SNMPV3_AUTH LEVEL=authPriv USER=secmon AUTH_PROTO=SHA PRIV_PROTO=AES AUTH_PASS=SecretAuth123 PRIV_PASS=SecretPriv456` | Exercice 3 — Validateur de Sécurité SNMPv3 USM |

- QCM : 1 bloc(s), **9 question(s)**.
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
- Blocs `pre` : 4 · elements `code` : 65
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-chart`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3265 mots · 514 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 36 |
| `ic` | 18 |
| `q` | 9 |
| `q__stem` | 9 |
| `opts` | 9 |
| `q__exp` | 9 |
| `card` | 7 |
| `box` | 6 |
| `box__title` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |
| `badge` | 3 |

Attributs `data-*` : `data-correct` (9), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
