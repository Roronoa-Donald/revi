/**
 * Exercices du Chapitre 4 : Documentation d'API & Référence Technique (OpenAPI / Swagger).
 * Préfixe : dt3-c4-e
 */
'use strict';

module.exports = [
  {
    id: 'dt3-c4-e1',
    chapter: 4,
    title: 'Validateur de spécification de route d’API REST (OpenAPI 3.0)',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la complétude et la conformité REST d’une déclaration d’endpoint documentée.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>ROUTE_CHECK method=&lt;v&gt; path=&lt;v&gt; codes=&lt;c1,c2,...&gt;</code>.<br><br>\nRègles de validation OpenAPI :<br>\n1. <code>method</code> : doit appartenir à <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code>, <code>PATCH</code>.<br>\n2. <code>path</code> : doit commencer par <code>/api/</code> ou <code>/v</code> (ex. <code>/v1/</code>, <code>/v2/</code>).<br>\n3. <code>codes</code> : doit contenir au moins un code de succès (commençant par <code>2</code>, ex. <code>200</code>, <code>201</code>, <code>204</code>) <strong>ET</strong> au moins un code d\'erreur client ou serveur (commençant par <code>4</code> ou <code>5</code>, ex. <code>400</code>, <code>404</code>, <code>500</code>).<br><br>\nStatut :<br>\n- Si tous les critères sont respectés : <code>STATUT=ROUTE_OPENAPI_VALIDE</code><br>\n- Sinon : <code>STATUT=NON_CONFORME (ERREURS=[&lt;erreurs_ordonnees&gt;])</code><br>\n(Ordre d\'évaluation : <code>METHODE_INVALIDE</code>, <code>PATH_NON_NORMALISE</code>, <code>CODES_INCOMPLETS</code>).<br><br>\nAfficher :<br>\n<code>OPENAPI_CHECK: &lt;METHOD&gt; &lt;path&gt; -&gt; STATUT=&lt;STATUT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider chaque route OpenAPI
`,
    hints: [
      'Vérifier que la liste des codes contient au moins un 2xx et au moins un 4xx/5xx.',
      'Tester la présence de /api/ ou /v au début du chemin.'
    ],
    examples: [
      {
        stdin: 'ROUTE_CHECK method=GET path=/api/users codes=200,404,500',
        expected: 'OPENAPI_CHECK: GET /api/users -> STATUT=ROUTE_OPENAPI_VALIDE',
        note: 'Méthode, chemin et codes 2xx/4xx valides.'
      }
    ],
    tests: [
      {
        label: 'Méthode HTTP et chemin non conformes',
        stdin: 'ROUTE_CHECK method=FETCH path=/users codes=200,404',
        expected: 'OPENAPI_CHECK: FETCH /users -> STATUT=NON_CONFORME (ERREURS=[METHODE_INVALIDE, PATH_NON_NORMALISE])'
      },
      {
        label: 'Codes HTTP incomplets sans gestion d’erreur documentée',
        stdin: 'ROUTE_CHECK method=POST path=/v1/auth/login codes=200,201',
        expected: 'OPENAPI_CHECK: POST /v1/auth/login -> STATUT=NON_CONFORME (ERREURS=[CODES_INCOMPLETS])'
      },
      {
        label: 'Route d’API avec DELETE parfaitement documentée',
        stdin: 'ROUTE_CHECK method=DELETE path=/api/items/42 codes=204,400,404,500',
        expected: 'OPENAPI_CHECK: DELETE /api/items/42 -> STATUT=ROUTE_OPENAPI_VALIDE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

VALID_METHODS = {'GET', 'POST', 'PUT', 'DELETE', 'PATCH'}

for lig in lignes:
    m_meth = re.search(r'method=([^\\s]+)', lig)
    m_path = re.search(r'path=([^\\s]+)', lig)
    m_codes = re.search(r'codes=([^\\s]+)', lig)
    if not (m_meth and m_path and m_codes):
        continue
    meth = m_meth.group(1).upper()
    path = m_path.group(1)
    codes = [c.strip() for c in m_codes.group(1).split(',') if c.strip()]
    
    erreurs = []
    
    # 1. Methode
    if meth not in VALID_METHODS:
        erreurs.append('METHODE_INVALIDE')
        
    # 2. Path
    if not (path.startswith('/api/') or path.startswith('/v')):
        erreurs.append('PATH_NON_NORMALISE')
        
    # 3. Codes
    has_2xx = any(c.startswith('2') for c in codes)
    has_err = any(c.startswith('4') or c.startswith('5') for c in codes)
    if not (has_2xx and has_err):
        erreurs.append('CODES_INCOMPLETS')
        
    if not erreurs:
        statut = 'ROUTE_OPENAPI_VALIDE'
    else:
        statut = f"NON_CONFORME (ERREURS=[{', '.join(erreurs)}])"
        
    print(f"OPENAPI_CHECK: {meth} {path} -> STATUT={statut}")
`
  },
  {
    id: 'dt3-c4-e2',
    chapter: 4,
    title: 'Extracteur et auditeur de docstrings de code (Format Google / Sphinx)',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier qu’une fonction de code possède une documentation complète de ses paramètres et de sa valeur de retour.',
    brief: '<p>Le script lit sur l\'entrée standard des lignes au format :<br>\n<code>DOCSTRING_AUDIT fn=&lt;nom&gt; params=&lt;p1,p2,...&gt; doc=&lt;chaine_docstring&gt;</code>.<br><br>\nRègles d\'évaluation de la docstring :<br>\n- Paramètres documentés : pour chaque paramètre $p_i$ présent dans la liste <code>params</code>, vérifier si le mot <code>p_i:</code> ou <code>p_i (</code> apparaît dans <code>doc</code>.<br>\n- Section retour : le mot <code>Returns:</code> ou <code>Return:</code> ou <code>return:</code> doit apparaître dans <code>doc</code>.<br><br>\nCalculs :<br>\n- Paramètres manquants : liste ordonnée des paramètres déclarés dans <code>params</code> mais non trouvés dans la doc.<br>\n- Manque retour : si la section de retour est absente, ajouter <code>RETURNS_MANQUANT</code> à la liste des manques.<br><br>\nQualité :<br>\n- Si aucun paramètre manquant et retour présent :<br>\n  <code>QUALITE=DOCSTRING_COMPLETE_VALIDE</code><br>\n- Sinon :<br>\n  <code>QUALITE=DOCSTRING_INCOMPLETE (MANQUES=[&lt;manques&gt;])</code><br><br>\nAfficher :<br>\n<code>DOCSTRING_AUDIT: &lt;fn&gt; -&gt; QUALITE=&lt;QUALITE&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer chaque docstring face à sa signature
`,
    hints: [
      'Découper les paramètres et vérifier leur présence dans le texte de la doc.',
      'Vérifier la présence de Returns: ou return:.'
    ],
    examples: [
      {
        stdin: 'DOCSTRING_AUDIT fn=calculer_tva params=montant_ht,taux doc=Calcul du montant. Args: montant_ht (float): base. taux (float): taux. Returns: float',
        expected: 'DOCSTRING_AUDIT: calculer_tva -> QUALITE=DOCSTRING_COMPLETE_VALIDE',
        note: 'Tous les paramètres et Returns sont documentés.'
      }
    ],
    tests: [
      {
        label: 'Paramètre omis dans la documentation',
        stdin: 'DOCSTRING_AUDIT fn=envoyer_mail params=destinataire,sujet,contenu doc=Envoi de mail. Args: destinataire: adresse. sujet: titre. Returns: bool',
        expected: 'DOCSTRING_AUDIT: envoyer_mail -> QUALITE=DOCSTRING_INCOMPLETE (MANQUES=[contenu])'
      },
      {
        label: 'Section Returns absente',
        stdin: 'DOCSTRING_AUDIT fn=somme params=a,b doc=Additionne deux entiers. Args: a: premier. b: second.',
        expected: 'DOCSTRING_AUDIT: somme -> QUALITE=DOCSTRING_INCOMPLETE (MANQUES=[RETURNS_MANQUANT])'
      },
      {
        label: 'Multiples omissions paramètres et section Returns',
        stdin: 'DOCSTRING_AUDIT fn=authentifier params=user,pwd,role doc=Authentifie un utilisateur. Args: user: identifiant.',
        expected: 'DOCSTRING_AUDIT: authentifier -> QUALITE=DOCSTRING_INCOMPLETE (MANQUES=[pwd, role, RETURNS_MANQUANT])'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'fn=([^\\s]+)\\s+params=([^\\s]+)\\s+doc=(.*)', lig)
    if not m:
        continue
    fn = m.group(1)
    params_str = m.group(2)
    doc = m.group(3)
    
    params = [p.strip() for p in params_str.split(',') if p.strip()]
    manques = []
    
    for p in params:
        # p: ou p (
        pat = rf'\\b{p}\\s*[:(]'
        if not re.search(pat, doc):
            manques.append(p)
            
    if not re.search(r'\\breturn[s]?\\s*:', doc, re.IGNORECASE):
        manques.append('RETURNS_MANQUANT')
        
    if not manques:
        qual = 'DOCSTRING_COMPLETE_VALIDE'
    else:
        qual = f"DOCSTRING_INCOMPLETE (MANQUES=[{', '.join(manques)}])"
        
    print(f"DOCSTRING_AUDIT: {fn} -> QUALITE={qual}")
`
  },
  {
    id: 'dt3-c4-e3',
    chapter: 4,
    title: 'Validateur de contrat de schéma JSON (JSON Schema Contract)',
    level: 'n3',
    language: 'python',
    goal: 'Vérifier la conformité typée d’un payload JSON produit par un endpoint par rapport au schéma contractuel documenté.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>SCHEMA_CHECK endpoint=&lt;path&gt; requis=&lt;c1:type,c2:type,...&gt; payload=&lt;json_string&gt;</code>.<br><br>\nTypes supportés dans <code>requis</code> : <code>str</code>, <code>int</code>, <code>bool</code>, <code>float</code>.<br><br>\nRègles de validation :<br>\n- Analyser le <code>payload</code> (format JSON valide).<br>\n- Pour chaque champ <code>champ:type_attendu</code> déclaré dans <code>requis</code> :<br>\n  1. Vérifier si <code>champ</code> existe dans l\'objet JSON. Si absent :<br>\n     erreur : <code>CHAMP_MANQUANT:&lt;champ&gt;</code>.<br>\n  2. Si présent, vérifier la compatibilité du type :<br>\n     - <code>int</code> : doit être un entier numérique (attention en Python : <code>bool</code> hérite de <code>int</code>, veiller à ce que <code>isinstance(v, int) and not isinstance(v, bool)</code>).<br>\n     - <code>float</code> : doit être un nombre flottant ou entier.<br>\n     - <code>str</code> : doit être une chaîne de caractères.<br>\n     - <code>bool</code> : doit être un booléen (<code>True</code> ou <code>False</code>).<br>\n     Si le type ne concorde pas : erreur <code>TYPE_INCORRECT:&lt;champ&gt;(attendu=&lt;type&gt;,recu=&lt;type_reel&gt;)</code>.<br><br>\nVerdict :<br>\n- Si aucune erreur : <code>VERDICT=CONTRAT_RESPECTE</code><br>\n- Sinon : <code>VERDICT=VIOLATION_CONTRAT (ERREURS=[&lt;erreurs&gt;])</code><br><br>\nAfficher :<br>\n<code>CONTRACT_VALIDATION: &lt;endpoint&gt; -&gt; VERDICT=&lt;VERDICT&gt;</code></p>',
    starter: `import sys
import json

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider le payload face aux types attendus
`,
    hints: [
      'Utiliser json.loads pour parser le payload.',
      'Attention au piège Python : isinstance(True, int) vaut True, vérifier le type bool en priorité.'
    ],
    examples: [
      {
        stdin: 'SCHEMA_CHECK endpoint=/api/user requis=id:int,nom:str,actif:bool payload={"id": 10, "nom": "Alice", "actif": true}',
        expected: 'CONTRACT_VALIDATION: /api/user -> VERDICT=CONTRAT_RESPECTE',
        note: 'Tous les champs sont présents avec les bons types.'
      }
    ],
    tests: [
      {
        label: 'Champ obligatoire manquant',
        stdin: 'SCHEMA_CHECK endpoint=/api/user requis=id:int,nom:str,email:str payload={"id": 10, "nom": "Bob"}',
        expected: 'CONTRACT_VALIDATION: /api/user -> VERDICT=VIOLATION_CONTRAT (ERREURS=[CHAMP_MANQUANT:email])'
      },
      {
        label: 'Type incorrect string au lieu de int',
        stdin: 'SCHEMA_CHECK endpoint=/api/order requis=id:int,total:float payload={"id": "ABC", "total": 99.5}',
        expected: 'CONTRACT_VALIDATION: /api/order -> VERDICT=VIOLATION_CONTRAT (ERREURS=[TYPE_INCORRECT:id(attendu=int,recu=str)])'
      },
      {
        label: 'Multiples erreurs champ manquant et type bool incorrect',
        stdin: 'SCHEMA_CHECK endpoint=/api/item requis=ref:str,prix:float,dispo:bool payload={"ref": "REF-1", "dispo": "oui"}',
        expected: 'CONTRACT_VALIDATION: /api/item -> VERDICT=VIOLATION_CONTRAT (ERREURS=[CHAMP_MANQUANT:prix, TYPE_INCORRECT:dispo(attendu=bool,recu=str)])'
      }
    ],
    solution: `import sys
import re
import json

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def get_type_name(val):
    if isinstance(val, bool):
        return 'bool'
    elif isinstance(val, int):
        return 'int'
    elif isinstance(val, float):
        return 'float'
    elif isinstance(val, str):
        return 'str'
    return type(val).__name__

def is_type_valid(val, expected):
    if expected == 'bool':
        return isinstance(val, bool)
    elif expected == 'int':
        return isinstance(val, int) and not isinstance(val, bool)
    elif expected == 'float':
        return (isinstance(val, (int, float)) and not isinstance(val, bool))
    elif expected == 'str':
        return isinstance(val, str)
    return False

for lig in lignes:
    m = re.search(r'endpoint=([^\\s]+)\\s+requis=([^\\s]+)\\s+payload=(.*)', lig)
    if not m:
        continue
    ep = m.group(1)
    req_str = m.group(2)
    pay_str = m.group(3)
    
    try:
        data = json.loads(pay_str)
    except Exception:
        continue
        
    pairs = [item.split(':') for item in req_str.split(',') if ':' in item]
    erreurs = []
    
    for f_name, f_type in pairs:
        if f_name not in data:
            erreurs.append(f"CHAMP_MANQUANT:{f_name}")
        else:
            val = data[f_name]
            if not is_type_valid(val, f_type):
                recu = get_type_name(val)
                erreurs.append(f"TYPE_INCORRECT:{f_name}(attendu={f_type},recu={recu})")
                
    if not erreurs:
        verdict = 'CONTRAT_RESPECTE'
    else:
        verdict = f"VIOLATION_CONTRAT (ERREURS=[{', '.join(erreurs)}])"
        
    print(f"CONTRACT_VALIDATION: {ep} -> VERDICT={verdict}")
`
  }
];
