"""Oracle distinct des corrigés des exercices shell Linux B1.

Les cas se limitent aux mots sans espaces, aux comptes et chemins non vides,
aux droits ordinaires et aux entiers décimaux indiqués. Les créations répétées
de chemins ou de groupes ne sont pas évaluées. Pour les comptes, les cas ne
créent pas de nouvel utilisateur après une suppression : la réutilisation d'un
UID libéré n'est pas suffisamment précise dans l'énoncé.
"""

import re
from collections import Counter


def _compte(entree, zeros_initiaux=False):
    lignes = entree.splitlines()
    motif = r'[0-9]+' if zeros_initiaux else r'0|[1-9][0-9]*'
    if not lignes or not re.fullmatch(motif, lignes[0]):
        raise ValueError('Nombre de lignes non défini')
    if len(lignes) != int(lignes[0]) + 1:
        raise ValueError('Nombre de lignes incohérent')
    return lignes[1:]


def _couples(lignes, longueur):
    champs = [ligne.split() for ligne in lignes]
    if any(len(champ) != longueur for champ in champs):
        raise ValueError('Nombre de champs incohérent')
    return champs


def _droits(texte, avec_type=False):
    motif = r'[-d]?(?:[r-][w-][x-]){3}' if avec_type else r'(?:[r-][w-][x-]){3}'
    if not re.fullmatch(motif, texte) or (avec_type and len(texte) != 10):
        raise ValueError('Droits ordinaires requis')
    return texte


def _taille(texte):
    match = re.fullmatch(r'(0|[1-9][0-9]*)([KM]?)', texte)
    if not match:
        raise ValueError('Taille non définie')
    return int(match[1]) * {'': 1, 'K': 1024, 'M': 1024 * 1024}[match[2]]


def calculer(identifiant, entree):
    if identifiant == 'lx-c1-e2':
        chemins = entree.splitlines()
        roles = {'/home': 'repertoires personnels', '/tmp': 'fichiers temporaires',
                 '/etc': 'configuration', '/var': 'donnees variables',
                 '/bin': 'binaires essentiels', '/usr': 'applications et librairies',
                 '/root': 'repertoire de root', '/dev': 'fichiers de peripheriques'}
        if not chemins or any(not chemin or ' ' in chemin for chemin in chemins):
            raise ValueError('Chemin non défini')
        return '\n'.join(roles.get(chemin, 'inconnu') for chemin in chemins)

    if identifiant == 'lx-c1-e3':
        lignes = _compte(entree)
        fichiers = []
        sortie = []
        for ligne in lignes:
            champs = ligne.split()
            if champs == ['ls']:
                sortie.extend(f'{type_fichier}: {nom}' for type_fichier, nom in fichiers)
            elif len(champs) == 2 and champs[0] in {'mkdir', 'touch'}:
                if any(nom == champs[1] for _, nom in fichiers):
                    raise ValueError('Création répétée hors domaine')
                fichiers.append(('repertoire' if champs[0] == 'mkdir' else 'fichier', champs[1]))
            else:
                raise ValueError('Opération non définie')
        compteur = Counter(type_fichier for type_fichier, _ in fichiers)
        sortie.append(f'bilan : {compteur["repertoire"]} repertoire(s) {compteur["fichier"]} fichier(s)')
        return '\n'.join(sortie)

    if identifiant in {'lx-c2-e1', 'lx-c2-e2'}:
        lignes = _couples(_compte(entree), 2)
        sortie = []
        for droits, nom in lignes:
            _droits(droits, True)
            triplets = [droits[indice:indice + 3] for indice in (1, 4, 7)]
            if identifiant == 'lx-c2-e1':
                type_fichier = 'repertoire' if droits[0] == 'd' else 'fichier'
                sortie.append(f'{nom} : {type_fichier}, u={triplets[0]}, g={triplets[1]}, o={triplets[2]}')
            else:
                chiffres = ''.join(str(sum(valeur for caractere, valeur in zip(triplet, (4, 2, 1))
                                           if caractere != '-')) for triplet in triplets)
                sortie.append(f'{nom} : {chiffres}')
        return '\n'.join(sortie)

    if identifiant == 'lx-c2-e3':
        lignes = entree.splitlines()
        if not lignes or not lignes[0].isdigit():
            raise ValueError('Nombre de liens absent')
        nombre_liens = int(lignes[0])
        paires = _couples(lignes[1:1 + nombre_liens], 2)
        position = 1 + nombre_liens
        if len(lignes) <= position or not lignes[position].isdigit():
            raise ValueError('Nombre de fichiers absent')
        nombre_fichiers = int(lignes[position])
        fichiers = lignes[position + 1:position + 1 + nombre_fichiers]
        if len(lignes) != position + nombre_fichiers + 2:
            raise ValueError('Fichiers ou départ incomplets')
        liens = dict(paires)
        if len(liens) != len(paires) or set(liens).intersection(fichiers):
            raise ValueError('Tables ambiguës')
        courant = lignes[-1]
        sauts = 0
        while courant in liens:
            sauts += 1
            if sauts > 100:
                return 'boucle'
            courant = liens[courant]
        return courant if courant in fichiers else 'casse'

    if identifiant == 'lx-c3-e1':
        lignes = entree.splitlines()
        if not lignes or not lignes[0].isdigit() or len(lignes) != int(lignes[0]) + 2:
            raise ValueError('Chemins ou motif incomplets')
        chemins = lignes[1:-1]
        mode, separateur, terme = lignes[-1].partition(':')
        if separateur != ':' or mode not in {'prefixe', 'suffixe', 'contient'} or not terme:
            raise ValueError('Motif non défini')
        def retient(chemin):
            nom = chemin.rsplit('/', 1)[-1]
            return {'prefixe': nom.startswith, 'suffixe': nom.endswith, 'contient': nom.__contains__}[mode](terme)
        trouves = [chemin for chemin in chemins if retient(chemin)]
        return '\n'.join(trouves + [f'trouves : {len(trouves)}'])

    if identifiant == 'lx-c3-e2':
        lignes = entree.splitlines()
        if len(lignes) < 2:
            raise ValueError('Seuil ou fichiers absents')
        seuil = _taille(lignes[0])
        fichiers = _couples(_compte('\n'.join(lignes[1:])), 2)
        retenus = [(nom, _taille(taille)) for nom, taille in fichiers if _taille(taille) > seuil]
        retenus.sort(key=lambda element: -element[1])
        return '\n'.join([f'{nom} {taille}' for nom, taille in retenus] + [f'total : {len(retenus)} fichier(s)'])

    if identifiant == 'lx-c3-e3':
        lignes = _compte(entree)
        comptes = [ligne.split(':') for ligne in lignes]
        if any(len(compte) != 4 or not compte[1].isdigit() for compte in comptes):
            raise ValueError('Compte non défini')
        humains = [compte[0] for compte in comptes if int(compte[1]) >= 1000]
        return '\n'.join([f'utilisateurs : {len(comptes)}', f'systeme : {len(comptes) - len(humains)}',
                          f'humains : {len(humains)}'] + humains)

    if identifiant == 'lx-c4-e1':
        lignes = _couples(_compte(entree), 2)
        sortie = []
        for octal, nom in lignes:
            if not re.fullmatch(r'[0-7]{3}', octal):
                raise ValueError('Octal à trois chiffres requis')
            droits = ''.join(symbole if int(chiffre) & valeur else '-'
                             for chiffre in octal for symbole, valeur in zip('rwx', (4, 2, 1)))
            sortie.append(f'{nom} : -{droits}')
        return '\n'.join(sortie)

    if identifiant == 'lx-c4-e2':
        lignes = _couples(_compte(entree), 2)
        sortie = []
        for droits, modification in lignes:
            _droits(droits)
            match = re.fullmatch(r'([ugoa]+)([+-])([rwx]{1,3})', modification)
            if not match:
                raise ValueError('Modification non définie')
            classes, action, lettres = match.groups()
            resultat = list(droits)
            for numero, classe in enumerate('ugo'):
                if 'a' not in classes and classe not in classes:
                    continue
                for position, lettre in enumerate('rwx'):
                    if lettre in lettres:
                        resultat[numero * 3 + position] = lettre if action == '+' else '-'
            sortie.append(''.join(resultat))
        return '\n'.join(sortie)

    if identifiant == 'lx-c4-e3':
        lignes = entree.splitlines()
        if len(lignes) < 2:
            raise ValueError('Droits ou demandes absents')
        droits = _droits(lignes[0])
        demandes = _couples(_compte('\n'.join(lignes[1:])), 2)
        sortie = []
        for classe, lettre in demandes:
            if classe not in 'ugo' or len(classe) != 1 or lettre not in 'rwx' or len(lettre) != 1:
                raise ValueError('Demande non définie')
            position = 'ugo'.index(classe) * 3 + 'rwx'.index(lettre)
            sortie.append('accordé' if droits[position] == lettre else 'refusé')
        return '\n'.join(sortie)

    if identifiant == 'lx-c5-e1':
        comptes = {}
        prochain = 1000
        suppression = False
        sortie = []
        for ligne in _compte(entree):
            champs = ligne.split()
            if champs == ['ls']:
                sortie.extend(f'{login}:x:{uid}:{uid}:/home/{login}:/bin/bash' for login, uid in comptes.items())
            elif len(champs) == 2 and champs[0] == 'useradd':
                if champs[1] in comptes:
                    sortie.append('existe')
                else:
                    if suppression:
                        raise ValueError('Réutilisation d’UID non évaluée')
                    comptes[champs[1]] = prochain
                    prochain += 1
            elif len(champs) == 2 and champs[0] == 'userdel':
                if champs[1] in comptes:
                    del comptes[champs[1]]
                    suppression = True
                else:
                    sortie.append('inconnu')
            else:
                raise ValueError('Opération non définie')
        return '\n'.join(sortie)

    if identifiant == 'lx-c5-e2':
        groupes = {}
        sortie = []
        for ligne in _compte(entree):
            champs = ligne.split()
            if len(champs) == 2 and champs[0] == 'groupadd':
                if champs[1] in groupes:
                    raise ValueError('Groupe répété hors domaine')
                groupes[champs[1]] = set()
            elif len(champs) == 3 and champs[0] == 'usermod':
                if champs[1] not in groupes:
                    sortie.append('groupe inconnu')
                else:
                    groupes[champs[1]].add(champs[2])
            elif len(champs) == 2 and champs[0] == 'groups':
                membres = [groupe for groupe, utilisateurs in groupes.items() if champs[1] in utilisateurs]
                sortie.append(','.join(membres) if membres else 'aucun')
            else:
                raise ValueError('Opération non définie')
        return '\n'.join(sortie)

    if identifiant == 'lx-c5-e3':
        lignes = _compte(entree, zeros_initiaux=True)
        comptes = [ligne.split(':', 1) for ligne in lignes]
        if any(len(compte) != 2 or not compte[0] for compte in comptes):
            raise ValueError('Compte non défini')
        champs_vides = [login for login, champ in comptes if not champ]
        bloques = sum(champ.startswith('!') or champ == '*' for _, champ in comptes)
        return '\n'.join([f'total : {len(comptes)}', f'mdp_bloques : {bloques}',
                          f'champs_vides : {len(champs_vides)}'] + (champs_vides or ['aucun']))

    if identifiant == 'lx-c6-e1':
        lignes = entree.splitlines()
        if len(lignes) != 1 or not lignes[0] or len(lignes[0].split()) != 1:
            raise ValueError('Un mot requis')
        return f'script : $0 est le nom du script\n{lignes[0]}\nfin'

    if identifiant == 'lx-c6-e2':
        niveaux = _compte(entree)
        if any(niveau not in {'OK', 'WARN', 'CRIT'} for niveau in niveaux):
            raise ValueError('Niveau non défini')
        compte = Counter(niveaux)
        verdict = 'alarme' if compte['CRIT'] else 'surveillance' if compte['WARN'] else 'nominal'
        return f'OK : {compte["OK"]}\nWARN : {compte["WARN"]}\nCRIT : {compte["CRIT"]}\n{verdict}'

    if identifiant == 'lx-c6-e3':
        voitures = _couples(_compte(entree), 3)
        moteurs = ('DIESEL', 'ESSENCE', 'HYBRIDE', 'ELECTRIQUE')
        if not voitures or any(moteur not in moteurs or not re.fullmatch(r'0|[1-9][0-9]*', prix)
                                for _, moteur, prix in voitures):
            raise ValueError('Parc hors domaine')
        compte = Counter(moteur for _, moteur, _ in voitures)
        maximum = max(voitures, key=lambda voiture: int(voiture[2]))
        return '\n'.join([f'{moteur} : {compte[moteur]}' for moteur in moteurs if compte[moteur]] +
                         [f'budget : {sum(int(prix) for _, _, prix in voitures)}', f'max : {maximum[0]} {maximum[2]}'])

    raise ValueError('Exercice hors de cet oracle')
