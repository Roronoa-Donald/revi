'use strict';

module.exports = [
  {
    "id": "cs2-c4-e1",
    "chapter": 4,
    "title": "Détecteur de motifs d’injection SQL (SQLi)",
    "level": "n1",
    "language": "analyse",
    "goal": "Détecteur de motifs d’injection SQL (SQLi)",
    "brief": "<p>L’injection SQL permet à un attaquant de modifier la structure d’une requête exécutée par la base de données. Votre programme analyse une chaîne de saisie utilisateur à la recherche de signatures SQLi classiques (insensible à la casse) :\n- <code>' or </code>\n- <code>' and </code>\n- <code> union select </code>\n- <code>--</code>\n- <code>/*</code>\n- <code> sleep(</code>\n- <code>'='</code>\n\nRésultat d’analyse attendu :\n- Si un motif est trouvé : <code>INJECTION SQL DETECTEE (motif: &lt;motif&gt;)</code> (afficher le premier motif trouvé dans l’ordre de la liste ci-dessus).\n- Sinon : <code>ENTREE VALIDEE</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c4-e1) — Détecteur de motifs d’injection SQL (SQLi)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : jean.dupont@entreprise.fr\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : 1 UNION SELECT username, password FROM users\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : 1; DROP TABLE clients; -- commentaire\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : '='\nA_COMPLETER\n",
    "hints": [
      "Identifiez les caractères syntaxiques d’échappement SQL (guillemets, double tiret de commentaire, clauses OR 1=1).",
      "La parade absolue contre l’injection SQL est l’utilisation exclusive de requêtes préparées paramétrées."
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
        "stdin": "cas:1",
        "expected": "ENTREE VALIDEE"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "INJECTION SQL DETECTEE (motif:  union select )"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "INJECTION SQL DETECTEE (motif: --)"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "INJECTION SQL DETECTEE (motif: '=')"
      }
    ],
    "solution": "[Exemple]\nINJECTION SQL DETECTEE (motif: ' or )\n\n[Cas 1 — Test de validation 1]\nENTREE VALIDEE\n\n[Cas 2 — Test de validation 2]\nINJECTION SQL DETECTEE (motif:  union select )\n\n[Cas 3 — Test de validation 3]\nINJECTION SQL DETECTEE (motif: --)\n\n[Cas 4 — Test de validation 4]\nINJECTION SQL DETECTEE (motif: '=')"
  },
  {
    "id": "cs2-c4-e2",
    "chapter": 4,
    "title": "Encodage pédagogique de texte HTML",
    "level": "n2",
    "language": "analyse",
    "goal": "Encoder cinq caractères pour afficher une chaîne comme texte HTML dans un élément non exécutable.",
    "brief": "<p>Dans cette grille, une chaîne doit être affichée comme texte HTML dans un élément ordinaire, non dans un script, un attribut ou une URL. Appliquez ces substitutions en commençant par le perluète :\n1. <code>&amp;</code> &rarr; <code>&amp;amp;</code>\n2. <code>&lt;</code> &rarr; <code>&amp;lt;</code>\n3. <code>&gt;</code> &rarr; <code>&amp;gt;</code>\n4. <code>\"</code> &rarr; <code>&amp;quot;</code>\n5. <code>'</code> &rarr; <code>&amp;#x27;</code>\n\nEntrée : une chaîne quelconque. Résultat : la chaîne encodée selon ce modèle. Ce traitement ne garantit pas la sécurité dans un attribut, une URL ou du JavaScript ; il n’est pas un assainisseur de HTML. En pratique, privilégiez un récepteur de texte comme <code>textContent</code> et adaptez la protection à chaque contexte.</p>",
    "starter": "# Grille d'analyse (cs2-c4-e2) — Encodage pédagogique de texte HTML\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : Bonjour & bienvenue !\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : <img src=x onerror='alert(1)'>\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : Texte normal sans caracteres speciaux 123\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : \"A & B\" < \"C & D\"\nA_COMPLETER\n",
    "hints": [
      "Le modèle concerne uniquement une insertion en texte HTML, pas l'évaluation d'une URL ni l'exécution de JavaScript.",
      "Encodez le perluète en premier, puis les quatre autres caractères ; l'assainissement de HTML autorisé est une autre opération."
    ],
    "examples": [
      {
        "stdin": "<script>alert(\"XSS & Pwned\");</script>",
        "expected": "&lt;script&gt;alert(&quot;XSS &amp; Pwned&quot;);&lt;/script&gt;",
        "note": "Encodage pour une insertion en texte HTML ; les autres contextes demandent leurs propres protections."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "cas:1",
        "expected": "Bonjour &amp; bienvenue !"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "&lt;img src=x onerror=&#x27;alert(1)&#x27;&gt;"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "Texte normal sans caracteres speciaux 123"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "&quot;A &amp; B&quot; &lt; &quot;C &amp; D&quot;"
      }
    ],
    "solution": "[Exemple]\n&lt;script&gt;alert(&quot;XSS &amp; Pwned&quot;);&lt;/script&gt;\n\n[Cas 1 — Test de validation 1]\nBonjour &amp; bienvenue !\n\n[Cas 2 — Test de validation 2]\n&lt;img src=x onerror=&#x27;alert(1)&#x27;&gt;\n\n[Cas 3 — Test de validation 3]\nTexte normal sans caracteres speciaux 123\n\n[Cas 4 — Test de validation 4]\n&quot;A &amp; B&quot; &lt; &quot;C &amp; D&quot;"
  },
  {
    "id": "cs2-c4-e3",
    "chapter": 4,
    "title": "Contrôleur d’accès contre les failles IDOR (Broken Object Level Auth)",
    "level": "n3",
    "language": "analyse",
    "goal": "Contrôleur d’accès contre les failles IDOR (Broken Object Level Auth)",
    "brief": "<p>Une faille IDOR (Insecure Direct Object Reference) permet à un utilisateur d’accéder aux ressources privées d’autrui simplement en modifiant un identifiant dans l’URL ou la requête.\n\nEntrée : <code>user_id;user_role;requested_doc_id;owner_doc_id</code>\nRègles d’autorisation :\n1. Si <code>user_role == \"admin\"</code> : l’accès est accordé avec le motif <code>ACCES AUTORISE (admin override)</code>.\n2. Sinon, si <code>user_id == owner_doc_id</code> : l’utilisateur est le propriétaire légitime, accès accordé : <code>ACCES AUTORISE (proprietaire)</code>.\n3. Sinon : refus d’accès et alerte sécurité : <code>ALERTE IDOR: utilisateur &lt;user_id&gt; non autorise sur document &lt;requested_doc_id&gt; de &lt;owner_doc_id&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c4-e3) — Contrôleur d’accès contre les failles IDOR (Broken Object Level Auth)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : u101;client;doc42;u101\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : u999;admin;doc42;u101\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : u202;client;facture_88;u303\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : u505;user;profil_505;u505\nA_COMPLETER\n",
    "hints": [
      "La vulnérabilité IDOR survient lorsqu’un contrôle d’autorisation omet de vérifier le propriétaire légitime de l’objet.",
      "Validez que le jeton de session de l’utilisateur correspond formellement au compte propriétaire de la ressource."
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
        "stdin": "cas:1",
        "expected": "ACCES AUTORISE (proprietaire)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "ACCES AUTORISE (admin override)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "ALERTE IDOR: utilisateur u202 non autorise sur document facture_88 de u303"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "ACCES AUTORISE (proprietaire)"
      }
    ],
    "solution": "[Exemple]\nALERTE IDOR: utilisateur u101 non autorise sur document doc42 de doc42_owner_u101\n\n[Cas 1 — Test de validation 1]\nACCES AUTORISE (proprietaire)\n\n[Cas 2 — Test de validation 2]\nACCES AUTORISE (admin override)\n\n[Cas 3 — Test de validation 3]\nALERTE IDOR: utilisateur u202 non autorise sur document facture_88 de u303\n\n[Cas 4 — Test de validation 4]\nACCES AUTORISE (proprietaire)"
  }
];
