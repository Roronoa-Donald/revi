#!/usr/bin/env python3
"""
Banc de mutations systématique sur les 227 fiches suspendues.
Génère des mutations déterministes sur chaque corrigé, exécute la suite de tests
existante et identifie les mutants rejetés vs les mutants survivants (défaut de test).
"""

import ast
import copy
import csv
import hashlib
import json
import os
import re
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TSV_PATH = ROOT / 'corrections/resultats/prelot3-preuves-289.tsv'
PHP_CLI = ROOT / 'tools/php-cli/php'
NODE_BIN = '/usr/bin/node'
GCC_BIN = '/usr/bin/gcc'
PYTHON_BIN = '/usr/bin/python3'
BASH_BIN = '/bin/bash'
JAVAC_BIN = Path.home() / '.local/share/mise/installs/java/21/bin/javac'
JAVA_BIN = Path.home() / '.local/share/mise/installs/java/21/bin/java'

def digest(val: str) -> str:
    return hashlib.sha256(val.encode('utf-8')).hexdigest()

def normalize(val: str) -> str:
    if val is None:
        return ''
    return '\n'.join(line.rstrip() for line in val.replace('\r\n', '\n').replace('\r', '\n').split('\n')).strip('\n')

def load_catalogue():
    script = """
const catalogue = require('./server/exercises');
const policy = require('./server/exercises/grading-policy');
const list = catalogue.listExercises();
const map = {};
list.forEach(e => {
  map[e.id] = {
    id: e.id,
    course: e.course,
    chapter: e.chapter,
    language: e.language,
    solution: e.solution,
    tests: e.tests || [],
    examples: e.examples || [],
    suspended: policy.isGradingSuspended(e.course, e.id)
  };
});
process.stdout.write(JSON.stringify(map));
"""
    res = subprocess.run(['node', '-e', script], cwd=ROOT, capture_output=True, text=True, check=True)
    return json.loads(res.stdout)

OPERATORS_PY = {
    ast.Add: ast.Sub,
    ast.Sub: ast.Add,
    ast.Mult: ast.Add,
    ast.Div: ast.FloorDiv,
    ast.FloorDiv: ast.Div,
    ast.Mod: ast.FloorDiv,
    ast.Gt: ast.GtE,
    ast.GtE: ast.Gt,
    ast.Lt: ast.LtE,
    ast.LtE: ast.Lt,
    ast.Eq: ast.NotEq,
    ast.NotEq: ast.Eq
}

def generate_python_mutants(source: str):
    muts = []
    seen = {digest(source)}
    try:
        tree = ast.parse(source)
    except Exception:
        return muts

    for index, node in enumerate(ast.walk(tree)):
        replacements = []
        if isinstance(node, ast.BinOp) and type(node.op) in OPERATORS_PY:
            replacements.append(('binop', OPERATORS_PY[type(node.op)]))
        elif isinstance(node, ast.Compare):
            for op_idx, op in enumerate(node.ops):
                if type(op) in OPERATORS_PY:
                    replacements.append(('cmp', (op_idx, OPERATORS_PY[type(op)])))
        elif isinstance(node, ast.Constant) and type(node.value) is int:
            replacements.append(('const_int', node.value + 1))
            if node.value != 0:
                replacements.append(('const_int_sub', node.value - 1))
        elif isinstance(node, ast.Constant) and type(node.value) is bool:
            replacements.append(('const_bool', not node.value))

        for kind, rep in replacements:
            candidate = copy.deepcopy(tree)
            target = list(ast.walk(candidate))[index]
            if kind == 'binop':
                target.op = rep()
            elif kind == 'cmp':
                op_idx, new_op = rep
                target.ops[op_idx] = new_op()
            elif kind.startswith('const_int') or kind == 'const_bool':
                target.value = rep
            ast.fix_missing_locations(candidate)
            try:
                mutated = ast.unparse(candidate) + '\n'
                h = digest(mutated)
                if h not in seen:
                    seen.add(h)
                    muts.append({'type': kind, 'source': mutated, 'sha256': h})
            except Exception:
                pass
            if len(muts) >= 8:
                break
        if len(muts) >= 8:
            break
    return muts

def generate_lexical_mutants(source: str, language: str):
    muts = []
    seen = {digest(source)}
    patterns = [
        (r'\b\+\b', '-'),
        (r'\b-\b', '+'),
        (r'==', '!='),
        (r'!=', '=='),
        (r'<=', '<'),
        (r'>=', '>'),
        (r'\b0\b', '1'),
        (r'\b1\b', '0'),
        (r'\btrue\b', 'false'),
        (r'\bfalse\b', 'true'),
        (r'\bTRUE\b', 'FALSE'),
        (r'\bFALSE\b', 'TRUE'),
    ]
    for pattern, rep in patterns:
        matches = list(re.finditer(pattern, source))
        for m in matches[:2]:
            mutated = source[:m.start()] + rep + source[m.end():]
            h = digest(mutated)
            if h not in seen:
                seen.add(h)
                muts.append({'type': f'lexical_{pattern}_to_{rep}', 'source': mutated, 'sha256': h})
                if len(muts) >= 6:
                    return muts
    return muts

def run_program(language: str, source: str, stdin: str, timeout: int = 4):
    if language == 'python':
        cmd = [str(PYTHON_BIN), '-I', '-B', '-c', source]
        try:
            res = subprocess.run(cmd, input=stdin, capture_output=True, text=True, timeout=timeout)
            if res.returncode != 0:
                return None
            return normalize(res.stdout)
        except Exception:
            return None

    elif language == 'javascript':
        cmd = [NODE_BIN, '-e', source]
        try:
            res = subprocess.run(cmd, input=stdin, capture_output=True, text=True, timeout=timeout)
            if res.returncode != 0:
                return None
            return normalize(res.stdout)
        except Exception:
            return None

    elif language == 'php' and PHP_CLI.exists():
        cmd = [str(PHP_CLI), '-r', source]
        try:
            res = subprocess.run(cmd, input=stdin, capture_output=True, text=True, timeout=timeout)
            if res.returncode != 0:
                return None
            return normalize(res.stdout)
        except Exception:
            return None

    elif language in ('c', 'cpp'):
        ext = 'c' if language == 'c' else 'cpp'
        compiler = [GCC_BIN, '-std=c11', '-O2', f'-x{ext}', '-', '-o']
        with tempfile.TemporaryDirectory() as td:
            bin_path = os.path.join(td, 'prog')
            try:
                comp = subprocess.run(compiler + [bin_path], input=source, capture_output=True, text=True, timeout=timeout)
                if comp.returncode != 0:
                    return None
                res = subprocess.run([bin_path], input=stdin, capture_output=True, text=True, timeout=timeout)
                if res.returncode != 0:
                    return None
                return normalize(res.stdout)
            except Exception:
                return None

    elif language == 'shell':
        cmd = [BASH_BIN, '-c', source]
        try:
            res = subprocess.run(cmd, input=stdin, capture_output=True, text=True, timeout=timeout)
            if res.returncode != 0:
                return None
            return normalize(res.stdout)
        except Exception:
            return None

    elif language == 'java' and JAVAC_BIN.exists() and JAVA_BIN.exists():
        with tempfile.TemporaryDirectory() as td:
            main_file = os.path.join(td, 'Main.java')
            with open(main_file, 'w', encoding='utf-8') as f:
                f.write(source)
            try:
                comp = subprocess.run([str(JAVAC_BIN), main_file], capture_output=True, text=True, timeout=timeout)
                if comp.returncode != 0:
                    return None
                res = subprocess.run([str(JAVA_BIN), '-cp', td, 'Main'], input=stdin, capture_output=True, text=True, timeout=timeout)
                if res.returncode != 0:
                    return None
                return normalize(res.stdout)
            except Exception:
                return None

    return None

def test_exercise(ex):
    lang = ex['language']
    sol = ex['solution']
    tests = ex['tests']
    if not tests:
        return {'id': ex['id'], 'course': ex['course'], 'etat': 'sans_test', 'raison': 'aucun test caché'}

    if lang == 'powershell':
        return {
            'id': ex['id'],
            'course': ex['course'],
            'lang': lang,
            'etat': 'non_evaluable_local',
            'raison': 'powershell/pwsh absent de l’environnement hôte',
            'tests_count': len(tests)
        }

    # 1. Vérifier le corrigé sur tous les tests
    sol_ok = True
    for t in tests:
        out = run_program(lang, sol, t.get('stdin', ''))
        exp = normalize(t.get('expected', ''))
        if out != exp:
            sol_ok = False
            break

    if not sol_ok:
        return {
            'id': ex['id'],
            'course': ex['course'],
            'lang': lang,
            'etat': 'echec_corrige',
            'raison': 'le corrigé officiel ne passe pas un test de référence'
        }

    # 2. Générer les mutants
    if lang == 'python':
        muts = generate_python_mutants(sol)
    else:
        muts = generate_lexical_mutants(sol, lang)

    if not muts:
        return {
            'id': ex['id'],
            'course': ex['course'],
            'lang': lang,
            'etat': 'sans_mutant_synthetisable',
            'corrige_valide': True,
            'mutants_rejetes': 0,
            'mutants_survivants': 0
        }

    rejected = 0
    survivors = []
    for m in muts:
        caught = False
        for t in tests:
            mout = run_program(lang, m['source'], t.get('stdin', ''))
            exp = normalize(t.get('expected', ''))
            # Si le mutant crash (mout is None) ou produit une sortie différente, il est rejeté
            if mout != exp:
                caught = True
                break
        if caught:
            rejected += 1
        else:
            survivors.append(m['type'])

    return {
        'id': ex['id'],
        'course': ex['course'],
        'lang': lang,
        'etat': 'echec_survivant' if survivors else 'reussite_mutations',
        'corrige_valide': True,
        'tests_count': len(tests),
        'mutants_total': len(muts),
        'mutants_rejetes': rejected,
        'mutants_survivants': len(survivors),
        'details_survivants': survivors
    }

def main():
    catalogue = load_catalogue()
    suspended_ids = []
    with open(TSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')
        for r in reader:
            if r['etat'] == 'suspendue':
                suspended_ids.append(r['identifiant'])

    print(f"Lancement du banc sur les {len(suspended_ids)} fiches suspendues...")
    results = []
    for idx, eid in enumerate(suspended_ids, 1):
        ex = catalogue.get(eid)
        if not ex:
            results.append({'id': eid, 'etat': 'absent_catalogue'})
            continue
        res = test_exercise(ex)
        results.append(res)
        if idx % 25 == 0 or idx == len(suspended_ids):
            print(f"Progression : {idx}/{len(suspended_ids)} traitées...")

    # Statistiques
    etats = {}
    for r in results:
        st = r['etat']
        etats[st] = etats.get(st, 0) + 1

    summary = {
        'total': len(results),
        'repartition_etats': etats,
        'echecs': [r for r in results if r['etat'] in ('echec_corrige', 'echec_survivant')]
    }

    out_file = ROOT / 'corrections/resultats/lot3-banc-227-mutations.json'
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump({'sommaire': summary, 'resultats': results}, f, ensure_ascii=False, indent=2)

    print("\n=== BILAN DU BANC DE MUTATIONS SUR LES 227 FICHES ===")
    print(f"Total fiches analysées : {len(results)}")
    for st, count in sorted(etats.items()):
        print(f"  - {st} : {count}")
    print(f"Nombre de fiches avec échecs (survivants) : {len(summary['echecs'])}")
    print(f"Rapport sauvegardé dans {out_file}")

if __name__ == '__main__':
    main()
