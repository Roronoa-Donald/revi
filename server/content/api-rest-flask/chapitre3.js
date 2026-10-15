/**
 * Chapitre 3 du cours « API REST avec Flask » B2 — Démarrage avec Flask & Routage.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Démarrage avec Flask & Routage',
  short: 'Flask & Routage',
  toc: 'Micro-framework Flask, objet d’application WSGI, décorateurs de routage, variables dynamiques et objet request.',
  time: '≈ 3 h 00 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Après avoir modélisé les ressources et les routes théoriques, il est temps de leur donner vie en Python. ' +
    'Flask est un micro-framework minimaliste, rapide et flexible qui permet de déployer une API web ' +
    'en quelques lignes de code sans imposer une structure de projet lourde.',

  objectives: [
    'installer et initialiser une application Flask avec Flask(__name__) ;',
    'déclarer des routes avec le décorateur @app.route et spécifier les verbes acceptés ;',
    'capturer et convertir des paramètres dynamiques d’URL (&lt;int:id&gt;, &lt;string:slug&gt;) ;',
    'exploiter l’objet global contextuel request (query string, headers, corps JSON) ;',
    'exécuter et tester le serveur localement avec le CLI Flask ou en script Python.'
  ],

  sections: [
    {
      title: 'Introduction à Flask et installation',
      html: [
        '<p>Créé par <strong>Armin Ronacher</strong> en 2010, <strong>Flask</strong> est qualifié de <em>micro-framework</em> ' +
        'car il fournit uniquement le cœur indispensable : le routage HTTP (via <strong>Werkzeug</strong>) et ' +
        'le moteur de gabarits (<strong>Jinja2</strong>). Contrairement à des frameworks complets comme Django, ' +
        'Flask ne force aucun ORM ni structure de base de données prédéfinie.</p>',
        '<p>L’installation s’effectue simplement dans un environnement virtuel Python dédié :</p>',
        '<pre><code>python3 -m venv .venv\nsource .venv/bin/activate\npip install flask</code></pre>',
        box('tech', 'L’application Flask minimale', 'code',
          '    <pre><code>from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef accueil():\n    return {"message": "Bienvenue sur l\'API REST"}\n\nif __name__ == "__main__":\n    app.run(debug=True, port=5000)</code></pre>')
      ].join('\n')
    },
    {
      title: 'Le système de routage et les convertisseurs de variables',
      html: [
        '<p>Le routage associe une URL à une fonction Python dite <em>fonction vue</em> (view function) ' +
        'à l’aide du décorateur <code>@app.route(\'/chemin\')</code>.</p>',
        '<p>Flask permet d’extraire des portions dynamiques de l’URL en utilisant des balises typées :</p>',
        '<table class="data-table">\n' +
        '  <thead>\n' +
        '    <tr><th>Convertisseur</th><th>Syntaxe</th><th>Comportement</th></tr>\n' +
        '  </thead>\n' +
        '  <tbody>\n' +
        '    <tr><td><code>string</code> (défaut)</td><td><code>&lt;nom&gt;</code> ou <code>&lt;string:nom&gt;</code></td><td>Accepte n’importe quelle chaîne sans slash.</td></tr>\n' +
        '    <tr><td><code>int</code></td><td><code>&lt;int:id&gt;</code></td><td>Accepte uniquement des entiers positifs et convertit la valeur en <code>int</code> Python.</td></tr>\n' +
        '    <tr><td><code>float</code></td><td><code>&lt;float:val&gt;</code></td><td>Convertit les nombres décimaux à virgule en <code>float</code>.</td></tr>\n' +
        '    <tr><td><code>path</code></td><td><code>&lt;path:chemin&gt;</code></td><td>Accepte une chaîne textuelle pouvant contenir des slashes.</td></tr>\n' +
        '    <tr><td><code>uuid</code></td><td><code>&lt;uuid:identifiant&gt;</code></td><td>Valide et convertit un identifiant UUID v4.</td></tr>\n' +
        '  </tbody>\n' +
        '</table>',
        box('warn', 'Rejet automatique 404 sur type invalide', 'shield',
          '    <p>Si une route attend <code>&lt;int:article_id&gt;</code> et qu’un client appelle ' +
          '<code>/articles/abc</code>, Flask rejette automatiquement la requête avec une erreur <code>404 Not Found</code> ' +
          'sans même exécuter le corps de votre fonction.</p>')
      ].join('\n')
    },
    {
      title: 'Filtrer les méthodes HTTP avec le paramètre methods',
      html: [
        '<p>Par défaut, une route Flask ne répond qu’aux requêtes <code>GET</code>. Pour autoriser des verbes ' +
        'supplémentaires comme <code>POST</code>, <code>PUT</code> ou <code>DELETE</code>, on renseigne ' +
        'le paramètre <code>methods</code> du décorateur :</p>',
        '<pre><code>@app.route("/articles", methods=["GET", "POST"])\ndef gerer_articles():\n    if request.method == "POST":\n        # Création d’un nouvel article\n        donnees = request.get_json()\n        return {"statut": "cree", "titre": donnees.get("titre")}, 201\n    # Sinon, retour de la liste (GET)\n    return {"articles": []}, 200</code></pre>',
        '<p>Si un client effectue une requête avec un verbe non listé (par exemple <code>DELETE</code> sur cette route), ' +
        'Flask interrompt l’échange avec le code d’état <code>405 Method Not Allowed</code>.</p>'
      ].join('\n')
    },
    {
      title: 'Inspecter les données avec l’objet request',
      html: [
        '<p>Flask met à disposition l’objet global contextuel <code>request</code> (importé depuis <code>flask</code>). ' +
        'Cet objet encapsule toutes les informations envoyées par le client pour la requête en cours de traitement :</p>',
        '<ul>\n' +
        '  <li><code>request.method</code> : chaîne contenant la méthode HTTP (ex. <code>"GET"</code>, <code>"POST"</code>).</li>\n' +
        '  <li><code>request.args</code> : dictionnaire immuable (<code>MultiDict</code>) contenant les paramètres de la Query String. Ex. : <code>page = request.args.get("page", 1, type=int)</code>.</li>\n' +
        '  <li><code>request.headers</code> : dictionnaire insensible à la casse des en-têtes HTTP (ex. <code>request.headers.get("Authorization")</code>).</li>\n' +
        '  <li><code>request.get_json()</code> : désérialise le corps de la requête en dictionnaire ou liste Python. Renvoie <code>None</code> si le <code>Content-Type</code> n’est pas <code>application/json</code>.</li>\n' +
        '</ul>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quel micro-framework Python est réputé pour sa simplicité et sa flexibilité ?', opts: ['Flask', 'Django', 'Spring Boot'], correct: 0, exp: 'Flask est un micro-framework minimaliste très populaire en Python.' },
    { stem: 'Quel décorateur associe une URL à une fonction dans Flask ?', opts: ['@app.route()', '@app.endpoint()', '@app.listen()'], correct: 0, exp: '@app.route("/chemin") enregistre l’association URL-fonction dans l’application.' },
    { stem: 'Quel convertisseur de route Flask garantit que l’argument reçu est un entier positif ?', opts: ['&lt;int:id&gt;', '&lt;number:id&gt;', '&lt;integer:id&gt;'], correct: 0, exp: '&lt;int:...&gt; valide et caste directement la portion d’URL en entier.' },
    { stem: 'Par défaut, quelle méthode HTTP une route Flask accepte-t-elle sans configuration ?', opts: ['GET uniquement', 'GET et POST', 'Toutes les méthodes HTTP'], correct: 0, exp: 'Par défaut, une route Flask ne répond qu’aux requêtes GET.' },
    { stem: 'Quel code d’état HTTP Flask renvoie-t-il si la méthode utilisée n’est pas autorisée ?', opts: ['405 Method Not Allowed', '404 Not Found', '400 Bad Request'], correct: 0, exp: 'Le code 405 signale que la méthode demandée n’est pas supportée par l’endpoint.' },
    { stem: 'Comment récupère-t-on un paramètre passé dans la query string avec Flask ?', opts: ['request.args.get("cle")', 'request.query["cle"]', 'request.params("cle")'], correct: 0, exp: 'request.args est le conteneur MultiDict dédié aux paramètres d’URL.' },
    { stem: 'Quelle méthode de l’objet request extrait et décode le corps JSON d’une requête ?', opts: ['request.get_json()', 'request.json_decode()', 'request.parse_body()'], correct: 0, exp: 'request.get_json() parse le corps de la requête en objet Python.' },
    { stem: 'Que vaut __name__ passé au constructeur Flask(__name__) ?', opts: ['Le nom du module Python courant', 'Le nom d’utilisateur de la machine', 'L’adresse IP du serveur'], correct: 0, exp: '__name__ permet à Flask de localiser les ressources et modules du projet.' }
  ],

  pitfalls: [
    'Oublier de spécifier methods=["POST"] et recevoir une erreur 405 Method Not Allowed.',
    'Appeler request.get_json() sans vérifier si le retour est None (absence de corps ou Content-Type invalide).',
    'Tenter de convertir un paramètre request.args.get() en int sans valeur de repli ni gestion d’exception.',
    'Confondre request.args (paramètres d’URL ?page=2) et les variables de route dynamiques (/utilisateurs/&lt;int:id&gt;).',
    'Laisser le mode debug=True actif en environnement de production (faille de sécurité critique avec console interactive).'
  ],

  methodTitle: 'Déclarer un point d’entrée REST avec Flask',
  method: [
    '<strong>Définir l’URI et la méthode</strong> : choisir l’URI canonique et la liste methods=[...].',
    '<strong>Déclarer le décorateur</strong> : placer @app.route("/...", methods=[...]) au-dessus de la fonction vue.',
    '<strong>Typer les variables dynamiques</strong> : utiliser les convertisseurs appropriés (&lt;int:id&gt;).',
    '<strong>Extraire les données</strong> : lire request.args pour les filtres et request.get_json() pour le body.',
    '<strong>Renvoyer la réponse</strong> : retourner un dictionnaire et le code de statut HTTP adapté.'
  ],

  summary: [
    'Flask est un micro-framework Python léger s’appuyant sur Werkzeug pour le routage HTTP.',
    'Le décorateur @app.route() lie une URL à une fonction vue Python.',
    'Les convertisseurs de paramètres (&lt;int:...&gt;, &lt;string:...&gt;) valident les types d’URL automatiquement.',
    'Le paramètre methods=["GET", "POST", ...] filtre rigoureusement les verbes HTTP acceptés.',
    'L’objet contextuel request donne un accès direct aux en-têtes, à la query string et au corps JSON.'
  ],

  checklist: [
    'Je sais instancier une application Flask avec Flask(__name__).',
    'Je maîtrise la déclaration de routes simples et de routes à paramètres dynamiques.',
    'Je sais autoriser plusieurs verbes HTTP sur un même endpoint.',
    'Je sais extraire des paramètres de recherche depuis request.args.',
    'Je sais parser un payload JSON avec request.get_json().'
  ],

  notions: ['Flask', 'Micro-framework', 'WSGI', '@app.route', 'Convertisseur de route', 'methods', '405 Method Not Allowed', 'request', 'request.args', 'request.get_json'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise l’instanciation de Flask et la syntaxe @app.route.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur l’utilisation de request et les convertisseurs dynamiques.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises le routage et le filtrage des méthodes.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux codes d’état et à la sérialisation au chapitre 4.' }
  ],

  flashcards: [
    { q: 'Comment instancie-t-on une application Flask minimale ?', a: 'app = Flask(__name__)' },
    { q: 'Comment restreindre une route Flask aux méthodes POST et PUT ?', a: '@app.route("/...", methods=["POST", "PUT"])' },
    { q: 'Que fait le convertisseur &lt;int:id&gt; si un texte est passé dans l’URL ?', a: 'Flask renvoie automatiquement une erreur 404 Not Found sans appeler la fonction.' },
    { q: 'Comment lire un paramètre d’URL optionnel ?page=2 dans Flask ?', a: 'page = request.args.get("page", 1, type=int)' },
    { q: 'Que renvoie request.get_json() si le client n’a pas envoyé de Content-Type: application/json ?', a: 'Elle renvoie None (par défaut).' },
    { q: 'Quelle erreur HTTP est renvoyée si la méthode de la requête n’est pas dans methods ?', a: '405 Method Not Allowed.' }
  ],

  next: {
    href: 'chapitre4.html',
    label: 'Chapitre 4 : Status codes & réponses JSON'
  }
};
