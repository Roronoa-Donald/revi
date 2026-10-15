/**
 * Exercices du chapitre 2 — Ingénierie du besoin B2.
 */
'use strict';

module.exports = [
  {
    "id": "ib2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "python",
    "title": "Classification FURPS+ des exigences",
    "goal": "Classifier une exigence selon le modèle FURPS+ (Fonctionnelle, Performance, Fiabilité, Utilisabilité).",
    "brief": "<p>Le modèle <strong>FURPS+</strong> structure les exigences logicielles selon leurs attributs de qualité majeurs :</p><ul>  <li><code>authentification</code>, <code>calcul_facture</code>, <code>export_pdf</code>, <code>gestion_panier</code> &rarr; <code>Categorie: Fonctionnelle</code></li>  <li><code>temps_reponse</code>, <code>debit_transactions</code> &rarr; <code>Categorie: Performance</code></li>  <li><code>disponibilite_99_9</code>, <code>sauvegarde_quotidienne</code> &rarr; <code>Categorie: Fiabilite</code></li>  <li><code>accessibilite_wcag</code>, <code>ergonomie_mobile</code> &rarr; <code>Categorie: Utilisabilite</code></li>  <li>Tout autre mot &rarr; <code>Categorie: Autre</code></li></ul><p>Lit un identifiant de catégorie ou mot-clé sur l’entrée standard et affiche sa classification.</p>",
    "starter": "enonce = input().strip().lower()\n\n# À compléter : classifier selon FURPS+ (Functionality, Usability, etc.)\n",
    "hints": [
      "Crée un dictionnaire ou plusieurs ensembles associant les mots-clés à leur catégorie.",
      "Affiche \"Categorie: Autre\" si le mot n’est pas trouvé."
    ],
    "examples": [
      {
        "stdin": "temps_reponse",
        "expected": "Categorie: Performance",
        "note": "Le temps de réponse mesure la vélocité du système, c’est une exigence non fonctionnelle de performance."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "authentification",
        "expected": "Categorie: Fonctionnelle"
      },
      {
        "label": "Test 2",
        "stdin": "accessibilite_wcag",
        "expected": "Categorie: Utilisabilite"
      },
      {
        "label": "Test 3",
        "stdin": "protocole_blockchain",
        "expected": "Categorie: Autre"
      }
    ],
    "solution": "import sys\n\ncle = sys.stdin.readline().strip().lower()\n\ntable = {\n    \"authentification\": \"Fonctionnelle\",\n    \"calcul_facture\": \"Fonctionnelle\",\n    \"export_pdf\": \"Fonctionnelle\",\n    \"gestion_panier\": \"Fonctionnelle\",\n    \"temps_reponse\": \"Performance\",\n    \"debit_transactions\": \"Performance\",\n    \"disponibilite_99_9\": \"Fiabilite\",\n    \"sauvegarde_quotidienne\": \"Fiabilite\",\n    \"accessibilite_wcag\": \"Utilisabilite\",\n    \"ergonomie_mobile\": \"Utilisabilite\"\n}\n\ncat = table.get(cle, \"Autre\")\nprint(f\"Categorie: {cat}\")"
  },
  {
    "id": "ib2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "python",
    "title": "Détection d’ambiguïtés et termes vagues",
    "goal": "Identifier les termes flous non mesurables proscrits dans la rédaction d’exigences professionnelles.",
    "brief": "<p>En ingénierie des exigences, les termes subjectifs comme <em>rapide</em>, <em>facile</em>, <em>convivial</em>, <em>efficace</em>, <em>flexible</em>, <em>robuste</em>, <em>intuitif</em>, <em>performant</em> ou <em>optimal</em> doivent être remplacés par des métriques vérifiables.</p><p>Lit une phrase sur l’entrée standard (la ponctuation peut être présente) et inspecte ses mots (en minuscules).<br>- Si aucun terme vague n’est présent : affiche <code>CONFORME</code>.<br>- Si un ou plusieurs termes vagues sont détectés : affiche <code>AMBIGU: &lt;termes dédupliqués, triés alphabétiquement et séparés par des virgules&gt;</code>.</p>",
    "starter": "texte = input().strip()\n\n# À compléter : détecter les mots vagues interdits\n",
    "hints": [
      "Nettoie la ponctuation (points, virgules) et convertis chaque mot en minuscules.",
      "Gère les variantes féminines ou plurielles des mots vagues : rapide/rapides, facile/faciles, convivial/conviviale/conviviaux/conviviales, etc."
    ],
    "examples": [
      {
        "stdin": "L interface doit etre rapide et conviviale pour les utilisateurs.",
        "expected": "AMBIGU: conviviale, rapide",
        "note": "Les adjectifs rapide et convivial(e) sont vagues et impossibles à tester sans seuil chiffré."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "Le systeme doit repondre en moins de 250 ms pour 95% des requetes.",
        "expected": "CONFORME"
      },
      {
        "label": "Test 2",
        "stdin": "La solution proposee doit rester flexible et tres robuste face aux pannes.",
        "expected": "AMBIGU: flexible, robuste"
      },
      {
        "label": "Test 3",
        "stdin": "Le design doit etre intuitif et optimal.",
        "expected": "AMBIGU: intuitif, optimal"
      }
    ],
    "solution": "import re, sys\n\nphrase = sys.stdin.readline().strip().lower()\nmots = re.findall(r\"[a-z0-9àâäéèêëîïôöùûüç]+\", phrase)\n\nracines_vagues = {\n    \"rapide\": \"rapide\", \"rapides\": \"rapide\",\n    \"facile\": \"facile\", \"faciles\": \"facile\",\n    \"convivial\": \"conviviale\", \"conviviale\": \"conviviale\", \"conviviaux\": \"conviviale\", \"conviviales\": \"conviviale\",\n    \"efficace\": \"efficace\", \"efficaces\": \"efficace\",\n    \"flexible\": \"flexible\", \"flexibles\": \"flexible\",\n    \"robuste\": \"robuste\", \"robustes\": \"robuste\",\n    \"intuitif\": \"intuitif\", \"intuitive\": \"intuitif\", \"intuitifs\": \"intuitif\", \"intuitives\": \"intuitif\",\n    \"performant\": \"performant\", \"performante\": \"performant\", \"performants\": \"performant\", \"performantes\": \"performant\",\n    \"optimal\": \"optimal\", \"optimale\": \"optimal\", \"optimaux\": \"optimal\", \"optimales\": \"optimal\"\n}\n\ntrouves = set()\nfor m in mots:\n    if m in racines_vagues:\n        trouves.add(m)\n\nif not trouves:\n    print(\"CONFORME\")\nelse:\n    liste = sorted(list(trouves))\n    print(f\"AMBIGU: {', '.join(liste)}\")"
  },
  {
    "id": "ib2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "python",
    "title": "Vérificateur SMART d’exigence de performance",
    "goal": "Contrôler qu’une exigence de performance respecte les critères de testabilité SMART.",
    "brief": "<p>Une exigence de performance testable doit spécifier :<br>1. Une <strong>métrique</strong> identifiée.<br>2. Une <strong>valeur cible</strong> numérique strictement positive.<br>3. Une <strong>unité de temps</strong> reconnue (<code>ms</code> ou <code>s</code>).<br>4. Une <strong>condition de charge</strong> ou percentile (ex. <code>95% des requetes</code>, <code>99%</code>, avec un pourcentage &ge; 90%).</p><p>Lit une ligne au format <code>Metrique;Valeur;Unite;Condition</code>.<br>- Si valide : affiche <code>TESTABLE: &lt;Metrique&gt; &lt;= &lt;Valeur&gt;&lt;Unite&gt; sous &lt;Condition&gt;</code>.<br>- Si la valeur &le; 0 : affiche <code>REJET: Valeur invalide</code>.<br>- Si l’unité n’est pas <code>ms</code> ou <code>s</code> : affiche <code>REJET: Unite invalide</code>.<br>- Si le pourcentage de condition est inférieur à 90% ou introuvable : affiche <code>REJET: Seuil condition insuffisant</code>.</p>",
    "starter": "ligne = input().strip()\n\n# À compléter : auditer les critères SMART et afficher le statut\n",
    "hints": [
      "Découpe la ligne avec split(\";\"). Convertis la valeur en float ou int.",
      "Utilise une expression régulière re.search(r\"(\\d+)%\", condition) pour extraire le pourcentage et vérifier qu’il est >= 90."
    ],
    "examples": [
      {
        "stdin": "Temps de reponse;200;ms;95% des requetes",
        "expected": "TESTABLE: Temps de reponse <= 200ms sous 95% des requetes",
        "note": "L’exigence est quantifiée, l’unité est en millisecondes et le percentile atteint 95%."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "Chargement page;-5;s;99% des requetes",
        "expected": "REJET: Valeur invalide"
      },
      {
        "label": "Test 2",
        "stdin": "Delai synchro;3;minutes;95% des transactions",
        "expected": "REJET: Unite invalide"
      },
      {
        "label": "Test 3",
        "stdin": "Temps batch;500;ms;75% des requetes",
        "expected": "REJET: Seuil condition insuffisant"
      }
    ],
    "solution": "import re, sys\n\nligne = sys.stdin.readline().strip()\nmetrique, val_str, unite, cond = ligne.split(\";\")\n\ntry:\n    val = float(val_str)\nexcept ValueError:\n    print(\"REJET: Valeur invalide\")\n    sys.exit(0)\n\nif val <= 0:\n    print(\"REJET: Valeur invalide\")\nelif unite not in {\"ms\", \"s\"}:\n    print(\"REJET: Unite invalide\")\nelse:\n    m = re.search(r\"(\\d+)%\", cond)\n    if not m or int(m.group(1)) < 90:\n        print(\"REJET: Seuil condition insuffisant\")\n    else:\n        val_repr = int(val) if val.is_integer() else val\n        print(f\"TESTABLE: {metrique} <= {val_repr}{unite} sous {cond}\")"
  }
];
