# Chapitre 4 — Active Directory : domaine, arbre, forêt

> Fiche extraite du fichier `b1-admin-windows/chapitres/chapitre4.html` (487 lignes, 28.7 Ko, sha256 `9c93bac78ade`).
> Famille : **cours-b1-admin-windows** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-admin-windows/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Active Directory : domaine, arbre, forêt \| Administration Windows B1 |
| Description meta | Chapitre 4 du cours B1 : Notion d’AD DS, hiérarchie des domaines, arbres et forêts, sous-domaines des succursales. Théorie, exemples détaillés, études de cas interactives, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Active Directory : domaine, arbre, forêt |
| 3 | h2 | — | 1. La notion d’Active Directory |
| 4 | h2 | — | 2. Succursales et sous-domaines |
| 5 | h2 | — | 3. Arbre et forêt |
| 6 | h2 | — | 4. Ce qu’il faut retenir avant d’installer |
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

- **H1** — Chapitre 4 — Active Directory : domaine, arbre, forêt
  - **H2** — 1. La notion d’Active Directory
  - **H2** — 2. Succursales et sous-domaines
  - **H2** — 3. Arbre et forêt
  - **H2** — 4. Ce qu’il faut retenir avant d’installer
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Domaine, arbre, forêt : le vocabulaire
    - **H3** — Exercice 2 — L’arborescence des succursales
    - **H3** — Exercice 3 — Les objets par unité d’organisation
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
| nav | `awnav` | Portail → `/`<br>Administration Windows B1 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Administration Windows B1 | `../index.html` | `b1-admin-windows/index.html` | interne |
| Sommaire | `../sommaire.html` | `b1-admin-windows/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b1-admin-windows/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b1-admin-windows/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b1-admin-windows/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b1-admin-windows/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b1-admin-windows/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b1-admin-windows/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b1-admin-windows/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b1-admin-windows/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `b1-admin-windows/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `b1-admin-windows/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `b1-admin-windows/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b1-admin-windows/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b1-admin-windows/chapitres/formules.html` | interne |
| Chapitre 5 — Installer un contrôleur de domaine | `chapitre5.html` | `b1-admin-windows/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| domaines, arbres et forêt |  | — | `opt` | — | actif | data-correct=1 |
| postes et serveurs |  | — | `opt` | — | actif | — |
| rôles et fonctionnalités |  | — | `opt` | — | actif | — |
| une entité logique (administrative) qui héberge objets et stratégies |  | — | `opt` | — | actif | data-correct=1 |
| un disque dur réseau |  | — | `opt` | — | actif | — |
| une licence Microsoft |  | — | `opt` | — | actif | — |
| un domaine enfant de cdp.org |  | — | `opt` | — | actif | data-correct=1 |
| une forêt |  | — | `opt` | — | actif | — |
| un groupe de sécurité |  | — | `opt` | — | actif | — |
| un espace de nom contigu et hiérarchique |  | — | `opt` | — | actif | data-correct=1 |
| le même mot de passe |  | — | `opt` | — | actif | — |
| une seule UO |  | — | `opt` | — | actif | — |
| un ou plusieurs arbres indépendants |  | — | `opt` | — | actif | data-correct=1 |
| tous les domaines du monde |  | — | `opt` | — | actif | — |
| un seul domaine obligatoirement |  | — | `opt` | — | actif | — |
| des unités d’organisation |  | — | `opt` | — | actif | data-correct=1 |
| des fichiers .txt |  | — | `opt` | — | actif | — |
| des partitions système |  | — | `opt` | — | actif | — |
| a un impact technique très conséquent |  | — | `opt` | — | actif | data-correct=1 |
| se fait en un clic sans effet |  | — | `opt` | — | actif | — |
| est impossible |  | — | `opt` | — | actif | — |
| au préfixe du domaine saisi |  | — | `opt` | — | actif | data-correct=1 |
| au nom du serveur |  | — | `opt` | — | actif | — |
| à la marque de la carte réseau |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `aw-c4-e1` | analyse | 300 | active | `3 domaine entite arbre contigu foret arbres` | Exercice 1 — Domaine, arbre, forêt : le vocabulaire |
| `aw-c4-e2` | analyse | 300 | active | `3 cdp.org - paris.cdp.org cdp.org lome.cdp.org cdp.org` | Exercice 2 — L’arborescence des succursales |
| `aw-c4-e3` | analyse | 300 | active | `3 iziti TRI poste1 TRI groupe-ventes VENTES` | Exercice 3 — Les objets par unité d’organisation |

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

- Tableaux : 1 (0 lignes / 2 en-tetes)
- Blocs `pre` : 3 · elements `code` : 35
- SVG inline : 24 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cpu`, `#i-play`, `#i-target`, `#i-compass`, `#i-warning`, `#i-pin`, `#i-terminal`, `#i-book`, `#i-lightbulb`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2280 mots · 413 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 65. Les plus frequentes :

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
