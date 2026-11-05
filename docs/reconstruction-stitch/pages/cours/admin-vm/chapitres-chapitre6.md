# Chapitre 6 — Administration avancée

> Fiche extraite du fichier `admin-vm/chapitres/chapitre6.html` (428 lignes, 24.4 Ko, sha256 `6886bcaf3ccd`).
> Famille : **cours-admin-vm** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/admin-vm/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Administration avancée \| Admin VM B2 |
| Description meta | Chapitre 6 du cours Admin VM B2 : Réservations, limites et shares, cluster HA, migration, sauvegarde avancée, monitoring et sécurité. Théorie, exemples détaillés, exercices PowerShell exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Administration avancée |
| 3 | h2 | — | 1. Gestion avancée des ressources |
| 4 | h2 | — | 2. Cluster, quorum, fencing et failover |
| 5 | h2 | — | 3. Migration |
| 6 | h2 | — | 4. Sauvegarde avancée, monitoring et sécurité |
| 7 | h2 | — | 5. Continuité de Service : Migration à Chaud (VMware vMotion) & Haute Disponibilité (vSphere HA) |
| 8 | h2 | — | 6. Exercices de code |
| 9 | h2 | — | 7. QCM — niveau examen |
| 10 | h2 | — | 8. Erreurs classiques — récapitulatif |
| 11 | h2 | — | 9. Méthodologie de résolution |
| 12 | h2 | — | 10. Révision active |
| 13 | h2 | — | 11. Test de maîtrise |
| 14 | .lab | code lab | 3 bloc(s) |
| 15 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Administration avancée
  - **H2** — 1. Gestion avancée des ressources
  - **H2** — 2. Cluster, quorum, fencing et failover
  - **H2** — 3. Migration
  - **H2** — 4. Sauvegarde avancée, monitoring et sécurité
  - **H2** — 5. Continuité de Service : Migration à Chaud (VMware vMotion) & Haute Disponibilité (vSphere HA)
  - **H2** — 6. Exercices de code
    - **H3** — Exercice 1 — Quorum d’un cluster
    - **H3** — Exercice 2 — Alerte de monitoring
    - **H3** — Exercice 3 — Gain du dédoublonnage
  - **H2** — 7. QCM — niveau examen
  - **H2** — 8. Erreurs classiques — récapitulatif
  - **H2** — 9. Méthodologie de résolution
  - **H2** — 10. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 14 notions à connaître absolument
  - **H2** — 11. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `admin-vmnav` | Portail → `/`<br>Admin VM B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **22** (externes : 1).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Admin VM B2 | `../index.html` | `admin-vm/index.html` | interne |
| Sommaire | `../sommaire.html` | `admin-vm/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `admin-vm/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `admin-vm/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `admin-vm/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `admin-vm/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `admin-vm/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `admin-vm/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `admin-vm/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `admin-vm/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `admin-vm/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `admin-vm/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `admin-vm/chapitres/simulateur-examen.html` | interne |
| impact de la pause vMotion sur les applications sensibles | `https://knowledge.broadcom.com/external/article/407273/sensitive-virtual-machines-become-impact.html` | `https://knowledge.broadcom.com/external/article/407273/sensitive-virtual-machines-become-impact.html` | externe |
| Réviser avec les flashcards | `cartes.html` | `admin-vm/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `admin-vm/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `admin-vm/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Un minimum de ressource |  | — | `opt` | — | actif | data-correct=1 |
| Un maximum |  | — | `opt` | — | actif | — |
| Une priorité |  | — | `opt` | — | actif | — |
| Plafonne une ressource |  | — | `opt` | — | actif | data-correct=1 |
| Réserve un minimum |  | — | `opt` | — | actif | — |
| Priorise |  | — | `opt` | — | actif | — |
| Priorité relative entre VM |  | — | `opt` | — | actif | data-correct=1 |
| Chiffrer |  | — | `opt` | — | actif | — |
| Segmenter |  | — | `opt` | — | actif | — |
| La prise de décision |  | — | `opt` | — | actif | data-correct=1 |
| Le chiffrement |  | — | `opt` | — | actif | — |
| La migration |  | — | `opt` | — | actif | — |
| Isole un nœud instable |  | — | `opt` | — | actif | data-correct=1 |
| Sauvegarde les VM |  | — | `opt` | — | actif | — |
| Monitore |  | — | `opt` | — | actif | — |
| La migration |  | — | `opt` | — | actif | data-correct=1 |
| Le chiffrement |  | — | `opt` | — | actif | — |
| Le NAT |  | — | `opt` | — | actif | — |
| L’espace de sauvegarde |  | — | `opt` | — | actif | data-correct=1 |
| La latence |  | — | `opt` | — | actif | — |
| Les VLAN |  | — | `opt` | — | actif | — |
| Les données sauvegardées |  | — | `opt` | — | actif | data-correct=1 |
| Le réseau |  | — | `opt` | — | actif | — |
| Les vCPU |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vm2-c6-e1` | powershell | 300 | suspendue | `4 3` | Exercice 1 — Quorum d’un cluster |
| `vm2-c6-e2` | powershell | 300 | suspendue | `92 85` | Exercice 2 — Alerte de monitoring |
| `vm2-c6-e3` | powershell | 300 | suspendue | `100 40` | Exercice 3 — Gain du dédoublonnage |

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

- Tableaux : 0
- Blocs `pre` : 6 · elements `code` : 9
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-blocks`, `#i-play`, `#i-target`, `#i-scale`, `#i-lightbulb`, `#i-terminal`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~1575 mots · 408 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 63. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 24 |
| `ic` | 20 |
| `box` | 9 |
| `box__title` | 9 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `box--tech` | 3 |
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
