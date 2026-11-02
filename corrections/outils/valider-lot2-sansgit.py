from pathlib import Path
import os
import shutil
import subprocess
import sys
import tempfile


root = Path(__file__).resolve().parents[2]
result_directory = root / 'corrections' / 'resultats'
node = shutil.which('node')
bwrap = shutil.which('bwrap')
if not node or not bwrap:
    raise SystemExit('Node et Bubblewrap sont nécessaires.')
if not (root / 'node_modules').is_dir():
    raise SystemExit('Le dossier node_modules est nécessaire.')

excludes = [
    './.git', './node_modules', './dist', './verification', './corrections',
    './.taskstate', './audit', './design-audit', './.env', './.env.*',
    '*/.env', '*/.env.*', '*/.npmrc', '*/.pypirc', '*/.ssh', '*/.gnupg',
    '*.pem', '*.key', '*.p12', '*.pfx',
]
prefix = 'lot2-finale-v13-sansgit'
host_network = os.readlink('/proc/self/ns/net')

with tempfile.TemporaryDirectory(prefix='revi-lot2-validation-', dir='/tmp') as temporary:
    sandbox = Path(temporary)
    project = sandbox / 'project'
    project.mkdir()
    archive = subprocess.Popen(
        ['tar', '-C', str(root), *[f'--exclude={item}' for item in excludes], '-cf', '-', '.'],
        stdout=subprocess.PIPE,
    )
    extraction = subprocess.run(['tar', '-C', str(project), '-xf', '-'], stdin=archive.stdout)
    archive.stdout.close()
    if extraction.returncode or archive.wait():
        raise SystemExit('Échec de la copie temporaire du projet.')

    for directory in ('node_modules', 'corrections/outils', 'corrections/fixtures'):
        (project / directory).mkdir(parents=True, exist_ok=True)
    (sandbox / 'results').mkdir()
    (sandbox / 'passwd').write_text(f'sandbox:x:{os.getuid()}:{os.getgid()}:Sandbox:/tmp:/bin/sh\n')
    (sandbox / 'group').write_text(f'sandbox:x:{os.getgid()}:\n')
    common = [
        bwrap, '--die-with-parent', '--unshare-net', '--unshare-pid', '--clearenv',
        '--ro-bind', '/usr', '/usr', '--symlink', 'usr/bin', '/bin',
        '--symlink', 'usr/lib', '/lib', '--symlink', 'usr/lib', '/lib64',
        '--dir', '/etc', '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
        '--ro-bind', str(sandbox / 'passwd'), '/etc/passwd',
        '--ro-bind', str(sandbox / 'group'), '/etc/group',
        '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp',
        '--ro-bind', str(Path(node).resolve()), '/usr/bin/node',
        '--bind', str(project), '/project', '--ro-bind', str(project), '/work',
        '--ro-bind', str(root / 'node_modules'), '/project/node_modules',
        '--ro-bind', str(root / 'corrections' / 'outils'), '/project/corrections/outils',
        '--ro-bind', str(root / 'corrections' / 'fixtures'), '/project/corrections/fixtures',
        '--bind', str(sandbox / 'results'), '/resultats', '--chdir', '/project',
        '--setenv', 'PATH', '/usr/bin:/bin', '--setenv', 'HOME', '/tmp',
        '--setenv', 'LANG', 'C.UTF-8', '--setenv', 'REVI_AUDIT_ISOLE', '1',
        '--setenv', 'REVI_AUDIT_NET_NS_HOTE', host_network,
        '--setenv', 'REVI_ISOLE', '1', '--setenv', 'REVI_LOT1_ISOLATED', '1',
        '--setenv', 'CSHARP_LOT1_ISOLATED', '1',
        '--setenv', 'CSHARP_HOST_NET_NS', host_network,
        '--setenv', 'CHROME_BIN', '/usr/bin/chromium',
    ]
    fonts = Path('/etc/fonts')
    if fonts.is_dir():
        common.extend(['--ro-bind', str(fonts), '/etc/fonts'])
    powershell = Path('/tmp/revi-lot0.zFUSif/runtimes/powershell')
    if (powershell / 'pwsh').is_file():
        common.extend([
            '--dir', '/runtimes', '--ro-bind', str(powershell), '/runtimes/powershell',
            '--setenv', 'INTEGRITE_CAS_LOT1_PWSH', '/runtimes/powershell/pwsh',
        ])

    commands = {
        'suite': (['npm', 'test'], 1200),
        'build': (['npm', 'run', 'build'], 900),
        'politique': (['node', '--test', 'tests/execution-policy.test.js', 'tests/no-local-shell.test.js',
                       'tests/security-remediation.test.js'], 900),
        'execution': (['node', '/project/corrections/outils/sondes/sondes-execution.js'], 900),
    }
    selected = sys.argv[1:] or ['suite', 'build']
    if any(label not in commands for label in selected):
        raise SystemExit('Modes acceptés : suite, build, politique, execution.')
    codes = []
    for label in selected:
        command, timeout = commands[label]
        options = list(common)
        if label == 'politique':
            options.extend(['--unsetenv', 'HOME', '--setenv', 'F39_ISOLATED_PROBES', '1',
                            '--setenv', 'F39_HOST_NET_NS', host_network])
        print(f'{label} : démarrage dans la copie isolée', flush=True)
        output = result_directory / f'{prefix}-{label}.txt'
        errors = result_directory / f'{prefix}-{label}.stderr.txt'
        with output.open('w', encoding='utf8') as stdout, errors.open('w', encoding='utf8') as stderr:
            try:
                result = subprocess.run([*options, *command], stdout=stdout, stderr=stderr, timeout=timeout)
                code = result.returncode
            except subprocess.TimeoutExpired:
                stderr.write(f'Expiration après {timeout} secondes.\n')
                code = 124
        (result_directory / f'{prefix}-{label}.exit.txt').write_text(f'{code}\n')
        codes.append(code)
        print(f'{label} : code {code}', flush=True)

sys.exit(0 if all(code == 0 for code in codes) else 1)
