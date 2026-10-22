/**
 * Chapitre 1 du cours « UML B2 » — Panorama d’UML 2.5, Métamodèle &amp; Taxonomie des Diagrammes.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Panorama d’UML 2.5, Métamodèle &amp; Taxonomie des Diagrammes',
  short: 'Panorama &amp; Taxonomie',
  toc: 'Histoire et standardisation par l’OMG, métamodèle à 4 niveaux (MOF M0 à M3), séparation structurelle vs comportementale, 14 diagrammes officiels, stéréotypes d’architecture ECB et contraintes formelles OCL.',
  time: '≈ 2 h 45 de travail',
  free: true,

  situation:
    'Une équipe d’ingénieurs logiciels conçoit la refonte d’une plateforme bancaire distribuée. ' +
    'Faute d’un langage visuel commun et rigoureux, les développeurs, architectes et analystes métier ' +
    'produisent des schémas contradictoires, mélangeant détails de base de données, cinématiques d’écrans et architectures matérielles. ' +
    'Pour fédérer la communication et formaliser les contrats d’interface, l’architecte impose l’adoption formelle du standard OMG UML 2.5. ' +
    'Ce premier module pose les fondations indispensables : classifier les 14 diagrammes, maîtriser le métamodèle MOF, ' +
    'structurer les responsabilités selon le patron Entity-Control-Boundary (ECB) et exprimer des contraintes d’intégrité sans ambiguïté via OCL.',

  objectives: [
    'comprendre l’histoire d’UML, son rôle dans le cycle de vie logiciel et les apports de la spécification OMG UML 2.5 ;',
    'distinguer rigoureusement les 7 diagrammes structurels et les 7 diagrammes comportementaux ;',
    'comprendre l’architecture en 4 couches de métamodélisation MOF (M0 : instance, M1 : modèle, M2 : métamodèle, M3 : méta-métamodèle) ;',
    'appliquer le profil d’analyse ECB (Entity, Control, Boundary) pour séparer les responsabilités logicielles ;',
    'formuler et valider des invariants et pré/post-conditions avec le langage formel OCL (Object Constraint Language) ;',
    'choisir le bon diagramme pour chaque phase du cycle de développement logiciel (exigences, conception préliminaire, détaillée, déploiement).'
  ],

  sections: [
    {
      title: 'Genèse d’UML et Taxonomie des 14 Diagrammes UML 2.5',
      html: [
        '<p>Créé à la fin des années 1990 par les « trois amigos » (Grady Booch, James Rumbaugh et Ivar Jacobson), ' +
        'le langage unifié de modélisation (<strong>Unified Modeling Language — UML</strong>) a été standardisé par l’<strong>OMG (Object Management Group)</strong>. ' +
        'Dans sa version 2.5, UML ne constitue pas une méthode de développement (comme Scrum ou UP), mais une <em>notation visuelle et un métamodèle standardisé</em>.</p>',

        '<p>La spécification UML 2.5 officialise exactement <strong>14 diagrammes</strong>, répartis en deux grandes familles complémentaires :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Diagrammes Structurels (7)</h4>',
        '    <p>Ils capturent l’aspect statique du système, ses composants physiques et ses types de données :</p>',
        '    <ul>',
        '      <li><strong>Classes :</strong> Modélisation des concepts métier, attributs, opérations et relations.</li>',
        '      <li><strong>Objets :</strong> Cliché instantané (snapshot) d’instances à un instant <em>t</em>.</li>',
        '      <li><strong>Composants :</strong> Modules logiciels autonomes et interfaces requises/fournies.</li>',
        '      <li><strong>Déploiement :</strong> Topologie physique des nœuds matériels et des artefacts exécutables.</li>',
        '      <li><strong>Paquetages :</strong> Organisation hiérarchique en sous-systèmes et espaces de noms.</li>',
        '      <li><strong>Structures composites :</strong> Décomposition interne complexe d’un classificateur.</li>',
        '      <li><strong>Profils :</strong> Extensions personnalisées (stéréotypes, tagged values, contraintes).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Diagrammes Comportementaux (7)</h4>',
        '    <p>Ils décrivent la dynamique, les flux d’exécution et les interactions temporelles :</p>',
        '    <ul>',
        '      <li><strong>Cas d’utilisation (Use Cases) :</strong> Besoins fonctionnels et interactions avec les acteurs.</li>',
        '      <li><strong>Activités :</strong> Flux de contrôle, processus métier séquentiels et parallèles.</li>',
        '      <li><strong>États-transitions (State Machines) :</strong> Cycle de vie événementiel d’un objet réactif.</li>',
        '      <li><strong>Séquence :</strong> Chronologie des messages échangés entre lignes de vie.</li>',
        '      <li><strong>Communication :</strong> Interactions focalisées sur les liens structurels des objets.</li>',
        '      <li><strong>Aperçu des interactions (Interaction Overview) :</strong> Fusion d’activités et de séquences.</li>',
        '      <li><strong>Temps (Timing) :</strong> Évolution des états d’un objet en fonction de contraintes temporelles strictes.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Métamodélisation MOF et Hiérarchie à 4 Niveaux',
      html: [
        '<p>Pour garantir une sémantique formelle et l’interopérabilité des outils CASE (Computer-Aided Software Engineering), ' +
        'l’OMG a défini l’architecture en couches <strong>MOF (Meta-Object Facility)</strong> :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Couche</th>',
        '      <th>Désignation</th>',
        '      <th>Description &amp; Exemple</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>M3</strong></td>',
        '      <td>Méta-métamodèle</td>',
        '      <td>Langage MOF définissant les concepts fondamentaux permettant de construire des métamodèles (ex: <code>MOF::Class</code>).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>M2</strong></td>',
        '      <td>Métamodèle</td>',
        '      <td>Le métamodèle UML lui-même : définit ce qu’est une <code>Class</code>, une <code>Association</code>, un <code>State</code>.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>M1</strong></td>',
        '      <td>Modèle</td>',
        '      <td>Le modèle de votre application conçu par l’architecte (ex: classe <code>CompteBancaire</code>, classe <code>Client</code>).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>M0</strong></td>',
        '      <td>Données / Réalité</td>',
        '      <td>Les instances réelles en mémoire ou en base lors de l’exécution (ex: le compte <code>#FR761234</code> de M. Dupont).</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Stéréotypes d’Architecture ECB et Langage Formel OCL',
      html: [
        '<p>Pour structurer l’analyse orientée objet, le patron <strong>ECB (Entity - Control - Boundary)</strong> formalisé par Ivar Jacobson ' +
        'associe des stéréotypes aux rôles fondamentaux de la conception logicielle :</p>',
        '<ul>',
        '  <li><strong>&laquo;entity&raquo; (Entité) :</strong> Encapsule les données métier durables et leurs règles de persistance (ex: <code>Compte</code>, <code>Facture</code>). Symbole : cercle avec trait à la base.</li>',
        '  <li><strong>&laquo;control&raquo; (Contrôle) :</strong> Encapsule la cinématique métier, l’orchestration et les algorithmes de décision (ex: <code>GestionnaireVirement</code>). Symbole : cercle avec flèche circulaire au sommet.</li>',
        '  <li><strong>&laquo;boundary&raquo; (Frontière) :</strong> Gère l’interface avec les acteurs externes, IHM, API web ou capteurs (ex: <code>FormulaireConnexion</code>, <code>AdaptateurGuichet</code>). Symbole : cercle avec trait vertical et barre latérale gauche.</li>',
        '</ul>',

        '<p>En complément des diagrammes, le langage <strong>OCL (Object Constraint Language)</strong> permet d’exprimer ' +
        'des contraintes formelles, sans effet de bord, impossibles à représenter uniquement par des symboles graphiques :</p>',
        '<ul>',
        '  <li><strong>Invariants (<code>inv:</code>) :</strong> Condition impérative qui doit toujours être vraie pour toute instance de la classe (ex: <code>context Compte inv: solde &gt;= decouvertAutorise</code>).</li>',
        '  <li><strong>Pré-conditions (<code>pre:</code>) :</strong> Condition requise avant l’exécution d’une opération (ex: <code>context Compte::retirer(montant) pre: montant &gt; 0</code>).</li>',
        '  <li><strong>Post-conditions (<code>post:</code>) :</strong> Condition garantie après achèvement de l’opération (ex: <code>post: solde = solde@pre - montant</code>).</li>',
        '</ul>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Choix et de Cadrage des Diagrammes UML',
  method: [
    'Étape 1 — Identifier l’objectif de modélisation : Distinguer si le besoin relève de la capture des exigences, de la conception architecturale, ou du déploiement physique.',
    'Étape 2 — Choisir la dimension (Statique vs Dynamique) : Utiliser un diagramme structurel (Classes, Composants) pour les structures et types ; un diagramme comportemental (Séquence, Activités) pour la cinématique.',
    'Étape 3 — Adapter le niveau d’abstraction : En phase d’analyse préliminaire, appliquer le patron ECB sans détails techniques ; en phase de conception détaillée, spécifier visibilités, types précis et contraintes OCL.',
    'Étape 4 — Valider la cohérence transversale : Vérifier que chaque message d’un diagramme de séquence correspond à une opération existante dans le diagramme de classes.',
    'Étape 5 — Enrichir par des contraintes OCL : Formaliser les invariants métier non exprimables par de simples multiplicités numériques.'
  ],

  summary: [
    'UML 2.5 est un métamodèle standardisé par l’OMG composé de 14 diagrammes officiels (7 structurels et 7 comportementaux).',
    'L’architecture MOF structure la modélisation en 4 niveaux : M0 (instances), M1 (modèles), M2 (métamodèle UML), M3 (méta-métamodèle MOF).',
    'Les 4 diagrammes les plus utilisés dans l’industrie sont : Cas d’utilisation (Use Cases), Classes, Séquence et Activités.',
    'Le patron d’analyse ECB sépare les responsabilités en Entités (données), Contrôles (logique métier) et Frontières (interfaces).',
    'Le langage OCL (Object Constraint Language) complète les modèles graphiques en définissant formellement des invariants, pré-conditions et post-conditions.'
  ],

  checklist: [
    'Je connais la répartition exacte des 14 diagrammes UML 2.5 en 7 structurels et 7 comportementaux.',
    'Je maîtrise les 4 niveaux de la hiérarchie de métamodélisation MOF (M0 à M3).',
    'Je sais distinguer le rôle d’une Entité, d’un Contrôle et d’une Frontière dans le modèle ECB.',
    'Je comprends la syntaxe de base d’une contrainte OCL (context, inv, pre, post).',
    'Je sais choisir le diagramme approprié selon le problème d’ingénierie rencontré.'
  ],

  notions: [
    'Standard OMG UML 2.5',
    '7 diagrammes structurels',
    '7 diagrammes comportementaux',
    'Métamodèle MOF (M0 à M3)',
    'Patron ECB (Entity-Control-Boundary)',
    'Langage de contraintes OCL',
    'Invariants de classe',
    'Pré-conditions et post-conditions'
  ],

  pitfalls: [
    'Confondre un diagramme structurel avec un diagramme comportemental (ex: classer le diagramme d’activités parmi les structurels).',
    'Croire qu’UML est une méthode de développement : UML est uniquement un langage visuel et une notation formelle.',
    'Tenter de tout modéliser de manière exhaustive jusqu’au moindre getter/setter : le modèle doit conserver un haut niveau d’abstraction.',
    'Oublier que les expressions OCL sont purement déclaratives et ne doivent jamais modifier l’état du système (pas d’effets de bord).',
    'Négliger la cohérence entre diagrammes : une méthode invoquée en séquence doit impérativement exister dans la classe correspondante.'
  ],

  questions: [
    {
      stem: 'Combien de types de diagrammes officiels la spécification UML 2.5 de l’OMG définit-elle exactement ?',
      opts: ['9 diagrammes', '13 diagrammes', '14 diagrammes', '21 diagrammes'],
      correct: 2,
      exp: 'UML 2.5 définit très précisément 14 diagrammes officiels : 7 diagrammes structurels et 7 diagrammes comportementaux.'
    },
    {
      stem: 'Lequel de ces diagrammes appartient formellement à la famille des diagrammes structurels ?',
      opts: [
        'Diagramme d’activités',
        'Diagramme de séquence',
        'Diagramme de composants',
        'Diagramme de cas d’utilisation'
      ],
      correct: 2,
      exp: 'Le diagramme de composants décrit l’organisation et les dépendances statiques entre modules logiciels : il est strictement structurel. Les trois autres sont comportementaux.'
    },
    {
      stem: 'Dans l’architecture de métamodélisation MOF, à quel niveau correspond le modèle applicatif conçu par l’architecte (ex: classe CompteBancaire) ?',
      opts: ['Niveau M0', 'Niveau M1', 'Niveau M2', 'Niveau M3'],
      correct: 1,
      exp: 'Le niveau M1 correspond au modèle utilisateur (la modélisation du domaine). M0 correspond aux instances d’exécution, M2 au métamodèle UML, et M3 au méta-métamodèle MOF.'
    },
    {
      stem: 'Dans le patron de stéréotypes ECB (Entity-Control-Boundary), quel composant est responsable de la gestion des interactions avec l’utilisateur ou les systèmes externes ?',
      opts: [
        'Le stéréotype «entity»',
        'Le stéréotype «control»',
        'Le stéréotype «boundary»',
        'Le stéréotype «service»'
      ],
      correct: 2,
      exp: 'Le stéréotype «boundary» (Frontière) encapsule les entrées/sorties avec le monde extérieur (IHM, contrôleurs web, API REST, adaptateurs de périphériques).'
    },
    {
      stem: 'Quel mot-clé OCL est utilisé pour déclarer une condition impérative qui doit toujours être vraie pour toute instance d’une classe ?',
      opts: ['pre:', 'post:', 'inv:', 'assert:'],
      correct: 2,
      exp: 'Le mot-clé OCL «inv:» (invariant) stipule une règle d’intégrité qui doit être respectée en permanence par toute instance valide de la classe.'
    },
    {
      stem: 'Dans une post-condition OCL, comment fait-on référence à la valeur d’un attribut AVANT l’exécution de l’opération ?',
      opts: ['attribut.old', 'attribut@pre', 'attribut.previous()', 'old(attribut)'],
      correct: 1,
      exp: 'La syntaxe OCL standard utilise le modificateur «@pre» (ex: solde = solde@pre - montant) pour désigner la valeur d’un attribut au début de l’exécution.'
    },
    {
      stem: 'Quelle caractéristique fondamentale distingue le langage OCL des langages de programmation traditionnels ?',
      opts: [
        'OCL compile directement en bytecode Java',
        'OCL est un langage déclaratif pur, sans effet de bord sur le système',
        'OCL permet de modifier directement les bases de données SQL',
        'OCL n’est utilisable que sur les diagrammes de cas d’utilisation'
      ],
      correct: 1,
      exp: 'OCL est un langage formel purement déclaratif et à effet de bord nul : son évaluation ne peut en aucun cas modifier l’état ou les données des objets du modèle.'
    },
    {
      stem: 'Lequel de ces diagrammes est le plus adapté pour modéliser le cycle de vie événementiel d’un objet réactif (ex: Commande avec états Payée, Expédiée, Annulée) ?',
      opts: [
        'Le diagramme de cas d’utilisation',
        'Le diagramme d’états-transitions (State Machine)',
        'Le diagramme de déploiement',
        'Le diagramme de structures composites'
      ],
      correct: 1,
      exp: 'Le diagramme d’états-transitions est spécialement conçu pour représenter les états stables successifs d’un objet et les transitions déclenchées par des événements.'
    }
  ],

  flashcards: [
      { q: 'Qu’est-ce que « Standard OMG UML 2.5 » ?', a: 'Standard OMG UML 2.5 : Une équipe d’ingénieurs logiciels conçoit la refonte d’une plateforme bancaire distribuée. Faute d’un langage visuel commun et rigoureux, les développeurs, architectes et analystes métier produisent des schémas contradictoires, mélangeant détails de base de données, cinématiques ' },
      { q: 'Qu’est-ce que « Langage de contraintes OCL » ?', a: 'Langage de contraintes OCL' },
      { q: 'Qu’est-ce que « Invariants de classe » ?', a: 'Invariants de classe : formuler et valider des invariants et pré/post-conditions avec le langage formel OCL (Object Constraint Language) ;' },
      { q: 'Qu’est-ce que « Acteurs primaires et secondaires » ?', a: 'Acteurs primaires et secondaires' },
      { q: 'Qu’est-ce que « Granularité des cas d’utilisation » ?', a: 'Granularité des cas d’utilisation' },
      { q: 'Qu’est-ce que « Relation d’inclusion «include» » ?', a: 'Relation d’inclusion «include»' },
      { q: 'Qu’est-ce que « Relation d’extension «extend» » ?', a: 'Relation d’extension «extend»' },
      { q: 'Qu’est-ce que « Points d’extension (Extension Points) » ?', a: 'maîtriser la relation d’extension conditionnelle «extend» et ses points d’extension (Extension Points) ;' },
      { q: 'Qu’est-ce que « Généralisation et héritage d’acteurs » ?', a: 'Généralisation et héritage d’acteurs' },
      { q: 'Qu’est-ce que « Détection des cas d’utilisation orphelins » ?', a: 'Détection des cas d’utilisation orphelins' },
      { q: 'Qu’est-ce que « Compartiments de classe UML » ?', a: 'Compartiments de classe UML' },
      { q: 'Qu’est-ce que « Signatures d’attributs et méthodes » ?', a: 'Signatures d’attributs et méthodes' },
      { q: 'Qu’est-ce que « Multiplicités d’association » ?', a: 'définir avec exactitude les multiplicités d’association (0..1, 1, 0..*, 1..*, m..n) et la navigabilité ;' },
      { q: 'Qu’est-ce que « Navigabilité et rôles » ?', a: 'Navigabilité et rôles : définir avec exactitude les multiplicités d’association (0..1, 1, 0..*, 1..*, m..n) et la navigabilité ;' },
      { q: 'Qu’est-ce que « Agrégation faible (◊ creux) » ?', a: 'Agrégation faible (◊ creux)' },
      { q: 'Qu’est-ce que « Composition forte (♦ plein) » ?', a: 'Composition forte (♦ plein)' },
      { q: 'Qu’est-ce que « Classes d’association et héritage » ?', a: 'Classes d’association et héritage' },
      { q: 'Qu’est-ce que « Lignes de vie (Lifelines) » ?', a: "Objectif : Valider l'ordonnancement temporel vertical des messages et l'équilibre des appels/retours entre lignes de vie (lifelines)." },
      { q: 'Qu’est-ce que « Barres d’activation (Execution Specifications) » ?', a: 'représenter les périodes d’activité d’un objet via les barres d’activation (execution specifications) ;' },
      { q: 'Qu’est-ce que « Messages synchrones (flèche pleine fermée) » ?', a: 'Les messages synchrones (flèche pleine fermée) bloquent l’émetteur, contrairement aux messages asynchrones (flèche ouverte simple).' },
      { q: 'Qu’est-ce que « Messages de retour (trait tireté) » ?', a: 'Messages de retour (trait tireté)' },
      { q: 'Qu’est-ce que « Fragment combiné opt (optionnel) » ?', a: 'Fragment combiné opt (optionnel)' },
      { q: 'Qu’est-ce que « Fragment combiné loop & par » ?', a: 'Fragment combiné loop & par' },
      { q: 'Qu’est-ce que « Sémantique des jetons (Token semantics) » ?', a: 'Sémantique des jetons (Token semantics)' },
      { q: 'Qu’est-ce que « Nœud initial et nœuds d’actions » ?', a: 'Nœud initial et nœuds d’actions' },
      { q: 'Qu’est-ce que « Final d’activité vs Final de flux » ?', a: 'Final d’activité vs Final de flux' },
      { q: 'Qu’est-ce que « Décision et Fusion (losanges) » ?', a: 'Décision et Fusion (losanges)' },
      { q: 'Qu’est-ce que « Gardes conditionnelles [condition] » ?', a: 'Gardes conditionnelles [condition]' },
      { q: 'Qu’est-ce que « Bifurcation Fork et Jonction Join » ?', a: 'Bifurcation Fork et Jonction Join' },
      { q: 'Qu’est-ce que « Couloirs de responsabilités (Swimlanes) » ?', a: 'Couloirs de responsabilités (Swimlanes / Partitions) : Le diagramme est divisé en colonnes verticales ou bandes horizontales. Chaque couloir porte le nom d’un acteur, d’un département ou d’un sous-système (ex: Client , Entrepôt , Système Bancaire ). Une action placée dans un coul' },
      { q: 'Qu’est-ce que « Flux d’objets (Object Nodes) » ?', a: 'Flux d’objets (Object Nodes)' },
      { q: 'Qu’est-ce que « Machines à états finis (Statecharts) » ?', a: 'Machines à états finis (Statecharts)' },
      { q: 'Qu’est-ce que « Actions entry /, exit / et activités do / » ?', a: 'Actions entry /, exit / et activités do /' },
      { q: 'Qu’est-ce que « Pseudo-états (Choix, Jonction, Historique H/H*) » ?', a: 'Pseudo-états (Choix, Jonction, Historique H/H*)' },
      { q: 'Qu’est-ce que « Diagramme de composants («component») » ?', a: 'Diagramme de composants («component»)' },
      { q: 'Qu’est-ce que « Interfaces Lollipop (fournies) et Socket (requises) » ?', a: 'Interfaces Lollipop (fournies) et Socket (requises)' },
      { q: 'Qu’est-ce que « Nœuds, environnements d’exécution et artefacts » ?', a: 'Nœuds, environnements d’exécution et artefacts' },
    {
      q: 'Combien de diagrammes comporte UML 2.5 et comment sont-ils divisés ?',
      a: '14 diagrammes au total : 7 diagrammes structurels (statiques) et 7 diagrammes comportementaux (dynamiques).'
    },
    {
      q: 'Quels sont les 4 niveaux de la hiérarchie MOF ?',
      a: 'M0 : Données et instances réelles ; M1 : Modèle applicatif ; M2 : Métamodèle UML ; M3 : Méta-métamodèle MOF.'
    },
    {
      q: 'Quels sont les rôles des trois stéréotypes du patron ECB ?',
      a: 'Entity (données métier pérennes), Control (logique métier et orchestration), Boundary (interfaces avec les utilisateurs et systèmes externes).'
    },
    {
      q: 'Qu’est-ce qu’un invariant en langage OCL ?',
      a: 'Une expression booléenne introduite par «inv:» qui doit être vraie à tout moment pour chaque instance valide de la classe ciblée.'
    },
    {
      q: 'Que représente «@pre» dans une post-condition OCL ?',
      a: 'La valeur qu’avait une propriété ou un paramètre au moment de l’appel de l’opération, avant toute modification.'
    },
    {
      q: 'Pourquoi UML n’est-il pas considéré comme une méthode de développement ?',
      a: 'Car UML fournit une notation et un métamodèle sans imposer de démarche, d’étapes ordonnées, de jalons ou de rôles dans l’équipe.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la liste des 14 diagrammes, leur classification structurel/comportemental et les niveaux MOF.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bon socle acquis. Approfondissez la sémantique formelle d’OCL et l’architecture ECB.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise des fondements d’UML 2.5 et de la métamodélisation.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous maîtrisez les concepts fondamentaux de la modélisation logicielle UML 2.5.' }
  ]
};
