# Chapitre 4 — Exploitation des Vulnérabilités Web (OWASP Top 10 & Injection)

> Fiche extraite du fichier `b3-hacking/chapitres/chapitre4.html` (556 lignes, 41.3 Ko, sha256 `4da3ef338819`).
> Famille : **cours-b3-hacking** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-hacking/chapitres/chapitre4.html` |
| Titre du document | Module 4 — Exploitation des Vulnérabilités Web (OWASP Top 10 & Injection) \| Hacking Éthique & Pentest B3 |
| Description meta | Module 4 du cours Hacking Éthique & Pentest B3 : Taxonomie de l'OWASP Top 10, défaillances de contrôle d'accès et références directes non sécurisées (IDOR), exploitation complète des injections SQL (In-band, UNION-based, Blind Boolean, Time-based et Stacked Queries), vulnérabilités côté client (Cross-Site Scripting XSS Stored/Reflected/DOM, CSRF et jetons SameSite), vulnérabilités serveur critiques (SSRF, injection de commandes OS), traversées de répertoires (Path Traversal / LFI / RFI) avec techniques de contournement de filtres, et maîtrise des outils d'interception (Burp Suite, OWASP ZAP, sqlmap, ffuf). Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Exploitation des Vulnérabilités Web (OWASP Top 10 & Injection) |
| 3 | h2 | — | 1. Taxonomie de l'OWASP Top 10 & Défaillances de Contrôle d'Accès (A01 / IDOR) |
| 4 | h2 | — | 2. Injections SQL Approfondies : In-Band, Inférentielles & Remédiation |
| 5 | h2 | — | 3. Vulnérabilités Côté Client : XSS (Cross-Site Scripting) & CSRF |
| 6 | h2 | — | 4. Vulnérabilités Serveur Critiques : SSRF, RCE & Path Traversal (LFI) |
| 7 | h2 | — | 5. Boîte à Outils Professionnelle d'Audit Web : Burp Suite & sqlmap |
| 8 | h2 | — | 6. Études de cas & applications pratiques |
| 9 | h2 | — | 7. QCM — niveau examen |
| 10 | h2 | — | 8. Erreurs classiques — récapitulatif |
| 11 | h2 | — | 9. Méthodologie de résolution |
| 12 | h2 | — | 10. Révision active |
| 13 | h2 | — | 11. Test de maîtrise |
| 14 | .lab | code lab | 3 bloc(s) |
| 15 | .qcm | QCM | 8 question(s) |
| 16 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Exploitation des Vulnérabilités Web (OWASP Top 10 & Injection)
  - **H2** — 1. Taxonomie de l'OWASP Top 10 & Défaillances de Contrôle d'Accès (A01 / IDOR)
      - **H4** — A01:2021 — Broken Access Control
      - **H4** — A02:2021 — Cryptographic Failures
  - **H2** — 2. Injections SQL Approfondies : In-Band, Inférentielles & Remédiation
  - **H2** — 3. Vulnérabilités Côté Client : XSS (Cross-Site Scripting) & CSRF
      - **H4** — XSS Stockée (Stored / Persistent)
      - **H4** — XSS Réfléchie (Reflected)
      - **H4** — XSS Basée sur le DOM (DOM-based)
  - **H2** — 4. Vulnérabilités Serveur Critiques : SSRF, RCE & Path Traversal (LFI)
      - **H4** — SSRF (Server-Side Request Forgery)
      - **H4** — Traversée de Répertoire & LFI
  - **H2** — 5. Boîte à Outils Professionnelle d'Audit Web : Burp Suite & sqlmap
      - **H4** — Burp Suite Proxy & Repeater
      - **H4** — Burp Intruder & Fuzzers (ffuf)
      - **H4** — sqlmap
  - **H2** — 6. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Détecteur de Vecteurs d'Injection SQL (SQLi Pattern Analyzer)
    - **H3** — Exercice 2 — Simulateur d'Attaque par Injection SQL Aveugle Basée sur le Temps
    - **H3** — Exercice 3 — Analyseur de Traversée de Répertoire et Inclusion de Fichiers (Path Traversal / LFI)
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
| nav | `b3-hackingnav` | Portail → `/`<br>Hacking Éthique & Pentest B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Hacking Éthique & Pentest B3 | `../index.html` | `b3-hacking/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-hacking/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-hacking/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-hacking/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-hacking/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-hacking/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-hacking/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-hacking/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-hacking/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-hacking/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-hacking/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-hacking/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-hacking/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-hacking/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-hacking/chapitres/formules.html` | interne |
| Module 5 — Exploitation Système, Escalade de Privilèges & Pivoting (Gaining Access) | `chapitre5.html` | `b3-hacking/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Broken Access Control (Défaillances du contrôle d'accès / IDOR) |  | — | `opt` | — | actif | data-correct=1 |
| Cryptographic Failures (Faiblesses cryptographiques) |  | — | `opt` | — | actif | — |
| Injection (Injections SQL, commande) |  | — | `opt` | — | actif | — |
| Security Misconfiguration (Mauvaise configuration de sécurité) |  | — | `opt` | — | actif | — |
| La requête injectée doit retourner exactement le même nombre de colonnes que la requête or |  | — | `opt` | — | actif | data-correct=1 |
| Le serveur de base de données doit obligatoirement tourner sous le système d'exploitation |  | — | `opt` | — | actif | — |
| Le mot de passe de l'administrateur SQL doit être transmis en clair dans la chaîne injecté |  | — | `opt` | — | actif | — |
| La table cible doit comporter au moins 10 000 enregistrements |  | — | `opt` | — | actif | — |
| L'utilisation systématique de requêtes préparées avec paramètres liés (Prepared Statements |  | — | `opt` | — | actif | data-correct=1 |
| Le filtrage par liste noire supprimant le mot "SELECT" et les tirets "--" |  | — | `opt` | — | actif | — |
| Le remplacement du protocole HTTP par HTTPS sur le serveur web |  | — | `opt` | — | actif | — |
| L'activation d'un pare-feu matériel sur le port 80 |  | — | `opt` | — | actif | — |
| HttpOnly |  | — | `opt` | — | actif | data-correct=1 |
| Secure |  | — | `opt` | — | actif | — |
| SameSite=Lax |  | — | `opt` | — | actif | — |
| Domain=.local |  | — | `opt` | — | actif | — |
| Lorsque la charge utile malveillante est enregistrée durablement dans la base de données d |  | — | `opt` | — | actif | data-correct=1 |
| Lorsque le script est exécuté uniquement sur la machine de l'attaquant sans jamais quitter |  | — | `opt` | — | actif | — |
| Lorsque la faille nécessite la modification manuelle du fichier hosts de la victime |  | — | `opt` | — | actif | — |
| Lorsque l'attaque cible exclusivement des cookies expirés |  | — | `opt` | — | actif | — |
| L'adresse IP de l'API de métadonnées interne 169.254.169.254 pour extraire les jetons d'ac |  | — | `opt` | — | actif | data-correct=1 |
| Le serveur DNS racine mondial situé sur Internet |  | — | `opt` | — | actif | — |
| L'imprimante réseau de l'auditeur de sécurité |  | — | `opt` | — | actif | — |
| Le registre des brevets de l'entreprise |  | — | `opt` | — | actif | — |
| Burp Repeater |  | — | `opt` | — | actif | data-correct=1 |
| Burp Intruder |  | — | `opt` | — | actif | — |
| Burp Sequencer |  | — | `opt` | — | actif | — |
| Burp Decoder |  | — | `opt` | — | actif | — |
| En utilisant des encodages URL alternatifs comme %2e%2e%2f ou des séquences imbriquées com |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `hk3-c4-e1` | analyse | 300 | active | `SQLI_CHECK param=admin' OR '1'='1' --` | Exercice 1 — Détecteur de Vecteurs d'Injection SQL (SQLi Pattern Analyzer) |
| `hk3-c4-e2` | analyse | 300 | active | `TIME_INFER actual_secret=FLAG probes=1:F,1:B,2:L,3:A,4:G` | Exercice 2 — Simulateur d'Attaque par Injection SQL Aveugle Basée sur le Temps |
| `hk3-c4-e3` | analyse | 300 | active | `LFI_CHECK path=../../../../etc/passwd` | Exercice 3 — Analyseur de Traversée de Répertoire et Inclusion de Fichiers (Path Traversal / LFI) |

- QCM : 1 bloc(s), **8 question(s)**.
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
- Blocs `pre` : 4 · elements `code` : 86
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3571 mots · 557 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 20 |
| `card` | 10 |
| `box` | 8 |
| `box__title` | 8 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
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
