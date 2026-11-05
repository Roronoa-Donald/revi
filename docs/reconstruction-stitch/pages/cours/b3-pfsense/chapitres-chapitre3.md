# Chapitre 3 — Translation d’Adresses (NAT), Redirections & Routage Multi-WAN

> Fiche extraite du fichier `b3-pfsense/chapitres/chapitre3.html` (541 lignes, 37.0 Ko, sha256 `609e7c905293`).
> Famille : **cours-b3-pfsense** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-pfsense/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Translation d’Adresses (NAT), Redirections &amp; Routage Multi-WAN \| pfSense & Routage B3 |
| Description meta | Chapitre 3 du cours pfSense & Routage B3 : Port Forwarding (DNAT), 1:1 NAT, Outbound NAT hybride, IP virtuelles (VIPs), passerelles et Gateway Groups (Failover & Load Balancing). Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Translation d’Adresses (NAT), Redirections & Routage Multi-WAN |
| 3 | h2 | — | 1. Translation d’Adresses Entrante : Port Forwarding (DNAT) & NAT 1:1 |
| 4 | h2 | — | 2. NAT Sortant (Outbound NAT) : Modes Automatique, Hybride & IP Virtuelles |
| 5 | h2 | — | 3. Architecture Multi-WAN : Groupes de Passerelles, Tiers & PBR |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Translation d’Adresses (NAT), Redirections & Routage Multi-WAN
  - **H2** — 1. Translation d’Adresses Entrante : Port Forwarding (DNAT) & NAT 1:1
      - **H4** — 1. Mécanisme du Port Forwarding
      - **H4** — 2. Le NAT 1:1 (One-to-One)
  - **H2** — 2. NAT Sortant (Outbound NAT) : Modes Automatique, Hybride & IP Virtuelles
      - **H4** — Mode Automatique (Automatic)
      - **H4** — Mode Hybride (Hybrid)
      - **H4** — Mode Manuel Avancé (Manual)
  - **H2** — 3. Architecture Multi-WAN : Groupes de Passerelles, Tiers & PBR
      - **H4** — 1. Notion de Tiers dans les Gateway Groups
      - **H4** — 2. Routage par Politique (Policy-Based Routing - PBR)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Simulateur de redirection de ports (Port Forwarding / DNAT)
    - **H3** — Exercice 2 — Moteur d’Outbound NAT (SNAT) : Masquerade vs Adresses Virtuelles (VIP)
    - **H3** — Exercice 3 — Évaluateur de Gateway Groups Multi-WAN (Load Balancing vs Failover)
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

Liens sortants : **21** (externes : 0).

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
| Réviser avec les flashcards | `cartes.html` | `b3-pfsense/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-pfsense/chapitres/formules.html` | interne |
| Chapitre 4 — Segmentation Réseau : VLANs 802.1Q & DMZ Sécurisée | `chapitre4.html` | `b3-pfsense/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Outbound NAT (SNAT) |  | — | `opt` | — | actif | — |
| Port Forwarding (DNAT) |  | — | `opt` | — | actif | data-correct=1 |
| Carrier-Grade NAT (CGNAT) |  | — | `opt` | — | actif | — |
| NAT Traversal |  | — | `opt` | — | actif | — |
| Pour chiffrer les données avec TLS |  | — | `opt` | — | actif | — |
| Car le NAT réécrit uniquement les en-têtes IP ; le paquet doit obligatoirement être autori |  | — | `opt` | — | actif | data-correct=1 |
| Pour empêcher le serveur DHCP d’écraser l’IP du serveur |  | — | `opt` | — | actif | — |
| Elle n’est jamais requise dans pfSense |  | — | `opt` | — | actif | — |
| Désactivé (Disabled) |  | — | `opt` | — | actif | — |
| Automatique (Automatic Outbound NAT) |  | — | `opt` | — | actif | — |
| Hybride (Hybrid Outbound NAT rule generation) |  | — | `opt` | — | actif | data-correct=1 |
| Proxy ARP obligatoire |  | — | `opt` | — | actif | — |
| IP Alias simple |  | — | `opt` | — | actif | — |
| CARP (Common Address Redundancy Protocol) |  | — | `opt` | — | actif | data-correct=1 |
| Proxy ARP |  | — | `opt` | — | actif | — |
| Other |  | — | `opt` | — | actif | — |
| Affecter WAN1 au Tier 1 et WAN2 au Tier 2 |  | — | `opt` | — | actif | — |
| Affecter les deux passerelles au même niveau de priorité (Tier 1 et Tier 1) |  | — | `opt` | — | actif | data-correct=1 |
| Désactiver la passerelle par défaut du système |  | — | `opt` | — | actif | — |
| Créer un tunnel VPN entre les deux liens |  | — | `opt` | — | actif | — |
| pingd |  | — | `opt` | — | actif | — |
| dpinger |  | — | `opt` | — | actif | data-correct=1 |
| fping |  | — | `opt` | — | actif | — |
| netstat |  | — | `opt` | — | actif | — |
| Une attaque par réflexion DNS sur le port 53 |  | — | `opt` | — | actif | — |
| Un mécanisme permettant à un client interne d’accéder à un serveur local via son adresse I |  | — | `opt` | — | actif | data-correct=1 |
| Une sauvegarde miroir de la configuration pf.conf |  | — | `opt` | — | actif | — |
| Un protocole de routage dynamique semblable à BGP |  | — | `opt` | — | actif | — |
| Pour éviter la saturation de la table ARP |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `pf3-c3-e1` | analyse | 300 | active | `NAT_RULE ext_port=8080 int_ip=192.168.1.50 int_port=80 INCOMING_PKT id=PKT1 ext_dst_ip=203.0.113.1 ext_dst_port=8080 INCOMING_PKT id=PKT2 ext_dst_ip=203.0.113.1 ext_dst_port=22` | Exercice 1 — Simulateur de redirection de ports (Port Forwarding / DNAT) |
| `pf3-c3-e2` | analyse | 300 | active | `OUTBOUND_DEF src_subnet=192.168.1.0/24 nat_ip=WAN_INTERFACE OUT_PKT id=P1 src_ip=192.168.1.15 wan_ip=203.0.113.100 OUT_PKT id=P2 src_ip=10.0.0.5 wan_ip=203.0.113.100` | Exercice 2 — Moteur d’Outbound NAT (SNAT) : Masquerade vs Adresses Virtuelles (VIP) |
| `pf3-c3-e3` | analyse | 300 | active | `GW_STATUS name=WAN_FIBRE tier=1 state=DOWN GW_STATUS name=WAN_4G tier=2 state=ONLINE` | Exercice 3 — Évaluateur de Gateway Groups Multi-WAN (Load Balancing vs Failover) |

- QCM : 1 bloc(s), **8 question(s)**.
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

- Tableaux : 0
- Blocs `pre` : 3 · elements `code` : 29
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3255 mots · 478 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 19 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 7 |
| `box__title` | 7 |
| `card` | 7 |
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
