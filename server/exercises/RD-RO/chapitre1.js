/**
 * Chapitre 1 — Recherche Opérationnelle B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 * Progression pédagogique rigoureuse (N1 -> N2 -> N3).
 */
'use strict';

module.exports = [
  {
    id: "ro2-c1-e1",
    chapter: 1,
    title: "Évaluation d'un plan de production : variables, non-négativité & calcul de Z",
    level: "n1",
    language: "analyse",
    goal: "Distinguer coefficients et variables, vérifier la non-négativité (x_j ≥ 0) et évaluer la fonction objectif Z sur un plan candidat.",
    brief: "<p>En programmation linéaire, il est crucial de distinguer :</p><ul><li>les <strong>coefficients économiques</strong> $c_1, c_2$ (marges unitaires fixes en MAX ou coûts unitaires en MIN) ;</li><li>les <strong>variables de décision</strong> $x_1, x_2$ (quantités physiques choisies par le décideur) ;</li><li>la <strong>valeur de la fonction objectif</strong> $Z = c_1 x_1 + c_2 x_2$ calculée pour un plan candidat donné ;</li><li>l’<strong>optimum</strong> (meilleur $Z$ parmi tous les plans réalisables), dont la recherche constitue une tâche algorithmique distincte.</li></ul><p><strong>Règle de non-négativité :</strong> toute variable de décision physique doit vérifier $x_j \\ge 0$. Une variable nulle ($x_j = 0$) est parfaitement valide (l’activité correspondante n’est pas mise en œuvre). En revanche, si une variable est strictement négative ($x_1 < 0$ ou $x_2 < 0$), le plan est irréalisable : indiquez <code>NON_VALIDE VIOLATION_SIGNE</code>.<br>Sinon, calculez $Z$ et indiquez : <code>VALIDE Z=&lt;valeur&gt;</code> (ex : <code>VALIDE Z=140</code>).</p>",
    starter: "# Grille d'analyse (ro2-c1-e1) — Validation de fonction objectif & positivité\n# Complétez la résolution mathématique sous chaque cas ci-dessous :\n\n[Cas 1 — Maximisation valide]\n# Modèle : MAX Z = 25·x1 + 30·x2\n# Plan candidat : x1 = 2, x2 = 3\nA_COMPLETER\n\n[Cas 2 — Minimisation avec variable nulle]\n# Modèle : MIN Z = 10·x1 + 8·x2\n# Plan candidat : x1 = 0, x2 = 7\nA_COMPLETER\n\n[Cas 3 — Violation de non-négativité sur x1]\n# Modèle : MAX Z = 15·x1 + 20·x2\n# Plan candidat : x1 = -2, x2 = 5\nA_COMPLETER\n",
    hints: [
      "Vérifiez d'abord si x1 >= 0 et x2 >= 0. En programmation linéaire, une quantité physique négative est absurde ; en revanche, une variable nulle est tout à fait autorisée.",
      "Si les deux variables sont valides, calculez Z = c1*x1 + c2*x2 (l'orientation MAX ou MIN n'altère pas le calcul arithmétique de la fonction, elle indique seulement le sens d'optimisation). Répondez sous la forme VALIDE Z=<valeur> ou NON_VALIDE VIOLATION_SIGNE."
    ],
    examples: [
      {
        stdin: "ex:1",
        expected: "VALIDE Z=160",
        note: "Pour MAX Z = 15·x1 + 20·x2 avec (x1=4, x2=5) : x1 >= 0 et x2 >= 0 sont valides. Z = 15*4 + 20*5 = 160. Attention : ce calcul évalue la fonction en ce point mais ne prouve pas son optimalité globale."
      }
    ],
    tests: [
      {
        label: "Maximisation valide",
        stdin: "cas:1",
        expected: "VALIDE Z=140",
        hint: "x1=2 et x2=3 sont >= 0. La valeur de Z est 25*2 + 30*3 = 50 + 90 = 140."
      },
      {
        label: "Minimisation avec variable nulle",
        stdin: "cas:2",
        expected: "VALIDE Z=56",
        hint: "Une variable nulle (x1=0) est valide en PL. La valeur de Z est 10*0 + 8*7 = 56."
      },
      {
        label: "Violation de non-négativité sur x1",
        stdin: "cas:3",
        expected: "NON_VALIDE VIOLATION_SIGNE",
        hint: "x1 = -2 viole impérativement la contrainte physique de non-négativité (x1 >= 0)."
      }
    ],
    solution: "[Exemple]\nVALIDE Z=160\n\n[Cas 1 — Maximisation valide]\nVALIDE Z=140\n\n[Cas 2 — Minimisation avec variable nulle]\nVALIDE Z=56\n\n[Cas 3 — Violation de non-négativité sur x1]\nNON_VALIDE VIOLATION_SIGNE\n"
  },
  {
    id: "ro2-c1-e2",
    chapter: 1,
    title: "Faisabilité de contraintes de ressources, marges d'écart & saturation",
    level: "n2",
    language: "analyse",
    goal: "Vérifier la non-négativité préalable, calculer la consommation et l'écart (slack) pour chaque ressource, et qualifier la saturation ou la violation.",
    brief: "<p>Une contrainte de ressource limite la consommation globale par rapport à une capacité disponible :<br>$$\\text{Consommation } a_{i1} x_1 + a_{i2} x_2 \\le b_i \\quad (\\text{Capacité disponible})$$</p><p>Pour chaque plan candidat soumis :</p><ol><li><strong>Vérification préalable de non-négativité :</strong> si $x_1 < 0$ ou $x_2 < 0$, le plan est physiquement impossible : indiquez <code>IRREALISABLE VIOLATION_SIGNE</code>.</li><li><strong>Calcul de l'écart (marge résiduelle / slack) :</strong> $s_i = b_i - (a_{i1} x_1 + a_{i2} x_2)$.<ul><li>Si $s_i > 0$ : la ressource dispose d’une marge inemployée de $s_i$ unités ;</li><li>Si $s_i = 0$ : la ressource est <em>exactement saturée</em> (goulot d'étranglement actif) ;</li><li>Si $s_i < 0$ : la capacité est dépassée.</li></ul></li><li><strong>Conclusion :</strong> si $s_1 \\ge 0$ et $s_2 \\ge 0$, indiquez : <code>REALISABLE s1=&lt;s1&gt; s2=&lt;s2&gt;</code>.<br>Sinon, mentionnez les contraintes violées : <code>IRREALISABLE VIOLATION_R1</code>, <code>IRREALISABLE VIOLATION_R2</code> ou <code>IRREALISABLE VIOLATION_R1 VIOLATION_R2</code>.</li></ol>",
    starter: "# Grille d'analyse (ro2-c1-e2) — Faisabilité de contraintes de ressources & écarts\n# Complétez l'analyse de faisabilité pour chaque cas ci-dessous :\n\n[Cas 1 — Plan réalisable avec marge inemployée]\n# Contraintes : R1: 3·x1 + 1·x2 <= 12 | R2: 1·x1 + 4·x2 <= 14\n# Plan candidat : x1 = 2, x2 = 2\nA_COMPLETER\n\n[Cas 2 — Saturation exacte des deux ressources]\n# Contraintes : R1: 2·x1 + 1·x2 <= 10 | R2: 1·x1 + 2·x2 <= 8\n# Plan candidat : x1 = 4, x2 = 2\nA_COMPLETER\n\n[Cas 3 — Dépassement de capacité sur la ressource R1]\n# Contraintes : R1: 2·x1 + 1·x2 <= 10 | R2: 1·x1 + 2·x2 <= 12\n# Plan candidat : x1 = 5, x2 = 2\nA_COMPLETER\n",
    hints: [
      "L'écart s_i = b_i - consommation mesure la marge restante. Si s_i >= 0, la contrainte est respectée. Un écart nul (s_i = 0) indique une saturation parfaite.",
      "Vérifiez d'abord x1 >= 0 et x2 >= 0. Calculez ensuite s1 = b1 - (a11*x1 + a12*x2) et s2 = b2 - (a21*x1 + a22*x2). Si les deux écarts sont >= 0, répondez REALISABLE s1=<s1> s2=<s2>. Sinon, indiquez quelle contrainte est violée."
    ],
    examples: [
      {
        stdin: "ex:1",
        expected: "REALISABLE s1=2 s2=1",
        note: "Pour (x1=3, x2=2) avec R1: 2·x1 + 1·x2 <= 10 et R2: 1·x1 + 2·x2 <= 8 : Conso R1 = 8 <= 10 (s1=2). Conso R2 = 7 <= 8 (s2=1). Les deux ressources ont une marge résiduelle positive."
      }
    ],
    tests: [
      {
        label: "Plan réalisable avec marge inemployée",
        stdin: "cas:1",
        expected: "REALISABLE s1=4 s2=4",
        hint: "R1: 3(2)+1(2)=8 <= 12 (s1=4). R2: 1(2)+4(2)=10 <= 14 (s2=4). Les deux écarts valent 4."
      },
      {
        label: "Saturation exacte des deux ressources",
        stdin: "cas:2",
        expected: "REALISABLE s1=0 s2=0",
        hint: "R1: 2(4)+1(2)=10=10 (s1=0). R2: 1(4)+2(2)=8=8 (s2=0). Les deux contraintes sont saturées exactement."
      },
      {
        label: "Dépassement de capacité sur la ressource R1",
        stdin: "cas:3",
        expected: "IRREALISABLE VIOLATION_R1",
        hint: "R1: 2(5)+1(2)=12 > 10 (dépassement de 2 unités, s1=-2). Seule R1 est violée car R2 consomme 9 <= 12."
      }
    ],
    solution: "[Exemple]\nREALISABLE s1=2 s2=1\n\n[Cas 1 — Plan réalisable avec marge inemployée]\nREALISABLE s1=4 s2=4\n\n[Cas 2 — Saturation exacte des deux ressources]\nREALISABLE s1=0 s2=0\n\n[Cas 3 — Dépassement de capacité sur la ressource R1]\nIRREALISABLE VIOLATION_R1\n"
  },
  {
    id: "ro2-c1-e3",
    chapter: 1,
    title: "Sélection de mélange parmi des plans candidats & arbitrage de coût minimal",
    level: "n3",
    language: "analyse",
    goal: "Filtrer les candidats satisfaisant les exigences minimales (≥), justifier le rejet des non conformes et sélectionner le mélange réalisable de coût minimal.",
    brief: "<p>Dans un problème de mélange (<em>blending</em>), on cherche à minimiser le coût sous des exigences nutritionnelles ou qualitatives minimales :<br>$$\\text{MIN } C = c_1 x_1 + c_2 x_2 \\quad \\text{sous } a_{11} x_1 + a_{12} x_2 \\ge b_1, \\quad a_{21} x_1 + a_{22} x_2 \\ge b_2, \\quad x_1, x_2 \\ge 0$$</p><div class=\"box box--info\"><div class=\"box__title\">Précision méthodologique</div><p>Cet exercice compare un <strong>échantillon fini de mélanges candidats</strong>. Sélectionner le moins cher parmi cette liste ne prouve pas son optimalité continue globale : la recherche de l’optimum universel requiert le Simplexe (chapitre 3).</p></div><p>Pour chaque cas :</p><ol><li>Vérifiez la non-négativité puis les deux exigences minimales ($R_1 \\ge b_1$ et $R_2 \\ge b_2$) pour chaque candidat. Tout candidat violant au moins une exigence est éliminé.</li><li>Calculez le coût $C = c_1 x_1 + c_2 x_2$ des candidats réalisables.</li><li>Retenez le meilleur candidat : <code>MEILLEUR: x1=&lt;x1&gt; x2=&lt;x2&gt; COUT=&lt;C&gt;</code>.<br>Si aucun candidat n’est réalisable, indiquez : <code>AUCUN_REALISABLE</code>.<br><em>Règle de départage :</em> en cas d'égalité stricte de coût minimal entre candidats réalisables, retenez celui avec le plus petit $x_1$.</li></ol>",
    starter: "# Grille d'analyse (ro2-c1-e3) — Arbitrage de mélange de coût minimal (Blending)\n# Analysez les mélanges candidats et retenez le meilleur plan réalisable :\n\n[Cas 1 — Trois candidats avec un vainqueur économique net]\n# Coûts : c1 = 5 €/kg, c2 = 8 €/kg (MIN C = 5·x1 + 8·x2)\n# Exigences : R1: 1·x1 + 2·x2 >= 20 | R2: 2·x1 + 1·x2 >= 15\n# Candidats soumis : A(10, 6), B(8, 5), C(12, 4)\nA_COMPLETER\n\n[Cas 2 — Candidats dont certains violent les seuils minimaux]\n# Coûts : c1 = 3 €/kg, c2 = 2 €/kg (MIN C = 3·x1 + 2·x2)\n# Exigences : R1: 2·x1 + 1·x2 >= 10 | R2: 1·x1 + 3·x2 >= 12\n# Candidats soumis : A(2, 2), B(4, 3), C(1, 1)\nA_COMPLETER\n\n[Cas 3 — Aucun candidat ne satisfait l'ensemble des exigences]\n# Coûts : c1 = 10 €/kg, c2 = 15 €/kg (MIN C = 10·x1 + 15·x2)\n# Exigences : R1: 2·x1 + 3·x2 >= 50 | R2: 3·x1 + 1·x2 >= 40\n# Candidats soumis : A(5, 5), B(10, 2), C(2, 8)\nA_COMPLETER\n",
    hints: [
      "Ne comparez jamais les coûts avant d'avoir validé la faisabilité ! Un candidat très peu coûteux mais qui ne respecte pas les teneurs minimales requises est impérativement disqualifié.",
      "Testez chaque point (x1, x2) sur les deux inéquations >=. Dans le cas 1, B est éliminé car 1*8 + 2*5 = 18 < 20. Comparez le coût C = c1*x1 + c2*x2 entre les candidats restants et sélectionnez le minimum."
    ],
    examples: [
      {
        stdin: "ex:1",
        expected: "MEILLEUR: x1=25 x2=10 COUT=160",
        note: "Pour c1=4, c2=6 avec exigences (0.2x1+0.5x2 >= 10, 0.4x1+0.2x2 >= 12) : (25, 10) est réalisable et coûte 160, plus économique que (20, 15) à 170. Le candidat (10, 20) est irréalisable."
      }
    ],
    tests: [
      {
        label: "Trois candidats avec un vainqueur économique net",
        stdin: "cas:1",
        expected: "MEILLEUR: x1=12 x2=4 COUT=92",
        hint: "B(8,5) est irréalisable (R1=18 < 20). A(10,6) est réalisable et coûte 98 €. C(12,4) est réalisable et coûte 92 €. Le meilleur est C."
      },
      {
        label: "Candidats dont certains violent les seuils minimaux",
        stdin: "cas:2",
        expected: "MEILLEUR: x1=4 x2=3 COUT=18",
        hint: "A(2,2) et C(1,1) violent R1 (2*x1+1*x2 < 10). Seul B(4,3) est réalisable avec un coût de 3*4 + 2*3 = 18 €."
      },
      {
        label: "Aucun candidat ne satisfait l'ensemble des exigences",
        stdin: "cas:3",
        expected: "AUCUN_REALISABLE",
        hint: "A(5,5) apporte 25 < 50 sur R1. B(10,2) apporte 26 < 50 sur R1. C(2,8) apporte 28 < 50 sur R1. Tous sont éliminés."
      }
    ],
    solution: "[Exemple]\nMEILLEUR: x1=25 x2=10 COUT=160\n\n[Cas 1 — Trois candidats avec un vainqueur économique net]\nMEILLEUR: x1=12 x2=4 COUT=92\n\n[Cas 2 — Candidats dont certains violent les seuils minimaux]\nMEILLEUR: x1=4 x2=3 COUT=18\n\n[Cas 3 — Aucun candidat ne satisfait l'ensemble des exigences]\nAUCUN_REALISABLE\n"
  },
  {
    id: "ro2-c1-e4",
    chapter: 1,
    title: "Modélisation guidée d'un problème concret & contrainte d'égalité",
    level: "n2",
    language: "analyse",
    goal: "Traduire un énoncé verbal industriel en composantes formelles : fonction objectif, contraintes de ressources, contrainte d'égalité stricte et positivité.",
    brief: "<p>Une usine assemble deux modèles de panneaux solaires : <strong>Standard ($x_1$, unités/jour)</strong> et <strong>Premium ($x_2$, unités/jour)</strong>.</p><ul><li>Marge unitaire nette : <strong>40 €</strong> par Standard et <strong>70 €</strong> par Premium.</li><li>Cellules photovoltaïques : le modèle Standard consomme <strong>4 cellules</strong> et le Premium <strong>8 cellules</strong>, pour un approvisionnement journalier plafonné à <strong>800 cellules</strong>.</li><li>Contrôle qualité : le Standard requiert <strong>2 minutes</strong> de banc de test et le Premium <strong>3 minutes</strong>, avec une capacité maximale d’atelier de <strong>360 minutes/jour</strong>.</li><li><strong>Engagement contractuel strict (contrainte d'égalité) :</strong> un contrat ferme impose de livrer <em>exactement</em> <strong>50 panneaux Standard</strong> par jour ($x_1 = 50$). Une contrainte d’égalité traduit une obligation absolue sans aucune tolérance de sous- ou sur-production.</li></ul><p>Pour chaque cas ci-dessous, écrivez la formule mathématique canonique correspondante.</p>",
    starter: "# Grille d'analyse (ro2-c1-e4) — Modélisation guidée & contrainte d'égalité\n# Formalisez chaque composante demandée à partir de l'énoncé :\n\n[Cas 1 — Définition de la fonction objectif]\n# Énoncé : Maximiser la marge totale quotidienne (Standard: 40 €, Premium: 70 €)\n# Format attendu : MAX Z = 40*x1 + 70*x2\nA_COMPLETER\n\n[Cas 2 — Contrainte de ressource en cellules]\n# Énoncé : 4 cellules par Standard, 8 par Premium, stock disponible <= 800 cellules\n# Format attendu : 4*x1 + 8*x2 <= 800\nA_COMPLETER\n\n[Cas 3 — Contrainte d'engagement contractuel strict]\n# Énoncé : Engagement ferme de livrer exactement 50 panneaux Standard chaque jour\n# Format attendu : x1 = 50\nA_COMPLETER\n",
    hints: [
      "Identifiez le sens d'optimisation (MAX pour une marge ou profit, MIN pour un coût) et veillez à associer chaque coefficient à la bonne variable de décision.",
      "Pour une limitation de stock ou d'heures, utilisez le symbole <=. Pour un quota ou engagement strict sans dépassement ni déficit, utilisez l'égalité pure (=). Écrivez l'expression sans espaces superflus (ex: 4*x1 + 8*x2 <= 800)."
    ],
    examples: [
      {
        stdin: "ex:1",
        expected: "2*x1 + 3*x2 <= 360",
        note: "Contrainte de banc d'essai : 2 min par Standard et 3 min par Premium, capacité 360 min. Formule : 2*x1 + 3*x2 <= 360."
      }
    ],
    tests: [
      {
        label: "Définition de la fonction objectif",
        stdin: "cas:1",
        expected: "MAX Z = 40*x1 + 70*x2",
        hint: "L'objectif économique est de maximiser la marge : MAX Z = 40*x1 + 70*x2."
      },
      {
        label: "Contrainte de ressource en cellules",
        stdin: "cas:2",
        expected: "4*x1 + 8*x2 <= 800",
        hint: "Consommation totale 4*x1 + 8*x2 bornée par le plafond disponible : 4*x1 + 8*x2 <= 800."
      },
      {
        label: "Contrainte d'engagement contractuel strict",
        stdin: "cas:3",
        expected: "x1 = 50",
        hint: "Un engagement contractuel exact sans marge se modélise par une égalité stricte : x1 = 50."
      }
    ],
    solution: "[Exemple]\n2*x1 + 3*x2 <= 360\n\n[Cas 1 — Définition de la fonction objectif]\nMAX Z = 40*x1 + 70*x2\n\n[Cas 2 — Contrainte de ressource en cellules]\n4*x1 + 8*x2 <= 800\n\n[Cas 3 — Contrainte d'engagement contractuel strict]\nx1 = 50\n"
  },
  {
    id: "ro2-c1-e5",
    chapter: 1,
    title: "Validation des 4 hypothèses fondamentales & typologie des variables",
    level: "n3",
    language: "analyse",
    goal: "Identifier les 4 hypothèses de Dantzig (proportionnalité, additivité, divisibilité, certitude), reconnaître leurs violations et distinguer variables continues et binaires/entières.",
    brief: "<p>Tout programme linéaire continu repose sur <strong>quatre hypothèses fondamentales</strong> établies par George Dantzig :</p><ul><li><strong>1. Proportionnalité :</strong> la contribution de chaque variable est strictement linéaire ($c_j x_j$ et $a_{ij} x_j$), excluant toute remise sur volume ou coût fixe de lancement.</li><li><strong>2. Additivité :</strong> l’effet global est la somme pure des effets individuels, sans synergie ni interaction croisée ($x_1 \\cdot x_2$ est proscrit).</li><li><strong>3. Divisibilité :</strong> les variables peuvent prendre n'importe quelle valeur réelle positive ($x_j \\in \\mathbb{R}^+$).</li><li><strong>4. Certitude :</strong> l'ensemble des coefficients ($c_j, a_{ij}, b_i$) est connu de manière déterministe et exacte.</li></ul><div class=\"box box--warning\"><div class=\"box__title\">Distinction clé : variables binaires et entières</div><p>Lorsque la divisibilité est rompue (choix binaire d’investissement $x_j \\in \\{0, 1\\}$ ou unités indivisibles $x_j \\in \\mathbb{N}$), le modèle devient un <strong>Programme Linéaire en Nombres Entiers (PLNE / MIP)</strong>. Ce problème est combinatoire et NP-difficile : l’algorithme du simplexe standard continu ne peut pas s'y appliquer directement sans méthode de séparation et évaluation (Branch &amp; Bound).</p></div><p>Pour chaque cas ci-dessous, nommez l’hypothèse violée (PROPORTIONNALITE, ADDITIVITE, DIVISIBILITE, CERTITUDE) ou le type de modèle requis (PLNE).</p>",
    starter: "# Grille d'analyse (ro2-c1-e5) — 4 hypothèses & nature des variables\n# Identifiez la notion ou l'hypothèse mise en jeu pour chaque situation :\n\n[Cas 1 — Remise sur volume chez le fournisseur de bois]\n# Situation : Le fournisseur accorde 20 % de réduction sur le prix du bois au-delà de 100 m² achetés\n# Hypothèse violée parmi (proportionnalité / additivité / divisibilité / certitude) :\nA_COMPLETER\n\n[Cas 2 — Choix d'ouverture d'un nouvel entrepôt logistique]\n# Situation : Décision binaire « ouvrir (1) ou ne pas ouvrir (0) le site de Lyon »\n# Type de modèle : Programmation continue standard ou Programmation en nombres entiers (PLNE) ?\nA_COMPLETER\n\n[Cas 3 — Fluctuations imprévisibles du coût de l'électricité sur le marché spot]\n# Situation : Le tarif du kWh varie chaque heure selon une loi de probabilité météo\n# Hypothèse violée parmi (proportionnalité / additivité / divisibilité / certitude) :\nA_COMPLETER\n",
    hints: [
      "Rappelez-vous les définitions : proportionnalité = coût unitaire constant sans palier ; additivité = pas de produit croisé x1*x2 ; divisibilité = grandeurs fractionnaires autorisées ; certitude = coefficients déterministes non aléatoires.",
      "Pour le cas 1, le prix qui diminue avec la quantité viole la proportionnalité. Pour le cas 2, un choix binaire {0, 1} relève de la programmation en nombres entiers (PLNE). Répondez en un mot clé en majuscules."
    ],
    examples: [
      {
        stdin: "ex:1",
        expected: "ADDITIVITE",
        note: "Deux produits dont le mélange dégage une réaction thermique égale à 3*x1*x2 : le terme non linéaire croisé viole l'hypothèse d'additivité."
      }
    ],
    tests: [
      {
        label: "Remise sur volume chez le fournisseur de bois",
        stdin: "cas:1",
        expected: "PROPORTIONNALITE",
        hint: "Un tarif dégressif brise la constance du coefficient unitaire cj et viole l'hypothèse de proportionnalité."
      },
      {
        label: "Choix d'ouverture d'un nouvel entrepôt logistique",
        stdin: "cas:2",
        expected: "PLNE",
        hint: "Une décision tout-ou-rien {0, 1} est discrète et relève de la Programmation Linéaire en Nombres Entiers (PLNE / MIP)."
      },
      {
        label: "Fluctuations imprévisibles du coût de l'électricité sur le marché spot",
        stdin: "cas:3",
        expected: "CERTITUDE",
        hint: "L'aléa sur les paramètres relève de l'optimisation stochastique et viole l'hypothèse de certitude déterministe."
      }
    ],
    solution: "[Exemple]\nADDITIVITE\n\n[Cas 1 — Remise sur volume chez le fournisseur de bois]\nPROPORTIONNALITE\n\n[Cas 2 — Choix d'ouverture d'un nouvel entrepôt logistique]\nPLNE\n\n[Cas 3 — Fluctuations imprévisibles du coût de l'électricité sur le marché spot]\nCERTITUDE\n"
  }
];
