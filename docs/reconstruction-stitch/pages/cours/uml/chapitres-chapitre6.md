# Chapitre 6 — Machines à États, Composants & Déploiement Physique

> Fiche extraite du fichier `uml/chapitres/chapitre6.html` (534 lignes, 37.1 Ko, sha256 `3008a44b9ad5`).
> Famille : **cours-uml** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/uml/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Machines à États, Composants &amp; Déploiement Physique \| UML B2 |
| Description meta | Chapitre 6 du cours UML B2 : Cycle de vie événementiel (Statecharts de Harel), actions internes (entry, exit, do), pseudo-états et historique, architecture logicielle modulaire en diagramme de composants, interfaces requises/fournies (Lollipop &amp; Socket), et topologie d’infrastructure physique en diagramme de déploiement. Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Machines à États, Composants & Déploiement Physique |
| 3 | h2 | — | 1. Machines à États-Transitions : Le Cycle de Vie Réactif |
| 4 | h2 | — | 2. Diagramme de Composants : Interfaces Lollipop & Socket |
| 5 | h2 | — | 3. Diagramme de Déploiement : Infrastructure Matérielle et Artefacts |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Machines à États, Composants & Déploiement Physique
  - **H2** — 1. Machines à États-Transitions : Le Cycle de Vie Réactif
      - **H4** — Pseudo-États de Choix et Jonction
      - **H4** — Pseudo-États d’Historique (H et H*)
  - **H2** — 2. Diagramme de Composants : Interfaces Lollipop & Socket
      - **H4** — Interface Fournie (––⊗ Lollipop)
      - **H4** — Interface Requise (––⌈ Socket)
  - **H2** — 3. Diagramme de Déploiement : Infrastructure Matérielle et Artefacts
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Machine à états finis UML (State Machine)
    - **H3** — Exercice 2 — Vérificateur d'interfaces de composants (Lollipop)
    - **H3** — Exercice 3 — Mappeur de diagramme de déploiement (Nœuds & Artefacts)
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
| nav | `umlnav` | Portail → `/`<br>UML B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| UML B2 | `../index.html` | `uml/index.html` | interne |
| Sommaire | `../sommaire.html` | `uml/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `uml/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `uml/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `uml/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `uml/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `uml/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `uml/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `uml/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `uml/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `uml/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `uml/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `uml/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `uml/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `uml/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `uml/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| action -> état [événement] |  | — | `opt` | — | actif | — |
| événement(paramètres) [garde] / action |  | — | `opt` | — | actif | data-correct=1 |
| «transition» événement : action |  | — | `opt` | — | actif | — |
| état_initial => état_final |  | — | `opt` | — | actif | — |
| Elle s’exécute en une fraction de seconde de façon instantanée |  | — | `opt` | — | actif | — |
| Elle s’exécute en continu tant que l’objet reste dans l’état et peut être interrompue dès |  | — | `opt` | — | actif | data-correct=1 |
| Elle est exécutée uniquement lorsque l’état est détruit |  | — | `opt` | — | actif | — |
| Elle nécessite obligatoirement une connexion Internet |  | — | `opt` | — | actif | — |
| H sauvegarde sur disque dur et H* en mémoire RAM |  | — | `opt` | — | actif | — |
| H mémorise uniquement le sous-état immédiat de premier niveau, alors que H* rétablit récur |  | — | `opt` | — | actif | data-correct=1 |
| H ne fonctionne qu’une seule fois |  | — | `opt` | — | actif | — |
| H* est réservé aux architectures microservices |  | — | `opt` | — | actif | — |
| Une tige terminée par un demi-cercle creux (Socket) |  | — | `opt` | — | actif | — |
| Une tige terminée par un petit disque plein (Lollipop / sucette) |  | — | `opt` | — | actif | data-correct=1 |
| Une flèche rouge clignotante |  | — | `opt` | — | actif | — |
| Un losange noir plein |  | — | `opt` | — | actif | — |
| Un connecteur d’assemblage (Assembly Connector) |  | — | `opt` | — | actif | data-correct=1 |
| Un pont de routage VPN |  | — | `opt` | — | actif | — |
| Une agrégation forte composite |  | — | `opt` | — | actif | — |
| Une liaison de dépendance circulaire |  | — | `opt` | — | actif | — |
| Un cercle concentrique |  | — | `opt` | — | actif | — |
| Un parallélépipède / cube en perspective tridimensionnelle portant le stéréotype «device» |  | — | `opt` | — | actif | data-correct=1 |
| Un losange horizontal |  | — | `opt` | — | actif | — |
| Un rectangle à coins arrondis |  | — | `opt` | — | actif | — |
| Un bogue logiciel non résolu |  | — | `opt` | — | actif | — |
| Un élément physique concret produit par le développement (fichier binaire, WAR, JAR, exécu |  | — | `opt` | — | actif | data-correct=1 |
| Un câble réseau à fibre optique |  | — | `opt` | — | actif | — |
| Une réunion de sprint Scrum |  | — | `opt` | — | actif | — |
| «device» |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `um2-c6-e1` | analyse | 300 | active | `INITIAL Cree TRANSITION Cree -> Paye : payer [montant>0] / emettreRecu TRANSITION Paye -> Expedie : expedier / notifierClient EVENT payer montant=50 EVENT expedier` | Exercice 1 — Machine à états finis UML (State Machine) |
| `um2-c6-e2` | analyse | 300 | active | `PROVIDES ServicePaiement IPayment:2.0 REQUIRES ModulePanier IPayment:1.5 CONNECT ModulePanier -> ServicePaiement [IPayment]` | Exercice 2 — Vérificateur d'interfaces de composants (Lollipop) |
| `um2-c6-e3` | analyse | 300 | active | `NODE ClientPC <<device>> NODE WebServer <<executionEnvironment>> DEPLOY AppReact ON ClientPC DEPLOY ApiFlask ON WebServer LINK ClientPC <--> WebServer PROTO=HTTPS COMM AppReact -> ApiFlask REQ_PROTO=HTTPS` | Exercice 3 — Mappeur de diagramme de déploiement (Nœuds & Artefacts) |

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
- Blocs `pre` : 3 · elements `code` : 28
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-layers`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3118 mots · 446 noeuds HTML

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
| `card-title` | 4 |
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
