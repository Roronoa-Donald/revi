# Chapitre 4 — Documentation d’API & Référence Technique (OpenAPI / Swagger)

> Fiche extraite du fichier `b3-document-technique/chapitres/chapitre4.html` (573 lignes, 37.6 Ko, sha256 `37e7c6b6818b`).
> Famille : **cours-b3-document-technique** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-document-technique/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Documentation d’API &amp; Référence Technique (OpenAPI / Swagger) \| Document Technique B3 |
| Description meta | Chapitre 4 du cours Document Technique B3 : Spécification OpenAPI 3.0, contrats d’interface REST, sémantique des codes HTTP, schémas JSON, docstrings et portails interactifs Swagger UI. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Documentation d’API & Référence Technique (OpenAPI / Swagger) |
| 3 | h2 | — | 1. L’Approche « API-First » & Le Contrat d’Interface Immuable |
| 4 | h2 | — | 2. La Spécification OpenAPI 3.0 : Anatomie & Conventions REST |
| 5 | h2 | — | 3. Documentation du Code Source & Docstrings Normalisées |
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

- **H1** — Chapitre 4 — Documentation d’API & Référence Technique (OpenAPI / Swagger)
  - **H2** — 1. L’Approche « API-First » & Le Contrat d’Interface Immuable
      - **H4** — La Philosophie API-First
      - **H4** — Bénéfices Opérationnels Majeurs
  - **H2** — 2. La Spécification OpenAPI 3.0 : Anatomie & Conventions REST
      - **H4** — 1. En-tête : info & servers
      - **H4** — 2. Les Routes : paths
      - **H4** — 3. Les Schémas : components
      - **H4** — Sémantique Canonique des Réponses HTTP
  - **H2** — 3. Documentation du Code Source & Docstrings Normalisées
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Validateur de spécification de route d’API REST (OpenAPI 3.0)
    - **H3** — Exercice 2 — Extracteur et auditeur de docstrings de code (Format Google / Sphinx)
    - **H3** — Exercice 3 — Validateur de contrat de schéma JSON (JSON Schema Contract)
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
| nav | `b3-document-techniquenav` | Portail → `/`<br>Document Technique B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Document Technique B3 | `../index.html` | `b3-document-technique/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-document-technique/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-document-technique/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-document-technique/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-document-technique/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-document-technique/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-document-technique/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-document-technique/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-document-technique/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-document-technique/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-document-technique/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-document-technique/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-document-technique/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-document-technique/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-document-technique/chapitres/formules.html` | interne |
| Chapitre 5 — L’Approche Docs-as-Code, Markdown & Générateurs Statiques | `chapitre5.html` | `b3-document-technique/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Elle permet de supprimer totalement l’équipe de test |  | — | `opt` | — | actif | — |
| Le contrat d’interface OpenAPI est validé avant le codage, permettant le développement par |  | — | `opt` | — | actif | data-correct=1 |
| Elle rend le serveur dix fois plus rapide lors des requêtes SQL |  | — | `opt` | — | actif | — |
| Elle interdit l’utilisation du format JSON |  | — | `opt` | — | actif | — |
| 200 OK |  | — | `opt` | — | actif | — |
| 201 Created (avec l’en-tête Location désignant la nouvelle ressource) |  | — | `opt` | — | actif | data-correct=1 |
| 204 No Content |  | — | `opt` | — | actif | — |
| 302 Found |  | — | `opt` | — | actif | — |
| /api/getUserById?id=12 |  | — | `opt` | — | actif | — |
| /api/v1/deleteUser/12 |  | — | `opt` | — | actif | — |
| /api/v1/users/12 (avec la méthode HTTP appropriée GET ou DELETE) |  | — | `opt` | — | actif | data-correct=1 |
| /api/user_action.php?action=view&uid=12 |  | — | `opt` | — | actif | — |
| À lister les noms des employés de l’entreprise |  | — | `opt` | — | actif | — |
| À centraliser les définitions réutilisables des modèles de données JSON via des références |  | — | `opt` | — | actif | data-correct=1 |
| À enregistrer les adresses IP physiques des commutateurs réseau |  | — | `opt` | — | actif | — |
| À stocker le code source en langage binaire |  | — | `opt` | — | actif | — |
| Il n’y a aucune différence, ils sont strictement interchangeables |  | — | `opt` | — | actif | — |
| Le code 401 signale l’absence ou l’invalidité d’authentification (identité non prouvée), t |  | — | `opt` | — | actif | data-correct=1 |
| Le code 401 concerne les bases de données et le 403 les serveurs DNS |  | — | `opt` | — | actif | — |
| Le code 403 n’existe pas dans les standards du W3C |  | — | `opt` | — | actif | — |
| Car cela brise la couche protocolaire HTTP, empêchant les passerelles, proxys, équilibreur |  | — | `opt` | — | actif | data-correct=1 |
| Car le navigateur web s’arrête immédiatement de fonctionner |  | — | `opt` | — | actif | — |
| Car cela supprime la base de données |  | — | `opt` | — | actif | — |
| Car cela consomme le double de mémoire vive |  | — | `opt` | — | actif | — |
| Introduction, Conclusion, Remerciements |  | — | `opt` | — | actif | — |
| Args (arguments d’entrée), Returns (valeur de retour) et Raises (exceptions levées) |  | — | `opt` | — | actif | data-correct=1 |
| Budget, Facturation, Bénéfices |  | — | `opt` | — | actif | — |
| Hardware, Software, Firmware |  | — | `opt` | — | actif | — |
| Microsoft Excel |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `dt3-c4-e1` | analyse | 300 | active | `ROUTE_CHECK method=GET path=/api/users codes=200,404,500` | Exercice 1 — Validateur de spécification de route d’API REST (OpenAPI 3.0) |
| `dt3-c4-e2` | analyse | 300 | active | `DOCSTRING_AUDIT fn=calculer_tva params=montant_ht,taux doc=Calcul du montant. Args: montant_ht (float): base. taux (float): taux. Returns: float` | Exercice 2 — Extracteur et auditeur de docstrings de code (Format Google / Sphinx) |
| `dt3-c4-e3` | analyse | 300 | active | `SCHEMA_CHECK endpoint=/api/user requis=id:int,nom:str,actif:bool payload={"id": 10, "nom": "Alice", "actif": true}` | Exercice 3 — Validateur de contrat de schéma JSON (JSON Schema Contract) |

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
- Blocs `pre` : 4 · elements `code` : 86
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-file`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3108 mots · 543 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

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
| `card` | 5 |
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
