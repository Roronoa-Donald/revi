import re


def _lignes(entree):
    if not isinstance(entree, str):
        raise ValueError('Entrée textuelle requise')
    lignes = entree.splitlines()
    if not lignes or any(not ligne or ligne != ligne.strip() for ligne in lignes):
        raise ValueError('Lignes absentes ou espaces extérieurs')
    return lignes


def _entier(texte, minimum=0):
    if not re.fullmatch(r'[0-9]+', texte):
        raise ValueError('Entier décimal non négatif requis')
    valeur = int(texte, 10)
    if not minimum <= valeur <= 2_147_483_647:
        raise ValueError('Entier hors du domaine évalué')
    return valeur


def _champs(lignes, nombre):
    if len(lignes) != nombre:
        raise ValueError('Nombre de lignes incorrect')
    return lignes


def _liste(lignes, valeurs=None):
    if not lignes:
        raise ValueError('Nombre de lignes absent')
    nombre = _entier(lignes[0], minimum=1)
    if nombre > 100 or len(lignes) != nombre + 1:
        raise ValueError('Liste vide, trop longue ou incomplète')
    donnees = lignes[1:]
    if valeurs is not None and any(valeur not in valeurs for valeur in donnees):
        raise ValueError('Valeur hors du domaine énuméré')
    return donnees


def _somme(donnees):
    total = sum(_entier(valeur) for valeur in donnees)
    if total > 2_147_483_647:
        raise ValueError('Somme hors du domaine évalué')
    return total


def calculer(identifiant, entree):
    lignes = _lignes(entree)

    if identifiant == 'ws2-c1-e1':
        return f'total : {_somme(_liste(lignes))} Go'

    if identifiant == 'ws2-c1-e2':
        copies, supports, hors_site = _champs(lignes, 3)
        copies = _entier(copies)
        supports = _entier(supports)
        if hors_site not in {'oui', 'non'}:
            raise ValueError('Présence hors site non définie')
        conforme = copies >= 3 and supports >= 2 and hors_site == 'oui'
        return '3-2-1 : ' + ('conforme' if conforme else 'non conforme')

    if identifiant == 'ws2-c1-e3':
        capacite, taille = map(_entier, _champs(lignes, 2))
        return 'alerte : espace insuffisant' if taille > capacite else f'libre : {capacite - taille} Go'

    if identifiant == 'ws2-c2-e1':
        total, en_panne = map(_entier, _champs(lignes, 2))
        if total < 1 or en_panne > total:
            raise ValueError('Nombre de nœuds incohérent')
        actifs = total - en_panne
        return f'actifs : {actifs}\nservice : ' + ('maintenu' if actifs else 'interrompu')

    if identifiant == 'ws2-c2-e2':
        serveurs, requetes = map(_entier, _champs(lignes, 2))
        if not serveurs:
            raise ValueError('Au moins un serveur est requis')
        return f'charge : {requetes // serveurs} req/s'

    if identifiant == 'ws2-c2-e3':
        donnees = _liste(lignes, {'info', 'warning', 'critique'})
        critiques = donnees.count('critique')
        return f'critiques : {critiques}\netat : ' + ('alerte' if critiques else 'normal')

    if identifiant == 'ws2-c3-e1':
        total, en_ligne = map(_entier, _champs(lignes, 2))
        if total < 1 or en_ligne > total:
            raise ValueError('Nombre de nœuds incohérent')
        return 'quorum : ' + ('atteint' if en_ligne > total / 2 else 'perdu')

    if identifiant == 'ws2-c3-e2':
        donnees = _liste(lignes, {'actif', 'veille'})
        actifs = donnees.count('actif')
        type_cluster = 'active-active' if actifs == len(donnees) else 'active-passive'
        return f'actifs : {actifs}\ntype : {type_cluster}'

    if identifiant == 'ws2-c3-e3':
        requetes, serveurs = map(_entier, _champs(lignes, 2))
        if not serveurs:
            raise ValueError('Au moins un serveur est requis')
        quotient, reste = divmod(requetes, serveurs)
        return f'par serveur : {quotient}\nnon reparties : {reste}'

    if identifiant == 'ws2-c4-e1':
        donnees = _liste(lignes, {'ok', 'echec'})
        echecs = donnees.count('echec')
        return f'echecs : {echecs}\nmaintenance : ' + ('requise' if echecs else 'a jour')

    if identifiant == 'ws2-c4-e2':
        temperature = _entier(_champs(lignes, 1)[0])
        etat = ('normal' if temperature < 60 else 'chaud' if temperature < 85
                else 'danger' if temperature < 95 else 'critique')
        return f'etat : {etat}'

    if identifiant == 'ws2-c5-e1':
        type_hyperviseur, produit = _champs(lignes, 2)
        if type_hyperviseur not in {'1', '2'}:
            raise ValueError('Type d’hyperviseur non défini')
        mode = 'bare-metal' if type_hyperviseur == '1' else 'heberge'
        return f'produit : {produit} ({mode})'

    if identifiant == 'ws2-c5-e2':
        mode = _champs(lignes, 1)[0]
        connexions = {
            'nat': ('oui', 'non'),
            'bridge': ('oui', 'oui'),
            'host-only': ('non', 'non'),
        }
        if mode not in connexions:
            raise ValueError('Mode hors des valeurs énumérées par l’énoncé')
        internet, lan = connexions[mode]
        return f'internet : {internet}\nlan : {lan}'

    if identifiant == 'ws2-c5-e3':
        vcpu, coeurs = map(_entier, _champs(lignes, 2))
        exces = max(0, vcpu - coeurs)
        return f'surallocation : {"oui" if exces else "non"}\nvcpu en exces : {exces}'

    if identifiant == 'ws2-c6-e1':
        age = _entier(_champs(lignes, 1)[0])
        return 'snapshot : ' + ('a purger' if age > 7 else 'conserve')

    if identifiant == 'ws2-c6-e2':
        type_clone, source_supprimee = _champs(lignes, 2)
        if type_clone not in {'complet', 'lie'} or source_supprimee not in {'oui', 'non'}:
            raise ValueError('Type ou état de la source non défini')
        indisponible = type_clone == 'lie' and source_supprimee == 'oui'
        return 'clone : ' + ('hors service' if indisponible else 'fonctionne')

    if identifiant == 'ws2-c6-e3':
        if not lignes:
            raise ValueError('Capacité absente')
        capacite = _entier(lignes[0])
        total = _somme(_liste(lignes[1:]))
        etat = 'planifiee' if total <= capacite else 'capacite insuffisante'
        return f'total : {total} Go\nsauvegarde : {etat}'

    raise ValueError('Oracle non disponible')
