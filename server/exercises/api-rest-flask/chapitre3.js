/**
 * Chapitre 3 — Démarrage avec Flask & Routage.
 *
 * Trois fiches Python sur le fonctionnement du routage Flask :
 *   - fl2-c3-e1 : convertisseurs de variables de route (<int>, <float>, <path>, <string>) ;
 *   - fl2-c3-e2 : simulateur de dispatch et extraction de paramètres dynamiques ;
 *   - fl2-c3-e3 : restriction et filtrage des méthodes HTTP (405 Method Not Allowed).
 */
'use strict';

module.exports = [
  {
    id: 'fl2-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'python',
    title: 'Convertisseurs de route Flask',
    goal: 'Déterminer le type de convertisseur Flask adapté à une valeur reçue.',
    brief: '<p>Dans Flask, les variables de routes acceptent des convertisseurs pour typer les paramètres :<br>' +
      '- <code>int</code> pour les entiers positifs (ex: <code>42</code>)<br>' +
      '- <code>float</code> pour les nombres décimaux à virgule (ex: <code>19.99</code>)<br>' +
      '- <code>path</code> pour les chaînes contenant au moins un slash <code>/</code> (ex: <code>docs/api/v1</code>)<br>' +
      '- <code>string</code> pour toute autre chaîne de caractères standard sans slash.<br>' +
      '<p>Lit une valeur textuelle et le nom de variable souhaité (deux lignes en entrée). ' +
      'Affiche la syntaxe de route Flask correspondante sous la forme <code>&lt;type:nom_variable&gt;</code>.</p>',
    starter: `valeur = input().strip()\nnom_var = input().strip()\n\n# À compléter : déduire le type de convertisseur et afficher <type:nom_var>.\n`,
    hints: [
      'Vérifie d’abord si la chaîne contient un slash avec "/" in valeur.',
      'Pour tester un entier : valeur.isdigit().',
      'Pour tester un float : essaye de convertir avec float() dans un bloc try/except.'
    ],
    examples: [
      {
        stdin: '42\nuser_id',
        expected: '<int:user_id>',
        note: '42 est un entier.'
      }
    ],
    tests: [
      {
        label: 'Valeur décimale',
        stdin: '99.5\nprix',
        expected: '<float:prix>'
      },
      {
        label: 'Chemin avec sous-dossiers',
        stdin: 'fichiers/images/logo.png\nchemin_fichier',
        expected: '<path:chemin_fichier>'
      },
      {
        label: 'Chaîne textuelle',
        stdin: 'alain_proviste\npseudo',
        expected: '<string:pseudo>'
      }
    ],
    solution: `valeur = input().strip()
nom_var = input().strip()

if "/" in valeur:
    type_conv = "path"
elif valeur.isdigit():
    type_conv = "int"
else:
    est_float = False
    try:
        float(valeur)
        if "." in valeur:
            est_float = True
    except ValueError:
        pass
    type_conv = "float" if est_float else "string"

print(f"<{type_conv}:{nom_var}>")
`
  },
  {
    id: 'fl2-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'python',
    title: 'Simulateur de dispatch de route',
    goal: 'Vérifier la correspondance entre une URL demandée et un modèle de route avec paramètre.',
    brief: '<p>Flask associe chaque requête entrante au pattern de route correspondant. ' +
      'Par exemple, la route <code>/livres/&lt;int:id&gt;</code> doit capturer <code>/livres/15</code> et extraire <code>id=15</code>.</p>' +
      '<p>Le programme reçoit deux lignes :<br>' +
      '1. Le modèle de route avec une variable au format <code>&lt;type:nom&gt;</code> (ex: <code>/articles/&lt;int:id&gt;</code>)<br>' +
      '2. L’URL demandée (ex: <code>/articles/73</code>)<br>' +
      'Si l’URL correspond au modèle et que le type est valide (par exemple <code>int</code> ne contient que des chiffres), ' +
      'affiche <code>Match: &lt;nom&gt;=&lt;valeur&gt;</code>.<br>' +
      'Sinon, affiche <code>404 Not Found</code>.</p>',
    starter: `modele = input().strip()\nurl = input().strip()\n\n# À compléter : vérifier la correspondance et extraire la variable.\n`,
    hints: [
      'Découpe le modèle et l’URL en segments avec .split("/").',
      'Compare le nombre de segments : s’ils diffèrent, c’est 404 Not Found.',
      'Repère le segment contenant "<" et ">", extrais le type et le nom, puis valide la valeur reçue.'
    ],
    examples: [
      {
        stdin: '/articles/<int:id>\n/articles/73',
        expected: 'Match: id=73',
        note: 'Correspondance exacte et valeur 73 entière.'
      }
    ],
    tests: [
      {
        label: 'Type entier attendu mais chaîne reçue',
        stdin: '/users/<int:uid>\n/users/admin',
        expected: '404 Not Found'
      },
      {
        label: 'Variable de type string',
        stdin: '/categories/<string:nom>\n/categories/informatique',
        expected: 'Match: nom=informatique'
      },
      {
        label: 'Préfixe de route différent',
        stdin: '/api/v1/<int:num>\n/api/v2/50',
        expected: '404 Not Found'
      }
    ],
    solution: `modele = input().strip()
url = input().strip()

m_segs = [s for s in modele.split('/') if s]
u_segs = [s for s in url.split('/') if s]

if len(m_segs) != len(u_segs):
    print("404 Not Found")
else:
    match = True
    resultat = ""
    for m, u in zip(m_segs, u_segs):
        if m.startswith('<') and m.endswith('>'):
            contenu = m[1:-1]
            t, nom = contenu.split(':', 1)
            if t == 'int':
                if not u.isdigit():
                    match = False
                    break
            resultat = f"Match: {nom}={u}"
        else:
            if m != u:
                match = False
                break
    if match and resultat:
        print(resultat)
    else:
        print("404 Not Found")
`
  },
  {
    id: 'fl2-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'python',
    title: 'Filtrage de méthodes HTTP Flask',
    goal: 'Simuler le contrôle des méthodes autorisées sur un endpoint Flask (@app.route(..., methods=[...])).',
    brief: '<p>Par défaut, une route Flask n’accepte que la méthode <code>GET</code>. Pour autoriser d’autres verbes, ' +
      'on fournit le paramètre <code>methods=[\'GET\', \'POST\']</code>. Si un client sollicite l’endpoint avec une méthode non autorisée, ' +
      'Flask renvoie automatiquement le code d’état <code>405 Method Not Allowed</code>.</p>' +
      '<p>Lit deux lignes sur l’entrée standard :<br>' +
      '1. La liste des méthodes autorisées séparées par des virgules (ex: <code>GET,POST</code>)<br>' +
      '2. La méthode utilisée par la requête entrante (ex: <code>DELETE</code>)<br>' +
      'Si la méthode est autorisée, affiche <code>200 OK: Traitement &lt;METHODE&gt;</code>.<br>' +
      'Sinon, affiche <code>405 Method Not Allowed: Verbes autorises: &lt;liste triee separee par des virgules&gt;</code>.</p>',
    starter: `autorisees = input().strip().split(',')\nmethode = input().strip().upper()\n\n# À compléter : valider la méthode et afficher la réponse.\n`,
    hints: [
      'Nettoie et passe toutes les méthodes en majuscules avec [m.strip().upper() for m in autorisees].',
      'Si methode in autorisees, le code est 200.',
      'Sinon, trie la liste des verbes autorisés avec sorted() et joins-les avec ",".'
    ],
    examples: [
      {
        stdin: 'GET,POST\nDELETE',
        expected: '405 Method Not Allowed: Verbes autorises: GET,POST',
        note: 'DELETE non autorisé sur cette route.'
      }
    ],
    tests: [
      {
        label: 'Méthode autorisée',
        stdin: 'GET,POST,PUT\nPOST',
        expected: '200 OK: Traitement POST'
      },
      {
        label: 'Méthode avec espaces et casse variée',
        stdin: 'get , patch\npatch',
        expected: '200 OK: Traitement PATCH'
      },
      {
        label: 'Interdit avec liste désordonnée',
        stdin: 'PUT,GET,DELETE\nPOST',
        expected: '405 Method Not Allowed: Verbes autorises: DELETE,GET,PUT'
      }
    ],
    solution: `autorisees = [m.strip().upper() for m in input().strip().split(',') if m.strip()]
methode = input().strip().upper()

if methode in autorisees:
    print(f"200 OK: Traitement {methode}")
else:
    liste = ",".join(sorted(autorisees))
    print(f"405 Method Not Allowed: Verbes autorises: {liste}")
`
  }
];
