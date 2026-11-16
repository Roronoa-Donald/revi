/**
 * chapitre5.js — Études de cas du cours « ingenierie-besoin ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ib2-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Codifier les exigences du SRS de TogoCapital",
    "exampleTitle": "Exemple résolu — la codification de l'assurance Sanavia",
    "goal": "Construire les identifiants normalisés DOMAINE-TYPE-Numéro d'un document de spécification (SRS).",
    "brief": "<p><strong>Énoncé.</strong> La direction des systèmes d'information de la banque TogoCapital rédige le SRS (Software Requirements Specification) de son application mobile, selon une codification inspirée de la norme ISO/IEC/IEEE 29148. Chaque exigence reçoit un identifiant au format <code>DOMAINE-TYPE-Numéro</code> :</p><ul><li>le domaine et le type sont convertis en majuscules ;</li><li>le type vaut <code>FR</code> (exigence fonctionnelle), <code>NFR</code> (exigence non fonctionnelle) ou <code>CON</code> (contrainte) ;</li><li>le numéro est complété par des zéros à gauche pour former toujours trois chiffres.</li></ul><p>Quatre exigences attendent leur identifiant :</p><table><tr><th>Domaine</th><th>Type</th><th>Numéro</th></tr><tr><th>auth</th><td>fr</td><td>7</td></tr><tr><th>pay</th><td>nfr</td><td>12</td></tr><tr><th>sec</th><td>con</td><td>3</td></tr><tr><th>loan</th><td>fr</td><td>104</td></tr></table><p>Répondez aux questions 1 à 4 par l'identifiant complet, au format AUTH-FR-007.</p><ol><li>Quel est l'identifiant de l'exigence (auth, fr, 7) ?</li><li>Quel est l'identifiant de l'exigence (pay, nfr, 12) ?</li><li>Quel est l'identifiant de l'exigence (sec, con, 3) ?</li><li>Quel est l'identifiant de l'exigence (loan, fr, 104) ?</li><li>Combien de chiffres le numéro comporte-t-il toujours dans un identifiant ?</li></ol>",
    "starter": "# Exercice — Codifier les exigences du SRS de TogoCapital\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : l'identifiant complet au format AUTH-FR-007.\n\n[Question 1 — Identifiant de (auth, fr, 7)]\nA_COMPLETER\n\n[Question 2 — Identifiant de (pay, nfr, 12)]\nA_COMPLETER\n\n[Question 3 — Identifiant de (sec, con, 3)]\nA_COMPLETER\n\n[Question 4 — Identifiant de (loan, fr, 104)]\nA_COMPLETER\n\n[Question 5 — Nombre de chiffres du numéro]\nA_COMPLETER\n",
    "hints": [
      "L'identifiant se lit de gauche à droite : domaine en majuscules, tiret, type en majuscules, tiret, numéro sur trois chiffres.",
      "Le passage à trois chiffres se fait par des zéros à gauche : 7 devient 007, 12 devient 012 ; 104 en comporte déjà trois.",
      "1. auth devient AUTH, fr devient FR, 7 devient 007. 2. Répétez pour pay, nfr, 12. 3. Puis pour sec, con, 3. 4. loan, fr, 104 : aucun zéro à ajouter. 5. Le format impose toujours trois chiffres."
    ],
    "examples": [
      {
        "stdin": "L'assurance Sanavia codifie son SRS santé : DOMAINE-TYPE-Numéro,\nnuméro sur trois chiffres, domaine et type en majuscules.\n- (sante, nfr, 9) : SANTE-NFR-009 ;\n- (sinistre, fr, 42) : SINISTRE-FR-042 ;\n- (rgpd, con, 1) : RGPD-CON-001.\n\n1) Chaque identifiant convertit les minuscules en majuscules.\n2) Le numéro est complété de zéros : 9 donne 009, 1 donne 001.",
        "expected": "SANTE-NFR-009 — SINISTRE-FR-042 — RGPD-CON-001",
        "note": "Une codification stable et normalisée est la première condition de la traçabilité : chaque exigence reste adressable tout au long du projet."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Identifiant de (auth, fr, 7)",
        "stdin": "q:1",
        "expected": "AUTH-FR-007||auth-fr-007"
      },
      {
        "label": "Question 2 — Identifiant de (pay, nfr, 12)",
        "stdin": "q:2",
        "expected": "PAY-NFR-012||pay-nfr-012"
      },
      {
        "label": "Question 3 — Identifiant de (sec, con, 3)",
        "stdin": "q:3",
        "expected": "SEC-CON-003||sec-con-003"
      },
      {
        "label": "Question 4 — Identifiant de (loan, fr, 104)",
        "stdin": "q:4",
        "expected": "LOAN-FR-104||loan-fr-104"
      },
      {
        "label": "Question 5 — Nombre de chiffres du numéro",
        "stdin": "q:5",
        "expected": "3||trois||3 chiffres"
      }
    ],
    "solution": "[Question 1 — Identifiant de (auth, fr, 7)]\nAUTH-FR-007\n\n[Question 2 — Identifiant de (pay, nfr, 12)]\nPAY-NFR-012\n\n[Question 3 — Identifiant de (sec, con, 3)]\nSEC-CON-003\n\n[Question 4 — Identifiant de (loan, fr, 104)]\nLOAN-FR-104\n\n[Question 5 — Nombre de chiffres du numéro]\n3",
    "takeaway": "1) (auth, fr, 7) donne AUTH-FR-007 : domaine et type passent en majuscules, 7 est complété en 007.\n2) (pay, nfr, 12) donne PAY-NFR-012.\n3) (sec, con, 3) donne SEC-CON-003.\n4) (loan, fr, 104) donne LOAN-FR-104 : le numéro comporte déjà trois chiffres.\n5) Le numéro comporte toujours 3 chiffres, complétés par des zéros à gauche si nécessaire.\nContrôle : les quatre identifiants sont uniques et normalisés, prêts à être référencés dans la matrice de traçabilité."
  },
  {
    "id": "ib2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "L'audit de la matrice de traçabilité du dossier patient",
    "exampleTitle": "Exemple résolu — la RTM du logiciel de paie de Cotono",
    "goal": "Auditer une matrice de traçabilité des exigences : compter les liaisons non testées et les exigences orphelines de besoin métier.",
    "brief": "<p><strong>Énoncé.</strong> La clinique Sainte-Marie relit sa <strong>matrice de traçabilité des exigences</strong> (RTM) avant la recette du dossier patient informatisé. Chaque ligne relie un <strong>besoin métier</strong> (BRQ), une <strong>exigence système</strong> (SRQ) et un <strong>cas de test</strong> (TC). La valeur <code>AUCUN</code> signale une liaison manquante :</p><ul><li>une exigence système est <strong>non testée</strong> si son cas de test vaut <code>AUCUN</code> ;</li><li>une exigence système est <strong>sans besoin</strong> (orpheline) si son besoin métier vaut <code>AUCUN</code>.</li></ul><p>Les sept lignes de la matrice :</p><table><tr><th>Besoin métier</th><th>Exigence système</th><th>Cas de test</th></tr><tr><th>BRQ-01</th><td>SRQ-01</td><td>TC-01</td></tr><tr><th>BRQ-02</th><td>SRQ-02</td><td>TC-02</td></tr><tr><th>BRQ-03</th><td>SRQ-03</td><td>AUCUN</td></tr><tr><th>AUCUN</th><td>SRQ-04</td><td>TC-04</td></tr><tr><th>BRQ-04</th><td>SRQ-05</td><td>TC-03</td></tr><tr><th>BRQ-05</th><td>SRQ-06</td><td>AUCUN</td></tr><tr><th>AUCUN</th><td>SRQ-07</td><td>AUCUN</td></tr></table><ol><li>Combien de lignes compte la matrice ?</li><li>Combien d'exigences système sont non testées ?</li><li>Combien d'exigences système sont sans besoin métier ?</li><li>Combien de lignes sont parfaitement traçables (avec besoin métier et cas de test) ?</li><li>L'exigence SRQ-04 est-elle non testée ou sans besoin ?</li></ol>",
    "starter": "# Exercice — L'audit de la matrice de traçabilité du dossier patient\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nombre seul, sauf la question 5 (non testée ou sans besoin).\n\n[Question 1 — Nombre de lignes de la matrice]\nA_COMPLETER\n\n[Question 2 — Nombre d'exigences non testées]\nA_COMPLETER\n\n[Question 3 — Nombre d'exigences sans besoin métier]\nA_COMPLETER\n\n[Question 4 — Nombre de lignes parfaitement traçables]\nA_COMPLETER\n\n[Question 5 — Anomalie de SRQ-04]\nA_COMPLETER\n",
    "hints": [
      "La RTM répond à deux questions : chaque exigence sert-elle un besoin métier, et chaque exigence est-elle vérifiée par un test ?",
      "Parcourez la matrice colonne par colonne : TC à AUCUN signale une non-testée, BRQ à AUCUN signale une orpheline ; une ligne peut cumuler les deux.",
      "1. Comptez les lignes du tableau. 2. TC manquant : SRQ-03, SRQ-06, SRQ-07. 3. BRQ manquant : SRQ-04 et SRQ-07. 4. Lignes complètes : SRQ-01, SRQ-02, SRQ-05. 5. SRQ-04 possède un test (TC-04) mais aucun besoin."
    ],
    "examples": [
      {
        "stdin": "Le logiciel de paie de Cotono audite sa RTM (5 lignes) :\nBRQ-1/SRQ-1/TC-1 ; BRQ-2/SRQ-2/AUCUN ; AUCUN/SRQ-3/TC-3 ;\nBRQ-4/SRQ-4/TC-4 ; BRQ-5/SRQ-5/AUCUN.\n\n1) 5 lignes au total.\n2) Non testées (TC à AUCUN) : SRQ-2 et SRQ-5, soit 2.\n3) Sans besoin (BRQ à AUCUN) : SRQ-3, soit 1.\n4) Parfaitement traçables : 2 lignes (SRQ-1 et SRQ-4).",
        "expected": "5 lignes — 2 non testées — 1 sans besoin — 2 lignes complètes",
        "note": "Chaque colonne vide de la RTM est un risque : une exigence non testée ne sera pas vérifiée, une exigence orpheline ne sert aucun besoin."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de lignes de la matrice",
        "stdin": "q:1",
        "expected": "7||sept"
      },
      {
        "label": "Question 2 — Nombre d'exigences non testées",
        "stdin": "q:2",
        "expected": "3||trois"
      },
      {
        "label": "Question 3 — Nombre d'exigences sans besoin métier",
        "stdin": "q:3",
        "expected": "2||deux"
      },
      {
        "label": "Question 4 — Nombre de lignes parfaitement traçables",
        "stdin": "q:4",
        "expected": "3||trois"
      },
      {
        "label": "Question 5 — Anomalie de SRQ-04",
        "stdin": "q:5",
        "expected": "sans besoin||elle est sans besoin||orpheline"
      }
    ],
    "solution": "[Question 1 — Nombre de lignes de la matrice]\n7\n\n[Question 2 — Nombre d'exigences non testées]\n3\n\n[Question 3 — Nombre d'exigences sans besoin métier]\n2\n\n[Question 4 — Nombre de lignes parfaitement traçables]\n3\n\n[Question 5 — Anomalie de SRQ-04]\nsans besoin",
    "takeaway": "1) La matrice compte 7 lignes, une par exigence système.\n2) Exigences non testées (TC à AUCUN) : SRQ-03, SRQ-06 et SRQ-07, soit 3.\n3) Exigences sans besoin métier (BRQ à AUCUN) : SRQ-04 et SRQ-07, soit 2.\n4) Lignes parfaitement traçables (BRQ et TC renseignés) : SRQ-01, SRQ-02 et SRQ-05, soit 3.\n5) SRQ-04 possède un cas de test (TC-04) mais aucun besoin métier : elle est sans besoin (orpheline).\nContrôle : 3 lignes complètes + 3 non testées + 2 sans besoin, en comptant SRQ-07 deux fois, redonne bien les 7 lignes : 3 + (3 + 2 - 1) = 7."
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
    solution: "[Exemple]\n{\"contexte\": \"un utilisateur connecte avec le solde 100€\", \"evenement\": \"il effectue un virement de 40€\", \"resultat_attendu\": \"son nouveau solde est de 60€\"}\n\n[Cas 1 — Test 1]\n{\"contexte\": \"un panier contenant 2 articles\", \"evenement\": \"l utilisateur clique sur Commander\", \"resultat_attendu\": \"la page de paiement s affiche\"}\n\n[Cas 2 — Test 2]\nERREUR: Syntaxe Gherkin non respectee\n\n[Cas 3 — Test 3]\n{\"contexte\": \"un mot de passe expire\", \"evenement\": \"l utilisateur saisit ses identifiants\", \"resultat_attendu\": \"un message invite au renouvellement\"}\n",
    takeaway: "À retenir : Structurer un critère d’acceptation Étant donné / Quand / Alors (Given / When / Then) en objet JSON.\nRepère : Le critère d’acceptation est structuré de façon non ambiguë et prêt pour l’automatisation."
  }
];
