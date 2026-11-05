# Chapitre 6 — Surveillance, Gestion des Coûts & Automatisation (IaC & KQL)

> Fiche extraite du fichier `b3-cloud-azure/chapitres/chapitre6.html` (569 lignes, 42.8 Ko, sha256 `171fc5431428`).
> Famille : **cours-b3-cloud-azure** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cloud-azure/chapitres/chapitre6.html` |
| Titre du document | Module 6 — Surveillance, Gestion des Coûts &amp; Automatisation (IaC &amp; KQL) \| Cloud Azure B3 |
| Description meta | Module 6 du cours Cloud Microsoft Azure B3 : Observabilité de bout en bout avec Azure Monitor, collecte de métriques et alertes automatisées (Action Groups), analyse des journaux dans un espace Log Analytics Workspace avec le langage de requête KQL (Kusto Query Language), évaluation de la posture de sécurité avec Microsoft Defender for Cloud et le Secure Score, gouvernance financière FinOps avec Azure Cost Management et budgets d’alerte, et automatisation déclarative par Infrastructure as Code (IaC Bicep et templates ARM). Notions clés, architectures Azure, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Surveillance, Gestion des Coûts & Automatisation (IaC & KQL) |
| 3 | h2 | — | 1. Observabilité Globale avec Azure Monitor & Règles d'Alerte |
| 4 | h2 | — | 2. Analyse Avancée des Journaux avec Log Analytics & KQL (Kusto Query Language) |
| 5 | h2 | — | 3. Microsoft Defender for Cloud, FinOps Budgets & Infrastructure as Code (Bicep) |
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

- **H1** — Chapitre 6 — Surveillance, Gestion des Coûts & Automatisation (IaC & KQL)
  - **H2** — 1. Observabilité Globale avec Azure Monitor & Règles d'Alerte
      - **H4** — Les Deux Piliers Télémétriques
      - **H4** — Règles d'Alerte & Action Groups
  - **H2** — 2. Analyse Avancée des Journaux avec Log Analytics & KQL (Kusto Query Language)
  - **H2** — 3. Microsoft Defender for Cloud, FinOps Budgets & Infrastructure as Code (Bicep)
      - **H4** — Sécurité : Defender for Cloud & Secure Score
      - **H4** — FinOps & IaC (Bicep / ARM)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Interpréteur de requêtes Log Analytics KQL
    - **H3** — Exercice 2 — Gestionnaire d'alertes Azure Monitor et suivi budgétaire
    - **H3** — Exercice 3 — Linter et ordonnanceur de gabarit Bicep / ARM
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

Liens sortants : **21** (externes : 0).

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
| Réviser avec les flashcards | `cartes.html` | `b3-cloud-azure/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-cloud-azure/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `b3-cloud-azure/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| select |  | — | `opt` | — | actif | — |
| filter |  | — | `opt` | — | actif | — |
| where |  | — | `opt` | — | actif | data-correct=1 |
| having |  | — | `opt` | — | actif | — |
| group by |  | — | `opt` | — | actif | — |
| summarize count() by |  | — | `opt` | — | actif | data-correct=1 |
| aggregate() |  | — | `opt` | — | actif | — |
| count_distinct |  | — | `opt` | — | actif | — |
| Azure Cost Management |  | — | `opt` | — | actif | — |
| Microsoft Defender for Cloud |  | — | `opt` | — | actif | data-correct=1 |
| Azure Network Watcher |  | — | `opt` | — | actif | — |
| Azure Bastion |  | — | `opt` | — | actif | — |
| Notification Hub |  | — | `opt` | — | actif | — |
| Action Group |  | — | `opt` | — | actif | data-correct=1 |
| Alert Manager |  | — | `opt` | — | actif | — |
| Dispatch Queue |  | — | `opt` | — | actif | — |
| Sev0 |  | — | `opt` | — | actif | data-correct=1 |
| Sev1 |  | — | `opt` | — | actif | — |
| Sev3 |  | — | `opt` | — | actif | — |
| Sev4 |  | — | `opt` | — | actif | — |
| Bicep ne fonctionne que sous Linux |  | — | `opt` | — | actif | — |
| Syntaxe beaucoup plus concise et lisible, absence de guillemets et accolades superflues, e |  | — | `opt` | — | actif | data-correct=1 |
| Bicep est payant tandis qu'ARM est gratuit |  | — | `opt` | — | actif | — |
| Bicep supprime les règles de pare-feu |  | — | `opt` | — | actif | — |
| Actual concerne les devises en euros, Forecasted en dollars |  | — | `opt` | — | actif | — |
| Actual se déclenche sur les dépenses réelles déjà facturées, Forecasted sur la projection |  | — | `opt` | — | actif | data-correct=1 |
| Forecasted s'applique uniquement aux disques SSD |  | — | `opt` | — | actif | — |
| Il n'y a aucune différence technique |  | — | `opt` | — | actif | — |
| Le moteur ARM crée une ressource fictive pour casser la boucle |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `az3-c6-e1` | analyse | 300 | active | `EVENT rg=rg-prod op=RestartVM status=Failed duration_ms=450 EVENT rg=rg-prod op=DeleteDisk status=Failed duration_ms=1200 EVENT rg=rg-prod op=RestartVM status=Failed duration_ms=300 EVENT rg=rg-dev op=RestartVM status=Success duration_ms=150 KQL where status == "Failed" \| summarize count() by op \| order by count_ desc \| take 2` | Exercice 1 — Interpréteur de requêtes Log Analytics KQL |
| `az3-c6-e2` | analyse | 300 | active | `BUDGET amount=1000 currency=EUR ALERT_RULE metric=CPU threshold=80 severity=Sev1 ALERT_RULE metric=SPEND_ACTUAL threshold_pct=80 severity=Sev2 RECORD metric=CPU value=85.5 RECORD metric=SPEND_ACTUAL value=750.0` | Exercice 2 — Gestionnaire d'alertes Azure Monitor et suivi budgétaire |
| `az3-c6-e3` | analyse | 300 | active | `PARAM name=env type=string RESOURCE name=vnet01 type=Microsoft.Network/virtualNetworks dependsOn=[] RESOURCE name=nic01 type=Microsoft.Network/networkInterfaces dependsOn=[vnet01] RESOURCE name=vm01 type=Microsoft.Compute/virtualMachines dependsOn=[nic01]` | Exercice 3 — Linter et ordonnanceur de gabarit Bicep / ARM |

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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 4 · elements `code` : 61
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3599 mots · 524 noeuds HTML

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
