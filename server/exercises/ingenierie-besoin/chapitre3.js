/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "ib2-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Choisir la technique d'élicitation : trois missions du cabinet Agritec",
    "exampleTitle": "Exemple résolu — deux missions du bureau EtudePlus",
    "goal": "Choisir la technique de recueil des exigences adaptée au contexte : dispersion des acteurs, savoir tacite, conflit ou besoin flou.",
    "brief": "<p><strong>Énoncé.</strong> Le cabinet d'analyse Agritec conduit trois missions de recueil des besoins :</p><ul><li><strong>Mission A — Coopérative cotonnière du Centre :</strong> 300 producteurs dispersés sur 12 préfectures ; la coopérative veut connaître leurs attentes générales sur un futur outil de gestion des ventes de coton.</li><li><strong>Mission B — Atelier de couture Kofi &amp; Fils :</strong> quatre couturières expertes calculent leurs devis « au feeling » et ne savent pas expliquer leur méthode ; leur savoir-faire est tacite.</li><li><strong>Mission C — Société TransSahel :</strong> la direction et les délégués du personnel s'opposent ouvertement sur les priorités du futur logiciel de notes de frais ; un arbitrage collectif est nécessaire.</li></ul><p>Techniques du cours : entretien individuel, questionnaire en ligne, observation terrain (shadowing), atelier animé (workshop JAD), prototypage exploratoire.</p><ol><li>Quelle technique recommander pour la mission A ?</li><li>Quelle technique recommander pour la mission B ?</li><li>Quelle technique recommander pour la mission C ?</li><li>Le président de TransSahel ne peut consacrer qu'une heure au projet : quelle technique individuelle utiliser avec lui ?</li><li>Pour faire préciser un besoin flou à l'aide d'un artefact manipulable dès les premières semaines, quelle technique mobiliser ?</li></ol>",
    "starter": "# Exercice — Choisir la technique d'élicitation : trois missions du cabinet Agritec\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nom de la technique (par exemple : entretien individuel).\n\n[Question 1 — Technique recommandée pour la mission A]\nA_COMPLETER\n\n[Question 2 — Technique recommandée pour la mission B]\nA_COMPLETER\n\n[Question 3 — Technique recommandée pour la mission C]\nA_COMPLETER\n\n[Question 4 — Technique individuelle pour le président de TransSahel]\nA_COMPLETER\n\n[Question 5 — Technique de l'artefact manipulable pour un besoin flou]\nA_COMPLETER\n",
    "hints": [
      "Le choix dépend de trois variables : le nombre et la dispersion des acteurs, la nature du savoir (explicite ou tacite) et le degré de conflit ou de flou.",
      "Un grand nombre d'acteurs dispersés appelle le questionnaire ; un savoir non verbalisable appelle l'observation ; un désaccord appelle l'atelier animé.",
      "1. Mission A : 300 producteurs dispersés : questionnaire en ligne. 2. Mission B : savoir-faire tacite : observation terrain. 3. Mission C : conflit à arbitrer : atelier animé. 4. Un dirigeant pressé : entretien individuel. 5. Un besoin flou à matérialiser : prototypage."
    ],
    "examples": [
      {
        "stdin": "Le bureau EtudePlus arbitre deux missions :\n- Mairie de Rivage : 250 familles usagers de la crèche, à interroger sur leurs horaires préférés ;\n- Boulangerie Aya : la boulangère seule sait régler les fours de nuit mais ne sait pas l'expliquer.\n\n1) Mairie : grand nombre d'usagers dispersés : questionnaire en ligne.\n2) Boulangerie : savoir-faire tacite : observation terrain (shadowing).",
        "expected": "Mairie : questionnaire en ligne — Boulangerie : observation terrain",
        "note": "Quand l'expert ne peut pas verbaliser sa pratique, on ne l'interroge pas : on l'observe en situation réelle."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Technique recommandée pour la mission A",
        "stdin": "q:1",
        "expected": "le questionnaire en ligne||questionnaire en ligne||le questionnaire||questionnaire||sondage en ligne"
      },
      {
        "label": "Question 2 — Technique recommandée pour la mission B",
        "stdin": "q:2",
        "expected": "l'observation terrain||observation terrain||le shadowing||shadowing||l'observation||observation"
      },
      {
        "label": "Question 3 — Technique recommandée pour la mission C",
        "stdin": "q:3",
        "expected": "l'atelier animé||atelier animé||le workshop||workshop||l'atelier anime JAD||atelier anime||JAD||workshop JAD"
      },
      {
        "label": "Question 4 — Technique individuelle pour le président de TransSahel",
        "stdin": "q:4",
        "expected": "l'entretien individuel||entretien individuel||l'entretien||entretien"
      },
      {
        "label": "Question 5 — Technique de l'artefact manipulable pour un besoin flou",
        "stdin": "q:5",
        "expected": "le prototypage||prototypage||le prototypage exploratoire||prototypage exploratoire||le prototype||prototype"
      }
    ],
    "solution": "[Question 1 — Technique recommandée pour la mission A]\nle questionnaire en ligne\n\n[Question 2 — Technique recommandée pour la mission B]\nl'observation terrain\n\n[Question 3 — Technique recommandée pour la mission C]\nl'atelier animé\n\n[Question 4 — Technique individuelle pour le président de TransSahel]\nl'entretien individuel\n\n[Question 5 — Technique de l'artefact manipulable pour un besoin flou]\nle prototypage",
    "takeaway": "1) Mission A : 300 producteurs dispersés sur 12 préfectures, attentes générales à recueillir : le questionnaire en ligne est la seule technique raisonnable en volume et en coût.\n2) Mission B : les couturières ne savent pas verbaliser leur méthode : l'observation terrain (shadowing) capture le savoir tacite.\n3) Mission C : direction et délégués en conflit ouvert : l'atelier animé (workshop JAD) permet la confrontation et l'arbitrage collectif.\n4) Pour une heure avec le président : l'entretien individuel, court et préparé.\n5) Pour matérialiser un besoin flou : le prototypage exploratoire, qui donne un artefact à manipuler et à critiquer.\nContrôle : chaque recommandation se justifie par le couple nombre d'acteurs / nature du savoir, jamais par la préférence de l'analyste."
  },
  {
    "id": "ib2-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Dépouiller le questionnaire des salariés de Novaterra",
    "exampleTitle": "Exemple résolu — l'enquête des lecteurs de la médiathèque de Rivage",
    "goal": "Dépouiller une enquête d'élicitation par questionnaire : effectifs, moyennes sur 5 et classement des fonctionnalités.",
    "brief": "<p><strong>Énoncé.</strong> La direction des ressources humaines de Novaterra a interrogé ses salariés, par questionnaire, sur quatre fonctionnalités proposées pour le futur intranet. Chaque répondant attribue une note de 1 à 5 à une fonctionnalité. Le dépouillement brut donne les notes suivantes :</p><table><tr><th>Fonctionnalité</th><th>Notes attribuées</th></tr><tr><th>Annuaire des services</th><td>5 ; 4 ; 4 ; 4 ; 3</td></tr><tr><th>Réservation des salles</th><td>4 ; 4 ; 3 ; 3 ; 2 ; 2</td></tr><tr><th>Menu de la cantine</th><td>5 ; 5 ; 4 ; 4 ; 4</td></tr><tr><th>Actualités de l'entreprise</th><td>3 ; 2 ; 2 ; 1</td></tr></table><p>La moyenne d'une fonctionnalité est la somme de ses notes divisée par son nombre de notes ; arrondissez au dixième si nécessaire.</p><ol><li>Combien de réponses ont été collectées au total ?</li><li>Quelle est la note moyenne du menu de la cantine ?</li><li>Quelle est la note moyenne de l'annuaire des services ?</li><li>Quelle fonctionnalité obtient la meilleure moyenne ?</li><li>Quelle fonctionnalité obtient la moins bonne moyenne ?</li></ol>",
    "starter": "# Exercice — Dépouiller le questionnaire des salariés de Novaterra\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 et 3 : la moyenne au dixième (par exemple 3,5). Questions 4 et 5 : le nom de la fonctionnalité.\n\n[Question 1 — Nombre total de réponses collectées]\nA_COMPLETER\n\n[Question 2 — Note moyenne du menu de la cantine]\nA_COMPLETER\n\n[Question 3 — Note moyenne de l'annuaire des services]\nA_COMPLETER\n\n[Question 4 — Fonctionnalité la mieux notée]\nA_COMPLETER\n\n[Question 5 — Fonctionnalité la moins bien notée]\nA_COMPLETER\n",
    "hints": [
      "Le dépouillement commence par les effectifs : comptez toutes les notes du tableau, toutes fonctionnalités confondues.",
      "La moyenne d'une fonctionnalité s'obtient en additionnant ses notes puis en divisant par son nombre de notes propre (qui varie d'une ligne à l'autre).",
      "1. Comptez : 5 + 6 + 5 + 4 = 20 réponses. 2. Cantine : (5 + 5 + 4 + 4 + 4)/5 = 22/5. 3. Annuaire : (5 + 4 + 4 + 4 + 3)/5 = 20/5. 4. Comparez les quatre moyennes pour classer. 5. La moins bonne moyenne se lit dans le même classement."
    ],
    "examples": [
      {
        "stdin": "La médiathèque de Rivage interroge ses lecteurs sur trois services :\n- Réservation en ligne : notes 5 ; 4 ; 4 (3 réponses) ;\n- Portail pour enfants : notes 5 ; 5 (2 réponses) ;\n- Impression à la demande : notes 2 ; 1 ; 2 (3 réponses).\n\n1) Total : 8 réponses.\n2) Réservation : 13/3 = 4,3.\n3) Portail enfants : 10/2 = 5,0 (meilleure moyenne).\n4) Impression : 5/3 = 1,7 (moins bonne moyenne).",
        "expected": "8 réponses — réservation 4,3 — portail enfants 5,0 (premier) — impression 1,7 (dernier)",
        "note": "Chaque fonctionnalité se moyenne sur son propre effectif : ne divisez jamais par le nombre total de répondants."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre total de réponses collectées",
        "stdin": "q:1",
        "expected": "20||vingt"
      },
      {
        "label": "Question 2 — Note moyenne du menu de la cantine",
        "stdin": "q:2",
        "expected": "4,4||4.4"
      },
      {
        "label": "Question 3 — Note moyenne de l'annuaire des services",
        "stdin": "q:3",
        "expected": "4,0||4.0||4"
      },
      {
        "label": "Question 4 — Fonctionnalité la mieux notée",
        "stdin": "q:4",
        "expected": "le menu de la cantine||menu de la cantine||la cantine||cantine"
      },
      {
        "label": "Question 5 — Fonctionnalité la moins bien notée",
        "stdin": "q:5",
        "expected": "les actualités de l'entreprise||actualités de l'entreprise||les actualites de l'entreprise||actualites de l'entreprise||les actualités||actualités"
      }
    ],
    "solution": "[Question 1 — Nombre total de réponses collectées]\n20\n\n[Question 2 — Note moyenne du menu de la cantine]\n4,4\n\n[Question 3 — Note moyenne de l'annuaire des services]\n4,0\n\n[Question 4 — Fonctionnalité la mieux notée]\nle menu de la cantine\n\n[Question 5 — Fonctionnalité la moins bien notée]\nles actualités de l'entreprise",
    "takeaway": "1) Effectif total : 5 (annuaire) + 6 (réservation) + 5 (cantine) + 4 (actualités) = 20 réponses.\n2) Menu de la cantine : (5 + 5 + 4 + 4 + 4)/5 = 22/5 = 4,4.\n3) Annuaire des services : (5 + 4 + 4 + 4 + 3)/5 = 20/5 = 4,0.\n4) Classement : cantine 4,4 ; annuaire 4,0 ; réservation 18/6 = 3,0 ; actualités 8/4 = 2,0. La mieux notée est le menu de la cantine.\n5) La moins bien notée est les actualités de l'entreprise (2,0).\nContrôle : la somme des moyennes pondérées par les effectifs redonne le total des notes : 22 + 20 + 18 + 8 = 68 points pour 20 réponses."
  },
  {
    "id": "ib2-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Personas : Abla la comptable et Marc le commercial",
    "exampleTitle": "Exemple résolu — le persona Germaine de la clinique du Golfe",
    "goal": "Vérifier la complétude d'un persona et mobiliser ses attributs : objectifs, frustrations, archétype.",
    "brief": "<p><strong>Énoncé.</strong> Pour l'application de gestion des notes de frais de la société TransSahel, l'analyste construit deux personas après une série d'entretiens.</p><p><strong>Persona 1 — Abla, comptable :</strong></p><ul><li>Objectifs : clôturer les notes de frais avant le 5 de chaque mois ; éviter les justificatifs papier perdus ; repérer les anomalies dès la saisie.</li><li>Frustrations : ressaisir les montants à la main ; relancer les managers par téléphone.</li></ul><p><strong>Persona 2 — Marc, commercial :</strong></p><ul><li>Objectifs : (aucun objectif formulé).</li><li>Frustrations : perdre du temps en fin de mois.</li></ul><p>Rappel du cours : un persona exploitable exige un nom, un rôle, <strong>au moins un objectif</strong> et <strong>au moins une frustration</strong> ; un persona est un archétype d'utilisateur, fictif mais réaliste, pas une personne réelle.</p><ol><li>Combien d'objectifs compte le persona d'Abla ?</li><li>Combien de frustrations compte le persona d'Abla ?</li><li>Le persona de Marc est-il complet ou incomplet ?</li><li>Quelle propriété lui manque-t-il ?</li><li>Un persona représente-t-il un utilisateur réel ou un archétype fictif ?</li></ol>",
    "starter": "# Exercice — Personas : Abla la comptable et Marc le commercial\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 4 : le nom de la propriété manquante.\n\n[Question 1 — Nombre d'objectifs du persona d'Abla]\nA_COMPLETER\n\n[Question 2 — Nombre de frustrations du persona d'Abla]\nA_COMPLETER\n\n[Question 3 — Statut du persona de Marc]\nA_COMPLETER\n\n[Question 4 — Propriété manquante du persona de Marc]\nA_COMPLETER\n\n[Question 5 — Nature d'un persona : utilisateur réel ou archétype fictif]\nA_COMPLETER\n",
    "hints": [
      "Un persona synthétise des comportements observés : ses objectifs disent ce que l'utilisateur cherche, ses frustrations ce qui le freine.",
      "Vérifiez les quatre propriétés dans l'ordre : nom, rôle, objectifs (au moins un), frustrations (au moins une).",
      "1. Comptez les objectifs d'Abla : clôturer, éviter, repérer. 2. Comptez ses frustrations : ressaisir, relancer. 3. Marc n'a formulé aucun objectif : son persona est incomplet. 4. La propriété manquante est donc les objectifs. 5. Un persona est un archétype fictif réaliste."
    ],
    "examples": [
      {
        "stdin": "Clinique du Golfe : persona Germaine, infirmière.\nObjectifs : préparer les tours de garde la veille ; éviter les doubles saisies de constantes.\nFrustrations : chercher les dossiers papier ; refaire les planning imprimés.\nSecond brouillon : persona « Kodjo », rôle vide, un objectif, une frustration.\n\n1) Germaine : 2 objectifs et 2 frustrations : persona complet.\n2) Kodjo : le rôle est vide : persona incomplet (propriété manquante : le rôle).",
        "expected": "Germaine complète (2 objectifs, 2 frustrations) — Kodjo incomplet (rôle manquant)",
        "note": "Le persona condense des dizaines d'entretiens en un portrait actionnable : chaque propriété manquante le rend inutilisable pour l'équipe."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'objectifs du persona d'Abla",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Nombre de frustrations du persona d'Abla",
        "stdin": "q:2",
        "expected": "2||deux"
      },
      {
        "label": "Question 3 — Statut du persona de Marc",
        "stdin": "q:3",
        "expected": "incomplet||incomplète"
      },
      {
        "label": "Question 4 — Propriété manquante du persona de Marc",
        "stdin": "q:4",
        "expected": "les objectifs||objectifs||les objectifs formulés||au moins un objectif"
      },
      {
        "label": "Question 5 — Nature d'un persona : utilisateur réel ou archétype fictif",
        "stdin": "q:5",
        "expected": "un archétype fictif||archétype fictif||un archetype fictif||archetype fictif||un archétype||archétype"
      }
    ],
    "solution": "[Question 1 — Nombre d'objectifs du persona d'Abla]\n3\n\n[Question 2 — Nombre de frustrations du persona d'Abla]\n2\n\n[Question 3 — Statut du persona de Marc]\nincomplet\n\n[Question 4 — Propriété manquante du persona de Marc]\nles objectifs\n\n[Question 5 — Nature d'un persona : utilisateur réel ou archétype fictif]\nun archétype fictif",
    "takeaway": "1) Abla formule trois objectifs : clôturer avant le 5, éviter les justificatifs perdus, repérer les anomalies dès la saisie.\n2) Abla formule deux frustrations : ressaisir à la main, relancer par téléphone.\n3) Le persona de Marc est incomplet : il ne formule aucun objectif.\n4) La propriété manquante est les objectifs (au moins un objectif est exigé).\n5) Un persona est un archétype fictif, réaliste mais inventé, qui synthétise des comportements observés ; ce n'est jamais un utilisateur réel interrogé tel quel.\nContrôle : persona complet = nom + rôle + au moins un objectif + au moins une frustration ; Marc échoue sur le troisième terme."
  }
];
