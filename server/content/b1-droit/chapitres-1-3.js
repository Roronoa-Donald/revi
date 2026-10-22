/**
 * Chapitres 1 à 3 du cours de Droit B1.
 *
 * Chapitre 1 : généralités sur le droit (objectif/subjectif, règle de droit, sanctions, branches).
 * Chapitre 2 : les sources du droit (loi, coutume, jurisprudence, doctrine, hiérarchie des normes).
 * Chapitre 3 : l'organisation judiciaire togolaise (principes, juridictions, double degré).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code (trois
 * exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-droit.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Généralités sur le droit',
    short: 'Généralités',
    toc: 'Droit objectif et droits subjectifs ; la règle de droit et ses sanctions ; droit, morale et religion ; les branches du droit.',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'Deux voisins se disputent un mur ; un salarié conteste son licenciement ; un État signe un accord avec ' +
      'une organisation internationale. Trois conflits, un même outil : le droit. Ce chapitre pose le ' +
      'vocabulaire — règle, prérogative, sanction, branches — sans lequel aucune réponse n\'est solide.',

    objectives: [
      'distinguer droit objectif et droits subjectifs, et citer la formule de Carbonnier ;',
      'caractériser la règle de droit : générale, abstraite, obligatoire, coercitive ;',
      'classer les sanctions : pénales, civiles, administratives, disciplinaires ;',
      'situer les grandes branches : droit public, droit privé et leurs subdivisions.'
    ],

    sections: [
      {
        title: 'Droit objectif et droits subjectifs',
        html: [
          '<p>Le droit se décline en deux sens. Le <strong>droit objectif</strong> est l\'ensemble des règles ' +
          'qui gouvernent l\'activité humaine dans une société organisée et dont l\'inobservation est ' +
          'sanctionnée par la contrainte d\'une autorité publique (le Code civil, par exemple). Les ' +
          '<strong>droits subjectifs</strong> sont les prérogatives que le droit objectif reconnaît à un ' +
          'individu, en sa qualité de sujet de droit, sous la protection des pouvoirs publics : droit de ' +
          'propriété, droit à l\'image, droit de vote.</p>',
          '<p>Les deux sont indissociables — Carbonnier le résume : « Si le droit (objectif) nous permet de ' +
          'faire quelque chose, nous avons le droit (subjectif) de le faire. » Le droit objectif protège ' +
          'les droits subjectifs : sans règle, pas de prérogative opposable.</p>',
          box('mnemo', 'Mnémotechnique — « O comme règle, S comme sujet »', 'pin',
            '    <p><strong>Objectif</strong> = la règle qui s\'adresse à tous (le code). <strong>Subjectif</strong> = ' +
            'le droit d\'un sujet précis (mon titre de propriété). En examen : si l\'énoncé dit « ensemble de ' +
            'règles », c\'est objectif ; si c\'est « prérogative reconnue à un individu », c\'est subjectif.</p>')
        ].join('\n')
      },
      {
        title: 'La règle de droit, ses sanctions, ses voisines',
        html: [
          '<p>La <strong>règle de droit</strong> présente deux caractères : elle est <strong>générale et ' +
          'abstraite</strong> (elle vise des situations juridiques, jamais des personnes nommément désignées) ' +
          'et <strong>obligatoire et coercitive</strong> (son respect n\'est pas laissé au bon vouloir ; la ' +
          'violation déclenche une sanction appliquée par l\'autorité publique).</p>',
          '<p>Les sanctions se classent en quatre familles : <strong>pénales</strong> (amendes, ' +
          'emprisonnement), <strong>civiles</strong> (dommages-intérêts versés à la victime), ' +
          '<strong>administratives</strong> (suspension d\'activité, retrait d\'autorisation), ' +
          '<strong>disciplinaires</strong> (avertissement, blâme, licenciement, dans un cadre professionnel ' +
          'ou institutionnel).</p>',
          '<p>Droit, morale et religion sont trois règles de conduite humaine. Elles se rejoignent souvent ' +
          '(le vol et le meurtre sont interdits aux trois titres) mais divergent parfois : le divorce est ' +
          'autorisé par la loi alors que la religion catholique l\'interdit. Ce qui distingue la règle de ' +
          'droit des autres : son caractère <strong>contraignant et coercitif</strong> — la sanction est ' +
          'étatique, pas seulement morale ou spirituelle.</p>',
          '<p>La grande division distingue le <strong>droit public</strong> (relations entre personnes ' +
          'publiques et particuliers : droit constitutionnel, administratif, fiscal, finances publiques, ' +
          'droit international public) et le <strong>droit privé</strong> (rapports entre particuliers : ' +
          'droit civil — la branche la plus ancienne, applicable à défaut de règle spéciale —, droit ' +
          'commercial, droit du travail, droit international privé).</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Une décision visant une personne nommée (un arrêté individuel) n\'est pas une règle de droit : elle manque de généralité.</li>\n' +
            '      <li>La règle morale est générale mais non coercitive : pas de sanction étatique.</li>\n' +
            '      <li>Le droit du travail est du droit <strong>privé</strong> (travail salarié du secteur privé), même s\'il est très encadré.</li>\n' +
            '      <li>Le droit civil s\'applique « à tous dès lors qu\'aucune règle spéciale ne l\'écarte » : c\'est le droit commun.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le Code civil est du droit…', opts: ['subjectif', 'objectif', 'naturel'], correct: 1, exp: 'Ensemble de règles qui gouvernent la vie en société : droit objectif.' },
      { q: 'Le droit de propriété est…', opts: ['une règle objective', 'un droit subjectif', 'une sanction'], correct: 1, exp: 'Prérogative reconnue à un individu sous la protection des pouvoirs publics.' },
      { q: 'La formule de Carbonnier dit que…', opts: ['le droit objectif protège les droits subjectifs', 'les droits subjectifs créent le droit objectif', 'le droit et la morale coïncident toujours'], correct: 0, exp: '« Si le droit nous permet de faire quelque chose, nous avons le droit de le faire. »' },
      { q: 'Une règle de droit s\'adresse…', opts: ['à des personnes nommées', 'à des situations juridiques en général', 'aux juges seuls'], correct: 1, exp: 'Elle est générale et abstraite : elle vise des situations, pas des individus désignés.' },
      { q: 'L\'amende et l\'emprisonnement sont des sanctions…', opts: ['civiles', 'administratives', 'pénales'], correct: 2, exp: 'Sanctions pénales ; les civiles sont des dommages-intérêts à la victime.' },
      { q: 'Le retrait d\'autorisation par l\'administration est une sanction…', opts: ['disciplinaire', 'administrative', 'pénale'], correct: 1, exp: 'Prononcée par l\'administration : suspension d\'activité, retrait d\'autorisation.' },
      { q: 'Le litige entre un fonctionnaire et son administration relève…', opts: ['du droit privé', 'du droit administratif', 'du droit commercial'], correct: 1, exp: 'Rapports entre administrations et usagers : droit administratif (branche du droit public).' },
      { q: 'Ce qui distingue la règle de droit de la morale, c\'est…', opts: ['son ancienneté', 'son caractère coercitif et sanctionné par l\'État', 'sa source religieuse'], correct: 1, exp: 'La sanction est appliquée par l\'autorité publique : coercition étatique.' }
    ],

    pitfalls: [
      'Confondre règle de droit et décision individuelle : la règle est générale et abstraite.',
      'Classer le droit du travail dans le droit public : il organise les rapports entre employeurs et salariés du secteur privé.',
      'Réduire les sanctions aux sanctions pénales : civiles, administratives et disciplinaires existent.',
      'Croire que droit et morale coïncident toujours : le divorce est légal mais interdit par certaines religions.'
    ],

    methodTitle: 'Méthode — qualifier une situation en trois gestes',
    method: [
      'La situation met-elle en jeu l\'État ou un particulier ? → oriente vers droit public ou privé.',
      'L\'énoncé décrit une règle (générale, abstraite) ou une prérogative d\'un sujet ? → objectif ou subjectif.',
      'Quelle sanction suit la violation ? pénale, civile, administrative ou disciplinaire — la sanction aide à identifier la branche.'
    ],

    summary: [
      'Droit objectif = ensemble de règles ; droits subjectifs = prérogatives reconnues aux sujets de droit.',
      'Règle de droit : générale et abstraite, obligatoire et coercitive.',
      'Quatre familles de sanctions : pénales, civiles, administratives, disciplinaires.',
      'Grande division : droit public (constitutionnel, administratif, fiscal…) et droit privé (civil, commercial, travail…).'
    ],

    checklist: [
      'Je sais trier dix énoncés entre objectif et subjectif.',
      'Je sais réciter les deux caractères de la règle de droit avec exemples.',
      'Je sais classer huit sanctions par famille.',
      'Je sais citer trois branches du droit public et trois du droit privé.'
    ],

    notions: [
      '<strong>Droit objectif</strong> : ensemble des règles de conduite en société.',
      '<strong>Droits subjectifs</strong> : prérogatives reconnues à un sujet de droit.',
      '<strong>Règle de droit</strong> : générale, abstraite, obligatoire, coercitive.',
      '<strong>Sanctions pénales</strong> : amendes, emprisonnement.',
      '<strong>Sanctions civiles</strong> : dommages-intérêts versés à la victime.',
      '<strong>Droit public</strong> : l\'État et les personnes publiques.',
      '<strong>Droit privé</strong> : les rapports entre particuliers.',
      '<strong>Droit civil</strong> : droit commun privé, à défaut de règle spéciale.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends les définitions objectif/subjectif et le tableau des sanctions.' },
      { cls: 'mid', text: '50–69 % — refais le classement des branches du droit.' },
      { cls: 'good', text: '70–94 % — bon niveau, cible la distinction droit/morale/religion.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Qu’est-ce que « Loi organique » ?', a: 'Loi organique : fixe le statut des pouvoirs publics.' },
      { q: 'Qu’est-ce que « Hiérarchie des normes » ?', a: 'Hiérarchie des normes : Constitution, traités, lois, règlements.' },
      { q: 'Qu’est-ce que « Conseil Supérieur de la Magistrature » ?', a: "Conseil Supérieur de la Magistrature : gardien de l'indépendance." },
      { q: 'Qu’est-ce que « Enfant simplement conçu » ?', a: 'Enfant simplement conçu : personnalité repoussée à la conception, dans son intérêt.' },
      { q: 'Qu’est-ce que « Situation juridique » ?', a: 'Situation juridique : rapport de droit né à une date, avec effets.' },
      { q: 'Qu’est-ce que « Exécution forcée » ?', a: 'Exécution forcée : contraindre le débiteur à exécuter.' },
      { q: 'Qu’est-ce que « Responsabilité délictuelle » ?', a: 'Responsabilité délictuelle : réparer le dommage causé sans contrat.' },
      { q: 'Droit objectif vs droits subjectifs ?', a: 'Objectif : ensemble des règles sanctionnées par l\'autorité publique. Subjectifs : prérogatives que ces règles reconnaissent à un individu.' },
      { q: 'La formule de Carbonnier ?', a: '« Si le droit (objectif) nous permet de faire quelque chose, nous avons le droit (subjectif) de le faire. »' },
      { q: 'Les deux caractères de la règle de droit ?', a: 'Générale et abstraite (vise des situations) ; obligatoire et coercitive (sanction étatique).' },
      { q: 'Les quatre familles de sanctions ?', a: 'Pénales (amende, prison), civiles (dommages-intérêts), administratives (retrait d\'autorisation), disciplinaires (licenciement, blâme).' },
      { q: 'Les subdivisions du droit privé ?', a: 'Droit civil (droit commun), droit commercial (commerçants), droit du travail (salariés du privé), droit international privé (rapports avec élément d\'extranéité).' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Les sources du droit',
    short: 'Sources du droit',
    toc: 'Sources directes (loi, coutume) et indirectes (jurisprudence, doctrine) ; établissement de la loi ; hiérarchie des normes.',
    time: '≈ 2 h de travail',

    situation:
      'Un juge doit trancher un litige que la loi n\'a pas prévu. D\'où tire-t-il la règle ? De la loi ' +
      'adoptée par le Parlement, de la coutume que la communauté croit obligatoire, des décisions rendues ' +
      'par ses pairs, des écrits des professeurs. Ce chapitre classe ces sources — et organise leurs ' +
      'conflits par la hiérarchie des normes.',

    objectives: [
      'distinguer sources directes (loi, coutume) et indirectes (jurisprudence, doctrine) ;',
      'décrire l\'établissement de la loi : adoption, promulgation, publication, jour franc ;',
      'expliquer non-rétroactivité et effet immédiat de la loi nouvelle ;',
      'appliquer la hiérarchie des normes : Constitution, traités, lois, règlements.'
    ],

    sections: [
      {
        title: 'Sources directes : la loi et la coutume',
        html: [
          '<p>Au sens strict, la <strong>loi</strong> est un texte adopté par le Parlement et promulgué par ' +
          'le Président de la République. Le <strong>règlement</strong> est un texte à caractère général ' +
          'édité par l\'exécutif : soit pour préciser l\'application d\'une loi (règlement d\'application), ' +
          'soit pour combler son insuffisance (règlement autonome). Décrets, arrêtés en sont des espèces.</p>',
          '<p>Types de lois : <strong>constitutionnelles</strong> (la Constitution et les textes qui ' +
          'organisent sa révision — sommet de la hiérarchie), <strong>organiques</strong> (statut des ' +
          'pouvoirs publics : Cour constitutionnelle, HAAC…), <strong>référendaires</strong> (validées par le ' +
          'peuple), <strong>ordinaires</strong> (procédure simplifiée : travail, mariage, filiation).</p>',
          '<p>L\'établissement de la loi : <strong>adoption</strong> par le Parlement, ' +
          '<strong>promulgation</strong> (le Président reconnaît le texte comme loi de la République et ' +
          'ordonne son exécution), <strong>publication</strong> au journal officiel, puis <strong>jour ' +
          'franc</strong> : la loi n\'entre en vigueur qu\'après 24 heures suivant la parution. Après ce ' +
          'délai, chacun est réputé la connaître : « nul n\'est censé ignorer la loi ».</p>',
          '<p>La <strong>coutume</strong> (Gérard Cornu) est une norme de droit objectif fondée sur une ' +
          'tradition populaire qui prête à une pratique constante un caractère juridiquement contraignant. ' +
          'Ses deux éléments constitutifs : un <strong>élément matériel</strong> (répétition prolongée et ' +
          'répandue de la pratique) et un <strong>élément psychologique</strong> (la croyance au caractère ' +
          'obligatoire de la règle). En cas de conflit, le juge applique la loi.</p>',
          box('mnemo', 'Mnémotechnique — « A-P-P-J : adoptée, promulguée, publiée, jour franc »', 'pin',
            '    <p>Une loi naît en quatre gestes : adoption, promulgation, publication, jour franc. Et elle ' +
            'regarde vers l\'avenir : « la loi ne dispose que pour l\'avenir ; elle n\'a point d\'effet ' +
            'rétroactif » (article 2 du code civil).</p>')
        ].join('\n')
      },
      {
        title: 'Sources indirectes et hiérarchie des normes',
        html: [
          '<p>La <strong>jurisprudence</strong> est l\'ensemble des décisions juridictionnelles concordantes ' +
          'rendues sur des faits non expressément prévus par la loi. Le juge ne peut refuser de juger sous ' +
          'prétexte du silence de la loi : il interprète, et les juridictions supérieures (de cassation) ' +
          'harmonisent ces interprétations. La <strong>doctrine</strong> est l\'opinion des auteurs ' +
          '(professeurs, chercheurs) sur le droit : elle influence, elle ne s\'impose pas.</p>',
          '<p>La <strong>hiérarchie des normes</strong> impose à chaque règle d\'être conforme à celle qui ' +
          'lui est supérieure : <strong>Constitution, puis traités, puis lois, puis règlements</strong>. ' +
          'En cas de conflit, la norme supérieure l\'emporte. On parle de bloc de <strong>constitutionnalité</strong> ' +
          '(la Constitution), de bloc de <strong>conventionnalité</strong> (traités et accords ' +
          'internationaux), de bloc de <strong>légalité</strong> (lois organiques, ordinaires, ordonnances) ' +
          'et de bloc <strong>réglementaire</strong> (décrets, arrêtés).</p>',
          '<p>L\'application de la loi dans le temps résout le conflit entre loi ancienne et loi nouvelle : ' +
          '<strong>non-rétroactivité</strong> — la loi nouvelle ne s\'applique pas aux situations nées avant ' +
          'elle et qui ont fini de produire leurs effets ; <strong>effet immédiat</strong> — elle s\'applique ' +
          'dès son entrée en vigueur aux situations nées après, et aux situations en cours.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>La doctrine ne s\'impose pas au juge : c\'est une source d\'inspiration, pas d\'obligation.</li>\n' +
            '      <li>Confondre promulgation et publication : l\'une est un acte du Président, l\'autre porte la loi à la connaissance des citoyens.</li>\n' +
            '      <li>Coutume contre loi : la loi l\'emporte dans les systèmes codifiés.</li>\n' +
            '      <li>Un décret n\'est pas une loi : il vit dans le bloc réglementaire, sous la légalité.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Les sources directes du droit sont…', opts: ['la loi et la coutume', 'la jurisprudence et la doctrine', 'les décrets et les arrêtés'], correct: 0, exp: 'Sources principales ; jurisprudence et doctrine sont indirectes.' },
      { q: 'La promulgation est l\'acte par lequel…', opts: ['la loi est insérée au journal officiel', 'le Président reconnaît la loi votée et ordonne son exécution', 'le Parlement vote'], correct: 1, exp: 'Promulgation = acte du Président ; publication = journal officiel.' },
      { q: 'Le jour franc désigne…', opts: ['le délai de 24 h après la parution du journal officiel', 'le jour du vote', 'un jour férié'], correct: 0, exp: 'La loi entre en vigueur 24 h après la parution : après ce délai, nul ne peut l\'ignorer.' },
      { q: 'L\'abrogation met fin…', opts: ['aux effets passés d\'une loi', 'à la force obligatoire d\'une loi pour l\'avenir', 'à la Constitution'], correct: 1, exp: 'Anéantissement pour l\'avenir : expresse (énoncée) ou tacite (incompatibilité).' },
      { q: '« La loi ne dispose que pour l\'avenir » signifie…', opts: ['elle est rétroactive', 'elle n\'a pas d\'effet rétroactif', 'elle expire vite'], correct: 1, exp: 'Article 2 du code civil : non-rétroactivité ; effet immédiat sur les situations nouvelles et en cours.' },
      { q: 'Les deux éléments constitutifs de la coutume sont…', opts: ['matériel et psychologique', 'écrit et oral', 'loi et règlement'], correct: 0, exp: 'Répétition prolongée de la pratique + croyance en son caractère obligatoire.' },
      { q: 'La hiérarchie des normes ordonne…', opts: ['Constitution, traités, lois, règlements', 'lois, Constitution, règlements, traités', 'règlements, lois, traités, Constitution'], correct: 0, exp: 'Chaque règle doit être conforme à celle qui lui est supérieure.' },
      { q: 'La jurisprudence est…', opts: ['l\'opinion des professeurs', 'l\'ensemble des décisions juridictionnelles concordantes', 'un texte voté'], correct: 1, exp: 'Décisions concordantes des juridictions sur des faits non prévus par la loi ; la doctrine est l\'opinion des auteurs.' }
    ],

    pitfalls: [
      'Confondre promulgation (acte du Président) et publication (journal officiel).',
      'Placer la doctrine au-dessus de la jurisprudence : les deux sont indirectes et ne s\'imposent pas.',
      'Faire passer un décret pour une loi : le décret relève du bloc réglementaire.',
      'Rendre la loi nouvelle rétroactive : elle s\'applique à l\'avenir, pas aux situations éteintes.'
    ],

    methodTitle: 'Méthode — résoudre un conflit de normes',
    method: [
      'Identifier la nature de chaque texte : constitution, traité, loi, règlement.',
      'Placer chaque texte dans son bloc : constitutionnalité, conventionnalité, légalité, réglementaire.',
      'Le conflit se résout par le rang : la norme supérieure l\'emporte.',
      'Si le conflit est dans le temps : la situation éteinte reste sous l\'ancienne loi, le reste passe sous la nouvelle.'
    ],

    summary: [
      'Sources directes : loi et coutume. Sources indirectes : jurisprudence et doctrine.',
      'Loi : adoption, promulgation, publication, jour franc — puis « nul n\'est censé ignorer la loi ».',
      'Coutume : élément matériel (pratique constante) + élément psychologique (croyance obligatoire).',
      'Hiérarchie : Constitution, puis traités, puis lois, puis règlements ; la norme supérieure l\'emporte.'
    ],

    checklist: [
      'Je sais ordonner les quatre étapes d\'établissement de la loi avec leurs dates.',
      'Je sais distinguer abrogation expresse et tacite.',
      'Je sais classer huit textes dans les quatre blocs de la pyramide.',
      'Je sais statuer sur une situation née avant et finie après la loi nouvelle.'
    ],

    notions: [
      '<strong>Loi</strong> : texte voté par le Parlement, promulgué par le Président.',
      '<strong>Règlement</strong> : texte général de l\'exécutif (décrets, arrêtés).',
      '<strong>Loi organique</strong> : fixe le statut des pouvoirs publics.',
      '<strong>Jour franc</strong> : délai de 24 h entre parution et entrée en vigueur.',
      '<strong>Abrogation</strong> : fin de la force obligatoire pour l\'avenir (expresse ou tacite).',
      '<strong>Coutume</strong> : pratique constante + croyance obligatoire.',
      '<strong>Jurisprudence</strong> : décisions juridictionnelles concordantes.',
      '<strong>Hiérarchie des normes</strong> : Constitution, traités, lois, règlements.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends l\'établissement de la loi et la pyramide des normes.' },
      { cls: 'mid', text: '50–69 % — refais les types de lois et les blocs de la hiérarchie.' },
      { cls: 'good', text: '70–94 % — bon niveau, cible non-rétroactivité et effet immédiat.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Sources directes vs indirectes ?', a: 'Directes : loi et coutume (créent la règle). Indirectes : jurisprudence et doctrine (interprètent, inspirent).' },
      { q: 'Les quatre étapes de la loi ?', a: 'Adoption (Parlement), promulgation (Président), publication (journal officiel), jour franc (24 h) puis entrée en vigueur.' },
      { q: 'Abrogation expresse vs tacite ?', a: 'Expresse : le texte nouveau l\'énonce. Tacite : il résulte d\'une disposition incompatible avec l\'ancienne.' },
      { q: 'Non-rétroactivité et effet immédiat ?', a: 'La loi nouvelle ne touche pas les situations éteintes avant elle ; elle s\'applique aux situations nées après et aux situations en cours.' },
      { q: 'La pyramide des normes ?', a: 'Constitution (constitutionnalité), traités (conventionnalité), lois (légalité), règlements (bloc réglementaire) ; la norme supérieure l\'emporte.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'L\'organisation judiciaire togolaise',
    short: 'Organisation judiciaire',
    toc: 'Nul ne peut se faire justice ; séparation des pouvoirs, égalité devant la loi, double degré ; les juridictions.',
    time: '≈ 2 h de travail',

    situation:
      'Un litige dégénère : l\'un des voisins veut « se rendre justice » lui-même. Le droit répond par un ' +
      'principe universel — la fonction de juger appartient à l\'État — et par une organisation : des ' +
      'juridictions hiérarchisées, des principes garantissant l\'indépendance et l\'égalité, un double ' +
      'degré pour corriger les erreurs.',

    objectives: [
      'expliquer pourquoi « nul ne peut se faire justice » confie le jugement à l\'État ;',
      'citer les trois principes de l\'organisation judiciaire ;',
      'placer un dossier devant la bonne juridiction : TPI, Cour d\'Appel, Cour Suprême ;',
      'justifier le double degré de juridiction comme garantie de bonne justice.'
    ],

    sections: [
      {
        title: 'Les trois principes',
        html: [
          '<p>Le principe « <strong>nul ne peut se faire justice</strong> » interdit au particulier de se ' +
          'rendre justice lui-même : la fonction de juger est affectée à l\'État, qui l\'exerce à travers un ' +
          'service public — la justice. L\'organisation judiciaire togolaise repose alors sur trois principes :</p>',
          '<ul>\n' +
          '    <li><strong>Séparation des pouvoirs</strong> (Montesquieu : « le pouvoir arrête le pouvoir ») : la Constitution de la Ve République (promulguée en 2024) consacre l\'indépendance du pouvoir judiciaire ; les juges sont soumis à la loi, inamovibles ; le Conseil Supérieur de la Magistrature veille à cette indépendance.</li>\n' +
          '    <li><strong>Égalité de tous devant la loi</strong> (article 2 de la Constitution) : aucune discrimination fondée sur l\'origine, la race, l\'ethnie, le sexe, le handicap, le statut social ou la religion ; égal accès de tous les citoyens à la justice.</li>\n' +
          '    <li><strong>Double degré de juridiction</strong> : tout plaideur insatisfait peut porter son affaire devant une juridiction supérieure, qui examine à nouveau le litige — un rattrapage des erreurs éventuelles des premiers juges.</li>\n' +
          '  </ul>',
          box('mnemo', 'Mnémotechnique — « S-E-D : séparer, égaliser, doubler »', 'pin',
            '    <p>Séparation des pouvoirs (indépendance), Égalité devant la loi (non-discrimination), Double ' +
            'degré (deux regards sur chaque affaire). Les trois sont des « gages de bonne justice ».</p>')
        ].join('\n')
      },
      {
        title: 'La structure des juridictions',
        html: [
          '<p>L\'organisation judiciaire est régie au Togo par la loi N°2019-015 du 30 octobre 2019 portant ' +
          'Code de l\'organisation judiciaire. On distingue :</p>',
          '<p><strong>Juridictions de droit commun</strong> : les <strong>Tribunaux de Première Instance ' +
          '(TPI)</strong> — premier degré ; les <strong>Cours d\'Appel</strong> — deuxième degré, qui ' +
          'examinent les appels des décisions des TPI ; la <strong>Cour Suprême</strong> — juge suprême ' +
          '(civil, pénal, administratif). <strong>Juridictions spécialisées</strong> : elles traitent de ' +
          'matières déterminées et disposent de compétences juridictionnelles particulières.</p>',
          '<p>Ce chapitre s\'illustre par les TPE du support : la légitime défense (la seule riposte ' +
          'immédiate admise, strictement encadrée), les infractions informatiques (piratage, fraude, ' +
          'usurpation d\'identité), le droit à l\'oubli numérique, les fake news et la responsabilité ' +
          'juridique — autant de terrains où le juge applique les principes ci-dessus à des litiges modernes.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Le double degré ne permet pas de « rejuger sans fin » : deux regards, puis la Cour Suprême vérifie le droit, pas les faits.</li>\n' +
            '      <li>La Cour d\'Appel réexamine le litige ; elle n\'est pas un « second TPI » indépendant du premier jugement.</li>\n' +
            '      <li>L\'inamovibilité des juges est une garantie contre la pression de l\'exécutif, pas un privilège.</li>\n' +
            '      <li>« Égalité devant la loi » ne supprime pas les juridictions spécialisées : même droit, compétences adaptées.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: '« Nul ne peut se faire justice » signifie…', opts: ['le particulier juge ses voisins', 'la fonction de juger appartient à l\'État', 'la vengeance est tolérée'], correct: 1, exp: 'La justice est un service public de l\'État.' },
      { q: '« Le pouvoir arrête le pouvoir » résume…', opts: ['le double degré', 'la séparation des pouvoirs (Montesquieu)', 'l\'égalité devant la loi'], correct: 1, exp: 'Chaque pouvoir limite les autres ; le judiciaire est indépendant.' },
      { q: 'Le Conseil Supérieur de la Magistrature veille à…', opts: ['l\'indépendance des juges', 'la publication des lois', 'la rédaction des décrets'], correct: 0, exp: 'Garantie de l\'indépendance du pouvoir judiciaire.' },
      { q: 'Le premier degré de juridiction, c\'est…', opts: ['la Cour Suprême', 'le Tribunal de Première Instance', 'la Cour d\'Appel'], correct: 1, exp: 'Les TPI sont les juridictions de droit commun de premier degré.' },
      { q: 'La Cour d\'Appel…', opts: ['crée des lois', 'examine les appels des décisions des TPI', 'remplace le TPI'], correct: 1, exp: 'Deuxième degré : elle réexamine le litige.' },
      { q: 'Le double degré vise surtout…', opts: ['à retarder les procès', 'le rattrapage des erreurs des premiers juges', 'à doubler les amendes'], correct: 1, exp: 'Un second examen du litige : gage de bonne justice.' },
      { q: 'L\'organisation judiciaire togolaise est régie par…', opts: ['la Constitution de 2024 seule', 'la loi N°2019-015 portant Code de l\'organisation judiciaire', 'un décret municipal'], correct: 1, exp: 'Loi N°2019-015 du 30 octobre 2019.' },
      { q: 'L\'article 2 de la Constitution garantit…', opts: ['l\'égalité devant la loi sans discrimination', 'le droit de vote à 16 ans', 'la gratuité des procès'], correct: 0, exp: 'Non-discrimination : origine, race, ethnie, sexe, handicap, statut social, religion.' }
    ],

    pitfalls: [
      'Confondre Cour Suprême et Cour d\'Appel : l\'une juge en dernier ressort le droit, l\'autre réexamine le litige.',
      'Citer deux principes sur trois : séparation, égalité et double degré forment le triptyque.',
      'Penser que la séparation des pouvoirs isole le juge du droit : il reste soumis à la loi.',
      'Confondre juridiction de droit commun et juridiction spécialisée.'
    ],

    methodTitle: 'Méthode — router un dossier',
    method: [
      'Premier jugement ? → Tribunal de Première Instance (droit commun).',
      'Insatisfaction sur le fond ? → Cour d\'Appel (deuxième degré, réexamen).',
      'Question de droit tranchée de façon divergente ? → Cour Suprême.',
      'Matière déterminée ? → vérifier s\'il existe une juridiction spécialisée compétente.'
    ],

    summary: [
      'Nul ne peut se faire justice : juger est une fonction étatique, service public de la justice.',
      'Trois principes : séparation des pouvoirs, égalité devant la loi, double degré de juridiction.',
      'Droit commun : TPI (premier degré), Cours d\'Appel (deuxième), Cour Suprême (juge suprême).',
      'Juridictions spécialisées : compétences juridictionnelles sur des matières déterminées.'
    ],

    checklist: [
      'Je sais expliquer la maxime « nul ne peut se faire justice ».',
      'Je sais citer les trois principes et un exemple chacun.',
      'Je sais router quatre dossiers entre TPI, Cour d\'Appel et Cour Suprême.',
      'Je sais justifier le double degré par la correction des erreurs.'
    ],

    notions: [
      '<strong>Nul juge</strong> : l\'interdiction de la justice privée.',
      '<strong>Séparation des pouvoirs</strong> : législatif, exécutif, judiciaire indépendants.',
      '<strong>Inamovibilité</strong> : garantie d\'indépendance des juges.',
      '<strong>Conseil Supérieur de la Magistrature</strong> : gardien de l\'indépendance.',
      '<strong>Égalité devant la loi</strong> : non-discrimination, égal accès à la justice.',
      '<strong>TPI</strong> : juridiction de droit commun de premier degré.',
      '<strong>Cour d\'Appel</strong> : deuxième degré, réexamine le litige.',
      '<strong>Cour Suprême</strong> : juge suprême (civil, pénal, administratif).'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends les trois principes et la structure des juridictions.' },
      { cls: 'mid', text: '50–69 % — refais le routage de dossiers par degré.' },
      { cls: 'good', text: '70–94 % — bon niveau, cible les justifications constitutionnelles.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Pourquoi « nul ne peut se faire justice » ?', a: 'La fonction de juger est affectée à l\'État, qui l\'exerce par un service public : la justice.' },
      { q: 'Les trois principes de l\'organisation judiciaire ?', a: 'Séparation des pouvoirs, égalité de tous devant la loi, double degré de juridiction.' },
      { q: 'Que garantit l\'inamovibilité des juges ?', a: 'L\'indépendance du judiciaire contre les pressions de l\'exécutif et du législatif ; le CSM la veille.' },
      { q: 'TPI, Cour d\'Appel, Cour Suprême : leurs rôles ?', a: 'TPI : premier degré. Cour d\'Appel : réexamine les décisions des TPI. Cour Suprême : juge suprême (civil, pénal, administratif).' },
      { q: 'À quoi sert le double degré ?', a: 'À faire réexaminer un litige par une juridiction supérieure : rattrapage des erreurs éventuelles des premiers juges.' }
    ]
  }
];
