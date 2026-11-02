import importlib.util
import json
import re
import secrets
import sys
import tempfile
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

sys.dont_write_bytecode = True
RACINE = Path('/trusted')


def importer(nom, fichier):
    specification = importlib.util.spec_from_file_location(nom, RACINE / fichier)
    module = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(module)
    return module


banc = importer('banc_generalisation', 'banc.py')
oracle = importer('oracle_b1_git', 'b1_git.py')
mutations = importer('mutations_b1_git', 'b1_git_variantes.py')
banc.oracles_supplementaires['b1_git.py'] = oracle


def controles_actifs(exercice):
    resultats = []
    actifs = exercice['tests'][:7]
    if exercice.get('verifyFirstExample') is True:
        actifs = [*actifs, exercice['examples'][0]]
    for test in actifs:
        try:
            attendu_independant = oracle.calculer(exercice['id'], test.get('stdin', ''))
        except (ValueError, IndexError, KeyError, TypeError) as erreur:
            resultats.append({'label': test.get('label', 'Exemple affiché'), 'etat': 'non qualifiable', 'raison': str(erreur)})
            continue
        conforme = banc.normaliser(attendu_independant) == banc.normaliser(test['expected'])
        resultats.append({
            'label': test.get('label', 'Exemple affiché'),
            'etat': 'conforme' if conforme else 'contradiction',
            'attendu_test': test['expected'],
            'attendu_oracle': attendu_independant,
        })
    return resultats


def executions_actives(exercice, source):
    tests = exercice['tests'][:7]
    if exercice.get('verifyFirstExample') is True:
        tests = [*tests, exercice['examples'][0]]
    executions = []
    for test in tests:
        entree = test.get('stdin', '')
        execution = executer_avec_code(entree, source)
        executions.append({'label': test.get('label', 'Exemple affiché'), 'entree': entree, **execution})
    return executions


def executer_avec_code(entree, source):
    marqueur = 'B1_GIT_FIN_' + secrets.token_hex(16)
    programme = '/bin/bash /code/solution.sh\nstatut=$?\nprintf "\\n' + marqueur + ':%s\\n" "$statut" >&2\nexit 0'
    with tempfile.TemporaryDirectory(prefix='b1-git-solution-') as repertoire:
        fichier = Path(repertoire) / 'source'
        fichier.write_text(source, encoding='utf-8')
        options = banc.options_solution('shell', fichier)
        commande = banc.commande_bornee(options, ['/bin/sh', '-c', programme], 'shell')
        resultat = banc.executer_commande(commande, entree, timeout=20, inclure_stderr=True)
    if resultat['expiration'] or resultat['sortie_trop_longue'] or resultat['code'] != 0:
        return {'etat': 'non évalué', 'raison': 'exécution confinée interrompue', 'code': resultat['code']}
    fin = re.search(r'\n' + re.escape(marqueur) + r':([0-9]{1,3})\n\Z', resultat['stderr'])
    if fin is None:
        return {'etat': 'non évalué', 'raison': 'statut du programme non attesté'}
    return {
        'etat': 'exécuté',
        'sortie': resultat['stdout'],
        'code_sortie': int(fin.group(1)),
        'stderr_sha256': banc.digest(resultat['stderr'][:fin.start()]),
    }


def executer_temoin(exercice, source, cas, numero):
    execution = banc.executer_solution(exercice, cas['entree'], replacement=source)
    if execution['etat'] != 'exécuté':
        return {'numero': numero, 'etat': 'non évalué', **execution}
    sortie = banc.normaliser(execution['sortie'])
    attendu = banc.normaliser(cas['attendu'])
    return {
        'numero': numero,
        'etat': 'conforme' if sortie == attendu else 'incorrect',
        'sortie_normalisee': sortie,
        'attendu_normalise': attendu,
    }


def mutations_figees(exercice, precedent):
    identifiant = exercice['id']
    if precedent is None:
        variantes = mutations.construire(identifiant, exercice['solution'])
        for variante in variantes:
            variante['empreinte_sha256'] = banc.digest(variante['source'])
        return variantes
    ligne = precedent.get(identifiant)
    if ligne is None or len(ligne.get('variantes', [])) != 2:
        raise ValueError('variantes de référence absentes')
    variantes = []
    for variante in ligne['variantes']:
        if banc.digest(variante['source']) != variante['empreinte_sha256']:
            raise ValueError('empreinte de variante modifiée')
        variantes.append({cle: variante[cle] for cle in ('nom', 'description', 'source', 'empreinte_sha256')})
    if len({variante['empreinte_sha256'] for variante in variantes}) != 2:
        raise ValueError('variantes de référence identiques')
    return variantes


def main():
    banc.controler_enveloppe()
    banc.initialiser_nss()
    isolation = banc.verification_isolation()
    definitions = json.loads((RACINE / 'cas_b1_git.json').read_text(encoding='utf-8'))['exercices']
    identifiants = {f'gt-c{chapitre}-e{exercice}' for chapitre in range(1, 7) for exercice in range(1, 4)}
    if len(definitions) != 18 or {item['id'] for item in definitions} != identifiants:
        raise ValueError('périmètre des témoins incomplet ou dupliqué')
    catalogue = {item['id']: item for item in banc.charger_catalogue() if item['id'] in identifiants}
    if set(catalogue) != identifiants:
        raise ValueError('périmètre du catalogue incomplet')

    anciens_paquets = banc.PAQUETS_SUPPLEMENTAIRES
    try:
        banc.PAQUETS_SUPPLEMENTAIRES = (('cas_b1_git.json', 'b1_git.py', 'gt-'),)
        definitions_paquet = {item['id']: {**item, 'paquet_oracle': 'b1_git.py'} for item in definitions}
        controles_paquet = banc.tester_garde_paquets(definitions_paquet)['b1_git.py']
    finally:
        banc.PAQUETS_SUPPLEMENTAIRES = anciens_paquets

    ancien_fichier = RACINE / 'b1_git_avant.json'
    precedent = None
    if ancien_fichier.exists():
        ancien = json.loads(ancien_fichier.read_text(encoding='utf-8'))
        precedent = {item['id']: item for item in ancien['exercices']}
        if set(precedent) != identifiants or len(ancien['exercices']) != 18:
            raise ValueError('rapport de référence incomplet')

    lignes = []
    demandes = []
    for definition in definitions:
        identifiant = definition['id']
        exercice = catalogue[identifiant]
        if exercice['language'] != 'shell' or definition['source'] != 'b1-git.js' or definition['oracle'] != identifiant:
            raise ValueError('association au catalogue incorrecte')
        definition = {**definition, 'paquet_oracle': 'b1_git.py'}
        generalisation = banc.auditer_exercice(exercice, definition)
        variantes = mutations_figees(exercice, precedent)
        controles = controles_actifs(exercice)
        presentation = {cle: exercice[cle] for cle in ('id', 'language', 'tests')}
        for cle in ('examples', 'verifyFirstExample', 'requiredShebang'):
            if cle in exercice:
                presentation[cle] = exercice[cle]
        corriges_actifs = executions_actives(exercice, exercice['solution'])
        demandes.append({'cle': identifiant + '/corrige', 'exercice': presentation, 'source': exercice['solution'], 'executions': corriges_actifs})
        for variante in variantes:
            variante['temoins'] = [executer_temoin(exercice, variante['source'], cas, numero) for numero, cas in enumerate(definition['cas'], 1)]
            variante['erreur_etablie'] = any(temoin['etat'] == 'incorrect' for temoin in variante['temoins'])
            variante['executions_actives'] = executions_actives(exercice, variante['source'])
            demandes.append({'cle': identifiant + '/' + variante['nom'], 'exercice': presentation, 'source': variante['source'], 'executions': variante['executions_actives']})
        lignes.append({
            'id': identifiant,
            'generalisation': generalisation,
            'tests_actifs_controle_oracle': controles,
            'corrige_executions_actives': corriges_actifs,
            'variantes': variantes,
        })

    appel = banc.executer_commande(
        ['/toolchain/node', '/trusted/b1_git_grader.js'], json.dumps(demandes, ensure_ascii=False),
        timeout=120, max_output=8388608, inclure_stderr=True,
    )
    if appel['code'] != 0 or appel['expiration'] or appel['sortie_trop_longue']:
        raise RuntimeError('correcteur réel indisponible : ' + appel.get('stderr', '')[:300])
    reponse = json.loads(appel['stdout'])
    if reponse['max_tests'] != 7 or len(reponse['reponses']) != len(demandes):
        raise ValueError('réponse incomplète du correcteur réel')
    notes = {note['cle']: note for note in reponse['reponses']}
    if len(notes) != len(demandes):
        raise ValueError('résultats du correcteur dupliqués')
    for ligne in lignes:
        ligne['corrige_correcteur'] = notes[ligne['id'] + '/corrige']
        for variante in ligne['variantes']:
            variante['correcteur'] = notes[ligne['id'] + '/' + variante['nom']]

    bilan_generalisation = Counter(ligne['generalisation']['etat'] for ligne in lignes)
    bilan_corriges = Counter(ligne['corrige_correcteur']['etat'] for ligne in lignes)
    variantes = [variante for ligne in lignes for variante in ligne['variantes']]
    bilan_variantes = Counter(variante['correcteur']['etat'] for variante in variantes)
    controles = Counter(controle['etat'] for ligne in lignes for controle in ligne['tests_actifs_controle_oracle'])
    temoins_variantes = Counter(temoin['etat'] for variante in variantes for temoin in variante['temoins'])
    executions = [execution for ligne in lignes for execution in ligne['corrige_executions_actives']]
    executions.extend(execution for variante in variantes for execution in variante['executions_actives'])
    executions_non_evaluees = sum(execution['etat'] != 'exécuté' for execution in executions)
    erreurs_etablies = sum(variante['erreur_etablie'] for variante in variantes)
    etat = 'réussi' if (
        bilan_generalisation == {'réussi': 18} and bilan_corriges == {'accepté': 18}
        and bilan_variantes == {'rejeté': 36} and erreurs_etablies == 36
        and not controles['contradiction'] and not controles['non qualifiable']
        and not temoins_variantes['non évalué'] and not executions_non_evaluees
        and all(controles_paquet.values())
    ) else 'échoué'
    rapport = {
        'etat': etat,
        'date_utc': datetime.now(timezone.utc).isoformat(),
        'perimetre': 'lot 1 partie 3 — 18 fiches B1 Git uniquement',
        'methode': 'Deux témoins manuels et un oracle Python distinct par fiche ; code exécuté séparément avec les fonctions Bubblewrap du banc commun ; comparaison des tests actifs par runTests réel.',
        'variantes_figees_depuis_rapport_precedent': precedent is not None,
        'isolation': isolation,
        'autocontroles_paquet': controles_paquet,
        'bilan': {
            'fiches': len(lignes),
            'temoins': sum(len(item['cas']) for item in definitions),
            'generalisation': dict(bilan_generalisation),
            'corriges_tests_actifs': dict(bilan_corriges),
            'variantes': len(variantes),
            'variantes_incorrectes_sur_temoins': erreurs_etablies,
            'temoins_variantes': dict(temoins_variantes),
            'variantes_tests_actifs': dict(bilan_variantes),
            'tests_actifs_qualifies': dict(controles),
            'executions_actives': len(executions),
            'executions_actives_non_evaluees': executions_non_evaluees,
        },
        'limites': [
            'Les témoins et leur oracle sont deux constructions distinctes du même audit : l’indépendance intellectuelle totale et la correction sur tout le domaine ne sont pas démontrées.',
            'Les contrôles de nouveauté du banc portent sur les exemples, tests et représentations littérales usuelles ; ils ne prouvent pas l’absence de dépendances ou encodages arbitraires.',
            'Le modèle exclut les doublons add en c2-e1/e2, les fusions répétées, les branches inconnues et plusieurs entrées non précisées par les énoncés.',
            'La comparaison utilise le vrai moteur runTests, alimenté par Bash local isolé ; le service de production distant et ses fournisseurs ne sont pas sollicités.',
            'Bubblewrap sépare les réseaux et montages et applique des limites de processus ; aucun cgroup ni profil seccomp dédié n’est ajouté.',
        ],
        'exercices': lignes,
    }
    print(json.dumps(rapport, ensure_ascii=False, indent=2))
    return 0 if etat == 'réussi' else 1


if __name__ == '__main__':
    try:
        sys.exit(main())
    except Exception as erreur:
        print(json.dumps({'etat': 'erreur_infrastructure', 'raison': str(erreur)}, ensure_ascii=False))
        sys.exit(2)
