/**
 * Exercices du chapitre 5 — Cybersécurité B2.
 */
'use strict';

module.exports = [
  {
    "id": "cs2-c5-e1",
    "chapter": 5,
    "title": "Dérivation itérative de mot de passe avec sel (Key Stretching)",
    "level": "n1",
    "language": "python",
    "goal": "Dérivation itérative de mot de passe avec sel (Key Stretching)",
    "brief": "<p>Pour ralentir les attaques par table arc-en-ciel et force brute sur GPU, les fonctions de dérivation de clé modernes (Argon2, PBKDF2) appliquent un hachage itératif renforcé par un sel cryptographique unique.\n\nEntrée : <code>mot_de_passe;sel;iterations</code> (ex. <code>Azerty123;sel_unique_42;10</code>).\n\nAlgorithme :\n1. Première itération : $h_1 = \\text{sha256}(mot\\_de\\_passe + sel)$.\n2. Pour chaque étape $k$ de 2 à $iterations$ inclus : $h_k = \\text{sha256}(h_{k-1} + sel)$ (où $h_{k-1}$ est la chaîne hexadécimale en minuscules de l’étape précédente concaténée au sel ASCII).\n3. Sortie : <code>Cle: &lt;h_final&gt; | Sel: &lt;sel&gt; | Iterations: &lt;iterations&gt;</code>.</p>",
    "starter": "import sys, hashlib\n\nligne = sys.stdin.read().strip()\n\n# À compléter : calculer le hachage itératif avec sel\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "Azerty123;sel_unique_42;3",
        "expected": "Cle: 01e9866dcf0c6e5864a596c3bf533d1094094bdddf255073a9689ea798116769 | Sel: sel_unique_42 | Iterations: 3",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "Azerty123;sel_unique_42;1",
        "expected": "Cle: 31df3913a944438dddcb601a9b037db37fe43cbed49b371e5842ec54f3f5e1cb | Sel: sel_unique_42 | Iterations: 1"
      },
      {
        "label": "Test de validation 2",
        "stdin": "SuperSecret2026;salt99;5",
        "expected": "Cle: dc26d5c32ca6d0b33b2bd8b1e17136cd7acc6d5b454432b97d21c3e0cd8d2614 | Sel: salt99 | Iterations: 5"
      },
      {
        "label": "Test de validation 3",
        "stdin": "admin;abc;2",
        "expected": "Cle: db2fdc110bb234a6dd72f9f13c49d6f0c81e5ec45c6f385aa969291e95e24f7a | Sel: abc | Iterations: 2"
      },
      {
        "label": "Test de validation 4",
        "stdin": "root;xyz;4",
        "expected": "Cle: 7eee2c9f3d8c94e7d1abf5996ec85bc04fc0ded1d0b3e5c8b822c831d0b5f992 | Sel: xyz | Iterations: 4"
      }
    ],
    "solution": "import sys, hashlib\n\nligne = sys.stdin.read().strip()\nif ligne:\n    pwd, salt, it_s = ligne.split(\";\")\n    iterations = int(it_s.strip())\n    cur = hashlib.sha256((pwd + salt).encode(\"utf-8\")).hexdigest().lower()\n    for _ in range(iterations - 1):\n        cur = hashlib.sha256((cur + salt).encode(\"utf-8\")).hexdigest().lower()\n    print(f\"Cle: {cur} | Sel: {salt} | Iterations: {iterations}\")\n"
  },
  {
    "id": "cs2-c5-e2",
    "chapter": 5,
    "title": "Validateur de jeton JWT et détection de faille alg=none",
    "level": "n2",
    "language": "python",
    "goal": "Validateur de jeton JWT et détection de faille alg=none",
    "brief": "<p>Un jeton JWT (JSON Web Token) est composé de 3 parties encodées en Base64URL : <code>header.payload.signature</code>.\n\nEntrée : <code>jwt_string;timestamp_actuel</code>\nTraitement :\n1. Vérifier la présence des 3 segments séparés par un point. Si incorrect &rarr; <code>REJET: format JWT invalide</code>.\n2. Décoder le Header (base64url avec padding adéquat `=`). Si le champ <code>\"alg\"</code> vaut <code>\"none\"</code> (ou est manquant) &rarr;    <code>REJET: algorithme non securise (alg=none)</code>.\n3. Décoder le Payload (base64url). Extraire <code>\"sub\"</code> (ou <code>\"user\"</code>), <code>\"role\"</code> et <code>\"exp\"</code> (timestamp d’expiration).\n4. Si <code>timestamp_actuel &gt; exp</code> &rarr; <code>REJET: jeton expire (exp=&lt;exp&gt;, now=&lt;now&gt;)</code>.\n5. Sinon &rarr; <code>VALIDE: utilisateur=&lt;sub&gt;, role=&lt;role&gt;</code>.</p>",
    "starter": "import sys, json, base64\n\nligne = sys.stdin.read().strip()\n\n# À compléter : décoder et valider le jeton JWT\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbGljZSIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTc1MDAwMDAwMH0.signatureFactice;1700000000",
        "expected": "VALIDE: utilisateur=alice, role=admin",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiJoYWNrZXIiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE4MDAwMDAwMDB9.;1700000000",
        "expected": "REJET: algorithme non securise (alg=none)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJib2IiLCJyb2xlIjoidXNlciIsImV4cCI6MTYwMDAwMDAwMH0.signature;1700000000",
        "expected": "REJET: jeton expire (exp=1600000000, now=1700000000)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "token_malforme_sans_trois_parties;1700000000",
        "expected": "REJET: format JWT invalide"
      },
      {
        "label": "Test de validation 4",
        "stdin": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjaGFybGllIiwicm9sZSI6Im1vZGVyYXRvciIsImV4cCI6MTkwMDAwMDAwMH0.sig;1700000000",
        "expected": "VALIDE: utilisateur=charlie, role=moderator"
      }
    ],
    "solution": "import sys, json, base64\n\ndef b64url_decode(s):\n    s = s.replace(\"-\", \"+\").replace(\"_\", \"/\")\n    padding = (4 - len(s) % 4) % 4\n    s += \"=\" * padding\n    return json.loads(base64.b64decode(s).decode(\"utf-8\"))\n\nligne = sys.stdin.read().strip()\nif ligne:\n    jwt_s, now_s = ligne.split(\";\")\n    now = int(now_s.strip())\n    parts = jwt_s.strip().split(\".\")\n    if len(parts) != 3:\n        print(\"REJET: format JWT invalide\")\n        sys.exit(0)\n    header_b64, payload_b64, sig = parts\n    try:\n        header = b64url_decode(header_b64)\n        payload = b64url_decode(payload_b64)\n    except Exception:\n        print(\"REJET: format JWT invalide\")\n        sys.exit(0)\n    alg = header.get(\"alg\", \"\").lower()\n    if not alg or alg == \"none\":\n        print(\"REJET: algorithme non securise (alg=none)\")\n        sys.exit(0)\n    exp = payload.get(\"exp\", 0)\n    if now > exp:\n        print(f\"REJET: jeton expire (exp={exp}, now={now})\")\n        sys.exit(0)\n    user = payload.get(\"sub\", payload.get(\"user\", \"inconnu\"))\n    role = payload.get(\"role\", \"none\")\n    print(f\"VALIDE: utilisateur={user}, role={role}\")\n"
  },
  {
    "id": "cs2-c5-e3",
    "chapter": 5,
    "title": "Moteur de contrôle d’accès basé sur les rôles (RBAC)",
    "level": "n3",
    "language": "python",
    "goal": "Moteur de contrôle d’accès basé sur les rôles (RBAC)",
    "brief": "<p>Dans le modèle RBAC (Role-Based Access Control), les permissions sont associées à des rôles, et les utilisateurs reçoivent un ou plusieurs rôles.\n\nEntrée :\n- Ligne 1 : Définition des rôles <code>ROLE:perm1,perm2|ROLE:perm3...</code> (ex. <code>ADMIN:read,write,delete|USER:read</code>).\n- Ligne 2 : Affectation des utilisateurs <code>USER:ROLE|USER:ROLE...</code> (ex. <code>alice:ADMIN|bob:USER</code>).\n- Ligne 3 : Requête d’accès sous la forme <code>USER action</code> (ex. <code>bob write</code>).\n\nSortie :\n- Si autorisé : <code>ACCES ACCORDE (&lt;USER&gt; en tant que &lt;ROLE&gt; possede &lt;action&gt;)</code>\n- Si refusé : <code>ACCES REFUSE (&lt;USER&gt; en tant que &lt;ROLE&gt; ne possede pas &lt;action&gt;)</code>\n- Si l’utilisateur est inconnu : <code>UTILISATEUR INCONNU</code>.</p>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\n\n# À compléter : évaluer la permission selon la matrice RBAC\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "ADMIN:read,write,delete|USER:read\nalice:ADMIN|bob:USER\nbob write",
        "expected": "ACCES REFUSE (bob en tant que USER ne possede pas write)",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "ADMIN:read,write,delete|USER:read\nalice:ADMIN|bob:USER\nalice delete",
        "expected": "ACCES ACCORDE (alice en tant que ADMIN possede delete)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "ADMIN:read,write,delete|USER:read\nalice:ADMIN|bob:USER\nbob read",
        "expected": "ACCES ACCORDE (bob en tant que USER possede read)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "ADMIN:read,write,delete|USER:read\nalice:ADMIN|bob:USER\ncharlie read",
        "expected": "UTILISATEUR INCONNU"
      },
      {
        "label": "Test de validation 4",
        "stdin": "AUDITOR:export,audit|DEV:code,test\nsam:AUDITOR\nsam audit",
        "expected": "ACCES ACCORDE (sam en tant que AUDITOR possede audit)"
      }
    ],
    "solution": "import sys\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\nif len(lignes) >= 3:\n    roles_raw = lignes[0].split(\"|\")\n    users_raw = lignes[1].split(\"|\")\n    req_u, req_act = lignes[2].split()\n    role_perms = {}\n    for r in roles_raw:\n        if \":\" in r:\n            r_name, perms = r.split(\":\", 1)\n            role_perms[r_name.strip()] = set(p.strip() for p in perms.split(\",\") if p.strip())\n    user_roles = {}\n    for u in users_raw:\n        if \":\" in u:\n            u_name, r_name = u.split(\":\", 1)\n            user_roles[u_name.strip()] = r_name.strip()\n    if req_u not in user_roles:\n        print(\"UTILISATEUR INCONNU\")\n    else:\n        role = user_roles[req_u]\n        perms = role_perms.get(role, set())\n        if req_act in perms:\n            print(f\"ACCES ACCORDE ({req_u} en tant que {role} possede {req_act})\")\n        else:\n            print(f\"ACCES REFUSE ({req_u} en tant que {role} ne possede pas {req_act})\")\n"
  }
];
