/**
 * Exercices du chapitre 1 — Ingénierie du besoin B2.
 */
'use strict';

module.exports = [
  {
    "id": "ib2-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "python",
    "title": "Besoin vs Solution technique",
    "goal": "Distinguer un besoin métier (le « Quoi / Pourquoi ») d’une solution technique prématurée (le « Comment »).",
    "brief": "<p>En ingénierie des exigences, confondre le <strong>besoin</strong> (l’objectif ou la douleur utilisateur) et la <strong>solution</strong> (un choix technique d’implémentation) est une cause majeure d’échec des projets.</p><p>Lit une description d’énoncé sur l’entrée standard (en minuscules, sans ponctuation finale) et affiche son type :<br>- <code>reduire le temps d attente au guichet</code>, <code>permettre aux clients de suivre leur colis en direct</code>, <code>securiser l acces aux comptes bancaires</code> &rarr; <code>Type: Besoin</code><br>- <code>utiliser react avec mongodb</code>, <code>developper en python 3.12</code>, <code>stocker les logs sur aws s3</code>, <code>installer un cluster kubernetes</code> &rarr; <code>Type: Solution</code><br>Pour toute autre valeur : <code>Type: Inconnu</code>.</p>",
    "starter": "enonce = input().strip().lower()\n\n# À compléter : afficher Type: Besoin, Type: Solution ou Type: Inconnu\n",
    "hints": [
      "Stocke les énoncés connus dans deux ensembles ou un dictionnaire de correspondances.",
      "Utilise table.get(enonce, \"Inconnu\") pour renvoyer la valeur par défaut."
    ],
    "examples": [
      {
        "stdin": "reduire le temps d attente au guichet",
        "expected": "Type: Besoin",
        "note": "La réduction du temps d’attente est un objectif métier, non une technologie."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "utiliser react avec mongodb",
        "expected": "Type: Solution"
      },
      {
        "label": "Test 2",
        "stdin": "securiser l acces aux comptes bancaires",
        "expected": "Type: Besoin"
      },
      {
        "label": "Test 3",
        "stdin": "refaire toute l application en assembleur",
        "expected": "Type: Inconnu"
      }
    ],
    "solution": "import sys\n\nenonce = sys.stdin.readline().strip().lower()\n\nbesoins = {\n    \"reduire le temps d attente au guichet\",\n    \"permettre aux clients de suivre leur colis en direct\",\n    \"securiser l acces aux comptes bancaires\"\n}\nsolutions = {\n    \"utiliser react avec mongodb\",\n    \"developper en python 3.12\",\n    \"stocker les logs sur aws s3\",\n    \"installer un cluster kubernetes\"\n}\n\nif enonce in besoins:\n    print(\"Type: Besoin\")\nelif enonce in solutions:\n    print(\"Type: Solution\")\nelse:\n    print(\"Type: Inconnu\")"
  },
  {
    "id": "ib2-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "python",
    "title": "Matrice Pouvoir / Intérêt des parties prenantes",
    "goal": "Classifier un acteur selon la matrice Pouvoir / Intérêt de Mendelow pour adapter la stratégie de communication.",
    "brief": "<p>La matrice de Mendelow positionne chaque partie prenante (<em>Stakeholder</em>) selon son niveau de <strong>Pouvoir</strong> (1 à 10) et d’<strong>Intérêt</strong> (1 à 10) :</p><ul>  <li>Pouvoir &ge; 7 et Intérêt &ge; 7 &rarr; <code>Gerer de pres</code> (Acteur clé)</li>  <li>Pouvoir &ge; 7 et Intérêt &lt; 7 &rarr; <code>Garder satisfait</code></li>  <li>Pouvoir &lt; 7 et Intérêt &ge; 7 &rarr; <code>Garder informe</code></li>  <li>Pouvoir &lt; 7 et Intérêt &lt; 7 &rarr; <code>Surveiller</code> (Effort minimal)</li></ul><p>Lit une ligne au format <code>Nom;Pouvoir;Interet</code> et affiche :<br><code>&lt;Nom&gt; -&gt; &lt;Strategie&gt;</code>.</p>",
    "starter": "ligne = input().strip()\n\n# À compléter : extraire nom, pouvoir, interet et classifier selon Mendelow\n",
    "hints": [
      "Découpe la ligne avec split(\";\") et convertis pouvoir et intérêt en entiers.",
      "Applique les conditions if/elif/else sur les seuils fixés à 7."
    ],
    "examples": [
      {
        "stdin": "Directeur General;9;8",
        "expected": "Directeur General -> Gerer de pres",
        "note": "Avec un pouvoir de 9 et un intérêt de 8, le Directeur Général doit être géré au plus près."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "Responsable Juridique;8;4",
        "expected": "Responsable Juridique -> Garder satisfait"
      },
      {
        "label": "Test 2",
        "stdin": "Utilisateur Final;3;9",
        "expected": "Utilisateur Final -> Garder informe"
      },
      {
        "label": "Test 3",
        "stdin": "Prestataire Maintenance;2;3",
        "expected": "Prestataire Maintenance -> Surveiller"
      }
    ],
    "solution": "import sys\n\nligne = sys.stdin.readline().strip()\nnom, p_str, i_str = ligne.split(\";\")\np = int(p_str)\ni = int(i_str)\n\nif p >= 7 and i >= 7:\n    strat = \"Gerer de pres\"\nelif p >= 7 and i < 7:\n    strat = \"Garder satisfait\"\nelif p < 7 and i >= 7:\n    strat = \"Garder informe\"\nelse:\n    strat = \"Surveiller\"\n\nprint(f\"{nom} -> {strat}\")"
  },
  {
    "id": "ib2-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "python",
    "title": "Complétude d’une fiche d’exigence",
    "goal": "Valider la structure et la complétude des attributs obligatoires d’une exigence logicielle.",
    "brief": "<p>Une exigence documentée doit comporter 5 attributs indispensables : <code>id</code>, <code>titre</code>, <code>description</code>, <code>source</code> et <code>priorite</code>. La priorité doit impérativement être l’une des trois valeurs : <code>Haute</code>, <code>Moyenne</code> ou <code>Basse</code>.</p><p>Lit un objet JSON sur l’entrée standard et affiche :<br>- Si valide : <code>VALIDE (&lt;id&gt;)</code><br>- Si un attribut obligatoire est absent ou vide : <code>ERREUR: Champ manquant &lt;nom_champ&gt;</code> (tester les champs dans l’ordre : id, titre, description, source, priorite)<br>- Si la priorité n’est pas l’une des 3 valeurs autorisées : <code>ERREUR: Priorite invalide</code>.</p>",
    "starter": "import json\n\ndata = json.loads(input().strip())\n\n# À compléter : valider la présence des 5 champs et la priorité\n",
    "hints": [
      "Parse la chaîne avec json.loads().",
      "Vérifie la présence et la non-vacuité de chaque champ dans la liste ordonnée [\"id\", \"titre\", \"description\", \"source\", \"priorite\"]."
    ],
    "examples": [
      {
        "stdin": "{\"id\": \"REQ-001\", \"titre\": \"Connexion OAuth2\", \"description\": \"L utilisateur doit pouvoir se connecter via Google\", \"source\": \"DSI\", \"priorite\": \"Haute\"}",
        "expected": "VALIDE (REQ-001)",
        "note": "Tous les champs sont renseignés et la priorité est Haute."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "{\"id\": \"REQ-002\", \"titre\": \"\", \"description\": \"Export CSV\", \"source\": \"Finance\", \"priorite\": \"Moyenne\"}",
        "expected": "ERREUR: Champ manquant titre"
      },
      {
        "label": "Test 2",
        "stdin": "{\"id\": \"REQ-003\", \"titre\": \"Audit logs\", \"description\": \"Archivage 1 an\", \"source\": \"Securite\", \"priorite\": \"Urgente\"}",
        "expected": "ERREUR: Priorite invalide"
      },
      {
        "label": "Test 3",
        "stdin": "{\"id\": \"REQ-004\", \"titre\": \"Recherche\", \"description\": \"Recherche floue\", \"source\": \"Produit\", \"priorite\": \"Basse\"}",
        "expected": "VALIDE (REQ-004)"
      }
    ],
    "solution": "import json, sys\n\nraw = sys.stdin.readline().strip()\ndata = json.loads(raw)\n\nchamps = [\"id\", \"titre\", \"description\", \"source\", \"priorite\"]\nerreur = None\n\nfor c in champs:\n    val = data.get(c)\n    if val is None or str(val).strip() == \"\":\n        erreur = f\"ERREUR: Champ manquant {c}\"\n        break\n\nif not erreur:\n    if data[\"priorite\"] not in {\"Haute\", \"Moyenne\", \"Basse\"}:\n        erreur = \"ERREUR: Priorite invalide\"\n\nif erreur:\n    print(erreur)\nelse:\n    print(f\"VALIDE ({data['id']})\")"
  }
];
