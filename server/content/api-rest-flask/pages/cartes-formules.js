/**
 * Pages « cartes de révision » et « mémo » du cours « API REST avec Flask » B2.
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav } = require('./helpers');

/* ======================== Cartes ======================== */

function cartes(course, chapterList) {
  const modules = chapterList.map(chapitre => ({
    title: 'Module ' + chapitre.n + ' — ' + chapitre.title,
    items: chapitre.flashcards
  }));

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Cartes' }]),
    '  <h1>Cartes de révision</h1>',
    '  <p class="lead">Cliquez sur une carte pour révéler la réponse. Objectif : répondre sans hésiter dans ' +
    'les deux sens pour ancrer durablement les concepts clés des API REST et de Flask.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo syntaxe' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours d’API REST avec Flask B2 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Mémo ======================== */

function formules(course) {
  const bloc = (titre, html) => '  <h2>' + titre + '</h2>\n' + html;

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo syntaxe REST &amp; Flask</h1>',
    '  <p class="lead">Toutes les structures, méthodes et syntaxes indispensables de REST et Flask réunies ' +
    'sur une seule page. À garder ouvert pendant vos ateliers pratiques.</p>',

    bloc('1. Protocole HTTP &amp; En-têtes', [
      '<pre><code>// Requête HTTP type\nPOST /api/v1/articles HTTP/1.1\nHost: api.monsite.fr\nContent-Type: application/json\nAccept: application/json\n\n{"titre": "Guide", "prix": 29.9}\n\n// En-têtes clés\nContent-Type : format du corps envoyé (application/json)\nAccept       : format souhaité en retour\nAuthorization: jeton d’accès (Bearer &lt;token&gt;)</code></pre>'
    ].join('\n')),

    bloc('2. Conception REST &amp; Verbes canoniques', [
      '<pre><code>GET    /ressources       # Lister la collection (sûr, idempotent)\nGET    /ressources/42    # Consulter l’élément 42 (sûr, idempotent)\nPOST   /ressources       # Créer un élément (non-sûr, NON-idempotent) -&gt; 201 Created\nPUT    /ressources/42    # Remplacer complètement l’élément 42 (idempotent) -&gt; 200 OK\nPATCH  /ressources/42    # Modifier partiellement l’élément 42 (non-sûr) -&gt; 200 OK\nDELETE /ressources/42    # Supprimer l’élément 42 (idempotent) -&gt; 204 No Content</code></pre>'
    ].join('\n')),

    bloc('3. Démarrage Flask &amp; Routage dynamique', [
      '<pre><code>from flask import Flask, request, jsonify, abort\n\napp = Flask(__name__)\n\n# Convertisseurs de route typés\n@app.route("/utilisateurs/&lt;int:id&gt;")           # Entier uniquement\n@app.route("/fichiers/&lt;path:chemin&gt;")          # Chemin avec slashes\n@app.route("/articles/&lt;string:slug&gt;")         # Chaîne standard sans slash\n\n# Restriction de méthodes\n@app.route("/articles", methods=["GET", "POST"])\ndef gerer():\n    if request.method == "POST":\n        pass</code></pre>'
    ].join('\n')),

    bloc('4. Inspection de la requête (request)', [
      '<pre><code># Paramètres de Query String (?page=2&amp;limit=10)\npage = request.args.get("page", 1, type=int)\n\n# En-têtes HTTP de la requête\ntoken = request.headers.get("Authorization")\n\n# Corps JSON parsé en dict / list Python\npayload = request.get_json()  # Renvoie None si Content-Type non JSON</code></pre>'
    ].join('\n')),

    bloc('5. Codes d’état HTTP &amp; Réponses JSON', [
      '<pre><code># Réponse de succès standard (200 OK)\nreturn jsonify(data), 200\n\n# Création réussie avec en-tête de localisation (201 Created)\nreturn jsonify(nouvel_objet), 201, {"Location": f"/items/{nouvel_objet[\'id\']}"}\n\n# Suppression réussie sans corps (204 No Content)\nreturn "", 204\n\n# Erreur standardisée\nreturn jsonify({"code": 404, "error": "Not Found", "message": "Introuvable"}), 404</code></pre>'
    ].join('\n')),

    bloc('6. Validation, Gestion d’erreurs &amp; Blueprints', [
      '<pre><code># Interruption contrôlée avec abort\nif not item:\n    abort(404, description="Ressource absente")\n\n# Gestionnaire d’erreur global unifié\n@app.errorhandler(404)\ndef introuvable(err):\n    return jsonify({"code": 404, "error": "Not Found", "message": getattr(err, "description", "")}), 404\n\n# Modularité avec Blueprint\nfrom flask import Blueprint\nbp = Blueprint("api_v1", __name__, url_prefix="/api/v1")\napp.register_blueprint(bp)</code></pre>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'exercices/exercices.html', label: 'Exercices &amp; CRUD' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo syntaxe — ' + course.brand,
      description: 'Fiche mémo synthétique du cours d’API REST avec Flask B2 : HTTP, REST, routes Flask, codes de statut, jsonify et Blueprints.',
      active: 'memo',
      body
    }
  };
}

module.exports = { cartes, formules };
