/**
 * Chapitres 4 à 6 du cours de Français professionnel B1.
 *
 * Chapitre 4 : pléonasmes, barbarismes, solécismes (les trois familles de fautes).
 * Chapitre 5 : la lettre de motivation (neuf blocs, appel et politesse, corps en trois paragraphes).
 * Chapitre 6 : grammaire professionnelle (passé composé, avoir/être, accords du participe).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code (trois
 * exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-fr-pro.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Pléonasmes, barbarismes, solécismes',
    short: 'Trois familles de fautes',
    toc: 'Le pléonasme (double emploi) ; le barbarisme (mot déformé ou forgé) ; le solécisme (faute de syntaxe et de construction).',
    time: '≈ 2 h de travail',

    situation:
      '« Au jour d\'aujourd\'hui », « un problème pécunier », « si je pourrais » : trois fautes, trois ' +
      'familles. Le support les isole une à une — l\'excès de mots, le mot déformé, la construction qui ' +
      'dérape — parce qu\'on ne corrige bien que ce qu\'on sait nommer.',

    objectives: [
      'définir et repérer le pléonasme (périssologie) ;',
      'définir et corriger le barbarisme (mot forgé, impropres ou déformés) ;',
      'définir et corriger le solécisme (constructions fautives : se rappeler de, pallier à) ;',
      'appliquer la règle du « si » d\'hypothèse : jamais de conditionnel derrière un si.'
    ],

    sections: [
      {
        title: 'Le pléonasme : un mot de trop',
        html: [
          '<p>Le mot vient du grec <em>pleonasmós</em>, « excès, surcharge » : le pléonasme est une ' +
          '<strong>répétition inutile</strong>, un double emploi. En didactique, on parle de ' +
          '<strong>périssologie</strong>. Exemple du support : « vos <em>projets d\'avenir</em> » — projets ' +
          'exprime déjà l\'avenir ; on dit « vos projets ».</p>',
          '<p>Les classiques : <strong>allumer la lumière</strong> (une lampe), <strong>l\'apparence ' +
          'extérieure</strong> (aux apparences), <strong>commémorer un souvenir</strong> (un évènement), ' +
          '<strong>comparer ensemble</strong>, <strong>la première priorité</strong> (la priorité), <strong>un ' +
          'hasard imprévu</strong>, <strong>divulguer publiquement</strong>, <strong>la panacée ' +
          'universelle</strong>, <strong>répéter la même chose deux fois</strong>, <strong>à l\'unanimité de ' +
          'tous les présents</strong> (à l\'unanimité).</p>',
          '<p>Et la longue liste : <strong>au jour d\'aujourd\'hui</strong> (aujourd\'hui), <strong>cela ' +
          's\'avère vrai</strong> (cela s\'avère), <strong>voire même</strong> (voire / et même), <strong>un ' +
          'tri sélectif</strong> (un tri), <strong>incessamment sous peu</strong> (incessamment), <strong>moi ' +
          'personnellement</strong> (moi, ou personnellement), <strong>nous relayer tour à tour</strong>, ' +
          '<strong>découvrir pour la première fois</strong>, <strong>mais par contre</strong>, <strong>et puis</strong> ' +
          '(et / puis), <strong>un mauvais cauchemar</strong>, <strong>comme par exemple</strong>.</p>',
          box('mnemo', 'Mnémotechnique — « un mot de trop, toujours identifiable »', 'pin',
            '    <p>Cherchez l\'information déjà portée par un mot : « d\'avenir » dans projets, « lumière » ' +
            'dans allumer, « extérieure » dans apparence. Le pléonasme se coupe, il ne se reformule pas.</p>')
        ].join('\\n')
      },
      {
        title: 'Le barbarisme : le mot déformé',
        html: [
          '<p>Le barbarisme est une <strong>faute de langue</strong> : mots <strong>forgés</strong> (qui ' +
          'n\'existent pas), mots <strong>impropres</strong> (mal employés) ou tournures étrangères. En ' +
          'Grèce antique, le barbare « déformait la langue de la cité ».</p>',
          '<p>Le corrigé type : <strong>pécuniers → pécuniaires</strong> (de <em>pecunia</em>, argent), ' +
          '<strong>maline → maligne</strong>, <strong>bénine → bénigne</strong>, <strong>nous disons, vous ' +
          'disez → vous dites</strong>, <strong>empruntes → empreintes</strong>, <strong>dilemne → ' +
          'dilemme</strong>.</p>',
          '<p>Les « mots à risque » : <strong>en liste → en lice</strong>, <strong>contreverses → ' +
          'controverses</strong>, <strong>en définitif → en définitive</strong>, <strong>marche de manœuvre ' +
          '→ marge de manœuvre</strong>, <strong>rabattent les oreilles → rebattent les oreilles</strong>, ' +
          '<strong>recouvert la liberté → recouvré</strong> (recouvrer la vue, la santé, la liberté), ' +
          '<strong>rénuméré → rémunéré</strong>, <strong>je vous saurai gré → je vous serai gré</strong> ' +
          '(savoir gré), <strong>indemmes → indemnes</strong>, <strong>en dilettant → en dilettante</strong>.</p>'
        ].join('\\n')
      },
      {
        title: 'Le solécisme : la construction qui dérape',
        html: [
          '<p>Le solécisme est une <strong>faute de syntaxe</strong> : il pèche contre les constructions, ' +
          'les règles d\'accord, l\'emploi des modes. Étymologie : les colons de Soloi, en Cilicie, parlaient ' +
          'un grec incorrect.</p>',
          '<p>Les dix du support : <strong>je me rappelle de → je me rappelle</strong> (on se souvient de, ' +
          'on se rappelle) ; <strong>pallier à → pallier</strong> (transitif direct, comme enfreindre) ; ' +
          '<strong>téléphoner les clients → téléphoner aux clients</strong> (COI) ; <strong>enfreindre aux ' +
          'règles → enfreindre les règles</strong> ; <strong>après que + subjonctif → après que + ' +
          'indicatif</strong> (le fait s\'est produit) ; <strong>d\'ici demain → d\'ici à demain</strong> ; ' +
          '<strong>nous avons débuté la réunion → commencé</strong> (on ne débute pas quelque chose) ; ' +
          '<strong>malgré qu\'il soit → bien qu\'il soit</strong> ; <strong>le véhicule au directeur → le ' +
          'véhicule du directeur</strong> ; <strong>ils se sont divorcés → ils ont divorcé</strong> (verbe ' +
          'non pronominal).</p>',
          '<p>La règle du <strong>« si » d\'hypothèse</strong> retient tout : après « si », jamais de ' +
          'conditionnel — « si je <strong>pouvais</strong>, j\'enverrais ». L\'astuce du support : « les si ' +
          'n\'aiment pas les rais » (poissons-scies et raies).</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\\n' +
            '      <li>Pléonasme ≠ barbarisme : l\'un est un excès de mots, l\'autre un mot faux.</li>\\n' +
            '      <li>Se rappeler prend un complément direct — exception : se rappeler de toi, d\'elle, d\'avoir fait.</li>\\n' +
            '      <li>Après que + indicatif (le fait s\'est produit) ; avant que + subjonctif (il ne s\'est pas encore produit).</li>\\n' +
            '      <li>Un si d\'hypothèse interdit le conditionnel : « si je pouvais », jamais « si je pourrais ».</li>\\n' +
            '    </ul>')
        ].join('\\n')
      }
    ],

    questions: [
      { q: 'Un pléonasme est…', opts: ['un mot déformé', 'une répétition inutile', 'une faute d\'accord'], correct: 1, exp: 'Double emploi : « projets d\'avenir », « allumer la lumière ».' },
      { q: 'La périssologie désigne…', opts: ['la répétition inutile d\'une idée énoncée', 'un mot forgé', 'une inversion élégante'], correct: 0, exp: 'Le nom didactique du pléonasme.' },
      { q: 'La correction de « pécuniers » est…', opts: ['pécuniens', 'pécuniaires', 'financiers'], correct: 1, exp: 'De pecunia, argent : pécuniaire, au féminin comme au masculin.' },
      { q: '« Un dilemne » s\'écrit…', opts: ['dilemne', 'dilemme', 'dileme'], correct: 1, exp: 'Dilemme, deux m.' },
      { q: '« Pallier à cet incident » : la correction est…', opts: ['pallier cet incident', 'pallier sur cet incident', 'palier cet incident'], correct: 0, exp: 'Pallier est transitif direct : on pallie quelque chose.' },
      { q: '« Je me rappelle de mon enfance » : la correction est…', opts: ['Je me rappelle mon enfance', 'Je me souviens mon enfance', 'Je me le rappelle de'], correct: 0, exp: 'On se rappelle quelque chose ; on se souvient de quelque chose.' },
      { q: 'Après « après que », on emploie…', opts: ['le subjonctif', 'l\'indicatif', 'le conditionnel'], correct: 1, exp: 'Le fait s\'est produit : indicatif. Avant que : subjonctif.' },
      { q: '« Si je pourrais obtenir… » : la correction est…', opts: ['Si je pourrai obtenir', 'Si je pouvais obtenir', 'Si j\'obtiendrais'], correct: 1, exp: 'Jamais de conditionnel après un si d\'hypothèse.' }
    ],

    pitfalls: [
      'Corriger « allumer la lumière » en « allumer la lampe » seulement à l\'écrit : le pléonasme se dit aussi.',
      'Inventer « dilemne », « contreverse », « rénuméré » : barbarismes classiques des copies.',
      'Écrire « malgré que » : bien que + subjonctif, ou malgré + nom.',
      'Mettre un conditionnel après « si » : les si n\'aiment pas les rais.'
    ],

    methodTitle: 'Méthode — nommer la faute en trois gestes',
    method: [
      'Compter les mots : une information double = pléonasme, on coupe.',
      'Contrôler la forme : mot inexistant ou déformé = barbarisme, on restitue la vraie forme.',
      'Vérifier la construction : préposition en trop ou manquante = solécisme, on réaccorde le verbe.'
    ],

    summary: [
      'Pléonasme : répétition inutile (périssologie) — projets d\'avenir, au jour d\'aujourd\'hui.',
      'Barbarisme : mot forgé, impropre ou déformé — pécuniaire, maligne, dilemme, empreintes.',
      'Solécisme : faute de syntaxe — pallier, se rappeler, enfreindre (direct) ; téléphoner à.',
      'Si d\'hypothèse : indicatif, jamais de conditionnel.'
    ],

    checklist: [
      'Je sais définir les trois familles en une phrase chacune.',
      'Je sais corriger dix pléonasmes courants.',
      'Je sais restituer dix barbarismes (pécuniaire, dilemme, empreintes…).',
      'Je sais réaccorder les verbes piégés : rappeler, pallier, enfreindre, téléphoner.'
    ],

    notions: [
      '<strong>Pléonasme</strong> : double emploi — allumer une lampe, la priorité, l\'unanimité.',
      '<strong>Périssologie</strong> : nom didactique de la répétition inutile.',
      '<strong>Barbarisme</strong> : mots forgés, impropres, tournures étrangères.',
      '<strong>Pécuniaire</strong> : qui concerne l\'argent — jamais « pécunier ».',
      '<strong>Dilemme</strong> : deux m — jamais « dilemne ».',
      '<strong>Empreintes</strong> : digitales — jamais « empruntes ».',
      '<strong>Solécisme</strong> : faute de construction ou d\'accord.',
      '<strong>Si d\'hypothèse</strong> : pas de conditionnel derrière « si ».'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — refais les trois listes du support, une famille à la fois.' },
      { cls: 'mid', text: '50–69 % — refais les dix pléonasmes et les dix solécismes.' },
      { cls: 'good', text: '70–89 % — bon niveau, traque les barbarismes dans tes mails.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les trois familles de fautes ?', a: 'Pléonasme (mot de trop), barbarisme (mot déformé ou forgé), solécisme (construction fautive).' },
      { q: 'Pallier ou pallier à ?', a: 'Pallier : transitif direct — on pallie un manque, une défaillance. Pallier à est fautif.' },
      { q: 'Se rappeler ou se rappeler de ?', a: 'Se rappeler quelque chose (COD) ; se souvenir de quelque chose. Exceptions : se rappeler de toi, d\'elle, d\'avoir fait.' },
      { q: 'Après que ou avant que ?', a: 'Après que + indicatif (fait réalisé) ; avant que + subjonctif (fait envisagé).' },
      { q: 'Cinq barbarismes classiques ?', a: 'Pécuniers → pécuniaires ; maline → maligne ; dilemne → dilemme ; empruntes → empreintes ; rénuméré → rémunéré.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'La lettre de motivation',
    short: 'Lettre',
    toc: 'Les neuf blocs de la lettre formelle ; formules d\'appel et de politesse ; le corps en trois paragraphes ; les stratégies lexicales du parcours.',
    time: '≈ 2 h de travail',

    situation:
      'Kiryang Park postule à Paris : une lettre qui coche les neuf blocs — coordonnées, destinataire, date, ' +
      'objet, appel, corps, demande de rendez-vous, formule de politesse, signature. La lettre formelle ' +
      '« répond à des normes bien précises » : le chapitre les rend mécaniques.',

    objectives: [
      'identifier les neuf blocs d\'une lettre formelle et leur ordre ;',
      'choisir la formule d\'appel (Madame, Monsieur,) et la formule de politesse longue ;',
      'structurer le corps en trois paragraphes : entreprise, compétences, motivations ;',
      'employer les stratégies lexicales : candidature, études, expérience, qualités.'
    ],

    sections: [
      {
        title: 'Les neuf blocs de la lettre',
        html: [
          '<p>La lettre de Kiryang Park sert de plan : <strong>1</strong> les coordonnées (identiques au CV, ' +
          'à jour) ; <strong>2</strong> le destinataire (« À l\'attention de Mme Rivoli ») ; <strong>3</strong> ' +
          'la ville et la date (en haut à droite) ; <strong>4</strong> l\'<strong>objet</strong> — court, clair, ' +
          '<strong>sans verbe conjugué</strong> (« Candidature au poste de vendeur ») ; <strong>5</strong> la ' +
          'formule d\'appel ; <strong>6</strong> le corps en trois paragraphes ; <strong>7</strong> la demande ' +
          'de rendez-vous ; <strong>8</strong> la formule de politesse longue ; <strong>9</strong> la signature ' +
          '(prénom, nom, signature manuscrite, en bas à droite).</p>',
          '<p>La lettre n\'est <strong>pas une répétition du CV</strong> : elle complète le CV en expliquant ' +
          'le parcours et les motivations. Elle reste formelle — jamais familier, même pour « montrer sa ' +
          'confiance ».</p>',
          box('mnemo', 'Mnémotechnique — « 1-2-3 qui écrivent, 4-5 qui ouvrent, 6-7-8-9 qui concluent »', 'pin',
            '    <p>Trois blocs d\'en-tête (coordonnées, destinataire, date), deux blocs d\'ouverture (objet, ' +
            'appel), quatre blocs de clôture (corps, rendez-vous, politesse, signature).</p>')
        ].join('\\n')
      },
      {
        title: 'Appel, politesse, corps',
        html: [
          '<p>La <strong>formule d\'appel</strong> commence par une majuscule et finit par une virgule. ' +
          'Destinataire connu : « Madame, » ou « Monsieur, » ; inconnu : « Madame, Monsieur, » ou « Mesdames, ' +
          'Messieurs, ». Titre officiel : « Madame la Directrice, », « Maître, », « Docteur, ». « Bonjour ' +
          'Madame » est proscrit ; « Cher/Chère » réservé aux proches.</p>',
          '<p>La <strong>formule de politesse</strong> longue pour une lettre de motivation : « Dans ' +
          'l\'attente de votre réponse, je vous prie d\'agréer, Madame, Monsieur, mes sincères salutations. » ' +
          'En courriel : « Cordialement, » — majuscule et virgule, suivi du nom.</p>',
          '<p>Le <strong>corps</strong> compte trois paragraphes <strong>maximum</strong> : paragraphe 1, ' +
          'l\'intérêt pour l\'entreprise ; paragraphe 2, les compétences professionnelles ; paragraphe 3, les ' +
          'motivations plus personnelles. La lettre finit sur une demande de rendez-vous : le candidat se ' +
          'tient à disposition.</p>'
        ].join('\\n')
      },
      {
        title: 'Les stratégies lexicales',
        html: [
          '<p><strong>Pour commencer</strong> : « Étant en recherche active d\'emploi, je vous soumets ma ' +
          'candidature » (spontanée) ; « Suite à l\'annonce parue dans… » (réponse à une annonce).</p>',
          '<p><strong>Les études</strong> : « Étant titulaire d\'un Master en… », « Diplômé(e) de… », « J\'ai ' +
          'étudié le marketing » — <strong>sans article</strong> après « des études de » : « des études de ' +
          'marketing », pas « du marketing ».</p>',
          '<p><strong>L\'expérience</strong> : « Grâce à mon expérience… », « Après un stage en… », « J\'ai ' +
          'travaillé pendant… ans en tant que… ». <strong>Les compétences</strong> : « J\'ai une bonne ' +
          'maîtrise de… », « Je suis doté(e) du sens de… ».</p>',
          '<p><strong>Les qualités</strong> : être + adjectif (efficace, rigoureux) ; être à + nom (à ' +
          'l\'écoute) ; <strong>avoir le sens de</strong> + nom (l\'organisation, le contact, l\'écoute) ; ' +
          '<strong>avoir l\'esprit de</strong> + nom sans article (synthèse, groupe) ; avoir la capacité à + ' +
          'infinitif ; la maîtrise de + nom ; de bonnes compétences en + nom sans article (en informatique).</p>'
        ].join('\\n')
      }
    ],

    questions: [
      { q: 'L\'objet d\'une lettre de motivation…', opts: ['contient un verbe conjugué', 'est court, clair, sans verbe conjugué', 's\'écrit après la signature'], correct: 1, exp: '« Candidature au poste de vendeur » : un résumé nominal.' },
      { q: 'Destinataire inconnu : l\'appel correct est…', opts: ['Bonjour Madame,', 'Madame, Monsieur,', 'Chère Madame,'], correct: 1, exp: '« Bonjour » est proscrit ; « Cher » réservé aux proches.' },
      { q: 'Le corps de la lettre compte…', opts: ['un paragraphe unique', 'trois paragraphes maximum', 'cinq paragraphes'], correct: 1, exp: 'Entreprise, compétences, motivations personnelles.' },
      { q: 'Le paragraphe 1 met en avant…', opts: ['l\'intérêt pour l\'entreprise', 'les compétences', 'les motivations personnelles'], correct: 0, exp: 'Puis compétences (2) et motivations (3).' },
      { q: 'La lettre finit sur…', opts: ['une demande de rendez-vous', 'un remerciement bref', 'un rappel du salaire'], correct: 0, exp: '« Je me tiens à votre disposition » : la formule consacrée.' },
      { q: '« J\'ai fait des études de… » : après, on écrit…', opts: ['du marketing', 'la marketing', 'marketing (sans article)'], correct: 2, exp: '« J\'ai étudié le marketing » mais « des études de marketing ».' },
      { q: '« Avoir l\'esprit de… » se construit…', opts: ['avec un article', 'sans article (esprit de synthèse)', 'avec un adverbe'], correct: 1, exp: 'Esprit de synthèse, de groupe, d\'entreprise — sans article.' },
      { q: 'La formule de politesse d\'une lettre de motivation est…', opts: ['courte (Cordialement)', 'longue (« je vous prie d\'agréer… »)', 'facultative'], correct: 1, exp: 'Formule longue privilégiée ; Cordialement reste pour le courriel.' }
    ],

    pitfalls: [
      'Ouvrir par « Bonjour Madame, » : l\'appel formel s\'appelle « Madame, Monsieur, ».',
      'Conjuguer un verbe dans l\'objet : il est nominal, court, clair.',
      'Écrire « des études du marketing » : sans article après « études de ».',
      'Recopier le CV dans la lettre : elle complète le CV, elle ne le répète pas.'
    ],

    methodTitle: 'Méthode — rédiger la lettre en cinq gestes',
    method: [
      'Poser les neuf blocs dans l\'ordre, en-tête d\'abord.',
      'Écrire l\'objet nominal, puis l\'appel adapté au destinataire.',
      'Remplir le corps : entreprise (1), compétences (2), motivations (3).',
      'Conclure : demande de rendez-vous + formule de politesse longue.',
      'Signer : prénom, nom, signature manuscrite.'
    ],

    summary: [
      'Neuf blocs : coordonnées, destinataire, date, objet, appel, corps, rendez-vous, politesse, signature.',
      'Objet sans verbe conjugué ; appel « Madame, Monsieur, » si le destinataire est inconnu.',
      'Corps en trois paragraphes : entreprise, compétences, motivations.',
      'Lexique : des études de + spécialité (sans article), le sens de, l\'esprit de + nom sans article.'
    ],

    checklist: [
      'Je sais lister les neuf blocs dans l\'ordre.',
      'Je sais écrire un objet nominal et une formule d\'appel correcte.',
      'Je sais répartir trois paragraphes sans chevauchement.',
      'Je sais formuler études, expérience et qualités selon les stratégies du support.'
    ],

    notions: [
      '<strong>Objet</strong> : résumé nominal de la lettre — sans verbe conjugué.',
      '<strong>Appel</strong> : majuscule, virgule — « Madame, Monsieur, » ; jamais « Bonjour ».',
      '<strong>Politesse longue</strong> : « je vous prie d\'agréer… mes sincères salutations ».',
      '<strong>Corps</strong> : trois paragraphes — entreprise, compétences, motivations.',
      '<strong>Études de</strong> : sans article — « des études de marketing ».',
      '<strong>Le sens de</strong> : l\'organisation, le contact, l\'écoute.',
      '<strong>L\'esprit de</strong> : sans article — synthèse, groupe, entreprise.',
      '<strong>Rendez-vous</strong> : « Je me tiens à votre entière disposition ».'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends la lettre de Kiryang Park bloc par bloc.' },
      { cls: 'mid', text: '50–69 % — refais les formules d\'appel et les stratégies lexicales.' },
      { cls: 'good', text: '70–89 % — bon niveau, rédige une lettre complète chronométrée.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les neuf blocs de la lettre ?', a: 'Coordonnées, destinataire, date, objet, appel, corps, demande de rendez-vous, politesse, signature.' },
      { q: 'L\'appel pour un destinataire inconnu ?', a: '« Madame, Monsieur, » — majuscule et virgule ; jamais « Bonjour Madame ».' },
      { q: 'Les trois paragraphes du corps ?', a: '1 : l\'intérêt pour l\'entreprise ; 2 : les compétences professionnelles ; 3 : les motivations personnelles.' },
      { q: '« Des études de » ou « des études du » ?', a: 'Sans article : « des études de marketing », « J\'ai étudié le marketing » (mais pas « du marketing »).' },
      { q: 'La formule de politesse longue ?', a: '« Dans l\'attente de votre réponse, je vous prie d\'agréer, Madame, Monsieur, mes sincères salutations. »' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Grammaire professionnelle',
    short: 'Grammaire',
    toc: 'Le passé composé : avoir ou être ; les participes passés des verbes courants ; les accords du participe avec être ; le cas particulier de « vous ».',
    time: '≈ 2 h de travail',

    situation:
      '« J\'ai étudié », « je suis parti », « nous sommes allés » : le passé composé raconte le parcours ' +
      'dans une lettre de motivation. Encore faut-il choisir le bon auxiliaire et accorder le participe — ' +
      'le dernier chapitre outille la phrase parfaite.',

    objectives: [
      'former le passé composé : avoir ou être au présent + participe passé ;',
      'connaître la liste des verbes conjugués avec être ;',
      'accorder le participe passé avec être comme un adjectif ;',
      'gérer l\'accord avec « vous » : quatre cas, du groupe mixte à la politesse singulière.'
    ],

    sections: [
      {
        title: 'Avoir ou être',
        html: [
          '<p>Le passé composé = <strong>avoir ou être au présent + participe passé</strong>. Les verbes ' +
          '<strong>transitifs</strong> (avec COD ou COI) prennent <strong>avoir</strong> : « J\'ai acheté un ' +
          'livre » (quoi ? un livre) ; « Il a parlé de son film » (de quoi ? du film).</p>',
          '<p>Les verbes <strong>intransitifs de mouvement</strong> prennent <strong>être</strong> : venir, ' +
          'devenir, arriver, partir, entrer, sortir, monter, descendre, passer, retourner, tomber, rester, ' +
          'naître, mourir — et leurs dérivés (revenir, rentrer…). Exemples : « Elle est partie en vacances ' +
          'hier soir » ; « Ils se sont réveillés à 6 heures » (verbes pronominaux : être aussi).</p>',
          '<p>Les verbes <strong>douteux</strong> — entrer, rentrer, sortir, monter, descendre, retourner, ' +
          'passer, demeurer — prennent <strong>avoir avec un COD</strong> (« J\'ai monté les bagages ») et ' +
          '<strong>être sans COD</strong> (« Je suis monté au premier étage »).</p>',
          box('mnemo', 'Mnémotechnique — « la maison d\'être »', 'pin',
            '    <p>Aller, venir, partir, arriver, entrer, sortir, monter, descendre, naître, mourir, rester, ' +
            'tomber, retourner, passer, demeurer : la maison d\'être — tout ce qui se déplace ou change ' +
            'd\'état habite chez être ; ce qui s\'achète ou se dit reste chez avoir.</p>')
        ].join('\\n')
      },
      {
        title: 'Participes et accords',
        html: [
          '<p>Les participes courants du support, par famille : <strong>-é</strong> (allé, entré, travaillé) ; ' +
          '<strong>-u</strong> (eu, connu, entendu, reçu, venu, vécu, voulu) ; <strong>-it</strong> (dit, ' +
          'écrit, fait) ; <strong>-i</strong> (dormi, fini, parti, sorti) ; <strong>-is</strong> (acquis, ' +
          'appris, compris, mis, pris, soumis) ; <strong>-ert</strong> (découvert, ouvert, offert).</p>',
          '<p>Avec <strong>être</strong>, le participe s\'accorde <strong>comme un adjectif</strong>, en genre ' +
          'et en nombre : il est allé, elle est allée, ils sont allés, elles sont allées. « Julie dit : je ' +
          'suis <strong>allée</strong> » — le « je » représente Julie. « Djamel et Malika : nous sommes ' +
          '<strong>allés</strong> » — groupe mixte, masculin pluriel.</p>',
          '<p><strong>Vous</strong> : quatre cas — groupe d\'hommes ou mixte : « Vous êtes sortis » ; groupe ' +
          'féminin : « Vous êtes sorties » ; politesse envers un homme : « Vous êtes sorti » ; politesse ' +
          'envers une femme : « Vous êtes sortie ». Identifier l\'antécédent avant d\'accorder.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\\n' +
            '      <li>« Elle a parti » : fautif — partir prend être : « Elle est partie ».</li>\\n' +
            '      <li>« Ils se sont divorcés » : fautif — divorcer n\'est pas pronominal : « Ils ont divorcé ».</li>\\n' +
            '      <li>« Vous êtes sorties » adressé à un homme : fautif — identifier l\'antécédent réel.</li>\\n' +
            '      <li>« J\'ai monté au premier étage » sans COD : fautif — « Je suis monté » (intransitif).</li>\\n' +
            '    </ul>')
        ].join('\\n')
      }
    ],

    questions: [
      { q: 'Le passé composé se forme avec…', opts: ['avoir seul', 'être seul', 'avoir ou être au présent + participe passé'], correct: 2, exp: 'Auxiliaire au présent, puis participe passé.' },
      { q: '« Elle est partie en vacances » : partir prend…', opts: ['avoir', 'être', 'les deux indifféremment'], correct: 1, exp: 'Verbe de mouvement : être.' },
      { q: '« J\'ai monté les bagages » : monter prend…', opts: ['avoir (avec COD)', 'être (toujours)', 'avoir (sans COD)'], correct: 0, exp: 'COD présent : avoir. Sans COD : « je suis monté ».' },
      { q: 'Le participe de « écrire » est…', opts: ['écrivé', 'écrit', 'écris'], correct: 1, exp: 'Famille -it : dit, écrit, fait.' },
      { q: 'Le participe de « prendre » est…', opts: ['prendu', 'prené', 'pris'], correct: 2, exp: 'Famille -is : acquis, appris, compris, mis, pris, soumis.' },
      { q: 'Avec être, le participe s\'accorde…', opts: ['avec le COD', 'comme un adjectif, avec le sujet', 'jamais'], correct: 1, exp: 'Genre et nombre du sujet : allée, allés, allées.' },
      { q: '« Vous » de politesse adressé à une femme : « Vous êtes… »', opts: ['sorti', 'sortie', 'sorties'], correct: 1, exp: 'Politesse + femme : féminin singulier.' },
      { q: 'Djamel et Malika disent : « Nous sommes… »', opts: ['allé', 'allée', 'allés'], correct: 2, exp: 'Groupe mixte : masculin pluriel.' }
    ],

    pitfalls: [
      'Conjuguer « entrer » avec avoir sans COD : « je suis entré », pas « j\'ai entré ».',
      'Oublier l\'accord après être : « elles sont allé » est fautif.',
      'Accorder « vous » au hasard : quatre cas à trier (groupe mixte, femmes, homme, femme).',
      'Confondre monter avec COD (avoir) et monter intransitif (être).'
    ],

    methodTitle: 'Méthode — accorder le passé composé en trois gestes',
    method: [
      'Choisir l\'auxiliaire : mouvement ou pronominal (être), transitif (avoir), douteux selon le COD.',
      'Identifier l\'antécédent du sujet, surtout pour je, tu, nous, vous.',
      'Accorder avec être comme un adjectif : rien, e, s, es.'
    ],

    summary: [
      'Passé composé : avoir ou être au présent + participe passé.',
      'Être : verbes de mouvement (maison d\'être), verbes pronominaux, verbes douteux sans COD.',
      'Participes par familles : -é, -u, -it, -i, -is, -ert.',
      'Avec être, accord comme adjectif ; « vous » : quatre cas selon l\'antécédent.'
    ],

    checklist: [
      'Je sais réciter la liste des verbes conjugués avec être.',
      'Je sais classer vingt participes passés par famille de terminaison.',
      'Je sais accorder le participe après être avec les quatre sujets types.',
      'Je sais choisir la forme de « vous êtes sorti(e)(s) » sur les quatre cas.'
    ],

    notions: [
      '<strong>Passé composé</strong> : auxiliaire au présent + participe passé.',
      '<strong>Maison d\'être</strong> : aller, venir, partir, arriver, entrer, sortir, monter, descendre…',
      '<strong>Verbes douteux</strong> : avoir avec COD, être sans COD (monter, sortir, descendre…).',
      '<strong>Pronominaux</strong> : toujours être (se coucher, se lever, se souvenir).',
      '<strong>Familles de participes</strong> : -é, -u, -it, -i, -is, -ert.',
      '<strong>Accord avec être</strong> : genre et nombre du sujet, comme l\'adjectif.',
      '<strong>Vous masculin pluriel</strong> : groupe d\'hommes ou mixte — « vous êtes sortis ».',
      '<strong>Vous de politesse</strong> : accord selon la personne visée — sorti / sortie.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis la maison d\'être et les familles de participes.' },
      { cls: 'mid', text: '50–69 % — refais le tableau d\'accords du support (allé, allée, allés, allées).' },
      { cls: 'good', text: '70–89 % — bon niveau, accorde les « vous » sans hésiter.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Auxiliaire de partir ? d\'acheter ?', a: 'Partir : être (mouvement). Acheter : avoir (transitif avec COD).' },
      { q: 'Familles de participes du support ?', a: '-é (allé), -u (reçu), -it (dit), -i (fini), -is (pris), -ert (ouvert).' },
      { q: 'Les quatre cas de « vous » ?', a: 'Hommes ou groupe mixte : sortis. Femmes : sorties. Politesse homme : sorti. Politesse femme : sortie.' },
      { q: 'Monter avec ou sans COD ?', a: '« J\'ai monté les bagages » (COD, avoir) ; « Je suis monté au premier étage » (sans COD, être).' },
      { q: 'Ils se sont divorcés : correct ?', a: 'Non : divorcer n\'est pas pronominal — « Ils ont divorcé ».' }
    ]
  }
];
