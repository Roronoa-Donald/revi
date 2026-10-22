/**
 * chapitre4.js — Études de cas du cours « b3-document-technique ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "dt3-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "Validateur de spécification de route d’API REST (OpenAPI 3.0)",
    goal: "Vérifier la complétude et la conformité REST d’une déclaration d’endpoint documentée.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>ROUTE_CHECK method=&lt;v&gt; path=&lt;v&gt; codes=&lt;c1,c2,...&gt;</code>.<br><br>\nRègles de validation OpenAPI :<br>\n1. <code>method</code> : doit appartenir à <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code>, <code>PATCH</code>.<br>\n2. <code>path</code> : doit commencer par <code>/api/</code> ou <code>/v</code> (ex. <code>/v1/</code>, <code>/v2/</code>).<br>\n3. <code>codes</code> : doit contenir au moins un code de succès (commençant par <code>2</code>, ex. <code>200</code>, <code>201</code>, <code>204</code>) <strong>ET</strong> au moins un code d'erreur client ou serveur (commençant par <code>4</code> ou <code>5</code>, ex. <code>400</code>, <code>404</code>, <code>500</code>).<br><br>\nStatut :<br>\n- Si tous les critères sont respectés : <code>STATUT=ROUTE_OPENAPI_VALIDE</code><br>\n- Sinon : <code>STATUT=NON_CONFORME (ERREURS=[&lt;erreurs_ordonnees&gt;])</code><br>\n(Ordre d'évaluation : <code>METHODE_INVALIDE</code>, <code>PATH_NON_NORMALISE</code>, <code>CODES_INCOMPLETS</code>).<br><br>\nAfficher :<br>\n<code>OPENAPI_CHECK: &lt;METHOD&gt; &lt;path&gt; -&gt; STATUT=&lt;STATUT&gt;</code></p>",
    starter: "# Grille d'analyse (dt3-c4-e1) — Validateur de spécification de route d’API REST (OpenAPI 3.0)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Méthode HTTP et chemin non conformes]\n# Données : ROUTE_CHECK method=FETCH path=/users codes=200,404\nA_COMPLETER\n\n[Cas 2 — Codes HTTP incomplets sans gestion d’erreur documentée]\n# Données : ROUTE_CHECK method=POST path=/v1/auth/login codes=200,201\nA_COMPLETER\n\n[Cas 3 — Route d’API avec DELETE parfaitement documentée]\n# Données : ROUTE_CHECK method=DELETE path=/api/items/42 codes=204,400,404,500\nA_COMPLETER\n",
    hints: [
          "Vérifier que la liste des codes contient au moins un 2xx et au moins un 4xx/5xx.",
          "Tester la présence de /api/ ou /v au début du chemin."
    ],
    examples: [
          {
                "stdin": "ROUTE_CHECK method=GET path=/api/users codes=200,404,500",
                "expected": "OPENAPI_CHECK: GET /api/users -> STATUT=ROUTE_OPENAPI_VALIDE",
                "note": "Méthode, chemin et codes 2xx/4xx valides."
          }
    ],
    tests: [
          {
                "label": "Méthode HTTP et chemin non conformes",
                "stdin": "cas:1",
                "expected": "OPENAPI_CHECK: FETCH /users -> STATUT=NON_CONFORME (ERREURS=[METHODE_INVALIDE, PATH_NON_NORMALISE])"
          },
          {
                "label": "Codes HTTP incomplets sans gestion d’erreur documentée",
                "stdin": "cas:2",
                "expected": "OPENAPI_CHECK: POST /v1/auth/login -> STATUT=NON_CONFORME (ERREURS=[CODES_INCOMPLETS])"
          },
          {
                "label": "Route d’API avec DELETE parfaitement documentée",
                "stdin": "cas:3",
                "expected": "OPENAPI_CHECK: DELETE /api/items/42 -> STATUT=ROUTE_OPENAPI_VALIDE"
          }
    ],
    solution: "[Exemple]\nOPENAPI_CHECK: GET /api/users -> STATUT=ROUTE_OPENAPI_VALIDE\n\n[Cas 1 — Méthode HTTP et chemin non conformes]\nOPENAPI_CHECK: FETCH /users -> STATUT=NON_CONFORME (ERREURS=[METHODE_INVALIDE, PATH_NON_NORMALISE])\n\n[Cas 2 — Codes HTTP incomplets sans gestion d’erreur documentée]\nOPENAPI_CHECK: POST /v1/auth/login -> STATUT=NON_CONFORME (ERREURS=[CODES_INCOMPLETS])\n\n[Cas 3 — Route d’API avec DELETE parfaitement documentée]\nOPENAPI_CHECK: DELETE /api/items/42 -> STATUT=ROUTE_OPENAPI_VALIDE\n"
  },
  {
    id: "dt3-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Extracteur et auditeur de docstrings de code (Format Google / Sphinx)",
    goal: "Vérifier qu’une fonction de code possède une documentation complète de ses paramètres et de sa valeur de retour.",
    brief: "<p>Pour chaque cas d’application des lignes au format :<br>\n<code>DOCSTRING_AUDIT fn=&lt;nom&gt; params=&lt;p1,p2,...&gt; doc=&lt;chaine_docstring&gt;</code>.<br><br>\nRègles d'évaluation de la docstring :<br>\n- Paramètres documentés : pour chaque paramètre $p_i$ présent dans la liste <code>params</code>, vérifier si le mot <code>p_i:</code> ou <code>p_i (</code> apparaît dans <code>doc</code>.<br>\n- Section retour : le mot <code>Returns:</code> ou <code>Return:</code> ou <code>return:</code> doit apparaître dans <code>doc</code>.<br><br>\nCalculs :<br>\n- Paramètres manquants : liste ordonnée des paramètres déclarés dans <code>params</code> mais non trouvés dans la doc.<br>\n- Manque retour : si la section de retour est absente, ajouter <code>RETURNS_MANQUANT</code> à la liste des manques.<br><br>\nQualité :<br>\n- Si aucun paramètre manquant et retour présent :<br>\n  <code>QUALITE=DOCSTRING_COMPLETE_VALIDE</code><br>\n- Sinon :<br>\n  <code>QUALITE=DOCSTRING_INCOMPLETE (MANQUES=[&lt;manques&gt;])</code><br><br>\nAfficher :<br>\n<code>DOCSTRING_AUDIT: &lt;fn&gt; -&gt; QUALITE=&lt;QUALITE&gt;</code></p>",
    starter: "# Grille d'analyse (dt3-c4-e2) — Extracteur et auditeur de docstrings de code (Format Google / Sphinx)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Paramètre omis dans la documentation]\n# Données : DOCSTRING_AUDIT fn=envoyer_mail params=destinataire,sujet,contenu doc=Envoi de mail. Args: destinataire: adresse. sujet: titre. Returns: bool\nA_COMPLETER\n\n[Cas 2 — Section Returns absente]\n# Données : DOCSTRING_AUDIT fn=somme params=a,b doc=Additionne deux entiers. Args: a: premier. b: second.\nA_COMPLETER\n\n[Cas 3 — Multiples omissions paramètres et section Returns]\n# Données : DOCSTRING_AUDIT fn=authentifier params=user,pwd,role doc=Authentifie un utilisateur. Args: user: identifiant.\nA_COMPLETER\n",
    hints: [
          "Découper les paramètres et vérifier leur présence dans le texte de la doc.",
          "Vérifier la présence de Returns: ou return:."
    ],
    examples: [
          {
                "stdin": "DOCSTRING_AUDIT fn=calculer_tva params=montant_ht,taux doc=Calcul du montant. Args: montant_ht (float): base. taux (float): taux. Returns: float",
                "expected": "DOCSTRING_AUDIT: calculer_tva -> QUALITE=DOCSTRING_COMPLETE_VALIDE",
                "note": "Tous les paramètres et Returns sont documentés."
          }
    ],
    tests: [
          {
                "label": "Paramètre omis dans la documentation",
                "stdin": "cas:1",
                "expected": "DOCSTRING_AUDIT: envoyer_mail -> QUALITE=DOCSTRING_INCOMPLETE (MANQUES=[contenu])"
          },
          {
                "label": "Section Returns absente",
                "stdin": "cas:2",
                "expected": "DOCSTRING_AUDIT: somme -> QUALITE=DOCSTRING_INCOMPLETE (MANQUES=[RETURNS_MANQUANT])"
          },
          {
                "label": "Multiples omissions paramètres et section Returns",
                "stdin": "cas:3",
                "expected": "DOCSTRING_AUDIT: authentifier -> QUALITE=DOCSTRING_INCOMPLETE (MANQUES=[pwd, role, RETURNS_MANQUANT])"
          }
    ],
    solution: "[Exemple]\nDOCSTRING_AUDIT: calculer_tva -> QUALITE=DOCSTRING_COMPLETE_VALIDE\n\n[Cas 1 — Paramètre omis dans la documentation]\nDOCSTRING_AUDIT: envoyer_mail -> QUALITE=DOCSTRING_INCOMPLETE (MANQUES=[contenu])\n\n[Cas 2 — Section Returns absente]\nDOCSTRING_AUDIT: somme -> QUALITE=DOCSTRING_INCOMPLETE (MANQUES=[RETURNS_MANQUANT])\n\n[Cas 3 — Multiples omissions paramètres et section Returns]\nDOCSTRING_AUDIT: authentifier -> QUALITE=DOCSTRING_INCOMPLETE (MANQUES=[pwd, role, RETURNS_MANQUANT])\n"
  },
  {
    id: "dt3-c4-e3",
    chapter: 4,
    level: "n3",
    language: 'analyse',
    title: "Validateur de contrat de schéma JSON (JSON Schema Contract)",
    goal: "Vérifier la conformité typée d’un payload JSON produit par un endpoint par rapport au schéma contractuel documenté.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>SCHEMA_CHECK endpoint=&lt;path&gt; requis=&lt;c1:type,c2:type,...&gt; payload=&lt;json_string&gt;</code>.<br><br>\nTypes supportés dans <code>requis</code> : <code>str</code>, <code>int</code>, <code>bool</code>, <code>float</code>.<br><br>\nRègles de validation :<br>\n- Analyser le <code>payload</code> (format JSON valide).<br>\n- Pour chaque champ <code>champ:type_attendu</code> déclaré dans <code>requis</code> :<br>\n  1. Vérifier si <code>champ</code> existe dans l'objet JSON. Si absent :<br>\n     erreur : <code>CHAMP_MANQUANT:&lt;champ&gt;</code>.<br>\n  2. Si présent, vérifier la compatibilité du type :<br>\n     - <code>int</code> : doit être un entier numérique (attention de manière méthodique : <code>bool</code> hérite de <code>int</code>, veiller à ce que <code>isinstance(v, int) and not isinstance(v, bool)</code>).<br>\n     - <code>float</code> : doit être un nombre flottant ou entier.<br>\n     - <code>str</code> : doit être une chaîne de caractères.<br>\n     - <code>bool</code> : doit être un booléen (<code>True</code> ou <code>False</code>).<br>\n     Si le type ne concorde pas : erreur <code>TYPE_INCORRECT:&lt;champ&gt;(attendu=&lt;type&gt;,recu=&lt;type_reel&gt;)</code>.<br><br>\nVerdict :<br>\n- Si aucune erreur : <code>VERDICT=CONTRAT_RESPECTE</code><br>\n- Sinon : <code>VERDICT=VIOLATION_CONTRAT (ERREURS=[&lt;erreurs&gt;])</code><br><br>\nAfficher :<br>\n<code>CONTRACT_VALIDATION: &lt;endpoint&gt; -&gt; VERDICT=&lt;VERDICT&gt;</code></p>",
    starter: "# Grille d'analyse (dt3-c4-e3) — Validateur de contrat de schéma JSON (JSON Schema Contract)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Champ obligatoire manquant]\n# Données : SCHEMA_CHECK endpoint=/api/user requis=id:int,nom:str,email:str payload={\"id\": 10, \"nom\": \"Bob\"}\nA_COMPLETER\n\n[Cas 2 — Type incorrect string au lieu de int]\n# Données : SCHEMA_CHECK endpoint=/api/order requis=id:int,total:float payload={\"id\": \"ABC\", \"total\": 99.5}\nA_COMPLETER\n\n[Cas 3 — Multiples erreurs champ manquant et type bool incorrect]\n# Données : SCHEMA_CHECK endpoint=/api/item requis=ref:str,prix:float,dispo:bool payload={\"ref\": \"REF-1\", \"dispo\": \"oui\"}\nA_COMPLETER\n",
    hints: [
          "Utiliser json.loads pour parser le payload.",
          "Attention au piège Python : isinstance(True, int) vaut True, vérifier le type bool en priorité."
    ],
    examples: [
          {
                "stdin": "SCHEMA_CHECK endpoint=/api/user requis=id:int,nom:str,actif:bool payload={\"id\": 10, \"nom\": \"Alice\", \"actif\": true}",
                "expected": "CONTRACT_VALIDATION: /api/user -> VERDICT=CONTRAT_RESPECTE",
                "note": "Tous les champs sont présents avec les bons types."
          }
    ],
    tests: [
          {
                "label": "Champ obligatoire manquant",
                "stdin": "cas:1",
                "expected": "CONTRACT_VALIDATION: /api/user -> VERDICT=VIOLATION_CONTRAT (ERREURS=[CHAMP_MANQUANT:email])"
          },
          {
                "label": "Type incorrect string au lieu de int",
                "stdin": "cas:2",
                "expected": "CONTRACT_VALIDATION: /api/order -> VERDICT=VIOLATION_CONTRAT (ERREURS=[TYPE_INCORRECT:id(attendu=int,recu=str)])"
          },
          {
                "label": "Multiples erreurs champ manquant et type bool incorrect",
                "stdin": "cas:3",
                "expected": "CONTRACT_VALIDATION: /api/item -> VERDICT=VIOLATION_CONTRAT (ERREURS=[CHAMP_MANQUANT:prix, TYPE_INCORRECT:dispo(attendu=bool,recu=str)])"
          }
    ],
    solution: "[Exemple]\nCONTRACT_VALIDATION: /api/user -> VERDICT=CONTRAT_RESPECTE\n\n[Cas 1 — Champ obligatoire manquant]\nCONTRACT_VALIDATION: /api/user -> VERDICT=VIOLATION_CONTRAT (ERREURS=[CHAMP_MANQUANT:email])\n\n[Cas 2 — Type incorrect string au lieu de int]\nCONTRACT_VALIDATION: /api/order -> VERDICT=VIOLATION_CONTRAT (ERREURS=[TYPE_INCORRECT:id(attendu=int,recu=str)])\n\n[Cas 3 — Multiples erreurs champ manquant et type bool incorrect]\nCONTRACT_VALIDATION: /api/item -> VERDICT=VIOLATION_CONTRAT (ERREURS=[CHAMP_MANQUANT:prix, TYPE_INCORRECT:dispo(attendu=bool,recu=str)])\n"
  }
];
