'use strict';

const path = require('node:path');
const b2 = require('../resultats/qualification-sql-b2-avant.json');
const b3 = require('../resultats/qualification-sql-b3-avant.json');

const root = path.resolve(__dirname, '../..');
const correctedB2 = new Set(['B2-026', 'B2-050', 'B2-053', 'B2-057']);
const pendingB2 = new Set(['B2-035', 'B2-036']);
const correctedB3 = new Set(['B3-09', 'B3-23', 'B3-24', 'B3-25', 'B3-31']);
const clarifiedB3 = new Set(['B3-28', 'B3-29']);
const identifiers = [...b2.verdicts.map(item => item.id), ...b3.occurrences.map(item => item.occurrence)];

if (b2.verdicts.length !== 105 || b3.occurrences.length !== 34 || new Set(identifiers).size !== 139) {
  throw new Error('Le relevé ne contient pas exactement 139 occurrences distinctes.');
}

function relative(filename) {
  return filename && path.isAbsolute(filename) ? path.relative(root, filename) : filename;
}

function oneLine(value) {
  return String(value ?? 'non renseigné').replace(/\s+/g, ' ').trim();
}

function b2State(item) {
  if (correctedB2.has(item.id)) return 'Défaut constaté corrigé localement ; voir les preuves et limites ci-dessous.';
  if (pendingB2.has(item.id)) return 'Correction locale appliquée à une anomalie étayée ; analyse T-SQL et transposition SQLite vérifiées, comportement SQL Server non reproduit.';
  if (item.classification === 'Exemple complet sans défaut établi') return 'Aucun défaut établi par cet échec ; validité générale non démontrée.';
  return 'Échec brut expliqué par la nature ou le contexte de cet extrait.';
}

function b3State(item) {
  if (correctedB3.has(item.occurrence)) return 'Défaut de contexte corrigé localement ; limites des sondes conservées.';
  if (clarifiedB3.has(item.occurrence)) return 'Fragment clarifié : alias path ajouté pour l’assemblage sans liste explicite.';
  if (item.qualification === 'sql_reel_contextuel_sans_defaut_etabli') return 'Aucun défaut établi par cet échec ; validité générale non démontrée.';
  return 'Échec brut expliqué par la nature ou le contexte de cet extrait.';
}

const output = [
  '# Lot 1, partie 2 — qualification individuelle des 139 échecs SQL B2/B3',
  '',
  'Ce relevé qualifie les 105 occurrences B2 et les 34 occurrences B3 du banc initial. Une occurrence est un extrait et son contexte, pas nécessairement une requête autonome. Les positions et empreintes des fichiers avant correction sont historiques ; les pages générées peuvent avoir été régénérées depuis.',
  '',
  'Les détails, dialectes, hypothèses, résultats par moteur et empreintes initiaux sont conservés dans `resultats/qualification-sql-b2-avant.json` et `resultats/qualification-sql-b3-avant.json`. Les sorties de sondes figurent dans `resultats/reproductions-sql-b2-avant.json`, `resultats/scriptdom-sql-b2-avant.json`, `resultats/preuves-sql-b3-avant.txt` et `resultats/preuves-sql-b3-proposition.txt`. Les correctifs T-SQL sont décrits dans `resultats/verification-correctifs-sql-b2.json` et `resultats/verification-metier-sql-b2.json` ; leurs AST actuels sont archivés séparément.',
  '',
  '**Limites générales.** Le banc initial emploie SQLite et un schéma B1, qui ne conviennent pas à tous ces exemples. Les sondes PostgreSQL utilisent la version 18.6 et des schémas fictifs, pas PostgreSQL 16 ni les données réelles. ScriptDOM est un parseur T-SQL, pas SQL Server : une syntaxe acceptée ne prouve pas son exécution, ses droits ou ses résultats. Une simulation SQLite transposée ne prouve pas le comportement exact d’un trigger SQL Server. Aucun fournisseur distant n’a été vérifié.',
  '',
  '## SQL B2 — 105 occurrences',
  ''
];

for (const item of b2.verdicts) {
  const reference = item.source_de_référence;
  output.push(
    `### ${item.id} — ${oneLine(item.classification)}`,
    `- Emplacement du relevé initial : \`${relative(item.fichier)}:${item.ligne}\` ; source de référence : \`${relative(reference.fichier)}:${reference.ligne}\`.`,
    `- Contexte : ${oneLine(item.contexte)} Dialecte : ${oneLine(item.dialecte)}`,
    `- Qualification : ${oneLine(item.verdict)}`,
    `- Preuve ou limite : ${oneLine(JSON.stringify(item.reproduction))} SQL Server : ${oneLine(item.exécution_SQL_Server)}.`,
    `- État : ${b2State(item)}`,
    ''
  );
}

output.push('## SQL B3 — 34 occurrences', '');
for (const item of b3.occurrences) {
  const sources = item.sources_canoniques.map(source => `\`${relative(source.fichier)}:${source.ligne}\``).join(', ') || 'source non déterminée';
  output.push(
    `### ${item.occurrence} — ${oneLine(item.nature)}`,
    `- Emplacement du relevé initial : \`${relative(item.file)}:${item.line}\` ; source de référence : ${sources}.`,
    `- Contexte : ${oneLine(item.contexte)} Dialecte : ${oneLine(item.langage_dialecte)}.`,
    `- Qualification : ${oneLine(item.justification)}`,
    `- Preuve : ${oneLine(item.verification)} Limite : ${oneLine(item.limite)}`,
    `- État : ${b3State(item)}`,
    ''
  );
}

process.stdout.write(output.join('\n'));
