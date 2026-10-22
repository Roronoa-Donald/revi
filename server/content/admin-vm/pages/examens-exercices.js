/**
 * Pages « examens blancs » et « exercices & projet » du cours « Admin VM » B2.
 */
'use strict';

const { ic, crumb, box, qcm, bands } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1 — virtualisation et architecture',
      intro: 'Sujet type examen — types de virtualisation, hyperviseurs, prérequis, plans.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Hyperviseurs',
          text: 'Distinguez un hyperviseur de type 1 et de type 2. Donnez un exemple de chacun et un contexte d’usage.',
          sol: '<strong>Type 1 (bare-metal)</strong> : s’installe directement sur le matériel, pour la ' +
            'production — ESXi, Proxmox VE.<br><strong>Type 2 (hébergé)</strong> : s’installe sur un OS ' +
            'existant, pour les tests et la formation — VirtualBox, VMware Workstation.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Architecture',
          text: 'Un hyperviseur réunit deux plans. Lesquels, et à quoi sert chacun ?',
          sol: '<strong>Plan de données</strong> : exécution des VM et entrées/sorties. ' +
            '<strong>Plan de gestion</strong> : interface, API, rôles et audit.<br>Les confondre expose ' +
            'toute la plateforme.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Prérequis',
          text: 'Pourquoi la RAM est-elle plus critique que la CPU dans une plateforme virtualisée ?',
          sol: 'Le CPU se partage dans le temps (vCPU), tandis que la <strong>RAM est non ' +
            'élastique</strong> : chaque VM en consomme une part fixe. C’est donc la RAM qui limite le ' +
            'nombre de VM hébergeables.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Types',
          text: 'Citez les quatre grands types de virtualisation et un exemple pour chacun.',
          sol: '<strong>Serveur</strong> (Proxmox/ESXi), <strong>poste/VDI</strong> (VMware Horizon), ' +
            '<strong>stockage</strong> (NAS/SAN, Ceph), <strong>réseau</strong> (VLAN, pfSense).'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — stockage, réseau et clusters',
      intro: 'Sujet orienté stockage, segmentation réseau et haute disponibilité.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Stockage',
          text: 'Expliquez LVM en trois notions et l’intérêt d’un volume logique.',
          sol: '<strong>PV</strong> (disque physique), <strong>VG</strong> (pool regroupant les PV), ' +
            '<strong>LV</strong> (volume logique).<br>Le LV devient le disque d’une VM et peut être ' +
            'agrandi sans réinstaller.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Sauvegarde',
          text: 'Quelle différence entre un snapshot et une sauvegarde ? Pourquoi un snapshot ne suffit-il pas ?',
          sol: 'Le <strong>snapshot</strong> est local et rapide : il permet un retour en arrière ' +
            'immédiat.<br>La <strong>sauvegarde</strong> est une copie externe durable.<br>Le snapshot ' +
            'repose sur le même stockage : s’il disparaît, la VM aussi. Règle : 3 copies, 2 supports, ' +
            '1 hors site.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Réseau',
          text: 'Une agence héberge un site web et un ERP interne. Proposez une segmentation et une règle de pare-feu.',
          sol: 'Web en <strong>DMZ</strong> (VLAN 30), ERP en <strong>LAN</strong> (VLAN 20), ' +
            'utilisateurs en VLAN 10.<br>Pare-feu : LAN et DMZ uniquement sur le port 443. La base de ' +
            'données reste dans le LAN.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Cluster',
          text: 'À quoi servent le quorum et le fencing dans un cluster ?',
          sol: 'Le <strong>quorum</strong> garantit la prise de décision (majorité des nœuds) ; le ' +
            '<strong>fencing</strong> isole un nœud instable pour éviter le « split brain ». Ensemble, ' +
            'ils rendent le failover fiable.'
        }
      ]
    }
  ];

  const itemHtml = (item) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="item__num">' + item.num + '</span><span class="badge">' + item.badge + '</span></div>',
    '    <p>' + item.text + '</p>',
    '    <details><summary>Corrigé</summary><div class="sol">' + item.sol + '</div></details>',
    '  </div>'
  ].join('\n');

  const mastery = [
    { stem: 'Type 1 : contexte ?', opts: ['Production', 'Tests', 'Formation'], correct: 0, exp: 'Le bare-metal vise la production.' },
    { stem: 'Ressource non élastique ?', opts: ['La RAM', 'Le vCPU', 'Le réseau'], correct: 0, exp: 'La RAM limite le nombre de VM.' },
    { stem: 'Plan qui exécute les VM ?', opts: ['Plan de données', 'Plan de gestion', 'Le firmware'], correct: 0, exp: 'Le plan de données traite l’exécution.' },
    { stem: 'LVM : un LV sert à…', opts: ['Devenir le disque d’une VM', 'Router', 'Segmenter'], correct: 0, exp: 'Le volume logique est utilisé par la VM.' },
    { stem: 'Que fait un bridge ?', opts: ['Commuter le trafic', 'Filtrer', 'Chiffrer'], correct: 0, exp: 'C’est un switch virtuel.' },
    { stem: 'VLAN de la DMZ ?', opts: ['30', '10', '20'], correct: 0, exp: 'DMZ = VLAN 30.' },
    { stem: 'Que fait le fencing ?', opts: ['Isole un nœud instable', 'Sauvegarde', 'Migre'], correct: 0, exp: 'Il évite le split brain.' },
    { stem: 'Que garantit une réservation ?', opts: ['Un minimum de ressource', 'Un plafond', 'Une priorité'], correct: 0, exp: 'Elle réserve une part garantie.' },
    { stem: 'Règle d’or de sauvegarde ?', opts: ['3-2-1', '1-1-1', '5-5-5'], correct: 0, exp: '3 copies, 2 supports, 1 hors site.' },
    { stem: 'De quoi dépend la migration ?', opts: ['Stockage, réseau et charge', 'La couleur de l’interface', 'Le clavier'], correct: 0, exp: 'Ces trois facteurs conditionnent la migration.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l’esprit de l’examen (durée 2 h, /20). ' +
    'Réalisez-les <strong>sans regarder</strong> les corrigés, puis corrigez-vous sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen — 2 h</div>',
      '    <p>Lancez le chrono quand vous commencez un sujet. Ne consultez le corrigé qu’à la fin. ' +
      '<strong>Réservez 15 min de relecture</strong> : types d’hyperviseur, plans, LVM, VLAN/DMZ, ' +
      'cluster.</p>',
      '    <p><button class="btn btn--primary" data-start>' + ic('play') + ' Démarrer le chrono</button>',
      '       <span data-clock style="font-weight:800;font-size:1.1rem;margin-left:12px">120:00</span></p>',
      '  </div>'
    ].join('\n'),
    sujets.map(sujet => '  <h2>' + sujet.title + '</h2>\n\n  <p class="lead">' + sujet.intro + '</p>\n\n' +
      sujet.items.map(itemHtml).join('\n\n')).join('\n\n'),
    '  <h2>QCM final — toutes notions</h2>',
    '  ' + qcm(mastery, { mastery: true }),
    box('method', 'Barème de maîtrise', 'compass', '    ' + bands([
      { cls: 'low', text: '&lt; 50 % — reprends les chapitres concernés avant un nouveau sujet.' },
      { cls: 'mid', text: '50–69 % — refais les exercices des chapitres faibles.' },
      { cls: 'good', text: '70–94 % — bon niveau, cible stockage, réseau et clusters.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’examen.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits dans l’esprit du cours Admin VM. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours Admin VM B2 : virtualisation, architecture, stockage, ' +
        'réseau et clusters, avec corrigés détaillés.',
      active: 'examen',
      body
    }
  };
}

/* ======================== Exercices & projet ======================== */

function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\n'),
    '    </ol>',
    '    <details><summary>Corrections</summary><div class="sol"><pre><code>' + solutions + '</code></pre></div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; projet intégrateur</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un projet final qui ' +
    'assemble un plan de dimensionnement d’une plateforme. Les scripts sont en PowerShell.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Totaliser le nombre de VM hébergées par plusieurs serveurs.',
      'Classer un hyperviseur (type 1 / type 2).',
      'Vérifier un prérequis (extensions et RAM).',
      'Calculer le nombre de VM tenables par la RAM.'
    ], [
      '$serveurs = [int][Console]::In.ReadLine()',
      '$parServeur = [int][Console]::In.ReadLine()',
      'Write-Output ("vms : " + ($serveurs * $parServeur))',
      '',
      '$type = [int][Console]::In.ReadLine()',
      'if ($type -eq 1) { Write-Output "production" } else { Write-Output "test" }',
      '',
      '$ext = [Console]::In.ReadLine()',
      '$ram = [int][Console]::In.ReadLine()',
      'if ($ext -eq "non") { Write-Output "impossible" } elseif ($ram -ge 8) { Write-Output "possible" } else { Write-Output "ram insuffisante" }',
      '',
      '$ramHote = [int][Console]::In.ReadLine()',
      '$ramVm = [int][Console]::In.ReadLine()',
      'Write-Output ("vms possibles : " + [int]([math]::Floor($ramHote / $ramVm)))'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Détecter une surallocation de vCPU.',
      'Calculer l’espace libre d’un volume et alerter sous 10 Go.',
      'Associer un VLAN à sa zone.',
      'Vérifier le quorum d’un cluster.'
    ], [
      '$vcpu = [int][Console]::In.ReadLine()',
      '$coeurs = [int][Console]::In.ReadLine()',
      'if ($vcpu -gt $coeurs) { Write-Output "surallocation : oui" } else { Write-Output "surallocation : non" }',
      '',
      '$capacite = [int][Console]::In.ReadLine()',
      '$utilise = [int][Console]::In.ReadLine()',
      '$libre = $capacite - $utilise',
      'Write-Output ("libre : " + $libre + " Go")',
      'if ($libre -lt 10) { Write-Output "alerte : espace faible" }',
      '',
      '$vlan = [int][Console]::In.ReadLine()',
      'switch ($vlan) { 10 { Write-Output "utilisateurs" } 20 { Write-Output "serveurs" } 30 { Write-Output "DMZ" } }',
      '',
      '$total = [int][Console]::In.ReadLine()',
      '$enLigne = [int][Console]::In.ReadLine()',
      'if ($enLigne * 2 -gt $total) { Write-Output "quorum : atteint" } else { Write-Output "quorum : perdu" }'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Appliquer la règle de flux LAN et DMZ (port 443).',
      'Calculer le gain d’un dédoublonnage.',
      'Associer un composant de la pile KVM à son rôle.',
      'Déterminer la rétention d’une fréquence GFS.'
    ], [
      '$source = [Console]::In.ReadLine()',
      '$destination = [Console]::In.ReadLine()',
      '$port = [int][Console]::In.ReadLine()',
      '$meme = ($source -eq $destination)',
      '$traversee = (($source -eq "lan" -and $destination -eq "dmz") -or ($source -eq "dmz" -and $destination -eq "lan"))',
      'if ($meme -or ($traversee -and $port -eq 443)) { Write-Output "flux : autorise" } else { Write-Output "flux : filtre" }',
      '',
      '$brut = [int][Console]::In.ReadLine()',
      '$taux = [int][Console]::In.ReadLine()',
      'Write-Output ("apres dedup : " + [int]([math]::Floor($brut * (100 - $taux) / 100)) + " Go")',
      '',
      '$composant = [Console]::In.ReadLine()',
      'switch ($composant) { "noyau" { Write-Output "extensions CPU" } "qemu" { Write-Output "execution des VM" } "libvirt" { Write-Output "pilotage et API" } }',
      '',
      '$freq = [Console]::In.ReadLine()',
      'switch ($freq) { "quotidien" { Write-Output "7 jours" } "hebdo" { Write-Output "4 semaines" } "mensuel" { Write-Output "6 a 12 mois" } }'
    ].join('\n')),

    '  <h2>Projet intégrateur — « plan de dimensionnement »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>On te confie un script de dimensionnement. Le script lit la <strong>RAM de l’hôte</strong> ' +
      '(Go), la <strong>RAM réservée au système</strong> (Go), la <strong>RAM par VM</strong> (Go), puis ' +
      'le nombre total de <strong>vCPU</strong> alloués et le nombre de <strong>cœurs physiques</strong>. ' +
      'Il affiche la capacité de VM, détecte une surallocation de vCPU, et conclut : ' +
      '<code>plateforme : valide</code> si aucune surallocation, sinon ' +
      '<code>plateforme : a revoir</code>.</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> les cinq valeurs dans l’ordre indiqué.</li>',
      '      <li><strong>Calculer</strong> la capacité de VM (mémoire utile / RAM par VM).</li>',
      '      <li><strong>Détecter</strong> la surallocation (vCPU &gt; cœurs).</li>',
      '      <li><strong>Afficher</strong> <code>capacite : X</code> puis <code>surallocation : oui/non</code>.</li>',
      '      <li><strong>Conclure</strong> : <code>plateforme : valide</code> ou <code>plateforme : a revoir</code>.</li>',
      '      <li><strong>Gérer</strong> les cas limites (mémoire utile nulle).</li>',
      '    </ol>',
      '    <p>Contraintes : divisions entières avec <code>[math]::Floor</code>, comparaisons avec ' +
      '<code>-gt</code>.</p>'
    ].join('\n')),
    box('method', 'Grille d’auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture ordonnée des cinq valeurs <strong>20</strong>' },
        { cls: '', text: 'Capacité de VM correcte <strong>20</strong>' },
        { cls: '', text: 'Détection de la surallocation <strong>20</strong>' },
        { cls: '', text: 'Sortie au bon format <strong>20</strong>' },
        { cls: '', text: 'Lisibilité et cohérence <strong>20</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
    '$ramHote = [int][Console]::In.ReadLine()',
    '$ramSysteme = [int][Console]::In.ReadLine()',
    '$ramVm = [int][Console]::In.ReadLine()',
    '$vcpu = [int][Console]::In.ReadLine()',
    '$coeurs = [int][Console]::In.ReadLine()',
    '',
    '$utile = $ramHote - $ramSysteme',
    'if ($utile -lt 0) { $utile = 0 }',
    '$capacite = [int]([math]::Floor($utile / $ramVm))',
    'Write-Output ("capacite : " + $capacite)',
    '',
    'if ($vcpu -gt $coeurs) {',
    '    Write-Output "surallocation : oui"',
    '    Write-Output "plateforme : a revoir"',
    '} else {',
    '    Write-Output "surallocation : non"',
    '    Write-Output "plateforme : valide"',
    '}'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine lecture ordonnée, calcul de capacité, détection de surallocation et ' +
    'verdict — l’essentiel des chapitres 2 et 3 en un seul script.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du cours historique Admin VM. ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours Admin VM B2 : scripts ' +
        'gradués et plan de dimensionnement en PowerShell.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
