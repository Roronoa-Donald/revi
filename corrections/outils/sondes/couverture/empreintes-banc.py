import ast
import hashlib
import json
import sys
from pathlib import Path


source = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).with_name('cas_sql.py')
tree = ast.parse(source.read_text(encoding='utf-8'), filename=str(source))
catalogue = next(node for node in tree.body if isinstance(node, ast.FunctionDef) and node.name == 'catalogue')
calls = [node for node in ast.walk(catalogue) if isinstance(node, ast.Call)
         and isinstance(node.func, ast.Name) and node.func.id == 'case']
result = {}
for call in calls:
    identifier = ast.literal_eval(call.args[0])
    program = ast.literal_eval(call.args[2])
    changes = ast.literal_eval(call.args[3])
    if identifier in result or len(changes) != 2:
        raise ValueError('Catalogue de variantes ambigu')
    variants = []
    for before, after in changes:
        if before == after or program.count(before) != 1:
            raise ValueError('Transformation de variante ambiguë')
        variant = program.replace(before, after, 1)
        variants.append(hashlib.sha256(variant.encode('utf-8')).hexdigest())
    if len(set(variants)) != 2:
        raise ValueError('Variantes identiques')
    result[identifier] = variants
if len(result) != 36:
    raise ValueError('Catalogue de variantes incomplet')
print(json.dumps(result, sort_keys=True))
