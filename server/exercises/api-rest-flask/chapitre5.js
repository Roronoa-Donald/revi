/**
 * Chapitre 5 — Validation des données, parsing JSON & gestion d'erreurs.
 *
 * Trois fiches Python pour sécuriser et valider les requêtes API :
 *   - fl2-c5-e1 : contrôle de la présence des champs obligatoires (400 Bad Request) ;
 *   - fl2-c5-e2 : validation des types de données selon un contrat de schéma ;
 *   - fl2-c5-e3 : filtrage des propriétés non autorisées (protection mass-assignment).
 */
'use strict';

module.exports = [
  {
    id: 'fl2-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'python',
    title: 'Validation des champs obligatoires',
    goal: 'Vérifier la présence de tous les champs obligatoires dans un payload JSON.',
    brief: '<p>Avant de traiter une création ou une modification, l’API doit s’assurer que les attributs requis sont présents dans le corps JSON.</p>' +
      '<p>Lit deux lignes sur l’entrée standard :<br>' +
      '1. La liste des champs obligatoires séparés par des virgules (ex: <code>titre,prix,auteur</code>)<br>' +
      '2. Le payload JSON brut reçu (ex: <code>{"titre": "Guide", "prix": 25}</code>)<br>' +
      'Si tous les champs requis sont présents dans l’objet JSON, affiche :<br>' +
      '<code>200 OK: Payload valide</code><br>' +
      'Sinon, affichez les champs manquants <strong>triés alphabétiquement</strong> au format :<br>' +
      '<code>400 Bad Request: Champs manquants: &lt;champs séparés par des virgules&gt;</code>.</p>',
    starter: `import json\n\nrequis = [c.strip() for c in input().strip().split(',') if c.strip()]\npayload = json.loads(input().strip())\n\n# À compléter : vérifier les clés manquantes et afficher le statut.\n`,
    hints: [
      'Identifiez les clés manquantes avec [c for c in requis if c not in payload].',
      'Triez la liste des clés manquantes avec sorted() avant de la joindre avec ",".'
    ],
    examples: [
      {
        stdin: 'titre,prix,auteur\n{"titre": "Guide", "prix": 25}',
        expected: '400 Bad Request: Champs manquants: auteur',
        note: 'Le champ auteur est manquant.'
      }
    ],
    tests: [
      {
        label: 'Tous les champs sont présents',
        stdin: 'nom,email\n{"nom": "Jean", "email": "jean@test.fr", "age": 30}',
        expected: '200 OK: Payload valide'
      },
      {
        label: 'Plusieurs champs manquants',
        stdin: 'id,nom,prenom,role\n{"nom": "Dupont"}',
        expected: '400 Bad Request: Champs manquants: id,prenom,role'
      },
      {
        label: 'Payload vide',
        stdin: 'code,libelle\n{}',
        expected: '400 Bad Request: Champs manquants: code,libelle'
      }
    ],
    solution: `import json

requis = [c.strip() for c in input().strip().split(',') if c.strip()]
payload = json.loads(input().strip())

manquants = sorted([c for c in requis if c not in payload])

if not manquants:
    print("200 OK: Payload valide")
else:
    print(f"400 Bad Request: Champs manquants: {','.join(manquants)}")
`
  },
  {
    id: 'fl2-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'python',
    title: 'Validation des types JSON',
    goal: 'Vérifier la conformité des types de données reçus face à un schéma typé.',
    brief: '<p>Une API robuste ne se contente pas de vérifier la présence des champs : elle contrôle leur type de données ' +
      '(par exemple <code>int</code>, <code>str</code>, <code>bool</code> ou <code>float</code>).</p>' +
      '<p>Lit deux lignes sur l’entrée standard :<br>' +
      '1. Les spécifications de schéma séparées par des virgules (ex: <code>nom:str,age:int,actif:bool</code>)<br>' +
      '2. Le payload JSON reçu (ex: <code>{"nom": "Alice", "age": "vingt", "actif": true}</code>)<br>' +
      'Vérifiez chaque champ spécifié. Si le type correspond exactement (en Python, attention : <code>bool</code> dérive de <code>int</code>, ' +
      'donc vérifier <code>isinstance(val, bool)</code> en premier pour <code>bool</code>, et <code>type(val) is int</code> pour <code>int</code>).<br>' +
      'Si un champ a un type erroné, affiche la première erreur rencontrée (selon l’ordre du schéma) :<br>' +
      '<code>Erreur type: champ &lt;nom&gt; attendu &lt;type&gt;</code>.<br>' +
      'Si tous les types sont valides, affiche : <code>Validation reussie</code>.</p>',
    starter: `import json\n\nschema_raw = input().strip().split(',')\npayload = json.loads(input().strip())\n\n# À compléter : valider les types de chaque champ et afficher le diagnostic.\n`,
    hints: [
      'Pour str : type(v) is str.',
      'Pour bool : type(v) is bool.',
      'Pour int : type(v) is int (et pas bool).',
      'Pour float : type(v) in (float, int) (ou type(v) is float).'
    ],
    examples: [
      {
        stdin: 'nom:str,age:int,actif:bool\n{"nom": "Alice", "age": "vingt", "actif": true}',
        expected: 'Erreur type: champ age attendu int',
        note: 'age est une chaîne au lieu d’un entier.'
      }
    ],
    tests: [
      {
        label: 'Payload entièrement conforme',
        stdin: 'nom:str,age:int,actif:bool\n{"nom": "Bob", "age": 28, "actif": true}',
        expected: 'Validation reussie'
      },
      {
        label: 'Bool attendu mais entier reçu',
        stdin: 'actif:bool\n{"actif": 1}',
        expected: 'Erreur type: champ actif attendu bool'
      },
      {
        label: 'Float attendu avec valeur décimale',
        stdin: 'prix:float,titre:str\n{"prix": 19.99, "titre": "Livre"}',
        expected: 'Validation reussie'
      }
    ],
    solution: `import json

schema_items = [item.strip() for item in input().strip().split(',') if item.strip()]
payload = json.loads(input().strip())

erreur = None
for item in schema_items:
    champ, t_attendu = item.split(':', 1)
    val = payload.get(champ)
    
    valide = False
    if t_attendu == 'str':
        valide = type(val) is str
    elif t_attendu == 'bool':
        valide = type(val) is bool
    elif t_attendu == 'int':
        valide = type(val) is int
    elif t_attendu == 'float':
        valide = type(val) in (float, int) and type(val) is not bool
    
    if not valide:
        erreur = f"Erreur type: champ {champ} attendu {t_attendu}"
        break

if erreur:
    print(erreur)
else:
    print("Validation reussie")
`
  },
  {
    id: 'fl2-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'python',
    title: 'Filtrage de propriétés (Whitelisting)',
    goal: 'Supprimer d’un objet JSON toute propriété qui ne figure pas dans la liste blanche autorisée.',
    brief: '<p>La vulnérabilité de <em>Mass Assignment</em> survient lorsqu’une API accepte sans filtrage ' +
      'des champs sensibles soumis par le client (ex: <code>is_admin: true</code>, <code>role: superuser</code>).</p>' +
      '<p>Lit deux lignes sur l’entrée standard :<br>' +
      '1. La liste blanche des clés autorisées séparées par des virgules (ex: <code>titre,description,prix</code>)<br>' +
      '2. Le payload JSON reçu pouvant contenir des clés non autorisées.<br>' +
      'Ne conserve dans le résultat que les clés autorisées qui sont présentes dans le payload. ' +
      'Affichez le dictionnaire assaini sérialisé en JSON avec les clés triées (<code>json.dumps(..., sort_keys=True)</code>).</p>',
    starter: `import json\n\nautorisees = [k.strip() for k in input().strip().split(',') if k.strip()]\npayload = json.loads(input().strip())\n\n# À compléter : filtrer le dictionnaire et afficher le JSON assaini.\n`,
    hints: [
      'Construisez un nouveau dictionnaire : {k: payload[k] for k in autorisees if k in payload}.',
      'Utilisez json.dumps(..., sort_keys=True) pour l’affichage.'
    ],
    examples: [
      {
        stdin: 'titre,prix\n{"titre": "Livre Flask", "prix": 29, "is_admin": true, "role": "root"}',
        expected: '{"prix": 29, "titre": "Livre Flask"}',
        note: 'Les champs is_admin et role ont été éliminés.'
      }
    ],
    tests: [
      {
        label: 'Seuls des champs autorisés sont fournis',
        stdin: 'nom,email\n{"nom": "Dupont", "email": "dupont@test.com"}',
        expected: '{"email": "dupont@test.com", "nom": "Dupont"}'
      },
      {
        label: 'Toutes les propriétés sont parasites',
        stdin: 'titre,contenu\n{"attaque": "injection", "token": "xyz"}',
        expected: '{}'
      },
      {
        label: 'Conservation d’une seule propriété',
        stdin: 'statut\n{"statut": "actif", "score": 95, "solde": 1500}',
        expected: '{"statut": "actif"}'
      }
    ],
    solution: `import json

autorisees = [k.strip() for k in input().strip().split(',') if k.strip()]
payload = json.loads(input().strip())

filtre = {k: payload[k] for k in autorisees if k in payload}
print(json.dumps(filtre, sort_keys=True))
`
  }
];
