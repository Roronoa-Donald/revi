# Chapitre 6 — Services, processus et planification

> Fiche extraite du fichier `linux/chapitres/chapitre6.html` (450 lignes, 24.5 Ko, sha256 `a1eb8dad8912`).
> Famille : **cours-linux** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/linux/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Services, processus et planification \| Administration Linux B2 |
| Description meta | Chapitre 6 du cours d’administration Linux B2 : systemctl, lecture des états, processus et zombies, kill, cron et journaux. Théorie, exemples détaillés, exercices Bash exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Services, processus et planification |
| 3 | h2 | — | 1. systemctl : piloter un service |
| 4 | h2 | — | 2. Processus et zombies |
| 5 | h2 | — | 3. Planifier avec cron |
| 6 | h2 | — | 4. Lire les journaux |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Services, processus et planification
  - **H2** — 1. systemctl : piloter un service
  - **H2** — 2. Processus et zombies
  - **H2** — 3. Planifier avec cron
  - **H2** — 4. Lire les journaux
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Superviser un service
    - **H3** — Exercice 2 — Détecter un processus anormal
    - **H3** — Exercice 3 — Vérifier une tâche planifiée
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 11 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `linuxnav` | Portail → `/`<br>Administration Linux B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Administration Linux B2 | `../index.html` | `linux/index.html` | interne |
| Sommaire | `../sommaire.html` | `linux/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `linux/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `linux/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `linux/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `linux/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `linux/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `linux/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `linux/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `linux/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `linux/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `linux/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `linux/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `linux/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `linux/chapitres/formules.html` | interne |
| Atelier de scripts | `../atelier.html` | `linux/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| arrête le service |  | — | `opt` | — | actif | — |
| redémarre le service |  | — | `opt` | — | actif | data-correct=1 |
| désactive le service |  | — | `opt` | — | actif | — |
| active |  | — | `opt` | — | actif | — |
| inactive |  | — | `opt` | — | actif | data-correct=1 |
| failed |  | — | `opt` | — | actif | — |
| consomme le processeur |  | — | `opt` | — | actif | — |
| est terminé mais non récupéré |  | — | `opt` | — | actif | data-correct=1 |
| est un virus |  | — | `opt` | — | actif | — |
| arrête proprement |  | — | `opt` | — | actif | — |
| force l’arrêt immédiat |  | — | `opt` | — | actif | data-correct=1 |
| redémarre |  | — | `opt` | — | actif | — |
| 3 |  | — | `opt` | — | actif | — |
| 5 |  | — | `opt` | — | actif | data-correct=1 |
| 7 |  | — | `opt` | — | actif | — |
| tous les jours à 6 h |  | — | `opt` | — | actif | data-correct=1 |
| à 6 h le 1er |  | — | `opt` | — | actif | — |
| chaque minute |  | — | `opt` | — | actif | — |
| journalctl -u nginx |  | — | `opt` | — | actif | data-correct=1 |
| ls -l |  | — | `opt` | — | actif | — |
| crontab -e |  | — | `opt` | — | actif | — |
| rien |  | — | `opt` | — | actif | — |
| start |  | — | `opt` | — | actif | — |
| restart |  | — | `opt` | — | actif | data-correct=1 |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lx2-c6-e1` | shell | 300 | suspendue | `3 ssh active nginx inactive mysql failed` | Exercice 1 — Superviser un service |
| `lx2-c6-e2` | shell | 300 | suspendue | `3 101 running 205 sleeping 309 zombie` | Exercice 2 — Détecter un processus anormal |
| `lx2-c6-e3` | shell | 300 | suspendue | `2 6 30 sauvegarde 23 0 nettoyage` | Exercice 3 — Vérifier une tâche planifiée |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 10 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 10 · elements `code` : 51
- SVG inline : 24 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-terminal`, `#i-play`, `#i-target`, `#i-pin`, `#i-warning`, `#i-compass`, `#i-lightbulb`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~1667 mots · 415 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 64. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 24 |
| `ic` | 22 |
| `box` | 10 |
| `box__title` | 10 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `lab__sample-part` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |
| `badge` | 3 |
| `lab__body` | 3 |

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
