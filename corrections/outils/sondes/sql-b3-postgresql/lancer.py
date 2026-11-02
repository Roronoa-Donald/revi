#!/usr/bin/env python3
import argparse
import os
import pwd
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


os.umask(0o077)
home_environnement = os.environ.pop('HOME', None)
try:
    home_compte = pwd.getpwuid(os.getuid()).pw_dir
except KeyError:
    home_compte = None
homes = []
for value in (home_environnement, home_compte):
    if value and Path(value).is_absolute():
        candidate = Path(value).resolve()
        if candidate != Path('/') and candidate not in homes:
            homes.append(candidate)
outil = Path(__file__).resolve().parent
fichiers = (
    'server/content/b3-sql/chapitre2.js',
    'server/content/b3-sql/chapitre5.js',
    'server/content/b3-sql/pages/examens-exercices.js',
)
fichiers_outil = (
    'extraire.py', 'interieur.sh', 'sql/schema.sql', 'sql/test-virement.sql',
    'sql/test-audit.sql', 'sql/test-rls.sql', 'sql/limites-numeriques.sql',
    'sql/limite-numeric-precision.sql', 'sql/limite-rollback.sql',
    'sql/limite-contrainte-differee.sql', 'sql/limite-commit.sql',
    'sql/limite-proprietaire.sql',
)


def erreur(message):
    raise SystemExit(f'ERREUR : {message}')


class Analyseur(argparse.ArgumentParser):
    def error(self, message):
        self.print_usage(sys.stderr)
        self.exit(1, f'ERREUR : {message}\n')


def accessible(path, roots):
    return any(path == root or root in path.parents for root in roots)


def outil_systeme(name):
    paths = ['/usr/local/bin', '/usr/bin', '/bin'] + os.environ.get('PATH', '').split(os.pathsep)
    for directory in paths:
        if not directory:
            continue
        candidate = shutil.which(name, path=directory)
        if candidate:
            resolved = Path(candidate).resolve()
            if accessible(resolved, (Path('/usr'), Path('/bin'), Path('/nix/store'))):
                return resolved
    return None


def trouver_binaire(name):
    candidate = outil_systeme(name)
    if candidate is None:
        erreur(f'programme système introuvable : {name}')
    return candidate


def trouver_postgres(explicite):
    candidats = []
    if explicite:
        candidats.append(Path(explicite).resolve())
    else:
        pg_config = outil_systeme('pg_config')
        if pg_config:
            try:
                bindir = subprocess.run(
                    [pg_config, '--bindir'], check=True, capture_output=True,
                    text=True, timeout=5, cwd='/tmp',
                    env={'PATH': '/usr/bin:/bin', 'LANG': 'C', 'LC_ALL': 'C'},
                ).stdout.strip()
                if bindir:
                    candidats.append(Path(bindir).resolve())
            except (OSError, subprocess.SubprocessError):
                pass
        postgres = shutil.which('postgres')
        if postgres:
            candidats.append(Path(postgres).resolve().parent)
        candidats.extend(sorted(Path('/usr/lib/postgresql').glob('*/bin'), reverse=True))
    for candidat in candidats:
        if all((candidat / name).is_file() and os.access(candidat / name, os.X_OK)
               for name in ('initdb', 'postgres', 'psql', 'pg_isready')):
            return candidat.resolve()
    erreur('binaires PostgreSQL complets introuvables ; préciser --pg-bin')


def chevauche_home(path):
    return any(path == home or path in home.parents or home in path.parents for home in homes)


def ajouter_installation(command, path, bases):
    if accessible(path, bases):
        return
    prefix = path.parent if path.name == 'bin' else path
    if prefix == Path('/') or accessible(prefix, (Path('/home'), Path('/root'), Path('/tmp'))) or chevauche_home(prefix):
        erreur('installation hors des préfixes système : HOME et /tmp ne sont pas montés')
    parents = list(prefix.parents)
    for parent in reversed(parents[:-1]):
        if parent != Path('/'):
            command.extend(('--dir', str(parent)))
    command.extend(('--ro-bind', str(prefix), str(prefix)))
    bases.append(prefix)


def main():
    parser = Analyseur(description='Sondes PostgreSQL B3 isolées, sur les sources courantes.')
    parser.add_argument('depot', nargs='?', default='.', help='racine du dépôt (défaut : répertoire courant)')
    parser.add_argument('--pg-bin', help='répertoire contenant initdb, postgres, psql et pg_isready')
    parser.add_argument('--delai', type=int, default=90, help='délai maximal en secondes (défaut : 90)')
    args = parser.parse_args()
    if args.delai <= 0:
        erreur('le délai doit être strictement positif')
    try:
        repository = Path(args.depot).resolve(strict=True)
    except OSError as exc:
        erreur(f'racine du dépôt inaccessible : {exc}')
    if not repository.is_dir():
        erreur('le chemin du dépôt n’est pas un répertoire')
    for relative in fichiers:
        source = repository / relative
        if not source.is_file() or source.is_symlink():
            erreur(f'source régulière introuvable ou lien symbolique : {relative}')

    bubblewrap = trouver_binaire('bwrap')
    shell = trouver_binaire('sh')
    python = Path(sys.executable).resolve()
    pg_bin = trouver_postgres(args.pg_bin)
    bases = []
    command = [str(bubblewrap), '--unshare-all', '--die-with-parent', '--new-session', '--clearenv']
    for name in ('/usr', '/bin', '/lib', '/lib64', '/nix/store'):
        base = Path(name)
        if base.exists():
            if chevauche_home(base.resolve()):
                erreur(f'le montage système {name} inclurait HOME ; refus par sécurité')
            if name == '/nix/store':
                command.extend(('--dir', '/nix'))
            command.extend(('--ro-bind', name, name))
            bases.append(base)
            bases.append(base.resolve())
    ajouter_installation(command, pg_bin, bases)
    if not accessible(shell, bases) or not accessible(python, bases):
        erreur('shell ou Python non accessible sans monter HOME ; utiliser des outils système')

    safe_path = [str(pg_bin), str(python.parent), str(shell.parent), '/usr/bin', '/bin']
    for item in os.environ.get('PATH', '').split(os.pathsep):
        if not item:
            continue
        candidate = Path(item).resolve()
        if accessible(candidate, bases):
            safe_path.append(str(candidate))
    safe_path = list(dict.fromkeys(safe_path))
    try:
        network_namespace = os.readlink('/proc/self/ns/net')
    except OSError as exc:
        erreur(f'espace de noms réseau illisible : {exc}')

    output = Path(tempfile.mkdtemp(prefix='sondes-postgresql-b3-resultats.', dir='/tmp'))
    print(f'Répertoire de résultats : {output}', flush=True)
    try:
        with tempfile.TemporaryDirectory(prefix='sondes-postgresql-b3-source.', dir='/tmp') as temporary:
            staged = Path(temporary) / 'source'
            staged_tool = Path(temporary) / 'outil'
            for relative in fichiers:
                destination = staged / relative
                destination.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(repository / relative, destination)
            for relative in fichiers_outil:
                original = outil / relative
                if not original.is_file() or original.is_symlink():
                    erreur(f'fichier de sonde introuvable ou lien symbolique : {relative}')
                destination = staged_tool / relative
                destination.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(original, destination)
            command.extend((
                '--tmpfs', '/etc', '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp',
                '--ro-bind', str(staged), '/source', '--ro-bind', str(staged_tool), '/outil',
                '--bind', str(output), '/resultats', '--chdir', '/tmp',
                '--setenv', 'PATH', os.pathsep.join(safe_path),
                '--setenv', 'LANG', 'C', '--setenv', 'LC_ALL', 'C',
                '--setenv', 'PYTHON_BIN', str(python),
                '--setenv', 'PARENT_NETNS', network_namespace,
                str(shell), '/outil/interieur.sh',
            ))
            environment = {'PATH': '/usr/bin:/bin', 'LANG': 'C', 'LC_ALL': 'C'}
            try:
                execution = subprocess.run(command, cwd='/tmp', env=environment,
                                           stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                                           text=True, errors='replace', timeout=args.delai)
                contenu = execution.stdout
                if execution.returncode == 0 and 'FIN|contrôles de base OK|code 0' in contenu:
                    code = 0
                elif execution.returncode == 2 and 'FIN|contrôles de base OK|code 2' in contenu:
                    code = 2
                else:
                    code = 1
                    contenu += f'\nERREUR : sonde incomplète ou échouée (code interne {execution.returncode}).\n'
            except subprocess.TimeoutExpired as exc:
                contenu = (exc.stdout or b'')
                if isinstance(contenu, bytes):
                    contenu = contenu.decode('utf-8', 'replace')
                contenu += '\nERREUR : délai dépassé ; le bac à sable a été interrompu.\n'
                code = 1
    except OSError as exc:
        contenu = f'ERREUR pendant la copie ou le lancement : {exc}\n'
        code = 1
    (output / 'resultat.txt').write_text(contenu, encoding='utf-8')
    (output / 'code-sortie.txt').write_text(f'{code}\n', encoding='utf-8')
    print(contenu, end='')
    print(f'Code de sortie : {code} ; résultats : {output}')
    return code


if __name__ == '__main__':
    sys.exit(main())
