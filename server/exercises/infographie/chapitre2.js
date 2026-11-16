'use strict';

module.exports = [
  {
    "id": "ig2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le visuel de couverture du fanzine",
    "exampleTitle": "Exemple résolu — l'affiche du concert underground",
    "goal": "Calculer la valeur résultante d'un pixel selon les modes de fusion Multiply, Screen et Overlay.",
    "brief": "<p><strong>Énoncé.</strong> Nora assemble la couverture d'un fanzine dans son logiciel de retouche. Sur le canal étudié, le calque inférieur (texture papier) a une valeur de base <strong>A = 102</strong> et le calque supérieur (encre projetée) une valeur <strong>B = 170</strong>, sur l'échelle 0–255. La valeur affichée dépend du mode de fusion choisi :</p><table><tr><th>Mode</th><th>Formule</th></tr><tr><th>Multiply</th><td>R = A × B / 255</td></tr><tr><th>Screen</th><td>R = 255 − (255 − A) × (255 − B) / 255</td></tr><tr><th>Overlay</th><td>Si A &lt; 128 : R = 2 × A × B / 255 ; sinon R = 255 − 2 × (255 − A) × (255 − B) / 255</td></tr></table><p>Répondez par le nombre entier seul ; la question 4 appelle le nom du mode, la question 5 une valeur.</p><ol><li>Quelle valeur finale produit le mode Multiply ?</li><li>Quelle valeur finale produit le mode Screen ?</li><li>Quelle valeur finale produit le mode Overlay ?</li><li>Quel mode éclaircit obligatoirement l'image de base, le noir du calque supérieur étant son élément neutre ?</li><li>Quelle valeur de B (l'élément neutre) laisserait la base A inchangée en mode Multiply ?</li></ol>",
    "starter": "# Exercice — Le visuel de couverture du fanzine\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : nombre entier seul. Question 4 : le nom du mode. Question 5 : une valeur.\n\n[Question 1 — Résultat en mode Multiply]\nA_COMPLETER\n\n[Question 2 — Résultat en mode Screen]\nA_COMPLETER\n\n[Question 3 — Résultat en mode Overlay]\nA_COMPLETER\n\n[Question 4 — Le mode éclaircissant]\nA_COMPLETER\n\n[Question 5 — Élément neutre du mode Multiply]\nA_COMPLETER\n",
    "hints": [
      "Multiply multiplie les niveaux : le résultat ne peut qu'assombrir. Screen multiplie les compléments : le résultat ne peut qu'éclaircir.",
      "Pour Screen, calculez d'abord (255 − A) et (255 − B), multipliez-les, divisez par 255, puis retranchez le tout de 255.",
      "1. Multiply : 102 × 170 / 255 = 68. 2. Screen : 255 − 153 × 85 / 255 = 204. 3. A = 102 est sous 128 : 2 × 102 × 170 / 255 = 136. 4. Screen est le mode éclaircissant. 5. Seul le blanc (255) est neutre en Multiply."
    ],
    "examples": [
      {
        "stdin": "Une affiche de concert superpose une base A = 51 et une encre B = 153 (échelle 0–255).\n\n1) Multiply : 51 × 153 / 255 = 30,6, arrondi à 31.\n2) Screen : 255 − 204 × 102 / 255 = 173,4, arrondi à 173.\n3) Overlay : A est sous 128, donc 2 × 51 × 153 / 255 = 61,2, arrondi à 61.\n4) Le mode éclaircissant est Screen.\n5) L'élément neutre du Multiply est le blanc, 255.",
        "expected": "31 — 173 — 61 — Screen — 255",
        "note": "Multiply et Screen sont duaux : Screen applique un Multiply aux couleurs inversées. Avec A = 51 : Multiply assombrit (31) et Screen éclaircit (173)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Résultat en mode Multiply",
        "stdin": "q:1",
        "expected": "68"
      },
      {
        "label": "Question 2 — Résultat en mode Screen",
        "stdin": "q:2",
        "expected": "204"
      },
      {
        "label": "Question 3 — Résultat en mode Overlay",
        "stdin": "q:3",
        "expected": "136"
      },
      {
        "label": "Question 4 — Le mode éclaircissant",
        "stdin": "q:4",
        "expected": "Screen||screen||Superposition||la superposition"
      },
      {
        "label": "Question 5 — Élément neutre du mode Multiply",
        "stdin": "q:5",
        "expected": "255||le blanc||blanc||255 (blanc)"
      }
    ],
    "solution": "[Question 1 — Résultat en mode Multiply]\n68\n\n[Question 2 — Résultat en mode Screen]\n204\n\n[Question 3 — Résultat en mode Overlay]\n136\n\n[Question 4 — Le mode éclaircissant]\nScreen\n\n[Question 5 — Élément neutre du mode Multiply]\n255",
    "takeaway": "1) Multiply : R = 102 × 170 / 255 = 17 340 / 255 = 68. La couverture s'assombrit (68 < 102).\n2) Screen : (255 − 102) = 153 et (255 − 170) = 85 ; 153 × 85 / 255 = 51 ; R = 255 − 51 = 204. La couverture s'éclaircit.\n3) Overlay : A = 102 est inférieur à 128, donc R = 2 × 102 × 170 / 255 = 34 680 / 255 = 136.\n4) Screen est le mode éclaircissant : son élément neutre est le noir (B = 0 laisse A inchangé).\n5) En mode Multiply, seul B = 255 (le blanc) laisse A inchangé : R = A × 255 / 255 = A.\nContrôle : Multiply et Screen sont symétriques, avec les éléments neutres blanc et noir ; Overlay combine les deux comportements selon que A est sous ou au-dessus de 128."
  },
  {
    "id": "ig2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "L'arche du logo de La Rotonde",
    "exampleTitle": "Exemple résolu — la vague du logo du club de paddle",
    "goal": "Évaluer un point d'une courbe de Bézier cubique à t = 0,5 et identifier les niveaux de continuité d'un raccord.",
    "brief": "<p><strong>Énoncé.</strong> Kévin dessine au vectoriel le logo de la salle de spectacles <strong>La Rotonde</strong> : une arche reposant sur une ligne de base. L'arche est une courbe de Bézier cubique allant de <strong>P0 = (0, 0)</strong> à <strong>P3 = (160, 0)</strong>, avec les poignées <strong>P1 = (40, 120)</strong> et <strong>P2 = (120, 120)</strong>. Il veut contrôler la position exacte du point de la courbe au paramètre <strong>t = 0,5</strong> :</p><p><code>B(t) = (1 − t)³ · P0 + 3(1 − t)² · t · P1 + 3(1 − t) · t² · P2 + t³ · P3</code></p><p>Les questions 1 et 2 appellent un nombre décimal (les fractions 1/8 et 3/8 sont acceptées) ; les questions 3 et 4 un nombre entier de pixels ; la question 5 une notation de deux caractères.</p><ol><li>Que vaut le coefficient (1 − t)³, celui de P0, pour t = 0,5 ?</li><li>Que vaut le coefficient 3(1 − t)² · t, celui de P1 ?</li><li>Quelle est l'abscisse x du point B(0,5) ?</li><li>Quelle est son ordonnée y ?</li><li>L'arche doit se raccorder à une seconde courbe partant du même point P3 : si seule la position commune du point de jonction est garantie, quel niveau de continuité (notation du cours) est-il assuré ?</li></ol>",
    "starter": "# Exercice — L'arche du logo de La Rotonde\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : décimal (ou fraction). Questions 3 et 4 : nombre entier. Question 5 : notation à deux caractères.\n\n[Question 1 — Coefficient de P0]\nA_COMPLETER\n\n[Question 2 — Coefficient de P1]\nA_COMPLETER\n\n[Question 3 — Abscisse x de B(0,5)]\nA_COMPLETER\n\n[Question 4 — Ordonnée y de B(0,5)]\nA_COMPLETER\n\n[Question 5 — Continuité du raccord]\nA_COMPLETER\n",
    "hints": [
      "Pour t = 0,5, chaque facteur (1 − t) et t vaut 0,5 : les coefficients s'obtiennent avec les puissances de 0,5.",
      "La somme des quatre coefficients vaut toujours 1 : vérifiez 0,125 + 0,375 + 0,375 + 0,125.",
      "1. (0,5)³ = 0,125. 2. 3 × (0,5)² × 0,5 = 0,375. 3. x = 0,375 × 40 + 0,375 × 120 + 0,125 × 160 = 80. 4. y = 0,375 × 120 + 0,375 × 120 = 90. 5. Deux courbes qui se touchent au même point sont C0."
    ],
    "examples": [
      {
        "stdin": "Le club de paddle trace une vague : P0 = (0, 0), P1 = (60, 80), P2 = (140, 80), P3 = (200, 0), évaluée à t = 0,5.\n\n1) Coefficient de P0 : (1 − 0,5)³ = 0,125.\n2) Coefficient de P1 : 3 × 0,25 × 0,5 = 0,375.\n3) x = 0,375 × 60 + 0,375 × 140 + 0,125 × 200 = 100.\n4) y = 0,375 × 80 + 0,375 × 80 = 60.\n5) Le raccord par simple point commun assure la continuité C0.",
        "expected": "0,125 — 0,375 — x = 100 — y = 60 — C0",
        "note": "À t = 0,5, les coefficients se répartissent en 1/8, 3/8, 3/8, 1/8 : la courbe passe par le barycentre pondéré des quatre points de contrôle."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Coefficient de P0",
        "stdin": "q:1",
        "expected": "0,125||0.125||1/8"
      },
      {
        "label": "Question 2 — Coefficient de P1",
        "stdin": "q:2",
        "expected": "0,375||0.375||3/8"
      },
      {
        "label": "Question 3 — Abscisse x de B(0,5)",
        "stdin": "q:3",
        "expected": "80||80 px"
      },
      {
        "label": "Question 4 — Ordonnée y de B(0,5)",
        "stdin": "q:4",
        "expected": "90||90 px"
      },
      {
        "label": "Question 5 — Continuité du raccord",
        "stdin": "q:5",
        "expected": "C0||c0||C 0||continuité C0"
      }
    ],
    "solution": "[Question 1 — Coefficient de P0]\n0,125\n\n[Question 2 — Coefficient de P1]\n0,375\n\n[Question 3 — Abscisse x de B(0,5)]\n80\n\n[Question 4 — Ordonnée y de B(0,5)]\n90\n\n[Question 5 — Continuité du raccord]\nC0",
    "takeaway": "1) (1 − 0,5)³ = 0,5³ = 0,125.\n2) 3 × (1 − 0,5)² × 0,5 = 3 × 0,25 × 0,5 = 0,375.\n3) x = 0,125 × 0 + 0,375 × 40 + 0,375 × 120 + 0,125 × 160 = 15 + 45 + 20 = 80.\n4) y = 0,375 × 120 + 0,375 × 120 + 0,125 × 0 + 0,125 × 0 = 45 + 45 = 90.\n5) Deux courbes qui partagent exactement le même point de jonction sont continues en position : continuité C0 (des tangentes alignées seraient nécessaires pour G1, et de même longueur pour C1).\nContrôle : 0,125 + 0,375 + 0,375 + 0,125 = 1, la pondération est complète."
  },
  {
    "id": "ig2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "L'étalonnage des photos du mariage",
    "exampleTitle": "Exemple résolu — les photos de la sortie à ski",
    "goal": "Diagnostiquer un histogramme de luminance et appliquer une correction de niveaux avec point noir, point blanc et gamma.",
    "brief": "<p><strong>Énoncé.</strong> Yasmine retouche les photos d'un mariage prises dans une salle mal éclairée. Sur la photo principale, l'histogramme de luminance s'étale exactement du niveau <strong>20</strong> au niveau <strong>180</strong> : aucun pixel en dessous de 20, aucun au-dessus de 180. Elle applique la correction de niveaux du cours, avec point noir <code>in_black = 20</code>, point blanc <code>in_white = 180</code> et gamma <code>= 1,0</code> :</p><p><code>val_norm = (pixel − in_black) / (in_white − in_black)</code> puis <code>pixel_final = arrondi(val_norm × 255)</code>.</p><p>Avec un gamma g, l'étape intermédiaire devient <code>val_gamma = val_norm ^ (1 / g)</code> avant la multiplication par 255. Répondez par le nombre entier seul, sauf la question 1 qui appelle un mot.</p><ol><li>Quel défaut de prise de vue l'histogramme révèle-t-il : sous-exposition ou surexposition ?</li><li>Que devient le pixel de niveau 20 après correction ?</li><li>Que devient le pixel de niveau 84 ?</li><li>Que devient le pixel de niveau 148 ?</li><li>Avec désormais un gamma de 2,0, que devient le pixel de niveau 84 ?</li></ol>",
    "starter": "# Exercice — L'étalonnage des photos du mariage\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 à 5 : nombre entier seul. Question 1 : un mot.\n\n[Question 1 — Diagnostic de l'histogramme]\nA_COMPLETER\n\n[Question 2 — Pixel 20 après correction]\nA_COMPLETER\n\n[Question 3 — Pixel 84 après correction]\nA_COMPLETER\n\n[Question 4 — Pixel 148 après correction]\nA_COMPLETER\n\n[Question 5 — Pixel 84 avec gamma 2,0]\nA_COMPLETER\n",
    "hints": [
      "Un histogramme tassé vers les valeurs basses, sans tons clairs, signale une sous-exposition ; tassé à droite, une surexposition.",
      "Normalisez d'abord : (pixel − 20) / 160 donne une valeur entre 0 et 1, à multiplier ensuite par 255.",
      "1. L'histogramme culmine à 180 : les tons clairs manquent. 2. Le pixel 20 est le point noir : il part à 0. 3. (84 − 20) / 160 = 0,4, puis 0,4 × 255 = 102. 4. (148 − 20) / 160 = 0,8, puis 0,8 × 255 = 204. 5. Gamma 2 : 0,4 ^ (1/2) = 0,632, puis × 255 = 161."
    ],
    "examples": [
      {
        "stdin": "Les photos d'une sortie à ski sont surexposées : l'histogramme s'étale du niveau 60 au niveau 240.\nCorrection avec in_black = 60, in_white = 240, gamma 1,0.\n\n1) Histogramme saturé à droite : surexposition.\n2) Le pixel 60 part à 0.\n3) Le pixel 150 : (150 − 60) / 180 = 0,5, puis 0,5 × 255 = 127,5, arrondi à 128.\n4) Le pixel 195 : 135 / 180 = 0,75, puis 0,75 × 255 = 191.\n5) Avec gamma 2,0, le pixel 150 : 0,5 ^ 0,5 = 0,707, puis × 255 = 180.",
        "expected": "surexposition — 0 — 128 — 191 — 180 avec gamma 2",
        "note": "L'étirement du point noir au point blanc rétablit le contraste ; un gamma supérieur à 1 éclaircit ensuite les tons moyens (0,5 devient 0,707)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Diagnostic de l'histogramme",
        "stdin": "q:1",
        "expected": "sous-exposition||sous-exposée||sous-exposee||sous exposition"
      },
      {
        "label": "Question 2 — Pixel 20 après correction",
        "stdin": "q:2",
        "expected": "0"
      },
      {
        "label": "Question 3 — Pixel 84 après correction",
        "stdin": "q:3",
        "expected": "102"
      },
      {
        "label": "Question 4 — Pixel 148 après correction",
        "stdin": "q:4",
        "expected": "204"
      },
      {
        "label": "Question 5 — Pixel 84 avec gamma 2,0",
        "stdin": "q:5",
        "expected": "161"
      }
    ],
    "solution": "[Question 1 — Diagnostic de l'histogramme]\nsous-exposition\n\n[Question 2 — Pixel 20 après correction]\n0\n\n[Question 3 — Pixel 84 après correction]\n102\n\n[Question 4 — Pixel 148 après correction]\n204\n\n[Question 5 — Pixel 84 avec gamma 2,0]\n161",
    "takeaway": "1) L'histogramme commence à 20 et culmine à 180 : les tons clairs manquent, la photo est sous-exposée.\n2) Le pixel 20 est le point noir : val_norm = 0, donc pixel final 0.\n3) (84 − 20) / 160 = 64 / 160 = 0,4 ; 0,4 × 255 = 102.\n4) (148 − 20) / 160 = 128 / 160 = 0,8 ; 0,8 × 255 = 204.\n5) Gamma 2,0 : val_norm = 0,4 ; 0,4 ^ (1/2) = 0,632 ; 0,632 × 255 = 161,28, arrondi à 161. Le gamma éclaircit les tons moyens.\nContrôle : les bornes 20 → 0 et 180 → 255 encadrent bien 84 → 102 et 148 → 204."
  }
];
