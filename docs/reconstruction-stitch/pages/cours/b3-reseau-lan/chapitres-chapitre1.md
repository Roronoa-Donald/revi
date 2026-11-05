# Chapitre 1 — Spanning Tree Protocol Avancé (STP / RSTP / MSTP) & Mécanismes de Protection

> Fiche extraite du fichier `b3-reseau-lan/chapitres/chapitre1.html` (541 lignes, 39.7 Ko, sha256 `8d1953197089`).
> Famille : **cours-b3-reseau-lan** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-reseau-lan/chapitres/chapitre1.html` |
| Titre du document | Chapitre 1 — Spanning Tree Protocol Avancé (STP / RSTP / MSTP) &amp; Mécanismes de Protection \| Réseau LAN Avancé B3 |
| Description meta | Chapitre 1 du cours Réseau LAN Avancé B3 : Boucles de commutation de niveau 2, élection Root Bridge, sélection Root Port et Designated Port, convergence RSTP 802.1w, instances MSTP 802.1s, BPDU Guard, Root Guard et Loop Guard. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Spanning Tree Protocol Avancé (STP / RSTP / MSTP) & Mécanismes de Protection |
| 3 | h2 | — | 1. Topologies Maillées & Vulnérabilités de Niveau 2 (La Nécessité du STP) |
| 4 | h2 | — | 2. Élection du Root Bridge & Détermination des Rôles de Ports |
| 5 | h2 | — | 3. Mécanismes de Sécurisation & Durcissement STP de Niveau 2 |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Spanning Tree Protocol Avancé (STP / RSTP / MSTP) & Mécanismes de Protection
  - **H2** — 1. Topologies Maillées & Vulnérabilités de Niveau 2 (La Nécessité du STP)
      - **H4** — Conséquences d'une Boucle de Commutation Non Maîtrisée
      - **H4** — Le Rôle Fondamental du Spanning Tree Protocol
  - **H2** — 2. Élection du Root Bridge & Détermination des Rôles de Ports
      - **H4** — 1. Élection Unique du Root Bridge (Pont Racine)
      - **H4** — 2. Sélection du Root Port (RP) sur Chaque Commutateur Non-Racine
  - **H2** — 3. Mécanismes de Sécurisation & Durcissement STP de Niveau 2
      - **H4** — BPDU Guard
      - **H4** — Root Guard
      - **H4** — Loop Guard & UDLD
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur de priorité et élection du Root Bridge STP (Bridge ID)
    - **H3** — Exercice 2 — Simulateur de calcul de coût et sélection du Root Port STP
    - **H3** — Exercice 3 — Auditeur de protection Spanning Tree (BPDU Guard, Root Guard & Loop Guard)
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
| Chapitre 2 — Agrégation de Liaisons EtherChannel (LACP & PAgP) & Répartition de Charge | `chapitre2.html` | `b3-reseau-lan/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce que les trames Ethernet sont chiffrées par défaut |  | — | `opt` | — | actif | — |
| Parce que l’en-tête Ethernet ne contient aucun champ de durée de vie (TTL) pour détruire l |  | — | `opt` | — | actif | data-correct=1 |
| Parce que le câble Ethernet s’échauffe physiquement sous l’effet des boucles |  | — | `opt` | — | actif | — |
| Parce que les routeurs n’acceptent pas les adresses MAC impaires |  | — | `opt` | — | actif | — |
| 16 bits continus de priorité sans distinction de VLAN |  | — | `opt` | — | actif | — |
| 4 bits de priorité (multiples de 4096) et 12 bits d’identifiant de système étendu (VLAN ID |  | — | `opt` | — | actif | data-correct=1 |
| 8 bits de priorité et 8 bits d’adresse IP |  | — | `opt` | — | actif | — |
| 1 bit de polarité et 15 bits de numéro de port |  | — | `opt` | — | actif | — |
| L’adresse IP la plus élevée |  | — | `opt` | — | actif | — |
| L’adresse MAC la plus basse numériquement |  | — | `opt` | — | actif | data-correct=1 |
| Le nombre de ports physiques connectés |  | — | `opt` | — | actif | — |
| La vitesse du processeur central |  | — | `opt` | — | actif | — |
| Le Port ID le plus faible |  | — | `opt` | — | actif | — |
| Le coût cumulé du chemin vers la racine (Root Path Cost) le plus bas |  | — | `opt` | — | actif | data-correct=1 |
| Le Bridge ID du commutateur voisin le plus bas |  | — | `opt` | — | actif | — |
| Le débit maximal de la carte mère |  | — | `opt` | — | actif | — |
| Designated Port |  | — | `opt` | — | actif | — |
| Alternate Port |  | — | `opt` | — | actif | data-correct=1 |
| Backup Port |  | — | `opt` | — | actif | — |
| Disabled Port |  | — | `opt` | — | actif | — |
| En désactivant temporairement tous les VLANs du réseau |  | — | `opt` | — | actif | — |
| Grâce au mécanisme de synchronisation active par poignée de main Proposal / Agreement sur |  | — | `opt` | — | actif | data-correct=1 |
| En forçant le redémarrage électrique de tous les commutateurs voisins |  | — | `opt` | — | actif | — |
| En utilisant des paquets ICMP Echo réguliers |  | — | `opt` | — | actif | — |
| Elle ignore simplement la trame BPDU |  | — | `opt` | — | actif | — |
| Elle désactive immédiatement le port et le place en état err-disable |  | — | `opt` | — | actif | data-correct=1 |
| Elle modifie la priorité du commutateur distant |  | — | `opt` | — | actif | — |
| Elle route le paquet vers la passerelle par défaut |  | — | `opt` | — | actif | — |
| Forwarding immédiat |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lan3-c1-e1` | analyse | 300 | active | `BRIDGE name=SW-CORE1 vlan=10 priority=32768 mac=00:11:22:33:44:55 BRIDGE name=SW-CORE2 vlan=10 priority=4096 mac=00:aa:bb:cc:dd:ee BRIDGE name=SW-ACCESS1 vlan=10 priority=32768 mac=00:11:22:11:22:33` | Exercice 1 — Calculateur de priorité et élection du Root Bridge STP (Bridge ID) |
| `lan3-c1-e2` | analyse | 300 | active | `ROOT_PATH port=Gi0/1 path_cost=19 sender_bid_prio=32768 sender_port_id=128.1 ROOT_PATH port=Gi0/2 path_cost=4 sender_bid_prio=32768 sender_port_id=128.2 ROOT_PATH port=Gi0/3 path_cost=19 sender_bid_prio=4096 sender_port_id=128.1` | Exercice 2 — Simulateur de calcul de coût et sélection du Root Port STP |
| `lan3-c1-e3` | analyse | 300 | active | `PORT name=Gi0/1 bpdu_guard=YES root_guard=NO loop_guard=NO PORT name=Gi0/2 bpdu_guard=NO root_guard=YES loop_guard=NO PORT name=Gi0/3 bpdu_guard=NO root_guard=NO loop_guard=YES EVENT port=Gi0/1 type=BPDU_RECEIVED EVENT port=Gi0/2 type=SUPERIOR_BPDU EVENT port=Gi0/3 type=BPDU_TIMEOUT` | Exercice 3 — Auditeur de protection Spanning Tree (BPDU Guard, Root Guard & Loop Guard) |

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
- Blocs `pre` : 3 · elements `code` : 27
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-network`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3584 mots · 486 noeuds HTML

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
