'use strict';

module.exports = [
  {
    "id": "cr3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le déchiffrement affine du journal du club",
    "exampleTitle": "Exemple résolu — le cryptogramme du ciné-club",
    "goal": "Calculer un pgcd par l'algorithme d'Euclide, vérifier l'inversibilité d'une clé affine et déchiffrer une lettre à la main.",
    "brief": "<p><strong>Énoncé.</strong> Le club de mathématiques du lycée Pasteur chiffre ses annonces avec le <strong>chiffre affine</strong> C = (a × P + b) mod 26, avec a = 5 et b = 8. Pour déchiffrer, il faut connaître l'inverse de a modulo 26 : ici 21, car 5 × 21 = 105 = 4 × 26 + 1, et l'on retrouve alors P = 21 × (C − b) mod 26. Avant de déchiffrer l'annonce, le club vérifie quelques prérequis d'arithmétique.</p><ol><li>Calculez le pgcd(48, 18) avec l'algorithme d'Euclide.</li><li>La valeur a = 4 ne peut pas servir de clé multiplicative : que vaut pgcd(4, 26) ?</li><li>Vérifiez l'inverse annoncé : que vaut (5 × 21) mod 26 ?</li><li>Chiffrez la lettre E (P = 4) avec a = 5 et b = 8. Donnez la lettre chiffrée.</li><li>Déchiffrez la lettre U (C = 20) de l'annonce : P = 21 × (20 − 8) mod 26. Donnez la lettre claire.</li></ol>",
    "starter": "# Exercice — Le déchiffrement affine du journal du club\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : les nombres. Questions 4 et 5 : la lettre seule.\n\n[Question 1 — pgcd(48, 18) par Euclide]\nA_COMPLETER\n\n[Question 2 — pgcd(4, 26)]\nA_COMPLETER\n\n[Question 3 — (5 × 21) mod 26]\nA_COMPLETER\n\n[Question 4 — Chiffrement de la lettre E]\nA_COMPLETER\n\n[Question 5 — Déchiffrement de la lettre U]\nA_COMPLETER\n",
    "hints": [
      "L'algorithme d'Euclide : pgcd(a, b) = pgcd(b, a mod b), jusqu'à un reste nul ; le dernier reste non nul est le pgcd.",
      "Une clé multiplicative a n'est inversible modulo 26 que si pgcd(a, 26) = 1.",
      "1. 48 = 2 × 18 + 12, puis 18 = 1 × 12 + 6, puis 12 = 2 × 6 + 0. 2. 26 = 2 × 13. 3. 105 = 104 + 1. 4. (5 × 4 + 8) mod 26. 5. 21 × 12 = 252, puis 252 − 234."
    ],
    "examples": [
      {
        "stdin": "Le ciné-club utilise le chiffre affine avec a = 7 et b = 3 ; l'inverse de 7 modulo 26 est 15 (7 × 15 = 105 = 4 × 26 + 1).\n1) pgcd(52, 39) : 52 = 1 × 39 + 13 ; 39 = 3 × 13 + 0 : pgcd = 13.\n2) pgcd(2, 26) = 2 : a = 2 serait une clé invalide.\n3) (7 × 15) mod 26 = 105 − 104 = 1.\n4) Chiffrement de E (P = 4) : (7 × 4 + 3) = 31, 31 − 26 = 5 : lettre F.\n5) Déchiffrement de K (C = 10) : 15 × (10 − 3) = 105, 105 mod 26 = 1 : lettre B.",
        "expected": "13 — 2 — 1 — F — B",
        "note": "Sans pgcd(a, 26) = 1, deux lettres différentes peuvent se chiffrer pareil : le déchiffrement devient impossible."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — pgcd(48, 18) par Euclide",
        "stdin": "q:1",
        "expected": "6"
      },
      {
        "label": "Question 2 — pgcd(4, 26)",
        "stdin": "q:2",
        "expected": "2"
      },
      {
        "label": "Question 3 — (5 × 21) mod 26",
        "stdin": "q:3",
        "expected": "1"
      },
      {
        "label": "Question 4 — Chiffrement de la lettre E",
        "stdin": "q:4",
        "expected": "C||la lettre C"
      },
      {
        "label": "Question 5 — Déchiffrement de la lettre U",
        "stdin": "q:5",
        "expected": "S||la lettre S"
      }
    ],
    "solution": "[Question 1 — pgcd(48, 18) par Euclide]\n6\n\n[Question 2 — pgcd(4, 26)]\n2\n\n[Question 3 — (5 × 21) mod 26]\n1\n\n[Question 4 — Chiffrement de la lettre E]\nC\n\n[Question 5 — Déchiffrement de la lettre U]\nS",
    "takeaway": "1) Euclide : 48 = 2 × 18 + 12 ; 18 = 1 × 12 + 6 ; 12 = 2 × 6 + 0 : pgcd(48, 18) = 6.\n2) 26 = 2 × 13 : pgcd(4, 26) = 2, donc 4 n'est pas inversible modulo 26 et ne peut pas servir de clé multiplicative.\n3) 5 × 21 = 105 = 4 × 26 + 1 : (5 × 21) mod 26 = 1, ce qui prouve que 21 est bien l'inverse de 5.\n4) C = (5 × 4 + 8) mod 26 = 28 mod 26 = 2 : la lettre C.\n5) P = 21 × (20 − 8) mod 26 = 21 × 12 mod 26 = 252 mod 26 = 18 : la lettre S.\nContrôle : en rechiffrant S (P = 18) : (5 × 18 + 8) mod 26 = 98 mod 26 = 20, on retrouve la lettre U."
  },
  {
    "id": "cr3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "L'échange de clés des deux agences de presse",
    "exampleTitle": "Exemple résolu — le lien radio des deux phares",
    "goal": "Dérouler un échange Diffie-Hellman complet avec de petits nombres premiers, puis identifier le problème fondateur et l'attaque de l'homme du milieu.",
    "brief": "<p><strong>Énoncé.</strong> Les agences de presse Aurora et Borée doivent convenir d'un secret commun sur un canal public écouté. Elles utilisent <strong>Diffie-Hellman</strong> avec les paramètres publics p = 29 et g = 2. Aurora choisit secrètement a = 5, Borée choisit secrètement b = 12. Étapes : Aurora envoie A = g^a mod p ; Borée envoie B = g^b mod p ; chacun élève ensuite la valeur reçue à sa puissance secrète.</p><ol><li>Quelle valeur A Aurora calcule-t-elle et envoie publiquement ?</li><li>Quelle valeur B Borée calcule-t-elle et envoie publiquement ?</li><li>Quel secret commun les deux agences obtiennent-elles finalement ?</li><li>Un espion voit p, g, A et B : de quel problème réputé difficile devrait-il résoudre une instance pour retrouver a ou b ?</li><li>L'échange n'étant pas authentifié, quelle attaque classique permet à un tiers de s'interposer et de négocier deux secrets séparés ?</li></ol>",
    "starter": "# Exercice — L'échange de clés des deux agences de presse\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : les nombres. Questions 4 et 5 : un terme.\n\n[Question 1 — Valeur A envoyée par Aurora]\nA_COMPLETER\n\n[Question 2 — Valeur B envoyée par Borée]\nA_COMPLETER\n\n[Question 3 — Secret commun obtenu]\nA_COMPLETER\n\n[Question 4 — Problème difficile que devrait résoudre l'espion]\nA_COMPLETER\n\n[Question 5 — Attaque par interposition sans authentification]\nA_COMPLETER\n",
    "hints": [
      "Pour élever à une puissance modulo p, procédez par carrés successifs : g^2, g^4, g^8, puis combinez les exposants.",
      "Le secret commun se calcule des deux côtés : B^a mod p et A^b mod p doivent coïncider.",
      "1. 2^5 = 32. 2. 2^12 = 2^10 × 2^2, avec 2^10 = (2^5)^2 = 9, puis 9 × 4 = 36. 3. Calculez 7^5 mod 29 : 7^2 = 20, 7^4 = 23, puis 23 × 7. 4. Retrouver l'exposant depuis la puissance. 5. Sans authentification, un tiers peut se faire passer pour chacun devant l'autre."
    ],
    "examples": [
      {
        "stdin": "Deux phares côtiers échangent par Diffie-Hellman avec p = 17 et g = 3 ; secrets a = 4 et b = 6.\n1) A = 3^4 mod 17 = 81 − 68 = 13.\n2) B = 3^6 mod 17 = 117 − 102 = 15.\n3) Secret commun : 15^4 mod 17 = 16, et 13^6 mod 17 = 16 aussi.\n4) L'espion devrait résoudre le logarithme discret.\n5) Sans authentification, l'attaque de l'homme du milieu s'interpose.",
        "expected": "A = 13 — B = 15 — secret = 16 — le logarithme discret — l'homme du milieu",
        "note": "Les deux voies de calcul du secret doivent coïncider : c'est le contrôle de tout échange Diffie-Hellman."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Valeur A envoyée par Aurora",
        "stdin": "q:1",
        "expected": "3||A = 3"
      },
      {
        "label": "Question 2 — Valeur B envoyée par Borée",
        "stdin": "q:2",
        "expected": "7||B = 7"
      },
      {
        "label": "Question 3 — Secret commun obtenu",
        "stdin": "q:3",
        "expected": "16"
      },
      {
        "label": "Question 4 — Problème difficile que devrait résoudre l'espion",
        "stdin": "q:4",
        "expected": "le logarithme discret||logarithme discret||le problème du logarithme discret"
      },
      {
        "label": "Question 5 — Attaque par interposition sans authentification",
        "stdin": "q:5",
        "expected": "l'homme du milieu||l'attaque de l'homme du milieu||man in the middle||man-in-the-middle||mitm"
      }
    ],
    "solution": "[Question 1 — Valeur A envoyée par Aurora]\n3\n\n[Question 2 — Valeur B envoyée par Borée]\n7\n\n[Question 3 — Secret commun obtenu]\n16\n\n[Question 4 — Problème difficile que devrait résoudre l'espion]\nle logarithme discret\n\n[Question 5 — Attaque par interposition sans authentification]\nl'homme du milieu",
    "takeaway": "1) A = 2^5 mod 29 = 32 mod 29 = 3.\n2) 2^10 = (2^5)^2 = 3^2 = 9 ; 2^12 = 2^10 × 2^2 = 9 × 4 = 36 mod 29 = 7 : B = 7.\n3) Secret : 7^5 mod 29 : 7^2 = 49 = 20 ; 7^4 = 20^2 = 400 = 23 ; 7^5 = 23 × 7 = 161 = 16. Vérification par l'autre voie : 3^4 = 81 = 23 ; 3^8 = 23^2 = 529 = 7 ; 3^12 = 3^8 × 3^4 = 7 × 23 = 161 = 16 : secret commun 16.\n4) Le problème du logarithme discret : retrouver a depuis A = g^a mod p.\n5) L'attaque de l'homme du milieu : un attaquant non authentifié négocie un secret avec chaque partie.\nContrôle : B^a = A^b = 16, les deux voies retombent sur le même secret ; il faut authentifier l'échange (signatures, certificats) pour fermer la porte à l'homme du milieu."
  },
  {
    "id": "cr3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le badge RSA pédagogique du fablab",
    "exampleTitle": "Exemple résolu — le passe RSA du conservatoire",
    "goal": "Générer pas à pas une paire de clés RSA miniature, puis chiffrer et déchiffrer un message.",
    "brief": "<p><strong>Énoncé.</strong> Le fablab du lycée protège ses badges électroniques avec un <strong>RSA pédagogique</strong> à petits nombres : nombres premiers p = 11 et q = 13, exposant public e = 7. Le message d'un badge vaut m = 9. Rappels : n = p × q ; φ(n) = (p − 1)(q − 1) ; la clé privée d est l'inverse de e modulo φ(n) ; chiffrement c = m^e mod n ; déchiffrement m = c^d mod n.</p><ol><li>Que vaut le module n ?</li><li>Que vaut φ(n) ?</li><li>Vérifions le choix de l'exposant : que vaut pgcd(7, 120) ?</li><li>Quelle est la clé privée d, inverse de 7 modulo 120 (on rappelle que 7 × 103 = 721) ?</li><li>Chiffrez le message m = 9 : que vaut c = 9^7 mod 143 ?</li><li>Le lecteur déchiffre : que vaut m = 48^103 mod 143 ?</li></ol>",
    "starter": "# Exercice — Le badge RSA pédagogique du fablab\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 6 : les nombres.\n\n[Question 1 — Module n]\nA_COMPLETER\n\n[Question 2 — Indicatrice φ(n)]\nA_COMPLETER\n\n[Question 3 — pgcd(7, 120)]\nA_COMPLETER\n\n[Question 4 — Clé privée d]\nA_COMPLETER\n\n[Question 5 — Chiffré c du message 9]\nA_COMPLETER\n\n[Question 6 — Message déchiffré depuis c = 48]\nA_COMPLETER\n",
    "hints": [
      "n est le produit des deux nombres premiers ; φ(n) se calcule avec (p − 1)(q − 1), pas avec n − 1.",
      "L'exposant e doit être premier avec φ(n) pour que d existe ; d vérifie e × d ≡ 1 (mod φ(n)).",
      "1. 11 × 13. 2. 10 × 12. 3. 120 = 2 × 2 × 2 × 3 × 5, sans facteur 7. 4. 721 = 720 + 1. 5. Élevez par carrés successifs : 9^2 = 81, 9^3 = 729 = 14 (mod 143), 9^6 = 14^2, puis 9^7 = 9^6 × 9. 6. Le déchiffrement doit restituer le message d'origine."
    ],
    "examples": [
      {
        "stdin": "Le conservatoire utilise un RSA miniature : p = 3, q = 11, e = 3, message m = 5.\n1) n = 3 × 11 = 33.\n2) φ(33) = 2 × 10 = 20.\n3) pgcd(3, 20) = 1 : e convient.\n4) d = 7 car 3 × 7 = 21 = 20 + 1.\n5) c = 5^3 mod 33 = 125 − 99 = 26.\n6) Déchiffrement : 26^7 mod 33 = 5, le message d'origine.",
        "expected": "n = 33 — φ = 20 — pgcd = 1 — d = 7 — c = 26 — m = 5",
        "note": "Avec des premiers de cette taille, factoriser n est trivial : le vrai RSA emploie des modules de 2048 bits et plus."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Module n",
        "stdin": "q:1",
        "expected": "143"
      },
      {
        "label": "Question 2 — Indicatrice φ(n)",
        "stdin": "q:2",
        "expected": "120"
      },
      {
        "label": "Question 3 — pgcd(7, 120)",
        "stdin": "q:3",
        "expected": "1"
      },
      {
        "label": "Question 4 — Clé privée d",
        "stdin": "q:4",
        "expected": "103"
      },
      {
        "label": "Question 5 — Chiffré c du message 9",
        "stdin": "q:5",
        "expected": "48"
      },
      {
        "label": "Question 6 — Message déchiffré depuis c = 48",
        "stdin": "q:6",
        "expected": "9"
      }
    ],
    "solution": "[Question 1 — Module n]\n143\n\n[Question 2 — Indicatrice φ(n)]\n120\n\n[Question 3 — pgcd(7, 120)]\n1\n\n[Question 4 — Clé privée d]\n103\n\n[Question 5 — Chiffré c du message 9]\n48\n\n[Question 6 — Message déchiffré depuis c = 48]\n9",
    "takeaway": "1) n = p × q = 11 × 13 = 143.\n2) φ(n) = (11 − 1) × (13 − 1) = 10 × 12 = 120.\n3) 120 = 2^3 × 3 × 5 ne comporte pas le facteur 7 : pgcd(7, 120) = 1.\n4) 7 × 103 = 721 = 6 × 120 + 1, donc d = 103.\n5) 9^2 = 81 ; 9^3 = 729 = 729 − 715 = 14 (mod 143) ; 9^6 = 14^2 = 196 = 53 ; 9^7 = 53 × 9 = 477 = 477 − 429 = 48 : c = 48.\n6) 48^103 mod 143 = 9 : le lecteur retrouve exactement le message d'origine.\nContrôle : le déchiffrement restitue m = 9, preuve que d = 103 est bien l'inverse de e = 7 modulo 120."
  }
];
