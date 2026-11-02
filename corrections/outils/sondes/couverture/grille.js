'use strict';

function sections(starter) {
  const lines = String(starter || '').replace(/\r\n?/g, '\n')
    .replace(/^\n/, '').replace(/\s+$/, '\n').split('\n');
  const escapedFormat = lines[0] === '# Format REVI-ANALYSE:1';
  if (escapedFormat) lines.shift();
  const header = /^\[(?:cas\s*(\d+)|exemple)\b\s*(?:[—–-]\s*(.*?))?\]$/i;
  const cases = [];
  let current = null;
  for (let raw of lines) {
    const escapedAnswer = escapedFormat && raw.startsWith('\\=');
    if (escapedAnswer) raw = raw.slice(2);
    const trimmed = raw.trim();
    const match = escapedAnswer ? null : header.exec(trimmed);
    if (match) {
      current = { index: match[1] ? Number(match[1]) : cases.length + 1, data: [] };
      cases.push(current);
    } else if (current && !escapedAnswer && trimmed.startsWith('#')) {
      const data = trimmed.replace(/^#\s*(?:donn[eé]es?\s*:\s*)?/i, '').trim();
      if (data && !data.toLowerCase().startsWith('complétez') && !data.toLowerCase().startsWith('grille')) {
        current.data.push(data);
      }
    }
  }
  const result = new Map();
  for (const item of cases) {
    if (result.has(item.index)) throw new Error('Squelette avec sections dupliquées');
    result.set(item.index, item.data);
  }
  return result;
}

module.exports = { sections };
