'use strict';

module.exports = [
  {
    "id": "cs2-c5-e1",
    "chapter": 5,
    "title": "Dérivation itérative de mot de passe avec sel (Key Stretching)",
    "level": "n1",
    "language": "analyse",
    "goal": "Dérivation itérative de mot de passe avec sel (Key Stretching)",
    "brief": "<p>Pour ralentir les attaques par table arc-en-ciel et force brute sur GPU, les fonctions de dérivation de clé modernes (Argon2, PBKDF2) appliquent un hachage itératif renforcé par un sel cryptographique unique.\n\nEntrée : <code>mot_de_passe;sel;iterations</code> (ex. <code>Azerty123;sel_unique_42;10</code>).\n\nAlgorithme :\n1. Première itération : $h_1 = \\text{sha256}(mot\\_de\\_passe + sel)$.\n2. Pour chaque étape $k$ de 2 à $iterations$ inclus : $h_k = \\text{sha256}(h_{k-1} + sel)$ (où $h_{k-1}$ est la chaîne hexadécimale en minuscules de l’étape précédente concaténée au sel ASCII).\n3. Sortie : <code>Cle: &lt;h_final&gt; | Sel: &lt;sel&gt; | Iterations: &lt;iterations&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c5-e1) — Dérivation itérative de mot de passe avec sel (Key Stretching)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : Azerty123;sel_unique_42;1\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : SuperSecret2026;salt99;5\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : admin;abc;2\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : root;xyz;4\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "Cle: 31df3913a944438dddcb601a9b037db37fe43cbed49b371e5842ec54f3f5e1cb | Sel: sel_unique_42 | Iterations: 1"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "Cle: dc26d5c32ca6d0b33b2bd8b1e17136cd7acc6d5b454432b97d21c3e0cd8d2614 | Sel: salt99 | Iterations: 5"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "Cle: db2fdc110bb234a6dd72f9f13c49d6f0c81e5ec45c6f385aa969291e95e24f7a | Sel: abc | Iterations: 2"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "Cle: 7eee2c9f3d8c94e7d1abf5996ec85bc04fc0ded1d0b3e5c8b822c831d0b5f992 | Sel: xyz | Iterations: 4"
      }
    ],
    "solution": "[Exemple]\nCle: 01e9866dcf0c6e5864a596c3bf533d1094094bdddf255073a9689ea798116769 | Sel: sel_unique_42 | Iterations: 3\n\n[Cas 1 — Test de validation 1]\nCle: 31df3913a944438dddcb601a9b037db37fe43cbed49b371e5842ec54f3f5e1cb | Sel: sel_unique_42 | Iterations: 1\n\n[Cas 2 — Test de validation 2]\nCle: dc26d5c32ca6d0b33b2bd8b1e17136cd7acc6d5b454432b97d21c3e0cd8d2614 | Sel: salt99 | Iterations: 5\n\n[Cas 3 — Test de validation 3]\nCle: db2fdc110bb234a6dd72f9f13c49d6f0c81e5ec45c6f385aa969291e95e24f7a | Sel: abc | Iterations: 2\n\n[Cas 4 — Test de validation 4]\nCle: 7eee2c9f3d8c94e7d1abf5996ec85bc04fc0ded1d0b3e5c8b822c831d0b5f992 | Sel: xyz | Iterations: 4"
  },
  {
    "id": "cs2-c5-e2",
    "chapter": 5,
    "title": "Validateur de jeton JWT et détection de faille alg=none",
    "level": "n2",
    "language": "analyse",
    "goal": "Validateur de jeton JWT et détection de faille alg=none",
    "brief": "<p>Un jeton JWT (JSON Web Token) est composé de 3 parties encodées en Base64URL : <code>header.payload.signature</code>.\n\nEntrée : <code>jwt_string;timestamp_actuel</code>\nTraitement :\n1. Vérifier la présence des 3 segments séparés par un point. Si incorrect &rarr; <code>REJET: format JWT invalide</code>.\n2. Décoder le Header (base64url avec padding adéquat `=`). Si le champ <code>\"alg\"</code> vaut <code>\"none\"</code> (ou est manquant) &rarr;    <code>REJET: algorithme non securise (alg=none)</code>.\n3. Décoder le Payload (base64url). Extraire <code>\"sub\"</code> (ou <code>\"user\"</code>), <code>\"role\"</code> et <code>\"exp\"</code> (timestamp d’expiration).\n4. Si <code>timestamp_actuel &gt; exp</code> &rarr; <code>REJET: jeton expire (exp=&lt;exp&gt;, now=&lt;now&gt;)</code>.\n5. Sinon &rarr; <code>VALIDE: utilisateur=&lt;sub&gt;, role=&lt;role&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c5-e2) — Validateur de jeton JWT et détection de faille alg=none\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiJoYWNrZXIiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE4MDAwMDAwMDB9.;1700000000\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJib2IiLCJyb2xlIjoidXNlciIsImV4cCI6MTYwMDAwMDAwMH0.signature;1700000000\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : token_malforme_sans_trois_parties;1700000000\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjaGFybGllIiwicm9sZSI6Im1vZGVyYXRvciIsImV4cCI6MTkwMDAwMDAwMH0.sig;1700000000\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "REJET: algorithme non securise (alg=none)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "REJET: jeton expire (exp=1600000000, now=1700000000)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "REJET: format JWT invalide"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "VALIDE: utilisateur=charlie, role=moderator"
      }
    ],
    "solution": "[Exemple]\nVALIDE: utilisateur=alice, role=admin\n\n[Cas 1 — Test de validation 1]\nREJET: algorithme non securise (alg=none)\n\n[Cas 2 — Test de validation 2]\nREJET: jeton expire (exp=1600000000, now=1700000000)\n\n[Cas 3 — Test de validation 3]\nREJET: format JWT invalide\n\n[Cas 4 — Test de validation 4]\nVALIDE: utilisateur=charlie, role=moderator"
  },
  {
    "id": "cs2-c5-e3",
    "chapter": 5,
    "title": "Moteur de contrôle d’accès basé sur les rôles (RBAC)",
    "level": "n3",
    "language": "analyse",
    "goal": "Moteur de contrôle d’accès basé sur les rôles (RBAC)",
    "brief": "<p>Dans le modèle RBAC (Role-Based Access Control), les permissions sont associées à des rôles, et les utilisateurs reçoivent un ou plusieurs rôles.\n\nEntrée :\n- Ligne 1 : Définition des rôles <code>ROLE:perm1,perm2|ROLE:perm3...</code> (ex. <code>ADMIN:read,write,delete|USER:read</code>).\n- Ligne 2 : Affectation des utilisateurs <code>USER:ROLE|USER:ROLE...</code> (ex. <code>alice:ADMIN|bob:USER</code>).\n- Ligne 3 : Requête d’accès sous la forme <code>USER action</code> (ex. <code>bob write</code>).\n\nSortie :\n- Si autorisé : <code>ACCES ACCORDE (&lt;USER&gt; en tant que &lt;ROLE&gt; possede &lt;action&gt;)</code>\n- Si refusé : <code>ACCES REFUSE (&lt;USER&gt; en tant que &lt;ROLE&gt; ne possede pas &lt;action&gt;)</code>\n- Si l’utilisateur est inconnu : <code>UTILISATEUR INCONNU</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c5-e3) — Moteur de contrôle d’accès basé sur les rôles (RBAC)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : ADMIN:read,write,delete|USER:read\n# Données : alice:ADMIN|bob:USER\n# Données : alice delete\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : ADMIN:read,write,delete|USER:read\n# Données : alice:ADMIN|bob:USER\n# Données : bob read\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : ADMIN:read,write,delete|USER:read\n# Données : alice:ADMIN|bob:USER\n# Données : charlie read\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : AUDITOR:export,audit|DEV:code,test\n# Données : sam:AUDITOR\n# Données : sam audit\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "ACCES ACCORDE (alice en tant que ADMIN possede delete)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "ACCES ACCORDE (bob en tant que USER possede read)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "UTILISATEUR INCONNU"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "ACCES ACCORDE (sam en tant que AUDITOR possede audit)"
      }
    ],
    "solution": "[Exemple]\nACCES REFUSE (bob en tant que USER ne possede pas write)\n\n[Cas 1 — Test de validation 1]\nACCES ACCORDE (alice en tant que ADMIN possede delete)\n\n[Cas 2 — Test de validation 2]\nACCES ACCORDE (bob en tant que USER possede read)\n\n[Cas 3 — Test de validation 3]\nUTILISATEUR INCONNU\n\n[Cas 4 — Test de validation 4]\nACCES ACCORDE (sam en tant que AUDITOR possede audit)"
  }
];
