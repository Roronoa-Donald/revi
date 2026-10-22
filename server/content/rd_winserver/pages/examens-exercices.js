/**
 * Pages « examens blancs » et « exercices & projet » du cours « Windows Server » B2.
 */
'use strict';

const { ic, crumb, box, qcm, bands } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1 — sauvegarde et haute disponibilité',
      intro: 'Sujet type examen — types de sauvegarde, stratégie 3-2-1, PCA/PRA, redondance et SLA.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Sauvegarde',
          text: 'Une entreprise sauvegarde tout chaque soir. Quel type de sauvegarde utilise-t-elle, et quel est son principal inconvénient ?',
          sol: 'Une sauvegarde <strong>complète</strong>.<br>Inconvénient : elle est lente et consomme beaucoup ' +
            'd’espace, car elle recopie tout à chaque fois. En revanche la restauration est simple.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Stratégie',
          text: 'Expliquez la stratégie 3-2-1 et pourquoi la copie hors site est indispensable.',
          sol: '<strong>3</strong> copies des données, sur <strong>2</strong> supports différents, dont ' +
            '<strong>1</strong> hors site.<br>La copie hors site protège contre un sinistre local ' +
            '(incendie, inondation) qui détruirait les deux premières copies.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Disponibilité',
          text: 'Un service exige 99,99 % de disponibilité. Combien de minutes d’arrêt par an cela représente-t-il ?',
          sol: '0,01 % de 525 600 minutes ≈ <strong>52 min 34 s</strong>.<br>Il faut donc une redondance ' +
            'et un failover quasi instantanés.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Piliers',
          text: 'Citez les trois piliers de la haute disponibilité et le rôle de chacun.',
          sol: '<strong>Redondance</strong> (dupliquer les composants), <strong>failover</strong> ' +
            '(basculer automatiquement l’activité), <strong>supervision</strong> (détecter et ' +
            'déclencher la bascule).'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — clusters, maintenance et VM',
      intro: 'Sujet orienté clustering, maintenance préventive et administration de VM.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Clustering',
          text: 'Quelle différence entre un cluster active-passive et active-active ? Donnez un cas d’usage de chacun.',
          sol: '<strong>Active-passive</strong> : un nœud actif, les autres en veille — simple mais ' +
            'sous-utilisé (services financiers).<br><strong>Active-active</strong> : tous actifs, tâches ' +
            'partagées — performant mais synchronisation complexe (sites à fort trafic).'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Maintenance',
          text: 'Avant une mise à jour majeure d’un serveur, quelles trois précautions prenez-vous ?',
          sol: 'Tester sur un serveur de <strong>préproduction</strong>, prendre un <strong>snapshot</strong> ' +
            'de la VM, puis planifier l’opération <strong>après les heures de production</strong>.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Virtualisation',
          text: 'Une VM doit accéder à Internet sans être joignable depuis le réseau local. Quel mode réseau choisir et pourquoi ?',
          sol: 'Le mode <strong>NAT</strong>.<br>La VM sort via l’adresse de l’hôte (accès Internet) mais ' +
            'n’est pas exposée depuis le LAN.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — VM',
          text: 'Pourquoi ne faut-il pas conserver longtemps un snapshot en production ? Quelle alternative durable ?',
          sol: 'Un snapshot <strong>consomme de l’espace disque</strong> de plus en plus et ne protège pas ' +
            'd’une perte du stockage.<br>Il est <strong>temporaire</strong> : pour durer, on utilise une ' +
            'sauvegarde (par exemple Veeam).'
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
    { stem: 'Quelle sauvegarde copie tout ?', opts: ['Complète', 'Incrementielle', 'Differentielle'], correct: 0, exp: 'La complète recopie l’intégralité.' },
    { stem: 'Stratégie 3-2-1 ?', opts: ['3 copies, 2 supports, 1 hors site', '3 jours, 2 serveurs, 1 disque', '3 sauvegardes par jour'], correct: 0, exp: 'Trois copies, deux supports, une hors site.' },
    { stem: 'Un pilier de la HA ?', opts: ['Le failover', 'La compression', 'Le chiffrement'], correct: 0, exp: 'Redondance, failover et supervision.' },
    { stem: 'Que fait un load balancer ?', opts: ['Répartit les requêtes', 'Sauvegarde les VM', 'Migre à chaud'], correct: 0, exp: 'Il équilibre la charge entre serveurs.' },
    { stem: 'Cluster active-passive ?', opts: ['Un actif, les autres en veille', 'Tous actifs', 'Aucun actif'], correct: 0, exp: 'Le passif prend le relais en cas de panne.' },
    { stem: 'Quand intervient la maintenance corrective ?', opts: ['Après une panne', 'Avant toute panne', 'Jamais'], correct: 0, exp: 'Elle répare un dysfonctionnement.' },
    { stem: 'Hyperviseur de type 1 ?', opts: ['ESXi', 'VirtualBox', 'Workstation'], correct: 0, exp: 'Il s’exécute directement sur le matériel.' },
    { stem: 'Mode NAT : accessible depuis le LAN ?', opts: ['Non', 'Oui', 'Toujours'], correct: 0, exp: 'Elle sort via l’hôte mais n’est pas joignable.' },
    { stem: 'Que fait vMotion ?', opts: ['Migre une VM à chaud', 'Supprimez une VM', 'Créez un template'], correct: 0, exp: 'Sans interruption de service.' },
    { stem: 'Que permet Veeam ?', opts: ['Sauvegarde automatique des VM', 'Compiler du code', 'Créer des VLAN'], correct: 0, exp: 'Il sauvegarde les VM et permet leur restauration.' }
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
      '<strong>Réservez 15 min de relecture</strong> : types de sauvegarde, piliers de la HA, types de ' +
      'clusters, modes réseau, différence snapshot / sauvegarde.</p>',
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
      { cls: 'good', text: '70–94 % — bon niveau, cible clusters, maintenance et VM.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’examen.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits dans l’esprit du cours RD WinServer. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours Windows Server B2 : sujets chronométrés sur la sauvegarde, ' +
        'la haute disponibilité, le clustering, la maintenance et les VM, avec corrigés détaillés.',
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
    'assemble un tableau de bord d’infrastructure. Les scripts sont en PowerShell, comme à l’atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Lire deux entiers et afficher leur somme.',
      'Lire un âge de snapshot et dire s’il faut le purger (> 7 jours).',
      'Lire une température et classer normal / chaud / danger / critique.',
      'Compter le nombre d’échecs parmi n mises à jour.'
    ], [
      '$a = [int][Console]::In.ReadLine()',
      '$b = [int][Console]::In.ReadLine()',
      'Write-Output ("somme : " + ($a + $b))',
      '',
      '$age = [int][Console]::In.ReadLine()',
      'if ($age -gt 7) { Write-Output "snapshot : a purger" } else { Write-Output "snapshot : conserve" }',
      '',
      '$temp = [int][Console]::In.ReadLine()',
      'if ($temp -ge 85) { Write-Output "danger" } elseif ($temp -ge 60) { Write-Output "chaud" } else { Write-Output "normal" }',
      '',
      '$n = [int][Console]::In.ReadLine()',
      '$echecs = 0',
      'for ($i = 0; $i -lt $n; $i++) {',
      '    if ([Console]::In.ReadLine() -eq "echec") { $echecs++ }',
      '}',
      'Write-Output ("echecs : " + $echecs)'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Valider la stratégie 3-2-1 à partir de trois valeurs.',
      'Calculer la charge par serveur et le reste non réparti.',
      'Détecter une surallocation de vCPU.',
      'Totaliser un volume de VM et le comparer à la capacité d’une cible.'
    ], [
      '$copies = [int][Console]::In.ReadLine()',
      '$supports = [int][Console]::In.ReadLine()',
      '$horsSite = [Console]::In.ReadLine()',
      'if (($copies -ge 3) -and ($supports -ge 2) -and ($horsSite -eq "oui")) {',
      '    Write-Output "3-2-1 : conforme"',
      '} else {',
      '    Write-Output "3-2-1 : non conforme"',
      '}',
      '',
      '$requetes = [int][Console]::In.ReadLine()',
      '$serveurs = [int][Console]::In.ReadLine()',
      '$par = [int]([math]::Floor($requetes / $serveurs))',
      'Write-Output ("par serveur : " + $par)',
      'Write-Output ("non reparties : " + ($requetes % $serveurs))',
      '',
      '$vcpu = [int][Console]::In.ReadLine()',
      '$coeurs = [int][Console]::In.ReadLine()',
      'if ($vcpu -gt $coeurs) { Write-Output "surallocation : oui" } else { Write-Output "surallocation : non" }',
      '',
      '$capacite = [int][Console]::In.ReadLine()',
      '$n = [int][Console]::In.ReadLine()',
      '$total = 0',
      'for ($i = 0; $i -lt $n; $i++) { $total += [int][Console]::In.ReadLine() }',
      'if ($total -le $capacite) { Write-Output "planifiee" } else { Write-Output "capacite insuffisante" }'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Classifier un mode réseau (NAT / Bridge / Host-Only) selon l’accès Internet et l’accès LAN.',
      'Déterminer si un clone survit à la suppression de sa source.',
      'Vérifier le quorum d’un cluster à partir du nombre de nœuds en ligne.',
      'Établir un plan de maintenance à partir d’une fréquence (switch).'
    ], [
      '$mode = [Console]::In.ReadLine()',
      'switch ($mode) {',
      '    "nat" { Write-Output "internet : oui"; Write-Output "lan : non" }',
      '    "bridge" { Write-Output "internet : oui"; Write-Output "lan : oui" }',
      '    "host-only" { Write-Output "internet : non"; Write-Output "lan : non" }',
      '    default { Write-Output "internet : non"; Write-Output "lan : non" }',
      '}',
      '',
      '$type = [Console]::In.ReadLine()',
      '$sourceSupprimee = [Console]::In.ReadLine()',
      'if ($type -eq "complet" -or $sourceSupprimee -ne "oui") { Write-Output "clone : fonctionne" } else { Write-Output "clone : hors service" }',
      '',
      '$total = [int][Console]::In.ReadLine()',
      '$enLigne = [int][Console]::In.ReadLine()',
      'if ($enLigne * 2 -gt $total) { Write-Output "quorum : atteint" } else { Write-Output "quorum : perdu" }',
      '',
      '$freq = [Console]::In.ReadLine()',
      'switch ($freq) {',
      '    "hebdomadaire" { Write-Output "action : analyse des logs" }',
      '    "mensuelle" { Write-Output "action : test de sauvegarde" }',
      '    "trimestrielle" { Write-Output "action : test PRA" }',
      '    "annuelle" { Write-Output "action : audit securite" }',
      '}'
    ].join('\n')),

    '  <h2>Projet intégrateur — « audit d’une infrastructure »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>On te confie un script d’audit. Le script lit d’abord un entier <code>n</code> : le nombre de ' +
      'VM. Puis, pour chaque VM, une ligne <code>nom vcpu coeurs</code>. Il affiche, VM par VM, si ' +
      'elle est en surallocation. À la fin, il affiche le nombre total de VM en surallocation, puis un ' +
      'verdict : <code>infrastructure : a surveiller</code> si au moins une VM est en surallocation, ' +
      'sinon <code>infrastructure : saine</code>.</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> n, puis n lignes « nom vcpu coeurs ».</li>',
      '      <li><strong>Tester</strong> la surallocation (vcpu &gt; coeurs) pour chaque VM.</li>',
      '      <li><strong>Afficher</strong> une ligne par VM : <code>NOM : surallocation oui/non</code>.</li>',
      '      <li><strong>Compter</strong> les VM en surallocation.</li>',
      '      <li><strong>Afficher</strong> le total puis le verdict global.</li>',
      '      <li><strong>Gérer</strong> le cas n = 0 sans erreur.</li>',
      '    </ol>',
      '    <p>Contraintes : comparaisons avec <code>-gt</code>, <code>switch</code> ou <code>if</code>, ' +
      'et une seule boucle de lecture.</p>'
    ].join('\n')),
    box('method', 'Grille d’auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture ordonnée et gestion de n = 0 <strong>20</strong>' },
        { cls: '', text: 'Test correct de la surallocation <strong>20</strong>' },
        { cls: '', text: 'Affichage par VM au bon format <strong>20</strong>' },
        { cls: '', text: 'Comptage et verdict global <strong>20</strong>' },
        { cls: '', text: 'Lisibilité, noms, cohérence <strong>20</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
    '$n = [int][Console]::In.ReadLine()',
    '$enSurallocation = 0',
    'for ($i = 0; $i -lt $n; $i++) {',
    '    $nom = [Console]::In.ReadLine()',
    '    $vcpu = [int][Console]::In.ReadLine()',
    '    $coeurs = [int][Console]::In.ReadLine()',
    '    if ($vcpu -gt $coeurs) {',
    '        Write-Output ($nom + " : surallocation oui")',
    '        $enSurallocation++',
    '    } else {',
    '        Write-Output ($nom + " : surallocation non")',
    '    }',
    '}',
    'Write-Output ("surallocation : " + $enSurallocation)',
    'if ($enSurallocation -gt 0) {',
    '    Write-Output "infrastructure : a surveiller"',
    '} else {',
    '    Write-Output "infrastructure : saine"',
    '}'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine lecture ordonnée, test de surallocation, comptage et verdict — ' +
    'l’essentiel des premiers chapitres en un seul script.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du cours historique RD WinServer. ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours Windows Server B2 : ' +
        'scripts gradués et audit d’infrastructure en PowerShell.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
