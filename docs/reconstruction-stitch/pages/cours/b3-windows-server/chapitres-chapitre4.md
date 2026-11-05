# Chapitre 4 — Services de Fichiers, Permissions NTFS vs Partage SMB & Espaces de Stockage

> Fiche extraite du fichier `b3-windows-server/chapitres/chapitre4.html` (570 lignes, 40.0 Ko, sha256 `51cdd04df060`).
> Famille : **cours-b3-windows-server** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-windows-server/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Services de Fichiers, Permissions NTFS vs Partage SMB &amp; Espaces de Stockage \| Windows Server B3 |
| Description meta | Chapitre 4 du cours Windows Server B3 : Systèmes de fichiers Windows (NTFS vs ReFS, métadonnées, flux alternatifs ADS et résilience), partage de fichiers réseau SMB 3.1.1, calcul mathématique des permissions réseau effectives (règle universelle du plus restrictif entre Partage et NTFS), hiérarchie officielle d’arbitrage des ACEs dans les DACL (Explicit Deny > Explicit Allow > Inherited Deny > Inherited Allow), chiffrement BitLocker et EFS, déduplication de données (Data Deduplication), et technologies d’Espaces de Stockage (Storage Spaces, pools et résilience Simple, Mirror 2/3 voies et Parité). Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Services de Fichiers, Permissions NTFS vs Partage SMB & Espaces de Stockage |
| 3 | h2 | — | 1. Systèmes de Fichiers d’Entreprise : NTFS vs ReFS |
| 4 | h2 | — | 2. Sécurité d’Accès Réseau : Règle du Plus Restrictif & Hiérarchie DACL |
| 5 | h2 | — | 3. Stockage Moderne d’Entreprise : Espaces de Stockage (Storage Spaces) |
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

- **H1** — Chapitre 4 — Services de Fichiers, Permissions NTFS vs Partage SMB & Espaces de Stockage
  - **H2** — 1. Systèmes de Fichiers d’Entreprise : NTFS vs ReFS
      - **H4** — Le Système de Fichiers NTFS (New Technology File System)
      - **H4** — Le Système de Fichiers ReFS (Resilient File System)
  - **H2** — 2. Sécurité d’Accès Réseau : Règle du Plus Restrictif & Hiérarchie DACL
      - **H4** — La Règle du Plus Restrictif (Share vs NTFS)
      - **H4** — Hiérarchie Officielle des ACEs dans la DACL
  - **H2** — 3. Stockage Moderne d’Entreprise : Espaces de Stockage (Storage Spaces)
      - **H4** — Typologie des Disques Virtuels Résilients
      - **H4** — Déduplication de Données (Data Deduplication)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur de permissions effectives (Partage SMB vs NTFS)
    - **H3** — Exercice 2 — Moteur de résolution des conflits NTFS : Héritage, Allow et Deny explicite
    - **H3** — Exercice 3 — Simulateur d’espaces de stockage et résilience Storage Spaces
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
| nav | `b3-windows-servernav` | Portail → `/`<br>Windows Server B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Windows Server B3 | `../index.html` | `b3-windows-server/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-windows-server/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-windows-server/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-windows-server/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-windows-server/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-windows-server/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-windows-server/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-windows-server/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-windows-server/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-windows-server/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-windows-server/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-windows-server/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-windows-server/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-windows-server/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-windows-server/chapitres/formules.html` | interne |
| Chapitre 5 — Virtualisation d’Entreprise Hyper-V, Commutateurs Virtuels & Haute Disponibilité | `chapitre5.html` | `b3-windows-server/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Full Control |  | — | `opt` | — | actif | — |
| Change (Modify) |  | — | `opt` | — | actif | data-correct=1 |
| Read uniquement |  | — | `opt` | — | actif | — |
| Accès interdit |  | — | `opt` | — | actif | — |
| Inherited Allow |  | — | `opt` | — | actif | — |
| Explicit Allow |  | — | `opt` | — | actif | — |
| Inherited Deny |  | — | `opt` | — | actif | — |
| Explicit Deny |  | — | `opt` | — | actif | data-correct=1 |
| 1 disque |  | — | `opt` | — | actif | — |
| 2 disques |  | — | `opt` | — | actif | — |
| 3 disques |  | — | `opt` | — | actif | data-correct=1 |
| 5 disques |  | — | `opt` | — | actif | — |
| FAT32 |  | — | `opt` | — | actif | — |
| exFAT |  | — | `opt` | — | actif | — |
| NTFS |  | — | `opt` | — | actif | — |
| ReFS |  | — | `opt` | — | actif | data-correct=1 |
| Le droit est refusé car tout Deny l’emporte |  | — | `opt` | — | actif | — |
| Le droit est accordé car l’Explicit Allow l’emporte sur un refus hérité (Inherited Deny) |  | — | `opt` | — | actif | data-correct=1 |
| L’ordinateur redémarre immédiatement |  | — | `opt` | — | actif | — |
| Le fichier est verrouillé par l’administrateur |  | — | `opt` | — | actif | — |
| 0 disque en panne |  | — | `opt` | — | actif | — |
| 1 disque en panne |  | — | `opt` | — | actif | data-correct=1 |
| 2 disques en panne |  | — | `opt` | — | actif | — |
| 3 disques en panne |  | — | `opt` | — | actif | — |
| En compressant tous les fichiers au format ZIP |  | — | `opt` | — | actif | — |
| En supprimant les fichiers qui n’ont pas été ouverts depuis 6 mois |  | — | `opt` | — | actif | — |
| En remplaçant les blocs de données dupliqués par des pointeurs vers une copie unique stock |  | — | `opt` | — | actif | data-correct=1 |
| En transférant automatiquement les fichiers vers le Cloud Azure |  | — | `opt` | — | actif | — |
| Bloquer le partage et ne travailler que localement sur le serveur |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `ws3-c4-e1` | analyse | 300 | active | `ACCESS user=Alice share=READ ntfs=FULL_CONTROL ACCESS user=Bob share=FULL_CONTROL ntfs=MODIFY ACCESS user=Charlie share=CHANGE ntfs=WRITE` | Exercice 1 — Calculateur de permissions effectives (Partage SMB vs NTFS) |
| `ws3-c4-e2` | analyse | 300 | active | `USER name=Alice groups=GG_Compta,GG_Employes ACE target=GG_Employes type=INHERITED perm=DELETE action=DENY ACE target=Alice type=EXPLICIT perm=DELETE action=ALLOW ACE target=GG_Compta type=INHERITED perm=READ action=ALLOW` | Exercice 2 — Moteur de résolution des conflits NTFS : Héritage, Allow et Deny explicite |
| `ws3-c4-e3` | analyse | 300 | active | `POOL nom=Pool-Compta resiliency=TWO_WAY_MIRROR DISK id=D1 size_gb=1000 DISK id=D2 size_gb=1000` | Exercice 3 — Simulateur d’espaces de stockage et résilience Storage Spaces |

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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 3 · elements `code` : 2
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cpu`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3545 mots · 426 noeuds HTML

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
| `box` | 6 |
| `box__title` | 6 |
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
