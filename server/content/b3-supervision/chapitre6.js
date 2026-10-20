/**
 * server/content/b3-supervision/chapitre6.js — Chapitre 6
 * Stratégies d'Alerting, Capacity Planning & Auto-Remédiation SRE
 */
'use strict';

module.exports = {
  n: 6,
  title: 'Stratégies d\'Alerting, Capacity Planning & Auto-Remédiation SRE',
  short: 'Stratégies d\'Alerting & SRE',
  toc: 'Prévention de la fatigue d\'alerte, détection de flapping, modélisation de capacité par régression linéaire et runbooks d\'auto-remédiation.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'L\'équipe d\'astreinte de votre organisation subit une surcharge d\'alertes nocturnes (plus de 150 notifications par garde), dont 80% sont des fausses alertes ou des services qui oscillent. ' +
    'Les ingénieurs sont épuisés et risquent de manquer une véritable panne critique. ' +
    'En tant qu\'Ingénieur SRE / Supervision Senior, vous prenez la responsabilité de refondre la politique d\'alerte : ' +
    'implémenter un algorithme anti-flapping pour bloquer le déluge de notifications sur les services instables, ' +
    'déployer une sonde prédictive de Capacity Planning pour anticiper la saturation des volumes de stockage plusieurs semaines à l\'avance, ' +
    'et automatiser les interventions récurrentes grâce à un moteur d\'auto-remédiation par runbooks sécurisé par des quotas de réessais.',

  objectives: [
    'Concevoir une stratégie d\'alerte moderne réduisant la fatigue d\'alerte (Alert Fatigue) grâce aux seuils amortis, à l\'hystérésis et au groupement contextuel.',
    'Implémenter un algorithme mathématique de détection de flapping pour suspendre automatiquement les alertes des services oscillants.',
    'Construire un modèle de prédiction linéaire de capacité (Capacity Planning) pour estimer le nombre de jours restants avant la saturation d\'une ressource.',
    'Structurer et exécuter des runbooks d\'auto-remédiation (Event-Driven Automation) avec garde-fous de tentatives et basculement vers l\'opérateur humain.'
  ],

  sections: [
    {
      title: 'La Fatigue d\'Alerte &amp; les Techniques d\'Amortissement (Hystérésis)',
      html: [
        '<p>La <strong>fatigue d\'alerte (Alert Fatigue)</strong> est le piège le plus destructeur pour un centre d\'exploitation : lorsqu\'un exploitant reçoit des centaines de notifications inutiles, il finit par ignorer ou désactiver les alertes, passant à côté d\'un sinistre majeur :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les 3 Principes d\'une Alerte de Qualité</h4>',
        '    <ul>',
        '      <li><strong>Actionnable :</strong> Une alerte ne doit se déclencher que si elle exige une action humaine immédiate. Si aucune action n\'est requise, c\'est une métrique de tableau de bord, pas une alerte.</li>',
        '      <li><strong>Symptôme plutôt que cause :</strong> Alerter d\'abord sur l\'impact utilisateur (ex: « Le taux d\'erreur sur le panier est de 15% ») plutôt que sur un micro-indicateur interne (« Le thread 4 est à 90% »).</li>',
        '      <li><strong>Priorisation rigoureuse :</strong> Réserver les sonneries d\'astreinte nocturnes (SMS, appel PagerDuty) aux pannes P1 avec rupture de service.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>L\'Hystérésis des Seuils</h4>',
        '    <p>Pour éviter qu\'un service ne bascule continuellement entre OK et CRITICAL lorsque sa valeur oscille autour de la limite (ex: 80% de RAM), on introduit deux seuils disjoints :</p>',
        '    <ul>',
        '      <li><strong>Seuil de déclenchement (Trigger) :</strong> L\'alerte se déclenche lorsque la ressource dépasse <strong>85%</strong>.</li>',
        '      <li><strong>Seuil de rétablissement (Recovery) :</strong> L\'état ne redevient nominal que lorsque la ressource redescend sous <strong>75%</strong>.</li>',
        '    </ul>',
        '    <p>Cette marge empêche le bombardement d\'alertes en cas d\'ondulation autour du seuil.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Détection Mathématique du Flapping &amp; Suspension Temporaire',
      html: [
        '<p>Le <strong>Flapping</strong> survient lorsqu\'une interface réseau instable (câble mal enfiché) ou un processus redémarrant en boucle génère une série de transitions rapides :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Algorithme de Détection</h4>',
        '    <p>Soit une suite chronologique de $N$ états successifs :</p>',
        '    <p><code>[OK, CRITICAL, OK, CRITICAL, OK, CRITICAL]</code></p>',
        '    <ol>',
        '      <li>On dénombre les transitions où <code>state[i] != state[i-1]</code>.</li>',
        '      <li>On calcule le taux d\'oscillation :<br><code>Taux = (Transitions / (N - 1)) * 100.0</code></li>',
        '      <li>Si le taux dépasse le seuil configuré (ex: 25%), le service est basculé en état spécial <strong>FLAPPING</strong>.</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Politique de Suspension des Notifications</h4>',
        '    <p>Dès l\'activation du mode FLAPPING :</p>',
        '    <ul>',
        '      <li>L\'émission des notifications unitaires à chaque basculement est <strong>immédiatement suspendue</strong>.</li>',
        '      <li>Un unique message d\'information est transmis : « Le service est instable et entre en mode flapping. Notifications gelées. »</li>',
        '      <li>Le mode flapping n\'est désactivé que lorsque le service reste stable dans le même état pendant une durée minimale consécutive.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Capacity Planning Linéaire &amp; Auto-Remédiation par Runbooks',
      html: [
        '<p>Le passage d\'une supervision réactive à une posture proactive repose sur l\'anticipation et l\'automatisation :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Capacity Planning par Régression Linéaire</h4>',
        '    <p>Au lieu d\'attendre qu\'un disque dur soit plein à 95% pour sonner l\'alerte en pleine nuit, la métrologie calcule la pente d\'accroissement journalier :</p>',
        '    <p><code>a = Σ(x - x̄)(y - ȳ) / Σ(x - x̄)²</code> (où $a$ est la vitesse de consommation en Go/jour).</p>',
        '    <p>Le système peut alors prédire mathématiquement :<br>« Au rythme actuel (+10 Go/jour), le volume <code>/data</code> atteindra le seuil d\'alerte dans 16 jours et sera saturé à 100% dans 26 jours. »</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Auto-Remédiation (Event-Driven Automation)</h4>',
        '    <p>Pour les pannes bien documentées, un moteur automatisé déclenche une action pré-approuvée (Runbook) :</p>',
        '    <ul>',
        '      <li>Service figé -&gt; <code>restart_service</code></li>',
        '      <li>Disque temporaire saturé -&gt; <code>purge_tmp_logs</code></li>',
        '      <li>File de messages pleine -&gt; <code>scale_worker_pool</code></li>',
        '    </ul>',
        '    <p><strong>Garde-fou indispensable :</strong> Limiter à <code>max_retries</code> tentatives (ex: 3). Si l\'action échoue 3 fois, l\'auto-remédiation s\'arrête et déclenche une alerte prioritaire vers l\'ingénieur d\'astreinte pour empêcher les boucles infinies destructrices.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Optimisation : Alerting, Capacity Planning & Auto-Remédiation',
  method: [
    'Éradiquer la fatigue d\'alerte : appliquer les techniques d\'hystérésis, de fenêtres glissantes et de détection de flapping pour ne notifier que sur des incidents réels.',
    'Automatiser le Capacity Planning : ajuster des régressions linéaires sur les métriques de stockage et de mémoire afin de prédire la date d\'épuisement des ressources (Time to Saturation).',
    'Structurer les runbooks opérationnels : formaliser des procédures pas-à-pas intégrant conditions de diagnostic, commandes d\'atténuation et critères de résolution.',
    'Mettre en œuvre l\'auto-remédiation sécurisée : programmer l\'exécution automatique d\'actions correctives (restart_service, scale_up) avec garde-fous stricts de réessais maximaux.'
  ],

  summary: [
    'La fatigue d\'alerte est l\'ennemi n°1 de l\'astreinte : un flot excessif d\'alertes non actionnables conduit inévitablement à ignorer les incidents critiques réels.',
    'L\'hystérésis et la détection d\'état battant (flapping) suppriment les notifications en rafale issues d\'oscillations légères autour des seuils.',
    'Le Capacity Planning transforme la métrologie passive en anticipation proactive grâce aux modèles statistiques de régression linéaire.',
    'L\'automatisation des runbooks permet une résolution en quelques secondes des incidents récurrents à faible valeur ajoutée humaine.',
    'Tout moteur d\'auto-remédiation doit impérativement plafonner ses tentatives pour prévenir les tempêtes de redémarrages et escalader vers l\'humain en cas d\'échec.'
  ],

  checklist: [
    'Quelles mesures concrètes mettez-vous en place pour prévenir l\'engourdissement et la fatigue d\'alerte du NOC ?',
    'Comment le mécanisme d\'hystérésis protège-t-il les opérateurs contre les alertes oscillantes ?',
    'Savez-vous calculer la date prévisionnelle de saturation d\'un disque à partir d\'une régression linéaire y = ax + b ?',
    'Quels sont les composants indispensables d\'un runbook de remédiation d\'incident ?',
    'Pourquoi un système d\'auto-remédiation sans seuil d\'échec maximal est-il une vulnérabilité majeure en production ?'
  ],

  notions: [
    { term: 'Fatigue d\'Alerte', def: 'État d\'usure et de désensibilisation des équipes opérationnelles provoqué par un volume excessif de faux positifs.' },
    { term: 'Hystérésis', def: 'Principe consistant à utiliser deux seuils distincts (alerte et rétablissement) pour stabiliser un service oscillant.' },
    { term: 'Flapping', def: 'Changements d\'état trop fréquents et répétés d\'un service entre OK et CRITICAL sur une courte période.' },
    { term: 'Capacity Planning', def: 'Modélisation et projection statistique de la consommation des ressources pour anticiper les besoins d\'extension.' },
    { term: 'Auto-Remédiation', def: 'Exécution automatique d\'actions correctives pré-programmées dès la détection d\'un incident standardisé.' },
    { term: 'Runbook', def: 'Procédure opérationnelle standardisée décrivant pas à pas les actions à mener pour résoudre un incident spécifique.' }
  ],

  pitfalls: [
    'Envoyer des alertes nocturnes sur des notifications non urgentes qui pourraient attendre le lendemain matin.',
    'Implémenter un script d\'auto-remédiation sans compteur de tentatives maximales : risque de redémarrer en boucle infinie et d\'effacer les traces de diagnostic.',
    'Baser la prédiction de capacité sur un historique trop court (ex: 2 heures), faussant la pente journalière en raison d\'une sauvegarde ponctuelle.',
    'Désactiver la détection de flapping pour forcer les alertes : saturation garantie des boîtes de messagerie et abandon des outils par les équipes.'
  ],

  questions: [
    {
      stem: 'Quel est l\'objectif premier de l\'intégration du principe d\'hystérésis dans la configuration d\'un seuil de supervision ?',
      opts: ['Augmenter le nombre d\'emails envoyés', 'Empêcher les alertes en rafale lorsqu\'une valeur oscille légèrement autour de la frontière d\'alerte', 'Chiffrer les données de télémétrie', 'Remplacer l\'agent SNMP'],
      correct: 1,
      exp: 'En fixant un seuil de déclenchement plus haut que le seuil de rétablissement (ex: alerte à 85%, retour à 75%), on élimine les alertes répétées dues aux oscillations mineures.'
    },
    {
      stem: 'Dans un algorithme de détection de flapping, que fait le système de supervision lorsque le pourcentage d\'oscillation d\'un service dépasse le seuil critique ?',
      opts: ['Il supprime définitivement le serveur du réseau', 'Il bascule le service en état FLAPPING et gèle temporairement l\'envoi des alertes individuelles', 'Il formate le disque dur', 'Il désactive les pare-feux'],
      correct: 1,
      exp: 'Le mode FLAPPING bloque le déluge de notifications individuelles pour protéger l\'attention des opérateurs d\'exploitation.'
    },
    {
      stem: 'Un volume de stockage de 1 000 Go contient actuellement 700 Go de données. La pente journalière de consommation est de 10 Go/jour. Dans combien de jours atteindra-t-il le seuil de 900 Go (90%) ?',
      opts: ['10 jours', '20 jours', '30 jours', '100 jours'],
      correct: 1,
      exp: 'Espace restant avant 900 Go = 900 - 700 = 200 Go. Au rythme de 10 Go/jour : 200 / 10 = 20 jours.'
    },
    {
      stem: 'Pourquoi est-il vital d\'instaurer une limite stricte de réessais (max_retries) dans un mécanisme d\'auto-remédiation exécutant un runbook ?',
      opts: ['Pour économiser le papier d\'impression', 'Pour éviter qu\'un service défaillant ne boucle indéfiniment en redémarrant en continu et pour forcer l\'escalade humaine si la cause est profonde', 'Car Linux interdit plus de 3 commandes par heure', 'Pour accélérer le processeur'],
      correct: 1,
      exp: 'Si un script redémarre un service qui crash immédiatement à cause d\'une corruption de base, relancer en boucle masque le problème et peut aggraver la corruption. L\'intervention humaine devient alors indispensable.'
    },
    {
      stem: 'Selon les meilleures pratiques de supervision, quelle caractéristique définit une alerte pertinente ?',
      opts: ['Elle doit contenir au moins 500 lignes de texte', 'Elle doit être immédiatement actionnable par la personne qui la reçoit', 'Elle doit être envoyée à l\'ensemble des employés de l\'entreprise', 'Elle doit être planifiée à heure fixe'],
      correct: 1,
      exp: 'Une alerte qui ne nécessite aucune intervention humaine n\'a pas lieu d\'exister en tant qu\'alerte : elle génère de la pollution mentale et de la fatigue d\'alerte.'
    },
    {
      stem: 'Dans une régression linéaire simple pour le Capacity Planning (y = a*x + b), que représente la variable « a » ?',
      opts: ['La capacité totale du serveur', 'La pente de croissance, c\'est-à-dire le volume moyen de ressource consommée par unité de temps (Go/jour)', 'Le pourcentage d\'erreurs HTTP', 'L\'adresse IP de la sonde'],
      correct: 1,
      exp: 'La pente a quantifie le rythme journalier d\'accroissement de la consommation, permettant d\'extrapoler la date de saturation future.'
    },
    {
      stem: 'Quelle action est typiquement automatisée par un runbook de remédiation lorsque le volume /tmp est saturé ?',
      opts: ['L\'achat de nouveaux disques sur internet', 'La purge des fichiers temporaires et archives de logs obsolètes', 'L\'extinction complète du centre de données', 'La réinstallation du système d\'exploitation'],
      correct: 1,
      exp: 'La suppression des fichiers temporaires plus anciens qu\'un certain nombre de jours (purge /tmp) est un cas d\'école classique de remédiation automatisée sûre.'
    },
    {
      stem: 'Comment appelle-t-on le document opérationnel décrivant les procédures pas-à-pas pour diagnostiquer et rétablir un service lors d\'un incident précis ?',
      opts: ['Un Runbook (ou Playbook)', 'Un devis commercial', 'Une RFC', 'Un brevet logiciel'],
      correct: 0,
      exp: 'Un Runbook consigne les commandes précises, vérifications et actions correctives à dérouler pour résoudre rapidement un dysfonctionnement spécifique.'
    }
  ],

  flashcards: [
    {
      q: 'Qu\'est-ce que la fatigue d\'alerte (Alert Fatigue) ?',
      a: 'L\'épuisement des exploitants submergés de notifications non urgentes ou de faux positifs, menant à l\'ignorance d\'incidents réels.'
    },
    {
      q: 'Quel est le principe de l\'hystérésis sur un seuil d\'alerte ?',
      a: 'Avoir un seuil d\'alerte distinct (ex: 85%) plus élevé que le seuil de retour à la normale (ex: 75%) pour éviter les oscillations.'
    },
    {
      q: 'Comment réagit le système de supervision en cas de flapping détecté ?',
      a: 'Il passe le service en état FLAPPING et suspend les alertes individuelles répétées pour protéger l\'astreinte.'
    },
    {
      q: 'Comment le Capacity Planning prédit-il la saturation d\'un disque ?',
      a: 'Par régression linéaire calculant la pente de consommation journalière (Go/jour) et le nombre de jours restants avant saturation.'
    },
    {
      q: 'Pourquoi limiter le nombre de tentatives dans un runbook d\'auto-remédiation ?',
      a: 'Pour empêcher les boucles d\'échec infinies et transférer immédiatement la main à un exploitant humain (escalade).'
    },
    {
      q: 'Qu\'est-ce qu\'une alerte actionnable ?',
      a: 'Une notification justifiée qui exige une action humaine immédiate pour éviter ou résoudre une rupture de service.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Notions de fatigue d\'alerte et flapping à revoir. Révisez l\'hystérésis et la gestion des seuils.' },
    { cls: 'mid', text: 'Score 60-74 % : Principes d\'alerting compris. Approfondissez les calculs de Capacity Planning et l\'auto-remédiation.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise d\'ensemble. Entraînez-vous à implémenter les algorithmes anti-flapping dans l\'atelier.' },
    { cls: 'high', text: 'Score 85-94 % : Très bon niveau SRE. Vous maîtrisez la régression linéaire et la résilience opérationnelle.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'architecte. Vous avez complété avec brio l\'ensemble du cursus Supervision B3 !' }
  ]
};
