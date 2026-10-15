/**
 * Exercices du chapitre 4 — Ingénierie du besoin B2.
 */
'use strict';

module.exports = [
  {
    "id": "ib2-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "python",
    "title": "Analyseur syntaxique de User Story",
    "goal": "Découper et valider une User Story selon le gabarit canonique Connextra.",
    "brief": "<p>Le format standard d’une <strong>User Story</strong> s’énonce :<br><code>En tant que &lt;Role&gt;, je veux &lt;Action&gt;, afin de &lt;Benefice&gt;.</code> (la ponctuation finale peut être un point ou absente).</p><p>Lit une ligne sur l’entrée standard et extrait les 3 composantes :<br>- Si la syntaxe est respectée et que les trois éléments sont non vides, affiche :<br><code>ROLE: &lt;Role&gt; | ACTION: &lt;Action&gt; | BENEFICE: &lt;Benefice&gt;</code>.<br>- Si l’un des motifs ou éléments manque, affiche :<br><code>ERREUR: Format User Story non respecte</code>.</p>",
    "starter": "ligne = input().strip()\n\n# À compléter : parser et valider la User Story Connextra\n",
    "hints": [
      "Utilise une expression régulière avec re.search() ou re.match() insensible à la casse.",
      "Pattern suggéré : r\"en tant qu[e']\\s*(.+?),?\\s*je veux\\s*(.+?),?\\s*afin d[e']?\\s*(.+?)\\.?$\""
    ],
    "examples": [
      {
        "stdin": "En tant que client, je veux reinitialiser mon mot de passe, afin de recuperer l acces a mon compte.",
        "expected": "ROLE: client | ACTION: reinitialiser mon mot de passe | BENEFICE: recuperer l acces a mon compte",
        "note": "Les trois composantes sont correctement extraites et nettoyées des espaces et virgules superflus."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "En tant qu administrateur, je veux bannir un spammeur, afin de proteger la communaute",
        "expected": "ROLE: administrateur | ACTION: bannir un spammeur | BENEFICE: proteger la communaute"
      },
      {
        "label": "Test 2",
        "stdin": "Je veux exporter mes factures en PDF directement.",
        "expected": "ERREUR: Format User Story non respecte"
      },
      {
        "label": "Test 3",
        "stdin": "En tant que comptable, je veux cloturer l exercice, afin d eviter les retards fiscaux.",
        "expected": "ROLE: comptable | ACTION: cloturer l exercice | BENEFICE: eviter les retards fiscaux"
      }
    ],
    "solution": "import re, sys\n\ntexte = sys.stdin.readline().strip()\npattern = r\"^en tant qu[e']?\\s*(.+?),?\\s+je veux\\s+(.+?),?\\s+afin d[e']?\\s*(.+?)\\.?$\"\n\nm = re.search(pattern, texte, re.IGNORECASE)\nif m and m.group(1).strip() and m.group(2).strip() and m.group(3).strip():\n    role = m.group(1).strip().rstrip(\",\")\n    action = m.group(2).strip().rstrip(\",\")\n    benef = m.group(3).strip().rstrip(\".\").strip()\n    print(f\"ROLE: {role} | ACTION: {action} | BENEFICE: {benef}\")\nelse:\n    print(\"ERREUR: Format User Story non respecte\")"
  },
  {
    "id": "ib2-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "python",
    "title": "Priorisation MoSCoW d’un Backlog",
    "goal": "Calculer la répartition des points d’effort par catégorie MoSCoW dans un sprint ou une release.",
    "brief": "<p>La méthode <strong>MoSCoW</strong> classe les exigences en 4 catégories : <code>Must</code>, <code>Should</code>, <code>Could</code> et <code>Won't</code>.</p><p>Lit sur l’entrée standard :<br>- Première ligne : le nombre <code>N</code> d’exigences.<br>- Les <code>N</code> lignes suivantes : <code>ID;Titre;MoSCoW;Points</code> (Points est un entier &ge; 0).<br>Affiche un dictionnaire JSON avec les totaux par catégorie et le total général au format strict :<br><code>{\"Must\": X, \"Should\": Y, \"Could\": Z, \"Wont\": W, \"Total\": T}</code>.</p>",
    "starter": "import sys\n\nlignes = sys.stdin.read().splitlines()\n\n# À compléter : calculer la répartition budgétaire MoSCoW et vérifier la règle 60/20/20\n",
    "hints": [
      "Initialise un dictionnaire avec {\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 0}.",
      "Attention à mapper \"Won't\" ou \"Wont\" vers la clé \"Wont\" dans la sortie JSON.",
      "Utilise json.dumps(res) pour afficher le JSON sur une seule ligne."
    ],
    "examples": [
      {
        "stdin": "3\nUS-1;Connexion;Must;5\nUS-2;Filtres;Should;3\nUS-3;Theme sombre;Could;2",
        "expected": "{\"Must\": 5, \"Should\": 3, \"Could\": 2, \"Wont\": 0, \"Total\": 10}",
        "note": "Must: 5, Should: 3, Could: 2, Wont: 0, Total: 10 points."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "2\nREQ-01;Paiement;Must;8\nREQ-02;Remboursement;Must;5",
        "expected": "{\"Must\": 13, \"Should\": 0, \"Could\": 0, \"Wont\": 0, \"Total\": 13}"
      },
      {
        "label": "Test 2",
        "stdin": "4\nUS-10;Export;Could;3\nUS-11;Audit;Wont;5\nUS-12;SSO;Must;8\nUS-13;PDF;Should;5",
        "expected": "{\"Must\": 8, \"Should\": 5, \"Could\": 3, \"Wont\": 5, \"Total\": 21}"
      },
      {
        "label": "Test 3",
        "stdin": "1\nUS-99;Refonte globale;Won't;13",
        "expected": "{\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 13, \"Total\": 13}"
      }
    ],
    "solution": "import json, sys\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\nif not lignes:\n    sys.exit(0)\n\nn = int(lignes[0])\ntotaux = {\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 0}\n\nfor l in lignes[1:n+1]:\n    parts = l.split(\";\")\n    if len(parts) >= 4:\n        cat = parts[2].strip()\n        sp = int(parts[3].strip())\n        if cat in {\"Wont\", \"Won't\", \"wont\", \"won't\"}:\n            totaux[\"Wont\"] += sp\n        elif cat.capitalize() in totaux:\n            totaux[cat.capitalize()] += sp\n\ntotaux[\"Total\"] = sum(totaux.values())\nprint(json.dumps(totaux))"
  },
  {
    "id": "ib2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "python",
    "title": "Ordonnancement WSJF (Weighted Shortest Job First)",
    "goal": "Calculer le score d’opportunité WSJF pour ordonnancer les fonctionnalités les plus rentables.",
    "brief": "<p>En méthodologie agile à l’échelle (SAFe), l’algorithme <strong>WSJF</strong> priorise les fonctionnalités maximisant la valeur par unité de temps :<br>1. <strong>CoD (Cost of Delay / Coût du retard)</strong> = <code>Valeur_Metier + Criticite_Temporelle + Reduction_Risque</code>.<br>2. <strong>Score WSJF</strong> = <code>CoD / Taille_Job</code>.</p><p>Lit une ligne au format <code>ID;Valeur;Temps;Risque;Taille</code> (les 4 métriques sont des entiers &gt; 0).<br>Affiche : <code>ID: &lt;ID&gt; | CoD: &lt;CoD&gt; | WSJF: &lt;Score arrondi à 2 décimales&gt;</code>.</p>",
    "starter": "ligne = input().strip()\n\n# À compléter : calculer le Cost of Delay et le score WSJF\n",
    "hints": [
      "Découpe la ligne avec split(\";\").",
      "Calcule cod = val + temps + risque, puis wsjf = cod / taille.",
      "Formate le score avec f\"{wsjf:.2f}\"."
    ],
    "examples": [
      {
        "stdin": "FEAT-101;8;5;3;2",
        "expected": "ID: FEAT-101 | CoD: 16 | WSJF: 8.00",
        "note": "CoD = 8 + 5 + 3 = 16. WSJF = 16 / 2 = 8.00."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "FEAT-202;10;8;6;5",
        "expected": "ID: FEAT-202 | CoD: 24 | WSJF: 4.80"
      },
      {
        "label": "Test 2",
        "stdin": "FEAT-303;3;2;1;3",
        "expected": "ID: FEAT-303 | CoD: 6 | WSJF: 2.00"
      },
      {
        "label": "Test 3",
        "stdin": "FEAT-404;13;8;5;8",
        "expected": "ID: FEAT-404 | CoD: 26 | WSJF: 3.25"
      }
    ],
    "solution": "import sys\n\nligne = sys.stdin.readline().strip()\nparts = ligne.split(\";\")\n\nfid = parts[0]\nvaleur = int(parts[1])\ntemps = int(parts[2])\nrisque = int(parts[3])\ntaille = int(parts[4])\n\ncod = valeur + temps + risque\nwsjf = cod / float(taille)\n\nprint(f\"ID: {fid} | CoD: {cod} | WSJF: {wsjf:.2f}\")"
  }
];
