/**
 * Module 5 — Haute Disponibilité, Clustering & Mobilité (HA, DRS & vMotion)
 * Cours « Virtualisation Avancée B3 »
 */
'use strict';

module.exports = {
  n: 5,
  title: 'Haute Disponibilité, Clustering & Mobilité (HA, DRS & vMotion)',
  short: 'Clustering HA, DRS & vMotion',
  toc: 'Architecture vSphere HA (agents FDM, élection maître/esclave, heartbeats réseau & datastore, contrôle d\'admission), équilibrage dynamique vSphere DRS (métriques de charge, seuils 1-5, règles d\'affinité et anti-affinité), mobilité à chaud vMotion (pré-copie, dirty rate, convergence, bascule sub-seconde) et Storage vMotion.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'Vous êtes l\'architecte système en charge de concevoir un cluster Datacenter critique à tolérance de panne pour les services financiers d\'une banque en ligne. ' +
    'Vous devez déployer et configurer vSphere HA pour assurer le redémarrage automatique immédiat des machines virtuelles en cas de sinistre matériel sur un serveur hôte, ' +
    'dimensionner le contrôle d\'admission pour garantir la réserve de calcul nécessaire, ' +
    'mettre en place l\'équilibrage automatisé vSphere DRS avec règles d\'anti-affinité pour séparer les contrôleurs de domaine et les nœuds de cluster SQL, ' +
    'et modéliser les opérations de migration à chaud vMotion pour réaliser la maintenance des hyperviseurs sans aucune seconde d\'interruption de service.',

  objectives: [
    'Comprendre l\'architecture interne de vSphere HA : élection FDM (Master/Slave), surveillance par double heartbeat (réseau & datastore) et détection de pannes d\'hôte vs isolement.',
    'Configurer et dimensionner le contrôle d\'admission vSphere HA (Admission Control) pour réserver la capacité de failover sans gaspiller de ressources.',
    'Modéliser l\'ordonnancement automatisé vSphere DRS, ajuster les seuils de migration (1 à 5) et créer des règles d\'affinité et d\'anti-affinité strictes (VM-VM et VM-Hôte).',
    'Maîtriser les étapes de la migration à chaud vMotion (phases de pré-copie, Dirty Rate, convergence et bascule sub-seconde) et du Storage vMotion.'
  ],

  sections: [
    {
      title: 'Haute Disponibilité vSphere HA : Agents FDM, Élection & Double Heartbeat',
      html: [
        '<p><strong>vSphere HA (High Availability)</strong> protège les applications contre les pannes matérielles en redémarrant automatiquement les machines virtuelles affectées sur les autres serveurs hôtes sains du cluster, sans intervention humaine :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Architecture FDM (Fault Domain Manager)</h4>',
        '    <ul>',
        '      <li><strong>Agent autonome :</strong> Chaque hôte exécute l\'agent FDM. Une fois configuré, HA fonctionne même si vCenter Server devient indisponible.</li>',
        '      <li><strong>Élection du Maître (Master) :</strong> L\'hôte ayant accès au plus grand nombre de datastores partagés est élu maître (départage par UUID le plus élevé). Tous les autres hôtes deviennent des Esclaves (Slaves).</li>',
        '      <li><strong>Rôle du Maître :</strong> Surveille l\'état de santé de tous les esclaves, maintient l\'état des VM et ordonne les redémarrages en cas de sinistre.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Double Canal de Surveillance (Heartbeat)</h4>',
        '    <ul>',
        '      <li><strong>Heartbeat Réseau :</strong> Échanges périodiques de paquets UDP (port 8182) sur le réseau de management entre le maître et les esclaves.</li>',
        '      <li><strong>Heartbeat Datastore :</strong> Fichiers de verrouillage temporaires (<code>.vSphere-HA</code>) créés sur au moins 2 datastores partagés.</li>',
        '      <li><strong>Distinction Panne vs Isolement :</strong> Si le réseau est coupé mais que le heartbeat datastore est actif, l\'hôte est déclaré <em>Isolé (Isolated)</em> ; s\'il ne répond sur aucun canal, il est déclaré <em>En Panne (Failed)</em>.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Contrôle d\'Admission HA & Politiques de Basculement (Failover Capacity)',
      html: [
        '<p>Le <strong>Contrôle d\'Admission (Admission Control)</strong> garantit qu\'une réserve suffisante de ressources CPU et mémoire reste toujours disponible sur le cluster pour accueillir les machines virtuelles sinistrées :</p>',
        '<table class="table">',
        '  <thead><tr><th>Politique de Contrôle d\'Admission</th><th>Mécanisme de Calcul</th><th>Avantages &amp; Limites Opérationnelles</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Pourcentage de Ressources Réservées</strong></td><td>L\'administrateur définit un pourcentage fixe (ex: 25% pour tolérer la perte de 1 hôte dans un cluster de 4 serveurs).</td><td><strong>Recommandé :</strong> Très flexible, s\'adapte aux clusters ayant des VM de tailles hétérogènes sans gaspillage.</td></tr>',
        '    <tr><td><strong>Hôtes de Secours Dédiés (Dedicated Failover Hosts)</strong></td><td>Un ou plusieurs serveurs ESXi sont réservés exclusivement au secours et n\'exécutent aucune VM en temps normal.</td><td>Garantie absolue de ressources, mais immobilise du matériel coûteux qui reste inactif en production.</td></tr>',
        '    <tr><td><strong>Politique de Slot (Slot Policy)</strong></td><td>Définit un "slot" basé sur la plus grande réservation CPU et mémoire de toutes les VM du cluster.</td><td>Historique et rigide : une seule VM surdimensionnée fait exploser la taille du slot et sous-utilise le cluster.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Équilibrage Dynamique vSphere DRS & Règles d\'Affinité / Anti-Affinité',
      html: [
        '<p><strong>vSphere DRS (Distributed Resource Scheduler)</strong> agrège la puissance de calcul d\'un cluster pour équilibrer dynamiquement la charge CPU et RAM en migrant automatiquement les VM via vMotion :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Seuils de Migration &amp; Métriques DRS</h4>',
        '    <ul>',
        '      <li>DRS calcule toutes les 5 minutes l\'écart-type de charge du cluster.</li>',
        '      <li><strong>Niveau 1 (Conservateur) :</strong> N\'applique que les migrations indispensables pour respecter les règles d\'affinité ou évacuer un hôte en maintenance.</li>',
        '      <li><strong>Niveau 3 (Équilibré par défaut) :</strong> Recommande ou applique les migrations offrant une amélioration notable de performance.</li>',
        '      <li><strong>Niveau 5 (Agressif) :</strong> Migre les VM dès qu\'un léger déséquilibre est détecté entre deux hôtes.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Règles d\'Affinité &amp; d\'Anti-Affinité</h4>',
        '    <ul>',
        '      <li><strong>Anti-Affinité VM-VM :</strong> Interdit formellement de placer deux VM sur le même hôte physique (ex: 2 contrôleurs AD, 2 nœuds d\'un cluster SQL AlwaysOn). Indispensable pour la résilience.</li>',
        '      <li><strong>Affinité VM-VM :</strong> Impose à deux VM hautement interconnectées (ex: serveur web et serveur d\'application) de rester sur le même hôte pour profiter de la commutation mémoire ultra-rapide.</li>',
        '      <li><strong>Règles VM-Hôte :</strong> Lie un groupe de VM à un groupe d\'hôtes pour des raisons de conformité de licences logicielles (Oracle, Microsoft per-core).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Mobilité à Chaud vMotion : Algorithme de Pré-Copie & Convergence',
      html: [
        '<p>La technologie <strong>vSphere vMotion</strong> transfère une machine virtuelle en cours de fonctionnement d\'un serveur ESXi source vers un serveur ESXi cible sans coupure de service pour les utilisateurs :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Phases de l\'Algorithme vMotion</h4>',
        '    <ol>',
        '      <li><strong>Initialisation :</strong> Création d\'une VM squelette sur l\'hôte cible et réservation des ressources.</li>',
        '      <li><strong>Pré-copie itérative (Pre-Copy) :</strong> Copie initiale de l\'intégralité des pages de mémoire vive sur le réseau vMotion. Durant ce transfert, les pages modifiées par la VM sont tracées par un filtre mémoire (<em>Dirty Pages</em>).</li>',
        '      <li><strong>Passes successives :</strong> L\'hyperviseur ne renvoie que les pages modifiées lors de la passe précédente.</li>',
        '      <li><strong>Bascule sub-seconde (Switchover) :</strong> Dès que le volume restant peut être envoyé en moins d\'une seconde, la VM source est brièvement suspendue (&lt; 0.5s), l\'état des registres CPU est transféré, et la VM cible reprend l\'exécution.</li>',
        '      <li><strong>Annonce RARP :</strong> L\'hôte cible émet une trame RARP pour mettre à jour les tables CAM des commutateurs physiques.</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Équation de Convergence &amp; SDPS</h4>',
        '    <p>Pour que la migration converge, le débit réseau effectif doit être strictement supérieur au rythme d\'écriture mémoire de la VM (Dirty Rate) :</p>',
        '    <pre><code>Dirty_Rate_Mo_s &lt; Debit_Reseau_Mo_s</code></pre>',
        '    <p>Si la VM modifie sa mémoire plus vite que le réseau ne peut la transmettre, vSphere active le mécanisme <strong>SDPS (Stun During Page Send)</strong> : le VMkernel ralentit temporairement les cycles d\'horloge de la VM pour brider son écriture et forcer la convergence.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie d\'Ingénierie : Déploiement d\'un Cluster HA/DRS Résilient',
  method: [
    'Activer vSphere HA sur le cluster et vérifier que chaque hôte dispose de connexions redondantes au réseau de management et à au moins deux datastores de heartbeat.',
    'Configurer le contrôle d\'admission en définissant une réserve de ressources en pourcentage calquée sur la formule 100% / N_hôtes (ex: 25% pour 4 hôtes).',
    'Activer vSphere DRS en mode Fully Automated (Niveau 3) et créer les règles d\'anti-affinité indispensables pour séparer les serveurs redondants critiques.',
    'Valider les performances du réseau vMotion (interfaces 10 Gbps dédiées) et tester la migration à chaud sans perte de ping (ICMP &le; 1 paquet perdu).'
  ],

  summary: [
    'vSphere HA redémarre automatiquement les VM sinistrées grâce aux agents FDM autonomes et à la détection par double heartbeat réseau/datastore.',
    'Le contrôle d\'admission garantit qu\'une réserve de ressources suffisante reste toujours disponible pour absorber la défaillance d\'un ou plusieurs serveurs.',
    'vSphere DRS optimise dynamiquement l\'allocation CPU/RAM et applique des règles d\'anti-affinité pour éviter qu\'un crash unique ne détruise deux serveurs redondants.',
    'vMotion transfère la mémoire vive à chaud par un processus itératif de pré-copie avant d\'effectuer une bascule imperceptible en moins d\'une demi-seconde.',
    'Le mécanisme SDPS garantit la convergence finale de vMotion sur les machines virtuelles très actives en bridant temporairement le Dirty Rate.'
  ],

  checklist: [
    'Chaque hôte ESXi du cluster dispose-t-il d\'accès redondants à au moins deux datastores partagés pour le heartbeat HA ?',
    'Le contrôle d\'admission HA est-il configuré pour empêcher le démarrage de VM non garanties en cas de sinistre ?',
    'Des règles d\'anti-affinité VM-VM séparent-elles systématiquement les binômes de serveurs critiques (AD, SQL, Web) ?',
    'Le réseau VMkernel vMotion dispose-t-il d\'une bande passante minimale de 10 Gbps pour garantir des durées de transfert réduites ?',
    'Une passerelle d\'isolement valide (Isolation Address) est-elle configurée pour permettre aux hôtes de diagnostiquer un isolement réseau ?'
  ],

  notions: [
    { term: 'vSphere HA', def: 'Mécanisme de haute disponibilité redémarrant automatiquement les machines virtuelles sinistrées sur les hôtes survivants du cluster.' },
    { term: 'FDM (Fault Domain Manager)', def: 'Agent logiciel autonome de vSphere HA s\'exécutant sur chaque hyperviseur pour surveiller la santé des nœuds du cluster.' },
    { term: 'Heartbeat Datastore', def: 'Canal de secours de vSphere HA utilisant des fichiers sur stockage partagé pour distinguer une panne d\'hôte d\'un isolement réseau.' },
    { term: 'Admission Control', def: 'Politique de réservation de capacité CPU et mémoire garantissant que le cluster peut honorer les redémarrages en cas de sinistre.' },
    { term: 'vSphere DRS', def: 'Ordonnanceur distribué équilibrant la charge CPU et mémoire du cluster en migrant les VM via vMotion.' },
    { term: 'Règle d\'anti-affinité', def: 'Contrainte logique vSphere interdisant formellement le placement de deux machines virtuelles désignées sur le même serveur physique.' },
    { term: 'vMotion', def: 'Technologie de migration à chaud transférant l\'état d\'exécution et la mémoire vive d\'une VM sans rupture de service.' },
    { term: 'Dirty Rate', def: 'Rythme en Mo/s auquel le système d\'exploitation d\'une VM modifie ses pages de mémoire vive pendant une migration vMotion.' }
  ],

  pitfalls: [
    {
      mistake: 'Désactiver le contrôle d\'admission vSphere HA pour forcer le démarrage de VM supplémentaires.',
      why: 'Le cluster est en surcapacité : si un serveur physique tombe en panne, il n\'y a plus de ressources pour redémarrer les VM sinistrées, qui restent éteintes.',
      fix: 'Toujours laisser le contrôle d\'admission actif et ajouter un nœud ESXi physique supplémentaire si le cluster manque de capacité.'
    },
    {
      mistake: 'Ne pas configurer de règles d\'anti-affinité sur deux contrôleurs de domaine Active Directory.',
      why: 'DRS peut placer les deux contrôleurs sur le même hôte ESXi physique ; si cet hôte crashe, l\'ensemble de l\'authentification de l\'entreprise est coupée.',
      fix: 'Créer systématiquement une règle Anti-Affinity VM-VM pour tous les services déployés en haute disponibilité applicative.'
    },
    {
      mistake: 'Faire passer le trafic vMotion sur une carte réseau 1 Gbps partagée pour une VM dotée de 128 Go de RAM.',
      why: 'La bande passante 1 Gbps est insuffisante pour dépasser le Dirty Rate d\'une grosse base de données, provoquant des échecs de convergence vMotion ou des blocages prolongés.',
      fix: 'Dédier des interfaces réseau 10 Gbps ou 25 Gbps au réseau VMkernel vMotion.'
    },
    {
      mistake: 'Oublier de configurer au moins deux datastores pour le Heartbeat Datastore de vSphere HA.',
      why: 'vSphere émettra une alarme permanente et ne pourra pas différencier avec certitude un crash matériel complet d\'une simple coupure du réseau de management.',
      fix: 'Sélectionner explicitement deux datastores partagés distincts pour la surveillance par heartbeat datastore.'
    }
  ],

  questions: [
    {
      q: 'Comment l\'agent vSphere HA (FDM) fait-il la différence entre un hôte physique en panne totale et un hôte simplement isolé du réseau ?',
      opts: [
        'En consultant les fichiers de heartbeat sur les datastores partagés en complément du heartbeat réseau.',
        'En envoyant un SMS automatique à l\'administrateur du centre de données.',
        'En mesurant la consommation électrique de l\'onduleur de la salle serveurs.',
        'En redémarrant immédiatement l\'appliance vCenter Server sur le cloud.'
      ],
      correct: 0,
      exp: 'Si le heartbeat réseau est interrompu mais que l\'hôte continue d\'écrire son heartbeat sur les datastores partagés, l\'hôte est déclaré Isolé (Isolated). S\'il ne répond sur aucun canal, il est déclaré En Panne (Failed).'
    },
    {
      q: 'Que fait vSphere HA lorsqu\'un serveur physique subit une panne matérielle brutale (carte mère ou alimentation grillée) ?',
      opts: [
        'Il redémarre les machines virtuelles qui tournaient sur cet hôte sur les autres serveurs sains du cluster.',
        'Il synchronise les registres CPU en temps réel sans que la VM ne redémarre.',
        'Il convertit automatiquement les disques des machines virtuelles au format Thin.',
        'Il supprime l\'ensemble des fichiers .vmx du datastore par mesure de sécurité.'
      ],
      correct: 0,
      exp: 'vSphere HA protège contre les pannes par redémarrage (Restart) : les VM qui étaient sur l\'hôte en panne sont relancées sur les serveurs ESXi survivants selon leur ordre de priorité de redémarrage.'
    },
    {
      q: 'Quelle est la méthode recommandée pour configurer le Contrôle d\'Admission vSphere HA sur un cluster hétérogène moderne ?',
      opts: [
        'Définir un pourcentage fixe de capacité CPU et mémoire réservée (Cluster resource percentage).',
        'Imposer une taille de slot fixe de 4 Go de RAM et 1 GHz de CPU.',
        'Laisser le cluster sans aucune règle de contrôle d\'admission.',
        'Arrêter la moitié des VM chaque soir pour libérer de la mémoire.'
      ],
      correct: 0,
      exp: 'La politique par pourcentage de ressources réservées calcule dynamiquement la capacité de secours requise sans souffrir des rigidités de la politique de slot en présence de VM aux tailles disparates.'
    },
    {
      q: 'Pourquoi configure-t-on une règle d\'anti-affinité VM-VM dans vSphere DRS ?',
      opts: [
        'Pour forcer deux VM redondantes (ex: 2 contrôleurs AD ou 2 serveurs web) à s\'exécuter sur des hôtes physiques différents.',
        'Pour empêcher une machine virtuelle d\'accéder à Internet en dehors des heures de bureau.',
        'Pour fusionner la mémoire vive de deux VM distinctes dans un seul fichier .vswp.',
        'Pour désactiver la carte réseau virtuelle en cas de détection d\'un virus.'
      ],
      correct: 0,
      exp: 'Une règle d\'anti-affinité VM-VM garantit que deux machines virtuelles assurant le même rôle applicatif ne résident jamais sur le même serveur physique, éliminant tout point de défaillance unique (SPOF).'
    },
    {
      q: 'Quelle condition mathématique est indispensable pour qu\'une migration à chaud vMotion puisse converger sans blocage ?',
      opts: [
        'Le débit réseau effectif vMotion doit être supérieur au rythme de modification mémoire (Dirty Rate) de la VM.',
        'La taille de la RAM de la VM doit être strictement inférieure à 4 Go.',
        'Le datastore doit obligatoirement être formaté en système de fichiers FAT32.',
        'L\'hôte source et l\'hôte cible doivent posséder le même numéro de série constructeur.'
      ],
      correct: 0,
      exp: 'Si le système invité écrit dans sa mémoire (Dirty Rate) plus rapidement que le réseau ne peut transmettre les blocs modifiés, le volume restant à copier ne diminue jamais et la migration ne peut pas converger.'
    },
    {
      q: 'Que fait le mécanisme SDPS (Stun During Page Send) lors d\'une migration vMotion difficile ?',
      opts: [
        'Il ralentit temporairement les cycles d\'exécution de la VM pour réduire son rythme d\'écriture et forcer la convergence.',
        'Il éteint brusquement la machine virtuelle sans sauvegarder les données.',
        'Il bascule la liaison réseau en Wi-Fi pour contourner le commutateur physique.',
        'Il duplique le fichier .vmx sur l\'ensemble des datastores du datacenter.'
      ],
      correct: 0,
      exp: 'SDPS injecte de micro-ralentissements sur les processeurs de la machine virtuelle pour brider artificiellement son taux d\'écriture mémoire (Dirty Rate), permettant à la phase de pré-copie de terminer le transfert.'
    },
    {
      q: 'Quelle opération réseau termine la bascule finale d\'une migration vMotion sur le nouvel hôte physique ?',
      opts: [
        'L\'émission d\'une trame RARP pour rafraîchir immédiatement les tables CAM des commutateurs physiques.',
        'La réinitialisation complète de toutes les cartes réseaux de l\'entreprise.',
        'La modification manuelle des entrées DNS sur le serveur Active Directory.',
        'L\'envoi d\'un email de confirmation au compte administrateur vCenter.'
      ],
      correct: 0,
      exp: 'Dès que la VM reprend son exécution sur l\'hôte cible, celui-ci émet une trame RARP (Reverse ARP) annonçant la nouvelle localisation du port réseau virtuel pour rediriger instantanément le trafic vers le bon port physique.'
    },
    {
      q: 'Quelle est la différence fondamentale entre vMotion et Storage vMotion ?',
      opts: [
        'vMotion migre l\'état CPU et la mémoire vive entre hôtes ; Storage vMotion migre les fichiers de disques virtuels VMDK entre datastores.',
        'vMotion nécessite d\'éteindre la VM, alors que Storage vMotion fonctionne à chaud.',
        'vMotion ne fonctionne qu\'avec Linux, tandis que Storage vMotion ne fonctionne qu\'avec Windows.',
        'Storage vMotion exige de remplacer physiquement les disques durs dans la baie.'
      ],
      correct: 0,
      exp: 'vMotion déplace le traitement (calcul CPU et mémoire vive) entre serveurs physiques sans toucher aux disques partagés, tandis que Storage vMotion déplace les fichiers disques VMDK d\'un datastore à un autre sans couper la VM.'
    }
  ],

  flashcards: [
    {
      q: 'Quel est l\'objectif principal de vSphere HA ?',
      a: 'Redémarrer automatiquement les machines virtuelles sinistrées sur les hôtes survivants en cas de panne physique d\'un serveur.'
    },
    {
      q: 'Comment vSphere HA distingue-t-il une panne d\'hôte d\'un isolement réseau ?',
      a: 'Grâce au double contrôle combinant le heartbeat réseau (UDP 8182) et le heartbeat datastore (fichiers sur stockage partagé).'
    },
    {
      q: 'À quoi sert le contrôle d\'admission vSphere HA ?',
      a: 'À garantir qu\'une réserve suffisante de CPU et de RAM reste disponible sur le cluster pour accueillir les VM en cas de sinistre.'
    },
    {
      q: 'Pourquoi utilise-t-on des règles d\'anti-affinité DRS ?',
      a: 'Pour séparer physiquement deux VM redondantes sur des hôtes distincts et éliminer tout point unique de défaillance matérielle.'
    },
    {
      q: 'Comment s\'assure-t-on de la convergence d\'une migration vMotion ?',
      a: 'En garantissant un débit réseau dédié supérieur au rythme de modification des pages mémoire (Dirty Rate) de la VM.'
    },
    {
      q: 'Quelle trame réseau est émise à la fin d\'un vMotion pour rediriger les paquets ?',
      a: 'Une trame RARP (Reverse Address Resolution Protocol) qui met à jour les tables CAM des commutateurs physiques.'
    }
  ],

  mastery: [
    'Déployer et dépanner un cluster vSphere HA avec validation des agents FDM et des doubles heartbeats.',
    'Calculer et dimensionner la politique de contrôle d\'admission HA en pourcentage de ressources réservées.',
    'Configurer l\'ordonnancement dynamique vSphere DRS et poser des règles strictes d\'anti-affinité VM-VM.',
    'Estimer la durée et le volume de transfert d\'une migration vMotion en fonction du Dirty Rate et du débit réseau.',
    'Exécuter des opérations de Storage vMotion pour rééquilibrer les datastores et réaliser des maintenances sans interruption.'
  ]
};
