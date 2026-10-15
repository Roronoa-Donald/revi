/**
 * Chapitre 4 du cours « Masterclass Apprendre à apprendre » B2 — Organisation de la Pensée, Double Codage & Cartes Mentales.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Organisation de la Pensée, Double Codage &amp; Cartes Mentales',
  short: 'Organisation &amp; Double Codage',
  toc: 'Théorie du double codage d’Allan Paivio, mind mapping, cartes conceptuelles de Novak, méthode des Loci (Palais de mémoire).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Prendre des notes sous forme de longs pavés linéaires au kilomètre sature l’hémisphère verbal et masque ' +
    'les relations causales entre les notions. Le cerveau humain traite les informations visuo-spatiales ' +
    'avec une efficacité remarquable. En associant mots précis, arborescences graphiques et ancrage spatial, ' +
    'vous démultipliez votre vitesse de compréhension et votre capacité d’analyse.',

  objectives: [
    'exploiter la théorie du double codage (Dual Coding Theory d’Allan Paivio) ;',
    'concevoir des cartes mentales (Mind Maps de Tony Buzan) pour cartographier les liens hiérarchiques ;',
    'différencier une carte mentale d’une carte conceptuelle (Concept Map de Joseph Novak) ;',
    'maîtriser la méthode antique des Loci (Palais de mémoire) pour retenir des listes ordonnées arbitraires ;',
    'transformer des schémas d’architecture logicielle en leviers mnémotechniques puissants.'
  ],

  sections: [
    {
      title: 'La théorie du double codage d’Allan Paivio',
      html: [
        '<p>Formulée en 1971 par le psychologue canadien <strong>Allan Paivio</strong>, la théorie du <strong>double codage</strong> ' +
        'affirme que le système cognitif humain dispose de deux sous-systèmes de traitement distincts et complémentaires :</p>',
        '<ul>\n' +
        '  <li><strong>Le système verbal</strong> : traite le texte, le langage parlé, les formules syntaxiques et les listes séquentielles.</li>\n' +
        '  <li><strong>Le système non-verbal (visuo-spatial)</strong> : traite les formes géométriques, les couleurs, les dispositions spatiales et les schémas.</li>\n' +
        '</ul>',
        '<p>Lorsqu’un concept est encodé <strong>simultanément sous forme verbale et visuelle</strong>, il crée deux traces mnésiques ' +
        'distinctes interconnectées dans le cerveau. Si l’une des traces s’estompe, l’autre permet de reconstruire l’information intégrale.</p>',
        box('danger', 'Le faux mythe des « profils d’apprentissage »', 'alert',
          '    <p>La théorie selon laquelle certaines personnes seraient purement « visuelles » et d’autres purement « auditives » ' +
          '(modèle VAK) est un <strong>neuromythe</strong> scientifiquement réfuté. Tous les cerveaux en bonne santé apprennent ' +
          'plus vite et retiennent mieux lorsque les canaux verbal et visuel sont combinés simultanément.</p>')
      ].join('\n')
    },
    {
      title: 'Cartes mentales (Mind Maps) vs Cartes conceptuelles (Concept Maps)',
      html: [
        '<p>Bien que souvent confondues, ces deux approches graphiques répondent à des logiques différentes :</p>',
        '<table class="table-styled">\n' +
        '  <thead><tr><th>Critère</th><th>Mind Map (Tony Buzan)</th><th>Carte Conceptuelle (Joseph Novak)</th></tr></thead>\n' +
        '  <tbody>\n' +
        '    <tr><td><strong>Structure</strong></td><td>Arborescente radiale (un seul concept central)</td><td>Graphe relationnel orienté (réseau maillé)</td></tr>\n' +
        '    <tr><td><strong>Relations</strong></td><td>Hiérarchie pure (parent &rarr; enfant)</td><td>Verbes de liaison explicites sur les flèches (ex. « hérite de »)</td></tr>\n' +
        '    <tr><td><strong>Usage idéal</strong></td><td>Brainstorming, plan de synthèse, mémorisation globale</td><td>Modélisation de systèmes complexes, bases de données, ontologies</td></tr>\n' +
        '  </tbody>\n' +
        '</table>',
        '<p>Pour un cours d’ingénierie, la carte conceptuelle permet de vérifier la validité des propositions logiques : ' +
        'chaque triplet <code>[Concept A] --(verbe de liaison)--&gt; [Concept B]</code> forme une phrase complète et vérifiable.</p>'
      ].join('\n')
    },
    {
      title: 'La méthode des Loci et le Palais de la mémoire',
      html: [
        '<p>Inventée par les orateurs grecs et romains de l’Antiquité (Cicéron, Quintilien), la <strong>méthode des Loci</strong> ' +
        '(des lieux) ancre des éléments à mémoriser le long d’un itinéraire physique familier :</p>',
        '<ol>\n' +
        '  <li><strong>Choisir un lieu parfaitement connu</strong> : votre maison d’enfance, votre appartement ou votre campus.</li>\n' +
        '  <li><strong>Établir un itinéraire invariable</strong> : définir 10 à 20 étapes distinctes (la porte d’entrée, le porte-manteau, ' +
        'le canapé du salon, la table basse, l’évier de la cuisine, etc.).</li>\n' +
        '  <li><strong>Associer une image mentale vivante à chaque étape</strong> : pour mémoriser un concept abstrait, ' +
        'le transformer en image concrète, absurde ou animée, déposée mentalement sur le lieu.</li>\n' +
        '  <li><strong>Parcourir mentalement le palais</strong> : pour restituer la liste dans l’ordre exact, il suffit de ' +
        'déambuler le long du trajet et d’observer les objets insolites déposés à chaque étape.</li>\n' +
        '</ol>',
        box('astuce', 'L’exagération et l’émotion comme leviers mnésiques', 'lightbulb',
          '    <p>Le cerveau retient sans effort les images bizarres, démesurées ou chargées d’émotion. ' +
          'Si vous devez retenir l’algorithme de Dijkstra, imaginez un énorme panneau routier clignotant géant ' +
          'en flammes posé au milieu de votre salon : l’image sera instantanément gravée.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Que démontre la théorie du double codage d’Allan Paivio ?', opts: ['L’association d’un mot et d’un schéma visuel double la solidité de la trace mnésique', 'Il faut coder en deux langages de programmation différents', 'Le cerveau n’utilise que 10 % de ses neurones'], correct: 0, exp: 'Le double codage crée deux représentations indépendantes (verbale et visuelle) qui se renforcent mutuellement.' },
    { stem: 'Pourquoi la croyance selon laquelle certains étudiants sont purement « visuels » ou « auditifs » est-elle un neuromythe ?', opts: ['Toutes les études scientifiques ont démontré l’absence de bénéfice à cantonner un élève à un seul style sensoriel', 'Parce que les yeux sont reliés à l’oreille interne', 'Parce que la mémoire visuelle n’existe pas'], correct: 0, exp: 'Tous les individus apprennent mieux lorsque le texte et le visuel sont combinés simultanément.' },
    { stem: 'Quelle est la différence fondamentale entre une Mind Map et une Carte Conceptuelle de Novak ?', opts: ['La carte conceptuelle relie les concepts en réseau avec des verbes de liaison explicites sur les flèches', 'La Mind Map est obligatoirement dessinée au compas', 'La carte conceptuelle n’a aucun texte'], correct: 0, exp: 'Les Concept Maps forment un réseau de propositions logiques complètes (Sujet - Verbe - Objet).' },
    { stem: 'À quelle civilisation attribue-t-on traditionnellement l’invention de la méthode des Loci (Palais de mémoire) ?', opts: ['La Grèce et la Rome antiques (Simonide de Céos, Cicéron)', 'L’Égypte pharaonique', 'La Renaissance italienne'], correct: 0, exp: 'Simonide de Céos et les orateurs romains utilisaient les lieux pour mémoriser de longs discours sans notes.' },
    { stem: 'Dans la méthode des Loci, pourquoi est-il recommandé d’imaginer des scènes loufoques ou exagérées ?', opts: ['L’hippocampe et l’amygdale retiennent beaucoup plus facilement les stimuli insolites et émotionnels', 'Pour faire rire l’examinateur', 'Pour accélérer le temps de sommeil'], correct: 0, exp: 'La singularité et l’émotion activent des circuits neuronaux renforcés qui résistent à l’oubli.' },
    { stem: 'Quelle structure géométrique caractérise une Mind Map classique de Tony Buzan ?', opts: ['Une arborescence radiale partant d’un cœur central unique', 'Une pyramide hiérarchique fermée', 'Un tableau croisé dynamique à deux colonnes'], correct: 0, exp: 'Une Mind Map rayonne vers l’extérieur depuis un concept central avec des branches ramifiées.' },
    { stem: 'Quel avantage une carte conceptuelle apporte-t-elle pour déceler les incompréhensions ?', opts: ['Elle force à formuler un verbe précis pour chaque liaison entre deux concepts', 'Elle s’imprime en noir et blanc', 'Elle masque les erreurs de syntaxe'], correct: 0, exp: 'Si l’étudiant est incapable de nommer le lien relationnel entre deux bulles, le modèle mental est incomplet.' },
    { stem: 'Combien d’étapes ordonnées comporte typiquement un palais de mémoire pour un apprentissage efficace ?', opts: ['10 à 25 lieux familiers ordonnés le long d’un trajet continu sans croisement', 'Plus de 10 000 lieux virtuels', 'Un seul lieu'], correct: 0, exp: 'Un parcours régulier de 10 à 25 loci permet de structurer confortablement un chapitre de cours.' }
  ],

  pitfalls: [
    'Passer des heures à décorer une Mind Map avec des feutres de couleur au détriment de la justesse des liens conceptuels.',
    'Se réfugier derrière l’étiquette de « profil auditif » pour refuser de s’entraîner sur des schémas techniques.',
    'Construire un palais de mémoire avec un lieu inconnu ou mal visualisé, provoquant des hésitations spatiales.',
    'Rédiger des cartes conceptuelles où les flèches n’ont aucun verbe de liaison explicite.',
    'Faire des schémas surchargés d’informations sans respecter la clarté de lecture hiérarchique.'
  ],

  methodTitle: 'Construire son premier palais de mémoire technique',
  method: [
    '<strong>Choisir un itinéraire familier</strong> : cartographier les pièces de votre domicile dans un sens logique (ex. de l’entrée vers le jardin).',
    '<strong>Fixer 10 stations incontournables</strong> : porte, porte-manteau, miroir, canapé, téléviseur, table, frigo, évier, lit, bureau.',
    '<strong>Transformer chaque concept en image animée</strong> : convertir une notion abstraite (ex. protocole TCP) en personnage ou objet démesuré.',
    '<strong>Déposer mentalement l’image sur la station</strong> : imaginer une interaction physique marquante entre l’objet et le meuble.',
    '<strong>Répéter le parcours mentalement</strong> : fermer les yeux et parcourir le trajet dans l’ordre pour tester la fluidité de rappel.'
  ],

  summary: [
    'La théorie du double codage d’Allan Paivio prouve qu’associer mots et visuels double la force de la trace mnésique.',
    'Le concept des « styles d’apprentissage » est un neuromythe réfuté : tout le monde tire profit du double codage.',
    'Les Mind Maps structurent la hiérarchie radiale, tandis que les Concept Maps maillent les relations causales avec des verbes.',
    'La méthode des Loci utilise la mémoire spatiale ancestrale pour ancrer des listes de données sans effort.',
    'L’exagération et l’insolite sont des catalyseurs puissants pour la potentialisation synaptique.'
  ],

  checklist: [
    'Je sais appliquer le principe du double codage sur mes fiches de synthèse.',
    'Je comprends pourquoi le mythe des styles d’apprentissage (VAK) est erroné.',
    'Je sais construire une carte conceptuelle avec des verbes de liaison explicites.',
    'Je possède un itinéraire mental de 10 étapes opérationnel pour la méthode des Loci.',
    'Je sais transformer une notion abstraite en métaphore visuelle mémorable.'
  ],

  notions: ['Double codage', 'Allan Paivio', 'Neuromythes', 'VAK', 'Mind Map', 'Tony Buzan', 'Carte conceptuelle', 'Joseph Novak', 'Méthode des Loci', 'Palais de mémoire', 'Mémoire visuo-spatiale'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la théorie du double codage et la différence Mind Map / Concept Map.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur la méthode des Loci et la verbalisation des liens.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les outils d’organisation visuo-spatiale.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à la pratique délibérée et à l’entrelacement au chapitre 5.' }
  ],

  flashcards: [
    { q: 'Qu’est-ce que le double codage selon Allan Paivio ?', a: 'Le codage simultané d’un concept par le canal verbal (mots) et le canal non-verbal (schémas/images).' },
    { q: 'Pourquoi le modèle des profils visuel/auditif/kinesthésique est-il un neuromythe ?', a: 'Parce que les recherches prouvent que tous les cerveaux retiennent mieux avec une approche multimodale intégrée.' },
    { q: 'Quelle est la caractéristique maîtresse d’une Concept Map de Novak ?', a: 'Chaque flèche porte un verbe de liaison explicite formant une proposition sémantique complète.' },
    { q: 'Comment fonctionne la méthode des Loci ?', a: 'On associe chaque élément à retenir à un lieu familier le long d’un itinéraire mental ordonné.' },
    { q: 'Quel type d’image mentale le cerveau retient-il le plus vite ?', a: 'Des images concrètes, démesurées, absurdes, animées ou chargées d’émotion.' },
    { q: 'Quel est l’atout majeur d’une Mind Map pour la synthèse ?', a: 'Elle offre une vision synthétique panoramique en un coup d’œil depuis un cœur central.' }
  ],

  next: {
    href: 'chapitre5.html',
    label: 'Chapitre 5 : Pratique Délibérée, Entrelacement &amp; Résolution de Problèmes'
  }
};
