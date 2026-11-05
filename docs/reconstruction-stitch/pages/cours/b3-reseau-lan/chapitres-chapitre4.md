# Chapitre 4 — Routage Intra-Domaine OSPFv2 Avancé, Aires Spéciales & Analyse des LSAs

> Fiche extraite du fichier `b3-reseau-lan/chapitres/chapitre4.html` (536 lignes, 38.0 Ko, sha256 `717b57028180`).
> Famille : **cours-b3-reseau-lan** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-reseau-lan/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Routage Intra-Domaine OSPFv2 Avancé, Aires Spéciales &amp; Analyse des LSAs \| Réseau LAN Avancé B3 |
| Description meta | Chapitre 4 du cours Réseau LAN Avancé B3 : Protocole à état de liens OSPFv2 (RFC 2328), calcul du plus court chemin par l’algorithme SPF de Dijkstra, bande passante de référence, typologie d’aires (Backbone, Stub, Totally Stubby, NSSA), et analyse détaillée des paquets LSA 1 à 7. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Routage Intra-Domaine OSPFv2 Avancé, Aires Spéciales & Analyse des LSAs |
| 3 | h2 | — | 1. Principes du Routage à État de Liens & Algorithme SPF de Dijkstra |
| 4 | h2 | — | 2. Adjacences OSPF, Élection DR/BDR & Typologie des LSAs |
| 5 | h2 | — | 3. Aires Hiérarchiques & Aires Spéciales (Stub, Totally Stubby, NSSA) |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Routage Intra-Domaine OSPFv2 Avancé, Aires Spéciales & Analyse des LSAs
  - **H2** — 1. Principes du Routage à État de Liens & Algorithme SPF de Dijkstra
      - **H4** — La Base de Données LSDB & L’Arbre SPF
      - **H4** — Calcul du Coût OSPF & Bande Passante de Référence
  - **H2** — 2. Adjacences OSPF, Élection DR/BDR & Typologie des LSAs
      - **H4** — Rôles DR (Designated Router) & BDR (Backup DR)
      - **H4** — Matrice des Types de LSAs Principaux
  - **H2** — 3. Aires Hiérarchiques & Aires Spéciales (Stub, Totally Stubby, NSSA)
      - **H4** — Aire Stub
      - **H4** — Aire Totally Stubby
      - **H4** — Aire NSSA (Not-So-Stubby Area)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur de métrique de coût OSPF et sélection du meilleur chemin
    - **H3** — Exercice 2 — Parseur et classificateur de paquets LSA OSPF (Types 1 à 7)
    - **H3** — Exercice 3 — Filtre d'injection de routes dans une aire OSPF Stub, Totally Stubby & NSSA
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
| Chapitre 5 — Sécurité de la Couche d’Accès (Port Security, DHCP Snooping & DAI) | `chapitre5.html` | `b3-reseau-lan/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| L’algorithme de Bellman-Ford |  | — | `opt` | — | actif | — |
| L’algorithme SPF de Dijkstra |  | — | `opt` | — | actif | data-correct=1 |
| L’algorithme de Floyd-Warshall |  | — | `opt` | — | actif | — |
| L’algorithme de cryptographie RSA |  | — | `opt` | — | actif | — |
| bandwidth 10000000 |  | — | `opt` | — | actif | — |
| auto-cost reference-bandwidth 100000 |  | — | `opt` | — | actif | data-correct=1 |
| metric-type 1 |  | — | `opt` | — | actif | — |
| ospf cost 100 |  | — | `opt` | — | actif | — |
| Avec tous les routeurs du segment indifféremment |  | — | `opt` | — | actif | — |
| Uniquement avec le DR (Designated Router) et le BDR (Backup Designated Router) |  | — | `opt` | — | actif | data-correct=1 |
| Uniquement avec la passerelle par défaut DHCP |  | — | `opt` | — | actif | — |
| Avec aucun routeur (état 2-Way permanent) |  | — | `opt` | — | actif | — |
| LSA Type 1 (Router LSA) |  | — | `opt` | — | actif | — |
| LSA Type 2 (Network LSA) |  | — | `opt` | — | actif | — |
| LSA Type 3 (Summary LSA) |  | — | `opt` | — | actif | data-correct=1 |
| LSA Type 5 (AS External LSA) |  | — | `opt` | — | actif | — |
| Aire Backbone (Aire 0) |  | — | `opt` | — | actif | — |
| Aire Normale |  | — | `opt` | — | actif | — |
| Aire Stub |  | — | `opt` | — | actif | data-correct=1 |
| Aire Transit |  | — | `opt` | — | actif | — |
| Elle bloque également les LSA Type 3 inter-aires en ne conservant qu’une unique route par |  | — | `opt` | — | actif | data-correct=1 |
| Elle désactive totalement le protocole OSPF |  | — | `opt` | — | actif | — |
| Elle autorise les annonces BGP directes |  | — | `opt` | — | actif | — |
| Elle ne permet pas d’avoir de switchs de niveau 3 |  | — | `opt` | — | actif | — |
| LSA Type 1 |  | — | `opt` | — | actif | — |
| LSA Type 5 |  | — | `opt` | — | actif | — |
| LSA Type 7 |  | — | `opt` | — | actif | data-correct=1 |
| LSA Type 9 |  | — | `opt` | — | actif | — |
| 224.0.0.1 |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lan3-c4-e1` | analyse | 300 | active | `OSPF_CONFIG ref_bw=10000 PATH id=PATH_A hops=1000,1000,1000 PATH id=PATH_B hops=10000,100 PATH id=PATH_C hops=10000,10000` | Exercice 1 — Calculateur de métrique de coût OSPF et sélection du meilleur chemin |
| `lan3-c4-e2` | analyse | 300 | active | `LSA id=L1 type=1 adv_router=1.1.1.1 area=0 LSA id=L2 type=2 adv_router=2.2.2.2 area=0 LSA id=L3 type=3 adv_router=10.0.0.1 area=1 LSA id=L4 type=5 adv_router=192.168.1.1 area=0` | Exercice 2 — Parseur et classificateur de paquets LSA OSPF (Types 1 à 7) |
| `lan3-c4-e3` | analyse | 300 | active | `AREA_CONFIG area_id=10 type=STUB INCOMING_LSA id=L1 lsa_type=1 prefix=10.10.0.0/16 INCOMING_LSA id=L2 lsa_type=3 prefix=192.168.0.0/24 INCOMING_LSA id=L3 lsa_type=5 prefix=0.0.0.0/0` | Exercice 3 — Filtre d'injection de routes dans une aire OSPF Stub, Totally Stubby & NSSA |

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
- Blocs `pre` : 4 · elements `code` : 24
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-network`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3512 mots · 469 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 18 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
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
