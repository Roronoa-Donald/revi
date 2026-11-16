'use strict';

module.exports = [
  {
    "id": "sup3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les journaux d'accès Nginx de la librairie LivrExpress",
    "exampleTitle": "Exemple résolu — les journaux Apache de la bibliothèque LireIci",
    "goal": "Lire une ligne de journal d'accès web : adresse IP, utilisateur, méthode, ressource, code HTTP et taille.",
    "brief": "<p><strong>Énoncé.</strong> La librairie en ligne LivrExpress collecte les journaux d'accès de son serveur Nginx. Format d'une ligne : adresse IP du client, identité locale, utilisateur authentifié, horodatage, requête entre guillemets, code HTTP, taille de la réponse en octets. Trois lignes extraites du 12 mars 2026 :</p><p><code>203.0.113.45 - - [12/Mar/2026:10:15:32 +0100] \"GET /livre/9782070413119 HTTP/1.1\" 200 5123</code></p><p><code>198.51.100.7 - alice [12/Mar/2026:10:16:01 +0100] \"POST /panier HTTP/1.1\" 201 842</code></p><p><code>203.0.113.45 - - [12/Mar/2026:10:16:45 +0100] \"GET /admin HTTP/1.1\" 403 199</code></p><p>Rappel du cours : un tiret signale une valeur absente ; le code 403 signifie que le serveur refuse de servir la ressource.</p><ol><li>Quelle méthode HTTP correspond à l'ajout d'un article au panier ?</li><li>Quel code HTTP traduit le refus de servir la page /admin ?</li><li>Combien d'octets le serveur a-t-il renvoyés pour la fiche produit ?</li><li>Quelle adresse IP a tenté d'accéder à /admin ?</li><li>Quel identifiant d'utilisateur authentifié figure dans la deuxième ligne ?</li></ol>",
    "starter": "# Exercice — Les journaux d'accès Nginx de la librairie LivrExpress\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 4 et 5 : le mot exact. Questions 2 et 3 : la valeur seule.\n\n[Question 1 — Méthode HTTP de l'ajout au panier]\nA_COMPLETER\n\n[Question 2 — Code HTTP du refus de /admin]\nA_COMPLETER\n\n[Question 3 — Taille de la réponse de la fiche produit (en octets)]\nA_COMPLETER\n\n[Question 4 — Adresse IP ayant tenté /admin]\nA_COMPLETER\n\n[Question 5 — Utilisateur authentifié de la deuxième ligne]\nA_COMPLETER\n",
    "hints": [
      "Le format se lit dans l'ordre : IP, identité, utilisateur, horodatage, requête entre guillemets, code, taille en octets.",
      "La méthode GET demande une ressource au serveur ; la méthode POST transmet des données, comme un ajout au panier.",
      "1. Cherchez la requête qui touche /panier. 2. Le refus de servir se lit sur la ligne de /admin. 3. La taille suit le code HTTP. 4. Regardez l'IP en tête de la ligne de /admin. 5. Le troisième champ de la deuxième ligne remplace le tiret."
    ],
    "examples": [
      {
        "stdin": "La bibliothèque LireIci collecte les journaux Apache de son catalogue :\n192.0.2.10 - marc [02/Apr/2026:14:03:11 +0200] \"GET /catalogue HTTP/1.1\" 200 8421\n192.0.2.55 - - [02/Apr/2026:14:04:02 +0200] \"GET /emprunt HTTP/1.1\" 401 97\n\n1) La page /catalogue est servie en GET.\n2) Le code 401 demande une authentification pour /emprunt.\n3) La réponse du catalogue pèse 8 421 octets.\n4) L'IP 192.0.2.55 a reçu le 401.\n5) L'utilisateur authentifié est marc.",
        "expected": "catalogue servi en GET, 8 421 octets — code 401 pour /emprunt — utilisateur marc — IP 192.0.2.55",
        "note": "Le tiret signifie une valeur absente : ni identité ni utilisateur authentifié sur la ligne du 401, tandis que marc apparaît en clair sur la première ligne."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Méthode HTTP de l'ajout au panier",
        "stdin": "q:1",
        "expected": "POST||post||la méthode POST||la methode POST"
      },
      {
        "label": "Question 2 — Code HTTP du refus de /admin",
        "stdin": "q:2",
        "expected": "403||le code 403"
      },
      {
        "label": "Question 3 — Taille de la réponse de la fiche produit (en octets)",
        "stdin": "q:3",
        "expected": "5123||5 123"
      },
      {
        "label": "Question 4 — Adresse IP ayant tenté /admin",
        "stdin": "q:4",
        "expected": "203.0.113.45||l'adresse 203.0.113.45||l'ip 203.0.113.45"
      },
      {
        "label": "Question 5 — Utilisateur authentifié de la deuxième ligne",
        "stdin": "q:5",
        "expected": "alice||l'utilisateur alice"
      }
    ],
    "solution": "[Question 1 — Méthode HTTP de l'ajout au panier]\nPOST\n\n[Question 2 — Code HTTP du refus de /admin]\n403\n\n[Question 3 — Taille de la réponse de la fiche produit (en octets)]\n5123\n\n[Question 4 — Adresse IP ayant tenté /admin]\n203.0.113.45\n\n[Question 5 — Utilisateur authentifié de la deuxième ligne]\nalice",
    "takeaway": "1) L'ajout au panier utilise la méthode POST : la requête transmet les données de l'article au serveur.\n2) La page /admin est servie avec le code 403 : le serveur a compris la demande mais refuse de l'honorer.\n3) La fiche produit a été renvoyée avec 5 123 octets.\n4) C'est l'adresse 203.0.113.45 qui a tenté d'accéder à /admin, sans utilisateur authentifié (tiret).\n5) La deuxième ligne porte l'utilisateur authentifié alice.\nContrôle : la même IP 203.0.113.45 signe la première et la troisième ligne, sans compte utilisateur : trois lignes, deux visiteurs distincts."
  },
  {
    "id": "sup3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le débit de journaux de la vente flash de PrimStyle",
    "exampleTitle": "Exemple résolu — le pic de journaux du portail SportiNet",
    "goal": "Construire un seuil d'alerte sur le débit de journaux (EPS) et distinguer pic légitime et anomalie.",
    "brief": "<p><strong>Énoncé.</strong> La plateforme de mode PrimStyle centralise ses journaux dans une pile ELK. En régime normal, le pipeline traite un bruit de fond de <strong>250 événements par seconde (EPS)</strong>. Règle d'alerte du NOC : pic de journaux si le débit mesuré dépasse le bruit de fond <strong>augmenté de 200 %</strong>. Débits mesurés toutes les dix minutes pendant la vente flash du 20 mars :</p><table><tr><th>Heure</th><th>20:00</th><th>20:10</th><th>20:20</th><th>20:30</th><th>20:40</th><th>20:50</th><th>21:00</th></tr><tr><th>Débit (EPS)</th><td>252</td><td>248</td><td>980</td><td>1010</td><td>965</td><td>260</td><td>255</td></tr></table><p>Contexte : l'équipe marketing a lancé la vente flash à 20 h 20.</p><ol><li>Quel est le bruit de fond du pipeline, en EPS ?</li><li>Quel est le seuil d'alerte du NOC, en EPS ?</li><li>Combien de mesures dépassent le seuil d'alerte ?</li><li>À quelle heure la première mesure hors norme apparaît-elle ?</li><li>Ce pic doit-il être traité comme un incident de sécurité ? Répondez par le qualificatif attendu : légitime ou suspect.</li></ol>",
    "starter": "# Exercice — Le débit de journaux de la vente flash de PrimStyle\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nombre seul. Question 4 : l'heure au format 20:20. Question 5 : légitime ou suspect.\n\n[Question 1 — Bruit de fond (en EPS)]\nA_COMPLETER\n\n[Question 2 — Seuil d'alerte (en EPS)]\nA_COMPLETER\n\n[Question 3 — Nombre de mesures au-dessus du seuil]\nA_COMPLETER\n\n[Question 4 — Heure de la première mesure hors norme]\nA_COMPLETER\n\n[Question 5 — Qualificatif du pic]\nA_COMPLETER\n",
    "hints": [
      "Une augmentation de 200 % du bruit de fond revient à multiplier le débit par trois : 250 × 3.",
      "Comparez chaque mesure au seuil : seules les mesures strictement supérieures au seuil comptent comme pics.",
      "1. Le bruit de fond est donné dans l'énoncé. 2. Seuil = bruit de fond × 3. 3. Comptez les mesures au-dessus. 4. Repérez la première mesure qui saute. 5. Confrontez le pic au contexte : que s'est-il passé à 20 h 20 ?"
    ],
    "examples": [
      {
        "stdin": "Le portail SportiNet tourne sur un bruit de fond de 120 EPS, avec la même règle d'alerte (bruit + 200 %).\nMesures : 15:10 = 125 ; 15:20 = 118 ; 15:30 = 420 ; 15:40 = 390 ; 15:50 = 130.\nLe pic coïncide avec la rediffusion d'un match attendue par les abonnés.\n\n1) Bruit de fond : 120 EPS.\n2) Seuil : 120 × 3 = 360 EPS.\n3) Deux mesures dépassent le seuil (420 et 390).\n4) Première mesure hors norme à 15:30.\n5) Le pic accompagne la rediffusion : il est légitime.",
        "expected": "seuil 360 EPS — deux mesures au-dessus — première à 15:30 — pic légitime lié à la rediffusion",
        "note": "Un seuil relatif au bruit de fond s'adapte à la taille du service : 360 EPS pour un petit portail, 750 EPS pour une grande plateforme."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Bruit de fond (en EPS)",
        "stdin": "q:1",
        "expected": "250||250 eps||250 EPS"
      },
      {
        "label": "Question 2 — Seuil d'alerte (en EPS)",
        "stdin": "q:2",
        "expected": "750||750 eps||750 EPS"
      },
      {
        "label": "Question 3 — Nombre de mesures au-dessus du seuil",
        "stdin": "q:3",
        "expected": "3||trois"
      },
      {
        "label": "Question 4 — Heure de la première mesure hors norme",
        "stdin": "q:4",
        "expected": "20:20||20h20||20 h 20"
      },
      {
        "label": "Question 5 — Qualificatif du pic",
        "stdin": "q:5",
        "expected": "légitime||legitime||bénin||benin||attendu||normal"
      }
    ],
    "solution": "[Question 1 — Bruit de fond (en EPS)]\n250\n\n[Question 2 — Seuil d'alerte (en EPS)]\n750\n\n[Question 3 — Nombre de mesures au-dessus du seuil]\n3\n\n[Question 4 — Heure de la première mesure hors norme]\n20:20\n\n[Question 5 — Qualificatif du pic]\nlégitime",
    "takeaway": "1) Le bruit de fond du pipeline est de 250 EPS.\n2) Une augmentation de 200 % porte le débit à trois fois le bruit de fond : 250 × 3 = 750 EPS.\n3) Trois mesures dépassent le seuil : 980, 1010 et 965 EPS.\n4) La première mesure hors norme apparaît à 20:20, avec 980 EPS.\n5) Le pic démarre exactement au lancement de la vente flash et retombe à 20 h 50 : c'est un pic légitime, le reflet du trafic commercial.\nContrôle : les trois mesures au-dessus de 750 EPS (980, 1010, 965) encadrent le lancement commercial de 20 h 20, et le débit retrouve le bruit de fond dès 20 h 50."
  },
  {
    "id": "sup3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Corréler trois sources : l'intrusion du serveur de paie de ComptaPlus",
    "exampleTitle": "Exemple résolu — la compromission du serveur de fichiers FichiersNet",
    "goal": "Corréler des journaux d'équipements hétérogènes pour reconstituer une chronologie d'attaque.",
    "brief": "<p><strong>Énoncé.</strong> Le SIEM de l'entreprise ComptaPlus fusionne les journaux du serveur SSH, du pare-feu et de l'application de paie. Dans la nuit du 15 mars 2026, le corrélateur aligne les événements suivants :</p><table><tr><th>Heure</th><th>Source</th><th>Événement</th></tr><tr><th>03 h 12</th><td>sshd</td><td>échec d'authentification root depuis 198.51.100.77</td></tr><tr><th>03 h 13</th><td>sshd</td><td>échec d'authentification root depuis 198.51.100.77</td></tr><tr><th>03 h 14</th><td>sshd</td><td>authentification root réussie depuis 198.51.100.77</td></tr><tr><th>03 h 16</th><td>pare-feu</td><td>connexion sortante autorisée vers 203.0.113.200 port 4444</td></tr><tr><th>03 h 22</th><td>application paie</td><td>export du fichier salaries_2026.csv lancé par root</td></tr></table><ol><li>Combien de tentatives d'authentification ont échoué avant le succès ?</li><li>Quelle adresse IP mène l'attaque ?</li><li>Comment nomme-t-on une attaque qui enchaîne des essais d'identifiants jusqu'au succès ?</li><li>La connexion sortante vers le port 4444 évoque quel type de canal installé par l'attaquant ?</li><li>Combien de minutes séparent la compromission (03 h 14) de l'exfiltration (03 h 22) ?</li></ol>",
    "starter": "# Exercice — Corréler trois sources : l'intrusion du serveur de paie de ComptaPlus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 5 : le nombre seul. Question 2 : l'adresse exacte. Questions 3 et 4 : un court libellé.\n\n[Question 1 — Tentatives échouées avant le succès]\nA_COMPLETER\n\n[Question 2 — Adresse IP de l'attaquant]\nA_COMPLETER\n\n[Question 3 — Type d'attaque par essais successifs]\nA_COMPLETER\n\n[Question 4 — Nature du canal sortant sur le port 4444]\nA_COMPLETER\n\n[Question 5 — Minutes entre compromission et exfiltration]\nA_COMPLETER\n",
    "hints": [
      "Reconstituez la chronologie minute par minute : qui fait quoi, depuis où, vers où.",
      "Des échecs répétés suivis d'un succès sur le compte root caractérisent une attaque par force brute.",
      "1. Comptez les échecs sshd avant 03 h 14. 2. L'IP revient sur les trois lignes sshd. 3. Nommez la technique des essais successifs. 4. Un port de sortie inhabituel juste après la compromission signe le canal de contrôle. 5. De 03 h 14 à 03 h 22."
    ],
    "examples": [
      {
        "stdin": "Le serveur de fichiers FichiersNet est compromis dans la nuit du 3 avril.\n22 h 41 : échec d'authentification admin depuis 203.0.113.9 (sshd)\n22 h 42 : échec d'authentification admin depuis 203.0.113.9 (sshd)\n22 h 43 : authentification admin réussie depuis 203.0.113.9 (sshd)\n22 h 47 : connexion sortante vers 192.0.2.50 port 8080 (pare-feu)\n22 h 58 : copie compressée des partages vers l'extérieur (application)\n\n1) Deux échecs avant le succès.\n2) L'attaque vient de 203.0.113.9.\n3) Attaque par force brute.\n4) La connexion sortante vers un port inhabituel installe un canal de contrôle.\n5) De 22 h 43 à 22 h 58 : 15 minutes.",
        "expected": "2 échecs puis succès — IP 203.0.113.9 — force brute — canal de contrôle vers 192.0.2.50:8080 — 15 minutes avant l'exfiltration",
        "note": "La corrélation ne se lit pas source par source : c'est l'enchaînement authentification suspecte, connexion sortante, accès aux données qui forme la signature de l'intrusion."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Tentatives échouées avant le succès",
        "stdin": "q:1",
        "expected": "2||deux"
      },
      {
        "label": "Question 2 — Adresse IP de l'attaquant",
        "stdin": "q:2",
        "expected": "198.51.100.77||l'adresse 198.51.100.77||l'ip 198.51.100.77"
      },
      {
        "label": "Question 3 — Type d'attaque par essais successifs",
        "stdin": "q:3",
        "expected": "force brute||la force brute||brute force||une attaque par force brute||l'attaque par force brute"
      },
      {
        "label": "Question 4 — Nature du canal sortant sur le port 4444",
        "stdin": "q:4",
        "expected": "un reverse shell||reverse shell||un canal de contrôle||canal de contrôle||un canal de commande||c2||command and control"
      },
      {
        "label": "Question 5 — Minutes entre compromission et exfiltration",
        "stdin": "q:5",
        "expected": "8||8 minutes||8 min"
      }
    ],
    "solution": "[Question 1 — Tentatives échouées avant le succès]\n2\n\n[Question 2 — Adresse IP de l'attaquant]\n198.51.100.77\n\n[Question 3 — Type d'attaque par essais successifs]\nforce brute\n\n[Question 4 — Nature du canal sortant sur le port 4444]\nun reverse shell\n\n[Question 5 — Minutes entre compromission et exfiltration]\n8",
    "takeaway": "1) Deux tentatives d'authentification ont échoué (03 h 12 et 03 h 13) avant le succès de 03 h 14.\n2) L'attaque est menée depuis l'adresse 198.51.100.77, présente sur les trois lignes sshd.\n3) Des essais d'identifiants enchaînés jusqu'au succès sur root : c'est une attaque par force brute.\n4) La connexion sortante vers le port 4444 installe un canal de contrôle, typiquement un reverse shell, permettant à l'attaquant de piloter la machine.\n5) De 03 h 14 à 03 h 22 : 8 minutes séparent la compromission de l'exfiltration du fichier de salaires.\nContrôle : la chronologie complète tient en 10 minutes, de 03 h 12 à 03 h 22, et chaque étape (authentification, canal sortant, exfiltration) provient d'une source différente du SIEM."
  }
];
