import json
import re


def calculer(identifiant, entree):
    lignes = entree.strip().splitlines()
    if identifiant == 'rx2-c1-e3':
        titre, message, auteur = [ligne.strip() for ligne in lignes]
        return '\n'.join(['<App>', f'  <Header title="{titre}" />', f'  <Content message="{message}" />', f'  <Footer author="{auteur}" />', '</App>'])
    if identifiant == 'rx2-c2-e1':
        valeurs = lignes[0].split()
        role = valeurs[1] if len(valeurs) > 1 and valeurs[1] != '-' else 'invite'
        return f'Utilisateur : {valeurs[0]} | Role : {role}'
    if identifiant == 'rx2-c2-e2':
        variante, texte = [ligne.strip() for ligne in lignes]
        return f'<div class="card card-{variante}"><p>{texte}</p></div>'
    if identifiant == 'rx2-c2-e3':
        props = dict(paire.split('=', 1) for paire in lignes[0].split() if '=' in paire)
        return 'Props filtrees : ' + ' '.join(f'{cle}={props.get(cle) or "none"}' for cle in ('id', 'theme', 'active'))
    if identifiant == 'rx2-c3-e1':
        valeur = int(lignes[0])
        for action in lignes[1].split():
            valeur = 0 if action == 'RESET' else valeur + {'INC': 1, 'DEC': -1}.get(action, 0)
        return f'Etat final : {valeur}'
    if identifiant == 'rx2-c3-e2':
        valeur = lignes[0].strip()
        valide = len(valeur) >= 8 and re.search('[0-9]', valeur) is not None
        return 'Statut : ' + ('VALIDE' if valide else 'INVALIDE')
    if identifiant == 'rx2-c3-e3':
        articles = [article.strip() for article in lignes[0].split(',') if article.strip()]
        action, cible = lignes[1].split(' ', 1)
        if action == 'AJOUTER':
            articles = articles + [cible]
        elif action == 'SUPPRIMER':
            articles = [article for article in articles if article != cible]
        return ','.join(articles) or '(vide)'
    if identifiant == 'rx2-c4-e1':
        elements = [element.strip().split(':', 1) for element in lignes[0].split(',') if element.strip()]
        return '\n'.join(f'<li key="{cle}">{libelle}</li>' for cle, libelle in elements)
    if identifiant == 'rx2-c4-e2':
        mot = lignes[0].strip().lower()
        trouves = [element.strip() for element in lignes[1].split(',') if mot in element.strip().lower()]
        return ','.join(trouves) or 'Aucun resultat'
    if identifiant == 'rx2-c4-e3':
        actif, valeur = lignes[0].split()
        return f'<span class="badge">{int(valeur)}</span>' if actif == '1' and int(valeur) > 0 else '(aucun)'
    if identifiant == 'rx2-c5-e1':
        return 'EFFET IGNORE' if lignes[0].split() == lignes[1].split() else 'EFFET DECLENCHE'
    if identifiant == 'rx2-c5-e2':
        etat, *donnee = lignes[0].split()
        texte = ' '.join(donnee)
        sorties = {'LOADING': '<Spinner label="Chargement en cours..." />',
                   'SUCCESS': f'<DataView result="{texte}" />', 'ERROR': f'<AlertError message="{texte}" />'}
        return sorties[etat]
    if identifiant == 'rx2-c5-e3':
        sorties = {'MOUNT': 'Timer demarre', 'TICK': 'Tick horloge', 'UNMOUNT': 'Timer nettoye'}
        return '\n'.join(sorties[element.strip()] for element in lignes[0].split(',') if element.strip())
    if identifiant == 'rx2-c6-e1':
        modele, url = ([segment for segment in ligne.strip().split('/') if segment] for ligne in lignes)
        parametres = {mot[1:]: valeur for mot, valeur in zip(modele, url) if mot.startswith(':')} if len(modele) == len(url) else {}
        return json.dumps(parametres, ensure_ascii=False, separators=(',', ':'))
    if identifiant == 'rx2-c6-e2':
        authentifie, composant = lignes[0].split()
        return f'<{composant} />' if authentifie == '1' else '<Navigate to="/login" replace />'
    if identifiant == 'rx2-c6-e3':
        total = int(lignes[0])
        for action in lignes[1].split():
            operation, valeur = action.split(':')
            total = total + int(valeur) if operation == 'AJOUT' else max(0, total - int(valeur))
        return f'Total panier : {total}'
    raise ValueError('Identifiant React hors périmètre')
