# Chapitre 1 — Fondements des Conteneurs, Isolation Linux & Architecture Docker

> Fiche extraite du fichier `docker/chapitres/chapitre1.html` (563 lignes, 39.7 Ko, sha256 `590cbec1de15`).
> Famille : **cours-docker** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/docker/chapitres/chapitre1.html` |
| Titre du document | Chapitre 1 — Fondements des Conteneurs, Isolation Linux &amp; Architecture Docker \| Docker B2 |
| Description meta | Chapitre 1 du cours Docker B2 : Origine de la conteneurisation, comparaison rigoureuse VM vs Conteneur, primitives du noyau Linux (Namespaces, Cgroups, chroot/pivot_root), composants du moteur Docker (CLI, dockerd, containerd, containerd-shim, runc) et standards OCI. Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Fondements des Conteneurs, Isolation Linux & Architecture Docker |
| 3 | h2 | — | 1. Vulgarisation illustrée : Comprendre les Namespaces et les Cgroups du noyau Linux |
| 4 | h2 | — | 2. De la Machine Virtuelle au Conteneur Léger |
| 5 | h2 | — | 3. Les Primitives du Noyau Linux : Namespaces & Cgroups |
| 6 | h2 | — | 4. Architecture Interne du Moteur Docker et Standards OCI |
| 7 | h2 | — | 5. Premières Manipulations et Commandes de Base |
| 8 | h2 | — | 6. Exercices de code |
| 9 | h2 | — | 7. QCM — niveau examen |
| 10 | h2 | — | 8. Erreurs classiques — récapitulatif |
| 11 | h2 | — | 9. Méthodologie de résolution |
| 12 | h2 | — | 10. Révision active |
| 13 | h2 | — | 11. Test de maîtrise |
| 14 | .lab | code lab | 3 bloc(s) |
| 15 | .qcm | QCM | 8 question(s) |
| 16 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Fondements des Conteneurs, Isolation Linux & Architecture Docker
  - **H2** — 1. Vulgarisation illustrée : Comprendre les Namespaces et les Cgroups du noyau Linux
  - **H2** — 2. De la Machine Virtuelle au Conteneur Léger
      - **H4** — Machine Virtuelle (Virtualisation Lourde)
      - **H4** — Conteneur Docker (Isolation Noyau Légère)
  - **H2** — 3. Les Primitives du Noyau Linux : Namespaces & Cgroups
  - **H2** — 4. Architecture Interne du Moteur Docker et Standards OCI
      - **H4** — 1. Client CLI & Docker Daemon
      - **H4** — 2. containerd & containerd-shim
      - **H4** — 3. runc (OCI Runtime)
  - **H2** — 5. Premières Manipulations et Commandes de Base
  - **H2** — 6. Exercices de code
    - **H3** — Exercice 1 — Analyseur de primitives d’isolation Linux (Namespaces vs Cgroups)
    - **H3** — Exercice 2 — Comparateur d’empreinte mémoire et stockage : VM vs Conteneur
    - **H3** — Exercice 3 — Inspecteur des composants de l’architecture Docker (Daemon, Containerd, Runc)
  - **H2** — 7. QCM — niveau examen
  - **H2** — 8. Erreurs classiques — récapitulatif
  - **H2** — 9. Méthodologie de résolution
  - **H2** — 10. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 11. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `dockernav` | Portail → `/`<br>Docker B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Docker B2 | `../index.html` | `docker/index.html` | interne |
| Sommaire | `../sommaire.html` | `docker/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `docker/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `docker/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `docker/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `docker/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `docker/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `docker/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `docker/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `docker/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `docker/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `docker/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `docker/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `docker/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `docker/chapitres/formules.html` | interne |
| Chapitre 2 — Images, Layers & Registres Docker | `chapitre2.html` | `docker/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| La VM n’a pas besoin de processeur physique |  | — | `opt` | — | actif | — |
| La VM virtualise le matériel et embarque son propre système d’exploitation invité complet, |  | — | `opt` | — | actif | data-correct=1 |
| Le conteneur est codé en Java alors que la VM est codée en assembleur |  | — | `opt` | — | actif | — |
| Il n’y a aucune différence, ce sont deux dénominations commerciales identiques |  | — | `opt` | — | actif | — |
| Le PID Namespace |  | — | `opt` | — | actif | data-correct=1 |
| Le contrôleur Cgroups de mémoire |  | — | `opt` | — | actif | — |
| Le pilote Wi-Fi du noyau |  | — | `opt` | — | actif | — |
| L’hyperviseur KVM |  | — | `opt` | — | actif | — |
| À chiffrer les disques durs avec une clé AES-256 |  | — | `opt` | — | actif | — |
| À limiter, contrôler et comptabiliser la quantité de ressources matérielles (CPU, mémoire |  | — | `opt` | — | actif | data-correct=1 |
| À traduire les noms de domaine en adresses IP publiques |  | — | `opt` | — | actif | — |
| À compiler le code source des applications automatiquement |  | — | `opt` | — | actif | — |
| docker-compose |  | — | `opt` | — | actif | — |
| runc |  | — | `opt` | — | actif | data-correct=1 |
| VirtualBox |  | — | `opt` | — | actif | — |
| kubelet |  | — | `opt` | — | actif | — |
| Pour miner des cryptomonnaies en arrière-plan |  | — | `opt` | — | actif | — |
| Pour maintenir ouverts les flux stdin/stdout/stderr et l’état du conteneur sans dépendre d |  | — | `opt` | — | actif | data-correct=1 |
| Pour vérifier la validité de la licence commerciale Docker Desktop |  | — | `opt` | — | actif | — |
| Pour émuler une carte graphique 3D virtuelle |  | — | `opt` | — | actif | — |
| Il peut uniquement afficher la version de Docker |  | — | `opt` | — | actif | — |
| Il dispose virtuellement d’un accès superutilisateur root complet sur l’ensemble de la mac |  | — | `opt` | — | actif | data-correct=1 |
| Le système Linux refuse d’exécuter la moindre commande |  | — | `opt` | — | actif | — |
| La vitesse du processeur est réduite de moitié |  | — | `opt` | — | actif | — |
| UTS Namespace |  | — | `opt` | — | actif | — |
| NET Namespace |  | — | `opt` | — | actif | data-correct=1 |
| IPC Namespace |  | — | `opt` | — | actif | — |
| MNT Namespace |  | — | `opt` | — | actif | — |
| docker log |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `dk2-c1-e1` | shell | 300 | suspendue | `PID NET MEM_LIMIT INCONNU_TEST` | Exercice 1 — Analyseur de primitives d’isolation Linux (Namespaces vs Cgroups) |
| `dk2-c1-e2` | shell | 300 | suspendue | `5 50 128 4000 1024` | Exercice 2 — Comparateur d’empreinte mémoire et stockage : VM vs Conteneur |
| `dk2-c1-e3` | shell | 300 | suspendue | `CLI DOCKERD RUNC` | Exercice 3 — Inspecteur des composants de l’architecture Docker (Daemon, Containerd, Runc) |

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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 6 · elements `code` : 66
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-blocks`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3538 mots · 552 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 71. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 20 |
| `box` | 9 |
| `box__title` | 9 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `card` | 5 |
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
