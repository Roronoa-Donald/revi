import argparse
import concurrent.futures
import hashlib
import importlib.util
import json
import os
import shutil
import sys
import tempfile
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


PACKAGE = Path(__file__).resolve().parent
COURSES = ('csharp', 'docker', 'b3-linux', 'b3-github')
STATIC_SOURCES = (
    'server/exercises/csharp.js',
    'server/exercises/docker.js',
    'server/exercises/b3-linux.js',
    'server/exercises/b3-github.js',
    'server/exercises/runner.js',
    'server/exercises/grading-policy.js',
    'server/exercises/grading-evidence.json',
    'server/exercises/grading-runtime-evidence.json',
    'tests/csharp-lot1.test.js',
    'tests/docker-lot1.test.js',
    'tests/b3-linux-lot1.test.js',
    'tests/b3-github-lot1.test.js',
    'corrections/outils/sondes/matrice-suspendus/matrice.py',
    'corrections/outils/sondes/matrice-suspendus/comparer.js',
)
FIXTURE_FILES = tuple(f'fixtures/{course}.json' for course in COURSES)
PACKAGE_FILES = ('banc.py', 'extraire.js', 'comparer.js', 'rejouer.sh', 'README.md', *FIXTURE_FILES)


def now():
    return datetime.now(timezone.utc).isoformat(timespec='seconds').replace('+00:00', 'Z')


def sha(value):
    if isinstance(value, str):
        value = value.encode('utf8')
    return hashlib.sha256(value).hexdigest()


def file_sha(path):
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(block)
    return digest.hexdigest()


def source_names(repo):
    service = repo / 'server/services/execution'
    if not (service / 'index.js').is_file():
        raise RuntimeError('Service de comparaison introuvable.')
    names = list(STATIC_SOURCES)
    names += [str(path.relative_to(repo)) for path in sorted(service.glob('*.js'))]
    if len(names) != len(set(names)):
        raise RuntimeError('Sources répétées.')
    return sorted(names)


def source_digest(root, relative):
    source = root / relative
    if source.is_symlink() or not source.is_file() or not source.resolve().is_relative_to(root):
        raise RuntimeError(f'Source absente, liée ou hors périmètre : {relative}')
    return file_sha(source)


def snapshot_sources(repo, work):
    names = source_names(repo)
    manifest = {name: source_digest(repo, name) for name in names}
    for name in names:
        target = work / 'project' / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(repo / name, target)
        if file_sha(target) != manifest[name]:
            raise RuntimeError(f'Source modifiée pendant la copie : {name}')
    if source_names(repo) != names or changed_sources(repo, manifest):
        raise RuntimeError('Sources modifiées pendant la constitution de la copie.')
    return manifest


def changed_sources(root, manifest):
    changed = []
    for name, expected in manifest.items():
        try:
            actual = source_digest(root, name)
        except (OSError, RuntimeError):
            changed.append(name)
            continue
        if actual != expected:
            changed.append(name)
    return changed


def snapshot_package(work):
    manifest = {name: source_digest(PACKAGE, name) for name in PACKAGE_FILES}
    for name in ('extraire.js', 'comparer.js', *FIXTURE_FILES):
        target = work / 'trusted' / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(PACKAGE / name, target)
        if file_sha(target) != manifest[name]:
            raise RuntimeError(f'Fichier du banc modifié pendant la copie : {name}')
    if changed_sources(PACKAGE, manifest):
        raise RuntimeError('Fichiers du banc modifiés pendant la copie.')
    return manifest


def load_matrix(work):
    path = work / 'project/corrections/outils/sondes/matrice-suspendus/matrice.py'
    spec = importlib.util.spec_from_file_location('matrice_suspendus_gelee', path)
    if spec is None or spec.loader is None:
        raise RuntimeError('Import de la matrice impossible.')
    matrix = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = matrix
    spec.loader.exec_module(matrix)
    return matrix


def check_outer_isolation():
    expected_net = os.environ.get('REVI_HOST_NET_NS')
    if not expected_net or Path('/proc/1/comm').read_text().strip() != 'bwrap':
        raise RuntimeError('Le lanceur extérieur bubblewrap est obligatoire.')
    if os.readlink('/proc/self/ns/net') == expected_net or Path('/home').exists():
        raise RuntimeError('Réseau ou HOME non isolé dans le lanceur extérieur.')
    if os.environ.get('HOME') != '/nonexistent':
        raise RuntimeError('HOME extérieur inattendu.')
    interfaces = [line.strip().split(':')[0] for line in Path('/proc/net/dev').read_text().splitlines()[2:]]
    if interfaces != ['lo']:
        raise RuntimeError('Interfaces réseau extérieures inattendues.')
    return {'pid1_bwrap': True, 'reseau_separe': True, 'interfaces': interfaces,
            'home_absent': True, 'home_variable': '/nonexistent'}


def sandbox_without_git(matrix, work, node, dotnet):
    class SandboxWithoutGit(matrix.Sandbox):
        def base(self):
            options = super().base()
            for path in sorted(Path('/usr/bin').glob('git*')):
                if not path.is_symlink() and path.is_file():
                    options += ['--ro-bind', '/usr/bin/false', str(path)]
            if Path('/usr/lib/git-core').is_dir():
                options += ['--tmpfs', '/usr/lib/git-core']
            return options

    bwrap = shutil.which('bwrap')
    if not bwrap:
        raise RuntimeError('bubblewrap introuvable.')
    return SandboxWithoutGit(work, node, Path(bwrap), dotnet)


def candidate_preflight(sandbox, matrix):
    program = (
        'import hashlib,json,pathlib; '
        'p=pathlib.Path; '
        'sha=lambda x:hashlib.sha256(x.read_bytes()).hexdigest(); '
        'checks={"source_absente":not p("/source").exists(),'
        '"audit_absent":not p("/audit").exists(),'
        '"project_absent":not p("/project").exists(),'
        '"temoins_absents":not p("/trusted").exists() and not p("/fixtures").exists(),'
        '"copies_absentes":not p("/snapshot").exists() and not p("/tmp/snapshot").exists(),'
        '"git_masque":not p("/usr/bin/git").exists() or sha(p("/usr/bin/git"))==sha(p("/usr/bin/false")),'
        '"git_core_masque":not p("/usr/lib/git-core/git").exists()}; '
        'print(json.dumps(checks))'
    )
    result = sandbox.run(['/usr/bin/python3', '-I', '-c', program])
    failure = matrix.rejected_or_incomplete(result)
    if failure:
        raise RuntimeError('Autocontrôle complémentaire du candidat impossible.')
    checks = json.loads(result['stdout'])
    if len(checks) != 7 or not all(value is True for value in checks.values()):
        raise RuntimeError('Autocontrôle complémentaire du candidat échoué.')
    return checks


def toolchain_fingerprints(node, dotnet):
    tools = {'node_sha256': file_sha(node), 'python': sys.version.split()[0]}
    for name in ('bash', 'awk', 'sha1sum'):
        path = shutil.which(name)
        if path:
            tools[name + '_sha256'] = file_sha(Path(path))
    if dotnet is None:
        tools['dotnet'] = None
        return tools
    root = Path(dotnet['root'])
    references = []
    for value in dotnet['references']:
        prefix = '/dotnet/'
        if not value.startswith(prefix):
            raise RuntimeError('Référence .NET hors périmètre.')
        relative = value[len(prefix):]
        references.append(relative + ' ' + file_sha(root / relative))
    compiler = root / 'sdk' / dotnet['sdk'] / 'Roslyn/bincore/csc.dll'
    tools['dotnet'] = {
        'sdk': dotnet['sdk'], 'runtime': dotnet['runtime'], 'framework': dotnet['framework'],
        'dotnet_sha256': file_sha(root / 'dotnet'), 'compilateur_sha256': file_sha(compiler),
        'references_nombre': len(references), 'references_liste_sha256': sha('\n'.join(references)),
    }
    return tools


def extract(sandbox, matrix):
    result = sandbox.run(['/toolchain/node', '--max-old-space-size=512', '/trusted/extraire.js'],
                         mounts=sandbox.project_mounts('extraire.js') +
                         ['--ro-bind', str(sandbox.work / 'trusted/fixtures'), '/trusted/fixtures'], language='javascript',
                         timeout=30, large=True, candidate=False)
    if matrix.rejected_or_incomplete(result):
        raise RuntimeError('Extraction isolée des témoins impossible.')
    catalogue = json.loads(result['stdout'])
    exercises = catalogue['exercises']
    counts = Counter(exercise['course'] for exercise in exercises)
    if len(exercises) != 72 or counts != Counter({course: 18 for course in COURSES}):
        raise RuntimeError('Inventaire extrait différent de 72 exercices.')
    if len({exercise['id'] for exercise in exercises}) != 72:
        raise RuntimeError('Identifiants non uniques.')
    if any(len(exercise['cases']) not in (0, 1) for exercise in exercises):
        raise RuntimeError('Le banc exige au maximum une fixture par exercice.')
    return catalogue


def execute_all(sandbox, matrix, exercises, jobs):
    runs = {}
    eligible = []
    for exercise in exercises:
        if not exercise['cases']:
            runs[exercise['id']] = {'compilation': None, 'cells': [
                {'etat': 'non_evalue', 'execute': False, 'cause': 'fixture_absente'}]}
        elif not exercise['nouveaute']['valide']:
            runs[exercise['id']] = {'compilation': None, 'cells': [
                {'etat': 'non_evalue', 'execute': False, 'cause': 'nouveaute_non_etablie'}]}
        else:
            eligible.append(exercise)
    with concurrent.futures.ThreadPoolExecutor(max_workers=jobs) as pool:
        pending = {pool.submit(matrix.run_candidate, sandbox, exercise, exercise['solution'], -1, False): exercise
                   for exercise in eligible}
        for completed in concurrent.futures.as_completed(pending):
            exercise = pending[completed]
            try:
                result = completed.result()
                if len(result['cells']) != 1:
                    raise RuntimeError('Cardinalité de résultat incorrecte.')
            except Exception as error:
                result = {'compilation': None, 'cells': [{'etat': 'non_evalue', 'execute': False,
                          'cause': 'exception_interne_' + type(error).__name__}]}
            runs[exercise['id']] = result
            if len(runs) % 12 == 0:
                print(f"Exécutions terminées : {len(runs)}/72", file=sys.stderr, flush=True)
    return runs


def compare_all(sandbox, matrix, exercises, runs):
    rows = []
    for exercise in exercises:
        cell = runs[exercise['id']]['cells'][0]
        if cell['etat'] == 'a_comparer':
            rows.append({'id': exercise['id'], 'course': exercise['course'], 'stdout': cell['stdout'],
                         'expected': exercise['cases'][0]['sample']['expected']})
    if not rows:
        return {}, {'etat': 'aucune_sortie_comparable', 'nombre': 0}
    payload = json.dumps({'rows': rows}, ensure_ascii=False)
    result = sandbox.run(['/toolchain/node', '--max-old-space-size=512', '/trusted/comparer.js'], data=payload,
                         mounts=sandbox.project_mounts('comparer.js'), language='javascript',
                         timeout=60, large=True, candidate=False)
    if matrix.rejected_or_incomplete(result):
        return {}, {'etat': 'indisponible', 'nombre': len(rows)}
    try:
        response = json.loads(result['stdout'])
        states = response['states']
        if response.get('selftests') != 'reussis' or len(states) != len(rows):
            raise ValueError('Réponse incomplète.')
        result_by_id = {entry['id']: entry for entry in states}
        if set(result_by_id) != {row['id'] for row in rows} or len(result_by_id) != len(rows):
            raise ValueError('Identifiants du comparateur incohérents.')
        if any(entry['etat'] not in ('conforme', 'sortie_incorrecte') for entry in states):
            raise ValueError('État du comparateur inconnu.')
    except (ValueError, KeyError, TypeError):
        return {}, {'etat': 'reponse_invalide', 'nombre': len(rows)}
    return result_by_id, {'etat': 'reussi', 'nombre': len(rows), 'autocontroles': 'reussis'}


def result_entry(exercise, execution, comparison):
    sample = exercise['cases'][0]['sample'] if exercise['cases'] else None
    cell = dict(execution['cells'][0])
    cell.pop('stdout', None)
    compilation = execution.get('compilation')
    if compilation and compilation.get('etat') == 'echec':
        state = 'echec_compilation'
    elif cell.get('etat') == 'a_comparer':
        state = comparison['etat'] if comparison else 'non_evalue'
        if not comparison:
            cell['cause'] = 'comparateur_indisponible'
    else:
        state = cell.get('etat', 'non_evalue')
    cell['etat'] = state
    if comparison:
        cell['sortie_normalisee_sha256'] = comparison['sortie_normalisee_sha256']
        cell['attendu_comparaison_sha256'] = comparison['attendu_comparaison_sha256']
        if state == 'sortie_incorrecte':
            cell['diagnostic'] = {'attendu': sample['expected'], 'sortie': execution['cells'][0]['stdout']}
    fixture = ({'origine': 'nouvelle_fixture_manuelle', 'source': f"fixtures/{exercise['course']}.json", 'nombre': 1,
                'entree_sha256': sha(sample['stdin']), 'attendu_sha256': sha(sample['expected']),
                'raison': sample['raison']} if sample else {'origine': 'absente', 'nombre': 0})
    return {
        'cours': exercise['course'], 'langage': exercise['language'],
        'temoin': fixture, 'source_temoins_preexistants': exercise['previousSource'],
        'corrige_sha256': exercise['solution']['sha256'], 'nouveaute': exercise['nouveaute'],
        'compilation': compilation, 'resultat': cell,
    }


def output_target(value):
    path = Path(value)
    parent = path.parent.resolve(strict=True)
    target = parent / path.name
    if not target.is_relative_to(Path('/tmp')) or target == Path('/tmp') or path.is_symlink() or target.exists():
        raise RuntimeError('La sortie doit être un nouveau fichier sous /tmp.')
    return target


def write_report(path, report):
    with path.open('x', encoding='utf8') as stream:
        json.dump(report, stream, ensure_ascii=False, indent=2, sort_keys=True)
        stream.write('\n')


def main():
    parser = argparse.ArgumentParser(description='Nouvelles fixtures manuelles pour les corrigés suspendus, hors SQL B1.')
    parser.add_argument('--repo', required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--jobs', type=int, default=4, choices=range(1, 9))
    args = parser.parse_args()
    os.umask(0o077)
    target = output_target(args.output)
    report = {'schema': 'revi-vraies-nouvelles-fixtures-suspendus-v1', 'commence_utc': now(), 'etat': 'non_evalue'}
    try:
        outer = check_outer_isolation()
        repo = Path(args.repo).resolve(strict=True)
        node_path = shutil.which('node')
        if not node_path:
            raise RuntimeError('Node introuvable.')
        node = Path(node_path).resolve(strict=True)
        with tempfile.TemporaryDirectory(prefix='revi-snapshot-', dir='/tmp') as temporary:
            work = Path(temporary)
            manifest = snapshot_sources(repo, work)
            package_manifest = snapshot_package(work)
            matrix = load_matrix(work)
            dotnet = matrix.dotnet_configuration(repo)
            tools_before = toolchain_fingerprints(node, dotnet)
            sandbox = sandbox_without_git(matrix, work, node, dotnet)
            isolation = matrix.preflight(sandbox)
            extra_isolation = candidate_preflight(sandbox, matrix)
            matrix.selftest_execution(sandbox, False)
            catalogue = extract(sandbox, matrix)
            if catalogue['node'] != isolation['node']:
                raise RuntimeError('Versions Node incohérentes.')
            exercises = catalogue['exercises']
            runs = execute_all(sandbox, matrix, exercises, args.jobs)
            comparisons, comparer = compare_all(sandbox, matrix, exercises, runs)
            entries = {exercise['id']: result_entry(exercise, runs[exercise['id']], comparisons.get(exercise['id']))
                       for exercise in exercises}
            states = Counter(entry['resultat']['etat'] for entry in entries.values())
            by_course = {}
            for course in COURSES:
                selected = [entry for entry in entries.values() if entry['cours'] == course]
                by_course[course] = {'exercices': len(selected),
                                     'nouveaux_litteralement': sum(entry['nouveaute']['valide'] for entry in selected),
                                     'etats': dict(sorted(Counter(entry['resultat']['etat'] for entry in selected).items()))}
            tools_after = toolchain_fingerprints(node, dotnet)
            changed = changed_sources(repo, manifest)
            try:
                inventory_changed = source_names(repo) != sorted(manifest)
            except (OSError, RuntimeError):
                inventory_changed = True
            if inventory_changed:
                changed.append('inventaire_server/services/execution')
            package_changed = changed_sources(PACKAGE, package_manifest)
            novel = sum(entry['nouveaute']['valide'] for entry in entries.values())
            collisions = sum(bool(entry['nouveaute'].get('doublons_catalogue_ou_anciens_temoins')) for entry in entries.values())
            present = sum(entry['temoin']['nombre'] for entry in entries.values())
            replay_required = bool(changed or package_changed or tools_before != tools_after)
            complete = states == Counter({'conforme': 72}) and novel == 72 and not replay_required
            report.update({
                'etat': 'complet_sur_copie' if complete else 'partiel_sur_copie',
                'perimetre': {'cours': list(COURSES), 'exercices': 72, 'temoins_max_par_exercice': 1,
                              'sql_b1': 'non_couvert', 'oracle_parametrique_independant': False,
                              'qualification': 'Fixtures et attendus manuels créés depuis les énoncés, pas un oracle paramétrique.'},
                'sources_sha256': manifest, 'banc_sha256': package_manifest,
                'sources_stables_pendant_copie': True, 'sources_modifiees_apres_copie': sorted(changed),
                'banc_modifie_apres_copie': sorted(package_changed), 'rejeu_necessaire': replay_required,
                'outils': {**tools_before, 'node_version': isolation['node'],
                           'empreintes_stables_pendant_execution': tools_before == tools_after},
                'isolation': {'exterieure': outer, 'candidats': isolation,
                              'candidats_controles_complementaires': extra_isolation,
                              'autocontroles_execution': 'reussis'},
                'suspensions_a_la_copie': catalogue['suspensions'], 'sources_anciens_temoins': catalogue['sourcesTemoins'],
                'sources_tests_generes': catalogue['sourcesGeneres'],
                'profils_sources_precedentes': catalogue['profilsSources'],
                'comparateur': comparer, 'par_cours': by_course,
                'totaux': {'exercices': 72, 'fixtures_creees': present, 'etats': dict(sorted(states.items())),
                           'nouveaux_litteralement': novel, 'collisions_catalogue_ou_temoins': collisions},
                'exercices': entries,
            })
    except Exception as error:
        report['erreur'] = {'type': type(error).__name__, 'message': str(error)}
        print('Banc interrompu : ' + str(error), file=sys.stderr)
    report['termine_utc'] = now()
    write_report(target, report)
    print(json.dumps({'etat': report['etat'], 'totaux': report.get('totaux'), 'rapport': str(target)},
                     ensure_ascii=False), flush=True)
    return 0 if report['etat'] == 'complet_sur_copie' else 1


if __name__ == '__main__':
    raise SystemExit(main())
