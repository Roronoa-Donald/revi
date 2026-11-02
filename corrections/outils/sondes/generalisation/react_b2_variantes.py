def construire(identifiant, source):
    definitions = {
        'rx2-c1-e3': [
            ('indentation', 'N’indente le header que d’un espace.', '  <Header title=', ' <Header title='),
            ('auteur_remplace', 'Utilise le message à la place de l’auteur.', '${auteur}', '${message}')],
        'rx2-c2-e1': [
            ('tiret_oublie', 'Ne reconnaît pas le tiret comme rôle absent.', "(!rawRole || rawRole === '-')", '(!rawRole)'),
            ('role_force', 'Ignore le rôle effectivement fourni.', "const role = (!rawRole || rawRole === '-') ? 'invite' : rawRole;", "const role = 'invite';")],
        'rx2-c2-e2': [
            ('classe_incomplete', 'Oublie le préfixe de la classe de variante.', 'card card-${variante}', 'card ${variante}'),
            ('enfant_incorrect', 'Rend un span au lieu du paragraphe demandé.', '<p>${texte}</p>', '<span>${texte}</span>')],
        'rx2-c2-e3': [
            ('theme_ignore', 'Ignore le thème fourni.', "const theme = props.theme || 'none';", "const theme = 'none';"),
            ('defaut_id', 'Utilise une valeur par défaut incorrecte pour id.', "const id = props.id || 'none';", "const id = props.id || '0';")],
        'rx2-c3-e1': [
            ('reset_initial', 'Revient à la valeur initiale au lieu de zéro.', "else if (act === 'RESET') count = 0;", "else if (act === 'RESET') count = parseInt(lignes[0], 10);"),
            ('decrement_inverse', 'Incrémente lors d’une action DEC.', "else if (act === 'DEC') count -= 1;", "else if (act === 'DEC') count += 1;")],
        'rx2-c3-e2': [
            ('seuil_sept', 'Accepte à tort une longueur de sept caractères.', 'saisie.length >= 8', 'saisie.length >= 7'),
            ('chiffre_oublie', 'Valide une longueur suffisante sans vérifier le chiffre.', 'if (hasLen && hasNum)', 'if (hasLen)')],
        'rx2-c3-e3': [
            ('ajout_oublie', 'N’ajoute pas le nouvel article.', 'nouveau = [...articles, cible];', 'nouveau = [...articles];'),
            ('filtre_inverse', 'Conserve la cible au lieu de la supprimer.', 'articles.filter(item => item !== cible)', 'articles.filter(item => item === cible)')],
        'rx2-c4-e1': [
            ('cle_libelle', 'Utilise le libellé comme clé.', 'key="${id}"', 'key="${label}"'),
            ('libelle_cle', 'Affiche l’identifiant à la place du libellé.', '>${label}</li>', '>${id}</li>')],
        'rx2-c4-e2': [
            ('casse_sensible', 'Recherche en respectant à tort la casse.', 'm.toLowerCase().includes(query)', 'm.includes(query)'),
            ('egalite_stricte', 'Cherche une égalité complète au lieu d’une inclusion.', 'm.toLowerCase().includes(query)', 'm.toLowerCase() === query')],
        'rx2-c4-e3': [
            ('auth_ignoree', 'Affiche le badge même si actif vaut zéro.', "actif === '1' && nb > 0", 'nb > 0'),
            ('borne_negative', 'Accepte à tort des nombres négatifs.', 'nb > 0', 'nb > -10')],
        'rx2-c5-e1': [
            ('premiere_dependance', 'Compare uniquement la première dépendance.', 'i < dep1.length', 'i < Math.min(1, dep1.length)'),
            ('longueur_ignoree', 'Ne déclenche pas l’effet lorsque la longueur diffère.', 'if (dep1.length !== dep2.length) {\n  change = true;', 'if (dep1.length !== dep2.length) {\n  change = false;')],
        'rx2-c5-e2': [
            ('erreur_succes', 'Rend les erreurs comme un résultat réussi.', '<AlertError message="${donnee}" />', '<DataView result="${donnee}" />'),
            ('chargement_succes', 'Rend le chargement comme un résultat réussi.', "console.log('<Spinner label=\"Chargement en cours...\" />');", 'console.log(`<DataView result="${donnee}" />`);')],
        'rx2-c5-e3': [
            ('ticks_ignores', 'Omet les battements du timer.', "else if (ev === 'TICK') console.log('Tick horloge');", "else if (ev === 'TICK') {}"),
            ('nettoyage_oublie', 'Omet le nettoyage lors du démontage.', "else if (ev === 'UNMOUNT') console.log('Timer nettoye');", "else if (ev === 'UNMOUNT') {}")],
        'rx2-c6-e1': [
            ('premier_parametre', 'Conserve uniquement le premier paramètre dynamique.', 'params[key] = url[i];', 'if (Object.keys(params).length === 0) params[key] = url[i];'),
            ('nombre_ignore', 'Extrait les paramètres malgré un nombre de segments différent.', 'if (pattern.length === url.length)', 'if (pattern.length !== 0)')],
        'rx2-c6-e2': [
            ('acces_toujours_ouvert', 'Affiche toujours le composant privé.', "if (auth === '1')", 'if (true)'),
            ('acces_toujours_refuse', 'Redirige même un utilisateur authentifié.', "if (auth === '1')", 'if (false)')],
        'rx2-c6-e3': [
            ('plancher_oublie', 'Ne plafonne pas la remise à zéro.', 'Math.max(0, total - val)', 'total - val'),
            ('ajout_inverse', 'Soustrait lors d’un ajout.', 'total += val;', 'total -= val;')]
    }
    variantes = []
    for nom, description, ancien, nouveau in definitions[identifiant]:
        if source.count(ancien) != 1:
            raise ValueError(f'Mutation absente ou ambiguë : {identifiant}/{nom}')
        variantes.append({'nom': nom, 'description': description, 'source': source.replace(ancien, nouveau, 1)})
    if len(variantes) != 2 or variantes[0]['source'] == variantes[1]['source']:
        raise ValueError(f'Paire de variantes invalide : {identifiant}')
    return variantes
