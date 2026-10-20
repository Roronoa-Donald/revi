/**
 * Chapitre 2 du cours « UML B2 » — Diagrammes de Cas d’Utilisation (Use Cases) &amp; Analyse des Besoins.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Diagrammes de Cas d’Utilisation (Use Cases) &amp; Analyse des Besoins',
  short: 'Cas d’Utilisation',
  toc: 'Formalisation des exigences fonctionnelles, acteurs primaires et secondaires, frontière du système (System Boundary), relations d’inclusion (&laquo;include&raquo;) et d’extension (&laquo;extend&raquo;), spécialisation d’acteurs et détection des cas orphelins.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Lors du lancement d’une application de télémédecine, les équipes métier et les développeurs se heurtent à de graves malentendus : ' +
    'les spécifications rédigent des centaines de pages textuelles ambiguës où les rôles des praticiens, des patients ' +
    'et de la Sécurité Sociale s’entrecroisent de manière chaotique. ' +
    'Pour borner rigoureusement le périmètre fonctionnel du système, l’architecte logiciel déploie le diagramme de cas d’utilisation UML. ' +
    'Ce module forme les étudiants à délimiter la frontière du système, à classifier les acteurs selon leur implication, ' +
    'à modéliser avec une précision mathématique les relations &laquo;include&raquo; et &laquo;extend&raquo;, ' +
    'et à éliminer les erreurs classiques de granularité et de cas orphelins.',

  objectives: [
    'délimiter la frontière du système (System Boundary) et positionner les acteurs à l’extérieur ;',
    'distinguer les acteurs primaires (qui initient l’action pour atteindre un objectif) et secondaires (sollicités en soutien) ;',
    'définir la granularité optimale d’un cas d’utilisation axé sur la valeur métier observable ;',
    'maîtriser la syntaxe et la sémantique de la relation d’inclusion obligatoire &laquo;include&raquo; ;',
    'maîtriser la relation d’extension conditionnelle &laquo;extend&raquo; et ses points d’extension (Extension Points) ;',
    'appliquer l’héritage (généralisation/spécialisation) entre acteurs et entre cas d’utilisation.'
  ],

  sections: [
    {
      title: 'Acteurs, Système et Granularité des Cas d’Utilisation',
      html: [
        '<p>Un <strong>diagramme de cas d’utilisation</strong> modélise le comportement du système du point de vue de ses utilisateurs. ' +
        'Il se compose de trois éléments fondamentaux :</p>',

        '<ul>',
        '  <li><strong>La frontière du système (System Boundary) :</strong> Un rectangle délimitant le périmètre logiciel. ' +
        'Tout ce qui est à l’intérieur est développé par l’équipe ; tout ce qui est à l’extérieur constitue l’environnement.</li>',
        '  <li><strong>Les acteurs (Actors) :</strong> Entités externes interagissant avec le système. ' +
        'Un acteur n’est pas nécessairement un humain : il peut s’agir d’un serveur tiers (ex: Passerelle Bancaire, Serveur LDAP) ou d’un démon temporel (ex: Horloge Système). ' +
        'Représenté graphiquement par un « bonhomme fil de fer » (stickman) ou un classeur avec le stéréotype <code>&laquo;actor&raquo;</code>.</li>',
        '  <li><strong>Les cas d’utilisation (Use Cases) :</strong> Une ellipse contenant un verbe à l’infinitif et un complément (ex: <em>Consulter Dossier Médical</em>). ' +
        'Chaque cas doit représenter une unité de travail complète apportant une valeur métier mesurable à son acteur principal.</li>',
        '</ul>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Acteurs Primaires vs Secondaires</h4>',
        '    <ul>',
        '      <li><strong>Acteur Primaire :</strong> Déclenche le cas d’utilisation pour satisfaire un besoin propre (placé généralement à gauche du diagramme).</li>',
        '      <li><strong>Acteur Secondaire :</strong> Sollicité par le système au cours du scénario pour lui fournir un service (placé généralement à droite).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Règle de Granularité (Cockburn)</h4>',
        '    <ul>',
        '      <li><strong>Niveau Objectif Utilisateur (Sea Level) :</strong> Un cas d’utilisation doit s’accomplir en une seule session ininterrompue de 2 à 20 minutes.</li>',
        '      <li><strong>Anti-patron :</strong> Ne jamais créer de cas d’utilisation pour un clic ou une saisie unitaire (ex: « Cliquer sur bouton Valider » est une erreur grave).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Relations entre Cas d’Utilisation : &laquo;include&raquo; vs &laquo;extend&raquo;',
      html: [
        '<p>L’une des sources d’erreurs les plus fréquentes en modélisation logicielle réside dans la confusion ' +
        'entre les stéréotypes <code>&laquo;include&raquo;</code> et <code>&laquo;extend&raquo;</code> :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Critère</th>',
        '      <th>Relation &laquo;include&raquo;</th>',
        '      <th>Relation &laquo;extend&raquo;</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>Caractère</strong></td>',
        '      <td><strong>Obligatoire</strong> : Le cas inclus est toujours exécuté.</td>',
        '      <td><strong>Optionnel / Conditionnel</strong> : Exécuté uniquement sous condition.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Sens de la flèche</strong></td>',
        '      <td>Du cas de base <strong>vers</strong> le cas inclus (Base &rarr; Inclus).</td>',
        '      <td>Du cas d’extension <strong>vers</strong> le cas de base (Extension &rarr; Base).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Conscience du cas de base</strong></td>',
        '      <td>Le cas de base sait qu’il fait appel au sous-cas.</td>',
        '      <td>Le cas de base ignore l’existence de l’extension (découplage total).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Point d’ancrage</strong></td>',
        '      <td>Étape explicite dans le scénario textuel.</td>',
        '      <td>Point d’extension (<strong>Extension Point</strong>) déclaré dans le cas de base.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Exemple type</strong></td>',
        '      <td><code>Effectuer Virement</code> &rarr; &laquo;include&raquo; &rarr; <code>Authentifier Client</code></td>',
        '      <td><code>Alerter Dépassement Plafond</code> &rarr; &laquo;extend&raquo; &rarr; <code>Effectuer Virement</code></td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Généralisation et Cas d’Utilisation Orphelins',
      html: [
        '<p>La relation de <strong>généralisation / spécialisation</strong> (flèche à triangle blanc fermé) s’applique aussi bien aux acteurs qu’aux cas d’utilisation :</p>',
        '<ul>',
        '  <li><strong>Spécialisation d’acteurs :</strong> Si <em>Médecin Spécialiste</em> hérite de <em>Praticien</em>, il hérite automatiquement du droit d’exécuter tous les cas d’utilisation accessibles à <em>Praticien</em>, tout en ayant accès à des cas spécifiques.</li>',
        '  <li><strong>Spécialisation de cas :</strong> Le cas <em>Régler Facture</em> peut être spécialisé en <em>Régler par Carte</em> ou <em>Régler par Virement</em>. Le cas enfant hérite du comportement global mais redéfinit la modalité d’exécution.</li>',
        '</ul>',

        '<p><strong>Règle de validation des cas orphelins :</strong> Tout cas d’utilisation situé dans le système doit être directement relié à au moins un acteur, ' +
        'ou être inclus / étendu par un cas lui-même relié à un acteur. Un cas d’utilisation sans aucun chemin vers un acteur est un <em>cas orphelin</em>, ' +
        'ce qui constitue une faute de modélisation disqualifiante.</p>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthode d’Élaboration Rigoureuse d’un Diagramme Use Case',
  method: [
    'Étape 1 — Identifier les acteurs externes : Recenser tous les profils humains et systèmes informatiques tiers interagissant avec l’application.',
    'Étape 2 — Poser la frontière du système : Tracer le rectangle de délimitation et exclure formellement les acteurs à l’extérieur.',
    'Étape 3 — Rédiger les cas nominaux : Définir les cas au niveau « Objectif Utilisateur » avec un verbe d’action à l’infinitif.',
    'Étape 4 — Relier acteurs et cas : Tracer les associations directes entre acteurs primaires et leurs objectifs respectifs.',
    'Étape 5 — Factoriser par &laquo;include&raquo; : Extraire les étapes obligatoires communes répétées dans plusieurs cas.',
    'Étape 6 — Isoler les variantes par &laquo;extend&raquo; : Définir les fonctionnalités optionnelles ou exceptions conditionnelles avec leurs points d’extension.',
    'Étape 7 — Contrôler la cohérence globale : Vérifier qu’aucun cas orphelin ne subsiste et que le sens des flèches tiretées est scrupuleusement respecté.'
  ],

  summary: [
    'Le diagramme de cas d’utilisation capture les exigences fonctionnelles sans préjuger de l’implémentation technique.',
    'La frontière du système isole le code à développer des acteurs externes (humains, tiers logiciels, chronomètres).',
    'La relation &laquo;include&raquo; relie un cas de base vers un sous-cas obligatoire (sens : Base &rarr; Inclus).',
    'La relation &laquo;extend&raquo; relie un comportement optionnel vers le cas de base au niveau d’un point d’extension (sens : Extension &rarr; Base).',
    'La généralisation d’acteurs permet d’hériter des habilitations et droits d’accès fonctionnels.',
    'Chaque cas d’utilisation doit impérativement avoir un lien direct ou indirect vers au moins un acteur du système.'
  ],

  checklist: [
    'Je sais placer la frontière du système et interdire tout acteur à l’intérieur du rectangle.',
    'Je distingue un acteur primaire d’un acteur secondaire.',
    'Je connais le sens exact de la flèche tiretée pour &laquo;include&raquo; (du cas appelant vers le cas inclus).',
    'Je connais le sens exact de la flèche tiretée pour &laquo;extend&raquo; (du cas optionnel vers le cas étendu).',
    'Je sais identifier un point d’extension (Extension Point) dans un cas de base.',
    'Je vérifie l’absence de tout cas d’utilisation orphelin dans mon diagramme.'
  ],

  notions: [
    'Frontière du système (System Boundary)',
    'Acteurs primaires et secondaires',
    'Granularité des cas d’utilisation',
    'Relation d’inclusion &laquo;include&raquo;',
    'Relation d’extension &laquo;extend&raquo;',
    'Points d’extension (Extension Points)',
    'Généralisation et héritage d’acteurs',
    'Détection des cas d’utilisation orphelins'
  ],

  pitfalls: [
    'Dessiner un acteur à l’intérieur du rectangle de la frontière du système : un acteur est TOUJOURS externe.',
    'Inverser le sens de la flèche &laquo;extend&raquo; : la flèche part toujours du cas d’extension pour pointer vers le cas de base.',
    'Utiliser &laquo;include&raquo; pour décomposer un cas en pseudo-étapes algorithmiques (ex: Saisir nom &rarr; include &rarr; Saisir prénom) : c’est du functional decomposition proscrit.',
    'Confondre acteur et rôle : une même personne physique peut endosser successivement plusieurs rôles (acteurs) différents.',
    'Laisser un cas orphelin dans le diagramme sans aucun lien direct ou indirect vers un acteur.'
  ],

  questions: [
    {
      stem: 'Où doivent obligatoirement se situer les acteurs dans un diagramme de cas d’utilisation UML ?',
      opts: [
        'À l’intérieur de la frontière du système (System Boundary)',
        'À l’extérieur de la frontière du système',
        'Exclusivement dans le coin supérieur gauche du système',
        'Directement dans l’ellipse des cas d’utilisation'
      ],
      correct: 1,
      exp: 'Par définition formelle OMG, un acteur représente une entité externe au système informatique. Il doit donc se trouver impérativement en dehors du rectangle délimitant le système.'
    },
    {
      stem: 'Quel est le sens standard de la flèche tiretée stéréotypée «include» entre deux cas d’utilisation ?',
      opts: [
        'Du cas inclus vers le cas de base',
        'Du cas de base vers le cas inclus',
        'Une ligne continue sans aucune flèche',
        'Une double flèche bidirectionnelle'
      ],
      correct: 1,
      exp: 'La flèche «include» pointe du cas client (le cas de base) vers le cas fournisseur (le sous-cas inclus obligatoire).'
    },
    {
      stem: 'Quel est le sens standard de la flèche tiretée stéréotypée «extend» entre un cas d’extension et le cas de base ?',
      opts: [
        'Du cas de base vers le cas d’extension',
        'Du cas d’extension vers le cas de base',
        'Une ligne pleine avec un losange noir',
        'Un trait tireté reliant les acteurs'
      ],
      correct: 1,
      exp: 'La flèche «extend» part toujours du cas d’extension (qui enrichit le comportement) et pointe vers le cas de base qu’elle étend sous condition.'
    },
    {
      stem: 'Qu’est-ce qu’un «point d’extension» (Extension Point) dans la spécification UML ?',
      opts: [
        'Une classe de contrôleur web',
        'Un emplacement explicite dans le déroulement du cas de base où un comportement étendu peut être inséré',
        'Le bouton graphique sur lequel l’utilisateur clique',
        'Une exception logicielle non interceptée'
      ],
      correct: 1,
      exp: 'Un point d’extension est un repère formel déclaré dans le cas de base identifiant où et sous quelle condition le scénario étendu vient s’insérer.'
    },
    {
      stem: 'Un système bancaire déclenche automatiquement chaque nuit à 02h00 la clôture des comptes. Qui est l’acteur de ce cas d’utilisation ?',
      opts: [
        'Le directeur de l’agence',
        'Le client titulaire du compte',
        'Un acteur temporel externe (Horloge Système / Ordonnanceur batch)',
        'Il n’y a aucun acteur car le système est magique'
      ],
      correct: 2,
      exp: 'Tout événement externe déclencheur est modélisé par un acteur, y compris les déclencheurs temporels comme l’Horloge Système ou un ordonnanceur de tâches.'
    },
    {
      stem: 'Si un acteur «Directeur» hérite d’un acteur «Employé», quelles sont ses prérogatives fonctionnelles ?',
      opts: [
        'Il perd immédiatement tous les droits d’Employé',
        'Il a accès à tous les cas d’utilisation d’Employé, ainsi qu’aux cas d’utilisation spécifiques à Directeur',
        'Il ne peut accéder qu’aux cas d’utilisation où Employé n’a pas accès',
        'L’héritage entre acteurs est formellement interdit en UML 2.5'
      ],
      correct: 1,
      exp: 'Par le principe de substitution et de généralisation, l’acteur dérivé hérite de toutes les associations et prérogatives de son parent.'
    },
    {
      stem: 'Quelle erreur méthodologique commet un concepteur qui décompose «Passer Commande» en «Saisir Adresse», «Saisir Téléphone» et «Valider Panier» via des «include» ?',
      opts: [
        'Aucune, c’est la norme stricte d’UML',
        'Une décomposition fonctionnelle abusive (Functional Decomposition), qui transforme un cas d’utilisation en micro-étapes d’IHM',
        'Un dépassement de mémoire vive',
        'Un abus de polymorphisme'
      ],
      correct: 1,
      exp: 'La décomposition fonctionnelle découpe un processus en étapes algorithmiques au lieu de préserver des unités de valeur métier complètes (niveau Objectif Utilisateur).'
    },
    {
      stem: 'Qu’appelle-t-on un «cas d’utilisation orphelin» dans un diagramme de cas d’utilisation ?',
      opts: [
        'Un cas qui n’utilise pas de base de données',
        'Un cas d’utilisation qui ne possède aucun lien (direct ou indirect via include/extend) avec un acteur',
        'Un cas dont le nom comporte plus de 3 mots',
        'Un cas qui hérite de plusieurs acteurs à la fois'
      ],
      correct: 1,
      exp: 'Un cas orphelin est isolé du reste du système : aucun acteur ne peut l’initier ou en bénéficier, ce qui constitue une anomalie de modélisation.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre les relations &laquo;include&raquo; et &laquo;extend&raquo; ?',
      a: '&laquo;include&raquo; est une exécution obligatoire (Base &rarr; Inclus) ; &laquo;extend&raquo; est une exécution conditionnelle optionnelle (Extension &rarr; Base).'
    },
    {
      q: 'Pourquoi les acteurs doivent-ils toujours se situer en dehors de la frontière du système ?',
      a: 'Parce qu’un acteur représente une entité de l’environnement externe interagissant avec le logiciel, et non un élément interne au logiciel.'
    },
    {
      q: 'Qu’est-ce qu’un acteur secondaire dans un use case ?',
      a: 'Un acteur qui ne déclenche pas le cas de son initiative, mais qui est sollicité par le système pour lui rendre un service nécessaire (ex: serveur bancaire).'
    },
    {
      q: 'Qu’est-ce qu’un Extension Point ?',
      a: 'Un point d’ancrage précis déclaré dans le cas d’utilisation de base indiquant où un cas d’extension viendra s’insérer si la garde est satisfaite.'
    },
    {
      q: 'Qu’apporte l’héritage entre acteurs ?',
      a: 'L’acteur spécialisé hérite automatiquement de toutes les associations de l’acteur parent, lui donnant accès à tous les mêmes cas d’utilisation.'
    },
    {
      q: 'Quelle est la taille idéale d’un cas d’utilisation selon Alistair Cockburn ?',
      a: 'Le niveau « Objectif Utilisateur » (Sea Level) : une tâche complète apportant une valeur métier, réalisable en une séance continue de 2 à 20 minutes.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la distinction include/extend, le rôle des acteurs et le concept de frontière système.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes bases. Portez une attention particulière au sens des flèches tiretées et aux points d’extension.' },
    { cls: 'good', text: '7/8 : Excellente maîtrise de l’ingénierie des exigences et des cas d’utilisation UML.' },
    { cls: 'top', text: '8/8 : Parfait ! Vous êtes capable de spécifier sans faille des architectures fonctionnelles complexes.' }
  ]
};
