import re


def signe(nombre):
    return (nombre > 0) - (nombre < 0)


def lignes_de(entree):
    return [ligne.strip().casefold() for ligne in entree.splitlines()]


def signature(identifiant, entree):
    lignes = lignes_de(entree)
    if identifiant == 'ws2-c1-e1':
        tailles = [int(valeur) for valeur in lignes[1:]]
        return (int(lignes[0]), tailles.count(0), len(set(tailles)) == 1)
    if identifiant == 'ws2-c1-e2':
        return (int(lignes[0]) >= 3, int(lignes[1]) >= 2, lignes[2] == 'oui')
    if identifiant == 'ws2-c1-e3':
        capacite, taille = map(int, lignes)
        return (capacite == 0, taille == 0, signe(taille - capacite), abs(taille - capacite) == 1)
    if identifiant == 'ws2-c2-e1':
        total, pannes = map(int, lignes)
        return (total == 1, pannes == 0, pannes == total, total - pannes == 1, pannes > 1)
    if identifiant == 'ws2-c2-e2':
        serveurs, requetes = map(int, lignes)
        reste = requetes % serveurs
        return (serveurs == 1, requetes == 0, requetes < serveurs, reste == 0, reste * 2 == serveurs)
    if identifiant in {'ws2-c2-e3', 'ws2-c3-e2', 'ws2-c4-e1'}:
        return (int(lignes[0]), tuple(sorted(lignes[1:])))
    if identifiant == 'ws2-c3-e1':
        total, en_ligne = map(int, lignes)
        return (total == 1, en_ligne == 0, en_ligne == total, signe(2 * en_ligne - total))
    if identifiant == 'ws2-c3-e3':
        requetes, serveurs = map(int, lignes)
        reste = requetes % serveurs
        return (requetes == 0, requetes < serveurs, reste == 0, reste == serveurs - 1, reste > 1)
    if identifiant == 'ws2-c4-e2':
        temperature = int(lignes[0])
        plage = 'normal' if temperature < 60 else 'chaud' if temperature < 85 else 'danger' if temperature < 95 else 'critique'
        borne = 'avant' if temperature in {59, 84, 94} else 'seuil' if temperature in {60, 85, 95} else 'interieur'
        return (plage, borne)
    if identifiant == 'ws2-c5-e1':
        produit = lignes[1]
        return (int(lignes[0]), len(produit.split()), bool(re.search(r'\d+\.\d+', produit)), '-' in produit)
    if identifiant == 'ws2-c5-e3':
        vcpu, coeurs = map(int, lignes)
        return (vcpu == 0, coeurs == 0, signe(vcpu - coeurs), vcpu - coeurs == 1)
    if identifiant == 'ws2-c6-e1':
        age = int(lignes[0])
        if age == 0:
            return ('jour zero',)
        if age < 7:
            return ('recent',)
        if age == 7:
            return ('limite',)
        if age == 8:
            return ('premiere purge',)
        if age >= 365:
            return ('un an ou plus',)
        return ('plus ancien',)
    if identifiant == 'ws2-c6-e3':
        capacite = int(lignes[0])
        tailles = [int(valeur) for valeur in lignes[2:]]
        total = sum(tailles)
        return (capacite == 0, total == 0, signe(total - capacite), abs(total - capacite) == 1)
    raise ValueError('Signature sémantique absente : ' + identifiant)


def canonique_permutation(identifiant, entree):
    lignes = lignes_de(entree)
    if identifiant in {'ws2-c1-e1', 'ws2-c2-e3', 'ws2-c3-e2', 'ws2-c4-e1'}:
        valeurs = [int(valeur) for valeur in lignes[1:]] if identifiant == 'ws2-c1-e1' else lignes[1:]
        return (int(lignes[0]), tuple(sorted(valeurs)))
    if identifiant == 'ws2-c6-e3':
        return (int(lignes[0]), int(lignes[1]), tuple(sorted(map(int, lignes[2:]))))
    if identifiant == 'ws2-c1-e2':
        return (tuple(sorted(map(int, lignes[:2]))), lignes[2])
    if identifiant == 'ws2-c5-e1':
        return signature(identifiant, entree)
    return tuple(sorted(map(int, lignes)))


def verifier_distincts(identifiant, anciens, nouveaux):
    signatures = {signature(identifiant, entree) for entree in anciens}
    permutations = {canonique_permutation(identifiant, entree) for entree in anciens}
    for entree in nouveaux:
        cle = signature(identifiant, entree)
        permutation = canonique_permutation(identifiant, entree)
        if cle in signatures:
            raise ValueError('signature déjà représentée pour ' + identifiant)
        if permutation in permutations:
            raise ValueError('permutation déjà représentée pour ' + identifiant)
        signatures.add(cle)
        permutations.add(permutation)
