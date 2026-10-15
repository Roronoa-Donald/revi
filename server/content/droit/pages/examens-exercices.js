/**
 * Pages « examens blancs » et « exercices & projet » du cours « Droit Informatique » B2.
 */
'use strict';

const { ic, crumb, box, qcm, bands } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1 : données, traitement, RGPD',
      intro: 'Sujet type épreuve : données personnelles, traitement, RGPD et sanction.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : Données',
          text: 'Classez les informations suivantes : (a) le numéro de téléphone d’un client ; (b) l’appartenance syndicale d’un employé ; (c) l’adresse générique contact@entreprise.tg.',
          sol: '(a) <strong>donnée personnelle indirecte</strong> : elle permet d’identifier une personne par un numéro. (b) <strong>donnée sensible</strong> : elle révèle une appartenance syndicale. (c) <strong>coordonnée d’entreprise</strong> : en principe, ce n’est pas une donnée personnelle.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Traitement',
          text: 'Une entreprise collecte des adresses, les conserve puis les cède à un partenaire. Y a-t-il traitement de données personnelles ? Citez les opérations constitutives.',
          sol: 'Oui : une entreprise traite des données personnelles dès qu’elle effectue une <strong>opération ou une suite d’opérations</strong> sur ces données. Ici : <strong>collecte, conservation, cession</strong>. La liste du cours : collecte, enregistrement, organisation, conservation, adaptation, modification, utilisation, cession.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : RGPD',
          text: 'Que signifie RGPD ? Donnez deux avantages de la conformité pour une entreprise et la sanction prévue en Europe.',
          sol: '<strong>Règlement Général de Protection des Données</strong> (et non « Régime »). Avantages : l’<strong>accountability</strong> (plus grande responsabilisation) et la <strong>confiance</strong> accrue des partenaires. Sanction : amende jusqu’à <strong>20 millions d’euros ou 4 % du chiffre d’affaires global</strong>, la plus lourde étant retenue.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : Calcul',
          text: 'Une entreprise réalise 800 millions d’euros de chiffre d’affaires. Calculez la sanction RGPD maximale. Même question pour 100 millions.',
          sol: '800 M€ : 4 % valent <strong>32 M€</strong>, plus que 20 M€ : sanction de 32 millions. 100 M€ : 4 % ne valent que 4 M€, le montant fixe l’emporte : sanction de <strong>20 millions</strong>.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 : sources, enjeux, cadre togolais',
      intro: 'Sujet orienté sources, affaire Cambridge Analytica, IPDCP et peines.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : Sources',
          text: 'Classez : (a) l’article 29 de la loi sur la liberté de la presse ; (b) l’article 8 de la CEDH ; (c) un traité OMPI de 1996 ; (d) la loi n° 78-17.',
          sol: '(a) source <strong>nationale</strong> (diffamation et injure en ligne). (b) source <strong>supranationale</strong> (vie privée). (c) source <strong>supranationale</strong> (droit d’auteur). (d) source <strong>normative</strong> : la loi Informatique et Libertés de 1978.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Enjeux',
          text: 'Quels sont les trois enjeux juridiques de l’affaire Cambridge Analytica ?',
          sol: 'L’<strong>utilisation non autorisée</strong> des données personnelles d’utilisateurs, la <strong>manipulation électorale</strong> par profilage psychologique, et le <strong>non-respect de la transparence et du consentement</strong>.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : IPDCP',
          text: 'Quelle autorité contrôle la protection des données au Togo ? Quel article la crée ? Quelle peine pour qui entrave son action ?',
          sol: 'L’<strong>IPDCP</strong>, Instance de Protection des Données à Caractère Personnel, créée par l’<strong>article 55</strong> : autorité administrative indépendante. Ses pouvoirs de contrôle figurent à l’article 68. Entraver son action (<strong>article 93</strong>) : six mois à deux ans d’emprisonnement et 1 000 000 à 10 000 000 de francs CFA, ou l’une de ces deux peines.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : Peines',
          text: 'Une entreprise traite des données sans formalités préalables. Quelle peine si elle agit intentionnellement ? Par négligence ? Et si elle conserve sans consentement des données de santé ?',
          sol: 'Article 79, intentionnel : <strong>1 à 5 ans</strong> et <strong>1 000 000 à 10 000 000</strong> de francs CFA. Par négligence : <strong>1 à 3 ans</strong> et <strong>500 000 à 5 000 000</strong>. Données de santé conservées sans consentement exprès : <strong>article 86</strong>, 1 à 5 ans et 1 000 000 à 10 000 000.'
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
    { stem: 'Le droit de l’informatique encadre…', opts: ['Les usages, la création et la gestion des technologies', 'Uniquement le matériel', 'Seulement les réseaux sociaux'], correct: 0, exp: 'C’est l’ensemble des règles applicables à l’environnement numérique.' },
    { stem: 'Une coordonnée d’entreprise est, en principe…', opts: ['Une donnée personnelle', 'Pas une donnée personnelle', 'Une donnée sensible'], correct: 1, exp: 'Les coordonnées professionnelles ne sont pas en principe des données personnelles.' },
    { stem: 'Une donnée sensible est…', opts: ['Une donnée sur l’origine, les opinions ou la santé', 'Un mot de passe', 'Un fichier volumineux'], correct: 0, exp: 'Origine, opinions, vie sexuelle, santé, poursuites, etc.' },
    { stem: 'La CEDH est une source…', opts: ['Supranationale', 'Nationale', 'Normative de 1978'], correct: 0, exp: 'Convention internationale : articles 8 et 10.' },
    { stem: 'Le RGPD est entré en vigueur au Togo en…', opts: ['Octobre 2019', 'Mai 2018', 'Octobre 2018'], correct: 0, exp: 'Mai 2018 dans l’Union européenne, octobre 2019 au Togo.' },
    { stem: 'Sanction européenne du RGPD :', opts: ['20 M€ ou 4 % du chiffre d’affaires, le plus lourd', '1 M€ fixe', '4 % du bénéfice'], correct: 0, exp: 'La plus lourde des deux sanctions est retenue.' },
    { stem: 'L’IPDCP est créée par l’article…', opts: ['55', '68', '93'], correct: 0, exp: 'Article 55 : création de l’Instance.' },
    { stem: 'Entraver l’IPDCP est puni de…', opts: ['6 mois à 2 ans', '1 à 5 ans', '1 à 3 ans'], correct: 0, exp: 'Article 93, avec 1 à 10 millions de francs CFA.' },
    { stem: 'Un traitement par négligence (art. 79) est puni de…', opts: ['1 à 3 ans', '1 à 5 ans', '6 mois à 2 ans'], correct: 0, exp: 'Et de 500 000 à 5 000 000 de francs CFA.' },
    { stem: 'Un antivirus suffit à sécuriser une plateforme.', opts: ['Faux', 'Vrai'], correct: 0, exp: 'La sécurité repose sur un ensemble de mesures.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l’esprit de l’épreuve (durée 2 h, /20). ' +
    'Fais-les <strong>sans regarder</strong> les corrigés, puis corrige-toi sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen : 2 h</div>',
      '    <p>Lance le chrono quand tu commences un sujet. Ne consulte le corrigé qu’à la fin. ' +
      '<strong>Réserve 15 min de relecture</strong> : définitions exactes, articles cités, calculs refaits, dates vérifiées.</p>',
      '    <p><button class="btn btn--primary" data-start>' + ic('play') + ' Démarrer le chrono</button>',
      '       <span data-clock style="font-weight:800;font-size:1.1rem;margin-left:12px">120:00</span></p>',
      '  </div>'
    ].join('\n'),
    sujets.map(sujet => '  <h2>' + sujet.title + '</h2>\n\n  <p class="lead">' + sujet.intro + '</p>\n\n' +
      sujet.items.map(itemHtml).join('\n\n')).join('\n\n'),
    '  <h2>QCM final : toutes notions</h2>',
    '  ' + qcm(mastery, { mastery: true }),
    box('method', 'Barème de maîtrise', 'compass', '    ' + bands([
      { cls: 'low', text: '&lt; 50 % : reprends les chapitres concernés avant un nouveau sujet.' },
      { cls: 'mid', text: '50–69 % : refais les exercices des chapitres faibles.' },
      { cls: 'good', text: '70–89 % : bon niveau, cible les peines togolaises et les sources.' },
      { cls: 'top', text: '≥ 95 % : niveau de maîtrise recherché avant l’épreuve.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d’après le support « Introduction au droit de l’informatique » (MILILA P.) et son recueil de questions. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de Droit informatique B2 : sujets chronométrés sur les données, ' +
        'le RGPD, les sources, l’IPDCP et les peines togolaises.',
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
    'outille un registre de conformité. Les scripts sont en Bash, comme à l’atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Lis n lignes « code libelle » (<code>p</code> personnelle, <code>s</code> sensible, autre) et affiche la catégorie, puis le nombre de données sensibles.',
      'Lis un chiffre d’affaires et affiche 4 % de ce montant (entier).',
      'Lis n numéros d’article (55, 68, 79, 86, 87, 93) et affiche l’objet de chacun, ou inconnu.'
    ], [
      'read -r n',
      'sensibles=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r code libelle',
      '  case "$code" in',
      '    p) echo "$libelle : personnelle" ;;',
      '    s) echo "$libelle : sensible" ; sensibles=$((sensibles + 1)) ;;',
      '    *) echo "$libelle : autre" ;;',
      '  esac',
      'done',
      'echo "sensibles : $sensibles"',
      '',
      'read -r chiffre',
      'echo "4 pourcent : $((chiffre * 4 / 100))"',
      '',
      'read -r n',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r article',
      '  case "$article" in',
      '    55) echo "55 : creation de l IPDCP" ;;',
      '    68) echo "68 : mission de controle" ;;',
      '    79) echo "79 : traitements sans formalites" ;;',
      '    86) echo "86 : donnees sensibles" ;;',
      '    87) echo "87 : condamnations" ;;',
      '    93) echo "93 : entrave au controle" ;;',
      '    *) echo "$article : inconnu" ;;',
      '  esac',
      'done'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Lis n traitements « nom consentement » (oui ou non) et affiche conforme ou non conforme, puis le bilan.',
      'Lis n entreprises « nom chiffre_affaires » et affiche la sanction RGPD de chacune (20 M€ minimum, sinon 4 %), puis le total.',
      'Lis n articles et affiche la peine d’emprisonnement maximale de chacun (79, 86, 87 : 5 ans ; 93 : 2 ans), puis la somme des maxima.'
    ], [
      'read -r n',
      'conformes=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r nom consentement',
      '  if [ "$consentement" = "oui" ]; then',
      '    echo "$nom : conforme"',
      '    conformes=$((conformes + 1))',
      '  else',
      '    echo "$nom : non conforme"',
      '  fi',
      'done',
      'echo "conformes : $conformes/$n"',
      '',
      'read -r n',
      'total=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r nom ca',
      '  sanction=$((ca * 4 / 100))',
      '  if [ "$sanction" -lt 20000000 ]; then sanction=20000000; fi',
      '  echo "$nom : $sanction"',
      '  total=$((total + sanction))',
      'done',
      'echo "total : $total"',
      '',
      'read -r n',
      'total=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r article',
      '  case "$article" in',
      '    79|86|87) ans=5 ;;',
      '    93) ans=2 ;;',
      '    *) ans=0 ;;',
      '  esac',
      '  echo "article $article : $ans ans maximum"',
      '  total=$((total + ans))',
      'done',
      'echo "somme des maxima : $total ans"'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Lis le type (<code>intentionnel</code> ou <code>negligence</code>) puis n faits « code libelle » (<code>formalites</code>, <code>sensible</code>, <code>condamnation</code>, <code>entrave</code>) et affiche l’article et la peine.',
      'Lis n opérations (collecte, enregistrement, organisation, conservation, adaptation, modification, utilisation, cession ou autre) et distingue traitement et hors traitement.',
      'Lis n traitements « nom consentement finalite minimisation » et affiche conforme ou le nombre de principes manquants, puis le taux de conformité en pourcentage.'
    ], [
      'read -r type',
      'read -r n',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r code libelle',
      '  case "$code" in',
      '    formalites)',
      '      if [ "$type" = "negligence" ]; then',
      '        echo "$libelle : article 79 (1 a 3 ans)"',
      '      else',
      '        echo "$libelle : article 79 (1 a 5 ans)"',
      '      fi ;;',
      '    sensible) echo "$libelle : article 86 (1 a 5 ans)" ;;',
      '    condamnation) echo "$libelle : article 87 (1 a 5 ans)" ;;',
      '    entrave) echo "$libelle : article 93 (6 mois a 2 ans)" ;;',
      '    *) echo "$libelle : aucune qualification" ;;',
      '  esac',
      'done',
      '',
      'read -r n',
      'traitements=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r operation',
      '  case "$operation" in',
      '    collecte|enregistrement|organisation|conservation|adaptation|modification|utilisation|cession)',
      '      echo "$operation : traitement"',
      '      traitements=$((traitements + 1)) ;;',
      '    *) echo "$operation : hors traitement" ;;',
      '  esac',
      'done',
      'echo "traitements : $traitements/$n"',
      '',
      'read -r n',
      'conformes=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r nom c f m',
      '  manquants=0',
      '  for v in "$c" "$f" "$m"; do',
      '    [ "$v" = "non" ] &amp;&amp; manquants=$((manquants + 1))',
      '  done',
      '  if [ "$manquants" -eq 0 ]; then',
      '    echo "$nom : conforme"',
      '    conformes=$((conformes + 1))',
      '  else',
      '    echo "$nom : $manquants principe(s) manquant(s)"',
      '  fi',
      'done',
      'echo "conformes : $conformes/$n"',
      'echo "taux : $((conformes * 100 / n)) %"'
    ].join('\n')),

    '  <h2>Projet intégrateur : registre de conformité</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>Le script reçoit le registre d’une entreprise : d’abord <code>n</code>, le nombre de traitements, ' +
      'puis <code>n</code> lignes au format <code>nom consentement finalite minimisation sensible</code>, chaque ' +
      'valeur valant <code>oui</code> ou <code>non</code>. Il contrôle les trois principes du RGPD pour chaque ' +
      'traitement, signale les données sensibles conservées sans consentement (article 86 de la loi ' +
      'togolaise), puis produit le bilan.</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> d’abord le nombre de traitements, puis une ligne par traitement.</li>',
      '      <li><strong>Contrôler</strong> consentement, finalité et minimisation : conforme seulement si les trois valent oui.</li>',
      '      <li><strong>Signaler</strong> un risque pénal article 86 si le traitement est sensible et sans consentement.</li>',
      '      <li><strong>Bilan</strong> : conformes, non conformes, risques article 86, formats exacts.</li>',
      '    </ol>',
      '    <p>Contraintes : une boucle de lecture, trois compteurs, aucun bilan à l’intérieur de la boucle.</p>'
    ].join('\n')),
    box('method', 'Grille d’auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture des lignes sans mélange <strong>20</strong>' },
        { cls: '', text: 'Contrôle des trois principes exact <strong>25</strong>' },
        { cls: '', text: 'Signalement du risque article 86 correct <strong>25</strong>' },
        { cls: '', text: 'Compteurs fiables <strong>15</strong>' },
        { cls: '', text: 'Bilan final lisible et complet <strong>15</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
      'read -r n',
      'conformes=0',
      'non_conformes=0',
      'risques=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r nom consentement finalite minimisation sensible',
      '  manquants=0',
      '  for v in "$consentement" "$finalite" "$minimisation"; do',
      '    [ "$v" = "non" ] &amp;&amp; manquants=$((manquants + 1))',
      '  done',
      '  if [ "$manquants" -eq 0 ]; then',
      '    echo "$nom : conforme"',
      '    conformes=$((conformes + 1))',
      '  else',
      '    echo "$nom : non conforme"',
      '    non_conformes=$((non_conformes + 1))',
      '  fi',
      '  if [ "$sensible" = "oui" ] &amp;&amp; [ "$consentement" = "non" ]; then',
      '    echo "$nom : risque penal article 86"',
      '    risques=$((risques + 1))',
      '  fi',
      'done',
      'echo "conformes : $conformes"',
      'echo "non conformes : $non_conformes"',
      'echo "risques article 86 : $risques"'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine la lecture ligne à ligne, le contrôle des principes du chapitre 5 et la qualification ' +
    'pénale du chapitre 6 en un seul script.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits d’après le support « Introduction au droit de l’informatique » (MILILA P.). ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices & projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours de Droit informatique B2 : scripts Bash ' +
        'gradués et registre de conformité complet.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
