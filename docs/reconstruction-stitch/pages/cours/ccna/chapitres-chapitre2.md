# Chapitre 2 — Adressage IPv4, Masquage, CIDR & Découpage VLSM

> Fiche extraite du fichier `ccna/chapitres/chapitre2.html` (543 lignes, 35.1 Ko, sha256 `f1eabd33a69e`).
> Famille : **cours-ccna** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/ccna/chapitres/chapitre2.html` |
| Titre du document | Chapitre 2 — Adressage IPv4, Masquage, CIDR &amp; Découpage VLSM \| CCNA Réseau B2 |
| Description meta | Chapitre 2 du cours CCNA Réseau B2 : Structure des adresses IPv4 (32 bits), classes historiques (A, B, C), plages privées RFC 1918, masques de sous-réseau, notation CIDR, masques génériques Wildcard et découpage hiérarchique VLSM sans gaspillage. Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Adressage IPv4, Masquage, CIDR & Découpage VLSM |
| 3 | h2 | — | 1. Structure d’une Adresse IPv4 & Classes d’Adresses |
| 4 | h2 | — | 2. Masques de Sous-Réseau, Notation CIDR & Masques Génériques (Wildcards) |
| 5 | h2 | — | 3. Calcul Pratique d’un Sous-Réseau : Réseau, Broadcast & Plage |
| 6 | h2 | — | 4. Méthodologie du Découpage Hiérarchique VLSM |
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

- **H1** — Chapitre 2 — Adressage IPv4, Masquage, CIDR & Découpage VLSM
  - **H2** — 1. Structure d’une Adresse IPv4 & Classes d’Adresses
      - **H4** — Classes Historiques (Classful)
      - **H4** — Plages Privées (RFC 1918) & Spéciales
  - **H2** — 2. Masques de Sous-Réseau, Notation CIDR & Masques Génériques (Wildcards)
  - **H2** — 3. Calcul Pratique d’un Sous-Réseau : Réseau, Broadcast & Plage
  - **H2** — 4. Méthodologie du Découpage Hiérarchique VLSM
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur de masque IPv4 et masque générique (Wildcard)
    - **H3** — Exercice 2 — Analyseur complet de sous-réseau IPv4
    - **H3** — Exercice 3 — Planificateur et allocateur VLSM hiérarchique
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
| Chapitre 3 — Commutation Ethernet L2, Tables CAM & Spanning Tree (STP) | `chapitre3.html` | `ccna/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 32 hôtes |  | — | `opt` | — | actif | — |
| 30 hôtes |  | — | `opt` | — | actif | data-correct=1 |
| 62 hôtes |  | — | `opt` | — | actif | — |
| 14 hôtes |  | — | `opt` | — | actif | — |
| 172.16.20.111 |  | — | `opt` | — | actif | data-correct=1 |
| 172.16.20.112 |  | — | `opt` | — | actif | — |
| 172.16.20.127 |  | — | `opt` | — | actif | — |
| 172.16.20.255 |  | — | `opt` | — | actif | — |
| 0.0.0.15 |  | — | `opt` | — | actif | data-correct=1 |
| 0.0.0.31 |  | — | `opt` | — | actif | — |
| 0.0.0.240 |  | — | `opt` | — | actif | — |
| 255.255.255.15 |  | — | `opt` | — | actif | — |
| 172.32.1.5 |  | — | `opt` | — | actif | — |
| 192.169.10.1 |  | — | `opt` | — | actif | — |
| 172.25.100.50 |  | — | `opt` | — | actif | data-correct=1 |
| 169.254.10.20 |  | — | `opt` | — | actif | — |
| Pour des raisons purement esthétiques dans le tableur |  | — | `opt` | — | actif | — |
| Pour éviter que les petits sous-réseaux ne fragmentent l’espace et brisent l’alignement de |  | — | `opt` | — | actif | data-correct=1 |
| Parce que le routeur Cisco refuse d’enregistrer des routes avec des masques croissants |  | — | `opt` | — | actif | — |
| Pour garantir que la passerelle ait toujours l’adresse .1 |  | — | `opt` | — | actif | — |
| /27 |  | — | `opt` | — | actif | — |
| /26 |  | — | `opt` | — | actif | data-correct=1 |
| /25 |  | — | `opt` | — | actif | — |
| /24 |  | — | `opt` | — | actif | — |
| 10.50.80.0 |  | — | `opt` | — | actif | — |
| 10.50.80.1 |  | — | `opt` | — | actif | data-correct=1 |
| 10.50.81.1 |  | — | `opt` | — | actif | — |
| 10.50.0.1 |  | — | `opt` | — | actif | — |
| /28 (255.255.255.240) |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `na2-c2-e1` | analyse | 300 | active | `/24 /30 /32` | Exercice 1 — Calculateur de masque IPv4 et masque générique (Wildcard) |
| `na2-c2-e2` | analyse | 300 | active | `192.168.10.45/26` | Exercice 2 — Analyseur complet de sous-réseau IPv4 |
| `na2-c2-e3` | analyse | 300 | active | `192.168.1.0/24 Direction: 50 Comptabilite: 25 Informatique: 12 LienWAN: 2` | Exercice 3 — Planificateur et allocateur VLSM hiérarchique |

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
- Blocs `pre` : 3 · elements `code` : 50
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-globe`, `#i-play`, `#i-target`, `#i-warning`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3030 mots · 528 noeuds HTML

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
