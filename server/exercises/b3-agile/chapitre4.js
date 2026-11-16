/**
 * chapitre4.js — Études de cas du cours « b3-agile ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ag3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Les user stories de ColisTrack passées au crible",
    "exampleTitle": "Exemple résolu — les stories de l'application Restaur'App",
    "goal": "Vérifier qu'une user story suit le canevas « En tant que… je veux… afin de… » et repérer les critères INVEST violés.",
    "brief": "<p><strong>Énoncé.</strong> ColisTrack, application de suivi de colis, prépare son prochain sprint. Le Product Owner a rédigé trois éléments du backlog :</p><p><strong>US-21</strong> : « En tant que <em>destinataire</em>, je veux <em>recevoir une notification SMS quand mon colis est en transit</em>, afin d'<em>être prévenu sans ouvrir l'application</em>. » — 3 critères d'acceptation rédigés.</p><p><strong>US-22</strong> : « En tant qu'utilisateur, je veux un écran bleu. » — aucun critère d'acceptation.</p><p><strong>US-23</strong> : « Le système doit exporter les statistiques de livraison au format CSV. » — 2 critères d'acceptation.</p><p>Rappel : une user story bien formée suit le canevas « En tant que [persona], je veux [action], afin de [bénéfice] ». L'acronyme INVEST garantit sa qualité : la story doit être indépendante, négociable, de valeur, estimable, petite et testable.</p><ol><li>Quel persona la US-21 adresse-t-elle ? Répondez par un mot.</li><li>Quel mot du canevas (« en tant que », « je veux », « afin de ») introduit le bénéfice métier ?</li><li>Pour compléter la US-22, quelle question le Product Owner doit-il poser à l'auteur de la demande : pour qui, pourquoi ou comment ?</li><li>Quel critère INVEST une story sans aucun critère d'acceptation viole-t-elle ? Répondez par l'adjectif anglais.</li><li>La US-23 est-elle rédigée selon le canevas narratif de la user story ? Répondez par oui ou non.</li><li>Que signifie la lettre V de l'acronyme INVEST ? Répondez par l'adjectif anglais.</li></ol>",
    "starter": "# Exercice — Les user stories de ColisTrack passées au crible\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 4 et 6 : l'adjectif anglais. Question 5 : oui ou non.\n\n[Question 1 — Persona adressé par la US-21]\nA_COMPLETER\n\n[Question 2 — Mot du canevas qui introduit le bénéfice]\nA_COMPLETER\n\n[Question 3 — Question à poser pour compléter la US-22]\nA_COMPLETER\n\n[Question 4 — Critère INVEST violé sans critère d'acceptation]\nA_COMPLETER\n\n[Question 5 — La US-23 suit-elle le canevas narratif ?]\nA_COMPLETER\n\n[Question 6 — Signification de la lettre V de INVEST]\nA_COMPLETER\n",
    "hints": [
      "Le canevas de Mike Cohn raconte l'histoire de l'utilisateur : qui il est, ce qu'il veut, pourquoi il le veut.",
      "INVEST qualifie la story sur six dimensions : indépendance, négociabilité, valeur, estimabilité, taille réduite et testabilité ; chaque absence se paie.",
      "1. Le persona suit la première partie du canevas. 2. La troisième partie du canevas porte le bénéfice. 3. Demandez ce que l'utilisateur y gagne concrètement. 4. Sans critère d'acceptation, impossible de vérifier la story. 5. Un récit parle de l'utilisateur, pas du système. 6. La lettre V interroge ce que la story apporte."
    ],
    "examples": [
      {
        "stdin": "Restaur'App, application de commande en salle, rédige deux stories.\nRS-1 : « En tant que serveur, je veux envoyer la commande en cuisine, afin de ne plus crier en salle. » (2 critères)\nRS-2 : « En tant que client, je veux un bouton rouge. » (0 critère)\n\n1) Persona de RS-1 : le serveur.\n2) Le bénéfice « ne plus crier en salle » complète « afin de ».\n3) Pour RS-2, demander : pourquoi ? quel bénéfice ?\n4) RS-2 sans critère d'acceptation viole Testable.\n5) RS-2 n'exprime aucune valeur : elle viole aussi Valuable.",
        "expected": "persona : le serveur — bénéfice dans « afin de » — RS-2 viole Testable et Valuable",
        "note": "Une action sans bénéfice exprimé n'est pas une story : le « afin de » force à justifier la valeur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Persona adressé par la US-21",
        "stdin": "q:1",
        "expected": "destinataire||le destinataire"
      },
      {
        "label": "Question 2 — Mot du canevas qui introduit le bénéfice",
        "stdin": "q:2",
        "expected": "afin de"
      },
      {
        "label": "Question 3 — Question à poser pour compléter la US-22",
        "stdin": "q:3",
        "expected": "pourquoi||le pourquoi"
      },
      {
        "label": "Question 4 — Critère INVEST violé sans critère d'acceptation",
        "stdin": "q:4",
        "expected": "testable"
      },
      {
        "label": "Question 5 — La US-23 suit-elle le canevas narratif ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Signification de la lettre V de INVEST",
        "stdin": "q:6",
        "expected": "valuable"
      }
    ],
    "solution": "[Question 1 — Persona adressé par la US-21]\ndestinataire\n\n[Question 2 — Mot du canevas qui introduit le bénéfice]\nafin de\n\n[Question 3 — Question à poser pour compléter la US-22]\npourquoi\n\n[Question 4 — Critère INVEST violé sans critère d'acceptation]\ntestable\n\n[Question 5 — La US-23 suit-elle le canevas narratif ?]\nnon\n\n[Question 6 — Signification de la lettre V de INVEST]\nvaluable",
    "takeaway": "1) La US-21 s'adresse au destinataire du colis.\n2) Le bénéfice métier (« être prévenu sans ouvrir l'application ») complète « afin de ».\n3) « Je veux un écran bleu » ne dit rien du bénéfice : il faut demander pourquoi.\n4) Sans critère d'acceptation, la story est invérifiable : elle viole Testable.\n5) Non : « Le système doit… » est une exigence technique ; le canevas narratif (persona, action, bénéfice) est absent.\n6) V signifie Valuable : la story doit apporter une valeur à l'utilisateur ou au métier.\nContrôle : la US-21 satisfait le canevas et INVEST ; la US-22 viole Valuable et Testable ; la US-23 n'est même pas une story."
  },
  {
    "id": "ag3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "La séance de Planning Poker de l'équipe Pylône",
    "exampleTitle": "Exemple résolu — l'estimation de la story « favoris » de l'équipe Delta",
    "goal": "Animer un tour de Planning Poker : lire les votes, mesurer la divergence et retenir une estimation en story points.",
    "brief": "<p><strong>Énoncé.</strong> L'équipe Pylône, qui développe un service de réservation de salles, estime la story « Mettre en place la recherche plein texte » en Planning Poker, avec les cartes de la suite de Fibonacci modifiée : 1, 2, 3, 5, 8, 13, 20, 40. Cinq développeurs votent simultanément :</p><table><tr><th>Développeur</th><th>Léa</th><th>Karim</th><th>Nina</th><th>Paul</th><th>Omar</th></tr><tr><th>Vote</th><td>5</td><td>5</td><td>8</td><td>5</td><td>8</td></tr></table><p>Nina, porteuse du vote maximal, évoque la gestion des accents et des fautes de frappe ; Léa, porteuse du vote minimal, estime le moteur de recherche tout prêt. Après ce débat, l'équipe revote : 8, 8, 8, 8, 8.</p><ol><li>Quel est le vote minimal du premier tour ?</li><li>Quel est le vote maximal du premier tour ?</li><li>Quelle est la moyenne du premier tour (arrondie au dixième) ?</li><li>Y a-t-il eu consensus dès le premier tour ? Répondez par oui ou non.</li><li>Quelle estimation finale, en story points, l'équipe retient-elle après le second tour ?</li><li>L'équipe compare ensuite la story à sa référence « filtrer les résultats », estimée 2 points. Elle juge la recherche plein texte quatre fois plus complexe. Quelle carte retenir ?</li></ol>",
    "starter": "# Exercice — La séance de Planning Poker de l'équipe Pylône\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nombre seul, sauf la question 4 (oui ou non).\n\n[Question 1 — Vote minimal du premier tour]\nA_COMPLETER\n\n[Question 2 — Vote maximal du premier tour]\nA_COMPLETER\n\n[Question 3 — Moyenne du premier tour]\nA_COMPLETER\n\n[Question 4 — Consensus dès le premier tour ?]\nA_COMPLETER\n\n[Question 5 — Estimation finale retenue]\nA_COMPLETER\n\n[Question 6 — Carte pour une complexité quadruple de la référence]\nA_COMPLETER\n",
    "hints": [
      "Le Planning Poker fait voter tout le monde à découvert en même temps : personne ne suit l'avis du voisin.",
      "Un écart entre vote minimal et maximal signe une compréhension différente de la story : c'est le débat, pas la moyenne, qui fait consensus.",
      "1. Relisez les cinq votes et prenez le plus petit. 2. Puis le plus grand. 3. Moyenne = somme / 5. 4. Unanime signifie cinq votes identiques. 5. Le second tour est unanime. 6. Multipliez la référence par le facteur de complexité, puis vérifiez que le résultat tombe sur une carte de la suite."
    ],
    "examples": [
      {
        "stdin": "L'équipe Delta estime « ajouter aux favoris » : premiers votes 3, 3, 5, 5, 8.\n\n1) Vote minimal : 3.\n2) Vote maximal : 8.\n3) Moyenne : 24 / 5 = 4,8.\n4) Écart important : pas de consensus au premier tour.\n5) Après discussion, revote : 5, 5, 5, 5, 5 → 5 points retenus.\n6) La référence « panier » vaut 10 ; les favoris valent la moitié → carte 5.",
        "expected": "min 3 — max 8 — moyenne 4,8 — consensus final : 5 points",
        "note": "Le poker ne moyenne pas les votes : il déclenche un débat, puis un consensus sur une carte de la suite."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Vote minimal du premier tour",
        "stdin": "q:1",
        "expected": "5||5 points"
      },
      {
        "label": "Question 2 — Vote maximal du premier tour",
        "stdin": "q:2",
        "expected": "8||8 points"
      },
      {
        "label": "Question 3 — Moyenne du premier tour",
        "stdin": "q:3",
        "expected": "6,2||6.2"
      },
      {
        "label": "Question 4 — Consensus dès le premier tour ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Estimation finale retenue",
        "stdin": "q:5",
        "expected": "8||8 points"
      },
      {
        "label": "Question 6 — Carte pour une complexité quadruple de la référence",
        "stdin": "q:6",
        "expected": "8||8 points"
      }
    ],
    "solution": "[Question 1 — Vote minimal du premier tour]\n5\n\n[Question 2 — Vote maximal du premier tour]\n8\n\n[Question 3 — Moyenne du premier tour]\n6,2\n\n[Question 4 — Consensus dès le premier tour ?]\nnon\n\n[Question 5 — Estimation finale retenue]\n8\n\n[Question 6 — Carte pour une complexité quadruple de la référence]\n8",
    "takeaway": "1) Vote minimal du premier tour : 5 (Léa, Karim et Paul).\n2) Vote maximal : 8 (Nina et Omar).\n3) Moyenne : (5 + 5 + 8 + 5 + 8) / 5 = 31 / 5 = 6,2.\n4) Non : les votes 5 et 8 coexistent, l'équipe n'est pas unanime.\n5) Le second tour est unanime : 8 story points retenus (et 8 figure bien dans la suite 1, 2, 3, 5, 8, 13, 20, 40).\n6) 2 × 4 = 8 : la carte 8 traduit une complexité quadruple de la référence.\nContrôle : l'estimation retenue (8) est un nombre de la suite de Fibonacci modifiée, jamais la moyenne 6,2."
  },
  {
    "id": "ag3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Les scénarios Gherkin du retrait en magasin de ShopFast",
    "exampleTitle": "Exemple résolu — le scénario de réinitialisation de LinkU",
    "goal": "Lire un scénario Gherkin (Étant donné / Quand / Alors) et vérifier la structure d'un critère d'acceptation en BDD.",
    "brief": "<p><strong>Énoncé.</strong> ShopFast, site de e-commerce, spécifie la story « Retrait en magasin » par le comportement (BDD). Le Product Owner et l'équipe écrivent le scénario Gherkin suivant :</p><p><code>Scénario : Retrait d'une commande payée en ligne<br>Étant donné que le client a payé sa commande en ligne<br>Et que le magasin sélectionné est ouvert<br>Quand le client présente son code de retrait au comptoir<br>Alors la commande est marquée « retirée »<br>Et un e-mail de confirmation est envoyé</code></p><p>Rappel : « Étant donné » pose le contexte initial, « Quand » déclenche l'action, « Alors » constate le résultat observable, et « Et » prolonge la clause qui le précède immédiatement.</p><ol><li>Quel mot-clé pose le contexte initial du scénario ?</li><li>Combien d'étapes compte ce scénario (toutes les lignes qui suivent son titre) ?</li><li>Quel mot-clé introduit l'action qui déclenche le test ?</li><li>La ligne « Et un e-mail de confirmation est envoyé » prolonge quelle clause ?</li><li>Dans le sigle BDD, que signifie le dernier D ? Répondez par le mot anglais.</li><li>Un nouveau scénario commence directement par « Quand le client paie en ligne » sans aucune ligne de contexte : respecte-t-il la structure Gherkin ? Répondez par oui ou non.</li></ol>",
    "starter": "# Exercice — Les scénarios Gherkin du retrait en magasin de ShopFast\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 3 et 4 : le mot-clé exact. Question 6 : oui ou non.\n\n[Question 1 — Mot-clé du contexte initial]\nA_COMPLETER\n\n[Question 2 — Nombre d'étapes du scénario]\nA_COMPLETER\n\n[Question 3 — Mot-clé de l'action déclenchante]\nA_COMPLETER\n\n[Question 4 — Clause prolongée par le second « Et »]\nA_COMPLETER\n\n[Question 5 — Dernier D du sigle BDD]\nA_COMPLETER\n\n[Question 6 — Un scénario sans « Étant donné » est-il valide ?]\nA_COMPLETER\n",
    "hints": [
      "Gherkin se lit comme une phrase : contexte (Étant donné), événement (Quand), conséquence observable (Alors).",
      "Chaque « Et » se rattache à la clause qui le précède immédiatement : relisez la ligne du dessus.",
      "1. Le rappel ci-dessus donne le mot-clé qui ouvre le contexte. 2. Comptez toutes les lignes d'étapes, « Et » compris. 3. Le même rappel donne le mot-clé de l'action déclenchante. 4. Relisez la ligne qui précède immédiatement le second « Et ». 5. Développez le sigle anglais complet. 6. Sans contexte, le système n'a pas d'état de départ : le test n'est pas reproductible."
    ],
    "examples": [
      {
        "stdin": "LinkU, réseau social professionnel, spécifie « réinitialiser le mot de passe » :\nScénario : Réinitialisation\nÉtant donné que le membre est sur la page de connexion\nQuand il clique sur « mot de passe oublié »\nAlors un lien de réinitialisation est envoyé\nEt le lien expire au bout de 24 heures\n\n1) Contexte : « Étant donné ».\n2) Quatre étapes au total.\n3) Action : « Quand ».\n4) « Et le lien expire… » prolonge « Alors ».",
        "expected": "contexte : Étant donné — 4 étapes — action : Quand — le « Et » final prolonge Alors",
        "note": "Chaque « Et » prolonge la clause qui le précède immédiatement : lire le scénario à voix haute suffit à le vérifier."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Mot-clé du contexte initial",
        "stdin": "q:1",
        "expected": "étant donné||etant donne||etant donné||étant donne||given"
      },
      {
        "label": "Question 2 — Nombre d'étapes du scénario",
        "stdin": "q:2",
        "expected": "5||5 étapes||cinq"
      },
      {
        "label": "Question 3 — Mot-clé de l'action déclenchante",
        "stdin": "q:3",
        "expected": "quand||when"
      },
      {
        "label": "Question 4 — Clause prolongée par le second « Et »",
        "stdin": "q:4",
        "expected": "alors||then"
      },
      {
        "label": "Question 5 — Dernier D du sigle BDD",
        "stdin": "q:5",
        "expected": "development||développement||developpement"
      },
      {
        "label": "Question 6 — Un scénario sans « Étant donné » est-il valide ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Mot-clé du contexte initial]\nétant donné\n\n[Question 2 — Nombre d'étapes du scénario]\n5\n\n[Question 3 — Mot-clé de l'action déclenchante]\nquand\n\n[Question 4 — Clause prolongée par le second « Et »]\nalors\n\n[Question 5 — Dernier D du sigle BDD]\ndevelopment\n\n[Question 6 — Un scénario sans « Étant donné » est-il valide ?]\nnon",
    "takeaway": "1) Le contexte initial est posé par « Étant donné ».\n2) Le scénario compte 5 étapes : deux « Étant donné / Et », un « Quand », un « Alors », un « Et ».\n3) L'action déclenchante suit « Quand » : présenter le code de retrait.\n4) Le second « Et » suit « Alors la commande est marquée retirée » : il prolonge « Alors ».\n5) BDD signifie Behavior-Driven Development : le dernier D est Development.\n6) Non : sans « Étant donné », le système n'a pas d'état de départ défini et le test n'est pas reproductible.\nContrôle : la lecture chronologique Étant donné → Quand → Alors se vérifie sur chaque ligne ; les deux « Et » prolongent respectivement le contexte et le résultat."
  }
];
