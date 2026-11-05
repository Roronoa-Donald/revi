# Supervision & Observabilité B3

> Fiche extraite du fichier `b3-supervision/index.html` (245 lignes, 21.3 Ko, sha256 `b2028b137123`).
> Famille : **cours-b3-supervision** · sous-type : `index` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-supervision/index.html` |
| Titre du document | Accueil — Supervision &amp; Observabilité B3 |
| Description meta | Formation d'excellence en ingénierie de la supervision et de l'observabilité pour le Bachelor 3 : fondements méthodologiques et distinctions clés (supervision temps réel, monitoring, métrologie de performance, audit ponctuel), cartographie des périmètres (matériel physique IPMI/iDRAC, hyperviseurs, réseau, services protocolaires et applications métiers), indicateurs de fiabilité (MTBF, MTTR, taux de disponibilité contractuelle SLA et modélisation de l'Error Budget SRE), architectures de supervision centralisées et distribuées (collecteurs, proxies locaux, isolation DMZ), fonctionnement approfondi du protocole SNMP (arborescence MIB-2, identifiants OID, scalaires et tableaux d'interfaces ifOperStatus/ifInOctets, requêtes synchrones Get/Walk et alertes asynchrones Traps/Informs), sécurité SNMPv3 USM (niveaux noAuthNoPriv, authNoPriv avec hachage SHA, et authPriv avec chiffrement symétrique AES), et normalisation de la journalisation avec Syslog RFC 5424 (calcul de priorité PRI, Facility, Severity et transport sécurisé TLS), supervision des systèmes et réseaux avec Nagios Core et Zabbix Enterprise : développement de sondes et plugins respectant les 4 codes de retour (0 OK, 1 WARNING, 2 CRITICAL, 3 UNKNOWN), format normalisé des données de performance Perfdata pour le traçage graphique, démons NRPE et NSClient++, architecture Zabbix (Server, Database, Frontend Web, Zabbix Proxy, Agent passif port 10050/TCP et Agent actif port 10051/TCP), modélisation par templates réutilisables, déclencheurs intelligents avec fonctions temporelles (avg, last, min, max, nodata) et ordonnancement d'escalade d'incidents avec suspension immédiate lors de l'acquittement (ACK), métrologie moderne et observabilité cloud-native avec Prometheus et Grafana : architecture Pull par scraping HTTP OpenMetrics, découverte dynamique de services (Kubernetes Service Discovery), les 4 types de métriques standards (Counter, Gauge, Histogram, Summary), langage fonctionnel PromQL (dérivées par seconde avec rate et irate, agrégations multidimensionnelles sum by, centiles de latence histogram_quantile), gestion des alertes avec Alertmanager (groupement, règles d'inhibition causale, mises sous silence) et tableaux de bord interactifs Grafana, centralisation et analyse de journaux à l'échelle avec la suite Elastic / OpenSearch : agents d'expédition légers Filebeat avec contrôle de contre-pression (backpressure), pipelines de transformation Logstash avec parsing grok et normalisation ECS (Elastic Common Schema), indexation distribuée dans Elasticsearch (port 9200/TCP) et exploration Kibana (port 5601/TCP), métrologie des flux volumétriques EPS (Events Per Second) pour détecter les inondations (Log Flood) et les pannes silencieuses (Log Drop), et corrélation multi-sources SIEM/SOC pour isoler et mettre en quarantaine les adresses IP suspectes, et enfin stratégies d'alerting avancées et automatisation SRE : prévention de la fatigue d'alerte (Alert Fatigue), technique d'hystérésis des seuils, algorithme mathématique de détection de flapping avec gel temporaire des notifications, Capacity Planning prédictif par régression linéaire pour anticiper la saturation des disques (Go/jour), et auto-remédiation par exécution automatisée de runbooks (redémarrage de services, purge de logs, redimensionnement) avec garde-fous de réessais (max_retries) et escalade vers l'opérateur humain. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Supervision & Observabilité B3 |
| 3 | h2 | — | Parcours d’apprentissage |
| 4 | h2 | — | La Supervision & l'Observabilité en Bachelor 3 |
| 5 | h2 | — | Outils et Méthodes Étudiés |

## 3. Hierarchie des titres

- **H1** — Supervision & Observabilité B3
  - **H2** — Parcours d’apprentissage
    - **H3** — Fondements de la Supervision, Périmètres & Indicateurs de Fiabilité (SLA, MTBF, MTTR)
    - **H3** — Architecture des Systèmes de Supervision & Protocoles de Collecte (SNMP & Syslog)
    - **H3** — Supervision des Systèmes & Réseaux avec Zabbix & Nagios Core
    - **H3** — Métrologie & Observabilité Moderne avec Prometheus & Grafana
    - **H3** — Gestion des Journaux & Logs Centralisés, Détection d'Anomalies & SIEM (ELK/EFK)
    - **H3** — Stratégies d'Alerting, Capacity Planning & Auto-Remédiation SRE
  - **H2** — La Supervision & l'Observabilité en Bachelor 3
  - **H2** — Outils et Méthodes Étudiés
      - **H4** — Zabbix & Nagios Core
      - **H4** — Prometheus & Grafana
      - **H4** — Logs ELK & SRE

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-supervisionnav` | Portail → `/`<br>Supervision &amp; Observabilité B3 → `index.html`<br>Sommaire → `sommaire.html`<br>Ch. 1 → `chapitres/chapitre1.html`<br>Ch. 2 → `chapitres/chapitre2.html`<br>Ch. 3 → `chapitres/chapitre3.html`<br>Ch. 4 → `chapitres/chapitre4.html`<br>Ch. 5 → `chapitres/chapitre5.html`<br>Ch. 6 → `chapitres/chapitre6.html`<br>Cartes → `chapitres/cartes.html`<br>Mémo → `chapitres/formules.html`<br>Exercices → `chapitres/exercices.html`<br>Atelier → `atelier.html`<br>Examen → `chapitres/examens.html` |
| header | `hero` | Démarrer le cours → `chapitres/chapitre1.html`<br>Voir le sommaire → `sommaire.html`<br>Bac à sable Supervision & Études de Cas → `atelier.html` |

Liens sortants : **25** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Supervision &amp; Observabilité B3 | `index.html` | `b3-supervision/index.html` | interne |
| Sommaire | `sommaire.html` | `b3-supervision/sommaire.html` | interne |
| Ch. 1 | `chapitres/chapitre1.html` | `b3-supervision/chapitres/chapitre1.html` | interne |
| Ch. 2 | `chapitres/chapitre2.html` | `b3-supervision/chapitres/chapitre2.html` | interne |
| Ch. 3 | `chapitres/chapitre3.html` | `b3-supervision/chapitres/chapitre3.html` | interne |
| Ch. 4 | `chapitres/chapitre4.html` | `b3-supervision/chapitres/chapitre4.html` | interne |
| Ch. 5 | `chapitres/chapitre5.html` | `b3-supervision/chapitres/chapitre5.html` | interne |
| Ch. 6 | `chapitres/chapitre6.html` | `b3-supervision/chapitres/chapitre6.html` | interne |
| Cartes | `chapitres/cartes.html` | `b3-supervision/chapitres/cartes.html` | interne |
| Mémo | `chapitres/formules.html` | `b3-supervision/chapitres/formules.html` | interne |
| Exercices | `chapitres/exercices.html` | `b3-supervision/chapitres/exercices.html` | interne |
| Atelier | `atelier.html` | `b3-supervision/atelier.html` | interne |
| Examen | `chapitres/examens.html` | `b3-supervision/chapitres/examens.html` | interne |
| Démarrer le cours | `chapitres/chapitre1.html` | `b3-supervision/chapitres/chapitre1.html` | interne |
| Voir le sommaire | `sommaire.html` | `b3-supervision/sommaire.html` | interne |
| Bac à sable Supervision & Études de Cas | `atelier.html` | `b3-supervision/atelier.html` | interne |
| Fondements de la Supervision, Périmètres & Indicateurs de Fiabilité (SLA, MTBF, MTTR) | `chapitres/chapitre1.html` | `b3-supervision/chapitres/chapitre1.html` | interne |
| Architecture des Systèmes de Supervision & Protocoles de Collecte (SNMP & Syslog) | `chapitres/chapitre2.html` | `b3-supervision/chapitres/chapitre2.html` | interne |
| Supervision des Systèmes & Réseaux avec Zabbix & Nagios Core | `chapitres/chapitre3.html` | `b3-supervision/chapitres/chapitre3.html` | interne |
| Métrologie & Observabilité Moderne avec Prometheus & Grafana | `chapitres/chapitre4.html` | `b3-supervision/chapitres/chapitre4.html` | interne |
| Gestion des Journaux & Logs Centralisés, Détection d'Anomalies & SIEM (ELK/EFK) | `chapitres/chapitre5.html` | `b3-supervision/chapitres/chapitre5.html` | interne |
| Stratégies d'Alerting, Capacity Planning & Auto-Remédiation SRE | `chapitres/chapitre6.html` | `b3-supervision/chapitres/chapitre6.html` | interne |
| … | | | 1 lien(s) supplementaire(s) |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |

## 7. Composants pedagogiques et etats observes

- Encadres pedagogiques : 1 (`.box`, variantes `box--*`).

Etats et interactions a reconstruire :

- En-tête : marque + 3 liens (Epreuves, Atelier, Mon compte) + bouton profil + bascule de thème.
- Etat `prepLockedMsg` : bandeau « L'atelier est protege » si `?preparation=locked`, refermable.
- Filtre de niveau : 4 onglets (B1/B2/B3/Tous), onglet actif noir, persistance `portal_selected_level`.
- Recherche : champ `#courseSearch`, filtrage en direct sur `data-title` ; compteur `#activeFilterCount`.
- Etat vide : `#portalEmptyState` (bloc pointille) avec bouton de reinitialisation des filtres.
- Carte « Reprendre » : masquee par defaut (`hidden`), visible si progression locale > 0.
- Utilisateur connecte : bouton profil marque `is-authenticated`, nom en title/aria-label.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 0
- SVG inline : 25 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-chart`, `#i-play`, `#i-layers`, `#i-terminal`, `#i-clock`, `#i-arrow-right`, `#i-info`, `#i-server`, `#i-activity`, `#i-shield`
- Volume de texte : ~728 mots · 204 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 43. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 23 |
| `card` | 9 |
| `badge` | 7 |
| `card__head` | 6 |
| `card__num` | 6 |
| `card__title` | 6 |
| `card__desc` | 6 |
| `card__foot` | 6 |
| `card__time` | 6 |
| `card__link` | 6 |
| `btn` | 4 |
| `stat` | 4 |
| `stat__val` | 4 |
| `stat__lbl` | 4 |
| `btn--lg` | 3 |
| `btn--primary` | 2 |
| `grid` | 2 |
| `skip-nav` | 1 |
| `skip-link` | 1 |
| `b3-supervisionnav` | 1 |

Aucun attribut `data-*`.

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
