# Simulateur d’examens blancs

> Fiche extraite du fichier `erp-si/chapitres/simulateur-examen.html` (171 lignes, 17.4 Ko, sha256 `407f59eca8b6`).
> Famille : **cours-erp-si** · sous-type : `simulateur-examen` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/erp-si/chapitres/simulateur-examen.html` |
| Titre du document | Examens blancs — ERP & SI B2 |
| Description meta | Sujets d’examen blanc corrigés pour le cours ERP & Systèmes d’Information B2 : architecture SI, BPMN, intégration, cycles P2P/O2C, MRP, stocks et risques projet. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Simulateur d’examens blancs |
| 3 | h2 | — | Examen blanc n°1 : Fondements du SI, BPMN & Architecture d’Intégration |
| 4 | h2 | — | Examen blanc n°2 : Processus métiers, Gestion des stocks & Risques projet |

## 3. Hierarchie des titres

- **H1** — Simulateur d’examens blancs
  - **H2** — Examen blanc n°1 : Fondements du SI, BPMN & Architecture d’Intégration
  - **H2** — Examen blanc n°2 : Processus métiers, Gestion des stocks & Risques projet

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `erp-sinav` | Portail → `/`<br>ERP & SI B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **19** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| ERP & SI B2 | `../index.html` | `erp-si/index.html` | interne |
| Sommaire | `../sommaire.html` | `erp-si/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `erp-si/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `erp-si/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `erp-si/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `erp-si/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `erp-si/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `erp-si/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `erp-si/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `erp-si/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `erp-si/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `erp-si/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `erp-si/chapitres/simulateur-examen.html` | interne |
| Atelier de code | `../atelier.html` | `erp-si/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |

## 7. Composants pedagogiques et etats observes

- Encadres pedagogiques : 9 (`.box`, variantes `box--*`).
- Blocs replies : 8 (`<details>`).

Etats et interactions a reconstruire :

- Chronometre `[data-timer][data-minutes]` : bouton Demarrer, affichage mm:ss, etat « Temps ecoule ».
- QCM d'examen : correction revelee apres reponse (selon le mode de la page).
- Etat session serveur (API QCM) : non expose dans le HTML statique.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 7
- SVG inline : 23 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-blocks`, `#i-compass`, `#i-clipboard`, `#i-check`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~1158 mots · 213 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 26. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 21 |
| `box` | 9 |
| `box__title` | 9 |
| `box--it` | 8 |
| `tag` | 8 |
| `tag--time` | 8 |
| `lead` | 3 |
| `btn` | 2 |
| `skip-nav` | 1 |
| `skip-link` | 1 |
| `erp-sinav` | 1 |
| `erp-sinav__in` | 1 |
| `erp-sinav__home` | 1 |
| `erp-sinav__sep` | 1 |
| `erp-sinav__brand` | 1 |
| `erp-sinav__links` | 1 |
| `erp-sinav__actions` | 1 |
| `theme-toggle` | 1 |
| `theme-toggle__sun` | 1 |
| `theme-toggle__moon` | 1 |

Aucun attribut `data-*`.

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
