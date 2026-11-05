# Chapitre 6 — SRE (Site Reliability Engineering), SLI/SLO, Error Budgets & Observabilité

> Fiche extraite du fichier `b3-devops/chapitres/chapitre6.html` (562 lignes, 38.7 Ko, sha256 `15123dd51f56`).
> Famille : **cours-b3-devops** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-devops/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — SRE (Site Reliability Engineering), SLI/SLO, Error Budgets &amp; Observabilité \| DevOps B3 |
| Description meta | Chapitre 6 du cours DevOps B3 : Doctrine SRE de Google, gestion du Toil, dialectique SLI/SLO/SLA, politiques d’Error Budget, les 4 signaux dorés et amortissement de l’Alert Flapping. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — SRE (Site Reliability Engineering), SLI/SLO, Error Budgets & Observabilité |
| 3 | h2 | — | 1. La Doctrine SRE : Quand l’Ingénierie Logicielle Repense l’Exploitation |
| 4 | h2 | — | 2. La Trinité de la Fiabilité : SLI, SLO et SLA |
| 5 | h2 | — | 3. Error Budgets & Vitesse de Consommation (Burn Rate) |
| 6 | h2 | — | 4. Observabilité : Les 4 Signaux Dorés & Amortissement des Alertes (Flapping) |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — SRE (Site Reliability Engineering), SLI/SLO, Error Budgets & Observabilité
  - **H2** — 1. La Doctrine SRE : Quand l’Ingénierie Logicielle Repense l’Exploitation
      - **H4** — Élimination Systémique du « Toil »
      - **H4** — L’Axiome de l’Inévitabilité des Pannes
  - **H2** — 2. La Trinité de la Fiabilité : SLI, SLO et SLA
  - **H2** — 3. Error Budgets & Vitesse de Consommation (Burn Rate)
      - **H4** — Budget Positif (> 20% restant)
      - **H4** — Budget Épuisé (≤ 0% restant)
      - **H4** — Le Burn Rate (Taux de Consommation)
  - **H2** — 4. Observabilité : Les 4 Signaux Dorés & Amortissement des Alertes (Flapping)
      - **H4** — 1. Latence (Latency)
      - **H4** — 2. Trafic (Traffic)
      - **H4** — 3. Erreurs (Errors)
      - **H4** — 4. Saturation (Saturation)
      - **H4** — L’Alert Flapping & La Fatigue d’Alerte (Alert Fatigue)
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur des métriques d’incident SRE (MTBF, MTTR, MTTD & Disponibilité)
    - **H3** — Exercice 2 — Auditeur de budget d’erreur SLO/SLI et gel des déploiements
    - **H3** — Exercice 3 — Détecteur d’instabilité et de tempête d’alertes Prometheus (Alert Flapping)
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

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
| Atelier de code | `../atelier.html` | `b3-devops/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 100% |  | — | `opt` | — | actif | — |
| 80% |  | — | `opt` | — | actif | — |
| 50% au maximum (les 50% restants étant consacrés à l’ingénierie et l’automatisation) |  | — | `opt` | — | actif | data-correct=1 |
| 0% (aucun travail opérationnel n’est permis) |  | — | `opt` | — | actif | — |
| Le SLO est un format de fichier texte tandis que le SLA est une base de données |  | — | `opt` | — | actif | — |
| Le SLO est un objectif interne de fiabilité plus strict que le SLA, qui est quant à lui un |  | — | `opt` | — | actif | data-correct=1 |
| Le SLO est réservé au matériel physique et le SLA aux logiciels libres |  | — | `opt` | — | actif | — |
| Il n’y a aucune différence, ce sont deux acronymes strictement synonymes |  | — | `opt` | — | actif | — |
| 25 920 secondes |  | — | `opt` | — | actif | — |
| 2 592 secondes (soit 43 minutes et 12 secondes) |  | — | `opt` | — | actif | data-correct=1 |
| 259 secondes |  | — | `opt` | — | actif | — |
| 0 seconde |  | — | `opt` | — | actif | — |
| Accélérer la cadence de mise en production de nouvelles fonctionnalités |  | — | `opt` | — | actif | — |
| Appliquer une politique de gel des releases fonctionnelles (Release Freeze) et réorienter |  | — | `opt` | — | actif | data-correct=1 |
| Supprimer la surveillance pour ne plus voir les erreurs |  | — | `opt` | — | actif | — |
| Réduire artificiellement le SLO pour que le budget redevienne positif |  | — | `opt` | — | actif | — |
| RAM, Disque, Clavier, Souris |  | — | `opt` | — | actif | — |
| Latence, Trafic, Erreurs, Saturation |  | — | `opt` | — | actif | data-correct=1 |
| Nombre de commits, Pull requests, Lignes de code, Heures de travail |  | — | `opt` | — | actif | — |
| Température de la salle, Débit d’air, Pression atmosphérique, Voltage |  | — | `opt` | — | actif | — |
| L’envoi de notifications par SMS en cas de panne |  | — | `opt` | — | actif | — |
| L’oscillation rapide d’une alerte entre les états actif (firing) et résolu (ok) en raison |  | — | `opt` | — | actif | data-correct=1 |
| L’absence totale de logs sur un serveur |  | — | `opt` | — | actif | — |
| La panne simultanée de tous les routeurs d’un réseau |  | — | `opt` | — | actif | — |
| La directive « delay: infinite » |  | — | `opt` | — | actif | — |
| La clause « for: <durée> » exigeant que la condition critique persiste de manière ininterr |  | — | `opt` | — | actif | data-correct=1 |
| L’augmentation du seuil de mémoire à 100% |  | — | `opt` | — | actif | — |
| La suppression du serveur Alertmanager |  | — | `opt` | — | actif | — |
| En 30 jours |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `do3-c6-e1` | analyse | 300 | active | `INCIDENT_LOG total_hours=720 pannes=3 total_downtime_h=1.5 total_detection_h=0.6` | Exercice 1 — Calculateur des métriques d’incident SRE (MTBF, MTTR, MTTD & Disponibilité) |
| `do3-c6-e2` | analyse | 300 | active | `SLO_MONITOR slo_pct=99.9 indispo_s=500.0 SLO_MONITOR slo_pct=99.9 indispo_s=2400.0 SLO_MONITOR slo_pct=99.9 indispo_s=3000.0` | Exercice 2 — Auditeur de budget d’erreur SLO/SLI et gel des déploiements |
| `do3-c6-e3` | analyse | 300 | active | `ALERT nom=high_cpu etats=OK,FIRING,OK,FIRING,OK ALERT nom=disk_full etats=OK,OK,FIRING,FIRING` | Exercice 3 — Détecteur d’instabilité et de tempête d’alertes Prometheus (Alert Flapping) |

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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 4 · elements `code` : 15
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-layers`, `#i-play`, `#i-target`, `#i-warning`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3441 mots · 476 noeuds HTML

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
| `box` | 8 |
| `box__title` | 8 |
| `card` | 8 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
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
