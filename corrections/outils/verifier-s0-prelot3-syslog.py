from pathlib import Path
import hashlib
import os
import shutil
import subprocess
import tempfile
import urllib.request


metadata = subprocess.check_output(
    ['pacman', '-Sp', '--print-format', '%h %l', '--nodeps', 'syslog-ng'], text=True
).splitlines()
expected, url = next(line.split(' ', 1) for line in metadata if '/syslog-ng-' in line)
assert expected == 'e3dd043785b3cef29a039124fb31bcf268c76599e910489ea7e3459ef7f7c654'
driver = r'''
import socket
import ssl
import subprocess
import time
from pathlib import Path

binary = '/work/usr/bin/syslog-ng'
options = ['--module-path=/work/usr/lib/syslog-ng', '-f', '/work/config.conf', '-p', '/tmp/syslog.pid',
           '-R', '/tmp/syslog.persist', '-c', '/tmp/syslog.ctl']
subprocess.run([binary, *options, '-s'], check=True, capture_output=True, text=True)
daemon = subprocess.Popen([binary, *options, '-F', '-e'], stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
try:
    deadline = time.monotonic() + 8
    while True:
        if daemon.poll() is not None:
            raise RuntimeError('syslog-ng arrêté : ' + daemon.stderr.read())
        try:
            connection = socket.create_connection(('127.0.0.1', 15514), timeout=0.3)
            break
        except OSError:
            if time.monotonic() >= deadline:
                raise
            time.sleep(0.05)
    with connection:
        connection.sendall(b'<13>Oct 31 01:00:00 localhost revi: F150_TCP_CLAIR\n')
    context = ssl.create_default_context(cafile='/work/cert.pem')
    with socket.create_connection(('127.0.0.1', 15515), timeout=3) as raw:
        with context.wrap_socket(raw, server_hostname='localhost') as secured:
            assert secured.version() in ('TLSv1.2', 'TLSv1.3')
            version = secured.version()
            secured.sendall(b'<13>Oct 31 01:00:01 localhost revi: F150_TLS_VERIFIE\n')
    logfile = Path('/work/reception.log')
    deadline = time.monotonic() + 8
    while time.monotonic() < deadline:
        contents = logfile.read_text() if logfile.is_file() else ''
        if 'F150_TCP_CLAIR' in contents and 'F150_TLS_VERIFIE' in contents:
            break
        time.sleep(0.05)
    else:
        raise AssertionError('Messages synthétiques absents du journal')
    print(f'F150 : syslog-ng reçoit TCP sans TLS et TCP avec {version}, certificat vérifié.')
finally:
    daemon.terminate()
    try:
        daemon.wait(timeout=4)
    except subprocess.TimeoutExpired:
        daemon.kill()
        daemon.wait(timeout=4)
'''

with tempfile.TemporaryDirectory(prefix='revi-prelot3-syslog-', dir='/tmp') as directory:
    root = Path(directory)
    package = root / 'package.tar.zst'
    with urllib.request.urlopen(url, timeout=90) as source, package.open('wb') as output:
        shutil.copyfileobj(source, output)
    assert hashlib.sha256(package.read_bytes()).hexdigest() == expected
    subprocess.run(['bsdtar', '-xf', str(package), '-C', str(root)], check=True, capture_output=True)
    subprocess.run(['openssl', 'req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-days', '1',
                    '-keyout', str(root / 'cert.key'), '-out', str(root / 'cert.pem'),
                    '-subj', '/CN=localhost', '-addext', 'subjectAltName=DNS:localhost'],
                   check=True, capture_output=True)
    os.chmod(root / 'cert.key', 0o600)
    (root / 'config.conf').write_text('''@version: 4.0
options { chain_hostnames(no); flush_lines(0); };
source plain { network(ip("127.0.0.1") port(15514) transport("tcp")); };
source secure { network(ip("127.0.0.1") port(15515) transport("tls")
  tls(key-file("/work/cert.key") cert-file("/work/cert.pem") peer-verify(optional-untrusted))); };
destination received { file("/work/reception.log" template("$MESSAGE\\n")); };
log { source(plain); source(secure); destination(received); };
''', encoding='utf8')
    (root / 'driver.py').write_text(driver, encoding='utf8')
    command = [
        'bwrap', '--die-with-parent', '--unshare-all', '--uid', '0', '--gid', '0',
        '--cap-drop', 'ALL', '--cap-add', 'CAP_NET_ADMIN', '--clearenv',
        '--ro-bind', '/usr', '/usr', '--symlink', 'usr/bin', '/bin',
        '--symlink', 'usr/lib', '/lib', '--symlink', 'usr/lib', '/lib64',
        '--dir', '/etc', '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
        '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp', '--bind', str(root), '/work',
        '--chdir', '/work', '--setenv', 'PATH', '/usr/bin:/bin',
        '--setenv', 'LD_LIBRARY_PATH', '/work/usr/lib:/work/usr/lib/syslog-ng',
        '/usr/bin/bash', '-c', 'ip link set lo up && exec /usr/bin/python3 -I -B /work/driver.py'
    ]
    result = subprocess.run(command, text=True, capture_output=True, timeout=30)
    if result.returncode:
        raise SystemExit(result.stderr or f'Échec isolé : {result.returncode}')
    print(result.stdout.strip())
