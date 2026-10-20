/**
 * Chapitre 1 du cours « Étude Quantitative & Qualitative B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Fondements Épistémologiques &amp; Cadrage Méthodologique de Recherche',
  short: 'Fondements Épistémologiques &amp; Cadrage',
  toc: 'Paradigmes positiviste et interprétativiste, raisonnements déductif et inductif, univers d’enquête, terrain d’étude et triangulation méthodologique de Denzin.',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Lorsqu’un ingénieur de Bachelor 3 ou un chef de projet IT entreprend un mémoire professionnel, un audit de maturité technologique ou une étude d’impact organisationnel, la tentation immédiate est de plonger tête baissée dans la collecte de données brutes sans avoir explicité sa posture méthodologique. Le résultat est universellement sanctionné par les jurys et comités de direction : confusion entre corrélation et causalité, hypothèses non testables, conclusions subjectives invérifiables et incapacité à justifier le choix des instruments de mesure. La validité scientifique d’une recherche dépend en premier lieu de sa cohérence épistémologique : savoir si l’on cherche à mesurer objectivement des faits observables indépendants du chercheur (paradigme positiviste) ou à comprendre le sens vécu attribué par les acteurs humains (paradigme interprétativiste). Maîtriser ce cadrage est la clé de voûte de toute recherche crédible.',
  objectives: [
    'distinguer avec rigueur les paradigmes épistémologiques positiviste, interprétativiste et constructiviste ;',
    'différencier les modes de raisonnement scientifique : déductif (test d’hypothèses), inductif (émergence de théories) et abductif ;',
    'définir précisément les piliers du cadrage : terrain d’étude, environnement de recherche, univers d’enquête et population cible ;',
    'maîtriser la complémentarité des méthodes mixtes (Mixed Methods Research) et la triangulation de Denzin ;',
    'formuler une problématique de recherche robuste et des questions opérationnelles dénuées de biais préalables ;',
    'développer en Python 3 des classificateurs de postures de recherche, des auditeurs de cadre conceptuel et des évaluateurs de triangulation.'
  ],
  sections: [
    {
      title: 'Les Deux Grands Paradigmes Épistémologiques en Sciences &amp; IT',
      html: [
        '<p>L’épistémologie est l’étude de la constitution des connaissances valables. Toute démarche de recherche repose sur des postulats philosophiques fondamentaux concernant la nature de la réalité (ontologie) et la relation entre le chercheur et ce qu’il observe (épistémologie).</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Le Paradigme Positiviste (Quantitatif)</h4>',
        '    <ul>',
        '      <li><strong>Postulat ontologique :</strong> La réalité existe indépendamment de l’observateur. Elle est objective, stable et régie par des lois universelles.</li>',
        '      <li><strong>Démarche déductive :</strong> Partir de théories existantes pour formuler des hypothèses précises ($H_1, H_0$) testées sur des données chiffrées.</li>',
        '      <li><strong>Rôle du chercheur :</strong> Observateur neutre et distant, n’influençant pas les phénomènes mesurés.</li>',
        '      <li><strong>Objectif :</strong> Expliquer les causes, mesurer les grandeurs et généraliser statistiquement les résultats.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le Paradigme Interprétativiste / Phénoménologique (Qualitatif)</h4>',
        '    <ul>',
        '      <li><strong>Postulat ontologique :</strong> La réalité sociale et organisationnelle est construite par les acteurs humains et leur subjectivité.</li>',
        '      <li><strong>Démarche inductive :</strong> Partir du terrain et des discours pour faire émerger des catégories et construire de nouveaux modèles.</li>',
        '      <li><strong>Rôle du chercheur :</strong> Immergé dans le contexte, cherchant à saisir la perspective interne des participants (empathie cognitive).</li>',
        '      <li><strong>Objectif :</strong> Comprendre le sens (« Pourquoi et comment »), explorer la complexité et éclairer les motivations profondes.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Modes de Raisonnement : Déduction, Induction &amp; Abduction',
      html: [
        '<p>Le cheminement intellectuel reliant la théorie et les données empiriques conditionne la structure même du mémoire ou de l’étude :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>La Déduction (Top-Down)</h4>',
        '    <p>Règle générale $\\rightarrow$ Cas particulier $\\rightarrow$ Résultat. Exemple en informatique : la théorie prédit que l’automatisation CI/CD réduit le temps de mise en production (Lead Time) ; on mesure le Lead Time avant et après pour confirmer l’hypothèse.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>L’Induction (Bottom-Up)</h4>',
        '    <p>Observations spécifiques $\\rightarrow$ Détection de régularités $\\rightarrow$ Théorie émergente. Exemple : on conduit 15 entretiens avec des RSSI pour découvrir comment ils perçoivent les risques liés à l’IA générative dans leurs hôpitaux.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>L’Abduction (Allers-retours)</h4>',
        '    <p>Constat d’un fait surprenant $\\rightarrow$ Émission de l’hypothèse la plus plausible $\\rightarrow$ Vérification empirique. Fondement des méthodes mixtes et du diagnostic d’incidents complexes en systèmes et réseaux.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Définition Rigoureuse des Concepts Clés de l’Enquête',
      html: [
        '<p>Le support de cours officiel et le guide de rédaction du mémoire définissent avec une précision cardinale les termes de l’environnement de recherche :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Terrain d’Étude &amp; Environnement</h4>',
        '    <p>Le <strong>terrain d’étude</strong> est le milieu physique ou virtuel dans lequel évoluent les sujets et phénomènes étudiés (ex. les banques de détail françaises ou les équipes DevOps d’éditeurs SaaS). L’<strong>environnement de recherche</strong> intègre le cadre institutionnel, technologique et réglementaire (RGPD, NIS 2).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Population Cible, Base &amp; Unité de Sondage</h4>',
        '    <p>La <strong>population cible</strong> (ou univers d’enquête) est l’ensemble exhaustif des individus ou entités satisfaisant aux critères de l’étude. La <strong>base de sondage</strong> est la liste concrète permettant de les joindre (annuaire d’entreprise, registre professionnel). L’<strong>unité d’échantillonnage</strong> est l’entité unitaire enquêtée (l’administrateur système ou le serveur physique).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'La Triangulation Méthodologique (Norman Denzin)',
      html: [
        '<p>Pour prémunir une étude de tout biais mono-méthode, le sociologue Norman Denzin a formalisé le concept de <strong>triangulation</strong>, consistant à observer un même objet de recherche sous plusieurs angles indépendants :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les 4 Piliers de la Triangulation</h4>',
        '    <ul>',
        '      <li><strong>Triangulation des données :</strong> Recueillir des données auprès de populations différentes, à des moments distincts et dans des contextes variés.</li>',
        '      <li><strong>Triangulation des chercheurs :</strong> Faire analyser les mêmes verbatim ou indicateurs par au moins deux évaluateurs indépendants.</li>',
        '      <li><strong>Triangulation théorique :</strong> Interpréter les résultats à travers au moins deux grilles de lecture conceptuelles concurrentes.</li>',
        '      <li><strong>Triangulation méthodologique :</strong> Combiner instruments quantitatifs (questionnaire chiffré) et qualitatifs (entretiens de fond).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Designs Mixtes Séquentiels &amp; Concurrents</h4>',
        '    <p><strong>Exploratoire séquentiel (Quali $\\rightarrow$ Quanti) :</strong> Entretiens exploratoires pour faire émerger les dimensions clés du problème, suivis d’un sondage quantitatif à large échelle pour mesurer leur prévalence statistique.</p>',
        '    <p><strong>Explicatif séquentiel (Quanti $\\rightarrow$ Quali) :</strong> Sondage statistique révélant des anomalies ou corrélations inattendues, suivi d’entretiens approfondis pour comprendre le « pourquoi » des chiffres.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthodologie de Cadrage d’un Projet d’Étude IT',
  method: [
    '1. Formuler la question de départ : Poser une question claire, précise, univoque et ouverte (évitant les questions orientées ou dichotomiques oui/non).',
    '2. Expliciter la posture épistémologique : Déclarer formellement si la démarche se positionne en paradigme positiviste (vérification de lois), interprétativiste (compréhension du sens) ou pragmatique mixte.',
    '3. Circonscrire le terrain et la population : Délimiter précisément la population cible (critères d’inclusion et d’exclusion) et identifier la base de sondage concrète.',
    '4. Définir le design méthodologique : Choisir entre design mono-méthode, exploratoire séquentiel (Quali puis Quanti) ou explicatif séquentiel (Quanti puis Quali).',
    '5. Formaliser la triangulation : Identifier au moins deux sources de données distinctes ou deux techniques de collecte complémentaires pour sécuriser la validité empirique.',
    '6. Rédiger la note de cadrage : Synthétiser ces dimensions dans le chapitre méthodologique du mémoire avant toute phase de collecte sur le terrain.'
  ],
  summary: [
    'La recherche en ingénierie informatique s’articule autour de deux grands paradigmes : positiviste (quantitatif, déductif, mesure) et interprétativiste (qualitatif, inductif, compréhension).',
    'La déduction part des théories pour tester des hypothèses, tandis que l’induction part des observations de terrain pour construire de nouveaux concepts.',
    'La population cible désigne l’ensemble des entités concernées par l’enquête ; la base de sondage est le répertoire concret permettant de les contacter.',
    'La triangulation de Denzin (croisement de données, chercheurs, théories et méthodes) est la condition sine qua non pour neutraliser les biais de subjectivité.',
    'Les méthodes mixtes séquentielles combinent la force de généralisation du quantitatif et la profondeur explicative du qualitatif.'
  ],
  checklist: [
    'Le paradigme épistémologique adopté est-il explicitement déclaré et justifié dans l’introduction méthodologique ?',
    'Le raisonnement (déductif, inductif ou abductif) est-il cohérent avec la formulation de la problématique ?',
    'La population cible est-elle rigoureusement bornée par des critères d’inclusion et d’exclusion clairs ?',
    'La base de sondage et l’unité d’échantillonnage sont-elles clairement identifiées sans ambiguïté ?',
    'Une stratégie de triangulation méthodologique a-t-elle été planifiée pour croiser les sources d’information ?',
    'Les questions de recherche évitent-elles tout présupposé ou prise de position idéologique préalable ?'
  ],
  notions: [
    'Paradigme positiviste quantitatif',
    'Paradigme interprétativiste qualitatif',
    'Modes de raisonnement déductif et inductif',
    'Démarche abductive en ingénierie IT',
    'Population cible et univers d’enquête',
    'Base de sondage et unité d’échantillonnage',
    'Triangulation méthodologique de Denzin',
    'Recherche à méthodes mixtes (Mixed Methods)'
  ],
  pitfalls: [
    'Débuter la collecte de données sur le terrain sans avoir préalablement défini les critères stricts de la population cible.',
    'Prétendre généraliser statistiquement les résultats d’une étude qualitative menée sur seulement 6 personnes.',
    'Confondre la base de sondage (la liste concrète de contacts) avec la population cible (l’univers théorique).',
    'Utiliser une seule méthode et un seul chercheur en affirmant avoir démontré une vérité absolue sans aucune triangulation.'
  ],
  questions: [
    {
      stem: 'Quel postulat caractérise fondamentalement le paradigme épistémologique positiviste par rapport à l’interprétativisme ?',
      opts: [
        'La réalité est une illusion totale impossible à observer scientifiquement',
        'La réalité existe indépendamment de l’observateur et peut être mesurée objectivement sous forme de données chiffrées régies par des lois',
        'Le chercheur doit obligatoirement modifier le comportement des sujets observés',
        'Toutes les théories scientifiques doivent être rédigées sous forme de poèmes'
      ],
      correct: 1,
      exp: 'Le positivisme postule une réalité objective indépendante du chercheur, accessible par la mesure quantitative neutre et la vérification d’hypothèses déductives.'
    },
    {
      stem: 'Dans une démarche scientifique de recherche, qu’est-ce qu’un raisonnement « déductif » ?',
      opts: [
        'Partir d’observations individuelles isolées pour inventer une théorie générale nouvelle',
        'Partir de théories et règles existantes pour formuler des hypothèses testées empiriquement sur des données concrètes',
        'Supprimer la moitié des données d’enquête pour gagner du temps',
        'Traduire un texte de recherche en plusieurs langues étrangères'
      ],
      correct: 1,
      exp: 'La déduction opère du général (théorie) vers le particulier (test d’hypothèses chiffrées sur le terrain).'
    },
    {
      stem: 'Quelle est la différence méthodologique exacte entre la « population cible » et la « base de sondage » ?',
      opts: [
        'Il n’y a aucune différence, ce sont deux synonymes parfaits',
        'La population cible est l’ensemble théorique visé par l’étude (ex: tous les DSI de France), tandis que la base de sondage est la liste concrète permettant de les joindre (ex: annuaire Syntec)',
        'La base de sondage est un bâtiment physique et la population cible un logiciel',
        'La population cible concerne uniquement les serveurs informatiques'
      ],
      correct: 1,
      exp: 'La population cible est l’univers d’enquête défini conceptuellement ; la base de sondage est le support d’accès réel (liste, annuaire, base de données) d’où sera extrait l’échantillon.'
    },
    {
      stem: 'Selon Norman Denzin, en quoi consiste la « triangulation méthodologique » ?',
      opts: [
        'À dessiner des triangles sur tous les graphiques du rapport',
        'À croiser des instruments de collecte quantitatifs et qualitatifs pour observer un même phénomène et en neutraliser les biais réciproques',
        'À faire payer trois fois le prix de l’enquête au client',
        'À limiter obligatoirement l’enquête à trois questions'
      ],
      correct: 1,
      exp: 'La triangulation méthodologique combine approches quantitative et qualitative pour vérifier la convergence des résultats et sécuriser leur robustesse.'
    },
    {
      stem: 'Dans une recherche en méthodes mixtes, quel est le déroulement d’un design « exploratoire séquentiel » ?',
      opts: [
        'On réalise d’abord une phase qualitative (entretiens) pour explorer le problème, puis une phase quantitative (sondage) pour mesurer et généraliser',
        'On réalise uniquement des sondages téléphoniques sans jamais rencontrer personne',
        'On supprime toutes les données numériques après les avoir collectées',
        'On commence par rédiger la conclusion avant d’avoir posé la moindre question'
      ],
      correct: 0,
      exp: 'Le design exploratoire séquentiel débute par le qualitatif pour comprendre le terrain et concevoir les variables, puis enchaîne sur le quantitatif pour valider à large échelle.'
    },
    {
      stem: 'Pourquoi une recherche purement inductive ne peut-elle pas prétendre tester formellement des hypothèses statistiques préétablies ?',
      opts: [
        'Parce que les ordinateurs ne savent pas exécuter d’algorithmes inductifs',
        'Parce que la démarche inductive part des observations de terrain pour faire émerger des théories et non pour valider un modèle théorique préexistant',
        'Parce que la loi interdit l’induction dans les universités',
        'Parce que les statistiques sont réservées aux sciences de la terre'
      ],
      correct: 1,
      exp: 'Tester formellement des hypothèses relève de la logique déductive (Top-Down). L’induction (Bottom-Up) produit des hypothèses et des concepts nouveaux à partir du terrain.'
    },
    {
      stem: 'Parmi les situations suivantes, laquelle illustre une « triangulation des chercheurs » ?',
      opts: [
        'Un même chercheur relit son propre texte trois fois dans la même journée',
        'Deux analystes indépendants codent le même corpus de verbatim d’entretiens avec une grille d’analyse pour comparer leurs résultats',
        'Une équipe de trois personnes partage le même mot de passe d’ordinateur',
        'Un chercheur cite trois fois son propre nom dans la bibliographie'
      ],
      correct: 1,
      exp: 'La triangulation des chercheurs implique l’intervention de plusieurs observateurs indépendants pour analyser les mêmes données et éliminer les biais d’interprétation individuels.'
    },
    {
      stem: 'Qu’est-ce qu’une « unité d’échantillonnage » dans une enquête portant sur la cybersécurité des centres hospitaliers ?',
      opts: [
        'Le réseau internet mondial dans sa totalité',
        'L’élément individuel unitaire sélectionné pour être interrogé ou mesuré (ex: un centre hospitalier ou son Responsable de la Sécurité des SI)',
        'L’unité centrale de traitement (processeur) du serveur web',
        'Le câble réseau RJ45 reliant deux commutateurs'
      ],
      correct: 1,
      exp: 'L’unité d’échantillonnage est l’entité de base sur laquelle portent le tirage au sort et la collecte de données (l’hôpital ou le RSSI selon le niveau d’analyse).'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre positivisme et interprétativisme ?',
      a: 'Le positivisme cherche à mesurer objectivement des faits généraux (quantitatif, déductif), l’interprétativisme cherche à comprendre le sens vécu par les acteurs (qualitatif, inductif).'
    },
    {
      q: 'Qu’est-ce qu’un raisonnement déductif ?',
      a: 'Une démarche partant de la théorie et de lois générales pour tester des hypothèses empiriques sur des données observables (Top-Down).'
    },
    {
      q: 'Qu’est-ce qu’un raisonnement inductif ?',
      a: 'Une démarche partant des faits et observations du terrain pour faire émerger des régularités, concepts et modèles théoriques (Bottom-Up).'
    },
    {
      q: 'Quelle est la différence entre population cible et base de sondage ?',
      a: 'La population cible est l’ensemble conceptuel exhaustif visé par l’étude ; la base de sondage est le répertoire concret permettant d’en contacter les membres.'
    },
    {
      q: 'Quels sont les 4 axes de triangulation selon Denzin ?',
      a: 'Triangulation des données (sources multiples), des chercheurs (plusieurs évaluateurs), des théories (modèles concurrents) et méthodologique (mixte quanti/quali).'
    },
    {
      q: 'En quoi consiste un design exploratoire séquentiel en méthodes mixtes ?',
      a: 'Mener d’abord une phase qualitative (entretiens) pour défricher le sujet, puis une phase quantitative (sondage) pour mesurer et généraliser.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la distinction positivisme/interprétativisme, la déduction vs induction et les concepts de population cible et base de sondage.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez les 4 axes de triangulation de Denzin et les designs mixtes séquentiels.'
    },
    {
      cls: 'high',
      text: '8/8 : Remarquable ! Vous maîtrisez les fondements épistémologiques et le cadrage méthodologique d’une recherche de niveau Bachelor 3.'
    }
  ]
};
