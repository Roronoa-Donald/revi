/**
 * Chapitre 3 du cours « UML B2 » — Diagramme de Classes, Visibilités, Multiplicités &amp; Relations Fortes.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Diagramme de Classes, Visibilités, Multiplicités &amp; Relations Fortes',
  short: 'Diagramme de Classes',
  toc: 'Structure des classes à 3 compartiments, visibilités (+, -, #, ~), signatures d’attributs et méthodes, multiplicités d’association, navigabilité, distinction stricte agrégation faible vs composition forte, classes d’association et héritage.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Lors de la conception du cœur transactionnel d’un système d’information bancaire, des failles d’encapsulation ' +
    'et des fuites de mémoire critiques apparaissent en production : des objets orphelins persistent en base ' +
    'après la suppression de leurs entités parentes, et des attributs internes sensibles sont modifiés directement par d’autres classes. ' +
    'Ces défaillances proviennent d’une mauvaise modélisation structurelle : ignorance des visibilités de membres, ' +
    'confusion entre agrégation libre et composition stricte, et multiplicités erronées. ' +
    'Ce module dote les ingénieurs logiciels de la rigueur requise pour concevoir des diagrammes de classes ' +
    'infaillibles, directement transposables en code orienté objet propre (Java, C#, C++, Python).',

  objectives: [
    'détailler l’anatomie d’une classe en 3 compartiments normalisés OMG (Nom, Attributs, Opérations) ;',
    'maîtriser et appliquer les 4 niveaux de visibilité (+ public, - privé, # protégé, ~ paquetage) ;',
    'rédiger des signatures complètes d’attributs et d’opérations selon la grammaire officielle UML 2.5 ;',
    'définir avec exactitude les multiplicités d’association (0..1, 1, 0..*, 1..*, m..n) et la navigabilité ;',
    'distinguer conceptuellement et techniquement l’agrégation faible (losange creux) de la composition forte (losange plein) ;',
    'modéliser les classes d’association, les classes abstraites, les interfaces et les hiérarchies d’héritage.'
  ],

  sections: [
    {
      title: 'Anatomie d’une Classe et Syntaxe des Signatures',
      html: [
        '<p>Une <strong>classe</strong> est représentée par un rectangle divisé en trois compartiments verticaux superposés :</p>',
        '<ol>',
        '  <li><strong>Compartiment supérieur (Nom) :</strong> Nom de la classe en gras et centré (en italique ou avec <code>{abstract}</code> s’il s’agit d’une classe abstraite). ' +
        'Peut comporter un stéréotype (ex: <code>&laquo;interface&raquo;</code>, <code>&laquo;entity&raquo;</code>).</li>',
        '  <li><strong>Compartiment intermédiaire (Attributs) :</strong> Liste des propriétés décrivant l’état structurel des instances.</li>',
        '  <li><strong>Compartiment inférieur (Opérations) :</strong> Liste des méthodes et comportements offerts par la classe.</li>',
        '</ol>',

        '<p>La syntaxe formelle d’un attribut selon la norme OMG UML 2.5 est la suivante :</p>',
        '<pre><code>visibilité nom : type [multiplicité] = valeurParDéfaut {propriétés}</code></pre>',
        '<p>Exemple : <code>- solde : float = 0.0 {readOnly}</code></p>',

        '<p>La syntaxe formelle d’une opération est :</p>',
        '<pre><code>visibilité nom(nomParam : typeParam = valeurDéfaut) : typeRetour</code></pre>',
        '<p>Exemple : <code>+ crediter(montant : float) : bool</code></p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Symboles de Visibilité Standard</h4>',
        '    <ul>',
        '      <li><code>+</code> (Public) : Accessible depuis n’importe quel module ou classe externe.</li>',
        '      <li><code>-</code> (Privé) : Strictement encapsulé, accessible uniquement à l’intérieur de la classe.</li>',
        '      <li><code>#</code> (Protégé) : Accessible à la classe et à l’ensemble de ses sous-classes dérivées.</li>',
        '      <li><code>~</code> (Package) : Accessible par toutes les classes du même paquetage d’appartenance.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Membres Statiques et Abstraits</h4>',
        '    <ul>',
        '      <li><strong>Membre Statique (de classe) :</strong> Son nom est <u>souligné</u> (ex: <u>- nbComptes : int</u>). Il appartient à la classe et non aux instances.</li>',
        '      <li><strong>Méthode Abstraite :</strong> Son nom est écrit en <em>italique</em>. Elle ne possède pas de corps et oblige les sous-classes concrètes à l’implémenter.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Associations, Multiplicités et Classes d’Association',
      html: [
        '<p>Une <strong>association</strong> matérialise une relation sémantique durable entre deux classes. ' +
        'Chaque extrémité d’une association possède un nom de rôle optionnel et une <strong>multiplicité</strong> impérative :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Multiplicité</th>',
        '      <th>Signification mathématique</th>',
        '      <th>Traduction dans le code (ex: Java / C#)</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><code>1</code> ou <code>1..1</code></td>',
        '      <td>Exactement un (obligatoire, non nul)</td>',
        '      <td>Référence directe obligatoire non nulle (pointeur garanti).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>0..1</code></td>',
        '      <td>Zéro ou un (optionnel)</td>',
        '      <td>Référence nullable ou <code>Optional&lt;T&gt;</code>.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>*</code> ou <code>0..*</code></td>',
        '      <td>Zéro à plusieurs (collection potentiellement vide)</td>',
        '      <td>Collection dynamique (<code>List&lt;T&gt;</code>, <code>Set&lt;T&gt;</code>).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>1..*</code></td>',
        '      <td>Un à plusieurs (collection avec au moins un élément)</td>',
        '      <td>Collection avec invariant de taille non vide vérifié au constructeur.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>n..m</code></td>',
        '      <td>Intervalle fixe compris entre n et m (ex: <code>2..4</code>)</td>',
        '      <td>Collection dimensionnée avec contrôle de bornes strict.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',

        '<p><strong>Classe d’Association :</strong> Lorsqu’une relation porte elle-même des attributs qui n’appartiennent en propre ' +
        'à aucune des deux classes participantes (ex: la <em>note</em> d’un <em>Étudiant</em> dans un <em>Cours</em>), ' +
        'on adjoint une classe d’association reliée par un trait tireté au milieu de la ligne d’association.</p>'
      ].join('\n')
    },
    {
      title: 'Agrégation Faible vs Composition Forte : La Règle du Cycle de Vie',
      html: [
        '<p>La distinction entre l’agrégation et la composition est l’un des piliers de l’architecture orientée objet. ' +
        'Toutes deux expriment une relation <em>« tout-partie »</em>, mais diffèrent radicalement par la gestion du cycle de vie :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Agrégation Faible (&loz; Losange creux blanc)</h4>',
        '    <ul>',
        '      <li><strong>Cycle de vie indépendant :</strong> Les parties existent avant le tout et peuvent lui survivre.</li>',
        '      <li><strong>Partageable :</strong> Une même partie peut être agrégée simultanément par plusieurs contenants.</li>',
        '      <li><strong>Destruction :</strong> La destruction du contenant <em>ne détruit pas</em> les composants agrégés.</li>',
        '      <li><strong>Exemple canonique :</strong> Une <em>Université</em> et un <em>Professeur</em>. Si l’université ferme, le professeur conserve son existence autonome.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Composition Forte (&diams; Losange plein noir)</h4>',
        '    <ul>',
        '      <li><strong>Cycle de vie exclusif &amp; lié :</strong> Les composants naissent et meurent impérativement avec le composite.</li>',
        '      <li><strong>Non partageable :</strong> Une partie appartient à un seul et unique composite à la fois (multiplicité 1 ou 0..1 côté composite).</li>',
        '      <li><strong>Destruction en cascade :</strong> La destruction du composite entraîne la destruction physique immédiate de toutes ses parties.</li>',
        '      <li><strong>Exemple canonique :</strong> Une <em>Facture</em> et ses <em>LignesFacture</em>. Une ligne n’a aucun sens hors de sa facture.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Construction d’un Modèle de Domaine de Classes',
  method: [
    'Étape 1 — Extraire les concepts métier nominatifs : Analyser les besoins pour isoler les substantifs candidats à devenir des classes.',
    'Étape 2 — Filtrer les classes et les attributs simples : Si un concept ne possède qu’une seule valeur sans comportement propre, en faire un attribut plutôt qu’une classe.',
    'Étape 3 — Définir les attributs et protéger l’encapsulation : Passer par défaut tous les attributs en privé (-) et créer des accesseurs/méthodes publiques (+).',
    'Étape 4 — Relier les classes par des associations : Nommer les rôles et spécifier systématiquement les multiplicités aux deux extrémités.',
    'Étape 5 — Qualifier le couplage (Agrégation vs Composition) : Poser la question clé : « Si l’objet parent est détruit, ses éléments composants doivent-ils disparaître avec lui ? ». Si OUI, utiliser la composition (losange noir) ; si NON, l’agrégation (losange blanc).',
    'Étape 6 — Factoriser par généralisation/héritage : Regrouper les propriétés communes dans une classe mère abstraite ({abstract}) avec triangle blanc fermé vers la mère.'
  ],

  summary: [
    'Une classe UML se compose de 3 compartiments : Nom, Attributs et Opérations.',
    'Les visibilités standard sont le public (+), le privé (-), le protégé (#) et le paquetage (~).',
    'Les membres statiques sont obligatoirement soulignés, et les éléments abstraits écrits en italique.',
    'Les multiplicités bornent le nombre d’instances pouvant participer à une association (1, 0..1, *, 1..*, m..n).',
    'L’agrégation faible (losange creux) lie des objets ayant des cycles de vie autonomes.',
    'La composition forte (losange plein) impose une appartenance exclusive et une destruction en cascade des parties avec le composite.',
    'L’héritage est représenté par un trait plein terminé par un triangle blanc fermé dirigé vers la classe mère.'
  ],

  checklist: [
    'Je connais par cœur les symboles des 4 visibilités (+, -, #, ~).',
    'Je sais rédiger la signature normalisée complète d’un attribut et d’une méthode.',
    'Je sais représenter un membre statique (souligné) et une classe abstraite (italique ou {abstract}).',
    'Je sais lire et attribuer des multiplicités aux deux extrémités d’une association.',
    'Je sais choisir entre agrégation faible et composition forte selon le critère de co-destruction du cycle de vie.',
    'Je sais quand introduire une classe d’association pour porter des attributs de relation.'
  ],

  notions: [
    'Compartiments de classe UML',
    '4 visibilités (+, -, #, ~)',
    'Signatures d’attributs et méthodes',
    'Multiplicités d’association',
    'Navigabilité et rôles',
    'Agrégation faible (&loz; creux)',
    'Composition forte (&diams; plein)',
    'Classes d’association et héritage'
  ],

  pitfalls: [
    'Mettre des visibilités publiques (+) sur tous les attributs : viole le principe fondamental d’encapsulation.',
    'Inverser le côté du losange : le losange d’agrégation ou de composition se dessine TOUJOURS du côté du contenant/composite.',
    'Utiliser la composition (losange plein) alors que les composants doivent survivre au contenant (ex: supprimer une voiture ne doit pas détruire son conducteur).',
    'Oublier les multiplicités aux extrémités : une association sans multiplicité est ambiguë et non professionnelle.',
    'Confondre la flèche d’héritage (triangle blanc fermé) avec une simple flèche de navigabilité ou de dépendance.'
  ],

  questions: [
    {
      stem: 'Quel symbole représente la visibilité «protégée» (protected) d’un attribut ou d’une méthode dans une classe UML ?',
      opts: ['+', '-', '#', '~'],
      correct: 2,
      exp: 'En UML, le dièse «#» désigne la visibilité protégée (accessible par la classe elle-même et ses sous-classes dérivées).'
    },
    {
      stem: 'Comment indique-t-on graphiquement qu’un attribut ou une méthode est «statique» (static / lié à la classe et non à l’instance) ?',
      opts: [
        'En écrivant son nom en lettres capitales',
        'En soulignant son nom',
        'En préfixant son nom par une astérisque (*)',
        'En l’écrivant en rouge'
      ],
      correct: 1,
      exp: 'Selon la norme OMG, les caractéristiques statiques (attributs de classe ou méthodes de classe) sont formellement soulignées dans le compartiment.'
    },
    {
      stem: 'Quelle multiplicité représente une relation où l’élément est facultatif ou peut être présent au plus une fois ?',
      opts: ['1', '0..1', '0..*', '1..*'],
      correct: 1,
      exp: 'La multiplicité «0..1» signifie zéro ou un élément (présence optionnelle, souvent représentée par un type nullable ou Optional).'
    },
    {
      stem: 'Quelle est la différence fondamentale entre une agrégation faible (losange creux) et une composition forte (losange plein) ?',
      opts: [
        'L’agrégation utilise des bases de données SQL et la composition des bases NoSQL',
        'En composition, la partie ne peut appartenir qu’à un seul composite et est détruite avec lui, alors qu’en agrégation les parties ont un cycle de vie indépendant',
        'L’agrégation est réservée aux entités graphiques et la composition aux services réseau',
        'Il n’y a aucune différence, ce sont deux variantes graphiques équivalentes'
      ],
      correct: 1,
      exp: 'La composition impose un cycle de vie exclusif et lié : si le composite est détruit, ses parties composantes sont obligatoirement détruites en cascade. L’agrégation permet la survie autonome des parties.'
    },
    {
      stem: 'De quel côté de la ligne de relation doit-on obligatoirement placer le losange (d’agrégation ou de composition) ?',
      opts: [
        'Du côté du composant (la partie)',
        'Du côté du contenant / composite (le tout)',
        'Au milieu exact de la ligne',
        'Aux deux extrémités à la fois'
      ],
      correct: 1,
      exp: 'La norme OMG stipule que le losange (creux ou plein) est impérativement rattaché à l’extrémité de la classe qui joue le rôle de contenant (le tout).'
    },
    {
      stem: 'Quelle est la multiplicité maximale possible du côté du composite dans une relation de composition forte ?',
      opts: ['*', '1 ou 0..1 (au maximum 1)', 'Autant qu’on veut', 'Exactement 2'],
      correct: 1,
      exp: 'Puisqu’une partie appartient exclusivement à un seul composite à la fois en composition forte, la multiplicité du côté composite ne peut jamais dépasser 1 (elle est typiquement 1, ou 0..1 avant attachement).'
    },
    {
      stem: 'Quand doit-on recourir à une «classe d’association» au lieu d’une simple association entre deux classes ?',
      opts: [
        'Quand la relation est sécurisée par mot de passe',
        'Quand l’association possède elle-même des attributs qui dépendent de la combinaison des deux classes participantes',
        'Quand les deux classes sont situées sur deux serveurs différents',
        'Quand il y a plus de 1000 objets créés en mémoire'
      ],
      correct: 1,
      exp: 'Une classe d’association modélise des informations relatives à la relation elle-même (ex: dateInscription, noteExamen) qui n’appartiennent ni à l’une ni à l’autre des entités prises isolément.'
    },
    {
      stem: 'Comment est représentée graphiquement la relation d’héritage (généralisation) entre deux classes en UML ?',
      opts: [
        'Un trait plein avec une flèche ouverte simple vers la classe fille',
        'Un trait plein terminé par un triangle blanc fermé pointant vers la classe mère',
        'Un trait tireté avec une croix',
        'Un losange noir des deux côtés'
      ],
      correct: 1,
      exp: 'L’héritage est matérialisé par un trait plein muni d’une tête de flèche en triangle fermé creux (blanc) dirigé vers la classe mère (le généralisateur).'
    }
  ],

  flashcards: [
    {
      q: 'Quels sont les symboles des 4 visibilités en UML 2.5 ?',
      a: '+ pour public, - pour privé, # pour protégé (accessible aux sous-classes), ~ pour paquetage.'
    },
    {
      q: 'Comment représente-t-on un attribut statique dans une classe UML ?',
      a: 'Le nom de l’attribut statique est obligatoirement souligné dans le compartiment des attributs.'
    },
    {
      q: 'Quelle est la différence fondamentale de cycle de vie entre agrégation et composition ?',
      a: 'En agrégation (&loz; creux), les parties survivent à la destruction du tout. En composition (&diams; plein), les parties sont obligatoirement détruites avec le composite.'
    },
    {
      q: 'Où se place le losange dans une relation tout-partie ?',
      a: 'Le losange se situe toujours du côté de l’objet composite / contenant (le tout).'
    },
    {
      q: 'Qu’est-ce qu’une classe d’association ?',
      a: 'Une classe rattachée par un trait tireté à une association pour porter des attributs propres à la relation entre deux entités.'
    },
    {
      q: 'Comment note-t-on graphiquement une classe abstraite en UML ?',
      a: 'Son nom est écrit en italique dans le compartiment supérieur, ou annoté de la propriété textuelle {abstract}.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez les symboles de visibilité, les multiplicités et la distinction agrégation vs composition.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bon niveau d’ensemble. Approfondissez les classes d’association et les subtilités du cycle de vie lié.' },
    { cls: 'good', text: '7/8 : Excellente maîtrise de la modélisation statique orientée objet en diagramme de classes.' },
    { cls: 'top', text: '8/8 : Parfait ! Vous maîtrisez les diagrammes de classes au niveau d’un architecte logiciel confirmé.' }
  ]
};
