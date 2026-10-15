/**
 * server/content/b3-supervision/chapitre3.js — Chapitre 3
 * Supervision des Systèmes & Réseaux avec Zabbix & Nagios Core
 */
'use strict';

module.exports = {
  n: 3,
  title: 'Supervision des Systèmes & Réseaux avec Zabbix & Nagios Core',
  short: 'Zabbix & Nagios Core',
  toc: 'Déploiement Nagios Core et plugins NRPE/Perfdata, architecture Zabbix Server/Agent/Proxy, templates d\'objets, déclencheurs intelligents et matrices d\'escalade.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'Votre entreprise dispose d\'un parc hétérogène comprenant à la fois des serveurs Linux Debian/CentOS, des serveurs Windows Active Directory et des commutateurs infogérés. ' +
    'Vous êtes chargé d\'orchestrer la supervision opérationnelle avec les deux outils piliers du marché open source : ' +
    'auditer et déployer les plugins Nagios avec traitement des métriques de performance (Perfdata), ' +
    'configurer Zabbix en mode agent actif et passif avec des templates personnalisés, concevoir des déclencheurs booléens prédictifs ' +
    'et instaurer une politique d\'escalade automatique suspendant les alertes dès l\'acquittement par l\'ingénieur d\'astreinte.',

  objectives: [
    'Comprendre l\'architecture de Nagios Core et développer/analyser des sondes de supervision respectant les 4 codes retour et le format Perfdata.',
    'Déployer et configurer Zabbix (Server, Frontend Web, Agent passif port 10050, Agent actif port 10051 et Zabbix Proxy).',
    'Concevoir des templates modulaires Zabbix articulant Items, Applications, Déclencheurs (Triggers) et Macros contextuelles.',
    'Programmer des déclencheurs avancés (fonctions avg, last, min, max) et structurer un moteur d\'escalade d\'incidents avec gestion des acquittements.'
  ],

  sections: [
    {
      title: 'Nagios Core : Architecture, Plugins &amp; Données de Performance (Perfdata)',
      html: [
        '<p>Pionnier historique de la supervision open source, <strong>Nagios Core</strong> repose sur une architecture modulaire ultra-légère basée sur l\'exécution périodique de binaires ou de scripts autonomes appelés <em>plugins</em> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Exécution Distante via NRPE &amp; NSClient++</h4>',
        '    <ul>',
        '      <li><strong>Sondes locales vs distantes :</strong> Nagios vérifie les services réseau (HTTP, Ping) directement depuis le serveur maître. Pour les métriques internes (disque, RAM), il s\'appuie sur un agent distant.</li>',
        '      <li><strong>NRPE (Nagios Remote Plugin Executor) :</strong> Démon écoutant sur le port <strong>5666/TCP</strong> des machines Linux. Le serveur ordonne l\'exécution locale d\'une commande (ex: <code>check_disk</code>) et récupère le code de retour.</li>',
        '      <li><strong>NSClient++ :</strong> Agent équivalent pour les environnements Microsoft Windows permettant la collecte WMI et compteurs de performance.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Spécification Standard des Plugins Nagios</h4>',
        '    <p>Chaque sonde communique avec le moteur Nagios selon deux règles strictes :</p>',
        '    <ol>',
        '      <li><strong>Code de sortie processus :</strong><br>',
        '      <code>0</code> = OK (nominal), <code>1</code> = WARNING (seuil d\'alerte), <code>2</code> = CRITICAL (panne), <code>3</code> = UNKNOWN (erreur d\'exécution).</li>',
        '      <li><strong>Format de sortie textuelle :</strong><br>',
        '      <code>TEXT MESSAGE | PERFDATA</code><br>',
        '      Où la section Perfdata (après <code>|</code>) respecte la syntaxe :<br>',
        '      <code>\'label\'=valeur[uom];[warn];[crit];[min];[max]</code></li>',
        '    </ol>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Zabbix Enterprise : Architecture, Agents Passifs/Actifs &amp; Templates',
      html: [
        '<p>Plateforme de supervision tout-en-un moderne, <strong>Zabbix</strong> intègre nativement la collecte, le stockage relationnel/NoSQL, la détection complexe et la visualisation graphique :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Composants Zabbix</h4>',
        '    <ul>',
        '      <li><strong>Zabbix Server :</strong> Cœur du système qui planifie la collecte, évalue les triggers et déclenche les alertes.</li>',
        '      <li><strong>Base de Données :</strong> Stockage des configurations et de l\'historique des métriques (PostgreSQL / MySQL / TimescaleDB).</li>',
        '      <li><strong>Zabbix Frontend :</strong> Interface web moderne d\'administration et de tableaux de bord.</li>',
        '      <li><strong>Zabbix Proxy :</strong> Relais pour environnements distribués et DMZ.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Agent Passif vs Actif</h4>',
        '    <ul>',
        '      <li><strong>Mode Passif (port 10050/TCP) :</strong> Le serveur Zabbix contacte l\'agent sur la machine cible et lui demande la valeur d\'un item (modèle Polling traditionnel).</li>',
        '      <li><strong>Mode Actif (port 10051/TCP) :</strong> L\'agent contacte le serveur, télécharge sa liste d\'items à mesurer, puis pousse les données collectées périodiquement. Idéal pour les pare-feux stricts et les machines derrière NAT.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Hiérarchie des Objets</h4>',
        '    <ul>',
        '      <li><strong>Host :</strong> Équipement ou serveur physique/virtuel surveillé.</li>',
        '      <li><strong>Item :</strong> Métrique unitaire brute (ex: <code>system.cpu.util</code>).</li>',
        '      <li><strong>Trigger :</strong> Condition logique d\'alerte.</li>',
        '      <li><strong>Template :</strong> Modèle réutilisable agrégeant items, triggers, graphiques et règles de découverte (LLD).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Déclencheurs Avancés (Triggers) &amp; Politiques d\'Escalade d\'Incidents',
      html: [
        '<p>Pour éviter les faux positifs et garantir la résolution rapide des pannes, Zabbix propose un moteur d\'expressions puissant et une gestion stricte des escalades :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Fonctions Temporelles de Déclenchement</h4>',
        '    <p>Un trigger évalue l\'historique des valeurs sur une fenêtre glissante :</p>',
        '    <ul>',
        '      <li><code>last()</code> : Dernière valeur reçue.</li>',
        '      <li><code>avg(5m)</code> : Moyenne arithmétique sur 5 minutes (lisse les pics éphémères).</li>',
        '      <li><code>max(10m) / min(10m)</code> : Valeur extrême sur la période.</li>',
        '      <li><code>nodata(5m)</code> : Détecte l\'absence de télémétrie (panne de l\'agent ou de la sonde).</li>',
        '    </ul>',
        '    <p>Exemple de trigger robuste :<br><code>avg(/srv-db/system.cpu.load,5m) &gt; 80 and last(/srv-db/system.cpu.load) &gt; 90</code></p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Paliers d\'Escalade &amp; Acquittement (ACK)</h4>',
        '    <p>Lorsqu\'un problème est détecté, le système ordonnance les notifications par échelons temporels :</p>',
        '    <ol>',
        '      <li><strong>Échelon 1 (immédiat) :</strong> Notification email / chat à l\'équipe d\'exploitation N1.</li>',
        '      <li><strong>Échelon 2 (après 15 min sans ACK) :</strong> Alerte SMS / appel automatique à l\'ingénieur d\'astreinte N2.</li>',
        '      <li><strong>Échelon 3 (après 30 min sans ACK) :</strong> Escalade hiérarchique au responsable des opérations (Manager).</li>',
        '    </ol>',
        '    <p>Dès qu\'un exploitant <strong>acquitte (Acknowledge)</strong> l\'incident dans la console, l\'escalade est immédiatement gelée.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Exploitation : Nagios, Centreon & Zabbix',
  method: [
    'Développer des sondes conformes aux standards Nagios : respecter scrupuleusement les codes de sortie 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN et formater la chaîne perfdata standardisée.',
    'Déployer et sécuriser les agents distants : installer NRPE ou Zabbix Agent avec filtrage d\'adresses IP autorisées et certificats TLS.',
    'Composer des déclencheurs (triggers) intelligents : combiner les fonctions temporelles avg() et last() pour filtrer les faux positifs et absorber le bruit transitoire.',
    'Configurer les politiques d\'escalade et d\'acquittement : définir des règles d\'acheminement N1/N2/N3 temporisées et conditionnées à l\'absence d\'ACK dans la console.'
  ],

  summary: [
    'L\'écosystème Nagios repose sur une architecture modulaire de plugins vérifiant ponctuellement l\'état des services et machines.',
    'Le format Perfdata (ex: metric=val;warn;crit;min;max) permet l\'historisation et le rendu graphique au sein de solutions comme Centreon ou Graphite.',
    'Zabbix offre une solution intégrée tout-en-un avec base de données dédiée, templates réutilisables et agent de collecte haut débit.',
    'Les triggers Zabbix évaluent des expressions booléennes complexes sur des fenêtres temporelles glissantes (avg, min, max, nodata).',
    'L\'acquittement d\'incident (ACK) est la pierre angulaire de la coordination des équipes d\'astreinte, gelant immédiatement le processus d\'escalade.'
  ],

  checklist: [
    'Connaissez-vous les 4 codes de sortie obligatoires d\'un plugin Nagios (0, 1, 2, 3) ?',
    'Savez-vous formater une ligne de sortie avec métriques Perfdata conformes à la spécification Nagios ?',
    'Quelle est la différence fondamentale entre le mode actif et le mode passif de l\'agent Zabbix ?',
    'Savez-vous écrire un trigger Zabbix combinant une moyenne sur 5 minutes et un seuil critique instantané ?',
    'Comment fonctionne le cycle d\'escalade et quel est l\'effet immédiat d\'un acquittement (ACK) par l\'opérateur ?'
  ],

  notions: [
    { term: 'Nagios Core', def: 'Moteur de supervision modulaire exécutant des plugins autonomes vérifiant l\'état des services et des hôtes.' },
    { term: 'NRPE', def: 'Nagios Remote Plugin Executor : démon d\'écoute sur le port 5666/TCP permettant d\'exécuter des sondes locales sur un hôte distant.' },
    { term: 'Perfdata', def: 'Données de performance normalisées retournées par une sonde après le séparateur | pour tracer des graphiques.' },
    { term: 'Zabbix Agent', def: 'Agent de collecte ultra-performant fonctionnant en mode passif (10050/TCP) ou actif (10051/TCP).' },
    { term: 'Trigger Zabbix', def: 'Expression logique booléenne calculée à partir de fonctions temporelles pour qualifier l\'état d\'un service.' },
    { term: 'Escalade d\'Alerte', def: 'Mécanisme d\'augmentation progressive des canaux et cibles de notification tant qu\'une alerte n\'est pas acquittée.' }
  ],

  pitfalls: [
    'Définir des triggers Zabbix basés uniquement sur la fonction last() pour la charge CPU : cela génère une avalanche de faux positifs à chaque micro-pic applicatif.',
    'Oublier de configurer le pare-feu pour le port 5666/TCP (NRPE) ou 10050/TCP (Zabbix Agent passif).',
    'Ne pas inclure de données Perfdata dans les scripts de sondes personnalisés : impossibilité totale de tracer des graphiques de métrologie dans Nagios/Centreon.',
    'Ne pas activer la détection de flapping sur les services oscillants, saturant les canaux de notification de l\'astreinte.'
  ],

  questions: [
    {
      stem: 'Quel code de sortie un plugin Nagios doit-il renvoyer pour signaler un état CRITICAL au moteur de supervision ?',
      opts: ['Code 0', 'Code 1', 'Code 2', 'Code 3'],
      correct: 2,
      exp: 'Selon la spécification officielle Nagios : 0=OK, 1=WARNING, 2=CRITICAL, et 3=UNKNOWN.'
    },
    {
      stem: 'Quel caractère sépare le message lisible par l\'opérateur des métriques Perfdata dans la sortie d\'un plugin Nagios ?',
      opts: ['Le point-virgule (;)', 'Le caractère tube (|)', 'Le double point (:)', 'Le dièse (#)'],
      correct: 1,
      exp: 'Le caractère tube "|" sépare la ligne de texte humain des données de performance Perfdata destinées au traçage de graphiques.'
    },
    {
      stem: 'Sur quel port TCP un agent Zabbix configuré en mode passif écoute-t-il les requêtes du serveur Zabbix ?',
      opts: ['Port 10050', 'Port 10051', 'Port 5666', 'Port 161'],
      correct: 0,
      exp: 'En mode passif, le Zabbix Agent écoute sur le port 10050/TCP. En mode actif, c\'est l\'agent qui initie la connexion vers le serveur sur le port 10051/TCP.'
    },
    {
      stem: 'Dans Zabbix, quelle fonction de trigger permet de calculer la moyenne des mesures sur une fenêtre de 5 minutes ?',
      opts: ['last(5m)', 'avg(5m)', 'sum(5m)', 'count(5m)'],
      correct: 1,
      exp: 'La fonction avg(5m) calcule la moyenne arithmétique de la métrique sur les 5 dernières minutes, ce qui permet de lisser les pics temporaires.'
    },
    {
      stem: 'Quel est l\'effet immédiat de l\'action « Acquitter » (Acknowledge) d\'un incident par un exploitant dans la console de supervision ?',
      opts: ['Le redémarrage immédiat du serveur en panne', 'Le gel de l\'escalade automatique et la suspension des notifications répétées aux astreintes', 'La suppression définitive de l\'hôte du système de supervision', 'La réinitialisation de la base de données'],
      correct: 1,
      exp: 'L\'acquittement signale au système qu\'un opérateur humain a pris en charge le problème, ce qui stoppe les paliers d\'escalade vers les échelons supérieurs.'
    },
    {
      stem: 'Quel démon permet au serveur Nagios d\'exécuter des plugins locaux sur des serveurs distants Linux ?',
      opts: ['Zabbix Proxy', 'NRPE (Nagios Remote Plugin Executor)', 'Filebeat', 'Node Exporter'],
      correct: 1,
      exp: 'NRPE écoute sur le port 5666/TCP des hôtes Linux et exécute les plugins de supervision locaux à la demande du serveur Nagios.'
    },
    {
      stem: 'Pourquoi le mode agent actif de Zabbix est-il particulièrement avantageux pour surveiller des postes nomades ou des serveurs en cloud privé ?',
      opts: ['Parce qu\'il ne nécessite aucune installation logicielle', 'Parce que l\'agent initie la connexion sortante vers le serveur, évitant d\'avoir à ouvrir des ports entrants derrière un NAT', 'Parce qu\'il n\'utilise pas de mémoire vive', 'Parce qu\'il remplace le système d\'exploitation'],
      correct: 1,
      exp: 'En mode actif, l\'agent initie une connexion sortante standard vers le port 10051 du Zabbix Server, ce qui traverse sans difficulté les passerelles NAT et pare-feux.'
    },
    {
      stem: 'Dans la syntaxe Perfdata « disk_free=15GB;20;10;0;100 », que représente la valeur 20 ?',
      opts: ['La valeur maximale du disque', 'Le seuil d\'alerte WARNING', 'Le seuil d\'alerte CRITICAL', 'Le temps de réponse en millisecondes'],
      correct: 1,
      exp: 'Dans la structure label=value;warn;crit;min;max, le premier paramètre après la valeur mesurée est le seuil de WARNING (ici 20).'
    }
  ],

  flashcards: [
    {
      q: 'Quels sont les 4 codes de retour standard d\'un plugin Nagios ?',
      a: '0=OK, 1=WARNING, 2=CRITICAL, et 3=UNKNOWN.'
    },
    {
      q: 'Quel est le format standard des métriques Perfdata dans Nagios ?',
      a: 'TEXT MESSAGE | label=valeur[uom];[warn];[crit];[min];[max].'
    },
    {
      q: 'Quelle est la différence de port entre Zabbix Agent passif et actif ?',
      a: 'Passif : écoute sur 10050/TCP. Actif : envoie les données vers le Zabbix Server sur 10051/TCP.'
    },
    {
      q: 'À quoi sert le démon NRPE dans Nagios ?',
      a: 'À exécuter des sondes locales de surveillance sur des machines Linux distantes via le port 5666/TCP.'
    },
    {
      q: 'Pourquoi utilise-t-on la fonction avg() dans un trigger plutôt que last() ?',
      a: 'Pour lisser les mesures et éviter les faux positifs causés par des pics de charge très brefs et normaux.'
    },
    {
      q: 'Que produit l\'acquittement (ACK) d\'un incident dans Zabbix/Nagios ?',
      a: 'Il atteste la prise en charge par un technicien et suspend les paliers d\'escalade automatique d\'alertes.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Notions Nagios/Zabbix incertaines. Révisez les codes retour et les ports d\'écoute des agents.' },
    { cls: 'mid', text: 'Score 60-74 % : Bases assimilées. Approfondissez la syntaxe Perfdata et la rédaction des triggers Zabbix.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise d\'ensemble. Entraînez-vous à parser les sorties de plugins dans l\'atelier.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau opérationnel solide. Vous maîtrisez le déploiement des agents et les mécanismes d\'escalade.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'architecte. Prêt pour l\'observabilité moderne avec Prometheus et Grafana du Module 4 !' }
  ]
};
