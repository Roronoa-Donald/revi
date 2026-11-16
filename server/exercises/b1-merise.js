'use strict';

module.exports = [
  {
    "id": "mr-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Donnée ou information",
    "goal": "Classer des éléments non étiquetés et justifier le rôle du contexte.",
    "brief": "<p>Dans les cas proposés, classez chaque élément non étiqueté : une valeur isolée sans contexte est une donnée ; une valeur contextualisée et interprétable est une information. Dans la grille, écrivez une ligne <code>élément : donnee</code> ou <code>élément : information</code> pour chaque élément. Justifiez chaque choix séparément, dans vos notes ou à l’oral : cette justification libre n’est pas évaluée par l’outil et doit être relue par une personne. Le classement dépend du contexte retenu.</p>",
    "starter": "# Grille d’analyse (mr-c1-e1) — Donnée ou information\n# Classez les éléments ; justifiez séparément vos choix.\n\n[Cas 1 — Relevés A]\n# Données : 12000\n# Données : chiffre d affaires de mars 12000 euros\nA_COMPLETER\n\n[Cas 2 — Relevés B]\n# Données : 25\n# Données : stock du magasin 25 unites\nA_COMPLETER\n\n[Cas 3 — Relevés C]\n# Données : 8\n# Données : temperature mesuree a Lome 30 C\n# Données : 13 juin\nA_COMPLETER\n",
    "hints": [
      "Une valeur isolée est-elle située dans une période, une mesure ou une activité ?",
      "Une justification explique le contexte, au lieu de recopier seulement la catégorie.",
      "Un chiffre brut sans contexte reste une « donnee » ; dès qu il est daté, mesuré ou relié à un objet métier, il devient une « information »."
    ],
    "examples": [
      {
        "stdin": "42\nventes du lundi 42 articles\n",
        "expected": "42 : donnee\nventes du lundi 42 articles : information"
      }
    ],
    "tests": [
      {
        "label": "Relevés A",
        "stdin": "cas:1",
        "expected": "12000 : donnee\nchiffre d affaires de mars 12000 euros : information"
      },
      {
        "label": "Relevés B",
        "stdin": "cas:2",
        "expected": "25 : donnee\nstock du magasin 25 unites : information"
      },
      {
        "label": "Relevés C",
        "stdin": "cas:3",
        "expected": "8 : donnee\ntemperature mesuree a Lome 30 C : information\n13 juin : donnee"
      }
    ],
    "solution": "[Exemple]\n42 : donnee\nventes du lundi 42 articles : information\n\n[Cas 1 — Relevés A]\n12000 : donnee\nchiffre d affaires de mars 12000 euros : information\n\n[Cas 2 — Relevés B]\n25 : donnee\nstock du magasin 25 unites : information\n\n[Cas 3 — Relevés C]\n8 : donnee\ntemperature mesuree a Lome 30 C : information\n13 juin : donnee",
    "takeaway": "À retenir : Classer des éléments non étiquetés et justifier le rôle du contexte."
  },
  {
    "id": "mr-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Trois sous-systèmes à la pharmacie du Marché",
    "exampleTitle": "Exemple résolu — la pizzeria et ses trois sous-systèmes",
    "goal": "Situer le système de décision, le système opérant et le système d'information dans une entreprise réelle.",
    "brief": "<p><strong>Énoncé.</strong> À la <strong>pharmacie du Marché</strong>, Mme Diarra est la titulaire : elle fixe les prix de vente, décide des commandes à passer chez le grossiste et contrôle les comptes en fin de semaine. Ses deux préparateurs accueillent les clients, délivrent les médicaments et encaissent. Le logiciel de la pharmacie, lui, enregistre chaque vente, décompte le stock de chaque boîte et édite chaque soir un rapport pour Mme Diarra.</p><p>Rappel du cours : l'entreprise est un système organisé, finalisé, ouvert, dynamique et régulé. Trois sous-systèmes la composent : le système de décision (analyser, assigner les objectifs, contrôler), le système opérant (réaliser la production de biens et services) et le système d'information (mémoriser, traiter, transmettre).</p><p>Pour les questions 1 à 3, répondez par un seul mot : <code>decision</code>, <code>operant</code> ou <code>information</code>.</p><ol><li>Les préparateurs qui délivrent les médicaments et encaissent appartiennent à quel sous-système ?</li><li>Le logiciel qui enregistre les ventes et décompte les stocks appartient à quel sous-système ?</li><li>Mme Diarra, qui fixe les prix et décide des commandes, appartient à quel sous-système ?</li><li>Le système d'information peut-il décider tout seul de passer une commande chez le grossiste ? (oui/non)</li><li>À la lecture du rapport du soir, Mme Diarra renforce la commande de paracétamol avant la saison des pluies : cette décision corrective illustre quel caractère du système-entreprise ? (un mot : organisé, finalisé, ouvert, dynamique ou régulé)</li></ol>",
    "starter": "# Exercice — Trois sous-systèmes à la pharmacie du Marché\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : decision, operant ou information. Question 5 : un seul mot.\n\n[Question 1 — Sous-système des préparateurs]\nA_COMPLETER\n\n[Question 2 — Sous-système du logiciel de la pharmacie]\nA_COMPLETER\n\n[Question 3 — Sous-système de la titulaire]\nA_COMPLETER\n\n[Question 4 — Le SI décide-t-il seul des commandes ?]\nA_COMPLETER\n\n[Question 5 — Caractère illustré par la décision corrective]\nA_COMPLETER\n",
    "hints": [
      "Trois sous-systèmes, trois rôles : décision (piloter, fixer les objectifs), opérant (produire les biens et services), information (mémoriser, traiter, transmettre).",
      "Classez chaque élément de l'énoncé par son rôle : vendre et délivrer, enregistrer et éditer, ou fixer les prix et contrôler.",
      "Pour la question 5, cherchez le caractère du système-entreprise qui parle de décisions hiérarchisées qui corrigent le fonctionnement."
    ],
    "examples": [
      {
        "stdin": "Dans une pizzeria : les cuisiniers préparent les pizzas et les serveurs les portent en salle ; l'écran de caisse transmet les bons de commande en cuisine et décompte le stock de mozzarella ; le gérant fixe les tarifs de la carte. Un samedi, voyant la salle saturée sur le rapport, le gérant embauche un serveur supplémentaire le week-end.\n\n1) Les cuisiniers et les serveurs : operant.\n2) L'écran de caisse et les bons de commande : information.\n3) Le gérant qui fixe les tarifs : decision.\n4) Le système d'information décide-t-il d'embaucher ? non.\n5) L'embauche qui corrige la saturation du samedi : le caractère regulé.",
        "expected": "operant — information — decision — non — régulé",
        "note": "Le système d'information est la membrane entre décision et opérant : il mémorise et transmet, sans décider ni produire."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Sous-système des préparateurs",
        "stdin": "q:1",
        "expected": "operant||systeme operant"
      },
      {
        "label": "Question 2 — Sous-système du logiciel de la pharmacie",
        "stdin": "q:2",
        "expected": "information||systeme d'information||systeme d’information||si"
      },
      {
        "label": "Question 3 — Sous-système de la titulaire",
        "stdin": "q:3",
        "expected": "decision||systeme de decision"
      },
      {
        "label": "Question 4 — Le SI décide-t-il seul des commandes ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Caractère illustré par la décision corrective",
        "stdin": "q:5",
        "expected": "regule"
      }
    ],
    "solution": "[Question 1 — Sous-système des préparateurs]\noperant\n\n[Question 2 — Sous-système du logiciel de la pharmacie]\ninformation\n\n[Question 3 — Sous-système de la titulaire]\ndecision\n\n[Question 4 — Le SI décide-t-il seul des commandes ?]\nnon\n\n[Question 5 — Caractère illustré par la décision corrective]\nregule",
    "takeaway": "1) Délivrer les médicaments et encaisser, c'est réaliser la production de services : les préparateurs appartiennent au système opérant.\n2) Enregistrer les ventes, décompter les stocks, éditer le rapport du soir : mémoriser, traiter, transmettre. Le logiciel appartient au système d'information.\n3) Fixer les prix, décider des commandes, contrôler les comptes : Mme Diarra appartient au système de décision (pilotage).\n4) Non : le système d'information éclaire la décision, il ne la prend jamais ; il ne fabrique rien non plus — il mémorise, traite et transmet.\n5) Une décision hiérarchisée (celle de la titulaire) qui corrige le fonctionnement (ajuster la commande de paracétamol) illustre le caractère régulé du système-entreprise."
  },
  {
    "id": "mr-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Les informations qui entourent l'auto-école Moderne",
    "exampleTitle": "Exemple résolu — les informations du garagiste",
    "goal": "Classer des informations reçues par un dirigeant par domaine de gestion et compléter la chaîne menant à la connaissance.",
    "brief": "<p><strong>Énoncé.</strong> Koffi dirige l'<strong>auto-école Moderne</strong>. Pour piloter son entreprise, il rassemble chaque semaine des informations d'origines très différentes :</p><ul><li>le Parlement vient de voter une loi qui interdit de passer le permis avant 17 ans révolus ;</li><li>l'auto-école Express, installée de l'autre côté de la rue, affiche des leçons à prix cassés ;</li><li>la Clio d'école tombe en panne de boîte de vitesses pour la deuxième fois du mois ;</li><li>la hausse du prix du carburant alourdit le coût de chaque leçon de conduite.</li></ul><p>Rappel du cours : l'information couvre quatre domaines : économique (conjoncture), juridique (lois, directives, règlements), technique (matériels, processus) et commercial (marché, concurrence, clientèle).</p><p>Répondez par un seul mot à chaque question.</p><ol><li>La nouvelle loi sur l'âge du permis relève de quel domaine ?</li><li>Les prix cassés de l'auto-école Express relèvent de quel domaine ?</li><li>La panne de boîte de vitesses de la Clio relève de quel domaine ?</li><li>La hausse du prix du carburant relève de quel domaine ?</li><li>Complétez la seconde chaîne du cours : information + … = connaissance. Quel est le mot manquant ?</li></ol>",
    "starter": "# Exercice — Les informations qui entourent l'auto-école Moderne\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Chaque réponse tient en un seul mot.\n\n[Question 1 — Domaine de la loi sur l'âge du permis]\nA_COMPLETER\n\n[Question 2 — Domaine des prix cassés du concurrent]\nA_COMPLETER\n\n[Question 3 — Domaine de la panne de la Clio]\nA_COMPLETER\n\n[Question 4 — Domaine de la hausse du carburant]\nA_COMPLETER\n\n[Question 5 — Mot manquant de la chaîne]\nA_COMPLETER\n",
    "hints": [
      "Quatre domaines : économique (conjoncture, coûts), juridique (lois et règlements), technique (matériels et processus), commercial (marché, concurrence, clientèle).",
      "Pour chaque information, demandez-vous d'où elle vient : un texte de loi, un concurrent, une machine, ou la situation économique générale.",
      "Pour la question 5, relisez la seconde ligne de la chaîne du cours : que faut-il ajouter à une information pour en faire une connaissance ?"
    ],
    "examples": [
      {
        "stdin": "Un garagiste rassemble ses informations : une directive impose un contrôle technique renforcé des freins ; un centre de révision rapide ouvre à bas prix de l'autre côté de la rue ; son pont élévateur de 2010 tombe en panne ; la hausse du prix des pièces détachées grève ses marges. Il en conclut : « je dois raisonner autrement mes devis ».\n\n1) Contrôle technique renforcé : juridique.\n2) Centre concurrent à bas prix : commercial.\n3) Pont élévateur en panne : technique.\n4) Hausse du prix des pièces : economique.\n5) information + raisonnement = connaissance.",
        "expected": "juridique — commercial — technique — économique — raisonnement",
        "note": "Le domaine se reconnaît à l'origine de l'information : loi, marché, matériel ou conjoncture économique."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Domaine de la loi sur l'âge du permis",
        "stdin": "q:1",
        "expected": "juridique"
      },
      {
        "label": "Question 2 — Domaine des prix cassés du concurrent",
        "stdin": "q:2",
        "expected": "commercial||commerciale"
      },
      {
        "label": "Question 3 — Domaine de la panne de la Clio",
        "stdin": "q:3",
        "expected": "technique"
      },
      {
        "label": "Question 4 — Domaine de la hausse du carburant",
        "stdin": "q:4",
        "expected": "economique"
      },
      {
        "label": "Question 5 — Mot manquant de la chaîne",
        "stdin": "q:5",
        "expected": "raisonnement||le raisonnement"
      }
    ],
    "solution": "[Question 1 — Domaine de la loi sur l'âge du permis]\njuridique\n\n[Question 2 — Domaine des prix cassés du concurrent]\ncommercial\n\n[Question 3 — Domaine de la panne de la Clio]\ntechnique\n\n[Question 4 — Domaine de la hausse du carburant]\neconomique\n\n[Question 5 — Mot manquant de la chaîne]\nraisonnement",
    "takeaway": "1) Une loi votée par le Parlement contraint l'activité : domaine juridique.\n2) Le comportement d'un concurrent sur le marché : domaine commercial.\n3) Une panne de véhicule, c'est un matériel et un processus de maintenance : domaine technique.\n4) La hausse du prix du carburant relève de la conjoncture : domaine économique.\n5) La chaîne du cours s'écrit : information + raisonnement = connaissance. Le mot manquant est « raisonnement ».\nContrôle : les quatre informations de l'énoncé couvrent les quatre domaines du cours, chacun une fois."
  },
  {
    "id": "mr-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La librairie Le Comptoir des Mots passe au relationnel",
    "exampleTitle": "Exemple résolu — le food-truck découvre les six modèles",
    "goal": "Associer chaque modèle de MERISE (MCD, MLD, MPD, MCT, MOT, MOpT) à son niveau et à sa question.",
    "brief": "<p><strong>Énoncé.</strong> Marc tient la librairie <strong>Le Comptoir des Mots</strong> : clients, commandes, stock de livres, tout est encore sur registres papier. Il fait appel à une analyste qui travaille avec la méthode MERISE. Au premier rendez-vous, elle explique sa <strong>double démarche</strong> : par <strong>niveaux</strong> (conceptuel, logique/organisationnel, physique) et par <strong>étapes</strong> (cycle de vie du projet), et présente les six modèles : MCD, MLD, MPD pour les données ; MCT, MOT, MOpT pour les traitements.</p><p>Rappel du cours : le niveau conceptuel répond à « quoi ? », le niveau logique/organisationnel à « comment organiser ? », le niveau physique à « comment réaliser ? ». L'analyse des données donne une vision statique, celle des traitements une vision dynamique.</p><p>Répondez par un seul mot à chaque question.</p><ol><li>Au niveau conceptuel, à quelle question répond-on : quoi, comment organiser ou comment réaliser ?</li><li>Le MCD, qui décrit clients, commandes et livres sans aucun choix technique, appartient à quel niveau ?</li><li>Le MLD, qui organise les données en tables relationnelles, appartient à quel niveau ?</li><li>Le MPD, où l'on choisit le SGBD et les index, appartient à quel niveau ?</li><li>Les modèles MCT, MOT et MOpT décrivent-ils les données ou les traitements ?</li></ol>",
    "starter": "# Exercice — La librairie Le Comptoir des Mots passe au relationnel\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Chaque réponse tient en un seul mot.\n\n[Question 1 — Question posée au niveau conceptuel]\nA_COMPLETER\n\n[Question 2 — Niveau du MCD]\nA_COMPLETER\n\n[Question 3 — Niveau du MLD]\nA_COMPLETER\n\n[Question 4 — Niveau du MPD]\nA_COMPLETER\n\n[Question 5 — Ce que décrivent MCT, MOT et MOpT]\nA_COMPLETER\n",
    "hints": [
      "Conceptuel = quoi (le métier, sans contrainte technique) ; logique/organisationnel = comment organiser ; physique = comment réaliser.",
      "Les modèles dont le nom finit en D (MCD, MLD, MPD) parlent de données ; ceux dont le nom finit en T (MCT, MOT, MOpT) parlent de traitements.",
      "Pour chaque modèle, posez sa question : décrire sans technique (conceptuel), organiser en tables (logique), choisir le SGBD et les index (physique)."
    ],
    "examples": [
      {
        "stdin": "Un food-truck s'informatise avec MERISE : sandwiches, boissons, commandes des clients.\n\n1) Le conceptuel répond à la question : quoi.\n2) Le MCD des sandwiches et des commandes, sans choix technique : conceptuel.\n3) Le MLD qui organise les données en tables : logique.\n4) Le MPD où l'on choisit le SGBD et les index : physique.\n5) MCT, MOT, MOpT décrivent : les traitements.",
        "expected": "quoi — conceptuel — logique — physique — traitements",
        "note": "Trois niveaux, trois questions (quoi, comment organiser, comment réaliser) et deux axes : les données en D, les traitements en T."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Question posée au niveau conceptuel",
        "stdin": "q:1",
        "expected": "quoi"
      },
      {
        "label": "Question 2 — Niveau du MCD",
        "stdin": "q:2",
        "expected": "conceptuel"
      },
      {
        "label": "Question 3 — Niveau du MLD",
        "stdin": "q:3",
        "expected": "logique||logique organisationnel||organisationnel"
      },
      {
        "label": "Question 4 — Niveau du MPD",
        "stdin": "q:4",
        "expected": "physique"
      },
      {
        "label": "Question 5 — Ce que décrivent MCT, MOT et MOpT",
        "stdin": "q:5",
        "expected": "traitements||traitement||les traitements"
      }
    ],
    "solution": "[Question 1 — Question posée au niveau conceptuel]\nquoi\n\n[Question 2 — Niveau du MCD]\nconceptuel\n\n[Question 3 — Niveau du MLD]\nlogique\n\n[Question 4 — Niveau du MPD]\nphysique\n\n[Question 5 — Ce que décrivent MCT, MOT et MOpT]\ntraitements",
    "takeaway": "1) Le conceptuel décrit le système indépendamment de tout outil : il répond à « quoi ? ».\n2) Le MCD décrit les entités (Client, Commande, Livre) et leurs liens sans aucun choix technique : niveau conceptuel.\n3) Le MLD est la forme machinale du MCD, en tables relationnelles : niveau logique/organisationnel.\n4) Le MPD choisit le SGBD, les types SQL, les index, les fichiers : niveau physique.\n5) MCT, MOT et MOpT sont les trois modèles de traitements : MCT au conceptuel, MOT au logique/organisationnel, MOpT au physique.\nContrôle : sur les six modèles, trois finissent en D (données, vision statique) et trois en T (traitements, vision dynamique)."
  },
  {
    "id": "mr-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le cabinet du Dr Savi entreprend sa modélisation",
    "exampleTitle": "Exemple résolu — le pressing entreprend sa modélisation",
    "goal": "Ordonner le déroulé d'un projet MERISE et distinguer vision statique et vision dynamique.",
    "brief": "<p><strong>Énoncé.</strong> Le <strong>Dr Savi</strong>, médecin généraliste, décide d'informatiser son cabinet : gestion des patients, rendez-vous, ordonnances. Avec son analyste, le projet suit la démarche MERISE. Le Dr Savi raconte d'abord son activité (le patient arrive, on l'enregistre, on le consulte, on édite l'ordonnance) ; l'analyste recense ensuite toutes les propriétés utiles (NumPatient, NomPatient, DateNaissance, DateRdv, HeureRdv…) ; le MCD est dessiné, validé par le médecin, puis traduit en tables relationnelles ; enfin le SGBD est installé et les programmes écrits.</p><p>Rappel du cours : l'analyse des données donne une <strong>vision statique</strong> du système ; l'analyse des traitements, une <strong>vision dynamique</strong>. MERISE avance par une double démarche : par niveaux et par étapes. La démarche va du théorique vers la pratique.</p><p>Répondez de façon courte (un ou deux mots).</p><ol><li>Recenser toutes les propriétés utiles (NumPatient, NomPatient, DateRdv…) se fait dans quel document, première étape avant tout schéma ? (trois mots)</li><li>L'analyse des données (MCD) donne-t-elle une vision statique ou dynamique du système ? (un mot)</li><li>L'analyse des traitements (MCT : enchaînement enregistrer, consulter, éditer) donne-t-elle une vision statique ou dynamique ? (un mot)</li><li>La traduction du MCD validé en tables relationnelles se fait à quel niveau ? (un mot)</li><li>La double démarche de MERISE se fait par niveaux et par … ? (un mot)</li></ol>",
    "starter": "# Exercice — Le cabinet du Dr Savi entreprend sa modélisation\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses courtes : un ou deux mots.\n\n[Question 1 — Document où l'on recense les propriétés]\nA_COMPLETER\n\n[Question 2 — Vision donnée par l'analyse des données]\nA_COMPLETER\n\n[Question 3 — Vision donnée par l'analyse des traitements]\nA_COMPLETER\n\n[Question 4 — Niveau de la traduction en tables]\nA_COMPLETER\n\n[Question 5 — La double démarche : par niveaux et par …]\nA_COMPLETER\n",
    "hints": [
      "Avant tout schéma, l'analyste recense les propriétés une à une dans un document d'inventaire.",
      "Les données décrivent le système à un instant donné (vision statique) ; les traitements déroulent le temps et les enchaînements (vision dynamique).",
      "Le passage aux tables relationnelles se fait au niveau qui répond à « comment organiser ? » ; la double démarche croise les niveaux et le cycle de vie du projet."
    ],
    "examples": [
      {
        "stdin": "Un pressing s'informatise : le patron raconte son activité (déposer, laver, repasser, restituer), puis l'analyste recense NumTicket, DateDepot, NomClient, et enfin traduit le MCD validé en tables.\n\n1) L'inventaire des propriétés se fait dans le dictionnaire de donnees.\n2) L'analyse des données : statique.\n3) L'analyse des traitements (déposer, laver, repasser, restituer) : dynamique.\n4) La traduction du MCD en tables : niveau logique.\n5) La double démarche : par niveaux et par etapes.",
        "expected": "dictionnaire de données — statique — dynamique — logique — étapes",
        "note": "Le dictionnaire précède le MCD, qui précède le MLD : la démarche va du théorique vers la pratique."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Document où l'on recense les propriétés",
        "stdin": "q:1",
        "expected": "dictionnaire de donnees||le dictionnaire de donnees||dictionnaire des donnees||le dictionnaire des donnees"
      },
      {
        "label": "Question 2 — Vision donnée par l'analyse des données",
        "stdin": "q:2",
        "expected": "statique"
      },
      {
        "label": "Question 3 — Vision donnée par l'analyse des traitements",
        "stdin": "q:3",
        "expected": "dynamique"
      },
      {
        "label": "Question 4 — Niveau de la traduction en tables",
        "stdin": "q:4",
        "expected": "logique||logique organisationnel||organisationnel"
      },
      {
        "label": "Question 5 — La double démarche : par niveaux et par …",
        "stdin": "q:5",
        "expected": "etapes||par etapes||les etapes"
      }
    ],
    "solution": "[Question 1 — Document où l'on recense les propriétés]\ndictionnaire de donnees\n\n[Question 2 — Vision donnée par l'analyse des données]\nstatique\n\n[Question 3 — Vision donnée par l'analyse des traitements]\ndynamique\n\n[Question 4 — Niveau de la traduction en tables]\nlogique\n\n[Question 5 — La double démarche : par niveaux et par …]\netapes",
    "takeaway": "1) Les propriétés (NumPatient, NomPatient, DateNaissance, DateRdv…) se recensent dans le dictionnaire de données, matière première du MCD.\n2) L'analyse des données décrit ce que le système mémorise, sans chronologie : vision statique.\n3) L'analyse des traitements décrit les enchaînements dans le temps (enregistrer, consulter, éditer) : vision dynamique.\n4) Le MLD, forme machinale du MCD en tables relationnelles, appartient au niveau logique/organisationnel.\n5) La double démarche de MERISE se fait par niveaux (conceptuel, logique, physique) et par étapes (cycle de vie du projet).\nContrôle : dans le récit du projet, le dictionnaire précède le MCD, qui précède le MLD, qui précède l'installation du SGBD — la démarche va bien du théorique vers la pratique."
  },
  {
    "id": "mr-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Les frais de réservation de la billetterie Sonolive",
    "exampleTitle": "Exemple résolu — le forfait de nuit du chauffeur de taxi",
    "goal": "Justifier par la pérennité qu'une valeur paramétrable doit être une donnée mémorisée et non un traitement codé en dur.",
    "brief": "<p><strong>Énoncé.</strong> La billetterie <strong>Sonolive</strong> vend des places de concerts. Dans le programme qui calcule le montant à payer, le développeur a codé en dur les frais de réservation : <code>montant = prixPlace × nbPlaces + 500</code>, où <strong>500</strong> (francs CFA de frais par commande) est écrit directement dans le programme. La direction décide de porter les frais à 800 F : le développeur doit rouvrir le code, corriger la formule, retester et redéployer. Le prix de chaque place, lui, est saisi et mémorisé pour chaque concert.</p><p>Rappel du cours : c'est l'exemple du taux de TVA — une valeur mémorisée dans le système d'information est une <strong>donnée</strong> ; codée dans le programme, elle appartient aux <strong>traitements</strong>. La séparation données/traitements assure <strong>cohérence</strong> et <strong>pérennité</strong>.</p><ol><li>Dans le programme actuel de Sonolive, les frais de réservation (500) sont-ils traités comme une donnée ou comme un traitement ? (un mot)</li><li>Tant que les frais restent codés en dur, chaque changement de tarif oblige-t-il à réécrire le programme ? (oui/non)</li><li>Si les frais deviennent une donnée mémorisée dans le système d'information, un changement de tarif impose-t-il encore de modifier le programme ? (oui/non)</li><li>Mémoriser les frais comme une donnée, dont héritent tous les programmes de calcul, garantit la cohérence et quel autre avantage cité par le cours ? (un mot)</li><li>Le prix de la place de chaque concert, saisi et mémorisé pour chaque concert, est-il une donnée ou un traitement ? (un mot)</li></ol>",
    "starter": "# Exercice — Les frais de réservation de la billetterie Sonolive\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par un mot ou par oui/non selon la question.\n\n[Question 1 — Nature des frais codés en dur]\nA_COMPLETER\n\n[Question 2 — Faut-il réécrire le programme à chaque changement de frais ?]\nA_COMPLETER\n\n[Question 3 — Avec les frais mémorisés : encore modifier le programme ?]\nA_COMPLETER\n\n[Question 4 — Avantage obtenu avec la cohérence]\nA_COMPLETER\n\n[Question 5 — Nature du prix de la place mémorisé]\nA_COMPLETER\n",
    "hints": [
      "Une valeur écrite en dur dans un programme appartient au traitement ; une valeur saisie et mémorisée pour chaque occurrence est une donnée.",
      "Comparez les deux cas de l'énoncé : les frais figés dans la formule, et le prix de place saisi pour chaque concert.",
      "La séparation données/traitements assure deux avantages : la cohérence (le système est étudié dans sa globalité) et un second bénéfice qui concerne l'avenir des traitements."
    ],
    "examples": [
      {
        "stdin": "Un chauffeur de taxi utilise un programme : course = 1000 + 300 × km, avec le forfait de départ de 1000 F codé en dur. La mairie autorise un forfait de 1200 F. Le tarif kilométrique de 300 F, lui, est affiché et mémorisé.\n\n1) Le forfait codé en dur : traitement.\n2) Chaque changement de forfait oblige-t-il à réécrire le programme ? oui.\n3) Si le forfait devient une donnée mémorisée, faut-il encore modifier le programme ? non.\n4) L'avantage obtenu avec la cohérence : la perennite.\n5) Le tarif kilométrique affiché et mémorisé : donnee.",
        "expected": "traitement — oui — non — pérennité — donnée",
        "note": "Comme le taux de TVA du cours : la donnée se met à jour, les programmes restent — c'est la pérennité."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nature des frais codés en dur",
        "stdin": "q:1",
        "expected": "traitement||un traitement"
      },
      {
        "label": "Question 2 — Faut-il réécrire le programme à chaque changement de frais ?",
        "stdin": "q:2",
        "expected": "oui"
      },
      {
        "label": "Question 3 — Avec les frais mémorisés : encore modifier le programme ?",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Avantage obtenu avec la cohérence",
        "stdin": "q:4",
        "expected": "perennite||la perennite"
      },
      {
        "label": "Question 5 — Nature du prix de la place mémorisé",
        "stdin": "q:5",
        "expected": "donnee||une donnee"
      }
    ],
    "solution": "[Question 1 — Nature des frais codés en dur]\ntraitement\n\n[Question 2 — Faut-il réécrire le programme à chaque changement de frais ?]\noui\n\n[Question 3 — Avec les frais mémorisés : encore modifier le programme ?]\nnon\n\n[Question 4 — Avantage obtenu avec la cohérence]\nperennite\n\n[Question 5 — Nature du prix de la place mémorisé]\ndonnee",
    "takeaway": "1) Les frais de 500 F sont écrits dans le programme, au cœur du calcul : ils sont traités comme un traitement, exactement comme le taux de TVA codé en dur dans le support.\n2) Oui : à chaque changement de tarif (500 → 800 F), le développeur doit rouvrir le code, corriger la formule, retester et redéployer.\n3) Non : si les frais deviennent une donnée mémorisée dans le système d'information, la mise à jour de la donnée suffit ; les programmes qui la lisent restent inchangés.\n4) La pérennité : un nouveau besoin de traitement ou un changement de valeur ne remet pas en cause l'organisation des données.\n5) Le prix de la place est saisi et mémorisé pour chaque concert : c'est une donnée, que le programme de calcul lit.\nContrôle : la situation de Sonolive reproduit trait pour trait l'exemple du taux de TVA du cours — traitement codé en dur à corriger, donnée mémorisée à mettre à jour."
  },
  {
    "id": "mr-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Le dictionnaire de données du camping Les Pins Bleus",
    "exampleTitle": "Exemple résolu — le dictionnaire du salon de coiffure",
    "goal": "Compléter un dictionnaire de données : type, longueur et nature (élémentaire, composée, calculée) de chaque rubrique.",
    "brief": "<p><strong>Énoncé.</strong> Le camping <strong>Les Pins Bleus</strong> prépare l'informatisation de ses réservations. L'analyste a étudié les documents existants (fiche d'accueil, carnet de réservations) et obtient le dictionnaire de données suivant, partiellement rempli :</p><table><tr><th>Rubrique</th><th>Type</th><th>Longueur</th><th>Nature</th></tr><tr><td>NumResa</td><td>Nombre</td><td>4</td><td>élémentaire</td></tr><tr><td>DateDebut</td><td>…</td><td>—</td><td>élémentaire</td></tr><tr><td>NbPersonnes</td><td>Nombre</td><td>2</td><td>élémentaire</td></tr><tr><td>NomCampeur</td><td>…</td><td>30</td><td>élémentaire</td></tr><tr><td>AdresseCampeur</td><td>Texte</td><td>60</td><td>…</td></tr><tr><td>MontantSejour</td><td>Nombre</td><td>8</td><td>…</td></tr></table><p>Précisions de gestion : DateDebut est la date d'arrivée au camping ; NomCampeur est le nom du campeur ; AdresseCampeur assemble numéro, rue et ville (par exemple « 12 rue des Palmiers, Lomé ») ; MontantSejour s'obtient en multipliant le nombre de nuitées par le tarif de l'emplacement.</p><p>Rappel du cours : les types sont texte, nombre et date ; les natures sont élémentaire (non déductible), composée (assemblée par une règle de construction) et calculée (déduite par une règle de calcul). Les propriétés calculées ne s'enregistrent pas : elles se recalculent.</p><p>Répondez par un seul mot, sauf la question 5 (un nombre).</p><ol><li>Quel est le type de la rubrique DateDebut ?</li><li>Quel est le type de la rubrique NomCampeur ?</li><li>Quelle est la nature de la rubrique AdresseCampeur ?</li><li>Quelle est la nature de la rubrique MontantSejour ?</li><li>Quelle est la longueur prévue pour la rubrique NomCampeur ? (un nombre)</li><li>La rubrique MontantSejour doit-elle être enregistrée dans une table du futur modèle ? (oui/non)</li></ol>",
    "starter": "# Exercice — Le dictionnaire de données du camping Les Pins Bleus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Un mot par réponse (sauf la question 5 : un nombre).\n\n[Question 1 — Type de la rubrique DateDebut]\nA_COMPLETER\n\n[Question 2 — Type de la rubrique NomCampeur]\nA_COMPLETER\n\n[Question 3 — Nature de la rubrique AdresseCampeur]\nA_COMPLETER\n\n[Question 4 — Nature de la rubrique MontantSejour]\nA_COMPLETER\n\n[Question 5 — Longueur de la rubrique NomCampeur]\nA_COMPLETER\n\n[Question 6 — MontantSejour enregistrée dans le modèle ?]\nA_COMPLETER\n",
    "hints": [
      "Les types du cours : texte, nombre, date. Les natures : élémentaire (rien ne la déduit), composée (assemblée à partir d'autres informations), calculée (déduite par un calcul).",
      "Pour chaque case vide, relisez la précision de gestion : une date d'arrivée, un nom de campeur, une adresse qui assemble numéro, rue et ville, un montant obtenu par une multiplication.",
      "Le montant du séjour se recalcule à chaque tarif : le cours dit précisément ce qu'il faut faire des propriétés calculées avant de construire le modèle."
    ],
    "examples": [
      {
        "stdin": "Le salon de coiffure Éclat dresse son dictionnaire : NumVisite (Nombre, longueur 5, élémentaire), DateCoupe (—, élémentaire), NomClient (—, longueur 25, élémentaire), AdresseClient (Texte, 50, …), MontantTotal (Nombre, 6, …). L'adresse assemble numéro, rue et ville ; le montant total vaut nombre de prestations × tarif.\n\n1) Type de DateCoupe : date.\n2) Type de NomClient : texte.\n3) Nature de AdresseClient : composee.\n4) Nature de MontantTotal : calculee.\n5) Longueur de NomClient : 25.\n6) MontantTotal enregistrée dans le modèle ? non.",
        "expected": "date — texte — composée — calculée — 25 — non",
        "note": "Une propriété calculée se note dans le dictionnaire mais ne s'enregistre pas : elle se recalcule au moment du traitement."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type de la rubrique DateDebut",
        "stdin": "q:1",
        "expected": "date"
      },
      {
        "label": "Question 2 — Type de la rubrique NomCampeur",
        "stdin": "q:2",
        "expected": "texte"
      },
      {
        "label": "Question 3 — Nature de la rubrique AdresseCampeur",
        "stdin": "q:3",
        "expected": "composee"
      },
      {
        "label": "Question 4 — Nature de la rubrique MontantSejour",
        "stdin": "q:4",
        "expected": "calculee"
      },
      {
        "label": "Question 5 — Longueur de la rubrique NomCampeur",
        "stdin": "q:5",
        "expected": "30"
      },
      {
        "label": "Question 6 — MontantSejour enregistrée dans le modèle ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Type de la rubrique DateDebut]\ndate\n\n[Question 2 — Type de la rubrique NomCampeur]\ntexte\n\n[Question 3 — Nature de la rubrique AdresseCampeur]\ncomposee\n\n[Question 4 — Nature de la rubrique MontantSejour]\ncalculee\n\n[Question 5 — Longueur de la rubrique NomCampeur]\n30\n\n[Question 6 — MontantSejour enregistrée dans le modèle ?]\nnon",
    "takeaway": "1) DateDebut est la date d'arrivée au camping : son type est date.\n2) NomCampeur est le nom du campeur : son type est texte.\n3) AdresseCampeur assemble numéro, rue et ville : sa valeur résulte d'une règle de construction, elle est composée.\n4) MontantSejour = nombre de nuitées × tarif de l'emplacement : sa valeur résulte d'une règle de calcul, elle est calculée.\n5) La longueur prévue pour NomCampeur se lit dans le dictionnaire : 30.\n6) Non : une propriété calculée ne s'enregistre pas, elle se recalcule au moment du traitement — le dictionnaire la note, le MCD l'écarte.\nContrôle : sur six rubriques, quatre sont élémentaires (NumResa, DateDebut, NbPersonnes, NomCampeur), une est composée (AdresseCampeur) et une est calculée (MontantSejour)."
  },
  {
    "id": "mr-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Les règles de gestion du vidéoclub CinéPalmes",
    "exampleTitle": "Exemple résolu — les règles de gestion du loueur de vélos",
    "goal": "Traduire des règles de gestion en dépendances fonctionnelles et contrôler le sens de la flèche.",
    "brief": "<p><strong>Énoncé.</strong> Le vidéoclub <strong>CinéPalmes</strong> gère encore ses emprunts sur fichier papier. L'analyste relève avec Awa, la gérante, les règles de gestion suivantes :</p><ul><li>chaque client reçoit un numéro unique (NumClient) et possède un nom (NomClient) et un téléphone (TelClient) ;</li><li>deux clients peuvent porter le même nom ;</li><li>chaque film reçoit un numéro unique (NumFilm), un titre (TitreFilm) et un support (SupportFilm) ;</li><li>chaque emprunt reçoit un numéro unique (NumEmprunt) et se fait à une date donnée (DateEmprunt) ;</li><li>plusieurs emprunts peuvent avoir lieu le même jour, pour des clients différents.</li></ul><p>Rappel du cours : une dépendance fonctionnelle A → B signifie que connaître la valeur de A suffit à connaître celle de B ; le sens de la flèche compte, A → B ne dit rien de B → A.</p><p>Répondez par oui ou non aux questions 1 à 4.</p><ol><li>La dépendance NumClient → NomClient est-elle fonctionnelle ?</li><li>La dépendance NomClient → NumClient est-elle fonctionnelle ?</li><li>La dépendance NumEmprunt → DateEmprunt est-elle fonctionnelle ?</li><li>La dépendance DateEmprunt → NumClient est-elle fonctionnelle ?</li><li>La règle « le numéro de film détermine le titre du film » se traduit par une dépendance fonctionnelle : quel est le nom de la rubrique source ? (nom exact)</li><li>Dans la dépendance NumClient → TelClient, quel est le nom de la rubrique cible ? (nom exact)</li></ol>",
    "starter": "# Exercice — Les règles de gestion du vidéoclub CinéPalmes\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : oui ou non. Questions 5 et 6 : nom exact d'une rubrique.\n\n[Question 1 — NumClient → NomClient est-elle fonctionnelle ?]\nA_COMPLETER\n\n[Question 2 — NomClient → NumClient est-elle fonctionnelle ?]\nA_COMPLETER\n\n[Question 3 — NumEmprunt → DateEmprunt est-elle fonctionnelle ?]\nA_COMPLETER\n\n[Question 4 — DateEmprunt → NumClient est-elle fonctionnelle ?]\nA_COMPLETER\n\n[Question 5 — Source de la DF numéro de film vers titre]\nA_COMPLETER\n\n[Question 6 — Cible de la DF NumClient → TelClient]\nA_COMPLETER\n",
    "hints": [
      "Une DF A → B : connaître A suffit pour connaître B. Le sens de la flèche compte, et l'inverse n'est pas automatique.",
      "Testez chaque flèche avec des exemples : deux clients homonymes, plusieurs emprunts le même jour, un numéro unique d'emprunt.",
      "Dans la question 5, remplacez mentalement « détermine » par une flèche : la source est la rubrique qui détermine, la cible celle qui est déterminée."
    ],
    "examples": [
      {
        "stdin": "Un loueur de vélos : chaque vélo reçoit un numéro unique (NumVelo), un type (TypeVelo) ; deux vélos peuvent être du même type ; chaque location reçoit un numéro unique (NumLocation), une date (DateLocation) et un montant (MontantLocation) ; plusieurs locations ont lieu le même jour.\n\n1) NumVelo → TypeVelo : oui.\n2) TypeVelo → NumVelo : non.\n3) NumLocation → DateLocation : oui.\n4) DateLocation → NumVelo : non.\n5) Source de « le numéro de vélo détermine le type du vélo » : NumVelo.\n6) Cible de NumLocation → MontantLocation : MontantLocation.",
        "expected": "oui — non — oui — non — NumVelo — MontantLocation",
        "note": "L'unicité de la source fonde la DF ; une cible partagée par plusieurs occurrences (un type, une date) casse la flèche inverse."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — NumClient → NomClient est-elle fonctionnelle ?",
        "stdin": "q:1",
        "expected": "oui"
      },
      {
        "label": "Question 2 — NomClient → NumClient est-elle fonctionnelle ?",
        "stdin": "q:2",
        "expected": "non"
      },
      {
        "label": "Question 3 — NumEmprunt → DateEmprunt est-elle fonctionnelle ?",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — DateEmprunt → NumClient est-elle fonctionnelle ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Source de la DF numéro de film vers titre",
        "stdin": "q:5",
        "expected": "NumFilm"
      },
      {
        "label": "Question 6 — Cible de la DF NumClient → TelClient",
        "stdin": "q:6",
        "expected": "TelClient"
      }
    ],
    "solution": "[Question 1 — NumClient → NomClient est-elle fonctionnelle ?]\noui\n\n[Question 2 — NomClient → NumClient est-elle fonctionnelle ?]\nnon\n\n[Question 3 — NumEmprunt → DateEmprunt est-elle fonctionnelle ?]\noui\n\n[Question 4 — DateEmprunt → NumClient est-elle fonctionnelle ?]\nnon\n\n[Question 5 — Source de la DF numéro de film vers titre]\nNumFilm\n\n[Question 6 — Cible de la DF NumClient → TelClient]\nTelClient",
    "takeaway": "1) Oui : le numéro de client est unique, il détermine le nom du client (NumClient → NomClient).\n2) Non : deux clients peuvent porter le même nom ; à un nom peuvent correspondre plusieurs numéros, la flèche inverse est fausse.\n3) Oui : chaque emprunt a un numéro unique, qui détermine sa date (NumEmprunt → DateEmprunt).\n4) Non : plusieurs emprunts ont lieu le même jour pour des clients différents ; une date ne détermine ni l'emprunt ni le client.\n5) La règle s'écrit NumFilm → TitreFilm : la source est NumFilm.\n6) NumClient → TelClient : la cible, celle qui est déterminée, est TelClient.\nContrôle : les seules DF valides de l'énoncé partent des rubriques numériques uniques (NumClient, NumFilm, NumEmprunt) — les identifiants candidats."
  },
  {
    "id": "mr-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "La matrice des dépendances de la pharmacie du Marché",
    "exampleTitle": "Exemple résolu — la matrice du magasin de pièces auto",
    "goal": "Lire une matrice des dépendances pour trouver un identifiant, une source de DF et une CIF.",
    "brief": "<p><strong>Énoncé.</strong> La <strong>pharmacie du Marché</strong> prépare son futur système de gestion des médicaments. Les propriétés recensées : NumMedicament, NomMedicament, PrixUnitaire, CodeFamille, NomFamille, NumFournisseur, NomFournisseur. Le groupe de propriétés de la famille est identifié par CodeFamille, celui du fournisseur par NumFournisseur. L'analyste dresse la matrice des dépendances :</p><table><tr><th>Source ↓ / Cible →</th><th>NomMedicament</th><th>PrixUnitaire</th><th>CodeFamille</th><th>NomFamille</th><th>NumFournisseur</th><th>NomFournisseur</th></tr><tr><th>NumMedicament</th><td>×</td><td>×</td><td>×</td><td></td><td>×</td><td></td></tr><tr><th>CodeFamille</th><td></td><td></td><td></td><td>×</td><td></td><td></td></tr><tr><th>NumFournisseur</th><td></td><td></td><td></td><td></td><td></td><td>×</td></tr></table><p>Précisions de gestion : chaque famille de médicaments a un code et un seul nom ; deux conditionnements différents d'un même principe actif (boîte de 10 et boîte de 20) portent le même NomMedicament mais des prix différents.</p><p>Rappel du cours : dans la matrice, une croix à l'intersection (ligne source, colonne cible) signale une DF. La source qui détermine le plus de propriétés est un identifiant candidat ; une DF vers l'identifiant d'un autre groupe de propriétés signale une CIF (contrainte d'intégrité fonctionnelle).</p><ol><li>Quelle rubrique détermine toutes les propriétés du groupe médicament et sert d'identifiant à l'entité MEDICAMENT ? (nom exact)</li><li>La dépendance NumMedicament → NumFournisseur relie MEDICAMENT à l'identifiant du groupe fournisseur : quel sigle de trois lettres nomme ce type de contrainte ?</li><li>Quelle est la rubrique source de la dépendance qui détermine NomFamille ? (nom exact)</li><li>La dépendance NomMedicament → PrixUnitaire est-elle fonctionnelle ? (oui/non)</li><li>Combien de croix compte la ligne NumMedicament de la matrice ? (un nombre)</li></ol>",
    "starter": "# Exercice — La matrice des dépendances de la pharmacie du Marché\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par un nom exact de rubrique, un sigle, oui/non ou un nombre.\n\n[Question 1 — Identifiant de l'entité MEDICAMENT]\nA_COMPLETER\n\n[Question 2 — Sigle nommant la contrainte vers un autre groupe]\nA_COMPLETER\n\n[Question 3 — Source de la DF qui détermine NomFamille]\nA_COMPLETER\n\n[Question 4 — NomMedicament → PrixUnitaire est-elle fonctionnelle ?]\nA_COMPLETER\n\n[Question 5 — Croix de la ligne NumMedicament]\nA_COMPLETER\n",
    "hints": [
      "Dans la matrice, chaque croix se lit « la rubrique de la ligne détermine la rubrique de la colonne ».",
      "L'identifiant d'un groupe est la source qui détermine toutes les autres propriétés de ce groupe ; comptez les croix de chaque ligne.",
      "Pour la question 4, servez-vous de la règle des boîtes de 10 et de 20 : à un même nom, combien de prix possibles ?"
    ],
    "examples": [
      {
        "stdin": "Un magasin de pièces auto : NumPiece → NomPiece, PrixPiece, CodeRayon ; CodeRayon → NomRayon. Deux conditionnements d'une même pièce portent le même nom mais des prix différents ; le groupe rayon est identifié par CodeRayon.\n\n1) Identifiant du groupe pièce : NumPiece.\n2) NumPiece → CodeRayon (identifiant du groupe rayon) : c'est une CIF.\n3) Source de la DF vers NomRayon : CodeRayon.\n4) NomPiece → PrixPiece : non.\n5) Croix sur la ligne NumPiece : 3.",
        "expected": "NumPiece — CIF — CodeRayon — non — 3",
        "note": "La ligne la plus remplie de la matrice désigne l'identifiant ; une croix vers l'identifiant d'un autre groupe révèle une CIF."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Identifiant de l'entité MEDICAMENT",
        "stdin": "q:1",
        "expected": "NumMedicament"
      },
      {
        "label": "Question 2 — Sigle nommant la contrainte vers un autre groupe",
        "stdin": "q:2",
        "expected": "cif||contrainte d'integrite fonctionnelle||contrainte d’integrite fonctionnelle"
      },
      {
        "label": "Question 3 — Source de la DF qui détermine NomFamille",
        "stdin": "q:3",
        "expected": "CodeFamille"
      },
      {
        "label": "Question 4 — NomMedicament → PrixUnitaire est-elle fonctionnelle ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Croix de la ligne NumMedicament",
        "stdin": "q:5",
        "expected": "4"
      }
    ],
    "solution": "[Question 1 — Identifiant de l'entité MEDICAMENT]\nNumMedicament\n\n[Question 2 — Sigle nommant la contrainte vers un autre groupe]\ncif\n\n[Question 3 — Source de la DF qui détermine NomFamille]\nCodeFamille\n\n[Question 4 — NomMedicament → PrixUnitaire est-elle fonctionnelle ?]\nnon\n\n[Question 5 — Croix de la ligne NumMedicament]\n4",
    "takeaway": "1) La ligne NumMedicament porte des croix vers NomMedicament, PrixUnitaire, CodeFamille et NumFournisseur : elle détermine toutes les propriétés du groupe, c'est l'identifiant de MEDICAMENT.\n2) NumMedicament → NumFournisseur est une DF vers l'identifiant du groupe fournisseur : le cours nomme cette contrainte une CIF (contrainte d'intégrité fonctionnelle).\n3) La croix vers NomFamille se trouve sur la ligne CodeFamille : la source est CodeFamille (CodeFamille → NomFamille).\n4) Non : la boîte de 10 et la boîte de 20 portent le même NomMedicament mais des prix différents — à un même nom correspondent plusieurs prix, la DF n'est pas fonctionnelle.\n5) La ligne NumMedicament compte une croix vers NomMedicament, une vers PrixUnitaire, une vers CodeFamille et une vers NumFournisseur : 4 croix.\nContrôle : NumMedicament détermine 4 propriétés, CodeFamille et NumFournisseur une chacune — la hiérarchie des sources de la matrice donne les identifiants des trois groupes."
  },
  {
    "id": "mr-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Lire les cardinalités de l'auto-école Moderne",
    "exampleTitle": "Exemple résolu — la salle de sport lit ses cardinalités",
    "goal": "Poser les cardinalités (min,max) des deux côtés d'une association à partir des règles de gestion.",
    "brief": "<p><strong>Énoncé.</strong> L'auto-école <strong>Moderne</strong> fait dessiner le MCD de ses leçons de conduite. Trois entités apparaissent : ÉLÈVE (identifiée par NumEleve), LEÇON (identifiée par NumLecon) et MONITEUR (identifié par NumMoniteur). Les associations et leurs règles de gestion :</p><ul><li>association <strong>Passer</strong> entre ÉLÈVE et LEÇON : « chaque leçon concerne un et un seul élève » ; « un élève n'est considéré comme inscrit qu'à partir de sa première leçon, et peut en passer plusieurs » ;</li><li>association <strong>Assurer</strong> entre MONITEUR et LEÇON : « chaque leçon est assurée par un et un seul moniteur » ; « un moniteur nouvellement embauché peut ne pas encore avoir de leçon au planning ».</li></ul><p>Rappel du cours : la cardinalité (min,max) se lit depuis l'entité qu'elle orne : (0,1) au plus une, (1,1) exactement une, (0,n) zéro à plusieurs, (1,n) au moins une. Une occurrence est un élément individualisé d'une entité.</p><p>Répondez au format 0,1 — 1,1 — 0,n — 1,n.</p><ol><li>Quelle propriété identifie l'entité LEÇON ? (nom exact)</li><li>Quelle est la cardinalité de l'association Passer côté ÉLÈVE ?</li><li>Quelle est la cardinalité de l'association Passer côté LEÇON ?</li><li>Quelle est la cardinalité de l'association Assurer côté MONITEUR ?</li><li>Quelle est la cardinalité de l'association Assurer côté LEÇON ?</li><li>« Koffi », inscrit à l'auto-école pour préparer son permis, est une occurrence de quelle entité ? (nom de l'entité)</li></ol>",
    "starter": "# Exercice — Lire les cardinalités de l'auto-école Moderne\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Cardinalités au format 0,1 — 1,1 — 0,n — 1,n.\n\n[Question 1 — Identifiant de l'entité LEÇON]\nA_COMPLETER\n\n[Question 2 — Cardinalité de Passer côté ÉLÈVE]\nA_COMPLETER\n\n[Question 3 — Cardinalité de Passer côté LEÇON]\nA_COMPLETER\n\n[Question 4 — Cardinalité de Assurer côté MONITEUR]\nA_COMPLETER\n\n[Question 5 — Cardinalité de Assurer côté LEÇON]\nA_COMPLETER\n\n[Question 6 — Entité dont « Koffi » est une occurrence]\nA_COMPLETER\n",
    "hints": [
      "La cardinalité se lit depuis l'entité qu'elle orne : (0,n) = zéro à plusieurs, (1,n) = au moins une, (1,1) = exactement une, (0,1) = au plus une.",
      "Chaque règle fournit un extrême : « un et un seul » donne un maximum de 1 ; « à partir de sa première leçon » donne un minimum de 1 ; « peut ne pas encore avoir » donne un minimum de 0.",
      "« Chaque leçon concerne un et un seul élève » se lit côté LEÇON ; « chaque leçon est assurée par un et un seul moniteur » se lit côté LEÇON aussi. L'occurrence demandée en question 6 est un élément individualisé, pas l'entité entière."
    ],
    "examples": [
      {
        "stdin": "Une salle de sport : MEMBRE (NumMembre), COURS (NumCours), COACH (NumCoach). Association Suivre : « un membre peut être inscrit sans suivre aucun cours collectif » ; « un cours du planning peut n'accueillir aucun membre tant que les inscriptions ne sont pas ouvertes ». Association Animer : « chaque cours est animé par un et un seul coach » ; « un coach du planning anime au moins un cours ».\n\n1) Identifiant de COURS : NumCours.\n2) Suivre côté MEMBRE : 0,n.\n3) Suivre côté COURS : 0,n.\n4) Animer côté COACH : 1,n.\n5) Animer côté COURS : 1,1.\n6) « Marta », inscrite à la salle : une occurrence de MEMBRE.",
        "expected": "NumCours — 0,n — 0,n — 1,n — 1,1 — MEMBRE",
        "note": "Chaque cardinalité se justifie par une phrase du métier : lisez-la depuis l'entité qu'elle orne."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Identifiant de l'entité LEÇON",
        "stdin": "q:1",
        "expected": "NumLecon"
      },
      {
        "label": "Question 2 — Cardinalité de Passer côté ÉLÈVE",
        "stdin": "q:2",
        "expected": "1,n||1 n"
      },
      {
        "label": "Question 3 — Cardinalité de Passer côté LEÇON",
        "stdin": "q:3",
        "expected": "1,1||1 1"
      },
      {
        "label": "Question 4 — Cardinalité de Assurer côté MONITEUR",
        "stdin": "q:4",
        "expected": "0,n||0 n"
      },
      {
        "label": "Question 5 — Cardinalité de Assurer côté LEÇON",
        "stdin": "q:5",
        "expected": "1,1||1 1"
      },
      {
        "label": "Question 6 — Entité dont « Koffi » est une occurrence",
        "stdin": "q:6",
        "expected": "ELEVE||eleve||l'eleve||l’élève||entite eleve"
      }
    ],
    "solution": "[Question 1 — Identifiant de l'entité LEÇON]\nNumLecon\n\n[Question 2 — Cardinalité de Passer côté ÉLÈVE]\n1,n\n\n[Question 3 — Cardinalité de Passer côté LEÇON]\n1,1\n\n[Question 4 — Cardinalité de Assurer côté MONITEUR]\n0,n\n\n[Question 5 — Cardinalité de Assurer côté LEÇON]\n1,1\n\n[Question 6 — Entité dont « Koffi » est une occurrence]\nELEVE",
    "takeaway": "1) L'entité LEÇON est identifiée par NumLecon.\n2) Passer côté ÉLÈVE : un élève n'est inscrit qu'à partir de sa première leçon (minimum 1) et peut en passer plusieurs (maximum n) : (1,n).\n3) Passer côté LEÇON : chaque leçon concerne un et un seul élève : (1,1).\n4) Assurer côté MONITEUR : un moniteur nouvellement embauché peut n'avoir aucune leçon (minimum 0) et en assurer plusieurs (maximum n) : (0,n).\n5) Assurer côté LEÇON : chaque leçon est assurée par un et un seul moniteur : (1,1).\n6) « Koffi » individualise un élève de l'auto-école : c'est une occurrence de l'entité ÉLÈVE.\nContrôle : Passer et Assurer portent toutes deux un (1,1) côté LEÇON — chaque leçon a exactement un élève et exactement un moniteur."
  },
  {
    "id": "mr-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "L'association Réserver de la billetterie Sonolive",
    "exampleTitle": "Exemple résolu — l'agence d'excursions et son association Choisir",
    "goal": "Distinguer association porteuse et association hiérarchique et poser leurs cardinalités.",
    "brief": "<p><strong>Énoncé.</strong> La billetterie <strong>Sonolive</strong> modélise ses ventes de places de concerts. Entités : CLIENT (NumClient), CONCERT (NumConcert, PrixPlace), SALLE (NumSalle). Règles de gestion :</p><ul><li>association <strong>Réserver</strong> entre CLIENT et CONCERT : « un client peut n'avoir réservé aucun concert » ; « un concert peut être en vente sans qu'aucune réservation ne soit encore enregistrée, le temps que les ventes s'ouvrent » ; pour chaque réservation, on note le nombre de places demandées (NbPlaces) ;</li><li>association <strong>SeDérouler</strong> entre CONCERT et SALLE : « chaque concert a lieu dans une et une seule salle » ; « une salle peut rester vide pendant les travaux ».</li></ul><p>Rappel du cours : une association qui porte des données est dite <strong>porteuse</strong> ; une association dont le maximum vaut 1 sur au moins un côté est dite <strong>hiérarchique</strong>. Les deux notions ne sont pas exclusives.</p><ol><li>Quelle propriété l'association Réserver porte-t-elle ? (nom exact)</li><li>Quelle est la cardinalité de Réserver côté CLIENT ? (format 0,n)</li><li>Quelle est la cardinalité de Réserver côté CONCERT ?</li><li>Quelle est la cardinalité de SeDérouler côté CONCERT ?</li><li>Quelle est la cardinalité de SeDérouler côté SALLE ?</li><li>Le maximum de SeDérouler vaut 1 côté concert : cette association est dite porteuse ou hiérarchique ? (un mot)</li></ol>",
    "starter": "# Exercice — L'association Réserver de la billetterie Sonolive\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Cardinalités au format 0,1 — 1,1 — 0,n — 1,n.\n\n[Question 1 — Propriété portée par l'association Réserver]\nA_COMPLETER\n\n[Question 2 — Cardinalité de Réserver côté CLIENT]\nA_COMPLETER\n\n[Question 3 — Cardinalité de Réserver côté CONCERT]\nA_COMPLETER\n\n[Question 4 — Cardinalité de SeDérouler côté CONCERT]\nA_COMPLETER\n\n[Question 5 — Cardinalité de SeDérouler côté SALLE]\nA_COMPLETER\n\n[Question 6 — Nature de l'association SeDérouler]\nA_COMPLETER\n",
    "hints": [
      "Une association porteuse porte des données ; les cardinalités se posent de chaque côté et se lisent depuis l'entité ornée.",
      "« Peut n'avoir réservé aucun concert » fixe le minimum côté client ; « en vente sans réservation » fixe le minimum côté concert.",
      "« Une et une seule salle » se lit côté concert ; « une salle vide pendant les travaux » fixe le minimum côté salle. Cherchez ensuite le nom que le cours donne à une association dont un maximum vaut 1."
    ],
    "examples": [
      {
        "stdin": "Une agence d'excursions en mer : CLIENT (NumClient), EXCURSION (NumExcursion), GUIDE (NumGuide). Association Choisir : « un client peut ne choisir aucune excursion » ; « une excursion au programme peut rester sans client en basse saison » ; l'association porte le nombre de participants (NbParticipants). Association Encadrer : « chaque excursion est encadrée par un et un seul guide » ; « un guide peut être en congé, sans excursion ».\n\n1) Propriété portée par Choisir : NbParticipants.\n2) Choisir côté CLIENT : 0,n.\n3) Choisir côté EXCURSION : 0,n.\n4) Encadrer côté EXCURSION : 1,1.\n5) Encadrer côté GUIDE : 0,n.\n6) Encadrer (maximum 1 côté excursion) : hierarchique.",
        "expected": "NbParticipants — 0,n — 0,n — 1,1 — 0,n — hiérarchique",
        "note": "L'association n–n porte les données comptées « pour chaque couple » ; l'association dont un maximum vaut 1 est hiérarchique."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Propriété portée par l'association Réserver",
        "stdin": "q:1",
        "expected": "NbPlaces"
      },
      {
        "label": "Question 2 — Cardinalité de Réserver côté CLIENT",
        "stdin": "q:2",
        "expected": "0,n||0 n"
      },
      {
        "label": "Question 3 — Cardinalité de Réserver côté CONCERT",
        "stdin": "q:3",
        "expected": "0,n||0 n"
      },
      {
        "label": "Question 4 — Cardinalité de SeDérouler côté CONCERT",
        "stdin": "q:4",
        "expected": "1,1||1 1"
      },
      {
        "label": "Question 5 — Cardinalité de SeDérouler côté SALLE",
        "stdin": "q:5",
        "expected": "0,n||0 n"
      },
      {
        "label": "Question 6 — Nature de l'association SeDérouler",
        "stdin": "q:6",
        "expected": "hierarchique||association hierarchique"
      }
    ],
    "solution": "[Question 1 — Propriété portée par l'association Réserver]\nNbPlaces\n\n[Question 2 — Cardinalité de Réserver côté CLIENT]\n0,n\n\n[Question 3 — Cardinalité de Réserver côté CONCERT]\n0,n\n\n[Question 4 — Cardinalité de SeDérouler côté CONCERT]\n1,1\n\n[Question 5 — Cardinalité de SeDérouler côté SALLE]\n0,n\n\n[Question 6 — Nature de l'association SeDérouler]\nhierarchique",
    "takeaway": "1) Réserver porte le nombre de places demandées : NbPlaces — une donnée qui concerne le couple (client, concert), pas un client seul ni un concert seul.\n2) Réserver côté CLIENT : un client peut n'avoir réservé aucun concert et en réserver plusieurs : (0,n).\n3) Réserver côté CONCERT : un concert peut être en vente sans réservation et être réservé par plusieurs clients : (0,n). L'association est donc n–n et porteuse.\n4) SeDérouler côté CONCERT : chaque concert a lieu dans une et une seule salle : (1,1).\n5) SeDérouler côté SALLE : une salle peut rester vide (minimum 0) et accueillir plusieurs concerts (maximum n) : (0,n).\n6) Le maximum de SeDérouler vaut 1 côté concert : l'association est hiérarchique.\nContrôle : les données portées (NbPlaces) ne déterminent pas les cardinalités — Réserver est n–n et porteuse, SeDérouler est hiérarchique sans donnée portée."
  },
  {
    "id": "mr-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le MCD des rendez-vous du Dr Savi",
    "exampleTitle": "Exemple résolu — le MCD du cabinet dentaire",
    "goal": "Construire un MCD complet : occurrences, identifiants et cardinalités issues des règles de gestion.",
    "brief": "<p><strong>Énoncé.</strong> Le <strong>Dr Savi</strong> fait construire le MCD de la gestion de ses rendez-vous. Le dictionnaire a donné trois entités : PATIENT (NumPatient, NomPatient, DateNaissance, TelPatient), RENDEZ-VOUS (NumRdv, DateRdv, HeureRdv) et MEDECIN (NumMedecin, NomMedecin, Specialite). Règles de gestion :</p><ul><li>association <strong>Prendre</strong> entre PATIENT et RENDEZ-VOUS : « chaque rendez-vous concerne un et un seul patient » ; « un patient n'entre dans le fichier qu'à partir de son premier rendez-vous, puis en prend plusieurs » ;</li><li>association <strong>Accorder</strong> entre MEDECIN et RENDEZ-VOUS : « chaque rendez-vous est accordé par un et un seul médecin » ; « un médecin du cabinet figure au planning dès son premier rendez-vous, et en accorde plusieurs ».</li></ul><p>Rappel du cours : une occurrence est un élément individualisé d'une entité ; chaque entité possède un identifiant, stable, minimal et univalué. Une association peut porter des données, indépendamment de ses cardinalités.</p><ol><li>« Ama, née en 1992, téléphone pour prendre rendez-vous » : « Ama » est une occurrence de quelle entité ? (nom de l'entité)</li><li>Quelle propriété identifie l'entité RENDEZ-VOUS ? (nom exact)</li><li>Quelle est la cardinalité de l'association Prendre côté PATIENT ? (format 0,n)</li><li>Quelle est la cardinalité de l'association Prendre côté RENDEZ-VOUS ?</li><li>Quelle est la cardinalité de l'association Accorder côté MEDECIN ?</li><li>Combien d'entités compte ce MCD ? (un nombre)</li></ol>",
    "starter": "# Exercice — Le MCD des rendez-vous du Dr Savi\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Cardinalités au format 0,1 — 1,1 — 0,n — 1,n.\n\n[Question 1 — Entité dont « Ama » est une occurrence]\nA_COMPLETER\n\n[Question 2 — Identifiant de l'entité RENDEZ-VOUS]\nA_COMPLETER\n\n[Question 3 — Cardinalité de Prendre côté PATIENT]\nA_COMPLETER\n\n[Question 4 — Cardinalité de Prendre côté RENDEZ-VOUS]\nA_COMPLETER\n\n[Question 5 — Cardinalité de Accorder côté MEDECIN]\nA_COMPLETER\n\n[Question 6 — Nombre d'entités du MCD]\nA_COMPLETER\n",
    "hints": [
      "Une occurrence individualise : « Ama » désigne un patient précis, pas la patientèle entière.",
      "Chaque règle de gestion fournit les extrêmes : « un et un seul » donne un maximum de 1 ; « à partir de son premier » donne un minimum de 1.",
      "Les deux associations tournent autour de RENDEZ-VOUS : posez les deux extrémités de chacune, puis comptez les entités nommées par le dictionnaire."
    ],
    "examples": [
      {
        "stdin": "Un cabinet dentaire : PATIENT (NumPat, NomPat, DateNaissPat), CONSULTATION (NumCons, DateCons), DENTISTE (NumDent, NomDent). Association Effectuer : « chaque consultation concerne un et un seul patient » ; « un patient n'existe dans le fichier qu'à partir de sa première consultation ». Association Réaliser : « chaque consultation est réalisée par un et un seul dentiste » ; « un dentiste du cabinet réalise au moins une consultation ».\n\n1) « Bruno » est une occurrence de : PATIENT.\n2) Identifiant de CONSULTATION : NumCons.\n3) Effectuer côté PATIENT : 1,n.\n4) Effectuer côté CONSULTATION : 1,1.\n5) Réaliser côté DENTISTE : 1,n.\n6) Nombre d'entités : 3.",
        "expected": "PATIENT — NumCons — 1,n — 1,1 — 1,n — 3",
        "note": "Deux associations 1–n qui convergent vers la même entité centrale : chaque consultation a exactement un patient et un dentiste."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Entité dont « Ama » est une occurrence",
        "stdin": "q:1",
        "expected": "PATIENT||patient||le patient||entite patient"
      },
      {
        "label": "Question 2 — Identifiant de l'entité RENDEZ-VOUS",
        "stdin": "q:2",
        "expected": "NumRdv"
      },
      {
        "label": "Question 3 — Cardinalité de Prendre côté PATIENT",
        "stdin": "q:3",
        "expected": "1,n||1 n"
      },
      {
        "label": "Question 4 — Cardinalité de Prendre côté RENDEZ-VOUS",
        "stdin": "q:4",
        "expected": "1,1||1 1"
      },
      {
        "label": "Question 5 — Cardinalité de Accorder côté MEDECIN",
        "stdin": "q:5",
        "expected": "1,n||1 n"
      },
      {
        "label": "Question 6 — Nombre d'entités du MCD",
        "stdin": "q:6",
        "expected": "3"
      }
    ],
    "solution": "[Question 1 — Entité dont « Ama » est une occurrence]\nPATIENT\n\n[Question 2 — Identifiant de l'entité RENDEZ-VOUS]\nNumRdv\n\n[Question 3 — Cardinalité de Prendre côté PATIENT]\n1,n\n\n[Question 4 — Cardinalité de Prendre côté RENDEZ-VOUS]\n1,1\n\n[Question 5 — Cardinalité de Accorder côté MEDECIN]\n1,n\n\n[Question 6 — Nombre d'entités du MCD]\n3",
    "takeaway": "1) « Ama » individualise un patient du cabinet : c'est une occurrence de l'entité PATIENT.\n2) L'entité RENDEZ-VOUS est identifiée par NumRdv.\n3) Prendre côté PATIENT : un patient n'entre dans le fichier qu'à partir de son premier rendez-vous (minimum 1) et en prend plusieurs (maximum n) : (1,n).\n4) Prendre côté RENDEZ-VOUS : chaque rendez-vous concerne un et un seul patient : (1,1).\n5) Accorder côté MEDECIN : un médecin figure au planning dès son premier rendez-vous (minimum 1) et en accorde plusieurs (maximum n) : (1,n).\n6) Le dictionnaire cite trois entités : PATIENT, RENDEZ-VOUS et MEDECIN.\nContrôle : les deux associations sont hiérarchiques (maximum 1 côté rendez-vous) : PATIENT 1,n — 1,1 RENDEZ-VOUS 1,1 — 1,n MEDECIN, avec NumRdv comme identifiant central."
  },
  {
    "id": "mr-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les règles de passage MCD vers MLD",
    "goal": "Déterminer une traduction du MCD à partir des cardinalités, même sans attribut porté.",
    "brief": "<p>Chaque ligne décrit soit <code>nom entite</code>, soit <code>nom assoc maxA maxB attributs</code>, où maxA et maxB sont les maximums des cardinalités, chacun vaut <code>1</code> ou <code>n</code>, et attributs vaut <code>oui</code> ou <code>non</code>. Pour chaque ligne, écrivez <code>nom : TABLE</code> pour une entité, <code>nom : TABLE_LIAISON</code> pour une association n–n, <code>nom : CLE_MIGREE</code> pour une association 1–n, ou <code>nom : CHOIX_1_1</code> pour 1–1. Une association n–n demande une table de liaison même sans attribut ; en 1–n ses éventuels attributs accompagnent la clé dans la table du côté de maximum 1. En 1–1, le choix du côté et les contraintes exigent une analyse complémentaire. Le modèle ne traite que des associations binaires et leurs maximums ; les minimums et autres contraintes sont à examiner à part.</p>",
    "starter": "# Grille d’analyse (mr-c5-e1) — MCD vers MLD\n# Classez selon les cardinalités maximales.\n\n[Cas 1 — Association sans propriété]\n# Données : SUIVRE assoc n n non\n# Données : ETUDIANT entite\n# Données : COURS entite\nA_COMPLETER\n\n[Cas 2 — Deux associations]\n# Données : PARTICIPER assoc n n oui\n# Données : APPARTENIR assoc n 1 oui\nA_COMPLETER\n\n[Cas 3 — Choix selon les maximums]\n# Données : CLIENT entite\n# Données : EMETTRE assoc n 1 non\n# Données : DIRIGER assoc 1 1 oui\n# Données : SUIVRE assoc n n non\nA_COMPLETER\n",
    "hints": [
      "Deux maximums n demandent une liaison, que l’association porte ou non des propriétés.",
      "Avec un seul maximum 1, la clé migre du côté qui porte ce maximum ; avec deux, discutez le choix.",
      "Une entité devient toujours une TABLE ; une association max (n,n) devient TABLE_LIAISON tandis qu une (1,n) migre comme CLE_MIGREE."
    ],
    "examples": [
      {
        "stdin": "CLIENT entite\nFACTURE entite\nEMETTRE assoc n 1 non\n",
        "expected": "CLIENT : TABLE\nFACTURE : TABLE\nEMETTRE : CLE_MIGREE"
      }
    ],
    "tests": [
      {
        "label": "Association sans propriété",
        "stdin": "cas:1",
        "expected": "SUIVRE : TABLE_LIAISON\nETUDIANT : TABLE\nCOURS : TABLE"
      },
      {
        "label": "Deux associations",
        "stdin": "cas:2",
        "expected": "PARTICIPER : TABLE_LIAISON\nAPPARTENIR : CLE_MIGREE"
      },
      {
        "label": "Choix selon les maximums",
        "stdin": "cas:3",
        "expected": "CLIENT : TABLE\nEMETTRE : CLE_MIGREE\nDIRIGER : CHOIX_1_1\nSUIVRE : TABLE_LIAISON"
      }
    ],
    "solution": "[Exemple]\nCLIENT : TABLE\nFACTURE : TABLE\nEMETTRE : CLE_MIGREE\n\n[Cas 1 — Association sans propriété]\nSUIVRE : TABLE_LIAISON\nETUDIANT : TABLE\nCOURS : TABLE\n\n[Cas 2 — Deux associations]\nPARTICIPER : TABLE_LIAISON\nAPPARTENIR : CLE_MIGREE\n\n[Cas 3 — Choix selon les maximums]\nCLIENT : TABLE\nEMETTRE : CLE_MIGREE\nDIRIGER : CHOIX_1_1\nSUIVRE : TABLE_LIAISON",
    "takeaway": "À retenir : Déterminer une traduction du MCD à partir des cardinalités, même sans attribut porté."
  },
  {
    "id": "mr-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le schéma relationnel du camping Les Pins Bleus",
    "exampleTitle": "Exemple résolu — le schéma relationnel du garage",
    "goal": "Dériver le MLD d'un MCD : tables, clés primaires, clés étrangères et intégrité référentielle.",
    "brief": "<p><strong>Énoncé.</strong> Le camping <strong>Les Pins Bleus</strong> a validé le MCD de ses séjours :</p><ul><li>CAMPEUR (NumCampeur, NomCampeur, TelCampeur) ;</li><li>EMPLACEMENT (NumEmpl, SurfaceEmpl, TarifEmpl) ;</li><li>SEJOUR (NumSejour, DateArrivee, NbNuits) ;</li><li>association <strong>Effectuer</strong> : CAMPEUR 0,n — 1,1 SEJOUR (« un campeur du fichier peut ne rien avoir réservé ; chaque séjour est effectué par un et un seul campeur ») ;</li><li>association <strong>Occuper</strong> : EMPLACEMENT 0,n — 1,1 SEJOUR (« un emplacement peut être libre ; chaque séjour occupe un et un seul emplacement »).</li></ul><p>Rappel du cours : toute entité devient une table ; une association 1–n ne devient pas une table : la clé de l'autre table migre comme clé étrangère (#) dans la table du côté maximum 1. L'intégrité référentielle impose qu'une clé étrangère référence une clé existante de la table visée.</p><ol><li>Combien de tables compte le MLD du camping ? (un nombre)</li><li>Quelle est la clé primaire de la table SEJOUR ? (nom exact)</li><li>Combien de clés étrangères la table SEJOUR reçoit-elle ? (un nombre)</li><li>Donnez les deux attributs de SEJOUR qui sont des clés étrangères (noms exacts, séparés par un espace).</li><li>L'association Occuper, binaire 1–n, devient-elle une table de liaison ? (oui/non)</li><li>On enregistre le séjour n° 30 pour le campeur n° 25 alors que les campeurs du fichier vont de 1 à 12 : quelle intégrité est violée ? (un mot : référentielle, domaine ou relation)</li></ol>",
    "starter": "# Exercice — Le schéma relationnel du camping Les Pins Bleus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par un nombre, un nom exact, oui/non ou un mot selon la question.\n\n[Question 1 — Nombre de tables du MLD]\nA_COMPLETER\n\n[Question 2 — Clé primaire de la table SEJOUR]\nA_COMPLETER\n\n[Question 3 — Clés étrangères reçues par SEJOUR]\nA_COMPLETER\n\n[Question 4 — Les deux clés étrangères de SEJOUR]\nA_COMPLETER\n\n[Question 5 — Occuper devient-elle une table de liaison ?]\nA_COMPLETER\n\n[Question 6 — Intégrité violée par le campeur n° 25]\nA_COMPLETER\n",
    "hints": [
      "Règle 1 : chaque entité devient une table. Les associations 1–n, elles, ne deviennent jamais des tables.",
      "Chaque association 1–n fait migrer la clé de l'autre table dans SEJOUR, précédée de #.",
      "Une clé étrangère qui pointe vers une ligne inexistante de la table visée viole l'intégrité qui contrôle les liens entre tables."
    ],
    "examples": [
      {
        "stdin": "Un garage : CLIENT (NumClient, NomClient), VOITURE (NumVoiture, MarqueVoiture), REPARATION (NumRep, DateRep). Confier : CLIENT 0,n — 1,1 REPARATION. Concerner : VOITURE 0,n — 1,1 REPARATION.\n\n1) Nombre de tables : 3.\n2) Clé primaire de REPARATION : NumRep.\n3) Clés étrangères reçues par REPARATION : 2.\n4) Ces clés : NumClient NumVoiture.\n5) L'association 1–n devient-elle une table de liaison ? non.\n6) Une réparation référant le client n° 40, inexistant : integrite referentielle.",
        "expected": "3 — NumRep — 2 — NumClient NumVoiture — non — référentielle",
        "note": "Deux associations 1–n convergent vers la même table : elle reçoit deux clés étrangères, une par association."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de tables du MLD",
        "stdin": "q:1",
        "expected": "3"
      },
      {
        "label": "Question 2 — Clé primaire de la table SEJOUR",
        "stdin": "q:2",
        "expected": "NumSejour"
      },
      {
        "label": "Question 3 — Clés étrangères reçues par SEJOUR",
        "stdin": "q:3",
        "expected": "2"
      },
      {
        "label": "Question 4 — Les deux clés étrangères de SEJOUR",
        "stdin": "q:4",
        "expected": "NumCampeur NumEmpl||#NumCampeur #NumEmpl||NumCampeur et NumEmpl||NumCampeur+NumEmpl"
      },
      {
        "label": "Question 5 — Occuper devient-elle une table de liaison ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Intégrité violée par le campeur n° 25",
        "stdin": "q:6",
        "expected": "referentielle||integrite referentielle||l'integrite referentielle||l’integrite referentielle"
      }
    ],
    "solution": "[Question 1 — Nombre de tables du MLD]\n3\n\n[Question 2 — Clé primaire de la table SEJOUR]\nNumSejour\n\n[Question 3 — Clés étrangères reçues par SEJOUR]\n2\n\n[Question 4 — Les deux clés étrangères de SEJOUR]\nNumCampeur NumEmpl\n\n[Question 5 — Occuper devient-elle une table de liaison ?]\nnon\n\n[Question 6 — Intégrité violée par le campeur n° 25]\nreferentielle",
    "takeaway": "1) Trois entités (CAMPEUR, EMPLACEMENT, SEJOUR) donnent trois tables ; les deux associations sont 1–n et n'en donnent aucune de plus : 3 tables.\n2) La clé primaire de SEJOUR est son identifiant : NumSejour.\n3) SEJOUR est le côté maximum 1 des deux associations : elle reçoit une clé étrangère par association, soit 2.\n4) SEJOUR (NumSejour, DateArrivee, NbNuits, #NumCampeur, #NumEmpl) : les clés étrangères sont NumCampeur et NumEmpl.\n5) Non : seules les associations n–n deviennent des tables de liaison ; pour une 1–n, la clé migre, avec les éventuelles propriétés portées.\n6) La clé étrangère #NumCampeur vaut 25, qui n'existe pas dans CAMPEUR (de 1 à 12) : l'intégrité référentielle est violée.\nContrôle : CAMPEUR et EMPLACEMENT ne reçoivent aucune clé étrangère ; SEJOUR en reçoit deux — la migration suit le maximum 1."
  },
  {
    "id": "mr-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Le schéma relationnel complet du vidéoclub CinéPalmes",
    "exampleTitle": "Exemple résolu — le schéma du loueur de matériel de ski",
    "goal": "Écrire le MLD complet d'un MCD à quatre tables : clés primaires, clés étrangères et propriétés portées.",
    "brief": "<p><strong>Énoncé.</strong> Le vidéoclub <strong>CinéPalmes</strong> a validé son MCD :</p><ul><li>CLIENT (NumClient, NomClient, TelClient) ;</li><li>EMPRUNT (NumEmprunt, DateEmprunt) ;</li><li>FILM (NumFilm, TitreFilm, SupportFilm) ;</li><li>association <strong>Effectuer</strong> : CLIENT 0,n — 1,1 EMPRUNT (« un client peut ne rien avoir emprunté ; chaque emprunt est effectué par un et un seul client ») ;</li><li>association <strong>Contenir</strong> : EMPRUNT 1,n — 0,n FILM, porte DureeLocation (« chaque emprunt concerne au moins un film ; un film peut être disponible, sans emprunt en cours ; pour chaque film emprunté, on note la durée de location en jours »).</li></ul><p>Rappel du cours : entité → table ; association binaire n–n → table de liaison (même sans propriété), dont la clé est le couple des identifiants ; association 1–n → migration de la clé (#) dans la table du côté maximum 1, avec les propriétés portées.</p><ol><li>Combien de tables compte le MLD complet du vidéoclub ? (un nombre)</li><li>Quelle est la clé primaire de la table EMPRUNT ? (nom exact)</li><li>Dans quelle table la clé NumClient migre-t-elle comme clé étrangère ? (nom de la table)</li><li>La table de liaison de Contenir a pour clé le couple des deux identifiants : donnez ces deux attributs (noms exacts, séparés par un espace).</li><li>La table FILM reçoit-elle une clé étrangère ? (oui/non)</li><li>La propriété portée DureeLocation se retrouve-t-elle dans la table FILM, dans la table EMPRUNT ou dans la table de liaison ? (répondez : FILM, EMPRUNT ou liaison)</li></ol>",
    "starter": "# Exercice — Le schéma relationnel complet du vidéoclub CinéPalmes\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par un nombre, un nom exact, oui/non ou un mot selon la question.\n\n[Question 1 — Nombre de tables du MLD complet]\nA_COMPLETER\n\n[Question 2 — Clé primaire de la table EMPRUNT]\nA_COMPLETER\n\n[Question 3 — Table qui reçoit NumClient comme clé étrangère]\nA_COMPLETER\n\n[Question 4 — Clé de la table de liaison de Contenir]\nA_COMPLETER\n\n[Question 5 — La table FILM reçoit-elle une clé étrangère ?]\nA_COMPLETER\n\n[Question 6 — Où se retrouve la propriété portée DureeLocation]\nA_COMPLETER\n",
    "hints": [
      "Comptez les tables : une par entité, plus une table de liaison pour l'association n–n Contenir.",
      "Effectuer est une association 1–n : la clé de CLIENT migre dans la table du côté maximum 1. FILM, lui, n'est le côté maximum 1 d'aucune association.",
      "La table de liaison de Contenir porte la clé composée des deux identifiants et récupère la propriété portée : elle décrit chaque couple (emprunt, film)."
    ],
    "examples": [
      {
        "stdin": "Un loueur de matériel de ski : CLIENT (NumClient, NomClient), LOCATION (NumLocation, DateLocation), MATERIEL (RefMateriel, TailleMateriel). Effectuer : CLIENT 0,n — 1,1 LOCATION. Contenir : LOCATION 1,n — 0,n MATERIEL, porte CautionMateriel.\n\n1) Nombre de tables : 4.\n2) Clé primaire de LOCATION : NumLocation.\n3) NumClient migre dans : LOCATION.\n4) Clé de la table de liaison : NumLocation RefMateriel.\n5) MATERIEL reçoit-elle une clé étrangère ? non.\n6) CautionMateriel se retrouve dans : la table de liaison.",
        "expected": "4 — NumLocation — LOCATION — NumLocation RefMateriel — non — table de liaison",
        "note": "La propriété portée par une association n–n suit toujours la table de liaison : elle décrit le couple, pas une entité seule."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de tables du MLD complet",
        "stdin": "q:1",
        "expected": "4"
      },
      {
        "label": "Question 2 — Clé primaire de la table EMPRUNT",
        "stdin": "q:2",
        "expected": "NumEmprunt"
      },
      {
        "label": "Question 3 — Table qui reçoit NumClient comme clé étrangère",
        "stdin": "q:3",
        "expected": "EMPRUNT||la table emprunt||l'emprunt||l’emprunt"
      },
      {
        "label": "Question 4 — Clé de la table de liaison de Contenir",
        "stdin": "q:4",
        "expected": "NumEmprunt NumFilm||#NumEmprunt #NumFilm||NumEmprunt et NumFilm||NumEmprunt+NumFilm"
      },
      {
        "label": "Question 5 — La table FILM reçoit-elle une clé étrangère ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Où se retrouve la propriété portée DureeLocation",
        "stdin": "q:6",
        "expected": "liaison||table de liaison||la table de liaison"
      }
    ],
    "solution": "[Question 1 — Nombre de tables du MLD complet]\n4\n\n[Question 2 — Clé primaire de la table EMPRUNT]\nNumEmprunt\n\n[Question 3 — Table qui reçoit NumClient comme clé étrangère]\nEMPRUNT\n\n[Question 4 — Clé de la table de liaison de Contenir]\nNumEmprunt NumFilm\n\n[Question 5 — La table FILM reçoit-elle une clé étrangère ?]\nnon\n\n[Question 6 — Où se retrouve la propriété portée DureeLocation]\nliaison",
    "takeaway": "1) Trois entités (CLIENT, EMPRUNT, FILM) donnent trois tables, et l'association n–n Contenir ajoute sa table de liaison : 4 tables.\n2) La clé primaire de EMPRUNT est son identifiant : NumEmprunt.\n3) Effectuer est 1–n : la clé de CLIENT migre dans la table du côté maximum 1, EMPRUNT (NumEmprunt, DateEmprunt, #NumClient).\n4) La table de liaison (par exemple DETAIL_EMPRUNT) a pour clé le couple des identifiants : NumEmprunt NumFilm.\n5) Non : FILM n'est le côté maximum 1 d'aucune association — dans Contenir, son maximum vaut n ; aucune clé ne migre vers elle.\n6) DureeLocation décrit un couple (emprunt, film) : elle rejoint la table de liaison — DETAIL_EMPRUNT (#NumEmprunt, #NumFilm, DureeLocation).\nContrôle : EMPRUNT reçoit un # (vers CLIENT) ; la table de liaison reçoit deux # (vers EMPRUNT et FILM) plus la propriété portée ; FILM et CLIENT restent sans clé étrangère."
  },
  {
    "id": "mr-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "La fiche élèves de l'auto-école Moderne passe en 1FN",
    "exampleTitle": "Exemple résolu — la fiche adhérents du club de judo",
    "goal": "Vérifier la première forme normale : clé, attributs monovalués et non décomposables.",
    "brief": "<p><strong>Énoncé.</strong> L'auto-école <strong>Moderne</strong> tient encore ses élèves dans un unique tableau :</p><table><tr><th>NumEleve</th><th>NomEleve</th><th>DateNaissance</th><th>LeconsSuivies</th><th>PermisPrepares</th></tr><tr><td>101</td><td>Diallo</td><td>12/03/2000</td><td>Code ; Créneau ; Autoroute</td><td>B</td></tr><tr><td>102</td><td>Mensah</td><td>05/07/1999</td><td>Créneau</td><td>B ; A1</td></tr></table><p>Chaque élève reçoit un numéro unique à son inscription. Pour normaliser, l'analyste propose de sortir les leçons dans une table LECON (NumLecon, DateLecon, #NumEleve), avec une ligne par leçon.</p><p>Rappel du cours — 1FN : la relation possède une clé identifiant chaque ligne de manière unique et stable ; chaque attribut est <strong>monovalué</strong> ; aucun attribut n'est décomposable. Normaliser ne supprime pas l'information : elle la déplace dans une autre table, avec sa clé.</p><ol><li>Quel attribut identifie chaque ligne du tableau ELEVE ? (nom exact)</li><li>La colonne LeconsSuivies contient « Code ; Créneau ; Autoroute » : cette colonne est-elle monovaluée ? (oui/non)</li><li>La table ELEVE, telle quelle, respecte-t-elle la première forme normale ? (oui/non)</li><li>Dans la table LECON (NumLecon, DateLecon, #NumEleve), chaque attribut est-il monovalué ? (oui/non)</li><li>Dans la table LECON, NumEleve joue-t-il le rôle de clé primaire ou de clé étrangère ? (un mot)</li><li>En séparant ainsi les données, la normalisation supprime-t-elle l'information ou la déplace-t-elle ? (un mot : supprime ou deplace)</li></ol>",
    "starter": "# Exercice — La fiche élèves de l'auto-école Moderne passe en 1FN\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par un nom exact, oui/non ou un mot selon la question.\n\n[Question 1 — Attribut qui identifie chaque ligne]\nA_COMPLETER\n\n[Question 2 — LeconsSuivies est-elle monovaluée ?]\nA_COMPLETER\n\n[Question 3 — ELEVE respecte-t-elle la 1FN ?]\nA_COMPLETER\n\n[Question 4 — Dans LECON, les attributs sont-ils monovalués ?]\nA_COMPLETER\n\n[Question 5 — Rôle de NumEleve dans la table LECON]\nA_COMPLETER\n\n[Question 6 — La normalisation supprime ou déplace ?]\nA_COMPLETER\n",
    "hints": [
      "1FN : une clé identifiant chaque ligne de manière unique et stable, des attributs monovalués, aucun attribut décomposable.",
      "Regardez la colonne LeconsSuivies : combien de valeurs séparées par des points-virgules pour l'élève 101 ? Et PermisPrepares pour l'élève 102 ?",
      "Dans la table LECON proposée, chaque ligne décrit une seule leçon d'un seul élève. L'information sur les leçons n'est pas perdue : elle change de table."
    ],
    "examples": [
      {
        "stdin": "Un club de judo tient ses adhérents dans MEMBRE (NumMembre, NomMembre, DatesStages), avec « 04/01 ; 11/01 » dans DatesStages pour le membre 7. Chaque membre reçoit un numéro unique. On propose STAGE (NumStage, DateStage, #NumMembre), une ligne par stage.\n\n1) Attribut qui identifie chaque ligne : NumMembre.\n2) DatesStages est-elle monovaluée ? non.\n3) MEMBRE respecte-t-elle la 1FN ? non.\n4) Dans STAGE, les attributs sont-ils monovalués ? oui.\n5) NumMembre dans STAGE : etrangere.\n6) La normalisation supprime ou deplace ? deplace.",
        "expected": "NumMembre — non — non — oui — étrangère — déplace",
        "note": "Une colonne à valeurs multiples fait sortir de la 1FN ; la décomposition en une ligne par stage ne perd aucune information."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Attribut qui identifie chaque ligne",
        "stdin": "q:1",
        "expected": "NumEleve"
      },
      {
        "label": "Question 2 — LeconsSuivies est-elle monovaluée ?",
        "stdin": "q:2",
        "expected": "non"
      },
      {
        "label": "Question 3 — ELEVE respecte-t-elle la 1FN ?",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Dans LECON, les attributs sont-ils monovalués ?",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — Rôle de NumEleve dans la table LECON",
        "stdin": "q:5",
        "expected": "etrangere||cle etrangere||une cle etrangere"
      },
      {
        "label": "Question 6 — La normalisation supprime ou déplace ?",
        "stdin": "q:6",
        "expected": "deplace||deplacee"
      }
    ],
    "solution": "[Question 1 — Attribut qui identifie chaque ligne]\nNumEleve\n\n[Question 2 — LeconsSuivies est-elle monovaluée ?]\nnon\n\n[Question 3 — ELEVE respecte-t-elle la 1FN ?]\nnon\n\n[Question 4 — Dans LECON, les attributs sont-ils monovalués ?]\noui\n\n[Question 5 — Rôle de NumEleve dans la table LECON]\netrangere\n\n[Question 6 — La normalisation supprime ou déplace ?]\ndeplace",
    "takeaway": "1) Chaque élève reçoit un numéro unique à son inscription : NumEleve identifie chaque ligne (101, 102).\n2) Non : pour l'élève 101, la colonne contient trois valeurs (« Code ; Créneau ; Autoroute ») — elle est multivaluée.\n3) Non : la 1FN exige des attributs monovalués ; LeconsSuivies (et PermisPrepares pour l'élève 102) contient plusieurs valeurs par ligne.\n4) Oui : dans LECON (NumLecon, DateLecon, #NumEleve), chaque ligne décrit une seule leçon, à une seule date, pour un seul élève.\n5) NumEleve référence la clé primaire de la table ELEVE : c'est une clé étrangère (la clé primaire de LECON est NumLecon).\n6) Elle la déplace : chaque leçon devient une ligne de LECON, rattachée à son élève par la clé étrangère — aucune information n'est perdue.\nContrôle : la table ELEVE normalisée garde NumEleve, NomEleve, DateNaissance et PermisPrepares ; tout ce qui est liste part dans les tables LECON et PERMIS, avec #NumEleve."
  },
  {
    "id": "mr-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "La table des ventes de Sonolive passe en 2FN",
    "exampleTitle": "Exemple résolu — la table des réservations de l'agence de voyages",
    "goal": "Détecter une dépendance partielle dans une table à clé composée et normaliser en 2FN.",
    "brief": "<p><strong>Énoncé.</strong> La billetterie <strong>Sonolive</strong> enregistre d'abord toutes ses ventes dans une seule table :</p><table><tr><th>NumConcert</th><th>NumClient</th><th>TitreConcert</th><th>PrixPlace</th><th>NbPlaces</th></tr><tr><td>501</td><td>12</td><td>Jazz au large</td><td>8000</td><td>2</td></tr><tr><td>501</td><td>15</td><td>Jazz au large</td><td>8000</td><td>4</td></tr><tr><td>502</td><td>12</td><td>Rock sur l'eau</td><td>10000</td><td>1</td></tr></table><p>La clé primaire est le couple (NumConcert, NumClient) : un client peut réserver plusieurs concerts, un concert est réservé par plusieurs clients, et un couple (concert, client) n'apparaît qu'une fois. Règles de gestion : le titre et le prix de la place ne dépendent que du concert ; le nombre de places réservées dépend du couple entier (ce client, pour ce concert). Chaque attribut est atomique et monovalué.</p><p>Rappel du cours — 2FN : être en 1FN et tout attribut non clé totalement dépendant de <strong>toute la clé</strong> ; la 2FN ne se vérifie que pour les clés composées.</p><ol><li>Quelle est la clé primaire de la table VENTE ? (deux attributs, séparés par un espace)</li><li>La table VENTE est-elle en première forme normale ? (oui/non)</li><li>TitreConcert dépend-il de toute la clé ou d'une partie seulement de la clé ? (un mot : toute ou partie)</li><li>Cette dépendance se nomme dépendance partielle ou dépendance transitive ? (un mot)</li><li>La table VENTE est-elle en deuxième forme normale ? (oui/non)</li><li>Pour normaliser, on sort TitreConcert et PrixPlace dans une table CONCERT : dans la table VENTE, NumConcert devient alors une clé primaire ou une clé étrangère ? (un mot)</li></ol>",
    "starter": "# Exercice — La table des ventes de Sonolive passe en 2FN\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par deux attributs, oui/non ou un mot selon la question.\n\n[Question 1 — Clé primaire de la table VENTE]\nA_COMPLETER\n\n[Question 2 — VENTE est-elle en 1FN ?]\nA_COMPLETER\n\n[Question 3 — TitreConcert dépend de toute la clé ou d'une partie ?]\nA_COMPLETER\n\n[Question 4 — Dépendance partielle ou transitive ?]\nA_COMPLETER\n\n[Question 5 — VENTE est-elle en 2FN ?]\nA_COMPLETER\n\n[Question 6 — Rôle de NumConcert dans VENTE après normalisation]\nA_COMPLETER\n",
    "hints": [
      "2FN : tout attribut non clé doit dépendre de TOUTE la clé — cette vérification n'a de sens que pour une clé composée.",
      "Pour chaque attribut non clé, demandez-vous : le connaîtrait-on avec NumConcert seul, avec NumClient seul, ou faut-il le couple entier ?",
      "TitreConcert et PrixPlace se déduisent du concert seul. Après la décomposition, NumConcert reste dans VENTE comme lien vers la table CONCERT."
    ],
    "examples": [
      {
        "stdin": "Une agence de voyages enregistre RESERVATION (NumExcursion, NumClient, NomExcursion, TarifExcursion, NbPersonnes), clé (NumExcursion, NumClient). Le nom et le tarif ne dépendent que de l'excursion ; le nombre de personnes dépend du couple entier. Tous les attributs sont atomiques.\n\n1) Clé primaire : NumExcursion NumClient.\n2) 1FN ? oui.\n3) NomExcursion dépend de : partie.\n4) Dépendance : partielle.\n5) 2FN ? non.\n6) Après la sortie de la table EXCURSION, NumExcursion dans RESERVATION : etrangere.",
        "expected": "NumExcursion NumClient — oui — partie — partielle — non — étrangère",
        "note": "Un attribut qui se déduit d'une partie seulement de la clé composée viole la 2FN : on le sort avec cette partie dans une table dédiée."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Clé primaire de la table VENTE",
        "stdin": "q:1",
        "expected": "NumConcert NumClient||#NumConcert #NumClient||NumConcert et NumClient||NumConcert+NumClient"
      },
      {
        "label": "Question 2 — VENTE est-elle en 1FN ?",
        "stdin": "q:2",
        "expected": "oui"
      },
      {
        "label": "Question 3 — TitreConcert dépend de toute la clé ou d'une partie ?",
        "stdin": "q:3",
        "expected": "partie||une partie"
      },
      {
        "label": "Question 4 — Dépendance partielle ou transitive ?",
        "stdin": "q:4",
        "expected": "partielle||dependance partielle"
      },
      {
        "label": "Question 5 — VENTE est-elle en 2FN ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Rôle de NumConcert dans VENTE après normalisation",
        "stdin": "q:6",
        "expected": "etrangere||cle etrangere||une cle etrangere"
      }
    ],
    "solution": "[Question 1 — Clé primaire de la table VENTE]\nNumConcert NumClient\n\n[Question 2 — VENTE est-elle en 1FN ?]\noui\n\n[Question 3 — TitreConcert dépend de toute la clé ou d'une partie ?]\npartie\n\n[Question 4 — Dépendance partielle ou transitive ?]\npartielle\n\n[Question 5 — VENTE est-elle en 2FN ?]\nnon\n\n[Question 6 — Rôle de NumConcert dans VENTE après normalisation]\netrangere",
    "takeaway": "1) Un couple (concert, client) n'apparaît qu'une fois : la clé primaire est NumConcert NumClient.\n2) Oui : la table possède une clé, et chaque attribut y est atomique et monovalué.\n3) Partie : TitreConcert se connaît dès que NumConcert est connu ; NumClient n'apporte rien — comme PrixPlace.\n4) Partielle : TitreConcert (et PrixPlace) ne dépend que d'une partie de la clé composée.\n5) Non : la 2FN exige que tout attribut non clé dépende de TOUTE la clé ; TitreConcert et PrixPlace violent cette condition.\n6) Étrangère : NumConcert reste dans VENTE pour référencer la ligne du concert dans la table CONCERT (NumConcert, TitreConcert, PrixPlace).\nContrôle : la redondance disparaît — « Jazz au large » et son prix n'étaient répétés qu'à cause de la dépendance partielle ; VENTE (NumConcert, NumClient, NbPlaces) avec les deux attributs comme clé, #NumConcert et #NumClient comme clés étrangères."
  },
  {
    "id": "mr-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "La table médicaments de la pharmacie du Marché passe en 3FN",
    "exampleTitle": "Exemple résolu — la table articles du magasin de sport",
    "goal": "Détecter une dépendance transitive et normaliser une table en troisième forme normale.",
    "brief": "<p><strong>Énoncé.</strong> La <strong>pharmacie du Marché</strong> teste un logiciel qui stocke les médicaments dans :</p><table><tr><th>NumMedicament</th><th>NomMedicament</th><th>PrixUnitaire</th><th>CodeFamille</th><th>NomFamille</th></tr><tr><td>301</td><td>Paracétamol 500</td><td>350</td><td>10</td><td>Antalgique</td></tr><tr><td>302</td><td>Aspirine 1000</td><td>420</td><td>10</td><td>Antalgique</td></tr><tr><td>303</td><td>Amoxicilline</td><td>1200</td><td>20</td><td>Antibiotique</td></tr></table><p>NumMedicament est la clé primaire. Règles de gestion : NumMedicament détermine NomMedicament, PrixUnitaire et CodeFamille ; chaque famille de médicaments a un code (CodeFamille) et un seul nom (NomFamille) ; le nom « Antalgique » est ainsi répété pour chaque médicament de la famille. Tous les attributs sont atomiques et monovalués.</p><p>Rappel du cours — 3FN : être en 2FN et tout attribut dépendre <strong>directement</strong> de la clé, sans transitivité (clé → A → B). À clé simple, une table en 1FN est déjà en 2FN. La devise : « la clé, toute la clé, rien que la clé ».</p><ol><li>La table MEDICAMENT, à clé simple et attributs atomiques, est-elle en 2FN ? (oui/non)</li><li>NomFamille dépend-il de NumMedicament directement ou par transitivité, via CodeFamille ? (un mot : directement ou transitivement)</li><li>Cette dépendance se nomme dépendance partielle ou dépendance transitive ? (un mot)</li><li>La table MEDICAMENT est-elle en troisième forme normale ? (oui/non)</li><li>Pour normaliser, on crée la table FAMILLE : quel attribut l'accompagne comme clé primaire, avec NomFamille ? (nom exact)</li><li>Après normalisation, combien de tables la base des médicaments compte-t-elle ? (un nombre)</li></ol>",
    "starter": "# Exercice — La table médicaments de la pharmacie du Marché passe en 3FN\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par oui/non, un mot, un nom exact ou un nombre selon la question.\n\n[Question 1 — MEDICAMENT est-elle en 2FN ?]\nA_COMPLETER\n\n[Question 2 — NomFamille dépend directement ou par transitivité ?]\nA_COMPLETER\n\n[Question 3 — Dépendance partielle ou transitive ?]\nA_COMPLETER\n\n[Question 4 — MEDICAMENT est-elle en 3FN ?]\nA_COMPLETER\n\n[Question 5 — Attribut sorti avec NomFamille dans la table FAMILLE]\nA_COMPLETER\n\n[Question 6 — Nombre de tables après normalisation]\nA_COMPLETER\n",
    "hints": [
      "3FN : être en 2FN et aucun attribut non clé ne doit dépendre d'un autre attribut non clé.",
      "Suivez les flèches : NumMedicament → CodeFamille, puis CodeFamille → NomFamille. NomFamille dépend-il directement de la clé ?",
      "La table FAMILLE sort avec sa propre clé, celle qui détermine NomFamille ; la table médicaments garde un lien vers elle. Comptez ensuite les tables de la base finale."
    ],
    "examples": [
      {
        "stdin": "Un magasin de sport stocke ARTICLE (RefArticle, NomArticle, PrixArticle, CodeRayon, NomRayon), clé RefArticle. RefArticle détermine NomArticle, PrixArticle et CodeRayon ; CodeRayon → NomRayon ; le nom du rayon est répété pour chaque article du rayon. Tous les attributs sont atomiques.\n\n1) 2FN ? oui (clé simple).\n2) NomRayon dépend de RefArticle : transitivement.\n3) Dépendance : transitive.\n4) 3FN ? non.\n5) Attribut sorti avec NomRayon : CodeRayon.\n6) Nombre de tables après normalisation : 2.",
        "expected": "oui — transitivement — transitive — non — CodeRayon — 2",
        "note": "Une dépendance transitive (clé → attribut non clé → attribut non clé) se soigne en sortant le couple fautif dans sa propre table."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — MEDICAMENT est-elle en 2FN ?",
        "stdin": "q:1",
        "expected": "oui"
      },
      {
        "label": "Question 2 — NomFamille dépend directement ou par transitivité ?",
        "stdin": "q:2",
        "expected": "transitivement||transitive||par transitivite"
      },
      {
        "label": "Question 3 — Dépendance partielle ou transitive ?",
        "stdin": "q:3",
        "expected": "transitive||dependance transitive"
      },
      {
        "label": "Question 4 — MEDICAMENT est-elle en 3FN ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Attribut sorti avec NomFamille dans la table FAMILLE",
        "stdin": "q:5",
        "expected": "CodeFamille"
      },
      {
        "label": "Question 6 — Nombre de tables après normalisation",
        "stdin": "q:6",
        "expected": "2"
      }
    ],
    "solution": "[Question 1 — MEDICAMENT est-elle en 2FN ?]\noui\n\n[Question 2 — NomFamille dépend directement ou par transitivité ?]\ntransitivement\n\n[Question 3 — Dépendance partielle ou transitive ?]\ntransitive\n\n[Question 4 — MEDICAMENT est-elle en 3FN ?]\nnon\n\n[Question 5 — Attribut sorti avec NomFamille dans la table FAMILLE]\nCodeFamille\n\n[Question 6 — Nombre de tables après normalisation]\n2",
    "takeaway": "1) Oui : clé simple (NumMedicament), attributs atomiques et monovalués — à clé simple, une table en 1FN est déjà en 2FN, aucune dépendance partielle n'est possible.\n2) Par transitivité : NumMedicament → CodeFamille → NomFamille ; NomFamille se déduit de CodeFamille, qui n'est pas la clé.\n3) Transitive : un attribut non clé (CodeFamille) en détermine un autre (NomFamille).\n4) Non : la 3FN interdit toute dépendance transitive vers un attribut non clé.\n5) CodeFamille : la table FAMILLE (CodeFamille, NomFamille) sort avec sa clé ; MEDICAMENT garde #CodeFamille comme lien.\n6) Deux tables : MEDICAMENT (NumMedicament, NomMedicament, PrixUnitaire, #CodeFamille) et FAMILLE (CodeFamille, NomFamille).\nContrôle : le nom « Antalgique » n'est plus répété — la redondance disparaissait avec la transitivité ; la devise « la clé, toute la clé, rien que la clé » est respectée."
  }
];
