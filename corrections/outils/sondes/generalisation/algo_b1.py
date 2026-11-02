from math import factorial, gcd, isqrt


def calculer(identifiant, entree):
    if identifiant == 'algo-c8-e3':
        return ''.join(reversed(entree.strip()))
    nombres = [int(nombre) for nombre in entree.split()]
    premier = nombres[0]
    if identifiant == 'algo-c1-e1':
        longueur, largeur = nombres
        return f'{longueur * largeur}\n{2 * (longueur + largeur)}'
    if identifiant == 'algo-c1-e2':
        prix, quantite, remise = nombres
        return str(prix * quantite * (100 - remise) // 100)
    if identifiant == 'algo-c1-e3':
        heures, reste = divmod(premier, 3600)
        minutes, secondes = divmod(reste, 60)
        return f'{heures} h {minutes} min {secondes} s'
    if identifiant == 'algo-c2-e1':
        return f'{nombres[1]} {premier}'
    if identifiant == 'algo-c2-e2':
        return f'{(2 * premier + 3 * nombres[1]) / 5:.2f}'
    if identifiant == 'algo-c2-e3':
        return str(sum(int(chiffre) for chiffre in str(premier)))
    if identifiant == 'algo-c3-e1':
        return 'Admis' if premier >= 10 else 'Rattrapage' if premier >= 8 else 'Ajourné'
    if identifiant == 'algo-c3-e2':
        maximum = max(nombres)
        return f'Max : {maximum} (position {nombres.index(maximum) + 1})'
    if identifiant == 'algo-c3-e3':
        return 'bissextile' if premier % 400 == 0 or premier % 4 == 0 and premier % 100 != 0 else 'ordinaire'
    if identifiant == 'algo-c4-e1':
        return '\n'.join(f'{premier} x {facteur} = {premier * facteur}' for facteur in range(1, 11))
    if identifiant == 'algo-c4-e2':
        return str(premier * (premier + 1) // 2)
    if identifiant == 'algo-c4-e3':
        return str(factorial(premier))
    if identifiant == 'algo-c5-e1':
        if premier <= 0:
            return '0 0'
        nombre = max(0, (isqrt(8 * premier + 1) - 1) // 2)
        if nombre * (nombre + 1) // 2 < premier:
            nombre += 1
        return f'{nombre * (nombre + 1) // 2} {nombre}'
    if identifiant == 'algo-c5-e2':
        return str(len(str(premier)))
    if identifiant == 'algo-c5-e3':
        valeur = premier
        etapes = 0
        while valeur != 1 and etapes < 10000:
            valeur = valeur // 2 if valeur % 2 == 0 else 3 * valeur + 1
            etapes += 1
        if valeur != 1:
            raise ValueError('Suite trop longue pour le banc')
        return str(etapes)
    if identifiant == 'algo-c6-e1':
        valeurs = nombres[1:]
        if len(valeurs) != premier or not valeurs:
            raise ValueError('Tableau invalide')
        return f'{sum(valeurs)}\n{max(valeurs)}'
    if identifiant == 'algo-c6-e2':
        valeurs, cible = nombres[1:-1], nombres[-1]
        if len(valeurs) != premier:
            raise ValueError('Tableau invalide')
        return str(valeurs.index(cible) + 1) if cible in valeurs else 'absent'
    if identifiant in {'algo-c6-e3', 'algo-c9-e1'}:
        valeurs = nombres[1:]
        if len(valeurs) != premier:
            raise ValueError('Tableau invalide')
        resultat = ' '.join(str(valeur) for valeur in sorted(valeurs))
        if identifiant == 'algo-c6-e3':
            return resultat
        positions = sorted(range(len(valeurs)), key=lambda indice: (valeurs[indice], indice))
        deplacement = max((position - indice for indice, position in enumerate(positions)), default=0)
        passages = min(max(0, len(valeurs) - 1), deplacement + 1)
        return f'{resultat}\n{passages}'
    if identifiant == 'algo-c7-e1':
        return f'Carre : {premier * premier}'
    if identifiant == 'algo-c7-e2':
        notes = nombres[1:]
        if len(notes) != premier or not notes:
            raise ValueError('Notes invalides')
        return f'{sum(notes) / len(notes):.2f} {max(notes)}'
    if identifiant == 'algo-c7-e3':
        premiers = [valeur for valeur in range(2, premier + 1)
                     if all(valeur % diviseur for diviseur in range(2, isqrt(valeur) + 1))]
        return str(len(premiers))
    if identifiant == 'algo-c8-e1':
        lignes, colonnes = nombres[:2]
        matrice = nombres[2:]
        if len(matrice) != lignes * colonnes:
            raise ValueError('Matrice invalide')
        return str(sum(matrice))
    if identifiant == 'algo-c8-e2':
        matrice = nombres[1:]
        if len(matrice) != premier * premier:
            raise ValueError('Matrice invalide')
        diagonale = sum(matrice[indice * premier + indice] for indice in range(premier))
        opposee = sum(matrice[indice * premier + premier - indice - 1] for indice in range(premier))
        return f'{diagonale}\n{opposee}'
    if identifiant == 'algo-c9-e2':
        valeurs, cible = nombres[1:-1], nombres[-1]
        if len(valeurs) != premier or valeurs != sorted(valeurs) or len(set(valeurs)) != len(valeurs):
            raise ValueError('Tableau de recherche invalide')
        return str(valeurs.index(cible) + 1) if cible in valeurs else 'absent'
    if identifiant == 'algo-c9-e3':
        base, exposant, gauche, droite = nombres
        return f'{base ** exposant}\n{gcd(gauche, droite)}'
    if identifiant == 'algo-c10-e1':
        prix, quantite = nombres
        taux = 10 if quantite > 50 else 5 if quantite > 10 else 0
        return str(prix * quantite * (100 - taux) // 100)
    if identifiant == 'algo-c10-e2':
        nombre_pairs = premier // 2
        return str(nombre_pairs * (nombre_pairs + 1))
    if identifiant == 'algo-c10-e3':
        durees = nombres[1:]
        if len(durees) != premier or not durees:
            raise ValueError('File invalide')
        total = sum(valeur * (len(durees) - position - 1) for position, valeur in enumerate(durees))
        return f'{total}\n{total / len(durees):.2f}'
    raise ValueError('Oracle algorithmique non disponible')
