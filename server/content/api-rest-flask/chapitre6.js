/**
 * Chapitre 6 du cours « API REST avec Flask » B2 — Mini API complète & persistance.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Mini API complète & persistance',
  short: 'Mini API & CRUD',
  toc: 'CRUD complet en mémoire, modularité avec les Blueprints, persistance SQLAlchemy, documentation OpenAPI et déploiement.',
  time: '≈ 3 h 15 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Passer de fragments de code isolés à une architecture logicielle robuste et maintenable exige de structurer ' +
    'les modules avec soin. Ce dernier chapitre synthétise l’ensemble des notions pour concevoir un CRUD complet, ' +
    'organiser les routes avec les Blueprints et préparer l’application à la production.',

  objectives: [
    'concevoir et assembler un CRUD complet (Create, Read, Update, Delete) conforme REST ;',
    'gérer un modèle de persistance en mémoire ou connecté à une base relationnelle ;',
    'modulariser une application Flask volumineuse à l’aide des Blueprints ;',
    'documenter les contrats d’API selon la spécification OpenAPI / Swagger ;',
    'comprendre les prérequis de mise en production avec un serveur WSGI (Gunicorn).'
  ],

  sections: [
    {
      title: 'Synthèse d’un CRUD RESTful complet',
      html: [
        '<p>Un point d’accès CRUD complet met en œuvre l’intégralité des principes abordés :</p>',
        '<pre><code>from flask import Flask, request, jsonify, abort\n\napp = Flask(__name__)\n\n# Base de données en mémoire pour illustration\nETUDIANTS = [\n    {"id": 1, "nom": "Amina", "filiere": "Informatique"},\n    {"id": 2, "nom": "Lucas", "filiere": "Réseaux"}\n]\n\n# 1. READ (Collection) avec filtrage optionnel\n@app.route("/etudiants", methods=["GET"])\ndef lister_etudiants():\n    filiere = request.args.get("filiere")\n    if filiere:\n        resultats = [e for e in ETUDIANTS if e["filiere"].lower() == filiere.lower()]\n        return jsonify(resultats), 200\n    return jsonify(ETUDIANTS), 200\n\n# 2. READ (Élément)\n@app.route("/etudiants/&lt;int:id&gt;", methods=["GET"])\ndef obtenir_etudiant(id):\n    etudiant = next((e for e in ETUDIANTS if e["id"] == id), None)\n    if not etudiant:\n        abort(404, description="Étudiant introuvable")\n    return jsonify(etudiant), 200\n\n# 3. CREATE\n@app.route("/etudiants", methods=["POST"])\ndef creer_etudiant():\n    data = request.get_json()\n    if not data or "nom" not in data or "filiere" not in data:\n        abort(400, description="Les champs nom et filiere sont requis")\n    nouvel_id = max((e["id"] for e in ETUDIANTS), default=0) + 1\n    etudiant = {"id": nouvel_id, "nom": data["nom"], "filiere": data["filiere"]}\n    ETUDIANTS.append(etudiant)\n    return jsonify(etudiant), 201\n\n# 4. UPDATE (PATCH)\n@app.route("/etudiants/&lt;int:id&gt;", methods=["PATCH"])\ndef modifier_etudiant(id):\n    etudiant = next((e for e in ETUDIANTS if e["id"] == id), None)\n    if not etudiant:\n        abort(404, description="Étudiant introuvable")\n    data = request.get_json() or {}\n    for champ in ("nom", "filiere"):\n        if champ in data:\n            etudiant[champ] = data[champ]\n    return jsonify(etudiant), 200\n\n# 5. DELETE\n@app.route("/etudiants/&lt;int:id&gt;", methods=["DELETE"])\ndef supprimer_etudiant(id):\n    global ETUDIANTS\n    etudiant = next((e for e in ETUDIANTS if e["id"] == id), None)\n    if not etudiant:\n        abort(404, description="Étudiant introuvable")\n    ETUDIANTS = [e for e in ETUDIANTS if e["id"] != id]\n    return "", 204</code></pre>'
      ].join('\n')
    },
    {
      title: 'Modulariser avec les Blueprints Flask',
      html: [
        '<p>Lorsque le projet prend de l’ampleur, regrouper toutes les routes dans un fichier <code>app.py</code> unique ' +
        'devient ingérable. Flask propose le patron architectural des <strong>Blueprints</strong> pour découper ' +
        'l’application en modules fonctionnels indépendants :</p>',
        '<pre><code># routes/etudiants.py\nfrom flask import Blueprint, jsonify\n\netudiants_bp = Blueprint("etudiants", __name__, url_prefix="/api/v1/etudiants")\n\n@etudiants_bp.route("/", methods=["GET"])\ndef lister():\n    return jsonify([])\n\n# app.py\nfrom flask import Flask\nfrom routes.etudiants import etudiants_bp\n\napp = Flask(__name__)\napp.register_blueprint(etudiants_bp)</code></pre>',
        box('tech', 'Avantages du préfixe d’URL', 'code',
          '    <p>Le paramètre <code>url_prefix="/api/v1/etudiants"</code> factorise l’arborescence : ' +
          'toutes les routes du Blueprint bénéficient automatiquement de ce préfixe sans répétition.</p>')
      ].join('\n')
    },
    {
      title: 'Persistance avec SQLAlchemy',
      html: [
        '<p>Pour dépasser le stockage volatil en mémoire, on utilise généralement l’extension ' +
        '<strong>Flask-SQLAlchemy</strong> qui fait le pont entre Python et une base SQL (PostgreSQL, SQLite, MySQL) :</p>',
        '<pre><code>from flask_sqlalchemy import SQLAlchemy\n\ndb = SQLAlchemy(app)\n\nclass Etudiant(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    nom = db.Column(db.String(100), nullable=False)\n    filiere = db.Column(db.String(50), nullable=False)\n\n    def to_dict(self):\n        return {"id": self.id, "nom": self.nom, "filiere": self.filiere}</code></pre>',
        '<p>L’écriture d’une méthode <code>to_dict()</code> ou l’usage de bibliothèques comme Marshmallow ' +
        'garantit une sérialisation JSON propre et contrôlée.</p>'
      ].join('\n')
    },
    {
      title: 'Documentation OpenAPI et Déploiement en production',
      html: [
        '<p>Pour qu’une API soit facilement exploitable par des tiers, documenter ses endpoints est indispensable. ' +
        'Le standard <strong>OpenAPI</strong> (anciennement Swagger) permet de générer une interface interactive ' +
        'où les consommateurs peuvent tester les appels en direct.</p>',
        '<p>En production, le serveur de développement intégré de Flask (<code>app.run()</code>) ne doit <strong>jamais</strong> ' +
        'être utilisé : il n’est ni sécurisé ni dimensionné pour la concurrence. On déploie l’application derrière un ' +
        'serveur WSGI robuste tel que <strong>Gunicorn</strong> ou <strong>uWSGI</strong>, orchestré par un reverse proxy comme <strong>Nginx</strong> :</p>',
        '<pre><code>gunicorn -w 4 -b 0.0.0.0:8000 "app:app"</code></pre>',
        box('warn', 'Règle de sécurité absolue', 'shield',
          '    <p>Ne jamais lancer <code>app.run(debug=True)</code> sur un serveur public accessible : ' +
          'le debugger interactif de Werkzeug permet l’exécution arbitraire de code Python sur la machine hôte !</p>')
      ].join('\n')
    },
    {
      title: 'Architecture modulaire complète : Blueprint Flask, middleware JWT et CRUD testé',
      html: [
        '<p>Voici l’architecture complète d’un module <code>Blueprint</code> Flask combinant routes CRUD (<code>GET</code>, ' +
        '<code>POST</code>, <code>DELETE</code>), codes HTTP (<code>200</code>, <code>201</code>, <code>204</code>, <code>400</code>, <code>404</code>, <code>422</code>), ' +
        'protection JWT et tests d’intégration via <code>app.test_client()</code> :</p>',
        '<pre><code class="language-python">from functools import wraps\n' +
        'from flask import Flask, Blueprint, request, jsonify\n\n' +
        'taches_bp = Blueprint("taches", __name__, url_prefix="/api/v1/taches")\n' +
        'TACHES = {1: {"id": 1, "titre": "Configurer Gunicorn", "fait": False}}\n\n' +
        'def require_jwt(fn):\n' +
        '    @wraps(fn)\n' +
        '    def wrapper(*args, **kwargs):\n' +
        '        auth = request.headers.get("Authorization", "")\n' +
        '        if auth != "Bearer jeton-valide-b2":\n' +
        '            return jsonify({"error": "Jeton JWT manquant ou invalide"}), 401\n' +
        '        return fn(*args, **kwargs)\n' +
        '    return wrapper\n\n' +
        '@taches_bp.route("", methods=["GET"])\n' +
        'def lister_taches():\n' +
        '    return jsonify(list(TACHES.values())), 200\n\n' +
        '@taches_bp.route("", methods=["POST"])\n' +
        '@require_jwt\n' +
        'def ajouter_tache():\n' +
        '    data = request.get_json(silent=True)\n' +
        '    if not isinstance(data, dict):\n' +
        '        return jsonify({"error": "Corps JSON invalide"}), 400\n' +
        '    titre = str(data.get("titre", "")).strip()\n' +
        '    if not titre:\n' +
        '        return jsonify({"error": "Le champ titre est obligatoire"}), 422\n' +
        '    new_id = max(TACHES.keys(), default=0) + 1\n' +
        '    TACHES[new_id] = {"id": new_id, "titre": titre, "fait": bool(data.get("fait", False))}\n' +
        '    return jsonify(TACHES[new_id]), 201\n\n' +
        '@taches_bp.route("/<int:tid>", methods=["DELETE"])\n' +
        '@require_jwt\n' +
        'def supprimer_tache(tid):\n' +
        '    if tid not in TACHES:\n' +
        '        return jsonify({"error": "Tâche introuvable"}), 404\n' +
        '    del TACHES[tid]\n' +
        '    return "", 204\n\n' +
        'def creer_application():\n' +
        '    app = Flask(__name__)\n' +
        '    app.register_blueprint(taches_bp)\n' +
        '    return app\n\n' +
        'if __name__ == "__main__":\n' +
        '    app = creer_application()\n' +
        '    client = app.test_client()\n' +
        '    assert client.post("/api/v1/taches", json={"titre": "Test"}).status_code == 401\n' +
        '    r_post = client.post("/api/v1/taches", json={"titre": "Déployer"}, headers={"Authorization": "Bearer jeton-valide-b2"})\n' +
        '    assert r_post.status_code == 201</code></pre>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'À quoi servent les Blueprints dans une application Flask ?', opts: ['À organiser l’application en modules de routes réutilisables et découplés', 'À créer automatiquement les tables de la base de données', 'À compiler le code Python en binaire machine'], correct: 0, exp: 'Les Blueprints permettent de structurer et découper les applications Flask volumineuses.' },
    { stem: 'Quel paramètre d’un Blueprint factorise l’URI racine de toutes ses routes ?', opts: ['base_path', 'url_prefix', 'root_uri'], correct: 1, exp: 'url_prefix permet d’appliquer un préfixe commun à toutes les routes d’un Blueprint.' },
    { stem: 'Quelle méthode HTTP est la plus adaptée pour supprimer un élément dans un CRUD ?', opts: ['DELETE', 'POST', 'GET'], correct: 0, exp: 'DELETE est le verbe REST canonique dédié à la suppression de ressources.' },
    { stem: 'Quel code d’état renvoie généralement une route DELETE réussie sans contenu retourné ?', opts: ['200 OK', '204 No Content', '201 Created'], correct: 1, exp: '204 No Content confirme la suppression sans avoir à renvoyer de corps.' },
    { stem: 'Pourquoi ne faut-il JAMAIS utiliser app.run(debug=True) en production ?', opts: ["Le mode débogage vide la batterie du serveur en production","Chaque requête GET devient payante au-delà d’un certain quota","Le débogueur interactif permet d’exécuter du code à distance sur le serveur"], correct: 2, exp: "Le débogueur Werkzeug exécute du code arbitraire à distance : faille critique s’il est exposé. Ni la batterie ni des GET payants n’entrent en ligne de compte." },
    { stem: 'Quel serveur WSGI de production est couramment employé pour faire tourner Flask ?', opts: ['Node.js', 'Webpack', 'Gunicorn'], correct: 2, exp: 'Gunicorn (Green Unicorn) est un serveur WSGI Python standard, performant et éprouvé.' },
    { stem: 'Quel standard permet de formaliser et documenter le contrat d’une API REST ?', opts: ['OpenAPI / Swagger', 'HTML5', 'RSS'], correct: 0, exp: 'OpenAPI est la spécification de référence pour documenter les interfaces d’API REST.' },
    { stem: 'Comment enregistre-t-on un Blueprint nommé users_bp dans l’application app ?', opts: ['app.use(users_bp)', 'app.register_blueprint(users_bp)', 'app.add_module(users_bp)'], correct: 1, exp: 'register_blueprint rattache le module et ses routes à l’application principale.' }
  ],

  pitfalls: [
    'Regrouper des dizaines d’endpoints hétérogènes dans un unique fichier monolithique.',
    'Exécuter app.run() en production au lieu d’utiliser un gestionnaire de processus WSGI (Gunicorn).',
    'Oublier de documenter les contrats de requêtes et de réponses avec OpenAPI.',
    'Ne pas gérer les suppressions d’enregistrements dépendants (problème d’intégrité référentielle).',
    'Renvoyer des modèles de base de données bruts sans les sérialiser en dictionnaire ou DTO propre.'
  ],

  methodTitle: 'Structurer une API Flask prête pour la production',
  method: [
    '<strong>Découper par domaine</strong> : créer un Blueprint par ressource principale (ex. auth, articles, utilisateurs).',
    '<strong>Implémenter le cycle CRUD</strong> : mapper rigoureusement GET, POST, PUT/PATCH et DELETE.',
    '<strong>Isoler la couche de données</strong> : définir des modèles clairs avec méthodes to_dict() pour la sérialisation.',
    '<strong>Documenter les contrats</strong> : décrire chaque schéma et code retour dans la spécification OpenAPI.',
    '<strong>Configurer le serveur WSGI</strong> : tester le démarrage avec Gunicorn en environnement de pré-production.'
  ],

  summary: [
    'Un CRUD complet applique l’ensemble des standards REST (verbes, codes de statut, formats JSON).',
    'Les Blueprints apportent modularité et lisibilité en factorisant préfixes d’URL et gestionnaires.',
    'SQLAlchemy simplifie la persistance relationnelle et la modélisation objet.',
    'OpenAPI (Swagger) fournit une documentation interactive indispensable pour les consommateurs.',
    'En production, l’application doit être servie par un serveur WSGI dédié comme Gunicorn.'
  ],

  checklist: [
    'Je sais concevoir un CRUD complet respectant les conventions REST.',
    'Je maîtrise la création et l’enregistrement des Blueprints Flask.',
    'Je comprends l’intérêt d’un ORM comme SQLAlchemy pour la persistance.',
    'Je sais comment documenter une API avec OpenAPI / Swagger.',
    'Je connais les risques du mode debug et le rôle d’un serveur WSGI en production.'
  ],

  notions: ['CRUD', 'Blueprints', 'Modularité', 'url_prefix', 'SQLAlchemy', 'Persistance', 'OpenAPI', 'Swagger', 'WSGI', 'Gunicorn'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise l’assemblage du CRUD complet et les verbes associés.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur le découpage en Blueprints et la persistance.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez l’architecture globale d’une API Flask.' },
    { cls: 'top', text: '≥ 95 % — Félicitations : vous possédez toutes les compétences pour concevoir des API professionnelles !' }
  ],

  flashcards: [
    { q: 'Quel est l’intérêt majeur d’un Blueprint dans Flask ?', a: 'Découper l’application en modules fonctionnels indépendants et réutilisables.' },
    { q: 'Comment définir un préfixe commun pour toutes les routes d’un Blueprint ?', a: 'En passant url_prefix="/..." lors de l’instanciation du Blueprint.' },
    { q: 'Pourquoi app.run(debug=True) est-il interdit en production ?', a: 'Car le débogueur interactif de Flask permet d’exécuter du code arbitraire sur le serveur.' },
    { q: 'Quel serveur WSGI est couramment utilisé en production avec Flask ?', a: 'Gunicorn (Green Unicorn).' },
    { q: 'Qu’est-ce qu’OpenAPI / Swagger ?', a: 'Une spécification universelle de description et de documentation interactive des API REST.' },
    { q: 'Que fait la méthode to_dict() sur un modèle SQLAlchemy ?', a: 'Elle convertit l’objet modèle en dictionnaire Python prêt à être sérialisé en JSON par jsonify().' }
  ],

  next: {
    href: 'examens-exercices.html',
    label: 'Exercices & Examens'
  }
};
