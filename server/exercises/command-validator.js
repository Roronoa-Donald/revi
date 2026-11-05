/**
 * server/exercises/command-validator.js
 *
 * Moteur de normalisation et de validation déterministe pour les exercices de
 * commandes shell (Linux, Cisco IOS, etc.) sans exécution système.
 *
 * Principes (Spec Refonte §4) :
 * 1. Zéro exécution de code : comparaison déterministe par texte, tokens et regex.
 * 2. Normalisation robuste : espaces superflus, chemins relatifs redondants (./),
 *    drapeaux courts combinés ou séparés (-la = -al = -l -a = -a -l).
 * 3. Détection ciblée des quasi-erreurs fréquentes avec messages explicatifs dédiés.
 * 4. Protection contre ReDoS (longueur bornée, motifs sécurisés).
 */
'use strict';

const MAX_COMMAND_LENGTH = 512;

/**
 * Normalise une commande shell simple pour comparaison insensible aux variations
 * syntaxiques équivalentes (espaces, ordre des options simples, drapeaux combinés).
 */
function normalizeCommand(cmd) {
  if (typeof cmd !== 'string') return '';
  let str = cmd.trim().replace(/\s+/g, ' ');
  if (!str) return '';

  const tokens = str.split(' ');
  const prog = tokens[0];
  const rest = tokens.slice(1);

  // Normalisation spécifique pour la commande ls
  if (prog === 'ls') {
    const flags = new Set();
    const args = [];
    for (const arg of rest) {
      if (arg.startsWith('-') && !arg.startsWith('--') && arg.length > 1) {
        for (const char of arg.slice(1)) flags.add(char);
      } else {
        // Nettoyage des ./ et slashs de fin
        args.push(arg.replace(/^\.\//, '').replace(/\/+$/, ''));
      }
    }
    const sortedFlags = Array.from(flags).sort().join('');
    const flagStr = sortedFlags ? '-' + sortedFlags : '';
    return [prog, flagStr, ...args].filter(Boolean).join(' ');
  }

  // Normalisation générale des arguments (./fichier -> fichier, dir/ -> dir)
  const normalizedRest = rest.map(arg => {
    let a = arg;
    if (a.startsWith('./') && a.length > 2) a = a.slice(2);
    if (a.length > 1 && a.endsWith('/') && !a.endsWith('//')) a = a.slice(0, -1);
    // Gestion sémantique rigoureuse des guillemets shell :
    // Les guillemets simples neutralisent l'expansion de variables ('$HOME' !== "$HOME").
    if (a.startsWith("'") && a.endsWith("'")) {
      const inner = a.slice(1, -1);
      // Si la chaîne contient des variables shell ($) ou métacaractères, conserver strictement les simples quotes
      if (/[\$]/.test(inner)) return "'" + inner + "'";
      if (!/[\s*?#]/.test(inner)) return inner;
      return "'" + inner + "'";
    }
    if (a.startsWith('"') && a.endsWith('"')) {
      const inner = a.slice(1, -1);
      if (/[\$]/.test(inner)) return '"' + inner + '"';
      if (!/[\s*?#]/.test(inner)) return inner;
      return '"' + inner + '"';
    }
    return a;
  });

  return (prog + ' ' + normalizedRest.join(' ')).trim();
}

/**
 * Valide une commande saisie par un étudiant par rapport à un ensemble de critères.
 *
 * @param {string} actualRaw Commande brute tapée par l'élève
 * @param {object} test Critères du test (regex, patterns, rejected, expected)
 * @returns {{ matched: boolean, rejectionMessage: string | null }}
 */
function validateShellCommand(actualRaw, test) {
  const actual = String(actualRaw || '').trim().replace(/\s+/g, ' ');
  const opts = test || {};

  // Protection contre le déni de service par regex (ReDoS)
  if (actual.length > MAX_COMMAND_LENGTH) {
    return {
      matched: false,
      rejectionMessage: 'La commande saisie dépasse la longueur maximale autorisée (512 caractères).'
    };
  }

  // 1. Détection prioritaire des quasi-erreurs fréquentes (rejet explicite avec feedback)
  if (Array.isArray(opts.rejected)) {
    for (const rej of opts.rejected) {
      try {
        const pattern = rej.pattern instanceof RegExp
          ? rej.pattern
          : (typeof rej.pattern === 'string' && rej.pattern.length > 0
              ? new RegExp(rej.pattern, rej.flags || '')
              : (typeof rej.cmd === 'string' && rej.cmd.length > 0
                  ? new RegExp('^\\s*' + rej.cmd.trim().replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + '\\s*$', rej.flags || '')
                  : null));
        if (pattern && pattern.test(actual)) {
          return {
            matched: false,
            rejectionMessage: rej.message || 'Commande incorrecte ou non adaptée au scénario.'
          };
        }
      } catch {
        // Expression régulière mal formée ignorée en sécurité
      }
    }
  }

  // 2. Motif regex principal
  if (opts.regex) {
    try {
      const re = opts.regex instanceof RegExp ? opts.regex : new RegExp(opts.regex, opts.flags || 'i');
      if (re.test(actual)) {
        return { matched: true, rejectionMessage: null };
      }
    } catch {
      // ignore
    }
  }

  // 3. Liste de motifs de variantes acceptées
  if (Array.isArray(opts.patterns)) {
    for (const pat of opts.patterns) {
      try {
        const re = pat instanceof RegExp ? pat : new RegExp(pat, 'i');
        if (re.test(actual)) {
          return { matched: true, rejectionMessage: null };
        }
      } catch {
        // ignore
      }
    }
  }

  // 4. Comparaison après normalisation avec la commande attendue
  const expected = String(opts.expected || '').trim();
  if (expected) {
    if (actual === expected) {
      return { matched: true, rejectionMessage: null };
    }
    if (normalizeCommand(actual) === normalizeCommand(expected)) {
      return { matched: true, rejectionMessage: null };
    }
  }

  return {
    matched: false,
    rejectionMessage: opts.hint || opts.explanation || 'Commande incorrecte ou syntaxe non conforme au scénario.'
  };
}

module.exports = {
  MAX_COMMAND_LENGTH,
  normalizeCommand,
  validateShellCommand
};
