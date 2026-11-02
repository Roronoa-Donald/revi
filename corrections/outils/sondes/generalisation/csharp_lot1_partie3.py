import ast
import re
from decimal import Decimal, ROUND_HALF_EVEN


def montant(valeur):
    return str(Decimal(valeur).quantize(Decimal('0.01'), rounding=ROUND_HALF_EVEN))


def champs_ligne(ligne):
    return dict(element.split('=', 1) for element in ligne.split()[1:])


def expression_entiere(texte, lire):
    def evaluer(noeud):
        if isinstance(noeud, ast.Constant) and type(noeud.value) is int:
            return noeud.value
        if isinstance(noeud, ast.Name):
            return lire(noeud.id)
        if isinstance(noeud, ast.UnaryOp) and isinstance(noeud.op, (ast.UAdd, ast.USub)):
            valeur = evaluer(noeud.operand)
            return valeur if isinstance(noeud.op, ast.UAdd) else -valeur
        if not isinstance(noeud, ast.BinOp):
            raise ValueError('Expression entière non prise en charge')
        gauche, droite = evaluer(noeud.left), evaluer(noeud.right)
        if isinstance(noeud.op, ast.Add):
            return gauche + droite
        if isinstance(noeud.op, ast.Sub):
            return gauche - droite
        if isinstance(noeud.op, ast.Mult):
            return gauche * droite
        if isinstance(noeud.op, (ast.Div, ast.Mod)) and droite:
            quotient = (abs(gauche) // abs(droite)) * (1 if gauche * droite >= 0 else -1)
            return quotient if isinstance(noeud.op, ast.Div) else gauche - quotient * droite
        raise ValueError('Opérateur ou diviseur non pris en charge')

    return evaluer(ast.parse(texte.strip(), mode='eval').body)


def arguments(entree):
    initiale, signature, corps, appel = entree.splitlines()
    variables = {nom.strip(): int(valeur) for nom, valeur in
                 (element.split('=', 1) for element in initiale.removeprefix('INIT ').split(','))}
    forme = re.fullmatch(r'METHOD\s+(\w+)\((.*)\)', signature)
    invocation = re.fullmatch(r'CALL\s+(\w+)\((.*)\)', appel)
    if not forme or not invocation or forme.group(1) != invocation.group(1):
        raise ValueError('Signature ou appel non pris en charge')
    etat_initial = dict(variables)
    locaux, references = {}, {}
    parametres = [partie.strip().split() for partie in forme.group(2).split(',')]
    valeurs = [partie.strip().split() for partie in invocation.group(2).split(',')]
    if len(parametres) != len(valeurs):
        raise ValueError('Nombre de paramètres incohérent')
    for parametre, argument in zip(parametres, valeurs, strict=True):
        mode, nom = parametre
        cible = argument[-1]
        if mode == 'val':
            locaux[nom] = variables[cible]
        elif mode in ('ref', 'out') and argument[0] == mode:
            references[nom] = cible
        else:
            raise ValueError('Mode de passage non pris en charge')

    def lire(nom):
        return variables[references[nom]] if nom in references else locaux[nom]

    for instruction in corps.removeprefix('BODY ').split(';'):
        destination, calcul = instruction.split('=', 1)
        destination = destination.strip()
        resultat = expression_entiere(calcul, lire)
        if not -(2 ** 31) <= resultat < 2 ** 31:
            raise ValueError('Calcul hors domaine Int32 de l’énoncé')
        if destination in references:
            variables[references[destination]] = resultat
        else:
            locaux[destination] = resultat

    def afficher(etat):
        return ', '.join(f'{nom}={valeur}' for nom, valeur in sorted(etat.items()))

    return '\n'.join((f'ETAT_INITIAL: {afficher(etat_initial)}', f'METHODE: {forme.group(1)}',
                      f'ETAT_FINAL: {afficher(variables)}'))


def formes(entree):
    sorties = []
    for ligne in entree.splitlines():
        type_forme = ligne.split()[0]
        donnees = champs_ligne(ligne)
        if type_forme == 'Circle':
            rayon_texte = donnees['Radius']
            rayon = Decimal(rayon_texte)
            categorie = 'GrandCercle' if rayon > 10 else 'PetitCercle'
            sorties.append(f'Circle (r={rayon_texte}) => {categorie} | Aire={montant(Decimal("3.14") * rayon * rayon)}')
        elif type_forme == 'Rectangle':
            largeur_texte, hauteur_texte = donnees['Width'], donnees['Height']
            largeur, hauteur = Decimal(largeur_texte), Decimal(hauteur_texte)
            categorie = 'Carre' if largeur == hauteur else 'Rectangle'
            sorties.append(f'Rectangle ({largeur_texte}x{hauteur_texte}) => {categorie} | Aire={montant(largeur * hauteur)}')
        else:
            sorties.append(f'{type_forme} => FormeNonSupportee | Aire=0.00')
    return '\n'.join(sorties)


def compte(entree):
    premiere, *operations = entree.splitlines()
    donnees = re.fullmatch(r'INIT Titulaire="([^"]*)" Solde=(\S+)', premiere)
    if not donnees:
        raise ValueError('Compte non pris en charge')
    solde = Decimal(donnees.group(2))
    sorties = [f'Compte: {donnees.group(1)} | Solde initial: {montant(solde)}']
    for ligne in operations:
        operation, texte = ligne.split()
        valeur = Decimal(texte)
        prefixe = f'{operation} {montant(valeur)} => '
        if valeur <= 0:
            sorties.append(prefixe + 'Rejet: ArgumentException (Montant invalide)')
        elif operation == 'RETRAIT' and valeur > solde:
            sorties.append(prefixe + 'Rejet: InvalidOperationException (Solde insuffisant)')
        elif operation in ('DEPOT', 'RETRAIT'):
            solde += valeur if operation == 'DEPOT' else -valeur
            sorties.append(prefixe + f'Succes | Nouveau solde: {montant(solde)}')
        else:
            raise ValueError('Opération non prise en charge')
    sorties.append(f'SOLDE_FINAL: {montant(solde)}')
    return '\n'.join(sorties)


def constructeurs(entree):
    expression = re.compile(r'NEW\s+(Article\("([^"]*)"(?:,\s*"([^"]*)"(?:,\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+)))?)?\))')
    sorties = []
    for ligne in entree.splitlines():
        appel = expression.fullmatch(ligne)
        if not appel:
            raise ValueError('Littéral de constructeur hors sous-domaine de l’oracle')
        texte, reference, nom, prix = appel.groups()
        if nom is None:
            nom, prix = 'Sans nom', '0'
            chaine = 'ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix)'
        elif prix is None:
            prix = '0'
            chaine = 'ctor(r, nom) -> ctor(r, nom, prix)'
        else:
            chaine = 'ctor(r, nom, prix)'
        sorties.append(f'{texte} => Chaine: {chaine} | Objet: [Ref={reference}, Nom={nom}, Prix={montant(prix)}]')
    return '\n'.join(sorties)


def records(entree):
    objets = {}
    sorties = []

    def afficher(proprietes):
        return 'Record { ' + ', '.join(f'{cle} = {valeur}' for cle, valeur in proprietes.items()) + ' }'

    for ligne in entree.splitlines():
        champs = ligne.split()
        commande = champs[0]
        if commande == 'RECORD':
            objets[champs[1]] = dict(champ.split('=', 1) for champ in champs[2:])
            sorties.append(f'CREATE: {champs[1]} => {afficher(objets[champs[1]])}')
        elif commande == 'WITH':
            if champs[2] != 'FROM':
                raise ValueError('Source de copie absente')
            copie = dict(objets[champs[3]])
            for champ in champs[4:]:
                cle, valeur = champ.split('=', 1)
                if cle not in copie:
                    raise ValueError('Propriété à modifier absente')
                copie[cle] = valeur
            objets[champs[1]] = copie
            sorties.append(f'WITH: {champs[1]} => {afficher(copie)}')
        elif commande == 'COMPARE':
            gauche, droite = champs[1:]
            egal = objets[gauche] == objets[droite]
            suffixe = ' (Egalite structurelle)' if egal and gauche != droite else ''
            sorties.append(f'EQUALS: {gauche} == {droite} => {egal}{suffixe}')
        else:
            raise ValueError('Commande de record non prise en charge')
    return '\n'.join(sorties)


def dispatch(entree):
    sorties = []
    for ligne in entree.splitlines():
        reference, instance, methode = ligne.split()[1::2]
        if (reference, instance) not in (('Base', 'Base'), ('Base', 'Derived'), ('Derived', 'Derived')):
            raise ValueError('Combinaison de types non valide')
        if methode == 'Afficher':
            classe = instance
            etiquettes = {('Base', 'Base'): '[virtual]', ('Base', 'Derived'): '[virtual/override dynamique]',
                          ('Derived', 'Derived'): '[override]'}
        elif methode == 'Identifier':
            classe = reference
            etiquettes = {('Base', 'Base'): '[direct]', ('Base', 'Derived'): '[new masqueur statique]',
                          ('Derived', 'Derived'): '[new]'}
        else:
            raise ValueError('Méthode non prise en charge')
        sorties.append(f'{reference}->{instance}: {methode}() => {classe}.{methode} {etiquettes[(reference, instance)]}')
    return '\n'.join(sorties)


def interfaces(entree):
    messages = {
        'CAST IExportable CALL Traiter': 'IExportable.Traiter => Export JSON genere avec succes',
        'CAST IAuditable CALL Traiter': 'IAuditable.Traiter => Audit journalise dans le registre de conformite',
        'DIRECT CALL Traiter': 'DIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)',
    }
    return '\n'.join(messages[ligne] for ligne in entree.splitlines())


def pipelines(entree):
    etapes = {
        'Virement': ('[1. Valider IBAN et solde]', '[2. Debiter compte et crediter tiers]'),
        'Facture': ('[1. Valider TVA et lignes]', '[2. Calculer totaux et generer PDF]'),
        'Inscription': ('[1. Valider unicite email]', '[2. Creer compte utilisateur en base]'),
    }
    sorties = []
    for ligne in entree.splitlines():
        commande, nom = ligne.split()
        if commande != 'PIPELINE':
            raise ValueError('Commande de pipeline invalide')
        premiere, deuxieme = etapes[nom]
        sorties.append(f'Pipeline {nom}: {premiere} -> {deuxieme} -> [3. Notification globale envoyee]')
    return '\n'.join(sorties)


def dictionnaire(entree):
    valeurs, sorties = {}, []
    for ligne in entree.splitlines():
        commande, cle, *reste = ligne.split()
        if commande == 'ADD':
            valeurs[cle] = int(reste[0])
            sorties.append(f'ADD: {cle} => {valeurs[cle]} (Taille={len(valeurs)})')
        elif commande == 'GET':
            if cle not in valeurs:
                sorties.append(f'GET: {cle} => CRASH KeyNotFoundException (Cle absente du dictionnaire)')
                break
            sorties.append(f'GET: {cle} => {valeurs[cle]}')
        elif commande == 'TRYGET':
            resultat = f'Trouve: {valeurs[cle]}' if cle in valeurs else 'NonTrouve (out val=0)'
            sorties.append(f'TRYGET: {cle} => {resultat}')
        else:
            raise ValueError('Commande de dictionnaire non prise en charge')
    return '\n'.join(sorties)


def exceptions(entree):
    sorties = []
    for ligne in entree.splitlines():
        commande, type_exception, valeur = ligne.split()
        if commande != 'THROW':
            raise ValueError('Exception invalide')
        statut = int(valeur.split('=', 1)[1])
        if type_exception == 'HttpException' and statut == 404:
            traitement = 'catch when (StatusCode == 404) [ClientError]'
        elif type_exception == 'HttpException' and statut >= 500:
            traitement = 'catch when (StatusCode >= 500) [ServerError]'
        elif type_exception == 'TimeoutException':
            traitement = 'catch (TimeoutException) [DelaiDepasse]'
        else:
            traitement = 'catch (Exception) [FallbackGlobal]'
        sorties.append(f'Exception: {type_exception} ({statut}) => Intercepte par: {traitement} | FINALLY execute')
    return '\n'.join(sorties)


def contraintes(entree):
    premiere, *candidats = entree.splitlines()
    liste = [element.strip() for element in premiere.split(':', 1)[1].split(',')]
    ensemble = set(liste)
    if ('new()' in ensemble and (liste[-1] != 'new()' or 'struct' in ensemble)) or {'class', 'struct'} <= ensemble:
        raise ValueError('Combinaison de contraintes C# non légale')
    sorties = []
    for ligne in candidats:
        donnees = champs_ligne(ligne)
        est_classe = donnees['IsClass'] == 'True'
        constructeur = donnees['HasDefaultCtor'] == 'True'
        comparable = donnees['ImplementsComparable'] == 'True'
        if not est_classe and not constructeur:
            raise ValueError('Type valeur non nullable sans constructeur implicite')
        erreurs = []
        if 'class' in ensemble and not est_classe:
            erreurs.append('non-class (struct)')
        if 'struct' in ensemble and est_classe:
            erreurs.append('non-struct (class)')
        if 'new()' in ensemble and not constructeur:
            erreurs.append('pas de constructeur sans argument new()')
        if 'IComparable' in ensemble and not comparable:
            erreurs.append('n implemente pas IComparable')
        resultat = 'REJETE [Violation: ' + ', '.join(erreurs) + ']' if erreurs else 'VALIDE (Toutes contraintes respectees)'
        sorties.append(f'Type {donnees["Nom"]}: {resultat}')
    return '\n'.join(sorties)


def filtre_linq(entree):
    premiere, *articles = entree.splitlines()
    seuil = Decimal(premiere.split()[-1])
    selection = []
    for ligne in articles:
        donnees = champs_ligne(ligne)
        prix = Decimal(donnees['Prix'])
        if prix >= seuil:
            selection.append((donnees['Nom'], prix))
    selection.sort(key=lambda article: article[1], reverse=True)
    sorties = ['LINQ: Declenchement ToList() (Evaluation differee terminee)']
    sorties.extend(f'Resultat: {nom} - {montant(prix)}' for nom, prix in selection)
    sorties.append(f'TOTAL_ELEMENTS: {len(selection)}')
    return '\n'.join(sorties)


def groupes_linq(entree):
    groupes = {}
    for ligne in entree.splitlines():
        personne, categorie, valeur = ligne.split()
        if not personne or not re.fullmatch(r'[A-Z][a-z]+', categorie):
            raise ValueError('Ordre culturel hors sous-domaine contrôlé')
        groupes.setdefault(categorie, []).append(Decimal(valeur))
    if len({categorie[0] for categorie in groupes}) != len(groupes):
        raise ValueError('Initiales non distinctes : collation non démontrée')
    sorties = []
    for categorie in sorted(groupes):
        achats = groupes[categorie]
        total = sum(achats, Decimal(0))
        sorties.append(f'Groupe: {categorie} | NbAchats: {len(achats)} | Total: {montant(total)} | Moyenne: {montant(total / len(achats))}')
    return '\n'.join(sorties)


def evenements(entree):
    abonnes, sorties = [], []
    for ligne in entree.splitlines():
        commande, valeur = ligne.split(' ', 1)
        if commande == 'SUBSCRIBE':
            abonnes.append(valeur)
        elif commande == 'UNSUBSCRIBE':
            for index in range(len(abonnes) - 1, -1, -1):
                if abonnes[index] == valeur:
                    del abonnes[index]
                    break
        elif commande == 'EMIT':
            sorties.extend(f'EVENT {valeur} => {nom} recoit la notification' for nom in abonnes)
        else:
            raise ValueError('Commande événementielle inconnue')
    return '\n'.join(sorties)


def taches_sequentielles(entree):
    duree, sorties = 0, []
    for index, ligne in enumerate(entree.splitlines()):
        commande, nom, texte = ligne.split()
        if commande != 'TASK' or not re.fullmatch(r'Duree=\d+ms', texte):
            raise ValueError('Tâche non prise en charge')
        if index == 0:
            sorties.append(f'[T={duree}ms] Demarrage {nom} -> Await (trace simulee)')
        else:
            sorties.append(f'[T={duree}ms] Reprise contexte -> Demarrage {nom} -> Await')
        duree += int(texte.removeprefix('Duree=').removesuffix('ms'))
    sorties.append(f'[T={duree}ms] Tache completee avec succes. Duree totale={duree}ms')
    return '\n'.join(sorties)


def taches_concurrentes(entree):
    succes, erreurs = 0, []
    for ligne in entree.splitlines():
        tache = re.fullmatch(r'TASK\s+\S+\s+Status=(OK|FAIL)(?:\s+Error="([^"]*)")?', ligne)
        if not tache or (tache.group(1) == 'FAIL' and tache.group(2) is None):
            raise ValueError('Tâche concurrente non prise en charge')
        if tache.group(1) == 'OK':
            succes += 1
        else:
            erreurs.append(tache.group(2))
    sorties = [f'WHENALL: {succes} succes, {len(erreurs)} echecs']
    if erreurs:
        sorties.append(f'AggregateException observee ({len(erreurs)} erreurs):')
        sorties.extend(f'- Erreur {index}: {message}' for index, message in enumerate(erreurs, start=1))
    else:
        sorties.append('Execution terminee sans exception')
    return '\n'.join(sorties)


def ressources(entree):
    premiere, *instructions = entree.splitlines()
    commande, nom, allocation = premiere.split()
    if commande != 'RESOURCE' or not allocation.startswith('ALLOCATE='):
        raise ValueError('Ressource invalide')
    sorties = [f'[ALLOC] {nom} alloue (Handle={allocation.removeprefix("ALLOCATE=")})']
    for ligne in instructions:
        if ligne.startswith('OP '):
            sorties.append('[EXEC] Op ' + ligne[3:])
        elif ligne.startswith('THROW '):
            sorties.append('[CRASH] Exception ' + ligne[6:] + ' intercepte')
            break
        elif ligne == 'EXIT':
            break
        else:
            raise ValueError('Instruction de ressource non prise en charge')
    sorties.append(f'[DISPOSE] {nom} libere via IDisposable')
    return '\n'.join(sorties)


FONCTIONS = {
    'csb2-c1-e2': arguments,
    'csb2-c1-e3': formes,
    'csb2-c2-e1': compte,
    'csb2-c2-e2': constructeurs,
    'csb2-c2-e3': records,
    'csb2-c3-e1': dispatch,
    'csb2-c3-e2': interfaces,
    'csb2-c3-e3': pipelines,
    'csb2-c4-e1': dictionnaire,
    'csb2-c4-e2': exceptions,
    'csb2-c4-e3': contraintes,
    'csb2-c5-e1': filtre_linq,
    'csb2-c5-e2': groupes_linq,
    'csb2-c5-e3': evenements,
    'csb2-c6-e1': taches_sequentielles,
    'csb2-c6-e2': taches_concurrentes,
    'csb2-c6-e3': ressources,
}


def calculer(identifiant, entree):
    return FONCTIONS[identifiant](entree)
