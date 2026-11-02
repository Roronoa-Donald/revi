#!/usr/bin/env bash
set -u

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd -P)
temporary=$(mktemp -d "${TMPDIR:-/tmp}/revi-integrite.XXXXXXXX") || exit 2
trap 'rm -rf -- "$temporary"' EXIT

bash "$root/corrections/outils/rejouer-isole.sh" integrite > "$temporary/structure.json"
structure_status=$?
bash "$root/corrections/outils/audit-generalisation.sh" > "$temporary/generalisation.json"
generalisation_status=$?

node - "$temporary/structure.json" "$temporary/generalisation.json" "$structure_status" "$generalisation_status" <<'NODE'
'use strict';

const fs = require('node:fs');
try {
  const structure = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const generalisation = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
  const structureStatus = Number(process.argv[4]);
  const generalisationStatus = Number(process.argv[5]);
  if (![0, 1].includes(structureStatus) || ![0, 1].includes(generalisationStatus) ||
      !['réussi', 'échoué'].includes(structure.controleStructurel?.etat) ||
      generalisation.code_sortie !== generalisationStatus || !Array.isArray(generalisation.exercices)) {
    throw new Error('Rapport incomplet ou échec d’infrastructure');
  }
  const status = structure.controleStructurel.etat === 'réussi' && generalisationStatus === 0 ? 0 : 1;
  console.log(JSON.stringify({ controleStructurel: structure, generalisation, code_sortie: status }, null, 2));
  process.exitCode = status;
} catch (error) {
  console.log(JSON.stringify({ etat: 'erreur_infrastructure', raison: error.message }));
  process.exitCode = 2;
}
NODE
