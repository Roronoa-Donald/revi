'use strict';

module.exports = [
  {
    "id": "ig2-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "L'éclairage du stand de céramiques",
    "exampleTitle": "Exemple résolu — l'éclairage du stand de luminaires",
    "goal": "Appliquer la loi du cosinus de Lambert pour calculer l'éclairage diffus et la couleur rendue d'une surface mate.",
    "brief": "<p><strong>Énoncé.</strong> Une céramiste expose ses pièces sur un stand reproduit en 3D pour une visite virtuelle. Au point étudié d'un vase en terre claire, la normale vaut <strong>N = (0 ; 0 ; 1)</strong> et la lumière directionnelle unitaire <strong>L = (0,6 ; 0 ; 0,8)</strong>. Le modèle de Lambert du cours donne l'éclairage diffus <code>Id = max(0, N · L)</code>, et la couleur rendue vaut <code>albedo × Id</code>. L'albedo du vase vaut <strong>0,5</strong>.</p><p>Répondez par le nombre décimal seul (notation française 0,8 acceptée) ; la question 4 attend 0, la question 5 un angle en degrés.</p><ol><li>Que vaut le produit scalaire N · L ?</li><li>Que vaut l'éclairage diffus Id au point étudié ?</li><li>Quelle est la couleur rendue du vase en ce point (albedo × Id) ?</li><li>Si la lumière frappait la surface à la limite du rasant (N · L = 0), que vaudrait Id ?</li><li>L'angle entre N et L vaut environ combien de degrés (arrondi au degré, cos 37° ≈ 0,80) ?</li></ol>",
    "starter": "# Exercice — L'éclairage du stand de céramiques\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : décimal seul. Question 4 : 0. Question 5 : angle en degrés.\n\n[Question 1 — Produit scalaire N · L]\nA_COMPLETER\n\n[Question 2 — Éclairage diffus Id]\nA_COMPLETER\n\n[Question 3 — Couleur rendue (albedo x Id)]\nA_COMPLETER\n\n[Question 4 — Id en lumière rasante]\nA_COMPLETER\n\n[Question 5 — Angle entre N et L (en degrés)]\nA_COMPLETER\n",
    "hints": [
      "Le produit scalaire de deux vecteurs unitaires donne le cosinus de l'angle entre eux : N · L = Nx × Lx + Ny × Ly + Nz × Lz.",
      "Ici, seule la composante Z de L contribue : 1 × 0,8.",
      "1. N · L = 0,8. 2. max(0 ; 0,8) = 0,8. 3. 0,5 × 0,8 = 0,4. 4. Le max avec 0 écrase tout angle rasant : Id = 0. 5. cos θ = 0,8, donc θ ≈ 37°."
    ],
    "examples": [
      {
        "stdin": "Le stand de luminaires éclaire une surface mate : N = (0 ; 0 ; 1), L = (0,8 ; 0 ; 0,6), albedo 0,75.\n\n1) N · L = 0 × 0,8 + 0 × 0 + 1 × 0,6 = 0,6.\n2) Id = max(0 ; 0,6) = 0,6.\n3) Couleur rendue : 0,75 × 0,6 = 0,45.\n4) Lumière rasante : N · L = 0, donc Id = 0.\n5) cos θ = 0,6, donc θ ≈ 53°.",
        "expected": "0,6 — 0,6 — 0,45 — 0 en lumière rasante — angle d'environ 53°",
        "note": "La loi de Lambert est une affaire de géométrie : une surface reçoit d'autant moins de lumière qu'elle se présente de biais, proportionnellement au cosinus de l'angle d'incidence."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Produit scalaire N · L",
        "stdin": "q:1",
        "expected": "0,8||0.8"
      },
      {
        "label": "Question 2 — Éclairage diffus Id",
        "stdin": "q:2",
        "expected": "0,8||0.8"
      },
      {
        "label": "Question 3 — Couleur rendue (albedo x Id)",
        "stdin": "q:3",
        "expected": "0,4||0.4"
      },
      {
        "label": "Question 4 — Id en lumière rasante",
        "stdin": "q:4",
        "expected": "0||zero||zéro"
      },
      {
        "label": "Question 5 — Angle entre N et L (en degrés)",
        "stdin": "q:5",
        "expected": "37||37°||37 degrés||37 degres"
      }
    ],
    "solution": "[Question 1 — Produit scalaire N · L]\n0,8\n\n[Question 2 — Éclairage diffus Id]\n0,8\n\n[Question 3 — Couleur rendue (albedo x Id)]\n0,4\n\n[Question 4 — Id en lumière rasante]\n0\n\n[Question 5 — Angle entre N et L (en degrés)]\n37",
    "takeaway": "1) N · L = 0 × 0,6 + 0 × 0 + 1 × 0,8 = 0,8.\n2) Id = max(0 ; 0,8) = 0,8.\n3) Couleur rendue : albedo × Id = 0,5 × 0,8 = 0,4.\n4) En lumière rasante, N · L = 0, donc Id = max(0 ; 0) = 0 : la face ne reçoit plus de flux direct.\n5) N et L sont unitaires, donc cos θ = 0,8 : l'angle d'incidence vaut environ 37°.\nContrôle : L est bien unitaire (0,6² + 0 + 0,8² = 0,36 + 0,64 = 1), le produit scalaire est un cosinus valide."
  },
  {
    "id": "ig2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le reflet spéculaire de la carrosserie",
    "exampleTitle": "Exemple résolu — le reflet de la poignée chromée",
    "goal": "Calculer le rayon réfléchi puis l'intensité spéculaire du modèle de Phong pour deux brillances différentes.",
    "brief": "<p><strong>Énoncé.</strong> Un studio automobile règle le rendu d'une carrosserie brillante. Au point étudié, la normale vaut <strong>N = (0 ; 0 ; 1)</strong> et la lumière directionnelle <strong>L = (0 ; 0,6 ; 0,8)</strong>. Le modèle de Phong calcule d'abord le rayon réfléchi <code>R = 2 (N · L) N − L</code>, puis l'intensité spéculaire <code>Is = max(0, R · V) ^ s</code>, où V est le vecteur unitaire vers la caméra et s la brillance (shininess). La caméra est frontale : <strong>V = (0 ; 0 ; 1)</strong>.</p><p>Les questions 1 à 4 appellent un vecteur au format (0, -0,6, 0,8) ou un nombre décimal arrondi à deux décimales ; la question 5 un choix de trois mots.</p><ol><li>Que vaut le vecteur réfléchi R ?</li><li>Que vaut le produit scalaire R · V ?</li><li>Avec une brillance s = 8, que vaut Is ?</li><li>Avec une brillance s = 16, que vaut Is ?</li><li>Quand la brillance augmente, la tache spéculaire devient-elle plus large ou plus petite ?</li></ol>",
    "starter": "# Exercice — Le reflet spéculaire de la carrosserie\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : vecteur au format (0, -0,6, 0,8). Questions 2 à 4 : décimal à deux chiffres.\n\n[Question 1 — Vecteur réfléchi R]\nA_COMPLETER\n\n[Question 2 — Produit scalaire R · V]\nA_COMPLETER\n\n[Question 3 — Is avec une brillance de 8]\nA_COMPLETER\n\n[Question 4 — Is avec une brillance de 16]\nA_COMPLETER\n\n[Question 5 — Évolution de la tache spéculaire]\nA_COMPLETER\n",
    "hints": [
      "Calculez d'abord N · L = 0,8 : le reflet s'obtient en symétrisant L par rapport à la normale.",
      "Vérifiez que R reste unitaire (0,36 + 0,64 = 1) : c'est un bon contrôle avant le produit scalaire avec V.",
      "1. R = 2 × 0,8 × (0 ; 0 ; 1) − (0 ; 0,6 ; 0,8) = (0 ; −0,6 ; 0,8). 2. R · V = 0,8. 3. 0,8 ^ 8 = 0,17. 4. 0,8 ^ 16 = 0,03. 5. Un exposant plus grand resserre la tache : plus petite."
    ],
    "examples": [
      {
        "stdin": "Une poignée de porte chromée : N = (0 ; 0 ; 1), L = (0 ; 0 ; 1) (lumière frontale), caméra V = (0,6 ; 0 ; 0,8).\n\n1) R = 2 × 1 × N − L = (0 ; 0 ; 1).\n2) R · V = 1 × 0,8 = 0,8.\n3) Avec s = 4 : Is = 0,8 ^ 4 = 0,41.\n4) Avec s = 12 : Is = 0,8 ^ 12 = 0,07.\n5) La tache devient plus petite quand la brillance augmente.",
        "expected": "R = (0, 0, 1) — R · V = 0,8 — 0,41 avec s = 4 — 0,07 avec s = 12 — plus petite",
        "note": "L'exposant de brillance resserre la lobule spéculaire : élever 0,8 à une puissance plus grande donne un reflet plus fin, typique des vernis et chromes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Vecteur réfléchi R",
        "stdin": "q:1",
        "expected": "(0, -0,6, 0,8)||(0,-0.6,0.8)||(0 ; -0,6 ; 0,8)||(0, −0,6, 0,8)||(0, -0.6, 0.8)"
      },
      {
        "label": "Question 2 — Produit scalaire R · V",
        "stdin": "q:2",
        "expected": "0,8||0.8"
      },
      {
        "label": "Question 3 — Is avec une brillance de 8",
        "stdin": "q:3",
        "expected": "0,17||0.17||0,168||0.168"
      },
      {
        "label": "Question 4 — Is avec une brillance de 16",
        "stdin": "q:4",
        "expected": "0,03||0.03||0,028||0.028"
      },
      {
        "label": "Question 5 — Évolution de la tache spéculaire",
        "stdin": "q:5",
        "expected": "plus petite||plus petite et plus nette||plus nette"
      }
    ],
    "solution": "[Question 1 — Vecteur réfléchi R]\n(0, -0,6, 0,8)\n\n[Question 2 — Produit scalaire R · V]\n0,8\n\n[Question 3 — Is avec une brillance de 8]\n0,17\n\n[Question 4 — Is avec une brillance de 16]\n0,03\n\n[Question 5 — Évolution de la tache spéculaire]\nplus petite",
    "takeaway": "1) N · L = 0,8 ; R = 2 × 0,8 × (0 ; 0 ; 1) − (0 ; 0,6 ; 0,8) = (0 ; 0 ; 1,6) − (0 ; 0,6 ; 0,8) = (0 ; −0,6 ; 0,8).\n2) R · V = 0 × 0 + (−0,6) × 0 + 0,8 × 1 = 0,8.\n3) Is = 0,8 ^ 8 = 0,1678, arrondi à 0,17.\n4) Is = 0,8 ^ 16 = 0,0281, arrondi à 0,03.\n5) Plus la brillance augmente, plus la tache spéculaire se resserre : elle devient plus petite (et plus nette).\nContrôle : R est unitaire ((−0,6)² + 0,8² = 1) et 0,8 ^ 16 = (0,8 ^ 8)² = 0,168² ≈ 0,028."
  },
  {
    "id": "ig2-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "L'audit PBR du boîtier de montre",
    "exampleTitle": "Exemple résolu — la bague en or",
    "goal": "Vérifier la cohérence physique d'un matériau PBR : conservation de l'énergie, composante diffuse d'un métal et effet Fresnel.",
    "brief": "<p><strong>Énoncé.</strong> Le studio audite le rendu PBR d'une montre de luxe. Le cadran est un diélectrique (metallic = 0), le bracelet un métal. Le cours impose : <code>kd + ks ≤ 1</code> (conservation de l'énergie) ; un métal parfait n'a aucune composante diffuse (<code>kd = 0</code>) ; l'effet Fresnel suit la formule de Schlick <code>F(θ) = F0 + (1 − F0) × (1 − cos θ) ^ 5</code>.</p><p>Rappel : cos 60° = 0,5. Répondez par le nombre décimal seul (0,04 ou 0.04 acceptés) ; la question 6 par oui ou non.</p><ol><li>Quelle est la valeur standard de F0 pour un diélectrique comme le cadran ?</li><li>Pour le bracelet, un métal parfait (metallic = 1) : que vaut sa composante diffuse kd ?</li><li>Quelle valeur maximale la somme kd + ks ne peut-elle pas dépasser ?</li><li>Pour le cadran, que vaut F(60°) avec F0 = 0,04 ?</li><li>À incidence rasante (l'angle tend vers 90°), vers quelle valeur tend F(θ) ?</li><li>Un matériau réglé avec kd = 0,7 et ks = 0,5 est-il physiquement plausible ?</li></ol>",
    "starter": "# Exercice — L'audit PBR du boîtier de montre\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : décimal seul. Question 6 : oui ou non.\n\n[Question 1 — F0 d'un diélectrique]\nA_COMPLETER\n\n[Question 2 — kd d'un métal parfait]\nA_COMPLETER\n\n[Question 3 — Maximum de kd + ks]\nA_COMPLETER\n\n[Question 4 — F(60°) du cadran]\nA_COMPLETER\n\n[Question 5 — Limite de F à incidence rasante]\nA_COMPLETER\n\n[Question 6 — Matériau kd = 0,7 et ks = 0,5 plausible ?]\nA_COMPLETER\n",
    "hints": [
      "La conservation de l'énergie impose qu'une surface ne réémette jamais plus de lumière qu'elle n'en reçoit.",
      "Dans la formule de Schlick, seul (1 − cos θ) ^ 5 varie avec l'angle : à 60°, il vaut 0,5 ^ 5 = 0,03125.",
      "1. F0 diélectrique = 0,04. 2. Le métal parfait ne diffuse pas : kd = 0. 3. kd + ks ≤ 1. 4. 0,04 + 0,96 × 0,03125 = 0,07. 5. (1 − cos θ) ^ 5 tend vers 1 : F tend vers 1. 6. 0,7 + 0,5 = 1,2 : non."
    ],
    "examples": [
      {
        "stdin": "Une bague en or est rendue en PBR avec F0 = 0,9 pour le métal.\n\n1) F0 de l'or : 0,9 (contre 0,04 pour un diélectrique).\n2) Métal parfait : kd = 0, toute la lumière est réfléchie.\n3) kd + ks doit rester inférieur ou égal à 1.\n4) F(60°) = 0,9 + 0,1 × 0,03125 = 0,90.\n5) À incidence rasante, F tend vers 1.\n6) kd = 0,4 et ks = 0,5 : 0,9 ≤ 1, plausible.",
        "expected": "kd = 0 pour le métal — kd + ks ≤ 1 — F(60°) = 0,90 avec F0 = 0,9 — F tend vers 1 — plausible (0,9 ≤ 1)",
        "note": "L'effet Fresnel est spectaculaire : même un matériau terne devient presque un miroir vu sous un angle très rasant."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — F0 d'un diélectrique",
        "stdin": "q:1",
        "expected": "0,04||0.04"
      },
      {
        "label": "Question 2 — kd d'un métal parfait",
        "stdin": "q:2",
        "expected": "0||zero||zéro"
      },
      {
        "label": "Question 3 — Maximum de kd + ks",
        "stdin": "q:3",
        "expected": "1||un||1.0"
      },
      {
        "label": "Question 4 — F(60°) du cadran",
        "stdin": "q:4",
        "expected": "0,07||0.07"
      },
      {
        "label": "Question 5 — Limite de F à incidence rasante",
        "stdin": "q:5",
        "expected": "1||un"
      },
      {
        "label": "Question 6 — Matériau kd = 0,7 et ks = 0,5 plausible ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — F0 d'un diélectrique]\n0,04\n\n[Question 2 — kd d'un métal parfait]\n0\n\n[Question 3 — Maximum de kd + ks]\n1\n\n[Question 4 — F(60°) du cadran]\n0,07\n\n[Question 5 — Limite de F à incidence rasante]\n1\n\n[Question 6 — Matériau kd = 0,7 et ks = 0,5 plausible ?]\nnon",
    "takeaway": "1) La réflectance F0 d'un diélectrique vaut environ 0,04 : le cadran ne réfléchit que 4 % de la lumière en incidence frontale.\n2) Un métal parfait n'a aucune réfraction interne : kd = 0, toute la couleur vient du reflet spéculaire.\n3) La conservation de l'énergie impose kd + ks ≤ 1.\n4) F(60°) = 0,04 + (1 − 0,04) × (1 − 0,5) ^ 5 = 0,04 + 0,96 × 0,03125 = 0,04 + 0,03 = 0,07.\n5) Quand θ tend vers 90°, cos θ tend vers 0, donc (1 − cos θ) ^ 5 tend vers 1 et F(θ) tend vers 1 : tout matériau devient miroir à incidence rasante.\n6) 0,7 + 0,5 = 1,2, ce qui dépasse 1 : le matériau réémettrait plus d'énergie qu'il n'en reçoit, il n'est pas plausible.\nContrôle : en incidence frontale (θ = 0), (1 − cos 0) ^ 5 = 0, donc F(0) = F0 : la formule de Schlick redonne bien la réflectance de base."
  }
];
