# Chapitre 2 — Identité Microsoft Entra ID (Azure AD), RBAC & Gouvernance

> Fiche extraite du fichier `b3-cloud-azure/chapitres/chapitre2.html` (548 lignes, 41.4 Ko, sha256 `dbf64eba3cec`).
> Famille : **cours-b3-cloud-azure** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cloud-azure/chapitres/chapitre2.html` |
| Titre du document | Module 2 — Identité Microsoft Entra ID (Azure AD), RBAC &amp; Gouvernance \| Cloud Azure B3 |
| Description meta | Module 2 du cours Cloud Microsoft Azure B3 : Gestion centralisée des identités avec Microsoft Entra ID (utilisateurs, groupes, Managed Identities pour ressources Azure), contrôle d’accès basé sur les rôles (Azure RBAC, Actions / NotActions, wildcards, rôles intégrés Owner/Contributor/Reader et rôles personnalisés), gouvernance déclarative par Azure Policy, verrous de ressources (Resource Locks) et sécurisation des secrets via Azure Key Vault. Notions clés, architectures Azure, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Identité Microsoft Entra ID (Azure AD), RBAC & Gouvernance |
| 3 | h2 | — | 1. Identité Moderne avec Microsoft Entra ID & Managed Identities |
| 4 | h2 | — | 2. Contrôle d'Accès Granulaire Azure RBAC (Role-Based Access Control) |
| 5 | h2 | — | 3. Gouvernance avec Azure Policy, Resource Locks & Azure Key Vault |
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

- **H1** — Chapitre 2 — Identité Microsoft Entra ID (Azure AD), RBAC & Gouvernance
  - **H2** — 1. Identité Moderne avec Microsoft Entra ID & Managed Identities
      - **H4** — Objets d'Identité Fondamentaux
      - **H4** — Managed Identities (Identités Managées)
  - **H2** — 2. Contrôle d'Accès Granulaire Azure RBAC (Role-Based Access Control)
  - **H2** — 3. Gouvernance avec Azure Policy, Resource Locks & Azure Key Vault
      - **H4** — Azure Policy & Resource Locks
      - **H4** — Sécurité Azure Key Vault
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Évaluateur de permissions Azure RBAC
    - **H3** — Exercice 2 — Auditeur de conformité Azure Policy
    - **H3** — Exercice 3 — Analyseur de sécurité Azure Key Vault & Expiration de secrets
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
| Module 3 — Calcul & Virtualisation Azure (Azure Compute, VMSS & PaaS) | `chapitre3.html` | `b3-cloud-azure/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Accélération de la vitesse de la carte réseau virtuelle |  | — | `opt` | — | actif | — |
| Suppression totale des identifiants et mots de passe stockés en clair dans le code de l'ap |  | — | `opt` | — | actif | data-correct=1 |
| Gratuité des requêtes SQL exécutées |  | — | `opt` | — | actif | — |
| Chiffrement automatique des disques physiques du datacenter |  | — | `opt` | — | actif | — |
| NotActions s'applique uniquement si la ressource est située hors d'Europe |  | — | `opt` | — | actif | — |
| Une action est autorisée si elle est présente dans Actions ET absente de NotActions |  | — | `opt` | — | actif | data-correct=1 |
| NotActions remplace Actions et autorise toutes les opérations inverses |  | — | `opt` | — | actif | — |
| Actions est réservé aux administrateurs, NotActions aux utilisateurs réguliers |  | — | `opt` | — | actif | — |
| Owner |  | — | `opt` | — | actif | — |
| Contributor |  | — | `opt` | — | actif | data-correct=1 |
| Reader |  | — | `opt` | — | actif | — |
| User Access Administrator |  | — | `opt` | — | actif | — |
| Audit |  | — | `opt` | — | actif | — |
| Deny |  | — | `opt` | — | actif | data-correct=1 |
| Append |  | — | `opt` | — | actif | — |
| Disabled |  | — | `opt` | — | actif | — |
| ReadOnly |  | — | `opt` | — | actif | — |
| CanNotDelete |  | — | `opt` | — | actif | data-correct=1 |
| NoModification |  | — | `opt` | — | actif | — |
| WriteOnly |  | — | `opt` | — | actif | — |
| La modification est acceptée mais signalée par email |  | — | `opt` | — | actif | — |
| La modification est rejetée avec une erreur d'autorisation, car ReadOnly bloque toute écri |  | — | `opt` | — | actif | data-correct=1 |
| La modification est placée dans une file d'attente d'approbation |  | — | `opt` | — | actif | — |
| Le verrou bascule automatiquement en mode CanNotDelete |  | — | `opt` | — | actif | — |
| Supprimer immédiatement les données sans laisser de trace |  | — | `opt` | — | actif | — |
| Conserver les secrets et clés supprimés dans un état récupérable pendant une période param |  | — | `opt` | — | actif | data-correct=1 |
| Diviser par deux le coût de stockage des secrets |  | — | `opt` | — | actif | — |
| Chiffrer les secrets avec un algorithme plus léger |  | — | `opt` | — | actif | — |
| Firewall IP |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `az3-c2-e1` | analyse | 300 | active | `ROLE VM_Operator CHECK_ACTION Microsoft.Compute/virtualMachines/restart/action CHECK_ACTION Microsoft.Compute/virtualMachines/delete` | Exercice 1 — Évaluateur de permissions Azure RBAC |
| `az3-c2-e2` | analyse | 300 | active | `RESOURCE id=vm-web-01 type=Microsoft.Compute/virtualMachines location=westeurope sku=Standard_D4s_v5 tags=Environment:prod,CostCenter:IT-401` | Exercice 2 — Auditeur de conformité Azure Policy |
| `az3-c2-e3` | analyse | 300 | active | `VAULT name=kv-prod-we soft_delete=enabled purge_protection=enabled auth_mode=rbac current_day=100 SECRET name=db-password expires_at=125 SECRET name=api-key expires_at=0` | Exercice 3 — Analyseur de sécurité Azure Key Vault & Expiration de secrets |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 6 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 3 · elements `code` : 65
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3422 mots · 536 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 18 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 6 |
| `box__title` | 6 |
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
