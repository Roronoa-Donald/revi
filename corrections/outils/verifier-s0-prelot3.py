from pathlib import Path
import argparse
import hashlib
import os
import shutil
import subprocess
import tempfile
import time
import urllib.request


parser = argparse.ArgumentParser()
parser.add_argument('--avec-fpc', action='store_true')
options = parser.parse_args()


def run(command, **kwargs):
    return subprocess.run(command, check=True, text=True, capture_output=True, **kwargs).stdout


def verify_git(temporary):
    directory = temporary / 'depot-synthetique'
    directory.mkdir()
    environment = {**os.environ, 'HOME': str(temporary), 'GIT_CONFIG_NOSYSTEM': '1'}

    def git(*args):
        return run(['git', '-c', 'core.hooksPath=/dev/null', '-c', 'commit.gpgsign=false',
                    '-c', 'user.name=Verification', '-c', 'user.email=verification@localhost',
                    '-C', str(directory), *args], env=environment).strip()

    source = directory / 'fichier-fictif.txt'
    source.write_text('DONNEE_FICTIVE_F48\n', encoding='utf8')
    git('init', '-q')
    git('add', source.name)
    git('commit', '-qm', 'fixture synthétique')
    original_head = git('rev-parse', 'HEAD')
    git('rm', '--cached', '--', source.name)
    assert source.is_file() and not git('ls-files', '--', source.name)
    assert git('rev-parse', 'HEAD') == original_head
    git('restore', '--staged', '--', source.name)
    git('rm', '--', source.name)
    assert not source.exists() and not git('ls-files', '--', source.name)
    assert git('rev-parse', 'HEAD') == original_head
    assert git('show', f'HEAD:{source.name}') == 'DONNEE_FICTIVE_F48'
    print('F48 : --cached conserve le fichier ; rm le retire ; HEAD et historique restent inchangés.')


def verify_journal(temporary):
    boot = Path('/proc/sys/kernel/random/boot_id').read_text().strip().replace('-', '')
    previous_boot = '2' * 32 if boot != '2' * 32 else '3' * 32
    machine = 'a' * 32
    now = int(time.time() * 1_000_000)
    entries = [
        (previous_boot, now - 3_000_000, '3', 'F148_ERREUR_AUTRE_DEMARRAGE'),
        (boot, now - 2_000_000, '6', 'F148_INFORMATION_COURANTE'),
        (boot, now - 1_000_000, '3', 'F148_ERREUR_COURANTE'),
    ]
    payload = ''.join(
        f'__REALTIME_TIMESTAMP={timestamp}\n__MONOTONIC_TIMESTAMP={index * 1_000_000}\n'
        f'_BOOT_ID={entry_boot}\n_MACHINE_ID={machine}\n_TRANSPORT=journal\n'
        f'PRIORITY={priority}\nMESSAGE={message}\n\n'
        for index, (entry_boot, timestamp, priority, message) in enumerate(entries, 1)
    )
    journal = temporary / 'fixture.journal'
    run(['/usr/lib/systemd/systemd-journal-remote', '--split-mode=none', f'--output={journal}', '-'], input=payload)
    result = run(['journalctl', '--file', str(journal), '-p', 'err', '-b', '--no-pager', '-o', 'cat'])
    assert result.strip() == 'F148_ERREUR_COURANTE', result
    previous = run(['journalctl', '--file', str(journal), '-p', 'err', f'--boot={previous_boot}',
                    '--no-pager', '-o', 'cat'])
    assert previous.strip() == 'F148_ERREUR_AUTRE_DEMARRAGE', previous
    print('F148 : journalctl -p err -b sélectionne l’erreur du démarrage courant dans un journal synthétique.')


def verify_pascal(temporary):
    metadata = run(['pacman', '-Sp', '--print-format', '%h %l', '--nodeps', 'fpc']).strip().splitlines()
    assert len(metadata) == 1
    expected, url = metadata[0].split(' ', 1)
    assert expected == '13345961c4d77e4498d60905cee958af3814c71b6953dbe4c57765c5bc9a307a'
    package = temporary / 'fpc.pkg.tar.zst'
    with urllib.request.urlopen(url, timeout=90) as response, package.open('wb') as output:
        shutil.copyfileobj(response, output)
    assert hashlib.sha256(package.read_bytes()).hexdigest() == expected
    extracted = temporary / 'fpc'
    extracted.mkdir()
    run(['bsdtar', '-xf', str(package), '-C', str(extracted)])
    compiler = next(extracted.glob('usr/lib/fpc/*/ppcx64'))
    units = next(extracted.glob('usr/lib/fpc/*/units/x86_64-linux/rtl'))
    program = temporary / 'repetition.pas'
    program.write_text('''program repetition;
var valeur, passages: integer;
begin
  valeur := 0;
  passages := 0;
  repeat
    valeur := valeur + 1;
    passages := passages + 1
  until valeur = 3;
  writeln(valeur, ' ', passages);
  valeur := 0;
  passages := 0;
  repeat
    passages := passages + 1
  until valeur = 0;
  writeln(passages)
end.
''', encoding='utf8')
    run([str(compiler), '-n', f'-Fu{units}', f'-FE{temporary}', f'-FU{temporary}', str(program)])
    result = run(['/usr/bin/bwrap', '--die-with-parent', '--unshare-all', '--new-session', '--clearenv',
                  '--cap-drop', 'ALL', '--ro-bind', '/usr', '/usr', '--symlink', 'usr/bin', '/bin',
                  '--symlink', 'usr/lib', '/lib', '--symlink', 'usr/lib', '/lib64',
                  '--dir', '/etc', '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
                  '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp',
                  '--ro-bind', str(temporary / 'repetition'), '/tmp/repetition', '/tmp/repetition'])
    assert result == '3 3\n1\n', repr(result)
    print('F107 : Free Pascal 3.2.2 termine lorsque la condition devient vraie et exécute au moins un passage.')


with tempfile.TemporaryDirectory(prefix='revi-prelot3-s0-') as directory:
    temporary = Path(directory)
    verify_git(temporary)
    verify_journal(temporary)
    if options.avec_fpc:
        verify_pascal(temporary)
