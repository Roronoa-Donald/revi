/**
 * Chapitre 1 du cours « Cybersécurité » B2 — Fondements de la Sécurité, Modèle CIA & Gestion des Risques.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Fondements de la Sécurité, Modèle CIA &amp; Gestion des Risques',
  short: 'Modèle CIA &amp; Risques',
  toc: 'Triade CIA (Confidentialité, Intégrité, Disponibilité), modèle AAA (Authentification, Autorisation, Traçabilité), surface d’attaque, analyse de risques ISO 27005 et politiques PSSI.',
  time: '≈ 2 h 30 de travail',
  free: true,

  situation:
    'Lundi matin à 8h30, l’équipe support reçoit des dizaines d’appels d’utilisateurs paniqués : ' +
    'le portail de gestion commerciale refuse les connexions, et les bases de données financières affichent des soldes négatifs aberrants. ' +
    'Simultanément, un compte anonyme sur un forum publie un échantillon de 10 000 dossiers clients avec pièces d’identité. ' +
    'Face à cette crise multiforme, comment caractériser avec rigueur les atteintes subies ? ' +
    'Quelles sont les failles organisationnelles et logiques exploitées ? ' +
    'Ce premier module pose les fondations conceptuelles de la sécurité de l’information.',

  objectives: [
    'définir et différencier les trois piliers fondamentaux de la triade CIA (Confidentialité, Intégrité, Disponibilité) ;',
    'appliquer le modèle AAA (Authentification, Autorisation, Traçabilité/Accounting) dans la conception des systèmes ;',
    'distinguer clairement une menace, une vulnérabilité, un exploit et un impact financier ou opérationnel ;',
    'appliquer une grille pédagogique de risque en précisant que sa formule et ses seuils sont des choix du modèle ;',
    'distinguer les politiques de mots de passe du NIST et de l’ANSSI sans confondre critères et robustesse.'
  ],

  sections: [
    {
      title: 'La triade fondamentale CIA : Confidentialité, Intégrité, Disponibilité',
      html: [
        '<p>Tout programme de sécurité de l’information vise à préserver l’équilibre entre trois exigences vitales, ' +
        'désignées par l’acronyme <strong>CIA</strong> (ou DICP en français pour Disponibilité, Intégrité, Confidentialité, Preuve) :</p>',

        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4 class="card-title">1. Confidentialité (Confidentiality)</h4>',
        '    <p>Garantit que l’information n’est accessible et divulguée qu’aux personnes, entités ou processus autorisés.</p>',
        '    <p><strong>Menaces types :</strong> écoute clandestine (sniffing), vol d’identifiants, exfiltration de base de données.</p>',
        '    <p><strong>Contre-mesures :</strong> chiffrement au repos (AES-256), chiffrement en transit (TLS 1.3), cloisonnement des accès.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">2. Intégrité (Integrity)</h4>',
        '    <p>Garantit l’exactitude, la complétude et la non-altération des données tout au long de leur cycle de vie.</p>',
        '    <p><strong>Menaces types :</strong> altération frauduleuse de transactions, injection SQL, empoisonnement DNS/ARP.</p>',
        '    <p><strong>Contre-mesures :</strong> hachage comparé à une référence fiable, MAC ou signatures numériques ; les contrôles de redondance cyclique détectent des erreurs accidentelles mais ne protègent pas contre un adversaire qui peut les recalculer.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">3. Disponibilité (Availability)</h4>',
        '    <p>Garantit que les services et données sont opérationnels et accessibles aux utilisateurs légitimes au moment requis.</p>',
        '    <p><strong>Menaces types :</strong> attaques par déni de service distribué (DDoS), ransomwares bloquants, pannes matérielles.</p>',
        '    <p><strong>Contre-mesures :</strong> redondance d’infrastructure, plans de reprise d’activité (PRA), sauvegardes 3-2-1 déconnectées.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Le cadre opérationnel AAA : Authentification, Autorisation &amp; Traçabilité',
      html: [
        '<p>Pour contrôler l’accès aux ressources numériques, les systèmes déploient le triptyque <strong>AAA</strong> :</p>',

        '<table class="table">',
        '  <thead><tr><th>Composante</th><th>Question clé</th><th>Mécanisme technique associé</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Authentification (Authentication)</strong></td><td>« Qui êtes-vous ? »</td><td>Mots de passe, certificats X.509, facteurs biométriques, jetons TOTP (RFC 6238).</td></tr>',
        '    <tr><td><strong>Autorisation (Authorization)</strong></td><td>« Qu’avez-vous le droit de faire ? »</td><td>Listes de contrôle d’accès (ACL), matrices RBAC (rôles), politiques ABAC (attributs).</td></tr>',
        '    <tr><td><strong>Traçabilité (Accounting / Audit)</strong></td><td>« Qu’avez-vous réellement fait et quand ? »</td><td>Journaux d’événements immuables (syslog sécurisé), horodatage NTP synchronisé, SIEM.</td></tr>',
        '  </tbody>',
        '</table>',

        box('pitfall', 'Confusion fréquente : Authentification versus Autorisation', [
          '<p>Une erreur classique consiste à croire qu’un utilisateur authentifié avec succès dispose nécessairement des droits ' +
          'pour exécuter une opération. L’authentification prouve l’identité ; l’autorisation valide si cette identité ' +
          'possède la permission requise. La rupture de cette frontière engendre les failles de contrôle d’accès (IDOR).</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Analyse des risques et exemple de quantification',
      html: [
        '<p>La sécurité absolue n’existant pas, la gestion des risques permet d’orienter les investissements vers les menaces ' +
        'les plus dévastatrices. L’ISO 27005 propose une démarche de gestion des risques ; la formule et les seuils ci-dessous sont un modèle pédagogique choisi pour ce cours, pas une formule imposée par la norme. Ses décisions de traitement sont des exemples, à adapter au contexte :</p>',

        '<pre><code>// Modèle pédagogique de score de risque brut :\n' +
        'Risque = Menace &times; Vulnerabilite &times; Impact\n\n' +
        'Où :\n' +
        '- Menace (M)       : Potentiel d’un agent externe ou interne à causer un préjudice (échelle 1 à 5)\n' +
        '- Vulnerabilite (V) : Faille ou faiblesse du système exploitable par la menace (échelle 1 à 5)\n' +
        '- Impact (I)        : Gravité financière, juridique ou d’image en cas de réalisation (échelle 1 à 5)\n\n' +
        'Score brut = M * V * I   (compris entre 1 et 125)\n' +
        '- Score &lt; 20       &rarr; Risque FAIBLE (acceptation sous surveillance)\n' +
        '- 20 &le; Score &lt; 50 &rarr; Risque MOYEN (mesures d’atténuation standard)\n' +
        '- 50 &le; Score &lt; 80 &rarr; Risque ÉLEVÉ (traitement prioritaire requis)\n' +
        '- Score &ge; 80      &rarr; Risque CRITIQUE (remédiation immédiate obligatoire)</code></pre>'
      ].join('\n')
    },
    {
      title: 'Politique de sécurité des mots de passe &amp; Calcul d’entropie',
      html: [
        '<p>Les référentiels de mots de passe répondent à des contextes différents : leurs exigences ne sont pas interchangeables. ' +
        'Les règles NIST ci-dessous s’appliquent aux authentificateurs relevant de son périmètre ; la conformité à une politique ne démontre pas, à elle seule, la robustesse d’un secret.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Politique NIST SP 800-63B-4</h4>',
        '    <ul>',
        '      <li><strong>Longueur :</strong> au moins 15 caractères si le mot de passe est utilisé seul. Un service peut autoriser au minimum 8 caractères si ce mot de passe est exclusivement utilisé en MFA ; il peut aussi conserver un seuil supérieur.</li>',
        '      <li><strong>Composition :</strong> aucune règle de composition ni de classes de caractères n’est imposée ; une phrase sans chiffre ou symbole peut être acceptée.</li>',
        '      <li><strong>Choix et vérification :</strong> comparer le mot de passe entier à une liste de refus de valeurs communes, attendues ou compromises ; limiter les tentatives de connexion infructueuses.</li>',
        '      <li><strong>Saisie :</strong> autoriser les gestionnaires de mots de passe ; accepter les espaces et Unicode et permettre au moins 64 caractères sont des recommandations. Chaque point de code Unicode compte pour un caractère.</li>',
        '      <li><strong>Renouvellement :</strong> pas de changement périodique arbitraire ; imposer un changement en cas d’indice de compromission.</li>',
        '    </ul>',
        '    <p>Un mot de passe unique par service et la MFA sont de bonnes pratiques ; la seule longueur ne prouve pas sa résistance aux devinettes.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Entropie théorique d’un mot de passe aléatoire</h4>',
        '    <p>Pour des caractères tirés indépendamment et uniformément dans un alphabet de taille <i>N</i>, l’entropie en bits vaut :</p>',
        '    <p><code>E = L &times; log2(N)</code></p>',
        '    <p>Où <i>L</i> est la longueur et <i>N</i> la taille de l’alphabet de génération :</p>',
        '    <ul>',
        '      <li>Chiffres seuls (0-9) : <i>N = 10</i> (3.32 bits / car.)</li>',
        '      <li>Lettres min + maj : <i>N = 52</i> (5.70 bits / car.)</li>',
        '      <li>Alphanumérique + symboles : <i>N = 94</i> (6.55 bits / car.)</li>',
        '    </ul>',
        '    <p>Cette formule ne mesure pas automatiquement la résistance d’un mot de passe choisi par une personne : ses choix peuvent être prévisibles, même s’ils mélangent des classes.</p>',
        '  </div>',
        '</div>',
        '<p>Le guide MonServiceSécurisé de l’ANSSI présente une politique distincte, avec des exemples de composition ; ses critères ne doivent pas être attribués au NIST.</p>',
        '<p>Sources : <a href="https://pages.nist.gov/800-63-4/sp800-63b.html">NIST SP 800-63B-4</a> et ' +
        '<a href="https://aide.monservicesecurise.cyber.gouv.fr/fr/article/fixer-des-contraintes-de-longueur-et-de-complexite-des-mots-de-passe-14lmvzy/">guide MonServiceSécurisé de l’ANSSI</a> (consultés le 30/10/2026).</p>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Un rançongiciel chiffre des fichiers et les rend inaccessibles aux utilisateurs ; aucune divulgation n’est constatée. Quelle propriété est directement affectée par cette perte d’accès ?',
      opts: [
        'La Disponibilité',
        'La Confidentialité',
        'L’Authenticité',
        'La Non-répudiation'
      ],
      correct: 0,
      exp: 'Dans ce scénario, le chiffrement rend les fichiers indisponibles. La confidentialité concerne la divulgation, l’authenticité l’origine et la non-répudiation la contestation d’une action ; aucune de ces trois propriétés ne décrit directement la perte d’accès indiquée.'
    },
    {
      stem: 'Dans le modèle AAA, quelle composante détermine si un utilisateur authentifié a le droit de modifier un fichier spécifique ?',
      opts: [
        'L’Autorisation',
        'L’Authentification',
        'La Traçabilité (Accounting)',
        'L’Imputabilité'
      ],
      correct: 0,
      exp: 'L’autorisation détermine les droits sur le fichier. L’authentification vérifie l’identité ; la traçabilité consigne les actions et l’imputabilité permet de les attribuer, sans décider à elle seule des permissions.'
    },
    {
      stem: 'Avec le modèle pédagogique du cours (M &times; V &times; I ; élevé de 50 à 79), quel est le niveau pour M=4, V=3, I=5 ?',
      opts: [
        'ÉLEVÉ (Score = 60)',
        'FAIBLE (Score = 12)',
        'MOYEN (Score = 35)',
        'CRITIQUE (Score = 95)'
      ],
      correct: 0,
      exp: 'Le produit vaut 60, dans la plage élevée du modèle. Les scores 12, 35 et 95 ne correspondent pas aux trois valeurs données ; les seuils présentés sont propres à cet exercice.'
    },
    {
      stem: 'Pour 14 caractères tirés indépendamment et uniformément, pourquoi un alphabet de 94 caractères donne-t-il plus d’entropie théorique qu’un alphabet de 10 chiffres ?',
      opts: [
        'Parce que la taille de l’alphabet N n’est que de 10 contre 94, réduisant drastiquement le nombre total de combinaisons N^L',
        'Parce que les chiffres sont stockés sur moins d’octets en mémoire vive',
        'Parce que les algorithmes de hachage comme SHA-256 refusent les mots de passe numériques',
        'Parce que le protocole TCP interdit l’envoi de chiffres isolés'
      ],
      correct: 0,
      exp: 'Pour ces tirages indépendants et uniformes, E = L * log2(N) : environ 46,5 bits pour N=10 et 91,7 pour N=94. Le stockage en mémoire ne détermine pas cet espace ; SHA-256 accepte des données numériques et TCP transporte aussi des chiffres. Cette formule ne prouve pas la robustesse d’un choix humain prévisible.'
    },
    {
      stem: 'Selon NIST SP 800-63B-4, quelle règle s’applique à un mot de passe utilisé comme facteur unique ?',
      opts: [
        'Au moins 15 caractères, sans règle de composition obligatoire, avec vérification contre une liste de refus',
        'Au moins 12 caractères et obligatoirement une majuscule, une minuscule, un chiffre et un symbole',
        'Exactement 8 caractères, sans contrôle des valeurs compromises',
        'Au moins 15 caractères et un changement mensuel imposé'
      ],
      correct: 0,
      exp: 'Dans son périmètre, le NIST exige 15 caractères en facteur unique, sans règle de composition, avec liste de refus. Douze caractères et des classes obligatoires ne correspondent pas à cette règle ; huit ne suffisent pas en facteur unique et un changement mensuel n’est pas imposé. La longueur ne démontre pas la robustesse.'
    }
  ],

  pitfalls: [
    'Considérer que l’authentification équivaut à l’autorisation : être connecté ne donne pas tous les droits.',
    'Confondre vulnérabilité (faiblesse interne du système) et menace (agent extérieur susceptible d’exploiter cette faiblesse).',
    'Imposer un renouvellement mensuel obligatoire des mots de passe sans double facteur, ce qui incite les utilisateurs à concevoir des variantes prévisibles (ex. Ete2026!).',
    'Négliger la Disponibilité dans les architectures au profit du seul chiffrement des données.',
    'Traiter un risque sans évaluer l’impact métier réel : surprotéger des données publiques insignifiantes tout en négligeant la base comptable.'
  ],

  methodTitle: 'Protocole en 4 étapes pour mener une analyse de risques d’infrastructure',
  method: [
    'Cartographier les actifs primordiaux : inventorier les bases de données, applications critiques et flux sensibles.',
    'Identifier les menaces et vulnérabilités : recenser les vecteurs d’attaque crédibles et auditer l’exposition des services.',
    'Quantifier les scores de risque brut : calculer le produit Menace &times; Vulnérabilité &times; Impact pour chaque scénario.',
    'Définir le plan de traitement : choisir entre atténuation (mesures techniques), transfert (cyber-assurance), évitement ou acceptation formelle.'
  ],

  summary: [
    'La triade CIA (Confidentialité, Intégrité, Disponibilité) est la boussole incontournable de tout audit de sécurité.',
    'Le modèle AAA garantit que chaque requête est identifiée (Authentification), vérifiée (Autorisation) et consignée (Traçabilité).',
    'Le risque résulte du croisement d’une menace, d’une vulnérabilité et d’un impact financier ou réglementaire.',
    'Une longueur suffisante, une liste de refus et la limitation des essais contribuent à la sécurité ; le respect de catégories ne prouve pas la robustesse.',
    'La sécurité opérationnelle exige une politique cohérente combinant mesures préventives, contrôles continus et PRA.'
  ],

  checklist: [
    'Je sais expliciter chaque pilier de la triade CIA avec des exemples d’incidents concrets.',
    'Je distingue rigoureusement Authentification et Autorisation dans une architecture applicative.',
    'Je sais calculer et classer un score dans le modèle pédagogique donné, sans attribuer ses seuils à la norme.',
    'Je connais la formule de l’entropie de Shannon et les recommandations de l’ANSSI pour les mots de passe.',
    'Je comprends l’intérêt d’une journalisation immuable pour assurer la traçabilité des accès.'
  ],

  notions: [
    'Triade CIA (Confidentialité, Intégrité, Disponibilité)',
    'Modèle AAA (Authentification, Autorisation, Accounting)',
    'Menace vs Vulnérabilité vs Exploit vs Impact',
    'Gestion des risques ISO 27005',
    'Score de criticité du risque',
    'Politique de Sécurité des SI (PSSI)',
    'Entropie de mot de passe (formule de Shannon)',
    'Politique NIST SP 800-63B-4 pour les mots de passe',
    'Authentification multi-facteurs (MFA)',
    'Traçabilité et horodatage des journaux'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois les définitions de la triade CIA et la différence entre menace et vulnérabilité.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur le modèle de risque du cours et la formule d’entropie.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les principes fondamentaux de la gestion des risques et du modèle AAA.' },
    { cls: 'top', text: '≥ 95 % — Excellent : passe à la cryptographie appliquée et aux signatures numériques au module 2.' }
  ],

  flashcards: [
    { "q": 'Qu’est-ce que « Modèle AAA (Authentification, Autorisation, Accounting) » ?', "a": 'AAA vérifie l’identité, détermine les droits et journalise l’usage des ressources : authentification, autorisation et accounting.' },
    { "q": 'Qu’est-ce que « Menace vs Vulnérabilité vs Exploit vs Impact » ?', "a": 'Menace : cause possible d’incident ; vulnérabilité : faiblesse ; exploit : moyen de l’exploiter ; impact : conséquences de l’incident.' },
    { "q": 'Qu’est-ce que « Gestion des risques ISO 27005 » ?', "a": 'Démarche itérative pour identifier, analyser, évaluer et traiter les risques de sécurité de l’information, puis les surveiller.' },
    { "q": 'Qu’est-ce que « Score de criticité du risque » ?', "a": 'Dans le modèle du cours : menace × vulnérabilité × impact, chacun noté de 1 à 5, soit un score de 1 à 125 ; ce choix dépend de la méthode.' },
    { "q": 'Qu’est-ce que « Politique de Sécurité des SI (PSSI) » ?', "a": 'Document qui fixe les objectifs, règles, responsabilités et mesures de sécurité du système d’information d’une organisation.' },
    { "q": 'Que prescrit la politique NIST SP 800-63B-4 pour les mots de passe ?', "a": 'Au moins 15 caractères en facteur unique ; au moins 8 caractères peuvent être autorisés si le mot de passe est utilisé exclusivement en MFA. Sans règles de composition : vérifier aussi une liste de refus et limiter les tentatives.' },
    { q: 'Que désignent les trois lettres de la triade CIA ?', a: 'Confidentialité, Intégrité et Disponibilité (Confidentiality, Integrity, Availability).' },
    { q: 'Quelle est la différence entre une vulnérabilité et une menace ?', a: 'Une vulnérabilité est une faiblesse interne du système ; une menace est une cause potentielle extérieure d’incident.' },
    { q: 'Comment calcule-t-on le score dans le modèle pédagogique du cours ?', a: 'Score = Menace &times; Vulnérabilité &times; Impact (de 1 à 125) ; formule et seuils sont des choix du modèle.' },
    { q: 'Quel pilier de la triade est violé lors d’une attaque par injection SQL modifiant un solde ?', a: 'L’Intégrité, car les données ont été altérées de manière frauduleuse.' },
    { q: 'Quelle est la formule de l’entropie pour un mot de passe généré aléatoirement ?', a: 'E = L &times; log2(N) seulement si les L caractères sont tirés indépendamment et uniformément dans un alphabet de taille N ; elle ne mesure pas directement un choix humain.' },
    { q: 'Pourquoi le changement fréquent obligatoire de mot de passe est-il aujourd’hui déconseillé ?', a: 'Parce qu’il pousse les utilisateurs à choisir des motifs prévisibles et affaiblit l’entropie globale sans apporter de sécurité réelle.' }
  ]
};
