/**
 * chapitre2.js — Études de cas du cours « ingenierie-besoin ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ib2-c2-e1",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Classification FURPS+ des exigences",
    goal: "Classifier une exigence selon le modèle FURPS+ (Fonctionnelle, Performance, Fiabilité, Utilisabilité).",
    brief: "<p>Le modèle <strong>FURPS+</strong> structure les exigences logicielles selon leurs attributs de qualité majeurs :</p><ul>  <li><code>authentification</code>, <code>calcul_facture</code>, <code>export_pdf</code>, <code>gestion_panier</code> &rarr; <code>Categorie: Fonctionnelle</code></li>  <li><code>temps_reponse</code>, <code>debit_transactions</code> &rarr; <code>Categorie: Performance</code></li>  <li><code>disponibilite_99_9</code>, <code>sauvegarde_quotidienne</code> &rarr; <code>Categorie: Fiabilite</code></li>  <li><code>accessibilite_wcag</code>, <code>ergonomie_mobile</code> &rarr; <code>Categorie: Utilisabilite</code></li>  <li>Tout autre mot &rarr; <code>Categorie: Autre</code></li></ul><p>Lit un identifiant de catégorie ou mot-clé sur l’entrée standard et affiche sa classification.</p>",
    starter: "# Grille d'analyse (ib2-c2-e1) — Classification FURPS+ des exigences\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : authentification\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : accessibilite_wcag\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : protocole_blockchain\nA_COMPLETER\n",
    hints: [
          "Crée un dictionnaire ou plusieurs ensembles associant les mots-clés à leur catégorie.",
          "Affiche \"Categorie: Autre\" si le mot n’est pas trouvé."
    ],
    examples: [
          {
                "stdin": "temps_reponse",
                "expected": "Categorie: Performance",
                "note": "Le temps de réponse mesure la vélocité du système, c’est une exigence non fonctionnelle de performance."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "Categorie: Fonctionnelle"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "Categorie: Utilisabilite"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "Categorie: Autre"
          }
    ],
    solution: "[Exemple]\nCategorie: Performance\n\n[Cas 1 — Test 1]\nCategorie: Fonctionnelle\n\n[Cas 2 — Test 2]\nCategorie: Utilisabilite\n\n[Cas 3 — Test 3]\nCategorie: Autre\n"
  },
  {
    id: "ib2-c2-e2",
    chapter: 2,
    level: "n2",
    language: 'analyse',
    title: "Détection d’ambiguïtés et termes vagues",
    goal: "Identifier les termes flous non mesurables proscrits dans la rédaction d’exigences professionnelles.",
    brief: "<p>En ingénierie des exigences, les termes subjectifs comme <em>rapide</em>, <em>facile</em>, <em>convivial</em>, <em>efficace</em>, <em>flexible</em>, <em>robuste</em>, <em>intuitif</em>, <em>performant</em> ou <em>optimal</em> doivent être remplacés par des métriques vérifiables.</p><p>Lit une phrase sur l’entrée standard (la ponctuation peut être présente) et inspecte ses mots (en minuscules).<br>- Si aucun terme vague n’est présent : affiche <code>CONFORME</code>.<br>- Si un ou plusieurs termes vagues sont détectés : affiche <code>AMBIGU: &lt;termes dédupliqués, triés alphabétiquement et séparés par des virgules&gt;</code>.</p>",
    starter: "# Grille d'analyse (ib2-c2-e2) — Détection d’ambiguïtés et termes vagues\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : Le systeme doit repondre en moins de 250 ms pour 95% des requetes.\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : La solution proposee doit rester flexible et tres robuste face aux pannes.\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : Le design doit etre intuitif et optimal.\nA_COMPLETER\n",
    hints: [
          "Nettoie la ponctuation (points, virgules) et convertis chaque mot en minuscules.",
          "Gère les variantes féminines ou plurielles des mots vagues : rapide/rapides, facile/faciles, convivial/conviviale/conviviaux/conviviales, etc."
    ],
    examples: [
          {
                "stdin": "L interface doit etre rapide et conviviale pour les utilisateurs.",
                "expected": "AMBIGU: conviviale, rapide",
                "note": "Les adjectifs rapide et convivial(e) sont vagues et impossibles à tester sans seuil chiffré."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "CONFORME"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "AMBIGU: flexible, robuste"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "AMBIGU: intuitif, optimal"
          }
    ],
    solution: "[Exemple]\nAMBIGU: conviviale, rapide\n\n[Cas 1 — Test 1]\nCONFORME\n\n[Cas 2 — Test 2]\nAMBIGU: flexible, robuste\n\n[Cas 3 — Test 3]\nAMBIGU: intuitif, optimal\n"
  },
  {
    id: "ib2-c2-e3",
    chapter: 2,
    level: "n3",
    language: 'analyse',
    title: "Vérificateur SMART d’exigence de performance",
    goal: "Contrôler qu’une exigence de performance respecte les critères de testabilité SMART.",
    brief: "<p>Une exigence de performance testable doit spécifier :<br>1. Une <strong>métrique</strong> identifiée.<br>2. Une <strong>valeur cible</strong> numérique strictement positive.<br>3. Une <strong>unité de temps</strong> reconnue (<code>ms</code> ou <code>s</code>).<br>4. Une <strong>condition de charge</strong> ou percentile (ex. <code>95% des requetes</code>, <code>99%</code>, avec un pourcentage &ge; 90%).</p><p>Lit une ligne au format <code>Metrique;Valeur;Unite;Condition</code>.<br>- Si valide : affiche <code>TESTABLE: &lt;Metrique&gt; &lt;= &lt;Valeur&gt;&lt;Unite&gt; sous &lt;Condition&gt;</code>.<br>- Si la valeur &le; 0 : affiche <code>REJET: Valeur invalide</code>.<br>- Si l’unité n’est pas <code>ms</code> ou <code>s</code> : affiche <code>REJET: Unite invalide</code>.<br>- Si le pourcentage de condition est inférieur à 90% ou introuvable : affiche <code>REJET: Seuil condition insuffisant</code>.</p>",
    starter: "# Grille d'analyse (ib2-c2-e3) — Vérificateur SMART d’exigence de performance\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : Chargement page;-5;s;99% des requetes\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : Delai synchro;3;minutes;95% des transactions\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : Temps batch;500;ms;75% des requetes\nA_COMPLETER\n",
    hints: [
          "Découpe la ligne avec split(\";\"). Convertis la valeur en float ou int.",
          "Utilise une expression régulière re.search(r\"(\\d+)%\", condition) pour extraire le pourcentage et vérifier qu’il est >= 90."
    ],
    examples: [
          {
                "stdin": "Temps de reponse;200;ms;95% des requetes",
                "expected": "TESTABLE: Temps de reponse <= 200ms sous 95% des requetes",
                "note": "L’exigence est quantifiée, l’unité est en millisecondes et le percentile atteint 95%."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "REJET: Valeur invalide"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "REJET: Unite invalide"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "REJET: Seuil condition insuffisant"
          }
    ],
    solution: "[Exemple]\nTESTABLE: Temps de reponse <= 200ms sous 95% des requetes\n\n[Cas 1 — Test 1]\nREJET: Valeur invalide\n\n[Cas 2 — Test 2]\nREJET: Unite invalide\n\n[Cas 3 — Test 3]\nREJET: Seuil condition insuffisant\n"
  }
];
