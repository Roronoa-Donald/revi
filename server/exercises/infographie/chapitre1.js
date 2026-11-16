'use strict';

module.exports = [
  {
    "id": "ig2-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "La charte graphique de la Brasserie du Vieux Port",
    "exampleTitle": "Exemple résolu — la charte de la pâtisserie Le Sucré d'Or",
    "goal": "Convertir des couleurs entre codages hexadécimal et RVB, et distinguer synthèse additive (écran) et soustractive (impression).",
    "brief": "<p><strong>Énoncé.</strong> Lucie, graphiste freelance, conçoit l'identité visuelle de la <strong>Brasserie du Vieux Port</strong>. Dans son logiciel de PAO, chaque couleur se définit soit par un triplet RVB 8 bits (trois canaux de 0 à 255), soit par un code hexadécimal à six chiffres <code>#RRVVBB</code>. La couleur signature est un rouge brique codé <code>#D42A1E</code>, la couleur secondaire un bleu nuit codé <code>#1E2AD4</code>, et un vert bouteille défini en RVB <code>(26, 94, 48)</code> servira pour les emballages. La charte sera diffusée sur le site web de la brasserie, puis imprimée en quadrichromie par l'imprimeur local.</p><p>Rappel : en hexadécimal, les chiffres vont de 0 à 9, puis A = 10, B = 11, C = 12, D = 13, E = 14, F = 15 ; chaque canal occupe deux chiffres, le premier comptant pour 16.</p><p>Pour la question 1, écrivez le triplet au format 212, 42, 30 ; pour la question 2, le code au format #1A5E30 ; les questions 4 à 6 appellent un mot exact.</p><ol><li>Donnez le triplet RVB du rouge brique #D42A1E.</li><li>Donnez le code hexadécimal du vert bouteille RVB (26, 94, 48).</li><li>Combien de nuances distinctes chaque canal peut-il coder sur 8 bits ?</li><li>Sur l'écran du site, le mélange additif du rouge et du vert à intensité maximale (bleu éteint) produit quelle couleur ?</li><li>Quel modèle de synthèse l'imprimeur utilise-t-il pour la quadrichromie (réponse attendue : le nom du modèle en quatre lettres) ?</li><li>Quelle est la couleur complémentaire du rouge, c'est-à-dire l'encre qui absorbe précisément la lumière rouge ?</li></ol>",
    "starter": "# Exercice — La charte graphique de la Brasserie du Vieux Port\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : triplet au format 212, 42, 30. Question 2 : code au format #1A5E30.\n\n[Question 1 — Triplet RVB du rouge brique #D42A1E]\nA_COMPLETER\n\n[Question 2 — Code hexadécimal du vert bouteille (26, 94, 48)]\nA_COMPLETER\n\n[Question 3 — Nuances par canal en 8 bits]\nA_COMPLETER\n\n[Question 4 — Couleur du mélange additif rouge + vert]\nA_COMPLETER\n\n[Question 5 — Modèle de synthèse utilisé par l'imprimeur]\nA_COMPLETER\n\n[Question 6 — Couleur complémentaire du rouge]\nA_COMPLETER\n",
    "hints": [
      "En hexadécimal, chaque canal s'écrit sur deux chiffres : le premier vaut 16 unités, le second une seule. Ainsi D4 = 13 × 16 + 4 = 212.",
      "Pour convertir un canal vers l'hexadécimal, divisez-le par 16 : le quotient donne le premier chiffre et le reste le second (94 = 5 × 16 + 14, et 14 s'écrit E).",
      "Un canal 8 bits stocke 2 puissance 8 valeurs. Sur écran, les lumières s'additionnent (rouge + vert = jaune) ; sur papier, les encres soustraient (le cyan absorbe le rouge)."
    ],
    "examples": [
      {
        "stdin": "La pâtisserie Le Sucré d'Or choisit sa charte : un orange safran #FF8C00 et un violet RVB (128, 0, 255), à imprimer en quadrichromie.\n\n1) #FF8C00 : FF = 255, 8C = 140, 00 = 0, donc RVB (255, 140, 0).\n2) Le violet (128, 0, 255) s'écrit #8000FF : 128 = 8 × 16, soit 80 en hexadécimal.\n3) Chaque canal 8 bits code 256 nuances, de 0 à 255.\n4) Rouge + bleu à fond sur écran : magenta.\n5) L'imprimeur travaille en CMJN, synthèse soustractive.\n6) Le complémentaire du jaune est le bleu : l'encre jaune absorbe la lumière bleue.",
        "expected": "(255, 140, 0) — #8000FF — 256 nuances — magenta — CMJN — le bleu",
        "note": "Le code hexadécimal n'est qu'une autre écriture du RVB : deux chiffres par canal, le premier comptant les seizaines."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Triplet RVB du rouge brique #D42A1E",
        "stdin": "q:1",
        "expected": "212, 42, 30||(212, 42, 30)||212 42 30||(212,42,30)||212 ; 42 ; 30"
      },
      {
        "label": "Question 2 — Code hexadécimal du vert bouteille (26, 94, 48)",
        "stdin": "q:2",
        "expected": "#1A5E30||#1a5e30||1A5E30"
      },
      {
        "label": "Question 3 — Nuances par canal en 8 bits",
        "stdin": "q:3",
        "expected": "256||256 nuances"
      },
      {
        "label": "Question 4 — Couleur du mélange additif rouge + vert",
        "stdin": "q:4",
        "expected": "jaune||le jaune"
      },
      {
        "label": "Question 5 — Modèle de synthèse utilisé par l'imprimeur",
        "stdin": "q:5",
        "expected": "CMJN||cmjn||le CMJN"
      },
      {
        "label": "Question 6 — Couleur complémentaire du rouge",
        "stdin": "q:6",
        "expected": "cyan||le cyan"
      }
    ],
    "solution": "[Question 1 — Triplet RVB du rouge brique #D42A1E]\n212, 42, 30\n\n[Question 2 — Code hexadécimal du vert bouteille (26, 94, 48)]\n1A5E30\n\n[Question 3 — Nuances par canal en 8 bits]\n256\n\n[Question 4 — Couleur du mélange additif rouge + vert]\njaune\n\n[Question 5 — Modèle de synthèse utilisé par l'imprimeur]\nCMJN\n\n[Question 6 — Couleur complémentaire du rouge]\ncyan",
    "takeaway": "1) #D42A1E : D4 = 13 × 16 + 4 = 212 ; 2A = 2 × 16 + 10 = 42 ; 1E = 1 × 16 + 14 = 30. Le rouge brique est RVB (212, 42, 30).\n2) Le vert bouteille : 26 = 1 × 16 + 10, soit 1A ; 94 = 5 × 16 + 14, soit 5E ; 48 = 3 × 16 + 0, soit 30. Code : #1A5E30.\n3) Un canal 8 bits code 2^8 = 256 nuances, de 0 à 255.\n4) Rouge (255) et vert (255) à intensité maximale, bleu éteint : la synthèse additive produit du jaune.\n5) L'impression offset utilise le modèle CMJN, en synthèse soustractive : les encres absorbent la lumière du papier blanc.\n6) L'encre cyan absorbe précisément la lumière rouge : le cyan est la complémentaire du rouge.\nContrôle : le bleu nuit #1E2AD4 se décode en (30, 42, 212), exactement symétrique du rouge brique (212, 42, 30)."
  },
  {
    "id": "ig2-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "L'affiche A4 du Festival des Lumières",
    "exampleTitle": "Exemple résolu — la carte postale du parc animalier",
    "goal": "Calculer les dimensions en pixels d'un document d'après son format physique et sa résolution d'impression, puis estimer son poids brut.",
    "brief": "<p><strong>Énoncé.</strong> Marc met en page l'affiche du <strong>Festival des Lumières</strong> pour impression offset. Le format commandé est l'<strong>A4 : 21 cm de large sur 29,7 cm de haut</strong>, et l'imprimeur exige une résolution de <strong>300 dpi</strong> (300 pixels par pouce), avec 1 pouce = 2,54 cm exactement.</p><p>Rappels de calcul : dimension en pixels = dimension en cm / 2,54 × dpi, arrondie à l'entier le plus proche ; poids brut = largeur × hauteur × octets par pixel, avec 3 octets par pixel en RVB 24 bits et 4 octets par pixel en CMJN 32 bits ; 1 Mo = 1024 × 1024 octets.</p><p>Répondez aux questions 1, 2 et 5 par le nombre entier de pixels ; aux questions 3 et 4 par le poids en mégaoctets arrondi à deux décimales.</p><ol><li>Quelle largeur en pixels Marc doit-il préparer pour l'affiche ?</li><li>Quelle hauteur en pixels ?</li><li>Quel est le poids brut de l'affiche en RVB 24 bits, en mégaoctets ?</li><li>Le fichier part chez l'imprimeur en CMJN 32 bits : quel est son nouveau poids brut, en mégaoctets ?</li><li>Pour un affichage extérieur vu de loin, l'imprimeur accepte 150 dpi : quelle largeur en pixels suffit alors pour les 21 cm ?</li></ol>",
    "starter": "# Exercice — L'affiche A4 du Festival des Lumières\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 5 : nombre entier de pixels. Questions 3 et 4 : mégaoctets à deux décimales.\n\n[Question 1 — Largeur en pixels à 300 dpi]\nA_COMPLETER\n\n[Question 2 — Hauteur en pixels à 300 dpi]\nA_COMPLETER\n\n[Question 3 — Poids brut RVB 24 bits (en Mo)]\nA_COMPLETER\n\n[Question 4 — Poids brut CMJN 32 bits (en Mo)]\nA_COMPLETER\n\n[Question 5 — Largeur en pixels à 150 dpi]\nA_COMPLETER\n",
    "hints": [
      "Un pouce vaut 2,54 cm : le nombre de pixels s'obtient en divisant la dimension en cm par 2,54, puis en multipliant par la résolution.",
      "Le poids brut multiplie largeur × hauteur × octets par pixel (3 en RVB, 4 en CMJN) ; divisez ensuite par 1024 × 1024 pour des mégaoctets.",
      "1. L = 21 / 2,54 × 300. 2. H = 29,7 / 2,54 × 300. 3. L × H × 3 / 1 048 576. 4. L × H × 4 / 1 048 576. 5. Refaites le calcul de la question 1 avec 150 dpi."
    ],
    "examples": [
      {
        "stdin": "Le parc animalier fait imprimer une carte postale de 15 cm × 10 cm à 300 dpi.\n\n1) Largeur : 10 / 2,54 × 300 = 1181,1, soit 1181 px.\n2) Hauteur : 15 / 2,54 × 300 = 1771,7, soit 1772 px.\n3) Poids RVB 24 bits : 1181 × 1772 × 3 = 6 278 196 octets, soit 5,99 Mo.\n4) Poids CMJN 32 bits : 1181 × 1772 × 4 = 8 370 928 octets, soit 7,98 Mo.\n5) À 150 dpi, la largeur devient 10 / 2,54 × 150 = 590,5, soit 591 px.",
        "expected": "1181 × 1772 px — 5,99 Mo en RVB — 7,98 Mo en CMJN — 591 px de large à 150 dpi",
        "note": "Diviser la résolution par deux divise le nombre de pixels par deux dans chaque dimension : le poids brut, proportionnel au nombre de pixels, tombe au quart."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Largeur en pixels à 300 dpi",
        "stdin": "q:1",
        "expected": "2480||2480 px"
      },
      {
        "label": "Question 2 — Hauteur en pixels à 300 dpi",
        "stdin": "q:2",
        "expected": "3508||3508 px"
      },
      {
        "label": "Question 3 — Poids brut RVB 24 bits (en Mo)",
        "stdin": "q:3",
        "expected": "24,89||24.89||24,89 Mo||24.89 Mo"
      },
      {
        "label": "Question 4 — Poids brut CMJN 32 bits (en Mo)",
        "stdin": "q:4",
        "expected": "33,19||33.19||33,19 Mo||33.19 Mo"
      },
      {
        "label": "Question 5 — Largeur en pixels à 150 dpi",
        "stdin": "q:5",
        "expected": "1240||1240 px"
      }
    ],
    "solution": "[Question 1 — Largeur en pixels à 300 dpi]\n2480\n\n[Question 2 — Hauteur en pixels à 300 dpi]\n3508\n\n[Question 3 — Poids brut RVB 24 bits (en Mo)]\n24,89\n\n[Question 4 — Poids brut CMJN 32 bits (en Mo)]\n33,19\n\n[Question 5 — Largeur en pixels à 150 dpi]\n1240",
    "takeaway": "1) Largeur : 21 / 2,54 × 300 = 2480,31, soit 2480 px.\n2) Hauteur : 29,7 / 2,54 × 300 = 3507,87, soit 3508 px.\n3) Poids RVB : 2480 × 3508 = 8 699 840 pixels ; × 3 octets = 26 099 520 octets ; / 1 048 576 = 24,89 Mo.\n4) Poids CMJN : 8 699 840 × 4 = 34 799 360 octets, soit 33,19 Mo.\n5) À 150 dpi : 21 / 2,54 × 150 = 1240,16, soit 1240 px, exactement la moitié de la question 1.\nContrôle : 24,89 × 4 / 3 = 33,19 : passer de 3 à 4 octets par pixel alourdit le fichier d'un tiers."
  },
  {
    "id": "ig2-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Les formats d'images du site du traiteur Marcel",
    "exampleTitle": "Exemple résolu — les formats du site du musée du Verre",
    "goal": "Choisir le format d'image adapté (SVG, PNG, JPEG, WebP) à chaque visuel d'un projet web selon sa nature et ses contraintes.",
    "brief": "<p><strong>Énoncé.</strong> L'agence web Intégrale prépare le site vitrine du <strong>traiteur Marcel</strong>. La chargée de projet recense les visuels à livrer :</p><table><tr><th>Visuel</th><th>Nature</th><th>Contrainte</th></tr><tr><th>Logo du traiteur</th><td>Tracé vectoriel (courbes de Bézier) fourni par le client</td><td>À décliner de la favicon 16 px jusqu'à la bâche de 4 m</td></tr><tr><th>Photo du buffet</th><td>Photographie gros plan, dégradés fins</td><td>Aucune zone transparente</td></tr><tr><th>Bandeau décoratif</th><td>Illustration en aplats géométriques</td><td>Détouré, posé sur des photos : fond transparent indispensable</td></tr><tr><th>Galerie photos</th><td>Dizaines de photographies</td><td>Temps de chargement de la page à minimiser</td></tr></table><p>Répondez par le nom exact du format (en majuscules), sauf la question 4 qui appelle trois mots.</p><ol><li>Quel format la chargée de projet retient-elle pour le logo ?</li><li>Quel format pour la photo du buffet ?</li><li>Quel format pour le bandeau décoratif transparent ?</li><li>Quel type de compression le format de la question 3 applique-t-il aux données ?</li><li>Quel format moderne, plus léger que le JPEG et géré par tous les navigateurs récents, peut-elle proposer pour la galerie ?</li></ol>",
    "starter": "# Exercice — Les formats d'images du site du traiteur Marcel\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 et 5 : nom du format en majuscules. Question 4 : trois mots.\n\n[Question 1 — Format du logo]\nA_COMPLETER\n\n[Question 2 — Format de la photo du buffet]\nA_COMPLETER\n\n[Question 3 — Format du bandeau transparent]\nA_COMPLETER\n\n[Question 4 — Type de compression de ce format]\nA_COMPLETER\n\n[Question 5 — Format moderne pour la galerie]\nA_COMPLETER\n",
    "hints": [
      "Classez chaque visuel par sa nature : tracé mathématique, photographie, ou illustration plate avec transparence.",
      "Le JPEG ne gère ni la transparence ni la compression sans perte ; le PNG offre un canal alpha sans perte ; le SVG décrit des formes redimensionnables sans pixellisation.",
      "1. Logo déclinable du pixel au mètre : SVG. 2. Photo sans transparence : JPEG. 3. Illustration détourée : PNG. 4. Le PNG compresse sans perte (Deflate). 5. L'alternative moderne au JPEG : WebP."
    ],
    "examples": [
      {
        "stdin": "Le musée du Verre prépare son site : pictogrammes vectoriels, photo d'oeuvre sans transparence et capture d'interface détourée sur fond transparent.\n\n1) Pictogrammes : SVG, vectoriel et net à toutes les tailles.\n2) Photo d'oeuvre : JPEG, compression avec perte adaptée aux dégradés.\n3) Capture détourée : PNG, canal alpha sans perte.\n4) Le PNG compresse sans perte.\n5) Pour alléger la galerie, le musée retient WebP.",
        "expected": "SVG — JPEG — PNG — sans perte — WebP",
        "note": "Le JPEG n'offre ni canal alpha ni compression sans perte : tout visuel transparent ou géométrique part en PNG ou en SVG, la photographie seule part en JPEG."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Format du logo",
        "stdin": "q:1",
        "expected": "SVG||svg"
      },
      {
        "label": "Question 2 — Format de la photo du buffet",
        "stdin": "q:2",
        "expected": "JPEG||JPG||jpeg||jpg"
      },
      {
        "label": "Question 3 — Format du bandeau transparent",
        "stdin": "q:3",
        "expected": "PNG||png"
      },
      {
        "label": "Question 4 — Type de compression de ce format",
        "stdin": "q:4",
        "expected": "sans perte||sans-perte||lossless||compression sans perte"
      },
      {
        "label": "Question 5 — Format moderne pour la galerie",
        "stdin": "q:5",
        "expected": "WebP||WEBP||webp"
      }
    ],
    "solution": "[Question 1 — Format du logo]\nSVG\n\n[Question 2 — Format de la photo du buffet]\nJPEG\n\n[Question 3 — Format du bandeau transparent]\nPNG\n\n[Question 4 — Type de compression de ce format]\nsans perte\n\n[Question 5 — Format moderne pour la galerie]\nWebP",
    "takeaway": "1) Le logo doit rester net de la favicon 16 px à la bâche de 4 m : seul le vectoriel SVG le garantit, car il est décrit par des équations indépendantes de la résolution.\n2) La photo du buffet, riche en dégradés et sans transparence, relève du JPEG, compression avec perte conçue pour la photographie.\n3) Le bandeau détouré exige un canal alpha et des aplats nets : le PNG, sans perte, s'impose.\n4) Le PNG applique une compression sans perte (Deflate/LZ77) : aucun pixel n'est altéré.\n5) Le WebP, géré par tous les navigateurs récents, offre des fichiers 25 à 35 % plus légers que le JPEG : idéal pour la galerie.\nContrôle : chaque visuel part vers le seul format qui satisfait à la fois sa nature (vectoriel, photo, aplat) et ses contraintes (transparence, poids)."
  }
];
