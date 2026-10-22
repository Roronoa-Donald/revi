/**
 * chapitre5.js — Études de cas du cours « ingenierie-besoin ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ib2-c5-e1",
    chapter: 5,
    level: "n1",
    language: 'analyse',
    title: "Normalisation d’identifiant d’exigence SRS",
    goal: "Standardiser un code d’exigence selon le format IEEE (Domaine-Type-Numéro à 3 chiffres).",
    brief: "<p>Dans une spécification <strong>SRS</strong> (<em>Software Requirements Specification</em>), chaque exigence possède un identifiant unique normé sous la forme <code>&lt;DOM&gt;-&lt;TYPE&gt;-&lt;00N&gt;</code> où le domaine et le type sont en majuscules et le numéro est complété de zéros à gauche sur 3 chiffres (ex. <code>SEC-NFR-007</code>).</p><p>Analyse une ligne au format <code>Domaine;Type;Numero</code> fourni(e) dans les données du cas et affiche :<br><code>EXIGENCE: &lt;DOM&gt;-&lt;TYPE&gt;-&lt;00N&gt;</code>.</p>",
    starter: "# Grille d'analyse (ib2-c5-e1) — Normalisation d’identifiant d’exigence SRS\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : perf;nfr;42\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : billing;fr;120\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : rgpd;con;1\nA_COMPLETER\n",
    hints: [
          "Découpez la ligne avec l’extraction des champs.",
          "Convertissez domaine et type avec .upper().",
          "Formate le numéro avec f\"{int(num):03d}\"."
    ],
    examples: [
          {
                "stdin": "auth;fr;5",
                "expected": "EXIGENCE: AUTH-FR-005",
                "note": "auth devient AUTH, fr devient FR, et 5 devient 005."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "EXIGENCE: PERF-NFR-042"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "EXIGENCE: BILLING-FR-120"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "EXIGENCE: RGPD-CON-001"
          }
    ],
    solution: "[Exemple]\nEXIGENCE: AUTH-FR-005\n\n[Cas 1 — Test 1]\nEXIGENCE: PERF-NFR-042\n\n[Cas 2 — Test 2]\nEXIGENCE: BILLING-FR-120\n\n[Cas 3 — Test 3]\nEXIGENCE: RGPD-CON-001\n"
  },
  {
    id: "ib2-c5-e2",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Audit de matrice de traçabilité (RTM)",
    goal: "Détecter les exigences sans tests de validation ou sans besoin métier dans une matrice RTM.",
    brief: "<p>Une <strong>Matrice de Traçabilité des Exigences</strong> (<em>RTM</em>) relie un <strong>Besoin Métier (BRQ)</strong>, une <strong>Exigence Système (SRQ)</strong> et un <strong>Cas de Test (TC)</strong>.<br>Une liaison est dite <em>non testée</em> si <code>TC == \"AUCUN\"</code>. Une liaison est dite <em>sans besoin</em> si <code>BRQ == \"AUCUN\"</code>.</p><p>À partir des données du cas :<br>- Première ligne : le nombre <code>N</code> de liaisons.<br>- Les <code>N</code> lignes suivantes : <code>BRQ;SRQ;TC</code>.<br>Affiche : <code>TOTAL: &lt;N&gt; | NON_TESTEES: &lt;X&gt; | SANS_BESOIN: &lt;Y&gt;</code>.</p>",
    starter: "# Grille d'analyse (ib2-c5-e2) — Audit de matrice de traçabilité (RTM)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : BRQ-10;SRQ-10;TC-10\n# Données : BRQ-11;SRQ-11;TC-11\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : BRQ-01;SRQ-01;AUCUN\n# Données : AUCUN;SRQ-02;AUCUN\n# Données : BRQ-03;SRQ-03;TC-03\n# Données : AUCUN;SRQ-04;TC-04\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : BRQ-99;SRQ-99;AUCUN\nA_COMPLETER\n",
    hints: [
          "Itère sur les N lignes et incrémente des compteurs si tc.upper() == \"AUCUN\" ou brq.upper() == \"AUCUN\".",
          "Affichez le résumé formaté."
    ],
    examples: [
          {
                "stdin": "3\nBRQ-01;SRQ-01;TC-01\nBRQ-02;SRQ-02;AUCUN\nAUCUN;SRQ-03;TC-03",
                "expected": "TOTAL: 3 | NON_TESTEES: 1 | SANS_BESOIN: 1",
                "note": "SRQ-02 n’a aucun cas de test, SRQ-03 est orpheline de besoin métier."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "TOTAL: 2 | NON_TESTEES: 0 | SANS_BESOIN: 0"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "TOTAL: 4 | NON_TESTEES: 2 | SANS_BESOIN: 2"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "TOTAL: 1 | NON_TESTEES: 1 | SANS_BESOIN: 0"
          }
    ],
    solution: "[Exemple]\nTOTAL: 3 | NON_TESTEES: 1 | SANS_BESOIN: 1\n\n[Cas 1 — Test 1]\nTOTAL: 2 | NON_TESTEES: 0 | SANS_BESOIN: 0\n\n[Cas 2 — Test 2]\nTOTAL: 4 | NON_TESTEES: 2 | SANS_BESOIN: 2\n\n[Cas 3 — Test 3]\nTOTAL: 1 | NON_TESTEES: 1 | SANS_BESOIN: 0\n"
  },
  {
    id: "ib2-c5-e3",
    chapter: 5,
    level: "n3",
    language: 'analyse',
    title: "Parseur de critère d’acceptation Gherkin",
    goal: "Structurer un critère d’acceptation Étant donné / Quand / Alors (Given / When / Then) en objet JSON.",
    brief: "<p>En BDD (<em>Behavior-Driven Development</em>), un scénario de test se décompose en 3 clauses :<br>Ligne 1 : <code>Etant donne &lt;contexte&gt;</code> (ou <code>Étant donné</code>)<br>Ligne 2 : <code>Quand &lt;evenement&gt;</code><br>Ligne 3 : <code>Alors &lt;resultat_attendu&gt;</code></p><p>Analyse 3 lignes fournies dans les données du cas, nettoie la ponctuation finale éventuelle et affiche un dictionnaire JSON strict sur une ligne :<br><code>{\"contexte\": \"...\", \"evenement\": \"...\", \"resultat_attendu\": \"...\"}</code>.<br>Si l’une des clauses ne commence pas par le bon mot-clé, affiche <code>ERREUR: Syntaxe Gherkin non respectee</code>.</p>",
    starter: "# Grille d'analyse (ib2-c5-e3) — Parseur de critère d’acceptation Gherkin\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : Etant donne un panier contenant 2 articles\n# Données : Quand l utilisateur clique sur Commander\n# Données : Alors la page de paiement s affiche\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : Sachant que le serveur tourne\n# Données : Quand une erreur 500 survient\n# Données : Alors une alerte est envoyee\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : Étant donné un mot de passe expire\n# Données : Quand l utilisateur saisit ses identifiants\n# Données : Alors un message invite au renouvellement.\nA_COMPLETER\n",
    hints: [
          "Vérifiez que les lignes commencent respectivement par (etant donne / étant donné), (quand), (alors).",
          "Supprimez le préfixe et le point final éventuel.",
          "Affichez le résultat avec json.dumps(obj, ensure_ascii=False)."
    ],
    examples: [
          {
                "stdin": "Etant donne un utilisateur connecte avec le solde 100€\nQuand il effectue un virement de 40€\nAlors son nouveau solde est de 60€.",
                "expected": "{\"contexte\": \"un utilisateur connecte avec le solde 100€\", \"evenement\": \"il effectue un virement de 40€\", \"resultat_attendu\": \"son nouveau solde est de 60€\"}",
                "note": "Le critère d’acceptation est structuré de façon non ambiguë et prêt pour l’automatisation."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "{\"contexte\": \"un panier contenant 2 articles\", \"evenement\": \"l utilisateur clique sur Commander\", \"resultat_attendu\": \"la page de paiement s affiche\"}"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "ERREUR: Syntaxe Gherkin non respectee"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "{\"contexte\": \"un mot de passe expire\", \"evenement\": \"l utilisateur saisit ses identifiants\", \"resultat_attendu\": \"un message invite au renouvellement\"}"
          }
    ],
    solution: "[Exemple]\n{\"contexte\": \"un utilisateur connecte avec le solde 100€\", \"evenement\": \"il effectue un virement de 40€\", \"resultat_attendu\": \"son nouveau solde est de 60€\"}\n\n[Cas 1 — Test 1]\n{\"contexte\": \"un panier contenant 2 articles\", \"evenement\": \"l utilisateur clique sur Commander\", \"resultat_attendu\": \"la page de paiement s affiche\"}\n\n[Cas 2 — Test 2]\nERREUR: Syntaxe Gherkin non respectee\n\n[Cas 3 — Test 3]\n{\"contexte\": \"un mot de passe expire\", \"evenement\": \"l utilisateur saisit ses identifiants\", \"resultat_attendu\": \"un message invite au renouvellement\"}\n"
  }
];
