# Fidélité aux Sources (Mission A) — `b3-supervision` (Supervision · B3)

- **Cours** : `b3-supervision` (Supervision) — Niveau **B3** (6 chapitres)
- **Documents sources rattachés (3 fichiers, 38 pages)** :
- `textes/B3/Semestre II/Supervision/UPDATE_CDP_COURS_Supervision système et réseaux.txt` (26 pages, statut `ok`)
- `textes/B3/Semestre II/Supervision/Procédure Installation NAGIOS.txt` (3 pages, statut `ok`)
- `textes/B3/Semestre II/Supervision/Procédure Ajout Machines Nagios.txt` (9 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B3/Semestre II/Supervision/UPDATE_CDP_COURS_Supervision système et réseaux.txt#PAGE 1` : *B3-IT : Supervision Système et Réseaux*
- `textes/B3/Semestre II/Supervision/UPDATE_CDP_COURS_Supervision système et réseaux.txt#PAGE 5` : *INTRODUCTION GENERALE*
- `textes/B3/Semestre II/Supervision/UPDATE_CDP_COURS_Supervision système et réseaux.txt#PAGE 9` : *1.3.3 Supervision des services*
- `textes/B3/Semestre II/Supervision/UPDATE_CDP_COURS_Supervision système et réseaux.txt#PAGE 13` : *13*
- `textes/B3/Semestre II/Supervision/UPDATE_CDP_COURS_Supervision système et réseaux.txt#PAGE 17` : *Couche                      Port(s)*
- `textes/B3/Semestre II/Supervision/UPDATE_CDP_COURS_Supervision système et réseaux.txt#PAGE 21` : *CHAPITRE 3 : OUTILS DE SUPERVISION OPEN SOURCE*
- `textes/B3/Semestre II/Supervision/Procédure Installation NAGIOS.txt#PAGE 1` : *1. Prérequis*
- `textes/B3/Semestre II/Supervision/Procédure Installation NAGIOS.txt#PAGE 2` : *4. Créer un mot de passe web pour accéder à*
- **Progression des chapitres sur le site** :
- `b3-supervision/chapitres/chapitre1.html` : **Chapitre 1 — Fondements de la Supervision, Périmètres & Indicateurs de Fiabilité (SLA, MTBF, MTTR)** — 1. Définitions & Distinctions : Supervision, Monitoring, Métrologie & Audit (`L80`), 2. Périmètre Global de la Supervision en Entreprise (`L100`), 3. Indicateurs de Fiabilité Opérationnelle : SLA, MTBF, MTTR & Error Budget (`L139`), 4. Études de cas & applications pratiques (`L165`)
- `b3-supervision/chapitres/chapitre2.html` : **Chapitre 2 — Architecture des Systèmes de Supervision & Protocoles de Collecte (SNMP & Syslog)** — 1. Composants & Topologies d'Architecture de Supervision (`L80`), 2. Le Protocole SNMP : Arborescence MIB, OIDs & Évolution Sécuritaire (v1, v2c, v3) (`L107`), 3. Normalisation de la Journalisation : Syslog RFC 5424 (`L134`), 4. Études de cas & applications pratiques (`L158`)
- `b3-supervision/chapitres/chapitre3.html` : **Chapitre 3 — Supervision des Systèmes & Réseaux avec Zabbix & Nagios Core** — 1. Nagios Core : Architecture, Plugins & Données de Performance (Perfdata) (`L80`), 2. Zabbix Enterprise : Architecture, Agents Passifs/Actifs & Templates (`L106`), 3. Déclencheurs Avancés (Triggers) & Politiques d'Escalade d'Incidents (`L137`), 4. Études de cas & applications pratiques (`L165`)
- `b3-supervision/chapitres/chapitre4.html` : **Chapitre 4 — Métrologie & Observabilité Moderne avec Prometheus & Grafana** — 1. L'Architecture Prometheus & le Modèle de Données Séries Temporelles (TSDB) (`L80`), 2. Les 4 Types de Métriques & le Format d'Exposition OpenMetrics (`L101`), 3. PromQL, Alertmanager & Tableaux de Bord Grafana (`L127`), 4. Études de cas & applications pratiques (`L149`)
- `b3-supervision/chapitres/chapitre5.html` : **Chapitre 5 — Gestion des Journaux & Logs Centralisés, Détection d'Anomalies & SIEM (ELK/EFK)** — 1. L'Architecture de Centralisation des Journaux : Filebeat, Logstash & Elasticsearch (`L80`), 2. Normalisation des Logs & Parsing Grok (`L106`), 3. Métrologie des Flux de Logs (EPS) & Détection d'Incidents SIEM (`L133`), 4. Études de cas & applications pratiques (`L158`)
- `b3-supervision/chapitres/chapitre6.html` : **Chapitre 6 — Stratégies d'Alerting, Capacity Planning & Auto-Remédiation SRE** — 1. La Fatigue d'Alerte & les Techniques d'Amortissement (Hystérésis) (`L80`), 2. Détection Mathématique du Flapping & Suspension Temporaire (`L103`), 3. Capacity Planning Linéaire & Auto-Remédiation par Runbooks (`L128`), 4. Études de cas & applications pratiques (`L151`)

## 2. Couverture (Lacunes & Ajouts)
- Les 6 chapitres du site couvrent les notions des 3 document(s) source(s) (38 pages).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Supervision (Temps Réel)
- **Source PDF** : `textes/B3/Semestre II/Supervision/UPDATE_CDP_COURS_Supervision système et réseaux.txt#PAGE 1` : « B3-IT : Supervision Système et Réseaux 1 »
- **Site web** : `b3-supervision/chapitres/chapitre1.html:L87` : « **Supervision (Temps Réel)** : Surveillance continue et proactive de l'état de santé global du système d'information dans le but de détecter immédiatement les défaillances, d'alerter les expl »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Monitoring (Observation Ciblée)
- **Source PDF** : `textes/B3/Semestre II/Supervision/UPDATE_CDP_COURS_Supervision système et réseaux.txt#PAGE 2` : « ifférences entre supervision, monitoring, métrologie et audit, afin d’adopter une démarche de gestion proactive des performances et de la »
- **Site web** : `b3-supervision/chapitres/chapitre1.html:L88` : « **Monitoring (Observation Ciblée)** : Terme général désignant la collecte continue de données sur des composants précis (processus, états de ports, mémoire, temps de réponse) pour suivre leur compor »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Métrologie (Mesure &amp; Tendance)
- **Source PDF** : `textes/B3/Semestre II/Supervision/UPDATE_CDP_COURS_Supervision système et réseaux.txt#PAGE 2` : « ntre supervision, monitoring, métrologie et audit, afin d’adopter une démarche de gestion proactive des performances et de la disponibilit »
- **Site web** : `b3-supervision/chapitres/chapitre1.html:L94` : « **Métrologie (Mesure &amp; Tendance)** : Collecte, historisation et analyse statistique de métriques quantitatives (charge CPU, occupation disque, débit réseau en octets/s). Son objectif est la modélis »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
