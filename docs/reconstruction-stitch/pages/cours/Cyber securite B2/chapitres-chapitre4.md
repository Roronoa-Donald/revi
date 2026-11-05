# Chapitre 4 — Vulnérabilités Applicatives & Top 10 OWASP

> Fiche extraite du fichier `Cyber securite B2/chapitres/chapitre4.html` (484 lignes, 33.5 Ko, sha256 `4a01de32bbac`).
> Famille : **cours-Cyber securite B2** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/Cyber securite B2/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Vulnérabilités Applicatives &amp; Top 10 OWASP \| Cybersécurité B2 |
| Description meta | Chapitre 4 du cours Cybersécurité B2 : Référentiel OWASP Top 10, injections SQL (SQLi) et requêtes préparées, Cross-Site Scripting (XSS Stored/Reflected/DOM), CSRF et contrôle d’accès défaillant (IDOR). Notions fondamentales, ateliers Python interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Vulnérabilités Applicatives & Top 10 OWASP |
| 3 | h2 | — | 1. Le Top 10 de l’OWASP : La référence mondiale de la sécurité logicielle |
| 4 | h2 | — | 2. Injections SQL (SQLi) : Mécanisme & Requêtes préparées |
| 5 | h2 | — | 3. Cross-Site Scripting (XSS) : Typologie & Défense en profondeur |
| 6 | h2 | — | 4. CSRF (Cross-Site Request Forgery) & Failles IDOR |
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

- **H1** — Chapitre 4 — Vulnérabilités Applicatives & Top 10 OWASP
  - **H2** — 1. Le Top 10 de l’OWASP : La référence mondiale de la sécurité logicielle
  - **H2** — 2. Injections SQL (SQLi) : Mécanisme & Requêtes préparées
  - **H2** — 3. Cross-Site Scripting (XSS) : Typologie & Défense en profondeur
      - **H4** — 1. XSS Stockée (Stored XSS)
      - **H4** — 2. XSS Réfléchie (Reflected XSS)
      - **H4** — 3. XSS basée sur le DOM (DOM XSS)
  - **H2** — 4. CSRF (Cross-Site Request Forgery) & Failles IDOR
      - **H4** — Attaque CSRF (Recherche de faux ordres)
      - **H4** — Faille IDOR (Broken Object Access)
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Détecteur de motifs d’injection SQL (SQLi)
    - **H3** — Exercice 2 — Encodage pédagogique de texte HTML
    - **H3** — Exercice 3 — Contrôleur d’accès contre les failles IDOR (Broken Object Level Auth)
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
| Chapitre 5 — Authentification, Gestion des Identités & Contrôle d’Accès | `chapitre5.html` | `Cyber securite B2/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce que le moteur SQL sépare rigoureusement la phase de compilation syntaxique de la tra |  | — | `opt` | — | actif | data-correct=1 |
| Parce que les requêtes préparées chiffrent automatiquement la base de données en AES-256 |  | — | `opt` | — | actif | — |
| Parce qu’elles refusent automatiquement toute saisie contenant le caractère espace |  | — | `opt` | — | actif | — |
| Parce qu’elles transfèrent l’exécution de la requête sur le navigateur du client |  | — | `opt` | — | actif | — |
| HttpOnly |  | — | `opt` | — | actif | data-correct=1 |
| Secure |  | — | `opt` | — | actif | — |
| SameSite |  | — | `opt` | — | actif | — |
| Domain |  | — | `opt` | — | actif | — |
| XSS Stockée (Stored XSS) |  | — | `opt` | — | actif | data-correct=1 |
| XSS Réfléchie (Reflected XSS) |  | — | `opt` | — | actif | — |
| XSS basée sur le DOM (DOM XSS) |  | — | `opt` | — | actif | — |
| XSS Aveugle (Blind XSS) |  | — | `opt` | — | actif | — |
| Le serveur autorise l’accès à un objet privé simplement en modifiant son identifiant dans |  | — | `opt` | — | actif | data-correct=1 |
| Le serveur utilise un algorithme de hachage cassé comme MD5 |  | — | `opt` | — | actif | — |
| Le port SSH 22 est exposé sur Internet sans mot de passe |  | — | `opt` | — | actif | — |
| L’application ne dispose pas de certificat SSL/TLS valide |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `cs2-c4-e1` | analyse | 300 | active | `admin' OR '1'='1` | Exercice 1 — Détecteur de motifs d’injection SQL (SQLi) |
| `cs2-c4-e2` | analyse | 300 | active | `<script>alert("XSS & Pwned");</script>` | Exercice 2 — Encodage pédagogique de texte HTML |
| `cs2-c4-e3` | analyse | 300 | active | `u101;client;doc42;doc42_owner_u101` | Exercice 3 — Contrôleur d’accès contre les failles IDOR (Broken Object Level Auth) |

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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 5 · elements `code` : 42
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-warning`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2907 mots · 422 noeuds HTML

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
| `card` | 5 |
| `card-title` | 5 |
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
