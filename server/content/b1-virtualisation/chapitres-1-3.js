/**
 * Chapitres 1 à 3 du cours « Virtualisation des serveurs » B1, construits sur
 * le support B1 du module (dossier « cours B1 IT / Virtualisation des
 * serveurs ») : l'histoire « Le serveur fainéant et les machines ambitieuses »
 * et ses questions de compréhension, d'analyse technique et de réflexion.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun
 * titre <h2> ici : la numérotation est ajoutée au rendu, et les trois
 * exercices de code sont injectés avant le QCM par le générateur.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Le serveur fainéant : le constat',
    short: 'Le serveur fainéant',
    toc: 'L’histoire d’ouverture, le gaspillage des 80 %, un service par serveur, la facture d’électricité.',
    time: '≈ 1 h 30 de travail',
    free: true,

    situation:
      'Il était une fois un serveur physique très puissant, mais très paresseux. Il n’aimait faire qu’une ' +
      'seule tâche à la fois : héberger un seul système d’exploitation et un seul service. Résultat : il ' +
      'passait 80 % de son temps à ne rien faire — il s’ennuyait, dormait, et mangeait de l’électricité ' +
      'pour rien. Ce chapitre prend le constat au sérieux : avant de parler technique, il faut savoir ' +
      'mesurer un gaspillage.',

    objectives: [
      'raconter la situation de départ : un serveur, un service, 80 % d’inactivité ;',
      'mesurer le temps perdu d’un parc serveur heure par heure ;',
      'repérer les serveurs mono-service et chiffrer leur coût ;',
      'relier l’inactivité à la facture d’électricité.'
    ],

    sections: [
      {
        title: 'L’histoire d’ouverture',
        html: [
          '<p>Le support commence comme un conte : un serveur physique très puissant, mais <strong>très ' +
          'paresseux</strong>. Il n’aimait faire qu’une seule tâche à la fois : héberger <strong>un seul ' +
          'système d’exploitation</strong> et <strong>un seul service</strong>, comme un site web ou une ' +
          'base de données.</p>',
          '<p>Le problème : il passait <strong>80 % de son temps à ne rien faire</strong>. Il s’ennuyait, ' +
          'dormait, et mangeait de l’électricité pour rien.</p>',
          '<p>Un jour, un ingénieur IT eut une idée : « Et si on utilisait la <strong>virtualisation</strong> ? ' +
          'On pourrait faire croire au serveur qu’il héberge plusieurs machines… alors qu’en réalité, ce sont ' +
          'juste des machines virtuelles qui partagent ses ressources ! »</p>',
          box('intuition', 'Pourquoi une histoire ?', 'compass',
            '    <p>Parce qu’une idée technique se retient quand elle a un personnage. Le serveur fainéant, ' +
            'c’est le parc informatique réel : des machines coûteuses, sous-utilisées, qui tournent à vide ' +
            'parce qu’on a hérité de la règle « un service, un serveur ».</p>')
        ].join('\n')
      },
      {
        title: 'Mesurer le gaspillage',
        html: [
          '<p>Le « 80 % » de l’histoire n’est pas une plaisanterie : c’est une donnée qui se mesure. Sur une ' +
          'heure de 60 minutes, 80 % d’inactivité = <strong>48 minutes à ne rien faire</strong>. Un serveur ' +
          'dont une heure compte au moins 48 minutes creuses est une heure perdue.</p>',
          '<p>Le constat se fait parc par parc : combien de serveurs hébergent <strong>moins de deux ' +
          'services</strong> ? Chacun d’eux reproduit le profil du serveur fainéant — puissant, payé, ' +
          'endormi. Le coût du gaspillage se chiffre : 80 % du coût mensuel de chaque serveur mono-service ' +
          'part en fumée.</p>',
          box('mnemo', 'Le calcul du fainéant', 'pin',
            '    <p>80 % d’une heure = 48 minutes. Moins de 2 services = serveur fainéant. Gaspillage = ' +
            '80 % de son coût. Trois nombres à retenir : <strong>48, 2, 80 %</strong> — le reste du cours ' +
            'en découle.</p>')
        ].join('\n')
      },
      {
        title: 'La facture d’électricité',
        html: [
          '<p>« Il mangeait de l’électricité pour rien » : l’énergie d’un serveur se calcule en deux ' +
          'multiplications. Une machine qui consomme <strong>W watts</strong> pendant <strong>H heures</strong> ' +
          'a consommé <code>W × H / 1000</code> kilowattheures. À 100 francs le kWh, la facture suit ' +
          'immédiatement.</p>',
          '<p>Exemple du cours : 500 W pendant 720 heures (un mois), cela fait 360 kWh — 36 000 FCFA pour ' +
          'une machine qui dort les trois quarts du temps. Sur un parc de dix fainéants, la facture du vide ' +
          'se compte en centaines de milliers.</p>',
          box('pitfall', 'Piège — confondre puissance et énergie', 'warning',
            '    <p>Le watt mesure la <strong>puissance</strong> à un instant donné ; le kilowattheure ' +
            'mesure l’<strong>énergie</strong> consommée dans le temps. Un serveur de 500 W qui marche une ' +
            'heure consomme 0,5 kWh — pas 500 « quelque chose ».</p>')
        ].join('\n')
      },
      {
        title: 'Et maintenant ?',
        html: [
          '<p>L’histoire pose la bonne question au bon moment : « Et si on utilisait la virtualisation ? » ' +
          'Avant de découvrir la réponse au chapitre suivant, le constat doit être inattaquable : heures ' +
          'perdues, serveurs mono-service, facture du vide. C’est ce dossier chiffré qui convaincra le ' +
          'responsable informatique au chapitre 6.</p>',
          box('tech', 'Les exercices de ce chapitre', 'terminal',
            '    <p>Trois scripts : classer les heures perdues au seuil des 48 minutes, repérer les ' +
            'fainéants et chiffrer leur gaspillage, calculer la facture d’électricité du parc. La logique — ' +
            'lire, décider, rapporter — se programme en Bash et s’exécute réellement dans la page.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Pourquoi le serveur est-il qualifié de « fainéant » ?', opts: ['il passait 80 % de son temps à ne rien faire', 'il refusait les mises à jour', 'il était trop lent'], correct: 0, exp: 'Un seul système, un seul service, 80 % d’inactivité : la définition exacte de l’histoire.' },
      { q: 'Que faisait le serveur avec son temps libre ?', opts: ['il dormait et mangeait de l’électricité pour rien', 'il compilait des projets', 'il aidait les autres serveurs'], correct: 0, exp: 'L’histoire insiste : il s’ennuyait et coûtait de l’électricité à vide.' },
      { q: '80 % d’une heure, c’est…', opts: ['48 minutes', '60 minutes', '30 minutes'], correct: 0, exp: '0,8 × 60 = 48 minutes — le seuil du calcul du fainéant.' },
      { q: 'Un serveur mono-service héberge…', opts: ['moins de deux services', 'exactement dix services', 'aucun service'], correct: 0, exp: 'Moins de 2 services : le profil du fainéant.' },
      { q: 'L’énergie consommée par 500 W pendant 720 h vaut…', opts: ['360 kWh', '360 000 W', '36 kWh'], correct: 0, exp: '500 × 720 / 1000 = 360 kWh.' },
      { q: 'Le service hébergé en premier dans l’histoire…', opts: ['un site web ou une base de données', 'un jeu vidéo', 'un serveur de mail'], correct: 0, exp: 'L’histoire cite « un site web ou une base de données » comme unique service.' },
      { q: 'Le gaspillage d’un fainéant se chiffre à…', opts: ['80 % de son coût', '100 % de son coût', '50 % de son coût'], correct: 0, exp: 'Il tourne à vide 80 % du temps : 80 % du coût part pour rien.' },
      { q: 'Qui a l’idée de la virtualisation dans l’histoire ?', opts: ['un ingénieur IT', 'le serveur lui-même', 'les machines virtuelles'], correct: 0, exp: 'Un jour, un ingénieur IT eut cette idée.' }
    ],

    pitfalls: [
      'Confondre puissance (W) et énergie (kWh) dans le calcul de la facture.',
      'Déclarer un serveur fainéant sans avoir mesuré : le 80 % se constate, il ne se devine pas.',
      'Oublier que l’inactivité coûte aussi de l’électricité, pas seulement l’achat.',
      'Chercher une solution technique avant d’avoir chiffré le problème.'
    ],

    methodTitle: 'Construire le constat',
    method: [
      'Mesurer l’inactivité heure par heure et compter les heures perdues (seuil 48 minutes).',
      'Lister les serveurs à moins de deux services et chiffrer 80 % de leur coût.',
      'Traduire le tout en facture d’électricité : le langage que les responsables comprennent.'
    ],

    summary: [
      'Un serveur puissant + un seul service = 80 % du temps à ne rien faire.',
      'Le gaspillage se mesure : heures perdues, serveurs mono-service, facture du vide.',
      '48 minutes, 2 services, 80 % : les trois nombres du constat.',
      'L’énergie se calcule : watt × heures / 1000 = kWh, puis × prix = facture.'
    ],

    checklist: [
      'Je raconte le constat de l’histoire en trois phrases.',
      'Je calcule les heures perdues et le gaspillage d’un parc.',
      'Je convertis watts et heures en kWh et en francs.',
      'Je sais expliquer pourquoi le 80 % se mesure avant de se résoudre.'
    ],

    notions: [
      'serveur fainéant',
      'mono-service',
      'taux d’inactivité',
      'heure perdue',
      'kilowattheure (kWh)',
      'gaspillage',
      'parc physique',
      'constat chiffré'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis l’histoire et refais les calculs des 48 minutes.' },
      { cls: 'mid', text: '50–69 % — rejoue les exercices jusqu’aux bilans sans faute.' },
      { cls: 'good', text: '70–89 % — solide : chiffre le gaspillage d’un parc fictif.' },
      { cls: 'top', text: '≥ 95 % — maîtrise : passe au remède, la virtualisation.' }
    ],

    flashcards: [
      { q: 'Les trois nombres du constat ?', a: '48 minutes (80 % d’une heure), 2 services (seuil du fainéant), 80 % du coût (gaspillage).' },
      { q: 'Que faisait le serveur fainéant ?', a: 'Un seul système, un seul service, 80 % du temps à ne rien faire, de l’électricité pour rien.' },
      { q: 'Le calcul du kWh ?', a: 'Puissance (W) × heures / 1000 = kWh ; à 100 F le kWh, la facture suit.' },
      { q: 'Qui a l’idée de la virtualisation ?', a: 'Un ingénieur IT — « et si on utilisait la virtualisation ? ».' },
      { q: 'Pourquoi chiffrer avant d’agir ?', a: 'Un constat chiffré (heures, coûts, facture) convainc ; une impression ne convainc personne.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'La virtualisation et le partage des ressources',
    short: 'Le partage des ressources',
    toc: 'L’idée de l’ingénieur, la colère du serveur, la promesse des VM : mémoire, processeur, disque.',
    time: '≈ 2 h de travail',

    situation:
      'La colère du serveur est franchie : « Faire le travail de plusieurs serveurs ? Vous êtes fous ! » ' +
      'Les machines virtuelles répondent calmement : « On va se partager ta mémoire, ton processeur et ' +
      'même ton disque dur. Et on ne prendra chacun que ce dont on a besoin. » Ce chapitre prend la ' +
      'promesse au mot : allouer sans dépasser, partager sans violer.',

    objectives: [
      'expliquer la proposition de l’ingénieur : plusieurs machines, un seul serveur physique ;',
      'citer les ressources partagées de l’histoire : mémoire, processeur, disque ;',
      'allouer des ressources demandées sans dépasser la capacité restante ;',
      'retenir l’ordre exact de la conversation de l’histoire.'
    ],

    sections: [
      {
        title: 'L’idée : faire croire au serveur',
        html: [
          '<p>La proposition de l’ingénieur tient en une phrase : « faire croire au serveur qu’il héberge ' +
          'plusieurs machines… alors qu’en réalité, ce sont juste des <strong>machines virtuelles</strong> ' +
          'qui partagent ses ressources ! »</p>',
          '<p>Chaque machine virtuelle se comporte comme un ordinateur complet — son propre système, ses ' +
          'propres applications — mais tout cela n’est qu’un partage organisé du matériel physique du ' +
          'serveur hôte.</p>',
          box('intuition', 'La définition à retenir', 'compass',
            '    <p>La virtualisation, c’est faire tourner <strong>plusieurs machines indépendantes sur un ' +
            'seul matériel physique</strong>, en partageant ses ressources. Le serveur ne travaille pas ' +
            'plus : il travaille <strong>mieux</strong>.</p>')
        ].join('\n')
      },
      {
        title: 'Ce qui se partage',
        html: [
          '<p>Les VM de l’histoire sont précises : « on va se partager ta <strong>mémoire</strong>, ton ' +
          '<strong>processeur</strong> et même ton <strong>disque dur</strong> ».</p>',
          '<table>\n' +
          '    <tr><th>Ressource</th><th>Partage</th></tr>\n' +
          '    <tr><td>Mémoire (RAM)</td><td>répartie entre les VM selon leurs besoins déclarés</td></tr>\n' +
          '    <tr><td>Processeur</td><td>temps de calcul partagé entre toutes les machines</td></tr>\n' +
          '    <tr><td>Disque</td><td>espace de stockage découpé entre les VM</td></tr>\n' +
          '  </table>',
          '<p>Certaines ressources peuvent rester dédiées (une carte réseau réservée à une VM, par exemple) : ' +
          'le partage est une <strong>règle par défaut</strong>, pas un dogme.</p>',
          box('mnemo', 'Mémoire, processeur, disque', 'pin',
            '    <p>Les trois ressources de la promesse — dans cet ordre dans l’histoire : mémoire, ' +
            'processeur, disque. C’est le vocabulaire des exercices d’allocation du chapitre.</p>')
        ].join('\n')
      },
      {
        title: '« On ne prendra que ce dont on a besoin »',
        html: [
          '<p>La seconde moitié de la promesse est une règle d’allocation : chaque VM demande ce dont elle a ' +
          'besoin, et <strong>le total des demandes ne dépasse pas la capacité</strong> du serveur. Allouer, ' +
          'c’est donc un contrôle à deux conditions : la mémoire demandée tient-elle dans le reste ' +
          'disponible ? le disque demandé tient-il dans le reste disponible ? Si oui, la VM est allouée et ' +
          'les restes diminuent ; si non, elle est refusée — et <strong>rien n’est consommé</strong>.</p>',
          '<p>Exemple du cours : un serveur de 64 Go de RAM et 500 Go de disque. La VM web (16 Go, 50 Go) ' +
          'passe ; la VM base (32 Go, 200 Go) passe ; la VM test (32 Go, 400 Go) est refusée — il ne reste ' +
          'que 16 Go et 250 Go. Le refus n’est pas un échec : c’est la promesse tenue.</p>',
          box('pitfall', 'Piège — allouer avant de contrôler', 'warning',
            '    <p>Une ressource refusée ne doit jamais être décomptée. Contrôler d’abord (les deux ' +
            'conditions en même temps), allouer ensuite. Sinon le serveur promet ce qu’il n’a plus.</p>')
        ].join('\n')
      },
      {
        title: 'La conversation, dans l’ordre',
        html: [
          '<p>L’histoire suit un déroulé exact — que les exercices rejouent étape par étape :</p>',
          '<ol>\n' +
          '    <li>l’<strong>ingénieur</strong> propose l’idée de la virtualisation ;</li>\n' +
          '    <li>le <strong>serveur</strong> se réveille en sursaut et refuse (« Vous êtes fous ! ») ;</li>\n' +
          '    <li>les <strong>machines virtuelles</strong> proposent le partage des ressources ;</li>\n' +
          '    <li>le <strong>serveur</strong> accepte — et se retrouve rentabilisé à 100 %.</li>\n' +
          '  </ol>',
          box('tech', 'Les exercices de ce chapitre', 'terminal',
            '    <p>Classer les ressources partagées, allouer les demandes sans dépasser la capacité, rejouer ' +
            'la conversation dans l’ordre. Trois scripts qui transforment la fable en règles programmables.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'La virtualisation permet de…', opts: ['faire tourner plusieurs machines sur un seul matériel', 'acheter plus de serveurs', 'supprimer les sauvegardes'], correct: 0, exp: 'Plusieurs machines indépendantes, un seul serveur physique, des ressources partagées.' },
      { q: 'Les ressources partagées de l’histoire sont…', opts: ['mémoire, processeur, disque', 'clavier, écran, souris', 'réseau seul'], correct: 0, exp: 'La promesse des VM : « ta mémoire, ton processeur et même ton disque dur ».' },
      { q: 'La règle d’allocation des VM est…', opts: ['ne prendre que ce dont on a besoin', 'prendre tout ce qui reste', 'prendre sans déclarer'], correct: 0, exp: '« On ne prendra chacun que ce dont on a besoin » — et le total tient dans la capacité.' },
      { q: 'Une VM refusée…', opts: ['ne consomme rien', 'consomme quand même', 'détruit les autres VM'], correct: 0, exp: 'Contrôler d’abord, allouer ensuite : le refus ne touche pas aux restes.' },
      { q: 'La première réaction du serveur est…', opts: ['la colère — « Vous êtes fous ! »', 'la joie', 'l’indifférence'], correct: 0, exp: 'Il se réveille en sursaut et refuse, avant d’accepter à l’étape 4.' },
      { q: 'Qui propose le partage des ressources ?', opts: ['les machines virtuelles', 'l’ingénieur', 'le disque'], correct: 0, exp: 'Les VM, très enthousiastes, répondent au serveur fâché.' },
      { q: '64 Go, 500 Go : web (16/50) puis base (32/200) laissent…', opts: ['16 Go et 250 Go', '0 Go et 0 Go', '32 Go et 250 Go'], correct: 0, exp: '64−16−32 = 16 Go ; 500−50−200 = 250 Go — la VM test (32/400) sera refusée.' },
      { q: 'Le partage est…', opts: ['une règle par défaut qui admet des exceptions', 'un dogme absolu', 'une option payante'], correct: 0, exp: 'Certaines ressources peuvent rester dédiées à une VM : le partage reste la règle par défaut.' }
    ],

    pitfalls: [
      'Décompter les ressources d’une VM refusée : le contrôle précède l’allocation.',
      'Ne contrôler que la mémoire et oublier le disque : les deux conditions sont simultanées.',
      'Mémoriser la conversation dans le désordre : idée, colère, partage, acceptation.',
      'Croire que tout se partage : certaines ressources peuvent rester dédiées.'
    ],

    methodTitle: 'Allouer comme les VM de l’histoire',
    method: [
      'Fixer la capacité du serveur : RAM et disque, une seule fois.',
      'Pour chaque demande : vérifier les DEUX restes, puis allouer ou refuser sans toucher aux réserves.',
      'Reporter les restes après chaque allocation : c’est le bilan de fin.'
    ],

    summary: [
      'La virtualisation = plusieurs machines indépendantes sur un seul matériel, ressources partagées.',
      'Mémoire, processeur, disque : les trois ressources de la promesse.',
      'On n’alloue que si la demande tient dans les restes — sinon refus sans consommation.',
      'La conversation a un ordre : idée, colère, partage, acceptation.'
    ],

    checklist: [
      'Je définis la virtualisation en une phrase d’histoire.',
      'Je cite les trois ressources partagées sans regarder.',
      'Je calcule les restes après chaque allocation (RAM et disque).',
      'Je rejoue la conversation dans l’ordre exact.'
    ],

    notions: [
      'machine virtuelle',
      'serveur hôte',
      'ressources partagées',
      'mémoire (RAM)',
      'processeur',
      'stockage (disque)',
      'allocation',
      'capacité restante'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis la promesse des VM et refais l’allocation d’exemple.' },
      { cls: 'mid', text: '50–69 % — rejoue l’exercice d’allocation jusqu’au sans-faute.' },
      { cls: 'good', text: '70–89 % — solide : dimensionne un serveur pour un parc de VM fictif.' },
      { cls: 'top', text: '≥ 95 % — maîtrise : passe aux services que l’histoire virtualise.' }
    ],

    flashcards: [
      { q: 'La définition de la virtualisation selon l’histoire ?', a: 'Faire croire au serveur qu’il héberge plusieurs machines — des VM qui partagent ses ressources.' },
      { q: 'Les trois ressources partagées ?', a: 'La mémoire, le processeur et même le disque dur.' },
      { q: 'La règle d’or d’allocation ?', a: 'Ne prendre que ce dont on a besoin — contrôler les deux restes AVANT d’allouer.' },
      { q: 'Les quatre étapes de la conversation ?', a: 'Ingénieur (idée), serveur (colère), VM (partage), serveur (acceptation).' },
      { q: 'Une demande refusée consomme…', a: 'Rien du tout : le refus ne touche pas aux capacités restantes.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Les services virtualisés de l’histoire',
    short: 'Les services virtualisés',
    toc: 'Base de données, site web, pare-feu virtuel, serveur de test : l’inventaire et la charge.',
    time: '≈ 2 h de travail',

    situation:
      'La fin de l’histoire donne l’inventaire : le serveur « hébergeait maintenant une base de données, ' +
      'un site web, un pare-feu virtuel et même un serveur de test. Et pour une fois, il ne s’ennuyait ' +
      'plus ! » Quatre services très différents vivent désormais ensemble. Ce chapitre apprend à inventorier ' +
      'ce qui tourne et à surveiller la charge de chacun.',

    objectives: [
      'citer les quatre services virtualisés et leur rôle ;',
      'classer chaque service dans sa catégorie : données, publication, protection, recette ;',
      'dresser l’inventaire des VM par type de service, dans l’ordre d’apparition ;',
      'mesurer la charge par service et repérer celui qui porte le plus.'
    ],

    sections: [
      {
        title: 'Quatre services, quatre rôles',
        html: [
          '<p>L’histoire virtualise quatre services, chacun avec un rôle distinct :</p>',
          '<table>\n' +
          '    <tr><th>Service</th><th>Rôle</th></tr>\n' +
          '    <tr><td>Base de données</td><td>les <strong>données</strong> de l’entreprise, centralisées</td></tr>\n' +
          '    <tr><td>Site web</td><td>la <strong>publication</strong> vers les utilisateurs et le monde</td></tr>\n' +
          '    <tr><td>Pare-feu virtuel</td><td>la <strong>protection</strong> du reste du parc</td></tr>\n' +
          '    <tr><td>Serveur de test</td><td>la <strong>recette</strong> : essayer sans casser la production</td></tr>\n' +
          '  </table>',
          '<p>Le serveur de test mérite une pause : avant la virtualisation, il fallait une machine physique ' +
          'pour tester ; maintenant, une VM s’allume, essuie les plâtres, s’éteint. C’est l’un des grands ' +
          'bénéfices du partage.</p>',
          box('intuition', 'Le même serveur, quatre métiers', 'compass',
            '    <p>Données, publication, protection, recette : quatre fonctions qui n’avaient auparavant droit ' +
            'qu’à quatre machines physiques. Le matériel est unique, les métiers sont multiples.</p>')
        ].join('\n')
      },
      {
        title: 'L’inventaire des VM',
        html: [
          '<p>Gérer un parc, c’est d’abord savoir ce qui tourne. L’inventaire compte les VM <strong>par type ' +
          'de service</strong>, dans l’ordre de première apparition : « base : 2 vm », « site : 1 vm »… Cet ' +
          'ordre d’apparition est celui du fichier d’inventaire, pas un tri alphabétique — c’est l’ordre dans ' +
          'lequel le parc a grandi.</p>',
          '<p>Un inventaire qui dit aussi les fermes : cinq VM « site » derrière un même site web, trois VM ' +
          '« base » en redondance. Le nombre par service est le premier indicateur de la forme du parc.</p>',
          box('mnemo', 'L’inventaire en trois gestes', 'pin',
            '    <p>Lire chaque VM et son service, compter par service (ordre d’apparition), rapporter le ' +
            'nombre de services distincts. Trois gestes qui se programment en Bash au chapitre.</p>')
        ].join('\n')
      },
      {
        title: 'La charge de chaque service',
        html: [
          '<p>« On ne prendra chacun que ce dont on a besoin » suppose de <strong>mesurer</strong> ce qu’on ' +
          'prend. La charge se cumule par service : chaque VM déclare son pourcentage de processeur, le ' +
          'service additionne ses VM. Au-delà de 70 % cumulés, un service entre en zone « à surveiller » — ' +
          'pas encore en panne, mais la marge s’amincit.</p>',
          '<p>Le service « le plus chargé » se repère avec une règle stricte : un service ne devient ' +
          'champion que si sa charge dépasse <strong>strictement</strong> le maximum connu. À égalité, le ' +
          'premier arrivé garde la couronne — comme dans l’histoire, où chacun ne prend que son dû.</p>',
          box('pitfall', 'Piège — le test non strict du maximum', 'warning',
            '    <p>Si deux services atteignent 70 %, le premier rencontré doit rester « le plus chargé ». ' +
            'Un test « supérieur ou égal » couronnerait le second à tort : le maximum se met à jour en ' +
            '<strong>strictement supérieur</strong>.</p>')
        ].join('\n')
      },
      {
        title: 'Ce que l’inventaire révèle',
        html: [
          '<p>L’inventaire et la charge préparent le dimensionnement du chapitre 4 : un service dont la ' +
          'charge cumulée grimpe aura besoin d’une VM supplémentaire ; un service à 5 % pourrait partager ' +
          'mieux. Le parc devient un objet que l’on lit, pas une collection de machines que l’on subit.</p>',
          box('tech', 'Les exercices de ce chapitre', 'terminal',
            '    <p>Classer les quatre services de l’histoire, dresser l’inventaire par service dans l’ordre ' +
            'd’apparition, calculer la charge par service avec le maximum strict et le seuil des 70 %.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le site web sert à…', opts: ['la publication', 'la protection', 'la recette'], correct: 0, exp: 'Publication vers les utilisateurs ; la base porte les données, le pare-feu protège, le test recette.' },
      { q: 'Le pare-feu virtuel assure…', opts: ['la protection du parc', 'la publication du site', 'le stockage des données'], correct: 0, exp: 'C’est son rôle dans l’inventaire des quatre services.' },
      { q: 'Le serveur de test illustre…', opts: ['la recette sans machine physique dédiée', 'la sauvegarde automatique', 'la réplication'], correct: 0, exp: 'Une VM s’allume pour essayer, puis s’éteint — grand bénéfice du partage.' },
      { q: 'L’inventaire par service se fait…', opts: ['dans l’ordre de première apparition', 'par ordre alphabétique', 'au hasard'], correct: 0, exp: 'L’ordre du fichier d’inventaire — celui dans lequel le parc a grandi.' },
      { q: 'La zone « à surveiller » commence…', opts: ['au-delà de 70 % de charge cumulée', 'à 0 %', 'après 100 %'], correct: 0, exp: 'Au-delà de 70 % cumulés, la marge s’amincit : à surveiller.' },
      { q: 'Le service le plus chargé se choisit…', opts: ['en strictement supérieur, le premier arrivé gagne à égalité', 'en alphabétique', 'au hasard'], correct: 0, exp: 'Test strict : à égalité, le premier rencontré garde le titre.' },
      { q: 'La charge d’un service est…', opts: ['la somme des charges de ses VM', 'le maximum de ses VM', 'la moyenne de ses VM'], correct: 0, exp: 'Chaque VM déclare sa part ; le service additionne.' },
      { q: 'Les quatre services de l’histoire sont…', opts: ['base de données, site web, pare-feu, serveur de test', 'DNS, DHCP, web, mail', 'proxy, VPN, web, FTP'], correct: 0, exp: 'L’inventaire exact de la fin de l’histoire.' }
    ],

    pitfalls: [
      'Confondre les rôles : la base porte les données, le site publie, le pare-feu protège, le test recette.',
      'Trier l’inventaire alphabétiquement au lieu de respecter l’ordre d’apparition.',
      'Utiliser un test non strict pour le maximum : le premier arrivé doit gagner à égalité.',
      'Oublier le seuil des 70 % : un service cumulé au-delà entre en zone à surveiller.'
    ],

    methodTitle: 'Lire son parc',
    method: [
      'Inventorier : chaque VM avec son service, comptage dans l’ordre d’apparition.',
      'Charger : additionner les déclarations de chaque service, repérer les dépassements de 70 %.',
      'Rapporter : le service le plus chargé, au maximum strict, est celui qu’on regarde en premier.'
    ],

    summary: [
      'Quatre services dans l’histoire : base, site web, pare-feu virtuel, serveur de test.',
      'Données, publication, protection, recette : quatre rôles, un seul serveur.',
      'L’inventaire compte les VM par service, dans l’ordre de première apparition.',
      'La charge se cumule par service ; au-delà de 70 % on surveille, le maximum se prend au sens strict.'
    ],

    checklist: [
      'Je cite les quatre services et leur catégorie sans note.',
      'Je produis un inventaire par service dans l’ordre d’apparition.',
      'Je calcule la charge cumulée et j’applique le seuil des 70 %.',
      'Je trouve le service le plus chargé avec le test strict.'
    ],

    notions: [
      'base de données',
      'site web',
      'pare-feu virtuel',
      'serveur de test',
      'inventaire',
      'ordre d’apparition',
      'charge cumulée',
      'maximum strict'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis l’inventaire de fin d’histoire et refais le comptage.' },
      { cls: 'mid', text: '50–69 % — rejoue l’exercice d’inventaire jusqu’au sans-faute.' },
      { cls: 'good', text: '70–89 % — solide : analyse la charge d’un parc fictif de 6 VM.' },
      { cls: 'top', text: '≥ 95 % — maîtrise : passe au dimensionnement et à la rentabilisation.' }
    ],

    flashcards: [
      { q: 'Les quatre services de la fin de l’histoire ?', a: 'Une base de données, un site web, un pare-feu virtuel et un serveur de test.' },
      { q: 'Les quatre catégories correspondantes ?', a: 'Données (base), publication (site), protection (pare-feu), recette (test).' },
      { q: 'L’ordre de l’inventaire ?', a: 'L’ordre de première apparition des services, pas l’alphabétique.' },
      { q: 'Le seuil d’alerte de charge ?', a: 'Au-delà de 70 % cumulés, le service est « à surveiller ».' },
      { q: 'La règle du maximum ?', a: 'Mise à jour en strictement supérieur : à égalité, le premier arrivé gagne.' }
    ]
  }
];
