# Chapitre 4 — Déploiement Continu (CD), Stratégies de Release & Feature Flags

> Fiche extraite du fichier `b3-devops/chapitres/chapitre4.html` (524 lignes, 38.1 Ko, sha256 `4f73c777518e`).
> Famille : **cours-b3-devops** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-devops/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Déploiement Continu (CD), Stratégies de Release &amp; Feature Flags \| DevOps B3 |
| Description meta | Chapitre 4 du cours DevOps B3 : Continuous Delivery vs Continuous Deployment, déploiements sans interruption (Rolling, Blue/Green, Canary) et découplage par Feature Flags. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Déploiement Continu (CD), Stratégies de Release & Feature Flags |
| 3 | h2 | — | 1. Continuous Delivery vs Continuous Deployment : La Frontière Décisionnelle |
| 4 | h2 | — | 2. Stratégies de Déploiement Sans Interruption (Zero-Downtime) |
| 5 | h2 | — | 3. Feature Flags (Toggles) : Découpler Déploiement et Publication |
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

- **H1** — Chapitre 4 — Déploiement Continu (CD), Stratégies de Release & Feature Flags
  - **H2** — 1. Continuous Delivery vs Continuous Deployment : La Frontière Décisionnelle
      - **H4** — Livraison Continue (Continuous Delivery)
      - **H4** — Déploiement Continu (Continuous Deployment)
  - **H2** — 2. Stratégies de Déploiement Sans Interruption (Zero-Downtime)
  - **H2** — 3. Feature Flags (Toggles) : Découpler Déploiement et Publication
      - **H4** — Release Flags (Gradual Rollout)
      - **H4** — Targeting Flags (Ciblage)
      - **H4** — Ops Flags (Kill Switch)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Simulateur de bascule Blue-Green sans interruption de service
    - **H3** — Exercice 2 — Gestionnaire de déploiement progressif en Canari (Canary Release)
    - **H3** — Exercice 3 — Simulateur de mise à jour progressive Kubernetes (Rolling Update)
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
| nav | `b3-devopsnav` | Portail → `/`<br>DevOps B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| DevOps B3 | `../index.html` | `b3-devops/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-devops/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-devops/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-devops/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-devops/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-devops/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-devops/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-devops/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-devops/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-devops/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-devops/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-devops/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-devops/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-devops/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-devops/chapitres/formules.html` | interne |
| Chapitre 5 — Métriques DORA, Fiabilité Opérationnelle & Gestion des Incidents | `chapitre5.html` | `b3-devops/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| La livraison continue ne teste pas le code |  | — | `opt` | — | actif | — |
| Le déploiement continu envoie automatiquement chaque commit validé en production sans vali |  | — | `opt` | — | actif | data-correct=1 |
| La livraison continue est réservée aux applications mobiles |  | — | `opt` | — | actif | — |
| Le déploiement continu ne fonctionne que sur le cloud AWS |  | — | `opt` | — | actif | — |
| En réinstallant manuellement le système d’exploitation de tous les serveurs un par un |  | — | `opt` | — | actif | — |
| En basculant instantanément l’aiguillage du trafic au niveau du routeur ou de l’équilibreu |  | — | `opt` | — | actif | data-correct=1 |
| En coupant l’électricité du datacenter pendant 10 minutes |  | — | `opt` | — | actif | — |
| En demandant à chaque client de vider son cache de navigateur |  | — | `opt` | — | actif | — |
| Elle divise par deux la facture de bande passante réseau |  | — | `opt` | — | actif | — |
| Elle achemine d’abord un très faible pourcentage du trafic réel (ex. 5%) vers la nouvelle |  | — | `opt` | — | actif | data-correct=1 |
| Elle supprime le besoin de surveiller les logs de production |  | — | `opt` | — | actif | — |
| Elle permet de compiler le code directement dans le navigateur du client |  | — | `opt` | — | actif | — |
| Pour compresser les tables de données et libérer de l’espace disque |  | — | `opt` | — | actif | — |
| Pour assurer que le schéma de base de données reste compatible simultanément avec l’ancien |  | — | `opt` | — | actif | data-correct=1 |
| Pour désactiver les clés primaires sur les tables transactionnelles |  | — | `opt` | — | actif | — |
| Pour convertir automatiquement MySQL en MongoDB |  | — | `opt` | — | actif | — |
| Le code ne doit jamais être envoyé sur les serveurs de production |  | — | `opt` | — | actif | — |
| L’acheminement technique du code sur l’infrastructure de production est décorrélé de son a |  | — | `opt` | — | actif | data-correct=1 |
| Il faut deux équipes juridiques distinctes pour chaque projet |  | — | `opt` | — | actif | — |
| Le déploiement se fait uniquement sur support physique (DVD) |  | — | `opt` | — | actif | — |
| Un script qui détruit la base de données en cas d’attaque pirate |  | — | `opt` | — | actif | — |
| Un interrupteur logiciel d’urgence permettant de désactiver instantanément une fonctionnal |  | — | `opt` | — | actif | data-correct=1 |
| Un bouton physique situé sur la façade du serveur physique |  | — | `opt` | — | actif | — |
| Un protocole de déconnexion automatique des développeurs le soir |  | — | `opt` | — | actif | — |
| Une saturation de l’espace disque du serveur Git |  | — | `opt` | — | actif | — |
| Une dette technique exponentielle due à la combinatoire d’embranchements conditionnels (co |  | — | `opt` | — | actif | data-correct=1 |
| Une interdiction de compiler par le compilateur |  | — | `opt` | — | actif | — |
| Une augmentation des impôts sur les sociétés |  | — | `opt` | — | actif | — |
| La durée maximale en minutes d’un incident de production |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `do3-c4-e1` | analyse | 300 | active | `ROUTER active=BLUE version=1.2.0 DEPLOY target=GREEN version=1.3.0 health_check=PASS` | Exercice 1 — Simulateur de bascule Blue-Green sans interruption de service |
| `do3-c4-e2` | analyse | 300 | active | `CANARY app=payment_svc version=2.4.0 seuil_max=1.00 steps=5,25,50,100 error_rates=0.20,0.35,0.40,0.45 CANARY app=reco_engine version=3.0.0 seuil_max=0.50 steps=10,30,70,100 error_rates=0.10,0.85,1.20,2.00` | Exercice 2 — Gestionnaire de déploiement progressif en Canari (Canary Release) |
| `do3-c4-e3` | analyse | 300 | active | `ROLLING replicas=4 max_surge=1 max_unavail=0` | Exercice 3 — Simulateur de mise à jour progressive Kubernetes (Rolling Update) |

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
- Blocs `pre` : 3 · elements `code` : 17
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-layers`, `#i-play`, `#i-target`, `#i-warning`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3327 mots · 444 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 70. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 20 |
| `box` | 8 |
| `box__title` | 8 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
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
