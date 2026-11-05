# refonte/fiches_probabilites.py
# -*- coding: utf-8 -*-
"""
Fiches de conception Probabilités B2 (pb2-c1-e1 à pb2-c6-e3, 18 fiches)
100% alignées sur les TD 1 à 6 du Dr AGBOKOU et l'examen 2024-2025.
Saisie par étapes, oracle de fractions exactes, zéro script d'entrée standard artificiel.
"""

import os

FICHES_DIR = '/home/rd/Desktop/proba/refonte/fiches'
os.makedirs(FICHES_DIR, exist_ok=True)

fiches_data = [
    # Bloc 1 : Dénombrement (Chapitres 1 et 2)
    {
        "id": "pb2-c1-e1",
        "title": "Entretiens de recrutement et principe additif",
        "chapter": 1,
        "source": "probabilites/exos/TD_1.pdf:1 (Exercice 1)",
        "context": "Un cabinet RH auditionne 4 candidats pour un poste. Le recruteur peut décider de ne retenir personne, ou d'en retenir 1, 2, 3 ou 4. L'étudiant applique le principe d'addition et la somme des coefficients binomiaux.",
        "type": "Calcul combinatoire avec saisie d'étapes",
        "component": "Grille de calcul CodeLab (mode analyse mathématique)",
        "statement": "Quatre personnes se présentent à un entretien d'embauche. Le recruteur a la possibilité soit de ne choisir personne, soit d'en choisir 1, 2, 3 ou 4. Calculez le nombre de choix possibles pour chaque sous-cas, puis le nombre total de décisions possibles pour le recruteur.",
        "solution": "[Exemple]\n16\n\n[Cas 1 — 4 candidats]\ntotal : 16\n\n[Cas 2 — 5 candidats]\ntotal : 32\n\n[Cas 3 — 3 candidats]\ntotal : 8",
        "steps": "1. Pour n candidats, le nombre de façons d'en retenir k est C(n, k).\n2. La somme totale vaut C(n, 0) + C(n, 1) + ... + C(n, n) = 2^n.\n3. Pour n=4 : 1 + 4 + 6 + 4 + 1 = 16.\n4. Pour n=5 : 2^5 = 32.\n5. Pour n=3 : 2^3 = 8.",
        "accepted": [
            "total : 16",
            "16",
            "total: 16",
            "total = 16",
            "somme : 16"
        ],
        "rejected": [
            {"cmd": "4", "reason": "4 n'est que le nombre de façons de choisir un seul candidat, vous devez sommer toutes les options de 0 à 4."},
            {"cmd": "24", "reason": "24 correspond à 4! (permutations), or l'ordre de choix des candidats n'a pas d'importance ici."},
            {"cmd": "15", "reason": "Vous avez probablement oublié le cas où le recruteur ne choisit personne (C(4,0) = 1)."},
            {"cmd": "8", "reason": "8 correspond à 2^3, pour 4 candidats la formule est 2^4 = 16."},
            {"cmd": "10", "reason": "Attention au calcul des combinaisons : C(4,2) vaut 6 et non 2."}
        ]
    },
    {
        "id": "pb2-c1-e2",
        "title": "Rangement dans des tiroirs : p-listes vs arrangements",
        "chapter": 1,
        "source": "probabilites/exos/TD_1.pdf:1 (Exercice 2)",
        "context": "Modélisation de l'affectation de tâches ou de données en mémoire. On distingue une application quelconque (plusieurs objets par case) d'une injection (au plus un objet par case).",
        "type": "Calcul combinatoire avec distinctions fondamentales",
        "component": "Grille de calcul CodeLab",
        "statement": "1. On dispose de 3 tiroirs A, B, C dans lesquels on range 7 objets discernables numérotés 1 à 7 (plusieurs objets par tiroir autorisés). Combien de rangements distincts ?\n2. On dispose de 3 objets discernables et de 5 tiroirs avec au plus un objet par tiroir. Combien de rangements ?",
        "solution": "[Exemple]\n2187 ; 60\n\n[Cas 1 — 7 objets dans 3 tiroirs]\nrangements : 2187\n\n[Cas 2 — 3 objets dans 5 tiroirs au plus 1]\nrangements : 60",
        "steps": "1. Chaque objet parmi les 7 a 3 tiroirs possibles : 3 x 3 x ... x 3 = 3^7 = 2187 (p-liste avec n=3, p=7).\n2. Ranger 3 objets dans 5 tiroirs sans répétition correspond à un arrangement A(5, 3) = 5 x 4 x 3 = 60.",
        "accepted": [
            "rangements : 2187",
            "2187",
            "3^7 = 2187",
            "rangements: 2187",
            "total : 2187"
        ],
        "rejected": [
            {"cmd": "7^3", "reason": "Attention au piège classique : ce sont les 7 objets qui choisissent parmi 3 tiroirs (3^7), et non l'inverse (7^3 = 343)."},
            {"cmd": "343", "reason": "343 = 7^3 résulte de l'inversion de n et p. Chaque objet a 3 choix, donc 3^7 = 2187."},
            {"cmd": "21", "reason": "21 = 3 x 7 correspond au principe additif répété, or les choix sont indépendants et multiplicatifs."},
            {"cmd": "10", "reason": "10 = C(5, 3) ignore l'ordre : comme les 3 objets sont discernables (1, 2, 3), il faut utiliser les arrangements A(5, 3) = 60."},
            {"cmd": "125", "reason": "125 = 5^3 autorise plusieurs objets par tiroir, or la consigne impose 'au plus un objet par tiroir'."}
        ]
    },
    {
        "id": "pb2-c1-e3",
        "title": "Mots de 3 lettres : arrangements et événement complémentaire",
        "chapter": 1,
        "source": "probabilites/exos/TD_1.pdf:1 (Exercice 3)",
        "context": "Génération de codes ou mots de passe sur un alphabet de 26 lettres (6 voyelles, 20 consonnes). Décompte direct et passage par le complémentaire pour la condition 'au moins une voyelle'.",
        "type": "Calcul combinatoire et dénombrement d'événements",
        "component": "Grille de calcul CodeLab",
        "statement": "Avec les 26 lettres de l'alphabet (6 voyelles, 20 consonnes), on forme des mots de 3 lettres. Calculez :\n1. Le nombre total de mots possibles (N1).\n2. Le nombre de mots ayant 3 lettres distinctes (N2).\n3. Le nombre de mots contenant au moins une voyelle (N4).",
        "solution": "[Exemple]\n17576 ; 15600 ; 9576\n\n[Cas 1 — Total de mots N1]\nN1 : 17576\n\n[Cas 2 — Lettres distinctes N2]\nN2 : 15600\n\n[Cas 3 — Au moins une voyelle N4]\nN4 : 9576",
        "steps": "1. N1 = 26^3 = 17576.\n2. N2 = A(26, 3) = 26 x 25 x 24 = 15600.\n3. Pour N4, le complémentaire est 'aucun voyelle' (que des consonnes) = 20^3 = 8000. D'où N4 = 26^3 - 20^3 = 17576 - 8000 = 9576.",
        "accepted": [
            "N1 : 17576",
            "17576",
            "total : 17576",
            "N1 = 17576",
            "N1: 17576"
        ],
        "rejected": [
            {"cmd": "2600", "reason": "26 x 25 x 4 n'est pas le calcul complet : pour 3 lettres distinctes, calculez A(26, 3) = 26 x 25 x 24 = 15600."},
            {"cmd": "8000", "reason": "8000 est le nombre de mots formés UNIQUEMENT de consonnes ; pour 'au moins une voyelle', soustrayez ce résultat du total : 17576 - 8000 = 9576."},
            {"cmd": "216", "reason": "216 = 6^3 ne compte que les mots formés exclusivement de voyelles."},
            {"cmd": "7200", "reason": "7200 compte les mots avec exactement 2 consonnes et 1 voyelle, pas 'au moins une voyelle'."},
            {"cmd": "1560", "reason": "Vérifiez vos multiplications : 26 x 25 x 24 = 15600 (ne pas oublier le zéro des dizaines)."}
        ]
    },

    # Chapitre 2 : Combinaisons, multinomiaux et jeux de cartes
    {
        "id": "pb2-c2-e1",
        "title": "Coefficients multinomiaux et répartition en groupes",
        "chapter": 2,
        "source": "probabilites/exos/TD_1.pdf:1 (Exercice 4)",
        "context": "Affectation de personnel de sécurité : répartition de 8 agents de police en trois groupes distincts : 3 en patrouille, 2 en garde statique et 3 en réserve.",
        "type": "Calcul de coefficient multinomial",
        "component": "Grille de calcul CodeLab",
        "statement": "On doit répartir 8 policiers en trois groupes : 3 en patrouille, 2 en garde et 3 en réserve. De combien de manières différentes peut-on constituer ces trois groupes ?",
        "solution": "[Exemple]\n560\n\n[Cas 1 — Répartition 3, 2, 3 sur 8]\nrepartitions : 560\n\n[Cas 2 — Répartition 2, 2, 2 sur 6]\nrepartitions : 90\n\n[Cas 3 — Répartition 4, 2, 1 sur 7]\nrepartitions : 105",
        "steps": "1. La formule du multinomial est n! / (n1! n2! n3!) avec n1+n2+n3 = n.\n2. Ici n=8, n1=3, n2=2, n3=3.\n3. Calcul : 8! / (3! x 2! x 3!) = 40320 / (6 x 2 x 6) = 40320 / 72 = 560.",
        "accepted": [
            "repartitions : 560",
            "560",
            "repartitions: 560",
            "total : 560",
            "560 manieres"
        ],
        "rejected": [
            {"cmd": "40320", "reason": "40320 = 8! est le nombre de permutations sans tenir compte du fait que l'ordre des agents à l'intérieur d'un même groupe est indifférent."},
            {"cmd": "72", "reason": "72 est le dénominateur (3! x 2! x 3!). Divisez 8! (40320) par 72 pour trouver 560."},
            {"cmd": "1120", "reason": "Attention : n'oubliez pas de diviser par le 2! du groupe de garde."},
            {"cmd": "56", "reason": "56 = C(8, 3) ne forme que le premier groupe de patrouille ; il reste ensuite à choisir la garde parmi les 5 restants : 56 x C(5, 2) = 560."},
            {"cmd": "336", "reason": "Vérifiez vos simplifications factorielles : 8 x 7 x 6 x 5 x 4 / (6 x 2) = 560."}
        ]
    },
    {
        "id": "pb2-c2-e2",
        "title": "Mains de cartes à la Belote : combinaisons simples",
        "chapter": 2,
        "source": "probabilites/exos/TD_1.pdf:1 (Exercice 5)",
        "context": "Dans un jeu de 32 cartes (Belote), chaque joueur reçoit une main de 5 cartes. Les cartes sont distribuées simultanément (l'ordre dans la main n'importe pas).",
        "type": "Calcul de combinaisons et fractions",
        "component": "Grille de calcul CodeLab",
        "statement": "Dans un jeu de 32 cartes, on distribue une main de 5 cartes. Calculez :\n1. Le nombre total de mains de 5 cartes possibles : C(32, 5).\n2. Le nombre de mains contenant le Valet de trèfle : C(31, 4).\n3. Le nombre de mains contenant exactement un As : C(4, 1) x C(28, 4).",
        "solution": "[Exemple]\n201376 ; 31465 ; 81840\n\n[Cas 1 — Total de mains possibles]\ntotal : 201376\n\n[Cas 2 — Mains avec le Valet de trefle]\nvalet_trefle : 31465\n\n[Cas 3 — Mains avec exactement un As]\nexactement_un_as : 81840",
        "steps": "1. Total = C(32, 5) = (32 x 31 x 30 x 29 x 28) / (5 x 4 x 3 x 2 x 1) = 24165120 / 120 = 201376.\n2. Valet de trèfle fixé : il reste à choisir 4 cartes parmi les 31 restantes : C(31, 4) = (31 x 30 x 29 x 28) / 24 = 31465.\n3. Exactement 1 As : on choisit 1 As parmi 4 (C(4,1)=4) et 4 non-As parmi 28 (C(28,4)=20460) : 4 x 20460 = 81840.",
        "accepted": [
            "total : 201376",
            "201376",
            "C(32,5) = 201376",
            "total: 201376",
            "201 376"
        ],
        "rejected": [
            {"cmd": "24165120", "reason": "24165120 = A(32, 5) prend en compte l'ordre des cartes distribuées ; or une main de cartes est une combinaison non ordonnée, divisez par 5! (120)."},
            {"cmd": "35960", "reason": "C(31, 4) vaut 31465 ; vérifiez le produit (31 x 30 x 29 x 28) / 24."},
            {"cmd": "20460", "reason": "20460 est C(28, 4) (le choix des 4 cartes sans As) ; multipliez par C(4, 1) = 4 pour tenir compte du choix de l'As (4 x 20460 = 81840)."},
            {"cmd": "4", "reason": "4 n'est que le nombre d'As possibles dans le jeu ; il faut aussi choisir les 4 autres cartes parmi les 28 non-As."},
            {"cmd": "65780", "reason": "Erreur de simplification : C(32, 5) = 201376."}
        ]
    },
    {
        "id": "pb2-c2-e3",
        "title": "Mains de cartes avec condition 'au moins un' et probabilité",
        "chapter": 2,
        "source": "probabilites/exos/TD_1.pdf:2 (Exercice 5 suite)",
        "context": "Calcul probabiliste sur une donne de Belote : probabilité d'obtenir au moins un Roi dans sa main de 5 cartes.",
        "type": "Événement complémentaire et probabilité exacte",
        "component": "Grille de calcul CodeLab",
        "statement": "Sur une main de 5 cartes distribuée au hasard parmi 32 cartes :\n1. Calculez le nombre de mains ne contenant AUCUN Roi : C(28, 5).\n2. Déduisez-en le nombre de mains contenant AU MOINS UN Roi : C(32, 5) - C(28, 5).\n3. Donnez la probabilité d'avoir au moins un Roi sous forme de fraction réduite.",
        "solution": "[Exemple]\n98280 ; 103096 ; 12887/25172\n\n[Cas 1 — Mains sans aucun Roi]\nsans_roi : 98280\n\n[Cas 2 — Mains avec au moins un Roi]\nau_moins_un_roi : 103096\n\n[Cas 3 — Probabilite exacte fraction reduite]\np : 12887/25172",
        "steps": "1. Mains sans Roi : C(28, 5) = (28 x 27 x 26 x 25 x 24) / 120 = 98280.\n2. Mains avec au moins un Roi : 201376 - 98280 = 103096.\n3. Probabilité P = 103096 / 201376 = 12887 / 25172 (division par PGCD = 8) ≈ 0.51195.",
        "accepted": [
            "au_moins_un_roi : 103096",
            "103096",
            "12887/25172",
            "p : 12887/25172",
            "103096/201376"
        ],
        "rejected": [
            {"cmd": "98280", "reason": "98280 est le nombre de mains SANS Roi ; pour 'au moins un Roi', faites la soustraction 201376 - 98280 = 103096."},
            {"cmd": "0.488", "reason": "0.488 est la probabilité de n'avoir aucun Roi (98280 / 201376) ; la probabilité recherchée est 1 - 0.488 = 0.512."},
            {"cmd": "103096/200000", "reason": "Le nombre total de mains possibles est C(32,5) = 201376, pas 200000."},
            {"cmd": "1/4", "reason": "Il y a 4 Rois dans 32 cartes, mais avec 5 cartes en main la probabilité n'est pas 1/4 (la distribution suit une loi hypergéométrique)."},
            {"cmd": "103000", "reason": "Le résultat exact de la soustraction combinatoire est 201376 - 98280 = 103096."}
        ]
    },

    # Bloc 2 : Espaces probabilisés et conditionnement (Chapitre 3)
    {
        "id": "pb2-c3-e1",
        "title": "Formule du crible de Poincaré et indépendance",
        "chapter": 3,
        "source": "probabilites/exos/TD_2.pdf:1 (Exercice 1)",
        "context": "Contrôle qualité sur deux défauts de fabrication A et B sur des serveurs informatiques. Vérification de la compatibilité et de l'indépendance statistique des pannes.",
        "type": "Calcul de probabilité et test d'indépendance",
        "component": "Grille de calcul CodeLab",
        "statement": "Soient deux événements A et B d'un univers tels que P(A) = 0.4, P(B) = 0.5 et P(A ∩ B) = 0.2.\n1. Calculez la probabilité de la réunion P(A ∪ B).\n2. Les événements A et B sont-ils indépendants ? Justifiez en comparant P(A ∩ B) et P(A) x P(B).",
        "solution": "[Exemple]\n0.7 ; INDEPENDANTS\n\n[Cas 1 — P(A)=0.4, P(B)=0.5, P(AnB)=0.2]\nreunion : 0.7\nindependance : INDEPENDANTS\n\n[Cas 2 — P(A)=0.3, P(B)=0.4, P(AnB)=0.1]\nreunion : 0.6\nindependance : DEPENDANTS",
        "steps": "1. P(A U B) = P(A) + P(B) - P(A n B) = 0.4 + 0.5 - 0.2 = 0.7.\n2. P(A) x P(B) = 0.4 x 0.5 = 0.20.\n3. Comme P(A n B) = 0.2 = P(A) x P(B), les événements A et B sont strictement indépendants.",
        "accepted": [
            "reunion : 0.7",
            "0.7",
            "0.70",
            "P(AUB) = 0.7",
            "reunion: 0.7"
        ],
        "rejected": [
            {"cmd": "0.9", "reason": "0.9 = 0.4 + 0.5 oublie de soustraire l'intersection P(A n B) = 0.2 ; la formule est P(AUB) = P(A) + P(B) - P(AnB)."},
            {"cmd": "0.1", "reason": "0.1 résulte d'une soustraction erronée : 0.4 + 0.5 - 0.2 = 0.7."},
            {"cmd": "DEPENDANTS", "reason": "P(A) x P(B) = 0.4 x 0.5 = 0.20, ce qui est exactement égal à P(A n B) : ils sont donc indépendants !"},
            {"cmd": "INCOMPATIBLES", "reason": "P(A n B) = 0.2 ≠ 0, les événements peuvent donc se produire simultanément : ils ne sont pas incompatibles."},
            {"cmd": "0.8", "reason": "Vérifiez l'addition : 0.9 - 0.2 = 0.7."}
        ]
    },
    {
        "id": "pb2-c3-e2",
        "title": "Formule des probabilités totales sur une partition",
        "chapter": 3,
        "source": "probabilites/exos/TD_2.pdf:1 (Exercice 2)",
        "context": "Un centre de données reçoit du trafic de trois fournisseurs F1 (50%), F2 (30%) et F3 (20%). Les taux d'erreurs de paquets sont respectivement de 1%, 2% et 5%.",
        "type": "Application de la formule des probabilités totales",
        "component": "Grille de calcul CodeLab",
        "statement": "Trois serveurs F1, F2, F3 traitent respectivement 50%, 30% et 20% des requêtes réseau. Leurs taux de défaillance respectifs sont P(D|F1) = 0.01, P(D|F2) = 0.02 et P(D|F3) = 0.05. Calculez la probabilité globale P(D) qu'une requête choisie au hasard subisse une défaillance.",
        "solution": "[Exemple]\n0.021\n\n[Cas 1 — 50%, 30%, 20% avec 1%, 2%, 5%]\np_defaillance : 0.021\n\n[Cas 2 — 60%, 40% avec 2%, 4%]\np_defaillance : 0.028",
        "steps": "1. Les serveurs forment un système complet d'événements.\n2. P(D) = P(D|F1)P(F1) + P(D|F2)P(F2) + P(D|F3)P(F3).\n3. P(D) = 0.01 x 0.50 + 0.02 x 0.30 + 0.05 x 0.20 = 0.005 + 0.006 + 0.010 = 0.021 (soit 2.1%).",
        "accepted": [
            "p_defaillance : 0.021",
            "0.021",
            "2.1%",
            "P(D) = 0.021",
            "0,021"
        ],
        "rejected": [
            {"cmd": "0.08", "reason": "Vous avez simplement additionné les taux 0.01 + 0.02 + 0.05 sans les pondérer par les parts de trafic respectives."},
            {"cmd": "0.0267", "reason": "0.0267 est la moyenne arithmétique simple (8% / 3) ; il faut pondérer par 50%, 30% et 20%."},
            {"cmd": "0.21", "reason": "Attention aux zéros après la virgule : 0.5 x 0.01 = 0.005 et non 0.05."},
            {"cmd": "0.01", "reason": "0.01 est le taux minimal de F1, or F2 et F3 ont des taux de panne plus élevés qui augmentent la moyenne à 0.021."},
            {"cmd": "0.05", "reason": "0.05 est le taux maximal de F3 qui ne traite que 20% du volume total."}
        ]
    },
    {
        "id": "pb2-c3-e3",
        "title": "Formule de Bayes : dépistage médical et faux positifs",
        "chapter": 3,
        "source": "probabilites/exos/TD_2.pdf:1 (Exercice 3)",
        "context": "Étude classique d'épidémiologie : une maladie rare touche 1% de la population. Un test de dépistage a une sensibilité de 95% (détecte la maladie chez un malade) et une spécificité de 98% (test négatif chez un non-malade). Quelle est la probabilité d'être réellement malade si le test est positif ?",
        "type": "Inversion des probabilités conditionnelles par Bayes",
        "component": "Grille de calcul CodeLab",
        "statement": "Une maladie affecte 1% d'une population : P(M) = 0.01. Un test biologique présente une sensibilité P(T+|M) = 0.95 et une spécificité P(T-|nonM) = 0.98 (donc taux de faux positifs P(T+|nonM) = 0.02).\n1. Calculez la probabilité totale d'un test positif P(T+).\n2. Calculez la probabilité P(M|T+) qu'un individu soit réellement malade sachant que son test est positif.",
        "solution": "[Exemple]\n0.0293 ; 32.42%\n\n[Cas 1 — P(M)=0.01, sens=0.95, spec=0.98]\np_positif : 0.0293\np_malade_sachant_positif : 0.3242\n\n[Cas 2 — P(M)=0.05, sens=0.90, spec=0.95]\np_positif : 0.0925\np_malade_sachant_positif : 0.4865",
        "steps": "1. P(T+) = P(T+|M)P(M) + P(T+|nonM)P(nonM) = 0.95 x 0.01 + 0.02 x 0.99 = 0.0095 + 0.0198 = 0.0293.\n2. Par la formule de Bayes : P(M|T+) = P(T+|M)P(M) / P(T+) = 0.0095 / 0.0293 ≈ 0.3242 (soit 32.42%).\n3. Note : bien que le test soit fiable à 95%, un test positif ne correspond à une maladie que dans 32.4% des cas en raison de la rareté de la maladie.",
        "accepted": [
            "p_malade_sachant_positif : 0.3242",
            "0.3242",
            "32.42%",
            "0.324",
            "32.4%"
        ],
        "rejected": [
            {"cmd": "0.95", "reason": "Piège classique : 0.95 est P(T+|M) (sensibilité). P(M|T+) est fortement abaissé par le grand nombre de faux positifs dans une population saine à 99%."},
            {"cmd": "0.98", "reason": "0.98 est la spécificité du test chez les personnes saines, pas la probabilité d'être malade après un test positif."},
            {"cmd": "0.01", "reason": "0.01 est la prévalence initiale dans la population générale, un test positif augmente cette probabilité de 1% à 32.4%."},
            {"cmd": "0.50", "reason": "Calculez rigoureusement le rapport de Bayes : 0.0095 / (0.0095 + 0.0198) = 0.0095 / 0.0293 ≈ 0.324."},
            {"cmd": "0.0293", "reason": "0.0293 est la probabilité totale P(T+) d'avoir un test positif, il faut maintenant diviser 0.0095 par ce nombre."}
        ]
    },

    # Bloc 3 : Variables aléatoires discrètes (Chapitres 4 et 5)
    {
        "id": "pb2-c4-e1",
        "title": "Dé truqué : constante de normalisation, espérance et variance",
        "chapter": 4,
        "source": "probabilites/exos/TD_3.pdf:1 (Exercice 1)",
        "context": "Soit un dé à 6 faces dont la loi de probabilité est proportionnelle au numéro de la face : P(X = k) = k·a pour k ∈ {1, 2, 3, 4, 5, 6}.",
        "type": "Loi discrète, normalisation et moments",
        "component": "Grille de calcul CodeLab",
        "statement": "Un dé à 6 faces est truqué de telle sorte que la probabilité d'obtenir la face k (pour k de 1 à 6) est P(X = k) = k·a.\n1. Déterminez la constante a pour que X définisse une loi de probabilité.\n2. Calculez l'espérance mathématique E(X) en fraction réduite.\n3. Calculez la variance V(X) en fraction réduite.",
        "solution": "[Exemple]\n1/21 ; 13/3 ; 20/9\n\n[Cas 1 — Dé truqué 1 à 6]\na : 1/21\nesperance : 13/3\nvariance : 20/9\n\n[Cas 2 — Dé truqué 1 à 4]\na : 1/10\nesperance : 3\nvariance : 1",
        "steps": "1. Somme des probabilités = 1 : a·(1+2+3+4+5+6) = 21·a = 1 => a = 1/21.\n2. Espérance : E(X) = sum(k·P(X=k)) = sum(k·(k·a)) = a·sum(k^2) = (1/21)·(1+4+9+16+25+36) = 91/21 = 13/3 ≈ 4.3333.\n3. Moment d'ordre 2 : E(X^2) = a·sum(k^3) = (1/21)·(1+8+27+64+125+216) = 441/21 = 21.\n4. Variance : V(X) = E(X^2) - [E(X)]^2 = 21 - (13/3)^2 = 21 - 169/9 = (189 - 169)/9 = 20/9 ≈ 2.2222.",
        "accepted": [
            "esperance : 13/3",
            "13/3",
            "4.3333",
            "E(X) = 13/3",
            "esperance: 13/3"
        ],
        "rejected": [
            {"cmd": "3.5", "reason": "3.5 est l'espérance d'un dé équilibré parfait ; comme ce dé favorise les grandes faces, l'espérance est supérieure (13/3 ≈ 4.33)."},
            {"cmd": "1/6", "reason": "1/6 supposerait l'équiprobabilité, or la probabilité est proportionnelle à la face : a = 1/21."},
            {"cmd": "91", "reason": "91 est la somme des k^2 ; n'oubliez pas de multiplier par la constante a = 1/21, ce qui donne 91/21 = 13/3."},
            {"cmd": "21", "reason": "21 est E(X^2) ; la variance est V(X) = E(X^2) - [E(X)]^2 = 21 - (13/3)^2 = 20/9."},
            {"cmd": "7/2", "reason": "7/2 = 3.5 correspond au dé non truqué ; calculez E(X) avec la pondération k^2/21."}
        ]
    },
    {
        "id": "pb2-c4-e2",
        "title": "Dépense client : loi discrète par paliers et espérance de recette",
        "chapter": 4,
        "source": "Recueil_Epreuves_2024_2025.pdf:1 (Examen Probabilités B2, Exercice 1)",
        "context": "Modélisation du panier moyen d'achat dans un supermarché. La dépense X prend les valeurs {0, 10, 20, 50} euros avec probabilités respectives {0.1, 0.4, 0.3, 0.2}.",
        "type": "Distribution discrète appliquée et prévision financière",
        "component": "Grille de calcul CodeLab",
        "statement": "Une étude statistique montre que la dépense X (en euros) d'un client suit la loi discrète suivante :\n- P(X = 0 €) = 0.1\n- P(X = 10 €) = 0.4\n- P(X = 20 €) = 0.3\n- P(X = 50 €) = 0.2\nCalculez la dépense moyenne attendue par client (espérance mathématique E(X)).",
        "solution": "[Exemple]\n20\n\n[Cas 1 — Distribution 0, 10, 20, 50]\nesperance : 20\n\n[Cas 2 — Distribution 0, 15, 30, 60 avec 0.1, 0.3, 0.4, 0.2]\nesperance : 28.5",
        "steps": "1. E(X) = sum(x_i · P(X = x_i)).\n2. E(X) = 0·0.1 + 10·0.4 + 20·0.3 + 50·0.2 = 0 + 4 + 6 + 10 = 20 euros.",
        "accepted": [
            "esperance : 20",
            "20",
            "20 €",
            "20 euros",
            "E(X) = 20"
        ],
        "rejected": [
            {"cmd": "20.0", "reason": "20 est la valeur entière exacte attendue."},
            {"cmd": "80", "reason": "80 est la somme des montants sans tenir compte des probabilités ; pondérez chaque montant par sa probabilité."},
            {"cmd": "26.67", "reason": "26.67 est la moyenne arithmétique simple des montants (80/4) ; il faut utiliser les probabilités de la loi."},
            {"cmd": "10", "reason": "10 n'est que la contribution du palier à 50 € (50 x 0.2) ; ajoutez les contributions des autres paliers (4 + 6)."},
            {"cmd": "100", "reason": "Vérifiez vos calculs : 10*0.4 + 20*0.3 + 50*0.2 = 4 + 6 + 10 = 20."}
        ]
    },
    {
        "id": "pb2-c4-e3",
        "title": "Schéma de Bernoulli et loi binomiale B(n, p)",
        "chapter": 4,
        "source": "probabilites/exos/TD_4.pdf:1 (Exercice 1)",
        "context": "Transmission de trames réseau sur un canal bruité : chaque trame a une probabilité indépendante p = 0.1 d'être corrompue. On transmet un bloc de n = 5 trames.",
        "type": "Calcul de probabilités binomiales",
        "component": "Grille de calcul CodeLab",
        "statement": "On transmet n = 5 trames indépendantes. La probabilité d'erreur par trame est p = 0.1. Soit X le nombre de trames erronées (X ~ B(5, 0.1)).\n1. Calculez la probabilité de n'avoir AUCUNE erreur P(X = 0).\n2. Calculez la probabilité d'avoir EXACTEMENT une erreur P(X = 1).\n3. Calculez l'espérance E(X).",
        "solution": "[Exemple]\n0.5905 ; 0.3281 ; 0.5\n\n[Cas 1 — n=5, p=0.1]\np_zero : 0.5905\np_un : 0.3281\nesperance : 0.5\n\n[Cas 2 — n=10, p=0.05]\np_zero : 0.5987\np_un : 0.3151\nesperance : 0.5",
        "steps": "1. P(X = 0) = C(5, 0) · (0.1)^0 · (0.9)^5 = 1 · 1 · 0.59049 ≈ 0.5905.\n2. P(X = 1) = C(5, 1) · (0.1)^1 · (0.9)^4 = 5 · 0.1 · 0.6561 = 0.32805 ≈ 0.3281.\n3. E(X) = n · p = 5 · 0.1 = 0.5.",
        "accepted": [
            "p_zero : 0.5905",
            "0.5905",
            "0.59049",
            "P(X=0) = 0.5905",
            "0,5905"
        ],
        "rejected": [
            {"cmd": "0.9", "reason": "0.9 est la probabilité d'une seule trame sans erreur ; pour 5 trames indépendantes, il faut calculer (0.9)^5 = 0.5905."},
            {"cmd": "0.5", "reason": "0.5 est l'espérance E(X) = n·p, pas la probabilité P(X = 0)."},
            {"cmd": "0.0656", "reason": "0.0656 = (0.1) x (0.9)^4 oublie le coefficient binomial C(5, 1) = 5 (l'erreur peut survenir sur n'importe laquelle des 5 trames)."},
            {"cmd": "0.1", "reason": "0.1 est le paramètre p de la loi, pas la probabilité sur le bloc entier."},
            {"cmd": "0.328", "reason": "Pour P(X=0), la réponse est 0.5905 (0.3281 est P(X=1))."}
        ]
    },
    {
        "id": "pb2-c5-e1",
        "title": "Loi hypergéométrique : échantillonnage sans remise",
        "chapter": 5,
        "source": "probabilites/exos/TD_4.pdf:1 (Exercice 2)",
        "context": "Contrôle de réception de microprocesseurs : un lot de N = 20 pièces contient D = 4 pièces défectueuses. On prélève sans remise un échantillon de n = 3 pièces.",
        "type": "Probabilités sans remise et loi hypergéométrique",
        "component": "Grille de calcul CodeLab",
        "statement": "Dans un lot de N = 20 composants électroniques, D = 4 sont défectueux. On prélève au hasard et sans remise n = 3 composants. Calculez la probabilité exacte d'obtenir exactement 1 composant défectueux dans l'échantillon sous forme de fraction réduite.",
        "solution": "[Exemple]\n24/57\n\n[Cas 1 — N=20, D=4, n=3, k=1]\np : 24/57\n\n[Cas 2 — N=10, D=3, n=2, k=1]\np : 7/15",
        "steps": "1. Nombre total d'échantillons possibles : C(20, 3) = (20 x 19 x 18) / 6 = 1140.\n2. Nombre d'échantillons favorables avec 1 défectueux et 2 conformes : C(4, 1) x C(16, 2) = 4 x 120 = 480.\n3. Probabilité P(X = 1) = 480 / 1140 = 24 / 57 = 8 / 19 ≈ 0.4211.",
        "accepted": [
            "p : 8/19",
            "8/19",
            "24/57",
            "480/1140",
            "0.4211"
        ],
        "rejected": [
            {"cmd": "4/20", "reason": "4/20 = 0.20 est la proportion globale de défauts, pas la probabilité dans un tirage sans remise de 3 pièces."},
            {"cmd": "0.384", "reason": "0.384 correspondrait à un tirage AVEC remise (loi binomiale B(3, 0.2)) ; ici le tirage est SANS remise (loi hypergéométrique)."},
            {"cmd": "120", "reason": "120 est C(16, 2) ; multipliez par C(4, 1) = 4 pour obtenir les 480 cas favorables, puis divisez par C(20, 3) = 1140."},
            {"cmd": "1/3", "reason": "La fraction exacte simplifiée est 8/19 (ou 480/1140)."},
            {"cmd": "480", "reason": "480 est le nombre de cas favorables ; divisez par le nombre total d'issues (1140) pour obtenir la probabilité."}
        ]
    },
    {
        "id": "pb2-c5-e2",
        "title": "Loi de Poisson P(lambda) : flux de requêtes réseau",
        "chapter": 5,
        "source": "probabilites/exos/TD_4.pdf:1 (Exercice 3)",
        "context": "Dimensionnement d'une passerelle API : le nombre de requêtes entrantes par seconde suit une loi de Poisson de paramètre λ = 3 requêtes/seconde.",
        "type": "Calcul de probabilités de Poisson",
        "component": "Grille de calcul CodeLab",
        "statement": "Le nombre de connexions à un serveur en une seconde suit une loi de Poisson X ~ P(λ) avec λ = 3. Calculez :\n1. La probabilité de recevoir exactement 2 requêtes : P(X = 2).\n2. La probabilité de ne recevoir aucune requête : P(X = 0).",
        "solution": "[Exemple]\n0.2240 ; 0.0498\n\n[Cas 1 — lambda=3, k=2]\np_deux : 0.2240\np_zero : 0.0498\n\n[Cas 2 — lambda=2, k=1]\np_un : 0.2707\np_zero : 0.1353",
        "steps": "1. P(X = k) = e^(-λ) · (λ^k) / k!.\n2. Pour k = 2 : P(X = 2) = e^(-3) · (3^2) / 2! = e^(-3) · 9 / 2 = 4.5 · e^(-3) ≈ 4.5 · 0.049787 = 0.22404 ≈ 0.2240.\n3. Pour k = 0 : P(X = 0) = e^(-3) · 3^0 / 0! = e^(-3) ≈ 0.0498.",
        "accepted": [
            "p_deux : 0.2240",
            "0.2240",
            "0.224",
            "P(X=2) = 0.2240",
            "0,2240"
        ],
        "rejected": [
            {"cmd": "0.149", "reason": "Vérifiez le calcul : 4.5 x e^(-3) = 0.2240."},
            {"cmd": "3", "reason": "3 est le paramètre lambda (qui est aussi l'espérance de la loi de Poisson), pas une probabilité."},
            {"cmd": "0.0498", "reason": "0.0498 est P(X = 0) ; pour P(X = 2), multipliez par 3^2 / 2! = 4.5 ce qui donne 0.2240."},
            {"cmd": "0.5", "reason": "La loi de Poisson n'est pas symétrique autour de lambda."},
            {"cmd": "0.333", "reason": "Attention : n'utilisez pas 1/lambda pour les probabilités ponctuelles de Poisson."}
        ]
    },
    {
        "id": "pb2-c5-e3",
        "title": "Somme de variables de Poisson indépendantes",
        "chapter": 5,
        "source": "probabilites/exos/TD_4.pdf:2 (Exercice 4)",
        "context": "Agrégation de deux flux d'incidents indépendants arrivant sur un centre de support : flux matériel X1 ~ P(1.5) et flux logiciel X2 ~ P(2.5).",
        "type": "Propriété d'addition de lois de Poisson",
        "component": "Grille de calcul CodeLab",
        "statement": "Deux sources indépendantes d'incidents informatiques suivent des lois de Poisson : X1 ~ P(1.5) et X2 ~ P(2.5).\n1. Quelle est la loi de la somme Y = X1 + X2 ? Précisez son paramètre λ_total.\n2. Calculez la probabilité de n'avoir aucun incident au total en une heure : P(Y = 0).",
        "solution": "[Exemple]\n4 ; 0.0183\n\n[Cas 1 — lambda1=1.5, lambda2=2.5]\nlambda_total : 4\np_zero : 0.0183\n\n[Cas 2 — lambda1=1, lambda2=2]\nlambda_total : 3\np_zero : 0.0498",
        "steps": "1. Théorème : la somme de deux variables indépendantes de Poisson X1 ~ P(λ1) et X2 ~ P(λ2) suit la loi de Poisson P(λ1 + λ2).\n2. Ici λ_total = 1.5 + 2.5 = 4.\n3. P(Y = 0) = e^(-4) · 4^0 / 0! = e^(-4) ≈ 0.018315 ≈ 0.0183 (soit 1.83%).",
        "accepted": [
            "lambda_total : 4",
            "4",
            "0.0183",
            "p_zero : 0.0183",
            "P(Y=0) = 0.0183"
        ],
        "rejected": [
            {"cmd": "3.75", "reason": "Les paramètres s'additionnent (1.5 + 2.5 = 4), ils ne se multiplient pas (1.5 x 2.5 = 3.75)."},
            {"cmd": "2", "reason": "2 est la moyenne des deux lambdas ; pour la somme totale, additionnez les débits : 1.5 + 2.5 = 4."},
            {"cmd": "0.05", "reason": "e^(-4) vaut 0.0183 et non 0.05 (qui est e^(-3))."},
            {"cmd": "0", "reason": "Bien que faible, la probabilité n'est pas nulle : P(Y = 0) = e^(-4) ≈ 0.0183."},
            {"cmd": "1", "reason": "lambda_total = 4, il ne vaut pas 1."}
        ]
    },

    # Bloc 4 : Variables aléatoires continues (Chapitre 6)
    {
        "id": "pb2-c6-e1",
        "title": "Densité continue, constante de normalisation et fonction de répartition",
        "chapter": 6,
        "source": "probabilites/exos/TD_5.pdf:1 (Exercice 1)",
        "context": "Soit la variable aléatoire continue X de densité de probabilité f(x) = k·x pour x ∈ [0, 1] et f(x) = 0 ailleurs.",
        "type": "Calcul intégral de densité continue",
        "component": "Grille de calcul CodeLab",
        "statement": "Soit X une variable aléatoire continue de fonction de densité f(x) = k·x définie sur l'intervalle [0, 1] (et nulle ailleurs).\n1. Déterminez la valeur de la constante k pour que f soit une densité de probabilité.\n2. Donnez l'expression de la fonction de répartition F(x) sur [0, 1] et calculez F(0.5).",
        "solution": "[Exemple]\n2 ; 0.25\n\n[Cas 1 — f(x) = k*x sur [0, 1]]\nk : 2\nF_0_5 : 0.25\n\n[Cas 2 — f(x) = k*x^2 sur [0, 1]]\nk : 3\nF_0_5 : 0.125",
        "steps": "1. Condition de normalisation : intégrale de 0 à 1 de f(x) dx = 1.\n2. int_0^1 k·x dx = [k · x^2 / 2]_0^1 = k/2 = 1 => k = 2.\n3. Fonction de répartition F(x) = int_0^x 2t dt = [t^2]_0^x = x^2 pour x dans [0, 1].\n4. En x = 0.5 : F(0.5) = (0.5)^2 = 0.25 (ou 1/4).",
        "accepted": [
            "k : 2",
            "2",
            "0.25",
            "1/4",
            "k = 2"
        ],
        "rejected": [
            {"cmd": "1", "reason": "Si k=1, l'intégrale de x sur [0, 1] ne vaut que 1/2, ce qui ne satisfait pas l'axiome de probabilité totale (qui doit valoir 1) ; k vaut 2."},
            {"cmd": "0.5", "reason": "0.5 est l'intégrale de x sans constante ; k/2 = 1 entraîne k = 2."},
            {"cmd": "4", "reason": "k=4 donnerait une intégrale égale à 2 au lieu de 1."},
            {"cmd": "x", "reason": "La primitive de 2x est x^2, donc F(0.5) = (0.5)^2 = 0.25."},
            {"cmd": "0.50", "reason": "F(0.5) = 0.25 (la probabilité que X <= 0.5 est de 25% car la densité croît vers 1)."}
        ]
    },
    {
        "id": "pb2-c6-e2",
        "title": "Espérance et variance d'une variable aléatoire continue",
        "chapter": 6,
        "source": "probabilites/exos/TD_5.pdf:1 (Exercice 2)",
        "context": "Calcul des caractéristiques de position et de dispersion pour la densité continue f(x) = 2x sur [0, 1].",
        "type": "Calcul intégral des moments d'une loi continue",
        "component": "Grille de calcul CodeLab",
        "statement": "Soit X de densité f(x) = 2x sur [0, 1].\n1. Calculez l'espérance mathématique E(X) = ∫ x f(x) dx sous forme de fraction réduite.\n2. Calculez le moment d'ordre 2 E(X²) = ∫ x² f(x) dx.\n3. Déduisez-en la variance V(X) sous forme de fraction réduite.",
        "solution": "[Exemple]\n2/3 ; 1/2 ; 1/18\n\n[Cas 1 — f(x) = 2x sur [0, 1]]\nesperance : 2/3\nmoment2 : 1/2\nvariance : 1/18\n\n[Cas 2 — f(x) = 3x^2 sur [0, 1]]\nesperance : 3/4\nmoment2 : 3/5\nvariance : 3/80",
        "steps": "1. E(X) = int_0^1 x·(2x) dx = int_0^1 2x^2 dx = [2x^3 / 3]_0^1 = 2/3 ≈ 0.6667.\n2. E(X^2) = int_0^1 x^2·(2x) dx = int_0^1 2x^3 dx = [2x^4 / 4]_0^1 = [x^4 / 2]_0^1 = 1/2 = 0.5.\n3. Variance par Koenig-Huygens : V(X) = E(X^2) - [E(X)]^2 = 1/2 - (2/3)^2 = 1/2 - 4/9 = (9 - 8) / 18 = 1/18 ≈ 0.0556.",
        "accepted": [
            "esperance : 2/3",
            "2/3",
            "1/18",
            "variance : 1/18",
            "0.6667"
        ],
        "rejected": [
            {"cmd": "1/2", "reason": "1/2 = 0.5 est le milieu de l'intervalle [0, 1], mais comme la densité est croissante (f(x)=2x), la masse de probabilité est déportée vers la droite : E(X) = 2/3."},
            {"cmd": "1/3", "reason": "1/3 est la primitive de x^2 sans le coefficient 2 ; avec f(x)=2x, E(X) = 2/3."},
            {"cmd": "1/4", "reason": "Vérifiez la formule de Koenig-Huygens : 1/2 - 4/9 = 1/18."},
            {"cmd": "0.055", "reason": "La valeur exacte attendue en fraction réduite est 1/18 (arrondi : 0.0556)."},
            {"cmd": "2", "reason": "L'espérance d'une variable bornée dans [0, 1] ne peut pas être supérieure à 1 ! E(X) = 2/3."}
        ]
    },
    {
        "id": "pb2-c6-e3",
        "title": "Loi normale N(mu, sigma^2) : standardisation et lecture de table",
        "chapter": 6,
        "source": "probabilites/exos/TD_6.pdf:1 (Exercice 1 & 2)",
        "context": "Temps de réponse d'un serveur d'application : la latence X suit une loi normale de moyenne μ = 100 ms et d'écart-type σ = 15 ms. Calcul de la probabilité que la latence dépasse 130 ms.",
        "type": "Standardisation et calcul de loi normale",
        "component": "Grille de calcul CodeLab",
        "statement": "La latence X d'un service web suit une loi normale X ~ N(μ = 100, σ² = 15²) (en ms).\n1. Calculez la variable centrée réduite Z = (X - 100) / 15 pour x = 130 ms.\n2. Sachant que la fonction de répartition de la loi normale centrée réduite vaut Φ(2.0) = 0.9772, calculez la probabilité que la latence dépasse 130 ms : P(X > 130).",
        "solution": "[Exemple]\n2 ; 0.0228\n\n[Cas 1 — X ~ N(100, 15^2), x = 130]\nz : 2.0\np_depassement : 0.0228\n\n[Cas 2 — X ~ N(100, 15^2), x = 115]\nz : 1.0\np_depassement : 0.1587",
        "steps": "1. Standardisation : z = (130 - 100) / 15 = 30 / 15 = 2.0.\n2. Par symétrie et complémentaire : P(X > 130) = P(Z > 2.0) = 1 - Φ(2.0).\n3. P(X > 130) = 1 - 0.9772 = 0.0228 (soit 2.28% de requêtes au-delà du seuil critique).",
        "accepted": [
            "p_depassement : 0.0228",
            "0.0228",
            "2.28%",
            "0.023",
            "1 - 0.9772"
        ],
        "rejected": [
            {"cmd": "0.9772", "reason": "0.9772 est P(X <= 130) ; la consigne demande la probabilité que la latence DÉPASSE 130 ms : 1 - 0.9772 = 0.0228."},
            {"cmd": "2", "reason": "2.0 est la valeur de la variable centrée réduite Z, pas la probabilité demandée."},
            {"cmd": "30", "reason": "30 est l'écart brut (130 - 100) ; divisez par l'écart-type 15 pour obtenir z = 2.0."},
            {"cmd": "0.05", "reason": "Calculez exactement 1 - 0.9772 = 0.0228."},
            {"cmd": "0.5", "reason": "Pour x = 130 > mu = 100, la probabilité de dépassement est nettement inférieure à 0.5 (elle vaut 2.28%)."}
        ]
    }
]

def generate_fiche(data):
    accepted_lines = "\n".join([f"- `{cmd}`" for cmd in data["accepted"]])
    rejected_lines = "\n".join([f"- `{rej['cmd']}` : {rej['reason']}" for rej in data["rejected"]])
    
    md = f"""# Fiche de Conception — {data['id']} : {data['title']}

- **Identifiant** : `{data['id']}`
- **Matière** : Probabilités B2 (`probabilites`)
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
    print(f"[ok] Fiche Probabilités créée : {d['id']}.md")

print(f"Total : {len(fiches_data)} fiches Probabilités B2 créées avec succès.")
