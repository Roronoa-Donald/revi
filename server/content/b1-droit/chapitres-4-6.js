/**
 * Chapitres 4 à 6 du cours de Droit B1.
 *
 * Chapitre 4 : la personnalité juridique (personnes physiques, personnes morales).
 * Chapitre 5 : l'application de la loi dans le temps (jour franc, non-rétroactivité, abrogation).
 * Chapitre 6 : contrats et obligations (validité, vices du consentement, responsabilité).
 *
 * Les ateliers de code (trois exercices Bash par chapitre) sont injectés avant
 * le QCM par `scripts/generate-code-labs.js` à partir de
 * `server/exercises/b1-droit.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'La personnalité juridique',
    short: 'Personnalité juridique',
    toc: 'Personnes physiques et morales ; naissance, décès, absence et disparition ; l\'enfant simplement conçu.',
    time: '≈ 2 h de travail',

    situation:
      'Une succession s\'ouvre : un fils est né, un enfant est encore à naître, une tante a disparu en mer, ' +
      'un oncle est sans nouvelles depuis six ans. Qui peut recueillir ? La réponse tient dans une notion : ' +
      'la personnalité juridique — l\'aptitude à être titulaire de droits et soumis à des obligations.',

    objectives: [
      'définir la personnalité juridique et ses deux catégories de titulaires ;',
      'dater le point de départ et le point d\'arrivée de la personnalité des personnes physiques ;',
      'distinguer absence et disparition ;',
      'classer les personnes morales entre droit public et droit privé.'
    ],

    sections: [
      {
        title: 'La notion et les personnes physiques',
        html: [
          '<p>La <strong>personnalité juridique</strong> est l\'aptitude à être titulaire de droits et soumis ' +
          'à des obligations. Elle est reconnue à deux catégories de sujets de droit : les <strong>personnes ' +
          'physiques</strong> (tout être humain) et les <strong>personnes morales</strong> (entités reconnues ' +
          'par le droit : sociétés commerciales, associations, fondations, collectivités publiques).</p>',
          '<p>Pour la personne physique, la personnalité s\'acquiert à la <strong>naissance</strong> et se ' +
          'perd au <strong>décès</strong>. Exception, dans l\'intérêt de l\'enfant : le point de départ peut ' +
          'être repoussé à la <strong>date présumée de la conception</strong>. Quand le père meurt avant la ' +
          'naissance, la loi admet que l\'enfant <em>simplement conçu</em> avait la personnalité juridique ' +
          'dès sa conception, pour recueillir la succession ou bénéficier d\'une assurance contractée par ' +
          'son père.</p>',
          '<p>Quand le décès est difficile à constater, le code civil prévoit deux situations : ' +
          'l\'<strong>absence</strong> — la personne a quitté son domicile et est restée sans nouvelles ' +
          'pendant un délai relativement long (cinq ans) ; la <strong>disparition</strong> — le corps n\'a ' +
          'pu être retrouvé mais le décès est probable au regard des circonstances (accident d\'avion, ' +
          'naufrage).</p>',
          box('mnemo', 'Mnémotechnique — « N-D : naissance, décès » et « A-D : absence, disparition »', 'pin',
            '    <p>Départ : naissance (ou conception, pour l\'enfant à naître dans son intérêt). Arrivée : décès ' +
            '(ou présomption de décès par disparition). L\'absence est l\'attente : la personnalité subsiste ' +
            'jusqu\'à la déclaration d\'absence.</p>')
        ].join('\n')
      },
      {
        title: 'Les personnes morales',
        html: [
          '<p>La <strong>personne morale</strong> est tout groupement d\'individus pourvu d\'une possibilité ' +
          'd\'expression collective pour la défense d\'intérêts licites, dignes d\'être reconnus et protégés ' +
          'par la loi. Deux familles :</p>',
          '<ul>\n' +
          '    <li><strong>Personnes morales de droit public</strong> (personnes publiques) : régies par le droit public — collectivités publiques, établissements publics (l\'État, une commune, une université publique).</li>\n' +
          '    <li><strong>Personnes morales de droit privé</strong> : régies par le droit privé — associations à caractère désintéressé, sociétés commerciales, entreprises privées.</li>\n' +
          '  </ul>',
          '<p>La personne morale possède son propre patrimoine, distinct de celui de ses membres : la société ' +
          'contracte, plaide, paie en son nom. C\'est ce qui la distingue du simple groupement de fait — et ' +
          'ce qui explique qu\'un contrat signé par « l\'entreprise » engage la personne morale, pas ' +
          'personnellement le gérant, sauf faute détachable.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Disparition ≠ absence : disparition = décès probable, circonstances accidentelles ; absence = sans nouvelles, sans certitude.</li>\n' +
            '      <li>L\'enfant simplement conçu ne succède que dans son intérêt (succession, assurance du père décédé) — pas dans tous les cas.</li>\n' +
            '      <li>Une association est une personne morale de droit <strong>privé</strong>, même reconnue d\'utilité publique.</li>\n' +
            '      <li>La personnalité de la personne physique s\'acquiert à la naissance — un enfant né sans vie n\'en a pas.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'La personnalité juridique est…', opts: ['le droit de voter', 'l\'aptitude à être titulaire de droits et soumis à des obligations', 'une carte d\'identité'], correct: 1, exp: 'Définition du support : aptitude à être titulaire de droits et soumis à des obligations.' },
      { q: 'Elle s\'acquiert à…', opts: ['la conception toujours', 'la naissance (exception : conception dans l\'intérêt de l\'enfant)', 'la majorité'], correct: 1, exp: 'Principe : naissance ; exception repoussée à la conception pour la succession du père décédé.' },
      { q: 'Elle se perd au…', opts: ['mariage', 'décès', 'déménagement'], correct: 1, exp: 'Le décès marque la fin de la personnalité juridique.' },
      { q: 'L\'absence suppose…', opts: ['un naufrage certain', 'être sans nouvelles d\'une personne éloignée de son domicile pendant un long délai (5 ans)', 'un procès perdu'], correct: 1, exp: 'Sans nouvelles, sans certitude de décès : situation d\'attente.' },
      { q: 'La disparition suppose…', opts: ['le corps introuvable mais le décès probable (naufrage, crash)', 'une simple fugue', 'un emprisonnement'], correct: 0, exp: 'Circonstances accidentelles rendant le décès probable : présomption de décès.' },
      { q: 'L\'État et les communes sont des personnes morales…', opts: ['de droit privé', 'de droit public', 'sans personnalité'], correct: 1, exp: 'Collectivités publiques et établissements publics : droit public.' },
      { q: 'Une société commerciale est une personne morale…', opts: ['de droit public', 'de droit privé', 'physique'], correct: 1, exp: 'Sociétés commerciales et entreprises privées : droit privé.' },
      { q: 'Le patrimoine de la personne morale est…', opts: ['confondu avec celui du gérant', 'propre et distinct de celui de ses membres', 'nul'], correct: 1, exp: 'Elle contracte et plaide en son nom, avec son patrimoine.' }
    ],

    pitfalls: [
      'Confondre absence (sans nouvelles, 5 ans) et disparition (décès probable, corps introuvable).',
      'Donner la personnalité à l\'enfant conçu dans tous les cas : seulement dans son intérêt (succession, assurance).',
      'Classer les associations dans le droit public : elles relèvent du droit privé.',
      'Croire que la personnalité s\'acquiert à la majorité : elle naît avec la personne physique.'
    ],

    methodTitle: 'Méthode — statuer sur un sujet de droit',
    method: [
      'Être humain ? → personne physique : naissance, décès, absence, disparition.',
      'Groupement ? → personne morale : public (collectivités, établissements publics) ou privé (sociétés, associations, fondations).',
      'Litige successoral avec un enfant à naître ? → conception si c\'est dans son intérêt.',
      'Certitude du décès impossible ? → absence (attente) ou disparition (présomption de décès).'
    ],

    summary: [
      'Personnalité juridique = aptitude à être titulaire de droits et soumis à des obligations.',
      'Personnes physiques : acquise à la naissance (conception si intérêt de l\'enfant), perdue au décès.',
      'Absence : sans nouvelles cinq ans ; disparition : décès probable, corps introuvable.',
      'Personnes morales : de droit public (État, collectivités, établissements) ou de droit privé (sociétés, associations, fondations).'
    ],

    checklist: [
      'Je sais définir la personnalité juridique sans notes.',
      'Je sais dater départ et arrivée de la personnalité physique avec les exceptions.',
      'Je sais distinguer absence et disparition avec un exemple chacun.',
      'Je sais classer huit personnes morales entre public et privé.'
    ],

    notions: [
      '<strong>Personnalité juridique</strong> : aptitude à avoir des droits et des obligations.',
      '<strong>Personne physique</strong> : tout être humain.',
      '<strong>Personne morale</strong> : groupement reconnu et protégé par la loi.',
      '<strong>Enfant simplement conçu</strong> : personnalité repoussée à la conception, dans son intérêt.',
      '<strong>Absence</strong> : sans nouvelles cinq ans, situation d\'attente.',
      '<strong>Disparition</strong> : décès probable, corps introuvable.',
      '<strong>Personne morale publique</strong> : collectivités et établissements publics.',
      '<strong>Personne morale privée</strong> : sociétés, associations, fondations.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends la notion et les deux catégories.' },
      { cls: 'mid', text: '50–69 % — refais le classement public/privé et absence/disparition.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible l\'exception de l\'enfant conçu.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Définir la personnalité juridique ?', a: 'L\'aptitude à être titulaire de droits et soumis à des obligations ; reconnue aux personnes physiques et morales.' },
      { q: 'Départ et arrivée de la personnalité physique ?', a: 'Naissance (conception si intérêt de l\'enfant : succession du père décédé, assurance) ; décès.' },
      { q: 'Absence vs disparition ?', a: 'Absence : sans nouvelles pendant 5 ans, décès incertain. Disparition : corps introuvable, décès probable (naufrage, crash).' },
      { q: 'Personnes morales de droit public ?', a: 'Collectivités publiques et établissements publics, régies par le droit public.' },
      { q: 'Personnes morales de droit privé ?', a: 'Associations désintéressées, sociétés commerciales, entreprises privées — patrimoine propre, distinct des membres.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'L\'application de la loi dans le temps',
    short: 'Loi dans le temps',
    toc: 'Jour franc et entrée en vigueur ; non-rétroactivité et effet immédiat ; abrogation expresse et tacite.',
    time: '≈ 2 h de travail',

    situation:
      'Une loi nouvelle entre en vigueur mardi. Un contrat signé en janvier se termine en mars ; un autre ' +
      'commence mercredi ; un troisième est né en février et n\'est pas fini. Quelle loi s\'applique à ' +
      'chacun ? Le chapitre donne les règles — et apprend à gérer les disparitions de textes : ' +
      'l\'abrogation.',

    objectives: [
      'calculer l\'entrée en vigueur d\'une loi : publication, jour franc ;',
      'appliquer la non-rétroactivité et l\'effet immédiat de la loi nouvelle ;',
      'distinguer abrogation expresse et tacite ;',
      'statuer sur des situations juridiques créées avant, pendant et après la loi nouvelle.'
    ],

    sections: [
      {
        title: 'Entrée en vigueur et non-rétroactivité',
        html: [
          '<p>Une fois promulguée, la loi doit être <strong>publiée</strong> au journal officiel. Elle ' +
          'n\'entre en vigueur qu\'après un délai de 24 heures suivant la parution : le <strong>jour ' +
          'franc</strong>. Exemple du support : parution le 03/09/2025, jour franc le 04/09, entrée en ' +
          'vigueur le 05/09. Passé ce délai, « <strong>nul n\'est censé ignorer la loi</strong> ».</p>',
          '<p>L\'article 2 du code civil tranche le conflit dans le temps : « la loi ne dispose que pour ' +
          'l\'avenir ; elle n\'a point d\'effet rétroactif ». D\'où deux règles : la <strong>non-rétroactivité</strong> ' +
          '— la loi nouvelle ne s\'applique pas aux situations juridiques nées antérieurement et qui ont fini ' +
          'de produire tous leurs effets ; l\'<strong>effet immédiat</strong> — elle s\'applique à toutes les ' +
          'situations créées postérieurement à son entrée en vigueur, et aux situations en cours.</p>',
          '<p>L\'application dans l\'espace ne pose guère de problème : la loi s\'applique sur le territoire ' +
          'national. C\'est le temps qui crée les difficultés — et que les deux règles ci-dessus résolvent.</p>',
          box('mnemo', 'Mnémotechnique — « éteint, ancienne ; en cours ou nouveau, nouvelle »', 'pin',
            '    <p>Une situation <strong>éteinte</strong> avant l\'entrée en vigueur reste sous la loi ' +
            'ancienne (non-rétroactivité). Une situation <strong>en cours</strong> ou <strong>née après</strong> ' +
            'passe sous la loi nouvelle (effet immédiat).</p>')
        ].join('\n')
      },
      {
        title: 'L\'abrogation',
        html: [
          '<p>L\'<strong>abrogation</strong> est l\'anéantissement pour l\'avenir des effets d\'une loi : ' +
          'elle met fin à sa force obligatoire. Deux formes :</p>',
          '<ul>\n' +
          '    <li><strong>Abrogation expresse</strong> : le texte nouveau l\'énonce — « sont abrogées les dispositions de la loi du… ».</li>\n' +
          '    <li><strong>Abrogation tacite (implicite)</strong> : le texte nouveau contient une disposition incompatible avec l\'ancienne, sans la citer.</li>\n' +
          '  </ul>',
          '<p>Une disposition abrogée cesse de fonder une décision : le juge ne peut plus l\'appliquer, même ' +
          'si le texte reste physiquement dans le code tant qu\'il n\'est pas refondu. D\'où l\'importance, ' +
          'pour l\'analyste comme pour le développeur de logiciels juridiques, de suivre l\'état du texte : ' +
          'en vigueur, abrogé expressément, abrogé tacitement.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Jour franc ≠ jour de promulgation : le délai court à partir de la <strong>parution au journal officiel</strong>.</li>\n' +
            '      <li>La non-rétroactivité ne fige pas tout : les situations <strong>en cours</strong> passent sous la loi nouvelle.</li>\n' +
            '      <li>Abrogation ≠ nullité : l\'une retire la force obligatoire d\'un texte, l\'autre sanctionne un acte juridique.</li>\n' +
            '      <li>L\'abrogation ne vaut que pour l\'avenir : les effets passés produits régulièrement restent acquis.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le jour franc court à partir de…', opts: ['du vote de la loi', 'de la promulgation', 'de la parution au journal officiel'], correct: 2, exp: '24 h consécutives après la parution, puis la loi entre en vigueur.' },
      { q: '« Nul n\'est censé ignorer la loi » vaut…', opts: ['dès le vote', 'après le jour franc', 'jamais'], correct: 1, exp: 'Après l\'écoulement du jour franc, chacun est réputé connaître la loi.' },
      { q: 'La loi nouvelle s\'applique…', opts: ['à tout le passé', 'aux situations éteintes avant elle', 'aux situations en cours et aux situations nouvelles'], correct: 2, exp: 'Effet immédiat ; les situations éteintes restent sous l\'ancienne loi.' },
      { q: '« La loi ne dispose que pour l\'avenir » est…', opts: ['l\'article 2 du code civil', 'un règlement européen', 'une coutume'], correct: 0, exp: 'Fondement de la non-rétroactivité.' },
      { q: 'L\'abrogation expresse est…', opts: ['énoncée par le texte nouveau', 'déduite d\'une incompatibilité', 'décidée par le juge'], correct: 0, exp: 'Le texte nouveau la déclare ; sinon, l\'incompatibilité crée l\'abrogation tacite.' },
      { q: 'L\'abrogation tacite résulte de…', opts: ['du silence du journal officiel', 'l\'introduction d\'une disposition incompatible avec l\'ancienne', 'd\'un référendum'], correct: 1, exp: 'Aucune déclaration : l\'incompatibilité suffit.' },
      { q: 'Une loi abrogée avant un litige…', opts: ['peut encore être appliquée', 'ne fonde plus la décision', 'revient automatiquement'], correct: 1, exp: 'Sa force obligatoire a cessé : le juge applique le droit en vigueur.' },
      { q: 'L\'application dans l\'espace pose…', opts: ['le même problème que dans le temps', 'peu de problèmes : la loi s\'applique sur le territoire national', 'des conflits de frontières quotidiens'], correct: 1, exp: 'Le vrai champ de difficultés est l\'application dans le temps.' }
    ],

    pitfalls: [
      'Faire courir le jour franc depuis la promulgation : il court depuis la parution.',
      'Rendre la loi nouvelle applicable aux situations éteintes : non-rétroactivité.',
      'Confondre abrogation (texte) et nullité (acte juridique).',
      'Oublier l\'abrogation tacite : une incompatibilité suffit, sans déclaration.'
    ],

    methodTitle: 'Méthode — statuer sur une situation dans le temps',
    method: [
      'Dater l\'entrée en vigueur de la loi nouvelle : parution + jour franc.',
      'La situation est-elle éteinte avant cette date ? → loi ancienne.',
      'Sinon (en cours ou née après) ? → loi nouvelle, effet immédiat.',
      'Le texte applicable a-t-il été abrogé ? expresse (énoncée) ou tacite (incompatible) — sinon il reste appliquable.'
    ],

    summary: [
      'Entrée en vigueur : publication au journal officiel, puis jour franc (24 h).',
      'Non-rétroactivité : la loi nouvelle épargne les situations éteintes avant elle.',
      'Effet immédiat : elle régit les situations nées après et les situations en cours.',
      'Abrogation : expresse (énoncée) ou tacite (incompatibilité) — elle met fin à la force obligatoire pour l\'avenir.'
    ],

    checklist: [
      'Je sais calculer une date de vigueur avec le jour franc.',
      'Je sais statuer sur trois situations : éteinte, en cours, nouvelle.',
      'Je sais reconnaître une abrogation expresse et une tacite.',
      'Je sais expliquer « nul n\'est censé ignorer la loi ».'
    ],

    notions: [
      '<strong>Publication</strong> : insertion au journal officiel.',
      '<strong>Jour franc</strong> : 24 h après la parution avant vigueur.',
      '<strong>Non-rétroactivité</strong> : la loi ne touche pas les situations éteintes.',
      '<strong>Effet immédiat</strong> : application aux situations nouvelles et en cours.',
      '<strong>Abrogation expresse</strong> : énoncée par le texte nouveau.',
      '<strong>Abrogation tacite</strong> : résulte d\'une incompatibilité.',
      '<strong>Situation juridique</strong> : rapport de droit né à une date, avec effets.',
      '<strong>Force obligatoire</strong> : caractère contraignant de la loi tant qu\'elle n\'est pas abrogée.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends jour franc, non-rétroactivité et abrogation.' },
      { cls: 'mid', text: '50–69 % — refais les trois situations types (éteinte, en cours, nouvelle).' },
      { cls: 'good', text: '70–89 % — bon niveau, cible les abrogations expresses et tacites.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Comment une loi entre-t-elle en vigueur ?', a: 'Publication au journal officiel, puis jour franc : 24 h après la parution ; ensuite nul n\'est censé l\'ignorer.' },
      { q: 'La règle de l\'article 2 du code civil ?', a: '« La loi ne dispose que pour l\'avenir ; elle n\'a point d\'effet rétroactif. »' },
      { q: 'Effet immédiat de la loi nouvelle ?', a: 'Elle s\'applique aux situations créées après son entrée en vigueur et aux situations en cours ; seules les situations éteintes restent sous l\'ancienne loi.' },
      { q: 'Abrogation expresse vs tacite ?', a: 'Expresse : le texte nouveau le déclare. Tacite : une disposition incompatible avec l\'ancienne suffira, sans déclaration.' },
      { q: 'Que produit l\'abrogation ?', a: 'L\'anéantissement pour l\'avenir des effets de la loi : fin de sa force obligatoire ; les effets passés régulièrement produits restent acquis.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Contrats et obligations',
    short: 'Contrats et obligations',
    toc: 'Conditions de validité du contrat ; vices du consentement ; inexécution, force majeure, responsabilité.',
    time: '≈ 2 h de travail',

    situation:
      'Un contrat de vente est signé, puis l\'acheteur découvre que le vendeur a caché un défaut ; une ' +
      'livraison échoue à cause d\'une inondation ; un accident de la route ouvre un litige entre inconnus. ' +
      'Trois chemins mènent à la même question : que doit, ou ne doit plus, le débiteur ?',

    objectives: [
      'vérifier les quatre conditions de validité d\'un contrat ;',
      'détecter les vices du consentement et leur sanction (nullité relative) ;',
      'statuer sur l\'inexécution : exécution forcée, dommages-intérêts, force majeure ;',
      'distinguer responsabilité contractuelle et responsabilité délictuelle.'
    ],

    sections: [
      {
        title: 'Validité du contrat et vices du consentement',
        html: [
          '<p>Le contrat repose sur quatre conditions de validité : la <strong>capacité</strong> des parties ' +
          '(disposer de la personnalité juridique et de la capacité d\'exercice), le <strong>consentement</strong> ' +
          'libre et éclairé, un <strong>objet</strong> certain et licite, une <strong>cause</strong> licite. ' +
          'Une condition manquante expose le contrat à la nullité.</p>',
          '<p>Le consentement peut être vicié par l\'<strong>erreur</strong> (croyance fausse), le ' +
          '<strong>dol</strong> (manœuvres frauduleuses destinées à tromper) et la <strong>violence</strong> ' +
          '(contrainte physique ou morale). Ces trois vices emportent <strong>nullité relative</strong> : ' +
          'seule la victime peut agir, le contrat est anéanti pour la protéger — pas au nom de l\'ordre ' +
          'public. La <strong>lésion</strong> (déséquilibre excessif des prestations) n\'est sanctionnée ' +
          'que dans les cas prévus par la loi.</p>',
          '<p>Le lien avec le chapitre 4 : sans <strong>personnalité juridique</strong>, pas de capacité ; ' +
          'sans capacité, pas de contrat valable. C\'est la chaîne personnalité → capacité → contrat.</p>',
          box('mnemo', 'Mnémotechnique — « C-C-O-C : capacité, consentement, objet, cause »', 'pin',
            '    <p>Quatre cases à cocher avant de signer. Et pour le consentement : erreur, dol, violence ' +
            'font trembler la main — la lésion, elle, ne sanctionne que si la loi le dit.</p>')
        ].join('\n')
      },
      {
        title: 'Inexécution et responsabilités',
        html: [
          '<p>Le contrat une fois formé lie les parties : l\'<strong>inexécution</strong> ouvre des voies de ' +
          'recours. Le créancier peut demander l\'<strong>exécution forcée</strong> (le débiteur fait ce qui ' +
          'était promis) et/ou des <strong>dommages-intérêts</strong> pour le préjudice subi.</p>',
          '<p>La <strong>force majeure</strong> libère le débiteur : événement imprévisible, irrésistible et ' +
          'extérieur (inondation, séisme) qui rend l\'exécution impossible. Pas de faute, pas de ' +
          'condamnation : le débiteur est <strong>dispensé</strong>.</p>',
          '<p>Enfin, la <strong>responsabilité délictuelle</strong> répare le dommage causé à autrui sans ' +
          'contrat (accident de la circulation, trouble de voisinage) : pas de seuil contractuel, la faute ' +
          'ou le fait générateur suffit — des dommages-intérêts réparent la victime. À l\'inverse, la ' +
          '<strong>responsabilité contractuelle</strong> naît d\'une obligation née du contrat entre les ' +
          'parties.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Nullité relative (vices du consentement) ≠ nullité absolue (objet ou cause illicites) : la première protège la victime, la seconde l\'ordre public.</li>\n' +
            '      <li>La lésion n\'annule pas automatiquement : seulement dans les cas prévus par la loi.</li>\n' +
            '      <li>Force majeure = imprévisible + irrésistible + extérieur : une simple difficulté ne suffit pas.</li>\n' +
            '      <li>Pas de contrat entre les parties ? → responsabilité délictuelle, pas contractuelle.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Les quatre conditions de validité du contrat sont…', opts: ['capacité, consentement, objet, cause', 'date, lieu, signature, témoin', 'offre, demande, prix, livraison'], correct: 0, exp: 'C-C-O-C : capacité, consentement, objet, cause.' },
      { q: 'Le dol est…', opts: ['une erreur de calcul', 'des manœuvres frauduleuses destinées à tromper', 'un accident'], correct: 1, exp: 'Vice du consentement : manœuvre frauduleuse ; sanction : nullité relative.' },
      { q: 'Les vices du consentement emportent…', opts: ['la nullité absolue', 'la nullité relative', 'une simple amende'], correct: 1, exp: 'Seule la victime peut agir : le contrat est anéanti pour la protéger.' },
      { q: 'La lésion…', opts: ['annule toujours le contrat', 'n\'est sanctionnée que dans les cas prévus par la loi', 'est un vice de capacité'], correct: 1, exp: 'Déséquilibre excessif : sanction légale, cas par cas.' },
      { q: 'La force majeure libère le débiteur si l\'événement est…', opts: ['annoncé à la télévision', 'imprévisible, irrésistible et extérieur', 'fiscal'], correct: 1, exp: 'Trois critères cumulatifs : sinon, pas de dispense.' },
      { q: 'Si le dommage est modéré, le créancier peut surtout demander…', opts: ['l\'emprisonnement du débiteur', 'l\'exécution forcée', 'la révision de la Constitution'], correct: 1, exp: 'Exécution forcée et/ou dommages-intérêts selon le préjudice.' },
      { q: 'Un accident entre deux inconnus relève de la responsabilité…', opts: ['contractuelle', 'délictuelle', 'disciplinaire'], correct: 1, exp: 'Aucun contrat entre les parties : responsabilité délictuelle.' },
      { q: 'Sans personnalité juridique, une partie…', opts: ['peut contracter librement', 'manque de capacité, le contrat est exposé à la nullité', 'devient personne morale'], correct: 1, exp: 'Chaîne : personnalité → capacité → contrat.' }
    ],

    pitfalls: [
      'Inverser nullité relative et absolue : les vices du consentement sont relatifs.',
      'Annuler un contrat lésionnaire sans texte : la lésion exige une loi.',
      'Accorder la force majeure pour une simple difficulté économique : les trois critères manquent.',
      'Chercher un contrat là où il n\'y en a pas : la responsabilité délictuelle prend le relais.'
    ],

    methodTitle: 'Méthode — résoudre un litige contractuel',
    method: [
      'Le contrat est-il valable ? vérifier capacité, consentement, objet, cause.',
      'Un vice du consentement ? erreur, dol, violence → nullité relative ; lésion → selon la loi.',
      'Inexécution ? exécution forcée et/ou dommages-intérêts ; force majeure → dispense.',
      'Aucun contrat ? passer à la responsabilité délictuelle.'
    ],

    summary: [
      'Validité : capacité, consentement, objet, cause — une condition manquante menace le contrat.',
      'Vices du consentement (erreur, dol, violence) : nullité relative ; lésion : selon la loi.',
      'Inexécution : exécution forcée et dommages-intérêts ; force majeure (imprévisible, irrésistible, extérieur) : dispense.',
      'Responsabilité contractuelle (entre parties) ≠ délictuelle (dommage causé à autrui sans contrat).'
    ],

    checklist: [
      'Je sais cocher les quatre conditions de validité sur un cas concret.',
      'Je sais nommer les trois vices du consentement et leur sanction.',
      'Je sais statuer entre exécution forcée, dommages et dispense.',
      'Je sais dire quand la responsabilité est délictuelle plutôt que contractuelle.'
    ],

    notions: [
      '<strong>Capacité</strong> : aptitude à contracter (personnalité + exercice).',
      '<strong>Consentement</strong> : accord libre et éclairé des parties.',
      '<strong>Erreur, dol, violence</strong> : vices du consentement.',
      '<strong>Nullité relative</strong> : sanction protectrice, action de la victime.',
      '<strong>Lésion</strong> : déséquilibre excessif, sanctionnée selon la loi.',
      '<strong>Exécution forcée</strong> : contraindre le débiteur à exécuter.',
      '<strong>Force majeure</strong> : imprévisible, irrésistible, extérieur — libère.',
      '<strong>Responsabilité délictuelle</strong> : réparer le dommage causé sans contrat.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends les quatre conditions et les trois vices.' },
      { cls: 'mid', text: '50–69 % — refais le classement nullité relative / selon la loi / libre.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible force majeure et responsabilités.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les quatre conditions de validité ?', a: 'Capacité, consentement, objet certain et licite, cause licite.' },
      { q: 'Les trois vices du consentement ?', a: 'Erreur (croyance fausse), dol (manœuvres frauduleuses), violence (contrainte) : nullité relative.' },
      { q: 'La lésion, quand sanctionne-t-elle ?', a: 'Seulement dans les cas prévus par la loi : déséquilibre excessif des prestations.' },
      { q: 'Les trois critères de la force majeure ?', a: 'Imprévisible, irrésistible, extérieur : le débiteur est dispensé de son obligation.' },
      { q: 'Contractuelle ou délictuelle ?', a: 'Contractuelle : obligation née d\'un contrat entre les parties. Délictuelle : dommage causé à autrui sans contrat.' }
    ]
  }
];
