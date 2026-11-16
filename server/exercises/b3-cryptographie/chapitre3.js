'use strict';

module.exports = [
  {
    "id": "cr3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "La vérification de l'image ISO du logiciel libre",
    "exampleTitle": "Exemple résolu — le pilote d'imprimante du collège",
    "goal": "Vérifier l'intégrité d'un téléchargement par empreinte cryptographique et mobiliser les propriétés des fonctions de hachage.",
    "brief": "<p><strong>Énoncé.</strong> L'administrateur système du lycée télécharge l'image ISO d'une distribution libre (2,4 Go). Le site de l'éditeur publie l'empreinte <strong>SHA-256</strong> officielle du fichier. Après le téléchargement, l'administrateur recalcule l'empreinte du fichier obtenu et la compare à celle publiée.</p><ol><li>Combien de bits compte une empreinte SHA-256 ?</li><li>Un caractère hexadécimal code 4 bits : combien de caractères hexadécimaux affiche une empreinte SHA-256 ?</li><li>L'empreinte recalculée diffère de la publiée sur quelques caractères seulement. Le fichier téléchargé est-il intègre ? Répondez par oui ou non.</li><li>Quelle propriété de la fonction de hachage interdit de retrouver le message original à partir de sa seule empreinte ?</li><li>Pourquoi MD5 ne doit-il plus servir à vérifier l'intégrité d'un téléchargement sensible ?</li></ol>",
    "starter": "# Exercice — La vérification de l'image ISO du logiciel libre\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : les nombres. Question 3 : oui ou non. Questions 4 et 5 : un terme.\n\n[Question 1 — Taille en bits d'une empreinte SHA-256]\nA_COMPLETER\n\n[Question 2 — Nombre de caractères hexadécimaux]\nA_COMPLETER\n\n[Question 3 — Le fichier est-il intègre]\nA_COMPLETER\n\n[Question 4 — Propriété interdisant de retrouver le message depuis l'empreinte]\nA_COMPLETER\n\n[Question 5 — Pourquoi MD5 est abandonné pour l'intégrité]\nA_COMPLETER\n",
    "hints": [
      "La taille d'une empreinte SHA-256 se lit dans son nom : c'est la longueur du condensé en bits.",
      "Un caractère hexadécimal code exactement 4 bits : divisez la taille en bits par 4.",
      "1. 256 bits. 2. 256 / 4. 3. Deux empreintes différentes signifient deux fichiers différents, même pour un seul bit changé. 4. On cherche la propriété « à sens unique ». 5. Des chercheurs ont fabriqué des paires de fichiers différents de même empreinte MD5."
    ],
    "examples": [
      {
        "stdin": "Le collège vérifie le pilote d'imprimante (empreinte SHA-1) qu'il télécharge.\n1) SHA-1 produit un condensé de 160 bits.\n2) 160 / 4 = 40 caractères hexadécimaux.\n3) L'empreinte recalculée diffère : le fichier a été modifié, il n'est pas intègre.\n4) La résistance à la préimage interdit de remonter au message depuis l'empreinte.\n5) MD5 est abandonné car des collisions complètes ont été construites en pratique.",
        "expected": "160 bits — 40 caractères — non — la résistance à la préimage — collisions",
        "note": "L'effet avalanche fait qu'une modification d'un seul bit change environ la moitié des bits de l'empreinte."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Taille en bits d'une empreinte SHA-256",
        "stdin": "q:1",
        "expected": "256||256 bits"
      },
      {
        "label": "Question 2 — Nombre de caractères hexadécimaux",
        "stdin": "q:2",
        "expected": "64||64 caractères"
      },
      {
        "label": "Question 3 — Le fichier est-il intègre",
        "stdin": "q:3",
        "expected": "non||non, il a été modifié||non, le fichier a été modifié"
      },
      {
        "label": "Question 4 — Propriété interdisant de retrouver le message depuis l'empreinte",
        "stdin": "q:4",
        "expected": "la résistance à la préimage||résistance à la préimage||préimage||la préimage"
      },
      {
        "label": "Question 5 — Pourquoi MD5 est abandonné pour l'intégrité",
        "stdin": "q:5",
        "expected": "des collisions||collisions||des collisions ont été trouvées||on peut fabriquer des collisions"
      }
    ],
    "solution": "[Question 1 — Taille en bits d'une empreinte SHA-256]\n256\n\n[Question 2 — Nombre de caractères hexadécimaux]\n64\n\n[Question 3 — Le fichier est-il intègre]\nnon\n\n[Question 4 — Propriété interdisant de retrouver le message depuis l'empreinte]\nla résistance à la préimage\n\n[Question 5 — Pourquoi MD5 est abandonné pour l'intégrité]\ndes collisions",
    "takeaway": "1) SHA-256 produit un condensé de 256 bits.\n2) 256 / 4 = 64 caractères hexadécimaux.\n3) Non : deux empreintes différentes prouvent que le fichier téléchargé diffère de l'original, même si l'écart affiché ne porte que sur quelques caractères.\n4) La résistance à la préimage : il est infaisable de retrouver un message donnant une empreinte donnée.\n5) MD5 est cassé : des collisions complètes (deux fichiers différents, même empreinte) se fabriquent en quelques secondes, ce qui permet la substitution de fichiers.\nContrôle : 64 caractères hexadécimaux × 4 bits = 256 bits, cohérent avec la question 1."
  },
  {
    "id": "cr3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Les webhooks signés de la plateforme de paiement",
    "exampleTitle": "Exemple résolu — les notifications du transporteur",
    "goal": "Distinguer un simple hachage d'un HMAC et justifier l'authenticité apportée par la clé secrète partagée.",
    "brief": "<p><strong>Énoncé.</strong> La plateforme de paiement PayFlux notifie ses marchands par <strong>webhooks</strong> : à chaque événement, elle envoie un message du type « montant=500 devise=EUR » accompagné d'un <strong>tag HMAC-SHA256</strong> calculé avec la clé secrète partagée entre la plateforme et le marchand. Le marchand vérifie le tag avant d'enregistrer la transaction. Un attaquant connaît le format des messages et peut en envoyer à volonté.</p><ol><li>Un simple SHA-256 du message, sans clé, suffirait-il à prouver que le message émane bien de PayFlux ? Répondez par oui ou non.</li><li>Que combine le HMAC en plus du hachage du message pour produire le tag ?</li><li>L'attaquant renvoie « montant=9000 devise=EUR » avec l'ancien tag du message de 500 EUR : la vérification réussira-t-elle ? Répondez par oui ou non.</li><li>Pourquoi l'attaquant ne peut-il pas calculer un tag valide pour son message falsifié ?</li><li>Grâce à la clé secrète, le HMAC apporte l'intégrité et une seconde garantie : laquelle ?</li></ol>",
    "starter": "# Exercice — Les webhooks signés de la plateforme de paiement\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 3 : oui ou non. Questions 2, 4 et 5 : quelques mots.\n\n[Question 1 — Un simple SHA-256 suffit-il à authentifier l'expéditeur]\nA_COMPLETER\n\n[Question 2 — Ce que le HMAC combine en plus du hachage]\nA_COMPLETER\n\n[Question 3 — L'ancien tag valide-t-il le message falsifié]\nA_COMPLETER\n\n[Question 4 — Pourquoi l'attaquant ne peut pas produire un tag valide]\nA_COMPLETER\n\n[Question 5 — Garantie apportée en plus de l'intégrité]\nA_COMPLETER\n",
    "hints": [
      "N'importe qui peut calculer le SHA-256 d'un message : ce calcul ne prouve rien sur l'identité de l'expéditeur.",
      "Le HMAC réutilise la fonction de hachage, mais en y mêlant un élément que seuls les deux correspondants légitimes connaissent.",
      "1. Demandez-vous si un hachage sans clé lie le message à son auteur. 2. Le nom complet est « code d'authentification de message à clé secrète ». 3. Le tag dépend du message entier. 4. L'attaquant voit des messages et des tags, jamais l'élément secret. 5. Intégrité = le message n'a pas été modifié ; que prouve d'autre la clé partagée ?"
    ],
    "examples": [
      {
        "stdin": "Un transporteur envoie des notifications « colis=livre » signées par HMAC-SHA256 avec la clé du compte marchand.\n1) Un simple SHA-256 sans clé ne prouve pas l'origine : n'importe qui peut le calculer : non.\n2) Le HMAC combine le message et une clé secrète partagée.\n3) Le message falsifié « colis=perdu » avec l'ancien tag : vérification refusée.\n4) L'attaquant ne connaît pas la clé secrète : il ne peut pas produire de tag valide.\n5) Le HMAC apporte en plus l'authenticité : le message vient bien du transporteur.",
        "expected": "non — la clé secrète partagée — non — il ne connaît pas la clé — l'authenticité",
        "note": "Hachage = intégrité sans origine ; HMAC = intégrité et authenticité, car la clé secrète ne quitte jamais les deux parties."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Un simple SHA-256 suffit-il à authentifier l'expéditeur",
        "stdin": "q:1",
        "expected": "non"
      },
      {
        "label": "Question 2 — Ce que le HMAC combine en plus du hachage",
        "stdin": "q:2",
        "expected": "une clé secrète||la clé secrète||clé secrète||une clé secrète partagée||la clé secrète partagée"
      },
      {
        "label": "Question 3 — L'ancien tag valide-t-il le message falsifié",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Pourquoi l'attaquant ne peut pas produire un tag valide",
        "stdin": "q:4",
        "expected": "il ne connaît pas la clé||parce qu'il ne connaît pas la clé||il ne connaît pas la clé secrète||sans la clé secrète||il n'a pas la clé"
      },
      {
        "label": "Question 5 — Garantie apportée en plus de l'intégrité",
        "stdin": "q:5",
        "expected": "l'authenticité||authenticité||l'authentification||l'authentification de l'expéditeur||l'authenticité de l'expéditeur"
      }
    ],
    "solution": "[Question 1 — Un simple SHA-256 suffit-il à authentifier l'expéditeur]\nnon\n\n[Question 2 — Ce que le HMAC combine en plus du hachage]\nune clé secrète\n\n[Question 3 — L'ancien tag valide-t-il le message falsifié]\nnon\n\n[Question 4 — Pourquoi l'attaquant ne peut pas produire un tag valide]\nil ne connaît pas la clé\n\n[Question 5 — Garantie apportée en plus de l'intégrité]\nl'authenticité",
    "takeaway": "1) Non : quiconque connaît le format peut calculer le SHA-256 d'un message ; ce calcul ne lie pas le message à PayFlux.\n2) Le HMAC combine le message et la clé secrète partagée dans le calcul de hachage.\n3) Non : le tag dépend du message entier ; falsifié, le message donne un tag différent et l'ancien tag est rejeté.\n4) L'attaquant observe des messages et des tags mais ne connaît pas la clé secrète : il ne peut pas calculer un tag qui passe la vérification.\n5) L'authenticité (authentification de l'origine) : seul le détenteur de la clé a pu produire le tag.\nContrôle : intégrité et authenticité réunies, c'est exactement la définition d'un code d'authentification de message (MAC)."
  },
  {
    "id": "cr3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "L'audit des mots de passe du portail intranet",
    "exampleTitle": "Exemple résolu — la messagerie du groupement de pharmacies",
    "goal": "Expliquer le rôle du sel face aux tables précalculées, calculer un coût d'attaque sur une base salée et estimer une collision par le paradoxe des anniversaires.",
    "brief": "<p><strong>Énoncé.</strong> Le RSSI du groupe industriel Meridor audite le portail intranet. Les <strong>100 comptes</strong> actifs stockent aujourd'hui leurs mots de passe sous la forme <strong>SHA-256 sans sel</strong>. Un attaquant qui vole la base teste une liste de <strong>4 000 mots de passe courants</strong>. Le RSSI étudie la correction : ajouter à chaque compte un <strong>sel unique</strong> et une fonction de dérivation lente. Il relit aussi le paradoxe des anniversaires : sur un espace de n bits, une collision se trouve en environ 2^(n/2) essais.</p><ol><li>Comment s'appelle la table précalculée qui associe des empreintes aux mots de passe courants et déchiffre une base non salée presque instantanément ?</li><li>Avec une base non salée, l'attaquant calcule 4 000 hachages et les compare aux 100 comptes. Avec un sel unique par compte, combien de hachages faut-il pour tester la même liste sur les 100 comptes ?</li><li>Une empreinte de 64 bits : environ combien d'essais suffisent à trouver une collision (paradoxe des anniversaires) ?</li><li>Un sel doit-il être gardé secret comme un mot de passe ? Répondez par oui ou non.</li><li>Quelle fonction de dérivation lente, à facteur de coût réglable, peut remplacer SHA-256 seul pour le stockage (un nom suffit) ?</li></ol>",
    "starter": "# Exercice — L'audit des mots de passe du portail intranet\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : le nom. Question 2 : le nombre. Question 3 : la puissance de 2. Question 4 : oui ou non. Question 5 : un nom.\n\n[Question 1 — Table précalculée d'empreintes]\nA_COMPLETER\n\n[Question 2 — Nombre de hachages contre une base salée]\nA_COMPLETER\n\n[Question 3 — Essais pour une collision sur 64 bits]\nA_COMPLETER\n\n[Question 4 — Un sel doit-il être secret]\nA_COMPLETER\n\n[Question 5 — Fonction de dérivation lente pour le stockage]\nA_COMPLETER\n",
    "hints": [
      "Sans sel, deux comptes au même mot de passe partagent la même empreinte, et l'attaquant peut préparer tout son travail à l'avance.",
      "Le paradoxe des anniversaires divise par deux la taille en bits : n bits donnent environ 2^(n/2) essais.",
      "1. Le nom anglais est « rainbow table ». 2. Chaque sel impose de recalculer toute la liste pour chaque compte. 3. 64 / 2 = 32. 4. Le sel doit être unique, pas caché. 5. bcrypt, scrypt, Argon2 ou PBKDF2."
    ],
    "examples": [
      {
        "stdin": "Un groupement de pharmacies audite sa messagerie : 250 comptes, liste d'attaque de 2 000 mots de passe.\n1) Sans sel, une rainbow table déchiffre les empreintes courantes instantanément.\n2) Base salée : 2 000 × 250 = 500 000 hachages pour la même liste.\n3) Empreinte de 48 bits : collision en environ 2^24 essais.\n4) Le sel n'a pas besoin d'être secret : il peut être stocké en clair.\n5) bcrypt (ou Argon2, PBKDF2) ralentit chaque essai par un facteur de coût.",
        "expected": "rainbow table — 500 000 hachages — 2^24 — non — bcrypt",
        "note": "Le sel rend chaque compte unique ; la dérivation lente rend chaque essai coûteux : les deux se combinent."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Table précalculée d'empreintes",
        "stdin": "q:1",
        "expected": "une rainbow table||rainbow table||la rainbow table||table arc-en-ciel||une table arc-en-ciel"
      },
      {
        "label": "Question 2 — Nombre de hachages contre une base salée",
        "stdin": "q:2",
        "expected": "400000||400 000||400000 hachages"
      },
      {
        "label": "Question 3 — Essais pour une collision sur 64 bits",
        "stdin": "q:3",
        "expected": "2^32||2^32 essais||2 puissance 32||4294967296"
      },
      {
        "label": "Question 4 — Un sel doit-il être secret",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Fonction de dérivation lente pour le stockage",
        "stdin": "q:5",
        "expected": "bcrypt||argon2||pbkdf2||scrypt||bcrypt ou argon2"
      }
    ],
    "solution": "[Question 1 — Table précalculée d'empreintes]\nune rainbow table\n\n[Question 2 — Nombre de hachages contre une base salée]\n400000\n\n[Question 3 — Essais pour une collision sur 64 bits]\n2^32\n\n[Question 4 — Un sel doit-il être secret]\nnon\n\n[Question 5 — Fonction de dérivation lente pour le stockage]\nbcrypt",
    "takeaway": "1) Une rainbow table (table arc-en-ciel) : des milliards d'empreintes précalculées que l'on confronte à la base non salée.\n2) Sans sel : 4 000 hachages pour toute la base. Avec un sel unique par compte : 4 000 × 100 = 400 000 hachages, la liste devant être recalculée pour chaque sel.\n3) 64 bits / 2 = 32 bits : environ 2^32 essais (paradoxe des anniversaires).\n4) Non : le sel doit être unique par compte, mais il peut être stocké en clair à côté de l'empreinte ; sa force vient de son unicité.\n5) bcrypt (ou Argon2, PBKDF2, scrypt) : un facteur de coût rend chaque essai volontairement lent.\nContrôle : 4 000 × 100 = 400 000, soit cent fois le coût non salé ; l'unicité du sel détruit en outre tout l'intérêt des tables précalculées."
  }
];
