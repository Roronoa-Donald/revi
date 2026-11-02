import ast
import base64
import builtins
import io
import json
import math
import operator
import random
import sys


class NotEvaluable(Exception):
    pass


ALLOWED_NODES = {
    ast.Module, ast.FunctionDef, ast.arguments, ast.arg, ast.Return, ast.Assign,
    ast.AugAssign, ast.Expr, ast.If, ast.For, ast.While, ast.Break, ast.Continue,
    ast.Pass, ast.Call, ast.Name, ast.Constant, ast.Subscript, ast.Slice, ast.List,
    ast.Tuple, ast.ListComp, ast.GeneratorExp, ast.comprehension, ast.JoinedStr,
    ast.FormattedValue, ast.BinOp, ast.UnaryOp, ast.BoolOp, ast.Compare, ast.IfExp,
    ast.Attribute, ast.keyword, ast.Load, ast.Store, ast.Add, ast.Sub, ast.Mult,
    ast.Div, ast.FloorDiv, ast.Mod, ast.Pow, ast.USub, ast.UAdd, ast.Not,
    ast.And, ast.Or, ast.Eq, ast.NotEq, ast.Lt, ast.LtE, ast.Gt, ast.GtE,
    ast.In, ast.NotIn, ast.Is, ast.IsNot,
}
SAFE_CALLS = {
    'abs', 'bool', 'enumerate', 'float', 'input', 'int', 'len', 'list', 'max',
    'min', 'print', 'range', 'round', 'str', 'sum', 'zip',
}
OPERATORS = {
    'Add': operator.add, 'Sub': operator.sub, 'Mult': operator.mul,
    'Div': operator.truediv, 'FloorDiv': operator.floordiv,
    'Mod': operator.mod, 'Pow': operator.pow,
}
REQUIRED = {
    'algo-c9-e3': {'puissance', 'pgcd'},
    'algo-c10-e3': {'attente_totale', 'temps_moyen'},
}


def analyse(source, exercise_id):
    try:
        tree = ast.parse(source, mode='exec')
    except (SyntaxError, ValueError, MemoryError, RecursionError):
        raise NotEvaluable('syntaxe')
    functions = [node for node in tree.body if isinstance(node, ast.FunctionDef)]
    names = [node.name for node in functions]
    if len(names) != len(set(names)) or not REQUIRED.get(exercise_id, set()).issubset(names):
        raise NotEvaluable('fonctions')
    if any(isinstance(node, ast.FunctionDef) and node not in functions for node in ast.walk(tree)):
        raise NotEvaluable('fonctions imbriquées')
    callable_names = set(names) | SAFE_CALLS
    for node in ast.walk(tree):
        if type(node) not in ALLOWED_NODES:
            raise NotEvaluable('construction non prise en charge')
        if isinstance(node, ast.FunctionDef) and (node.decorator_list or node.name in SAFE_CALLS):
            raise NotEvaluable('définition non prise en charge')
        if isinstance(node, ast.Name) and ('__' in node.id or node.id.startswith('_revi_')):
            raise NotEvaluable('identifiant réservé')
        if isinstance(node, ast.Name) and isinstance(node.ctx, ast.Store) and node.id in SAFE_CALLS:
            raise NotEvaluable('fonction standard redéfinie')
        if isinstance(node, ast.arg) and ('__' in node.arg or node.arg.startswith('_revi_') or node.arg in SAFE_CALLS):
            raise NotEvaluable('paramètre réservé')
        if isinstance(node, ast.Constant) and isinstance(node.value, str) and '_revi_' in node.value:
            raise NotEvaluable('identifiant réservé')
        if isinstance(node, ast.Attribute) and node.attr not in {'append', 'join'}:
            raise NotEvaluable('méthode non prise en charge')
        if isinstance(node, ast.Call):
            if isinstance(node.func, ast.Name) and node.func.id not in callable_names:
                raise NotEvaluable('appel non pris en charge')
            if not isinstance(node.func, (ast.Name, ast.Attribute)):
                raise NotEvaluable('appel indirect non pris en charge')
            if any(keyword.arg in {None, 'file'} for keyword in node.keywords):
                raise NotEvaluable('argument non pris en charge')
    if exercise_id == 'algo-c9-e3':
        for function in functions:
            if function.name in REQUIRED[exercise_id] and any(
                isinstance(node, (ast.For, ast.While, ast.comprehension)) for node in ast.walk(function)
            ):
                raise NotEvaluable('boucle dans une fonction récursive')
    if exercise_id == 'algo-c10-e3':
        for node in tree.body:
            if isinstance(node, ast.FunctionDef):
                locals_used = {argument.arg for argument in node.args.args}
                locals_used.update(child.id for child in ast.walk(node)
                                   if isinstance(child, ast.Name) and isinstance(child.ctx, ast.Store))
                if any(isinstance(child, ast.Name) and isinstance(child.ctx, ast.Load) and
                       child.id not in locals_used | callable_names for child in ast.walk(node)):
                    raise NotEvaluable('calcul dépendant de variables globales')
                continue
            if any(isinstance(child, (ast.BinOp, ast.AugAssign)) for child in ast.walk(node)):
                raise NotEvaluable('calcul hors des fonctions')
            if any(isinstance(child, ast.Call) and isinstance(child.func, ast.Name) and
                   child.func.id in {'sum', 'min', 'max'} for child in ast.walk(node)):
                raise NotEvaluable('calcul hors des fonctions')
            if isinstance(node, (ast.For, ast.While)):
                calls = [child for child in ast.walk(node) if isinstance(child, ast.Call)]
                if not any(isinstance(call.func, ast.Name) and call.func.id == 'input' for call in calls):
                    raise NotEvaluable('boucle de calcul hors des fonctions')
    return tree


class Instrument(ast.NodeTransformer):
    def __init__(self, targets):
        self.targets = targets
        self.function = None

    def visit_FunctionDef(self, node):
        previous = self.function
        self.function = node.name
        node = self.generic_visit(node)
        self.function = previous
        return node

    def visit_Return(self, node):
        node = self.generic_visit(node)
        if self.function in self.targets:
            node.value = ast.Call(
                func=ast.Name(id='_revi_return', ctx=ast.Load()),
                args=[ast.Constant(self.function), node.value or ast.Constant(None)], keywords=[]
            )
        return node

    def visit_BinOp(self, node):
        node = self.generic_visit(node)
        name = type(node.op).__name__
        if name not in OPERATORS:
            raise NotEvaluable('opération non prise en charge')
        return ast.copy_location(ast.Call(
            func=ast.Name(id='_revi_binary', ctx=ast.Load()),
            args=[ast.Constant(name), node.left, node.right], keywords=[]
        ), node)

    def visit_AugAssign(self, node):
        node = self.generic_visit(node)
        if not isinstance(node.target, ast.Name) or type(node.op).__name__ not in OPERATORS:
            raise NotEvaluable('affectation augmentée non prise en charge')
        value = ast.Call(func=ast.Name(id='_revi_binary', ctx=ast.Load()),
                         args=[ast.Constant(type(node.op).__name__),
                               ast.Name(id=node.target.id, ctx=ast.Load()), node.value], keywords=[])
        return ast.copy_location(ast.Assign(targets=[node.target], value=value), node)

    def visit_List(self, node):
        node = self.generic_visit(node)
        if isinstance(node.ctx, ast.Load):
            return ast.copy_location(ast.Call(func=ast.Name(id='_revi_list', ctx=ast.Load()),
                                              args=[node], keywords=[]), node)
        return node

    def visit_ListComp(self, node):
        node = self.generic_visit(node)
        return ast.copy_location(ast.Call(func=ast.Name(id='_revi_list', ctx=ast.Load()),
                                          args=[node], keywords=[]), node)


class Observations:
    def __init__(self, stdin, shifted=None, display_shift=False):
        self.inputs = iter(stdin.splitlines())
        self.output = io.StringIO()
        self.shifted = shifted
        self.display_shift = display_shift
        self.comparisons = []
        self.writes = []
        self.snapshots = {}
        self.lists = {}
        self.calls = {}
        self.recursions = {}
        self.operations = {}
        self.returns = {}

    def read(self, prompt=''):
        return next(self.inputs)

    def write(self, *values, **kwargs):
        builtins.print(*values, file=self.output, **kwargs)

    def binary(self, name, left, right):
        function = sys._getframe(1).f_code.co_name
        key = (function, name)
        self.operations[key] = self.operations.get(key, 0) + 1
        return OPERATORS[name](left, right)

    def returned(self, name, value):
        self.returns[name] = self.returns.get(name, 0) + 1
        if self.shifted == name and isinstance(value, (int, float)):
            return value + 100003
        return value

    def profile(self, frame, event, argument):
        if event == 'call' and frame.f_code.co_filename == '<apprenant>':
            name = frame.f_code.co_name
            self.calls[name] = self.calls.get(name, 0) + 1
            if frame.f_back is not None and frame.f_back.f_code == frame.f_code:
                self.recursions[name] = self.recursions.get(name, 0) + 1

    def tracked_list(self, values=()):
        observations = self

        class ObservedInt(int):
            def __new__(cls, value, owner, index):
                instance = int.__new__(cls, value)
                instance.owner = owner
                instance.index = index
                return instance

            def compare(self, other, operation):
                if isinstance(other, ObservedInt) and self.owner is other.owner:
                    owner = self.owner
                    observations.snapshots.setdefault(id(owner), list(builtins.list.__iter__(owner)))
                    observations.comparisons.append((id(owner), self.index, other.index, int(self), int(other)))
                return operation(int(self), int(other))

            def __lt__(self, other):
                return self.compare(other, operator.lt)

            def __le__(self, other):
                return self.compare(other, operator.le)

            def __gt__(self, other):
                return self.compare(other, operator.gt)

            def __ge__(self, other):
                return self.compare(other, operator.ge)

            def __str__(self):
                return str(int(self) + (100003 if observations.display_shift else 0))

            def __format__(self, specification):
                return format(int(self) + (100003 if observations.display_shift else 0), specification)

        class ObservedList(list):
            def __getitem__(self, index):
                value = super().__getitem__(index)
                if isinstance(index, int) and isinstance(value, int):
                    position = index if index >= 0 else len(self) + index
                    return ObservedInt(value, self, position)
                return value

            def __setitem__(self, index, value):
                if isinstance(index, int):
                    observations.writes.append((id(self), index if index >= 0 else len(self) + index))
                    if isinstance(value, ObservedInt):
                        value = int(value)
                return super().__setitem__(index, value)

            def __iter__(self):
                for index in range(len(self)):
                    yield self[index]

        result = ObservedList(values)
        observations.lists[id(result)] = result
        return result


def execute(tree, stdin, shifted=None, display_shift=False):
    observations = Observations(stdin, shifted, display_shift)
    safe = {name: getattr(builtins, name) for name in SAFE_CALLS if name not in {'input', 'print', 'list'}}
    safe.update({'input': observations.read, 'print': observations.write, 'list': observations.tracked_list})
    namespace = {'__builtins__': safe, '_revi_list': observations.tracked_list,
                 '_revi_return': observations.returned, '_revi_binary': observations.binary}
    executable = compile(tree, '<apprenant>', 'exec')
    sys.setprofile(observations.profile)
    try:
        exec(executable, namespace, namespace)
    finally:
        sys.setprofile(None)
    return observations


def expected_comparisons(values, method, latest_equal=False):
    items = list(values)
    comparisons = []
    swaps = 0
    if method == 'selection':
        for start in range(len(items) - 1):
            minimum = start
            for index in range(start + 1, len(items)):
                comparisons.append(tuple(sorted(((index, items[index]), (minimum, items[minimum])))))
                if items[index] < items[minimum] or (latest_equal and items[index] == items[minimum]):
                    minimum = index
            if minimum != start:
                swaps += 1
            items[start], items[minimum] = items[minimum], items[start]
    else:
        end = len(items)
        changed = True
        while changed and end > 1:
            changed = False
            for index in range(end - 1):
                comparisons.append(((index, items[index]), (index + 1, items[index + 1])))
                if items[index] > items[index + 1]:
                    items[index], items[index + 1] = items[index + 1], items[index]
                    swaps += 1
                    changed = True
            end -= 1
    return comparisons, swaps


def check_sort(tree, values, expected, method, allow_wrong=False):
    stdin = '\n'.join([str(len(values)), *(str(value) for value in values)]) + '\n'
    actual = execute(tree, stdin)
    output = actual.output.getvalue()
    if output.strip() != expected and allow_wrong:
        return {'sortie_différente': True}, output
    if output.strip() != expected:
        raise NotEvaluable('sortie du contrôle de méthode')
    sequences = [expected_comparisons(values, method)]
    if method == 'selection':
        sequences.append(expected_comparisons(values, method, latest_equal=True))
    candidates = []
    for owner, snapshot in actual.snapshots.items():
        observed = [tuple(sorted(((left, left_value), (right, right_value))))
                    for item, left, right, left_value, right_value in actual.comparisons if item == owner]
        writes = [index for item, index in actual.writes if item == owner]
        final_values = list(builtins.list.__iter__(actual.lists[owner]))
        if snapshot != values or final_values != sorted(values):
            continue
        for comparisons, swaps in sequences:
            if observed != comparisons:
                continue
            if method == 'bubble' and len(writes) != 2 * swaps:
                continue
            if method == 'selection' and not 2 * swaps <= len(writes) <= 2 * (len(values) - 1):
                continue
            candidates.append((len(observed), len(writes)))
            break
    if len(candidates) != 1:
        raise NotEvaluable('comparaisons et échanges de la méthode non établis')
    changed = execute(tree, stdin, display_shift=True)
    if changed.output.getvalue().strip() == expected:
        raise NotEvaluable('affichage indépendant du tableau observé')
    return {'comparaisons': candidates[0][0], 'affectations': candidates[0][1]}, output


def check_functions(tree, exercise_id, generator, actual_input=None):
    if exercise_id == 'algo-c9-e3':
        if actual_input is None:
            base = generator.choice([-5, -4, -3, -2, 2, 3, 4, 5])
            exponent = generator.randrange(3, 8)
            common = generator.randrange(2, 50)
            first, second = 8 * common, 3 * common
            stdin = f'{base}\n{exponent}\n{first}\n{second}\n'
        else:
            stdin = actual_input
            base, exponent, first, second = (int(value) for value in stdin.splitlines())
        expected = [str(base ** exponent), str(math.gcd(first, second))]
        functions = ['puissance', 'pgcd']
    else:
        if actual_input is None:
            durations = generator.sample(range(1, 30), 4)
            stdin = '\n'.join(['4', *(str(value) for value in durations)]) + '\n'
        else:
            stdin = actual_input
            parts = [int(value) for value in stdin.splitlines()]
            durations = parts[1:]
            if parts[0] != len(durations) or not durations:
                raise NotEvaluable('entrée de file non prise en charge')
        total = sum(sum(durations[:index]) for index in range(len(durations)))
        expected = [str(total), f'{total / len(durations):.2f}']
        functions = ['attente_totale', 'temps_moyen']
    actual = execute(tree, stdin)
    output = actual.output.getvalue()
    if output.strip().splitlines() != expected and actual_input is not None:
        return {'sortie_différente': True}, output
    if output.strip().splitlines() != expected:
        raise NotEvaluable('sortie du contrôle de méthode')
    for index, name in enumerate(functions):
        if actual.calls.get(name, 0) < 1 or actual.returns.get(name, 0) < 1:
            raise NotEvaluable('fonction non appelée')
        needs_recursion = (name == 'puissance' and exponent >= 2) or (
            name == 'pgcd' and second != 0 and first % second != 0
        ) if exercise_id == 'algo-c9-e3' else False
        if needs_recursion and actual.recursions.get(name, 0) < 1:
            raise NotEvaluable('récursion non exécutée')
        altered = execute(tree, stdin, shifted=name)
        lines = altered.output.getvalue().strip().splitlines()
        if len(lines) != 2 or lines[index] == expected[index]:
            raise NotEvaluable('résultat de fonction non utilisé')
    if exercise_id == 'algo-c9-e3' and second != 0 and first % second != 0 and actual.operations.get(('pgcd', 'Mod'), 0) < 1:
        raise NotEvaluable('divisions euclidiennes non observées')
    if exercise_id == 'algo-c10-e3' and not any(
        function in functions and count > 0 for (function, operation), count in actual.operations.items()
    ):
        raise NotEvaluable('calcul dans les fonctions non observé')
    return ({'appels': {name: actual.calls.get(name, 0) for name in functions},
             'appels_recursifs': {name: actual.recursions.get(name, 0) for name in functions},
             'operations': sum(actual.operations.values())}, output)


def main():
    if REVI_EXERCISE not in {'algo-c6-e3', 'algo-c9-e1', 'algo-c9-e3', 'algo-c10-e3'}:
        raise ValueError('exercice non pris en charge')
    source = base64.b64decode(REVI_SOURCE, validate=True).decode('utf8')
    original = analyse(source, REVI_EXERCISE)
    tree = ast.fix_missing_locations(Instrument(REQUIRED.get(REVI_EXERCISE, set())).visit(original))
    generator = random.Random(int(REVI_SEED, 16))
    if REVI_EXERCISE == 'algo-c6-e3':
        values = generator.sample(range(-100, 101), 6)
        counts, _ = check_sort(tree, values, ' '.join(str(value) for value in sorted(values)), 'selection')
    elif REVI_EXERCISE == 'algo-c9-e1':
        ordered = sorted(generator.sample(range(-100, 101), 5))
        reverse = list(reversed(ordered))
        almost = [ordered[1], ordered[0], *ordered[2:]]
        prefix = ' '.join(str(value) for value in ordered)
        counts = {
            'inverse': check_sort(tree, reverse, prefix + '\n4', 'bubble')[0],
            'arret': check_sort(tree, almost, prefix + '\n2', 'bubble')[0],
        }
    else:
        counts, _ = check_functions(tree, REVI_EXERCISE, generator)
    result = {'schema': 'revi-methode-v1', 'status': 'verified', 'counts': counts}
    if REVI_HAS_INPUT:
        stdin = base64.b64decode(REVI_INPUT, validate=True).decode('utf8')
        if REVI_EXERCISE in {'algo-c6-e3', 'algo-c9-e1'}:
            numbers = [int(value) for value in stdin.splitlines()]
            values = numbers[1:]
            if not numbers or numbers[0] != len(values):
                raise NotEvaluable('entrée du tri non prise en charge')
            expected = ' '.join(str(value) for value in sorted(values))
            method = 'selection' if REVI_EXERCISE == 'algo-c6-e3' else 'bubble'
            if method == 'bubble':
                ordered = list(values)
                end = len(ordered)
                passages = 0
                changed = True
                while changed and end > 1:
                    changed = False
                    for index in range(end - 1):
                        if ordered[index] > ordered[index + 1]:
                            ordered[index], ordered[index + 1] = ordered[index + 1], ordered[index]
                            changed = True
                    end -= 1
                    passages += 1
                expected += '\n' + str(passages)
            if len(values) <= 1:
                actual = execute(tree, stdin)
                result['output'] = actual.output.getvalue()
                result['actual_counts'] = {'cas_trop_court': True}
            else:
                result['actual_counts'], result['output'] = check_sort(tree, values, expected, method, allow_wrong=True)
        else:
            result['actual_counts'], result['output'] = check_functions(tree, REVI_EXERCISE, generator, stdin)
    return result


try:
    result = main()
except NotEvaluable as error:
    result = {'schema': 'revi-methode-v1', 'status': 'not_evaluable', 'reason': str(error)}
except (Exception, SystemExit):
    result = {'schema': 'revi-methode-v1', 'status': 'not_evaluable', 'reason': 'exécution du contrôle'}
print(json.dumps(result, ensure_ascii=True, separators=(',', ':')))
