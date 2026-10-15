/**
 * Chapitre 3 du cours « Firewall & Sécurité Réseau B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Politiques de Sécurité, Listes de Contrôle d’Accès (ACL) &amp; NAT',
  short: 'Politiques ACL &amp; NAT',
  toc: 'Moteur d’évaluation First-Match-Wins, politique Default DROP, détection du masquage de règles (Rule Shadowing), redondances et translation d’adresses NAT/PAT (SNAT, DNAT).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans un réseau d’entreprise, la politique de sécurité (PSSI) se matérialise techniquement sous la forme de listes de contrôle d’accès (ACLs) contenant parfois des centaines, voire des milliers de règles. Contrairement à une idée reçue, l’ordre des règles dans un pare-feu n’est pas indifférent : les moteurs de filtrage évaluent les paquets séquentiellement de haut en bas et appliquent la décision de la toute première règle correspondante (First-Match-Wins). Une règle d’interdiction trop générale placée prématurément rend toutes les autorisations suivantes inopérantes (masquage de règle ou Rule Shadowing). À l’inverse, une règle permissive mal positionnée ouvre des brèches silencieuses. De plus, pour interconnecter les plans d’adressage privés (RFC 1918) avec l’Internet public, le pare-feu doit orchestrer la translation d’adresses (NAT/PAT). L’ingénieur B3 doit être capable de concevoir, auditer et optimiser ces matrices sans introduire d’anomalies logiques.',
  objectives: [
    'maîtriser le modèle séquentiel d’évaluation des listes de contrôle d’accès (First-Match-Wins) ;',
    'appliquer rigoureusement la politique du moindre privilège avec règle de clôture Default DROP explicite ;',
    'détecter formellement les anomalies de configuration d’ACLs : Rule Shadowing, redondance, exception mal ordonnée ;',
    'comprendre le fonctionnement théorique et pratique de la translation d’adresses source (SNAT / Masquerade) ;',
    'configurer la translation d’adresses destination (DNAT / Port Forwarding) pour publier des services sécurisés ;',
    'développer en Python 3 des évaluateurs d’ACLs, des détecteurs d’anomalies de masquage et un simulateur de moteur NAT.'
  ],
  sections: [
    {
      title: 'Le Moteur d’Évaluation des ACLs : Principe First-Match-Wins',
      html: [
        '<p>Une <strong>Liste de Contrôle d’Accès (ACL)</strong> est une suite ordonnée de critères de filtrage évaluant chaque flux entrant ou sortant :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Mécanisme Séquentiel</h4>',
        '    <ul>',
        '      <li>Le pare-feu compare les en-têtes du paquet à la Règle 1. S’il y a correspondance totale (IP src, IP dst, proto, port), la règle s’applique (PERMIT ou DENY) et l’évaluation s’arrête immédiatement.</li>',
        '      <li>Si la Règle 1 ne correspond pas, le paquet est comparé à la Règle 2, et ainsi de suite jusqu’à la fin de la table.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Règle Implicite Finale</h4>',
        '    <ul>',
        '      <li>Si le paquet franchit l’intégralité de la liste sans aucune correspondance, la politique de sécurité implicite s’applique : <strong>Default DROP (ou Implicit Deny)</strong>.</li>',
        '      <li>En bonne pratique professionnelle, cette règle finale doit être rendue <strong>explicite</strong> et assortie d’une directive de journalisation (LOG &amp; DROP).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Anomalies de Configuration d’ACLs : Rule Shadowing &amp; Redondance',
      html: [
        '<p>Dans les parcs de pare-feux vieillissants, l’accumulation anarchique de règles produit des pathologies critiques :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Type d’Anomalie</th><th>Définition Formelle</th><th>Impact Sécuritaire / Opérationnel</th><th>Exemple Typique</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><code>Masquage (Shadowing)</code></td><td>Une règle antérieure $R_1$ englobe tous les critères d’une règle postérieure $R_2$ avec une action opposée ($R_1$ DENY et $R_2$ PERMIT).</td><td>$R_2$ n’est jamais atteinte. Le service légitime est bloqué par erreur sans que l’administrateur ne comprenne pourquoi.</td><td>$R_1$: DENY ANY -> 10.0.0.0/24<br>$R_2$: PERMIT TCP -> 10.0.0.10:443</td></tr>',
        '    <tr><td><code>Redondance (Redundancy)</code></td><td>Une règle $R_2$ a la même action qu’une règle antérieure $R_1$ qui l’englobe déjà totalement.</td><td>Inutile, alourdit la mémoire du pare-feu et ralentit le temps d’évaluation des paquets.</td><td>$R_1$: PERMIT ANY -> 10.0.0.5:80<br>$R_2$: PERMIT 192.168.1.1 -> 10.0.0.5:80</td></tr>',
        '    <tr><td><code>Corrélation (Generalization)</code></td><td>Une règle spécifique succède à une règle générale alors qu’elle devrait être placée avant sous forme d’exception.</td><td>L’exception n’est jamais prise en compte car le flux général a déjà été traité.</td><td>$R_1$: PERMIT ANY -> ANY<br>$R_2$: DENY Bad_IP -> ANY</td></tr>',
        '  </tbody>',
        '</table>',
        box('tip', 'Règle d’Or d’Ordonnancement des ACLs', [
          '<p>Toujours ordonner les règles de filtrage de la plus <strong>spécifique</strong> (hôte unique, port précis) vers la plus <strong>générale</strong> (sous-réseau CIDR, ANY), en terminant toujours par le refus implicite <code>DEFAULT DROP</code>.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Translation d’Adresses Réseau : SNAT Masquerade &amp; DNAT Port Forwarding',
      html: [
        '<p>La translation d’adresses (<strong>NAT - Network Address Translation</strong>) modifie à la volée les en-têtes IP des paquets en transit :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. SNAT (Source NAT / Masquerade / PAT)</h4>',
        '    <p>Utilisé pour le trafic sortant du LAN vers Internet. Le pare-feu remplace l’adresse IP source privée (RFC 1918) par son adresse IP publique officielle.</p>',
        '    <p>Grâce au <strong>PAT (Port Address Translation)</strong>, des milliers de postes internes partagent une seule adresse IP publique en réécrivant le port source (ex: <code>192.168.1.50:54123 -> 198.51.100.1:40001</code>).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. DNAT (Destination NAT / Port Forwarding)</h4>',
        '    <p>Utilisé pour le trafic entrant d’Internet vers la DMZ ou le LAN. Le pare-feu remplace l’adresse IP destination publique et le port externe par l’IP interne et le port réel du serveur (ex: <code>198.51.100.1:443 -> 10.0.0.10:8443</code>).</p>',
        '    <p>Permet de publier des services sans exposer le plan d’adressage interne de l’entreprise.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthodologie de Structuration &amp; d’Audit d’une Politique ACL',
  method: [
    '1. Lister exhaustivement les flux métier nécessaires avec leur tuple {IP_src, IP_dst, proto, port, action}.',
    '2. Regrouper les règles par familles fonctionnelles (Administration SSH/HTTPS, Services Web publics, Flux BDD, Supervision).',
    '3. Placer en tête de table les règles de bypass conntrack (ESTABLISHED, RELATED) et de rejet INVALID.',
    '4. Ordonner les règles restantes du cas le plus spécifique vers le cas le plus générique.',
    '5. Exécuter un algorithme de détection de masquage (Rule Shadowing) pour s’assurer qu’aucune règle permissive n’est neutralisée par un antécédent restrictif.',
    '6. Terminer obligatoirement la politique par une règle explicite LOG_AND_DROP tout trafic.'
  ],
  summary: [
    'L’évaluation des ACLs obéit au principe First-Match-Wins : la première règle correspondante met fin à l’analyse.',
    'Le Default DROP garantit qu’aucun trafic imprévu ne traverse le réseau.',
    'Le Rule Shadowing est une anomalie critique où une règle postérieure est rendue inactive par une règle antérieure plus large.',
    'Le SNAT (Masquerade) masque le plan d’adressage privé des clients sortants derrière l’IP publique du pare-feu.',
    'Le DNAT (Port Forwarding) redirige les requêtes entrantes publiques vers les serveurs hébergés en DMZ.'
  ],
  checklist: [
    'Le principe First-Match-Wins et le traitement séquentiel sont maîtrisés.',
    'La règle implicite Default DROP est comprise et formalisée.',
    'La différence entre Rule Shadowing (masquage néfaste) et Redundancy (règle inutile) est claire.',
    'La distinction entre SNAT (sortant) et DNAT (entrant) est assimilée.',
    'Le mécanisme de réécriture des ports en PAT est compris.',
    'Les 3 ateliers de programmation interactive en Python 3 (fw3-c3-e1 à fw3-c3-e3) sont validés.'
  ],
  notions: [
    'Listes de contrôle d’accès (ACL)',
    'Évaluation First-Match-Wins',
    'Politique Default DROP',
    'Rule Shadowing (masquage)',
    'Règles redondantes',
    'Source NAT (SNAT / Masquerade)',
    'Destination NAT (DNAT / Port Forward)',
    'Port Address Translation (PAT)'
  ],
  pitfalls: [
    'Placer une règle DENY générale sur un sous-réseau avant des règles autorisant des serveurs spécifiques de ce sous-réseau.',
    'Confondre SNAT (changement de l’IP source pour sortir) et DNAT (changement de l’IP destination pour entrer).',
    'Oublier de modifier la règle de filtrage lorsqu’on configure une règle DNAT (le pare-feu doit autoriser le port translaté ou le port original selon le moteur).',
    'Créer des règles d’accès ouvertes avec ANY comme port destination sous prétexte de simplifier le dépannage.'
  ],
  questions: [
    {
      stem: 'Dans un moteur d’évaluation First-Match-Wins, que se passe-t-il dès qu’un paquet correspond aux critères d’une règle ?',
      opts: [
        'L’action de cette règle est appliquée immédiatement et l’évaluation des règles suivantes est arrêtée',
        'Le paquet continue à être comparé à toutes les règles suivantes pour faire une moyenne',
        'Le paquet est renvoyé à l’émetteur pour confirmation',
        'Le pare-feu applique obligatoirement l’action la plus restrictive parmi toutes les règles'
      ],
      correct: 0,
      exp: 'En First-Match-Wins, la première correspondance est définitive ; aucune règle ultérieure n’est consultée pour ce paquet.'
    },
    {
      stem: 'Qu’est-ce que l’anomalie de configuration appelée « Rule Shadowing » ?',
      opts: [
        'Une règle antérieure englobe totalement les critères d’une règle postérieure avec une action contraire, empêchant cette dernière d’être jamais exécutée',
        'Une règle qui masque le mot de passe de l’administrateur dans les logs',
        'Une règle qui s’applique uniquement pendant la nuit',
        'Un bogue de mémoire vive faisant disparaître les règles après un redémarrage'
      ],
      correct: 0,
      exp: 'Le Rule Shadowing survient lorsqu’une règle plus générale placée plus haut intercepte tout le trafic destiné à une règle plus spécifique située plus bas.'
    },
    {
      stem: 'Quel est l’ordre logique recommandé pour organiser les règles au sein d’une ACL ?',
      opts: [
        'De la règle la plus spécifique (hôte, port précis) vers la règle la plus générale (sous-réseau, ANY)',
        'De la règle la plus générale vers la plus spécifique',
        'Par ordre alphabétique des noms de serveurs',
        'Toutes les règles DENY d’abord puis toutes les règles PERMIT à la fin'
      ],
      correct: 0,
      exp: 'Placer le spécifique avant le général permet de traiter les exceptions d’abord avant d’appliquer la politique globale.'
    },
    {
      stem: 'Quel mécanisme réseau permet à plusieurs milliers d’ordinateurs internes de naviguer sur Internet avec une seule adresse IP publique ?',
      opts: [
        'Le PAT (Port Address Translation / SNAT dynamique) qui associe chaque flux à un port source éphémère unique',
        'Le routage statique sans passerelle',
        'Le protocole ARP gratuit',
        'Le protocole Spanning Tree (STP)'
      ],
      correct: 0,
      exp: 'Le PAT multiplexe de nombreuses connexions privées sur une seule adresse IP publique en modifiant dynamiquement le port source de chaque session.'
    },
    {
      stem: 'Dans quel scénario met-on en œuvre une règle de Destination NAT (DNAT / Port Forwarding) ?',
      opts: [
        'Pour rediriger une requête arrivant sur l’adresse IP publique du pare-feu vers un serveur web ou applicatif interne en DMZ',
        'Pour permettre aux utilisateurs internes de consulter un site web public',
        'Pour chiffrer les disques durs des serveurs de bases de données',
        'Pour attribuer automatiquement une adresse IP par DHCP'
      ],
      correct: 0,
      exp: 'Le DNAT modifie l’adresse IP destination publique du paquet pour l’acheminer vers l’IP privée du serveur interne hébergeant le service.'
    },
    {
      stem: 'Si une règle R1 PERMIT ANY -> 10.0.0.1:80 précède une règle R2 PERMIT 192.168.1.10 -> 10.0.0.1:80, comment qualifie-t-on la règle R2 ?',
      opts: [
        'Redondante (Redundant)',
        'Masquée (Shadowed)',
        'Invalide (Invalid Syntax)',
        'Prioritaire'
      ],
      correct: 0,
      exp: 'R1 autorisant déjà tout le monde vers ce service, R2 produit exactement le même effet pour un sous-ensemble : elle est redondante et inutile.'
    },
    {
      stem: 'Quelle adresse IP est modifiée dans l’en-tête du paquet lors de l’application d’une translation SNAT sur le trafic sortant ?',
      opts: [
        'L’adresse IP source (remplacée par l’IP publique du pare-feu)',
        'L’adresse IP destination (remplacée par 127.0.0.1)',
        'L’adresse MAC du commutateur de distribution',
        'Le numéro de réseau de diffusion (Broadcast)'
      ],
      correct: 0,
      exp: 'Le SNAT réécrit l’adresse IP source du paquet avant de l’émettre sur l’interface publique.'
    },
    {
      stem: 'Pourquoi est-il crucial de journaliser les paquets rejetés par la règle finale Default DROP ?',
      opts: [
        'Pour détecter les balayages de ports, cartographies réseau et tentatives d’intrusion hostiles',
        'Pour accélérer le débit de bande passante sur la fibre optique',
        'Pour libérer de l’espace sur les disques durs des serveurs applicatifs',
        'Pour permettre aux pirates de vérifier que leurs sondes ont bien été reçues'
      ],
      correct: 0,
      exp: 'Journaliser les rejets de la règle Default DROP permet aux analystes SOC et au SIEM de détecter les activités malveillantes et les scans de reconnaissance.'
    }
  ],
  flashcards: [
    {
      q: 'Comment s’évaluent les règles dans une ACL pare-feu ?',
      a: 'Séquentiellement de haut en bas selon la règle First-Match-Wins : la première règle correspondante s’applique et stoppe l’évaluation.'
    },
    {
      q: 'Qu’est-ce que le Rule Shadowing ?',
      a: 'Une anomalie où une règle antérieure plus large empêche l’exécution d’une règle postérieure ayant une action opposée.'
    },
    {
      q: 'Quelle est la différence entre SNAT et DNAT ?',
      a: 'Le SNAT réécrit l’IP source (trafic sortant), le DNAT réécrit l’IP et le port destination (trafic entrant / publication de service).'
    },
    {
      q: 'Comment le PAT gère-t-il plusieurs connexions internes sur une même IP publique ?',
      a: 'En allouant un port source TCP/UDP unique à chaque session dans sa table de translation d’état.'
    },
    {
      q: 'Pourquoi une règle redondante pose-t-elle problème ?',
      a: 'Elle alourdit inutilement la configuration, ralentit l’évaluation des paquets et complique la maintenance humaine.'
    },
    {
      q: 'Pourquoi place-t-on le spécifique avant le général dans une ACL ?',
      a: 'Pour que les exceptions précises soient évaluées et autorisées avant que la politique générale de blocage ne s’applique.'
    }
  ],
  mastery: [
    { cls: 'low', text: 'Niveau initial : vous écrivez des règles dans le désordre ou ignorez le risque de masquage de règle (Rule Shadowing).' },
    { cls: 'medium', text: 'Niveau opérationnel : vous structurez des ACLs en First-Match-Wins du spécifique vers le général et configurez SNAT/DNAT sans faille.' },
    { cls: 'high', text: 'Maîtrise B3 : vous auditez automatiquement des milliers de règles avec détection algorithmique des redondances et optimisez les tables PAT à haute échelle.' }
  ]
};
