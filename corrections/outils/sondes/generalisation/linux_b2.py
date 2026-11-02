"""Oracle indépendant pour les exercices shell Linux B2.

Le domaine de ce banc est volontairement restreint : n est positif, les
enregistrements sont complets et les noms sont des mots sans espaces, sauf
les messages des journaux. Les entiers sont décimaux, sans signe plus ni
zéro initial, et dans les bornes signées 64 bits ; la somme l'est aussi.
Les permissions sont les neuf caractères ordinaires rwx/-, sans bits spéciaux.
Pour l'annuaire, seuls rd, sam et ada sont admis comme utilisateurs.
Les cibles SSH utilisent un seul @ et un seul :, sans IPv6 ; leur port est
un texte décimal, sans prétention à vérifier la connectivité ou sa plage.
Les horaires sont compris entre 0:00 et 23:59. Les IPv4 comportant un zéro
initial dans un octet sont non évaluées ; sinon la validation suit le critère
à quatre champs numériques de l'énoncé. Pour le classement, « publique »
signifie seulement hors des trois plages privées indiquées, et ne garantit
ni routabilité ni exposition sur Internet.
Les cas ambigus ou hors de ce domaine lèvent ValueError et ne sont pas évalués.
"""

import re
from collections import Counter


def _lignes(entree):
    if not isinstance(entree, str):
        raise ValueError('Entrée textuelle requise')
    lignes = entree.splitlines()
    if not lignes or not re.fullmatch(r'[1-9][0-9]*', lignes[0]):
        raise ValueError('Nombre de lignes positif requis')
    donnees = lignes[1:]
    if len(donnees) != int(lignes[0]) or any(not ligne or ligne != ligne.strip() for ligne in donnees):
        raise ValueError('Enregistrements incomplets ou espaces extérieurs')
    return donnees


def _mot(texte):
    if len(texte.split()) != 1:
        raise ValueError('Un mot sans espaces est requis')
    return texte


def _champs(ligne, nombre):
    champs = ligne.split()
    if len(champs) != nombre:
        raise ValueError('Nombre de champs incorrect')
    return champs


def _entier(texte):
    if not re.fullmatch(r'0|-?[1-9][0-9]*', texte):
        raise ValueError('Entier décimal non ambigu requis')
    valeur = int(texte)
    if not -(2 ** 63) <= valeur < 2 ** 63:
        raise ValueError('Entier hors des bornes signées 64 bits')
    return valeur


def _permission(texte):
    if not re.fullmatch(r'(?:[r-][w-][x-]){3}', texte):
        raise ValueError('Permission ordinaire à neuf caractères requise')
    return texte


def _ipv4_valide(adresse):
    octets = adresse.split('.')
    if any(re.fullmatch(r'0[0-9]+', octet) for octet in octets):
        raise ValueError('IPv4 à zéro initial non évaluée')
    return len(octets) == 4 and all(
        re.fullmatch(r'[0-9]+', octet) and int(octet) <= 255 for octet in octets
    )


def calculer(identifiant, entree):
    lignes = _lignes(entree)
    if identifiant == 'lx2-c1-e1':
        chemins = [_mot(ligne) for ligne in lignes]
        absolus = [chemin.startswith('/') for chemin in chemins]
        resultat = [f'{chemin} : {"absolu" if absolu else "relatif"}'
                    for chemin, absolu in zip(chemins, absolus)]
        return '\n'.join(resultat + [f'absolus : {sum(absolus)}'])

    if identifiant == 'lx2-c1-e2':
        types = [_champs(ligne, 2)[1] for ligne in lignes]
        if any(type_entree not in {'fichier', 'repertoire', 'lien'} for type_entree in types):
            raise ValueError('Type d’entrée non défini')
        comptes = Counter(types)
        return f'fichiers : {comptes["fichier"]}\nrepertoires : {comptes["repertoire"]}\nliens : {comptes["lien"]}'

    if identifiant == 'lx2-c1-e3':
        chemins = [_champs(ligne, 2) for ligne in lignes]
        return '\n'.join(repertoire + ('' if repertoire.endswith('/') else '/') + nom
                         for repertoire, nom in chemins)

    if identifiant == 'lx2-c2-e1':
        operations = [_champs(ligne, 3) for ligne in lignes]
        libelles = {'cp': 'copie', 'mv': 'deplacement'}
        if any(operation not in libelles for operation, _, _ in operations):
            raise ValueError('Opération non définie')
        comptes = Counter(operation for operation, _, _ in operations)
        resultat = [f'{libelles[operation]} {source} vers {cible}'
                    for operation, source, cible in operations]
        return '\n'.join(resultat + [f'copies : {comptes["cp"]}', f'deplacements : {comptes["mv"]}'])

    if identifiant == 'lx2-c2-e2':
        fichiers = [_mot(ligne) for ligne in lignes]
        scripts = [fichier for fichier in fichiers if fichier.endswith('.sh')]
        return '\n'.join(scripts + [f'scripts : {len(scripts)}'])

    if identifiant == 'lx2-c2-e3':
        niveaux = []
        for ligne in lignes:
            parties = ligne.split(maxsplit=1)
            if len(parties) != 2 or parties[0] not in {'INFO', 'WARN', 'ERROR'}:
                raise ValueError('Ligne de journal non définie')
            niveaux.append(parties[0])
        return f'erreurs : {niveaux.count("ERROR")}'

    if identifiant == 'lx2-c3-e1':
        permissions = [_permission(_mot(ligne)) for ligne in lignes]
        octaux = [''.join(str(int(''.join('0' if caractere == '-' else '1'
                                          for caractere in permission[position:position + 3]), 2))
                          for position in (0, 3, 6)) for permission in permissions]
        return '\n'.join(f'permission : {octal}' for octal in octaux)

    if identifiant == 'lx2-c3-e2':
        positions = {'lire': 0, 'ecrire': 1, 'executer': 2}
        resultat = []
        for ligne in lignes:
            permission, action = _champs(ligne, 2)
            _permission(permission)
            if action not in positions:
                raise ValueError('Action non définie')
            droit = 'oui' if permission[positions[action]] != '-' else 'non'
            resultat.append(f'droit : {droit}')
        return '\n'.join(resultat)

    if identifiant == 'lx2-c3-e3':
        annuaire = {'rd': 'it', 'sam': 'dev', 'ada': 'admin'}
        resultat = []
        for ligne in lignes:
            utilisateur, groupe = _champs(ligne, 2)
            if utilisateur not in annuaire:
                raise ValueError('Utilisateur hors de l’annuaire défini')
            appartenance = 'membre' if annuaire[utilisateur] == groupe else 'non membre'
            resultat.append(f'{utilisateur} : {appartenance}')
        return '\n'.join(resultat)

    if identifiant == 'lx2-c4-e1':
        adresses = [_mot(ligne) for ligne in lignes]
        return '\n'.join(f'ip : {"valide" if _ipv4_valide(adresse) else "invalide"}'
                         for adresse in adresses)

    if identifiant == 'lx2-c4-e2':
        resultat = []
        for ligne in lignes:
            adresse = _mot(ligne)
            octets = adresse.split('.')
            if not _ipv4_valide(adresse):
                raise ValueError('IPv4 canonique requise pour le classement')
            premier, deuxieme = (int(octet) for octet in octets[:2])
            privee = premier == 10 or (premier == 192 and deuxieme == 168) or (
                premier == 172 and 16 <= deuxieme <= 31
            )
            resultat.append(f'classe : {"privee" if privee else "publique"}')
        return '\n'.join(resultat)

    if identifiant == 'lx2-c4-e3':
        resultat = []
        for ligne in lignes:
            cible = _mot(ligne)
            if not re.fullmatch(r'[A-Za-z0-9._-]+@[A-Za-z0-9._-]+:[0-9]+', cible):
                raise ValueError('Cible SSH hors du format simple étudié')
            utilisateur, reste = cible.split('@')
            hote, port = reste.split(':')
            resultat.extend((f'utilisateur : {utilisateur}', f'hote : {hote}', f'port : {port}'))
        return '\n'.join(resultat)

    if identifiant in {'lx2-c5-e1', 'lx2-c5-e2'}:
        valeurs = [_entier(_mot(ligne)) for ligne in lignes]
        if identifiant == 'lx2-c5-e2':
            return f'max : {max(valeurs)}'
        somme = sum(valeurs)
        if not -(2 ** 63) <= somme < 2 ** 63:
            raise ValueError('Somme hors des bornes signées 64 bits')
        return f'somme : {somme}'

    if identifiant == 'lx2-c5-e3':
        resultat = []
        gros = 0
        for ligne in lignes:
            nom, texte_taille = _champs(ligne, 2)
            taille = _entier(texte_taille)
            if taille < 0:
                raise ValueError('Taille négative non évaluée')
            est_gros = taille >= 1024
            gros += est_gros
            resultat.append(f'{nom} : {"gros" if est_gros else "petit"}')
        return '\n'.join(resultat + [f'gros : {gros}'])

    if identifiant == 'lx2-c6-e1':
        actions = {'active': 'rien a faire', 'inactive': 'demarrer', 'failed': 'redemarrer'}
        resultat = []
        alertes = 0
        for ligne in lignes:
            service, etat = _champs(ligne, 2)
            if etat not in actions:
                raise ValueError('État de service non défini')
            resultat.append(f'{service} : {actions[etat]}')
            alertes += etat != 'active'
        return '\n'.join(resultat + [f'alertes : {alertes}'])

    if identifiant == 'lx2-c6-e2':
        actions = {'running': 'actif', 'sleeping': 'en attente', 'zombie': 'a nettoyer'}
        resultat = []
        zombies = 0
        for ligne in lignes:
            pid, etat = _champs(ligne, 2)
            if _entier(pid) <= 0 or etat not in actions:
                raise ValueError('Processus hors du domaine étudié')
            resultat.append(f'{pid} : {actions[etat]}')
            zombies += etat == 'zombie'
        return '\n'.join(resultat + [f'zombies : {zombies}'])

    if identifiant == 'lx2-c6-e3':
        resultat = []
        matin = 0
        for ligne in lignes:
            texte_heure, texte_minute, tache = _champs(ligne, 3)
            heure, minute = _entier(texte_heure), _entier(texte_minute)
            if not 0 <= heure <= 23 or not 0 <= minute <= 59:
                raise ValueError('Horaire hors du domaine étudié')
            est_matin = heure < 12
            matin += est_matin
            resultat.append(f'{tache} : {"matin" if est_matin else "apres-midi"}')
        return '\n'.join(resultat + [f'matin : {matin}'])

    raise ValueError('Oracle Linux B2 non disponible')
