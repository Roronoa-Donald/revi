'use strict';

module.exports = [
  {
    "id": "hk3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le classement OWASP du site de l'association Vél'Eau",
    "exampleTitle": "Exemple résolu — le bug bounty du club GrimpeMax",
    "goal": "Classer quatre observations de bug bounty dans les catégories de l'OWASP Top 10.",
    "brief": "<p><strong>Énoncé.</strong> L'association Vél'Eau, qui gère un atelier de réparation de vélos en ligne, ouvre son site vel-eau.org à un programme de bug bounty. Le chasseur de primes consigne quatre observations :</p><table><tr><th>Obs.</th><th>Comportement constaté</th></tr><tr><th>A</th><td>En changeant le numéro dans <code>facture.php?id=1042</code>, on affiche la facture d'un autre adhérent</td></tr><tr><th>B</th><td>Le champ de recherche affiche le terme saisi, exécuté comme du JavaScript par le navigateur du visiteur</td></tr><tr><th>C</th><td>Le formulaire de connexion accepte <code>' OR 1=1 --</code> et ouvre une session sans mot de passe</td></tr><tr><th>D</th><td>L'URL <code>?page=../../../../etc/passwd</code> affiche un fichier du serveur</td></tr></table><ol><li>Combien d'observations décrivent des vulnérabilités distinctes ?</li><li>Quelle catégorie OWASP couvre l'observation C ?</li><li>Quelle catégorie couvre l'observation B ?</li><li>Comment se nomme la faille de l'observation A, où l'on accède à la ressource d'un autre utilisateur ?</li><li>Quelle observation illustre une traversée de répertoire ?</li></ol>",
    "starter": "# Exercice — Le classement OWASP du site de l'association Vél'Eau\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : un nombre. Questions 2 à 4 : le nom d'une catégorie. Question 5 : une lettre.\n\n[Question 1 — Vulnérabilités distinctes relevées]\nA_COMPLETER\n\n[Question 2 — Catégorie OWASP de l'observation C]\nA_COMPLETER\n\n[Question 3 — Catégorie OWASP de l'observation B]\nA_COMPLETER\n\n[Question 4 — Nom de la faille de l'observation A]\nA_COMPLETER\n\n[Question 5 — Observation illustrant la traversée de répertoire]\nA_COMPLETER\n",
    "hints": [
      "Chaque ligne du tableau décrit un mécanisme différent : accès à la facture d'autrui, code exécuté par le navigateur, requête SQL manipulée, fichier système lu.",
      "Le guillemet suivi de OR 1=1 manipule une requête de base de données ; un champ qui exécute le texte saisi comme du JavaScript relève du cross-site scripting.",
      "Accéder à l'objet d'un autre utilisateur en changeant un identifiant dans l'URL porte un sigle de quatre lettres ; la lecture de /etc/passwd par des « ../ » est une traversée de répertoire."
    ],
    "examples": [
      {
        "stdin": "Le club d'escalade GrimpeMax ouvre son site au bug bounty. Observations :\nA : le paramètre membre.php?id=308 affiche le profil d'un autre membre ;\nB : la recherche accepte une requête SQL et renvoie toute la table des adhérents ;\nC : le livre d'or exécute le message laissé comme du JavaScript ;\nD : le paramètre download?fiche=../../secret.txt livre un fichier du serveur.\n\n1) 4 vulnérabilités distinctes. 2) L'observation B est une injection SQL. 3) L'observation C est un XSS.\n4) L'observation A est un IDOR. 5) L'observation D est une traversée de répertoire.",
        "expected": "4 vulnérabilités — B : injection SQL — C : XSS — A : IDOR — D : traversée de répertoire",
        "note": "Le sigle IDOR (Insecure Direct Object Reference) désigne la déclinaison la plus courante des défaillances de contrôle d'accès."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Vulnérabilités distinctes",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Catégorie de l'observation C",
        "stdin": "q:2",
        "expected": "injection sql||l'injection sql||injection||sql injection"
      },
      {
        "label": "Question 3 — Catégorie de l'observation B",
        "stdin": "q:3",
        "expected": "xss||cross-site scripting||le xss"
      },
      {
        "label": "Question 4 — Faille de l'observation A",
        "stdin": "q:4",
        "expected": "idor||l'idor||contrôle d'accès défaillant||broken access control||défaillance de contrôle d'accès"
      },
      {
        "label": "Question 5 — Observation de la traversée de répertoire",
        "stdin": "q:5",
        "expected": "d||la d||l'observation d"
      }
    ],
    "solution": "[Question 1 — Vulnérabilités distinctes relevées]\n4\n\n[Question 2 — Catégorie OWASP de l'observation C]\ninjection sql\n\n[Question 3 — Catégorie OWASP de l'observation B]\nxss\n\n[Question 4 — Nom de la faille de l'observation A]\nidor\n\n[Question 5 — Observation illustrant la traversée de répertoire]\nd",
    "takeaway": "1) Les quatre observations décrivent quatre vulnérabilités distinctes.\n2) L'observation C est une injection SQL : la chaîne ' OR 1=1 -- ferme la requête légitime et rend la condition toujours vraie.\n3) L'observation B est un XSS (cross-site scripting) : le terme saisi est exécuté comme du JavaScript par le navigateur du visiteur.\n4) L'observation A est un IDOR : changer l'identifiant dans l'URL donne accès à la facture d'un autre adhérent, faute de contrôle d'accès côté serveur.\n5) L'observation D illustre la traversée de répertoire : la séquence ../../../../ remonte l'arborescence jusqu'à /etc/passwd.\nContrôle : injection SQL, XSS, IDOR et traversée de répertoire forment quatre familles distinctes de l'OWASP Top 10, aucune observation ne chevauche une autre."
  },
  {
    "id": "hk3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le journal d'attaques du portail santé Mylifeline",
    "exampleTitle": "Exemple résolu — le journal du portail Biblioweb",
    "goal": "Lire un journal de requêtes d'injection SQL, compter les tentatives et confirmer la faille par le temps de réponse.",
    "brief": "<p><strong>Énoncé.</strong> Lors d'un test d'intrusion autorisé du portail santé Mylifeline, l'auditeur envoie une série de requêtes sur le champ de recherche. Le journal du serveur en garde la trace :</p><table><tr><th>Heure</th><th>Requête</th><th>Code HTTP</th><th>Durée</th></tr><tr><th>10:02</th><td><code>/recherche?q=sac+de+voyage</code></td><td>200</td><td>0,1 s</td></tr><tr><th>10:05</th><td><code>/recherche?q=' OR 1=1--</code></td><td>200</td><td>0,1 s</td></tr><tr><th>10:07</th><td><code>/recherche?q=gourde</code></td><td>200</td><td>0,1 s</td></tr><tr><th>10:09</th><td><code>/recherche?q=' UNION SELECT login, mot_de_passe FROM utilisateurs--</code></td><td>200</td><td>0,2 s</td></tr><tr><th>10:11</th><td><code>/recherche?q=&lt;script&gt;alert(1)&lt;/script&gt;</code></td><td>200</td><td>0,1 s</td></tr><tr><th>10:13</th><td><code>/recherche?q=' AND SLEEP(5)--</code></td><td>200</td><td>5,2 s</td></tr></table><ol><li>Combien de requêtes figurent dans cet extrait ?</li><li>Combien de tentatives d'injection SQL distinctes contient-il ?</li><li>Quel type d'injection repose sur le temps de réponse du serveur pour déduire des informations ?</li><li>La requête de 10:13 a duré 5,2 s : quel diagnostic l'auditeur peut-il poser sur la faille ?</li><li>Quel autre type d'attaque apparaît à 10:11 ?</li><li>Quel mot-clé SQL de la requête de 10:09 permet de concaténer les résultats d'une autre table ?</li></ol>",
    "starter": "# Exercice — Le journal d'attaques du portail santé Mylifeline\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : un nombre. Questions 3 à 6 : quelques mots.\n\n[Question 1 — Requêtes de l'extrait]\nA_COMPLETER\n\n[Question 2 — Tentatives d'injection SQL]\nA_COMPLETER\n\n[Question 3 — Type d'injection fondé sur le temps de réponse]\nA_COMPLETER\n\n[Question 4 — Diagnostic posé grâce à la durée de 5,2 s]\nA_COMPLETER\n\n[Question 5 — Autre type d'attaque à 10:11]\nA_COMPLETER\n\n[Question 6 — Mot-clé SQL concaténant une autre table]\nA_COMPLETER\n",
    "hints": [
      "Les injections SQL portent une apostrophe suivie d'un mot-clé SQL (OR, UNION, AND) : parcourez la colonne Requête ligne par ligne.",
      "Quand le serveur répond « normalement » mais que SLEEP(5) allonge la réponse de 5 secondes, la base a bien exécuté la commande injectée.",
      "Le mot-clé UNION SELECT ajoute les lignes d'une autre table aux résultats ; la balise script dans la requête de 10:11 relève, elle, du cross-site scripting."
    ],
    "examples": [
      {
        "stdin": "Test autorisé du portail Biblioweb ; journal du champ de recherche :\n14:02 q=roman policier (200, 0,2 s) ; 14:05 q=' OR '1'='1 (200, 0,2 s) ;\n14:08 q=bd (200, 0,2 s) ; 14:10 q=' UNION SELECT titre, isbn FROM livres-- (200, 0,3 s) ;\n14:12 q=<img src=x onerror=alert(1)> (200, 0,2 s) ; 14:15 q=' AND SLEEP(8)-- (200, 8,3 s).\n\n1) 6 requêtes. 2) 3 injections SQL. 3) La dernière est une injection aveugle basée sur le temps.\n4) La durée de 8,3 s confirme la faille. 5) L'attaque de 14:12 est un XSS. 6) Le mot-clé est UNION SELECT.",
        "expected": "6 requêtes — 3 injections SQL — aveugle basée sur le temps — faille confirmée — XSS — UNION SELECT",
        "note": "Un écart entre la durée demandée (SLEEP 8) et la durée observée (8,3 s) tient au traitement : l'essentiel est l'ordre de grandeur, pas la décimale."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Requêtes de l'extrait",
        "stdin": "q:1",
        "expected": "6||six"
      },
      {
        "label": "Question 2 — Tentatives d'injection SQL",
        "stdin": "q:2",
        "expected": "3||trois"
      },
      {
        "label": "Question 3 — Injection fondée sur le temps",
        "stdin": "q:3",
        "expected": "l'injection aveugle basée sur le temps||injection aveugle basée sur le temps||aveugle basée sur le temps||time-based blind||blind time-based||injection temporelle||l'injection temporelle"
      },
      {
        "label": "Question 4 — Diagnostic après 5,2 s",
        "stdin": "q:4",
        "expected": "confirmée||la faille est confirmée||que la faille est confirmée||la vulnérabilité est confirmée||confirmee||la faille est exploitée"
      },
      {
        "label": "Question 5 — Attaque à 10:11",
        "stdin": "q:5",
        "expected": "xss||cross-site scripting||le xss"
      },
      {
        "label": "Question 6 — Mot-clé SQL de concaténation",
        "stdin": "q:6",
        "expected": "union||union select||l'union select"
      }
    ],
    "solution": "[Question 1 — Requêtes de l'extrait]\n6\n\n[Question 2 — Tentatives d'injection SQL]\n3\n\n[Question 3 — Type d'injection fondé sur le temps de réponse]\nl'injection aveugle basée sur le temps\n\n[Question 4 — Diagnostic posé grâce à la durée de 5,2 s]\nconfirmée\n\n[Question 5 — Autre type d'attaque à 10:11]\nxss\n\n[Question 6 — Mot-clé SQL concaténant une autre table]\nunion",
    "takeaway": "1) L'extrait compte 6 requêtes, de 10:02 à 10:13.\n2) Trois tentatives d'injection SQL distinctes : à 10:05 (OR 1=1), 10:09 (UNION SELECT) et 10:13 (SLEEP).\n3) C'est l'injection aveugle basée sur le temps : le serveur ne renvoie pas les données, mais leur durée de réponse trahit le résultat.\n4) La requête SLEEP(5) a duré 5,2 s : la base a exécuté la commande, la faille est confirmée.\n5) La requête de 10:11, avec sa balise script, est une tentative de XSS.\n6) Le mot-clé UNION (UNION SELECT) concatène les lignes d'une autre table aux résultats de la requête légitime.\nContrôle : 6 requêtes − 3 injections SQL − 1 XSS = 2 requêtes de recherche légitimes (10:02 et 10:07), le compte du journal est cohérent."
  },
  {
    "id": "hk3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "De la lecture de fichiers au web shell : la chaîne d'exploitation d'Alpaga",
    "exampleTitle": "Exemple résolu — la chaîne d'exploitation de la recette Zéphyr",
    "goal": "Dérouler une chaîne d'exploitation complète : path traversal, log poisoning, exécution de code et remédiation.",
    "brief": "<p><strong>Énoncé.</strong> Alpaga, plateforme de vente de laine en ligne, commande un test d'intrusion à haute valeur. Partant d'une simple faille de lecture de fichiers, l'auditeur construit la chaîne d'exploitation suivante, chaque étape étant validée avec l'équipe sécurité d'Alpaga :</p><table><tr><th>Étape</th><th>Action</th><th>Résultat</th></tr><tr><th>1</th><td><code>index.php?page=../../../etc/passwd</code></td><td>Le fichier /etc/passwd s'affiche</td></tr><tr><th>2</th><td><code>index.php?page=../../../var/log/apache2/access.log</code></td><td>Les journaux du serveur sont lus</td></tr><tr><th>3</th><td>Requête dont l'en-tête User-Agent contient du code PHP</td><td>Le code est consigné dans le journal</td></tr><tr><th>4</th><td>Nouvelle inclusion du journal</td><td>Le code PHP du journal s'exécute</td></tr><tr><th>5</th><td>Dépôt d'un petit web shell dans l'arborescence web</td><td>Exécution de commandes persistante</td></tr></table><ol><li>Comment se nomme la vulnérabilité initiale qui permet d'afficher /etc/passwd ?</li><li>Quelle fonction PHP, alimentée par le paramètre page sans validation, est typiquement en cause ?</li><li>Quelle technique, qui fait exécuter le code injecté dans les journaux, transforme la lecture en exécution ?</li><li>Quel en-tête HTTP a servi de vecteur d'injection à l'étape 3 ?</li><li>Combien d'étapes séparent la découverte de la faille (étape 1) de la première exécution de code (étape 4) ?</li><li>Quelle remédiation consiste à ne charger que des pages figurant dans une liste de valeurs autorisées ?</li></ol>",
    "starter": "# Exercice — De la lecture de fichiers au web shell : la chaîne d'exploitation d'Alpaga\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 5 : un nombre. Autres questions : un terme technique ou un nom de fonction.\n\n[Question 1 — Nom de la vulnérabilité initiale]\nA_COMPLETER\n\n[Question 2 — Fonction PHP typiquement en cause]\nA_COMPLETER\n\n[Question 3 — Technique transformant la lecture en exécution]\nA_COMPLETER\n\n[Question 4 — En-tête HTTP vecteur de l'injection]\nA_COMPLETER\n\n[Question 5 — Étapes entre la faille et la première exécution]\nA_COMPLETER\n\n[Question 6 — Remédiation par liste de valeurs autorisées]\nA_COMPLETER\n",
    "hints": [
      "La faille initiale porte un nom anglais évoquant la traversée de l'arborescence ; en français on parle de traversée de répertoire, parfois d'inclusion de fichier local.",
      "Le paramètre page est passé à une fonction PHP qui charge un fichier ; les deux candidats de la même famille s'appellent include et require.",
      "Faire exécuter le code déposé dans un journal s'appelle l'empoisonnement des journaux (log poisoning) ; la remédiation par valeurs autorisées s'appelle une liste blanche."
    ],
    "examples": [
      {
        "stdin": "Sur la plateforme de recette de Zéphyr, même scénario :\n1) le paramètre template lit /etc/passwd ; 2) lecture de /var/log/nginx/error.log ;\n3) code PHP injecté via l'en-tête Referer ; 4) le journal inclus exécute le code ;\n5) un web shell est déposé.\n\n1) Faille initiale : path traversal. 2) Fonction en cause : include. 3) Technique : log poisoning.\n4) Vecteur : l'en-tête Referer. 5) 3 étapes avant la première exécution. 6) Remédiation : liste blanche.",
        "expected": "path traversal — include — log poisoning — Referer — 3 étapes — liste blanche",
        "note": "Le vecteur change (Referer au lieu de User-Agent) mais la chaîne est identique : lecture, dépôt, exécution."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Vulnérabilité initiale",
        "stdin": "q:1",
        "expected": "path traversal||la traversée de répertoire||traversée de répertoire||lfi||l'inclusion de fichier local||inclusion de fichier local||local file inclusion"
      },
      {
        "label": "Question 2 — Fonction PHP en cause",
        "stdin": "q:2",
        "expected": "include||include()||require||require()"
      },
      {
        "label": "Question 3 — Technique d'exécution via les journaux",
        "stdin": "q:3",
        "expected": "log poisoning||le log poisoning||empoisonnement des journaux||l'empoisonnement des journaux"
      },
      {
        "label": "Question 4 — En-tête HTTP vecteur",
        "stdin": "q:4",
        "expected": "user-agent||le user-agent||user agent||l'en-tête user-agent"
      },
      {
        "label": "Question 5 — Étapes avant l'exécution",
        "stdin": "q:5",
        "expected": "3||trois"
      },
      {
        "label": "Question 6 — Remédiation par valeurs autorisées",
        "stdin": "q:6",
        "expected": "liste blanche||la liste blanche||whitelist||allowlist||liste d'autorisation"
      }
    ],
    "solution": "[Question 1 — Nom de la vulnérabilité initiale]\npath traversal\n\n[Question 2 — Fonction PHP typiquement en cause]\ninclude\n\n[Question 3 — Technique transformant la lecture en exécution]\nlog poisoning\n\n[Question 4 — En-tête HTTP vecteur de l'injection]\nuser-agent\n\n[Question 5 — Étapes entre la faille et la première exécution]\n3\n\n[Question 6 — Remédiation par liste de valeurs autorisées]\nliste blanche",
    "takeaway": "1) La vulnérabilité initiale est le path traversal (traversée de répertoire), qui permet de remonter l'arborescence jusqu'à /etc/passwd.\n2) La fonction PHP en cause est include (ou require), appelée avec le paramètre page sans validation.\n3) La technique s'appelle le log poisoning : du code PHP injecté dans un journal est ensuite exécuté par l'inclusion de ce journal.\n4) L'en-tête User-Agent a servi de vecteur : sa valeur est consignée dans le journal d'accès.\n5) Il faut 3 étapes pour passer de la faille (étape 1) à la première exécution de code (étape 4).\n6) La remédiation est la liste blanche : ne charger que des pages présentes dans un répertoire ou un tableau de valeurs autorisées.\nContrôle : lecture (2), dépôt (3), exécution (4) : trois étapes suffisent à transformer une simple divulgation en exécution de code, d'où la gravité CVSS élevée de ce type de faille."
  }
];
