# Chapitre 5 — Virtualisation & VMware

> Fiche extraite du fichier `rd_winserver/chapitres/chapitre5.html` (433 lignes, 25.2 Ko, sha256 `fb46fdb1e627`).
> Famille : **cours-rd_winserver** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/rd_winserver/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Virtualisation & VMware \| Windows Server B2 |
| Description meta | Chapitre 5 du cours Windows Server B2 : Hyperviseur type 1/2, ESXi/vCenter/vSphere, réseaux virtuels, images disque, vCPU et thin provisioning. Théorie, exemples détaillés, exercices PowerShell exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Virtualisation & VMware |
| 3 | h2 | — | 1. Hyperviseur de type 1 et de type 2 |
| 4 | h2 | — | 2. Les réseaux virtuels |
| 5 | h2 | — | 3. Images disque |
| 6 | h2 | — | 4. vCPU, CPU Ready Time et surallocation |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Virtualisation & VMware
  - **H2** — 1. Hyperviseur de type 1 et de type 2
  - **H2** — 2. Les réseaux virtuels
  - **H2** — 3. Images disque
  - **H2** — 4. vCPU, CPU Ready Time et surallocation
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Type d’hyperviseur
    - **H3** — Exercice 2 — Mode réseau d’une VM
    - **H3** — Exercice 3 — Surallocation de vCPU
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 17 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `rd_winservernav` | Portail → `/`<br>Windows Server B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **22** (externes : 1).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Windows Server B2 | `../index.html` | `rd_winserver/index.html` | interne |
| Sommaire | `../sommaire.html` | `rd_winserver/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `rd_winserver/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `rd_winserver/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `rd_winserver/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `rd_winserver/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `rd_winserver/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `rd_winserver/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `rd_winserver/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `rd_winserver/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `rd_winserver/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `rd_winserver/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `rd_winserver/chapitres/simulateur-examen.html` | interne |
| récupération d’espace thin VMware | `https://knowledge.broadcom.com/external/article/450717/deleting-data-from-a-thin-provisioned-di.html` | `https://knowledge.broadcom.com/external/article/450717/deleting-data-from-a-thin-provisioned-di.html` | externe |
| Réviser avec les flashcards | `cartes.html` | `rd_winserver/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `rd_winserver/chapitres/formules.html` | interne |
| Chapitre 6 — Snapshots, clones & templates | `chapitre6.html` | `rd_winserver/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Un logiciel qui gère des VM |  | — | `opt` | — | actif | data-correct=1 |
| Un antivirus |  | — | `opt` | — | actif | — |
| Un switch réseau |  | — | `opt` | — | actif | — |
| Directement sur le matériel |  | — | `opt` | — | actif | data-correct=1 |
| Sur un OS hôte |  | — | `opt` | — | actif | — |
| Dans une VM |  | — | `opt` | — | actif | — |
| ESXi |  | — | `opt` | — | actif | data-correct=1 |
| VirtualBox |  | — | `opt` | — | actif | — |
| Workstation |  | — | `opt` | — | actif | — |
| Gestion centralisée des hôtes |  | — | `opt` | — | actif | data-correct=1 |
| Créer des images ISO |  | — | `opt` | — | actif | — |
| Sauvegarder les VM |  | — | `opt` | — | actif | — |
| Non |  | — | `opt` | — | actif | data-correct=1 |
| Oui |  | — | `opt` | — | actif | — |
| Parfois |  | — | `opt` | — | actif | — |
| Bridge |  | — | `opt` | — | actif | data-correct=1 |
| NAT |  | — | `opt` | — | actif | — |
| Host-Only |  | — | `opt` | — | actif | — |
| VMDK |  | — | `opt` | — | actif | data-correct=1 |
| VHDX |  | — | `opt` | — | actif | — |
| ISO |  | — | `opt` | — | actif | — |
| Le temps d’attente CPU d’une VM |  | — | `opt` | — | actif | data-correct=1 |
| La RAM libre |  | — | `opt` | — | actif | — |
| Le débit réseau |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `ws2-c5-e1` | powershell | 300 | active | `1 ESXi` | Exercice 1 — Type d’hyperviseur |
| `ws2-c5-e2` | powershell | 300 | suspendue | `nat` | Exercice 2 — Mode réseau d’une VM |
| `ws2-c5-e3` | powershell | 300 | active | `32 16` | Exercice 3 — Surallocation de vCPU |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 9 (`.box`, variantes `box--*`).
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

- Tableaux : 2 (0 lignes / 3 en-tetes ; 0 lignes / 3 en-tetes)
- Blocs `pre` : 6 · elements `code` : 15
- SVG inline : 23 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cpu`, `#i-play`, `#i-target`, `#i-server`, `#i-layers`, `#i-lightbulb`, `#i-terminal`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~1763 mots · 442 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 63. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 24 |
| `ic` | 21 |
| `box` | 9 |
| `box__title` | 9 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `lab__sample-part` | 6 |
| `lab__note` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `box--tech` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `badge` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-grading-suspended` (1), `data-mark-done` (1)

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
