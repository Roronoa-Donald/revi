/**
 * Chapitres 4 à 6 du cours d'Anglais des affaires B1.
 *
 * Chapitre 4 : pronunciation and fluency (sons /θ/ /ð/ /h/, -ed endings, word stress, thought groups).
 * Chapitre 5 : register and reductions (gonna/wanna/gotta, intonation, linking, fluency tracking).
 * Chapitre 6 : professional grammar (polite requests, subject-verb agreement, évaluation finale).
 *
 * Les ateliers de code (trois exercices Bash par chapitre) sont injectés avant
 * le QCM par `scripts/generate-code-labs.js` à partir de
 * `server/exercises/b1-anglais.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Pronunciation and fluency techniques',
    short: 'Prononciation',
    toc: 'Les sons difficiles des francophones (/θ/, /ð/, /h/) ; les trois -ed ; l\'accent de mot et de phrase ; les groupes de souffle.',
    time: '≈ 2 h de travail',

    situation:
      'Leo a le vocabulaire et la structure, mais en appel il n\'est pas compris : « tink » pour think, ' +
      'l\'h muet, un débit robot sans pauses. La prononciation ne se corrige pas par la lecture — elle se ' +
      'travaille son par son, mot par mot, groupe de souffle par groupe de souffle.',

    objectives: [
      'produire les sons /θ/ (think) et /ð/ (the) avec la langue entre les dents ;',
      'prononcer le h aspiré (hello, have, help) sans le taire ;',
      'classer les -ed endings en /t/, /d/ et /ɪd/ ;',
      'couper la phrase en thought groups pour sonner naturel.'
    ],

    sections: [
      {
        title: 'Les cinq sons problématiques',
        html: [
          '<p>Le support liste les cinq difficultés des francophones : le <strong>/θ/</strong> de think, ' +
          'three, deadline (ni « tink » ni « sink ») ; le <strong>/ð/</strong> de the, this, that ; le ' +
          '<strong>/h/</strong> de hello, have, help (pas silencieux !) ; le <strong>e final</strong> souvent ' +
          'muet (make, time, note) ; et les <strong>terminaisons -ed</strong> en /t/, /d/ ou /ɪd/.</p>',
          '<p>Le <strong>/θ/ — the tongue sandwich</strong> : la langue entre les dents, souffler. Mots à ' +
          'répéter : think, thanks, three, month, deadline, both. Exercice du support : « Thank you for the ' +
          'thoughtful thing » cinq fois. Le <strong>/h/ — don\'t be silent</strong> : expirer fort, pas ' +
          '« \'ello » mais « hello » — « How have you been ? Happy to help ! » en accentuant chaque H.</p>',
          '<p>Les <strong>-ed endings</strong> se prononcent de trois façons : <strong>/t/</strong> après ' +
          'son sourd (walked, laughed, missed), <strong>/d/</strong> après son voisé (called, loved, ' +
          'changed), <strong>/ɪd/</strong> après T ou D (wanted, needed, started). Exercice : trier fixed, ' +
          'ended, deployed, tested, used.</p>',
          box('mnemo', 'Mnémotechnique — « la langue entre les dents, l\'h qui souffle, le -ed à trois voix »', 'pin',
            '    <p>/θ/ et /ð/ = langue entre les dents (sandwich). /h/ = souffle audible. -ed = /t/ après ' +
            'sourd, /d/ après voisé, /ɪd/ après T ou D. Trois réflexes qui débloquent 80 % de l\'intelligibilité.</p>')
        ].join('\n')
      },
      {
        title: 'Accent, pauses et fluidité',
        html: [
          '<p>L\'<strong>accent de mot</strong> change le sens : <strong>REcord</strong> (nom, un fichier) ' +
          'contre <strong>reCORD</strong> (verbe, enregistrer) ; <strong>PREsent</strong> (cadeau) contre ' +
          '<strong>preSENT</strong> (montrer). Exercice du support : CONduct/conDUCT, OBject/obJECT.</p>',
          '<p>L\'<strong>accent de phrase</strong> met en relief le mot important : « I didn\'t delete the ' +
          'file » change de sens selon le mot accentué (quelqu\'un d\'autre l\'a fait ; je le nie ' +
          'fortement ; j\'ai fait autre chose ; j\'ai supprimé autre chose).</p>',
          '<p>Les <strong>thought groups</strong> coupent la phrase aux frontières naturelles : « We need to ' +
          'finish by Friday (pause) so let\'s work hard ». Le linking soude les mots : « get on » devient ' +
          '« Ge-ton », « not at all » devient « No-ta-tall », « an apple » devient « A-napple » — la phrase ' +
          'coule d\'un seul tenant : « What are you waiting for ? ».</p>',
          '<p>L\'<strong>intonation</strong> monte pour les questions oui/non (« Are you coming ? ↗ ») et ' +
          'descend pour les déclarations et questions WH (« Where are you going ? ↘ »). Le <strong>recording ' +
          'lab</strong> du support fait écouter sa propre voix : est-ce que je perds les H ? Est-ce que je ' +
          'pause ? Mon accent est-il juste ?</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>« Tink » pour think : le /θ/ exige la langue entre les dents, pas un t ni un s.</li>\n' +
            '      <li>« \'ello » pour hello : le /h/ se souffle, il ne se tait pas.</li>\n' +
            '      <li>Tous les -ed ne se prononcent pas pareil : wanted (/ɪd/) et walked (/t/) diffèrent.</li>\n' +
            '      <li>Débit continu sans pauses : la fluidité n\'est pas la vitesse, c\'est le rythme.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le son /θ/ se produit avec…', opts: ['les lèvres arrondies', 'la langue entre les dents', 'la gorge serrée'], correct: 1, exp: 'The tongue sandwich : think, thanks, three, month.' },
      { q: '« Hello » se prononce…', opts: ['\'ello, sans h', 'hello, avec le h aspiré', 'héllo avec accent français'], correct: 1, exp: 'Le /h/ se souffle : How have you been ? Happy to help !' },
      { q: 'L\'-ed de « walked » se prononce…', opts: ['/t/', '/d/', '/ɪd/'], correct: 0, exp: 'Après son sourd (k) : /t/. Après son voisé : /d/. Après T ou D : /ɪd/.' },
      { q: 'L\'-ed de « wanted » se prononce…', opts: ['/t/', '/d/', '/ɪd/'], correct: 2, exp: 'Après T ou D : /ɪd/ — wanted, needed, started.' },
      { q: 'REcord (accent en tête) désigne…', opts: ['le verbe enregistrer', 'le nom, un fichier', 'l\'adjectif'], correct: 1, exp: 'Accent en tête = nom ; accent en fin = verbe (reCORD).' },
      { q: 'Une question oui/non prend une intonation…', opts: ['montante ↗', 'descendante ↘', 'plate'], correct: 0, exp: 'Rising pour Are you coming ? ; falling pour les WH et déclarations.' },
      { q: 'Un thought group est…', opts: ['une diapositive', 'un groupe de mots séparé par une pause', 'une liaison sonore'], correct: 1, exp: 'Couper la phrase aux frontières naturelles pour ne plus sonner robot.' },
      { q: '« Not at all » se lie en…', opts: ['No-ta-tall', 'not-at-all détaché', 'No-tall'], correct: 0, exp: 'Le linking soude les mots pour fluidifier le débit.' }
    ],

    pitfalls: [
      'Prononcer think comme tink ou sink : la langue doit être entre les dents.',
      'Taquer le h de hello, have, help : il se souffle.',
      'Dire tous les -ed en /ɪd/ : trois prononciations existent selon le son final.',
      'Lire ses notes à voix robot : accentuer le mot-clé et respirer par groupes.'
    ],

    methodTitle: 'Méthode — travailler un son en quatre gestes',
    method: [
      'Isoler le son : écouter, répéter dix fois (drill du support).',
      'Le replacer dans des mots fréquents : think, three, month, deadline.',
      'Le replacer dans une phrase complète avec linking et pauses.',
      'S\'enregistrer et s\'auto-corriger : H perdus ? Pauses ? Accent ?'
    ],

    summary: [
      'Cinq sons difficiles : /θ/, /ð/, /h/, e final muet, -ed à trois voix.',
      '/θ/ et /ð/ : langue entre les dents ; /h/ : souffle audible.',
      '-ed : /t/ après sourd, /d/ après voisé, /ɪd/ après T ou D.',
      'Accent de mot (REcord/reCORD) et de phrase, thought groups, linking, intonation ↗/↘.'
    ],

    checklist: [
      'Je sais produire /θ/ dans cinq mots sans y penser.',
      'Je sais trier dix verbes en -ed selon leur son.',
      'Je sais accentuer REcord/reCORD et PREsent/preSENT.',
      'Je sais couper une phrase en thought groups et la lire en fluide.'
    ],

    notions: [
      '<strong>/θ/ (think)</strong> : langue entre les dents, souffle.',
      '<strong>/ð/ (the)</strong> : même position, son voisé.',
      '<strong>/h/ (hello)</strong> : h aspiré, jamais muet.',
      '<strong>-ed /t/</strong> : après son sourd (walked).',
      '<strong>-ed /ɪd/</strong> : après T ou D (wanted).',
      '<strong>Word stress</strong> : REcord (nom) vs reCORD (verbe).',
      '<strong>Thought groups</strong> : pauses aux frontières naturelles.',
      '<strong>Intonation ↗/↘</strong> : montante oui/non, descendante ailleurs.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprennez les cinq sons, un par un, avec les drills.' },
      { cls: 'mid', text: '50–69 % — refaites le tri des -ed et les paires d\'accent.' },
      { cls: 'good', text: '70–94 % — bon niveau, ciblez linking et intonation.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'The tongue sandwich ?', a: 'Le /θ/ de think : la langue entre les dents, on souffle — ni « tink » ni « sink ».' },
      { q: 'Les trois prononciations de -ed ?', a: '/t/ après son sourd (walked), /d/ après son voisé (called), /ɪd/ après T ou D (wanted).' },
      { q: 'REcord vs reCORD ?', a: 'Accent en tête = nom (un fichier) ; accent en fin = verbe (enregistrer). Idem PREsent/preSENT.' },
      { q: 'Qu\'est-ce qu\'un thought group ?', a: 'Un groupe de mots séparé des autres par une pause : « We need to finish by Friday (pause) so let\'s work hard ».' },
      { q: 'Intonation des questions ?', a: 'Montante ↗ pour les questions oui/non ; descendante ↘ pour les WH-questions et déclarations.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Register, reductions and fluency',
    short: 'Registres',
    toc: 'Gonna, wanna, gotta : quand les réduire ; intonation montante et descendante ; reductions formelles ; suivi de fluidité.',
    time: '≈ 2 h de travail',

    situation:
      'En pause café, « I\'m gonna send that email » passe très bien. En présentation client, la même ' +
      'phrase coûte la crédibilité. Le registre n\'est pas une règle scolaire : c\'est un choix contextuel — ' +
      'et il s\'entraîne comme la prononciation.',

    objectives: [
      'remplacer les réductions familières par leur forme formelle en contexte professionnel ;',
      'choisir l\'intonation montante ou descendante selon la phrase ;',
      'distinguer reductions acceptables (casual) et interdites (formal) ;',
      'suivre sa progression de fluidité semaine par semaine.'
    ],

    sections: [
      {
        title: 'Reductions : quand, comment',
        html: [
          '<p>Le support classe les <strong>reductions</strong> : <strong>gonna</strong> (going to), ' +
          '<strong>wanna</strong> (want to), <strong>gotta</strong> (got to). Elles sont <strong>ok en ' +
          'parole casual</strong> entre collègues : « I\'m gonna send that email ». Elles sont <strong>interdites ' +
          'en contexte formel</strong> : devant un client, « We\'re going to deploy on Friday ».</p>',
          '<p>Exercice de passage au formel : « I gotta go » → « I have to go » ; « Wanna meet ? » → ' +
          '« Would you like to meet ? » ; « Gonna start now » → « We are going to start now ». Le registre ' +
          'se corrige phrase par phrase, comme une faute de frappe.</p>',
          '<p>Le lien avec le chapitre 2 : le registre de l\'email (subject line, salutation, signature) et ' +
          'le registre oral suivent la même règle — le destinataire décide. Collègue de toujours : casual ' +
          'toléré. Client, direction, présentation : formel intégral.</p>',
          box('mnemo', 'Mnémotechnique — « casual chez soi, formel en clientèle »', 'pin',
            '    <p>Gonna/wanna/gotta vivent au café et meurent au boardroom. La question à se poser : ' +
            '« qui m\'entend ? » — et le registre se choisit tout seul.</p>')
        ].join('\n')
      },
      {
        title: 'Intonation et suivi de fluidité',
        html: [
          '<p>L\'<strong>intonation</strong> se travaille par paires : « You\'re done ? ↗ » (surprise) ' +
          'contre « You\'re done. ↘ » (constat). Les listes descendent item par item et remontent à ' +
          'l\'av dernier élément. Un mauvais patron d\'intonation rend une phrase correcte incompréhensible.</p>',
          '<p>La <strong>fluency vs perfection</strong> du support : « You don\'t need a perfect accent. You ' +
          'need to be understood. » Les natifs font des erreurs aussi ; l\'objectif est l\'intelligibilité, ' +
          'pas l\'accent parfait. « You are already fluent enough. Today is about polishing, not perfection. »</p>',
          '<p>Le <strong>suivi</strong> : enregistrer un message d\'une minute chaque jour, s\'écouter, ' +
          'compter les défauts (H perdus, pauses manquées, accent faux), puis comparer jour après jour. La ' +
          'fluidité est une habitude, pas une destination : le graphique des défauts qui baisse vaut mieux ' +
          'que l\'auto-satisfaction.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Gonna en présentation client : remplacez par going to, sans exception.</li>\n' +
            '      <li>Intonation descendante sur une question oui/non : l\'interlocuteur croit entendre une déclaration.</li>\n' +
            '      <li>Chasser l\'accent parfait : l\'objectif est d\'être compris, pas imité.</li>\n' +
            '      <li>Corriger sans enregistrer : l\'oreille se forme en s\'écoutant, pas en lisant des règles.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: '« I\'m gonna send that email » est…', opts: ['ok entre collègues', 'ok en présentation client', 'toujours faux'], correct: 0, exp: 'Casual speech OK avec des collègues ; formel exige going to.' },
      { q: 'Devant un client, on dit…', opts: ['we\'re gonna deploy', 'we\'re going to deploy', 'we wanna deploy'], correct: 1, exp: 'Formal : pas de reductions.' },
      { q: '« Gotta » signifie…', opts: ['want to', 'got to / have to', 'going to'], correct: 1, exp: 'Gonna = going to ; wanna = want to ; gotta = got to.' },
      { q: '« You\'re done ? » avec intonation montante exprime…', opts: ['un constat', 'la surprise (question)', 'une excuse'], correct: 1, exp: 'Rising = question ; falling = déclaration.' },
      { q: 'La position du support sur l\'accent :', opts: ['il faut un accent parfait', 'il faut être compris', 'il faut imiter les natifs'], correct: 1, exp: '« You need to be understood » — fluency vs perfection.' },
      { q: 'Suivre sa fluidité demande de…', opts: ['lire des règles chaque soir', 's\'enregistrer et se réécouter', 'parler plus vite'], correct: 1, exp: 'Recording lab : un message par jour, s\'écouter, compter les défauts.' },
      { q: 'Une liste d\'items prend une intonation…', opts: ['montante sur tous les items', 'descendante item par item', 'plate'], correct: 1, exp: 'Les listes descendent, l\'intonation remonte à l\'av-dernier ou dernier item selon l\'ouverture suivante.' },
      { q: 'Wanna meet ? au formel devient…', opts: ['You want to meet ?', 'Would you like to meet ?', 'Wishing to meet ?'], correct: 1, exp: 'La forme polie remplace la réduction : Would you like to…' }
    ],

    pitfalls: [
      'Garder gonna/wanna dans un email ou une présentation formels.',
      'Descendre en fin de question oui/non : le sens bascule en déclaration.',
      'Viser l\'accent parfait au lieu de l\'intelligibilité.',
      'S\'améliorer sans mesurer : sans recording lab, pas de progression visible.'
    ],

    methodTitle: 'Méthode — passer un passage au registre formel',
    method: [
      'Repérer les reductions : gonna, wanna, gotta, y a-t-il un cas ?',
      'Remplacer : going to / want to / have to — ou reformuler poliment (Would you like to…).',
      'Vérifier l\'intonation : question oui/non ↗, déclaration et WH ↘.',
      'S\'enregistrer, écouter, compter les défauts — et rejouer.'
    ],

    summary: [
      'Reductions : gonna/wanna/gotta ok en casual, interdites en formel.',
      'Corrections : going to, want to, got to (ou have to) ; Would you like to… pour inviter.',
      'Intonation : ↗ questions oui/non, ↘ déclarations et questions WH.',
      'Fluency vs perfection : être compris prime ; s\'enregistrer pour progresser.'
    ],

    checklist: [
      'Je sais corriger cinq réductions en formes formelles.',
      'Je sais choisir l\'intonation de huit phrases variées.',
      'Je sais expliquer pourquoi l\'accent parfait n\'est pas l\'objectif.',
      'Je sais mettre en place un recording lab hebdomadaire.'
    ],

    notions: [
      '<strong>Gonna</strong> : going to, casual seulement.',
      '<strong>Wanna</strong> : want to, casual seulement.',
      '<strong>Gotta</strong> : got to / have to, casual seulement.',
      '<strong>Register</strong> : casual vs formal selon le destinataire.',
      '<strong>Rising intonation</strong> : questions oui/non.',
      '<strong>Falling intonation</strong> : déclarations et WH-questions.',
      '<strong>Recording lab</strong> : s\'enregistrer, s\'écouter, se corriger.',
      '<strong>Fluency</strong> : être compris, pas être parfait.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprenez les trois reductions et leurs formes formelles.' },
      { cls: 'mid', text: '50–69 % — refaites l\'exercice intonation du support.' },
      { cls: 'good', text: '70–94 % — bon niveau, ciblez le suivi de fluidité.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Quand gonna est-il acceptable ?', a: 'En parole casual entre collègues ; jamais en présentation client ni email formel.' },
      { q: 'Les trois reductions et leurs formes ?', a: 'Gonna = going to ; wanna = want to ; gotta = got to / have to.' },
      { q: 'Intonation de « Are you coming ? »', a: 'Montante ↗ (question oui/non) ; une WH-question descend ↘.' },
      { q: 'Fluency vs perfection ?', a: '« You don\'t need a perfect accent. You need to be understood » : l\'intelligibilité prime.' },
      { q: 'Le recording lab ?', a: 'Enregistrer un message d\'une minute, s\'écouter, vérifier H, pauses et stress, puis corriger.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Professional grammar and assessment',
    short: 'Grammaire pro',
    toc: 'Requêtes polies (sujet, verbe, politesse) ; accord sujet-verbe ; l\'évaluation finale des quatre compétences.',
    time: '≈ 2 h de travail',

    situation:
      'Le test final approche. Leo relit ses emails : « Me want finish work soon yes », « You send file ' +
      'yesterday ? » — phrases télégraphiques sans sujet, sans verbe conjugué, sans politesse. La grammaire ' +
      'professionnelle, c\'est la politesse rendue syntaxique : sujet + verbe conjugué + formule. Puis le ' +
      'verdict : admis ou entraînement.',

    objectives: [
      'transformer les phrases télégraphiques en requêtes polies complètes ;',
      'corriger les accords sujet-verbe (singular/plural) ;',
      'réutiliser le vocabulaire des sessions précédentes en contexte ;',
      's\'auto-évaluer sur les quatre compétences du module.'
    ],

    sections: [
      {
        title: 'Requêtes polies et accords',
        html: [
          '<p>Le tableau « bad business English » du support se corrige avec trois ingrédients : un ' +
          '<strong>sujet</strong>, un <strong>verbe conjugué</strong>, une <strong>formule polie</strong>. ' +
          '« Me want finish work soon yes » → « I want to finish work soon » ; « You send file yesterday ? » ' +
          '→ « Did you send the file yesterday ? » ; « Server crash. Fix now ! » → « The server crashed. ' +
          'Could we please fix it now ? » ; « Client call. You talk. Not me. » → « The client is calling. ' +
          'Can you talk to them ? I cannot. »</p>',
          '<p>L\'<strong>accord sujet-verbe</strong> complete : le sujet singulier prend le verbe avec -s ' +
          '(the server works), le sujet pluriel sans -s (the servers work). Une erreur d\'accord dans un ' +
          'email client passe pour de la négligence : la relecture n\'est pas optionnelle.</p>',
          '<p>Les formules de politesse structurent la requête : « Could you please… », « Would you be able ' +
          'to… », « I would appreciate it if you could… ». Le refus poli : « I cannot », puis une ' +
          'alternative — jamais un sec « no ».</p>',
          box('mnemo', 'Mnémotechnique — « S-V-P : sujet, verbe, politesse »', 'pin',
            '    <p>Toute requête professionnelle se construit en trois temps : sujet explicite, verbe ' +
            'conjugué, formule de politesse. S-V-P comme « s\'il vous plaît » — justement.</p>')
        ].join('\n')
      },
      {
        title: 'L\'évaluation finale',
        html: [
          '<p>Le bilan du support résume le parcours de Leo : session 1 (vocabulaire), session 2 (emails), ' +
          'session 3 (présentations), session 4 (prononciation). L\'évaluation finale couvre les quatre ' +
          'compétences : <strong>vocabulary</strong>, <strong>email writing</strong>, <strong>oral ' +
          'presentation</strong>, <strong>pronunciation</strong> — chacune notée, moyennée, comparée au ' +
          'seuil de passage.</p>',
          '<p>La moyenne se calcule : somme des scores divisée par le nombre de compétences. Le verdict ' +
          'suit : <strong>admis</strong> (moyenne ≥ seuil) ou <strong>entraînement</strong> (retour aux ' +
          'exercices ciblés de la compétence la plus faible). Et la conclusion du support vaut programme : ' +
          '« You passed. But fluency is a habit, not a destination. »</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Phrase sans sujet : « Me want… » n\'existe pas en anglais professionnel — I want to…</li>\n' +
            '      <li>Verbe non conjugué : « You send file yesterday ? » → Did you send… ?</li>\n' +
            '      <li>Refus sec : « Not me » heurte ; « I cannot, but… » garde la relation.</li>\n' +
            '      <li>Moyenne sans pondération : chaque compétence compte autant dans le calcul du verdict.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: '« You send file yesterday ? » se corrige en…', opts: ['You sent file yesterday ?', 'Did you send the file yesterday ?', 'Send the file yesterday ?'], correct: 1, exp: 'Sujet + auxiliaire did + verbe : la requête polie complete.' },
      { q: '« Server crash. Fix now ! » devient…', opts: ['Server crashed. Fix now !', 'The server crashed. Could we please fix it now ?', 'Fix the server !'], correct: 1, exp: 'Sujet + verbe conjugué + formule polie (S-V-P).' },
      { q: 'Le sujet singulier prend…', opts: ['le verbe avec -s', 'le verbe sans -s', 'un auxiliaire'], correct: 0, exp: 'The server works ; the servers work.' },
      { q: 'Le refus poli se formule…', opts: ['No.', 'I cannot, puis une alternative', 'Not me.'], correct: 1, exp: 'Le support : « Can you talk to them ? I cannot. »' },
      { q: '« I would appreciate it if you could… » sert à…', opts: ['refuser', 'formuler une requête polie', 'conclure'], correct: 1, exp: 'Formule formelle de requête, adaptée aux clients.' },
      { q: 'Les quatre compétences de l\'évaluation finale ?', opts: ['lecture, dictée, traduction, mémorisation', 'vocabulaire, emails, présentations, prononciation', 'écoute, lecture, écriture, grammaire'], correct: 1, exp: 'Le bilan du support couvre les quatre sessions du module.' },
      { q: 'Moyenne 76, seuil 70 : le verdict est…', opts: ['admis', 'entraînement', 'à repasser'], correct: 0, exp: '76 ≥ 70 : admis.' },
      { q: 'La dernière phrase du support rappelle que…', opts: ['le cours est fini', 'la fluidité est une habitude, pas une destination', 'l\'accent parfait existe'], correct: 1, exp: '« Fluency is a habit, not a destination » : l\'entraînement continue.' }
    ],

    pitfalls: [
      'Écrire des phrases télégraphiques : sujet, verbe conjugué, politesse sont obligatoires.',
      'Oublier le -s du verbe au singulier (the server work).',
      'Refuser sans alternative : le « I cannot, but… » préserve la relation.',
      'Calculer la moyenne en oubliant une compétence : les quatre comptent.'
    ],

    methodTitle: 'Méthode — corriger une phrase en trois gestes',
    method: [
      'Ajouter le sujet explicite (I, you, the server…).',
      'Conjuguer le verbe (did you send… ; the server crashed…).',
      'Ajouter la formule polie (Could we please… ; I would appreciate it if…).',
      'Relire l\'accord sujet-verbe avant l\'envoi.'
    ],

    summary: [
      'S-V-P : sujet + verbe conjugué + politesse — la grammaire de la requête professionnelle.',
      'Accord : singulier → verbe en -s ; pluriel → verbe nu.',
      'Refus poli : I cannot + alternative.',
      'Évaluation finale : quatre compétences notées, moyenne comparée au seuil, verdict admis/entraînement.'
    ],

    checklist: [
      'Je sais corriger les cinq phrases « bad business English » du support.',
      'Je sais accorder dix paires sujet-verbe.',
      'Je sais formuler une requête et un refus polis.',
      'Je sais calculer ma moyenne et lire mon verdict.'
    ],

    notions: [
      '<strong>Sujet explicite</strong> : I, you, the server — jamais omis.',
      '<strong>Verbe conjugué</strong> : did you send, the server crashed.',
      '<strong>Could you please…</strong> : requête polie standard.',
      '<strong>I would appreciate it if…</strong> : requête formelle client.',
      '<strong>Accord</strong> : singulier -s, pluriel sans -s.',
      '<strong>Refus poli</strong> : I cannot + alternative.',
      '<strong>Moyenne</strong> : somme des scores / nombre de compétences.',
      '<strong>Verdict</strong> : admis (≥ seuil) ou entraînement.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprenez le tableau bad business English et ses corrections.' },
      { cls: 'mid', text: '50–69 % — refaites les accords sujet-verbe et les requêtes polies.' },
      { cls: 'good', text: '70–94 % — bon niveau, ciblez l\'évaluation complète des quatre compétences.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'S-V-P en grammaire professionnelle ?', a: 'Sujet + verbe conjugué + politesse : « Could we please fix it now ? » au lieu de « Fix now ! ».' },
      { q: 'Corriger « Me want finish work soon » ?', a: '« I want to finish work soon » : sujet I, verbe want + to, sans tics.' },
      { q: 'L\'accord sujet-verbe ?', a: 'Singulier : the server works. Pluriel : the servers work.' },
      { q: 'Refuser poliment ?', a: '« I cannot », puis une alternative : « Can you talk to them ? I cannot. »' },
      { q: 'L\'évaluation finale ?', a: 'Quatre compétences (vocabulaire, emails, présentations, prononciation), moyenne vs seuil : admis ou entraînement — « fluency is a habit ».' }
    ]
  }
];
