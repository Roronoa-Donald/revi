import concurrent.futures
import copy
import importlib.util
import json
import re
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path('/trusted')
SOURCE = Path('/project/server/exercises')
REFERENCE = Path('/reference')
MAX_TESTS = 7


def importer(nom, chemin):
    specification = importlib.util.spec_from_file_location(nom, chemin)
    module = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(module)
    return module


banc = importer('banc_generalisation', ROOT / 'banc.py')
oracle = importer('oracle_rd_winserver', ROOT / 'rd_winserver.py')
semantique = importer('semantique_rd_winserver', ROOT / 'rd_winserver_complement_semantique.py')
banc.oracles_supplementaires['rd_winserver.py'] = oracle


def date_utc():
    return datetime.now(timezone.utc).isoformat(timespec='seconds')


def condensat(chemin):
    return banc.digest(Path(chemin).read_bytes())


def empreintes_sources():
    chemins = sorted(path for path in SOURCE.rglob('*') if path.is_file() and path.suffix in {'.js', '.json'})
    chemins += sorted(path for path in Path('/project/server/services/execution').glob('*.js') if path.is_file())
    chemins += [ROOT / nom for nom in (
        'banc.py', 'rejouer.sh', 'oracles.py', 'algo_b1.py', 'algo_b3_1.py', 'algo_b3_2.py',
        'linux_b2.py', 'flask_b2.py', 'java_b2.py', 'rd_winserver.py', 'cas_rd_winserver.json',
        'rd_winserver_comparer.js', 'cas_rd_winserver_complement.json',
        'rd_winserver_complement_semantique.py', 'rd_winserver_complement_banc.py',
        'rd_winserver_complement_rejouer.sh'
    )]
    chemins += [REFERENCE / 'partie2.tsv', REFERENCE / 'avant.json', REFERENCE / 'apres.json',
                Path('/runtimes/powershell/pwsh')]
    return {str(path): condensat(path) for path in chemins}


def erreur_attendue(fonction):
    try:
        fonction()
    except (ValueError, KeyError, TypeError):
        return True
    return False


def controles_oracle(definition):
    controlee = {**definition, 'paquet_oracle': 'rd_winserver.py'}
    banc.controler_attendus(controlee)
    fausse = copy.deepcopy(controlee)
    fausse['cas'][0]['attendu'] += ' volontairement faux'
    attendu_errone = erreur_attendue(lambda: banc.controler_attendus(fausse))
    absente = copy.deepcopy(controlee)
    absente['oracle'] = 'oracle_absent'
    oracle_absent = erreur_attendue(lambda: banc.controler_attendus(absente))
    if not attendu_errone or not oracle_absent:
        raise RuntimeError('Autocontrôle de l’oracle en échec : ' + definition['id'])
    return {'attendu_errone_rejete': attendu_errone, 'oracle_absent_rejete': oracle_absent}


def controles_semantiques():
    variantes = {
        'permutation_rejetee': ('ws2-c1-e1', '3\n3\n6\n12', '3\n12\n3\n6'),
        'renommage_rejete': ('ws2-c5-e1', '1\nHyper-V', '1\nAutre-V'),
        'espaces_rejetes': ('ws2-c1-e2', '2\n4\noui', '2\n  4  \noui'),
        'zeros_de_tete_rejetes': ('ws2-c4-e2', '084', '84'),
    }
    controles = {
        nom: erreur_attendue(lambda: semantique.verifier_distincts(identifiant, [ancien], [nouveau]))
        for nom, (identifiant, ancien, nouveau) in variantes.items()
    }
    if not all(controles.values()):
        raise RuntimeError('Autocontrôle de la distinction sémantique en échec')
    return controles


def verifier_fini(exercise):
    connus = {item.get('stdin', '').casefold() for item in exercise['examples'] + exercise['tests']}
    if exercise['id'] == 'ws2-c5-e2':
        domaine = {'nat', 'bridge', 'host-only'}
    elif exercise['id'] == 'ws2-c6-e2':
        domaine = {f'{clone}\n{suppression}' for clone in ('complet', 'lie') for suppression in ('oui', 'non')}
    else:
        raise RuntimeError('Domaine fini inattendu')
    if not domaine <= connus:
        raise RuntimeError('Le domaine fini n’est pas couvert par les exemples et tests connus')
    return sorted(domaine)


def comparer(candidats):
    if not candidats:
        return []
    options = banc.base_bwrap() + [
        '--dir', '/project', '--dir', '/project/server',
        '--ro-bind', '/project/server/exercises', '/project/server/exercises',
        '--dir', '/project/server/services',
        '--ro-bind', '/project/server/services/execution', '/project/server/services/execution',
        '--ro-bind', str(ROOT / 'rd_winserver_comparer.js'), '/comparateur.js'
    ]
    commande = banc.commande_bornee(options, ['/toolchain/node', '/comparateur.js'], 'javascript', export=True)
    resultat = banc.executer_commande(
        commande, json.dumps({'candidats': candidats}, ensure_ascii=False), timeout=90,
        max_output=8_388_608, inclure_stderr=True
    )
    if resultat['code'] != 0 or resultat['expiration'] or resultat['sortie_trop_longue']:
        raise RuntimeError('Comparateur runTests indisponible : ' + resultat.get('stderr', '')[:500])
    rapport = json.loads(resultat['stdout'])
    if rapport['max_tests'] != MAX_TESTS or len(rapport['resultats']) != len(candidats):
        raise RuntimeError('Rapport runTests incomplet')
    return rapport['resultats']


def main():
    debut = date_utc()
    banc.controler_enveloppe()
    banc.initialiser_nss()
    isolation = banc.verification_isolation()
    version = banc.executer_solution({
        'language': 'powershell', 'solution': '[Console]::WriteLine($PSVersionTable.PSVersion.ToString())\n'
    }, '')
    if version.get('etat') != 'exécuté' or not re.fullmatch(r'\d+\.\d+\.\d+', version['sortie'].strip()):
        raise RuntimeError('PowerShell isolé indisponible')
    empreintes_initiales = empreintes_sources()
    manifeste = json.loads((ROOT / 'cas_rd_winserver_complement.json').read_text(encoding='utf-8'))
    precedent = json.loads((ROOT / 'cas_rd_winserver.json').read_text(encoding='utf-8'))
    avant = json.loads((REFERENCE / 'avant.json').read_text(encoding='utf-8'))
    apres = json.loads((REFERENCE / 'apres.json').read_text(encoding='utf-8'))
    if avant.get('phase') != 'avant' or apres.get('phase') != 'apres' or not avant.get('mesure_complete') or not apres.get('mesure_complete'):
        raise RuntimeError('Rapports précédents incomplets')
    if avant['versions']['manifeste_sha256'] != condensat(ROOT / 'cas_rd_winserver.json'):
        raise RuntimeError('Manifeste de la mesure initiale modifié')
    if avant['versions']['oracle_sha256'] != condensat(ROOT / 'rd_winserver.py'):
        raise RuntimeError('Oracle de la mesure initiale modifié')
    if apres['versions']['catalogue_sha256'] != condensat(SOURCE / 'rd_winserver.js'):
        raise RuntimeError('Catalogue différent de la mesure précédente')
    if avant['versions']['runner_sha256'] != condensat(SOURCE / 'runner.js'):
        raise RuntimeError('Comparateur actif différent de la mesure précédente')
    if avant['versions']['partie2_sha256'] != condensat(REFERENCE / 'partie2.tsv'):
        raise RuntimeError('Rapport de périmètre partie 2 modifié')
    nouvelles, finies = manifeste['exercices'], manifeste['non_evalues']
    identifiants = [item['id'] for item in nouvelles + finies]
    partie2 = {line.split('\t', 1)[0] for line in (REFERENCE / 'partie2.tsv').read_text(encoding='utf-8').splitlines() if line.startswith('ws2-')}
    if len(nouvelles) != 15 or len(finies) != 2 or len(set(identifiants)) != 17 or set(identifiants) != partie2:
        raise RuntimeError('Périmètre de partie 2 incorrect')
    if {item['id'] for item in finies} != {'ws2-c5-e2', 'ws2-c6-e2'} or 'ws2-c4-e3' in identifiants:
        raise RuntimeError('Domaines finis ou fiche déjà évaluée incorrects')
    avant_par_id = {item['id']: item for item in avant['exercices']}
    precedent_par_id = {item['id']: item for item in precedent['exercices']}
    catalogue = {item['id']: item for item in banc.charger_catalogue() if item['id'] in identifiants}
    if set(catalogue) != set(identifiants) or set(avant_par_id) != set(identifiants):
        raise RuntimeError('Catalogue ou historique incomplet')
    semantique_controles = controles_semantiques()
    preparation = []
    domaines = []
    for definition in nouvelles + finies:
        identifiant = definition['id']
        exercise = catalogue[identifiant]
        ancien = avant_par_id[identifiant]
        if exercise['language'] != 'powershell':
            raise RuntimeError('Langage inattendu : ' + identifiant)
        if banc.digest(exercise['solution']) != ancien['solution_sha256']:
            raise RuntimeError('Corrigé modifié depuis le rapport initial : ' + identifiant)
        if exercise['tests'][:len(ancien['tests_initiaux'])] != ancien['tests_initiaux']:
            raise RuntimeError('Tests historiques modifiés ou déplacés : ' + identifiant)
        if banc.digest(json.dumps(exercise['examples'], ensure_ascii=False)) != ancien['exemples_sha256']:
            raise RuntimeError('Exemple historique modifié : ' + identifiant)
        if condensat(SOURCE / ancien['source']) != ancien['source_sha256']:
            raise RuntimeError('Chapitre modifié depuis le rapport initial : ' + identifiant)
        if identifiant in {'ws2-c5-e2', 'ws2-c6-e2'}:
            domaines.append({**definition, 'etat': 'non évalué', 'valeurs_deja_connues': verifier_fini(exercise), 'executions': 0})
            continue
        source = banc.verifier_source(exercise, definition)
        actifs = list(exercise['tests'][:MAX_TESTS])
        if exercise.get('verifyFirstExample') is True:
            actifs.append(exercise['examples'][0])
        cas_precedents = precedent_par_id[identifiant]['cas']
        for cas in cas_precedents:
            if not any(banc.canonique(test.get('stdin', ''), definition['codec']) == banc.canonique(cas['entree'], definition['codec'])
                       and banc.normaliser(test.get('expected', '')) == banc.normaliser(cas['attendu']) for test in actifs):
                raise RuntimeError('Ancien témoin non actif : ' + identifiant)
        historique = copy.deepcopy(exercise)
        historique['tests'] = ancien['tests_initiaux'] + exercise['tests']
        banc.verifier_nouveaute(historique, definition, source)
        anciens = [item.get('stdin', '') for item in historique['examples'] + historique['tests']]
        entrees = [case['entree'] for case in definition['cas']]
        semantique.verifier_distincts(identifiant, anciens, entrees)
        modifiee = copy.deepcopy(definition)
        ancien_long = next(item for item in historique['tests'] if len(item.get('stdin', '').rstrip('\n')) >= 3)
        modifiee['cas'][0]['entree'] = ancien_long['stdin']
        if not erreur_attendue(lambda: banc.verifier_nouveaute(historique, modifiee, source)):
            raise RuntimeError('Un ancien test est accepté comme inédit : ' + identifiant)
        controles = controles_oracle(definition)
        preparation.append({'exercise': exercise, 'definition': definition, 'controles_oracle': controles,
                            'nombre_tests_actifs': len(actifs), 'nombre_tests_historiques': len(ancien['tests_initiaux'])})
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        taches = {
            (item['exercise']['id'], index): pool.submit(banc.executer_solution, item['exercise'], case['entree'])
            for item in preparation for index, case in enumerate(item['definition']['cas'])
        }
        executions = {cle: tache.result() for cle, tache in taches.items()}
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        audits = {
            item['exercise']['id']: pool.submit(
                banc.auditer_exercice, item['exercise'], {**item['definition'], 'paquet_oracle': 'rd_winserver.py'}
            ) for item in preparation
        }
        audits = {identifiant: tache.result() for identifiant, tache in audits.items()}
    candidats = []
    cles_comparaison = []
    for item in preparation:
        exercise = item['exercise']
        for index, case in enumerate(item['definition']['cas']):
            cle = (exercise['id'], index)
            execution = executions[cle]
            if execution.get('etat') != 'exécuté':
                continue
            test = {'stdin': case['entree'], 'expected': case['attendu'], 'label': f'Complément {index + 1}'}
            fiche = {**exercise, 'tests': [test], 'verifyFirstExample': False}
            candidats.append({'exercise': fiche, 'code': exercise['solution'], 'candidat': f'complément {index + 1}',
                              'nombre_actifs': 1, 'cases': [{'test': test, 'resultat': execution}]})
            cles_comparaison.append(cle)
    comparisons = comparer(candidats)
    par_cle = {}
    for cle, comparaison in zip(cles_comparaison, comparisons):
        if comparaison['id'] != cle[0] or len(comparaison['cas']) != 1:
            raise RuntimeError('Résultat runTests associé à une autre fiche')
        if comparaison['cas'][0]['etat'] != comparaison['actifs']['etat']:
            raise RuntimeError('Comparaisons runTests contradictoires')
        par_cle[cle] = comparaison['cas'][0]
    resultats = []
    compteurs = Counter()
    for item in preparation:
        exercise = item['exercise']
        definition = item['definition']
        cas = []
        for index, case in enumerate(definition['cas']):
            cle = (exercise['id'], index)
            execution = executions[cle]
            comparaison = par_cle.get(cle, {'etat': 'non évalué', 'raison': execution.get('raison', 'exécution indisponible')})
            compteurs['cas_' + comparaison['etat']] += 1
            cas.append({**case, 'oracle_independant': oracle.calculer(definition['oracle'], case['entree']),
                        'signature_semantique': semantique.signature(exercise['id'], case['entree']),
                        'execution': execution, 'comparaison_runTests': comparaison})
        resultats.append({
            'id': exercise['id'], 'titre': exercise['title'], 'source': definition['source'],
            'solution_sha256': banc.digest(exercise['solution']), 'tests_historiques': item['nombre_tests_historiques'],
            'tests_actifs': item['nombre_tests_actifs'], 'anciens_temoins_actifs': True,
            'nouveaute_litterale_et_canonique': True, 'signatures_et_permutations_distinctes': True,
            'autocontroles_oracle': item['controles_oracle'], 'audit_banc_commun': audits[exercise['id']], 'cas': cas
        })
    stable = empreintes_sources() == empreintes_initiales
    if not stable:
        raise RuntimeError('Une source a changé pendant la mesure')
    compteurs['fiches_domaine_non_fini'] = len(resultats)
    compteurs['fiches_domaine_fini_non_evaluees'] = len(domaines)
    compteurs['executions_corriges'] = len(executions)
    compteurs['fiches_reussies_banc_commun'] = sum(audit['etat'] == 'réussi' for audit in audits.values())
    compteurs['cas_banc_commun'] = sum(len(audit.get('cas', [])) for audit in audits.values())
    complete = (len(resultats) == 15 and len(domaines) == 2 and len(executions) == 30 and compteurs['cas_accepté'] == 30
                and compteurs['fiches_reussies_banc_commun'] == 15 and compteurs['cas_banc_commun'] == 30)
    rapport = {
        'debut_utc': debut, 'fin_utc': date_utc(), 'mesure_complete': complete, 'compteurs': dict(compteurs),
        'versions': {
            'catalogue_sha256': condensat(SOURCE / 'rd_winserver.js'),
            'runner_sha256': condensat(SOURCE / 'runner.js'),
            'manifeste_sha256': condensat(ROOT / 'cas_rd_winserver_complement.json'),
            'oracle_sha256': condensat(ROOT / 'rd_winserver.py'),
            'garde_semantique_sha256': condensat(ROOT / 'rd_winserver_complement_semantique.py'),
            'pilote_sha256': condensat(ROOT / 'rd_winserver_complement_banc.py'),
            'lanceur_sha256': condensat(ROOT / 'rd_winserver_complement_rejouer.sh'),
            'banc_commun_sha256': condensat(ROOT / 'banc.py'),
            'lanceur_commun_sha256': condensat(ROOT / 'rejouer.sh'),
            'rapport_avant_sha256': condensat(REFERENCE / 'avant.json'),
            'rapport_apres_sha256': condensat(REFERENCE / 'apres.json'),
            'partie2_sha256': condensat(REFERENCE / 'partie2.tsv'),
            'pwsh_sha256': condensat('/runtimes/powershell/pwsh'), 'pwsh_version': version['sortie'].strip()
        },
        'isolation': isolation,
        'autocontroles': {**semantique_controles, 'ancien_test_rejete_par_fiche': True,
                          'oracle_controle_par_fiche': True, 'sources_stables': stable},
        'limites': [
            'Les signatures ne démontrent pas une équivalence sémantique universelle : elles explicitent les dimensions choisies pour comparer les situations.',
            'Pour le nom de produit, la distinction porte sur la structure de la version et sa restitution, sans nouvelle catégorie d’hyperviseur.',
            'Les âges 0 et 365 distinguent des situations temporelles mais ne créent pas de nouvelle branche au-delà du seuil de 7 jours.',
            'Les attendus manuels et l’oracle séparé partagent la même lecture des énoncés ; aucune indépendance humaine n’est revendiquée.',
            'Les valeurs nulles sont admises faute de borne positive explicite ; le domaine évalué est borné par l’oracle.',
            'runTests reçoit les sorties isolées déjà obtenues pour une fiche synthétique à un cas ; aucun fournisseur distant ni Windows n’est exécuté.',
            'Le banc commun est appelé fiche par fiche, mais le paquet n’est pas enregistré dans son lancement global.',
            'Bubblewrap sépare les espaces de noms et limite les ressources, sans cgroup ni profil seccomp dédié.'
        ],
        'exercices': resultats, 'domaines_finis_non_evalues': domaines
    }
    print(json.dumps(rapport, ensure_ascii=False, indent=2))
    return 0 if complete else 1


if __name__ == '__main__':
    try:
        sys.exit(main())
    except Exception as erreur:
        print(json.dumps({'etat': 'erreur_infrastructure', 'raison': str(erreur)}, ensure_ascii=False))
        sys.exit(2)
