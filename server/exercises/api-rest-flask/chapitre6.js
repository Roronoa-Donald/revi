/**
 * Chapitre 6 — Mini API REST complète & persistance en mémoire.
 *
 * Trois fiches Python pour implémenter la logique métier d'un CRUD complet :
 *   - fl2-c6-e1 : lecture et filtrage d'une collection en mémoire (READ) ;
 *   - fl2-c6-e2 : création avec auto-incrémentation d'identifiant unique (CREATE) ;
 *   - fl2-c6-e3 : modification et suppression avec statuts 200, 204, 404 (UPDATE / DELETE).
 */
'use strict';

module.exports = [
  {
    id: 'fl2-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'python',
    title: 'Filtrage de collection en mémoire',
    goal: 'Filtrer une liste d’objets JSON selon un critère d’égalité (clé=valeur).',
    brief: '<p>Une requête <code>GET /ressources?critere=valeur</code> extrait uniquement les éléments correspondants.</p>' +
      '<p>Lit deux lignes sur l’entrée standard :<br>' +
      '1. La collection JSON initiale (tableau d’objets, ex: <code>[{"id": 1, "role": "admin"}, ...]</code>)<br>' +
      '2. Le critère au format <code>cle=valeur</code> (ex: <code>role=admin</code>)<br>' +
      'Filtre les objets dont l’attribut correspond à la valeur (convertis en chaîne pour la comparaison).<br>' +
      'Affichez d’abord : <code>Trouves: &lt;nombre&gt;</code>.<br>' +
      'Puis affiche le tableau JSON des éléments filtrés avec <code>json.dumps(..., sort_keys=True)</code>.</p>',
    starter: `import json\n\ncollection = json.loads(input().strip())\ncritere = input().strip()\n\n# À compléter : filtrer la collection et afficher les résultats.\n`,
    hints: [
      'Sépare le critère avec cle, val = critere.split("=", 1).',
      'Comparez str(elem.get(cle)) == val.',
      'Affichez len(resultats) puis le JSON.'
    ],
    examples: [
      {
        stdin: '[{"id": 1, "nom": "Alice", "role": "admin"}, {"id": 2, "nom": "Bob", "role": "user"}]\nrole=admin',
        expected: 'Trouves: 1\n[{"id": 1, "nom": "Alice", "role": "admin"}]',
        note: 'Seule Alice possède le rôle admin.'
      }
    ],
    tests: [
      {
        label: 'Critère avec plusieurs correspondances',
        stdin: '[{"id": 1, "cat": "info"}, {"id": 2, "cat": "rh"}, {"id": 3, "cat": "info"}]\ncat=info',
        expected: 'Trouves: 2\n[{"cat": "info", "id": 1}, {"cat": "info", "id": 3}]'
      },
      {
        label: 'Aucune correspondance',
        stdin: '[{"id": 10, "ville": "Paris"}, {"id": 20, "ville": "Lyon"}]\nville=Marseille',
        expected: 'Trouves: 0\n[]'
      },
      {
        label: 'Filtre sur valeur booléenne sous forme texte',
        stdin: '[{"id": 1, "actif": true}, {"id": 2, "actif": false}]\nactif=true',
        expected: 'Trouves: 1\n[{"actif": true, "id": 1}]'
      }
    ],
    solution: `import json

collection = json.loads(input().strip())
critere = input().strip()

cle, val = critere.split('=', 1)
# Gestion des conversions booléennes usuelles si nécessaire
val_str = val.strip().lower()

resultats = []
for elem in collection:
    v = elem.get(cle)
    if isinstance(v, bool):
        if str(v).lower() == val_str:
            resultats.append(elem)
    elif str(v) == val:
        resultats.append(elem)

print(f"Trouves: {len(resultats)}")
print(json.dumps(resultats, sort_keys=True))
`
  },
  {
    id: 'fl2-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'python',
    title: 'Création avec ID auto-incrémenté',
    goal: 'Insérer un nouvel objet dans un store mémoire en lui attribuant un identifiant unique (max + 1).',
    brief: '<p>Lors d’une requête <code>POST</code>, le serveur génère l’identifiant unique de la ressource créée ' +
      'avant de la stocker et de renvoyer le code <code>201 Created</code> avec l’objet complet.</p>' +
      '<p>Lit deux lignes sur l’entrée standard :<br>' +
      '1. La collection actuelle (tableau JSON d’objets ayant chacun un champ entier <code>"id"</code>, peut être vide <code>[]</code>)<br>' +
      '2. Le nouvel objet reçu sans champ <code>"id"</code> (ex: <code>{"nom": "Bob", "ville": "Nantes"}</code>)<br>' +
      'Calcule le nouvel ID : s’il n’y a aucun élément, l’ID vaut <code>1</code> ; sinon, il vaut <code>max(id) + 1</code>.<br>' +
      'Attribue cet <code>id</code> au nouvel objet et affiche :<br>' +
      '<code>201 Created: &lt;objet_json_avec_id_trie&gt;</code>.</p>',
    starter: `import json\n\ncollection = json.loads(input().strip())\nnouvel_item = json.loads(input().strip())\n\n# À compléter : calculer le nouvel ID, l'insérer et afficher la réponse 201.\n`,
    hints: [
      'Si collection est vide, nouvel_id = 1.',
      'Sinon, nouvel_id = max(item["id"] for item in collection) + 1.',
      'Ajoutez item["id"] = nouvel_id et affichez avec json.dumps(..., sort_keys=True).'
    ],
    examples: [
      {
        stdin: '[{"id": 10, "nom": "Alice"}]\n{"nom": "Bob"}',
        expected: '201 Created: {"id": 11, "nom": "Bob"}',
        note: 'Le nouvel id généré est 11.'
      }
    ],
    tests: [
      {
        label: 'Collection initialement vide',
        stdin: '[]\n{"titre": "Premier article"}',
        expected: '201 Created: {"id": 1, "titre": "Premier article"}'
      },
      {
        label: 'Collection avec plusieurs identifiants désordonnés',
        stdin: '[{"id": 3, "n": "c"}, {"id": 15, "n": "o"}, {"id": 2, "n": "b"}]\n{"n": "nouveau"}',
        expected: '201 Created: {"id": 16, "n": "nouveau"}'
      },
      {
        label: 'Création avec plusieurs attributs',
        stdin: '[{"id": 1, "ref": "A"}]\n{"ref": "B", "stock": 40, "prix": 15.5}',
        expected: '201 Created: {"id": 2, "prix": 15.5, "ref": "B", "stock": 40}'
      }
    ],
    solution: `import json

collection = json.loads(input().strip())
nouvel_item = json.loads(input().strip())

if not collection:
    nouvel_id = 1
else:
    nouvel_id = max(item['id'] for item in collection) + 1

nouvel_item['id'] = nouvel_id
print(f"201 Created: {json.dumps(nouvel_item, sort_keys=True)}")
`
  },
  {
    id: 'fl2-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'python',
    title: 'Gestion des mutations (UPDATE & DELETE)',
    goal: 'Traiter une modification partielle (PATCH) ou une suppression (DELETE) sur un store mémoire.',
    brief: '<p>Dans un store mémoire, une opération <code>DELETE</code> retire l’élément et répond <code>204 No Content</code>. ' +
      'Une opération <code>UPDATE</code> fusionne les nouveaux attributs et répond <code>200 OK</code>. ' +
      'Si l’identifiant n’existe pas, le serveur répond <code>404 Not Found</code>.</p>' +
      '<p>Lit deux lignes sur l’entrée standard :<br>' +
      '1. La collection actuelle (tableau JSON d’objets avec un entier <code>"id"</code>)<br>' +
      '2. La commande à exécuter :<br>' +
      '- soit <code>DELETE &lt;id&gt;</code> (ex: <code>DELETE 42</code>)<br>' +
      '- soit <code>UPDATE &lt;id&gt; &lt;json_modifs&gt;</code> (ex: <code>UPDATE 42 {"prix": 35}</code>)<br>' +
      'Affichez :<br>' +
      '- Si l’ID est introuvable : <code>404 Not Found: Ressource &lt;id&gt; inexistante</code><br>' +
      '- Si DELETE réussi : <code>204 No Content: Ressource &lt;id&gt; supprimee</code><br>' +
      '- Si UPDATE réussi : <code>200 OK: &lt;objet_mis_a_jour_trie&gt;</code>.</p>',
    starter: `import json\n\ncollection = json.loads(input().strip())\ncommande = input().strip()\n\n# À compléter : identifier l'opération, modifier le store et afficher le statut.\n`,
    hints: [
      'Trouve l’index ou l’élément avec item["id"] == cible_id.',
      'Pour UPDATE, charge le fragment JSON avec json.loads() et mets à jour avec item.update(modifs).',
      'Assurez-vous que l’id cible est converti en entier int(cible_id).'
    ],
    examples: [
      {
        stdin: '[{"id": 42, "nom": "Alice", "score": 10}]\nDELETE 42',
        expected: '204 No Content: Ressource 42 supprimee',
        note: 'Suppression réussie.'
      }
    ],
    tests: [
      {
        label: 'Suppression d’un identifiant inexistant',
        stdin: '[{"id": 1, "nom": "A"}]\nDELETE 99',
        expected: '404 Not Found: Ressource 99 inexistante'
      },
      {
        label: 'Mise à jour d’un champ existant',
        stdin: '[{"id": 5, "nom": "Bob", "ville": "Paris"}]\nUPDATE 5 {"ville": "Lyon"}',
        expected: '200 OK: {"id": 5, "nom": "Bob", "ville": "Lyon"}'
      },
      {
        label: 'Mise à jour d’un identifiant inexistant',
        stdin: '[{"id": 2, "nom": "Claire"}]\nUPDATE 8 {"nom": "Chloe"}',
        expected: '404 Not Found: Ressource 8 inexistante'
      }
    ],
    solution: `import json

collection = json.loads(input().strip())
commande = input().strip()

parties = commande.split(' ', 2)
action = parties[0].upper()
cible_id = int(parties[1])

trouve = None
for item in collection:
    if item.get('id') == cible_id:
        trouve = item
        break

if not trouve:
    print(f"404 Not Found: Ressource {cible_id} inexistante")
else:
    if action == 'DELETE':
        print(f"204 No Content: Ressource {cible_id} supprimee")
    elif action == 'UPDATE':
        modifs = json.loads(parties[2])
        trouve.update(modifs)
        print(f"200 OK: {json.dumps(trouve, sort_keys=True)}")
`
  }
];
