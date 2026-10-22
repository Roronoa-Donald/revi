/**
 * Chapitres 4 à 6 du cours « Circuit logique & architecture des ordinateurs » B1.
 *
 * Chapitre 4 : circuits logiques combinatoires (portes, algèbre de Boole,
 *               synthèse, Karnaugh, additionneur, décodeur, multiplexeur).
 * Chapitre 5 : circuits séquentiels (bascules RS, D, JK ; registre à décalage,
 *               compteur, décompteur).
 * Chapitre 6 : architecture PC (von Neumann, familles, éléments constitutifs,
 *               périphériques, qualification d'un poste).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun
 * titre <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code
 * (trois exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-architecture.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Circuits logiques combinatoires',
    short: 'Circuits combinatoires',
    toc: 'Les huit portes (NOT, AND, NAND, OR, NOR, XOR, NXOR) ; règles d\'algèbre de Boole ; synthèse depuis une table de vérité ; simplification algébrique et par Karnaugh ; additionneur, comparateur, décodeur, multiplexeur.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Un processeur entier se réduit à des transistors câblés en portes logiques. Tout circuit ' +
      'combinatoire — dont la sortie ne dépend que des entrées présentes — se décrit par une table de ' +
      'vérité, se traduit en équation, puis se simplifie : ce chapitre déroule cette chaîne jusqu\'aux ' +
      'blocs que le TP câble (additionneur, décodeur, multiplexeur).',

    objectives: [
      'donner la table de vérité et le symbole des huit portes ;',
      'appliquer les règles d\'algèbre de Boole pour simplifier une expression ;',
      'synthétiser un circuit depuis sa table de vérité (mintermes, SOMME de produits) ;',
      'simplifier par Karnaugh avec la règle des bulles ;',
      'décrire additionneur, comparateur, décodeur et multiplexeur.'
    ],

    sections: [
      {
        title: 'Les huit portes logiques',
        html: [
          '<p>La <strong>NOT</strong> inverse (0→1, 1→0). La <strong>AND</strong> donne 1 si toutes les ' +
          'entrées valent 1 ; la <strong>NAND</strong> est sa négation. La <strong>OR</strong> donne 1 si au ' +
          'moins une entrée vaut 1 ; la <strong>NOR</strong> est sa négation. La <strong>XOR</strong> (OU ' +
          'exclusif) donne 1 si les entrées <em>diffèrent</em> — son équation : S = a·b&#772; + a&#772;·b — ' +
          'et la <strong>NXOR</strong> (équivalence) donne 1 si elles sont égales. Sur les symboles, la ' +
          'négation se marque par une <strong>bulle</strong> sur la sortie (NOT, NAND, NOR, NXOR).</p>',
          '<p>Règles d\'<strong>algèbre de Boole</strong> à connaître : a+0=a, a+1=1, a+a=a, a+a&#772;=1 ; ' +
          'a·0=0, a·1=a, a·a=a, a·a&#772;=0 ; involution (a&#772;)&#772;=a ; De Morgan : (a·b)&#772; = ' +
          'a&#772;+b&#772; et (a+b)&#772; = a&#772;·b&#772; — la barre se coupe et le produit devient somme.</p>',
          box('mnemo', 'Mnémotechnique — « AND exige tout, OR se contente d\'un, XOR aime la différence »', 'pin',
            '    <p>Trois portes, trois caractères : l\'exigeant, le tolérant, celui qui compare. Les trois ' +
            'autres portent juste une bulle de négation.</p>')
        ].join('\n')
      },
      {
        title: 'Synthèse depuis une table de vérité',
        html: [
          '<p>Marche du support : 1) dresser la <strong>table de vérité</strong> (2^k lignes pour k entrées) ; ' +
          '2) pour chaque ligne où la sortie vaut 1, écrire le <strong>minterme</strong> — produit des ' +
          'variables, complémentées quand elles valent 0 ; 3) faire la <strong>SOMME des produits</strong> ; ' +
          '4) simplifier. La table définit le comportement : le circuit s\'en déduit mécaniquement.</p>',
          '<p><strong>Simplification algébrique</strong> : factoriser et appliquer Boole. Exemple type : ' +
          'S = ab + ab&#772; = a(b + b&#772;) = a·1 = a. Une variable et son complément se neutralisent dans ' +
          'une somme ; un terme redondant disparaît (a + ab = a).</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Karnaugh : une variable toujours à 0 dans le bloc → complémentée ; toujours à 1 → non complémentée ; qui change → disparaît.</li>\n' +
            '      <li>Les groupes font 1, 2, 4, 8 cases — jamais 3 ni 6 ; les bords se recollent.</li>\n' +
            '      <li>De Morgan : couper la barre change ET en OU (et inversement).</li>\n' +
            '      <li>NXOR donne 1 sur les entrées égales : c\'est l\'équivalence, pas la différence.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Karnaugh et les blocs combinatoires',
        html: [
          '<p>Le <strong>Karnaugh</strong> place la table dans une grille où deux cases voisines ne diffèrent ' +
          'que d\'une variable : on regroupe en rectangles de 1, 2, 4, 8 cases (y compris en recollant les ' +
          'bords), puis on lit chaque groupe — variable constante à 0 → complémentée, constante à 1 → ' +
          'directe, qui change → éliminée. L\'ordre de remplissage suit le code Gray : 00, 01, 11, 10.</p>',
          '<p>Les <strong>blocs</strong> du support : l\'<strong>additionneur complet</strong> 1 bit calcule ' +
          'somme S = a ⊕ b ⊕ r (r = retenue entrante) et retenue sortante r&#8321; = ab + r(a ⊕ b) ; le ' +
          '<strong>comparateur</strong> sort a&gt;b, a=b, a&lt;b ; le <strong>décodeur</strong> 2 vers 4 ' +
          'active une sortie par combinaison d\'adresse ; le <strong>multiplexeur</strong> aiguille une des ' +
          '2^k entrées vers la sortie selon k bits de sélection — son inverse, le démultiplexeur, redistribue ' +
          'une entrée vers 2^k sorties.</p>',
          box('tech', 'Vérifier dans l’atelier', 'terminal',
            '    <ul>\n' +
            '      <li>L\'additionneur de l\'atelier : total = a + b + r ; S = total mod 2, retenue = total divisé par 2.</li>\n' +
            '      <li>Le décodeur : une adresse 2 bits allume une sortie parmi 4 (un seul 1 dans le mot).</li>\n' +
            '      <li>Les portes s\'écrivent avec les opérateurs du shell : && (ET), || (OU), != (différence, XOR).</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'La porte AND donne 1 si…', opts: ['au moins une entrée vaut 1', 'toutes les entrées valent 1', 'les entrées diffèrent'], correct: 1, exp: 'AND = produit logique : tout à 1.' },
      { q: 'La XOR donne 1 si les entrées…', opts: ['sont égales', 'diffèrent', 'valent 0'], correct: 1, exp: 'OU exclusif : les entrées diffèrent. NXOR = équivalence.' },
      { q: '(a·b)&#772; vaut…', opts: ['a&#772;·b&#772;', 'a&#772;+b&#772;', 'a+b'], correct: 1, exp: 'De Morgan : la barre se coupe, le produit devient somme.' },
      { q: 'a + ab simplifie en…', opts: ['a', 'b', 'ab'], correct: 0, exp: 'Absorption : a(1+b) = a.' },
      { q: 'Un groupe Karnaugh de 3 cases est…', opts: ['autorisé', 'interdit', 'obligatoire'], correct: 1, exp: 'Groupes de 1, 2, 4, 8… puissances de 2 seulement.' },
      { q: 'Dans un groupe où la variable vaut toujours 0, elle est…', opts: ['éliminée', 'complémentée', 'directe'], correct: 1, exp: 'Règle des bulles du support : toujours 0 → complémentée.' },
      { q: 'La somme d\'un additionneur complet vaut…', opts: ['a ⊕ b', 'a ⊕ b ⊕ r', 'ab + r'], correct: 1, exp: 'XOR des trois entrées, retenue entrante comprise.' },
      { q: 'Un multiplexeur à 4 entrées nécessite…', opts: ['1 bit de sélection', '2 bits', '4 bits'], correct: 1, exp: '2^k entrées : k bits de sélection, ici k = 2.' }
    ],

    pitfalls: [
      'Confondre XOR (différence) et NXOR (équivalence).',
      'Oublier que NAND et NOR nient leur porte de base : sorties opposées.',
      'Faire des groupes Karnaugh de 3 cases ou oublier le recollement des bords.',
      'Oublier la retenue entrante dans l\'additionneur complet.'
    ],

    methodTitle: 'Méthode — synthétiser un circuit en quatre gestes',
    method: [
      'Dresser la table de vérité : une ligne par combinaison des entrées.',
      'Écrire un minterme par sortie à 1 (variable complémentée si elle vaut 0).',
      'Simplifier : algèbre de Boole, puis Karnaugh avec groupes de puissances de 2.',
      'Dessiner le circuit : portes AND sur les mintermes, OR pour la somme.'
    ],

    summary: [
      'Huit portes : NOT, AND, NAND, OR, NOR, XOR, NXOR — bulle = négation.',
      'Boole : a+a&#772;=1, a·a&#772;=0, absorption, De Morgan.',
      'Synthèse : table de vérité → mintermes → somme de produits → simplification.',
      'Karnaugh : groupes de puissances de 2 ; additionneur, comparateur, décodeur, multiplexeur.'
    ],

    checklist: [
      'Je donne tables et symboles des huit portes.',
      'J\'applique De Morgan et l\'absorption sans erreur.',
      'Je synthétise une fonction depuis sa table de vérité.',
      'Je simplifie par Karnaugh et je connais les blocs usuels.'
    ],

    notions: [
      '<strong>Porte</strong> : circuit élémentaire à une fonction logique (NOT, AND, OR…).',
      '<strong>XOR</strong> : 1 si les entrées diffèrent ; NXOR : 1 si égales.',
      '<strong>De Morgan</strong> : (a·b)&#772; = a&#772;+b&#772; ; (a+b)&#772; = a&#772;·b&#772;.',
      '<strong>Minterme</strong> : produit des variables pour une ligne de table où la sortie vaut 1.',
      '<strong>Karnaugh</strong> : grille de simplification par groupements adjacents.',
      '<strong>Additionneur complet</strong> : S = a ⊕ b ⊕ r ; retenue = ab + r(a ⊕ b).',
      '<strong>Décodeur</strong> : active une sortie par combinaison des entrées d\'adresse.',
      '<strong>Multiplexeur</strong> : aiguille 2^k entrées vers une sortie selon k bits.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les tables des huit portes.' },
      { cls: 'mid', text: '50–69 % — refais la synthèse depuis une table simple.' },
      { cls: 'good', text: '70–94 % — cible Karnaugh et les blocs combinatoires.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les huit portes logiques ?', a: 'NOT, AND, NAND, OR, NOR, XOR, NXOR — les NAND, NOR et NXOR portent une bulle de négation.' },
      { q: 'Les deux formules de De Morgan ?', a: '(a·b)&#772; = a&#772;+b&#772; et (a+b)&#772; = a&#772;·b&#772;.' },
      { q: 'Règle des bulles de Karnaugh ?', a: 'Variable toujours à 0 → complémentée ; toujours à 1 → non complémentée ; qui change → éliminée.' },
      { q: 'Sorties de l\'additionneur complet 1 bit ?', a: 'S = a ⊕ b ⊕ r et r&#8321; = ab + r(a ⊕ b).' },
      { q: 'Rôle du multiplexeur ?', a: 'Sélectionner une entrée parmi 2^k selon k bits de commande et l\'aiguiller vers la sortie unique.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Circuits séquentiels : bascules, registres et compteurs',
    short: 'Circuits séquentiels',
    toc: 'Sortie dépendant de l\'histoire ; bascules RS, D et JK (front montant/descendant, set/reset asynchrones) ; registre à décalage ; compteur et décompteur.',
    time: '≈ 2 h de travail',

    situation:
      'Un circuit combinatoire oublie tout : ses sorties ne dépendent que de ses entrées présentes. Or une ' +
      'machine doit mémoriser — un bit, un mot, un compteur d\'instructions. Les circuits séquentiels ' +
      'ajoutent l\'horloge et la mémoire : la sortie dépend des entrées ET de l\'état antérieur.',

    objectives: [
      'distinguer circuit combinatoire et séquentiel ;',
      'décrire la bascule RS et son cas interdit ;',
      'expliquer la bascule D (recopie au front d\'horloge) ;',
      'maîtriser les quatre modes de la bascule JK ;',
      'décrire registre à décalage, compteur et décompteur.'
    ],

    sections: [
      {
        title: 'Les bascules RS et D',
        html: [
          'Un circuit est <strong>séquentiel</strong> quand sa sortie dépend des entrées présentes et de ' +
          'l\'état mémorisé, synchronisé par une <strong>horloge</strong> (front montant ou descendant). La ' +
          '<strong>bascule RS</strong> : R (reset) met Q à 0, S (set) met Q à 1, R=S=0 mémorise — et ' +
          '<strong>R=S=1 est interdit</strong> : les deux sorties deviennent identiques, ce que la logique ' +
          'prohibe. Les entrées <strong>set/reset asynchrones</strong> agissent immédiatement, hors horloge.</p>',
          '<p>La <strong>bascule D</strong> élimine le cas interdit : une seule entrée D, recopiée sur Q à ' +
          'chaque front d\'horloge actif — « D comme Data ». Entre deux fronts, l\'état se fige : c\'est le ' +
          'constituant de base des registres et des mémoires.</p>',
          box('mnemo', 'Mnémotechnique — « RS obéit et se dispute, D recopie, JK sait tout faire »', 'pin',
            '    <p>Trois bascules, trois caractères : RS (deux ordres qui peuvent se contredire), D ' +
            '(miroir de son entrée), JK (mémoriser, set, reset, basculer).</p>')
        ].join('\n')
      },
      {
        title: 'La bascule JK',
        html: [
          '<p>La <strong>JK</strong> généralise la RS sans cas interdit : <strong>J=0, K=0</strong> → ' +
          'mémorisation (Q ne change pas) ; <strong>J=1, K=0</strong> → set (Q=1) ; <strong>J=0, K=1</strong> → ' +
          'reset (Q=0) ; <strong>J=1, K=1</strong> → <strong>bascule</strong> (toggle : Q prend son ' +
          'complément). Ce dernier mode, interdit chez RS, fait de la JK le cœur des compteurs : un étage ' +
          'câblé en J=K=1 divise la fréquence par 2.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>R=S=1 reste interdit pour RS ; J=K=1 est au contraire le mode bascule de la JK.</li>\n' +
            '      <li>Front montant ≠ descendant : le moment d\'échantillonnage change, pas la table.</li>\n' +
            '      <li>Asynchrone = hors horloge (set/reset immédiats), pas « sans ordre ».</li>\n' +
            '      <li>La bascule D ne change pas d\'état entre deux fronts : elle recopie au front.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Registres et compteurs',
        html: [
          '<p>Un <strong>registre à décalage</strong> enchaîne n bascules D : à chaque front, chaque bit ' +
          'passe à la bascule voisine — entrée série, sortie série ou parallèle. Il sert aux conversions ' +
          'série/parallèle et aux décalages matériels (multiplication et division par 2^k du chapitre 3).</p>',
          '<p>Un <strong>compteur</strong> compte les fronts d\'horloge de 0 à 2^n-1 (modulo 2^n) puis ' +
          'recommence — un compteur modulo 8 sur 3 bits parcourt 000, 001 … 111 puis revient à 000. Le ' +
          '<strong>décompteur</strong> fait le chemin inverse. Réalisation typique : bascules JK câblées en ' +
          'bascule (J=K=1), chaque étage cadencé par la sortie du précédent. Dans l\'atelier, on applique le calcul modulo : valeur = (départ + front) mod 8.</p>',
          box('tech', 'Vérifier dans l’atelier', 'terminal',
            '    <ul>\n' +
            '      <li>La bascule D de l\'atelier : Q prend D à chaque front, l\'état final se lit après la boucle.</li>\n' +
            '      <li>La JK : if imbriqué 00/10/01/11 — le mode 11 inverse l\'état.</li>\n' +
            '      <li>Le compteur modulo 8 : (depart + i) mod 8, retours comptés par la division entière.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Un circuit séquentiel dépend…', opts: ['des entrées présentes seulement', 'des entrées ET de l\'état antérieur', 'de l\'horloge seulement'], correct: 1, exp: 'Il mémorise : l\'histoire compte, l\'horloge cadence.' },
      { q: 'La combinaison R=S=1 est…', opts: ['le mode bascule', 'interdite', 'la mémorisation'], correct: 1, exp: 'Sorties identiques Q=Q&#772; : interdit pour RS.' },
      { q: 'J=K=1 fait…', opts: ['mémoriser', 'basculer Q', 'interdire'], correct: 1, exp: 'Mode toggle : Q prend son complément — cœur des compteurs.' },
      { q: 'La bascule D recopie D sur Q…', opts: ['en continu', 'au front d\'horloge actif', 'quand R est actif'], correct: 1, exp: 'Échantillonnage au front ; entre deux fronts, état figé.' },
      { q: 'Un compteur modulo 8 sur 3 bits revient à 000 après…', opts: ['7 fronts', '8 fronts', '16 fronts'], correct: 1, exp: 'Il parcourt 0 à 7 : huit valeurs, retour au front suivant.' },
      { q: 'Un registre à décalage sert à…', opts: ['convertir série en parallèle (et inversement)', 'comparer deux bits', 'décoder une adresse'], correct: 0, exp: 'Les bits glissent de bascule en bascule à chaque front.' },
      { q: 'Un étage JK en J=K=1 divisé par 2 sert de…', opts: ['additionneur', 'diviseur de fréquence', 'multiplexeur'], correct: 1, exp: 'Un front sur deux change Q : fréquence divisée par 2.' },
      { q: 'Les entrées set/reset asynchrones agissent…', opts: ['au front montant', 'immédiatement, hors horloge', 'au front descendant'], correct: 1, exp: 'Asynchrone = hors horloge, effet immédiat.' }
    ],

    pitfalls: [
      'Croire que J=K=1 est interdit comme R=S=1 : chez JK c\'est le mode bascule.',
      'Oublier l\'horloge : sans front, la bascule D garde son état.',
      'Confondre compteur (0 → 2^n-1) et décompteur (2^n-1 → 0).',
      'Négliger l\'état initial d\'un compteur : le modulo part du départ donné.'
    ],

    methodTitle: 'Méthode — simuler une bascule en trois gestes',
    method: [
      'Initialiser Q à son état de départ avant la boucle des fronts.',
      'Appliquer la table au front : RS (set/reset/mémoire), D (recopie), JK (00/10/01/11).',
      'Afficher au fil des fronts puis l\'état final après la boucle.'
    ],

    summary: [
      'Séquentiel = entrées + état mémorisé, cadencé par l\'horloge (front montant ou descendant).',
      'RS : set, reset, mémoire — R=S=1 interdit ; set/reset asynchrones hors horloge.',
      'D : recopie au front ; JK : mémoriser, set, reset, basculer.',
      'Registre à décalage pour série/parallèle ; compteur modulo 2^n et décompteur.'
    ],

    checklist: [
      'Je distingue combinatoire et séquentiel.',
      'Je connais les tables RS et JK et le cas interdit.',
      'Je déroule une bascule D front par front.',
      'Je simule un compteur modulo n et je compte ses retours à zéro.'
    ],

    notions: [
      '<strong>Circuit séquentiel</strong> : sortie dépendant des entrées et de l\'état mémorisé.',
      '<strong>Horloge</strong> : signal qui cadence les changements (fronts montant/descendant).',
      '<strong>Bascule RS</strong> : set, reset, mémoire ; R=S=1 interdit.',
      '<strong>Bascule D</strong> : recopie D sur Q au front d\'horloge.',
      '<strong>Bascule JK</strong> : 00 mémoire, 10 set, 01 reset, 11 bascule.',
      '<strong>Asynchrone</strong> : agit hors horloge (set/reset immédiats).',
      '<strong>Registre à décalage</strong> : n bascules enchaînées, décalage à chaque front.',
      '<strong>Compteur modulo 2^n</strong> : compte de 0 à 2^n-1 puis repart à 0.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les tables RS et JK.' },
      { cls: 'mid', text: '50–69 % — déroule une bascule D et une JK pas à pas.' },
      { cls: 'good', text: '70–94 % — cible registre à décalage et compteurs.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Différence combinatoire / séquentiel ?', a: 'Combinatoire : sortie = f(entrées présentes). Séquentiel : sortie = f(entrées, état antérieur), cadencée par l\'horloge.' },
      { q: 'La table de la bascule JK ?', a: 'J=0 K=0 : mémoire. J=1 K=0 : set. J=0 K=1 : reset. J=1 K=1 : bascule (toggle).' },
      { q: 'Pourquoi R=S=1 est-il interdit ?', a: 'Les deux sorties deviennent égales (Q = Q&#772;), ce que la logique prohibe.' },
      { q: 'Rôle du registre à décalage ?', a: 'Décaler les bits de bascule en bascule à chaque front : conversion série/parallèle.' },
      { q: 'Fonctionnement d\'un compteur modulo 8 ?', a: 'Il compte 0 à 7 puis repart à 0 ; valeur = (départ + fronts) mod 8.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Architecture d\'un PC et périphériques',
    short: 'Architecture PC',
    toc: 'Modèle de von Neumann (UAL, unité de contrôle, mémoire, E/S) ; familles de machines ; éléments constitutifs du PC (alimentation, carte mère, processeur, RAM, disque, cartes) ; types de périphériques ; critères de choix d\'un processeur.',
    time: '≈ 2 h de travail',

    situation:
      'Le schéma de von Neumann (1945) structure encore chaque ordinateur : une unité arithmétique et ' +
      'logique calcule, une unité de contrôle orchestre, la mémoire conserve programmes et données, les ' +
      'entrées-sorties dialoguent avec le monde. Ce chapitre relie ce modèle aux composants que l\'on ' +
      'achète — et aux critères qui font un bon poste.',

    objectives: [
      'décrire les quatre parties du modèle de von Neumann ;',
      'placer chaque composant dans son bloc fonctionnel ;',
      'citer les éléments constitutifs d\'un PC et le rôle de chacun ;',
      'classer les périphériques : entrée, sortie, entrée-sortie ;',
      'choisir un processeur : fréquence, cœurs, cache, compatibilité socket.'
    ],

    sections: [
      {
        title: 'Le modèle de von Neumann',
        html: [
          '<p>Quatre parties : l\'<strong>UAL</strong> (unité arithmétique et logique) exécute calculs et ' +
          'comparaisons ; l\'<strong>unité de contrôle</strong> (ou de commande) décode les instructions et ' +
          'synchronise le tout ; la <strong>mémoire</strong> — volatile (RAM) ou permanente (ROM, disque) — ' +
          'conserve programmes et données ; les <strong>entrées-sorties</strong> relient la machine au ' +
          'monde extérieur. L\'idée fondatrice : le programme est stocké dans la même mémoire que les ' +
          'données, d\'où la souplesse de l\'ordinateur moderne.</p>',
          '<p>Les <strong>familles</strong> de machines suivent l\'échelle : <strong>mainframe</strong> ' +
          '(centres de calcul, milliers d\'utilisateurs), serveurs, <strong>desktop</strong> (tour fixe, ' +
          'évolutive), <strong>laptop</strong> (portable, énergie limitée), sans oublier tablettes et ' +
          'systèmes embarqués. L\'architecture reste la même ; la taille et la puissance changent.</p>',
          box('mnemo', 'Mnémotechnique — « l\'UAL calcule, le contrôle commande, la mémoire se souvient, les E/S parlent »', 'pin',
            '    <p>Quatre verbes, quatre blocs : calculer, commander, se souvenir, communiquer.</p>')
        ].join('\n')
      },
      {
        title: 'Les éléments constitutifs du PC',
        html: [
          '<p>Le <strong>bloc d\'alimentation</strong> convertit le courant du secteur en tensions adaptées ' +
          '(12 V, 5 V, 3,3 V). La <strong>carte mère</strong> connecte tout : socket du processeur, slots ' +
          'DIMM de la RAM, ports SATA pour les disques, PCIe pour les cartes d\'extension, chipset qui ' +
          'orchestre les communications, BIOS/UEFI qui initialise au démarrage, pile CMOS qui garde l\'heure ' +
          'et les réglages hors tension.</p>',
          '<p>Le <strong>processeur</strong> (CPU) — unité de contrôle + UAL + registres + caches — exécute ' +
          'les instructions ; sa <strong>fréquence</strong> (GHz), son <strong>nombre de cœurs</strong>, la ' +
          'taille de son <strong>cache</strong> et sa <strong>compatibilité socket</strong> sont les quatre ' +
          'critères de choix du support. La <strong>RAM</strong> stocke les données en cours (volatile) ; ' +
          'le <strong>disque</strong> dur ou SSD conserve durablement (le SSD, sans partie mécanique, est ' +
          'beaucoup plus rapide) ; les <strong>cartes</strong> (graphique, réseau, son) ajoutent des ' +
          'fonctions spécialisées.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>La RAM est volatile : coupure de courant = perte ; ROM et disque sont permanents.</li>\n' +
            '      <li>Le BIOS/UEFI initialise, il n\'exécute pas vos applications.</li>\n' +
            '      <li>Le SSD n\'a pas de plateau mécanique : vitesse et silence, pas seulement de la capacité.</li>\n' +
            '      <li>Un écran tactile est un périphérique entrée ET sortie, pas seulement sortie.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Périphériques et qualification d\'un poste',
        html: [
          '<p>Trois familles : en <strong>entrée</strong> (clavier, souris, scanner, micro, caméra — vers ' +
          'l\'unité centrale), en <strong>sortie</strong> (écran, imprimante, haut-parleurs — depuis ' +
          'l\'unité centrale), et <strong>entrée-sortie</strong> (écran tactile, modem, clé USB, disque ' +
          'externe, carte réseau). Les <strong>ports</strong> — USB, HDMI, VGA, DVI, DisplayPort, SATA, ' +
          'PCIe, M.2 — relient ces périphériques à la carte mère.</p>',
          '<p><strong>Qualifier un poste</strong> croise deux axes du support : les quatre critères du ' +
          'processeur (fréquence, cœurs, cache, socket) et la RAM. Un poste <strong>multimédia</strong> ' +
          'exige une fréquence élevée et beaucoup de RAM (≥ 2000 MHz et ≥ 4096 Mo dans l\'atelier) ; la ' +
          '<strong>bureautique</strong> se contente d\'un niveau intermédiaire (≥ 1000 MHz et ≥ 2048 Mo) ; ' +
          'en dessous, le poste est <strong>basique</strong>. Connecteurs vidéo à connaître : HDMI, VGA, ' +
          'DVI, DisplayPort.</p>',
          box('tech', 'Vérifier dans l’atelier', 'terminal',
            '    <ul>\n' +
            '      <li>Le classeur de périphériques de l\'atelier : un case par famille (entree/sortie/double).</li>\n' +
            '      <li>Le classeur von Neumann : ual → calcul, ucc → controle, ram/rom/disque → memoire, clavier/ecran → es.</li>\n' +
            '      <li>La qualification : deux seuils avec -ge, test du profil le plus exigeant d\'abord.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'L\'UAL exécute…', opts: ['les calculs et comparaisons', 'le décodage des instructions', 'le stockage permanent'], correct: 0, exp: 'Unité arithmétique et logique : calculs et comparaisons.' },
      { q: 'L\'idée fondatrice de von Neumann :', opts: ['plusieurs processeurs', 'programme stocké dans la même mémoire que les données', 'mémoire infinie'], correct: 1, exp: 'Programme et données partagent la mémoire : machine universelle et programmable.' },
      { q: 'La RAM est une mémoire…', opts: ['permanente', 'volatile', 'de masse'], correct: 1, exp: 'Volatile : son contenu disparaît hors tension.' },
      { q: 'Le composant qui initialise la machine au démarrage :', opts: ['BIOS/UEFI', 'chipset', 'SSD'], correct: 0, exp: 'BIOS/UEFI : microprogramme de démarrage sur la carte mère.' },
      { q: 'Le slot d\'une carte graphique dédiée :', opts: ['PCIe x16', 'DIMM', 'SATA'], correct: 0, exp: 'PCIe x16 : haut débit pour la carte graphique.' },
      { q: 'Un écran tactile est un périphérique…', opts: ['d\'entrée', 'de sortie', 'd\'entrée-sortie'], correct: 2, exp: 'Il affiche (sortie) et reçoit le toucher (entrée).' },
      { q: 'Quatre critères de choix d\'un processeur :', opts: ['fréquence, cœurs, cache, socket', 'couleur, poids, prix, taille', 'RAM, disque, écran, clavier'], correct: 0, exp: 'Les quatre critères du support.' },
      { q: 'M.2 est le slot d\'un…', opts: ['SSD NVMe', 'processeur', 'écran'], correct: 0, exp: 'M.2 accueille les SSD NVMe ; le CPU va au socket.' }
    ],

    pitfalls: [
      'Placer le disque dur dans la mémoire volatile : il est permanent.',
      'Confondre socket (processeur) et DIMM (RAM) sur la carte mère.',
      'Citer l\'écran comme périphérique d\'entrée : il est de sortie (sauf tactile).',
      'Choisir un CPU sans vérifier la compatibilité socket de la carte mère.'
    ],

    methodTitle: 'Méthode — qualifier un poste en trois gestes',
    method: [
      'Classer chaque composant : calcul (UAL), contrôle, mémoire, E/S.',
      'Vérifier les quatre critères CPU : fréquence, cœurs, cache, socket.',
      'Comparer aux seuils : multimédia (2000 MHz / 4096 Mo), bureautique (1000 MHz / 2048 Mo), sinon basique.'
    ],

    summary: [
      'Von Neumann : UAL, unité de contrôle, mémoire (volatile + permanente), E/S.',
      'Familles : mainframe, serveur, desktop, laptop, embarqué.',
      'Carte mère : socket, DIMM, SATA, PCIe, chipset, BIOS/UEFI, pile CMOS.',
      'Périphériques entrée / sortie / entrée-sortie ; CPU : fréquence, cœurs, cache, socket.'
    ],

    checklist: [
      'Je décris les quatre blocs de von Neumann.',
      'Je place chaque composant du PC dans son bloc.',
      'Je classe un périphérique en entrée, sortie ou entrée-sortie.',
      'Je qualifie un poste à partir de la fréquence et de la RAM.'
    ],

    notions: [
      '<strong>Von Neumann</strong> : modèle à quatre parties, programme stocké en mémoire.',
      '<strong>UAL</strong> : unité arithmétique et logique — calculs et comparaisons.',
      '<strong>Carte mère</strong> : carte qui connecte tous les composants.',
      '<strong>BIOS/UEFI</strong> : microprogramme qui initialise la machine au démarrage.',
      '<strong>RAM / ROM</strong> : mémoire volatile / permanente.',
      '<strong>SSD</strong> : stockage permanent sans partie mécanique, plus rapide que le HDD.',
      '<strong>Périphérique E/S</strong> : à la fois entrée et sortie (écran tactile, modem).',
      '<strong>Socket</strong> : support du processeur — critère de compatibilité.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les quatre blocs de von Neumann.' },
      { cls: 'mid', text: '50–69 % — refais le classement des composants et périphériques.' },
      { cls: 'good', text: '70–94 % — cible les slots et connecteurs de la carte mère.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les quatre parties de von Neumann ?', a: 'UAL (calcul), unité de contrôle, mémoire (volatile et permanente), entrées-sorties.' },
      { q: 'Rôle de la carte mère ?', a: 'Connecter et faire communiquer tous les composants : CPU, RAM, disques, cartes, périphériques.' },
      { q: 'RAM contre ROM ?', a: 'RAM : volatile, données en cours de traitement. ROM : permanente, microprogrammes (BIOS).' },
      { q: 'Les quatre critères de choix d\'un processeur ?', a: 'Fréquence (GHz), nombre de cœurs, taille du cache, compatibilité socket.' },
      { q: 'Trois familles de périphériques ?', a: 'Entrée (clavier, souris, scanner), sortie (écran, imprimante, HP), entrée-sortie (écran tactile, modem).' }
    ]
  }
];
