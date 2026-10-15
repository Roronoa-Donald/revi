/**
 * Chapitres 1 à 3 du cours de Modélisation (MERISE) B1.
 *
 * Chapitre 1 : le système d'information et l'entreprise.
 * Chapitre 2 : la méthode MERISE — niveaux et étapes.
 * Chapitre 3 : dictionnaire de données et dépendances fonctionnelles.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code (trois
 * exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-merise.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Le système d\'information et l\'entreprise',
    short: 'Système d\'information',
    toc: 'Donnée, information, connaissance ; l\'entreprise en trois sous-systèmes ; les domaines de l\'information.',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'Un gérant manipule des chiffres toute la journée : 30545454, 12000, « bleu ». Rien de tout cela ne le ' +
      'fait décider tant que personne n\'a expliqué ce que ces valeurs représentent. Le chapitre 1 sépare ' +
      'la matière première (les données) du sens (les informations), puis montre où tout cela circule : ' +
      'dans l\'entreprise, entre trois sous-systèmes qui se parlent sans se confondre.',

    objectives: [
      'distinguer donnée, information et connaissance avec des exemples précis ;',
      'décrire l\'entreprise comme un système ouvert, finalisé et régulé ;',
      'situer le système de décision, le système opérant et le système d\'information ;',
      'classer une information par domaine de gestion (économique, juridique, technique, commercial).'
    ],

    sections: [
      {
        title: 'Donnée, information, connaissance',
        html: [
          '<p>Le mot « informer » vient du latin <em>informare</em> : donner une forme. La <strong>donnée</strong> ' +
          'est un élément brut — un mot, un son, un chiffre — accepté comme base d\'un raisonnement. Elle ne ' +
          'veut rien dire seule : « bleu » ne décrit rien tant qu\'on ne sait pas de quoi on parle. La ' +
          '<strong>information</strong> naît de la structuration des données pour répondre à un besoin ' +
          'précis : « bleu du ciel » renseigne. La <strong>connaissance</strong> est l\'usage intelligent de ' +
          'l\'information : décider d\'attendre ou non qu\'il pleuve.</p>',
          '<p>La chaîne à retenir :</p>',
          '<pre><code>donnée + traitement + contexte = information\n',
          'information + raisonnement     = connaissance</code></pre>',
          '<p>Les traitements qui transforment la donnée en information : <strong>collecter</strong> (trouver), ' +
          '<strong>saisir</strong> (fixer sur un support), <strong>stocker</strong>, <strong>traiter</strong> ' +
          '(sélectionner, calculer, trier), puis mettre en forme, éditer, diffuser. L\'information couvre des ' +
          'domaines variés : économique (conjoncture), juridique (lois, règlements), technique (matériels, ' +
          'processus), commercial (marché, concurrence, clientèle).</p>',
          box('mnemo', 'Mnémotechnique — « la matière et le sens »', 'pin',
            '    <p>La donnée est la <strong>matière première</strong> ; l\'information est la matière ' +
            '<strong>interprétée</strong>. En examen, si l\'énoncé dit « un renseignement qui apporte une ' +
            'connaissance sur un objet », c\'est une information ; si c\'est « un élément de base, brut », ' +
            'c\'est une donnée.</p>')
        ].join('\n')
      },
      {
        title: 'L\'entreprise, un système',
        html: [
          '<p>D\'après Joël de Rosnay, un système est un « ensemble d\'éléments en interaction dynamique, ' +
          'organisés en fonction d\'un but ». L\'entreprise est un système : <strong>organisé</strong> (une ' +
          'structure coordonne les éléments), <strong>finalisé</strong> (profit, croissance), ' +
          '<strong>ouvert</strong> (en relation avec son environnement économique, juridique, technique), ' +
          '<strong>dynamique</strong> (en évolution constante) et <strong>régulé</strong> (des décisions ' +
          'hiérarchisées corrigent le tir).</p>',
          '<p>Trois sous-systèmes la composent et se parlent en permanence :</p>',
          '<table>\n' +
          '    <tr><th>Sous-système</th><th>Rôle</th><th>Exemple de flux</th></tr>\n' +
          '    <tr><td>Système de décision (pilotage)</td><td>analyse, assigne les objectifs, contrôle</td><td>objectifs, budgets, contrôles</td></tr>\n' +
          '    <tr><td>Système opérant</td><td>réalise la production de biens et services</td><td>assemblage, fabrication, ventes</td></tr>\n' +
          '    <tr><td>Système d\'information</td><td>mémorise, traite, transmet les informations</td><td>commandes, stocks, factures</td></tr>\n' +
          '  </table>',
          '<p>Le système d\'information est le <strong>membrane</strong> entre les deux autres : il reçoit les ' +
          'événements du monde extérieur et de la production, les transforme en informations, et les met à ' +
          'disposition de la décision. C\'est lui que la méthode MERISE modélise.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Donnée ≠ information : un numéro de téléphone n\'est pas encore un « contact à relancer ».</li>\n' +
            '      <li>Le système d\'information ne décide pas et ne produit pas : il <strong>mémorise et transmet</strong>.</li>\n' +
            '      <li>« Ouvert » ne veut pas dire « public » : l\'entreprise échange avec son environnement, elle n\'est pas transparente.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: '« 30545454 » sans contexte, c\'est…', opts: ['une information', 'une donnée', 'une connaissance'], correct: 1, exp: 'Un chiffre brut est une donnée ; il devient information quand on sait qu\'il s\'agit d\'un numéro de client à rappeler.' },
      { q: 'La chaîne correcte est…', opts: ['donnée + traitement + contexte = information', 'information + traitement = donnée', 'connaissance + contexte = information'], correct: 0, exp: 'La donnée est travaillée (collecte, saisie, stockage, traitement) et mise en contexte pour devenir information.' },
      { q: 'Le système de décision…', opts: ['assemble les produits', 'mémorise les factures', 'assigne les objectifs et contrôle'], correct: 2, exp: 'Il analyse l\'environnement et le fonctionnement interne, assigne les objectifs, contrôle le travail de l\'opérant.' },
      { q: 'Le système opérant…', opts: ['produit les biens et services', 'stocke les commandes', 'édite les budgets'], correct: 0, exp: 'C\'est la production physique de flux de biens et services.' },
      { q: 'Le système d\'information…', opts: ['décide à la place du gérant', 'mémorise, traite et transmet', 'fabrique les produits'], correct: 1, exp: 'Il mémorise des informations internes et externes, les traite et les transmet aux autres sous-systèmes.' },
      { q: 'Une loi nouvelle qui contraint l\'entreprise est une information…', opts: ['technique', 'juridique', 'commerciale'], correct: 1, exp: 'Les lois, directives et règlements relèvent du domaine juridique.' },
      { q: '« L\'entreprise est un système ouvert » signifie…', opts: ['tout le monde peut y entrer', 'elle est en relation avec son environnement', 'elle n\'a pas de frontière juridique'], correct: 1, exp: 'Ouvert = en relation avec l\'environnement économique, juridique, technique ; pas « public ».' },
      { q: '« L\'entreprise est régulée » signifie…', opts: ['des décisions hiérarchisées corrigent le fonctionnement', 'elle produit sans arrêt', 'elle change de nom souvent'], correct: 0, exp: 'La régulation : un groupe organisé et hiérarchisé prend les décisions correctives.' }
    ],

    pitfalls: [
      'Confondre donnée et information : le sens vient de l\'interprétation, pas du support.',
      'Placer la décision dans le système d\'information : il éclaire la décision, il ne la prend pas.',
      'Oublier que l\'entreprise est un système ouvert : ses flux dépendent de l\'environnement.',
      'Réduire l\'information au seul domaine commercial : économique, juridique et technique existent aussi.'
    ],

    methodTitle: 'Méthode — classer en trois questions',
    method: [
      'La valeur a-t-elle du sens seule ? Non : donnée. Oui, dans un contexte d\'usage : information.',
      'À quel sous-système le flux parle-t-il ? Piloter (décision), produire (opérant), mémoriser/transmettre (SI).',
      'À quel domaine l\'information appartient-elle ? Économique, juridique, technique ou commercial.'
    ],

    summary: [
      'Donnée + traitement + contexte = information ; information + raisonnement = connaissance.',
      'L\'entreprise est un système organisé, finalisé, ouvert, dynamique et régulé.',
      'Trois sous-systèmes : décision (piloter), opérant (produire), information (mémoriser et transmettre).',
      'L\'information couvre les domaines économique, juridique, technique et commercial.'
    ],

    checklist: [
      'Je sais donner trois exemples de données qui deviennent des informations.',
      'Je sais dessiner les trois sous-systèmes et deux flux entre chacun.',
      'Je sais classer dix informations par domaine sans hésiter.',
      'Je sais expliquer pourquoi le SI ne décide pas.'
    ],

    notions: [
      '<strong>Donnée</strong> : élément brut, sans sens intrinsèque.',
      '<strong>Information</strong> : donnée structurée et interprétée dans un contexte.',
      '<strong>Connaissance</strong> : usage raisonné de l\'information.',
      '<strong>Système de décision</strong> : pilotage, objectifs, contrôles.',
      '<strong>Système opérant</strong> : production physique.',
      '<strong>Système d\'information</strong> : mémorisation, traitement, transmission.',
      '<strong>Système ouvert</strong> : en relation avec son environnement.',
      '<strong>Domaines de l\'information</strong> : économique, juridique, technique, commercial.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends les définitions et le tableau des sous-systèmes.' },
      { cls: 'mid', text: '50–69 % — refais le classement donnée/information sur tes propres exemples.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible les flux entre sous-systèmes.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Donnée vs information ?', a: 'La donnée est brute (un chiffre, un mot) ; l\'information est une donnée structurée et interprétée dans un contexte d\'usage.' },
      { q: 'La chaîne complète ?', a: 'donnée + traitement + contexte = information ; information + raisonnement = connaissance.' },
      { q: 'Les trois sous-systèmes de l\'entreprise ?', a: 'Système de décision (piloter), système opérant (produire), système d\'information (mémoriser, traiter, transmettre).' },
      { q: 'Les cinq caractères du système-entreprise ?', a: 'Organisé, finalisé, ouvert, dynamique, régulé.' },
      { q: 'Quatre domaines de l\'information ?', a: 'Économique (conjoncture), juridique (lois), technique (matériels, processus), commercial (marché, concurrence).' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'La méthode MERISE : niveaux et étapes',
    short: 'Méthode MERISE',
    toc: 'Double démarche par niveaux et par étapes ; les modèles MCD/MLD/MPD et MCT/MOT/MOpT ; données contre traitements.',
    time: '≈ 2 h de travail',

    situation:
      'Un projet part dans tous les sens : le développeur crée des tables avant de savoir ce qu\'il modélise, ' +
      'le client change les règles chaque semaine. MERISE impose un ordre : comprendre le métier ' +
      '(conceptuel), organiser (logique/organisationnel), réaliser (physique) — et séparer ce qui est ' +
      'enregistré (données) de ce qui est fait (traitements).',

    objectives: [
      'énoncer la double démarche de MERISE : par niveaux et par étapes ;',
      'associer chaque modèle (MCD, MLD, MPD, MCT, MOT, MOpT) à son niveau et à sa question ;',
      'justifier la séparation données/traitements par l\'exemple du taux de TVA ;',
      'remettre dans l\'ordre les étapes d\'un projet informatique.'
    ],

    sections: [
      {
        title: 'La double démarche et les six modèles',
        html: [
          '<p>MERISE est une méthode d\'analyse et de conception des systèmes d\'information. Elle se ' +
          'caractérise par une <strong>double démarche</strong> : par <strong>niveaux</strong> (conceptuel, ' +
          'logique/organisationnel, physique) et par <strong>étapes</strong> (cycle de vie du projet). ' +
          'L\'analyse des données donne une vision <strong>statique</strong> ; l\'analyse des traitements, ' +
          'une vision <strong>dynamique</strong>.</p>',
          '<pre><code>              DONNEES              TRAITEMENTS\n',
          'conceptuel    MCD (quoi ?)         MCT (quoi ?)\n',
          'logique       MLD (comment organiser ?)   MOT (comment organiser ?)\n',
          'physique      MPD (comment realiser ?)    MOpT (comment realiser ?)</code></pre>',
          '<p>Au niveau <strong>conceptuel</strong>, on décrit le système indépendamment de tout outil : ' +
          'quoi ? Au niveau <strong>logique/organisationnel</strong>, on adapte aux contraintes techniques et ' +
          'd\'organisation : qui fait quoi, quand, avec quel outil ? Au niveau <strong>physique</strong>, on ' +
          'sort de l\'analyse : fichiers, bases de données, programmes.</p>',
          box('mnemo', 'Mnémotechnique — « C-L-P : quoi, comment organiser, comment réaliser »', 'pin',
            '    <p>Conceptuel = <strong>quoi</strong> (le métier). Logique/organisationnel = <strong>comment ' +
            'organiser</strong> (l\'adaptation). Physique = <strong>comment réaliser</strong> (l\'implémentation). ' +
            'Six modèles : trois pour les données (MCD, MLD, MPD), trois pour les traitements (MCT, MOT, MOpT).</p>')
        ].join('\n')
      },
      {
        title: 'Séparer données et traitements',
        html: [
          '<p>La séparation entre données et traitements assure <strong>cohérence</strong> (le système est ' +
          'étudié dans sa globalité) et <strong>pérennité</strong> (un nouveau besoin de traitement ne ' +
          'remet pas en cause l\'organisation des données).</p>',
          '<p>L\'exemple du support : pour calculer un prix TTC, il faut le taux de TVA. Si ce taux est ' +
          'mémorisé dans le <strong>programme</strong> (traitement), tout changement de taux impose de ' +
          'modifier le programme. Si le taux est une <strong>donnée</strong> mémorisée dans le système ' +
          'd\'information, il suffit de mettre à jour la donnée : les programmes restent. Une analyse des ' +
          'données avisée mémorise le taux sans tenir compte des traitements.</p>',
          '<p>La démarche va du <strong>théorique vers la pratique</strong> : d\'abord un modèle idéal ' +
          '(conceptuel), puis l\'adaptation aux contraintes (environnement disponible, temps de réponse, ' +
          'espace de stockage), enfin la mise en place effective. Chaque niveau produit des documents qui ' +
          'soutiennent la concertation entre acteurs du projet — c\'est l\'un des rôles majeurs de la méthode.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Le MCD répond à « quoi ? » : jamais de choix technique à ce niveau.</li>\n' +
            '      <li>MLD est au niveau <strong>logique</strong> : ne pas le confondre avec le MPD (physique).</li>\n' +
            '      <li>Le taux de TVA est une <strong>donnée</strong>, pas un traitement codé en dur.</li>\n' +
            '      <li>La démarche par étapes complète la démarche par niveaux : les deux coexistent.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'MERISE se caractérise par…', opts: ['une démarche unique par essais-erreurs', 'une double démarche par niveaux et par étapes', 'une démarche uniquement physique'], correct: 1, exp: 'Par niveaux (conceptuel, logique, physique) et par étapes (cycle de vie du projet).' },
      { q: 'Au niveau conceptuel, on répond à…', opts: ['comment réaliser ?', 'comment organiser ?', 'quoi ?'], correct: 2, exp: 'Le conceptuel décrit le système indépendamment de toute contrainte technique.' },
      { q: 'Le MLD appartient au niveau…', opts: ['conceptuel', 'logique/organisationnel', 'physique'], correct: 1, exp: 'Le MLD organise le stockage : c\'est la forme machinale du MCD, niveau logique.' },
      { q: 'Le MCT décrit…', opts: ['les traitements fondamentaux, sans organisation', 'les programmes', 'les tables SQL'], correct: 0, exp: 'Le MCT représente les règles de traitement fondamentales et leurs enchaînements.' },
      { q: 'Le MOpT appartient au niveau…', opts: ['physique', 'logique', 'conceptuel'], correct: 0, exp: 'Le MOpT (opérationnel) décrit comment réaliser les traitements : niveau physique.' },
      { q: 'Si le taux de TVA est codé dans le programme…', opts: ['rien ne change quand le taux bouge', 'le programme doit être modifié à chaque changement', 'les données deviennent inutiles'], correct: 1, exp: 'Traitement codé en dur = réécriture à chaque changement ; donnée mémorisée = simple mise à jour.' },
      { q: 'La séparation données/traitements garantit…', opts: ['cohérence et pérennité', 'rapidité et prix', 'sécurité et mot de passe'], correct: 0, exp: 'Cohérence (étude globale) et pérennité (les traitements évoluent sans casser les données).' },
      { q: 'La démarche par niveaux part…', opts: ['du pratique vers le théorique', 'du théorique vers la pratique', 'du hasard'], correct: 1, exp: 'Modèle idéal au conceptuel, adaptation au logique, mise en place au physique.' }
    ],

    pitfalls: [
      'Placer le MLD au niveau conceptuel : le MCD décrit, le MLD organise.',
      'Mettre le taux de TVA dans les traitements : c\'est une donnée, la pérennité l\'exige.',
      'Confondre vision statique (données) et vision dynamique (traitements).',
      'Réduire MERISE au seul MCD : la méthode couvre six modèles et un cycle de projet.'
    ],

    methodTitle: 'Méthode — placer un modèle en trois gestes',
    method: [
      'Le modèle parle de données (M*D) ou de traitements (M*T) ?',
      'Sa question est quoi, comment organiser ou comment réaliser ? Le niveau en découle.',
      'Vérifier la cohérence : « comment réaliser » ne peut pas être conceptuel.'
    ],

    summary: [
      'MERISE : double démarche, par niveaux (conceptuel, logique/organisationnel, physique) et par étapes.',
      'Données : MCD, MLD, MPD. Traitements : MCT, MOT, MOpT.',
      'Conceptuel = quoi ; logique = comment organiser ; physique = comment réaliser.',
      'La séparation données/traitements assure cohérence et pérennité (exemple du taux de TVA).'
    ],

    checklist: [
      'Je sais réciter les six modèles avec leur niveau et leur question.',
      'Je sais expliquer l\'exemple TVA avec mes propres mots.',
      'Je sais ordonner les étapes d\'un projet MERISE.',
      'Je sais dire quelle vision (statique ou dynamique) chaque analyse donne.'
    ],

    notions: [
      '<strong>MERISE</strong> : méthode d\'analyse et de conception des SI.',
      '<strong>Niveau conceptuel</strong> : le quoi, sans contrainte technique.',
      '<strong>Niveau logique/organisationnel</strong> : l\'adaptation aux contraintes.',
      '<strong>Niveau physique</strong> : la réalisation effective.',
      '<strong>MCD/MLD/MPD</strong> : les trois modèles de données.',
      '<strong>MCT/MOT/MOpT</strong> : les trois modèles de traitements.',
      '<strong>Cohérence</strong> : le système étudié dans sa globalité.',
      '<strong>Pérennité</strong> : les traitements évoluent sans invalider les données.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends le tableau des six modèles.' },
      { cls: 'mid', text: '50–69 % — refais le classement modèle/niveau sur des exemples neufs.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible l\'argumentation TVA.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'La double démarche de MERISE ?', a: 'Par niveaux (conceptuel, logique/organisationnel, physique) et par étapes (cycle de vie du projet).' },
      { q: 'MCD, MLD, MPD : leurs questions ?', a: 'MCD : quelles données et quels liens ? MLD : comment organiser le stockage ? MPD : comment stocker effectivement ?' },
      { q: 'MCT, MOT, MOpT : leurs questions ?', a: 'MCT : quels traitements ? MOT : comment les organiser ? MOpT : comment les réaliser ?' },
      { q: 'Pourquoi le taux de TVA est-il une donnée ?', a: 'Pour qu\'un changement de taux ne force pas à réécrire le programme : la donnée se met à jour, les traitements restent (pérennité).' },
      { q: 'Que sépare la méthode ?', a: 'L\'analyse des données (vision statique) et l\'analyse des traitements (vision dynamique).' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Dictionnaire de données et dépendances fonctionnelles',
    short: 'Dictionnaire et DF',
    toc: 'Recenser les propriétés (élémentaires, composées, calculées) ; écrire les règles de gestion ; construire la matrice des DF.',
    time: '≈ 2 h de travail',

    situation:
      'Le client raconte son activité en vrac : factures, clients, remises, catégories. Avant tout schéma, ' +
      'l\'analyste recense les propriétés une à une (le dictionnaire de données) et écrit ce qui détermine ' +
      'quoi (les dépendances fonctionnelles). Ces deux documents préparent le MCD — et évitent les ' +
      'propriétés fantômes inventées plus tard.',

    objectives: [
      'classer une propriété en élémentaire, composée ou calculée ;',
      'constituer un dictionnaire de données propre (types, formats, remarques) ;',
      'formuler une dépendance fonctionnelle « source détermine cible » à partir d\'une règle de gestion ;',
      'construire la matrice des dépendances et en déduire l\'identifiant d\'une entité.'
    ],

    sections: [
      {
        title: 'Le dictionnaire de données',
        html: [
          '<p>Le dictionnaire de données recense et décrit l\'ensemble des <strong>propriétés</strong> qui ' +
          'serviront à élaborer le MCD : nom, type (texte, nombre, date), format, nature, remarques. Une ' +
          'propriété est :</p>',
          '<ul>\n' +
          '    <li><strong>élémentaire</strong> : elle ne se déduit d\'aucune autre ;</li>\n' +
          '    <li><strong>composée</strong> : sa valeur résulte d\'une règle de construction sur d\'autres informations (une adresse = numéro, rue, ville) ;</li>\n' +
          '    <li><strong>calculée</strong> : elle se déduit d\'une autre propriété par une règle de calcul (le TTC depuis le HT et la TVA).</li>\n' +
          '  </ul>',
          '<p>Les propriétés calculées ne s\'enregistrent pas : elles se recalculent. Le dictionnaire les ' +
          'note, mais le MCD les écarte. Le recueil se fait en interviewant les acteurs et en étudiant les ' +
          'documents existants (factures, bons de livraison, registres) : chaque rubrique d\'un document est ' +
          'une propriété candidate.</p>',
          box('mnemo', 'Mnémotechnique — « E-C-C : élémentaire, composée, calculée »', 'pin',
            '    <p>Élémentaire = irremplaçable. Composée = assemblée (décomposable). Calculée = déductible. ' +
            'Seules les deux premières entrent dans le MCD ; la calculée retourne aux traitements.</p>')
        ].join('\n')
      },
      {
        title: 'Dépendances fonctionnelles et matrice',
        html: [
          '<p>Une <strong>dépendance fonctionnelle</strong> (DF) relie deux propriétés : « connaître la ' +
          'valeur de A suffit à connaître celle de B ». On écrit <code>A → B</code> : A détermine B. ' +
          'Exemple : NumClt → NomClt (le numéro de client détermine son nom) ; NumCde → DateCde.</p>',
          '<p>Les DF se tirent des <strong>règles de gestion</strong> énoncées par le client (« une facture ' +
          'concerne un et un seul client ») et se contrôlent sur les documents : une même source qui ' +
          'détermine deux cibles contradictoires révèle une erreur d\'analyse ou une propriété mal ' +
          'décomposée.</p>',
          '<p>La <strong>matrice des dépendances</strong> croise toutes les propriétés : pour chaque couple ' +
          '(ligne source, colonne cible), une croix si la DF existe. On y lit : les identifiants ' +
          'candidats (les sources qui déterminent le plus de propriétés), les propriétés élémentaires, et ' +
          'les associations éventuelles entre entités (une source qui détermine l\'identifiant d\'un autre ' +
          'groupe de propriétés signale une CIF, contrainte d\'intégrité fonctionnelle). Des symboles ' +
          'complètent la légende : association réflexive, DF élémentaire et directe, CIF.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Le TTC est calculé, donc <strong>écarter</strong> du dictionnaire des propriétés à modéliser.</li>\n' +
            '      <li>Une DF se vérifie sur des exemples : NumClt → VilleClt est suspecte si deux clients d\'une même ville… si, ça marche — mais VilleClt → NumClt est fausse.</li>\n' +
            '      <li>Le sens de la flèche compte : A → B ne dit rien de B → A.</li>\n' +
            '      <li>Une règle de gestion qui ne donne aucune DF est soit mal comprise, soit un simple commentaire.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le MontantTTC d\'une facture est une propriété…', opts: ['élémentaire', 'composée', 'calculée'], correct: 2, exp: 'Il se déduit du HT et de la TVA par une règle de calcul : le MCD ne le mémorise pas.' },
      { q: '« Adresse = numéro, rue, ville » : Adresse est…', opts: ['composée', 'calculée', 'élémentaire'], correct: 0, exp: 'Sa valeur est obtenue par une règle de construction sur d\'autres informations.' },
      { q: 'NumClt → NomClt se lit…', opts: ['le nom détermine le numéro', 'le numéro détermine le nom', 'les deux sont équivalents'], correct: 1, exp: 'A → B : connaître A suffit pour connaître B.' },
      { q: 'Le dictionnaire de données sert à…', opts: ['dessiner le MCD directement', 'recenser et décrire toutes les propriétés', 'écrire les programmes'], correct: 1, exp: 'Il recense et décrit l\'ensemble des propriétés utilisées pour élaborer le MCD.' },
      { q: 'La matrice des dépendances sert à…', opts: ['voir toutes les DF d\'un coup d\'œil et repérer les identifiants', 'compter les utilisateurs', 'dessiner les écrans'], correct: 0, exp: 'Croisement sources × cibles : on y lit identifiants candidats, propriétés élémentaires et CIF.' },
      { q: 'NumCde → NumClt (numéro de commande détermine le client) est…', opts: ['une CIF', 'une association réflexive', 'une erreur toujours'], correct: 0, exp: 'Une DF vers l\'identifiant d\'un autre groupe de propriétés est une contrainte d\'intégrité fonctionnelle.' },
      { q: 'Une propriété calculée dans une table…', opts: ['est recommandée', 'crée un risque d\'incohérence', 'est obligatoire en 3FN'], correct: 1, exp: 'Elle risque de contredire le recalcul ; on la calcule au moment du traitement.' },
      { q: 'À quoi reconnaît-on l\'identifiant dans la matrice ?', opts: ['il est la source de toutes les autres propriétés de l\'entité', 'il est en colonne', 'il apparaît deux fois'], correct: 0, exp: 'L\'identifiant détermine toutes les propriétés de son entité.' }
    ],

    pitfalls: [
      'Mémoriser une propriété calculée : le TTC se recalcule, il ne s\'enregistre pas.',
      'Inverser le sens d\'une DF dans la matrice : la source détermine la cible, jamais l\'inverse.',
      'Oublier de décomposer une adresse (numéro, rue, ville) : la propriété composée masque des attributs utiles.',
      'Écrire des DF sans règle de gestion derrière : une DF se justifie par un énoncé ou un document.'
    ],

    methodTitle: 'Méthode — du document au dictionnaire',
    method: [
      'Lister les rubriques de chaque document de l\'entreprise (facture, bon, registre).',
      'Pour chaque propriété : élémentaire, composée ou calculée ? Calculée = écartée.',
      'Énoncer les règles de gestion et les traduire en DF (source → cible).',
      'Construire la matrice, lire les identifiants candidats et les CIF.'
    ],

    summary: [
      'Le dictionnaire de données recense toutes les propriétés : nom, type, format, nature.',
      'Trois natures : élémentaire (à garder), composée (à décomposer), calculée (à écarter).',
      'Une DF « A → B » : connaître A suffit à connaître B ; elle se justifie par une règle de gestion.',
      'La matrice des dépendances révèle identifiants candidats et contraintes d\'intégrité fonctionnelle.'
    ],

    checklist: [
      'Je sais trier douze propriétés en élémentaires, composées et calculées.',
      'Je sais écrire cinq DF à partir de règles de gestion.',
      'Je sais lire une matrice des dépendances et proposer un identifiant.',
      'Je sais expliquer pourquoi le TTC ne s\'enregistre pas.'
    ],

    notions: [
      '<strong>Propriété</strong> : plus petit élément d\'information manipulable.',
      '<strong>Élémentaire</strong> : non déductible d\'autres propriétés.',
      '<strong>Composée</strong> : assemblée par une règle de construction.',
      '<strong>Calculée</strong> : déduite par une règle de calcul (à écarter).',
      '<strong>Dépendance fonctionnelle</strong> : A → B, connaître A suffit pour B.',
      '<strong>Dictionnaire de données</strong> : inventaire descriptif des propriétés.',
      '<strong>Matrice des dépendances</strong> : croisement sources × cibles des DF.',
      '<strong>CIF</strong> : contrainte d\'intégrité fonctionnelle entre deux entités.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends les trois natures de propriété.' },
      { cls: 'mid', text: '50–69 % — refais le dictionnaire d\'un document (facture, bon de livraison).' },
      { cls: 'good', text: '70–89 % — bon niveau, cible la matrice des DF.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les trois natures de propriété ?', a: 'Élémentaire (non déductible), composée (décomposable : adresse), calculée (déductible : TTC — à écarter du MCD).' },
      { q: 'Que contient un dictionnaire de données ?', a: 'Pour chaque propriété : nom, type, format, nature, remarques ; c\'est la matière première du MCD.' },
      { q: 'Qu\'est-ce qu\'une DF ?', a: 'A → B : connaître la valeur de A suffit à connaître celle de B (NumClt → NomClt).' },
      { q: 'À quoi sert la matrice des dépendances ?', a: 'À visualiser toutes les DF, repérer les identifiants candidats et les CIF (DF vers l\'identifiant d\'un autre groupe).' },
      { q: 'Que révèle NumCde → NumClt ?', a: 'Une contrainte d\'intégrité fonctionnelle : la commande référence un client existant.' }
    ]
  }
];
