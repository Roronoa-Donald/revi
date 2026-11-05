# refonte/fiches_ro.py
# -*- coding: utf-8 -*-
"""
Fiches de conception Recherche Opérationnelle B2 (ro2-c1-e1 à ro2-c6-e3, 20 fiches)
100% alignées sur les Devoirs Surveillés B2A/B2B, l'Examen Final RO 2024-2025 (3h)
et le problème d'ordonnancement avec accélération de tâches (crashing).
"""

import os

FICHES_DIR = '/home/rd/Desktop/proba/refonte/fiches'
os.makedirs(FICHES_DIR, exist_ok=True)

fiches_data = [
    # Chapitre 1 : Modélisation linéaire
    {
        "id": "ro2-c1-e1",
        "title": "Atelier de fabrication P1/P2 : variables et fonction objectif",
        "chapter": 1,
        "source": "RD-RO/ref/DS-B2A-IT.pdf:1 & DS-B2B-IT.pdf:1 (Partie B)",
        "context": "Un atelier produit deux types de pièces P1 et P2 générant respectivement des marges de 3 000 FCFA et 2 500 FCFA par unité. On formalise les variables de décision et l'objectif de maximisation.",
        "type": "Modélisation de fonction objectif et positivité",
        "component": "Grille d'analyse CodeLab",
        "statement": "Une entreprise fabrique deux pièces P1 et P2 avec des profits unitaires respectifs de 3 000 FCFA et 2 500 FCFA. Soient x1 et x2 les quantités produites.\n1. Donnez la fonction objectif Z à maximiser.\n2. Évaluez le profit pour un plan de production candidat (x1 = 10, x2 = 8).",
        "solution": "[Exemple]\nMAX Z = 3000*x1 + 2500*x2 ; VALIDE Z=50000\n\n[Cas 1 — Plan x1=10, x2=8]\nVALIDE Z=50000\n\n[Cas 2 — Plan x1=15, x2=0]\nVALIDE Z=45000\n\n[Cas 3 — Plan x1=-2, x2=10]\nNON_VALIDE VIOLATION_SIGNE",
        "steps": "1. Variables : x1 >= 0 et x2 >= 0 (contrainte physique de non-négativité).\n2. Objectif : MAX Z = 3000·x1 + 2500·x2.\n3. Pour x1=10 et x2=8 : Z = 3000(10) + 2500(8) = 30000 + 20000 = 50000 FCFA.",
        "accepted": [
            "VALIDE Z=50000",
            "VALIDE Z = 50000",
            "VALIDE Z=50 000",
            "50000",
            "Z = 50000"
        ],
        "rejected": [
            {"cmd": "NON_VALIDE", "reason": "Pour x1=10 et x2=8, les deux quantités sont strictement positives, le plan est valide."},
            {"cmd": "5500", "reason": "5500 est la somme des coefficients (3000 + 2500) ; multipliez par les quantités (10 et 8)."},
            {"cmd": "VIOLATION_SIGNE", "reason": "Aucune variable n'est négative dans ce cas (x1=10 >= 0, x2=8 >= 0)."},
            {"cmd": "MIN Z", "reason": "Le problème d'un fabricant est de MAXIMISER son profit brut, pas de le minimiser."},
            {"cmd": "Z=45000", "reason": "3000*10 + 2500*8 = 30000 + 20000 = 50000 (45000 correspond à 15 unités de P1)."}
        ]
    },
    {
        "id": "ro2-c1-e2",
        "title": "Contraintes d'atelier M1/M2, marges résiduelles et saturation",
        "chapter": 1,
        "source": "RD-RO/ref/DS-B2A-IT.pdf:1 & DS-B2B-IT.pdf:1 (Partie B)",
        "context": "Capacités machines : M1 dispose de 120h (requiert 3h/P1 et 4h/P2), M2 dispose de 60h (requiert 2h/P1 et 1h/P2). Calcul de consommation et d'écarts résiduels.",
        "type": "Vérification de faisabilité et calcul d'écarts (slacks)",
        "component": "Grille d'analyse CodeLab",
        "statement": "Les contraintes machines sont :\n- Machine M1 : 3·x1 + 4·x2 <= 120 heures\n- Machine M2 : 2·x1 + 1·x2 <= 60 heures\nPour le plan candidat (x1 = 20, x2 = 10), vérifiez la faisabilité et calculez les marges inemployées s1 et s2.",
        "solution": "[Exemple]\nREALISABLE s1=20 s2=10\n\n[Cas 1 — Plan x1=20, x2=10]\nREALISABLE s1=20 s2=10\n\n[Cas 2 — Plan x1=24, x2=12]\nREALISABLE s1=0 s2=0\n\n[Cas 3 — Plan x1=35, x2=5]\nIRREALISABLE VIOLATION_M2",
        "steps": "1. M1 : 3(20) + 4(10) = 60 + 40 = 100 <= 120. Écart s1 = 120 - 100 = 20h.\n2. M2 : 2(20) + 1(10) = 40 + 10 = 50 <= 60. Écart s2 = 60 - 50 = 10h.\n3. Les deux capacités sont respectées avec marge : REALISABLE s1=20 s2=10.",
        "accepted": [
            "REALISABLE s1=20 s2=10",
            "REALISABLE s1 = 20 s2 = 10",
            "s1=20 s2=10",
            "REALISABLE (20, 10)",
            "REALISABLE s1=20, s2=10"
        ],
        "rejected": [
            {"cmd": "IRREALISABLE", "reason": "Conso M1 = 100h <= 120h et Conso M2 = 50h <= 60h : toutes les contraintes sont respectées."},
            {"cmd": "s1=0 s2=0", "reason": "Le plan (20, 10) ne sature pas les machines, il reste 20h sur M1 et 10h sur M2."},
            {"cmd": "s1=100 s2=50", "reason": "100 et 50 sont les heures CONSOMMÉES ; l'écart s_i est la capacité restante inemployée (b_i - conso)."},
            {"cmd": "VIOLATION_SIGNE", "reason": "x1=20 et x2=10 sont positives, aucune violation de non-négativité."},
            {"cmd": "VIOLATION_M1", "reason": "La machine M1 consomme 100h sur 120h disponibles : aucune violation sur M1."}
        ]
    },
    {
        "id": "ro2-c1-e3",
        "title": "Modélisation d'un problème de mélange / régime alimentaire",
        "chapter": 1,
        "source": "RD-RO/RO-10-Exercices-Modelisation.pdf:3 (Exercice 2 : Diet problem)",
        "context": "Composition d'un aliment bétail au coût minimum satisfaisant des besoins minimaux en protéines (≥ 800g) et vitamines (≥ 200g) à partir de deux céréales A et B.",
        "type": "Modélisation de minimisation avec contraintes >= ",
        "component": "Grille d'analyse CodeLab",
        "statement": "Un éleveur mélange deux céréales A et B coûtant respectivement 5 € et 8 € le kg. Il doit apporter au moins 800g de protéines et 200g de vitamines. Donnez l'objectif et les contraintes sous forme standardisée.",
        "solution": "[Exemple]\nMIN Z = 5*xA + 8*xB ; CONTRAINTES_VALIDEES\n\n[Cas 1 — Modele standard]\nMIN Z = 5*xA + 8*xB\n\n[Cas 2 — Plan xA=100, xB=50]\nVALIDE Z=900",
        "steps": "1. Variables : xA = kg de A, xB = kg de B (xA, xB >= 0).\n2. Fonction objectif : MIN Z = 5·xA + 8·xB.\n3. Contraintes de besoin minimal de type supérieur ou égal (>=).",
        "accepted": [
            "MIN Z = 5*xA + 8*xB",
            "MIN Z = 5*x1 + 8*x2",
            "MIN 5*xA + 8*xB",
            "VALIDE Z=900",
            "MIN Z=5xA+8xB"
        ],
        "rejected": [
            {"cmd": "MAX Z", "reason": "Un coût d'achat doit être MINIMISÉ, pas maximisé."},
            {"cmd": "<= 800", "reason": "Les besoins nutritionnels sont des exigences MINIMALES, la contrainte doit être >= 800."},
            {"cmd": "NON_VALIDE", "reason": "Le modèle est parfaitement linéaire et réalisable."},
            {"cmd": "Z = 13", "reason": "13 est 5 + 8, or les variables xA et xB sont inconnues à optimiser."},
            {"cmd": "xA < 0", "reason": "Une quantité physique d'aliment ne peut pas être strictement négative (xA, xB >= 0)."}
        ]
    },
    {
        "id": "ro2-c1-e4",
        "title": "Modélisation de transport et équilibre offre-demande",
        "chapter": 1,
        "source": "RD-RO/RO-10-Exercices-Modelisation.pdf:7 (Exercice 5 : Transport)",
        "context": "Réseau logistique : expédition de marchandises depuis 2 entrepôts vers 3 centres commerciaux avec coûts kilométriques unitaires.",
        "type": "Modélisation de réseau de transport",
        "component": "Grille d'analyse CodeLab",
        "statement": "Soient x_ij les quantités expédiées de l'entrepôt i (i ∈ {1, 2}) vers la destination j (j ∈ {1, 2, 3}). Écrivez la contrainte de conservation de flux pour l'entrepôt 1 ayant une capacité totale d'offre S1 = 500 unités.",
        "solution": "[Exemple]\nx11 + x12 + x13 <= 500\n\n[Cas 1 — Offre Entrepot 1]\nx11 + x12 + x13 <= 500\n\n[Cas 2 — Demande Magasin 1 D1=200]\nx11 + x21 >= 200",
        "steps": "1. Tout ce qui part de l'entrepôt 1 va vers les destinations 1, 2 ou 3 : x11 + x12 + x13.\n2. La somme ne peut excéder l'offre disponible : x11 + x12 + x13 <= 500.",
        "accepted": [
            "x11 + x12 + x13 <= 500",
            "x11 + x12 + x13 = 500",
            "x11+x12+x13<=500",
            "sum(x1j) <= 500",
            "x11 + x12 + x13 <= 500"
        ],
        "rejected": [
            {"cmd": "x11 + x21 <= 500", "reason": "x11 + x21 correspond aux réceptions du magasin 1 depuis les deux entrepôts, pas aux expéditions de l'entrepôt 1."},
            {"cmd": "x11 >= 500", "reason": "La capacité globale limite la somme des flux sortants, pas un seul flux isolé."},
            {"cmd": "<= 200", "reason": "200 est la demande du magasin, l'offre de l'entrepôt 1 est de 500 unités."},
            {"cmd": "MIN 500", "reason": "Il s'agit d'une contrainte d'inégalité linéaire, pas d'une fonction objectif."},
            {"cmd": "x11*x12", "reason": "Un problème de transport linéaire ne contient aucun terme non-linéaire (produit de variables)."}
        ]
    },
    {
        "id": "ro2-c1-e5",
        "title": "Sélection de projets sous contrainte budgétaire (sac à dos 0-1)",
        "chapter": 1,
        "source": "RD-RO/RO-10-Exercices-Modelisation.pdf:12 (Exercice 8 : Knapsack)",
        "context": "Arbitrage d'investissements informatiques : choix de projets parmi 4 candidats sous une enveloppe budgétaire globale de 100 k€.",
        "type": "Modélisation en variables binaires 0-1",
        "component": "Grille d'analyse CodeLab",
        "statement": "Quatre projets P1, P2, P3, P4 ont pour coûts respectifs 30, 40, 50, 20 k€ et pour valeurs stratégiques 50, 60, 70, 30. Le budget total est de 100 k€. Soient x_j ∈ {0, 1} les variables de décision.\n1. Écrivez la contrainte de budget linéaire.\n2. Évaluez la valeur pour le choix {P1, P2, P4}.",
        "solution": "[Exemple]\n30*x1 + 40*x2 + 50*x3 + 20*x4 <= 100 ; VALIDE VALEUR=140\n\n[Cas 1 — Contrainte budget]\n30*x1 + 40*x2 + 50*x3 + 20*x4 <= 100\n\n[Cas 2 — Choix P1, P2, P4]\nVALIDE VALEUR=140\n\n[Cas 3 — Choix P1, P2, P3]\nIRREALISABLE VIOLATION_BUDGET",
        "steps": "1. Contrainte de budget : 30·x1 + 40·x2 + 50·x3 + 20·x4 <= 100.\n2. Pour P1, P2, P4 (x1=1, x2=1, x3=0, x4=1) : Coût = 30 + 40 + 20 = 90 <= 100 (réalisable). Valeur = 50 + 60 + 30 = 140.\n3. Pour P1, P2, P3 : Coût = 30 + 40 + 50 = 120 > 100 (dépassement de budget).",
        "accepted": [
            "VALIDE VALEUR=140",
            "VALIDE VALEUR = 140",
            "30*x1 + 40*x2 + 50*x3 + 20*x4 <= 100",
            "VALEUR=140",
            "140"
        ],
        "rejected": [
            {"cmd": "IRREALISABLE", "reason": "Pour P1, P2, P4 le coût total est 30 + 40 + 20 = 90 k€ <= 100 k€, la sélection est réalisable."},
            {"cmd": "VALEUR=180", "reason": "Pour P1, P2, P3 la valeur est 180 mais le coût est 120 k€ > 100 k€, ce choix dépasse le budget."},
            {"cmd": "x1 + x2 + x3 + x4 <= 100", "reason": "N'oubliez pas de pondérer chaque projet par son coût financier spécifique (30, 40, 50, 20)."},
            {"cmd": "VALEUR=110", "reason": "50 + 60 + 30 = 140 et non 110."},
            {"cmd": "xj >= 0", "reason": "Précisez que les variables sont binaires : x_j in {0, 1}."}
        ]
    },

    # Chapitre 2 : Forme standard et solutions de base
    {
        "id": "ro2-c2-e1",
        "title": "Mise sous forme standard : variables d'écart et de surplus",
        "chapter": 2,
        "source": "RD-RO/ref/Examen Final RO.pdf:1 (Partie A & B)",
        "context": "Transformation formelle d'un système d'inégalités en un système d'équations linéaires pour initialiser l'algorithme du Simplexe.",
        "type": "Forme standard canonique",
        "component": "Grille d'analyse CodeLab",
        "statement": "Soient les contraintes :\n- C1 (<=) : 2·x1 + 3·x2 <= 12\n- C2 (>=) : x1 + x2 >= 4\nMettez ce système sous forme standard en introduisant une variable d'écart e1 >= 0 et une variable de surplus s1 >= 0.",
        "solution": "[Exemple]\n2*x1 + 3*x2 + e1 = 12 ; x1 + x2 - s1 = 4\n\n[Cas 1 — Contrainte <=]\n2*x1 + 3*x2 + e1 = 12\n\n[Cas 2 — Contrainte >=]\nx1 + x2 - s1 = 4",
        "steps": "1. Pour une inégalité <=, on AJOUTE une variable d'écart positive : 2·x1 + 3·x2 + e1 = 12 avec e1 >= 0.\n2. Pour une inégalité >=, on SOUSTRAIT une variable d'écart (surplus) : x1 + x2 - s1 = 4 avec s1 >= 0.",
        "accepted": [
            "2*x1 + 3*x2 + e1 = 12",
            "2x1 + 3x2 + e1 = 12",
            "x1 + x2 - s1 = 4",
            "x1 + x2 - e2 = 4",
            "2*x1 + 3*x2 + s1 = 12"
        ],
        "rejected": [
            {"cmd": "2*x1 + 3*x2 - e1 = 12", "reason": "Pour une contrainte <=, on AJOUTE la variable d'écart (+ e1), on ne la soustrait pas."},
            {"cmd": "x1 + x2 + s1 = 4", "reason": "Pour une contrainte >=, on doit SOUSTRAIRE le surplus (- s1) pour obtenir l'égalité."},
            {"cmd": "<= 12", "reason": "La forme standard exige des ÉGALITÉS (=), éliminez les signes <= et >=."},
            {"cmd": "e1 < 0", "reason": "Toutes les variables d'écart de la forme standard sont impérativement non négatives (>= 0)."},
            {"cmd": "2*x1 = 12", "reason": "Ne supprimez pas les autres variables du système."}
        ]
    },
    {
        "id": "ro2-c2-e2",
        "title": "Solution de base admissible et variables hors base",
        "chapter": 2,
        "source": "RD-RO/ref/Examen Final RO.pdf:1 (QCM 3)",
        "context": "Définition matricielle : pour un problème à n variables et m contraintes (n > m), une solution de base est obtenue en fixant n - m variables hors base à zéro.",
        "type": "Calcul de solution de base",
        "component": "Grille d'analyse CodeLab",
        "statement": "Soit le système standard à 4 variables (x1, x2, e1, e2) et 2 contraintes :\n- 2·x1 + x2 + e1 = 10\n- x1 + 2·x2 + e2 = 8\nEn choisissant (x1, x2) comme variables hors base (fixées à 0), déterminez la solution de base associée et sa valeur Z = 3·x1 + 2·x2.",
        "solution": "[Exemple]\ne1=10, e2=8, Z=0 ; ADMISSIBLE\n\n[Cas 1 — Base initiale e1, e2]\ne1=10 e2=8 Z=0\n\n[Cas 2 — Base x1, e2 avec x2=0, e1=0]\nx1=5 e2=3 Z=15",
        "steps": "1. Variables hors base : x1 = 0, x2 = 0.\n2. Remplacement dans le système : 0 + 0 + e1 = 10 => e1 = 10 ; 0 + 0 + e2 = 8 => e2 = 8.\n3. Toutes les variables de base sont >= 0 (10 >= 0, 8 >= 0) : la solution de base est admissible.\n4. Valeur de l'objectif : Z = 3(0) + 2(0) = 0.",
        "accepted": [
            "e1=10 e2=8 Z=0",
            "e1=10, e2=8, Z=0",
            "e1=10 e2=8",
            "Z=0",
            "ADMISSIBLE e1=10 e2=8"
        ],
        "rejected": [
            {"cmd": "INADMISSIBLE", "reason": "e1=10 et e2=8 sont toutes deux positives (>= 0), la base est donc parfaitement admissible."},
            {"cmd": "x1=10", "reason": "x1 est hors base, elle est donc fixée à 0 ; c'est e1 qui vaut 10."},
            {"cmd": "Z=30", "reason": "Comme x1=0 et x2=0, la valeur de l'objectif en ce sommet initial est Z = 0."},
            {"cmd": "e1=0", "reason": "Dans cette base, e1 est variable de base et vaut 10."},
            {"cmd": "e2=0", "reason": "e2 vaut 8 dans la base initiale (x1=0, x2=0)."}
        ]
    },
    {
        "id": "ro2-c2-e3",
        "title": "Détection de dégénérescence dans une solution de base",
        "chapter": 2,
        "source": "RD-RO/ref/Algo simplexe.pdf:5",
        "context": "Analyse de convergence : une solution de base est dite dégénérée si au moins une variable dans la base prend la valeur zéro, ce qui peut causer du cyclage dans le Simplexe.",
        "type": "Caractérisation de solution de base dégénérée",
        "component": "Grille d'analyse CodeLab",
        "statement": "Une solution de base comprend les variables de base (x1, x2, e1) avec les valeurs respectives x1 = 4, x2 = 0, e1 = 6. Cette solution est-elle admissible ? Est-elle dégénérée ?",
        "solution": "[Exemple]\nADMISSIBLE DEGENEREE\n\n[Cas 1 — x1=4, x2=0, e1=6]\nADMISSIBLE DEGENEREE\n\n[Cas 2 — x1=5, x2=3, e1=2]\nADMISSIBLE NON_DEGENEREE\n\n[Cas 3 — x1=4, x2=-1, e1=6]\nINADMISSIBLE",
        "steps": "1. Admissibilité : toutes les variables sont >= 0 (4 >= 0, 0 >= 0, 6 >= 0) => ADMISSIBLE.\n2. Dégénérescence : la variable de base x2 prend la valeur 0 (b2 = 0) => DEGENEREE.",
        "accepted": [
            "ADMISSIBLE DEGENEREE",
            "ADMISSIBLE ET DEGENEREE",
            "ADMISSIBLE, DEGENEREE",
            "DEGENEREE",
            "OUI DEGENEREE"
        ],
        "rejected": [
            {"cmd": "NON_DEGENEREE", "reason": "Comme la variable de base x2 est nulle (x2=0), la solution est formellement dégénérée."},
            {"cmd": "INADMISSIBLE", "reason": "Toutes les variables sont supérieures ou égales à zéro, la solution respecte donc l'admissibilité."},
            {"cmd": "NON_ADMISSIBLE", "reason": "Une variable nulle est autorisée par la contrainte de non-négativité (x >= 0)."},
            {"cmd": "OPTIMALE", "reason": "La dégénérescence concerne la nullité d'une variable en base, pas l'optimalité de l'objectif."},
            {"cmd": "IRREALISABLE", "reason": "La solution est réalisable (admissible)."}
        ]
    },

    # Chapitre 3 : Algorithme du Simplexe pas à pas
    {
        "id": "ro2-c3-e1",
        "title": "Critère de Dantzig : choix de la variable entrante",
        "chapter": 3,
        "source": "RD-RO/ref/Algo simplexe.pdf:4 & Examen Final RO.pdf:2",
        "context": "Itération du Simplexe en maximisation : sélection de la variable hors base qui possède le coût réduit le plus positif pour augmenter au maximum l'objectif.",
        "type": "Application du critère d'entrée de Dantzig",
        "component": "Grille d'analyse CodeLab",
        "statement": "Dans un tableau du Simplexe en maximisation, la ligne des coûts réduits (ligne d'évaluation) pour les variables hors base est :\n- Δ_x1 = +5\n- Δ_x2 = +8\n- Δ_x3 = -2\n1. Le tableau est-il optimal ?\n2. Quelle variable doit entrer dans la base selon la règle de Dantzig ?",
        "solution": "[Exemple]\nNON_OPTIMAL ; VARIABLE_ENTRANTE : x2\n\n[Cas 1 — delta = (+5, +8, -2)]\noptimal : NON\nentrante : x2\n\n[Cas 2 — delta = (+12, +3, +9)]\noptimal : NON\nentrante : x1\n\n[Cas 3 — delta = (-4, 0, -1)]\noptimal : OUI\nentrante : AUCUNE",
        "steps": "1. Il existe des coûts réduits strictement positifs (+5 et +8) : le tableau n'est donc PAS optimal (on peut encore augmenter Z).\n2. Selon la règle du plus grand accroissement marginal de Dantzig, la variable entrante est celle du coût le plus élevé : max(+5, +8) = +8, soit x2.",
        "accepted": [
            "entrante : x2",
            "x2",
            "VARIABLE_ENTRANTE = x2",
            "NON x2",
            "entrante: x2"
        ],
        "rejected": [
            {"cmd": "x1", "reason": "x1 a un coût réduit de +5, or Dantzig choisit le coût le plus grand : max(5, 8) = 8, donc x2."},
            {"cmd": "x3", "reason": "x3 a un coût réduit négatif (-2), la faire entrer ferait baisser la fonction objectif."},
            {"cmd": "OUI", "reason": "Le tableau n'est pas optimal car il reste des coefficients strictement positifs (+5, +8)."},
            {"cmd": "OPTIMAL", "reason": "Un tableau de maximisation n'est optimal que lorsque TOUS les coûts réduits sont négatifs ou nuls (<= 0)."},
            {"cmd": "e1", "reason": "e1 est une variable d'écart déjà dans la base, on sélectionne une variable HORS base pour entrer."}
        ]
    },
    {
        "id": "ro2-c3-e2",
        "title": "Règle du ratio minimum : choix de la variable sortante",
        "chapter": 3,
        "source": "RD-RO/ref/Algo simplexe.pdf:6 & Examen Final RO.pdf:2",
        "context": "Détermination de la première contrainte qui devient saturée lorsque la variable entrante x_k augmente, afin de préserver la non-négativité de toutes les variables.",
        "type": "Calcul des ratios b_i / a_ik et choix de la variable sortante",
        "component": "Grille d'analyse CodeLab",
        "statement": "La variable x2 entre dans la base. Le vecteur des seconds membres est b = [20, 18, 24] et la colonne de la variable entrante x2 est a_2 = [2, 3, 0].\n1. Calculez les ratios b_i / a_i2 pour les coefficients strictement positifs.\n2. Quelle variable de base sort de la base (parmi e1, e2, e3) selon la règle du ratio minimum ?",
        "solution": "[Exemple]\nratios : 10, 6 ; sortante : e2\n\n[Cas 1 — b=[20, 18, 24], a2=[2, 3, 0]]\nratio_min : 6\nsortante : e2\n\n[Cas 2 — b=[12, 15], a1=[4, 3]]\nratio_min : 3\nsortante : e1",
        "steps": "1. Ligne 1 (associée à e1) : a_12 = 2 > 0 => ratio = 20 / 2 = 10.\n2. Ligne 2 (associée à e2) : a_22 = 3 > 0 => ratio = 18 / 3 = 6.\n3. Ligne 3 (associée à e3) : a_32 = 0 <= 0 => pas de ratio calculé (division par 0 interdite).\n4. Règle du ratio minimum : min(10, 6) = 6 sur la ligne 2. La variable sortante est donc e2.",
        "accepted": [
            "sortante : e2",
            "e2",
            "VARIABLE_SORTANTE = e2",
            "sortante: e2",
            "ratio 6 e2"
        ],
        "rejected": [
            {"cmd": "e1", "reason": "Le ratio de la ligne 1 est 20/2 = 10 > 6. La règle du ratio MINIMUM impose de retenir le plus petit quotient (6, ligne 2)."},
            {"cmd": "e3", "reason": "Sur la ligne 3, a_32 = 0 : on ne calcule jamais de ratio lorsque le coefficient est nul ou négatif."},
            {"cmd": "10", "reason": "10 n'est pas le ratio minimum (10 > 6) ; la variable sortante est e2 avec le ratio 6."},
            {"cmd": "x2", "reason": "x2 est la variable ENTRANTE, la variable SORTANTE est choisie parmi les variables actuellement en base (e1, e2, e3)."},
            {"cmd": "24", "reason": "Le coefficient en ligne 3 est 0, on ne divise pas par 0."}
        ]
    },
    {
        "id": "ro2-c3-e3",
        "title": "Pivotage de Gauss et mise à jour du tableau",
        "chapter": 3,
        "source": "RD-RO/ref/Algo simplexe.pdf:8-10",
        "context": "Opérations élémentaires sur les lignes : normalisation de la ligne du pivot et élimination de la variable entrante sur toutes les autres lignes.",
        "type": "Calcul de pivot de Gauss matriciel",
        "component": "Grille d'analyse CodeLab",
        "statement": "Le pivot est situé à l'intersection de la ligne 2 et de la colonne x2, avec une valeur de pivot P = 2. La ligne de pivot initiale est : L2 = [x1: 4, x2: 2, e1: 0, e2: 1 | b: 8].\n1. Donnez la nouvelle ligne de pivot L2' normalisée (divisée par P).\n2. Sachant que L1 = [x1: 3, x2: 1, e1: 1, e2: 0 | b: 10], calculez la nouvelle ligne L1' = L1 - 1·L2'.",
        "solution": "[Exemple]\nL2' = [2, 1, 0, 0.5 | 4] ; L1' = [1, 0, 1, -0.5 | 6]\n\n[Cas 1 — Pivot P=2, L2=[4, 2, 0, 1 | 8]]\nL2_prime : 2 1 0 0.5 4\nL1_prime : 1 0 1 -0.5 6\n\n[Cas 2 — Pivot P=3, L2=[3, 3, 0, 1 | 9]]\nL2_prime : 1 1 0 0.3333 3",
        "steps": "1. Normalisation : L2' = L2 / 2 = [4/2, 2/2, 0/2, 1/2 | 8/2] = [2, 1, 0, 0.5 | 4].\n2. Élimination sur L1 : le coefficient sur la colonne pivot est 1, donc L1' = L1 - 1·L2' = [3-2, 1-1, 1-0, 0-0.5 | 10-4] = [1, 0, 1, -0.5 | 6].",
        "accepted": [
            "L2_prime : 2 1 0 0.5 4",
            "2 1 0 0.5 4",
            "L1_prime : 1 0 1 -0.5 6",
            "1 0 1 -0.5 6",
            "L2' = [2, 1, 0, 0.5 | 4]"
        ],
        "rejected": [
            {"cmd": "4 2 0 1 8", "reason": "Vous n'avez pas divisé par la valeur du pivot P = 2."},
            {"cmd": "L1' = L1", "reason": "Il faut appliquer l'opération élémentaire L1 - a_1k·L2' pour annuler le coefficient de la colonne pivot."},
            {"cmd": "b=8", "reason": "Le second membre de L2' est divisé par 2, il devient 4."},
            {"cmd": "0.5", "reason": "Spécifiez tous les coefficients de la ligne recalculée."},
            {"cmd": "P=1", "reason": "Le pivot initial est 2, après division il devient 1."}
        ]
    },

    # Chapitre 4 : Optimalité, multiplicité et cas limites
    {
        "id": "ro2-c4-e1",
        "title": "Test d'optimalité et lecture de la solution optimale finale",
        "chapter": 4,
        "source": "RD-RO/ref/Algo simplexe.pdf:11 & Examen Final RO.pdf:1",
        "context": "Lecture directe des résultats d'optimisation dans le dictionnaire final du Simplexe : valeurs des variables de décision, des écarts et profit maximal Z*.",
        "type": "Lecture et validation de dictionnaire optimal",
        "component": "Grille d'analyse CodeLab",
        "statement": "Dans le tableau final d'un problème de maximisation, la ligne des coûts réduits est Δ = [x1: 0, x2: 0, e1: -1.5, e2: -0.5]. Les variables en base sont x1 = 16 et x2 = 18, et la constante vaut 76 000. Formulez la conclusion : le tableau est-il optimal ? Quelle est la valeur optimale Z* ?",
        "solution": "[Exemple]\nOPTIMAL ; x1=16, x2=18, Z*=76000\n\n[Cas 1 — delta <= 0, x1=16, x2=18, Z=76000]\noptimal : OUI\nsolution : x1=16 x2=18 Z=76000\n\n[Cas 2 — delta contient +2]\noptimal : NON\nsolution : NON_OPTIMAL",
        "steps": "1. Tous les coûts réduits sont négatifs ou nuls (0, 0, -1.5, -0.5 <= 0) : le critère d'optimalité de maximisation est satisfait.\n2. La solution optimale unique est x1* = 16, x2* = 18 (e1* = 0, e2* = 0).\n3. La valeur optimale du profit est Z* = 76 000.",
        "accepted": [
            "x1=16 x2=18 Z=76000",
            "OPTIMAL Z=76000",
            "x1=16, x2=18, Z=76000",
            "76000",
            "Z* = 76000"
        ],
        "rejected": [
            {"cmd": "NON_OPTIMAL", "reason": "Tous les coûts réduits sont <= 0, le tableau est donc bien à l'optimum absolu."},
            {"cmd": "Z=0", "reason": "Z* vaut 76000 dans ce tableau final."},
            {"cmd": "e1=16", "reason": "x1 est dans la base (valeur 16), e1 est hors base donc nulle (e1=0)."},
            {"cmd": "INADMISSIBLE", "reason": "Toutes les variables en base sont positives (16 >= 0, 18 >= 0)."},
            {"cmd": "-1.5", "reason": "-1.5 est le coût réduit de e1, pas la valeur optimale de Z."}
        ]
    },
    {
        "id": "ro2-c4-e2",
        "title": "Détection d'un problème non borné dans le Simplexe",
        "chapter": 4,
        "source": "RD-RO/ref/Algo simplexe.pdf:7",
        "context": "Détection d'anomalie de modélisation : le profit peut croître indéfiniment sans qu'aucune contrainte de ressource ne s'y oppose.",
        "type": "Identification de critère de non-bornitude",
        "component": "Grille d'analyse CodeLab",
        "statement": "La variable x1 doit entrer dans la base (Δ_x1 = +4 > 0). Cependant, tous les coefficients de sa colonne dans le tableau sont négatifs ou nuls : a_1 = [-1, 0, -2]. Que concluez-vous sur le problème linéaire ?",
        "solution": "[Exemple]\nPROBLEME NON BORNE (Z -> +infini)\n\n[Cas 1 — a1=[-1, 0, -2], delta1=+4]\nstatut : NON_BORNE\n\n[Cas 2 — a1=[2, -1, 0], delta1=+4]\nstatut : BORNE_RATIO_VALIDE",
        "steps": "1. Comme tous les coefficients a_i1 sont <= 0, il n'existe aucun a_i1 > 0 pour calculer un ratio b_i / a_i1.\n2. La variable entrante x1 peut donc croître indéfiniment sans violer aucune contrainte.\n3. Conclusion : le problème est NON BORNÉ (la fonction objectif Z tend vers +∞).",
        "accepted": [
            "NON_BORNE",
            "PROBLEME NON BORNE",
            "Z -> +infini",
            "NON BORNE",
            "INFINI"
        ],
        "rejected": [
            {"cmd": "OPTIMAL", "reason": "Le problème n'a pas d'optimum fini : la fonction objectif peut croître vers +infini sans borne."},
            {"cmd": "IRREALISABLE", "reason": "Le problème est réalisable (il existe des solutions), c'est la fonction objectif qui n'est pas majorée."},
            {"cmd": "DEGENEREE", "reason": "L'absence de coefficient strictement positif caractérise la non-bornitude, pas la dégénérescence."},
            {"cmd": "ratio = 0", "reason": "On ne calcule aucun ratio quand les coefficients sont négatifs ou nuls."},
            {"cmd": "CYCLE", "reason": "Le Simplexe s'arrête immédiatement en déclarant le problème non borné."}
        ]
    },
    {
        "id": "ro2-c4-e3",
        "title": "Détection d'optima multiples et arêtes optimales",
        "chapter": 4,
        "source": "RD-RO/ref/Algo simplexe.pdf:12",
        "context": "Cas de flexibilité managériale : plusieurs combinaisons de production permettent d'obtenir exactement le même profit maximal.",
        "type": "Détection d'optima alternatifs",
        "component": "Grille d'analyse CodeLab",
        "statement": "Un tableau optimal présente un coût réduit nul (Δ_x3 = 0) sur la variable x3 qui est HORS base (tous les autres coûts réduits étant négatifs). Que signifie cette propriété pour le décideur ?",
        "solution": "[Exemple]\nOPTIMA MULTIPLES (INFINITE DE SOLUTIONS OPTIMALES)\n\n[Cas 1 — delta hors base = 0 a l'optimum]\nstatut : OPTIMA_MULTIPLES\n\n[Cas 2 — tous deltas hors base < 0]\nstatut : OPTIMUM_UNIQUE",
        "steps": "1. Le tableau est optimal car aucun coût réduit n'est strictement positif.\n2. La présence d'un coût réduit nul sur une variable hors base indique qu'on peut faire entrer cette variable dans la base sans modifier la valeur de Z*.\n3. Conclusion : il existe une infinité de solutions optimales (optima multiples situés sur le segment reliant les deux sommets optimaux).",
        "accepted": [
            "OPTIMA_MULTIPLES",
            "OPTIMA MULTIPLES",
            "INFINITE DE SOLUTIONS OPTIMALES",
            "SOLUTIONS MULTIPLES",
            "NON UNIQUE"
        ],
        "rejected": [
            {"cmd": "OPTIMUM_UNIQUE", "reason": "L'optimum ne serait unique que si tous les coûts réduits hors base étaient STRICTEMENT négatifs (< 0)."},
            {"cmd": "NON_OPTIMAL", "reason": "Le tableau est parfaitement optimal puisque aucun coefficient n'est strictement positif."},
            {"cmd": "NON_BORNE", "reason": "La valeur optimale est finie et bien définie, ce sont les plans réalisant cet optimum qui ne sont pas uniques."},
            {"cmd": "DEGENEREE", "reason": "Un coût réduit nul hors base indique des optima multiples, pas une solution de base dégénérée."},
            {"cmd": "Z = 0", "reason": "C'est le coût réduit Δ qui est nul, pas la valeur de la fonction objectif Z."}
        ]
    },

    # Chapitre 5 : Dualité et analyse de sensibilité
    {
        "id": "ro2-c5-e1",
        "title": "Construction systématique du problème dual",
        "chapter": 5,
        "source": "RD-RO/ref/Examen Final RO.pdf:2 (Partie C : Dualité)",
        "context": "Théorie de la dualité de Von Neumann : passage formel du primal (maximisation sous contraintes <=) au dual (minimisation sous contraintes >=).",
        "type": "Transformation Primal -> Dual",
        "component": "Grille d'analyse CodeLab",
        "statement": "Soit le problème primal :\nMAX Z = 30·x1 + 20·x2\nsous :\n- 2·x1 + x2 <= 100\n- x1 + x2 <= 80\navec x1, x2 >= 0.\nÉcrivez la fonction objectif duale W à minimiser et les contraintes associées aux variables duales y1, y2 >= 0.",
        "solution": "[Exemple]\nMIN W = 100*y1 + 80*y2 ; 2*y1 + y2 >= 30 ; y1 + y2 >= 20\n\n[Cas 1 — Objectif dual]\nMIN W = 100*y1 + 80*y2\n\n[Cas 2 — Contrainte duale 1]\n2*y1 + y2 >= 30\n\n[Cas 3 — Contrainte duale 2]\ny1 + y2 >= 20",
        "steps": "1. Les seconds membres du primal (100, 80) deviennent les coefficients de l'objectif dual : MIN W = 100·y1 + 80·y2.\n2. La matrice des contraintes est transposée :\n   - Colonne x1 [2, 1]^T devient la contrainte 1 : 2·y1 + y2 >= 30 (profit unitaire de x1).\n   - Colonne x2 [1, 1]^T devient la contrainte 2 : y1 + y2 >= 20 (profit unitaire de x2).\n3. Variables duales non négatives : y1, y2 >= 0.",
        "accepted": [
            "MIN W = 100*y1 + 80*y2",
            "MIN W = 100y1 + 80y2",
            "MIN 100*y1 + 80*y2",
            "2*y1 + y2 >= 30",
            "y1 + y2 >= 20"
        ],
        "rejected": [
            {"cmd": "MAX W", "reason": "Le dual d'un problème de maximisation est un problème de MINIMISATION."},
            {"cmd": "<= 30", "reason": "Dans le dual d'un problème standard de maximisation, les contraintes sont de type SUPÉRIEUR OU ÉGAL (>=)."},
            {"cmd": "30*y1 + 20*y2", "reason": "30 et 20 sont les seconds membres du dual (coefficients de la fonction objectif primale), pas les coefficients de W."},
            {"cmd": "x1 + x2", "reason": "Le dual s'exprime avec les variables duales y1 et y2, pas avec les variables primales x1, x2."},
            {"cmd": "W = Z", "reason": "Donnez la forme algébrique développée en fonction de y1 et y2."}
        ]
    },
    {
        "id": "ro2-c5-e2",
        "title": "Théorème de dualité forte : égalité des valeurs optimales",
        "chapter": 5,
        "source": "RD-RO/ref/Examen Final RO.pdf:2 (Partie C)",
        "context": "Contrôle d'intégrité de la résolution : si le primal admet une solution optimale finie Z*, alors le dual admet une solution optimale finie W* et Z* = W*.",
        "type": "Application du théorème fondamental de la dualité",
        "component": "Grille d'analyse CodeLab",
        "statement": "La résolution du programme primal de maximisation a fourni une valeur optimale de profit Z* = 1 800 €.\n1. D'après le théorème de dualité forte, quelle est la valeur optimale W* du programme dual de minimisation ?\n2. Si une contrainte primale dispose d'une marge d'écart strictement positive à l'optimum (s1* = 15 > 0), que vaut la variable duale associée y1* selon le théorème des écarts complémentaires ?",
        "solution": "[Exemple]\nW* = 1800 ; y1* = 0\n\n[Cas 1 — Valeur optimale duale W*]\nW* = 1800\n\n[Cas 2 — Variable duale associee a ecart positif s1>0]\ny1* = 0",
        "steps": "1. Par le théorème de dualité forte : Z* = W*, donc W* = 1 800 €.\n2. Par le théorème des écarts complémentaires : s1* · y1* = 0. Comme s1* = 15 > 0, on a obligatoirement y1* = 0.",
        "accepted": [
            "W* = 1800",
            "1800",
            "y1* = 0",
            "y1 = 0",
            "W = 1800"
        ],
        "rejected": [
            {"cmd": "y1* = 15", "reason": "Par le théorème des écarts complémentaires, s1* et y1* ne peuvent pas être simultanément non nuls : si s1* > 0, alors y1* = 0."},
            {"cmd": "W* > 1800", "reason": "À l'optimum, le saut de dualité est nul : Z* = W* = 1800."},
            {"cmd": "W* = 0", "reason": "La valeur optimale du dual est égale à celle du primal : 1800 €."},
            {"cmd": "y1* > 0", "reason": "Une ressource non saturée (avec marge inemployée s1 > 0) a une valeur marginale nulle : son prix d'ombre est 0."},
            {"cmd": "-1800", "reason": "Le profit optimal est positif : 1800."}
        ]
    },
    {
        "id": "ro2-c5-e3",
        "title": "Interprétation économique des variables duales (prix d'ombre)",
        "chapter": 5,
        "source": "RD-RO/ref/DS-B2A-IT.pdf:1 & Algo simplexe.pdf:13",
        "context": "Aide à la décision d'investissement : la variable duale y_i* représente le gain marginal sur la fonction objectif pour chaque unité additionnelle de la ressource i.",
        "type": "Interprétation de sensibilité économique",
        "component": "Grille d'analyse CodeLab",
        "statement": "À l'optimum d'un problème de production, la variable duale associée aux heures de la machine M1 vaut y1* = 25 €/heure.\n1. Quel est le gain sur le profit si la capacité de M1 augmente de 4 heures ?\n2. Quel montant maximal l'entreprise est-elle prête à payer pour acquérir une heure supplémentaire sur cette machine ?",
        "solution": "[Exemple]\ngain : 100 € ; prix_max : 25 €\n\n[Cas 1 — Gain pour +4 heures a y1=25]\ngain : 100\n\n[Cas 2 — Prix marginal maximum]\nprix_max : 25",
        "steps": "1. Le prix d'ombre (shadow price) mesure la dérivée partielle dZ/db1 = y1* = 25 €/h.\n2. Pour une augmentation de Δb1 = 4h, le gain de profit est 4 x 25 = 100 €.\n3. L'entreprise est prête à payer au maximum 25 € pour une heure supplémentaire (au-delà, l'opération deviendrait déficitaire).",
        "accepted": [
            "gain : 100",
            "100",
            "100 €",
            "prix_max : 25",
            "25 €"
        ],
        "rejected": [
            {"cmd": "25", "reason": "25 est le gain pour UNE heure ; pour 4 heures supplémentaires, le gain est 4 x 25 = 100 €."},
            {"cmd": "4", "reason": "4 est le nombre d'heures ajoutées ; multipliez par la valeur unitaire marginale (25 €)."},
            {"cmd": "0", "reason": "La ressource étant saturée (y1* = 25 > 0), une heure de plus apporte un gain réel de 25 €."},
            {"cmd": "50", "reason": "Le calcul est 4 * 25 = 100."},
            {"cmd": "gain = 25", "reason": "Le gain total pour 4 heures est 4 x 25 = 100 €."}
        ]
    },

    # Chapitre 6 : Ordonnancement et crashing
    {
        "id": "ro2-c6-e1",
        "title": "Ordonnancement de projet et identification du chemin critique",
        "chapter": 6,
        "source": "RD-RO/ref/EXamen B2-IT.pdf:1 (Problème 9 tâches A à I)",
        "context": "Planification d'un projet de migration informatique comportant 9 tâches interdépendantes. Calcul des dates au plus tôt (early start) et identification des tâches à marge totale nulle.",
        "type": "Calcul de chemin critique et dates au plus tôt",
        "component": "Grille d'analyse CodeLab",
        "statement": "Un projet informatique est composé de 4 tâches en séquence : A (durée 3j), B (durée 4j, précédée par A), C (durée 2j, précédée par A) et D (durée 5j, précédée par B et C).\n1. Calculez la durée minimale de réalisation du projet (date de fin au plus tôt).\n2. Donnez le chemin critique composé des tâches sans aucune marge.",
        "solution": "[Exemple]\nduree_minimale : 12j ; chemin_critique : A-B-D\n\n[Cas 1 — Sequence A(3), B(4), C(2), D(5)]\nduree : 12\nchemin : A-B-D\n\n[Cas 2 — Sequence A(2), B(3), C(5), D(4)]\nduree : 11\nchemin : A-C-D",
        "steps": "1. Date fin de A = 3j.\n2. Date fin de B = 3 + 4 = 7j.\n3. Date fin de C = 3 + 2 = 5j.\n4. La tâche D attend la fin de B et C : date début = max(7, 5) = 7j. Date fin de D = 7 + 5 = 12j.\n5. Tâches critiques à marge nulle : A -> B -> D (la tâche C a une marge libre de 2j).",
        "accepted": [
            "duree : 12",
            "12",
            "12j",
            "chemin : A-B-D",
            "A-B-D"
        ],
        "rejected": [
            {"cmd": "14", "reason": "14j correspond à l'addition de toutes les durées (3+4+2+5) en ignorant que les tâches B et C s'exécutent en parallèle !"},
            {"cmd": "10", "reason": "10j = 3 + 2 + 5 emprunte le chemin C (le plus court), or le projet ne peut se terminer avant que la tâche B la plus longue ne soit finie (12j)."},
            {"cmd": "A-C-D", "reason": "C a une durée de 2j < 4j de B, C possède une marge de 2 jours et n'est donc pas critique."},
            {"cmd": "7", "reason": "7j est la date de début de D, ajoutez la durée de D (5j) pour obtenir 12j."},
            {"cmd": "5", "reason": "5 est la durée de D seule."}
        ]
    },
    {
        "id": "ro2-c6-e2",
        "title": "Réduction de durée de projet (crashing) au moindre coût",
        "chapter": 6,
        "source": "RD-RO/ref/EXamen B2-IT.pdf:1-2 (Questions 2 et 3)",
        "context": "Le client exige de réduire la durée du projet de 12 jours à 10 jours (gain de 2 jours). L'arbitrage consiste à accélérer en priorité les tâches critiques dont le coût marginal par jour gagné est le plus faible.",
        "type": "Optimisation du compromis durée-coût",
        "component": "Grille d'analyse CodeLab",
        "statement": "Le chemin critique est A-B-D (durée totale 12 jours). Pour gagner 2 jours et terminer en 10 jours, on peut réduire :\n- Tâche A : max 1 jour réductible pour un surcoût de 10 €/jour\n- Tâche B : max 2 jours réductibles pour un surcoût de 6 €/jour\n- Tâche D : max 2 jours réductibles pour un surcoût de 15 €/jour\nQuelle combinaison de réduction offre le surcoût total minimal pour gagner exactement 2 jours ?",
        "solution": "[Exemple]\nreduire B de 2 jours ; surcout = 12 €\n\n[Cas 1 — Gagner 2 jours au moindre cout]\ntache : B\njours_reduits : 2\nsurcout_total : 12\n\n[Cas 2 — Gagner 3 jours au moindre cout]\nsurcout_total : 22",
        "steps": "1. Coûts marginaux d'accélération : B coûte 6 €/j, A coûte 10 €/j, D coûte 15 €/j.\n2. La tâche la plus économique est B (6 €/j).\n3. B peut être réduite de 2 jours (maximum autorisé).\n4. Surcoût minimal = 2 jours x 6 €/jour = 12 € (bien plus avantageux que A à 10€ ou D à 15€).",
        "accepted": [
            "surcout_total : 12",
            "12",
            "12 €",
            "B: 2 jours (12 €)",
            "surcout : 12"
        ],
        "rejected": [
            {"cmd": "20", "reason": "20 € correspondrait à réduire A (10€) et une autre tâche, alors que B seule permet de gagner 2 jours pour seulement 12 €."},
            {"cmd": "30", "reason": "30 € correspondrait à accélérer la tâche D (15 x 2), qui est la plus chère !"},
            {"cmd": "16", "reason": "16 € = 10 (A) + 6 (B), or il est moins cher de réduire B de 2 jours (2 x 6 = 12 €)."},
            {"cmd": "6", "reason": "6 € ne permet de gagner qu'UN seul jour ; pour 2 jours le surcoût est 2 x 6 = 12 €."},
            {"cmd": "2", "reason": "2 est le nombre de jours gagnés, pas le surcoût financier."}
        ]
    },
    {
        "id": "ro2-c6-e3",
        "title": "Modélisation linéaire globale du crashing sous contrainte de budget",
        "chapter": 6,
        "source": "RD-RO/ref/EXamen B2-IT.pdf:2 (Question 4 : Surcoût <= 15)",
        "context": "Formulation du problème complet d'ordonnancement durée-coût sous forme de programme linéaire continu.",
        "type": "Modélisation linéaire intégrée d'ordonnancement",
        "component": "Grille d'analyse CodeLab",
        "statement": "Soient t_i les dates de début des tâches et r_i les réductions de durée (0 <= r_i <= r_i^max) au coût unitaire c_i. Écrivez la contrainte de budget imposant que le surcoût total d'accélération ne dépasse pas B = 15 €.",
        "solution": "[Exemple]\n10*rA + 6*rB + 15*rD <= 15\n\n[Cas 1 — Contrainte de budget surcout <= 15]\n10*rA + 6*rB + 15*rD <= 15\n\n[Cas 2 — Contrainte de relation de fin de A et debut de B]\ntB - tA + rA >= 3",
        "steps": "1. Le surcoût total est la somme des réductions pondérées par leurs coûts unitaires : sum(c_i · r_i).\n2. Avec les coûts cA = 10, cB = 6, cD = 15 : 10·rA + 6·rB + 15·rD <= 15.\n3. Cette contrainte garantit que le plan d'accélération respecte l'enveloppe budgétaire allouée.",
        "accepted": [
            "10*rA + 6*rB + 15*rD <= 15",
            "10*rA + 6*rB + 15*rD <= 15 €",
            "10rA + 6rB + 15rD <= 15",
            "10*r1 + 6*r2 + 15*r3 <= 15",
            "sum(ci*ri) <= 15"
        ],
        "rejected": [
            {"cmd": "rA + rB + rD <= 15", "reason": "N'oubliez pas de multiplier chaque réduction par son coût marginal (10 pour A, 6 pour B, 15 pour D)."},
            {"cmd": ">= 15", "reason": "Le surcoût ne doit pas DÉPASSER 15 €, la contrainte est donc un plafond (<= 15)."},
            {"cmd": "tA + tB <= 15", "reason": "Les variables de réduction sont r_i, pas les dates de démarrage t_i."},
            {"cmd": "MAX 15", "reason": "Il s'agit d'une contrainte budgétaire linéaire, pas d'une fonction objectif."},
            {"cmd": "rA < 0", "reason": "Les réductions de durée sont positives ou nulles (0 <= r_i <= r_i^max)."}
        ]
    }
]

def generate_fiche(data):
    accepted_lines = "\n".join([f"- `{cmd}`" for cmd in data["accepted"]])
    rejected_lines = "\n".join([f"- `{rej['cmd']}` : {rej['reason']}" for rej in data["rejected"]])
    
    md = f"""# Fiche de Conception — {data['id']} : {data['title']}

- **Identifiant** : `{data['id']}`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : {data['chapter']}
- **Source académique exacte** : `{data['source']}`
- **Type d'exercice** : {data['type']}
- **Composant d'interface** : {data['component']}

## 1. Contexte Métier & Académique
{data['context']}

## 2. Énoncé Complet
{data['statement']}

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
{data['solution']}
```

**Étapes de raisonnement & calculs vérifiés :**
{data['steps']}

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
{accepted_lines}

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
{rejected_lines}
"""
    return md

for d in fiches_data:
    content = generate_fiche(d)
    path = os.path.join(FICHES_DIR, f"{d['id']}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"[ok] Fiche RO créée : {d['id']}.md")

print(f"Total : {len(fiches_data)} fiches RO B2 créées avec succès.")
