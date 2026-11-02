import importlib.util
import json
import sys
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
oracle = importer('oracle_react_b2', 'react_b2.py')
mutations = importer('mutations_react_b2', 'react_b2_variantes.py')


def executer(exercice, source, entree):
    resultat = banc.executer_solution(exercice, entree, replacement=source)
    if resultat['etat'] != 'exécuté':
        return {'entree': entree, **resultat}
    return {'entree': entree, 'etat': 'exécuté', 'sortie': resultat['sortie'], 'code_sortie': 0}


def verifier_temoin(exercice, source, cas):
    resultat = executer(exercice, source, cas['entree'])
    if resultat['etat'] != 'exécuté':
        return resultat
    resultat['etat_comparaison'] = 'conforme' if banc.normaliser(resultat['sortie']) == banc.normaliser(cas['attendu']) else 'incorrect'
    return resultat


def main():
    banc.controler_enveloppe()
    banc.initialiser_nss()
    isolation = banc.verification_isolation()
    definitions = json.loads((RACINE / 'cas_react_b2.json').read_text(encoding='utf-8'))['exercices']
    attendus = {f'rx2-c{chapitre}-e{numero}' for chapitre in range(1, 7) for numero in range(1, 4)} - {'rx2-c1-e1', 'rx2-c1-e2'}
    if len(definitions) != 16 or {definition['id'] for definition in definitions} != attendus:
        raise ValueError('Périmètre React incomplet ou dupliqué')
    catalogue = {exercice['id']: exercice for exercice in banc.charger_catalogue() if exercice['id'] in attendus}
    if set(catalogue) != attendus:
        raise ValueError('Catalogue React incomplet')
    anciens_paquets = banc.PAQUETS_SUPPLEMENTAIRES
    try:
        banc.PAQUETS_SUPPLEMENTAIRES = (('cas_react_b2.json', 'react_b2.py', 'rx2-'),)
        controles = banc.tester_garde_paquets({definition['id']: {**definition, 'paquet_oracle': 'react_b2.py'} for definition in definitions})['react_b2.py']
    finally:
        banc.PAQUETS_SUPPLEMENTAIRES = anciens_paquets

    lignes = []
    demandes = []
    for definition in definitions:
        identifiant = definition['id']
        exercice = catalogue[identifiant]
        if exercice['language'] != 'javascript' or definition['oracle'] != identifiant:
            raise ValueError('Association à une fiche React incorrecte')
        generalisation = banc.auditer_exercice(exercice, {**definition, 'paquet_oracle': 'react_b2.py'})
        controles_actifs = []
        for test in exercice['tests'][:7]:
            try:
                sortie_oracle = oracle.calculer(identifiant, test['stdin'])
                etat = 'conforme' if banc.normaliser(sortie_oracle) == banc.normaliser(test['expected']) else 'contradiction'
            except (ValueError, IndexError, KeyError, TypeError):
                etat = 'non qualifiable'
            controles_actifs.append({'label': test.get('label', ''), 'etat': etat})
        presentation = {cle: exercice[cle] for cle in ('id', 'language', 'tests')}
        for cle in ('examples', 'verifyFirstExample', 'requiredShebang'):
            if cle in exercice:
                presentation[cle] = exercice[cle]
        actifs = exercice['tests'][:7]
        if exercice.get('verifyFirstExample') is True:
            actifs = [*actifs, exercice['examples'][0]]
        sources = [{'nom': 'corrige', 'description': 'Corrigé du catalogue', 'source': exercice['solution']}, *mutations.construire(identifiant, exercice['solution'])]
        for source in sources:
            source['sha256'] = banc.digest(source['source'])
            source['temoins'] = [verifier_temoin(exercice, source['source'], cas) for cas in definition['cas']]
            source['executions_actives'] = [executer(exercice, source['source'], test['stdin']) for test in actifs]
            demandes.append({'cle': identifiant + '/' + source['nom'], 'exercice': presentation, 'source': source['source'], 'executions': source['executions_actives']})
        lignes.append({'id': identifiant, 'generalisation': generalisation, 'tests_actifs_controle_oracle': controles_actifs, 'corrige': sources[0], 'variantes': sources[1:]})

    appel = banc.executer_commande(['/toolchain/node', '/trusted/b1_git_grader.js'], json.dumps(demandes, ensure_ascii=False), timeout=120, max_output=8388608, inclure_stderr=True)
    if appel['code'] != 0 or appel['expiration'] or appel['sortie_trop_longue']:
        raise RuntimeError('Correcteur réel indisponible : ' + appel.get('stderr', '')[:300])
    reponse = json.loads(appel['stdout'])
    notes = {note['cle']: note for note in reponse['reponses']}
    if reponse['max_tests'] != 7 or len(notes) != len(demandes):
        raise ValueError('Réponses incomplètes ou dupliquées du correcteur')
    for ligne in lignes:
        for source in [ligne['corrige'], *ligne['variantes']]:
            source['correcteur'] = notes[ligne['id'] + '/' + source['nom']]

    variantes = [variante for ligne in lignes for variante in ligne['variantes']]
    generalisation = Counter(ligne['generalisation']['etat'] for ligne in lignes)
    notes_corriges = Counter(ligne['corrige']['correcteur']['etat'] for ligne in lignes)
    notes_variantes = Counter(variante['correcteur']['etat'] for variante in variantes)
    controles_actifs = Counter(controle['etat'] for ligne in lignes for controle in ligne['tests_actifs_controle_oracle'])
    erreurs_etablies = sum(any(temoin.get('etat_comparaison') == 'incorrect' for temoin in variante['temoins']) for variante in variantes)
    non_evalues = sum(temoin['etat'] != 'exécuté' for ligne in lignes for source in [ligne['corrige'], *ligne['variantes']] for temoin in source['temoins'])
    reussi = generalisation == {'réussi': 16} and notes_corriges == {'accepté': 16} and notes_variantes == {'rejeté': 32} and erreurs_etablies == 32 and not non_evalues and not controles_actifs['contradiction'] and not controles_actifs['non qualifiable'] and all(controles.values())
    rapport = {
        'etat': 'réussi' if reussi else 'échoué',
        'date_utc': datetime.now(timezone.utc).isoformat(),
        'perimetre': '16 exercices React précédemment non évalués',
        'methode': 'Deux entrées inédites à attendus manuels confirmés par un oracle Python indépendant ; programmes et mutations exécutés isolément ; comparaison par le correcteur réel runTests.',
        'isolation': isolation,
        'autocontroles_paquet': controles,
        'empreintes': {nom: banc.digest((RACINE / nom).read_bytes()) for nom in ('cas_react_b2.json', 'react_b2.py', 'react_b2_variantes.py', 'react_b2_banc.py', 'banc.py', 'b1_git_grader.js')},
        'bilan': {'exercices': len(lignes), 'temoins': sum(len(definition['cas']) for definition in definitions), 'generalisation': dict(generalisation), 'corriges_tests_actifs': dict(notes_corriges), 'variantes': len(variantes), 'variantes_incorrectes_sur_temoins': erreurs_etablies, 'variantes_tests_actifs': dict(notes_variantes), 'tests_actifs_qualifies': dict(controles_actifs), 'temoins_non_evalues': non_evalues},
        'limites': ['Ces exemples et mutations ne prouvent pas la correction universelle.', 'Les mutations sont évaluées sur leurs sorties ; elles ne vérifient pas le caractère réellement immuable du code.'],
        'exercices': lignes
    }
    print(json.dumps(rapport, ensure_ascii=False, indent=2))
    return 0 if reussi else 1


if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except Exception as erreur:
        print(json.dumps({'etat': 'erreur_infrastructure', 'raison': str(erreur)}, ensure_ascii=False))
        raise SystemExit(2)
