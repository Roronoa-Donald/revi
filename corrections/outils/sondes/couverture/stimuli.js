'use strict';

function firstSqlKeyword(statement) {
  const start = statement.replace(/^(?:\s|--[^\n]*(?:\n|$)|\/\*[\s\S]*?\*\/)+/g, '');
  return (start.match(/^[A-Za-z]+/) || [''])[0].toUpperCase();
}

function sqlStimulus(engine, input) {
  const raw = String(input || '').replace(/\r\n?/g, '\n');
  const marker = raw.indexOf('-- VERIFY:');
  const setup = marker < 0 ? raw : raw.slice(0, marker);
  const verify = marker < 0 ? '' : raw.slice(marker + '-- VERIFY:'.length);
  const statements = text => engine.splitSql(text).filter(statement => firstSqlKeyword(statement)).map(statement => statement.trim());
  return JSON.stringify([statements(setup), statements(verify)]);
}

function comparableStimulus(engine, exercise, input) {
  return exercise.language === 'sql' ? sqlStimulus(engine, input) : String(input || '');
}

function witnessVisibleInProjection(engine, toClient, exercise, input) {
  const key = comparableStimulus(engine, exercise, input);
  if ((exercise.examples || []).some(example => comparableStimulus(engine, exercise, example.stdin) === key)) return true;
  const raw = String(input || '').trim();
  if (raw.length < 8) return false;
  return JSON.stringify(toClient(exercise)).includes(JSON.stringify(raw).slice(1, -1));
}

module.exports = { sqlStimulus, comparableStimulus, witnessVisibleInProjection };
