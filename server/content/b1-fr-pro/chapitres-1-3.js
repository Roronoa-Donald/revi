/**
 * Chapitres 1 à 3 du cours de Français professionnel B1.
 *
 * Chapitre 1 : la communication (verbal, para-verbal, non-verbal, Mehrabian, Aristote, champs, fonctions, explicite/implicite).
 * Chapitre 2 : les registres de langue (familier, courant, soutenu, verbes passe-partout).
 * Chapitre 3 : les fautes au bureau (date, etc., ci-joint, veuillez, article de profession, abréviations).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code (trois
 * exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-fr-pro.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'La communication',
    short: 'Communication',
    toc: 'Les canaux de la communication ; la théorie de Mehrabian (verbal, para-verbal, non-verbal) ; Aristote (logos, pathos, éthos) ; champs et fonctions du langage ; explicite et implicite.',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'En réunion, deux collègues disent la même phrase et produisent deux effets opposés. L\'un articule, ' +
      'regarde son auditoire, pose ses chiffres ; l\'autre marmonne en fixant ses notes. Le support pose ' +
      'd\'abord le cadre : communiquer, c\'est transmettre, informer, agir sur autrui — avec bien plus que ' +
      'des mots.',

    objectives: [
      'définir la communication et ses trois visées : expression, représentation, action sur autrui ;',
      'classer les signaux selon Mehrabian : verbal, para-verbal, non-verbal ;',
      'reconnaître les ressorts d\'Aristote : logos, pathos, éthos ;',
      'distinguer l\'explicite (ce qui est dit) de l\'implicite (ce qui est voulu).'
    ],

    sections: [
      {
        title: 'Qu\'est-ce que communiquer ?',
        html: [
          '<p>La communication est « l\'action de communiquer, de transmettre, d\'informer ». Le support en ' +
          'donne trois visées : <strong>l\'expression</strong> (celui qui parle transmet une intention, une ' +
          'émotion), <strong>la représentation</strong> (donner des informations, retransmettre un savoir) et ' +
          '<strong>l\'action sur autrui</strong> (convaincre, séduire, influencer, ordonner, interdire).</p>',
          '<p>L\'homme use de moyens variés : <strong>le langage</strong> (l\'oral, l\'écrit), <strong>la ' +
          'gestuelle</strong> (gestes, jeux de physionomie) et <strong>les signaux</strong> (panneaux de ' +
          'signalisation, feux tricolores). Un cours n\'est pas qu\'un discours : c\'est un dispositif complet ' +
          'de signes.</p>',
          '<p>Le support classe ensuite les <strong>champs</strong> : la communication intrapersonnelle (se ' +
          'parler à soi-même, penser, raisonner), interpersonnelle (dialogue à deux : vie sociale et ' +
          'professionnelle, entrevue), en petit groupe (résoudre des problèmes, créer, partager) et publique ' +
          '(un orateur face à un auditoire : informer, persuader, amuser).</p>',
          box('mnemo', 'Mnémotechnique — « intra, inter, groupe, public : la phrase grandit »', 'pin',
            '    <p>De soi (intra) à deux (inter), à quelques-uns (groupe), à tous (public) : chaque champ a ' +
            'ses règles, ses risques, ses formats — du for intérieur au discours face à la salle.</p>')
        ].join('\n')
      },
      {
        title: 'Mehrabian, Aristote et les fonctions du langage',
        html: [
          '<p>La théorie d\'<strong>Albert Mehrabian</strong> distingue trois canaux : <strong>le ' +
          'verbal</strong> — les mots prononcés, le répertoire lexical, les figures de style ; <strong>le ' +
          'para-verbal</strong> — la voix : rythme, intonation, articulation, vitesse, volume ; ' +
          '<strong>le non-verbal</strong> — gestion de l\'espace, tenue vestimentaire, mimo-gestuelle, ' +
          'expressions faciales. Quand le verbe et le corps se contredisent, l\'auditoire croit le corps.</p>',
          '<p>La théorie d\'<strong>Aristote</strong> décompose la persuasion en trois ressorts : ' +
          '<strong>le logos</strong> (la raison : arguments, chiffres, démonstration), <strong>le ' +
          'pathos</strong> (les émotions de l\'auditoire) et <strong>l\'éthos</strong> (la crédibilité de ' +
          'l\'orateur). Un discours équilibré fait parler les trois.</p>',
          '<p>Les <strong>six fonctions du langage</strong> complètent la boîte à outils : référentielle ' +
          '(informer, expliquer), expressive (partager ses émotions), conative (faire agir, convaincre), ' +
          'poétique (plaire, le bien dire), phatique (établir et maintenir le contact), métalinguistique ' +
          '(parler de la langue avec la langue).</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Le para-verbal n\'est pas le non-verbal : la voix (intonation, volume) para-verbe ; la posture, le regard non-verbe.</li>\n' +
            '      <li>Logos n\'est pas éthos : la démonstration raisonne ; la crédibilité se gagne avant de parler.</li>\n' +
            '      <li>La fonction phatique ne transmet rien : elle maintient le canal (« allô ? », « m’entend-on bien ? »).</li>\n' +
            '      <li>L\'implicite n\'est pas un sous-texte secret : « Il fait chaud ici » demande d\'ouvrir la fenêtre.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Explicite et implicite',
        html: [
          '<p>La communication interpersonnelle a « deux côtés » : <strong>l\'explicite</strong>, ce que la ' +
          'personne dit, et <strong>l\'implicite</strong>, ce qu\'elle veut dire. Le support en donne deux ' +
          'exemples canoniques : « <em>Il fait chaud dans votre chambre</em> » cache « vous voulez bien allumer la ' +
          'clim ? » ; « <em>Il est déjà 18 heures passé</em> » cache « je voudrais bien rentrer ».</p>',
          '<p>Décoder l\'implicite est une compétence professionnelle : un client qui « signale un petit ' +
          'problème » annonce souvent une réclamation ; un manager qui « serait curieux de voir le dossier » ' +
          'en demande la lecture. Entendre le dit, répondre au voulu.</p>'
        ].join('\n')
      }
    ],

    questions: [
      { q: 'La communication se définit comme…', opts: ['l\'action de transmettre, d\'informer', 'la seule parole orale', 'un échange d\'emails'], correct: 0, exp: 'Transmettre, informer — et agir sur autrui.' },
      { q: 'Selon Mehrabian, l\'intonation appartient…', opts: ['au verbal', 'au para-verbal', 'au non-verbal'], correct: 1, exp: 'La voix (rythme, intonation, volume) est para-verbale.' },
      { q: 'La tenue vestimentaire relève…', opts: ['du para-verbal', 'du non-verbal', 'du référentiel'], correct: 1, exp: 'Gestion de l\'espace, tenue, mimo-gestuelle : non-verbal.' },
      { q: 'Le logos d\'Aristote est…', opts: ['l\'émotion', 'la crédibilité', 'la raison et l\'argumentation'], correct: 2, exp: 'Pathos = émotion ; éthos = crédibilité ; logos = raison.' },
      { q: '« Allô ? M\'entend-on ? » illustre la fonction…', opts: ['phatique', 'poétique', 'métalinguistique'], correct: 0, exp: 'Phatique : établir et maintenir le contact.' },
      { q: 'La communication intrapersonnelle est…', opts: ['un dialogue à deux', 'se parler à soi-même', 'un discours public'], correct: 1, exp: 'Penser, raisonner, se juger : le dialogue intérieur.' },
      { q: '« Il fait chaud dans votre chambre » est…', opts: ['explicite : une information météo', 'implicite : une demande d\'allumer la clim', 'une fonction poétique'], correct: 1, exp: 'Le dit masque le voulu : c\'est l\'implicite.' },
      { q: 'La fonction conative vise à…', opts: ['faire agir, convaincre', 'parler de la langue', 'se plaindre'], correct: 0, exp: 'Conative : inciter l\'auditeur à agir.' }
    ],

    pitfalls: [
      'Réduire la communication aux mots : le para-verbal et le non-verbal portent une large part du message.',
      'Confondre para-verbal (la voix) et non-verbal (le corps, l\'espace, la tenue).',
      'Empiler les chiffres sans éthos ni pathos : un discours « logos seul » ne convainc personne.',
      'Prendre l\'implicite au pied de la lettre : « il est tard » n\'est pas une observation météorologique.'
    ],

    methodTitle: 'Méthode — décoder une prise de parole en trois gestes',
    method: [
      'Classer les signaux : mots (verbal), voix (para-verbal), corps et espace (non-verbal).',
      'Repérer les ressorts : logos (arguments), pathos (émotion), éthos (crédibilité).',
      'Séparer le dit du voulu : reformuler l\'implicite avant de répondre.'
    ],

    summary: [
      'Communiquer : transmettre, informer, agir sur autrui — par le langage, la gestuelle, les signaux.',
      'Mehrabian : verbal (mots), para-verbal (voix), non-verbal (corps, espace, tenue).',
      'Aristote : logos (raison), pathos (émotion), éthos (crédibilité).',
      'Six fonctions du langage, et deux côtés à tout échange : l\'explicite et l\'implicite.'
    ],

    checklist: [
      'Je sais nommer les trois visées de la communication et les quatre champs.',
      'Je sais classer dix signaux entre verbal, para-verbal et non-verbal.',
      'Je sais reconnaître logos, pathos et éthos dans un extrait de discours.',
      'Je sais reformuler l\'implicite d\'une phrase déguisée.'
    ],

    notions: [
      '<strong>Communication</strong> : action de transmettre, d\'informer, d\'agir sur autrui.',
      '<strong>Verbal</strong> : les mots prononcés, le lexique, les figures de style.',
      '<strong>Para-verbal</strong> : la voix — rythme, intonation, articulation, volume.',
      '<strong>Non-verbal</strong> : espace, tenue, mimo-gestuelle, expressions du visage.',
      '<strong>Logos / pathos / éthos</strong> : raison, émotion, crédibilité (Aristote).',
      '<strong>Fonctions du langage</strong> : référentielle, expressive, conative, poétique, phatique, métalinguistique.',
      '<strong>Champs</strong> : intrapersonnelle, interpersonnelle, petit groupe, publique.',
      '<strong>Explicite / implicite</strong> : ce qui est dit / ce qui est voulu.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends les définitions des trois canaux et des trois ressorts.' },
      { cls: 'mid', text: '50–69 % — refais le classement Mehrabian et les fonctions du langage.' },
      { cls: 'good', text: '70–94 % — bon niveau, entraînez-vous à décoder l\'implicite.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Qu’est-ce que « Fonctions du langage » ?', a: 'Fonctions du langage : référentielle, expressive, conative, poétique, phatique, métalinguistique.' },
      { q: 'Qu’est-ce que « Familier » ?', a: 'Familier : oral quotidien, argot, syntaxe relâchée (cailler, boulot, zyeuter).' },
      { q: 'Qu’est-ce que « Soutenu » ?', a: 'Soutenu : lexique précis, figures, inversions (se sustenter, considérer, labeur).' },
      { q: 'Qu’est-ce que « Ne supprimé » ?', a: 'Ne supprimé : « je sais pas » — marque grammaticale du familier.' },
      { q: 'Qu’est-ce que « Prodiguer » ?', a: 'Prodiguer : remplacer « donner » (des conseils).' },
      { q: 'Qu’est-ce que « Compter » ?', a: 'Compter : remplacer « avoir » (des habitants).' },
      { q: 'Qu’est-ce que « De toute façon » ?', a: "De toute façon : singulier (quoi qu'il en soit)." },
      { q: 'Qu’est-ce que « M. : abréviation française de Monsieur — « Mr » est anglais. » ?', a: 'M. : abréviation française de Monsieur — « Mr » est anglais.' },
      { q: 'Qu’est-ce que « Périssologie » ?', a: 'Périssologie : nom didactique de la répétition inutile.' },
      { q: "Qu’est-ce que « Si d'hypothèse » ?", a: "Si d'hypothèse : pas de conditionnel derrière « si »." },
      { q: 'Qu’est-ce que « Le sens de » ?', a: "Le sens de : l'organisation, le contact, l'écoute." },
      { q: "Qu’est-ce que « L'esprit de » ?", a: "L'esprit de : sans article — synthèse, groupe, entreprise." },
      { q: 'Qu’est-ce que « Passé composé » ?', a: 'Passé composé : auxiliaire au présent + participe passé.' },
      { q: "Qu’est-ce que « Maison d'être » ?", a: "Maison d'être : aller, venir, partir, arriver, entrer, sortir, monter, descendre…" },
      { q: 'Qu’est-ce que « Verbes douteux » ?', a: 'Verbes douteux : avoir avec COD, être sans COD (monter, sortir, descendre…).' },
      { q: 'Qu’est-ce que « Pronominaux » ?', a: 'Pronominaux : toujours être (se coucher, se lever, se souvenir).' },
      { q: 'Qu’est-ce que « Accord avec être » ?', a: "Accord avec être : genre et nombre du sujet, comme l'adjectif." },
      { q: 'Qu’est-ce que « Vous masculin pluriel » ?', a: "Vous masculin pluriel : groupe d'hommes ou mixte — « vous êtes sortis »." },
      { q: 'Les trois canaux de Mehrabian ?', a: 'Verbal (les mots), para-verbal (la voix : intonation, rythme, volume), non-verbal (gestuelle, tenue, espace).' },
      { q: 'Les trois ressorts d\'Aristote ?', a: 'Logos (la raison), pathos (l\'émotion), éthos (la crédibilité de l\'orateur).' },
      { q: 'La fonction phatique ?', a: 'Établir et maintenir le contact : « allô ? », « m’entend-on bien ? » — elle ne transmet pas d\'information.' },
      { q: 'Explicite contre implicite ?', a: 'Explicite : ce que la personne dit ; implicite : ce qu\'elle veut dire. « Il fait chaud ici » demande d\'ouvrir la fenêtre.' },
      { q: 'Les quatre champs de la communication ?', a: 'Intrapersonnelle (soi), interpersonnelle (deux), petit groupe, publique (un orateur, un auditoire).' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Les registres de langue',
    short: 'Registres',
    toc: 'Niveaux familier, courant et soutenu ; les trios de synonymes (cailler, avoir très froid, être mort de froid) ; remplacer les verbes passe-partout.',
    time: '≈ 2 h de travail',

    situation:
      '« Je caille », dit l\'un ; « j\'ai très froid », dit l\'autre ; « j\'étais mort de froid », conclut le ' +
      'troisième. Même idée, trois niveaux. Le support fixe la règle : l\'usage détermine les connotations ' +
      'sociales — soutenu (recherché), courant (standard), familier (relâché) — et le professionnel sait ' +
      'passer de l\'un à l\'autre sans y penser.',

    objectives: [
      'caractériser les trois niveaux : familier, courant, soutenu ;',
      'ranger un mot dans son registre à partir de trios connus (bouffer, manger, se sustenter) ;',
      'repérer les marques du familier : syntaxe relâchée, « ne » supprimé, argot ;',
      'remplacer les verbes passe-partout (donner, faire, avoir) par des verbes précis.'
    ],

    sections: [
      {
        title: 'Trois niveaux, trois usages',
        html: [
          '<p>Le <strong>niveau familier</strong> est celui de l\'oral quotidien : lexique argotique, syntaxe ' +
          'relâchée — ruptures, répétitions, suppression du « ne » (« il s\'marrait »). Le <strong>niveau ' +
          'courant</strong> est l\'usage standard, celui de la presse et du journal télévisé : lexique usuel, ' +
          'syntaxe respectée sans recherche, subjonctif admis, passé simple exclu. Le <strong>niveau ' +
          'soutenu</strong> — parfois noté « littér. » dans les dictionnaires, mais pas propre à la ' +
          'littérature — vise le lexique précis, les figures de style, les inversions : « il riait aux ' +
          'éclats ».</p>',
          '<p>Le support déroule les trios : <strong>cailler / avoir très froid / être mort de froid</strong> ; ' +
          '<strong>bouffer / manger / se sustenter</strong> ; <strong>zyeuter / regarder / considérer</strong> ; ' +
          '<strong>rosser / battre /</strong> (soutenu : maltraiter) ; <strong>roupiller / dormir / ' +
          's\'assoupir</strong> ; <strong>la gadoue / la boue / la vase</strong> ; <strong>une bagnole / une ' +
          'voiture / une automobile</strong> ; <strong>le boulot / le travail / le labeur</strong> ; ' +
          '<strong>un mec / un homme / un monsieur</strong> ; <strong>il a cassé sa pipe / il est mort / il a ' +
          'trépassé</strong>.</p>',
          box('mnemo', 'Mnémotechnique — « le trio monte d\'un cran à chaque ligne »', 'pin',
            '    <p>Familier = imagé et sonore (casser la croûte) ; courant = neutre et partagé (manger) ; ' +
            'soutenu = précis et rare (se restaurer). Si un mot fait rire, il est familier ; s\'il fait ' +
            'hésiter, il est soutenu.</p>')
        ].join('\n')
      },
      {
        title: 'Traquer les mots passe-partout',
        html: [
          '<p>« Pour aller plus loin », le support déclare la guerre aux <strong>expressions ' +
          'passe-partout</strong> : donner, faire, avoir — des verbes valables partout, donc précis nulle ' +
          'part. Remplacer « donner » : <strong>attacher</strong> de l\'importance, <strong>prodiguer</strong> ' +
          'des conseils, <strong>accorder</strong> sa confiance ou un délai, <strong>procurer</strong> un ' +
          'stage, <strong>indiquer</strong> l\'heure, <strong>distribuer</strong> des cartes, ' +
          '<strong>causer</strong> du souci.</p>',
          '<p>Remplacer « faire » : <strong>procéder</strong> à une enquête, <strong>commettre</strong> une ' +
          'erreur, <strong>confectionner</strong> un bijou, <strong>intenter</strong> un procès, ' +
          '<strong>effectuer</strong> un travail, <strong>exécuter</strong> un croquis, ' +
          '<strong>établir</strong> une liste, <strong>feindre</strong> de se fâcher, <strong>exercer</strong> ' +
          'un métier.</p>',
          '<p>Remplacer « avoir » : <strong>détenir</strong> les clés, <strong>souffrir</strong> d\'un ' +
          'handicap, <strong>obtenir</strong> un résultat, <strong>éprouver</strong> un sentiment, ' +
          '<strong>rencontrer</strong> des difficultés, <strong>faire preuve</strong> de courage, ' +
          '<strong>ressentir</strong> de la sympathie, <strong>subir</strong> une opération, ' +
          '<strong>compter</strong> mille habitants.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Le familier n\'est pas interdit : il est « à sa place » — entre amis, jamais en clientèle.</li>\n' +
            '      <li>Le soutenu n\'est pas littéraire : un rapport peut dire « se sustenter » comme « demeurer ».</li>\n' +
            '      <li>Le « ne » supprimé (« je sais pas ») marque le familier autant que le lexique.</li>\n' +
            '      <li>Faire preuve de courage, pas « avoir du courage » : le passe-partout s\'entend immédiatement.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le niveau courant est celui…', opts: ['de l\'argot', 'de la presse et du journal télévisé', 'de la tragédie classique'], correct: 1, exp: 'Usage standard : lexique usuel, syntaxe respectée, passé simple exclu.' },
      { q: '« Il s\'marrait » appartient au registre…', opts: ['familier', 'courant', 'soutenu'], correct: 0, exp: 'Syntaxe relâchée et mot tronqué : familier (il se marrait).' },
      { q: '« Se sustenter » signifie, en courant…', opts: ['se battre', 'se nourrir', 'se coucher'], correct: 1, exp: 'Soutenu pour « manger » — à côté de « bouffer » (familier).' },
      { q: 'Le trio correct pour « regarder » est…', opts: ['zyeuter / regarder / considérer', 'rosser / battre / frapper', 'dégoter / trouver / perdre'], correct: 0, exp: 'Familier, courant, soutenu — dans l\'ordre.' },
      { q: '« La boue » au niveau soutenu devient…', opts: ['la gadoue', 'la vase', 'la bouette'], correct: 1, exp: 'Gadoue (fam.) / boue (cour.) / vase (sout.).' },
      { q: '« Il a cassé sa pipe » signifie, en soutenu…', opts: ['il a trépassé', 'il a démissionné', 'il a déménagé'], correct: 0, exp: 'Casser sa pipe (fam.) / mourir (cour.) / trépasser (sout.).' },
      { q: '« Donner des conseils » se précise en…', opts: ['prodiguer des conseils', 'confectionner des conseils', 'subir des conseils'], correct: 0, exp: 'Prodiguer : le verbe précis du support.' },
      { q: '« La ville a mille habitants » se précise en…', opts: ['la ville détient mille habitants', 'la ville compte mille habitants', 'la ville fait mille habitants'], correct: 1, exp: 'Compter : le verbe exact des statistiques.' }
    ],

    pitfalls: [
      'Écrire « bouffer » dans un rapport : le lexique familier discrédite le propos.',
      'Confondre soutenu et pédant : le soutenu précise, il ne complique pas.',
      'Oublier la syntaxe du familier : le « ne » supprimé fait autant signe que « gonzesse ».',
      'Laisser « faire » et « avoir » faire tout le travail : commettre, effectuer, éprouver, détenir.'
    ],

    methodTitle: 'Méthode — choisir le mot juste en trois gestes',
    method: [
      'Identifier la situation : amis (familier), service (courant), rapport ou courrier (soutenu possible).',
      'Consulter le trio : chaque notion connue a ses trois étages — bouffer, manger, se sustenter.',
      'Chasser les passe-partout : remplacer donner, faire, avoir par le verbe qui dit l\'action.'
    ],

    summary: [
      'Trois niveaux : familier (oral relâché), courant (standard de la presse), soutenu (précis, recherché).',
      'Les trios du support : cailler / avoir très froid / être mort de froid ; bouffer / manger / se sustenter.',
      'Marques du familier : argot, ruptures, suppression du « ne ».',
      'Passez-partout à remplacer : prodiguer, commettre, détenir, éprouver, compter…'
    ],

    checklist: [
      'Je sais définir les trois niveaux de langue en une phrase chacun.',
      'Je sais ranger dix mots dans leur registre sans dictionnaire.',
      'Je sais compléter un trio (familier, courant, soutenu) pour une notion donnée.',
      'Je sais remplacer « donner / faire / avoir » par cinq verbes précis.'
    ],

    notions: [
      '<strong>Familier</strong> : oral quotidien, argot, syntaxe relâchée (cailler, boulot, zyeuter).',
      '<strong>Courant</strong> : usage standard, presse et télévision (manger, regarder, travail).',
      '<strong>Soutenu</strong> : lexique précis, figures, inversions (se sustenter, considérer, labeur).',
      '<strong>Trio</strong> : trois mots d\'une même notion, un par registre.',
      '<strong>Ne supprimé</strong> : « je sais pas » — marque grammaticale du familier.',
      '<strong>Prodiguer</strong> : remplacer « donner » (des conseils).',
      '<strong>Commettre</strong> : remplacer « faire » (une erreur).',
      '<strong>Compter</strong> : remplacer « avoir » (des habitants).'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les tableaux comparatifs du support et refais les trios.' },
      { cls: 'mid', text: '50–69 % — refais les exercices d\'identification du support (manger, cela m\'est égal).' },
      { cls: 'good', text: '70–94 % — bon niveau, chasse les passe-partout dans vos propres textes.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Trio de « manger » ?', a: 'Bouffer (fam.), manger (cour.), se sustenter (sout.).' },
      { q: 'Trio de « avoir froid » ?', a: 'Cailler (fam.), avoir très froid (cour.), être mort de froid (sout.).' },
      { q: 'Trio de « dormir » ?', a: 'Roupiller (fam.), dormir (cour.), s\'assoupir (sout.).' },
      { q: 'Le niveau courant est celui de…', a: 'La presse et du journal télévisé : standard, sans recherche, sans passé simple.' },
      { q: 'Cinq remplacements de « faire » ?', a: 'Procéder à (une enquête), commettre (une erreur), confectionner (un bijou), intenter (un procès), effectuer (un travail).' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Les fautes au bureau',
    short: 'Fautes',
    toc: 'La date (jours et mois sans majuscule) ; etc. avec son point ; ci-joint invariable ou accordé ; veuillez contre veillez ; de toute façon ; l\'article de profession ; les abréviations M., Mme, Dr.',
    time: '≈ 2 h de travail',

    situation:
      '« On peut clamer haut et fort qu\'on est nul en maths ; le ferait-on sans honte pour le français ? » ' +
      'Le support tranche : maîtriser le français demeure un prérequis du monde professionnel. Ce chapitre ' +
      'traque les quatorze fautes typiques du courrier — de la majuscule de juillet au « Mr » à la place de « M. ».',

    objectives: [
      'écrire les dates sans majuscule parasite et avec les pluriels justes ;',
      'ponctuer etc. correctement (un point, jamais de points de suspension) ;',
      'accorder (ou non) ci-joint selon sa place dans la phrase ;',
      'distinguer veuillez et veillez, de toute façon et de toutes les façons ;',
      'supprimer l\'article devant le nom de profession et abréger les titres à la française.'
    ],

    sections: [
      {
        title: 'La date et etc.',
        html: [
          '<p>Les noms des <strong>jours et des mois sont des noms communs</strong> : pas de majuscule sauf en ' +
          'début de phrase — « mercredi 26 juillet 2023 » — et la marque du pluriel s\'écrit : « le personnel ' +
          'travaille les jeudis », « tous les samedis, je fais l\'inventaire ».</p>',
          '<p><strong>Etc.</strong> est l\'abréviation de la locution latine « et cetera » (et le reste) : ' +
          'elle exige <strong>un point, toujours</strong>, même en milieu de phrase — et jamais de points de ' +
          'suspension derrière : « etc… » est une erreur courante.</p>',
          box('mnemo', 'Mnémotechnique — « juillet est un prénom commun »', 'pin',
            '    <p>Jours et mois = noms communs : minuscule et pluriel possible. Etc. garde son point comme ' +
            'M. garde le sien : une abréviation, un point.</p>')
        ].join('\n')
      },
      {
        title: 'Ci-joint, veuillez, de toute façon',
        html: [
          '<p><strong>Ci-joint</strong> reste <strong>invariable</strong> quand il commence la phrase (« ' +
          'Ci-joint les pièces exigées ») ou quand il est placé entre virgules (« Veuillez trouver, ci-joint, ' +
          'les deux requêtes »). Il devient <strong>adjectif</strong> — et s\'accorde — quand il suit le nom ' +
          'qu\'il détermine : « les statistiques de l\'enquête ci-annexées », ou sans virgule : « Veuillez ' +
          'trouver ci-jointe la notification ».</p>',
          '<p><strong>Veuillez</strong> vient de vouloir (impératif) : « Veuillez croire, Monsieur, à… ». ' +
          '<strong>Veillez</strong> vient de veiller : deux verbes, deux sens, une faute de frappe qui coûte ' +
          'cher en politesse.</p>',
          '<p><strong>De toute façon</strong> se dit au singulier (quoi qu\'il en soit) ; « de toutes les ' +
          'façons » signifie « par tous les moyens » : « il veut s\'enrichir de toutes façons ». Avec ' +
          '<strong>étant donné</strong>, l\'accord est facultatif (étant donnée la rareté…) ; avec « étant ' +
          'donné que », pas d\'accord.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>« Ci-jointes les pièces » : fautif en tête de phrase — invariable.</li>\n' +
            '      <li>« Veillez croire » : fautif — veuillez (vouloir), pas veillez (veiller).</li>\n' +
            '      <li>« De toutes les façons » au sens de « quoi qu\'il arrive » : fautif — singulier.</li>\n' +
            '      <li>« Suppléer au responsable » quand on le remplace : fautif — suppléer quelqu\'un (COD).</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Profession sans article, titres abrégés',
        html: [
          '<p>Devant un nom de <strong>profession, fonction, grade</strong> attribut, pas d\'article : « Je ' +
          'suis chercheur en économie », « J\'aimerais devenir député », « Votre voisin est déjà colonel ». ' +
          '« Je suis un chercheur » est une erreur courante.</p>',
          '<p>Les <strong>abréviations françaises</strong> : M. (Monsieur — pas « Mr », qui est l\'anglais ' +
          'Mister !), Mme, Mlle, M., MM., Mmes, Mlles, Dr, Pr, Me (Maître), S. E. (Son Excellence), S. M. ' +
          '(Sa Majesté), Mgr, He (Honorable).</p>',
          '<p>Quelques locutions à écrire par cœur : <strong>sine die</strong> (sans jour fixé : « la ' +
          'réunion est renvoyée sine die ») ; <strong>abonder dans le même sens</strong> (adhérer à ' +
          'l\'opinion de — pas « j\'aborde ») ; <strong>bel et bien</strong> (réellement — locution figée, ' +
          'pas « belle et bien ») ; <strong>les validations sont du ressort du chef de projet</strong> (pas ' +
          '« ressortent au »).</p>'
        ].join('\n')
      }
    ],

    questions: [
      { q: 'La date correcte s\'écrit…', opts: ['Mercredi 26 Juillet 2023', 'mercredi 26 juillet 2023', 'Mercredi 26 juillet 2023'], correct: 1, exp: 'Jours et mois : noms communs, minuscules.' },
      { q: 'Etc. se ponctue…', opts: ['etc…', 'etc', 'etc.'], correct: 2, exp: 'Un point, toujours — jamais de points de suspension.' },
      { q: '« Veuillez trouver, ci-joint, les requêtes » : ci-joint est…', opts: ['accordé', 'invariable', 'pluriel'], correct: 1, exp: 'Entrez virgules : invariable.' },
      { q: '« Les statistiques ci-annexées » : ci-annexées est…', opts: ['fautif', 'invariable', 'accordé'], correct: 2, exp: 'Après le nom : valeur d\'adjectif, accord.' },
      { q: '« Veillez croire, Monsieur… » : la correction est…', opts: ['Veillez bien croire', 'Veuillez croire', 'Veiller à croire'], correct: 1, exp: 'Veuillez vient de vouloir ; veillez, de veiller.' },
      { q: 'Au sens de « quoi qu\'il en soit », on écrit…', opts: ['de toutes les façons', 'de toute façon', 'de toutes façons'], correct: 1, exp: 'Singulier imposé ; le pluriel signifie « par tous les moyens ».' },
      { q: 'La phrase correcte est…', opts: ['Je suis un chercheur en économie', 'Je suis chercheur en économie', 'Je suis une chercheuse en économie'], correct: 1, exp: 'Profession attribut : pas d\'article.' },
      { q: 'Monsieur s\'abrège…', opts: ['Mr', 'Mr.', 'M.'], correct: 2, exp: 'M. en français ; Mr est l\'anglais Mister.' }
    ],

    pitfalls: [
      'Mettre une majuscule à Juillet ou Lundi : ce sont des noms communs.',
      'Écrire « etc… » ou « etc » sans point : une abréviation, un point.',
      'Accorder ci-joint en tête de phrase ou entre virgules.',
      'Confondre veuillez (vouloir) et veillez (veiller), « Mr » et « M. ».'
    ],

    methodTitle: 'Méthode — relire un courrier en cinq gestes',
    method: [
      'Vérifier les dates : minuscules aux jours et mois, pluriels marqués.',
      'Contrôler ci-joint : tête de phrase ou virgules (invariable), après le nom (accord).',
      'Relire les formules : veuillez, de toute façon, sine die, bel et bien.',
      'Chasser les articles : « je suis chercheur », pas « un chercheur ».',
      'Abréger à la française : M., Mme, Dr, Pr — jamais « Mr ».'
    ],

    summary: [
      'Jours et mois : noms communs — minuscule et pluriel (« les jeudis »).',
      'Etc. : un point toujours, jamais de points de suspension.',
      'Ci-joint : invariable en tête et entre virgules ; accordé après le nom.',
      'Veuillez (vouloir) ≠ veillez (veiller) ; de toute façon au singulier ; profession sans article ; M., pas Mr.'
    ],

    checklist: [
      'Je sais écrire une date professionnelle sans faute.',
      'Je sais ponctuer etc. et justifier pourquoi.',
      'Je sais accorder (ou non) ci-joint selon trois placements.',
      'Je sais abréger Monsieur, Madame, Docteur, Professeur à la française.'
    ],

    notions: [
      '<strong>Jours et mois</strong> : noms communs — minuscule, pluriel possible.',
      '<strong>Etc.</strong> : abréviation d\'« et cetera » — un point, jamais « etc… ».',
      '<strong>Ci-joint invariable</strong> : en tête de phrase ou entre virgules.',
      '<strong>Ci-joint accordé</strong> : après le nom qu\'il détermine (ci-annexées).',
      '<strong>Veuillez</strong> : impératif de vouloir — formule de politesse.',
      '<strong>De toute façon</strong> : singulier (quoi qu\'il en soit).',
      '<strong>Profession attribut</strong> : sans article (« devenir député »).',
      '<strong>M.</strong> : abréviation française de Monsieur — « Mr » est anglais.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les quatorze points du support et reprends la date et etc.' },
      { cls: 'mid', text: '50–69 % — refais les exemples ci-joint et les abréviations.' },
      { cls: 'good', text: '70–94 % — bon niveau, relis un vrai courrier à la loupe.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Majuscule aux jours et mois ?', a: 'Jamais (sauf début de phrase) : noms communs, avec pluriel — « les jeudis ».' },
      { q: 'Etc. : quelle ponctuation ?', a: 'Un point, toujours, même en milieu de phrase ; jamais de points de suspension après.' },
      { q: 'Les trois règles de ci-joint ?', a: 'Invariable en tête de phrase ; invariable entre virgules ; accordé après le nom (adjectif).' },
      { q: 'Veuillez ou veillez ?', a: 'Veuillez (vouloir) pour la politesse ; veillez (veiller) pour la surveillance.' },
      { q: 'Profession attribut : article ?', a: 'Aucun : « Je suis chercheur », « devenir député » — pas « un chercheur ».' }
    ]
  }
];
