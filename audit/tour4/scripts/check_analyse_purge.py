#!/usr/bin/env python3
"""
Annexe D — Vérification de la purge « analyse » (K5)
Vérifie dans les 52 cours en mode `data-language="analyse"` qu'aucune mention
résiduelle de programmation/flux CLI (`stdin`, `bash`, `print(`, `ipaddress`,
`split(`, `Python 3`, `input(`, `entrée standard`) ne subsiste hors des blocs
`<pre>`, `<script>`, `<style>` et hors de la liste d'exceptions pédagogiques
justifiées (`audit/tour4/exceptions-analyse.json`).
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('.')
EXCEPTIONS_FILE = ROOT / 'audit' / 'tour4' / 'exceptions-analyse.json'
if not EXCEPTIONS_FILE.exists():
    EXCEPTIONS_FILE = pathlib.Path(__file__).resolve().parent.parent / 'exceptions-analyse.json'

EXCEPTIONS = []
if EXCEPTIONS_FILE.exists():
    EXCEPTIONS = json.loads(EXCEPTIONS_FILE.read_text(encoding='utf-8'))

PAT = re.compile(
    r'\bstdin\b|\bbash\b|print\s*\(|\bipaddress\b|split\s*\(|Python\s*3|input\s*\(|entrée standard',
    re.I
)


def is_justified_exception(rel_path: str, matched_token: str, context: str) -> bool:
    tok_norm = re.sub(r'\s+', ' ', matched_token.strip()).lower()
    ctx_norm = re.sub(r'\s+', ' ', context).lower()
    for exc in EXCEPTIONS:
        if exc.get('file') != rel_path:
            continue
        exc_tok = re.sub(r'\s+', ' ', exc.get('token', '').strip()).lower()
        if exc_tok and exc_tok != tok_norm:
            continue
        sub = re.sub(r'\s+', ' ', exc.get('context_substring', '').strip()).lower()
        if sub and sub in ctx_norm:
            return True
    return False


def main():
    courses = set()
    for p in ROOT.rglob('*.html'):
        if any(x in p.as_posix() for x in ['dist/', 'audit/', 'revi-cours-html/', 'node_modules/']):
            continue
        if 'data-language="analyse"' in p.read_text(encoding='utf-8', errors='ignore'):
            courses.add(p.parts[len(ROOT.parts)])

    total = 0
    excluded_total = 0
    for c in sorted(courses):
        for p in sorted((ROOT / c).rglob('*.html')):
            s = p.read_text(encoding='utf-8', errors='ignore')
            s_clean = re.sub(r'<(pre|script|style)\b[^>]*>.*?</\1>', '', s, flags=re.S | re.I)
            text = re.sub(r'<[^>]+>', ' ', s_clean)
            rel = p.relative_to(ROOT).as_posix()
            unjustified = []
            for m in PAT.finditer(text):
                ctx = re.sub(r'\s+', ' ', text[max(0, m.start() - 60):min(len(text), m.end() + 60)]).strip()
                if is_justified_exception(rel, m.group(0), ctx):
                    excluded_total += 1
                else:
                    unjustified.append(m.group(0))
            if unjustified:
                total += len(unjustified)
                print(f"{rel}: {len(unjustified)} -> {unjustified[:5]}")

    print(f"Exceptions pédagogiques documentées ignorées: {excluded_total}")
    print(f"TOTAL occurrences suspectes dans les cours 'analyse': {total}  (attendu: 0 hors exceptions justifiées)")
    sys.exit(0 if total == 0 else 1)


if __name__ == '__main__':
    main()
