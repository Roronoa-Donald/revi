# Chapitre 3 — Calcul & Virtualisation Azure (Azure Compute, VMSS & PaaS)

> Fiche extraite du fichier `b3-cloud-azure/chapitres/chapitre3.html` (557 lignes, 43.3 Ko, sha256 `23d941cfdba5`).
> Famille : **cours-b3-cloud-azure** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cloud-azure/chapitres/chapitre3.html` |
| Titre du document | Module 3 — Calcul &amp; Virtualisation Azure (Azure Compute, VMSS &amp; PaaS) \| Cloud Azure B3 |
| Description meta | Module 3 du cours Cloud Microsoft Azure B3 : Machines virtuelles Azure IaaS, dimensionnement par familles et séries (B, D, E, F), disques managés (Standard HDD/SSD, Premium SSD, Ultra Disk), architectures de haute disponibilité (Availability Sets avec domaines de panne et de mise à jour, Availability Zones), modèle théorique de disponibilité composite, groupes de machines identiques (VMSS) avec auto-scaling et cooldown, et hébergement PaaS managé Azure App Service avec slots de déploiement et préchauffage configurable avant swap. Notions clés, architectures Azure, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Calcul & Virtualisation Azure (Azure Compute, VMSS & PaaS) |
| 3 | h2 | — | 1. Machines Virtuelles Azure IaaS : Familles, Séries et Disques Managés |
| 4 | h2 | — | 2. Haute Disponibilité : Availability Sets, Zones & Modèle de Disponibilité Composite |
| 5 | h2 | — | 3. Évolutivité avec VMSS et Déploiements Contrôlés sur App Service |
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

- **H1** — Chapitre 3 — Calcul & Virtualisation Azure (Azure Compute, VMSS & PaaS)
  - **H2** — 1. Machines Virtuelles Azure IaaS : Familles, Séries et Disques Managés
      - **H4** — Les Grandes Familles de Séries Azure
      - **H4** — Types de Disques Managés (Managed Disks)
  - **H2** — 2. Haute Disponibilité : Availability Sets, Zones & Modèle de Disponibilité Composite
  - **H2** — 3. Évolutivité avec VMSS et Déploiements Contrôlés sur App Service
      - **H4** — Virtual Machine Scale Sets (VMSS)
      - **H4** — Azure App Service & Deployment Slots
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Dimensionneur de VM Azure et calcul de SLA combiné
    - **H3** — Exercice 2 — Simulateur d'Auto-scaling VMSS
    - **H3** — Exercice 3 — Gestionnaire de déploiement Azure App Service & Slot Swap
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
| recommandations Microsoft sur les SLA | `https://learn.microsoft.com/en-us/azure/reliability/concept-service-level-agreements` | `https://learn.microsoft.com/en-us/azure/reliability/concept-service-level-agreements` | externe |
| instructions Microsoft sur les slots | `https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots` | `https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots` | externe |
| Réviser avec les flashcards | `cartes.html` | `b3-cloud-azure/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-cloud-azure/chapitres/formules.html` | interne |
| Module 4 — Réseau Virtuel Azure (Azure Virtual Network - VNet & Sécurité) | `chapitre4.html` | `b3-cloud-azure/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Série F |  | — | `opt` | — | actif | — |
| Série E |  | — | `opt` | — | actif | data-correct=1 |
| Série B |  | — | `opt` | — | actif | — |
| Série A |  | — | `opt` | — | actif | — |
| 1 |  | — | `opt` | — | actif | — |
| 2 ou 3 |  | — | `opt` | — | actif | data-correct=1 |
| 10 |  | — | `opt` | — | actif | — |
| 20 |  | — | `opt` | — | actif | — |
| 8.76 heures |  | — | `opt` | — | actif | data-correct=1 |
| 43.8 heures |  | — | `opt` | — | actif | — |
| 52.6 heures |  | — | `opt` | — | actif | — |
| 876 heures |  | — | `opt` | — | actif | — |
| 99.9% |  | — | `opt` | — | actif | — |
| 99.8001% |  | — | `opt` | — | actif | data-correct=1 |
| 100% |  | — | `opt` | — | actif | — |
| 99.0% |  | — | `opt` | — | actif | — |
| À faire chuter la température matérielle des processeurs du datacenter |  | — | `opt` | — | actif | — |
| À empêcher de nouvelles opérations de mise à l'échelle pendant un délai défini afin de lai |  | — | `opt` | — | actif | data-correct=1 |
| À diviser la facture par deux pendant les heures creuses |  | — | `opt` | — | actif | — |
| À forcer l'arrêt automatique des VMs la nuit |  | — | `opt` | — | actif | — |
| Le code 500 est accepté pour le préchauffage et peut ne pas empêcher le swap |  | — | `opt` | — | actif | data-correct=1 |
| Le swap est toujours annulé et un rollback des données est automatique |  | — | `opt` | — | actif | — |
| Le code 500 supprime le slot de staging |  | — | `opt` | — | actif | — |
| Le code 500 impose un changement de forfait |  | — | `opt` | — | actif | — |
| Standard HDD |  | — | `opt` | — | actif | — |
| Standard SSD |  | — | `opt` | — | actif | — |
| Premium SSD |  | — | `opt` | — | actif | — |
| Ultra Disk |  | — | `opt` | — | actif | data-correct=1 |
| Tous les Update Domains sont redémarrés simultanément lors des mises à jour Azure |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `az3-c3-e1` | analyse | 300 | active | `TIER name=web vcpu=2 ram_gb=8 burst=false disk=SSD_PREM redundancy=AZONE TIER name=db vcpu=4 ram_gb=32 burst=false disk=SSD_PREM redundancy=ASET` | Exercice 1 — Dimensionneur de VM Azure et calcul de SLA combiné |
| `az3-c3-e2` | analyse | 300 | active | `CONFIG min=2 max=6 scale_out_cpu=75 scale_in_cpu=25 step=2 cooldown=2 METRIC step=1 cpu=80 METRIC step=2 cpu=85 METRIC step=3 cpu=80 METRIC step=4 cpu=40` | Exercice 2 — Simulateur d'Auto-scaling VMSS |
| `az3-c3-e3` | analyse | 300 | active | `DEPLOY_STAGE version=v1.1.0 probe=200 SWAP_SLOTS auto_rollback=true STATUS` | Exercice 3 — Gestionnaire de déploiement Azure App Service & Slot Swap |

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
- Blocs `pre` : 3 · elements `code` : 70
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3953 mots · 558 noeuds HTML

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
| `card` | 4 |
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
