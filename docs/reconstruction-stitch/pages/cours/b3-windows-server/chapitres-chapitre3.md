# Chapitre 3 — Stratégies de Groupe (GPO), Modèle LSDOU & Gouvernance de Parc

> Fiche extraite du fichier `b3-windows-server/chapitres/chapitre3.html` (550 lignes, 40.5 Ko, sha256 `46c51bf6fff2`).
> Famille : **cours-b3-windows-server** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-windows-server/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Stratégies de Groupe (GPO), Modèle LSDOU &amp; Gouvernance de Parc \| Windows Server B3 |
| Description meta | Chapitre 3 du cours Windows Server B3 : Architecture des Group Policy Objects (conteneur GPC dans AD et modèle GPT dans SYSVOL), cycle d’évaluation et ordre d’application strict LSDOU (Local, Site, Domaine, Unité Organisationnelle), résolution des conflits et arbitrage d’héritage (Enforced / No Override vs Block Inheritance), filtrage fin de sécurité par ACL et filtres dynamiques WMI (WQL), modèles d’administration ADMX/ADML, Central Store, et durcissement de sécurité du parc de machines clientes. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Stratégies de Groupe (GPO), Modèle LSDOU & Gouvernance de Parc |
| 3 | h2 | — | 1. Architecture Interne et Composants d’une GPO (GPC vs GPT) |
| 4 | h2 | — | 2. Cycle d’Évaluation et Ordre de Précédence LSDOU |
| 5 | h2 | — | 3. Arbitrage Avancé : Enforced, Block Inheritance & Filtres WMI |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Stratégies de Groupe (GPO), Modèle LSDOU & Gouvernance de Parc
  - **H2** — 1. Architecture Interne et Composants d’une GPO (GPC vs GPT)
      - **H4** — Le Conteneur GPC (Group Policy Container)
      - **H4** — Le Modèle GPT (Group Policy Template)
  - **H2** — 2. Cycle d’Évaluation et Ordre de Précédence LSDOU
      - **H4** — La Règle Séquentielle L - S - D - O - U
      - **H4** — Ordre de Liaison (Link Order)
  - **H2** — 3. Arbitrage Avancé : Enforced, Block Inheritance & Filtres WMI
      - **H4** — Blocage d’Héritage vs Application Forcée (Enforced)
      - **H4** — Filtrage de Sécurité & Requêtes WMI
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur de précédence de stratégies de groupe (Modèle LSDOU)
    - **H3** — Exercice 2 — Moteur d’arbitrage GPO : Enforced (No Override) vs Block Inheritance
    - **H3** — Exercice 3 — Évaluateur de filtres WMI et filtrage de sécurité (Security Filtering)
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
| nav | `b3-windows-servernav` | Portail → `/`<br>Windows Server B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Windows Server B3 | `../index.html` | `b3-windows-server/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-windows-server/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-windows-server/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-windows-server/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-windows-server/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-windows-server/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-windows-server/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-windows-server/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-windows-server/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-windows-server/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-windows-server/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-windows-server/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-windows-server/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-windows-server/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-windows-server/chapitres/formules.html` | interne |
| Chapitre 4 — Services de Fichiers, Permissions NTFS vs Partage SMB & Espaces de Stockage | `chapitre4.html` | `b3-windows-server/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| OU -> Domaine -> Site -> Local |  | — | `opt` | — | actif | — |
| Local -> Site -> Domaine -> Unité Organisationnelle (LSDOU) |  | — | `opt` | — | actif | data-correct=1 |
| Domaine -> Local -> OU -> Site |  | — | `opt` | — | actif | — |
| Par ordre alphabétique du nom des stratégies |  | — | `opt` | — | actif | — |
| Dans le répertoire C:\Windows\System32\config |  | — | `opt` | — | actif | — |
| Directement dans la base de registre locale |  | — | `opt` | — | actif | — |
| Dans le partage réseau SYSVOL répliqué entre contrôleurs de domaine |  | — | `opt` | — | actif | data-correct=1 |
| Sur le site web de support de Microsoft |  | — | `opt` | — | actif | — |
| La stratégie de domaine est totalement bloquée |  | — | `opt` | — | actif | — |
| La stratégie de domaine s’applique obligatoirement et ne peut pas être écrasée |  | — | `opt` | — | actif | data-correct=1 |
| Le serveur affiche un écran bleu BSoD |  | — | `opt` | — | actif | — |
| L’OU enfant est automatiquement supprimée de l’annuaire |  | — | `opt` | — | actif | — |
| Celle dont le Link Order est égal à 1 |  | — | `opt` | — | actif | data-correct=1 |
| Celle dont le Link Order est égal à 3 |  | — | `opt` | — | actif | — |
| Celle qui contient le plus de paramètres |  | — | `opt` | — | actif | — |
| Celle créée le plus récemment |  | — | `opt` | — | actif | — |
| Contrôle total (Full Control) |  | — | `opt` | — | actif | — |
| Appliquer la stratégie de groupe (Apply Group Policy) en plus du droit Lire (Read) |  | — | `opt` | — | actif | data-correct=1 |
| Écriture seule |  | — | `opt` | — | actif | — |
| Supprimer l’objet |  | — | `opt` | — | actif | — |
| À chiffrer le mot de passe de l’administrateur |  | — | `opt` | — | actif | — |
| À conditionner l’application de la GPO à des critères matériels ou de version d’OS évalués |  | — | `opt` | — | actif | data-correct=1 |
| À supprimer les fichiers temporaires du poste client |  | — | `opt` | — | actif | — |
| À bloquer les ports USB du serveur |  | — | `opt` | — | actif | — |
| Dans C:\Program Files\Microsoft GPO |  | — | `opt` | — | actif | — |
| Dans \\domaine\SYSVOL\domaine\Policies\PolicyDefinitions |  | — | `opt` | — | actif | data-correct=1 |
| Sur une clé USB connectée au contrôleur principal |  | — | `opt` | — | actif | — |
| Dans la base de registre HKEY_LOCAL_MACHINE |  | — | `opt` | — | actif | — |
| ping /all |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `ws3-c3-e1` | analyse | 300 | active | `GPO name=DefaultDomainPolicy level=DOMAIN link_order=1 param=MaxPasswordAge value=42 GPO name=LocalSecurity level=LOCAL link_order=1 param=MaxPasswordAge value=90 GPO name=OUPolicy level=OU link_order=1 param=MaxPasswordAge value=30` | Exercice 1 — Calculateur de précédence de stratégies de groupe (Modèle LSDOU) |
| `ws3-c3-e2` | analyse | 300 | active | `OU_SETTING ou=OU_Finance block_inheritance=ENABLED GPO name=GPO_Securite level=DOMAIN enforced=ENABLED param=MinPasswordLength value=14 GPO name=GPO_Domaine level=DOMAIN enforced=DISABLED param=ScreenTimeout value=15 GPO name=GPO_Finance level=OU enforced=DISABLED param=MinPasswordLength value=8 GPO name=GPO_Finance level=OU enforced=DISABLED param=ScreenTimeout value=60` | Exercice 2 — Moteur d’arbitrage GPO : Enforced (No Override) vs Block Inheritance |
| `ws3-c3-e3` | analyse | 300 | active | `CLIENT name=PC-DEV-01 os_build=19045 arch=64BIT ram_gb=16 groups=Domain_Computers,DevWorkstations GPO name=GPO_BitLocker security_groups=Domain_Computers min_os_build=19041 arch=ANY min_ram_gb=4 GPO name=GPO_CADSoftware security_groups=Engineers min_os_build=19041 arch=64BIT min_ram_gb=32` | Exercice 3 — Évaluateur de filtres WMI et filtrage de sécurité (Security Filtering) |

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

- Tableaux : 0
- Blocs `pre` : 3 · elements `code` : 9
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cpu`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3423 mots · 405 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 66. Les plus frequentes :

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
| `card` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
| `grid-2` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |

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
