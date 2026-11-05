# Chapitre 6 — Gérer les objets AD DS

> Fiche extraite du fichier `b1-admin-windows/chapitres/chapitre6.html` (489 lignes, 29.3 Ko, sha256 `7c3a8496dce5`).
> Famille : **cours-b1-admin-windows** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-admin-windows/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Gérer les objets AD DS \| Administration Windows B1 |
| Description meta | Chapitre 6 du cours B1 : Console Utilisateurs et ordinateurs, unités d’organisation, utilisateurs (UPN, options), groupes, jointure au domaine. Théorie, exemples détaillés, études de cas interactives, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Gérer les objets AD DS |
| 3 | h2 | — | 1. La console et les unités d’organisation |
| 4 | h2 | — | 2. Créer et paramétrer des utilisateurs |
| 5 | h2 | — | 3. Les groupes : droits, types et étendues |
| 6 | h2 | — | 4. Joindre un poste au domaine et profils itinérants |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Gérer les objets AD DS
  - **H2** — 1. La console et les unités d’organisation
  - **H2** — 2. Créer et paramétrer des utilisateurs
  - **H2** — 3. Les groupes : droits, types et étendues
  - **H2** — 4. Joindre un poste au domaine et profils itinérants
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Les classes d’objets AD DS
    - **H3** — Exercice 2 — Créer les utilisateurs : UPN et options de compte
    - **H3** — Exercice 3 — Groupes : droits, type et étendue
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
| Atelier d’analyse | `../atelier.html` | `b1-admin-windows/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Utilisateurs et ordinateurs Active Directory |  | — | `opt` | — | actif | data-correct=1 |
| Gestionnaire des tâches |  | — | `opt` | — | actif | — |
| Gestion du stockage |  | — | `opt` | — | actif | — |
| l’unité d’organisation |  | — | `opt` | — | actif | data-correct=1 |
| le groupe de sécurité |  | — | `opt` | — | actif | — |
| le profil itinérant |  | — | `opt` | — | actif | — |
| iziti@ntic.ma |  | — | `opt` | — | actif | data-correct=1 |
| NTIC\iziti |  | — | `opt` | — | actif | — |
| iziti_NTIC |  | — | `opt` | — | actif | — |
| force le changement à la première connexion |  | — | `opt` | — | actif | data-correct=1 |
| bloque le compte |  | — | `opt` | — | actif | — |
| supprime le mot de passe |  | — | `opt` | — | actif | — |
| les restrictions d’horaires d’accès |  | — | `opt` | — | actif | data-correct=1 |
| de changer l’UPN du domaine |  | — | `opt` | — | actif | — |
| de créer une UO |  | — | `opt` | — | actif | — |
| à la diffusion (listes) |  | — | `opt` | — | actif | data-correct=1 |
| à donner des droits |  | — | `opt` | — | actif | — |
| à joindre le domaine |  | — | `opt` | — | actif | — |
| que le DNS du client pointe vers le domaine |  | — | `opt` | — | actif | data-correct=1 |
| que le pare-feu est éteint |  | — | `opt` | — | actif | — |
| que l’UO existe |  | — | `opt` | — | actif | — |
| de suivre le profil de l’utilisateur de poste en poste |  | — | `opt` | — | actif | data-correct=1 |
| de partager des imprimantes |  | — | `opt` | — | actif | — |
| de créer des groupes |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `aw-c6-e1` | analyse | 300 | active | `3 iziti utilisateur poste-compta ordinateur grp-ventes groupe` | Exercice 1 — Les classes d’objets AD DS |
| `aw-c6-e2` | analyse | 300 | active | `3 iziti iziti@ntic.ma oui ilham NTIC\\ilham non demo demo@ntic.ma non` | Exercice 2 — Créer les utilisateurs : UPN et options de compte |
| `aw-c6-e3` | analyse | 300 | active | `2 grp-ventes securite globale liste-clients distribution globale 2 pc1 ad-dns pc2 8.8.8.8` | Exercice 3 — Groupes : droits, type et étendue |

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
- Blocs `pre` : 3 · elements `code` : 29
- SVG inline : 24 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cpu`, `#i-play`, `#i-target`, `#i-warning`, `#i-pin`, `#i-compass`, `#i-terminal`, `#i-book`, `#i-lightbulb`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2491 mots · 390 noeuds HTML

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
