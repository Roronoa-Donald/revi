# Chapitre 4 — Stockage et gestion des volumes

> Fiche extraite du fichier `admin-vm/chapitres/chapitre4.html` (427 lignes, 24.5 Ko, sha256 `5d551bd13f67`).
> Famille : **cours-admin-vm** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/admin-vm/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Stockage et gestion des volumes \| Admin VM B2 |
| Description meta | Chapitre 4 du cours Admin VM B2 : LVM (PV/VG/LV), types de stockage Proxmox, NFS vs iSCSI, snapshots vs backup, stratégie GFS. Théorie, exemples détaillés, exercices PowerShell exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Stockage et gestion des volumes |
| 3 | h2 | — | 1. Allocation des Disques Virtuels : Thin Provisioning vs Thick Provisioning (Épreuve Officielle B2) |
| 4 | h2 | — | 2. Pourquoi le stockage est critique |
| 5 | h2 | — | 3. LVM en trois notions |
| 6 | h2 | — | 4. Types de stockage et protocoles |
| 7 | h2 | — | 5. Snapshots, sauvegardes et GFS |
| 8 | h2 | — | 6. Exercices de code |
| 9 | h2 | — | 7. QCM — niveau examen |
| 10 | h2 | — | 8. Erreurs classiques — récapitulatif |
| 11 | h2 | — | 9. Méthodologie de résolution |
| 12 | h2 | — | 10. Révision active |
| 13 | h2 | — | 11. Test de maîtrise |
| 14 | .lab | code lab | 3 bloc(s) |
| 15 | .qcm | QCM | 8 question(s) |
| 16 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Stockage et gestion des volumes
  - **H2** — 1. Allocation des Disques Virtuels : Thin Provisioning vs Thick Provisioning (Épreuve Officielle B2)
  - **H2** — 2. Pourquoi le stockage est critique
  - **H2** — 3. LVM en trois notions
  - **H2** — 4. Types de stockage et protocoles
  - **H2** — 5. Snapshots, sauvegardes et GFS
  - **H2** — 6. Exercices de code
    - **H3** — Exercice 1 — LVM en trois notions
    - **H3** — Exercice 2 — Surveiller l’espace d’un volume
    - **H3** — Exercice 3 — Stratégie de sauvegarde GFS
  - **H2** — 7. QCM — niveau examen
  - **H2** — 8. Erreurs classiques — récapitulatif
  - **H2** — 9. Méthodologie de résolution
  - **H2** — 10. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 16 notions à connaître absolument
  - **H2** — 11. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `admin-vmnav` | Portail → `/`<br>Admin VM B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **23** (externes : 2).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Admin VM B2 | `../index.html` | `admin-vm/index.html` | interne |
| Sommaire | `../sommaire.html` | `admin-vm/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `admin-vm/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `admin-vm/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `admin-vm/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `admin-vm/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `admin-vm/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `admin-vm/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `admin-vm/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `admin-vm/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `admin-vm/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `admin-vm/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `admin-vm/chapitres/simulateur-examen.html` | interne |
| allocation et performances VMware | `https://knowledge.broadcom.com/external/article/343258/understanding-largescale-sequential-writ.html` | `https://knowledge.broadcom.com/external/article/343258/understanding-largescale-sequential-writ.html` | externe |
| disques thin VMware | `https://knowledge.broadcom.com/external/article/337348/using-thin-provisioned-disks-with-virtua.html` | `https://knowledge.broadcom.com/external/article/337348/using-thin-provisioned-disks-with-virtua.html` | externe |
| Réviser avec les flashcards | `cartes.html` | `admin-vm/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `admin-vm/chapitres/formules.html` | interne |
| Chapitre 5 — Réseau virtualisé et segmentation | `chapitre5.html` | `admin-vm/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Un disque physique |  | — | `opt` | — | actif | data-correct=1 |
| Un volume logique |  | — | `opt` | — | actif | — |
| Un pool |  | — | `opt` | — | actif | — |
| Les PV en un pool |  | — | `opt` | — | actif | data-correct=1 |
| Les VM |  | — | `opt` | — | actif | — |
| Les VLAN |  | — | `opt` | — | actif | — |
| Devenir le disque d’une VM |  | — | `opt` | — | actif | data-correct=1 |
| Router le réseau |  | — | `opt` | — | actif | — |
| Sauvegarder |  | — | `opt` | — | actif | — |
| Directory |  | — | `opt` | — | actif | data-correct=1 |
| Ceph |  | — | `opt` | — | actif | — |
| LVM-thin |  | — | `opt` | — | actif | — |
| Partage fichier vs disque réseau |  | — | `opt` | — | actif | data-correct=1 |
| Réseau vs stockage |  | — | `opt` | — | actif | — |
| Aucune différence |  | — | `opt` | — | actif | — |
| La rétention des sauvegardes |  | — | `opt` | — | actif | data-correct=1 |
| Les VLAN |  | — | `opt` | — | actif | — |
| Les vCPU |  | — | `opt` | — | actif | — |
| 3-2-1 |  | — | `opt` | — | actif | data-correct=1 |
| 1-1-1 |  | — | `opt` | — | actif | — |
| 5-5-5 |  | — | `opt` | — | actif | — |
| Non |  | — | `opt` | — | actif | data-correct=1 |
| Oui |  | — | `opt` | — | actif | — |
| Toujours |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vm2-c4-e1` | powershell | 300 | suspendue | `vg` | Exercice 1 — LVM en trois notions |
| `vm2-c4-e2` | powershell | 300 | suspendue | `500 100` | Exercice 2 — Surveiller l’espace d’un volume |
| `vm2-c4-e3` | powershell | 300 | suspendue | `hebdo` | Exercice 3 — Stratégie de sauvegarde GFS |

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
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-blocks`, `#i-play`, `#i-target`, `#i-database`, `#i-warning`, `#i-terminal`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~1627 mots · 439 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 62. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 24 |
| `ic` | 20 |
| `box` | 9 |
| `box__title` | 9 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `box--tech` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
