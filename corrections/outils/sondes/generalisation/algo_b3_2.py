"""Oracles indépendants pour les fiches B3 d'algorithmique, codec « lignes ».

Chaque ligne contient une déclaration et des champs sans espaces. Les sommets
sont des mots ASCII majuscules et les objets des mots ASCII minuscules. Les
poids et distances finis sont des entiers décimaux canoniques, sans zéros
superflus ni « -0 ». Les graphes sont limités à huit sommets, sans boucle ni
arêtes parallèles, avec des extrémités déclarées.

L'orientation du BFS n'est pas explicitée dans son énoncé : les deux lectures
ne sont acceptées que si elles produisent la même visite et le même chemin.
Kruskal exige un graphe connexe d'au moins deux sommets. Dijkstra exige des
poids strictement positifs et un unique plus court chemin simple vers la cible ;
le départage n'est pas précisé.
L'analyse recherche les cycles négatifs accessibles depuis la source indiquée.

L'escalier est borné à 14 marches et quatre tailles de pas distinctes et
positives. Le sac est borné à 16 objets de noms distincts, de poids strictement
positifs et de valeurs positives ou nulles. La LCS accepte deux chaînes non
vides de 12 caractères au plus. Une entrée hors de ce domaine ou ambiguë lève
ValueError : l'appelant doit la classer non évaluée, pas correcte ou incorrecte.
"""

from collections import deque
from functools import lru_cache
from itertools import combinations, product
from math import factorial
import re


def _champs(ligne, commande, attendus):
    morceaux = ligne.split()
    if not morceaux or morceaux[0] != commande:
        raise ValueError('Commande inattendue')
    resultat = {}
    for morceau in morceaux[1:]:
        cle, separateur, valeur = morceau.partition('=')
        if not separateur or cle in resultat or cle not in attendus:
            raise ValueError('Champ inattendu ou répété')
        resultat[cle] = valeur
    if set(resultat) != set(attendus) or not resultat.get('nom'):
        raise ValueError('Champ obligatoire manquant')
    return resultat


def _elements(valeur):
    if not valeur:
        return []
    elements = valeur.split(',')
    if any(not element for element in elements):
        raise ValueError('Liste mal formée')
    return elements


def _entier(valeur):
    if not re.fullmatch(r'(?:0|-?[1-9][0-9]*)', valeur):
        raise ValueError('Entier non canonique ou invalide')
    return int(valeur)


def _nom(valeur):
    if not re.fullmatch(r'[A-Za-z0-9_]+', valeur):
        raise ValueError('Nom hors du domaine contrôlé')
    return valeur


def _sommets(valeur):
    sommets = [_nom(sommet) for sommet in _elements(valeur)]
    if (not sommets or len(sommets) > 8 or len(sommets) != len(set(sommets))
            or any(not re.fullmatch(r'[A-Z]+', sommet) for sommet in sommets)):
        raise ValueError('Sommets invalides, répétés ou trop nombreux')
    return sommets


def _aretes(valeur, sommets, separateur, oriente, pondere):
    resultat = []
    deja_vues = set()
    for element in _elements(valeur):
        if pondere:
            morceaux = element.split(':')
            if len(morceaux) != 2:
                raise ValueError('Arête pondérée invalide')
            extremites, poids = morceaux[0], _entier(morceaux[1])
        else:
            extremites, poids = element, None
        extremites = extremites.split(separateur)
        if len(extremites) != 2:
            raise ValueError('Extrémités invalides')
        depart, arrivee = extremites
        if depart not in sommets or arrivee not in sommets or depart == arrivee:
            raise ValueError('Extrémité inconnue ou boucle non prise en charge')
        cle = (depart, arrivee) if oriente else tuple(sorted((depart, arrivee)))
        if cle in deja_vues:
            raise ValueError('Arêtes parallèles non prises en charge')
        deja_vues.add(cle)
        resultat.append((depart, arrivee, poids))
    return resultat


def _representation(ligne):
    champs = _champs(ligne, 'GRAPHE', {'nom', 'TYPE', 'SOMMETS', 'ARETES'})
    if champs['TYPE'] not in {'ORIENTE', 'NON_ORIENTE'}:
        raise ValueError('Orientation inconnue')
    sommets = _sommets(champs['SOMMETS'])
    oriente = champs['TYPE'] == 'ORIENTE'
    aretes = _aretes(champs['ARETES'], sommets, '-', oriente, True)
    voisins = {sommet: [] for sommet in sommets}
    for depart, arrivee, poids in aretes:
        voisins[depart].append((arrivee, poids))
        if not oriente:
            voisins[arrivee].append((depart, poids))
    degres = []
    adjacences = []
    for sommet in sommets:
        if oriente:
            entrants = sum(arrivee == sommet for _, arrivee, _ in aretes)
            degres.append(f'{sommet}={entrants}in/{len(voisins[sommet])}out')
        else:
            degres.append(f'{sommet}={len(voisins[sommet])}')
        liste = ', '.join(f'{voisin}({poids})' for voisin, poids in sorted(voisins[sommet]))
        adjacences.append(f'{sommet} -> [{liste}]')
    premiere = f"GRAPHE: nom={champs['nom']} | SOMMETS: {len(sommets)} | ARETES: {len(aretes)}"
    return f"{premiere}\nDEGRES: {', '.join(degres)}\nADJ: {' | '.join(adjacences)}"


def _visite_bfs(sommets, aretes, depart, cible, oriente):
    voisins = {sommet: set() for sommet in sommets}
    for origine, destination, _ in aretes:
        voisins[origine].add(destination)
        if not oriente:
            voisins[destination].add(origine)
    file = deque([depart])
    parents = {depart: None}
    visites = []
    while file:
        courant = file.popleft()
        visites.append(courant)
        if courant == cible:
            break
        for voisin in sorted(voisins[courant]):
            if voisin not in parents:
                parents[voisin] = courant
                file.append(voisin)
    if cible not in visites:
        return tuple(visites), None
    chemin = []
    courant = cible
    while courant is not None:
        chemin.append(courant)
        courant = parents[courant]
    return tuple(visites), tuple(reversed(chemin))


def _bfs(ligne):
    champs = _champs(ligne, 'BFS', {'nom', 'SOMMETS', 'ARETES', 'DEPART', 'CIBLE'})
    sommets = _sommets(champs['SOMMETS'])
    if champs['DEPART'] not in sommets or champs['CIBLE'] not in sommets:
        raise ValueError('Départ ou cible inconnu')
    aretes = _aretes(champs['ARETES'], sommets, '-', False, False)
    dirige = _visite_bfs(sommets, aretes, champs['DEPART'], champs['CIBLE'], True)
    non_dirige = _visite_bfs(sommets, aretes, champs['DEPART'], champs['CIBLE'], False)
    if dirige != non_dirige:
        raise ValueError('Orientation du BFS non précisée et déterminante')
    visites, chemin = dirige
    debut = f"BFS: nom={champs['nom']}"
    if chemin is None:
        return f"{debut} | INACCESSIBLE | VISITES: {', '.join(visites)}"
    return (f"{debut} | DISTANCE: {len(chemin) - 1} | CHEMIN: {' -> '.join(chemin)}"
            f" | VISITES: {', '.join(visites)}")


def _accessibles(voisins, depart):
    visites = {depart}
    attente = [depart]
    while attente:
        courant = attente.pop()
        for voisin in voisins[courant]:
            if voisin not in visites:
                visites.add(voisin)
                attente.append(voisin)
    return visites


def _kruskal(ligne):
    champs = _champs(ligne, 'KRUSKAL', {'nom', 'SOMMETS', 'ARETES'})
    sommets = _sommets(champs['SOMMETS'])
    aretes = _aretes(champs['ARETES'], sommets, '-', False, True)
    ordonnees = sorted((poids, *sorted((depart, arrivee))) for depart, arrivee, poids in aretes)
    retenues = []
    rejets = 0
    voisins = {sommet: set() for sommet in sommets}
    for poids, depart, arrivee in ordonnees:
        if arrivee in _accessibles(voisins, depart):
            rejets += 1
        else:
            retenues.append((depart, arrivee, poids))
            voisins[depart].add(arrivee)
            voisins[arrivee].add(depart)
    if len(sommets) < 2:
        raise ValueError('Affichage du graphe à un sommet non précisé')
    if len(retenues) != len(sommets) - 1:
        raise ValueError('Arbre couvrant inexistant pour un graphe non connexe')
    liste = ', '.join(f'{depart}-{arrivee}:{poids}' for depart, arrivee, poids in retenues)
    total = sum(poids for _, _, poids in retenues)
    return f"KRUSKAL: nom={champs['nom']} | POIDS_MST: {total} | ARETES: {liste} | REJETS: {rejets}"


def _relaxation(ligne):
    champs = _champs(ligne, 'RELAX', {'nom', 'DISTS', 'ARC'})
    distances = {}
    for element in _elements(champs['DISTS']):
        morceaux = element.split(':')
        if len(morceaux) != 2:
            raise ValueError('Distance invalide')
        sommet = _nom(morceaux[0])
        if sommet in distances:
            raise ValueError('Distance répétée')
        distances[sommet] = None if morceaux[1] == 'inf' else _entier(morceaux[1])
    sommets = _sommets(','.join(distances))
    aretes = _aretes(champs['ARC'], sommets, '->', True, True)
    if len(aretes) != 1:
        raise ValueError('Un arc est requis')
    depart, arrivee, poids = aretes[0]
    avant = distances[arrivee]
    source = distances[depart]
    ameliore = source is not None and (avant is None or source + poids < avant)
    apres = source + poids if ameliore else avant
    afficher_avant = 'inf' if avant is None else str(avant)
    afficher_apres = 'inf' if apres is None else str(apres)
    oui_non = 'OUI' if ameliore else 'NON'
    return (f"RELAX: nom={champs['nom']} | ARC: {depart}->{arrivee}:{poids}"
            f" | AMELIORATION: {oui_non} | DIST_AVANT: {afficher_avant} | DIST_APRES: {afficher_apres}")


def _dijkstra(ligne):
    champs = _champs(ligne, 'DIJKSTRA', {'nom', 'SOURCE', 'SOMMETS', 'ARCS', 'CIBLE'})
    sommets = _sommets(champs['SOMMETS'])
    source, cible = champs['SOURCE'], champs['CIBLE']
    if source not in sommets or cible not in sommets:
        raise ValueError('Source ou cible inconnue')
    arcs = _aretes(champs['ARCS'], sommets, '->', True, True)
    if any(poids <= 0 for _, _, poids in arcs):
        raise ValueError('Poids non strictement positif hors du domaine du banc')
    voisins = {sommet: [] for sommet in sommets}
    for depart, arrivee, poids in arcs:
        voisins[depart].append((arrivee, poids))
    distances = {sommet: None for sommet in sommets}
    chemins = {sommet: [] for sommet in sommets}

    def parcourir(courant, cout, chemin):
        minimum = distances[courant]
        if minimum is None or cout < minimum:
            distances[courant] = cout
            chemins[courant] = [chemin]
        elif cout == minimum:
            chemins[courant].append(chemin)
        for voisin, poids in voisins[courant]:
            if voisin not in chemin:
                parcourir(voisin, cout + poids, chemin + (voisin,))

    parcourir(source, 0, (source,))
    if distances[cible] is not None and len(chemins[cible]) != 1:
        raise ValueError('Plusieurs chemins minimaux : départage non spécifié')
    parties = []
    for sommet in sorted(sommets):
        distance = distances[sommet]
        parties.append(f"{sommet}={'inf' if distance is None else distance}")
    if distances[cible] is None:
        trajet = f'CHEMIN vers {cible}: AUCUN'
    else:
        trajet = f"CHEMIN vers {cible}: {' -> '.join(chemins[cible][0])} (distance: {distances[cible]})"
    return f"DIJKSTRA: nom={champs['nom']} | SOURCE: {source}\nDISTANCES: {', '.join(parties)}\n{trajet}"


def _analyse(ligne):
    champs = _champs(ligne, 'ANALYSE', {'nom', 'SOURCE', 'SOMMETS', 'ARCS'})
    sommets = _sommets(champs['SOMMETS'])
    source = champs['SOURCE']
    if source not in sommets:
        raise ValueError('Source inconnue')
    arcs = _aretes(champs['ARCS'], sommets, '->', True, True)
    voisins = {sommet: [] for sommet in sommets}
    for depart, arrivee, poids in arcs:
        voisins[depart].append((arrivee, poids))
    connexions = {sommet: {voisin for voisin, _ in voisins[sommet]} for sommet in sommets}
    accessibles = _accessibles(connexions, source)

    def cycle_negatif(depart, courant, visites, total):
        for voisin, poids in voisins[courant]:
            cumul = total + poids
            if voisin == depart and cumul < 0:
                return True
            if voisin not in visites and cycle_negatif(depart, voisin, visites | {voisin}, cumul):
                return True
        return False

    negatif = any(poids < 0 for _, _, poids in arcs)
    cycle = any(cycle_negatif(sommet, sommet, {sommet}, 0) for sommet in accessibles)
    return (f"ANALYSE: nom={champs['nom']} | POIDS_NEGATIFS: {'OUI' if negatif else 'NON'}"
            f" | DIJKSTRA_APPLICABLE: {'NON' if negatif else 'OUI'}"
            f" | CYCLE_ABSORBANT: {'OUI' if cycle else 'NON'}")


def _escalier(ligne):
    champs = _champs(ligne, 'ESCALIER', {'nom', 'N', 'PAS'})
    hauteur = _entier(champs['N'])
    pas = [_entier(element) for element in _elements(champs['PAS'])]
    if not 0 <= hauteur <= 14 or not 1 <= len(pas) <= 4:
        raise ValueError('Escalier hors du domaine contrôlé')
    if any(longueur <= 0 for longueur in pas) or len(pas) != len(set(pas)):
        raise ValueError('Pas invalides ou répétés')
    nombres = []
    for marche in range(hauteur + 1):
        nombre = 0
        bornes = [range(marche // longueur + 1) for longueur in pas]
        for effectifs in product(*bornes):
            if sum(effectif * longueur for effectif, longueur in zip(effectifs, pas)) == marche:
                permutations = factorial(sum(effectifs))
                for effectif in effectifs:
                    permutations //= factorial(effectif)
                nombre += permutations
        nombres.append(nombre)
    table = ', '.join(str(nombre) for nombre in nombres)
    return f"ESCALIER: nom={champs['nom']} | N={hauteur} -> COMBINAISONS: {nombres[-1]} | TABLE_DP: {table}"


def _sac(ligne):
    champs = _champs(ligne, 'KNAPSACK', {'nom', 'CAPACITE', 'OBJETS'})
    capacite = _entier(champs['CAPACITE'])
    objets = []
    for element in _elements(champs['OBJETS']):
        morceaux = element.split(':')
        if len(morceaux) != 3:
            raise ValueError('Objet invalide')
        nom, poids, valeur = _nom(morceaux[0]), _entier(morceaux[1]), _entier(morceaux[2])
        if not re.fullmatch(r'[a-z]+', nom) or poids <= 0 or valeur < 0:
            raise ValueError('Nom, poids ou valeur hors du domaine contrôlé')
        objets.append((nom, poids, valeur))
    if capacite < 0 or not 1 <= len(objets) <= 16 or len({objet[0] for objet in objets}) != len(objets):
        raise ValueError('Capacité ou liste d’objets invalide')
    meilleur = None
    for choix in product((0, 1), repeat=len(objets)):
        poids = sum(objet[1] * retenu for objet, retenu in zip(objets, choix))
        if poids > capacite:
            continue
        valeur = sum(objet[2] * retenu for objet, retenu in zip(objets, choix))
        cle = (-valeur, tuple(reversed(choix)))
        if meilleur is None or cle < meilleur[0]:
            meilleur = (cle, choix, poids, valeur)
    _, choix, poids, valeur = meilleur
    selection = sorted(objet[0] for objet, retenu in zip(objets, choix) if retenu)
    noms = ', '.join(selection) if selection else 'AUCUN'
    return (f"KNAPSACK: nom={champs['nom']} | CAPACITE: {capacite} | VALEUR_MAX: {valeur}"
            f" | OBJETS: {noms} | POIDS_TOTAL: {poids}")


def _lcs(ligne):
    champs = _champs(ligne, 'LCS', {'nom', 'S1', 'S2'})
    premiere, seconde = champs['S1'], champs['S2']
    if not 1 <= len(premiere) <= 12 or not 1 <= len(seconde) <= 12:
        raise ValueError('Chaîne vide ou trop longue pour ce contrôle')

    @lru_cache(maxsize=None)
    def sous_sequences(texte):
        return {''.join(texte[indice] for indice in indices)
                for taille in range(len(texte) + 1)
                for indices in combinations(range(len(texte)), taille)}

    def longueur(haut, gauche):
        communes = sous_sequences(premiere[:haut]) & sous_sequences(seconde[:gauche])
        return max(map(len, communes))

    indice_premier, indice_second = len(premiere), len(seconde)
    resultat = []
    while indice_premier and indice_second:
        if premiere[indice_premier - 1] == seconde[indice_second - 1]:
            resultat.append(premiere[indice_premier - 1])
            indice_premier -= 1
            indice_second -= 1
        elif longueur(indice_premier - 1, indice_second) >= longueur(indice_premier, indice_second - 1):
            indice_premier -= 1
        else:
            indice_second -= 1
    sequence = ''.join(reversed(resultat))
    return f"LCS: nom={champs['nom']} | LONGUEUR: {len(sequence)} | SEQUENCE: {sequence or 'VIDE'}"


def calculer(identifiant, entree):
    traitements = {
        'al3-c4-e1': _representation,
        'al3-c4-e2': _bfs,
        'al3-c4-e3': _kruskal,
        'al3-c5-e1': _relaxation,
        'al3-c5-e2': _dijkstra,
        'al3-c5-e3': _analyse,
        'al3-c6-e1': _escalier,
        'al3-c6-e2': _sac,
        'al3-c6-e3': _lcs,
    }
    if identifiant not in traitements:
        raise ValueError('Oracle algorithmique B3 non disponible')
    lignes = [ligne.strip() for ligne in entree.splitlines() if ligne.strip()]
    if not lignes:
        raise ValueError('Entrée vide')
    return '\n'.join(traitements[identifiant](ligne) for ligne in lignes)
