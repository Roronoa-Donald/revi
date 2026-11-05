# Chapitre 3 — Protocoles de Redondance de Passerelle FHRP (HSRP, VRRP & GLBP)

> Fiche extraite du fichier `b3-reseau-lan/chapitres/chapitre3.html` (543 lignes, 40.2 Ko, sha256 `254d06c6ec64`).
> Famille : **cours-b3-reseau-lan** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-reseau-lan/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Protocoles de Redondance de Passerelle FHRP (HSRP, VRRP &amp; GLBP) \| Réseau LAN Avancé B3 |
| Description meta | Chapitre 3 du cours Réseau LAN Avancé B3 : Point de défaillance unique (SPOF) de passerelle, HSRP v1/v2 de Cisco, standard ouvert VRRP v2/v3 (RFC 5798), adresses IP et MAC virtuelles, préemption, suivi d’objets (Object Tracking IP SLA) et équilibrage multi-actif GLBP. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Protocoles de Redondance de Passerelle FHRP (HSRP, VRRP & GLBP) |
| 3 | h2 | — | 1. Problématique du Single Point of Failure (SPOF) & Modèle du Routeur Virtuel |
| 4 | h2 | — | 2. Comparatif Rigoureux : HSRP (Cisco) vs VRRP (RFC 5798) |
| 5 | h2 | — | 3. Object Tracking & Équilibrage Actif-Actif GLBP |
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

- **H1** — Chapitre 3 — Protocoles de Redondance de Passerelle FHRP (HSRP, VRRP & GLBP)
  - **H2** — 1. Problématique du Single Point of Failure (SPOF) & Modèle du Routeur Virtuel
      - **H4** — Le Concept de Routeur Virtuel (Virtual Router)
      - **H4** — La Transparence Totale pour les Postes Clients
  - **H2** — 2. Comparatif Rigoureux : HSRP (Cisco) vs VRRP (RFC 5798)
  - **H2** — 3. Object Tracking & Équilibrage Actif-Actif GLBP
      - **H4** — 1. Suivi d'Objets (Object Tracking)
      - **H4** — 2. Gateway Load Balancing Protocol (GLBP)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Simulateur d'élection de routeur maître VRRP v2/v3 (RFC 5798)
    - **H3** — Exercice 2 — Détecteur de basculement FHRP par suivi d'interface (Object Tracking)
    - **H3** — Exercice 3 — Répartiteur de charge GLBP (Gateway Load Balancing Protocol)
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
| nav | `b3-reseau-lannav` | Portail → `/`<br>Réseau LAN Avancé B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Réseau LAN Avancé B3 | `../index.html` | `b3-reseau-lan/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-reseau-lan/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-reseau-lan/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-reseau-lan/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-reseau-lan/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-reseau-lan/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-reseau-lan/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-reseau-lan/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-reseau-lan/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-reseau-lan/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-reseau-lan/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-reseau-lan/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-reseau-lan/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-reseau-lan/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-reseau-lan/chapitres/formules.html` | interne |
| Chapitre 4 — Routage Intra-Domaine OSPFv2 Avancé, Aires Spéciales & Analyse des LSAs | `chapitre4.html` | `b3-reseau-lan/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Attribuer dynamiquement des adresses IP par DHCP |  | — | `opt` | — | actif | — |
| Fournir une passerelle par défaut redondante et hautement disponible pour les postes clien |  | — | `opt` | — | actif | data-correct=1 |
| Chiffrer les trames Ethernet avec WPA3 |  | — | `opt` | — | actif | — |
| Accélérer la vitesse des ventilateurs des commutateurs |  | — | `opt` | — | actif | — |
| IEEE 802.1Q |  | — | `opt` | — | actif | — |
| RFC 5798 |  | — | `opt` | — | actif | data-correct=1 |
| RFC 1918 |  | — | `opt` | — | actif | — |
| IEEE 802.3ad |  | — | `opt` | — | actif | — |
| 00:00:5E:00:01:0A |  | — | `opt` | — | actif | data-correct=1 |
| 00:00:0C:07:AC:0A |  | — | `opt` | — | actif | — |
| FF:FF:FF:00:01:10 |  | — | `opt` | — | actif | — |
| 00:00:5E:00:02:10 |  | — | `opt` | — | actif | — |
| Le routeur 120 reste en veille car la préemption est désactivée par défaut dans VRRP |  | — | `opt` | — | actif | — |
| Le routeur 120 reprend immédiatement le rôle de Master car la préemption est activée par d |  | — | `opt` | — | actif | data-correct=1 |
| Le routeur 120 s’éteint automatiquement |  | — | `opt` | — | actif | — |
| Le réseau est bloqué pendant 10 minutes |  | — | `opt` | — | actif | — |
| Compter le nombre de paquets vidéo en transit |  | — | `opt` | — | actif | — |
| Surveiller l’état d’une interface amont ou d’une sonde IP SLA pour décrémenter la priorité |  | — | `opt` | — | actif | data-correct=1 |
| Synchroniser les mots de passe des utilisateurs |  | — | `opt` | — | actif | — |
| Enregistrer les adresses MAC dans une base SQL |  | — | `opt` | — | actif | — |
| Une trame BPDU RSTP |  | — | `opt` | — | actif | — |
| Une trame Gratuitous ARP (GARP) |  | — | `opt` | — | actif | data-correct=1 |
| Un paquet ICMP Redirect |  | — | `opt` | — | actif | — |
| Une trame LLDP |  | — | `opt` | — | actif | — |
| L’Active Virtual Forwarder (AVF) |  | — | `opt` | — | actif | — |
| L’Active Virtual Gateway (AVG) |  | — | `opt` | — | actif | data-correct=1 |
| Le Root Bridge Spanning Tree |  | — | `opt` | — | actif | — |
| Le serveur DHCP local |  | — | `opt` | — | actif | — |
| UDP port 1985 sur 224.0.0.2 |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lan3-c3-e1` | analyse | 300 | active | `VRRP_ROUTER name=R1 vrid=10 prio=150 ip=192.168.10.2 alive=YES VRRP_ROUTER name=R2 vrid=10 prio=100 ip=192.168.10.3 alive=YES VRRP_ROUTER name=R3 vrid=10 prio=200 ip=192.168.10.4 alive=NO` | Exercice 1 — Simulateur d'élection de routeur maître VRRP v2/v3 (RFC 5798) |
| `lan3-c3-e2` | analyse | 300 | active | `TRACKED_ROUTER name=R1 init_role=ACTIVE base_prio=110 preempt=YES track_if=Gi0/0 decrement=20 if_state=DOWN TRACKED_ROUTER name=R2 init_role=STANDBY base_prio=100 preempt=YES track_if=Gi0/0 decrement=20 if_state=UP` | Exercice 2 — Détecteur de basculement FHRP par suivi d'interface (Object Tracking) |
| `lan3-c3-e3` | analyse | 300 | active | `GLBP_CONFIG group=1 mode=round-robin AVF id=1 name=AVF1 vmac=00:07:b4:00:01:01 weight=100 AVF id=2 name=AVF2 vmac=00:07:b4:00:01:02 weight=100 ARP_REQ client_id=PC1 client_mac=00:11:22:33:44:01 ARP_REQ client_id=PC2 client_mac=00:11:22:33:44:02 ARP_REQ client_id=PC3 client_mac=00:11:22:33:44:03` | Exercice 3 — Répartiteur de charge GLBP (Gateway Load Balancing Protocol) |

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

- Tableaux : 1 (0 lignes / 5 en-tetes)
- Blocs `pre` : 3 · elements `code` : 36
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-network`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3578 mots · 507 noeuds HTML

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
| `card` | 4 |
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
