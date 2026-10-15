/**
 * Exercices du chapitre 4 — Cybersécurité B2.
 */
'use strict';

module.exports = [
  {
    "id": "cs2-c4-e1",
    "chapter": 4,
    "title": "Détecteur de motifs d’injection SQL (SQLi)",
    "level": "n1",
    "language": "python",
    "goal": "Détecteur de motifs d’injection SQL (SQLi)",
    "brief": "<p>L’injection SQL permet à un attaquant de modifier la structure d’une requête exécutée par la base de données. Votre programme analyse une chaîne de saisie utilisateur à la recherche de signatures SQLi classiques (insensible à la casse) :\n- <code>' or </code>\n- <code>' and </code>\n- <code> union select </code>\n- <code>--</code>\n- <code>/*</code>\n- <code> sleep(</code>\n- <code>'='</code>\n\nSortie :\n- Si un motif est trouvé : <code>INJECTION SQL DETECTEE (motif: &lt;motif&gt;)</code> (afficher le premier motif trouvé dans l’ordre de la liste ci-dessus).\n- Sinon : <code>ENTREE VALIDEE</code>.</p>",
    "starter": "import sys\n\nsaisie = sys.stdin.read().strip()\n\n# À compléter : rechercher les motifs d’injection SQL\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "admin' OR '1'='1",
        "expected": "INJECTION SQL DETECTEE (motif: ' or )",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "jean.dupont@entreprise.fr",
        "expected": "ENTREE VALIDEE"
      },
      {
        "label": "Test de validation 2",
        "stdin": "1 UNION SELECT username, password FROM users",
        "expected": "INJECTION SQL DETECTEE (motif:  union select )"
      },
      {
        "label": "Test de validation 3",
        "stdin": "1; DROP TABLE clients; -- commentaire",
        "expected": "INJECTION SQL DETECTEE (motif: --)"
      },
      {
        "label": "Test de validation 4",
        "stdin": "'='",
        "expected": "INJECTION SQL DETECTEE (motif: '=')"
      }
    ],
    "solution": "import sys\n\nsaisie = sys.stdin.read().strip()\nmotifs = [\n    \"' or \",\n    \"' and \",\n    \" union select \",\n    \"--\",\n    \"/*\",\n    \" sleep(\",\n    \"'='\"\n]\ntrouve = None\nsaisie_lower = saisie.lower()\nfor m in motifs:\n    if m in saisie_lower:\n        trouve = m\n        break\n\nif trouve:\n    print(f\"INJECTION SQL DETECTEE (motif: {trouve})\")\nelse:\n    print(\"ENTREE VALIDEE\")\n"
  },
  {
    "id": "cs2-c4-e2",
    "chapter": 4,
    "title": "Neutralisateur de charge utile XSS (HTML Sanitizer)",
    "level": "n2",
    "language": "python",
    "goal": "Neutralisateur de charge utile XSS (HTML Sanitizer)",
    "brief": "<p>Les failles Cross-Site Scripting (XSS) surviennent lorsqu’une application web réinjecte des données utilisateur non filtrées dans le code HTML servi au navigateur. Pour neutraliser l’exécution de scripts, les cinq caractères critiques doivent être échappés en entités HTML dans l’ordre rigoureux suivant :\n1. <code>&amp;</code> &rarr; <code>&amp;amp;</code>\n2. <code>&lt;</code> &rarr; <code>&amp;lt;</code>\n3. <code>&gt;</code> &rarr; <code>&amp;gt;</code>\n4. <code>\"</code> &rarr; <code>&amp;quot;</code>\n5. <code>'</code> &rarr; <code>&amp;#x27;</code>\n\nEntrée : Une chaîne de caractères contenant potentiellement des balises ou du JavaScript.\nSortie : La chaîne neutralisée.</p>",
    "starter": "import sys\n\ntexte = sys.stdin.read().rstrip(\"\\r\\n\")\n\n# À compléter : remplacer les 5 caractères spéciaux par leurs entités HTML\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "<script>alert(\"XSS & Pwned\");</script>",
        "expected": "&lt;script&gt;alert(&quot;XSS &amp; Pwned&quot;);&lt;/script&gt;",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "Bonjour & bienvenue !",
        "expected": "Bonjour &amp; bienvenue !"
      },
      {
        "label": "Test de validation 2",
        "stdin": "<img src=x onerror='alert(1)'>",
        "expected": "&lt;img src=x onerror=&#x27;alert(1)&#x27;&gt;"
      },
      {
        "label": "Test de validation 3",
        "stdin": "Texte normal sans caracteres speciaux 123",
        "expected": "Texte normal sans caracteres speciaux 123"
      },
      {
        "label": "Test de validation 4",
        "stdin": "\"A & B\" < \"C & D\"",
        "expected": "&quot;A &amp; B&quot; &lt; &quot;C &amp; D&quot;"
      }
    ],
    "solution": "import sys\n\ntexte = sys.stdin.read().rstrip(\"\\r\\n\")\ntexte = texte.replace(\"&\", \"&amp;\")\ntexte = texte.replace(\"<\", \"&lt;\")\ntexte = texte.replace(\">\", \"&gt;\")\ntexte = texte.replace('\"', \"&quot;\")\ntexte = texte.replace(\"'\", \"&#x27;\")\nprint(texte)\n"
  },
  {
    "id": "cs2-c4-e3",
    "chapter": 4,
    "title": "Contrôleur d’accès contre les failles IDOR (Broken Object Level Auth)",
    "level": "n3",
    "language": "python",
    "goal": "Contrôleur d’accès contre les failles IDOR (Broken Object Level Auth)",
    "brief": "<p>Une faille IDOR (Insecure Direct Object Reference) permet à un utilisateur d’accéder aux ressources privées d’autrui simplement en modifiant un identifiant dans l’URL ou la requête.\n\nEntrée : <code>user_id;user_role;requested_doc_id;owner_doc_id</code>\nRègles d’autorisation :\n1. Si <code>user_role == \"admin\"</code> : l’accès est accordé avec le motif <code>ACCES AUTORISE (admin override)</code>.\n2. Sinon, si <code>user_id == owner_doc_id</code> : l’utilisateur est le propriétaire légitime, accès accordé : <code>ACCES AUTORISE (proprietaire)</code>.\n3. Sinon : refus d’accès et alerte sécurité : <code>ALERTE IDOR: utilisateur &lt;user_id&gt; non autorise sur document &lt;requested_doc_id&gt; de &lt;owner_doc_id&gt;</code>.</p>",
    "starter": "import sys\n\nligne = sys.stdin.read().strip()\n\n# À compléter : valider l’autorisation d’accès sur la ressource\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "u101;client;doc42;doc42_owner_u101",
        "expected": "ALERTE IDOR: utilisateur u101 non autorise sur document doc42 de doc42_owner_u101",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "u101;client;doc42;u101",
        "expected": "ACCES AUTORISE (proprietaire)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "u999;admin;doc42;u101",
        "expected": "ACCES AUTORISE (admin override)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "u202;client;facture_88;u303",
        "expected": "ALERTE IDOR: utilisateur u202 non autorise sur document facture_88 de u303"
      },
      {
        "label": "Test de validation 4",
        "stdin": "u505;user;profil_505;u505",
        "expected": "ACCES AUTORISE (proprietaire)"
      }
    ],
    "solution": "import sys\n\nligne = sys.stdin.read().strip()\nif ligne:\n    parts = [p.strip() for p in ligne.split(\";\") if p.strip()]\n    if len(parts) == 4:\n        uid, role, doc_id, owner_id = parts\n        if role == \"admin\":\n            print(\"ACCES AUTORISE (admin override)\")\n        elif uid == owner_id:\n            print(\"ACCES AUTORISE (proprietaire)\")\n        else:\n            print(f\"ALERTE IDOR: utilisateur {uid} non autorise sur document {doc_id} de {owner_id}\")\n"
  }
];
