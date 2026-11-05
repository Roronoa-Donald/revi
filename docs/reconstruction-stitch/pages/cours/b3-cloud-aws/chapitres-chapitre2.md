# Chapitre 2 — Sécurité des Identités IAM, Politiques JSON & Gouvernance Multi-Comptes

> Fiche extraite du fichier `b3-cloud-aws/chapitres/chapitre2.html` (550 lignes, 38.7 Ko, sha256 `79112a7b65e9`).
> Famille : **cours-b3-cloud-aws** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cloud-aws/chapitres/chapitre2.html` |
| Titre du document | Module 2 — Sécurité des Identités IAM, Politiques JSON & Gouvernance Multi-Comptes \| Services Cloud AWS B3 |
| Description meta | Module 2 du cours Services Cloud AWS B3 : Identités IAM, rôles temporaires, politiques JSON, moteur d'évaluation, rotation des clés et Service Control Policies (SCPs). Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Sécurité des Identités IAM, Politiques JSON & Gouvernance Multi-Comptes |
| 3 | h2 | — | 1. Les Fondements d'AWS IAM : Utilisateurs, Groupes & Rôles |
| 4 | h2 | — | 2. Structure & Syntaxe des Politiques d'Autorisation JSON |
| 5 | h2 | — | 3. Moteur d'Évaluation des Politiques : La Règle d'Or d'AWS |
| 6 | h2 | — | 4. Cycle de Vie des Clés d'Accès & Sécurité des Identifiants |
| 7 | h2 | — | 5. Gouvernance Multi-Comptes : AWS Organizations & SCPs |
| 8 | h2 | — | 6. Études de cas & applications pratiques |
| 9 | h2 | — | 7. QCM — niveau examen |
| 10 | h2 | — | 8. Erreurs classiques — récapitulatif |
| 11 | h2 | — | 9. Méthodologie de résolution |
| 12 | h2 | — | 10. Révision active |
| 13 | h2 | — | 11. Test de maîtrise |
| 14 | .lab | code lab | 3 bloc(s) |
| 15 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 2 — Sécurité des Identités IAM, Politiques JSON & Gouvernance Multi-Comptes
  - **H2** — 1. Les Fondements d'AWS IAM : Utilisateurs, Groupes & Rôles
      - **H4** — Utilisateurs IAM (Users)
      - **H4** — Groupes IAM (Groups)
      - **H4** — Rôles IAM (Roles)
  - **H2** — 2. Structure & Syntaxe des Politiques d'Autorisation JSON
  - **H2** — 3. Moteur d'Évaluation des Politiques : La Règle d'Or d'AWS
      - **H4** — Logique de Décision IAM
      - **H4** — Politiques d'Identité vs Politiques de Ressource
  - **H2** — 4. Cycle de Vie des Clés d'Accès & Sécurité des Identifiants
  - **H2** — 5. Gouvernance Multi-Comptes : AWS Organizations & SCPs
      - **H4** — AWS Organizations
      - **H4** — Service Control Policies (SCPs)
  - **H2** — 6. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Moteur d'Évaluation de Politiques IAM JSON (Deny / Allow / Default Deny)
    - **H3** — Exercice 2 — Auditeur de Clés d'Accès IAM & Détecteur d'Inactivité / Rotation
    - **H3** — Exercice 3 — Évaluateur de Politiques de Contrôle des Services AWS Organizations (SCP)
  - **H2** — 7. QCM — niveau examen
  - **H2** — 8. Erreurs classiques — récapitulatif
  - **H2** — 9. Méthodologie de résolution
  - **H2** — 10. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 11. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-cloud-awsnav` | Portail → `/`<br>Services Cloud AWS B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Services Cloud AWS B3 | `../index.html` | `b3-cloud-aws/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-cloud-aws/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-cloud-aws/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-cloud-aws/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-cloud-aws/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-cloud-aws/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-cloud-aws/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-cloud-aws/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-cloud-aws/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-cloud-aws/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-cloud-aws/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-cloud-aws/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-cloud-aws/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-cloud-aws/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-cloud-aws/chapitres/formules.html` | interne |
| Module 3 — Calcul & Conteneurs — EC2, EBS, ELB, Auto Scaling & Fargate | `chapitre3.html` | `b3-cloud-aws/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| L'utilisateur peut supprimer les buckets car Allow est évalué en premier |  | — | `opt` | — | actif | — |
| La suppression de bucket est strictement refusée, mais les autres opérations S3 sont autor |  | — | `opt` | — | actif | data-correct=1 |
| Toutes les opérations S3 sont bloquées |  | — | `opt` | — | actif | — |
| Une erreur de conflit de politique est levée dans la console |  | — | `opt` | — | actif | — |
| Un fichier texte ~/.aws/credentials contenant les clés root |  | — | `opt` | — | actif | — |
| Un Instance Profile associant un rôle IAM à l'instance EC2 |  | — | `opt` | — | actif | data-correct=1 |
| Une variable d'environnement globale dans /etc/profile |  | — | `opt` | — | actif | — |
| Un tunnel VPN IPsec dédié |  | — | `opt` | — | actif | — |
| ASIA |  | — | `opt` | — | actif | — |
| AKIA |  | — | `opt` | — | actif | data-correct=1 |
| AROA |  | — | `opt` | — | actif | — |
| AIDA |  | — | `opt` | — | actif | — |
| Tous les 7 jours |  | — | `opt` | — | actif | — |
| Tous les 30 jours |  | — | `opt` | — | actif | — |
| Tous les 90 jours |  | — | `opt` | — | actif | data-correct=1 |
| Tous les 365 jours |  | — | `opt` | — | actif | — |
| Accorder des droits administratifs aux utilisateurs d'un compte |  | — | `opt` | — | actif | — |
| Définir une limite supérieure (garde-fou) des permissions autorisées sur les comptes membr |  | — | `opt` | — | actif | data-correct=1 |
| Chiffrer automatiquement tous les disques EBS d'une région |  | — | `opt` | — | actif | — |
| Générer la facture consolidée mensuelle |  | — | `opt` | — | actif | — |
| 2008-10-17 |  | — | `opt` | — | actif | — |
| 2012-10-17 |  | — | `opt` | — | actif | data-correct=1 |
| 2024-01-01 |  | — | `opt` | — | actif | — |
| latest |  | — | `opt` | — | actif | — |
| Les Resource-based policies sont payantes |  | — | `opt` | — | actif | — |
| Une Resource-based policy est attachée directement à la ressource (ex: bucket S3) et conti |  | — | `opt` | — | actif | data-correct=1 |
| Les Identity-based policies ne peuvent pas comporter de Condition |  | — | `opt` | — | actif | — |
| Il n'y a aucune différence |  | — | `opt` | — | actif | — |
| ALLOW (car rien n'interdit l'action) |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `aws3-c2-e1` | analyse | 300 | active | `ACTION=s3:GetObject STATEMENTS=Allow:s3:Get*;Deny:s3:PutObject` | Exercice 1 — Moteur d'Évaluation de Politiques IAM JSON (Deny / Allow / Default Deny) |
| `aws3-c2-e2` | analyse | 300 | active | `KEY_AUDIT USER=dev-alice KEY_ID=AKIAIOSFODNN7EXAMPLE STATUS=Active AGE_DAYS=45` | Exercice 2 — Auditeur de Clés d'Accès IAM & Détecteur d'Inactivité / Rotation |
| `aws3-c2-e3` | analyse | 300 | active | `SCP_CHECK ACTION=ec2:StopInstances HIERARCHY=Root:Allow;CoreOU:Allow;Account:Allow` | Exercice 3 — Évaluateur de Politiques de Contrôle des Services AWS Organizations (SCP) |

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
- Blocs `pre` : 4 · elements `code` : 43
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3344 mots · 492 noeuds HTML

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
| `card` | 7 |
| `box` | 6 |
| `box__title` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |
| `badge` | 3 |

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
