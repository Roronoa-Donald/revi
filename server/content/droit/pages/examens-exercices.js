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
      'Qualifiez les données selon leur nature (personnelle, sensible, autre) et comptez les données sensibles.',
      'Calculez le seuil de sanction de 4 % du chiffre d’affaires.',
      'Rattachez les articles de référence à leur objet juridique.'
    ], [
      '# Grille d\'analyse — Cas 1 (Qualification)',
      'donnee_sante : sensible',
      'nom_prenom : personnelle',
      'sensibles : 1',
      '',
      '# Grille d\'analyse — Cas 2 (Seuil sanction)',
      'chiffre 600000000 -> 4 pourcent : 24000000',
      '',
      '# Grille d\'analyse — Cas 3 (Articles)',
      '55 : creation de l IPDCP',
      '86 : donnees sensibles',
      '93 : entrave au controle'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Contrôlez la validité du consentement préalable pour chaque traitement.',
      'Déterminez le montant légal de la sanction RGPD (20 M€ minimum ou 4 %).',
      'Évaluez la peine d’emprisonnement encourue selon l’infraction.'
    ], [
      '# Grille d\'analyse — Cas 1 (Consentement)',
      'traitement_rh : conforme',
      'traitement_marketing : non conforme',
      'conformes : 1/2',
      '',
      '# Grille d\'analyse — Cas 2 (Sanctions financières)',
      'entreprise_A : 20000000',
      'entreprise_B : 24000000',
      'total : 44000000',
      '',
      '# Grille d\'analyse — Cas 3 (Peines pénales)',
      'article 79 : 5 ans maximum',
      'article 93 : 2 ans maximum',
      'somme des maxima : 7 ans'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Lis le type (<code>intentionnel</code> ou <code>negligence</code>) puis n faits « code libelle » (<code>formalites</code>, <code>sensible</code>, <code>condamnation</code>, <code>entrave</code>) et affiche l’article et la peine.',
      'Lis n opérations (collecte, enregistrement, organisation, conservation, adaptation, modification, utilisation, cession ou autre) et distingue traitement et hors traitement.',
      'Lis n traitements « nom consentement finalite minimisation » et affiche conforme ou le nombre de principes manquants, puis le taux de conformité en pourcentage.'
    ], [
      '# Grille d\'analyse — Cas 1 (Infractions)',
      'formalites : article 79 (1 a 5 ans)',
      'sensible : article 86 (1 a 5 ans)',
      'entrave : article 93 (6 mois a 2 ans)',
      '',
      '# Grille d\'analyse — Cas 2 (Opérations de traitement)',
      'collecte : traitement',
      'conservation : traitement',
      'traitements : 2/2',
      '',
      '# Grille d\'analyse — Cas 3 (Conformité)',
      'traitement_rh : conforme',
      'traitement_stats : 1 principe(s) manquant(s)',
      'conformes : 1/2',
      'taux : 50 %'
    ].join('\n')),

    '  <h2>Projet intégrateur : registre de conformité</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>L\'exercice soumet le registre d’une entreprise : d’abord <code>n</code>, le nombre de traitements, ' +
      'puis les traitements sous la forme <code>nom consentement finalite minimisation sensible</code>, chaque ' +
      'valeur valant <code>oui</code> ou <code>non</code>. Vous contrôlez les trois principes du RGPD pour chaque ' +
      'traitement, signalez les données sensibles conservées sans consentement (article 86 de la loi ' +
      'togolaise), puis formulez le bilan.</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Analyser</strong> les caractéristiques de chaque traitement soumis.</li>',
      '      <li><strong>Contrôler</strong> consentement, finalité et minimisation : conforme seulement si les trois valent oui.</li>',
      '      <li><strong>Signaler</strong> un risque pénal article 86 si le traitement est sensible et sans consentement.</li>',
      '      <li><strong>Bilan</strong> : décompte des conformes, non conformes et risques article 86.</li>',
      '    </ol>',
      '    <p>Règles : méthode d\'analyse rigoureuse, conformité stricte aux textes applicables.</p>'
    ].join('\n')),
    box('method', 'Grille d’auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Analyse méthodique des traitements <strong>20</strong>' },
        { cls: '', text: 'Contrôle des trois principes exact <strong>25</strong>' },
        { cls: '', text: 'Signalement du risque article 86 correct <strong>25</strong>' },
        { cls: '', text: 'Qualifications juridiques fiables <strong>15</strong>' },
        { cls: '', text: 'Bilan final lisible et complet <strong>15</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
      '# Grille d\'analyse — Projet intégrateur : Registre de conformité',
      'traitement_paie : conforme',
      'traitement_recrutement : non conforme',
      'traitement_sante : non conforme',
      'traitement_sante : risque penal article 86',
      'conformes : 1',
      'non conformes : 2',
      'risques article 86 : 1'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine l\'audit des principes du chapitre 5 et la qualification ' +
    'pénale du chapitre 6 dans une même grille de conformité.',
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
