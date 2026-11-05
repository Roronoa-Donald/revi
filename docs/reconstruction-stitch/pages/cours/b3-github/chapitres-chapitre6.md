# Chapitre 6 — Administration Avancée, LFS, Hooks & Purge d’Historique

> Fiche extraite du fichier `b3-github/chapitres/chapitre6.html` (499 lignes, 39.2 Ko, sha256 `0d9a391d5e3e`).
> Famille : **cours-b3-github** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-github/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Administration Avancée, LFS, Hooks &amp; Purge d’Historique \| Git & GitHub B3 |
| Description meta | Chapitre 6 du cours Git & GitHub B3 : Gestion des gros fichiers binaires avec Git LFS, automatisation avec les hooks client et serveur, hygiène de dépôt, réécriture complète du DAG et purge de secrets compromis avec git-filter-repo. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Administration Avancée, LFS, Hooks & Purge d’Historique |
| 3 | h2 | — | 1. Gestion des Fichiers Volumineux : Architecture de Git LFS |
| 4 | h2 | — | 2. Automatisation Locale & Serveur : Les Hooks Git |
| 5 | h2 | — | 3. Purge Radicale de Secrets & Réécriture du DAG avec git-filter-repo |
| 6 | h2 | — | 4. Procédure Post-Purge en Production & Révocation d’Urgence |
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

- **H1** — Chapitre 6 — Administration Avancée, LFS, Hooks & Purge d’Historique
  - **H2** — 1. Gestion des Fichiers Volumineux : Architecture de Git LFS
      - **H4** — Fonctionnement de Git LFS
      - **H4** — Format Formel d’un Pointeur LFS (v1)
  - **H2** — 2. Automatisation Locale & Serveur : Les Hooks Git
  - **H2** — 3. Purge Radicale de Secrets & Réécriture du DAG avec git-filter-repo
      - **H4** — Suppression d’un chemin dans l’historique réécrit
      - **H4** — Remplacement de Secrets en Texte
  - **H2** — 4. Procédure Post-Purge en Production & Révocation d’Urgence
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Simulateur de Git LFS (Large File Storage) et génération de pointeurs
    - **H3** — Exercice 2 — Validateur de Hook Git pre-commit (Détection de secrets & conflits)
    - **H3** — Exercice 3 — Purge médico-légale de secrets dans l’historique (git-filter-repo)
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
| nav | `b3-githubnav` | Portail → `/`<br>Git & GitHub B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Git & GitHub B3 | `../index.html` | `b3-github/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-github/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-github/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-github/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-github/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-github/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-github/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-github/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-github/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-github/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-github/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-github/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-github/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-github/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-github/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `b3-github/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce que Git refuse les fichiers dont l’extension n’est pas en UTF-8 |  | — | `opt` | — | actif | — |
| Parce que Git conserve l’intégralité des versions successives dans le packfile, rendant le |  | — | `opt` | — | actif | data-correct=1 |
| Parce que les fichiers binaires empêchent l’utilisation de git branch |  | — | `opt` | — | actif | — |
| Parce que le hachage SHA-1 ne fonctionne que sur du texte ASCII |  | — | `opt` | — | actif | — |
| Le fichier binaire complet compressé avec gzip |  | — | `opt` | — | actif | — |
| Un court pointeur textuel contenant la version LFS, le hash SHA-256 et la taille en octets |  | — | `opt` | — | actif | data-correct=1 |
| Une clé API pointant vers un bucket Google Cloud Storage |  | — | `opt` | — | actif | — |
| Un lien symbolique Unix vers le système de fichiers hôte |  | — | `opt` | — | actif | — |
| .git/config |  | — | `opt` | — | actif | — |
| .gitattributes |  | — | `opt` | — | actif | data-correct=1 |
| .lfsconfig |  | — | `opt` | — | actif | — |
| .gitignore |  | — | `opt` | — | actif | — |
| post-commit |  | — | `opt` | — | actif | — |
| pre-commit |  | — | `opt` | — | actif | data-correct=1 |
| post-merge |  | — | `opt` | — | actif | — |
| prepare-commit-msg |  | — | `opt` | — | actif | — |
| Sur le poste du développeur pour chiffrer ses fichiers en local |  | — | `opt` | — | actif | — |
| Sur le serveur distant à la réception d’un push, permettant de rejeter tout commit non con |  | — | `opt` | — | actif | data-correct=1 |
| Dans le navigateur web lors de la création d’une Pull Request |  | — | `opt` | — | actif | — |
| Dans l’agent de signature GPG |  | — | `opt` | — | actif | — |
| git reset --hard HEAD |  | — | `opt` | — | actif | — |
| git-filter-repo --path secret.txt --invert-paths |  | — | `opt` | — | actif | data-correct=1 |
| git rm --cached secret.txt |  | — | `opt` | — | actif | — |
| git revert HEAD~1 |  | — | `opt` | — | actif | — |
| Supprimer le dépôt de GitHub |  | — | `opt` | — | actif | — |
| Révoquer et invalider immédiatement la clé auprès du fournisseur du service tiers concerné |  | — | `opt` | — | actif | data-correct=1 |
| Faire un git commit pour supprimer le fichier .env |  | — | `opt` | — | actif | — |
| Envoyer un email à l’équipe support de Git |  | — | `opt` | — | actif | — |
| Exécuter un simple git pull pour fusionner les branches |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `gh3-c6-e1` | shell | 300 | suspendue | `FILE path=videos/intro.mp4 size_bytes=52428800 sha256=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890 FILE path=src/main.py size_bytes=2048 sha256=00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff` | Exercice 1 — Simulateur de Git LFS (Large File Storage) et génération de pointeurs |
| `gh3-c6-e2` | shell | 300 | suspendue | `INSPECT_FILE file=app.py content=AWS_KEY = "AKIAIOSFODNN7EXAMPLE123" INSPECT_FILE file=main.py content=print("Hello World")` | Exercice 2 — Validateur de Hook Git pre-commit (Détection de secrets & conflits) |
| `gh3-c6-e3` | shell | 300 | suspendue | `COMMIT id=C1 files=main.py,.env parents=NONE COMMIT id=C2 files=main.py parents=C1 PURGE_FILE target=.env` | Exercice 3 — Purge médico-légale de secrets dans l’historique (git-filter-repo) |

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
- Blocs `pre` : 9 · elements `code` : 55
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3371 mots · 486 noeuds HTML

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
