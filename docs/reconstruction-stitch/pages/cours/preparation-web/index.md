# Chargement du projet...

> Fiche extraite du fichier `preparation-web/index.html` (263 lignes, 13.9 Ko, sha256 `648625bd0ea2`).
> Famille : **cours-preparation-web** · sous-type : `index` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/preparation-web/index.html` |
| Titre du document | Preparation Web - HTML & JavaScript |
| Description meta | Atelier B2 pour apprendre HTML et JavaScript en codant directement 12 projets courts avec validation automatique, quiz, XP et classement. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `light` |
| Chapitre (body) | — |
| Regle d'acces | Compte B2 ou superieur + abonnement + mot de passe de section |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | topbar | 4 liens, aria="" |
| 2 | h1 | — | Chargement du projet... |
| 3 | h2 | — | Cours |
| 4 | h2 | — | Gagne des XP apres validation |
| 5 | h2 | — | Vos 12 projets |
| 6 | h2 | — | Observez, comprenez, puis réécrivez |
| 7 | .modal | dialogue | 7 element(s) |

## 3. Hierarchie des titres

- **H1** — Chargement du projet...
  - **H2** — Cours
  - **H2** — Gagne des XP apres validation
  - **H2** — Vos 12 projets
  - **H2** — Observez, comprenez, puis réécrivez
    - **H3** — Besoin d un indice ?

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| header (role=banner) | `topbar` | cours.interactifs → `../index.html`<br>Cheatsheet → `../preparation-cheatsheet.html`<br>Progression → `../preparation-progression.html`<br>Classement → `../preparation-classement.html` |
| nav | `project-list` |  |
| header | `topbar` |  |

Liens sortants : **9** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#main` | `#main` | ancre |
| cours.interactifs | `../index.html` | `index.html` | interne |
| Cheatsheet | `../preparation-cheatsheet.html` | `preparation-cheatsheet.html` | interne |
| Progression | `../preparation-progression.html` | `preparation-progression.html` | interne |
| Classement | `../preparation-classement.html` | `preparation-classement.html` | interne |
| Cheatsheet generale | `../preparation-cheatsheet.html` | `preparation-cheatsheet.html` | interne |
| Progression detaillee | `../preparation-progression.html` | `preparation-progression.html` | interne |
| Classement B2 | `../preparation-classement.html` | `preparation-classement.html` | interne |
| Retour au portail | `../index.html` | `index.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Mode sombre | actif | — |
| Projets | button | toggleRail | `ghost-button rail-toggle` | — | actif | — |
| Cours | button | toggleLesson | `ghost-button` | — | actif | — |
| Focus code | button | toggleFocus | `ghost-button` | — | actif | — |
| Valider | button | validateBtn | `primary-button` | — | actif | — |
| 0/12 | button | progressTrigger | `progress-pill` | — | actif | — |
| × | button | collapseLesson | `icon-button` | Replier le cours | actif | — |
| Precedent | button | prevStep | `ghost-button` | — | actif | — |
| Suivant | button | nextStep | `primary-button` | — | actif | — |
| HTML | button | — | `tab is-active` | — | actif | data-editor-tab=html |
| CSS fourni | button | — | `tab` | — | actif | data-editor-tab=css |
| JavaScript | button | — | `tab` | — | actif | data-editor-tab=js |
| Indice | button | hintBtn | `mini-button` | — | actif | — |
| Solution | button | solutionBtn | `mini-button is-hidden` | — | actif | — |
| Reinitialiser | button | resetBtn | `mini-button danger` | — | actif | — |
| Rafraichir | button | refreshPreview | `mini-button` | — | actif | — |
| × | button | closeProgress | `icon-button modal-close` | Fermer | actif | — |
| × | button | closeSolution | `icon-button modal-close` | Fermer | actif | — |
| IA | button | aiFab | `ai-fab` | Ouvrir l aide IA | actif | — |
| × | button | aiClose | `icon-button` | Fermer | actif | — |
| Demander | button | aiSend | `primary-button` | — | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- En-tête : marque + 3 liens (Epreuves, Atelier, Mon compte) + bouton profil + bascule de thème.
- Etat `prepLockedMsg` : bandeau « L'atelier est protege » si `?preparation=locked`, refermable.
- Filtre de niveau : 4 onglets (B1/B2/B3/Tous), onglet actif noir, persistance `portal_selected_level`.
- Recherche : champ `#courseSearch`, filtrage en direct sur `data-title` ; compteur `#activeFilterCount`.
- Etat vide : `#portalEmptyState` (bloc pointille) avec bouton de reinitialisation des filtres.
- Carte « Reprendre » : masquee par defaut (`hidden`), visible si progression locale > 0.
- Utilisateur connecte : bouton profil marque `is-authenticated`, nom en title/aria-label.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 1 · elements `code` : 0
- SVG inline : 3 · images : 0
- Icones du sprite utilisees : aucune
- Volume de texte : ~174 mots · 186 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap`, `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css`, `../assets/css/tokens.css`, `../assets/css/base.css`, `../assets/css/components.css`, `assets/css/style.css?v=20260524`
- Scripts externes : `../assets/js/theme.js`, `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js`, `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/xml-fold.min.js`, `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/closebrackets.min.js`, `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/closetag.min.js`, `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/matchbrackets.min.js`, `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/matchtags.min.js`, `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/selection/active-line.min.js`, `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/xml/xml.min.js`, `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/javascript/javascript.min.js`, `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/css/css.min.js`, `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/htmlmixed/htmlmixed.min.js`, `assets/js/projects.js?v=20260524`, `assets/js/app.js?v=20260524`
- Blocs `<style>` inline : 1 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 71. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `eyebrow` | 7 |
| `is-hidden` | 7 |
| `ghost-button` | 4 |
| `icon-button` | 4 |
| `mini-button` | 4 |
| `primary-button` | 3 |
| `tab` | 3 |
| `editor-card` | 3 |
| `editor-label` | 3 |
| `topbar` | 2 |
| `resizer` | 2 |
| `modal-backdrop` | 2 |
| `modal` | 2 |
| `modal-close` | 2 |
| `skip-link` | 1 |
| `theme-toggle` | 1 |
| `theme-toggle__sun` | 1 |
| `theme-toggle__moon` | 1 |
| `app-shell` | 1 |
| `rail-collapsed` | 1 |

Attributs `data-*` : `data-editor-tab` (3), `data-panel` (3), `data-theme` (1)

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
