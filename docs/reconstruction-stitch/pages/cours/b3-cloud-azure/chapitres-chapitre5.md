# Chapitre 5 — Stockage Azure (Blob, Files, Disques) et Données Managées

> Fiche extraite du fichier `b3-cloud-azure/chapitres/chapitre5.html` (552 lignes, 40.7 Ko, sha256 `c208d856ce71`).
> Famille : **cours-b3-cloud-azure** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cloud-azure/chapitres/chapitre5.html` |
| Titre du document | Module 5 — Stockage Azure (Blob, Files, Disques) et Données Managées \| Cloud Azure B3 |
| Description meta | Module 5 du cours Cloud Microsoft Azure B3 : Comptes de stockage Azure (Storage Accounts standard v2), services de stockage de données (Blob Storage non structuré, partages de fichiers SMB/NFS Azure Files, Azure Queues et Tables), gestion automatique du cycle de vie des objets (Lifecycle Management : Hot, Cool, Cold, Archive), politiques de réplication des données (LRS, ZRS, GRS, GZRS), sécurité par signatures d’accès partagé (SAS Tokens) et comparatif des bases de données managées (Azure SQL Database vs Azure Cosmos DB). Notions clés, architectures Azure, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Stockage Azure (Blob, Files, Disques) et Données Managées |
| 3 | h2 | — | 1. Comptes de Stockage Azure (Storage Accounts) & Éventail de Services |
| 4 | h2 | — | 2. Paliers d'Accès (Access Tiers), Cycle de Vie & Réplication des Données |
| 5 | h2 | — | 3. Sécurité par Jetons SAS & Bases de Données Managées (SQL vs Cosmos DB) |
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

- **H1** — Chapitre 5 — Stockage Azure (Blob, Files, Disques) et Données Managées
  - **H2** — 1. Comptes de Stockage Azure (Storage Accounts) & Éventail de Services
      - **H4** — Blob Storage (Objets Non Structurés)
      - **H4** — Azure Files, Queues & Tables
  - **H2** — 2. Paliers d'Accès (Access Tiers), Cycle de Vie & Réplication des Données
  - **H2** — 3. Sécurité par Jetons SAS & Bases de Données Managées (SQL vs Cosmos DB)
      - **H4** — Signatures d'Accès Partagé (SAS Tokens)
      - **H4** — Azure SQL Database vs Cosmos DB
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Simulateur de cycle de vie Azure Blob Storage
    - **H3** — Exercice 2 — Validateur de requêtes avec jetons SAS
    - **H3** — Exercice 3 — Sélecteur d'architecture de données Azure
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

Liens sortants : **22** (externes : 1).

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
| référence Microsoft | `https://learn.microsoft.com/en-us/rest/api/storageservices/create-account-sas` | `https://learn.microsoft.com/en-us/rest/api/storageservices/create-account-sas` | externe |
| Réviser avec les flashcards | `cartes.html` | `b3-cloud-azure/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-cloud-azure/chapitres/formules.html` | interne |
| Module 6 — Surveillance, Gestion des Coûts & Automatisation (IaC & KQL) | `chapitre6.html` | `b3-cloud-azure/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| FTP |  | — | `opt` | — | actif | — |
| SMB 3.0 / NFS |  | — | `opt` | — | actif | data-correct=1 |
| Telnet |  | — | `opt` | — | actif | — |
| TFTP |  | — | `opt` | — | actif | — |
| 1 jour |  | — | `opt` | — | actif | — |
| 7 jours |  | — | `opt` | — | actif | — |
| 30 jours |  | — | `opt` | — | actif | data-correct=1 |
| 90 jours |  | — | `opt` | — | actif | — |
| Hot |  | — | `opt` | — | actif | — |
| Cool |  | — | `opt` | — | actif | — |
| Cold |  | — | `opt` | — | actif | — |
| Archive |  | — | `opt` | — | actif | data-correct=1 |
| ssl=true |  | — | `opt` | — | actif | — |
| spr=https |  | — | `opt` | — | actif | data-correct=1 |
| tls=1.3 |  | — | `opt` | — | actif | — |
| secure=yes |  | — | `opt` | — | actif | — |
| Pour héberger une application comptable nécessitant des jointures SQL complexes et des clé |  | — | `opt` | — | actif | — |
| Pour une application mobile mondiale requérant une latence sub-10ms, un modèle de données |  | — | `opt` | — | actif | data-correct=1 |
| Pour réduire la taille de la mémoire RAM d'une VM |  | — | `opt` | — | actif | — |
| Uniquement pour les fichiers PDF archivés |  | — | `opt` | — | actif | — |
| 5 Go |  | — | `opt` | — | actif | — |
| 100 Go |  | — | `opt` | — | actif | — |
| 5 To |  | — | `opt` | — | actif | — |
| Environ 190.7 To |  | — | `opt` | — | actif | data-correct=1 |
| LRS |  | — | `opt` | — | actif | — |
| ZRS |  | — | `opt` | — | actif | — |
| GRS |  | — | `opt` | — | actif | — |
| GZRS (Geo-Zone-Redundant Storage) |  | — | `opt` | — | actif | data-correct=1 |
| Blob Storage |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `az3-c5-e1` | analyse | 300 | active | `POLICY cool_days=30 archive_days=90 delete_days=365 BLOB name=log-recent.csv size_gb=10 age_days=10 BLOB name=backup-q1.bak size_gb=100 age_days=45 BLOB name=archive-2023.tar size_gb=500 age_days=120 BLOB name=temp-2022.tmp size_gb=50 age_days=400` | Exercice 1 — Simulateur de cycle de vie Azure Blob Storage |
| `az3-c5-e2` | analyse | 300 | active | `SAS_CONFIG sp=rw st=100 se=200 spr=https REQUEST method=GET time=150 proto=https REQUEST method=DELETE time=150 proto=https` | Exercice 2 — Validateur de requêtes avec jetons SAS |
| `az3-c5-e3` | analyse | 300 | active | `REQUIREMENT workload=app-erp model=RELATIONAL REQUIREMENT workload=mobile-cart model=NOSQL_DOCUMENT` | Exercice 3 — Sélecteur d'architecture de données Azure |

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

- Tableaux : 1 (0 lignes / 5 en-tetes)
- Blocs `pre` : 3 · elements `code` : 72
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3552 mots · 563 noeuds HTML

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
