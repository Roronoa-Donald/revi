window.COURSE_QCM = [
  {
    "id": 1,
    "ch": 1,
    "q": "Que signifie l'acronyme API ?",
    "o": [
      "Application Programming Interface",
      "Advanced Protocol Integration",
      "Automated Program Identifier",
      "Applicative Process Internet"
    ],
    "a": 0,
    "e": "Application Programming Interface (API) désigne une interface permettant à différents programmes de communiquer entre eux."
  },
  {
    "id": 2,
    "ch": 1,
    "q": "Quel est le rôle principal d'une API Web ?",
    "o": [
      "Rendre une page web plus animée",
      "Permettre l'échange de données entre un client et un serveur via HTTP",
      "Remplacer l'infrastructure réseau",
      "Générer du code CSS automatiquement"
    ],
    "a": 1,
    "e": "Une API Web expose des points d'accès (endpoints) sur le réseau pour permettre à un client de lire ou modifier des données sur un serveur."
  },
  {
    "id": 3,
    "ch": 1,
    "q": "Dans le modèle client-serveur d'une API, que représente le 'client' ?",
    "o": [
      "L'application qui formule la requête (ex: navigateur, application mobile)",
      "La base de données PostgreSQL",
      "Le routeur physique du réseau",
      "L'équipe de support technique"
    ],
    "a": 0,
    "e": "Le client est l'émetteur de la requête. Il demande des informations ou des actions au serveur."
  },
  {
    "id": 4,
    "ch": 1,
    "q": "Dans le modèle client-serveur, quel est le rôle du serveur ?",
    "o": [
      "Écrire le code JavaScript pour le frontend",
      "Recevoir la requête, la traiter, et renvoyer une réponse HTTP",
      "Ranger physiquement les câbles réseau",
      "Vérifier le navigateur de l'utilisateur"
    ],
    "a": 1,
    "e": "Le serveur est à l'écoute des requêtes. Il traite les demandes (ex: lire en base de données) et répond au client."
  },
  {
    "id": 5,
    "ch": 1,
    "q": "Quel protocole réseau est le fondement du transfert de données pour les API REST ?",
    "o": [
      "FTP",
      "SMTP",
      "HTTP",
      "SSH"
    ],
    "a": 2,
    "e": "HTTP (Hypertext Transfer Protocol) est le protocole utilisé par REST pour transporter les requêtes et réponses."
  },
  {
    "id": 6,
    "ch": 1,
    "q": "Parmi les éléments suivants, lequel ne fait PAS partie d'une requête HTTP standard ?",
    "o": [
      "La méthode HTTP (GET, POST, etc.)",
      "L'en-tête (Header) de la requête",
      "Le corps (Body) de la requête",
      "La structure des tables de la base de données"
    ],
    "a": 3,
    "e": "La base de données est interne au serveur et n'apparaît jamais dans les détails d'une requête HTTP."
  },
  {
    "id": 7,
    "ch": 1,
    "q": "Quel composant d'une réponse HTTP indique le succès ou l'échec technique d'une requête ?",
    "o": [
      "Le nom de domaine",
      "Le code d'état (Status Code)",
      "L'adresse MAC",
      "Le paramètre de chemin (path parameter)"
    ],
    "a": 1,
    "e": "Le code d'état HTTP (comme 200 ou 404) informe immédiatement le client du résultat de sa requête."
  },
  {
    "id": 8,
    "ch": 1,
    "q": "Quel en-tête (Header) HTTP permet au client de préciser le format des données qu'il envoie dans le corps ?",
    "o": [
      "Accept",
      "Authorization",
      "Content-Type",
      "User-Agent"
    ],
    "a": 2,
    "e": "Content-Type (ex: application/json) indique au serveur comment interpréter le corps de la requête."
  },
  {
    "id": 9,
    "ch": 1,
    "q": "Que signifie l'acronyme JSON ?",
    "o": [
      "JavaScript Object Notation",
      "Java System Online Network",
      "Joint Server Output Node",
      "JavaScript Oriented Null"
    ],
    "a": 0,
    "e": "JSON (JavaScript Object Notation) est un format textuel léger pour échanger des données structurées."
  },
  {
    "id": 10,
    "ch": 1,
    "q": "En JSON strict, quelle règle doit être respectée pour la déclaration des clés ?",
    "o": [
      "Les clés doivent être entourées de guillemets doubles",
      "Les clés doivent être écrites en majuscules",
      "Les clés ne peuvent pas contenir de chiffres",
      "Les clés doivent obligatoirement commencer par un underscore"
    ],
    "a": 0,
    "e": "En JSON strict, les clés et les chaînes de caractères doivent utiliser des guillemets doubles (\")."
  },
  {
    "id": 11,
    "ch": 1,
    "q": "Quel type de données parmi les suivants n'est pas valide dans un document JSON ?",
    "o": [
      "Une chaîne de caractères",
      "Un nombre entier ou décimal",
      "Une fonction ou méthode",
      "Une valeur booléenne (true/false)"
    ],
    "a": 2,
    "e": "JSON ne supporte que les types de données statiques : objets, tableaux, chaînes, nombres, booléens et null. Les fonctions en sont exclues."
  },
  {
    "id": 12,
    "ch": 1,
    "q": "Pourquoi le format JSON est-il très populaire pour les API REST face à XML ?",
    "o": [
      "JSON crypte automatiquement les données",
      "JSON est plus léger, plus lisible et s'intègre naturellement avec le JavaScript",
      "JSON remplace le besoin de bases de données",
      "JSON est compilé directement par le processeur"
    ],
    "a": 1,
    "e": "JSON est moins verbeux que XML, ce qui réduit la bande passante et accélère le traitement côté client et serveur."
  },
  {
    "id": 13,
    "ch": 1,
    "q": "À quoi sert généralement l'en-tête de requête 'Authorization' ?",
    "o": [
      "À indiquer la langue préférée de l'utilisateur",
      "À transmettre des identifiants ou un jeton pour authentifier le client",
      "À définir le temps d'expiration de la page",
      "À autoriser l'affichage des images"
    ],
    "a": 1,
    "e": "L'en-tête Authorization (ex: Bearer token) prouve l'identité du client auprès du serveur pour accéder aux routes protégées."
  },
  {
    "id": 14,
    "ch": 1,
    "q": "Qu'est-ce qu'un 'endpoint' (point d'accès) dans une API Web ?",
    "o": [
      "L'adresse physique de la carte mère du serveur",
      "Une URL spécifique exposée par l'API pour effectuer des requêtes sur une ressource",
      "Le bouton de fermeture de l'application",
      "L'identifiant unique de la base de données"
    ],
    "a": 1,
    "e": "Un endpoint correspond à la combinaison d'une URL et d'une méthode HTTP (ex: GET /students)."
  },
  {
    "id": 15,
    "ch": 1,
    "q": "Quel en-tête de requête HTTP le client peut-il utiliser pour indiquer au serveur le format qu'il souhaite recevoir ?",
    "o": [
      "Accept",
      "Content-Type",
      "Host",
      "User-Agent"
    ],
    "a": 0,
    "e": "L'en-tête Accept (ex: application/json) permet au client de négocier le format de contenu de la réponse."
  },
  {
    "id": 16,
    "ch": 1,
    "q": "Dans l'URL 'https://api.monsite.com/v1/users', quelle partie correspond au nom d'hôte (Host) ?",
    "o": [
      "/v1/users",
      "https",
      "api.monsite.com",
      "users"
    ],
    "a": 2,
    "e": "api.monsite.com représente le nom de domaine ou nom d'hôte (Host) identifiant le serveur sur internet."
  },
  {
    "id": 17,
    "ch": 1,
    "q": "Pourquoi les API Web permettent-elles une indépendance de la plateforme ?",
    "o": [
      "Elles obligent tous les programmes à être codés en Python",
      "Elles communiquent via des protocoles et formats standardisés (HTTP/JSON) indépendants du langage",
      "Elles n'ont pas besoin de système d'exploitation",
      "Elles convertissent tout le code en code machine unique"
    ],
    "a": 1,
    "e": "Comme l'échange se fait par des formats universels (JSON), un frontend en React (JS) peut dialoguer sans problème avec un backend en Flask (Python)."
  },
  {
    "id": 18,
    "ch": 2,
    "q": "Que signifie l'acronyme REST ?",
    "o": [
      "Representational State Transfer",
      "Remote External System Technology",
      "Realtime Encryption Security Protocol",
      "Resource Efficient Storage Tool"
    ],
    "a": 0,
    "e": "REST (Representational State Transfer) est un style d'architecture logicielle pour concevoir des applications web basées sur des ressources."
  },
  {
    "id": 19,
    "ch": 2,
    "q": "Dans une API REST, qu'est-ce qu'une 'ressource' ?",
    "o": [
      "Un fichier de style CSS",
      "Une entité conceptuelle manipulable de l'application (ex: un étudiant, une classe, un produit)",
      "La quantité de RAM disponible sur le serveur",
      "La bande passante totale du réseau"
    ],
    "a": 1,
    "e": "Une ressource est n'importe quel objet ou concept de données exposé par l'API (ex: /students, /courses)."
  },
  {
    "id": 20,
    "ch": 2,
    "q": "Quelle est la bonne pratique de nommage REST pour lister des classes ?",
    "o": [
      "GET /getClasses",
      "GET /classes",
      "POST /classes/all",
      "GET /listAllClasses"
    ],
    "a": 1,
    "e": "REST utilise des noms au pluriel pour représenter les collections, l'action (lire) étant portée par la méthode HTTP GET."
  },
  {
    "id": 21,
    "ch": 2,
    "q": "Quelle structure d'URL est la plus conforme aux principes REST pour récupérer les détails de la classe '42' ?",
    "o": [
      "GET /classDetails?id=42",
      "GET /classes/42",
      "GET /classes/id/42",
      "POST /getClassById/42"
    ],
    "a": 1,
    "e": "Pour cibler un élément spécifique, on place son identifiant directement dans le chemin après le nom de la collection."
  },
  {
    "id": 22,
    "ch": 2,
    "q": "Quelle méthode HTTP est spécifiquement dédiée à la création d'une nouvelle ressource ?",
    "o": [
      "GET",
      "PUT",
      "POST",
      "PATCH"
    ],
    "a": 2,
    "e": "POST est utilisé pour créer une nouvelle ressource au sein d'une collection générique (ex: POST /students)."
  },
  {
    "id": 23,
    "ch": 2,
    "q": "Quelle est la différence fondamentale entre POST et PUT dans REST ?",
    "o": [
      "POST est réservé à la lecture, PUT à la modification",
      "POST s'applique sur la collection pour créer (id inconnu), PUT s'applique sur une ressource identifiée pour remplacer (id connu)",
      "PUT est plus rapide que POST",
      "POST ne peut pas envoyer de JSON, contrairement à PUT"
    ],
    "a": 1,
    "e": "POST crée une ressource sous un identifiant généré par le serveur. PUT crée ou remplace une ressource à un URI précis déjà déterminé."
  },
  {
    "id": 24,
    "ch": 2,
    "q": "Quelle méthode HTTP permet de remplacer ou mettre à jour entièrement une ressource identifiée ?",
    "o": [
      "POST",
      "PUT",
      "GET",
      "OPTIONS"
    ],
    "a": 1,
    "e": "PUT écrase ou crée la ressource ciblée à l'URI spécifié (ex: PUT /students/42)."
  },
  {
    "id": 25,
    "ch": 2,
    "q": "Quelle méthode HTTP doit être appelée pour retirer définitivement une ressource ?",
    "o": [
      "REMOVE",
      "DELETE",
      "POST",
      "GET"
    ],
    "a": 1,
    "e": "DELETE est la méthode standard pour supprimer une ressource identifiée (ex: DELETE /students/42)."
  },
  {
    "id": 26,
    "ch": 2,
    "q": "Pourquoi la route 'GET /deleteStudent/42' viole-t-elle les principes de REST ?",
    "o": [
      "Parce qu'elle utilise un identifiant numérique",
      "Parce qu'elle exprime une action de modification dans l'URL et utilise GET au lieu de la méthode DELETE",
      "Parce qu'elle ne renvoie pas de format XML",
      "Parce qu'elle est trop courte"
    ],
    "a": 1,
    "e": "L'action ne doit pas figurer dans l'URL. On doit utiliser la méthode HTTP DELETE sur la ressource : DELETE /students/42."
  },
  {
    "id": 27,
    "ch": 2,
    "q": "Que signifie le concept d'idempotence pour une méthode HTTP ?",
    "o": [
      "Elle renvoie toujours la même date dans les en-têtes",
      "L'appeler plusieurs fois de suite avec les mêmes paramètres produit le même état final sur le serveur",
      "Elle s'exécute en moins d'une milliseconde",
      "Elle n'autorise que les requêtes locales"
    ],
    "a": 1,
    "e": "Une méthode est idempotente si plusieurs requêtes identiques successives ont le même effet sur le serveur que la première."
  },
  {
    "id": 28,
    "ch": 2,
    "q": "Parmi les méthodes suivantes, laquelle n'est pas idempotente ?",
    "o": [
      "GET",
      "PUT",
      "POST",
      "DELETE"
    ],
    "a": 2,
    "e": "POST n'est pas idempotente car l'appeler plusieurs fois créera plusieurs ressources différentes (ex: ajouter 3 fois le même étudiant génère 3 entrées)."
  },
  {
    "id": 29,
    "ch": 2,
    "q": "Quelle méthode HTTP permet d'effectuer une mise à jour partielle (ex: modifier uniquement l'email d'un utilisateur) ?",
    "o": [
      "PUT",
      "PATCH",
      "POST",
      "GET"
    ],
    "a": 1,
    "e": "PATCH est conçu pour appliquer des modifications partielles à une ressource existante."
  },
  {
    "id": 30,
    "ch": 2,
    "q": "Que signifie le fait qu'une API REST soit 'stateless' ?",
    "o": [
      "Le serveur ne garde en mémoire aucune session ou contexte utilisateur entre les requêtes. Chaque requête doit contenir tout le nécessaire",
      "Le serveur n'utilise pas de base de données",
      "L'application ne peut pas changer d'état",
      "L'API ne fonctionne que sans connexion Internet"
    ],
    "a": 0,
    "e": "Dans une API sans état, chaque requête est indépendante. L'authentification et les paramètres requis doivent être fournis à chaque appel."
  },
  {
    "id": 31,
    "ch": 2,
    "q": "Quelle route REST est la plus logique pour lister les notes (grades) de l'étudiant 12 ?",
    "o": [
      "GET /gradesOfStudent/12",
      "GET /students/12/grades",
      "GET /grades?studentId=12",
      "POST /students/12/getGrades"
    ],
    "a": 1,
    "e": "La relation hiérarchique s'exprime naturellement par l'imbrication des chemins : /collection/id/sous-collection."
  },
  {
    "id": 32,
    "ch": 2,
    "q": "Quelle méthode HTTP est considérée comme 'sûre' (safe) car elle ne modifie jamais les données sur le serveur ?",
    "o": [
      "POST",
      "PUT",
      "GET",
      "DELETE"
    ],
    "a": 2,
    "e": "GET ne doit servir qu'à la lecture. Elle est sûre car sa consultation n'altère pas l'état des ressources."
  },
  {
    "id": 33,
    "ch": 2,
    "q": "Quelle est la bonne pratique concernant l'usage du pluriel pour les collections de ressources ?",
    "o": [
      "Utiliser le pluriel pour les collections (ex: /students) et le même chemin avec l'ID pour un élément (ex: /students/42)",
      "Utiliser le singulier partout (ex: /student et /student/42)",
      "Mélanger selon le nombre d'éléments attendus",
      "Utiliser le pluriel uniquement pour les requêtes POST"
    ],
    "a": 0,
    "e": "L'usage constant du pluriel (ex: /students) simplifie la structure et rend l'API cohérente pour l'accès aux collections et aux éléments."
  },
  {
    "id": 34,
    "ch": 2,
    "q": "Dans quel cas est-il préférable d'utiliser des paramètres de requête (ex: /students?age=20) plutôt que des paramètres de chemin ?",
    "o": [
      "Pour cibler un étudiant précis par son identifiant unique",
      "Pour filtrer, trier ou paginer les résultats d'une collection d'éléments",
      "Pour sécuriser les mots de passe des utilisateurs",
      "Pour créer une nouvelle ressource"
    ],
    "a": 1,
    "e": "Les paramètres de requête (query parameters) servent à modifier la vue d'une collection (filtres, tri, pagination), pas à cibler une ressource précise."
  },
  {
    "id": 35,
    "ch": 3,
    "q": "Qu'est-ce que Flask dans l'écosystème Python ?",
    "o": [
      "Un système de gestion de bases de données relationnelles",
      "Un micro-framework minimaliste pour construire des applications web et des API",
      "Un compilateur pour optimiser le code Python",
      "Un outil d'analyse de données scientifiques"
    ],
    "a": 1,
    "e": "Flask est un framework léger en Python permettant de déclarer facilement des routes HTTP et de servir des réponses."
  },
  {
    "id": 36,
    "ch": 3,
    "q": "Quelle commande permet d'installer Flask dans votre environnement de développement ?",
    "o": [
      "npm install flask",
      "pip install flask",
      "python install flask",
      "git pull flask"
    ],
    "a": 1,
    "e": "En Python, l'installateur standard de paquets est pip. On installe Flask via `pip install flask`."
  },
  {
    "id": 37,
    "ch": 3,
    "q": "Comment déclare-t-on l'instance principale de l'application Flask ?",
    "o": [
      "app = Flask(__name__)",
      "app = new Flask()",
      "app = flask.init()",
      "app = Flask.run()"
    ],
    "a": 0,
    "e": "On initialise l'application en instanciant `Flask` avec `__name__` pour que le framework localise les ressources."
  },
  {
    "id": 38,
    "ch": 3,
    "q": "Quel décorateur Flask associe une fonction à des requêtes GET sur la route '/status' ?",
    "o": [
      "@app.route.get('/status')",
      "@app.get('/status')",
      "@flask.get('/status')",
      "@route('/status', method='GET')"
    ],
    "a": 1,
    "e": "Flask moderne propose `@app.get('/route')` comme raccourci explicite pour associer la méthode GET."
  },
  {
    "id": 39,
    "ch": 3,
    "q": "À quoi sert la fonction 'jsonify' fournie par Flask ?",
    "o": [
      "À valider la syntaxe du code Python",
      "À convertir une structure Python (dictionnaire, liste) en une réponse HTTP contenant du JSON et l'en-tête Content-Type correct",
      "À sauvegarder les données dans un fichier .json sur le serveur",
      "À chiffrer les requêtes reçues"
    ],
    "a": 1,
    "e": "jsonify convertit les données en chaîne JSON et configure automatiquement l'en-tête de réponse sur `application/json`."
  },
  {
    "id": 40,
    "ch": 3,
    "q": "Comment lance-t-on le serveur de développement Flask en mode debug ?",
    "o": [
      "app.start(debug=True)",
      "app.run(debug=True)",
      "Flask.launch(debug=True)",
      "python run app.py"
    ],
    "a": 1,
    "e": "La méthode `app.run(debug=True)` démarre le serveur local et active le rechargement automatique en cas de modification de fichier."
  },
  {
    "id": 41,
    "ch": 3,
    "q": "Comment récupère-t-on les données d'un corps de requête au format JSON dans Flask ?",
    "o": [
      "request.get_json()",
      "request.body.json",
      "request.form['json']",
      "request.read_json()"
    ],
    "a": 0,
    "e": "La méthode `request.get_json()` analyse le corps de la requête HTTP entrante et le convertit en dictionnaire ou liste Python."
  },
  {
    "id": 42,
    "ch": 3,
    "q": "Quelle est la bonne syntaxe d'importation pour accéder à l'objet 'request' dans Flask ?",
    "o": [
      "import flask.request",
      "from flask import request",
      "from flask import RequestObject",
      "import request from flask"
    ],
    "a": 1,
    "e": "On importe `request` directement depuis le module global `flask`."
  },
  {
    "id": 43,
    "ch": 3,
    "q": "Que retourne 'request.get_json()' si le client n'a pas spécifié l'en-tête 'Content-Type: application/json' ?",
    "o": [
      "Un dictionnaire vide",
      "Lève obligatoirement une erreur de syntaxe",
      "None",
      "Une chaîne de caractères brute"
    ],
    "a": 2,
    "e": "Sans l'en-tête application/json, Flask n'interprète pas le corps en JSON et renvoie None par défaut."
  },
  {
    "id": 44,
    "ch": 3,
    "q": "Quel est l'intérêt d'activer 'debug=True' lors du développement d'une API Flask ?",
    "o": [
      "Il désactive la sécurité de l'API",
      "Il recharge automatiquement le serveur lors d'un changement de code et affiche un débogueur interactif en cas d'erreur",
      "Il double les performances du serveur de base",
      "Il simule une base de données locale"
    ],
    "a": 1,
    "e": "Le mode debug offre le rechargement à chaud (hot-reload) et affiche des traces d'erreurs détaillées dans la console ou le navigateur."
  },
  {
    "id": 45,
    "ch": 3,
    "q": "Quel est le port réseau standard par défaut utilisé par 'app.run()' dans Flask ?",
    "o": [
      "8080",
      "3000",
      "5000",
      "80"
    ],
    "a": 2,
    "e": "Par défaut, Flask configure son serveur de développement local pour écouter sur le port 5000."
  },
  {
    "id": 46,
    "ch": 3,
    "q": "Pourquoi est-il crucial de valider le dictionnaire renvoyé par 'request.get_json()' dans une route POST ?",
    "o": [
      "Parce que le client peut avoir envoyé des données corrompues, incomplètes ou malveillantes",
      "Parce que Python plante si on ne valide pas",
      "Pour accélérer le temps de réponse du serveur",
      "Pour compiler l'application en production"
    ],
    "a": 0,
    "e": "Le serveur ne doit jamais faire confiance aux données d'entrée. Il doit vérifier la présence et le type des champs obligatoires."
  },
  {
    "id": 47,
    "ch": 3,
    "q": "Comment déclare-t-on une route Flask dynamique capturant un entier nommé 'id' ?",
    "o": [
      "@app.get('/users/id')",
      "@app.get('/users/<int:id>')",
      "@app.get('/users/:id')",
      "@app.get('/users/{id}')"
    ],
    "a": 1,
    "e": "Dans Flask, les paramètres de chemin dynamiques s'écrivent entre chevrons avec l'indication optionnelle du type : `<type:nom_variable>`."
  },
  {
    "id": 48,
    "ch": 3,
    "q": "Que se passe-t-il si une fonction de route Flask ne renvoie rien (instruction return omise) ?",
    "o": [
      "Flask renvoie une page vide en code 200",
      "Flask lève une exception indiquant que la valeur de retour n'est pas valide",
      "Flask attend indéfiniment la réponse",
      "Le serveur s'arrête automatiquement"
    ],
    "a": 1,
    "e": "Flask exige que chaque fonction de vue renvoie une réponse valide (chaîne, dictionnaire, tuple de réponse ou objet Response) sous peine de lever un TypeError."
  },
  {
    "id": 49,
    "ch": 3,
    "q": "Comment configurer 'app.run()' pour rendre le serveur accessible depuis d'autres appareils du réseau ?",
    "o": [
      "app.run(host='0.0.0.0')",
      "app.run(network='public')",
      "app.run(port='all')",
      "app.run(host='localhost')"
    ],
    "a": 0,
    "e": "L'hôte '0.0.0.0' indique au serveur d'écouter sur toutes les adresses IP disponibles, rendant le serveur accessible sur le réseau local."
  },
  {
    "id": 50,
    "ch": 3,
    "q": "Quel est le principal défaut de stocker des données dans une liste globale en mémoire (`students = []`) ?",
    "o": [
      "Les données sont effacées à chaque redémarrage du serveur Flask",
      "La liste ne peut contenir que des chaînes de caractères",
      "La mémoire RAM sature en moins de 10 requêtes",
      "On ne peut pas lire la liste avec une méthode GET"
    ],
    "a": 0,
    "e": "Le stockage en mémoire est volatile. Pour persister les données, il faut connecter l'API à une base de données (PostgreSQL, SQLite, etc.)."
  },
  {
    "id": 51,
    "ch": 3,
    "q": "Comment renvoyer à la fois un JSON et un code de statut 201 dans Flask ?",
    "o": [
      "return jsonify(data, 201)",
      "return jsonify(data), 201",
      "return jsonify(data).status(201)",
      "return 201, jsonify(data)"
    ],
    "a": 1,
    "e": "Flask permet de retourner un tuple `(response, status_code)`. La syntaxe correcte est `return jsonify(data), 201`."
  },
  {
    "id": 52,
    "ch": 4,
    "q": "Quelle signification générale ont les codes HTTP de la famille 2xx ?",
    "o": [
      "La requête a été reçue mais nécessite des redirections",
      "La requête a été reçue, comprise et acceptée avec succès",
      "La requête comporte une erreur de syntaxe côté client",
      "Le serveur a rencontré une erreur interne lors du traitement"
    ],
    "a": 1,
    "e": "La famille 2xx (ex: 200, 201, 204) représente les réussites d'opérations."
  },
  {
    "id": 53,
    "ch": 4,
    "q": "Quel est l'usage standard du code de statut '200 OK' ?",
    "o": [
      "Indiquer qu'une nouvelle ressource a été créée",
      "Indiquer le succès d'une requête classique de lecture ou de mise à jour",
      "Signaler qu'un utilisateur n'est pas connecté",
      "Ressource introuvable"
    ],
    "a": 1,
    "e": "Le code 200 indique que la requête s'est déroulée avec succès et que le résultat attendu est renvoyé dans le corps de réponse."
  },
  {
    "id": 54,
    "ch": 4,
    "q": "Quel code HTTP doit idéalement renvoyer une route POST suite à la création réussie d'une ressource ?",
    "o": [
      "200 OK",
      "201 Created",
      "204 No Content",
      "400 Bad Request"
    ],
    "a": 1,
    "e": "201 Created est le code standard pour notifier le client qu'une nouvelle ressource a été correctement insérée et possède désormais son propre URI."
  },
  {
    "id": 55,
    "ch": 4,
    "q": "Quelle signification a le code '400 Bad Request' ?",
    "o": [
      "L'utilisateur a saisi un mauvais mot de passe",
      "La requête est mal formée ou les données fournies sont invalides pour le traitement",
      "La ressource demandée n'existe plus",
      "Le serveur Flask est en panne"
    ],
    "a": 1,
    "e": "Le code 400 indique une erreur de la part du client (ex: format JSON invalide, champs obligatoires manquants)."
  },
  {
    "id": 56,
    "ch": 4,
    "q": "Que signifie précisément le code HTTP '401 Unauthorized' ?",
    "o": [
      "Le client n'est pas autorisé car il n'a pas fourni de preuves d'identité (non authentifié)",
      "L'accès est refusé même après s'être correctement connecté",
      "La méthode HTTP utilisée n'est pas acceptée",
      "La requête a expiré"
    ],
    "a": 0,
    "e": "Le code 401 signifie que la requête requiert une authentification utilisateur qui a échoué ou est absente."
  },
  {
    "id": 57,
    "ch": 4,
    "q": "Que signifie le code HTTP '403 Forbidden' ?",
    "o": [
      "Le serveur refuse la requête car l'utilisateur n'est pas connecté",
      "Le serveur comprend l'identité du client mais ce dernier n'a pas les droits nécessaires pour effectuer l'action",
      "Le mot de passe de l'utilisateur a expiré",
      "La ressource n'existe pas"
    ],
    "a": 1,
    "e": "403 indique un problème de permissions (ex: un étudiant authentifié accède à une page d'administration réservée aux profs)."
  },
  {
    "id": 58,
    "ch": 4,
    "q": "Quelle est la nuance principale entre le code 401 et le code 403 ?",
    "o": [
      "401 concerne l'authentification (qui êtes-vous ?), 403 concerne les autorisations (qu'avez-vous le droit de faire ?)",
      "401 est une erreur serveur, 403 est une erreur client",
      "Il n'y a aucune différence, les deux codes sont interchangeables",
      "401 est utilisé en HTTP classique, 403 uniquement pour le protocole HTTPS"
    ],
    "a": 0,
    "e": "Le code 401 indique un manque d'identité valide. Le code 403 intervient lorsque l'identité est validée mais insuffisante pour l'action requise."
  },
  {
    "id": 59,
    "ch": 4,
    "q": "Quel code de retour est approprié si un client demande `/students/999` et que cet ID n'existe pas ?",
    "o": [
      "400 Bad Request",
      "401 Unauthorized",
      "404 Not Found",
      "500 Internal Error"
    ],
    "a": 2,
    "e": "404 Not Found s'impose lorsque le serveur ne trouve aucune correspondance pour la ressource ciblée par l'URI."
  },
  {
    "id": 60,
    "ch": 4,
    "q": "À quelle catégorie de problèmes correspondent les codes HTTP commençant par 5 (5xx) ?",
    "o": [
      "Erreurs de syntaxe commises par le développeur client",
      "Erreurs générées par le serveur qui a échoué à exécuter une requête valide",
      "Tentatives de piratage interceptées",
      "Changements d'URI ou redirections de pages"
    ],
    "a": 1,
    "e": "Les codes 5xx désignent une défaillance interne du serveur lors du traitement d'une requête par ailleurs valide."
  },
  {
    "id": 61,
    "ch": 4,
    "q": "Que signifie le code '500 Internal Server Error' ?",
    "o": [
      "La connexion internet a été coupée",
      "Le serveur a rencontré une condition inattendue qui l'a empêché de répondre à la requête (ex: crash du code Python non géré)",
      "La base de données contient trop d'étudiants",
      "La route demandée n'existe pas"
    ],
    "a": 1,
    "e": "Le code 500 est le code générique pour les plantages ou exceptions non gérées côté serveur (ex: division par zéro dans le script)."
  },
  {
    "id": 62,
    "ch": 4,
    "q": "Quel code HTTP renvoyer si un client tente de créer un étudiant en omettant le champ obligatoire 'firstName' ?",
    "o": [
      "404 Not Found",
      "400 Bad Request",
      "403 Forbidden",
      "401 Unauthorized"
    ],
    "a": 1,
    "e": "L'omission de données requises pour le modèle constitue une mauvaise requête client, qualifiée en `400 Bad Request`."
  },
  {
    "id": 63,
    "ch": 4,
    "q": "Quel code renvoyer après une suppression réussie via DELETE si le serveur ne retourne aucun contenu ?",
    "o": [
      "200 OK",
      "201 Created",
      "204 No Content",
      "202 Accepted"
    ],
    "a": 2,
    "e": "Le code 204 No Content confirme la réussite de l'action tout en spécifiant que le corps de la réponse est intentionnellement vide."
  },
  {
    "id": 64,
    "ch": 4,
    "q": "Pourquoi est-il déconseillé de retourner un code 200 OK avec un JSON contenant `{'status': 'error', 'code': 404}` ?",
    "o": [
      "Parce que le client doit analyser le corps JSON pour détecter l'erreur, au lieu de lire directement le code de statut standard de la réponse HTTP",
      "Parce que JSON n'accepte pas les nombres comme 404",
      "Parce que Flask refuse de démarrer dans cette configuration",
      "Parce que le code 200 est réservé aux fichiers HTML brut"
    ],
    "a": 0,
    "e": "L'architecture REST repose sur l'exploitation des codes de statut HTTP standard. Renvoyer 200 pour une erreur empêche les outils réseau d'interpréter correctement la réponse."
  },
  {
    "id": 65,
    "ch": 4,
    "q": "Quel code de statut HTTP correspond à l'erreur '405 Method Not Allowed' ?",
    "o": [
      "La route demandée n'existe pas sur le serveur",
      "La route existe, mais la méthode HTTP utilisée (ex: POST) n'est pas autorisée sur cet URI",
      "L'accès à la méthode requiert un abonnement payant",
      "L'adresse IP du client est bannie"
    ],
    "a": 1,
    "e": "Le code 405 s'applique si la route est valide mais que le verbe HTTP transmis n'est pas supporté (ex: faire un POST sur une route purement informative en GET)."
  },
  {
    "id": 66,
    "ch": 4,
    "q": "Que signifie le code '204 No Content' ?",
    "o": [
      "La requête a échoué car le serveur n'a pas de données",
      "La requête a réussi mais la réponse ne contient aucun corps (body)",
      "La base de données est vide",
      "Le serveur demande au client d'effacer ses données"
    ],
    "a": 1,
    "e": "Le code 204 valide le succès d'une opération n'exigeant aucun retour d'information dans le corps de réponse."
  },
  {
    "id": 67,
    "ch": 4,
    "q": "Quel code HTTP indique qu'une ressource a été temporairement déplacée vers un autre URI ?",
    "o": [
      "404 Not Found",
      "302 Found (ou Temporary Redirect)",
      "200 OK",
      "503 Service Unavailable"
    ],
    "a": 1,
    "e": "La famille des codes 3xx est réservée aux redirections. Le code 302 redirige temporairement le client vers un autre URI."
  },
  {
    "id": 68,
    "ch": 5,
    "q": "Pourquoi le navigateur web standard n'est-il pas suffisant pour tester une API complète ?",
    "o": [
      "Il n'affiche pas les formats JSON",
      "Il ne peut effectuer facilement que des requêtes de type GET en saisissant l'URL dans la barre d'adresse",
      "Il ralentit les réponses du serveur",
      "Il n'est pas capable d'interpréter les codes 200"
    ],
    "a": 1,
    "e": "Pour tester les requêtes POST, PUT ou DELETE avec des en-têtes complexes, il est nécessaire d'utiliser des outils spécialisés comme Postman ou cURL."
  },
  {
    "id": 69,
    "ch": 5,
    "q": "Qu'est-ce que l'outil 'cURL' dans le développement web ?",
    "o": [
      "Un micro-framework similaire à Flask",
      "Un utilitaire en ligne de commande permettant de formuler et d'envoyer des requêtes réseau avec des URL",
      "Un compilateur JavaScript pour le frontend",
      "Un outil d'administration de machines virtuelles"
    ],
    "a": 1,
    "e": "cURL permet d'effectuer des appels HTTP directement depuis un terminal, ce qui est très pratique pour tester rapidement ou scripter des requêtes."
  },
  {
    "id": 70,
    "ch": 5,
    "q": "Quelle option cURL permet de définir la méthode HTTP à employer (ex: POST ou DELETE) ?",
    "o": [
      "-m",
      "-H",
      "-X (ou --request)",
      "-d"
    ],
    "a": 2,
    "e": "L'option `-X` ou `--request` est utilisée pour spécifier le verbe HTTP (GET, POST, PUT, DELETE, etc.)."
  },
  {
    "id": 71,
    "ch": 5,
    "q": "Comment ajoute-t-on un en-tête (Header) personnalisé dans une commande cURL ?",
    "o": [
      "-h 'HeaderName: Value'",
      "-H 'HeaderName: Value' (ou --header)",
      "-d 'HeaderName: Value'",
      "-x 'HeaderName: Value'"
    ],
    "a": 1,
    "e": "L'option `-H` permet de configurer les en-têtes HTTP de la requête de test."
  },
  {
    "id": 72,
    "ch": 5,
    "q": "Quelle option cURL est utilisée pour envoyer des données dans le corps (Body) d'une requête ?",
    "o": [
      "-b",
      "-H",
      "-d (ou --data)",
      "-X"
    ],
    "a": 2,
    "e": "L'option `-d` ou `--data` permet de passer la chaîne de données ou le JSON (ex: `-d '{\"name\":\"Lisa\"}'`)."
  },
  {
    "id": 73,
    "ch": 5,
    "q": "Qu'est-ce que Postman ?",
    "o": [
      "Un client de messagerie sécurisé pour envoyer des rapports d'erreurs",
      "Une application graphique facilitant la création, le test, le partage et la documentation des requêtes d'API",
      "Un serveur web alternatif à Apache et Nginx",
      "Un plugin d'authentification pour Flask"
    ],
    "a": 1,
    "e": "Postman fournit une interface conviviale pour construire visuellement des appels HTTP complexes et analyser les réponses."
  },
  {
    "id": 74,
    "ch": 5,
    "q": "Dans Postman, à quoi sert le concept d'Environnement ?",
    "o": [
      "À modifier la couleur de l'interface",
      "À stocker des variables réutilisables (ex: base_url) qui changent selon le contexte (ex: local vs production)",
      "À simuler des pannes matérielles de serveurs",
      "À compiler le code source de l'API"
    ],
    "a": 1,
    "e": "Les environnements permettent de basculer facilement les requêtes entre le serveur de développement local et le serveur de production sans modifier les URL manuellement."
  },
  {
    "id": 75,
    "ch": 5,
    "q": "Qu'est-ce que 'Bruno' dans le cadre du test d'API ?",
    "o": [
      "Un langage de programmation concurrent de Python",
      "Un client d'API open-source, léger et axé sur Git pour stocker les collections sous forme de fichiers texte",
      "Un outil de déploiement de serveurs Linux",
      "Une base de données alternative à PostgreSQL"
    ],
    "a": 1,
    "e": "Bruno est une alternative moderne à Postman qui stocke les requêtes dans des fichiers plats, simplifiant le partage via le contrôle de version (Git)."
  },
  {
    "id": 76,
    "ch": 5,
    "q": "Quelle commande cURL permet de formuler une requête GET basique vers '/students' ?",
    "o": [
      "curl GET http://localhost:5000/students",
      "curl http://localhost:5000/students",
      "curl -X SEND http://localhost:5000/students",
      "curl -d http://localhost:5000/students"
    ],
    "a": 1,
    "e": "Par défaut, si aucune option de méthode n'est précisée, cURL effectue une requête GET sur l'URL bouclée."
  },
  {
    "id": 77,
    "ch": 5,
    "q": "À quoi sert la rédaction de tests automatisés dans Postman ou Bruno ?",
    "o": [
      "À générer le code source de l'API automatiquement",
      "À valider automatiquement les réponses (code de statut, structure JSON) après chaque requête pour éviter les régressions",
      "À chiffrer les requêtes en transit",
      "À générer de faux utilisateurs dans la base de données"
    ],
    "a": 1,
    "e": "Les scripts de test permettent d'assurer que l'API renvoie toujours le format et les données attendus lors de modifications du code source."
  },
  {
    "id": 78,
    "ch": 5,
    "q": "Comment spécifie-t-on le format JSON pour l'envoi de données dans une commande cURL ?",
    "o": [
      "En ajoutant l'en-tête `-H \"Content-Type: application/json\"`",
      "En utilisant l'option `--format json`",
      "cURL détecte le JSON et configure l'en-tête automatiquement",
      "cURL ne supporte pas le format JSON"
    ],
    "a": 0,
    "e": "Il faut impérativement préciser au serveur que les données envoyées avec `-d` sont du JSON en configurant le Content-Type approprié via `-H`."
  },
  {
    "id": 79,
    "ch": 5,
    "q": "Pourquoi est-il recommandé de tester le comportement de l'API face à des données invalides ?",
    "o": [
      "Pour vérifier que le serveur est bien capable de refuser les mauvaises requêtes et de renvoyer un code d'erreur client approprié (4xx)",
      "Pour tester si l'application frontend peut corriger les erreurs",
      "Pour ralentir volontairement les requêtes du serveur",
      "Pour tester la vitesse maximale du processeur"
    ],
    "a": 0,
    "e": "Une API robuste doit gérer proprement les erreurs d'entrée et guider le client avec des codes HTTP précis (ex: 400 Bad Request) plutôt que de crasher (500)."
  },
  {
    "id": 80,
    "ch": 5,
    "q": "Quel en-tête HTTP le client utilise-t-il pour spécifier le format de réponse qu'il attend ?",
    "o": [
      "Content-Type",
      "Accept",
      "User-Agent",
      "Referer"
    ],
    "a": 1,
    "e": "L'en-tête Accept indique au serveur les types de médias que le client est prêt à recevoir en retour."
  },
  {
    "id": 81,
    "ch": 5,
    "q": "Que teste-t-on prioritairement lors d'un test de régression ?",
    "o": [
      "Les nouvelles fonctionnalités uniquement",
      "Que les fonctionnalités existantes de l'API n'ont pas été altérées par de récentes modifications du code",
      "La vitesse maximale du serveur de production",
      "La validité du certificat de sécurité SSL"
    ],
    "a": 1,
    "e": "Les tests de régression protègent le comportement historique de l'API contre les effets secondaires de nouvelles fonctionnalités."
  },
  {
    "id": 82,
    "ch": 5,
    "q": "Quel outil en ligne de commande est préinstallé sur la plupart des systèmes d'exploitation modernes pour tester des requêtes HTTP ?",
    "o": [
      "Git",
      "cURL",
      "Postman",
      "Flask"
    ],
    "a": 1,
    "e": "cURL est l'outil natif universel pour formuler des requêtes HTTP directement en ligne de commande."
  },
  {
    "id": 83,
    "ch": 5,
    "q": "Dans Postman, comment s'appelle le groupe organisé de requêtes HTTP ?",
    "o": [
      "Une Liste",
      "Une Collection",
      "Un Dossier",
      "Un Projet"
    ],
    "a": 1,
    "e": "Les requêtes sont regroupées au sein de Collections permettant de structurer et de partager les tests d'une même API."
  },
  {
    "id": 84,
    "ch": 6,
    "q": "Que signifie précisément l'acronyme CRUD ?",
    "o": [
      "Create, Read, Update, Delete",
      "Control, Run, Use, Debug",
      "Connect, Retrieve, Upload, Disconnect",
      "Client, Router, User, Database"
    ],
    "a": 0,
    "e": "CRUD désigne les quatre opérations de base de la persistance des données : Créer, Lire, Mettre à jour et Supprimer."
  },
  {
    "id": 85,
    "ch": 6,
    "q": "Dans une API REST, à quelle opération du CRUD correspond la méthode POST ?",
    "o": [
      "Read",
      "Create",
      "Update",
      "Delete"
    ],
    "a": 1,
    "e": "La méthode POST permet de créer de nouvelles ressources au sein de l'API."
  },
  {
    "id": 86,
    "ch": 6,
    "q": "Dans une API REST, à quelle opération du CRUD correspond la méthode GET ?",
    "o": [
      "Update",
      "Create",
      "Read",
      "Delete"
    ],
    "a": 2,
    "e": "La méthode GET est utilisée pour lire des données (lister une collection ou afficher un élément)."
  },
  {
    "id": 87,
    "ch": 6,
    "q": "Dans une API REST, à quelle opération du CRUD correspond la méthode PUT ?",
    "o": [
      "Create",
      "Read",
      "Update",
      "Delete"
    ],
    "a": 2,
    "e": "La méthode PUT est typiquement utilisée pour modifier (mettre à jour/remplacer) une ressource existante identifiée."
  },
  {
    "id": 88,
    "ch": 6,
    "q": "Dans une API REST, à quelle opération du CRUD correspond la méthode DELETE ?",
    "o": [
      "Delete",
      "Create",
      "Read",
      "Update"
    ],
    "a": 0,
    "e": "La méthode DELETE permet de supprimer la ressource désignée par l'URI."
  },
  {
    "id": 89,
    "ch": 6,
    "q": "Lors du développement d'une maquette d'API, quel est le principal inconvénient d'utiliser une variable globale pour les données ?",
    "o": [
      "Les requêtes GET ne peuvent pas y accéder",
      "Les données sont perdues à chaque fois que le serveur Flask s'arrête ou redémarre",
      "Cela ralentit le serveur de développement",
      "La mémoire sature après trois requêtes"
    ],
    "a": 1,
    "e": "Les données stockées en mémoire vive (RAM) sont volatiles. Une fermeture du processus Python réinitialise la variable."
  },
  {
    "id": 90,
    "ch": 6,
    "q": "Comment lier de façon relationnelle un étudiant à une classe dans les données JSON ?",
    "o": [
      "En copiant tout le code HTML de la classe dans l'objet étudiant",
      "En stockant l'identifiant unique de la classe (ex: class_id) dans l'objet étudiant",
      "En renommant l'identifiant de l'étudiant",
      "On ne peut pas lier de données en JSON"
    ],
    "a": 1,
    "e": "On utilise le concept de clé étrangère : inclure l'identifiant de la ressource liée pour associer les entités."
  },
  {
    "id": 91,
    "ch": 6,
    "q": "Pourquoi la validation des formats de données (ex: s'assurer qu'un email contient un '@') est-elle indispensable côté serveur ?",
    "o": [
      "Pour s'assurer de la cohérence et de l'intégrité de la base de données et éviter des crashs de l'application",
      "Pour accélérer le rendu du navigateur web",
      "Pour réduire la consommation électrique du serveur",
      "Pour compiler le code source en Python"
    ],
    "a": 0,
    "e": "Le serveur doit être le garant de la qualité des données. La validation prévient les erreurs de traitement futures."
  },
  {
    "id": 92,
    "ch": 6,
    "q": "Qu'est-ce que CORS (Cross-Origin Resource Sharing) ?",
    "o": [
      "Un système de sauvegarde des bases de données",
      "Un mécanisme de sécurité limitant les requêtes HTTP d'un site web externe vers votre API s'il n'est pas explicitement autorisé",
      "Un protocole pour compresser les fichiers JSON",
      "Un serveur de cache pour accélérer les connexions"
    ],
    "a": 1,
    "e": "CORS empêche les scripts malveillants d'un domaine d'interroger votre API au nom d'un utilisateur sans son accord."
  },
  {
    "id": 93,
    "ch": 6,
    "q": "Pourquoi est-il déconseillé de laisser traîner des clés API ou des mots de passe en clair dans son code source poussé sur Git ?",
    "o": [
      "Parce que Git refuse de pousser le code s'il contient des mots de passe",
      "Parce que n'importe qui accédant au dépôt Git peut récupérer les clés et pirater vos services",
      "Parce que cela augmente inutilement la taille des fichiers de code",
      "Parce que Python ne comprend pas les secrets"
    ],
    "a": 1,
    "e": "Les dépôts Git sont souvent partagés ou publics. Les secrets doivent être stockés en dehors du code, dans des variables d'environnement."
  },
  {
    "id": 94,
    "ch": 6,
    "q": "À quoi servent les fichiers de logs (journaux d'activité) dans une API en production ?",
    "o": [
      "À générer l'interface utilisateur de l'API",
      "À enregistrer les requêtes reçues, les erreurs et les comportements suspects pour le débogage et la sécurité",
      "À stocker la liste des étudiants à la place de la base de données",
      "À crypter le trafic réseau"
    ],
    "a": 1,
    "e": "Les logs tracent l'activité de l'API pour analyser les incidents techniques et suivre les accès."
  },
  {
    "id": 95,
    "ch": 6,
    "q": "Qu'est-ce qu'un jeton JWT (JSON Web Token) ?",
    "o": [
      "Un format d'image compressé",
      "Un jeton compact et sécurisé pour transmettre des informations d'authentification de façon vérifiable entre client et serveur",
      "Un serveur de base de données en mémoire",
      "Une balise HTML de sécurité"
    ],
    "a": 1,
    "e": "Un JWT contient une signature cryptographique permettant au serveur de vérifier l'identité de l'utilisateur sans stocker de session en mémoire."
  },
  {
    "id": 96,
    "ch": 6,
    "q": "Quelle est la première étape recommandée pour concevoir proprement une API Web ?",
    "o": [
      "Coder directement la base de données",
      "Définir les ressources, les routes associées (méthode et chemin) et le format des données échangées (contrat d'API)",
      "Écrire les fichiers CSS pour la mise en page",
      "Acheter un nom de domaine"
    ],
    "a": 1,
    "e": "La conception des ressources et du contrat d'API (routes, paramètres) permet de clarifier les besoins avant de coder la technique."
  },
  {
    "id": 97,
    "ch": 6,
    "q": "Comment sécuriser une API contre les attaques par force brute sur un endpoint de connexion ?",
    "o": [
      "En désactivant le port 5000",
      "En mettant en place une limitation du taux de requêtes (rate limiting) pour bloquer les IP abusives",
      "En interdisant les requêtes en provenance de téléphones mobiles",
      "En supprimant le mot de passe de l'administrateur"
    ],
    "a": 1,
    "e": "Le rate limiting restreint le nombre d'appels autorisés dans un intervalle de temps, bloquant les tentatives d'attaque automatisées."
  },
  {
    "id": 98,
    "ch": 6,
    "q": "Quel est l'intérêt de renvoyer des messages d'erreur détaillés (mais non confidentiels) en JSON ?",
    "o": [
      "Permettre au frontend de comprendre l'origine de l'erreur et de l'afficher proprement à l'utilisateur",
      "C'est obligatoire pour que le serveur HTTP fonctionne",
      "Pour masquer le problème technique",
      "Pour forcer le rechargement de la page"
    ],
    "a": 0,
    "e": "Un JSON d'erreur structuré (ex: `{\"error\": \"email_invalid\"}`) aide le développeur frontend à réagir correctement et à formuler une interface claire."
  },
  {
    "id": 99,
    "ch": 6,
    "q": "Dans Flask, comment intercepter les données JSON invalides (mauvaise syntaxe) envoyées par un client ?",
    "o": [
      "Flask gère cela automatiquement et renvoie par défaut une erreur 400",
      "Il faut écrire un script en JavaScript côté serveur",
      "Le serveur plante obligatoirement",
      "Il faut redémarrer le serveur à chaque erreur"
    ],
    "a": 0,
    "e": "Flask intercepte l'analyse JSON défectueuse et renvoie une réponse HTTP `400 Bad Request` standard."
  },
  {
    "id": 100,
    "ch": 6,
    "q": "Quelle méthode HTTP est recommandée pour soumettre des filtres complexes ou de gros volumes de paramètres lors d'une recherche sans surcharger l'URL ?",
    "o": [
      "GET",
      "POST",
      "DELETE",
      "OPTIONS"
    ],
    "a": 1,
    "e": "Bien que GET serve à la lecture, POST est toléré et recommandé si les paramètres de recherche sont trop volumineux pour l'URL, car ils peuvent être envoyés proprement dans le corps de la requête."
  }
];
