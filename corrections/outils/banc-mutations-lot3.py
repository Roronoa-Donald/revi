import argparse
import ast
import copy
import hashlib
import json
import random
import subprocess
from decimal import Decimal, ROUND_HALF_EVEN
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
IDENTIFIERS = ('py-c1-e1', 'py-c1-e2', 'py-c1-e3',
               'algo-c1-e1', 'algo-c1-e2', 'algo-c1-e3')
OPERATORS = {
    ast.Add: ast.Sub,
    ast.Sub: ast.Add,
    ast.Mult: ast.Add,
    ast.Div: ast.FloorDiv,
    ast.FloorDiv: ast.Div,
    ast.Mod: ast.FloorDiv,
}


def digest(value):
    return hashlib.sha256(value.encode('utf-8')).hexdigest()


def load_exercises():
    script = """
const catalogue = require('./server/exercises');
const policy = require('./server/exercises/grading-policy');
const ids = JSON.parse(process.argv[1]);
const items = ids.map(id => {
  const item = catalogue.getExercise(id);
  return { id, solution: item.solution, tests: item.tests, examples: item.examples,
    suspended: policy.isGradingSuspended(item.course, id) };
});
process.stdout.write(JSON.stringify(items));
"""
    result = subprocess.run(['node', '-e', script, json.dumps(IDENTIFIERS)], cwd=ROOT,
                            capture_output=True, text=True, timeout=20, check=True)
    return json.loads(result.stdout)


def normalize(value):
    return '\n'.join(line.rstrip() for line in value.replace('\r\n', '\n').replace('\r', '\n').split('\n')).strip('\n')


def execute(source, stdin):
    command = [
        '/usr/bin/prlimit', '--as=536870912', '--cpu=2', '--', '/usr/bin/bwrap',
        '--die-with-parent', '--unshare-all', '--new-session', '--clearenv', '--cap-drop', 'ALL',
        '--ro-bind', '/usr', '/usr', '--symlink', 'usr/bin', '/bin', '--symlink', 'usr/lib', '/lib',
        '--symlink', 'usr/lib', '/lib64', '--dir', '/etc', '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
        '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp', '--chdir', '/tmp',
        '/usr/bin/python3', '-I', '-B', '-c', source
    ]
    try:
        result = subprocess.run(command, input=stdin, capture_output=True, text=True, timeout=4)
    except (OSError, subprocess.TimeoutExpired):
        return None
    if result.returncode != 0 or len(result.stdout) > 4096:
        return None
    return normalize(result.stdout)


def mutants(source):
    tree = ast.parse(source)
    seen = set()
    for index, node in enumerate(ast.walk(tree)):
        replacements = []
        if isinstance(node, ast.BinOp) and type(node.op) in OPERATORS:
            replacements.append(('operateur', OPERATORS[type(node.op)]))
        if isinstance(node, ast.Constant) and type(node.value) is int:
            replacements.append(('constante', node.value + 1))
        for kind, replacement in replacements:
            candidate = copy.deepcopy(tree)
            selected = list(ast.walk(candidate))[index]
            if kind == 'operateur':
                selected.op = replacement()
            else:
                selected.value = replacement
            ast.fix_missing_locations(candidate)
            mutated = ast.unparse(candidate) + '\n'
            fingerprint = digest(mutated)
            if fingerprint not in seen:
                seen.add(fingerprint)
                yield {'type': kind, 'source': mutated, 'sha256': fingerprint}


def oracle(identifier, input_value):
    values = [int(value) for value in input_value.split()]
    if identifier == 'py-c1-e1':
        return f'{values[0] * 9 // 5 + 32}.0'
    if identifier == 'py-c1-e2':
        average = Decimal(sum(values)) / Decimal(3)
        return str(average.quantize(Decimal('0.01'), rounding=ROUND_HALF_EVEN))
    if identifier in ('py-c1-e3', 'algo-c1-e3'):
        hours, remainder = divmod(values[0], 3600)
        minutes, seconds = divmod(remainder, 60)
        return f'{hours} h {minutes} min {seconds} s'
    if identifier == 'algo-c1-e1':
        length, width = values
        return f'{length * width}\n{2 * (length + width)}'
    if identifier == 'algo-c1-e2':
        price, quantity, discount = values
        return str(price * quantity * (100 - discount) // 100)
    raise ValueError(identifier)


def generate_cases(exercise, seed, count):
    generator = random.Random(f'{seed}:{exercise["id"]}')
    known = {normalize(item['stdin']) for item in exercise['tests'] + exercise['examples']}
    known.update(normalize(value) for value in exercise['historical_inputs'])
    cases = []
    while len(cases) < count:
        if exercise['id'] == 'py-c1-e1':
            value = str(generator.randint(200, 500) * 5)
        elif exercise['id'] == 'py-c1-e2':
            value = '\n'.join(str(generator.randint(0, 20)) for _ in range(3))
        elif exercise['id'] == 'algo-c1-e1':
            value = '\n'.join(str(generator.randint(1, 100)) for _ in range(2))
        elif exercise['id'] == 'algo-c1-e2':
            value = '\n'.join(str(number) for number in (
                100 * generator.randint(1, 100), generator.randint(1, 20), generator.randint(0, 100)))
        else:
            value = str(generator.randint(10000, 200000))
        if normalize(value) in known:
            continue
        known.add(normalize(value))
        cases.append({'stdin': value, 'expected': oracle(exercise['id'], value)})
    return cases


def evaluate(exercise, seed, count):
    if not exercise['suspended']:
        raise RuntimeError(f'Exercice non suspendu : {exercise["id"]}')
    cases = generate_cases(exercise, seed, count)
    correct = [execute(exercise['solution'], case['stdin']) == case['expected'] for case in cases]
    hidden_correct = [execute(exercise['solution'], case['stdin']) == normalize(case['expected']) for case in exercise['tests']]
    records = []
    for mutant in mutants(exercise['solution']):
        hidden = [execute(mutant['source'], case['stdin']) for case in exercise['tests']]
        rejected = any(output is not None and output != normalize(case['expected'])
                       for output, case in zip(hidden, exercise['tests']))
        failed = any(output is None for output in hidden)
        fresh = []
        if not rejected and not failed:
            fresh = [execute(mutant['source'], case['stdin']) for case in cases]
        fresh_reject = any(output is not None and output != case['expected'] for output, case in zip(fresh, cases))
        status = 'rejeté_par_tests_actuels' if rejected else (
            'non_évalué' if failed or any(output is None for output in fresh) else (
                'rejeté_sur_entrée_nouvelle' if fresh_reject else 'survivant'))
        records.append({'type': mutant['type'], 'source_sha256': mutant['sha256'], 'etat': status})
    return {
        'id': exercise['id'],
        'suspension_maintenue': exercise['suspended'],
        'solution_sha256': digest(exercise['solution']),
        'cas_nouveaux': len(cases),
        'cas_nouveaux_sha256': [digest(case['stdin']) for case in cases],
        'corrige_conforme_sur_nouveaux': sum(correct),
        'corrige_conforme_sur_tests': sum(hidden_correct),
        'tests_actuels': len(exercise['tests']),
        'mutants': records,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--seed', type=int, default=20261031)
    parser.add_argument('--cases', type=int, default=12, choices=range(2, 51))
    args = parser.parse_args()
    history_path = ROOT / 'corrections/resultats/lot2-finale-v13-generalisation.json'
    history = json.loads(history_path.read_text(encoding='utf-8'))
    historical = {item['id']: item for item in history['programmes']['exercices']}
    exercises = load_exercises()
    for exercise in exercises:
        record = historical.get(exercise['id'])
        if not record or not isinstance(record.get('cas'), list):
            raise RuntimeError(f'Historique de cas absent : {exercise["id"]}')
        exercise['historical_inputs'] = [item['entree'] for item in record['cas']]
    results = [evaluate(exercise, args.seed, args.cases) for exercise in exercises]
    report = {
        'schema': 'revi.lot3.pilote-mutations.v1',
        'graine': args.seed,
        'sources_sha256': {
            str(path.relative_to(ROOT)): hashlib.sha256(path.read_bytes()).hexdigest()
            for path in (ROOT / 'server/exercises/b1-python.js', ROOT / 'server/exercises/b1-algo.js',
                         history_path, Path(__file__).resolve())
        },
        'isolation': 'bubblewrap sans réseau, répertoire personnel ni catalogue, limites CPU et mémoire',
        'limites': [
            'Graine reproductible non secrète ; nouveautés vérifiées par égalité des exemples, tests et cas du rapport de généralisation retenu, pas de tous les audits antérieurs.',
            'Oracles limités aux domaines générés ; mutations syntaxiques non exhaustives.',
            'Pour la remise algorithmique, les prix générés sont des multiples de 100 : les montants sont exacts et ne tranchent pas la règle d’arrondi absente de l’énoncé.',
            'Un rejet par les tests actuels est distinct d’un rejet sur une entrée nouvelle.',
            'Une erreur ou expiration est non évaluée, jamais comptée comme rejet ; aucune réactivation automatique.'
        ],
        'exercices': results,
    }
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if all(item['corrige_conforme_sur_nouveaux'] == args.cases and
                    item['corrige_conforme_sur_tests'] == item['tests_actuels'] for item in results) else 1


if __name__ == '__main__':
    raise SystemExit(main())
