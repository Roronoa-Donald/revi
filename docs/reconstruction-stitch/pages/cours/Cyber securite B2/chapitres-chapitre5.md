# Chapitre 5 — Authentification, Gestion des Identités & Contrôle d’Accès

> Fiche extraite du fichier `Cyber securite B2/chapitres/chapitre5.html` (497 lignes, 34.3 Ko, sha256 `cae2195801dd`).
> Famille : **cours-Cyber securite B2** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/Cyber securite B2/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Authentification, Gestion des Identités &amp; Contrôle d’Accès \| Cybersécurité B2 |
| Description meta | Chapitre 5 du cours Cybersécurité B2 : Stockage sécurisé de mots de passe (Argon2id, bcrypt, salage et étirement), MFA/TOTP (RFC 6238), architecture des jetons JWT (RFC 7519) et modèles d’autorisation DAC, MAC, RBAC et ABAC. Notions fondamentales, ateliers Python interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Authentification, Gestion des Identités & Contrôle d’Accès |
| 3 | h2 | — | 1. Stockage des mots de passe : Salage, Épreuvage & Fonctions de dérivation (KDF) |
| 4 | h2 | — | 2. Authentification multifacteur (MFA) & Algorithme TOTP (RFC 6238) |
| 5 | h2 | — | 3. Architecture des jetons JWT (RFC 7519) & Pièges de sécurité |
| 6 | h2 | — | 4. Modèles de contrôle d’accès : DAC, MAC, RBAC & ABAC |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 4 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Authentification, Gestion des Identités & Contrôle d’Accès
  - **H2** — 1. Stockage des mots de passe : Salage, Épreuvage & Fonctions de dérivation (KDF)
      - **H4** — 1. Le Salage cryptographique (Salt)
      - **H4** — 2. L’Épreuvage & Résistance mémoire (Argon2id)
  - **H2** — 2. Authentification multifacteur (MFA) & Algorithme TOTP (RFC 6238)
  - **H2** — 3. Architecture des jetons JWT (RFC 7519) & Pièges de sécurité
  - **H2** — 4. Modèles de contrôle d’accès : DAC, MAC, RBAC & ABAC
      - **H4** — DAC (Discretionary Access Control)
      - **H4** — MAC (Mandatory Access Control)
      - **H4** — RBAC (Role-Based Access Control)
      - **H4** — ABAC (Attribute-Based Access Control)
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Dérivation itérative de mot de passe avec sel (Key Stretching)
    - **H3** — Exercice 2 — Validateur de jeton JWT et détection de faille alg=none
    - **H3** — Exercice 3 — Moteur de contrôle d’accès basé sur les rôles (RBAC)
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 10 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `Cyber securite B2nav` | Portail → `/`<br>Cybersécurité B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Cybersécurité B2 | `../index.html` | `Cyber securite B2/index.html` | interne |
| Sommaire | `../sommaire.html` | `Cyber securite B2/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `Cyber securite B2/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `Cyber securite B2/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `Cyber securite B2/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `Cyber securite B2/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `Cyber securite B2/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `Cyber securite B2/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `Cyber securite B2/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `Cyber securite B2/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `Cyber securite B2/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `Cyber securite B2/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `Cyber securite B2/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `Cyber securite B2/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `Cyber securite B2/chapitres/formules.html` | interne |
| Chapitre 6 — Détection d’Intrusions (NIDS/SIEM), Analyse de Traces & Réponse aux Incidents | `chapitre6.html` | `Cyber securite B2/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Rendre inopérantes les tables arc-en-ciel (rainbow tables) précalculées et garantir que de |  | — | `opt` | — | actif | data-correct=1 |
| Chiffrer le mot de passe pour qu’il puisse être relu en clair par l’administrateur |  | — | `opt` | — | actif | — |
| Réduire la taille de l’empreinte stockée sur le disque dur |  | — | `opt` | — | actif | — |
| Permettre la réinitialisation automatique du mot de passe par SMS |  | — | `opt` | — | actif | — |
| Parce que ses paramètres de temps et de mémoire augmentent le coût des essais, y compris s |  | — | `opt` | — | actif | data-correct=1 |
| Parce que le SHA-256 a été mathématiquement cassé et ne produit plus d’empreintes |  | — | `opt` | — | actif | — |
| Parce qu’Argon2id fonctionne sans aucun processeur physique |  | — | `opt` | — | actif | — |
| Parce qu’il permet de se connecter sans avoir besoin de taper de mot de passe |  | — | `opt` | — | actif | — |
| Que le contenu du payload n’a pas été falsifié ni altéré depuis son émission par le serveu |  | — | `opt` | — | actif | data-correct=1 |
| Que les données du payload sont chiffrées et illisibles par le client |  | — | `opt` | — | actif | — |
| Que le jeton sera éternellement valide sans jamais expirer |  | — | `opt` | — | actif | — |
| Que la connexion réseau est protégée par un pare-feu matériel |  | — | `opt` | — | actif | — |
| ABAC (Attribute-Based Access Control) |  | — | `opt` | — | actif | data-correct=1 |
| DAC (Discretionary Access Control) |  | — | `opt` | — | actif | — |
| RBAC (Role-Based Access Control) |  | — | `opt` | — | actif | — |
| MAC (Mandatory Access Control) |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `cs2-c5-e1` | analyse | 300 | active | `Azerty123;sel_unique_42;3` | Exercice 1 — Dérivation itérative de mot de passe avec sel (Key Stretching) |
| `cs2-c5-e2` | analyse | 300 | active | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbGljZSIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTc1MDAwMDAwMH0.signatureFactice;1700000000` | Exercice 2 — Validateur de jeton JWT et détection de faille alg=none |
| `cs2-c5-e3` | analyse | 300 | active | `ADMIN:read,write,delete\|USER:read alice:ADMIN\|bob:USER bob write` | Exercice 3 — Moteur de contrôle d’accès basé sur les rôles (RBAC) |

- QCM : 1 bloc(s), **4 question(s)**.
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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 5 · elements `code` : 35
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-info`, `#i-warning`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2973 mots · 415 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 72. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 20 |
| `opt` | 16 |
| `Cyber` | 8 |
| `securite` | 8 |
| `box` | 8 |
| `box__title` | 8 |
| `card` | 6 |
| `card-title` | 6 |
| `q` | 4 |
| `q__stem` | 4 |
| `opts` | 4 |
| `q__exp` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |

Attributs `data-*` : `data-correct` (4), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
