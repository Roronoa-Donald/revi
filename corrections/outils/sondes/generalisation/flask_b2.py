"""Oracles paramétriques pour des exercices Flask B2.

Le manifeste associé omet fl2-c1-e1 : ses deux cas figurent déjà dans
cas.json. Il omet aussi fl2-c4-e1 : les huit scénarios spécifiés sont déjà
présents dans l'exemple ou les tests et le comportement hors liste n'est pas
défini. Cette dernière fiche reste donc non évaluée sur des entrées inédites.

Les codecs du manifeste sont ceux du banc existant. Ils ne détectent pas
toutes les équivalences sémantiques, notamment dans les objets JSON ; les
nouveaux cas ont été choisis avec des valeurs et structures distinctes.
L'URL de la query string est limitée ici à des clés et valeurs non vides,
non répétées et non encodées, sans fragment. Un type de média contenant
« application/json » sans être ce type exact n'est pas évalué. Le dispatch
est limité à une variable int ou string, sans URL encodée ni paramètres.
Les conversions de routes sont limitées aux entiers ASCII, aux décimaux non
signés écrits avec un point, aux chemins et aux chaînes ordinaires.

Pour fl2-c5-e2, l'énoncé exige des types exacts mais un indice accepte aussi
un entier pour un champ float : cette combinaison et les champs absents sont
refusés par l'oracle. Pour fl2-c6-e1, l'indice utilise str() alors qu'un test
compare un booléen JSON à « true » ; seuls les attributs de type chaîne ou
entier sont évalués ici. Les URI avec query string ou fragment, les variables
de route non spécifiées, les mutations d'identifiant et les identifiants
dupliqués pour une mutation sont également hors périmètre. Pour la pagination,
seules les pages et limites strictement positives et les listes d'entiers ou
de chaînes sont évaluées.

Un ValueError signifie que l'entrée n'est pas évaluée par cet oracle, et non
que le corrigé est incorrect. La réussite de ces cas ne prouve pas une
généralisation sur l'ensemble des entrées possibles.
"""

import json
import re
from urllib.parse import parse_qsl, urlsplit


def _lignes(entree, nombre):
    lignes = entree.replace('\r\n', '\n').replace('\r', '\n').splitlines()
    if len(lignes) != nombre:
        raise ValueError('Nombre de lignes non pris en charge')
    return [ligne.strip() for ligne in lignes]


def _objet(texte):
    objet = json.loads(texte)
    if not isinstance(objet, dict):
        raise ValueError('Un objet JSON est requis')
    return objet


def _collection(texte):
    collection = json.loads(texte)
    if not isinstance(collection, list) or any(not isinstance(element, dict) for element in collection):
        raise ValueError('Un tableau JSON d’objets est requis')
    return collection


def _parametres(entree):
    ligne, = _lignes(entree, 1)
    url = urlsplit(ligne)
    if not url.scheme or not url.netloc or url.fragment or '%' in url.query or '+' in url.query:
        raise ValueError('URL ou encodage hors du domaine vérifié')
    if not url.query:
        return 'Aucun parametre'
    paires = parse_qsl(url.query, keep_blank_values=True, strict_parsing=True)
    cles = [cle for cle, valeur in paires]
    if any(not cle or not valeur for cle, valeur in paires) or len(cles) != len(set(cles)):
        raise ValueError('Paramètres vides ou répétés hors du domaine vérifié')
    return '\n'.join(f'{cle}={valeur}' for cle, valeur in sorted(paires))


def _entetes(entree):
    pris_en_charge = False
    for ligne in entree.splitlines():
        if not ligne.strip():
            continue
        nom, separateur, valeur = ligne.partition(':')
        if not separateur or not nom.strip():
            raise ValueError('En-tête invalide')
        if nom.strip().casefold() not in {'content-type', 'accept'}:
            continue
        for element in valeur.split(','):
            media = element.split(';', 1)[0].strip().casefold()
            if 'application/json' in media and media != 'application/json':
                raise ValueError('Type de média ambigu')
            if media == 'application/json':
                pris_en_charge = True
    return 'JSON supporte' if pris_en_charge else 'Format non supporte'


def _chemin(entree):
    chemin, = _lignes(entree, 1)
    segments = [segment.lower() for segment in chemin.split('/') if segment]
    return '/' + '/'.join(segments)


def _action(entree):
    action, = _lignes(entree, 1)
    verbes = {
        'creer': 'POST', 'ajouter': 'POST',
        'lister': 'GET', 'recuperer': 'GET',
        'remplacer': 'PUT', 'modifier': 'PATCH', 'supprimer': 'DELETE',
    }
    return verbes.get(action.lower(), 'INCONNU')


def _uri(entree):
    uri, = _lignes(entree, 1)
    if '?' in uri or '#' in uri:
        raise ValueError('URI avec paramètres ou fragment non évaluée')
    segments = [segment for segment in uri.split('/') if segment]
    if not segments:
        raise ValueError('Collection cible absente')
    dernier = segments[-1]
    if dernier.isdigit():
        if not dernier.isascii() or len(segments) < 2:
            raise ValueError('Identifiant ou collection hors du domaine vérifié')
        return f'Type: ressource | Cible: {segments[-2]} | ID: {dernier}'
    return f'Type: collection | Cible: {dernier}'


def _convertisseur(entree):
    valeur, nom = _lignes(entree, 2)
    if not valeur or not re.fullmatch(r'[A-Za-z_][A-Za-z_0-9]*', nom):
        raise ValueError('Valeur ou nom de variable non pris en charge')
    if '/' in valeur:
        type_route = 'path'
    elif re.fullmatch(r'[0-9]+', valeur):
        type_route = 'int'
    elif re.fullmatch(r'[0-9]+\.[0-9]+', valeur):
        type_route = 'float'
    elif re.fullmatch(r'[A-Za-z][A-Za-z0-9_-]*', valeur):
        type_route = 'string'
    else:
        raise ValueError('Conversion de route ambiguë')
    return f'<{type_route}:{nom}>'


def _dispatch(entree):
    modele, url = _lignes(entree, 2)
    if not modele.startswith('/') or not url.startswith('/') or any(caractere in url for caractere in '?#%'):
        raise ValueError('Route ou URL hors du domaine vérifié')
    segments_modele = modele.split('/')
    segments_url = url.split('/')
    variables = []
    for position, segment in enumerate(segments_modele):
        if '<' in segment or '>' in segment:
            variable = re.fullmatch(r'<(int|string):([A-Za-z_][A-Za-z_0-9]*)>', segment)
            if variable is None:
                raise ValueError('Convertisseur de route non évalué')
            variables.append((position, variable.group(1), variable.group(2)))
    if len(variables) != 1:
        raise ValueError('Une seule variable de route est prise en charge')
    if len(segments_modele) != len(segments_url):
        return '404 Not Found'
    position, type_route, nom = variables[0]
    for indice, segment in enumerate(segments_modele):
        if indice != position and segment != segments_url[indice]:
            return '404 Not Found'
    valeur = segments_url[position]
    if not valeur or type_route == 'int' and not re.fullmatch(r'[0-9]+', valeur):
        return '404 Not Found'
    return f'Match: {nom}={valeur}'


def _methodes(entree):
    liste, methode = _lignes(entree, 2)
    autorisees = [element.strip().upper() for element in liste.split(',')]
    methode = methode.upper()
    if not methode or any(not element for element in autorisees):
        raise ValueError('Méthode HTTP vide')
    if methode in autorisees:
        return f'200 OK: Traitement {methode}'
    return f'405 Method Not Allowed: Verbes autorises: {",".join(sorted(autorisees))}'


def _erreur(entree):
    code, titre, message = _lignes(entree, 3)
    return json.dumps({'code': int(code), 'error': titre, 'message': message}, sort_keys=True)


def _pagination(entree):
    page_brute, limite_brute, donnees_brutes = _lignes(entree, 3)
    page, limite = int(page_brute), int(limite_brute)
    donnees = json.loads(donnees_brutes)
    if page < 1 or limite < 1 or not isinstance(donnees, list):
        raise ValueError('Pagination hors du domaine vérifié')
    if any(type(element) not in (int, str) for element in donnees):
        raise ValueError('Élément de collection hors du domaine vérifié')
    debut = (page - 1) * limite
    resultat = {'total': len(donnees), 'page': page, 'limit': limite, 'data': donnees[debut:debut + limite]}
    return json.dumps(resultat, sort_keys=True)


def _requis(entree):
    liste, donnees = _lignes(entree, 2)
    requis = [champ.strip() for champ in liste.split(',') if champ.strip()]
    objet = _objet(donnees)
    manquants = sorted(champ for champ in requis if champ not in objet)
    if manquants:
        return f'400 Bad Request: Champs manquants: {",".join(manquants)}'
    return '200 OK: Payload valide'


def _types(entree):
    specification, donnees = _lignes(entree, 2)
    objet = _objet(donnees)
    types = {'str': str, 'int': int, 'bool': bool, 'float': float}
    for champ_brut in specification.split(','):
        nom, separateur, nom_type = champ_brut.partition(':')
        nom, nom_type = nom.strip(), nom_type.strip()
        if not separateur or not nom or nom_type not in types:
            raise ValueError('Schéma de types non pris en charge')
        if nom not in objet:
            raise ValueError('Champ absent : comportement non spécifié')
        valeur = objet[nom]
        if nom_type == 'float' and type(valeur) is int:
            raise ValueError('Entier comme float : consignes contradictoires')
        if type(valeur) is not types[nom_type]:
            return f'Erreur type: champ {nom} attendu {nom_type}'
    return 'Validation reussie'


def _liste_blanche(entree):
    liste, donnees = _lignes(entree, 2)
    autorisees = [champ.strip() for champ in liste.split(',') if champ.strip()]
    objet = _objet(donnees)
    resultat = {champ: objet[champ] for champ in autorisees if champ in objet}
    return json.dumps(resultat, sort_keys=True)


def _filtrer(entree):
    donnees, critere = _lignes(entree, 2)
    collection = _collection(donnees)
    cle, separateur, attendu = critere.partition('=')
    if not separateur or not cle:
        raise ValueError('Critère non pris en charge')
    resultat = []
    for objet in collection:
        if cle not in objet:
            continue
        valeur = objet[cle]
        if type(valeur) not in (str, int):
            raise ValueError('Attribut autre que chaîne ou entier non évalué')
        if str(valeur) == attendu:
            resultat.append(objet)
    return f'Trouves: {len(resultat)}\n{json.dumps(resultat, sort_keys=True)}'


def _creation(entree):
    donnees, nouvel_objet = _lignes(entree, 2)
    collection = _collection(donnees)
    objet = _objet(nouvel_objet)
    if 'id' in objet or any(type(element.get('id')) is not int for element in collection):
        raise ValueError('Identifiants hors du domaine vérifié')
    identifiant = max(element['id'] for element in collection) + 1 if collection else 1
    resultat = dict(objet, id=identifiant)
    return f'201 Created: {json.dumps(resultat, sort_keys=True)}'


def _mutation(entree):
    donnees, commande = _lignes(entree, 2)
    collection = _collection(donnees)
    if any(type(element.get('id')) is not int for element in collection):
        raise ValueError('Identifiant de collection non pris en charge')
    parties = commande.split(maxsplit=2)
    if len(parties) < 2 or parties[0] not in {'DELETE', 'UPDATE'}:
        raise ValueError('Commande non prise en charge')
    operation, identifiant = parties[0], int(parties[1])
    if operation == 'DELETE' and len(parties) != 2 or operation == 'UPDATE' and len(parties) != 3:
        raise ValueError('Commande incomplète ou ambiguë')
    modifications = _objet(parties[2]) if operation == 'UPDATE' else None
    if modifications is not None and 'id' in modifications:
        raise ValueError('Modification de l’identifiant non évaluée')
    elements = [element for element in collection if element['id'] == identifiant]
    if len(elements) > 1:
        raise ValueError('Identifiant non unique')
    if not elements:
        return f'404 Not Found: Ressource {identifiant} inexistante'
    if operation == 'DELETE':
        return f'204 No Content: Ressource {identifiant} supprimee'
    resultat = {**elements[0], **modifications}
    return f'200 OK: {json.dumps(resultat, sort_keys=True)}'


ORACLES = {
    'fl2-c1-e2': _parametres,
    'fl2-c1-e3': _entetes,
    'fl2-c2-e1': _chemin,
    'fl2-c2-e2': _action,
    'fl2-c2-e3': _uri,
    'fl2-c3-e1': _convertisseur,
    'fl2-c3-e2': _dispatch,
    'fl2-c3-e3': _methodes,
    'fl2-c4-e2': _erreur,
    'fl2-c4-e3': _pagination,
    'fl2-c5-e1': _requis,
    'fl2-c5-e2': _types,
    'fl2-c5-e3': _liste_blanche,
    'fl2-c6-e1': _filtrer,
    'fl2-c6-e2': _creation,
    'fl2-c6-e3': _mutation,
}


def calculer(identifiant, entree):
    if identifiant not in ORACLES:
        raise ValueError('Oracle absent ou fiche non évaluée dans ce manifeste')
    return ORACLES[identifiant](entree)
