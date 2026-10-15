/**
 * Chapitre 2 du cours « Veille Technologique & Innovation B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Méthodologie du Cycle de Veille, Requêtes Booléennes &amp; Signaux Faibles',
  short: 'Cycle de Veille &amp; Signaux Faibles',
  toc: 'Les 5 étapes du cycle du renseignement (ciblage des besoins, cartographie des sources, collecte, analyse/synthèse, diffusion &amp; rétroaction), équations de recherche booléennes avancées, opérateurs Google Dorks, grille multicritère de qualification de sources, et détection mathématique des signaux faibles vs bruit de fond.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Faire de la veille sans méthode rigoureuse aboutit inévitablement à l’infobésité et à la noyade sous des flots d’articles publicitaires sans valeur. Dans les cellules d’intelligence économique et technologique, le processus d’acquisition d’information obéit à un cycle itératif normé (le cycle du renseignement ou Information Intelligence Cycle). Pour l’ingénieur de niveau B3, il est impératif de savoir formaliser le besoin stratégique en amont, construire des équations de recherche booléennes complexes exploitant la syntaxe des moteurs spécialisés (Dorks), évaluer la crédibilité des sources d’information sur des critères quantifiés et appliquer des modèles d’analyse temporelle pour détecter les signaux faibles émergents avant qu’ils ne deviennent des tendances lourdes saturées.',
  objectives: [
    'maîtriser les cinq phases fondamentales du cycle du renseignement appliqué à la veille technologique ;',
    'formaliser un cahier des charges de veille aligné avec les priorités stratégiques de l’organisation ;',
    'concevoir des requêtes booléennes d’ingénierie avancées avec opérateurs stricts (AND, OR, NOT, site:, filetype:) ;',
    'auditer et pondérer la fiabilité des sources d’information selon une grille multicritère objective ;',
    'distinguer mathématiquement un signal faible d’un bruit de fond par le calcul des taux d’accélération lexicale ;',
    'implémenter en Python 3 des générateurs de requêtes dorking, des auditeurs de crédibilité et des détecteurs temporels de signaux faibles.'
  ],
  sections: [
    {
      title: 'Le Cycle du Renseignement Technologique (Information Intelligence Cycle)',
      html: [
        '<p>La veille d’ingénierie n’est pas un acte isolé mais un processus continu et itératif en 5 étapes normalisées par l’AFNOR et les services d’intelligence stratégique :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les 5 Étapes du Cycle de Veille</h4>',
        '    <ol>',
        '      <li><strong>1. Expression des besoins (Cadrage) :</strong> Définir les axes prioritaires, les thématiques cibles, les livrables attendus et les destinataires finaux.</li>',
        '      <li><strong>2. Sourcing (Sélection des sources) :</strong> Identifier, qualifier et cartographier les sources d’information pertinentes (revues scientifiques, bases de brevets, forges logicielles, régulateurs).</li>',
        '      <li><strong>3. Collecte &amp; Acquisition :</strong> Récolter les données brutes via des mécanismes automatisés Push (RSS, alertes) ou Pull (requêtes booléennes ciblées).</li>',
        '      <li><strong>4. Traitement &amp; Analyse :</strong> Trier, filtrer, valider, croiser les faits et synthétiser l’information pour lui donner une valeur décisionnelle actionnable.</li>',
        '      <li><strong>5. Diffusion &amp; Rétroaction (Feedback) :</strong> Restituer les résultats sous un format adapté (bulletin flash, livret, dashboard) et mesurer la satisfaction des décideurs pour réajuster le cycle.</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>La Cartographie et Typologie des Sources</h4>',
        '    <ul>',
        '      <li><strong>Sources primaires (Haute valeur) :</strong> Dépôts de brevets (Espacenet, WIPO, INPI), publications académiques à comité de lecture (IEEE, ACM, ArXiv), spécifications RFC/IETF, code source de forges ouvertes (GitHub, GitLab), avis officiels d’agences gouvernementales (ANSSI, NIST, CERT).</li>',
        '      <li><strong>Sources secondaires :</strong> Articles d’analyse sectorielle, blogs d’ingénieurs reconnus, revues spécialisées d’entreprises, benchmarks indépendants.</li>',
        '      <li><strong>Sources tertiaires (À manier avec prudence) :</strong> Médias généralistes, réseaux sociaux, forums grand public, communications marketing et communiqués de presse d’éditeurs commerciaux.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Equations Booléennes & Opérateurs de Recherche Avancée (Google Dorks)',
      html: [
        '<p>Pour isoler les informations à forte valeur ajoutée sans être submergé par des millions de résultats commerciaux non pertinents, le veilleur construit des <strong>équations booléennes strictes</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Opérateurs Logiques Fondamentaux</h4>',
        '    <ul>',
        '      <li><code>"expression exacte"</code> : Force la présence des mots dans l’ordre exact sans variation (ex: <code>"zero trust architecture"</code>).</li>',
        '      <li><code>OR</code> : Opérateur d’union logique permettant d’inclure des synonymes techniques (ex: <code>(qubit OR "quantum computer")</code>).</li>',
        '      <li><code>-</code> (NOT) : Exclusion stricte de termes parasites ou polysémiques (ex: <code>"rag" -chiffon -textile</code>).</li>',
        '      <li>Parenthèses <code>( ... )</code> : Priorisation des groupements logiques dans les équations complexes.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Opérateurs Structurels (Google Dorks)</h4>',
        '    <pre><code>"ebpf" (xdp OR kernel) -gaming site:kernel.org filetype:pdf</code></pre>',
        '    <ul>',
        '      <li><code>site:</code> : Restreint la recherche à un nom de domaine ou extension spécifique (ex: <code>site:nist.gov</code>, <code>site:edu</code>).</li>',
        '      <li><code>filetype:</code> ou <code>ext:</code> : Cible un format technique de fichier (<code>pdf</code> pour les livres blancs et thèses, <code>json</code>, <code>csv</code> pour les jeux de données).</li>',
        '      <li><code>inurl:</code> / <code>allinurl:</code> : Filtre les pages dont l’adresse web contient le mot-clé (ex: <code>inurl:cve-2025</code>).</li>',
        '      <li><code>intitle:</code> : Exige que le mot apparaisse dans la balise HTML titre du document.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Qualification des Sources & Détection Mathématique des Signaux Faibles',
      html: [
        '<p>Deux défis méthodologiques majeurs conditionnent la réussite du dispositif : garantir l’intégrité des informations et capter les signaux d’alerte précoces :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Grille Multicritère de Fiabilité d’une Source</h4>',
        '    <p>Une source professionnelle est notée sur 100 via cinq axes pondérés :</p>',
        '    <ul>',
        '      <li><strong>Autorité (30 %) :</strong> Légitimité académique, scientifique ou institutionnelle de l’émetteur.</li>',
        '      <li><strong>Neutralité (25 %) :</strong> Absence de parti-pris commercial ou d’article sponsorisé masqué.</li>',
        '      <li><strong>Traçabilité (20 %) :</strong> Liens explicites vers les données primaires, preuves et brevets.</li>',
        '      <li><strong>Croisement (15 %) :</strong> Confirmation indépendante des faits par d’autres tiers fiables.</li>',
        '      <li><strong>Fraîcheur (10 %) :</strong> Date récente de publication et actualisation régulière du contenu.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Signaux Faibles vs Tendances Lourdes (Théorie d’Ansoff)</h4>',
        '    <p>Théorisé par Igor Ansoff, un <strong>signal faible</strong> est une information précurseur isolée :</p>',
        '    <ul>',
        '      <li><strong>Signal faible :</strong> Faible volume d’occurrences absolu ($S < 20$) mais accélération relative foudroyante ($+100$ % à $+200$ % sur le dernier trimestre). Exemple : un concept algorithmique cité dans 3 thèses en 2024.</li>',
        '      <li><strong>Tendance lourde :</strong> Fort volume continu ($S \\ge 50$) en croissance régulière (ex: conteneurisation Docker).</li>',
        '      <li><strong>Bruit de fond :</strong> Occurrences erratiques très faibles sans aucune accélération temporelle.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('danger', '<strong>Le biais de confirmation en veille technologique :</strong> Un veilleur a naturellement tendance à ne collecter que les informations qui confirment ses croyances préalables ou ses préférences technologiques (ex: préférer son langage favori). Pour neutraliser ce biais cognitif, la grille de fiabilité doit être appliquée de manière stricte et les sources contradictoires doivent être explicitement intégrées au plan de sourcing.')
      ].join('\n')
    }
  ],
  method: [
    '1. Rédiger une fiche de cadrage précisant le périmètre, les questions stratégiques et les livrables attendus.',
    '2. Dresser la cartographie des sources primaires (brevets, forges, publications académiques, agences officielles).',
    '3. Construire des requêtes booléennes combinant guillemets stricts, inclusions OR et exclusions NOT avec opérateurs dorking.',
    '4. Évaluer chaque nouvelle source sur la grille multicritère des 5 axes (autorité, neutralité, traçabilité, croisement, fraîcheur).',
    '5. Suivre l’évolution temporelle des fréquences d’apparition lexicale pour distinguer signaux faibles et bruit de fond.',
    '6. Intégrer une boucle de rétroaction avec les destinataires pour ajuster le ciblage au fil des itérations du cycle.'
  ],
  summary: [
    'Le cycle de veille structure l’information en 5 étapes : cadrage, sourcing, collecte, traitement et diffusion/feedback.',
    'Les sources primaires (brevets, spécifications, forges, agences étatiques) offrent la valeur d’information la plus fiable.',
    'Les requêtes booléennes dorking filtrent précisément les formats (filetype:pdf) et domaines institutionnels (site:).',
    'La grille de crédibilité pondère autorité, neutralité, traçabilité, croisement des faits et fraîcheur temporelle.',
    'Un signal faible se caractérise par un faible volume d’occurrence couplé à une forte dérivée d’accélération relative.',
    'La boucle de feedback permet au veilleur d’adapter son ciblage en fonction de la valeur perçue par les décideurs.'
  ],
  checklist: [
    'Le besoin de veille a-t-il été validé auprès des décideurs avant d’engager la collecte ?',
    'La recherche s’appuie-t-elle sur des sources primaires identifiées et vérifiées ?',
    'Les équations booléennes utilisent-elles des exclusions de termes parasites pour éviter la pollution lexicale ?',
    'La source d’information a-t-elle obtenu un score supérieur à 65/100 sur la grille multicritère ?',
    'L’accélération temporelle des termes nouveaux a-t-elle été analysée pour détecter les signaux faibles ?',
    'Le livrable de veille est-il transmis avec une synthèse claire et des recommandations actionnables ?'
  ],
  notions: [
    'Cycle du renseignement (Intelligence Cycle)',
    'Sources primaires, secondaires et tertiaires',
    'Équations booléennes (AND, OR, NOT)',
    'Google Dorks (site:, filetype:, inurl:, intitle:)',
    'Grille d’évaluation multicritère de crédibilité',
    'Biais de confirmation & esprit critique',
    'Signaux faibles (Théorie d’Igor Ansoff)',
    'Dérivée d’accélération lexicale & détection de ruptures'
  ],
  pitfalls: [
    'Lancer la collecte d’information sans cadrage initial ni définition des attentes des décideurs.',
    'Se fier aveuglément à des articles de blogs sponsorisés sans remonter à la source primaire ou au brevet.',
    'Négliger les opérateurs d’exclusion dans les requêtes de recherche et crouler sous des résultats hors sujet.',
    'Confondre un buzz médiatique passager (bruit de fond bruyant) avec un signal faible technologique véritablement annonciateur de rupture.'
  ],
  questions: [
    {
      stem: 'Quelle est la première étape indispensable du cycle de veille et du renseignement stratégique ?',
      opts: [
        'La rédaction du bulletin final',
        'L’expression des besoins et le cadrage des objectifs',
        'L’achat d’un logiciel de scraping',
        'Le tri des flux RSS'
      ],
      correct: 1,
      exp: 'Sans cadrage initial des besoins et des objectifs décisionnels, la veille manque de direction et produit du bruit.'
    },
    {
      stem: 'Parmi les suivantes, laquelle constitue une source primaire de haute fiabilité pour la veille technologique ?',
      opts: [
        'Un fil de discussion anonyme sur Reddit',
        'Une publication de brevet officiel sur la base Espacenet ou WIPO',
        'Un communiqué de presse marketing sponsorisé',
        'Un résumé généré par un influenceur sur TikTok'
      ],
      correct: 1,
      exp: 'Les bases de brevets d’organismes officiels (Espacenet, WIPO, INPI) représentent des sources primaires vérifiables et juridiquement opposables.'
    },
    {
      stem: 'Quel opérateur Google Dorks permet de restreindre la recherche documentaire aux seuls fichiers PDF d’ingénierie ?',
      opts: [
        'type=pdf',
        'filetype:pdf',
        'download:pdf',
        'format=doc'
      ],
      correct: 1,
      exp: 'L’opérateur filetype:pdf (ou ext:pdf) filtre directement l’indexation sur les documents au format PDF.'
    },
    {
      stem: 'Dans la grille multicritère de qualification d’une source, quel axe vérifie l’accès aux données brutes et aux dépôts de code ?',
      opts: [
        'La fraîcheur',
        'La traçabilité',
        'L’esthétique',
        'La rentabilité'
      ],
      correct: 1,
      exp: 'La traçabilité évalue la présence de références bibliographiques précises, de liens vers les sources primaires et de code source reproductible.'
    },
    {
      stem: 'Comment se caractérise mathématiquement un signal faible selon la théorie d’Ansoff ?',
      opts: [
        'Un volume massif constant depuis 10 ans',
        'Un volume total d’occurrences faible mais une accélération de croissance exponentielle récente',
        'Une absence totale de mentions écrites',
        'Un score de bruit maximal sans aucune logique'
      ],
      correct: 1,
      exp: 'Un signal faible se caractérise par une faible fréquence absolue d’apparition combinée à un taux d’accélération très fort entre périodes.'
    },
    {
      stem: 'À quoi sert la dernière étape de rétroaction (Feedback) dans le cycle du renseignement ?',
      opts: [
        'À supprimer les fichiers de la base',
        'À mesurer l’utilité perçue par les décideurs pour affiner le ciblage et réajuster les sources du cycle suivant',
        'À éteindre les serveurs la nuit',
        'À envoyer des factures aux clients'
      ],
      correct: 1,
      exp: 'La boucle de feedback permet de vérifier si les livrables répondent aux attentes et d’ajuster les axes de recherche pour les itérations futures.'
    },
    {
      stem: 'Que produit la requête booléenne "intelligence artificielle" -marketing site:arxiv.org ?',
      opts: [
        'Des articles sur le marketing de l’IA',
        'Des publications académiques sur l’IA sur arxiv.org en excluant le mot marketing',
        'Une erreur de syntaxe',
        'L’ouverture de l’application Arxiv'
      ],
      correct: 1,
      exp: 'La requête recherche l’expression exacte sur le site universitaire arxiv.org tout en excluant expressément le terme « marketing ».'
    },
    {
      stem: 'Quel biais cognitif pousse un ingénieur à ignorer les alertes sur une technologie qu’il n’apprécie pas ?',
      opts: [
        'Le biais de récence',
        'Le biais de confirmation',
        'L’effet halo',
        'L’illusion d’ancrage'
      ],
      correct: 1,
      exp: 'Le biais de confirmation incite à ne retenir que les informations qui confortent nos hypothèses préexistantes tout en rejetant les données contradictoires.'
    }
  ],
  flashcards: [
    {
      q: 'Quelles sont les 5 étapes du cycle de veille ?',
      a: '1. Cadrage des besoins, 2. Sourcing, 3. Collecte, 4. Traitement & analyse, 5. Diffusion & feedback.'
    },
    {
      q: 'Qu’est-ce qu’une source primaire en veille IT ?',
      a: 'Une source directe et brute non réinterprétée : brevets, RFC, forges logicielles, avis CERT/ANSSI, articles scientifiques.'
    },
    {
      q: 'À quoi sert l’opérateur dorking site: dans une recherche documentaire ?',
      a: 'À limiter la recherche à un nom de domaine ou une extension ciblée (ex: site:nist.gov).'
    },
    {
      q: 'Quels sont les cinq critères de la grille de fiabilité d’une source ?',
      a: 'Autorité (30%), Neutralité (25%), Traçabilité (20%), Croisement (15%) et Fraîcheur (10%).'
    },
    {
      q: 'Quelle est la différence entre un signal faible et une tendance lourde ?',
      a: 'Le signal faible a un faible volume mais une forte accélération récente ; la tendance lourde a un volume d’occurrences déjà très élevé.'
    },
    {
      q: 'Pourquoi la boucle de feedback est-elle indispensable en veille ?',
      a: 'Pour mesurer l’actionnabilité des livrables et adapter le dispositif aux besoins réels des décideurs.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à formuler des requêtes booléennes ou méconnaissance des étapes du cycle de veille.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise du dorking avancé, qualification rigoureuse des sources et formalisation de plans de sourcing.'
    },
    {
      cls: 'high',
      text: 'Architecture complète du cycle du renseignement : détection statistique des signaux faibles, maîtrise des biais cognitifs et gouvernance de veille.'
    }
  ]
};
