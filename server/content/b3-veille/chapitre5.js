/**
 * Chapitre 5 du cours « Veille Technologique & Innovation B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Analyse Prospective, Échelle TRL 1 à 9 &amp; Modèle Gartner Hype Cycle',
  short: 'Prospective, TRL &amp; Hype Cycle',
  toc: 'Méthodes d’évaluation de la maturité technologique, échelle TRL 1 à 9 (Technology Readiness Level de la NASA/Horizon Europe), les 5 phases de la courbe de Gartner (Hype Cycle), analyse prospective croisée SWOT / PESTEL, et détection des ruptures technologiques (Disruptive Innovations).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Collecter et filtrer des informations techniques ne suffit pas pour orienter les investissements d’une organisation : il faut savoir projeter la maturité réelle et la vitesse d’adoption d’une technologie. Trop d’entreprises se précipitent sur des effets de mode ou des technologies immatures au pire moment de leur cycle médiatique, subissant de lourdes pertes financières et des retards projets critiques. Pour un ingénieur de niveau Bachelor 3, l’analyse prospective s’appuie sur des grilles scientifiques standardisées : l’échelle TRL (Technology Readiness Level de 1 à 9) pour mesurer l’état réel de développement d’une brique logicielle ou matérielle, la courbe de Gartner (Hype Cycle) pour décoder l’écart entre buzz médiatique et productivité réelle, et la matrice croisée SWOT/PESTEL pour évaluer la résilience d’un choix technologique face aux menaces réglementaires et économiques.',
  objectives: [
    'assimiler les 9 niveaux standardisés de l’échelle de maturité technologique TRL (NASA / Commission Européenne) ;',
    'distinguer avec rigueur les trois macro-phases de maturité : Recherche (TRL 1-3), Développement (TRL 4-6) et Industrialisation (TRL 7-9) ;',
    'décrypter les 5 phases de la courbe Gartner Hype Cycle et formuler des recommandations d’investissement adaptées ;',
    'analyser les facteurs externes PESTEL et les projeter dans la matrice SWOT pour dériver un score de résilience ;',
    'anticiper les ruptures technologiques (innovations de rupture vs innovations incrémentales selon Clayton Christensen) ;',
    'analyser et résoudre méthodologiquement des évaluateurs d’échelle TRL, des positionneurs de phase Hype Cycle et des moteurs SWOT/PESTEL.'
  ],
  sections: [
    {
      title: 'L’Échelle de Maturité Technologique TRL (Technology Readiness Level)',
      html: [
        '<p>Développée initialement par la NASA dans les années 1970 pour les missions spatiales, puis standardisée par le ministère de la Défense américain (DoD) et la Commission Européenne (cadre Horizon Europe), l’<strong>échelle TRL</strong> évalue la maturité opérationnelle d’une technologie sur 9 niveaux universels :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les 9 Niveaux de l’Échelle TRL</h4>',
        '    <ul>',
        '      <li><strong>TRL 1 :</strong> Principes de base observés et décrits (publications scientifiques théoriques).</li>',
        '      <li><strong>TRL 2 :</strong> Concept technologique formulé et applications pratiques envisagées.</li>',
        '      <li><strong>TRL 3 :</strong> Preuve de concept expérimentale (PoC analytique en laboratoire).</li>',
        '      <li><strong>TRL 4 :</strong> Validation de composants élémentaires en environnement de laboratoire.</li>',
        '      <li><strong>TRL 5 :</strong> Validation de composants intégrés en environnement représentatif.</li>',
        '      <li><strong>TRL 6 :</strong> Démonstration d’un prototype de sous-système en environnement représentatif.</li>',
        '      <li><strong>TRL 7 :</strong> Démonstration d’un prototype complet en environnement opérationnel réel.</li>',
        '      <li><strong>TRL 8 :</strong> Système complet achevé, qualifié, certifié et documenté.</li>',
        '      <li><strong>TRL 9 :</strong> Système opérationnel éprouvé en conditions réelles et en production commerciale.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Les Trois Macro-Phases d’Ingénierie</h4>',
        '    <table class="table">',
        '      <thead><tr><th>Plage TRL</th><th>Macro-Phase</th><th>Risque Industriel</th><th>Niveau de Financement</th></tr></thead>',
        '      <tbody>',
        '        <tr><td><strong>TRL 1 à 3</strong></td><td>Recherche fondamentale &amp; amont</td><td>Très élevé (incertitude scientifique)</td><td>Subventions publiques, bourses R&amp;D</td></tr>',
        '        <tr><td><strong>TRL 4 à 6</strong></td><td>Développement technologique</td><td>Moyen (faisabilité démontrée)</td><td>Fonds d’amorçage, R&amp;D interne</td></tr>',
        '        <tr><td><strong>TRL 7 à 9</strong></td><td>Industrialisation &amp; Déploiement</td><td>Faible (fiabilité prouvée)</td><td>Investissements clients, exploitation courante</td></tr>',
        '      </tbody>',
        '    </table>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'La Courbe de Maturité Gartner Hype Cycle',
      html: [
        '<p>Le cabinet d’analystes Gartner a théorisé le <strong>Hype Cycle</strong> pour modéliser la façon dont une technologie émergente progresse dans le temps, depuis son déclenchement médiatique jusqu’à son adoption commerciale pérenne :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les 5 Phases de la Courbe de Gartner</h4>',
        '    <ol>',
        '      <li><strong>1. Innovation Trigger (Déclenchement) :</strong> Présentation publique d’une percée technique. Forte curiosité médiatique, absence de produits commerciaux finis, adoption marginale.</li>',
        '      <li><strong>2. Peak of Inflated Expectations (Pic des attentes) :</strong> Frénésie médiatique et promesses irréalistes. Multiples annonces sans cas d’usage rentables avérés. Phase la plus risquée pour investir.</li>',
        '      <li><strong>3. Trough of Disillusionment (Gouffre des désillusions) :</strong> Les promesses excessives ne sont pas tenues. L’intérêt médiatique s’effondre, de nombreuses startups échouent. Seuls les acteurs solides survivent.</li>',
        '      <li><strong>4. Slope of Enlightenment (Pente de l’éclaircissement) :</strong> Compréhension réaliste des bénéfices réels. Méthodologies stabilisées, outils de deuxième et troisième génération fiables.</li>',
        '      <li><strong>5. Plateau of Productivity (Plateau de productivité) :</strong> L’adoption devient massive et standardisée. La technologie est éprouvée, rentable et intégrée dans les offres courantes.</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Recommandations Stratégiques par Phase</h4>',
        '    <ul>',
        '      <li><code>INNOVATION_TRIGGER</code> → <strong>Veille active :</strong> Observer les brevets, suivre les pionniers sans engager de gros budgets.</li>',
        '      <li><code>PEAK_EXPECTATIONS</code> → <strong>Prudence &amp; observation :</strong> Éviter les déploiements hâtifs, ne pas céder à la pression du buzz.</li>',
        '      <li><code>TROUGH_DISILLUSIONMENT</code> → <strong>Pilotes ciblés :</strong> Moment idéal pour prototyper à bas coût auprès des rescapés de l’écosystème.</li>',
        '      <li><code>SLOPE_ENLIGHTENMENT</code> → <strong>Adoption progressive :</strong> Lancer les projets pilotes avec compétences formées.</li>',
        '      <li><code>PLATEAU_PRODUCTIVITY</code> → <strong>Déploiement standard :</strong> Intégrer par défaut dans le catalogue de production.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Matrice Croisée SWOT / PESTEL & Innovations de Rupture',
      html: [
        '<p>Pour traduire les signaux de veille en décisions d’ingénierie concrètes, l’analyse prospective croise les dimensions externes de l’environnement macro avec les capacités internes :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Six Dimensions du Modèle PESTEL</h4>',
        '    <ul>',
        '      <li><strong>Politique :</strong> Politiques publiques de souveraineté numérique, subventions, tensions géopolitiques.</li>',
        '      <li><strong>Économique :</strong> Taux d’intérêt, coût de l’énergie, modèles d’abonnement SaaS vs licence perpétuelle.</li>',
        '      <li><strong>Sociétal :</strong> Évolution des usages, travail à distance, acceptabilité sociale des algorithmes.</li>',
        '      <li><strong>Technologique :</strong> Vitesse d’obsolescence, interopérabilité, disponibilité des compétences d’ingénierie.</li>',
        '      <li><strong>Environnemental :</strong> Efficacité énergétique des serveurs, Green IT, bilan carbone Scope 1-2-3.</li>',
        '      <li><strong>Légal :</strong> Réglementation RGPD, NIS 2, DORA, secret des affaires, propriété intellectuelle.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Projection SWOT &amp; Posture Stratégique</h4>',
        '    <p>Chaque facteur PESTEL est pondéré et affecté en <strong>Opportunité</strong> ou <strong>Menace</strong> :</p>',
        '    <pre><code>Score Net = ∑ Poids(Opportunités) - ∑ Poids(Menaces)\nRésilience (%) = [∑ Poids(Opp) / Total Poids] × 100</code></pre>',
        '    <ul>',
        '      <li><strong>Posture Offensive :</strong> Score net $\\ge +5$ et Résilience $\\ge 60\\%$. L’organisation investit agressivement pour capter l’innovation.</li>',
        '      <li><strong>Posture Défensive :</strong> Score net $< 0$ et Résilience $< 45\\%$. Risque élevé d’obsolescence ou de non-conformité, mesures de sécurisation requises.</li>',
        '      <li><strong>Posture Attentiste :</strong> Équilibre précaire, surveillance continue sans engagement lourd.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('danger', '<strong>Dilemme de l’Innovateur (Clayton Christensen) :</strong> Les entreprises leaders échouent souvent parce qu’elles écoutent trop leurs clients actuels et optimisent leurs produits existants (innovations incrémentales), tout en méprisant les technologies de rupture initialement moins performantes et moins chères (innovations de rupture). Quand la rupture s’améliore, le leader est balayé. La veille prospective est le seul rempart contre cet aveuglement.')
      ].join('\n')
    }
  ],
  method: [
    '1. Évaluer l’état d’avancement de chaque brique technique sur l’échelle TRL de 1 à 9.',
    '2. Ne jamais engager de déploiement en production industrielle sur des composants dont le TRL est inférieur à 7.',
    '3. Positionner l’innovation sur la courbe Gartner Hype Cycle en observant l’écart entre buzz médiatique et adoption réelle.',
    '4. Refuser les investissements massifs au Pic des attentes exagérées (Peak of Inflated Expectations).',
    '5. Conduire une analyse d’impact croisée PESTEL pour identifier les opportunités et menaces majeures.',
    '6. Calculer l’indice de résilience technologique pour statuer sur une posture Offensive, Défensive ou Attentiste.'
  ],
  summary: [
    'L’échelle TRL mesure la maturité d’un projet technologique sur 9 niveaux, de la théorie (TRL 1) à la production (TRL 9).',
    'Les macro-phases TRL structurent le risque : Recherche (1-3), Développement (4-6) et Industrialisation (7-9).',
    'Le Gartner Hype Cycle décrit les 5 phases d’emballement et de stabilisation d’une technologie émergente.',
    'Le Pic des attentes est la phase la plus risquée ; le Gouffre des désillusions est le moment idéal pour lancer des PoCs ciblés.',
    'L’analyse PESTEL croisée avec la matrice SWOT calcule un score net et un indice de résilience technologique.',
    'Le Dilemme de l’Innovateur rappelle que les technologies de rupture démarrent souvent en bas de marché avant de balayer les leaders.'
  ],
  checklist: [
    'Le niveau TRL a-t-il été rigoureusement justifié par des livrables vérifiables (rapport de PoC, banc d’essai) ?',
    'Le projet de production s’appuie-t-il sur des technologies ayant atteint au minimum le TRL 8 ou 9 ?',
    'La technologie a-t-elle été positionnée sur le Hype Cycle pour éviter le piège du pic d’attentes ?',
    'Les six dimensions de l’analyse PESTEL (Politique à Légal) ont-elles toutes été passées en revue ?',
    'Le score de résilience stratégique a-t-il été calculé avant d’adopter une posture offensive ?',
    'Les menaces de rupture à bas coût (Dilemme de l’Innovateur) ont-elles été prises en compte ?'
  ],
  notions: [
    'Technology Readiness Level (TRL 1 à 9)',
    'Macro-phases Recherche, Développement, Industrialisation',
    'Gartner Hype Cycle (5 phases)',
    'Innovation Trigger & Peak of Inflated Expectations',
    'Trough of Disillusionment & Plateau of Productivity',
    'Analyse PESTEL (6 dimensions)',
    'Matrice SWOT croisée & Indice de résilience',
    'Innovations de rupture (Disruptive Innovations de Christensen)'
  ],
  pitfalls: [
    'Déployer en production critique une technologie de niveau TRL 4 (maquette de labo) sous prétexte qu’elle fonctionne sur la machine du développeur.',
    'Confondre un buzz médiatique intense au Pic de Gartner avec une adoption commerciale réelle et éprouvée.',
    'Négliger les contraintes légales et réglementaires (L du PESTEL) qui peuvent rendre une technologie illégale en Europe (ex: non-conformité RGPD ou AI Act).',
    'Rejeter une technologie émergente au stade de TRL 2 sous prétexte qu’elle est moins performante que la technologie existante en place.'
  ],
  questions: [
    {
      stem: 'À quel niveau de l’échelle TRL une technologie démontre-t-elle pour la première fois un prototype complet en environnement opérationnel réel ?',
      opts: [
        'TRL 3',
        'TRL 5',
        'TRL 7',
        'TRL 9'
      ],
      correct: 2,
      exp: 'Le TRL 7 correspond à la démonstration d’un prototype en environnement opérationnel réel (bêta-test grandeur nature).'
    },
    {
      stem: 'Dans quelle phase du Gartner Hype Cycle observe-t-on un effondrement de l’intérêt médiatique après que les promesses initiales n’ont pas été tenues ?',
      opts: [
        'Innovation Trigger',
        'Peak of Inflated Expectations',
        'Trough of Disillusionment (Gouffre des désillusions)',
        'Plateau of Productivity'
      ],
      correct: 2,
      exp: 'Le Trough of Disillusionment survient lorsque le battage médiatique retombe face aux difficultés réelles de mise en œuvre.'
    },
    {
      stem: 'Quel macro-palier de l’échelle TRL correspond aux niveaux TRL 4 à 6 ?',
      opts: [
        'Recherche fondamentale',
        'Développement technologique',
        'Industrialisation et commercialisation',
        'Maintenance de fin de vie'
      ],
      correct: 1,
      exp: 'Les niveaux TRL 4 à 6 constituent la macro-phase de développement technologique et de validation de maquettes.'
    },
    {
      stem: 'Selon le modèle de Clayton Christensen (Dilemme de l’Innovateur), comment démarrent généralement les innovations de rupture ?',
      opts: [
        'Par les produits les plus luxueux et les plus chers',
        'En bas de marché avec des performances initiales inférieures mais un coût bien plus faible et une simplicité d’usage',
        'Par des décisions gouvernementales obligatoires',
        'Par des logiciels open source uniquement'
      ],
      correct: 1,
      exp: 'Les innovations de rupture s’implantent d’abord sur des segments négligés avec une offre moins chère et plus simple, avant de monter en gamme.'
    },
    {
      stem: 'Dans l’analyse PESTEL, sous quelle dimension classe-t-on les obligations de conformité liées au règlement européen NIS 2 ?',
      opts: [
        'Dimension Économique (E)',
        'Dimension Sociétale (S)',
        'Dimension Légale (L)',
        'Dimension Environnementale (ENV)'
      ],
      correct: 2,
      exp: 'Les lois, directives européennes, décrets et sanctions relèvent de la dimension Légale (L) du modèle PESTEL.'
    },
    {
      stem: 'Quelle recommandation stratégique applique-t-on lorsqu’une technologie atteint le Plateau de productivité de Gartner ?',
      opts: [
        'Veille active prudente',
        'Déploiement standard et adoption généralisée',
        'Abandon immédiat',
        'Gel de tout investissement'
      ],
      correct: 1,
      exp: 'Sur le Plateau de productivité, la technologie est éprouvée, fiable et rentable : elle devient le standard de déploiement en production.'
    },
    {
      stem: 'Que signifie un indice de résilience technologique de 80 % dans une analyse SWOT/PESTEL ?',
      opts: [
        'Que 80 % des serveurs sont en panne',
        'Que les opportunités identifiées représentent 80 % de l’ensemble des facteurs d’impact pondérés face aux menaces',
        'Que le coût du projet est multiplié par 8',
        'Que la technologie date de 1980'
      ],
      correct: 1,
      exp: 'L’indice de résilience mesure la proportion d’opportunités favorables par rapport au total des impacts externes pondérés.'
    },
    {
      stem: 'Quel organisme a initialement développé l’échelle TRL dans les années 1970 ?',
      opts: [
        'L’UNESCO',
        'La NASA',
        'Microsoft',
        'L’AFNOR'
      ],
      correct: 1,
      exp: 'La NASA a conçu l’échelle TRL pour évaluer objectivement la maturité des technologies spatiales avant embarquement en mission.'
    }
  ],
  flashcards: [
    {
      q: 'Quels sont les trois macro-paliers de l’échelle TRL ?',
      a: 'Recherche amont (TRL 1-3), Développement (TRL 4-6) et Industrialisation/Production (TRL 7-9).'
    },
    {
      q: 'Que représente le TRL 9 ?',
      a: 'Le niveau maximal : système complet opérationnel, éprouvé en conditions réelles et déployé en production commerciale.'
    },
    {
      q: 'Quelles sont les 5 phases du Gartner Hype Cycle ?',
      a: '1. Innovation Trigger, 2. Peak of Expectations, 3. Trough of Disillusionment, 4. Slope of Enlightenment, 5. Plateau of Productivity.'
    },
    {
      q: 'Pourquoi éviter d’investir massivement au Pic des attentes de Gartner ?',
      a: 'Car les attentes sont gonflées artificiellement par le buzz et les technologies manquent encore de maturité et de rentabilité.'
    },
    {
      q: 'Que signifie l’acronyme PESTEL ?',
      a: 'Politique, Économique, Sociétal, Technologique, Environnemental et Légal.'
    },
    {
      q: 'Qu’est-ce que le Dilemme de l’Innovateur de Christensen ?',
      a: 'L’incapacité des leaders à adopter des technologies de rupture simples et bon marché, menant à leur déclassement par de nouveaux entrants.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à situer les niveaux TRL ou confusion sur les différentes phases de la courbe de Gartner.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension de la maturité technologique, modélisation Hype Cycle et calcul de résilience SWOT/PESTEL.'
    },
    {
      cls: 'high',
      text: 'Expertise prospective complète : alignement des seuils TRL avec la roadmap R&D, anticipation des ruptures de marché et arbitrage d’investissement.'
    }
  ]
};
