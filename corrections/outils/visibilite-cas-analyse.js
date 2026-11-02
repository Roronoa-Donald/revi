'use strict';

function casVisibles(starter) {
  const sections = new Map();
  let current = null;
  for (const line of String(starter || '').replace(/\r\n?/g, '\n').split('\n')) {
    const header = /^\[(?:cas\s*(\d+)|exemple)\b.*\]$/i.exec(line.trim());
    if (header) {
      current = header[1] ? Number(header[1]) : null;
      if (current !== null && !sections.has(current)) sections.set(current, false);
    } else if (current !== null && /^\s*#\s*\S/.test(line)) {
      sections.set(current, true);
    }
  }
  return new Set([...sections].filter(([, hasData]) => hasData).map(([number]) => number));
}

function casNotesVisibles(exercise, maxTests) {
  if (exercise.language !== 'analyse') return [];
  const visible = casVisibles(exercise.starter);
  return exercise.tests.slice(0, maxTests).flatMap(test => {
    const selector = /^cas\s*:\s*(\d+)$/i.exec(String(test.stdin || '').trim());
    return selector && visible.has(Number(selector[1])) ? [Number(selector[1])] : [];
  });
}

module.exports = { casVisibles, casNotesVisibles };
