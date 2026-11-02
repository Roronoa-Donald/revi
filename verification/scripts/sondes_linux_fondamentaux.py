import json
import os
from pathlib import Path
import stat
import subprocess
import tempfile
import time


def main():
    audit = Path(__file__).resolve().parents[1]
    with tempfile.TemporaryDirectory(prefix='sondes-linux-', dir=audit) as temporary:
        directory = Path(temporary)
        original = directory / 'original'
        other_name = directory / 'autre-nom'
        original.write_text('contenu\n', encoding='utf-8')
        os.link(original, other_name)
        same_inode = original.stat().st_ino == other_name.stat().st_ino
        before = original.stat()
        time.sleep(0.03)
        os.chmod(original, 0o640)
        after = original.stat()
        fixed = directory / 'fixe'
        added = directory / 'ajoute'
        fixed.touch()
        added.touch()
        os.chmod(fixed, 0o440)
        os.chmod(added, 0o440)
        subprocess.run(['chmod', 'ug=rwx', str(fixed)], check=True)
        subprocess.run(['chmod', 'ug+wx', str(added)], check=True)
        find_result = subprocess.run(['find', '-maxdepth', '0'], cwd=directory,
                                     check=True, capture_output=True, text=True)
        results = {
            'deux_noms_un_inode': same_inode,
            'chmod_change_ctime_sans_modifier_contenu': {
                'ctime_change': after.st_ctime_ns > before.st_ctime_ns,
                'mtime_inchange': after.st_mtime_ns == before.st_mtime_ns,
            },
            'permissions_initiales_440': {
                'ug_egal_rwx': oct(stat.S_IMODE(fixed.stat().st_mode)),
                'ug_plus_wx': oct(stat.S_IMODE(added.stat().st_mode)),
            },
            'find_sans_chemin_explicite': find_result.stdout.strip(),
        }
    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
