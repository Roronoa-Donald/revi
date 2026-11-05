# Chapitre 6 — VLANs, Trunking 802.1Q & Routage Inter-VLAN (ROAS)

> Fiche extraite du fichier `ccna/chapitres/chapitre6.html` (564 lignes, 39.2 Ko, sha256 `2b5069824c2f`).
> Famille : **cours-ccna** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/ccna/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — VLANs, Trunking 802.1Q &amp; Routage Inter-VLAN (ROAS) \| CCNA Réseau B2 |
| Description meta | Chapitre 6 du cours CCNA Réseau B2 : Segmentation logique par VLANs (1 à 4094), ports d’accès (Access) vs liens d’agrégation (Trunk), balise Ethernet IEEE 802.1Q (TPID, PCP, VID), VLAN natif, routage inter-VLAN avec Router-on-a-Stick (sous-interfaces dot1Q), et diagnostic d’anomalies de Trunk. Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — VLANs, Trunking 802.1Q & Routage Inter-VLAN (ROAS) |
| 3 | h2 | — | 1. Segmentation Logique par VLANs (Virtual LANs) |
| 4 | h2 | — | 2. Ports Access vs Liens Trunk & Balise IEEE 802.1Q |
| 5 | h2 | — | 3. Configuration d’un Trunk 802.1Q sous Cisco IOS |
| 6 | h2 | — | 4. Routage Inter-VLAN : La Méthode Router-on-a-Stick (ROAS) |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — VLANs, Trunking 802.1Q & Routage Inter-VLAN (ROAS)
  - **H2** — 1. Segmentation Logique par VLANs (Virtual LANs)
      - **H4** — Avantages Clés des VLANs
      - **H4** — Plages de Numéros de VLANs
  - **H2** — 2. Ports Access vs Liens Trunk & Balise IEEE 802.1Q
  - **H2** — 3. Configuration d’un Trunk 802.1Q sous Cisco IOS
  - **H2** — 4. Routage Inter-VLAN : La Méthode Router-on-a-Stick (ROAS)
      - **H4** — Configuration Switch (L2)
      - **H4** — Configuration Routeur (L3 ROAS)
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Décodeur de balise Ethernet IEEE 802.1Q (VLAN Tagging)
    - **H3** — Exercice 2 — Simulateur de Router-on-a-Stick (ROAS) et sous-interfaces
    - **H3** — Exercice 3 — Validateur et détecteur d'anomalies de Trunk 802.1Q
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
| nav | `ccnanav` | Portail → `/`<br>CCNA Réseau B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| CCNA Réseau B2 | `../index.html` | `ccna/index.html` | interne |
| Sommaire | `../sommaire.html` | `ccna/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `ccna/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `ccna/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `ccna/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `ccna/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `ccna/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `ccna/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `ccna/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `ccna/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `ccna/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `ccna/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `ccna/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `ccna/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `ccna/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `ccna/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 8 bits permettant 256 VLANs |  | — | `opt` | — | actif | — |
| 12 bits permettant 4096 VLANs (de 0 à 4095) |  | — | `opt` | — | actif | data-correct=1 |
| 16 bits permettant 65536 VLANs |  | — | `opt` | — | actif | — |
| 10 bits permettant 1024 VLANs |  | — | `opt` | — | actif | — |
| Ses trames sont chiffrées en AES-256 |  | — | `opt` | — | actif | — |
| Ses trames circulent sur le trunk sans aucune balise 802.1Q (untagged) |  | — | `opt` | — | actif | data-correct=1 |
| Il ne peut transporter que du trafic de gestion SSH |  | — | `opt` | — | actif | — |
| Il est automatiquement désactivé si plus de 10 VLANs sont présents |  | — | `opt` | — | actif | — |
| no switchport |  | — | `opt` | — | actif | — |
| encapsulation dot1Q <vlan_id> |  | — | `opt` | — | actif | data-correct=1 |
| ip routing |  | — | `opt` | — | actif | — |
| switchport mode trunk |  | — | `opt` | — | actif | — |
| show ip route |  | — | `opt` | — | actif | — |
| show vlan brief |  | — | `opt` | — | actif | data-correct=1 |
| show mac address-table |  | — | `opt` | — | actif | — |
| show interfaces trunk |  | — | `opt` | — | actif | — |
| Le lien trunk s’éteint électriquement |  | — | `opt` | — | actif | — |
| Un Native VLAN Mismatch survient : le trafic du VLAN 1 fuite dans le VLAN 99 et des alerte |  | — | `opt` | — | actif | data-correct=1 |
| Les commutateurs négocient automatiquement le plus petit numéro sans conséquence |  | — | `opt` | — | actif | — |
| Toutes les trames 802.1Q sont converties en trames IPv6 |  | — | `opt` | — | actif | — |
| VTP (VLAN Trunking Protocol) |  | — | `opt` | — | actif | — |
| DTP (Dynamic Trunking Protocol) |  | — | `opt` | — | actif | data-correct=1 |
| CDP (Cisco Discovery Protocol) |  | — | `opt` | — | actif | — |
| STP (Spanning Tree Protocol) |  | — | `opt` | — | actif | — |
| 2 octets |  | — | `opt` | — | actif | — |
| 4 octets (32 bits) |  | — | `opt` | — | actif | data-correct=1 |
| 8 octets |  | — | `opt` | — | actif | — |
| 14 octets |  | — | `opt` | — | actif | — |
| Parce que si l’interface physique parent est éteinte, toutes ses sous-interfaces logiques |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `na2-c6-e1` | analyse | 300 | active | `8100a00a` | Exercice 1 — Décodeur de balise Ethernet IEEE 802.1Q (VLAN Tagging) |
| `na2-c6-e2` | analyse | 300 | active | `SUBIF g0/0.10 10 192.168.10.254/24 00:00:0c:07:ac:01 SUBIF g0/0.20 20 192.168.20.254/24 00:00:0c:07:ac:01 PACKET 192.168.10.5 192.168.20.15 10 64 SALUT` | Exercice 2 — Simulateur de Router-on-a-Stick (ROAS) et sous-interfaces |
| `na2-c6-e3` | analyse | 300 | active | `SWITCH_A trunk NATIVE=1 ALLOWED=10,20,30 SWITCH_B trunk NATIVE=1 ALLOWED=10,20,40` | Exercice 3 — Validateur et détecteur d'anomalies de Trunk 802.1Q |

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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 6 · elements `code` : 38
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-globe`, `#i-play`, `#i-target`, `#i-warning`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3664 mots · 493 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

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
| `card-title` | 4 |
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
