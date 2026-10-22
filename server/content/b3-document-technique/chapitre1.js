/**
 * Chapitre 1 du cours « Document Technique B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Typologies, Cibles &amp; Enjeux Stratégiques de la Documentation IT',
  short: 'Typologies &amp; Cibles IT',
  toc: 'Rôle stratégique de la documentation, analyse d’audience par le cadre 5W1H (QQOQCP), cartographie des typologies (DAT, DEX, SFD, API) et registre lexical.',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Dans de nombreuses entreprises informatiques, la documentation technique est traitée comme une corvée secondaire expédiée à la hâte en fin de projet. Cette négligence engendre des dysfonctionnements critiques : dépendance extrême envers quelques experts clés (« Bus Factor » élevé), intégration laborieuse des nouveaux développeurs, pannes de production prolongées faute de procédures d’exploitation claires et litiges contractuels lors de la recette client. Pour concevoir une documentation à haute valeur ajoutée, l’ingénieur informatique de Bachelor 3 doit comprendre le rôle stratégique de l’écrit technique, maîtriser le cadre d’analyse 5W1H (QQOQCP), identifier précisément les typologies canoniques (User Guide, SFD, STD, DAT, DEX, API Doc) et adapter rigoureusement son registre lexical au profil de ses lecteurs.',
  objectives: [
    'analyser les enjeux stratégiques et économiques de la documentation dans le cycle de vie logiciel (PCA, transfert de compétences, Bus Factor) ;',
    'appliquer le cadre méthodologique 5W1H (Qui, Quoi, Quand, Où, Pourquoi, Comment) pour structurer l’en-tête d’un document IT ;',
    'cartographier les typologies documentaires professionnelles : guides utilisateurs, SFD/STD, DAT, DEX et documentations d’API ;',
    'identifier le public cible et adapter le niveau de vulgarisation ou de précision technique requis ;',
    'définir les critères de qualité d’un écrit technique : clarté, concision, exactitude, exhaustivité et actualisation ;',
    'automatiser de manière méthodique la classification documentaire, l’audit 5W1H et la mesure de densité de jargon technique.'
  ],
  sections: [
    {
      title: 'Le Rôle Stratégique de la Documentation dans les Projets IT',
      html: [
        '<p>La documentation technique n’est pas un sous-produit administratif : elle constitue l’<strong>actif immatériel central garantissant la pérennité et la valeur marchande d’un système d’information</strong>. Sans documentation formalisée, une application devient une « boîte noire » dont la moindre modification engendre des risques imprévisibles.</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Réduction du « Bus Factor »</h4>',
        '    <p>Le <em>Bus Factor</em> mesure le nombre minimal d’experts dont la disparition soudaine (démission, maladie) mettrait en péril le projet. Capitaliser le savoir dans des documents vivants neutralise la dépendance aux connaissances implicites d’individus isolés.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Accélération de l’Onboarding</h4>',
        '    <p>Une documentation d’architecture et d’environnement claire divise par trois le temps nécessaire à un nouvel arrivant pour être autonome et réaliser son premier déploiement en production.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Continuité d’Activité (PCA) &amp; MTTR</h4>',
        '    <p>En cas d’incident nocturne, l’ingénieur d’astreinte ne peut pas improviser. Des procédures de résolution documentées pas-à-pas réduisent drastiquement le temps moyen de rétablissement (MTTR).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Le Cadre Méthodologique 5W1H (QQOQCP) : Structurer Avant d’Écrire',
      html: [
        '<p>Avant toute rédaction, l’ingénieur doit clarifier le contexte d’intervention en appliquant le cadre d’investigation <strong>5W1H (Who, What, When, Where, Why, How / QQOQCP)</strong> :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th style="width:15%">Dimension</th>',
        '      <th style="width:35%">Question d’investigation</th>',
        '      <th style="width:50%">Application à la documentation IT</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>QUI ? (Who)</strong></td>',
        '      <td>Pour qui le document est-il rédigé ?</td>',
        '      <td>Identification de l’audience cible : développeurs juniors, exploitants SRE, clients néophytes ou auditeurs de sécurité.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>QUOI ? (What)</strong></td>',
        '      <td>Quel est le sujet exact et son périmètre ?</td>',
        '      <td>Composant technique décrit, version logicielle exacte couverte et frontières de responsabilité.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>QUAND ? (When)</strong></td>',
        '      <td>À quel stade du cycle intervient le document ?</td>',
        '      <td>Phase de spécification amont, phase de recette, mise en service ou maintenance corrective d’urgence.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>OÙ ? (Where)</strong></td>',
        '      <td>Dans quel environnement le système opère-t-il ?</td>',
        '      <td>Poste de travail local, cluster Kubernetes de staging, cloud public AWS ou datacenter privé isolé.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>POURQUOI ? (Why)</strong></td>',
        '      <td>Quelle est la finalité métier ou technique ?</td>',
        '      <td>Problème résolu, exigence de conformité réglementaire (RGPD/ISO 27001) ou optimisation de performance.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>COMMENT ? (How)</strong></td>',
        '      <td>Par quelles étapes ordonnées procéder ?</td>',
        '      <td>Instructions séquentielles, commandes shell précises, captures d’écran et schémas d’architecture.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Cartographie des Typologies Documentaires Canoniques',
      html: [
        '<p>Les besoins d’un projet informatique s’articulent autour de 5 grandes familles de livrables documentaires, chacune répondant à des exigences normatives précises :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Spécifications : SFD &amp; STD</h4>',
        '    <p><strong>SFD (Fonctionnelles) :</strong> Règles métier, cas d’utilisation (Use Cases), parcours clients et maquettes d’interface à destination du métier et des devs.<br>' +
        '       <strong>STD (Techniques) :</strong> Modèle de données (MCD/MLD), microservices, flux réseau et bibliothèques logicielles pour les développeurs.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Architecture &amp; Infra : DAT &amp; DEX</h4>',
        '    <p><strong>DAT (Dossier d’Architecture Technique) :</strong> Cartographie des serveurs, réseaux, redondance et sécurité pour les architectes.<br>' +
        '       <strong>DEX (Dossier d’Exploitation / Runbook) :</strong> Procédures de démarrage, sauvegardes, restauration RTO/RPO et astreinte pour les Ops/SRE.</p>',
        '  </div>',
        '</div>',
        '<div class="grid grid-2" style="margin-top:16px">',
        '  <div class="card">',
        '    <h4>3. Documentation d’API &amp; Développeur</h4>',
        '    <p>Spécifications OpenAPI 3.0 / Swagger décrivant les endpoints, méthodes HTTP, paramètres, schémas de requêtes et de réponses avec codes d’erreur.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>4. Guides Utilisateurs &amp; Manuels</h4>',
        '    <p>Prise en main guidée, didacticiels pas-à-pas, foire aux questions (FAQ) et release notes rédigés sans jargon pour les utilisateurs finaux.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'L’Art du Registre Lexical : Précision vs Vulgarisation',
      html: [
        '<p>La première cause d’échec d’une documentation technique réside dans le <strong>désalignement de registre</strong> : un guide utilisateur saturé de jargon cryptique (threads, sockets, hashes) décourage les utilisateurs, tandis qu’un document d’architecture flou employant des termes vagues (« la boîte magique qui traite les données ») exaspère les ingénieurs.</p>',
        box('tip', 'Règle d’Or du Choix des Mots', [
          '<p>Pour une cible <strong>Grand Public / Utilisateur Métier</strong> : bannir les acronymes non définis, privilégier les verbes d’action (« Cliquez », « Saisissez », « Téléchargez ») et expliciter les bénéfices concrets. Pour une cible <strong>Développeur / Ingénieur Infra</strong> : employer la terminologie standard exacte (ex. « Requête HTTP POST avec payload JSON validé par schéma » plutôt que « Envoyer les infos au serveur »), spécifier les versions et donner les commandes terminales complètes.</p>'
        ].join('\n'))
      ].join('\n')
    }
  ],
  methodTitle: 'Démarche de Qualification et de Cadrage d’un Document Technique',
  method: [
    'Identifier formellement le destinataire principal et son niveau de compétence technique (matrice d’audience).',
    'Déterminer la typologie documentaire appropriée parmi les 5 familles canoniques (Guide, SFD, STD, DAT, DEX).',
    'Renseigner intégralement le cartouche d’en-tête selon le cadre 5W1H (Qui, Quoi, Quand, Où, Pourquoi, Comment).',
    'Établir le plan détaillé (Table des matières) avec un fil conducteur logique allant du général au particulier.',
    'Calibrer le niveau de vocabulaire : vulgarisation didactique ou terminologie technique spécialisée sans ambiguïté.',
    'Planifier les éléments visuels d’appui : captures d’écran annotées, diagrammes de flux et tableaux récapitulatifs.'
  ],
  summary: [
    'La documentation technique réduit le Bus Factor, accélère l’onboarding et diminue le MTTR lors des crises de production.',
    'Le cadre 5W1H (QQOQCP) structure systématiquement l’en-tête et le périmètre d’un document IT.',
    'Les 5 typologies majeures : Guides Utilisateurs, SFD (métier), STD (technique), DAT (architecture), DEX (exploitation/Runbook).',
    'Le registre lexical doit être strictement adapté à l’audience : vulgarisation pour le métier, rigueur terminologique pour les ingénieurs.',
    'Une documentation efficace privilégie des phrases courtes, des listes d’actions numérotées et des exemples vérifiables.'
  ],
  checklist: [
    'Je sais expliquer ce qu’est le Bus Factor et comment la documentation le réduit.',
    'Je maîtrise les 6 questions de la méthode 5W1H (QQOQCP).',
    'Je sais différencier une SFD d’une STD.',
    'Je sais expliquer la différence entre un DAT et un DEX.',
    'Je sais adapter mon vocabulaire entre une cible grand public et une cible développeur.',
    'Je sais rédiger un en-tête documentaire professionnel complet.'
  ],
  notions: [
    'Rôle stratégique de la documentation IT',
    'Loi du Bus Factor &amp; Continuité d’activité',
    'Méthode d’analyse 5W1H (QQOQCP)',
    'Spécifications Fonctionnelles Détaillées (SFD)',
    'Spécifications Techniques Détaillées (STD)',
    'Dossier d’Architecture Technique (DAT)',
    'Dossier d’Exploitation (DEX / Runbook)',
    'Adéquation du registre lexical technique'
  ],
  pitfalls: [
    'Rédiger une documentation technique sans identifier au préalable qui la lira et dans quel contexte d’urgence.',
    'Utiliser du jargon système complexe dans un manuel destiné à des utilisateurs finaux non informaticiens.',
    'Employer des termes vagues et approximatifs dans un Dossier d’Exploitation (DEX) destiné aux équipes d’astreinte.',
    'Rédiger la documentation uniquement en toute fin de projet lorsque les choix de conception ont déjà été oubliés.'
  ],
  questions: [
    {
      stem: 'En ingénierie logicielle, qu’appelle-t-on le « Bus Factor » (ou Facteur de Camion) d’un projet ?',
      opts: [
        'La bande passante réseau maximale des bus de communication entre les serveurs',
        'Le nombre minimal de membres d’une équipe dont la perte soudaine paralyserait le projet faute de transmission des connaissances',
        'Le coût moyen du transport des serveurs vers le datacenter',
        'La vitesse de compilation du code source'
      ],
      correct: 1,
      exp: 'Le Bus Factor évalue la concentration des connaissances critiques : un Bus Factor de 1 signifie que si l’unique expert quitte l’entreprise, le système devient inmaintenable.'
    },
    {
      stem: 'Dans le cadre méthodologique 5W1H (QQOQCP), quelle question correspond à la dimension « OÙ » (Where) appliquée à un document IT ?',
      opts: [
        'Le nom de l’auteur du document',
        'L’environnement technique d’exécution du système (ex. poste local, cluster Kubernetes, cloud public)',
        'Le budget financier alloué au projet',
        'La date de livraison prévue'
      ],
      correct: 1,
      exp: 'La dimension OÙ (Where) précise la localisation d’infrastructure et l’environnement d’exécution physique ou logique des composants décrits.'
    },
    {
      stem: 'À quelle audience s’adresse prioritairement un Dossier d’Architecture Technique (DAT) ?',
      opts: [
        'Aux clients finaux qui naviguent sur l’application mobile',
        'Aux architectes d’entreprise, responsables sécurité (RSSI) et ingénieurs d’infrastructure',
        'Aux comptables de l’entreprise',
        'Aux graphistes designers'
      ],
      correct: 1,
      exp: 'Le DAT est un document de haut niveau technique décrivant les briques logicielles, serveurs, flux réseau, redondance et sécurité pour les architectes et le RSSI.'
    },
    {
      stem: 'Quel est l’objectif principal d’un Dossier d’Exploitation (DEX ou Runbook) ?',
      opts: [
        'Négocier le contrat commercial avec le client',
        'Fournir les procédures opérationnelles pas-à-pas (démarrage, sauvegardes, restauration, diagnostic) aux équipes d’astreinte et d’exploitation',
        'Présenter la maquette graphique de l’interface utilisateur',
        'Lister les CV des développeurs du projet'
      ],
      correct: 1,
      exp: 'Le DEX est le guide opérationnel des exploitants : il consigne les consignes d’action concrètes et ordonnancées pour faire tourner le système et gérer les incidents.'
    },
    {
      stem: 'Quelle caractéristique distingue une Spécification Fonctionnelle Détaillée (SFD) d’une Spécification Technique Détaillée (STD) ?',
      opts: [
        'La SFD est rédigée en anglais tandis que la STD est rédigée en français',
        'La SFD décrit le comportement attendu du système du point de vue des besoins métier et de l’utilisateur, tandis que la STD décrit les choix d’implémentation technique (bases de données, microservices, API)',
        'La SFD n’est jamais validée par le client',
        'La STD ne contient aucun schéma technique'
      ],
      correct: 1,
      exp: 'La SFD exprime le « quoi » (règles métier, parcours client, cas d’utilisation), tandis que la STD spécifie le « comment » technique (schéma de base de données, algorithmes, protocoles).'
    },
    {
      stem: 'Pourquoi est-il déconseillé d’utiliser des termes comme « mutex », « sockets TCP » ou « token JWT » dans un guide utilisateur grand public ?',
      opts: [
        'Car ces termes sont protégés par le droit d’auteur',
        'Car ce jargon technique obscurcit la compréhension des utilisateurs métier et nuit à l’utilisabilité du document',
        'Car ces termes augmentent le poids du fichier PDF',
        'Car les navigateurs web refusent d’afficher ces mots'
      ],
      correct: 1,
      exp: 'Le registre lexical doit être adapté à la cible. Pour un utilisateur métier, ces termes techniques créent une surcharge cognitive et empêchent la résolution autonome des tâches.'
    },
    {
      stem: 'Comment la documentation technique contribue-t-elle à réduire le MTTR (Mean Time To Restore) lors d’une panne critique ?',
      opts: [
        'En permettant aux techniciens d’astreinte d’exécuter immédiatement des procédures de diagnostic et de bascule éprouvées sans perdre de temps en tâtonnements',
        'En éteignant automatiquement les serveurs défaillants',
        'En masquant les logs d’erreur aux clients',
        'En prolongeant la durée de l’astreinte'
      ],
      correct: 0,
      exp: 'Un Runbook clair fournit des arbres de diagnostic et des commandes exactes, permettant à l’opérateur d’isoler la cause et de restaurer le service en quelques minutes.'
    },
    {
      stem: 'Que doit impérativement contenir le cartouche d’en-tête d’un document technique formel ?',
      opts: [
        'La photo du directeur général',
        'Le titre, la version, la date de mise à jour, l’auteur/rédacteur, le statut de validation et le périmètre d’audience',
        'Le relevé d’identité bancaire de l’entreprise',
        'La liste de tous les logiciels installés sur l’ordinateur de l’auteur'
      ],
      correct: 1,
      exp: 'Les métadonnées d’en-tête garantissent la traçabilité documentaire : identification de la version, date de dernière révision, auteurs et statut d’approbation formelle.'
    }
  ],
  flashcards: [
      { q: 'Qu’est-ce que « Rôle stratégique de la documentation IT » ?', a: 'Rôle stratégique de la documentation IT' },
      { q: 'Qu’est-ce que « Loi du Bus Factor & Continuité d’activité » ?', a: 'Loi du Bus Factor & Continuité d’activité' },
      { q: 'Qu’est-ce que « Méthode d’analyse 5W1H (QQOQCP) » ?', a: 'Méthode d’analyse 5W1H (QQOQCP)' },
      { q: 'Qu’est-ce que « Spécifications Fonctionnelles Détaillées (SFD) » ?', a: 'Spécifications Fonctionnelles Détaillées (SFD)' },
      { q: 'Qu’est-ce que « Spécifications Techniques Détaillées (STD) » ?', a: 'Spécifications Techniques Détaillées (STD)' },
      { q: 'Qu’est-ce que « Adéquation du registre lexical technique » ?', a: 'Adéquation du registre lexical technique' },
      { q: 'Qu’est-ce que « Ingénierie des exigences logicielles » ?', a: 'Ingénierie des exigences logicielles' },
      { q: 'Qu’est-ce que « Cas d’utilisation (Use Cases) canoniques » ?', a: 'traduire les exigences métier en cas d’utilisation (Use Cases) canoniques et scénarios d’exception structurés ;' },
      { q: 'Qu’est-ce que « Scénarios nominaux et d’exception » ?', a: 'Scénarios nominaux et d’exception' },
      { q: 'Qu’est-ce que « Matrice de flux réseau sécurisée » ?', a: 'Je sais structurer une matrice de flux réseau sécurisée dans une STD.' },
      { q: 'Qu’est-ce que « Matrice de traçabilité des exigences (RTM) » ?', a: 'Je sais construire et auditer une matrice de traçabilité des exigences (RTM).' },
      { q: 'Qu’est-ce que « Sur-qualité inutile (Gold Plating) » ?', a: 'Sur-qualité inutile (Gold Plating)' },
      { q: 'Qu’est-ce que « Ordonnancement de services en grappe » ?', a: 'Ordonnancement de services en grappe' },
      { q: 'Qu’est-ce que « Plan de Reprise d’Activité (PRA) » ?', a: 'modéliser les étapes chronologiques d’une procédure de bascule de secours dans un Plan de Reprise d’Activité (PRA) ;' },
      { q: 'Qu’est-ce que « Plan de Continuité d’Activité (PCA) » ?', a: 'Plan de Continuité d’Activité (PCA)' },
      { q: 'Qu’est-ce que « Philosophie de conception API-First » ?', a: 'Philosophie de conception API-First' },
      { q: 'Qu’est-ce que « Spécification OpenAPI 3.0 & Swagger » ?', a: 'Spécification OpenAPI 3.0 & Swagger : Dans les architectures modernes orientées microservices et les écosystèmes d’intégration partenaires, l’API est le produit. Une API dépourvue de documentation claire, rigoureusement typée et à jour est vouée à l’abandon : les développeurs tiers perdent des journées entières à dev' },
      { q: 'Qu’est-ce que « Conventions de nommage RESTful » ?', a: 'Conventions de nommage RESTful' },
      { q: 'Qu’est-ce que « Sémantique des codes de statut HTTP » ?', a: 'Sémantique des codes de statut HTTP' },
      { q: 'Qu’est-ce que « Schémas de données JSON réutilisables » ?', a: 'Schémas de données JSON réutilisables' },
      { q: 'Qu’est-ce que « Docstrings normalisées (format Google) » ?', a: 'Docstrings normalisées (format Google)' },
      { q: 'Qu’est-ce que « Portails interactifs Swagger UI & Redoc » ?', a: 'Portails interactifs Swagger UI & Redoc' },
      { q: 'Qu’est-ce que « Serveurs de mocks et génération de SDK » ?', a: 'Serveurs de mocks et génération de SDK' },
      { q: 'Qu’est-ce que « Philosophie et principes Docs-as-Code » ?', a: 'Philosophie et principes Docs-as-Code' },
      { q: 'Qu’est-ce que « Syntaxe GitHub Flavored Markdown (GFM) » ?', a: 'Syntaxe GitHub Flavored Markdown (GFM)' },
      { q: 'Qu’est-ce que « Règles de hiérarchie des titres Markdown » ?', a: 'Règles de hiérarchie des titres Markdown' },
      { q: 'Qu’est-ce que « Diagrammes textuels Mermaid.js » ?', a: 'Diagrammes textuels Mermaid.js' },
      { q: 'Qu’est-ce que « Générateur statique MkDocs & thème Material » ?', a: 'Générateur statique MkDocs & thème Material' },
      { q: 'Qu’est-ce que « Générateur interactif Docusaurus (MDX) » ?', a: 'Générateur interactif Docusaurus (MDX)' },
      { q: 'Qu’est-ce que « Configuration de navigation YAML (nav) » ?', a: 'Configuration de navigation YAML (nav)' },
      { q: 'Qu’est-ce que « Pipelines CI/CD de validation et déploiement » ?', a: 'Pipelines CI/CD de validation et déploiement' },
      { q: 'Qu’est-ce que « Métrique Average Sentence Length (ASL) » ?', a: 'Métrique Average Sentence Length (ASL)' },
      { q: 'Qu’est-ce que « Indices de lisibilité Flesch & Flesch-Kincaid » ?', a: 'Indices de lisibilité Flesch & Flesch-Kincaid' },
      { q: 'Qu’est-ce que « Linters de prose et de style (Vale, cspell) » ?', a: 'Linters de prose et de style (Vale, cspell)' },
      { q: 'Qu’est-ce que « Vérification automatisée de liens (link checking) » ?', a: 'Vérification automatisée de liens (link checking)' },
      { q: 'Qu’est-ce que « Ancres slugifiées et intégrité hypertexte » ?', a: 'Ancres slugifiées et intégrité hypertexte' },
      { q: 'Qu’est-ce que « Détection des documents obsolètes (stale docs) » ?', a: 'Détection des documents obsolètes (stale docs)' },
      { q: 'Qu’est-ce que « Métadonnées de gouvernance YAML frontmatter » ?', a: 'Métadonnées de gouvernance YAML frontmatter' },
      { q: 'Qu’est-ce que « Intégration dans la Definition of Done (DoD) » ?', a: 'Intégration dans la Definition of Done (DoD)' },
    {
      q: 'Qu’appelle-t-on le « Bus Factor » d’un projet IT ?',
      a: 'Le nombre minimal de personnes dont l’indisponibilité brutale bloquerait le projet. Une bonne documentation augmente ce facteur en partageant les connaissances critiques.'
    },
    {
      q: 'Quelles sont les 6 dimensions du cadre 5W1H (QQOQCP) ?',
      a: 'Qui (Who), Quoi (What), Quand (When), Où (Where), Pourquoi (Why) et Comment (How).'
    },
    {
      q: 'Quelle est la différence fondamentale entre SFD et STD ?',
      a: 'La SFD décrit les règles et exigences fonctionnelles métier (le Quoi), tandis que la STD décrit l’architecture technique et les modèles de données (le Comment).'
    },
    {
      q: 'Quelle est la distinction essentielle entre un DAT et un DEX ?',
      a: 'Le DAT est le dossier d’architecture technique pour les concepteurs/RSSI. Le DEX (Runbook) est le dossier d’exploitation pour les exploitants et astreintes.'
    },
    {
      q: 'Pourquoi adapter son registre lexical est-il crucial en rédaction technique ?',
      a: 'Pour éviter d’aliéner les utilisateurs métier avec du jargon inutile, tout en conservant une rigueur terminologique absolue pour les ingénieurs d’exploitation.'
    },
    {
      q: 'Quels éléments clés doivent figurer dans un en-tête documentaire formel ?',
      a: 'Titre, versionnage sémantique, date de mise à jour, auteurs, réviseurs, statut d’approbation et audience cible.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la notion de Bus Factor, le cadre 5W1H et la distinction SFD/STD/DAT/DEX.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez les critères d’adéquation lexicale et le rôle du DEX.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez les enjeux stratégiques et les typologies fondamentales de la documentation IT.'
    }
  ]
};
