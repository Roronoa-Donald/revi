# Chapitre 1 — Noyau Linux, Pseudo-FS (/proc, /sys) & Appels Système

> Fiche extraite du fichier `b3-linux/chapitres/chapitre1.html` (500 lignes, 36.9 Ko, sha256 `837802a3e2c4`).
> Famille : **cours-b3-linux** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-linux/chapitres/chapitre1.html` |
| Titre du document | Chapitre 1 — Noyau Linux, Pseudo-FS (/proc, /sys) &amp; Appels Système \| Linux Avancé B3 |
| Description meta | Chapitre 1 du cours Linux Avancé B3 : Architecture noyau (espace noyau vs espace utilisateur, VFS), inspection de /proc et /sys, mémoire virtuelle (W^X), et traçage des appels système avec strace. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Noyau Linux, Pseudo-FS (/proc, /sys) & Appels Système |
| 3 | h2 | — | 1. Architecture du Noyau Linux, Anneaux de Privilèges & VFS |
| 4 | h2 | — | 2. Le Pseudo-Système de Fichiers /proc : Fenêtre sur la task_struct |
| 5 | h2 | — | 3. Espace d’Adressage Virtuel, Segments Mémoire & Protection W^X |
| 6 | h2 | — | 4. Interception et Profilage des Appels Système avec strace |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Noyau Linux, Pseudo-FS (/proc, /sys) & Appels Système
  - **H2** — 1. Architecture du Noyau Linux, Anneaux de Privilèges & VFS
      - **H4** — Anneaux de Privilèges CPU (Rings)
      - **H4** — Le Virtual File System (VFS)
  - **H2** — 2. Le Pseudo-Système de Fichiers /proc : Fenêtre sur la task_struct
  - **H2** — 3. Espace d’Adressage Virtuel, Segments Mémoire & Protection W^X
  - **H2** — 4. Interception et Profilage des Appels Système avec strace
      - **H4** — Commandes strace Fréquentes
      - **H4** — Principales Erreurs Syscalls (errno)
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Parseur et auditeur de métriques de processus (/proc/[pid]/stat)
    - **H3** — Exercice 2 — Analyseur de cartographie de mémoire virtuelle (/proc/[pid]/maps)
    - **H3** — Exercice 3 — Décodeur et profileur d’appels système (strace tracer)
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
| nav | `b3-linuxnav` | Portail → `/`<br>Linux Avancé B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Linux Avancé B3 | `../index.html` | `b3-linux/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-linux/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-linux/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-linux/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-linux/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-linux/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-linux/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-linux/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-linux/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-linux/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-linux/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-linux/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-linux/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-linux/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-linux/chapitres/formules.html` | interne |
| Chapitre 2 — Initialisation & Gestionnaire de Services Systemd Avancé | `chapitre2.html` | `b3-linux/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce qu’il est compressé en continu avec l’algorithme gzip |  | — | `opt` | — | actif | — |
| Parce qu’il réside exclusivement en mémoire vive et est généré dynamiquement par le noyau |  | — | `opt` | — | actif | data-correct=1 |
| Parce qu’il est hébergé sur un serveur distant de télémétrie |  | — | `opt` | — | actif | — |
| Parce qu’il est effacé automatiquement chaque seconde |  | — | `opt` | — | actif | — |
| Parce que le signal SIGKILL n’existe pas sous Linux |  | — | `opt` | — | actif | — |
| Parce que le processus attend une réponse matérielle directe (I/O disque) et le noyau bloq |  | — | `opt` | — | actif | data-correct=1 |
| Parce que le processus a des privilèges root supérieurs à systemd |  | — | `opt` | — | actif | — |
| Parce que son fichier /proc/[pid]/status est verrouillé en écriture |  | — | `opt` | — | actif | — |
| Un processus malveillant injecté par un rootkit |  | — | `opt` | — | actif | — |
| Un processus qui s’exécute sans fin en consommant 100% du CPU |  | — | `opt` | — | actif | — |
| Un processus terminé dont la mémoire a été libérée, mais dont le père n’a pas encore lu le |  | — | `opt` | — | actif | data-correct=1 |
| Un conteneur Docker arrêté de force |  | — | `opt` | — | actif | — |
| Un fichier doit obligatoirement avoir les droits 777 pour être exécuté |  | — | `opt` | — | actif | — |
| Une plage de mémoire virtuelle ne doit jamais être simultanément inscriptible et exécutabl |  | — | `opt` | — | actif | data-correct=1 |
| Le swap doit être chiffré avec une clé asymétrique |  | — | `opt` | — | actif | — |
| Toutes les commandes doivent être exécutées dans un terminal X11 |  | — | `opt` | — | actif | — |
| clone(2) |  | — | `opt` | — | actif | — |
| ptrace(2) |  | — | `opt` | — | actif | data-correct=1 |
| fork(2) |  | — | `opt` | — | actif | — |
| mmap(2) |  | — | `opt` | — | actif | — |
| Permission non accordée (Permission denied) |  | — | `opt` | — | actif | — |
| Fichier ou répertoire introuvable (No such file or directory) |  | — | `opt` | — | actif | data-correct=1 |
| Espace disque saturé (No space left on device) |  | — | `opt` | — | actif | — |
| Opération interrompue par un signal (Interrupted system call) |  | — | `opt` | — | actif | — |
| struct file_system |  | — | `opt` | — | actif | — |
| struct task_struct |  | — | `opt` | — | actif | data-correct=1 |
| struct cgroup_root |  | — | `opt` | — | actif | — |
| struct mm_struct |  | — | `opt` | — | actif | — |
| strace -c |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lx3-c1-e1` | shell | 300 | suspendue | `PROC_STAT pid=101 comm=nginx state=S ppid=1 utime=45 stime=15 rss=256` | Exercice 1 — Parseur et auditeur de métriques de processus (/proc/[pid]/stat) |
| `lx3-c1-e2` | shell | 300 | suspendue | `VMMAP pid=42 start=00400000 end=00450000 perms=r-xp pathname=/usr/bin/app` | Exercice 2 — Analyseur de cartographie de mémoire virtuelle (/proc/[pid]/maps) |
| `lx3-c1-e3` | shell | 300 | suspendue | `SYSCALL pid=101 name=openat args="AT_FDCWD,/etc/passwd,O_RDONLY" ret=3 time_us=45` | Exercice 3 — Décodeur et profileur d’appels système (strace tracer) |

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
- Blocs `pre` : 7 · elements `code` : 72
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-terminal`, `#i-play`, `#i-target`, `#i-info`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3182 mots · 532 noeuds HTML

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
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `card` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
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
