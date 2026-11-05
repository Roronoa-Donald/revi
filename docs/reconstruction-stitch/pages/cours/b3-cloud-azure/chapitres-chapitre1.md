# Chapitre 1 — Architecture Globale, Régions, Souscriptions & Hiérarchie ARM

> Fiche extraite du fichier `b3-cloud-azure/chapitres/chapitre1.html` (542 lignes, 42.0 Ko, sha256 `1d528adf8e1e`).
> Famille : **cours-b3-cloud-azure** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cloud-azure/chapitres/chapitre1.html` |
| Titre du document | Module 1 — Architecture Globale, Régions, Souscriptions &amp; Hiérarchie ARM \| Cloud Azure B3 |
| Description meta | Module 1 du cours Cloud Microsoft Azure B3 : Structure mondiale des datacenters Azure, Régions et Zones de Disponibilité (AZs 1, 2, 3), Paires Régionales, hiérarchie de gestion organisationnelle (Root Management Group, Abonnements, Resource Groups), conventions de nommage du Cloud Adoption Framework (CAF) et optimisation financière TCO / FinOps. Notions clés, architectures Azure, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Architecture Globale, Régions, Souscriptions & Hiérarchie ARM |
| 3 | h2 | — | 1. Organisation Mondiale d'Azure : Datacenters, Régions, Zones de Disponibilité et Paires |
| 4 | h2 | — | 2. Hiérarchie de Gestion Organisationnelle ARM (Azure Resource Manager) |
| 5 | h2 | — | 3. Le Cloud Adoption Framework (CAF) : Conventions de Nommage, Tags & FinOps |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |
| 14 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Architecture Globale, Régions, Souscriptions & Hiérarchie ARM
  - **H2** — 1. Organisation Mondiale d'Azure : Datacenters, Régions, Zones de Disponibilité et Paires
      - **H4** — Régions et Zones de Disponibilité (AZs)
      - **H4** — Paires Régionales & Résilience Catastrophe (DR)
  - **H2** — 2. Hiérarchie de Gestion Organisationnelle ARM (Azure Resource Manager)
  - **H2** — 3. Le Cloud Adoption Framework (CAF) : Conventions de Nommage, Tags & FinOps
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Analyse d’une hiérarchie et convention de nommage fictives
    - **H3** — Exercice 2 — Sélecteur de région, Zones de disponibilité et Paires géographiques
    - **H3** — Exercice 3 — Estimateur de coûts TCO et optimisation par Instances Réservées (RI)
  - **H2** — 5. QCM — niveau examen
  - **H2** — 6. Erreurs classiques — récapitulatif
  - **H2** — 7. Méthodologie de résolution
  - **H2** — 8. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 9. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-cloud-azurenav` | Portail → `/`<br>Cloud Azure B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **23** (externes : 2).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Cloud Azure B3 | `../index.html` | `b3-cloud-azure/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-cloud-azure/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-cloud-azure/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-cloud-azure/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-cloud-azure/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-cloud-azure/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-cloud-azure/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-cloud-azure/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-cloud-azure/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-cloud-azure/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-cloud-azure/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-cloud-azure/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-cloud-azure/chapitres/examens.html` | interne |
| documentation Microsoft sur les zones | `https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview` | `https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview` | externe |
| documentation Microsoft | `https://learn.microsoft.com/en-us/azure/governance/management-groups/overview` | `https://learn.microsoft.com/en-us/azure/governance/management-groups/overview` | externe |
| Réviser avec les flashcards | `cartes.html` | `b3-cloud-azure/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-cloud-azure/chapitres/formules.html` | interne |
| Module 2 — Identité Microsoft Entra ID (Azure AD), RBAC & Gouvernance | `chapitre2.html` | `b3-cloud-azure/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Le SLA dépend du service, de sa configuration et des conditions applicables |  | — | `opt` | — | actif | data-correct=1 |
| Un SLA de 99.99% est garanti pour tous les services |  | — | `opt` | — | actif | — |
| Chaque zone correspond forcément à un seul datacenter |  | — | `opt` | — | actif | — |
| Aucun service ne peut avoir de SLA |  | — | `opt` | — | actif | — |
| La réplication automatique de toutes les ressources |  | — | `opt` | — | actif | — |
| Un basculement automatique pour toutes les applications |  | — | `opt` | — | actif | — |
| Ni réplication ni basculement automatique de toutes les ressources |  | — | `opt` | — | actif | data-correct=1 |
| L'impossibilité d'une panne affectant les deux régions |  | — | `opt` | — | actif | — |
| Le Tenant Entra ID |  | — | `opt` | — | actif | — |
| Le Management Group |  | — | `opt` | — | actif | — |
| L'Abonnement (Subscription) |  | — | `opt` | — | actif | data-correct=1 |
| Le Resource Group |  | — | `opt` | — | actif | — |
| rg-api-stage-we-01 |  | — | `opt` | — | actif | data-correct=1 |
| resourcegroup_api_preprod_westeurope |  | — | `opt` | — | actif | — |
| API-STAGE-WESTEUROPE-GROUP |  | — | `opt` | — | actif | — |
| my-rg-api-stage-01 |  | — | `opt` | — | actif | — |
| LRS (Locally Redundant Storage) |  | — | `opt` | — | actif | — |
| ZRS (Zone-Redundant Storage) |  | — | `opt` | — | actif | data-correct=1 |
| GRS (Geo-Redundant Storage) |  | — | `opt` | — | actif | — |
| RA-GRS |  | — | `opt` | — | actif | — |
| Augmentation de la vitesse CPU de 50% |  | — | `opt` | — | actif | — |
| Réduction possible sur le coût du calcul admissible, selon les conditions |  | — | `opt` | — | actif | data-correct=1 |
| Gratuité totale de la bande passante sortante Internet |  | — | `opt` | — | actif | — |
| Disques SSD Premium illimités sans surcoût |  | — | `opt` | — | actif | — |
| Oui, si les deux groupes sont dans le même abonnement |  | — | `opt` | — | actif | — |
| Oui, si elle utilise une étiquette (tag) partagée |  | — | `opt` | — | actif | — |
| Non, chaque ressource appartient obligatoirement à un et un seul Resource Group à un insta |  | — | `opt` | — | actif | data-correct=1 |
| Oui, uniquement pour les réseaux virtuels VNet |  | — | `opt` | — | actif | — |
| Les vCPUs de la machine virtuelle |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `az3-c1-e1` | analyse | 300 | active | `HIERARCHY mg-root/mg-core/sub-prod-01/rg-erp-prod-we-01` | Exercice 1 — Analyse d’une hiérarchie et convention de nommage fictives |
| `az3-c1-e2` | analyse | 300 | active | `REGION westeurope SLA 99.99%` | Exercice 2 — Sélecteur de région, Zones de disponibilité et Paires géographiques |
| `az3-c1-e3` | analyse | 300 | active | `CALC sku=Standard_B2s qty=2 disk=P10 egress_gb=5 commitment=PAYG` | Exercice 3 — Estimateur de coûts TCO et optimisation par Instances Réservées (RI) |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 8 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 3 · elements `code` : 66
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3858 mots · 532 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 20 |
| `box` | 8 |
| `box__title` | 8 |
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
