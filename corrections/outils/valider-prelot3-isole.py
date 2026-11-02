from pathlib import Path
import os
import shutil
import subprocess
import sys
import tempfile


root = Path(__file__).resolve().parents[2]
node = shutil.which('node')
bwrap = shutil.which('bwrap')
if not node or not bwrap or not (root / 'node_modules').is_dir():
    raise SystemExit('Node, Bubblewrap et node_modules sont nécessaires.')

commands = {
    'suite': (['npm', 'test'], 1200),
    'build': (['npm', 'run', 'build'], 900),
    's0': (['node', '--test', 'tests/github-securite-lot2.test.js', 'tests/cryptographie-lot2.test.js',
            'tests/virtualisation-lot2.test.js', 'tests/contre-verification-s0-lot2.test.js',
            'tests/cloud-qualifications-lot2.test.js', 'tests/sql-lot2.test.js',
            'tests/b3-sql-accueil-novice-lot2.test.js'], 600),
}
selected = sys.argv[1:] or ['suite', 'build']
if any(name not in commands for name in selected):
    raise SystemExit('Modes acceptés : suite, build, s0.')

excludes = [
    './.git', './node_modules', './dist', './verification', './corrections',
    './.taskstate', './audit', './design-audit', './.env', './.env.*',
    '*/.env', '*/.env.*', '*/.npmrc', '*/.pypirc', '*/.ssh', '*/.gnupg',
    '*.pem', '*.key', '*.p12', '*.pfx',
]
output = Path(tempfile.mkdtemp(prefix='revi-prelot3-resultats-', dir='/tmp'))
host_network = os.readlink('/proc/self/ns/net')
print(f'Résultats : {output}', flush=True)
with tempfile.TemporaryDirectory(prefix='revi-prelot3-validation-', dir='/tmp') as directory:
    sandbox = Path(directory)
    project = sandbox / 'project'
    project.mkdir()
    archive = subprocess.Popen(['tar', '-C', str(root), *[f'--exclude={item}' for item in excludes], '-cf', '-', '.'],
                               stdout=subprocess.PIPE)
    extraction = subprocess.run(['tar', '-C', str(project), '-xf', '-'], stdin=archive.stdout)
    archive.stdout.close()
    if extraction.returncode or archive.wait():
        raise SystemExit('Échec de la copie temporaire du projet.')
    for path in ('node_modules', 'corrections'):
        (project / path).mkdir(parents=True, exist_ok=True)
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
        '--ro-bind', str(root / 'corrections'), '/project/corrections',
        '--chdir', '/project', '--setenv', 'PATH', '/usr/bin:/bin',
        '--setenv', 'HOME', '/tmp', '--setenv', 'LANG', 'C.UTF-8',
        '--setenv', 'REVI_AUDIT_ISOLE', '1', '--setenv', 'REVI_AUDIT_NET_NS_HOTE', host_network,
        '--setenv', 'REVI_ISOLE', '1', '--setenv', 'REVI_LOT1_ISOLATED', '1',
        '--setenv', 'CSHARP_LOT1_ISOLATED', '1', '--setenv', 'CSHARP_HOST_NET_NS', host_network,
        '--setenv', 'CHROME_BIN', '/usr/bin/chromium',
    ]
    if Path('/etc/fonts').is_dir():
        common.extend(['--ro-bind', '/etc/fonts', '/etc/fonts'])
    powershell = Path('/tmp/revi-lot0.zFUSif/runtimes/powershell')
    if (powershell / 'pwsh').is_file():
        common.extend(['--dir', '/runtimes', '--ro-bind', str(powershell), '/runtimes/powershell',
                       '--setenv', 'INTEGRITE_CAS_LOT1_PWSH', '/runtimes/powershell/pwsh'])
    codes = []
    for name in selected:
        command, timeout = commands[name]
        print(f'{name} : démarrage dans la copie isolée', flush=True)
        with (output / f'{name}.txt').open('w', encoding='utf8') as stdout, \
                (output / f'{name}.stderr.txt').open('w', encoding='utf8') as stderr:
            try:
                code = subprocess.run([*common, *command], stdout=stdout, stderr=stderr, timeout=timeout).returncode
            except subprocess.TimeoutExpired:
                stderr.write(f'Expiration après {timeout} secondes.\n')
                code = 124
        (output / f'{name}.exit.txt').write_text(f'{code}\n')
        codes.append(code)
        print(f'{name} : code {code}', flush=True)
sys.exit(0 if all(code == 0 for code in codes) else 1)
