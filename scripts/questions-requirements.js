/**
 * 100 QCM pour le cours Ingénierie du besoin
 * Intègre les questions de l'examen réel du Collège de Paris Supérieur (2024-2025)
 */
module.exports = [
  // Chapitre 1: Besoin vs exigence (1 à 17)
  {
    id: 1,
    ch: 1,
    q: "Lequel des énoncés suivants n'est pas un principe fondamental de l'ingénierie des exigences ?",
    o: [
      "Rétrospectives régulières",
      "Un travail systématique et discipliné",
      "Le triptyque Problème - Exigence - Solution",
      "L'orientation vers les valeurs"
    ],
    a: 0,
    e: "Les rétrospectives régulières sont un principe de gestion de projet agile (Scrum), alors que la distinction problème-exigence-solution ou la discipline systématique sont au cœur de l'ingénierie des exigences."
  },
  {
    id: 2,
    ch: 1,
    q: "Dans le cadre de l'ingénierie du besoin, un besoin est :",
    o: [
      "Une simple envie passagère",
      "Un élément né d'un manque ou d'une attente",
      "Un rêve théorique",
      "Un caprice du client"
    ],
    a: 1,
    e: "Un besoin naît d'un manque ou d'une frustration rencontrée par l'utilisateur, qu'il cherche à combler."
  },
  {
    id: 3,
    ch: 1,
    q: "Si un client exprime : 'Je veux que l'application soit très rapide', qu'est-ce que c'est ?",
    o: [
      "Un besoin vague qui doit être clarifié et traduit en exigence quantifiable.",
      "Une exigence système finale prête pour la programmation.",
      "Une exigence fonctionnelle atomique.",
      "La description d'une contrainte matérielle de base."
    ],
    a: 0,
    e: "Le mot 'rapide' est subjectif. Il doit faire l'objet de mesures quantitatives (ex: temps de chargement en secondes) pour devenir une exigence."
  },
  {
    id: 4,
    ch: 1,
    q: "Quelle formulation transforme correctement le besoin 'le site doit être rapide' en exigence vérifiable ?",
    o: [
      "Chaque page du site doit se charger en moins de 2 secondes pour 100 utilisateurs simultanés.",
      "Le site doit être le plus rapide possible par rapport à la concurrence.",
      "Le développeur doit optimiser le code pour que le temps de réponse soit jugé agréable.",
      "Le site utilisera une base de données rapide connectée au réseau local."
    ],
    a: 0,
    e: "Cette formulation fixe un critère de succès précis (2 secondes) et un contexte de charge mesurable (100 utilisateurs)."
  },
  {
    id: 5,
    ch: 1,
    q: "Dans l'expression 'Le QUOI avant le COMMENT', à quoi fait référence le 'COMMENT' ?",
    o: [
      "La solution technique de conception et d'implémentation (ex: utiliser React ou PostgreSQL).",
      "Le besoin fonctionnel brut exprimé par les utilisateurs.",
      "Le budget alloué par la direction financière du projet.",
      "Les tests de validation conduits par les clients finaux."
    ],
    a: 0,
    e: "L'ingénierie des exigences se concentre sur le 'quoi' (le problème à résoudre) avant de décider du 'comment' (la technique)."
  },
  {
    id: 6,
    ch: 1,
    q: "Quelle est la principale cause d'échec d'un projet logiciel liée aux exigences ?",
    o: [
      "Des exigences mal définies, incomplètes ou changeant sans contrôle.",
      "L'utilisation d'ordinateurs portables trop anciens par les développeurs.",
      "L'absence de certificats de sécurité SSL en phase de maquettage.",
      "Le choix d'un langage de programmation moderne plutôt qu'ancien."
    ],
    a: 0,
    e: "Les études (comme le Chaos Report) montrent que les problèmes d'exigences (flou, dérive du périmètre) sont la première source d'échec."
  },
  {
    id: 7,
    ch: 1,
    q: "Qui rédige généralement le cahier des charges dans une relation client-fournisseur ?",
    o: [
      "Le fournisseur",
      "Le service commercial du prestataire",
      "Le client (ou l'assistance à maîtrise d'ouvrage)",
      "Les développeurs du système"
    ],
    a: 2,
    e: "C'est traditionnellement le client (ou la maîtrise d'ouvrage représentant ses intérêts) qui exprime ses besoins initiaux sous forme de cahier des charges."
  },
  {
    id: 8,
    ch: 1,
    q: "Qu'est-ce qu'un besoin latent ?",
    o: [
      "Une attente réelle mais non formulée explicitement par l'utilisateur, qu'il faut faire émerger.",
      "Un besoin obsolète qui a été supprimé des spécifications du projet.",
      "Un besoin technique lié à la vitesse du processeur réseau.",
      "Une exigence de sécurité obligatoire imposée par la loi."
    ],
    a: 0,
    e: "L'utilisateur n'exprime pas toujours tout par écrit ou oral. L'analyste doit poser des questions pour déceler les besoins latents."
  },
  {
    id: 9,
    ch: 1,
    q: "Pourquoi est-il déconseillé de sauter directement du besoin à la solution technique ?",
    o: [
      "On risque de développer un système parfait techniquement mais qui ne répond pas au problème réel du client.",
      "Les compilateurs refusent de traduire le code si les exigences ne sont pas écrites.",
      "Cela double automatiquement les taxes d'importation de logiciels.",
      "Les utilisateurs finaux ne peuvent plus se connecter avec leurs mots de passe."
    ],
    a: 0,
    e: "Comprendre le problème (le quoi) garantit que la solution technique (le comment) résoudra effectivement les besoins métiers."
  },
  {
    id: 10,
    ch: 1,
    q: "Dans quel but utilise-t-on un glossaire partagé dès le démarrage d'un projet ?",
    o: [
      "Pour s'assurer que tous les acteurs (clients, développeurs, testeurs) partagent la même définition des termes métiers.",
      "Pour lister l'intégralité des fonctions intégrées dans les bibliothèques Node.js.",
      "Pour répertorier les adresses IP physiques de tous les serveurs du réseau.",
      "Pour traduire l'intégralité du site web dans toutes les langues du monde."
    ],
    a: 0,
    e: "Le glossaire élimine les quiproquos liés au jargon métier ou technique, renforçant la cohérence des documents."
  },
  {
    id: 11,
    ch: 1,
    q: "Pourquoi le besoin initial est-il souvent qualifié de 'vague' ?",
    o: [
      "Parce que les clients s'expriment en langage naturel non technique et mélangent buts, envies et solutions.",
      "Parce que les bases de données SQL interdisent d'écrire des phrases complètes.",
      "Parce que le chef de projet refuse de lire les documents de plus d'une page.",
      "Parce que les navigateurs web n'affichent pas les polices d'écriture standards."
    ],
    a: 0,
    e: "Un besoin brut comme 'je veux un outil moderne' exprime une intention, mais requiert une analyse pour devenir applicable."
  },
  {
    id: 12,
    ch: 1,
    q: "Dans la hiérarchie des besoins et exigences, quel élément se situe au sommet ?",
    o: [
      "Les objectifs métiers de l'entreprise (business requirements)",
      "Les cas de test unitaires du code source",
      "Les exigences non fonctionnelles de sécurité réseau",
      "Le schéma physique des tables de la base de données"
    ],
    a: 0,
    e: "Les objectifs stratégiques de l'entreprise justifient le projet et dictent tous les autres besoins et exigences."
  },
  {
    id: 13,
    ch: 1,
    q: "Quelles exigences décrivent le comportement attendu du système à réaliser (exigences produit) ?",
    o: [
      "Le système doit être capable de traiter 100 transactions par seconde et répondre en moins de 2 secondes.",
      "Les rapports de test d'intégration doivent être transmis tous les vendredis à la MOA.",
      "L'outil Subversion doit être utilisé pour la gestion de version du code source.",
      "Une demande de changement doit être analysée et traitée sous 5 jours ouvrés."
    ],
    a: 0,
    e: "Le débit de transactions et le temps de réponse qualifient le produit fini lui-même, tandis que les autres concernent le processus projet."
  },
  {
    id: 14,
    ch: 1,
    q: "Lequel de ces énoncés est incorrect concernant le cahier des charges ?",
    o: [
      "Il contient les exigences fonctionnelles et système.",
      "Il sert de base contractuelle entre le client et le prestataire.",
      "Il contient l'intégralité des notes brutes d'entretien de l'analyste.",
      "Il est formulé de manière pratique et vérifiable."
    ],
    a: 2,
    e: "Le cahier des charges (CdC) est un livrable officiel consolidé. Il ne contient pas les brouillons ou les notes brutes prises en réunion."
  },
  {
    id: 15,
    ch: 1,
    q: "Quel risque court-on en rédigeant des exigences trop restrictives sur le plan technique ?",
    o: [
      "Limiter les choix de conception de l'équipe technique et empêcher l'utilisation de solutions plus performantes ou moins coûteuses.",
      "L'impossibilité de compiler le code JavaScript en production.",
      "L'affichage de pages blanches sur les navigateurs web récents.",
      "Le blocage automatique du compte administrateur par le système."
    ],
    a: 0,
    e: "Le document d'exigences doit dire quoi faire, pas imposer prématurément comment coder la solution technique."
  },
  {
    id: 16,
    ch: 1,
    q: "Trouvez l'intrus parmi ces attributs de qualité d'un système (exigences non fonctionnelles) :",
    o: [
      "La sécurité des données",
      "Le respect des normes et standards réglementaires externes",
      "La fiabilité globale du système",
      "La performance de traitement des requêtes"
    ],
    a: 1,
    e: "La sécurité, la fiabilité et la performance sont des attributs internes/externes de qualité du produit. Les normes et standards externes réglementaires sont des contraintes imposées de l'extérieur."
  },
  {
    id: 17,
    ch: 1,
    q: "Qu'est-ce qu'une hypothèse de conception dans la phase de cadrage ?",
    o: [
      "Une supposition sur un facteur externe (ex: disponibilité d'un outil) qui influence la rédaction des exigences.",
      "Un test de performance réseau simulé en local.",
      "Le choix définitif de la couleur de l'interface utilisateur.",
      "Une erreur d'écriture dans le cahier des charges du projet."
    ],
    a: 0,
    e: "Les hypothèses (assumptions) doivent être identifiées car leur invalidation peut remettre en cause tout le périmètre des exigences."
  },

  // Chapitre 2: Types et qualités (18 à 34)
  {
    id: 18,
    ch: 2,
    q: "Qu'est-ce qu'une exigence fonctionnelle ?",
    o: [
      "Une description d'un service ou d'un comportement que le système doit fournir ou exécuter (ce que le système fait).",
      "Une exigence concernant la performance du processeur du serveur.",
      "Une règle de sécurité régissant les mots de passe des administrateurs.",
      "L'organisation hiérarchique de l'équipe de développement."
    ],
    a: 0,
    e: "Les exigences fonctionnelles décrivent les actions du système (ex: 'Le système doit permettre de créer un compte')."
  },
  {
    id: 19,
    ch: 2,
    q: "Une exigence non fonctionnelle (ENF) concerne généralement :",
    o: [
      "La couleur de l'interface",
      "Le respect des délais de livraison",
      "La performance, la sécurité ou la fiabilité du système",
      "Les fonctionnalités offertes à l'utilisateur"
    ],
    a: 2,
    e: "Les exigences non fonctionnelles qualifient le comportement, la performance, la sécurité ou la fiabilité du système."
  },
  {
    id: 20,
    ch: 2,
    q: "Parmi les propositions suivantes, lesquelles sont les plus adaptées à leurs utilisateurs (au moins une est universellement vraie) ?",
    o: [
      "Pour le chef de projet, les exigences doivent être nécessaires",
      "Pour les testeurs, les exigences doivent être réalisables",
      "Pour toutes les parties prenantes, les exigences doivent être cohérentes",
      "Pour les développeurs, les exigences doivent être complexes"
    ],
    a: 2,
    e: "La cohérence des exigences est un attribut de qualité indispensable pour l'ensemble des parties prenantes, afin d'éviter les contradictions logiques lors du développement et de la validation."
  },
  {
    id: 21,
    ch: 2,
    q: "Dans un système médical, à quel type d'exigence appartient : 'Le système doit permettre aux patients de créer un compte, prendre, modifier ou annuler des rendez-vous.' ?",
    o: [
      "Exigence fonctionnelle (EF)",
      "Exigence non fonctionnelle (ENF)",
      "Contrainte de conception",
      "Objectif d'affaires"
    ],
    a: 0,
    e: "Cette exigence décrit une fonctionnalité directe offerte aux patients (action que le système doit réaliser), c'est donc une exigence fonctionnelle (EF)."
  },
  {
    id: 22,
    ch: 2,
    q: "Dans un système médical, à quel type d'exigence appartient : 'L'interface doit être accessible via smartphones, tablettes et ordinateurs, et être facile d'utilisation.' ?",
    o: [
      "Exigence fonctionnelle (EF)",
      "Exigence non fonctionnelle (ENF)",
      "Contrainte physique",
      "Règle de gestion"
    ],
    a: 1,
    e: "Cette exigence qualifie l'utilisabilité et la portabilité de l'interface sans décrire une action métier spécifique, c'est donc une exigence non fonctionnelle (ENF)."
  },
  {
    id: 23,
    ch: 2,
    q: "Dans un système médical, à quel type d'exigence appartient : 'Le système doit garantir la protection des données personnelles conformément aux réglementations en vigueur (ex. RGPD).' ?",
    o: [
      "Exigence fonctionnelle (EF)",
      "Exigence non fonctionnelle (ENF)",
      "Exigence de formation",
      "Objectif commercial"
    ],
    a: 1,
    e: "La conformité réglementaire et la sécurité/confidentialité des données qualifient les contraintes globales du système, ce sont des exigences non fonctionnelles (ENF)."
  },
  {
    id: 24,
    ch: 2,
    q: "Parmi les caractéristiques suivantes, laquelle reflète une bonne exigence de qualité ?",
    o: [
      "Vague",
      "Ambiguë",
      "Vérifiable",
      "Subjective"
    ],
    a: 2,
    e: "Une bonne exigence doit être vérifiable afin d'éliminer toute subjectivité lors de sa validation par l'équipe de recette."
  },
  {
    id: 25,
    ch: 2,
    q: "Dans un système médical, à quel type d'exigence appartient : 'Le système doit assurer une disponibilité de 99,9% et un temps de réponse inférieur à 2 secondes pour les actions critiques.' ?",
    o: [
      "Exigence fonctionnelle (EF)",
      "Exigence non fonctionnelle (ENF)",
      "Spécification technique",
      "Exigence d'affaires"
    ],
    a: 1,
    e: "Les critères de performance (temps de réponse) et de fiabilité/disponibilité qualifient le niveau de service global, c'est donc une exigence non fonctionnelle (ENF)."
  },
  {
    id: 26,
    ch: 2,
    q: "Pourquoi une exigence doit-elle être cohérente ?",
    o: [
      "Pour ne pas contredire une autre exigence du projet (absence de conflit de logique).",
      "Pour utiliser exactement la même police d'écriture sur tous les écrans.",
      "Pour s'exécuter à la même vitesse sur tous les ordinateurs portables.",
      "Pour correspondre aux préférences personnelles de l'analyste d'affaires."
    ],
    a: 0,
    e: "La cohérence globale évite les impasses logiques lors du développement (ex: deux exigences fixant des temps de réponse contradictoires)."
  },
  {
    id: 27,
    ch: 2,
    q: "Qu'est-ce qu'une exigence complète ?",
    o: [
      "Elle contient toutes les informations nécessaires à sa compréhension et sa réalisation, sans nécessiter d'explication externe.",
      "Elle décrit l'intégralité du site web dans une seule phrase complexe.",
      "Elle a été codée à 100% par l'équipe technique sans aucun avertissement.",
      "Elle intègre des critères de sécurité, de performance et de design graphique combinés."
    ],
    a: 0,
    e: "Une exigence complète ne doit pas laisser de zones d'ombre ou de phrases comme 'le système fera cela, etc.'."
  },
  {
    id: 28,
    ch: 2,
    q: "Pourquoi les expressions 'simple', 'convivial' ou 'moderne' sont-elles des pièges de formulation ?",
    o: [
      "Parce qu'elles sont subjectives et impossibles à tester de manière objective ou quantitative.",
      "Parce qu'elles sont interdites par le protocole HTTP standard.",
      "Parce qu'elles provoquent le plantage des serveurs web lors du build.",
      "Parce qu'elles obligent à recruter uniquement des designers UX seniors."
    ],
    a: 0,
    e: "La subjectivité empêche d'avoir une recette claire. 'Convivial' doit être traduit en critères d'ergonomie mesurables."
  },
  {
    id: 29,
    ch: 2,
    q: "Quelle est la structure de phrase recommandée pour formuler une exigence système ?",
    o: [
      "Un sujet précis + le verbe fort 'doit' + une action observable + une condition ou un critère de succès.",
      "Une question ouverte posée directement à l'équipe de développement.",
      "Une description romancée écrite au futur ou au conditionnel sans mesure.",
      "Un bloc de pseudo-code JavaScript décrivant la fonction."
    ],
    a: 0,
    e: "La formulation 'Sujet + DOIT + Action' (ex: 'Le système doit envoyer...') est le standard industriel pour éviter l'ambiguïté."
  },
  {
    id: 30,
    ch: 2,
    q: "Les exigences système décrivent le produit fini.",
    o: [
      "Vrai, elles décrivent précisément le comportement externe attendu du logiciel.",
      "Faux, elles ne décrivent que la phase de gestion de projet.",
      "Vrai uniquement pour les exigences non fonctionnelles.",
      "Faux, elles décrivent la structure interne du code source."
    ],
    a: 0,
    e: "Les exigences système (ou produit) modélisent le comportement et les caractéristiques attendus du livrable final."
  },
  {
    id: 31,
    ch: 2,
    q: "Qu'est-ce qu'une exigence de contrainte ?",
    o: [
      "Une exigence imposée de l'extérieur (loi, matériel existant, budget, technologie) qui limite les choix de solution.",
      "Une fonctionnalité obligatoire ajoutée en fin de projet par le directeur financier.",
      "Une erreur système qui limite la bande passante du réseau de l'entreprise.",
      "L'obligation légale de ne travailler que sur des systèmes Linux."
    ],
    a: 0,
    e: "Les contraintes (ex: respecter le RGPD, fonctionner sous iOS et Android) cadrent les possibilités de conception technique."
  },
  {
    id: 32,
    ch: 2,
    q: "Pourquoi la priorisation des exigences est-elle une qualité nécessaire du document de spécification ?",
    o: [
      "Pour permettre à l'équipe de savoir quoi développer en priorité en cas de contrainte de budget ou de temps.",
      "Pour trier les exigences par ordre alphabétique de leur titre.",
      "Pour s'assurer que les développeurs les plus seniors travaillent sur les parties les plus faciles.",
      "Pour masquer les exigences secondaires aux yeux du sponsor financier."
    ],
    a: 0,
    e: "Prioriser permet de piloter par la valeur et de livrer un produit minimum viable (MVP) en cas de dépassement de planning."
  },
  {
    id: 33,
    ch: 2,
    q: "Parmi les affirmations suivantes, laquelle décrit le mieux le lien entre un ingénieur des exigences et un testeur ?",
    o: [
      "L'ingénieur des exigences fournit des entrées pour les tests, et le testeur contribue à la qualité des exigences.",
      "Le testeur n'a aucun lien avec les exigences du système.",
      "Le testeur doit modifier les exigences système avant de rédiger ses cas de test.",
      "L'ingénieur des exigences teste l'application sous la direction du testeur."
    ],
    a: 0,
    e: "Les exigences constituent le référentiel d'entrées pour écrire les tests. Le testeur valide en amont que ces exigences sont testables."
  },
  {
    id: 34,
    ch: 2,
    q: "Qu'est-ce qu'un critère d'acceptation d'une exigence ?",
    o: [
      "La condition spécifique qui doit être satisfaite pour que le client accepte de valider la livraison de la fonctionnalité.",
      "Le montant financier facturé par l'intégrateur pour développer la fonction.",
      "Le niveau d'études requis pour avoir le droit de lire le document de spécification.",
      "Un protocole réseau autorisant l'accès aux bases de données SQL."
    ],
    a: 0,
    e: "Les critères d'acceptation définissent la frontière nette entre une fonctionnalité livrée conforme et une fonctionnalité rejetée."
  },

  // Chapitre 3: Élicitation (35 à 51)
  {
    id: 35,
    ch: 3,
    q: "Quel est l'élément le plus déterminant pour choisir une technique d'élicitation ?",
    o: [
      "Les outils logiciels utilisés",
      "Le budget de l'équipe informatique",
      "La structure de la base SQL",
      "La disponibilité et l'accessibilité des parties prenantes"
    ],
    a: 3,
    e: "La disponibilité des parties prenantes détermine si l'on peut organiser des ateliers JAD, mener des entretiens ou se contenter de questionnaires."
  },
  {
    id: 36,
    ch: 3,
    q: "Quelle est la différence entre une élicitation passive et active ?",
    o: [
      "L'élicitation passive se contente de lire les cahiers des charges fournis ; l'élicitation active provoque des ateliers, entretiens et observations sur le terrain.",
      "L'élicitation active est payante alors que la passive est gratuite.",
      "L'élicitation passive utilise uniquement des outils informatiques obsolètes.",
      "Il n'y a aucune différence, ce sont deux termes marketing du génie logiciel."
    ],
    a: 0,
    e: "L'analyste actif va chercher les besoins implicites et aide le client à structurer sa pensée, évitant les oublis."
  },
  {
    id: 37,
    ch: 3,
    q: "Parmi les éléments suivants, lequel constitue une source d'exigences pour un projet ?",
    o: [
      "Les utilisateurs finaux, les lois/réglementations, les systèmes existants et les concurrents",
      "Uniquement les lignes de code écrites par l'équipe technique",
      "Le budget comptable global alloué par la direction financière",
      "Les rapports d'erreurs générés par le serveur web lors des crashs"
    ],
    a: 0,
    e: "Les sources d'exigences sont multiples : humaines (stakeholders), documentaires (lois) ou techniques (systèmes existants)."
  },
  {
    id: 38,
    ch: 3,
    q: "Quel est l'avantage principal de l'entretien individuel lors de l'élicitation ?",
    o: [
      "Permettre de comprendre en profondeur les besoins spécifiques, frustrations et scénarios d'un acteur clé précis.",
      "Obtenir un accord consensuel immédiat de l'ensemble des départements de l'entreprise.",
      "Réduire à zéro le temps global passé à rédiger le cahier des charges.",
      "Écrire automatiquement les scénarios de test dans le système."
    ],
    a: 0,
    e: "L'entretien individuel favorise la liberté de parole et donne une vision détaillée du quotidien d'un utilisateur."
  },
  {
    id: 39,
    ch: 3,
    q: "Qu'est-ce qu'un atelier JAD (Joint Application Development) ou atelier de co-conception ?",
    o: [
      "Une session de travail structurée regroupant utilisateurs, décideurs et techniciens pour aligner rapidement les exigences.",
      "Un outil informatique de génération de code automatique à partir de schémas.",
      "Une réunion de crise organisée suite à une cyberattaque sur les serveurs.",
      "La formation technique des développeurs sur les nouveautés de React."
    ],
    a: 0,
    e: "Les ateliers collectifs accélèrent la prise de décision et désamorcent immédiatement les conflits de vision entre services."
  },
  {
    id: 40,
    ch: 3,
    q: "Dans quelle situation le questionnaire est-il une technique d'élicitation recommandée ?",
    o: [
      "Lorsque les utilisateurs sont nombreux, géographiquement dispersés, et que l'on cherche des données statistiques simples.",
      "Lorsque l'on souhaite négocier des fonctionnalités complexes et conflictuelles entre directeurs.",
      "Lorsque l'architecture technique du serveur SQL n'est pas encore choisie.",
      "Lorsqu'on cherche à concevoir la charte graphique visuelle détaillée de l'application."
    ],
    a: 0,
    e: "Le questionnaire permet de collecter des réponses à grande échelle mais ne remplace pas l'échange pour comprendre le 'pourquoi'."
  },
  {
    id: 41,
    ch: 3,
    q: "Qu'est-ce que l'observation directe (shadowing) apporte à l'élicitation ?",
    o: [
      "Elle révèle la réalité du quotidien de l'utilisateur, y compris ses habitudes, raccourcis et difficultés qu'il oublie d'exprimer à l'oral.",
      "Elle consiste à surveiller les écrans des développeurs pour vérifier qu'ils travaillent.",
      "Elle permet de chiffrer automatiquement le coût de développement d'une route API.",
      "Elle interdit l'utilisation de méthodes de travail agiles dans l'entreprise."
    ],
    a: 0,
    e: "Voir l'utilisateur en action permet de détecter des besoins réels non conscients ou informels (ex: des double-saisies)."
  },
  {
    id: 42,
    ch: 3,
    q: "Pourquoi le prototypage rapide est-il une excellente technique d'élicitation ?",
    o: [
      "Parce qu'il donne un support concret aux utilisateurs, ce qui les aide à réagir, confirmer ou corriger les hypothèses de l'analyste.",
      "Parce qu'il constitue le produit fini qui sera directement mis en production sans modification.",
      "Parce qu'il supprime le besoin d'écrire des exigences par écrit dans le SRS.",
      "Parce qu'il accélère le débit de connexion réseau de l'application."
    ],
    a: 0,
    e: "Un écran simulé (maquette) parle plus au client qu'un long texte technique, favorisant des retours rapides."
  },
  {
    id: 43,
    ch: 3,
    q: "Quels sont les trois obstacles majeurs à l'élicitation des exigences identifiés par le génie logiciel ?",
    o: [
      "La portée du projet, la volatilité des exigences, et les problèmes de compréhension mutuelle",
      "Le budget de l'équipe, la vitesse réseau, et le choix du langage de programmation",
      "La marque des ordinateurs, le type d'imprimante, et l'âge de l'analyste",
      "Les conflits syndicaux, l'absence de DSI, et les pannes de courant physique"
    ],
    a: 0,
    e: "Les trois obstacles classiques de l'élicitation concernent le contrôle du périmètre (portée), la dérive des besoins (volatilité) et les biais de communication (compréhension)."
  },
  {
    id: 44,
    ch: 3,
    q: "Une partie prenante (stakeholder) se définit uniquement comme la personne qui finance le projet :",
    o: [
      "Vrai",
      "Faux",
      "Vrai uniquement dans les petits projets",
      "Faux uniquement en méthodologie agile"
    ],
    a: 1,
    e: "Faux. Une partie prenante désigne toute personne, groupe ou organisation impactée ou pouvant impacter le projet (DSI, utilisateurs, managers, testeurs)."
  },
  {
    id: 45,
    ch: 3,
    q: "Qu'est-ce qu'un Persona en ingénierie du besoin ?",
    o: [
      "Une représentation fictive d'un utilisateur type, facilitant la compréhension de ses besoins, buts et comportements.",
      "Le mot de passe de sécurité permettant d'accéder aux bases SQL.",
      "Un test d'intrusion informatique simulé par l'équipe de sécurité.",
      "Le pseudonyme choisi par l'administrateur système pour la production."
    ],
    a: 0,
    e: "Créer des personas aide l'équipe de conception à garder en tête les vrais besoins des utilisateurs types du produit."
  },
  {
    id: 46,
    ch: 3,
    q: "En élicitation, qu'est-ce qu'un besoin implicite ?",
    o: [
      "Un besoin tellement évident pour l'utilisateur qu'il oublie de le formuler (ex: pouvoir se déconnecter de l'application).",
      "Une fonction cachée développée en secret par l'équipe technique.",
      "Une exigence de sécurité réseau qui n'apparaît pas dans le cahier des charges.",
      "Une erreur système provoquant un comportement étrange sur l'interface."
    ],
    a: 0,
    e: "Les besoins évidents (implicites) doivent être identifiés et documentés par l'analyste sous peine d'être oubliés au développement."
  },
  {
    id: 47,
    ch: 3,
    q: "Quel rôle jouent les cas d'utilisation (Use Cases) UML lors de l'élicitation ?",
    o: [
      "Ils décrivent graphiquement et textuellement les interactions entre les acteurs et le système pour atteindre un but.",
      "Ils définissent les index physiques des tables SQL de la base de données.",
      "Ils chiffrent les paquets réseau envoyés sur le serveur d'intégration.",
      "Ils mesurent le temps de réponse CPU de chaque requête serveur."
    ],
    a: 0,
    e: "Les Use Cases structurent le dialogue avec le client en décrivant le comportement attendu du point de vue de l'utilisateur."
  },
  {
    id: 48,
    ch: 3,
    q: "Quelle affirmation est correcte concernant le rôle des utilisateurs lors de l'élicitation ?",
    o: [
      "Les utilisateurs ne participent pas à l'élaboration des exigences.",
      "Les utilisateurs expriment toujours des exigences techniquement viables.",
      "Les utilisateurs contribuent à identifier les besoins métiers réels.",
      "Les utilisateurs doivent concevoir l'architecture technique du système."
    ],
    a: 2,
    e: "L'implication des utilisateurs finaux garantit l'adéquation de la solution à la réalité opérationnelle de l'entreprise."
  },
  {
    id: 49,
    ch: 3,
    q: "Pourquoi l'analyse des systèmes concurrents (benchmarking) est-elle utile lors du recueil du besoin ?",
    o: [
      "Pour s'inspirer des fonctionnalités standards du marché et identifier les axes d'amélioration potentiels.",
      "Pour copier le code source CSS de la concurrence en secret.",
      "Pour vérifier que la concurrence utilise les mêmes adresses IP de serveurs.",
      "Pour éviter d'acheter des licences d'exploitation pour son propre projet."
    ],
    a: 0,
    e: "Le benchmarking donne un point de repère sur les attentes courantes des utilisateurs du secteur."
  },
  {
    id: 50,
    ch: 3,
    q: "Quel risque court-on à ignorer les utilisateurs de terrain (ex: agents de saisie) au profit des seuls managers ?",
    o: [
      "Développer une application théorique inadaptée aux contraintes et réalités du travail quotidien.",
      "Le refus de l'équipe informatique de compiler l'application.",
      "L'impossibilité d'obtenir le budget de financement de la part des actionnaires.",
      "Le plantage immédiat de la base de données SQL en production."
    ],
    a: 0,
    e: "Les managers connaissent les objectifs globaux, mais seuls les utilisateurs finaux connaissent les contraintes réelles d'usage."
  },
  {
    id: 51,
    ch: 3,
    q: "Quelle technique d'élicitation permet d'analyser les flux de travail actuels en lisant les manuels de formation existants ?",
    o: [
      "L'analyse documentaire (document analysis)",
      "Le prototypage jetable",
      "L'atelier JAD",
      "Le questionnaire en ligne"
    ],
    a: 0,
    e: "L'analyse documentaire permet de s'approprier le vocabulaire et les règles métier historiques avant d'interroger les acteurs."
  },

  // Chapitre 4: Analyse et négociation (52 à 68)
  {
    id: 52,
    ch: 4,
    q: "Parmi les objectifs suivants, lesquels sont les buts de l'analyse des besoins ?",
    o: [
      "Définir les cas d'usage et concevoir les index physiques SQL",
      "Classer les exigences et comprendre les besoins des utilisateurs",
      "Identifier les propriétaires des serveurs informatiques",
      "Déterminer la liste des technologies de développement"
    ],
    a: 1,
    e: "L'analyse raffine le recueil brut pour s'assurer que les exigences sont saines, cohérentes et complètes avant spécification."
  },
  {
    id: 53,
    ch: 4,
    q: "Lors d'un entretien d'élicitation, si vous découvrez une incohérence ou un conflit majeur sur l'interface :",
    o: [
      "Vous en discutez avec la première personne disponible et appliquez sa recommandation.",
      "Vous utilisez votre propre expérience technique pour trancher de suite.",
      "Vous organisez une réunion de toutes les parties concernées pour statuer.",
      "Vous transférez immédiatement la question à la MOA pour décision."
    ],
    a: 3,
    e: "La gouvernance classique délègue la décision fonctionnelle finale à la maîtrise d'ouvrage (MOA)."
  },
  {
    id: 54,
    ch: 4,
    q: "Pourquoi la négociation des exigences est-elle indispensable dans un projet ?",
    o: [
      "Car les ressources (temps, budget, technique) sont limitées et toutes les demandes des parties prenantes ne peuvent pas être livrées en même temps.",
      "Car elle permet aux développeurs de refuser systématiquement de travailler le vendredi.",
      "Car elle est obligatoire selon les protocoles de sécurité réseau internationaux.",
      "Car elle permet d'attribuer des notes aux différents utilisateurs du système."
    ],
    a: 0,
    e: "La négociation cherche un compromis acceptable équilibrant la valeur métier, le coût, les délais et les risques."
  },
  {
    id: 55,
    ch: 4,
    q: "Que signifie l'acronyme MoSCoW dans la priorisation des exigences ?",
    o: [
      "Must have, Should have, Could have, Won't have",
      "Model, Object, Schema, Controller, Web",
      "Measure, Organize, Structure, Control, Work",
      "Main, Optional, Secondary, Critical, Weak"
    ],
    a: 0,
    e: "La méthode MoSCoW classe les exigences pour définir ce qui est critique pour la réussite immédiate de la version en cours."
  },
  {
    id: 56,
    ch: 4,
    q: "Dans la méthode MoSCoW, à quoi correspond la catégorie 'Must Have' ?",
    o: [
      "Les exigences critiques indispensables sans lesquelles le produit ne peut pas fonctionner ou être mis en service.",
      "Les exigences confortables de type bonus que l'on ne développera que s'il reste du temps.",
      "Les fonctionnalités qui ont été explicitement rejetées par l'équipe technique.",
      "Les exigences qui doivent être sous-traitées à une entreprise externe."
    ],
    a: 0,
    e: "Si un seul 'Must' manque au jour du lancement, le produit est considéré comme un échec de livraison."
  },
  {
    id: 57,
    ch: 4,
    q: "Dans la méthode MoSCoW, quelle est la nuance entre 'Should Have' et 'Could Have' ?",
    o: [
      "Should est important mais non bloquant à court terme ; Could est un plus (confort) optionnel qui ne sera fait que si les conditions le permettent.",
      "Should concerne le design graphique et Could concerne le code de la base de données SQL.",
      "Should est obligatoire selon la loi et Could est obligatoire selon le client.",
      "Should est rédigé par le chef de projet et Could par les développeurs."
    ],
    a: 0,
    e: "Les 'Should' apportent une grande valeur mais disposent de solutions de contournement temporaires. Les 'Could' sont secondaires."
  },
  {
    id: 58,
    ch: 4,
    q: "Que signifie 'Won't Have' dans le cadre d'une priorisation MoSCoW pour une version ?",
    o: [
      "Les exigences dont on convient d'un commun accord qu'elles ne feront pas partie de cette version (reportées ou annulées).",
      "Les fonctionnalités boguées qui ont provoqué un crash système lors des tests.",
      "Les exigences qui ne respectent pas les consignes de sécurité réseau de l'entreprise.",
      "Les mots clés interdits dans la rédaction du cahier des charges."
    ],
    a: 0,
    e: "Classer une demande en 'Won't Have' permet de clarifier le périmètre et d'éviter les dérives de développement."
  },
  {
    id: 59,
    ch: 4,
    q: "Qu'est-ce qu'une analyse d'impact d'une exigence ?",
    o: [
      "L'évaluation des conséquences techniques, humaines, financières et de planning induites par l'ajout ou la modification de cette exigence.",
      "La mesure de la vitesse d'affichage d'un écran suite à un clic de souris.",
      "Le suivi du nombre total de requêtes SQL écrites par seconde sur la base.",
      "L'évaluation de la résistance physique du matériel informatique."
    ],
    a: 0,
    e: "Modifier une exigence centrale peut casser d'autres fonctions liées. L'analyse d'impact prévient les régressions majeures."
  },
  {
    id: 60,
    ch: 4,
    q: "Qu'est-ce que le 'Gold Plating' (sur-qualité) dans un projet informatique ?",
    o: [
      "L'ajout de fonctionnalités non demandées par l'équipe technique, pensant bien faire.",
      "L'utilisation de câbles réseau haut de gamme recouverts d'une couche d'or physique.",
      "L'application d'un style CSS brillant de couleur dorée sur les boutons du site.",
      "Le paiement d'un bonus financier à l'analyste d'affaires en fin de projet."
    ],
    a: 0,
    e: "Le Gold Plating consomme du temps et du budget sur des éléments non prioritaires, augmentant les risques de retard."
  },
  {
    id: 61,
    ch: 4,
    q: "Lors de la négociation, sur quels critères l'analyste s'appuie-t-il pour prioriser une exigence ?",
    o: [
      "La valeur métier apportée, le coût de réalisation, le délai requis, le risque technique et la conformité légale.",
      "Les préférences personnelles et esthétiques de l'équipe de développement.",
      "L'ordre alphabétique des titres des exigences spécifiées dans le document.",
      "L'ancienneté professionnelle de la personne qui a formulé le besoin."
    ],
    a: 0,
    e: "Une priorisation objective croise la valeur pour le client et la complexité de réalisation pour la technique."
  },
  {
    id: 62,
    ch: 4,
    q: "Qui doit valider formellement la priorisation finale des exigences avant le début du développement ?",
    o: [
      "Le sponsor du projet (ou le Product Owner représentant les clients)",
      "L'ensemble des développeurs de la base de données SQL",
      "Le stagiaire en charge de la rédaction des guides d'utilisation",
      "L'hébergeur cloud qui fournit les serveurs virtuels"
    ],
    a: 0,
    e: "La validation finale scelle l'accord sur le périmètre de livraison que l'équipe s'engage à produire."
  },
  {
    id: 63,
    ch: 4,
    q: "Dans quel cas un conflit d'exigences est-il résolu par une passerelle logique ?",
    o: [
      "Lorsqu'on sépare les cas d'utilisation selon des profils différents (ex: double authentification requise uniquement en dehors des bureaux).",
      "Lorsqu'on supprime l'intégralité du code informatique des deux fonctionnalités.",
      "Lorsqu'on double la bande passante du serveur d'intégration.",
      "Lorsqu'on force le système à choisir de manière aléatoire lors de chaque connexion."
    ],
    a: 0,
    e: "Résoudre un conflit passe souvent par le fait de préciser le contexte d'application de chaque exigence."
  },
  {
    id: 64,
    ch: 4,
    q: "Que signifie 'out of scope' pour une exigence analysée ?",
    o: [
      "Qu'elle se situe en dehors du périmètre validé pour le projet ou pour la version actuelle.",
      "Qu'elle a provoqué une erreur critique de dépassement de mémoire (out of memory).",
      "Qu'elle doit être codée en utilisant une API externe payante.",
      "Qu'elle ne concerne que les utilisateurs se connectant depuis l'étranger."
    ],
    a: 0,
    e: "Identifier les éléments 'hors périmètre' évite les malentendus sur ce qui sera effectivement livré en fin de projet."
  },
  {
    id: 65,
    ch: 4,
    q: "Dans une matrice de priorisation classique, quelles exigences cherche-t-on à développer en premier ?",
    o: [
      "Celles qui apportent une forte valeur métier et présentent une faible complexité technique (Quick Wins).",
      "Celles qui présentent le coût de licence logicielle le plus élevé du marché.",
      "Celles qui n'ont pas de lien avec les processus métiers de l'entreprise.",
      "Celles qui exigent l'écriture du plus grand nombre de lignes de code."
    ],
    a: 0,
    e: "Les gains rapides (Quick Wins) maximisent la satisfaction du client au moindre coût dès le début des livraisons."
  },
  {
    id: 66,
    ch: 4,
    q: "Pourquoi l'analyse doit-elle détecter les exigences incomplètes (ex: 'Le système doit envoyer une alerte') ?",
    o: [
      "Parce qu'il manque des précisions essentielles (A qui ? Par quel canal ? Quand ? Sous quelle condition ?).",
      "Parce que les navigateurs web refusent d'interpréter le mot 'alerte'.",
      "Parce que l'écriture du code source Python Flask nécessite d'importer une bibliothèque payante.",
      "Parce que l'absence de point d'exclamation à la fin provoque des erreurs de compilation."
    ],
    a: 0,
    e: "L'analyste doit combler les manques pour que le développeur n'ait pas à deviner la logique métier à coder."
  },
  {
    id: 67,
    ch: 4,
    q: "Comment s'appelle l'arbitrage qui consiste à renoncer à une partie des exigences pour respecter une date de livraison fixe ?",
    o: [
      "Le pilotage par le périmètre (scope management / descope)",
      "Un plan de reprise d'activité (PRA)",
      "Une phase de tests unitaires automatiques",
      "La sur-personnalisation applicative"
    ],
    a: 0,
    e: "Si le temps et le budget sont figés (modèle agile), le périmètre est la variable d'ajustement : on retire les exigences secondaires."
  },

  // Chapitre 5: SRS et cahier des charges (68 à 84)
  {
    id: 68,
    ch: 5,
    q: "Que signifie le sigle SRS en ingénierie logicielle ?",
    o: [
      "Software Requirements Specification",
      "System Recovery Script",
      "Security and Routing Server",
      "Standard Request Scheme"
    ],
    a: 0,
    e: "Le SRS (Software Requirements Specification) est le document officiel décrivant l'ensemble des exigences du logiciel à concevoir."
  },
  {
    id: 69,
    ch: 5,
    q: "Quel standard international structure couramment le document SRS ?",
    o: [
      "Le standard IEEE 830",
      "La RFC 2616 d'HTTP",
      "Le standard ISO 9001 de qualité managériale",
      "La norme W3C pour l'écriture d'HTML5"
    ],
    a: 0,
    e: "La norme IEEE 830 (remplacée par ISO/IEC/IEEE 29148) fournit un cadre de structure standardisé pour la rédaction des spécifications de besoins logiciels."
  },
  {
    id: 70,
    ch: 5,
    q: "Que doit exprimer en priorité un cahier des charges (CdC) ?",
    o: [
      "Le besoin des utilisateurs et des clients",
      "Les solutions techniques retenues",
      "Le procédé de fabrication",
      "Les outils de développement choisis"
    ],
    a: 0,
    e: "Le cahier des charges exprime en priorité les attentes fonctionnelles et contraintes métiers du client, sans imposer l'implémentation."
  },
  {
    id: 71,
    ch: 5,
    q: "Lequel de ces énoncés est faux concernant les exigences et le cahier des charges ?",
    o: [
      "Seuls les documents finalisés doivent apparaître dans le cahier des charges.",
      "Les prototypes doivent apparaître dans le cahier des charges.",
      "Toute information utile issue de l'ingénierie des exigences est à considérer.",
      "Les User Stories doivent obligatoirement être incluses dans le cahier des charges."
    ],
    a: 3,
    e: "Les User Stories sont des artefacts agiles appartenant au backlog de développement (géré au niveau du sprint), et ne figurent pas dans un cahier des charges classique."
  },
  {
    id: 72,
    ch: 5,
    q: "Dans un SRS, à quoi sert la section 'Glossaire' ?",
    o: [
      "À définir les termes métiers spécifiques pour éviter que les techniciens ne fassent de faux contresens.",
      "À stocker la liste des adresses IP physiques des serveurs SQL.",
      "À répertorier les composants graphiques CSS importés dans le projet.",
      "À recenser les noms des développeurs de l'équipe de production."
    ],
    a: 0,
    e: "Le glossaire aligne le vocabulaire (ex: définir précisément ce qu'est un 'Client Actif' par rapport à un 'Prospect')."
  },
  {
    id: 73,
    ch: 5,
    q: "Quels métadonnées doit typiquement porter chaque exigence répertoriée dans un SRS ?",
    o: [
      "Un ID unique, un titre, un niveau de priorité, sa source et ses liens de traçabilité.",
      "La vitesse d'exécution estimée en microsecondes du code correspondant.",
      "L'adresse e-mail et le numéro de téléphone de l'administrateur système.",
      "Le nombre total d'octets physiques occupés par la base de données SQL."
    ],
    a: 0,
    e: "Ces attributs permettent de suivre, trier, filtrer et gérer l'exigence tout au long de son cycle de vie."
  },
  {
    id: 74,
    ch: 5,
    q: "Pourquoi le document de Vision (Vision Document) est-il rédigé avant le SRS ?",
    o: [
      "Pour poser la vue d'ensemble, les opportunités d'affaires et la justification stratégique du projet.",
      "Pour définir immédiatement l'architecture physique des serveurs virtuels.",
      "Pour tester la validité du réseau local en envoyant des requêtes HTTP.",
      "Pour rédiger les scénarios de test d'intégration des développeurs."
    ],
    a: 0,
    e: "Le document de vision cadre le projet à haut niveau, s'assurant que le SRS ne sortira pas des objectifs stratégiques."
  },
  {
    id: 75,
    ch: 5,
    q: "Quel public cible lit et utilise le document de spécification des exigences SRS ?",
    o: [
      "Les clients, les chefs de projet, les concepteurs/développeurs et les testeurs/responsables qualité.",
      "Uniquement les clients finaux sans compétences techniques.",
      "Exclusivement les ingénieurs réseau chargés de la sécurité physique.",
      "Les hébergeurs cloud qui louent les machines virtuelles."
    ],
    a: 0,
    e: "Le SRS sert de langage commun et de contrat technique partagé par toutes les parties prenantes du projet."
  },
  {
    id: 76,
    ch: 5,
    q: "Comment structure-t-on classiquement une User Story en méthodologie agile ?",
    o: [
      "En tant que [Rôle], je veux [Fonctionnalité] afin de [Bénéfice/Valeur].",
      "Si [Condition] alors [Action] sinon [Erreur].",
      "Sujet + doit + exécuteur + critère d'acceptation.",
      "Une description en langage naturel adressée directement au routeur système."
    ],
    a: 0,
    e: "Ce format formalise le rôle cible, le besoin immédiat et surtout la valeur métier apportée par l'histoire."
  },
  {
    id: 77,
    ch: 5,
    q: "Dans le critère agile INVEST pour les User Stories, que signifie la lettre 'I' ?",
    o: [
      "Independent (Indépendante des autres histoires)",
      "Intelligent (Utilisant des algorithmes d'IA)",
      "Internal (Interne à l'équipe technique)",
      "Instant (S'exécutant instantanément à l'écran)"
    ],
    a: 0,
    e: "INVEST signifie Independent, Negotiable, Valuable, Estimable, Small, Testable. L'indépendance facilite la planification."
  },
  {
    id: 78,
    ch: 5,
    q: "Dans le critère INVEST, pourquoi une User Story doit-elle être 'Testable' ?",
    o: [
      "Pour s'assurer qu'on peut définir des critères d'acceptation clairs permettant de valider objectivement sa complétion.",
      "Pour obliger les développeurs à écrire du code de test unitaire en JavaScript.",
      "Pour autoriser le déploiement sur les environnements de staging cloud.",
      "Pour réduire la taille physique des fichiers textes de spécifications."
    ],
    a: 0,
    e: "Si on ne peut pas tester une histoire, on ne peut pas confirmer qu'elle est terminée (définition de 'Done')."
  },
  {
    id: 79,
    ch: 5,
    q: "Qu'est-ce qu'une exigence de conformité réglementaire dans un SRS ?",
    o: [
      "Une exigence imposée par une loi externe ou une norme obligatoire (ex: conformité au RGPD pour la gestion des données).",
      "Une consigne esthétique fixant les couleurs des logos de l'entreprise.",
      "Une règle de validation des requêtes SQL écrite par l'analyste.",
      "L'obligation de n'utiliser que des logiciels libres d'éditeur."
    ],
    a: 0,
    e: "Les exigences réglementaires sont généralement non négociables et constituent des contraintes absolues de mise en conformité légale."
  },
  {
    id: 80,
    ch: 5,
    q: "Pourquoi le SRS inclut-il des diagrammes comportementaux (comme des cas d'utilisation ou des diagrammes d'activités) ?",
    o: [
      "Pour illustrer visuellement les scénarios et simplifier la compréhension de processus complexes qui seraient longs à lire en texte seul.",
      "Pour générer automatiquement le code source de l'application.",
      "Pour remplacer l'écriture textuelle de toutes les exigences fonctionnelles.",
      "Pour tester la performance graphique des processeurs des serveurs."
    ],
    a: 0,
    e: "Les visuels (schémas) complètent le texte en offrant une vue d'ensemble du fonctionnement logique attendu."
  },
  {
    id: 81,
    ch: 5,
    q: "Pourquoi une relecture formelle (review) du SRS par toutes les parties prenantes est-elle essentielle ?",
    o: [
      "Pour valider la justesse du document, obtenir un consensus et éviter de démarrer des développements sur des spécifications erronées.",
      "Pour s'assurer que toutes les pages respectent les marges physiques d'impression.",
      "Pour mesurer la vitesse de lecture des différents relecteurs du projet.",
      "Pour corriger uniquement les fautes d'orthographe de la page d'accueil."
    ],
    a: 0,
    e: "Découvrir et corriger une erreur dans le SRS coûte 10 à 100 fois moins cher que de devoir corriger le code correspondant déjà écrit."
  },
  {
    id: 82,
    ch: 5,
    q: "Dans un SRS, quelle partie décrit les limites technologiques du projet (ex: compatibilité avec tel navigateur) ?",
    o: [
      "Les contraintes de conception et d'implémentation (Design and implementation constraints)",
      "La liste des cas d'utilisation utilisateurs",
      "Le glossaire des définitions métiers",
      "Les critères d'acceptation commerciaux"
    ],
    a: 0,
    e: "Les contraintes d'implémentation restreignent l'architecture à des technologiques spécifiques approuvées."
  },
  {
    id: 83,
    ch: 5,
    q: "Comment appelle-t-on le niveau d'exigences décrivant la rentabilité attendue par l'entreprise suite au projet ?",
    o: [
      "Les exigences d'affaires ou métiers (Business requirements)",
      "Les exigences non fonctionnelles de performance",
      "Les critères d'acceptation du produit final",
      "Les cas de test unitaires"
    ],
    a: 0,
    e: "Les exigences d'affaires (Business requirements) expliquent le 'pourquoi' commercial de l'investissement (ex: réduire les coûts de 15%)."
  },
  {
    id: 84,
    ch: 5,
    q: "Quelle différence majeure distingue le SRS du plan de conception architecturale (System Architecture Document) ?",
    o: [
      "Le SRS dit 'quoi' faire (exigences logicielles) ; le document d'architecture dit 'comment' le construire (structure technique, choix matériels).",
      "Le SRS est écrit par les développeurs et l'architecture par les clients.",
      "L'architecture concerne uniquement le réseau local et le SRS le site internet.",
      "Le SRS est un document public et l'architecture est confidentielle."
    ],
    a: 0,
    e: "Le SRS sert de point d'entrée à l'architecte qui conçoit ensuite l'infrastructure technique appropriée."
  },

  // Chapitre 6: Validation et gestion (85 à 100)
  {
    id: 85,
    ch: 6,
    q: "Quelle est la définition de la validation des exigences ?",
    o: [
      "S'assurer que le document décrit le bon système répondant aux besoins réels des clients (Construisons-nous le bon produit ?).",
      "Vérifier que le code source compile correctement sans renvoyer d'erreurs.",
      "Valider la syntaxe grammaticale et l'orthographe du cahier des charges.",
      "Mesurer le budget final consommé par rapport aux estimations initiales."
    ],
    a: 0,
    e: "La validation vérifie l'adéquation au besoin réel de l'utilisateur final pour éviter de développer un outil inutile."
  },
  {
    id: 86,
    ch: 6,
    q: "Quelle est la définition de la vérification des exigences ?",
    o: [
      "S'assurer que les exigences respectent les règles de forme, de structure, et que le produit final est conforme aux spécifications écrites (Construisons-nous le produit correctement ?).",
      "Interroger les utilisateurs sur leurs futures attentes fonctionnelles.",
      "Vérifier que le client a bien payé la facture de prestation de services.",
      "S'assurer que l'intégrateur a installé le système d'exploitation le plus récent."
    ],
    a: 0,
    e: "La vérification s'assure de la conformité formelle par rapport au cahier des charges et aux critères techniques d'écriture."
  },
  {
    id: 87,
    ch: 6,
    q: "Quel est l'outil principal permettant d'assurer la traçabilité des exigences tout au long d'un projet ?",
    o: [
      "La matrice de traçabilité des exigences (Requirements Traceability Matrix - RTM)",
      "Un diagramme de Gantt pour le suivi des tâches",
      "Une feuille de calcul de budget sur un tableur standard",
      "Un dépôt Git contenant uniquement les fichiers d'infrastructure"
    ],
    a: 0,
    e: "La RTM lie chaque exigence à son besoin d'origine (traçabilité amont) et à son code et cas de test (traçabilité aval)."
  },
  {
    id: 88,
    ch: 6,
    q: "Qu'est-ce que la traçabilité amont (backward traceability) ?",
    o: [
      "Le lien permettant de remonter d'une exigence à la source qui l'a demandée (but commercial, client, loi).",
      "L'enregistrement de l'historique de navigation internet des développeurs.",
      "Le retour à une ancienne version de code source en cas de bug majeur.",
      "La suppression des exigences obsolètes pour revenir à l'état de départ."
    ],
    a: 0,
    e: "La traçabilité amont permet de justifier la présence de chaque exigence (pourquoi elle existe et qui l'a demandée)."
  },
  {
    id: 89,
    ch: 6,
    q: "Qu'est-ce que la traçabilité aval (forward traceability) ?",
    o: [
      "Le lien permettant de suivre une exigence vers les composants logiciels codés et les cas de test associés.",
      "L'anticipation des futurs besoins métiers des concurrents du marché.",
      "Le déploiement automatique de l'application sur le serveur de production.",
      "La planification des tâches de maintenance réseau pour l'année prochaine."
    ],
    a: 0,
    e: "La traçabilité aval garantit que chaque exigence a bien été programmée et effectivement testée avant livraison."
  },
  {
    id: 90,
    ch: 6,
    q: "Qu'est-ce qu'une exigence non testable ?",
    o: [
      "Une exigence formulée de manière trop subjective pour qu'on puisse en valider objectivement le respect par une mesure ou un résultat oui/non.",
      "Une fonctionnalité écrite dans un fichier informatique verrouillé en lecture seule.",
      "Une ligne de spécification rédigée en dehors des réunions de travail officielles.",
      "Une exigence de sécurité réseau n'utilisant pas de protocole chiffré."
    ],
    a: 0,
    e: "Exemple : 'L'application doit plaire à tout le monde' est non testable. Il faut la traduire en critères ergonomiques quantifiables."
  },
  {
    id: 91,
    ch: 6,
    q: "Comment traite-t-on formellement une demande de modification d'exigences en cours de projet ?",
    o: [
      "En suivant un processus formel de contrôle des changements (analyse d'impact, chiffrage et décision d'acceptation/refus).",
      "En écrivant directement la nouvelle fonctionnalité dans le code sans avertir personne.",
      "En refusant systématiquement toutes les demandes de modification par sécurité.",
      "En réinitialisant la ligne de base (baseline) à chaque nouvelle idée du client."
    ],
    a: 0,
    e: "Un processus de gestion des demandes de changement (RFC) évite les dérives de planning et les conflits budgétaires."
  },
  {
    id: 92,
    ch: 6,
    q: "Qu'est-ce qu'un Comité de Contrôle des Changements (CCB - Change Control Board) ?",
    o: [
      "Un groupe de parties prenantes chargé d'analyser, d'arbitrer, d'accepter ou de rejeter les demandes de modification des exigences.",
      "Un logiciel de sécurité qui bloque les tentatives d'intrusion réseau.",
      "L'équipe de développeurs en charge de la correction des bugs de production.",
      "Le conseil d'administration chargé de valider le budget annuel de la société."
    ],
    a: 0,
    e: "Le CCB réunit des profils métiers et techniques pour évaluer l'intérêt et le coût de chaque changement avant décision."
  },
  {
    id: 93,
    ch: 6,
    q: "Qu'est-ce que la Ligne de Base (Baseline) des exigences ?",
    o: [
      "Un ensemble d'exigences validées et approuvées formellement, servant de point de départ aux développements et aux contrôles de changements.",
      "Le nombre minimal de serveurs physiques requis pour faire démarrer le système.",
      "L'écriture de la première ligne de code source HTML de la page d'accueil.",
      "Le temps de réponse réseau de base mesuré lors du lancement."
    ],
    a: 0,
    e: "Une fois la baseline fixée, toute modification des exigences doit obligatoirement passer par le processus formel de contrôle des changements."
  },
  {
    id: 94,
    ch: 6,
    q: "Pourquoi les exigences d'un projet informatique évoluent-elles inévitablement dans le temps ?",
    o: [
      "À cause de l'évolution du marché, de nouvelles lois, d'opportunités d'affaires ou de la clarification progressive des besoins.",
      "Parce que les langages de programmation changent d'instructions tous les mois.",
      "Parce que les serveurs informatiques perdent la mémoire lors des mises à jour.",
      "Parce que la loi RGPD impose de réécrire les cahiers des charges tous les ans."
    ],
    a: 0,
    e: "L'évolution est normale. L'ingénierie des exigences fournit le cadre pour gérer cette évolution de manière contrôlée plutôt que subie."
  },
  {
    id: 95,
    ch: 6,
    q: "En quoi la revue de conception de cas de test (Test-driven requirements) aide-t-elle la validation des exigences ?",
    o: [
      "Écrire les cas de test à l'avance force à préciser les exigences floues ou non testables en détectant les manques logiques.",
      "Elle permet de doubler la vitesse de codage de l'équipe de développement.",
      "Elle supprime la nécessité de tester l'application après le déploiement.",
      "Elle génère automatiquement des rapports financiers pour la comptabilité."
    ],
    a: 0,
    e: "Si l'ingénieur de test n'arrive pas à écrire le cas de test de recette d'une exigence, c'est que l'exigence est mal rédigée ou incomplète."
  },
  {
    id: 96,
    ch: 6,
    q: "Quel rôle joue le prototypage dans la validation finale auprès des clients ?",
    o: [
      "Il permet d'obtenir la confirmation visuelle et interactive du client que le système final correspondra bien à ses attentes métiers.",
      "Il constitue le code source final sécurisé prêt à être hébergé sur les serveurs.",
      "Il réduit à zéro le coût de la formation des futurs utilisateurs du système.",
      "Il remplace le besoin d'effectuer des sauvegardes distantes de données."
    ],
    a: 0,
    e: "Le prototype sert de simulateur pour lever les malentendus de lecture avant d'investir dans le développement lourd."
  },
  {
    id: 97,
    ch: 6,
    q: "Pourquoi le coût de correction d'une erreur d'exigence augmente-t-il de manière exponentielle avec le temps ?",
    o: [
      "Parce que plus on découvre l'erreur tard (ex: en production), plus il faut refaire de code, d'architecture, de documentation et de tests.",
      "Parce que le prix des licences d'exploitation logicielle augmente tous les mois.",
      "Parce que les développeurs facturent plus cher leur travail de nuit en phase finale.",
      "Parce que les bases de données SQL détruisent les données erronées automatiquement."
    ],
    a: 0,
    e: "Corriger une spécification prend 5 minutes de relecture. Corriger une anomalie en production nécessite de lourds cycles de correction et de recette."
  },
  {
    id: 98,
    ch: 6,
    q: "Que désigne la dérive du périmètre (scope creep) dans la gestion d'un projet ?",
    o: [
      "L'ajout progressif et non contrôlé de fonctionnalités non budgétisées dans le périmètre du projet.",
      "Le ralentissement progressif des requêtes SQL sur le serveur de base de données.",
      "L'installation automatique d'outils de sécurité non approuvés par la DSI.",
      "Le changement d'adresse IP des serveurs physiques de l'infrastructure."
    ],
    a: 0,
    e: "Le scope creep dilate les plannings et vide le budget. Il s'évite en maintenant une baseline stricte et un processus de changement."
  },
  {
    id: 99,
    ch: 6,
    q: "Pourquoi conserve-t-on l'historique des versions (changelog) d'un document SRS ?",
    o: [
      "Pour garder la trace de l'historique des arbitrages, des ajouts et des retraits d'exigences validés par le comité.",
      "Pour prouver aux auditeurs réseau que les ordinateurs portables utilisent les bons processeurs.",
      "Pour s'assurer que le document n'est lu que par les personnes figurant dans le journal.",
      "Pour réduire le coût de la facture de maintenance de l'application cliente."
    ],
    a: 0,
    e: "Le journal des modifications assure l'auditabilité du projet et la compréhension des évolutions passées du périmètre."
  },
  {
    id: 100,
    ch: 6,
    q: "Quelle activité suivante n'est pas une activité principale de l'ingénieur des exigences ?",
    o: [
      "La validation",
      "La documentation",
      "La maintenance",
      "La négociation"
    ],
    a: 2,
    e: "Les quatre activités canoniques du cycle de vie des exigences sont l'élicitation (recueil), l'analyse/négociation, la documentation (spécification) et la validation. La maintenance n'en fait pas partie."
  }
];
