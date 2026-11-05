# Chapitre 6 — Sécurité, Production & Optimisation

> Fiche extraite du fichier `docker/chapitres/chapitre6.html` (532 lignes, 37.8 Ko, sha256 `33516f615c7d`).
> Famille : **cours-docker** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/docker/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Sécurité, Production &amp; Optimisation \| Docker B2 |
| Description meta | Chapitre 6 du cours Docker B2 : Durcissement des conteneurs selon le CIS Docker Benchmark, abandon des privilèges root (directive USER), limitation des Linux Capabilities, scans de vulnérabilités (Trivy), quotas de ressources Cgroups (RAM, CPU, PID limit), et rotation des journaux en production. Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Sécurité, Production & Optimisation |
| 3 | h2 | — | 1. Le Principe du Moindre Privilège : Bannir l’Utilisateur Root |
| 4 | h2 | — | 2. Linux Capabilities et Dangers Mortels de --privileged |
| 5 | h2 | — | 3. Quotas de Ressources Cgroups : Prévenir le Déni de Service (DoS) |
| 6 | h2 | — | 4. Scans de Vulnérabilités et Rotation des Logs en Production |
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

- **H1** — Chapitre 6 — Sécurité, Production & Optimisation
  - **H2** — 1. Le Principe du Moindre Privilège : Bannir l’Utilisateur Root
      - **H4** — Anti-pattern : Exécution Root
      - **H4** — Bonne Pratique : Utilisateur Dédié Non-Root
  - **H2** — 2. Linux Capabilities et Dangers Mortels de --privileged
  - **H2** — 3. Quotas de Ressources Cgroups : Prévenir le Déni de Service (DoS)
  - **H2** — 4. Scans de Vulnérabilités et Rotation des Logs en Production
      - **H4** — Scans de Vulnérabilités (Trivy / Docker Scout)
      - **H4** — Rotation des Logs (Logging Drivers)
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Auditeur de privilèges root et directive USER
    - **H3** — Exercice 2 — Calculateur de quotas cgroups (CPU & Mémoire)
    - **H3** — Exercice 3 — Simulateur de politique de redémarrage (Restart Policy)
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
| Atelier de code | `../atelier.html` | `docker/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce que root consomme deux fois plus de bande passante réseau |  | — | `opt` | — | actif | — |
| Pour respecter le principe du moindre privilège : si l’application est compromise, l’attaq |  | — | `opt` | — | actif | data-correct=1 |
| Parce que le système de fichiers Linux interdit aux utilisateurs root d’écrire dans des fi |  | — | `opt` | — | actif | — |
| C’est une obligation technique du compilateur Go |  | — | `opt` | — | actif | — |
| Il attribue une adresse IP publique gratuite au conteneur |  | — | `opt` | — | actif | — |
| Il désactive pratiquement toutes les barrières d’isolation du noyau, accorde toutes les Li |  | — | `opt` | — | actif | data-correct=1 |
| Il compresse les fichiers de l’image pour économiser de la mémoire |  | — | `opt` | — | actif | — |
| Il crypte le trafic TCP en HTTPS |  | — | `opt` | — | actif | — |
| --pids-limit=100 |  | — | `opt` | — | actif | data-correct=1 |
| --no-fork |  | — | `opt` | — | actif | — |
| --kill-process |  | — | `opt` | — | actif | — |
| --safe-mode |  | — | `opt` | — | actif | — |
| --cap-add=ALL |  | — | `opt` | — | actif | — |
| --cap-drop=ALL puis --cap-add uniquement pour le strict minimum nécessaire (ex: NET_BIND_S |  | — | `opt` | — | actif | data-correct=1 |
| --no-capabilities |  | — | `opt` | — | actif | — |
| --kernel-bypass |  | — | `opt` | — | actif | — |
| Le conteneur redémarre instantanément en douceur |  | — | `opt` | — | actif | — |
| Le conteneur peut consommer toute la mémoire disponible de la machine physique jusqu’à ce |  | — | `opt` | — | actif | data-correct=1 |
| Le serveur hôte augmente automatiquement sa mémoire physique |  | — | `opt` | — | actif | — |
| Docker sauvegarde la mémoire sur un disque virtuel |  | — | `opt` | — | actif | — |
| Elle interdit aux utilisateurs de lire les fichiers |  | — | `opt` | — | actif | — |
| Elle monte le système de fichiers racine du conteneur en lecture seule intégrale, empêchan |  | — | `opt` | — | actif | data-correct=1 |
| Elle désactive la webcam de la machine |  | — | `opt` | — | actif | — |
| Elle permet de lire les logs sans mot de passe |  | — | `opt` | — | actif | — |
| Trivy |  | — | `opt` | — | actif | data-correct=1 |
| Photoshop |  | — | `opt` | — | actif | — |
| VLC |  | — | `opt` | — | actif | — |
| Apache Benchmark |  | — | `opt` | — | actif | — |
| Pour éviter que les fichiers journaux JSON ne grossissent indéfiniment jusqu’à saturer l’i |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `dk2-c6-e1` | shell | 300 | suspendue | `FROM python:3.11-slim WORKDIR /app COPY . . USER appuser CMD ["python", "main.py"]` | Exercice 1 — Auditeur de privilèges root et directive USER |
| `dk2-c6-e2` | shell | 300 | suspendue | `MEM=512m SWAP=1g CPUS=1.5 MEM=256m SWAP=256m CPUS=0.5` | Exercice 2 — Calculateur de quotas cgroups (CPU & Mémoire) |
| `dk2-c6-e3` | shell | 300 | suspendue | `POLITIQUE=always EXIT_CODE=1 MANUEL=NON POLITIQUE=always EXIT_CODE=0 MANUEL=OUI POLITIQUE=on-failure EXIT_CODE=0 MANUEL=NON POLITIQUE=on-failure EXIT_CODE=137 MANUEL=NON` | Exercice 3 — Simulateur de politique de redémarrage (Restart Policy) |

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
- Blocs `pre` : 10 · elements `code` : 54
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-blocks`, `#i-play`, `#i-target`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3279 mots · 484 noeuds HTML

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
