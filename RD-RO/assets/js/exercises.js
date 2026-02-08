/*
 * EXERCISE ENGINE & DATA - "EMERALD PRESTIGE" EDITION (FULL CONTENT)
 * ------------------------------------------------------------------
 * Contraintes respectées par chapitre :
 * - 5 Questions Guidées (Guided)
 * - 10 Questions Quiz (MCQ/QA)
 * - 3 Exercices Drag & Drop
 * 
 * Theme: André le Menuisier & Storytelling
 */

const exerciseData = {
    // =========================================================================
    // CHAPITRE 1 : FONDAMENTAUX
    // =========================================================================
    "chapitre1.html": {
        guided: [
            {
                question: "Qui est le 'Père' fondateur de la Recherche Opérationnelle moderne ?",
                hints: ["C'est un mathématicien américain.", "Il a travaillé pour l'US Air Force en 1947.", "Son nom commence par D."],
                correction: "George Dantzig. Il a inventé l'algorithme du Simplexe."
            },
            {
                question: "Quel conflit mondial a provoqué l'essor de la R.O. ?",
                hints: ["Il fallait optimiser les radars et les convois.", "C'était dans les années 40.", "C'est la Seconde..."],
                correction: "La Seconde Guerre Mondiale (WWII). L'armée britannique a créé les premières équipes de 'Research on Operations'."
            },
            {
                question: "Quelle est la différence fondamentale entre André (l'artisan) et IKEA (l'industrie) ?",
                hints: ["André utilise son intuition.", "IKEA ne peut pas gérer 50 pays au feeling.", "L'un utilise des maths, l'autre non."],
                correction: "L'échelle et la complexité. L'intuition suffit pour l'artisanat, mais l'optimisation mathématique est nécessaire pour l'industrie."
            },
            {
                question: "En un mot, que cherche toujours à atteindre la R.O. ?",
                hints: ["Pas juste une 'bonne' solution.", "La MEILLEURE solution possible.", "Un mot qui commence par O."],
                correction: "L'Optimum (ou une solution Optimale)."
            },
            {
                question: "Citez un domaine moderne où la R.O. est indispensable.",
                hints: ["Comment votre colis Amazon arrive-t-il ?", "Comment Air France gère ses pilotes ?", "Les réseaux électriques."],
                correction: "La Logistique, le Transport, l'Énergie, ou la Finance."
            }
        ],
        quiz: [
            { type: "mcq", q: "La R.O., c'est :", options: ["De la magie noire", "L'aide à la décision par la méthode scientifique", "Juste des statistiques"], correct: 1 },
            { type: "mcq", q: "Ford W. Harris (1913) a travaillé sur :", options: ["La bombe atomique", "La gestion des stocks", "Le marketing"], correct: 1 },
            { type: "qa", q: "Quel est l'acronyme anglais de Recherche Opérationnelle ?", valid: ["or", "operations research"] },
            { type: "mcq", q: "Une heuristique garantit-elle la solution optimale ?", options: ["Oui, toujours", "Non, c'est une méthode approchée", "Seulement le mardi"], correct: 1 },
            { type: "mcq", q: "L'algorithme du Simplexe sert à résoudre des problèmes :", options: ["Linéaires", "Quadratiques", "Psychologiques"], correct: 0 },
            { type: "qa", q: "Complétez : La R.O. modélise des problèmes pour prendre de meilleures _______.", valid: ["décisions", "decisions"] },
            { type: "mcq", q: "Le 'Voyageur de Commerce' est un problème célèbre de :", options: ["Tourisme", "Optimisation de trajet (Graphes)", "Vente pyramidale"], correct: 1 },
            { type: "qa", q: "En quelle année Dantzig a-t-il publié le Simplexe ?", valid: ["1947"] },
            { type: "mcq", q: "Kantorovitch est un précurseur venu de :", options: ["USA", "URSS (Russie)", "France"], correct: 1 },
            { type: "qa", q: "Le but est de maximiser le profit ou minimiser le _______.", valid: ["coût", "cout", "frais"] }
        ],
        dragdrop: [
            {
                title: "Frise Chronologique",
                items: [
                    { id: "d1", text: "1913 (Stocks)", match: "z1" },
                    { id: "d2", text: "1939-45 (Radars)", match: "z2" },
                    { id: "d3", text: "1947 (Simplexe)", match: "z3" }
                ],
                zones: [
                    { id: "z1", label: "Précurseurs (Harris)" },
                    { id: "z2", label: "Naissance Militaire" },
                    { id: "z3", label: "L'Âge d'Or (Dantzig)" }
                ]
            },
            {
                title: "Intuition vs Science",
                items: [
                    { id: "d4", text: "Au feeling", match: "z4" },
                    { id: "d5", text: "Modèle Mathématique", match: "z5" },
                    { id: "d6", text: "Solution Optimale", match: "z5" },
                    { id: "d7", text: "Ça devrait aller", match: "z4" }
                ],
                zones: [
                    { id: "z4", label: "Approche Artisanale" },
                    { id: "z5", label: "Approche R.O." }
                ]
            },
            {
                title: "Secteurs d'Application",
                items: [
                    { id: "d8", text: "Trajet Camions", match: "z6" },
                    { id: "d9", text: "Gestion Portefeuille", match: "z7" },
                    { id: "d10", text: "Planning Urgences", match: "z8" }
                ],
                zones: [
                    { id: "z6", label: "Logistique" },
                    { id: "z7", label: "Finance" },
                    { id: "z8", label: "Santé" }
                ]
            }
        ]
    },

    // =========================================================================
    // CHAPITRE 2 : MONDE LINÉAIRE
    // =========================================================================
    "chapitre2.html": {
        guided: [
            { question: "Qu'est-ce que l'hypothèse de Proportionnalité ?", hints: ["Si 1 table = 50€, 10 tables = ?", "C'est linéaire.", "Pas de rabais."], correction: "La contribution d'une variable à l'objectif est proportionnelle à sa valeur (pas d'effet d'échelle)." },
            { question: "Qu'est-ce que l'hypothèse d'Additivité ?", hints: ["Le total est la somme...", "1+1=2", "Pas d'interaction magique."], correction: "La valeur totale est la somme des contributions individuelles (Z = Profit Tables + Profit Chaises)." },
            { question: "L'hypothèse de Divisibilité accepte-t-elle les nombres à virgule ?", hints: ["Peut-on produire 3.5 litres d'huile ?", "Oui.", "Contrairement aux nombres entiers."], correction: "Oui, les variables peuvent prendre n'importe quelle valeur réelle (fractionnaire)." },
            { question: "L'hypothèse de Certitude signifie que...", hints: ["Pas de hasard.", "On connait les prix.", "Pas de probabilités."], correction: "Tous les paramètres (prix, temps, stock) sont connus et constants." },
            { question: "Pourquoi x*y n'est PAS linéaire ?", hints: ["C'est une multiplication de variables.", "Ça crée des courbes.", "Linéaire = droites."], correction: "Car c'est une interaction entre variables. En linéaire, on ne peut que multiplier par des constantes." }
        ],
        quiz: [
            { type: "mcq", q: "3x + 2y = 10 est une équation :", options: ["Linéaire", "Non-Linéaire", "Impossible"], correct: 0 },
            { type: "mcq", q: "x² + y = 5 est :", options: ["Linéaire", "Non-Linéaire (Quadratique)", "Une inéquation"], correct: 1 },
            { type: "qa", q: "Si je vends 10 tables avec 10% de remise sur le lot, est-ce linéaire ?", valid: ["non"] },
            { type: "mcq", q: "L'hypothèse de non-négativité impose :", options: ["x < 0", "x = 0", "x >= 0"], correct: 2 },
            { type: "qa", q: "Un problème linéaire peut-il avoir des coefficients négatifs ?", valid: ["oui"] },
            { type: "mcq", q: "Laquelle est une fonction linéaire ?", options: ["sin(x)", "e^x", "5x - 2y"], correct: 2 },
            { type: "mcq", q: "Dans un PL, les exposants des variables sont toujours :", options: ["0", "1", "2"], correct: 1 },
            { type: "qa", q: "Si on ne peut fabriquer que des nombres entiers de tables, c'est de la Prog. en Nombres _______.", valid: ["entiers", "entier"] },
            { type: "mcq", q: "La certitude implique qu'il n'y a pas de :", options: ["Contraintes", "Variables", "Aléas"], correct: 2 },
            { type: "qa", q: "Le 'L' de PL signifie...", valid: ["linéaire", "lineaire"] }
        ],
        dragdrop: [
            {
                title: "Trier les Équations",
                items: [
                    { id: "d1", text: "3x + 4y", match: "z1" },
                    { id: "d2", text: "x/y = 2", match: "z2" },
                    { id: "d3", text: "x² + 4", match: "z2" },
                    { id: "d4", text: "x - 5y + z", match: "z1" }
                ],
                zones: [
                    { id: "z1", label: "Linéaire (OK)" },
                    { id: "z2", label: "Non-Linéaire (KO)" }
                ]
            },
            {
                title: "Associer Hypothèses",
                items: [
                    { id: "d5", text: "Prix fixe unitaire", match: "z3" },
                    { id: "d6", text: "Total = Somme des parties", match: "z4" }
                ],
                zones: [
                    { id: "z3", label: "Proportionnalité" },
                    { id: "z4", label: "Additivité" }
                ]
            },
            {
                title: "Nature des Variables",
                items: [
                    { id: "d7", text: "Continu (Réel)", match: "z5" },
                    { id: "d8", text: "Discret (Entier)", match: "z6" }
                ],
                zones: [
                    { id: "z5", label: "Divisibilité (PL)" },
                    { id: "z6", label: "Nombres Entiers (PLNE)" }
                ]
            }
        ]
    },

    // =========================================================================
    // CHAPITRE 3 : MODÉLISATION
    // =========================================================================
    "chapitre3.html": {
        guided: [
            { question: "Quel est le 'Levier de Commande' d'André ?", hints: ["Ce qu'il décide.", "x1, x2...", "Ingrédient 1."], correction: "Les Variables de Décision (quantités à produire)." },
            { question: "Que représente le 'Mur de la Réalité' ?", hints: ["Stock limité.", "Temps limité.", "Ingrédient 2."], correction: "Les Contraintes (ressources limitées)." },
            { question: "Quel est la 'Définition du Succès' ?", hints: ["Max Z.", "Le but du jeu.", "Ingrédient 3."], correction: "La Fonction Objectif (Maximiser profit ou Minimiser coût)." },
            { question: "Traduisez mathématiquement : 'Le temps de ponçage ne doit pas dépasser 40h'.", hints: ["<=", "Temps ponçage total.", "40."], correction: "ax1 + bx2 <= 40" },
            { question: "Traduisez mathématiquement : 'Il faut produire au moins 10 tables'.", hints: [">=", "Minimum.", "x1."], correction: "x1 >= 10" }
        ],
        quiz: [
            { type: "mcq", q: "Max Z = 50x1 + 30x2. Que sont 50 et 30 ?", options: ["Des variables", "Des coefficients économiques", "Des stocks"], correct: 1 },
            { type: "mcq", q: "Une contrainte de capacité ('ne pas dépasser') s'écrit :", options: ["<=", ">=", "="], correct: 0 },
            { type: "mcq", q: "Une contrainte de demande minimale ('au moins') s'écrit :", options: ["<=", ">=", "="], correct: 1 },
            { type: "qa", q: "Si x1 est le nombre de tables, quelle est son unité ?", valid: ["tables", "unité", "pièce"] },
            { type: "qa", q: "Si Z est un profit, son unité est souvent...", valid: ["euros", "dollars", "monnaie", "argent"] },
            { type: "mcq", q: "Dans 'ax <= b', que représente 'b' ?", options: ["Le profit unitaire", "La disponibilité (RHS)", "Une inconnue"], correct: 1 },
            { type: "mcq", q: "Quel symbole pour 'strictement supérieur' ?", options: [">", ">=", "<"], correct: 0 },
            { type: "qa", q: "En PL, on utilise rarement les inégalités strictes (> ou <). Vrai ou Faux ?", valid: ["vrai"] },
            { type: "mcq", q: "Un problème de régime alimentaire (Diète) cherche généralement à :", options: ["Maximiser les calories", "Minimiser le coût", "Maximiser le poids"], correct: 1 },
            { type: "qa", q: "Combien d'ingrédients a la recette de modélisation ?", valid: ["3", "trois"] }
        ],
        dragdrop: [
            {
                title: "Les 3 Ingrédients",
                items: [
                    { id: "d1", text: "x, y, z", match: "z1" },
                    { id: "d2", text: "Max 5x + 3y", match: "z2" },
                    { id: "d3", text: "2x + y <= 10", match: "z3" }
                ],
                zones: [
                    { id: "z1", label: "Variables" },
                    { id: "z2", label: "Objectif" },
                    { id: "z3", label: "Contraintes" }
                ]
            },
            {
                title: "Vocabulaire Français -> Maths",
                items: [
                    { id: "d4", text: "Au maximum", match: "z4" },
                    { id: "d5", text: "Au minimum", match: "z5" },
                    { id: "d6", text: "Exactement", match: "z6" }
                ],
                zones: [
                    { id: "z4", label: "<=" },
                    { id: "z5", label: ">=" },
                    { id: "z6", label: "=" }
                ]
            },
            {
                title: "Paramètres vs Variables",
                items: [
                    { id: "d7", text: "Prix de vente", match: "z7" },
                    { id: "d8", text: "Quantité produite", match: "z8" },
                    { id: "d9", text: "Stock disponible", match: "z7" }
                ],
                zones: [
                    { id: "z7", label: "Paramètre (Donnée)" },
                    { id: "z8", label: "Variable (Décision)" }
                ]
            }
        ]
    },

    // =========================================================================
    // CHAPITRE 4 : FORME STANDARD
    // =========================================================================
    "chapitre4.html": {
        guided: [
            { question: "Pourquoi a-t-on besoin de la Forme Standard ?", hints: ["Le Simplexe est rigide.", "Il n'aime pas les inégalités.", "Il veut des..."], correction: "Pour transformer un problème géométrique (inégalités) en système d'équations (égalités) résolvable par le Simplexe." },
            { question: "Que devient une contrainte '<=' ?", hints: ["Il manque quelque chose pour arriver à l'égalité.", "On ajoute...", "Une variable d'écart."], correction: "On ajoute une variable d'écart (+ e)." },
            { question: "Que devient une contrainte '>=' ?", hints: ["Il y a trop.", "On retire l'excédent.", "Et on ajoute une artificielle."], correction: "On soustrait une variable d'excédent (- e) et on ajoute une variable artificielle (+ a)." },
            { question: "Si j'ai Min Z, comment je le transforme en Max ?", hints: ["Miroir.", "Négatif.", "Max -Z."], correction: "On Maximise (-Z)." },
            { question: "Que signifie e = 2 dans la solution finale ?", hints: ["e est l'écart.", "Stock restant.", "Ressource inutilisée."], correction: "Il reste 2 unités de ressource inutilisées (Marge)." }
        ],
        quiz: [
            { type: "mcq", q: "Dans la forme standard, les variables doivent être :", options: ["Négatives", "Positives ou Nulles (>=0)", "Libres"], correct: 1 },
            { type: "mcq", q: "Dans la forme standard, les contraintes sont des :", options: ["Inégalités", "Égalités (=)", "Fonctions"], correct: 1 },
            { type: "qa", q: "Quel coefficient a une variable d'écart dans la Fonction Objectif ?", valid: ["0", "zéro", "null"] },
            { type: "mcq", q: "La variable artificielle sert à :", options: ["Démarrer le Simplexe (Point de départ)", "Augmenter le profit", "Rien"], correct: 0 },
            { type: "mcq", q: "Une variable 'libre' (sans signe) est remplacée par :", options: ["x' - x''", "x²", "-x"], correct: 0 },
            { type: "qa", q: "Si la contrainte est saturée (utilisée à 100%), la variable d'écart vaut...", valid: ["0", "zero"] },
            { type: "mcq", q: "Le RHS (terme de droite) doit toujours être :", options: ["Positif", "Négatif", "Nul"], correct: 0 },
            { type: "qa", q: "Notation classique d'une variable d'écart ?", valid: ["e", "s", "slack"] },
            { type: "mcq", q: "La Forme Canonique est faite de :", options: ["Égalités", "Inégalités", "Courbes"], correct: 1 },
            { type: "qa", q: "Minimiser le coût revient à maximiser le coût ______.", valid: ["négatif", "negatif", "opposé"] }
        ],
        dragdrop: [
            {
                title: "Transformation des Signes",
                items: [
                    { id: "d1", text: "<=", match: "z1" },
                    { id: "d2", text: ">=", match: "z2" },
                    { id: "d3", text: "=", match: "z3" }
                ],
                zones: [
                    { id: "z1", label: "+ e (Écart)" },
                    { id: "z2", label: "- e + a (Excédent+Artif)" },
                    { id: "z3", label: "+ a (Artificielle)" }
                ]
            },
            {
                title: "Utilité des Variables",
                items: [
                    { id: "d4", text: "Production (x)", match: "z4" },
                    { id: "d5", text: "Reste de Stock (e)", match: "z5" },
                    { id: "d6", text: "Démarrage Maths (a)", match: "z6" }
                ],
                zones: [
                    { id: "z4", label: "Décision" },
                    { id: "z5", label: "Écart" },
                    { id: "z6", label: "Artificielle" }
                ]
            },
            {
                title: "Formes",
                items: [
                    { id: "d7", text: "Ax <= b", match: "z7" },
                    { id: "d8", text: "Ax = b", match: "z8" }
                ],
                zones: [
                    { id: "z7", label: "Canonique" },
                    { id: "z8", label: "Standard" }
                ]
            }
        ]
    },

    // =========================================================================
    // CHAPITRE 5 : LES TYPES DE SOLUTIONS
    // =========================================================================
    "chapitre5.html": {
        guided: [
            {
                question: "Qu'est-ce qu'une solution réalisable ?",
                hints: ["C'est un point qui respecte les règles.", "Toutes les contraintes sont satisfaites.", "Le mot clé est 'toutes'."],
                correction: "Une solution réalisable est un point (x1, x2, ...) qui satisfait TOUTES les contraintes du problème, y compris la non-négativité."
            },
            {
                question: "Qu'est-ce qu'une solution de base (SB) ?",
                hints: ["C'est liée au nombre de contraintes.", "On annule certaines variables.", "Le nombre de variables non-nulles est limité."],
                correction: "Une solution de base est obtenue en fixant (n−m) variables à zéro et en résolvant le système restant. Elle a au plus m variables non-nulles (m = nombre de contraintes)."
            },
            {
                question: "Une solution de base est-elle toujours réalisable ? Pourquoi ?",
                hints: ["Les valeurs qu'on trouve peuvent être négatives.", "Le Simplexe n'accepte que les positives.", "Il y a un adjectif important."],
                correction: "Non ! Une SB peut avoir des composantes négatives. Si toutes ses composantes sont >= 0, c'est une Solution de Base Réalisable (SBR)."
            },
            {
                question: "Pourquoi la solution optimale est-elle forcément sur un sommet ?",
                hints: ["C'est le Théorème Fondamental de la PL.", "Le domaine réalisable est un polyèdre convexe.", "Les sommets = solutions de base réalisables."],
                correction: "Théorème Fondamental : Si le problème a une solution optimale, alors au moins un sommet (SBR) est optimal. Le Simplexe exploite ce fait en parcourant les sommets."
            },
            {
                question: "Que signifie un problème en 'dégénérescence' ?",
                hints: ["Une variable de base vaut zéro.", "Ça complique le Simplexe.", "Plusieurs bases donnent le même sommet."],
                correction: "Un problème est dégénéré quand une SBR a une variable de base égale à zéro. Géométriquement, plus de n contraintes passent par le même sommet."
            }
        ],
        quiz: [
            { type: "mcq", q: "Une solution réalisable respecte :", options: ["La fonction objectif", "Toutes les contraintes", "Seulement les contraintes d'égalité"], correct: 1 },
            { type: "mcq", q: "Combien de variables non-nulles a une solution de base (m contraintes, n variables) ?", options: ["n variables", "m variables au plus", "Toujours n − m"], correct: 1 },
            { type: "qa", q: "Complétez : Si toutes les composantes d'une SB sont ≥ 0, on l'appelle une Solution de Base _______.", valid: ["réalisable", "realisable", "Réalisable"] },
            { type: "mcq", q: "Le Théorème Fondamental de la PL garantit que :", options: ["L'optimum est au centre du domaine", "L'optimum est toujours sur un sommet (si existant)", "Il n'y a jamais de solution optimale"], correct: 1 },
            { type: "mcq", q: "Un polyèdre convexe a des solutions optimales :", options: ["Uniquement à l'intérieur", "Sur les arêtes seulement", "Sur au moins un sommet"], correct: 2 },
            { type: "qa", q: "Quel algorithme parcourt les sommets du polyèdre pour trouver l'optimum ?", valid: ["simplexe", "Simplexe", "le simplexe", "Le Simplexe", "algorithme du simplexe"] },
            { type: "mcq", q: "En dégénérescence, une variable de base vaut :", options: ["L'infini", "Zéro", "Un nombre négatif"], correct: 1 },
            { type: "mcq", q: "Combien de sommets (SBR) un problème avec 5 variables et 3 contraintes peut-il avoir au maximum ?", options: ["C(5,3) = 10", "5 × 3 = 15", "5 + 3 = 8"], correct: 0 },
            { type: "qa", q: "La région réalisable d'un PL est un ensemble géométrique de quelle forme ?", valid: ["polyèdre", "polytope", "polyèdre convexe", "polygone convexe", "Polyèdre"] },
            { type: "mcq", q: "Si un problème linéaire a des solutions optimales multiples, elles forment :", options: ["Un seul point isolé", "Un segment ou une face du polyèdre", "L'ensemble vide"], correct: 1 }
        ],
        dragdrop: [
            {
                title: "Types de Solutions",
                items: [
                    { id: "d1", text: "Respecte toutes les contraintes", match: "z1" },
                    { id: "d2", text: "Au plus m variables non-nulles", match: "z2" },
                    { id: "d3", text: "SB avec composantes ≥ 0", match: "z3" }
                ],
                zones: [
                    { id: "z1", label: "Solution Réalisable" },
                    { id: "z2", label: "Solution de Base" },
                    { id: "z3", label: "Solution de Base Réalisable" }
                ]
            },
            {
                title: "Théorème Fondamental",
                items: [
                    { id: "d4", text: "Optimum sur un sommet", match: "z4" },
                    { id: "d5", text: "Polyèdre convexe fermé", match: "z5" },
                    { id: "d6", text: "Parcourt les sommets", match: "z6" }
                ],
                zones: [
                    { id: "z4", label: "Théorème Fondamental" },
                    { id: "z5", label: "Domaine Réalisable" },
                    { id: "z6", label: "Algorithme Simplexe" }
                ]
            },
            {
                title: "Cas Particuliers",
                items: [
                    { id: "d7", text: "Variable de base = 0", match: "z7" },
                    { id: "d8", text: "Optimums sur une arête", match: "z8" },
                    { id: "d9", text: "Domaine vide", match: "z9" }
                ],
                zones: [
                    { id: "z7", label: "Dégénérescence" },
                    { id: "z8", label: "Solutions Multiples" },
                    { id: "z9", label: "Problème Infaisable" }
                ]
            }
        ]
    },

    // =========================================================================
    // CHAPITRE 6 : RÉSOLUTION GRAPHIQUE
    // =========================================================================
    "chapitre6.html": {
        guided: [
            { question: "La résolution graphique est limitée à combien de variables ?", hints: ["Combien de dimensions sur une feuille ?", "x1 et x2.", "2."], correction: "2 Variables uniquement (Plan 2D)." },
            { question: "Comment trace-t-on la droite 2x1 + x2 = 10 ?", hints: ["Il faut 2 points.", "Si x1=0, x2=?", "Si x2=0, x1=?"], correction: "On cherche les intersections avec les axes : (0, 10) et (5, 0)." },
            { question: "Qu'est-ce que le 'Domaine des Possibles' ?", hints: ["L'endroit où tout est respecté.", "L'espace blanc.", "L'intersection des contraintes."], correction: "L'ensemble des points qui respectent TOUTES les contraintes." },
            { question: "Qu'est-ce qu'une droite Iso-Profit ?", hints: ["Iso = Même.", "Profit = Z.", "Lignes parallèles."], correction: "Une droite représentant tous les mélanges (x1,x2) donnant le même profit Z." },
            { question: "Où se trouve géométriquement l'optimum ?", hints: ["Au milieu ?", "Non.", "Sur un Sommet."], correction: "Toujours sur un SOMMET (point extrême) du polygone des possibles." }
        ],
        quiz: [
            { type: "mcq", q: "L'axe horizontal représente généralement :", options: ["x1", "x2", "Z"], correct: 0 },
            { type: "mcq", q: "Si le domaine est vide :", options: ["Il n'y a pas de solution", "Z est infini", "0 est la solution"], correct: 0 },
            { type: "mcq", q: "Si le domaine est non-borné (ouvert vers l'infini) :", options: ["Z peut être infini", "Z est nul", "Impossible"], correct: 0 },
            { type: "qa", q: "Le domaine des possibles a souvent la forme d'un _______.", valid: ["polygone", "polyèdre"] },
            { type: "mcq", q: "Le vecteur gradient (vecteur normal à Z) pointe vers :", options: ["L'augmentation de Z", "La diminution de Z", "L'origine"], correct: 0 },
            { type: "qa", q: "Si l'Iso-Profit est parallèle à une contrainte, on a une _______ de solutions.", valid: ["infinité", "infinite", "foule"] },
            { type: "mcq", q: "On peut résoudre graphiquement avec 3 variables :", options: ["Oui (3D mais dur)", "Non impossible", "Facilement"], correct: 0 },
            { type: "qa", q: "La solution optimale est le ______ point touché par la règle en sortant.", valid: ["dernier"] },
            { type: "mcq", q: "L'intersection des demi-plans valides forme :", options: ["Un cercle", "Une région convexe", "Une étoile"], correct: 1 },
            { type: "qa", q: "Le point (0,0) est-il toujours dans le domaine admissible ?", valid: ["non"] }
        ],
        dragdrop: [
            {
                title: "Lecture du Graphique",
                items: [
                    { id: "d1", text: "Dans le Domaine", match: "z1" },
                    { id: "d2", text: "Hors Domaine", match: "z2" },
                    { id: "d3", text: "Sommet (Coin)", match: "z3" }
                ],
                zones: [
                    { id: "z1", label: "Admissible" },
                    { id: "z2", label: "Impossible" },
                    { id: "z3", label: "Candidat Optimum" }
                ]
            },
            {
                title: "Déplacement Droite Z",
                items: [
                    { id: "d4", text: "Vers le Haut/Droite", match: "z4" },
                    { id: "d5", text: "Vers le Bas/Gauche", match: "z5" }
                ],
                zones: [
                    { id: "z4", label: "Maximisation" },
                    { id: "z5", label: "Minimisation" }
                ]
            },
            {
                title: "Types de Solution",
                items: [
                    { id: "d6", text: "Point Unique", match: "z6" },
                    { id: "d7", text: "Segment entier", match: "z7" },
                    { id: "d8", text: "Aucun point", match: "z8" }
                ],
                zones: [
                    { id: "z6", label: "Optimum Unique" },
                    { id: "z7", label: "Optimums Multiples" },
                    { id: "z8", label: "Infaisable" }
                ]
            }
        ]
    },

    // =========================================================================
    // CHAPITRE 7 : LE SIMPLEXE
    // =========================================================================
    "chapitre7.html": {
        guided: [
            { question: "Le Simplexe est une méthode...", hints: ["Pas graphique.", "Pas aléatoire.", "Itérative (étape par étape)."], correction: "Algébrique et Itérative. Elle saute de sommet en sommet." },
            { question: "Au départ, quelles variables sont nulles ?", hints: ["On commence à l'origine.", "On ne produit rien.", "Les variables de décision."], correction: "Les variables de décision (Hors-Base). Seules les variables d'écart sont dans la base." },
            { question: "Comment choisit-on la Variable Entrante (Max Z) ?", hints: ["Celle qui rapporte le plus.", "Plus gros coeff.", "Dans la ligne Z."], correction: "Celle qui a le coefficient positif le plus grand (ou le plus négatif selon la forme) dans la fonction objectif." },
            { question: "Comment choisit-on la Variable Sortante ?", hints: ["Celle qui bloque en premier.", "Le Ratio.", "RHS div par Colonne."], correction: "Critère du Ratio Minimum Positif (RHS / Coeff Entrant)." },
            { question: "Quand s'arrête l'algorithme ?", hints: ["Quand on ne peut plus...", "Améliorer Z.", "Plus de coeff favorable."], correction: "Quand il n'y a plus de coefficient améliorant le profit dans la ligne Z." }
        ],
        quiz: [
            { type: "mcq", q: "Une itération du Simplexe correspond géométriquement à :", options: ["Un saut vers un sommet adjacent", "Un saut au hasard", "Rien"], correct: 0 },
            { type: "mcq", q: "Le PIVOT est l'intersection de :", options: ["Ligne Entrante / Col Sortante", "Col Entrante / Ligne Sortante", "Z et RHS"], correct: 1 },
            { type: "qa", q: "Diviser par zéro ou un nombre négatif dans le ratio est...", valid: ["interdit", "impossible"] },
            { type: "mcq", q: "Les variables dans la 'Base' ont une valeur :", options: ["Nulle (0)", "Non-Nulle (généralement)", "Négative"], correct: 1 },
            { type: "mcq", q: "Les variables 'Hors-Base' ont une valeur :", options: ["Nulle (0)", "Infinie", "1"], correct: 0 },
            { type: "qa", q: "On utilise la méthode du Pivot de _______ pour recalculer le tableau.", valid: ["gauss"] },
            { type: "mcq", q: "Si aucun ratio n'est limitant (tous négatifs/infinis), la solution est :", options: ["Optimale", "Non-bornée (Infinie)", "Nulle"], correct: 1 },
            { type: "qa", q: "Dans un problème de MAX, on cherche le coefficient le plus ______ pour entrer.", valid: ["grand", "positif", "eleve"] },
            { type: "mcq", q: "Le Simplexe visite-t-il tous les sommets ?", options: ["Oui tous", "Non, seulement ceux qui améliorent Z", "Aucun"], correct: 1 },
            { type: "qa", q: "Le RHS peut-il devenir négatif ?", valid: ["non"] }
        ],
        dragdrop: [
            {
                title: "Rôles dans l'Algorithme",
                items: [
                    { id: "d1", text: "Colonne Pivot", match: "z1" },
                    { id: "d2", text: "Ligne Pivot", match: "z2" },
                    { id: "d3", text: "Intersection", match: "z3" }
                ],
                zones: [
                    { id: "z1", label: "Variable Entrante" },
                    { id: "z2", label: "Variable Sortante" },
                    { id: "z3", label: "Élément Pivot" }
                ]
            },
            {
                title: " Terminologie",
                items: [
                    { id: "d4", text: "Base", match: "z4" },
                    { id: "d5", text: "Hors-Base", match: "z5" },
                    { id: "d6", text: "Itération", match: "z6" }
                ],
                zones: [
                    { id: "z4", label: "Vars actives (!=0)" },
                    { id: "z5", label: "Vars inactives (=0)" },
                    { id: "z6", label: "Une étape de calcul" }
                ]
            },
            {
                title: "Logique Poussée",
                items: [
                    { id: "d7", text: "Ratio Min", match: "z7" },
                    { id: "d8", text: "Coût Réduit Max", match: "z8" }
                ],
                zones: [
                    { id: "z7", label: "Contrainte la plus serrée" },
                    { id: "z8", label: "Meilleure opportunité de gain" }
                ]
            }
        ]
    },

    // =========================================================================
    // CHAPITRE 8 : DUALITÉ
    // =========================================================================
    "chapitre8.html": {
        guided: [
            {
                question: "Qu'est-ce que le programme Dual d'un Primal ?",
                hints: ["C'est le 'miroir' mathématique.", "Max ↔ Min, ≤ ↔ ≥.", "Les coefficients se transposent."],
                correction: "Le Dual est un second PL construit en transposant la matrice A, en échangeant l'objectif (Max↔Min), les sens des contraintes (≤ ↔ ≥), et en permutant les rôles de b et c."
            },
            {
                question: "Que dit le Théorème de la Dualité Forte ?",
                hints: ["Ça concerne les valeurs optimales.", "Z* et W*.", "Elles sont..."],
                correction: "Théorème de Dualité Forte : si le Primal et le Dual ont des solutions réalisables, alors Z* = W* (les valeurs optimales sont égales)."
            },
            {
                question: "Qu'est-ce qu'un prix fictif (shadow price) et que mesure-t-il ?",
                hints: ["C'est la variable Duale optimale yᵢ*.", "Combien gagnerait-on en augmentant la ressource ?", "Valeur marginale."],
                correction: "Le prix fictif yᵢ* mesure la variation de la fonction objectif Z* quand la disponibilité de la ressource i augmente d'une unité. C'est la valeur marginale de la contrainte."
            },
            {
                question: "Si le prix fictif d'une ressource est nul, que cela signifie-t-il ?",
                hints: ["La contrainte est-elle active ?", "Il reste du stock.", "Ajouter plus ne sert à rien."],
                correction: "La ressource n'est PAS saturée (il y a un surplus). L'augmenter n'améliorerait pas Z — elle est non-critique."
            },
            {
                question: "Expliquez la relation entre le nombre de variables/contraintes du Primal et du Dual.",
                hints: ["n variables Primal → ?", "m contraintes Primal → ?", "Ça s'inverse."],
                correction: "n variables Primal → n contraintes Dual. m contraintes Primal → m variables Dual. La matrice est transposée."
            }
        ],
        quiz: [
            { type: "mcq", q: "Si le Primal est un Max, le Dual est :", options: ["Un Max aussi", "Un Min", "Indéterminé"], correct: 1 },
            { type: "mcq", q: "La Dualité Forte affirme que :", options: ["Z* ≥ W*", "Z* = W*", "Z* ≤ W*"], correct: 1 },
            { type: "qa", q: "Comment appelle-t-on la variable Duale qui mesure la valeur marginale d'une ressource ?", valid: ["prix fictif", "shadow price", "Prix fictif", "prix dual", "variable duale"] },
            { type: "mcq", q: "Si yᵢ* > 0, la contrainte i est :", options: ["Non saturée (surplus > 0)", "Saturée (surplus = 0)", "Inexistante"], correct: 1 },
            { type: "mcq", q: "Combien de variables a le Dual si le Primal a 3 contraintes ?", options: ["3", "Dépend de n", "Impossible à dire"], correct: 0 },
            { type: "qa", q: "Complétez : Les contraintes ≤ du Primal deviennent des contraintes _______ dans le Dual.", valid: [">=", "≥", "supérieures ou égales", "plus grand ou égal"] },
            { type: "mcq", q: "La Dualité Faible garantit que :", options: ["Z ≤ W pour toute paire réalisable", "Z = W toujours", "Le Dual n'a pas de solution"], correct: 0 },
            { type: "mcq", q: "Quel théorème lie les écarts complémentaires du Primal et du Dual ?", options: ["Théorème du Simplexe", "Théorème des Écarts Complémentaires", "Théorème de Gauss"], correct: 1 },
            { type: "qa", q: "Si une variable Primal xⱼ* > 0, l'écart complémentaire impose que la contrainte j du Dual est :", valid: ["saturée", "active", "égalité", "Saturée"] },
            { type: "mcq", q: "Le Dual du Dual est :", options: ["Le Dual lui-même", "Le Primal original", "Un nouveau problème"], correct: 1 }
        ],
        dragdrop: [
            {
                title: "Miroir Primal / Dual",
                items: [
                    { id: "d1", text: "Max Z", match: "z1" },
                    { id: "d2", text: "Contraintes <=", match: "z3" },
                    { id: "d3", text: "RHS (b)", match: "z2" }
                ],
                zones: [
                    { id: "z1", label: "Min W" },
                    { id: "z3", label: "Variables >=" },
                    { id: "z2", label: "Obj (C) Dual" }
                ]
            },
            {
                title: "Interprétation Éco",
                items: [
                    { id: "d4", text: "Prix Fictif > 0", match: "z4" },
                    { id: "d5", text: "Prix Fictif = 0", match: "z5" }
                ],
                zones: [
                    { id: "z4", label: "Ressource Critique (Saturée)" },
                    { id: "z5", label: "Ressource Abondante (Reste)" }
                ]
            },
            {
                title: "Correspondances",
                items: [
                    { id: "d6", text: "Nb Variables Primal", match: "z6" },
                    { id: "d7", text: "Nb Contraintes Primal", match: "z7" }
                ],
                zones: [
                    { id: "z6", label: "Nb Contraintes Dual" },
                    { id: "z7", label: "Nb Variables Dual" }
                ]
            }
        ]
    }
};

/* -----------------------------------------------------------------------------
 * ENGINE LOGIC (Updated to handle Guided, Quiz, DnD)
 * -----------------------------------------------------------------------------
 */
document.addEventListener("DOMContentLoaded", () => {
    initExercises();
});

function initExercises() {
    const path = window.location.pathname;
    const page = path.split("/").pop(); // "chapitre1.html"

    const data = exerciseData[page];
    if (!data) return; 

    const container = document.getElementById("interactive-exercise");
    if (!container) return;

    let html = `
    <div class="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <div class="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
        </div>
        <div>
            <h2 class="text-2xl font-bold text-white">Zone d'Entraînement</h2>
            <p class="text-emerald-400 text-sm">Testez votre compréhension du chapitre</p>
        </div>
    </div>
    
    <div class="space-y-12">`;

    // 1. GUIDED SECTION
    if(data.guided && data.guided.length > 0) {
        html += `
        <section>
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span class="text-emerald-500">I.</span> Questions de Réflexion
            </h3>
            <div class="grid gap-4">`;
            
        data.guided.forEach((item, idx) => {
            html += `
            <div class="bg-slate-800/40 rounded-xl p-6 border border-white/5 hover:border-emerald-500/30 transition-all">
                <div class="flex gap-4">
                    <span class="bg-slate-700 text-emerald-400 font-bold px-2 py-1 h-fit rounded text-sm">#${idx+1}</span>
                    <div class="flex-1">
                        <h4 class="text-lg font-medium text-slate-200 mb-3">${item.question}</h4>
                        
                        <div class="mb-4 hidden" id="hint-${idx}">
                            <div class="bg-blue-900/20 border-l-4 border-blue-500 p-3">
                                <p class="text-sm text-blue-200"><strong class="uppercase text-xs tracking-wider">Indices :</strong> ${item.hints.join(" • ")}</p>
                            </div>
                        </div>

                        <div class="mb-4 hidden" id="corr-${idx}">
                            <div class="bg-emerald-900/20 border-l-4 border-emerald-500 p-3">
                                <p class="text-sm text-emerald-200"><strong class="uppercase text-xs tracking-wider">Réponse :</strong> ${item.correction}</p>
                            </div>
                        </div>

                        <div class="flex gap-2">
                            <button onclick="document.getElementById('hint-${idx}').classList.toggle('hidden')" 
                                    class="text-xs px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors">
                                💡 Indice
                            </button>
                            <button onclick="document.getElementById('corr-${idx}').classList.toggle('hidden')" 
                                    class="text-xs px-3 py-1.5 rounded bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors border border-emerald-500/30">
                                👁️ Réponse
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        html += `</div></section>`;
    }

    // 2. QUIZ SECTION
    if(data.quiz && data.quiz.length > 0) {
        html += `
        <section>
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span class="text-emerald-500">II.</span> Quiz de Validation
            </h3>
            <div class="grid md:grid-cols-2 gap-4">`;
            
        data.quiz.forEach((q, idx) => {
            if (q.type === "mcq") {
                html += `
                <div class="quiz-card bg-slate-800/40 rounded-xl p-5 border border-white/5" data-correct="${q.correct}" data-answered="false">
                    <p class="font-medium text-slate-200 mb-3 text-sm"><span class="text-emerald-500 font-bold mr-2">${idx+1}.</span> ${q.q}</p>
                    <div class="space-y-1.5">
                        ${q.options.map((opt, i) => `
                            <button class="quiz-mcq-btn w-full text-left px-3 py-2.5 rounded-lg bg-slate-900/50 hover:bg-slate-700/50 transition-all text-sm text-slate-300 border border-white/5 flex items-center gap-2" 
                                    data-idx="${i}" onclick="checkMCQ(this)">
                                <span class="quiz-mcq-marker w-6 h-6 rounded-full border-2 border-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all">${String.fromCharCode(65+i)}</span>
                                <span>${opt}</span>
                            </button>
                        `).join('')}
                    </div>
                    <div class="quiz-mcq-feedback mt-3 text-sm font-medium hidden"></div>
                </div>`;
            } else if (q.type === "qa") {
                html += `
                <div class="quiz-card bg-slate-800/40 rounded-xl p-5 border border-white/5">
                    <p class="font-medium text-slate-200 mb-3 text-sm"><span class="text-emerald-500 font-bold mr-2">${idx+1}.</span> ${q.q}</p>
                    <div class="flex gap-2">
                        <input type="text" 
                               class="qa-input bg-slate-900 border border-slate-700 text-slate-100 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5" 
                               placeholder="Tapez votre réponse..."
                               data-valid="${q.valid.join("|")}">
                        <button class="qa-check-btn px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors flex-shrink-0"
                                onclick="checkQA(this)">
                            Valider
                        </button>
                    </div>
                    <div class="qa-feedback mt-2 text-sm font-medium hidden"></div>
                </div>`;
            }
        });
        html += `</div></section>`;
    }

    // 3. DRAG DROP SECTION
    if(data.dragdrop && data.dragdrop.length > 0) {
        html += `
        <section>
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span class="text-emerald-500">III.</span> Associations Visuelles
            </h3>
            <div class="space-y-8">`;
            
        data.dragdrop.forEach((exo, idx) => {
            html += `
            <div class="bg-slate-800/30 rounded-xl p-6 border border-white/10">
                <h4 class="text-md font-semibold text-emerald-300 mb-6 border-b border-white/5 pb-2">${exo.title}</h4>
                
                <div class="grid md:grid-cols-2 gap-8">
                    <!-- Source -->
                    <div>
                         <p class="text-xs text-slate-500 uppercase tracking-widest mb-3">Banque d'éléments</p>
                        <div class="flex flex-wrap gap-2 bg-slate-900/50 p-4 rounded-lg min-h-[100px]">
                            ${exo.items.map(item => `
                                <div class="exo-draggable bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-2 rounded cursor-grab active:cursor-grabbing border border-white/10 shadow-sm text-xs font-medium transition-all transform hover:-translate-y-0.5" 
                                     draggable="true" 
                                     data-id="${item.id}" 
                                     data-match="${item.match}">
                                    ${item.text}
                                </div>
                            `).sort(() => Math.random() - 0.5).join('')}
                        </div>
                    </div>

                    <!-- Target -->
                    <div>
                        <p class="text-xs text-slate-500 uppercase tracking-widest mb-3">Zones de Dépôt</p>
                        <div class="space-y-3">
                             ${exo.zones.map(z => `
                                <div class="exo-drop-zone bg-slate-800/80 border-2 border-dashed border-slate-600 p-3 rounded-lg min-h-[60px] flex flex-wrap items-center gap-2 group transition-colors relative" data-id="${z.id}">
                                    <span class="absolute right-2 top-2 text-[10px] text-slate-500 font-bold uppercase pointer-events-none group-hover:text-emerald-500 transition-colors">${z.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>`;
        });
        html += `</div></section>`;
    }

    html += `</div>`;
    container.innerHTML = html;
    initDragAndDrop();
}

// LOGIC HELPERS
window.checkMCQ = function(btn) {
    const card = btn.closest('.quiz-card');
    if (card.dataset.answered === 'true') return; // already answered

    const correctIdx = parseInt(card.dataset.correct);
    const selectedIdx = parseInt(btn.dataset.idx);
    const allBtns = card.querySelectorAll('.quiz-mcq-btn');
    const feedback = card.querySelector('.quiz-mcq-feedback');

    card.dataset.answered = 'true';

    allBtns.forEach((b, i) => {
        b.style.pointerEvents = 'none';
        const marker = b.querySelector('.quiz-mcq-marker');
        if (i === correctIdx) {
            b.classList.remove('bg-slate-900/50', 'border-white/5');
            b.classList.add('bg-emerald-500/20', 'border-emerald-500/50');
            marker.classList.remove('border-slate-600');
            marker.classList.add('border-emerald-400', 'bg-emerald-500', 'text-white');
        } else if (i === selectedIdx && selectedIdx !== correctIdx) {
            b.classList.remove('bg-slate-900/50', 'border-white/5');
            b.classList.add('bg-red-500/15', 'border-red-500/40');
            marker.classList.remove('border-slate-600');
            marker.classList.add('border-red-400', 'bg-red-500', 'text-white');
        } else {
            b.classList.add('opacity-40');
        }
    });

    feedback.classList.remove('hidden');
    if (selectedIdx === correctIdx) {
        feedback.innerHTML = '<span class="text-emerald-400">✅ Bonne réponse !</span>';
        card.classList.add('border-emerald-500/30');
        if (typeof GameEngineRO !== 'undefined') GameEngineRO.addXP(10, 'QCM correct');
    } else {
        feedback.innerHTML = '<span class="text-red-400">❌ Mauvaise réponse — la bonne est surlignée en vert.</span>';
        card.classList.add('border-red-500/30');
    }
}

window.checkQA = function(btn) {
    const card = btn.closest('.quiz-card');
    const input = card.querySelector('.qa-input');
    const feedback = card.querySelector('.qa-feedback');
    const val = input.value.trim().toLowerCase();
    const valids = input.dataset.valid.split("|");

    if (val.length === 0) {
        feedback.classList.remove('hidden');
        feedback.innerHTML = '<span class="text-yellow-400">⚠️ Entrez une réponse.</span>';
        return;
    }

    const isGood = valids.some(v => val.includes(v.toLowerCase()));
    feedback.classList.remove('hidden');

    if (isGood) {
        input.classList.remove('border-slate-700', 'border-red-500');
        input.classList.add('border-emerald-500', 'bg-emerald-900/20', 'text-emerald-300');
        input.readOnly = true;
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
        feedback.innerHTML = '<span class="text-emerald-400">✅ Correct !</span>';
        card.classList.add('border-emerald-500/30');
        if (typeof GameEngineRO !== 'undefined') GameEngineRO.addXP(15, 'Réponse correcte');
    } else {
        input.classList.remove('border-slate-700', 'border-emerald-500');
        input.classList.add('border-red-500');
        feedback.innerHTML = '<span class="text-red-400">❌ Incorrect. Réessayez !</span>';
        // Allow retry: focus input and select text
        input.focus();
        input.select();
    }
}

function initDragAndDrop() {
    const draggables = document.querySelectorAll('.exo-draggable');
    const zones = document.querySelectorAll('.exo-drop-zone');
    let selectedDrag = null;

    draggables.forEach(d => {
        // Desktop: native drag
        d.addEventListener('dragstart', (e) => { 
            d.classList.add('opacity-50'); 
            e.dataTransfer.setData('text/plain', d.getAttribute('data-match'));
            e.dataTransfer.setData('source-id', d.getAttribute('data-id'));
        });
        d.addEventListener('dragend', () => { 
            d.classList.remove('opacity-50'); 
        });

        // Mobile/click: tap to select
        d.addEventListener('click', () => {
            if (d.getAttribute('draggable') === 'false') return;
            document.querySelectorAll('.exo-draggable.ring-2').forEach(s => {
                s.classList.remove('ring-2', 'ring-emerald-400', 'scale-105');
            });
            d.classList.add('ring-2', 'ring-emerald-400', 'scale-105');
            selectedDrag = d;
        });
    });

    function handlePlacement(zone, matchId, sourceId) {
        const zoneId = zone.getAttribute('data-id');
        const draggableElement = document.querySelector(`.exo-draggable[data-id="${sourceId}"]`);

        if (matchId === zoneId && draggableElement) {
            zone.appendChild(draggableElement);
            
            draggableElement.classList.remove('bg-slate-700', 'hover:bg-slate-600', 'shadow-sm', 'ring-2', 'ring-emerald-400', 'scale-105');
            draggableElement.classList.add('bg-emerald-600', 'cursor-default', 'text-white', 'border-transparent');
            draggableElement.setAttribute('draggable', 'false');
            if (typeof GameEngineRO !== 'undefined') GameEngineRO.addXP(20, 'Drag & Drop correct');
            
            zone.classList.replace('border-slate-600', 'border-emerald-500');
            setTimeout(() => {
                zone.classList.replace('border-emerald-500', 'border-slate-600');
            }, 600);
            return true;
        } else {
            zone.classList.add('border-red-500', 'bg-red-500/10');
            setTimeout(() => zone.classList.remove('border-red-500', 'bg-red-500/10'), 600);
            return false;
        }
    }

    zones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault(); 
            zone.classList.add('border-emerald-500', 'bg-emerald-500/10');
        });
        
        zone.addEventListener('dragleave', () => {
            zone.classList.remove('border-emerald-500', 'bg-emerald-500/10');
        });

        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.classList.remove('border-emerald-500', 'bg-emerald-500/10');
            const matchId = e.dataTransfer.getData('text/plain');
            const sourceId = e.dataTransfer.getData('source-id');
            handlePlacement(zone, matchId, sourceId);
        });

        // Mobile/click: tap zone to place selected item
        zone.addEventListener('click', () => {
            if (!selectedDrag) return;
            const matchId = selectedDrag.getAttribute('data-match');
            const sourceId = selectedDrag.getAttribute('data-id');
            handlePlacement(zone, matchId, sourceId);
            selectedDrag.classList.remove('ring-2', 'ring-emerald-400', 'scale-105');
            selectedDrag = null;
        });
    });

    // QA: Enter key to validate
    document.querySelectorAll('.qa-input').forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const btn = input.parentElement.querySelector('.qa-check-btn');
                if (btn && !btn.disabled) btn.click();
            }
        });
    });
}