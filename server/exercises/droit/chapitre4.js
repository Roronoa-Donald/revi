/**
 * chapitre4.js — Études de cas du cours « droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "dr2-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "La diffamation du compte « VeriteLome »",
    "exampleTitle": "Exemple résolu — l'accusation du garagiste du quai",
    "goal": "Invoquer les bons textes dans un litige de diffamation en ligne et classer les sources.",
    "brief": "<p><strong>Énoncé.</strong> Le 8 février 2025, le compte anonyme « VeriteLome » publie sur un réseau social que la boulangerie de Mme Ayélé, établie au marché de Lomé, utilise des farines périmées — allégation fausse, qui a fait chuter la fréquentation de la boutique. Mme Ayélé consulte Me Adjovi, qui peut mobiliser : l'<strong>article 29 de la loi sur la liberté de la presse</strong> (diffamation et injure), l'<strong>article 9 du Code civil</strong> (respect de la vie privée), la <strong>Convention européenne de sauvegarde des droits de l'homme</strong> (articles 8 et 10) et la <strong>loi n° 78-17 du 6 janvier 1978</strong> « Informatique et Libertés ».</p><p>Rappel du cours : les sources nationales s'invoquent devant les juridictions internes (loi de presse, Code civil, loi Informatique et Libertés) ; les sources supranationales viennent d'au-dessus de l'État (Convention européenne, traités OMPI).</p><p>Répondez par le nombre seul pour la question 5 ; par le mot exact attendu pour les autres questions.</p><ol><li>Quel texte Me Adjovi invoquera-t-il pour la diffamation ?</li><li>Cette source est-elle nationale ou supranationale ?</li><li>Quel article du Code civil protège le respect de la vie privée ?</li><li>La Convention européenne de sauvegarde des droits de l'homme est-elle nationale ou supranationale ?</li><li>En quelle année la loi « Informatique et Libertés » a-t-elle été adoptée ?</li></ol>",
    "starter": "# Exercice — La diffamation du compte « VeriteLome »\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 5 : le nombre seul. Autres questions : le mot exact attendu.\n\n[Question 1 — Texte invoqué pour la diffamation]\nA_COMPLETER\n\n[Question 2 — Famille de cette source]\nA_COMPLETER\n\n[Question 3 — Article du Code civil sur la vie privée]\nA_COMPLETER\n\n[Question 4 — Famille de la Convention européenne]\nA_COMPLETER\n\n[Question 5 — Année de la loi Informatique et Libertés]\nA_COMPLETER\n",
    "hints": [
      "Une règle pensée pour la presse s'applique au numérique : le support change, la règle demeure — la diffamation en ligne se punit comme en presse écrite.",
      "Ne mélangez pas les familles : les textes internes (loi de presse, Code civil, loi de 1978) sont nationaux ; la Convention européenne et les traités OMPI sont supranationaux.",
      "1. La diffamation relève du texte de presse cité par le client. 2. Ce texte est voté par le Parlement français. 3. Le Code civil protège la vie privée par un article célèbre. 4. La Convention européenne engage les États au-dessus d'eux. 5. Relisez le numéro de la loi « Informatique et Libertés »."
    ],
    "examples": [
      {
        "stdin": "Un internaute accuse faussement, sur un forum, le garagiste du quai de tromperie sur les kilométrages.\n\n1) Texte invoqué : l'article 29 de la loi sur la liberté de la presse.\n2) Famille : nationale.\n3) Vie privée : article 9 du Code civil.\n4) Convention européenne : supranationale.\n5) Loi Informatique et Libertés : 1978.",
        "expected": "article 29 — source nationale — article 9 pour la vie privée — Convention européenne : supranationale — loi de 1978",
        "note": "Le même litige mobilise deux familles de sources : les textes internes fondent l'action, les instruments internationaux garantissent les droits en jeu."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Texte invoqué pour la diffamation",
        "stdin": "q:1",
        "expected": "article 29||l'article 29 de la loi sur la liberté de la presse||article 29 de la loi sur la liberté de la presse||la loi sur la liberté de la presse"
      },
      {
        "label": "Question 2 — Famille de cette source",
        "stdin": "q:2",
        "expected": "nationale||une source nationale||national"
      },
      {
        "label": "Question 3 — Article du Code civil sur la vie privée",
        "stdin": "q:3",
        "expected": "article 9||l'article 9 du code civil||article 9 du code civil||9"
      },
      {
        "label": "Question 4 — Famille de la Convention européenne",
        "stdin": "q:4",
        "expected": "supranationale||une source supranationale||supranational"
      },
      {
        "label": "Question 5 — Année de la loi Informatique et Libertés",
        "stdin": "q:5",
        "expected": "1978"
      }
    ],
    "solution": "[Question 1 — Texte invoqué pour la diffamation]\narticle 29\n\n[Question 2 — Famille de cette source]\nnationale\n\n[Question 3 — Article du Code civil sur la vie privée]\narticle 9\n\n[Question 4 — Famille de la Convention européenne]\nsupranationale\n\n[Question 5 — Année de la loi Informatique et Libertés]\n1978",
    "takeaway": "1) La diffamation par un message publié relève de l'article 29 de la loi sur la liberté de la presse.\n2) Cette loi est votée par le Parlement : c'est une source nationale.\n3) Le respect de la vie privée est protégé par l'article 9 du Code civil.\n4) La Convention européenne de sauvegarde des droits de l'homme est une source supranationale.\n5) La loi n° 78-17 « Informatique et Libertés » a été adoptée en 1978.\nContrôle : le dossier combine deux familles sans les confondre — presse et Code civil côté national, Convention européenne côté supranational."
  },
  {
    "id": "dr2-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "La frise chronologique du dossier de Me Adjovi",
    "exampleTitle": "Exemple résolu — la frise du dossier VoletVert",
    "goal": "Ordonner les textes du droit du numérique dans le temps et mesurer les écarts entre eux.",
    "brief": "<p><strong>Énoncé.</strong> Pour son mémoire sur la protection des données, Me Adjovi dresse la liste des textes suivants :</p><table><tr><th>Texte</th><th>Année</th></tr><tr><td>Convention européenne des droits de l'homme</td><td>1950</td></tr><tr><td>Loi n° 78-17 « Informatique et Libertés »</td><td>1978</td></tr><tr><td>Traités Internet de l'OMPI</td><td>1996</td></tr><tr><td>RGPD applicable dans l'Union européenne</td><td>mai 2018</td></tr><tr><td>Loi togolaise n° 2019-014 (RGPD applicable au Togo)</td><td>octobre 2019</td></tr></table><p>Rappel du cours : il n'existe pas de « Code du numérique » ; les règles sont dispersées entre lois, conventions et traités, d'où l'intérêt de les classer dans le temps.</p><p>Répondez par l'année seule pour les questions 1 à 4 ; pour la question 5, écrivez les années du plus ancien au plus récent, séparées par des espaces.</p><ol><li>Quelle est l'année du texte le plus ancien ?</li><li>Quelle est l'année du texte le plus récent ?</li><li>En quelle année les traités Internet de l'OMPI ont-ils été adoptés ?</li><li>Combien d'années séparent l'entrée en vigueur du RGPD dans l'Union européenne et la loi togolaise qui le met en œuvre ?</li><li>Rendez les cinq textes du plus ancien au plus récent.</li></ol>",
    "starter": "# Exercice — La frise chronologique du dossier de Me Adjovi\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : l'année seule. Question 5 : les années séparées par des espaces.\n\n[Question 1 — Année du texte le plus ancien]\nA_COMPLETER\n\n[Question 2 — Année du texte le plus récent]\nA_COMPLETER\n\n[Question 3 — Année des traités Internet de l'OMPI]\nA_COMPLETER\n\n[Question 4 — Écart entre le RGPD européen et la loi togolaise]\nA_COMPLETER\n\n[Question 5 — Les cinq textes ordonnés]\nA_COMPLETER\n",
    "hints": [
      "Le droit du numérique ne commence pas avec Internet : dès les années 1970, le législateur encadre les fichiers informatiques.",
      "Un écart en années se calcule par simple soustraction entre les deux dates clés ; la convention est signée avant la loi togolaise qui l'applique.",
      "1. Cherchez la plus petite année du tableau. 2. Cherchez la plus grande. 3. Les traités OMPI sont adoptés entre la loi de 1978 et le RGPD. 4. 2019 − 2018. 5. Rangez les cinq années en ordre croissant."
    ],
    "examples": [
      {
        "stdin": "Le dossier VoletVert comporte quatre textes : loi Informatique et Libertés (1978), Convention européenne des droits de l'homme (1950), RGPD (2018), traités OMPI (1996).\n\n1) Le plus ancien : 1950.\n2) Le plus récent : 2018.\n3) Année des traités OMPI : 1996.\n4) Écart entre le RGPD et la loi de 1978 : 2018 − 1978 = 40 ans.\n5) Ordre : 1950 1978 1996 2018.",
        "expected": "1950 — 2018 — traités OMPI : 1996 — 40 ans d'écart — ordre 1950 1978 1996 2018",
        "note": "Classer les textes dans le temps évite le mélange des familles : à chaque époque sa règle, à chaque règle sa source."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Année du texte le plus ancien",
        "stdin": "q:1",
        "expected": "1950"
      },
      {
        "label": "Question 2 — Année du texte le plus récent",
        "stdin": "q:2",
        "expected": "2019"
      },
      {
        "label": "Question 3 — Année des traités Internet de l'OMPI",
        "stdin": "q:3",
        "expected": "1996"
      },
      {
        "label": "Question 4 — Écart entre le RGPD européen et la loi togolaise",
        "stdin": "q:4",
        "expected": "1||un an||1 an"
      },
      {
        "label": "Question 5 — Les cinq textes ordonnés",
        "stdin": "q:5",
        "expected": "1950 1978 1996 2018 2019"
      }
    ],
    "solution": "[Question 1 — Année du texte le plus ancien]\n1950\n\n[Question 2 — Année du texte le plus récent]\n2019\n\n[Question 3 — Année des traités Internet de l'OMPI]\n1996\n\n[Question 4 — Écart entre le RGPD européen et la loi togolaise]\n1\n\n[Question 5 — Les cinq textes ordonnés]\n1950 1978 1996 2018 2019",
    "takeaway": "1) Le texte le plus ancien est la Convention européenne des droits de l'homme, 1950.\n2) Le plus récent est la loi togolaise n° 2019-014, 2019.\n3) Les traités Internet de l'OMPI datent de 1996.\n4) Le RGPD est applicable dans l'Union en mai 2018, la loi togolaise l'adapte en octobre 2019 : un écart d'un an (2019 − 2018).\n5) Ordre chronologique : 1950 (Convention), 1978 (loi 78-17), 1996 (OMPI), 2018 (RGPD européen), 2019 (loi togolaise).\nContrôle : chaque texte occupe son rang sans partage — aucun doublon d'année dans la frise."
  },
  {
    "id": "dr2-c4-e3",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le photographe plagié et les traités de l'OMPI",
    "exampleTitle": "Exemple résolu — les dessins plagiés de l'illustratrice Zara",
    "goal": "Protéger une création par le droit d'auteur, mobiliser les traités OMPI et chiffrer le préjudice.",
    "brief": "<p><strong>Énoncé.</strong> Kossi, photographe indépendant à Lomé, découvre en mars 2025 que <strong>240 de ses clichés</strong> sont vendus sur des sites marchands étrangers, sans licence et sans son accord. Il réclame <strong>50 € par cliché utilisé</strong>. Son avocate mobilise le <strong>droit d'auteur</strong> (branche de la propriété intellectuelle), les <strong>traités Internet de l'OMPI adoptés en 1996</strong> — le traité sur le droit d'auteur et le traité sur les interprétations et les phonogrammes — et la Convention européenne (articles 8 et 10).</p><p>Rappel du cours : les sources supranationales du droit du numérique comprennent la Convention européenne de sauvegarde des droits de l'homme et les traités Internet de l'OMPI de 1996.</p><p>Répondez par le nombre seul pour les questions chiffrées ; par le mot exact attendu pour les autres questions.</p><ol><li>À quelle branche du droit la protection des clichés de Kossi appartient-elle ?</li><li>En quelle année les traités Internet de l'OMPI ont-ils été adoptés ?</li><li>Combien de traités Internet l'OMPI a-t-elle adoptés cette année-là ?</li><li>Ces traités sont-ils des sources nationales ou supranationales ?</li><li>Quel montant total Kossi réclame-t-il, en euros ?</li></ol>",
    "starter": "# Exercice — Le photographe plagié et les traités de l'OMPI\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions chiffrées : le nombre seul. Autres questions : le mot exact attendu.\n\n[Question 1 — Branche du droit concernée]\nA_COMPLETER\n\n[Question 2 — Année des traités Internet de l'OMPI]\nA_COMPLETER\n\n[Question 3 — Nombre de traités adoptés]\nA_COMPLETER\n\n[Question 4 — Famille de ces traités]\nA_COMPLETER\n\n[Question 5 — Montant total réclamé (en €)]\nA_COMPLETER\n",
    "hints": [
      "Une création de l'esprit — photo, dessin, logiciel — est protégée dès sa création : la branche du droit qui la protège est celle des créations de l'esprit.",
      "Les traités de 1996 étendent la protection au-delà des frontières : une œuvre protégée dans un pays l'est aussi contre les sites étrangers.",
      "1. Nommez la branche qui protège les créations de l'esprit. 2. L'année est dans le rappel du cours. 3. Comptez les deux traités cités. 4. Un traité international engage plusieurs États. 5. Multipliez le nombre de clichés par le prix demandé par cliché."
    ],
    "examples": [
      {
        "stdin": "L'illustratrice Zara découvre 60 de ses dessins vendus sans licence ; elle réclame 30 € par dessin.\n\n1) Branche : la propriété intellectuelle (droit d'auteur).\n2) Année des traités OMPI : 1996.\n3) Nombre de traités : 2.\n4) Famille : supranationale.\n5) Total réclamé : 60 × 30 = 1 800 €.",
        "expected": "propriété intellectuelle — 1996 — 2 traités — sources supranationales — 1 800 €",
        "note": "Les traités OMPI de 1996 font franchir les frontières à la protection : la création reste protégée chez les sites étrangers qui l'exploitent."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Branche du droit concernée",
        "stdin": "q:1",
        "expected": "propriété intellectuelle||la propriété intellectuelle||le droit d'auteur||droit d'auteur"
      },
      {
        "label": "Question 2 — Année des traités Internet de l'OMPI",
        "stdin": "q:2",
        "expected": "1996"
      },
      {
        "label": "Question 3 — Nombre de traités adoptés",
        "stdin": "q:3",
        "expected": "2||deux"
      },
      {
        "label": "Question 4 — Famille de ces traités",
        "stdin": "q:4",
        "expected": "supranationales||des sources supranationales||supranationale"
      },
      {
        "label": "Question 5 — Montant total réclamé (en €)",
        "stdin": "q:5",
        "expected": "12000||12 000||12000 €||12 000 €"
      }
    ],
    "solution": "[Question 1 — Branche du droit concernée]\npropriété intellectuelle\n\n[Question 2 — Année des traités Internet de l'OMPI]\n1996\n\n[Question 3 — Nombre de traités adoptés]\n2\n\n[Question 4 — Famille de ces traités]\nsupranationales\n\n[Question 5 — Montant total réclamé (en €)]\n12000",
    "takeaway": "1) La protection des clichés relève de la propriété intellectuelle, branche droit d'auteur.\n2) Les traités Internet de l'OMPI ont été adoptés en 1996.\n3) L'OMPI a adopté deux traités cette année-là : le traité sur le droit d'auteur et le traité sur les interprétations et les phonogrammes.\n4) Ce sont des sources supranationales : elles engagent plusieurs États au-dessus d'eux.\n5) Kossi réclame 240 × 50 = 12 000 €.\nContrôle : 240 clichés à 50 € pièce = 12 000 € ; le préjudice est chiffré cliché par cliché, sans forfait global."
  }
];
