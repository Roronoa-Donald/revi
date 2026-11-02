#!/usr/bin/env python3
"""Contre-vérification HTML indépendante avec html5lib."""

import json
import os
import pathlib
import subprocess
import sys

import html5lib


ROOT = pathlib.Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else pathlib.Path(__file__).resolve().parents[2]
manifest = os.environ.get('REVI_AUDIT_MANIFEST')
tracked = (pathlib.Path(manifest).read_bytes() if manifest else
           subprocess.check_output(['git', 'ls-files', '-z'], cwd=ROOT)).decode().split('\0')
if manifest and any(pathlib.PurePath(item).is_absolute() or '..' in pathlib.PurePath(item).parts for item in tracked if item):
    raise ValueError('Le manifeste contient un chemin hors du projet.')
pages = sorted(
    item for item in tracked
    if item.lower().endswith('.html')
    and not item.startswith(('audit/', 'design-audit/', 'tests/', 'verification/', 'corrections/'))
)
errors = []
for name in pages:
    parser = html5lib.HTMLParser(namespaceHTMLElements=False)
    with (ROOT / name).open('rb') as source:
        parser.parse(source, override_encoding='utf-8')
    for position, code, details in parser.errors:
        errors.append({
            'file': name,
            'line': position[0],
            'column': position[1],
            'code': code,
            'details': details,
        })

result = {
    'analyseur': f'html5lib {html5lib.__version__}',
    'pages': len(pages),
    'erreurs': errors,
    'limite': 'Ce second parseur vérifie la syntaxe HTML, pas la justesse pédagogique ou les formules dynamiques.',
}
json.dump(result, sys.stdout, ensure_ascii=False, indent=2)
sys.stdout.write('\n')
sys.exit(1 if errors else 0)
