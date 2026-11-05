# Chapitre 5 — Routage IPv4, Tables de Routage & Routes Statiques

> Fiche extraite du fichier `ccna/chapitres/chapitre5.html` (564 lignes, 37.5 Ko, sha256 `7124fa485c90`).
> Famille : **cours-ccna** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/ccna/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Routage IPv4, Tables de Routage &amp; Routes Statiques \| CCNA Réseau B2 |
| Description meta | Chapitre 5 du cours CCNA Réseau B2 : Fonctionnement du routage de niveau 3, lecture de la table de routage (show ip route), algorithme Longest Prefix Match (LPM), Distance Administrative (AD) et métrique, routes directement connectées, routes statiques, route par défaut (0.0.0.0/0), routes flottantes de secours et supernetting. Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Routage IPv4, Tables de Routage & Routes Statiques |
| 3 | h2 | — | 1. Principes du Routage L3 & Lecture de « show ip route » |
| 4 | h2 | — | 2. L’Algorithme Décisionnel : Longest Prefix Match (LPM) |
| 5 | h2 | — | 3. Configuration des Routes Statiques & Route par Défaut |
| 6 | h2 | — | 4. Routes Statiques Flottantes & Supernetting |
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

- **H1** — Chapitre 5 — Routage IPv4, Tables de Routage & Routes Statiques
  - **H2** — 1. Principes du Routage L3 & Lecture de « show ip route »
  - **H2** — 2. L’Algorithme Décisionnel : Longest Prefix Match (LPM)
  - **H2** — 3. Configuration des Routes Statiques & Route par Défaut
  - **H2** — 4. Routes Statiques Flottantes & Supernetting
      - **H4** — Routes Statiques Flottantes (Secours)
      - **H4** — Supernetting (Résumé de Routes)
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Parseur de table de routage Cisco (show ip route)
    - **H3** — Exercice 2 — Moteur de décision Longest Prefix Match (LPM)
    - **H3** — Exercice 3 — Calculateur de résumé de routes (Supernetting CIDR)
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
| Chapitre 6 — VLANs, Trunking 802.1Q & Routage Inter-VLAN (ROAS) | `chapitre6.html` | `ccna/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Le nombre de sauts jusqu’au réseau cible |  | — | `opt` | — | actif | — |
| La Distance Administrative (AD) mesurant la fiabilité du protocole |  | — | `opt` | — | actif | data-correct=1 |
| La bande passante disponible en mégabits par seconde |  | — | `opt` | — | actif | — |
| Le temps de convergence en millisecondes |  | — | `opt` | — | actif | — |
| Vers 10.0.0.1 car la Distance Administrative 1 est meilleure que 110 |  | — | `opt` | — | actif | — |
| Vers 10.0.0.2 car le préfixe /25 est plus spécifique (Longest Prefix Match) |  | — | `opt` | — | actif | data-correct=1 |
| Le paquet est équilibré 50/50 entre les deux prochains sauts |  | — | `opt` | — | actif | — |
| Le paquet est rejeté pour ambiguïté de routage |  | — | `opt` | — | actif | — |
| ip route default 203.0.113.1 |  | — | `opt` | — | actif | — |
| ip route 0.0.0.0 0.0.0.0 203.0.113.1 |  | — | `opt` | — | actif | data-correct=1 |
| ip default-gateway 203.0.113.1 |  | — | `opt` | — | actif | — |
| ip route *.*.*.* 203.0.113.1 |  | — | `opt` | — | actif | — |
| 0 |  | — | `opt` | — | actif | data-correct=1 |
| 1 |  | — | `opt` | — | actif | — |
| 90 |  | — | `opt` | — | actif | — |
| 110 |  | — | `opt` | — | actif | — |
| Une route par défaut |  | — | `opt` | — | actif | — |
| Une route statique flottante |  | — | `opt` | — | actif | data-correct=1 |
| Une route récursive |  | — | `opt` | — | actif | — |
| Une route Anycast |  | — | `opt` | — | actif | — |
| 172.16.10.0/23 |  | — | `opt` | — | actif | data-correct=1 |
| 172.16.0.0/16 |  | — | `opt` | — | actif | — |
| 172.16.10.0/22 |  | — | `opt` | — | actif | — |
| 172.16.8.0/21 |  | — | `opt` | — | actif | — |
| Le routeur diffuse le paquet sur tous ses ports |  | — | `opt` | — | actif | — |
| Le routeur détruit le paquet et renvoie un message ICMP Destination Unreachable à l’émette |  | — | `opt` | — | actif | data-correct=1 |
| Le routeur met le paquet en attente pendant 30 secondes |  | — | `opt` | — | actif | — |
| Le routeur renvoie le paquet à l’émetteur sans modification |  | — | `opt` | — | actif | — |
| 20 |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `na2-c5-e1` | analyse | 300 | active | `C 192.168.1.0/24 is directly connected, GigabitEthernet0/0 S 10.0.0.0/8 [1/0] via 192.168.1.254` | Exercice 1 — Parseur de table de routage Cisco (show ip route) |
| `na2-c5-e2` | analyse | 300 | active | `PAQUET: 192.168.1.135 ROUTE 192.168.0.0/16 10.1.1.1 1 ROUTE 192.168.1.0/24 10.2.2.1 110 ROUTE 192.168.1.128/28 10.3.3.1 110 ROUTE 0.0.0.0/0 10.0.0.254 1` | Exercice 2 — Moteur de décision Longest Prefix Match (LPM) |
| `na2-c5-e3` | analyse | 300 | active | `192.168.0.0/24 192.168.1.0/24 192.168.2.0/24 192.168.3.0/24` | Exercice 3 — Calculateur de résumé de routes (Supernetting CIDR) |

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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 4 · elements `code` : 54
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-globe`, `#i-play`, `#i-target`, `#i-warning`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3364 mots · 523 noeuds HTML

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
| `lab__formative-notice` | 3 |

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
