# Chapitre 2 — Annuaire d’Entreprise Active Directory (AD DS), Gouvernance AGDLP & Rôles FSMO

> Fiche extraite du fichier `b3-windows-server/chapitres/chapitre2.html` (583 lignes, 41.3 Ko, sha256 `b0f4afeff657`).
> Famille : **cours-b3-windows-server** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-windows-server/chapitres/chapitre2.html` |
| Titre du document | Chapitre 2 — Annuaire d’Entreprise Active Directory (AD DS), Gouvernance AGDLP &amp; Rôles FSMO \| Windows Server B3 |
| Description meta | Chapitre 2 du cours Windows Server B3 : Architecture hiérarchique Active Directory Domain Services (Schéma, Forêt, Arbres, Domaines et Unités Organisationnelles OU), contrôleurs de domaine (DC) et réplication multi-maîtres, les 5 rôles FSMO de forêt et domaine, modèle de gouvernance des accès AGDLP / AGUDLP, gestion fine des comptes de service gérés (gMSA), et audit de sécurité des identités (Event IDs 4720, 4726, 4728). Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Annuaire d’Entreprise Active Directory (AD DS), Gouvernance AGDLP & Rôles FSMO |
| 3 | h2 | — | 1. Architecture Hiérarchique d’Active Directory Domain Services (AD DS) |
| 4 | h2 | — | 2. Les 5 Rôles FSMO (Flexible Single Master Operations) |
| 5 | h2 | — | 3. Gouvernance des Identités : Méthodologie Standard AGDLP / AGUDLP |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 2 — Annuaire d’Entreprise Active Directory (AD DS), Gouvernance AGDLP & Rôles FSMO
  - **H2** — 1. Architecture Hiérarchique d’Active Directory Domain Services (AD DS)
      - **H4** — Les Éléments Logiques Fondamentaux
      - **H4** — Partitions d’Annuaire & Réplication
  - **H2** — 2. Les 5 Rôles FSMO (Flexible Single Master Operations)
      - **H4** — Rôles à l’Échelle de la Forêt (Forest-Wide)
      - **H4** — Rôles à l’Échelle du Domaine (Domain-Wide)
  - **H2** — 3. Gouvernance des Identités : Méthodologie Standard AGDLP / AGUDLP
      - **H4** — Les Échelons du Modèle AGDLP
      - **H4** — Extension Multi-Domaines : AGUDLP
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Vérificateur de conformité de structure de groupes AGDLP / AGUDLP
    - **H3** — Exercice 2 — Simulateur de topologie FSMO et routage des opérations AD DS
    - **H3** — Exercice 3 — Parseur de journaux d’audit de sécurité Active Directory (Event IDs 4720, 4726, 4728)
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
| Chapitre 3 — Stratégies de Groupe (GPO), Modèle LSDOU & Gouvernance de Parc | `chapitre3.html` | `b3-windows-server/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| L’Unité Organisationnelle (OU) |  | — | `opt` | — | actif | — |
| Le Domaine local |  | — | `opt` | — | actif | — |
| La Forêt Active Directory |  | — | `opt` | — | actif | data-correct=1 |
| Le groupe de travail Workgroup |  | — | `opt` | — | actif | — |
| Le Schema Master |  | — | `opt` | — | actif | — |
| Le RID Master |  | — | `opt` | — | actif | data-correct=1 |
| Le Domain Naming Master |  | — | `opt` | — | actif | — |
| L’Infrastructure Master |  | — | `opt` | — | actif | — |
| Aux groupes Globaux (GG) |  | — | `opt` | — | actif | — |
| Aux groupes Universels (UG) |  | — | `opt` | — | actif | — |
| Aux groupes Locaux de Domaine (DL) |  | — | `opt` | — | actif | data-correct=1 |
| Directement aux comptes d’utilisateurs |  | — | `opt` | — | actif | — |
| L’Infrastructure Master |  | — | `opt` | — | actif | — |
| Le Schema Master |  | — | `opt` | — | actif | — |
| Le PDC Emulator |  | — | `opt` | — | actif | data-correct=1 |
| Le Global Catalog |  | — | `opt` | — | actif | — |
| Event ID 4624 |  | — | `opt` | — | actif | — |
| Event ID 4720 |  | — | `opt` | — | actif | — |
| Event ID 4728 |  | — | `opt` | — | actif | data-correct=1 |
| Event ID 7036 |  | — | `opt` | — | actif | — |
| Le redémarrer simplement en mode sans échec |  | — | `opt` | — | actif | — |
| Le formater et ne JAMAIS le reconnecter au réseau Active Directory |  | — | `opt` | — | actif | data-correct=1 |
| Le promouvoir contrôleur secondaire |  | — | `opt` | — | actif | — |
| Changer son adresse IP |  | — | `opt` | — | actif | — |
| Unités Organisationnelles |  | — | `opt` | — | actif | — |
| Groupes Universels |  | — | `opt` | — | actif | data-correct=1 |
| Utilisateurs privilégiés |  | — | `opt` | — | actif | — |
| Mises à jour automatiques |  | — | `opt` | — | actif | — |
| Event ID 4720 |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `ws3-c2-e1` | analyse | 300 | active | `GROUP name=GG_Compta type=GLOBAL member_of=DL_Factures_Modif GROUP name=DL_Factures_Modif type=DOMAIN_LOCAL member_of=NONE USER name=Alice member_of=GG_Compta RESOURCE name=DossierFactures acl_group=DL_Factures_Modif permission=MODIFY` | Exercice 1 — Vérificateur de conformité de structure de groupes AGDLP / AGUDLP |
| `ws3-c2-e2` | analyse | 300 | active | `FSMO role=SCHEMA_MASTER dc=DC01 FSMO role=DOMAIN_NAMING dc=DC01 FSMO role=PDC_EMULATOR dc=DC01 FSMO role=RID_MASTER dc=DC02 FSMO role=INFRASTRUCTURE dc=DC02 DC_STATUS name=DC01 state=ONLINE DC_STATUS name=DC02 state=OFFLINE OP type=CHANGE_PASSWORD OP type=CREATE_USER` | Exercice 2 — Simulateur de topologie FSMO et routage des opérations AD DS |
| `ws3-c2-e3` | analyse | 300 | active | `EVENT id=4720 user=jdoe actor=admin01 EVENT id=4728 user=jdoe group=Domain Admins actor=admin01 EVENT id=4720 user=stewart actor=admin02 EVENT id=4726 user=stewart actor=admin02` | Exercice 3 — Parseur de journaux d’audit de sécurité Active Directory (Event IDs 4720, 4726, 4728) |

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

- Tableaux : 0
- Blocs `pre` : 3 · elements `code` : 7
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cpu`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3549 mots · 415 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 70. Les plus frequentes :

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
