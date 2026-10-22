/**
 * Chapitres 1 à 3 du cours d'Anglais des affaires B1.
 *
 * Chapitre 1 : business vocabulary basics (deadline, stakeholder, budget, client/customer, faux amis).
 * Chapitre 2 : professional email writing (5 parties, méthode CLEAR, ton formel/semi-formel).
 * Chapitre 3 : oral presentations (structure en trois parties, Grandma Rule, transitions).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code (trois
 * exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-anglais.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Business vocabulary basics',
    short: 'Vocabulaire',
    toc: 'Le vocabulaire essentiel des affaires (deadline, stakeholder, budget) ; client contre customer ; les faux amis français-anglais.',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'Leo ouvre un email de sa cheffe : « touch base with Zoe, get the ball rolling, the low-hanging fruit ' +
      'list ». C\'est de l\'anglais, mais pas celui des manuels : c\'est l\'anglais des affaires. Ce ' +
      'chapitre pose les 15 mots qui reviennent dans chaque réunion, chaque email, chaque presentation — ' +
      'et démonte les faux amis qui font rire (ou trembler).',

    objectives: [
      'utiliser 15 mots de base du business English dans leurs contextes ;',
      'distinguer registre professionnel et registre familier (gonna, wanna) ;',
      'distinguer client (relation longue) et customer (achat ponctuel) ;',
      'repérer et corriger les faux amis : actually, eventually, library.'
    ],

    sections: [
      {
        title: 'Le vocabulaire général des affaires',
        html: [
          '<p>Les cinq premiers mots s\'entendent dans toute entreprise : <strong>deadline</strong> (final ' +
          'date to finish work), <strong>stakeholder</strong> (person interested in the project), ' +
          '<strong>budget</strong> (available/planned money), <strong>client</strong> (long-term ' +
          'relationship) et <strong>customer</strong> (one-time purchase). La distinction client/customer ' +
          'compte : le client revient, le customer achète une fois.</p>',
          '<p>Côté IT, cinq termes décrivent le travail quotidien : <strong>deployment</strong> (releasing ' +
          'software so people can use it), <strong>backend</strong> (the invisible part: servers, ' +
          'databases), <strong>frontend</strong> (what users see and click), <strong>sprint</strong> (a ' +
          'short work period of 1–4 weeks in Agile) et <strong>UAT</strong> (User Acceptance Testing — ' +
          'final testing where real users try the software).</p>',
          '<p>Les expressions complètent le kit : <strong>touch base</strong> (contact briefly), ' +
          '<strong>get the ball rolling</strong> (start), <strong>low-hanging fruit</strong> (easy wins). ' +
          'Remplacez les phrases simples : « Let\'s start » devient « Let\'s get the ball rolling » ; ' +
          '« I\'ll contact you » devient « I\'ll touch base ».</p>',
          box('mnemo', 'Mnémotechnique — « qui revient est un client »', 'pin',
            '    <p><strong>Client</strong> = relation longue (long-term relationship) ; <strong>customer</strong> = ' +
            'achat ponctuel. Et le <strong>deadline</strong> n\'est pas un happy word : il est stressful, ' +
            'd\'où son pouvoir mobilisateur.</p>')
        ].join('\n')
      },
      {
        title: 'Registres et faux amis',
        html: [
          '<p>Le test « <strong>business or not</strong> » du support : « gonna », « wanna », « hey, what\'s ' +
          'up ? » sont <strong>casual</strong> ; « invoice », « quarterly report », « Dear Sir, I hope this ' +
          'email finds you well » sont <strong>business</strong>. En contexte professionnel, la règle : si ' +
          'le destinataire peut juger le courriel, écrivez business.</p>',
          '<p>Les <strong>faux amis</strong> (French to English) du support : <strong>actually</strong> ne ' +
          'veut pas dire « actuellement » mais « en fait » ; <strong>eventually</strong> ne veut pas dire ' +
          '« éventuellement » mais « finalement » ; <strong>library</strong> n\'est pas la « librairie » ' +
          'mais la « bibliothèque ». Dire « I work in a library » suggère que vous vendez des livres !</p>',
          '<p>Le vocabulaire des emails prépare le chapitre suivant : <strong>attached</strong> (pièce ' +
          'jointe), <strong>forward</strong> (transférer), <strong>reply all</strong> (répondre à tous) — ' +
          'avec l\'avertissement du support : les catastrophes du reply all sont réelles.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>« Actually » ≠ actuellement : il signifie « en fait » (correction d\'une idée reçue).</li>\n' +
            '      <li>Client ≠ customer : la relation longue fait le client, pas le montant.</li>\n' +
            '      <li>« Gonna » n\'existe pas dans un email professionnel : c\'est « going to ».</li>\n' +
            '      <li>UAT n\'est pas un simple test interne : ce sont les <strong>vrais utilisateurs</strong> qui valident.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'A deadline is…', opts: ['the final date to finish work', 'a type of report', 'a meeting'], correct: 0, exp: 'Deadline = final date to finish work — et ce n\'est pas un happy word.' },
      { q: 'A stakeholder is…', opts: ['a person interested in the project', 'a software release', 'a payment'], correct: 0, exp: 'Toute personne intéressée par le projet : client, chef, équipe.' },
      { q: 'Budget means…', opts: ['available or planned money', 'a long-term client', 'a work period'], correct: 0, exp: 'L\'argent disponible ou prévu pour le projet.' },
      { q: 'A client, unlike a customer, has…', opts: ['a one-time purchase', 'a long-term relationship', 'no contract'], correct: 1, exp: 'Client = long-term relationship ; customer = achat ponctuel.' },
      { q: 'A sprint is…', opts: ['a short work period (1–4 weeks) in Agile', 'a server failure', 'a formal email'], correct: 0, exp: 'Période courte de travail Agile pour finir des tâches précises.' },
      { q: 'UAT means…', opts: ['User Acceptance Testing', 'Unified Access Tool', 'Universal Applied Tech'], correct: 0, exp: 'Final testing where real users try the software.' },
      { q: '« Actually » signifie…', opts: ['actuellement', 'en fait', 'éventuellement'], correct: 1, exp: 'Actually = en fait ; actuellement = currently.' },
      { q: '« Low-hanging fruit » means…', opts: ['easy wins', 'hard problems', 'a fruit delivery'], correct: 0, exp: 'Les gains faciles à récolter en premier.' }
    ],

    pitfalls: [
      'Traduire « actuellement » par actually : le faux ami classique, il signifie « en fait ».',
      'Écrire gonna ou wanna dans un email professionnel : registre casual interdit.',
      'Confondre client et customer : le premier revient, le second achète une fois.',
      'Confondre library (bibliothèque) et bookshop (librairie).'
    ],

    methodTitle: 'Méthode — enrichir une phrase en trois gestes',
    method: [
      'Remplacer les mots simples par les expressions cibles : start → get the ball rolling ; contact you → touch base.',
      'Vérifier le registre : business (invoice, quarterly, Dear Sir) ou casual (gonna, hey) ?',
      'Traquer les faux amis : actually, eventually, library — traduire le sens réel.'
    ],

    summary: [
      'Quinze mots portent le business English : deadline, stakeholder, budget, client, customer, deployment, backend, frontend, sprint, UAT.',
      'Expressions : touch base (contact briefly), get the ball rolling (start), low-hanging fruit (easy wins).',
      'Registres : gonna/wanna/hey = casual ; invoice/quarterly report = business.',
      'Faux amis : actually = en fait ; eventually = finalement ; library = bibliothèque.'
    ],

    checklist: [
      'Je sais définir les dix termes du support sans notes.',
      'Je sais trier huit mots entre business et casual.',
      'Je sais choisir entre client et customer sur un cas concret.',
      'Je sais corriger trois phrases à faux amis.'
    ],

    notions: [
      '<strong>Deadline</strong> : the final date to finish work.',
      '<strong>Stakeholder</strong> : person interested in the project.',
      '<strong>Budget</strong> : available/planned money.',
      '<strong>Client vs customer</strong> : relation longue vs achat ponctuel.',
      '<strong>Deployment</strong> : releasing software so people can use it.',
      '<strong>Sprint</strong> : short Agile work period (1–4 weeks).',
      '<strong>UAT</strong> : User Acceptance Testing par de vrais utilisateurs.',
      '<strong>False friends</strong> : actually, eventually, library.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends les définitions et les exemples de phrases du support.' },
      { cls: 'mid', text: '50–69 % — refais le quiz « business or not » et les faux amis.' },
      { cls: 'good', text: '70–94 % — bon niveau, cible les expressions (touch base, ball rolling).' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Qu’est-ce que « Stakeholder » ?', a: 'Stakeholder : person interested in the project.' },
      { q: 'Qu’est-ce que « Deployment » ?', a: 'Deployment : releasing software so people can use it.' },
      { q: 'Qu’est-ce que « Sprint » ?', a: 'Sprint : short Agile work period (1–4 weeks).' },
      { q: 'Qu’est-ce que « False friends » ?', a: 'False friends : actually, eventually, library.' },
      { q: 'Qu’est-ce que « Reply all » ?', a: 'Reply all : réponse à tous, à manier avec précaution.' },
      { q: 'Qu’est-ce que « Disaster email » ?', a: 'Disaster email : objet vide, ton casual, réponse massive.' },
      { q: 'Qu’est-ce que « Q&A » ?', a: "Q&A : That's a good question / Let me clarify." },
      { q: 'Qu’est-ce que « Thought groups » ?', a: 'Thought groups : pauses aux frontières naturelles.' },
      { q: 'Qu’est-ce que « Register » ?', a: 'Register : casual vs formal selon le destinataire.' },
      { q: 'Qu’est-ce que « Rising intonation » ?', a: 'Rising intonation : questions oui/non.' },
      { q: 'Qu’est-ce que « Falling intonation » ?', a: 'Falling intonation : déclarations et WH-questions.' },
      { q: 'Qu’est-ce que « Sujet explicite » ?', a: 'Sujet explicite : I, you, the server — jamais omis.' },
      { q: 'Qu’est-ce que « Could you please… » ?', a: 'Could you please… : requête polie standard.' },
      { q: 'Qu’est-ce que « I would appreciate it if… » ?', a: 'I would appreciate it if… : requête formelle client.' },
      { q: 'Qu’est-ce que « Verdict » ?', a: 'Verdict : admis (≥ seuil) ou entraînement.' },
      { q: 'Deadline, definition ?', a: 'The final date to finish work — stressful, not a happy word.' },
      { q: 'Client vs customer ?', a: 'Client = long-term relationship ; customer = one-time purchase.' },
      { q: 'Touch base ?', a: 'To contact briefly : « I\'ll touch base tomorrow » remplace « I\'ll contact you ».' },
      { q: 'Get the ball rolling ?', a: 'To start : « Let\'s get the ball rolling » remplace « Let\'s start ».' },
      { q: 'Les trois faux amis du support ?', a: 'Actually = en fait (pas actuellement) ; eventually = finalement (pas éventuellement) ; library = bibliothèque (pas librairie).' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Professional email writing',
    short: 'Emails',
    toc: 'Les cinq parties d\'un email professionnel ; la méthode CLEAR ; ton formel et semi-formel ; les catastrophes classiques.',
    time: '≈ 2 h de travail',

    situation:
      'Zoe écrit « hey guys, the server thing is late lol. thx. » — et toute l\'équipe reçoit son « reply ' +
      'all » courroucé. Clients et managers jugent par les emails : un mauvais email, c\'est de la ' +
      'confusion, des retards, un chef en colère. Le chapitre structure l\'email professionnel de la ligne ' +
      'd\'objet à la signature.',

    objectives: [
      'identifier les cinq composantes d\'un email professionnel ;',
      'écrire une ligne d\'objet informative (subject line make or break) ;',
      'appliquer la méthode CLEAR au corps du message ;',
      'adapter le ton au destinataire et éviter les erreurs classiques.'
    ],

    sections: [
      {
        title: 'Les cinq parties et la ligne d\'objet',
        html: [
          '<p>Un email professionnel se compose de cinq parties : <strong>subject line</strong>, ' +
          '<strong>salutation</strong> (greeting), <strong>body</strong>, <strong>closing</strong>, ' +
          '<strong>signature</strong>. La subject line est make or break : « Hello », « Problem » ou un ' +
          'objet vide ruinent le message. Le format gagnant : <code>Q3 Budget Update – Action Needed by ' +
          'Friday</code> — sujet + action + échéance.</p>',
          '<p>La salutation dépend du destinataire : <strong>formel</strong> (nouveau client, direction) → ' +
          '<code>Dear Mr. Smith,</code> ; <strong>semi-formel</strong> (collègue, client régulier) → ' +
          '<code>Hello Sarah,</code> / <code>Hi John,</code> ; jamais <code>Hey dude,</code> ni ' +
          '<code>Yo,</code>. Le closing suit la même logique : <code>Best regards,</code> (standard), ' +
          '<code>Kind regards,</code> (amical), <code>Sincerely,</code> (formel), jamais « Cheers, » ni ' +
          '« XOXO ».</p>',
          '<p>La <strong>signature</strong> est la carte de visite numérique : nom, job title, company, ' +
          'téléphone en option — jamais de citations, d\'emojis ni d\'images géantes.</p>',
          box('mnemo', 'Mnémotechnique — « S-S-B-C-S : de l\'objet à la signature »', 'pin',
            '    <p>Subject, Salutation, Body, Closing, Signature : cinq cases, dans cet ordre. Un email qui ' +
            'saute une case se lit comme un formulaire incomplet.</p>')
        ].join('\n')
      },
      {
        title: 'La méthode CLEAR et les catastrophes',
        html: [
          '<p>Le corps du message suit la méthode <strong>CLEAR</strong> : <strong>C</strong>ontext (why are ' +
          'you writing ?), <strong>L</strong>ogistics (what, when, where ?), <strong>E</strong>xpectation ' +
          '(what do you need ?), <strong>A</strong>ction (what should they do ?), <strong>R</strong>espect ' +
          '(thank you). L\'email modèle du support — budget approval for a server upgrade — coche les cinq ' +
          'lettres dans l\'ordre.</p>',
          '<p>Le ton s\'adapte : au patron « Could you please review the attached report ? » ; au collègue ' +
          '« Can you check the attachment ? » ; au client « I would appreciate it if you could… ». Les ' +
          'réductions (gonna, gotta) restent dehors.</p>',
          '<p>Les trois <strong>disaster emails</strong> du support : l\'objet vide (« Hey, there\'s a ' +
          'problem. Call me. » → réécriture : « Server Issue – Please Call When Available ») ; le reply all ' +
          'à 200 personnes (« Reply all is a weapon. Use carefully. ») ; l\'email trop casual (« Yo team, ' +
          'gonna need that thing by tomorrow. k thx. » → « Dear team, the deadline for the report is ' +
          'tomorrow. Thank you for your efforts. »).</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Objet vide ou « Hello » : le destinataire ne sait ni quoi, ni quand, ni pourquoi.</li>\n' +
            '      <li>Reply all en colère : le destinataire humilie 200 collègues d\'un coup — arme, pas outil.</li>\n' +
            '      <li>Confondre Expectation (ce que j\'attends) et Action (ce que le lecteur doit faire) : l\'un énonce, l\'autre ordonne poliment.</li>\n' +
            '      <li>Emojis et citations dans la signature : jamais dans un cadre professionnel.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'La première partie d\'un email professionnel est…', opts: ['la salutation', 'la subject line', 'la signature'], correct: 1, exp: 'Subject line, salutation, body, closing, signature — dans cet ordre.' },
      { q: 'Un bon subject line contient…', opts: ['juste « Hello »', 'sujet + action + échéance', 'rien du tout'], correct: 1, exp: '« Q3 Budget Update – Action Needed by Friday » : le format modèle.' },
      { q: 'À un nouveau client, on écrit…', opts: ['Yo,', 'Dear Mr. Smith,', 'Hey dude,'], correct: 1, exp: 'Formel pour un nouveau client ou la direction.' },
      { q: 'Dans CLEAR, la lettre L signifie…', opts: ['Language', 'Logistics (what, when, where)', 'Lead'], correct: 1, exp: 'Context, Logistics, Expectation, Action, Respect.' },
      { q: 'L\'Expectation énonce…', opts: ['ce que le lecteur doit faire', 'ce qui est attendu (approval by Friday)', 'un remerciement'], correct: 1, exp: 'Expectation = what do you need ; Action = what they should do.' },
      { q: 'Le closing standard est…', opts: ['XOXO', 'Best regards,', 'Later,'], correct: 1, exp: 'Best regards (standard), Kind regards (amical), Sincerely (formel).' },
      { q: 'La signature professionnelle contient…', opts: ['des emojis et une citation', 'nom, job title, company', 'une image géante'], correct: 1, exp: 'La carte de visite numérique : sobre et lisible.' },
      { q: '« Reply all is a weapon » signifie…', opts: ['il faut répondre à tous toujours', 'l\'utiliser avec précaution', 'il est interdit'], correct: 1, exp: 'Le support le montre : répondre à tous à 200 personnes humilie et encombre.' }
    ],

    pitfalls: [
      'Envoyer un email sans subject line : il est ignoré, ou pire, lu comme du spam.',
      'Répondre à tous en colère : la « reply all disaster » du support est un cas réel.',
      'Mettre des réductions (gonna, k thx) dans un email formel.',
      'Oublier la partie Action : le lecteur ne sait pas quoi faire.'
    ],

    methodTitle: 'Méthode — rédiger un email en cinq gestes',
    method: [
      'Objet informatif : sujet + action + échéance.',
      'Salutation adaptée : Dear (formel), Hello/Hi (semi-formel), jamais Yo.',
      'Corps CLEAR : Context, Logistics, Expectation, Action, Respect.',
      'Closing et signature sobres : Best regards, puis nom et titre.'
    ],

    summary: [
      'Cinq parties : subject line, salutation, body, closing, signature.',
      'Subject line make or break : sujet + action + échéance.',
      'Méthode CLEAR : Context, Logistics, Expectation, Action, Respect.',
      'Ton : formal (Dear), semi-formal (Hello), jamais casual en entreprise.'
    ],

    checklist: [
      'Je sais étiqueter les cinq parties d\'un email donné.',
      'Je sais réécrire trois mauvais subject lines.',
      'Je sais placer les cinq lettres CLEAR sur un email modèle.',
      'Je sais corriger un disaster email (objet, ton, signature).'
    ],

    notions: [
      '<strong>Subject line</strong> : objet informatif, make or break.',
      '<strong>Salutation</strong> : Dear (formel) / Hello (semi-formel).',
      '<strong>CLEAR</strong> : Context, Logistics, Expectation, Action, Respect.',
      '<strong>Closing</strong> : Best regards, Kind regards, Sincerely.',
      '<strong>Signature</strong> : nom, titre, société — sobre.',
      '<strong>Formal vs semi-formal</strong> : selon le destinataire.',
      '<strong>Reply all</strong> : réponse à tous, à manier avec précaution.',
      '<strong>Disaster email</strong> : objet vide, ton casual, réponse massive.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends les cinq parties et la méthode CLEAR.' },
      { cls: 'mid', text: '50–69 % — réécris les trois disaster emails du support.' },
      { cls: 'good', text: '70–94 % — bon niveau, cible le choix du ton par destinataire.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les cinq parties d\'un email ?', a: 'Subject line, salutation, body, closing, signature.' },
      { q: 'La méthode CLEAR ?', a: 'Context (why), Logistics (what/when/where), Expectation (what I need), Action (what they do), Respect (thanks).' },
      { q: 'Formel, semi-formal : quelles salutations ?', a: 'Formel : Dear Mr. Smith, — semi-formel : Hello Sarah, / Hi John, — jamais Hey dude, / Yo,' },
      { q: 'Un bon subject line ?', a: 'Sujet + action + échéance : « Q3 Budget Update – Action Needed by Friday ».' },
      { q: 'Que ne met-on jamais dans une signature ?', a: 'Citations, emojis, images géantes — seulement nom, titre, société (et téléphone en option).' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Oral presentations in a business context',
    short: 'Présentations',
    toc: 'La structure en trois parties ; hook et roadmap ; expliquer la technique aux non-techniciens ; transitions et questions.',
    time: '≈ 2 h de travail',

    situation:
      'Leo doit présenter la mise à jour du serveur à M. Tanaka en cinq minutes. Il commence par « So, ' +
      'like, basically, the thing is, um… » — et perd son auditoire. Le chapitre donne la structure ' +
      '« tell them, tell them, tell them », les transitions, et la règle d\'or : si votre grand-mère ne ' +
      'comprend pas, simplifiez.',

    objectives: [
      'structurer une présentation de 2 à 3 minutes : opening, body, closing ;',
      'commencer par un hook et annoncer une roadmap ;',
      'expliquer un problème technique à un public non technique (Grandma Rule) ;',
      'utiliser les phrases de transition et répondre poliment aux questions.'
    ],

    sections: [
      {
        title: 'La structure en trois parties',
        html: [
          '<p>La règle du support : « <strong>Tell them, tell them, tell them</strong> ». ' +
          '<strong>Opening</strong> (30 s) : dire ce qu\'on va dire — un <strong>hook</strong> (question, ' +
          'fait, histoire courte : « Have you ever lost an hour of work because of a crash ? ») suivi d\'une ' +
          '<strong>roadmap</strong> (« Today I\'ll explain the problem, the solution, and the result »). ' +
          '<strong>Body</strong> (1,5 à 2 min) : le dire. <strong>Closing</strong> (30 s) : dire ce qu\'on a ' +
          'dit — résumé + call to action (« To sum up, we had a crash, we fixed it, and now everything ' +
          'works. Please restart your computers tonight. »).</p>',
          '<p>Jamais finir sur « That\'s it », « I\'m done », « Yeah… » : le closing est un résumé + un ' +
          'appel à l\'action précis.</p>',
          '<p>Les <strong>transitions</strong> structurent le body : démarrer « First… », « To begin ' +
          'with… » ; avancer « Next… », « Now let\'s look at… » ; conclure « Finally… », « In ' +
          'conclusion… », « To summarize… ». Elles guident l\'auditeur et masquent l\'hésitation — ' +
          'exit les « um » et « like ».</p>',
          box('mnemo', 'Mnémotechnique — « 30 s / 2 min / 30 s »', 'pin',
            '    <p>Opening 30 secondes (hook + roadmap), body 1,5 à 2 minutes (transitions), closing 30 ' +
            'secondes (summarize + call to action). Trois tempos, un seul message.</p>')
        ].join('\n')
      },
      {
        title: 'La Grandma Rule et les questions',
        html: [
          '<p>Expliquer la technique aux non-techniciens : <strong>the Grandma Rule</strong> — « if your ' +
          'grandma can\'t understand it, simplify it ». Le support démonte « The API endpoint returned a 500 ' +
          'error due to a null pointer exception » en « The server stopped talking to our app », puis de ' +
          'plus en plus simple, jusqu\'au niveau grand-mère : « The computer system got confused and ' +
          'couldn\'t finish the job ».</p>',
          '<p>Le traducteur du support : <strong>deployment</strong> → software release ; <strong>failed</strong> ' +
          '→ did not work ; <strong>CI/CD pipeline</strong> → automatic delivery system ; <strong>configuration ' +
          'mismatch</strong> → settings problem. Les clients ne se soucient pas du code : ils se soucient ' +
          'des solutions.</p>',
          '<p>Les <strong>questions</strong> se traitent avec politesse et assurance : « That\'s a good ' +
          'question », « Let me clarify », puis une réponse courte. Le contact visuel et le langage du corps ' +
          'complètent : ne pas lire ses notes, regarder la salle.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Ouvrir sans hook : l\'auditeur décroche avant la première transition.</li>\n' +
            '      <li>Terminer sur « I\'m done » : le closing demande résumé + call to action.</li>\n' +
            '      <li>Garder le jargon devant un client : CI/CD, null pointer — traduire en mots simples.</li>\n' +
            '      <li>Répondre « je ne sais pas » sec : « Let me check and get back to you » est la forme polie.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'La règle de la présentation est…', opts: ['tell them, tell them, tell them', 'improvise, improvise', 'lire ses notes'], correct: 0, exp: 'Opening (dire ce qu\'on va dire), body (le dire), closing (dire ce qu\'on a dit).' },
      { q: 'Un hook est…', opts: ['une question ou un fait qui accroche', 'un résumé final', 'une diapositive'], correct: 0, exp: 'Question, fait ou histoire courte pour ouvrir.' },
      { q: 'La roadmap annonce…', opts: ['le plan : X, puis Y, enfin Z', 'les pauses', 'les remerciements'], correct: 0, exp: '« Today I will talk about X, then Y, and finally Z. »' },
      { q: 'Le closing idéal contient…', opts: ['That\'s it', 'un résumé + un call to action', 'des excuses'], correct: 1, exp: 'Summarize + action précise : « Please restart your computers tonight. »' },
      { q: 'La Grandma Rule dit…', opts: ['d\'éviter les grands-mères', 'de simplifier ce qu\'elle ne comprendrait pas', 'de parler fort'], correct: 1, exp: 'If your grandma can\'t understand it, simplify it.' },
      { q: '« CI/CD pipeline » se traduit pour un client par…', opts: ['automatic delivery system', 'null pointer', 'API endpoint'], correct: 0, exp: 'Le traducteur du support : jargon → mots simples.' },
      { q: '« Finally » et « To summarize » servent à…', opts: ['ouvrir', 'avancer', 'conclure'], correct: 2, exp: 'Transitions de conclusion ; First/To begin with ouvrent, Next avance.' },
      { q: 'Face à une question difficile, on répond…', opts: ['That\'s a good question… Let me clarify', 'I don\'t know, next', 'silence'], correct: 0, exp: 'Formules polies du support pour gagner le temps de répondre.' }
    ],

    pitfalls: [
      'Commencer par « So, like, basically, um » : le hook remplace les tics.',
      'Finir sur « That\'s it » : résumé + call to action obligatoires.',
      'Débit continu sans transitions : l\'auditeur perd le fil.',
      'Jargon devant un non-technicien : traduire ou perdre la salle.'
    ],

    methodTitle: 'Méthode — bâtir une présentation en quatre gestes',
    method: [
      'Écrire le hook : une question, un fait ou une histoire courte.',
      'Annoncer la roadmap : X, puis Y, enfin Z.',
      'Parser le body avec les transitions : First, Next, Finally.',
      'Fermer : To sum up + call to action précis.'
    ],

    summary: [
      'Structure : opening (30 s), body (1,5-2 min), closing (30 s) — tell them, tell them, tell them.',
      'Hook + roadmap à l\'ouverture ; summarize + call to action au closing.',
      'Grandma Rule : traduire le jargon (deployment → software release).',
      'Transitions : First, Next, Finally ; questions traitées avec politesse.'
    ],

    checklist: [
      'Je sais chronométrer les trois parties d\'une présentation de 2 minutes.',
      'Je sais écrire un hook et une roadmap sur un sujet IT.',
      'Je sais traduire quatre termes techniques en mots simples.',
      'Je sais répondre à trois questions avec les formules polies.'
    ],

    notions: [
      '<strong>Opening</strong> : hook + roadmap, 30 secondes.',
      '<strong>Hook</strong> : question, fait ou histoire qui accroche.',
      '<strong>Roadmap</strong> : annonce du plan (X, Y, Z).',
      '<strong>Closing</strong> : summarize + call to action.',
      '<strong>Grandma Rule</strong> : simplifier pour le non-technicien.',
      '<strong>Transitions</strong> : First, Next, Finally, To summarize.',
      '<strong>Call to action</strong> : ce que l\'auditeur doit faire ensuite.',
      '<strong>Q&amp;A</strong> : That\'s a good question / Let me clarify.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends la structure en trois parties.' },
      { cls: 'mid', text: '50–69 % — réécris trois phrases techniques en langage simple.' },
      { cls: 'good', text: '70–94 % — bon niveau, cible les transitions et le Q&amp;A.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'La règle 30 s / 2 min / 30 s ?', a: 'Opening (hook + roadmap), body (transitions), closing (summarize + call to action).' },
      { q: 'Tell them, tell them, tell them ?', a: 'Dire ce qu\'on va dire, le dire, dire ce qu\'on a dit : la structure de toute présentation.' },
      { q: 'La Grandma Rule ?', a: 'If your grandma can\'t understand it, simplify it : « CI/CD pipeline » devient « automatic delivery system ».' },
      { q: 'Trois transitions de conclusion ?', a: 'Finally, In conclusion, To summarize.' },
      { q: 'Répondre à une question difficile ?', a: '« That\'s a good question », « Let me clarify » ou « Let me check and get back to you ».' }
    ]
  }
];
