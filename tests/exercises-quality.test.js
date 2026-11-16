'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { listExercises } = require('../server/exercises');

const GENERIC_HINT_RE = /Étapes\s*:\s*lire attentivement les données de chaque cas|lire attentivement les données de chaque cas/i;

// Grilles pinned par tests/chapitres1-lot3d.test.js (networkOracle) ou comparaisons/conversions légitimes
const ALLOWED_PAIRED_GRIDS = new Set([
  're-c1-e1',
  're-c1-e2',
  're-c1-e3',
  're-c2-e3',
  're-c3-e1',
  're-c3-e3',
  're-c5-e1',
  'mr-c5-e1',
  'fr-c6-e1',
  'pr-c4-e3',
  'pr-c5-e1',
  'cc-c1-e2',
  'cc-c1-e3',
  'cc-c2-e3',
  'cc-c4-e1',
  'cc-c5-e1',
  'cc-c6-e1',
  'cc-c6-e2',
  'cc-c6-e3'
]);

test('100 % des exercices possèdent un takeaway non vide (>= 20 car.) et distinct', () => {
  const all = listExercises({ includeSecrets: true });
  const missing = [];
  const seen = new Map();
  const duplicates = [];

  for (const ex of all) {
    const tk = typeof ex.takeaway === 'string' ? ex.takeaway.trim() : '';
    if (tk.length < 20) {
      missing.push(ex.id);
      continue;
    }
    const norm = tk.toLowerCase().replace(/\s+/g, ' ');
    if (seen.has(norm)) {
      duplicates.push(`${ex.id} == ${seen.get(norm)}`);
    } else {
      seen.set(norm, ex.id);
    }
  }

  assert.deepEqual(
    missing,
    [],
    `${missing.length} exercice(s) sans takeaway (>= 20 car.) : ${missing.slice(0, 15).join(', ')}`
  );
  assert.deepEqual(
    duplicates,
    [],
    `${duplicates.length} takeaway(s) dupliqué(s) : ${duplicates.slice(0, 10).join(', ')}`
  );
});

test('zéro indice générique boilerplate dans tout le catalogue', () => {
  const all = listExercises({ includeSecrets: true });
  const hits = [];

  for (const ex of all) {
    const hints = Array.isArray(ex.hints) ? ex.hints : [];
    for (let i = 0; i < hints.length; i++) {
      if (GENERIC_HINT_RE.test(String(hints[i]))) {
        hits.push(`${ex.id}#hints[${i}]`);
      }
    }
  }

  assert.deepEqual(
    hits,
    [],
    `${hits.length} indice(s) générique(s) détecté(s) : ${hits.slice(0, 15).join(', ')}`
  );
});

test('aucune grille analyse ne doit révéler le code de classification attendu dans # Données', () => {
  const all = listExercises({ includeSecrets: true }).filter(ex => ex.language === 'analyse');
  const leaks = [];

  for (const ex of all) {
    if (ALLOWED_PAIRED_GRIDS.has(ex.id)) continue;
    const starterLines = String(ex.starter || '').split(/\r?\n/);
    const dataLines = starterLines
      .filter(line => /#\s*Données?\s*:/i.test(line))
      .map(line => line.replace(/^.*#\s*Données?\s*:\s*/i, '').trim())
      .filter(Boolean);
    const solLines = String(ex.solution || '')
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('['));

    let tagHits = 0;
    for (const dl of dataLines) {
      const pair = dl.match(/^([A-Za-z0-9_]+)\s+(.+)$/);
      if (!pair) continue;
      const [, first, second] = pair;
      // Ignore les vraies phrases / descriptions situées (« ... » ou (...))
      if (second.startsWith('«') || second.startsWith('(')) continue;
      // Ex: "C ecoute" -> solution "C : ecoute" (étiquette classification courte C/I/D copiée en clé, hors identifiant de ligne a/b/c devant un nombre/IP)
      if (
        first.length <= 2 &&
        second.length >= 4 &&
        !/^[a-f]$/i.test(first) &&
        solLines.some(sl => sl.startsWith(`${first} : `))
      ) {
        tagHits++;
      }
      // Ex: "s droit de vote" -> solution "droit de vote : ..." avec code 1-3 car. devant le libellé
      if (first.length <= 3 && !/^\d+$/.test(first) && solLines.some(sl => sl.startsWith(`${second} : `))) {
        tagHits++;
      }
      // Ex: "udp tr" ou "p1 art" ou "tour etoile" -> solution "<first> : ..." avec code alphabétique <= 6 car. en fin de ligne
      if (
        second.length <= 6 &&
        /^[a-z][a-z0-9]*$/i.test(second) &&
        !/^\d+$/.test(first) &&
        solLines.some(sl => sl.startsWith(`${first} : `))
      ) {
        tagHits++;
      }
    }

    if (tagHits >= 2) {
      leaks.push(`${ex.id} (${tagHits} lignes)`);
    }
  }

  assert.deepEqual(
    leaks,
    [],
    `Grille(s) analyse auto-révélante(s) détectée(s) : ${leaks.join(', ')}`
  );
});
