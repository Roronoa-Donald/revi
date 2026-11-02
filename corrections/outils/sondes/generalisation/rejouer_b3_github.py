#!/usr/bin/env python3
"""Rejoue les 17 fiches suspendues GitHub B3 dans des sandbox distinctes.

L'extracteur ne fait qu'intercepter les entrées des anciens générateurs ; il
n'exécute aucun corrigé. Chaque exécution d'un corrigé ou d'un mutant reçoit
uniquement son propre programme et une entrée sur stdin, dans un Bubblewrap
neuf, sans réseau ni accès au dépôt, à l'oracle, aux autres programmes ou au
répertoire personnel. Les fichiers du paquet sont copiés et vérifiés avant et
après le rejeu ; ces copies successives ne sont pas un instantané atomique.
"""

import argparse
import ast
import base64
from collections import Counter
import copy
from datetime import datetime, timezone
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import time


PACKAGE = Path('corrections/outils/sondes/generalisation')
HISTORICAL_CASES = (
    'cas.json', 'cas_algo.json', 'cas_algo_b3_1.json', 'cas_algo_b3_2.json',
    'cas_flask_b2.json', 'cas_java_b2.json', 'cas_linux_b2.json',
)
SOURCES = (
    'server/exercises/b3-github.js',
    'server/exercises/grading-policy.js',
    'server/exercises/grading-evidence.json',
    'server/exercises/grading-runtime-evidence.json',
    'server/exercises/runner.js',
    'server/services/execution/index.js',
    'tests/b3-github-lot1.test.js',
    'corrections/resultats/generalisation-lot1-partie2-complement.json',
    'corrections/outils/sondes/nouvelles-fixtures-suspendus/fixtures/b3-github.json',
    'corrections/outils/sondes/suspendus-oracles/temoins.json',
    'corrections/outils/sondes/suspendus-oracles/oracles.py',
    *(f'server/exercises/b3-github/chapitre{chapter}.js' for chapter in range(1, 7)),
    *(str(PACKAGE / name) for name in HISTORICAL_CASES),
    *(str(PACKAGE / name) for name in (
        'banc.py', 'b3_github.py', 'cas_b3_github.json', 'mutants_b3_github.py',
        'extraire_b3_github.js', 'comparer_b3_github.js', 'rejouer_b3_github.py',
    )),
)
MAX_OUTPUT = 262144


def _sha(data):
    if isinstance(data, str):
        data = data.encode('utf-8')
    return hashlib.sha256(data).hexdigest()


def _read_json(path):
    return json.loads(path.read_text(encoding='utf-8'))


def _snapshot(root, destination):
    hashes = {}
    for relative in SOURCES:
        source = root / relative
        if source.is_symlink() or not source.is_file() or not source.resolve().is_relative_to(root):
            raise RuntimeError(f'Source absente ou non autorisée : {relative}')
        content = source.read_bytes()
        hashes[relative] = _sha(content)
        copy = destination / relative
        copy.parent.mkdir(parents=True, exist_ok=True)
        copy.write_bytes(content)
    changed = [name for name, digest in hashes.items() if _sha((root / name).read_bytes()) != digest]
    if changed:
        raise RuntimeError(f'Sources modifiées pendant la copie : {changed}')
    return hashes


def _load_module(path, name):
    specification = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(module)
    return module


def _sandbox_base(mask_git=True):
    bwrap = shutil.which('bwrap')
    if not bwrap or not os.access('/usr/bin/prlimit', os.X_OK):
        raise RuntimeError('Bubblewrap ou prlimit absent')
    arguments = [
        bwrap, '--die-with-parent', '--unshare-all', '--new-session', '--clearenv',
        '--cap-drop', 'ALL', '--ro-bind', '/usr', '/usr',
    ]
    for directory in ('/bin', '/lib', '/lib64', '/sbin'):
        if os.path.islink(directory):
            arguments.extend(['--symlink', os.readlink(directory), directory])
        elif os.path.isdir(directory):
            arguments.extend(['--ro-bind', directory, directory])
    arguments.extend([
        '--dir', '/etc', '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp',
        '--chdir', '/tmp', '--setenv', 'PATH', '/usr/bin:/bin',
        '--setenv', 'LANG', 'C.UTF-8', '--setenv', 'LC_ALL', 'C.UTF-8',
        '--setenv', 'AUDIT_PARENT_NET', os.readlink('/proc/self/ns/net'),
    ])
    if mask_git and os.path.isfile('/usr/bin/git'):
        arguments.extend(['--ro-bind', '/dev/null', '/usr/bin/git'])
    if mask_git and os.path.isdir('/usr/lib/git-core'):
        arguments.extend(['--tmpfs', '/usr/lib/git-core'])
    return arguments


def _bounded_run(base, mounts, command, stdin='', timeout=12, limit=MAX_OUTPUT, memory=536870912):
    arguments = base + mounts + [
        '--', '/usr/bin/prlimit', '--cpu=6:6', f'--as={memory}:{memory}',
        f'--fsize={limit}:{limit}', '--nofile=128:128', '--core=0:0', '--', *command,
    ]
    started = time.monotonic()
    with tempfile.TemporaryFile() as stdout, tempfile.TemporaryFile() as stderr:
        try:
            process = subprocess.run(
                arguments, input=stdin.encode('utf-8'), stdout=stdout, stderr=stderr,
                timeout=timeout, check=False,
            )
            code = process.returncode
            expired = False
        except subprocess.TimeoutExpired:
            code = None
            expired = True
        sizes = (os.fstat(stdout.fileno()).st_size, os.fstat(stderr.fileno()).st_size)
        stdout.seek(0)
        stderr.seek(0)
        stdout_bytes = stdout.read(limit + 1)
        stderr_bytes = stderr.read(limit + 1)
    try:
        output = stdout_bytes.decode('utf-8')
        errors = stderr_bytes.decode('utf-8')
        encoding_error = False
    except UnicodeDecodeError:
        output = stdout_bytes.decode('utf-8', errors='replace')
        errors = stderr_bytes.decode('utf-8', errors='replace')
        encoding_error = True
    return {
        'code': code,
        'expiration': expired,
        'sortie_trop_longue': any(size > limit for size in sizes),
        'utf8_invalide': encoding_error,
        'stdout': output,
        'stderr': errors,
        'duree_ms': round((time.monotonic() - started) * 1000, 2),
    }


def _require_run(result, purpose):
    if (result['code'] != 0 or result['expiration'] or result['sortie_trop_longue']
            or result['utf8_invalide']):
        raise RuntimeError(f"{purpose} impossible : code={result['code']} stderr={result['stderr'][:500]}")
    return result['stdout']


def _sandbox_check(base):
    program = (
        'import json,os,pathlib; '
        'p=pathlib.Path; '
        'print(json.dumps({'
        '"pid1_bwrap":p("/proc/1/comm").read_text().strip()=="bwrap",'
        '"reseau_separe":os.readlink("/proc/self/ns/net")!=os.environ["AUDIT_PARENT_NET"],'
        '"seule_boucle_locale":[line.split(":",1)[0].strip() for line in '
        'p("/proc/net/dev").read_text().splitlines()[2:] if line.strip()]==["lo"],'
        '"home_absent":not p("/home").exists(),'
        '"variable_home_absente":"HOME" not in os.environ,'
        '"projet_absent":not p("/project").exists(),'
        '"source_absente":not p("/snapshot").exists(),'
        '"oracle_absent":not p("/trusted").exists(),'
        '"git_masque":not os.access("/usr/bin/git",os.X_OK),'
        '"git_core_masque":not p("/usr/lib/git-core/git").exists()}))'
    )
    result = _bounded_run(base, [], ['/usr/bin/python3', '-I', '-c', program])
    checks = json.loads(_require_run(result, 'Autocontrôle de l’isolation'))
    if not checks or not all(checks.values()):
        raise RuntimeError(f'Isolation incomplète : {checks}')
    return checks


def _node_mounts(node, files):
    mounts = ['--dir', '/toolchain', '--ro-bind', node, '/toolchain/node', '--dir', '/snapshot']
    for source, name in files:
        mounts.extend(['--ro-bind', str(source), '/snapshot/' + name])
    return mounts


def _extract(base, node, snapshot):
    files = [
        (snapshot / 'server/exercises/b3-github.js', 'course.js'),
        (snapshot / 'tests/b3-github-lot1.test.js', 'tests.js'),
        (snapshot / 'server/exercises/grading-policy.js', 'policy.js'),
        (snapshot / 'server/exercises/grading-evidence.json', 'grading-evidence.json'),
        (snapshot / 'server/exercises/grading-runtime-evidence.json', 'grading-runtime-evidence.json'),
        (snapshot / PACKAGE / 'extraire_b3_github.js', 'extract.js'),
        *((snapshot / f'server/exercises/b3-github/chapitre{chapter}.js', f'legacy{chapter}.js')
          for chapter in range(1, 7)),
    ]
    result = _bounded_run(
        base, _node_mounts(node, files),
        ['/toolchain/node', '--max-old-space-size=256', '/snapshot/extract.js', '/snapshot/course.js',
         '/snapshot/tests.js', '/snapshot/policy.js', *(f'/snapshot/legacy{chapter}.js' for chapter in range(1, 7))],
        timeout=30, limit=4194304, memory=4294967296,
    )
    return json.loads(_require_run(result, 'Extraction isolée du catalogue et des historiques'))


def _normal_input(value):
    return re.sub(r'\s+', ' ', value.replace('\r\n', '\n').replace('\r', '\n')).strip()


def _historical_inputs(snapshot, extraction):
    known = []
    fixtures = _read_json(snapshot / 'corrections/outils/sondes/nouvelles-fixtures-suspendus/fixtures/b3-github.json')
    indexes = _read_json(snapshot / 'corrections/outils/sondes/suspendus-oracles/temoins.json')
    exercises = extraction['exercises']
    if set(fixtures) != {item['id'] for item in exercises}:
        raise RuntimeError('Inventaire des témoins manuels antérieurs incomplet')
    for exercise in exercises:
        identifier = exercise['id']
        for origin, entries in (('exemple_catalogue', exercise['examples']), ('test_catalogue', exercise['tests'])):
            for entry in entries:
                known.append((identifier, origin, entry['stdin']))
        references = indexes.get(identifier)
        if (not isinstance(references, list) or len(references) != 2 or len(set(references)) != 2
                or any(not isinstance(index, int) or index < 1 or index > len(exercise['tests']) for index in references)):
            raise RuntimeError(f'Témoins antérieurs non reconnus : {identifier}')
        known.append((identifier, 'temoin_independant_ancien', extraction['witnesses'][identifier]['stdin']))
        known.append((identifier, 'temoin_manuel_partie2', fixtures[identifier]['stdin']))
    known.extend((item['id'], 'test_genere_preexistant', item['stdin']) for item in extraction['generated'])
    for exercise in extraction['legacy']:
        for origin, entries in (('exemple_chapitre_ancien', exercise['examples']), ('test_chapitre_ancien', exercise['tests'])):
            for entry in entries:
                known.append((exercise['id'], origin, entry['stdin']))
    for filename in HISTORICAL_CASES:
        document = _read_json(snapshot / PACKAGE / filename)
        for definition in document.get('exercices', []):
            if not isinstance(definition, dict):
                continue
            for case in definition.get('cas', []):
                if isinstance(case, dict) and isinstance(case.get('entree'), str):
                    known.append((definition.get('id', ''), filename, case['entree']))
    return known


def _novelty(snapshot, definitions, extraction):
    known = _historical_inputs(snapshot, extraction)
    prior = {}
    for identifier, origin, input_text in known:
        prior.setdefault(_normal_input(input_text), []).append((identifier, origin))
    corpus_files = [
        'server/exercises/b3-github.js',
        'tests/b3-github-lot1.test.js',
        'corrections/outils/sondes/nouvelles-fixtures-suspendus/fixtures/b3-github.json',
        'corrections/resultats/generalisation-lot1-partie2-complement.json',
        *(f'server/exercises/b3-github/chapitre{chapter}.js' for chapter in range(1, 7)),
        *(str(PACKAGE / name) for name in HISTORICAL_CASES),
    ]
    corpora = [(name, (snapshot / name).read_text(encoding='utf-8')) for name in corpus_files]
    seen = set()
    for definition in definitions:
        if len(definition['cas']) != 2:
            raise RuntimeError(f"Deux cas requis : {definition['id']}")
        for case in definition['cas']:
            text = case['entree']
            key = _normal_input(text)
            if not key or key in seen or key in prior:
                raise RuntimeError(f"Entrée vide ou déjà observée : {definition['id']} {prior.get(key, [])}")
            seen.add(key)
            stripped = text.replace('\r\n', '\n').replace('\r', '\n').rstrip('\n')
            variants = {
                stripped,
                json.dumps(stripped, ensure_ascii=False)[1:-1],
                json.dumps(stripped, ensure_ascii=True)[1:-1],
                base64.b64encode(stripped.encode('utf-8')).decode('ascii'),
            }
            for name, corpus in corpora:
                if any(variant and variant in corpus for variant in variants):
                    raise RuntimeError(f"Entrée ou représentation déjà littérale : {definition['id']} dans {name}")
    return {
        'etat': 'réussi',
        'nouveaux_cas': len(seen),
        'anciennes_entrees_comparees': len(known),
        'anciennes_entrees_par_origine': dict(sorted(Counter(origin for _, origin, _ in known).items())),
        'tests_generes_reconnus': extraction['generatedTests'],
        'profil_test_sha256': extraction['profile'],
        'comparaison': 'égalité après réduction des espaces ; recherche littérale, JSON UTF-8/ASCII et base64 dans les sources indiquées',
        'sources_recherche_litterale': corpus_files,
        'limite': 'La comparaison textuelle ne prouve pas la nouveauté sémantique universelle ni l’absence de mémorisation.',
    }


def _selected_exercises(prior, definitions, extraction, oracles, mutants):
    rows = [row for row in prior['exercices'] if row['course'] == 'b3-github']
    selected = []
    for row in rows:
        witness = row['controles'].get('temoin_manuel') or {}
        if (row['etat'] == 'non évalué' and witness.get('etat_brut') == 'conforme'
                and witness.get('execute') is True and witness.get('nouveaute_litterale') is True
                and witness.get('nombre') == 1):
            selected.append(row['id'])
    identifiers = [item['id'] for item in definitions]
    if (len(rows) != 18 or len(selected) != 17 or len(set(identifiers)) != 17
            or set(selected) != set(identifiers) or set(oracles.ORACLES) != set(selected)
            or set(mutants.MUTANTS) != set(selected) or extraction['suspension'] is not True):
        raise RuntimeError('Périmètre ou suspension différente du rapport de la partie 2')
    exercises = {item['id']: item for item in extraction['exercises']}
    for definition in definitions:
        identifier = definition['id']
        if (definition['source'] != 'b3-github.js' or definition['oracle'] != identifier
                or definition['codec'] != 'lignes' or exercises[identifier]['language'] != 'shell'
                or len(mutants.MUTANTS[identifier]) != 2):
            raise RuntimeError(f'Définition incompatible : {identifier}')
        for case in definition['cas']:
            if oracles.calculer(identifier, case['entree']) != case['attendu']:
                raise RuntimeError(f'Attendu manuel incompatible avec l’oracle : {identifier}')
    return exercises


def _verify_previous_hashes(prior, hashes):
    expected = prior['manuels']['sources_sha256']
    names = ('server/exercises/b3-github.js', 'tests/b3-github-lot1.test.js')
    checked = {name: expected.get(name) == hashes[name] for name in names}
    fixture = 'corrections/outils/sondes/nouvelles-fixtures-suspendus/fixtures/b3-github.json'
    checked[fixture] = prior['manuels']['banc_sha256'].get('fixtures/b3-github.json') == hashes[fixture]
    if not all(checked.values()):
        raise RuntimeError(f'Sources différentes de celles du rapport antérieur : {checked}')
    return checked


def _cross_oracle(base, snapshot, definitions):
    cases = []
    for definition in definitions:
        for number, case in enumerate(definition['cas'], 1):
            sample = {'stdin': case['entree'], 'expected': case['attendu']}
            if case.get('mode'):
                sample['mode'] = case['mode']
            cases.append({'id': definition['id'], 'index': number, 'origin': 'lot1_partie3', 'test': sample})
    source = snapshot / 'corrections/outils/sondes/suspendus-oracles/oracles.py'
    mounts = ['--dir', '/audit', '--ro-bind', str(source), '/audit/oracles.py',
              '--setenv', 'REVI_AUDIT_NET_NS_HOTE', os.readlink('/proc/self/ns/net')]
    result = _bounded_run(base, mounts, ['/usr/bin/python3', '-I', '/audit/oracles.py'],
                          json.dumps(cases, ensure_ascii=False), timeout=30, limit=1048576)
    report = json.loads(_require_run(result, 'Oracle indépendant préexistant'))
    indexed_cases = {(item['id'], item['index']): item['test'] for item in cases}
    rows = report['resultats']
    if len(rows) != len(cases) or len({(row['id'], row['indice']) for row in rows}) != len(cases):
        raise RuntimeError('Inventaire du second oracle incomplet ou répété')
    checked = []
    for row in rows:
        sample = indexed_cases[(row['id'], row['indice'])]
        comparable = {'attendu': sample['expected'], 'mode': sample.get('mode')}
        matches = row['identique_apres_comparaison'] is True and _compare(row['oracle'], comparable)
        checked.append({'id': row['id'], 'numero': row['indice'], 'sortie': row['oracle'],
                        'sha256': row['oracleSha256'], 'identique': matches})
    if not all(row['identique'] for row in checked):
        raise RuntimeError('Un attendu diffère du second oracle indépendant')
    return {'source': 'corrections/outils/sondes/suspendus-oracles/oracles.py',
            'confinement': report['confinement'], 'comparaisons': checked}


def _cross_git(definitions):
    definition = next(item for item in definitions if item['id'] == 'gh3-c1-e1')
    checks = []
    base = _sandbox_base(mask_git=False)
    for number, case in enumerate(definition['cas'], 1):
        expected_lines = case['attendu'].splitlines()
        lines = case['entree'].splitlines()
        if len(lines) != len(expected_lines):
            raise RuntimeError('Nombre d’objets Git incohérent')
        for line, expected in zip(lines, expected_lines):
            match = re.fullmatch(r'OBJECT type=(blob|tree|commit|tag) content=(.*)', line)
            if not match:
                raise RuntimeError('Objet Git hors domaine')
            kind, encoded = match.groups()
            content = encoded.replace('\\n', '\n')
            outcome = _bounded_run(base, [], ['/usr/bin/git', 'hash-object', '--literally', '-t', kind, '--stdin'], content)
            digest = _require_run(outcome, 'Vérification indépendante git hash-object').strip()
            computed = f'GIT_HASH type={kind} size={len(content.encode("utf-8"))} sha1={digest}'
            if computed != expected:
                raise RuntimeError('Le hash attendu diffère de git hash-object')
            checks.append({'cas': number, 'type': kind, 'taille_octets': len(content.encode('utf-8')),
                           'sha1_git': digest, 'attendu_identique': True})
    return {'commande': 'git hash-object --literally -t TYPE --stdin', 'sandbox_sans_depot_ni_reseau_exterieur': True,
            'option_ecriture_absente': True, 'objets': checks}


def _compare(actual, case):
    if case.get('mode') == 'exact':
        return actual == case['attendu']
    if actual.endswith('\n'):
        actual = actual[:-1]
    return actual == case['attendu']


def _execute_candidate(base, code, case):
    with tempfile.TemporaryDirectory(prefix='revi-gh3-candidat-', dir='/tmp') as directory:
        source = Path(directory) / 'programme.sh'
        source.write_text(code, encoding='utf-8')
        mounts = ['--dir', '/code', '--ro-bind', str(source), '/code/solution.sh']
        guard = (
            'test ! -e /home && test ! -e /root && test -z "${HOME+x}" && '
            'test ! -e /snapshot && test ! -e /trusted && test ! -e /project && test ! -e /audit && '
            'test ! -x /usr/bin/git && test ! -e /usr/lib/git-core/git && '
            'test "$(cat /proc/1/comm)" = bwrap && '
            'test "$(readlink /proc/self/ns/net)" != "$AUDIT_PARENT_NET" && '
            'test "$(awk -F: \'NR>2 {gsub(/^[ \\t]+/,"",$1); if ($1 != "") print $1}\' /proc/net/dev)" = lo && '
            'exec "$@"'
        )
        result = _bounded_run(base, mounts, ['/bin/sh', '-eu', '-c', guard, 'audit',
                                             '/bin/bash', '/code/solution.sh'], case['entree'])
    if (result['code'] != 0 or result['expiration'] or result['sortie_trop_longue']
            or result['utf8_invalide']):
        state = 'non évalué'
    else:
        state = 'réussi' if _compare(result['stdout'], case) else 'échoué'
    return {
        'etat': state,
        'code': result['code'],
        'expiration': result['expiration'],
        'sortie_trop_longue': result['sortie_trop_longue'],
        'utf8_invalide': result['utf8_invalide'],
        'sortie': result['stdout'],
        'stderr': result['stderr'],
        'duree_ms': result['duree_ms'],
    }


def _autocontroles(base, snapshot, definitions, extraction, prior, oracle, mutants, hashes):
    def rejected(action, error_type):
        try:
            action()
        except error_type:
            return True
        return False

    old_case = copy.deepcopy(definitions)
    old_case[0]['cas'][0]['entree'] = extraction['exercises'][0]['tests'][0]['stdin']
    duplicate = copy.deepcopy(definitions)
    duplicate[0]['cas'][1]['entree'] = duplicate[0]['cas'][0]['entree']
    bad_expected = copy.deepcopy(definitions)
    bad_expected[0]['cas'][0]['attendu'] = 'attendu volontairement incorrect'
    unknown_oracle = copy.deepcopy(definitions)
    unknown_oracle[0]['oracle'] = 'oracle-inconnu'
    bad_hashes = dict(hashes)
    bad_hashes['server/exercises/b3-github.js'] = '0' * 64
    crash = _execute_candidate(base, '#!/bin/bash\nexit 7\n', {'entree': '', 'attendu': ''})
    checks = {
        'ancien_test_rejete': rejected(lambda: _novelty(snapshot, old_case, extraction), RuntimeError),
        'nouveau_cas_duplique_rejete': rejected(lambda: _novelty(snapshot, duplicate, extraction), RuntimeError),
        'attendu_faux_rejete': rejected(
            lambda: _selected_exercises(prior, bad_expected, extraction, oracle, mutants), RuntimeError),
        'oracle_inconnu_rejete': rejected(
            lambda: _selected_exercises(prior, unknown_oracle, extraction, oracle, mutants), RuntimeError),
        'empreinte_ancienne_alteree_rejetee': rejected(lambda: _verify_previous_hashes(prior, bad_hashes), RuntimeError),
        'mutation_absente_rejetee': rejected(lambda: mutants.appliquer('exemple', ('absente', 'absent', 'autre')), ValueError),
        'mutation_ambigue_rejetee': rejected(lambda: mutants.appliquer('aa aa', ('ambiguë', 'aa', 'bb')), ValueError),
        'un_saut_final_accepte': _compare('valeur\n', {'attendu': 'valeur'}),
        'saut_final_supplementaire_rejete': not _compare('valeur\n\n', {'attendu': 'valeur'}),
        'espace_final_significatif_preserve': not _compare('valeur \n', {'attendu': 'valeur'}),
        'mode_exact_preserve_saut_final': not _compare('valeur', {'attendu': 'valeur\n', 'mode': 'exact'}),
        'plantage_non_evalue': crash['etat'] == 'non évalué' and crash['code'] == 7,
    }
    if not all(checks.values()):
        raise RuntimeError(f'Autocontrôle non satisfait : {checks}')
    return checks


def _common_normalizer(source_text):
    tree = ast.parse(source_text)
    functions = [item for item in tree.body if isinstance(item, ast.FunctionDef) and item.name == 'normaliser']
    if len(functions) != 1:
        raise RuntimeError('Comparateur du banc commun absent ou ambigu')
    namespace = {}
    exec(compile(ast.Module(body=functions, type_ignores=[]), '<comparateur-extrait>', 'exec'), namespace)
    return namespace['normaliser']


def _compare_real_functions(base, node, snapshot, actual, expected):
    files = [
        (snapshot / 'server/services/execution/index.js', 'execution.js'),
        (snapshot / 'server/exercises/runner.js', 'runner.js'),
        (snapshot / PACKAGE / 'comparer_b3_github.js', 'compare.js'),
    ]
    result = _bounded_run(
        base, _node_mounts(node, files),
        ['/toolchain/node', '--max-old-space-size=128', '/snapshot/compare.js', '/snapshot/execution.js', '/snapshot/runner.js'],
        json.dumps({'actual': actual, 'expected': expected}, ensure_ascii=False),
        memory=4294967296,
    )
    comparison = json.loads(_require_run(result, 'Comparaison isolée des fonctions existantes'))
    normalizer = _common_normalizer((snapshot / PACKAGE / 'banc.py').read_text(encoding='utf-8'))
    comparison['banc_commun_normalise_egal'] = normalizer(actual) == normalizer(expected)
    return comparison


def _version(command):
    result = subprocess.run(command, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False, timeout=10)
    if result.returncode != 0:
        raise RuntimeError(f'Version indisponible : {command[0]}')
    return result.stdout.splitlines()[0]


def _git_identity(root):
    head = subprocess.run(['git', 'rev-parse', '--verify', 'HEAD'], cwd=root, text=True,
                          stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
    branch = subprocess.run(['git', 'symbolic-ref', '-q', 'HEAD'], cwd=root, text=True,
                            stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
    if head.returncode != 0 or branch.returncode not in (0, 1):
        raise RuntimeError('Impossible de déterminer HEAD ou son état détaché')
    return {'head': head.stdout.strip(), 'detache': branch.returncode == 1}


def audit(root):
    started = datetime.now(timezone.utc).isoformat()
    base = _sandbox_base()
    node = shutil.which('node')
    if not node:
        raise RuntimeError('Node absent')
    node = str(Path(node).resolve())
    isolation = _sandbox_check(base)
    with tempfile.TemporaryDirectory(prefix='revi-gh3-audit-', dir='/tmp') as temporary:
        snapshot = Path(temporary) / 'snapshot'
        hashes = _snapshot(root, snapshot)
        oracle = _load_module(snapshot / PACKAGE / 'b3_github.py', 'b3_github_oracle')
        mutations = _load_module(snapshot / PACKAGE / 'mutants_b3_github.py', 'b3_github_mutants')
        manifest = _read_json(snapshot / PACKAGE / 'cas_b3_github.json')
        definitions = manifest['exercices']
        extraction = _extract(base, node, snapshot)
        prior = _read_json(snapshot / 'corrections/resultats/generalisation-lot1-partie2-complement.json')
        exercises = _selected_exercises(prior, definitions, extraction, oracle, mutations)
        previous_hashes = _verify_previous_hashes(prior, hashes)
        novelty = _novelty(snapshot, definitions, extraction)
        cross_oracle = _cross_oracle(base, snapshot, definitions)
        cross_git = _cross_git(definitions)
        self_checks = _autocontroles(base, snapshot, definitions, extraction, prior, oracle, mutations, hashes)
        secondary = {(item['id'], item['numero']): item for item in cross_oracle['comparaisons']}
        records = []
        runs = 0
        print(f"Périmètre confirmé : {len(definitions)} fiches et {novelty['nouveaux_cas']} cas.", file=sys.stderr, flush=True)
        for definition in definitions:
            identifier = definition['id']
            exercise = exercises[identifier]
            cases = []
            for number, case in enumerate(definition['cas'], 1):
                outcome = _execute_candidate(base, exercise['solution'], case)
                runs += 1
                cases.append({
                    'numero': number, 'entree': case['entree'], 'attendu': case['attendu'],
                    'justification': case['justification'], 'mode': case.get('mode', 'une_fin_de_ligne_facultative'),
                    'oracle_independant_identique': True, 'second_oracle': secondary[(identifier, number)],
                    'corrige': outcome,
                })
            mutant_records = []
            for description, before, after in mutations.MUTANTS[identifier]:
                replacement = mutations.appliquer(exercise['solution'], (description, before, after))
                mutant_cases = []
                for number, case in enumerate(definition['cas'], 1):
                    outcome = _execute_candidate(base, replacement, case)
                    runs += 1
                    mutant_cases.append({'numero': number, **outcome})
                mutant_records.append({
                    'description': description, 'avant': before, 'apres': after,
                    'programme_sha256': _sha(replacement), 'cas': mutant_cases,
                    'rejetee_par_sortie_incorrecte': any(item['etat'] == 'échoué' for item in mutant_cases),
                    'toutes_les_executions_comparees': all(item['etat'] != 'non évalué' for item in mutant_cases),
                })
            records.append({
                'id': identifier, 'titre': exercise['title'], 'source': definition['source'],
                'corrige_sha256': _sha(exercise['solution']), 'cas': cases, 'mutants': mutant_records,
            })
            print(f'{identifier} : deux corrigés et quatre exécutions de mutants terminés.', file=sys.stderr, flush=True)
        tree_row = next(row for row in records if row['id'] == 'gh3-c1-e2')
        tree_case = tree_row['cas'][1]
        trailing_mutant = tree_row['mutants'][1]['cas'][1]
        comparator = _compare_real_functions(base, node, snapshot, trailing_mutant['sortie'], tree_case['attendu'])
        comparator['test_cache_existant_mode'] = exercises['gh3-c1-e2']['tests'][1].get('mode')
        expected_comparator = {
            'bytes_identiques': False, 'normalisation_identique': True,
            'moteur_mode_defaut': True, 'moteur_mode_exact': False,
            'banc_commun_normalise_egal': True, 'test_cache_existant_mode': 'exact',
        }
        if comparator != expected_comparator:
            raise RuntimeError(f'Autocontrôle du comparateur inattendu : {comparator}')
        changed = [name for name, digest in hashes.items()
                   if not (root / name).is_file() or _sha((root / name).read_bytes()) != digest]
        correct_cases = [case['corrige'] for row in records for case in row['cas']]
        all_mutants = [mutant for row in records for mutant in row['mutants']]
        mutant_runs = [case for mutant in all_mutants for case in mutant['cas']]
        summary = {
            'exercices': len(records), 'cas': len(correct_cases),
            'corriges_conformes': sum(case['etat'] == 'réussi' for case in correct_cases),
            'corriges_differents': sum(case['etat'] == 'échoué' for case in correct_cases),
            'corriges_non_evalues': sum(case['etat'] == 'non évalué' for case in correct_cases),
            'mutants': len(all_mutants),
            'mutants_rejetes': sum(mutant['rejetee_par_sortie_incorrecte'] for mutant in all_mutants),
            'mutants_partiellement_non_evalues': sum(not mutant['toutes_les_executions_comparees'] for mutant in all_mutants),
            'executions_mutants': len(mutant_runs),
            'executions_isolees_candidats': runs,
            'sources_modifiees': changed,
        }
        success = (summary['corriges_conformes'] == 34 and summary['mutants_rejetes'] == 34
                   and summary['mutants_partiellement_non_evalues'] == 0 and not changed)
        return {
            'schema': 'revi.generalisation.lot1-partie3.b3-github.v1',
            'commence_utc': started, 'termine_utc': datetime.now(timezone.utc).isoformat(),
            'worktree': str(root), 'git': _git_identity(root),
            'versions': {'python': sys.version.split()[0], 'node': extraction['node'],
                         'bash': _version(['/bin/bash', '--version']), 'bwrap': _version(['bwrap', '--version'])},
            'isolation': {'autocontroles': isolation, 'un_processus_par_candidat_et_par_cas': True,
                          'programme_seul_monte_en_lecture': True, 'limites_cpu_s': 6,
                          'limite_memoire_octets': 536870912, 'limite_sortie_octets': MAX_OUTPUT},
            'sources_sha256': hashes, 'sources_stables_pendant_copie': True,
            'sources_modifiees_apres_copie': changed, 'suspension_b3_github': extraction['suspension'],
            'sources_identiques_rapport_partie2': previous_hashes,
            'autocontroles': self_checks,
            'nouveaute': novelty, 'oracle_preexistant': cross_oracle,
            'controle_git_hash_object': cross_git, 'resume': summary, 'exercices': records,
            'anomalies': [{
                'id': 'GH3-GENERALISATION-ESPACE-SIGNIFICATIF',
                'exercice': 'gh3-c1-e2',
                'constat': 'Le banc commun normalise les espaces de fin de ligne et accepte une sortie qui perd un espace significatif.',
                'cas': 2, 'mutant': tree_row['mutants'][1]['description'], 'comparaison': comparator,
                'precision': 'Le test caché existant utilise déjà le mode exact du moteur ; seul le banc commun a été démontré défaillant ici.',
            }],
            'limites': [
                'Deux jeux par fiche et deux mutants ciblés ne prouvent ni une correction universelle ni l’absence de mémorisation.',
                'La nouveauté est vérifiée textuellement dans les sources indiquées ; une équivalence sémantique générale n’est pas décidée.',
                'Les oracles couvrent les formats et graphes topologiques documentés dans leur module, pas tous les domaines possibles.',
                'Les copies des sources sont successives et contrôlées par empreintes, mais ne constituent pas un instantané atomique.',
                'Le cours reste suspendu ; ce rapport et ces fixtures ne modifient ni le catalogue, ni les routes, ni le banc commun.',
                'Les cas et attendus sont inscrits dans les fichiers de l’audit et ne sont pas confidentiels.',
            ],
            'code_sortie': 0 if success else 1,
        }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, default=Path(__file__).resolve().parents[4])
    parser.add_argument('--output', default='-', help='Fichier JSON à créer, ou - pour stdout')
    args = parser.parse_args()
    root = args.repo.resolve(strict=True)
    sys.dont_write_bytecode = True
    try:
        result = audit(root)
    except Exception as error:
        result = {'schema': 'revi.generalisation.lot1-partie3.b3-github.v1',
                  'etat': 'erreur_infrastructure', 'raison': f'{type(error).__name__}: {error}', 'code_sortie': 2}
    document = json.dumps(result, ensure_ascii=False, indent=2) + '\n'
    try:
        if args.output == '-':
            sys.stdout.write(document)
        else:
            output = Path(args.output)
            if output.is_symlink():
                raise RuntimeError('Lien symbolique de sortie refusé')
            with output.open('x', encoding='utf-8') as destination:
                destination.write(document)
    except (OSError, RuntimeError) as error:
        print(f'Sortie du rapport impossible : {error}', file=sys.stderr)
        return 2
    return result['code_sortie']


if __name__ == '__main__':
    sys.exit(main())
