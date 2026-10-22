/**
 * Chapitre 4 — Codes d'état HTTP & formatage des réponses JSON.
 *
 * Trois fiches Python pour maîtriser les réponses HTTP :
 *   - fl2-c4-e1 : choix du code de statut HTTP exact selon le contexte REST ;
 *   - fl2-c4-e2 : sérialisation JSON d'un objet d'erreur standardisé ;
 *   - fl2-c4-e3 : construction d'une enveloppe de réponse paginée (jsonify).
 */
'use strict';

module.exports = [
  {
    id: 'fl2-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'python',
    title: 'Codes d’état HTTP REST',
    goal: 'Identifier le code de statut HTTP approprié selon le résultat de l’opération.',
    brief: '<p>Une API REST communique le succès ou l’échec d’une requête via les codes de statut HTTP :<br>' +
      '- <code>creation</code> &rarr; <code>201 Created</code><br>' +
      '- <code>lecture</code> ou <code>succes</code> &rarr; <code>200 OK</code><br>' +
      '- <code>suppression</code> (sans contenu renvoyé) &rarr; <code>204 No Content</code><br>' +
      '- <code>introuvable</code> &rarr; <code>404 Not Found</code><br>' +
      '- <code>invalide</code> &rarr; <code>400 Bad Request</code><br>' +
      '- <code>non_autorise</code> &rarr; <code>401 Unauthorized</code><br>' +
      '- <code>interdit</code> &rarr; <code>403 Forbidden</code><br>' +
      '<p>Lit le nom du scénario sur l’entrée standard (minuscules, sans espaces superflus) et ' +
      'affiche le code d’état exact suivi de son libellé officiel sous la forme <code>&lt;code&gt; &lt;libelle&gt;</code>.</p>',
    starter: `scenario = input().strip().lower()\n\n# À compléter : mapper le scénario vers le code HTTP approprié.\n`,
    hints: [
      'Utilisez un dictionnaire Python associant chaque clé au tuple ou à la chaîne "CODE Libellé".',
      'Exemple : "creation": "201 Created".'
    ],
    examples: [
      {
        stdin: 'creation',
        expected: '201 Created',
        note: 'Création réussie d’une nouvelle ressource.'
      }
    ],
    tests: [
      {
        label: 'Suppression sans contenu',
        stdin: 'suppression',
        expected: '204 No Content'
      },
      {
        label: 'Ressource inexistante',
        stdin: 'introuvable',
        expected: '404 Not Found'
      },
      {
        label: 'Payload de requête invalide',
        stdin: 'invalide',
        expected: '400 Bad Request'
      }
    ],
    solution: `scenario = input().strip().lower()

table = {
    'creation': '201 Created',
    'lecture': '200 OK',
    'succes': '200 OK',
    'suppression': '204 No Content',
    'introuvable': '404 Not Found',
    'invalide': '400 Bad Request',
    'non_autorise': '401 Unauthorized',
    'interdit': '403 Forbidden'
}

print(table.get(scenario, '500 Internal Server Error'))
`
  },
  {
    id: 'fl2-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'python',
    title: 'Payload d’erreur JSON standardisé',
    goal: 'Produire un objet JSON d’erreur uniforme avec code, type et description.',
    brief: '<p>Une bonne pratique d’API consiste à renvoyer une charge utile JSON standardisée en cas d’erreur. ' +
      'L’objet doit contenir les trois propriétés : <code>code</code> (entier), <code>error</code> (chaîne courte) et <code>message</code> (explication).</p>' +
      '<p>Lit trois lignes sur l’entrée standard :<br>' +
      '1. Le code HTTP numérique (ex: <code>404</code>)<br>' +
      '2. Le titre de l’erreur (ex: <code>Not Found</code>)<br>' +
      '3. Le message explicatif (ex: <code>Ressource introuvable</code>)<br>' +
      'Construis un dictionnaire Python avec ces 3 clés et affiche sa sérialisation JSON compacte ' +
      '(avec les clés triées alphabétiquement via <code>json.dumps(..., sort_keys=True)</code>).</p>',
    starter: `import json\n\ncode = int(input().strip())\nerreur = input().strip()\nmessage = input().strip()\n\n# À compléter : sérialiser le dictionnaire en JSON trié.\n`,
    hints: [
      'Le dictionnaire doit avoir pour clés exactes "code", "error" et "message".',
      'Assurez-vous que "code" est bien un entier numérique (int).',
      'Utilisez json.dumps(payload, sort_keys=True).'
    ],
    examples: [
      {
        stdin: '404\nNot Found\nUtilisateur 42 introuvable',
        expected: '{"code": 404, "error": "Not Found", "message": "Utilisateur 42 introuvable"}',
        note: 'Formatage JSON ordonné sans retours à la ligne.'
      }
    ],
    tests: [
      {
        label: 'Erreur 400 Bad Request',
        stdin: '400\nBad Request\nChamp nom obligatoire manquant',
        expected: '{"code": 400, "error": "Bad Request", "message": "Champ nom obligatoire manquant"}'
      },
      {
        label: 'Erreur 401 Unauthorized',
        stdin: '401\nUnauthorized\nJeton Bearer expire ou invalide',
        expected: '{"code": 401, "error": "Unauthorized", "message": "Jeton Bearer expire ou invalide"}'
      },
      {
        label: 'Erreur 500 Serveur',
        stdin: '500\nInternal Server Error\nEchec de connexion a la base',
        expected: '{"code": 500, "error": "Internal Server Error", "message": "Echec de connexion a la base"}'
      }
    ],
    solution: `import json

code = int(input().strip())
erreur = input().strip()
message = input().strip()

payload = {
    "code": code,
    "error": erreur,
    "message": message
}

print(json.dumps(payload, sort_keys=True))
`
  },
  {
    id: 'fl2-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'python',
    title: 'Enveloppe paginée de collection',
    goal: 'Construire une enveloppe JSON complète de collection avec pagination (total, page, limit, items).',
    brief: '<p>Lorsqu’une collection volumineuse est interrogée, une API REST renvoie une enveloppe contenant ' +
      'les métadonnées de navigation et la tranche d’éléments demandée.</p>' +
      '<p>Lit trois lignes sur l’entrée standard :<br>' +
      '1. Le numéro de page demandé (entier, commence à 1)<br>' +
      '2. La limite d’éléments par page (entier)<br>' +
      '3. Une liste complète d’éléments au format JSON (tableau d’entiers ou de chaînes)<br>' +
      'Calcule la tranche d’éléments correspondant à la page demandée, puis produis le JSON contenant :<br>' +
      '- <code>"total"</code>: nombre total d’éléments dans la collection<br>' +
      '- <code>"page"</code>: page courante (int)<br>' +
      '- <code>"limit"</code>: taille de page (int)<br>' +
      '- <code>"data"</code>: liste des éléments de la tranche courante<br>' +
      'Affichez le résultat avec <code>json.dumps(..., sort_keys=True)</code>.</p>',
    starter: `import json\n\npage = int(input().strip())\nlimit = int(input().strip())\nitems = json.loads(input().strip())\n\n# À compléter : découper la tranche et sérialiser l'enveloppe.\n`,
    hints: [
      'L’indice de début est (page - 1) * limit et l’indice de fin est début + limit.',
      'Extrayez la tranche avec items[debut:fin].',
      'Assurez-vous que les clés du dictionnaire sont "data", "limit", "page", "total".'
    ],
    examples: [
      {
        stdin: '1\n2\n["pomme", "poire", "cerise", "banane"]',
        expected: '{"data": ["pomme", "poire"], "limit": 2, "page": 1, "total": 4}',
        note: 'Première page de 2 éléments sur 4 au total.'
      }
    ],
    tests: [
      {
        label: 'Deuxième page',
        stdin: '2\n2\n["pomme", "poire", "cerise", "banane"]',
        expected: '{"data": ["cerise", "banane"], "limit": 2, "page": 2, "total": 4}'
      },
      {
        label: 'Page au-delà du total (tableau vide)',
        stdin: '3\n5\n[10, 20, 30]',
        expected: '{"data": [], "limit": 5, "page": 3, "total": 3}'
      },
      {
        label: 'Collection d’entiers page 1',
        stdin: '1\n3\n[1, 2, 3, 4, 5]',
        expected: '{"data": [1, 2, 3], "limit": 3, "page": 1, "total": 5}'
      }
    ],
    solution: `import json

page = int(input().strip())
limit = int(input().strip())
items = json.loads(input().strip())

debut = (page - 1) * limit
fin = debut + limit
tranche = items[debut:fin]

enveloppe = {
    "total": len(items),
    "page": page,
    "limit": limit,
    "data": tranche
}

print(json.dumps(enveloppe, sort_keys=True))
`
  }
];
