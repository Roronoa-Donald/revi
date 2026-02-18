/**
 * QCM Recherche Opérationnelle — 100 Questions
 * Thèmes couverts :
 *   1. Modélisation (Q1–Q30)
 *   2. Formes canonique & standard (Q31–Q50)
 *   3. Résolution graphique (Q51–Q75)
 *   4. Méthode du Simplexe (Q76–Q100)
 *
 * PAS de dualité.
 */

const qcmRO = [

    // ╔══════════════════════════════════════════════════════════════════╗
    // ║  PARTIE 1 — MODÉLISATION  (30 questions)                       ║
    // ╚══════════════════════════════════════════════════════════════════╝

    // --- Q1 ---
    {
        id: 1,
        theme: "Modélisation",
        q: "Qu'est-ce qu'une variable de décision dans un programme linéaire ?",
        options: [
            "Une constante fixée par l'énoncé",
            "Une quantité inconnue que le décideur doit déterminer",
            "Le coefficient de la fonction objectif",
            "Une contrainte du problème"
        ],
        correct: 1,
        explanation: "La variable de décision ($x_j$) est la quantité que le décideur contrôle et cherche à déterminer pour optimiser le problème."
    },

    // --- Q2 ---
    {
        id: 2,
        theme: "Modélisation",
        q: "Quelle est la première étape de la méthodologie universelle de modélisation ?",
        options: [
            "Écrire la fonction objectif",
            "Ajouter les contraintes de non-négativité",
            "Analyser l'énoncé et identifier l'objectif, les ressources et les décisions",
            "Résoudre le problème graphiquement"
        ],
        correct: 2,
        explanation: "La première étape consiste toujours à lire et analyser l'énoncé pour identifier ce qu'on optimise, ce qui est limité, et ce qu'on contrôle."
    },

    // --- Q3 ---
    {
        id: 3,
        theme: "Modélisation",
        q: "Dans un problème de production, si $x_1$ représente le nombre de chaises et le profit par chaise est 30€, quelle est la contribution de $x_1$ à la fonction objectif ?",
        options: [
            "$x_1$",
            "$30$",
            "$30 x_1$",
            "$x_1 / 30$"
        ],
        correct: 2,
        explanation: "La contribution d'une variable à la fonction objectif est : coefficient économique × variable, soit $30 x_1$."
    },

    // --- Q4 ---
    {
        id: 4,
        theme: "Modélisation",
        q: "Que représente le coefficient technique $a_{ij}$ dans un programme linéaire ?",
        options: [
            "Le profit par unité de produit $j$",
            "La disponibilité de la ressource $i$",
            "La consommation de la ressource $i$ par unité de l'activité $j$",
            "Le nombre total de contraintes"
        ],
        correct: 2,
        explanation: "$a_{ij}$ mesure la quantité de ressource $i$ consommée pour produire une unité de l'activité $j$."
    },

    // --- Q5 ---
    {
        id: 5,
        theme: "Modélisation",
        q: "Une usine fabrique des produits A et B. A nécessite 2h sur la machine M1 (capacité 10h) et B nécessite 3h. Quelle est la contrainte de M1 ?",
        options: [
            "$2x_A + 3x_B = 10$",
            "$2x_A + 3x_B \\geq 10$",
            "$2x_A + 3x_B \\leq 10$",
            "$3x_A + 2x_B \\leq 10$"
        ],
        correct: 2,
        explanation: "La consommation totale ($2x_A + 3x_B$) ne doit pas dépasser la capacité de 10 heures, d'où l'inégalité $\\leq$."
    },

    // --- Q6 ---
    {
        id: 6,
        theme: "Modélisation",
        q: "Dans un problème de transport de 3 usines vers 4 magasins, combien y a-t-il de variables de décision ?",
        options: [
            "3",
            "4",
            "7",
            "12"
        ],
        correct: 3,
        explanation: "Il y a $3 \\times 4 = 12$ trajets possibles, donc 12 variables $x_{ij}$ représentant le flux de l'usine $i$ vers le magasin $j$."
    },

    // --- Q7 ---
    {
        id: 7,
        theme: "Modélisation",
        q: "Le profit unitaire d'un produit P1 est 50€ et celui de P2 est 40€. On veut maximiser le profit. Quelle est la fonction objectif ?",
        options: [
            "Min $Z = 50x_1 + 40x_2$",
            "Max $Z = 50x_1 + 40x_2$",
            "Max $Z = 40x_1 + 50x_2$",
            "Max $Z = 50x_1 - 40x_2$"
        ],
        correct: 1,
        explanation: "On maximise le profit total : $Z = 50x_1 + 40x_2$ où $x_1$ est la quantité de P1 et $x_2$ celle de P2."
    },

    // --- Q8 ---
    {
        id: 8,
        theme: "Modélisation",
        q: "On mélange deux matières M1 (20% de fer, 5€/kg) et M2 (50% de fer, 9€/kg) pour obtenir au moins 35% de fer. Quelle contrainte assure la teneur ?",
        options: [
            "$0{,}20 x_1 + 0{,}50 x_2 \\leq 0{,}35 (x_1+x_2)$",
            "$0{,}20 x_1 + 0{,}50 x_2 \\geq 0{,}35 (x_1+x_2)$",
            "$0{,}35 x_1 + 0{,}35 x_2 \\geq 0{,}20 + 0{,}50$",
            "$x_1 + x_2 \\geq 0{,}35$"
        ],
        correct: 1,
        explanation: "La quantité totale de fer ($0{,}20 x_1 + 0{,}50 x_2$) doit être au moins 35% du mélange total ($x_1 + x_2$)."
    },

    // --- Q9 ---
    {
        id: 9,
        theme: "Modélisation",
        q: "Pourquoi ajoute-t-on les contraintes de non-négativité $x_j \\geq 0$ ?",
        options: [
            "Pour que le problème ait une solution unique",
            "Parce que les quantités physiques ne peuvent pas être négatives",
            "Pour rendre le problème plus difficile",
            "Pour augmenter le nombre de contraintes"
        ],
        correct: 1,
        explanation: "En pratique, on ne peut pas produire une quantité négative de produits. Les contraintes $x_j \\geq 0$ reflètent cette réalité physique."
    },

    // --- Q10 ---
    {
        id: 10,
        theme: "Modélisation",
        q: "Un investisseur a 200 000€ à répartir entre des actions ($x_1$) et des obligations ($x_2$). Quelle contrainte traduit le budget total ?",
        options: [
            "$x_1 + x_2 \\leq 200\\,000$",
            "$x_1 + x_2 \\geq 200\\,000$",
            "$x_1 - x_2 = 200\\,000$",
            "$x_1 \\cdot x_2 = 200\\,000$"
        ],
        correct: 0,
        explanation: "La somme investie ne peut pas dépasser le budget disponible : $x_1 + x_2 \\leq 200\\,000$."
    },

    // --- Q11 ---
    {
        id: 11,
        theme: "Modélisation",
        q: "Un fabricant doit produire au moins 100 unités de P1 pour honorer un contrat. Quelle contrainte modélise cela ?",
        options: [
            "$x_1 \\leq 100$",
            "$x_1 \\geq 100$",
            "$x_1 = 100$",
            "$x_1 + 100 \\geq 0$"
        ],
        correct: 1,
        explanation: "« Au moins 100 unités » se traduit par $x_1 \\geq 100$ (contrainte de demande minimale)."
    },

    // --- Q12 ---
    {
        id: 12,
        theme: "Modélisation",
        q: "Quels sont les quatre catégories d'éléments dans un programme linéaire ?",
        options: [
            "Profit, coût, temps, stock",
            "Variables de décision, coefficients économiques, ressources, coefficients techniques",
            "Max, Min, sujet à, non-négativité",
            "Entrée, sortie, processus, résultat"
        ],
        correct: 1,
        explanation: "Les quatre catégories sont : variables de décision ($x_j$), coefficients économiques ($c_j$), ressources ($b_i$), et coefficients techniques ($a_{ij}$)."
    },

    // --- Q13 ---
    {
        id: 13,
        theme: "Modélisation",
        q: "Dans un problème de diète, l'objectif est généralement de :",
        options: [
            "Maximiser les calories",
            "Minimiser le coût tout en respectant les apports nutritionnels minimaux",
            "Maximiser le nombre d'aliments",
            "Minimiser le nombre de repas"
        ],
        correct: 1,
        explanation: "Le problème de diète classique cherche à minimiser le coût d'un régime satisfaisant les besoins nutritionnels."
    },

    // --- Q14 ---
    {
        id: 14,
        theme: "Modélisation",
        q: "Une boulangerie utilise 50g de beurre et 100g de farine par croissant, et 40g de beurre et 120g de farine par pain au chocolat. Stock : 5kg de beurre, 12kg de farine. Quelle est la contrainte de beurre ?",
        options: [
            "$50x_1 + 40x_2 \\leq 5000$",
            "$100x_1 + 120x_2 \\leq 5000$",
            "$50x_1 + 40x_2 \\leq 12000$",
            "$50x_1 + 40x_2 \\geq 5000$"
        ],
        correct: 0,
        explanation: "5 kg = 5000 g de beurre disponible. La consommation est $50x_1 + 40x_2$ qui ne doit pas dépasser 5000 g."
    },

    // --- Q15 ---
    {
        id: 15,
        theme: "Modélisation",
        q: "Un problème possède $n$ produits utilisant $m$ ressources. Combien de contraintes de ressources y a-t-il ?",
        options: [
            "$n$",
            "$m$",
            "$m \\times n$",
            "$m + n$"
        ],
        correct: 1,
        explanation: "Chaque ressource produit une contrainte, donc il y a $m$ contraintes de ressources (plus les contraintes de non-négativité)."
    },

    // --- Q16 ---
    {
        id: 16,
        theme: "Modélisation",
        q: "Les actions ($x_1$) d'un portefeuille ne doivent pas dépasser 60% du total investi ($x_1 + x_2 = 100\\,000$). Quelle est la contrainte ?",
        options: [
            "$x_1 \\leq 60\\,000$",
            "$x_1 \\geq 60\\,000$",
            "$x_2 \\leq 60\\,000$",
            "$x_1 + x_2 \\leq 60\\,000$"
        ],
        correct: 0,
        explanation: "$x_1 \\leq 0{,}60 \\times 100\\,000 = 60\\,000$. Puisque le total est fixe à $100\\,000$, on obtient directement $x_1 \\leq 60\\,000$."
    },

    // --- Q17 ---
    {
        id: 17,
        theme: "Modélisation",
        q: "Quelle est la différence entre un paramètre et une variable de décision ?",
        options: [
            "Il n'y a aucune différence",
            "Un paramètre est une donnée fixe connue, une variable de décision est une inconnue à déterminer",
            "Un paramètre change, une variable est constante",
            "Les paramètres n'existent pas en programmation linéaire"
        ],
        correct: 1,
        explanation: "Les paramètres ($c_j$, $a_{ij}$, $b_i$) sont les données. Les variables de décision ($x_j$) sont les inconnues à optimiser."
    },

    // --- Q18 ---
    {
        id: 18,
        theme: "Modélisation",
        q: "Une usine fabrique 3 types de meubles sur 2 machines. Combien de variables de décision y a-t-il ?",
        options: [
            "2",
            "3",
            "5",
            "6"
        ],
        correct: 1,
        explanation: "Les variables de décision sont les quantités de chaque type de meuble à produire, soit $x_1, x_2, x_3$ : 3 variables."
    },

    // --- Q19 ---
    {
        id: 19,
        theme: "Modélisation",
        q: "Un agriculteur dispose de 100 hectares. Il cultive du blé ($x_1$) et du maïs ($x_2$). Quelle contrainte modélise la superficie ?",
        options: [
            "$x_1 + x_2 = 100$",
            "$x_1 + x_2 \\leq 100$",
            "$x_1 + x_2 \\geq 100$",
            "$x_1 \\cdot x_2 \\leq 100$"
        ],
        correct: 1,
        explanation: "La surface totale cultivée ne peut pas dépasser la surface disponible : $x_1 + x_2 \\leq 100$ hectares."
    },

    // --- Q20 ---
    {
        id: 20,
        theme: "Modélisation",
        q: "Un problème demande de minimiser le coût de transport. Le coût unitaire du trajet $i \\to j$ est $c_{ij}$ et la quantité transportée est $x_{ij}$. Quelle est la fonction objectif ?",
        options: [
            "Max $Z = \\sum c_{ij} x_{ij}$",
            "Min $Z = \\sum c_{ij} x_{ij}$",
            "Min $Z = \\sum x_{ij}$",
            "Max $Z = \\sum c_{ij}$"
        ],
        correct: 1,
        explanation: "On minimise le coût total : $Z = \\sum_{i,j} c_{ij} x_{ij}$."
    },

    // --- Q21 ---
    {
        id: 21,
        theme: "Modélisation",
        q: "L'usine U1 a une capacité de production de 500 unités. Quelles contraintes d'offre s'appliquent si elle alimente M1, M2, M3 ?",
        options: [
            "$x_{11} + x_{12} + x_{13} \\leq 500$",
            "$x_{11} + x_{12} + x_{13} \\geq 500$",
            "$x_{11} + x_{12} + x_{13} = 500$",
            "$x_{11} \\leq 500$, $x_{12} \\leq 500$, $x_{13} \\leq 500$"
        ],
        correct: 0,
        explanation: "La quantité totale expédiée depuis U1 ne doit pas dépasser sa capacité : $x_{11} + x_{12} + x_{13} \\leq 500$."
    },

    // --- Q22 ---
    {
        id: 22,
        theme: "Modélisation",
        q: "Le magasin M2 a une demande de 300 unités à satisfaire. Quelle contrainte de demande s'applique pour les usines U1, U2 ?",
        options: [
            "$x_{12} + x_{22} \\leq 300$",
            "$x_{12} + x_{22} \\geq 300$",
            "$x_{12} + x_{22} = 300$",
            "$x_{12} \\geq 300$"
        ],
        correct: 1,
        explanation: "La quantité reçue par M2 doit satisfaire au moins sa demande : $x_{12} + x_{22} \\geq 300$."
    },

    // --- Q23 ---
    {
        id: 23,
        theme: "Modélisation",
        q: "Un ouvrier travaille au maximum 8h par jour. Il peut construire des pièces de type A (2h chacune) ou B (1h chacune). Comment modéliser la contrainte de temps ?",
        options: [
            "$2x_A + x_B \\leq 8$",
            "$x_A + 2x_B \\leq 8$",
            "$2x_A + x_B = 8$",
            "$x_A + x_B \\leq 8$"
        ],
        correct: 0,
        explanation: "Chaque pièce A consomme 2h et chaque pièce B consomme 1h. Le total ne doit pas dépasser 8h : $2x_A + x_B \\leq 8$."
    },

    // --- Q24 ---
    {
        id: 24,
        theme: "Modélisation",
        q: "Un PL contient la contrainte $x_1 \\leq 3x_2$. Comment l'interpréter ?",
        options: [
            "La quantité de $x_1$ est au plus le triple de celle de $x_2$",
            "La quantité de $x_1$ est au moins le triple de celle de $x_2$",
            "$x_1$ et $x_2$ sont proportionnels",
            "On ne peut pas avoir ce type de contrainte en PL"
        ],
        correct: 0,
        explanation: "$x_1 \\leq 3x_2$ signifie que la production de 1 ne peut pas dépasser trois fois la production de 2. Certains problèmes imposent des ratios entre productions."
    },

    // --- Q25 ---
    {
        id: 25,
        theme: "Modélisation",
        q: "Un budget publicitaire de 10 000€ est réparti entre TV ($x_1$, 500€/spot) et Radio ($x_2$, 200€/spot). L'audience est 5000 pour TV et 2000 pour Radio. Quelle est la fonction objectif ?",
        options: [
            "Min $Z = 500x_1 + 200x_2$",
            "Max $Z = 5000x_1 + 2000x_2$",
            "Max $Z = 500x_1 + 200x_2$",
            "Min $Z = 5000x_1 + 2000x_2$"
        ],
        correct: 1,
        explanation: "On maximise l'audience totale : $Z = 5000x_1 + 2000x_2$ sous la contrainte de budget $500x_1 + 200x_2 \\leq 10\\,000$."
    },

    // --- Q26 ---
    {
        id: 26,
        theme: "Modélisation",
        q: "Pour la question précédente, quelle est la contrainte de budget ?",
        options: [
            "$5000x_1 + 2000x_2 \\leq 10\\,000$",
            "$500x_1 + 200x_2 \\leq 10\\,000$",
            "$x_1 + x_2 \\leq 10\\,000$",
            "$500x_1 + 200x_2 \\geq 10\\,000$"
        ],
        correct: 1,
        explanation: "Le coût total des spots ne doit pas dépasser le budget : $500x_1 + 200x_2 \\leq 10\\,000$."
    },

    // --- Q27 ---
    {
        id: 27,
        theme: "Modélisation",
        q: "Qu'appelle-t-on le second membre ($b_i$) d'une contrainte ?",
        options: [
            "Le coefficient de la variable de décision",
            "La valeur de la fonction objectif",
            "La disponibilité ou la limite de la ressource $i$",
            "Le nombre de variables"
        ],
        correct: 2,
        explanation: "$b_i$ représente la quantité disponible (ou exigée) de la ressource $i$ (heures, kg, budget, etc.)."
    },

    // --- Q28 ---
    {
        id: 28,
        theme: "Modélisation",
        q: "Qu'est-ce qui rend un problème NON linéaire ?",
        options: [
            "Avoir plus de 2 variables",
            "Avoir des termes comme $x_1 \\cdot x_2$ ou $x_1^2$ dans la fonction objectif ou les contraintes",
            "Avoir des contraintes $\\geq$",
            "Avoir une fonction objectif de minimisation"
        ],
        correct: 1,
        explanation: "Un problème linéaire n'admet que des termes de degré 1 en les variables. Les produits ($x_1 x_2$) ou puissances ($x^2$) rendent le problème non linéaire."
    },

    // --- Q29 ---
    {
        id: 29,
        theme: "Modélisation",
        q: "Un atelier doit produire exactement 200 unités par jour (demande fixe). Quelle contrainte utiliser ?",
        options: [
            "$x_1 + x_2 \\leq 200$",
            "$x_1 + x_2 \\geq 200$",
            "$x_1 + x_2 = 200$",
            "$200 \\leq x_1 \\leq x_2$"
        ],
        correct: 2,
        explanation: "« Exactement 200 » se traduit par une contrainte d'égalité $x_1 + x_2 = 200$."
    },

    // --- Q30 ---
    {
        id: 30,
        theme: "Modélisation",
        q: "Quelle est la dernière étape de la méthodologie de modélisation ?",
        options: [
            "Définir les variables",
            "Écrire la fonction objectif",
            "Vérification, cohérence des unités et rédaction finale du modèle",
            "Ajouter les contraintes de non-négativité"
        ],
        correct: 2,
        explanation: "L'étape finale est la vérification : relire chaque contrainte, vérifier l'homogénéité des unités et présenter le modèle final clairement."
    },

    // ╔══════════════════════════════════════════════════════════════════╗
    // ║  PARTIE 2 — FORMES CANONIQUE & STANDARD  (20 questions)        ║
    // ╚══════════════════════════════════════════════════════════════════╝

    // --- Q31 ---
    {
        id: 31,
        theme: "Formes",
        q: "Quelle est la caractéristique principale de la forme canonique d'un PL de maximisation ?",
        options: [
            "Toutes les contraintes sont des égalités",
            "Toutes les contraintes sont des inégalités $\\leq$ et $x_j \\geq 0$",
            "Il n'y a pas de contraintes",
            "Les variables peuvent être négatives"
        ],
        correct: 1,
        explanation: "La forme canonique (Max) : toutes les contraintes structurelles en $\\leq$, toutes les variables $\\geq 0$."
    },

    // --- Q32 ---
    {
        id: 32,
        theme: "Formes",
        q: "Quelle est la différence entre la forme canonique et la forme standard ?",
        options: [
            "Il n'y a aucune différence",
            "La canonique utilise des inégalités, la standard utilise uniquement des égalités",
            "La standard utilise des inégalités, la canonique des égalités",
            "La canonique est uniquement pour la minimisation"
        ],
        correct: 1,
        explanation: "La forme canonique garde les contraintes en inégalités. La forme standard convertit tout en égalités à l'aide de variables d'écart ou de surplus."
    },

    // --- Q33 ---
    {
        id: 33,
        theme: "Formes",
        q: "Pour transformer la contrainte $3x_1 + 2x_2 \\leq 12$ en égalité, on :",
        options: [
            "Soustrait une variable d'écart : $3x_1 + 2x_2 - e_1 = 12$",
            "Ajoute une variable d'écart : $3x_1 + 2x_2 + e_1 = 12$, $e_1 \\geq 0$",
            "Multiplie par $-1$",
            "Ajoute une variable artificielle"
        ],
        correct: 1,
        explanation: "Pour une contrainte $\\leq$, on ajoute une variable d'écart (slack) $e_1 \\geq 0$ qui représente la ressource inutilisée."
    },

    // --- Q34 ---
    {
        id: 34,
        theme: "Formes",
        q: "Que représente physiquement la variable d'écart $e_1$ dans $2x_1 + 3x_2 + e_1 = 40$ (contrainte de temps) ?",
        options: [
            "Le profit total",
            "Le temps non utilisé (heures restantes)",
            "Le nombre de produits fabriqués",
            "Le coût de production"
        ],
        correct: 1,
        explanation: "Si on dispose de 40h et qu'on en utilise $2x_1 + 3x_2$, alors $e_1 = 40 - 2x_1 - 3x_2$ représente les heures inutilisées."
    },

    // --- Q35 ---
    {
        id: 35,
        theme: "Formes",
        q: "Pour transformer la contrainte $x_1 + 4x_2 \\geq 20$ en égalité, on :",
        options: [
            "Ajoute une variable d'écart : $x_1 + 4x_2 + e_1 = 20$",
            "Soustrait une variable de surplus : $x_1 + 4x_2 - s_1 = 20$, $s_1 \\geq 0$",
            "Multiplie par $-1$ et ajoute une variable d'écart",
            "On ne peut pas transformer cette contrainte"
        ],
        correct: 1,
        explanation: "Pour une contrainte $\\geq$, on soustrait une variable de surplus (excès) $s_1 \\geq 0$ : $x_1 + 4x_2 - s_1 = 20$."
    },

    // --- Q36 ---
    {
        id: 36,
        theme: "Formes",
        q: "Comment transforme-t-on Min $Z = 5x_1 + 3x_2$ en un problème de maximisation ?",
        options: [
            "Max $Z = 5x_1 + 3x_2$",
            "Max $Z' = -5x_1 - 3x_2$",
            "Max $Z' = 3x_1 + 5x_2$",
            "On inverse toutes les contraintes"
        ],
        correct: 1,
        explanation: "Minimiser $Z$ revient à maximiser $-Z$. L'optimum est atteint au même point : Min $Z$ = $-$Max $(-Z)$."
    },

    // --- Q37 ---
    {
        id: 37,
        theme: "Formes",
        q: "Comment traite-t-on une variable $x_j$ non restreinte en signe (libre) ?",
        options: [
            "On la supprime du problème",
            "On la remplace par $x_j = x_j^+ - x_j^-$ avec $x_j^+, x_j^- \\geq 0$",
            "On pose $x_j \\geq 0$ directement",
            "On l'ignore"
        ],
        correct: 1,
        explanation: "Toute variable libre est décomposée en la différence de deux variables non-négatives pour respecter la contrainte $\\geq 0$ de la forme standard."
    },

    // --- Q38 ---
    {
        id: 38,
        theme: "Formes",
        q: "Après passage en forme standard, un PL avec $n$ variables et $m$ contraintes d'inégalité $\\leq$ a combien de variables au total ?",
        options: [
            "$n$",
            "$m$",
            "$n + m$",
            "$n \\times m$"
        ],
        correct: 2,
        explanation: "Chaque contrainte $\\leq$ ajoute une variable d'écart. On passe de $n$ variables à $n + m$ variables au total."
    },

    // --- Q39 ---
    {
        id: 39,
        theme: "Formes",
        q: "À quoi sert une variable artificielle ?",
        options: [
            "À améliorer la valeur de la fonction objectif",
            "À fournir une solution de base initiale réalisable quand les variables d'écart ne suffisent pas",
            "À rendre la fonction objectif linéaire",
            "À remplacer une variable de décision"
        ],
        correct: 1,
        explanation: "Pour les contraintes $\\geq$ ou $=$, on ne dispose pas de variable d'écart positive pour former une base initiale. Les variables artificielles jouent ce rôle temporaire."
    },

    // --- Q40 ---
    {
        id: 40,
        theme: "Formes",
        q: "Dans la méthode du Big-M, quel est le rôle du coefficient $M$ ?",
        options: [
            "Il représente la valeur optimale",
            "C'est une pénalité très grande qui force les variables artificielles à quitter la base",
            "Il limite le nombre d'itérations",
            "Il fixe la borne supérieure des variables"
        ],
        correct: 1,
        explanation: "En ajoutant $-M \\cdot a_i$ (Max) dans l'objectif avec $M \\to +\\infty$, toute solution gardant $a_i > 0$ est très pénalisée, forçant $a_i = 0$ à l'optimum."
    },

    // --- Q41 ---
    {
        id: 41,
        theme: "Formes",
        q: "Si la variable d'écart $e_1 = 0$ dans la solution optimale, cela signifie que :",
        options: [
            "La ressource 1 n'est pas utilisée du tout",
            "La contrainte 1 est saturée (active) : la ressource est entièrement consommée",
            "Le problème est infaisable",
            "La variable $x_1$ est nulle"
        ],
        correct: 1,
        explanation: "$e_1 = 0$ signifie qu'il n'y a aucun reste de la ressource 1 : la contrainte est active (vérifiée avec égalité)."
    },

    // --- Q42 ---
    {
        id: 42,
        theme: "Formes",
        q: "Quelle est la forme canonique du PL de minimisation ?",
        options: [
            "Min $Z$, contraintes $\\leq$, $x \\geq 0$",
            "Min $Z$, contraintes $\\geq$, $x \\geq 0$",
            "Max $Z$, contraintes $\\geq$, $x \\geq 0$",
            "Min $Z$, contraintes $=$, $x \\geq 0$"
        ],
        correct: 1,
        explanation: "La forme canonique de minimisation utilise des contraintes $\\geq$ (au lieu de $\\leq$ pour la maximisation), toujours avec $x \\geq 0$."
    },

    // --- Q43 ---
    {
        id: 43,
        theme: "Formes",
        q: "La méthode des deux phases : que fait-on en Phase I ?",
        options: [
            "On résout le problème original directement",
            "On minimise la somme des variables artificielles pour trouver une base réalisable",
            "On ajoute des contraintes supplémentaires",
            "On élimine les variables de décision"
        ],
        correct: 1,
        explanation: "En Phase I, on minimise $\\sum a_i$ (variables artificielles). Si le minimum est 0, on a une base réalisable pour la Phase II (problème original)."
    },

    // --- Q44 ---
    {
        id: 44,
        theme: "Formes",
        q: "En Phase II de la méthode des deux phases, que fait-on ?",
        options: [
            "On minimise les variables artificielles",
            "On optimise la fonction objectif originale avec la base trouvée en Phase I",
            "On ajoute de nouvelles variables",
            "On recommence depuis le début"
        ],
        correct: 1,
        explanation: "La Phase II utilise la base réalisable trouvée en Phase I et applique le simplexe pour optimiser la vraie fonction objectif."
    },

    // --- Q45 ---
    {
        id: 45,
        theme: "Formes",
        q: "Si la Phase I donne un minimum strictement positif (> 0), alors :",
        options: [
            "La solution est optimale",
            "Le problème original est infaisable",
            "On passe directement à la Phase II",
            "On ajoute plus de variables artificielles"
        ],
        correct: 1,
        explanation: "Si $\\min \\sum a_i > 0$, au moins une variable artificielle reste positive : il n'existe aucune solution réalisable pour le problème original."
    },

    // --- Q46 ---
    {
        id: 46,
        theme: "Formes",
        q: "Pour transformer la contrainte $-2x_1 + x_2 \\geq 5$ en contrainte $\\leq$ (forme canonique de Max), on :",
        options: [
            "Multiplie par $-1$ : $2x_1 - x_2 \\leq -5$",
            "Ajoute une variable d'écart",
            "On ne peut pas la transformer",
            "On l'ignore"
        ],
        correct: 0,
        explanation: "En multipliant par $-1$, on inverse le sens de l'inégalité : $2x_1 - x_2 \\leq -5$. Les coefficients et le second membre changent de signe."
    },

    // --- Q47 ---
    {
        id: 47,
        theme: "Formes",
        q: "Combien de variables d'écart faut-il ajouter pour un PL avec 5 contraintes $\\leq$ et 3 contraintes $\\geq$ ?",
        options: [
            "5",
            "3",
            "8",
            "15"
        ],
        correct: 2,
        explanation: "Chaque contrainte d'inégalité (qu'elle soit $\\leq$ ou $\\geq$) nécessite une variable d'écart/surplus : $5 + 3 = 8$ variables."
    },

    // --- Q48 ---
    {
        id: 48,
        theme: "Formes",
        q: "Pourquoi la forme standard est-elle nécessaire pour l'algorithme du simplexe ?",
        options: [
            "Le simplexe ne fonctionne pas avec des variables positives",
            "Le simplexe travaille sur un système d'équations linéaires, pas d'inégalités",
            "La forme standard réduit le nombre de variables",
            "Elle permet de supprimer les contraintes"
        ],
        correct: 1,
        explanation: "Le simplexe résout un système d'équations linéaires (forme standard avec égalités) en se déplaçant entre les solutions de base réalisables."
    },

    // --- Q49 ---
    {
        id: 49,
        theme: "Formes",
        q: "Dans la forme standard, une contrainte d'égalité originale :",
        options: [
            "Nécessite l'ajout d'une variable d'écart",
            "Nécessite l'ajout d'une variable de surplus",
            "Reste telle quelle, pas de variable d'écart nécessaire",
            "Doit être supprimée"
        ],
        correct: 2,
        explanation: "Une contrainte d'égalité est déjà sous la forme requise pour la forme standard. Aucune variable d'écart n'est ajoutée."
    },

    // --- Q50 ---
    {
        id: 50,
        theme: "Formes",
        q: "Si on a la contrainte $x_1 - x_2 = 4$ et que $x_1, x_2 \\geq 0$, cette contrainte :",
        options: [
            "Est déjà en forme standard",
            "Nécessite une variable d'écart",
            "Nécessite une variable artificielle pour former une base initiale",
            "Doit être convertie en inégalité"
        ],
        correct: 2,
        explanation: "Pour une contrainte $=$, les variables de décision ne fournissent pas de « 1 » dans la matrice de base. Il faut une variable artificielle pour démarrer le simplexe."
    },

    // ╔══════════════════════════════════════════════════════════════════╗
    // ║  PARTIE 3 — RÉSOLUTION GRAPHIQUE  (25 questions)               ║
    // ╚══════════════════════════════════════════════════════════════════╝

    // --- Q51 ---
    {
        id: 51,
        theme: "Résolution graphique",
        q: "La méthode de résolution graphique est applicable pour les PL ayant au plus :",
        options: [
            "1 variable",
            "2 variables",
            "3 variables",
            "Aucune limite"
        ],
        correct: 1,
        explanation: "Au-delà de 2 variables, on ne peut plus visualiser le polyèdre dans le plan. La méthode graphique est limitée à 2 variables."
    },

    // --- Q52 ---
    {
        id: 52,
        theme: "Résolution graphique",
        q: "Le théorème fondamental de la PL stipule que si un optimum existe, il se trouve :",
        options: [
            "Au centre du domaine réalisable",
            "Sur un sommet (point extrême) du polyèdre",
            "À l'intersection de deux axes",
            "Au milieu d'une arête"
        ],
        correct: 1,
        explanation: "L'optimum d'une fonction linéaire sur un polyèdre convexe se trouve toujours sur un sommet du polyèdre."
    },

    // --- Q53 ---
    {
        id: 53,
        theme: "Résolution graphique",
        q: "Pour tracer la droite correspondant à $2x_1 + 3x_2 = 12$, quels deux points peut-on utiliser ?",
        options: [
            "$(0, 0)$ et $(12, 12)$",
            "$(6, 0)$ et $(0, 4)$",
            "$(12, 0)$ et $(0, 12)$",
            "$(3, 2)$ et $(2, 3)$"
        ],
        correct: 1,
        explanation: "Si $x_2 = 0$ : $2x_1 = 12 \\Rightarrow x_1 = 6$, point $(6, 0)$. Si $x_1 = 0$ : $3x_2 = 12 \\Rightarrow x_2 = 4$, point $(0, 4)$."
    },

    // --- Q54 ---
    {
        id: 54,
        theme: "Résolution graphique",
        q: "Comment déterminer le demi-plan correspondant à $2x_1 + 3x_2 \\leq 12$ ?",
        options: [
            "On teste le point $(0, 0)$ : $0 + 0 = 0 \\leq 12$ ✓ donc le demi-plan contient l'origine",
            "Le demi-plan est toujours au-dessus de la droite",
            "On trace un cercle autour de la droite",
            "On choisit arbitrairement"
        ],
        correct: 0,
        explanation: "On teste un point simple (souvent l'origine) dans l'inégalité. Si elle est satisfaite, le demi-plan contient ce point."
    },

    // --- Q55 ---
    {
        id: 55,
        theme: "Résolution graphique",
        q: "Qu'est-ce qu'une droite d'iso-profit (ou iso-valeur) ?",
        options: [
            "La droite de la contrainte la plus restrictive",
            "Une droite sur laquelle la fonction objectif prend une valeur constante $Z = k$",
            "La frontière du domaine réalisable",
            "La droite passant par tous les sommets"
        ],
        correct: 1,
        explanation: "Une droite d'iso-profit $c_1 x_1 + c_2 x_2 = k$ regroupe tous les points $(x_1, x_2)$ donnant la même valeur $k$ de $Z$."
    },

    // --- Q56 ---
    {
        id: 56,
        theme: "Résolution graphique",
        q: "Pour maximiser graphiquement, on déplace la droite d'iso-profit dans la direction :",
        options: [
            "Vers l'origine",
            "Du gradient $\\nabla Z = (c_1, c_2)$ (direction d'augmentation de $Z$)",
            "Perpendiculairement aux axes",
            "Dans une direction aléatoire"
        ],
        correct: 1,
        explanation: "$\\nabla Z = (c_1, c_2)$ pointe vers la plus forte croissance de $Z$. On translate la droite d'iso-profit dans cette direction jusqu'au dernier contact avec le domaine."
    },

    // --- Q57 ---
    {
        id: 57,
        theme: "Résolution graphique",
        q: "Soit le PL : Max $Z = 3x_1 + 2x_2$ s.c. $x_1 + x_2 \\leq 4$, $x_1, x_2 \\geq 0$. Quel est le sommet optimal ?",
        options: [
            "$(0, 0)$ avec $Z = 0$",
            "$(0, 4)$ avec $Z = 8$",
            "$(4, 0)$ avec $Z = 12$",
            "$(2, 2)$ avec $Z = 10$"
        ],
        correct: 2,
        explanation: "Sommets : $(0,0) \\to Z=0$, $(4,0) \\to Z=12$, $(0,4) \\to Z=8$. Le maximum est en $(4,0)$ avec $Z=12$."
    },

    // --- Q58 ---
    {
        id: 58,
        theme: "Résolution graphique",
        q: "Soit Max $Z = 2x_1 + 5x_2$ s.c. $x_1 + 2x_2 \\leq 10$, $x_1 \\leq 6$, $x_1, x_2 \\geq 0$. Quel est l'optimum ?",
        options: [
            "$(6, 0)$ avec $Z = 12$",
            "$(6, 2)$ avec $Z = 22$",
            "$(0, 5)$ avec $Z = 25$",
            "$(2, 4)$ avec $Z = 24$"
        ],
        correct: 2,
        explanation: "Sommets : $(0,0) \\to 0$, $(6,0) \\to 12$, $(6,2) \\to 22$, $(0,5) \\to 25$. Le max est en $(0,5)$ avec $Z=25$."
    },

    // --- Q59 ---
    {
        id: 59,
        theme: "Résolution graphique",
        q: "La région réalisable d'un PL est l'intersection de :",
        options: [
            "Cercles et ellipses",
            "Demi-plans définis par les contraintes linéaires",
            "Courbes quelconques",
            "Droites uniquement"
        ],
        correct: 1,
        explanation: "Chaque contrainte linéaire définit un demi-plan. L'intersection de tous ces demi-plans forme le domaine réalisable (polyèdre convexe)."
    },

    // --- Q60 ---
    {
        id: 60,
        theme: "Résolution graphique",
        q: "Un domaine réalisable qui est un polyèdre convexe peut avoir :",
        options: [
            "Des côtés courbes",
            "Uniquement des côtés droits (arêtes rectilignes)",
            "Des trous à l'intérieur",
            "Des côtés ouverts uniquement"
        ],
        correct: 1,
        explanation: "L'intersection de demi-plans produit un polyèdre aux arêtes rectilignes. La convexité garantit l'absence de « creux »."
    },

    // --- Q61 ---
    {
        id: 61,
        theme: "Résolution graphique",
        q: "Une contrainte est dite « active » (saturée) en un point si :",
        options: [
            "Elle est violée en ce point",
            "Elle est vérifiée avec égalité stricte",
            "Sa variable d'écart est positive",
            "Elle n'intervient pas dans le problème"
        ],
        correct: 1,
        explanation: "Une contrainte $g(x) \\leq b$ est active en $x^*$ si $g(x^*) = b$ (la ressource est totalement utilisée, écart nul)."
    },

    // --- Q62 ---
    {
        id: 62,
        theme: "Résolution graphique",
        q: "En 2D, un sommet du domaine réalisable est défini par l'intersection de :",
        options: [
            "Exactement 1 contrainte active",
            "Exactement 2 contraintes actives",
            "Toutes les contraintes",
            "Aucune contrainte"
        ],
        correct: 1,
        explanation: "En 2D, un sommet est un point où exactement 2 droites de contraintes se croisent (2 contraintes actives)."
    },

    // --- Q63 ---
    {
        id: 63,
        theme: "Résolution graphique",
        q: "Quand un PL possède-t-il des solutions optimales multiples (infinité) ?",
        options: [
            "Quand le domaine est vide",
            "Quand la droite d'iso-profit est parallèle à une arête active du polyèdre",
            "Quand il n'y a qu'une seule contrainte",
            "Quand toutes les variables sont nulles"
        ],
        correct: 1,
        explanation: "Si $Z$ est parallèle à une arête du polyèdre, tous les points de cette arête donnent le même $Z^*$ : infinité de solutions optimales."
    },

    // --- Q64 ---
    {
        id: 64,
        theme: "Résolution graphique",
        q: "Max $Z = 2x_1 + 4x_2$ s.c. $x_1 + 2x_2 \\leq 10$, $x_1 \\leq 6$, $x_1, x_2 \\geq 0$. Que peut-on dire ?",
        options: [
            "Solution unique en $(0, 5)$",
            "Solution unique en $(6, 2)$",
            "Solutions optimales multiples car $Z$ est parallèle à $x_1 + 2x_2 = 10$",
            "Problème non borné"
        ],
        correct: 2,
        explanation: "$\\nabla Z = (2, 4) = 2(1, 2)$, parallèle à la normale de $x_1 + 2x_2 = 10$. Donc $Z$ est parallèle à cette arête : infinité de solutions optimales."
    },

    // --- Q65 ---
    {
        id: 65,
        theme: "Résolution graphique",
        q: "Un PL est dit « non borné » lorsque :",
        options: [
            "Le domaine réalisable est vide",
            "La fonction objectif peut croître (ou décroître) indéfiniment dans le domaine",
            "Il existe exactement un optimum",
            "Toutes les contraintes sont des égalités"
        ],
        correct: 1,
        explanation: "Si la direction d'amélioration de $Z$ traverse une région non bornée du polyèdre, $Z$ croît indéfiniment : pas de solution optimale finie."
    },

    // --- Q66 ---
    {
        id: 66,
        theme: "Résolution graphique",
        q: "Un PL est dit « infaisable » quand :",
        options: [
            "La solution optimale n'est pas entière",
            "Aucun point ne satisfait simultanément toutes les contraintes",
            "Les coefficients sont négatifs",
            "Il existe plusieurs solutions optimales"
        ],
        correct: 1,
        explanation: "Si l'intersection des demi-plans est vide, aucune solution réalisable n'existe : le problème est infaisable."
    },

    // --- Q67 ---
    {
        id: 67,
        theme: "Résolution graphique",
        q: "Soit Max $Z = x_1 + x_2$ s.c. $x_1 + x_2 \\leq 6$, $x_1 - x_2 \\leq 2$, $x_1, x_2 \\geq 0$. Le sommet $(4, 2)$ est-il réalisable ?",
        options: [
            "Oui car $4 + 2 = 6 \\leq 6$ et $4 - 2 = 2 \\leq 2$",
            "Non car $4 + 2 > 6$",
            "Non car $4 - 2 > 2$",
            "Non car $x_2 < 0$"
        ],
        correct: 0,
        explanation: "Vérifions : $4 + 2 = 6 \\leq 6$ ✓ et $4 - 2 = 2 \\leq 2$ ✓ et $x_1, x_2 \\geq 0$ ✓. Le point est bien réalisable."
    },

    // --- Q68 ---
    {
        id: 68,
        theme: "Résolution graphique",
        q: "Parmi ces quatre cas, lequel ne peut PAS se produire dans un PL ?",
        options: [
            "Solution optimale unique",
            "Solutions optimales multiples",
            "Problème non borné",
            "Solution optimale à l'intérieur strict du domaine (pas sur la frontière)"
        ],
        correct: 3,
        explanation: "L'optimum d'une fonction linéaire sur un polyèdre convexe se trouve toujours sur la frontière (un sommet ou une arête), jamais strictement à l'intérieur."
    },

    // --- Q69 ---
    {
        id: 69,
        theme: "Résolution graphique",
        q: "Qu'est-ce qu'un sommet dégénéré en 2D ?",
        options: [
            "Un sommet à l'infini",
            "Un sommet où plus de 2 contraintes sont actives simultanément",
            "Un sommet avec des coordonnées négatives",
            "Un sommet qui n'est pas optimal"
        ],
        correct: 1,
        explanation: "En 2D, un sommet est normalement défini par 2 contraintes actives. Si plus de 2 droites passent par le même point, il y a dégénérescence."
    },

    // --- Q70 ---
    {
        id: 70,
        theme: "Résolution graphique",
        q: "Soit les contraintes $x_1 + 2x_2 \\leq 8$ et $x_1 \\leq 4$, $x_1, x_2 \\geq 0$. Le sommet $(4, 2)$ est l'intersection de :",
        options: [
            "$x_1 = 0$ et $x_2 = 0$",
            "$x_1 = 4$ et $x_1 + 2x_2 = 8$",
            "$x_1 + 2x_2 = 8$ et $x_2 = 0$",
            "$x_1 = 4$ et $x_2 = 0$"
        ],
        correct: 1,
        explanation: "En $(4, 2)$ : $x_1 = 4$ ✓ (contrainte $x_1 \\leq 4$ active) et $4 + 2 \\times 2 = 8$ ✓ (contrainte $x_1 + 2x_2 \\leq 8$ active)."
    },

    // --- Q71 ---
    {
        id: 71,
        theme: "Résolution graphique",
        q: "Combien de sommets a au maximum le domaine réalisable d'un PL à 2 variables avec 4 contraintes (plus $x_1, x_2 \\geq 0$) ?",
        options: [
            "4",
            "6",
            "8",
            "15"
        ],
        correct: 3,
        explanation: "Avec 6 contraintes au total ($4 + 2$ non-négativité), le nombre maximal de sommets est $\\binom{6}{2} = 15$ (chaque paire de droites donne un point candidat)."
    },

    // --- Q72 ---
    {
        id: 72,
        theme: "Résolution graphique",
        q: "Pour minimiser graphiquement, on déplace la droite d'iso-coût :",
        options: [
            "Dans la direction du gradient $\\nabla Z$",
            "Dans la direction opposée au gradient $-\\nabla Z$",
            "Parallèlement à l'axe $x_1$",
            "Vers le sommet le plus éloigné"
        ],
        correct: 1,
        explanation: "Pour minimiser, on se déplace dans la direction opposée au gradient $-\\nabla Z$ pour diminuer $Z$ le plus possible tout en restant dans le domaine."
    },

    // --- Q73 ---
    {
        id: 73,
        theme: "Résolution graphique",
        q: "Soit Max $Z = 5x_1 + 4x_2$ s.c. $x_1 \\leq 4$, $x_2 \\leq 6$, $x_1 + x_2 \\leq 8$, $x_1, x_2 \\geq 0$. En $(4, 4)$, $Z$ vaut :",
        options: [
            "32",
            "36",
            "40",
            "$(4, 4)$ n'est pas réalisable"
        ],
        correct: 1,
        explanation: "Vérifions : $x_1 = 4 \\leq 4$ ✓, $x_2 = 4 \\leq 6$ ✓, $4 + 4 = 8 \\leq 8$ ✓. $Z = 5(4) + 4(4) = 20 + 16 = 36$."
    },

    // --- Q74 ---
    {
        id: 74,
        theme: "Résolution graphique",
        q: "Si le domaine réalisable est un triangle avec les sommets $(0,0)$, $(6,0)$, $(0,4)$, et $Z = 3x_1 + 5x_2$, quel est l'optimum ?",
        options: [
            "$(0, 0)$ avec $Z = 0$",
            "$(6, 0)$ avec $Z = 18$",
            "$(0, 4)$ avec $Z = 20$",
            "$(3, 2)$ avec $Z = 19$"
        ],
        correct: 2,
        explanation: "$(0,0) \\to 0$, $(6,0) \\to 18$, $(0,4) \\to 20$. Le maximum est en $(0,4)$ avec $Z = 20$."
    },

    // --- Q75 ---
    {
        id: 75,
        theme: "Résolution graphique",
        q: "Si deux sommets adjacents donnent la même valeur optimale de $Z$, alors :",
        options: [
            "Le problème est infaisable",
            "Toute combinaison convexe de ces deux sommets est aussi optimale (infinité de solutions)",
            "Il faut choisir arbitrairement l'un des deux",
            "Le problème est non borné"
        ],
        correct: 1,
        explanation: "Si $Z(A) = Z(B) = Z^*$ et A, B sont adjacents, alors tout point $\\lambda A + (1-\\lambda) B$ ($0 \\leq \\lambda \\leq 1$) donne aussi $Z^*$."
    },

    // ╔══════════════════════════════════════════════════════════════════╗
    // ║  PARTIE 4 — MÉTHODE DU SIMPLEXE  (25 questions)                ║
    // ╚══════════════════════════════════════════════════════════════════╝

    // --- Q76 ---
    {
        id: 76,
        theme: "Simplexe",
        q: "L'algorithme du simplexe est une méthode :",
        options: [
            "Qui évalue tous les sommets simultanément",
            "Itérative qui se déplace de sommet en sommet en améliorant $Z$ à chaque étape",
            "Graphique limitée à 2 variables",
            "Qui résout uniquement les problèmes de minimisation"
        ],
        correct: 1,
        explanation: "Le simplexe part d'un sommet initial et se déplace vers un sommet voisin améliorant $Z$, jusqu'à atteindre l'optimum."
    },

    // --- Q77 ---
    {
        id: 77,
        theme: "Simplexe",
        q: "Avant d'appliquer le simplexe, le PL doit être mis sous :",
        options: [
            "Forme canonique (inégalités)",
            "Forme standard (égalités avec variables d'écart)",
            "Forme graphique",
            "Forme matricielle pure"
        ],
        correct: 1,
        explanation: "Le simplexe travaille sur un système d'égalités. Il faut d'abord convertir toutes les inégalités en égalités (forme standard)."
    },

    // --- Q78 ---
    {
        id: 78,
        theme: "Simplexe",
        q: "Dans le tableau du simplexe, que contient la dernière ligne (ligne $Z$) ?",
        options: [
            "Les valeurs des variables de base",
            "Les coefficients réduits ($c_j - z_j$) utilisés pour tester l'optimalité",
            "Les contraintes du problème",
            "Les variables d'écart uniquement"
        ],
        correct: 1,
        explanation: "La ligne $Z$ contient les $c_j - z_j$ (coûts réduits). On les utilise pour déterminer la variable entrante et tester l'optimalité."
    },

    // --- Q79 ---
    {
        id: 79,
        theme: "Simplexe",
        q: "Pour un problème de maximisation, la solution est optimale quand :",
        options: [
            "Il reste des $c_j - z_j < 0$",
            "Tous les $c_j - z_j \\leq 0$ (aucun coefficient négatif ou nul dans la convention usuelle)",
            "Toutes les variables sont en base",
            "La fonction objectif est nulle"
        ],
        correct: 1,
        explanation: "Quand tous les $c_j - z_j \\leq 0$ (convention $\\geq 0$ possible selon la formulation), aucune amélioration n'est possible : la solution est optimale."
    },

    // --- Q80 ---
    {
        id: 80,
        theme: "Simplexe",
        q: "Comment choisit-on la variable entrante dans le simplexe (maximisation) ?",
        options: [
            "La variable avec le plus grand $c_j - z_j > 0$",
            "La variable avec le plus petit $c_j - z_j$",
            "La première variable du tableau",
            "La variable de base avec la plus grande valeur"
        ],
        correct: 0,
        explanation: "On choisit la variable hors base avec le plus grand $c_j - z_j$ positif (ou le plus grand négatif en valeur absolue selon la convention) : c'est la plus prometteuse pour améliorer $Z$."
    },

    // --- Q81 ---
    {
        id: 81,
        theme: "Simplexe",
        q: "Le critère de sortie de la base repose sur :",
        options: [
            "Le test du rapport minimum $\\theta = \\min\\{b_i / a_{ij} \\mid a_{ij} > 0\\}$",
            "Le plus grand coefficient de la colonne pivot",
            "Le coefficient le plus négatif de la ligne $Z$",
            "Un choix arbitraire"
        ],
        correct: 0,
        explanation: "On calcule $\\theta_i = b_i / a_{ij}$ pour chaque $a_{ij} > 0$ dans la colonne entrante. La variable basique avec le plus petit $\\theta$ sort."
    },

    // --- Q82 ---
    {
        id: 82,
        theme: "Simplexe",
        q: "Qu'est-ce que l'élément pivot dans le tableau du simplexe ?",
        options: [
            "Le coefficient de la fonction objectif",
            "Le coefficient à l'intersection de la colonne entrante et de la ligne sortante",
            "Le dernier élément de la ligne $Z$",
            "La valeur de la variable de base"
        ],
        correct: 1,
        explanation: "Le pivot est $a_{rs}$ situé à l'intersection de la colonne de la variable entrante ($s$) et de la ligne de la variable sortante ($r$)."
    },

    // --- Q83 ---
    {
        id: 83,
        theme: "Simplexe",
        q: "Lors du pivotage, la nouvelle ligne pivot est obtenue en :",
        options: [
            "Multipliant la ligne par le pivot",
            "Divisant toute la ligne pivot par l'élément pivot",
            "Ajoutant le pivot à chaque élément",
            "Échangeant la ligne avec la ligne $Z$"
        ],
        correct: 1,
        explanation: "On divise la ligne pivot par $a_{rs}$ pour obtenir un 1 en position pivot : $\\text{Nouvelle L}_r = \\text{Ancienne L}_r / a_{rs}$."
    },

    // --- Q84 ---
    {
        id: 84,
        theme: "Simplexe",
        q: "Pour les autres lignes (non pivot), le pivotage consiste à :",
        options: [
            "Les multiplier par le pivot",
            "Les diviser par le pivot",
            "Soustraire un multiple de la nouvelle ligne pivot pour annuler l'élément dans la colonne pivot",
            "Les laisser inchangées"
        ],
        correct: 2,
        explanation: "$\\text{Nouvelle L}_i = \\text{Ancienne L}_i - a_{is} \\times \\text{Nouvelle L}_r$ pour obtenir un 0 dans la colonne pivot."
    },

    // --- Q85 ---
    {
        id: 85,
        theme: "Simplexe",
        q: "Qu'est-ce qu'une solution de base réalisable (SBR) ?",
        options: [
            "Toute solution avec des variables positives",
            "Un sommet du polyèdre avec $m$ variables basiques $\\geq 0$ et $n - m$ variables hors base nulles",
            "La solution optimale",
            "Une solution avec toutes les variables nulles"
        ],
        correct: 1,
        explanation: "Une SBR a exactement $m$ variables basiques ($\\geq 0$) et les $n - m$ autres fixées à 0. Chaque SBR correspond à un sommet du polyèdre."
    },

    // --- Q86 ---
    {
        id: 86,
        theme: "Simplexe",
        q: "Combien de variables basiques y a-t-il dans un système de $m$ contraintes d'égalité et $n$ variables ?",
        options: [
            "$n$",
            "$m$",
            "$n - m$",
            "$n + m$"
        ],
        correct: 1,
        explanation: "Le simplexe sélectionne $m$ variables basiques (une par contrainte) et fixe les $n - m$ variables hors base à 0."
    },

    // --- Q87 ---
    {
        id: 87,
        theme: "Simplexe",
        q: "Si tous les $a_{ij}$ de la colonne entrante sont $\\leq 0$, alors :",
        options: [
            "La solution est optimale",
            "Le problème est non borné ($Z \\to +\\infty$)",
            "Le problème est infaisable",
            "On choisit une autre variable entrante"
        ],
        correct: 1,
        explanation: "Si $a_{ij} \\leq 0$ pour tout $i$, la variable entrante peut augmenter sans limite sans violer aucune contrainte : $Z \\to +\\infty$."
    },

    // --- Q88 ---
    {
        id: 88,
        theme: "Simplexe",
        q: "La dégénérescence dans le simplexe se produit quand :",
        options: [
            "Le problème est non borné",
            "Deux ratios $\\theta_i$ sont égaux lors du test du rapport minimum",
            "Tous les coefficients réduits sont nuls",
            "Le domaine réalisable est vide"
        ],
        correct: 1,
        explanation: "L'égalité de deux ratios entraîne qu'au moins une variable basique vaudra 0 à l'itération suivante (dégénérescence). $Z$ peut ne pas s'améliorer."
    },

    // --- Q89 ---
    {
        id: 89,
        theme: "Simplexe",
        q: "Dans le tableau initial du simplexe (après mise en forme standard avec variables d'écart pour $\\leq$), quelles sont les variables de base ?",
        options: [
            "Les variables de décision $x_1, x_2, \\ldots$",
            "Les variables d'écart $e_1, e_2, \\ldots$",
            "La variable $Z$",
            "Toutes les variables"
        ],
        correct: 1,
        explanation: "Au départ, les variables d'écart forment la matrice identité et constituent donc la base initiale. Les variables de décision sont hors base (= 0)."
    },

    // --- Q90 ---
    {
        id: 90,
        theme: "Simplexe",
        q: "Si un coefficient réduit $c_j - z_j = 0$ pour une variable hors base à l'optimum, cela signifie :",
        options: [
            "Le problème est infaisable",
            "La variable peut entrer en base sans changer la valeur de $Z$ : il existe des solutions optimales multiples",
            "Le problème est non borné",
            "La variable doit être supprimée"
        ],
        correct: 1,
        explanation: "Un $c_j - z_j = 0$ pour une variable hors base signifie qu'on peut la faire entrer en base sans modifier $Z^*$ : autre sommet optimal possible."
    },

    // --- Q91 ---
    {
        id: 91,
        theme: "Simplexe",
        q: "Soit le tableau final du simplexe avec $Z = 36$, $x_1 = 4$, $x_2 = 2$, $e_1 = 0$, $e_2 = 3$. Quelle contrainte est saturée ?",
        options: [
            "La contrainte 1 (car $e_1 = 0$)",
            "La contrainte 2 (car $e_2 = 3$)",
            "Les deux contraintes",
            "Aucune contrainte"
        ],
        correct: 0,
        explanation: "$e_1 = 0$ signifie que la contrainte 1 est active (pas de reste). $e_2 = 3 > 0$ signifie que la contrainte 2 a un surplus de 3 unités."
    },

    // --- Q92 ---
    {
        id: 92,
        theme: "Simplexe",
        q: "Combien d'itérations au maximum le simplexe peut-il effectuer sur un PL avec $m$ contraintes et $n$ variables ?",
        options: [
            "$m$",
            "$n$",
            "$\\binom{n}{m}$ (combinaison)",
            "Infini dans tous les cas"
        ],
        correct: 2,
        explanation: "Le nombre maximal de SBR est $\\binom{n}{m}$, donc le simplexe visite au plus ce nombre de sommets. En pratique, il converge bien plus vite."
    },

    // --- Q93 ---
    {
        id: 93,
        theme: "Simplexe",
        q: "Dans la ligne des coûts réduits : $x_1 : 0$, $x_2 : -3$, $e_1 : 0$, $e_2 : -2$. Que peut-on conclure ?",
        options: [
            "Le problème est non borné",
            "$x_1$ doit entrer en base",
            "La solution courante est optimale (tous les $c_j - z_j \\leq 0$)",
            "Le problème est infaisable"
        ],
        correct: 2,
        explanation: "Tous les $c_j - z_j \\leq 0$ : aucune variable ne peut améliorer $Z$. La solution courante est optimale."
    },

    // --- Q94 ---
    {
        id: 94,
        theme: "Simplexe",
        q: "Tableau simplexe : Base = {$e_1, e_2$}, VB = {$40, 24$}, coefficients de $x_1$ dans la colonne : 2 et 4. Ratios : $40/2 = 20$ et $24/4 = 6$. Quelle variable sort ?",
        options: [
            "$e_1$ car $40/2 = 20$ est le plus grand",
            "$e_2$ car $24/4 = 6$ est le plus petit",
            "$x_1$ car elle entre en base",
            "Aucune variable ne sort"
        ],
        correct: 1,
        explanation: "On choisit le ratio minimum : $\\min(20, 6) = 6$, donc $e_2$ sort de la base."
    },

    // --- Q95 ---
    {
        id: 95,
        theme: "Simplexe",
        q: "Après pivotage, la colonne de la variable entrante doit ressembler à :",
        options: [
            "Une colonne de zéros",
            "Une colonne de uns",
            "Un vecteur unitaire (un seul 1, le reste des 0)",
            "La colonne originale inchangée"
        ],
        correct: 2,
        explanation: "Le pivotage crée un vecteur unitaire dans la colonne entrante : 1 sur la ligne pivot et 0 partout ailleurs."
    },

    // --- Q96 ---
    {
        id: 96,
        theme: "Simplexe",
        q: "Max $Z = 30x_1 + 50x_2$ s.c. $2x_1 + 3x_2 \\leq 24$, $x_1, x_2 \\geq 0$. Après ajout de l'écart $e_1$, la ligne $Z$ du tableau initial est :",
        options: [
            "$Z - 30x_1 - 50x_2 = 0$",
            "$Z + 30x_1 + 50x_2 = 0$",
            "$Z = 30x_1 + 50x_2$",
            "$-30x_1 - 50x_2 + Z = 24$"
        ],
        correct: 0,
        explanation: "On écrit $Z = 30x_1 + 50x_2$ sous la forme $Z - 30x_1 - 50x_2 - 0 \\cdot e_1 = 0$ pour l'intégrer au tableau."
    },

    // --- Q97 ---
    {
        id: 97,
        theme: "Simplexe",
        q: "Dans le test du rapport minimum, pourquoi ne considère-t-on que les $a_{ij} > 0$ ?",
        options: [
            "Pour simplifier les calculs",
            "Parce que si $a_{ij} \\leq 0$, la variable basique ne limite pas la variable entrante (elle reste $\\geq 0$)",
            "Parce que $a_{ij} \\leq 0$ est impossible en PL",
            "Pour éviter la dégénérescence"
        ],
        correct: 1,
        explanation: "Si $a_{ij} \\leq 0$, augmenter la variable entrante ne fait pas diminuer la variable basique $i$ : cette ligne ne contraint pas l'entrée."
    },

    // --- Q98 ---
    {
        id: 98,
        theme: "Simplexe",
        q: "Combien de variables hors base y a-t-il dans un PL en forme standard avec $n$ variables et $m$ contraintes ?",
        options: [
            "$m$",
            "$n$",
            "$n - m$",
            "$n + m$"
        ],
        correct: 2,
        explanation: "Avec $m$ variables basiques, il reste $n - m$ variables hors base fixées à 0 dans chaque SBR."
    },

    // --- Q99 ---
    {
        id: 99,
        theme: "Simplexe",
        q: "Si à l'issue du simplexe, une variable artificielle reste en base avec une valeur > 0, alors :",
        options: [
            "La solution est optimale",
            "Le problème original est infaisable",
            "Le problème est non borné",
            "On continue les itérations"
        ],
        correct: 1,
        explanation: "Si une variable artificielle reste positive, aucune solution réalisable n'existe pour le problème original : il est infaisable."
    },

    // --- Q100 ---
    {
        id: 100,
        theme: "Simplexe",
        q: "Quelle est la complexité théorique du simplexe dans le pire cas pour $m$ contraintes et $n$ variables ?",
        options: [
            "$O(n)$",
            "$O(m \\times n)$",
            "Exponentielle en $\\binom{n}{m}$ dans le pire cas, mais très efficace en pratique",
            "Toujours polynomiale"
        ],
        correct: 2,
        explanation: "Le simplexe peut théoriquement visiter $\\binom{n}{m}$ sommets (exponentiel). Mais en pratique, il converge en $O(m)$ à $O(3m)$ itérations pour la plupart des problèmes."
    },

    // ╔══════════════════════════════════════════════════════════════════╗
    // ║  QUESTIONS STYLE EXAMEN  (Q101–Q110)                            ║
    // ╚══════════════════════════════════════════════════════════════════╝

    // --- Q101 ---
    {
        id: 101,
        theme: "Simplexe",
        q: "Qu'appelle-t-on « test d'optimalité » dans la méthode du Simplexe ?",
        options: [
            "Vérifier que toutes les variables sont positives",
            "Vérifier si tous les coefficients de la ligne Z pour les variables hors base sont ≥ 0 (maximisation) ou ≤ 0 (minimisation)",
            "Calculer le ratio minimum pour la variable sortante",
            "Vérifier que la matrice des contraintes est inversible"
        ],
        correct: 1,
        explanation: "Le test d'optimalité consiste à examiner les coefficients $\\bar{c}_j$ de la ligne Z. En maximisation, si tous sont ≥ 0, la solution courante est optimale (aucune amélioration possible)."
    },

    // --- Q102 ---
    {
        id: 102,
        theme: "Simplexe",
        q: "Qu'est-ce que le « gain marginal » d'une variable hors base ?",
        options: [
            "Le coût de production de cette variable",
            "L'amélioration de Z obtenue en introduisant une unité de cette variable dans la base",
            "Le ratio entre le RHS et le coefficient de la colonne pivot",
            "Le coefficient de la variable dans la fonction objectif originale"
        ],
        correct: 1,
        explanation: "Le gain marginal (ou coût réduit) $\\bar{c}_j$ mesure de combien Z s'améliorerait si on produisait une unité de la variable $x_j$ (hors base). C'est le coefficient dans la ligne Z du tableau courant."
    },

    // --- Q103 ---
    {
        id: 103,
        theme: "Simplexe",
        q: "Le « critère de Dantzig » (règle du plus grand gain marginal) consiste à :",
        options: [
            "Choisir comme variable entrante celle dont le coefficient dans la ligne Z est le plus négatif (maximisation)",
            "Choisir comme variable sortante celle de plus petit ratio",
            "Ajouter une variable artificielle au problème",
            "Diviser la ligne pivot par l'élément pivot"
        ],
        correct: 0,
        explanation: "Le critère de Dantzig sélectionne la variable entrante comme celle ayant le coefficient le plus négatif dans la ligne Z (en maximisation), ce qui correspond au plus grand gain marginal par unité."
    },

    // --- Q104 ---
    {
        id: 104,
        theme: "Simplexe",
        q: "Qu'est-ce qu'une solution admissible (= réalisable) d'un programme linéaire ?",
        options: [
            "Toute solution qui maximise la fonction objectif",
            "Toute solution qui satisfait toutes les contraintes y compris la non-négativité",
            "Toute solution de base, même si elle viole certaines contraintes",
            "Toute solution entière"
        ],
        correct: 1,
        explanation: "Une solution admissible (ou réalisable) est un point $(x_1, \\ldots, x_n)$ qui respecte TOUTES les contraintes du problème, y compris $x_j \\geq 0$."
    },

    // --- Q105 ---
    {
        id: 105,
        theme: "Simplexe",
        q: "Que signifie qu'une variable est « hors la base » dans le tableau simplexe ?",
        options: [
            "Elle a la valeur la plus grande",
            "Elle a une valeur nulle (= 0) dans la solution courante",
            "Elle a été supprimée du problème",
            "Elle correspond à une contrainte saturée"
        ],
        correct: 1,
        explanation: "Une variable hors la base (VHB) est fixée à zéro dans la solution de base courante. Elle ne contribue pas au profit. C'est parmi les VHB qu'on choisit la variable entrante."
    },

    // --- Q106 ---
    {
        id: 106,
        theme: "Formes",
        q: "Un PL a 5 variables de décision et 3 contraintes fonctionnelles (toutes ≤). Combien de variables d'écart faut-il ajouter pour la forme standard ?",
        options: [
            "5",
            "8",
            "3",
            "15"
        ],
        correct: 2,
        explanation: "On ajoute une variable d'écart par contrainte fonctionnelle. Avec 3 contraintes, il faut 3 variables d'écart. Le total des variables en forme standard sera 5 + 3 = 8."
    },

    // --- Q107 ---
    {
        id: 107,
        theme: "Simplexe",
        q: "Qu'est-ce qu'une variable d'écart ($e_i$) en valeur nulle dans la solution optimale ?",
        options: [
            "La ressource correspondante n'est pas utilisée",
            "La contrainte correspondante est saturée (la ressource est entièrement consommée)",
            "L'algorithme a fait une erreur de calcul",
            "La variable de décision correspondante est nulle"
        ],
        correct: 1,
        explanation: "$e_i = 0$ signifie que l'écart entre la consommation et la disponibilité est nul : la ressource $i$ est utilisée à 100%. On dit que la contrainte est saturée (ou active)."
    },

    // --- Q108 ---
    {
        id: 108,
        theme: "Simplexe",
        q: "Dans le problème de l'ébéniste, les coefficients techniques $a_{ij}$ représentent :",
        options: [
            "Le bénéfice par type de bureau",
            "La quantité de ressource $i$ consommée par une unité du bureau $j$",
            "Le nombre total de bureaux produits",
            "La disponibilité de chaque machine"
        ],
        correct: 1,
        explanation: "Les coefficients techniques $a_{ij}$ indiquent combien d'heures de l'opération $i$ (découpage, ponçage, assemblage, finition) sont nécessaires pour fabriquer une unité du bureau $j$ (luxe ou standard)."
    },

    // --- Q109 ---
    {
        id: 109,
        theme: "Simplexe",
        q: "D'après le théorème fondamental de la programmation linéaire, si un PL admet une solution optimale, celle-ci se trouve :",
        options: [
            "Au centre du domaine réalisable",
            "Sur n'importe quel point du domaine réalisable",
            "Sur un sommet (coin) du polyèdre des solutions réalisables",
            "À l'intersection de la fonction objectif et de l'axe des abscisses"
        ],
        correct: 2,
        explanation: "Le théorème fondamental garantit que l'optimum se trouve en un sommet du polyèdre des solutions réalisables. C'est pourquoi le Simplexe ne teste que les sommets."
    },

    // --- Q110 ---
    {
        id: 110,
        theme: "Simplexe",
        q: "Qu'appelle-t-on « coefficients économiques » ($c_j$) d'un programme linéaire ?",
        options: [
            "Les constantes du 2ème membre des contraintes",
            "Les coefficients de la matrice des contraintes",
            "Les contributions unitaires de chaque variable à la fonction objectif",
            "Les variables d'écart du tableau simplexe"
        ],
        correct: 2,
        explanation: "Les coefficients économiques $c_j$ mesurent la contribution de chaque unité de la variable $x_j$ à la fonction objectif $Z$. Par exemple, si $Z = 5x_1 + 4x_2$, alors $c_1 = 5$ et $c_2 = 4$."
    }
];
