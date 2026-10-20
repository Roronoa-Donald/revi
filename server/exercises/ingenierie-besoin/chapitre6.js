/**
 * chapitre6.js — Études de cas du cours « ingenierie-besoin ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ib2-c6-e1",
    chapter: 6,
    level: "n1",
    language: 'analyse',
    title: "Audit qualité INVEST d’une User Story",
    goal: "Vérifier la conformité d’une User Story aux 6 critères INVEST (Indépendante, Négociable, Valeur, Estimable, Small, Testable).",
    brief: "<p>Le modèle <strong>INVEST</strong> évalue la qualité d’une exigence agile selon 6 critères booléens (1 pour conforme, 0 pour non conforme) :<br><code>I</code> (Indépendante), <code>N</code> (Négociable), <code>V</code> (Valeur), <code>E</code> (Estimable), <code>S</code> (Small / Suffisamment petite), <code>T</code> (Testable).</p><p>Lit une ligne au format <code>ID;I;N;V;E;S;T</code> sur l’entrée standard.<br>- Si les 6 critères valent 1 : affiche <code>&lt;ID&gt;: CONFORME_INVEST (6/6)</code>.<br>- Sinon : affiche <code>&lt;ID&gt;: NON_CONFORME (&lt;Score&gt;/6) - Criteres_manquants: &lt;liste des noms manquants séparés par une virgule&gt;</code>.</p>",
    starter: "# Grille d'analyse (ib2-c6-e1) — Audit qualité INVEST d’une User Story\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : US-10;1;0;1;1;0;1\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : US-11;1;1;1;1;1;0\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : US-12;1;1;1;1;1;1\nA_COMPLETER\n",
    hints: [
          "Associe les colonnes aux critères : [\"Independante\", \"Negociable\", \"Valeur\", \"Estimable\", \"Small\", \"Testable\"].",
          "Filtre les critères dont la valeur est \"0\" et compte les \"1\"."
    ],
    examples: [
          {
                "stdin": "US-42;1;1;1;1;1;1",
                "expected": "US-42: CONFORME_INVEST (6/6)",
                "note": "Tous les critères INVEST sont satisfaits, la User Story est prête pour l’engagement en sprint."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "US-10: NON_CONFORME (4/6) - Criteres_manquants: Negociable, Small"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "US-11: NON_CONFORME (5/6) - Criteres_manquants: Testable"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "US-12: CONFORME_INVEST (6/6)"
          }
    ],
    solution: "[Exemple]\nUS-42: CONFORME_INVEST (6/6)\n\n[Cas 1 — Test 1]\nUS-10: NON_CONFORME (4/6) - Criteres_manquants: Negociable, Small\n\n[Cas 2 — Test 2]\nUS-11: NON_CONFORME (5/6) - Criteres_manquants: Testable\n\n[Cas 3 — Test 3]\nUS-12: CONFORME_INVEST (6/6)\n"
  },
  {
    id: "ib2-c6-e2",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Analyse d’impact d’une demande de changement (Change Request)",
    goal: "Calculer la propagation des dépendances pour identifier toutes les exigences impactées par une modification.",
    brief: "<p>Lorsqu’une exigence est modifiée, toutes les exigences qui en dépendent (directement ou transitivement) doivent être réévaluées.</p><p>Lit sur l’entrée standard :<br>- Ligne 1 : l’identifiant de l’exigence initiale modifiée (ex. <code>REQ-1</code>).<br>- Ligne 2 : la liste des dépendances séparées par des virgules au format <code>Source-&gt;Cible</code> (signifiant que <em>Cible dépend de Source</em>).<br>Affiche la liste de toutes les exigences impactées (l’exigence initiale incluse), dédupliquées et triées alphabétiquement :<br><code>EXIGENCES_IMPACTEES: &lt;REQ_A, REQ_B, ...&gt;</code>.</p>",
    starter: "# Grille d'analyse (ib2-c6-e2) — Analyse d’impact d’une demande de changement (Change Request)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : AUTH-1\n# Données : AUTH-1->DASH-1,AUTH-1->API-1,API-1->BILL-1\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : ISOL-1\n# Données : REQ-A->REQ-B,REQ-B->REQ-C\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : CORE-0\n# Données : CORE-0->MOD-1,MOD-1->MOD-2,CORE-0->MOD-3\nA_COMPLETER\n",
    hints: [
          "Construis un graphe de dépendances (dictionnaire d’adjacence : source -> ensemble des cibles).",
          "Utilise un parcours en largeur (BFS) ou profondeur (DFS) à partir du nœud initial.",
          "Trie l’ensemble des nœuds visités."
    ],
    examples: [
          {
                "stdin": "REQ-1\nREQ-1->REQ-2,REQ-2->REQ-3,REQ-4->REQ-5",
                "expected": "EXIGENCES_IMPACTEES: REQ-1, REQ-2, REQ-3",
                "note": "REQ-1 impacte directement REQ-2, qui impacte REQ-3. REQ-4 et REQ-5 ne sont pas touchées."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "EXIGENCES_IMPACTEES: API-1, AUTH-1, BILL-1, DASH-1"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "EXIGENCES_IMPACTEES: ISOL-1"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "EXIGENCES_IMPACTEES: CORE-0, MOD-1, MOD-2, MOD-3"
          }
    ],
    solution: "[Exemple]\nEXIGENCES_IMPACTEES: REQ-1, REQ-2, REQ-3\n\n[Cas 1 — Test 1]\nEXIGENCES_IMPACTEES: API-1, AUTH-1, BILL-1, DASH-1\n\n[Cas 2 — Test 2]\nEXIGENCES_IMPACTEES: ISOL-1\n\n[Cas 3 — Test 3]\nEXIGENCES_IMPACTEES: CORE-0, MOD-1, MOD-2, MOD-3\n"
  },
  {
    id: "ib2-c6-e3",
    chapter: 6,
    level: "n3",
    language: 'analyse',
    title: "Audit de versionnement d’une Baseline d’exigences",
    goal: "Comparer deux états figés (Baselines) d’un référentiel pour chiffrer les ajouts, modifications et suppressions.",
    brief: "<p>Une <strong>Baseline</strong> fige l’ensemble des exigences validées à un jalon clé du projet. Chaque exigence est identifiée par <code>ID:Empreinte</code> (où l’empreinte résume son contenu textuel).<br>Ligne 1 : Baseline V1 (ex. <code>REQ-1:a1,REQ-2:b2,REQ-3:c3</code>)<br>Ligne 2 : Baseline V2 (ex. <code>REQ-1:a1,REQ-2:mod,REQ-4:d4</code>)</p><p>Affiche le bilan du comparatif selon le format strict :<br><code>AJOUTS: &lt;A&gt; | MODIFICATIONS: &lt;M&gt; | SUPPRESSIONS: &lt;S&gt; | INCHANGEES: &lt;I&gt;</code>.</p>",
    starter: "# Grille d'analyse (ib2-c6-e3) — Audit de versionnement d’une Baseline d’exigences\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : A:1,B:2\n# Données : A:1,B:2\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : A:1,B:2,C:3\n# Données : A:1,B:22,D:4,E:5\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : X:10\n# Données : Y:20\nA_COMPLETER\n",
    hints: [
          "Parse chaque ligne dans un dictionnaire {ID: Empreinte}.",
          "Compare les ensembles d’identifiants pour trouver les ajouts (présents dans V2, absents de V1) et les suppressions (présents dans V1, absents de V2).",
          "Pour les ID communs, compare les empreintes pour distinguer modifications et inchangées."
    ],
    examples: [
          {
                "stdin": "REQ-1:a1,REQ-2:b2,REQ-3:c3\nREQ-1:a1,REQ-2:mod,REQ-4:d4",
                "expected": "AJOUTS: 1 | MODIFICATIONS: 1 | SUPPRESSIONS: 1 | INCHANGEES: 1",
                "note": "REQ-4 est ajoutée, REQ-2 est modifiée (empreinte différente), REQ-3 est supprimée, REQ-1 est inchangée."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "AJOUTS: 0 | MODIFICATIONS: 0 | SUPPRESSIONS: 0 | INCHANGEES: 2"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "AJOUTS: 2 | MODIFICATIONS: 1 | SUPPRESSIONS: 1 | INCHANGEES: 1"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "AJOUTS: 1 | MODIFICATIONS: 0 | SUPPRESSIONS: 1 | INCHANGEES: 0"
          }
    ],
    solution: "[Exemple]\nAJOUTS: 1 | MODIFICATIONS: 1 | SUPPRESSIONS: 1 | INCHANGEES: 1\n\n[Cas 1 — Test 1]\nAJOUTS: 0 | MODIFICATIONS: 0 | SUPPRESSIONS: 0 | INCHANGEES: 2\n\n[Cas 2 — Test 2]\nAJOUTS: 2 | MODIFICATIONS: 1 | SUPPRESSIONS: 1 | INCHANGEES: 1\n\n[Cas 3 — Test 3]\nAJOUTS: 1 | MODIFICATIONS: 0 | SUPPRESSIONS: 1 | INCHANGEES: 0\n"
  }
];
