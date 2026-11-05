# Chapitre 6 — Qualité de Service LAN (QoS 802.1p / DSCP) & Protocoles de Découverte (LLDP/CDP)

> Fiche extraite du fichier `b3-reseau-lan/chapitres/chapitre6.html` (565 lignes, 39.3 Ko, sha256 `384db0cdad3f`).
> Famille : **cours-b3-reseau-lan** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-reseau-lan/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Qualité de Service LAN (QoS 802.1p / DSCP) &amp; Protocoles de Découverte (LLDP/CDP) \| Réseau LAN Avancé B3 |
| Description meta | Chapitre 6 du cours Réseau LAN Avancé B3 : Gestion de la congestion, marquage de niveau 2 (802.1p CoS) et niveau 3 (DiffServ DSCP), politiques de confiance (Trust Boundary), ordonnanceurs de files (Strict Priority, WRR, CBWFQ), détection précoce WRED, et protocoles de découverte LLDP (802.1AB) et Cisco CDP. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Qualité de Service LAN (QoS 802.1p / DSCP) & Protocoles de Découverte (LLDP/CDP) |
| 3 | h2 | — | 1. Métriques de Qualité de Service & Modèles d’Architecture |
| 4 | h2 | — | 2. Marquage de Couche 2 (802.1p CoS) & Couche 3 (DiffServ DSCP) |
| 5 | h2 | — | 3. Ordonnancement de Files & Protocoles de Découverte (LLDP / CDP) |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Qualité de Service LAN (QoS 802.1p / DSCP) & Protocoles de Découverte (LLDP/CDP)
  - **H2** — 1. Métriques de Qualité de Service & Modèles d’Architecture
      - **H4** — Les 4 Métriques Fondamentales
      - **H4** — Modèle Differentiated Services (DiffServ)
  - **H2** — 2. Marquage de Couche 2 (802.1p CoS) & Couche 3 (DiffServ DSCP)
      - **H4** — 1. Couche 2 : Class of Service (802.1p CoS)
      - **H4** — 2. Couche 3 : DiffServ Code Point (DSCP)
  - **H2** — 3. Ordonnancement de Files & Protocoles de Découverte (LLDP / CDP)
      - **H4** — Ordonnanceurs de Sortie Matériels
      - **H4** — Protocoles de Découverte de Voisins (LLDP & CDP)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Convertisseur et mappeur de marquage QoS (CoS 802.1p vers DSCP DiffServ)
    - **H3** — Exercice 2 — Simulateur d'ordonnancement de files d'attente (Strict Priority vs WRR)
    - **H3** — Exercice 3 — Parseur de trames de découverte de voisins LLDP (IEEE 802.1AB)
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
| Atelier de code | `../atelier.html` | `b3-reseau-lan/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 10 secondes |  | — | `opt` | — | actif | — |
| 150 millisecondes |  | — | `opt` | — | actif | data-correct=1 |
| 1 milliseconde |  | — | `opt` | — | actif | — |
| 800 millisecondes |  | — | `opt` | — | actif | — |
| 3 bits (8 valeurs possibles de 0 à 7) |  | — | `opt` | — | actif | data-correct=1 |
| 6 bits (64 valeurs possibles) |  | — | `opt` | — | actif | — |
| 8 bits (256 valeurs possibles) |  | — | `opt` | — | actif | — |
| 1 bit (0 ou 1) |  | — | `opt` | — | actif | — |
| 0 |  | — | `opt` | — | actif | — |
| 46 |  | — | `opt` | — | actif | data-correct=1 |
| 24 |  | — | `opt` | — | actif | — |
| 63 |  | — | `opt` | — | actif | — |
| Pour empêcher les ordinateurs des utilisateurs d’attribuer arbitrairement un marquage prio |  | — | `opt` | — | actif | data-correct=1 |
| Pour accélérer la vitesse de calcul du processeur |  | — | `opt` | — | actif | — |
| Pour chiffrer les adresses MAC des stations |  | — | `opt` | — | actif | — |
| Pour forcer les utilisateurs à payer un abonnement Internet plus cher |  | — | `opt` | — | actif | — |
| Une surchauffe des câbles cuivre |  | — | `opt` | — | actif | — |
| La famine (Starvation) des flux ordinaires si la file prioritaire est saturée en permanenc |  | — | `opt` | — | actif | data-correct=1 |
| La suppression de la table de routage |  | — | `opt` | — | actif | — |
| Le redémarrage intempestif des commutateurs |  | — | `opt` | — | actif | — |
| Bloquer les adresses IP russes |  | — | `opt` | — | actif | — |
| Détruire aléatoirement des paquets TCP avant saturation complète pour forcer la réduction |  | — | `opt` | — | actif | data-correct=1 |
| Augmenter la taille des paquets pour remplir la bande passante |  | — | `opt` | — | actif | — |
| Transformer les paquets TCP en requêtes HTTP |  | — | `opt` | — | actif | — |
| IEEE 802.1D |  | — | `opt` | — | actif | — |
| IEEE 802.1AB |  | — | `opt` | — | actif | data-correct=1 |
| IEEE 802.3ad |  | — | `opt` | — | actif | — |
| RFC 791 |  | — | `opt` | — | actif | — |
| En fichiers XML zippés |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lan3-c6-e1` | analyse | 300 | active | `FRAME_QOS id=P1 cos=5 traffic=VoIP_RTP FRAME_QOS id=P2 cos=4 traffic=Video_Conf FRAME_QOS id=P3 cos=0 traffic=Web_HTTP` | Exercice 1 — Convertisseur et mappeur de marquage QoS (CoS 802.1p vers DSCP DiffServ) |
| `lan3-c6-e2` | analyse | 300 | active | `SCHEDULER mode=STRICT_PRIORITY weights=1,1,1 max_dequeues=4 ENQUEUE queue=Q1 pkt_id=VOIP1 ENQUEUE queue=Q3 pkt_id=DATA1 ENQUEUE queue=Q1 pkt_id=VOIP2 ENQUEUE queue=Q2 pkt_id=VID1` | Exercice 2 — Simulateur d'ordonnancement de files d'attente (Strict Priority vs WRR) |
| `lan3-c6-e3` | analyse | 300 | active | `NEIGHBOR_DISCOVERY local_port=Gi0/1 TLV type=1 value=00:11:22:33:44:aa TLV type=2 value=GigabitEthernet1/0/24 TLV type=3 value=120 TLV type=5 value=SW-DISTRIBUTION-01 TLV type=7 value=Bridge,Router TLV type=8 value=10.0.0.254 END_DISCOVERY` | Exercice 3 — Parseur de trames de découverte de voisins LLDP (IEEE 802.1AB) |

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
- Volume de texte : ~3608 mots · 487 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

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
