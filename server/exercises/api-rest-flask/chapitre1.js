/**
 * Chapitre 1 — API Web et protocole HTTP.
 *
 * Trois fiches Python pour analyser le protocole HTTP :
 *   - fl2-c1-e1 : découpage d'une ligne de requête HTTP brute ;
 *   - fl2-c1-e2 : extraction des paramètres d'URL (Query String) ;
 *   - fl2-c1-e3 : validation des en-têtes Content-Type et Accept.
 */
'use strict';

module.exports = [
  {
    id: 'fl2-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'python',
    title: 'Ligne de requête HTTP',
    goal: 'Décomposer une ligne de requête HTTP brute en méthode, chemin et version.',
    brief: '<p>Une requête HTTP débute par une ligne contenant trois éléments séparés par des espaces : ' +
      'la <strong>méthode</strong> (ex: <code>GET</code>), la <strong>cible / chemin</strong> (ex: <code>/api/v1/users</code>) ' +
      'et la <strong>version du protocole</strong> (ex: <code>HTTP/1.1</code>).</p>' +
      '<p>Lit la ligne sur l’entrée standard et affiche les trois valeurs sous la forme suivante :<br>' +
      '<code>Methode: &lt;methode&gt;</code><br>' +
      '<code>Chemin: &lt;chemin&gt;</code><br>' +
      '<code>Version: &lt;version&gt;</code></p>',
    starter: `ligne = input().strip()\n\n# À compléter : découper la ligne et afficher les trois composants.\n`,
    hints: [
      'Utilisez la méthode ligne.split() pour séparer les éléments sur les espaces.',
      'Affichez chaque valeur sur une ligne dédiée avec le préfixe demandé.'
    ],
    examples: [
      {
        stdin: 'GET /api/v1/users HTTP/1.1',
        expected: 'Methode: GET\nChemin: /api/v1/users\nVersion: HTTP/1.1',
        note: 'Requête GET classique sur la collection users.'
      }
    ],
    tests: [
      {
        label: 'Requête POST création',
        stdin: 'POST /api/articles HTTP/1.1',
        expected: 'Methode: POST\nChemin: /api/articles\nVersion: HTTP/1.1'
      },
      {
        label: 'Requête DELETE avec ID',
        stdin: 'DELETE /api/items/42 HTTP/2',
        expected: 'Methode: DELETE\nChemin: /api/items/42\nVersion: HTTP/2'
      },
      {
        label: 'Requête racine HEAD',
        stdin: 'HEAD / HTTP/1.0',
        expected: 'Methode: HEAD\nChemin: /\nVersion: HTTP/1.0'
      }
    ],
    solution: `ligne = input().strip()
methode, chemin, version = ligne.split()
print(f"Methode: {methode}")
print(f"Chemin: {chemin}")
print(f"Version: {version}")
`
  },
  {
    id: 'fl2-c1-e2',
    chapter: 1,
    level: 'n2',
    language: 'python',
    title: 'Extraction de la Query String',
    goal: 'Analyser une URL et extraire ses paramètres d’URL ordonnés alphabétiquement.',
    brief: '<p>Dans une API REST, la <em>Query String</em> permet de filtrer, paginer ou trier une collection. ' +
      'Elle débute après le caractère <code>?</code> et se compose de paires <code>clé=valeur</code> séparées par <code>&amp;</code>.</p>' +
      '<p>Lit une URL complète sur l’entrée standard. Extrayez les paramètres et affichez chaque paire sous la forme <code>cle=valeur</code>, ' +
      '<strong>triée par ordre alphabétique de la clé</strong>. Si l’URL ne contient aucun paramètre, affiche <code>Aucun parametre</code>.</p>',
    starter: `from urllib.parse import urlparse, parse_qsl\n\nurl = input().strip()\n\n# À compléter : analyser l'URL et afficher les paramètres triés par clé.\n`,
    hints: [
      'urlparse(url).query renvoie la chaîne de paramètres brute.',
      'parse_qsl(query) renvoie une liste de couples (cle, valeur).',
      'Triez la liste avec sorted(..., key=lambda x: x[0]) avant d’afficher chaque paire.'
    ],
    examples: [
      {
        stdin: 'https://api.site.fr/v1/articles?limit=10&page=2&sort=desc',
        expected: 'limit=10\npage=2\nsort=desc',
        note: 'Trois paramètres déjà dans l’ordre alphabétique.'
      }
    ],
    tests: [
      {
        label: 'Paramètres désordonnés',
        stdin: 'https://api.mondomaine.org/recherche?q=python&category=tech&page=1',
        expected: 'category=tech\npage=1\nq=python'
      },
      {
        label: 'URL sans query string',
        stdin: 'https://api.mondomaine.org/v1/profil',
        expected: 'Aucun parametre'
      },
      {
        label: 'Paramètre unique',
        stdin: 'http://localhost:5000/api/status?verbose=true',
        expected: 'verbose=true'
      }
    ],
    solution: `from urllib.parse import urlparse, parse_qsl

url = input().strip()
parsed = urlparse(url)
params = parse_qsl(parsed.query)

if not params:
    print("Aucun parametre")
else:
    for cle, val in sorted(params, key=lambda x: x[0]):
        print(f"{cle}={val}")
`
  },
  {
    id: 'fl2-c1-e3',
    chapter: 1,
    level: 'n3',
    language: 'python',
    title: 'Validation des en-têtes HTTP JSON',
    goal: 'Vérifier la compatibilité JSON des en-têtes Content-Type et Accept.',
    brief: '<p>Une API REST moderne dialogue couramment au format JSON. Dans les en-têtes HTTP reçus, ' +
      'le client indique le format envoyé via <code>Content-Type</code> et le format attendu via <code>Accept</code>.</p>' +
      '<p>Lit l’ensemble des lignes d’en-têtes HTTP sur l’entrée standard jusqu’à EOF. Chaque ligne est au format <code>Nom-Entete: Valeur</code>.</p>' +
      '<p>Vérifiez si <code>application/json</code> est présent soit dans <code>Content-Type</code> soit dans <code>Accept</code> (en ignorant la casse).<br>' +
      'Si oui, affichez <code>JSON supporte</code>.<br>' +
      'Sinon, affichez <code>Format non supporte</code>.</p>',
    starter: `import sys\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\n\n# À compléter : analyser les en-têtes et afficher 'JSON supporte' ou 'Format non supporte'.\n`,
    hints: [
      'Sépare le nom de l’en-tête et sa valeur sur le premier caractère deux-points (header.split(":", 1)).',
      'Convertissez les noms et valeurs en minuscules (.lower()) pour une comparaison robuste.'
    ],
    examples: [
      {
        stdin: 'Host: api.exemple.com\nContent-Type: application/json\nUser-Agent: curl/8.4.0',
        expected: 'JSON supporte',
        note: 'Content-Type indique du JSON.'
      }
    ],
    tests: [
      {
        label: 'Accept avec application/json',
        stdin: 'Host: api.exemple.com\nAccept: application/json, text/plain\nAuthorization: Bearer token123',
        expected: 'JSON supporte'
      },
      {
        label: 'Format texte et HTML uniquement',
        stdin: 'Host: api.exemple.com\nContent-Type: text/html\nAccept: text/html',
        expected: 'Format non supporte'
      },
      {
        label: 'En-têtes vides ou neutres',
        stdin: 'Host: localhost\nUser-Agent: Mozilla/5.0',
        expected: 'Format non supporte'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]
json_detecte = False

for ligne in lignes:
    if ":" in ligne:
        nom, val = ligne.split(":", 1)
        nom = nom.strip().lower()
        val = val.strip().lower()
        if nom in ("content-type", "accept") and "application/json" in val:
            json_detecte = True
            break

if json_detecte:
    print("JSON supporte")
else:
    print("Format non supporte")
`
  }
];
