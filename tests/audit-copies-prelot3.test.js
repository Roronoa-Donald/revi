'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

test('les instantanés des audits incluent les dépendances de la politique de notation', () => {
  const script = `
import importlib.util
import pathlib
import subprocess
import sys
import tempfile

sys.dont_write_bytecode = True
root = pathlib.Path(sys.argv[1]).resolve()
def load(name, relative):
    spec = importlib.util.spec_from_file_location(name, root / relative)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module
matrix = load('matrix', 'corrections/outils/sondes/matrice-suspendus/matrice.py')
manual = load('manual', 'corrections/outils/sondes/nouvelles-fixtures-suspendus/banc.py')
csharp = load('csharp', 'corrections/outils/sondes/generalisation/banc_csharp_lot1_partie3.py')
github = load('github', 'corrections/outils/sondes/generalisation/rejouer_b3_github.py')
required = ('server/exercises/grading-evidence.json', 'server/exercises/grading-runtime-evidence.json')
with tempfile.TemporaryDirectory(prefix='revi-audit-deps-') as temporary:
    for name, snapshotter in (('matrix', matrix.copy_inputs), ('manual', manual.snapshot_sources)):
        destination = pathlib.Path(temporary) / name
        destination.mkdir()
        manifest = snapshotter(root, destination)
        assert all(item in manifest for item in required)
        policy = destination / 'project/server/exercises/grading-policy.js'
        subprocess.run([sys.argv[2], '-e', "const policy=require(process.argv[1]);if(!policy.isGradingSuspended('docker'))process.exit(3)", str(policy)], check=True)
    assert all(item in csharp.SOURCES and item in github.SOURCES for item in required)
print('ok')
`;
  const output = execFileSync(process.env.PYTHON_BIN || 'python3', [
    '-I', '-c', script, path.join(__dirname, '..'), process.execPath
  ], { encoding: 'utf8' });
  assert.equal(output.trim(), 'ok');
});
