'use strict';

module.exports = [
  {
    "id": "cr3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La liaison radio du drone de surveillance",
    "exampleTitle": "Exemple résolu — la balise météo du club alpin",
    "goal": "Chiffrer et déchiffrer des octets par XOR avec une clé d'un octet, et expliquer les propriétés et les limites de ce chiffrement.",
    "brief": "<p><strong>Énoncé.</strong> Le club de robotique chiffre les commandes de son drone de surveillance par <strong>OU exclusif (XOR)</strong> bit à bit avec la clé d'un octet <code>0x2A</code> (0010 1010 en binaire). Chaque caractère ASCII de la commande est converti en octet, puis XORé avec la clé. Rappels : la lettre « A » vaut <code>0x41</code> (0100 0001) et le XOR de deux bits vaut 1 exactement lorsque les deux bits diffèrent.</p><ol><li>Chiffrez la commande « A » (0x41) avec la clé 0x2A. Donnez l'octet chiffré en hexadécimal.</li><li>Chiffrez la commande « GO » (octets 0x47 et 0x4F). Donnez les deux octets chiffrés en hexadécimal, séparés par un espace.</li><li>Le drone reçoit l'octet 0x19. Quel octet clair obtient-on en appliquant la même clé 0x2A ? Donnez la valeur hexadécimale.</li><li>Quelle propriété du XOR autorise le chiffrement et le déchiffrement avec la même opération et la même clé ?</li><li>Quel risque majeur présente ce dispositif si la même clé d'un octet sert à chiffrer des messages longs ?</li></ol>",
    "starter": "# Exercice — La liaison radio du drone de surveillance\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : la valeur hexadécimale (avec ou sans préfixe 0x). Questions 4 et 5 : quelques mots.\n\n[Question 1 — Octet chiffré de la commande A]\nA_COMPLETER\n\n[Question 2 — Octets chiffrés de la commande GO]\nA_COMPLETER\n\n[Question 3 — Octet clair correspondant à 0x19]\nA_COMPLETER\n\n[Question 4 — Propriété du XOR qui permet de déchiffrer avec la même clé]\nA_COMPLETER\n\n[Question 5 — Risque d'une clé d'un octet sur de longs messages]\nA_COMPLETER\n",
    "hints": [
      "Posez les octets en binaire et appliquez le XOR bit à bit : 1 si les deux bits diffèrent, 0 sinon.",
      "Chiffrer puis déchiffrer revient au même calcul : (m XOR k) XOR k = m, car chaque bit subit deux fois la même transformation.",
      "1. 0100 0001 XOR 0010 1010. 2. Traitez 0x47 puis 0x4F de la même façon. 3. 0001 1001 XOR 0010 1010. 4. Que retrouve-t-on quand on XOR deux fois par la même valeur ? 5. Avec une clé d'un octet, chaque octet du message subit le même masque."
    ],
    "examples": [
      {
        "stdin": "La balise météo du club alpin chiffre ses relevés par XOR avec la clé 0x1F (0001 1111).\n1) Lettre « H » (0x48) : 0100 1000 XOR 0001 1111 = 0101 0111 : 0x57.\n2) Message « OK » (0x4F, 0x4B) : 0101 0000 et 0101 0100 : 0x50 0x54.\n3) Octet reçu 0x4D : 0100 1101 XOR 0001 1111 = 0101 0010 : 0x52, la lettre R.\n4) Le XOR est involutif : (m XOR k) XOR k = m.\n5) Une clé plus courte que le message se répète : risque de réutilisation (attaque à texte clair connu).",
        "expected": "0x57 — 0x50 0x54 — 0x52 (R) — involutif — clé répétée",
        "note": "Le XOR bit à bit se vérifie en binaire : chaque bit du résultat dépend uniquement des deux bits de même rang."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Octet chiffré de la commande A",
        "stdin": "q:1",
        "expected": "6B||0x6B||6b||0x6b"
      },
      {
        "label": "Question 2 — Octets chiffrés de la commande GO",
        "stdin": "q:2",
        "expected": "6D 65||0x6D 0x65||6d 65"
      },
      {
        "label": "Question 3 — Octet clair correspondant à 0x19",
        "stdin": "q:3",
        "expected": "33||0x33"
      },
      {
        "label": "Question 4 — Propriété du XOR qui permet de déchiffrer avec la même clé",
        "stdin": "q:4",
        "expected": "involutif||le xor est involutif||involution||la propriété d'involution"
      },
      {
        "label": "Question 5 — Risque d'une clé d'un octet sur de longs messages",
        "stdin": "q:5",
        "expected": "la clé se répète||réutilisation de la clé||la réutilisation de la clé||clé répétée||two-time pad"
      }
    ],
    "solution": "[Question 1 — Octet chiffré de la commande A]\n6B\n\n[Question 2 — Octets chiffrés de la commande GO]\n6D 65\n\n[Question 3 — Octet clair correspondant à 0x19]\n33\n\n[Question 4 — Propriété du XOR qui permet de déchiffrer avec la même clé]\ninvolutif\n\n[Question 5 — Risque d'une clé d'un octet sur de longs messages]\nla clé se répète",
    "takeaway": "1) 0x41 = 0100 0001 ; 0x2A = 0010 1010 ; XOR = 0110 1011 = 0x6B.\n2) 0x47 = 0100 0111 ; XOR 0x2A = 0110 1101 = 0x6D. 0x4F = 0100 1111 ; XOR 0x2A = 0110 0101 = 0x65. Chiffré : 6D 65.\n3) 0x19 = 0001 1001 ; XOR 0x2A = 0011 0011 = 0x33.\n4) Le XOR est involutif : (m XOR k) XOR k = m, donc la même opération et la même clé chiffrent et déchiffrent.\n5) Avec une clé d'un octet, chaque octet du message subit le même masque : la clé se répète en permanence, et un attaquant qui connaît un seul octet clair retrouve la clé et déchiffre tout (il n'existe d'ailleurs que 256 clés possibles).\nContrôle : 0x6B XOR 0x2A = 0x41 (la lettre A) et 0x33 XOR 0x2A = 0x19 : les déchiffrements retombent exactement sur les valeurs de départ."
  },
  {
    "id": "cr3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le choix d'AES ou de RSA à la banque NordFinance",
    "exampleTitle": "Exemple résolu — le stockage chiffré de la chaîne télé",
    "goal": "Choisir entre un algorithme symétrique et un algorithme asymétrique selon l'usage, et calculer le nombre de blocs et le bourrage d'un chiffrement par bloc.",
    "brief": "<p><strong>Énoncé.</strong> La banque NordFinance doit déployer deux mécanismes : le <strong>chiffrement de ses archives quotidiennes</strong> (fichiers volumineux) et la <strong>distribution des clés de session</strong> aux clients de sa plateforme en ligne. Le service sécurité compare les deux candidats :</p><table><tr><th>Critère</th><th>AES-256 (symétrique)</th><th>RSA-2048 (asymétrique)</th></tr><tr><th>Type de clé</th><td>une clé partagée secrète</td><td>paire clé publique / clé privée</td></tr><tr><th>Taille de clé usuelle</th><td>256 bits</td><td>2048 bits</td></tr><tr><th>Grain de traitement</th><td>blocs de 16 octets</td><td>blocs de moins de 256 octets</td></tr><tr><th>Vitesse</th><td>très rapide, accéléré par le matériel</td><td>environ mille fois plus lent</td></tr><tr><th>Usage principal</th><td>confidentialité de gros volumes</td><td>échange de clés, signature</td></tr></table><p>Le fichier d'archives du jour pèse exactement <strong>64 Ko, soit 65 536 octets</strong>, multiple exact de la taille de bloc d'AES.</p><ol><li>Quel algorithme la banque doit-elle retenir pour chiffrer ses archives quotidiennes ?</li><li>Quel algorithme doit-elle retenir pour distribuer la clé de session à chaque client ?</li><li>Combien de blocs de 16 octets l'algorithme retenu devra-t-il traiter pour ce fichier de 65 536 octets ?</li><li>Pourquoi l'autre algorithme est-il écarté pour le chiffrement des archives ? Répondez en quelques mots.</li><li>Le fichier étant un multiple exact de 16 octets, combien d'octets de bourrage PKCS#7 le chiffrement par blocs ajouterait-il ?</li></ol>",
    "starter": "# Exercice — Le choix d'AES ou de RSA à la banque NordFinance\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : le nom de l'algorithme. Question 3 : le nombre. Questions 4 et 5 : quelques mots ou le nombre.\n\n[Question 1 — Algorithme pour chiffrer les archives]\nA_COMPLETER\n\n[Question 2 — Algorithme pour distribuer les clés de session]\nA_COMPLETER\n\n[Question 3 — Nombre de blocs de 16 octets pour 65 536 octets]\nA_COMPLETER\n\n[Question 4 — Raison d'écarter l'autre algorithme pour les archives]\nA_COMPLETER\n\n[Question 5 — Octets de bourrage PKCS#7 pour un multiple exact de 16]\nA_COMPLETER\n",
    "hints": [
      "Le chiffrement symétrique est rapide mais suppose que les deux parties partagent déjà la même clé ; l'asymétrique résout la distribution de clé, pas la vitesse.",
      "Nombre de blocs = taille du fichier divisée par la taille d'un bloc.",
      "1. Gros volumes : vitesse et accélération matérielle. 2. Distribution : aucun canal préalable partagé. 3. 65 536 / 16. 4. Comparez les vitesses du tableau. 5. PKCS#7 ajoute un bloc complet de bourrage quand le message est déjà aligné."
    ],
    "examples": [
      {
        "stdin": "Une chaîne télé chiffre ses rushes du jour : fichier de 32 Ko (32 768 octets), multiple exact de 16.\n1) Pour les rushes : AES (symétrique, rapide).\n2) Pour envoyer la clé de session à ses correspondants : RSA.\n3) Nombre de blocs : 32 768 / 16 = 2 048.\n4) RSA est écarté pour les volumes : environ mille fois plus lent.\n5) Fichier aligné : PKCS#7 ajoute un bloc complet, soit 16 octets.",
        "expected": "AES — RSA — 2 048 blocs — trop lent — 16 octets de bourrage",
        "note": "Symétrique pour les volumes, asymétrique pour la distribution : c'est le partage du travail des protocoles réels comme TLS."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Algorithme pour chiffrer les archives",
        "stdin": "q:1",
        "expected": "AES-256||AES 256||AES||aes-256||aes 256||le symétrique AES"
      },
      {
        "label": "Question 2 — Algorithme pour distribuer les clés de session",
        "stdin": "q:2",
        "expected": "RSA-2048||RSA 2048||RSA||rsa-2048||rsa 2048||l'asymétrique RSA"
      },
      {
        "label": "Question 3 — Nombre de blocs de 16 octets pour 65 536 octets",
        "stdin": "q:3",
        "expected": "4096||4 096||4096 blocs"
      },
      {
        "label": "Question 4 — Raison d'écarter l'autre algorithme pour les archives",
        "stdin": "q:4",
        "expected": "trop lent||il est trop lent||environ mille fois plus lent||mille fois plus lent||lent||sa lenteur"
      },
      {
        "label": "Question 5 — Octets de bourrage PKCS#7 pour un multiple exact de 16",
        "stdin": "q:5",
        "expected": "16||16 octets"
      }
    ],
    "solution": "[Question 1 — Algorithme pour chiffrer les archives]\nAES-256\n\n[Question 2 — Algorithme pour distribuer les clés de session]\nRSA-2048\n\n[Question 3 — Nombre de blocs de 16 octets pour 65 536 octets]\n4096\n\n[Question 4 — Raison d'écarter l'autre algorithme pour les archives]\ntrop lent\n\n[Question 5 — Octets de bourrage PKCS#7 pour un multiple exact de 16]\n16",
    "takeaway": "1) Les archives quotidiennes sont volumineuses : AES-256, symétrique et accéléré par le matériel, s'impose.\n2) La distribution des clés de session profite de la paire publique/privée : RSA-2048.\n3) 65 536 / 16 = 4 096 blocs.\n4) RSA-2048 est environ mille fois plus lent qu'AES : chiffrer les archives avec lui serait impraticable.\n5) Un multiple exact de 16 reçoit un bloc complet de bourrage : 16 octets (valeur 0x10 répétée 16 fois).\nContrôle : 4 096 blocs de 16 octets = 65 536 octets, et avec le bourrage le chiffré ferait 65 552 octets (4 097 blocs)."
  },
  {
    "id": "cr3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Le logo visible : audit des modes d'opération d'ArchivePlus",
    "exampleTitle": "Exemple résolu — les radiographies du cabinet dentaire",
    "goal": "Distinguer ECB, CBC et GCM, et appliquer le bourrage PKCS#7 à des fichiers de tailles variées.",
    "brief": "<p><strong>Énoncé.</strong> La société ArchivePlus chiffre les documents de ses clients avec AES-128. Le stagiaire a chiffré le logo de l'entreprise (une grande image aux zones uniformes) en mode <strong>ECB</strong> : sur l'aperçu du fichier chiffré, on distingue encore vaguement le logo. L'entreprise chiffre aussi un <strong>fichier client de 100 octets</strong> et un <strong>fichier comptable de 96 octets</strong>, avec bourrage PKCS#7 et blocs de 16 octets.</p><ol><li>Pourquoi le logo reste-t-il reconnaissable dans le chiffré ECB ? Répondez en une phrase.</li><li>Quel mode chaîne chaque bloc clair avec le bloc chiffré précédent, à l'aide d'un vecteur d'initialisation ?</li><li>Quel mode fournit à la fois la confidentialité et l'authentification (chiffrement authentifié) ?</li><li>Combien d'octets de bourrage PKCS#7 ajoute le fichier client de 100 octets ?</li><li>Combien d'octets de bourrage ajoute le fichier comptable de 96 octets, multiple exact de 16 ?</li><li>Quelle sera la taille finale chiffrée du fichier comptable, bourrage compris ?</li></ol>",
    "starter": "# Exercice — Le logo visible : audit des modes d'opération d'ArchivePlus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : une phrase. Questions 2 et 3 : le nom du mode. Questions 4 à 6 : les nombres.\n\n[Question 1 — Pourquoi le logo reste visible en ECB]\nA_COMPLETER\n\n[Question 2 — Mode chaîné avec vecteur d'initialisation]\nA_COMPLETER\n\n[Question 3 — Mode de chiffrement authentifié]\nA_COMPLETER\n\n[Question 4 — Octets de bourrage pour 100 octets]\nA_COMPLETER\n\n[Question 5 — Octets de bourrage pour 96 octets]\nA_COMPLETER\n\n[Question 6 — Taille finale chiffrée du fichier de 96 octets]\nA_COMPLETER\n",
    "hints": [
      "ECB chiffre chaque bloc indépendamment, sans aucune liaison avec les blocs voisins.",
      "Le bourrage PKCS#7 ajoute p octets de valeur p, avec p = 16 − (taille mod 16) ; si la taille est déjà un multiple de 16, p = 16.",
      "1. Deux blocs clairs identiques donnent deux blocs chiffrés identiques en ECB. 2. CBC : XOR avec le chiffré précédent, IV pour le premier bloc. 3. GCM ajoute un tag d'authentification. 4. 100 = 6 × 16 + 4. 5. 96 = 6 × 16 exactement. 6. Ajoutez le bourrage au message."
    ],
    "examples": [
      {
        "stdin": "Un cabinet dentaire chiffre ses radiographies numériques avec AES-128 et des blocs de 16 octets.\n1) Une zone uniforme donne des blocs clairs identiques : en ECB, les blocs chiffrés se répètent et la forme transparaît.\n2) Mode chaîné avec IV : CBC.\n3) Mode authentifié : GCM.\n4) Une radio de 50 octets : 50 = 3 × 16 + 2, donc p = 16 − 2 = 14 octets de bourrage.\n5) Un compte rendu de 80 octets (5 × 16) : p = 16.\n6) Taille finale : 80 + 16 = 96 octets.",
        "expected": "blocs identiques — CBC — GCM — 14 octets — 16 octets — 96 octets",
        "note": "ECB ne doit jamais protéger des données structurées : le chaînement (CBC) ou le chiffrement authentifié (GCM) s'imposent."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Pourquoi le logo reste visible en ECB",
        "stdin": "q:1",
        "expected": "des blocs identiques donnent des blocs chiffrés identiques||blocs identiques, chiffrés identiques||deux blocs clairs identiques donnent le même chiffré||les blocs identiques restent identiques||chaque bloc est chiffré indépendamment"
      },
      {
        "label": "Question 2 — Mode chaîné avec vecteur d'initialisation",
        "stdin": "q:2",
        "expected": "CBC||cbc||le mode CBC"
      },
      {
        "label": "Question 3 — Mode de chiffrement authentifié",
        "stdin": "q:3",
        "expected": "GCM||gcm||le mode GCM"
      },
      {
        "label": "Question 4 — Octets de bourrage pour 100 octets",
        "stdin": "q:4",
        "expected": "12||12 octets"
      },
      {
        "label": "Question 5 — Octets de bourrage pour 96 octets",
        "stdin": "q:5",
        "expected": "16||16 octets"
      },
      {
        "label": "Question 6 — Taille finale chiffrée du fichier de 96 octets",
        "stdin": "q:6",
        "expected": "112||112 octets"
      }
    ],
    "solution": "[Question 1 — Pourquoi le logo reste visible en ECB]\ndes blocs identiques donnent des blocs chiffrés identiques\n\n[Question 2 — Mode chaîné avec vecteur d'initialisation]\nCBC\n\n[Question 3 — Mode de chiffrement authentifié]\nGCM\n\n[Question 4 — Octets de bourrage pour 100 octets]\n12\n\n[Question 5 — Octets de bourrage pour 96 octets]\n16\n\n[Question 6 — Taille finale chiffrée du fichier de 96 octets]\n112",
    "takeaway": "1) ECB chiffre chaque bloc indépendamment : les zones uniformes du logo produisent des blocs clairs identiques, donc des blocs chiffrés identiques, et la forme transparaît.\n2) CBC (Cipher Block Chaining) : chaque bloc clair est XORé avec le bloc chiffré précédent, le premier avec l'IV.\n3) GCM : chiffrement authentifié, confidentialité et tag d'intégrité.\n4) 100 = 6 × 16 + 4 : il manque 4 octets pour compléter le bloc, donc p = 16 − 4 = 12 octets de bourrage.\n5) 96 = 6 × 16 : multiple exact, donc p = 16 (un bloc complet de bourrage).\n6) Taille finale : 96 + 16 = 112 octets, soit 7 blocs.\nContrôle : 100 + 12 = 112 octets pour le fichier client également — les deux fichiers chiffrés font la même taille après bourrage."
  }
];
