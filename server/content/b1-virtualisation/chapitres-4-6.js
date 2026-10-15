/**
 * Chapitres 4 à 6 du cours « Virtualisation des serveurs » B1, construits sur
 * le support B1 du module (dossier « cours B1 IT / Virtualisation des
 * serveurs ») : l'histoire « Le serveur fainéant et les machines ambitieuses »
 * et ses questions de compréhension, d'analyse technique et de réflexion —
 * rentabilisation, risques de la surcharge, argumentaire au responsable IT.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun
 * titre <h2> ici : la numérotation est ajoutée au rendu, et les trois
 * exercices de code sont injectés avant le QCM par le générateur.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Rentabilisation et dimensionnement',
    short: 'Rentabiliser le parc',
    toc: 'De 80 % à 100 %, le taux de réveil, les serveurs économisés, le plan de consolidation.',
    time: '≈ 2 h de travail',

    situation:
      'Le constat est posé, la promesse acceptée : place aux résultats. « Le serveur, bien que toujours ' +
      'un peu paresseux, se retrouva rentabilisé à 100 %. » Ce chapitre transforme la fable en tableau de ' +
      'bord : mesurer le réveil d’un serveur, comparer le parc physique au parc virtualisé, décider quelle ' +
      'VM va sur quel hôte.',

    objectives: [
      'mesurer le réveil d’un serveur : taux d’utilisation avant et après ;',
      'comparer le coût du parc physique à celui du parc virtualisé ;',
      'calculer le nombre de VM nécessaires à un coût donné (plafond de la division) ;',
      'placer les VM sur les hôtes selon la capacité restante (premier hôte suffisant).'
    ],

    sections: [
      {
        title: 'De 80 % d’oisiveté à 100 % d’usage',
        html: [
          '<p>La rentabilisation se mesure par le <strong>taux d’utilisation</strong> : la part du temps où ' +
          'le serveur travaille vraiment. Le fainéant de l’histoire tournait à environ 20 % ; après ' +
          'virtualisation, « rentabilisé à 100 % » signifie que ses ressources ne dorment plus.</p>',
          '<p>Le « réveil » d’un serveur se constate par deux mesures : un taux <strong>avant</strong> bas ' +
          '(moins de 30 %) et un taux <strong>après</strong> élevé (80 % ou plus). Entre les deux, un ' +
          'serveur dont le taux monte est « en progrès » ; celui qui ne bouge pas reste insuffisant — le ' +
          'gaspillage continue.</p>',
          box('intuition', 'Pourquoi 30 et 80 ?', 'compass',
            '    <p>Sous 30 %, un serveur vit le mode de vie du fainéant ; à 80 % et plus, il rejoint le ' +
            'serveur « rentabilisé à 100 % » de la fin de l’histoire. Entre les deux, c’est un chantier en ' +
            'cours — pas une réussite, pas un scandale.</p>')
        ].join('\n')
      },
      {
        title: 'Combien de serveurs économisés ?',
        html: [
          '<p>Le calcul qui convainc : le parc physique coûte la somme des serveurs ; le parc virtualisé ' +
          'coûte le nombre de VM × le coût d’une VM. Le nombre de VM nécessaires se calcule au <strong>' +
          'plafond</strong> de la division : total des coûts / coût d’une VM, plus un si le reste n’est pas ' +
          'nul. On ne peut pas louer une demi-machine.</p>',
          '<p>Exemple du cours : 300 000 FCFA de serveurs, une VM à 60 000 FCFA → 300 000 / 60 000 = 5 VM ' +
          'exactement : 300 000 FCFA aussi, économie nulle. Mais à 80 000 FCFA la VM, 200 000 / 80 000 = 2,5 ' +
          '→ <strong>3 VM</strong> : 240 000 FCFA. L’économie peut être négative : la consolidation a un coût, ' +
          'et l’arithmétique le dit sans complaisance.</p>',
          box('pitfall', 'Piège — arrondir au plus proche', 'warning',
            '    <p>2,5 VM, ça n’existe pas : l’arrondi est au <strong>plafond</strong> (3), pas au plus ' +
            'proche (2). Un plafond oublié = un parc sous-dimensionné = des VM qui ne tiennent pas.</p>')
        ].join('\n')
      },
      {
        title: 'Le plan de consolidation',
        html: [
          '<p>Dernier calcul avant d’agir : quelle VM sur quel hôte ? La règle du cours — et du bon sens — ' +
          'est le <strong>premier hôte suffisant</strong> : les serveurs physiques sont listés dans un ordre ' +
          '(fainéants d’abord : c’est eux qu’on veut réveiller), et chaque VM prend le premier hôte dont la ' +
          'capacité restante couvre son besoin. Si aucun hôte ne suffit, la VM reste « sans place » — et ' +
          'rien n’est décompté.</p>',
          '<p>La fin du plan reporte la capacité restante de chaque hôte : un hôte à 0 est « rentabilisé à ' +
          '100 % » comme dans l’histoire ; un hôte à 200 est encore un fainéant en puissance.</p>',
          box('mnemo', 'Trois calculs, un plan', 'pin',
            '    <p>1. Le réveil (avant &lt; 30, après ≥ 80). 2. L’économie (plafond de la division). ' +
            '3. Le placement (premier hôte suffisant). Avec ces trois calculs, le dossier de virtualisation ' +
            'est chiffré de bout en bout.</p>')
        ].join('\n')
      },
      {
        title: 'Ce que le tableau de bord doit dire',
        html: [
          '<p>Un plan de consolidation se lit par un responsable, pas par un ingénieur. Il doit répondre en ' +
          'une page : combien de serveurs réveillés, combien de VM au final, quelle économie (ou quel ' +
          'surcoût) mensuel, quels hôtes pleins et quels hôtes restants. Chaque chiffre du dossier est ' +
          'reproductible par un script — c’est exactement le travail des exercices de ce chapitre.</p>',
          box('tech', 'Les exercices de ce chapitre', 'terminal',
            '    <p>Classer les serveurs (réveil, progrès, insuffisant), calculer l’économie du parc au ' +
            'plafond de la division, puis placer les VM sur les hôtes au premier suffisant avec les restes ' +
            'en bilan.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Un serveur est « réveillé » quand…', opts: ['il passe de moins de 30 % à 80 % ou plus', 'il s’éteint la nuit', 'il change de salle'], correct: 0, exp: 'Avant bas, après élevé : la double mesure du réveil.' },
      { q: 'Le nombre de VM d’une consolidation se calcule…', opts: ['au plafond de la division', 'à l’arrondi au plus proche', 'à la partie entière toujours'], correct: 0, exp: 'Plafond : division entière plus 1 si le reste n’est pas nul — 2,5 VM = 3 VM.' },
      { q: 'Une économie négative signifie…', opts: ['que la consolidation coûte plus cher', 'que le calcul est faux', 'qu’il faut arrêter les VM'], correct: 0, exp: 'Le surcoût est possible : l’arithmétique tranche, sans complaisance.' },
      { q: 'La règle de placement des VM est…', opts: ['le premier hôte suffisant, dans l’ordre du fichier', 'l’hôte le plus rapide', 'au hasard'], correct: 0, exp: 'Premier hôte dont la capacité restante couvre le besoin — l’ordre fait foi.' },
      { q: 'Une VM sans place…', opts: ['ne décompte rien', 'décompte quand même', 'détruit le plan'], correct: 0, exp: 'Aucun hôte ne suffit : rien n’est consommé, elle reste à placer.' },
      { q: 'Un hôte dont la capacité restante vaut 0 est…', opts: ['rentabilisé à 100 % comme dans l’histoire', 'cassé', 'à remplacer'], correct: 0, exp: 'Toutes ses ressources sont utilisées : la fin heureuse du fainéant.' },
      { q: 'Le taux d’utilisation se mesure…', opts: ['avant et après la virtualisation', 'une seule fois, après', 'jamais, il se devine'], correct: 0, exp: 'Le réveil se prouve par deux mesures : le « avant » et le « après ».' },
      { q: 'Le dossier de consolidation se lit…', opts: ['en une page chiffrée, reproductible par script', 'en un récit d’ingénieur', 'dans le journal des événements'], correct: 0, exp: 'Réveillés, VM, économie, restes : les quatre lignes que le responsable lit.' }
    ],

    pitfalls: [
      'Arrondir 2,5 VM à 2 : le plafond est obligatoire, sinon le parc déborde.',
      'Décompter une VM sans place : elle n’a touché à aucune capacité.',
      'Placer les VM en désordre : le premier hôte suffisant exige l’ordre du fichier.',
      'Présenter une consolidation sans mesurer les taux avant/après : le réveil se prouve.'
    ],

    methodTitle: 'Construire le plan de consolidation',
    method: [
      'Mesurer les taux avant/après de chaque serveur et compter les réveillés.',
      'Chiffrer le parc cible : total des coûts, plafond de la division par le coût d’une VM, économie.',
      'Placer les VM au premier hôte suffisant, puis reporter les restes : le plan est chiffré.'
    ],

    summary: [
      'Le réveil se mesure : avant moins de 30 %, après 80 % ou plus.',
      'Le parc cible se calcule au plafond de la division — 2,5 VM font 3.',
      'Le placement suit le premier hôte suffisant, dans l’ordre du fichier.',
      'Un hôte à 0 est rentabilisé à 100 % : la fin heureuse du fainéant.'
    ],

    checklist: [
      'Je calcule le taux de réveil et je classe un parc en trois verdicts.',
      'J’applique le plafond de la division sans me tromper d’arrondi.',
      'Je place des VM selon la capacité restante et je reporte les restes.',
      'Je présente un plan en une page lisible par un responsable.'
    ],

    notions: [
      'taux d’utilisation',
      'réveil d’un serveur',
      'consolidation',
      'plafond de division',
      'économie',
      'premier hôte suffisant',
      'capacité restante',
      'tableau de bord'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — refais l’exemple des 2,5 VM jusqu’à comprendre le plafond.' },
      { cls: 'mid', text: '50–69 % — rejoue les trois exercices avec un parc fictif différent.' },
      { cls: 'good', text: '70–89 % — solide : chiffre la consolidation d’un parc de 8 serveurs.' },
      { cls: 'top', text: '≥ 95 % — maîtrise : passe aux risques de la surcharge.' }
    ],

    flashcards: [
      { q: 'Les seuils du réveil ?', a: 'Avant moins de 30 %, après 80 % ou plus — sinon « en progrès » ou « insuffisant ».' },
      { q: 'Le calcul du nombre de VM ?', a: 'Plafond de (total / coût d’une VM) : division entière plus 1 si le reste n’est pas nul.' },
      { q: 'La règle de placement ?', a: 'Premier hôte suffisant dans l’ordre du fichier ; une VM sans place ne décompte rien.' },
      { q: 'Que dit un hôte à capacité restante 0 ?', a: 'Il est rentabilisé à 100 % — toutes ses ressources travaillent.' },
      { q: 'Une économie peut-elle être négative ?', a: 'Oui : si le coût des VM dépasse le parc physique, l’arithmétique le dit sans complaisance.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Les risques de la surcharge',
    short: 'Surcharge',
    toc: 'La question des « trop de VM », le seuil de saturation, les symptômes, l’action de secours.',
    time: '≈ 2 h de travail',

    situation:
      'L’histoire pose elle-même la question finale : « Que se passerait-il si trop de machines ' +
      'ambitieuses étaient créées sur un seul serveur ? » La promesse du partage a une limite : la ' +
      'capacité. Ce chapitre apprend à la respecter, à reconnaître les symptômes de la surcharge et à ' +
      'réagir avant la panne.',

    objectives: [
      'formuler les trois questions techniques de l’histoire : concept, avantages, risques ;',
      'appliquer le seuil de saturation : une VM refusée plutôt qu’un serveur noyé ;',
      'détecter les symptômes de surcharge : CPU, RAM, temps de réponse ;',
      'conseiller l’action de secours : déplacer une VM.'
    ],

    sections: [
      {
        title: 'Les trois questions techniques de l’histoire',
        html: [
          '<p>L’histoire n’est pas seulement un conte : elle pose trois questions techniques exactes.</p>',
          '<ul>\n' +
          '    <li><strong>Quel concept est illustré ?</strong> La mutualisation : plusieurs VM sur un même ' +
          'serveur physique, ressources partagées.</li>\n' +
          '    <li><strong>Quels avantages ?</strong> La rentabilisation à 100 %, moins de machines ' +
          'physiques, moins d’électricité — tout le chapitre 4.</li>\n' +
          '    <li><strong>Quels risques si trop de VM ?</strong> La <strong>surcharge</strong> : mémoire ' +
          'épuisée, processeur saturé, temps de réponse qui s’effondrent pour tout le monde.</li>\n' +
          '  </ul>',
          box('intuition', 'Le revers de la promesse', 'compass',
            '    <p>« On ne prendra chacun que ce dont on a besoin » suppose que le total des besoins tient ' +
            'dans la capacité. Si chacun prend son besoin mais que les besoins s’additionnent trop, le ' +
            'serveur promet plus qu’il n’a : c’est la surcharge.</p>')
        ].join('\n')
      },
      {
        title: 'Le seuil de saturation',
        html: [
          '<p>La défense est simple : <strong>ne jamais dépasser la capacité</strong>. Chaque VM demande sa ' +
          'charge ; si la charge totale reste dans la capacité, elle est hébergée ; sinon elle est refusée ' +
          '— et sa charge n’est pas comptée. Un refus vaut mieux qu’une saturation : on cherche un autre ' +
          'hôte, on ne noie pas celui-ci.</p>',
          '<p>Cas limite à connaître : le serveur <strong>plein</strong>. Quand la charge totale atteint ' +
          '<strong>exactement</strong> la capacité, il reste hébergeable — mais plus rien ne pourra ' +
          's’ajouter. C’est un état à surveiller, pas encore une panne.</p>',
          box('pitfall', 'Piège — tester après avoir ajouté', 'warning',
            '    <p>Le contrôle se fait <strong>avant</strong> l’ajout : si total + charge dépasse la ' +
            'capacité, refuser. Ajouter puis retirer, c’est promettre puis décevoir — le chemin de la panne.</p>')
        ].join('\n')
      },
      {
        title: 'Les symptômes de la surcharge',
        html: [
          '<p>Un serveur surchargé prévient avant de tomber. Trois symptômes, dans l’ordre de détection :</p>',
          '<ul>\n' +
          '    <li><strong>CPU</strong> au-delà de 90 % : le processeur n’a plus de marge ;</li>\n' +
          '    <li><strong>RAM</strong> au-delà de 90 % : la mémoire promise aux VM menace de manquer ;</li>\n' +
          '    <li><strong>temps de réponse</strong> au-delà de 500 ms : les utilisateurs le sentent déjà.</li>\n' +
          '  </ul>',
          '<p>Un symptôme : la cause est identifiée. Plusieurs symptômes à la fois : cas « multiple » — le ' +
          'serveur est entrain de saturer globalement, la priorité monte.</p>',
          box('mnemo', '90, 90, 500', 'pin',
            '    <p>CPU à 90 %, RAM à 90 %, réponses à 500 ms : les trois seuils d’alerte. Au-delà d’un seul, ' +
            'le serveur est en surcharge ; l’action est la même dans tous les cas.</p>')
        ].join('\n')
      },
      {
        title: 'L’action de secours : déplacer une VM',
        html: [
          '<p>Que faire quand la surcharge est détectée ? La réponse du cours tient en quatre mots : ' +
          '<strong>déplacer une VM</strong>. C’est le privilège de la virtualisation : une machine qui ' +
          'tourne sur un serveur noyé peut rejoindre un hôte qui dort — un autre fainéant à réveiller. Le ' +
          'service continue, l’utilisateur ne voit rien, le serveur respire.</p>',
          '<p>C’est aussi la réponse à la dernière question de réflexion de l’histoire : « comment être ' +
          'efficace mais pas surchargé ? » — en équilibrant : chaque hôte chargé mais aucun noyé, chaque VM ' +
          'prête à déménager.</p>',
          box('tech', 'Les exercices de ce chapitre', 'terminal',
            '    <p>Classer les trois questions techniques, respecter le seuil de saturation (avec le cas du ' +
            'serveur plein), détecter les symptômes au seuil 90/90/500 et émettre l’action de déplacement.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le concept illustré par l’histoire est…', opts: ['la mutualisation des ressources', 'la sauvegarde', 'le chiffrement'], correct: 0, exp: 'Plusieurs VM sur un même serveur, ressources partagées : la mutualisation.' },
      { q: 'Le risque quand « trop de VM » sont créées…', opts: ['la surcharge du serveur', 'la perte de licence', 'la surchauffe du clavier'], correct: 0, exp: 'Mémoire épuisée, CPU saturé, réponses qui s’effondrent.' },
      { q: 'Une VM qui dépasse la capacité est…', opts: ['refusée, sa charge non comptée', 'hébergée quand même', 'supprimée'], correct: 0, exp: 'Le contrôle précède l’ajout : refus sans consommation.' },
      { q: 'Le serveur est « plein » quand…', opts: ['la charge totale atteint exactement la capacité', 'il s’éteint', 'aucune VM n’existe'], correct: 0, exp: 'État exact de saturation : hébergeable mais plus rien ne peut s’ajouter.' },
      { q: 'Les seuils d’alerte sont…', opts: ['CPU 90 %, RAM 90 %, réponses 500 ms', 'CPU 50 %, RAM 50 %, réponses 100 ms', 'CPU 99 %, RAM 99 %, réponses 1 s'], correct: 0, exp: 'Les trois seuils du cours, dans l’ordre de détection : cpu, ram, réponses.' },
      { q: 'Plusieurs symptômes à la fois donnent…', opts: ['le cas « multiple »', 'un faux positif', 'une panne certaine'], correct: 0, exp: 'Plusieurs symptômes = saturation globale en cours : priorité renforcée.' },
      { q: 'L’action conseillée en cas de surcharge est…', opts: ['déplacer une VM', 'éteindre le serveur', 'redémarrer tout'], correct: 0, exp: 'La VM rejoint un hôte qui dort : service continu, serveur respirant.' },
      { q: '« Efficace mais pas surchargé » se obtient…', opts: ['en équilibrant les hôtes et en gardant les VM déplaçables', 'en ne virtualisant pas', 'en remplissant chaque hôte à 100 %'], correct: 0, exp: 'La réponse à la question de réflexion de l’histoire : charger, pas noyer.' }
    ],

    pitfalls: [
      'Ajouter la charge avant de tester : le contrôle précède toujours l’ajout.',
      'Confondre « plein » et « saturé » : le plein est l’égalité exacte, il reste fonctionnel.',
      'Négliger un symptôme unique : un seul dépassement de seuil fait déjà une surcharge.',
      'Charger les hôtes à 100 % systématiquement : aucune marge, aucun déplacement possible.'
    ],

    methodTitle: 'Surveiller sans noyer',
    method: [
      'Fixer la capacité et refuser toute VM qui la ferait dépasser.',
      'Surveiller les trois seuils : CPU 90, RAM 90, réponses 500 — un seul suffit à alerter.',
      'Réagir par déplacement de VM vers un hôte moins chargé, jamais par accumulation.'
    ],

    summary: [
      'Trois questions techniques : concept (mutualisation), avantages (rentabilisation), risques (surcharge).',
      'Le seuil de saturation se respecte : VM refusée plutôt que serveur noyé ; égalité exacte = serveur plein.',
      'Les symptômes : CPU et RAM au-delà de 90 %, réponses au-delà de 500 ms — plusieurs à la fois = multiple.',
      'L’action de secours est le déplacement de VM : le privilège de la virtualisation.'
    ],

    checklist: [
      'Je formule les trois questions techniques et leurs réponses.',
      'J’applique le contrôle avant l’ajout et je reconnais le serveur plein.',
      'Je détecte les symptômes dans l’ordre et je nomme le cas multiple.',
      'Je conseille le déplacement de VM comme action de secours.'
    ],

    notions: [
      'mutualisation',
      'surcharge',
      'seuil de saturation',
      'serveur plein',
      'CPU',
      'RAM',
      'temps de réponse',
      'déplacement de VM'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis la question finale de l’histoire et refais l’exemple de saturation.' },
      { cls: 'mid', text: '50–69 % — rejoue l’exercice des symptômes jusqu’au sans-faute.' },
      { cls: 'good', text: '70–89 % — solide : simule une montée en charge et nomme chaque symptôme.' },
      { cls: 'top', text: '≥ 95 % — maîtrise : passe à l’argumentaire final.' }
    ],

    flashcards: [
      { q: 'La question finale de l’histoire ?', a: 'Que se passe-t-il si trop de machines ambitieuses sont créées sur un seul serveur ? → la surcharge.' },
      { q: 'La règle anti-saturation ?', a: 'Tester avant d’ajouter : si total + charge dépasse la capacité, la VM est refusée sans consommation.' },
      { q: 'Les trois seuils d’alerte ?', a: 'CPU au-delà de 90 %, RAM au-delà de 90 %, temps de réponse au-delà de 500 ms.' },
      { q: 'Le cas « multiple » ?', a: 'Plusieurs symptômes à la fois : saturation globale en cours, priorité renforcée.' },
      { q: 'L’action de secours ?', a: 'Déplacer une VM vers un hôte moins chargé — service continu, utilisateur non impacté.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Convaincre le responsable informatique',
    short: 'L’argumentaire',
    toc: 'Le pitch en quatre étapes, le bilan avant/après, le plan de réveil des vieux serveurs.',
    time: '≈ 2 h de travail',

    situation:
      'Dernière question de réflexion de l’histoire : « Que feriez-vous si vous deviez convaincre un ' +
      'responsable informatique de réveiller ses vieux serveurs grâce à la virtualisation ? » Convaincre, ' +
      'c’est un métier : un constat chiffré, une idée claire, une preuve, un verdict. Ce chapitre assemble ' +
      'tout le cours en argumentaire et en plan d’action.',

    objectives: [
      'dérouler le pitch en quatre étapes : constat, idée, preuve, verdict ;',
      'produire le bilan avant/après d’un parc avec moyennes et réveillés ;',
      'élaborer le plan de réveil : virtualiser, étudier, garder ;',
      'rendre un verdict de projet en trois états.'
    ],

    sections: [
      {
        title: 'Le pitch en quatre étapes',
        html: [
          '<p>Un argumentaire qui convainc suit un ordre exact — celui de l’histoire elle-même :</p>',
          '<ol>\n' +
          '    <li><strong>Constat</strong> : le gaspillage — 80 % d’inactivité, de l’électricité pour rien ;</li>\n' +
          '    <li><strong>Idée</strong> : la virtualisation — plusieurs machines, un seul serveur ;</li>\n' +
          '    <li><strong>Preuve</strong> : la rentabilisation — des taux avant/après, des économies chiffrées ;</li>\n' +
          '    <li><strong>Verdict</strong> : un parc plein — chaque serveur rentabilisé à 100 %.</li>\n' +
          '  </ol>',
          '<p>Chaque étape sans la précédente sonne creux : le verdict sans preuve est une promesse, la ' +
          'preuve sans constat ne concerne personne, le constat sans idée laisse le responsable sans réponse.</p>',
          box('intuition', 'L’ordre du pitch = l’ordre de l’histoire', 'compass',
            '    <p>L’histoire est déjà un pitch parfait : le fainéant (constat), l’ingénieur (idée), les VM ' +
            'qui promettent le partage (méthode), le serveur rentabilisé (verdict). Convaincre, c’est rejouer ' +
            'l’histoire devant le responsable.</p>')
        ].join('\n')
      },
      {
        title: 'Le bilan avant/après',
        html: [
          '<p>La preuve du pitch, c’est le tableau de bord du parc : pour chaque serveur, le taux avant et ' +
          'le taux après. Trois bilans en résumé : le nombre de <strong>réveillés</strong> (moins de 30 % ' +
          'passés à 80 % ou plus), la <strong>moyenne avant</strong> et la <strong>moyenne après</strong> — ' +
          'arrondies à l’entier inférieur.</p>',
          '<p>Un parc qui passe de 30 % à 68 % de moyenne raconte tout : le matériel n’a pas changé, son ' +
          'usage a changé. C’est l’argument massue — pas d’investissement, seulement une réorganisation.</p>',
          box('mnemo', 'Les trois lignes du bilan', 'pin',
            '    <p>Réveillés, moyenne avant, moyenne après : trois lignes qui tiennent sur un post-it et ' +
            'qui valent une présentation d’une heure.</p>')
        ].join('\n')
      },
      {
        title: 'Le plan de réveil des vieux serveurs',
        html: [
          '<p>Le plan d’action classe chaque serveur selon trois lettres : <strong>v</strong>irtualisable ' +
          '(matériel compatible), <strong>e</strong>conome (moins de 30 % d’utilisation — un fainéant), ' +
          '<strong>s</strong>ûr (sauvegardes existantes). Les trois lettres présentes : le serveur est « à ' +
          'virtualiser ». Il en manque une : « à étudier », avec la première lettre manquante dans l’ordre ' +
          'v, e, s — c’est la prochaine action concrète.</p>',
          '<p>Le plan porte aussi les VM prévues et leur charge totale : le chapitre 5 a appris qu’un plan ' +
          'qui noie les hôtes n’est pas un plan. Le verdict de départ : la charge totale des VM prévues ne ' +
          'doit pas dépasser ce que les hôtes réveillés peuvent porter — 200 dans les exercices du cours.</p>',
          box('pitfall', 'Piège — « à étudier » sans dire ce qui manque', 'warning',
            '    <p>Un plan qui dit « à étudier » sans la lettre manquante renvoie le travail à plus tard. ' +
            'La première lettre manquante dans l’ordre v, e, s EST la prochaine action : matériel, mesure ou ' +
            'sauvegarde.</p>')
        ].join('\n')
      },
      {
        title: 'Le verdict du projet',
        html: [
          '<p>Tout se termine par un verdict en trois états, comme un projet réel :</p>',
          '<ul>\n' +
          '    <li><strong>plan prêt</strong> : tous les serveurs sont virtualisables et la charge des VM ' +
          'tient dans la capacité prévue ;</li>\n' +
          '    <li><strong>plan à ajuster</strong> : les serveurs sont prêts mais la charge dépasse — il ' +
          'faut ajouter un hôte ou réduire les VM ;</li>\n' +
          '    <li><strong>plan impossible</strong> : au moins un serveur reste bloqué (matériel, mesure ou ' +
          'sauvegarde manquante).</li>\n' +
          '  </ul>',
          '<p>Ce verdict, l’histoire l’a déjà prononcé à sa façon : « Et pour une fois, il ne s’ennuyait ' +
          'plus ! (Bon, il se plaignait quand même un peu, mais ça, c’est une autre histoire...) » — le ' +
          'succès n’exclut pas la vigilance.</p>',
          box('tech', 'Les exercices de ce chapitre', 'terminal',
            '    <p>Valider l’ordre du pitch, produire le bilan avant/après avec les moyennes, élaborer le ' +
            'plan de réveil lettre par lettre et rendre le verdict en trois états. Le cours entier tient ' +
            'dans ces quatre scripts.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'L’ordre du pitch est…', opts: ['constat, idée, preuve, verdict', 'idée, constat, verdict, preuve', 'verdict, preuve, idée, constat'], correct: 0, exp: 'Le gaspillage d’abord, l’idée ensuite, la preuve qui suit, le verdict qui conclut.' },
      { q: 'Le constat du pitch, c’est…', opts: ['le gaspillage mesuré : 80 % d’inactivité', 'l’installation de l’hyperviseur', 'le prix des licences'], correct: 0, exp: 'Sans constat chiffré, rien ne justifie le changement.' },
      { q: 'Les trois lignes du bilan ?', a: 'Réveillés, moyenne avant, moyenne après.', opts: ['réveillés, moyennes avant/après', 'prix, panne, réparation', 'CPU, RAM, disque'], correct: 0, exp: 'Trois lignes qui résument la preuve : le matériel n’a pas changé, l’usage oui.' },
      { q: 'Les trois lettres du plan de réveil sont…', opts: ['virtualisable, économe, sûr', 'rapide, léger, sûr', 'vieux, éteint, neuf'], correct: 0, exp: 'v = matériel compatible, e = moins de 30 % d’utilisation, s = sauvegardes existantes.' },
      { q: 'Un serveur « à étudier » doit préciser…', opts: ['la première lettre manquante (v, e, s)', 'son prix', 'son âge'], correct: 0, exp: 'La lettre manquante est la prochaine action concrète du plan.' },
      { q: 'Le verdict « plan à ajuster » signifie…', opts: ['les serveurs sont prêts mais la charge dépasse', 'rien n’est possible', 'le plan est terminé'], correct: 0, exp: 'Il faut ajouter un hôte ou réduire les VM : le matériel est prêt, la charge non.' },
      { q: 'Le verdict « plan impossible » arrive quand…', opts: ['au moins un serveur reste bloqué', 'la charge dépasse 200', 'tous sont réveillés'], correct: 0, exp: 'Un serveur sans ses trois lettres bloque le plan entier.' },
      { q: 'La morale de l’histoire est…', opts: ['le succès n’exclut pas la vigilance', 'il ne faut jamais virtualiser', 'les serveurs sont paresseux'], correct: 0, exp: '« Il se plaignait quand même un peu » : un parc virtualisé se surveille (chapitre 5).' }
    ],

    pitfalls: [
      'Annoncer le verdict avant le constat : le pitch se déroule dans l’ordre de l’histoire.',
      'Présenter des moyennes sans les réveillés : les deux ensemble font la preuve.',
      'Dire « à étudier » sans la lettre manquante : le plan doit nommer la prochaine action.',
      'Oublier la charge des VM dans le plan : un plan qui noie les hôtes n’est pas prêt.'
    ],

    methodTitle: 'Convaincre, pas seulement calculer',
    method: [
      'Ouvrir par le constat chiffré (heures perdues, facture) — jamais par la technique.',
      'Étayer avec le bilan avant/après : réveillés, moyennes — trois lignes suffisent.',
      'Conclure par le plan lettré (v, e, s) et son verdict en trois états, vigilance incluse.'
    ],

    summary: [
      'Le pitch suit l’histoire : constat, idée, preuve, verdict.',
      'La preuve tient en trois lignes : réveillés, moyenne avant, moyenne après.',
      'Le plan classe chaque serveur avec v, e, s et nomme la première lettre manquante.',
      'Verdict en trois états : prêt, à ajuster, impossible — et la vigilance du chapitre 5 pour finir.'
    ],

    checklist: [
      'Je déroule le pitch en quatre étapes dans l’ordre.',
      'Je produis le bilan avant/après avec les moyennes entières.',
      'J’élaborer le plan v/e/s et je nomme la première lettre manquante.',
      'Je rends le verdict en trois états avec la charge des VM.'
    ],

    notions: [
      'pitch',
      'constat chiffré',
      'bilan avant/après',
      'moyenne',
      'plan de réveil',
      'virtualisable',
      'verdict',
      'vigilance'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — rejoue le pitch de l’histoire à voix haute, puis les exercices.' },
      { cls: 'mid', text: '50–69 % — refais le bilan avant/après jusqu’au sans-faute.' },
      { cls: 'good', text: '70–89 % — solide : construis un plan v/e/s complet pour un parc fictif.' },
      { cls: 'top', text: '≥ 95 % — maîtrise : le cours entier est prêt pour l’épreuve.' }
    ],

    flashcards: [
      { q: 'Les quatre étapes du pitch ?', a: 'Constat (gaspillage), idée (virtualisation), preuve (rentabilisation), verdict (parc plein).' },
      { q: 'Les trois lignes du bilan ?', a: 'Réveillés (avant < 30 → après ≥ 80), moyenne avant, moyenne après — moyennes entières.' },
      { q: 'Les trois lettres du plan ?', a: 'v = virtualisable, e = économe (< 30 %), s = sûr (sauvegardes) ; la première manquante est la prochaine action.' },
      { q: 'Les trois verdicts du plan ?', a: 'Plan prêt (tout OK, charge ≤ capacité), plan à ajuster (charge excessive), plan impossible (un serveur bloqué).' },
      { q: 'La morale de l’histoire ?', a: 'Le serveur rentabilisé « se plaignait quand même un peu » : un parc virtualisé se surveille toujours.' }
    ]
  }
];
