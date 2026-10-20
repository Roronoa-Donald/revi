/**
 * chapitre4.js — Études de cas du cours « b3-agile ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ag3-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "Validateur syntaxique de User Story et conformité INVEST",
    goal: "Vérifier la structure narrative formelle d’une User Story (En tant que, Je veux, Afin de) et la présence de critères d’acceptation.",
    brief: "<p>Une User Story bien formée suit le canevas de Mike Cohn : <em>« En tant que [persona], je veux [action], afin de [bénéfice métier] »</em>, complétée par des critères d'acceptation (Testable selon l'acronyme <strong>INVEST</strong>).<br><br>\nPour chaque cas d’application des définitions de stories au format :<br>\n<code>STORY_DEF id=&lt;nom&gt; persona=&lt;texte&gt; action=&lt;texte&gt; benefit=&lt;texte&gt; ac_count=&lt;int&gt;</code>.<br><br>\nRègles de validation :<br>\n1. <code>persona</code> ne doit pas valoir <code>NONE</code> ou être vide.<br>\n2. <code>action</code> ne doit pas valoir <code>NONE</code> ou être vide.<br>\n3. <code>benefit</code> ne doit pas valoir <code>NONE</code> ou être vide.<br>\n4. Le nombre de critères d'acceptation (<code>ac_count</code>) doit être supérieur ou égal à 1 (garantissant la testabilité).<br><br>\nSi toutes les conditions sont remplies : <code>status=VALID_STORY flaw=NONE</code>.<br>\nSinon : <code>status=INVALID_STORY</code> avec le premier défaut rencontré parmi : <code>MISSING_PERSONA</code>, <code>MISSING_ACTION</code>, <code>MISSING_BENEFIT</code>, <code>UNTESTABLE_ZERO_AC</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>STORY_AUDIT id={id} status={status} flaw={flaw}</code></p>",
    starter: "# Grille d'analyse (ag3-c4-e1) — Validateur syntaxique de User Story et conformité INVEST\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Persona manquant ou non spécifié]\n# Données : STORY_DEF id=US-2 persona=NONE action=Exporter_PDF benefit=Archiver ac_count=2\nA_COMPLETER\n\n[Cas 2 — Aucun critère d’acceptation (non testable)]\n# Données : STORY_DEF id=US-3 persona=Admin action=Supprimer_compte benefit=Nettoyer_base ac_count=0\nA_COMPLETER\n\n[Cas 3 — Bénéfice métier absent]\n# Données : STORY_DEF id=US-4 persona=Acheteur action=Filtrer_prix benefit=NONE ac_count=1\nA_COMPLETER\n",
    hints: [
          "Tester dans l’ordre : persona == \"NONE\" ou vide, action == \"NONE\", benefit == \"NONE\", puis ac_count < 1.",
          "Afficher VALID_STORY si aucune erreur n’a été détectée."
    ],
    examples: [
          {
                "stdin": "STORY_DEF id=US-1 persona=Client action=Payer_en_1_clic benefit=Gagner_du_temps ac_count=3",
                "expected": "STORY_AUDIT id=US-1 status=VALID_STORY flaw=NONE",
                "note": "User story complète avec 3 critères d’acceptation : valide."
          }
    ],
    tests: [
          {
                "label": "Persona manquant ou non spécifié",
                "stdin": "cas:1",
                "expected": "STORY_AUDIT id=US-2 status=INVALID_STORY flaw=MISSING_PERSONA"
          },
          {
                "label": "Aucun critère d’acceptation (non testable)",
                "stdin": "cas:2",
                "expected": "STORY_AUDIT id=US-3 status=INVALID_STORY flaw=UNTESTABLE_ZERO_AC"
          },
          {
                "label": "Bénéfice métier absent",
                "stdin": "cas:3",
                "expected": "STORY_AUDIT id=US-4 status=INVALID_STORY flaw=MISSING_BENEFIT"
          }
    ],
    solution: "[Exemple]\nSTORY_AUDIT id=US-1 status=VALID_STORY flaw=NONE\n\n[Cas 1 — Persona manquant ou non spécifié]\nSTORY_AUDIT id=US-2 status=INVALID_STORY flaw=MISSING_PERSONA\n\n[Cas 2 — Aucun critère d’acceptation (non testable)]\nSTORY_AUDIT id=US-3 status=INVALID_STORY flaw=UNTESTABLE_ZERO_AC\n\n[Cas 3 — Bénéfice métier absent]\nSTORY_AUDIT id=US-4 status=INVALID_STORY flaw=MISSING_BENEFIT\n"
  },
  {
    id: "ag3-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Consensus de Planning Poker et Suite de Fibonacci Modifiée",
    goal: "Analyser un tour de vote de Planning Poker, détecter la divergence et projeter l’estimation sur la suite de Fibonacci.",
    brief: "<p>Lors d'une session de <strong>Planning Poker</strong>, l'équipe estime l'effort relatif en Story Points selon la suite de Fibonacci modifiée standard : <code>[1, 2, 3, 5, 8, 13, 20, 40]</code>.<br><br>\nPour chaque cas d’application des tours de vote au format :<br>\n<code>POKER_VOTE id=&lt;nom&gt; votes=&lt;v1,v2,v3,...&gt;</code>.<br><br>\nRègles d'évaluation :<br>\n- <code>min_v = min(votes)</code>, <code>max_v = max(votes)</code>, <code>avg_v = sum(votes) / len(votes)</code>.<br>\n- Si l'écart relatif <code>max_v - min_v &gt;= 8</code> ou si le ratio <code>max_v / min_v &gt;= 3.0</code> :<br>\n  Le consensus est impossible sans débat : <code>decision=DEBATE_REQUIRED estimate=NONE</code>.<br>\n- Sinon : consensus obtenu. L'estimation retenue est la valeur de Fibonacci <strong>la plus proche</strong> de <code>avg_v</code> (en cas d'équidistance parfaite, choisir la valeur supérieure).<br>\n  <code>decision=CONSENSUS estimate={fib_valeur}</code>.<br><br>\nPour chaque vote, afficher :<br>\n<code>POKER_RESULT id={id} min={min_v} max={max_v} avg={avg_rounded} decision={decision} estimate={estimate}</code><br>\n(avec <code>avg_rounded = round(avg_v, 1)</code>).</p>",
    starter: "# Grille d'analyse (ag3-c4-e2) — Consensus de Planning Poker et Suite de Fibonacci Modifiée\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Forte divergence imposant un débat entre développeurs]\n# Données : POKER_VOTE id=US-ARCHI votes=2,3,5,13\nA_COMPLETER\n\n[Cas 2 — Consensus unanime sur une tâche de 8 points]\n# Données : POKER_VOTE id=US-REPORT votes=8,8,8,8\nA_COMPLETER\n\n[Cas 3 — Vote serré entre 1 et 2 points]\n# Données : POKER_VOTE id=US-FIX votes=1,1,2,2\nA_COMPLETER\n",
    hints: [
          "Convertir la chaîne de votes en liste d’entiers.",
          "Tester la condition de débat : (max_v - min_v >= 8) ou (max_v / min_v >= 3.0).",
          "Pour trouver le nombre de Fibonacci le plus proche, minimiser abs(f - avg_v)."
    ],
    examples: [
          {
                "stdin": "POKER_VOTE id=US-SEARCH votes=3,3,5,5,5",
                "expected": "POKER_RESULT id=US-SEARCH min=3 max=5 avg=4.2 decision=CONSENSUS estimate=5",
                "note": "Écart faible (5 - 3 = 2), moyenne 4.2 proche de 5 : consensus validé."
          }
    ],
    tests: [
          {
                "label": "Forte divergence imposant un débat entre développeurs",
                "stdin": "cas:1",
                "expected": "POKER_RESULT id=US-ARCHI min=2 max=13 avg=5.8 decision=DEBATE_REQUIRED estimate=NONE"
          },
          {
                "label": "Consensus unanime sur une tâche de 8 points",
                "stdin": "cas:2",
                "expected": "POKER_RESULT id=US-REPORT min=8 max=8 avg=8.0 decision=CONSENSUS estimate=8"
          },
          {
                "label": "Vote serré entre 1 et 2 points",
                "stdin": "cas:3",
                "expected": "POKER_RESULT id=US-FIX min=1 max=2 avg=1.5 decision=CONSENSUS estimate=2"
          }
    ],
    solution: "[Exemple]\nPOKER_RESULT id=US-SEARCH min=3 max=5 avg=4.2 decision=CONSENSUS estimate=5\n\n[Cas 1 — Forte divergence imposant un débat entre développeurs]\nPOKER_RESULT id=US-ARCHI min=2 max=13 avg=5.8 decision=DEBATE_REQUIRED estimate=NONE\n\n[Cas 2 — Consensus unanime sur une tâche de 8 points]\nPOKER_RESULT id=US-REPORT min=8 max=8 avg=8.0 decision=CONSENSUS estimate=8\n\n[Cas 3 — Vote serré entre 1 et 2 points]\nPOKER_RESULT id=US-FIX min=1 max=2 avg=1.5 decision=CONSENSUS estimate=2\n"
  },
  {
    id: "ag3-c4-e3",
    chapter: 4,
    level: "n3",
    language: 'analyse',
    title: "Parseur de Scénarios Gherkin / BDD (Given - When - Then)",
    goal: "Valider la structure séquentielle d’un scénario de comportement Gherkin (Étant donné, Quand, Alors).",
    brief: "<p>Dans le développement guidé par le comportement (<strong>Behavior-Driven Development - BDD</strong>), les critères d'acceptation sont formalisés sous la syntaxe Gherkin :<br>\n- <code>GIVEN</code> (Contexte initial)<br>\n- <code>WHEN</code> (Action déclenchante)<br>\n- <code>THEN</code> (Résultat observable attendu)<br>\n- <code>AND</code> (Extension d'une clause précédente).<br><br>\nRègles de conformité séquentielle :<br>\n1. Un scénario valide doit comporter <strong>au moins un GIVEN, au moins un WHEN, et au moins un THEN</strong>.<br>\n2. La séquence doit respecter l'ordre chronologique : aucun <code>WHEN</code> ne peut apparaître avant le premier <code>GIVEN</code>, et aucun <code>THEN</code> ne peut apparaître avant le premier <code>WHEN</code>.<br>\n3. Un mot-clé <code>AND</code> ne peut jamais être la toute première directive d'un scénario.<br><br>\nPour chaque cas d’application des scénarios au format :<br>\n<code>SCENARIO id=&lt;nom&gt; steps=&lt;STEP1,STEP2,STEP3,...&gt;</code>.<br><br>\nPour chaque scénario, afficher :<br>\n<code>GHERKIN_AUDIT id={id} total_steps={count} status={VALID_BDD|INVALID_SEQUENCE}</code></p>",
    starter: "# Grille d'analyse (ag3-c4-e3) — Parseur de Scénarios Gherkin / BDD (Given - When - Then)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — WHEN avant tout GIVEN (séquence invalide)]\n# Données : SCENARIO id=NO_CONTEXT steps=WHEN,THEN\nA_COMPLETER\n\n[Cas 2 — AND placé en première position]\n# Données : SCENARIO id=LEADING_AND steps=AND,GIVEN,WHEN,THEN\nA_COMPLETER\n\n[Cas 3 — GIVEN réintroduit après une étape THEN (retour en arrière interdit)]\n# Données : SCENARIO id=LOOPING steps=GIVEN,WHEN,THEN,GIVEN\nA_COMPLETER\n",
    hints: [
          "Suivre l’état courant : avant_given, dans_given, dans_when, dans_then.",
          "S’assurer que l’on ne revient pas en arrière (ex: pas de GIVEN après WHEN ou THEN)."
    ],
    examples: [
          {
                "stdin": "SCENARIO id=LOGIN_SUCCESS steps=GIVEN,AND,WHEN,THEN",
                "expected": "GHERKIN_AUDIT id=LOGIN_SUCCESS total_steps=4 status=VALID_BDD",
                "note": "GIVEN suivi de AND, puis WHEN, puis THEN : séquence parfaitement conforme."
          }
    ],
    tests: [
          {
                "label": "WHEN avant tout GIVEN (séquence invalide)",
                "stdin": "cas:1",
                "expected": "GHERKIN_AUDIT id=NO_CONTEXT total_steps=2 status=INVALID_SEQUENCE"
          },
          {
                "label": "AND placé en première position",
                "stdin": "cas:2",
                "expected": "GHERKIN_AUDIT id=LEADING_AND total_steps=4 status=INVALID_SEQUENCE"
          },
          {
                "label": "GIVEN réintroduit après une étape THEN (retour en arrière interdit)",
                "stdin": "cas:3",
                "expected": "GHERKIN_AUDIT id=LOOPING total_steps=4 status=INVALID_SEQUENCE"
          }
    ],
    solution: "[Exemple]\nGHERKIN_AUDIT id=LOGIN_SUCCESS total_steps=4 status=VALID_BDD\n\n[Cas 1 — WHEN avant tout GIVEN (séquence invalide)]\nGHERKIN_AUDIT id=NO_CONTEXT total_steps=2 status=INVALID_SEQUENCE\n\n[Cas 2 — AND placé en première position]\nGHERKIN_AUDIT id=LEADING_AND total_steps=4 status=INVALID_SEQUENCE\n\n[Cas 3 — GIVEN réintroduit après une étape THEN (retour en arrière interdit)]\nGHERKIN_AUDIT id=LOOPING total_steps=4 status=INVALID_SEQUENCE\n"
  }
];
