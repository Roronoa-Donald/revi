# Chapitre 2 — Sécurité des Identités IAM, Comptes de Service & Stratégies d'Accès

> Fiche extraite du fichier `b3-google-cloud/chapitres/chapitre2.html` (527 lignes, 39.9 Ko, sha256 `2d2e41966420`).
> Famille : **cours-b3-google-cloud** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-google-cloud/chapitres/chapitre2.html` |
| Titre du document | Module 2 — Sécurité des Identités IAM, Comptes de Service & Stratégies d'Accès \| Google Cloud Platform B3 |
| Description meta | Module 2 du cours Google Cloud Platform B3 : Gestion des identités et des accès (Cloud IAM), principe du moindre privilège (Least Privilege), typologie des membres (utilisateurs, groupes Workspace, comptes de service), taxonomie des rôles (rôles de base très larges à limiter, rôles prédéfinis recommandés, rôles personnalisés), liaisons de rôles (Role Bindings) et conditions IAM CEL, gouvernance des comptes de service, risques des clés JSON exportées et déploiement de Workload Identity Federation sans clé. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Sécurité des Identités IAM, Comptes de Service & Stratégies d'Accès |
| 3 | h2 | — | 1. Modèle Fondamental Cloud IAM & Principe du Moindre Privilège |
| 4 | h2 | — | 2. Typologie des Rôles : Primitifs, Prédéfinis & Personnalisés (Custom) |
| 5 | h2 | — | 3. Liaisons IAM (Role Bindings) & Conditions d'Accès CEL |
| 6 | h2 | — | 4. Comptes de Service, Risques des Clés & Workload Identity |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 5 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 2 — Sécurité des Identités IAM, Comptes de Service & Stratégies d'Accès
  - **H2** — 1. Modèle Fondamental Cloud IAM & Principe du Moindre Privilège
      - **H4** — 1. Les Membres (Principals)
      - **H4** — 2. Les Rôles (Collections)
      - **H4** — 3. Les Ressources Cibles
  - **H2** — 2. Typologie des Rôles : Primitifs, Prédéfinis & Personnalisés (Custom)
      - **H4** — Rôles Primitifs (Basiques)
      - **H4** — Rôles Prédéfinis (Predefined)
      - **H4** — Rôles Personnalisés (Custom)
  - **H2** — 3. Liaisons IAM (Role Bindings) & Conditions d'Accès CEL
      - **H4** — Structure d'une Liaison IAM
      - **H4** — Conditions IAM avec CEL (Common Expression Language)
  - **H2** — 4. Comptes de Service, Risques des Clés & Workload Identity
      - **H4** — Le Danger Critique des Clés JSON Téléchargées
      - **H4** — La Solution Moderne : Workload Identity
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Analyse de liaisons IAM et audit des rôles de base
    - **H3** — Exercice 2 — Générateur et Linter de Rôles Personnalisés (Custom Roles)
    - **H3** — Exercice 3 — Gouvernance des Comptes de Service et Rotation de Clés
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
| nav | `b3-google-cloudnav` | Portail → `/`<br>Google Cloud Platform B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **22** (externes : 1).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Google Cloud Platform B3 | `../index.html` | `b3-google-cloud/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-google-cloud/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-google-cloud/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-google-cloud/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-google-cloud/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-google-cloud/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-google-cloud/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-google-cloud/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-google-cloud/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-google-cloud/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-google-cloud/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-google-cloud/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-google-cloud/chapitres/examens.html` | interne |
| politiques IAM deny | `https://docs.cloud.google.com/iam/docs/deny-overview` | `https://docs.cloud.google.com/iam/docs/deny-overview` | externe |
| Réviser avec les flashcards | `cartes.html` | `b3-google-cloud/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-google-cloud/chapitres/formules.html` | interne |
| Module 3 — Calcul & Virtualisation (Compute Engine, GKE, Cloud Run & App Engine) | `chapitre3.html` | `b3-google-cloud/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce qu'ils sont payants |  | — | `opt` | — | actif | — |
| Parce qu'ils accordent des privilèges excessifs sur tous les services du projet et violent |  | — | `opt` | — | actif | data-correct=1 |
| Parce qu'ils ne fonctionnent pas avec Linux |  | — | `opt` | — | actif | — |
| Parce qu'ils empêchent l'accès à la console |  | — | `opt` | — | actif | — |
| Télécharger une clé JSON sur chaque conteneur |  | — | `opt` | — | actif | — |
| Utiliser GKE Workload Identity pour lier le compte Kubernetes au compte IAM |  | — | `opt` | — | actif | data-correct=1 |
| Donner le rôle Owner au cluster |  | — | `opt` | — | actif | — |
| Désactiver l'authentification sur les API |  | — | `opt` | — | actif | — |
| action:resource:service |  | — | `opt` | — | actif | — |
| service.resource.action (ex: compute.instances.create) |  | — | `opt` | — | actif | data-correct=1 |
| service/action/resource |  | — | `opt` | — | actif | — |
| permission_service_action |  | — | `opt` | — | actif | — |
| 30 jours |  | — | `opt` | — | actif | — |
| 90 jours |  | — | `opt` | — | actif | data-correct=1 |
| 180 jours |  | — | `opt` | — | actif | — |
| 365 jours |  | — | `opt` | — | actif | — |
| SQL |  | — | `opt` | — | actif | — |
| JavaScript |  | — | `opt` | — | actif | — |
| CEL (Common Expression Language) |  | — | `opt` | — | actif | data-correct=1 |
| Bash |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `gcp3-c2-e1` | analyse | 300 | active | `BIND role=roles/storage.objectViewer member=user:alice@cloud.corp CHECK_ROLE member=user:alice@cloud.corp role=roles/storage.objectViewer AUDIT_PRIMITIVE_ROLES` | Exercice 1 — Analyse de liaisons IAM et audit des rôles de base |
| `gcp3-c2-e2` | analyse | 300 | active | `CUSTOM_ROLE_LINT id=devCustomStorage stage=GA perms=storage.buckets.get,storage.objects.list,storage.objects.get` | Exercice 2 — Générateur et Linter de Rôles Personnalisés (Custom Roles) |
| `gcp3-c2-e3` | analyse | 300 | active | `AUDIT_SA email=gke-app@proj-prod.iam.gserviceaccount.com auth_mode=WORKLOAD_IDENTITY AUDIT_SA email=legacy-app@proj-prod.iam.gserviceaccount.com auth_mode=SERVICE_ACCOUNT_KEY key_id=key-abc-123 age_days=45` | Exercice 3 — Gouvernance des Comptes de Service et Rotation de Clés |

- QCM : 1 bloc(s), **5 question(s)**.
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

- Tableaux : 0
- Blocs `pre` : 4 · elements `code` : 63
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3278 mots · 502 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 20 |
| `opt` | 20 |
| `card` | 10 |
| `box` | 8 |
| `box__title` | 8 |
| `q` | 5 |
| `q__stem` | 5 |
| `opts` | 5 |
| `q__exp` | 5 |
| `grid` | 4 |
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

Attributs `data-*` : `data-correct` (5), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
