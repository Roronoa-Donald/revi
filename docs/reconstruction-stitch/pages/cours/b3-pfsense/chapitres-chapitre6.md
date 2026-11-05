# Chapitre 6 — Haute Disponibilité (CARP/pfsync) & Détection d’Intrusion (Snort/Suricata)

> Fiche extraite du fichier `b3-pfsense/chapitres/chapitre6.html` (552 lignes, 39.0 Ko, sha256 `6ce5cd5773c7`).
> Famille : **cours-b3-pfsense** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-pfsense/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Haute Disponibilité (CARP/pfsync) &amp; Détection d’Intrusion (Snort/Suricata) \| pfSense & Routage B3 |
| Description meta | Chapitre 6 du cours pfSense & Routage B3 : Cluster actif/passif CARP (VIP, advbase, advskew), synchronisation d’états pfsync, XMLRPC, détection d’intrusion Snort/Suricata et blocage dynamique snort2c. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Haute Disponibilité (CARP/pfsync) & Détection d’Intrusion (Snort/Suricata) |
| 3 | h2 | — | 1. Architecture de Clustering Actif/Passif : Protocole CARP & Élection du Maître |
| 4 | h2 | — | 2. Synchronisation d’états et de configuration : pfsync & XMLRPC |
| 5 | h2 | — | 3. Détection & Prévention d’Intrusion Réseau : Snort, Suricata & Table snort2c |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Haute Disponibilité (CARP/pfsync) & Détection d’Intrusion (Snort/Suricata)
  - **H2** — 1. Architecture de Clustering Actif/Passif : Protocole CARP & Élection du Maître
      - **H4** — 1. Principes de Fonctionnement de CARP
      - **H4** — 2. Algorithme d’Élection et Formule advskew
  - **H2** — 2. Synchronisation d’états et de configuration : pfsync & XMLRPC
      - **H4** — 1. pfsync : Synchronisation d’États
      - **H4** — 2. XMLRPC Sync : Clonage Automatisé de Configuration
  - **H2** — 3. Détection & Prévention d’Intrusion Réseau : Snort, Suricata & Table snort2c
      - **H4** — 1. Moteurs IDS vs IPS
      - **H4** — 2. La Table pf snort2c & Pass Lists
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Simulateur d'élection de maître CARP (Common Address Redundancy Protocol)
    - **H3** — Exercice 2 — Parseur d'alertes IDS/IPS Snort/Suricata et blocage IP dynamique
    - **H3** — Exercice 3 — Auditeur de synchronisation d'états pfsync et dérive de configuration XMLRPC
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
| nav | `b3-pfsensenav` | Portail → `/`<br>pfSense & Routage B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **22** (externes : 1).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| pfSense & Routage B3 | `../index.html` | `b3-pfsense/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-pfsense/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-pfsense/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-pfsense/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-pfsense/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-pfsense/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-pfsense/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-pfsense/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-pfsense/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-pfsense/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-pfsense/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-pfsense/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-pfsense/chapitres/examens.html` | interne |
| Netgate, synchronisation pfsync | `https://docs.netgate.com/pfsense/en/latest/highavailability/pfsync.html` | `https://docs.netgate.com/pfsense/en/latest/highavailability/pfsync.html` | externe |
| Réviser avec les flashcards | `cartes.html` | `b3-pfsense/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-pfsense/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `b3-pfsense/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| HSRP (Hot Standby Router Protocol) |  | — | `opt` | — | actif | — |
| CARP (Common Address Redundancy Protocol) |  | — | `opt` | — | actif | data-correct=1 |
| VRRP propriétaire |  | — | `opt` | — | actif | — |
| OSPF |  | — | `opt` | — | actif | — |
| Le nœud ayant le plus grand advskew |  | — | `opt` | — | actif | — |
| Le nœud ayant le plus petit advskew (annonce la plus rapide) |  | — | `opt` | — | actif | data-correct=1 |
| Le nœud ayant la plus grande quantité de mémoire vive |  | — | `opt` | — | actif | — |
| Le nœud désigné aléatoirement par le commutateur |  | — | `opt` | — | actif | — |
| pfsync |  | — | `opt` | — | actif | data-correct=1 |
| rsync |  | — | `opt` | — | actif | — |
| syslog |  | — | `opt` | — | actif | — |
| CARP |  | — | `opt` | — | actif | — |
| Par transfert FTP non chiffré |  | — | `opt` | — | actif | — |
| Via des appels chiffrés XMLRPC sur l’interface dédiée |  | — | `opt` | — | actif | data-correct=1 |
| Par copier-coller manuel obligatoire |  | — | `opt` | — | actif | — |
| Via une base de données MySQL partagée |  | — | `opt` | — | actif | — |
| blocked_ips |  | — | `opt` | — | actif | — |
| snort2c |  | — | `opt` | — | actif | data-correct=1 |
| bogons |  | — | `opt` | — | actif | — |
| drop_table |  | — | `opt` | — | actif | — |
| Pour accélérer la connexion Internet |  | — | `opt` | — | actif | — |
| Pour empêcher le blocage accidentel des passerelles et serveurs DNS internes en cas d’usur |  | — | `opt` | — | actif | data-correct=1 |
| Pour contourner les limites de licence Snort |  | — | `opt` | — | actif | — |
| Pour autoriser le téléchargement de vidéos |  | — | `opt` | — | actif | — |
| TCP sur port 443 |  | — | `opt` | — | actif | — |
| Protocole IP 112 sur l’adresse multicast 224.0.0.18 |  | — | `opt` | — | actif | data-correct=1 |
| UDP port 53 |  | — | `opt` | — | actif | — |
| ICMP Echo Request |  | — | `opt` | — | actif | — |
| pfctl -s rules |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `pf3-c6-e1` | analyse | 300 | active | `CARP_NODE name=fw01 vhid=1 advbase=1 advskew=0 alive=YES CARP_NODE name=fw02 vhid=1 advbase=1 advskew=100 alive=YES CARP_NODE name=fw01_dmz vhid=2 advbase=1 advskew=0 alive=NO CARP_NODE name=fw02_dmz vhid=2 advbase=1 advskew=100 alive=YES` | Exercice 1 — Simulateur d'élection de maître CARP (Common Address Redundancy Protocol) |
| `pf3-c6-e2` | analyse | 300 | active | `WHITELIST ips=192.168.1.1,192.168.1.254 SNORT_ALERT sid=2001001 priority=1 src_ip=203.0.113.88 dst_ip=192.168.1.50 msg=ET_EXPLOIT_Buffer_Overflow SNORT_ALERT sid=2002002 priority=1 src_ip=192.168.1.1 dst_ip=192.168.1.50 msg=ET_DNS_High_Volume SNORT_ALERT sid=2003003 priority=2 src_ip=198.51.100.12 dst_ip=192.168.1.50 msg=ET_SCAN_Nmap_SYN SNORT_ALERT sid=2004004 priority=3 src_ip=198.51.100.15 dst_ip=192.168.1.50 msg=ET_INFO_ICMP_Ping` | Exercice 2 — Parseur d'alertes IDS/IPS Snort/Suricata et blocage IP dynamique |
| `pf3-c6-e3` | analyse | 300 | active | `STATE_PRI id=S1 proto=tcp endpoints=10.0.0.5:443->1.1.1.1:443 state=ESTABLISHED STATE_PRI id=S2 proto=tcp endpoints=10.0.0.6:80->2.2.2.2:80 state=ESTABLISHED STATE_PRI id=S3 proto=tcp endpoints=10.0.0.7:22->3.3.3.3:22 state=FIN_WAIT STATE_SEC id=S1 proto=tcp endpoints=10.0.0.5:443->1.1.1.1:443 state=ESTABLISHED STATE_SEC id=S3 proto=tcp endpoints=10.0.0.7:22->3.3.3.3:22 state=ESTABLISHED CONFIG_SECTION name=filter pri_hash=a1b2 sec_hash=a1b2 CONFIG_SECTION name=nat pri_hash=c3d4 sec_hash=e5f6` | Exercice 3 — Auditeur de synchronisation d'états pfsync et dérive de configuration XMLRPC |

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
- Blocs `pre` : 4 · elements `code` : 51
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3251 mots · 501 noeuds HTML

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
| `grid` | 3 |
| `grid-2` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |

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
