'use strict';

module.exports = [
  {
    "id": "ro2-c1-e1",
    "chapter": 1,
    "title": "Évaluation d'un plan de production : variables, non-négativité & calcul de Z",
    "level": "n1",
    "language": "analyse",
    "goal": "Distinguer coefficients et variables, vérifier la non-négativité (x_j ≥ 0) et évaluer la fonction objectif Z sur un plan candidat.",
    "brief": "<p>En programmation linéaire, il est crucial de distinguer :</p><ul><li>les <strong>coefficients économiques</strong> $c_1, c_2$ (marges unitaires fixes en MAX ou coûts unitaires en MIN) ;</li><li>les <strong>variables de décision</strong> $x_1, x_2$ (quantités physiques choisies par le décideur) ;</li><li>la <strong>valeur de la fonction objectif</strong> $Z = c_1 x_1 + c_2 x_2$ calculée pour un plan candidat donné ;</li><li>l’<strong>optimum</strong> (meilleur $Z$ parmi tous les plans réalisables), dont la recherche constitue une tâche algorithmique distincte.</li></ul><p><strong>Règle de non-négativité :</strong> toute variable de décision physique doit vérifier $x_j \\ge 0$. Une variable nulle ($x_j = 0$) est parfaitement valide (l’activité correspondante n’est pas mise en œuvre). En revanche, si une variable est strictement négative ($x_1 < 0$ ou $x_2 < 0$), le plan est irréalisable : indiquez <code>NON_VALIDE VIOLATION_SIGNE</code>.<br>Sinon, calculez $Z$ et indiquez : <code>VALIDE Z=&lt;valeur&gt;</code> (ex : <code>VALIDE Z=140</code>).</p>",
    "starter": "# Grille d'analyse (ro2-c1-e1) — Validation de fonction objectif & positivité\n# Complétez la résolution mathématique sous chaque cas ci-dessous :\n\n[Cas 1 — Maximisation valide]\n# Modèle : MAX Z = 25·x1 + 30·x2\n# Plan candidat : x1 = 2, x2 = 3\nA_COMPLETER\n\n[Cas 2 — Minimisation avec variable nulle]\n# Modèle : MIN Z = 10·x1 + 8·x2\n# Plan candidat : x1 = 0, x2 = 7\nA_COMPLETER\n\n[Cas 3 — Violation de non-négativité sur x1]\n# Modèle : MAX Z = 15·x1 + 20·x2\n# Plan candidat : x1 = -2, x2 = 5\nA_COMPLETER\n",
    "hints": [
      "Vérifiez d'abord si x1 >= 0 et x2 >= 0. En programmation linéaire, une quantité physique négative est absurde ; en revanche, une variable nulle est tout à fait autorisée.",
      "Si les deux variables sont valides, calculez Z = c1*x1 + c2*x2 (l'orientation MAX ou MIN n'altère pas le calcul arithmétique de la fonction, elle indique seulement le sens d'optimisation). Répondez sous la forme VALIDE Z=<valeur> ou NON_VALIDE VIOLATION_SIGNE."
    ],
    "examples": [
      {
        "stdin": "ex:1",
        "expected": "VALIDE Z=160",
        "note": "Pour MAX Z = 15·x1 + 20·x2 avec (x1=4, x2=5) : x1 >= 0 et x2 >= 0 sont valides. Z = 15*4 + 20*5 = 160. Attention : ce calcul évalue la fonction en ce point mais ne prouve pas son optimalité globale."
      }
    ],
    "tests": [
      {
        "label": "Maximisation valide",
        "stdin": "cas:1",
        "expected": "VALIDE Z=140",
        "hint": "x1=2 et x2=3 sont >= 0. La valeur de Z est 25*2 + 30*3 = 50 + 90 = 140."
      },
      {
        "label": "Minimisation avec variable nulle",
        "stdin": "cas:2",
        "expected": "VALIDE Z=56",
        "hint": "Une variable nulle (x1=0) est valide en PL. La valeur de Z est 10*0 + 8*7 = 56."
      },
      {
        "label": "Violation de non-négativité sur x1",
        "stdin": "cas:3",
        "expected": "NON_VALIDE VIOLATION_SIGNE",
        "hint": "x1 = -2 viole impérativement la contrainte physique de non-négativité (x1 >= 0)."
      }
    ],
    "solution": "[Exemple]\nVALIDE Z=160\n\n[Cas 1 — Maximisation valide]\nVALIDE Z=140\n\n[Cas 2 — Minimisation avec variable nulle]\nVALIDE Z=56\n\n[Cas 3 — Violation de non-négativité sur x1]\nNON_VALIDE VIOLATION_SIGNE\n"
  },
  {
    "id": "ro2-c1-e2",
    "chapter": 1,
    "title": "Faisabilité de contraintes de ressources, marges d'écart & saturation",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier la non-négativité préalable, calculer la consommation et l'écart (slack) pour chaque ressource, et qualifier la saturation ou la violation.",
    "brief": "<p>Une contrainte de ressource limite la consommation globale par rapport à une capacité disponible :<br>$$\\text{Consommation } a_{i1} x_1 + a_{i2} x_2 \\le b_i \\quad (\\text{Capacité disponible})$$</p><p>Pour chaque plan candidat soumis :</p><ol><li><strong>Vérification préalable de non-négativité :</strong> si $x_1 < 0$ ou $x_2 < 0$, le plan est physiquement impossible : indiquez <code>IRREALISABLE VIOLATION_SIGNE</code>.</li><li><strong>Calcul de l'écart (marge résiduelle / slack) :</strong> $s_i = b_i - (a_{i1} x_1 + a_{i2} x_2)$.<ul><li>Si $s_i > 0$ : la ressource dispose d’une marge inemployée de $s_i$ unités ;</li><li>Si $s_i = 0$ : la ressource est <em>exactement saturée</em> (goulot d'étranglement actif) ;</li><li>Si $s_i < 0$ : la capacité est dépassée.</li></ul></li><li><strong>Conclusion :</strong> si $s_1 \\ge 0$ et $s_2 \\ge 0$, indiquez : <code>REALISABLE s1=&lt;s1&gt; s2=&lt;s2&gt;</code>.<br>Sinon, mentionnez les contraintes violées : <code>IRREALISABLE VIOLATION_R1</code>, <code>IRREALISABLE VIOLATION_R2</code> ou <code>IRREALISABLE VIOLATION_R1 VIOLATION_R2</code>.</li></ol>",
    "starter": "# Grille d'analyse (ro2-c1-e2) — Faisabilité de contraintes de ressources & écarts\n# Complétez l'analyse de faisabilité pour chaque cas ci-dessous :\n\n[Cas 1 — Plan réalisable avec marge inemployée]\n# Contraintes : R1: 3·x1 + 1·x2 <= 12 | R2: 1·x1 + 4·x2 <= 14\n# Plan candidat : x1 = 2, x2 = 2\nA_COMPLETER\n\n[Cas 2 — Saturation exacte des deux ressources]\n# Contraintes : R1: 2·x1 + 1·x2 <= 10 | R2: 1·x1 + 2·x2 <= 8\n# Plan candidat : x1 = 4, x2 = 2\nA_COMPLETER\n\n[Cas 3 — Dépassement de capacité sur la ressource R1]\n# Contraintes : R1: 2·x1 + 1·x2 <= 10 | R2: 1·x1 + 2·x2 <= 12\n# Plan candidat : x1 = 5, x2 = 2\nA_COMPLETER\n",
    "hints": [
      "L'écart s_i = b_i - consommation mesure la marge restante. Si s_i >= 0, la contrainte est respectée. Un écart nul (s_i = 0) indique une saturation parfaite.",
      "Vérifiez d'abord x1 >= 0 et x2 >= 0. Calculez ensuite s1 = b1 - (a11*x1 + a12*x2) et s2 = b2 - (a21*x1 + a22*x2). Si les deux écarts sont >= 0, répondez REALISABLE s1=<s1> s2=<s2>. Sinon, indiquez quelle contrainte est violée."
    ],
    "examples": [
      {
        "stdin": "ex:1",
        "expected": "REALISABLE s1=2 s2=1",
        "note": "Pour (x1=3, x2=2) avec R1: 2·x1 + 1·x2 <= 10 et R2: 1·x1 + 2·x2 <= 8 : Conso R1 = 8 <= 10 (s1=2). Conso R2 = 7 <= 8 (s2=1). Les deux ressources ont une marge résiduelle positive."
      }
    ],
    "tests": [
      {
        "label": "Plan réalisable avec marge inemployée",
        "stdin": "cas:1",
        "expected": "REALISABLE s1=4 s2=4",
        "hint": "R1: 3(2)+1(2)=8 <= 12 (s1=4). R2: 1(2)+4(2)=10 <= 14 (s2=4). Les deux écarts valent 4."
      },
      {
        "label": "Saturation exacte des deux ressources",
        "stdin": "cas:2",
        "expected": "REALISABLE s1=0 s2=0",
        "hint": "R1: 2(4)+1(2)=10=10 (s1=0). R2: 1(4)+2(2)=8=8 (s2=0). Les deux contraintes sont saturées exactement."
      },
      {
        "label": "Dépassement de capacité sur la ressource R1",
        "stdin": "cas:3",
        "expected": "IRREALISABLE VIOLATION_R1",
        "hint": "R1: 2(5)+1(2)=12 > 10 (dépassement de 2 unités, s1=-2). Seule R1 est violée car R2 consomme 9 <= 12."
      }
    ],
    "solution": "[Exemple]\nREALISABLE s1=2 s2=1\n\n[Cas 1 — Plan réalisable avec marge inemployée]\nREALISABLE s1=4 s2=4\n\n[Cas 2 — Saturation exacte des deux ressources]\nREALISABLE s1=0 s2=0\n\n[Cas 3 — Dépassement de capacité sur la ressource R1]\nIRREALISABLE VIOLATION_R1\n"
  },
  {
    "id": "ro2-c1-e3",
    "chapter": 1,
    "title": "Sélection de mélange parmi des plans candidats & arbitrage de coût minimal",
    "level": "n3",
    "language": "analyse",
    "goal": "Filtrer les candidats satisfaisant les exigences minimales (≥), justifier le rejet des non conformes et sélectionner le mélange réalisable de coût minimal.",
    "brief": "<p>Dans un problème de mélange (<em>blending</em>), on cherche à minimiser le coût sous des exigences nutritionnelles ou qualitatives minimales :<br>$$\\text{MIN } C = c_1 x_1 + c_2 x_2 \\quad \\text{sous } a_{11} x_1 + a_{12} x_2 \\ge b_1, \\quad a_{21} x_1 + a_{22} x_2 \\ge b_2, \\quad x_1, x_2 \\ge 0$$</p><div class=\"box box--info\"><div class=\"box__title\">Précision méthodologique</div><p>Cet exercice compare un <strong>échantillon fini de mélanges candidats</strong>. Sélectionner le moins cher parmi cette liste ne prouve pas son optimalité continue globale : la recherche de l’optimum universel requiert le Simplexe (chapitre 3).</p></div><p>Pour chaque cas :</p><ol><li>Vérifiez la non-négativité puis les deux exigences minimales ($R_1 \\ge b_1$ et $R_2 \\ge b_2$) pour chaque candidat. Tout candidat violant au moins une exigence est éliminé.</li><li>Calculez le coût $C = c_1 x_1 + c_2 x_2$ des candidats réalisables.</li><li>Retenez le meilleur candidat : <code>MEILLEUR: x1=&lt;x1&gt; x2=&lt;x2&gt; COUT=&lt;C&gt;</code>.<br>Si aucun candidat n’est réalisable, indiquez : <code>AUCUN_REALISABLE</code>.<br><em>Règle de départage :</em> en cas d'égalité stricte de coût minimal entre candidats réalisables, retenez celui avec le plus petit $x_1$.</li></ol>",
    "starter": "# Grille d'analyse (ro2-c1-e3) — Arbitrage de mélange de coût minimal (Blending)\n# Analysez les mélanges candidats et retenez le meilleur plan réalisable :\n\n[Cas 1 — Trois candidats avec un vainqueur économique net]\n# Coûts : c1 = 5 €/kg, c2 = 8 €/kg (MIN C = 5·x1 + 8·x2)\n# Exigences : R1: 1·x1 + 2·x2 >= 20 | R2: 2·x1 + 1·x2 >= 15\n# Candidats soumis : A(10, 6), B(8, 5), C(12, 4)\nA_COMPLETER\n\n[Cas 2 — Candidats dont certains violent les seuils minimaux]\n# Coûts : c1 = 3 €/kg, c2 = 2 €/kg (MIN C = 3·x1 + 2·x2)\n# Exigences : R1: 2·x1 + 1·x2 >= 10 | R2: 1·x1 + 3·x2 >= 12\n# Candidats soumis : A(2, 2), B(4, 3), C(1, 1)\nA_COMPLETER\n\n[Cas 3 — Aucun candidat ne satisfait l'ensemble des exigences]\n# Coûts : c1 = 10 €/kg, c2 = 15 €/kg (MIN C = 10·x1 + 15·x2)\n# Exigences : R1: 2·x1 + 3·x2 >= 50 | R2: 3·x1 + 1·x2 >= 40\n# Candidats soumis : A(5, 5), B(10, 2), C(2, 8)\nA_COMPLETER\n",
    "hints": [
      "Ne comparez jamais les coûts avant d'avoir validé la faisabilité ! Un candidat très peu coûteux mais qui ne respecte pas les teneurs minimales requises est impérativement disqualifié.",
      "Testez chaque point (x1, x2) sur les deux inéquations >=. Dans le cas 1, B est éliminé car 1*8 + 2*5 = 18 < 20. Comparez le coût C = c1*x1 + c2*x2 entre les candidats restants et sélectionnez le minimum."
    ],
    "examples": [
      {
        "stdin": "ex:1",
        "expected": "MEILLEUR: x1=25 x2=10 COUT=160",
        "note": "Pour c1=4, c2=6 avec exigences (0.2x1+0.5x2 >= 10, 0.4x1+0.2x2 >= 12) : (25, 10) est réalisable et coûte 160, plus économique que (20, 15) à 170. Le candidat (10, 20) est irréalisable."
      }
    ],
    "tests": [
      {
        "label": "Trois candidats avec un vainqueur économique net",
        "stdin": "cas:1",
        "expected": "MEILLEUR: x1=12 x2=4 COUT=92",
        "hint": "B(8,5) est irréalisable (R1=18 < 20). A(10,6) est réalisable et coûte 98 €. C(12,4) est réalisable et coûte 92 €. Le meilleur est C."
      },
      {
        "label": "Candidats dont certains violent les seuils minimaux",
        "stdin": "cas:2",
        "expected": "MEILLEUR: x1=4 x2=3 COUT=18",
        "hint": "A(2,2) et C(1,1) violent R1 (2*x1+1*x2 < 10). Seul B(4,3) est réalisable avec un coût de 3*4 + 2*3 = 18 €."
      },
      {
        "label": "Aucun candidat ne satisfait l'ensemble des exigences",
        "stdin": "cas:3",
        "expected": "AUCUN_REALISABLE",
        "hint": "A(5,5) apporte 25 < 50 sur R1. B(10,2) apporte 26 < 50 sur R1. C(2,8) apporte 28 < 50 sur R1. Tous sont éliminés."
      }
    ],
    "solution": "[Exemple]\nMEILLEUR: x1=25 x2=10 COUT=160\n\n[Cas 1 — Trois candidats avec un vainqueur économique net]\nMEILLEUR: x1=12 x2=4 COUT=92\n\n[Cas 2 — Candidats dont certains violent les seuils minimaux]\nMEILLEUR: x1=4 x2=3 COUT=18\n\n[Cas 3 — Aucun candidat ne satisfait l'ensemble des exigences]\nAUCUN_REALISABLE\n"
  },
  {
    "id": "ro2-c1-e4",
    "chapter": 1,
    "title": "Modélisation guidée d'un problème concret & contrainte d'égalité",
    "level": "n2",
    "language": "analyse",
    "goal": "Traduire un énoncé verbal industriel en composantes formelles : fonction objectif, contraintes de ressources, contrainte d'égalité stricte et positivité.",
    "brief": "<p>Une usine assemble deux modèles de panneaux solaires : <strong>Standard ($x_1$, unités/jour)</strong> et <strong>Premium ($x_2$, unités/jour)</strong>.</p><ul><li>Marge unitaire nette : <strong>40 €</strong> par Standard et <strong>70 €</strong> par Premium.</li><li>Cellules photovoltaïques : le modèle Standard consomme <strong>4 cellules</strong> et le Premium <strong>8 cellules</strong>, pour un approvisionnement journalier plafonné à <strong>800 cellules</strong>.</li><li>Contrôle qualité : le Standard requiert <strong>2 minutes</strong> de banc de test et le Premium <strong>3 minutes</strong>, avec une capacité maximale d’atelier de <strong>360 minutes/jour</strong>.</li><li><strong>Engagement contractuel strict (contrainte d'égalité) :</strong> un contrat ferme impose de livrer <em>exactement</em> <strong>50 panneaux Standard</strong> par jour ($x_1 = 50$). Une contrainte d’égalité traduit une obligation absolue sans aucune tolérance de sous- ou sur-production.</li></ul><p>Pour chaque cas ci-dessous, écrivez la formule mathématique canonique correspondante.</p>",
    "starter": "# Grille d'analyse (ro2-c1-e4) — Modélisation guidée & contrainte d'égalité\n# Formalisez chaque composante demandée à partir de l'énoncé :\n\n[Cas 1 — Définition de la fonction objectif]\n# Énoncé : Maximiser la marge totale quotidienne (Standard: 40 €, Premium: 70 €)\n# Format attendu : MAX Z = 40*x1 + 70*x2\nA_COMPLETER\n\n[Cas 2 — Contrainte de ressource en cellules]\n# Énoncé : 4 cellules par Standard, 8 par Premium, stock disponible <= 800 cellules\n# Format attendu : 4*x1 + 8*x2 <= 800\nA_COMPLETER\n\n[Cas 3 — Contrainte d'engagement contractuel strict]\n# Énoncé : Engagement ferme de livrer exactement 50 panneaux Standard chaque jour\n# Format attendu : x1 = 50\nA_COMPLETER\n",
    "hints": [
      "Identifiez le sens d'optimisation (MAX pour une marge ou profit, MIN pour un coût) et veillez à associer chaque coefficient à la bonne variable de décision.",
      "Pour une limitation de stock ou d'heures, utilisez le symbole <=. Pour un quota ou engagement strict sans dépassement ni déficit, utilisez l'égalité pure (=). Écrivez l'expression sans espaces superflus (ex: 4*x1 + 8*x2 <= 800)."
    ],
    "examples": [
      {
        "stdin": "ex:1",
        "expected": "2*x1 + 3*x2 <= 360",
        "note": "Contrainte de banc d'essai : 2 min par Standard et 3 min par Premium, capacité 360 min. Formule : 2*x1 + 3*x2 <= 360."
      }
    ],
    "tests": [
      {
        "label": "Définition de la fonction objectif",
        "stdin": "cas:1",
        "expected": "MAX Z = 40*x1 + 70*x2",
        "hint": "L'objectif économique est de maximiser la marge : MAX Z = 40*x1 + 70*x2."
      },
      {
        "label": "Contrainte de ressource en cellules",
        "stdin": "cas:2",
        "expected": "4*x1 + 8*x2 <= 800",
        "hint": "Consommation totale 4*x1 + 8*x2 bornée par le plafond disponible : 4*x1 + 8*x2 <= 800."
      },
      {
        "label": "Contrainte d'engagement contractuel strict",
        "stdin": "cas:3",
        "expected": "x1 = 50",
        "hint": "Un engagement contractuel exact sans marge se modélise par une égalité stricte : x1 = 50."
      }
    ],
    "solution": "[Exemple]\n2*x1 + 3*x2 <= 360\n\n[Cas 1 — Définition de la fonction objectif]\nMAX Z = 40*x1 + 70*x2\n\n[Cas 2 — Contrainte de ressource en cellules]\n4*x1 + 8*x2 <= 800\n\n[Cas 3 — Contrainte d'engagement contractuel strict]\nx1 = 50\n"
  },
  {
    "id": "ro2-c1-e5",
    "chapter": 1,
    "title": "Validation des 4 hypothèses fondamentales & typologie des variables",
    "level": "n3",
    "language": "analyse",
    "goal": "Identifier les 4 hypothèses de Dantzig (proportionnalité, additivité, divisibilité, certitude), reconnaître leurs violations et distinguer variables continues et binaires/entières.",
    "brief": "<p>Tout programme linéaire continu repose sur <strong>quatre hypothèses fondamentales</strong> établies par George Dantzig :</p><ul><li><strong>1. Proportionnalité :</strong> la contribution de chaque variable est strictement linéaire ($c_j x_j$ et $a_{ij} x_j$), excluant toute remise sur volume ou coût fixe de lancement.</li><li><strong>2. Additivité :</strong> l’effet global est la somme pure des effets individuels, sans synergie ni interaction croisée ($x_1 \\cdot x_2$ est proscrit).</li><li><strong>3. Divisibilité :</strong> les variables peuvent prendre n'importe quelle valeur réelle positive ($x_j \\in \\mathbb{R}^+$).</li><li><strong>4. Certitude :</strong> l'ensemble des coefficients ($c_j, a_{ij}, b_i$) est connu de manière déterministe et exacte.</li></ul><div class=\"box box--warning\"><div class=\"box__title\">Distinction clé : variables binaires et entières</div><p>Lorsque la divisibilité est rompue (choix binaire d’investissement $x_j \\in \\{0, 1\\}$ ou unités indivisibles $x_j \\in \\mathbb{N}$), le modèle devient un <strong>Programme Linéaire en Nombres Entiers (PLNE / MIP)</strong>. Ce problème est combinatoire et NP-difficile : l’algorithme du simplexe standard continu ne peut pas s'y appliquer directement sans méthode de séparation et évaluation (Branch &amp; Bound).</p></div><p>Pour chaque cas ci-dessous, nommez l’hypothèse violée (PROPORTIONNALITE, ADDITIVITE, DIVISIBILITE, CERTITUDE) ou le type de modèle requis (PLNE).</p>",
    "starter": "# Grille d'analyse (ro2-c1-e5) — 4 hypothèses & nature des variables\n# Identifiez la notion ou l'hypothèse mise en jeu pour chaque situation :\n\n[Cas 1 — Remise sur volume chez le fournisseur de bois]\n# Situation : Le fournisseur accorde 20 % de réduction sur le prix du bois au-delà de 100 m² achetés\n# Hypothèse violée parmi (proportionnalité / additivité / divisibilité / certitude) :\nA_COMPLETER\n\n[Cas 2 — Choix d'ouverture d'un nouvel entrepôt logistique]\n# Situation : Décision binaire « ouvrir (1) ou ne pas ouvrir (0) le site de Lyon »\n# Type de modèle : Programmation continue standard ou Programmation en nombres entiers (PLNE) ?\nA_COMPLETER\n\n[Cas 3 — Fluctuations imprévisibles du coût de l'électricité sur le marché spot]\n# Situation : Le tarif du kWh varie chaque heure selon une loi de probabilité météo\n# Hypothèse violée parmi (proportionnalité / additivité / divisibilité / certitude) :\nA_COMPLETER\n",
    "hints": [
      "Rappelez-vous les définitions : proportionnalité = coût unitaire constant sans palier ; additivité = pas de produit croisé x1*x2 ; divisibilité = grandeurs fractionnaires autorisées ; certitude = coefficients déterministes non aléatoires.",
      "Pour le cas 1, le prix qui diminue avec la quantité viole la proportionnalité. Pour le cas 2, un choix binaire {0, 1} relève de la programmation en nombres entiers (PLNE). Répondez en un mot clé en majuscules."
    ],
    "examples": [
      {
        "stdin": "ex:1",
        "expected": "ADDITIVITE",
        "note": "Deux produits dont le mélange dégage une réaction thermique égale à 3*x1*x2 : le terme non linéaire croisé viole l'hypothèse d'additivité."
      }
    ],
    "tests": [
      {
        "label": "Remise sur volume chez le fournisseur de bois",
        "stdin": "cas:1",
        "expected": "PROPORTIONNALITE",
        "hint": "Un tarif dégressif brise la constance du coefficient unitaire cj et viole l'hypothèse de proportionnalité."
      },
      {
        "label": "Choix d'ouverture d'un nouvel entrepôt logistique",
        "stdin": "cas:2",
        "expected": "PLNE",
        "hint": "Une décision tout-ou-rien {0, 1} est discrète et relève de la Programmation Linéaire en Nombres Entiers (PLNE / MIP)."
      },
      {
        "label": "Fluctuations imprévisibles du coût de l'électricité sur le marché spot",
        "stdin": "cas:3",
        "expected": "CERTITUDE",
        "hint": "L'aléa sur les paramètres relève de l'optimisation stochastique et viole l'hypothèse de certitude déterministe."
      }
    ],
    "solution": "[Exemple]\nADDITIVITE\n\n[Cas 1 — Remise sur volume chez le fournisseur de bois]\nPROPORTIONNALITE\n\n[Cas 2 — Choix d'ouverture d'un nouvel entrepôt logistique]\nPLNE\n\n[Cas 3 — Fluctuations imprévisibles du coût de l'électricité sur le marché spot]\nCERTITUDE\n"
  },
  {
    "id": "ro2-c2-e1",
    "chapter": 2,
    "title": "Conversion en forme standard (Écart & Excès)",
    "level": "n1",
    "language": "analyse",
    "goal": "Transformer une inégalité de contrainte en équation standard par ajout de variable d’écart ou d’excès.",
    "brief": "<p>Pour préparer un programme linéaire à l’algorithme du simplexe, chaque contrainte d’inégalité doit être transformée en égalité avec second membre positif :</p><ul>  <li>Une contrainte $\\le$ reçoit une variable d’écart positive : $a_1 x_1 + a_2 x_2 + s_k = b$ ;</li>  <li>Une contrainte $\\ge$ reçoit une variable d’excès soustraite : $a_1 x_1 + a_2 x_2 - e_k = b$.</li></ul><p>Analysez les paramètres du problème pour chaque cas. <code>1</code>, <code>2</code>) ;<br>- <code>a1,a2</code> sont les coefficients de $x_1$ et $x_2$ ;<br>- <code>SENS</code> vaut <code>LE</code> (pour $\\le$) ou <code>GE</code> (pour $\\ge$) ;<br>- <code>b</code> est le second membre.</p><p>Indiquez l’équation résultante sous la forme canonique :<br>Pour <code>LE</code> : <code>&lt;a1&gt;*x1 + &lt;a2&gt;*x2 + s&lt;num&gt; = &lt;b&gt;</code>.<br>Pour <code>GE</code> : <code>&lt;a1&gt;*x1 + &lt;a2&gt;*x2 - e&lt;num&gt; = &lt;b&gt;</code>.<br>(Les nombres entiers ou flottants conservent leur écriture naturelle).</p>",
    "starter": "# Grille de calcul (ro2-c2-e1) — Conversion en forme standard (Écart & Excès)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Contrainte <= standard]\n# Données : 2;2,5;LE;30\nA_COMPLETER\n\n[Cas 2 — Contrainte >= avec variable d excès]\n# Données : 1;1,3;GE;15\nA_COMPLETER\n\n[Cas 3 — Coefficients décimaux]\n# Données : 3;0.5,1.5;LE;12\nA_COMPLETER\n",
    "hints": [
      "Découpez la ligne par \";\".",
      "Selon que SENS == \"LE\" ou \"GE\", choisis \"+ s{num}\" ou \"- e{num}\"."
    ],
    "examples": [
      {
        "stdin": "1;3,4;LE;24",
        "expected": "3*x1 + 4*x2 + s1 = 24",
        "note": "Contrainte <= transformée avec la variable d’écart s1."
      }
    ],
    "tests": [
      {
        "label": "Contrainte <= standard",
        "stdin": "cas:1",
        "expected": "2*x1 + 5*x2 + s2 = 30"
      },
      {
        "label": "Contrainte >= avec variable d excès",
        "stdin": "cas:2",
        "expected": "1*x1 + 3*x2 - e1 = 15"
      },
      {
        "label": "Coefficients décimaux",
        "stdin": "cas:3",
        "expected": "0.5*x1 + 1.5*x2 + s3 = 12"
      }
    ],
    "solution": "[Exemple]\n3*x1 + 4*x2 + s1 = 24\n\n[Cas 1 — Contrainte <= standard]\n2*x1 + 5*x2 + s2 = 30\n\n[Cas 2 — Contrainte >= avec variable d excès]\n1*x1 + 3*x2 - e1 = 15\n\n[Cas 3 — Coefficients décimaux]\n0.5*x1 + 1.5*x2 + s3 = 12\n"
  },
  {
    "id": "ro2-c2-e2",
    "chapter": 2,
    "title": "Intersection de deux droites par la règle de Cramer",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer le point d’intersection de deux droites de frontière dans le plan.",
    "brief": "<p>Deux droites de contrainte du plan $(x_1, x_2)$ sont données sous forme d’équations :<br>$$a_1 x_1 + b_1 x_2 = c_1 \\quad \\text{et} \\quad a_2 x_1 + b_2 x_2 = c_2$$</p><p>Analysez les paramètres du problème pour chaque cas.<br>Calculez le déterminant du système $\\Delta = a_1 b_2 - a_2 b_1$.<br>Si $|\\Delta| < 10^{-6}$, les droites sont parallèles ou confondues, Indiquez :<br><code>PARALLELES DELTA=0.0</code>.<br>Sinon, applique la règle de Cramer :<br>$$x_1 = \\frac{c_1 b_2 - c_2 b_1}{\\Delta}, \\quad x_2 = \\frac{a_1 c_2 - a_2 c_1}{\\Delta}$$<br>Indiquez : <code>INTERSECTION x1=&lt;x1 à 2 décimales&gt; x2=&lt;x2 à 2 décimales&gt; DELTA=&lt;Delta à 2 décimales&gt;</code>.</p>",
    "starter": "# Grille de calcul (ro2-c2-e2) — Intersection de deux droites par la règle de Cramer\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Intersection nette à coordonnées entières]\n# Données : 3,1,15;1,2,10\nA_COMPLETER\n\n[Cas 2 — Droites parallèles (pentes identiques)]\n# Données : 2,4,12;1,2,9\nA_COMPLETER\n\n[Cas 3 — Intersection avec coordonnées décimales]\n# Données : 2,3,13;4,1,11\nA_COMPLETER\n",
    "hints": [
      "Calculez delta = a1 * b2 - a2 * b1.",
      "Si abs(delta) < 1e-6, affiche le cas des droites parallèles."
    ],
    "examples": [
      {
        "stdin": "2,1,10;1,2,8",
        "expected": "INTERSECTION x1=4.00 x2=2.00 DELTA=3.00",
        "note": "Delta = 2*2 - 1*1 = 3. x1 = (10*2 - 8*1)/3 = 4. x2 = (2*8 - 1*10)/3 = 2."
      }
    ],
    "tests": [
      {
        "label": "Intersection nette à coordonnées entières",
        "stdin": "cas:1",
        "expected": "INTERSECTION x1=4.00 x2=3.00 DELTA=5.00"
      },
      {
        "label": "Droites parallèles (pentes identiques)",
        "stdin": "cas:2",
        "expected": "PARALLELES DELTA=0.0"
      },
      {
        "label": "Intersection avec coordonnées décimales",
        "stdin": "cas:3",
        "expected": "INTERSECTION x1=2.00 x2=3.00 DELTA=-10.00"
      }
    ],
    "solution": "[Exemple]\nINTERSECTION x1=4.00 x2=2.00 DELTA=3.00\n\n[Cas 1 — Intersection nette à coordonnées entières]\nINTERSECTION x1=4.00 x2=3.00 DELTA=5.00\n\n[Cas 2 — Droites parallèles (pentes identiques)]\nPARALLELES DELTA=0.0\n\n[Cas 3 — Intersection avec coordonnées décimales]\nINTERSECTION x1=2.00 x2=3.00 DELTA=-10.00\n"
  },
  {
    "id": "ro2-c2-e3",
    "chapter": 2,
    "title": "Résolution graphique par évaluation des sommets",
    "level": "n3",
    "language": "analyse",
    "goal": "Identifier le sommet optimal maximisant la fonction objectif dans la région réalisable.",
    "brief": "<p>D’après le théorème fondamental de la programmation linéaire, si un programme linéaire admet une solution optimale finie, au moins un des <strong>sommets du polyèdre réalisable</strong> est optimal.</p><p>Analysez les paramètres du problème pour chaque cas...</code> contenant :</p><ul>  <li>Les coefficients de la fonction objectif MAX $Z = c_1 x_1 + c_2 x_2$ ;</li>  <li>Les contraintes $a_{i1} x_1 + a_{i2} x_2 \\le b_i$ séparées par <code>|</code> ;</li>  <li>Une liste de sommets candidats $(x_1, x_2)$ séparés par <code>|</code>.</li></ul><p>Filtrez les sommets réalisables (vérifiant $x_1 \\ge 0$, $x_2 \\ge 0$ et toutes les contraintes $\\le$).<br>Sélectionne le sommet réalisable qui maximise $Z$ et Indiquez :<br><code>OPTIMUM: (x1=&lt;x1&gt;, x2=&lt;x2&gt;) Z=&lt;Z max à 1 décimale&gt;</code>.<br>Si aucun sommet n’est réalisable, Indiquez : <code>REGION_VIDE</code>.</p>",
    "starter": "# Grille de calcul (ro2-c2-e3) — Résolution graphique par évaluation des sommets\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Quatre sommets avec optimum intérieur]\n# Données : 4,3;1,1,8|2,1,12;0,0|6,0|0,8|4,4\nA_COMPLETER\n\n[Cas 2 — Optimum situé sur un axe]\n# Données : 10,2;1,1,5|3,1,9;0,0|3,0|0,5|2,3\nA_COMPLETER\n\n[Cas 3 — Tous les sommets proposés sont hors de la région réalisable]\n# Données : 5,5;1,1,4|2,1,6;10,10|5,5|0,8\nA_COMPLETER\n",
    "hints": [
      "Parse les contraintes dans une liste de tuples (a1, a2, b).",
      "Pour chaque sommet, vérifie qu'il satisfait chaque contrainte (avec marge EPS) et compare Z."
    ],
    "examples": [
      {
        "stdin": "3,5;2,1,16|1,2,11;0,0|8,0|0,5.5|7,2|9,1",
        "expected": "OPTIMUM: (x1=7.0, x2=2.0) Z=31.0",
        "note": "Sommets réalisables : (0,0)->Z=0, (8,0)->Z=24, (0,5.5)->Z=27.5, (7,2)->Z=31.0. Le point (9,1) viole la contrainte 1 (2*9+1=19 > 16)."
      }
    ],
    "tests": [
      {
        "label": "Quatre sommets avec optimum intérieur",
        "stdin": "cas:1",
        "expected": "OPTIMUM: (x1=4.0, x2=4.0) Z=28.0"
      },
      {
        "label": "Optimum situé sur un axe",
        "stdin": "cas:2",
        "expected": "OPTIMUM: (x1=3.0, x2=0.0) Z=30.0"
      },
      {
        "label": "Tous les sommets proposés sont hors de la région réalisable",
        "stdin": "cas:3",
        "expected": "REGION_VIDE"
      }
    ],
    "solution": "[Exemple]\nOPTIMUM: (x1=7.0, x2=2.0) Z=31.0\n\n[Cas 1 — Quatre sommets avec optimum intérieur]\nOPTIMUM: (x1=4.0, x2=4.0) Z=28.0\n\n[Cas 2 — Optimum situé sur un axe]\nOPTIMUM: (x1=3.0, x2=0.0) Z=30.0\n\n[Cas 3 — Tous les sommets proposés sont hors de la région réalisable]\nREGION_VIDE\n"
  },
  {
    "id": "ro2-c3-e1",
    "chapter": 3,
    "title": "Critère de Dantzig (Choix de la variable entrante)",
    "level": "n1",
    "language": "analyse",
    "goal": "Identifier la variable hors-base entrante selon la règle du plus grand coût réduit.",
    "brief": "<p>Dans un problème de maximisation, la ligne d’indicateurs (coûts réduits $\\bar{c}_j$) du tableau du simplexe guide l’amélioration de la solution :</p><ul>  <li>Si tous les $\\bar{c}_j \\le 0$, la solution de base courante est <strong>optimale</strong> ;</li>  <li>Sinon, la variable entrante est celle qui possède le coût réduit le plus strictement positif $\\max \\bar{c}_j$ (règle de Dantzig). En cas d’égalité, on choisit l’indice le plus petit (règle de Bland pour éviter le cyclage).</li></ul><p>Analysez les paramètres du problème pour chaque cas...</code>.<br>Si toutes les valeurs sont $\\le 0$, Indiquez : <code>OPTIMALITE_ATTEINTE</code>.<br>Sinon, Indiquez : <code>ENTRANTE: &lt;nom_variable&gt; COUT_REDUIT=&lt;valeur à 2 décimales&gt;</code>.</p>",
    "starter": "# Grille de calcul (ro2-c3-e1) — Critère de Dantzig (Choix de la variable entrante)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux variables candidates positives]\n# Données : x1:3.5,x2:2.0,x3:5.8,s1:0.0\nA_COMPLETER\n\n[Cas 2 — Solution optimale (tous négatifs ou nuls)]\n# Données : x1:0.0,x2:-2.5,s1:-1.2,s2:0.0\nA_COMPLETER\n\n[Cas 3 — Égalité de coût réduit (règle de Bland du plus petit indice)]\n# Données : x1:4.0,x2:4.0,s1:0.0\nA_COMPLETER\n",
    "hints": [
      "Découpez par virgule puis chaque couple par deux-points.",
      "Cherche le maximum strictement positif. S’il n’y en a aucun, c’est optimal."
    ],
    "examples": [
      {
        "stdin": "x1:4.0,x2:6.0,s1:0.0,s2:0.0",
        "expected": "ENTRANTE: x2 COUT_REDUIT=6.00",
        "note": "x2 a le plus fort coût réduit positif (+6.0)."
      }
    ],
    "tests": [
      {
        "label": "Deux variables candidates positives",
        "stdin": "cas:1",
        "expected": "ENTRANTE: x3 COUT_REDUIT=5.80"
      },
      {
        "label": "Solution optimale (tous négatifs ou nuls)",
        "stdin": "cas:2",
        "expected": "OPTIMALITE_ATTEINTE"
      },
      {
        "label": "Égalité de coût réduit (règle de Bland du plus petit indice)",
        "stdin": "cas:3",
        "expected": "ENTRANTE: x1 COUT_REDUIT=4.00"
      }
    ],
    "solution": "[Exemple]\nENTRANTE: x2 COUT_REDUIT=6.00\n\n[Cas 1 — Deux variables candidates positives]\nENTRANTE: x3 COUT_REDUIT=5.80\n\n[Cas 2 — Solution optimale (tous négatifs ou nuls)]\nOPTIMALITE_ATTEINTE\n\n[Cas 3 — Égalité de coût réduit (règle de Bland du plus petit indice)]\nENTRANTE: x1 COUT_REDUIT=4.00\n"
  },
  {
    "id": "ro2-c3-e2",
    "chapter": 3,
    "title": "Règle du ratio minimum & variable sortante",
    "level": "n2",
    "language": "analyse",
    "goal": "Déterminer la variable de base sortante par le test du ratio minimum de Dantzig.",
    "brief": "<p>Une fois la colonne pivot $k$ choisie, la ligne sortante $r$ est déterminée par la règle du plus petit ratio strictement positif entre le second membre $b_i$ et l’élément de la colonne pivot $a_{ik}$ :<br>$$\\theta = \\min_{i \\mid a_{ik} > 0} \\left( \\frac{b_i}{a_{ik}} \\right)$$</p><p>Si aucun élément $a_{ik}$ n’est strictement positif ($a_{ik} \\le 0$ pour toute la colonne), la solution est <strong>non bornée</strong>.</p><p>Analysez les paramètres du problème pour chaque cas...;a1k,a2k,...</code>.<br>Si aucun $a_{ik} > 0$, Indiquez : <code>PROBLEME_NON_BORNE</code>.<br>Sinon, Indiquez : <code>SORTANTE: LIGNE_&lt;numéro 1-indexé&gt; MIN_RATIO=&lt;theta à 2 décimales&gt;</code>.<br>(En cas d’égalité de ratio, choisis la ligne de plus petit indice pour briser l’équi-départ).</p>",
    "starter": "# Grille de calcul (ro2-c3-e2) — Règle du ratio minimum & variable sortante\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Minimum en première ligne]\n# Données : 10,20,30;5,2,1\nA_COMPLETER\n\n[Cas 2 — Colonne pivot avec coefficients négatifs ou nuls]\n# Données : 15,25;0,-2\nA_COMPLETER\n\n[Cas 3 — Un seul coefficient strictement positif]\n# Données : 12,8,20;-3,4,-1\nA_COMPLETER\n",
    "hints": [
      "Ignore les lignes où aik <= 0.",
      "Parcourez les ratios et retiens le minimum strictement positif."
    ],
    "examples": [
      {
        "stdin": "18,42,24;2,3,4",
        "expected": "SORTANTE: LIGNE_3 MIN_RATIO=6.00",
        "note": "Ratios : L1=18/2=9.0, L2=42/3=14.0, L3=24/4=6.0. Le minimum est en Ligne 3."
      }
    ],
    "tests": [
      {
        "label": "Minimum en première ligne",
        "stdin": "cas:1",
        "expected": "SORTANTE: LIGNE_1 MIN_RATIO=2.00"
      },
      {
        "label": "Colonne pivot avec coefficients négatifs ou nuls",
        "stdin": "cas:2",
        "expected": "PROBLEME_NON_BORNE"
      },
      {
        "label": "Un seul coefficient strictement positif",
        "stdin": "cas:3",
        "expected": "SORTANTE: LIGNE_2 MIN_RATIO=2.00"
      }
    ],
    "solution": "[Exemple]\nSORTANTE: LIGNE_3 MIN_RATIO=6.00\n\n[Cas 1 — Minimum en première ligne]\nSORTANTE: LIGNE_1 MIN_RATIO=2.00\n\n[Cas 2 — Colonne pivot avec coefficients négatifs ou nuls]\nPROBLEME_NON_BORNE\n\n[Cas 3 — Un seul coefficient strictement positif]\nSORTANTE: LIGNE_2 MIN_RATIO=2.00\n"
  },
  {
    "id": "ro2-c3-e3",
    "chapter": 3,
    "title": "Opération de pivotage de Gauss-Jordan",
    "level": "n3",
    "language": "analyse",
    "goal": "Effectuer un pivot complet de Gauss-Jordan sur une matrice de simplexe.",
    "brief": "<p>Le pivot de Gauss-Jordan sur l’élément de pivot $(r, c)$ d’une matrice $M$ s’effectue en deux étapes :</p><ol>  <li>Normaliser la ligne de pivot $r$ en divisant chaque coefficient par le pivot $p = M[r][c]$ ;</li>  <li>Pour chaque autre ligne $i ≠ r$, éliminer le coefficient de la colonne $c$ en effectuant :<br>  $M[i][j] \\leftarrow M[i][j] - M[i][c] \\times M[r][j]$.</li></ol><p>Analysez les paramètres du problème pour chaque cas...|L2_coeff1,L2_coeff2,...|...</code><br>où $r, c$ sont les indices 1-indexés du pivot (ligne $r$, colonne $c$).<br>Indiquez chaque ligne de la matrice résultante séparée par <code> | </code> avec les coefficients arrondis à 2 décimales séparés par des virgules :<br><code>&lt;val11&gt;,&lt;val12&gt;,... | &lt;val21&gt;,&lt;val22&gt;,...</code>.</p>",
    "starter": "# Grille de calcul (ro2-c3-e3) — Opération de pivotage de Gauss-Jordan\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice 2x3 avec pivot à 3.0]\n# Données : 1,2;1,3,9|2,1,8\nA_COMPLETER\n\n[Cas 2 — Pivot en deuxième ligne]\n# Données : 2,1;3,2,12|2,4,16\nA_COMPLETER\n\n[Cas 3 — Matrice 3x3 avec ligne identité]\n# Données : 2,2;1,2,5|0,4,8|2,1,6\nA_COMPLETER\n",
    "hints": [
      "Convertissez r et c en indices 0-indexés (r-1, c-1).",
      "Sauvegarde bien la ligne pivot normalisée avant de modifier les autres lignes."
    ],
    "examples": [
      {
        "stdin": "1,1;2,4,10|1,1,4",
        "expected": "1.00,2.00,5.00 | 0.00,-1.00,-1.00",
        "note": "Pivot à la ligne 1, colonne 1 (valeur 2). L1 devient L1/2 = [1, 2, 5]. L2 devient L2 - 1*L1 = [0, -1, -1]."
      }
    ],
    "tests": [
      {
        "label": "Matrice 2x3 avec pivot à 3.0",
        "stdin": "cas:1",
        "expected": "0.33,1.00,3.00 | 1.67,0.00,5.00"
      },
      {
        "label": "Pivot en deuxième ligne",
        "stdin": "cas:2",
        "expected": "0.00,-4.00,-12.00 | 1.00,2.00,8.00"
      },
      {
        "label": "Matrice 3x3 avec ligne identité",
        "stdin": "cas:3",
        "expected": "1.00,0.00,1.00 | 0.00,1.00,2.00 | 2.00,0.00,4.00"
      }
    ],
    "solution": "[Exemple]\n1.00,2.00,5.00 | 0.00,-1.00,-1.00\n\n[Cas 1 — Matrice 2x3 avec pivot à 3.0]\n0.33,1.00,3.00 | 1.67,0.00,5.00\n\n[Cas 2 — Pivot en deuxième ligne]\n0.00,-4.00,-12.00 | 1.00,2.00,8.00\n\n[Cas 3 — Matrice 3x3 avec ligne identité]\n1.00,0.00,1.00 | 0.00,1.00,2.00 | 2.00,0.00,4.00\n"
  },
  {
    "id": "ro2-c4-e1",
    "chapter": 4,
    "title": "Construction du problème Dual canonique",
    "level": "n1",
    "language": "analyse",
    "goal": "Transposer un programme primal MAX en son programme dual MIN symétrique.",
    "brief": "<p>À tout programme primal sous forme canonique :<br>$$\\text{MAX } Z = c_1 x_1 + c_2 x_2 \\quad \\text{sous } A x \\le b, \\quad x \\ge 0$$correspond un programme dual associé :<br>$$\\text{MIN } W = b_1 y_1 + b_2 y_2 \\quad \\text{sous } A^T y \\ge c, \\quad y \\ge 0$$</p><p>Analysez les paramètres du problème pour chaque cas.<br>Génère et Indiquez le programme dual sur deux lignes :<br>Ligne 1 : <code>MIN W=&lt;b1&gt;*y1 + &lt;b2&gt;*y2</code><br>Ligne 2 : <code>CONTRAINTES: &lt;a11&gt;*y1 + &lt;a21&gt;*y2 &gt;= &lt;c1&gt; | &lt;a12&gt;*y1 + &lt;a22&gt;*y2 &gt;= &lt;c2&gt;</code>.<br>(Les coefficients conservent leur format naturel).</p>",
    "starter": "# Grille de calcul (ro2-c4-e1) — Construction du problème Dual canonique\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Primal standard 2 variables 2 contraintes]\n# Données : 4,6;2,1,10;1,3,15\nA_COMPLETER\n\n[Cas 2 — Coefficients décimaux]\n# Données : 1.5,2.5;0.5,1.0,4;1.0,0.5,5\nA_COMPLETER\n\n[Cas 3 — Primal avec coefficients dissymétriques]\n# Données : 10,20;4,2,40;1,5,30\nA_COMPLETER\n",
    "hints": [
      "Remarque la transposition : la première contrainte duale utilise a11 et a21 (première colonne de A).",
      "La fonction objectif duale utilise les seconds membres b1 et b2 du primal."
    ],
    "examples": [
      {
        "stdin": "3,5;1,2,6;3,1,9",
        "expected": "MIN W=6*y1 + 9*y2\nCONTRAINTES: 1*y1 + 3*y2 >= 3 | 2*y1 + 1*y2 >= 5",
        "note": "Objectif MIN W = 6*y1 + 9*y2. Transposée de [[1,2],[3,1]] = [[1,3],[2,1]]."
      }
    ],
    "tests": [
      {
        "label": "Primal standard 2 variables 2 contraintes",
        "stdin": "cas:1",
        "expected": "MIN W=10*y1 + 15*y2\nCONTRAINTES: 2*y1 + 1*y2 >= 4 | 1*y1 + 3*y2 >= 6"
      },
      {
        "label": "Coefficients décimaux",
        "stdin": "cas:2",
        "expected": "MIN W=4*y1 + 5*y2\nCONTRAINTES: 0.5*y1 + 1.0*y2 >= 1.5 | 1.0*y1 + 0.5*y2 >= 2.5"
      },
      {
        "label": "Primal avec coefficients dissymétriques",
        "stdin": "cas:3",
        "expected": "MIN W=40*y1 + 30*y2\nCONTRAINTES: 4*y1 + 1*y2 >= 10 | 2*y1 + 5*y2 >= 20"
      }
    ],
    "solution": "[Exemple]\nMIN W=6*y1 + 9*y2\nCONTRAINTES: 1*y1 + 3*y2 >= 3 | 2*y1 + 1*y2 >= 5\n\n[Cas 1 — Primal standard 2 variables 2 contraintes]\nMIN W=10*y1 + 15*y2\nCONTRAINTES: 2*y1 + 1*y2 >= 4 | 1*y1 + 3*y2 >= 6\n\n[Cas 2 — Coefficients décimaux]\nMIN W=4*y1 + 5*y2\nCONTRAINTES: 0.5*y1 + 1.0*y2 >= 1.5 | 1.0*y1 + 0.5*y2 >= 2.5\n\n[Cas 3 — Primal avec coefficients dissymétriques]\nMIN W=40*y1 + 30*y2\nCONTRAINTES: 4*y1 + 1*y2 >= 10 | 2*y1 + 5*y2 >= 20\n"
  },
  {
    "id": "ro2-c4-e2",
    "chapter": 4,
    "title": "Théorème fort de la dualité & Gap de dualité",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier l’égalité des optimums primal et dual et calculer le gap de dualité.",
    "brief": "<p>D’après le <strong>théorème fort de la dualité</strong>, si le problème primal admet une solution optimale $x^*$, alors le problème dual admet une solution optimale $y^*$ telle que :<br>$$Z(x^*) = c^T x^* = b^T y^* = W(y^*)$$<br>Si les points testés ne sont pas encore optimaux, le <em>théorème faible</em> garantit que $Z(x) \\le W(y)$, l’écart $W(y) - Z(x) \\ge 0$ formant le <strong>gap de dualité</strong>.</p><p>Analysez les paramètres du problème pour chaque cas.<br>Calculez $Z = c_1 x_1 + c_2 x_2$, $W = b_1 y_1 + b_2 y_2$ et l’écart $gap = W - Z$.<br>Si $|gap| < 10^{-5}$, Indiquez :<br><code>OPTIMUM_ATTEINT Z=W=&lt;valeur à 2 décimales&gt; GAP=0.00</code>.<br>Sinon, Indiquez :<br><code>NON_OPTIMAL Z=&lt;Z à 2 décimales&gt; W=&lt;W à 2 décimales&gt; GAP=&lt;gap à 2 décimales&gt;</code>.</p>",
    "starter": "# Grille de calcul (ro2-c4-e2) — Théorème fort de la dualité & Gap de dualité\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Optimum parfait sans gap (Z = W)]\n# Données : 3,5;7,2;16,11;0.333333,2.333333\nA_COMPLETER\n\n[Cas 2 — Points sous-optimaux avec gap net]\n# Données : 2,3;2,1;10,8;1.5,1.0\nA_COMPLETER\n\n[Cas 3 — Autre optimum parfait]\n# Données : 10,12;5,5;50,30;1.0,2.0\nA_COMPLETER\n",
    "hints": [
      "Calculez z = c1*x1 + c2*x2 et w = b1*y1 + b2*y2.",
      "Si abs(w - z) < 1e-5, le gap est nul et l’optimum est prouvé."
    ],
    "examples": [
      {
        "stdin": "3,5;4,2;16,11;0.33,2.33",
        "expected": "NON_OPTIMAL Z=22.00 W=30.91 GAP=8.91",
        "note": "Z = 3*4 + 5*2 = 22.0. W = 16*0.33 + 11*2.33 = 30.91. Gap de dualité = 8.91."
      }
    ],
    "tests": [
      {
        "label": "Optimum parfait sans gap (Z = W)",
        "stdin": "cas:1",
        "expected": "OPTIMUM_ATTEINT Z=W=31.00 GAP=0.00"
      },
      {
        "label": "Points sous-optimaux avec gap net",
        "stdin": "cas:2",
        "expected": "NON_OPTIMAL Z=7.00 W=23.00 GAP=16.00"
      },
      {
        "label": "Autre optimum parfait",
        "stdin": "cas:3",
        "expected": "OPTIMUM_ATTEINT Z=W=110.00 GAP=0.00"
      }
    ],
    "solution": "[Exemple]\nNON_OPTIMAL Z=22.00 W=30.91 GAP=8.91\n\n[Cas 1 — Optimum parfait sans gap (Z = W)]\nOPTIMUM_ATTEINT Z=W=31.00 GAP=0.00\n\n[Cas 2 — Points sous-optimaux avec gap net]\nNON_OPTIMAL Z=7.00 W=23.00 GAP=16.00\n\n[Cas 3 — Autre optimum parfait]\nOPTIMUM_ATTEINT Z=W=110.00 GAP=0.00\n"
  },
  {
    "id": "ro2-c4-e3",
    "chapter": 4,
    "title": "Théorème des écarts complémentaires (Slackness)",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier les conditions d’écarts complémentaires entre solutions primale et duale.",
    "brief": "<p>Le théorème des écarts complémentaires (Karush-Kuhn-Tucker) stipule qu’à l’optimum :</p><ul>  <li>Pour toute contrainte de ressource $i$ : $y_i^* \\times s_i^* = 0$.<br>  (Si une ressource est excédentaire $s_i > 0$, son prix d’ombre est nul $y_i = 0$ ; si $y_i > 0$, la ressource est saturée $s_i = 0$).</li>  <li>Pour toute variable de décision $j$ : $x_j^* \\times e_j^* = 0$ (où $e_j$ est l’écart sur la contrainte duale).</li></ul><p>Analysez les paramètres du problème pour chaque cas...;y1,y2,...</code> représentant les écarts primaux $s_i$ et les variables duales associées $y_i$.<br>Pour chaque couple $(s_i, y_i)$, vérifie si $s_i \\times y_i = 0$ (avec tolérance $10^{-5}$).<br>Si toutes les conditions sont respectées, Indiquez :<br><code>COMPLEMENTARITE_VERIFIEE</code>.<br>Sinon, liste les indices des contraintes en violation :<br><code>VIOLATION_CONTRAINTE_&lt;i&gt;</code> (séparés par un espace).</p>",
    "starter": "# Grille de calcul (ro2-c4-e3) — Théorème des écarts complémentaires (Slackness)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes les conditions respectées]\n# Données : 0.0,0.0,2.0,0.0;3.0,1.5,0.0,4.2\nA_COMPLETER\n\n[Cas 2 — Violation sur la deuxième contrainte]\n# Données : 0.0,3.0,0.0;2.0,1.0,4.0\nA_COMPLETER\n\n[Cas 3 — Violations multiples (contraintes 1 et 3)]\n# Données : 1.5,0.0,2.0;2.0,0.0,1.0\nA_COMPLETER\n",
    "hints": [
      "Découpez par \";\" puis sépare les valeurs s et y.",
      "Une violation apparaît si abs(s * y) > 1e-5."
    ],
    "examples": [
      {
        "stdin": "0.0,4.5,0.0;1.2,0.0,3.5",
        "expected": "COMPLEMENTARITE_VERIFIEE",
        "note": "C1: 0*1.2=0, C2: 4.5*0=0, C3: 0*3.5=0. Tout est nul."
      }
    ],
    "tests": [
      {
        "label": "Toutes les conditions respectées",
        "stdin": "cas:1",
        "expected": "COMPLEMENTARITE_VERIFIEE"
      },
      {
        "label": "Violation sur la deuxième contrainte",
        "stdin": "cas:2",
        "expected": "VIOLATION_CONTRAINTE_2"
      },
      {
        "label": "Violations multiples (contraintes 1 et 3)",
        "stdin": "cas:3",
        "expected": "VIOLATION_CONTRAINTE_1 VIOLATION_CONTRAINTE_3"
      }
    ],
    "solution": "[Exemple]\nCOMPLEMENTARITE_VERIFIEE\n\n[Cas 1 — Toutes les conditions respectées]\nCOMPLEMENTARITE_VERIFIEE\n\n[Cas 2 — Violation sur la deuxième contrainte]\nVIOLATION_CONTRAINTE_2\n\n[Cas 3 — Violations multiples (contraintes 1 et 3)]\nVIOLATION_CONTRAINTE_1 VIOLATION_CONTRAINTE_3\n"
  },
  {
    "id": "ro2-c5-e1",
    "chapter": 5,
    "title": "Méthode du Coin Nord-Ouest (Transport)",
    "level": "n1",
    "language": "analyse",
    "goal": "Construire une solution de base réalisable initiale par la règle du coin Nord-Ouest.",
    "brief": "<p>Dans un problème de transport équilibré (somme des offres = somme des demandes), la règle du <strong>Coin Nord-Ouest</strong> commence en haut à gauche $(i=0, j=0)$ :</p><ul>  <li>Alloue $x_{ij} = \\min(offre_i, demande_j)$ ;</li>  <li>Soustrait cette quantité de $offre_i$ et $demande_j$ ;</li>  <li>Si $offre_i = 0$, avance vers le bas ($i \\leftarrow i + 1$) ; si $demande_j = 0$, avance vers la droite ($j \\leftarrow j + 1$).</li></ul><p>Analysez les paramètres du problème pour chaque cas...;d1,d2,...;cout11,cout12,...|cout21,cout22,...|...</code>.<br>Calculez les flux non nuls alloués et le coût total de transport $C = \\sum x_{ij} \\times c_{ij}$.<br>Indiquez :<br><code>FLUX: (i,j)=qte,... COUT_TOTAL=&lt;C à 1 décimale&gt;</code><br>(les indices $i, j$ sont 1-indexés).</p>",
    "starter": "# Grille de calcul (ro2-c5-e1) — Méthode du Coin Nord-Ouest (Transport)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux origines deux destinations]\n# Données : 25,25;30,20;2,4|3,5\nA_COMPLETER\n\n[Cas 2 — Trois origines deux destinations]\n# Données : 10,20,30;25,35;4,6|2,5|3,1\nA_COMPLETER\n\n[Cas 3 — Matrice 2x2 avec égalité parfaite sur la première case]\n# Données : 20,30;20,30;5,8|4,2\nA_COMPLETER\n",
    "hints": [
      "La méthode du coin Nord-Ouest initialise la matrice de transport en saturant d’abord la case (1, 1).",
      "À chaque étape, allouez min(offre restante, demande restante) et déplacez-vous vers la droite ou vers le bas selon la saturation."
    ],
    "examples": [
      {
        "stdin": "30,40;20,30,20;3,5,7|2,4,6",
        "expected": "FLUX: (1,1)=20.0,(1,2)=10.0,(2,2)=20.0,(2,3)=20.0 COUT_TOTAL=310.0",
        "note": "O1=30, D1=20 -> (1,1)=20. D1 est satisfaite. O1 restant=10, D2=30 -> (1,2)=10. O1 épuisée. O2=40, D2 restant=20 -> (2,2)=20. O2 restant=20, D3=20 -> (2,3)=20. Coût: 20*3 + 10*5 + 20*4 + 20*6 = 60+50+80+120 = 310.0."
      }
    ],
    "tests": [
      {
        "label": "Deux origines deux destinations",
        "stdin": "cas:1",
        "expected": "FLUX: (1,1)=25.0,(2,1)=5.0,(2,2)=20.0 COUT_TOTAL=165.0"
      },
      {
        "label": "Trois origines deux destinations",
        "stdin": "cas:2",
        "expected": "FLUX: (1,1)=10.0,(2,1)=15.0,(2,2)=5.0,(3,2)=30.0 COUT_TOTAL=125.0"
      },
      {
        "label": "Matrice 2x2 avec égalité parfaite sur la première case",
        "stdin": "cas:3",
        "expected": "FLUX: (1,1)=20.0,(2,2)=30.0 COUT_TOTAL=160.0"
      }
    ],
    "solution": "[Exemple]\nFLUX: (1,1)=20.0,(1,2)=10.0,(2,2)=20.0,(2,3)=20.0 COUT_TOTAL=310.0\n\n[Cas 1 — Deux origines deux destinations]\nFLUX: (1,1)=25.0,(2,1)=5.0,(2,2)=20.0 COUT_TOTAL=165.0\n\n[Cas 2 — Trois origines deux destinations]\nFLUX: (1,1)=10.0,(2,1)=15.0,(2,2)=5.0,(3,2)=30.0 COUT_TOTAL=125.0\n\n[Cas 3 — Matrice 2x2 avec égalité parfaite sur la première case]\nFLUX: (1,1)=20.0,(2,2)=30.0 COUT_TOTAL=160.0\n"
  },
  {
    "id": "ro2-c5-e2",
    "chapter": 5,
    "title": "Méthode du Moindre Coût (Transport économique)",
    "level": "n2",
    "language": "analyse",
    "goal": "Construire une solution initiale de transport par allocation gloutonne sur la case la moins chère.",
    "brief": "<p>Contrairement au Coin Nord-Ouest qui ignore les prix, la <strong>Méthode du Moindre Coût</strong> sélectionne à chaque étape la cellule $(i, j)$ encore active ayant le coût unitaire $c_{ij}$ le plus faible de toute la matrice :</p><ul>  <li>Alloue $q = \\min(offre_i, demande_j)$ à cette cellule ;</li>  <li>Met à jour l’offre et la demande restantes ;</li>  <li>Désactive la ligne $i$ (si $offre_i = 0$) ou la colonne $j$ (si $demande_j = 0$).</li></ul><p>Analysez les paramètres du problème pour chaque cas.<br>Indiquez : <code>MOINDRE_COUT: COUT_TOTAL=&lt;C à 1 décimale&gt;</code>.</p>",
    "starter": "# Grille de calcul (ro2-c5-e2) — Méthode du Moindre Coût (Transport économique)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice 2x2 contrastée]\n# Données : 30,20;25,25;4,2|3,5\nA_COMPLETER\n\n[Cas 2 — Matrice 2x2 avec coûts équilibrés]\n# Données : 40,40;30,50;1,3|2,1\nA_COMPLETER\n\n[Cas 3 — Avantage net sur la diagonale]\n# Données : 15,15;15,15;1,9|9,2\nA_COMPLETER\n",
    "hints": [
      "Repère les indices (i, j) non encore saturés avec le coût min.",
      "Soustrait q de l'offre i et de la demande j jusqu'à épuisement."
    ],
    "examples": [
      {
        "stdin": "20,30;25,25;3,5|2,4",
        "expected": "MOINDRE_COUT: COUT_TOTAL=170.0",
        "note": "Allocation : (2,1)=25 (coût 2), (2,2)=5 (coût 4), (1,2)=20 (coût 5). Coût total = 25*2 + 5*4 + 20*5 = 50 + 20 + 100 = 170.0."
      }
    ],
    "tests": [
      {
        "label": "Matrice 2x2 contrastée",
        "stdin": "cas:1",
        "expected": "MOINDRE_COUT: COUT_TOTAL=130.0"
      },
      {
        "label": "Matrice 2x2 avec coûts équilibrés",
        "stdin": "cas:2",
        "expected": "MOINDRE_COUT: COUT_TOTAL=100.0"
      },
      {
        "label": "Avantage net sur la diagonale",
        "stdin": "cas:3",
        "expected": "MOINDRE_COUT: COUT_TOTAL=45.0"
      }
    ],
    "solution": "[Exemple]\nMOINDRE_COUT: COUT_TOTAL=170.0\n\n[Cas 1 — Matrice 2x2 contrastée]\nMOINDRE_COUT: COUT_TOTAL=130.0\n\n[Cas 2 — Matrice 2x2 avec coûts équilibrés]\nMOINDRE_COUT: COUT_TOTAL=100.0\n\n[Cas 3 — Avantage net sur la diagonale]\nMOINDRE_COUT: COUT_TOTAL=45.0\n"
  },
  {
    "id": "ro2-c5-e3",
    "chapter": 5,
    "title": "Algorithme Hongrois (Affectation minimale)",
    "level": "n3",
    "language": "analyse",
    "goal": "Appliquer les étapes de réduction de matrice pour résoudre un problème d’affectation.",
    "brief": "<p>Le problème d’affectation consiste à attribuer $n$ personnes à $n$ tâches de façon bijective en minimisant la somme des coûts. L’<strong>algorithme de Kuhn-Munkres (Hongrois)</strong> débute par :</p><ol>  <li><strong>Réduction par ligne</strong> : soustraire le minimum de chaque ligne à tous ses éléments ;</li>  <li><strong>Réduction par colonne</strong> : soustraire le minimum de chaque colonne à tous ses éléments.</li></ol><p>Analysez les paramètres du problème pour chaque cas.<br>Effectue la réduction complète (lignes puis colonnes).<br>Pour toutes les permutations possibles de 3 affectations bijectives, trouve celle qui minimise la somme des coûts d’origine.<br>Indiquez : <code>COUT_MIN=&lt;valeur entière&gt; AFFECTATION=&lt;j1&gt;,&lt;j2&gt;,&lt;j3&gt;</code><br>où $j_k$ est la tâche (1-indexée) affectée à la personne $k$.</p>",
    "starter": "# Grille de calcul (ro2-c5-e3) — Algorithme Hongrois (Affectation minimale)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice 3x3 diagonale optimale]\n# Données : 4,8,9|6,3,7|8,5,2\nA_COMPLETER\n\n[Cas 2 — Matrice 3x3 avec permutation croisée]\n# Données : 15,10,9|9,15,10|10,12,8\nA_COMPLETER\n\n[Cas 3 — Coûts identiques sur plusieurs cases]\n# Données : 5,5,5|5,5,5|5,5,5\nA_COMPLETER\n",
    "hints": [
      "Pour une matrice 3x3, il y a exactement 3! = 6 permutations d'affectation.",
      "Évalue les 6 sommes des coûts d'origine pour trouver la bijection optimale."
    ],
    "examples": [
      {
        "stdin": "10,15,20|12,8,14|9,13,11",
        "expected": "COUT_MIN=29 AFFECTATION=1,2,3",
        "note": "Affectation : P1->T1 (10), P2->T2 (8), P3->T3 (11). Coût total = 10 + 8 + 11 = 29."
      }
    ],
    "tests": [
      {
        "label": "Matrice 3x3 diagonale optimale",
        "stdin": "cas:1",
        "expected": "COUT_MIN=9 AFFECTATION=1,2,3"
      },
      {
        "label": "Matrice 3x3 avec permutation croisée",
        "stdin": "cas:2",
        "expected": "COUT_MIN=27 AFFECTATION=2,1,3"
      },
      {
        "label": "Coûts identiques sur plusieurs cases",
        "stdin": "cas:3",
        "expected": "COUT_MIN=15 AFFECTATION=1,2,3"
      }
    ],
    "solution": "[Exemple]\nCOUT_MIN=29 AFFECTATION=1,2,3\n\n[Cas 1 — Matrice 3x3 diagonale optimale]\nCOUT_MIN=9 AFFECTATION=1,2,3\n\n[Cas 2 — Matrice 3x3 avec permutation croisée]\nCOUT_MIN=27 AFFECTATION=2,1,3\n\n[Cas 3 — Coûts identiques sur plusieurs cases]\nCOUT_MIN=15 AFFECTATION=1,2,3\n"
  },
  {
    "id": "ro2-c6-e1",
    "chapter": 6,
    "title": "Dates au plus tôt (Forward Pass PERT/CPM)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la date de début au plus tôt de chaque tâche et la durée totale du projet.",
    "brief": "<p>Dans un réseau d’ordonnancement sans cycle (DAG), la date de début au plus tôt $ES(i)$ d’une tâche $i$ est la date minimale à laquelle tous ses prédécesseurs immédiats sont achevés :<br>$$ES(i) = \\max_{p \\in Pred(i)} (ES(p) + d_p)$$<br>(avec $ES(racine) = 0$).</p><p>Analysez les paramètres du problème pour chaque cas...</code><br>où <code>preds</code> est une liste de noms séparés par des tirets (ex. <code>A-B</code>) ou <code>AUCUN</code>.<br>Indiquez :<br><code>DATES_ES: &lt;nom&gt;=&lt;ES&gt;,... DUREE_PROJET=&lt;Duree&gt;</code>.</p>",
    "starter": "# Grille de calcul (ro2-c6-e1) — Dates au plus tôt (Forward Pass PERT/CPM)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Chaîne linéaire simple]\n# Données : A:AUCUN,4 | B:A,5 | C:B,6\nA_COMPLETER\n\n[Cas 2 — Deux branches parallèles convergeant vers une tâche]\n# Données : A:AUCUN,5 | B:AUCUN,8 | C:A-B,3\nA_COMPLETER\n\n[Cas 3 — Graphe à 5 nœuds]\n# Données : A:AUCUN,2 | B:A,3 | C:A,5 | D:B,4 | E:C-D,2\nA_COMPLETER\n",
    "hints": [
      "Parse chaque tâche dans un dictionnaire avec sa durée et ses prédécesseurs.",
      "Parcourez les tâches dans l'ordre de dépendance (ou itère jusqu'à stabilisation des dates ES)."
    ],
    "examples": [
      {
        "stdin": "A:AUCUN,3 | B:A,4 | C:A,2 | D:B-C,5",
        "expected": "DATES_ES: A=0,B=3,C=3,D=7 DUREE_PROJET=12",
        "note": "ES(A)=0. ES(B)=0+3=3. ES(C)=0+3=3. ES(D)=max(3+4, 3+2)=7. Fin D = 7+5=12."
      }
    ],
    "tests": [
      {
        "label": "Chaîne linéaire simple",
        "stdin": "cas:1",
        "expected": "DATES_ES: A=0,B=4,C=9 DUREE_PROJET=15"
      },
      {
        "label": "Deux branches parallèles convergeant vers une tâche",
        "stdin": "cas:2",
        "expected": "DATES_ES: A=0,B=0,C=8 DUREE_PROJET=11"
      },
      {
        "label": "Graphe à 5 nœuds",
        "stdin": "cas:3",
        "expected": "DATES_ES: A=0,B=2,C=2,D=5,E=9 DUREE_PROJET=11"
      }
    ],
    "solution": "[Exemple]\nDATES_ES: A=0,B=3,C=3,D=7 DUREE_PROJET=12\n\n[Cas 1 — Chaîne linéaire simple]\nDATES_ES: A=0,B=4,C=9 DUREE_PROJET=15\n\n[Cas 2 — Deux branches parallèles convergeant vers une tâche]\nDATES_ES: A=0,B=0,C=8 DUREE_PROJET=11\n\n[Cas 3 — Graphe à 5 nœuds]\nDATES_ES: A=0,B=2,C=2,D=5,E=9 DUREE_PROJET=11\n"
  },
  {
    "id": "ro2-c6-e2",
    "chapter": 6,
    "title": "Marges totales & Chemin critique",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la marge totale de chaque tâche et identifier le chemin critique du projet.",
    "brief": "<p>La <strong>marge totale</strong> d’une tâche $i$ mesure le retard maximal qu’elle peut prendre sans retarder la date de fin globale du projet :<br>$$MT(i) = LF(i) - ES(i) - d_i$$où $ES$ est la date au plus tôt, $LF$ la date au plus tard d’achèvement, et $d_i$ la durée de la tâche.<br>Une tâche est dite <strong>critique</strong> si sa marge totale est nulle ($MT = 0$).</p><p>Analysez les paramètres du problème pour chaque cas...</code>.<br>Calculez la marge totale de chaque tâche.<br>Indiquez :<br><code>MARGES: nom=MT,... CRITIQUES: &lt;liste des tâches critiques séparées par des tirets&gt;</code>.</p>",
    "starter": "# Grille de calcul (ro2-c6-e2) — Marges totales & Chemin critique\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes les tâches sont critiques (projet mono-branche)]\n# Données : A:0,4,4 | B:4,9,5 | C:9,12,3\nA_COMPLETER\n\n[Cas 2 — Deux tâches avec marge positive]\n# Données : A:0,5,5 | B:0,5,2 | C:2,8,3 | D:5,10,5\nA_COMPLETER\n\n[Cas 3 — Projet à 4 tâches avec bifurcation]\n# Données : X:0,2,2 | Y:2,6,4 | Z:2,6,1 | W:6,8,2\nA_COMPLETER\n",
    "hints": [
      "Pour chaque tâche, mt = lf - es - duree.",
      "Filtrez les tâches avec mt == 0 pour former la chaîne critique."
    ],
    "examples": [
      {
        "stdin": "A:0,3,3 | B:3,7,4 | C:3,7,2 | D:7,12,5",
        "expected": "MARGES: A=0,B=0,C=2,D=0 CRITIQUES: A-B-D",
        "note": "MT(A)=3-0-3=0, MT(B)=7-3-4=0, MT(C)=7-3-2=2, MT(D)=12-7-5=0. Tâches critiques : A, B, D."
      }
    ],
    "tests": [
      {
        "label": "Toutes les tâches sont critiques (projet mono-branche)",
        "stdin": "cas:1",
        "expected": "MARGES: A=0,B=0,C=0 CRITIQUES: A-B-C"
      },
      {
        "label": "Deux tâches avec marge positive",
        "stdin": "cas:2",
        "expected": "MARGES: A=0,B=3,C=3,D=0 CRITIQUES: A-D"
      },
      {
        "label": "Projet à 4 tâches avec bifurcation",
        "stdin": "cas:3",
        "expected": "MARGES: X=0,Y=0,Z=3,W=0 CRITIQUES: X-Y-W"
      }
    ],
    "solution": "[Exemple]\nMARGES: A=0,B=0,C=2,D=0 CRITIQUES: A-B-D\n\n[Cas 1 — Toutes les tâches sont critiques (projet mono-branche)]\nMARGES: A=0,B=0,C=0 CRITIQUES: A-B-C\n\n[Cas 2 — Deux tâches avec marge positive]\nMARGES: A=0,B=3,C=3,D=0 CRITIQUES: A-D\n\n[Cas 3 — Projet à 4 tâches avec bifurcation]\nMARGES: X=0,Y=0,Z=3,W=0 CRITIQUES: X-Y-W\n"
  },
  {
    "id": "ro2-c6-e3",
    "chapter": 6,
    "title": "Goulot d’étranglement de Ford-Fulkerson",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la capacité résiduelle d’une chaîne augmentante et mettre à jour le flot dans un réseau.",
    "brief": "<p>Dans l’algorithme de Ford-Fulkerson pour la recherche du <strong>flot maximal</strong>, chaque arc $(u, v)$ possède une capacité $c(u, v)$ et un flot actuel $f(u, v)$. La capacité résiduelle est $r(u, v) = c(u, v) - f(u, v)$.</p><p>Pour une chaîne augmentante $P = (s, v_1, v_2, \\dots, t)$, la valeur maximale de flot que l’on peut pousser est déterminée par le <strong>goulot d’étranglement</strong> (bottleneck capacity) :<br>$$\\Delta = \\min_{(u, v) \\in P} r(u, v)$$</p><p>Analysez les paramètres du problème pour chaque cas... ; CHAINE: s-v1-v2-...-t</code>.<br>Calculez $\\Delta$ et les nouvelles capacités résiduelles des arcs de la chaîne.<br>Indiquez :<br><code>DELTA=&lt;Delta&gt; ARCS_MAJ: u1-v1=&lt;nouveau_flot&gt;,...</code>.</p>",
    "starter": "# Grille de calcul (ro2-c6-e3) — Goulot d’étranglement de Ford-Fulkerson\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Chaîne à trois arcs avec saturation exacte]\n# Données : s-1:15,5 | 1-2:10,2 | 2-t:8,4 ; CHAINE: s-1-2-t\nA_COMPLETER\n\n[Cas 2 — Chaîne saturée dès le premier arc]\n# Données : s-A:6,3 | A-t:12,1 ; CHAINE: s-A-t\nA_COMPLETER\n\n[Cas 3 — Graphe avec réseau maillé]\n# Données : s-u:20,10 | u-v:14,4 | v-t:18,12 ; CHAINE: s-u-v-t\nA_COMPLETER\n",
    "hints": [
      "Découpez par \";\" pour séparer le réseau de la chaîne à augmenter.",
      "Pour chaque arc consécutif de la chaîne, calcule r = cap - flot et trouve min(r)."
    ],
    "examples": [
      {
        "stdin": "s-a:10,2 | a-t:8,1 | s-b:5,0 | b-t:5,0 ; CHAINE: s-a-t",
        "expected": "DELTA=7 ARCS_MAJ: s-a=9,a-t=8",
        "note": "Sur la chaîne s-a-t : r(s-a) = 10 - 2 = 8, r(a-t) = 8 - 1 = 7. Delta = min(8, 7) = 7. Nouveaux flots : s-a = 2+7 = 9, a-t = 1+7 = 8."
      }
    ],
    "tests": [
      {
        "label": "Chaîne à trois arcs avec saturation exacte",
        "stdin": "cas:1",
        "expected": "DELTA=4 ARCS_MAJ: s-1=9,1-2=6,2-t=8"
      },
      {
        "label": "Chaîne saturée dès le premier arc",
        "stdin": "cas:2",
        "expected": "DELTA=3 ARCS_MAJ: s-A=6,A-t=4"
      },
      {
        "label": "Graphe avec réseau maillé",
        "stdin": "cas:3",
        "expected": "DELTA=6 ARCS_MAJ: s-u=16,u-v=10,v-t=18"
      }
    ],
    "solution": "[Exemple]\nDELTA=7 ARCS_MAJ: s-a=9,a-t=8\n\n[Cas 1 — Chaîne à trois arcs avec saturation exacte]\nDELTA=4 ARCS_MAJ: s-1=9,1-2=6,2-t=8\n\n[Cas 2 — Chaîne saturée dès le premier arc]\nDELTA=3 ARCS_MAJ: s-A=6,A-t=4\n\n[Cas 3 — Graphe avec réseau maillé]\nDELTA=6 ARCS_MAJ: s-u=16,u-v=10,v-t=18\n"
  }
];
