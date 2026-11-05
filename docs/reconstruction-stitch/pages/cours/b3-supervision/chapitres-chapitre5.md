# Chapitre 5 — Gestion des Journaux & Logs Centralisés, Détection d'Anomalies & SIEM (ELK/EFK)

> Fiche extraite du fichier `b3-supervision/chapitres/chapitre5.html` (508 lignes, 35.8 Ko, sha256 `fdff83f75e3a`).
> Famille : **cours-b3-supervision** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-supervision/chapitres/chapitre5.html` |
| Titre du document | Module 5 — Gestion des Journaux & Logs Centralisés, Détection d'Anomalies & SIEM (ELK/EFK) \| Supervision &amp; Observabilité B3 |
| Description meta | Module 5 du cours Supervision & Observabilité B3 : Pipeline Filebeat, Logstash, Elasticsearch et Kibana, parsing grok, surveillance de débit EPS (Spike & Drop) et corrélation multi-sources d'incidents. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Gestion des Journaux & Logs Centralisés, Détection d'Anomalies & SIEM (ELK/EFK) |
| 3 | h2 | — | 1. L'Architecture de Centralisation des Journaux : Filebeat, Logstash & Elasticsearch |
| 4 | h2 | — | 2. Normalisation des Logs & Parsing Grok |
| 5 | h2 | — | 3. Métrologie des Flux de Logs (EPS) & Détection d'Incidents SIEM |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Gestion des Journaux & Logs Centralisés, Détection d'Anomalies & SIEM (ELK/EFK)
  - **H2** — 1. L'Architecture de Centralisation des Journaux : Filebeat, Logstash & Elasticsearch
      - **H4** — 1. Collecte : Filebeat
      - **H4** — 2. Traitement : Logstash
      - **H4** — 3. Indexation : Elasticsearch
  - **H2** — 2. Normalisation des Logs & Parsing Grok
      - **H4** — Du Texte Brut au Document JSON
      - **H4** — Standardisation ECS (Elastic Common Schema)
  - **H2** — 3. Métrologie des Flux de Logs (EPS) & Détection d'Incidents SIEM
      - **H4** — Analyse de Débit EPS (Events Per Second)
      - **H4** — Corrélation Multi-Sources d'Incidents
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Parseur et Normalisateur de Logs Web Nginx / Apache
    - **H3** — Exercice 2 — Détecteur d’Anomalies de Débit de Logs (Spike & Drop)
    - **H3** — Exercice 3 — Corrélateur Multi-Sources de Logs d’Incidents de Sécurité
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
| nav | `b3-supervisionnav` | Portail → `/`<br>Supervision &amp; Observabilité B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Supervision &amp; Observabilité B3 | `../index.html` | `b3-supervision/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-supervision/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-supervision/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-supervision/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-supervision/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-supervision/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-supervision/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-supervision/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-supervision/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-supervision/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-supervision/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-supervision/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-supervision/chapitres/examens.html` | interne |
| Supervision & Observabilité B3 | `../index.html` | `b3-supervision/index.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-supervision/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-supervision/chapitres/formules.html` | interne |
| Module 6 — Stratégies d'Alerting, Capacity Planning & Auto-Remédiation SRE | `chapitre6.html` | `b3-supervision/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Filebeat est une application Java lourde |  | — | `opt` | — | actif | — |
| Filebeat est un binaire autonome léger écrit en Go qui consomme très peu de CPU et de mémo |  | — | `opt` | — | actif | data-correct=1 |
| Filebeat remplace la base Elasticsearch |  | — | `opt` | — | actif | — |
| Filebeat ne fonctionne que sous Windows |  | — | `opt` | — | actif | — |
| Port 5601 |  | — | `opt` | — | actif | — |
| Port 9200 |  | — | `opt` | — | actif | data-correct=1 |
| Port 5044 |  | — | `opt` | — | actif | — |
| Port 9090 |  | — | `opt` | — | actif | — |
| Un protocole de routage réseau |  | — | `opt` | — | actif | — |
| Une bibliothèque de motifs d'expressions régulières nommées permettant de découper du text |  | — | `opt` | — | actif | data-correct=1 |
| Un algorithme de chiffrement asymétrique |  | — | `opt` | — | actif | — |
| Un outil de compression zip |  | — | `opt` | — | actif | — |
| Log Flood |  | — | `opt` | — | actif | — |
| Log Drop |  | — | `opt` | — | actif | data-correct=1 |
| Normal Drift |  | — | `opt` | — | actif | — |
| Capacity Spike |  | — | `opt` | — | actif | — |
| Port 9200 |  | — | `opt` | — | actif | — |
| Port 5601 |  | — | `opt` | — | actif | data-correct=1 |
| Port 3000 |  | — | `opt` | — | actif | — |
| Port 8080 |  | — | `opt` | — | actif | — |
| L'arrêt complet du serveur Linux |  | — | `opt` | — | actif | — |
| La capacité de l'agent à ralentir la lecture des logs si le collecteur Logstash ou Elastic |  | — | `opt` | — | actif | data-correct=1 |
| Le chiffrement des disques durs |  | — | `opt` | — | actif | — |
| L'inversion des flux réseau |  | — | `opt` | — | actif | — |
| Pour rendre les logs illisibles aux attaquants |  | — | `opt` | — | actif | — |
| Pour standardiser les noms de champs (ex: client_ip vs src_ip) et permettre des corrélatio |  | — | `opt` | — | actif | data-correct=1 |
| Pour économiser les adresses IPv4 |  | — | `opt` | — | actif | — |
| Pour désactiver le pare-feu |  | — | `opt` | — | actif | — |
| Le numéro de série de l'ordinateur |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sup3-c5-e1` | analyse | 300 | active | `LOG_PARSE 192.168.1.10 - - [11/Oct/2026:14:32:10 +0000] "GET /api/v1/users HTTP/1.1" 500 2314 "-" "curl/7.88.1"` | Exercice 1 — Parseur et Normalisateur de Logs Web Nginx / Apache |
| `sup3-c5-e2` | analyse | 300 | active | `EPS_CHECK BASELINE=500.0 MIN_DROP=80.0 MAX_SPIKE=200.0 SAMPLES=480.0,510.0,520.0,1600.0` | Exercice 2 — Détecteur d’Anomalies de Débit de Logs (Spike & Drop) |
| `sup3-c5-e3` | analyse | 300 | active | `CORRELATE TARGET_IP=198.51.100.42 LOGS=firewall:198.51.100.42:PortScan:WARN\|proxy:198.51.100.42:AuthFailed:WARN\|proxy:10.0.0.5:HomeView:INFO\|auth:198.51.100.42:BruteForce:ALERT` | Exercice 3 — Corrélateur Multi-Sources de Logs d’Incidents de Sécurité |

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
- Blocs `pre` : 4 · elements `code` : 38
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-chart`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2990 mots · 458 noeuds HTML

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
