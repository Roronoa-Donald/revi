"""Oracles indépendants pour les chapitres 1 à 3 d'algorithmique B3.

Les entrées des fixtures suivent les formats des énoncés et le codec « lignes ».
Ce codec ne suffit pas, à lui seul, à établir une nouveauté sémantique.
Les déclarations vides, mal formées ou hors du domaine ci-dessous sont refusées.

Le calculateur de complexité est borné à N <= 1 000 000 et, pour 2^N,
à N <= 128. Les paramètres du théorème maître sont entiers. Les cas non
exactement égaux à proximité de la tolérance 10^-5 sont refusés : l'ordre des
conditions de l'énoncé y est ambigu. Une égalité exacte a = b^d est acceptée.
La profondeur d'une récursion est N, conformément à l'énoncé, même pour
l'arbre de Fibonacci ; elle ne prétend pas mesurer une pile Python réelle.

Les arbres doivent être non vides, connexes, sans cycle ni nœud partagé.
Pour les recherches, une comparaison désigne un nœud visité, comme dans les
exemples. Pour la suppression, les clés sont distinctes et la cible positive
ou nulle ; l'infixe seul ne permet pas de prouver le choix du successeur.
Pour l'entassement et le tri, les éléments présents simultanément doivent être
distincts : le départage d'enfants égaux n'est pas précisé par l'énoncé.
Les tableaux vides et les formats non spécifiés ne sont pas évalués.

Repères des calculs manuels des deux jeux de chaque fiche :
- c1-e1 : floor(log2(31)) = 4, 7² = 49, 8 log2(8) = 24 ; 2^6 = 64.
- c1-e2 : les exposants critiques sont 2, 3, 2, 1,5 et 0 ; leurs cas
  respectifs sont 1, 2, 3, 1 et 2.
- c1-e3 : F(8) = 21 avec 67 appels ; F(9) = 34 avec 109 appels.
- c2-e1 : l'infixe du premier arbre est -3, 6, 14, 20, 32 ; le second
  contient 18 à la fois à la racine et dans son sous-arbre droit.
- c2-e2 : les recherches visitent respectivement 3, 3, 1 puis 5, 5, 1 nœuds.
- c2-e3 : la première cible a deux enfants ; la seconde n'a que l'enfant 45.
- c3-e1 : la première violation du second tas relie les indices 1 et 4.
- c3-e2 : les échanges par commande sont 0, 0, 1, 1, 1, 0, 1 puis
  0, 1, 1, 0, 0, 0, 0 ; les extractions sont 19, 15 puis 20, 13, 6, VIDE.
- c3-e3 : les tas construits sont 9, 8, 4, 7, 5, 2 et 12, 4, 10, 3 ;
  les échanges de construction/totaux sont respectivement 2/11 et 0/5.
"""

from math import floor, log, log2


def _champs(ligne, instruction, noms):
    morceaux = ligne.split()
    if not morceaux or morceaux[0] != instruction:
        raise ValueError('Instruction inattendue')
    resultat = {}
    for morceau in morceaux[1:]:
        nom, separateur, valeur = morceau.partition('=')
        if not separateur or not nom or not valeur or nom in resultat:
            raise ValueError('Champ absent ou répété')
        resultat[nom] = valeur
    if set(resultat) != set(noms):
        raise ValueError('Champs inattendus')
    return resultat


def _entier(texte):
    if not texte or not texte.lstrip('-').isascii() or not texte.lstrip('-').isdigit():
        raise ValueError('Entier décimal invalide')
    if texte.count('-') > 1 or '-' in texte[1:]:
        raise ValueError('Entier décimal invalide')
    return int(texte)


def _liste_entiers(texte):
    valeurs = texte.split(',')
    if not valeurs or any(not valeur for valeur in valeurs):
        raise ValueError('Liste vide ou mal formée')
    return [_entier(valeur) for valeur in valeurs]


def _blocs(lignes, instruction, noms):
    position = 0
    while position < len(lignes):
        en_tete = _champs(lignes[position], instruction, noms)
        try:
            fin = lignes.index('FIN', position + 1)
        except ValueError as erreur:
            raise ValueError('Bloc sans FIN') from erreur
        yield en_tete, lignes[position + 1:fin]
        position = fin + 1


def _complexites(lignes):
    sorties = []
    for ligne in lignes:
        champs = _champs(ligne, 'ALGO', ('nom', 'CLASSE', 'N'))
        nombre = _entier(champs['N'])
        classe = champs['CLASSE']
        if nombre < 0 or nombre > 1_000_000:
            raise ValueError('Taille hors du domaine de l’oracle')
        if classe == 'O(1)':
            operations = 1
        elif classe == 'O(log_n)':
            operations = nombre.bit_length() - 1 if nombre else 0
        elif classe == 'O(n)':
            operations = nombre
        elif classe == 'O(n_log_n)':
            operations = floor(nombre * log2(nombre)) if nombre else 0
        elif classe == 'O(n2)':
            operations = nombre * nombre
        elif classe == 'O(2n)' and nombre <= 128:
            operations = 2 ** nombre
        else:
            raise ValueError('Classe inconnue ou exposant hors domaine')
        sorties.append(
            f"COMPLEXITE: {champs['nom']} | ASYMPTOTE: {classe} | "
            f'N={nombre} -> OPERATIONS: {operations}'
        )
    return '\n'.join(sorties)


def _theoreme_maitre(lignes):
    sorties = []
    for ligne in lignes:
        champs = _champs(ligne, 'RECURRENCE', ('nom', 'a', 'b', 'd'))
        branches = _entier(champs['a'])
        diviseur = _entier(champs['b'])
        degre = _entier(champs['d'])
        if branches < 1 or diviseur <= 1 or degre < 0:
            raise ValueError('Paramètres hors du théorème')
        critique = log(branches) / log(diviseur)
        ecart = critique - degre
        if branches == diviseur ** degre:
            cas = 2
            resultat = f'Theta(n^{degre} log n)' if degre else 'Theta(log n)'
        elif abs(ecart) <= 1e-5:
            raise ValueError('Comparaison à la tolérance ambiguë')
        elif ecart > 0:
            cas = 1
            resultat = f'Theta(n^{critique:.2f})'
        else:
            cas = 3
            resultat = f'Theta(n^{degre})' if degre else 'Theta(1)'
        sorties.append(
            f"MASTER: {champs['nom']} | a={branches} b={diviseur} d={degre} "
            f'(c={critique:.2f}) -> CAS {cas} : COMPLEXITE = {resultat}'
        )
    return '\n'.join(sorties)


def _fibonacci_et_appels(nombre):
    if nombre == 0:
        return 0, 1
    valeur_precedente, valeur = 0, 1
    appels_precedents, appels = 1, 1
    for rang in range(2, nombre + 1):
        valeur_precedente, valeur = valeur, valeur_precedente + valeur
        appels_precedents, appels = appels, appels_precedents + appels + 1
    return valeur, appels


def _recursions(lignes):
    sorties = []
    for ligne in lignes:
        champs = _champs(ligne, 'RECURSION', ('nom', 'TYPE', 'N', 'MAX_DEPTH'))
        nombre = _entier(champs['N'])
        limite = _entier(champs['MAX_DEPTH'])
        type_recursion = champs['TYPE']
        if nombre < 0 or limite < 0 or type_recursion not in {'LINEAIRE', 'ARBORESCENTE'}:
            raise ValueError('Récursion hors domaine')
        prefixe = f"RECURSION: {champs['nom']} | "
        if nombre > limite:
            sorties.append(
                prefixe + f'DEBORDEMENT DE PILE : Profondeur {nombre} > Limite {limite} (Stack Overflow)'
            )
            continue
        if type_recursion == 'LINEAIRE':
            valeur, appels = nombre, nombre + 1
        else:
            valeur, appels = _fibonacci_et_appels(nombre)
        sorties.append(
            prefixe + f'SUCCES : Profondeur {nombre}/{limite} | '
            f'APPELS_TOTAUX: {appels} | VALEUR: {valeur}'
        )
    return '\n'.join(sorties)


def _validation_arbres(lignes):
    sorties = []
    for en_tete, corps in _blocs(lignes, 'ARBRE', ('nom', 'RACINE')):
        noeuds = {}
        for ligne in corps:
            champs = _champs(ligne, 'NOEUD', ('id', 'val', 'g', 'd'))
            identifiant = champs['id']
            if identifiant == '-' or identifiant in noeuds:
                raise ValueError('Identifiant de nœud invalide ou répété')
            noeuds[identifiant] = (_entier(champs['val']), champs['g'], champs['d'])
        racine = en_tete['RACINE']
        if racine == '-' or racine not in noeuds:
            raise ValueError('Racine absente')
        pile = [(racine, False)]
        visites = set()
        infixe = []
        while pile:
            identifiant, traiter = pile.pop()
            if identifiant == '-':
                continue
            if identifiant not in noeuds:
                raise ValueError('Référence de nœud absente')
            valeur, gauche, droite = noeuds[identifiant]
            if traiter:
                infixe.append(valeur)
                continue
            if identifiant in visites:
                raise ValueError('Cycle ou nœud partagé')
            visites.add(identifiant)
            pile.extend(((droite, False), (identifiant, True), (gauche, False)))
        if visites != set(noeuds):
            raise ValueError('Nœud inaccessible')
        if all(gauche < droite for gauche, droite in zip(infixe, infixe[1:])):
            valeurs = ', '.join(str(valeur) for valeur in infixe)
            sorties.append(f"ABR: {en_tete['nom']} | VALIDE : OUI | INFIXE: {valeurs}")
        else:
            sorties.append(f"ABR: {en_tete['nom']} | VALIDE : NON (Violation propriete ABR)")
    return '\n'.join(sorties)


def _sous_arbre(cles, cible):
    restantes = list(dict.fromkeys(cles))
    comparaisons = 0
    while restantes:
        racine = restantes[0]
        comparaisons += 1
        if cible == racine:
            return restantes, comparaisons
        if cible < racine:
            restantes = [valeur for valeur in restantes[1:] if valeur < racine]
        else:
            restantes = [valeur for valeur in restantes[1:] if valeur > racine]
    return [], comparaisons


def _recherches(lignes):
    sorties = []
    for ligne in lignes:
        champs = _champs(ligne, 'ARBRE', ('nom', 'CLES', 'RECHERCHES'))
        cles = _liste_entiers(champs['CLES'])
        for cible in _liste_entiers(champs['RECHERCHES']):
            sous_arbre, comparaisons = _sous_arbre(cles, cible)
            etat = 'TROUVE' if sous_arbre else 'NON_TROUVE'
            sorties.append(
                f"RECHERCHE: nom={champs['nom']} val={cible} -> {etat} | "
                f'COMPARAISONS: {comparaisons} | PROFONDEUR: {comparaisons - 1}'
            )
    return '\n'.join(sorties)


def _suppressions(lignes):
    sorties = []
    for ligne in lignes:
        champs = _champs(ligne, 'SUPPRESSION', ('nom', 'CLES', 'CIBLE'))
        cles = _liste_entiers(champs['CLES'])
        cible = _entier(champs['CIBLE'])
        if cible < 0 or len(set(cles)) != len(cles):
            raise ValueError('Cible ou doublons hors du domaine non ambigu')
        sous_arbre, _ = _sous_arbre(cles, cible)
        if not sous_arbre:
            cas = 'ABSENT'
        else:
            gauche = any(valeur < cible for valeur in sous_arbre[1:])
            droite = any(valeur > cible for valeur in sous_arbre[1:])
            cas = 'DEUX_ENFANTS' if gauche and droite else 'UN_ENFANT' if gauche or droite else 'FEUILLE'
        restantes = sorted(valeur for valeur in cles if valeur != cible)
        infixe = ', '.join(str(valeur) for valeur in restantes) if restantes else 'VIDE'
        sorties.append(
            f"SUPPR: nom={champs['nom']} | CIBLE: {cible} | CAS: {cas} | INFIXE_APRES: {infixe}"
        )
    return '\n'.join(sorties)


def _validation_tas(lignes):
    sorties = []
    for ligne in lignes:
        champs = _champs(ligne, 'TAS', ('nom', 'VALEURS'))
        valeurs = _liste_entiers(champs['VALEURS'])
        violation = None
        for enfant in range(1, len(valeurs)):
            parent = (enfant - 1) // 2
            if valeurs[parent] < valeurs[enfant]:
                violation = (parent, enfant)
                break
        if violation is None:
            sorties.append(
                f"TAS_MAX: {champs['nom']} | VALIDE : OUI | TAILLE: {len(valeurs)} | RACINE: {valeurs[0]}"
            )
        else:
            parent, enfant = violation
            sorties.append(
                f"TAS_MAX: {champs['nom']} | VALIDE : NON | VIOLATION: "
                f'index={parent} (pere={valeurs[parent]}) < fils={valeurs[enfant]} (index={enfant})'
            )
    return '\n'.join(sorties)


def _monter(tas, indice):
    if indice == 0:
        return 0
    parent = (indice - 1) // 2
    if tas[indice] <= tas[parent]:
        return 0
    tas[indice], tas[parent] = tas[parent], tas[indice]
    return 1 + _monter(tas, parent)


def _descendre(tas, indice, taille):
    enfants = [enfant for enfant in (2 * indice + 1, 2 * indice + 2) if enfant < taille]
    if not enfants:
        return 0
    plus_grand = max(enfants, key=lambda enfant: tas[enfant])
    if tas[indice] >= tas[plus_grand]:
        return 0
    tas[indice], tas[plus_grand] = tas[plus_grand], tas[indice]
    return 1 + _descendre(tas, plus_grand, taille)


def _etat_tas(tas):
    return ', '.join(str(valeur) for valeur in tas) if tas else 'VIDE'


def _file_priorite(lignes):
    sorties = []
    for en_tete, corps in _blocs(lignes, 'SEQUENCE', ('nom',)):
        tas = []
        for ligne in corps:
            morceaux = ligne.split()
            if len(morceaux) == 2 and morceaux[0] == 'INSERT':
                valeur = _entier(morceaux[1])
                if valeur in tas:
                    raise ValueError('Égalité dans le tas non évaluée')
                tas.append(valeur)
                echanges = _monter(tas, len(tas) - 1)
                sorties.append(f'INSERT {valeur} -> SWAPS: {echanges} | TAS: {_etat_tas(tas)}')
            elif morceaux == ['EXTRACT_MAX']:
                if not tas:
                    sorties.append('EXTRACT_MAX -> EXTRAIT: VIDE | SWAPS: 0 | TAS: VIDE')
                    continue
                extrait = tas[0]
                dernier = tas.pop()
                echanges = 0
                if tas:
                    tas[0] = dernier
                    echanges = _descendre(tas, 0, len(tas))
                sorties.append(
                    f'EXTRACT_MAX -> EXTRAIT: {extrait} | SWAPS: {echanges} | TAS: {_etat_tas(tas)}'
                )
            else:
                raise ValueError('Commande de file inconnue')
        sorties.append(f"BILAN: nom={en_tete['nom']} | TAILLE: {len(tas)}")
    return '\n'.join(sorties)


def _tri_par_tas(lignes):
    sorties = []
    for ligne in lignes:
        champs = _champs(ligne, 'HEAPSORT', ('nom', 'VALEURS'))
        tas = _liste_entiers(champs['VALEURS'])
        if len(set(tas)) != len(tas):
            raise ValueError('Égalité dans le tas non évaluée')
        ordre_attendu = sorted(tas)
        echanges_construction = sum(_descendre(tas, indice, len(tas)) for indice in reversed(range(len(tas) // 2)))
        heapify = _etat_tas(tas)
        echanges_totaux = echanges_construction
        for taille in range(len(tas) - 1, 0, -1):
            tas[0], tas[taille] = tas[taille], tas[0]
            echanges_totaux += 1 + _descendre(tas, 0, taille)
        if tas != ordre_attendu:
            raise ValueError('Invariant de tri non vérifié')
        sorties.append(
            f"HEAPSORT: nom={champs['nom']} | HEAPIFY: {heapify} | "
            f'SWAPS_HEAPIFY: {echanges_construction} | TRIE: {_etat_tas(tas)} | SWAPS_TOTAUX: {echanges_totaux}'
        )
    return '\n'.join(sorties)


def calculer(identifiant, entree):
    fonctions = {
        'al3-c1-e1': _complexites,
        'al3-c1-e2': _theoreme_maitre,
        'al3-c1-e3': _recursions,
        'al3-c2-e1': _validation_arbres,
        'al3-c2-e2': _recherches,
        'al3-c2-e3': _suppressions,
        'al3-c3-e1': _validation_tas,
        'al3-c3-e2': _file_priorite,
        'al3-c3-e3': _tri_par_tas,
    }
    if identifiant not in fonctions or not isinstance(entree, str):
        raise ValueError('Oracle ou entrée non disponible')
    lignes = [ligne.strip() for ligne in entree.splitlines() if ligne.strip()]
    if not lignes:
        raise ValueError('Entrée vide non évaluée')
    return fonctions[identifiant](lignes)
