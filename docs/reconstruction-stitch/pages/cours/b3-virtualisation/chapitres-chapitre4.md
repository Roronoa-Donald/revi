# Chapitre 4 — Réseau Virtuel, Commutation Standard & Distribuée (vSwitch & VDS)

> Fiche extraite du fichier `b3-virtualisation/chapitres/chapitre4.html` (540 lignes, 41.1 Ko, sha256 `abd516183103`).
> Famille : **cours-b3-virtualisation** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-virtualisation/chapitres/chapitre4.html` |
| Titre du document | Module 4 — Réseau Virtuel, Commutation Standard & Distribuée (vSwitch & VDS) \| Virtualisation Avancée B3 |
| Description meta | Module 4 du cours Virtualisation Avancée B3 : Commutateurs virtuels standards (VSS) vs commutateurs distribués (VDS), typologie des interfaces VMkernel et Port Groups, modes de tagging VLAN 802.1Q (VST, EST, VGT), durcissement de sécurité (Promiscuous, MAC Changes, Forged Transmits) et régulation de débit Traffic Shaping. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Réseau Virtuel, Commutation Standard & Distribuée (vSwitch & VDS) |
| 3 | h2 | — | 1. Commutateurs Virtuels : vSwitch Standard (VSS) vs Distributed Switch (VDS) |
| 4 | h2 | — | 2. Typologie des Interfaces VMkernel & Port Groups de Machines Virtuelles |
| 5 | h2 | — | 3. Tagging & Isolation VLAN 802.1Q : VST, EST & VGT |
| 6 | h2 | — | 4. Sécurité des Port Groups & Régulation de Trafic (Traffic Shaping) |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Réseau Virtuel, Commutation Standard & Distribuée (vSwitch & VDS)
  - **H2** — 1. Commutateurs Virtuels : vSwitch Standard (VSS) vs Distributed Switch (VDS)
      - **H4** — vSwitch Standard (VSS)
      - **H4** — vSphere Distributed Switch (VDS)
  - **H2** — 2. Typologie des Interfaces VMkernel & Port Groups de Machines Virtuelles
  - **H2** — 3. Tagging & Isolation VLAN 802.1Q : VST, EST & VGT
      - **H4** — VST (Virtual Switch Tagging)
      - **H4** — EST (External Switch Tagging)
      - **H4** — VGT (Virtual Guest Tagging)
  - **H2** — 4. Sécurité des Port Groups & Régulation de Trafic (Traffic Shaping)
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Validateur de Configuration vSwitch & Modes de Balisage VLAN (VST, EST, VGT)
    - **H3** — Exercice 2 — Simulateur de Politiques de Sécurité vSwitch (Promiscuous, MAC Changes, Forged Transmits)
    - **H3** — Exercice 3 — Calculateur de Régulation de Trafic Réseau (Traffic Shaping : Average, Peak, Burst Size)
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-virtualisationnav` | Portail → `/`<br>Virtualisation Avancée B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examen-blanc.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Virtualisation Avancée B3 | `../index.html` | `b3-virtualisation/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-virtualisation/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-virtualisation/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-virtualisation/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-virtualisation/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-virtualisation/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-virtualisation/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-virtualisation/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-virtualisation/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-virtualisation/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-virtualisation/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-virtualisation/atelier.html` | interne |
| Examen | `../chapitres/examen-blanc.html` | `b3-virtualisation/chapitres/examen-blanc.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-virtualisation/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-virtualisation/chapitres/formules.html` | interne |
| Module 5 — Haute Disponibilité, Clustering & Mobilité (HA, DRS & vMotion) | `chapitre5.html` | `b3-virtualisation/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| La configuration réseau est centralisée dans vCenter et conserve l'état des ports virtuels |  | — | `opt` | — | actif | data-correct=1 |
| Le VDS supprime complètement le besoin d'avoir des câbles réseau physiques et des cartes E |  | — | `opt` | — | actif | — |
| Le VDS permet de transformer automatiquement les adresses IPv4 en adresses IPv6 sans route |  | — | `opt` | — | actif | — |
| Le VDS ne fonctionne qu'avec des disques durs mécaniques de type SAS. |  | — | `opt` | — | actif | — |
| Le commutateur virtuel (vSwitch) au niveau du Port Group. |  | — | `opt` | — | actif | data-correct=1 |
| Le système d'exploitation invité de chaque machine virtuelle. |  | — | `opt` | — | actif | — |
| La carte graphique virtuelle émulée par l'hyperviseur. |  | — | `opt` | — | actif | — |
| Le serveur DNS de l'Active Directory d'entreprise. |  | — | `opt` | — | actif | — |
| VLAN ID 4095. |  | — | `opt` | — | actif | data-correct=1 |
| VLAN ID 0. |  | — | `opt` | — | actif | — |
| VLAN ID 1. |  | — | `opt` | — | actif | — |
| VLAN ID 1024. |  | — | `opt` | — | actif | — |
| Forged Transmits (Transmissions forgées positionnées sur Reject). |  | — | `opt` | — | actif | data-correct=1 |
| Promiscuous Mode positionné sur Accept. |  | — | `opt` | — | actif | — |
| MAC Address Changes positionné sur Accept. |  | — | `opt` | — | actif | — |
| Network I/O Control positionné sur Disabled. |  | — | `opt` | — | actif | — |
| L'interface de management (généralement vmk0). |  | — | `opt` | — | actif | data-correct=1 |
| L'interface de vMotion (vmk1). |  | — | `opt` | — | actif | — |
| Le contrôleur SCSI paravirtualisé PVSCSI. |  | — | `opt` | — | actif | — |
| L'interface de boucle locale 127.0.0.1. |  | — | `opt` | — | actif | — |
| Average Bandwidth (débit moyen), Peak Bandwidth (débit crête) et Burst Size (taille de raf |  | — | `opt` | — | actif | data-correct=1 |
| Adresse IP, masque de sous-réseau et passerelle par défaut. |  | — | `opt` | — | actif | — |
| Latence minimale, gigue maximale et pourcentage de paquets perdus. |  | — | `opt` | — | actif | — |
| Taille du cache L2, fréquence CPU et nombre de sockets virtuels. |  | — | `opt` | — | actif | — |
| Parce que le transfert de mémoire vive n'est pas chiffré par défaut et consomme une très l |  | — | `opt` | — | actif | data-correct=1 |
| Parce que vMotion utilise le protocole FTP qui est interdit sur les réseaux locaux. |  | — | `opt` | — | actif | — |
| Parce que vMotion déconnecte physiquement les cartes réseaux physiques de l'hôte. |  | — | `opt` | — | actif | — |
| Parce que les trames vMotion détruisent les tables de routage OSPF du réseau. |  | — | `opt` | — | actif | — |
| Route based on originating virtual port ID. |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vrt3-c4-e1` | analyse | 300 | active | `PG=VM-Network VLAN=10 UPLINKS=vmnic0,vmnic1 MTU=1500 PG=Management VLAN=0 UPLINKS=vmnic0 MTU=1500 PG=vMotion-IP VLAN=4095 UPLINKS=vmnic2,vmnic3 MTU=9000` | Exercice 1 — Validateur de Configuration vSwitch & Modes de Balisage VLAN (VST, EST, VGT) |
| `vrt3-c4-e2` | analyse | 300 | active | `PG=Secured-LAN PROMISC=REJECT MAC_CHANGE=REJECT FORGED_TX=REJECT ACTIONS=SNIFF,SEND_SPOOFED_MAC PG=Lab-Monitor PROMISC=ACCEPT MAC_CHANGE=ACCEPT FORGED_TX=REJECT ACTIONS=SNIFF,RECV_NEW_MAC,SEND_SPOOFED_MAC` | Exercice 2 — Simulateur de Politiques de Sécurité vSwitch (Promiscuous, MAC Changes, Forged Transmits) |
| `vrt3-c4-e3` | analyse | 300 | active | `PROFILE=Web-Policy AVG_KBPS=10000 PEAK_KBPS=40000 BURST_KB=5000 TRANSFER_MB=10 PROFILE=DB-Replication AVG_KBPS=50000 PEAK_KBPS=100000 BURST_KB=10000 TRANSFER_MB=50` | Exercice 3 — Calculateur de Régulation de Trafic Réseau (Traffic Shaping : Average, Peak, Burst Size) |

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

- Tableaux : 2 (0 lignes / 3 en-tetes ; 0 lignes / 4 en-tetes)
- Blocs `pre` : 3 · elements `code` : 48
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-vm`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3649 mots · 577 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

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
