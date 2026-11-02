import concurrent.futures
import copy
import importlib.util
import json
import os
import re
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path('/trusted')
SOURCE = Path('/project/server/exercises')
RESULTATS = Path('/reference')
MAX_TESTS = 7


def importer(nom, chemin):
    specification = importlib.util.spec_from_file_location(nom, chemin)
    module = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(module)
    return module


banc = importer('banc_generalisation', ROOT / 'banc.py')
oracle = importer('oracle_rd_winserver', ROOT / 'rd_winserver.py')
banc.oracles_supplementaires['rd_winserver.py'] = oracle


def date_utc():
    return datetime.now(timezone.utc).isoformat(timespec='seconds')


def condensat(chemin):
    return banc.digest(Path(chemin).read_bytes())


def empreintes_sources():
    chemins = sorted(path for path in SOURCE.rglob('*') if path.is_file() and path.suffix in {'.js', '.json'})
    chemins += sorted(path for path in Path('/project/server/services/execution').glob('*.js') if path.is_file())
    chemins += [ROOT / nom for nom in (
        'banc.py', 'rejouer.sh', 'rd_winserver.py', 'cas_rd_winserver.json',
        'rd_winserver_banc.py', 'rd_winserver_comparer.js', 'rd_winserver_rejouer.sh'
    )]
    chemins += [RESULTATS / 'partie2.tsv', Path('/runtimes/powershell/pwsh')]
    return {str(path): condensat(path) for path in chemins}


def definition_controlee(definition):
    return {**definition, 'paquet_oracle': 'rd_winserver.py'}


def exiger_erreur(fonction):
    try:
        fonction()
    except (ValueError, KeyError, TypeError):
        return True
    return False


def controler_oracle(definition):
    definition = definition_controlee(definition)
    banc.controler_attendus(definition)
    modifiee = copy.deepcopy(definition)
    modifiee['cas'][0]['attendu'] = 'attendu volontairement faux'
    mauvais_attendu = exiger_erreur(lambda: banc.controler_attendus(modifiee))
    modifiee = copy.deepcopy(definition)
    modifiee['oracle'] = 'oracle_absent'
    oracle_absent = exiger_erreur(lambda: banc.controler_attendus(modifiee))
    if not mauvais_attendu or not oracle_absent:
        raise RuntimeError('Autocontrôle de l’oracle indépendant en échec')
    return {'attendu_errone_rejete': mauvais_attendu, 'oracle_absent_rejete': oracle_absent}


def candidats(exercise, definition):
    solution = exercise['solution']
    mutants = definition.get('mutants', [])
    if len(mutants) != 2:
        raise RuntimeError('Deux mutants sont requis pour chaque fiche')
    resultats = [{'nom': 'corrigé', 'code': solution}]
    for mutation in mutants:
        ancien, nouveau = mutation['ancien'], mutation['nouveau']
        if not ancien or ancien == nouveau or solution.count(ancien) != 1:
            raise RuntimeError('Mutation ambiguë ou sans effet : ' + exercise['id'])
        resultats.append({'nom': mutation['nom'], 'code': solution.replace(ancien, nouveau, 1)})
    if len({banc.digest(candidate['code']) for candidate in resultats}) != 3:
        raise RuntimeError('Candidats identiques : ' + exercise['id'])
    return resultats


def verifier_fini(exercise, definition):
    anciens = list(exercise.get('examples') or []) + list(exercise.get('tests') or [])
    connus = {banc.canonique(item.get('stdin', ''), definition['codec']) for item in anciens}
    cas = {banc.canonique(item['entree'], definition['codec']) for item in definition['cas']}
    if not cas <= connus or len(cas) != 2:
        raise RuntimeError('Les deux contrôles finis doivent être distincts et déjà connus')
    if definition['id'] == 'ws2-c5-e2':
        domaine = {'nat', 'bridge', 'host-only'}
        disponibles = {item.get('stdin', '').casefold() for item in anciens}
    elif definition['id'] == 'ws2-c6-e2':
        domaine = {f'{type_clone}\n{source}' for type_clone in ('complet', 'lie') for source in ('oui', 'non')}
        disponibles = {item.get('stdin', '').casefold() for item in anciens}
    else:
        raise RuntimeError('Domaine fini non qualifié')
    if not domaine <= disponibles:
        raise RuntimeError('Domaine énuméré non couvert par les cas antérieurs')
    return {'valeurs_possibles': sorted(domaine), 'toutes_deja_connues': True}


def comparer(candidats_evalues):
    options = banc.base_bwrap() + [
        '--dir', '/project', '--dir', '/project/server',
        '--ro-bind', '/project/server/exercises', '/project/server/exercises',
        '--dir', '/project/server/services',
        '--ro-bind', '/project/server/services/execution', '/project/server/services/execution',
        '--ro-bind', str(ROOT / 'rd_winserver_comparer.js'), '/comparateur.js'
    ]
    commande = banc.commande_bornee(options, ['/toolchain/node', '/comparateur.js'], 'javascript', export=True)
    entree = json.dumps({'candidats': candidats_evalues}, ensure_ascii=False)
    resultat = banc.executer_commande(commande, entree, timeout=90, max_output=8_388_608, inclure_stderr=True)
    if resultat['code'] != 0 or resultat['expiration'] or resultat['sortie_trop_longue']:
        raise RuntimeError('Comparateur runTests indisponible : ' + resultat.get('stderr', '')[:500])
    rapport = json.loads(resultat['stdout'])
    if rapport['max_tests'] != MAX_TESTS or len(rapport['resultats']) != len(candidats_evalues):
        raise RuntimeError('Rapport de comparaison incomplet')
    return rapport['resultats']


def main(phase):
    debut = date_utc()
    banc.controler_enveloppe()
    banc.initialiser_nss()
    isolation = banc.verification_isolation()
    version = banc.executer_solution({
        'language': 'powershell', 'solution': '[Console]::WriteLine($PSVersionTable.PSVersion.ToString())\n'
    }, '')
    if version.get('etat') != 'exécuté' or not re.fullmatch(r'\d+\.\d+\.\d+', version['sortie'].strip()):
        raise RuntimeError('Le PowerShell isolé est indisponible')
    empreintes_initiales = empreintes_sources()
    manifeste = json.loads((ROOT / 'cas_rd_winserver.json').read_text(encoding='utf-8'))
    nouvelles = manifeste['exercices']
    finies = manifeste['domaines_finis']
    definitions = nouvelles + finies
    identifiants = [definition['id'] for definition in definitions]
    if len(nouvelles) != 15 or len(finies) != 2 or len(set(identifiants)) != 17:
        raise RuntimeError('Périmètre de 15 fiches nouvelles et deux domaines finis non respecté')
    partie2 = {
        line.split('\t', 1)[0] for line in (RESULTATS / 'partie2.tsv').read_text(encoding='utf-8').splitlines()
        if line.startswith('ws2-')
    }
    if set(identifiants) != partie2 or 'ws2-c4-e3' in identifiants:
        raise RuntimeError('Périmètre incompatible avec la partie 2')
    avant = None
    if phase == 'apres':
        avant = json.loads((RESULTATS / 'avant.json').read_text(encoding='utf-8'))
        if avant.get('phase') != 'avant' or avant.get('mesure_complete') is not True:
            raise RuntimeError('Rapport initial incomplet')
        if avant['versions']['manifeste_sha256'] != condensat(ROOT / 'cas_rd_winserver.json'):
            raise RuntimeError('Manifeste différent de celui du rapport initial')
        if avant['versions']['oracle_sha256'] != condensat(ROOT / 'rd_winserver.py'):
            raise RuntimeError('Oracle différent de celui du rapport initial')
        avant = {item['id']: item for item in avant['exercices']}

    catalogue = {exercise['id']: exercise for exercise in banc.charger_catalogue()}
    if not set(identifiants) <= catalogue.keys():
        raise RuntimeError('Fiche absente du catalogue actif')
    preparation = []
    taches = {}
    garde_nouveaute = None
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        for definition in definitions:
            exercise = catalogue[definition['id']]
            if exercise['language'] != 'powershell' or exercise['course'] != 'rd_winserver':
                raise RuntimeError('Langage ou cours inattendu')
            source = banc.verifier_source(exercise, definition)
            controles_oracle = controler_oracle(definition)
            domaine_fini = definition in finies
            domaine = verifier_fini(exercise, definition) if domaine_fini else None
            if phase == 'avant' and not domaine_fini:
                try:
                    banc.verifier_nouveaute(exercise, definition, source)
                except ValueError as erreur:
                    raise RuntimeError(exercise['id'] + ' : ' + str(erreur)) from erreur
                if garde_nouveaute is None:
                    doublon = copy.deepcopy(definition)
                    doublon['cas'][0]['entree'] = exercise['tests'][0]['stdin']
                    garde_nouveaute = exiger_erreur(lambda: banc.verifier_nouveaute(exercise, doublon, source))
                    if not garde_nouveaute:
                        raise RuntimeError('Le garde de nouveauté accepte un ancien test')
            if phase == 'apres':
                precedent = avant[exercise['id']]
                if banc.digest(exercise['solution']) != precedent['solution_sha256']:
                    raise RuntimeError('Corrigé modifié depuis la mesure initiale : ' + exercise['id'])
                if exercise['tests'][:len(precedent['tests_initiaux'])] != precedent['tests_initiaux']:
                    raise RuntimeError('Tests initiaux modifiés ou déplacés : ' + exercise['id'])
                if banc.digest(json.dumps(exercise['examples'], ensure_ascii=False)) != precedent['exemples_sha256']:
                    raise RuntimeError('Exemple visible modifié : ' + exercise['id'])
                if condensat(SOURCE / definition['source']) != precedent['source_sha256']:
                    raise RuntimeError('Module de chapitre modifié : ' + exercise['id'])
            actifs = list(exercise['tests'][:MAX_TESTS])
            if exercise.get('verifyFirstExample') is True:
                actifs.append(exercise['examples'][0])
            tests = actifs + [
                {'stdin': case['entree'], 'expected': case['attendu'], 'label': f'Témoin {index + 1}'}
                for index, case in enumerate(definition['cas'])
            ]
            item = {
                'exercise': exercise, 'definition': definition, 'domaine_fini': domaine_fini,
                'domaine': domaine, 'controles_oracle': controles_oracle,
                'nombre_actifs': len(actifs), 'tests': tests, 'candidats': candidats(exercise, definition)
            }
            preparation.append(item)
            for index, candidat in enumerate(item['candidats']):
                for test in tests:
                    cle = (exercise['id'], index, test.get('stdin', ''))
                    if cle not in taches:
                        taches[cle] = pool.submit(banc.executer_solution, exercise, cle[2], candidat['code'])
    executions = {cle: tache.result() for cle, tache in taches.items()}
    candidats_evalues = []
    for item in preparation:
        for index, candidat in enumerate(item['candidats']):
            cases = [{
                'test': test,
                'resultat': executions[(item['exercise']['id'], index, test.get('stdin', ''))]
            } for test in item['tests']]
            candidats_evalues.append({
                'exercise': item['exercise'], 'code': candidat['code'], 'candidat': index,
                'nombre_actifs': item['nombre_actifs'], 'cases': cases
            })
    comparaisons = comparer(candidats_evalues)
    if len(comparaisons) != len(candidats_evalues):
        raise RuntimeError('Comparaisons incomplètes')
    par_candidat = {(item['id'], item['candidat']): item for item in comparaisons}
    resultats = []
    for item in preparation:
        exercise, definition = item['exercise'], item['definition']
        lignes = []
        for index, candidat in enumerate(item['candidats']):
            comparaison = par_candidat[(exercise['id'], index)]
            cases = candidats_evalues[3 * len(resultats) + index]['cases']
            if len(comparaison['cas']) != len(cases):
                raise RuntimeError('Matrice de cas incomplète')
            lignes.append({
                'nom': candidat['nom'], 'code_sha256': banc.digest(candidat['code']),
                'actifs': comparaison['actifs'],
                'cas': [{
                    'role': 'actif' if position < item['nombre_actifs'] else 'témoin',
                    'test': case['test'], 'execution': case['resultat'], 'comparaison': grade
                } for position, (case, grade) in enumerate(zip(cases, comparaison['cas']))]
            })
        temoins = [row['cas'][item['nombre_actifs']:] for row in lignes]
        reference = all(case['comparaison']['etat'] == 'accepté' for case in temoins[0])
        croisement = (
            [case['comparaison']['etat'] for case in temoins[1]] == ['rejeté : mauvaise sortie', 'accepté'] and
            [case['comparaison']['etat'] for case in temoins[2]] == ['accepté', 'rejeté : mauvaise sortie']
        )
        resultats.append({
            'id': exercise['id'], 'titre': exercise['title'], 'source': definition['source'],
            'source_sha256': condensat(SOURCE / definition['source']),
            'solution_sha256': banc.digest(exercise['solution']),
            'exemples_sha256': banc.digest(json.dumps(exercise['examples'], ensure_ascii=False)),
            'tests_initiaux': exercise['tests'] if phase == 'avant' else avant[exercise['id']]['tests_initiaux'],
            'exemple_active': exercise.get('verifyFirstExample') is True,
            'domaine_fini': item['domaine'],
            'precision': definition.get('precision', ''),
            'nouveaute_initiale': 'connus, domaine fini' if item['domaine_fini'] else 'deux entrées inédites contrôlées',
            'oracle': item['controles_oracle'], 'corrige_accepte_temoins': reference,
            'temoins_croises': croisement, 'candidats': lignes
        })
    compteurs = Counter()
    for resultat in resultats:
        compteurs['fiches'] += 1
        compteurs['temoins_inedits'] += 0 if resultat['domaine_fini'] else 2
        compteurs['temoins_connus_domaine_fini'] += 2 if resultat['domaine_fini'] else 0
        compteurs['corriges_acceptes_actifs'] += resultat['candidats'][0]['actifs']['etat'] == 'accepté'
        compteurs['corriges_acceptes_temoins'] += resultat['corrige_accepte_temoins']
        compteurs['paires_croisees'] += resultat['temoins_croises']
        for candidat in resultat['candidats'][1:]:
            compteurs['mutants_' + candidat['actifs']['etat']] += 1
    stable = empreintes_sources() == empreintes_initiales
    if not stable:
        raise RuntimeError('Une source a changé pendant la mesure')
    mesure_complete = (
        compteurs['corriges_acceptes_actifs'] == 17 and compteurs['corriges_acceptes_temoins'] == 17 and
        compteurs['paires_croisees'] == 17 and
        sum(compteurs['mutants_' + etat] for etat in ('accepté', 'rejeté : mauvaise sortie')) == 34
    )
    rapport = {
        'phase': phase, 'debut_utc': debut, 'fin_utc': date_utc(), 'mesure_complete': mesure_complete,
        'compteurs': dict(compteurs),
        'versions': {
            'manifeste_sha256': condensat(ROOT / 'cas_rd_winserver.json'),
            'oracle_sha256': condensat(ROOT / 'rd_winserver.py'),
            'banc_commun_sha256': condensat(ROOT / 'banc.py'),
            'lanceur_commun_sha256': condensat(ROOT / 'rejouer.sh'),
            'catalogue_sha256': condensat(SOURCE / 'rd_winserver.js'),
            'runner_sha256': condensat(SOURCE / 'runner.js'),
            'partie2_sha256': condensat(RESULTATS / 'partie2.tsv'),
            'pwsh_sha256': condensat('/runtimes/powershell/pwsh'),
            'pwsh_version': version['sortie'].strip(),
            'rapport_initial_sha256': condensat(RESULTATS / 'avant.json') if phase == 'apres' else None
        },
        'isolation': isolation,
        'autocontroles': {
            'sources_stables': stable,
            'rejet_ancien_test': garde_nouveaute if phase == 'avant' else 'vérifié dans le rapport initial',
            'oracle_par_fiche': all(all(item['oracle'].values()) for item in resultats)
        },
        'limites': [
            'Les témoins inédits sont comparés aux exemples, tests et représentations contrôlées du catalogue initial ; aucun contrôle ne couvre tous les encodages ou toutes les dépendances.',
            'Les deux domaines finis ont des scénarios déjà connus : ils ne remplissent pas le critère de nouveauté sémantique.',
            'Le croisement démontre seulement une séparation des deux mutants choisis sur les deux cas, pas une indépendance universelle ni une correction générale.',
            'L’oracle séparé et les attendus manuels découlent de la même lecture des énoncés et ne constituent pas une expertise humaine indépendante.',
            'Les cellules sont exécutées séparément en local ; runTests reçoit les sorties préalablement obtenues et reproduit son arrêt au premier échec.',
            'Bubblewrap sépare les espaces de noms et limite les ressources localement, sans cgroup ni profil seccomp dédié ; ce n’est pas une garantie pour du code hostile en production.',
            'Aucun fournisseur distant ni environnement Windows n’est exécuté ; les sommes et valeurs évaluées restent dans le domaine borné de l’oracle.'
        ],
        'exercices': resultats
    }
    print(json.dumps(rapport, ensure_ascii=False, indent=2))
    if not mesure_complete:
        return 1
    if phase == 'apres' and compteurs['mutants_rejeté : mauvaise sortie'] != 34:
        return 1
    return 0


if __name__ == '__main__':
    try:
        if len(sys.argv) != 2 or sys.argv[1] not in {'avant', 'apres'}:
            raise RuntimeError('Phase avant ou apres requise')
        sys.exit(main(sys.argv[1]))
    except Exception as erreur:
        print(json.dumps({'etat': 'erreur_infrastructure', 'raison': str(erreur)}, ensure_ascii=False))
        sys.exit(2)
