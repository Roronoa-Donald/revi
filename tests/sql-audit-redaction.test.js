'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { redactSql } = require('../corrections/outils/redaction-sql');

test('Le journal masque les valeurs SQL sensibles sans modifier les autres instructions', () => {
  const statements = [
    ["CREATE USER demo IDENTIFIED BY 'valeur-factice'; SELECT 1;", "CREATE USER demo IDENTIFIED BY <valeur-masquee>; SELECT 1;"],
    ["CREATE USER demo IDENTIFIED BY 'valeur''factice';", "CREATE USER demo IDENTIFIED BY <valeur-masquee>;"],
    ['CREATE USER demo identified by "valeur-factice";', 'CREATE USER demo identified by <valeur-masquee>;'],
    ['CREATE USER demo IDENTIFIED BY valeur-factice;', 'CREATE USER demo IDENTIFIED BY <valeur-masquee>;'],
    ['SELECT 1; -- instruction ordinaire', 'SELECT 1; -- instruction ordinaire']
  ];
  for (const [input, expected] of statements) {
    assert.equal(redactSql(input), expected);
    assert.equal(redactSql(expected), expected);
  }
});
