/**
 * Exercices du chapitre 5 — Ingénierie du besoin B2.
 */
'use strict';

module.exports = [
  {
    "id": "ib2-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "python",
    "title": "Normalisation d’identifiant d’exigence SRS",
    "goal": "Standardiser un code d’exigence selon le format IEEE (Domaine-Type-Numéro à 3 chiffres).",
    "brief": "<p>Dans une spécification <strong>SRS</strong> (<em>Software Requirements Specification</em>), chaque exigence possède un identifiant unique normé sous la forme <code>&lt;DOM&gt;-&lt;TYPE&gt;-&lt;00N&gt;</code> où le domaine et le type sont en majuscules et le numéro est complété de zéros à gauche sur 3 chiffres (ex. <code>SEC-NFR-007</code>).</p><p>Lit une ligne au format <code>Domaine;Type;Numero</code> sur l’entrée standard et affiche :<br><code>EXIGENCE: &lt;DOM&gt;-&lt;TYPE&gt;-&lt;00N&gt;</code>.</p>",
    "starter": "code = input().strip()\n\n# À compléter : vérifier le format d'identifiant IEEE et extraire les composantes\n",
    "hints": [
      "Découpe la ligne avec split(\";\").",
      "Convertis domaine et type avec .upper().",
      "Formate le numéro avec f\"{int(num):03d}\"."
    ],
    "examples": [
      {
        "stdin": "auth;fr;5",
        "expected": "EXIGENCE: AUTH-FR-005",
        "note": "auth devient AUTH, fr devient FR, et 5 devient 005."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "perf;nfr;42",
        "expected": "EXIGENCE: PERF-NFR-042"
      },
      {
        "label": "Test 2",
        "stdin": "billing;fr;120",
        "expected": "EXIGENCE: BILLING-FR-120"
      },
      {
        "label": "Test 3",
        "stdin": "rgpd;con;1",
        "expected": "EXIGENCE: RGPD-CON-001"
      }
    ],
    "solution": "import sys\n\nligne = sys.stdin.readline().strip()\ndom, typ, num = ligne.split(\";\")\n\ndom_clean = dom.strip().upper()\ntyp_clean = typ.strip().upper()\nnum_fmt = f\"{int(num.strip()):03d}\"\n\nprint(f\"EXIGENCE: {dom_clean}-{typ_clean}-{num_fmt}\")"
  },
  {
    "id": "ib2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "python",
    "title": "Audit de matrice de traçabilité (RTM)",
    "goal": "Détecter les exigences sans tests de validation ou sans besoin métier dans une matrice RTM.",
    "brief": "<p>Une <strong>Matrice de Traçabilité des Exigences</strong> (<em>RTM</em>) relie un <strong>Besoin Métier (BRQ)</strong>, une <strong>Exigence Système (SRQ)</strong> et un <strong>Cas de Test (TC)</strong>.<br>Une liaison est dite <em>non testée</em> si <code>TC == \"AUCUN\"</code>. Une liaison est dite <em>sans besoin</em> si <code>BRQ == \"AUCUN\"</code>.</p><p>Lit sur l’entrée standard :<br>- Première ligne : le nombre <code>N</code> de liaisons.<br>- Les <code>N</code> lignes suivantes : <code>BRQ;SRQ;TC</code>.<br>Affiche : <code>TOTAL: &lt;N&gt; | NON_TESTEES: &lt;X&gt; | SANS_BESOIN: &lt;Y&gt;</code>.</p>",
    "starter": "import sys\n\nlignes = sys.stdin.read().splitlines()\n\n# À compléter : auditer la matrice RTM amont/aval et repérer les anomalies\n",
    "hints": [
      "Itère sur les N lignes et incrémente des compteurs si tc.upper() == \"AUCUN\" ou brq.upper() == \"AUCUN\".",
      "Affiche le résumé formaté."
    ],
    "examples": [
      {
        "stdin": "3\nBRQ-01;SRQ-01;TC-01\nBRQ-02;SRQ-02;AUCUN\nAUCUN;SRQ-03;TC-03",
        "expected": "TOTAL: 3 | NON_TESTEES: 1 | SANS_BESOIN: 1",
        "note": "SRQ-02 n’a aucun cas de test, SRQ-03 est orpheline de besoin métier."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "2\nBRQ-10;SRQ-10;TC-10\nBRQ-11;SRQ-11;TC-11",
        "expected": "TOTAL: 2 | NON_TESTEES: 0 | SANS_BESOIN: 0"
      },
      {
        "label": "Test 2",
        "stdin": "4\nBRQ-01;SRQ-01;AUCUN\nAUCUN;SRQ-02;AUCUN\nBRQ-03;SRQ-03;TC-03\nAUCUN;SRQ-04;TC-04",
        "expected": "TOTAL: 4 | NON_TESTEES: 2 | SANS_BESOIN: 2"
      },
      {
        "label": "Test 3",
        "stdin": "1\nBRQ-99;SRQ-99;AUCUN",
        "expected": "TOTAL: 1 | NON_TESTEES: 1 | SANS_BESOIN: 0"
      }
    ],
    "solution": "import sys\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\nif not lignes:\n    sys.exit(0)\n\nn = int(lignes[0])\nnon_testees = 0\nsans_besoin = 0\n\nfor l in lignes[1:n+1]:\n    parts = l.split(\";\")\n    if len(parts) >= 3:\n        brq = parts[0].strip().upper()\n        tc = parts[2].strip().upper()\n        if tc == \"AUCUN\":\n            non_testees += 1\n        if brq == \"AUCUN\":\n            sans_besoin += 1\n\nprint(f\"TOTAL: {n} | NON_TESTEES: {non_testees} | SANS_BESOIN: {sans_besoin}\")"
  },
  {
    "id": "ib2-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "python",
    "title": "Parseur de critère d’acceptation Gherkin",
    "goal": "Structurer un critère d’acceptation Étant donné / Quand / Alors (Given / When / Then) en objet JSON.",
    "brief": "<p>En BDD (<em>Behavior-Driven Development</em>), un scénario de test se décompose en 3 clauses :<br>Ligne 1 : <code>Etant donne &lt;contexte&gt;</code> (ou <code>Étant donné</code>)<br>Ligne 2 : <code>Quand &lt;evenement&gt;</code><br>Ligne 3 : <code>Alors &lt;resultat_attendu&gt;</code></p><p>Lit 3 lignes sur l’entrée standard, nettoie la ponctuation finale éventuelle et affiche un dictionnaire JSON strict sur une ligne :<br><code>{\"contexte\": \"...\", \"evenement\": \"...\", \"resultat_attendu\": \"...\"}</code>.<br>Si l’une des clauses ne commence pas par le bon mot-clé, affiche <code>ERREUR: Syntaxe Gherkin non respectee</code>.</p>",
    "starter": "import sys\n\ntexte = sys.stdin.read()\n\n# À compléter : valider la structure des clauses Gherkin (Given, When, Then)\n",
    "hints": [
      "Vérifie que les lignes commencent respectivement par (etant donne / étant donné), (quand), (alors).",
      "Supprime le préfixe et le point final éventuel.",
      "Affiche le résultat avec json.dumps(obj, ensure_ascii=False)."
    ],
    "examples": [
      {
        "stdin": "Etant donne un utilisateur connecte avec le solde 100€\nQuand il effectue un virement de 40€\nAlors son nouveau solde est de 60€.",
        "expected": "{\"contexte\": \"un utilisateur connecte avec le solde 100€\", \"evenement\": \"il effectue un virement de 40€\", \"resultat_attendu\": \"son nouveau solde est de 60€\"}",
        "note": "Le critère d’acceptation est structuré de façon non ambiguë et prêt pour l’automatisation."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "Etant donne un panier contenant 2 articles\nQuand l utilisateur clique sur Commander\nAlors la page de paiement s affiche",
        "expected": "{\"contexte\": \"un panier contenant 2 articles\", \"evenement\": \"l utilisateur clique sur Commander\", \"resultat_attendu\": \"la page de paiement s affiche\"}"
      },
      {
        "label": "Test 2",
        "stdin": "Sachant que le serveur tourne\nQuand une erreur 500 survient\nAlors une alerte est envoyee",
        "expected": "ERREUR: Syntaxe Gherkin non respectee"
      },
      {
        "label": "Test 3",
        "stdin": "Étant donné un mot de passe expire\nQuand l utilisateur saisit ses identifiants\nAlors un message invite au renouvellement.",
        "expected": "{\"contexte\": \"un mot de passe expire\", \"evenement\": \"l utilisateur saisit ses identifiants\", \"resultat_attendu\": \"un message invite au renouvellement\"}"
      }
    ],
    "solution": "import json, re, sys\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\nif len(lignes) < 3:\n    print(\"ERREUR: Syntaxe Gherkin non respectee\")\n    sys.exit(0)\n\nl1, l2, l3 = lignes[0], lignes[1], lignes[2]\nm1 = re.match(r\"^(?:etant donne|étant donné)\\s+(.+)$\", l1, re.IGNORECASE)\nm2 = re.match(r\"^quand\\s+(.+)$\", l2, re.IGNORECASE)\nm3 = re.match(r\"^alors\\s+(.+)$\", l3, re.IGNORECASE)\n\nif m1 and m2 and m3:\n    ctx = m1.group(1).rstrip(\". \")\n    ev = m2.group(1).rstrip(\". \")\n    res = m3.group(1).rstrip(\". \")\n    out = {\n        \"contexte\": ctx,\n        \"evenement\": ev,\n        \"resultat_attendu\": res\n    }\n    print(json.dumps(out, ensure_ascii=False))\nelse:\n    print(\"ERREUR: Syntaxe Gherkin non respectee\")"
  }
];
