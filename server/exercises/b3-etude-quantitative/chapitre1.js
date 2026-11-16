/**
 * chapitre1.js — Études de cas du cours « b3-etude-quantitative ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "eq3-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Le cadrage du mémoire de Nadia sur l'absentéisme",
    "exampleTitle": "Exemple résolu — l'étude de fidélité de la chaîne Palmier",
    "goal": "Identifier le paradigme, le raisonnement et les concepts de cadrage (population cible, base de sondage, unité d'échantillonnage) d'une étude quantitative.",
    "brief": "<p><strong>Énoncé.</strong> Nadia prépare son mémoire de Bachelor 3 en informatique sur l'absentéisme des développeurs dans les entreprises de services du numérique (ESN) françaises. Sa démarche : partir des théories existantes sur le burn-out, en déduire des hypothèses précises, les tester à l'aide d'un questionnaire chiffré administré à des développeurs, puis généraliser statistiquement ses résultats. Pour contacter les entreprises, elle dispose de l'annuaire des adhérents de Syntec Numérique, qui recense les ESN françaises.</p><p>Répondez par le terme exact du cours, en un mot ou une expression courte.</p><ol><li>Nadia veut mesurer des faits objectifs, indépendants du chercheur, et généraliser statistiquement : quel paradigme épistémologique adopte-t-elle ? (un mot)</li><li>Elle part des théories existantes pour formuler des hypothèses qu'elle teste sur des données : quel est ce mode de raisonnement ? (un mot)</li><li>L'ensemble exhaustif des développeurs des ESN françaises répondant aux critères de son étude s'appelle la ... (terme du cours).</li><li>L'annuaire des adhérents de Syntec Numérique, liste concrète permettant de joindre les entreprises, s'appelle la ...</li><li>Chaque développeur individuellement interrogé par Nadia constitue quelle entité de sondage ? (deux mots)</li><li>Pour sécuriser ses conclusions, elle prévoit aussi des entretiens de fond en complément du questionnaire : de quel type de triangulation s'agit-il ? (un mot)</li></ol>",
    "starter": "# Exercice — Le cadrage du mémoire de Nadia sur l'absentéisme\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le terme exact du cours, en un mot ou une expression courte.\n\n[Question 1 — Paradigme épistémologique (un mot)]\nA_COMPLETER\n\n[Question 2 — Mode de raisonnement (un mot)]\nA_COMPLETER\n\n[Question 3 — Ensemble des développeurs visés]\nA_COMPLETER\n\n[Question 4 — Rôle de l'annuaire Syntec]\nA_COMPLETER\n\n[Question 5 — Entité interrogée individuellement (deux mots)]\nA_COMPLETER\n\n[Question 6 — Type de triangulation (un mot)]\nA_COMPLETER\n",
    "hints": [
      "Le paradigme qui postule une réalité objective, mesurable par des données chiffrées et généralisable statistiquement, s'oppose au paradigme interprétativiste qui cherche le sens vécu des acteurs.",
      "La population cible est l'univers théorique visé par l'étude ; la base de sondage est la liste concrète qui permet d'y accéder ; l'unité d'échantillonnage est l'entité unitaire enquêtée.",
      "Pour la dernière question, combiner un questionnaire quantitatif et des entretiens qualitatifs sur un même objet de recherche relève du quatrième pilier de la triangulation de Denzin."
    ],
    "examples": [
      {
        "stdin": "Une analyste de la chaîne de restaurants Palmier étudie la fidélité de ses clients : elle part du modèle théorique de la satisfaction, formule des hypothèses, les teste par un questionnaire chiffré auprès des clients inscrits et veut généraliser ses résultats. La base CRM recense 12 000 clients.\n\n1) Paradigme : positiviste (mesure objective et généralisation statistique).\n2) Raisonnement : déductif (de la théorie vers les hypothèses testées).\n3) Population cible : les clients de la chaîne Palmier.\n4) Base de sondage : la base CRM des 12 000 clients.\n5) Unité d'échantillonnage : un client.",
        "expected": "positiviste — déductif — population cible : les clients — base de sondage : la base CRM — unité : le client",
        "note": "Avant toute collecte, un cadrage rigoureux nomme le paradigme, le raisonnement, la population cible, la base de sondage et l'unité d'échantillonnage."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Paradigme épistémologique",
        "stdin": "q:1",
        "expected": "positiviste||positivisme||paradigme positiviste"
      },
      {
        "label": "Question 2 — Mode de raisonnement",
        "stdin": "q:2",
        "expected": "déductif||déduction||raisonnement déductif"
      },
      {
        "label": "Question 3 — Ensemble des développeurs visés",
        "stdin": "q:3",
        "expected": "population cible||la population cible||univers d'enquête||univers d’enquête"
      },
      {
        "label": "Question 4 — Rôle de l'annuaire Syntec",
        "stdin": "q:4",
        "expected": "base de sondage||la base de sondage"
      },
      {
        "label": "Question 5 — Entité interrogée individuellement",
        "stdin": "q:5",
        "expected": "unité d'échantillonnage||unité d’échantillonnage||l'unité d'échantillonnage||l’unité d’échantillonnage"
      },
      {
        "label": "Question 6 — Type de triangulation",
        "stdin": "q:6",
        "expected": "méthodologique||triangulation méthodologique||des méthodes"
      }
    ],
    "solution": "[Question 1 — Paradigme épistémologique (un mot)]\npositiviste\n\n[Question 2 — Mode de raisonnement (un mot)]\ndéductif\n\n[Question 3 — Ensemble des développeurs visés]\npopulation cible\n\n[Question 4 — Rôle de l'annuaire Syntec]\nbase de sondage\n\n[Question 5 — Entité interrogée individuellement (deux mots)]\nunité d'échantillonnage\n\n[Question 6 — Type de triangulation (un mot)]\nméthodologique",
    "takeaway": "1) Nadia mesure des faits objectifs à l'aide de données chiffrées et veut généraliser : elle se place dans le paradigme positiviste (quantitatif, déductif).\n2) Elle part des théories existantes pour en déduire des hypothèses testées sur le terrain : raisonnement déductif (Top-Down).\n3) L'ensemble exhaustif des développeurs des ESN françaises répondant à ses critères est la population cible (on dit aussi l'univers d'enquête).\n4) L'annuaire des adhérents de Syntec est la liste concrète qui permet de joindre les membres de cette population : c'est la base de sondage, à ne pas confondre avec la population cible, qui reste un univers théorique.\n5) Chaque développeur interrogé est une unité d'échantillonnage : l'entité unitaire sur laquelle portent le tirage et la collecte.\n6) Compléter le questionnaire quantitatif par des entretiens qualitatifs pour observer le même objet sous deux angles : triangulation méthodologique (Denzin)."
  },
  {
    "id": "eq3-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le design mixte de l'étude DevOps chez CloudHarbor",
    "exampleTitle": "Exemple résolu — l'étude d'usage de l'outil GestIK",
    "goal": "Reconnaître un design mixte séquentiel, affecter chaque phase à son paradigme et calculer un taux de réponse.",
    "brief": "<p><strong>Énoncé.</strong> Léo, consultant, étudie les freins à l'adoption du DevOps chez CloudHarbor, un éditeur SaaS. Faute de littérature suffisante sur ce terrain, il commence par <strong>9 entretiens semi-directifs</strong> avec des chefs de projet (il en avait sollicité <strong>12</strong>) pour faire émerger les dimensions du problème, puis il administre un <strong>questionnaire quantitatif à large échelle</strong> pour mesurer la fréquence des freins identifiés. Le sondage révèle alors une corrélation inattendue entre ancienneté et résistance : Léo mène <strong>5 entretiens d'approfondissement</strong> pour comprendre ce que les chiffres veulent dire. Pendant l'analyse, une collègue code indépendamment les mêmes verbatims que lui.</p><p>Questions 1, 2, 3 et 5 : répondez par le terme du cours (une à trois mots). Question 4 : un nombre.</p><ol><li>Comment s'appelle le design global qui enchaîne une phase qualitative exploratoire puis une phase quantitative à large échelle ?</li><li>La phase d'entretiens exploratoires relève de quel paradigme épistémologique ?</li><li>La phase de sondage à large échelle relève de quel paradigme ?</li><li>Quel a été le taux de réponse aux entretiens de la première phase, en pourcentage ?</li><li>Comment s'appelle le design qui enchaîne un sondage puis des entretiens d'approfondissement pour expliquer une anomalie ?</li><li>Le double codage des verbatims par Léo et sa collègue relève de la triangulation des ... ?</li></ol>",
    "starter": "# Exercice — Le design mixte de l'étude DevOps chez CloudHarbor\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Termes du cours pour les questions 1, 2, 3 et 5 ; un nombre pour la question 4.\n\n[Question 1 — Design global de l'étude]\nA_COMPLETER\n\n[Question 2 — Paradigme de la phase entretiens]\nA_COMPLETER\n\n[Question 3 — Paradigme de la phase sondage]\nA_COMPLETER\n\n[Question 4 — Taux de réponse aux entretiens (en %)]\nA_COMPLETER\n\n[Question 5 — Design de la phase d'approfondissement]\nA_COMPLETER\n\n[Question 6 — Triangulation des ... (un mot)]\nA_COMPLETER\n",
    "hints": [
      "Un design exploratoire séquentiel défriche d'abord le terrain par le qualitatif, puis mesure à grande échelle par le quantitatif ; le design explicatif enchaîne les phases dans l'ordre inverse.",
      "Le taux de réponse est le rapport entre le nombre d'entretiens réalisés et le nombre de personnes sollicitées.",
      "Deux analyses indépendantes du même matériau par deux personnes différentes neutralisent la subjectivité d'un chercheur unique : c'est l'un des quatre axes de la triangulation de Denzin."
    ],
    "examples": [
      {
        "stdin": "Une ergonome étudie l'usage de l'outil de gestion GestIK : 4 entretiens (sur 10 ergonomes sollicités) pour explorer, puis un sondage auprès de 300 utilisateurs pour mesurer, enfin 2 entretiens pour éclairer une anomalie du sondage. Un collègue recode les verbatims.\n\n1) Design global : exploratoire séquentiel (quali puis quanti).\n2) Phase entretiens : paradigme interprétativiste.\n3) Phase sondage : paradigme positiviste.\n4) Taux de réponse : 4/10 = 40 %.\n5) Phase complémentaire : design explicatif séquentiel.\n6) Le recodage indépendant : triangulation des chercheurs.",
        "expected": "exploratoire séquentiel — interprétativiste — positiviste — 40 % — explicatif séquentiel — chercheurs",
        "note": "Les méthodes mixtes alternent les paradigmes : chaque phase garde la logique de son monde, quanti pour mesurer, quali pour comprendre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Design global de l'étude",
        "stdin": "q:1",
        "expected": "exploratoire séquentiel||design exploratoire séquentiel||séquentiel exploratoire"
      },
      {
        "label": "Question 2 — Paradigme de la phase entretiens",
        "stdin": "q:2",
        "expected": "interprétativiste||interprétativisme||paradigme interprétativiste"
      },
      {
        "label": "Question 3 — Paradigme de la phase sondage",
        "stdin": "q:3",
        "expected": "positiviste||positivisme||paradigme positiviste"
      },
      {
        "label": "Question 4 — Taux de réponse aux entretiens",
        "stdin": "q:4",
        "expected": "75||75 %"
      },
      {
        "label": "Question 5 — Design de la phase d'approfondissement",
        "stdin": "q:5",
        "expected": "explicatif séquentiel||design explicatif séquentiel"
      },
      {
        "label": "Question 6 — Triangulation des ...",
        "stdin": "q:6",
        "expected": "chercheurs||des chercheurs||triangulation des chercheurs"
      }
    ],
    "solution": "[Question 1 — Design global de l'étude]\nexploratoire séquentiel\n\n[Question 2 — Paradigme de la phase entretiens]\ninterprétativiste\n\n[Question 3 — Paradigme de la phase sondage]\npositiviste\n\n[Question 4 — Taux de réponse aux entretiens (en %)]\n75\n\n[Question 5 — Design de la phase d'approfondissement]\nexplicatif séquentiel\n\n[Question 6 — Triangulation des ... (un mot)]\nchercheurs",
    "takeaway": "1) Entretiens d'exploration puis sondage à large échelle : design exploratoire séquentiel (Quali puis Quanti), utilisé quand la littérature ne suffit pas à dimensionner le problème.\n2) Les entretiens semi-directifs cherchent le sens et les motivations profondes : paradigme interprétativiste (qualitatif, inductif).\n3) Le sondage mesure des fréquences et généralise : paradigme positiviste (quantitatif, déductif).\n4) Taux de réponse : 9 entretiens réalisés sur 12 sollicités = 9/12 = 0,75 = 75 %.\n5) Sondage d'abord, entretiens d'approfondissement ensuite pour comprendre une corrélation inattendue : design explicatif séquentiel (Quanti puis Quali).\n6) Deux codeurs indépendants sur les mêmes verbatims : triangulation des chercheurs."
  },
  {
    "id": "eq3-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "L'audit de maturité DevOps du groupe Vitalis",
    "exampleTitle": "Exemple résolu — l'audit qualité de l'usine Norvil",
    "goal": "Auditer un cadrage de recherche complet : question de départ, terrain, base de sondage, raisonnement abductif et triangulation.",
    "brief": "<p><strong>Énoncé.</strong> Le cabinet Aurora Partners audite la maturité DevOps des équipes IT du groupe industriel Vitalis, réparties sur <strong>3 sites français</strong> comptant au total <strong>850 salariés IT</strong>, tous recensés dans le SI des ressources humaines. L'équipe hésite entre trois questions de départ :</p><p><code>a — « Pourquoi le DevOps est-il la meilleure méthode d'organisation ? »</code></p><p><code>b — « Comment les équipes IT de Vitalis vivent-elles la transition vers le DevOps ? »</code></p><p><code>c — « Le DevOps est-il utile ? (oui / non) »</code></p><p>En dépouillant les journaux de déploiement, les auditeurs constatent un fait surprenant : les mises en production échouent surtout le lundi. Ils formulent l'hypothèse la plus plausible (fatigue du week-end, équipe d'astreinte réduite...) et prévoient de la vérifier sur le terrain. Lors de la phase exploratoire, <strong>40 salariés</strong> sont interrogés brièvement et <strong>26</strong> d'entre eux évoquent spontanément le problème des lundis. L'audit final croisera un questionnaire, des entretiens et l'analyse des journaux système.</p><ol><li>Quelle est la seule question de départ correctement formulée ? Répondez par sa lettre.</li><li>Les équipes IT des trois sites français, milieu dans lequel évoluent les sujets étudiés, constituent le ... (terme du cours).</li><li>La liste des 850 salariés IT extraite du SI RH est la ...</li><li>Constat surprenant, puis hypothèse la plus plausible, puis vérification empirique : quel mode de raisonnement ? (un mot)</li><li>Croiser questionnaire, entretiens et journaux système relève de la triangulation ... (un mot).</li><li>Quel pourcentage des 40 salariés interrogés évoque le problème des lundis ?</li></ol>",
    "starter": "# Exercice — L'audit de maturité DevOps du groupe Vitalis\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par des termes courts du cours ; la question 4 attend un nombre.\n\n[Question 1 — Lettre de la bonne question de départ]\nA_COMPLETER\n\n[Question 2 — Milieu où évoluent les sujets étudiés]\nA_COMPLETER\n\n[Question 3 — Rôle de la liste des 850 salariés]\nA_COMPLETER\n\n[Question 4 — Mode de raisonnement (un mot)]\nA_COMPLETER\n\n[Question 5 — Triangulation ... (un mot)]\nA_COMPLETER\n\n[Question 6 — Part des salariés évoquant les lundis (en %)]\nA_COMPLETER\n",
    "hints": [
      "Une bonne question de départ est claire, précise, univoque et ouverte : elle ne présuppose rien et ne se réduit pas à un choix binaire oui/non.",
      "Le terrain d'étude est le milieu physique ou virtuel où évoluent les sujets et phénomènes étudiés ; la base de sondage est le répertoire concret qui permet de les joindre.",
      "Partir d'un fait étonnant pour proposer l'hypothèse la plus plausible puis la vérifier caractérise l'abduction ; croiser plusieurs instruments de collecte est la triangulation méthodologique."
    ],
    "examples": [
      {
        "stdin": "Un auditeur qualité étudie l'atelier de l'usine Norvil (220 opérateurs listés dans le fichier du personnel). Questions de départ : a) « Pourquoi la qualité est-elle toujours la priorité ? » ; b) « Comment les opérateurs vivent-ils le passage au lean ? » ; c) « Le lean est-il bien ? ». Constat : rebuts anormalement élevés le vendredi, hypothèse de la maintenance hebdomadaire, vérification prévue. Phase exploratoire : 60 opérateurs interrogés, 15 évoquent le problème des vendredis. L'audit croisera questionnaire, entretiens et relevés machine.\n\n1) Question correcte : b (ouverte, neutre, univoque).\n2) L'atelier de Norvil = le terrain d'étude.\n3) Le fichier des 220 opérateurs = la base de sondage.\n4) Raisonnement : abductif.\n5) Questionnaire + entretiens + relevés = triangulation méthodologique.\n6) Part évoquant les vendredis : 15/60 = 25 %.",
        "expected": "b — terrain d'étude — base de sondage — abductif — méthodologique — 25 %",
        "note": "La qualité d'une recherche se joue avant la collecte : question neutre, terrain et base de sondage nommés, raisonnement explicite, triangulation planifiée."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Lettre de la bonne question de départ",
        "stdin": "q:1",
        "expected": "b||la formulation b||formulation b"
      },
      {
        "label": "Question 2 — Milieu où évoluent les sujets étudiés",
        "stdin": "q:2",
        "expected": "terrain d'étude||terrain d’étude||le terrain d'étude||le terrain d’étude||terrain"
      },
      {
        "label": "Question 3 — Rôle de la liste des 850 salariés",
        "stdin": "q:3",
        "expected": "base de sondage||la base de sondage"
      },
      {
        "label": "Question 4 — Mode de raisonnement",
        "stdin": "q:4",
        "expected": "abductif||abduction||raisonnement abductif"
      },
      {
        "label": "Question 5 — Triangulation ...",
        "stdin": "q:5",
        "expected": "méthodologique||triangulation méthodologique||des méthodes"
      },
      {
        "label": "Question 6 — Part des salariés évoquant les lundis",
        "stdin": "q:6",
        "expected": "65||65 %"
      }
    ],
    "solution": "[Question 1 — Lettre de la bonne question de départ]\nb\n\n[Question 2 — Milieu où évoluent les sujets étudiés]\nterrain d'étude\n\n[Question 3 — Rôle de la liste des 850 salariés]\nbase de sondage\n\n[Question 4 — Mode de raisonnement (un mot)]\nabductif\n\n[Question 5 — Triangulation ... (un mot)]\nméthodologique\n\n[Question 6 — Part des salariés évoquant les lundis (en %)]\n65",
    "takeaway": "1) La formulation b est ouverte, neutre et univoque. La a présuppose que le DevOps est la meilleure méthode (question orientée) ; la c est fermée et dichotomique.\n2) Les équipes IT des trois sites constituent le terrain d'étude : le milieu physique et organisationnel où évoluent les sujets et phénomènes étudiés.\n3) La liste des 850 salariés extraite du SI RH est la base de sondage : le répertoire concret à partir duquel l'échantillon sera constitué.\n4) Constat surprenant, puis hypothèse la plus plausible, puis vérification empirique : raisonnement abductif, fondement des méthodes mixtes et du diagnostic d'incidents complexes.\n5) Croiser questionnaire quantitatif, entretiens qualitatifs et journaux système : triangulation méthodologique.\n6) 26/40 = 0,65 = 65 % des salariés interrogés évoquent le problème des lundis."
  }
];
