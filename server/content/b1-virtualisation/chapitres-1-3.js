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
      'Dans l’architecture informatique classique, la règle historique était stricte : « un serveur physique ' +
      'dédié pour un seul service ». Cette approche a engendré un gaspillage économique et écologique massif : ' +
      'des machines surpuissantes et coûteuses sous-utilisées à plus de 80 % de leur temps, condamnées à ' +
      'consommer de l’électricité à vide. Ce syndrome du « serveur fainéant » est le point de départ de toute ' +
      'la révolution de la virtualisation. Ce chapitre pose le constat chiffré indispensable à tout ingénieur ' +
      'd’infrastructure : mesurer le temps perdu, identifier les serveurs mono-service et calculer la facture énergétique.',

    objectives: [
      'comprendre l’origine historique de la sous-utilisation : le dogme « un serveur, un service » ;',
      'mesurer le taux d’inactivité d’un parc serveur (seuil critique des 80 % / 48 minutes par heure) ;',
      'identifier les serveurs mono-service et chiffrer le coût financier du gaspillage matériel ;',
      'calculer la consommation électrique réelle d’un serveur en fonctionnement (watts vers kWh).'
    ],

    sections: [
      {
        title: 'Le problème historique : le syndrome du serveur mono-service',
        html: [
          '<p>Avant l’avènement de la virtualisation moderne, les administrateurs systèmes appliquaient un principe ' +
          'de précaution absolu : <strong>isoler physiquement chaque application sur sa propre machine</strong>. ' +
          'Un serveur physique était acheté pour héberger un site web, un autre pour la base de données, un troisième ' +
          'pour la messagerie. L’objectif était d’éviter qu’un plantage logiciel n’entraîne la chute des autres services.</p>',
          '<p>La conséquence directe de cette architecture fut désastreuse : des serveurs professionnels puissants, ' +
          'dotés de processeurs multicœurs et de dizaines de gigaoctets de mémoire vive, passaient en réalité ' +
          '<strong>80 % de leur temps à ne rien faire</strong> (en attente de requêtes). Le support pédagogique ' +
          'illustre cette réalité sous le nom parlant de <strong>serveur fainéant</strong> : une machine coûteuse qui ' +
          'tourne à vide et consomme de l’électricité sans produire de valeur.</p>',
          '<p>C’est pour briser cette impasse qu’un ingénieur IT a introduit la <strong>virtualisation</strong> : ' +
          'plutôt que de multiplier les boîtiers physiques, on installe une couche logicielle (l’<strong>hyperviseur</strong>) ' +
          'qui crée plusieurs <strong>machines virtuelles (VM)</strong> indépendantes et isolées se partageant la même machine physique.</p>',
          box('situation', 'L’origine du terme « serveur fainéant »', 'compass',
            '    <p>Le « serveur fainéant » n’est pas une machine défectueuse : c’est une machine victime d’une ' +
            'mauvaise architecture. Tant qu’un serveur reste cantonné à un seul service, son taux d’utilisation ' +
            'moyen plafonne entre 10 % et 20 %. La virtualisation résout ce problème en consolidant les charges.</p>')
        ].join('\n')
      },
      {
        title: 'Mesurer le gaspillage : le seuil des 80 %',
        html: [
          '<p>En ingénierie d’infrastructure, le gaspillage ne se devine pas : il se quantifie. Sur une heure ' +
          'standard de 60 minutes, un taux d’inactivité de 80 % correspond exactement à <strong>48 minutes ' +
          'à ne rien faire</strong> :</p>',
          '$$\\text{Temps perdu} = 60 \\text{ min} \\times 0{,}80 = 48 \\text{ min}$$',
          '<p>Toute heure où l’inactivité cumulée atteint ou dépasse 48 minutes est formellement qualifiée d’<strong>heure ' +
          'perdue</strong>. Pour auditer un parc informatique, l’administrateur recense systématiquement les machines hébergeant ' +
          '<strong>moins de deux services</strong> (les serveurs mono-service). Chaque machine mono-service reproduit ce schéma ' +
          'de sous-utilisation : <strong>80 % de son coût d’amortissement mensuel part en pure perte</strong>.</p>',
          box('mnemo', 'Les trois repères du constat', 'pin',
            '    <p>Retenir les trois chiffres cardinaux de l’audit : <strong>48 minutes</strong> d’inactivité par heure, ' +
            'moins de <strong>2 services</strong> par machine physique = serveur fainéant, et <strong>80 %</strong> ' +
            'du coût matériel gaspillé. C’est la base du dimensionnement vu au chapitre 4.</p>')
        ].join('\n')
      },
      {
        title: 'La facture d’électricité : puissance et énergie',
        html: [
          '<p>En plus de l’amortissement matériel, un serveur sous-utilisé engendre une facture énergétique ' +
          'continue. En physique et en informatique industrielle, il est capital de ne pas confondre la ' +
          '<strong>puissance instantanée</strong> (en watts, W) et l’<strong>énergie consommée dans la durée</strong> ' +
          '(en kilowattheures, kWh) :</p>',
          '$$\\text{Énergie (kWh)} = \\frac{\\text{Puissance (W)} \\times \\text{Temps (h)}}{1000}$$',
          '<p><strong>Exemple chiffré :</strong> Un serveur consommant <strong>500 W</strong> en continu pendant un mois ' +
          'de <strong>720 heures</strong> consomme :</p>',
          '$$\\text{Consommation} = \\frac{500 \\times 720}{1000} = 360 \\text{ kWh}$$',
          '<p>À 100 francs le kWh, cette seule machine génère <strong>36 000 FCFA</strong> d’électricité par mois — soit plus ' +
          'de 430 000 FCFA par an pour un serveur qui ne travaille utilement que 20 % de son temps ! À l’échelle d’un centre ' +
          'de données de dix ou vingt serveurs, le coût de l’inaction se chiffre en millions.</p>',
          box('pitfall', 'Piège classique — Watts contre Kilowattheures', 'warning',
            '    <p>Le <strong>watt (W)</strong> mesure la puissance appelée à un instant T (le débit d’eau du robinet). ' +
            'Le <strong>kilowattheure (kWh)</strong> mesure le volume total consommé dans le temps (la quantité d’eau dans la baignoire). ' +
            'On ne facture jamais des watts, mais des kilowattheures.</p>')
        ].join('\n')
      },
      {
        title: 'Vers la consolidation et les machines virtuelles',
        html: [
          '<p>Face à ce constat accablant — 80 % d’inactivité, serveurs mono-service pléthoriques, factures d’énergie ' +
          'et de climatisation colossales —, la question de l’ingénieur s’impose d’elle-même : ' +
          '<em>« Pourquoi payer dix machines physiques quand une seule suffirait amplement à héberger tous ces services ? »</em></p>',
          '<p>La réponse technique réside dans la <strong>consolidation par virtualisation</strong>, abordée au chapitre suivant : ' +
          'allouer à chaque service uniquement les ressources réelles dont il a besoin (vCPU, mémoire vive, stockage), ' +
          'tout en maintenant une étanchéité logicielle totale.</p>',
          box('tech', 'Les exercices pratiques de ce module', 'terminal',
            '    <p>Pour valider ce premier chapitre, vous allez coder trois algorithmes d’audit : ' +
            '1. Classer les heures d’un serveur (utile vs perdue) au seuil de 48 min ; ' +
            '2. Identifier les serveurs mono-service et chiffrer la perte financière ; ' +
            '3. Calculer la facture d’électricité globale d’un parc à partir de sa consommation en watts.</p>')
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
      { cls: 'good', text: '70–94 % — solide : chiffre le gaspillage d’un parc fictif.' },
      { cls: 'top', text: '≥ 95 % — maîtrise : passe au remède, la virtualisation.' }
    ],

    flashcards: [
      { q: 'Qu’est-ce que « mono-service » ?', a: 'mono-service : Dans l’architecture informatique classique, la règle historique était stricte : « un serveur physique dédié pour un seul service ». Cette approche a engendré un gaspillage économique et écologique massif : des machines surpuissantes et coûteuses sous-utilisées à plus de 80 % de l' },
      { q: 'Qu’est-ce que « taux d’inactivité » ?', a: 'mesurer le taux d’inactivité d’un parc serveur (seuil critique des 80 % / 48 minutes par heure) ;' },
      { q: 'Qu’est-ce que « heure perdue » ?', a: 'Toute heure où l’inactivité cumulée atteint ou dépasse 48 minutes est formellement qualifiée d’ heure perdue . Pour auditer un parc informatique, l’administrateur recense systématiquement les machines hébergeant moins de deux services (les serveurs mono-service). Chaque machine m' },
      { q: 'Qu’est-ce que « kilowattheure (kWh) » ?', a: 'Le watt (W) mesure la puissance appelée à un instant T (le débit d’eau du robinet). Le kilowattheure (kWh) mesure le volume total consommé dans le temps (la quantité d’eau dans la baignoire). On ne facture jamais des watts, mais des kilowattheures.' },
      { q: 'Qu’est-ce que « machine virtuelle » ?', a: 'Chaque machine virtuelle se comporte comme un ordinateur complet — son propre système, ses propres applications — mais tout cela n’est qu’un partage organisé du matériel physique du serveur hôte.' },
      { q: 'Qu’est-ce que « stockage (disque) » ?', a: 'Les VM de l’histoire promettent : « on va se partager votre mémoire, votre processeur et même votre disque dur ». Analysez chaque ligne proposée « ressource partage » : partage est un code parmi vive (mémoire), calcul (processeur), stockage (disque) ou pas-partage (ressource qui reste p' },
      { q: 'Qu’est-ce que « ordre d’apparition » ?', a: 'dresser l’inventaire des VM par type de service, dans l’ordre d’apparition ;' },
      { q: 'Qu’est-ce que « charge cumulée » ?', a: 'L’inventaire et la charge préparent le dimensionnement du chapitre 4 : un service dont la charge cumulée grimpe aura besoin d’une VM supplémentaire ; un service à 5 % pourrait partager mieux. Le parc devient un objet que l’on lit, pas une collection de machines que l’on subit.' },
      { q: 'Qu’est-ce que « taux d’utilisation » ?', a: 'mesurer le réveil d’un serveur : taux d’utilisation avant et après ;' },
      { q: 'Qu’est-ce que « consolidation » ?', a: 'Exemple du cours : 300 000 FCFA de serveurs, une VM à 60 000 FCFA → 300 000 / 60 000 = 5 VM exactement : 300 000 FCFA aussi, économie nulle. Mais à 80 000 FCFA la VM, 200 000 / 80 000 = 2,5 → 3 VM : 240 000 FCFA. L’économie peut être négative : la consolidation a un coût, et l’ar' },
      { q: 'Qu’est-ce que « tableau de bord » ?', a: 'Le constat est posé, la promesse acceptée : place aux résultats. « Le serveur, bien que toujours un peu paresseux, se retrouva rentabilisé à 100 %. » Ce chapitre transforme la fable en tableau de bord : mesurer le réveil d’un serveur, comparer le parc physique au parc virtualisé,' },
      { q: 'Qu’est-ce que « mutualisation » ?', a: 'Quel concept est illustré ? La mutualisation : plusieurs VM sur un même serveur physique, ressources partagées.' },
      { q: 'Qu’est-ce que « seuil de saturation » ?', a: 'appliquer le seuil de saturation : une VM refusée plutôt qu’un serveur noyé ;' },
      { q: 'Qu’est-ce que « serveur plein » ?', a: 'Cas limite à connaître : le serveur plein . Quand la charge totale atteint exactement la capacité, il reste hébergeable — mais plus rien ne pourra s’ajouter. C’est un état à surveiller, pas encore une panne.' },
      { q: 'Qu’est-ce que « déplacement de VM » ?', a: 'Réagir par déplacement de VM vers un hôte moins chargé, jamais par accumulation.' },
      { q: 'Qu’est-ce que « plan de réveil » ?', a: 'élaborer le plan de réveil : virtualiser, étudier, garder ;' },
      { q: 'Qu’est-ce que « vigilance » ?', a: 'Ce verdict, l’histoire l’a déjà prononcé à sa façon : « Et pour une fois, il ne s’ennuyait plus ! (Bon, il se plaignait quand même un peu, mais ça, c’est une autre histoire...) » — le succès n’exclut pas la vigilance.' },
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
      'La colère du serveur est franchie : « Faire le travail de plusieurs serveurs ? C’est de la folie ! » ' +
      'Les machines virtuelles répondent calmement : « On va se partager votre mémoire, votre processeur et ' +
      'même votre disque dur. Et on ne prendra chacun que ce dont on a besoin. » Ce chapitre prend la ' +
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
          '<p>Les VM de l’histoire sont précises : « on va se partager votre <strong>mémoire</strong>, votre ' +
          '<strong>processeur</strong> et même votre <strong>disque dur</strong> ».</p>',
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
          '    <li>le <strong>serveur</strong> se réveille en sursaut et refuse (« C’est de la folie ! ») ;</li>\n' +
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
      { q: 'Les ressources partagées de l’histoire sont…', opts: ['mémoire, processeur, disque', 'clavier, écran, souris', 'réseau seul'], correct: 0, exp: 'La promesse des VM : « votre mémoire, votre processeur et même votre disque dur ».' },
      { q: 'La règle d’allocation des VM est…', opts: ['ne prendre que ce dont on a besoin', 'prendre tout ce qui reste', 'prendre sans déclarer'], correct: 0, exp: '« On ne prendra chacun que ce dont on a besoin » — et le total tient dans la capacité.' },
      { q: 'Une VM refusée…', opts: ['ne consomme rien', 'consomme quand même', 'détruit les autres VM'], correct: 0, exp: 'Contrôler d’abord, allouer ensuite : le refus ne touche pas aux restes.' },
      { q: 'La première réaction du serveur est…', opts: ['la colère — « C’est de la folie ! »', 'la joie', 'l’indifférence'], correct: 0, exp: 'Il se réveille en sursaut et refuse, avant d’accepter à l’étape 4.' },
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
      { cls: 'good', text: '70–94 % — solide : dimensionne un serveur pour un parc de VM fictif.' },
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
            'nombre de services distincts. Trois gestes qui s’appliquent méthodiquement dans les études de cas du chapitre.</p>')
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
      { cls: 'good', text: '70–94 % — solide : analyse la charge d’un parc fictif de 6 VM.' },
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
