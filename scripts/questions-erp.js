/**
 * 100 QCM pour le cours ERP & SI
 * Intègre les questions de l'examen réel du Collège de Paris
 */
module.exports = [
  // Chapitre 1: SI et ERP (1 à 17)
  {
    id: 1,
    ch: 1,
    q: "Quelle est la définition fondamentale d'un système d'information (SI) ?",
    o: [
      "Un ensemble organisé de ressources (matériel, logiciel, données, personnes, processus) pour collecter, stocker, traiter et diffuser l'information.",
      "Un réseau de câbles et de serveurs uniquement géré par le service informatique.",
      "Un logiciel de traitement de texte utilisé pour rédiger des courriers officiels.",
      "Une base de données SQL déconnectée des processus métiers."
    ],
    a: 0,
    e: "Le SI englobe les ressources humaines, matérielles, logicielles, les processus et les données pour gérer l'information au sein d'une organisation."
  },
  {
    id: 2,
    ch: 1,
    q: "Quels sont les trois sous-systèmes d'information d'une organisation ?",
    o: [
      "Commercial, logistique, social",
      "Opérant, pilotage, information",
      "Finance, ventes, achats",
      "RH, juridique, qualité"
    ],
    a: 1,
    e: "Une organisation est traditionnellement modélisée en trois systèmes : le système opérant (production), le système de pilotage (décision) et le système d'information."
  },
  {
    id: 3,
    ch: 1,
    q: "Quel est le rôle principal du système opérant dans une organisation ?",
    o: [
      "Exécuter les tâches quotidiennes et produire les biens ou services",
      "Définir la vision à 5 ans et fixer les budgets annuels",
      "Concevoir le schéma relationnel des bases de données",
      "Gérer uniquement les relations avec les banques et actionnaires"
    ],
    a: 0,
    e: "Le système opérant transforme les flux physiques et exécute les activités opérationnelles décidées par le pilotage."
  },
  {
    id: 4,
    ch: 1,
    q: "Que signifie l'acronyme ERP en anglais ?",
    o: [
      "Enterprise Resource Planning",
      "Electronic Registry Protocol",
      "Enterprise Relation Process",
      "Efficient Resource Programming"
    ],
    a: 0,
    e: "ERP signifie Enterprise Resource Planning, traduit en français par Progiciel de Gestion Intégré (PGI)."
  },
  {
    id: 5,
    ch: 1,
    q: "Un ERP aide dans la gestion de la chaîne logistique (Supply Chain) en :",
    o: [
      "Librant les colis physiquement au domicile des clients",
      "Créant des sites web marchands pour le grand public",
      "Apportant une visibilité centralisée de bout en bout",
      "Remplaçant les responsables qualité de l'entreprise"
    ],
    a: 2,
    e: "L'ERP centralise les flux logistiques (stocks, expéditions, achats) et fournit une visibilité complète de bout en bout sur la supply chain."
  },
  {
    id: 6,
    ch: 1,
    q: "Quelle est la caractéristique technique essentielle d'un ERP ?",
    o: [
      "L'utilisation d'une base de données unique et partagée par tous les modules",
      "L'absence totale de connexions réseau avec l'extérieur",
      "L'obligation de coder chaque écran en HTML brut par les utilisateurs",
      "Le stockage exclusif des fichiers sur des clés USB physiques"
    ],
    a: 0,
    e: "L'unicité de la base de données assure la cohérence des informations et évite les ressaisies entre les différents services de l'entreprise."
  },
  {
    id: 7,
    ch: 1,
    q: "Quel est l'impact majeur d'une base de données commune dans un ERP ?",
    o: [
      "L'élimination des doublons et la mise à jour immédiate des données pour tous les services",
      "Le ralentissement global de toutes les requêtes en lecture seule",
      "L'interdiction d'utiliser des outils de reporting externe",
      "L'obligation de dupliquer les clients dans chaque sous-application"
    ],
    a: 0,
    e: "Une donnée saisie une seule fois (par exemple, une commande client) met à jour les stocks, la comptabilité et la facturation en temps réel."
  },
  {
    id: 8,
    ch: 1,
    q: "Qu'est-ce que la modularité d'un ERP ?",
    o: [
      "Le découpage en sous-systèmes fonctionnels (modules) qui partagent la même base de données et communiquent nativement",
      "L'obligation d'acheter l'intégralité des fonctions dès le premier jour",
      "L'utilisation d'applications physiques différentes ne pouvant pas se connecter entre elles",
      "Un système où les utilisateurs doivent réinstaller le logiciel chaque matin"
    ],
    a: 0,
    e: "Chaque module (RH, Finance, Achats, Ventes) traite un domaine métier spécifique tout en s'articulant parfaitement avec les autres."
  },
  {
    id: 9,
    ch: 1,
    q: "Quel est le rôle du moteur de workflow dans un ERP ?",
    o: [
      "Envoyer uniquement des e-mails automatiques de manière planifiée",
      "Propager automatiquement l'information et les tâches entre les modules",
      "Gérer la sécurité physique des bâtiments de l'entreprise",
      "Imprimer tous les documents de facturation"
    ],
    a: 1,
    e: "Le moteur de workflow propage les données et enchaîne les étapes (ex: commande validée -> ordre d'expédition généré) selon des règles prédéfinies."
  },
  {
    id: 10,
    ch: 1,
    q: "Dans un ERP, que se passe-t-il immédiatement après la validation d'une vente par le module commercial ?",
    o: [
      "Les stocks sont mis à jour et une demande d'expédition ou de facturation est initiée automatiquement selon les règles de workflow",
      "Rien, le commercial doit envoyer un e-mail manuel à chaque département",
      "La base de données est réinitialisée par sécurité",
      "Le client reçoit instantanément l'intégralité des articles par voie électronique"
    ],
    a: 0,
    e: "La base partagée et le moteur de workflow déclenchent en cascade les actions nécessaires sans ressaisie manuelle."
  },
  {
    id: 11,
    ch: 1,
    q: "Comment l'ERP garantit-il la cohérence financière lors d'une entrée de marchandise en stock ?",
    o: [
      "Le module de gestion des stocks met à jour la valeur des inventaires et génère automatiquement l'écriture comptable correspondante",
      "Le comptable doit vérifier manuellement chaque carton reçu pour écrire son journal",
      "L'ERP bloque toutes les ventes le temps d'équilibrer les comptes",
      "Les comptes ne sont recalculés qu'à la fin de l'année civile"
    ],
    a: 0,
    e: "L'intégration comptable automatique lors des événements logistiques évite les décalages de valeur et facilite les clôtures."
  },
  {
    id: 12,
    ch: 1,
    q: "Quel est l'objectif principal d'un ERP dans une organisation ?",
    o: [
      "Créer des pages web de présentation commerciale",
      "Gérer les réseaux sociaux et la messagerie publique",
      "Centraliser les processus fonctionnels d'une organisation autour d'une base de données commune",
      "Remplacer l'intégralité des employés par des scripts informatiques"
    ],
    a: 2,
    e: "Un ERP vise à centraliser et harmoniser tous les processus fonctionnels (RH, finance, supply chain) pour assurer une version unique de la réalité."
  },
  {
    id: 13,
    ch: 1,
    q: "Pourquoi dit-on qu'un ERP augmente l'intégrité des données ?",
    o: [
      "Parce qu'il empêche les incohérences en appliquant des règles de validation strictes au sein d'un référentiel unique",
      "Parce qu'il chiffre toutes les données en masquant les chiffres aux directeurs",
      "Parce qu'il conserve les données uniquement dans la mémoire RAM volatile",
      "Parce qu'il interdit toute modification de données à tout le monde"
    ],
    a: 0,
    e: "Le référentiel unique élimine les conflits de versions de données (ex: deux adresses différentes pour un même client)."
  },
  {
    id: 14,
    ch: 1,
    q: "Qu'est-ce qu'un ERP propriétaire ?",
    o: [
      "Un progiciel dont le code source appartient à un éditeur et dont l'usage requiert des licences payantes",
      "Un ERP hébergé uniquement chez le président de l'entreprise",
      "Un système développé à 100% en interne par les stagiaires de l'entreprise",
      "Un logiciel livre que tout le monde peut modifier sans restriction"
    ],
    a: 0,
    e: "Les ERP propriétaires (SAP, Oracle, Microsoft Dynamics) nécessitent le paiement de licences et de contrats de maintenance."
  },
  {
    id: 15,
    ch: 1,
    q: "Quel est l'avantage principal d'un ERP open-source comme Odoo Community ?",
    o: [
      "L'accès au code source permettant une grande flexibilité de personnalisation sans coût initial de licence d'éditeur",
      "La garantie absolue que le logiciel ne contient aucun bug informatique",
      "L'absence totale de besoin d'hébergement ou de serveur physique",
      "La possibilité de l'utiliser sans aucune équipe technique ni formation"
    ],
    a: 0,
    e: "L'open-source supprime les barrières de coût de licence directe, bien que l'implémentation et l'intégration restent payantes."
  },
  {
    id: 16,
    ch: 1,
    q: "Quel est l'intérêt de l'intégration des systèmes d'information (SI) ?",
    o: [
      "Complexifier les tâches administratives quotidiennes",
      "Éliminer les silos d'information au sein des services",
      "Freiner la prise de décisions stratégiques",
      "Multiplier le nombre de progiciels indépendants"
    ],
    a: 1,
    e: "L'intégration connecte les applications et fluidifie l'échange de données pour supprimer les doublons et les silos métiers."
  },
  {
    id: 17,
    ch: 1,
    q: "Quels sont les trois types de flux d'information dans une organisation ?",
    o: [
      "Direct, indirect, mixte",
      "Analytique, transactionnel, décisionnel",
      "Verticaux, horizontaux, transversaux",
      "National, régional, local"
    ],
    a: 2,
    e: "Les flux circulent verticalement (hiérarchie), horizontalement (processus métiers) et transversalement (collaboration inter-services)."
  },

  // Chapitre 2: Automatisation (18 à 34)
  {
    id: 18,
    ch: 2,
    q: "La RPA (Robotic Process Automation) permet de :",
    o: [
      "Reproduire les actions humaines pour automatiser des tâches répétitives",
      "Piloter les véhicules autonomes de livraison",
      "Créer des designs graphiques et des chartes de site web",
      "Réparer les machines de production industrielles"
    ],
    a: 0,
    e: "La RPA simule les clics et saisies d'un opérateur humain pour automatiser des tâches répétitives et basées sur des règles."
  },
  {
    id: 19,
    ch: 2,
    q: "Quel type de tâche est le meilleur candidat pour une automatisation par RPA ?",
    o: [
      "Une tâche répétitive, basée sur des règles stables et nécessitant la saisie ou le transfert de données structurées",
      "Une prise de décision hautement stratégique exigeant de l'empathie humaine",
      "Une réunion de négociation commerciale avec un client mécontent",
      "La conception créative de la nouvelle charte graphique du site web"
    ],
    a: 0,
    e: "Les tâches structurées, répétitives et à faible valeur ajoutée (ex: copier des lignes de facture d'un PDF à un écran) sont idéales pour la RPA."
  },
  {
    id: 20,
    ch: 2,
    q: "Quelle est la différence fondamentale entre la RPA et un workflow traditionnel ?",
    o: [
      "La RPA agit au niveau de l'interface utilisateur existante sans modifier les applications profondes, tandis que le workflow orchestre des flux via des API ou des intégrations de systèmes",
      "Le workflow utilise obligatoirement des robots en métal physique alors que la RPA n'est que logicielle",
      "La RPA ne fonctionne que sur les téléphones mobiles et les tablettes tactiles",
      "La RPA est réservée aux bases de données SQL alors que le workflow n'utilise que des fichiers Excel"
    ],
    a: 0,
    e: "La RPA simule l'interaction humaine sur des écrans existants, ce qui évite de lourds développements d'intégration système."
  },
  {
    id: 21,
    ch: 2,
    q: "Qu'est-ce qu'un robot RPA 'assisté' (attended) ?",
    o: [
      "Un robot logiciel qui s'exécute sur le poste de travail de l'utilisateur et nécessite son déclenchement ou sa supervision",
      "Un robot qui a besoin d'un clavier physique en or pour fonctionner",
      "Un script qui s'exécute uniquement la nuit sur des serveurs distants éteints",
      "Un programme qui répond au téléphone à la place du support technique"
    ],
    a: 0,
    e: "Le robot assisté collabore avec l'employé (ex: pré-remplir un formulaire à la demande pour faire gagner du temps)."
  },
  {
    id: 22,
    ch: 2,
    q: "Qu'est-ce qu'un robot RPA 'non assisté' (unattended) ?",
    o: [
      "Un robot fonctionnant de manière totalement autonome sur des serveurs dédiés, planifié ou déclenché par des événements",
      "Un robot logiciel qui refuse les connexions réseau des utilisateurs administratifs",
      "Un script qui s'est arrêté de fonctionner par manque de maintenance",
      "Un algorithme qui modifie son code source sans autorisation"
    ],
    a: 0,
    e: "Les robots non assistés traitent les gros volumes en arrière-plan sans intervention humaine (ex: traitement de nuit des factures)."
  },
  {
    id: 23,
    ch: 2,
    q: "Qu'est-ce que l'hyperautomatisation ?",
    o: [
      "L'association de plusieurs technologies (RPA, IA, Machine Learning, Process Mining) pour automatiser un maximum de processus complexes",
      "Le fait de faire tourner un processeur informatique à sa vitesse maximale absolue",
      "Un outil ERP de création de graphiques 3D en temps réel",
      "L'interdiction légale d'employer des humains dans les bureaux d'une entreprise"
    ],
    a: 0,
    e: "L'hyperautomatisation dépasse la simple automatisation de tâches simples pour piloter de bout en bout des processus d'affaires complexes."
  },
  {
    id: 24,
    ch: 2,
    q: "Quelle technologie permet une interaction plus naturelle avec les utilisateurs au sein du SI ?",
    o: [
      "La géolocalisation en temps réel",
      "Le traitement du langage naturel (NLP/TLN)",
      "L'impression 3D d'objets physiques",
      "L'intelligence artificielle robotique"
    ],
    a: 1,
    e: "Le NLP/TLN (Natural Language Processing) permet de comprendre et générer du langage humain pour interroger naturellement l'ERP."
  },
  {
    id: 25,
    ch: 2,
    q: "Quelles sont les trois dimensions clés (les 3V) du Big Data ?",
    o: [
      "Volume, Vélocité, Variété",
      "Valeur, Virtualisation, Validation",
      "Vecteur, Visibilité, Vitesse",
      "Vérification, Volume, Voisinage"
    ],
    a: 0,
    e: "Le Big Data se caractérise par des volumes massifs, une vitesse de traitement en temps réel (vélocité) et des formats de données diversifiés (variété)."
  },
  {
    id: 26,
    ch: 2,
    q: "Comment le Machine Learning (ML) aide-t-il la prise de décision au sein d'un ERP moderne ?",
    o: [
      "En repérant des schémas récurrents dans l'historique des données pour faire des prédictions (ex: rupture de stock, maintenance prédictive)",
      "En écrivant les requêtes SQL à la place des développeurs de l'entreprise",
      "En réinitialisant les serveurs de base de données à chaque erreur système",
      "En envoyant des notifications aléatoires aux clients pour tester le réseau"
    ],
    a: 0,
    e: "Le ML analyse les tendances passées pour anticiper les comportements futurs et optimiser les flux de la supply chain ou des ventes."
  },
  {
    id: 27,
    ch: 2,
    q: "Qu'est-ce que l'OCR (Optical Character Recognition) apporte à la saisie de factures par RPA ?",
    o: [
      "Elle convertit le texte d'un document scanné ou PDF en données structurées exploitables par le robot",
      "Elle efface automatiquement les factures comportant des montants trop élevés",
      "Elle permet de stocker les images des factures dans des fichiers audios",
      "Elle protège les imprimantes de bureau contre les cyberattaques"
    ],
    a: 0,
    e: "L'OCR traduit l'image d'une facture papier en texte numérique lisible, que la RPA peut ensuite saisir dans l'ERP."
  },
  {
    id: 28,
    ch: 2,
    q: "Quel est l'intérêt du Low-code / No-code dans les stratégies d'automatisation des SI ?",
    o: [
      "Permettre aux utilisateurs métiers de concevoir des automatisations simples sans avoir à écrire de lignes de code complexes",
      "Accélérer le débit internet du réseau local de l'entreprise",
      "Remplacer les serveurs virtuels par des calculatrices de bureau",
      "Rendre obligatoire l'utilisation de terminaux Unix pour tout le monde"
    ],
    a: 0,
    e: "Le Low-code démocratise l'automatisation en créant des applications de flux visuelles accessibles aux équipes fonctionnelles."
  },
  {
    id: 29,
    ch: 2,
    q: "Quel danger comporte l'automatisation d'un processus mal conçu ?",
    o: [
      "Elle propage et accélère les erreurs à très grande échelle sans résoudre le problème organisationnel de fond",
      "Elle détruit physiquement les disques durs des serveurs web",
      "Elle oblige l'entreprise à changer de nom commercial immédiatement",
      "Elle supprime la licence d'utilisation du système d'exploitation Windows"
    ],
    a: 0,
    e: "Automatiser un processus inefficace ne fait que générer des erreurs plus vite. Il faut d'abord optimiser le processus avant de l'automatiser."
  },
  {
    id: 30,
    ch: 2,
    q: "Qu'est-ce que le Process Mining ?",
    o: [
      "L'analyse des journaux d'événements (event logs) du SI pour reconstituer et visualiser les processus réels tels qu'ils sont exécutés",
      "Une technique d'extraction minière utilisant des ordinateurs de bureau pour chercher de l'or",
      "Un protocole de chiffrement des e-mails internes de l'entreprise",
      "La suppression des comptes d'utilisateurs inactifs dans l'ERP"
    ],
    a: 0,
    e: "Le Process Mining révèle la réalité du terrain (écarts par rapport au modèle théorique, goulots d'étranglement) à partir des traces laissées dans le SI."
  },
  {
    id: 31,
    ch: 2,
    q: "Dans quel cas la RPA est-elle préférable à une intégration par API ?",
    o: [
      "Lorsque le système cible est ancien (legacy), ne possède pas d'API disponible, et que son remplacement est trop coûteux",
      "Lorsque l'on veut transférer des gigaoctets de données par seconde de manière ultra-performante",
      "Lorsque la base de données SQL sous-jacente est en cours de réplication synchrone",
      "Lorsque l'on souhaite réécrire le code source du progiciel métier"
    ],
    a: 0,
    e: "La RPA s'interface avec l'existant sans exiger de modifications techniques lourdes de la part des éditeurs de logiciels anciens."
  },
  {
    id: 32,
    ch: 2,
    q: "Comment l'IA générative peut-elle s'interfacer avec un ERP ?",
    o: [
      "En rédigeant des résumés de performances, en répondant à des questions complexes sur les données financières ou en rédigeant des e-mails de relance",
      "En modifiant directement la structure physique des tables SQL sans validation",
      "En limitant l'utilisation des ressources réseau à un seul ordinateur",
      "En stockant des images de produits sous forme de code assembleur"
    ],
    a: 0,
    e: "L'IA générative sert de facilitateur de communication et d'aide à l'analyse de données d'affaires en langage naturel."
  },
  {
    id: 33,
    ch: 2,
    q: "Qu'est-ce qu'une tâche 'cognitive' en automatisation ?",
    o: [
      "Une tâche qui exige une interprétation humaine (comme lire un commentaire client pour savoir s'il est content ou non)",
      "Une tâche de calcul mathématique simple effectuée sur un tableur",
      "Le transfert physique d'un disque dur d'un serveur à un autre",
      "L'allumage d'une imprimante à distance par le service informatique"
    ],
    a: 0,
    e: "Les tâches cognitives requièrent des technologies d'IA (NLP, classification d'images) car elles ne se résolvent pas par de simples règles statiques."
  },
  {
    id: 34,
    ch: 2,
    q: "Dans un projet de RPA, pourquoi la maintenance des scripts de robots est-elle cruciale ?",
    o: [
      "Parce que la moindre modification visuelle de l'application cible (bouton déplacé, nouveau champ) peut bloquer le robot",
      "Parce que les robots en métal se détériorent physiquement après quelques heures de calcul",
      "Parce que le système d'exploitation supprime les robots toutes les 24 heures",
      "Parce que le coût d'une ligne de code augmente avec sa durée de vie"
    ],
    a: 0,
    e: "La RPA étant branchée sur l'interface graphique (UI), elle est sensible aux changements cosmétiques des applications cibles."
  },

  // Chapitre 3: Intégration du SI (35 à 51)
  {
    id: 35,
    ch: 3,
    q: "Qu'est-ce que l'EAI (Enterprise Application Integration) ?",
    o: [
      "Un ensemble d'outils et d'architectures permettant de connecter des applications hétérogènes au sein d'une entreprise",
      "Un protocole de messagerie chiffrée utilisé uniquement dans l'administration publique",
      "Une méthode de modélisation géologique basée sur les systèmes d'information",
      "L'installation automatique de logiciels bureautiques sur les PC des employés"
    ],
    a: 0,
    e: "L'EAI facilite la circulation des messages et le partage d'informations métier entre applications différentes."
  },
  {
    id: 36,
    ch: 3,
    q: "Quelle est la limite majeure d'une architecture d'intégration 'Point à Point' ?",
    o: [
      "Elle devient rapidement ingérable en grandissant, car le nombre de connexions nécessaires augmente de manière quadratique",
      "Elle interdit l'utilisation du protocole HTTPS pour sécuriser les échanges",
      "Elle impose l'achat de serveurs physiques uniquement de marque propriétaire",
      "Elle ralentit la vitesse de traitement de la base de données ERP"
    ],
    a: 0,
    e: "Avec N applications, le Point à Point nécessite jusqu'à N*(N-1)/2 liaisons. Pour 10 applications, cela fait 45 connexions à maintenir."
  },
  {
    id: 37,
    ch: 3,
    q: "Comment fonctionne une architecture d'intégration en étoile (Hub and Spoke) ?",
    o: [
      "Toutes les applications se connectent à un serveur central (le Hub) qui traduit et redirige les messages vers les destinataires (les Spokes)",
      "Chaque ordinateur communique directement avec tous les autres ordinateurs du réseau local",
      "Les données circulent en cercle d'une application à la suivante jusqu'à revenir au point de départ",
      "Le système n'utilise aucun serveur et stocke les données sur des fichiers textes partagés"
    ],
    a: 0,
    e: "Le Hub centralise les connexions, ce qui réduit le nombre d'interfaces nécessaires à seulement N connexions pour N applications."
  },
  {
    id: 38,
    ch: 3,
    q: "Quel est le risque principal (SPOF) d'une architecture en étoile (Hub and Spoke) ?",
    o: [
      "Si le Hub central tombe en panne, toute l'intégration entre toutes les applications est immédiatement coupée",
      "Le Hub consomme trop de bande passante et désactive internet dans l'entreprise",
      "Les spokes ne peuvent pas être codés dans des langages de programmation différents",
      "Le coût matériel est supérieur à la création de liaisons point à point infinies"
    ],
    a: 0,
    e: "Le Hub est un point unique de défaillance (Single Point of Failure). S'il s'arrête, aucun message ne circule."
  },
  {
    id: 39,
    ch: 3,
    q: "Quel est un inconvénient majeur d'une architecture ESB (Enterprise Service Bus) ?",
    o: [
      "Elle offre une flexibilité excessive aux équipes",
      "Elle impose une gouvernance centralisée parfois rigide",
      "Elle n'engendre aucun coût de mise en place",
      "Elle offre une très faible sécurité"
    ],
    a: 1,
    e: "La centralisation de l'ESB peut entraîner une rigidité administrative et technique, ralentissant l'agilité DevOps."
  },
  {
    id: 40,
    ch: 3,
    q: "Quelle est la fonction principale d'un ESB (Enterprise Service Bus) ?",
    o: [
      "Assurer le routage, la transformation de formats, et la médiation de protocoles entre applications communicantes",
      "Créer des sauvegardes quotidiennes des bases de données SQL",
      "Gérer le parc informatique et installer les systèmes d'exploitation sur les PC",
      "Bloquer le trafic internet entrant suspect à la manière d'un pare-feu"
    ],
    a: 0,
    e: "L'ESB permet à une application parlant XML/SOAP de communiquer de manière transparente avec une autre parlant JSON/REST."
  },
  {
    id: 41,
    ch: 3,
    q: "Quelle est la différence entre un couplage fort et un couplage faible entre applications ?",
    o: [
      "Le couplage fort exige que les applications connaissent la structure interne et soient synchrones, tandis que le couplage faible utilise des interfaces abstraites et souvent des messages asynchrones",
      "Le couplage fort utilise du câble de cuivre et le couplage faible utilise le réseau sans fil Wi-Fi",
      "Le couplage fort est réservé aux ERP propriétaires et le couplage faible aux applications mobiles",
      "Il n'y a aucune différence technique, ce sont des synonymes marketing"
    ],
    a: 0,
    e: "Le couplage faible (loose coupling) est recommandé car il permet de modifier ou de remplacer une application sans bloquer les autres."
  },
  {
    id: 42,
    ch: 3,
    q: "Que signifie l'acronyme iPaaS ?",
    o: [
      "Integration Platform as a Service",
      "Internet Protocol as a Service",
      "Intelligent Process Automation Suite",
      "Internal Platform for Application Security"
    ],
    a: 0,
    e: "L'iPaaS désigne une plateforme cloud permettant de construire, déployer et gouverner des intégrations entre applications cloud et sur site."
  },
  {
    id: 43,
    ch: 3,
    q: "Quel est l'avantage majeur de l'iPaaS pour une entreprise moderne ?",
    o: [
      "Des connecteurs préconfigurés pour lier rapidement des applications SaaS populaires (ex: Salesforce, Microsoft 365, ERP Cloud)",
      "La gratuité totale de l'hébergement de tous les serveurs virtuels de l'entreprise",
      "L'écriture automatique des rapports d'activité commerciale par un algorithme",
      "La suppression de la nécessité d'avoir des administrateurs système"
    ],
    a: 0,
    e: "L'iPaaS accélère les projets de connexion en proposant des intégrations en mode graphique et par glisser-déposer."
  },
  {
    id: 44,
    ch: 3,
    q: "Dans l'intégration asynchrone, à quoi sert une file d'attente de messages (Message Queue) ?",
    o: [
      "À stocker temporairement les messages si le destinataire est temporairement indisponible, garantissant la livraison future sans bloquer l'expéditeur",
      "À trier les requêtes SQL selon leur temps d'exécution estimé",
      "À bloquer les spams dans la boîte de messagerie de l'administrateur",
      "À forcer la déconnexion des utilisateurs inactifs de l'ERP"
    ],
    a: 0,
    e: "Le stockage en file d'attente (comme RabbitMQ ou ActiveMQ) découple les applications dans le temps, améliorant la résilience du SI."
  },
  {
    id: 45,
    ch: 3,
    q: "Dans une architecture microservices agile, comment les services s'intègrent-ils le plus souvent ?",
    o: [
      "Via des API HTTP/REST légères ou des bus de messages d'événements asynchrones",
      "En partageant directement la même base de données SQL physique et unique",
      "En copiant leur code source dans un seul dépôt Git gigantesque et monolithique",
      "En passant par des transferts de fichiers plats CSV par e-mail automatique"
    ],
    a: 0,
    e: "L'architecture microservices privilégie les API et la communication par événements pour garder les services indépendants."
  },
  {
    id: 46,
    ch: 3,
    q: "Qu'est-ce que la transformation de format de données par un middleware d'intégration ?",
    o: [
      "Convertir les données envoyées par la source dans le format attendu par la cible (ex: de CSV vers JSON)",
      "Changer le style CSS des pages web de l'application cliente",
      "Supprimer les caractères non numériques des mots de passe des utilisateurs",
      "Chiffrer le disque dur du serveur de base de données"
    ],
    a: 0,
    e: "La transformation de message garantit que les applications parlant des langages différents se comprennent sans modification de leur code source."
  },
  {
    id: 47,
    ch: 3,
    q: "Qu'est-ce qu'une intégration synchrone ?",
    o: [
      "Un échange où l'émetteur attend immédiatement la réponse du récepteur avant de poursuivre son exécution",
      "Une connexion où les ordinateurs doivent utiliser la même horloge matérielle",
      "Un transfert de données qui ne s'effectue qu'aux heures pleines de la journée",
      "La synchronisation périodique des fichiers de configuration"
    ],
    a: 0,
    e: "L'intégration synchrone (ex: appel REST direct) lie l'activité du client à la disponibilité immédiate du serveur."
  },
  {
    id: 48,
    ch: 3,
    q: "Qu'est-ce qu'une intégration asynchrone ?",
    o: [
      "Un échange où l'émetteur envoie son message et continue ses tâches sans attendre de réponse immédiate",
      "Un transfert qui se produit de manière aléatoire sans utiliser de réseau",
      "Une synchronisation manuelle des données par les administrateurs une fois par mois",
      "Le stockage des bases de données sur des bandes magnétiques déconnectées"
    ],
    a: 0,
    e: "L'asynchronisme réduit les dépendances en temps réel entre applications, renforçant la tolérance aux pannes du SI."
  },
  {
    id: 49,
    ch: 3,
    q: "Que désigne le terme 'ESB monolithique' par rapport à l'intégration moderne cloud-native ?",
    o: [
      "Un bus de services lourd, centralisé, qui peut de venir complexe à faire évoluer et poser des soucis d'agilité pour les équipes DevOps",
      "Un serveur d'intégration fait en pierre de construction physique",
      "Un logiciel réseau qui refuse les connexions provenant des services Cloud",
      "Un système de gestion de bases de données qui n'autorise que des requêtes simples"
    ],
    a: 0,
    e: "Les organisations modernes décentralisent souvent l'intégration (ex: via des architectures orientées événements et API) pour éviter de recréer un goulot d'étranglement centralisé."
  },
  {
    id: 50,
    ch: 3,
    q: "Quel rôle joue un 'schema registry' dans l'intégration par bus d'événements ?",
    o: [
      "Il définit et valide la structure des messages échangés pour éviter qu'un changement de format ne casse les applications réceptrices",
      "Il gère les adresses IP physiques des serveurs réseau de l'entreprise",
      "Il archive les adresses mails des administrateurs système",
      "Il remplace le mot de passe principal de l'ERP"
    ],
    a: 0,
    e: "Le registre de schémas s'assure que les producteurs et consommateurs d'événements respectent un contrat d'interface commun."
  },
  {
    id: 51,
    ch: 3,
    q: "Pourquoi le nettoyage et la validation des données en entrée du middleware d'intégration sont-ils importants ?",
    o: [
      "Pour éviter que des données corrompues ou mal formées n'atteignent et ne perturbent les applications cibles (Garbage In, Garbage Out)",
      "Pour accélérer la vitesse de calcul des cartes graphiques du serveur",
      "Pour libérer de l'espace de stockage sur les serveurs de messagerie",
      "Pour forcer les utilisateurs à ressaisir leurs coordonnées"
    ],
    a: 0,
    e: "Le middleware doit servir de filtre qualité pour garantir que seules des données conformes circulent dans le SI."
  },

  // Chapitre 4: Processus métiers (52 à 68)
  {
    id: 52,
    ch: 4,
    q: "Qu'est-ce qu'un processus métier dans une entreprise ?",
    o: [
      "Un enchaînement d'activités logiques et corrélées, réalisées par différents acteurs, pour fournir un produit ou un service à un client",
      "Le fonctionnement physique de la mémoire vive lors de l'exécution du logiciel ERP",
      "Une liste de définitions techniques rédigée par l'administrateur système",
      "L'organigramme hiérarchique montrant les salaires des directeurs"
    ],
    a: 0,
    e: "Un processus métier (business process) traverse souvent plusieurs services de l'entreprise pour créer de la valeur client."
  },
  {
    id: 53,
    ch: 4,
    q: "Quelle est la différence fondamentale entre un processus et une procédure ?",
    o: [
      "Le processus décrit le 'quoi' (le flux global et les résultats visés), tandis que la procédure décrit le 'comment' détaillé (les étapes précises à exécuter)",
      "Le processus est uniquement réservé à la direction générale et la procédure concerne les stagiaires",
      "La procédure est logicielle alors que le processus est uniquement manuel",
      "Il n'y a pas de différence, les deux termes décrivent la même documentation technique"
    ],
    a: 0,
    e: "Le processus donne la vue d'ensemble et la valeur créée. La procédure est le mode d'emploi d'une tâche précise."
  },
  {
    id: 54,
    ch: 4,
    q: "Que signifie le sigle BPMN dans la modélisation des processus ?",
    o: [
      "Business Process Model and Notation",
      "Basic Program Management Network",
      "Business Product Measurement Node",
      "Binary Process Mapping Notation"
    ],
    a: 0,
    e: "BPMN (Business Process Model and Notation) est le standard international pour modéliser graphiquement les processus métiers."
  },
  {
    id: 55,
    ch: 4,
    q: "En BPMN, à quoi sert un couloir (lane) à l'intérieur d'un bassin (pool) ?",
    o: [
      "À matérialiser le rôle, le service ou la responsabilité qui exécute les tâches placées dans ce couloir",
      "À séparer les bases de données SQL physiques de l'entreprise",
      "À indiquer le temps d'attente réseau entre deux serveurs informatiques",
      "À ranger les sauvegardes de fichiers par ordre chronologique"
    ],
    a: 0,
    e: "Les couloirs permettent de visualiser instantanément qui fait quoi (ex: couloir 'Comptabilité', couloir 'Logistique')."
  },
  {
    id: 56,
    ch: 4,
    q: "En BPMN, quel symbole représente une passerelle (gateway) de décision ou d'aiguillage ?",
    o: [
      "Un losange",
      "Un cercle à bord fin",
      "Un rectangle à coins arrondis",
      "Un cercle à bord épais"
    ],
    a: 0,
    e: "Les losanges représentent les passerelles logiques (exclusives XOR, parallèles AND, inclusives OR) qui régissent le flux du processus."
  },
  {
    id: 57,
    ch: 4,
    q: "Quelle est la signification d'une passerelle parallèle (AND) en BPMN ?",
    o: [
      "Elle sépare le flux en plusieurs chemins devant tous être exécutés en parallèle, ou attend que tous se terminent pour continuer",
      "Elle permet de choisir un seul chemin parmi plusieurs possibilités selon une condition stricte",
      "Elle arrête définitivement l'exécution du processus en cours",
      "Elle envoie un message réseau synchrone à une autre application"
    ],
    a: 0,
    e: "La passerelle parallèle n'a pas de condition de choix : toutes les branches sortantes s'activent en même temps."
  },
  {
    id: 58,
    ch: 4,
    q: "Qu'est-ce qu'un flux de message (flèche en pointillés) en BPMN ?",
    o: [
      "Une flèche indiquant un échange d'information ou de document entre deux bassins (pools) différents",
      "L'ordre séquentiel d'exécution des tâches au sein du même couloir",
      "Un câble réseau reliant deux serveurs de messagerie",
      "Une règle de validation de données dans la base de l'ERP"
    ],
    a: 0,
    e: "Les flux de messages montrent la collaboration entre entités indépendantes (ex: entre le Client et l'Entreprise)."
  },
  {
    id: 59,
    ch: 4,
    q: "Qu'est-ce qu'un indicateur clé de performance (KPI) ?",
    o: [
      "Une mesure quantifiable permettant de suivre l'efficacité et l'atteinte des objectifs d'un processus",
      "Un outil de chiffrement des données de l'ERP",
      "Une méthode de développement informatique rapide",
      "L'indice de performance d'un processeur de serveur"
    ],
    a: 0,
    e: "Les KPI (Key Performance Indicators) mesurent le succès d'un processus (ex: délai moyen de traitement d'une commande)."
  },
  {
    id: 60,
    ch: 4,
    q: "Dans la méthodologie SMART, que signifie la lettre 'M' pour un objectif ?",
    o: [
      "Mesurable",
      "Moderne",
      "Modularisé",
      "Matériel"
    ],
    a: 0,
    e: "SMART signifie Spécifique, Mesurable, Atteignable, Réaliste et Temporel. Un objectif doit pouvoir être mesuré pour savoir s'il est atteint."
  },
  {
    id: 61,
    ch: 4,
    q: "Que désigne un flux horizontal (ou transversal) dans la gestion des processus ?",
    o: [
      "La circulation de l'information à travers différents départements métiers pour délivrer le service final",
      "La transmission d'ordres hiérarchiques de la direction vers les subordonnés",
      "Le positionnement physique des serveurs dans la baie de brassage",
      "L'affichage des données de gauche à droite sur un écran d'ordinateur"
    ],
    a: 0,
    e: "Les flux transversaux dépassent les silos fonctionnels de l'entreprise pour suivre le parcours complet d'une demande client."
  },
  {
    id: 62,
    ch: 4,
    q: "Dans le processus 'Order-to-Cash' (de la commande à l'encaissement), quel module de l'ERP intervient en premier ?",
    o: [
      "Le module Gestion des Ventes (commercial)",
      "Le module Comptabilité Générale",
      "Le module Gestion de la Production",
      "Le module Ressources Humaines"
    ],
    a: 0,
    e: "Le processus démarre par la saisie ou la réception d'une commande client gérée par le module Ventes/ADV."
  },
  {
    id: 63,
    ch: 4,
    q: "Qu'est-ce qu'un goulot d'étranglement (bottleneck) dans un processus métier ?",
    o: [
      "L'étape la plus lente qui limite la capacité de production globale du processus et crée des retards",
      "Une erreur système provoquant le redémarrage des serveurs web",
      "Un protocole réseau limitant le nombre de connexions SQL simultanées",
      "Un dossier d'archives physiques inaccessible aux employés"
    ],
    a: 0,
    e: "Le goulot d'étranglement dicte le rythme maximum du processus. C'est l'étape prioritaire à optimiser pour améliorer le débit global."
  },
  {
    id: 64,
    ch: 4,
    q: "Que signifie le sigle BPM ?",
    o: [
      "Business Process Management",
      "Basic Program Management",
      "Binary Product Mapping",
      "Business Protocol Measure"
    ],
    a: 0,
    e: "Le BPM (Business Process Management) regroupe les méthodes et outils pour concevoir, exécuter, mesurer et optimiser les processus."
  },
  {
    id: 65,
    ch: 4,
    q: "Pourquoi le rôle de propriétaire de processus (Process Owner) est-il important ?",
    o: [
      "Il est le garant de la performance globale et de l'amélioration continue du processus de bout en bout",
      "Il possède les serveurs physiques hébergeant l'ERP de l'entreprise",
      "Il est le seul utilisateur autorisé à saisir des factures comptables",
      "Il est chargé de l'administration réseau et de la sécurité des mots de passe"
    ],
    a: 0,
    e: "Le Process Owner arbitre les conflits entre départements et s'assure que le processus reste efficace de manière globale."
  },
  {
    id: 66,
    ch: 4,
    q: "Dans la boucle d'amélioration continue PDCA, que signifie l'étape 'C' ?",
    o: [
      "Check (Vérifier / Mesurer)",
      "Create (Créer)",
      "Control (Contrôler la sécurité)",
      "Change (Changer immédiatement)"
    ],
    a: 0,
    e: "PDCA signifie Plan (Planifier), Do (Faire), Check (Vérifier / Analyser les écarts) et Act (Ajuster / Agir)."
  },
  {
    id: 67,
    ch: 4,
    q: "Quel est l'objectif premier d'une démarche d'alignement stratégique des processus ?",
    o: [
      "S'assurer que les processus opérationnels servent directement la stratégie commerciale globale de l'entreprise",
      "Vérifier que tous les PC de l'entreprise utilisent le même processeur",
      "Réduire à zéro le nombre d'ordinateurs connectés au réseau internet",
      "Garantir que le code source du progiciel ne subit aucun changement"
    ],
    a: 0,
    e: "L'alignement stratégique garantit que l'énergie opérationnelle se déploie dans le sens des buts à long terme fixés par la direction."
  },
  {
    id: 68,
    ch: 4,
    q: "Dans un diagramme BPMN, quel symbole matérialise le démarrage d'un processus ?",
    o: [
      "Un cercle vert ou à bord simple très fin",
      "Un losange rouge",
      "Un rectangle bleu à coins arrondis",
      "Une flèche en gras double"
    ],
    a: 0,
    e: "Un cercle simple représente un événement de début (Start Event) qui initie le déroulement du flux."
  },

  // Chapitre 5: Modules ERP (69 à 84)
  {
    id: 69,
    ch: 5,
    q: "Quel est le rôle principal du module Finance & Comptabilité dans un ERP ?",
    o: [
      "Centraliser les flux financiers, tenir les journaux comptables et éditer les rapports légaux (bilan, compte de résultat)",
      "Rédiger les fiches de poste et gérer les entretiens annuels d'évaluation",
      "Planifier le chargement des camions de livraison dans les entrepôts",
      "Calculer la résistance thermique des bâtiments industriels"
    ],
    a: 0,
    e: "Le module Finance est le récepteur universel des écritures automatiques générées par les autres modules (achats, ventes, stocks)."
  },
  {
    id: 70,
    ch: 5,
    q: "Quelle tâche relève directement de la gestion du module Ressources Humaines (RH) d'un ERP ?",
    o: [
      "La gestion de la paie, le suivi des temps de travail et la planification des formations",
      "La facturation des clients en fin de mois",
      "L'établissement des bons de réception des matières premières",
      "La configuration des protocoles réseau de sécurité Wi-Fi"
    ],
    a: 0,
    e: "Le module RH gère le cycle de vie des collaborateurs, de leur embauche à la paie, en passant par le temps de présence."
  },
  {
    id: 71,
    ch: 5,
    q: "Dans un ERP, quelle est l'utilité du module Gestion des Achats (Purchasing/Procurement) ?",
    o: [
      "Gérer les appels d'offres, les contrats fournisseurs, les demandes d'achats et le suivi des livraisons entrantes",
      "Concevoir les publicités et les campagnes marketing de l'entreprise",
      "Calculer les commissions des commerciaux de terrain",
      "Prendre les rendez-vous de maintenance des PC de bureau"
    ],
    a: 0,
    e: "Le module Achats structure le processus d'approvisionnement en contrôlant les coûts et en automatisant les commandes."
  },
  {
    id: 72,
    ch: 5,
    q: "Quelle est la fonction clé du module de Gestion des Ventes (Sales/ADV) ?",
    o: [
      "Enregistrer les offres commerciales, valider les commandes clients et déclencher l'expédition et la facturation",
      "Recruter les nouveaux collaborateurs de l'équipe commerciale",
      "Valider les paiements des factures des fournisseurs de matières premières",
      "Mettre à jour les serveurs d'infrastructure physique"
    ],
    a: 0,
    e: "L'administration des ventes (ADV) gère tout le parcours client de la prise de contact à la validation de la commande."
  },
  {
    id: 73,
    ch: 5,
    q: "Dans quel cas le module de Gestion d'Entrepôt (WMS / Stocks) d'un ERP est-il sollicité ?",
    o: [
      "Pour suivre les niveaux de stock en temps réel, gérer les emplacements physiques dans les hangars et préparer les commandes",
      "Pour négocier les tarifs d'achat des matières premières",
      "Pour calculer le taux d'imposition annuelle de la société",
      "Pour planifier les heures de présence des équipes de sécurité"
    ],
    a: 0,
    e: "Le module WMS (Warehouse Management System) ou de gestion des stocks optimise la place et les mouvements d'articles."
  },
  {
    id: 74,
    ch: 5,
    q: "Qu'est-ce que le calcul des besoins en composants (MRP) réalisé par le module de Production ?",
    o: [
      "L'analyse automatisée de la demande et des stocks pour planifier les ordres de fabrication et d'achat de matières premières nécessaires",
      "Un outil comptable de vérification de l'intégrité de la caisse physique",
      "Le suivi du temps de chargement des serveurs SQL pendant les calculs",
      "La répartition géographique des clients sur une carte vectorielle"
    ],
    a: 0,
    e: "Le MRP (Material Requirements Planning) planifie les lancements en production pour éviter les ruptures tout en limitant les stocks."
  },
  {
    id: 75,
    ch: 5,
    q: "Qu'est-ce qu'un ERP verticalisé ou ERP de niche ?",
    o: [
      "Un ERP préconfiguré pour répondre aux exigences spécifiques d'un secteur d'activité particulier (ex: la santé, le BTP, la mode)",
      "Un ERP installé uniquement sur des serveurs disposés à la verticale",
      "Un progiciel géré exclusivement par des stagiaires juniors",
      "Un logiciel réseau qui n'autorise que 3 utilisateurs simultanés"
    ],
    a: 0,
    e: "Les ERP verticalisés intègrent des fonctionnalités métiers prêtes à l'emploi, limitant le besoin de développements sur mesure."
  },
  {
    id: 76,
    ch: 5,
    q: "Quel est l'aspect principal d'un déploiement ERP 'On-Premise' ?",
    o: [
      "Le logiciel est hébergé localement sur les serveurs physiques et l'infrastructure propre de l'entreprise",
      "Le progiciel est loué sous forme d'abonnement mensuel hébergé par l'éditeur",
      "Le système fonctionne sans électricité grâce à une batterie externe",
      "Le code source du logiciel est partagé publiquement sur internet"
    ],
    a: 0,
    e: "On-Premise (sur site) implique que l'entreprise possède ses serveurs, gère la sécurité physique et la maintenance technique."
  },
  {
    id: 77,
    ch: 5,
    q: "Qu'est-ce que le modèle SaaS appliqué à un ERP Cloud ?",
    o: [
      "Software as a Service : l'ERP est accessible via internet, hébergé et mis à jour par l'éditeur, payé sous forme d'abonnement",
      "System and Security : une licence à vie à installer sur chaque ordinateur portable",
      "Un protocole de cryptage des sauvegardes de bases de données",
      "La vente de serveurs physiques par l'éditeur de logiciels"
    ],
    a: 0,
    e: "Le SaaS (Software as a Service) supprime le besoin de gérer l'infrastructure matérielle sous-jacente de l'ERP."
  },
  {
    id: 78,
    ch: 5,
    q: "Quel est le bénéfice économique immédiat d'un ERP en mode Cloud SaaS par rapport à l'On-Premise ?",
    o: [
      "Des investissements initiaux (CAPEX) plus faibles car il n'y a pas de serveurs physiques d'infrastructure à acheter",
      "L'exemption totale d'impôts sur les bénéfices pour l'entreprise",
      "La réduction à zéro du coût des salaires de l'équipe commerciale",
      "L'attribution gratuite de tablettes à tous les clients de l'entreprise"
    ],
    a: 0,
    e: "Le Cloud bascule les coûts d'infrastructure vers des dépenses opérationnelles prévisibles (OPEX)."
  },
  {
    id: 79,
    ch: 5,
    q: "Quel avantage conserve un déploiement On-Premise pour certaines entreprises ?",
    o: [
      "Le contrôle total sur la localisation physique des données et le calendrier des mises à jour applicatives",
      "La vitesse d'accès au réseau internet mondial qui est doublée",
      "La gratuité des frais de formation pour tous les futurs utilisateurs",
      "La possibilité de faire fonctionner l'ERP sans installer aucun logiciel client"
    ],
    a: 0,
    e: "Certaines industries réglementées (défense, banque) préfèrent l'On-Premise pour des raisons strictes de souveraineté des données."
  },
  {
    id: 80,
    ch: 5,
    q: "Qu'est-ce qu'un ERP hybride ?",
    o: [
      "Une architecture où les fonctions critiques restent sur site (On-Premise) tandis que des modules annexes (ex: CRM) utilisent le Cloud",
      "Un ERP qui fonctionne à la fois sur des ordinateurs Apple et sur des calculatrices de bureau",
      "Un logiciel programmé à moitié en langage C et à moitié en assembleur",
      "Un système qui nécessite une saisie vocale et une saisie écrite"
    ],
    a: 0,
    e: "L'ERP hybride cherche le compromis entre la sécurité de l'existant sur site et la flexibilité du cloud."
  },
  {
    id: 81,
    ch: 5,
    q: "Dans un ERP, comment s'appelle le mécanisme limitant l'accès aux données financières de l'entreprise ?",
    o: [
      "La gestion des droits d'accès basée sur les rôles (RBAC)",
      "Le chiffrement asymétrique des câbles réseau",
      "La suppression de l'affichage de l'écran des comptables",
      "L'interdiction de se connecter en dehors des heures de bureau"
    ],
    a: 0,
    e: "La gestion basée sur les rôles (Role-Based Access Control) garantit qu'un magasinier ne puisse pas modifier le bilan comptable."
  },
  {
    id: 82,
    ch: 5,
    q: "À quoi sert la comptabilité analytique (contrôle de gestion) gérée par un ERP ?",
    o: [
      "À calculer la rentabilité par produit, par projet, par service ou par centre de coût",
      "À vérifier que les impôts de la société sont payés en temps et en heure",
      "À stocker les mots de passe des comptes des employés de l'entreprise",
      "À générer des factures d'achat aléatoires pour tromper la concurrence"
    ],
    a: 0,
    e: "La comptabilité analytique éclate les dépenses et recettes pour donner une vision décisionnelle de la performance interne."
  },
  {
    id: 83,
    ch: 5,
    q: "Comment le module SCM (Supply Chain Management) communique-t-il avec le module Achats ?",
    o: [
      "En lui transmettant automatiquement des besoins d'approvisionnement dès que le stock de sécurité est atteint",
      "En réinitialisent les commandes d'achat tous les lundis matin par sécurité",
      "En forçant les acheteurs à se déplacer physiquement dans les entrepôts",
      "Il ne communique pas, ce sont des applications totalement déconnectées"
    ],
    a: 0,
    e: "L'intégration interne assure que les alertes de stock se traduisent directement en demandes d'achat prêtes à être validées."
  },
  {
    id: 84,
    ch: 5,
    q: "Pourquoi l'unicité du référentiel 'Article' (Master Data) est-elle cruciale dans un ERP ?",
    o: [
      "Pour s'assurer que la production, le stockage, les ventes et les achats utilisent exactement le même code et la même description pour un article donné",
      "Pour interdire aux fournisseurs de modifier les prix de vente des produits",
      "Pour réduire la taille physique des bases de données SQL d'un facteur 100",
      "Pour pouvoir enregistrer les articles sans indiquer leur prix d'achat"
    ],
    a: 0,
    e: "Sans référentiel unique (Master Data Management), un même produit peut avoir des codes différents selon les services, créant des erreurs logistiques."
  },

  // Chapitre 6: Avenir et défis (85 à 100)
  {
    id: 85,
    ch: 6,
    q: "Qu'est-ce qu'un ERP composable (Composable ERP) dans les tendances actuelles ?",
    o: [
      "Une plateforme ERP moderne constituée d'applications cloud interconnectées par API qu'on peut facilement ajouter ou remplacer",
      "Un système ERP livré en kit de pièces informatiques physiques à assembler soi-même",
      "Un progiciel historique codé dans un langage informatique des années 1970",
      "Un logiciel de comptabilité ne proposant que de saisir des écritures"
    ],
    a: 0,
    e: "L'ERP composable s'éloigne du gros monolithe rigide pour offrir une suite agile de micro-services métier connectés."
  },
  {
    id: 86,
    ch: 6,
    q: "Quel est l'intérêt de connecter l'Internet des Objets (IoT) à un ERP ?",
    o: [
      "Mettre à jour les stocks de manière automatique grâce à des capteurs physiques sur les machines ou colis",
      "Augmenter le nombre d'ordinateurs personnels de l'équipe informatique",
      "Désactiver l'accès réseau en cas d'absence prolongée de l'opérateur",
      "Remplacer les serveurs virtuels par des capteurs de température"
    ],
    a: 0,
    e: "L'IoT alimente l'ERP en données terrain réelles (géolocalisation, pannes de machines, inventaire automatique par puce RFID)."
  },
  {
    id: 87,
    ch: 6,
    q: "Pourquoi la mobilité est-elle devenue un standard pour les ERP modernes ?",
    o: [
      "Pour permettre aux techniciens de maintenance et commerciaux sur le terrain de saisir des rapports ou commandes en temps réel",
      "Pour forcer les salariés à travailler depuis leur domicile les week-ends",
      "Pour s'assurer que le logiciel ERP fonctionne sur les consoles de jeux portables",
      "Pour réduire la consommation électrique des serveurs physiques de l'entreprise"
    ],
    a: 0,
    e: "Les interfaces adaptées mobiles améliorent la productivité et la réactivité des équipes décentralisées."
  },
  {
    id: 88,
    ch: 6,
    q: "Qu'est-ce qu'un ERP collaboratif ?",
    o: [
      "Un ERP qui intègre des outils de communication (chat, commentaires, alertes) pour relier les données aux discussions des équipes",
      "Un système où deux entreprises partagent secrètement les mêmes comptes bancaires",
      "Un logiciel open-source modifiable par n'importe quel internaute anonyme",
      "Un système qui exige l'utilisation simultanée de deux souris d'ordinateur"
    ],
    a: 0,
    e: "L'ERP collaboratif évite de perdre le contexte d'une décision en rattachant les discussions d'équipe aux fiches clients ou factures concernées."
  },
  {
    id: 89,
    ch: 6,
    q: "Quel est un défi majeur lié aux compétences lors du déploiement d'un ERP ?",
    o: [
      "Un trop grand nombre de réseaux sociaux à gérer",
      "Le manque de communication externe",
      "Un déficit de compétences numériques au sein des équipes",
      "Un excès d'audits financiers réglementaires"
    ],
    a: 2,
    e: "La conduite du changement est indispensable pour pallier le déficit de compétences numériques des collaborateurs lors du déploiement."
  },
  {
    id: 90,
    ch: 6,
    q: "Comment se manifeste généralement la résistance au changement dans un projet ERP ?",
    o: [
      "Par un refus d'utiliser le système, des erreurs de saisie volontaires ou le maintien d'outils officieux (ex: fichiers Excel parallèles)",
      "Par une panne générale du réseau internet de la ville",
      "Par le piratage direct du code source de l'éditeur de logiciels",
      "Par la demande de démission de l'ensemble des administrateurs système"
    ],
    a: 0,
    e: "Pour contourner un ERP jugé trop complexe, les utilisateurs recréent souvent des silos (ex: fichiers Excel cachés), annulant les bénéfices de l'outil."
  },
  {
    id: 91,
    ch: 6,
    q: "Quels sont les coûts cachés fréquents d'un projet ERP ?",
    o: [
      "La formation des utilisateurs, le nettoyage préalable des données et la personnalisation des rapports",
      "L'achat de mobilier de bureau ergonomique pour l'équipe informatique",
      "L'abonnement à la connexion internet des domiciles des salariés",
      "Les frais de repas des équipes de développement lors des clôtures"
    ],
    a: 0,
    e: "Les entreprises sous-estiment souvent le budget nécessaire pour former les équipes et adapter les anciennes données."
  },
  {
    id: 92,
    ch: 6,
    q: "Que désigne le TCO (Total Cost of Ownership) pour un ERP ?",
    o: [
      "Le coût total de possession incluant l'acquisition, l'implémentation, le matériel, les abonnements, la formation et la maintenance sur plusieurs années",
      "Le tarif horaire d'un consultant junior d'intégration ERP",
      "Le coût physique d'un serveur d'infrastructure de marque propriétaire",
      "Le montant des taxes d'importation des progiciels étrangers"
    ],
    a: 0,
    e: "Calculer le TCO permet d'évaluer le coût réel du logiciel au-delà du simple prix de la licence d'achat initiale."
  },
  {
    id: 93,
    ch: 6,
    q: "Qu'est-ce qu'un déploiement ERP en mode 'Big Bang' ?",
    o: [
      "Activer l'ensemble des modules pour tous les utilisateurs au même moment lors d'une date unique de bascule",
      "Faire exploser physiquement les anciens serveurs lors de la mise en service",
      "Déployer l'ERP filiale par filiale de manière très progressive sur plusieurs années",
      "Mettre à jour l'application en cours de journée sans en avertir les employés"
    ],
    a: 0,
    e: "Le Big Bang est rapide mais risqué : si un bug majeur survient à la bascule, l'intégralité de l'activité de l'entreprise peut être paralysée."
  },
  {
    id: 94,
    ch: 6,
    q: "Pourquoi la sur-personnalisation (over-customization) du code d'un ERP est-elle déconseillée ?",
    o: [
      "Elle rend les futures mises à jour logicielles de l'éditeur extrêmement complexes, coûteuses et risquées",
      "Elle augmente le poids physique des ordinateurs des utilisateurs",
      "Elle est interdite par les protocoles réseau internet internationaux",
      "Elle empêche d'ajouter de nouveaux clients dans la base SQL"
    ],
    a: 0,
    e: "Modifier le code standard de l'ERP crée une dette technique. Il est préférable d'adapter ses processus au standard du logiciel."
  },
  {
    id: 95,
    ch: 6,
    q: "Quel est le rôle d'un intégrateur ERP ?",
    o: [
      "Une société tierce spécialisée chargée d'adapter, de paramétrer, de déployer l'ERP et de former les utilisateurs",
      "Le fabricant du processeur du serveur de base de données de l'entreprise",
      "L'éditeur qui détient le brevet d'écriture du code source propriétaire",
      "Le service de l'entreprise chargé uniquement d'installer le réseau Wi-Fi"
    ],
    a: 0,
    e: "L'intégrateur fait le lien entre les besoins métiers de l'entreprise et la réalité technique de la configuration du progiciel."
  },
  {
    id: 96,
    ch: 6,
    q: "Pourquoi le nettoyage des données avant migration est-il crucial pour un projet ERP ?",
    o: [
      "Pour éviter d'importer des doublons, des erreurs ou des données périmées dans le nouveau système propre (principe Garbage In, Garbage Out)",
      "Pour réduire le coût de la facture électrique des serveurs de migration",
      "Pour masquer les anciennes données financières à la direction de la société",
      "Pour s'assurer que les codes postaux n'utilisent que des lettres capitales"
    ],
    a: 0,
    e: "Une base de données ERP neuve et structurée nécessite des données de départ propres sous peine de bloquer immédiatement les processus opérationnels."
  },
  {
    id: 97,
    ch: 6,
    q: "Qu'est-ce qu'un Plan de Reprise d'Activité (PRA) appliqué à un ERP ?",
    o: [
      "Un ensemble de procédures techniques permettant de restaurer le fonctionnement de l'ERP en cas de panne majeure ou de sinistre",
      "La planification des vacances des employés après le déploiement du système",
      "Une réunion mensuelle entre la direction générale et les actionnaires de l'entreprise",
      "La réécriture complète du code informatique de l'application cliente"
    ],
    a: 0,
    e: "Le PRA décrit la stratégie de secours (sauvegardes distantes, serveurs miroirs) pour minimiser les interruptions d'activité."
  },
  {
    id: 98,
    ch: 6,
    q: "Pourquoi le soutien de la direction générale est-il un facteur clé de succès d'un projet ERP ?",
    o: [
      "Parce que le projet nécessite des arbitrages majeurs entre directions métiers et un fort investissement budgétaire et humain",
      "Parce que le directeur général est le seul à posséder les mots de passe root de l'infrastructure",
      "Parce qu'il doit configurer personnellement les paramètres de routage réseau",
      "Parce que la loi lui impose de programmer les tests de régression"
    ],
    a: 0,
    e: "Un projet ERP étant stratégique et organisationnel, il a besoin d'un leadership fort pour dépasser les résistances internes."
  },
  {
    id: 99,
    ch: 6,
    q: "Quelle est la durée de vie moyenne estimée d'un ERP avant son remplacement ou sa mise à jour majeure ?",
    o: [
      "Entre 10 et 15 ans",
      "Entre 6 et 12 mois",
      "Plus de 100 ans",
      "Entre 2 et 3 ans"
    ],
    a: 0,
    e: "Un ERP est un investissement à long terme. Changer d'ERP est une opération lourde que les entreprises évitent de répéter trop souvent."
  },
  {
    id: 100,
    ch: 6,
    q: "Pourquoi la formation continue des utilisateurs est-elle nécessaire après la mise en service (Go-Live) de l'ERP ?",
    o: [
      "Pour s'assurer de l'adoption complète des fonctions, former les nouveaux employés et corriger les mauvaises pratiques développées sur le tas",
      "Parce que le logiciel modifie automatiquement l'ordre de ses menus toutes les semaines",
      "Pour s'assurer que les employés de bureau n'utilisent pas internet pour un usage personnel",
      "Parce que l'éditeur supprime les licences d'accès si aucun test n'est passé tous les mois"
    ],
    a: 0,
    e: "La formation continue pérennise l'investissement en garantissant que l'outil est exploité à son plein potentiel et de manière correcte."
  }
];
