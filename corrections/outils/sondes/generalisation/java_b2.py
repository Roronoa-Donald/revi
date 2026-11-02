import math
import re
from decimal import Decimal, ROUND_HALF_UP


def nombre_mots(texte, total):
    valeurs = texte.split()
    if len(valeurs) != total:
        raise ValueError('nombre de champs invalide')
    return valeurs


def entiers(texte, total):
    valeurs = nombre_mots(texte, total)
    if any(not re.fullmatch(r'[+-]?[0-9]+', valeur) for valeur in valeurs):
        raise ValueError('entier invalide')
    resultat = [int(valeur) for valeur in valeurs]
    if any(valeur < -2147483648 or valeur > 2147483647 for valeur in resultat):
        raise ValueError('entier hors domaine Java')
    return resultat


def serie(texte):
    champs = texte.split()
    if not champs:
        raise ValueError('taille absente')
    nombre = int(champs[0])
    if not 1 <= nombre <= 100 or len(champs) != nombre + 1:
        raise ValueError('serie hors domaine')
    return entiers(texte, nombre + 1)[1:]


def decimal_deux(valeur):
    return str(valeur.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP))


def calculer(identifiant, entree):
    if identifiant == 'java2-c1-e2':
        valeurs = serie(entree)
        return 'moyenne : ' + decimal_deux(Decimal(sum(valeurs)) / len(valeurs))
    if identifiant == 'java2-c2-e1':
        valeur, = entiers(entree, 1)
        return 'pair' if valeur % 2 == 0 else 'impair'
    if identifiant == 'java2-c2-e2':
        valeur, = entiers(entree, 1)
        if not 1 <= valeur <= 1000:
            raise ValueError('nombre de termes hors domaine')
        return f'somme : {valeur * (valeur + 1) // 2}'
    if identifiant == 'java2-c2-e3':
        valeur, = entiers(entree, 1)
        if not 1 <= valeur <= 20:
            raise ValueError('nombre de termes hors domaine')
        racine = math.sqrt(5)
        phi = (1 + racine) / 2
        psi = (1 - racine) / 2
        return ' '.join(str(round((phi ** indice - psi ** indice) / racine)) for indice in range(valeur))
    if identifiant == 'java2-c3-e1':
        return f'max : {max(serie(entree))}'
    if identifiant == 'java2-c3-e2':
        return ' '.join(str(valeur) for valeur in reversed(serie(entree)))
    if identifiant == 'java2-c3-e3':
        valeur, = entiers(entree, 1)
        premier = valeur >= 2 and all(valeur % diviseur for diviseur in range(2, math.isqrt(valeur) + 1))
        return 'premier' if premier else 'non premier'
    if identifiant == 'java2-c4-e1':
        largeur, hauteur = entiers(entree, 2)
        if largeur < 0 or hauteur < 0 or largeur * hauteur > 2147483647:
            raise ValueError('dimensions hors domaine')
        return f'aire : {largeur * hauteur}'
    if identifiant == 'java2-c4-e2':
        abscisse, ordonnee = entiers(entree, 2)
        return f'({abscisse}, {ordonnee})'
    if identifiant == 'java2-c4-e3':
        nom, age = nombre_mots(entree, 2)
        age, = entiers(age, 1)
        return f'{nom} ({age} ans)'
    if identifiant == 'java2-c5-e1':
        champs = entree.split()
        if not champs:
            raise ValueError('taille absente')
        nombre = int(champs[0])
        if not 1 <= nombre <= 100 or len(champs) != nombre + 1:
            raise ValueError('nombre de mots invalide')
        return f'mots distincts : {len(set(champs[1:]))}'
    if identifiant == 'java2-c5-e2':
        forme, nombre = nombre_mots(entree, 2)
        valeur = Decimal(nombre)
        if forme not in {'carre', 'cercle'} or not Decimal('0') <= valeur <= Decimal('1000'):
            raise ValueError('forme ou taille hors domaine')
        aire = valeur * valeur * (Decimal('3.141592653589793') if forme == 'cercle' else 1)
        return 'aire : ' + decimal_deux(aire)
    if identifiant == 'java2-c5-e3':
        nom, = nombre_mots(entree, 1)
        return f'{nom} dit Wouf'
    if identifiant == 'java2-c6-e1':
        dividende, diviseur = entiers(entree, 2)
        if diviseur == 0:
            return 'erreur : division par zéro'
        if dividende == -2147483648 and diviseur == -1:
            raise ValueError('debordement Java exclu')
        quotient = abs(dividende) // abs(diviseur)
        if (dividende < 0) != (diviseur < 0):
            quotient = -quotient
        return f'resultat : {quotient}'
    if identifiant == 'java2-c6-e2':
        saisie, = nombre_mots(entree, 1)
        if not re.fullmatch(r'[+-]?[0-9]+', saisie):
            return 'saisie invalide'
        valeur = int(saisie)
        return f'valeur : {valeur}' if -2147483648 <= valeur <= 2147483647 else 'saisie invalide'
    if identifiant == 'java2-c6-e3':
        solde, montant = entiers(entree, 2)
        if solde < 0 or montant < 0:
            raise ValueError('montant hors domaine')
        return 'erreur : solde insuffisant' if montant > solde else f'reste : {solde - montant}'
    raise ValueError('oracle Java inconnu')
