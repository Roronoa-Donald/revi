import argparse
import concurrent.futures
import hashlib
import itertools
import json
import os
import re
import shutil
import signal
import stat
import subprocess
import sys
import tempfile
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


PACKAGE = Path(__file__).resolve().parent
COURSES = ('csharp', 'docker', 'b3-linux', 'b3-github', 'b1-sql')
TESTS = ('csharp-lot1.test.js', 'docker-lot1.test.js', 'b3-linux-lot1.test.js',
         'b3-github-lot1.test.js', 'sql-lot1-variants.test.js')
MARKER = b'REVI_ISOLATION_OK\n'


def now():
    return datetime.now(timezone.utc).isoformat(timespec='seconds').replace('+00:00', 'Z')


def sha(value):
    if isinstance(value, str):
        value = value.encode('utf-8')
    return hashlib.sha256(value).hexdigest()


def file_sha(path):
    digest = hashlib.sha256()
    with path.open('rb') as file:
        for block in iter(lambda: file.read(1024 * 1024), b''):
            digest.update(block)
    return digest.hexdigest()


def find_repo(explicit):
    if explicit:
        candidates = [Path(explicit).resolve(strict=True)]
    else:
        candidates = list(Path.cwd().resolve().parents)
        candidates.insert(0, Path.cwd().resolve())
        candidates += [PACKAGE, *PACKAGE.parents]
    for candidate in candidates:
        if (candidate / 'server/exercises/runner.js').is_file() and (candidate / 'tests/csharp-lot1.test.js').is_file():
            return candidate
    raise RuntimeError('Dépôt introuvable : indiquer --repo.')


def output_path(value):
    if value == '-':
        return None
    given = Path(value)
    parent = given.parent.resolve(strict=True)
    target = parent / given.name
    temporary_root = Path('/tmp').resolve()
    if not target.is_relative_to(temporary_root) or target == temporary_root or given.is_symlink():
        raise RuntimeError('La sortie doit être un fichier non lié sous /tmp.')
    if target.exists() and not target.is_file():
        raise RuntimeError('La sortie existante n’est pas un fichier ordinaire.')
    if target.parent == PACKAGE and target.name in {'rejouer.sh', 'matrice.py', 'extraire.js', 'comparer.js', 'sql-worker.js'}:
        raise RuntimeError('La sortie ne peut pas remplacer un fichier du banc.')
    return target


def copy_inputs(repo, work):
    source_files = [f'tests/{name}' for name in TESTS]
    source_files += [f'server/exercises/{name}.js' for name in COURSES]
    source_files += ['server/exercises/runner.js', 'server/exercises/grading-policy.js',
                     'server/exercises/grading-evidence.json', 'server/exercises/grading-runtime-evidence.json']
    service = repo / 'server/services/execution'
    source_files += [str(path.relative_to(repo)) for path in sorted(service.glob('*.js'))]
    source_files += ['assets/js/engines/sql-wasm-engine.js', 'assets/js/engines/engine-interface.js',
                     'b1-sql/assets/vendor/sqljs/sql-wasm.js', 'b1-sql/assets/vendor/sqljs/sql-wasm.wasm',
                     'corrections/fixtures/variantes-suspendues-avant-partie2.json']
    if not (service / 'index.js').is_file():
        raise RuntimeError('Services du correcteur introuvables.')
    manifest = {}
    for relative in sorted(source_files):
        source = repo / relative
        if source.is_symlink() or not source.is_file() or not source.resolve().is_relative_to(repo):
            raise RuntimeError(f'Source absente, liée ou hors dépôt : {relative}')
        before = file_sha(source)
        destination = work / 'project' / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, destination)
        if file_sha(destination) != before or file_sha(source) != before:
            raise RuntimeError(f'Source modifiée pendant la copie : {relative}')
        manifest[relative] = before
    for name in ('extraire.js', 'comparer.js', 'sql-worker.js'):
        destination = work / 'trusted' / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        original = PACKAGE / name
        before = file_sha(original)
        shutil.copyfile(original, destination)
        if file_sha(destination) != before or file_sha(original) != before:
            raise RuntimeError(f'Fichier du banc modifié pendant la copie : {name}')
    return manifest


def stable_sources(repo, manifest):
    changed = []
    for relative, expected in manifest.items():
        source = repo / relative
        if source.is_symlink() or not source.is_file() or not source.resolve().is_relative_to(repo):
            changed.append(relative)
        elif file_sha(source) != expected:
            changed.append(relative)
    return changed


def version_key(value):
    return tuple(int(part) for part in re.findall(r'\d+', value))


def dotnet_configuration(repo):
    executable = shutil.which('dotnet')
    if not executable:
        return None
    root = Path(executable).resolve().parent
    home = Path.home().resolve()
    if (root == Path('/') or root.is_relative_to(Path('/home')) or root.is_relative_to(home) or
            home.is_relative_to(root) or root.is_relative_to(repo) or repo.is_relative_to(root) or
            PACKAGE.is_relative_to(root)):
        return None
    sdk_root = root / 'sdk'
    reference_root = root / 'packs/Microsoft.NETCore.App.Ref'
    runtime_root = root / 'shared/Microsoft.NETCore.App'
    if not all(path.is_dir() for path in (sdk_root, reference_root, runtime_root)):
        return None
    sdks = sorted((entry for entry in sdk_root.iterdir() if re.fullmatch(r'\d+\.\d+\.\d+', entry.name) and
                   (entry / 'Roslyn/bincore/csc.dll').is_file()),
                  key=lambda path: version_key(path.name), reverse=True)
    references = sorted((entry for entry in reference_root.iterdir() if re.fullmatch(r'\d+\.\d+\.\d+', entry.name) and
                         (runtime_root / entry.name).is_dir()),
                        key=lambda path: version_key(path.name), reverse=True)
    for reference in references:
        version = reference.name
        major = version.split('.')[0]
        framework = reference / 'ref' / f'net{major}.0'
        compatible = [sdk for sdk in sdks if sdk.name.split('.')[0] == major]
        dlls = sorted(framework.glob('*.dll')) if framework.is_dir() else []
        if compatible and dlls:
            return {
                'root': str(root), 'sdk': compatible[0].name, 'runtime': version, 'framework': framework.name,
                'references': [f'/dotnet/packs/Microsoft.NETCore.App.Ref/{version}/ref/{framework.name}/{dll.name}' for dll in dlls]
            }
    return None


class Sandbox:
    def __init__(self, work, node, bwrap, dotnet):
        self.work = work
        self.node = node
        self.bwrap = bwrap
        self.dotnet = dotnet
        self.host_net = os.readlink('/proc/self/ns/net')
        etc = work / 'etc'
        etc.mkdir()
        (etc / 'passwd').write_text(f'audit:x:{os.getuid()}:{os.getgid()}:Audit:/tmp:/bin/sh\n', encoding='utf8')
        (etc / 'group').write_text(f'audit:x:{os.getgid()}:\n', encoding='utf8')
        (etc / 'nsswitch.conf').write_text('passwd: files\ngroup: files\n', encoding='utf8')
        (etc / 'os-release').write_text('NAME=Audit\nID=linux\n', encoding='utf8')

    def base(self):
        result = [str(self.bwrap), '--die-with-parent', '--unshare-all', '--new-session', '--clearenv',
                  '--cap-drop', 'ALL', '--ro-bind', '/usr', '/usr']
        for name in ('/bin', '/lib', '/lib64'):
            path = Path(name)
            if path.is_symlink():
                result += ['--symlink', os.readlink(path), name]
            elif path.is_dir():
                result += ['--ro-bind', name, name]
        result += ['--dir', '/etc']
        for name in ('passwd', 'group', 'nsswitch.conf', 'os-release'):
            result += ['--ro-bind', str(self.work / 'etc' / name), f'/etc/{name}']
        if Path('/etc/ld.so.cache').is_file():
            result += ['--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache']
        result += ['--proc', '/proc', '--dev', '/dev', '--size', '67108864', '--tmpfs', '/tmp',
                   '--dir', '/toolchain', '--ro-bind', str(self.node), '/toolchain/node',
                   '--chdir', '/tmp', '--setenv', 'PATH', '/usr/bin:/bin', '--setenv', 'LANG', 'C.UTF-8',
                   '--setenv', 'TMPDIR', '/tmp', '--setenv', 'AUDIT_HOST_NET_NS', self.host_net,
                   '--setenv', 'DOTNET_CLI_HOME', '/tmp', '--setenv', 'DOTNET_CLI_TELEMETRY_OPTOUT', '1',
                   '--setenv', 'DOTNET_SKIP_FIRST_TIME_EXPERIENCE', '1', '--setenv', 'DOTNET_EnableDiagnostics', '0']
        return result

    def run(self, command, data='', mounts=None, language='shell', timeout=15, large=False, candidate=True, extra_env=None):
        options = self.base() + (mounts or [])
        for key, value in (extra_env or {}).items():
            options += ['--setenv', key, value]
        address = 17179869184 if language == 'sql' else 8589934592 if language == 'csharp' else 4294967296
        max_file = 33554432 if large else 1048576
        file_limit = 67108864 if language == 'csharp' else max_file
        limited = ['/usr/bin/prlimit', f'--as={address}:{address}', '--cpu=20:20',
                   f'--fsize={file_limit}:{file_limit}', '--nofile=1024:1024', '--nproc=512:512', '--core=0:0']
        if language == 'shell':
            limited.append('--data=805306368:805306368')
        guard = ('test ! -e /home && test -z "${HOME+x}" && '
                 'test "$(cat /proc/1/comm)" = bwrap && '
                 'test "$(readlink /proc/self/ns/net)" != "$AUDIT_HOST_NET_NS" && ')
        if candidate:
            guard += 'test ! -e /trusted && test ! -e /project/server/exercises && '
        guard += 'printf "REVI_ISOLATION_OK\\n" >&2 && exec "$@"'
        options += ['/bin/sh', '-eu', '-c', guard, 'audit', *limited, '--', *command]
        try:
            with tempfile.TemporaryFile(dir=self.work) as stdout_file, tempfile.TemporaryFile(dir=self.work) as stderr_file:
                process = subprocess.Popen(options, stdin=subprocess.PIPE, stdout=stdout_file, stderr=stderr_file,
                                           start_new_session=True, close_fds=True)
                timed_out = False
                try:
                    process.communicate(data.encode('utf8'), timeout=timeout)
                except subprocess.TimeoutExpired:
                    timed_out = True
                    try:
                        os.killpg(process.pid, signal.SIGKILL)
                    except ProcessLookupError:
                        pass
                    process.communicate()
                stdout_file.seek(0)
                stderr_file.seek(0)
                stdout = stdout_file.read(max_file + 1)
                stderr = stderr_file.read(max_file + 1)
                if not stderr.startswith(MARKER):
                    return {'ready': False, 'timeout': timed_out, 'exit': process.returncode,
                            'stderr_sha256': sha(stderr), 'reason': 'garde_bubblewrap_non_atteinte'}
                stderr = stderr[len(MARKER):]
                return {'ready': True, 'timeout': timed_out, 'exit': process.returncode,
                        'stdout': stdout.decode('utf8', errors='replace'), 'stdout_sha256': sha(stdout),
                        'stdout_size': len(stdout), 'stderr_sha256': sha(stderr), 'stderr_size': len(stderr),
                        'overflow': len(stdout) > max_file or len(stderr) > max_file}
        except OSError:
            return {'ready': False, 'reason': 'lancement_impossible'}

    def project_mounts(self, script):
        return ['--ro-bind', str(self.work / 'project'), '/project',
                '--dir', '/trusted', '--ro-bind', str(self.work / 'trusted' / script), f'/trusted/{script}']

    def sql_mounts(self, source):
        project = self.work / 'project'
        return ['--dir', '/code', '--ro-bind', str(source), '/code/solution.sql',
                '--dir', '/adapter', '--ro-bind', str(self.work / 'trusted/sql-worker.js'), '/adapter/sql-worker.js',
                '--dir', '/project', '--dir', '/project/assets', '--dir', '/project/assets/js',
                '--ro-bind', str(project / 'assets/js/engines'), '/project/assets/js/engines',
                '--dir', '/project/b1-sql', '--dir', '/project/b1-sql/assets', '--dir', '/project/b1-sql/assets/vendor',
                '--ro-bind', str(project / 'b1-sql/assets/vendor/sqljs'), '/project/b1-sql/assets/vendor/sqljs']

    def dotnet_mounts(self):
        return ['--ro-bind', self.dotnet['root'], '/dotnet']


def preflight(sandbox):
    program = ('import json,os,pathlib; '
               'print(json.dumps({"pid1_bwrap":pathlib.Path("/proc/1/comm").read_text().strip()=="bwrap",'
               '"reseau_separe":os.readlink("/proc/self/ns/net")!=os.environ["AUDIT_HOST_NET_NS"],'
               '"home_absent":not pathlib.Path("/home").exists(),"variable_home_absente":"HOME" not in os.environ,'
               '"interfaces":[x.strip().split(":")[0] for x in pathlib.Path("/proc/net/dev").read_text().splitlines()[2:]],'
               '"catalogue_absent":not pathlib.Path("/project/server/exercises").exists()}))')
    result = sandbox.run(['/usr/bin/python3', '-I', '-c', program])
    if not result['ready'] or result['timeout'] or result['exit'] != 0:
        raise RuntimeError('Autocontrôle bubblewrap impossible.')
    checks = json.loads(result['stdout'])
    if checks != {'pid1_bwrap': True, 'reseau_separe': True, 'home_absent': True,
                  'variable_home_absente': True, 'interfaces': ['lo'], 'catalogue_absent': True}:
        raise RuntimeError('Autocontrôle bubblewrap échoué.')
    version = sandbox.run(['/toolchain/node', '--version'])
    if not version['ready'] or version['exit'] != 0 or not re.fullmatch(r'v22\.\d+\.\d+', version['stdout'].strip()):
        raise RuntimeError('Le Node actif version 22 ne fonctionne pas sous bubblewrap.')
    checks['node'] = version['stdout'].strip()
    return checks


def load_catalogue(sandbox):
    result = sandbox.run(['/toolchain/node', '--max-old-space-size=512', '/trusted/extraire.js'],
                         mounts=sandbox.project_mounts('extraire.js'), language='javascript',
                         timeout=30, large=True, candidate=False)
    if not result['ready'] or result['timeout'] or result['exit'] != 0:
        raise RuntimeError('Extraction isolée des paires ou du catalogue impossible.')
    data = json.loads(result['stdout'])
    if len(data['exercises']) != 90 or Counter(item['course'] for item in data['exercises']) != Counter({course: 18 for course in COURSES}):
        raise RuntimeError('Inventaire extrait différent de 90 exercices.')
    return data


def sql_preflight(sandbox):
    source = sandbox.work / 'sql-preflight.sql'
    source.write_text('SELECT 1 AS valeur;', encoding='utf8')
    result = sandbox.run(['/toolchain/node', '--max-old-space-size=128', '/adapter/sql-worker.js'],
                         mounts=sandbox.sql_mounts(source), language='sql', timeout=20)
    if not result['ready'] or result['timeout'] or result['exit'] != 0:
        return False
    try:
        response = json.loads(result['stdout'])
        return response.get('status') == 'success' and 'valeur' in response.get('stdout', '')
    except (json.JSONDecodeError, AttributeError):
        return False


def rejected_or_incomplete(result):
    if not result.get('ready'):
        return {'etat': 'non_evalue', 'cause': result.get('reason', 'garde_non_atteinte'), 'execute': False}
    if result.get('timeout'):
        return {'etat': 'echec_execution', 'cause': 'delai_depasse', 'execute': True,
                'stderr_sha256': result.get('stderr_sha256')}
    if result.get('overflow'):
        return {'etat': 'echec_execution', 'cause': 'limite_sortie_du_banc', 'execute': True}
    if result.get('exit') != 0:
        return {'etat': 'echec_execution', 'cause': 'code_sortie_non_nul' if result['exit'] > 0 else 'signal',
                'code_sortie': result['exit'], 'execute': True, 'stdout_sha256': result.get('stdout_sha256'),
                'stderr_sha256': result.get('stderr_sha256')}
    return None


def sql_result(stdout):
    try:
        output = json.loads(stdout)
        if output.get('status') != 'success':
            return None, {'etat': 'echec_execution',
                          'cause': 'delai_sql' if output.get('status') == 'timeout' else 'erreur_sql',
                          'code_sortie': output.get('exitCode'), 'execute': True,
                          'stderr_sha256': sha(output.get('stderr', ''))}
        return output.get('stdout', ''), None
    except (ValueError, AttributeError):
        return None, {'etat': 'non_evalue', 'cause': 'reponse_sql_invalide', 'execute': True}


def selftest_execution(sandbox, sql_available):
    failed = sandbox.run(['/bin/bash', '-c', 'exit 7'])
    failure = rejected_or_incomplete(failed)
    if not failure or failure['etat'] != 'echec_execution' or failure['code_sortie'] != 7:
        raise RuntimeError('Autocontrôle du code de sortie échoué.')
    delayed = sandbox.run(['/bin/bash', '-c', 'sleep 5'], timeout=0.25)
    failure = rejected_or_incomplete(delayed)
    if not failure or failure['etat'] != 'echec_execution' or failure['cause'] != 'delai_depasse':
        raise RuntimeError('Autocontrôle du délai échoué.')
    unavailable = sandbox.run(['/bin/bash', '-c', 'exit 0'],
                              mounts=['--ro-bind', str(sandbox.work / 'montage-inexistant'), '/absent'])
    failure = rejected_or_incomplete(unavailable)
    if not failure or failure['etat'] != 'non_evalue' or failure['execute']:
        raise RuntimeError('Autocontrôle de l’infrastructure échoué.')
    if sql_available:
        source = sandbox.work / 'sql-preflight-incorrect.sql'
        source.write_text('SELEC 1;', encoding='utf8')
        result = sandbox.run(['/toolchain/node', '--max-old-space-size=128', '/adapter/sql-worker.js'],
                             mounts=sandbox.sql_mounts(source), language='sql', timeout=20)
        if rejected_or_incomplete(result):
            raise RuntimeError('Autocontrôle du moteur SQL interrompu.')
        _, failure = sql_result(result['stdout'])
        if not failure or failure['etat'] != 'echec_execution' or failure['cause'] != 'erreur_sql':
            raise RuntimeError('Autocontrôle de l’erreur SQL échoué.')


def compile_csharp(sandbox, source, directory):
    if sandbox.dotnet is None:
        return {'etat': 'non_evalue', 'cause': 'sdk_dotnet_indisponible', 'execute': False}
    config = sandbox.dotnet
    runtime_config = {'runtimeOptions': {'tfm': config['framework'],
                      'framework': {'name': 'Microsoft.NETCore.App', 'version': config['runtime']}}}
    (directory / 'Program.runtimeconfig.json').write_text(json.dumps(runtime_config), encoding='utf8')
    compiler = f"/dotnet/sdk/{config['sdk']}/Roslyn/bincore/csc.dll"
    command = ['/dotnet/dotnet', compiler, '-nologo', '-nostdlib+', '-target:exe', '-out:/out/Program.dll']
    command += [f'-r:{reference}' for reference in config['references']]
    command += ['/code/solution.cs']
    mounts = sandbox.dotnet_mounts() + ['--dir', '/code', '--ro-bind', str(source), '/code/solution.cs',
                                        '--bind', str(directory), '/out']
    result = sandbox.run(command, mounts=mounts, language='csharp', timeout=40)
    failure = rejected_or_incomplete(result)
    if failure:
        return {'etat': 'echec' if failure['etat'] == 'echec_execution' else 'non_evalue',
                'cause': failure['cause'], 'code_sortie': result.get('exit'),
                'stderr_sha256': result.get('stderr_sha256'), 'stdout_sha256': result.get('stdout_sha256')}
    if not (directory / 'Program.dll').is_file():
        return {'etat': 'non_evalue', 'cause': 'binaire_absent'}
    return {'etat': 'reussie', 'sha256_binaire': file_sha(directory / 'Program.dll')}


def run_candidate(sandbox, exercise, candidate, candidate_index, sql_available):
    directory = sandbox.work / 'candidats' / exercise['id'] / str(candidate_index + 1)
    directory.mkdir(parents=True, exist_ok=False)
    language = exercise['language']
    suffix = {'csharp': 'cs', 'shell': 'sh', 'sql': 'sql'}[language]
    source = directory / f'solution.{suffix}'
    source.write_text(candidate['code'], encoding='utf8')
    compilation = None
    if language == 'csharp':
        build = directory / 'build'
        build.mkdir()
        compilation = compile_csharp(sandbox, source, build)
        if compilation['etat'] != 'reussie':
            return {'compilation': compilation, 'cells': [
                {'etat': 'non_evalue', 'cause': 'compilation_' + compilation['etat'], 'execute': False}
                for _ in exercise['cases']]}
    if language == 'sql' and not sql_available:
        return {'compilation': None, 'cells': [
            {'etat': 'non_evalue', 'cause': 'moteur_sql_indisponible', 'execute': False}
            for _ in exercise['cases']]}
    if language == 'shell':
        command = ['/bin/bash', '-c', candidate['code']]
        mounts = []
    elif language == 'sql':
        command = ['/toolchain/node', '--max-old-space-size=128', '/adapter/sql-worker.js']
        mounts = sandbox.sql_mounts(source)
    else:
        command = ['/dotnet/dotnet', '/program/Program.dll']
        mounts = sandbox.dotnet_mounts() + ['--ro-bind', str(directory / 'build'), '/program']
    cells = []
    for entry in exercise['cases']:
        extra_env = {'LC_ALL': 'C'} if exercise['course'] == 'b3-linux' else None
        result = sandbox.run(command, data=entry['sample']['stdin'], mounts=mounts, language=language,
                             timeout=20 if language == 'sql' else 10, extra_env=extra_env)
        failure = rejected_or_incomplete(result)
        if failure:
            cells.append(failure)
            continue
        stdout = result['stdout']
        if language == 'sql':
            stdout, failure = sql_result(stdout)
            if failure:
                cells.append(failure)
                continue
        cells.append({'etat': 'a_comparer', 'execute': True, 'stdout': stdout,
                      'stdout_sha256': sha(stdout), 'stderr_sha256': result['stderr_sha256']})
    return {'compilation': compilation, 'cells': cells}


def compare(sandbox, catalogue, runs):
    rows = []
    locations = []
    for exercise_index, exercise in enumerate(catalogue['exercises']):
        for candidate_index in range(-1, len(exercise['variants'])):
            result = runs[(exercise_index, candidate_index)]
            for case_index, cell in enumerate(result['cells']):
                if cell['etat'] == 'a_comparer':
                    rows.append({'exercise': exercise_index, 'candidate': candidate_index, 'case': case_index,
                                 'stdout': cell['stdout']})
                    locations.append(cell)
    payload = json.dumps({'exercises': catalogue['exercises'], 'rows': rows}, ensure_ascii=False)
    result = sandbox.run(['/toolchain/node', '--max-old-space-size=512', '/trusted/comparer.js'], data=payload,
                         mounts=sandbox.project_mounts('comparer.js'), language='javascript',
                         timeout=60, large=True, candidate=False)
    if not result['ready'] or result['timeout'] or result['exit'] != 0:
        for cell in locations:
            cell.update({'etat': 'non_evalue', 'cause': 'comparateur_indisponible'})
            cell.pop('stdout', None)
        return False
    response = json.loads(result['stdout'])
    if response.get('selftests') != 'reussis' or len(response.get('states', [])) != len(locations):
        raise RuntimeError('Autocontrôle ou cardinalité du comparateur invalide.')
    for cell, state in zip(locations, response['states']):
        if state not in {'accepte', 'mauvaise_sortie', 'source_invalide', 'non_evalue'}:
            raise RuntimeError('État de comparaison inconnu.')
        cell['etat'] = state
        cell.pop('stdout', None)
    return True


def evidence(reference, variants):
    empty = {'exclusifs_toutes_variantes': [[] for _ in variants],
             'necessite_relative': [[] for _ in variants], 'paires': []}
    if not reference or any(cell['etat'] != 'accepte' for cell in reference):
        return empty
    states = [[cell['etat'] for cell in variant] for variant in variants]
    for variant_index, vector in enumerate(states):
        for case_index, state in enumerate(vector):
            if state == 'mauvaise_sortie' and all(other[case_index] == 'accepte'
                                                  for index, other in enumerate(states) if index != variant_index):
                empty['exclusifs_toutes_variantes'][variant_index].append(case_index + 1)
        wrong = [index for index, state in enumerate(vector) if state == 'mauvaise_sortie']
        if len(wrong) == 1 and all(state == 'accepte' for index, state in enumerate(vector) if index != wrong[0]):
            empty['necessite_relative'][variant_index].append(wrong[0] + 1)
    for first, second in itertools.combinations(range(len(states)), 2):
        first_only = [index + 1 for index, state in enumerate(states[first])
                      if state == 'mauvaise_sortie' and states[second][index] == 'accepte']
        second_only = [index + 1 for index, state in enumerate(states[second])
                       if state == 'mauvaise_sortie' and states[first][index] == 'accepte']
        empty['paires'].append({'variantes': [first + 1, second + 1],
                                'temoins_premiere_seule': first_only, 'temoins_seconde_seule': second_only})
    return empty


def selftest_evidence():
    cells = lambda *states: [{'etat': state} for state in states]
    reference = cells('accepte', 'accepte', 'accepte')
    first = cells('mauvaise_sortie', 'accepte', 'mauvaise_sortie')
    second = cells('accepte', 'mauvaise_sortie', 'mauvaise_sortie')
    output = evidence(reference, [first, second])
    assert output['exclusifs_toutes_variantes'] == [[1], [2]]
    assert output['necessite_relative'] == [[], []]
    assert output['paires'][0]['temoins_premiere_seule'] == [1]
    assert output['paires'][0]['temoins_seconde_seule'] == [2]
    assert evidence(cells('accepte', 'non_evalue', 'accepte'), [first, second])['paires'] == []
    third = cells('mauvaise_sortie', 'accepte', 'accepte')
    assert evidence(reference, [first, second, third])['exclusifs_toutes_variantes'][0] == []
    assert evidence(reference, [cells('accepte', 'mauvaise_sortie', 'accepte'), second])['necessite_relative'][0] == [2]


def candidate_status(cells):
    states = [cell['etat'] for cell in cells]
    if 'mauvaise_sortie' in states:
        verdict = 'rejet_mauvaise_sortie'
    elif 'source_invalide' in states:
        verdict = 'rejet_source'
    elif 'echec_execution' in states:
        verdict = 'rejet_execution'
    elif 'non_evalue' in states:
        verdict = 'non_evalue'
    else:
        verdict = 'accepte_tous_les_cas'
    return verdict, dict(Counter(states))


def construct_report(catalogue, runs, provenance, isolation, sql_available, comparison, started):
    reports = []
    summaries = {}
    for course in COURSES:
        summaries[course] = {'exercices': 0, 'cas_actifs': 0, 'executions_prevues': 0, 'executions_effectives': 0,
                             'corriges_conformes': 0, 'variantes': 0, 'variantes_rejetees_mauvaise_sortie': 0,
                             'variantes_rejetees_execution_seulement': 0, 'variantes_acceptees': 0,
                             'variantes_avec_non_evalue': 0, 'cellules_non_evaluees': 0,
                             'cellules_echec_execution': 0, 'fiches_deux_temoins_paire': 0,
                             'temoins_exclusifs_toutes_variantes': 0, 'temoins_necessite_relative': 0}
    for exercise_index, exercise in enumerate(catalogue['exercises']):
        summary = summaries[exercise['course']]
        summary['exercices'] += 1
        summary['cas_actifs'] += len(exercise['cases'])
        summary['executions_prevues'] += len(exercise['cases']) * (1 + len(exercise['variants']))
        reference_run = runs[(exercise_index, -1)]
        reference = reference_run['cells']
        variant_runs = [runs[(exercise_index, index)] for index in range(len(exercise['variants']))]
        variants = [result['cells'] for result in variant_runs]
        all_cells = reference + list(itertools.chain.from_iterable(variants))
        summary['executions_effectives'] += sum(bool(cell['execute']) for cell in all_cells)
        summary['cellules_non_evaluees'] += sum(cell['etat'] == 'non_evalue' for cell in all_cells)
        summary['cellules_echec_execution'] += sum(cell['etat'] == 'echec_execution' for cell in all_cells)
        reference_ok = all(cell['etat'] == 'accepte' for cell in reference)
        summary['corriges_conformes'] += int(reference_ok)
        witnesses = evidence(reference, variants)
        if witnesses['paires'] and witnesses['paires'][0]['temoins_premiere_seule'] and witnesses['paires'][0]['temoins_seconde_seule']:
            summary['fiches_deux_temoins_paire'] += 1
        summary['temoins_exclusifs_toutes_variantes'] += sum(map(len, witnesses['exclusifs_toutes_variantes']))
        summary['temoins_necessite_relative'] += sum(map(len, witnesses['necessite_relative']))
        case_reports = []
        for index, entry in enumerate(exercise['cases']):
            sample = entry['sample']
            case_reports.append({
                'numero': index + 1, 'origine': entry['origin'], 'indice_origine': entry['index'],
                'label': sample.get('label', f"Test {index + 1}"), 'entree_sha256': sha(sample['stdin']),
                'attendu_sha256': sha(sample['expected']), 'mode': sample.get('mode'),
                'comparateur': sample.get('comparator'), 'tolerance': sample.get('tolerance'),
                'corrige': reference[index],
                'variantes': [{'numero': variant_index + 1, **cells[index]} for variant_index, cells in enumerate(variants)]
            })
        variant_reports = []
        for index, (variant, result) in enumerate(zip(exercise['variants'], variant_runs)):
            verdict, states = candidate_status(result['cells'])
            summary['variantes'] += 1
            summary['variantes_rejetees_mauvaise_sortie'] += int(verdict == 'rejet_mauvaise_sortie')
            summary['variantes_rejetees_execution_seulement'] += int(verdict == 'rejet_execution')
            summary['variantes_acceptees'] += int(verdict == 'accepte_tous_les_cas')
            summary['variantes_avec_non_evalue'] += int('non_evalue' in states)
            variant_reports.append({
                'numero': variant['index'], 'label': variant['label'], 'source_sha256': variant['sha256'],
                'occurrences_motif': variant.get('occurrences'), 'verdict': verdict,
                'cellules': states, 'compilation': result['compilation'],
                'temoins_exclusifs_toutes_variantes': witnesses['exclusifs_toutes_variantes'][index],
                'temoins_necessite_relative': witnesses['necessite_relative'][index]
            })
        reports.append({
            'id': exercise['id'], 'cours': exercise['course'], 'langage': exercise['language'],
            'adaptation_historique': exercise.get('historicalAdaptation'),
            'tests_caches_total': exercise['hiddenTotal'], 'tests_caches_hors_plafond': exercise['hiddenExcluded'],
            'exemple_verifie_actif': exercise['verifyFirstExample'], 'cas_actifs': len(case_reports),
            'corrige': {'source_sha256': exercise['solution']['sha256'], 'conforme_sur_tous_les_cas': reference_ok,
                        'cellules': dict(Counter(cell['etat'] for cell in reference)), 'compilation': reference_run['compilation']},
            'variantes': variant_reports, 'temoins_par_paire': witnesses['paires'], 'matrice': case_reports
        })
    totals = {key: sum(summary[key] for summary in summaries.values()) for key in next(iter(summaries.values()))}
    complete = (not provenance['sources_modifiees_apres_copie'] and not provenance['banc_modifie_durant_rejeu'] and
                comparison and sql_available and
                totals['executions_effectives'] == totals['executions_prevues'] and
                totals['corriges_conformes'] == totals['exercices'] and totals['cellules_non_evaluees'] == 0 and
                totals['cellules_echec_execution'] == 0 and
                totals['variantes_rejetees_mauvaise_sortie'] == totals['variantes'])
    return {
        'schema': 'revi.matrice-rejet-lot1.v1', 'date_debut_utc': started, 'date_fin_utc': now(),
        'etat': 'complet' if complete else 'incomplet_ou_anomalie',
        'portee': {'cours': list(COURSES), 'exercices': 90, 'max_tests_caches': catalogue['maxTests'],
                   'selection': 'tests[:MAX_TESTS], puis premier exemple si verifyFirstExample=true',
                   'notation_cours': 'suspendue dans le snapshot', 'sql_b2_b3': 'exclus'},
        'provenance': provenance, 'confinement': isolation,
        'autocontroles': {'temoins_synthetiques': 'reussis', 'comparateur_du_correcteur': 'reussi' if comparison else 'non_evalue',
                          'echec_execution_delai_et_infrastructure': 'reussis',
                          'moteur_et_erreur_sql': 'reussi' if sql_available else 'non_evalue'},
        'definitions': {
            'accepte': 'Sortie acceptée par runTests pour ce cas isolé.',
            'mauvaise_sortie': 'Exécution réussie et sortie refusée par runTests.',
            'echec_execution': 'Processus ou moteur en échec, signal ou délai ; ne prouve pas une mauvaise sortie.',
            'non_evalue': 'Case sans comparaison probante, par exemple compilation impossible ou infrastructure absente.',
            'temoin_paire': 'Corrigé conforme sur tous les cas, une variante en mauvaise sortie sur ce cas et l’autre acceptée ; les éventuelles autres variantes ne sont pas prises en compte.',
            'temoin_exclusif_toutes_variantes': 'Corrigé conforme sur tous les cas ; une seule variante en mauvaise sortie sur ce cas et toutes les autres acceptées.',
            'necessite_relative': 'Corrigé conforme partout ; variante en mauvaise sortie sur un seul cas et acceptée sur chacun des autres cas actifs.',
            'executes': 'Une compilation est faite une fois par candidat C# ; seuls les processus par cas effectivement lancés comptent comme exécutions.'
        },
        'limites': [
            'La matrice compare aux attendus fournis par les fiches ; elle ne constitue pas un oracle indépendant de la spécification.',
            'Un témoin exclusif est relatif aux variantes et cas effectivement listés, pas à toutes les erreurs possibles.',
            'Les cas extérieurs à tests[:MAX_TESTS] et les exemples sans verifyFirstExample ne sont pas actifs et ne sont pas rejoués.',
            'Le service distant et la route suspendue ne sont pas exécutés ; SQL B1 utilise localement le moteur sql.js du dépôt.',
            'La présence de plusieurs variantes ne prouve ni la généralisation ni l’absence de mémorisation.',
            'Pour dk2-c1-e2, les deux mutations historiques sont rematérialisées sur la nouvelle solution décimale ; les anciens codes ne sont pas rejoués.',
            'Un plafond de ressources ou une panne de compilation reste explicitement une limite du rejeu.'
        ],
        'comptes_par_cours': summaries, 'total': totals, 'exercices': reports
    }


def write_report(report, destination):
    content = json.dumps(report, ensure_ascii=False, indent=2) + '\n'
    if destination is None:
        sys.stdout.write(content)
        return
    with tempfile.NamedTemporaryFile(mode='w', encoding='utf8', dir=destination.parent,
                                     prefix='.revi-matrice-', delete=False) as file:
        name = file.name
        file.write(content)
    try:
        os.replace(name, destination)
    finally:
        if os.path.exists(name):
            os.unlink(name)


def main():
    parser = argparse.ArgumentParser(description='Matrice isolée des variantes lot 1, hors SQL B2/B3.')
    parser.add_argument('--repo', help='racine du dépôt ; recherchée depuis le répertoire courant sinon')
    parser.add_argument('--output', default='-', help='JSON sur stdout ou chemin sous /tmp')
    parser.add_argument('--jobs', type=int, default=4, help='nombre de candidats simultanés, de 1 à 8')
    args = parser.parse_args()
    os.umask(0o077)
    started = now()
    destination = output_path(args.output)
    if not 1 <= args.jobs <= 8:
        raise RuntimeError('--jobs doit être compris entre 1 et 8.')
    repo = find_repo(args.repo)
    if destination is not None and destination.is_relative_to(repo):
        raise RuntimeError('Le rapport doit être hors du dépôt.')
    node_path = shutil.which('node')
    bwrap_path = shutil.which('bwrap')
    if not node_path or not bwrap_path or not Path('/usr/bin/prlimit').is_file():
        raise RuntimeError('Node, bubblewrap ou prlimit absent.')
    banc_files = ('matrice.py', 'extraire.js', 'comparer.js', 'sql-worker.js', 'rejouer.sh', 'verifier-rapport.py')
    banc_manifest = {name: file_sha(PACKAGE / name) for name in banc_files}
    selftest_evidence()
    with tempfile.TemporaryDirectory(prefix='revi-matrice-', dir='/tmp') as temp:
        work = Path(temp)
        manifest = copy_inputs(repo, work)
        if any(file_sha(work / 'trusted' / name) != banc_manifest[name]
               for name in ('extraire.js', 'comparer.js', 'sql-worker.js')):
            raise RuntimeError('Fichiers du banc modifiés pendant la préparation.')
        node = work / 'node'
        shutil.copyfile(Path(node_path).resolve(strict=True), node)
        node.chmod(stat.S_IRUSR | stat.S_IXUSR)
        dotnet = dotnet_configuration(repo)
        sandbox = Sandbox(work, node, Path(bwrap_path).resolve(strict=True), dotnet)
        isolation = preflight(sandbox)
        catalogue = load_catalogue(sandbox)
        sql_available = sql_preflight(sandbox)
        selftest_execution(sandbox, sql_available)
        runs = {}
        jobs = []
        for exercise_index, exercise in enumerate(catalogue['exercises']):
            jobs.append((exercise_index, -1, exercise, exercise['solution']))
            jobs.extend((exercise_index, index, exercise, candidate) for index, candidate in enumerate(exercise['variants']))
        finished = 0
        with concurrent.futures.ThreadPoolExecutor(max_workers=args.jobs) as pool:
            futures = {pool.submit(run_candidate, sandbox, exercise, candidate, index, sql_available): (exercise_index, index)
                       for exercise_index, index, exercise, candidate in jobs}
            for future in concurrent.futures.as_completed(futures):
                exercise_index, index = futures[future]
                try:
                    runs[(exercise_index, index)] = future.result()
                except Exception:
                    exercise = catalogue['exercises'][exercise_index]
                    runs[(exercise_index, index)] = {'compilation': None, 'cells': [
                        {'etat': 'non_evalue', 'cause': 'incident_du_banc', 'execute': False}
                        for _ in exercise['cases']]}
                finished += 1
                if finished % 45 == 0 or finished == len(jobs):
                    print(f'Rejeu : {finished}/{len(jobs)} candidats terminés.', file=sys.stderr, flush=True)
        comparison = compare(sandbox, catalogue, runs)
        provenance = {'fichiers_sha256': manifest, 'sources_modifiees_apres_copie': stable_sources(repo, manifest),
                      'node_sha256': file_sha(node),
                      'dotnet': {key: dotnet[key] for key in ('sdk', 'runtime', 'framework')} if dotnet else None,
                      'banc_sha256': banc_manifest,
                      'banc_modifie_durant_rejeu': [name for name, expected in banc_manifest.items()
                                                    if not (PACKAGE / name).is_file() or file_sha(PACKAGE / name) != expected]}
        report = construct_report(catalogue, runs, provenance, isolation, sql_available, comparison, started)
        write_report(report, destination)
        return 0 if report['etat'] == 'complet' else 1


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (RuntimeError, OSError, ValueError, AssertionError, json.JSONDecodeError) as error:
        print(f'Matrice interrompue : {error}', file=sys.stderr)
        sys.exit(2)
