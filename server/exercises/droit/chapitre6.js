/**
 * chapitre6.js — Études de cas du cours « droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "dr2-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le contrôle de l'IPDCP chez Fluxo Togo",
    "exampleTitle": "Exemple résolu — le contrôle chez Datimex",
    "goal": "Identifier l'autorité de contrôle togolaise, les articles qui fondent son contrôle et celui qui punit l'entrave.",
    "brief": "<p><strong>Énoncé.</strong> Le <strong>14 mai 2025</strong>, les membres du comité de direction de l'autorité de contrôle se présentent chez <strong>Fluxo Togo</strong>, opérateur de traitement de données établi à Lomé, pour un contrôle sur place. Ils demandent la communication du registre des traitements et l'accès aux programmes informatiques. Le directeur général refuse d'abord de transmettre les documents ; son conseil lui rappelle la loi avant qu'il ne s'exécute.</p><p>Rappel du cours : l'<strong>article 55</strong> crée l'Instance de protection des données à caractère personnel (<strong>IPDCP</strong>), autorité administrative indépendante ; l'<strong>article 68</strong> fonde sa mission de contrôle (communication des documents, accès aux programmes et aux données) ; l'<strong>article 93</strong> punit l'entrave à l'action de l'Instance de six mois à deux ans d'emprisonnement et de 1 000 000 à 10 000 000 de francs CFA, ou de l'une de ces deux peines.</p><p>Répondez par le nombre seul (numéro d'article ou durée) ; par le sigle exact attendu pour la question 1.</p><ol><li>Comment s'appelle l'autorité de contrôle des données au Togo (sigle) ?</li><li>Quel article crée cette autorité ?</li><li>Quel article fonde ses pouvoirs de contrôle ?</li><li>Quel article le refus initial du directeur enfreint-il ?</li><li>Quelle peine d'emprisonnement maximale ce refus encourt-il ?</li></ol>",
    "starter": "# Exercice — Le contrôle de l'IPDCP chez Fluxo Togo\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le sigle, le numéro d'article ou la durée, selon la question.\n\n[Question 1 — Sigle de l'autorité de contrôle]\nA_COMPLETER\n\n[Question 2 — Article créant l'autorité]\nA_COMPLETER\n\n[Question 3 — Article fondant les pouvoirs de contrôle]\nA_COMPLETER\n\n[Question 4 — Article enfreint par le refus]\nA_COMPLETER\n\n[Question 5 — Peine d'emprisonnement maximale encourue]\nA_COMPLETER\n",
    "hints": [
      "L'Instance n'est pas un simple conseil : elle peut exiger les documents et entrer dans les programmes ; l'entrave à son action est pénalement sanctionnée.",
      "Trois articles se partagent le dossier : celui qui crée l'Instance, celui qui arme son contrôle, celui qui punit l'entrave.",
      "1. Le sigle de l'autorité togolaise est dans le rappel du cours. 2. Cherchez l'article de création. 3. Cherchez l'article des pouvoirs de contrôle. 4. Le refus de transmettre les documents est une entrave. 5. Relisez la peine maximale attachée à l'entrave."
    ],
    "examples": [
      {
        "stdin": "Lors d'un contrôle chez Datimex, le dirigeant refuse d'abord l'accès aux programmes ; il finit par s'exécuter.\n\n1) Autorité de contrôle : l'IPDCP.\n2) Création : article 55.\n3) Pouvoirs de contrôle : article 68.\n4) Entrave : article 93.\n5) Peine maximale d'emprisonnement : 2 ans (six mois à deux ans).",
        "expected": "l'IPDCP — créée par l'article 55 — contrôle fondé sur l'article 68 — entrave : article 93 — jusqu'à 2 ans",
        "note": "Refuser les documents à l'Instance, c'est l'entraver : l'article 93 attache à ce refus une peine de six mois à deux ans."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Sigle de l'autorité de contrôle",
        "stdin": "q:1",
        "expected": "IPDCP||l'IPDCP||Instance de Protection des Données à Caractère Personnel||l'Instance de Protection des Données à Caractère Personnel"
      },
      {
        "label": "Question 2 — Article créant l'autorité",
        "stdin": "q:2",
        "expected": "55||l'article 55||article 55"
      },
      {
        "label": "Question 3 — Article fondant les pouvoirs de contrôle",
        "stdin": "q:3",
        "expected": "68||l'article 68||article 68"
      },
      {
        "label": "Question 4 — Article enfreint par le refus",
        "stdin": "q:4",
        "expected": "93||l'article 93||article 93||entrave à l'action de l'Instance"
      },
      {
        "label": "Question 5 — Peine d'emprisonnement maximale encourue",
        "stdin": "q:5",
        "expected": "2 ans||deux ans||6 mois à 2 ans||six mois à deux ans"
      }
    ],
    "solution": "[Question 1 — Sigle de l'autorité de contrôle]\nIPDCP\n\n[Question 2 — Article créant l'autorité]\n55\n\n[Question 3 — Article fondant les pouvoirs de contrôle]\n68\n\n[Question 4 — Article enfreint par le refus]\n93\n\n[Question 5 — Peine d'emprisonnement maximale encourue]\n2 ans",
    "takeaway": "1) L'autorité de contrôle des données au Togo est l'IPDCP, Instance de protection des données à caractère personnel.\n2) Elle est créée par l'article 55.\n3) Ses pouvoirs de contrôle (documents, programmes, données) sont fondés sur l'article 68.\n4) Le refus initial du directeur constitue une entrave : article 93.\n5) L'entrave est punie de six mois à deux ans : la peine maximale est de 2 ans.\nContrôle : le directeur s'étant exécuté, l'Instance n'a pas à saisir le juge pénal ; s'il avait persisté, l'article 93 aurait exposé le refus à 2 ans d'emprisonnement et 10 000 000 FCFA d'amende."
  },
  {
    "id": "dr2-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le traitement clandestin du laboratoire Biolyo",
    "exampleTitle": "Exemple résolu — le fichier de la société RapidFichier",
    "goal": "Qualifier un traitement sans formalités, en chiffrer la peine et mesurer l'effet de la négligence.",
    "brief": "<p><strong>Énoncé.</strong> Le laboratoire d'analyses Biolyo, établi à Lomé, traite <strong>40 000 dossiers patients</strong> sans avoir accompli les formalités préalables. Il conserve en outre, sans le <strong>consentement exprès</strong> des intéressés, un fichier de données de santé de ses patients, dit « fichier fidélité ». Les faits sont établis : aucun élément ne permet de les imputer à une simple négligence.</p><p>Rappel du cours : l'<strong>article 79</strong> punit le traitement sans formalités préalables d'un à cinq ans d'emprisonnement et de 1 000 000 à 10 000 000 de francs CFA (par négligence : un à trois ans et 500 000 à 5 000 000) ; l'<strong>article 86</strong> punit la mise ou la conservation de données sensibles sans consentement exprès d'un à cinq ans et de 1 000 000 à 10 000 000 de francs CFA.</p><p>Répondez par le nombre seul, sans unité ni symbole (par exemple 10000000), sauf pour la question 1 qui appelle un numéro d'article.</p><ol><li>Quel article punit le traitement sans formalités préalables ?</li><li>Quelle amende maximale le laboratoire encourt-il pour ce fait, en francs CFA ?</li><li>Quelle peine d'emprisonnement minimale encourt-il pour ce fait ?</li><li>Si les faits résultaient d'une négligence, quelle amende maximale s'appliquerait, en francs CFA ?</li><li>Quel article punit la conservation des données de santé sans consentement exprès ?</li></ol>",
    "starter": "# Exercice — Le traitement clandestin du laboratoire Biolyo\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions chiffrées : le nombre seul, sans unité ni symbole.\n\n[Question 1 — Article du traitement sans formalités]\nA_COMPLETER\n\n[Question 2 — Amende maximale encourue (FCFA)]\nA_COMPLETER\n\n[Question 3 — Emprisonnement minimal encouru]\nA_COMPLETER\n\n[Question 4 — Amende maximale en cas de négligence (FCFA)]\nA_COMPLETER\n\n[Question 5 — Article des données de santé sans consentement]\nA_COMPLETER\n",
    "hints": [
      "Le même fait est puni moins sévèrement s'il résulte d'une négligence : la peine suit l'intention.",
      "Distinguez les deux griefs : le fichier monté sans formalités (article 79) et les données de santé conservées sans consentement exprès (article 86).",
      "1. Cherchez l'article du traitement sans formalités. 2. Relisez le plafond de l'amende de l'article 79. 3. Relisez le plancher de l'emprisonnement. 4. Par négligence, l'article 79 baisse ses plafonds. 5. Les données de santé sont sensibles : leur conservation sans consentement exprès relève d'un autre article."
    ],
    "examples": [
      {
        "stdin": "La société RapidFichier a traité un fichier de locataires sans formalités préalables ; l'enquête conclut à la négligence.\n\n1) Article applicable : 79.\n2) Amende maximale en cas de négligence : 5 000 000 FCFA.\n3) Emprisonnement minimal : un an.\n4) Si les faits avaient été volontaires, l'amende maximale serait de 10 000 000 FCFA.\n5) En conservant des données de santé sans consentement exprès, elle aurait enfreint l'article 86.",
        "expected": "article 79 — négligence : 5 000 000 FCFA au plus — un an au minimum — volontaire : 10 000 000 FCFA — santé sans consentement : article 86",
        "note": "La négligence divise les plafonds par deux : 5 000 000 FCFA au lieu de 10 000 000, et un à trois ans au lieu d'un à cinq."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Article du traitement sans formalités",
        "stdin": "q:1",
        "expected": "79||l'article 79||article 79"
      },
      {
        "label": "Question 2 — Amende maximale encourue (FCFA)",
        "stdin": "q:2",
        "expected": "10000000||10 000 000||10 millions"
      },
      {
        "label": "Question 3 — Emprisonnement minimal encouru",
        "stdin": "q:3",
        "expected": "1 an||un an||1"
      },
      {
        "label": "Question 4 — Amende maximale en cas de négligence (FCFA)",
        "stdin": "q:4",
        "expected": "5000000||5 000 000||5 millions"
      },
      {
        "label": "Question 5 — Article des données de santé sans consentement",
        "stdin": "q:5",
        "expected": "86||l'article 86||article 86"
      }
    ],
    "solution": "[Question 1 — Article du traitement sans formalités]\n79\n\n[Question 2 — Amende maximale encourue (FCFA)]\n10000000\n\n[Question 3 — Emprisonnement minimal encouru]\n1 an\n\n[Question 4 — Amende maximale en cas de négligence (FCFA)]\n5000000\n\n[Question 5 — Article des données de santé sans consentement]\n86",
    "takeaway": "1) Le traitement sans formalités préalables relève de l'article 79.\n2) Pour ce fait volontaire, l'amende maximale est de 10 000 000 FCFA.\n3) L'emprisonnement encouru est d'un à cinq ans : le minimum est d'un an.\n4) Par négligence, l'article 79 limite l'amende à 5 000 000 FCFA.\n5) Conserver des données de santé sans consentement exprès relève de l'article 86.\nContrôle : négligence ou non, le plancher d'emprisonnement reste un an ; seul le plafond d'amende passe de 10 000 000 à 5 000 000 FCFA."
  },
  {
    "id": "dr2-c6-e3",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Trois dossiers sur le bureau de l'Instance",
    "exampleTitle": "Exemple résolu — deux dossiers du greffe de l'Instance",
    "goal": "Rattacher chaque dossier instruit à son article et en tirer les peines encourues.",
    "brief": "<p><strong>Énoncé.</strong> L'Instance de protection des données instruit trois dossiers :</p><ul><li><strong>Dossier A</strong> — une banque conserve, hors les cas prévus par la loi, un fichier des condamnations de ses emprunteurs ;</li><li><strong>Dossier B</strong> — un moteur de recherche refuse de transmettre les documents demandés et bloque l'accès à ses programmes ;</li><li><strong>Dossier C</strong> — un groupe de presse met en ligne un fichier d'opinions religieuses de personnalités, sans leur consentement exprès.</li></ul><p>Rappel du cours : l'<strong>article 87</strong> punit la mise ou la conservation de données relatives à des infractions, condamnations ou mesures de sûreté hors les cas prévus par la loi (un à cinq ans, 1 000 000 à 10 000 000 FCFA) ; l'<strong>article 93</strong> punit l'entrave à l'action de l'Instance (six mois à deux ans, 1 000 000 à 10 000 000 FCFA) ; l'<strong>article 86</strong> punit la mise ou la conservation de données sensibles sans consentement exprès (un à cinq ans, 1 000 000 à 10 000 000 FCFA).</p><p>Répondez par le numéro d'article seul, sauf pour les questions 4 et 5 qui appellent une durée.</p><ol><li>Quel article le dossier A (fichier de condamnations) enfreint-il ?</li><li>Quel article le dossier B (refus opposé à l'Instance) enfreint-il ?</li><li>Quel article le dossier C (opinions religieuses sans consentement) enfreint-il ?</li><li>Quelle peine d'emprisonnement maximale le dossier B encourt-il ?</li><li>Quelle peine d'emprisonnement minimale les dossiers A et C encourent-ils ?</li></ol>",
    "starter": "# Exercice — Trois dossiers sur le bureau de l'Instance\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le numéro d'article seul. Questions 4 et 5 : une durée.\n\n[Question 1 — Article du dossier A]\nA_COMPLETER\n\n[Question 2 — Article du dossier B]\nA_COMPLETER\n\n[Question 3 — Article du dossier C]\nA_COMPLETER\n\n[Question 4 — Emprisonnement maximal du dossier B]\nA_COMPLETER\n\n[Question 5 — Emprisonnement minimal des dossiers A et C]\nA_COMPLETER\n",
    "hints": [
      "Qualifier, c'est relier un fait à son article : chaque dossier parle par son numéro de texte.",
      "Les opinions religieuses sont des données sensibles ; les condamnations relèvent d'un article dédié ; le refus opposé au contrôle est une entrave.",
      "1. Un fichier de condamnations hors les cas prévus par la loi a son article. 2. Refuser documents et accès, c'est entraver l'Instance. 3. Les opinions religieuses sans consentement exprès tombent sous la sanction des données sensibles. 4. Relisez la peine maximale de l'entrave. 5. Relisez le plancher des articles 86 et 87."
    ],
    "examples": [
      {
        "stdin": "L'Instance examine deux autres dossiers : (A') un loueur traite un fichier de locataires sans formalités préalables ; (B') le gardien de ce fichier refuse de le communiquer au contrôle.\n\n1) Article pour A' : 79.\n2) Article pour B' (entrave) : 93.\n3) Article si A' avait porté sur des condamnations : 87.\n4) Peine maximale de l'entrave : 2 ans.\n5) Peine minimale d'un traitement sans formalités : 1 an.",
        "expected": "A' : article 79 — B' : article 93 — condamnations : article 87 — entrave jusqu'à 2 ans — traitement sans formalités dès 1 an",
        "note": "Trois dossiers, trois articles : la qualification précède toujours la peine, jamais l'inverse."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Article du dossier A",
        "stdin": "q:1",
        "expected": "87||l'article 87||article 87"
      },
      {
        "label": "Question 2 — Article du dossier B",
        "stdin": "q:2",
        "expected": "93||l'article 93||article 93"
      },
      {
        "label": "Question 3 — Article du dossier C",
        "stdin": "q:3",
        "expected": "86||l'article 86||article 86"
      },
      {
        "label": "Question 4 — Emprisonnement maximal du dossier B",
        "stdin": "q:4",
        "expected": "2 ans||deux ans||6 mois à 2 ans||six mois à deux ans"
      },
      {
        "label": "Question 5 — Emprisonnement minimal des dossiers A et C",
        "stdin": "q:5",
        "expected": "1 an||un an||1"
      }
    ],
    "solution": "[Question 1 — Article du dossier A]\n87\n\n[Question 2 — Article du dossier B]\n93\n\n[Question 3 — Article du dossier C]\n86\n\n[Question 4 — Emprisonnement maximal du dossier B]\n2 ans\n\n[Question 5 — Emprisonnement minimal des dossiers A et C]\n1 an",
    "takeaway": "1) Conserver un fichier de condamnations hors les cas prévus par la loi : article 87.\n2) Refuser documents et accès au contrôle : entrave à l'action de l'Instance, article 93.\n3) Mettre en ligne des opinions religieuses sans consentement exprès : article 86.\n4) L'entrave est punie de six mois à deux ans : la peine maximale est de 2 ans.\n5) Les articles 86 et 87 punissent d'un à cinq ans : la peine minimale est d'un an.\nContrôle : les trois articles (86, 87, 93) partagent le même plafond d'amende, 10 000 000 FCFA ; seule l'entrave, article 93, abaisse l'emprisonnement à six mois à deux ans."
  }
];
