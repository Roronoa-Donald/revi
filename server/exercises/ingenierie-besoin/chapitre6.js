/**
 * chapitre6.js — Études de cas du cours « ingenierie-besoin ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ib2-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "INVEST : deux user stories d'EcoRide passées au crible",
    "exampleTitle": "Exemple résolu — les stories de la médiathèque de Rivage",
    "goal": "Évaluer des user stories avec la grille INVEST et repérer les critères non satisfaits.",
    "brief": "<p><strong>Énoncé.</strong> L'équipe Scrum du projet EcoRide audite deux user stories de son backlog avec la grille <strong>INVEST</strong>. Chaque critère reçoit le verdict « conforme » ou « à revoir » :</p><ul><li><strong>US-21</strong> : « En tant que salarié, je veux saisir mon trajet quotidien, afin de trouver plus vite des covoitureurs. »</li><li><strong>US-22</strong> : « Refonte complète du module de réservation avec toutes les options possibles. »</li></ul><p>Le verdict de l'équipe :</p><table><tr><th>Critère INVEST</th><th>US-21</th><th>US-22</th></tr><tr><th>Indépendante</th><td>conforme</td><td>conforme</td></tr><tr><th>Négociable</th><td>conforme</td><td>à revoir (imposée par la direction, sans discussion possible)</td></tr><tr><th>Valeur</th><td>conforme</td><td>conforme</td></tr><tr><th>Estimable</th><td>conforme</td><td>à revoir (aucune donnée pour estimer)</td></tr><tr><th>Small</th><td>conforme</td><td>à revoir (une refonte complète ne tient pas dans un sprint)</td></tr><tr><th>Testable</th><td>conforme</td><td>à revoir (aucun critère d'acceptation)</td></tr></table><p>Pour les questions 3 et 4, répondez par la seule lettre du sigle INVEST.</p><ol><li>Quel est le score INVEST de la US-21, sur 6 ?</li><li>Quel est le score INVEST de la US-22, sur 6 ?</li><li>Quelle lettre de la grille vérifie que la story est suffisamment petite pour tenir dans un sprint ?</li><li>Quelle lettre de la grille exige des critères d'acceptation vérifiables ?</li><li>Que signifie la lettre N de INVEST ?</li></ol>",
    "starter": "# Exercice — INVEST : deux user stories d'EcoRide passées au crible\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : le score sur 6. Questions 3 et 4 : la seule lettre. Question 5 : le mot.\n\n[Question 1 — Score INVEST de la US-21]\nA_COMPLETER\n\n[Question 2 — Score INVEST de la US-22]\nA_COMPLETER\n\n[Question 3 — Lettre qui vérifie la taille de la story]\nA_COMPLETER\n\n[Question 4 — Lettre qui exige des critères d'acceptation]\nA_COMPLETER\n\n[Question 5 — Signification de la lettre N]\nA_COMPLETER\n",
    "hints": [
      "INVEST signifie : Indépendante, Négociable, Valeur, Estimable, Small (suffisamment petite), Testable ; le score d'une story est le nombre de critères « conforme ».",
      "Pour la US-22, quatre critères sont à revoir : Négociable, Estimable, Small et Testable ; seuls Indépendante et Valeur restent conformes.",
      "1. US-21 : six verdicts conformes, score 6 sur 6. 2. US-22 : seuls Indépendante et Valeur sont conformes, score 2 sur 6. 3. La taille, c'est le S de Small. 4. La testabilité, c'est le T. 5. Le N signifie Négociable."
    ],
    "examples": [
      {
        "stdin": "La médiathèque de Rivage audite une story :\n« En tant qu'adhérent, je veux être notifié de la disponibilité d'un livre, afin de le réserver avant les autres. »\nVerdicts : Indépendante conforme, Négociable conforme, Valeur conforme, Estimable conforme, Small conforme, Testable à revoir (aucun délai de notification fixé).\n\n1) Score : 5 sur 6.\n2) Le seul critère à revoir est Testable : il manque un délai mesurable, par exemple « sous 5 minutes ».",
        "expected": "score 5/6 — seul critère à revoir : Testable",
        "note": "Une story presque conforme reste impropre à l'engagement en sprint : chaque critère INVEST manquant se paie pendant le développement."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Score INVEST de la US-21",
        "stdin": "q:1",
        "expected": "6||6 sur 6||six"
      },
      {
        "label": "Question 2 — Score INVEST de la US-22",
        "stdin": "q:2",
        "expected": "2||2 sur 6||deux"
      },
      {
        "label": "Question 3 — Lettre qui vérifie la taille de la story",
        "stdin": "q:3",
        "expected": "S||small||Small"
      },
      {
        "label": "Question 4 — Lettre qui exige des critères d'acceptation",
        "stdin": "q:4",
        "expected": "T||testable||Testable"
      },
      {
        "label": "Question 5 — Signification de la lettre N",
        "stdin": "q:5",
        "expected": "Négociable||négociable||negociable"
      }
    ],
    "solution": "[Question 1 — Score INVEST de la US-21]\n6\n\n[Question 2 — Score INVEST de la US-22]\n2\n\n[Question 3 — Lettre qui vérifie la taille de la story]\nS\n\n[Question 4 — Lettre qui exige des critères d'acceptation]\nT\n\n[Question 5 — Signification de la lettre N]\nNégociable",
    "takeaway": "1) La US-21 obtient 6 sur 6 : tous ses critères sont conformes.\n2) La US-22 n'est conforme que sur Indépendante et Valeur : son score est 2 sur 6.\n3) La lettre S (Small) vérifie que la story est suffisamment petite pour tenir dans un sprint.\n4) La lettre T (Testable) exige des critères d'acceptation vérifiables.\n5) La lettre N signifie Négociable : une story imposée sans discussion n'est pas négociable.\nContrôle : 6 critères évalués par story ; la US-22 cumule 4 critères à revoir (N, E, S, T) et 2 conformes (I, V)."
  },
  {
    "id": "ib2-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Analyse d'impact : la demande de changement d'EcoRide",
    "exampleTitle": "Exemple résolu — la demande de changement du logiciel de paie de Cotono",
    "goal": "Propager une modification d'exigence le long du graphe des dépendances pour identifier toutes les exigences impactées.",
    "brief": "<p><strong>Énoncé.</strong> La directrice des systèmes d'information de Novaterra demande de modifier l'exigence <strong>AUTH-1</strong> (authentification unique d'EcoRide). Avant d'accepter cette demande de changement, l'analyste dresse la liste des dépendances entre exigences, au format « source vers cible », où <strong>la cible dépend de la source</strong> :</p><table><tr><th>Dépendance</th><th>Lecture</th></tr><tr><th>AUTH-1 vers DASH-1</th><td>le tableau de bord DASH-1 dépend de l'authentification</td></tr><tr><th>AUTH-1 vers API-1</th><td>l'interface API-1 dépend de l'authentification</td></tr><tr><th>API-1 vers BILL-1</th><td>la facturation BILL-1 dépend de l'interface API-1</td></tr><tr><th>BILL-1 vers REP-1</th><td>le reporting REP-1 dépend de la facturation</td></tr><tr><th>DASH-1 vers REP-2</th><td>le reporting REP-2 dépend du tableau de bord</td></tr><tr><th>LOG-1 vers AUTH-1</th><td>l'authentification AUTH-1 dépend de la journalisation LOG-1</td></tr></table><p>Une exigence est impactée si elle est modifiée elle-même ou si elle dépend, directement ou indirectement, d'une exigence modifiée.</p><p>Pour les questions 3 et 4, répondez par oui ou non.</p><ol><li>Combien d'exigences sont impactées au total, AUTH-1 comprise ?</li><li>Combien d'exigences dépendent directement d'AUTH-1 ?</li><li>BILL-1 est-elle impactée par la modification ?</li><li>LOG-1 est-elle impactée par la modification ?</li><li>Quel comité, désigné par le sigle anglais CCB, statue sur cette demande de changement ? Donnez le sigle.</li></ol>",
    "starter": "# Exercice — Analyse d'impact : la demande de changement d'EcoRide\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 3 et 4 : oui ou non. Question 5 : le sigle (par exemple CCB).\n\n[Question 1 — Nombre total d'exigences impactées, AUTH-1 comprise]\nA_COMPLETER\n\n[Question 2 — Exigences dépendant directement d'AUTH-1]\nA_COMPLETER\n\n[Question 3 — BILL-1 est-elle impactée ?]\nA_COMPLETER\n\n[Question 4 — LOG-1 est-elle impactée ?]\nA_COMPLETER\n\n[Question 5 — Sigle du comité qui statue sur la demande]\nA_COMPLETER\n",
    "hints": [
      "Les dépendances se propagent de la source vers la cible : modifier AUTH-1 touche tout ce qui en dépend, puis tout ce qui dépend des dépendances.",
      "Attention au sens de chaque flèche : seule la cible subit la source. La ligne LOG-1 vers AUTH-1 place AUTH-1 du côté cible : modifier AUTH-1 ne remonte pas vers LOG-1.",
      "1. Partez d'AUTH-1 : DASH-1 et API-1 en dépendent directement. 2. De API-1 découle BILL-1, puis REP-1 ; de DASH-1 découle REP-2. 3. Comptez l'ensemble : AUTH-1, DASH-1, API-1, BILL-1, REP-1, REP-2. 4. LOG-1 n'apparaît jamais comme cible d'une chaîne partant d'AUTH-1 : elle est épargnée. 5. Le comité s'appelle la CCB."
    ],
    "examples": [
      {
        "stdin": "Le logiciel de paie de Cotono reçoit une demande de modification de PAIE-1.\nDépendances (la cible dépend de la source) :\nPAIE-1 vers BUL-1 ; PAIE-1 vers COMPTA-1 ; BUL-1 vers ARCH-1 ;\nRH-1 vers PAIE-1.\n\n1) Impact total : PAIE-1 (modifiée), BUL-1, COMPTA-1 (dépendances directes) et ARCH-1 (via BUL-1), soit 4 exigences.\n2) Deux exigences dépendent directement de PAIE-1 : BUL-1 et COMPTA-1.\n3) RH-1 n'est pas impactée : la ligne RH-1 vers PAIE-1 en fait une source, et une modification ne remonte jamais vers ses sources.",
        "expected": "4 exigences impactées — 2 dépendances directes — RH-1 épargnée",
        "note": "L'analyse d'impact suit le sens des flèches depuis l'exigence modifiée : jamais en sens inverse."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre total d'exigences impactées, AUTH-1 comprise",
        "stdin": "q:1",
        "expected": "6||six"
      },
      {
        "label": "Question 2 — Exigences dépendant directement d'AUTH-1",
        "stdin": "q:2",
        "expected": "2||deux"
      },
      {
        "label": "Question 3 — BILL-1 est-elle impactée ?",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — LOG-1 est-elle impactée ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Sigle du comité qui statue sur la demande",
        "stdin": "q:5",
        "expected": "CCB||la CCB||Change Control Board||ccb"
      }
    ],
    "solution": "[Question 1 — Nombre total d'exigences impactées, AUTH-1 comprise]\n6\n\n[Question 2 — Exigences dépendant directement d'AUTH-1]\n2\n\n[Question 3 — BILL-1 est-elle impactée ?]\noui\n\n[Question 4 — LOG-1 est-elle impactée ?]\nnon\n\n[Question 5 — Sigle du comité qui statue sur la demande]\nCCB",
    "takeaway": "1) Sont impactées : AUTH-1 (modifiée), DASH-1 et API-1 (dépendances directes), BILL-1 (via API-1), REP-1 (via BILL-1) et REP-2 (via DASH-1) : 6 exigences au total.\n2) Deux exigences dépendent directement d'AUTH-1 : DASH-1 et API-1.\n3) Oui, BILL-1 est impactée : elle dépend d'API-1, qui dépend d'AUTH-1 (propagation indirecte).\n4) Non, LOG-1 n'est pas impactée : la dépendance LOG-1 vers AUTH-1 fait de LOG-1 une source ; sa modification toucherait AUTH-1, mais l'inverse ne la touche pas.\n5) La demande est arbitrée par la CCB (Change Control Board), le comité de contrôle des changements.\nContrôle : 1 exigence modifiée + 2 dépendances directes + 3 dépendances indirectes = 6 exigences impactées."
  },
  {
    "id": "ib2-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Baseline V1.1 : le comparatif des référentiels d'EcoRide",
    "exampleTitle": "Exemple résolu — les baselines du logiciel de paie de Cotono",
    "goal": "Comparer deux baselines d'exigences pour chiffrer ajouts, modifications, suppressions et exigences inchangées.",
    "brief": "<p><strong>Énoncé.</strong> Au jalon de fin de recette de la version 1.0 d'EcoRide, l'équipe fige une nouvelle <strong>baseline</strong> du référentiel d'exigences : un instantané complet et nommé, qui servira de référence. Chaque exigence y est identifiée par son code et une empreinte qui résume son contenu. La baseline V1.0 (validée au cadrage) et la baseline V1.1 (fin de recette) se comparent ainsi :</p><table><tr><th>Baseline</th><th>Exigences (code : empreinte)</th></tr><tr><th>V1.0</th><td>REQ-1 : a1 ; REQ-2 : b2 ; REQ-3 : c3 ; REQ-4 : d4</td></tr><tr><th>V1.1</th><td>REQ-1 : a1 ; REQ-2 : b9 ; REQ-4 : d4 ; REQ-5 : e5</td></tr></table><p>Règles de comparaison :</p><ul><li>un <strong>ajout</strong> est un code présent en V1.1 et absent de V1.0 ;</li><li>une <strong>suppression</strong> est un code présent en V1.0 et absent de V1.1 ;</li><li>une <strong>modification</strong> est un code présent dans les deux baselines avec des empreintes différentes ;</li><li>une exigence est <strong>inchangée</strong> si son code et son empreinte sont identiques dans les deux baselines.</li></ul><ol><li>Combien d'exigences ont été ajoutées entre V1.0 et V1.1 ?</li><li>Combien d'exigences ont été modifiées ?</li><li>Combien d'exigences ont été supprimées ?</li><li>Combien d'exigences sont inchangées ?</li><li>Quel est le code de l'exigence ajoutée ?</li><li>Quel est le code de l'exigence supprimée ?</li></ol>",
    "starter": "# Exercice — Baseline V1.1 : le comparatif des référentiels d'EcoRide\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul. Questions 5 et 6 : le code (par exemple REQ-1).\n\n[Question 1 — Nombre d'ajouts]\nA_COMPLETER\n\n[Question 2 — Nombre de modifications]\nA_COMPLETER\n\n[Question 3 — Nombre de suppressions]\nA_COMPLETER\n\n[Question 4 — Nombre d'exigences inchangées]\nA_COMPLETER\n\n[Question 5 — Code de l'exigence ajoutée]\nA_COMPLETER\n\n[Question 6 — Code de l'exigence supprimée]\nA_COMPLETER\n",
    "hints": [
      "Une baseline est une photographie figée du référentiel : on compare deux photographies code par code, puis empreinte par empreinte.",
      "Commencez par les codes présents d'un seul côté (ajouts et suppressions), puis comparez les empreintes des codes présents des deux côtés (modifications et inchangées).",
      "1. Codes de V1.1 absents de V1.0 : REQ-5. 2. Codes communs avec empreintes différentes : REQ-2 (b2 contre b9). 3. Codes de V1.0 absents de V1.1 : REQ-3. 4. Codes communs à empreintes identiques : REQ-1 et REQ-4. 5. et 6. reprennent les conclusions des points 1 et 3."
    ],
    "examples": [
      {
        "stdin": "Le logiciel de paie de Cotono compare deux baselines :\nV1. P-1 : x1 ; P-2 : x2 ; P-3 : x3\nV2. P-1 : x1 ; P-3 : x9 ; P-4 : x4 ; P-5 : x5\n\n1) Ajouts : P-4 et P-5, soit 2.\n2) Modifications : P-3 (x3 contre x9), soit 1.\n3) Suppressions : P-2, soit 1.\n4) Inchangées : P-1, soit 1.",
        "expected": "2 ajouts — 1 modification — 1 suppression — 1 inchangée",
        "note": "Le bilan d'une baseline se lit toujours dans le même ordre : ajouts, modifications, suppressions, inchangées ; leur somme redonne la taille des référentiels comparés."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'ajouts",
        "stdin": "q:1",
        "expected": "1||un"
      },
      {
        "label": "Question 2 — Nombre de modifications",
        "stdin": "q:2",
        "expected": "1||un"
      },
      {
        "label": "Question 3 — Nombre de suppressions",
        "stdin": "q:3",
        "expected": "1||un"
      },
      {
        "label": "Question 4 — Nombre d'exigences inchangées",
        "stdin": "q:4",
        "expected": "2||deux"
      },
      {
        "label": "Question 5 — Code de l'exigence ajoutée",
        "stdin": "q:5",
        "expected": "REQ-5||req-5"
      },
      {
        "label": "Question 6 — Code de l'exigence supprimée",
        "stdin": "q:6",
        "expected": "REQ-3||req-3"
      }
    ],
    "solution": "[Question 1 — Nombre d'ajouts]\n1\n\n[Question 2 — Nombre de modifications]\n1\n\n[Question 3 — Nombre de suppressions]\n1\n\n[Question 4 — Nombre d'exigences inchangées]\n2\n\n[Question 5 — Code de l'exigence ajoutée]\nREQ-5\n\n[Question 6 — Code de l'exigence supprimée]\nREQ-3",
    "takeaway": "1) Un seul ajout : REQ-5, présent en V1.1 et absent de V1.0.\n2) Une seule modification : REQ-2, présente dans les deux baselines avec des empreintes différentes (b2 puis b9).\n3) Une seule suppression : REQ-3, présent en V1.0 et absent de V1.1.\n4) Deux exigences inchangées : REQ-1 et REQ-4, mêmes codes et mêmes empreintes dans les deux baselines.\n5) L'exigence ajoutée est REQ-5.\n6) L'exigence supprimée est REQ-3.\nContrôle : V1.0 compte 4 exigences = 2 inchangées + 1 modifiée + 1 supprimée ; V1.1 compte aussi 4 exigences = 2 inchangées + 1 modifiée + 1 ajoutée."
  }
];
